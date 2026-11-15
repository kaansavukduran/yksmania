import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

export const repairGuide017: LessonGuide = {
  id: "anlatim-bozukluklari",
  minutes: 100,
  objectives: [
    "Cümlenin amacını ve korunan bilgiyi önce belirle.",
    "Her yüklemin özne, nesne, hâl ve kişi ilişkisini ayrı denetle.",
    "Genel kuralı ortak öge, vurgu ve kişileştirme sınırlarıyla kullan.",
    "En küçük onarımı yap; anlam ve olumlu–olumsuz kapsamı yeniden doğrula.",
  ],
  sections: [
    {
      title: "Önce ne anlatılmak istendiğini bul",
      paragraphs: [
        "Anlatım bozukluğu incelemesinde ilk iş cümlenin amacını belirlemektir. Bir söz dil bilgisi bakımından kurulabilir ama yazarın istediği anlamı vermeyebilir. “Yeni atölyeye girdim.” yeni bir atölyeyi; “Atölyeye yeni girdim.” az önce gerçekleşen girişi anlatabilir. İkinci anlam amaçlanıyorsa sözcüğün yeri değiştirilir; ilk cümle her bağlamda yanlış ilan edilmez.",
        "Onarım sırasında koruman gereken bilgileri yaz: kim yaptı, ne oldu, kime veya neye yöneldi, ne zaman ve hangi kesinlikte anlatıldı? Sonra sorunlu bağı belirle, gereken en küçük değişikliği yap ve cümleyi aynı amaçla yeniden oku. Kulağa alışılmadık gelmesi tek başına kural değildir. Hazır etkileşimler bu nedenle tam cümleyi ve amacı birlikte verir; serbest yazılmış her Türkçe cümleyi otomatik çözdüğümüzü söylemeyiz.",
      ],
    },
    {
      title: "Anlam ile yapı iki ayrı denetimdir",
      paragraphs: [
        "Anlama dayalı sorunlar; gereksiz bilgi, yanlış sözcük, mantık sırası, çelişki, belirsizlik ve bağlama uymayan deyim gibi durumlarla ilgilidir. “Yaklaşık tam on dakika” aynı süreyi hem kesin hem yaklaşık sunuyorsa önce hangi bilginin amaçlandığı seçilir. Sözcükleri kaldırıp cümleyi dil bilgisel olarak düzeltmek, yanlış anlamı koruyorsa yeterli değildir.",
        "Yapıya dayalı sorunlarda ise ekler, tamlamalar, ögeler, yüklem uyumu ve yan yapıların ilişkisi incelenir. “Onu gördüm ve ona güvendim.” iki farklı hâl ilişkisini açıkça gösterir. Aynı kişiden söz edilmesi, her fiilin aynı eki istemesini sağlamaz. Bir cümlede birden çok sorun da bulunabilir; her değişiklik için anlam veya yapı gerekçesini ayrı söyle.",
      ],
    },
    {
      title: "Gereksiz bilgi ile bilinçli vurguyu ayır",
      paragraphs: [
        "Kısa ve nötr bildirimde aynı bilgiyi işlevsiz yineleyen sözlerden biri çıkarılabilir: “Kitabı yeniden tekrar okudum.” cümlesinde iki zarf da bir kez daha bilgisini veriyorsa biri yeterlidir. Bir sözcüğün anlamının başka bir ek veya sözde zaten bulunması da benzer bir fazlalık kurabilir. Deneme şu olmalıdır: çıkarınca amaçlanan bilgi veya gerekli ton kayboluyor mu?",
        "Her tekrar otomatik hata değildir. Karşıtlık, vurgu, duygu veya gönderimi belirginleştirmek için bir ad ya da zamir yeniden kullanılabilir. “Ece yardım etti; o hep yardım eder.” gibi iki yargıdaki o sözünü bağlamı okumadan yasaklama. Yardımcı fiilli her yapıyı da sırf kısa bir karşılığı var diye bozuk sayma; şüphe etmek gibi yerleşik kullanımları evrensel yanlış ilan etmek yerine anlatımın amacını ve standart kullanımını denetle.",
      ],
    },
    {
      title: "Yakın anlam ve benzer ses yanıltabilir",
      paragraphs: [
        "Birbirine yakın veya sesçe benzer sözcükler her bağlamda aynı işi yapmaz. “Olayın sonunda” zamanın bitimini, “olayın sonucunda” ortaya çıkan etkiyi anlatır. Bir sözcüğü seçerken yalnız kulağa benzemesine değil, kurduğu ilişkiye bak. Niceliği az bulmakla birini küçümsemek de farklıdır; kişi ve miktar üzerinde aynı sözü gelişigüzel kullanma.",
        "Olumlu veya olumsuz çağrışım da bağlamla değerlendirilir. Bir tehlikeyi anlatırken şans sözü kimi örneklerde uygun olmayabilir; fakat alay veya özel karşıtlık bağlamı başka bir okuma yaratabilir. Çözümde sözcüğün bu cümlede neyi karşıladığını kendi sözlerinle yaz, önerilen karşılığı yerleştir ve olayın neden–sonuç, zaman veya değerlendirme ilişkisinin korunup korunmadığını sınayabil.",
      ],
    },
    {
      title: "Deyim ve atasözünde amaçlanan anlam",
      paragraphs: [
        "Deyimler kalıplaşmış bir anlam ilişkisi kurar; tek tek sözcüklerinin ilk anlamını toplamak çoğu zaman yeterli olmaz. Yardım eden birini anlatmak için “elinden geleni yaptı” denebilir; zarar veya gözdağı bağlamındaki başka bir deyimi sırf benzer sözcükler taşıyor diye bunun yerine koymak anlamı değiştirir. Önce deyimin ne anlattığını açık bir cümleyle söyle.",
        "Atasözü ve deyimlerin kalıplaşmış sözcüklerini rastgele eş anlamlılarla değiştirmek de her zaman aynı sözü korumaz. Buna karşılık çekim ve kişi, sözün izin verdiği kullanım içinde değişebilir. Bir örneği yalnız ezberden doğru–yanlış diye işaretlemek yerine deyimin olayla uyuşup uyuşmadığını, sözün öğüt mü genel deneyim mi özel durum mu anlattığını karşılaştır.",
      ],
    },
    {
      title: "Bağlaç ilişkiyi doğru mu kuruyor?",
      paragraphs: [
        "Ve ekleme, ama karşıtlık veya beklenti kırılması, çünkü neden gibi ilişkiler kurabilir. Yazar yalnız iki olumlu bilgiyi eklemek istiyorsa karşıtlık belirten bir bağlaç niyeti bozabilir; fakat aynı iki bilgi, başka bir bağlamda gerçekten beklenmedik bir karşıtlık oluşturabilir. Bu yüzden bir cümlede ama var diye otomatik hata arama.",
        "Bağlacı denetlerken iki yargıyı ayrı yaz ve aralarındaki amaçlanan ilişkiyi adlandır: ekleme mi, neden mi, koşul mu, karşıtlık mı? Sonra yeni bağlaçla iki yargının yönü değişiyor mu bak. Değişiklik sırf daha güzel duyulmak için değil, belirli bağı kurmak içindir. Cümlede bir başka açık bağlam yokken gizli bir neden veya karşıtlık icat ederek soru seçeneklerini çoğaltma.",
      ],
    },
    {
      title: "Mantık sırası ve ölçek tutarlı mı?",
      paragraphs: [
        "Karşılaştırma ve derecelendirme belirli bir ölçeğe dayanmalıdır. Bütünü doyuramayacak kadar az olan bir yiyeceğin bir kişiye bile yetmemesi anlatılıyorsa büyük gruptan küçük gruba doğru uygun vurguyu kurmak gerekir. Bırakın ve bile gibi sözler sıralamanın yönünü etkiler; sözcükleri yalnız yer değiştirerek değil, hangi durumun daha güçlü iddia olduğunu düşünerek sırala.",
        "Zaman ve olay sırası da denetlenir. Geçen hafta yapılmış bir iş ile gelecek hafta yapılacak işi aynı gelecek zaman yüklemine bağlamak, başka bir zaman kaydırma bağlamı verilmediyse amaçlanan kronolojiyi bozabilir. Her zaman belirtecini kendi yüklemiyle eşleştir. Sıralama sorusunda kişisel değer yargısını evrensel mantık kuralı sanma; verilen ölçek ve olay koşulunu kullan.",
      ],
    },
    {
      title: "Aynı yargıda çelişen kesinlik",
      paragraphs: [
        "“İş yaklaşık tam on dakika sürdü.” cümlesi aynı süreyi hem yaklaşık hem kesin vermek istiyorsa iki iddia çatışır. Amaç süreyi on dakika dolayında anlatmaksa tam çıkarılır; kesin ölçüm amaçlanıyorsa yaklaşık çıkarılabilir. İki onarım da aynı anlamı vermez. Soruda amaç belirtilmişse o amacı koruyan onarım seçilmelidir.",
        "Kesinlik ve olasılık sözcükleri her görünüşte otomatik çelişki değildir. “Kesinlikle gelebilir.” sözü izin veya gelmenin mümkün olduğundan emin olma anlamıyla kurulabilir. Bu rehber, bağlamı verilmemiş bütün böyle cümleleri yanlış saymaz. Hata incelemesinde kesinlik ve belirsizlik gerçekten aynı tek iddiaya aynı anlamda mı yükleniyor, yoksa farklı katmanlar mı var diye sor.",
      ],
    },
    {
      title: "Sözcük yeri: hangi ögeyi niteliyor?",
      paragraphs: [
        "Bir sıfat adın niteliğini, bir zarf eylemin zamanı veya durumunu belirtebilir; konum değişince bağ da değişir. “Yeni atölyeye girdim.” ile “Atölyeye yeni girdim.” örneğinde yeni sözü farklı hedefe bağlanır. Yazar az önce girmeyi anlatmak istiyorsa yeni sözü giriş eyleminin yakınlığına bağlanacak konuma alınır.",
        "Uzun cümlelerde bir zaman öbeğinin hangi eyleme ait olduğu da karışabilir. “İki günde yapılan köprüyü açacak.” sözü yapım süresini; “Köprüyü iki gün içinde açacak.” açılış zamanını vurgulayabilir. Her iki bilgi ayrı mümkünken tek bir bağlamı zorla dayatma. Sözcüğü taşıdıktan sonra yalnız akıcılığı değil, nitelenen varlık ve zaman bilgisini yeniden denetle.",
      ],
    },
    {
      title: "Zamir, iyelik ve karşılaştırma belirsizliği",
      paragraphs: [
        "Bazı ekler veya zamirler birden fazla kişiye gönderim yapabilir. “Çantasını aldığını gördüm.” sözünde kimin çantayı aldığı ve çantanın kime ait olduğu, önceki bağlamdan anlaşılmıyorsa açıkça yazılabilir. Örneğin amaç Ece’nin kendi çantasını almasıysa bu iki ilişkiyi adla ve kendi sözüyle belirtmek açıklığı artırır.",
        "“Seni Ece’den çok severim.” gibi karşılaştırmalarda sevilen kişi mi, sevenlerin sevgisi mi karşılaştırılıyor sorusu açık olmalıdır. Her kısa veya örtük cümle bozuk değildir; günlük bağlam gönderimi zaten çözebilir. Belirsizlik sorusunda iletişim için gerekli bilgi gerçekten açık değilse onarım yap. Virgül de kimi örnekte özne ile niteleyiciyi ayırabilir; yeni söz eklemeden önce bağın nerede karıştığını göster.",
      ],
    },
    {
      title: "Her yüklemin istediği hâli ayrı sor",
      paragraphs: [
        "Görmek kimi/neyi, güvenmek kime/neye, söz etmek kimden/neden gibi farklı tamlayıcı ilişkileri kurar. “Komşumu gördüm ve ona güvendim.” sözünde aynı komşu iki farklı ekle belirtilir. İlk cümledeki belirtme ögesinin ikinci fiile de aynen uyduğunu varsaymak amaçlanan ilişkiyi eksik veya yanlış bırakabilir.",
        "Buna karşılık “Dosyayı açtı ve kapattı.” sözünde iki fiil aynı belirtme nesnesini paylaşabilir. İkinci yüklemden önce her ögeyi yeniden yazmak zorunlu değildir. Öge eksikliği incelemesi, gerçekten gereken ilişkinin yokluğuna dayanır; her söylenmemiş adı hata sayma. Açık veya bağlamdan tamamlanan referentle, yanlış ekli ortak ögeyi birbirinden ayır.",
      ],
    },
    {
      title: "Özne, nesne, yer ve zarf eksikliği",
      paragraphs: [
        "Bir sıralı ya da bağlı yapıda ilk yüklemin öznesi, ikinci yüklemin konusu olmayabilir. “Dersin süresi bitti, öğrenciler dışarı çıktı.” sözünde süre ile öğrenciler ayrıdır. Yazar ilk özneyi iki yükleme ortakmış gibi kurmak istiyorsa hangi varlığın hangi yargıya ait olduğunu açıkça vermelidir. Nesne ve yer tamlayıcısı için de benzer yüklem merkezli denetim yapılır.",
        "Zarf ve araç/birliktelik öbekleri de her yargıya aynı anlamda yayılmayabilir. Bir olumsuz yargıdaki hiçbir zaman sözü ile sonraki olumlu yargının zamanı ayrıysa kapsamlarını açıklığa kavuştur. Bu uygulama araç ve birliktelik öbeklerini zarf tümleci altında gösterir; bazı kaynakların edat tümleci adını ayrıca kullanması aynı ilişkiyi başka başlıkla sınıflamasıdır. İki farklı adı iki ayrı eksiklik sanma.",
      ],
    },
    {
      title: "Tekil–çoğul uyumu ve kişileştirme",
      paragraphs: [
        "İnsan adlarından oluşan çoğul özneler üçüncü kişide tekil veya çoğul yüklemle kullanılabilir: “Öğrenciler geldi/geldiler.” Burada kullanılan okul sınıflamasında, nötr anlatımdaki insan dışı çoğullar için tekil yüklem örnekleri esas alınır. Fakat bu kuralın koşulu ve kişileştirme istisnası birlikte öğrenilmelidir; yalnız çokluk ekini saymak yeterli değildir.",
        "Bir masalda ağaçlar insanlar gibi konuşuyorsa kişileştirme nedeniyle tekil veya çoğul yüklem mümkündür. Herkes, hiçbiri, birçok kişi gibi belgisiz özneler ile çokluk eki almamış takım gibi topluluk adlarının uyumları da ayrı denetlenir. Hiçbiri gibi olumsuz özneler uygun olumsuz yüklem ister. Sayı, insan olup olmama, kişi ve anlatım bağlamını aynı soruya sıkıştırma.",
      ],
    },
    {
      title: "Kişi önceliği: ben, sen ve o aynı grupta",
      paragraphs: [
        "Özne grubunda birinci kişi varsa yüklem birinci çoğulla kurulur: “Sen ve ben geleceğiz.” Ben ile üçüncü kişinin birlikte bulunması da biz grubunu oluşturur. Birinci kişi yokken ikinci ve üçüncü kişi birlikteyse siz grubuna göre çekimlenir: “Sen ve Ece geleceksiniz.” İlk veya en yakın adı seçerek yüklem eki belirlemek doğru yöntem değildir.",
        "Bir cümlede tekil–çoğul uyumu ile kişi uyumunu ayrı denetle. “Sen ve ben geleceksiniz.” çoğul ek taşısa da birinci kişi önceliğini karşılamaz. Seslenme de gerçek özneyle karıştırılmaz; “Arkadaşlar, gelin.” sözünde arkadaşlar hitaptır ve yüklem muhataplara yönelir. Önce kimlerin özne grubuna gerçekten katıldığını göster, ardından kişi ekini seç.",
      ],
    },
    {
      title: "Tamlayan–tamlanan ve eklerin kişi ilişkisi",
      paragraphs: [
        "İsim tamlamasında tamlayan, tamlanan ve iyelik eki birbirine uymalıdır. “Benim kitabımı ve onun kitabını inceledi.” sözünde benim kitabım ile onun kitabı ayrı kişi ekleri taşır. İki tamlayanı ortak bir tamlanana bağlarken farklı kişi eklerini yok saymak karışıklık oluşturabilir; gereken yerde tamlanan kendi ekiyle açıkça tekrarlanır.",
        "Bir adla bir sıfatın aynı tamlananı paylaştığı yapılarda da her iki tamlamanın gerçekten kurulup kurulmadığını denetle. Kültürel etkinlikler bir sıfat tamlaması, sanat etkinlikleri ise isim tamlamasıdır; açık anlatım gerektiğinde iki yapı kendi biçimiyle yazılır. Tamlayan eki veya adın kendisi gerekli olduğu hâlde kullanılmamışsa eklenir. Buna karşılık her ortak ad kullanımı yasak değildir; iki ilişkinin biçimce uyumlu olup olmadığını sınayabil.",
      ],
    },
    {
      title: "Gereken ek ve fiilimsi biçimi",
      paragraphs: [
        "Bir sözcükte gereken ekin eksikliği, gereksiz ek veya yanlış ek seçimi yapıyı bozabilir. “Öğrencilerin çalışmasını sağladı.” sözünde sağlanan şey çalışma etkinliğidir; fiilimsinin biçimi yüklemin bu içeriği istemesine uyar. Fiilimsiye eklenen iyelik ve durum eklerini kip ya da kişi ekiyle karıştırma; iç öbeği kendi ilişkisiyle çöz.",
        "İki farklı fiille kurulan yan yapılar tek bir fiilimsi biçimini her durumda paylaşamaz. İlgi göstermek ve önem vermek gibi ayrı birleşik fiillerde eksik fiilin anlamı başka bir yüklemden yanlış taşınıyorsa gereken biçim yazılır. Aynı şekilde sözcük yapımında gereksiz katman eklememek gerekir; çözülebilir yerine fazladan ekli bir biçim kurmak standart yapıyı bozabilir. Hatanın hangi ekte olduğunu açıkça göster.",
      ],
    },
    {
      title: "Çatı ve yan eylemin yapanı",
      paragraphs: [
        "Yan eylemle temel eylemin aynı kişiye ait olması amaçlanırken birinin etken, diğerinin edilgen kuruluşu bu bağı bozabilir. Önce her eylemi kimin yaptığı veya hangi varlığın etkilendiğini yaz. Yalnız son ekte edilgenlik görmekle yetinme; yan yapının öznesi ve nesnesi ana yargıya nasıl taşınıyor sorusunu cevapla.",
        "İki bağımsız cümlede farklı çatıların bulunması tek başına hata değildir. Sorun, belirli bir ortak yapanla kurulan yan eylemin gerektirdiği ilişkiyle temel yüklemin ilişkisinin uyuşmamasıdır. Onarımı hem etken hem edilgen yönde yapmak kimi örneklerde mümkün olabilir; hangi yapan ve hangi vurgu korunacaksa o amaç açıkça verilir. Özne–nesne dönüşümünü gizleyip yalnız eki değiştirme.",
      ],
    },
    {
      title: "Ek fiil, olumsuzluk kapsamı ve son kontrol",
      paragraphs: [
        "Sıralı isim yargılarında ortak ek fiil bazen kullanılabilir; her ilk yüklemde ayrı ek fiil yokluğu hata değildir. Fakat birinci yargı olumlu, ikinci yargı olumsuz anlatılacaksa sondaki değildi biçiminin iki niteliğe birden yayılması belirsizlik yaratabilir. “Konusu ilginçti, dili sade değildi.” biçimi iki farklı kapsamı açıkça ayırır.",
        "Son kontrolde düzelttiğin cümleyi amaçla yeniden karşılaştır: aynı kişi ve varlıklar mı var, zaman korundu mu, ilk olumlu yargı yanlışlıkla olumsuz oldu mu, her yüklemin gerekli ilişkisi kuruldu mu? Bir sözcüğü çıkarmak veya ek getirmek yalnız ilk görünen hatayı giderebilir. Onarımın nedenini kendi cümlenle açıkla; aynı kuralın işlemediği yakın bir örnekle sınırını da gösterebil.",
      ],
    },
  ],
  examples: [
    {
      title: "Nötr kayıt mı, bilinçli vurgu mu?",
      prompt:
        "Nötr bir çalışma kaydında yalnız bir kez daha okuma anlatılıyor: “Öyküyü yeniden tekrar okudum.” Bilgiyi koruyarak sadeleştir; sonra her tekrarın neden otomatik hata olmadığını açıkla.",
      strategy:
        "Aynı anlam parçasını bul, birini çıkar ve kaybolan bilgi olup olmadığını denetle.",
      steps: [
        {
          label: "Ortak katkı",
          explanation:
            "Verilen amaçta yeniden ve tekrar aynı bir kez daha bilgisini taşıyor; iki ayrı okuma aşaması veya sanatsal vurgu amaçlanmıyor.",
        },
        {
          label: "En küçük onarım",
          explanation:
            "Öyküyü tekrar okudum veya Öyküyü yeniden okudum biçimleri amaçlanan nötr bilgiyi korur. Bir zarfı çıkarmak yeterlidir.",
        },
        {
          label: "Kuralın sınırı",
          explanation:
            "Başka bağlamda tekrar duygu, karşıtlık veya vurgu katabilir. Bu yüzden her yinelenen söz için aynı hata kararı verilmez.",
        },
      ],
      answer:
        "Öyküyü tekrar okudum. Aynı amaçla yeniden biçimi de seçilebilir.",
      check:
        "Yeni cümle bir kez daha okuma bilgisini koruyor; olay veya zaman değiştirilmedi.",
      pitfall:
        "Birden fazla geçerli onarım varsa sorunun verdiği amacı ve sunulan seçenekleri görmeden tek biçimi evrensel doğru sayma.",
    },
    {
      title: "Aynı kişi, iki farklı hâl",
      prompt:
        "Aynı kişiden söz ediliyor: “Ece’yi gördüm ve güvendim.” İki eylemin hangi ögeyi istediğini göstererek açık biçimi kur.",
      strategy:
        "Her yükleme kendi sorusunu sor; ortak kişinin ekini otomatik taşıma.",
      steps: [
        {
          label: "İlk fiil",
          explanation:
            "Gördüm, kimi sorusunu alır. Ece’yi belirtme durumundaki nesnedir ve bu fiile uygundur.",
        },
        {
          label: "İkinci fiil",
          explanation:
            "Güvendim, kime sorusunu alır. Aynı kişi yönelme durumunda Ece’ye veya ona biçimiyle belirtilir.",
        },
        {
          label: "Açık anlatım",
          explanation:
            "Ece’yi gördüm ve ona güvendim biçiminde iki fiil kendi istediği hâlle tamamlanır; ilk ögeyi ona diye değiştirmek görmek fiilini de düzeltmez.",
        },
      ],
      answer: "Ece’yi gördüm ve ona güvendim.",
      check:
        "İki öge aynı kişiye gider; birinci neyi/kimi, ikinci kime sorusuna cevap verir.",
      pitfall:
        "Dosyayı açtı ve kapattı gibi aynı nesneyi gerçekten paylaşabilen iki fiili bu eksiklikle eşitleme.",
    },
    {
      title: "Yeni olan atölye mi, giriş mi?",
      prompt:
        "“Yeni atölyeye girdim.” ifadesinin amacı yeni açılmış bir atölye anlatmak değil, az önce girişi bildirmektir. Sözcüğü ve bağını değiştir.",
      strategy: "Hangi atölye ile ne zaman girdim sorularını ayrı kur.",
      steps: [
        {
          label: "Mevcut bağ",
          explanation:
            "Yeni atölye sözünde yeni, atölyenin niteliğini belirleyen sıfat olarak okunabilir. Bu okuma kendi başına dil dışı değildir.",
        },
        {
          label: "Amaçlanan bağ",
          explanation:
            "Az önce gerçekleşen giriş anlatılacağı için yeni sözünün girmek eylemine zaman ilişkisiyle bağlanması istenir.",
        },
        {
          label: "Yeni sıra",
          explanation:
            "Atölyeye yeni girdim biçimi bu amacı açıkça verir. Hedef yeni atölyenin niteliği olsaydı ilk sıra korunabilirdi.",
        },
      ],
      answer: "Atölyeye yeni girdim.",
      check:
        "Atölyenin yeni açılmış olması hakkında artık zorunlu bir bilgi verilmez; girişin yakın zamanı anlatılır.",
      pitfall: "İlk cümleyi amaçtan bağımsız her koşulda bozuk sayma.",
    },
    {
      title: "Kişi önceliği ile çoğul ekini ayır",
      prompt:
        "“Sen ve ben yarın geleceksiniz.” cümlesi ortak gelişi anlatıyor. Kişiyi düzelt ve “Öğrenciler geldi/geldiler.” çiftinin neden başka bir başlık olduğunu açıkla.",
      strategy: "Özne grubunda konuşanın yer alıp almadığını önce belirle.",
      steps: [
        {
          label: "Ortak kişi",
          explanation:
            "Sen ve ben, konuşanı da içerir ve biz grubunu kurar. Birinci kişi bulunduğu için birinci çoğul kişi eki gerekir.",
        },
        {
          label: "Onarım",
          explanation:
            "Sen ve ben yarın geleceğiz biçimi hem ortaklık hem kişi bakımından uygundur. Sadece çoğul bir ek görmek yeterli değildir.",
        },
        {
          label: "Yakın koşul",
          explanation:
            "Öğrenciler geldi/geldiler çifti üçüncü kişide insan çoğulunun tekil veya çoğul yüklemi kullanabilmesiyle ilgilidir; ben+sen kişi önceliğini ortadan kaldırmaz.",
        },
      ],
      answer: "Sen ve ben yarın geleceğiz.",
      check:
        "Geleceksiniz dinleyici grubunu, geleceğiz konuşanın da içinde olduğu grubu gösterir.",
      pitfall: "Kişi uyumunu yalnız tekil–çoğul ayrımına indirgeme.",
    },
    {
      title: "Olumsuzluk hangi niteliğe gidiyor?",
      prompt:
        "Bir romanda konu olumlu biçimde ilginç, dil ise olumsuz biçimde sade değil diye geçmiş zamanda anlatılacaktır. “Konusu ilginç, dili sade değildi.” ifadesini iki kapsamı açıkça ayıracak biçimde yaz.",
      strategy:
        "İki ad yargısının olumlu–olumsuz ve zaman değerini ayrı kaydet.",
      steps: [
        {
          label: "İlk yargı",
          explanation:
            "Amaç konu için olumlu ilginçti yargısıdır. Bu olumlu geçmişi kendi ek fiiliyle açıkça vermek gerekir.",
        },
        {
          label: "İkinci yargı",
          explanation:
            "Dil için sade değildi olumsuz yargısı korunur. Olumsuzluğun konuya da yayılması istenmiyor.",
        },
        {
          label: "Açık kapsam",
          explanation:
            "Konusu ilginçti, dili sade değildi biçiminde iki yargı kapanır. Bu özel kapsam gerekçesi, her ortak ek fiil kullanımının hatalı olduğu anlamına gelmez.",
        },
      ],
      answer: "Konusu ilginçti, dili sade değildi.",
      check:
        "İlk yargının olumlu, ikincinin olumsuz kaldığını kendi sözlerinle söyle.",
      pitfall:
        "Değildi sözünü cümlenin tüm niteliklerine otomatik yayma veya ortak ek fiili her zaman yasaklama.",
    },
    {
      title: "Zaman çizgisindeki iki eylem",
      prompt:
        "Bir ekip geçen hafta Bursa’ya gitmiştir ve gelecek hafta Ankara’ya gidecektir. Bu iki olayı “Geçen hafta Bursa’ya, gelecek hafta Ankara’ya gideceğiz.” biçiminde tek gelecek yüke bağlamış. Verilen gerçek olayları koruyarak onar.",
      strategy: "Her zaman belirtecini olayın gerçekleşme durumuyla eşleştir.",
      steps: [
        {
          label: "Geçmiş olay",
          explanation:
            "Bursa’ya gidiş gerçekleşmiş ve geçen haftaya aittir; anlatımın verilen zaman düzeninde geçmiş gittik yüklemi gerekir.",
        },
        {
          label: "Gelecek olay",
          explanation:
            "Ankara’ya gidiş henüz gerçekleşmemiştir; gelecek hafta için gideceğiz biçimi korunur.",
        },
        {
          label: "İki yüklem",
          explanation:
            "Geçen hafta Bursa’ya gittik, gelecek hafta Ankara’ya gideceğiz biçimi her ögeyi kendi zamanına bağlar. Tarihsel anlatımda özel zaman kaydırması bu soruda verilmemiştir.",
        },
      ],
      answer: "Geçen hafta Bursa’ya gittik, gelecek hafta Ankara’ya gideceğiz.",
      check:
        "Hiçbir şehir, kişi grubu veya olay tarihi değiştirilmedi; yalnız eksik geçmiş yargı tamamlandı.",
      pitfall:
        "İki ayrı zamanı aynı gelecek yüklemine bağlayarak kronolojiyi gözden kaçırma.",
    },
  ],
  recall: [
    {
      prompt: "Her tekrar ve söylenmeyen her öge otomatik hata mıdır?",
      answer:
        "Hayır. Vurgu veya gönderim tekrar gerektirebilir; iki fiil aynı uygun ögeyi paylaşabilir. Nötr amaçta bilgi kaybını ve her yüklemin istediği ilişkiyi ayrı denetlemek gerekir.",
    },
    {
      prompt: "Yeni atölyeye girdim ile atölyeye yeni girdim nasıl ayrılır?",
      answer:
        "İlkinde yeni atölyeyi niteleyebilir; ikincide girişin yakın zamanı anlatılır. Doğru onarım amaçlanan anlama bağlıdır.",
    },
    {
      prompt: "Görmek ve güvenmek neden aynı kişiyi farklı ekle ister?",
      answer:
        "Görmek kimi/neyi sorusuyla belirtme nesnesi; güvenmek kime/neye sorusuyla yönelme ilişkisi kurar. Kişinin aynı olması hâl ekini eşitlemez.",
    },
    {
      prompt:
        "Ben+sen kişi grubu ile insan çoğulunun tekil/çoğul yüklemi aynı kural mıdır?",
      answer:
        "Hayır. Ben+sen birinci kişi içerdiği için biz çekimi ister. İnsan adlarının üçüncü kişi çoğulunda tekil veya çoğul yüklem kullanımı başka bir uyum başlığıdır.",
    },
    {
      prompt: "İnsan dışı çoğul özne için hangi önemli istisnayı korursun?",
      answer:
        "Açık kişileştirme bağlamında tekil veya çoğul yüklem kullanılabilir. Nötr okul örneğindeki tekil kuralı bu bağlama koşulsuz taşınmaz.",
    },
    {
      prompt: "Ek fiil veya çatı onarımında son kontrolün nedir?",
      answer:
        "Her yargının yapanı, etkilenen varlığı, zamanı ve olumlu–olumsuz kapsamı korunmalıdır. Farklı çatı veya ortak ek fiil yalnız var diye değil, amaçlanan ilişkiyi bozduğunda onarılır.",
    },
  ],
  source:
    "Aurelia Türkçe Anlatım Bozuklukları kopya kâğıdı; OGM Türkçe Anlatım Bozuklukları; MEBİ TYT Türkçe Konu Özetleri, Anlatım Bozuklukları. Gerçek kaynak koşulları ve istisnaları karşılaştırılarak hazırlanmış özgün anlatım ve öğretim soruları; resmî soru gövdesi aktarımı değildir.",
};

