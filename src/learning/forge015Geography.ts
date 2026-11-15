import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";

const section = (
  title: string,
  first: string,
  second: string,
): GuideSection => ({ title, paragraphs: [first, second] });
const example = (
  title: string,
  prompt: string,
  strategy: string,
  explanations: string[],
  answer: string,
  check: string,
  pitfall: string,
): WorkedExample => ({
  title,
  prompt,
  strategy,
  steps: explanations.map((explanation, i) => ({
    label: `${i + 1}. adım`,
    explanation,
  })),
  answer,
  check,
  pitfall,
});
const recall = (prompt: string, answer: string) => ({ prompt, answer });
type AuthoredGuide = LessonGuide & { title: string };
const authoredGuides: AuthoredGuide[] = [
  {
    id: "buyuk-iklim-tipleri",
    title: "Büyük iklim tipleri: on iki ayın izini birlikte oku",
    minutes: 75,
    objectives: [
      "Sıcaklık ve yağışın ayrı ölçeklerini kullanarak klimografı çöz.",
      "Sıcak, ılıman ve soğuk iklimleri birden çok kanıtla karşılaştır.",
      "Enlem, kıyı, akıntı ve yükselti koşullarını birlikte değerlendir.",
      "Aylık ortalama ile günlük uç değer veya yağış türünü ayır.",
    ],
    sections: [
      section(
        "İklimi tek bir güne sığdırma",
        "İklim, uzun yıllar boyunca hava koşullarının ortalamalarını, değişkenliğini ve mevsimlik örüntülerini kapsar. Bir sıcak gün çölü, bir soğuk gün kutup iklimini kanıtlamaz. Makroklima geniş alanlardaki ortak örüntüyü; mikroklima çevresinden ayrılan küçük alan koşullarını anlatır. Bir vadi tabanının don riski çevresindeki yamaçtan farklı olabilir.",
        "Sınıflamalar belirli ölçütlerle kurulur; okulda kullanılan sıcak, ılıman ve soğuk iklim aileleri bütün ayrıntıları aynı kutuya kapatmaz. Geçiş bölgeleri ve yükselti basamakları vardır. Önce sorunun kullandığı sınıflamayı ve verinin aylık ortalama mı, toplam mı olduğunu belirle; sonra birbiriyle bağımsız en az iki işaret ara.",
      ),
      section(
        "Klimografın iki eksenini ayrı oku",
        "Sıcaklık çizgisi °C ile aylık ortalama sıcaklığı, yağış sütunu mm ile aylık toplam yağışı gösterir. Çizgi ile sütunun kâğıt üzerindeki yüksekliklerini doğrudan kıyaslama: eksen ölçekleri farklıdır. Yıllık yağış on iki aylık toplamın toplamıdır; yıllık sıcaklık farkı en sıcak ay ortalaması eksi en soğuk ay ortalamasıdır.",
        "En sıcak ayların haziran–ağustosa veya aralık–şubata rastlaması yarımküreye ilişkin destek verir. Ekvatora yakın, farkın çok küçük olduğu yerlerde tek tepe ayıyla kesin yarımküre seçme. Aylık ortalama 3 °C, o ay hiç kar yağmadığını kanıtlamaz. Yaz kuraklığı da sadece toplamdan değil, sıcak dönemin aylık yağışından okunur; buharlaşma ve su bilançosu için ek veri gerekir.",
      ),
      section(
        "Ekvatoral ile savanı kurak dönem ayırır",
        "Ekvatoral örüntüde yıl boyu yüksek sıcaklık, küçük yıllık sıcaklık farkı ve bol, yıl içine yayılmış yağış öne çıkar. Amazon ve Kongo havzaları ile bazı Güneydoğu Asya adaları tipik örneklerdir. Yükselici hava hareketleri önemli olsa da her günün her saatinin aynı olması gerekmez. Gür tropikal yağmur ormanları bu sıcak ve nemli koşullarla ilişkilidir.",
        "Savanda sıcaklık yıl boyu yüksek kalabilir; ayırt edici özellik belirgin yağışlı ve kurak mevsimdir. Ekvatoral kuşağın iki yanında basınç ve yağış kuşaklarının mevsimlik yer değiştirmesi önemlidir. Uzun otlar yağışlı dönemde yeşerip kurak dönemde sararabilir; yer yer ağaç bulunur. Yalnız yıllık ortalama sıcaklık veya toplam yağış, ekvatoral–savan ayrımını tamamlamaz.",
      ),
      section(
        "Muson ile çölü dolaşım bağlamında düşün",
        "Muson ikliminin tipik Güney ve Güneydoğu Asya örneklerinde yazın denizden karaya yönelen nemli hava ve dağların yükseltici etkisi yağışı artırır; kış daha kurak olabilir. Mevsimlik rüzgâr yönü ve kıyı–dağ düzeni ayrımı destekler. Bütün muson alanlarına tek sıcaklık farkı veya tek yağış miktarı yazılmaz; geniş coğrafyada yükselti ve enlem değişir.",
        "Çölün ortak işareti yağış azlığı ve su yetersizliğidir. Dönencelerde alçalıcı hava, kıta içlerinde denizden uzaklık, yağış gölgesi ve bazı kıyılarda soğuk akıntılar kuraklığı destekleyebilir. Bütün çöller sıcak değildir: orta kuşak ve soğuk çöller de vardır. Sıcak ve bulutsuz çöllerde büyük günlük fark görülebilir; bu günlük farkı aylık ortalamaların yıllık farkıyla karıştırma.",
      ),
      section(
        "Akdeniz ile okyanusal iklimde yağışın zamanı",
        "Akdeniz tipinde yaz sıcak ve kurak, kış görece ılık ve yağışlıdır. Subtropikal yüksek basıncın yaz etkisi ve kışın batı rüzgârlarıyla gelen sistemler örüntüyü açıklar. Akdeniz havzası dışında Kaliforniya, Orta Şili, Güney Afrika'nın Kap çevresi ve Avustralya'nın bazı güney kıyılarında benzer koşullar bulunur. Aynı iklim adı aynı kıta demek değildir.",
        "Ilıman okyanusal iklimin tipik orta kuşak batı kıyılarında deniz etkisi sıcaklık farkını sınırlar; yağış yıl içine daha fazla yayılır. Batı Avrupa, Güney Şili ve Yeni Zelanda gibi örnekler birlikte düşünülür. Karışık ormanlar yaygın olabilir. Akdeniz'deki kızılçam ve maki ile ilişki kurulabilir; ancak insan müdahalesi, toprak ve yükselti nedeniyle tek bir bitki fotoğrafı kesin iklim teşhisi değildir.",
      ),
      section(
        "Step ve sert karasal: az yağış ile sert kışı ayır",
        "Step yarı kurak örüntüdür; deniz etkisinden uzak iç alanlarda sınırlı yağış ve ot toplulukları öne çıkar. İç Anadolu ve Orta Asya'nın uygun alanları örnek olarak düşünülebilir. İlkbahar yağışıyla yeşerip yaz kuraklığında sararan bozkır tipiktir. Yarı kuraklığın sınırı yalnız sabit bir mm sayısı değildir; sıcaklığa bağlı su kaybı da önemlidir.",
        "Sert karasal örüntüde uzun soğuk kış, kısa görece serin veya ılık yaz ve büyük yıllık sıcaklık farkı belirgindir. Sibirya ve Kanada'nın kıta içi kesimleri örneklerdir; tayga olarak adlandırılan iğne yapraklı ormanlar ve uygun yerlerde çayırlar görülebilir. Soğuk kışlı her alan step değildir. Yağışın miktarı, mevsimi, en sıcak ay ve kar örtüsü birlikte okunur.",
      ),
      section(
        "Tundra, kutup ve yüksek dağ",
        "Yaygın sıcaklık sınıflamasında tundrada en sıcak ayın ortalaması 0 °C'nin üstünde fakat 10 °C'nin altındadır; kısa yaz yüzeyde çözülmeye izin verebilir. Kuzey kıyı kuşaklarında yosun, liken, ot ve cüce çalılar görülür. Buz örtüsüyle ilişkili kutup tipinde en sıcak ay ortalaması bile 0 °C'nin altında kalır. Eşik yakınında hangi sınıflamanın kullanıldığını denetle.",
        "Yüksek dağ iklimi sadece kutba yakın yerlerde görülmez. Aynı enlemde yükselti arttıkça sıcaklık ve bitki basamakları değişebilir; bakı, rüzgâr önü ve kar örtüsü de etkilidir. Dağın bütün yamaçlarına aynı yağışı veya kar sınırını verme. Enlem haritası başlangıçtır; yer şekli ve aylık veri olmadan iklimi zorunlu sonuç olarak çıkarmak hatadır.",
      ),
      section(
        "Haritadan kanıta, kanıttan sınırlı sonuca",
        "Bir dünya haritasında önce yarımküreyi, yaklaşık enlemi, kıyı–iç kesim durumunu, rüzgâr yönünü, akıntıyı ve yükseltiyi kontrol et. Aynı 30° enlemi üzerinde yüksek dağ, kıta içi çöl ve denize açık kıyı aynı iklime sahip olmak zorunda değildir. Haritadaki şematik kuşaklar iklim sınırlarının kesin çizgisi gibi kullanılmaz.",
        "Bu laboratuvardaki on iki aylık diziler öğretim için yazılmış özgün temsili verilerdir; şehir istasyonu normali veya belirli bir yılın ölçümü değildir. Diziyi değiştirirken yıllık toplamı, farkı ve mevsimi yeniden hesapla. Sonuç cümleni 'bu örüntüyle uyumlu' biçiminde kur; aynı grafikle tek bir il veya tek bir ülke seçmek için ek konum kanıtı iste. Modeli kurcalamak bağımsız soru başarısı yerine geçmez.",
      ),
    ],
    examples: [
      example(
        "İki ayrı ölçek",
        "Temsili bir kuzey istasyonunda en soğuk ay −4 °C, en sıcak ay 26 °C; haziran, temmuz, ağustos yağışları 15, 10, 5 mm. Yıllık sıcaklık farkı ve yaz yağışı nedir?",
        "Fark işlemi ile toplam işlemini ayır.",
        [
          "Sıcaklık farkını 26 − (−4) olarak kur; negatif değeri çıkarıyorsun.",
          "Yaz yağışını 15 + 10 + 5 olarak, yalnız verilen üç ay için topla.",
          "Sıcaklık ve yağış farklı birimlidir; iki sonucu ayrı yaz.",
        ],
        "Yıllık sıcaklık farkı 30 °C, üç aylık yaz yağışı 30 mm.",
        "30 °C bir sıcaklık farkıdır; yıllık ortalama sıcaklık değildir.",
        "Eşit sayı değerlerini eşit fiziksel nicelik sanmak.",
      ),
      example(
        "Eşit toplam, farklı düzen",
        "X ve Y yıl boyu sıcaktır; her ikisinin yıllık yağışı 1500 mm'dir. X'te her ay 100 mm'den fazla, Y'de dört ay 10 mm'den az yağış vardır. İkisini aynı iklim sayabilir miyiz?",
        "Toplamın gizlediği mevsimi aç.",
        [
          "Toplam yağışların eşit olması dağılımın eşit olduğunu söylemez.",
          "X'te belirgin kurak dönem yoktur; Y'de kurak dönem belirgindir.",
          "X ekvatoral, Y mevsimlik tropikal örüntü için adaydır; Y'de savan–muson ayrımına konum ve rüzgâr verisi eklenir.",
        ],
        "Hayır; yağış rejimleri farklıdır.",
        "Y'yi sırf yıllık toplamla kesin muson ilan etme.",
        "Yıllık toplamı on iki ayın tamamı yerine kullanmak.",
      ),
      example(
        "Güneyde mevsim terslenir",
        "Bir istasyonda en yüksek ortalama sıcaklık ocakta 27 °C, en düşük temmuzda 12 °C'dir. Yağış sıcak dönemde az, serin dönemde fazladır. Hangi yorum desteklenir?",
        "Önce sıcak mevsimin takvimini, sonra yağışını oku.",
        [
          "Ocak tepesinin belirgin olması Güney Yarım Küre için destek verir.",
          "Sıcak dönemin kurak ve serin dönemin yağışlı olması Akdeniz tipiyle uyumludur.",
          "Grafik Güney Afrika'nın veya Şili'nin tek bir kentini kesin seçtirmez.",
        ],
        "Güney Yarım Küre'de Akdeniz tipiyle uyumlu bir örüntü.",
        "Güneyde yazı otomatik haziran–ağustos sayma.",
        "Ay adını mevsimden bağımsız ezberlemek.",
      ),
      example(
        "Soğuk kış tek başına kutup değildir",
        "A'nın en sıcak ayı 6 °C, en soğuk ayı −24 °C; B'nin en sıcak ayı −3 °C'dir. Verilen sıcaklık ölçütüyle tundra ve buz örtülü kutup tipi nasıl ayrılır?",
        "Yaz eşiğini denetle.",
        [
          "A'nın en sıcak ayı sıfırın üstünde, 10 °C'nin altındadır.",
          "B'nin en sıcak ayı bile sıfırın altındadır; bütün aylık ortalamaları bundan sıcak olamaz.",
          "A tundra, B buz örtülü kutup tipiyle uyumludur; günlük uç sıcaklıklar bu aylık diziden çıkarılmaz.",
        ],
        "A tundra, B buz örtülü kutup tipine adaydır.",
        "A'nın −24 °C kışı onu tek başına kutup yapmaz.",
        "En soğuk ayı tek ayırt edici ölçüt saymak.",
      ),
    ],
    recall: [
      recall(
        "Yıllık yağışları eşit iki iklim neden aynı olmayabilir?",
        "Yağışın aylara dağılışı, sıcaklıklar, yıllık fark ve su kaybı değişebilir.",
      ),
      recall(
        "Çizgi ile sütun grafikte aynı yükseklikteyse sayısal değerleri aynı mıdır?",
        "Hayır; °C ve mm eksenlerinin ölçekleri ayrıdır.",
      ),
      recall(
        "Enleme bakarak kesin iklim adı yazmak neden zayıftır?",
        "Yükselti, denizellik, akıntı, rüzgâr ve yer şekilleri aynı enlemde farklılaşır.",
      ),
      recall(
        "Aylık ortalaması 2 °C olan yerde kar yağamaz mı?",
        "Bu sonuç çıkmaz; yağış anının ve düşey hava profilinin bilgisi gerekir.",
      ),
    ],
    source:
      "OGM Dersler Cepte Coğrafya 9, Büyük İklim Tipleri (PDF s. 10–15); Aurelia Büyük İklim Tipleri kopya kağıdı (7 sayfa) ile karşılaştırılmış özgün anlatım, temsili veri ve özgün sorular. Resmî sınav sorusu aktarımı değildir.",
  },
  {
    id: "turkiye-iklimi",
    title: "Türkiye iklimi: kıyıdan dağın ardına değişen koşullar",
    minutes: 75,
    objectives: [
      "Enlem, denizellik, yükselti ve bakıyı birbirine karıştırmadan karşılaştır.",
      "Dağların uzanışı ve nemli hava yolunu kullanarak yağışın yerini gerekçelendir.",
      "Türkiye'nin ana iklim ve geçiş örüntülerini aylık kanıtlarla ayır.",
      "Aylık ortalamanın yağış türünü ve günlük uç değerleri belirlemediğini açıkla.",
    ],
    sections: [
      section(
        "Orta kuşak bir başlangıç koşuludur",
        "Türkiye Kuzey Yarım Küre'nin orta kuşağında, dönencenin kuzeyinde yer alır. Güneş'in yıl içindeki yükseklik değişimi mevsimlerin belirginleşmesine katkı sağlar. Aynı yükselti, deniz etkisi ve benzer diğer koşullarda güneye doğru ışın açısı genellikle büyür. Fakat ülkenin her güney noktası her kuzey noktadan her zaman sıcak değildir.",
        "Bir kıyı kentini yüksek iç havzayla kıyaslarken önce değişen etkenleri listele. Enlem etkisini tek başına ölçmek için yükselti, denizden uzaklık, dönem ve topoğrafya gibi etkenler kontrol edilmelidir. Coğrafya sorusunda 'aynı enlem' verilmesi bütün doğal koşulların eşit olduğu anlamına gelmez. Mutlak konum ile göreceli konumun birlikte işlemesi kısa mesafelerde farklı iklimler doğurur.",
      ),
      section(
        "Denizellik ve karasallık sıcaklığı nasıl değiştirir?",
        "Denizler karaya göre daha geç ısınıp daha geç soğur; kıyı üzerindeki etkisi kışın ılımanlaşmaya, yazın aşırı ısınmanın sınırlanmasına katkı verir. Bu nedenle benzer enlem ve yükseltide denize açık bir kıyının yıllık sıcaklık farkı, iç bölgeninkinden daha küçük olabilir. Nem, bulut ve rüzgâr da bu düzeni etkiler.",
        "Denizden kilometre olarak uzaklaşmak tek başına yeterli açıklama değildir. Aradaki dağlar, vadiler ve hâkim hava akımı deniz etkisinin erişimini değiştirir. Bir iç istasyonun daha soğuk kışını hem karasallık hem yükselti destekleyebilir; verilen iki veri bu etkilerin ayrı ayrı kaç derece olduğunu belirlemez. Laboratuvardaki düşey sıcaklık hesabı yalnız belirtilen ideal sütun varsayımına aittir.",
      ),
      section(
        "Yükselti ve bakıyı koşullu kullan",
        "Yükselen hava ve ortalama sıcaklık ilişkisi okul sorularında çoğu zaman her 200 m'de 1 °C azalma şeklinde idealize edilir. Bu, bütün günlerde bütün vadilere uygulanacak ölçülmüş sabit değildir; terselme ve farklı hava kütleleri olabilir. Türkiye'de doğudaki yüksek alanların düşük ortalama sıcaklığında yükselti güçlü bir etkendir. Gerçek istasyon karşılaştırması uygun dönem ve ölçüm gerektirir.",
        "Türkiye'de benzer eğim ve gölgelenme koşullarında güneye bakan yamaçlar Güneş ışınlarını daha doğrudan alabilir; karın erimesi, tarım ve yerleşme koşulları etkilenebilir. Bakı, her güney yamacın yılın her saatinde mutlaka daha sıcak veya daha yağışlı olduğu demek değildir. Rüzgâr önü–ardı yağış ilişkisi bakıdan farklı bir mekanizmadır; yön adını değil ışığın ve nemli havanın izlediği yolu düşün.",
      ),
      section(
        "Dağların uzanışı ve yağış gölgesi",
        "Kuzey Anadolu ve Toros kuşaklarının kıyıya büyük ölçüde paralel uzanışı deniz etkisinin içeri girmesini sınırlar. Nemli hava denize bakan yamaçta yükselirken soğuyup doyuma yaklaşabilir ve yamaç yağışı bırakabilir. Dağın gerisinde aynı nem, sıcaklık ve yağışın korunması gerekmez. Ancak her gün rüzgârın denizden estiğini varsayma.",
        "Batı Anadolu'da kıyıya daha dik uzanan dağlar ve aradaki vadiler deniz etkisinin içeri sokulmasına yardımcı olabilir. 'Ege'de etki sonsuza kadar gider' veya 'Karadeniz'de hiç geçit yoktur' sonucu çıkarılmaz. Açıklama çizgisini deniz → rüzgâr önü yamaç → zirve → rüzgâr ardı biçiminde kur; yağış tahmini için nem, dolaşım ve mevsim koşulları ekle.",
      ),
      section(
        "Hava kütleleri, basınç merkezleri ve yerel rüzgârlar",
        "Türkiye mevsime göre Akdeniz üzerinden gelen gezici sistemler, batı akımları ve farklı sıcaklık–nem özelliğindeki hava kütlelerinden etkilenir. Sibirya yüksek basıncı soğuk koşullara, Basra alçak basıncı yazın sıcak ve kuru koşullara katkı verebilir. Asor yüksek basıncının yaz etkisi Akdeniz ve Ege yaz kuraklığını destekler; bu merkezler ülkenin bütününde her gün sabit değildir.",
        "Poyraz kuzeydoğudan, yıldız kuzeyden, karayel kuzeybatıdan; lodos güneybatıdan, kıble güneyden, keşişleme güneydoğudan eser. Adlar rüzgârın geldiği yönü anlatır. Güneyli akım çoğu durumda ısıtabilir; yağış getirip getirmemesi geçtiği deniz/karaya ve nemine bağlıdır. İmbat gündüz deniz meltemi için kullanılan yöresel addır. Fönün ısınması alçalırken sıkışmayla ilişkilidir, dağa sürtünerek ısınma diye açıklanmaz.",
      ),
      section(
        "Akdeniz, Karadeniz ve geçiş alanları",
        "Akdeniz kıyısı ve Ege'nin denize açık alçak kesimlerinde sıcak kurak yaz ve ılık yağışlı kış tipiktir. Kızılçam ve maki topluluklarıyla ilişki kurulabilir; kıyıdan yükseğe çıkınca koşullar değişir. Kışların görece ılıklığı hiç don olmayacağını garanti etmez. Yağış toplamının fazla olması yıl boyunca düzenli dağıldığını da kanıtlamaz.",
        "Karadeniz kıyı kuşağında yazın da yağışın sürmesi ve denizelliğin yıllık sıcaklık farkını sınırlaması belirgindir. Kıyı ile dağların ardı ayrılır; bütün Karadeniz bölgesine tek istasyon grafiği uygulanmaz. Doğu Karadeniz'in yağışlı kıyılarıyla iç vadilerin yağış gölgesi karşılaştırılır. Marmara'da denizler, yükselti ve farklı hava akımları geçiş özelliklerini güçlendirir; iklim sınırları idari sınır gibi keskin değildir.",
      ),
      section(
        "İç alanların tek bir karasal kalıbı yoktur",
        "İç Anadolu'da soğuk kış, belirgin yaz kuraklığı ve birçok yerde ilkbahar yağışları yaygındır; kırkikindi adı verilen yükselim yağışları bu bağlamda anılır. Bozkırın mevsimlik yeşerip sararması su ve sıcaklık koşullarıyla ilişkilidir. Güneydoğu Anadolu'nun birçok yerinde yaz çok sıcak ve kurak, yağışın ağırlığı kıştadır. İki alanı yalnız 'karasal' adıyla aynı yağış mevsimine yerleştirme.",
        "Doğu Anadolu'nun yüksek bölümlerinde kış uzun ve soğuk olabilir. Erzurum–Kars çevresinin yüksek alanlarında yaz başı yağışlarının ve çayırların önemi artar; bütün Doğu Anadolu'ya bu istisnasız dağılım verilmez. Kuzeydoğu yükseklerinin serin yazı ile Güneydoğu alçaklarının çok sıcak yazı, aynı ülkenin iç bölgelerinde farklılaşmayı gösterir. Yükselti ve istasyon bağlamını okuyarak genellemeyi sınırla.",
      ),
      section(
        "Yağış süreci, kuraklık ve grafiğin sınırı",
        "Türkiye'de cephe yağışları özellikle serin dönemde farklı hava kütlelerinin karşılaşmasıyla, yamaç yağışları nemli havanın dağa yükselmesiyle, yükselim yağışları ise yüzey ısınmasına bağlı yükselmeyle ilişkilidir. Bir yerde birden fazla süreç farklı zamanlarda işler. Kıyıların her mevsim ve her noktasında aynı yağışı bekleme; rüzgâr yönü ve engel düzeni belirleyicidir.",
        "Aylık yağış sütunu mm miktarını verir; yağışın kar mı yağmur mu olduğu için ek gözlem veya uygun hava profili gerekir. Kış ortalaması sıfırın üstündeyken de kar görülebilir. Kuraklık yalnız az toplam değil, ihtiyaç ve su kaybıyla ilişkili yetersizliktir. Bu laboratuvarın istasyon dizileri öğretim amaçlı özgün temsillerdir; şehir veya belirli dönem normali değildir. Gerçek yer için gerçek ölçüme başvurulur; modelden kanıtlanmamış hassas yağış tahmini üretilmez.",
      ),
    ],
    examples: [
      example(
        "Aynı enlem, iki ayrı etken",
        "A ve B aynı enlemdedir. A denize açık, 100 m yüksekte; B iç havzada, 1600 m yüksektedir. B'nin kışı daha soğuk bulunuyor. Yalnız enlemle açıklanabilir mi?",
        "Kontrol edilen ve değişen etkenleri ayır.",
        [
          "Enlemler eşit olduğundan gözlenen farkı enlem değişimine bağlayamazsın.",
          "B'de yükselti fazla ve deniz etkisi zayıf; ikisi de daha soğuk kışa katkı verebilir.",
          "Veri bu iki katkının sayısal payını ayırmaz; ayrı kontrollü ölçüm gerekir.",
        ],
        "Hayır; yükselti ve karasallık birlikte değerlendirilmeli.",
        "İki etkeni görmek, her birinin kaç derece etkilediğini bilmek değildir.",
        "Aynı enlemi aynı iklim sanmak.",
      ),
      example(
        "Üç ayı doğru topla",
        "Temsili kuzey istasyonunda haziran–ağustos yağışları 18, 12, 10 mm; aralık–şubat yağışları 80, 95, 105 mm'dir. Hangi dönem kaç kat yağışlıdır?",
        "Ayların toplamlarını aynı birimde bul.",
        [
          "Yaz toplamı 18 + 12 + 10 = 40 mm'dir.",
          "Kış toplamı 80 + 95 + 105 = 280 mm'dir.",
          "280 / 40 = 7; bu iki üç aylık dönem karşılaştırılıyor, bütün yıl değil.",
        ],
        "Kış dönemi yazın 7 katı yağış almıştır.",
        "Bu veri yağışın kar olduğunu tek başına söylemez.",
        "En yüksek tek sütunu mevsim toplamı sanmak.",
      ),
      example(
        "Dağın hangi yamacı?",
        "Kuzeyde deniz, güneyde iç havza bulunan paralel dağa nemli rüzgâr kuzeyden esiyor. Diğer koşullar uygunsa ilk yükselme yağışı hangi yamaçta beklenir?",
        "Rüzgârın geldiği yolu izle.",
        [
          "Hava önce kuzeydeki denizden kıyı yamacına ulaşır.",
          "Kuzey yamaçta yükselir; soğuma doyum ve yağışı destekleyebilir.",
          "Güney yamaç rüzgâr ardıdır; kuzey–güney bakı etkisiyle yağış mekanizmasını karıştırma.",
        ],
        "Bu koşulda kuzey, yani rüzgâr önü yamaç.",
        "Rüzgâr ters dönerse rüzgâr önü–ardı da değişebilir.",
        "Güney yamaç her olayda üstünmüş gibi yön ezberlemek.",
      ),
      example(
        "İdeal düşey sütun",
        "Aynı hava sütununda deniz seviyesindeki sıcaklık 20 °C; her 200 m'de 1 °C azalma varsayılıyor. 1800 m'de model sıcaklığı nedir?",
        "Verilmiş varsayımı yalnız aynı sütuna uygula.",
        [
          "Yükseklik farkı 1800 m'dir.",
          "Azalma 1800 / 200 = 9 °C olur.",
          "20 − 9 = 11 °C; farklı şehirlerin tüm gerçek iklim farkını bu işleme bağlama.",
        ],
        "İdeal modelde 11 °C.",
        "Bu bir istasyonun ölçülmüş yıllık ortalaması veya hava tahmini değildir.",
        "Sabit ideal gradyanı her vadi ve terselme için gerçek yasa sanmak.",
      ),
    ],
    recall: [
      recall(
        "Aylık sıcaklık ortalaması yağışın kar olduğunu kanıtlar mı?",
        "Hayır; yağış anı ve düşey sıcaklık profili ya da doğrudan tür gözlemi gerekir.",
      ),
      recall(
        "Güneye bakan yamaç her zaman daha yağışlı mıdır?",
        "Hayır; bakı ışın alma ilişkisidir. Yağışta nemli rüzgârın önü ve arkası ayrıca incelenir.",
      ),
      recall(
        "İç Anadolu ile kuzeydoğu yükseklerinde yağış tepesinin zamanı aynı olmak zorunda mı?",
        "Hayır; birçok İç Anadolu yerinde ilkbahar, kuzeydoğu yükseklerinde yaz başı öne çıkabilir.",
      ),
      recall(
        "Poyraz hangi yönden eser?",
        "Kuzeydoğudan gelir; rüzgâr adı varış yönünü söylemez.",
      ),
    ],
    source:
      "OGM Dersler Cepte Coğrafya 9, Türkiye iklimini etkileyen faktörler ve iklim çeşitleri (PDF s. 18–21); Aurelia Türkiye İklimi kopya kağıdı (7 sayfa) ile karşılaştırılmış özgün anlatım, temsili modeller ve özgün sorular.",
  },
  {
    id: "dunyanin-tektonik-olusumu",
    title: "Dünya'nın tektonik oluşumu: katmandan levha sınırına",
    minutes: 80,
    objectives: [
      "Bileşime göre katmanlar ile mekanik litosfer–astenosfer ayrımını açıkla.",
      "Uzaklaşma, dalma-batma, kıtasal çarpışma ve yanal sınırı ayır.",
      "Fosil, kayaç, taban yaşı ve ölçüm kanıtlarını birlikte değerlendir.",
      "Jeolojik zamanları ve Anadolu'nun gelişimini göreli sırayla ilişkilendir.",
    ],
    sections: [
      section(
        "Derine doğrudan gidemediysek nasıl biliyoruz?",
        "Dünya yaklaşık 4,6 milyar yıllık bir geçmişe sahiptir. Bileşime göre kabuk, manto ve çekirdek ayrılır; bu yapı tek bir sondajla bütünü görülerek öğrenilmemiştir. Deprem dalgalarının hız, yön ve yayılma farkları; kayaçlar, lavlar ve başka jeofizik ölçümler dolaylı kanıt sunar. Bir kanıt türünün sınırı ötekiyle birlikte değerlendirilir.",
        "Derinlere doğru basınç ve genel olarak sıcaklık artar; fakat yer yüzeyine yakın kullanılan her 33 m'de 1 °C gibi yaklaşık bir gradyan Dünya merkezine kadar doğrusal uzatılamaz. Farklı katmanların bileşimi ve mekanik davranışı değişir. Bir çizimde kalınlığı büyütülmüş kabuk, gerçek yarıçap ölçeğinde aynı payı kaplıyor demek değildir; şema ile ölçekli kesiti ayır.",
      ),
      section(
        "Kabuk ile litosfer aynı şey değildir",
        "Kıtasal kabuk genellikle daha kalın ve daha düşük ortalama yoğunluklu, okyanusal kabuk genellikle daha ince ve daha yoğundur. Bileşim terimleri olan granitik ve bazaltik ağırlık bu genel ayrımı anlatır. Kıtasal ve okyanusal kabuk, bütün Dünya'yı üst üste örten iki kesintisiz tabaka gibi düşünülmez. Okyanus altında her yerde kıtasal kabuk bulunması gerekmez.",
        "Litosfer kabuğu ve üst mantonun en dıştaki sert bölümünü birlikte içerir. Levhalar bu litosfer parçalarıdır; bir levha hem kıtasal hem okyanusal bölüm taşıyabilir. Astenosfer üst mantonun uzun zamanda şekil değiştirebilen daha zayıf bölümüdür. 'Levha = kıta' veya 'levha yalnız kabuk' eşitliği sınır hareketlerini yanlış yorumlatır.",
      ),
      section(
        "Manto tümüyle sıvı bir magma denizi değildir",
        "Manto büyük ölçüde katıdır; yüksek sıcaklık ve basınç altında uzun zaman ölçeğinde çok yavaş şekil değiştirebilir. Bazı kesimlerde kısmi erime bulunabilir, ama bütün mantoya sıvı demek doğru değildir. Isı taşınımı, levha çekimi ve sırt çevresindeki yer çekimi etkileri levha hareketlerinin birlikte ele alınan mekanizmalarıdır; tek bir çizgi oku bütün dinamiği açıklamaz.",
        "Dış çekirdek sıvı, iç çekirdek ise yüksek basınç koşullarında katıdır. Maddenin hâli yalnız sıcaklığa bağlı değildir. Deprem dalgalarının bazı türlerinin sıvı ortamda doğrudan yayılamaması iç yapıyı sınamada kullanılır. Laboratuvarın katman kesiti sınırları ayırt etmek için büyütülmüş bir şemadır; katman hacimlerinin yüzdesini buradan hesaplama.",
      ),
      section(
        "Kıta kaymasından levha tektoniğine kanıt",
        "Wegener'in kıtaların kayması yaklaşımı, kıyı uyumu, eş yaşlı kayaç kuşakları ve farklı kıtalardaki benzer fosil izleri gibi gözlemleri bir araya getirdi. Daha sonra okyanus tabanı yayılması, manyetik örüntüler ve hassas konum ölçümleri levha tektoniği açıklamasını güçlendirdi. Eski kıtaların birleşip ayrılması tek bir anda bitmiş olay değildir; günümüzde de hareket sürer.",
        "Benzer enlemde iki kıyıda bugün yağmur ormanı bulunması tek başına eski bağlantı kanıtı değildir; benzer güncel iklimle açıklanabilir. Eş yaşlı, aynı tür kara fosilleri ile karşılıklı kayaç kuşağı uyumu geçmiş bağlantıyı daha seçici biçimde sınar. Kıyı çizgisi aşınma ve deniz seviyesiyle değişebildiği için yalnız yapboz benzerliğine dayanma; birden çok bağımsız kanıtı karşılaştır.",
      ),
      section(
        "Uzaklaşan sınır ve tabanın göreli yaşı",
        "Okyanus ortası sırtında levhalar ayrılırken yükselen malzeme soğuyup yeni okyanus kabuğu oluşturabilir. Sırtın yakınında taban genel olarak daha genç, uzaklaştıkça daha yaşlıdır. Simetrik manyetik şeritler ve yaş dağılışı yayılmayı destekler. Kıtada uzaklaşma rift vadileri ve yarılmalar oluşturabilir; her riftin bugünkü görünümü geniş bir okyanus olmak zorunda değildir.",
        "Sabit yarı yayılma hızı v cm/yıl ve sırta tek yandaki uzaklık d km verilirse yaş yaklaşık d / (10v) milyon yıldır: 1 cm/yıl, bir milyon yılda 10 km eder. Yarı hız tek levhanın sırttan uzaklaşmasıdır; iki levhanın toplam ayrılma hızı bunun iki katı olabilir. Hızın tarih boyunca sabit olduğu verilmedikçe bu hesap gerçek tabanın kesin yaş ölçümü sayılmaz.",
      ),
      section(
        "Yakınlaşmada levha türünü mutlaka oku",
        "Okyanusal litosferin bir başka levhanın altına daldığı dalma-batma alanlarında derin hendek, deprem odaklarının derinleşmesi ve uygun yerde volkan yayı birlikte görülebilir. Okyanus–kıta karşılaşmasında yay karada; okyanus–okyanus karşılaşmasında ada yayı biçiminde gelişebilir. Yoğunluk ve levhanın yaş/ısıl yapısı önemlidir; her levha her koşulda aynı biçimde dalmaz.",
        "İki kıtanın çarpışması kabuğun kısalıp kalınlaşmasına ve dağ kuşağı oluşumuna yol açabilir; Himalayalar tipik bağlamdır. Bu modeli her yakınlaşmada mutlaka okyanus hendeği ve aktif volkan yayı olur şeklinde genelleme. Bir sınırı tanırken önce göreli hareketi, sonra karşılaşan litosferin türünü, en son beklenen şekil ve süreçleri sırala.",
      ),
      section(
        "Yanal sınır üretim bandı değildir",
        "Yanal ya da transform sınırda iki levha sınır boyunca birbirine göre yatay hareket eder. Fay boyunca gerilim birikimi ve ani kayma deprem üretebilir. Baskın hareketin kendisi yeni kabuk üretmeyi veya kabuğu dalma-batma yoluyla yok etmeyi gerektirmez. Haritada oklar paralel ama ters yöndeyse sınır çizgisine göre hareketi oku.",
        "Deprem, volkan, genç dağ ve sıcak su kaynaklarının dağılışında levha sınırlarıyla güçlü ilişkiler vardır; bunlar birebir aynı haritalar değildir. Levha içi depremler ve sıcak nokta volkanizması gibi istisnalar bulunur. Bir deprem gözlenmesi her zaman yanardağ olduğunu, bir yanardağ görülmesi her zaman tam levha sınırında olunduğunu kanıtlamaz.",
      ),
      section(
        "Jeolojik zamanı sıraya koy",
        "Prekambriyen en eski geniş zaman aralığını; ardından Paleozoyik, Mesozoyik ve Senozoyik daha sonraki ana bölümleri kapsar. Yaklaşık sınırlar kaynak ve ayrıntı düzeyine göre yuvarlanır: Paleozoyik yaklaşık 539–252, Mesozoyik 252–66 milyon yıl öncesi; Senozoyik 66 milyon yıl öncesinden günümüze uzanır. Fosil toplulukları ve büyük biyolojik/jeolojik değişimler zaman ayırımlarını destekler.",
        "Senozoyik içinde Paleojen, Neojen ve Kuvaterner yer alır; bazı eski öğretim tablolarında Paleojen ve Neojen birlikte Tersiyer diye anılır. Kuvaterner Senozoyik'in parçasıdır, ondan sonraki eş düzey bir ana çağ değildir. Karbonifer taşkömürü oluşumuyla, Mesozoyik dinozorların yaygınlığıyla, Senozoyik memeli çeşitlenmesiyle ilişkilendirilir; bu örnekler her canlı grubunun yalnız o zamanda yaşadığı anlamına gelmez.",
      ),
      section(
        "Anadolu'nun geçmişi tek bir yükselme anı değildir",
        "Anadolu'daki yaşlı masifler daha eski kayaç çekirdeklerini, Zonguldak taşkömürü alanları Paleozoyik Karbonifer birikimlerini hatırlatır. Tethys alanındaki tortullaşma ve daha sonraki sıkışma, Toros ve Kuzey Anadolu kuşaklarının gelişiminde önemlidir. Bir dağın güncel yükseltisi yalnız kayaç yaşına değil daha sonraki yükselme ve aşınmaya da bağlıdır.",
        "Senozoyik'te kıvrılma, faylanma, volkanizma ve bölgesel yükselme Anadolu'nun bugünkü biçimine katkı verdi; linyit ve bazı başka tortul kaynaklar uygun çökelme ortamlarında gelişti. Kuvaterner'de buzul dönemleri, deniz seviyesi değişimleri ve süren tektonizma kıyı ve boğaz sistemlerini etkiledi. Ege'nin bütününü tek anda çöken bir kara parçasına, Anadolu'nun bütün 2000 m üstünü de aynı buzul örtüsüne indirgeme. Süreç ve bölge farkı korunmalıdır.",
      ),
    ],
    examples: [
      example(
        "Yarı hız ile toplam hızı ayır",
        "Bir okyanus sırtının tek yanında yarı yayılma hızı sabit 2 cm/yıl, örnek noktanın sırta uzaklığı 120 km'dir. Basitleştirilmiş modelde taban yaşı kaç milyon yıldır?",
        "Birimleri aynı uzaklık/zaman ölçeğine dönüştür.",
        [
          "1 cm/yıl bir milyon yılda 10 km yapar; 2 cm/yıl = 20 km/milyon yıl.",
          "Tek yana ait 120 km'yi tek yana ait 20 km/milyon yıl hızına böl.",
          "120 / 20 = 6 milyon yıl. İki yana ait toplam hız olan 4 cm/yılı burada kullanma.",
        ],
        "6 milyon yıl.",
        "Sırtın kendisinde d = 0 olduğunda model yaşı 0 çıkar.",
        "Yarı hız ile iki levhanın ayrılma hızını karıştırmak.",
      ),
      example(
        "Kıta ile levha farklıdır",
        "Bir hareketli parça hem kıta yüzeyini hem komşu okyanus tabanını, ayrıca bunların altındaki sert üst manto bölümünü birlikte taşıyor. Bu parçayı nasıl adlandırırız?",
        "Parçanın mekanik sınırını kullan.",
        [
          "Kıta yalnız yüzeydeki kara kütlesini anlatır; verilen parça okyanusu da taşır.",
          "Sert üst manto da verildiği için parça yalnız yer kabuğu değildir.",
          "Kabuk + sert en dış üst manto litosferi, hareketli parça litosfer levhasını tanımlar.",
        ],
        "Litosfer levhası.",
        "Levhanın yalnız kıtasal veya yalnız okyanusal olması şart değildir.",
        "Görünen kara sınırını levha sınırı sanmak.",
      ),
      example(
        "Her yakınlaşma aynı değildir",
        "X'te okyanus litosferi kıtanın altına dalıyor; Y'de iki kıta çarpışıp kabuğu kalınlaştırıyor. Hendek ve volkan yayı hangi bağlamda daha doğrudan beklenir?",
        "Önce tür, sonra süreç.",
        [
          "İkisinde de göreli hareket yakınlaşmadır.",
          "X'te dalma-batma, derin hendek ve uygun yerde karasal volkan yayıyla uyumludur.",
          "Y'nin temel modeli sıkışma ve kalınlaşmadır; aynı volkan yayı zorunlu değildir.",
        ],
        "X'te dalma-batma bağlamında.",
        "Y de deprem üretebilir; volkan zorunlu olmaması deprem yokluğu değildir.",
        "Yakınlaşma sözcüğünü tek şekil listesine çevirmek.",
      ),
      example(
        "Seçici kanıtı seç",
        "A gözlemi iki uzak ekvator kıyısında bugünkü yağmur ormanlarıdır. B gözlemi karşılıklı kıtalarda aynı yaşlı kayaç kuşağı ve aynı tür kara fosilleridir. Geçmiş bağlantıyı hangisi daha seçici sınar?",
        "Güncel ortamı eski konum izinden ayır.",
        [
          "A, benzer bugünkü iklimle bağımsız olarak oluşabilir.",
          "B'de zaman ve canlı/kayaç eşleşmesi birlikte vardır.",
          "B geçmiş bağlantı için daha güçlüdür; yine de başka jeolojik kanıtlarla sınanır.",
        ],
        "B gözlemi.",
        "Benzer bitki örtüsü tek başına levha bağlantısı kanıtı değildir.",
        "Benzer görünen her doğal olayı aynı nedene bağlamak.",
      ),
    ],
    recall: [
      recall(
        "Litosferin tamamı yer kabuğu mudur?",
        "Hayır; kabukla sert en dış üst manto bölümünü içerir.",
      ),
      recall(
        "Manto katıysa nasıl hareketle ilişkilidir?",
        "Büyük ölçüde katıdır, fakat uzun zaman ölçeğinde şekil değiştirip ısı taşıyabilir; her yerde sıvı değildir.",
      ),
      recall(
        "Transform sınırda deprem için yeni kabuk üretimi gerekli mi?",
        "Hayır; gerilim ve ani yatay kayma deprem oluşturabilir.",
      ),
      recall(
        "Kuvaterner, Senozoyik'ten sonra mı gelir?",
        "Hayır; Senozoyik'in bir dönemidir.",
      ),
    ],
    source:
      "OGM Dersler Cepte Coğrafya 10, Dünya'nın İç Yapısı (PDF s. 10–13; jeolojik zaman tablosu dahil); Aurelia Dünyanın Tektonik Oluşumu kopya kağıdı (7 sayfa). Katı manto/litosfer ve jeolojik ölçek ayrımları korunarak yazılmış özgün öğretim ve özgün sorular.",
  },
  {
    id: "ic-kuvvetler",
    title: "İç kuvvetler: kıvrımdan odağa, süreçten kanıta",
    minutes: 80,
    objectives: [
      "Orojenez, geniş alanlı düşey hareket, volkanizma ve depremi oluşum kanıtıyla ayır.",
      "Kıvrım geometrisini, fay bloklarını ve izostatik yük değişimini yorumla.",
      "Göreli deniz seviyesinde kara ve deniz etkisini ayır.",
      "Odak, dış merkez, büyüklük, şiddet ve tsunami koşullarını birbirinden ayır.",
    ],
    sections: [
      section(
        "İç enerji aynı yüzeyi farklı yollarla değiştirir",
        "Orojenez, epirojenez, volkanizma ve depremler Dünya'nın iç enerjisi ve tektonik süreçlerle ilişkilidir. Hepsi aynı hızda gerçekleşmez: dağ kuşaklarının gelişimi ve izostatik uyum uzun süreler alabilir; bir faydaki ani kayma saniyeler içinde deprem dalgaları yayabilir. Sürecin hızı ile birikimin süresini ayır; ani deprem uzun süre birikmiş gerilimi boşaltabilir.",
        "Dış kuvvetler aynı yüzeyi aşındırıp taşıyarak veya biriktirerek yeniden biçimlendirir. İç kuvvetin oluşturduğu volkan konisi daha sonra akarsuyla yarılabilir; bugünkü şekil tek nedene ait değildir. Bir soruda önce gözlenen yapı ve hareketi, sonra baskın süreci seç. Yalnız yüksek veya sivri görünmek volkanizma kanıtı değildir.",
      ),
      section(
        "Kıvrım: tabaka geometrisini gör",
        "Sıkışma altında uygun sıcaklık, basınç ve malzeme koşullarında tabakalar kıvrılabilir. Basit bozulmamış çizimde yukarı kemer biçimli kıvrım antiklinal, aşağı oluk biçimli kıvrım senklinal olarak gösterilir. İleri yorumda tabaka yaşları ve yönelimi de önemlidir; devrilmiş yapılarda yalnız tepe görünümüne bakmak yanıltır. Laboratuvar normal tabakalı basit geometrik modeli kullanır.",
        "Bir arazi tepesini mutlaka antiklinal, vadiyi mutlaka senklinal sanma. Aşınma, direnç farkı ve sonraki faylar tersine rölyef oluşturabilir. Toroslar ve Kuzey Anadolu dağ kuşakları kıvrımlı yapılarla ilişkilendirilir, fakat bütün bir kuşaktaki her tepe aynı tabaka geometrisine sahip değildir. Orojenez kayaçların deformasyonu, sıkışması ve kabuk kalınlaşması gibi süreçleri birlikte kapsayabilir.",
      ),
      section(
        "Kırık, fay, horst ve graben",
        "Fay, kırık yüzeyi boyunca göreli yer değiştirmenin olduğu yapıdır; her çatlak fay değildir. Normal fayda tavan bloğu taban bloğuna göre aşağı, ters fayda yukarı hareket eder; doğrultu atımlı fayda baskın kayma yataydır. Fayın eğimi ve blokların konumu verilmeden yalnız resimdeki bir yüksekliği adlandırmak eksik olabilir.",
        "Normal faylarla sınırlı bir sistemde göreli yüksek blok horst, göreli alçak blok graben olarak gösterilir. Batı Anadolu'nun birçok dağ–ova düzeni bu bağlamda ele alınır. Horst/graben yapıları özellikle gerilmeli ortamlarda gelişebilir; bütün kırıklı dağları yalnız sıkışma sonucu saymak yanlıştır. Faylı olmak tek başına başka bir bölgeden kesin daha yıkıcı deprem yaşanacağını da belirlemez; etkinlik ve yapılaşma gerekir.",
      ),
      section(
        "İzostatik denge: yük değiştiğinde tepki",
        "Litosferin daha zayıf ve uzun zamanda akabilen ortam üzerindeki yer çekimsel dengesi izostaziyle açıklanır. Buz veya tortu gibi yüklerin eklenmesi uygun koşullarda alçalmayı, yükün kaldırılması yükselmeyi destekleyebilir. Bu bir tahta parçasının su üstünde anında zıplaması değildir; kabuk rijitliği, yoğunluk yapısı ve zaman önemlidir. Mantonun tümünü sıvı kabul etmek gerekmez.",
        "Basit yerel denge modelinde buz kalınlığı h, buz yoğunluğu 0,9 ve destek ortamı yoğunluğu 3,3 g/cm³ verilirse yükün oluşturduğu düşey sapma yaklaşık h × 0,9 / 3,3 olur. Bu hesap belirtilen tek sütun ve yoğunluk varsayımı içindir; bütün Dünya'nın gerçek yükselme hızı veya her kıtanın tepki süresi değildir. Buz kalkınca uzun dönemde ters yönde toparlanma beklenebilir, ama anlık tamamlanma iddia edilmez.",
      ),
      section(
        "Epirojenez ve göreli deniz seviyesi",
        "Geniş alanların önemli ölçüde kıvrılmadan yükselmesi veya alçalması ders dilinde epirojenez olarak ele alınır. Deniz seviyesi sabitken kara yükselirse göreli deniz seviyesi düşer ve uygun kıyı eğiminde deniz geriler; kara alçalırsa deniz karaya ilerleyebilir. Deniz ilerlemesi transgresyon, gerilemesi regresyon olarak adlandırılır.",
        "Aynı kıyı izi küresel deniz seviyesi değişimiyle de oluşabilir. Göreli değişimi deniz düzeyi değişimi eksi kara yükselmesi olarak yazmak iki etkeni ayırır. Deniz 2 m yükselirken kara 3 m yükselirse göreli değer −1 m olur. Denizel fosilin bugün yüksekte bulunması eski denizel ortamı gösterir; tek başına olayın zamanını ve yükselmenin bütün mekanizmasını kesinleştirmez.",
      ),
      section(
        "Volkanizma yalnız lavdan ibaret değildir",
        "Magma yer içinde eriyik, kristal ve gaz bileşenleri taşıyabilir; yüzeye çıkan eriyik lav adını alır. İç volkanizmada magma kabuğa sokulup derinde katılaşır; batolit, dayk, sill ve lakolit gibi yapılar gelişebilir. Dayk tabakaları kesen, sill tabakalara paralel sokulma için kullanılır. Yüzeye çıkmamış magma bir dış volkan konisi oluşturmuş sayılmaz.",
        "Dış volkanizmada lav, kül, başka piroklastik parçalar ve gazlar çıkabilir. Krater, kaldera, maar, koni ve lav örtüsü farklı oluşum koşullarına sahiptir; hepsi aynı büyüklükte bir çukur değildir. Kaldera çoğu kez büyük boşalım sonrası çökme, maar su–magma etkileşimli patlama bağlamında ele alınır. Volkanlar birçok levha sınırında yoğunlaşır; sıcak nokta gibi levha içi örnekler nedeniyle tamamı sınırda değildir.",
      ),
      section(
        "Depremde odak ile dış merkezi yerleştir",
        "Fayda ani kaymanın başladığı yer içi nokta odak ya da hiposantr, bu noktanın yeryüzündeki dik izdüşümü dış merkez ya da episantrdır. Odak derinliği yer içindeki düşey uzaklıktır. Haritada bir nokta dış merkezi gösterebilir; bu haritanın altındaki odak aynı yüzey noktası değildir. Deprem dalgaları kaynaktan yayılır; gerçek kırılma tek bir geometrik noktadan daha geniş bir alanı kapsayabilir.",
        "Tektonik depremler faylardaki gerilim boşalmasıyla, volkanik depremler magmatik süreçlerle, çöküntü depremleri bazı boşlukların çökmesiyle ilişkilidir. Sismograf/sismometre yer hareketini kaydeder; büyüklük bu kayıtlardan kaynak ölçeği için hesaplanır. Şiddet ise belirli bir yerdeki hissedilme ve etkidir. Aynı büyüklükte iki depremin yerel etkisi odak, uzaklık, zemin, yapı kalitesi ve maruziyetle değişebilir.",
      ),
      section(
        "Afet sonucunu tek etiketten çıkarma",
        "Her deprem tsunami oluşturmaz. Deniz tabanının ani ve yeterli düşey yer değiştirmesi veya denizaltı heyelanı gibi su kütlesini harekete geçiren süreçler önemlidir. Yalnız 'denizde deprem oldu' bilgisi dalga yüksekliğini veya kıyı etkisini belirlemez. Yatay kayma modelinde önemli düşey taban değişimi verilmemişse tsunami zorunludur denemez; başka süreçleri de yok saymadan veri sınırını söyle.",
        "Levha sınırları, fay kuşakları, deprem ve volkan dağılışları büyük ölçekte ilişkilidir; birebir aynı değildir. Genç yüksek dağlar her zaman volkan değildir; eski dağlar daha sonra yeniden yükselebilir. Laboratuvardaki hareket miktarı öğretici bir geometrik ayardır; gerçek deprem zamanı, büyüklüğü veya güvenli yer tahmini üretmez. Tahminini kanıtla karşılaştır, sonra özlü bir gerekçe yaz; şemayı izlemek başarı veya XP sayılmaz.",
      ),
    ],
    examples: [
      example(
        "Kara ile deniz birlikte değişiyor",
        "Aynı dönemde deniz seviyesi 2 m, kıyı karası 5 m yükseliyor. Başka etki yoksa denizin karaya göre düşey değişimi nedir?",
        "Referans düzlemini karaya bağla.",
        [
          "Deniz değişimini +2 m olarak yaz.",
          "Kara değişimi +5 m; göreli deniz değişimi 2 − 5'tir.",
          "Sonuç −3 m; uygun kıyı geometrisinde gerileme eğilimiyle uyumludur.",
        ],
        "Göreli deniz seviyesi 3 m düşer.",
        "Denizin mutlak yükselmesi, karaya göre de yükseldiği anlamına gelmez.",
        "Kara yükselmesini hesaba katmamak.",
      ),
      example(
        "Yük ve ideal denge",
        "Yerel izostatik modelde 1100 m buz ekleniyor. Buz yoğunluğu 0,9; destek ortamı 3,3 g/cm³. Dengeye ulaşıldığında basit düşey sapma kaç metredir?",
        "Yoğunluk oranını kalınlıkla çarp.",
        [
          "Yoğunluk oranı 0,9 / 3,3 = 3 / 11'dir.",
          "1100 × 3 / 11 = 300 m bulunur.",
          "Ek yük olduğundan yön aşağıdır; bu model uyumun ne kadar zamanda tamamlandığını söylemez.",
        ],
        "İdeal yerel modelde 300 m aşağı sapma.",
        "Buz erirse yük etkisinin azalması uzun dönemde yükselmeyi destekler.",
        "Sonucu anlık gerçek yer değiştirme veya yıllık hız sanmak.",
      ),
      example(
        "Yer içindeki başlangıç",
        "Düz yüzeyli bir kesitte kayma yüzeyin 15 km altında başlıyor. Başlangıç noktasının yüzeydeki dik izdüşümü P'dir. Odak ve dış merkez neresidir?",
        "Yüzey ile derinliği ayır.",
        [
          "15 km derindeki başlangıç odaktır.",
          "P yüzeyde, odağın dik üstündedir.",
          "P dış merkezdir; derinlik iki nokta arasındaki düşey uzaklıktır.",
        ],
        "Derindeki nokta odak, P dış merkez; odak derinliği 15 km.",
        "Haritadaki P'ye odak derinliği sıfır demek yanlıştır.",
        "Yer içi noktayı yüzey işaretiyle eşitlemek.",
      ),
      example(
        "Şekilden önce süreç",
        "X'te yatay tabakalar kıvrılmış; Y'de normal faylarla sınırlı orta blok çevresine göre aşağıda; Z'de lav ve kül katları yüzeye birikmiş. Baskın göstergeler nelerdir?",
        "Her gözlemi ayrı mekanizmaya bağla.",
        [
          "X tabaka deformasyonuyla kıvrımlanmayı gösterir.",
          "Y göreli alçak fay bloğu, yani verilen normal fay bağlamında grabendir.",
          "Z yüzeye çıkan malzeme nedeniyle dış volkanizma göstergesidir.",
        ],
        "X kıvrımlanma, Y graben, Z dış volkanizma.",
        "Üçünün de yüksek/engebeli çevrede olması aynı kökeni kanıtlamaz.",
        "Bütün dağ ve çukurları tek kuvvetten türetmek.",
      ),
    ],
    recall: [
      recall(
        "Her çatlak fay mıdır?",
        "Hayır; fayda kırık boyunca göreli yer değiştirme vardır.",
      ),
      recall(
        "Sismograf şiddeti doğrudan mı ölçer?",
        "Yer hareketini kaydeder; büyüklük kayıtlardan hesaplanır, şiddet yerel hissedilme/etkiyle değerlendirilir.",
      ),
      recall(
        "Deniz gerilemesi mutlaka kara yükselmesinden mi kaynaklanır?",
        "Hayır; deniz düzeyi düşmesi veya ikisinin birlikte değişimi de aynı göreli sonuca katkı verebilir.",
      ),
      recall(
        "Her deniz depremi tsunami üretir mi?",
        "Hayır; suyu harekete geçiren süreç ve yeterli taban yer değiştirmesi gibi koşullar gerekir; yalnız konumdan zorunlu sonuç çıkmaz.",
      ),
    ],
    source:
      "OGM Dersler Cepte Coğrafya 10, İç Kuvvetler (PDF s. 16–18); Aurelia İç Kuvvetler kopya kağıdı (7 sayfa). Fay, katı manto, ölçüm ve göreli deniz seviyesi sınırları korunarak yazılmış özgün anlatım, ideal modeller ve özgün sorular.",
  },
];

