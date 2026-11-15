import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";
import type { CheatSheet } from "./cheatsheetContent";

const section = (title: string, a: string, b: string): GuideSection => ({
  title,
  paragraphs: [a, b],
});
const example = (
  title: string,
  prompt: string,
  strategy: string,
  steps: [string, string][],
  answer: string,
  check: string,
  pitfall: string,
): WorkedExample => ({
  title,
  prompt,
  strategy,
  steps: steps.map(([label, explanation]) => ({ label, explanation })),
  answer,
  check,
  pitfall,
});

export const connectorsGuide: LessonGuide = {
  id: "edat-baglac-unlem",
  minutes: 65,
  objectives: [
    "Edat öbeği, eş görevli öğe bağlantısı ve ünlem işlevini cümleyle kanıtla.",
    "İle, de ve ki biçimlerini görev/yazım bakımından ayır.",
    "Amaç, neden, karşılaştırma ve sınır anlamlarını bağlam içinde belirle.",
    "Bir cümlenin tamamı yerine sorulan öbeğin içini incele.",
  ],
  sections: [
    section(
      "Üç görev, üç farklı kanıt",
      "Edat (ilgeç), kendisinden önceki ad veya söz öbeğiyle birlikte başka bir öğeye anlam ilişkisi kurar: ‘Takıma göre program yaptık.’ Bağlaç, eş görevli sözcükleri, öbekleri ya da yargıları bağlar: ‘Programı yaptık ama değiştirdik.’ Ünlem, duygu, seslenme veya anlık tepki bildirir: ‘Eyvah, program silindi!’ Önce kelimenin cümledeki işini açıkla; yalnız bir sözcük listesinden tür seçme.",
      "Bağlacın iki yanında aynı uzunlukta sözler bulunması gerekmez. ‘İnce ve oldukça dayanıklı bir ip’ sözünde iki niteleyici yapı bağlanır. Edat ise tek başına aynı şekilde iki eş öğe kurmaz: ‘İp gibi ince’ benzerlik öbeğidir. Ünlem işareti bütün cümlenin tonunu belirtebilir; cümledeki her sözcüğü ünlem yapmaz.",
    ),
    section(
      "Edatın öbeğini ve anlamını birlikte bul",
      "Gibi benzerlik veya bağlama göre olasılık, kadar ölçü/karşılaştırma/sınır, göre görüş veya ölçüt, için amaç/neden/yarar ilişkileri kurabilir. ‘Dinlenmek için durdu.’ hedeflenen bir işi; ‘Hasta olduğu için durdu.’ gerçekleşmiş nedenin etkisini anlatır. Aynı için sözcüğüne her cümlede amaç etiketi verme.",
      "‘Buz gibi su’ öbeği suyu nitelerken ‘Buz gibi üşüdü.’ ifadesi eylemi açıklar; gibi sözcüğü iki yapıda da edattır. Öbeğin bütün olarak sıfat veya zarf görevinde bulunması, içindeki edatın sözcük türünü kendiliğinden değiştirmez. -e doğru, -e rağmen, -den dolayı, -den önce, -den sonra gibi yapılarda durum ekini ve edatı birlikte okuyarak ilişkinin sınırını göster.",
    ),
    section(
      "İle: eş görevli iki ad mı, araç veya birliktelik mi?",
      "‘Ada ile Can projeyi bitirdi.’ cümlesinde Ada ve Can aynı özne grubunun iki parçasıdır; ile bağlaçtır. ‘Ada makas ile kâğıdı kesti.’ cümlesindeyse makas kesmenin aracıdır; ile edattır. Makas ve kâğıt bu cümlede eş görevli iki özne değildir. ‘Ada, Can ile geldi.’ ifadesinde Can ile birliktelik öbeği kurar; özne Ada’dır.",
      "Ve değişimi bir kontrol aracıdır: özne grubunda ile yerine ve getirildiğinde görev korunabilir. Fakat kulağa düzgün gelen yeni bir cümle üretmek yeterli değildir; aynı anlam ve öğe ilişkisi korunmalıdır. -la/-le biçimi de ile kaynaklı olabilir: ‘Fırçayla boyadı.’ araç edatı; ‘Annesiyle babası geldi.’ eş özne bağlantısıdır. Tek başına bitişik yazılış türü kesinleştirmez.",
    ),
    section(
      "Bağlaçların kurduğu anlam ilişkileri",
      "Ve, hem…hem ekleme; veya, ya da seçenek; ama, fakat, oysa karşıtlık; çünkü, zira açıklama veya neden; yani açıklık; eğer koşul ilişkisi kurabilir. ‘Hem çizdi hem boyadı.’ iki eylemi, ‘İnce ama sağlam’ iki niteliği bağlar. Seçim yaparken hangi iki parçanın bağlandığını açıkça yaz.",
      "Ne…ne yapısı ‘Ne mesaj geldi ne telefon çaldı.’ örneğinde olumsuzluk bildirirken ‘Ne sıcak ne soğuk.’ ifadesinde iki uç arasında olmayı anlatır. Bağlaç çıkarıldığında temel bir cümle kalabilse bile karşıtlık, ekleme veya neden vurgusu kaybolabilir. Bu nedenle ‘Çıkarınca anlam hiç değişmezse bağlaçtır.’ mutlak bir kural değildir; sözdizimi ile anlamı birlikte denetle.",
    ),
    section(
      "De/da: ekleme bağı ile bulunma ekini ayır",
      "‘Durakta bekledi.’ sözünde -ta bulunma durumu ekidir; nerede sorusuna cevap veren ada bitişir. ‘Durak da kalabalıktı.’ sözündeki ayrı da, başka yerlerin yanında durağı da yargıya katan bağlaçtır. ‘Durakta da bekledi.’ cümlesinde iki ayrı görev birlikte bulunur: durak-ta durum eki, ayrı da bağlaç.",
      "Bağlaç olan de/da ayrı yazılır ve te/ta biçimine dönüşmez: ‘Kitap da geldi.’ Bulunma eki ses uyumuna göre -de/-da/-te/-ta olabilir. Özel ada gelen ekin kesmeyle ayrılması da onu bağlaç yapmaz: ‘Ankara’da’ bulunma ekidir. Bile değişimi yardımcı olabilir fakat tek başına her bağlamı çözmez; yazım, anlam ve bağlandığı öğeyi göster.",
    ),
    section(
      "Ki: bağlaç, sıfat yapan ek ve ilgi zamiri",
      "‘Fark ettim ki kapı açık.’ sözünde ki iki yargıyı bağlayan ayrı yazılan bağlaçtır. ‘Dolaptaki dosya’ sözündeki bitişik -ki, dosyayı belirten bir sıfat kurar. ‘Benimki kayboldu.’ sözünde -ki, adı söylenmeyen varlığın yerini tutan ilgi zamiridir. Önce hangi adın belirtildiğini veya yerinin tutulduğunu belirle.",
      "Çünkü, belki, sanki, mademki, oysaki, hâlbuki gibi kalıplaşmış sözcüklerin yazımı ayrıca öğrenilir. İçlerinde ki sesi var diye her birini iki bağımsız sözcüğe ayırma. ‘Dünkü plan’ zaman adına gelen sıfat yapan ek örneğidir. Ek/bağlaç ayrımı ile kelimenin tamamının türünü aynı soru sanma: dolaptaki bir sıfat biçimidir, ki onun içindeki ektir.",
    ),
    section(
      "Yalnız ve ancak: kaynakların adlandırma sınırı",
      "‘İsterim, yalnız vaktim yok.’ ifadesinde yalnız, fakat anlamıyla iki yargıyı bağlar; bağlaçtır. ‘Yalnız çocuk bekliyordu.’ sözünde yalnız çocuğu niteler; sıfattır. ‘Çocuk yalnız yürüdü.’ ifadesinde tek başına yürüme biçimini bildirir; zarftır. Aynı yazılışa her yerde tek etiket vermek bu bağları siler.",
      "Sadece anlamındaki yalnız/ancak/bir/tek kullanımları OGM İsim Soylu Sözcükler notunda edat olarak sınıflanır; bazı özetlerde sınırlama zarfı terimi kullanılabilir. Bu rehber OGM’nin edat sınıflamasını açıkça belirtir; tür adlandırması değişen kullanımları bağlamsız tek-doğrulu soru yapmaz. ‘Ancak sen çözersin.’ sözünde asıl anlam kanıtı yalnızca sen sınırlamasıdır; ‘Çözerdim, ancak süre bitti.’ ise karşıtlık bağlacıdır.",
    ),
    section(
      "Ünlem: duygu, seslenme ve adlaşma",
      "Ah, of, eyvah, tüh, hey, aferin gibi sözler uygun bağlamda duygu, tepki veya seslenme bildirir. ‘Hey, sesimi duyuyor musun?’ sözünde hey seslenme ünlemidir. ‘Ne güzel bir gün!’ cümlesinin duygulu söylenmesi güzel sözcüğünü otomatik ünlem yapmaz; güzel gün adını nitelemeye devam eder.",
      "‘Çocuklar, buraya bakın!’ sözünde çocuklar isimdir; seslenme işlevi kazanmıştır. Ünlem kökenli bir söz isim çekim eki aldığında adlaşabilir: ‘Ahlarını duyduk.’ örneğinde ah-lar-ı belirtme ekiyle nesne olur. Sözcüğün sözlük kökenini, bu cümledeki türünü ve ifadenin iletişim işlevini ayrı ayrı açıklamak karışıklığı önler.",
    ),
    section(
      "Mi ve fiilimsi biçimleri: yakın ama farklı yapılar",
      "Mi/mı/mu/mü soru parçacığı ayrı yazılır; OGM bu yapıyı soru edatı başlığı altında ele alır: ‘Gelecek misiniz?’ Kişi eki soru parçacığına bitişebilir. ‘Güzel mi güzel’ pekiştirme anlamı taşır. İçinde aktarılan veya birden fazla soru bulunan bütün cümleler için tek soru sözcüğü yasağı çıkarma; istenen yapıyı kendi cümleciğinde incele.",
      "‘Danışman olarak katıldı.’ sözündeki olarak, ol- fiili ve -arak zarf-fiil ekiyle kurulmuştur; her olarak biçimini doğrudan edat listesine ekleme. Benzer biçimde bir öbeğin neden veya zaman anlamı taşıması, bütün iç sözcüklerin edat olduğunu göstermez. Kök, ek, sözcük türü ve öbek işlevini ayrı basamaklarda kontrol et.",
    ),
    section(
      "Soruda kapsam ve karşı örnek denetimi",
      "Önce olumlu/olumsuz kökü ve hedefi bul: tek sözcük mü, bütün öbek mi, yer tamlayıcısı mı? ‘Toplantıdan sonra bahçeden ayrıldık.’ cümlesinde sonra zaman edatı öbeğine katılır; yer tamlayıcısı bahçeden sözcüğüdür. Cümlede edat bulunması, yer tamlayıcısının içinde edat bulunduğunu kanıtlamaz.",
      "Her seçenek için kanıtı kısa bir cümleyle yaz; sonra en yakın karşı örneği dene. İle için eş özne/araç, de için ek/bağlaç, ki için niteleme/bağlama, ünlem için duygu/adlaşma çiftleri kur. Etkileşimli cümle dönüşümü farklı görevi gösterir; kendi yazdığın gerekçe otomatik dil çözümlemesiyle puanlanmaz. Bağımsız yeni soruda aynı ilişkiyi not kapalı yeniden kur.",
    ),
  ],
  examples: [
    example(
      "İle için iki yönlü kontrol",
      "‘Mina ile Bora dosyayı açtı.’ ve ‘Mina anahtar ile kutuyu açtı.’ cümlelerindeki ileleri karşılaştır.",
      "İki yanı aynı öğe görevinde mi, önce onu bul.",
      [
        [
          "Bağlanan adlar",
          "Mina ve Bora ortak özne grubudur; ile yerine ve geldiğinde görev korunur.",
        ],
        [
          "Araç ilişkisi",
          "Anahtar ile, kutuyu açmanın aracıdır; anahtar ile kutu eş özne değildir.",
        ],
        ["Karar", "İlk ile bağlaç, ikinci ile edattır."],
      ],
      "Bağlaç / araç edatı.",
      "İkinci cümlede ‘neyle açtı?’ sorusu araç öbeğini gösterir.",
      "Sadece iki isim yan yana duruyor diye bağlaç deme.",
    ),
    example(
      "Bir cümlede iki da",
      "‘Bahçede de ışık vardı.’ cümlesindeki iki de yapısını ayır.",
      "Bitişik ek ile ayrı sözcüğü işaretle.",
      [
        ["Durum eki", "Bahçe-de, nerede sorusuna cevap veren isimdir."],
        ["Ekleme", "Ayrı de, başka yerlerin yanında bahçeyi de yargıya katar."],
        [
          "Kontrol",
          "Bahçede yalnız kalabilir; bağlacın ekleme vurgusu ise çıkarınca kaybolur.",
        ],
      ],
      "-de bulunma eki; de bağlaç.",
      "‘Kitapta da’ aktarımında ek -ta olur, bağlaç da kalır.",
      "Bağlaç olan deyi -te/-ta yazma.",
    ),
    example(
      "Ki için üç kapı",
      "‘Biliyorum ki anahtar çekmecedeki kutuda; benimki ise masada.’ sözündeki ki yapılarını çöz.",
      "İki yargı, ad nitelemesi ve adın yerini tutmayı sırayla denetle.",
      [
        ["Yargı bağı", "Biliyorum ki yapısında ki ayrı bağlaçtır."],
        [
          "Niteleme",
          "Çekmecedeki, kutu adını belirtir; -ki sıfat yapan ektir.",
        ],
        [
          "Yer tutma",
          "Benimki, benim anahtarım anlamında adı karşılar; ilgi zamiri ekidir.",
        ],
      ],
      "Bağlaç / sıfat yapan ek / ilgi zamiri.",
      "Ad niteleyen ekin ardından kutu açıkça vardır; benimkide aynı ad söylenmez.",
      "Her kiyi bağlaç kabul etme.",
    ),
    example(
      "Yer tamlayıcısının sınırı",
      "‘Yağıştan sonra evden çıktım.’ cümlesinin yer tamlayıcısında edat bulunur mu?",
      "Önce yüklemden nereden sorusunu sor.",
      [
        [
          "Hedef öbek",
          "Nereden çıktım? Evden: yer tamlayıcısı yalnız bu sözcüktür.",
        ],
        [
          "Başka ilişki",
          "Yağıştan sonra zaman öbeğidir ve sonra edatını içerir.",
        ],
        ["Sonuç", "Cümlede edat vardır; sorulan yer tamlayıcısında yoktur."],
      ],
      "Hayır; evden içinde edat yoktur.",
      "Zaman öbeğini kaldırınca evden çıktım ilişkisi korunur.",
      "Cümledeki bütün sözcükleri sorulan öğenin içine taşıma.",
    ),
    example(
      "Ünlem mi, adlaşmış söz mü?",
      "‘Ah, yine unuttum!’ ve ‘O uzun ahları unutamadım.’ örneklerindeki ahları ayır.",
      "İkinci biçimin eklerini ve nesne görevini incele.",
      [
        ["Tepki", "İlk ah, anlık üzüntü bildiren ünlemdir."],
        [
          "Çekim",
          "İkinci ah-lar-ı çoğul ve belirtme eki alır; söylenen yakınmaların adıdır.",
        ],
        ["Karşılaştır", "Ünlem kökenli bir söz ikinci kullanımda adlaşmıştır."],
      ],
      "Ünlem / isimleşmiş ünlem kökenli söz.",
      "Neyi unutamadım? O uzun ahları.",
      "Sözcüğün kökeniyle o cümledeki görevini aynı sanma.",
    ),
  ],
  recall: [
    {
      prompt: "İle için ve değişimi neden tek başına yeterli değildir?",
      answer:
        "Yeni cümlenin aynı öğe ilişkisini koruması gerekir; araç/beraberlik öbeği eş özne bağlantısına çevrilirse görev değişmiştir.",
    },
    {
      prompt: "Kitapta da iki yapıyı ayır.",
      answer:
        "Kitap-ta bitişik bulunma ekidir; ayrı da ekleme bağlacıdır. Bağlaç ta biçimine dönüşmez.",
    },
    {
      prompt: "Dolaptaki ve benimki neden aynı -kiyi aynı görevde kullanmaz?",
      answer:
        "Dolaptaki açık bir adı belirtir; benimki adı söylenmeyen varlığın yerini tutar.",
    },
    {
      prompt: "Ünlem işareti, önündeki her sözcüğü ünlem yapar mı?",
      answer:
        "Hayır. Güzel gün! ifadesinde güzel sıfat kalır; sözün duygu tonu ile sözcük türü ayrı düzeylerdir.",
    },
    {
      prompt:
        "Toplantıdan sonra salondan çıktık cümlesinin yer tamlayıcısında edat var mı?",
      answer:
        "Yer tamlayıcısı salondan; içinde edat yok. Toplantıdan sonra ayrı zaman öbeğidir.",
    },
  ],
  source:
    "OGM Materyal İsim Soylu Sözcükler video ders notu PDF 33–39; Aurelia TYT Türkçe 007 Edat Bağlaç Ünlem kağıdı öğretim/yöntem/prova bölümleri. Kaynaklar arası sınırlama edatı/zarfı adlandırma farkı açıkça belirtilmiştir. Özgün anlatım ve sorulardır; resmî soru aktarımı değildir.",
};