export const meaningGuide017: LessonGuide = {
  id: "sozcukte-anlam",
  minutes: 100,
  objectives: [
    "Sözcük veya söz öbeğinin karşılığını tam bağlamda bul.",
    "Anlam türü, kapsam, terimlik, nicellik ve somutluk ölçütlerini ayrı kullan.",
    "Aktarımın kaynak ve hedefini doğru yönde göster.",
    "Yakın karşılığı cümleye yerleştir; bilgi, ton ve kalıbın korunduğunu denetle.",
  ],
  sections: [
    {
      title: "Sözcüğün anlamı tam bağlamda seçilir",
      paragraphs: [
        "Bir sözcüğün sözlükte birden çok karşılığı olabilir; cümlede hangisinin seçildiğini çevresindeki sözler belirler. “Ağır sandık” kütleyi, “ağır ilerlemek” hızı anlatabilir. İlk anlamı otomatik taşımak yerine sözcüğün neyi nitelediğini veya hangi eyleme katıldığını bul. Sonra kendi kısa karşılığını cümleye koy ve bilgi ile tonun korunup korunmadığını sınayabil.",
        "Soruda altı çizili olan alan bir sözcük değil, bütün bir söz öbeği de olabilir. Öbeği parçalayınca asıl anlam kaybolabilir; gözünden düşmek yalnız fiziksel düşme değildir. Önce istenen sınırı belirle, sonra karşılığı aynı cümlede dene. Yakın görünen iki seçenek arasında yoğunluk, olumlu–olumsuz çağrışım veya kullanım alanı farkı varsa bu farkları da hesaba kat.",
      ],
    },
    {
      title: "Temel, yan ve gerçek anlamın ilişkisi",
      paragraphs: [
        "Temel anlam sözcüğün ilk ve alışılmış kullanımını; yan anlam temel anlamla bağını koruyarak başka bir varlığa yakıştırılan kullanımı gösterir. İnsan ayağı ile sandalyenin ayağı arasında biçim veya işlev benzerliği düşünülebilir. Bu rehber MEBİ’nin temel ve yan anlam başlıklarını ayrı açıklar; bazı kaynaklar ikisini gerçek anlam çatısı altında birlikte değerlendirebilir.",
        "Yan anlamı her durumda mecazla aynı sayma. Sandalyenin ayağı hâlâ somut bir parçayı adlandırır; cesaretin kırılması ise fiziksel bir nesnenin kırılması değildir. Sözcüğün yeni kullanımı temel anlamla nasıl bağ kuruyor, somut bir adlandırma mı yoksa başka bir imge veya soyut aktarım mı var diye sor. Soruda hangi sınıflandırma ölçütünün istendiğini açık tut.",
      ],
    },
    {
      title: "Mecaz: yeni bağlamda aktarılan anlam",
      paragraphs: [
        "Mecazda sözcük temel fiziksel kullanımından uzaklaşıp bir ilgi veya benzetmeyle yeni anlam kazanır. Soğuk su gerçekten sıcaklıkla ilgiliyken soğuk karşılama ilgisiz ve mesafeli tavrı anlatır. Karşılamanın sıcaklığını termometreyle ölçmeye çalışmak yerine, cümledeki insan davranışına uygun bir karşılık yazılır.",
        "Mecaz yalnız süslü şiir sözü değildir; günlük dilde de sık görülür. Keskin eleştiri, derin üzüntü, ağır sözler gibi kullanımlarda ilgili özelliğin neye taşındığını göster. Her yeni anlamı sesteş ayrı kelime sanma; mecazlı kullanımda çoğu zaman temel anlamla bir bağ kurulabilir. Özgün açıklaman, hem asıl cümlenin bilgisini hem de duygusal tonunu korumalıdır.",
      ],
    },
    {
      title: "Terim: alanın özel kavramı",
      paragraphs: [
        "Bir bilim, sanat, meslek veya belirli konu alanında özel kavramı karşılayan kullanım terimdir. Üçgende taban, müzikte sol anahtarı, futbolda ofsayt bu alan ilişkisiyle değerlendirilir. Bir sözcüğün derste geçmesi tek başına terimlik sağlamaz; öğretmenin çantası sözündeki çanta günlük kullanımını sürdürebilir.",
        "Temel kullanımı bir alanda terim olan söz, başka cümlede mecazlaşabilir. “Hayatın her notasına uydu.” sözünde nota doğrudan bir müzik işaretini tanımlamayabilir. Terim oluşu ile somutluk veya nicellik de tek eksen değildir; bir geometri terimi aynı zamanda ölçülebilen bir kavramı karşılayabilir. Soru hangi boyutu soruyorsa o kanıtla cevap ver.",
      ],
    },
    {
      title: "Eş anlam ve yer değiştirme sınırı",
      paragraphs: [
        "Eş anlamlı sözler benzer veya aynı kavramı farklı biçimlerle karşılayabilir: yanıt–cevap gibi. Bununla birlikte kalıplaşmış söz, özel kullanım ve çağrışım bir cümledeki değişimi sınırlayabilir. “Kara kumaş” bağlamında siyah karşılık olabilirken kara haber sözünü siyah haber yapmak aynı yerleşik anlamı korumaz.",
        "Yerine koyma denemesi yalnız sözlükte eş anlam yazdığını hatırlamak değildir; tam cümleyi yeniden kurmaktır. Görev, olumlu–olumsuz çağrışım, üslup ve kalıplaşmış yapı korunuyor mu bak. Deyim ve atasözlerinde sözcüğü eş anlamlısıyla rastgele değiştirmek genellikle o kalıbı bozabilir. Sözün hangi bağlamda değiştirilebildiğini örnekle kanıtla.",
      ],
    },
    {
      title: "Yakın anlam, ton ve yoğunluk",
      paragraphs: [
        "Yakın anlamlı sözler aynı alanı çağrıştırabilir ama her ayrıntıda özdeş değildir. Kırgın ve öfkeli olumsuz duygu bildirebilir; duygunun yönü ve şiddeti aynı olmak zorunda değildir. Bir cümlede ikisi de dil bilgisel olarak yer alabilse bile anlatılan kişinin hâli değişebilir. Uygun karşılığı seçerken sadece ortak anlam parçasını değil farklı olan tonu da açıkla.",
        "Bazı yakınlıklar yalnız belirli cümlede kurulur: yatmak ve uyumak aynı olay zincirinde bulunabilir ama yatağa giren kişinin mutlaka uyuduğu söylenemez. Seçenekler arasında bir bilgi ekleyen, bir koşulu kaldıran veya duygu derecesini artıran karşılığı ele. En yakın anlam sorusunda tam özdeşlik yoksa cümlenin korunması istenen temel ilişkisini belirle.",
      ],
    },
    {
      title: "Karşıtlık, olumsuzluk ve bağlam",
      paragraphs: [
        "Karşıt anlam, aynı boyuttaki zıtlığı gösterir: sıcak–soğuk, uzun–kısa gibi. Sözcüğün karşıtı da bağlama göre seçilir. Ağır sandık için hafif, ağır ilerlemek için hızlı daha uygun olur. Kütle anlamını hız bağlamına taşıyarak yalnız ezberlenmiş bir çifti söylemek doğru karşılaştırmayı kurmaz.",
        "Bir fiilin olumsuz biçimi otomatik karşıtı değildir: gelmek ile gelmemek karşıt yönlü iki eylem adı değil, aynı eylemin olumlu ve olumsuz kuruluşudur; gelmek–gitmek başka bir ilişki kurar. Her sözcüğün her kullanımında tek ve hazır bir karşıt bulunması da şart değildir. Önce ortak ölçütü seç, sonra iki anlamın gerçekten o ölçütün uçlarını karşılayıp karşılamadığını denetle.",
      ],
    },
    {
      title: "Sesteşlik ile çok anlamlılığı ayır",
      paragraphs: [
        "Sesteş sözcükler aynı biçimde yazılıp söylenebilir ama farklı anlam alanlarını karşılar: içilen çay ile küçük akarsu çay okul örneklerindendir. Cümle, hangi sözcüğün kullanıldığını belirler. Sadece aynı harfleri gördüğün için iki cümlede de aynı nesneden söz edildiğini varsayma.",
        "Çok anlamlılıkta ise tek sözcüğün kullanımları arasında temel, yan veya mecaz bağı kurulabilir. Soğuk su ile soğuk tavır bu tür bir aktarımı düşündürür. Farklı söyleyiş veya düzeltme işareti taşıyan kar–kâr gibi biçimleri de koşulsuz sesteş örneği yapma. Sorunun verdiği anlam bağını ve söyleyişi birlikte kullan; tarihsel kökenini ayrıca doğrulamadığın sözcükler hakkında kesin köken hikâyesi üretme.",
      ],
    },
    {
      title: "Somut ve soyut: beş duyu ölçütü",
      paragraphs: [
        "Beş duyu yoluyla algılanabilen varlık veya özellikler somut kullanımda değerlendirilir. Ses işitilir, ışık görülür, soğukluk hissedilir; bu yüzden yalnız elle tutulabilen şeyleri somut saymak eksiktir. Sevgi, düşünce, umut gibi kavramlar ise doğrudan bir dış nesne gibi duyularla algılanmaz ve soyut anlam alanındadır.",
        "Bir sözcük farklı bağlamda somuttan soyuta taşınabilir. Rüzgâr fiziksel hava hareketi olabilir; bir düşünce rüzgârına kapılmak soyut etkiyi anlatabilir. Somut/soyut ayrımını sözcüğün cümlede seçilen anlamı üzerinde yap. Zihinde bir duygunun resmini canlandırabilmek, o duygunun kendisini fiziksel bir nesneye dönüştürmez.",
      ],
    },
    {
      title: "Nitel ve nicel: ölçülen ne?",
      paragraphs: [
        "Nicel kullanım sayılabilen veya ölçülebilen miktar ve boyutu; nitel kullanım varlığın özelliğini, durumunu veya değerlendirmesini öne çıkarır. On metre derin kuyu ölçülen bir boyuta sahiptir; derin üzüntü ise duygu yoğunluğu anlatır. Aynı sıfatın harfleri değişmeden farklı ölçütlere katılabileceğini bu iki bağlam açıkça gösterir.",
        "Cümlede rakam bulunması bütün kelimeleri nicel yapmaz; üç güzel çiçek sözünde üç sayı, güzel niteliktir. Çok sözü de bağlandığı ifadeye göre okunur: çok para miktar; çok kaba bir davranış ise niteliğin derecesiyle ilgilidir. Duygunun az veya çok hissedilmesi, ona otomatik metre veya kilogram gibi bir ölçü birimi vermez. Hangi özelliğin nasıl ölçüldüğünü sor.",
      ],
    },
    {
      title: "Genel ve özel anlam göreli kapsamdır",
      paragraphs: [
        "Genel anlam daha geniş tür kümesini, özel anlam onun içindeki daha dar grubu karşılar. Canlı→hayvan→kuş→serçe dizisinde her adım kapsamı daraltır. Kuş, serçeye göre genel; hayvana göre özeldir. Bu göreli ilişkiyi tek sözcüğün her koşulda yalnız genel veya yalnız özel olduğu bir etiket gibi düşünme.",
        "Özel anlamlı serçe bir tür adıdır; bu durum onu kişi adı gibi özel ada dönüştürmez. Aynı şekilde bir cümlede belirli bir saatten söz edilmesi, saatin bütün saat türlerini kapsayan genel kullanımıyla eş değildir. Karşılaştırılan kümeyi ve hangi varlıkların kapsama girdiğini açıkça çiz. Tek örneğe bakarak bütün üst sınıf hakkında sonuç çıkarma.",
      ],
    },
    {
      title: "Yansıma: sesin dildeki izi",
      paragraphs: [
        "Doğadaki seslerin taklidiyle kurulan şıp, pat, vız gibi biçimler ve bunlardan türeyen sözler yansıma başlığında incelenir. Vızıltı veya fısıldamak gibi bir örnekte hangi sesin taklit edildiğini gösterebilirsin. Bir kelimenin anlamca sesle ilgili olması tek başına onun yansıma kökünden kurulduğunu kanıtlamaz.",
        "Yansıma sözler ikileme veya yeni türemiş söz içinde bulunabilir; şıpır şıpır gibi tekrar, bir olayın sesini ve oluş biçimini birlikte canlandırır. Sessiz bir hareketin anlatımıyla gerçek ses taklidini ayır. Kaynakta bir örneğin yansıma diye verilmesi, o örneğe benzeyen bütün fiillerin aynı kökeni paylaştığı sonucu değildir; cümledeki taklit ilişkisini açıkla.",
      ],
    },
    {
      title: "Ad aktarması: benzetmeden gönderim",
      paragraphs: [
        "Ad aktarmasında bir söz başka bir söz yerine aralarındaki ilgiyle kullanılır; temel amaç benzetme değildir. Konserde salon alkışladı denince yer adı dinleyicileri; tabağını bitirdi denince kap adı içindeki yiyeceği karşılayabilir. Yer–insan ve iç–dış ilişkilerinde hangi adın hangi varlığa gittiğini açıkça söyle. Bağlam gerçek insanları gösteriyorsa salona hayalî eller verilmiş bir kişileştirme varsayma.",
        "Sanatçı–eser ilişkisinde bir yazarı okumak onun eserini; parça–bütün ilişkisinde bir bölüm adı bütünü ya da tersi karşılayabilir. Neden–sonuç ilişkisinde yağmur yerine bereket gibi sonuç adı; yön–ülke ilişkisinde Batı gibi bir yön adı ilgili ülkeleri anlatabilir. Bunlar otomatik sözcük etiketleri değildir: aynı yazar gerçekten gözleniyorsa eser aktarımı zorunlu olmaz. Benzetme amacı bulunmadan kurulan somut gönderimi tam cümlede kanıtla.",
      ],
    },
    {
      title: "Aktarımın yönü ve duyular arası geçiş",
      paragraphs: [
        "Bir özellik başka alana taşınırken kaynak ve hedef ayrı adlandırılır. Esip gürlemek bir insanın öfkeli davranışına taşınırsa doğa eylemi insana aktarılır; bir ağacın gülümsemesi anlatılıyorsa insana özgü davranış doğaya taşınır. Hayvanın kükreme sesi fırtınaya yüklenirse iki hedef de doğa alanındadır ve doğadan doğaya aktarım incelenir. Yönü bulmak için özelliğin ilk alanını ve yeni taşıyıcıyı ayrı göster.",
        "Duyular arası aktarımda ise bir duyuya bağlı özellik başka duyunun nesnesine taşınır: tatlı ses tatma alanından işitmeye geçer. Tatlı elma gerçek tat özelliğini koruyabilir. Her doğa sözcüğünü aynı yöndeki aktarım sayma; insandan doğaya, doğadan insana ve bir duyudan diğerine geçişler farklıdır. Şemada ok yönünü sözün temel alanından yeni hedefe doğru kur.",
      ],
    },
    {
      title: "Somutlama ve benzetme ilişkisi",
      paragraphs: [
        "Soyut bir duygu veya düşüncenin somut nesne, hareket ya da sahneyle anlatılması somutlama kurabilir. Sevinci bir yumak gibi düşünmek veya zamanın aktığını söylemek, soyut kavrama görülebilen bir biçim ya da hareket kazandırır. Bu kullanımda fiziksel nesne gerçekten içimizde bulunmak zorunda değildir; anlatımın kurduğu imge incelenir.",
        "Benzetmede iki varlık ortak özellik bakımından karşılaştırılır; zayıf görülen yön güçlü örnekle anlatılır. Benzeyen, kendisine benzetilen ve ortak özellik açıkça bulunabiliyorsa ilişkiyi adlandır. Her gibi sözü benzetme olmayabilir; kimi bağlamda yaklaşık zaman veya başka görev üstlenir. Somutlama, benzetme ve mecaz birbirini dışlayan tek bir liste değil, farklı özellikleri inceleyen başlıklardır.",
      ],
    },
    {
      title: "Kinaye ve tariz aynı ölçüt değildir",
      paragraphs: [
        "Kinayede sözün gerçek okuması da düşünülebilirken amaçlanan mecaz anlam öne çıkar. Diken batmadan gül toplanamayacağını anlatan bir söz, gerçek bahçe işini ve emek vermeden sonuca ulaşamama düşüncesini birlikte çağrıştırabilir. Yalnız iki farklı sözlük anlamı bulundu diye her sözü kinaye sayma; bağlamın mecazı amaçlayıp gerçek okumaya da izin vermesi gerekir.",
        "Tarizde ise söylenenin tersi kastedilir: geç kalmış birine gecikmesini eleştirmek için “Ne kadar dakiksin!” denmesi gibi. Burada verilen niyet gerçek övgü değil, ters sözle eleştiridir. Günlük dilde kinayeli sözü geniş anlamda kullanılabilse de bu rehberin okul sınıflamasında iki başlık ayrı ölçütlerle açıklanır. Alay amacı ve bağlam verilmeden yalnız cümlenin olumlu biçiminden sonuç çıkarma.",
      ],
    },
    {
      title: "Dolaylama ve güzel adlandırma",
      paragraphs: [
        "Tek kavramı birden fazla sözle karşılamak dolaylama olabilir: kaleci yerine file bekçisi gibi. Amaç kavramı başka bir anlatımla adlandırmaktır; her uzun açıklama otomatik dolaylama değildir. Bir nesneyi ayrıntılarıyla tanıtmakla yerleşik bir söz öbeğinin tek bir kavram yerine geçmesini ayrı değerlendir.",
        "Güzel adlandırma korku, üzüntü veya olumsuz çağrışım yaratan bir durumu daha yumuşak sözle anlatır; ölüm için kullanılan dolaylı saygı ifadeleri bu başlıkta ele alınabilir. Bu bir olayın gerçekten daha az ciddi olduğunu kanıtlamaz, anlatımın çağrışımını değiştirir. Dolaylama ile güzel adlandırma kimi örnekte birlikte bulunabilir; sorunun hangi işlevi istediğini oku.",
      ],
    },
    {
      title: "Anlam değişmesi: kapsam ve değer iki eksen",
      paragraphs: [
        "Bir sözcüğün zaman içindeki anlam alanı genişleyebilir veya daralabilir. Eski anlam yalnız bir başarı türünün karşılığı, yeni anlam her başarı türünün karşılığı olarak verilmişse kapsam genişlemiştir. Bir meyve adı önce daha geniş bir meyve grubunu, sonra yalnız bir türü karşılıyorsa anlam daralması vardır. Bu tür sorularda önceki ve sonraki anlam verilerini karşılaştır; sırf sözcük daha uzun veya daha olumlu göründü diye kapsam kararı verme.",
        "Anlam iyileşmesinde sözün değerlendirme tonu daha olumluya; anlam kötüleşmesinde daha olumsuza kayar. Bir soruda önce eziyet/acıyı, sonra özenle yapılan işi anlatan kullanımlar verilirse değer yönünü; önce sıradanlığı, sonra kalitesizliği anlatan kullanımlar verilirse olumsuzlaşmayı incele. Bunlar kapsam değişmesiyle aynı ölçüt değildir. Gerçek bir sözcüğün tarihini ayrıca doğrulamadığında verilen eski–yeni anlam bilgisiyle yetin; kesin bir köken hikâyesi üretme.",
      ],
    },
    {
      title: "Deyim: tek sözcük değil, bütün kalıp",
      paragraphs: [
        "Deyim, genellikle gerçek anlamından uzaklaşan ilgi çekici ve kalıplaşmış söz öbeğidir; fakat gerçek anlamını koruyan deyimler de bulunabilir. Gözünden düşmek birinin verdiği değeri kaybetmeyi anlatır. Mastar biçimindeki bu yapı kişi ve zamanla çekimlenebilir; her örneği yalnız ilk sözcüğün anlamıyla açıklamak deyimin bütün katkısını kaçırır.",
        "Deyimler yalnız eksik söz grubu biçiminde değildir; cümle şeklinde kalıplaşan örnekler de vardır. Bu nedenle her tam cümle kalıbını atasözü sayma. Deyim belirli durumu adlandırır; her durumda genel öğüt vermesi gerekmez. Kalıptaki sözlerin yerini veya kelimelerini rastgele eş anlamlılarla değiştirmek aynı deyimi korumayabilir; izin verilen kişi ve çekim değişmesiyle kalıbı bozmayı ayır.",
      ],
    },
    {
      title: "Atasözü: genel deneyim ve yargı",
      paragraphs: [
        "Atasözleri uzun deneyim ve gözlemleri kısa, özlü, yaygın ve anonim bir sözle aktarır. Öğüt verebilir veya genel bir yargıyı dile getirebilir; yalnız emir biçiminde olma şartı yoktur. Sözün bir olaya tek seferlik haber vermesiyle birçok duruma uygulanabilen ortak deneyimi anlatması farklıdır. Yalnız tam cümle görmek atasözü kararı için yeterli değildir.",
        "Bir atasözü gerçek, mecaz ya da iki okumayı birlikte düşündüren anlam taşıyabilir. Her atasözünün mutlaka mecaz olduğunu veya her mecazlı cümlenin atasözü olduğunu söyleme. Kalıplaşmış diziliş ve sözcükler rastgele değiştirilmez; kullanımın hangi genel deneyimi aktardığı açıklanır. Atasözü ile deyimi karşılaştırırken yalnız uzunluk veya fiil sayısı yerine genel yargı ve özel durum ölçütünü kullan.",
      ],
    },
    {
      title: "İkileme: kuruluş ile anlam katkısını ayır",
      paragraphs: [
        "İkileme aynı sözün tekrarıyla, yakın veya karşıt anlamlı sözlerle, yansıma sözlerle ya da biri veya ikisi tek başına anlamlı olmayan parçalarla kurulabilir. Ağır ağır aynı sözün tekrarı; az çok karşıtlık; şıpır şıpır ses taklidi içeren örneklerdir. Yapı türü ayrı, cümledeki katkısı ayrıdır; tekrarın yalnız varlığını saymak yetmez.",
        "İkileme süreklilik, pekiştirme, yaklaşık miktar, sınırlılık veya beklenmezlik gibi farklı anlamlar katabilir. Bile bile sözünde bilerek yapma, ucu ucuna sözünde ancak yetme öne çıkar; aynı kurulmuş her ikileme aynı anlamı vermez. Soruda hedeflenen öbeğin tamamını cümle içinde kendi karşılığınla açıkla ve bilgiyle tonu koru. İkilemeler normal yazımda ayrı kalır; araya sırf tekrar oldukları için virgül ya da kısa çizgi koyma.",
      ],
    },
  ],
  examples: [
    {
      title: "Soğuk su, soğuk tavır",
      prompt:
        "“Soğuk suyu bardağa doldurdu.” ve “Bizi soğuk bir tavırla karşıladı.” cümlelerindeki soğuk sözünü yeni karşılıklarla açıkla.",
      strategy:
        "Özelliğin fiziksel nesneye mi insan ilişkisine mi yüklendiğini bul.",
      steps: [
        {
          label: "Fiziksel özellik",
          explanation:
            "İlk cümlede suyun sıcaklığı anlatılır; sıcak olmayan veya düşük sıcaklıktaki su karşılığı gerçek anlamı korur.",
        },
        {
          label: "Aktarılan özellik",
          explanation:
            "İkinci cümlede ilgisiz, mesafeli tavır anlatılır; karşılamanın termometreyle ölçülen bir sıcaklığı yoktur.",
        },
        {
          label: "Yerine koy",
          explanation:
            "Bizi mesafeli bir tavırla karşıladı aynı ilişkiyi verir. İki kullanım arasındaki anlam bağı mecaz aktarımını açıklar; bunlar sırf farklı kullanım diye ayrı sesteş sayılmaz.",
        },
      ],
      answer: "Gerçek sıcaklık / mecazlı mesafeli davranış.",
      check:
        "İkinci açıklamada bir su veya oda sıcaklığı bilgisi eklemediğini denetle.",
      pitfall: "Sözcüğün ilk sözlük anlamını her yeni cümleye aynen taşıma.",
    },
    {
      title: "Karşıt sözcük, boyuta göre seçilir",
      prompt:
        "Ağır sözü “Ağır sandığı kaldırdı.” ve “Kafile ağır ilerledi.” cümlelerinde geçiyor. Her bağlamdaki karşıtını seç.",
      strategy: "Birinde kütle, diğerinde ilerleme hızı ölçütünü belirle.",
      steps: [
        {
          label: "Sandık",
          explanation:
            "Ağır sandık kütle veya taşınan yükün ağırlığıyla ilgilidir. Bu bağlamda hafif sandık karşıtı uygundur.",
        },
        {
          label: "İlerleme",
          explanation:
            "Ağır ilerlemek yavaş ilerlemek anlamındadır. Hızlı ilerlemek aynı boyutun karşıtını kurar.",
        },
        {
          label: "Cümlede dene",
          explanation:
            "Kafile hafif ilerledi demek hız karşıtını açıkça vermez; sözlükteki bir karşıtı yeni bağlama taşımak yeterli değildir.",
        },
      ],
      answer: "Sandıkta hafif; ilerlemede hızlı.",
      check:
        "İki karşılaştırmada aynı fiziksel niceliğin sorulmadığını açıkla.",
      pitfall: "Olumsuz biçim ile gerçek karşıt anlamı da birbirine eşitleme.",
    },
    {
      title: "Terim bağlamdan çıkınca",
      prompt:
        "“Müzikte nota işaretlerini öğrendi.” ile “Hayatın her notasına uyum sağladı.” sözlerinde nota kullanımlarını karşılaştır.",
      strategy:
        "İlk alandaki özel kavramı, ikinci cümlede aktarılan anlamdan ayır.",
      steps: [
        {
          label: "Alan kavramı",
          explanation:
            "İlk cümlede nota müzikte sesin gösterimiyle ilgili özel kavramı karşılar; bu kullanımı terimdir.",
        },
        {
          label: "Yeni bağlam",
          explanation:
            "İkinci cümlede hayatın olay ve durumlarına uyum sağlama anlatılır; gerçek bir müzik işaretleri dizisi tanımlanmaz.",
        },
        {
          label: "Ölçüt",
          explanation:
            "Bir sözcüğün bir alanda terim olması bütün cümlelerde aynı özel anlamda kalmasını zorunlu kılmaz. Cümledeki kavramı açıklamak gerekir.",
        },
      ],
      answer:
        "Müzik kavramında terim; yaşam durumlarına aktarımda mecazlı kullanım.",
      check:
        "İkinci cümleyi gerçek bir nota defteri varmış gibi yorumlamadığını denetle.",
      pitfall:
        "Bir bilim veya sanat metnindeki bütün kelimeleri otomatik terim sayma.",
    },
    {
      title: "Derinlik metre mi, duygu mu?",
      prompt:
        "“Kuyu on metre derindi.” ile “Derin bir üzüntü duydu.” cümlelerini nitel–nicel bakımından karşılaştır.",
      strategy: "Hangi özelliğin hangi yöntemle ölçülebildiğini açıkça belirt.",
      steps: [
        {
          label: "Ölçülebilen boyut",
          explanation:
            "Kuyunun derinliği metreyle ölçülür; nicel bir boyut anlatılır. On metre bu ölçünün açık değeridir.",
        },
        {
          label: "Duygu niteliği",
          explanation:
            "Derin üzüntü yoğun bir duyguyu anlatır; fiziksel bir çukurun metresi ölçülmez. Bu kullanım nitel ve mecazlıdır.",
        },
        {
          label: "Yanılgıyı gider",
          explanation:
            "Bir duygunun daha az veya çok hissedilmesi onu otomatik metre, kilogram ya da sayılan nesne miktarı yapmaz. Hedef sözcüğün cümledeki kullanımını incele.",
        },
      ],
      answer: "Kuyuda nicel, üzüntüde nitel kullanım.",
      check:
        "Rakam bulunduğu için cümledeki bütün sözcüklerin nicel olduğu sonucunu çıkarma.",
      pitfall:
        "Çok veya derin gibi sözlere bağlamdan bağımsız tek etiket verme.",
    },
    {
      title: "Aktarım okunun yönü",
      prompt:
        "“Öfkelenen kaptan esip gürledi.” ile “Ağaçlar sabah ışığında gülümsedi.” sözlerinde özelliklerin hangi alandan hangi hedefe taşındığını göster. İkinci sözde ağaçlara insan davranışı verilmektedir.",
      strategy:
        "Önce temel özellik alanını, sonra cümledeki yeni taşıyıcıyı bul.",
      steps: [
        {
          label: "Doğa hareketi",
          explanation:
            "Esip gürlemek doğadaki fırtına hareketini çağrıştırır; kaptanın öfkeli davranışına taşındığında yön doğadan insanadır.",
        },
        {
          label: "İnsan davranışı",
          explanation:
            "Gülümsemek insana özgü davranıştır; ağaca yüklendiğinde yön insandan doğayadır ve kişileştirme vardır.",
        },
        {
          label: "Ayrı aktarım türü",
          explanation:
            "Tatlı ses gibi bir kullanım ise tatma alanından işitmeye geçer; bu iki doğa–insan yönüyle aynı sınıf değil, duyular arası aktarımdır.",
        },
      ],
      answer: "Kaptanda doğa→insan; ağaçta insan→doğa.",
      check: "Okun başlangıcını özelliğin ilk alanına, sonunu yeni hedefe koy.",
      pitfall:
        "Örnekle başlığı ters eşleştirme; yönü verilen cümleden yeniden kur.",
    },
    {
      title: "Öbeğin bütün anlamını koru",
      prompt:
        "“Sözünü tutmayınca arkadaşının gözünden düştü.” cümlesindeki söz öbeğini tek tek göz ve düşmek anlamlarından bağımsız olarak açıkla; sonra karşılığı cümleye koy.",
      strategy:
        "Kalıplaşmış öbeğin sınırını bul ve olayla bağlantılı yeni bir cümle kur.",
      steps: [
        {
          label: "Sınır",
          explanation:
            "Hedef yalnız düşmek değil, gözünden düşmek deyiminin bütünüdür. Gözün fiziksel konumu veya yere düşen nesne anlatılmıyor.",
        },
        {
          label: "Karşılık",
          explanation:
            "Sözünü tutmama, arkadaşının ona verdiği değer ve güvenin azalmasına yol açmıştır. Verilen olay bu mecazlı değerlendirmeyi açıklar.",
        },
        {
          label: "Yeni cümle",
          explanation:
            "Sözünü tutmayınca arkadaşının güven ve saygısını kaybetti biçimi bağlamdaki temel bilgiyi korur. Öbeği yalnız değeri fiziksel olarak yere bırakmak diye açıklamak geçerli değildir.",
        },
      ],
      answer: "Arkadaşının kendisine verdiği değer, güven ve saygıyı kaybetti.",
      check:
        "Açıklama sözünü tutmama olayıyla anlamlı bir neden–sonuç bağı kuruyor.",
      pitfall:
        "Altı çizili alanı tek sözcük sanıp deyimin kalan parçalarını açıklamanın dışında bırakma.",
    },
  ],
  recall: [
    {
      prompt: "Ağır sözcüğünün karşıtını seçmeden önce neyi bulursun?",
      answer:
        "Cümlede kütle mi, hız mı başka bir özellik mi anlatıldığını. Ağır sandıkta hafif; ağır ilerlemekte hızlı karşılığı uygundur.",
    },
    {
      prompt: "Temel/yan/mecaz ile terim veya somutluk aynı tek eksen midir?",
      answer:
        "Hayır. Bunlar farklı ölçütleri inceler; terim bir özel alan kavramı olabilirken ayrıca somut veya ölçülebilen bir anlam taşıyabilir. Sorunun istediği boyut açık olmalıdır.",
    },
    {
      prompt: "Yakın anlamlı sözler neden her yerde değiştirilemez?",
      answer:
        "Temel bilgi benzer olsa da ton, yoğunluk, kullanım alanı veya kalıplaşmış yapı değişebilir. Yeni karşılığı tam cümlede denemek gerekir.",
    },
    {
      prompt: "Genel–özel anlamı özel adla karıştırmamak için ne söylersin?",
      answer:
        "Serçe kuşa göre daha dar, özel kapsamlı bir tür adıdır; kişi adı gibi özel ada dönüşmez. Genel–özel ilişkisi karşılaştırılan kümelere göre değişir.",
    },
    {
      prompt: "Doğa–insan aktarım okunun yönünü nasıl kurarsın?",
      answer:
        "Özelliğin ilk alanını başlangıç, cümlede yüklendiği varlığı hedef yaparım. Fırtına davranışı kaptana taşınırsa doğa→insan; gülümseme ağaca taşınırsa insan→doğadır.",
    },
    {
      prompt: "Kinaye, tariz ve ad aktarmasını hangi kanıtlar ayırır?",
      answer:
        "Kinayede gerçek okuma da mümkünken mecaz amaçlanır; tarizde söylenenin tersi kastedilir; ad aktarmasında benzetme amacı olmadan ilişkili bir ad başka varlığa gönderir. Tam bağlam belirleyicidir.",
    },
  ],
  source:
    "Aurelia Türkçe Sözcükte Anlam kopya kâğıdı; OGM 12. Sınıf Sözcükte Anlam ders anlatım sunusu; MEBİ TYT Türkçe Konu Özetleri, Sözcükte Anlam. Gerçek kaynak koşulları ve istisnaları karşılaştırılarak hazırlanmış özgün anlatım ve öğretim soruları; resmî soru gövdesi aktarımı değildir.",
};

