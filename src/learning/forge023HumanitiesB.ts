import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
const guideSpecs023: (LessonGuide & { title: string })[] = [
  {
    id: "hz-muhammed-ve-gencler",
    title: "Hz. Muhammed ve gençler: kişi, görev ve örnekliğin anlamı",
    minutes: 105,
    objectives: [
      "Kur’an’daki gençlik örneklerini anlatılan tutumla ilişkilendir.",
      "Hz. Muhammed’in gençliğini ve gençlere verdiği sorumlulukları kronolojik bağlamla ayır.",
      "Genç sahabilerin farklı rollerini, aynı kişinin birden fazla faaliyeti olabileceğini koruyarak tanı.",
      "Âl-i İmrân 159’daki merhamet, istişare ve tevekkül bağını açıklayıp bilinçli örnek almayı taklitten ayır.",
    ],
    source:
      "MEBİ TYT Din Kültürü ve Ahlak Bilgisi, basılı 46–51(gerçekPDF 48–53); Aurelia Hz. Muhammed ve Gençler kağıdı 8 sayfa. Metinler karşılaştırılarak yazılmış özgün öğretim, model ve alıştırmalar; resmî sınav sorusu değildir.",
    sections: [
      {
        title: "Önce kişi, sonra olay, sonra yorum",
        paragraphs: [
          "Bu ünitede gençliğe verilen değer, bir gencin hangi işi üstlendiği üzerinden öğrenilir. Kişi adı, olay ve olaydan çıkarılan ilke ayrı bilgilerdir. Musab’ın öğreticiliğiyle Üsame’nin komutanlığı aynı görev değildir; ikisinde genç bir kişiye sorumluluk verilmesi ortak bir tutum olarak incelenebilir.",
          "Din Kültürü dersinde tarihî anlatıyı veya dinî metni anlamak, uygulamayı kullanan kişinin inancını ölçmek değildir. Önce metnin kimi, ne zaman ve hangi eylemle anlattığını bul. Ardından güven, adalet, öğretme veya dayanışma gibi kavramı somut fiile bağla; kişinin adı tek başına bütün yorumları kanıtlamaz.",
        ],
      },
      {
        title: "Hz. İbrahim: düşünerek sorgulama",
        paragraphs: [
          "MEBİ’nin Kur’an’da gençler başlığında Hz. İbrahim’in yıldız, ay ve güneş üzerine düşünmesi örnek verilir. En’âm 76–79 bağlamında gelip geçici, batan varlıkları nihai ilah kabul etmeme ve göklerle yeri yaratana yönelme anlatılır. Metin, tefekkür ile tevhid arasında dinî bir anlam bağı kurar.",
          "Bu anlatıyı okurken gök cisimlerinin gerçek astronomik hareketlerini yeni bir fizik modeliymiş gibi hesaplamazsın. Dersin istediği, kişinin gözlediği geçicilikten hangi inanç yorumuna yöneldiğini anlamaktır. Bir soruda düşünme, sorgulama ve ortak koşmama vurguları varsa bunları anlatıdaki eylem ve sonuçla birlikte değerlendir.",
        ],
      },
      {
        title: "Ashab-ı Kehf: baskı altında kararlılık",
        paragraphs: [
          "Ashab-ı Kehf, Kur’an anlatısında inançları nedeniyle baskı gören ve korunmak için mağaraya sığınan gençlerdir. MEBİ onların tevhide bağlılığını ve kararlılığını gençlik örnekleri arasında ele alır. Gençlerin ortak bir tutum sergilemesi, adlarının, yaşlarının veya mağaranın yerinin her soruda verildiği anlamına gelmez.",
          "Bir soruda güvenliğe sığınma ile inançta kararlılık birlikte anlatılıyorsa yorumunu bu bağa dayandır. Metnin vermediği sayı veya coğrafyayı kesin bilgi gibi ekleme. Aynı tutum farklı bir olayda da görülebilir; örneği tanımakla herhangi bir baskı yaşayan kişiye otomatik aynı tarihî kimliği vermek farklı işlemlerdir.",
        ],
      },
      {
        title: "Hz. Yusuf, Hz. Musa ve Hz. Meryem",
        paragraphs: [
          "Kaynak, Hz. Yusuf, Hz. Musa ve Hz. Meryem’i iffet, sabır ve takva bağlamında anılan gençlik örnekleri arasında sayar. İffet, davranışta ve insan ilişkilerinde ahlaki sınırı gözetme; sabır, güçlük karşısında doğru davranışı sürdürme; takva ise Allah’a karşı sorumluluk bilinciyle davranma olarak ele alınır.",
          "Bu kavramlar tek bir kişiye kapalı etiketler değildir; aynı kişide birden çok tutum bulunabilir. Soruda hangi davranışın anlatıldığını incelemeden yalnız adı görüp ezber bir eşleşme yapma. Örneğin zorluğa rağmen doğru bildiği tutumu koruma sabrı öne çıkarabilir; açık eylem ve istenen kavram birlikte okunmalıdır.",
        ],
      },
      {
        title: "Genç Hz. Muhammed’in hayat bağlamı",
        paragraphs: [
          "MEBİ anlatımında Hz. Muhammed babasını doğmadan önce, annesini altı, dedesini sekiz yaşındayken kaybetmiş; ardından amcası Ebû Talib’in himayesinde büyümüştür. Aile işlerine yardım etmesi, çobanlık ve ticaret yolculukları, gençliğinde sorumluluk üstlenmesiyle ilişkilendirilir. Bu bilgiler hayatın dönemlerini ayırmaya yardımcı olur.",
          "Ticaret yolculukları alışveriş usulleri, insanlarla iletişim ve farklı toplulukları tanıma bağlamında anlatılır. Bir tarihî kişinin hayatında ağır güçlükler bulunması, bütün insanların aynı deneyimden aynı sonuca varacağını göstermez. Olay sırasını koru; gençlikteki faaliyetleri daha sonraki peygamberlik görevleriyle aynı tarih diliminde toplama.",
        ],
      },
      {
        title: "El-emîn: güvenin davranış karşılığı",
        paragraphs: [
          "El-emîn, güvenilir kimse anlamıyla Hz. Muhammed’in doğruluk ve emanete bağlılığı için kullanılan lakaptır. Doğru sözlü olmak, sözünde durmak ve emanet edileni korumak bu güvenin somut davranışlarıdır. “Güvenilir” demek her alanda aynı teknik uzmanlığa sahip olmak anlamına gelmez.",
          "Bir soruda emanetin eksiksiz teslimi anlatılıyorsa önce fiili belirle; güvenilirlik yorumunu bununla kur. Birinin zor bir işi üstlenmesi cesaret de gösterebilir, fakat kök özellikle emaneti soruyorsa onu yok sayma. Liyakat göreve uygun yeterliği, emanet ise üstlenilen sorumluluğun korunmasını öne çıkarır; ilişkili olmaları özdeş olduklarını göstermez.",
        ],
      },
      {
        title: "Hilfülfudûl: hak koruma dayanışması",
        paragraphs: [
          "Hilfülfudûl, İslam öncesi Mekke’de haksızlığa uğrayanları koruma amacıyla kurulan dayanışma girişimidir. Genç Hz. Muhammed’in bu girişime katılması, hak gözetme ve haksızlığa karşı durma bağlamında öğretilir. Bir adalet örneğinin anlamını kuruluşun tarihî bağlamı ve somut amacı birlikte verir.",
          "Bu girişimi yeni bir dinin veya sonradan oluşmuş bir fıkıh mezhebinin adıyla karıştırma. Bir soruda zayıf kişinin hakkını koruma anlatılıyorsa doğrudan adalet bağı kurabilirsin. Olaydan bütün katılımcıların her konuda kusursuz olduğu ya da bütün anlaşmazlıkların tek biçimde çözüleceği gibi sınırsız yargılar çıkarılmaz.",
        ],
      },
      {
        title: "Hacerülesved anlaşmazlığında hakemlik",
        paragraphs: [
          "Kâbe’nin yeniden inşası sırasında Hacerülesved’in yerine konulması konusunda anlaşmazlık çıkması, Hz. Muhammed’in hakemliğini gösteren örnektir. Burada öne çıkan iş, taraflar arasındaki uyuşmazlığı çözmeye yardımcı olmaktır. Olayın askerî komutanlık veya Medine’de öğreticilik gibi başka görevlerle karıştırılmaması gerekir.",
          "Hakemlikte çözümün taraflarla ilişkisini, barışçıl uzlaşmayı ve güvenilirliğin rolünü düşün. Bir olayın çözüm üretmeyle ilgili olması onu kendiliğinden vahiy kâtipliği yapmaz; görev adı yaptığı işle belirlenir. Soru bir tutumu istiyorsa hangi davranışın uzlaşmaya dayanak olduğunu göster, yalnız tarihî nesnenin adına takılma.",
        ],
      },
      {
        title: "Gençlere görev vermek neyi gösterir?",
        paragraphs: [
          "MEBİ, Hz. Muhammed’in gençleri vahiy kâtipliği, öğrenme, öğretme, yabancı dil, fetva, yönetim ve komutanlık gibi farklı alanlarda görevlendirdiğini belirtir. Ortak yaklaşım, gençlerin yeteneklerine uygun sorumluluk üstlenebilmesine alan açmaktır. Gençlik, tek başına göreve ehil olmayı dışlayan bir gerekçe sayılmaz.",
          "Bunun tersi de doğmaz: Bir gence görev verilmesi, her gencin her işi aynı yeterlikle yapabildiğini kanıtlamaz. Görev, bilgi ve koşul birlikte değerlendirilir. Bir soruda “yalnız yaş” ile “liyakat” karşılaştırılıyorsa yeterlik ve sorumluluk ilişkisine bak; yaşın her durumda önemsiz olduğu gibi başka bir mutlak kural kurma.",
        ],
      },
      {
        title: "Sahabi kavramı ve rol çeşitliliği",
        paragraphs: [
          "Sahabi, Hz. Muhammed ile Müslüman olarak bir araya gelmiş ve Müslüman olarak vefat etmiş kişi için kullanılan dinî-tarihî terimdir. Genç sahabiler yalnız tek bir meslek grubu değildir. Öğretim, kaynak aktarımı, mekân sağlama, sosyal destek ve yönetim gibi farklı alanlarda faaliyet göstermişlerdir.",
          "Bir kişiyi tek baskın örnekle tanıtmak, onun hayatının yalnız o görevden oluştuğunu söylemek değildir. Erkam’ın eğitim için evini açması onu başka faaliyetlerde bulunmamış yapmaz; Musab’ın öğretici olması sancaktarlık bilgisini dışlamaz. Tabloyu kimliklerin tamamı yerine öğrenmeye giriş haritası olarak kullan, sonra olayın kendi verisine dön.",
        ],
      },
      {
        title: "Hz. Ali: emanet ve fedakârlık",
        paragraphs: [
          "Hz. Ali küçük yaşta Hz. Muhammed’in yanında yetişmiş ve ilk Müslümanlar arasında yer almıştır. Hicret anlatısında, Hz. Muhammed’in güvenle ayrılmasına yardımcı olmak ve emanetleri sahiplerine ulaştırmak üzere sorumluluk üstlenmesi öne çıkar. Emanet görevi ile yolculuğun güvenliği aynı olayın iki ayrı yönüdür.",
          "MEBİ ayrıca Hz. Ali’nin muâhât denilen kardeşlik dayanışmasındaki yerini, gazvelerdeki görevlerini ve ilim, takva, samimiyet, fedakârlık ile kahramanlığını anlatır. Soruda hangi olay veriliyorsa ona uygun değeri seç. Emaneti koruma fiilini yalnız savaşçılık olarak okumak, metnin belirli bilgi alanını kaybettirir.",
        ],
      },
      {
        title: "Erkam: eğitime mekân sağlamak",
        paragraphs: [
          "Erkam bin Ebülerkam, İslam’ın ilk döneminde evini Hz. Muhammed ile Müslümanlara açmıştır. Dârülerkâm adıyla anılan bu mekân tebliğ ve eğitim için kullanılmıştır. Böylece eğitim yalnız anlatan kişiyle değil, güvenli bir ortam ve toplumsal destekle de yürüyen bir faaliyet olarak görünür olur.",
          "Erkam’ın bu katkısı cesaret ve fedakârlık bağlamında ele alınır; MEBİ başka görevlerinden de söz eder. Onu tanımada ayırt edici ifade “evini eğitim için açmak”tır. Medine’ye öğretici gönderilme ise Musab’la ilişkilidir. Aynı amaca iki kişinin katkıda bulunması onların aynı kişi veya birebir aynı görevde olduğunu göstermez.",
        ],
      },
      {
        title: "Musab: öğreticilik ve iletişim",
        paragraphs: [
          "Musab bin Umeyr, refah içinde yetişmişken İslam’ı benimsemiş, baskılar karşısında bu tercihini sürdürmüş genç sahabidir. Habeşistan’a hicreti ve Akabe görüşmeleri sonrasında Medine’de öğretici olarak görevlendirilmesi, MEBİ’nin anlattığı temel hayat bağlarıdır. Bu öğreticilik, bilgiyi başka topluluğa anlaşılır biçimde aktarmayı içerir.",
          "Kaynak onun sabrını, anlayışlı iletişimini ve sancaktarlık görevini de belirtir; Uhud’da hayatını kaybetmiştir. Bu yüzden onu yalnız ev sağlayan kişiyle veya yalnız komutan olarak görevlendirilen kişiyle eşitleme. Kişi–rol tablosunda öğreticilik baskın giriş bilgisidir; daha ayrıntılı pasajda verilen başka rol de aynı kişiye ait olabilir.",
        ],
      },
      {
        title: "Üsame: gençlik, güven ve liyakat",
        paragraphs: [
          "Üsame bin Zeyd, Zeyd bin Hârise’nin oğludur. Hz. Muhammed’in genç Üsame’yi Suriye’ye gönderilmesi planlanan orduya komutan tayin etmesi, gençlere güven ve göreve uygunluk bakımından ele alınır. Burada dersin öne çıkardığı ilke, sorumluluğun yalnız sınıf veya yaşla belirlenmemesidir.",
          "Komutanlık, öğreticilik veya ilim aktarımıyla aynı görev adı değildir; fakat hepsi sorumluluk üstlenmenin örneği olabilir. Kaynaklarda gençliğin farklı evreleri ve seferler anlatılırken tarihe veya yaşa ait ayrıntı verilmişse onu kendi olayıyla tut. Bu ünitede doğrulanmamış kesin yaş hesabından görev türü sonucu üretilmez.",
        ],
      },
      {
        title: "Muaz: bilgi ile yönetim arasında bağ",
        paragraphs: [
          "Muaz bin Cebel, dinî bilgi ve fıkıh alanındaki yetkinliğiyle, öğretici ve yönetici görevleriyle tanıtılır. MEBİ Mekke’de yönetim ve öğretim, Yemen’de zekât ve kadılık bağlamlarını belirtir. Kadılık, uyuşmazlık ve hukukla ilgili yargılama görevini; muallimlik ise öğreticiliği öne çıkarır.",
          "Bu örnek, aynı kişinin birden çok görev alabilmesini açıkça gösterir. “Muaz yönetici olduğuna göre öğretmez.” çıkarımı geçerli değildir. Soru yalnız kişi eşleştirmesi istiyorsa verilen belirleyici göreve bak; ilkeye yöneliyorsa bilgi, yeterlik ve sorumluluğun nasıl birleştiğini açıkla. Kişinin bütün hayatını tek kelimelik etikete daraltma.",
        ],
      },
      {
        title: "Hz. Aişe: soru sormak ve bilgiyi aktarmak",
        paragraphs: [
          "Hz. Aişe, doğrudan öğrenmesi, merak ettiği konularda soru sorması ve edindiği bilgileri başkalarına aktarmasıyla tanıtılır. MEBİ onu dinî ilimler yanında tarih, edebiyat, şiir ve tıp bilgisiyle de anılan genç bir âlim olarak ele alır. Âlim burada yalnız bilgiyi duymuş değil, önemli bir birikime ulaşmış kişidir.",
          "Kaynak 2210 hadis rivayetini, aktarıcı rolünü somutlaştıran sayı olarak verir; bu sayı farklı bütün kaynakların bağımsız küresel toplamı diye yeniden kurulmaz. Öğrenme bakımından temel bağ soru→anlama→aktarımdır. Kadın âlim örneği varken bütün dinî bilgi aktarımını yalnız erkeklere yükleyen seçenek, verilen kapsamı dışlar.",
        ],
      },
      {
        title: "Hz. Fatıma: destek, paylaşım ve eğitim",
        paragraphs: [
          "Hz. Fatıma, zorlu Mekke koşullarında babasına destek olması, Uhud’da yaralılara yardım etmesi ve mütevazı yaşayarak paylaşmasıyla anlatılır. Genç anne rolü de çocukların eğitiminde üstlendiği sorumlulukla birlikte ele alınır. Yardım, aile desteği ve eğitim aynı kişinin hayatındaki farklı faaliyetler olabilir.",
          "MEBİ, Hz. Ali ile evliliğinden Hz. Hasan ve Hz. Hüseyin’i özellikle anarak yetiştirme rolünü örneklendirir. Verilen iki ad, başka bir bağlamda bütün aile bilgisinin eksiksiz listesi olarak kullanılmaz. Soruda olayın hangi yönü vurgulanıyorsa o fiile dön: yaralıya yardım ile bilgi aktarma farklı davranışlardır; her ikisi toplumsal katkı olabilir.",
        ],
      },
      {
        title: "Esma: hicrette sorumluluk",
        paragraphs: [
          "Esma binti Ebû Bekir, Ebû Bekir’in kızı ve Hz. Aişe’nin kız kardeşidir. Kaynak onu İslam’ın erken dönemindeki hizmetleri ve hicret sırasında babasına yardım etmesiyle tanıtır. Sabır, metanet ve üstlenilen sorumluluğu yerine getirme bu örneğin öne çıkan yönleridir.",
          "Esma binti Ebû Bekir’i, Cafer’in eşi olan Esma binti Umeys ile yalnız adları aynı diye birleştirme. Tam isim, akrabalık veya olayın yeri gerektiğinde ayırt edici kanıttır. Sınav metni kişiyi açıkça veriyorsa başka bir Esma’nın faaliyetini ona taşımak yerine verilen eylemin neyi desteklediğini incele.",
        ],
      },
      {
        title: "Cafer: temsil ve sözle savunma",
        paragraphs: [
          "Cafer bin Ebû Talib, Hz. Ali’nin ağabeyidir ve Habeşistan’a hicret eden ilk Müslümanlar arasında yer alır. MEBİ, Necaşi’nin huzurunda Müslümanların sığınma hakkını savunmasını gençliğin diplomatik ve temsil yönüne örnek verir. Burada belirleyici iş, topluluğun durumunu sözle açıklayarak hakkını savunmaktır.",
          "Kaynak Cafer’in cesaretini ve Mûte’de hayatını kaybetmesini de belirtir. Aynı kişide diplomatik temsil ile başka görevler bulunabilir; yalnız birini tanımak ötekini yanlış yapmaz. Bir soruda kral huzurundaki savunma anlatılıyorsa onu öğretim için ev açma veya Medine’de görevlendirilme olayıyla aynılaştırma.",
        ],
      },
      {
        title: "Âl-i İmrân 159: ilişki ve karar süreci",
        paragraphs: [
          "Âl-i İmrân 159’da yumuşak davranma, bağışlama, iş hakkında danışma ve karar sonrasında Allah’a güvenme birlikte yer alır. MEBİ bu mesajı Uhud sonrasındaki ilişki bağlamıyla açıklar. İstişare, bir konuda başkalarının görüşlerini almak; tevekkül ise sorumluluk üstlenerek Allah’a güvenmek çerçevesinde değerlendirilir.",
          "Bu sıralamada danışmak karar vermemek demek değildir; güvenmek de hiçbir iş yapmadan sonucu beklemek değildir. Bir metin yalnız danışma fiilini veriyorsa ondan bütün kararların her ayrıntısının bilindiği sonucu çıkmaz. Kökün istediği ilkeyi ayetteki belirli sözle bağla; bütün dinî bilgiyi tek ayetin açık içeriğiymiş gibi ekleme.",
        ],
      },
      {
        title: "Bilinçli örnek alma ve biçimsel tekrar",
        paragraphs: [
          "Bilinçli örnek alma, davranışın hangi amaç ve gerekçeyle yapıldığını anlayarak uygun koşulda ilkeyi uygulamayı içerir. Sadece aynı dış hareketi yapmak bu anlayışı tek başına kanıtlamaz. Örneğin emanete özen gösterme ilkesini yeni bir okul görevi içinde sürdürmek, tarihî olayın dış görünüşünü aynen üretmeyi gerektirmez.",
          "Buna karşılık bir kişinin gerekçesi metinde verilmemişse gerçekte hiçbir şeyi anlamadığını kesin söyleyemezsin; yalnız bu anlayışa kanıt sunulmadığını belirtirsin. Uygulama insanın iç dünyasını otomatik ölçmez. Soruda belirtilen eylem, amaç bilgisi ve koşul arasında açık bağ kurmak, salt benzerlikten daha sağlam bir yorum sağlar.",
        ],
      },
      {
        title: "Rol haritasından yeni olaya aktar",
        paragraphs: [
          "Önce kişilerle görevleri ayrı düğümlerde düşün: mekân sağlama, öğretme, komuta, ilim aktarımı, temsil ve sosyal destek. Sonra bunların güven, fedakârlık veya sorumluluk gibi hangi ortak değerlerle ilişkili olduğunu incele. Ortak değer aynı görev demek değildir; ortak görev de bütün hayatın aynı olduğu anlamına gelmez.",
          "Etkileşimde seçili kişileri ve inceleme alanını değiştirince bağlar gerçekten değişir; anlatılan olayın kanıtını açıklamada görürsün. Daha sonra aynı ilkeyi farklı bir çağdaş örnekte tanımayı dene. Bu haritada dolaşmak puan veya ustalık değildir; bağımsız soruda yeni metnin fiillerini ve kapsamını kendin açıklaman gerekir.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı amaca farklı katkı",
        prompt:
          "Bir okul sergisinde Deniz araştırmayı anlatıyor; Ece ise toplantı için erişilebilir salon ayarlıyor. İki öğrenci de aynı öğrenme etkinliğini destekliyor.\nGörev ve ortak amaç ilişkisini hangi seçenek açıklar?\nA) Görevler farklı, öğrenmeye katkı ortak. B) İki görev tam aynı iştir. C) Salon ayarlayanın hiçbir katkısı yoktur. D) Anlatan kişi bütün işleri tek başına yapmıştır. E) İki kişi aynı kişi olmak zorundadır.",
        strategy: "Amaç ortaklığını iş özdeşliğiyle karıştırma.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "Deniz’in fiili anlatmak, Ece’nin fiili ortam ayarlamaktır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Bu fiiller aynı görev değildir ama aynı etkinliği destekler.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "A iki bilgiyi korur; B işi tekleştirir, C katkıyı siler, D ve E ek iddia kurar.",
          },
        ],
        answer: "A: Farklı rol, ortak öğrenme katkısı.",
        check:
          "Ece’nin katkısını yok saymadan görev farkını açıklayabildin mi?",
        pitfall: "Ortak amaçtan herkesin aynı işi yaptığı sonucunu çıkarmak.",
      },
      {
        title: "Yeterlik ölçütünü seç",
        prompt:
          "Bir robotik takımında genç Zeynep güvenlik prosedürünü ve devreyi en iyi bildiği için koordinatör seçiliyor. Yaşça büyük iki kişi de ekipte bulunuyor.\nAtamanın metindeki gerekçesi nedir?\nA) Yalnız yaş sırası. B) Göreve uygun bilgi ve yeterlik. C) Bütün büyüklerin yetersiz olması. D) Kura sonucu. E) Herkesin her işi aynı bilmesi.",
        strategy: "Atama nedeni ile sonuçtan uydurulan genellemeyi ayır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "Koordinatör seçiminin gerekçesi bilgi ve prosedür yeterliğidir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Diğer kişilerin yaşça büyük olması, yeterlik ölçütünün yaşa indirgenmediğini gösterir.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "B doğrudan verilen nedeni karşılar; diğerleri kura veya evrensel yetersizlik ekler.",
          },
        ],
        answer: "B: Göreve uygun yeterlik.",
        check:
          "Metin kimsenin bütün alanlarda yetersiz olduğunu söylemiyor; cevabın bunu koruyor mu?",
        pitfall:
          "Genç bir seçildi diye bütün büyüklerin hiçbir şey bilmediğini söylemek.",
      },
      {
        title: "Aynı ad, farklı kimlik",
        prompt:
          "Kulüp arşivinde “Elif Kaya, gezi rehberi” ve “Elif Demir, kayıt sorumlusu” yazıyor. İlk adları aynı olduğu için bir görev tek kişiye taşınmak isteniyor.\nHangi kontrol önce yapılmalıdır?\nA) Bütün adları silmek. B) İki görevi aynı kabul etmek. C) Soyadı ve görev kaydını karşılaştırmak. D) İlk adı yeterli saymak. E) Her iki kaydı otomatik yanlış saymak.",
        strategy: "Kimliği ortak isimden daha ayırt edici verilerle doğrula.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "İki kayıtta ilk ad aynı, soyadları farklıdır.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Görevler de farklı kimlik kayıtlarına bağlanmıştır.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "C ayrımı kontrol eder; diğerleri kanıtı siler veya gerekçesiz kimlik eşitliği kurar.",
          },
        ],
        answer: "C: Tam ad ve görev bağını incele.",
        check:
          "Bir kişinin görevini ötekine taşımadan önce kimlik kanıtın var mı?",
        pitfall: "Ortak ilk adı tek kişi kanıtı saymak.",
      },
      {
        title: "Danışma ile kararı birlikte tut",
        prompt:
          "Bir gençlik grubu önce üyelerinin görüşlerini topluyor, sonra uygun planı seçip iş bölümünü yapıyor. Grup sorumlusu süreç sonunda sonucu Allah’a güvenerek karşılayacağını söylüyor.\nBu süreç hangi yorumla uyumludur?\nA) Hiç hazırlık yapılmamıştır. B) Danışmak karar vermeyi engellemiştir. C) Güvenmek görevleri silmiştir. D) Danışma, karar ve sorumluluk birlikte bulunur. E) Herkes mutlaka aynı görüştedir.",
        strategy: "Süreçte gerçekleşen fiilleri sırayla koru.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "Üyelerden görüş alınması danışmadır.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Plan seçimi ve iş bölümü fiilen yapılmıştır.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "D bu eylemlerle güven yönelişini birlikte tutar; A-C gerçekleşen işleri yok sayar, E oybirliği ekler.",
          },
        ],
        answer: "D: İstişare ve eylemle birlikte güven.",
        check: "Güvenme cümlesi önceki iş bölümünü iptal ediyor mu? Hayır.",
        pitfall: "Tevekkülü yapılan hazırlığı yok sayan bekleyiş diye okumak.",
      },
      {
        title: "Gerekçeyi yeni araca taşı",
        prompt:
          "Bir öğrenci okul müzesinde ödünç nesneyi sahibine sağlam teslim etmenin anlamını öğreniyor. Sonra arkadaşından aldığı ses kaydını izinsiz çoğaltmıyor.\nBu iki davranış arasındaki bilinçli bağ nedir?\nA) İki nesnenin aynı maddeden olması. B) Bütün olayların aynı yılda olması. C) Ses kaydının tarihî müze nesnesi olması. D) Her hareketin aynen kopyalanması. E) Emanete özen ilkesinin farklı araca aktarılması.",
        strategy: "Ortak ilkeyi değişen nesneden ayır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation:
              "İlk nesne fiziksel müze eşyası, ikincisi ses kaydıdır.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "İkisinde korunan hak, emanetin sahibinin yetkisidir.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "E bu ortak gerekçeyi açıklar; madde, zaman veya hareket aynılığı verilmemiştir.",
          },
        ],
        answer: "E: İlkeyi yeni koşula aktarmak.",
        check: "Araç değişse de hangi hak korunuyor?",
        pitfall: "Örnek almayı yalnız aynı fiziksel nesneyi üretmek saymak.",
      },
      {
        title: "Sınırlı kanıtla yorum",
        prompt:
          "Bir biyografi paragrafı bir gencin iki yararlı işini anlatır; başka faaliyetlerinden söz etmez.\nHangi okuma doğrudur?\nA) Bu iki iş katkı örneğidir; bütün hayatın eksiksiz listesi değildir. B) Başka hiçbir faaliyeti olamaz. C) Her konuda uzman olduğu kesindir. D) İki iş aynı tek olaydır. E) Bütün gençler aynı işleri yapmıştır.",
        strategy: "Örnek listeyle eksiksiz envanteri ayır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "Paragraf yalnız iki iş verir.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Başka faaliyetleri dışlayan bir kayıt bulunmaz.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "A verilen katkıyı koruyup ek dışlamayı önler; diğerleri kapsamı büyütür.",
          },
        ],
        answer: "A: Örnekler sınırlı kanıt sunar.",
        check: "Parçada “yalnız bunları yaptı” kaydı var mı?",
        pitfall: "Sayılmayanı hiç gerçekleşmemiş kabul etmek.",
      },
    ],
    recall: [
      {
        prompt: "Gençlere görev verilmesinde liyakat neyi anlatır?",
        answer:
          "Belirli göreve uygun bilgi ve yeterliği; her gencin her işi aynı yapabildiğini değil.",
      },
      {
        prompt: "Erkam ve Musab’ın öğretime katkısı nasıl ayrılır?",
        answer:
          "Erkam evini eğitim için açar; Musab Medine’de öğretici olarak görevlendirilir.",
      },
      {
        prompt: "Ali ve Cafer’in örnek rollerini ayır.",
        answer:
          "Ali hicrette emanet sorumluluğuyla; Cafer Necaşi huzurunda temsil ve savunmayla anlatılır.",
      },
      {
        prompt: "Hz. Aişe’nin öğrenme örneğinin zinciri nedir?",
        answer: "Merak ve soru sorma, anlama ve edindiği bilgiyi aktarma.",
      },
      {
        prompt: "Âl-i İmrân 159’da istişare neden pasif bekleyiş değildir?",
        answer:
          "Danışma sonrasında karar ve sorumlulukla güven birlikte yer alır.",
      },
      {
        prompt: "Bilinçli örnek alma ile biçimsel taklidi nasıl ayırırsın?",
        answer:
          "Amaç ve uygun koşulu anlayarak ilkeyi aktarma; yalnız dış hareketin aynılığı yeterli değildir.",
      },
    ],
  },
  {
    id: "allah-ve-insan-iliskisi",
    title: "Allah ve insan ilişkisi: inanç, sorumluluk ve anlam",
    minutes: 110,
    objectives: [
      "İslam düşüncesindeki yaratıcı anlayışını, isim ve sıfatların anlamlarını açıklayarak ayır.",
      "Felsefi ve dinî gerekçelendirme ile deneysel bilgi iddiasını birbirine karıştırma.",
      "Dua, ibadet, tövbe ve sorumluluk ilişkisini günlük durumlarda gerekçelendir.",
      "Rûm 18–27 pasajlarının verdiği mesajı metnin kapsamıyla sınırla.",
    ],
    source:
      "MEBİ TYT Din Kültürü, basılı 38–45(gerçekPDF 40–47); Aurelia Allah ve insan ilişkisi kağıdı 9 sayfa. Kaynaklar karşılaştırılarak hazırlanmış özgün öğretim ve alıştırmalar.",
    sections: [
      {
        title: "İlişkinin iki tarafını ayır",
        paragraphs: [
          "Bu başlık İslam dininde Allah’ın nasıl tanıtıldığını ve insana hangi sorumlulukların yüklendiğini birlikte inceler. Bir yanda yaratma, bilme, güç yetirme ve merhamet gibi ilahî nitelikler; diğer yanda insanın aklı, iradesi, tercihi ve davranışı vardır. Aynı kavramı iki tarafın bütün özelliklerine rastgele uygulamazsın.",
          "Dinî öğretinin ne söylediğini açıklamak, öğrencinin kişisel inancını veya ahlaki değerini sınamak değildir. Bir soruda “kaynağa göre” dendiğinde verilen düşünceyi doğru temsil etmen istenir. Modelde bir isim veya pasaj seçmek de o inancı benimseme, konu tamamlama ya da ustalık kaydı oluşturmaz.",
        ],
      },
      {
        title: "Fıtrat: yaratılış ve yönelim",
        paragraphs: [
          "Fıtrat, İslam öğretisinde insanın yaratılışındaki temel yatkınlık ve yönelim için kullanılan terimdir. MEBİ inanma ve anlam arayışını bu çerçevede ele alır. Bir yatkınlıktan söz etmek, her kişinin aynı davranışı göstereceğini veya bütün dinî bilgileri doğuştan eksiksiz bildiğini söylemek değildir.",
          "Bu kavram kaynağın dinî insan anlayışı içinde öğretilir; evrensel davranış sıklığına ilişkin yapılmış bir psikoloji deneyinin sonucu diye sunulmaz. Soruda anlam arayışı verilmişse fıtratla kurulan ilişkiyi açıklayabilirsin. Ancak bu tek veriden belirli bir kişinin bütün inancını veya tercihlerini zorunlu çıkaramazsın.",
        ],
      },
      {
        title: "Gaye ve nizam gerekçesi",
        paragraphs: [
          "Gaye, amaç; nizam, düzen demektir. MEBİ’de evrendeki uyum ve işleyişten yaratıcı fikrine yönelen açıklama gaye ve nizam delili olarak sunulur. Düşüncenin yapısı gözlenen düzenden bir amaç ve düzenleyici yorumuna geçmektir. Konuyu tanımak için önce hangi gözlemin hangi sonuca dayanak yapıldığını ayır.",
          "Bu gerekçelendirme din felsefesi ve teoloji çerçevesindedir; fiziksel bir ölçümün tek başına zorunlu sonucu diye sunulmaz. Aynı olgunun bilimsel olarak nasıl gerçekleştiği ile niçin var olduğu hakkında felsefi yorum yapmak farklı sorulardır. “Düzen gözlendi” öncülünü “bütün felsefi görüşler deneyle elendi” sonucuna büyütme.",
        ],
      },
      {
        title: "Ekmel varlık düşüncesi",
        paragraphs: [
          "Ekmel, en yetkin anlamını taşır. Kaynakta insanın zihnindeki en mükemmel varlık düşüncesinden Allah’ın varlığına yönelen akıl yürütme anlatılır. Buradaki başlangıç, bir laboratuvar ölçümü değil, yetkinlik fikri ve bu fikrin varlıkla ilişkisidir. Bu nedenle gerekçenin türünü belirlerken kullanılan öncüle bakılır.",
          "Bir soruda zihindeki mükemmellik tasarımı vurgulanıyorsa bunu doğrudan gaye ve nizamla eşitleme; ikisi aynı sonuca yönelse de başlangıçları farklıdır. Bir düşünceyi öğrenmek onun felsefi tartışmasını bitirmek değildir. Kavramsal savı deneye dayalı kanıt diye adlandırmak, gerekçenin ait olduğu alanı değiştirir.",
        ],
      },
      {
        title: "Esmaihüsna: isim ve anlam",
        paragraphs: [
          "Esmaihüsna, Allah’ın güzel isimleri için kullanılan terimdir. İsimler yalnız ezberlenecek sesler değil, kaynakta Allah’ın nasıl tanıtıldığını belirten anlam kapılarıdır. Ehad birlik ve eşsizliği; Halık yaratmayı; Hayy diri oluşu; Rezzak rızık vermeyi öne çıkarır. Bir isim için tanımdaki belirleyici eylemi bul.",
          "Aynı olay birden çok isimle ilişkilendirilebilir; bu, bütün isimlerin aynı anlama geldiğini göstermez. Bir canlıya hayat verilmesi Muhyî, Allah’ın diri oluşu Hayy ile açıklanır. Soru belirli bir fiili istiyorsa o fiile en doğrudan karşılık veren anlamı seç, yalnız olayda canlı sözcüğünün bulunmasıyla karar verme.",
        ],
      },
      {
        title: "Ehad ve tevhid",
        paragraphs: [
          "Ehad, Allah’ın bir ve eşsiz oluşunu ifade eder. Tevhid ise Allah’ı zatında, sıfatlarında ve fiillerinde bir kabul etme, kulluğu yalnız O’na yöneltme ilkesidir. MEBİ bu birliği Allah’ı tanımanın merkezinde ele alır. Birlik sözcüğü yalnız aritmetik bir sayı değil, eşi ve dengi bulunmaması anlamını da taşır.",
          "Bir metin yalnız yaratmadan söz ediyorsa birlik ilkesinin bütün ayrıntısını açıkça söylediğini varsayma. Buna karşılık “ortağı ve benzeri yoktur” ifadesi birlik ve eşsizlik için belirleyici kanıttır. Bir kavramı açıklarken kaynaktaki kapsamı koru; öğrencinin kişisel beyanından inanç derecesi çıkarmak bu öğretimin parçası değildir.",
        ],
      },
      {
        title: "Halık, Bâri ve Musavvir",
        paragraphs: [
          "MEBİ, Halık’ı yaratma; Bâri’yi varlıkları örneksiz meydana getirme; Musavvir’i biçim ve özellik verme yönüyle açıklar. Bunlar yaratma fikrinin farklı anlam vurgularıdır. Bir soruda özellikle şekil, suret veya biçim verilmesi öne çıkarılmışsa Musavvir ayrıntısı, genel yaratma ifadesinden daha ayırt edici olabilir.",
          "Bu isimler doğadaki biçimlenmenin biyolojik veya fiziksel mekanizmasının yerine konan deneysel açıklamalar değildir; dinî metnin anlam alanında öğretilir. Bir olayın yaratmayla ilişkili oluşundan hangi ismin özellikle sorulduğunu çıkarmak için fiilin nesnesine bak: var etme mi, biçim verme mi, hayat verme mi?",
        ],
      },
      {
        title: "Hayy ile Muhyî aynı değildir",
        paragraphs: [
          "Hayy, diri olan anlamındadır; Muhyî, hayat veren anlamını taşır. “Allah diridir” önermesi ile “Allah canlılara hayat verir” önermesinin yüklemleri farklıdır. Hayat sıfatı ilahî diri oluşu ifade ederken Muhyî ismi hayat verme fiilini öne çıkarır. Bir tablodaki benzer sözcükler bu ayrımı ortadan kaldırmaz.",
          "Bu ayrımın kısa kontrolü özne ile yönü yazmaktır: diri olan kim, hayat verilen kim? Kaynaktaki bir canlı doğumu örneğinde hayat verme vurgusu varsa Muhyî seçilir; sırf canlı örneği var diye Hayy adı tek zorunlu karşılık olmaz. Tekvin ise daha geniş yaratma sıfatıdır; bütün bu terimleri tek kutuda toplama.",
        ],
      },
      {
        title: "Rahman, Rezzak ve Şâfi",
        paragraphs: [
          "Rahman merhameti, Rezzak rızık vermeyi, Şâfi şifa vermeyi ifade eden isimlerdir. Kaynak anne şefkati, beslenme imkânı ve iyileşme gibi günlük durumları bu isimlerin anlamlarını fark ettiren örnekler olarak kullanır. Burada yapılan, olayın dinî yorumda hangi kavramla ilişkilendirildiğini öğrenmektir.",
          "Şâfi adını öğrenmek tedaviye ihtiyaç olmadığı anlamına gelmez; ilaç, hekim desteği ve koruyucu önlemler pratik sorumluluğun parçasıdır. Bir metin yalnız besin imkânından söz ediyorsa iyileşme gerçekleştiğini ekleme. Kavramların arasında ilişki bulunabilir, fakat sorunun belirli kanıtına uygun anlam ayrı seçilmelidir.",
        ],
      },
      {
        title: "İlim, kudret, irade ve tekvin",
        paragraphs: [
          "İlim bilme, kudret güç yetirme, irade dileme ve tercih, tekvin yaratma anlamıyla öğretilir. İslam öğretisinde bu sıfatlar Allah’a nispet edilir. Bir soruda “her şeyi bilme” açıkça veriliyorsa ilim; “var etme” vurgulanıyorsa tekvin doğrudan karşılıktır. Aynı cümle birden çok sıfatı da birlikte anabilir.",
          "Bir niteliğin başka bir nitelikle ilişkili olması, metnin hepsini ayrı ayrı söylediğini kanıtlamaz. “Bildiği için yaratmıştır” yorumu iki önermeyi gerektirir; yalnız yaratma cümlesinden eksik gerekçeyi tamamlayamazsın. Soruyu çözerken verilen fiil, sorulan sıfat ve metin kanıtı arasında açık üçlü bağ kur.",
        ],
      },
      {
        title: "İnsan: akıl, irade ve sorumluluk",
        paragraphs: [
          "MEBİ insanın düşünme, seçme, öğrenme ve davranışını değerlendirme yetilerini Allah–insan ilişkisi içinde ele alır. Akıl seçenekleri değerlendirmeyi, irade tercih etmeyi, sorumluluk ise tercih ve eylemlerin sonuçlarını üstlenmeyi öne çıkarır. Bu üç kavram ilişkilidir; hiçbiri “insan her şeyi kontrol eder” demek değildir.",
          "Bir öğrencinin hazırlık yapması kendi eylemidir; sınavın bütün dış koşullarını yönetmesi mümkün değildir. Sorumluluğu yetki ve imkânla birlikte düşünmek gerekir. Dinî metnin irade vurgusu, insanın sınırsız güç sahibi olduğu sonucunu vermez; ilahî kudretle insanın sınırlı kapasitesini aynı ölçekte tanımlama.",
        ],
      },
      {
        title: "Alîm, Basîr ve Semî: fiilleri ayrı tanı",
        paragraphs: [
          "Alîm her şeyi bilen, Basîr gören, Semî işiten anlamıyla öğretilen isimlerdir. İlim bilme, basar görme, sem işitme sıfat adlarıdır. Kaynakta isim ile niteliğin fiili birlikte düşünülür: bilmek, görmek ve işitmek ilişkili olabilir ama aynı tanım değildir. Bir soru özellikle hangi fiili veriyorsa önce onu belirle.",
          "Bir ses örneğinde yalnız işitme fiili vurgulanmışsa doğrudan Semî anlamı aranır; yalnız görme vurgusunda Basîr öne çıkar. Bu seçim, ilahî bilginin başka hiçbir yönü olmadığı iddiası değil, kökün istediği belirli anlamı ayırmadır. Kaynağın soyut nitelik açıklamasını insan bedenine ait bir organ tasviri olarak çizmemek gerekir.",
        ],
      },
      {
        title: "Rahmân, Rahîm ve vahdaniyet terimleri",
        paragraphs: [
          "Aurelia kağıdı merhamet bağlamında Rahmân ve Rahîm isimlerini birlikte anmaktadır. Bu ünitede iki isim Allah’ın merhametini ifade eden anlam alanıyla öğrenilir; her kısa olaydan kaynakta verilmeyen ayrıntılı bir kullanım sınırı uydurulmaz. Metnin hangi ismi özellikle kullandığı ve hangi anlamı öne çıkardığı birlikte okunur.",
          "Vahdaniyet Allah’ın birliği ve eşsizliğiyle ilgili sıfat terimidir; Ehad ve tevhidle bağlantısı bu anlam üzerinden kurulur. Birliği ifade eden isim, sıfat ve ilke aynı öğrenme ağında bulunabilir, fakat dilsel türleri aynı olmak zorunda değildir. Bir soru isim mi, sıfat mı, ilke mi istiyor diye bakmak yakın doğru seçenekleri ayırmayı kolaylaştırır.",
        ],
      },
      {
        title: "Halife ve emanet anlayışı",
        paragraphs: [
          "Kaynak insanı yeryüzündeki imkânları sorumlulukla kullanan varlık olarak ele alır. Halifelik ve emanet kavramları, doğa ve toplum karşısında görev üstlenme çerçevesindedir. Sahip olunan bir imkânı dilediği gibi tüketme serbestisiyle, o imkânın hakkını gözetme yükümlülüğü aynı şey değildir.",
          "Çevreyi koruma, hakkı gözetme ve kaynakları savurgan kullanmama bu sorumluluk fikriyle ilişkilendirilebilir. Bir soruda “emanet” denildiğinde yalnız maddi eşya düşünmek yetersiz kalabilir; görev ve imkânlar da emanet kapsamında anlatılır. Yine de somut olay verilmeden kişinin bütün davranışlarına ilişkin kesin not verilmez.",
        ],
      },
      {
        title: "Dua: istek, yakınlık ve iletişim",
        paragraphs: [
          "Dua Allah’a yönelme, yalvarma ve isteğini ifade etme olarak anlatılır. Kaynakta yalnız sıkıntı anında bir dilek değil, şükür ve yakınlık boyutunu da içerir. Sözle veya içten bir yöneliş olarak ele alınabilen dua, kişinin hangi ihtiyacı ve ilişkiyi dile getirdiğiyle anlaşılır.",
          "Dua etmek bir hazırlığı yapmış olmakla aynı eylem değildir. Çalışma planı, dinlenme ve doğru kaynak kullanımı yerine yalnız dileği koymak sorumluluk bağını eksiltir. Dinî umut ile “şu işlemi yaparsan kesin şu sınav neti gelir” gibi ölçülmemiş başarı garantisi birbirine karıştırılmaz.",
        ],
      },
      {
        title: "İbadet: belirli biçimler ve geniş anlam",
        paragraphs: [
          "İbadet dinî öğretide Allah’a kulluk amacıyla yapılan söz, davranış ve yönelişleri içerir. Namaz, oruç, zekât ve hac belirli ibadet örnekleridir. Daha geniş anlamda doğru niyetle yapılan yararlı davranışlar da kullukla ilişkilendirilebilir. Hangi anlamın kullanıldığını pasajın bağlamı belirler.",
          "Bir davranışın yalnız dış görüntüsü, yapan kişinin bütün niyetini kanıtlamaz. Başkasının ibadetini veya inancını uygulama içi tıklamalardan derecelendirmek doğru bir ölçme değildir. Soruda belirli kavram tanımı verilmişse onun şartlarını arar, gerçek insanın iç dünyasına ilişkin kesin teşhis koymazsın.",
        ],
      },
      {
        title: "Tövbe ve istiğfar",
        paragraphs: [
          "Tövbe, yanlış davranıştan pişmanlık duyarak dönme ve onu sürdürmemeye yönelme; istiğfar bağışlanma dileme anlamıyla öğretilir. İkisi yakın kavramlardır fakat pişmanlığı davranış değişikliğine bağlama ile af dileme vurguları ayrı ayrı görülebilir. Kişinin sözünü ve eylemini birlikte incelemek bu ayrımı açık tutar.",
          "Birine zarar verilmişse yalnız üzülmek, zarar gören kişinin hakkını kendiliğinden onarmaz; mümkün düzeltme ve sorumluluk boyutu ayrıca düşünülür. Kaynak dinî bağışlanma umudunu anlatır; uygulama kişinin tövbesinin kabulünü veya ahlaki puanını hesaplamaz. Soru yalnız kavramın ifade ettiği yönelişi değerlendirebilir.",
        ],
      },
      {
        title: "Kur’an okumak, anlamak, düşünmek",
        paragraphs: [
          "MEBİ, kıraati okuma; tilaveti anlamı üzerinde düşünme ve uygulama boyutlarıyla açıklar. Bu öğretim bağlamında harfleri seslendirme ile metnin anlamını kavrama aynı faaliyet değildir. Anlam öğrenilirken bağlam, kavram ve mesaj arasındaki ilişkileri kurmak gerekir.",
          "Bir terimin farklı ilmî kullanımları olabileceğini unutma; burada verilen ders çerçevesini soruya taşırsın. Bir metni okumak onun bütün hükümlerini ezberlediğini veya hiç yanlış yapmayacağını kanıtlamaz. Önce pasajın ne söylediğini kendi cümlenle anlat, sonra yeni bir örnekte mesajın nasıl uygulanabileceğini gerekçelendir.",
        ],
      },
      {
        title: "Rûm 18–20: tesbih ve yaratılış",
        paragraphs: [
          "Rûm 18–20 çevresindeki anlatımda göklerde ve yerde Allah’ı yüceltme, diriyi ölüden ve ölüyü diriden çıkarma, yeryüzünü canlandırma ve insanın yaratılması temaları bulunur. Tesbih Allah’ı eksiklikten uzak tutarak yüceltme; hamd övgü ve şükür anlam alanlarıyla ele alınır.",
          "Bu pasajın öğretim amacı verilen yaratılış ve diriliş temasını yorumlamaktır; biyolojik bir deney tasarımı veya ayrıntılı bir evrim mekanizması ortaya koymak değildir. Soru yalnız bu bölümü verdiğinde diğer ayetlerdeki bütün öğretileri buraya ekleme. Yorumunun karşısına pasajdaki belirli temayı yaz.",
        ],
      },
      {
        title: "Rûm 21–22: sevgi ve farklılık",
        paragraphs: [
          "Rûm 21’de eşler arasında sevgi, merhamet ve huzur; 22’de göklerin ve yerin yaratılmasıyla insanların dillerinin ve renklerinin farklılığı birlikte anılır. Kaynak bu çeşitliliği tefekkür konusu ve ilahî işaret çerçevesinde ele alır. Farklılık bilgisi, insanlara üstünlük sırası vermeyi gerektirmez.",
          "Bir soruda diller ve renkler denildiğinde metnin çeşitlilik vurgusuna dön. Buradan herkesin aynı dili konuşması gerektiği veya bir grubun doğuştan üstün olduğu çıkarılamaz. Sevgi ve merhamet vurgusu ise ayrı bir ilişki boyutudur; bütün ayetleri tek sözcükle aynılaştırmadan her parçanın mesajını belirle.",
        ],
      },
      {
        title: "Rûm 23–27: düzen ve yeniden yaratma",
        paragraphs: [
          "Bu bölümde gece ve gündüz, uyku ve geçim arayışı, yağmurla yeryüzünün canlanması, göklerin ve yerin düzeni ve yeniden yaratma ele alınır. Kaynak bunları Allah’ın kudreti, hikmeti ve diriliş anlayışıyla ilişkilendirir. Verilen olayın hangi tema için kullanıldığını anlamak, her ayrıntıya yeni bir bilimsel iddia eklemekten farklıdır.",
          "Dirilişin anılması, hesap gününe ilişkin her ayrıntının aynı kısa pasajda açıkça sayıldığı anlamına gelmez. Bir soruda “bu parçadan çıkarılır” dendiğinde ayet grubunun sınırını koru. Bir başka ayetin bilgisini biliyor olman, onu burada verilmiş bir kanıt hâline getirmez.",
        ],
      },
      {
        title: "Yakın kavramları bir çizelgede ayır",
        paragraphs: [
          "Bir isim sorusunda önce belirleyici fiili yaz: diri olma→Hayy; hayat verme→Muhyî; rızık verme→Rezzak; biçim verme→Musavvir. Bir sıfat sorusunda bilme→ilim, güç yetirme→kudret, yaratma→tekvin eşleşmesini kur. Böylece benzer örnekler arasında hangi ilişkinin sorulduğunu görebilirsin.",
          "Birden çok kavram aynı olaya uyuyorsa kökün “en doğrudan”, “niyet”, “davranış” veya “çıkarılamaz” kısıtına dön. Aynı olayın başka anlamları olması tek doğru soruyu bozmak zorunda değildir; ancak gerçekten iki seçenek aynı kapsamda destekleniyorsa yeni koşul icat ederek seçim yapılmaz.",
        ],
      },
      {
        title: "Anlamdan yeni duruma geç",
        paragraphs: [
          "Etkileşimli anlam haritasında isim ile örnek metni ayrı ayrı değiştirebilirsin. Kanıt eşleşiyorsa hangi fiilin ilişkiyi kurduğu, eşleşmiyorsa hangi anlam verisinin eksik olduğu açıklanır. Bu ilişki bir Tanrı tasviri veya insanın inancını ölçen gösterge değil, kavram okuma aracıdır.",
          "Sonra sözlüğe bakmadan yeni bir durumun hangi kavramı ve hangi sınırla desteklediğini söyle. Örneği daha önce görmüş olmak bağımsız çözüm demek değildir; bu nedenle çözümlü örnekler ve puanlanan soruların bağlamları ayrıdır. Yanlışında önce hangi iki anlamı birleştirdiğini bul, sonra yeni fiille tekrar dene.",
        ],
      },
    ],
    examples: [
      {
        title: "Kavramsal savın öncülü",
        prompt:
          "İki nottan biri evrendeki uyumdan düzenleyici fikrine, öteki en yetkin varlık kavramından varlık sonucuna yöneliyor.\nSavlar hangi açıdan ayrılır?\nA) Biri mutlaka kimya formülüdür. B) Başlangıç öncülleri düzen ve kavram olarak farklıdır. C) İkisinde de yalnız sınav tarihi vardır. D) Aynı sonuca yöneldikleri için bütün adımları aynıdır. E) Hiç düşünce içermemeleriyle.",
        strategy: "Sonuç ortaklığından önce farklı başlangıçları bul.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "İlk sav uyum gözleminden hareket eder.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "İkinci sav zihinsel yetkinlik kavramından başlar.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "B iki öncülü ayırır; D sonuç benzerliğinden yapı özdeşliği çıkarır.",
          },
        ],
        answer: "B: Başlangıç öncülleri farklıdır.",
        check:
          "Gerekçelendirmeyi deneysel sonuç diye etiketledin mi? Etiketlememelisin.",
        pitfall: "Aynı sonuca giden her savı aynı yöntem sanmak.",
      },
      {
        title: "Bağımlılık benzetmesinin sınırı",
        prompt:
          "Bir öğrenci, prize takılınca çalışan ve elektrik kesilince duran masa lambasını örnek vererek Allah’ın varlığının da dışarıdan enerjiye bağlı olduğunu ileri sürüyor. Derste kıyam bi-nefsihî, Allah’ın var olmak için başka bir varlığa muhtaç olmaması olarak tanımlanmıştır.\nÖğrencinin benzetmesindeki hangi adım verilen tanımla çatışır?\nA) Lambanın bir nesne olduğunun söylenmesi. B) Lambanın ışık vermesi. C) Lambanın dış kaynağa bağımlılığının Allah’a taşınması. D) Elektrik kesilmesinin anlatılması. E) Dersin bir kavramı tanımlaması.",
        strategy:
          "Yaratılmış nesnenin koşulunu ilahî varlık hakkında kullanırken tanım sınırını koru.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Lamba elektrik kaynağına bağlı olarak çalışır; bu, verilen nesnenin özelliğidir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Kıyam bi-nefsihî tanımı Allah’ın varlığını başka bir varlığın sağlamasına muhtaç olmamasını belirtir.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "C benzetmenin tanıma aykırı aktardığı bağımlılığı gösterir; diğer seçenekler lamba veya ders hakkında verilen bilgileri tekrarlar.",
          },
        ],
        answer: "C: Nesnenin dış kaynağa bağımlılığı Allah’a aktarılmıştır.",
        check:
          "Benzetmede hangi özellik yalnız lambaya aittir ve neden aynı biçimde taşınamaz?",
        pitfall:
          "Bir nesne için bilinen varlık koşulunu Allah hakkında da zorunlu koşul saymak.",
      },
      {
        title: "Sıfat ile organı ayır",
        prompt:
          "Bir sergi panosu, işitme (sem) ve görme (basar) sıfatlarını açıklıyor. Tasarımcı, açıklamanın yanına insan kulağı ve gözü çizip “Allah’ın da aynı organlara ihtiyacı vardır.” notunu eklemek istiyor. Ders, Allah’ın yaratılmışlara benzemediğini ayrıca belirtiyor.\nHangi düzeltme iki ders bilgisini birlikte korur?\nA) İşitme ve görme anlamlarını koruyup insan organına ihtiyaç çıkarımını kaldırmak. B) İşitme ve görme anlamlarını tamamen silmek. C) Allah’ın yalnız gündüz görebildiğini eklemek. D) İnsan kulağının boyutunu ilahî sıfatın ölçüsü yapmak. E) Göz çiziminin bütün ilahî sıfatları açıkladığını söylemek.",
        strategy:
          "Sıfatın anlamını, yaratılmışın o işi yapma aracından ayrı değerlendir.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Panodaki anlamlar işitme ve görmedir; soru bu anlamların tümüyle silinmesini istemez.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Organ ihtiyacı iddiası yaratılmışlara ait bir aracı Allah’a zorunlu kılar ve benzememe bilgisiyle bağdaşmaz.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "A anlamı tutarken geçersiz organ çıkarımını kaldırır; B anlamı siler, C-E ek sınırlama veya ölçü uydurur.",
          },
        ],
        answer:
          "A: Anlam korunur, insan organına muhtaçlık çıkarımı kaldırılır.",
        check:
          "Düzeltmen hem anlamı hem yaratılmışlara benzememe sınırını koruyor mu?",
        pitfall:
          "İnsanların görme aracını ilahî görme sıfatının zorunlu organı saymak.",
      },
      {
        title: "Yöneliş ve hazırlık",
        prompt:
          "Bir sporcu dua ediyor; ardından antrenmanını güvenli sınırlar içinde sürdürüyor ve uyku düzenini koruyor.\nBu örneğe uygun yorum nedir?\nA) Hazırlık yapılmamıştır. B) Dua sakatlanmayı kesin engeller. C) Her antrenman kişiyi otomatik ahlaken kusursuz yapar. D) Uyku artık gereksizdir. E) Yöneliş ve pratik sorumluluk birlikte bulunabilir.",
        strategy: "Dinî dilek ile gerçekleşen hazırlığı ayrı doğrula.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "Dua bir yöneliş olarak verilmiştir.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Antrenman ve uyku düzeni de somut hazırlıktır.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "E ikisini korur; başarı veya sakatlanmama garantisi metinde yoktur.",
          },
        ],
        answer: "E: Dua ve sorumluluk birlikteliği.",
        check: "İki eylemden birini ötekinin yerine mi koydun?",
        pitfall: "Dinî yönelişten ölçülmemiş performans garantisi üretmek.",
      },
      {
        title: "Pişmanlık ve hak",
        prompt:
          "Bir öğrenci arkadaşının defterine zarar verdiği için pişman oluyor, özür dileyip onarım masrafını karşılıyor; ayrıca bağışlanma diliyor.\nBu anlatımda hangi ayrım korunur?\nA) Yanlıştan dönme ve af dilemeyle zarar onarımı ayrı ama birlikte eylemlerdir. B) Pişmanlık bütün maddi zararı otomatik siler. C) Af dilemek hiç söz içermez. D) Onarım varken pişmanlık imkânsızdır. E) Arkadaşın hakkı hiç söz konusu değildir.",
        strategy: "Duygu, söz ve düzeltici işi farklı satırlara koy.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "Pişmanlık ve yanlışından dönme yönelişi vardır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Defteri onarmak, zarar gören hakkına yönelik somut iştir.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "A hem yönelişi hem düzeltmeyi tutar; B zararı kendiliğinden yok sayar.",
          },
        ],
        answer: "A: Yöneliş ve onarım birlikte değerlendirilebilir.",
        check:
          "Defterin zararı yalnız sözle mi giderilmiş, yoksa ayrıca onarım var mı?",
        pitfall: "İç pişmanlığı dış zararın otomatik giderilmesi sanmak.",
      },
      {
        title: "Pasaj sınırını koru",
        prompt:
          "Bir ayet özeti yalnız yağmurla canlanma ve yeniden yaratma temasını işler. Okur, bu metinde belirli bir takvim tarihinin de yazdığını iddia ediyor.\nİddiayı denetlemek için hangi kontrol uygundur?\nA) Bütün bildiklerini metne eklemek. B) Takvim tarihini destekleyen açık ifadeyi aramak. C) Tarihin mutlaka 18 olduğunu tahmin etmek. D) Temayı bütünüyle reddetmek. E) Bütün ayetleri aynı cümle saymak.",
        strategy: "Yorumlanan tema ile ek nicel iddiayı ayır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "Özetin açık teması canlanma ve yaratmadır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Takvim bilgisi için ayrıca gün-ay-yıl ifadesi gerekir.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "B bu ek iddianın kanıtını arar; tema tek başına tarihi vermez.",
          },
        ],
        answer: "B: Ek iddia için kendi kanıtı gerekir.",
        check: "Tema doğru olsa bile tarih verilmiş mi?",
        pitfall: "Bilinen genel öğretiden verilmeyen özel tarihi çıkarmak.",
      },
    ],
    recall: [
      {
        prompt: "Hayy ile Muhyî arasındaki fiil farkı nedir?",
        answer: "Diri olan ile hayat veren; olma ve verme yönleri farklıdır.",
      },
      {
        prompt: "İlim, kudret, irade, tekvin hangi anlamları taşır?",
        answer: "Bilme, güç yetirme, dileme, yaratma.",
      },
      {
        prompt: "Gaye-nizam ve ekmel savlarının başlangıçları nasıl ayrılır?",
        answer:
          "İlki düzen ve uyumdan, ikincisi zihindeki yetkin varlık kavramından hareket eder.",
      },
      {
        prompt: "Dua hazırlığı otomatik yapmış olmak mıdır?",
        answer:
          "Hayır; yönelişle somut hazırlık ayrı ama birlikte bulunabilen eylemlerdir.",
      },
      {
        prompt: "Tövbe ile istiğfarın vurgu farkı nedir?",
        answer: "Yanlıştan dönme ve bağışlanma dileme.",
      },
      {
        prompt:
          "Rûm pasajında diriliş varsa bütün hesap ayrıntıları verilmiş midir?",
        answer:
          "Hayır; tema ile ayrıntı envanteri farklıdır, pasajın açık içeriğiyle sınırlanır.",
      },
    ],
  },
  {
    id: "islam-dusuncesinde-mezhepler",
    title: "İslam düşüncesinde mezhepler: neden, alan ve yöntem",
    minutes: 130,
    objectives: [
      "Din ile din anlayışını ve yorum farklılıklarının altı nedenini ayır.",
      "İtikadi-siyasi ve amelî-fıkhi yorumları konu ve yöntemleriyle sınıflandır.",
      "Ehlisünnet, Şia ve alt ekollerin ders kaynağındaki çerçevesini genelleme yapmadan açıkla.",
      "Nisâ 59’da itaatin meşru sınırını ve temel kaynaklara başvurmayı gerekçelendir.",
    ],
    source:
      "MEBİ TYT Din Kültürü basılı 67–73(gerçekPDF 69–75); OGM İtikadi, Siyasi ve Fıkhi Yorumlar 43 sayfa; Aurelia mezhepler kağıdı 8 sayfa. Özgün öğretim; alt ekol farkları korunmuştur.",
    sections: [
      {
        title: "Din ile din anlayışı",
        paragraphs: [
          "Kaynak din kavramını vahye dayanan esaslar, din anlayışını ise insanların bu esasları anlama ve yorumlama biçimleri için kullanır. Aynı kaynağı benimseyen iki kişinin açıklaması farklı olabilir. Buradaki farklılık, temel kaynağın mutlaka değiştiği veya iki ayrı din bulunduğu anlamına gelmez.",
          "Din anlayışı zaman, çevre, bilgi ve yöntemden etkilenebilir. Bir soruda farklılık gördüğünde önce neyin değiştiğini söyle: kaynak mı, kaynak üzerine yorum mu, belirli bir uygulama mı? “Farklı” kelimesi tek başına bunların hangisini anlatacağını belirlemez; pasajdaki ilişkiyi koruman gerekir.",
        ],
      },
      {
        title: "İki temel kaynak",
        paragraphs: [
          "İslam düşüncesinde Kur’an ve Hz. Peygamber’in sünneti temel kaynaklar olarak gösterilir. Yorumcular, yeni meseleleri bu kaynaklarla ilişkilendirerek anlamaya ve çözmeye çalışmışlardır. Aynı temel kaynağa başvurmak, kullanılan yöntemin ve varılan bütün ikincil hükümlerin aynı olmasını zorunlu kılmaz.",
          "Bir ekolün akıl yürütmeden yararlanması kaynakları bütünüyle reddettiğini göstermez. Tersine bir ekolün hadise önem vermesi de bütün akli değerlendirmeyi hiç kullanmadığı anlamına gelmez. Soruda aşırılık bildiren “yalnız”, “hiç”, “bütün” ifadelerini verilen yöntemle ayrı ayrı karşılaştır.",
        ],
      },
      {
        title: "Yorum nedenleri birlikte çalışabilir",
        paragraphs: [
          "MEBİ altı ana neden sayar: insanın yapısı, sosyal şartlar, kültür, coğrafya, siyaset ve dinî metinlerin yoruma elverişli yönleri. Bunlar birbirini dışlayan kapalı kutular değildir. Aynı tarihî olayda kültür, siyaset ve toplumsal ihtiyaçlar birlikte etkili olabilir; soru en baskın kanıtı ayrıca sorabilir.",
          "Bir senaryoda şehir adı geçmesi tek başına coğrafi neden seçtirmez. Şehrin iklimi belirleyiciyse coğrafya; örfü vurgulanıyorsa kültür; liderlik tartışılıyorsa siyaset öne çıkar. Gerekçeyi yalnız adı geçen nesneye değil, görüş ayrılığına nasıl yol açtığını belirten mekanizmaya bağla.",
        ],
      },
      {
        title: "İnsanın yapısından gelen neden",
        paragraphs: [
          "Kabiliyet, ilgi, ihtiyaç, algı ve düşünme biçimlerinin farklılığı, aynı metnin farklı yönlerine dikkat edilmesine yol açabilir. Kaynak bunu insanın yapısından kaynaklanan neden olarak ele alır. Bir kişi lafzın ayrıntısını, diğeri genel anlamı öne çıkarabilir; verilen kanıt bireysel anlama biçimidir.",
          "Bu kategori bütün farklı görüşleri karakter kusuru diye etiketlemek değildir. Bir kişinin farklı düşünmesi kötü niyetli olduğunu kanıtlamaz. Soru özellikle düşünme veya algılama farkını veriyorsa onun yerine iklim, savaş veya siyasi liderlik nedeni koyma; bunlar ayrıca açıkça belirtilmelidir.",
        ],
      },
      {
        title: "Sosyal ve kültürel nedenler",
        paragraphs: [
          "Sosyal nedenler toplumsal hayatın değişimi, savaş, afet, ekonomik kriz ve yeni ihtiyaçlarla ilgilidir. Kültürel nedenler örf, gelenek, dil ve farklı toplulukların bilgi birikiminin karşılaşmasını öne çıkarır. Yeni bir toplumsal problem uygulama sorusu doğurabilir; yerel gelenek de çözümün yorumlanışını etkileyebilir.",
          "İki alan bazen iç içedir. Soruda baskın neden isteniyorsa hangi unsurun gerekçe olarak gösterildiğine bak. “Göç oldu” yalnız hareketi bildirir; göçün farklı gelenekleri karşılaştırması vurgulanırsa kültürel ilişki açıklaşır. Adı geçen olaydan olmayan neden zinciri kurma.",
        ],
      },
      {
        title: "Coğrafi ve siyasi nedenler",
        paragraphs: [
          "Coğrafi neden iklim, yer şekli ve çevrenin yaşam koşullarına etkisini anlatır. Siyasi neden liderlik, yönetim ve otorite tartışmalarıyla ilgilidir. Hz. Peygamber’in vefatı sonrasındaki yönetim ihtilafları, kaynakta siyasi ve zamanla itikadi ayrışmaların bir bağlamı olarak ele alınır.",
          "Bütün mezheplerin tek bir siyasi olaydan doğduğu sonucuna varılmaz; kaynak bazı ayrışmaların doğrudan inanç tartışmalarından geliştiğini de belirtir. Bir sebebin varlığı diğerlerinin yokluğu değildir. Tarihî bir siyasi tartışmayı bugünkü bütün kişilerin görüşünü belirleyen tek değişken gibi kullanma.",
        ],
      },
      {
        title: "Muhkem, müteşabih ve tevil",
        paragraphs: [
          "Kaynak muhkem ayeti anlamı açık, müteşabih ayeti farklı yorumlara elverişli ifadeler taşıyan ayet olarak tanıtır. Tevil, böyle bir ifadeyi mümkün anlamlarından biriyle açıklama yönünü öne çıkarır. Metnin dilindeki çok anlamlılık, yorum farklılığının dinî metinlerden kaynaklanan yönüdür.",
          "Müteşabih demek anlamsız veya keyfî demek değildir; yorum yine bağlam ve yöntemle gerekçelendirilir. Her farklı açıklamayı sırf bir toplumda görülüyor diye kültürel sebep sayma. Sorunun merkezinde kelimenin anlam imkânları varsa önce metin boyutunu değerlendir.",
        ],
      },
      {
        title: "İtikat, kelam, fıkıh ve ahlak",
        paragraphs: [
          "İtikat veya akaid inanç esaslarıyla; kelam bu esasların açıklanması ve gerekçelendirilmesiyle; fıkıh ibadet ve günlük hukuk gibi amelî hükümlerle ilgilidir. Ahlak iyi ve erdemli davranışın değer boyutunu ele alır. Bir sorunun konusu, ilgili ilmî alanı seçmede kişi adından önce gelir.",
          "Allah’ın sıfatlarını tartışmak itikadi; satış sözleşmesinin hükmünü incelemek fıkhi bağlamdır. Aynı âlim birden çok alanda eser verebilir. Bu yüzden “bu kişinin adı fıkıhta geçti, onun bütün cümleleri fıkıhtır” çıkarımı doğru değildir. Verilen cümlenin neyi tartıştığını yeniden sor.",
        ],
      },
      {
        title: "Mezhep ve fırka",
        paragraphs: [
          "Mezhep kendine özgü anlama ve yorumlama yöntemi etrafında oluşan ilmî-fikrî birikimdir. Fırka daha çok itikadi-siyasi oluşumlar için kullanılan terimdir. Kaynak, bu iki kullanımın tarih boyunca her zaman kesin ve tek biçimli sınırlarla ayrılmadığını da belirtir.",
          "Mezhep yeni bir peygamber veya ayrı bir kutsal kitap demek değildir. Aynı dinin içindeki yorum farklılığıyla başka din olmayı ayır. Bir ekolü öğrenirken alanını, öncü kişisini ve yöntemini birlikte düşün; yalnız adın sonundaki ekten veya kulağa benzemesinden sınıflama yapma.",
        ],
      },
      {
        title: "Ehlisünnet çerçevesi",
        paragraphs: [
          "Ehlisünnet, Hz. Peygamber’in sünneti ve sahabenin yolunu esas alan geniş yorum geleneği olarak tanıtılır. Hasan Basri ve Ebû Hanife’nin katkıları tarihî şekillenme bağlamında anılır. Kaynak, temel inançları paylaşan bu çerçevede de açıklama ve yöntem farklılıklarının bulunduğunu gösterir.",
          "Matüridilik ve Eşarilik burada iki ana itikadi ekol olarak yer alır. Hanefilik ve Şafiilik ise fıkhi alanda sınıflanır. Aynı geniş çatı altında yer almaları alan farkını silmez; iki düzlem bir kişinin inanç ve ibadet anlayışında birlikte bulunabilir.",
        ],
      },
      {
        title: "Matüridilik",
        paragraphs: [
          "Matüridilik, Ebû Mansur Matüridi’nin görüşleri etrafında oluşan itikadi ekoldür. Ebû Hanife’nin inanç alanındaki birikiminden yararlanır; akli ve naklî delilleri birlikte kullanır. MEBİ Allah’ın varlığı ve bazı iyi-kötü ayrımlarının akılla kavranabilmesi vurgusunu bu çerçevede ele alır.",
          "Bu tanımı “vahye hiç ihtiyaç duymaz” biçimine dönüştürme. Akla yer vermek nakli yok saymak değildir. Kaynak büyük günah işleyen kişinin otomatik dinden çıkmış sayılmamasını da bu ekolde anlatır; bu bilgi uygulamanın gerçek kişilere dinî hüküm vermesi için kullanılmaz.",
        ],
      },
      {
        title: "Eşarilik",
        paragraphs: [
          "Eşarilik, Ebülhasan Eşari’nin görüşleriyle şekillenen itikadi ekoldür. Kaynak hadis ve sünneti merkeze almasını ve inanç alanında akıl yürütmeyi de kullanmasını birlikte belirtir. İyi-kötü hakkındaki dinî yükümlülük bilgisinde vahyin belirleyiciliği, ders karşılaştırmasında öne çıkarılır.",
          "Matüridilikle karşılaştırma ortak inanç çerçevesi içindeki yöntem farklarını göstermeyi amaçlar. “Biri bütünüyle akılsız, diğeri bütünüyle metinsiz” gibi karşıtlık kaynakta öğretilen ayrımı bozacaktır. Büyük günah konusunda Ehlisünnet içindeki ortak çerçeveyi de koru; farklı isimler her konuda zıtlık demek değildir.",
        ],
      },
      {
        title: "Şia: ortak başlık ve iç çeşitlilik",
        paragraphs: [
          "Şia veya Şiilik, Hz. Peygamber sonrasında imamet konusunda Hz. Ali ve Ehlibeytini esas alan geleneklerin ortak adıdır. İmamet liderlik ve dinî otorite tartışmasıyla ilişkilidir. Kaynak bu çatı altında farklı alt ekoller bulunduğunu gösterir; ortak ad bütün ayrıntıların aynı olduğu anlamına gelmez.",
          "İmamiye ve Zeydiye’yi ayrı incelemek gerekir. On iki imamın sayısı ve masumiyetiyle ilgili görüşü her Şii alt ekole değişmeden yüklemek, Zeydiye farkını ortadan kaldırır. Bir soruda alt ekol adı verildiyse o düzeydeki bilgiyi kullan; geniş başlıktan otomatik bütün ayrıntıları üretme.",
        ],
      },
      {
        title: "İmamiye ve Zeydiye",
        paragraphs: [
          "İmamiye veya İsnaaşeriye, on iki imam anlayışıyla tanıtılır; kaynakta imamların dinî otoritesi ve masumiyeti bu bağlamda ele alınır. Zeydiye ise imam sayısını on ikiyle sınırlandırmaz ve imamların hatasız-günahsız olduğunu kabul etmez. Bunlar iki alt ekolü ayıran önemli ders bilgileridir.",
          "Zeydiye’nin imamet görüşündeki farkını, Şia başlığı dışında ayrı bir din olduğu biçiminde yorumlama. Aynı üst başlık içinde ayrıntı farkı mümkündür. Bir tablo çizdiğinde üst düğümü ortaklık, alt düğümleri ayrım için kullan; çizginin her iki alt kola bütün üst-alt özellikleri aynı biçimde yüklemediğini açık tut.",
        ],
      },
      {
        title: "Fıkhi yorumların çalışma alanı",
        paragraphs: [
          "Fıkhi veya amelî yorumlar ibadet, aile, miras, alışveriş ve toplumsal işlemler gibi fiillerin hükümleriyle ilgilenir. Zamanla yeni problemler ortaya çıktıkça Kur’an ve sünnete dayalı çözüm yöntemleri sistemleşmiştir. Kaynak yorum çeşitliliğini uygulamada kolaylık ve düşünce zenginliğiyle ilişkilendirir.",
          "Bir uygulama farkı görmek, namaz veya oruç gibi temel ibadetin varlığının tümden reddedildiğini göstermez. Hükmün ilkesiyle uygulama ayrıntısını ayır. Birinin fıkhi ekolü ile itikadi ekolü aynı kategori olmadığından “Matüridi ve Hanefi” ifadesi zorunlu çelişki taşımaz.",
        ],
      },
      {
        title: "Hanefilik ve Ebû Hanife",
        paragraphs: [
          "Hanefilik, Ebû Hanife’nin görüşlerine dayanan fıkhi ekoldür. Kaynak nakil ile akıl, hadis ile rey arasında denge kurulmasını; genel ilkeler, toplumun şartları ve yararın dikkate alınmasını anlatır. Rey burada gelişi güzel beğeni değil, ilmî değerlendirme ve akıl yürütme bağlamındadır.",
          "Hanefilik adıyla Hanbelilik sesçe benzer olsa da öncüleri farklıdır. Ebû Hanife→Hanefilik; Ahmed bin Hanbel→Hanbelilik çiftlerini tam isimle kur. Ebû Hanife’nin Fıkhu’l-Ekber adlı eserinin inanç alanıyla ilişkili oluşu, onun etrafında gelişen fıkhi ekolün alanını değiştirmez.",
        ],
      },
      {
        title: "Malikilik ve Medine uygulaması",
        paragraphs: [
          "Malikilik, Malik bin Enes’in görüşlerine dayanır. MEBİ ve OGM, Medine halkının Hz. Peygamber geleneğiyle ilişkili uygulamalarına verdiği önemi özellikle belirtir. Muvatta, kaynakta İmam Malik’le eşleştirilen eserdir. Yöntem ipucunu kişi ve eser adıyla birlikte öğrenmek ezberi anlamlandırır.",
          "Medine’nin geçmesi tek başına her metni Malikilik yapmaz; şehir bütün İslam tarihinin birçok olayıyla ilişkilidir. Belirleyici kanıt, Medine uygulamasının hüküm çıkarma yönteminde öne alınmasıdır. Coğrafi yaygınlık da kişilerin hangi ekolü benimsediğini tek başına kesin olarak göstermez.",
        ],
      },
      {
        title: "Şafiilik ve usul",
        paragraphs: [
          "Şafiilik, Muhammed bin İdris Şafii’nin görüşlerine dayanır. Ders kaynağı meselelerde Kur’an ve sünnete, ardından uygun bağlamda icma ve kıyasa başvurulmasını anlatır. İcma âlimlerin görüş birliği; kıyas benzer gerekçeye dayalı hüküm ilişkilendirmesidir. er-Risale, kaynakta onunla anılan usul eseridir.",
          "Kur’an ve sünnetin önce gelmesi yalnız Şafiiliğe özgü tek işaret değildir; diğer ekoller de bu temel kaynakları benimser. Soru özel ekol adı istiyorsa kişi veya yöntem ayrıntısını birlikte değerlendir. Bir yöntemin başka okulda da kullanılmasıyla aynı ağırlık ve sırada kullanılmasını birbirine karıştırma.",
        ],
      },
      {
        title: "Hanbelilik ve hadis vurgusu",
        paragraphs: [
          "Hanbelilik, Ahmed bin Hanbel’in görüşlerine dayanır. Kaynak Kur’an ve sünneti esas alan, zorunlu olmadıkça reyle hüküm vermeyi tercih etmeyen hadis ağırlıklı yaklaşımı öne çıkarır. el-Müsned, Ahmed bin Hanbel’le ilişkilendirilen eserdir. Bunları kişi–alan–yöntem üçlüsü olarak düşün.",
          "“Hakkında kesin haramlık hükmü bulunmayan şey” ilkesi ders bağlamında açıklanır; buradan her olay için kendiliğinden kişisel fetva üretme. Metinde bir ekolün yöntemini tanımakla gerçek bir hukuki-dinî duruma hüküm vermek farklı işlerdir. Uygulamanın amacı kavramsal okuryazarlıktır.",
        ],
      },
      {
        title: "Caferilik ve iki farklı eksen",
        paragraphs: [
          "Caferilik, Cafer Sadık’ın görüşleri etrafında oluşan fıkhi yorumdur. Kaynak onu İmamiye çerçevesiyle ilişkilendirir; Kur’an ve sünnet yanında on iki imamdan aktarılan rivayetlerin önemini anlatır. Caferilik fıkhi, İmamiye itikadi-siyasi sınıflamada yer alır; birbiriyle ilişkili ama aynı eksen değildir.",
          "Bir soruda “on iki imam” geçtiği için alanı otomatik fıkıh veya itikat diye seçme; sorunun tam olarak hangi ilişkisini anlattığını incele. İmamet inancı mı, rivayetlerden uygulama hükmü çıkarma yöntemi mi? Ana kavram aynı görünse de verilen mesele farklı düzlemlerde sorulabilir.",
        ],
      },
      {
        title: "Nisâ 59: itaat ve sınır",
        paragraphs: [
          "Nisâ 59 Allah’a, peygambere ve ülülemre itaati; anlaşmazlıkta Allah’a ve peygambere başvurmayı anlatır. Kaynak burada Allah’a götürmeyi Kur’an’a, peygambere götürmeyi sünnete yönelme olarak açıklar. Ülülemr yönetim ve yetki sahipleri anlam alanıyla ele alınır.",
          "Aynı kaynak, itaatin meşru olma sınırını açıkça belirtir: yanlış ve zarar verici bir emir sırf yetkili söyledi diye zorunlu hâle gelmez. Bu sınırı ayetten kopuk sınırsız teslimiyet biçiminde tersine çevirmemek gerekir. Anlaşmazlığı temel ilkelere götürmek, her yeni durumun bütün ayrıntısının metinde aynen yazılı olması demek değildir.",
        ],
      },
      {
        title: "Birden çok etiket çelişki olmak zorunda değil",
        paragraphs: [
          "Bir kişi itikadi konuda Matüridi, fıkhi uygulamada Hanefi gelenekten etkilenebilir. İki etiketin konusu farklıdır. Aynı şekilde bir tarihî olayın siyasi nedeni ve kültürel etkisi birlikte bulunabilir. Çelişki demek için aynı düzlemde birbirini dışlayan iki hükmün gerçekten ileri sürüldüğünü göstermelisin.",
          "Etkileşimli haritada alan filtresini değiştirince yalnız ilgili dal ve kanıtlar öne çıkar. Bir ekol seçtiğinde onun üst çerçevesini, öncüsünü ve yöntemini ayrı görürsün. Çizgi kalınlığı doğruluk veya üstünlük sırası değildir; bir geleneğin diğerinden daha değerli olduğunu puanlayan model kurulmaz.",
        ],
      },
      {
        title: "Nedeni mekanizmayla açıkla",
        paragraphs: [
          "Bir mezhebin ortaya çıkışını açıklamak için yalnız bir yıl, bölge veya kitap sayısı vermek yeterli olmayabilir. Bu olgunun farklı yoruma nasıl yol açtığını da göstermek gerekir. Örneğin yeni ticari ilişkiler hangi uygulama sorusunu doğurdu; farklı dil hangi ifadenin yorumunu etkiledi?",
          "Olumsuz soruda etkili olmayan gerekçeyi ararken bütün seçenekleri bu bağlantıyla sına. Bir unsurun bu kısa senaryoda açıklayıcı olmaması, tarihin hiçbir yerinde etkisiz olduğu anlamına gelmez. Kapsamı koruyan çözüm, somut mekanizmaya dayanır ve geniş tarihî iddiaları tek sorudan üretmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Nedenin gerçek mekanizması",
        prompt:
          "İki bilgin aynı metni yorumlarken biri kelimenin dildeki ilk anlamını, öteki bağlamdaki mecazı öne çıkarıyor. Yaşadıkları şehirler de farklıdır.\nBaskın yorum farkı için hangi veri daha doğrudandır?\nA) Şehir adlarının farklılığı tek başına. B) İkisinin de kişi olması. C) Metindeki anlam tercihi. D) Kitap kapağının rengi. E) Her siyasi olayın varlığı.",
        strategy: "Arka plan ayrıntısıyla doğrudan etki eden nedeni ayır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "Görüş farkını oluşturan seçim kelimenin anlamıdır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Şehir farkı verilse de iklim veya çevre etkisi açıklanmamıştır.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "C doğrudan mekanizmayı karşılar; yalnız şehir adı coğrafi neden kurmaz.",
          },
        ],
        answer: "C: Dinî metnin anlam yapısı.",
        check: "Şehir verisiyle yorum arasında somut neden oku var mı?",
        pitfall: "Yer adı görür görmez coğrafi sebebi seçmek.",
      },
      {
        title: "Aynı âlim, farklı konu",
        prompt:
          "Bir âlim sabah peygamberlik inancının gerekçesini, öğleden sonra bir alışverişin geçerli şartlarını inceliyor.\nKonular sırasıyla hangi alanlardadır?\nA) Fıkıh–yalnız astronomi. B) İkisi de aynı tek hukuk konusu. C) Coğrafya–itikad. D) İtikad–fıkıh. E) Yalnız biyografi.",
        strategy: "Kişiyi sabit tutup konu değişimini fark et.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "Peygamberlik inancı inanç esaslarıyla ilgilidir.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Alışverişin geçerlik şartı amelî-hukuki meseledir.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "D alan farkını korur; aynı kişi olması konu sınıflarını birleştirmez.",
          },
        ],
        answer: "D: İtikadi ve fıkhi.",
        check: "Kişi değişmese de araştırılan nesne değişti mi?",
        pitfall: "Aynı kişinin bütün çalışmalarını tek alana kilitlemek.",
      },
      {
        title: "Üst kategori alt ayrımı silmez",
        prompt:
          "Bir kavram ağacı aynı çatı altında iki ekol gösteriyor; bir alt ekol belirli imam sayısını kabul ederken diğeri bu sınırı benimsemiyor.\nAğacın doğru yorumu hangisidir?\nA) Üst kategori bütün ayrıntıları aynı yapar. B) Alt ekoller arasında fark olamaz. C) İki alt ekol mutlaka aynı kişidir. D) Ağaç sayısal deney verisidir. E) Ortak çatı ve alt görüş farkı birlikte korunabilir.",
        strategy: "Üst ve alt düğüm bilgisini farklı düzeylerde oku.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "Ortak çatı bir ilişki gösterir.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Alt düğümlerin imam sayısı bilgileri farklıdır.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "E iki düzeyi bir arada korur; ortak çatı farkı iptal etmez.",
          },
        ],
        answer: "E: Ortaklık içinde alt ayrım.",
        check:
          "Üst başlığın hangi bilgisini, alt dalın hangi bilgisini kullandığını söyle.",
        pitfall: "Bir alt kola ait ayrıntıyı bütün çatıya genellemek.",
      },
      {
        title: "Kurucu ve eser bağı",
        prompt:
          "Bir öğrenci kartlara “Malik bin Enes–Muvatta” ve “Muhammed bin İdris Şafii–er-Risale” yazar.\nFıkhi ekol adları sırasıyla hangileridir?\nA) Malikilik–Şafiilik. B) Hanefilik–Hanbelilik. C) Eşarilik–Matüridilik. D) İmamiye–Zeydiye. E) Caferilik–Malikilik.",
        strategy: "İki bağı aynı sırada doğrula.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "İlk tam ad Malikilikle ilişkilidir.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "İkinci tam ad Şafiilikle ilişkilidir.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "A iki ilişkiyi doğru sırada tutar; diğer çiftler farklı öncü veya alan getirir.",
          },
        ],
        answer: "A: Malikilik, Şafiilik.",
        check: "Yalnız ilk eşlemeyi doğru görüp ikinciyi atlamadın mı?",
        pitfall: "Eser adlarını rastgele tanıdık ekole bağlamak.",
      },
      {
        title: "Meşru emrin sınırı",
        prompt:
          "Bir okul sorumlusu grup liderinin her istediğini koşulsuz yapmanın görev olduğunu iddia eder. Arkadaşı, Nisâ 59 öğretiminde meşru sınır ve temel kaynaklara başvuru bulunduğunu hatırlatır.\nHangi düzeltme uygundur?\nA) Yetki hiç sorumluluk içermez. B) Yetki sahibi olmak her emri otomatik meşru yapmaz. C) Yanlış emirler mutlaka uygulanmalıdır. D) Anlaşmazlıkta hiçbir ölçüt kullanılmaz. E) Her yeni ayrıntı harfiyen tek cümlede yazılıdır.",
        strategy: "Yetki varlığıyla emrin meşruluğunu aynı şey sayma.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "İlk iddia koşulsuz itaat ister.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Hatırlatılan öğretim meşru sınır getirir.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "B sınırı korur; C onu tersine çevirir, A ve D bütün sorumluluğu siler.",
          },
        ],
        answer: "B: Yetki sınırsız meşruluk değildir.",
        check: "Sınır kaydı yorumunda gerçekten işliyor mu?",
        pitfall: "Meşruiyet incelemesini yalnız yetki unvanıyla bitirmek.",
      },
      {
        title: "Sayı açıklama değildir",
        prompt:
          "Bir araştırma döneminde on okulun varlığını listeler; okulların neden farklı düşünceler ürettiği sorulduğunda yalnız “on okul vardı” denir.\nEksik olan nedir?\nA) Sayının mutlaka sıfır olması. B) Bütün kurumların yok sayılması. C) Okul sayısından görüş ayrılığına giden mekanizma. D) Bütün yılların aynı kabul edilmesi. E) Her öğrencinin inancının ölçülmesi.",
        strategy: "Olgu sayımıyla neden açıklamasını ayır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "On okul bilgisi bir nicel envanterdir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Farklı düşüncenin nasıl oluştuğu henüz anlatılmamıştır.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "C sayı ile sonuç arasındaki eksik bağı gösterir; diğerleri konuyu değiştirir.",
          },
        ],
        answer: "C: Nedensel mekanizma eksik.",
        check: "Açıklama gerçekten “nasıl ayrıştı?” sorusunu cevaplıyor mu?",
        pitfall:
          "Doğru bir sayı verince bütün neden sorusunun bittiğini sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Din ile din anlayışı nasıl ayrılır?",
        answer:
          "Kaynağa dayalı esaslarla insanların o esasları yorumlama biçimi ayrı tutulur.",
      },
      {
        prompt: "Altı yorum nedeni nedir?",
        answer:
          "İnsan yapısı, sosyal, kültürel, coğrafi, siyasi ve dinî metin kaynaklı nedenler.",
      },
      {
        prompt: "İtikadi ve fıkhi alanı birer örnekle ayır.",
        answer: "Allah’ın sıfatları inanç; alışverişin hükmü fıkhi alandır.",
      },
      {
        prompt:
          "Matüridi ve Hanefi birlikte olunca neden zorunlu çelişki yoktur?",
        answer: "Biri inanç, diğeri amel-hukuk düzleminde ekoldür.",
      },
      {
        prompt:
          "İmamiye’nin on iki imam anlayışı bütün Şia altkollarına genellenebilir mi?",
        answer: "Hayır; Zeydiye sayı ve masumiyet konusunda farklıdır.",
      },
      {
        prompt: "Nisâ 59 açıklamasında yetki sınırı nedir?",
        answer:
          "İtaat meşru sınırdadır; yetki her zararlı emri otomatik meşru yapmaz.",
      },
    ],
  },
  {
    id: "kur-ana-gore-hz-muhammed",
    title: "Kur’an’a göre Hz. Muhammed: şahsiyet, görev ve örneklik",
    minutes: 110,
    objectives: [
      "İnsani özelliklerle peygamberlik yönünü birlikte açıkla.",
      "Tebliğ, tebyin, teşri ve temsili fiil ve bağlamla ayır.",
      "Söz, fiil ve onayı; sünnet türüyle hüküm derecesini karıştırmadan tanı.",
      "Ahzâb 45–46 mesajlarını ve bilinçli örnek alma ilkesini yeni bağlama aktar.",
    ],
    source:
      "OGM Kur’an’a Göre Hz. Muhammed Video Ders Notu 38 sayfa; Aurelia ilgili kağıt 6 sayfa. Anlatım ve alıştırmalar özgündür; farklı görevlerin birlikte bulunması korunur.",
    sections: [
      {
        title: "İnsan ve peygamber: iki yön",
        paragraphs: [
          "Kaynak Hz. Muhammed’i insan oluşuyla ve vahiy alan peygamber oluşuyla birlikte tanıtır. Yemek, çalışmak, dinlenmek, hastalanmak ve ölümlü olmak insani yönüne örnektir. Vahiy alarak ilahî mesajı bildirme görevi ise peygamberlik yönüdür. Bu iki özellik aynı kişide bulunabilir; biri ötekini silmez.",
          "Bir soruda insan oluşuna ait veri bulunduğunda elçilik görevinin olmadığı sonucuna varma. Tam tersine peygamberlikten de yorulmaz veya ölümsüz olduğu çıkarılamaz. Önce her fiilin hangi yönü anlattığını yaz; sonra sorunun çelişki mi, ortak özellik mi, ayırt edici görev mi sorduğunu belirle.",
        ],
      },
      {
        title: "İnsandan örnek olmanın anlamı",
        paragraphs: [
          "OGM, peygamberlerin insanlardan seçilmesini toplumla iletişim ve uygulanabilir örneklik çerçevesinde açıklar. İnsanların yaşadığı ihtiyaç ve ilişkiler içinde davranış göstermek, ilkenin hayatta nasıl karşılık bulduğunu görünür kılar. Burada anlatılan gerekçe, örneğin yalnız soyut söz olarak kalmamasıdır.",
          "İnsan oluşu bütün tarihî davranışların bağlamdan bağımsız aynen kopyalanması gerektiği anlamına gelmez. Örnek alırken davranışın amacı, koşulu ve ilkeyle ilişkisi incelenir. Dinî metni anlamak ile gerçek kişinin inancına uygulama tarafından not vermek farklıdır; sorular yalnız verilen içeriği yorumlatır.",
        ],
      },
      {
        title: "Sıdk, emanet ve güven",
        paragraphs: [
          "Doğruluk ve güvenilirlik, kaynakta Hz. Muhammed’in şahsiyet özellikleri arasında yer alır. Sözünü tutmak, doğruyu söylemek ve emaneti korumak bunun somut karşılıklarıdır. El-emîn güvenilir kimse anlamıyla bu bağlamda kullanılır. Güven, yalnız bir sıfat söylenerek değil, anlatılan davranışla ilişkilendirilir.",
          "Bir metin emaneti geri vermeyi öne çıkarıyorsa adalet ve güven bağını kurabilirsin. Ancak tek olaydan her teknik konuda uzmanlık veya geleceğe ait kesin bilgi çıkarılmaz. Soru hangi yönü istiyorsa açık fiile dön; kelimelerin başka güzel değerlerle ilişkili olması, her seçeneği aynı ölçüde kanıtlamaz.",
        ],
      },
      {
        title: "Merhamet, af ve hilm",
        paragraphs: [
          "Merhamet başkasının durumunu gözeten şefkat; af bağışlama; hilm ise ilişkilerde yumuşak, ölçülü ve kendine hâkim davranış çerçevesinde öğretilir. Kaynak Hz. Muhammed’in kaba davranmaması, güler yüzlü olması ve insanları incitmeden yönlendirmesini bu özelliklerle anlatır.",
          "Hilm hiçbir yanlışın düzeltilmemesi demek değildir. Bir hataya sakin biçimde müdahale etmek ile hatayı onaylamak farklı davranışlardır. Metinde onay açıkça yoksa yalnız suskunluk veya sakinlikten “yanlış davranışı benimsedi” sonucu çıkarma. İlişki tarzı ve verilen hüküm ayrı eksenlerdir.",
        ],
      },
      {
        title: "Tevazu ve sabır",
        paragraphs: [
          "Tevazu alçak gönüllülük; sabır güçlük karşısında doğru tutumu sürdürme olarak açıklanır. Kaynak ırk, dil veya toplumsal konumla insanları küçümsememeyi tevazu ve insan onuruyla ilişkilendirir. Sabır ise çalışmayı bırakıp bütün sorunları kendiliğinden geçecek sanmak anlamına gelmez.",
          "Bir soruda imkânı olmasına rağmen başkasını aşağılamama verilmişse tevazu öne çıkar. Uzun süreli güçlüklere rağmen görevini sürdürme sabırla ilişkilidir. İki değer bir arada bulunabilir; “en doğrudan” kökünde belirleyici davranışın hangisi olduğuna bakılır, değerler keyfî biçimde dışlanmaz.",
        ],
      },
      {
        title: "Adalet ve hakkı gözetme",
        paragraphs: [
          "Kaynak adaletin akrabalık, servet veya grupla sınırlanmamasını vurgular. Hakkı olana hakkını vermek, haksızlığa uğrayana destek olmak ve kişisel yakınlığı hükmün yerine koymamak bu çerçevededir. Hilfülfudûl örneği peygamberlik öncesi hak koruma tutumuyla ilişkilendirilir.",
          "Bir soruda yakınına ayrıcalık tanımama anlatılıyorsa eşit hak gözetme kanıtı vardır. Buradan bütün kişilere her durumda aynı miktarı verme kuralı çıkarılmaz; adalet hak ve koşulu dikkate alır. Eşit işlem, hakka uygun işlem ve aynı sonuç terimlerinin her bağlamda eş anlamlı olmadığını koru.",
        ],
      },
      {
        title: "Cömertlik ve yardım",
        paragraphs: [
          "Cömertlik imkânını paylaşmaya açık olma; yardımseverlik ihtiyaç durumunu gözeterek destek sunma yönüyle anlatılır. Kaynak maddi yardımın yanında güler yüzün de sosyal ilişkide değer taşıdığını belirtir. Her yardım yalnız para aktarımı değildir; bilgi, zaman ve emek de destek olabilir.",
          "Bir iyilik görünür yapıldığı için otomatik gösteriş sayılmaz; niyet ayrıca verilmelidir. Aynı biçimde yüksek miktarlı yardım, yapan kişinin her davranışının kusursuz olduğunu kanıtlamaz. Soru eylemi mi niyeti mi soruyor, önce bunu ayır; bilinmeyen iç amaçları metne kendin ekleme.",
        ],
      },
      {
        title: "Hâtemü’n-nebiyyîn",
        paragraphs: [
          "Hâtemü’n-nebiyyîn, İslam öğretisinde Hz. Muhammed’in son peygamber oluşunu ifade eden terimdir. Nübüvvet peygamberlik; risalet elçilik anlam alanıyla ilişkilidir. Kaynak bu görevi insanlara dini bildirme, açıklama ve örnek olma sorumluluklarıyla birlikte ele alır.",
          "Son peygamberlik öğretisi bütün kısa pasajlarda açıkça dile getirilmiş olmayabilir. Bir soruda yalnız “vahiy alır” deniliyorsa onun insanlardan ayırt edici yönü çıkarılabilir; son oluşu aynı cümlenin zorunlu içeriği olmayabilir. Bildiğin genel bilgiyle metinden çıkarım sorusunun sınırını ayrı tut.",
        ],
      },
      {
        title: "Tebliğ: mesajı ulaştırma",
        paragraphs: [
          "Tebliğ, peygamberin aldığı ilahî bilgiyi eksiksiz biçimde insanlara duyurmasıdır. Belirleyici fiil ulaştırmak veya bildirmektir. Bir mesajın anlamı uzun uzadıya açıklanmadan da duyurulması mümkündür; bu nedenle tebliğ ile açıklama aynı iş değildir.",
          "“Namazı kılın” buyruğunu topluma bildirme tebliğ yönünü; nasıl kılınacağını öğretme tebyin yönünü öne çıkarır. Aynı olayda ikisi birlikte bulunabilir. Kök yalnız bir aşamayı soruyorsa o aşamanın fiilini seç; bütün görevleri her cümleye otomatik yükleme.",
        ],
      },
      {
        title: "Tebyin: anlamı ve uygulamayı açıklama",
        paragraphs: [
          "Tebyin, ilahî mesajın anlaşılması ve uygulama ayrıntılarının açıklanmasıdır. Kaynak anlaşılması güç ayetlerin veya ibadetlerin uygulanışının öğretilmesini bu görevle ilişkilendirir. Burada soru yalnız mesajın ulaşıp ulaşmadığı değil, ne anlama geldiğinin nasıl açıklandığıdır.",
          "Bir açıklamayı sırf yeni sözcükler içeriyor diye yeni hüküm koyma sayma. Verilen anlamı açmakla normatif bir hüküm bildirmek ayrı vurgulardır. Soru “nasıl uygulanacağı anlatıldı” diyorsa açıklama kanıtı vardır; teşri için hüküm koyma bağlamını ayrıca göstermek gerekir.",
        ],
      },
      {
        title: "Teşri: hüküm koyma bağlamı",
        paragraphs: [
          "Teşri, dinî hüküm koyma veya düzenleme anlamıyla ele alınır. Kaynak bunu Allah’ın izni ve bilgisi çerçevesindeki peygamberlik yetkisiyle ilişkilendirir. Bir davranış hakkında açık helal-haram hükmü bildirilmesi, sıradan öğüt veya açıklamadan farklı normatif bir işlev taşır.",
          "Bir konuşmada “iyi davranın” denilmesi tek başına her ayrıntının yeni dinî hüküm olduğunu kanıtlamaz. Metin hangi yetkiyi ve hangi hükmü vurguluyor, önce buna bak. Bu ders, güncel bir meseleye kullanıcı adına fetva üretmez; verilen öğretim cümlesindeki görevi kavramsal olarak ayırır.",
        ],
      },
      {
        title: "Temsil: ilkeyi yaşayarak gösterme",
        paragraphs: [
          "Temsil Hz. Muhammed’in inanç, ibadet ve ahlak ilkelerini kendi davranışıyla örneklendirmesidir. Yalnız anlatılan değil, uygulamada gösterilen bir yön vardır. Bir ilkeyi duyurma, açıklama ve kendi davranışıyla gösterme aynı olayın üç ayrı aşaması olabilir.",
          "Örneğin adalet hakkında konuşmak sözel bildirim; belirli durumda hakkı gözeterek davranmak temsil yönünü öne çıkarır. Temsil bir resim veya oyunculuk terimi olarak başka alanlarda da kullanılır; burada dersin verdiği bağlam önemlidir. Görev adını gündelik başka anlamından değil, verilen davranıştan kur.",
        ],
      },
      {
        title: "Üsve-i hasene",
        paragraphs: [
          "Üsve-i hasene güzel örneklik anlamıyla Hz. Muhammed için kullanılan ifadedir. Kaynak bu örnekliği inanç, ibadet ve ahlak alanlarını birlikte kapsayacak biçimde açıklar. Bir tutumun değerini anlamak, yalnız olayın hangi nesneyle gerçekleştiğini ezberlemekten daha geniş bir öğrenmedir.",
          "Bir ilkeyi başka zamana aktarırken amaç ve uygun koşul korunur; yüzeydeki bütün araçların aynı olması gerekmez. Örneğin emaneti korumak dijital veride de düşünülür. Bu çağdaş benzetme yeni bir dinî hüküm değil, bir ilkenin anlamını kavratmaya yönelik öğretim örneğidir.",
        ],
      },
      {
        title: "İtaat: bilinç ve sorumluluk",
        paragraphs: [
          "İtaat söz dinleme ve uyma anlamıyla; dinî bağlamda Allah ve peygamberin emir ve yasaklarına isteyerek uyma olarak açıklanır. Sünnete bağlılık bu ilişkinin kaynakta öne çıkarılan yönüdür. Uymanın anlamını bilmek, davranışı yalnız biçim olarak tekrar etmekle aynı değildir.",
          "Nûr 54 bağlamında elçinin tebliğ sorumluluğu ile muhatapların kendi sorumluluğu ayrı anlatılır. Birinin görevini yapması, başkalarının bütün tercihlerinden onun sorumlu olduğu sonucunu doğurmaz. Koşullu cümleyi tersine çevirirken de dikkat et: bir davranışın bir sonuca götürdüğünün söylenmesi, karşıt durumun bütün ihtimallerini tek başına kapatmaz.",
        ],
      },
      {
        title: "Sünnet ve hadis",
        paragraphs: [
          "Sünnet Hz. Peygamber’in söz, fiil ve onaylarını kapsayan örnek davranış geleneğidir. Hadis ise ona nispet edilen söz ve rivayetler için kullanılır. Ders bağlamında bu kavramlar ilişkilidir; “sünnet sadece sözdür” veya “hadis herhangi birinin sözü demektir” tanımları kapsamı bozar.",
          "Bir rivayetin türünü belirlerken ne aktarıldığına bak: doğrudan söz mü, yapılan eylem mi, başka bir davranışa onay mı? Rivayet türü ile o eylemin farz, vacip veya başka hükümde olup olmadığı aynı sınıflama değildir. Aktarma biçiminden tek başına bütün hüküm derecesini çıkarma.",
        ],
      },
      {
        title: "Kavlî, fiilî ve takrirî",
        paragraphs: [
          "Kavlî sünnet söz ve öğüt; fiilî sünnet yapılan uygulama; takrirî sünnet başka bir kişinin söz veya davranışının bağlam içinde onaylanmasıdır. Bu ayrım, aktarımda hangi fiilin merkezde bulunduğunu görünür kılar. Aynı olay birden çok aktarım unsuruna sahip olabilir.",
          "Yalnız sessizlik gördüğünde otomatik onay sonucu çıkarma; metin bunun onay niteliğini veya gerekli bağlamı vermelidir. Benzer biçimde fiilî sünneti yalnız farz dışındaki davranışlarla sınırlamak, aktarım türünü fıkhi hüküm derecesiyle karıştırır. Soruda hangi sınıflamanın istendiğini açık tut.",
        ],
      },
      {
        title: "Bilinçli örneklik ile taklit",
        paragraphs: [
          "Bilinçli örnek alma davranışın amacını ve koşulunu anlayarak uygun ilkeyi uygulamaktır. Biçimsel taklit yalnız dış hareketi kopyalayabilir. Bir öğreticinin belirli ışık koşulunda yaptığı hareketi, o gerekçe yokken aynen tekrarlamak onun yöntemini anlamış olduğunu tek başına göstermez.",
          "Bununla birlikte kişinin gerekçesi metinde bilinmiyorsa gerçek hayatta hiçbir şey anlamadığını kesin söyleyemezsin. Soruda açıkça “gerekçeyi bilmiyor” denildiğinde değerlendirme bu veriye dayanır. Kanıtın yokluğuyla yanlışlığın kanıtını ayırmak, örnek alma konusunu da daha doğru yorumlamanı sağlar.",
        ],
      },
      {
        title: "Ahzâb 45–46: şahit ve müjdeleyici",
        paragraphs: [
          "Ahzâb 45–46’da şahit, müjdeleyici, uyarıcı, Allah’ın izniyle davet eden ve aydınlatıcı kandil ifadeleri bulunur. Şahitlik hakikate tanıklık; müjdeleme iyi sonuca umut verici haber; uyarma yanlışın sonucuna dikkat çekme yönüyle ele alınır. Bu roller aynı kelimenin tekrarları değildir.",
          "Bir pasaj yalnız müjdeyi veriyorsa o bölümün doğrudan mesajı umut ve olumlu bildirimdir. Her rolü bildiğin için metinde verilmeyen tarihî ayrıntıyı veya özel kurum düzenini kesin çıkaramazsın. Her seçeneğin karşısında ayetin hangi ifadesinin kanıt olduğunu ayrı ayrı göster.",
        ],
      },
      {
        title: "Davet ve aydınlatma",
        paragraphs: [
          "Davet doğru yola çağırma, aydınlatıcı kandil ise rehberlik ve yol gösterme anlamıyla açıklanır. Kandil ifadesi burada fiziksel lamba yapımı hakkında bir ders değil, dinî rehberliği anlatan benzetmedir. Sözcüğün gerçek ve bağlamsal anlamını ayırmak mesajı doğru okumayı sağlar.",
          "Bir ayetteki benzetmeden yeni bir fen bilgisi sonucu üretme. “Aydınlatır” sözü yol göstermeyi destekleyebilir; lambanın malzemesi veya ışık gücü gibi ayrıntıları vermez. Metne sadık yorum, benzetmenin neye işaret ettiğini açıklar ve söylenmeyen teknik ayrıntıyı eklemez.",
        ],
      },
      {
        title: "Görev zincirini parçalara ayır",
        paragraphs: [
          "Bir olayda mesaj duyurulur, anlamı açıklanır ve davranışta örneklenirse tebliğ→tebyin→temsil zinciri kurulabilir. Fakat teşriyi eklemek için ayrıca hüküm koyma bağlamı gerekir. Bir görevin varlığını diğer üç görevin mutlaka gerçekleştiği sonucuna çevirmek, kanıtı büyütür.",
          "Etkileşimli görev şemasında olayı ve inceleme aşamasını değiştirince hangi fiillerin hangi göreve bağlandığı görünür. Açıklamayı seçmek duyuruyu silmez; yalnız odağı değiştirir. Sorularda da aynı yöntemi uygula: verilen fiillerin listesini çıkar, kökün istediği aşamayı seç, kullanılmayan bir görevi eklemediğini kontrol et.",
        ],
      },
    ],
    examples: [
      {
        title: "Aktarım dili türü değiştirmez",
        prompt:
          "Bir atölyede aynı rivayet iki kartta sunuluyor: Türkçe kart Hz. Peygamber’in bir davranışını anlatıyor; Arapça kart aynı davranışın karşılık gelen anlatımını içeriyor. Kartların ikisi de bir eylemi aktarıyor; yeni bir söz veya onay eklenmiyor. Öğrenci, dil değişince sünnetin aktarım türünün de zorunlu değişeceğini savunuyor.\nHangi değerlendirme bu savı düzeltir?\nA) Tür yalnız kartın yazı rengine bağlıdır. B) Tür mutlaka Türkçede kavlî, Arapçada takrirîdir. C) Türler arasında hiçbir anlam farkı yoktur. D) Aktarılan unsur aynı kaldığı için çeviri dili tek başına aktarım türünü değiştirmez. E) Yazılı her metin yalnız hüküm derecesini bildirir.",
        strategy:
          "Kartın diliyle rivayetin neyi aktardığını iki farklı özellik olarak tut.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "İki kart aynı davranışın anlatımıdır; birinden diğerine yeni söz veya onay aktarımı eklenmez.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Söz-davranış-onay ayrımında ölçüt aktarılan unsurdur; Türkçe veya Arapça olması bu unsuru kendiliğinden değiştirmez.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "D iki özelliği ayırır; A-B dil veya rengi keyfî ölçüt yapar, C türleri siler, E aktarım türünü hüküm derecesiyle karıştırır.",
          },
        ],
        answer: "D: Çeviri dili tek başına türü değiştirmez.",
        check:
          "Kartın dili değişirken aktarılan olayın söz, davranış veya onay olma niteliği değişmiş mi?",
        pitfall:
          "Metnin hangi dilde yazıldığını, rivayette aktarılan unsurun türüyle eşitlemek.",
      },
      {
        title: "Açıklama mı norm mu?",
        prompt:
          "İki nottan ilki mevcut bir kuraldaki kelimenin anlamını açıklar. İkincisi açıkça dinî hüküm koyma yetkisini ve norm bildirmeyi konu edinir.\nGörev vurguları sırasıyla hangileridir?\nA) Yalnız temsil–temsil. B) Tebliğ–yalnız dinlenme. C) Teşri–tebyin. D) İkisi tam aynıdır. E) Tebyin–teşri.",
        strategy: "Anlam açma ile norm kurmayı ayır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "İlk notun yaptığı açıklamadır.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "İkinci not normatif hüküm vurgusu taşır.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "E iki fiile doğru karşılık verir; C sırayı ters çevirir.",
          },
        ],
        answer: "E: Tebyin, teşri.",
        check: "İlk notta gerçekten yeni hüküm koyma kanıtı var mı?",
        pitfall: "Açıklama sözcüğünden kendiliğinden norm yetkisi üretmek.",
      },
      {
        title: "Aktarım türünün ölçütü",
        prompt:
          "Bir notta Hz. Peygamber’in abdest uygulaması, diğer notta başkasının davranışını onayladığı açıkça aktarılıyor. Soru yalnız aktarım türünü soruyor.\nTürler sırasıyla nedir?\nA) Fiilî–takrirî. B) Kavlî–kavlî. C) Farz–nafile. D) Coğrafi–siyasi. E) İkisi de yalnız hüküm derecesidir.",
        strategy: "Aktarılan fiili hüküm derecesinden ayır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "İlk notta bizzat uygulama vardır.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "İkinci not başkasının eylemine onay verir.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "A türleri karşılar; C ve E farklı sınıflama olan hüküm derecesini soruya taşır.",
          },
        ],
        answer: "A: Fiilî, takrirî.",
        check: "Sorunun hangi ekseni sorduğunu başta belirledin mi?",
        pitfall: "Aktarım türünü farz-vacip derecesine dönüştürmek.",
      },
      {
        title: "İlke ile araç",
        prompt:
          "Bir usta belirli bir malzemeye zarar vermemek için yumuşak bir araç seçer. Öğrencisi yeni malzemede aynı amaca uygun başka aracı seçer, gerekçesini açıklar.\nBu aktarım nasıl yorumlanır?\nA) Her farklı araç başarısızlıktır. B) Amaç anlaşılarak uygun ilke yeni koşula taşınmıştır. C) Öğrenci gerekçeyi bilmiyor. D) İki malzeme zorunlu aynı nesnedir. E) Bütün ustalar aynı hareketi yapmıştır.",
        strategy: "Araç değişimini ilke kaybı sanma.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "İlk seçimde amaç malzemeyi korumaktır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Öğrenci yeni koşula uygun araçla aynı amacı gerekçelendirir.",
          },
          {
            label: "Seçenekleri denetle",
            explanation: "B bilinçli aktarımı anlatır; C açık veriyle çelişir.",
          },
        ],
        answer: "B: Gerekçeye dayalı örnek alma.",
        check:
          "Yeni araç aynı amaca gerçekten hizmet ediyor mu? Metin evet diyor.",
        pitfall: "Örnekliğin ölçütünü yalnız aynı araç yapmak.",
      },
      {
        title: "Benzer söz, farklı işlev",
        prompt:
          "Bir alıştırma şahit, müjdeleyici ve uyarıcı sözcüklerini ayrı renkle gösteriyor.\nİşlevleri hangi seçenek doğru ayırır?\nA) Üçü de yalnız ses yüksekliğidir. B) Üçü tam eş anlamlıdır. C) Tanıklık–olumlu haber–sakındırma. D) Yalnız mal paylaşımıdır. E) Hiçbiri rehberlikle ilişkili değildir.",
        strategy: "Üç sözün anlamını ayrı fiille yaz.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "Şahitlik tanıklık boyutudur.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Müjde iyi haber, uyarı sakındırma içerir.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "C üç anlamı ayrı tutar; ses yüksekliği veya tam eşitlik verilmez.",
          },
        ],
        answer: "C: Farklı roller.",
        check: "Her kelime için farklı bir açıklama yapabildin mi?",
        pitfall: "Rol listesini süs tekrarı sanmak.",
      },
      {
        title: "Eksik gerekçeyi doldurma",
        prompt:
          "Bir not “davranışını görüp aynısını yaptılar” der; gerekçeyi anlayıp anlamadıkları konusunda hiçbir bilgi vermez.\nKesin değerlendirme için hangisi eksiktir?\nA) Aynı davranışın yapılmış olması. B) Notun bulunması. C) İnsanların görülmesi. D) Gerekçenin anlaşılıp anlaşılmadığı bilgisi. E) Hareketin dış benzerliği.",
        strategy: "Görünen benzerliği bilinmeyen anlayıştan ayır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "Not dış hareketin benzerliğini verir.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Neden bilgisi veya kişinin açıklaması yoktur.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "D eksik anlayış verisini belirtir; diğerleri zaten söylenen dış bilgidir.",
          },
        ],
        answer: "D: Gerekçe anlayışına dair veri gerekir.",
        check:
          "Sırf veri yok diye gerçekte anlamadıklarını kesin söyleyebilir misin? Hayır.",
        pitfall: "Kanıt yokluğunu mutlaka anlayış yokluğu saymak.",
      },
    ],
    recall: [
      {
        prompt: "Tebliğ ile tebyini fiille ayır.",
        answer: "Mesajı ulaştırmak ve anlam/uygulamayı açıklamak.",
      },
      {
        prompt: "Teşri için sırf açıklama yeterli mi?",
        answer: "Hayır; açık dinî hüküm koyma bağlamı aranır.",
      },
      {
        prompt: "Temsil ve üsve-i hasene hangi boyutu öne çıkarır?",
        answer: "İlkeyi yaşayışla örnekleme ve güzel model olma.",
      },
      {
        prompt: "Fiilî sünnet ile farz derecesi aynı eksen mi?",
        answer:
          "Hayır; biri aktarım türü, diğeri eylemin fıkhi hüküm derecesidir.",
      },
      {
        prompt: "Takrirî sünnette salt sessizlik neden yeterli olmayabilir?",
        answer:
          "Onay niteliği ve bağlamı verilmezse kabul de ret de kesinleştirilemez.",
      },
      {
        prompt: "Ahzâb 45–46’daki beş rolü say.",
        answer:
          "Şahit, müjdeleyici, uyarıcı, davetçi ve aydınlatıcı kandil; ayrı işlevlerdir.",
      },
    ],
  },
  {
    id: "kur-anda-gecen-bazi-kavramlar",
    title: "Kur’an’da bazı kavramlar: niyet, eylem ve istikamet",
    minutes: 120,
    objectives: [
      "Hidayet, ihsan, ihlas, takva, sırat-ı müstakim, cihat ve salih ameli anlam ve sınırlarıyla açıkla.",
      "Aynı davranışın birden çok kavrama ilişkin olabileceğini koruyarak niyet ve eylemi ayır.",
      "Kehf 107–110 mesajlarını metin kanıtıyla yorumla.",
      "Olumsuz kökte kanıtsız kavramı bulup yeni duruma aktar.",
    ],
    source:
      "OGM Kur’an’da Bazı Kavramlar 44 sayfa; OGM 11. SınıfTelafi ilgili 3, 6, 8, 11, 13.fiziksel sayfalar; Aurelia ilgili kağıt 10 sayfa. Sınav etiketi kullanıcının çalışma dizinidir; 2027 resmî kapsam iddiası değildir.",
    sections: [
      {
        title: "Kavram bir anlam ağıdır",
        paragraphs: [
          "Kavram bir nesne veya düşüncenin zihindeki genel tasarımıdır. Bir terimi öğrenmek yalnız sözcüğü hatırlamak değil, hangi davranışın hangi anlamı desteklediğini ayırabilmektir. Bu ünitede yönelme, niyet, özen, sakınma, istikamet, çaba ve iyi eylem gibi farklı boyutlar birlikte incelenir.",
          "Kavramlar birbirini her zaman dışlamaz. Bir yardım hem salih amel hem infakla ilişkili olabilir; niyet açıkça samimiyetse ihlas boyutu da eklenebilir. Soru “niyet bakımından” veya “eylemin türü” diye sorduğunda hangi boyutun istendiğini belirlemek tek doğruyu gerekçelendirmeyi sağlar.",
        ],
      },
      {
        title: "Hidayet: doğru yola yönelme",
        paragraphs: [
          "Hidayet doğru yolu gösterme, doğru yola ulaşma ve yönelme anlam alanıyla öğretilir. Kaynak Allah açısından rehberlik etme; insan açısından bu rehberliğe yönelme boyutunu ayırır. İhtida İslam’ı benimseme için kullanılan ilgili terimdir. Yönü düzeltme, metinde önce hangi yolun bırakıldığını ve hangisine yönelindiğini sorar.",
          "Rehberliği yalnız duymak onun benimsendiği anlamına gelmez. Bir metinde bilgi verilmesiyle kişinin tercihi ayrı fiiller olabilir. Hidayet yorumunu yaparken hem gösterilen yol hem kişinin yönelişi açık mı kontrol et; gerçek insanın bütün inanç durumunu bir uygulama davranışından çıkarmaya çalışma.",
        ],
      },
      {
        title: "Dalalet ve seçim",
        paragraphs: [
          "Dalalet doğru yoldan sapma anlamıyla hidayetin karşıtı olarak anlatılır. OGM akıl, irade ve vahiy rehberliğini birlikte ele alır. Bu öğretide insanın tercihi ve sorumluluğu öne çıkar; akıl sahibi olma ile her kararının otomatik doğru olması aynı şey değildir.",
          "Soruda bir tercihin kavramsal yönü sorulabilir; uygulama gerçek kişileri sapkınlık etiketiyle sınıflandırmaz. Metni anlamak için “hangi yöne, hangi fiille” sorusunu kullan. Karşıt kavramları bilmek, verilen olayın bütün ayrıntılarını veya kişinin niyetini bildiğin anlamına gelmez.",
        ],
      },
      {
        title: "El-Hâdi ve rehberlik",
        paragraphs: [
          "El-Hâdi doğru yolu gösteren anlamıyla kullanılan ilahî isimdir. Kaynak kitap ve peygamberleri rehberlik vesilesi olarak anlatır; kişinin bu rehberlikle ilişkisinde akıl ve irade de önem taşır. Böylece rehberliğin sunulmasıyla benimsenmesi birbirinden ayrılabilir.",
          "Bir soruda “bilgi sunuldu” denilmesi, bütün muhatapların aynı tercihi yaptığı sonucunu vermez. İsrâ 15 çerçevesindeki sorumluluk da kişinin yönelişini kendisiyle ilişkilendirir. Rehberlik modelini bir mekanik zorunluluk gibi çizmek yerine gösterilen yol ve alınan karar için ayrı düğüm kullan.",
        ],
      },
      {
        title: "İhsan: özenli kulluk",
        paragraphs: [
          "İhsan iyilik, güzel davranış ve işi güzel yapma; dinî kavram olarak Allah’ı görüyormuşçasına bilinçle kulluk etme anlamıyla öğretilir. Muhsin ihsan sahibi kişi için kullanılır. Kaynak ibadetlerin ve sosyal davranışların özenle yürütülmesini bu bilince bağlar.",
          "İşi kimse denetlemese de titizlikle yapmak ihsanla uyumlu bir davranış olabilir. Ancak yalnız gizlilik gerçek niyetin tamamını kanıtlamaz. “Nasıl yaptı?” sorusu özeni; “niçin yaptı?” sorusu niyeti öne çıkarır. İhsan ile ihlas ilişkili olsa da aynı sorunun aynı cevabı olmak zorunda değildir.",
        ],
      },
      {
        title: "İhsanın davranış alanı",
        paragraphs: [
          "OGM sabır, aşırılıktan kaçınma, güzel söz, kararlılık ve iyiliği tercih etmeyi ihsan bağlamında anmaktadır. Bu, ihsanı yalnız para vermek veya yalnız bir ritüelin adı saymaktan daha geniş bir çerçevedir. İşin niteliği ve yapılanın başkasına etkisi de değerlendirilir.",
          "Bir davranış için “özenli” denmesi bütün sonuçlarının mutlaka iyi olduğu garantisi değildir; araç ve amaç da önemlidir. Soruda açık tanım varsa ona dön. Salt yüksek hız, yüksek miktar veya başkasının alkışı, ihsanın içsel bilinç ve özen boyutunun yerine geçmez.",
        ],
      },
      {
        title: "İhlas: niyetin samimiyeti",
        paragraphs: [
          "İhlas, söz ve davranışta Allah’ın rızasını gözetme, gösterişten uzak samimiyet anlamıyla açıklanır. Burada belirleyici soru niçindir. Bir kişinin “beğenilmek için değil, doğru olduğuna inandığım ve Allah’ın rızası için” demesi, verilen kurmaca metinde niyetin açık kanıtı olabilir.",
          "Gerçek bir insanın görünür davranışından iç dünyasını kesin bilemeyiz. Soru bir niyet beyanı veriyorsa o veriyi kullanırsın; vermiyorsa tamamlamazsın. Başkalarının iyiliği görmesi ihlasın zorunlu yokluğu değildir; gösteriş amacıyla yapılması ise niyeti değiştiren ayrı bilgidir.",
        ],
      },
      {
        title: "Riyâ ve görünürlük farkı",
        paragraphs: [
          "Riyâ, dinî veya iyi bir davranışı gösteriş ve beğenilme amacıyla yapma anlamıyla ihlasın karşıtı olarak öğretilir. Bir işin görünür olması ile görünmek amacıyla yapılması farklıdır. Toplum içinde yapılan yardımın riyâ sayılması için niyet boyutunda belirleyici veri gerekir.",
          "Bir soruda kamuya açık rapor verilmesi hesap verebilirlik amacı taşıyabilir; otomatik gösteriş kabul edilmez. Aynı eylem kurmaca pasajda açıkça alkış amacıyla yapılmışsa ihlas yorumu desteklenmez. Niyet değiştiğinde kavram ilişkisi değişebilir; eylemin gerçekleştiği bilgisi ise korunabilir.",
        ],
      },
      {
        title: "Takva: sorumluluk ve sakınma",
        paragraphs: [
          "Takva Allah’a karşı sorumluluk bilinciyle emir ve yasakları gözetme, yanlış olandan sakınma anlamıyla öğretilir. Müttaki takva sahibi kişi için kullanılır. Bu kavram yalnız kaygı duygusuna indirgenmez; bilinç, tercih ve davranışın birlikte ele alındığı bir yöneliştir.",
          "Bir öğrenci haksız kazançtan Allah’a karşı sorumluluk bilinciyle uzak durduğunu söylüyorsa takva için kavramsal kanıt vardır. Yalnız yakalanmaktan korktuğu söylenirse aynı niyeti ekleyemezsin. Her sakınma dinî sorumluluk beyanı değildir; metindeki gerekçe sonucu belirler.",
        ],
      },
      {
        title: "Takva ve üstünlük ölçüsü",
        paragraphs: [
          "Kaynak Hucurât 13 bağlamında insanlar arasındaki diller, renkler veya toplumsal köken yerine takva vurgusunu ele alır. Maide 2’de iyilik ve takvada yardımlaşma, günah ve düşmanlıkta yardımlaşmama anlatılır. Ortak eylemin ahlaki yönü amaç ve araçlarıyla değerlendirilir.",
          "Bu öğretim uygulamanın kullanıcıları dinî üstünlük puanıyla sıralaması anlamına gelmez. Bir metni doğru yorumlamak kişisel takva ölçümü değildir. Bir grubun birlikte çalışması da tek başına doğru amaç taşıdığını göstermez; sorudaki işin ne olduğuna ve hangi ilkeye dayandığına bakılır.",
        ],
      },
      {
        title: "Sırat-ı müstakim: dosdoğru yol",
        paragraphs: [
          "Sırat yol, müstakim doğruluktan ayrılmayan anlam alanıyla dosdoğru istikameti ifade eder. Kaynak bunu Kur’an ve peygamberlerin gösterdiği doğru ilkelere bağlı, aşırılıktan uzak yol olarak açıklar. Hidayet doğru yola yönelmeyi öne çıkarabilirken sırat vurgusu yolun kendisi ve o doğrultuda ilerlemeyle ilişkilidir.",
          "Bu ayrım mutlak bir zaman kuralı değildir: Hidayet yalnız bir saniyelik başlangıç demek değildir; doğru yolda bulunma anlamı da taşıyabilir. Soruda özellikle yön değişimi veya istikamet ayrımı verilmişse baskın fiili kullan. Tek bir “yol” kelimesinden süreklilik ve bütün hayat hakkında kesin hüküm çıkarmamalısın.",
        ],
      },
      {
        title: "Fâtiha ve istikamet talebi",
        paragraphs: [
          "Fâtiha’da yalnız Allah’a kulluk ve yardım dileme ile doğru yola iletilme talebi birlikte yer alır. Kaynak bu talebi sırat-ı müstakimle ilişkilendirir. Burada kulluk yönü, yardım isteme ve doğru istikamet talebi ayrı ama bağlantılı anlam parçalarıdır.",
          "Bir parçayı yorumlarken yalnız verilen bölümü değerlendir. Doğru yol istenmesi, kişinin ömrü boyunca hiçbir hata yapmadığının kanıtı değildir. Dinî talebin anlamı ile talebin bütün sonuçlarının şimdiden gerçekleştiği iddiasını ayrı tut; istek ve gerçekleşmiş olay farklı kiplerdir.",
        ],
      },
      {
        title: "Cihat: geniş çaba anlamı",
        paragraphs: [
          "Cihat, kaynakta Allah’ın rızasını gözeterek iyiliği gerçekleştirmek için bilinçli gayret ve mücadele anlamında ele alınır. Kişinin zararlı alışkanlığıyla mücadelesi, doğru bilgiyi öğrenme-öğretme veya toplumsal yarara çalışma bu geniş çerçevede örneklendirilebilir. Sadece rekabet sözcüğü kavramın bütün koşullarını sağlamaz.",
          "Bir işin hedefi ve aracı önemlidir. Barışçıl öz disiplin örneğinden silahlı çatışma sonucu çıkarılamaz. Ders kavramı açıklanırken öğrenciye zarar verici eylem önerilmez; tarihî ve dinî anlamın öğrenilmesiyle herhangi bir güncel eyleme çağrı yapmak farklıdır.",
        ],
      },
      {
        title: "Cihat ile kıtal aynı genişlikte değildir",
        paragraphs: [
          "Kıtal silahlı savaşma anlam alanıdır; cihat daha geniştir. Kaynak savaşın ayrı ve zorunlulukla sınırlı bağlamını anlatır. Bir metinde genel çaba bulunması silah, askerî harekât veya çatışma gerçekleştiğini kanıtlamaz. Bu ayrımı yapabilmek için eylemin aracını ve doğrudan verisini sormalısın.",
          "Mekke ve Medine dönemlerindeki bağlam farkını okumak, bütün bir dönemin bütün faaliyetlerini tek tür eyleme indirgemeyi gerektirmez. Aynı kavram tarih, hukuk ve yetki koşullarıyla kullanılır. Soru çözümünde verilmeyen çatışma ayrıntısını ekleme; barışçıl öğrenme örneğini askerî talimata dönüştürme.",
        ],
      },
      {
        title: "Davet, irşat ve öz disiplin",
        paragraphs: [
          "Davet çağırma; irşat yol gösterme ve rehberlik anlamıyla çaba alanıyla ilişkilidir. Öz disiplin kişinin kendi davranışını düzeltmek için düzenli gayret göstermesidir. Bunlar aynı amaç çevresinde bulunabilir, fakat bir konuşma yapmakla birini zorlamak aynı şey değildir.",
          "Metindeki araç meşru ve barışçıl mı, amaç açık mı kontrol et. “Mücadele etti” ifadesi tek başına hangi kavramın bütün koşullarını karşıladığını göstermez. Yalnız kelime eşleşmesi yerine hedef, araç ve gerekçe üçlüsüyle anlam kurmak, bu ünitenin başka kavramlarında da aynı biçimde işler.",
        ],
      },
      {
        title: "Mücahit, şehit ve şehadet",
        paragraphs: [
          "Kaynak mücahidi Allah yolunda çaba gösteren, şehadeti ise ilgili dinî-tarihî bağlamda canını verme ile ilişkili kavram olarak tanıtır. Şehadet sözcüğü tanıklık anlamında da kullanılır. Hangi anlamın kastedildiği cümlenin bağlamıyla anlaşılır; benzer köklü terimler her durumda aynı olay değildir.",
          "Bir kişinin çaba göstermesi onun hayatını kaybettiğini veya silahlı çatışmaya katıldığını zorunlu kılmaz. Aynı şekilde tanıklık sözcüğünü görünce ölüm olayı eklenmez. Kurmaca metinde ne verildiyse onu ayır; uygulama gerçek insanların dinî statüsünü tayin etmeyi amaçlamaz.",
        ],
      },
      {
        title: "Salih amel: doğru, yararlı eylem",
        paragraphs: [
          "Salih amel, iman ve doğru niyetle ilişkilendirilen iyi, güzel ve yararlı iş ve davranıştır. Kaynak ibadetlerin yanında yardım, öğrenme, engeli kaldırma ve işi güzel yapmayı da örnekler. Böylece kavram yalnız dar bir tören listesine indirgenmez; eylemin yararı ve amacı önemlidir.",
          "Bir iyiliği düşünmek ile onu gerçekleştirmek aynı olay değildir. Soruda yalnız istek verildiyse tamamlanmış eylemi ekleme. Ayrıca görünür iyi davranıştan kişinin bütün inanç durumunu kesin ölçemezsin. Kavramı dersin koşullarıyla açıklamakla gerçek kişiye tümden hüküm vermek farklıdır.",
        ],
      },
      {
        title: "İnfak ile salih amel ilişkisi",
        paragraphs: [
          "İnfak mal veya somut imkânı iyilik için harcama ve paylaşma anlamıyla ele alınır. Doğru niyet ve yararlı koşullarda bir infak eylemi salih amelle de ilişkili olabilir. Ancak her salih amel yalnız para veya mal bağışıdır denemez; öğrenme ve adil davranış gibi başka örnekler de vardır.",
          "İnfak sorusunda “ne aktarıldı?” diye sor. Metin yalnız dua veya iyi düşünce veriyorsa gerçekleşmiş kaynak aktarımı varsayma. İmkân paylaşımı yalnız nakit para değildir; kitap, yiyecek veya kullanılabilir araç da olabilir. Tutar belirtilmemiş olması, açıkça verilen paylaşımı yok saydırmaz.",
        ],
      },
      {
        title: "Niyet ve eylem ayrı değişebilir",
        paragraphs: [
          "Bir kişi ihtiyaç sahibine araç verirken amaç olarak Allah’ın rızasını belirtebilir; başka bir kurmaca kişi aynı fiili yalnız alkış için yaptığını söyleyebilir. Eylem düzeyinde paylaşım her ikisinde de bulunur, niyet düzeyinde ihlas yorumu aynı değildir. Bir boyutun değişmesi bütün verileri silmez.",
          "Etkileşimde niyet seçimini değiştirdiğinde niyet bağı değişir; yardım fiili korunmuşsa infak kanıtı da korunur. İşin özeni değişirse ihsan ilişkisi ayrıca değerlendirilir. Bu çok boyutlu okuma, gerçek kişilerin iç dünyasını ölçen bir sistem değil, verilen kurmaca öncüller üzerinde kavram alıştırmasıdır.",
        ],
      },
      {
        title: "Kehf 107–108: iman ve iyi işler",
        paragraphs: [
          "Kehf 107–108’de iman edip yararlı işler yapanlar için Firdevs cennetleri ve orada kalma teması bulunur. Kaynak inanç ile davranış arasındaki bağı bu ayetlerle açıklar. Mesajda yalnız niyet değil, iyi işin gerçekleşmesi de vurgulanır; iki parçayı tekine indirgememek gerekir.",
          "Bu dinî ödül öğretisini “uygulamada şu kadar tık=kesin dinî sonuç” gibi bir hesaba çeviremezsin. Soruda yalnız bu bölüm verildiyse sonraki ayetlerdeki başka ayrıntıları açıkça burada söylenmiş sayma. Metin yorumunun sınırı, kullanılan parçanın kendi içeriğidir.",
        ],
      },
      {
        title: "Kehf 109: deniz ve söz benzetmesi",
        paragraphs: [
          "Kehf 109’da denizlerin mürekkep yapılması ve yine de Allah’ın sözlerinin tükenmemesi benzetmesi yer alır. Kaynak bunu ilahî ilim ve hikmetin sınırsızlığı çerçevesinde yorumlar. Benzetmede sonlu bir imkân ile tükenmezlik fikri karşılaştırılır.",
          "Bu ifade deniz suyunun fiziksel mürekkep formülünü veya hesaplanabilir kitap sayısını bildiren bir fen sorusu değildir. Anlam sorusunda benzetmenin işlevini açıkla. Şekli görmek yardımcı olabilir, fakat çizimdeki şişe veya dalga sayısından ayetin söylemediği nicel sonuçlar üretilmez.",
        ],
      },
      {
        title: "Kehf 110: insan, vahiy ve tevhid",
        paragraphs: [
          "Kehf 110’da peygamberin insan oluşu ve vahiy alması; ilahın birliği; yararlı iş ve kullukta ortak koşmama birlikte bulunur. Bu mesaj birden fazla kavramı aynı pasajda ilişkilendirir: insani yön, peygamberlik, salih amel ve tevhid için ayrı kanıt parçaları vardır.",
          "İnsan oluşu vahiy görevini yok saymaz; vahiy de insan oluşunu kaldırmaz. Ayetteki iyi iş vurgusu bütün teknik ahlak kurallarının tek tek yazıldığı anlamına gelmez. Bir seçenek için her zaman pasajda hangi ifade var diye sor; başka bir doğru dinî bilgi bu parçadan çıkarım sorusunda otomatik doğru olmaz.",
        ],
      },
      {
        title: "Olumsuz kökte kanıtı olmayanı bul",
        paragraphs: [
          "“Çıkarılamaz” kökü, yanlış kavram tanımını değil metinde desteklenmeyen sonucu seçtirebilir. Dört kavram için ayrı kanıt bulunup beşinci için hiçbir anlam karşılığı yoksa kanıtsız seçenek öne çıkar. Sözcüğün aynen bulunmaması yetmez; yakın anlamın da olup olmadığını kontrol et.",
          "Örneğin samimiyet, özen ve sorumluluk anlatan metinde kaynak paylaşımı yoksa infak eklenemez. Fakat açıkça araç verme bilgisi eklenirse bu sonuç değişir. Önceki cevabı korumak için yeni koşulu görmezden gelme; iyi çözüm değişen öncülle hangi bağın değiştiğini söyleyebilir.",
        ],
      },
      {
        title: "Kavramdan bağımsız açıklamaya",
        paragraphs: [
          "Önce kavramın anlamını kendi cümlenle söyle; sonra farklı bir olayda onu destekleyen fiili göster; en sonunda çok yakın bir karşı örnek kur. Böylece yalnız tanım görünce doğru kelimeyi seçmekten, koşul değiştiğinde gerekçeyi güncellemeye geçersin.",
          "Bir metinde birden çok kavram geçerliyse sorunun hangi boyutu istediğine dön. Kopya tanımlarla aynı olayı tekrar ezberlemek yerine yeni senaryoda niyet, eylem ve sürekliliği ayrı değerlendirmek bağımsız öğrenmeyi güçlendirir. Model kullanımı puan değildir; yeni sorudaki gerekçeyi kendin kurman gerekir.",
        ],
      },
    ],
    examples: [
      {
        title: "Niyet ile özeni ayır",
        prompt:
          "Kurmaca kişi, dikişini çok dikkatli yapıyor; ancak bunu niçin yaptığı açıklanmıyor.\nEn sınırlı yorum hangisidir?\nA) İhlas kesin. B) Riyâ kesin. C) Kıtal var. D) Hiç iş yok. E) Özen var; niyet kesinleşmemiştir.",
        strategy: "İşin niteliğini gizli amaçtan ayrı tut.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "Dikiş özenli yapılmaktadır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Amaç cümlesi bulunmadığından samimiyet veya gösteriş kesin değildir.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "E iki bilgi düzeyini ayırır; A ve B verilmemiş niyet ekler.",
          },
        ],
        answer: "E: Nitelik kanıtı, niyet boşluğu.",
        check: "Özeni gördüğünde iç amacı kendin tamamladın mı?",
        pitfall: "İhsanla uyumlu iş niteliğini otomatik ihlas teşhisi yapmak.",
      },
      {
        title: "Tek davranıştan bütün hayata geçme",
        prompt:
          "Bir anlatıda Gül, bu sabah yaptığı bağışta yalnız Allah’ın rızasını gözettiğini açıkça söylüyor. Anlatıcı Gül’ün başka günlerdeki davranışları veya gelecekteki niyetleri hakkında bilgi vermiyor.\nBu bilgiye dayanarak hangi yargı en iyi sınırlandırılmıştır?\nA) Gül hayatının her anında hiç hata yapmaz. B) Gül’ün gelecekteki bütün niyetleri ölçülmüştür. C) Gül başka hiçbir eylem yapmamıştır. D) Bağış hiç gerçekleşmemiştir. E) Verilen bağışın niyetinde ihlas vurgusu vardır; bütün hayatı için değişmez bir kişilik hükmü kurulmaz.",
        strategy:
          "Niyet kanıtının hangi eyleme ve zamana ait olduğunu belirle.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Açık niyet cümlesi bu sabahki bağışla ilgilidir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Başka zamanlar ve eylemler hakkında veri verilmediğinden tek eylemden bütün hayata değişmez hüküm taşınamaz.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "E hem verilen niyeti hem bilginin sınırını korur; A-B kapsamı büyütür, C-D anlatılan eylemi siler.",
          },
        ],
        answer: "E: Eylemin niyeti yorumlanır, bütün hayat damgalanmaz.",
        check:
          "Cevabın “bu bağış” sınırını “her zaman” genellemesine dönüştürüyor mu?",
        pitfall:
          "Bir eylemde açık samimi niyet bulunmasını bütün geçmiş ve gelecek davranışların ölçülmesi saymak.",
      },
      {
        title: "Aynı niyet, farklı özen",
        prompt:
          "İki terzi, hazırladıkları kıyafeti ihtiyaç sahibine Allah’ın rızasını gözeterek vereceklerini söylüyor. Biri dikiş ve iğne kontrolünü tamamlıyor; öteki acele edip bildiği güvenlik kontrolünü atlıyor. Metin ikisinin açıklanan niyetini aynı, işte gösterdikleri özeni farklı veriyor.\nİhlas ile ihsan ayrımı bakımından hangi yorum doğrudur?\nA) Aynı niyet açıklaması her iki işin özen düzeyini zorunlu eşitler. B) Niyet açıklaması ortak olsa da işin bilinç ve özen boyutu ayrıca değerlendirilir. C) Kontrol yapanın kesin gösteriş istediği kanıtlanmıştır. D) Kontrol atlayan kişinin hiç kıyafet hazırlamadığı kesindir. E) Özen kavramı işin nasıl yapıldığıyla hiç ilişkili değildir.",
        strategy: "Niyet sütunuyla uygulama özeni sütununu ayrı karşılaştır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Her iki kişinin açık niyet cümlesi Allah’ın rızasını gözetmektir; metin bunu farklılaştırmaz.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Güvenlik kontrolünün yapılması veya atlanması ise uygulamanın nasıl yürütüldüğünü farklılaştırır.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "B iki boyutu korur; A ortak niyetten eşit özen çıkarır, C-D yeni bilgi ekler, E özenin uygulama boyutunu reddeder.",
          },
        ],
        answer: "B: Niyet ortaklığı özen eşitliği değildir.",
        check:
          "Niyet için hangi cümleyi, özen için hangi eylemi kullandığını ayrı gösterebiliyor musun?",
        pitfall:
          "İhlas ve ihsanı birbirinin yerine geçirip aynı niyetin her uygulamayı eşit özenli yaptığını düşünmek.",
      },
      {
        title: "Sakınmanın gerekçesi",
        prompt:
          "İki kurmaca kişi aynı hileyi reddeder. Birincisi yalnız yakalanmaktan, ikincisi Allah’a karşı sorumluluğunu gözettiği için reddettiğini söyler.\nTakva yorumu için hangi fark önemlidir?\nA) Yalnız adlarının uzunluğu. B) Aynı fiziksel hareket. C) İkinci kişinin açık sorumluluk gerekçesi. D) İkisinin aynı yaşta olması. E) Hiç gerekçe verilmemesi.",
        strategy: "Ortak davranışa rağmen farklı açıklanan amacı oku.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "İki kişinin ret fiili aynıdır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "İkincinin gerekçesi dinî sorumluluk olarak belirlenmiştir.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "C takva yorumunu destekleyen farkı gösterir; ilkine aynı niyet eklenmez.",
          },
        ],
        answer: "C: Açık sorumluluk bilinci.",
        check: "Birinci kişinin gerekçesini ikinciye veya tersine taşıdın mı?",
        pitfall: "Aynı dış hareketi aynı niyet sanmak.",
      },
      {
        title: "İstikamet ve hatayı düzeltme",
        prompt:
          "Bir öğrenci adil davranmayı kendine ilke ediniyor. Bir tartışmada haksız söz söylediğini fark edince özür diliyor, verdiği zararı onarmaya çalışıyor ve aynı ilkeye göre davranışını düzeltmeyi sürdürüyor. Metin öğrencinin hiç yanılmadığını söylemiyor.\nBu örnek istikamet hakkında hangi açıklamayı destekler?\nA) İstikamet, insanın hiç hata yapmamış olduğunu kanıtlayan bir ölçümdür. B) Bir hata, bundan sonraki bütün düzeltme çabasını mantıken imkânsız yapar. C) İstikamet doğru ilkeye yönelişi sürdürmekle ilişkilidir; hata fark edildiğinde düzeltme bu yönelişle bağdaşabilir. D) Özür dilemek haksız sözü doğruya çevirir. E) Doğru ilkeye yönelmek yalnız kişinin yaşına bağlıdır.",
        strategy: "Sürdürülmeye çalışılan yönü hatasızlık iddiasından ayır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Öğrencinin seçtiği yön adalet ilkesidir; haksız söz bu ilkeyle uyuşmayan hata olarak tanınır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Özür ve onarım, hatayı doğru ilan etmeden yeniden ilkeye göre davranma çabasıdır.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "C yön sürekliliği ile düzeltmeyi birlikte açıklar; A-B hatasızlık veya dönüş imkânsızlığı ekler, D hatayı meşrulaştırır, E yaş ölçütü uydurur.",
          },
        ],
        answer:
          "C: İstikamet hatasızlık sertifikası değildir; düzeltmeyle sürdürülebilir.",
        check:
          "Öğrenci hatayı savunuyor mu, yoksa seçtiği ilkeye dönmeye mi çalışıyor?",
        pitfall:
          "Doğru yönde ilerleme çabasını geçmişte tek bir hata yapmamış olma şartına bağlamak.",
      },
      {
        title: "Kavramlar birbirini dışlamak zorunda mı?",
        prompt:
          "Bir gönüllü, bir mahalle bostanı için kendi tohum paketlerini ihtiyaç sahiplerine teslim ediyor. Aynı süreçte komşuların hakkını gözetmek için çalışmasını dikkatle planlıyor ve verdiği sözü düzenli olarak yerine getiriyor. Kaynak paylaşımı, özen ve ilkeye bağlılık metinde birlikte yer alıyor.\nBu davranışları kavramlarla incelerken hangi yaklaşım uygundur?\nA) Bir eylem infakla ilişkilendirildiyse özen ve istikamet yönünden artık incelenemez. B) Her kavram yalnız kişinin adını gösterir. C) Kavramların tanımları farklı olduğundan aynı olayda hiçbir zaman birlikte kullanılamazlar. D) Aynı olayın kaynak paylaşımı, özen ve yönü farklı kavramlarla ayrı ayrı açıklanabilir. E) Tohum verilmesi bütün niyetleri ve gelecekteki davranışları kesin ölçer.",
        strategy:
          "Kavramları zorunlu tek-seçimli kişi etiketleri yerine farklı davranış boyutları olarak kullan.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Tohum paketlerinin teslim edilmesi somut kaynak paylaşımıdır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Çalışmanın dikkatle planlanması ve verilen sözün sürdürülmesi paylaşımın yanında başka boyutlar da gösterir.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "D farklı tanımların farklı boyutları açıklamasına izin verir; A-C zorunlu dışlama ekler, B kavram anlamını siler, E kapsamı büyütür.",
          },
        ],
        answer: "D: Aynı olay farklı kavramsal boyutlarla incelenebilir.",
        check:
          "Her kavram için ayrı bir fiil veya gerekçe gösterebiliyor musun?",
        pitfall:
          "Bir kavramı seçmenin öteki bütün kavramları olaydan zorunlu dışladığını düşünmek.",
      },
    ],
    recall: [
      {
        prompt: "İhsan ile ihlasın soru odağı nasıl ayrılır?",
        answer:
          "Özenli bilinçli kullukta nasıl; samimi niyette niçin boyutu öne çıkar.",
      },
      {
        prompt: "Görünür iyilik otomatik riyâ mıdır?",
        answer: "Hayır; görünürlük ile gösteriş amacı farklıdır.",
      },
      {
        prompt: "Takvayı yalnız korkuya indirmek neden eksiktir?",
        answer:
          "Sorumluluk bilinci, tercih ve emir-yasağı gözetme boyutlarını siler.",
      },
      {
        prompt: "Cihat ile kıtal neden özdeş değildir?",
        answer:
          "Cihat geniş bilinçli çaba; kıtal daha dar silahlı savaş anlamıdır.",
      },
      {
        prompt: "İnfak için ne tür kanıt aranır?",
        answer:
          "Mal veya somut imkân paylaşımı; yalnız dilek tamamlanmış aktarım değildir.",
      },
      {
        prompt: "Kehf 107–110’un dört ana temasını hatırla.",
        answer:
          "İman ve iyi iş, ilahî sözlerin tükenmezliği, peygamberin insanlığı ve vahiy, tevhid/ortak koşmama.",
      },
    ],
  },
  {
    id: "inanc-ile-ilgili-meseleler",
    title: "İnançla ilgili meseleler: iddia, bilgi ve gerekçe",
    minutes: 135,
    objectives: [
      "Teizm, deizm, ateizm ve agnostisizmi varlık ile bilgi eksenlerini ayırarak karşılaştır.",
      "Materyalizm, pozitivizm, sekülarizm, nihilizm ve transhümanizmde hangi sorunun sorulduğunu tanı.",
      "Kötülük problemi, ahlaki/doğal kötülük ve cevapların kapsamını karşılaştır.",
      "Din istismarını somut eylemle değerlendir; farklı ayet gruplarının mesajlarını karıştırma.",
    ],
    source:
      "OGM İnançla İlgili Meseleler 48 sayfa; OGM 11. SınıfTelafi 15–19 ilgili sayfalar; Aurelia ilgili kağıt 9 sayfa. Eski OGM En’âm 59/Lokman 27 ile kağıttaki Hadîd 1–5 ayrı kaynak bağlamları olarak işlenir.",
    sections: [
      {
        title: "Önce sorunun eksenini bul",
        paragraphs: [
          "“Tanrı var mı?” varlık; “bunu kesin bilebilir miyiz?” bilgi; “kamusal kurumlar nasıl düzenlenmeli?” siyaset-toplum; “değerlerin nesnel temeli var mı?” değer sorusudur. Bir cümle aynı anda birden çok eksene ilişkin olabilir. Sınıflamaya başlarken hangi yüklemin hangi soruya cevap verdiğini belirle.",
          "Gerçek insanlara tek sözcükten bütün inanç profili yüklenmez. Sorular kurmaca düşünür veya tam cümleler üzerinden kavram öğretir. Bilimle uğraşmak, belirli kurum düzenini savunmak veya bir görüşü eleştirmek tek başına kişinin Tanrı inancını kesin göstermez; açık önermeye ihtiyaç vardır.",
        ],
      },
      {
        title: "Teizm: Tanrı inancı",
        paragraphs: [
          "Teizm Tanrı’nın varlığını kabul eden genel yaklaşımdır. OGM klasik teizm çerçevesinde yaratıcılık, bilgi, irade ve kudret niteliklerini ele alır. Tek tanrı inancına monoteizm, birden çok tanrı inancına politeizm denir. Tevhid İslam öğretisindeki birlik ve eşsizlik anlayışını ifade eder.",
          "Tanrı’nın varlığı hakkında genel kabul verilmesi, belirli bir dinin bütün ritüel ve tarih bilgisinin kabul edildiğini tek başına göstermez. Geniş tanım ile dersin ayrıntılı klasik teizm çerçevesini ayır. Soruda daha özel bilgi yoksa onu kendin ekleyerek bir gruba atama yapma.",
        ],
      },
      {
        title: "Deizm: iki öncül",
        paragraphs: [
          "Deizm tipik ders tanımında yaratıcıyı kabul ederken vahyi ve evrene doğaüstü müdahaleyi kabul etmeyen yaklaşım olarak anlatılır. İki öncül önemlidir: yaratıcı kabulü ve vahiy-müdahale konusundaki belirli görüş. Yalnız “yaratıcı vardır” cümlesi deizmin bütün ayırt edici yönünü vermez.",
          "“Vahiy hakkında henüz karar vermedim” ile “vahyi reddediyorum” aynı kesinlikte değildir. İlki kararsızlık, ikincisi belirli tutum bildirir. Bir soruda deizmi seçmek için kaynak tanımındaki ayırt edici koşulu gerçekten bul; yaratıcı kabulünden tek başına vahiy reddi sonucu çıkarma.",
        ],
      },
      {
        title: "İslam öğretisi ile deizm karşılaştırması",
        paragraphs: [
          "OGM, İslam’da Allah’ın evrenle ilişkisinin yalnız ilk yaratmayla sınırlanmadığını; bilgi, irade, kudret, vahiy ve sorumlulukla devam ettiğini anlatır. Deizmle yapılan ders karşılaştırmasının belirleyici tarafı budur. Karşılaştırma hangi konuda iki farklı önerme kurulduğunu açıklaştırır.",
          "Bu dinî ve felsefi açıklamalar deneysel bir yarışmanın sonucu gibi sunulmaz. Bir görüşün İslam öğretisiyle hangi noktada ayrıştığını öğrenmek o görüşe sahip insanlara değer biçmeyi gerektirmez. Sorunun ölçtüğü, düşüncenin doğru temsili ve metinle tutarlı gerekçedir.",
        ],
      },
      {
        title: "Ateizm: inanç konumu",
        paragraphs: [
          "Ateizm Tanrı veya tanrılara inancın bulunmaması çerçevesinde kullanılan terimdir; bazı biçimleri doğrudan “Tanrı yoktur” iddiasını savunur. Ders sorusunda açık yokluk iddiası verilmişse onu bilgiye erişim çekincesiyle aynılaştırmamalısın. Ne reddedildiğini cümledeki nesneyle birlikte oku.",
          "Bütün ateistlerin her ahlak anlayışını veya her metafizik düşünceyi aynı biçimde reddettiği sonucu çıkarılmaz. Bir görüş ailesini öğretmek, bütün mensuplarının tek gerekçeyi paylaştığını varsaymak değildir. Örnekte yalnız Tanrı inancı belirtilmişse insanın kişiliğine, yaşamına veya ahlakına ek sonuç yükleme.",
        ],
      },
      {
        title: "Agnostisizm: bilmenin sınırı",
        paragraphs: [
          "Agnostisizm Tanrı’nın varlığı veya yokluğu hakkında kesin bilgiye erişmenin mümkün olmadığı ya da yeterli gerekçe bulunmadığı yönündeki yaklaşımı ifade eder. Belirleyici yüklem “bilmek”tir. “Yoktur” önermesi varlık, “bilemeyiz” önermesi bilgi hakkındadır; ikisi mantıken aynı cümle değildir.",
          "Bilgi kesinliğini reddetmek zorunlu olarak iki ihtimale sayısal 50–50 olasılık vermek değildir. Ayrıca bir kişinin inanç ve bilgi konumu ayrı ayrı tanımlanabilir. Soru özel sınıflama istiyorsa açık ifadeyi kullan; günlük kararsızlığı her durumda tam bir felsefi sistem olarak etiketleme.",
        ],
      },
      {
        title: "Materyalizm: gerçekliğin yapısı",
        paragraphs: [
          "Materyalizm temel gerçekliğin maddi veya fiziksel olduğu anlayıştır. Burada ana soru bilgiye nasıl ulaşıldığından önce varlığın ne olduğudur. Ders kaynağında maddi dünyanın ötesinde bağımsız alan kabul etmeme vurgusu bulunur. “Yalnız maddi gerçeklik vardır” ontolojik bir iddiadır.",
          "Fizik veya kimya deneyi yapmak tek başına materyalist dünya görüşünü benimsemek değildir. Bilimsel araştırmanın çalışma yöntemiyle bütün gerçekliğe ilişkin felsefi hüküm ayrı düzlemlerdir. Metin yöntemden söz ediyorsa görünmeyen bütün varlıkları reddettiği sonucunu ekleme.",
        ],
      },
      {
        title: "Pozitivizm: bilgi ölçütü",
        paragraphs: [
          "Pozitivizm gözlem, olgu ve deneysel bilgiyi öne çıkaran felsefi yaklaşımdır. OGM Auguste Comte ve teolojik→metafizik→pozitif evreler tasarımını bu başlık altında anlatır. Bu, Comte’un tarih ve düşünce anlayışıdır; bütün insanlığın gerçekten tek çizgide ve zorunlu aynı son evreye ulaştığını kanıtlayan ölçüm değildir.",
          "Bilimsel yöntemi kullanmakla pozitivizmin bütün felsefi iddialarını kabul etmek farklıdır. Bir soruda test edilebilir bilgi ölçütü vurgulanıyorsa bilgi eksenini seç; “yalnız madde vardır” cümlesi eklendiğinde ontolojik bir ikinci iddia doğar. İki eksen birlikte bulunabilir ama biri ötekini tek başına kanıtlamaz.",
        ],
      },
      {
        title: "Sekülarizm ve laiklik",
        paragraphs: [
          "Sekülarizm dinin toplumsal veya kişisel yaşamdaki etkisinin azalması ya da din dışı alanın özerkliği gibi farklı kullanımları olan kavramdır. Laiklik özellikle devlet ve din ilişkisinin düzenlenmesiyle ilgilidir. OGM bu siyasal alan ayrımını belirtir; kavramların bütün kullanımları birebir aynı değildir.",
          "Bir kişinin kamusal kurumların tarafsız olmasını savunması onun mutlaka ateist olduğunu göstermez. Bir insan teist inançla seküler kurum tercihini birlikte taşıyabilir. Soruda kişisel inanç ve kamu düzeni ayrı verildiyse ikisini aynı önerme yapma; var olmayan çelişki kurma.",
        ],
      },
      {
        title: "Nihilizm: hangi temelin reddi?",
        paragraphs: [
          "Nihilizm bazı biçimlerinde nesnel anlam, değer veya yerleşik temellerin reddiyle ilişkilidir. Varlık, bilgi, ahlak veya siyaset alanındaki farklı türlerinden söz edilebilir. Bir metinde bütün değerlerin nesnel dayanağı reddediliyorsa değer ekseni belirleyicidir; yalnız üzgün olmak felsefi nihilizmin tanımı değildir.",
          "“Nesnel ahlak temeli yoktur” cümlesi Tanrı’nın varlığı hakkında ayrı açık önerme vermeyebilir. Bütün nihilizm türlerini aynı inanç, aynı siyasi tercih ve aynı ruh hâliyle eşitleme. Öğretim, metnin hangi şeyi hangi gerekçeyle reddettiğini göstermeyi amaçlar; insanlara psikolojik teşhis koymaz.",
        ],
      },
      {
        title: "Transhümanizm ve teknolojik geliştirme",
        paragraphs: [
          "Transhümanizm bilim ve teknolojiyle insanın bedensel veya bilişsel yetilerini geliştirmeyi savunan düşünce ailesidir. Buradaki ana odak insan kapasitesine teknoloji yoluyla müdahaledir. Tanrı inancı hakkında tek başına zorunlu bir konum bildirmez; başka görüşlerle farklı birleşimleri olabilir.",
          "Bir protez veya yardımcı araç kullanmak kişiyi otomatik bütün transhümanist tezlerin savunucusu yapmaz. Somut bir aracın yararı ile insanlığın geleceği hakkındaki kapsamlı felsefi program farklıdır. Soruda açık hedef verilmişse onu sınıflandır; tıbbi yöntem veya etik karar hakkında verilmemiş garanti üretme.",
        ],
      },
      {
        title: "Kötülük problemi",
        paragraphs: [
          "Kötülük problemi mutlak iyi, bilgili ve güçlü Tanrı anlayışıyla dünyadaki acı ve kötülüğün nasıl bağdaştırılacağını sorgular. Bu bir felsefi sorudur; “dünyada acı var” önermesiyle o acıdan hangi sonucun çıkarılacağı ayrı aşamalardır. Farklı düşünürler öncülleri ve cevapları farklı biçimde tartışır.",
          "Problemi tanımlamak onun tek zorunlu cevabını ilan etmek değildir. Bir kişinin bu soruyu sorması da otomatik ateist olduğunu kanıtlamaz. Sorunun mantıksal yapısını oku: hangi nitelikler kabul ediliyor, hangi gözlem bunlarla gerilim oluşturuyor, hangi açıklama isteniyor?",
        ],
      },
      {
        title: "Ahlaki kötülük",
        paragraphs: [
          "Ahlaki kötülük iradeli insan davranışlarının zarar verici yönüyle ilgilidir. Hile, kasıtlı zarar, yolsuzluk veya yardımı bilerek engelleme buna örnek verilebilir. Burada belirleyici, zarar görenin insan oluşu değil, doğrudan nedenin insanın tercih ve eylemi olmasıdır.",
          "Kasıt veya ihmal veriliyorsa bunları ayrı incele. Bir olayın doğal bir afet sırasında yaşanması, araya giren insan eylemini doğal olay yapmaz. Sel sonrası bağışları çalmak selin fiziksel mekanizmasından ayrı ahlaki bir fiildir; tek senaryoda birden çok neden ve sorumluluk bulunabilir.",
        ],
      },
      {
        title: "Doğal kötülük",
        paragraphs: [
          "Doğal kötülük, felsefi tartışmada insan iradesinden doğrudan kaynaklanmayan doğal süreçlerin yol açtığı acı ve zarar için kullanılan terimdir. Deprem veya fırtınanın fiziksel oluşumu bu bağlamda örneklendirilebilir. Doğal olayı “kötülük” diye sınıflandırmak burada fiziksel doğaya ahlaki niyet yüklemek değildir.",
          "Afetin sonuçları insanın bina, altyapı ve yardım kararlarıyla ağırlaşabilir veya hafifleyebilir. Bu yüzden doğal olay ile ihmali aynı satırda eritme. Bilimsel neden incelemesi, zarar azaltma sorumluluğu ve felsefi anlam tartışması birbirini tamamlayabilir; biri ötekini gereksiz kılmaz.",
        ],
      },
      {
        title: "Özgür irade cevabı",
        paragraphs: [
          "Özgür irade savunması, insanın anlamlı tercih yapabilmesiyle yanlış tercihin mümkün olması arasında ilişki kurar. Kaynak bu düşünceyi ahlaki kötülük problemine verilen cevaplardan biri olarak tartışır. Yanlış yapmanın mümkün olması, her özgür kişinin mutlaka her zaman kötülük yapacağı anlamına gelmez.",
          "Bu savunma doğal afetlerin bütün fiziksel kökenlerini tek başına açıklamaz. Bir argümanın hangi soruya cevap verdiğini sınırla; insanın seçimi verilmeyen olaya sırf kolay olduğu için irade açıklaması ekleme. Felsefi cevap bir deney sonucu değil, öncülleri ve açıklama gücü tartışılan düşüncedir.",
        ],
      },
      {
        title: "İmtihan, gelişim ve bilgi sınırı",
        paragraphs: [
          "Dinî-felsefi cevaplar arasında hayatı imtihan olarak yorumlama, güçlüklerin ahlaki gelişimle ilişkisi ve insan bilgisinin sınırlılığı bulunur. Bunlar farklı gerekçelendirme yollarıdır. Bir metin yalnız özgür iradeye, diğeri bilginin sınırına başvuruyorsa cevapların vurgu noktaları aynı değildir.",
          "Acı çeken bir kişinin yaşadığını onun suçunun veya inanç eksikliğinin kanıtı diye sunma. Bu yorumlar yardım etmeme gerekçesi de değildir. Kaynağın tartışma önerisini anlamakla gerçek bir afetzedeye kesin dinî sebep atamak farklıdır; uygulama böyle bir teşhis üretmez.",
        ],
      },
      {
        title: "Argümanı öncül ve sonuçla oku",
        paragraphs: [
          "Bir felsefi savda önce kabul edilen öncülleri, sonra bunlardan çıkarılan sonucu ayır. “Kesin bilgiye ulaşamıyoruz” öncülü, tek başına “o hâlde yoktur” sonucunu vermez. “Özgür seçim var” da bütün insanların her tercihte zarar verdiğini göstermez. İlişkinin yönünü korumak temel beceridir.",
          "Olumsuz soruda gerçek sorunu kaçırmamak için her seçeneği aynı ölçüte uygula. Görüşle uyuşmayan sonuç, görüşün açıklamak istediği problem ve eksik bilgi birbirinden ayrıdır. Bir görüşün adını bilmek yeterli olmayabilir; adın karşısına en az bir belirleyici önerme yazabilmelisin.",
        ],
      },
      {
        title: "Yeni dinî hareket: betimleyici başlık",
        paragraphs: [
          "Yeni dinî hareket görece yeni oluşmuş, örgütlenmiş veya gelenekselden farklı dinî topluluklar için kullanılan başlıktır. OGM şehirleşme, modernleşme ve anlam arayışını doğuş bağlamları arasında ele alır. Kıyamet veya milenyum beklentili gruplar bu geniş başlığın bazı örnekleridir; bütün hareketlerin aynı özelliği taşıdığı söylenemez.",
          "Yeni, küçük veya farklı olmak tek başına istismar kanıtı değildir. Bir ders metni belirli zararlı grubun özelliklerini anlatıyorsa bu özellikleri o örnekle sınırla. Grup adını somut davranış delilinin yerine koymamak hem kavramsal hem adil bir değerlendirmedir.",
        ],
      },
      {
        title: "Din istismarı: araçsallaştırma",
        paragraphs: [
          "Din istismarı inanç ve sembolleri kişisel çıkar, siyasi menfaat, baskı veya aldatma için kullanmaktır. Burada belirleyici olan çıkar ilişkisi ve uygulanan davranıştır. Birinin dinî söz kullanması tek başına istismar kanıtı olmayabilir; o sözün hangi amaçla ve hangi eylemle bağlantılı kullanıldığı incelenir.",
          "Ayrılmak isteyene tehdit, zorla para alma, bilgi saklama veya eleştiriyi cezalandırma somut inceleme gerektiren davranışlardır. Grubun yaşı bunların yerine geçmez. Tersine tek bir şeffaf davranış da bütün faaliyetlerin kusursuzluğunu garanti etmez; hükmü verilen delilin kapsamıyla sınırla.",
        ],
      },
      {
        title: "Rıza, şeffaflık ve sorgulama",
        paragraphs: [
          "Gönüllü katılım, serbest ayrılma, anlaşılır para kullanımı ve eleştiri hakkı bir topluluğun uygulamalarını değerlendirmede somut ölçütlerdir. Bunlar farklılıkları yasaklama değil, davranışın kişinin iradesine ve hakkına etkisini inceleme yollarıdır. Soruda yalnız ritüel farkı varsa tehdit veya hile varsayma.",
          "Bir alıştırmada koşul değiştirildiğinde sonucu güncelle: özgür ayrılma yerine tehdit gelirse risk bağı oluşur. Aynı isimle bütün farklı örnekleri aynı sonuca götürmek doğru değildir. Kanıt odaklı model, insanları etikete göre sıralamaz; belirtilen davranışı gerekçeyle değerlendirir.",
        ],
      },
      {
        title: "İslamofobi ve ayrımcılık",
        paragraphs: [
          "OGM İslamofobiyi Müslümanlara yönelik korku, önyargı ve dışlama bağlamında ele alır. Bir gruptaki bazı kişilerin eylemini bütün din mensuplarına yüklemek genelleme hatasıdır. Din veya başka kimlik nedeniyle insana yönelen baskı ve ayrımcılık, somut insan hakları ve birlikte yaşama bakımından değerlendirilir.",
          "Bir düşünceyi gerekçeyle eleştirmekle insanları kimliğinden dolayı aşağılamak aynı şey değildir. Ders bu ayrımı kavramayı amaçlar. Farklı inançları öğretirken de aynı tutarlılık gerekir: bir topluluğun bütün üyelerinin karakteri, tek örnek veya grup adıyla otomatik belirlenmez.",
        ],
      },
      {
        title: "En’âm 59: ilahî bilgi",
        paragraphs: [
          "Eski OGM ünitesindeki En’âm 59’da gaybın bilgisi, karada-denizde olanlar ve yaprağın düşmesi gibi örneklerle Allah’ın ilminin kapsamı anlatılır. Kaynak gaybı insanın doğrudan bilgi alanını aşan yönlerle ilişkilendirir. Pasajın açık teması ilahî bilgidir.",
          "Bu mesajdan belirli teknolojinin icat tarihi veya bir kişinin gelecek sınav sonucu çıkarılmaz. İlahî bilgi öğretisiyle insanın her ayrıntıyı önceden bildiği iddiası farklıdır. Soruda hangi öznenin neyi bildiğine dikkat et; ilahî niteliği insanın sınırsız bilgisi olarak tersine çevirme.",
        ],
      },
      {
        title: "Lokman 27: tükenmezlik benzetmesi",
        paragraphs: [
          "Lokman 27’de ağaçların kalem, denizlerin mürekkep olması benzetmesiyle Allah’ın sözlerinin tükenmezliği anlatılır. Bu, Kehf 109’la benzer temaya sahip ama ayrı ayet bağlamıdır. Benzer mesajlar bulunması metinlerin aynı ayet olduğu anlamına gelmez.",
          "Şekilde kalem ve deniz göstermek benzetmeyi anlamaya yardım eder; bu resmin nesne sayısı ayetin nicel hesabı değildir. Çözümde “sonlu yazma imkânı ile tükenmez söz” karşılaştırmasını açıkla. Fiziksel malzeme üretimi veya evrenin bilimsel yaşına ilişkin veri ekleme.",
        ],
      },
      {
        title: "Hadîd 1–5: ayrı kaynak bağlamı",
        paragraphs: [
          "Aurelia’nın güncel kağıdında Hadîd 1–5 başlığı ayrıca yer alır. Bu ayet grubunda Allah’ın yüceltilmesi, hükümranlık, hayat-ölüm, başlangıç-son ve kapsamlı bilgi temaları öne çıkar. Eski OGM’deki En’âm 59/Lokman 27 başlığıyla aynı sayfa veya aynı ayet grubu gibi gösterilmez.",
          "Bir dersin farklı kaynak sürümlerinde farklı mesaj pasajları bulunabilir. Hepsini öğrenirken kimliklerini koru: hangi sure, hangi bölüm ve hangi tema? Birbirine yakın ilim-kudret vurgusu, belirli ekonomik sistemin veya ayrıntılı tarihî olayın burada açıkça anlatıldığını kanıtlamaz.",
        ],
      },
      {
        title: "Karşılaştırmayı yeni metne taşı",
        paragraphs: [
          "Etkileşimde iddia kartını ve ek bilgiyi değiştirdiğinde varlık, bilgi, kurum veya davranış bağlantıları değişir. Bir cümle yalnız kamu düzeni hakkındaysa Tanrı inancı için kanıt yok olarak kalmalıdır. Yeni açık yaratıcı kabulü eklendiğinde inanç ekseninde ayrıca kanıt oluşur; eski cümle silinmez.",
          "Bağımsız soruda önce yüklemi ve kapsamı yaz, sonra yakın görüşten hangi veriyle ayrıldığını söyle. Eksik bilgi gördüğünde ad uydurmak yerine “bu sonuç için şu öncül yok” de. Amaç etiket ezberi değil, düşünceyi doğru aktaran ve değişen koşulu fark eden gerekçeli okumadır.",
        ],
      },
    ],
    examples: [
      {
        title: "İddianın iki ekseni",
        prompt:
          "Bir tartışmacı “Tanrı’ya inanıyorum; fakat bu konuda kesin bilgi iddiasında bulunmuyorum.” der.\nHangi okuma daha dikkatli olur?\nA) İnanç kabulü ve bilgi kesinliği ayrı değerlendirilebilir. B) İki cümle zorunlu aynı şeyi söyler. C) Kişi kesin hiçbir şey söylememiştir. D) Kamu kurumu önerisi verilmiştir. E) Yalnız madde vardır denmiştir.",
        strategy: "İnanma ile kesin bilme iddialarını ayır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "İlk önerme inanç kabulüdür.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "İkincisi bilginin kesinlik derecesine çekince koyar.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "A iki ekseni korur; tek etiketten bütün profili çıkarmamak gerekir.",
          },
        ],
        answer: "A: İnanç ve bilgi kesinliği farklı eksenler.",
        check: "Cümlede inanma ve bilme yüklemleri aynı mı?",
        pitfall: "Bilgi çekincesini inancın yokluğu sanmak.",
      },
      {
        title: "Koşul değişince etiket",
        prompt:
          "İlk cümle yaratıcı kabulü ve vahiy reddi içerir. Yeni sürüm yaratıcı kabulünü korur, fakat vahyi kabul ettiğini açıkça ekler.\nHangi sonuç doğrudur?\nA) Her şey aynıdır. B) Tipik deizm için belirleyici vahiy reddi koşulu kalkmıştır. C) Yaratıcı kabulü de otomatik silinmiştir. D) Kesin ateizm doğmuştur. E) Kamu düzeni hakkında bütün bilgi oluşmuştur.",
        strategy: "Değişen öncülü korunan öncülden ayır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "İki sürümde yaratıcı kabulü aynıdır.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Vahiy tutumu redden kabule dönmüştür.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "B deizmin ayırt edici koşulundaki değişimi gösterir; yaratıcı kabulünü silmez.",
          },
        ],
        answer: "B: Vahiy koşulu değiştiği için eski eşleme korunamaz.",
        check: "Yeni metnin açık kabulünü eski cevaba uydurmaya çalıştın mı?",
        pitfall: "Bir etiketi öğrendikten sonra yeni öncülü okumamak.",
      },
      {
        title: "İki kişi, iki düşünce ekseni",
        prompt:
          "İki kurmaca düşünür de gerçekliğin temelini maddi varlıkla açıklar. Buna karşılık biri bir iddianın bilgi sayılması için deneyle sınanmasını şart koşarken diğeri akıl yürütmeyi farklı bir bilgi ölçütü olarak öne çıkarır. Metin iki kişinin bu ölçütlerde uzlaştığını söylemez.\nBu karşılaştırma hangi sonucu gösterir?\nA) Aynı varlık görüşünü paylaşan herkes bütün bilgi ölçütlerinde de zorunlu uzlaşır. B) Varlık ve bilgi hakkında hiçbir cümle kurulmamıştır. C) Maddi temel görüşü iki kişiden yalnız birinde vardır. D) Bilgi ölçütleri kişilerin yaşını açıklar. E) Bir varlık görüşünde ortaklaşmak bütün bilgi ölçütlerini aynılaştırmak zorunda değildir.",
        strategy:
          "Varlığın temeliyle güvenilir bilgiye ulaşma ölçütünü ayrı sütunlara yaz.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "İki kişinin ortak önermesi gerçekliğin maddi temeli hakkındadır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Bilgi sayılmanın koşulu konusunda ise farklı ölçütler ileri sürdükleri açıkça verilmiştir.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "E ortak varlık görüşü ile farklı bilgi ölçütlerini birlikte korur; A metindeki farkı siler, B-D başka alanlara geçer.",
          },
        ],
        answer: "E: Bir eksende ortaklık bütün eksenlerde özdeşlik kurmaz.",
        check:
          "Ortak olan önermeyi ve farklı olan ölçütü birbirinden bağımsız gösterebildin mi?",
        pitfall:
          "İki görüşte tek ortak önerme görünce düşünürlerin bütün felsefi görüşlerini özdeş saymak.",
      },
      {
        title: "Geliştirme hedefi değer tezini belirlemez",
        prompt:
          "Bir konuşmacı teknolojinin insanın belleğini geliştirmek için kullanılmasını savunuyor. Bunun yanında insan onuru ve başkalarına zarar vermeme gibi evrensel değerleri benimsediğini söylüyor. Bir öğrenci, teknolojiyle geliştirme hedefinin zorunlu olarak bütün değerleri reddetmek anlamına geldiğini ileri sürüyor.\nÖğrencinin yorumundaki sorun nedir?\nA) Teknolojiyle geliştirme hedefinden zorunlu değer reddi çıkarıyor ve açık değer kabulünü yok sayıyor. B) Konuşmacının belleği konu ettiğini fark ediyor. C) Metinde iki cümle bulunduğunu söylüyor. D) Konuşmacının değer kabulünü aynen koruyor. E) Bir hedefin hangi alana ait olduğunu araştırıyor.",
        strategy:
          "İnsanı geliştirme programıyla değerlerin temeline ilişkin görüşü ayrı değerlendir.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "İlk cümle teknolojiyle insan yetisini geliştirme hedefidir; bu hedef tek başına bütün ahlaki değerlerin reddi değildir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "İkinci cümlede konuşmacı bazı evrensel değerleri açıkça kabul eder; yorum bu veriyi silmemelidir.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "A iki ekseni zorunlu birleştiren hatayı gösterir; B-C metin ayrıntısı, D-E ise hatayı anlatmayan geçerli işlemlerdir.",
          },
        ],
        answer: "A: Geliştirme hedefi zorunlu nihilizm sonucuna çevrilmiştir.",
        check:
          "Konuşmacının açıkça kabul ettiği değerleri yorumunda görünür tuttun mu?",
        pitfall:
          "Teknolojiye ilişkin bir programı bütün ahlaki değerlerin reddiyle zorunlu aynı görüş saymak.",
      },
      {
        title: "Etiket değil davranış",
        prompt:
          "İki topluluktan yenisi ayrılmayı serbest bırakır; eskisi ayrılmak isteyene tehdit yöneltir.\nİstismar riski bakımından hangi veri belirleyicidir?\nA) Yalnız kuruluş yılı. B) Yalnız isim benzerliği. C) Yalnız kıyafet. D) İkisinin de grup olması. E) Ayrılmaya yönelik tehdit gibi somut baskı eylemi.",
        strategy: "Eski-yeni etiketini çıkarıp rıza koşullarını karşılaştır.",
        steps: [
          {
            label: "Kanıtı çıkar",
            explanation: "Birincide özgür ayrılma vardır.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "İkincide tehdit doğrudan belirtilir.",
          },
          {
            label: "Seçenekleri denetle",
            explanation:
              "E somut risk verisini gösterir; yaş tek başına riski belirlemez.",
          },
        ],
        answer: "E: Baskı eylemi belirleyicidir.",
        check: "Etiketleri değiştirsen davranış değerlendirmesi aynı kalır mı?",
        pitfall:
          "Yenilik etiketini zarar, eskilik etiketini güven garantisi saymak.",
      },
      {
        title: "Eleştiriden şiddet izni çıkmaz",
        prompt:
          "Bir tartışmacı bir dinî görüşün iki önermesi arasında tutarsızlık bulunduğunu gerekçeleriyle ileri sürüyor. Başka biri buna karşı gerekçe yazmak yerine görüşü benimseyen kişiye fiziksel saldırı yapılabileceğini iddia ediyor. İlk tartışmacı böyle bir izin veya çağrı dile getirmemiştir.\nİlk söz ile saldırı iddiası arasındaki ilişki nasıl değerlendirilmelidir?\nA) Bir görüşün eleştirilmesi, o görüşü benimseyen herkese saldırı iznini kendiliğinden verir. B) Gerekçeli düşünce eleştirisinden kişiye fiziksel saldırı izni sonucu çıkarılamaz. C) İlk tartışmacı hiçbir önerme hakkında konuşmamıştır. D) Karşı gerekçe sunmak fiziksel saldırıyla aynı eylemdir. E) Görüşleri tartışmak insanların temel haklarını otomatik kaldırır.",
        strategy:
          "Düşünceye yönelen gerekçeyi kişiye yönelen eylemden ayrı değerlendir.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "İlk konuşma iki önerme arasındaki tutarlılık iddiasını tartışır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Saldırı izni ayrıca dile getirilmemiştir ve bir düşüncenin eleştirilmesi kişinin temel haklarını kaldırmaz.",
          },
          {
            label: "Sınırı denetle",
            explanation:
              "B eleştiri ile saldırı izni arasındaki geçersiz geçişi gösterir; A-E hak kaldıran ek sonuçlar kurar, C-D verilen eylemleri değiştirir.",
          },
        ],
        answer: "B: Düşünce eleştirisi fiziksel saldırı izni üretmez.",
        check:
          "Görüşün gerekçesine cevap vermekle kişiye saldırmak arasındaki fiil farkını korudun mu?",
        pitfall:
          "Görüş eleştirisini o görüşe sahip kişinin haklarına saldırı yetkisi saymak.",
      },
    ],
    recall: [
      {
        prompt: "Bilemeyiz ile yoktur aynı mı?",
        answer: "Hayır; bilgi sınırı ve varlık yokluğu farklı önermelerdir.",
      },
      {
        prompt: "Kesin deizm için yaratıcı kabulü tek başına yeterli mi?",
        answer:
          "Hayır; vahiy ve müdahale konusundaki ayırt edici tutum ayrıca gerekir.",
      },
      {
        prompt: "Materyalizm ile pozitivizmin eksen farkı nedir?",
        answer: "Gerçekliğin maddi yapısı ve bilginin olgu-deney ölçütü.",
      },
      {
        prompt: "Seküler kurum tercihi kişisel ateizmi zorunlu kılar mı?",
        answer:
          "Hayır; kamu düzeni ve Tanrı inancı farklı eksenlerde olabilir.",
      },
      {
        prompt: "Ahlaki ve doğal kötülüğü hangi soruyla ayırırsın?",
        answer:
          "Doğrudan neden iradeli insan eylemi mi yoksa doğal süreç mi?Aynı olay dizisinde ikisi bulunabilir.",
      },
      {
        prompt: "Yeni dinî hareketle istismarı nasıl ayırırsın?",
        answer:
          "Yaş veya farklılık etiketi yerine tehdit, zorlama, çıkar ve rıza gibi somut davranış kanıtını incelerim.",
      },
    ],
  },
];
const questionRows023 = [
  [
    {
      passage:
        "Erkam bin Ebülerkam, evini ilk Müslümanların bir araya gelerek öğrenebileceği bir yer olarak açmıştır. Bu mekân Dârülerkâm adıyla anılmıştır.",
      prompt: "Erkam’ın bu parçada özellikle belirtilen katkısı hangisidir?",
      options: [
        "Eğitim için mekân sağlama",
        "Medine’ye öğretici gönderilme",
        "Orduya komutan atanma",
        "Hicrette emanetleri teslim etme",
        "Necaşi huzurunda topluluğu savunma",
      ],
      reasons: [
        "Evin öğrenme için açılması doğrudan eğitim ortamı sağlamadır.",
        "Parça Medine’ye gönderilme olayını değil evini açmayı anlatır.",
        "Askerî görev verilmemiştir.",
        "Emanet teslimi bu pasajda yoktur.",
        "Kral huzurundaki savunma başka olaydır.",
      ],
      knowledge: [
        "Bir eğitim faaliyetine anlatıcının yanında yer ve güvenli ortam sağlayan kişi de katkıda bulunabilir.",
      ],
      strategy:
        "Kişinin yaptığı somut işi, aynı değerleri paylaşabilen başka görevlerden ayır.",
      steps: [
        "Pasajın fiili “evini öğrenme için açmak”tır.",
        "Bu fiil öğretici olarak başka şehre gönderilmeyi değil eğitim ortamını sağlar.",
        "Komuta, hicret ve temsil seçenekleri verilmemiş görev ekler; mekân sağlama seçilir.",
      ],
      commonError:
        "Eğitimle ilgili her katkıyı aynı öğreticilik görevi sanmak.",
      check:
        "Seçtiğin iş, kişinin bizzat ne yaptığıyla aynı mı? Evin açılması bilgisini açıkça kullan.",
    },
    {
      passage:
        "Musab bin Umeyr, Akabe görüşmelerinin ardından Medine’de insanlara İslam’ı öğretmek için görevlendirilmiştir.",
      prompt: "Parçadaki görevlendirmenin en doğrudan alanı nedir?",
      options: [
        "Öğretim ve iletişim",
        "Kâbe’de hakemlik",
        "Evi öğrenme ortamı olarak açma",
        "Ticaret kafilesi yönetme",
        "Miras paylarını dağıtma",
      ],
      reasons: [
        "Başka topluluğa bilgiyi öğretmesi doğrudan bu alandır.",
        "Kâbe’de uyuşmazlık anlatılmamıştır.",
        "Mekân açma değil öğretici gönderilme verilmiştir.",
        "Ticari görev yoktur.",
        "Hukuki paylaşım anlatılmamıştır.",
      ],
      knowledge: [
        "Musab’ın Medine görevi, gençlere verilen öğreticilik sorumluluğunun kaynak örneklerindendir.",
      ],
      strategy: "Yer adından ziyade verilen amaç fiiline odaklan.",
      steps: [
        "Görevin amacı “insanlara öğretmek” olarak belirtiliyor.",
        "Amaç öğretim olduğundan eğitim ve iletişim alanı doğrudan desteklenir.",
        "Medine adı ticaret veya miras bilgisini kendiliğinden eklemez.",
      ],
      commonError:
        "Görevlendirildiği şehirden metinde olmayan yönetim görevini çıkarmak.",
      check: "Cevabını “öğretmek için” sözüyle tamamlayabiliyor musun?",
    },
    {
      passage:
        "Genç Üsame bin Zeyd, daha deneyimli kişilerin de bulunduğu bir orduya komutan tayin edilmiştir. Ders metni bu görevi gence güven ve yeterlik bağlamında inceler.",
      prompt: "Bu örnekten hangi ilkeye ulaşılabilir?",
      options: [
        "Göreve uygunluk yalnız yaş büyüklüğüne indirgenmez.",
        "Her genç her göreve aynı derecede uygundur.",
        "Deneyimin hiçbir işte önemi yoktur.",
        "Komutanlıkla öğreticilik aynı görevdir.",
        "Bütün görevler kura ile dağıtılmıştır.",
      ],
      reasons: [
        "Genç bir kişiye yeterlik bağlamında görev verilmesi bunu destekler.",
        "Tek örnekten bütün gençler için sınırsız yeterlik çıkmaz.",
        "Örnek deneyimi bütün görevlerde değersiz saymaz.",
        "Görevler farklıdır; ortak sorumluluk değerleri onları özdeş yapmaz.",
        "Kura bilgisi verilmemiştir.",
      ],
      knowledge: [
        "Liyakat belirli göreve uygun yeterliktir; yaş tek başına bütün yeterlik bilgisini vermez.",
      ],
      strategy:
        "Tek olaydan desteklenen sınırlı ilkeyi, evrensel iddialardan ayır.",
      steps: [
        "Üsame’nin gençliği ve komutanlığa atanması birlikte veriliyor.",
        "Yeterlik vurgusu, yalnız yaş sırasının zorunlu ölçüt olmadığını gösterir.",
        "“Her genç” ve “hiçbir işte” genellemeleri bu tek olayın kapsamını aşar.",
      ],
      commonError:
        "Genç bir kişiye güveni bütün gençlerin bütün alanlarda uzmanlığına büyütmek.",
      check: "İlken tek olayın gösterdiği yaş–yeterlik ilişkisiyle sınırlı mı?",
    },
    {
      passage:
        "Muaz bin Cebel için bir kaynak hem dinî öğreticilik hem yönetim ve kadılık görevlerinden söz eder.",
      prompt: "Bu bilgiler birlikte nasıl değerlendirilir?",
      options: [
        "Aynı kişi farklı alanlarda sorumluluk alabilir.",
        "Birinin öğretici olması yönetici olmasını imkânsız kılar.",
        "Kadılık yalnız evini açmak demektir.",
        "Görev adları aynı işi ifade eder.",
        "Muaz bütün gençlerin tek görevi olduğunu kanıtlar.",
      ],
      reasons: [
        "Öğretim, yönetim ve yargı görevlerinin birlikte verilmesi rol çeşitliliğini gösterir.",
        "Pasaj iki rolün birlikte bulunduğunu açıkça söyler.",
        "Kadılık yargıyla ilgilidir; mekân sağlama değildir.",
        "Öğretim ve kadılık farklı işlevlerdir.",
        "Tek kişi bilgisi bütün gençler için dışlayıcı kural vermez.",
      ],
      knowledge: ["Kişi kimliği tek kalırken görevler birden fazla olabilir."],
      strategy:
        "Görevlerin farklılığını koruyarak birlikte bulunma bilgisini oku.",
      steps: [
        "İlk rol öğretim, diğerleri yönetim ve kadılık olarak sayılıyor.",
        "Birden çok rol aynı kişiye açıkça bağlandığından zorunlu çelişki yoktur.",
        "Görevleri eş anlamlı yapmak da birbirini dışlamak da pasajı bozar.",
      ],
      commonError:
        "Bir kişiye ilk öğrendiğin rol dışında hiçbir görev olamayacağını varsaymak.",
      check: "Seçtiğin yorum üç görevi de silmeden açıklıyor mu?",
    },
    {
      passage:
        "Hz. Aişe merak ettiği konuları sorarak öğrenmiş, öğrendiklerini başkalarına aktarmıştır. Ders metni onun âlim kimliğini de vurgular.",
      prompt: "Bu parçanın öğrenme süreci hangi sırayla gösterilebilir?",
      options: [
        "Soru sorma→anlama→bilgiyi aktarma",
        "Komuta→ticaret→hakemlik",
        "Ezbersiz bütün bilgiyi doğuştan bilme",
        "Bilgiyi saklama→soruya izin vermeme",
        "Yalnız tek kişinin bütün ilimleri oluşturması",
      ],
      reasons: [
        "Metin meraktan öğrenmeye, oradan aktarıma ilerler.",
        "Bu görevler parçanın fiilleri değildir.",
        "Öğrenme açıkça gerçekleştiğinden doğuştan tam bilgi iddiası yoktur.",
        "Parça soru sorma ve paylaşmanın tersini söylemez.",
        "Âlim olmak bütün alanların tek kurucusu olmak değildir.",
      ],
      knowledge: [
        "Âlim terimi önemli bir bilgi birikimi olan kişiyi belirtir; öğrenme ve soru sormayı dışlamaz.",
      ],
      strategy: "Metindeki üç etkinliği zaman ve işlev sırasıyla yaz.",
      steps: [
        "Merak ettiği konuda soru sorması başlangıç verisidir.",
        "Öğrenme sorudan sonra, başkasına aktarma edinilmiş bilgiden sonra gelir.",
        "Soru→anlama→aktarım zinciri üç fiili de karşılar.",
      ],
      commonError: "Âlim olmayı hiç öğrenme ihtiyacı olmamakla eşitlemek.",
      check:
        "Zincirindeki her okun öncesi ve sonrası parçada gerçekten var mı?",
    },
    {
      passage:
        "Hz. Fatıma, zorlu dönemlerde ailesine destek olmuş ve yaralılara yardım etmiştir.",
      prompt: "Bu iki faaliyet için en güvenilir ortak yorum nedir?",
      options: [
        "Farklı bağlamlarda destek ve sorumluluk üstlenmiştir.",
        "İkisinde de ordu komutanlığı yapmıştır.",
        "Eğitim alanında hiçbir faaliyeti olmamıştır.",
        "Yalnız akrabalara yardım etmiştir.",
        "Bütün ihtiyaçları tek başına karşılamıştır.",
      ],
      reasons: [
        "Aile desteği ile yaralıya yardım ortak katkı yönünü gösterir.",
        "Yardım fiili komutanlık bilgisi vermez.",
        "İki örnek bütün hayatın eksiksiz listesi değildir.",
        "Yaralıların yalnız akraba olduğu söylenmemiştir.",
        "Destek vermek bütün işi tek başına bitirmek demek değildir.",
      ],
      knowledge: [
        "Bir kişinin iki yardım örneği ortak değeri gösterebilir; hayatının bütün kapsamını vermez.",
      ],
      strategy:
        "Olumlu ortak davranışı bul; “yalnız” ve “hiç” içeren dışlamaları ayrıca sına.",
      steps: [
        "Aileye destek ve yaralıya yardım iki ayrı bağlamdır.",
        "İkisinde de başkasının ihtiyacına katkı sunma vardır.",
        "Öğretim yokluğu veya bütün işi tek başına yapma bilgisi verilmediğinden bu genellemeler elenir.",
      ],
      commonError:
        "Sayılmayan bir rolün kişinin hayatında hiç bulunmadığını sanmak.",
      check:
        "Ortak yorum yardım fiilinden fazla tarihî ayrıntı gerektiriyor mu?",
    },
    {
      passage:
        "Hicretle ilgili bir notta “Esma binti Ebû Bekir, babasına yardım etti.” yazılıdır. Başka bir notta Cafer’in eşi Esma binti Umeys anılır.",
      prompt: "Bu iki notu birleştirirken hangi işlem doğrudur?",
      options: [
        "Tam isim ve ilişki verileriyle iki kişiyi ayrı tutmak",
        "İlk ad aynıysa bütün faaliyetleri aynı kişiye vermek",
        "Her iki Esma’yı da Musab saymak",
        "Akrabalık bilgisini her durumda önemsiz saymak",
        "İki notun zorunlu olarak yanlış olduğunu söylemek",
      ],
      reasons: [
        "Babaya yardım ve Cafer’le eş ilişkisi farklı tam adlarla verilmiştir.",
        "Aynı ilk ad kimlik eşitliği sağlamaz.",
        "Ne ad ne olay böyle bir eşleşme verir.",
        "Bu örnekte ayırt edici verilerden biridir.",
        "Farklı kişiler olması iki notun birlikte doğru olmasına imkân verir.",
      ],
      knowledge: [
        "Tarihî kimlik eşleştirmesinde tam ad ve olay bağlamı benzer ilk addan daha belirleyicidir.",
      ],
      strategy: "Aynı adı, farklı soy ve ilişki bilgileriyle kontrol et.",
      steps: [
        "Birinci kişi Ebû Bekir’in kızı olarak adlandırılıyor.",
        "İkinci kişinin tam adı ve eş ilişkisi farklıdır.",
        "Bu veriler iki kimliği ayırır; faaliyetler topluca tek kişiye taşınamaz.",
      ],
      commonError: "Aynı ilk ismi tek tarihî kişi sanmak.",
      check: "İki nottaki “binti” sonrası adları ve ilişkiyi ayrı yazdın mı?",
    },
    {
      passage:
        "Cafer bin Ebû Talib, Habeşistan hükümdarı Necaşi’nin huzurunda Müslümanların durumunu açıklayıp sığınma haklarını savunmuştur.",
      prompt: "Anlatılan faaliyet hangi görev alanını öne çıkarır?",
      options: [
        "Temsil ve diplomatik savunma",
        "Medine’de yalnız ticaret",
        "Kâbe’de taşın yerleştirilmesi",
        "Eğitim için ev tahsisi",
        "Sırf aile içi görev paylaşımı",
      ],
      reasons: [
        "Topluluk adına hükümdarla konuşarak hakkı savunma temsil niteliğindedir.",
        "Olay Habeşistan’da ve savunma amaçlıdır.",
        "Hacerülesved olayı burada yoktur.",
        "Mekân açma değil sözle temsil anlatılıyor.",
        "Topluluk ve hükümdar arasındaki ilişki aile içi değildir.",
      ],
      knowledge: [
        "Bir topluluğun durumunu başka otoriteye açıklayarak hakkını savunmak temsil boyutu taşır.",
      ],
      strategy: "Mekânı, konuşulan muhatabı ve savunulan hakkı birlikte oku.",
      steps: [
        "Muhatap Necaşi, savunulanlar sığınan Müslümanlardır.",
        "Cafer onlar adına durum açıklayıp hak savunuyor.",
        "Bu ilişki temsil ve diplomasiye uyar; ev açma veya taş yerleştirme değildir.",
      ],
      commonError:
        "Başka bir genç sahabinin öğretici rolünü bu savunmaya taşımak.",
      check:
        "Cevabında hükümdar huzurunda topluluk adına konuşma ilişkisi korunuyor mu?",
    },
    {
      passage:
        "Hicret sırasında Hz. Ali, emanetlerin sahiplerine ulaştırılması görevini üstlenmiştir.",
      prompt: "Bu görevin metinde özellikle gösterdiği tutum nedir?",
      options: [
        "Emanet sorumluluğunu koruma",
        "Bütün emanetleri kendine mal etme",
        "Emaneti yalnız arkadaşlara verme",
        "Eğitim mekânı inşa etme",
        "Askerî komuta ile aynı işi yapma",
      ],
      reasons: [
        "Belirleyici fiil başkasına ait olanı sahibine ulaştırmaktır.",
        "Ulaştırma bunun tersidir.",
        "Sahipler için böyle bir sınırlama verilmemiştir.",
        "İnşa bilgisi yoktur.",
        "Emanet teslimi askerî komutayla özdeş değildir.",
      ],
      knowledge: [
        "Emanet, başkasına ait hak veya üstlenilmiş görevi koruma yükümlülüğüyle ilişkilidir.",
      ],
      strategy: "Nesnenin kime ait olduğunu ve fiilin yönünü belirle.",
      steps: [
        "Eşyalar emanet, teslim edilecek kişiler onların sahipleridir.",
        "Görev başkasının hakkını koruyup iade etmektir.",
        "Bu nedenle güven ve emanet sorumluluğu desteklenir; mal edinme yorumu fiille çelişir.",
      ],
      commonError:
        "Emaneti koruyan kişinin eşyaların sahibi olduğunu varsaymak.",
      check: "“Sahiplerine” kelimesi seçtiğin yorumda yer buluyor mu?",
    },
    {
      passage:
        "Genç Hz. Muhammed, Mekke’de haksızlığa uğrayanların haklarını korumak amacıyla oluşan Hilfülfudûl girişimine katılmıştır.",
      prompt: "Bu amaç hangi değerle en doğrudan ilişkilidir?",
      options: [
        "Adalet",
        "Yalnız servet artırma",
        "Yeni fıkhi mezhep kurma",
        "Orduyu yönetme",
        "Her uyuşmazlığı şiddetle çözme",
      ],
      reasons: [
        "Haksızlığa uğrayanın hakkını koruma doğrudan adalet alanıdır.",
        "Amaç kişisel kazanç olarak verilmemiştir.",
        "İslam öncesi dayanışma girişimi fıkhi ekol değildir.",
        "Askerî görev belirtilmemiştir.",
        "Metin böyle bir araç veya genellik vermez.",
      ],
      knowledge: [
        "Hilfülfudûl kaynakta İslam öncesi hak koruma dayanışması bağlamında anılır.",
      ],
      strategy: "Tarihî adın yerine kuruluşun amaç cümlesini koy.",
      steps: [
        "Amaç haksızlığa uğrayanın hakkının korunmasıdır.",
        "Hak gözetme adalet kavramının somut karşılığıdır.",
        "Mezhep, kazanç veya askerî yöntem ekleyen seçeneklerin açık kanıtı yoktur.",
      ],
      commonError:
        "Tarihî bir topluluk adını sonradan oluşan mezheple eşitlemek.",
      check: "Değer seçimini “hak koruma” fiiline bağladın mı?",
    },
    {
      passage:
        "Kâbe’nin onarımı sırasında Hacerülesved’in yerine konulması konusunda anlaşmazlık çıkmış; Hz. Muhammed taraflar arasında çözüm için hakemlik yapmıştır.",
      prompt: "Metinde hangi faaliyet vardır?",
      options: [
        "Uyuşmazlığı çözmeye yönelik hakemlik",
        "Vahiy metnini yazma",
        "Medine’ye hicret edenleri sayma",
        "Bütün tarafları aynı kişi ilan etme",
        "Ticaret için yolculuk düzenleme",
      ],
      reasons: [
        "Taraflar arasındaki anlaşmazlık için hakemlik açıkça verilmiştir.",
        "Vahiy kâtipliği anlatılmamıştır.",
        "Göç sayımı yoktur.",
        "Uzlaşma kimlikleri aynılaştırma değildir.",
        "Yolculuk veya ticaret bilgisi yoktur.",
      ],
      knowledge: [
        "Hakemlik, tarafların uyuşmazlığını çözmeye yönelik görevdir.",
      ],
      strategy: "Verilen sorun ve üstlenilen rolü aynı cümlede birleştir.",
      steps: [
        "Sorun taşın yerleştirilmesi yüzünden çıkan anlaşmazlıktır.",
        "Üstlenilen rol taraflar arasında hakemliktir.",
        "Bu nedenle olay çözüm üretmeyle ilgilidir; yazma veya seyahat rolü eklenmez.",
      ],
      commonError:
        "Hacerülesved adını görüp olayı vahiy kâtipliğiyle karıştırmak.",
      check: "Sorun→görev eşlemen taş anlaşmazlığı→hakemlik biçiminde mi?",
    },
    {
      passage:
        "Kaynakta Hz. Muhammed’in gençliğinde ticaret yaptığı, doğru sözlü ve emanete bağlı olduğu için el-emîn diye anıldığı belirtilir.",
      prompt: "El-emîn ifadesinin bu bağlamdaki karşılığı nedir?",
      options: [
        "Güvenilir kimse",
        "Her konuda teknik uzman",
        "Yalnız askerî lider",
        "Başkasına ait mala sahip olan",
        "Hiç çalışmayan kimse",
      ],
      reasons: [
        "Doğruluk ve emanete bağlılık güvenilirlik anlamını verir.",
        "Güvenilirlik bütün alanlarda teknik uzmanlık değildir.",
        "Lakap askerî rütbe olarak verilmemiştir.",
        "Emanete bağlılık malı kendine geçirme anlamına gelmez.",
        "Ticaret yaptığı açıkça söylenir.",
      ],
      knowledge: [
        "El-emîn güvenilirliği ifade eder; meslek veya her konuda bilgi sahibi olma unvanı değildir.",
      ],
      strategy: "Lakabın gerekçesini adından ayrı çıkar.",
      steps: [
        "Gerekçeler doğru söz ve emanete bağlılıktır.",
        "İki davranış güven ilişkisini destekler.",
        "Bu nedenle güvenilir kimse karşılığı seçilir; rütbe veya sınırsız uzmanlık eklenmez.",
      ],
      commonError:
        "Olumlu bir lakaptan bütün yeterliklerin varlığını çıkarmak.",
      check: "Cevabın lakap için verilen iki davranışı birlikte açıklıyor mu?",
    },
    {
      passage:
        "Bir anlatı, Hz. İbrahim’in batan yıldız, ay ve güneş üzerine düşünerek gökleri ve yeri yaratana yönelmesini konu edinir.",
      prompt: "Ders bağlamında hangi ilişki öne çıkar?",
      options: [
        "Tefekkür ile tevhid yönelişi",
        "Yeni bir astronomik ölçüm yasası",
        "Bütün gök cisimlerinin aynı büyüklükte olması",
        "Her düşüncenin her zaman aynı sonucu vermesi",
        "Hiçbir gözlem yapılmaması",
      ],
      reasons: [
        "Gözlenen geçicilik üzerine düşünme yaratıcıya yönelişle bağlanıyor.",
        "Parça fiziksel hareket için nicel yasa kurmuyor.",
        "Büyüklük eşitliği verilmemiştir.",
        "Tek anlatı evrensel psikoloji yasası değildir.",
        "Yıldız, ay ve güneşin batışı gözlem olarak yer alır.",
      ],
      knowledge: [
        "Tefekkür düşünme, tevhid Allah’ın birliği ve eşsizliği ilkesidir.",
      ],
      strategy: "Anlatıdaki gözlem ile dinî yorum sonucunu iki satırda ayır.",
      steps: [
        "Yıldız, ay ve güneşin batması geçicilik yönüyle ele alınır.",
        "Bu gözlem üzerine düşünme yaratıcıya yönelmeyle bağlanır.",
        "İlişki dinî anlam yorumudur; sayısal astronomi yasası eklenemez.",
      ],
      commonError:
        "Dinî anlatıyı açıklanmamış bir fizik formülü gibi öğretmek.",
      check:
        "Seçenek gözlemden hangi inanç yorumuna gidildiğini belirtiyor mu?",
    },
    {
      passage:
        "Ashab-ı Kehf anlatısında inançları nedeniyle baskı gören gençlerin korunmak için mağaraya sığındığı belirtilir. Parça adlarını ve sayısını vermez.",
      prompt: "Bu parçadan hangisine ulaşılabilir?",
      options: [
        "Gençlerin kararlılık ve güvenliğe sığınma tutumu anlatılır.",
        "Mağaranın kesin coğrafi konumu verilmiştir.",
        "Gençlerin tam sayısı belirlenmiştir.",
        "Bütün sığınan topluluklar aynı tarihî kişilerdir.",
        "Baskı bütün insanlarda aynı sonucu doğurur.",
      ],
      reasons: [
        "Baskı ve sığınma ile inancı koruma açık veridir.",
        "Yer adı yoktur.",
        "Sayı verilmediği açıkça belirtilir.",
        "Tutum benzerliği kimlik eşitliği değildir.",
        "Tek anlatı evrensel davranış yasası vermez.",
      ],
      knowledge: [
        "Bir anlatının tutumunu yorumlamak, verilmemiş ad ve sayıları belirlemekle aynı değildir.",
      ],
      strategy: "Açık eylemi koru; eksik kimlik bilgisini ekleme.",
      steps: [
        "Metinde baskı, inancı koruma ve mağaraya sığınma bulunur.",
        "Bu veriler kararlılık ve korunma yorumunu destekler.",
        "Konum, sayı ve bütün insanlar hakkındaki genellemelerin kanıtı yoktur.",
      ],
      commonError:
        "Bilinen başka anlatı ayrıntısını kısa pasajda verilmiş saymak.",
      check: "Seçtiğin yorum yalnız bu pasajdaki fiillerle kurulabiliyor mu?",
    },
    {
      passage:
        "Bir metin genç Hz. Yusuf, Hz. Musa ve Hz. Meryem’i iffet, sabır ve takva bağlamında örnekler.",
      prompt: "Bu sunum için hangi yorum doğrudur?",
      options: [
        "Aynı kişide birden çok tutum bulunabilir.",
        "Her kişi yalnız tek erdem taşır.",
        "Sabır hiçbir şey yapmamak demektir.",
        "Takva yalnız fiziksel korku belirtisidir.",
        "Kişi adı metindeki davranışı okumayı gereksiz kılar.",
      ],
      reasons: [
        "Üç kavram kişilere kapalı ve tekil meslek etiketleri değildir.",
        "Parça böyle bir dışlayıcılık kurmaz.",
        "Sabır doğru tutumu güçlükte sürdürmeyle ilişkilidir.",
        "Takva sorumluluk bilinci alanıdır.",
        "Kavram eşleştirmesi davranış ve bağlam gerektirir.",
      ],
      knowledge: [
        "Ahlaki kavramlar birbirini zorunlu dışlayan tek kişilik sınıflar değildir.",
      ],
      strategy:
        "Kaynağın örnekleme yaptığını, tümden kişi tasnifi yapmadığını fark et.",
      steps: [
        "Üç kişi birden çok tutumun örnekleri olarak anılıyor.",
        "Bu yapı her kişinin yalnız tek tutumu olduğu önermesini içermez.",
        "Dolayısıyla rol ve değerlerin birlikte bulunabileceği yorumu kapsamı korur.",
      ],
      commonError: "Kavram tablosunu “bir kişi=bir tek erdem” kuralı sanmak.",
      check: "Yorumun kişilere verilmemiş bir dışlama getiriyor mu?",
    },
    {
      passage:
        "Âl-i İmrân 159’un öğretim özeti, yumuşak davranma, affetme, iş hakkında danışma ve karar sonrasında Allah’a güvenmeyi birlikte anlatır.",
      prompt: "Bu süreç hangi yorumu destekler?",
      options: [
        "Danışma ve sorumluluk üstlenme, güvenle birlikte düşünülebilir.",
        "Güvenmek bütün hazırlıkları bırakmaktır.",
        "Danışılan herkes aynı görüşte olmak zorundadır.",
        "Affetmek karar vermeyi imkânsız kılar.",
        "Yumuşak davranmak hiçbir görevi yapmamaktır.",
      ],
      reasons: [
        "İstişare ve karar sonrası tevekkül aynı süreçte yer alır.",
        "Karar ve danışma varken sorumsuz bekleyiş sonucu çıkmaz.",
        "Görüş birliği zorunluluğu verilmemiştir.",
        "Parça affı ve kararı birlikte sunar.",
        "İlişki tarzı görevden kaçma değildir.",
      ],
      knowledge: [
        "İstişare görüş alma, tevekkül sorumlulukla Allah’a güvenme çerçevesinde öğretilir.",
      ],
      strategy: "Süreçteki fiilleri silmeden bir arada yorumla.",
      steps: [
        "Özette danışma ve ardından karar bulunur.",
        "Güvenme bu eylemlerden sonra anlatıldığı için hazırlıksız bekleyiş değildir.",
        "İki eylemi bir arada koruyan seçenek desteklenir.",
      ],
      commonError: "Tevekkülü eylem yerine geçen pasif bekleyiş sanmak.",
      check: "Seçimin hem “danışma” hem “karar” fiiline yer veriyor mu?",
    },
    {
      passage:
        "Bir kaynak hayat sırasını şöyle verir: babasını doğmadan önce, annesini altı yaşında, dedesini sekiz yaşında kaybetme; ardından Ebû Talib’in himayesinde büyüme.",
      prompt: "Bu parçanın kronolojisi için hangisi doğrudur?",
      options: [
        "Annenin kaybı, dedenin kaybından öncedir.",
        "Ebû Talib’in himayesi doğumdan önce başlamıştır.",
        "Babasını kaybettiğinde sekiz yaşındadır.",
        "Dedesinin kaybı anneninkinden öncedir.",
        "Tüm kayıplar aynı gün olmuştur.",
      ],
      reasons: [
        "Altı yaş sekiz yaştan önce gelir.",
        "Himaye bu sırada sonraki bağlamda verilmiştir.",
        "Babanın kaybı doğum öncesidir.",
        "Sekiz yaş altı yaştan sonra gelir.",
        "Farklı zamanlar açıkça belirtilir.",
      ],
      knowledge: [
        "Kronolojik sıralama olay adlarının değil verilen zamanların karşılaştırılmasıyla yapılır.",
      ],
      strategy:
        "Doğum öncesi, altı ve sekizi ayrı zaman işaretleri olarak sırala.",
      steps: [
        "Babanın kaybı doğumdan önce konumlanır.",
        "Annenin kaybı altı, dedenin kaybı sekiz yaş işaretindedir.",
        "Altı sekizden önce olduğundan anne→dede sırası doğrudur.",
      ],
      commonError:
        "Aile büyüklerini yaş sırasına koyup olay zamanlarını atlamak.",
      check:
        "Olay sırasını kurarken metindeki altı ve sekiz verilerini kullandın mı?",
    },
    {
      passage:
        "Bir öğrenci, tarihî emanete bağlılık örneğini anladıktan sonra okul kulübündeki dijital kayıtları yetkisi dışında paylaşmamaya özen gösteriyor.",
      prompt: "Bu davranışın bilinçli örnek almaya uygun tarafı nedir?",
      options: [
        "İlkeyi anlamını koruyarak yeni koşula uygulaması",
        "Tarihî nesnenin aynısını üretmesi",
        "Gerekçeyi bilmeden bütün hareketleri kopyalaması",
        "Dijital kaydın bütün tarihî olayları kanıtlaması",
        "Bir davranışın bütün karakteri kesin ölçmesi",
      ],
      reasons: [
        "Araç değişse de emanetin korunması ilkesi gözetiliyor.",
        "Örnekte nesne değil ilke yeni ortama taşınır.",
        "Öğrencinin ilkeyi anladığı açıkça verilmiştir.",
        "Güncel örnek tarihî kanıt üretmez.",
        "Tek davranış bütün karakter ölçümü değildir.",
      ],
      knowledge: [
        "Bilinçli örnek alma, gerekçe ve uygun ilkeyi bağlam değişse de korumayı içerir.",
      ],
      strategy: "Değişen aracı ve korunan amacı ayrı yaz.",
      steps: [
        "Tarihî örnekte nesne, yeni durumda dijital kayıt vardır.",
        "Korunan ortak ilke yetki ve emanete özen göstermektir.",
        "İlke anlaşılarak aktarıldığı için biçimsel kopyalamadan ayrılır.",
      ],
      commonError: "Örnek almayı yalnız aynı nesneyi kullanmak saymak.",
      check:
        "Yeni örnekte aynı kalan gerekçeyi kendi cümlenle gösterebiliyor musun?",
    },
  ],
  [
    {
      passage:
        "Bir ders metni, evrendeki uyum ve düzen üzerine düşünerek düzenleyici yaratıcı fikrine yönelen bir gerekçeyi anlatıyor.",
      prompt: "Anlatılan gerekçelendirme hangisidir?",
      options: [
        "Gaye ve nizam delili",
        "Ekmel varlık düşüncesi",
        "Salt bir biyoloji ölçümünün zorunlu sonucu",
        "Yalnız tanım sözlüğü",
        "Kesin sınav tarihi hesabı",
      ],
      reasons: [
        "Başlangıç noktası evrendeki amaç ve düzendir.",
        "Başlangıç zihindeki en yetkin varlık fikri değil gözlenen düzendir.",
        "Teolojik gerekçelendirme deneyin tek zorunlu sonucu değildir.",
        "Metin tanımdan sonuca giden gerekçe sunuyor.",
        "Takvim hesabı yoktur.",
      ],
      knowledge: [
        "Din felsefesindeki bir sav, hangi öncülü hangi sonuca bağladığıyla tanınır.",
      ],
      strategy: "Savın başlangıç verisini sonuçtan önce belirle.",
      steps: [
        "Başlangıç verisi evrendeki uyum ve düzendir.",
        "Bu veriden yaratıcı fikrine yönelim kurulmuştur.",
        "Düzen odaklı bu yapı gaye ve nizamı karşılar; zihinsel yetkinlik savı değildir.",
      ],
      commonError:
        "Aynı sonuca yönelen bütün savları aynı delil adıyla çağırmak.",
      check: "Seçtiğin ad başlangıçtaki düzen verisini açıklıyor mu?",
    },
    {
      passage:
        "Bir düşünür, zihindeki en mükemmel varlık fikri ile bu varlığın var oluşu arasında bağ kurmaya çalışır.",
      prompt: "Bu savın başlangıç noktası nedir?",
      options: [
        "Yetkin varlık kavramı",
        "Laboratuvarda ölçülmüş en büyük kütle",
        "Dillerin sayısı",
        "Gece süresinin hesabı",
        "Bir sınavdaki doğru sayısı",
      ],
      reasons: [
        "Verilen öncül zihinsel mükemmellik tasarımıdır.",
        "Kütle ölçümü yoktur.",
        "Dil sayısı verilmemiştir.",
        "Süre hesabı yapılmaz.",
        "Sınav verisi bulunmaz.",
      ],
      knowledge: [
        "Ekmel varlık düşüncesi kavramsal öncülden hareket eden felsefi bir gerekçelendirmedir.",
      ],
      strategy: "Öncülün gözlem mi kavram mı olduğunu ayır.",
      steps: [
        "Metin başlangıçta zihindeki fikri verir.",
        "Mükemmellik bu fikrin ayırt edici niteliğidir.",
        "Dolayısıyla sav yetkinlik kavramından hareket eder; fiziksel ölçüm eklenmez.",
      ],
      commonError: "Felsefi kavramı cihazla ölçülmüş veri saymak.",
      check: "Cevabın metinde geçen zihinsel fikirle aynı düzlemde mi?",
    },
    {
      passage:
        "Bir açıklamada “Allah’ın bir ve eşsiz oluşu” özellikle vurgulanmaktadır.",
      prompt: "Bu vurgu hangi isimle en doğrudan ilişkilidir?",
      options: ["Ehad", "Rezzak", "Şâfi", "Muhyî", "Musavvir"],
      reasons: [
        "Birlik ve eşsizlik bu ismin belirleyici anlamıdır.",
        "Rızık verme anlamındadır; burada besin veya rızık vurgusu yoktur.",
        "Şifa verme bu cümlenin doğrudan fiili değildir.",
        "Hayat verme anlatılmamıştır.",
        "Biçim verme ayrıntısı yoktur.",
      ],
      knowledge: [
        "İsim eşleştirmesinde sorulan anlamın belirleyici yönü esas alınır.",
      ],
      strategy: "Birlik ifadesini başka yaratma fiilleriyle değiştirme.",
      steps: [
        "Cümle bir ve eşsiz oluşu anlatır.",
        "Bu anlam Ehad ismine karşılık gelir.",
        "Diğer isimlerin rızık, şifa, hayat ve biçim fiilleri verilmemiştir.",
      ],
      commonError:
        "Bütün olumlu isimlerin her cümlede aynı doğrudan karşılık olduğunu sanmak.",
      check:
        "“Bir ve eşsiz” sözünü seçtiğin ismin anlamıyla eşleyebiliyor musun?",
    },
    {
      passage:
        "İki kartta şu anlamlar yazıyor: I “Diri olan”, II “Hayat veren”.",
      prompt: "Kartların doğru eşleştirmesi hangisidir?",
      options: [
        "I Hayy, II Muhyî",
        "I Muhyî, II Hayy",
        "I Rezzak, II Şâfi",
        "İkisi de yalnız Musavvir",
        "İkisi de aynı tanımdır",
      ],
      reasons: [
        "Hayy diri oluşu; Muhyî hayat verme fiilini belirtir.",
        "Diri olma ile hayat verme ters eşleştirilmiştir.",
        "Rızık ve şifa bu iki tanım değildir.",
        "Biçim verme başka anlamdır.",
        "Özneye ait diri oluş ve başkasına hayat verme farklıdır.",
      ],
      knowledge: [
        "Hayat sıfatı ve Hayy ismi diri oluşla; Muhyî hayat vermeyle ilişkilidir.",
      ],
      strategy: "Her kartta fiilin öznesini ve yönünü kontrol et.",
      steps: [
        "I öznenin diri olmasını bildirir.",
        "II hayatın başka canlılara verilmesi yönünü taşır.",
        "Bu ayrımı koruyan çift Hayy→Muhyî sırasıdır.",
      ],
      commonError: "Canlı sözcüğü nedeniyle iki kavramı eş anlamlı saymak.",
      check: "Kartların yüklemlerini “olmak” ve “vermek” diye ayırdın mı?",
    },
    {
      passage:
        "Bir kavram listesinde “yaratma”, “biçim verme” ve “rızık verme” ayrı anlamlardır. Soru yalnız biçim verme anlamının adını istemektedir.",
      prompt: "Hangi isim biçim verme anlamını en doğrudan karşılar?",
      options: ["Musavvir", "Hayy", "Rezzak", "Ehad", "Şâfi"],
      reasons: [
        "Biçim ve suret verme anlamı sorulan vurguyu doğrudan karşılar.",
        "Diri oluş biçim verme ile aynı anlam değildir.",
        "Rızık verme ayrı bir anlam olarak belirtilmiştir.",
        "Birlik ve eşsizlik biçim verme değildir.",
        "Şifa verme ayrı anlamdır.",
      ],
      knowledge: [
        "Musavvir yaratmanın biçim ve özellik kazandırma vurgusuyla öğretilir.",
      ],
      strategy: "İstenen anlamı yaratma ve rızık verme vurgularından ayır.",
      steps: [
        "Kök yalnız biçim verme anlamını istiyor.",
        "Musavvir’in belirleyici anlamı biçim kazandırmadır.",
        "Rızık veya diri oluş seçenekleri başka dala ait olduğundan elenir.",
      ],
      commonError: "Haritadaki tüm dalları genel yaratma adıyla tekleştirmek.",
      check: "Seçimin “biçim” sözcüğüne özel karşılık veriyor mu?",
    },
    {
      passage:
        "Bir ders örneği canlıların beslenmesi için rızık ve imkân verilmesini konu alır.",
      prompt: "Örneğin vurgusuyla hangi isim en doğrudan ilişkilidir?",
      options: ["Rezzak", "Ehad", "Hayy", "Musavvir", "Yalnız Şâfi"],
      reasons: [
        "Rızık verme doğrudan bu isimle karşılanır.",
        "Eşsizlik metnin odak fiili değildir.",
        "Diri oluşla rızık verme aynı tanım değildir.",
        "Biçim vermeden söz edilmemektedir.",
        "Tedavi ve iyileşme verilmemiştir.",
      ],
      knowledge: [
        "Aynı canlı farklı isimlere örnek olabilir; kökün vurguladığı ilişki seçimi belirler.",
      ],
      strategy: "Canlı olma bilgisinden ziyade besleme fiilini işaretle.",
      steps: [
        "Metinde rızık ve beslenme imkânı verilmesi bulunur.",
        "Bu fiil Rezzak anlamını doğrudan destekler.",
        "Canlı bulunması tek başına Hayy veya Şâfi’yi odak yapmaz.",
      ],
      commonError: "Canlı geçen her örnekte Hayy seçmek.",
      check: "Gerekçen canlı olmayı değil rızık verilmesini açıklıyor mu?",
    },
    {
      passage:
        "Bir öğrenci “Şâfi şifa veren anlamındadır; bu nedenle doktora başvurmak gereksizdir.” diyor.",
      prompt: "Bu çıkarım nasıl değerlendirilir?",
      options: [
        "İsim anlamından tedaviyi bırakma sonucu çıkmaz.",
        "Her hastalık anında kendiliğinden biter.",
        "Doktor yalnız rızık dağıtır.",
        "Şâfi yalnız biçim veren demektir.",
        "Tedavi görürse inanç kavramını öğrenemez.",
      ],
      reasons: [
        "Dinî anlam ile pratik sağlık sorumluluğu birbirini dışlamaz.",
        "İsim tanımı bütün hastalıkların seyrini garanti etmez.",
        "Hekimlik tanımı böyle değildir.",
        "Bu Musavvir’le karışmadır.",
        "Öğrenme ile tedavi arasında böyle bir dışlama yoktur.",
      ],
      knowledge: [
        "Dinî isim öğretimi sağlık davranışları için ölçülmemiş garanti veya tedavi reddi üretmez.",
      ],
      strategy: "Tanımı, öğrencinin eklediği uygulama hükmünden ayır.",
      steps: [
        "Öncül Şâfi’nin şifa verme anlamıdır.",
        "Sonuç doktora gitmeme iddiası olarak ayrıca eklenmiştir.",
        "Tanım bu dışlamayı içermediğinden sonuç desteklenmez.",
      ],
      commonError: "Dinî isim anlamını tıbbi kararın tek gerekçesi yapmak.",
      check:
        "Cevabında “şifa” anlamı korunurken tedaviyi dışlayan ek öncül kaldırıldı mı?",
    },
    {
      passage:
        "Dört açıklama veriliyor: her şeyi bilme, güç yetirme, dileme ve yaratma.",
      prompt: "Bu sıraya uygun sıfat dizisi hangisidir?",
      options: [
        "İlim–kudret–irade–tekvin",
        "Tekvin–irade–kudret–ilim",
        "Kudret–ilim–tekvin–irade",
        "Hayat–ilim–ilim–hayat",
        "Hepsi yalnız kudrettir.",
      ],
      reasons: [
        "Dört fiil sırasıyla bu anlamlara karşılık gelir.",
        "Bilme ve yaratma yer değiştirmiştir.",
        "İlk fiilden itibaren anlamlar kaydırılmıştır.",
        "Güç, dileme ve yaratma anlamları karşılanmaz.",
        "İlişkili sıfatlar aynı tanım değildir.",
      ],
      knowledge: [
        "İlim, kudret, irade ve tekvin farklı fiil anlamlarıyla ayırt edilir.",
      ],
      strategy: "Her fiili tek tek eşleştirip sırayı sonra kontrol et.",
      steps: [
        "Bilme ilim, güç yetirme kudrettir.",
        "Dileme irade, yaratma tekvindir.",
        "Bu dört eşleşmeyi aynı sırada koruyan dizi seçilir.",
      ],
      commonError: "Doğru terimleri tanıyıp sıralarını kontrol etmemek.",
      check: "Dizideki üçüncü terim gerçekten dileme fiiline mi ait?",
    },
    {
      passage:
        "Bir insan seçeneklerini düşünüyor, birini tercih ediyor ve kendi davranışının sonucunu üstleniyor.",
      prompt: "Parçada sırasıyla hangi kavramlar öne çıkar?",
      options: [
        "Akıl–irade–sorumluluk",
        "Sınırsız güç–bilgisizlik–kaçış",
        "Yalnız tesadüf–tesadüf–tesadüf",
        "Tebliğ–teşri–takrir",
        "Rezzak–Ehad–Musavvir",
      ],
      reasons: [
        "Değerlendirme, tercih ve sonuç üstlenme bu sırayı karşılar.",
        "Metin sınırlı değerlendirme ve sorumluluk anlatır.",
        "Bilinçli tercih açıkça verilmiştir.",
        "Peygamberlik veya sünnet türü sorulmaz.",
        "Bunlar insanın işlem sırası değildir.",
      ],
      knowledge: [
        "İnsan iradesi sınırlı imkânlar içinde tercih anlamı taşır; sınırsız kontrol değildir.",
      ],
      strategy: "Üç eylemi ayrı bilişsel ve ahlaki işlevlere bağla.",
      steps: [
        "Önce seçenekler değerlendirilir; bu akıl boyutudur.",
        "Sonra tercih iradeyi, sonuç üstlenme sorumluluğu gösterir.",
        "Sınırsız güç veya ilahî isimler bu insan eylemi dizisini karşılamaz.",
      ],
      commonError: "Tercih yapabilmeyi her dış koşulu yönetmekle eşitlemek.",
      check:
        "Üç kavramın her biri için pasajdan farklı bir fiil gösterebiliyor musun?",
    },
    {
      passage:
        "Bir kaynak, insanın doğayı ve kendisine verilen imkânları emanet bilinciyle korumasını vurgular.",
      prompt: "Bu vurgu hangi sonucu destekler?",
      options: [
        "İmkân kullanımı sorumlulukla ilişkilidir.",
        "İnsan her şeyi sınırsızca tüketebilir.",
        "Emanet yalnız bir anahtarın adıdır.",
        "Sorumluluk hiçbir eylem içermez.",
        "Kaynakların hiç kullanılmaması zorunludur.",
      ],
      reasons: [
        "Koruma ve emanet bilgisi kullanımda hak gözetmeyi gerektirir.",
        "Bu sonuç koruma vurgusuyla çelişir.",
        "Metin doğa ve bütün imkânlara geniş kullanım verir.",
        "Koruma somut davranış gerektirebilir.",
        "Sorumlu kullanım tümden kullanmama demek değildir.",
      ],
      knowledge: [
        "Emanet anlayışı yalnız sahip olma değil koruma ve hak gözetme yönü taşır.",
      ],
      strategy: "Koruma fiilinden desteklenen kullanım ilkesini çıkar.",
      steps: [
        "Nesneler doğa ve verilen imkânlardır.",
        "Bunlara yaklaşım emanet bilinci ve koruma olarak tanımlanır.",
        "Bu nedenle kullanımın sorumlulukla sınırlandığı yorumu çıkar; sınırsız tüketim değil.",
      ],
      commonError: "Kullanabilmeyi dilediği gibi zarar verebilmek sanmak.",
      check:
        "Seçimin kaynak kullanımıyla korumayı birlikte düşünmeye izin veriyor mu?",
    },
    {
      passage:
        "Bir öğrenci dua ettiğini, ayrıca çalışma planını uygulayıp yanlışlarını incelediğini söylüyor.",
      prompt: "Bu durum için en uygun yorum nedir?",
      options: [
        "Dua ile hazırlık ve sorumluluk birlikte bulunabilir.",
        "Dua edilince plan uygulanmamış sayılır.",
        "Dua kesin tam net garantisidir.",
        "Çalışmak dua etmeyi mantıken imkânsız kılar.",
        "Yanlış incelemek hiç öğrenme gerektirmez.",
      ],
      reasons: [
        "Parça hem yönelişi hem somut çalışmayı içerir.",
        "Bir eylem diğerini silmez.",
        "Sonuç garantisi verilmiyor.",
        "Böyle bir çelişki yoktur.",
        "Metin öğrenme ihtiyacını dışlamaz.",
      ],
      knowledge: [
        "Dua ve insanın eylem sorumluluğu farklı ama birlikte bulunabilen yönlerdir.",
      ],
      strategy: "Dileği ve yapılan işi ayrı doğrula; sonuç garantisi ekleme.",
      steps: [
        "Öğrenci dua ettiğini açıkça söyler.",
        "Aynı öğrenci plan uygulayıp yanlışları incelemektedir.",
        "İki veri birlikte bulunduğu için dışlama değil beraberlik çıkar.",
      ],
      commonError: "Bir dinî yönelişi hazırlığın yapılmadığına kanıt saymak.",
      check: "Yorumun hem dua hem çalışma fiilini koruyor mu?",
    },
    {
      passage:
        "Bir parça namaz ve oruç gibi belirli ibadetleri sayarken doğru niyetli, yararlı davranışların da geniş kulluk anlamıyla ilişkilendirilebileceğini belirtir.",
      prompt: "Hangi yorum parçanın kapsamına uygundur?",
      options: [
        "İbadet kavramı bağlama göre dar ve geniş kullanımlarla ele alınabilir.",
        "İbadet yalnız aç kalmaktır.",
        "Her görünen hareketin niyeti kesin bilinir.",
        "Yararlı iş kesinlikle kavram dışında tutulmuştur.",
        "İki farklı kullanım zorunlu çelişkidir.",
      ],
      reasons: [
        "Belirli örnekler ile geniş anlam birlikte verilmiştir.",
        "Namaz ve geniş anlam dışlanmaktadır.",
        "Niyet hakkında böyle bir bilgi yoktur.",
        "Parça açıkça geniş anlamla ilişkilendirir.",
        "Bağlama göre kapsam farkı çelişki değildir.",
      ],
      knowledge: [
        "Bir terimin belirli uygulama ve geniş anlam çerçeveleri bağlamdan ayırt edilir.",
      ],
      strategy:
        "Parçadaki dar listeyi sonraki genişletici cümleyle birlikte oku.",
      steps: [
        "İlk kısım belirli ibadet örneklerini sayar.",
        "İkinci kısım niyetli yararlı davranışlarla geniş bağı belirtir.",
        "İkisini kapsayan yorum doğru; yalnız ilk listeye indirgeme eksiktir.",
      ],
      commonError: "İlk örnek listesini bütün kavramın eksiksiz sınırı sanmak.",
      check: "İkinci cümle seçtiğin yorumda karşılık buluyor mu?",
    },
    {
      passage:
        "Bir kişi yaptığı hatadan pişmanlık duyduğunu, yanlışından dönmeye çalıştığını ve Allah’tan bağışlanma dilediğini söyler.",
      prompt:
        "Dönme ve af dileme vurguları sırasıyla hangi kavramlarla ilişkilidir?",
      options: [
        "Tövbe ve istiğfar",
        "İnfak ve kıtal",
        "Yalnız biçim verme ve rızık",
        "Takrir ve komutanlık",
        "Hiçbir değişim ve hiçbir istek",
      ],
      reasons: [
        "Yanlıştan dönme tövbe, bağışlanma dileme istiğfardır.",
        "Kaynak paylaşımı veya savaş yoktur.",
        "İlahî isim anlamları sorulmaz.",
        "Onay veya askerî görev bulunmaz.",
        "Metin dönme çabası ve açık dilek içerir.",
      ],
      knowledge: [
        "Tövbe davranıştan dönüşü, istiğfar bağışlanma talebini öne çıkarır.",
      ],
      strategy: "İki yönelişi aynı fiile indirgemeden eşleştir.",
      steps: [
        "Pişmanlık ve yanlıştan dönme ilk vurgudur.",
        "Bağışlanma dileme ikinci vurgudur.",
        "Sırasıyla tövbe→istiğfar iki veriyi de karşılar.",
      ],
      commonError:
        "Yakın kavramları yalnız ses benzerliğiyle başka alana taşımak.",
      check: "İlk kavram dönme, ikincisi dileme fiiline uyuyor mu?",
    },
    {
      passage:
        "Bir öğrenci metnin harflerini seslendiriyor; ardından kavramların anlamını araştırıp mesajını kendi cümlesiyle açıklıyor.",
      prompt: "Bu parçadan hangi ayrım öğrenilebilir?",
      options: [
        "Seslendirme ile anlamı kavrama aynı işlem değildir.",
        "Metni seslendiren herkes bütün anlamı kesin bilir.",
        "Anlam araştırmak okumayı imkânsız kılar.",
        "Her kavram bütün bağlamlarda aynı tek anlama gelir.",
        "Kendi cümlesiyle açıklama hiç düşünme içermez.",
      ],
      reasons: [
        "İki faaliyet ayrı eylemlerle verilir.",
        "İkinci araştırma bu garantiyi vermez.",
        "Öğrenci iki işlemi de yapmıştır.",
        "Metin böyle evrensel kural vermez.",
        "Mesajı açıklama anlam incelemesiyle ilişkilidir.",
      ],
      knowledge: [
        "Kıraat ve tilavet, ders bağlamında okuma ile anlama-uygulama boyutlarını tartışmaya açar.",
      ],
      strategy: "İki eylemin girdisini ve hedefini ayrı göster.",
      steps: [
        "İlk faaliyet harfleri seslendirmedir.",
        "Sonraki faaliyet anlam araştırıp açıklamadır.",
        "Ayrı işlem olmaları, ilkinden ikincinin tümden garanti edilemeyeceğini gösterir.",
      ],
      commonError: "Dıştan akıcı okumayı eksiksiz anlama kanıtı saymak.",
      check:
        "Cevabın seslendirme verisinden fazladan anlama garantisi çıkarıyor mu?",
    },
    {
      passage:
        "Rûm 21–22’nin öğretim özetinde eşler arasında sevgi ve merhamet, insanların dilleri ve renklerinin farklılığı anılır.",
      prompt: "Bu özetten hangisi çıkarılamaz?",
      options: [
        "Bir dil grubunun doğuştan bütün diğerlerinden üstün olduğu",
        "Sevgi temasına yer verildiği",
        "Merhametin ilişki bağlamında ele alındığı",
        "Dil farklılığının bulunduğu",
        "Renk farklılıklarının anıldığı",
      ],
      reasons: [
        "Çeşitlilik bilgisi üstünlük sırası vermez.",
        "Özette sevgi açıkça anılır.",
        "Eşler arası merhamet verilir.",
        "Dillerin farklılığı açık veridir.",
        "Renkler özette yer alır.",
      ],
      knowledge: [
        "Metindeki çeşitlilik ifadesi doğuştan üstünlük iddiası kurmaz.",
      ],
      strategy: "Olumsuz kökte her seçeneğin ayrı açık kanıtını ara.",
      steps: [
        "Dört seçenek özetteki sevgi, merhamet, dil ve renk verileridir.",
        "Üstünlük ise bu listede bulunmayan ek bir hiyerarşi iddiasıdır.",
        "Bu yüzden çıkarılamayan sonuç üstünlük iddiasıdır; diğerleri doğrudan verilidir.",
      ],
      commonError: "“Farklılık” ifadesini “üstünlük” olarak çevirmek.",
      check: "Olumsuz kökü koruyarak kanıtsız ek iddiayı mı seçtin?",
    },
    {
      passage:
        "Rûm 18–27 için hazırlanan kısa parça, yeryüzünün canlanması ve yeniden diriliş temasını verir; hesap sürecinin ayrıntılarını saymaz.",
      prompt: "Bu parçaya dayalı en güvenilir sonuç nedir?",
      options: [
        "Diriliş teması desteklenir, hesap ayrıntılarının tamamı burada verilmiş sayılamaz.",
        "Dirilişten hiç söz edilmemiştir.",
        "Bütün hesap ayrıntıları harfiyen bu kısa parçada vardır.",
        "Bütün gelecek tarihler hesaplanabilir.",
        "Canlanma bir laboratuvar protokolüdür.",
      ],
      reasons: [
        "Açık tema ile eksik ayrıntı ayrılmıştır.",
        "Tema açıkça verilmiştir.",
        "Ayrıntıların sayılmadığı belirtilir.",
        "Tarih verisi yoktur.",
        "Özet deney yönergesi değildir.",
      ],
      knowledge: [
        "Bir temanın bulunması ilgili bütün ayrıntıların aynı pasajda bulunmasını gerektirmez.",
      ],
      strategy:
        "Verilen ana mesajı ve verilmediği belirtilen ayrıntıyı ayrı tut.",
      steps: [
        "Açık veri canlanma ve diriliş temasıdır.",
        "Hesap sürecinin ayrıntıları ayrıca sayılmamıştır.",
        "Doğru yorum temayı korur, eksik kısmı başka bilgiyle doldurmaz.",
      ],
      commonError: "Genel din bilgisini parçanın bütün açık içeriği sanmak.",
      check:
        "Cevabın “tema var” ile “bütün ayrıntılar var” arasını ayırıyor mu?",
    },
    {
      passage:
        "Bir öğrenci “Rahman merhameti, Rezzak rızık vermeyi ifade eder; aynı olayın farklı yönleri bu isimlerle ilişkilendirilebilir.” diyor.",
      prompt: "Bu açıklama hangi ayrımı korur?",
      options: [
        "İlişkili olmakla eş anlamlı olmak farklıdır.",
        "İki isim tam aynı fiili tanımlar.",
        "Bir olay yalnız tek kavramla ele alınabilir.",
        "Merhamet sözcüğü rızkın hiç bulunmadığını kanıtlar.",
        "Bütün isimler yalnız insan meslekleridir.",
      ],
      reasons: [
        "Aynı olayda ilişki bulunması tanımları özdeş yapmaz.",
        "Açıklama iki farklı anlamı verir.",
        "Metin farklı yönlere izin verir.",
        "Bir anlam diğerinin yokluğunu kanıtlamaz.",
        "İlahî isim anlamları insan mesleği diye sunulmamıştır.",
      ],
      knowledge: ["Kavramsal ilişki, tanım özdeşliğinden daha geniştir."],
      strategy: "Olayın ortaklığını isimlerin anlam farkından ayır.",
      steps: [
        "Öğrenci iki isme farklı anlam verir.",
        "Bir olayın iki yönü bu anlamlarla ayrı ilişkilendirilebilir.",
        "Dolayısıyla ortak örnek, isimleri eş anlamlı hâle getirmez.",
      ],
      commonError:
        "Ortak örnek bulununca iki kavramın aynı tanım olduğunu sanmak.",
      check:
        "Cevabın hem anlam farkını hem ortak ilişki ihtimalini koruyor mu?",
    },
    {
      passage:
        "Bir modelde “Allah diridir” kartı Hayy ile eşleştirilmişken öğrenci karta “Canlıya hayat verir” cümlesini koyuyor. Modelin isim bağlantısını da güncellemesi gerekiyor.",
      prompt: "En doğrudan yeni bağlantı hangisidir?",
      options: [
        "Muhyî",
        "Hayy değişmeden zorunlu tek doğru kalır.",
        "Yalnız Ehad",
        "Yalnız Rezzak",
        "Hiçbir anlam değişmemiştir.",
      ],
      reasons: [
        "Yeni yüklem hayat verme olduğu için belirleyici isim Muhyî’dir.",
        "Yüklem diri olmadan hayat vermeye değişmiştir.",
        "Birlik burada yeni fiil değildir.",
        "Rızık verme eklenmemiştir.",
        "Olma ile verme yönü değişmiştir.",
      ],
      knowledge: [
        "Koşul değişince önceki eşleştirme de yeni fiile göre yeniden değerlendirilir.",
      ],
      strategy: "Karttaki tek değişen yüklemi tespit et.",
      steps: [
        "Eski kart öznenin diri oluşunu anlatıyordu.",
        "Yeni kart başkasına hayat verme fiilini anlatır.",
        "Bu fiil değişimi bağlantıyı Hayy’den Muhyî’ye yöneltir.",
      ],
      commonError:
        "İlk cevabı öğrendikten sonra değişen öncülü görmezden gelmek.",
      check:
        "Yeni bağlantıyı eski alışkanlıkla mı, yeni cümlenin fiiliyle mi seçtin?",
    },
  ],
  [
    {
      passage:
        "Aynı Kur’an ayetine bağlı iki bilgin, bir ifadenin anlamını farklı açıklar. Metin, kullandıkları temel kaynağın değiştiğini söylemez.",
      prompt: "Bu durum en doğrudan neyi gösterir?",
      options: [
        "Din anlayışında yorum farklılığını",
        "Zorunlu olarak iki ayrı dinin varlığını",
        "İki bilginin hiç metin okumadığını",
        "Bütün temel inançların reddedildiğini",
        "Her kelimenin yalnız tek mümkün anlamı olduğunu",
      ],
      reasons: [
        "Ortak kaynağın farklı açıklanması yorum farkıdır.",
        "Kaynak ortaklığı varken bu sonuç zorunlu değildir.",
        "Ayet yorumladıkları belirtilmiştir.",
        "Böyle bir ret verilmemiştir.",
        "Farklı açıklama bu evrensel iddiayı göstermez.",
      ],
      knowledge: [
        "Din ile din anlayışı, kaynakla o kaynağın insani yorumunu ayrı ele alır.",
      ],
      strategy: "Değişen unsurun kaynak mı açıklama mı olduğunu sor.",
      steps: [
        "İki bilginin dayandığı ayet aynıdır.",
        "Farklı olan o ifadenin açıklanışıdır.",
        "Bu nedenle yorum farkı çıkar; ayrı din sonucu için ek veri gerekir.",
      ],
      commonError: "Her görüş farkını yeni dinin doğuşu saymak.",
      check: "Cevabında ortak kaynak koşulu korunuyor mu?",
    },
    {
      passage:
        "Bir toplumun geçmişten gelen örf ve yerel alışkanlıkları, yeni dinî uygulama sorularını yorumlayışını etkiliyor.",
      prompt: "Baskın neden hangisidir?",
      options: [
        "Kültürel neden",
        "Coğrafi neden",
        "Yalnız siyasi liderlik",
        "Metindeki kelimenin çok anlamlılığı",
        "Yalnız bireyin görme kusuru",
      ],
      reasons: [
        "Belirleyici veri örf ve alışkanlıktır.",
        "İklim veya yer şekli etkisi verilmemiştir.",
        "Otorite tartışması yoktur.",
        "Dilsel yorum verisi bulunmaz.",
        "Fizyolojik özellik belirtilmez.",
      ],
      knowledge: [
        "Kültürel neden gelenek, örf ve anlam dünyasının etkisini öne çıkarır.",
      ],
      strategy: "Nedeni yer adından değil etki eden unsurdan seç.",
      steps: [
        "Etkileyen unsur geçmişten gelen örf ve alışkanlıktır.",
        "Bu, toplumun kültür birikimiyle ilgilidir.",
        "İklim veya yönetim sorunu eklenmediğinden kültürel neden seçilir.",
      ],
      commonError:
        "Toplum kelimesi geçen her soruyu sosyal neden sayıp somut örf kanıtını kaçırmak.",
      check:
        "Gerekçen yerel alışkanlıkların yorum üzerindeki etkisini açıklıyor mu?",
    },
    {
      passage:
        "İklim ve ulaşım koşullarının farklılığı, iki bölgede dinî uygulamalarla ilgili farklı pratik ihtiyaçlar doğuruyor.",
      prompt: "Bu örnekte özellikle hangi neden vardır?",
      options: [
        "Coğrafi neden",
        "Yalnız imamet tartışması",
        "Kelimenin müteşabih oluşu",
        "Yalnız kişi adlarının benzerliği",
        "Hiçbir çevre etkisi bulunmaması",
      ],
      reasons: [
        "Belirleyici koşullar iklim ve çevredir.",
        "Liderlik sorunu yoktur.",
        "Metin anlamı tartışılmıyor.",
        "Ad benzerliği verilmez.",
        "Örnek açıkça çevre etkisini anlatır.",
      ],
      knowledge: [
        "Coğrafi neden çevrenin yaşam ve uygulama ihtiyacına etkisiyle tanınır.",
      ],
      strategy: "İhtiyacı doğuran fiziksel koşulu işaretle.",
      steps: [
        "İklim ve ulaşım farklılığı başlangıç verisidir.",
        "Bu koşullar uygulama ihtiyacını değiştiriyor.",
        "Neden–sonuç bağı coğrafidir; metin veya liderlik nedeni değil.",
      ],
      commonError:
        "Bölgeler farklı olduğu için mutlaka örf tartışıldığını varsaymak.",
      check: "Seçtiğin neden iklim→ihtiyaç zincirini karşılıyor mu?",
    },
    {
      passage:
        "Bir ayetteki kelimenin birden fazla anlam taşıması, iki yorumcunun farklı anlamı tercih etmesine yol açıyor.",
      prompt: "Farklılık hangi nedenle ilişkilidir?",
      options: [
        "Dinî metinlerin yoruma elverişli yönüyle",
        "Yalnız ekonomik krizle",
        "Yalnız ordu komutanlığıyla",
        "İklim değişikliğiyle",
        "Kaynağın hiç kullanılmamasıyla",
      ],
      reasons: [
        "Çok anlamlı ifade doğrudan yorum ihtiyacı doğurmuştur.",
        "Kriz verisi yoktur.",
        "Askerî görev anlatılmaz.",
        "İklim yoktur.",
        "Yorumcular ayeti kullanmaktadır.",
      ],
      knowledge: [
        "Müteşabih ifadelerin açıklanması ve tevil, metnin anlam ihtiyacıyla ilişkilidir.",
      ],
      strategy: "Yorum ayrılığını doğuran sözün özelliğini bul.",
      steps: [
        "Ayrım aynı kelimenin farklı anlamları üzerindedir.",
        "Yorumcular bu mümkün anlamlardan birini tercih eder.",
        "Bu yüzden baskın neden dinî metnin anlam yapısıdır.",
      ],
      commonError:
        "Her ayrılığı siyasetle açıklayıp verilen kelime kanıtını görmezden gelmek.",
      check: "Sonuca giden kanıtın “birden fazla anlam” ifadesi mi?",
    },
    {
      passage:
        "Hz. Peygamber sonrasında topluluğa kimin liderlik etmesi gerektiği konusunda görüş ayrılıkları yaşandığı belirtiliyor.",
      prompt: "Bu pasajda baskın etken hangisidir?",
      options: [
        "Siyasi neden",
        "Yalnız kıyafet iklimi",
        "Bütün görüşlerin aynı olması",
        "Salt kitap sayısının artması",
        "Yalnız bireysel beslenme tercihi",
      ],
      reasons: [
        "Yönetim ve otorite tartışması siyasidir.",
        "Kıyafet veya iklim verisi yoktur.",
        "Görüş ayrılığı açıkça verilmiştir.",
        "Kitap sayısı anlatılmamıştır.",
        "Beslenme verilmemiştir.",
      ],
      knowledge: [
        "İmamet ve liderlik tartışmaları siyasi-itikadi tarih bağlamında ele alınabilir.",
      ],
      strategy: "Tartışmanın nesnesini tek soru olarak yeniden yaz.",
      steps: [
        "Soru topluluğa kimin liderlik edeceğidir.",
        "Bu nesne yönetim ve yetki alanına aittir.",
        "Dolayısıyla siyasi neden desteklenir; iklim veya sayı eklenmez.",
      ],
      commonError: "Dinî toplulukta geçtiği için yönetim sorununu görmemek.",
      check: "“Kim yönetecek?” sorusu seçtiğin kategoriye uyuyor mu?",
    },
    {
      passage:
        "İki kişinin aynı metni algılama biçimleri, ilgileri ve ihtiyaçları farklıdır. Bu fark açıklamalarına da yansır.",
      prompt: "Öne çıkan neden hangisidir?",
      options: [
        "İnsanın yapısından kaynaklanan neden",
        "Yalnız deniz yüksekliği",
        "Yalnız bir kelimenin yazım hatası",
        "İki kişinin aynı bütün ilgiye sahip olması",
        "Zorunlu olarak kötü niyet",
      ],
      reasons: [
        "Algı, ilgi ve ihtiyaç farkı bireysel özelliklerdir.",
        "Coğrafi yükseklik yoktur.",
        "Yazım kusuru verilmemiştir.",
        "Metin ilgilerin farklılığını söyler.",
        "Algı farkı niyet kusurunu kanıtlamaz.",
      ],
      knowledge: [
        "İnsani farklılıklar yorumun odağını etkileyebilir; bu durum kusur veya kötü niyet demek değildir.",
      ],
      strategy: "Özellikleri insanın algı ve ilgisine bağla.",
      steps: [
        "Metin algı, ilgi ve ihtiyaçları sayar.",
        "Bunlar çevre veya yönetim değil birey özellikleridir.",
        "Bu nedenle insani yapı nedeni çıkar; kötü niyet sonucu çıkmaz.",
      ],
      commonError: "Farklı anlama biçimini zorunlu ahlaki kusur saymak.",
      check: "Cevabın neden sınıfı mı veriyor, kişiyi mi yargılıyor?",
    },
    {
      passage:
        "Bir çalışma Allah’ın sıfatları ile iman esaslarını; başka çalışma satış sözleşmeleri ve miras hükümlerini inceliyor.",
      prompt: "Alanlar sırasıyla hangileridir?",
      options: [
        "İtikadi ve fıkhi",
        "Fıkhi ve itikadi",
        "Yalnız coğrafya ve astronomi",
        "İkisi de yalnız askerî tarih",
        "İkisi de aynı tek uygulama",
      ],
      reasons: [
        "İlk çalışma inanç, ikincisi amel-hukuk konusudur.",
        "Sıra ters kurulmuştur.",
        "Konular bunlar değildir.",
        "Askerî olay verilmez.",
        "İnanç ve hukuk alanları ayrıdır.",
      ],
      knowledge: [
        "İtikadi yorum inanç esaslarına, fıkhi yorum uygulama ve günlük hukuk hükümlerine odaklanır.",
      ],
      strategy: "Kişi adı aramak yerine konuları sınıflandır.",
      steps: [
        "Allah’ın sıfatları inanç alanına girer.",
        "Satış ve miras fiillerin hukuki değerlendirmesidir.",
        "Sıra bu nedenle itikadi→fıkhi olarak korunur.",
      ],
      commonError: "Her dinî konuyu aynı dar alan saymak.",
      check: "Her alan için metinden farklı bir konu gösterebiliyor musun?",
    },
    {
      passage:
        "Bir kişi inanç meselelerinde Matüridi açıklamalarından, ibadet uygulamalarında Hanefi usulünden yararlandığını söyler.",
      prompt: "Bu ifade zorunlu çelişki midir?",
      options: [
        "Hayır; iki etiket farklı alanları gösterir.",
        "Evet; bir kişinin yalnız tek alanda bilgisi olabilir.",
        "Evet; iki ad aynı kurucuyu gösterir.",
        "Hayır; çünkü iki terim tam eş anlamlıdır.",
        "Hiçbiri dinî yorumla ilişkili değildir.",
      ],
      reasons: [
        "Matüridilik itikadi, Hanefilik fıkhi düzlemdedir.",
        "Tek alan zorunluluğu yoktur.",
        "Kurucular aynı kişi değildir ve bu varsayım da yanlıştır.",
        "Çelişki olmaması eş anlamlılıktan gelmez.",
        "İkisi de yorum ekolleridir.",
      ],
      knowledge: [
        "Birlikte bulunma, etiketlerin aynı anlamda olduğu sonucunu gerektirmez.",
      ],
      strategy: "İki etiketi önce alan sütunlarına yerleştir.",
      steps: [
        "İnanç açıklaması Matüridi geleneğine bağlanıyor.",
        "İbadet uygulaması Hanefi fıkhına bağlanıyor.",
        "Farklı alanlar olduklarından birlikte bulunmaları tek başına çelişki değildir.",
      ],
      commonError: "İki ismin birlikte bulunmasını hemen tutarsızlık saymak.",
      check:
        "Çelişki iddiası kurmadan önce aynı konuda karşıt hüküm var mı baktın mı?",
    },
    {
      passage:
        "Ebû Mansur Matüridi’ye dayanan bir ekol, akli ve naklî delilleri birlikte kullanarak inanç esaslarını açıklar.",
      prompt: "Bu ekolün doğru adı ve alanı hangisidir?",
      options: [
        "Matüridilik–itikadi",
        "Hanbelilik–yalnız ticaret",
        "Malikilik–astronomi",
        "Hanefilik–yalnız coğrafya",
        "Caferilik–yalnız dil bilgisi",
      ],
      reasons: [
        "Kişi ve inanç konusu bu eşlemeyi verir.",
        "Ne kurucu ne alan doğru eşleşir.",
        "Kurucu ve alan yanlış verilmiştir.",
        "Matüridi ile Ebû Hanife aynı kişi değildir.",
        "Bu eşlemenin kanıtı yoktur.",
      ],
      knowledge: [
        "Matüridilik nakil ile aklı birlikte kullanan itikadi ekol olarak öğretilir.",
      ],
      strategy: "Öncü kişi ve konu alanını iki ayrı eşleşmeyle doğrula.",
      steps: [
        "Kişi Ebû Mansur Matüridi olarak açıkça verilir.",
        "Tartışılan konu inanç esaslarıdır.",
        "Ad Matüridilik, alan itikadi yorumdur; diğer çiftler iki ölçüte de uymaz.",
      ],
      commonError:
        "Ebû Hanife’den etkilenmeyi Matüridi’nin aynı kişi olması sanmak.",
      check: "Hem kurucu hem alan aynı seçenekte doğru mu?",
    },
    {
      passage:
        "Bir karşılaştırma, Eşariliğin hadis ve sünneti merkeze aldığını, itikat alanında akıl yürütmeden de yararlandığını belirtir.",
      prompt: "Bu açıklamadan hangisi çıkar?",
      options: [
        "Metin vurgusu akıl kullanımını tümden dışlamaz.",
        "Hiç akıl yürütülmez.",
        "Vahiy bütünüyle reddedilir.",
        "Bütün ekoller her konuda aynı yöntemi kullanır.",
        "Bu bir fıkhi alışveriş listesi sunar.",
      ],
      reasons: [
        "Her iki yöntem öğesi parçada birlikte verilir.",
        "Parça akıl yürütmeden yararlanmayı açıkça söyler.",
        "Hadis ve sünnet vurgusu bu sonucu vermez.",
        "Tek ekol açıklaması evrensel eşitlik vermez.",
        "İtikat ve yöntem konusu vardır.",
      ],
      knowledge: [
        "Eşarilik ve Matüridilik arasındaki ders farkı bütünüyle akıl/metin yokluğu şeklinde kurulmaz.",
      ],
      strategy: "Birlikte verilen iki aracı birbirini yok saymadan oku.",
      steps: [
        "Metin hadis-sünnet merkezini belirtir.",
        "Aynı cümle akıl yürütmeyi de kabul eder.",
        "O hâlde merkez vurgusu diğer aracın tümden yokluğu değildir.",
      ],
      commonError: "Bir şeyi öncelemeyi diğer bütün araçları reddetmek saymak.",
      check: "Seçtiğin yargı parçada açıkça verilen ikinci aracı koruyor mu?",
    },
    {
      passage:
        "Bir ders tablosunda Şia başlığı altında İmamiye ve Zeydiye yer alır. İmamiye on iki imam anlayışıyla, Zeydiye ise imam sayısını on ikiyle sınırlamamasıyla tanıtılır.",
      prompt: "Hangi yorum doğrudur?",
      options: [
        "Ortak üst başlık altında farklı alt görüşler bulunabilir.",
        "Bütün Şia kolları mutlaka on iki imamla sınırlıdır.",
        "Zeydiye bu tabloda fıkhi Hanefilikle aynıdır.",
        "İki alt başlığın ortak hiçbir üst ilişkisi yoktur.",
        "On iki sayısı bütün dinlerin ortak kuralıdır.",
      ],
      reasons: [
        "Tablo hem ortaklığı hem sayı görüşündeki farkı verir.",
        "Zeydiye verisi bu genellemeyi engeller.",
        "Alan ve ad eşleşmesi yoktur.",
        "İkisi Şia altında verilmiştir.",
        "Tablo böyle evrensel bilgi sunmaz.",
      ],
      knowledge: [
        "Üst kategoriye ait olmak alt kategorilerin bütün ayrıntılarının aynı olmasını gerektirmez.",
      ],
      strategy:
        "Ağaçta üst düğümü ve iki alt düğümün ayırıcı bilgisini birlikte kullan.",
      steps: [
        "İmamiye ve Zeydiye aynı üst başlığa bağlanır.",
        "İmam sayısı konusunda farklı açıklanırlar.",
        "Bu yapı ortaklık içinde çeşitliliktir; on iki genellemesi yanlıştır.",
      ],
      commonError: "Bir alt ekolün bilgisini bütün üst kategoriye taşımak.",
      check: "Zeydiye için verilen sınır farkı seçtiğin yorumda korunuyor mu?",
    },
    {
      passage:
        "Bir kaynak Zeydiye’de imamların hatasız ve günahsız kabul edilmediğini, İmamiye’de ise imamların masumiyetinin benimsendiğini belirtir.",
      prompt: "Bu veri neyi ayırt eder?",
      options: [
        "İki alt ekolün imamet görüşündeki farkını",
        "Bütün Şiilerin aynı ayrıntıyı savunduğunu",
        "İki kelimenin eş anlamlı olduğunu",
        "İmamet konusunun hiç tartışılmadığını",
        "Bütün fıkhi hükümlerin aynı olduğunu",
      ],
      reasons: [
        "Masumiyet konusunda ayrı tutumlar açıkça verilir.",
        "Metin tam tersine farklılık bildirir.",
        "Farklı ekol adları eş anlamlı yapılmaz.",
        "Konu doğrudan imamettir.",
        "Bu pasaj fıkhi ayrıntıların tamamını incelemez.",
      ],
      knowledge: [
        "İmametle ilgili alt ekol farkları, geniş Şia başlığını tek kalıba indirgememeyi gerektirir.",
      ],
      strategy: "Karşılaştırılan özelliği isimlerden bağımsız bir sütuna yaz.",
      steps: [
        "Özellik imamların masum kabul edilip edilmemesidir.",
        "İmamiye ve Zeydiye için farklı değerler verilir.",
        "Sonuç iki alt ekolün bu konudaki ayrımıdır; başka bütün hükümler hakkında değildir.",
      ],
      commonError: "Bir farkı bütün alanlarda tamamen zıtlık olarak büyütmek.",
      check: "Cevabın yalnız verilen masumiyet özelliğine mi dayanıyor?",
    },
    {
      passage:
        "İmam Malik’in yaklaşımını anlatan parça, Medine halkının sünnetle şekillenmiş uygulamasına verilen önemi vurguluyor.",
      prompt: "Bu yöntem hangi fıkhi ekolle ilişkilidir?",
      options: ["Malikilik", "Eşarilik", "Matüridilik", "Zeydiye", "İmamiye"],
      reasons: [
        "İmam Malik ve Medine uygulaması eşleşmesi belirleyicidir.",
        "Bu itikadi ekol için verilen yöntem değildir.",
        "İnanç ekolüyle fıkhi yöntem karıştırılmıştır.",
        "İmamet alt ekolü bu kişiyle eşleşmez.",
        "Kurucu ve yöntem bu adla verilmemiştir.",
      ],
      knowledge: [
        "Malikilikte Medine uygulamasının rolü, şehir adının tek başına bulunmasından daha özel kanıttır.",
      ],
      strategy: "Kişi adı ile yöntem ayrıntısını beraber doğrula.",
      steps: [
        "Öncü İmam Malik olarak verilir.",
        "Ayırt edici yöntem Medine uygulamasına önemdir.",
        "İki veri Malikiliği destekler; yalnız şehir çağrışımına gerek yoktur.",
      ],
      commonError:
        "Medine’nin her geçtiği metni yöntem incelenmeden aynı ekol saymak.",
      check: "Cevabını hem kişi hem uygulama ölçütüyle gerekçelendirdin mi?",
    },
    {
      passage:
        "Bir eşleştirme kartında Ebû Hanife ve Ahmed bin Hanbel adları yer alır.",
      prompt: "Doğru fıkhi ekol çifti sırasıyla hangisidir?",
      options: [
        "Hanefilik–Hanbelilik",
        "Hanbelilik–Hanefilik",
        "Malikilik–Şafiilik",
        "Matüridilik–Eşarilik",
        "İmamiye–Zeydiye",
      ],
      reasons: [
        "Ebû Hanife Hanefilikle, Ahmed bin Hanbel Hanbelilikle ilişkilidir.",
        "İki kişi ters eşleştirilmiştir.",
        "Bu çift Malik ve Şafii adlarını gerektirir.",
        "Bunlar karttaki iki fıkhi kurucu eşlemesi değildir.",
        "Şia alt ekolleri bu adlarla kurulmamıştır.",
      ],
      knowledge: [
        "Benzer sesli Hanefi ve Hanbeli terimleri tam kurucu adıyla ayrılır.",
      ],
      strategy: "İlk eşlemeyi ses benzerliğiyle değil tam adla yap.",
      steps: [
        "Ebû Hanife’nin adı Hanefilikle eşleşir.",
        "Ahmed bin Hanbel’in adı Hanbelilikle eşleşir.",
        "Doğru çift bu iki ilişkiyi aynı sırada korur.",
      ],
      commonError: "“Han” sesini yeterli kanıt sayarak çiftleri ters çevirmek.",
      check: "İkinci adındaki Hanbel ile seçtiğin ikinci ekolün adı uyumlu mu?",
    },
    {
      passage:
        "Muhammed bin İdris Şafii’nin fıkıh usulüne katkısı ve er-Risale adlı eseri anlatılıyor.",
      prompt: "Bu kişinin görüşlerine dayanan ekol hangisidir?",
      options: [
        "Şafiilik",
        "Hanbelilik",
        "Malikilik",
        "Eşarilik",
        "Matüridilik",
      ],
      reasons: [
        "Açık kişi–ekol bağı bu adı verir.",
        "Ahmed bin Hanbel başka kişidir.",
        "Malik bin Enes bu pasajdaki kişi değildir.",
        "Ebülhasan Eşari’ye ait itikadi ekoldür.",
        "Ebû Mansur Matüridi’yle ilişkilidir.",
      ],
      knowledge: [
        "Fıkıh usulü, hüküm çıkarma yöntemlerini sistemli biçimde ele alır.",
      ],
      strategy: "Eser adını kişiyle, kişiyi ekolle bağla.",
      steps: [
        "Metin Muhammed bin İdris Şafii’yi açıkça adlandırır.",
        "er-Risale de bu kişiyle verilen destekleyici eserdir.",
        "Bu nedenle Şafiilik seçilir; başka kurucunun okulunu eklemek yanlıştır.",
      ],
      commonError: "Aynı dönemdeki bütün âlimleri tek kurucu sanmak.",
      check: "Cevabın açıkça verilen Şafii adıyla örtüşüyor mu?",
    },
    {
      passage:
        "Cafer Sadık’ın görüşlerine dayanan bir yorum, ibadet ve muamelat hükümleri için yöntem sunmaktadır.",
      prompt: "Bu yorumun adı ve bu pasajdaki alanı hangisidir?",
      options: [
        "Caferilik–fıkhi",
        "Caferilik–yalnız astronomik",
        "Eşarilik–fıkhi",
        "Zeydiye–yalnız biyolojik",
        "Hanefilik–coğrafi",
      ],
      reasons: [
        "Kurucu kişi ve uygulama hükümleri bu çifti destekler.",
        "İbadet ve muamelat astronomi değildir.",
        "Kişi yanlış, alan da Eşariliğin sınıflaması değildir.",
        "Ne kişi ne alan doğrudur.",
        "Kurucu ve sınıflama uymaz.",
      ],
      knowledge: [
        "Caferilik fıkhi ekol; İmamiye ise ilgili itikadi-siyasi çerçeve olarak ayrı düzlemlerde ele alınır.",
      ],
      strategy:
        "İmamlara ilişkin genel çağrışım yerine verilen konu alanını kullan.",
      steps: [
        "Öncü Cafer Sadık’tır.",
        "İncelenenler ibadet ve muamelat hükümleridir.",
        "Bu fiil-hüküm alanı Caferiliğin fıkhi yorum olarak seçilmesini sağlar.",
      ],
      commonError:
        "İmam kelimesiyle ilişkili her cümleyi yalnız itikadi saymak.",
      check: "Alan seçimin ibadet ve işlem hükümleri verisini açıklıyor mu?",
    },
    {
      passage:
        "Nisâ 59’un öğretim açıklaması anlaşmazlıkta Kur’an ve sünnete başvurmayı, yetki sahibine itaati ise meşru sınırda ele alır.",
      prompt: "Hangi sonuç açıklamaya uygundur?",
      options: [
        "Yetki, zararlı veya gayrimeşru her emri zorunlu kılmaz.",
        "Yetkili ne söylerse her koşulda yapılmalıdır.",
        "Temel kaynaklara hiç başvurulmaz.",
        "Her yeni durumun bütün ayrıntısı kelimesi kelimesine yazılıdır.",
        "Anlaşmazlık olması bütün görüşlerin aynı olduğunu gösterir.",
      ],
      reasons: [
        "Meşru sınır kaydı sınırsız itaati engeller.",
        "Bu seçenek açık sınırı kaldırır.",
        "Başvuru açıkça belirtilmiştir.",
        "İlkeye başvurmak bütün ayrıntının aynen yazılması değildir.",
        "Görüş birliği bilgisi verilmez.",
      ],
      knowledge: [
        "İtaatin sınırı ve anlaşmazlıkta başvurulan ilke iki ayrı ama bağlantılı bilgidir.",
      ],
      strategy: "Sınır bildiren sözü “her koşulda” iddiasıyla karşılaştır.",
      steps: [
        "Açıklamada itaat meşru sınırla kayıtlıdır.",
        "Sınırsız emir zorunluluğu bu kaydı yok sayar.",
        "Dolayısıyla yetki sahibinin her emrinin otomatik meşru olmadığı sonucu çıkar.",
      ],
      commonError: "Yetki varlığını sınırsız ve sorgusuz hüküm yerine koymak.",
      check: "Seçimin “meşru” kaydını gerçekten koruyor mu?",
    },
    {
      passage:
        "Bir araştırma farklı yorumların oluşumunu anlatırken yalnız “o dönemde bazı kitaplardan az sayıda nüsha vardı” diyor; bu niceliğin görüş ayrılığına nasıl yol açtığını açıklamıyor.",
      prompt: "Açıklamanın temel eksiği nedir?",
      options: [
        "Nicelik ile yorum ayrılığı arasında mekanizma kurulmaması",
        "Her tarihî olgunun tamamen önemsiz olması",
        "Yorumların mutlaka aynı olması",
        "Coğrafyanın hiçbir zaman etkili olmaması",
        "Kitapların var olduğunun kesin reddi",
      ],
      reasons: [
        "Salt sayı bilgisi görüşlerin neden farklılaştığını açıklamaz.",
        "Tek açıklamanın eksikliği tüm tarihî etkileri yok saymaz.",
        "Birlikte aynı oldukları sonucu verilmez.",
        "Bu evrensel dışlama çıkarılamaz.",
        "Parça nüshaların varlığını kabul eder.",
      ],
      knowledge: [
        "Nedensel açıklama bir olgu listesi değil, etkinin nasıl oluştuğunu gösteren bağ gerektirir.",
      ],
      strategy:
        "Verilen olgu ile açıklanmak istenen sonucu ayrı yazıp aradaki oku kontrol et.",
      steps: [
        "Verilen olgu nüsha sayısının azlığıdır.",
        "Açıklanmak istenen sonuç yorum ayrılığıdır.",
        "Erişim veya yorum yöntemiyle bağ kurulmadığı için mekanizma eksiktir.",
      ],
      commonError:
        "Eksik bir neden açıklamasından o unsurun tarihte hiçbir etkisi olamayacağını çıkarmak.",
      check: "Eleştirin yalnız bu pasajın kurmadığı bağlantıya mı yönelik?",
    },
    {
      passage:
        "Bir sosyal kriz yeni alışveriş sorunları doğururken, farklı örflerin karşılaşması da bu sorunlara verilen yorumları etkiliyor.",
      prompt: "Bu olay için hangi sınıflama uygundur?",
      options: [
        "Sosyal ve kültürel nedenler birlikte bulunabilir.",
        "Altı neden her durumda birbirini dışlar.",
        "Sadece siyasi liderlik vardır.",
        "İki neden olması olayın imkânsız olduğunu gösterir.",
        "Bütün yorumların artık tek olduğu kesindir.",
      ],
      reasons: [
        "Kriz sosyal, örf karşılaşması kültürel boyutu verir.",
        "Parça iki nedenin birlikte etkisini açıkça gösterir.",
        "Liderlik tartışması verilmez.",
        "Çok nedenlilik çelişki değildir.",
        "Yorum etkilenmesi birlik sonucunu vermez.",
      ],
      knowledge: [
        "Yorum farklılıklarının nedenleri kapalı ve karşılıklı dışlayıcı sınıflar değildir.",
      ],
      strategy:
        "Her fiili kendi belirleyici unsuruna bağlayıp sonra birleştir.",
      steps: [
        "Kriz yeni pratik ihtiyaç üretir; bu sosyal boyuttur.",
        "Örflerin karşılaşması kültürel etkiyi gösterir.",
        "İki bağı birlikte koruyan seçenek doğru; tek nedene zorlama eksiktir.",
      ],
      commonError:
        "Bir neden seçilince diğer nedenin mutlaka yok olduğunu varsaymak.",
      check: "Cevabın krizi ve örfü ayrı ayrı açıklayabiliyor mu?",
    },
    {
      passage:
        "Bir çizelgede inanç esaslarını delillerle açıklama “kelam”, ibadet ve günlük hukuk hükümlerini inceleme “fıkıh” olarak gösterilir.",
      prompt: "Hangi yeni çalışma fıkıh sütununa daha doğrudan yerleşir?",
      options: [
        "Bir satış sözleşmesinin uygulama şartlarını değerlendirme",
        "Allah’ın sıfatları hakkında delil tartışma",
        "Nübüvvet inancını gerekçelendirme",
        "Ahiret inancının açıklaması",
        "Yalnız ilahî sıfatın tanımı",
      ],
      reasons: [
        "Sözleşme hükümleri günlük amel-hukuk alanıdır.",
        "İnanç ve kelam sütununa uyar.",
        "Peygamberlik inancı itikadi konudur.",
        "İnanç esasına aittir.",
        "Bu da itikadi alandadır.",
      ],
      knowledge: [
        "Alan seçimi başlıktaki dinî kelimeden değil tartışılan işin niteliğinden yapılır.",
      ],
      strategy:
        "Yeni örneğin uygulama hükmü mü inanç açıklaması mı istediğini sor.",
      steps: [
        "Yeni çalışma sözleşmenin şartlarını değerlendirir.",
        "Bu konu kişinin günlük işleminin hükmüdür.",
        "Dolayısıyla fıkıh sütununa yerleşir; diğer dört çalışma inançla ilgilidir.",
      ],
      commonError:
        "Bütün dinî kelimeler aynı olduğu için alan farkını aramamak.",
      check: "Seçtiğin çalışma bir fiilin hükmü hakkında mı?",
    },
  ],
  [
    {
      passage:
        "Bir anlatım Hz. Muhammed’in çalıştığını, dinlendiğini ve vahiy aldığını birlikte belirtir.",
      prompt: "Bu bilgiler nasıl değerlendirilir?",
      options: [
        "İnsani ve peygamberlik yönü birlikte anlatılır.",
        "Vahiy alması dinlenmeyi imkânsız kılar.",
        "Çalışması peygamberlik görevini reddeder.",
        "Metin yalnız ölümsüzlük bildirir.",
        "Hepsi aynı tek meslek adıdır.",
      ],
      reasons: [
        "Çalışma-dinlenme insanî, vahiy elçilik yönüdür.",
        "İki özellik arasında böyle bir çelişki yoktur.",
        "İnsan eylemi elçilik görevini yok saymaz.",
        "Ölümsüzlük verilmemiştir.",
        "Farklı yön ve eylemler anlatılır.",
      ],
      knowledge: [
        "İnsani özelliklerle peygamberlik görevi aynı kişide bulunabilir.",
      ],
      strategy: "Üç fiili iki yön altında sınıflandır.",
      steps: [
        "Çalışma ve dinlenme insanın ihtiyacına ilişkindir.",
        "Vahiy alma peygamberlik yönünü gösterir.",
        "İkisini birlikte koruyan yorum doğrudur; bir yön diğerini silmez.",
      ],
      commonError:
        "Vahiy ile insani ihtiyacı birbirini dışlayan özellik sanmak.",
      check: "Cevabın dinlenme ve vahiy verilerini birlikte açıklıyor mu?",
    },
    {
      passage:
        "Hz. Muhammed aldığı ilahî mesajı bir topluluğa eksiksiz duyurmuştur. Parçada uygulama açıklaması verilmemektedir.",
      prompt: "Doğrudan belirtilen görev hangisidir?",
      options: [
        "Tebliğ",
        "Yalnız teşri",
        "Yalnız tebyin",
        "Yalnız temsil",
        "Kadılık",
      ],
      reasons: [
        "Belirleyici fiil mesajı ulaştırmadır.",
        "Yeni hüküm koyma vurgusu yoktur.",
        "Uygulama veya anlam açma verilmemiştir.",
        "Davranışla örnekleme değil duyurma anlatılır.",
        "Hukuki uyuşmazlık görülmüyor.",
      ],
      knowledge: [
        "Tebliğ, alınan ilahî bilgiyi eksiksiz olarak insanlara ulaştırma görevidir.",
      ],
      strategy: "Duyurma fiilini açıklama ve hüküm koymadan ayır.",
      steps: [
        "Olayda bilgi alınmış ve topluluğa duyurulmuştur.",
        "Parça ayrıca açıklama veya örnek davranış anlatmaz.",
        "Bu dar veri tebliği doğrudan destekler; diğer görevler ek kanıt ister.",
      ],
      commonError: "Her dinî cümleyi aynı anda dört görevin kanıtı saymak.",
      check: "Cevabını yalnız “duyurdu” fiiliyle gerekçelendirebiliyor musun?",
    },
    {
      passage:
        "Bir dinî buyruğun ne anlama geldiği ve nasıl uygulanacağı ayrıntılı biçimde açıklanıyor.",
      prompt: "Burada hangi görev öne çıkar?",
      options: [
        "Tebyin",
        "Yalnız ticaret",
        "Yeni görev icat etme",
        "Yalnız hakemlik",
        "Sadece mesajı hiçbir açıklama olmadan iletme",
      ],
      reasons: [
        "Anlam ve uygulama açıklaması tebyindir.",
        "Ticari işlem verilmez.",
        "Soru mevcut peygamberlik görevi sınıflamasını ister.",
        "Taraflar arası uyuşmazlık anlatılmaz.",
        "Ayrıntılı açıklama açıkça verilmektedir.",
      ],
      knowledge: [
        "Bir mesajın ulaştırılması ile anlamının açıklanması ayrı işlevlerdir.",
      ],
      strategy:
        "Kökün özellikle nasıl ve ne demek sorularına yöneldiğini fark et.",
      steps: [
        "Veri buyruğun anlamını açmaktadır.",
        "Nasıl uygulanacağı da öğretilmektedir.",
        "Bu iki açıklayıcı fiil tebyine uyar; yalnız iletme yetersizdir.",
      ],
      commonError: "Açıklama verisini görüp yalnız duyuru seçmek.",
      check: "Açıklama sözcüğünün karşılığı cevabında bulunuyor mu?",
    },
    {
      passage:
        "Bir ders parçası peygamberin dinî hüküm koyma yetkisini ve açık bir norm bildirmesini vurguluyor.",
      prompt: "Vurgulanan görev hangisidir?",
      options: [
        "Teşri",
        "Sadece kişisel dinlenme",
        "Yalnız aktarım türü olarak takrir",
        "Mekân sağlama",
        "Yalnız kelimeyi sözlükte arama",
      ],
      reasons: [
        "Hüküm koyma ve normatif düzenleme bu göreve karşılık gelir.",
        "Dinlenme insani yöndür; burada norm bildirilir.",
        "Başkasının davranışına onay anlatılmıyor.",
        "Yer açılması verilmez.",
        "Parça hüküm yetkisini öne çıkarır.",
      ],
      knowledge: [
        "Teşriyi tanımada açık norm ve hüküm koyma bağlamı gereklidir.",
      ],
      strategy: "Sıradan açıklamadan farklı olan yetki ve norm vurgusunu bul.",
      steps: [
        "Pasaj doğrudan dinî hüküm koymayı söyler.",
        "Bu, mevcut bir kelimenin açıklanmasından daha özel normatif vurgudur.",
        "Bu nedenle teşri seçilir; aktarılmamış onay veya kişisel eylem eklenmez.",
      ],
      commonError:
        "Her öğüdü kanıtsız yeni hüküm saymak veya açık hükmü görmemek.",
      check: "Kökündeki norm vurgusuyla görev tanımı eşleşiyor mu?",
    },
    {
      passage:
        "Adalet ilkesi anlatıldıktan sonra Hz. Muhammed’in bu ilkeyi kendi davranışıyla somutlaştırdığı belirtiliyor.",
      prompt: "İkinci bölüm hangi görevi öne çıkarır?",
      options: [
        "Temsil",
        "Yalnız tebliğ",
        "Sadece takvim düzenleme",
        "Yalnız sözlük tanımı",
        "Her insanın bütün davranışlarını onaylama",
      ],
      reasons: [
        "Yaşayışla örnekleme temsil yönüdür.",
        "İkinci bölüm yalnız söyleme değil davranışla göstermedir.",
        "Tarih hesabı yoktur.",
        "Somut davranış verilmiştir.",
        "Böyle bir kapsam yoktur.",
      ],
      knowledge: [
        "Temsil, ilkenin davranışla gösterilmesi ve örneklenmesidir.",
      ],
      strategy: "İlk duyuruyu ikinci uygulama fiilinden ayrı tut.",
      steps: [
        "İkinci bölüm kendi davranışıyla somutlaştırma içerir.",
        "Bu, başkasına sadece bilgi aktarmaktan farklıdır.",
        "Örnek davranış vurgusu temsili destekler.",
      ],
      commonError:
        "Önce konuşulduğu için sonraki davranışı da yalnız söz saymak.",
      check: "Sorunun özellikle ikinci bölümü istediğini korudun mu?",
    },
    {
      passage:
        "Bir anlatıda önce mesaj duyuruluyor, sonra anlamı açıklanıyor, ardından davranışla gösteriliyor. Yeni dinî hüküm koyma ayrıca belirtilmiyor.",
      prompt: "Verilen sıra hangisidir?",
      options: [
        "Tebliğ–tebyin–temsil",
        "Teşri–teşri–teşri",
        "Temsil–tebliğ–tebyin",
        "Takrir–kadılık–ticaret",
        "Yalnız tebliğ",
      ],
      reasons: [
        "Duyurma, açıklama ve uygulama sırası bu üçüdür.",
        "Hüküm koyma açıkça verilmez.",
        "İlk ve son fiiller yanlış sıraya taşınmıştır.",
        "Bu roller parçadaki fiilleri karşılamaz.",
        "Son iki açıklama ve davranış fiili dışlanmıştır.",
      ],
      knowledge: [
        "Bir olay birden çok görevi içerebilir; her görevin kendi fiili bulunmalıdır.",
      ],
      strategy: "Fiilleri sırayla ayrı kutulara yaz.",
      steps: [
        "Duyurma tebliğdir.",
        "Anlam açma tebyin, yaşayışta gösterme temsildir.",
        "Üç kutuyu aynı sırada koru; verilmeyen teşriyi ekleme.",
      ],
      commonError: "Üç aşamanın varlığından dört görevin tamamını çıkarmak.",
      check:
        "Seçtiğin dizide ikinci görev açıklama fiiline mi karşılık geliyor?",
    },
    {
      passage:
        "Bir metinde “Allah’ın izniyle insanlara rehberlik eden son peygamber” ifadesi yer alıyor.",
      prompt: "Son peygamber oluşunu karşılayan terim hangisidir?",
      options: [
        "Hâtemü’n-nebiyyîn",
        "İnfak",
        "Muvatta",
        "Coğrafi sebep",
        "Müteşabih",
      ],
      reasons: [
        "Terim peygamberlerin sonuncusu anlamındadır.",
        "Mal ve imkân paylaşımıdır.",
        "Bir eser adıdır; son peygamberlik sıfatı değildir.",
        "Yorum farklılığının nedeni sınıfıdır.",
        "Yoruma elverişli ayet türünü anlatır.",
      ],
      knowledge: [
        "Nübüvvet peygamberliktir; Hâtemü’n-nebiyyîn son peygamberliği ifade eder.",
      ],
      strategy: "Terimin yerine tanım cümlesini koy.",
      steps: [
        "Sorulan özellik son peygamber oluştur.",
        "Hâtemü’n-nebiyyîn bu özelliğin kaynakta verilen terimidir.",
        "Diğer seçenekler eylem, eser veya sınıflama olduğundan tanımı karşılamaz.",
      ],
      commonError: "Dinî terimlerin hepsini aynı görev listesine koymak.",
      check: "Seçtiğin kelime “son peygamber” ifadesinin karşılığı mı?",
    },
    {
      passage:
        "Bir öğrenci “Üsve-i hasene, yalnız bir kişinin giydiği kumaşı aynen kullanmaktır.” diye not almıştır.",
      prompt: "Bu not nasıl düzeltilmelidir?",
      options: [
        "Güzel örneklik inanç, ibadet ve ahlakı kapsar; yalnız araç kopyası değildir.",
        "Terim yalnız deniz hesabıdır.",
        "Kavram her davranışın niyetini otomatik ölçer.",
        "Bütün tarihî ayrıntılar önemsizdir.",
        "Hiçbir davranış örnek alınamaz.",
      ],
      reasons: [
        "Terimin kapsamı dış görünüşten daha geniştir.",
        "Böyle bir anlam yoktur.",
        "Örnek alma iç niyetin otomatik ölçümü değildir.",
        "Kapsamı genişletmek tarihî bağlamı yok saymak değildir.",
        "Güzel örneklik tam tersine örnek alınabilirliği anlatır.",
      ],
      knowledge: ["Üsve-i hasene, güzel model ve örneklik anlamı taşır."],
      strategy: "Dar nesne örneğini terimin bütün anlamıyla karşılaştır.",
      steps: [
        "Not yalnız kumaş aracına indirgenmiştir.",
        "Ders tanımı inanç, ibadet ve ahlak alanlarını kapsar.",
        "Düzeltme kapsamı bu alanlara açmalı, biçim kopyasını tek ölçüt yapmamalıdır.",
      ],
      commonError: "Örnekliğin anlamını dış nesnenin aynılığına indirgemek.",
      check: "Düzeltmen davranışın amaç ve ilkesine de yer veriyor mu?",
    },
    {
      passage:
        "Bir rivayette Hz. Peygamber’in verdiği doğrudan bir öğüt aktarılıyor; başka bir kişinin eylemine onay anlatılmıyor.",
      prompt: "Aktarılan unsur hangi sünnet türündedir?",
      options: ["Kavlî", "Yalnız takrirî", "Yalnız fiilî", "Coğrafi", "Mirasî"],
      reasons: [
        "Doğrudan söylenen öğüt söz unsurudur.",
        "Başkasının davranışını onaylama verilmemiştir.",
        "Bizzat yapılan eylem değil söylenen öğüt aktarılır.",
        "Sünnet türü değildir.",
        "Bu sınıflamanın türü değildir.",
      ],
      knowledge: [
        "Kavlî sünnet, söz, açıklama ve öğütlerin aktarımını kapsar.",
      ],
      strategy: "Aktarılan şey söz mü eylem mi onay mı diye sor.",
      steps: [
        "Rivayet doğrudan bir öğüdü aktarır.",
        "Öğüt söylenen söz olduğundan kavlî sınıftadır.",
        "Onay ve bizzat uygulama verilmediği için diğer iki tür doğrudan seçilmez.",
      ],
      commonError: "Öğüt olumlu olduğu için onu takrirî onay sanmak.",
      check: "Aktarım nesnesini bir söz olarak gösterebiliyor musun?",
    },
    {
      passage:
        "Bir rivayet Hz. Peygamber’in namazı nasıl uyguladığını anlatıyor. Soru eylemin hüküm derecesini değil, rivayetin söz–davranış–onay türünü soruyor.",
      prompt: "Hangi sınıf uygundur?",
      options: [
        "Fiilî sünnet",
        "Kavlî; çünkü her rivayet yalnız sözdür.",
        "Takrirî; çünkü namazı başkası kılmıştır.",
        "Tür belirlenemez; farz eylem davranış sayılmaz.",
        "Fıkhi derece sorusu olduğu için yalnız nafile",
      ],
      reasons: [
        "Aktarılan unsur bizzat yapılan uygulamadır.",
        "Anlatım sözle yapılsa da aktarılan unsur davranıştır.",
        "Metin başkasının onayını değil kendi uygulamasını verir.",
        "Hüküm derecesi aktarım türünü ortadan kaldırmaz.",
        "Kök açıkça dereceyi değil türü sorar.",
      ],
      knowledge: [
        "Fiilî aktarım türüyle farz/vacip/nafile gibi hüküm dereceleri farklı sınıflamalardır.",
      ],
      strategy: "Kökün hangi ekseni istediğini koru.",
      steps: [
        "Kök söz–davranış–onay ayrımını istiyor.",
        "Verilen unsur namazın bizzat uygulanmasıdır.",
        "Davranış aktarımı fiilîdir; farz oluşu davranış sınıfını dışlamaz.",
      ],
      commonError: "Fiilî sünneti yalnız farz dışındaki eylemlerle sınırlamak.",
      check: "Cevabın tür sorusunu hüküm derecesi sorusuna çevirmiyor mu?",
    },
    {
      passage:
        "Bir parça, Hz. Peygamber’in sahabinin yaptığı belirli davranışı uygun bulduğunu ve onayladığını açıkça belirtir.",
      prompt: "Bu unsur hangi türe örnektir?",
      options: [
        "Takrirî sünnet",
        "Yalnız fiilî",
        "Yalnız astronomik",
        "Yalnız coğrafi",
        "Her sessizlikte aynı sonuç",
      ],
      reasons: [
        "Başkasının davranışına açık onay verildiği için bu sınıfa girer.",
        "Kendi yaptığı uygulama değil başkasına onay aktarılır.",
        "Konu gök bilimi değildir.",
        "Yer şekli açıklaması yoktur.",
        "Burada onay açıktır; her sessizlik için kural çıkarılamaz.",
      ],
      knowledge: [
        "Takrirî sünnette belirleyici, başkasının söz veya eyleminin onay niteliğiyle aktarılmasıdır.",
      ],
      strategy: "Onay verisinin açık olup olmadığını kontrol et.",
      steps: [
        "Eylemi yapan sahabidir.",
        "Hz. Peygamber’in uygun bulması açıkça söylenir.",
        "Bu iki öğe takrirî aktarımı destekler; salt sessizliğe genellenmez.",
      ],
      commonError: "Onayı gördükten sonra bütün sessizlikleri onay saymak.",
      check: "Onay sınıflaman metindeki “uygun buldu” verisine dayanıyor mu?",
    },
    {
      passage:
        "Bir tarihî not yalnız “o sırada sessiz kaldı” diyor; neden sessiz kaldığı ve onaylayıp onaylamadığı belirtilmiyor.",
      prompt: "Bu veriden hangi sonuç çıkar?",
      options: [
        "Onay verdiği kesin değildir.",
        "Kesin takrirî onay vardır.",
        "Kesin karşı çıkmıştır.",
        "Bütün davranışları benimsemiştir.",
        "Hiç orada bulunmamıştır.",
      ],
      reasons: [
        "Salt sessizlik, onay bağlamı verilmedikçe tek başına yeterli değildir.",
        "Onay niteliği eklenmektedir.",
        "Karşı çıkma da verilmemiştir.",
        "Tek olaydan evrensel kabul çıkarılmaz.",
        "Sessizlik bilgisi yokluk sonucunu vermez.",
      ],
      knowledge: [
        "Bilginin yokluğu hem kabul hem ret yönündeki kesin hükmü sınırlar.",
      ],
      strategy: "Onay ve ret seçenekleri için ayrı kanıt ara.",
      steps: [
        "Notta yalnız sessizlik vardır.",
        "Onay veya ret gerekçesi verilmemiştir.",
        "Bu yüzden kesin onay sonucu çıkmaz; kesin ret de eklenemez.",
      ],
      commonError: "Sessizlik nedenini kendin tamamlayarak onay üretmek.",
      check: "Cevabın eksik bilgiyi açıkça bırakıyor mu?",
    },
    {
      passage:
        "Bir kişi öğretmenin yalnız gözünü rahatsız eden parlak ışık için başını çevirdiğini bilmiyor; öğretmen yaptığı için her ortamda aynı hareketi yapıyor.",
      prompt: "Bilinçli örnek alma açısından eksik olan nedir?",
      options: [
        "Davranışın gerekçe ve uygun koşulunun anlaşılması",
        "Aynı hareketin fiziksel olarak yapılması",
        "Öğretmenin bütün özelliklerini reddetmek",
        "Her ortamda aynı ışığın bulunduğu bilgisi",
        "Hareketin hiçbir zaman işe yaramayacağı",
      ],
      reasons: [
        "Kişi nedeni bilmeden bütün ortamlara hareketi taşıyor.",
        "Hareket zaten yapılmıştır; eksik olan anlamdır.",
        "Böyle bir şart yoktur.",
        "Metin bu bilgiyi vermez; gerekli ayrım koşulu fark etmektir.",
        "İlk koşulda bir amaç açıkça vardır.",
      ],
      knowledge: [
        "Bilinçli örnek alma gerekçeyi anlayıp uygun koşulda ilkeyi uygulamayı gerektirir.",
      ],
      strategy: "Kopyalanan biçimle bilinmeyen amacı ayır.",
      steps: [
        "İlk hareketin amacı ışık rahatsızlığıdır.",
        "Kopyalayan kişi bu gerekçeyi bilmiyor ve koşula bakmıyor.",
        "Eksik olan dış hareket değil, neden ve koşul anlayışıdır.",
      ],
      commonError: "Fiziksel benzerliği tek başına anlamış olma kanıtı saymak.",
      check:
        "Eksik öğeyi hareketin kendisi yerine gerekçe olarak belirledin mi?",
    },
    {
      passage:
        "Bir metin hak gözetmeyi anlatırken yakın akrabaya bile haksız ayrıcalık verilmemesini örnekliyor.",
      prompt: "En doğrudan vurgulanan değer nedir?",
      options: [
        "Adalet",
        "Yalnız bedensel güç",
        "Her kişiye koşulsuz aynı nesneyi verme",
        "Yalnız kişisel servet",
        "Hiç kural bulunmaması",
      ],
      reasons: [
        "Yakınlıktan bağımsız hak gözetme bu değeri destekler.",
        "Güç verisi yoktur.",
        "Adalet bütün koşullarda aynı nesne demek değildir.",
        "Servet bilgisi belirleyici değildir.",
        "Hak gözetme belirli ilkeye dayanmaktadır.",
      ],
      knowledge: [
        "Adalet, hakkı ve ilgili koşulu gözetir; yakınlık tek başına hak yerine geçmez.",
      ],
      strategy: "Ayrıcalığın hangi nedenle reddedildiğini incele.",
      steps: [
        "Örnek akrabaya haksız ayrıcalık vermemeyi anlatır.",
        "Belirleyici ölçüt yakınlık değil haktır.",
        "Bu nedenle adalet çıkar; her durumda aynı maddi sonuç kuralı çıkarılmaz.",
      ],
      commonError: "Adaleti her koşulda herkese aynı miktarı verme sanmak.",
      check: "Cevabın hak ölçütünü ve yakınlık karşılaştırmasını koruyor mu?",
    },
    {
      passage:
        "Bir kişi sakin ve incitmeden yanlış bir davranışı düzeltir; fakat davranışı doğru bulmadığını açıkça belirtir.",
      prompt: "Bu olay için hangisi uygundur?",
      options: [
        "Yumuşak ilişki tarzı yanlış davranışı onaylamakla aynı değildir.",
        "Sakin olduğu için kesin onay vermiştir.",
        "Hilm yalnız bağırmak demektir.",
        "Düzeltme yapması merhameti mantıken imkânsız kılar.",
        "Yanlışın hiç fark edilmediği kesindir.",
      ],
      reasons: [
        "Kişi sakinlikle düzeltmeyi birlikte yapmaktadır.",
        "Açık ret ve düzeltme bu sonucu engeller.",
        "Kavramın anlamı ters çevrilmiştir.",
        "Sakin düzeltme ve merhamet birlikte bulunabilir.",
        "Yanlışı düzeltme açıkça fark etmeyi içerir.",
      ],
      knowledge: [
        "Hilm, ölçülü ve kendine hâkim ilişki tarzıdır; onay hükmünün yerine geçmez.",
      ],
      strategy: "Tarz ve yargıyı iki sütunda tut.",
      steps: [
        "Tarz sakin ve incitmemedir.",
        "Yargı davranışın yanlış bulunması ve düzeltilmesidir.",
        "İki boyut birlikte bulunabildiğinden sakinlikten onay çıkmaz.",
      ],
      commonError: "İlişki biçimini doğrudan kabul hükmü sanmak.",
      check: "Hem sakinlik hem düzeltme verisi yorumunda kalıyor mu?",
    },
    {
      passage:
        "Ahzâb 45–46’nın öğretim özeti elçiyi şahit, müjdeleyici, uyarıcı, davetçi ve aydınlatıcı kandil olarak tanıtır.",
      prompt: "Bu ifadeler nasıl okunmalıdır?",
      options: [
        "Birbirine bağlı fakat farklı işlevler olarak",
        "Hepsi aynı tek sözcüğün tam eş anlamlısı olarak",
        "Yalnız fiziksel lamba üretim tarifi olarak",
        "Bütün tarihî kararların ayrıntılı listesi olarak",
        "Her görevin reddi olarak",
      ],
      reasons: [
        "Tanıklık, umut, uyarı, çağrı ve rehberlik ayrı vurgulardır.",
        "İşlevler farklıdır.",
        "Kandil rehberlik benzetmesidir.",
        "Özet böyle bir liste vermez.",
        "Metin görevleri açıkça saymaktadır.",
      ],
      knowledge: [
        "Ayet yorumunda ayrı rol sözcükleri ayrı işlevleri destekleyebilir.",
      ],
      strategy: "Her kelimeye bir işlev yazıp eşitlik iddiasını denetle.",
      steps: [
        "Şahit tanıklık, müjdeleyici olumlu haber, uyarıcı sakındırmadır.",
        "Davetçi çağrı, kandil rehberlik yönünü öne çıkarır.",
        "Bu farklı anlamlar ilişkilidir ama tek eş anlamlı kelime değildir.",
      ],
      commonError:
        "Birden çok rolü tek etikete indirip metindeki ayrımı silmek.",
      check: "Her rol için ayrı bir fiil gösterebiliyor musun?",
    },
    {
      passage:
        "Bir paragraf “aydınlatıcı kandil” ifadesini insanlara yol gösterme anlamında kullanıyor.",
      prompt: "Hangi sonuç bu bağlamdan çıkarılamaz?",
      options: [
        "Kandilin tam malzeme bileşimi ve ışık gücü",
        "Rehberlik vurgusu bulunduğu",
        "Bir benzetme kullanıldığı",
        "İnsanlara yön gösterme amaçlandığı",
        "İfadenin yalnız fiziksel nesne olarak okunmaması gerektiği",
      ],
      reasons: [
        "Benzetme teknik ölçüm vermez.",
        "Yol gösterme açıkça verilmiştir.",
        "Kandil mecazi rehberlik bağlamındadır.",
        "Paragrafta bu anlam bulunur.",
        "Bağlam yol gösterme anlamını belirler.",
      ],
      knowledge: [
        "Benzetmenin işlevi, nesnenin bütün fiziksel özelliklerini metne taşımaz.",
      ],
      strategy: "Olumsuz kökte anlam vurgusuyla teknik ek bilgiyi ayır.",
      steps: [
        "Bağlam kandili yol gösterme için kullanıyor.",
        "Malzeme ve ışık gücü hiçbir cümlede verilmez.",
        "Bu nedenle teknik bileşim çıkarılamaz; rehberlik seçenekleri desteklenir.",
      ],
      commonError: "Mecazi nesneden tüm fiziksel ayrıntıları kesin çıkarmak.",
      check: "Kanıtsız seçeneğin teknik ölçüm eklediğini fark ettin mi?",
    },
    {
      passage:
        "Nûr 54’ün açıklamasında elçinin tebliğ göreviyle muhatapların kendi tercih sorumluluğu ayrı gösterilir.",
      prompt: "Buna göre hangisi uygundur?",
      options: [
        "Görevi yerine getirmek başkasının bütün tercihlerinin sahibi olmak değildir.",
        "Muhatapların yaptığı her tercih yalnız elçiye aittir.",
        "Tebliğ hiç kimseye bilgi ulaştırmaz.",
        "Bir sorumluluk varsa başka sorumluluk bulunamaz.",
        "Bütün insanlar aynı tercihi yapar.",
      ],
      reasons: [
        "Açıklama iki sorumluluk alanını ayırır.",
        "Bu seçenek açık ayrımı siler.",
        "Görevin anlamı ters çevrilmiştir.",
        "İki alan birlikte verilmiştir.",
        "Tercihlerin aynı olduğu söylenmez.",
      ],
      knowledge: [
        "Sorumluluk alanlarını ayırmak, iki tarafın ilişkisini yok saymak değildir.",
      ],
      strategy: "Kimin hangi görevden sorumlu olduğunu ayrı özneyle yaz.",
      steps: [
        "Elçinin alanı mesajı bildirme görevidir.",
        "Muhatapların alanı kendi tercihleridir.",
        "Birinci görev, ikincinin bütün sonuçlarını aynı özneye yüklemez.",
      ],
      commonError:
        "Birinin açıklama yapmasını başkasının bütün seçimlerinden sorumlu tutmak.",
      check: "Cevabında iki farklı özne ve sorumluluk korunuyor mu?",
    },
  ],
  [
    {
      passage:
        "Bir kişi yanlış bulduğu yoldan dönerek ilahî rehberliğe yöneldiğini anlatır.",
      prompt: "Bu yöneliş hangi kavramla en doğrudan ilişkilidir?",
      options: ["Hidayet", "İnfak", "Kıtal", "Riyâ", "Muamelat"],
      reasons: [
        "Doğru yola yönelme kavramın belirleyici anlamıdır.",
        "Kaynak paylaşımı verilmemiştir.",
        "Silahlı çatışma yoktur.",
        "Gösteriş amacı anlatılmamıştır.",
        "Günlük işlem hukuku bu yönelişin adı değildir.",
      ],
      knowledge: [
        "Hidayet, doğru yolu bulma, yönelme ve rehberlik anlam alanıyla öğretilir.",
      ],
      strategy: "Hareketin yönünü maddi nesne aktarımından ayır.",
      steps: [
        "Kişi eski yolundan dönmektedir.",
        "Yeni yöneliş ilahî rehberliğe doğrudur.",
        "Bu değişim hidayetle ilişkilidir; bağış veya çatışma eklenemez.",
      ],
      commonError: "Her dinî yönelişi otomatik infak eylemi saymak.",
      check: "Kavramın gerekçesi doğru yola yönelme fiili mi?",
    },
    {
      passage:
        "Bir metin, doğru yolu göstermeyle insanın o yola yönelmesini iki ayrı eylem olarak açıklar.",
      prompt: "Hangi sonuç uygundur?",
      options: [
        "Rehberliği duymak, onu benimsemekle aynı işlem değildir.",
        "Bilgi duyan herkes otomatik aynı tercihi yapar.",
        "Rehberlik varsa insanın hiçbir seçimi yoktur.",
        "İki eylem aynı tek özne tarafından zorunlu yapılır.",
        "Doğru yol hiç gösterilmemiştir.",
      ],
      reasons: [
        "Gösterme ile yönelme ayrı fiillerdir.",
        "Tercih zorunluluğu verilmez.",
        "Metin yönelmeyi ayrı eylem olarak tutar.",
        "Özne eşitliği verilmez.",
        "İlk eylem bunu açıkça içerir.",
      ],
      knowledge: [
        "Bir kaynağın sunulması ile muhatabın tercihi arasındaki ayrım hidayet öğretiminde önemlidir.",
      ],
      strategy: "İki fiilin her birinde neyin gerçekleştiğini ayrı doğrula.",
      steps: [
        "Birinci eylem yolu göstermektir.",
        "İkinci eylem kişinin yönelmesidir.",
        "İlkinin varlığı ikincinin zorunlu tamamlandığı anlamına gelmez.",
      ],
      commonError: "Bilgiye erişimi benimsemenin kesin kanıtı yapmak.",
      check: "Sonucun gösterme ve yönelmeyi ayrı bırakıyor mu?",
    },
    {
      passage:
        "Bir kavram kartı “doğru yolu gösteren” anlamını ilahî isim olarak soruyor.",
      prompt: "Hangi isim uygundur?",
      options: ["El-Hâdi", "Rezzak", "Musavvir", "Hayy", "Şâfi"],
      reasons: [
        "Rehberlik ve doğru yol gösterme anlamıdır.",
        "Rızık verme anlamındadır.",
        "Biçim verme yönünü anlatır.",
        "Diri oluşu belirtir.",
        "Şifa verme anlamındadır.",
      ],
      knowledge: [
        "El-Hâdi, hidayet kavramının rehberlik yönüyle ilişkili isimdir.",
      ],
      strategy: "Soru isim istediği için aynı anlamın isim karşılığını bul.",
      steps: [
        "Kartın fiili doğru yolu göstermektir.",
        "El-Hâdi bu rehberlik anlamını verir.",
        "Diğer isimler rızık, biçim, dirilik ve şifa alanlarına aittir.",
      ],
      commonError:
        "Hidayetle bağlantılı isim yerine tanıdık başka isim seçmek.",
      check: "Seçtiğin ismin anlamında yol gösterme var mı?",
    },
    {
      passage:
        "Bir kişi işini, kimse denetlemese de Allah’ın huzurundaymışçasına bilinç ve özenle yaptığını söylüyor.",
      prompt: "Özenli kulluk yönünü en doğrudan hangi kavram karşılar?",
      options: [
        "İhsan",
        "Kıtal",
        "Yalnız infak",
        "Dalalet",
        "Yalnız siyasi mezhep",
      ],
      reasons: [
        "Görüyormuşçasına bilinç ve işi güzel yapma belirleyicidir.",
        "Çatışma verilmemiştir.",
        "Somut kaynak paylaşımı anlatılmıyor.",
        "Doğru yoldan sapma bilgisi yoktur.",
        "Yönetim ekolü sorulmuyor.",
      ],
      knowledge: [
        "İhsan işin nasıl yapıldığı ve bilinçli kullukla ilişkilidir.",
      ],
      strategy:
        "Özen ve huzur bilinci ifadelerini niyet veya mal aktarımıyla karıştırma.",
      steps: [
        "Kişi işi bilinç ve özenle yaptığını belirtir.",
        "Allah’ın huzurundaymışçasına ifadesi ihsanın doğrudan tanımına uyar.",
        "Para aktarımı veya çatışma koşulu yoktur.",
      ],
      commonError:
        "Kimse görmüyor sözünden eylemin türünü okumadan infak çıkarmak.",
      check:
        "Cevabın işin niteliğini ve bilinç vurgusunu birlikte karşılıyor mu?",
    },
    {
      passage:
        "Bir yardım metninde kişi “Bunu alkış için değil, yalnız Allah’ın rızasını gözeterek yaptım.” der.",
      prompt: "Niyet boyutunda hangi kavram öne çıkar?",
      options: [
        "İhlas",
        "Riyâ",
        "Kıtal",
        "Tek başına her hayatının kusursuzluğu",
        "Yalnız biçim verme",
      ],
      reasons: [
        "Gösterişten uzak samimi amaç açıkça belirtilmiştir.",
        "Alkış amacı açıkça reddedilir.",
        "Savaş eylemi yoktur.",
        "Tek niyet beyanı bütün hayatı ölçmez.",
        "İsim anlamı bu niyet sorusunu karşılamaz.",
      ],
      knowledge: [
        "İhlas, niyette samimiyet ve Allah’ın rızasını gözetmeyle açıklanır.",
      ],
      strategy: "Neden yaptığını belirten sözü eylemin miktarından ayır.",
      steps: [
        "Metin alkış amacını reddeder.",
        "Olumlu amaç Allah’ın rızası olarak açıkça verilir.",
        "Bu kurmaca niyet beyanı ihlası destekler; bütün hayat hakkında garanti vermez.",
      ],
      commonError:
        "Bir niyet örneğinden kişinin bütün davranışlarına eksiksiz hüküm vermek.",
      check: "Seçimin yalnız bu beyanın niyet boyutuna mı dayanıyor?",
    },
    {
      passage:
        "Bir dernek yardım hesaplarını, bağışçıların denetleyebilmesi için açıkça yayımlar. Metin üyelerin gösteriş istediğini söylemez.",
      prompt: "Bu veriden hangi sonuç çıkar?",
      options: [
        "Görünürlük tek başına riyâ niyetini kanıtlamaz.",
        "Her açık rapor kesin gösteriştir.",
        "Hiçbir para hareketi olmamıştır.",
        "Bütün üyelerin bütün iç niyetleri kesin bilinir.",
        "Şeffaflık her koşulda zararlıdır.",
      ],
      reasons: [
        "Amaç hesap verebilirlik olarak verilmiştir.",
        "Görünürlük ile niyet eşitlenemez.",
        "Hesap yayımlama bunu göstermez.",
        "Metin bu kapsamda bilgi vermez.",
        "Böyle evrensel sonuç yoktur.",
      ],
      knowledge: [
        "Bir işin görünmesi ile görünmek amacıyla yapılması farklı önermelerdir.",
      ],
      strategy: "Verilen amaçla varsayılan gösteriş amacını ayrı tut.",
      steps: [
        "Raporun amacı denetim imkânı olarak açıklanır.",
        "Alkış veya beğenilme niyeti belirtilmemiştir.",
        "Bu nedenle salt açıklıktan riyâ sonucu çıkarılamaz.",
      ],
      commonError: "Kamusal rapor görünürlüğünü otomatik gösteriş saymak.",
      check: "Niyet iddian için raporun görünmesinden başka kanıt var mı?",
    },
    {
      passage:
        "Bir kişi ihtiyaç sahibine malî destek verir ve “Beni daha çok övsünler diye yaptım.” der.",
      prompt: "Hangi değerlendirme metnin iki boyutunu korur?",
      options: [
        "Paylaşım fiili vardır; ihlas niyeti açık gösteriş amacıyla desteklenmez.",
        "İhlas kesin desteklenir; çünkü yardım görünürdür.",
        "Hiçbir yardım fiili gerçekleşmemiştir.",
        "Kıtal kesin gerçekleşmiştir.",
        "Niyet değişince para verilmiş olması da geçmişten silinir.",
      ],
      reasons: [
        "Eylem korunur, niyet ayrı değerlendirilir.",
        "Açık alkış amacı samimiyet yorumunu desteklemez.",
        "Malî destek açıkça verilmiştir.",
        "Silahlı eylem yoktur.",
        "Niyet bilgisi fiilin gerçekleşmesini yok etmez.",
      ],
      knowledge: ["Eylem ve niyet iki bağımsız değerlendirme boyutudur."],
      strategy: "Ne yaptığını ve niçin yaptığını iki satıra ayır.",
      steps: [
        "Ne yaptı: somut malî destek verdi.",
        "Niçin yaptı: açıkça övgü istedi.",
        "Paylaşım bilgisi kalır; ihlas niyetinin dayanağı ise yoktur.",
      ],
      commonError: "Yardım fiilini otomatik samimi amaçla özdeşleştirmek.",
      check: "Cevabın eylemi silmeden niyet farkını açıklıyor mu?",
    },
    {
      passage:
        "Bir öğrenci haksız kazanç teklifini, Allah’a karşı sorumluluk bilinciyle doğru bulmadığı için reddediyor.",
      prompt: "Bu gerekçe en doğrudan hangi kavramla ilişkilidir?",
      options: [
        "Takva",
        "Yalnız kıtal",
        "Yalnız infak",
        "Riyâ",
        "Sadece yakalanma korkusu",
      ],
      reasons: [
        "Emir ve yasağı sorumlulukla gözetme vurgulanır.",
        "Çatışma anlatılmamıştır.",
        "Mal veya imkân aktarımı yoktur.",
        "Alkış amacı verilmemiştir.",
        "Gerekçe açıkça dinî sorumluluktur.",
      ],
      knowledge: [
        "Takva, sorumluluk bilinciyle yanlış olandan sakınmayı içerir.",
      ],
      strategy: "Reddetme fiilinin yanında verilen gerekçeyi kullan.",
      steps: [
        "Teklif haksız kazançtır.",
        "Ret nedeni Allah’a karşı sorumluluk olarak açıkça verilir.",
        "Bu koşul takvayı destekler; yalnız yakalanma korkusu seçilemez.",
      ],
      commonError:
        "Bütün sakınmaları gerekçe okumadan tek korku türüne indirgemek.",
      check: "Ret gerekçesi cevabının tanımında yer alıyor mu?",
    },
    {
      passage:
        "Bir metin “Doğru ilkelerin çizdiği istikamette ilerlemeyi sürdürüyor.” ifadesini özellikle vurguluyor.",
      prompt: "İstikamet boyutunda hangi kavram öne çıkar?",
      options: [
        "Sırat-ı müstakim",
        "Yalnız infak",
        "Riyâ",
        "Kıtal",
        "Yalnız ticaret hukuku",
      ],
      reasons: [
        "Dosdoğru yol ve istikamet vurgusu bu kavrama uygundur.",
        "Paylaşım verilmemiştir.",
        "Gösteriş amacı yoktur.",
        "Savaş bilgisi yoktur.",
        "İşlem hükmü anlatılmaz.",
      ],
      knowledge: [
        "Sırat-ı müstakim, dosdoğru yol ve doğru istikamet anlamıyla öğretilir.",
      ],
      strategy: "Kökün özellikle hangi boyutu sorduğunu koru.",
      steps: [
        "Parçada doğru ilkelerin çizdiği yol vardır.",
        "Devam eden vurgu istikamette ilerlemektir.",
        "Bu vurgu sırat-ı müstakime uygundur; verilmeyen paylaşım eklenmez.",
      ],
      commonError: "Yol kelimesini görüp sorulan istikamet boyutunu atlamak.",
      check: "Cevabını “doğru istikamet” diye açıklayabiliyor musun?",
    },
    {
      passage:
        "Bir öğrenci “Hidayet yalnız bir an sürer; sonrasında bu kelime hiçbir zaman kullanılamaz.” diyor.",
      prompt: "Bu katı zaman kuralı nasıl değerlendirilir?",
      options: [
        "Tanımı gereksiz daraltır; hidayet doğru yolda bulunma anlamını da taşıyabilir.",
        "Kaynağın bütün kullanımlarını eksiksiz karşılar.",
        "Hidayet yalnız para vermektir.",
        "Sırat ve hidayet her bağlamda hiçbir ayrım olmadan aynıdır.",
        "Doğru yola yönelme kavramla ilgisizdir.",
      ],
      reasons: [
        "Kavramı zorunlu tek ana indirmek doğru değildir.",
        "Tanım bu kadar dar değildir.",
        "Paylaşım başka kavramdır.",
        "İlişkili olmaları bütün vurguların aynı olduğu anlamına gelmez.",
        "Bu temel anlam alanıdır.",
      ],
      knowledge: [
        "Bir öğretim karşılaştırmasındaki baskın vurgu, kelimenin bütün kullanımları için mutlak sınır değildir.",
      ],
      strategy: "Örnek ayrımını sözlüğün zorunlu tek kuralı yapma.",
      steps: [
        "Öğrenci “yalnız bir an” ve “hiçbir zaman” diye evrensel sınır kurar.",
        "Kavramın yol gösterme, yönelme ve doğru yolda bulunma alanı daha geniştir.",
        "Bu nedenle katı zaman kuralı reddedilir; anlam ilişkisi korunur.",
      ],
      commonError:
        "Yönelme–istikamet karşılaştırmasını mekanik süre kuralına çevirmek.",
      check:
        "Düzeltmen hem yönelme anlamını hem kullanım genişliğini koruyor mu?",
    },
    {
      passage:
        "Bir kişi kötü alışkanlığını düzeltmek için bilinçli ve düzenli çaba gösteriyor. Metin hiçbir silah veya çatışmadan söz etmiyor.",
      prompt: "Hangisi bu metinden çıkarılamaz?",
      options: [
        "Silahlı savaş yürüttüğü",
        "Davranışını değiştirmeye çalıştığı",
        "Bilinçli gayret gösterdiği",
        "Çabanın kendisine yönelik olduğu",
        "Bir hedefi bulunduğu",
      ],
      reasons: [
        "Öz disiplin çabası kıtal bilgisi vermez.",
        "Bu açıkça belirtilmiştir.",
        "Metin bilinçli çabayı söyler.",
        "Kötü alışkanlığını düzeltme kendine yöneliktir.",
        "Hedef alışkanlığı düzeltmektir.",
      ],
      knowledge: [
        "Cihat geniş çaba anlamı taşıyabilir; kıtal daha dar silahlı savaş anlamındadır.",
      ],
      strategy: "Olumsuz kökte eylemin aracına ilişkin veriyi kontrol et.",
      steps: [
        "Verilen eylem alışkanlığı düzeltme çabasıdır.",
        "Silah veya çatışma koşulu verilmemiştir.",
        "Bu yüzden silahlı savaş sonucu çıkarılamaz; diğerleri açık fiili yeniden anlatır.",
      ],
      commonError: "Her mücadele kelimesini askerî harekât olarak okumak.",
      check: "Seçtiğin çıkarımda metinde olmayan silah koşulu mu ekleniyor?",
    },
    {
      passage:
        "Bir metin, cemaat önünde güzel konuşmayı değil, kişinin yanlışını gidermek için düzenli ve meşru çabasını anlatır.",
      prompt: "Kavram değerlendirmesinde önce hangisi incelenmelidir?",
      options: [
        "Çabanın hedefi, aracı ve gerekçesi",
        "Yalnız kelimenin uzunluğu",
        "Mutlaka gizli askerî plan",
        "Kişinin bütün hayatının kusursuzluğu",
        "Her çabanın aynı sonuca varacağı",
      ],
      reasons: [
        "Genel mücadele kelimesi yerine eylemin koşulları gerekir.",
        "Yazı uzunluğu kavram kanıtı değildir.",
        "Böyle veri yoktur.",
        "Tek örnek bunu ölçmez.",
        "Sonuç garantisi yoktur.",
      ],
      knowledge: [
        "Çaba kavramı amaç ve meşru araçlarıyla bağlam içinde anlaşılır.",
      ],
      strategy: "Genel adı somut eylem bileşenlerine aç.",
      steps: [
        "Örnek düzenli ve meşru yanlış düzeltme çabası verir.",
        "Sınıflama için hedef, araç ve gerekçe bu eylemi somutlaştırır.",
        "Kelime uzunluğu veya gizli çatışma varsayımı kanıt yerine geçmez.",
      ],
      commonError:
        "Mücadele sözcüğünü bağlamı okumadan tek sonuçla eşleştirmek.",
      check: "İnceleme ölçütün doğrudan yapılan işe mi dayanıyor?",
    },
    {
      passage:
        "Bir öğrenci “Şehadet her cümlede yalnız silahlı çatışmada ölüm demektir.” diyor; oysa başka bir metin kelimeyi tanıklık anlamında kullanıyor.",
      prompt: "Doğru yaklaşım nedir?",
      options: [
        "Sözcüğün hangi anlamının kullanıldığını bağlamla belirlemek",
        "Her tanıklıkta zorunlu ölüm bulunduğunu söylemek",
        "Bir kelimenin asla birden fazla anlamı olamayacağını kabul etmek",
        "Bütün cümleleri aynı tarihî olaya bağlamak",
        "Tanıklık metnini okumadan silmek",
      ],
      reasons: [
        "Tanıklık ve ilgili dinî bağlam farklı kullanımlardır.",
        "Bu anlamlar özdeş değildir.",
        "Bağlam farklı kullanımı gösterebilir.",
        "Ayrı kullanımlar tek olay değildir.",
        "Metin kanıtını yok saymak çözüm değildir.",
      ],
      knowledge: [
        "Çok anlamlı terimler bütün bağlamlarda tek karşılıkla çözülmez.",
      ],
      strategy: "Ölüm veya tanıklık fiilinin hangisinin verildiğine bak.",
      steps: [
        "İkinci metin tanıklık kullanımını açıkça verir.",
        "Öğrencinin “her cümlede” kuralı bu kullanımı dışlar.",
        "Bağlamı esas alan yaklaşım iki anlamı ayırarak hatayı düzeltir.",
      ],
      commonError:
        "Terimin bir anlamını bütün kullanım alanlarına zorla taşımak.",
      check: "Sonucun verilmeyen ölüm olayını eklemiyor mu?",
    },
    {
      passage:
        "Bir öğrenci doğru niyetle, insanların güvenle geçebilmesi için yoldaki engeli kaldırıyor.",
      prompt:
        "Kaynağın geniş çerçevesinde bu eylem hangi kavramla ilişkilidir?",
      options: [
        "Salih amel",
        "Yalnız kıtal",
        "Yalnız para bağışı",
        "Riyâ kesin",
        "Hiçbir eylem yapılmamıştır.",
      ],
      reasons: [
        "Doğru niyetli ve yararlı somut iş verilmiştir.",
        "Silahlı çatışma yoktur.",
        "Maddi ödeme belirtilmemiştir.",
        "Gösteriş amacı verilmemiştir.",
        "Engel kaldırma açık fiildir.",
      ],
      knowledge: [
        "Salih amel yalnız dar bir ritüel veya para listesi değildir; doğru ve yararlı davranışı da içerir.",
      ],
      strategy: "Niyet, eylem ve yarar verilerini ayrı doğrula.",
      steps: [
        "Doğru niyet başlangıç verisidir.",
        "Engel gerçekten kaldırılmıştır ve geçişe yararı vardır.",
        "Bu koşullar salih amelle ilişki kurar; para veya savaş eklenmez.",
      ],
      commonError: "Salih ameli sadece para vermeye indirgemek.",
      check: "Cevabında hem gerçekleşen iş hem yararı bulunuyor mu?",
    },
    {
      passage:
        "Bir kişi “İhtiyaç sahibi için güzel şeyler düşündüm; henüz para, mal veya imkân paylaşmadım.” diyor.",
      prompt: "Bu ifadeden hangisi çıkarılamaz?",
      options: [
        "Somut infak eyleminin gerçekleştiği",
        "İyi bir isteği dile getirdiği",
        "Henüz paylaşım olmadığını söylediği",
        "Düşünce ile eylemin ayrı olduğu",
        "Metinde bir niyet beyanı bulunduğu",
      ],
      reasons: [
        "Paylaşım yapılmadığı açıkça belirtilir.",
        "Güzel düşünce beyanı vardır.",
        "Cümle bunu doğrudan içerir.",
        "İstek var, aktarım yok ayrımı kurulmuştur.",
        "Kişi düşüncesini ifade eder.",
      ],
      knowledge: [
        "İnfak için mal veya somut imkânın paylaşılması yönünde eylem verisi gerekir.",
      ],
      strategy: "İstek kipini tamamlanmış fiile dönüştürme.",
      steps: [
        "Kişi yardım düşüncesini belirtir.",
        "Aynı cümle paylaşımın henüz yapılmadığını söyler.",
        "Dolayısıyla gerçekleşmiş infak sonucu metne aykırıdır.",
      ],
      commonError: "İyi düşünceyi tamamlanmış kaynak aktarımı saymak.",
      check: "“Henüz” kaydını cevabında dikkate aldın mı?",
    },
    {
      passage:
        "Bir kişi kullanmadığı kitapları ihtiyaç sahibine verir; metin niyeti ve ne kadar övgü istediği hakkında hiçbir açıklama yapmaz.",
      prompt: "Hangi sonuç doğrudan desteklenir?",
      options: [
        "Somut imkân paylaşımı vardır; samimiyet hakkında kesin hüküm için veri eksiktir.",
        "İhlas kesin olarak kanıtlanmıştır.",
        "Riyâ kesin olarak kanıtlanmıştır.",
        "Hiç paylaşım olmamıştır.",
        "Kıtal kesin gerçekleşmiştir.",
      ],
      reasons: [
        "Aktarım açık, niyet belirtilmemiştir.",
        "İç amaç verilmemiştir.",
        "Gösteriş amacı da yoktur.",
        "Kitap verme açıkça gerçekleşir.",
        "Savaş verisi bulunmaz.",
      ],
      knowledge: ["Eylem kanıtı niyetin bütününü otomatik belirlemez."],
      strategy:
        "Ne aktarıldığını ve niyetin verilip verilmediğini ayrı kontrol et.",
      steps: [
        "Kitaplar ihtiyaç sahibine verilmiştir.",
        "Bu somut imkân aktarımıdır.",
        "Niyet cümlesi bulunmadığından ihlas veya riyâ hakkında kesinlik eklenemez.",
      ],
      commonError:
        "Her bağıştan ihlası veya her görünür bağıştan riyâyı kesin çıkarmak.",
      check: "Cevabın aktarılan kitabı koruyup eksik niyeti açık bırakıyor mu?",
    },
    {
      passage:
        "Kehf 107–108’in öğretim özeti, iman edip yararlı işler yapanlar için ödül temasını verir.",
      prompt: "Hangi yorum parçanın iki öğesini de korur?",
      options: [
        "İnanç ve iyi eylem birlikte anılmaktadır.",
        "Yalnız düşünce vardır, hiç iş yoktur.",
        "Yalnız uygulama tıklaması dinî sonucu garanti eder.",
        "Bütün insanların bütün davranışları eşittir.",
        "Pasaj bir kimya formülüdür.",
      ],
      reasons: [
        "İman ve yararlı iş açıkça birlikte verilir.",
        "Yararlı işler açıkça anılmıştır.",
        "Uygulama davranışı böyle sonuç üretmez.",
        "Böyle evrensel hüküm verilmez.",
        "Dinî mesaj özeti nicel deney değildir.",
      ],
      knowledge: [
        "Ayet yorumunda birlikte verilen iki koşuldan birini silmek kapsamı bozar.",
      ],
      strategy: "İman ve yararlı işi iki ayrı kanıt olarak tut.",
      steps: [
        "Özette iman etme bulunur.",
        "Aynı özette yararlı işler yapma da vardır.",
        "Doğru yorum ikisini birlikte anan seçenektir.",
      ],
      commonError: "İlk koşulu görüp eylem boyutunu bütünüyle atlamak.",
      check: "Cevabında hem inanç hem iş sözcüğünün karşılığı var mı?",
    },
    {
      passage:
        "Kehf 109’da denizler mürekkep olsa da Allah’ın sözlerinin tükenmeyeceği benzetmesi ele alınır.",
      prompt: "Dersin açıklamasına göre benzetmenin ana işlevi nedir?",
      options: [
        "İlahî ilim ve hikmetin tükenmezliğini anlatmak",
        "Deniz suyunun mürekkep formülünü vermek",
        "Bütün kitapların kesin sayısını ölçmek",
        "Yeni bir göl yapım projesi sunmak",
        "İnsanın bütün bilgiyi zaten bildiğini söylemek",
      ],
      reasons: [
        "Sonlu deniz imkânı ile tükenmezlik karşılaştırılır.",
        "Kimyasal bileşim belirtilmez.",
        "Nicel kitap toplamı yoktur.",
        "Mühendislik projesi anlatılmaz.",
        "Özne ve bilgi kapsamı insan lehine çevrilmez.",
      ],
      knowledge: [
        "Benzetmenin nesnesi fiziksel hesap verisi olmak zorunda değildir.",
      ],
      strategy: "Karşılaştırılan sonlu imkân ile tükenmez anlamı ayır.",
      steps: [
        "Nesne denizlerin mürekkep olmasıdır.",
        "Vurgu buna rağmen sözlerin tükenmemesidir.",
        "Bu yapı sınırsız ilim-hikmet temasını anlatır; formül veya kitap sayısı vermez.",
      ],
      commonError:
        "Benzetmedeki fiziksel nesneden verilmeyen nicel sonuç türetmek.",
      check: "Seçimin ayetin anlam vurgusunu mu, olmayan ölçümü mü anlatıyor?",
    },
    {
      passage:
        "Kehf 110’un özeti, elçinin insan oluşunu, vahiy almasını, yararlı iş yapmayı ve kullukta ortak koşmamayı birlikte verir.",
      prompt: "Hangisi bu özetten çıkarılamaz?",
      options: [
        "Elçinin hiçbir insani özelliğe sahip olmadığı",
        "Vahiy yönünün bulunduğu",
        "Yararlı işin anıldığı",
        "Kullukta ortak koşmama ilkesi bulunduğu",
        "İnsan oluşuyla elçilik yönünün birlikte verildiği",
      ],
      reasons: [
        "İnsan oluşu açıkça belirtilir.",
        "Vahiy alma doğrudan verilir.",
        "Özette açıkça vardır.",
        "Tevhid yönü belirtilmiştir.",
        "İlk iki öğe aynı kişide anlatılır.",
      ],
      knowledge: [
        "Kehf 110 insani yön ve vahiy görevini birbirini yok saymadan birleştirir.",
      ],
      strategy: "Olumsuz kökte açık veriye ters düşen ek yargıyı bul.",
      steps: [
        "Metin elçinin insan olduğunu söyler.",
        "Aynı metin vahiy ve iyi işleri de içerir.",
        "İnsani özelliği bütünüyle yok sayan seçenek bu açık bilgiyle çelişir.",
      ],
      commonError: "Peygamberlik yönünden insan oluşunu tümden silmek.",
      check: "İnsan oluşu bilgisini seçeneğe karşı kontrol ettin mi?",
    },
    {
      passage:
        "Bir metin doğru yola yönelmeyi, samimi niyeti ve sorumlulukla yanlışlardan sakınmayı anlatır. Sonra yeni cümle eklenir: “Elindeki aracı ihtiyaç sahibiyle paylaştı.”",
      prompt:
        "Ek cümle hangi kavram için önceden eksik olan somut kanıtı sağlar?",
      options: [
        "İnfak",
        "Kıtal",
        "Riyâ kesin",
        "Bilgisizlik kesin",
        "Hiçbir şey değişmemiştir.",
      ],
      reasons: [
        "Yeni cümle imkân aktarımını açıkça ekler.",
        "Araç paylaşımı silahlı savaş değildir.",
        "Övgü amacı eklenmemiştir.",
        "Böyle bir veri yoktur.",
        "Paylaşım fiili yeni bilgi olarak gelmiştir.",
      ],
      knowledge: [
        "Yeni öncül önceki kanıt boşluğunu doldurabilir; cevap yeniden değerlendirilmelidir.",
      ],
      strategy: "Eklenen tek yeni fiili önceki metinle karşılaştır.",
      steps: [
        "İlk metin yöneliş, niyet ve sakınmayı verir ama aktarım içermez.",
        "Ek cümlede bir araç ihtiyaç sahibine paylaşılır.",
        "Bu yeni kaynak aktarımı infak için doğrudan kanıt oluşturur.",
      ],
      commonError:
        "Önceki “infak yok” cevabını yeni bilgi geldikten sonra da korumak.",
      check: "Eklenen cümlede ne aktarıldığını açıkça belirttin mi?",
    },
  ],
  [
    {
      passage:
        "Bir düşünür “Evreni yaratan aşkın bir Tanrı vardır.” der; vahiy hakkında ayrıca konuşmaz.",
      prompt: "Bu cümle hangi genel konumu doğrudan destekler?",
      options: [
        "Teizm",
        "Ateizm",
        "Deizmin bütün ayrıntıları kesin",
        "Yalnız laik kurum tasarımı",
        "Kesin materyalizm",
      ],
      reasons: [
        "Tanrı’nın varlığı açıkça kabul edilmektedir.",
        "Tanrı inancının reddi değil kabulü verilmiştir.",
        "Vahiy ve müdahale tutumu verilmemiştir.",
        "Kamu kurumu hakkında önerme yoktur.",
        "Aşkın yaratıcı kabulü yalnız maddi gerçeklik iddiası değildir.",
      ],
      knowledge: [
        "Tanrı varlığını kabul eden genel konum, bütün özel vahiy görüşlerini tek başına belirlemez.",
      ],
      strategy: "Açık varlık önermesini eksik ayrıntılardan ayır.",
      steps: [
        "Cümle aşkın yaratıcının varlığını kabul eder.",
        "Vahiy hakkında ikinci önerme bulunmaz.",
        "Genel teizm desteklenir; kesin deizm veya özel din ayrıntısı eklenmez.",
      ],
      commonError: "Yaratıcı kabulünden otomatik vahiy reddi çıkarmak.",
      check: "Cevabın yalnız açık “vardır” yargısına mı dayanıyor?",
    },
    {
      passage:
        "Bir metin “Yaratıcı evreni var etmiştir; fakat vahiy göndermemiş ve doğaüstü müdahalede bulunmamıştır.” görüşünü aktarır.",
      prompt: "Ders tanımlarında en ayırt edici yaklaşım hangisidir?",
      options: [
        "Deizm",
        "Ateizm",
        "Yalnız agnostisizm",
        "Yalnız kamu laikliği",
        "Politeizm kesin",
      ],
      reasons: [
        "Yaratıcı kabulüyle vahiy-müdahale reddi birlikte verilmiştir.",
        "Yaratıcı yokluğu değil varlığı kabul edilir.",
        "Metin kesin bilgi çekincesi değil belirli görüş bildirir.",
        "Kamu kurumlarına ilişkin öneri yoktur.",
        "Birden çok tanrı verisi yoktur.",
      ],
      knowledge: [
        "Deizmi ayıran tipik koşul yaratıcı kabulüyle vahiy ve müdahale konusundaki tutumun birleşmesidir.",
      ],
      strategy: "İki koşulu ayrı işaretleyip birlikte değerlendir.",
      steps: [
        "İlk önerme yaratıcıyı kabul eder.",
        "İkinci önerme vahiy ve müdahaleyi reddeder.",
        "Bu çift deizmin ayırt edici tanımına uyar; ateizm seçilemez.",
      ],
      commonError: "Vahiy reddini Tanrı yokluğu olarak çevirmek.",
      check: "Doğru seçenek her iki önermeyi birlikte açıklıyor mu?",
    },
    {
      passage:
        "Bir kişi “Yaratıcıya inanıyorum; vahiy konusunda henüz bir karara varmadım.” diyor.",
      prompt: "Bu söz deizmi kesin kanıtlar mı?",
      options: [
        "Hayır; kararsızlık, vahiy reddiyle aynı değildir.",
        "Evet; her yaratıcı kabulü zorunlu deizmdir.",
        "Evet; kararsızlık kesin ret demektir.",
        "Kişi kesin hiçbir şeye inanmaz.",
        "Kamu düzeni konusunda bütün görüşleri bellidir.",
      ],
      reasons: [
        "Ayırt edici ret koşulu verilmemiştir.",
        "Genel kabul özel vahiy tutumunu belirlemez.",
        "Kiplerin anlamı farklıdır.",
        "Yaratıcı inancı açıkça belirtilmiştir.",
        "Kamu kurumu verisi yoktur.",
      ],
      knowledge: [
        "Bilgi eksikliği veya kararsızlık, belirli bir karşıt iddianın kabulü değildir.",
      ],
      strategy: "Karar vermeme kipini ret kipine dönüştürme.",
      steps: [
        "Yaratıcı kabulü açık bir veridir.",
        "Vahiy hakkında ise karar verilmediği söylenir.",
        "Ret koşulu bulunmadığı için kesin deizm sonucu çıkmaz.",
      ],
      commonError: "“Henüz karar yok” ifadesini “kesinlikle yok” yapmak.",
      check: "Cevabın kararsızlık derecesini aynı bırakıyor mu?",
    },
    {
      passage:
        "Bir düşünür “Tanrı’nın varlığı veya yokluğu üzerine kesin bilgi elde etmenin mümkün olduğunu düşünmüyorum.” der.",
      prompt: "Merkezdeki yaklaşım hangisidir?",
      options: [
        "Agnostisizm",
        "Kesin ateistik yokluk iddiası",
        "Kesin çoktanrıcılık",
        "Yalnız materyalist ontoloji",
        "Yalnız teknolojik kapasite artışı",
      ],
      reasons: [
        "İddia bilgiye erişimin sınırı hakkındadır.",
        "Cümle doğrudan yoktur demiyor.",
        "Birden çok tanrı kabulü yoktur.",
        "Madde dışında gerçeklik hakkında açık yargı bulunmaz.",
        "İnsan geliştirme teknolojisi sorulmuyor.",
      ],
      knowledge: [
        "Agnostisizm bilme imkânıyla, ateistik yokluk iddiası ise varlık yargısıyla ayırt edilir.",
      ],
      strategy: "Yüklemin “bilmek” mi “var olmak” mı olduğunu bul.",
      steps: [
        "Cümlenin son yargısı kesin bilgiye erişilememesidir.",
        "Tanrı vardır veya yoktur diye doğrudan sonuç bildirilmez.",
        "Bu nedenle bilgi sınırı yaklaşımı agnostisizmdir.",
      ],
      commonError: "Bilinemez sözcüğünü yoktur diye yeniden yazmak.",
      check: "Seçimin bilgi yüklemini koruyor mu?",
    },
    {
      passage:
        "Bir öğrenci “Tanrı hakkında kesin bilgiye ulaşamayız diyorsa, mutlaka sayısal olarak varlığa yüzde 50, yokluğa yüzde 50 veriyordur.” der.",
      prompt: "Bu yorum nasıl değerlendirilir?",
      options: [
        "Zorunlu değildir; bilgi çekincesi sayısal olasılık eşitliği vermez.",
        "Her bilgi çekincesi matematiksel olarak yarı yarıyadır.",
        "Agnostisizm yalnız çoktanrıcılıktır.",
        "Yüzdeler metinde açıkça verilmiştir.",
        "Kesin bilgi yoksa hiçbir önerme kurulamaz.",
      ],
      reasons: [
        "Kesin bilgi yokluğu belirli yüzde hesabı değildir.",
        "Böyle bir matematiksel kural yoktur.",
        "Konu bilgi sınırıdır.",
        "Cümlede oran yoktur.",
        "Sınırlı veya çekinceli önerme kurulabilir.",
      ],
      knowledge: [
        "Kesinlik ve olasılık aynı ölçü değildir; verilmeyen oran çıkarılmaz.",
      ],
      strategy:
        "Sayısal iddia için ayrıca sayısal öncül arayıp bulamadığını belirt.",
      steps: [
        "Öncül yalnız kesin bilgiye çekince koyar.",
        "Eşit olasılık veya yüzde değeri ayrıca verilmez.",
        "Bu nedenle 50–50 zorunluluğu eklenmiş bilgidir.",
      ],
      commonError: "Felsefi bilgi sınırını uydurma olasılık hesabına çevirmek.",
      check: "Yüzdeyi destekleyen gerçek bir sayı verisi var mı?",
    },
    {
      passage: "Bir metin “Tanrı yoktur.” iddiasını açıkça ileri sürer.",
      prompt: "Bu cümle hangi yargı türündedir?",
      options: [
        "Varlığa ilişkin ateistik yokluk iddiası",
        "Yalnız bilgiye erişim konusunda çekince",
        "Teistik kabul",
        "Yalnız kurum tarafsızlığı",
        "Yalnız insan yetisi geliştirme",
      ],
      reasons: [
        "Doğrudan var olmama önermesi kurulmuştur.",
        "Yoktur ile bilemeyiz aynı değildir.",
        "Varlık kabulü değil ret vardır.",
        "Kamu kurumu konusu yoktur.",
        "Teknoloji verisi yoktur.",
      ],
      knowledge: [
        "Ateizmin bazı biçimleri Tanrı’nın yokluğunu açık bir iddia olarak savunur.",
      ],
      strategy: "Doğrudan yargının nesnesini ve olumlu-olumsuz yönünü belirle.",
      steps: [
        "Nesne Tanrı’nın varlığıdır.",
        "Yüklem doğrudan yokluktur, kesin bilgiye çekince değildir.",
        "Bu örnek ateistik yokluk iddiası olarak sınıflanır.",
      ],
      commonError:
        "Doğrudan varlık reddini yalnız kararsızlık diye yumuşatmak.",
      check: "Cevabın cümlenin olumsuz varlık yargısını aynen koruyor mu?",
    },
    {
      passage:
        "Bir metin “Bütün gerçekliğin temeli maddi veya fizikseldir; bağımsız fizikötesi alan kabul etmiyorum.” der.",
      prompt: "Bu hangi eksen ve yaklaşımla ilişkilidir?",
      options: [
        "Varlık ekseni–materyalizm",
        "Yalnız bilgi ekseni–agnostisizm",
        "Yalnız siyasal eksen–laiklik",
        "Yalnız niyet–ihlas",
        "Yalnız sayısal coğrafya",
      ],
      reasons: [
        "Gerçekliğin ne olduğu hakkında maddi temel iddiasıdır.",
        "Tanrı bilgisine çekince verilmemiştir.",
        "Kamu düzeni konusu yoktur.",
        "Kulluk niyeti sorulmuyor.",
        "Konum veya ölçüm yoktur.",
      ],
      knowledge: [
        "Materyalizm varlığın temel yapısına ilişkin ontolojik görüştür.",
      ],
      strategy: "Gerçekliğin yapısı sorusunu bilgi yöntemi sorusundan ayır.",
      steps: [
        "Metin bütün gerçekliğin temelini tanımlar.",
        "Bu temel maddi/fiziksel olarak belirlenir.",
        "Dolayısıyla ontoloji ve materyalizm eşleşmesi desteklenir.",
      ],
      commonError:
        "Madde kelimesini gören her cümleyi deney yöntemi sorusu sanmak.",
      check: "Seçimin “ne vardır?” sorusunu mu yanıtlıyor?",
    },
    {
      passage:
        "Bir araştırmacı laboratuvarda deney yapıyor; kişisel dünya görüşü hakkında hiçbir cümle verilmiyor.",
      prompt: "Hangisi bu bilgiden zorunlu çıkarılamaz?",
      options: [
        "Araştırmacının bütün gerçekliği yalnız maddeden ibaret saydığı",
        "Bir laboratuvar etkinliği yürüttüğü",
        "Deney yaptığı",
        "Dünya görüşü hakkında açıklama verilmediği",
        "Bir araştırma eylemi anlatıldığı",
      ],
      reasons: [
        "Deney yapma eylemi kapsamlı ontolojik inanç bildirmez.",
        "Bu açıkça verilmiştir.",
        "Doğrudan veri budur.",
        "Parça bunu açıkça söyler.",
        "Araştırmacı deney yapmaktadır.",
      ],
      knowledge: [
        "Bilimsel yöntem kullanımı kişinin bütün metafizik görüşünü otomatik belirlemez.",
      ],
      strategy: "Somut meslek eylemiyle ek dünya görüşü iddiasını ayrı tut.",
      steps: [
        "Verilen tek eylem deney yapmaktır.",
        "Kişisel varlık görüşü metinde belirtilmez.",
        "Bu yüzden materyalist ontoloji sonucu zorunlu değildir.",
      ],
      commonError: "Bilimle uğraşmayı tek zorunlu inanç kimliği saymak.",
      check: "Seçtiğin çıkarım metinde olmayan dünya görüşünü mü ekliyor?",
    },
    {
      passage:
        "Bir görüş, güvenilir bilgide gözlem, olgu ve deneysel sınamayı merkez alır.",
      prompt: "Bilgi ölçütü bakımından hangi yaklaşım öne çıkar?",
      options: [
        "Pozitivizm",
        "Yalnız transhümanizm",
        "Yalnız infak",
        "Kesin çoktanrıcılık",
        "Yalnız fıkhi miras",
      ],
      reasons: [
        "Olgu ve deney vurgusu ders tanımında bu yaklaşımla ilişkilidir.",
        "İnsan kapasitesini teknolojiyle artırma hedefi verilmez.",
        "Kaynak paylaşımı sorulmaz.",
        "Tanrı sayısı iddiası yoktur.",
        "Hukuki uygulama şartı verilmez.",
      ],
      knowledge: [
        "Pozitivizm bilginin olgu ve gözleme dayandırılmasını öne çıkaran felsefi yaklaşımdır.",
      ],
      strategy: "Önermenin bilgiyi hangi ölçütle kabul ettiğine bak.",
      steps: [
        "Metin bilgi için gözlem ve sınamayı esas alır.",
        "Bu bir bilgi yöntemi vurgusudur.",
        "Ders karşılaştırmasında pozitivizm öne çıkar; başka eksen eklenmez.",
      ],
      commonError:
        "Bilgi yöntemi sorusuna mal paylaşımı veya teknoloji hedefiyle cevap vermek.",
      check: "Cevabın bilgi kabul ölçütünü açıklıyor mu?",
    },
    {
      passage:
        "Bir ders Comte’un düşünce tarihini teolojik, metafizik ve pozitif evrelerle açıkladığını anlatır.",
      prompt: "Bu sunum nasıl sınırlandırılmalıdır?",
      options: [
        "Bir düşünürün tarih ve bilgi modeli olarak",
        "Bütün insanlığın deneyle kesin aynı sırayı tamamladığının kanıtı olarak",
        "Bütün dinlerin tek kitap olduğu bilgisi olarak",
        "Kesin sınav takvimi olarak",
        "Bir kimyasal denklem olarak",
      ],
      reasons: [
        "Bu evreler Comte’un yaklaşımını anlatır; tek zorunlu bilimsel tarih değildir.",
        "Modelin anlatılması bu küresel ölçümü vermez.",
        "Konu bu değildir.",
        "Tarih modeli sınav tarihi değildir.",
        "Kavramsal tarih evreleri kimyasal veri değildir.",
      ],
      knowledge: [
        "Bir teoriyi öğretmek, onun bütün iddialarını kanıtlanmış olgu diye aktarmak değildir.",
      ],
      strategy: "Model sahibi ve ileri sürdüğü açıklamayı ayrı belirt.",
      steps: [
        "Evreler açıkça Comte’un açıklamasına bağlanır.",
        "Bu bağ bir düşünce modelini tanıtır.",
        "Bütün toplumlarda zorunlu gerçekleşmiş deney sonucu diye genellenemez.",
      ],
      commonError:
        "Bir düşünürün şemasını bütün tarihin doğrulanmış tek seyri saymak.",
      check: "Sunumunda “Comte’un modeli” ifadesi korunuyor mu?",
    },
    {
      passage:
        "Bir kişi “Tanrı’ya inanıyorum; devlet okulları bütün inançlara eşit mesafede olmalıdır.” der.",
      prompt: "Bu ifadeler zorunlu çelişki midir?",
      options: [
        "Hayır; kişisel inanç ve kamu kurumu düzeni farklı eksenlerdir.",
        "Evet; tarafsız kurum isteyen herkes ateisttir.",
        "Evet; teizm yalnız okul binası demektir.",
        "Hayır; çünkü iki cümle tam aynı anlamdadır.",
        "Kişi hiçbir inanç beyanında bulunmamıştır.",
      ],
      reasons: [
        "Teistik kabul ile tarafsız kurum tercihi birlikte bulunabilir.",
        "Kurumsal tercih kişisel yokluk inancını gerektirmez.",
        "Terim yanlış tanımlanmıştır.",
        "Aynı olmaları değil farklı eksenler olmaları önemlidir.",
        "Tanrı’ya inandığını açıkça söyler.",
      ],
      knowledge: [
        "Laiklik ve seküler kurum tercihi, kişinin Tanrı inancını tek başına belirlemez.",
      ],
      strategy: "İlk cümleyi inanç, ikincisini kurum sütununa yerleştir.",
      steps: [
        "İlk cümle Tanrı’ya açık inançtır.",
        "İkinci cümle devlet okulunun tarafsızlığına ilişkindir.",
        "Farklı sorulara cevap verdikleri için zorunlu çelişki yoktur.",
      ],
      commonError:
        "Kamu düzenini kişisel metafizik inancın eş anlamlısı yapmak.",
      check:
        "Her cümlenin hangi farklı soruyu cevapladığını gösterebiliyor musun?",
    },
    {
      passage:
        "Bir metin “Değerlerin evrensel ve nesnel temeline inanmıyorum.” der; Tanrı’nın varlığını tartışmaz.",
      prompt: "Hangi sonuç uygundur?",
      options: [
        "Değer ekseninde nihilizmle ilişkili bir tutum vardır; Tanrı görüşü ayrıca verilmemiştir.",
        "Tanrı’nın yokluğu kesin kanıtlanmıştır.",
        "Kişi kesin bütün bilimleri reddeder.",
        "Söz yalnız fiziksel kütleyi ölçer.",
        "Bütün nihilizm türleri zorunlu aynı tek tezdir.",
      ],
      reasons: [
        "Nesnel değer reddiyle varlık iddiası ayrılmıştır.",
        "Metin Tanrı hakkında önerme kurmaz.",
        "Bilim reddi belirtilmez.",
        "Değer temeli nicel kütle değildir.",
        "Bir boyut bütün türleri özdeş yapmaz.",
      ],
      knowledge: [
        "Nihilizmin değer, anlam, bilgi veya siyasetle ilgili farklı kullanımları olabilir.",
      ],
      strategy: "Reddedilen nesneyi açıkça yaz ve başka reddi ekleme.",
      steps: [
        "Reddedilen şey değerlerin nesnel temelidir.",
        "Bu, değer alanındaki nihilist tutumla ilişkilidir.",
        "Tanrı veya bütün bilimler hakkında ek önerme yoktur.",
      ],
      commonError:
        "Tek değer reddinden bütün inanç ve kişilik profilini çıkarmak.",
      check: "Sonucun yalnız verilen değer önermesiyle sınırlı mı?",
    },
    {
      passage:
        "Bir düşünce, bilim ve teknolojiyle insanın bilişsel ve bedensel yetilerini geliştirmeyi savunur; Tanrı konusunda bir yargı vermez.",
      prompt: "Hangi yorum desteklenir?",
      options: [
        "Transhümanizm hedefi vardır; ateizm sonucu zorunlu değildir.",
        "Kesin ateisttir.",
        "Kesin vahyi kabul eder.",
        "Yalnız miras hükmü tartışılır.",
        "Teknolojiden hiç söz edilmez.",
      ],
      reasons: [
        "Kapasite geliştirme hedefi açık, Tanrı görüşü yoktur.",
        "Tanrı reddi verilmemiştir.",
        "Vahiy bilgisi de yoktur.",
        "Konu insan kapasitesi ve teknolojidir.",
        "Teknoloji açık veridir.",
      ],
      knowledge: [
        "Transhümanizm insan yetilerinin teknolojik geliştirilmesine odaklanır; tek zorunlu inanç konumu bildirmez.",
      ],
      strategy: "Hedefi ve ayrıca söylenmeyen inancı ayır.",
      steps: [
        "Hedef insan kapasitesini artırmaktır.",
        "Araç bilim ve teknoloji olarak belirtilir.",
        "Bu transhümanizmle ilişkilidir; Tanrı hakkında sonuç için ayrı öncül gerekir.",
      ],
      commonError: "Teknoloji hedefinden otomatik Tanrı reddi çıkarmak.",
      check:
        "Seçtiğin yorum teknolojiyi koruyup eksik inanç bilgisini açık bırakıyor mu?",
    },
    {
      passage:
        "Bir tartışma “Mutlak iyi, bilgili ve güçlü Tanrı anlayışıyla masumların acı çekmesi nasıl bağdaştırılır?” sorusunu ele alır.",
      prompt: "Araştırılan problem hangisidir?",
      options: [
        "Kötülük problemi",
        "Yalnız dil kökeni problemi",
        "Yalnız fıkhi sözleşme",
        "Yalnız gezegen yörüngesi",
        "Sadece grup yaşı",
      ],
      reasons: [
        "İlahî niteliklerle acı arasındaki görünür gerilim sorgulanır.",
        "Sözcük kökeni araştırılmıyor.",
        "Hukuki işlem şartı yoktur.",
        "Fiziksel yörünge hesabı yoktur.",
        "Topluluk kuruluş tarihi sorulmaz.",
      ],
      knowledge: [
        "Kötülük problemi bir felsefi sorgulamadır; tek soru bütün cevapları zorunlu belirlemez.",
      ],
      strategy: "İki karşılaştırılan öğeyi ve aranan uyumu çıkar.",
      steps: [
        "İlk öğe Tanrı’nın iyilik, bilgi ve kudret nitelikleridir.",
        "İkinci öğe dünyadaki acıdır.",
        "Bu ikisinin nasıl uzlaştırılacağı kötülük problemi adını alır.",
      ],
      commonError:
        "Soruyu sormanın otomatik belirli inanç cevabını kanıtladığını sanmak.",
      check: "Tanımında hem ilahî nitelikler hem acı yer alıyor mu?",
    },
    {
      passage:
        "Şiddetli bir fırtına zarar verir; sonrasında bir görevli yardım malzemelerini bilerek çalar.",
      prompt: "İki olay nasıl sınıflandırılır?",
      options: [
        "Doğal olayın zararı–ahlaki kötülük",
        "İkisi de yalnız doğal olaydır.",
        "İkisi de aynı kişinin kasıtlı hava üretimidir.",
        "İlkinde hiç zarar yoktur.",
        "İkinci olayda hiçbir tercih yoktur.",
      ],
      reasons: [
        "İlkinde doğa süreci, ikincisinde iradeli zarar vardır.",
        "Bilerek çalma insan fiilidir.",
        "Fırtınayı kişinin ürettiği söylenmez.",
        "Zarar verildiği açıkça söylenir.",
        "Bilerek ifadesi iradeyi belirtir.",
      ],
      knowledge: [
        "Kötülük türünü belirlerken doğrudan neden ve insan tercihi ayrı incelenir.",
      ],
      strategy: "İki olayı tek senaryo olduğu için birleştirme.",
      steps: [
        "Fırtına doğa süreci olarak verilir.",
        "Çalma, bir görevlinin bilerek yaptığı fiildir.",
        "İlk zarar doğal, ikinci eylem ahlaki kötülük bağlamında ayrılır.",
      ],
      commonError:
        "Doğal afet sırasında yapılan insan eylemini de doğal saymak.",
      check: "İkinci olayın “bilerek” verisi sınıflamanda kullanıldı mı?",
    },
    {
      passage:
        "Bir sav, insanların anlamlı seçim yapabilmesini, yanlış seçimin de mümkün olmasıyla ilişkilendirir.",
      prompt: "Bu sav için en doğru sınır nedir?",
      options: [
        "Ahlaki kötülüğe yönelik özgür irade cevabıdır; her doğal olayın tüm açıklaması değildir.",
        "Her özgür kişi her zaman kötülük yapmak zorundadır.",
        "Bütün depremleri tek kişinin tercihi üretir.",
        "Özgürlük hiçbir seçim içermez.",
        "Sav deneyle bütün felsefeyi bitirmiştir.",
      ],
      reasons: [
        "İnsan tercihiyle ilişkili savın kapsamı korunur.",
        "Mümkünlük zorunluluk değildir.",
        "Doğal neden için böyle veri yoktur.",
        "Savın temel öncülü ters çevrilir.",
        "Felsefi açıklama böyle küresel deney sonucu değildir.",
      ],
      knowledge: [
        "Özgür irade cevabı seçimin imkânını tartışır; yanlış tercihin her zaman gerçekleşmesini zorunlu kılmaz.",
      ],
      strategy: "Mümkünlük ve zorunluluk kiplerini ayır.",
      steps: [
        "Sav yanlış seçimin mümkün olduğunu söyler.",
        "Bu ilişki insanın iradeli eylemlerine yöneliktir.",
        "Her kişi her zaman veya bütün doğal olaylar genellemeleri kapsamı aşar.",
      ],
      commonError: "“Olabilir” ifadesini “mutlaka her zaman olur” yapmak.",
      check: "Sonucun ahlaki eylem kapsamını ve mümkünlük kipini koruyor mu?",
    },
    {
      passage:
        "Bir metin, güçlükleri imtihan ve insan bilgisinin sınırı çerçevesinde tartışan dinî-felsefi cevapları tanıtır.",
      prompt: "Hangisi bu tanıtımdan çıkarılamaz?",
      options: [
        "Acı yaşayan her kişinin mutlaka bir suçunun kanıtlandığı",
        "Farklı gerekçelendirme yolları bulunduğu",
        "Cevapların dinî-felsefi çerçevede tartışıldığı",
        "İnsan bilgisinin sınırlılığına başvurulduğu",
        "Bir açıklama biçiminin tanıtıldığı",
      ],
      reasons: [
        "Felsefi yorum gerçek kişiye otomatik suç veya inanç teşhisi koymaz.",
        "İmtihan ve bilgi sınırı ayrı yollar olarak anılır.",
        "Metin bunu açıkça söyler.",
        "Açık veridir.",
        "Tanıtım yapıldığı belirtilir.",
      ],
      knowledge: [
        "Kötülük problemine cevap tanıtmak, mağdurları suçlayan kişisel hüküm değildir.",
      ],
      strategy:
        "Genel görüş açıklamasını gerçek kişiye atanan kesin nedenden ayır.",
      steps: [
        "Metin imtihan ve bilgi sınırı yorumlarını tanıtır.",
        "Hiçbir mağdurun belirli suçu hakkında kanıt vermez.",
        "Bu nedenle herkesin suçlu olduğu sonucu eklenemez.",
      ],
      commonError:
        "Felsefi açıklamayı afetzedenin kişisel kusur belgesi saymak.",
      check:
        "Olumsuz seçeneğin gerçek kişiler hakkında verilmeyen suç hükmü eklediğini gördün mü?",
    },
    {
      passage:
        "Yeni kurulmuş bir dinî toplulukta katılım gönüllüdür, ayrılmak serbesttir ve hesaplar açıktır. Yalnız kuruluş tarihi yenidir.",
      prompt: "Bu bilgilerden hangi yorum uygundur?",
      options: [
        "Yalnız yeni olması istismar kanıtı değildir.",
        "Her yeni grup zorunlu suç işler.",
        "Yeni kelimesi doğrudan silahlı şiddet demektir.",
        "Bir açık hesap bütün faaliyetlerin sonsuza dek kusursuzluğunu garanti eder.",
        "Üyeler kesin zorla tutulmaktadır.",
      ],
      reasons: [
        "Yaş bilgisi tehdit veya aldatma eylemi yerine geçmez.",
        "Verilen davranışlar böyle genellemeyi desteklemez.",
        "Tanım böyle değildir.",
        "Tek olumlu örnek de sınırsız garanti vermez.",
        "Serbest ayrılma açıkça verilmiştir.",
      ],
      knowledge: [
        "Yeni dinî hareket betimleyici başlıktır; istismar somut davranışla değerlendirilir.",
      ],
      strategy: "Yaş bilgisini katılım ve şeffaflık verilerinden ayrı tut.",
      steps: [
        "Tek yenilik kuruluş zamanıdır.",
        "Verilen uygulamalar gönüllülük ve açıklıktır.",
        "Bu yüzden sırf yeni oluşundan istismar sonucu çıkmaz; kusursuzluk garantisi de verilmez.",
      ],
      commonError:
        "Bir grubun yaşını zararlı davranışın doğrudan kanıtı yapmak.",
      check:
        "Hükmün grup etiketi yerine gerçek davranış verilerine mi dayanıyor?",
    },
    {
      passage:
        "Bir topluluk, ayrılmak isteyeni tehdit ediyor ve zorunlu bağışları kişisel çıkar için saklıyor. Kendisini eski bir gelenek olarak tanıtıyor.",
      prompt: "Değerlendirmede belirleyici kanıt hangisidir?",
      options: [
        "Tehdit ve çıkar için mali zorlama",
        "Yalnız eski olması",
        "Her farklı ritüelin zararlı olması",
        "Liderin isminin uzunluğu",
        "Hiçbir eylem bulunmaması",
      ],
      reasons: [
        "İstismar riski somut eylemlerden kaynaklanır.",
        "Yaş, zorlamayı geçersiz kılmaz.",
        "Ritüel farkı değil tehdit ve para ilişkisi verilmiştir.",
        "İsim uzunluğu kanıt değildir.",
        "İki somut eylem açıkça anlatılır.",
      ],
      knowledge: [
        "Din istismarı, inançların çıkar veya baskı için araçsallaştırılmasıyla ilişkilidir.",
      ],
      strategy: "Etiketi çıkarıp somut eylemleri yeniden oku.",
      steps: [
        "İlk eylem ayrılmak isteyene tehdittir.",
        "İkinci eylem zorunlu parayı kişisel çıkar için saklamadır.",
        "Grubun eski olduğu beyanı bu eylemlerin değerlendirilmesini ortadan kaldırmaz.",
      ],
      commonError:
        "Eski gelenek etiketinin somut zararı otomatik akladığını sanmak.",
      check:
        "Gerekçen tarih etiketine değil tehdit ve çıkar fiillerine mi bağlı?",
    },
    {
      passage:
        "En’âm 59’un öğretim özeti, gaybın bilgisi ve yerde-denizde olanların Allah’ın bilgisi kapsamında ele alınmasını anlatır.",
      prompt: "Bu parçadan hangisi çıkarılamaz?",
      options: [
        "Her öğrencinin gelecek sınav puanını kendiliğinden bildiği",
        "İlahî ilim temasının bulunduğu",
        "Gayb kavramının anıldığı",
        "Yerde ve denizde olanlardan söz edildiği",
        "Bilginin öznesinin Allah olduğu",
      ],
      reasons: [
        "İlahî bilgi insanın sınırsız önbilgisine çevrilemez.",
        "Bilgi kapsamı özette açıkça verilir.",
        "İlk öğe budur.",
        "Özette yer alır.",
        "Metin bunu açıkça belirler.",
      ],
      knowledge: ["Bir özneye ait nitelik, başka özneye otomatik aktarılmaz."],
      strategy:
        "Bilginin kimde olduğunu her seçenekte aynı özneyle kontrol et.",
      steps: [
        "Metin ilahî bilgiye ilişkindir.",
        "Öğrencilerin geleceği bildiği söylenmez.",
        "Bu nedenle puan önbilgisi sonucu çıkarılamaz; özneyi değiştirmektedir.",
      ],
      commonError:
        "Allah’a nispet edilen bilgiyi insanın sınırsız bilgisi diye çevirmek.",
      check: "Seçeneğin öznesi metnin öznesiyle aynı mı?",
    },
    {
      passage:
        "Bir kaynak Lokman 27’de ağaç-kalem, deniz-mürekkep benzetmesini işler; başka bir kaynak Hadîd 1–5’te ilahî hükümranlık, hayat-ölüm ve bilgi vurgusunu işler.",
      prompt: "İki kaynağı birleştirirken hangi ilke korunmalıdır?",
      options: [
        "Ayet kimlikleri ve farklı bağlamlar ayrı tutulmalıdır.",
        "Benzer tema varsa sure ve ayet numarası her zaman aynıdır.",
        "Bütün ifadeler yalnız Lokman 27’dir.",
        "Bütün ifadeler yalnız Hadîd 1–5’tir.",
        "İki kaynakta bilgi teması bulunması imkânsızdır.",
      ],
      reasons: [
        "Yakın temalar ayrı ayet gruplarını aynı yapmaz.",
        "Benzerlik kimlik eşitliği değildir.",
        "İkinci kaynak farklı ayet grubunu açıkça verir.",
        "Birinci benzetme Lokman 27 olarak verilmiştir.",
        "Benzer tema farklı bağlamda bulunabilir.",
      ],
      knowledge: [
        "Kaynak sürümlerinin kapsamını genişletirken pasajların kimlik ve mesaj sınırları korunur.",
      ],
      strategy: "Her temanın yanına ait olduğu ayet grubunu yaz.",
      steps: [
        "İlk benzetme Lokman 27’ye bağlanır.",
        "İkinci grup Hadîd 1–5 olarak açıkça ayrılır.",
        "Bu nedenle tematik ilişki kurulabilir ama kimlikleri tekleştirilemez.",
      ],
      commonError: "Yakın anlamlı ayetleri aynı pasajmış gibi etiketlemek.",
      check: "Cevabın her iki kaynakta verilen sure adını ayrı koruyor mu?",
    },
    {
      passage:
        "Bir değerlendirme Müslümanların bazı üyelerinin eylemini bütün Müslümanlara yükleyerek dışlamayı, ayrıca gerekçeli düşünce eleştirisini ayrı tartışıyor.",
      prompt: "Hangi ayrım doğrudur?",
      options: [
        "Kimlikten dolayı toplu dışlama, gerekçeli görüş eleştirisiyle aynı değildir.",
        "Her düşünce eleştirisi zorunlu bütün insanlara nefret demektir.",
        "Bazı kişilerin eylemi bütün mensupların karakterini kesin gösterir.",
        "Bütün toplu dışlamalar bilimsel ölçümdür.",
        "Hiçbir somut davranış incelenemez.",
      ],
      reasons: [
        "İnsanları genelleme ile dışlama ve düşünceyi tartışma farklıdır.",
        "Eleştiri ile kimlik hedefli dışlama özdeş değildir.",
        "Bu haksız genellemedir.",
        "Kimlik dışlaması böyle kanıt değildir.",
        "Gerekçeli değerlendirme mümkündür.",
      ],
      knowledge: [
        "İslamofobi ve ayrımcılık tartışmasında grup genellemesiyle fikir eleştirisi ayrılır.",
      ],
      strategy: "Eleştirinin hedefi düşünce mi insanın kimliği mi diye sor.",
      steps: [
        "Birinci durumda bazı eylemler bütün kimliğe genellenir.",
        "İkinci durumda bir görüş gerekçeyle tartışılır.",
        "İki hedef ve yöntem farklı olduğundan aynı sayılmaz.",
      ],
      commonError:
        "Bir kişinin eylemini bütün din mensuplarının zorunlu niteliği yapmak.",
      check:
        "Seçimin kimlik genellemesini onaylamadan düşünce tartışmasına alan bırakıyor mu?",
    },
  ],
];
export const forge023HumanitiesBTopics: Record<string, string> = {
  "hz-muhammed-ve-gencler": "detail-84",
  "allah-ve-insan-iliskisi": "detail-85",
  "islam-dusuncesinde-mezhepler": "detail-86",
  "kur-ana-gore-hz-muhammed": "detail-87",
  "kur-anda-gecen-bazi-kavramlar": "detail-88",
  "inanc-ile-ilgili-meseleler": "detail-89",
};
export const forge023HumanitiesBGuides: LessonGuide[] = guideSpecs023.map(
  ({ title: _title, ...g }) => g,
);
const positions023 = [
  [2, 4, 1, 2, 0, 2, 3, 3, 4, 0, 1, 1, 4, 2, 3, 0, 0, 1],
  [4, 2, 0, 2, 0, 3, 3, 1, 2, 4, 1, 0, 2, 4, 0, 3, 1, 1],
  [2, 3, 1, 4, 3, 0, 2, 3, 0, 4, 0, 4, 3, 2, 1, 1, 0, 1, 2, 4],
  [0, 2, 0, 1, 3, 1, 0, 2, 2, 4, 3, 1, 1, 4, 3, 2, 0, 4],
  [4, 2, 1, 3, 2, 3, 1, 1, 4, 3, 4, 0, 1, 2, 0, 4, 3, 0, 0, 2],
  [0, 1, 3, 3, 0, 1, 1, 3, 4, 1, 3, 2, 0, 4, 1, 2, 2, 4, 0, 2, 4, 0],
];
export const forge023HumanitiesBLessons: Lesson[] = guideSpecs023.map(
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
    questions: questionRows023[pack].map((q, i): Question => {
      const answer = positions023[pack][i];
      const rotate = <T>(a: T[]) => a.map((_, j) => a[(j - answer + 5) % 5]);
      return {
        id: `${g.id}-023-${i + 1}`,
        passage: txt(q.passage),
        prompt: txt(q.prompt),
        options: rotate(q.options).map(txt),
        answer,
        hint: txt(q.strategy),
        explanation: txt(q.steps.join(" ") + " " + q.reasons[0]),
        skill: g.id,
        guidance: {
          knowledge: q.knowledge,
          strategy: q.strategy,
          steps: q.steps,
          optionReasons: rotate(q.reasons),
          commonError: q.commonError,
          check: q.check,
        },
      };
    }),
    source: txt(g.source),
    tags: ["kaynakli-anlatim", "adim-adim", "Özgün öğretim soruları"],
  }),
);
export const humanitiesBDefaults023 = {
  person: 0,
  lens: 0,
  name: 0,
  event: 0,
  school: 0,
  field: 0,
  case: 0,
  stage: 0,
  context: 0,
  motive: 0,
  quality: 0,
  done: true,
  claim: 0,
  extra: 0,
  reason: "",
  show: false,
};
function indexB023(value: number, max: number): number {
  if (!Number.isInteger(value) || value < 0 || value >= max)
    throw new RangeError("Seçim aralığı dışında.");
  return value;
}
export type LinkB023 = {
  from: string;
  to: string;
  valid: boolean;
  evidence: string;
};
export type NodeB023 = { id: string; label: string; detail: string };
export type SceneB023 = {
  title: string;
  context: string;
  nodes: NodeB023[];
  links: LinkB023[];
  result: string;
  explanation: string;
  summary: string[];
};
const youthsB023 = [
  {
    name: "Erkam bin Ebülerkam",
    role: ["Eğitime mekân"],
    value: ["Fedakârlık", "Güvenli ortam"],
    event:
      "Evini ilk Müslümanların öğrenmesine açması, Dârülerkâm’ın eğitim ortamı olmasıyla anlatılır.",
  },
  {
    name: "Musab bin Umeyr",
    role: ["Öğreticilik", "Sancaktarlık"],
    value: ["Sabır", "Anlaşılır iletişim"],
    event:
      "Akabe görüşmeleri ardından Medine’de öğreticilik, ayrıca Uhud’da sancaktarlık görevi kaynakta ayrı ayrı bulunur.",
  },
  {
    name: "Üsame bin Zeyd",
    role: ["Komutanlık"],
    value: ["Liyakat", "Güven"],
    event:
      "Genç yaşta ordunun başına atanması, yaşı tek yeterlik ölçütü saymamayı örnekler.",
  },
  {
    name: "Muaz bin Cebel",
    role: ["Öğreticilik", "Yönetim", "Kadılık"],
    value: ["Bilgi", "Sorumluluk"],
    event:
      "Mekke ve Yemen’de öğretim, yönetim ve hukuk görevleri üstlenmesi anlatılır.",
  },
  {
    name: "Hz. Aişe",
    role: ["İlim aktarımı", "Soru ile öğrenme"],
    value: ["Merak", "Paylaşım"],
    event:
      "Doğrudan soru sorarak öğrendiği bilgiyi aktarması ve âlim kimliği kaynakta birlikte ele alınır.",
  },
  {
    name: "Hz. Fatıma",
    role: ["Aile desteği", "Yaralıya yardım", "Eğitim"],
    value: ["Dayanışma", "Paylaşım"],
    event:
      "Zor dönemlerde aileye destek, yaralılara yardım ve çocukların eğitimi ayrı faaliyetler olarak belirtilir.",
  },
  {
    name: "Esma binti Ebû Bekir",
    role: ["Hicrette destek"],
    value: ["Sorumluluk", "Metanet"],
    event:
      "Hicret sırasında babasına yardım etmesiyle tanıtılır; Esma binti Umeys ile aynı kişi değildir.",
  },
  {
    name: "Hz. Ali",
    role: ["Emanet teslimi"],
    value: ["Güven", "Fedakârlık"],
    event:
      "Hicrette emanetlerin sahiplerine ulaştırılmasını üstlenmesi, emanet sorumluluğu olarak anlatılır.",
  },
  {
    name: "Cafer bin Ebû Talib",
    role: ["Diplomatik temsil"],
    value: ["Cesaret", "Hakkı savunma"],
    event:
      "Necaşi huzurunda Müslümanların durumunu açıklayıp sığınma haklarını savunması temsil örneğidir.",
  },
];
export const youthPeopleB023 = () => youthsB023.map((p) => p.name);
export function youthSceneB023(person = 0, lens = 0): SceneB023 {
  const p = youthsB023[indexB023(person, 9)];
  indexB023(lens, 3);
  const targets =
    lens === 0
      ? [...p.role]
      : lens === 1
        ? [...p.value]
        : ["Başka roller dışlanmaz", "Ortak değer, farklı görev"];
  const nodes: NodeB023[] = [
    { id: "person", label: p.name, detail: p.event },
    ...targets.map((t, i) => ({
      id: `target-${i}`,
      label: t,
      detail:
        lens === 2
          ? "Bu harita kişinin bütün hayatının eksiksiz listesi değildir."
          : p.event,
    })),
  ];
  return {
    title: "Kişi, olay ve katkı haritası",
    context: p.event,
    nodes,
    links: targets.map((t, i) => ({
      from: "person",
      to: `target-${i}`,
      valid: true,
      evidence:
        lens === 2 ? "Örnekleme, dışlayıcı tek rol kuralı değildir." : p.event,
    })),
    result: `${p.name}: ${targets.join(" · ")}`,
    explanation:
      lens === 0
        ? "Görev alanı yapılan işten bulunur. Aynı kişi birden fazla görev alabilir."
        : lens === 1
          ? "Değerler olaydan yorumlanır; aynı değer farklı görevlerde görülebilir."
          : "Bir baskın örnek başka görevlerin hiç bulunmadığını göstermez. Ortak değer aynı tarihî kimlik değildir.",
    summary: targets,
  };
}
const namesB023 = [
  { label: "Hayy", meaning: "Diri olan", event: 0 },
  { label: "Muhyî", meaning: "Hayat veren", event: 1 },
  { label: "Musavvir", meaning: "Biçim veren", event: 2 },
  { label: "Rezzak", meaning: "Rızık veren", event: 3 },
  { label: "Şâfi", meaning: "Şifa veren", event: 4 },
  { label: "Ehad", meaning: "Bir ve eşsiz", event: 5 },
  { label: "Halık", meaning: "Yaratan", event: 6 },
  { label: "Rahman", meaning: "Merhametiyle kuşatan", event: 7 },
];
const nameEventsB023 = [
  "Metin yalnız Allah’ın diri oluşunu vurguluyor; başka bir canlıya hayat verme fiili ayrıca belirtilmiyor.",
  "Metin yeni canlıya hayat verilmesini özellikle öne çıkarıyor; öznenin diri oluşunu sormuyor.",
  "Metin varlıklara biçim ve özellik kazandırma yönünü özellikle soruyor.",
  "Metin beslenme için rızık ve imkân verilmesini özellikle öne çıkarıyor.",
  "Metin iyileşme ve şifa verme anlamını soruyor; tedaviyi bırakma önerisi getirmiyor.",
  "Metin Allah’ın bir, eşsiz ve benzersiz oluşuna odaklanıyor.",
  "Metin varlığın yaratılmasını genel anlamıyla ifade ediyor; özel biçim veya rızık vurgusu yok.",
  "Metin rahmet ve merhamet anlamını özellikle öne çıkarıyor.",
];
export const nameLabelsB023 = () =>
  namesB023.map((n) => `${n.label} · ${n.meaning}`);
export const nameEventLabelsB023 = [
  "Diri oluş",
  "Hayat verme",
  "Biçim verme",
  "Rızık verme",
  "Şifa verme",
  "Eşsizlik",
  "Genel yaratma",
  "Merhamet",
];
export function nameSceneB023(name = 0, event = 0): SceneB023 {
  const n = namesB023[indexB023(name, 8)];
  indexB023(event, 8);
  const target = namesB023[event],
    valid = n.event === event;
  return {
    title: "Fiilin yönünü ve ismin anlamını karşılaştır",
    context: nameEventsB023[event],
    nodes: [
      {
        id: "event",
        label: nameEventLabelsB023[event],
        detail: nameEventsB023[event],
      },
      { id: "selected", label: n.label, detail: n.meaning },
      { id: "target", label: target.label, detail: target.meaning },
    ],
    links: [
      {
        from: "event",
        to: "selected",
        valid,
        evidence: valid
          ? `Vurgu ${n.meaning.toLocaleLowerCase("tr-TR")} anlamını doğrudan karşılıyor.`
          : `Seçili ${n.label}, ${n.meaning.toLocaleLowerCase("tr-TR")} demektir; bu pasajın doğrudan vurgusu ${target.meaning.toLocaleLowerCase("tr-TR")}.`,
      },
      {
        from: "event",
        to: "target",
        valid: true,
        evidence: "Pasajın belirli fiiline doğrudan karşılık.",
      },
    ],
    result: valid
      ? `Doğrudan eşleşme: ${n.label}`
      : `Bu vurgu için doğrudan eşleşme: ${target.label}`,
    explanation: valid
      ? "İsim ile açık fiil aynı anlam yönünü koruyor. Bu, bütün isimlerin eş anlamlı olduğu veya olayın başka hiçbir yorumu olamayacağı demek değildir."
      : "Bu bir genel inanç doğruluğu testi değildir. Kökün özellikle sorduğu anlam için seçili isimde doğrudan kanıt eksik; yakın anlamlar özdeş sayılamaz.",
    summary: [
      `Seçim:${n.meaning}`,
      `Vurgu:${target.meaning}`,
      valid ? "Fiil yönü uyumlu" : "Fiil yönü farklı",
    ],
  };
}
const schoolsB023 = [
  {
    name: "Matüridilik",
    field: "İtikadi",
    family: "Ehlisünnet",
    founder: "Ebû Mansur Matüridi",
    method: "Akli ve naklî delilleri birlikte kullanma",
    note: "Akla yer vermek vahyi bütünüyle yok sayma değildir.",
  },
  {
    name: "Eşarilik",
    field: "İtikadi",
    family: "Ehlisünnet",
    founder: "Ebülhasan Eşari",
    method: "Hadis-sünnet merkezinde itikadi açıklama",
    note: "Metni öncelemek, akıl yürütmeye hiç yer yok demek değildir.",
  },
  {
    name: "İmamiye",
    field: "İtikadi",
    family: "Şia",
    founder: "On iki imam anlayışı",
    method: "İmamet ve masumiyet öğretisi",
    note: "Bu ayrıntı Zeydiye’ye değişmeden genellenmez.",
  },
  {
    name: "Zeydiye",
    field: "İtikadi",
    family: "Şia",
    founder: "Zeyd bin Ali",
    method: "İmam sayısını on ikiyle sınırlamama",
    note: "İmamlar hatasız ve günahsız sayılmaz. Bu yönüyle İmamiye’den ayrılır.",
  },
  {
    name: "Hanefilik",
    field: "Fıkhi",
    family: "Ehlisünnet",
    founder: "Ebû Hanife",
    method: "Nakil ile akıl, hadis ile rey arasında denge",
    note: "Ahmed bin Hanbel başka kişidir; ses benzerliği eşleştirme kanıtı değildir.",
  },
  {
    name: "Malikilik",
    field: "Fıkhi",
    family: "Ehlisünnet",
    founder: "Malik bin Enes",
    method: "Medine uygulamasına verilen önem",
    note: "Medine’nin her geçtiği metin tek başına Malikilik kanıtı olmaz.",
  },
  {
    name: "Şafiilik",
    field: "Fıkhi",
    family: "Ehlisünnet",
    founder: "Muhammed bin İdris Şafii",
    method: "Fıkıh usulü; Kur’an-sünnet, icma ve kıyas",
    note: "Temel kaynaklara başvurma diğer ekollerde de vardır; kişi ve yöntem birlikte okunur.",
  },
  {
    name: "Hanbelilik",
    field: "Fıkhi",
    family: "Ehlisünnet",
    founder: "Ahmed bin Hanbel",
    method: "Hadis ağırlıklı fıkıh yaklaşımı",
    note: "Ebû Hanife ile aynı kişi değildir.",
  },
  {
    name: "Caferilik",
    field: "Fıkhi",
    family: "İmamiye ile ilişkili",
    founder: "Cafer Sadık",
    method: "İbadet ve muamelat hükümleri",
    note: "İmamiye ile ilişkisi, fıkhi ve itikadi düzlemleri aynı yapmaz.",
  },
];
export const schoolLabelsB023 = () => schoolsB023.map((s) => s.name);
export function schoolSceneB023(school = 0, field = 0): SceneB023 {
  const s = schoolsB023[indexB023(school, 9)];
  indexB023(field, 3);
  const filter = ["Bütün alanlar", "İtikadi", "Fıkhi"][field],
    valid = field === 0 || filter === s.field;
  return {
    title: "Üst çerçeve, alan ve ekol",
    context: `${s.name}: ${s.method}. ${s.note}`,
    nodes: [
      { id: "family", label: s.family, detail: "Üst çerçeve veya ilişki" },
      { id: "field", label: s.field, detail: "Konunun alanı" },
      { id: "school", label: s.name, detail: s.method },
      {
        id: "person",
        label: s.founder,
        detail: "Kaynakta ilişkili öncü veya ayırt edici anlayış",
      },
    ],
    links: [
      {
        from: "family",
        to: "field",
        valid: true,
        evidence: "Üst ilişki, alan ayrımının yerine geçmez.",
      },
      {
        from: "field",
        to: "school",
        valid,
        evidence: valid
          ? "Seçili alan filtresi ekolün alanını dışlamıyor."
          : `Filtre ${filter}; ${s.name} ise ${s.field.toLocaleLowerCase("tr-TR")} alandadır.`,
      },
      { from: "school", to: "person", valid: true, evidence: s.note },
    ],
    result: valid
      ? `${s.name} · ${s.field} alan`
      : `Alan uyuşmuyor: ${s.name}, ${s.field.toLocaleLowerCase("tr-TR")} yorumdur.`,
    explanation: `${s.method}. ${s.note} Bir kişi farklı alanlarda birden fazla gelenekten yarar görebilir; bu zorunlu çelişki değildir.`,
    summary: [s.family, s.field, s.founder, s.method],
  };
}
const propCasesB023 = [
  {
    label: "Mesaj, uygulama ve davranış",
    context:
      "Öğretim metni mesajın topluma ulaştırılmasını, anlamının açıklanmasını ve ilkenin yaşayışta gösterilmesini ayrı ayrı anlatır.",
    steps: [
      {
        act: "Mesajı topluma duyurma",
        role: "Tebliğ",
        why: "Bilgi muhataba ulaştırılıyor.",
      },
      {
        act: "Uygulamanın nasıl olduğunu açıklama",
        role: "Tebyin",
        why: "Anlam ve uygulama açılıyor.",
      },
      {
        act: "İlkeyi kendi davranışıyla gösterme",
        role: "Temsil",
        why: "Bir davranış örneğiyle gösteriliyor.",
      },
    ],
  },
  {
    label: "Açık hüküm ve açıklama",
    context:
      "İlk cümle açıkça dinî hüküm koyma yetkisini anlatır; ardından o hükmün ne anlama geldiği açıklanır ve davranışta gözetilir.",
    steps: [
      {
        act: "Açık dinî hüküm bildirme",
        role: "Teşri",
        why: "Normatif hüküm koyma vurgusu açık.",
      },
      {
        act: "Hükmün anlamını açıklama",
        role: "Tebyin",
        why: "Mevcut hükmün anlamı açılıyor.",
      },
      {
        act: "Hakkı kendi eyleminde gözetme",
        role: "Temsil",
        why: "İlke yaşayışla örnekleniyor.",
      },
    ],
  },
  {
    label: "Rivayette söz, davranış, onay",
    context:
      "Üç ayrı rivayetin ilki öğüt sözünü, ikincisi bizzat yapılan işi, sonuncusu sahabinin yaptığı işin açıkça onay gördüğünü aktarır.",
    steps: [
      {
        act: "Doğrudan söylenen öğüt",
        role: "Kavlî sünnet",
        why: "Aktarılan unsur söz.",
      },
      {
        act: "Bizzat yapılan uygulama",
        role: "Fiilî sünnet",
        why: "Aktarılan unsur davranış; hüküm derecesi ayrı eksen.",
      },
      {
        act: "Başkasının davranışına açık onay",
        role: "Takrirî sünnet",
        why: "Onay niteliği açıkça verilmiş; salt sessizlik değil.",
      },
    ],
  },
  {
    label: "Amaç, koşul ve örnek alma",
    context:
      "Bir davranışın gerekçesi öğreniliyor; değişen koşulda aynı amaç için uygun başka araç seçiliyor; sonunda ilkenin korunduğu açıklanıyor.",
    steps: [
      {
        act: "Davranışın nedenini anlama",
        role: "Amaç bilgisi",
        why: "Dış biçimden önce gerekçe öğreniliyor.",
      },
      {
        act: "Yeni koşula uygun araç seçme",
        role: "Bilinçli aktarım",
        why: "Araç değişse de amaç korunuyor.",
      },
      {
        act: "Korunan ilkenin gerekçesini açıklama",
        role: "Bağlam denetimi",
        why: "Yalnız benzer hareket değil, uygun ilişki açıklanıyor.",
      },
    ],
  },
];
export const prophetCaseLabelsB023 = () => propCasesB023.map((c) => c.label);
export function prophetSceneB023(caseIndex = 0, stage = 0): SceneB023 {
  const c = propCasesB023[indexB023(caseIndex, 4)];
  indexB023(stage, 3);
  const selected = c.steps[stage];
  return {
    title: "Fiil ile görevin bağını izle",
    context: c.context,
    nodes: c.steps.map((s, i) => ({
      id: `stage-${i}`,
      label: s.role,
      detail: s.act,
    })),
    links: c.steps.slice(1).map((s, i) => ({
      from: `stage-${i}`,
      to: `stage-${i + 1}`,
      valid: true,
      evidence: `${c.steps[i].act} → ${s.act}; aynı görevin eş anlamlı tekrarı değil.`,
    })),
    result: `${stage + 1}. aşama: ${selected.role}`,
    explanation: `${selected.act}: ${selected.why} Diğer aşamaların fiilleri seçili görevin yerine taşınmaz.`,
    summary: c.steps.map(
      (s, i) => `${i === stage ? "İncelenen: " : ""}${s.act} → ${s.role}`,
    ),
  };
}
const conceptContextsB023 = [
  {
    label: "Ekipman paylaşımı",
    event:
      "Kurmaca kişi, işe yarar çalışma ekipmanını ihtiyacı olana sunmayı planlıyor.",
    action: "Ekipmanı teslim etti.",
    absent: "Henüz ekipmanı teslim etmedi.",
    concept: "İnfak",
    why: "Somut kullanım imkânı başkasına aktarılıyor.",
  },
  {
    label: "Yanlış alışkanlığı düzeltme",
    event:
      "Kurmaca kişi, kendi yanlış alışkanlığını meşru ve barışçıl yolla değiştirmeyi planlıyor.",
    action: "Düzenli öz disiplin çalışmasına başladı.",
    absent: "Henüz bu yönde bir çalışma yapmadı.",
    concept: "Mücahede",
    why: "Kişinin kendisini düzeltmeye yönelik bilinçli çabası var; silahlı çatışma bilgisi yok.",
  },
  {
    label: "Ortak yaşam alanı",
    event:
      "Kurmaca kişi, ortak yaşam alanındaki tehlikeyi güvenli biçimde gidermeyi planlıyor.",
    action: "Tehlikeyi gideren yararlı işi tamamladı.",
    absent: "Henüz tehlikeyi gideren bir iş yapmadı.",
    concept: "Yararlı eylem",
    why: "İşin yapıldığı ve birine yarar sağladığı birlikte verilmiş.",
  },
];
export const conceptContextLabelsB023 = () =>
  conceptContextsB023.map((c) => c.label);
export function conceptSceneB023(
  context = 0,
  motive = 0,
  quality = 0,
  done = true,
): SceneB023 {
  const c = conceptContextsB023[indexB023(context, 3)];
  indexB023(motive, 3);
  indexB023(quality, 2);
  if (typeof done !== "boolean")
    throw new TypeError("Eylem durumu doğru/yanlış olmalı.");
  const motives = [
    "Yalnız Allah’ın rızası için yapmak istediğini açıkça söylüyor.",
    "Yalnız övgü ve alkış almak için yapmak istediğini açıkça söylüyor.",
    "Metin kişinin niyetini açıklamıyor.",
  ];
  const intention =
    motive === 0
      ? "İhlasla uyumlu niyet"
      : motive === 1
        ? "Gösteriş amacı"
        : "Niyet belirtilmemiş";
  const action = done ? c.action : c.absent,
    qualityText = done
      ? quality === 0
        ? "İşi bilinç ve özenle yaptı."
        : "İşi özensiz yaptı; özenli oluş için kanıt yok."
      : "İş henüz yapılmadı; işteki özen hakkında sonuç yok.";
  const nodes: NodeB023[] = [
    { id: "situation", label: c.label, detail: c.event },
    { id: "intention", label: intention, detail: motives[motive] },
    {
      id: "action",
      label: done ? c.concept : "Eylem henüz yok",
      detail: action,
    },
    {
      id: "quality",
      label: done && quality === 0 ? "Özenli iş" : "Özen kanıtı yok",
      detail: qualityText,
    },
  ];
  return {
    title: "Niyet, eylem ve özen ayrı değişir",
    context: `${c.event} ${motives[motive]} ${action} ${qualityText}`,
    nodes,
    links: [
      {
        from: "situation",
        to: "intention",
        valid: motive !== 2,
        evidence:
          motive === 2
            ? "Niyet verilmedi; ihlas veya riyâ kesin eklenemez."
            : motives[motive],
      },
      {
        from: "situation",
        to: "action",
        valid: done,
        evidence: done ? c.why : "Plan ve niyet, bitmiş eylem değildir.",
      },
      {
        from: "action",
        to: "quality",
        valid: done && quality === 0,
        evidence: qualityText,
      },
    ],
    result: `${intention} · ${done ? c.concept : "Biten iş yok"}`,
    explanation: `${done ? c.why : "Somut iş henüz yok. Paylaşım veya yararlı eylem yapıldı sonucu eklenmez."} ${motive === 0 ? "Samimi amaç beyanı var; bu söz, işin yapıldığını veya bütün sonucun iyi olduğunu tek başına kanıtlamaz." : motive === 1 ? "Gösteriş amacı, ihlas yorumu için kanıt sunmaz; yapılmış iş varsa o fiil geçmişten silinmez." : "İç amaç açık değil; kesin niyet teşhisi konmaz."} Özenli iş, ihsanla ilgili olabilir; bu örnek kişinin bütün dinî durumunu ölçmez.`,
    summary: [
      intention,
      done ? c.concept : "Eylem yok",
      done && quality === 0 ? "Özen var" : "Özen kanıtı yok",
    ],
  };
}
const claimsB023 = [
  {
    label: "Yaratıcı ve vahiy reddi",
    text: "Kurmaca görüş yaratıcıyı kabul eder, vahyi ve doğaüstü müdahaleyi reddeder.",
    axis: "Varlık ve vahiy",
    name: "Deizm",
    faith: 1,
    evidence: "Yaratıcı kabulü ile vahiy-müdahale reddi birlikte var.",
  },
  {
    label: "Bilgi sınırı",
    text: "Kurmaca görüş Tanrı’nın varlığı veya yokluğu konusunda kesin bilgiye ulaşmanın mümkün olmadığını savunur.",
    axis: "Bilgi",
    name: "Agnostisizm",
    faith: 0,
    evidence:
      "Bilebilme sınırı var; doğrudan varlık kabulü veya reddi verilmez.",
  },
  {
    label: "Açık yokluk iddiası",
    text: "Kurmaca görüş Tanrı’nın var olmadığını açıkça ileri sürer.",
    axis: "Varlık",
    name: "Ateistik yokluk iddiası",
    faith: 2,
    evidence: "Doğrudan yoktur önermesi kurulur; yalnız bilgi çekincesi değil.",
  },
  {
    label: "Maddi gerçeklik",
    text: "Kurmaca görüş temel gerçekliğin maddi/fiziksel olduğunu, bağımsız fizikötesi alan kabul etmediğini söyler.",
    axis: "Varlığın yapısı",
    name: "Materyalizm",
    faith: 0,
    evidence:
      "Gerçekliğin ne olduğu hakkında madde temelli ontolojik iddia var.",
  },
  {
    label: "Olgu ve deney",
    text: "Kurmaca görüş bilgi kabulünde gözlem, olgu ve deneysel sınamayı merkez alır; Tanrı hakkında ayrıca yargı belirtmez.",
    axis: "Bilgi yöntemi",
    name: "Pozitivizmle ilişkili ölçüt",
    faith: 0,
    evidence:
      "Yöntem ölçütü doğrudan bütün ontoloji veya kişisel inanç beyanı değildir.",
  },
  {
    label: "Kamu kurumu",
    text: "Kurmaca kişi kamusal kurumların belirli bir dine resmî üstünlük vermemesini savunur; kişisel Tanrı inancı verilmez.",
    axis: "Kurum ve toplum",
    name: "Seküler kurum tercihi",
    faith: 0,
    evidence:
      "Kamusal düzen önermesi kişisel Tanrı görüşünü tek başına belirlemez.",
  },
  {
    label: "Nesnel değer",
    text: "Kurmaca görüş nesnel değerlerin bağımsız temelini reddeder; Tanrı hakkında ayrıca konuşmaz.",
    axis: "Değer",
    name: "Değer alanında nihilizm",
    faith: 0,
    evidence:
      "Reddedilen nesne değer temelidir; başka ret kendiliğinden eklenmez.",
  },
  {
    label: "Teknolojik geliştirme",
    text: "Kurmaca görüş insanın yetilerini bilim ve teknolojiyle artırmayı savunur; Tanrı konusunda ayrıca konuşmaz.",
    axis: "İnsan ve teknoloji",
    name: "Transhümanizm",
    faith: 0,
    evidence: "Teknoloji hedefi kişisel Tanrı konumunu zorunlu vermez.",
  },
  {
    label: "Toplulukta somut eylem",
    text: "Kurmaca topluluk ayrılmak isteyene tehdit yöneltir ve zorla alınan parayı kişisel çıkar için saklar.",
    axis: "Davranış ve rıza",
    name: "İstismar riski",
    faith: 0,
    evidence: "Tehdit ve mali zorlama somut kanıttır; topluluğun yaşı değil.",
  },
];
export const claimLabelsB023 = () => claimsB023.map((c) => c.label);
export function beliefSceneB023(claim = 0, extra = 0): SceneB023 {
  const c = claimsB023[indexB023(claim, 9)];
  indexB023(extra, 3);
  const additions = [
    "Kişisel Tanrı görüşüne ilişkin yeni cümle eklenmedi.",
    "Ek cümle: Aynı kurmaca konuşmacı bir yaratıcıya inandığını açıkça söylüyor.",
    "Ek cümle: Aynı kurmaca konuşmacı Tanrı inancı olmadığını açıkça söylüyor.",
  ];
  const conflict = extra !== 0 && c.faith !== 0 && extra !== c.faith;
  const conclusion =
    extra === 0
      ? c.faith === 0
        ? "Kişisel Tanrı konumu bu veride belirtilmemiş."
        : c.faith === 1
          ? "Yaratıcı kabulü açık."
          : "Tanrı veya bağımsız fizikötesi alan reddi açık."
      : extra === 1
        ? "Ek cümlede yaratıcı kabulü var."
        : "Ek cümlede Tanrı inancı yokluğu var.";
  return {
    title: "İddianın eksenini ve ek öncülü ayır",
    context: `${c.text} ${additions[extra]}`,
    nodes: [
      { id: "claim", label: c.axis, detail: c.text },
      { id: "term", label: c.name, detail: c.evidence },
      {
        id: "extra",
        label:
          extra === 0
            ? "Ek inanç verisi yok"
            : extra === 1
              ? "Yaratıcı kabulü"
              : "İnanç yokluğu",
        detail: additions[extra],
      },
      {
        id: "outcome",
        label: conflict
          ? "Öncüller uyuşmuyor"
          : extra === 0
            ? "Kanıtın sınırı"
            : "İki veri birlikte",
        detail: conclusion,
      },
    ],
    links: [
      { from: "claim", to: "term", valid: true, evidence: c.evidence },
      {
        from: "extra",
        to: "outcome",
        valid: extra !== 0 && !conflict,
        evidence: conflict
          ? "İlk kabul/ret ile ek cümledeki karşıt beyan aynı kişiye yükleniyor. Bu iki öncül tutarlı tek etiket olamaz."
          : extra === 0
            ? "Belirtilmeyen inanç konumuna kesin kabul veya ret eklenmez."
            : conclusion,
      },
    ],
    result: conflict
      ? "Çelişen öncüller: tek tutarlı etiket üretilemez."
      : `${c.name} · ${conclusion}`,
    explanation: conflict
      ? "Bu, öğrencinin inancına ilişkin yargı değildir. Kurmaca metindeki açık karşıt önermeler işaretlenir; eksik bağlam varsa netleştirme gerekir."
      : `${c.evidence} ${conclusion} İnanç ve kesin bilgi,kurum düzeni veya teknoloji hedefi aynı eksen değildir.`,
    summary: [
      c.axis,
      c.name,
      conflict ? "Karşıt önermeleri ayrı gör" : conclusion,
    ],
  };
}