export const verbsGuide: LessonGuide = {
  id: "fiiller",
  minutes: 80,
  objectives: [
    "Kılış, durum ve oluşu fiilin bağlamdaki anlamından ayır.",
    "Kök, olumsuzluk, kip, kişi ve soru parçalarını çözümle.",
    "Zaman biçimiyle bağlamdaki zamanı ayrı göster.",
    "Ek fiil, birleşik çekim ve birleşik yapıyı karıştırma.",
  ],
  sections: [
    section(
      "Önce yargıyı, sonra fiil tabanını bul",
      "Fiil; iş, hareket, durum veya değişim bildirir. Çekimli fiil kip ve kişi anlamıyla yargı kurar: ‘Çizdim.’ geçmişte birinci tekil kişinin yaptığı işi anlatır. ‘Çiz.’ biçiminde ayrı kip/kişi eki görünmese de ikinci tekil kişiye yönelen emir yargısı vardır. Ek sayısı tek başına çekimli fiili belirlemez.",
      "‘O sakindi.’ cümlesinde sakin ad soylu tabandır; ek fiille yüklem olur. ‘O sakinleşti.’ sözündeyse isimden türemiş fiil tabanı vardır. Yüklem olmak ile fiil kökünden gelmek farklıdır. Önce cümlede neyin yargı bildirdiğini belirle, sonra kökünü ve eklerini ayır; bütün -dı sonlarını aynı görevde sayma.",
    ),
    section(
      "Kılış, durum ve oluş: nesne ve değişim",
      "Kılış fiili anlamlı bir nesne üzerinde gerçekleşebilir: ‘Teknisyen cihazı onardı.’ Neyi onardı? Cihazı. ‘Bütün gün çizdi.’ cümlesinde nesne söylenmemiş olsa da çizmek uygun anlamda nesne alabilir. Açık nesne bulunmaması, fiilin nesne alma yeteneğini ortadan kaldırmaz.",
      "Durumda öznenin içinde bulunduğu hâl veya hareket öne çıkar: uyudu, dinlendi gibi kullanımları kendi anlamlarıyla kontrol et; bazı fiiller bağlama göre farklı nesne ilişkisi kurabilir. Oluşta öznede zamanla kendiliğinden değişim vurgulanır: ‘Meyve olgunlaştı.’ ‘Nesne yoksa durumdur.’ kuralı oluşu dışarıda bırakır. Karşılaştırmayı açık örneklerle yap: kitabı okudu / bebek uyudu / yaprak sarardı.",
    ),
    section(
      "Haber kipleri: beş temel biçim",
      "Görülen geçmiş -dı/-di ve uyumlu biçimleri; öğrenilen geçmiş -mış/-miş; şimdiki -(ı)yor; gelecek -acak/-ecek; geniş zaman -r/-ar/-er ve uyumlu biçimlerdir. Gel-di-m, gel-miş-im, gel-iyor-um, gel-eceğ-im, gel-ir-im örneklerinde kipten sonra kişi anlamı bulunur. Gelecekteki k→ğ gibi ses değişimleri eki başka kip yapmaz.",
      "Geniş zamanın olumsuzu üçüncü kişide gelmez, birinci tekilde gelmem, birinci çoğulda gelmeyiz gibi kişiye göre değişir; her durumda görünür -mez arama. ‘Çalışmaktayım.’ biçimi de sürmekte olan eylem anlatabilir. Bu alternatif yapının kök/ek çözümünü, -(ı)yor ile aynı yüzey biçimi sanmadan anlam bakımından karşılaştır.",
    ),
    section(
      "Bilgi kaynağı ve zaman anlamı bağlama bağlıdır",
      "-mış, öğrenilen geçmiş biçimi olarak aktarılmış bilgiyi veya sonradan fark etmeyi/çıkarımı anlatabilir: ‘Görevli söyledi, salon kapanmış.’ ile ‘Işıklar sönük, salon kapanmış!’ farklı bilgi edinme yollarıdır. Ekin adı, konuşanın mutlaka başka birinden duyduğunu tek başına kanıtlamaz.",
      "Görülen geçmiş de her kullanımdaki tarihsel bilginin bizzat konuşanca görülmesi gerektiği anlamına gelmez; anlatıcının geçmişi sunma biçimidir. Bir sınav sorusu kesinlik soruyorsa metinde verilen kanıtı aşma. Önce görünen biçimi, sonra bağlamın söylediği anlamı yazmak hem kip tanıma hem yorum sorularında güvenilir bir kontrol sağlar.",
    ),
    section(
      "Dilek kipleri: zaman etiketinden önce tutum",
      "Gereklilik -malı/-meli ile yapılması gerekli veya uygun görülen işi; dilek-şart -sa/-se koşul/isteği; istek -a/-e ve kişiyle birleşen biçimler isteği; emir ise buyurma veya rica işlevini anlatır. ‘Okumalısın.’, ‘Okusan.’, ‘Okuyalım.’, ‘Oku.’ aynı kökten farklı tutumlar kurar. Kip adını yalnız olayın gelecekte olmasına bakarak seçme.",
      "Emirde ikinci tekil biçim çıplak olabilir, fakat ‘Gelsin.’ ve ‘Geliniz.’ gibi kişiyle biçimlenen kullanımlar vardır. ‘Geleli bir saat oldu.’ sözündeki -eli süre bildiren zarf-fiil kurar; ‘Gidelim.’ isteğiyle aynı görevde değildir. Ek benzerliğinde sözcüğün çekimli yüklem mi, başka bir yapının parçası mı olduğunu kontrol et.",
    ),
    section(
      "Olumsuzluk, kişi ve soru: parçaların görevini koru",
      "Gel-me-di-k biçiminde gel- kök, -me olumsuzluk, -di görülen geçmiş, -k birinci çoğul kişidir. Gelmiyoruz örneğinde olumsuzlukla şimdiki zaman birleşirken yüzey biçimi değişebilir; sözcüğü anlamı ve biçimiyle birlikte çözümle. Olumsuzluk ekiyle isim-fiil -ma/-me biçimleri farklı görevlerdir: ‘Gelme!’ emri ile ‘Gelme ihtimali’ ad grubu aynı değildir.",
      "Soru parçacığı mi/mı/mu/mü ayrı yazılır: ‘Geldin mi?’, ‘Gelecek misin?’ İkinci örnekte kişi eki soru parçacığına bitişir. ‘Kim geldi?’ ifadesinde ise soru anlamını kim sağlar. Soru, olumsuzluk ve kişi kipin kendisi değildir; aynı cümlede birkaç bilgi katmanı bulunabilir. ‘Gelmedi mi?’ görülen geçmişin olumsuz soru biçimidir.",
    ),
    section(
      "Kip/zaman kayması: iki satırlı çözüm",
      "‘Yarın ders çalışıyorum.’ cümlesinde -(ı)yor şimdiki zaman biçimidir; yarın ve plan bağlamı olayın gelecekte olacağını gösterir. ‘Şimdi ders çalışıyorum.’ cümlesinde biçimle zaman anlamı örtüşür. Biçimi değiştirmeden zaman sözünü değiştirerek kaymanın kanıtını gör.",
      "‘Her pazar erkenden kalkarım.’ geniş zaman biçimi ve alışkanlık anlamını; ‘Yarın mutlaka gelirsin.’ ise bağlama göre gelecek beklentisi veya güçlü yönlendirmeyi anlatabilir. Her geniş zaman örneği kesin genel doğru değildir. Sorunun ‘hangi kip biçimi?’ ile ‘hangi anlamda kullanılmış?’ ifadelerini aynı cevapla geçiştirme.",
    ),
    section(
      "Ek fiil: ad yüklemi ve birleşik çekim",
      "Ek fiil ad soylu sözü yüklem yapabilir: ‘Hazırdı.’ = hazır idi, ‘Hazırmış.’ = hazır imiş, ‘Hazırsa.’ = hazır ise. Geniş zamanda ek çoğu zaman açıkça görünmez: ‘Ben hazırım.’ İsim yükleminin olumsuzu genellikle değil ile kurulur: ‘Hazır değildi.’ Burada hazır- diye bir fiil kökü üretme.",
      "Çekimli fiile -idi, -imiş veya -ise geldiğinde birleşik çekim oluşabilir: geliyordu şimdiki zamanın hikâyesi; gelecekmiş geleceğin rivayeti; gelirse geniş zamanın şartıdır. Bildirme -dır eki her zaman ikinci zaman katmanı sayılmaz; ‘Gelmiştir.’ bağlamda kesinlik veya tahmin bildirebilir. İlk kip ile ek fiili ayrı işaretle.",
    ),
    section(
      "Fiilin yapısı: çekim çokluğu yeni kök değildir",
      "Basit fiil yapım eki almamıştır: gel-me-di-m çok parçalı görünse de yapım eki yoktur. Temiz-le-di gibi isimden fiil yapım eki alan örnek türemiştir. Yardım et-, fark et-, mutlu ol- yardımcı eylemle; yazıver-, bakakal-, yürüyebil-, düşeyaz- kurallı birleşik yapılarla; vazgeç-, gözden düş- anlamca kaynaşmayla oluşabilir.",
      "Yeterlikte yapabildi/yapamadı ile yapmayabildi farklı olumsuzluk kapsamları taşır: birinde yapmaya gücü yetmeme, diğerinde yapmamayı başarabilme/olabilirlik vardır; bağlamı oku. ‘Yazacaktı.’ birleşik çekimlidir; ‘Yazıverdi.’ tezlik bildiren birleşik yapıdır. Aynı ‘birleşik’ sözü farklı sınıflandırma sorularında kullanılır. Et- ve ol- her yerde yardımcı değildir: ‘Bu ürün yüz lira eder.’ değer anlamıyla temel fiildir.",
    ),
    section(
      "Çekimli fiil ve fiilimsi sınırını görev çözer",
      "‘Gelecek konuk burada.’ sözünde gelecek, konuk adını belirten sıfat-fiildir. ‘Konuk gelecek.’ sözündeyse yargıyı kuran çekimli gelecek zaman fiilidir. -acak/-ecek, -mış/-miş, -ar/-er, -maz/-mez gibi sesçe benzer eklerin görevini sözcüğün cümledeki bağı belirler.",
      "Çözüm sırası: yüklemi bul, tabanı çöz, istenen sınıflandırmayı belirle, kip/kişiyi ayır, zaman sözüyle anlamı karşılaştır. ‘Çekimi birleşik olduğu için yapısı türemiştir.’ gibi farklı ölçütleri birbirine bağlama. Fiilimsilerin bütün ayrıntıları ve fiilde çatı ayrı başlıklarda genişler; bu rehberin sınır bilgisi o konuların tamamlandığı anlamına gelmez.",
    ),
  ],
  examples: [
    example(
      "Anlamına göre üç fiil",
      "‘Çocuk resmi çizdi. Bebek uyudu. Meyve olgunlaştı.’ fiillerini sınıflandır.",
      "Önce nesne, sonra değişim vurgusunu denetle.",
      [
        ["Kılış", "Neyi çizdi? Resmi; eylem nesneye yönelir."],
        ["Durum", "Uyumak açık kullanımda nesne almaz; öznenin durumudur."],
        ["Oluş", "Olgunlaşmak meyvede zamanla gerçekleşen değişimdir."],
      ],
      "Kılış / durum / oluş.",
      "Son iki fiilde nesne bulunmaz; değişim vurgusu onları ayırır.",
      "Nesne yoksa bütün fiillere durum deme.",
    ),
    example(
      "Çekim parçaları",
      "‘Toplantıya gelmedik mi?’ ifadesinde gelmedik ve mi yapılarını çöz.",
      "Soru parçacığını ayırıp kökten ilerle.",
      [
        ["Taban", "Gel- fiil köküdür."],
        ["Çekim", "-me olumsuzluk, -di görülen geçmiş, -k biz kişisidir."],
        [
          "Soru",
          "Mi ayrı yazılan soru parçacığıdır; bütün yapı olumsuz geçmiş soru anlatır.",
        ],
      ],
      "gel-me-di-k + mi; birinci çoğul kişi.",
      "Biz toplantıya gelmedik mi? yeniden kuruluşu kişi anlamını doğrular.",
      "Miye zaman veya kişi eki görevi verme.",
    ),
    example(
      "Aynı biçim, farklı zaman",
      "‘Yarın sabah trene biniyorum.’ cümlesinde kip biçimiyle zaman anlamını ayır.",
      "Ek ile zaman sözünü ayrı satırlara yaz.",
      [
        ["Biçim", "Bin-iyor-um şimdiki zaman biçimidir."],
        ["Bağlam", "Yarın sabah gelecekteki planı belirtir."],
        [
          "Kontrol",
          "Şimdi biniyorum dersek biçim aynı kalır, gerçek zaman anlamı değişir.",
        ],
      ],
      "Şimdiki zaman biçimi / gelecek zaman anlamı.",
      "Yarın sözcüğünü yok sayan bir şimdi yorumu cümlenin plan bilgisini kaybeder.",
      "Kip biçimi sorulurken yalnız gelecek diye cevaplama.",
    ),
    example(
      "İki ayrı birleşme",
      "‘Not alıyordu.’ cümlesindeki alıyordu ile ‘Yazıverdi.’ fiilindeki birleşmeyi karşılaştır.",
      "Birleşik çekim mi, fiil yapısı mı sorulduğunu ayır.",
      [
        ["Çekim", "Al-ıyor-du: şimdiki zaman ve ek fiilin hikâyesi."],
        [
          "Yapı",
          "Yaz-ı-ver-di: yaz- ile tezlik ver- tabanı, ardından geçmiş çekimi.",
        ],
        [
          "Karar",
          "İlkinde birleşik zaman; ikincisinde kurallı birleşik fiil yapısı bulunur.",
        ],
      ],
      "Birleşik çekim / birleşik yapı.",
      "Yazıveriyordu örneği hem birleşik yapı hem birleşik çekim taşıyabilir.",
      "Birleşik sözcüğünün hangi sınıflandırmayı anlattığını atlama.",
    ),
    example(
      "Aynı gelecek biçiminin görevi",
      "‘Gelecek tren perona yanaşıyor.’ ile ‘Tren gelecek.’ sözlerindeki gelecek aynı mı?",
      "Hangi sözün yargı kurduğunu belirle.",
      [
        ["İlk cümle", "Gelecek tren adını niteler; yüklem yanaşıyor sözüdür."],
        ["İkinci cümle", "Gelecek yüklemdir ve gelecek zaman çekimi taşır."],
        ["Sonuç", "Ek biçimi benzer, görev farklıdır."],
      ],
      "Sıfat-fiil / çekimli fiil.",
      "Hangi tren? sorusu ilk örneğin ad bağını gösterir.",
      "-ecek görünce otomatik çekimli fiil deme.",
    ),
  ],
  recall: [
    {
      prompt: "Gelmedim çok ekli olduğu için türemiş midir?",
      answer:
        "Hayır; gel- köküne olumsuzluk, kip ve kişi çekimleri eklenmiştir. Yapım eki gösterilmedikçe türemiş denmez.",
    },
    {
      prompt: "Yarın geliyorum ifadesinde biçim ve anlam nedir?",
      answer: "Biçim şimdiki, bağlamdaki zaman gelecek plandır.",
    },
    {
      prompt: "Hazırdı ile hazırladı fiil tabanı bakımından nasıl ayrılır?",
      answer:
        "Hazırdı ad soylu hazır+idi ile yüklemdir; hazırladı hazır-la- türemiş fiiline geçmiş çekimi alır.",
    },
    {
      prompt: "Emir kipinde açık ek görülmemesi neyi göstermez?",
      answer:
        "Kip ve kişi anlamının yokluğunu göstermez; Gel. ikinci tekil emir/rica yargısıdır.",
    },
    {
      prompt: "Yazıveriyordu için yapı ve çekim ayrı söylenebilir mi?",
      answer:
        "Evet. Yazıver- tezlik anlamlı kurallı birleşik fiil; -iyor-du birleşik zaman çekimidir.",
    },
  ],
  source:
    "OGM Materyal Fiiller video ders notu PDF 2–25 ve 27–29; Aurelia TYT Türkçe 008 Fiiller kağıdı öğretim/yöntem/prova bölümleri. Kaynaktaki kip, ek fiil, yapı ve görev ayrımları özgün örneklerle genişletildi. Resmî sınav soruları aktarılmadı.",
};