type Q = readonly [string, readonly string[], number, string, string, string];
const banks: Record<string, readonly Q[]> = {
  "buyuk-iklim-tipleri": [
    [
      "Temsili bir istasyonda en sıcak ay 26 °C, en soğuk ay −6 °C'dir. Yıllık sıcaklık farkı kaç °C'dir?",
      ["20", "26", "32", "−32", "6"],
      2,
      "Negatif sayıyı çıkarmayı düşün.",
      "Fark en sıcak eksi en soğuktur: 26 − (−6) = 32 °C. Bu değer yıllık ortalama değildir.",
      "Yıllık fark",
    ],
    [
      "X ve Y'nin yıllık yağışı 1200 mm'dir. X'te her ay 100 mm yağış ölçülürken Y'de beş ayın her biri 5 mm'den azdır. Hangisi doğrudur?",
      [
        "İklimleri zorunlu aynıdır.",
        "Yağış rejimleri farklıdır.",
        "Y kesin Kuzey Kutbu'ndadır.",
        "X'te her gün eşit yağış olur.",
        "Y'nin bütün ayları daha soğuktur.",
      ],
      1,
      "Yıllık toplamla aylık dağılım aynı bilgi mi?",
      "X'te yağış her ay 100 mm ile eşit dağılır; Y'de beş ay 5 mm'den az olduğu için aynı aylık dağılım olamaz. Eşit yıllık toplam bu farkı silmez. Verilenlerden sıcaklık, kesin konum veya günlük yağış miktarı çıkmaz.",
      "Yağış rejimi",
    ],
    [
      "Bir istasyonda her ay ortalama 25–27 °C, her ay toplam yağış 120 mm'nin üstündedir. Aşağıdakilerden hangi tipik örüntüyle daha uyumludur?",
      ["Buz örtülü kutup", "Tundra", "Çöl", "Ekvatoral", "Sert karasal"],
      3,
      "Yıl boyu sıcaklık ve kurak dönem yokluğunu birlikte kullan.",
      "Küçük yıllık fark, yıl boyu yüksek sıcaklık ve bol yağış ekvatoral örüntüyü destekler. Bu veri tek bir kenti seçtirmez.",
      "Çoklu iklim kanıtı",
    ],
    [
      "Kuzey Yarım Küre'de bir kıyıda yaz sıcak ve kurak, kış görece ılık ve yağışlıdır. Hangi tipik iklim örüntüsü desteklenir?",
      [
        "Akdeniz",
        "Tundra",
        "Yıl boyu yağışlı ekvatoral",
        "Buz örtülü kutup",
        "Yaz yağışlı muson",
      ],
      0,
      "Yağışın sıcak mı serin mevsimde mi arttığına bak.",
      "Yaz kuraklığı ile kış yağışı Akdeniz tipini ayırır. Yaz yağışlı musonun yağış zamanı bunun tersidir.",
      "Mevsimlik ayrım",
    ],
    [
      "Bir yerin en sıcak ay ortalaması 7 °C, en soğuk ay ortalaması −20 °C'dir. Tundrada en sıcak ayın 0–10 °C arasında olduğu sınıflamaya göre hangisi daha uygundur?",
      ["Sıcak çöl", "Ekvatoral", "Akdeniz", "Yazı sıcak savan", "Tundra"],
      4,
      "Verilen sınıflama en soğuk ayı mı en sıcak ayı mı kullanıyor?",
      "7 °C, belirtilen yaz eşiği aralığındadır. −20 °C kış değeri tek başına buz örtülü kutup tipi kanıtı değildir.",
      "Sıcaklık eşiği",
    ],
    [
      "Büyük iklim tipleri için hangi yargı yanlıştır?",
      [
        "Benzer iklim farklı kıtalarda görülebilir.",
        "Yükselti enlem etkisini değiştirebilir.",
        "Bütün çöller yıl boyu sıcaktır.",
        "İnsan etkisi bitki örtüsünü değiştirebilir.",
        "Aylık yağış dağılımı sınıflamaya katkı verir.",
      ],
      2,
      "Çölü tanımlayan temel su koşulunu düşün.",
      "Çöl su yetersizliği ve yağış azlığıyla ilişkilidir; orta kuşak ve soğuk çöller de vardır. Bütün çölleri sıcak saymak yanlıştır.",
      "Genelleme sınırı",
    ],
    [
      "Bir klimografta sıcaklık °C, yağış mm eksenindedir. Temmuz çizgisi 25 °C, sütunu 8 mm gösteriyor. Doğru okuma hangisidir?",
      [
        "Temmuzda her gün 25 °C olmuştur.",
        "Temmuz yağışı 25 mm'dir.",
        "8 °C'de 25 mm yağış olmuştur.",
        "Aylık ortalama sıcaklık 25 °C, aylık toplam yağış 8 mm'dir.",
        "Yıllık yağış 8 mm'dir.",
      ],
      3,
      "Çizginin ve sütunun niceliklerini ayrı yaz.",
      "Çizgi aylık ortalama sıcaklığı, sütun aylık toplam yağışı verir. Günlük değer veya yıllık toplam bu tek aydan çıkmaz.",
      "İki eksen",
    ],
    [
      "Sıcaklık tepesinin ocakta 28 °C, dibinin temmuzda 11 °C olduğu bir istasyonda sıcak dönem kurak, serin dönem yağışlıdır. Hangi yorum desteklenir?",
      [
        "Kesin olarak İstanbul'dur.",
        "Güney Yarım Küre'de Akdeniz tipiyle uyumludur.",
        "Kuzeyde yaz yağışlı musondur.",
        "Her gün sıcaklık 28 °C'dir.",
        "Yağış mutlaka kardır.",
      ],
      1,
      "Güneyde yazın hangi takvim aylarına denk gelebildiğini düşün.",
      "Belirgin ocak sıcaklığı Güney Yarım Küre'yi, sıcak dönem kuraklığı ve serin dönem yağışı Akdeniz tipini destekler. Tek bir şehir ve yağış türü belirlenmez.",
      "Yarımküre ve mevsim",
    ],
    [
      "A ve B yaklaşık 30° kuzey enlemindedir. A denize açık alçak kıyı, B 3000 m yüksek bir dağdır. Yalnız ortak enleme bakarak ne söylenebilir?",
      [
        "İkisinin iklimi kesin aynıdır.",
        "B'nin bütün ayları daha yağışlıdır.",
        "A mutlaka çöldür.",
        "İkisinde her gün aynı sıcaklık olur.",
        "Yükselti ve başka koşullar incelenmeden aynı iklim sonucu kurulamaz.",
      ],
      4,
      "Aynı kalan enlemin yanında değişenleri listele.",
      "Enlem önemli bir etkendir; fakat 3000 m yükselti farkı, deniz ve topoğrafya farklı iklim koşulları oluşturabilir. Kesin aynı iklim denemez.",
      "Konum bağlamı",
    ],
    [
      "A'da yazın denizden karaya gelen nemli mevsimlik rüzgârla yağış çok artıyor; B'de sıcaklık yıl boyu yüksekken düzenli yağışlı ve kurak mevsim görülüyor, rüzgâr bilgisi yok. Hangisi daha dikkatli yorumdur?",
      [
        "A muson bağlamını destekler; B için mevsimlik tropikal örüntü denir, ek kanıt aranır.",
        "B'nin kesin ülkesini bulduk.",
        "A ve B'de yağış her gün eşittir.",
        "B kesin buz örtülü kutuptur.",
        "Rüzgârın yönü iklim yorumunda kullanılmaz.",
      ],
      0,
      "Doğrudan verilmiş dolaşım kanıtı hangi yerde var?",
      "A'daki denizden karaya mevsimlik nemli akım muson yorumunu güçlendirir. B'deki mevsimlik yağış tek başına savan–muson ayrımını ve ülkeyi kesinleştirmez.",
      "Kanıtın gücü",
    ],
  ],
  "turkiye-iklimi": [
    [
      "Aynı enlemdeki A kıyıda 100 m, B iç havzada 1700 m yüksektedir. B'nin kışı daha soğuktur. En uygun açıklama hangisidir?",
      [
        "Enlem değişmiştir.",
        "Yalnız boylam sıcaklığı belirler.",
        "Denizellik ve yükselti farkı birlikte etkili olabilir.",
        "Bütün kıyılar her an daha sıcaktır.",
        "Aynı enlemde sıcaklık farkı imkânsızdır.",
      ],
      2,
      "Verilen eşit etken ile farklı etkenleri ayır.",
      "Enlem aynı, deniz etkisi ve yükselti farklıdır; ikisi de soğuk kışa katkı verebilir. Verilenlerden katkıların ayrı derece payı hesaplanamaz.",
      "Etkenleri ayırma",
    ],
    [
      "Temsili kuzey istasyonunda haziran, temmuz, ağustos yağışı 20, 10, 15 mm'dir. Yaz toplamı kaç mm'dir?",
      ["15", "45", "30", "60", "5"],
      1,
      "Üç aylık toplam isteniyor; ortalama değil.",
      "20 + 10 + 15 = 45 mm. 15 mm üç ayın ortalamasıdır; istenen toplam değildir.",
      "Mevsim toplamı",
    ],
    [
      "Kış ortalaması 4 °C olan bir istasyonda ocak yağışı 80 mm ölçülmüştür. Hangisi kesin çıkarılamaz?",
      [
        "Verilen kış ortalaması sıfırın üstündedir.",
        "Ocak yağış toplamı 80 mm'dir.",
        "Yağış miktarı mm birimindedir.",
        "Ocakta hiç kar yağmamıştır.",
        "Aylık ortalama günlük uç değer değildir.",
      ],
      3,
      "Ortalama, yağış anındaki sıcaklığın tamamını verir mi?",
      "Aylık/mevsimlik ortalama sıfırın üstünde olsa da bazı günler ve hava profillerinde kar görülebilir. Yağış türü gözlemi olmadan hiç kar olmadığı söylenemez.",
      "Grafiğin sınırı",
    ],
    [
      "Kuzeyinde deniz olan, kıyıya paralel bir dağa nemli hava kuzeyden geliyor. Hangi süreç verilen koşullarla daha doğrudan uyumludur?",
      [
        "Kuzey yamaçta yükselme ve uygun koşullarda yamaç yağışı",
        "Güney yamaç mutlaka rüzgâr önüdür.",
        "Hava dağa yaklaşırken zorunlu kurur.",
        "İki yamaç her gün eşit yağış alır.",
        "Bakı tek başına yağışı belirler.",
      ],
      0,
      "Önce rüzgârın denizden hangi yamaca ulaştığını izle.",
      "Hava ilk kuzey yamaca ulaşır ve yükselir. Soğuma doyumu ve yağışı destekleyebilir; güneyde aynı yağışın sürmesi zorunlu değildir.",
      "Rüzgâr önü",
    ],
    [
      "Türkiye'de Ege kıyılarındaki bazı vadilerden deniz etkisinin içeri sokulabilmesi hangi koşulla ilişkilidir?",
      [
        "Bütün dağların kıyıya paralel olmasıyla",
        "Enlemin her vadide sıfır olmasıyla",
        "Deniz suyunun her yerde eşit olmasıyla",
        "Bütün iç kesimlerin deniz seviyesinde olmasıyla",
        "Dağlar arasındaki kıyıya açılan vadi koridorlarıyla",
      ],
      4,
      "Nemli havanın izleyebileceği güzergâhı düşün.",
      "Kıyıya açılan koridorlar ve kıyıya daha dik dağ uzanışı deniz etkisinin içeri erişimini kolaylaştırabilir; sınırsız erişim garantisi değildir.",
      "Topoğrafik erişim",
    ],
    [
      "Türkiye'nin denize açık iki alçak kıyı istasyonundan X'te yaz kuraklığı belirgin, Y'de yazın da yağış sürüyor. İlk aday eşleştirme hangisidir?",
      [
        "X kutup, Y çöl",
        "X Akdeniz, Y Karadeniz kıyı örüntüsü",
        "X tundra, Y sıcak çöl",
        "X ve Y kesin aynı il",
        "X'te her gün kar, Y'de her gün sis",
      ],
      1,
      "Yağışın en az olduğu sıcak dönemleri karşılaştır.",
      "Sıcak kurak yaz Akdeniz; yıl boyu yağışın sürmesi Karadeniz kıyı örüntüsü için destek verir. Kesin il ve günlük hava bu kadarıyla bulunmaz.",
      "Kıyı iklimleri",
    ],
    [
      "Aynı ideal hava sütununda deniz seviyesinde 18 °C vardır. Her 200 m'de 1 °C azalma varsayılırsa 1400 m'deki model sıcaklığı kaç °C'dir?",
      ["25", "7", "18", "11", "−7"],
      3,
      "Önce yükseklikten sıcaklık azalmasını hesapla.",
      "1400 / 200 = 7 °C azalma; 18 − 7 = 11 °C. Bu sonuç verilen ideal sütuna aittir, gerçek yıllık istasyon normali değildir.",
      "Koşullu yükselti modeli",
    ],
    [
      "Poyraz adı hangi yön bilgisini anlatır?",
      [
        "Rüzgârın kuzeydoğudan gelmesini",
        "Rüzgârın mutlaka kuzeydoğuya gitmesini",
        "Yalnız dikey yükselmeyi",
        "Her zaman yağmur yağmasını",
        "Her gün aynı hızla esmeyi",
      ],
      0,
      "Rüzgâr adı geldiği yönle adlandırılır.",
      "Poyraz kuzeydoğudan eser. Adı tek başına hızını, yağışını veya her durumda aynı hava etkisini belirlemez.",
      "Rüzgâr yönü",
    ],
    [
      "Türkiye'deki karasal alanlar için hangi genelleme hatalıdır?",
      [
        "Yükselti sıcaklığa katkı verir.",
        "Denizden uzaklık etkili olabilir.",
        "Bütün iç alanlarda yağışın en fazla olduğu mevsim aynıdır.",
        "Kuzeydoğu yüksekleri yaz başı yağışı alabilir.",
        "Güneydoğuda yaz kuraklığı güçlü olabilir.",
      ],
      2,
      "İç Anadolu ile kuzeydoğu yükseklerinin tipik yağış tepesini karşılaştır.",
      "İç Anadolu'da birçok yerde ilkbahar, kuzeydoğu yükseklerinde yaz başı, Güneydoğu'nun birçok yerinde kış yağışları öne çıkabilir. Tek mevsim tüm iç alanlara genellenmez.",
      "Bölgesel fark",
    ],
    [
      "Türkiye'de benzer yükseklik, eğim ve gölgelenmede güney yamaç daha doğrudan ışın alabiliyor. Bu bilgiden hangisi çıkar?",
      [
        "Güney yamaç her gün daha yağışlıdır.",
        "Kuzey yamaçta hiç kar olmaz.",
        "Bütün güney illeri bütün kuzey illerinden her zaman sıcaktır.",
        "Bakı ile rüzgâr önü aynı kavramdır.",
        "Bakı güneşlenme koşulunu etkiler; yağış için nemli hava yolu ayrıca incelenir.",
      ],
      4,
      "Işın alma ile yağış mekanizmasını ayır.",
      "Bakı ışın alma ilişkisidir; yağışta rüzgâr yönü, nem ve yükselme gibi ek koşullar gerekir. Güney yönü tek başına daha yağışlı olmayı garanti etmez.",
      "Bakı ve yağış",
    ],
  ],
  "dunyanin-tektonik-olusumu": [
    [
      "Litosfer levhası için doğru tanım hangisidir?",
      [
        "Yalnız görünür kıtalar",
        "Tamamen sıvı dış çekirdek",
        "Kabuk ile üst mantonun en dış sert bölümünden oluşan parça",
        "Yalnız atmosfer",
        "Her yerde yalnız kıtasal kabuk",
      ],
      2,
      "Mekanik sert katman ile bileşim katmanını ayır.",
      "Levhalar litosfer parçalarıdır: kabuk ve sert en dış üst manto. Bir levha hem kıtasal hem okyanusal bölüm taşıyabilir.",
      "Katman ayrımı",
    ],
    [
      "Manto hakkında hangi yargı doğrudur?",
      [
        "Tamamı serbest akan sıvı magmadır.",
        "Büyük ölçüde katıdır; uzun zamanda şekil değiştirebilir.",
        "Yalnız buzdan oluşur.",
        "Dış çekirdekle aynı katmandır.",
        "Katıysa her zaman hiç hareket edemez.",
      ],
      1,
      "Günlük katı davranışı ile jeolojik zaman ölçeğini ayır.",
      "Manto büyük ölçüde katıdır; uzun zaman ve yüksek basınç/sıcaklık koşullarında şekil değiştirebilir. Kısmi erime alanları tüm mantonun sıvı olduğu anlamına gelmez.",
      "Mekanik davranış",
    ],
    [
      "Bir okyanus sırtında yeni taban üretiliyor ve taban iki yana taşınıyor. Sabit hız varsayımında sırta uzaklaştıkça tabanın yaşı nasıl değişir?",
      [
        "Her yerde sıfır olur.",
        "Mutlaka azalır.",
        "En yaşlı taban sırtta olur.",
        "Genellikle artar.",
        "Uzaklıkla hiçbir ilişki kurulamaz.",
      ],
      3,
      "Yeni oluşan tabanın ilk yerini düşün.",
      "Yeni taban sırt çevresinde oluşup dışarı taşındığından uzak örnekler daha uzun süre önce oluşmuştur. Modelin sabit hız varsayımı sayısal yaş hesabını mümkün kılar.",
      "Göreli yaş",
    ],
    [
      "Tek taraftaki sabit yarı yayılma hızı 3 cm/yıl; taban örneğinin sırta uzaklığı 90 km'dir. 1 cm/yıl = 10 km/milyon yıl dönüşümüyle yaş kaç milyon yıldır?",
      ["3", "30", "6", "270", "0,3"],
      0,
      "Hızı 30 km/milyon yıl birimine çevir.",
      "Yaş = uzaklık / tek yanın hızı = 90 / 30 = 3 milyon yıl. İki levhanın toplam ayrılma hızını kullanmak yaşı hatalı yarıya indirir.",
      "Yayılma hesabı",
    ],
    [
      "İki levha sınır boyunca birbirine göre yatay kayıyor; baskın hareket yanal. Bu sınır hakkındaki hangi yargı yanlıştır?",
      [
        "Levhalar birbirine göre hareket eder.",
        "Sınır boyunca yatay kayma görülür.",
        "Gerilim birikimi mümkündür.",
        "Deprem oluşabilir.",
        "Yeni okyanus kabuğu üretimi her zaman zorunludur.",
      ],
      4,
      "Yanal kaymayı sırtın iki yana açılmasıyla karıştırma.",
      "Yanal sınırın baskın hareketi yeni kabuk üretimini gerektirmez. Hareket ve gerilim deprem oluşturabilir; bu uzaklaşan sırt modeli değildir.",
      "Sınır türü",
    ],
    [
      "Okyanusal litosfer kıtasal litosferin altına dalıyor. Aşağıdaki yapı topluluklarından hangisi bu bağlamla uyumludur?",
      [
        "Yalnız buz örtüsü ve kumul",
        "Derin hendek, depremler ve uygun yerde karasal volkan yayı",
        "Her yerde yeni sırt tabanı",
        "Sadece yatay kayma, hiçbir dalma yok",
        "Kesinlikle hiçbir deprem olmaz",
      ],
      1,
      "Dalma-batmanın kıta kenarındaki izlerini düşün.",
      "Okyanus–kıta dalma-batması hendek, farklı derinlikte depremler ve uygun konumda volkan yayıyla uyumludur. Her yakınlaşma aynı değildir; iki kıta çarpışması ayrıca değerlendirilir.",
      "Dalma-batma",
    ],
    [
      "İki kıta çarpışıp kabuğu kısaltarak kalınlaştırıyor. Hangi yorum daha uygundur?",
      [
        "Uzaklaşan okyanus sırtıdır.",
        "Bütün kabuk mutlaka aynı anda yok olur.",
        "Dağ kuşağı gelişebilir; aktif okyanusal volkan yayı zorunlu değildir.",
        "Yalnız yatay transform sınırdır.",
        "Levhalar artık her yerde hareket etmez.",
      ],
      2,
      "Kıtasal çarpışmanın baskın sonucunu bul.",
      "Sıkışma ve kalınlaşma dağ oluşumunu destekler. Dalma-batma yayı her kıta–kıta çarpışmasında zorunlu değildir; deprem ise olabilir.",
      "Kıtasal çarpışma",
    ],
    [
      "Kıtaların geçmiş bağlantısı için hangi gözlem diğerlerinden daha seçicidir?",
      [
        "İki kıyıda bugün yağmur yağması",
        "İki yerde aynı gün sıcak olması",
        "İkisinin de denize kıyısı olması",
        "Karşılıklı kıtalarda eş yaşlı kayaç kuşakları ve aynı tür kara fosilleri",
        "Bugün her ikisinde şehir bulunması",
      ],
      3,
      "Eski zamana ait jeolojik kaydı güncel hava ve insan etkisinden ayır.",
      "Eş yaşlı jeolojik yapı ve kara fosili eşleşmesi geçmiş bağlantıyı sınar. Güncel benzer hava, kıyı veya şehir tek başına bu tarihsel kanıtı vermez.",
      "Tektonik kanıt",
    ],
    [
      "Genelden özele doğru hangi jeolojik zaman ilişkisi doğrudur?",
      [
        "Kuvaterner, Senozoyik'in bir dönemidir.",
        "Senozoyik, Kuvaterner'in bir ayıdır.",
        "Paleozoyik, Mesozoyik'ten sonra başlar.",
        "Prekambriyen günümüzden sonra gelir.",
        "Neojen ve Paleojen her kaynakta Kuvaterner'in alt dönemidir.",
      ],
      0,
      "Günümüze uzanan ana zamanın içindeki daha kısa dönemi seç.",
      "Kuvaterner Senozoyik içinde yer alır. Paleozoyik Mesozoyik'ten daha eskidir; eski Tersiyer adı Paleojen–Neojen için kullanılmıştır, Kuvaterner'in altı değildir.",
      "Zaman hiyerarşisi",
    ],
    [
      "Levha sınırları ile deprem ve volkan dağılışı hakkında hangi yargı doğrudur?",
      [
        "Her deprem yerinde mutlaka yanardağ vardır.",
        "Bütün volkanlar tam levha sınırındadır.",
        "Levha içlerinde hiçbir tektonik olay olmaz.",
        "Dağılış haritaları her noktada birebir aynıdır.",
        "Güçlü mekânsal ilişki vardır; levha içi deprem ve sıcak nokta gibi istisnalar da bulunur.",
      ],
      4,
      "Genel ilişki ile istisnasız özdeşliği ayır.",
      "Sınırlar önemli yoğunlaşma alanlarıdır; ancak levha içi süreçler bulunur. Bu nedenle deprem ve volkan haritaları birebir aynı değildir.",
      "Kapsam ve istisna",
    ],
  ],
  "ic-kuvvetler": [
    [
      "Basit, devrilmemiş tortul tabakalar sıkışıp yukarı kemer ve aşağı oluk biçiminde kıvrılıyor. Bu kıvrım geometrileri sırayla hangileridir?",
      [
        "Graben–horst",
        "Krater–maar",
        "Antiklinal–senklinal",
        "Dayk–sill",
        "Odak–dış merkez",
      ],
      2,
      "Blok veya volkan değil, tabaka kıvrımı soruluyor.",
      "Basit normal kıvrımda kemer antiklinal, oluk senklinal olarak adlandırılır. Yüzeydeki her tepe–vadi bu yapılarla zorunlu örtüşmez; tabaka geometrisi esastır.",
      "Kıvrım geometrisi",
    ],
    [
      "Normal faylarla çevrili bir sistemde orta blok komşularına göre alçalmıştır. Verilen yapının adı nedir?",
      ["Horst", "Graben", "Antiklinal", "Batolit", "Kaldera"],
      1,
      "Fay bloğunun göreli yüksekliğini kullan.",
      "Normal faylarla sınırlı göreli alçak blok grabendir; göreli yüksek blok horsttur. Krater ve kaldera volkanik çukurlarla ilişkilidir.",
      "Fay bloğu",
    ],
    [
      "Bir kıyıda deniz seviyesi +2 m, kara +5 m yükseliyor. Göreli deniz seviyesi değişimi kaç metredir?",
      ["+7", "+3", "+2", "−3", "−7"],
      3,
      "Deniz değişiminden kara değişimini çıkar.",
      "Karaya göre deniz = +2 − (+5) = −3 m. Mutlak deniz yükselirken daha fazla yükselen karaya göre deniz seviyesi düşebilir.",
      "Göreli seviye",
    ],
    [
      "Yerel izostatik denge modelinde 1100 m buz yükü, 0,9 g/cm³ buz ve 3,3 g/cm³ destek ortamı yoğunluğu veriliyor. Sapma h × 0,9 / 3,3 ise yükün düşey etkisi hangisidir?",
      [
        "300 m aşağı",
        "300 m yukarı",
        "1100 m yukarı",
        "3300 m aşağı",
        "0 m, yük etkisi yok",
      ],
      0,
      "Yoğunluk oranı 3/11; yük ekleniyor.",
      "1100 × 0,9 / 3,3 = 300 m bulunur. Ek yük aşağı sapmayı destekler. Denge varsayımı tepki süresini veya yıllık hızı söylemez.",
      "İzostatik model",
    ],
    [
      "Magma yer kabuğu içinde tabakaları keserek sokuluyor ve yüzeye çıkmadan katılaşıyor. Hangi eşleştirme uygundur?",
      [
        "Dış volkanizma–lav akıntısı",
        "Deprem–dış merkez",
        "Epirojenez–tsunami",
        "Kıyı aşınması–kumul",
        "İç volkanizma–dayk",
      ],
      4,
      "Tabakaları kesen sokulmayı yüzey akıntısından ayır.",
      "Tabakaları kesen magmatik sokulma dayk, tabakalara paralel sokulma sill için kullanılır. Yüzeye çıkmadan katılaşma iç volkanizmadır.",
      "Volkanik yapı",
    ],
    [
      "Düz bir yüzeyin 12 km altında kayma başlıyor; bu noktanın yüzeydeki dik izdüşümü K. Hangi eşleştirme doğrudur?",
      [
        "Derindeki nokta dış merkez, K odak",
        "Derindeki nokta odak, K dış merkez",
        "İkisi de yalnız krater",
        "K'nın odak derinliği zorunlu 0 km",
        "Derindeki nokta sill, K dayk",
      ],
      1,
      "Başlangıç yer içinde mi, yüzeyde mi?",
      "Yer içi başlangıç odak/hiposantr, onun yüzeydeki dik izdüşümü dış merkez/episantrdır. Odak derinliği 12 km'dir; K yüzey konumudur.",
      "Odak konumu",
    ],
    [
      "Aynı büyüklükte iki depremin birinde hasar çok, diğerinde azdır. Hangisi bilimsel olarak daha uygundur?",
      [
        "Aynı büyüklük her noktada aynı şiddet demektir.",
        "Hasar farkı ölçümün mutlaka sahte olduğunu gösterir.",
        "Uzaklık, derinlik, zemin ve yapı koşulları yerel etkiyi değiştirebilir.",
        "Sismograf hasarı doğrudan yüzde olarak ölçer.",
        "Yerel şiddet hiçbir koşuldan etkilenmez.",
      ],
      2,
      "Kaynak ölçeği ile bir yerdeki etkiyi ayır.",
      "Büyüklük kaynak ölçeğiyle, şiddet yerel hissedilme ve etkiyle ilişkilidir. Aynı büyüklükte olayların etkileri yerel koşullarla değişebilir.",
      "Büyüklük ve şiddet",
    ],
    [
      "Deniz altında bir fayda baskın hareket yataydır; suyu harekete geçirecek düşey taban değişimi veya heyelan bilgisi verilmemiştir. Hangisi doğrudur?",
      [
        "Kesin dev tsunami olur.",
        "Her deprem aynı dalga yüksekliğini üretir.",
        "Deniz üstündeki bütün kıyılar eşit etkilenir.",
        "Verilenlerden tsunami zorunlu sonucu çıkarılamaz.",
        "Olayın saati ve büyüklüğü kesin tahmin edilir.",
      ],
      3,
      "Tsunami için su kütlesini hareket ettiren mekanizmayı ara.",
      "Yalnız deniz altında deprem bilgisi yeterli değildir. Yeterli taban yer değiştirmesi veya heyelan gibi süreçler ve deniz geometrisi değerlendirilmelidir; zorunlu dalga ve yükseklik çıkarılamaz.",
      "Tsunami koşulu",
    ],
    [
      "Deniz seviyesi sabit, geniş bir kıyı kara alanı yavaşça alçalıyor. Başka etki yok ve kıyı eğimi uygun. Hangi eğilim beklenir?",
      [
        "Denizin karaya ilerlemesi, transgresyon",
        "Zorunlu yeni okyanus sırtı",
        "Her yerde volkan konisi",
        "Mutlaka antiklinal oluşumu",
        "Deniz seviyesinin karaya göre düşmesi",
      ],
      0,
      "Referans karası alçalınca denizin göreli konumunu düşün.",
      "Kara alçalınca deniz karaya göre yükselir ve uygun kıyıda ilerleyebilir. Buna transgresyon denir. Sabit deniz düzeyi varsayımı, olası başka nedeni bu soruda dışlar.",
      "Düşey kıyı hareketi",
    ],
    [
      "X alanında kıvrımlı tabakalar; Y alanında lav ve kül katları gözleniyor. Hangi yorum daha uygundur?",
      [
        "İkisi de yalnız rüzgâr birikimidir.",
        "İkisi de mutlaka sıcak nokta volkanıdır.",
        "Bütün yüksek yerler aynı kökenlidir.",
        "X'te tabaka geometrisi önemsizdir.",
        "X kıvrımlanmayı, Y dış volkanizmayı destekler; aynı bölgede başka süreçler de etkili olabilir.",
      ],
      4,
      "Ortak görünüşten önce oluşum kanıtlarını ayır.",
      "Tabaka deformasyonu ile yüzeye çıkan lav/kül farklı mekanizmaları gösterir. Sonraki aşınma ve başka iç süreçler de güncel şekle katkı yapabilir.",
      "Süreç kanıtı",
    ],
  ],
};
export const forge015GeographyTopics: Record<string, string> = {
  "buyuk-iklim-tipleri": "detail-44",
  "turkiye-iklimi": "detail-45",
  "dunyanin-tektonik-olusumu": "detail-46",
  "ic-kuvvetler": "detail-47",
};
export const forge015GeographyGuides: LessonGuide[] = authoredGuides.map(
  ({ title: _title, ...guide }) => guide,
);
export const forge015GeographyLessons: Lesson[] = authoredGuides.map(
  (guide) => ({
    id: guide.id,
    subjectId: "tyt-cografya",
    title: txt(guide.title),
    minutes: guide.minutes,
    objectives: guide.objectives.map(txt),
    body: guide.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: banks[guide.id].map(
      ([prompt, options, answer, hint, explanation, skill], i): Question => ({
        id: `f015-${guide.id}-q${i + 1}`,
        prompt: txt(prompt),
        options: options.map(txt),
        answer,
        hint: txt(hint),
        explanation: txt(explanation),
        skill,
      }),
    ),
    source: txt(guide.source),
    tags: [
      "kaynakli-anlatim",
      "etkilesimli",
      "ozgun-sorular",
      forge015GeographyTopics[guide.id],
    ],
  }),
);