const questionRows017: Record<
  string,
  {
    passage?: string;
    prompt: string;
    choices: string[];
    answer: number;
    hint: string;
    explanation: string;
  }[]
> = {
  "anlatim-bozukluklari": [
    {
      passage:
        "Yazar, yalnız kitabı bir kez daha okuduğunu anlatan kısa ve nötr bir kayıt yazacaktır: “Kitabı yeniden tekrar okudum.” Burada sanatsal vurgu veya iki ayrı tekrar aşaması amaçlanmıyor.",
      prompt:
        "Verilen kayıtta hangi işlem, amaçlanan tekrar bilgisini koruyarak gereksiz yinelemeyi giderir?",
      choices: [
        "Okudum sözcüğünü çıkarmak.",
        "Kitabı sözcüğünü çıkarmak.",
        "Yeniden sözcüğünü çıkarmak.",
        "Okudum yerine okuyacağım yazmak.",
        "Kitabı yerine kitaba yazmak.",
      ],
      answer: 2,
      hint: "İki zarfın aynı bir kez daha bilgisini taşıdığı koşulunu kullan.",
      explanation:
        "Yeniden çıkarıldığında Kitabı tekrar okudum cümlesi bir kez daha okumayı anlatmaya devam eder. Tekrar da başka bir düzeltmede çıkarılabilirdi; fakat bu seçenekler arasında yalnız yeniden çıkarma işlemi amaçlanan bilgiyi korur. Bağlam özellikle nötr bildirimdir; bütün tekrarlar veya vurgular evrensel olarak hata sayılmaz.",
    },
    {
      prompt:
        "Konuşan, aynı komşusunu önce gördüğünü, sonra ona güvendiğini anlatmak istiyor. “Komşumu gördüm ve güvendim.” sözünde iki yüklemin gerektirdiği hâl ilişkisini açıkça tamamlayan biçim hangisidir?",
      choices: [
        "Komşumu gördüm ve ona güvendim.",
        "Komşuma gördüm ve güvendim.",
        "Komşumu gördüm ve onu güvendim.",
        "Komşumdan gördüm ve komşumu güvendim.",
        "Komşumla gördüm ve komşumu güvendim.",
      ],
      answer: 0,
      hint: "Görmek kimi, güvenmek kime sorusunu karşılar.",
      explanation:
        "Gördüm belirtme durumundaki komşumu nesnesini; güvendim ise yönelme durumundaki ona tamlayıcısını ister. Aynı kişiye gönderim yapılması iki hâl biçimini eşitlemez. Komşumu gördüm ve ona güvendim, amaçlanan kişiyi her fiilin istediği ekle açıkça verir.",
    },
    {
      prompt:
        "A: “Yeni atölyeye girdim.” B: “Atölyeye yeni girdim.” A’da yeni kurulmuş bir atölye, B’de ise girişin az önce gerçekleşmesi anlatılmaktadır. Yeni sözünün iki cümledeki bağlanışı hangisinde doğru açıklanmıştır?",
      choices: [
        "İkisinde de yalnız atölyenin niteliğini bildirir.",
        "A’da giriş zamanını, B’de atölyenin niteliğini bildirir.",
        "Yeni sözü iki cümlede de açık öznedir.",
        "İki cümle de her bağlamda anlatım bozukluğudur.",
        "A’da atölyeyi niteler; B’de girişin zamanını belirtir.",
      ],
      answer: 4,
      hint: "Hangi atölye ve ne zaman girdim sorularını ayrı kullan.",
      explanation:
        "Yeni atölye öbeğinde yeni bir sıfattır ve atölyeyi niteler. Atölyeye yeni girdim sözünde ise yeni, girişin yakın zamanda olduğunu belirtir. İki cümle de kendi verilen amacıyla kurulabilir; sorun ancak söyleyenin istediği anlamla sözcüğün bağlandığı yer uyuşmadığında doğar.",
    },
    {
      prompt:
        "Bir konuşmacı, kendisi ve dinleyicisinin yarın birlikte yola çıkacağını söyleyecektir. “Sen ve ben yarın yola …” cümlesini kişi uyumuyla hangi yüklem tamamlar?",
      choices: [
        "çıkacaksın",
        "çıkacağız",
        "çıkacaksınız",
        "çıkacağım",
        "çıkacaklar",
      ],
      answer: 1,
      hint: "Birinci kişi içeren ortak özne grubunda kişi önceliğini uygula.",
      explanation:
        "Sen ve ben özne grubu konuşanı da içerir ve biz grubunu kurar; yüklem birinci çoğul kişiyle çıkacağız olur. Birinci kişinin bulunduğu grupta yalnız dinleyicinin veya tek konuşanın eki kullanılamaz. Bu kişi kuralı, insan çoğullarının tekil veya çoğul üçüncü kişiyle anlatılabilmesi başlığından ayrıdır.",
    },
    {
      prompt:
        "Bir masalda ağaçlar insanlar gibi konuşup birbirlerini teselli etmektedir: “Yaşlı ağaçlar gece boyunca fısıldadılar.” Bu bağlamda çoğul yüklemi otomatik yanlış saymama gerekçesi hangisidir?",
      choices: [
        "İnsan dışındaki her çoğul özne her zaman çoğul yüklem ister.",
        "Fısıldadılar sözü aslında tekil çekimdir.",
        "Ağaçlar sözü bu cümlede nesnedir.",
        "Açık kişileştirme bağlamında insan dışı çoğul özne tekil veya çoğul yüklemle kullanılabilir.",
        "Masallarda dil bilgisi kuralları bütünüyle uygulanmaz.",
      ],
      answer: 3,
      hint: "Verilen bağlamda insan davranışı yüklenen varlıklara ilişkin istisnayı koru.",
      explanation:
        "Ağaçların insanlar gibi konuştuğu özellikle verilmiştir; kaynakların kişileştirme istisnası bu bağlamda geçerlidir. İnsan dışı nötr çoğul özne için verilen tekil yüklem kuralı, açık kişileştirmeye koşulsuz taşınmaz. Bu durum her çoğul öznenin zorunlu çoğul yüklem istediği sonucunu da vermez.",
    },
    {
      prompt:
        "Yazar sürenin tam ölçülmediğini, on dakika dolayında olduğunu anlatmak istiyor: “İş yaklaşık tam on dakika sürdü.” Yalnız amaçlanan yaklaşık süreyi koruyarak çelişkiyi hangi sözcüğü çıkarıp giderir?",
      choices: ["yaklaşık", "tam", "iş", "sürdü", "dakika"],
      answer: 1,
      hint: "Amaç yaklaşık süre olduğu için kesin ölçüm iddiasını kaldır.",
      explanation:
        "Tam, bu bağlamda sürenin kesin olarak on dakika olduğunu söyler; yaklaşık ise on dakika dolayını anlatır. Amaç yaklaşık değer olarak açıkça verildiği için tam çıkarılır: İş yaklaşık on dakika sürdü. Yaklaşık çıkarılsaydı kesin süre anlatılır ve verilen amaç korunmazdı.",
    },
    {
      prompt:
        "Bir eleştirmen, romanın konusunu olumlu bulduğunu ama dilini sade bulmadığını geçmiş zamanda açıkça söylemek istiyor. Hangi cümle iki yargının olumlu–olumsuz kapsamını en açık biçimde verir?",
      choices: [
        "Konusu ilginç değildi, dili de sade değildi.",
        "Ne konusu ilginçti ne dili sadeydi.",
        "Konusu ilginç değildi, dili sadeydi.",
        "Konusu ilginç olmayacak, dili sade olacak.",
        "Konusu ilginçti, dili sade değildi.",
      ],
      answer: 4,
      hint: "İlk yargı olumlu, ikinci yargı olumsuz ve ikisi de geçmiş zamandadır.",
      explanation:
        "Konusu ilginçti birinci olumlu yargıyı kendi ek fiiliyle kapatır; dili sade değildi ikinci olumsuz yargıyı ayrı verir. Böylece olumsuz değildi biçiminin iki niteliğe birden yayılması ihtimali kaldırılır. Ortak ek fiil her zaman hata değildir; burada istenen iki farklı anlam kapsamının açıkça ayrılmasıdır.",
    },
    {
      prompt:
        "Konuşan kendi kitabını ve başka bir kişinin kitabını ayrı ayrı incelediğini anlatacaktır. Birinci tekil kişi ile üçüncü tekil kişinin iyelik biçimlerini açıkça ve doğru veren seçenek hangisidir?",
      choices: [
        "Benim kitabımı ve onun kitabını inceledim.",
        "Benim kitabını ve onun kitabımı inceledim.",
        "Benim ve onun kitabını inceledim.",
        "Benim kitabım ve onun kitabını inceledim.",
        "Benim kitabıma ve onun kitabına inceledim.",
      ],
      answer: 0,
      hint: "Benim kitabım ile onun kitabı tamlamalarına belirtme ekini ayrı getir.",
      explanation:
        "Benim kitabım belirtme durumunda benim kitabımı; onun kitabı ise onun kitabını olur. İki farklı iyelik kişisi, tek bir tamlanan biçimiyle gelişigüzel paylaştırılmaz. İncelemek kimi/neyi sorusunu istediğinden yönelme ekli son seçenek de uygun değildir.",
    },
    {
      prompt:
        "Aynı dosyadan söz edilen aşağıdaki cümlelerin hangisinde iki fiil, belirtme durumundaki dosyayı ögesini aynı biçimde paylaşabilir?",
      choices: [
        "Dosyayı inceledi ve güvendi.",
        "Dosyayı okudu ve üzerinde durdu.",
        "Dosyayı gördü ve söz etti.",
        "Dosyayı açtı ve kapattı.",
        "Dosyayı sakladı ve yararlandı.",
      ],
      answer: 3,
      hint: "Her iki fiile ayrı ayrı neyi sorusunu sor; farklı ek isteyenleri ayır.",
      explanation:
        "Açmak ve kapatmak aynı belirtme durumundaki dosyayı nesnesini paylaşabilir; ikinci cümlede yeniden dosyayı yazılması zorunlu değildir. Diğer seçeneklerde güvenmek, üzerinde durmak, söz etmek ve yararlanmak kendi farklı tamlayıcı ilişkilerini ister. Bu soru her ikinci yüklemde yeniden öge yazılmasını zorunlu sayma yanılgısını önler.",
    },
    {
      prompt:
        "Yazar, yabancı olan kişinin öğretmene bir şey anlattığını belirtmek istiyor; öğretmenin yabancı olduğu söylenmiyor. Hangi biçim amaçlanan özne–niteleme sınırını açıkça gösterir?",
      choices: [
        "Yabancı öğretmene anlattı.",
        "Yabancı öğretmene, anlattı.",
        "Yabancı, öğretmene anlattı.",
        "Yabancı öğretmene anlattı!",
        "Yabancı öğretmene anlattı mı?",
      ],
      answer: 2,
      hint: "Yabancı kişi özne olmalı; öğretmene sözünün niteleyicisi olmamalı.",
      explanation:
        "Yabancı, öğretmene anlattı biçiminde yabancı sözü yabancı kişi anlamında adlaşır ve özne olur; virgül bunu öğretmeni niteleyen sıfat olarak okumayı önler. Virgülsüz biçim yabancı öğretmen anlamına açıktır. Son işareti değiştirmenin amacı netleştirmekle aynı işlem olmadığına dikkat et.",
    },
  ],
  "sozcukte-anlam": [
    {
      passage:
        "Ece soğuk suyu bir bardağa doldurdu. Konuğu kapıda karşılayan görevlinin soğuk tavrı ise onu şaşırttı; görevli ilgisiz ve mesafeliydi.",
      prompt:
        "Bu parçada soğuk sözcüğünün iki kullanımı için hangi açıklama doğrudur?",
      choices: [
        "İki kullanım arasında mutlaka sesteşlik vardır; hiçbir anlam bağı yoktur.",
        "İki kullanımda da yalnız fiziksel sıcaklık ölçülür.",
        "İlkinde mecaz, ikincide sıcaklıkla ilgili gerçek kullanım vardır.",
        "İlkinde fiziksel sıcaklıkla ilgili gerçek, ikincide mesafeli tavır bildiren mecaz anlam vardır.",
        "İkisinde de bir bilim dalına özgü özel kavramı anlatan terim vardır.",
      ],
      answer: 3,
      hint: "Birinde suyun sıcaklığını, diğerinde kişinin ilgisiz tavrını anlatan bağlam verilmiştir.",
      explanation:
        "Soğuk su fiziksel sıcaklığı belirtir ve gerçek anlamdadır. Soğuk tavırda sıcaklık ölçülmez; mesafeli ve ilgisiz davranış mecaz yoluyla anlatılır. Aynı sözcüğün ilgi kurularak genişleyen bu kullanımları, anlam bağı olmayan iki sesteş sözcükle eşitlenmez.",
    },
    {
      prompt:
        "Bir geometri dersinde “Üçgenin bu kenarı taban olarak seçildi.” deniyor. Taban sözcüğünü bu cümlede terim yapan özellik hangisidir?",
      choices: [
        "Somut bir varlığı anlatan bütün sözcüklerin terim sayılması.",
        "Geometri alanındaki özel ve belirli bir kavramı karşılaması.",
        "Sözcüğün gerçek anlamdan uzaklaşıp bir duyguya aktarılması.",
        "Bilim metninde geçen bütün sözcüklerin otomatik terim olması.",
        "Aynı sözcüğün başka bağlamda da kullanılmasının tek başına yeterli olması.",
      ],
      answer: 1,
      hint: "Terim oluşunu özel kavram ve alan ilişkisiyle kanıtla.",
      explanation:
        "Taban burada bir geometri kavramını karşılar; terimlik bu özel kullanımdan gelir. Aynı sözcük ayakkabının tabanı gibi başka bir bağlamda farklı görevde olabilir. Ders metnindeki her günlük sözcük terim sayılmaz; alanla ilgili özel kavramı karşılayan kullanım aranır.",
    },
    {
      prompt:
        "A: “Bahçedeki kuyu on metre derindi.” B: “Bu olay ona derin bir üzüntü verdi.” Derin sözünün iki bağlamdaki nitel–nicel ayrımı hangisidir?",
      choices: [
        "A nitel, B niceldir.",
        "İkisinde de yalnız metreyle ölçülen nicelik vardır.",
        "B’de duygunun derecesi düşünülebildiği için mutlaka niceldir.",
        "Rakam yalnız A’da bulunduğu için bütün sözcükleri nicel olur.",
        "A ölçülebilen fiziksel derinlikle nicel, B duygu yoğunluğuyla nitel kullanımdır.",
      ],
      answer: 4,
      hint: "Standart fiziksel ölçü ile mecazlı duygu niteliğini ayrı değerlendir.",
      explanation:
        "Kuyunun derinliği metreyle ölçülen bir boyuttur; A’daki kullanım niceldir. Derin üzüntü yoğun bir duyguyu anlatır; B’deki kullanım nitel ve mecazlıdır. Bir niteliğin daha az veya daha çok hissedilmesi, sözcüğü otomatik olarak fiziksel ölçülü niceliğe dönüştürmez.",
    },
    {
      prompt:
        "“Kafile ağır ilerledi; kısa yolu ancak akşam tamamladı.” cümlesinde ağır sözcüğünün bağlamdaki karşıtı hangisidir?",
      choices: ["hızlı", "alçak", "dar", "hafif", "yumuşak"],
      answer: 0,
      hint: "Burada taşınan yükün kütlesi değil, ilerlemenin hızı anlatılıyor.",
      explanation:
        "Ağır ilerlemek bu bağlamda yavaş ilerlemektir; karşıt anlam hızlı ilerlemek olur. Hafif, ağır yük gibi kütle bağlamında karşıt olabilir fakat bu cümlenin hız anlamını karşılamaz. Karşıtlık sözcüğün sözlükteki ilk anlamından değil, verilen kullanımdan seçilmelidir.",
    },
    {
      prompt:
        "A: “Demlediği çayı fincana doldurdu.” B: “Köyün yanındaki çay denize akıyor.” Çay sözcüğünün içecek ve akarsu anlamları için okul sınıflamasında hangi ilişki kullanılır?",
      choices: [
        "Yakın anlamlılık; iki cümlede birbirinin yerine geçebilirler.",
        "Anlamdaşlık; içecek ile akarsu aynı kavramdır.",
        "Yazılış ve söyleyiş ortak, anlamlar farklı olduğu için sesteşlik",
        "Terim anlam; iki cümlede de bilimsel bir kavram tanımlanır.",
        "Tek sözcüğün benzerlik bağıyla genişlemiş iki kullanımı.",
      ],
      answer: 2,
      hint: "Aynı biçimde söylenen içecek adıyla akarsu adını karşılaştır.",
      explanation:
        "Çay içecek ve çay akarsu, okul örneklerinde sesteş sözcüklerdir. Bağlam hangi sözcüğün kullanıldığını gösterir. Aynı sözcüğün anlam bağıyla temel/yan/mecaz kullanımlar kazanması olan çok anlamlılıkla bu sınıflama birbirine karıştırılmaz.",
    },
    {
      prompt:
        "Canlı, hayvan, kuş ve serçe kavramları aynı sınıflandırma içinde karşılaştırılıyor. Hangi dizi daha genel kapsamdan daha özel kapsama doğru ilerler?",
      choices: [
        "Canlı → serçe → kuş → hayvan",
        "Serçe → kuş → hayvan → canlı",
        "Hayvan → canlı → serçe → kuş",
        "Kuş → canlı → hayvan → serçe",
        "Canlı → hayvan → kuş → serçe",
      ],
      answer: 4,
      hint: "Bir sonraki küme öncekinin içinde yer almalıdır.",
      explanation:
        "Canlı en geniş verilen kapsamdır; hayvan bunun, kuş hayvanın, serçe kuşun alt tür grubudur. Genel ve özel anlam bu karşılaştırmada göreli kapsamı gösterir; serçenin özel anlamlı olması bir kişi adı gibi özel ad olduğu anlamına gelmez.",
    },
    {
      prompt:
        "Bir konserden söz ediliyor: “Son parça bitince salon uzun süre alkışladı.” Alkışlayanların salondaki dinleyiciler olduğu açıktır. Bu kullanım hangi ilişkiyi örnekler?",
      choices: [
        "Salonun duvarlarına insan özelliği verilerek yalnız kişileştirme",
        "Salon sözcüğünün müzikteki ölçü birimi olması",
        "Yer adıyla o yerdeki insanları anlatan ad aktarması",
        "Gerçek bir duvar sesinin yansıma sözcükle taklidi",
        "Salon ile dinleyici sözcüklerinin her cümlede eş anlamlı olması",
      ],
      answer: 2,
      hint: "Bağlamda duvarlar değil, içerideki dinleyiciler alkışlıyor.",
      explanation:
        "Salon adı, o yerde bulunan dinleyicilerin yerine kullanılmıştır; yer–insan ilişkili ad aktarması vardır. Burada salona hayalî eller verildiği söylenmiyor; gerçek alkışlayanlar bağlamda açıkça insanlardır. Benzetme amacı olmayan bu gönderim, her kişileştirmeyle aynı işlem değildir.",
    },
    {
      prompt:
        "“Tatlı sesiyle şarkıyı söyledi.” cümlesinde tatlı sözü, tat alma alanından işitilen sesin hoşluğuna taşınmıştır. Bu kullanım hangisidir?",
      choices: [
        "Duyular arası aktarım",
        "İnsandan doğaya aktarım",
        "Doğadan insana aktarım",
        "Benzetmesiz ad aktarması",
        "Güzel adlandırma",
      ],
      answer: 0,
      hint: "Kaynak duyu tatma, hedef duyu işitmedir.",
      explanation:
        "Tatlı, temel olarak tat alma alanıyla ilişkilidir; bu cümlede işitilen sesin hoşluğunu anlatır. Bir duyudan diğerine taşınan özellik duyular arası aktarım örneğidir. Cümle kişinin sesinin gerçekten yenilip tadıldığını anlatmaz.",
    },
    {
      prompt:
        "Can randevuya kırk dakika geç gelir. Arkadaşı bunu eleştirmek için “Ne kadar da dakiksin!” der; gerçekte Can’ın dakik olmadığını kasteder. Bu sözün kullanımı hangisidir?",
      choices: [
        "Gerçek ve mecaz anlamı birlikte düşündüren kinaye",
        "Söylenenin tersini kasteden tariz",
        "Tek kavramı birkaç sözle karşılayan dolaylama",
        "İki varlığı ortak özellikle karşılaştıran benzetme",
        "Soyut kavramı somut imgeyle anlatan somutlama",
      ],
      answer: 1,
      hint: "Amaç övmek değil, karşıt sözle gecikmeyi eleştirmektir.",
      explanation:
        "Verilen niyet, övgü görünen sözün tersini kastederek gecikmeyi eleştirmektir; bu tarizdir. Gerçek ve mecaz iki anlamın birlikte mümkün olmasıyla kurulan kinaye başlığı farklı bir ölçüttür. İletişim amacı açık olduğu için söz gerçek bir dakiklik övgüsü diye okunamaz.",
    },
    {
      prompt:
        "“Sözünü tutmayınca arkadaşının gözünden düştü.” cümlesindeki gözünden düşmek söz öbeğinin bağlamdaki karşılığı hangisidir?",
      choices: [
        "Bir göz hizasından fiziksel olarak yere düşmek",
        "Görme yetisini tamamen kaybetmek",
        "Bir yerden aşağıya ip sarkıtmak",
        "Birinin kendisine verdiği değer ve güveni kaybetmek",
        "Bir kitabı yüksek bir raftan indirmek",
      ],
      answer: 3,
      hint: "Sözünü tutmama ile arkadaşın değerlendirmesindeki değişimi bağla.",
      explanation:
        "Gözünden düşmek, birinin verdiği değer ve saygınlığı kaybetmek anlamındaki kalıplaşmış deyimdir. Cümlede sözünü tutmama bu değerlendirme değişiminin nedenidir. Öbeği yalnız göz veya düşmek sözcüğünün tek başına fiziksel anlamından açıklamak bütün bağlamı kaçırır.",
    },
  ],
};