export const voiceGuide: LessonGuide = {
  id: "fiilde-cati",
  minutes: 80,
  objectives: [
    "Çatıyı yalnız fiil yükleminde özne ve nesne ilişkileriyle incele.",
    "Etken, edilgen, dönüşlü ve işteşi ekle birlikte anlamdan kanıtla.",
    "Geçişlilikle açık nesne varlığını ayır.",
    "Oldurgan ve ettirgende başlangıç fiilinin geçişliliğini göster.",
  ],
  sections: [
    section(
      "Çatı için ilk kapı: yüklem fiil mi?",
      "Fiilde çatı, yüklemin öznesi ve nesnesiyle kurduğu ilişkileri anlatır. ‘Oda temizlendi.’ cümlesinde temizlen- fiil yüklemidir ve çatı incelenebilir. ‘Oda temizdi.’ sözünde temiz adı ek fiille yüklem olmuştur; okul düzeyindeki fiilde çatı sınıflaması bu isim cümlesinde aranmaz.",
      "Çatıya başlamadan önce yüklemi tam sınırla: ‘Yapılan iş çok zordu.’ cümlesinde yapılan bir fiilimsi olsa da asıl yüklem zordu isim yüklemidir. Cümlede fiil kökenli herhangi bir sözcük bulmak, o cümlenin yüklemini fiil yapmaz. Özne yönü ve nesne yönü iki ayrı sınıflandırmadır; biri diğerini tek başına belirlemez.",
    ),
    section(
      "Etken: gerçek özne açık veya gizli olabilir",
      "‘Aşçı çorbayı karıştırdı.’ cümlesinde işi yapan gerçek özne aşçıdır; yüklem etkendir. ‘Çorbayı karıştırdım.’ cümlesinde ben açık yazılmamış olsa da kişi eki gerçek özneyi gösterir; gizli özne bulunması edilgenlik değildir. Kim yaptı sorusuna bağlam ve çekimle cevap verebilirsin.",
      "Yüklemin sonunda l, n veya ş seslerini görmek çatı eki kanıtı değildir; kökü ve gerçek eki ayır. ‘Anladı.’ fiilinde anla- tabanındaki harflerden edilgenlik çıkarılmaz. OGM’nin etken için verdiği çatı eki yokluğu açıklaması, kök içindeki benzer seslere uygulanmaz. Etkenlikte işi yapan özneyle yargının kurduğu ilişki belirleyicidir.",
    ),
    section(
      "Edilgen: etkilenen öğe özne konumuna gelir",
      "‘Çorba karıştırıldı.’ cümlesinde karıştır-ıl- yüklemindeki edilgenlik eki işi yapanı özne olarak söylemez. Karıştırılan çorba, eylemden etkilenen sözde öznedir. ‘Aşçı çorbayı karıştırdı.’ ile karşılaştırınca etkin cümlenin nesnesinin edilgen cümlede özne konumuna geldiği görülür.",
      "‘Çorba aşçı tarafından karıştırıldı.’ cümlesinde yapan kişi dolaylı biçimde belirtilir; bu, yüklemi etken yapmaz. Okul terminolojisinde tarafından veya -ce ile belirtilen yapan örtülü özne diye adlandırılır; öge çözümünde bu öbek zarf tümlecidir. Gerçek dünyada yapanın biliniyor olmasıyla cümledeki dil bilgisel özne türünü karıştırma.",
    ),
    section(
      "Edilgende her zaman sözde özne yoktur",
      "‘Bu salonda erken yatıldı.’ veya ‘Yola sabah çıkıldı.’ gibi geçişsiz tabandan kurulmuş edilgen örneklerde sözde özne yoktur. ‘Yapılan işi kim yaptı?’ diye sormak nesne üretmez. Bu kullanımlar, ‘Edilgen cümlede mutlaka sözde özne vardır.’ genellemesini bozar.",
      "Özne bulmak için yüklemden kim/ne sorusunu, nesne için kimi/neyi/ne sorularını görevleriyle kullan. ‘Ne okundu?’ sorusunun yanıtı olan kitaplar edilgen cümlenin sözde öznesi olabilir; her ne yanıtını nesne sanma. Çözümde önce etken/edilgen ilişkiyi kurmak, soruların yüzey benzerliğini ayırmana yardım eder.",
    ),
    section(
      "Dönüşlü: yapan ve etkilenen aynı",
      "‘Çocuk kendi elleriyle yıkandı.’ sözünde eylemi yapan çocuk ve yıkanmadan etkilenen kişi aynıdır. Yıka-n- biçimi bu açık bağlamda dönüşlüdür. ‘Çocuk annesi tarafından yıkandı.’ cümlesinde çocuk işi yapan değildir; aynı yıkandı biçimi bu kez edilgendir. Ek biçimi tek başına son kararı vermez.",
      "Dönüşlülük zamiri kendi sözcüğünün varlığı her fiili dönüşlü çatılı yapmaz: ‘Çocuk kendi defterini açtı.’ yüklemi etkendir; kendi, defterin kime ait olduğunu belirler. Dönüşlü çatı için fiilin yapısına ve işi yapanın eylemden kendisinin etkilenmesine birlikte bak. Belirsiz bir ‘Çocuk yıkandı.’ cümlesinde bağlam olmadan iki olasılığı zorla tekleştirme.",
    ),
    section(
      "İşteş: karşılıklı veya birlikte",
      "‘İki sporcu güreşti.’ karşılıklı; ‘Kuşlar sağa sola uçuştu.’ birlikte yapma anlamıyla işteş örneklerdir. -ış/-iş/-uş/-üş biçimiyle birlikte birden çok yapan ve ortak/karşılıklı eylem ilişkisi aranır. ‘İki arkadaş kapıda selamlaştı.’ sözünde iki taraf da selam vermenin katılımcısıdır.",
      "‘Çocuklar koştu.’ çok öznelidir fakat yalnız çoğulluk onu işteş çatılı yapmaz; işteşlik eki ve anlamı birlikte denetlenir. ‘Çocuk büyüdü.’ veya ‘Kapı açıldı.’ gibi l/n/ş sesli başka biçimleri de otomatik işteş sanma. Bazı sözcükler kalıplaşmış olabilir; bu rehberin örnekleri açıkça birlikte/karşılıklı anlamı sağlayan fiillerden seçilmiştir.",
    ),
    section(
      "Geçişli ve geçişsiz: nesne alma yeteneği",
      "‘Öğrenci kitabı okudu.’ kullanımında oku- nesne alabilir; geçişlidir. ‘Öğrenci bugün okudu.’ sözünde nesne belirtilmese de aynı anlamdaki okuma fiili nesne alabilir. Gerçek cümlede nesne bulunmasıyla fiilin geçişlilik yeteneği aynı şey değildir. ‘Neyi okudu?’ sorusuna anlamı bozmadan kitap gibi nesne eklenebilir.",
      "‘Bebek uyudu.’ sözündeki uyu- nesne almaz; geçişsizdir. ‘Parkta yürüdü.’ ifadesinde parkta yer tamlayıcısıdır, nesne değildir. Ne sorusunu yalnız ses olarak uygulama: edilgende ne sorusunun yanıtı sözde özne olabilir. Fiili cümledeki anlamıyla değerlendir; ‘Saat durdu.’ ile ‘Sözüne güvenip onu durdurdu.’ farklı fiil tabanlarıdır.",
    ),
    section(
      "Oldurgan: nesnesizden nesne alabilene",
      "Uyu- geçişsizdir: ‘Bebek uyudu.’ Uyu-t- biçiminde yeni bir yapan ve etkilenen bulunur: ‘Anne bebeği uyuttu.’ Başlangıç fiilinin geçişsizken ekle geçişli hâle gelmesi oldurganlık diye adlandırılır. Gül- / gül-dür-, dur- / dur-dur- gibi açık çiftlerde de önce başlangıç durumunu göster.",
      "-dır/-dir, -t, -r gibi biçimler iş yaptırma yapılarında kullanılabilir, fakat görünüş tek başına oldurganlık kanıtı değildir. Hangi başlangıç fiili hangi nesne ilişkisiyle kullanılmış? Bu soruyu cevaplamadan son ekten kategori seçme. Uyut-tu biçiminde -t fiili oldurganlaştıran yapım/çatı katmanı, -tu geçmiş zaman çekimidir; iki t aynı görevde değildir.",
    ),
    section(
      "Ettirgen: geçişliyi başkasına yaptırma",
      "‘Usta tahtayı kesti.’ sözünde kes- zaten geçişlidir. ‘Ev sahibi ustaya tahtayı kestirdi.’ sözünde kes-tir- ile işin başka birine yaptırılması gösterilir; ettirgendir. İşin nesnesi tahta kalır, yapan/işi yaptıran ilişkisine yeni bir katılımcı eklenir. Başlangıçta geçişli olma, oldurgandan ayrımın ana kanıtıdır.",
      "Birden fazla yaptırma katmanı olabilir: yaz- / yaz-dır- / yaz-dır-t- gibi biçimleri anlamlı bağlamda kullanmak gerekir. ‘Müdür, danışmana sekretere metni yazdırttı.’ sözünde katılımcı rollerini sırayla kur; yalnız ek sayısı ezberleme. Günlük dilde neden ettirme ile yaptırma terimleri değişebilir; burada OGM’nin geçişsiz→geçişli oldurgan, geçişli→daha yüksek geçişlilik ettirgen ayrımı kullanılır.",
    ),
    section(
      "İki eksenli çözüm ve tuzak kontrolü",
      "Bir fiili özne bakımından etken/edilgen/dönüşlü/işteş, nesne bakımından geçişli/geçişsiz ve varsa oldurgan/ettirgen oluşumla ayrı incele. ‘Aşçı yemeği pişirdi.’ sözünde işi yapan özne açıktır; ‘piş- → piş-ir-’ geçişsizden geçişliye değişim de vardır. Bir etiketin bulunması diğer çözüm eksenini ortadan kaldırmaz.",
      "Çözüm sırası: yüklem fiil mi; gerçek yapan kim; etkilenen kim; ek gerçekten hangi tabana gelmiş; başlangıç ve son taban nesne alabiliyor mu? Son kontrolde gizli özne/edilgenlik, kendi zamiri/dönüşlü çatı, çoğul özne/işteş çatı eşitlemelerini reddet. Etkileşimli model açık bağlamlı örnekleri karşılaştırır; doğal dildeki bütün belirsiz cümleleri otomatik çözümlediğini iddia etmez.",
    ),
  ],
  examples: [
    example(
      "Etkin nesne, edilgen sözde özne",
      "‘Görevli salonu temizledi.’ cümlesini ‘Salon temizlendi.’ ile karşılaştır.",
      "Yapan ve etkilenen rollerini iki cümlede de yaz.",
      [
        ["Etken", "Görevli gerçek özne, salonu nesnedir."],
        [
          "Edilgen",
          "Temizle-n-di biçiminde salon sözde özne olur; yapan özne olarak söylenmez.",
        ],
        [
          "Karar",
          "Salonun gerçek dünyada temizlenmesi aynı olay olsa da cümle ilişkileri değişir.",
        ],
      ],
      "Etken/geçişli ile edilgen/sözde özne.",
      "Kim temizledi? sorusuna ikinci cümle cevap vermek zorunda değildir.",
      "Sözde özneyi nesne diye işaretleme.",
    ),
    example(
      "Aynı yıkandı, farklı özne ilişkisi",
      "‘Çocuk kendi elleriyle yıkandı.’ ve ‘Çocuk annesi tarafından yıkandı.’ yüklemlerini ayır.",
      "Yıkama işini yapanı açık bağlamdan bul.",
      [
        [
          "Birinci bağlam",
          "Çocuk kendini yıkar; yapan ve etkilenen aynı, dönüşlüdür.",
        ],
        [
          "İkinci bağlam",
          "Yapan anne, çocuk etkilenen sözde özne; edilgendir.",
        ],
        ["Kanıt", "-n eki aynı görünür; ayrımı yapan kişi ilişkisi sağlar."],
      ],
      "Dönüşlü / edilgen.",
      "Tarafından öbeği ikinci cümlenin yapanını dolaylı bildirir; etkenlik oluşturmaz.",
      "-n görünce bağlamsız tek etiket seçme.",
    ),
    example(
      "Açık nesne olmadan geçişlilik",
      "‘Öğrenci akşam okudu.’ ile ‘Öğrenci akşam uyudu.’ yüklemlerini nesne yönünden karşılaştır.",
      "Aynı anlamı koruyan nesne eklenebilir mi diye dene.",
      [
        [
          "Okumak",
          "Öğrenci akşam kitabı okudu aynı eylem anlamında nesne alır.",
        ],
        ["Uyumak", "Uyumak bu anlamda nesne almaz; kitabı uyudu denemez."],
        ["Karar", "Açık nesne yokluğu iki fiili aynı geçişlilikte yapmaz."],
      ],
      "Geçişli / geçişsiz.",
      "Akşam iki cümlede de zaman bilgisi verir; nesne değildir.",
      "Cümlede nesne görmedim diye geçişsiz deme.",
    ),
    example(
      "Oldurgan ile ettirgeni başlangıçtan ayır",
      "Uyu-→uyut- ve kes-→kestir- çiftlerinin ayrımını göster.",
      "Eki çıkarmadan önce başlangıç fiilinin nesne yeteneğini belirle.",
      [
        [
          "Uyu-",
          "Bebek uyudu geçişsizdir; anne bebeği uyuttu geçişli olur: oldurgan.",
        ],
        [
          "Kes-",
          "Usta tahtayı kesti zaten geçişlidir; ev sahibi tahtayı kestirdi yaptırma katmanı ekler: ettirgen.",
        ],
        [
          "Kontrol",
          "Aynı tür neden ettirme işlevi, okul sınıflamasında farklı başlangıçtan ayrılır.",
        ],
      ],
      "Geçişsiz→geçişli oldurgan; geçişli→ettirgen.",
      "Her çift için nesneyi adlandır: bebeği ve tahtayı.",
      "Sadece -t veya -dır sesinden oldurgan/ettirgen seçme.",
    ),
    example(
      "İsim yüklemi engeli",
      "‘Yapılan çalışma çok yararlıydı.’ cümlesinin yükleminde çatı aranır mı?",
      "Asıl yargıyı fiilimsi parçasından ayır.",
      [
        ["Yüklem", "Yararlıydı: yararlı ad soylu taban ve idi ek fiilidir."],
        [
          "İç yapı",
          "Yapılan, çalışma adını niteleyen fiilimsidir; cümlenin çekimli yüklemi değildir.",
        ],
        [
          "Sonuç",
          "Cümle isim yüklemli olduğundan yüklem için fiilde çatı aranmaz.",
        ],
      ],
      "Aranmaz; yüklem yararlıydı isim yüklemidir.",
      "Hangi çalışma? yapılan; çalışma nasıldı? yararlıydı.",
      "Cümlede fiil kökenli bir sözcük bulmayı fiil yüklemi sayma.",
    ),
  ],
  recall: [
    {
      prompt: "Gizli özne edilgenlik kanıtı mıdır?",
      answer:
        "Hayır. Geldim sözünde ben gizli gerçek öznedir ve yüklem etkendir.",
    },
    {
      prompt: "Tarafından yapanı bildirdiğinde yüklem etken olur mu?",
      answer:
        "Hayır. Dosya görevli tarafından açıldı edilgendir; yapan dolaylı olarak belirtilmiştir.",
    },
    {
      prompt: "Çocuklar koştu sırf çoğul özne taşıdığı için işteş midir?",
      answer:
        "Hayır. İşteşlik için uygun fiil yapısı ile birlikte/karşılıklı yapma anlamı gerekir.",
    },
    {
      prompt: "Uyutmak ile kestirmek okul sınıflamasında nasıl ayrılır?",
      answer:
        "Uyu- geçişsizden geçişli uyut- oldurgan; kes- zaten geçişliyken kestir- ettirgendir.",
    },
    {
      prompt: "Oda temizdi ile oda temizlendi için ilk karar nedir?",
      answer:
        "Temizdi ad yüklemidir, çatı aranmaz; temizlendi fiil yüklemidir ve edilgenlik incelenir.",
    },
  ],
  source:
    "OGM Materyal Fiiller video ders notu PDF 31–42, Fiilde Çatı öğretimi doğrudan incelendi; Aurelia 008 Fiiller kağıdının çatı/kip sınırıyla karşılaştırıldı. Açık bağlamlı örnekler ve sorular uygulama için özgündür. Resmî sınav sorusu aktarımı değildir.",
};