function bounded(value: number, min: number, max: number, name: string) {
  if (!Number.isFinite(value) || value < min || value > max)
    throw new RangeError(name);
  return value;
}
export const geography015Months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
] as const;
export type Climate015Profile = {
  id: string;
  label: string;
  temperatures: readonly number[];
  rain: readonly number[];
  context: string;
  vegetation: string;
  evidence: string;
  latitude: number;
  longitude: number;
  region: string;
};
/** Authored teaching sequences, not observed city normals. Latitude marks one broad example region, never a deterministic climate rule. */
export const climate015Profiles: readonly Climate015Profile[] = [
  {
    id: "equatorial",
    label: "Ekvatoral",
    temperatures: [26, 26, 27, 27, 26, 25, 25, 26, 27, 27, 26, 26],
    rain: [180, 160, 210, 220, 190, 150, 140, 150, 180, 220, 230, 200],
    context:
      "Ekvatora yakın alçak, nemli havzalar; yükselti ve yerel dolaşım ayrıca etkili.",
    vegetation: "Tropikal yağmur ormanı",
    evidence: "Yıl boyu sıcak ve yağışlı; yıllık sıcaklık farkı küçük.",
    latitude: 0,
    longitude: 22,
    region: "Kongo havzası çevresi",
  },
  {
    id: "savanna",
    label: "Savan",
    temperatures: [24, 26, 28, 30, 29, 27, 26, 26, 27, 28, 26, 24],
    rain: [3, 5, 15, 40, 100, 180, 250, 240, 160, 70, 15, 5],
    context:
      "Tropikal kuşakta yağış kuşaklarının mevsimlik yer değiştirmesi; belirgin kurak dönem.",
    vegetation: "Uzun otlar ve seyrek ağaçlar",
    evidence: "Sıcaklıklar yüksek, yaz yağışı belirgin; kurak aylar var.",
    latitude: 12,
    longitude: 15,
    region: "Tropikal Afrika kuşağı",
  },
  {
    id: "desert",
    label: "Çöl",
    temperatures: [13, 16, 20, 24, 29, 33, 35, 34, 30, 25, 19, 14],
    rain: [4, 3, 4, 3, 2, 0, 0, 0, 1, 2, 3, 4],
    context:
      "Bu örnek sıcak subtropikal çöldür; kıta içi soğuk çöller de vardır. Yağış azlığının nedeni ayrıca araştırılır.",
    vegetation: "Seyrek kurakçıl ot ve çalılar",
    evidence: "Yağış bütün aylarda çok az; bu örnekte yaz sıcak.",
    latitude: 25,
    longitude: 12,
    region: "Sahra'nın iç kesimleri",
  },
  {
    id: "monsoon",
    label: "Muson",
    temperatures: [21, 23, 26, 29, 30, 29, 28, 28, 28, 27, 24, 22],
    rain: [10, 15, 25, 55, 140, 360, 480, 420, 290, 140, 40, 15],
    context:
      "Yazın denizden karaya nemli akım ve dağa yükselme; Güney Asya bağlamı.",
    vegetation: "Mevsimlik yaprak döken muson ormanı",
    evidence:
      "Yaz yağışı çok belirgin; mevsimlik rüzgâr bilgisi ayrımı destekler.",
    latitude: 18,
    longitude: 80,
    region: "Güney Asya çevresi",
  },
  {
    id: "mediterranean",
    label: "Akdeniz",
    temperatures: [8, 9, 12, 16, 20, 25, 28, 28, 24, 19, 13, 9],
    rain: [115, 95, 80, 55, 30, 12, 5, 8, 30, 70, 100, 120],
    context:
      "Orta kuşağın alçak batı kıyıları; yaz yüksek basıncı, kış gezici sistemleri. Yalnız Akdeniz havzasında görülmez.",
    vegetation: "Kızılçam ve maki toplulukları",
    evidence: "Sıcak yaz kurak; serin dönem daha yağışlı.",
    latitude: 37,
    longitude: 18,
    region: "Akdeniz havzası çevresi",
  },
  {
    id: "oceanic",
    label: "Ilıman okyanusal",
    temperatures: [5, 5, 7, 9, 12, 15, 17, 17, 15, 11, 8, 6],
    rain: [90, 70, 75, 65, 70, 65, 70, 80, 85, 100, 105, 100],
    context:
      "Orta kuşağın denize açık batı kıyısı; deniz, batı akımları ve uygun akıntı koşulları.",
    vegetation: "Karışık orman",
    evidence: "Yağış yıl içine yayılmış, yıllık sıcaklık farkı görece sınırlı.",
    latitude: 50,
    longitude: -5,
    region: "Batı Avrupa çevresi",
  },
  {
    id: "steppe",
    label: "Step",
    temperatures: [-2, 0, 5, 11, 16, 20, 24, 23, 18, 12, 6, 0],
    rain: [25, 25, 35, 45, 50, 30, 10, 8, 15, 25, 30, 27],
    context:
      "Deniz etkisinin zayıf olduğu yarı kurak iç alan; yükselti ve su kaybı da değerlendirilir.",
    vegetation: "Bozkır",
    evidence: "Yağış sınırlı; kış soğuk, yaz kurak ve sıcak.",
    latitude: 43,
    longitude: 65,
    region: "Orta Asya'nın iç alanları",
  },
  {
    id: "continental",
    label: "Sert karasal",
    temperatures: [-28, -24, -14, 0, 10, 17, 20, 16, 8, -2, -16, -25],
    rain: [15, 12, 15, 20, 35, 60, 75, 65, 40, 30, 22, 18],
    context:
      "Deniz etkisinden uzak yüksek enlemli kıta içi; bu temsilde uzun soğuk kış.",
    vegetation: "Uygun yerlerde tayga ve çayır",
    evidence:
      "Yıllık sıcaklık farkı büyük; yaz kısa, yağış sıcak dönemde artıyor.",
    latitude: 60,
    longitude: 100,
    region: "Sibirya içleri",
  },
  {
    id: "tundra",
    label: "Tundra",
    temperatures: [-24, -25, -22, -14, -5, 3, 7, 5, 0, -8, -16, -22],
    rain: [15, 12, 13, 15, 20, 25, 35, 40, 30, 25, 20, 18],
    context:
      "Kutup çevresi kıyı kuşağı; kısa serin yaz, yüzeyde mevsimlik çözülme.",
    vegetation: "Yosun, liken ve cüce çalılar",
    evidence:
      "En sıcak ay 7 °C; kısa yazda aylık ortalama sıfırın üstüne çıkıyor.",
    latitude: 72,
    longitude: 80,
    region: "Kuzey Sibirya kıyı çevresi",
  },
  {
    id: "polar",
    label: "Buz örtülü kutup",
    temperatures: [-28, -30, -31, -30, -26, -20, -16, -18, -23, -26, -27, -28],
    rain: [7, 6, 6, 6, 7, 8, 8, 8, 7, 7, 7, 7],
    context:
      "Kutup buz örtüsü; bu dizi yarımküre konumunu belirleyen gerçek bir istasyon ölçümü değildir.",
    vegetation: "Sürekli buz örtüsünde gelişmiş bitki örtüsü yok",
    evidence: "En sıcak ay bile sıfırın altında; yağış az.",
    latitude: 75,
    longitude: -42,
    region: "Grönland iç buz örtüsü",
  },
];
export function climate015State(id: string, hemisphere: string, month: number) {
  const profile = climate015Profiles.find((x) => x.id === id);
  if (
    !profile ||
    !["north", "south"].includes(hemisphere) ||
    !Number.isInteger(month) ||
    month < 0 ||
    month > 11
  )
    throw new RangeError("CLIMATE_STATE");
  const shifted = (values: readonly number[]) =>
    Array.from(
      { length: 12 },
      (_, i) => values[(i + (hemisphere === "south" ? 6 : 0)) % 12],
    );
  const temperatures = shifted(profile.temperatures),
    rain = shifted(profile.rain),
    annualRain = rain.reduce((a, b) => a + b, 0),
    minTemperature = Math.min(...temperatures),
    maxTemperature = Math.max(...temperatures);
  return {
    profile,
    temperatures,
    rain,
    annualRain,
    minTemperature,
    maxTemperature,
    range: maxTemperature - minTemperature,
    monthTemperature: temperatures[month],
    monthRain: rain[month],
    summerRain: (hemisphere === "north" ? [5, 6, 7] : [11, 0, 1]).reduce(
      (a, i) => a + rain[i],
      0,
    ),
    winterRain: (hemisphere === "north" ? [11, 0, 1] : [5, 6, 7]).reduce(
      (a, i) => a + rain[i],
      0,
    ),
  };
}
export const turkey015Stations = [
  {
    id: "mediterranean",
    label: "Temsili Akdeniz kıyısı",
    temperatures: [10, 11, 13, 17, 21, 26, 29, 29, 25, 20, 15, 11],
    rain: [140, 110, 85, 55, 30, 12, 5, 8, 25, 70, 115, 145],
    setting: "Alçak, denize açık kıyı; yaz kuraklığı ve ılık kış.",
    evidence:
      "Yağışın kışta toplanması ve yazın çok azalması Akdeniz kıyı örüntüsünü destekler.",
  },
  {
    id: "black-sea",
    label: "Temsili Karadeniz kıyısı",
    temperatures: [7, 7, 9, 12, 16, 20, 23, 23, 20, 16, 12, 9],
    rain: [100, 80, 75, 70, 75, 90, 100, 120, 150, 180, 150, 120],
    setting: "Denize açık nemli kıyı; kuzeyli nemli akıma açık dağ yamacı.",
    evidence:
      "Yazın da yağış sürüyor; sonbahar tepe yapıyor. Kesin il adı bu temsilden çıkarılmaz.",
  },
  {
    id: "central",
    label: "Temsili iç havza",
    temperatures: [-1, 1, 6, 11, 16, 21, 24, 23, 18, 12, 6, 1],
    rain: [35, 30, 35, 45, 55, 30, 10, 8, 15, 30, 35, 40],
    setting: "Deniz etkisi zayıf, orta yükseltili iç havza; yaz kuraklığı.",
    evidence:
      "Soğuk kış ve büyük yıllık fark; yağışın ilkbaharda artması bu temsilde belirgin.",
  },
  {
    id: "northeast",
    label: "Temsili yüksek kuzeydoğu",
    temperatures: [-11, -9, -3, 4, 9, 13, 16, 16, 11, 5, -2, -8],
    rain: [20, 20, 30, 45, 65, 80, 65, 45, 30, 35, 25, 20],
    setting: "Yüksek iç alan; uzun soğuk kış ve serin yaz.",
    evidence:
      "Yağış sıcak dönemin başında artıyor; iç alanların hepsinde tepe mevsimi aynı değildir.",
  },
] as const;
export function turkey015State(
  id: string,
  elevation: number,
  aspect: string,
  corridor: string,
) {
  const station = turkey015Stations.find((x) => x.id === id);
  if (
    !station ||
    !["south", "north"].includes(aspect) ||
    !["parallel", "corridor"].includes(corridor)
  )
    throw new RangeError("TURKEY_STATE");
  bounded(elevation, 0, 3000, "TURKEY_ELEVATION");
  return {
    station,
    annualRain: station.rain.reduce((a, b) => a + b, 0),
    range:
      Math.max(...station.temperatures) - Math.min(...station.temperatures),
    modelTemperature: 20 - elevation / 200,
    cooling: elevation / 200,
    elevation,
    aspect,
    corridor,
    access:
      corridor === "parallel"
        ? "Kıyıya paralel engel: nemli hava rüzgâr önü yamaçta yükselir; içe erişim sınırlanabilir."
        : "Kıyıya açılan koridor: deniz etkisinin içeri erişimi daha kolay olabilir; iç alan aynı iklime dönüşmek zorunda değildir.",
    sunlight:
      aspect === "south"
        ? "Güney bakı: aynı eğim ve gölgelenmede daha doğrudan ışın alabilir; kesin sıcaklık veya yağış eklenmez."
        : "Kuzey bakı: aynı eğimde ışın alma daha sınırlı olabilir; rüzgâr önü olmak ayrı bir koşuldur.",
  };
}
export const tectonic015Layers = [
  {
    label: "Kabuk",
    detail:
      "Kıtasal ve okyanusal türleri vardır; kalınlık ve yoğunlukları genel olarak farklıdır. Litosferin tamamı değildir.",
  },
  {
    label: "Litosfer",
    detail:
      "Kabuk ve en dış sert üst manto birlikte. Levha hem kıtasal hem okyanusal parça taşıyabilir.",
  },
  {
    label: "Manto",
    detail:
      "Büyük ölçüde katı; uzun zamanda şekil değiştirebilir. Astenosfer daha zayıf üst manto bölümüdür, bütün manto sıvı değildir.",
  },
  {
    label: "Dış çekirdek",
    detail:
      "Sıvı mekanik davranış; iç çekirdekle aynı fiziksel hâlde değildir.",
  },
  {
    label: "İç çekirdek",
    detail:
      "Çok yüksek basınç altında katı; sıcak olmak tek başına sıvı olmayı gerektirmez.",
  },
] as const;
export const tectonic015Boundaries = [
  {
    id: "divergent",
    label: "Uzaklaşan",
    evidence:
      "Levhalar ayrılıyor. Okyanus sırtında yeni kabuk üretimi, genç taban ve uzaklaştıkça artan yaş uyumlu.",
    limit:
      "Bu şekil okyanus sırtı örneğidir; kıtasal riftin henüz geniş okyanus olması gerekmez.",
  },
  {
    id: "subduction",
    label: "Okyanus / kıta yakınlaşması",
    evidence:
      "Daha yoğun okyanusal litosfer kıtasal litosferin altına dalıyor. Hendek, deprem ve uygun konumda volkan yayı uyumlu.",
    limit:
      "Her sınırı aynı şema sayma; iki kıta çarpışınca aynı volkan yayı şart değildir.",
  },
  {
    id: "collision",
    label: "Kıta–kıta çarpışması",
    evidence:
      "Kıtasal litosferler yaklaşıyor; sıkışma ve kabuk kalınlaşması dağ kuşağını destekliyor.",
    limit:
      "Bu model aktif bir okyanusal volkan yayını veya her yerde aynı deprem derinliğini gerektirmez.",
  },
  {
    id: "transform",
    label: "Yanal sınır",
    evidence:
      "Levhalar sınır boyunca birbirine göre yatay kayıyor. Gerilim ve deprem olabilir; yeni kabuk üretimi zorunlu değil.",
    limit: "Üstten şemadır; oklar dalma ya da yükselme göstermiyor.",
  },
] as const;
export function tectonic015State(
  boundary: string,
  distance: number,
  halfRate: number,
  layer: number,
) {
  const found = tectonic015Boundaries.find((x) => x.id === boundary);
  if (
    !found ||
    !Number.isInteger(layer) ||
    layer < 0 ||
    layer >= tectonic015Layers.length
  )
    throw new RangeError("TECTONIC_STATE");
  bounded(distance, 0, 400, "RIDGE_DISTANCE");
  bounded(halfRate, 1, 10, "RIDGE_HALF_RATE");
  return {
    boundary: found,
    layer: tectonic015Layers[layer],
    distance,
    halfRate,
    ageMa: distance / (10 * halfRate),
    totalRate: 2 * halfRate,
  };
}
export const internal015Modes = [
  ["fold", "Kıvrımlanma"],
  ["block", "Fay blokları"],
  ["isostasy", "Buz yükü ve denge"],
  ["volcano", "Volkanizma"],
  ["earthquake", "Odak ve dış merkez"],
] as const;
export function internal015State(
  mode: string,
  amount: number,
  ice: number,
  depth: number,
  intrusion: boolean,
  underwater: boolean,
  vertical: boolean,
) {
  if (!internal015Modes.some((x) => x[0] === mode))
    throw new RangeError("INTERNAL_MODE");
  if (![intrusion, underwater, vertical].every((v) => typeof v === "boolean"))
    throw new RangeError("INTERNAL_CONDITIONS");
  bounded(amount, 0, 60, "INTERNAL_DEFORMATION");
  bounded(ice, 0, 2000, "ISOSTASY_ICE");
  bounded(depth, 5, 35, "FOCUS_DEPTH");
  return {
    mode,
    amount,
    ice,
    depth,
    intrusion,
    underwater,
    vertical,
    deflection: (ice * 0.9) / 3.3,
    relativeSea: (ice * 0.9) / 3.3,
    tsunamiCondition: underwater && vertical,
    volcanoConclusion: intrusion
      ? "İç volkanizma: tabakaları kesen dayk ve paralel sill; magma yüzeye çıkmadan sokuluyor."
      : "Dış volkanizma: yüzeye çıkan lav, kül ve gaz; volkan konisi ve krater birikim/püskürme yapıları.",
    quakeConclusion:
      underwater && vertical
        ? "Deniz tabanında düşey yer değiştirmesi verilmiş: tsunami oluşum koşulu ele alınır; oluşacağı veya dalga yüksekliği zorunlu değildir."
        : "Verilen bilgilerden tsunami zorunlu sonucu çıkarılamaz; su kütlesini harekete geçirecek mekanizma ve ek veriler gerekir.",
  };
}