function questionsFor017(id: string): Question[] {
  return questionRows017[id].map((q, i) => ({
    id: `f017-${id}-${i + 1}`,
    ...(q.passage ? { passage: txt(q.passage) } : {}),
    prompt: txt(q.prompt),
    options: q.choices.map(txt),
    answer: q.answer,
    hint: txt(q.hint),
    explanation: txt(q.explanation),
    skill: id,
  }));
}
export const forge017TurkishGuides: LessonGuide[] = [
  repairGuide017,
  meaningGuide017,
];
export const forge017TurkishTopics: Record<string, string> = {
  "anlatim-bozukluklari": "detail-265",
  "sozcukte-anlam": "detail-266",
};
const titles017 = [
  "Anlatım bozuklukları: amacı koruyarak onar",
  "Sözcükte anlam: bağlamı ve ilişkiyi gör",
];
export const forge017TurkishLessons: Lesson[] = forge017TurkishGuides.map(
  (guide, i) => ({
    id: guide.id,
    subjectId: "tyt-turkce",
    title: txt(titles017[i]),
    minutes: guide.minutes,
    objectives: guide.objectives.map(txt),
    body: guide.sections.map((section) => ({
      title: txt(section.title),
      text: txt(section.paragraphs.join("\n\n")),
    })),
    questions: questionsFor017(guide.id),
    source: txt(guide.source),
    tags: ["kaynakli-anlatim", "adim-adim", "dil-bilgisi"],
  }),
);