function question(
  skill: string,
  n: number,
  prompt: string,
  options: string[],
  answer: number,
  hint: string,
  explanation: string,
): Question {
  return {
    id: `f012-${skill}-${n}`,
    skill,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(explanation),
  };
}
const connectorQuestions = [
  question(
    "edat-baglac-unlem",
    1,
    "‘Ece ile Mert raporu hazırladı.’ cümlesinde ile sözcüğünün görevi nedir?",
    [
      "Eş görevli iki özne parçasını bağlayan bağlaç",
      "Raporun niteliğini bildiren sıfat",
      "Hazırlama aracını gösteren edat",
      "Yer belirten durum eki",
      "Anlık sevinç bildiren ünlem",
    ],
    0,
    "İle yerine ve getirdiğinde iki kişinin ortak özne olması korunuyor mu?",
    "Ece ve Mert, hazırlama eyleminin eş görevli özne parçalarıdır; ile burada bağlaçtır. Araç öbeği, raporu niteleme, durum eki veya duygu sözü yoktur. ‘Ece fırça ile boyadı.’ deseydik ile araç edatı olurdu.",
  ),
  question(
    "edat-baglac-unlem",
    2,
    "‘Teknisyen kabloyu pense ile kesti.’ cümlesindeki ile hangi ilişkiyi kurar?",
    [
      "İki öznenin eşit görevle bağlanması",
      "Kesme aracını bildiren edat öbeği",
      "Geçmiş zamanı belirten çekim",
      "Kabloyu niteleyen işaret sıfatı",
      "Kesmenin olumsuzluğu",
    ],
    1,
    "Neyle kesti? sorusunun yanıtını bul.",
    "Pense ile, kesme eyleminin aracını bildiren edat öbeğidir. Teknisyen özne, kabloyu nesne, pense ise araçtır; bu parçalar eş görevli iki özne değildir. İle zaman, olumsuzluk veya sıfat eki değildir.",
  ),
  question(
    "edat-baglac-unlem",
    3,
    "‘Okulda da etkinlik var.’ cümlesindeki bitişik -da ve ayrı da sırasıyla nedir?",
    [
      "İki ayrı bağlaç",
      "İki bulunma eki",
      "Bulunma durumu eki / ekleme bağlacı",
      "Soru edatı / ilgi zamiri",
      "İyelik eki / ünlem",
    ],
    2,
    "Nerede? yanıtı ile başka yerlerin yanında anlamını ayrı düşün.",
    "Okul-da nerede sorusuna cevap veren isme bitişmiş bulunma ekidir. Ayrı da, başka yerlerin yanında okulda da etkinlik bulunduğunu ekler; bağlaçtır. Bağlaç -ta biçimine dönüşmez; okulda sözündeki ekle aynı görevde değildir.",
  ),
  question(
    "edat-baglac-unlem",
    4,
    "‘Anladım ki çözüm kolaymış.’ sözünde ki için hangi açıklama doğrudur?",
    [
      "Bir varlığın yerini tutan ilgi zamiridir.",
      "Çözüm adını belirten sıfat yapan ektir.",
      "Bulunma anlamı taşıyan çekim ekidir.",
      "İki yargıyı bağlayan, ayrı yazılan bağlaçtır.",
      "Şaşırma bildiren ünlemdir.",
    ],
    3,
    "Anladım ve çözüm kolaymış parçaları arasında kurulan bağı incele.",
    "Ki burada anlama yargısını onun içeriği olan çözüm kolaymış yargısına bağlar; bağlaçtır. Çözüm adını doğrudan niteleyen -ki eki veya bir adın yerini tutan benimki türü yapı değildir. Bu nedenle ayrı yazılır.",
  ),
  question(
    "edat-baglac-unlem",
    5,
    "‘Dünkü notu buldum; benimki ise kayıp.’ cümlesinde dünkü içindeki -ki ile benimki içindeki -ki nasıl ayrılır?",
    [
      "İkisi de iki yargıyı bağlar.",
      "İlki ilgi zamiri, ikincisi soru ekidir.",
      "İkisi de bulunma durum ekidir.",
      "İlki ünlem, ikincisi bağlaçtır.",
      "İlki sıfat yapan ek, ikincisi adı karşılayan ilgi zamiridir.",
    ],
    4,
    "İlk örnekte not adı açık; ikinci örnekte hangi ad söylenmemiş?",
    "Dünkü, açık not adını belirterek sıfat oluşturur. Benimki, benim notum anlamında adı yeniden söylemeden yerini tutar; -ki ilgi zamiridir. İki kullanım da bitişiktir ama bu, aynı görevi yaptıkları anlamına gelmez.",
  ),
  question(
    "edat-baglac-unlem",
    6,
    "‘Hey, kapıyı kapatır mısın?’ sözünde hey sözcüğünün görevi nedir?",
    [
      "Seslenme ünlemi",
      "İki nesneyi bağlayan bağlaç",
      "Kapının yerini tutan zamir",
      "Zaman bildiren zarf",
      "Kapıyı niteleyen sıfat",
    ],
    0,
    "Hey neyi adlandırıyor ya da hangi iki öğeyi bağlıyor?",
    "Hey, dikkat çekmek ve seslenmek için kullanılan ünlemdir. Kapı adını nitelemez veya onun yerine geçmez; iki öğe arasında bağ kurmaz. Soru anlamı başka bir yapıda, mısın parçacığında bulunur.",
  ),
  question(
    "edat-baglac-unlem",
    7,
    "‘Dinlenmek için kısa bir mola verdik.’ cümlesindeki için sözcüğü hangi anlam ilişkisini kurar?",
    [
      "Gerçekleşmiş bir olayın sonucunu kesin kanıtlama",
      "Mola vermenin amaçlanan hedefini bildirme",
      "İki eş özneyi sıralama",
      "Yer tamlayıcısı oluşturma",
      "Şaşkınlık bildirme",
    ],
    1,
    "Mola hangi hedefle veriliyor?",
    "Dinlenmek, mola vermenin hedefidir; için amaç ilişkisi kuran edattır. Burada ‘hasta olduğu için’ gibi gerçekleşmiş bir nedeni açıklama yoktur. Aynı için farklı cümlelerde neden veya yarar bildirebilir; görevi bağlamdan belirlenir.",
  ),
  question(
    "edat-baglac-unlem",
    8,
    "‘Yağmurdan sonra depodan çıktık.’ cümlesinin yer tamlayıcısında edat var mıdır?",
    [
      "Vardır; sonra yer tamlayıcısının içindedir.",
      "Vardır; -dan tek başına edattır.",
      "Yoktur; yer tamlayıcısı depodan, sonra ise başka bir zaman öbeğindedir.",
      "Yoktur; cümlenin tamamında hiç edat yoktur.",
      "Vardır; çıktık sözcüğü edattır.",
    ],
    2,
    "Nereden çıktık? sorusunun yanıtını sınırla.",
    "Yer tamlayıcısı depodan sözcüğüdür; -dan ayrılma durumu ekidir, edat değildir. Yağmurdan sonra ayrı bir zaman öbeği kurar ve sonra edatını içerir. Dolayısıyla cümlede edat bulunur, fakat sorulan yer tamlayıcısının içinde bulunmaz.",
  ),
  question(
    "edat-baglac-unlem",
    9,
    "‘Gelmek istedim, yalnız otobüsü kaçırdım.’ cümlesindeki yalnız hangi görevle kullanılmıştır?",
    [
      "Otobüs adını niteleyen sıfat",
      "Tek başına gelme biçimini bildiren zarf",
      "Kişinin yerini tutan zamir",
      "Fakat anlamıyla iki yargıyı bağlayan bağlaç",
      "Bir adın çekim eki",
    ],
    3,
    "İstedim ile kaçırdım yargıları arasındaki engel/karşıtlık ilişkisine bak.",
    "Yalnız burada fakat anlamındadır; gelme isteği ile bunu engelleyen otobüsü kaçırma yargısını bağlar. ‘Yalnız çocuk’ sıfat, ‘Çocuk yalnız yürüdü.’ zarf örneğidir; bu cümlede o bağlar yoktur. Sadece anlamındaki sınırlama sınıflaması bu sorunun konusu değildir.",
  ),
  question(
    "edat-baglac-unlem",
    10,
    "‘Bütün gün onun ahlarını dinledik.’ cümlesindeki ahlarını için hangi yorum doğrudur?",
    [
      "Ünlem kökenli olduğu için hiçbir çekim eki alamaz.",
      "İki yargıyı bağlayan bağlaçtır.",
      "Yalnız noktalama işaretidir.",
      "Her cümlede bir soru edatıdır.",
      "Ünlem kökenli söz, burada isim çekimi alıp nesne görevine girmiştir.",
    ],
    4,
    "Ah-lar-ı-nı parçaları ve neyi dinledik? sorusunu incele.",
    "Ah sözü ünlem kökenli olsa da burada yakınmaları adlandırır; çoğul/iyelik/belirtme çekimleriyle isim gibi kullanılır. Ahlarını, dinledik yükleminin nesnesidir. Kökenin ünlem olması, bu cümledeki adlaşmayı engellemez.",
  ),
];
const verbQuestions = [
  question(
    "fiiller",
    1,
    "‘Çocuk resmi çizdi. Bebek uyudu. Meyve olgunlaştı.’ cümlelerindeki fiiller anlamlarına göre sırasıyla nasıl sınıflanır?",
    [
      "Kılış / durum / oluş",
      "Durum / oluş / kılış",
      "Oluş / kılış / durum",
      "Üçü de oluş",
      "Üçü de kılış",
    ],
    0,
    "Nesneye yönelen iş ile kendiliğinden değişimi ayır.",
    "Çizdi, resmi nesnesi üzerinde iş bildirir; kılıştır. Uyudu, öznenin içinde bulunduğu durumu anlatır ve bu anlamda nesne almaz. Olgunlaştı, meyvede zamanla gerçekleşen değişimdir; oluştur. Son ikisinde nesne olmayışı onları aynı sınıf yapmaz.",
  ),
  question(
    "fiiller",
    2,
    "‘Toplantıya gelmedik mi?’ sözünde gelmedik fiilinin çekimi hangi seçenekte doğru çözümlenmiştir?",
    [
      "Olumlu gelecek, ikinci çoğul kişi",
      "Olumsuz görülen geçmiş, birinci çoğul kişi",
      "Olumsuz geniş zaman, üçüncü tekil kişi",
      "Olumlu öğrenilen geçmiş, birinci tekil kişi",
      "İstek kipi, ikinci tekil kişi",
    ],
    1,
    "Gel-me-di-k parçalarını ve biz kişi anlamını göster.",
    "Gel- kök, -me olumsuzluk, -di görülen geçmiş, -k birinci çoğul kişidir. Mi ayrı yazılan soru parçacığıdır. Çekim geçmişte olumsuz birinci çoğul soruyu anlatır; geniş, gelecek veya istek kipi eki yoktur.",
  ),
  question(
    "fiiller",
    3,
    "‘Yarın sabah yola çıkıyorum.’ cümlesinde çıkıyorum fiilinin kip biçimi ve cümledeki zaman anlamı sırasıyla nedir?",
    [
      "Gelecek biçimi / şimdiki anlam",
      "Geniş biçimi / geçmiş anlam",
      "Şimdiki biçimi / gelecek anlam",
      "Geçmiş biçimi / gelecek anlam",
      "İstek biçimi / şimdiki anlam",
    ],
    2,
    "-ıyor ekini yarın sözcüğünden ayrı değerlendir.",
    "Çık-ıyor-um şimdiki zaman biçimidir. Yarın sabah gelecekteki planı gösterir; bu nedenle biçimle zaman anlamı ayrılır. Gelecek anlamı bulunduğu için görünür ek -acak olmuş sayılmaz; soru iki ayrı ölçüt istemektedir.",
  ),
  question(
    "fiiller",
    4,
    "‘Koridor sessizdi.’ cümlesinde sessizdi yüklemi nasıl kurulmuştur?",
    [
      "Sessiz- fiil köküne yalnız kişi eki gelmiştir.",
      "Sessiz sözcüğü gelecek zaman fiilidir.",
      "Sessiz, isim-fiil eki almıştır.",
      "Ad soylu sessiz sözcüğüne idi ek fiili gelmiştir.",
      "İki ayrı temel fiil birleşmiştir.",
    ],
    3,
    "Sessiz + idi açılımı aynı yargıyı veriyor mu?",
    "Sessiz ad soylu bir sözcüktür; idi ek fiiliyle sessizdi yüklemi olur. Burada sessiz- fiil kökü yoktur. ‘Sessizleşti.’ deseydik isimden türetilmiş fiilin geçmiş çekimini görürdük; bu farklı yapıdır.",
  ),
  question(
    "fiiller",
    5,
    "‘Notu yazıverdi.’ cümlesindeki yazıverdi fiili yapısı bakımından hangi özelliği taşır?",
    [
      "Yalnız birleşik zamanlı olduğu için birleşiktir.",
      "Yapım eki almamış basit fiildir.",
      "Ad soylu yüklem ve ek fiildir.",
      "Sadece sıfat-fiildir.",
      "Tezlik bildiren kurallı birleşik fiildir.",
    ],
    4,
    "Yaz- ile -ıver- birleşmesinin zaman çekiminden önceki işlevine bak.",
    "Yazıver- tabanı yaz- eylemine tezlik ver- unsurunu ekleyen kurallı birleşik fiildir; ardından -di geçmiş zaman gelir. Birleşik yapı, ikinci bir kip katmanı olan birleşik zamanla aynı değildir. Burada ad yüklemi veya ad niteleyen fiilimsi yoktur.",
  ),
  question(
    "fiiller",
    6,
    "‘Gelecek konuk bahçede bekliyor.’ cümlesindeki gelecek ile ‘Konuk gelecek.’ cümlesindeki gelecek sırasıyla nedir?",
    [
      "Sıfat-fiil / çekimli fiil",
      "Çekimli fiil / isim-fiil",
      "İki kullanımda da çekimli yüklem",
      "İki kullanımda da bağlaç",
      "İsim / ünlem",
    ],
    0,
    "İlk cümlenin yüklemi hangi sözcük?",
    "İlk gelecek, konuk adını niteler; yüklem bekliyor olduğundan sıfat-fiil görevindedir. İkinci cümlede gelecek bizzat yargıyı kuran gelecek zaman çekimli fiilidir. Sesçe benzer ekin görevini cümledeki bağ belirler.",
  ),
  question(
    "fiiller",
    7,
    "Bir görevli ‘Salon kapanmış.’ diyor. Bu cümle için aşağıdaki açıklamalardan hangisi ek bağlam olmadan kesin olarak söylenemez?",
    [
      "Fiilde öğrenilen geçmiş biçimi bulunduğuna",
      "Konuşanın bu bilgiyi mutlaka başka bir kişiden duyduğuna",
      "Fiil tabanının kapan- olduğuna",
      "İfadenin geçmişe ilişkin yargı sunduğuna",
      "Üçüncü tekil kişi anlamı bulunduğuna",
    ],
    1,
    "Aynı sözü kapıdaki kilidi görerek söylemek de mümkün mü?",
    "-mış biçimi aktarılmış bilgiyi anlatabildiği gibi sonradan fark etme veya çıkarım da bildirebilir. Bu nedenle mutlaka başka birinden duyma sonucu yalnız ekten çıkmaz. Kapan-mış üçüncü tekil öğrenilen geçmiş biçimi olarak çözümlenir; bilgi edinme yolu için ek bağlam gerekir.",
  ),
  question(
    "fiiller",
    8,
    "‘Her sabah yürürüm.’ cümlesindeki yürürüm için doğru açıklama hangisidir?",
    [
      "Şimdiki zaman, ikinci tekil kişi",
      "Gelecek zamanın rivayeti",
      "Geniş zaman, birinci tekil kişi; alışkanlık anlamı",
      "Görülen geçmiş, üçüncü çoğul kişi",
      "Ad soylu yüklem",
    ],
    2,
    "Yürü-r-üm ile her sabah bilgisini birlikte oku.",
    "Yürü- fiiline geniş zaman -r ve birinci tekil kişi -üm gelmiştir. Her sabah, tekrarlanan alışkanlık anlamını destekler. Gelecek -ecek, geçmiş -di veya rivayet -miş katmanı yoktur; yüklem fiil tabanlıdır.",
  ),
  question(
    "fiiller",
    9,
    "‘Bu paragrafı oku.’ cümlesindeki oku için hangi açıklama doğrudur?",
    [
      "Açık kip eki görünmediği için çekimli fiil değildir.",
      "Yalnız isim-fiildir.",
      "Görülen geçmiş, birinci tekil kişidir.",
      "İkinci tekil kişiye yönelen emir/rica kipli çekimli fiildir.",
      "Gelecek zamanın hikâyesidir.",
    ],
    3,
    "Cümle kime hangi işi yapmasını söylüyor?",
    "Oku, bu bağlamda ikinci tekil kişiye yönelen emir veya rica yargısıdır. Ayrı kip ve kişi eki görünmese de kip/kişi anlamı vardır; çekimli fiildir. Açık -di, -ecek, -idi veya isim-fiil eki bulunmaz.",
  ),
  question(
    "fiiller",
    10,
    "‘Dosyayı okuyacaktım.’ cümlesindeki okuyacaktım fiilinin çekimi nedir?",
    [
      "Şimdiki zamanın rivayeti",
      "Geniş zamanın şartı",
      "Öğrenilen geçmişin hikâyesi",
      "Yalnız basit görülen geçmiş",
      "Gelecek zamanın hikâyesi, birinci tekil kişi",
    ],
    4,
    "Oku-yacak-tı-m biçiminde ilk kip ile ek fiili ayır.",
    "Oku- fiiline gelecek -yacak, ardından idi ek fiilinin -tı biçimi ve birinci tekil -m gelmiştir. Bu gelecek zamanın hikâyesidir. Sözcüğün sonundaki -tıya bakıp önceki gelecek katmanını yok saymak çözümü eksiltir.",
  ),
];
const voiceQuestions = [
  question(
    "fiilde-cati",
    1,
    "‘Yapılan araştırma çok yararlıydı.’ cümlesinin yükleminde fiilde çatı aranır mı?",
    [
      "Aranmaz; yararlıydı ad soylu yüklemdir.",
      "Aranır; yapılan sözcüğü yüklemdir.",
      "Aranır; her isim yüklemi edilgendir.",
      "Aranır; -dı her zaman çatı ekidir.",
      "Aranmaz; çünkü bütün geçmiş zamanlar çatısızdır.",
    ],
    0,
    "Cümlenin asıl yargısını hangi sözcük kuruyor?",
    "Yüklem yararlıydı, yararlı + idi ile kurulmuş ad soylu yüklemdir; okul düzeyinde fiilde çatı bu yüklemde aranmaz. Yapılan araştırmayı niteleyen fiilimsidir, cümlenin asıl yüklemi değildir. Geçmiş zamanın kendisi çatıya engel oluşturmaz.",
  ),
  question(
    "fiilde-cati",
    2,
    "‘Soruları dikkatle çözdüm.’ cümlesindeki yüklem özne bakımından nasıl değerlendirilir?",
    [
      "Edilgen; özne açık yazılmamış",
      "Etken; gizli ben gerçek öznedir",
      "Dönüşlü; nesne bulunduğu için",
      "İşteş; soru sözcüğü çoğul olduğu için",
      "Çatı aranmaz; yüklem isimdir",
    ],
    1,
    "-m kişi eki işi yapanı gösteriyor mu?",
    "Çözdüm yükleminin gizli gerçek öznesi bendir; fiil etkendir. Öznenin açık yazılmaması edilgenlik değildir. Soruları nesnedir; nesne çoğulluğu işteşlik veya dönüşlülük kanıtı olmaz.",
  ),
  question(
    "fiilde-cati",
    3,
    "‘Dosya görevli tarafından açıldı.’ cümlesi için doğru yorum hangisidir?",
    [
      "Görevli açık gerçek özne olduğundan etken",
      "Dosya fiilin nesnesi olduğundan etken",
      "Açıldı edilgendir; dosya sözde özne, yapan tarafından öbeğiyle dolaylı belirtilmiştir.",
      "Tarafından sözcüğü isim yüklemi yapar.",
      "İki kişi bulunması nedeniyle işteştir.",
    ],
    2,
    "Etkin karşılığı Görevli dosyayı açtı ile rolleri karşılaştır.",
    "Aç-ıl-dı edilgen yüklemdir; dosya açılmadan etkilenen sözde öznedir. Görevli tarafından yapanı dolaylı belirtir, edilgenliği kaldırmaz. Okul terminolojisinde bu yapan örtülü özne diye anılır; öge bakımından öbek zarf tümlecidir.",
  ),
  question(
    "fiilde-cati",
    4,
    "‘Çocuk kendi elleriyle yıkandı.’ cümlesinde yıkama işini çocuğun bizzat kendi yaptığı açıkça belirtilmektedir. Yüklemin özne yönünden çatısı nedir?",
    [
      "Edilgen; -n alan bütün fiiller edilgendir.",
      "İşteş; iki el vardır.",
      "Etken; hiçbir çatı eki yoktur.",
      "Dönüşlü; yapan ve etkilenen çocuk aynı kişidir.",
      "Çatı aranmaz; yüklem isimdir.",
    ],
    3,
    "Yapan ile etkilenen rolleri aynı kişide birleşiyor mu?",
    "Açık bağlamda çocuk kendini yıkamaktadır; yıka-n- dönüşlüdür. Aynı yıkandı biçimi ‘Çocuk annesi tarafından yıkandı.’ sözünde edilgen olurdu. Kararı -n sesinden tek başına değil, verilen yapan/etkilenen ilişkisinden çıkarırız.",
  ),
  question(
    "fiilde-cati",
    5,
    "‘İki arkadaş kapıda selamlaştı.’ cümlesindeki selamlaştı için uygun özne-yüklem ilişkisi hangisidir?",
    [
      "Edilgen; yapan yoktur.",
      "Dönüşlü; yalnız biri kendini selamlar.",
      "İsim yüklemi; çatı aranmaz.",
      "Etken; -ş kökün ayrılmaz sesidir.",
      "İşteş; iki taraf birbirine karşılıklı selam verir.",
    ],
    4,
    "Selamın iki katılımcı arasındaki yönlerini düşün.",
    "Selamla-ş-tı, karşılıklı selam verme ilişkisini ve işteşlik yapısını taşır. İki kişi işi birbirine yöneltir; edilgende olduğu gibi yapanın özne olmaması veya dönüşlüdeki gibi kişinin kendine eylem yapması yoktur. Yüklem fiildir.",
  ),
  question(
    "fiilde-cati",
    6,
    "‘Öğrenci bütün akşam okudu.’ cümlesinde oku- fiili kitap okuma anlamındadır. Nesne açıkça söylenmemiştir. Hangisi doğrudur?",
    [
      "Nesne söylenmese de kitap gibi nesne alabilir; geçişlidir.",
      "Nesne yazılmadığı için zorunlu olarak geçişsizdir.",
      "Akşam nesne olduğu için edilgendir.",
      "Olumsuzluk olmadığı için dönüşlüdür.",
      "İsim yüklemi olduğu için çatı aranmaz.",
    ],
    0,
    "Öğrenci kitabı okudu biçimi aynı anlamdaki fiille kurulabiliyor mu?",
    "Oku- belirtilen kitap okuma anlamında neyi sorusuna kitap gibi nesne alabilir; geçişlidir. Açık nesnenin cümlede kullanılmaması bu yeteneği kaldırmaz. Bütün akşam zaman bilgisi verir; edilgenlik veya dönüşlülük eki yoktur.",
  ),
  question(
    "fiilde-cati",
    7,
    "‘Bebek uyudu.’ ve ‘Anne bebeği uyuttu.’ cümleleri karşılaştırıldığında uyut- hangi oluşumdur?",
    [
      "Geçişli tabanı daha da geçişli yapan ettirgen",
      "Geçişsiz uyu- tabanını geçişli yapan oldurgan",
      "Öznesiz edilgen",
      "İsimden isim yapan ek",
      "Karşılıklı işteş",
    ],
    1,
    "Başlangıçtaki uyu- bebek dışında bir nesne alabilir mi?",
    "Uyu- bu kullanımda geçişsizdir; uyut- ekle bebeği nesnesini alabilen geçişli fiile dönüşür. OGM’nin başlangıç geçişliliğine dayanan sınıflamasında bu oldurgandır. Başlangıç zaten geçişli olsaydı ettirgen ayrımı yapılırdı.",
  ),
  question(
    "fiilde-cati",
    8,
    "‘Usta tahtayı kesti.’ → ‘Ev sahibi ustaya tahtayı kestirdi.’ dönüşümünde kestir- nasıl değerlendirilir?",
    [
      "Geçişsizden geçişli olduğu için oldurgan",
      "Nesne aldığı için dönüşlü",
      "Kes- zaten geçişliyken başkasına yaptırma eklediği için ettirgen",
      "Yapan gizli olduğu için edilgen",
      "Yalnız bir zaman eki aldığı için basit çekim",
    ],
    2,
    "Kes- fiilinin ilk cümlede zaten hangi nesneyi aldığına bak.",
    "Kes- ilk cümlede tahtayı nesnesini aldığı için geçişlidir. Kestir- işin ustaya yaptırılmasını ve ev sahibi rolünü ekler; ettirgendir. Geçişsizden geçişliye geçiş olmadığı için bu örnek oldurgan ayrımına girmez.",
  ),
  question(
    "fiilde-cati",
    9,
    "Aşağıdaki cümlelerin hangisi, edilgen yüklem bulunan her cümlede sözde özne olması gerektiği iddiasına karşı örnektir?",
    [
      "Çocuk kitabı okudu.",
      "Kapı yavaşça açıldı.",
      "Dosyalar sıralandı.",
      "Bu salonda erken yatıldı.",
      "Usta tahtayı kesti.",
    ],
    3,
    "Sözde özneye dönüşebilecek bir nesnesi olmayan geçişsiz tabanı ara.",
    "Yat- geçişsiz tabanından kurulan yatıldı edilgendir; bu salonda yer, erken zaman/biçim bilgisi verir, sözde özne yoktur. Kapı ve dosyalar edilgen örneklerde sözde özne olabilir. Çocuk ve usta etken cümlelerin gerçek özneleridir.",
  ),
  question(
    "fiilde-cati",
    10,
    "‘Çocuklar bahçede koştu.’ cümlesini yalnız öznenin çoğul olmasına bakarak işteş saymak niçin yanlıştır?",
    [
      "Çoğul özne fiil cümlesinde hiç bulunamaz.",
      "Koştu isim yüklemidir.",
      "Bahçede sözde öznedir.",
      "Her çoğul özne cümleyi edilgen yapar.",
      "İşteşlik için uygun fiil yapısı ve birlikte/karşılıklı yapma ilişkisi gerekir; çoğulluk tek başına yetmez.",
    ],
    4,
    "Koştu ile koşuştu biçimlerinin hangi farkı taşıdığını düşün.",
    "Koştu fiili çoğul bir gerçek özneyle kullanılmıştır, fakat yalnız bu sayı işteş çatı kurmaz. İşteşlikte uygun fiil yapısı ve karşılıklı/birlikte yapma anlamı aranır. Bahçede yer tamlayıcısıdır; isim yüklemi veya edilgenlik bulunmaz.",
  ),
];

export const forge012TurkishGuides = [connectorsGuide, verbsGuide, voiceGuide];
export const forge012TurkishTopics: Record<string, string> = {
  "edat-baglac-unlem": "detail-256",
  fiiller: "detail-257",
  "fiilde-cati": "detail-258",
};
const titles = {
  "edat-baglac-unlem": "Edat, bağlaç ve ünlem: cümlede görev ve anlam",
  fiiller: "Fiiller: kip, kişi, zaman ve yapı",
  "fiilde-cati": "Fiilde çatı: yapan, etkilenen ve nesne",
};
const questionSets: Record<string, Question[]> = {
  "edat-baglac-unlem": connectorQuestions,
  fiiller: verbQuestions,
  "fiilde-cati": voiceQuestions,
};
export const forge012TurkishLessons: Lesson[] = forge012TurkishGuides.map(
  (g) => ({
    id: g.id,
    subjectId: "tyt-turkce",
    title: txt(titles[g.id as keyof typeof titles]),
    minutes: g.minutes,
    objectives: g.objectives.map(txt),
    body: g.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: questionSets[g.id],
    source: txt(g.source),
    tags: ["kaynakli-anlatim", "adim-adim", "dil-bilgisi"],
  }),
);
// Complete reviewed teaching, examples and cautions remain available in the
// independent sheet; nothing is delegated to a learner-uploaded source.
export const forge012TurkishCheatSheets: CheatSheet[] =
  forge012TurkishGuides.map((g) => ({
    topicId: forge012TurkishTopics[g.id],
    lessonId: g.id,
    title: titles[g.id as keyof typeof titles],
    subjectId: "tyt-turkce",
    sections: g.sections.map((s) => ({
      title: s.title,
      text: s.paragraphs,
      table: s.table,
    })),
    examples: g.examples.map((e) => ({
      title: e.title,
      prompt: e.prompt,
      steps: e.steps.map((s) => s.label + ": " + s.explanation),
      answer: e.answer + " " + e.check,
    })),
    cautions: g.examples.map((e) => e.pitfall),
    recall: g.recall,
    source: g.source,
  }));