export interface TurkishFrame017 {
  sentence: string;
  context: string;
  tokens: string[];
  groups: { label: string; members: number[]; joined: boolean }[];
  relations: { from: number; to: number; label: string; ok: boolean }[];
  focus: number;
  decision: string;
  reason: string;
  evidence: string[];
}
export interface TurkishCase017 {
  id: string;
  label: string;
  frames: [TurkishFrame017, TurkishFrame017];
}
// A bounded authored corpus: intended meanings are explicit; no arbitrary-text parser.
const authoredCases017: Record<string, TurkishCase017[]> = {
  "anlatim-bozukluklari": [
    {
      id: "hal",
      label: "Aynı kişi, fiillerin istediği farklı hâl",
      frames: [
        {
          sentence: "Komşumu gördüm ve güvendim.",
          context:
            "Amaç aynı komşuyu görme ve ona güvenme ilişkilerini açıkça vermektir.",
          tokens: ["Komşumu", "gördüm", "ve", "güvendim."],
          groups: [
            {
              label: "İlk nesne",
              members: [0],
              joined: false,
            },
            {
              label: "İlk yüklem",
              members: [1],
              joined: false,
            },
            {
              label: "Bağlaç",
              members: [2],
              joined: false,
            },
            {
              label: "İkinci yüklem",
              members: [3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Kimi gördüm?",
              ok: true,
            },
            {
              from: 0,
              to: 3,
              label: "Bu biçim kime sorusuna uymaz",
              ok: false,
            },
            {
              from: 1,
              to: 3,
              label: "Bağlı yargı",
              ok: true,
            },
          ],
          focus: 0,
          decision: "Yönelme ögesi eksik",
          reason:
            "Görmek kimi, güvenmek kime sorusunu ister. Aynı komşu olsa da komşumu biçimi güvenme bağına uymaz.",
          evidence: [
            "İlk ilişki: komşumu gördüm.",
            "Açık ikinci ilişki için ona veya komşuma gerekir.",
          ],
        },
        {
          sentence: "Komşumu gördüm ve ona güvendim.",
          context:
            "Aynı komşu iki fiilin istediği ayrı hâllerle açıkça veriliyor.",
          tokens: ["Komşumu", "gördüm", "ve", "ona", "güvendim."],
          groups: [
            {
              label: "İlk nesne",
              members: [0],
              joined: false,
            },
            {
              label: "İlk yüklem",
              members: [1],
              joined: false,
            },
            {
              label: "Bağlaç",
              members: [2],
              joined: false,
            },
            {
              label: "İkinci tamlayıcı",
              members: [3],
              joined: false,
            },
            {
              label: "İkinci yüklem",
              members: [4],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Kimi gördüm?",
              ok: true,
            },
            {
              from: 3,
              to: 4,
              label: "Kime güvendim?",
              ok: true,
            },
            {
              from: 1,
              to: 4,
              label: "Bağlı yargı",
              ok: true,
            },
          ],
          focus: 3,
          decision: "İki hâl ayrı kuruldu",
          reason:
            "Komşumu belirtme, ona yönelme ilişkisidir. İki fiil aynı kişiyi farklı eklerle açıkça alır.",
          evidence: [
            "Kişi değişmedi; yalnız gerekli hâl ayrı yazıldı.",
            "Her ikinci fiilde öge tekrarı zorunlu değildir; burada ekler farklıdır.",
          ],
        },
      ],
    },
    {
      id: "yer",
      label: "Yeni olan yer mi, giriş zamanı mı?",
      frames: [
        {
          sentence: "Yeni atölyeye girdim.",
          context:
            "Amaç yeni açılan atölyeyi değil, girişin az önce olduğunu söylemektir.",
          tokens: ["Yeni", "atölyeye", "girdim."],
          groups: [
            {
              label: "Yer öbeği",
              members: [0, 1],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Atölyeyi niteleme",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "Nereye?",
              ok: true,
            },
          ],
          focus: 0,
          decision: "Yeni, atölyeyi niteler",
          reason:
            "Bu sıra yeni olan atölyeyi anlatabilir; kendi başına bozuk değildir. Verilen amaç ise az önce giriştir.",
          evidence: [
            "Hangi atölye? Yeni atölye.",
            "Bu örnekte sözün bağı ile istenen anlam farklıdır.",
          ],
        },
        {
          sentence: "Atölyeye yeni girdim.",
          context: "Amaç aynı: girişin az önce olduğu açıkça anlatılacak.",
          tokens: ["Atölyeye", "yeni", "girdim."],
          groups: [
            {
              label: "Yer",
              members: [0],
              joined: false,
            },
            {
              label: "Zaman",
              members: [1],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 2,
              label: "Nereye?",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "Ne zaman?",
              ok: true,
            },
          ],
          focus: 1,
          decision: "Yeni, girişin zamanını belirtir",
          reason:
            "Yeni sözü şimdi girmek eylemine bağlanır. Az önce giriş anlamı korunur; atölyenin yeni olması şart değildir.",
          evidence: [
            "Söz sayısı değişmedi, bağın hedefi değişti.",
            "Amaç yeni atölyeyi anlatmak olsaydı ilk sıra doğru olurdu.",
          ],
        },
      ],
    },
    {
      id: "tekrar",
      label: "Nötr kayıtta aynı bilgi iki kez mi?",
      frames: [
        {
          sentence: "Öyküyü yeniden tekrar okudum.",
          context:
            "Yalnız bir kez daha okuma anlatılıyor; sanatsal vurgu veya iki ayrı tekrar yok.",
          tokens: ["Öyküyü", "yeniden", "tekrar", "okudum."],
          groups: [
            {
              label: "Nesne",
              members: [0],
              joined: false,
            },
            {
              label: "İlk tekrar sözü",
              members: [1],
              joined: false,
            },
            {
              label: "İkinci tekrar sözü",
              members: [2],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 3,
              label: "Neyi?",
              ok: true,
            },
            {
              from: 1,
              to: 3,
              label: "Aynı bilgi yineleniyor",
              ok: false,
            },
            {
              from: 2,
              to: 3,
              label: "Bir kez daha",
              ok: true,
            },
          ],
          focus: 1,
          decision: "İşlevsiz yineleme var",
          reason:
            "Verilen nötr amaçta yeniden ve tekrar aynı katkıyı yapar; biri çıkarılınca tekrar bilgisi kalır.",
          evidence: [
            "İki ayrı okuma aşaması anlatılmıyor.",
            "Başka bir vurgu bağlamında her tekrar otomatik hata değildir.",
          ],
        },
        {
          sentence: "Öyküyü tekrar okudum.",
          context:
            "Aynı nötr kayıt bir kez daha okuma bilgisini kısa biçimde veriyor.",
          tokens: ["Öyküyü", "tekrar", "okudum."],
          groups: [
            {
              label: "Nesne",
              members: [0],
              joined: false,
            },
            {
              label: "Tekrar bilgisi",
              members: [1],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 2,
              label: "Neyi?",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "Bir kez daha",
              ok: true,
            },
          ],
          focus: 1,
          decision: "Tekrar bilgisi korundu",
          reason:
            "Yeniden çıkarıldı; tekrar sözü aynı bir kez daha bilgisini vermeyi sürdürür. Olay veya zaman değişmedi.",
          evidence: [
            "Öykü okuma olayı korunur.",
            "Tekrar çıkarılıp yeniden bırakılması da bu nötr amaçta başka bir onarım olabilir.",
          ],
        },
      ],
    },
    {
      id: "yaklasik",
      label: "Aynı süre: kesin mi, yaklaşık mı?",
      frames: [
        {
          sentence: "İş yaklaşık tam on dakika sürdü.",
          context:
            "Tam süre ölçümü yoktur; amaç on dakika dolayını anlatmaktır.",
          tokens: ["İş", "yaklaşık", "tam", "on dakika", "sürdü."],
          groups: [
            {
              label: "Özne",
              members: [0],
              joined: false,
            },
            {
              label: "Yaklaşık bilgi",
              members: [1],
              joined: false,
            },
            {
              label: "Kesin bilgi",
              members: [2],
              joined: false,
            },
            {
              label: "Süre",
              members: [3],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [4],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 4,
              label: "Özne",
              ok: true,
            },
            {
              from: 1,
              to: 3,
              label: "Yaklaşık değer",
              ok: true,
            },
            {
              from: 2,
              to: 3,
              label: "Aynı süreyi kesin sunar",
              ok: false,
            },
            {
              from: 3,
              to: 4,
              label: "Ne kadar sürdü?",
              ok: true,
            },
          ],
          focus: 2,
          decision: "Kesin ve yaklaşık çatışıyor",
          reason:
            "Aynı süre için yaklaşık ve tam farklı iddialar kurar. Verilen amaç yaklaşık değer olduğu için tam çıkarılır.",
          evidence: [
            "Bu tek sürenin iki ayrı ölçüm aşaması yoktur.",
            "Amaç kesin ölçüm olsaydı başka bir onarım uygun olurdu.",
          ],
        },
        {
          sentence: "İş yaklaşık on dakika sürdü.",
          context: "Aynı amaç korunuyor: süre on dakika dolayındadır.",
          tokens: ["İş", "yaklaşık", "on dakika", "sürdü."],
          groups: [
            {
              label: "Özne",
              members: [0],
              joined: false,
            },
            {
              label: "Yaklaşık bilgi",
              members: [1],
              joined: false,
            },
            {
              label: "Süre",
              members: [2],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 3,
              label: "Özne",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "Yaklaşık değer",
              ok: true,
            },
            {
              from: 2,
              to: 3,
              label: "Ne kadar sürdü?",
              ok: true,
            },
          ],
          focus: 1,
          decision: "Yaklaşık süre korundu",
          reason:
            "Tam çıkarılınca süreyi kesin ölçmüş olma iddiası kalkar; on dakika dolayı bilgisi kalır.",
          evidence: [
            "Yaklaşık sözü bırakıldı.",
            "Amaçlanan belirsizlik düzeyi ve olay aynı kaldı.",
          ],
        },
      ],
    },
    {
      id: "kisi",
      label: "Sen ve ben: grubun kişisi",
      frames: [
        {
          sentence: "Sen ve ben dün geldiniz.",
          context: "Konuşan ve dinleyici aynı geliş olayının iki kişisidir.",
          tokens: ["Sen", "ve", "ben", "dün", "geldiniz."],
          groups: [
            {
              label: "Ortak özne",
              members: [0, 1, 2],
              joined: false,
            },
            {
              label: "Zaman",
              members: [3],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [4],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 4,
              label: "Özne grubu",
              ok: true,
            },
            {
              from: 2,
              to: 4,
              label: "Konuşan da var: biz gerekir",
              ok: false,
            },
            {
              from: 3,
              to: 4,
              label: "Zaman",
              ok: true,
            },
          ],
          focus: 4,
          decision: "Kişi eki gruba uymuyor",
          reason:
            "Ben grupta olduğu için özne biz kişisindedir. Geldiniz ikinci çoğuldur ve bu gruba uymaz.",
          evidence: [
            "Çoğul olmak tek başına yeterli değildir.",
            "Birinci kişi grubun içinde bulunduğu için biz eki gerekir.",
          ],
        },
        {
          sentence: "Sen ve ben dün geldik.",
          context: "Aynı iki kişi ve aynı geçmiş geliş olayı korunuyor.",
          tokens: ["Sen", "ve", "ben", "dün", "geldik."],
          groups: [
            {
              label: "Ortak özne",
              members: [0, 1, 2],
              joined: false,
            },
            {
              label: "Zaman",
              members: [3],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [4],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 4,
              label: "Özne grubu",
              ok: true,
            },
            {
              from: 2,
              to: 4,
              label: "Birinci çoğul kişi",
              ok: true,
            },
            {
              from: 3,
              to: 4,
              label: "Zaman",
              ok: true,
            },
          ],
          focus: 4,
          decision: "Birinci çoğul kişi uyumlu",
          reason:
            "Geldik birinci çoğul kişidir; konuşanın da katıldığı sen ve ben grubuna uyar.",
          evidence: [
            "Sen ve ben → biz.",
            "Kişiler, olay ve dün zamanı değişmedi.",
          ],
        },
      ],
    },
    {
      id: "ekfiil",
      label: "İlk olumlu geçmişi ayrı kapat",
      frames: [
        {
          sentence: "Konusu ilginç, dili sade değildi.",
          context:
            "Amaç geçmişte konuyu olumlu ilginç, dili ise olumsuz sade değil diye anlatmaktır.",
          tokens: ["Konusu", "ilginç,", "dili", "sade değildi."],
          groups: [
            {
              label: "İlk yargı",
              members: [0, 1],
              joined: false,
            },
            {
              label: "İkinci yargı",
              members: [2, 3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Konu yargısı",
              ok: true,
            },
            {
              from: 2,
              to: 3,
              label: "Dil yargısı",
              ok: true,
            },
            {
              from: 1,
              to: 3,
              label: "İlk geçmiş ayrı açık değil",
              ok: false,
            },
          ],
          focus: 1,
          decision: "İlk geçmiş yargı açık değil",
          reason:
            "İlk yargının olumlu geçmişi ayrı kapanmadı. Verilen amaçta ikinci olumsuzluk ilk niteliğe yayılmamalı.",
          evidence: [
            "İstenen ilk bilgi: konu ilginçti.",
            "İstenen ikinci bilgi: dil sade değildi.",
          ],
        },
        {
          sentence: "Konusu ilginçti, dili sade değildi.",
          context:
            "Aynı amaçta ilk olumlu geçmiş ve ikinci olumsuz geçmiş ayrı veriliyor.",
          tokens: ["Konusu", "ilginçti,", "dili", "sade değildi."],
          groups: [
            {
              label: "Olumlu geçmiş",
              members: [0, 1],
              joined: false,
            },
            {
              label: "Olumsuz geçmiş",
              members: [2, 3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Olumlu konu yargısı",
              ok: true,
            },
            {
              from: 2,
              to: 3,
              label: "Olumsuz dil yargısı",
              ok: true,
            },
            {
              from: 1,
              to: 3,
              label: "İki ayrı kapsam",
              ok: true,
            },
          ],
          focus: 1,
          decision: "İlk olumlu geçmiş ayrı",
          reason:
            "İlginçti kendi olumlu geçmişini taşır; sade değildi ikinci olumsuz yargıdır. İki kapsam açıktır.",
          evidence: [
            "Olumsuzluk yalnız ikinci niteliğe gider.",
            "Her ortak ek fiil kullanımı hata değildir; burada iki farklı kapsam açıklığa kavuştu.",
          ],
        },
      ],
    },
    {
      id: "ortak",
      label: "Ortak nesne ne zaman yeter?",
      frames: [
        {
          sentence: "Dosyayı açtı ve kapattı.",
          context:
            "Aynı dosya iki işlemin de belirtme nesnesidir; başka bir dosya yoktur.",
          tokens: ["Dosyayı", "açtı", "ve", "kapattı."],
          groups: [
            {
              label: "Ortak nesne",
              members: [0],
              joined: false,
            },
            {
              label: "İlk fiil",
              members: [1],
              joined: false,
            },
            {
              label: "Bağlaç",
              members: [2],
              joined: false,
            },
            {
              label: "İkinci fiil",
              members: [3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Neyi açtı?",
              ok: true,
            },
            {
              from: 0,
              to: 3,
              label: "Neyi kapattı?",
              ok: true,
            },
            {
              from: 1,
              to: 3,
              label: "İki fiil",
              ok: true,
            },
          ],
          focus: 0,
          decision: "Ortak belirtme yeterli",
          reason:
            "Açmak ve kapatmak aynı dosyayı ögesini uygun biçimde paylaşır. İkinci kez dosyayı yazmak şart değildir.",
          evidence: [
            "Her iki fiil neyi sorusunu alır.",
            "Her örtük öge eksik sayılmaz.",
          ],
        },
        {
          sentence: "Dosyayı okudu ve ona güvendi.",
          context:
            "Aynı dosyanın içeriğini okuma ve ona güvenme iki farklı hâlle açıkça veriliyor.",
          tokens: ["Dosyayı", "okudu", "ve", "ona", "güvendi."],
          groups: [
            {
              label: "Belirtme nesnesi",
              members: [0],
              joined: false,
            },
            {
              label: "İlk fiil",
              members: [1],
              joined: false,
            },
            {
              label: "Bağlaç",
              members: [2],
              joined: false,
            },
            {
              label: "Yönelme",
              members: [3],
              joined: false,
            },
            {
              label: "İkinci fiil",
              members: [4],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Neyi okudu?",
              ok: true,
            },
            {
              from: 3,
              to: 4,
              label: "Neye güvendi?",
              ok: true,
            },
            {
              from: 1,
              to: 4,
              label: "İki fiil",
              ok: true,
            },
          ],
          focus: 3,
          decision: "Yeni fiil ayrı hâl ister",
          reason:
            "Okumak belirtme, güvenmek yönelme ister. Ona, dosyaya giden bu ikinci bağı açıkça kurar.",
          evidence: [
            "İlk örnekte iki fiil aynı hâli paylaşır.",
            "Bu örnekte ikinci fiil değiştiği için gereken ek de farklıdır.",
          ],
        },
      ],
    },
    {
      id: "masal",
      label: "Masal: iki çekim de mümkün",
      frames: [
        {
          sentence: "Yaşlı ağaçlar gece konuştu.",
          context:
            "Bu bir masaldır; ağaçlara insanlar gibi konuşma ve duygu verilmiştir.",
          tokens: ["Yaşlı ağaçlar", "gece", "konuştu."],
          groups: [
            {
              label: "Kişileşen özne",
              members: [0],
              joined: false,
            },
            {
              label: "Zaman",
              members: [1],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 2,
              label: "Kişileştirme",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "Zaman",
              ok: true,
            },
          ],
          focus: 2,
          decision: "Bu örnekte tekil yüklem",
          reason:
            "Konuştu tekil çekimdir. Açık kişileştirme bağlamında bu tekil biçim de mümkündür.",
          evidence: [
            "Ağaçlara insan davranışı verilmiştir.",
            "Bu bağlam, nötr insan dışı çoğul kuralının istisnasıdır.",
          ],
        },
        {
          sentence: "Yaşlı ağaçlar gece konuştular.",
          context:
            "Aynı masal ve aynı kişileştirme korunuyor; yalnız yüklemin çoğul biçimi seçildi.",
          tokens: ["Yaşlı ağaçlar", "gece", "konuştular."],
          groups: [
            {
              label: "Kişileşen özne",
              members: [0],
              joined: false,
            },
            {
              label: "Zaman",
              members: [1],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 2,
              label: "Kişileştirme",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "Zaman",
              ok: true,
            },
          ],
          focus: 2,
          decision: "Bu örnekte çoğul yüklem",
          reason:
            "Konuştular çoğul çekimdir. Kişileştirme açık olduğu için bu biçim de otomatik yanlış sayılmaz.",
          evidence: [
            "İki cümlede de ağaçlar masalda insan gibi davranır.",
            "Bu istisna bütün insan dışı çoğullara koşulsuz yayılmaz.",
          ],
        },
      ],
    },
  ],
  "sozcukte-anlam": [
    {
      id: "soguk",
      label: "Soğuk: fiziksel sıcaklık ve tavır",
      frames: [
        {
          sentence: "Soğuk suyu bardağa döktü.",
          context: "Suyun sıcaklığı anlatılıyor; insan davranışı değil.",
          tokens: ["Soğuk", "suyu", "bardağa", "döktü."],
          groups: [
            {
              label: "Nesne öbeği",
              members: [0, 1],
              joined: false,
            },
            {
              label: "Yer",
              members: [2],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Fiziksel sıcaklık",
              ok: true,
            },
            {
              from: 1,
              to: 3,
              label: "Nesne",
              ok: true,
            },
            {
              from: 2,
              to: 3,
              label: "Yer",
              ok: true,
            },
          ],
          focus: 0,
          decision: "Gerçek sıcaklık",
          reason:
            "Soğuk burada suyun fiziksel sıcaklığıyla ilgilidir. Bu özellik duyu ve ölçümle ilgili gerçek kullanımdır.",
          evidence: [
            "Soğuk hangi varlığı niteler? Suyu.",
            "Mesafeli davranış anlamı bu cümlede yoktur.",
          ],
        },
        {
          sentence: "Soğuk bir karşılama yaptı.",
          context:
            "Kişi ilgisiz ve mesafeli karşılanıyor; ortamın sıcaklığı anlatılmıyor.",
          tokens: ["Soğuk", "bir karşılama", "yaptı."],
          groups: [
            {
              label: "Davranış öbeği",
              members: [0, 1],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Mesafeli tavır",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "Davranış",
              ok: true,
            },
          ],
          focus: 0,
          decision: "Mecazlı tavır",
          reason:
            "Soğuk, ilgisiz ve mesafeli tavrı anlatır. Bu tavrın termometre ile ölçülen sıcaklığı yoktur.",
          evidence: [
            "Soğuk → mesafeli, ilgisiz.",
            "Fiziksel özellik bir insan ilişkisine taşınmıştır.",
          ],
        },
      ],
    },
    {
      id: "agir",
      label: "Ağır: karşıtı hangi boyutta?",
      frames: [
        {
          sentence: "Ağır sandığı kaldırdı.",
          context: "Sandığın taşınan yükü ve ağırlığı söz konusudur.",
          tokens: ["Ağır", "sandığı", "kaldırdı."],
          groups: [
            {
              label: "Yük öbeği",
              members: [0, 1],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Kütle/ağırlık",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "Taşınan",
              ok: true,
            },
          ],
          focus: 0,
          decision: "Bu bağlamda karşıtı hafif",
          reason:
            "Ağır sandıkta kütle ve taşınan yük öne çıkar. Aynı boyuttaki karşıt hafif sandıktır.",
          evidence: [
            "Hafif sandığı kaldırdı aynı boyutta karşıt kurar.",
            "İlerleme hızı bu örnekte sorulmuyor.",
          ],
        },
        {
          sentence: "Kafile ağır ilerledi.",
          context:
            "Kafilenin yavaş ilerlediği anlatılıyor; taşınan yükün kilosu belli değil.",
          tokens: ["Kafile", "ağır", "ilerledi."],
          groups: [
            {
              label: "Özne",
              members: [0],
              joined: false,
            },
            {
              label: "Hız",
              members: [1],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 2,
              label: "Özne",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "İlerleme hızı",
              ok: true,
            },
          ],
          focus: 1,
          decision: "Bu bağlamda karşıtı hızlı",
          reason:
            "Ağır burada yavaş demektir. Hızlı ilerlemek karşıtlığı bu hız boyutunu korur.",
          evidence: [
            "Kafile hafif ilerledi, hız karşıtını açık vermez.",
            "Aynı sözcüğün karşıtı yeni bağlama göre seçilir.",
          ],
        },
      ],
    },
    {
      id: "taban",
      label: "Taban: gündelik parça ve alan terimi",
      frames: [
        {
          sentence: "Botun tabanı aşındı.",
          context:
            "Günlük bir eşyanın alttaki parçası anlatılıyor; geometri tanımı yapılmıyor.",
          tokens: ["Botun", "tabanı", "aşındı."],
          groups: [
            {
              label: "Eşya parçası",
              members: [0, 1],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Parça ilişkisi",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "Aşınan parça",
              ok: true,
            },
          ],
          focus: 1,
          decision: "Günlük eşya parçası",
          reason:
            "Taban bu botun alt parçasını anlatır. Bu cümle özel bir geometri kavramını tanımlamaz.",
          evidence: [
            "Alan ve özel kavram birlikte sorulmalıdır.",
            "Sözcüğün başka yerde terim olması bu günlük bağlamı değiştirmez.",
          ],
        },
        {
          sentence: "Üçgenin tabanını ölçtü.",
          context:
            "Geometri dersinde üçgenin taban olarak seçilmiş kenarı ölçülüyor.",
          tokens: ["Üçgenin", "tabanını", "ölçtü."],
          groups: [
            {
              label: "Geometri kavramı",
              members: [0, 1],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Geometri alanı",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "Ölçülen kenar",
              ok: true,
            },
          ],
          focus: 1,
          decision: "Geometriye özgü terim",
          reason:
            "Taban burada geometrinin özel bir kavramını karşılar. Terim oluşu alanla ve seçilen kavramla kanıtlanır.",
          evidence: [
            "Geometri dersinde taban olan kenar açıkça verilmiştir.",
            "Terim olmak, nicel veya somutlukla aynı tek eksen değildir.",
          ],
        },
      ],
    },
    {
      id: "derin",
      label: "Derin: metreyle boyut ve duygu niteliği",
      frames: [
        {
          sentence: "Kuyu on metre derindi.",
          context: "Kuyunun fiziksel derinliği metreyle ölçülmüştür.",
          tokens: ["Kuyu", "on metre", "derindi."],
          groups: [
            {
              label: "Varlık",
              members: [0],
              joined: false,
            },
            {
              label: "Açık ölçü",
              members: [1],
              joined: false,
            },
            {
              label: "Özellik",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 1,
              to: 2,
              label: "Metreyle ölçü",
              ok: true,
            },
            {
              from: 2,
              to: 0,
              label: "Kuyunun boyutu",
              ok: true,
            },
          ],
          focus: 2,
          decision: "Ölçülen boyut: nicel",
          reason:
            "Kuyu derinliği standart uzunluk birimiyle ölçülür; bu bağlam nicel bir boyut verir.",
          evidence: [
            "Ölçü: on metre.",
            "Sayı bulunması bütün cümle sözlerini nicel yapmaz.",
          ],
        },
        {
          sentence: "Derin bir üzüntü duydu.",
          context: "Fiziksel bir çukur değil, yoğun bir duygu anlatılıyor.",
          tokens: ["Derin", "bir üzüntü", "duydu."],
          groups: [
            {
              label: "Duygu öbeği",
              members: [0, 1],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Duygu niteliği",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "Hissedilen",
              ok: true,
            },
          ],
          focus: 0,
          decision: "Duygu niteliği: nitel",
          reason:
            "Derin üzüntü yoğun duyguyu anlatır; metreyle ölçülen bir çukur yoktur. Bu kullanım nitel ve mecazlıdır.",
          evidence: [
            "Duygunun çok olması ona fiziksel ölçü birimi vermez.",
            "Hedef sözcüğün bu cümledeki anlamı seçilir.",
          ],
        },
      ],
    },
    {
      id: "kapsam",
      label: "Genel ve özel: kapsama yönü",
      frames: [
        {
          sentence: "Kuşlar denince serçe ve güvercin de kapsama girer.",
          context:
            "Yalnız örnek iki kuş türü gösteriliyor; bütün türler listelenmiş değildir.",
          tokens: ["Kuşlar", "serçe", "güvercin", "kapsama girer."],
          groups: [
            {
              label: "Üst kapsam",
              members: [0],
              joined: false,
            },
            {
              label: "Örnek alt türler",
              members: [1, 2],
              joined: false,
            },
            {
              label: "İlişki",
              members: [3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Örnek tür",
              ok: true,
            },
            {
              from: 0,
              to: 2,
              label: "Örnek tür",
              ok: true,
            },
          ],
          focus: 0,
          decision: "Kuş daha genel kapsamlı",
          reason:
            "Kuş, serçe ve güvercin türlerini de kapsayan daha geniş addır. Buradaki iki örnek bütün kuş türleri değildir.",
          evidence: ["Kuş → serçe.", "Kuş → güvercin."],
        },
        {
          sentence: "Serçe, kuşların bir türüdür.",
          context:
            "Bu kez aynı ilişki bir alt türden üst sınıfa doğru açıklanıyor.",
          tokens: ["Serçe,", "kuşların", "bir türüdür."],
          groups: [
            {
              label: "Alt tür",
              members: [0],
              joined: false,
            },
            {
              label: "Üst sınıf",
              members: [1],
              joined: false,
            },
            {
              label: "İlişki",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Alt türden üst sınıfa",
              ok: true,
            },
          ],
          focus: 0,
          decision: "Serçe daha özel kapsamlı",
          reason:
            "Serçe bu örnekte kuştan daha dar bir gruptur. Özel anlam bir kişi adı gibi özel ad demek değildir.",
          evidence: [
            "Serçe → kuş sınıfının bir üyesi.",
            "Kuş da hayvana göre daha dar kapsamlı olabilir.",
          ],
        },
      ],
    },
    {
      id: "cay",
      label: "Çay: aynı biçimde iki farklı ad",
      frames: [
        {
          sentence: "Demlediği çayı içti.",
          context: "Bir fincana konan içecek çaydan söz ediliyor.",
          tokens: ["Demlediği", "çayı", "içti."],
          groups: [
            {
              label: "İçecek öbeği",
              members: [0, 1],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "İçecek hazırlama",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "İçilen",
              ok: true,
            },
          ],
          focus: 1,
          decision: "İçecek adı çay",
          reason:
            "Çay bu cümlede demlenip içilen içeceğin adıdır. Diğer çay örneğinde akarsu adı bulunacaktır.",
          evidence: [
            "Bu kullanımın nesnesi içecektir.",
            "Bu okul örneğinde içecek ve akarsu adları sesteş olarak ayrılır.",
          ],
        },
        {
          sentence: "Köydeki çay denize akıyor.",
          context: "Küçük akarsu çay söz konusudur; içecek anlatılmıyor.",
          tokens: ["Köydeki", "çay", "denize", "akıyor."],
          groups: [
            {
              label: "Akarsu öbeği",
              members: [0, 1],
              joined: false,
            },
            {
              label: "Yön",
              members: [2],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Yerle belirlenen akarsu",
              ok: true,
            },
            {
              from: 1,
              to: 3,
              label: "Akan su",
              ok: true,
            },
            {
              from: 2,
              to: 3,
              label: "Yön",
              ok: true,
            },
          ],
          focus: 1,
          decision: "Akarsu adı çay",
          reason:
            "Çay burada küçük akarsunun adıdır. İçecek adıyla aynı biçimde söylenir ama başka anlam alanını karşılar.",
          evidence: [
            "İçilen çay ile akarsu bu okul örneğinde sesteştir.",
            "Her çok anlamlı kullanım otomatik ayrı sesteş değildir.",
          ],
        },
      ],
    },
    {
      id: "tatli",
      label: "Tatlı: tatma ve işitme alanı",
      frames: [
        {
          sentence: "Tatlı elmayı yedi.",
          context: "Elmanın hoş ve şekerli tadı anlatılıyor.",
          tokens: ["Tatlı", "elmayı", "yedi."],
          groups: [
            {
              label: "Tat özelliği",
              members: [0, 1],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Tat alma",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "Yenen",
              ok: true,
            },
          ],
          focus: 0,
          decision: "Tat alma alanında gerçek",
          reason:
            "Tatlı, elmanın tadını doğrudan anlatır; bu bağlamda başka duyunun nesnesine aktarım yoktur.",
          evidence: [
            "Özellik tatma alanındadır.",
            "Elma gerçekten yenilen varlıktır.",
          ],
        },
        {
          sentence: "Tatlı sesi dinledi.",
          context:
            "Hoş gelen işitme deneyimi anlatılıyor; sesin yenilip tadıldığı söylenmiyor.",
          tokens: ["Tatlı", "sesi", "dinledi."],
          groups: [
            {
              label: "İşitme özelliği",
              members: [0, 1],
              joined: false,
            },
            {
              label: "Yüklem",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Tatma → işitme",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "İşitilen",
              ok: true,
            },
          ],
          focus: 0,
          decision: "Tatmadan işitmeye aktarım",
          reason:
            "Tatlı özelliği sesin hoşluğuna taşınır. Kaynak duyu tatma, hedef duyu işitmedir.",
          evidence: [
            "Tatlı ses fiziksel bir yiyecek değildir.",
            "Bu yön doğa–insan ayrımından farklı bir duyu aktarımıdır.",
          ],
        },
      ],
    },
    {
      id: "yon",
      label: "Aktarımın kaynağı ve hedefi",
      frames: [
        {
          sentence: "Kaptan öfkeyle esip gürledi.",
          context:
            "Bir insanın öfkeli davranışı fırtına eylemleriyle anlatılıyor.",
          tokens: ["Kaptan", "öfkeyle", "esip gürledi."],
          groups: [
            {
              label: "İnsan hedef",
              members: [0],
              joined: false,
            },
            {
              label: "Duygu",
              members: [1],
              joined: false,
            },
            {
              label: "Doğa eylemi",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 2,
              to: 0,
              label: "Doğa → insan",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "Öfkeli davranış",
              ok: true,
            },
          ],
          focus: 2,
          decision: "Doğadan insana aktarım",
          reason:
            "Esip gürlemek doğadaki fırtınayı çağrıştırır; burada kaptanın öfkesine taşınmıştır.",
          evidence: [
            "Kaynak özellik: doğa eylemi.",
            "Yeni hedef: insan kaptan.",
          ],
        },
        {
          sentence: "Ağaç sabah ışığında gülümsedi.",
          context: "Bir masalda ağaca insanın gülümseme davranışı veriliyor.",
          tokens: ["Ağaç", "sabah ışığında", "gülümsedi."],
          groups: [
            {
              label: "Doğa hedef",
              members: [0],
              joined: false,
            },
            {
              label: "Bağlam",
              members: [1],
              joined: false,
            },
            {
              label: "İnsan davranışı",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 2,
              to: 0,
              label: "İnsan → doğa",
              ok: true,
            },
            {
              from: 1,
              to: 2,
              label: "Zaman ve ortam",
              ok: true,
            },
          ],
          focus: 2,
          decision: "İnsandan doğaya aktarım",
          reason:
            "Bu gülüş insana aittir; ağaca verilince yön insandan doğayadır.",
          evidence: [
            "Kaynak özellik: insan davranışı.",
            "Yeni hedef: ağaç. Başlık ve örneğin yönünü ters çevirme.",
          ],
        },
      ],
    },
  ],
};
export function turkishCases017(lessonId: string): readonly TurkishCase017[] {
  const cases = authoredCases017[lessonId];
  if (!cases)
    throw new RangeError("Bu model için hazırlanmış bir ünite seçilmeli.");
  return cases;
}
export function buildTurkishScene017(
  lessonId: string,
  caseId: string,
  changed: boolean,
  selected?: number,
) {
  const pair = turkishCases017(lessonId).find((item) => item.id === caseId);
  if (!pair)
    throw new RangeError("Bu ünitede hazırlanmış bir cümle çifti seçilmeli.");
  if (typeof changed !== "boolean")
    throw new RangeError("Cümle dönüşümü açık veya kapalı olmalı.");
  const frame = pair.frames[changed ? 1 : 0],
    index = selected ?? frame.focus;
  if (!Number.isInteger(index) || index < 0 || index >= frame.tokens.length)
    throw new RangeError("Cümlede bulunan bir parça seçilmeli.");
  return {
    ...frame,
    selected: index,
    target: frame.tokens[index],
    options: [...new Set(pair.frames.map((item) => item.decision))],
    words: frame.groups.map((group) => ({
      ...group,
      text: group.members
        .map((i) => frame.tokens[i])
        .join(group.joined ? "" : " "),
    })),
  };
}
export const turkishExplorationDefaults017 = {
  pair: "hal",
  changed: false,
  selected: -1,
  guess: "",
  reason: "",
  show: false,
  compared: false,
};