export interface GrammarScene {
  sentence: string;
  kind: string;
  reason: string;
  parts: { form: string; role: string }[];
  time?: -1 | 0 | 1;
  links: string[];
}
export interface GrammarCase {
  id: string;
  label: string;
  frames: [GrammarScene, GrammarScene];
}
const frame = (
  sentence: string,
  kind: string,
  reason: string,
  parts: [string, string][],
  links: string[],
  time?: -1 | 0 | 1,
): GrammarScene => ({
  sentence,
  kind,
  reason,
  parts: parts.map(([form, role]) => ({ form, role })),
  links,
  time,
});
export const connectorCases: GrammarCase[] = [
  {
    id: "ile",
    label: "İle: bağlama ve araç",
    frames: [
      frame(
        "Ada ile Can projeyi bitirdi.",
        "Bağlaç",
        "Ada ve Can eş görevli iki özne parçasıdır; ile ikisini bağlar.",
        [
          ["Ada", "Özne parçası"],
          ["ile", "Eş görevleri bağlar"],
          ["Can", "Özne parçası"],
        ],
        ["Ada ↔ Can: ortak özne", "Ada ve Can projeyi bitirdi: görev korunur."],
      ),
      frame(
        "Ada pense ile kabloyu kesti.",
        "Edat",
        "Pense ile, kesmenin aracını bildirir; pense ve kablo eş özne değildir.",
        [
          ["pense", "Araç adı"],
          ["ile", "Araç ilişkisi"],
          ["kesti", "Eylem"],
        ],
        ["pense ile → kesti: araç", "Neyle kesti? Pense ile."],
      ),
    ],
  },
  {
    id: "de",
    label: "De: bulunma ve ekleme",
    frames: [
      frame(
        "Evde ışık vardı.",
        "Durum eki",
        "Ev-de nerede sorusunu yanıtlayan ada bitişik bulunma ekidir.",
        [
          ["ev", "İsim tabanı"],
          ["-de", "Bulunma eki"],
          ["vardı", "Yargı"],
        ],
        ["Nerede? Evde.", "Eki ayrı yazmak yeni bir ilişki üretir."],
      ),
      frame(
        "Ev de çok aydınlıktı.",
        "Bağlaç",
        "Ayrı de, başka yerlerin yanında evi de yargıya ekler.",
        [
          ["ev", "Yargıya katılan varlık"],
          ["de", "Ekleme bağı"],
          ["aydınlıktı", "Yargı"],
        ],
        [
          "Ev de: başka yerlerin yanında ev.",
          "Bağlaç ayrı yazılır ve te/ta biçimine dönüşmez.",
        ],
      ),
    ],
  },
  {
    id: "ki",
    label: "Ki: yargı bağı ve niteleme",
    frames: [
      frame(
        "Anladım ki notlar kaybolmuş.",
        "Bağlaç",
        "Ki, anladım yargısını anlaşılan notlar kaybolmuş yargısına bağlar.",
        [
          ["anladım", "Birinci yargı"],
          ["ki", "Yargı bağı"],
          ["notlar kaybolmuş", "İçerik yargısı"],
        ],
        ["anladım → ki → notlar kaybolmuş", "Ki ayrı yazılır."],
      ),
      frame(
        "Dolaptaki notlar kaybolmuş.",
        "Sıfat yapan ek",
        "Dolap-ta-ki yapısı açık notlar adını belirtir; -ki bitişik ektir.",
        [
          ["dolapta", "Yer bilgisi"],
          ["-ki", "Sıfat yapan ek"],
          ["notlar", "Belirtilen açık ad"],
        ],
        ["dolaptaki → notlar", "Hangi notlar? Dolaptaki notlar."],
      ),
    ],
  },
  {
    id: "unlem",
    label: "Ünlem ve adlaşma",
    frames: [
      frame(
        "Ah, anahtarı unuttum!",
        "Ünlem",
        "Ah, burada anlık üzüntü ve tepki bildirir.",
        [
          ["Ah", "Tepki sözü"],
          ["anahtarı unuttum", "Tepkinin bağlamı"],
        ],
        ["Ah: anlık üzüntü.", "Türün kanıtı yalnız ünlem işareti değildir."],
      ),
      frame(
        "Uzun ahlarını dinledim.",
        "İsimleşmiş söz",
        "Ah-lar-ı-nı çekimlenerek yakınmaları adlandırır; nesne görevindedir.",
        [
          ["ah", "Ünlem kökenli taban"],
          ["-lar-ı-nı", "Çoğul, iyelik, belirtme"],
          ["dinledim", "Nesne alan yüklem"],
        ],
        [
          "Neyi dinledim? Uzun ahlarını.",
          "Sözcük kökeni ile bu cümledeki isim görevi ayrı düşünülür.",
        ],
      ),
    ],
  },
  {
    id: "ancak",
    label: "Ancak: karşıtlık ve sınırlama",
    frames: [
      frame(
        "İsterdim, ancak vaktim yok.",
        "Bağlaç",
        "Ancak, isteme ile vaktin olmaması yargıları arasında fakat anlamı kurar.",
        [
          ["isterdim", "Birinci yargı"],
          ["ancak", "Karşıtlık bağı"],
          ["vaktim yok", "Engel oluşturan yargı"],
        ],
        [
          "isterdim ↔ vaktim yok",
          "Ancak yerine fakat görev korunarak gelebilir.",
        ],
      ),
      frame(
        "Bu düğümü ancak sen çözersin.",
        "Sınırlama edatı",
        "Ancak burada yalnızca sen anlamındadır; OGM bu kullanımı edat olarak sınıflar.",
        [
          ["ancak", "Yalnızca sınırlaması"],
          ["sen", "Sınırlanan kişi"],
          ["çözersin", "Eylem"],
        ],
        [
          "ancak → sen: yalnızca sen",
          "Bazı kaynaklarda sınırlama zarfı adı kullanılır; anlam aynı koşulla açıklanır.",
        ],
      ),
    ],
  },
];
export const verbCases: GrammarCase[] = [
  {
    id: "parts",
    label: "Kök, olumsuzluk, kip, kişi",
    frames: [
      frame(
        "Biz toplantıya gelmedik.",
        "Olumsuz görülen geçmiş",
        "Gel- köküne -me olumsuzluk, -di geçmiş, -k birinci çoğul kişi gelir.",
        [
          ["gel-", "Fiil kökü"],
          ["-me", "Olumsuzluk"],
          ["-di", "Görülen geçmiş"],
          ["-k", "Biz kişisi"],
        ],
        [
          "gel-me-di-k: biz gelmedik.",
          "Olumsuzluk ve kişi zaman ekinden ayrı bilgilerdir.",
        ],
        -1,
      ),
      frame(
        "Biz toplantıya geleceğiz.",
        "Olumlu gelecek",
        "Gel- kökü, gelecek eki ve biz kişisiyle çekimlenir; ekin k sesi bu biçimde ğ olur.",
        [
          ["gel-", "Fiil kökü"],
          ["-eceğ-", "Gelecek biçimi"],
          ["-iz", "Biz kişisi"],
        ],
        ["gel-eceğ-iz: biz geleceğiz.", "Bu biçimde olumsuzluk eki yoktur."],
        1,
      ),
    ],
  },
  {
    id: "shift",
    label: "Kip biçimi ve gerçek zaman",
    frames: [
      frame(
        "Şimdi trene biniyorum.",
        "Biçim ve zaman örtüşür",
        "-iyor şimdiki biçimi ile şimdi sözü konuşma anını birlikte gösterir.",
        [
          ["şimdi", "Zaman kanıtı"],
          ["bin-iyor-um", "Şimdiki biçim, ben"],
        ],
        ["Biçim: şimdiki zaman.", "Bağlamdaki zaman: konuşma anı."],
        0,
      ),
      frame(
        "Yarın trene biniyorum.",
        "Zaman kayması",
        "-iyor biçimi değişmez; yarın, konuşma anından sonraki planı gösterir.",
        [
          ["yarın", "Gelecek plan kanıtı"],
          ["bin-iyor-um", "Şimdiki biçim, ben"],
        ],
        ["Biçim: şimdiki zaman.", "Bağlamdaki zaman: gelecek."],
        1,
      ),
    ],
  },
  {
    id: "copula",
    label: "Ek fiil ve türemiş fiil",
    frames: [
      frame(
        "Oda sessizdi.",
        "Ad yüklemi ve ek fiil",
        "Sessiz ad soylu tabanına idi ek fiili gelir; sessiz- fiil kökü yoktur.",
        [
          ["sessiz", "Ad soylu taban"],
          ["idi → -di", "Ek fiil"],
        ],
        ["sessiz + idi → sessizdi", "Olumsuz karşılığı: sessiz değildi."],
        -1,
      ),
      frame(
        "Oda sessizleşti.",
        "Türemiş fiil",
        "Sessiz-leş- fiil tabanı türetilir; -ti doğrudan görülen geçmiş çekimidir.",
        [
          ["sessiz", "Ad soylu taban"],
          ["-leş-", "Fiil türeten ek"],
          ["-ti", "Görülen geçmiş"],
        ],
        [
          "sessiz-leş-ti: değişim bildiren fiil",
          "Olumsuz karşılığı: sessizleşmedi.",
        ],
        -1,
      ),
    ],
  },
  {
    id: "compound",
    label: "Birleşik yapı ve birleşik çekim",
    frames: [
      frame(
        "Duru metni yazıverdi.",
        "Birleşik yapı",
        "Yaz- ile tezlik ver- yeni birleşik fiil tabanı kurar; ardından geçmiş çekimi gelir.",
        [
          ["yaz-", "Temel fiil"],
          ["-ıver-", "Tezlik yapısı"],
          ["-di", "Geçmiş çekimi"],
        ],
        [
          "yazıver-: kurallı birleşik fiil",
          "Yapısı soruluyor; ikinci zaman katmanı gerekmiyor.",
        ],
        -1,
      ),
      frame(
        "Duru metni yazacaktı.",
        "Birleşik çekim",
        "Yaz- tabanına gelecek biçimi ve idi ek fiilinin hikâyesi gelir.",
        [
          ["yaz-", "Temel fiil"],
          ["-acak", "Gelecek biçimi"],
          ["-tı", "Ek fiilin hikâyesi"],
        ],
        [
          "yaz-acak-tı: geleceğin hikâyesi",
          "Bu örnekte geçmişteki plan var; planın gerçekleştiği tek başına kesinleşmez.",
        ],
        -1,
      ),
    ],
  },
  {
    id: "role",
    label: "Sıfat-fiil ve çekimli fiil",
    frames: [
      frame(
        "Gelecek tren peronda bekliyor.",
        "Sıfat-fiil",
        "Gelecek, tren adını niteler; bu cümlenin çekimli yüklemi bekliyor sözüdür.",
        [
          ["gelecek", "Ad niteleyen fiilimsi"],
          ["tren", "Nitelenen ad"],
          ["bekliyor", "Çekimli yüklem"],
        ],
        ["Hangi tren? Gelecek tren.", "Yargıyı kuran bekliyor ayrı sözcüktür."],
        0,
      ),
      frame(
        "Tren yarın gelecek.",
        "Çekimli fiil",
        "Gelecek bu kez yargıyı kurar; üçüncü tekil gelecek zaman fiilidir.",
        [
          ["tren", "Özne"],
          ["yarın", "Zaman"],
          ["gelecek", "Çekimli yüklem"],
        ],
        [
          "Tren ne yapacak? Gelecek.",
          "Ek benzerliğine rağmen sözcüğün görevi değişmiştir.",
        ],
        1,
      ),
    ],
  },
  {
    id: "mood",
    label: "Dilek kipinde istek ve emir",
    frames: [
      frame(
        "Birlikte bu kitabı okuyalım.",
        "İstek kipi",
        "Okuyalım, biz kişisini içeren istek ve öneri yargısıdır.",
        [
          ["oku-", "Fiil kökü"],
          ["-yalım", "İstek ve biz kişisi"],
        ],
        [
          "Öneri: birlikte okuyalım.",
          "Yargı dilek/tutum bildirir; yalnız gelecek zaman eki değildir.",
        ],
      ),
      frame(
        "Bu kitabı oku.",
        "Emir kipi",
        "Oku, ikinci tekil kişiye yönelen emir/rica yargısıdır; açık kip eki görünmek zorunda değildir.",
        [["oku", "İkinci tekil emir/rica"]],
        [
          "Hitap: sen oku.",
          "Görünür kip eki olmaması kip ve kişi anlamını yok etmez.",
        ],
      ),
    ],
  },
];
export const voiceCases: GrammarCase[] = [
  {
    id: "passive",
    label: "Etken ve edilgen",
    frames: [
      frame(
        "Aşçı çorbayı karıştırdı.",
        "Etken",
        "Gerçek özne aşçı işi yapar; çorbayı eylemden etkilenen nesnedir.",
        [
          ["aşçı", "Gerçek özne: yapan"],
          ["karıştırdı", "Etken yüklem"],
          ["çorbayı", "Nesne: etkilenen"],
        ],
        [
          "Yapan aşçı → eylem → etkilenen çorba.",
          "Çorbayı belirtme ekli nesnedir.",
        ],
      ),
      frame(
        "Çorba karıştırıldı.",
        "Edilgen",
        "Karıştır-ıl-dı edilgendir; çorba sözde özne olur, yapan özne olarak söylenmez.",
        [
          ["yapan belirtilmedi", "Gerçek özne yok"],
          ["karıştır-ıl-dı", "Edilgenlik eki"],
          ["çorba", "Sözde özne: etkilenen"],
        ],
        [
          "Eylemden etkilenen çorba özne konumundadır.",
          "Yapan kişi bu cümleden kesin belirlenmez.",
        ],
      ),
    ],
  },
  {
    id: "reflexive",
    label: "Aynı -n: dönüşlü ve edilgen",
    frames: [
      frame(
        "Çocuk kendi elleriyle yıkandı.",
        "Dönüşlü",
        "Çocuk yıkama işini kendisi yapar ve kendisi etkilenir; açık bağlam -n ekini dönüşlü kılar.",
        [
          ["çocuk", "Yapan"],
          ["yıka-n-dı", "Dönüşlü yüklem"],
          ["aynı çocuk", "Etkilenen"],
        ],
        [
          "Yapan = etkilenen: aynı kişi.",
          "Kendi elleriyle sözü bağlamın kanıtıdır.",
        ],
      ),
      frame(
        "Çocuk annesi tarafından yıkandı.",
        "Edilgen",
        "Yıkamayı anne yapar; çocuk etkilenen sözde öznedir. Tarafından öbeği edilgenliği kaldırmaz.",
        [
          ["anne tarafından", "Yapan dolaylı belirtilir"],
          ["yıka-n-dı", "Edilgen yüklem"],
          ["çocuk", "Sözde özne"],
        ],
        [
          "Yapan ≠ etkilenen: anne ve çocuk.",
          "Ek biçimi aynı; özne ilişkisi farklıdır.",
        ],
      ),
    ],
  },
  {
    id: "reciprocal",
    label: "Karşılıklı iş ve çoğul özne",
    frames: [
      frame(
        "İki arkadaş kapıda selamlaştı.",
        "İşteş",
        "Selamla-ş- karşılıklı selam verme ve birden fazla katılımcı ilişkisi kurar.",
        [
          ["birinci arkadaş", "Selam verir ve alır"],
          ["selamla-ş-tı", "Karşılıklı iş"],
          ["ikinci arkadaş", "Selam verir ve alır"],
        ],
        [
          "Birinci ↔ ikinci: karşılıklı selam.",
          "İşteşlik yalnız sayıdan değil yapı ve anlamdan anlaşılır.",
        ],
      ),
      frame(
        "İki arkadaş kapıda koştu.",
        "Etken",
        "İki gerçek özne koşar; çoğulluk tek başına işteş çatı kurmaz.",
        [
          ["iki arkadaş", "Gerçek özne grubu"],
          ["koştu", "Etken yüklem"],
        ],
        [
          "Çoğul yapanlar → koşma eylemi.",
          "İşteşlik eki bulunmasıyla birlikte/karşılıklı anlam ayrıca aranır.",
        ],
      ),
    ],
  },
  {
    id: "transitive",
    label: "Nesne söylenmese de geçişlilik",
    frames: [
      frame(
        "Öğrenci akşam okudu.",
        "Geçişli",
        "Kitap okuma anlamındaki oku- kitabı gibi bir nesne alabilir; söylenmemiş nesne yeteneği kaldırmaz.",
        [
          ["öğrenci", "Yapan"],
          ["okudu", "Nesne alabilen fiil"],
          ["kitabı eklenebilir", "Anlamlı nesne"],
        ],
        [
          "Öğrenci kitabı okudu: aynı anlam korunur.",
          "Akşam zaman bilgisidir; nesne değildir.",
        ],
      ),
      frame(
        "Öğrenci akşam uyudu.",
        "Geçişsiz",
        "Uyu- bu anlamda nesne almaz; kitabı uyudu biçimi kurulamaz.",
        [
          ["öğrenci", "Yapan"],
          ["uyudu", "Nesne alamayan fiil"],
        ],
        [
          "Açık nesne her iki cümlede de yoktur.",
          "Ayrım, nesne alma yeteneğidir.",
        ],
      ),
    ],
  },
  {
    id: "causative",
    label: "Geçişsizden geçişliye",
    frames: [
      frame(
        "Bebek uyudu.",
        "Geçişsiz",
        "Uyu- tabanı bu kullanımda nesne almaz.",
        [
          ["bebek", "Uyuyan kişi"],
          ["uyu-du", "Geçişsiz fiil"],
        ],
        [
          "Başlangıçta bebeğin dışında nesne yok.",
          "Bu başlangıç son biçimin adını seçtirir.",
        ],
      ),
      frame(
        "Anne bebeği uyuttu.",
        "Oldurgan",
        "Geçişsiz uyu- tabanı -t ile bebeği nesnesini alan geçişli uyut- tabanına dönüşür.",
        [
          ["anne", "Yeni yapan"],
          ["uyu-t-tu", "Oldurgan yapı"],
          ["bebeği", "Nesne"],
        ],
        [
          "Uyu- geçişsiz → uyut- geçişli.",
          "Son -tu geçmiş; önceki -t oldurganlaştıran katmandır.",
        ],
      ),
    ],
  },
  {
    id: "factitive",
    label: "Geçişli fiile yaptırma katmanı",
    frames: [
      frame(
        "Usta tahtayı kesti.",
        "Geçişli",
        "Kes- zaten tahtayı nesnesini alır; başlangıç fiili geçişlidir.",
        [
          ["usta", "Doğrudan yapan"],
          ["kes-ti", "Geçişli fiil"],
          ["tahtayı", "Nesne"],
        ],
        [
          "Kes- başlangıçta nesne alır.",
          "Başlangıç geçişli olduğu için uyut- çiftiyle aynı sınıflama yapılmaz.",
        ],
      ),
      frame(
        "Ev sahibi ustaya tahtayı kestirdi.",
        "Ettirgen",
        "Kes- zaten geçişliyken kes-tir- işin ustaya yaptırılması katmanını ekler.",
        [
          ["ev sahibi", "İşi yaptıran"],
          ["ustaya kestirdi", "Doğrudan yapan ve yaptırma"],
          ["tahtayı", "Nesne"],
        ],
        [
          "Geçişli kes- → ettirgen kestir-.",
          "Yaptıran, yapan ve nesne üç ayrı rol olarak belirir.",
        ],
      ),
    ],
  },
  {
    id: "nominal",
    label: "İsim yüklemi ve fiil yüklemi",
    frames: [
      frame(
        "Salon temizdi.",
        "Çatı aranmaz",
        "Temiz + idi ad yüklemidir; yüklemde fiilde çatı sınıflaması yapılmaz.",
        [
          ["salon", "Hakkında yargı kurulan varlık"],
          ["temiz + idi", "Ad yüklemi"],
        ],
        [
          "İlk kontrol: yüklem fiil mi? Hayır.",
          "Geçmiş anlamı tek başına fiil kökü oluşturmaz.",
        ],
      ),
      frame(
        "Salon temizlendi.",
        "Edilgen",
        "Temizle-n-di fiil yüklemidir; salon temizleme işinden etkilenen sözde öznedir.",
        [
          ["yapan belirtilmedi", "Gerçek özne yok"],
          ["temizle-n-di", "Edilgen fiil"],
          ["salon", "Sözde özne"],
        ],
        [
          "İlk kontrol: yüklem fiil mi? Evet.",
          "Yüklem fiil olunca özne-yüklem ilişkisi incelenir.",
        ],
      ),
    ],
  },
];
export const grammarCasesFor = (id: string): GrammarCase[] =>
  id === "edat-baglac-unlem"
    ? connectorCases
    : id === "fiiller"
      ? verbCases
      : voiceCases;
export function buildConnectorScene(
  caseId: string,
  altered: boolean,
): GrammarScene {
  const c = connectorCases.find((c) => c.id === caseId) ?? connectorCases[0];
  return c.frames[altered ? 1 : 0];
}
export function buildVerbScene(caseId: string, altered: boolean): GrammarScene {
  const c = verbCases.find((c) => c.id === caseId) ?? verbCases[0];
  return c.frames[altered ? 1 : 0];
}
export function buildVoiceScene(
  caseId: string,
  altered: boolean,
): GrammarScene {
  const c = voiceCases.find((c) => c.id === caseId) ?? voiceCases[0];
  return c.frames[altered ? 1 : 0];
}
