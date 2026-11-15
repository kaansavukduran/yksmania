import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

export const spellingGuide016: LessonGuide = {
  id: "yazim-kurallari",
  minutes: 100,
  objectives: [
    "Anlam, sözcük görevi ve yazım sınırını birlikte kanıtla.",
    "Büyük harf, sayı, kısaltma ve eklerin koşullarını karşılaştır.",
    "Birleşik sözlerde ses, anlam ve gelenek ölçütlerinin sınırını açıkla.",
    "Kuralı istisnasıyla kullan; tam cümlede bağımsız bir düzeltme yap.",
  ],
  sections: [
    {
      title: "Yazım kararı: önce anlam, sonra biçim",
      paragraphs: [
        "Yazım, duyulan sesleri rastgele yan yana getirmek değildir; sözcüklerin cümledeki görevi, adlandırdığı anlam ve yerleşmiş biçimi birlikte değerlendirilir. “Bahçede bekledi.” yer bildirir; “Bahçe de yenilendi.” sözü başka bir varlığın yanına bahçeyi ekler. Aynı de sesi, birinde ek birinde bağlaçtır. Kararı vermeden önce cümlenin ne anlattığını kendi sözlerinle açıkla.",
        "Çözüm sırasını üç basamakta kur: önce tam cümleyi oku, sonra tartışılan parçanın ek mi bağımsız söz mü olduğunu belirle, en son ilgili yazım kuralını uygula. Birleşik kelimelerde gelenekleşmiş biçim de devreye girebilir. Tek bir silme denemesi, hece sayısı veya anlamca yakınlık bütün Türkçe için kusursuz bir karar makinesi değildir; bu model yalnız hazırlanmış bağlamları karşılaştırır.",
      ],
    },
    {
      title: "Cümle, dize, alıntı ve ara açıklama",
      paragraphs: [
        "Normal yazıda cümle büyük harfle başlar; şiirde dizeler de bu kurala göre yazılır. Bir cümle içinde tırnak veya yay ayraçla verilen bağımsız tam cümle kendi büyük harfi ve son işaretini taşır: “Kapı açıktı (Görevli erken gelmişti.) ama içerisi sessizdi.” Açıklayıcı bir söz öbeği ise sırf ayraç içinde diye bağımsız cümleye dönüşmez.",
        "İki noktadan sonra tam cümle geliyorsa büyük harfle başla: “Şunu fark ettim: Planı yenilemeliyim.” Örnek listesinde ise özel ad yoksa küçük harf kullan: “Çantada üç şey vardı: kalem, defter, cetvel.” İki kısa çizgi arasındaki ara açıklamayı bağımsız yeni cümle sanıp her defasında büyük başlatma. Rakamla başlayan cümlede de sonraki genel sözcük kendiliğinden büyük olmaz: “2027 yılında yeni bir dönem başlayacak.”",
      ],
    },
    {
      title: "Kişi adı, unvan, akrabalık ve hitap",
      paragraphs: [
        "Kişi adları, soyadları ve takma adlar özel addır. Kişi adına bağlı unvan, saygı sözü, rütbe veya lakap da büyük başlar: “Doktor Ece Hanım konuştu.” Cümlede belirli bir kişinin adının yerine geçen makam sözü de bu özel gönderimle büyük olabilir. Sadece genel mesleği anlatan “bir doktor” ile adı karşılayan kullanımı birbirine eşitleme.",
        "Akrabalık bildiren “Ece teyzem” sözünde teyze küçük harflidir; yerleşmiş lakap veya unvanın parçası olduğunda “Nene Hatun” gibi büyük yazılır. Mektup ve resmî yazışmadaki “Sayın Başkan,” ya da “Sevgili Kardeşim,” hitaplarının biçimi de bağlamla belirlenir. Bir örnekte görülen büyük harfi bütün akrabalık ve meslek adlarına taşımak yerine hangi sözcüğün hangi kişiyi özel olarak adlandırdığını göster.",
      ],
    },
    {
      title: "Millet, dil, din ve türleşen özel ad",
      paragraphs: [
        "Millet, boy, devlet, dil, lehçe, din ve mezhep adları ile bunlara bağlı özel mensubiyet adları büyük harfle başlar: Türk, Kazak, Türkiye Cumhuriyeti, Türkçe, Müslümanlık gibi. Din ve mitolojideki belirli özel adlar da aynı kapsamdadır. Fakat bir sözcüğün özel adla aynı sesleri taşıması, her yeni kullanımda özel ad olduğu anlamına gelmez.",
        "Özel addan türeyen “Türkçe” veya “Avrupalı” büyük harfi korurken, özel anlamını kaybedip birim veya tür adı olmuş “amper” gibi sözcükler küçük yazılır. Para birimleri de lira, avro biçiminde küçüktür. Bir kişi yerine kullanılan “o” zamirini sırf saygı veya gönderim var diye cümle ortasında büyük yazma. Önce kullanımın özel ad mı genel kavram mı olduğunu kanıtla.",
      ],
    },
    {
      title: "Dünya, yön ve kültür: aynı sözün iki anlamı",
      paragraphs: [
        "Gezegen ve yıldızların özel adları büyük harfle başlar. “Dünya Güneş çevresinde dolanır.” astronomik varlıkları adlandırırken “Bu haber dünyamı değiştirdi.” cümlesinde dünya mecazlı genel anlamdadır. Ay, güneş ve dünya sözleri için yalnız sözcüğün kendisini görmek yetmez; gerçekten gök cisminin özel adının kullanılıp kullanılmadığını oku.",
        "Doğu ve Batı belirli düşünce, kültür veya uygarlık alanını karşıladığında büyük; yalnız coğrafi yön bildirirken küçük yazılır: “Batı düşüncesi” ile “köyün batısı” farklıdır. “Kuzeydoğu” ara yön olarak tek sözcüktür; “Kuzeydoğu Anadolu” gibi özel bölge adında büyük başlar. Başlangıç konumu nedeniyle büyük yazılan bir yönü, bütün bağlamlarda özel ad sanma.",
      ],
    },
    {
      title: "Yer, yapı, kurum ve eser adlarının sınırı",
      paragraphs: [
        "Yer adları ve adın parçası olan tür sözleri büyük yazılır: “Ağrı Dağı”, “Fırat Nehri”, “Zafer Meydanı”. Buna karşılık özel ada dâhil olmayıp açıklayıcı tamlama kuran “Konya ili”, “Taflan köyü” gibi kullanımlarda ikinci söz küçüktür. Saray, köprü, cadde ve sokak adlarında da tam özel adın sınırını bilmek gerekir; her tür sözüne aynı işlem uygulanmaz.",
        "Kurum, kanun, eser ve toplantı adlarının anlamlı sözcükleri büyük başlar. “Bilim ve Sanat Kulübü” sözündeki ve bağlacı normal başlık yazımında küçük kalır; adın bütünü büyük harfle dizildiğinde bağlaç da büyük yazılır. “Türk Dili dergisi” örneğinde dergisi genel tür sözüdür; adın kendisi değildir. Yazımı denetlerken resmî özel adın nerede başlayıp bittiğini işaretle.",
      ],
    },
    {
      title: "Tarih, genel gün, tabela ve başlık",
      paragraphs: [
        "Belirli tarih bildiren ay ve gün adları büyük harfle başlar: “12 Mayıs 2027” bir tarihtir; “her mayıs” ise genel zamandır. “Toplantı pazartesi yapılır.” cümlesi düzenli gün adını kullanır; belirli tarihe bağlı gün adı başka bir koşuldur. Rakamların bulunması tek başına yeterli değildir; verilen dizinin gerçekten takvim tarihi olup olmadığına bak.",
        "Tabela ve levha niteliğindeki “Giriş”, “Müdür”, “Otobüs Durağı” gibi yazılar büyük başlayabilir. Kitap veya makale ana başlıkları ile alt başlıkların dizilişi de kendi düzenine sahiptir. Resim ve tablo açıklaması büyük başlar; açıklama tam cümle değilse sonuna zorunlu nokta koyma. Normal cümle yazımı sorusunda özel bir tümü büyük harfli afiş düzeni varsayarak kuralları değiştirme.",
      ],
    },
    {
      title: "Sayıları yazıyla ve rakamla gösterme",
      paragraphs: [
        "Sayılar metinde yazıyla verilebilir; birden fazla sözcüklü sayı normal kullanımda ayrı yazılır: “iki yüz otuz dört”. Saat, para tutarı, ölçü ve istatistikte rakam kullanımı yaygındır; büyük sayılarda “3 milyon” gibi karma gösterimler okumayı kolaylaştırır. Bu kurallar metin türüyle bağlantılıdır; konuşmada bir sayının tek anlam taşıması bütün sözcüklerinin bitişmesini gerektirmez.",
        "Senet, çek gibi para işlemi belgelerinde yazıyla verilen tutarların bitişik yazılması ayrı bir güvenlik geleneğidir; bu istisnayı sıradan bir anlatıya yayma. Dört ve daha çok basamaklı sayılar normal sayı yazımında sağdan üçlü gruplarla noktayla ayrılabilir; kesir bölümü virgülle gösterilir. Yüzde ve binde işareti sayıya bitişir: %25 ve ‰5. Bir kimlik veya kodu ise otomatik olarak nicelik gibi gruplama.",
      ],
    },
    {
      title: "Sıra, üleştirme, Romen rakamı ve kesir",
      paragraphs: [
        "Sıra sayısı rakamdan sonra noktayla ya da kesme ve ekle gösterilir: “8.” veya “8’inci”. “8.’inci” yazımında iki gösterim üst üste bindirilmiştir. Üleştirme ise “sekizer”, “ikişer” gibi yazıyla verilir; “8’er” normal kuralın karşılığı değildir. Sıra bildirmekle bir topluluğu eş paylara ayırmak farklı anlam işlemleridir.",
        "Romen rakamları yüzyıl, hükümdar, tarihî olay ve cilt gibi uygun adlandırmalarda kullanılabilir: “XX. yüzyıl”, “III. cilt”. Tarihte ay rakamıyla da gösterilebilir; ay yazıyla yazıldığında gün ve yıl arasına ayrıca nokta koyma. Bayağı kesre ek getirirken alttaki sayının okunuşu esas alınır: “1/2’si” bir bölü ikisi diye okunur. Son ek kararını son görülen rakamın yazılışına değil okunuşa bağla.",
      ],
    },
    {
      title: "Kısaltmayı nasıl okuyorsun?",
      paragraphs: [
        "Kurum ve ülke adları çoğunlukla büyük harflerden oluşan kısaltmalarla gösterilir. Harf harf okunan TDK gibi bir kısaltmanın eki son harfin adına göre gelir: te-de-ke okunuşundan “TDK’ye”. Tek sözcük gibi okunan NATO ise bütün okunuşuna göre “NATO’dan” olur. İki kısaltmanın tamamı büyük yazılıyor diye eklerini aynı biçimde tahmin etme.",
        "Küçük harfli ölçü kısaltmalarında kelimenin okunuşu belirleyicidir: “cm’yi” santimetreyi, “kg’dan” kilogramdan diye okunur. Uluslararası birim kısaltmalarına gereksiz nokta eklenmez. Sert ünsüzle biten kısaltmanın yazılı harfini ek geldi diye yumuşatma; RTÜK’e biçiminde K korunur. Okuma, yazılı harf ve ek sınırı üç ayrı bilgidir.",
      ],
    },
    {
      title: "Noktalı ve üs işaretli kısaltmaların eki",
      paragraphs: [
        "Prof., Dr. ve benzeri noktalı kısaltmalarda nokta kısaltmanın parçasıdır. Sonunda nokta bulunan kısaltmaya ek getirirken ayrıca kesme kullanılmaz; ek okunuşa uygun olarak noktadan sonra yazılır. “Numara” sözünün No. kısaltmasında da “No.lu” gibi biçimler kelimenin okunuşunu izler. Noktalı ve noktasız iki kısaltmanın sınırını eşitleme.",
        "Üs işaretli birim ve sayı gösterimlerine gelen ek de ayrı kesmeyle bölünmez: “m²ye” metrekareye, “cm³e” santimetreküpe diye okunur. Büyük harfli kısaltmalarda genel olarak nokta kullanılmaz; T.C. ve T. gibi gelenekleşmiş biçimler ayrıca öğrenilir. Her küçük işaretin bir görevi vardır; kısaltma noktası, sıra noktası ve cümle sonu noktasını bağlam içinde ayır.",
      ],
    },
    {
      title: "Da/de: yer eki mi, ekleme bağlacı mı?",
      paragraphs: [
        "Bulunma durum eki -da/-de/-ta/-te sözcüğe bitişir ve cümlede yer, zaman veya başka bir bulunma ilişkisi kurabilir. “Sınıfta bekledi.” ve “Saat üçte geldi.” örneklerinde ek aynı yazım ailesindedir; ikinci örnek yer bildirmese de ek bağlaç olmaz. Ünsüz benzeşmesi ekin biçimini etkiler; sınıf-ta yazımını ayrı bir söz gibi ayırma.",
        "Bağlaç olan da/de ise ayrı yazılır, ünlü uyumuna uyar ama ta/te biçimine dönmez: “Kitap da geldi.” Özel adın ardından geldiğinde de kesmeyle ayırma: “Ece de katıldı.” Bulunma eki olan “Ece’de” başka bir ilişki kurar. Dahi yerine koyma veya sözcüğü silme denemesi yardımcı olabilir; amaçlanan anlam ve tam cümlenin işlevi açıklanmadan tek kesin test diye kullanılmaz.",
      ],
    },
    {
      title: "Ki: niteleme, aidiyet ve cümle bağlantısı",
      paragraphs: [
        "“Evdeki anahtar” sözünde -ki, evde bulunan anahtarı belirleyen ektir ve bitişiktir. “Benimki burada.” sözünde -ki bir adın yerini tutan ilgi zamiridir; yine bitişir. “Biliyorum ki anahtar burada.” cümlesindeki ki ise yargılar arasında bağlantı kuran bağlaçtır ve ayrı yazılır. Niteleyen ad, yerini tuttuğu varlık ve bağlı yargı üç farklı kanıttır.",
        "Bağlaç olan ki’nin kalıplaşıp bitişikleştiği belki, çünkü, hâlbuki, mademki, meğerki, oysaki, sanki ve illaki gibi sözler ayrıca öğrenilir. Bunların varlığı her serbest ki bağlacının bitişmesini gerektirmez. “Ders bitti mi ki?” gibi şüphe veya pekiştirme kullanımlarında da bağlaç ayrıdır. Bir ekin ünlü uyumuna sınırlı katılması, onu kendiliğinden bağımsız bağlaç yapmaz.",
      ],
    },
    {
      title: "Mı/mi: boşluk sabit, görev değişebilir",
      paragraphs: [
        "Soru parçası mı/mi/mu/mü önceki sözcükten ayrı yazılır; biçimi son ünlüye uyar. Ardından gelen kişi veya ek fiil ona bitişir: “Hazır mısın?”, “Gelecek miydi?”, “Okuyor muyuz?” Önceki sözcükle boşluk bulunması, sonraki her eki de ayrı yazmak anlamına gelmez. Birleşik fiilin arasına girebilen “Vaz mı geçtin?” biçiminde de sınırı tam yapıyla birlikte incele.",
        "Mı/mi her kullanımda doğrudan soru kurmaz. “Güzel mi güzel!” pekiştirir; “Yağmur başladı mı içeri gireriz.” zaman/koşul ilişkisi kurar. İki kullanımda da parça ayrı yazılır; son noktalama işaretini temel yargının iletişim amacı belirler. Soru sözcüğü veya mı görmek, bütün cümlenin zorunlu olarak soru işaretiyle bitmesi için yeterli değildir.",
      ],
    },
    {
      title: "İdi, imiş, ise ve iken birleşmesi",
      paragraphs: [
        "Ek fiilin idi, imiş, ise biçimleri ayrı veya önceki söze bitişik yazılabilir: “yorgun idi/yorgundu”, “güzel imiş/güzelmiş”, “gelir ise/gelirse”. Bitişmede başlangıçtaki i düşer ve uygun ses uyumları işler. Ünlüyle biten tabanda y bağlantısı görülür: “hazır değildi” örneğiyle “öğrenci idi/öğrenciydi” örneğinin tabanlarını ayrı çöz.",
        "İken de ayrı ya da bitişik olabilir: “okulda iken/okuldayken”, “geliyor iken/geliyorken”. Bitişik -ken, kalın ünlülü tabana gelse de ince ünlüsünü korur; “okuldaykan” olmaz. Ayrı yazılabilme seçeneği, çekimin veya cümledeki görevin değiştiği anlamına gelmez. Biçim sınırını öğretirken isim yüklemi, birleşik çekimli fiil ve zaman bildiren yan yapı arasındaki farkı koru.",
      ],
    },
    {
      title: "İkileme ile pekiştirmeyi ayır",
      paragraphs: [
        "İkilemeler ayrı yazılır ve aralarına sırf tekrar oldukları için kısa çizgi veya virgül konmaz: “ağır ağır”, “eski püskü”, “bata çıka”. M ile yapılan “kitap mitap”, durum veya iyelik ekli “baş başa”, “günden güne”, “boşu boşuna” biçimleri de bu gruptadır. Yazılışta iki parçanın bulunması, her grubun iki bağımsız cümle olduğu anlamına gelmez.",
        "Pekiştirmeli sıfat ve zarflar ise “sapasağlam”, “dümdüz”, “sırılsıklam” gibi bitişir. “Güzel mi güzel” yapısı pekiştirme anlamı taşısa da mı’nın ayrı yazım kuralını korur; anlamca pekiştirme yapan bütün yapılar tek biçime zorlanmaz. Önce kuruluş tipini belirle, sonra yazımı seç. Ses eklenmesiyle yapılan pekiştirme ile aynı veya yakın sözün tekrarlanması farklıdır.",
      ],
    },
    {
      title: "Ayrı birleşikler: ses ve gerçek anlamı denetle",
      paragraphs: [
        "Etmek, olmak, edilmek gibi yardımcı fiillerle kurulan birleşiklerde ses düşmesi veya türemesi yoksa “not etmek”, “kabul etmek”, “var olmak” gibi ayrı yazım kullanılır. Bir anlam ilişkisi kurmaları tek başına bitişme nedeni değildir. “İş birliği”, “yer çekimi”, “dil bilgisi” gibi birçok terim de anlamca bir bütün olmasına rağmen ayrı yazılır.",
        "Gerçek tür adını koruyan “nar çiçeği”, “bal arısı”, “duvar saati” gibi sözlerle renk, hastalık veya özel nesne adına dönüşmüş kullanımları karşılaştır. Renk tamlamaları ve tonlar “gece mavisi”, “açık mavi”; dış/iç/sıra sözleri “yurt dışı”, “hafta içi”, “yanı sıra” biçimlerinde ayrıdır. Kaynaklar bu başlıklar yanında gelenekleşmiş istisnalar da verir; yalnız ikinci sözcüğe bakıp sınırsız algoritma kurma.",
      ],
    },
    {
      title: "Bitişik birleşikler: değişen ses veya kavram",
      paragraphs: [
        "Birleşmede ses düşmesi ya da türemesi olduğunda “kaybolmak”, “affetmek”, “hissetmek” gibi bitişik biçimler görülür. Tasvir fiilleri de “okuyabilmek”, “gülüvermek”, “uyuyakalmak”, “düşeyazmak” gibi bitişir. Bu örneklerde hangi sesin değiştiğini ve yardımcı yapının ne kattığını göster; sadece uzun sözcük görünümü karar değildir.",
        "İki sözün veya ikinci sözün gerçek anlamından uzaklaşıp başka kavramı karşılaması “narçiçeği” renk adı, “danaburnu” böcek adı, “kedidili” bisküvi adı gibi yerleşik bitişik biçimler kurabilir. “Çalar saat” ayrı iken “cankurtaran” kalıplaşmıştır. Fiilimsi veya çekim eki görüntüsü tek başına ayrı/bitişik kararı verdirmez; sözcükleşmiş adın anlam ve yerleşmiş yazımı denetlenir.",
      ],
    },
    {
      title: "Gelenekleşmiş adlar ve fiziksel alt–üst ayrımı",
      paragraphs: [
        "Baş ile kurulan başhekim, başyazar; yönetici bildiren ustabaşı; ev ile kurulan yayınevi; hane/name/zede ile kurulan dershane, seyahatname, depremzede gibi biçimler kaynakların yerleşik bitişik yazım gruplarıdır. Biraz, birçok, birkaç, birtakım, herhangi, hiçbir de belirsizlik sözleri olarak öğrenilir. Buna karşılık sayı anlamındaki “bir takım formalar” gerçekten bir seti sayar; belirsiz birtakım ile aynı değildir.",
        "Somut yer bildiren “deri altı” ile soyut “bilinçaltı”; fiziksel “masa üstü” ile başka bir kavramı adlandıran bitişik biçimleri anlam üzerinden ayır. Ara yönler bitişir; kişi ve yer adlarında ise tescil ve gelenek devreye girebilir. Tarihsel sözcükler, makam adları ve özel adlarla kurulan bütün örnekleri burada tüketmiş sayılmayız; yeni bir örnekte sözcüğün yerleşik biçimi ile amaçlanan anlamı birlikte doğrulamak gerekir.",
      ],
    },
    {
      title: "Düzeltme işareti ve çok aşamalı denetim",
      paragraphs: [
        "Düzeltme işareti yalnız süs değildir; bazı sözlerde anlam veya söyleyiş ayrımını korur. “Kar” yağış ile “kâr” kazanç; “hala” akraba ile “hâlâ” henüz anlamını ayırır. Bazı alıntı sözlerde ince g/k/l söyleyişi ve nispet ekiyle ilgili kullanımlar da vardır: kâğıt, hikâye, millî gibi biçimleri bağlam ve yerleşik yazımla öğren. Her uzun duyulan ünlüye otomatik işaret ekleme.",
        "Son kontrolde bütün metni yeniden oku: özel adın sınırı, ekin işlevi, gerçek boşluk, sayı/kısaltmanın okunuşu ve birleşiğin anlamı birbirinden ayrı denetlenir. “Evdeki öğrenciler de hazır mısınız?” gibi bir örnekte yalnız yazım değil kişi ve hitap bağlamı da sorgulanabilir; soruda verilen görevin dışına taşmadan kanıtı açıkla. Sözlükte zamanla değişebilen bir biçimle karşılaşırsan yeni örnekteki anlamı ve yerleşik yazımı doğrula; tek sözcükten bütün yazım kurallarına ilişkin sonuç çıkarma.",
      ],
    },
  ],
  examples: [
    {
      title: "Aynı de, değişen ilişki",
      prompt:
        "“Sınıfta bir afiş var.” ve “Sınıf da yenilendi.” cümlelerinde de/ta parçasının görevini ve boşluk sınırını açıkla.",
      strategy:
        "Önce yer ilişkisiyle eklenen varlığı ayır, sonra ses uyumunu denetle.",
      steps: [
        {
          label: "Anlamı belirle",
          explanation:
            "İlk cümlede afişin nerede bulunduğu söylenir; sınıfta, bulunma durumundadır. İkinci cümlede yenilenen şeyler arasına sınıf eklenir.",
        },
        {
          label: "Yapıyı ayır",
          explanation:
            "İlk yapı sınıf-ta tek sözcüktür; ek sert ünsüzden sonra ta olur. İkinci yapı sınıf + da biçiminde iki yazılı sözdür; bağlaç ta olmaz.",
        },
        {
          label: "Yazımı gerekçelendir",
          explanation:
            "Sınıfta bitişik, sınıf da ayrı yazılır. Ayrı da bağlacı için kesme işareti de kullanılmaz.",
        },
      ],
      answer: "Bulunma eki: sınıfta. Ekleme bağlacı: sınıf da.",
      check:
        "Nerede sorusu ilkini, başka hangi varlık sorusu ikincinin ekleme ilişkisini açıklar.",
      pitfall:
        "Her da/de sesini silme denemesiyle veya ünsüz benzeşmesiyle aynı ek sanma.",
    },
    {
      title: "Üç ki, üç ayrı kanıt",
      prompt:
        "“Masadaki kalem benimki. Biliyorum ki onun da bir kalemi var.” cümlelerindeki üç ki biçimini çöz.",
      strategy:
        "Nitelediği adı, yerini tuttuğu varlığı ve bağladığı yargıyı ayrı bul.",
      steps: [
        {
          label: "Niteleme",
          explanation:
            "Masa-da-ki sözü hangi kalem sorusuna cevap verir; -ki ek olarak kalem adını belirler ve bitişir.",
        },
        {
          label: "Aidiyet",
          explanation:
            "Ben-im-ki, benim kalemim anlamındaki varlığın adını karşılar. İlgi zamiri olan -ki de bitişik yazılır.",
        },
        {
          label: "Cümle bağı",
          explanation:
            "Biliyorum ki sözündeki ki yargılar arasında bağ kuran bağımsız bağlaçtır ve ayrı kalır.",
        },
      ],
      answer: "Sıfatlaştıran ek / ilgi zamiri / bağlaç.",
      check:
        "İlkinde kalem açıkça var; ikincide kalem adı yerine konabilir; üçüncüde yeni bir yargı başlar.",
      pitfall:
        "Bütün ki biçimlerini tek görevle veya tek boşluk kuralıyla açıklama.",
    },
    {
      title: "Soru anlamı ile yazım sınırı",
      prompt:
        "“Hazır mıydınız?” ile “Sessiz mi sessiz bir sokaktı.” biçimlerini karşılaştır.",
      strategy:
        "Mı’nın önceki sözle boşluğunu, ardından gelen ekleri ve temel iletişim amacını ayır.",
      steps: [
        {
          label: "Önceki sınır",
          explanation:
            "Mı her iki örnekte de önceki sözcükten ayrı yazılır. Pekiştirme görevi bu boşluğu kaldırmaz.",
        },
        {
          label: "Sonraki ekler",
          explanation:
            "İlk örnekte idi ve ikinci çoğul kişi bağlantısı mı-ydı-nız biçiminde soru parçasına bitişir; hazır mı ydı nız yazılmaz.",
        },
        {
          label: "Anlam",
          explanation:
            "İlk cümle hazır olup olmadıklarını sorar; ikinci cümle sessizliği pekiştiren bir bildirmedir. Son işaret de buna göre seçilir.",
        },
      ],
      answer:
        "Hazır mıydınız? soru; sessiz mi sessiz pekiştirmedir. İkisinde de mı ayrıdır.",
      check:
        "İkinci cümlede cevap beklenmemesine rağmen mı’nın ayrı yazıldığını göster.",
      pitfall: "Mı görülen her cümleyi zorunlu soru cümlesi sayma.",
    },
    {
      title: "Kurumun adı ve kısaltması",
      prompt:
        "TDK harf harf te-de-ke okunuyor. “Türk Dil Kurumu” ve “TDK” sözlerine yönelme eki getir.",
      strategy:
        "Önce açık kurum adının kesme kuralını, sonra kısaltmanın okunuşunu uygula.",
      steps: [
        {
          label: "Açık ad",
          explanation:
            "Kurum adlarına ek kesmeyle ayrılmadan gelir: Türk Dil Kurumuna. Özel adın büyük harfleri korunur.",
        },
        {
          label: "Kısaltma",
          explanation:
            "TDK harf harf okunur; son harf ke olduğundan yönelme eki ye biçimindedir ve kesmeyle ayrılır.",
        },
        {
          label: "Karşılaştır",
          explanation:
            "Türk Dil Kurumuna ve TDK’ye aynı kuruma yönelmeyi anlatır; aynı anlam farklı yazım sınırına engel değildir.",
        },
      ],
      answer: "Türk Dil Kurumuna / TDK’ye.",
      check:
        "Kısaltmanın ekini açık adın son kelimesi kurum üzerinden seçmediğini denetle.",
      pitfall:
        "Her özel adın bütün eklerini otomatik kesmeyle ayırma; kurum istisnasını koru.",
    },
    {
      title: "Çiçek ile renk aynı adlandırma değildir",
      prompt:
        "Bir bitkinin gerçek çiçeği ile kumaşın renk adı anlatılıyor: nar çiçeği / narçiçeği. Bu iki biçimi birer cümlede gerekçelendir.",
      strategy:
        "İkinci sözcüğün gerçek çiçek anlamını koruyup korumadığını oku.",
      steps: [
        {
          label: "Gerçek varlık",
          explanation:
            "“Bahçede nar çiçeği açtı.” cümlesinde gerçekten nar ağacının çiçeği anlatılır; tür sözü anlamını korur ve yapı ayrı yazılır.",
        },
        {
          label: "Yeni kavram",
          explanation:
            "“Narçiçeği bir gömlek seçti.” cümlesinde sözcük renk adıdır; çiçek nesnesi değil, yerleşik yeni kavram anlatılır.",
        },
        {
          label: "Sınır",
          explanation:
            "Bu iki örnekte anlam değişimi yazım farkını açıklar; her birleşiğin yalnız bu ölçütle çözülebileceği sonucu çıkarılmaz.",
        },
      ],
      answer: "Gerçek çiçek: nar çiçeği. Renk: narçiçeği.",
      check:
        "İki cümlede de aynı nesneyi anlattığını varsaymadan renk ve bitki koşulunu yeniden söyle.",
      pitfall:
        "Sadece çiçek kelimesini görüp bütün bitki, renk ve hastalık adlarını ayrı yazma.",
    },
    {
      title: "Kısa duyuruyu çok ölçütle onar",
      prompt:
        "Normal cümle yazımında “Toplantı 12 mayıs 2027’de, saat 14:30’da başlayacak. Öğrenciler 3’er kişilik gruplara ayrılacak; 8.’inci madde okunacak.” duyurusunun işaretlenen dört yazımını düzelt.",
      strategy:
        "Tarih, saat, üleştirme ve sıra sayısını ayrı kurallarla denetle.",
      steps: [
        {
          label: "Tarih ve saat",
          explanation:
            "Belirli tarih içindeki ay adı Mayıs büyük başlar. Normal metindeki saat 14.30’da yazılır; iki nokta süre göstergesinin teknik bağlamıyla karıştırılmaz.",
        },
        {
          label: "Sayı türleri",
          explanation:
            "Paylaştırma anlamındaki üleştirme üçer diye yazıyla verilir. Sıra sayısı 8’inci veya 8. olabilir; nokta ve ek birlikte yığılmaz.",
        },
        {
          label: "Bütün metin",
          explanation:
            "Düzeltmeler 12 Mayıs 2027’de, 14.30’da, üçer ve 8’inci biçimleridir. Dört kararın her biri farklı bir koşula dayanır.",
        },
      ],
      answer: "12 Mayıs 2027’de / 14.30’da / üçer / 8’inci.",
      check:
        "Tarih ayını genel her mayıs ifadesine, üçer kuralını bütün rakam kullanımına yaymadığını denetle.",
      pitfall:
        "Tek bir yazım hatasını bulup metnin diğer bağımsız sınırlarını kontrol etmeden bırakma.",
    },
  ],
  recall: [
    {
      prompt: "Sınıfta ile sınıf da neden farklı boşluk sınırına sahiptir?",
      answer:
        "İlkinde bulunma eki tek sözcüğe katılır; ikincide sınıfı ekleyen bağımsız bağlaç ayrı kalır. Bağlaç ta olmaz ve kesme almaz.",
    },
    {
      prompt:
        "Masadaki, benimki ve biliyorum ki biçimlerinin kanıtını nasıl ayırırsın?",
      answer:
        "İlk ki açık bir adı niteler, ikinci ki adın yerini tutar; ikisi bitişir. Son ki yargıları bağlayan bağlaçtır ve ayrıdır; kalıplaşmış sözler ayrıca öğrenilir.",
    },
    {
      prompt:
        "Güzel mi güzel neden ayrı yazılır ama soru olmak zorunda değildir?",
      answer:
        "Mı/mi’nin önceki sözcükten ayrı yazımı görev değişse de sürer; burada güzelliği pekiştirir. Doğrudan soru anlamını temel iletişim amacı belirler.",
    },
    {
      prompt: "Türk Dil Kurumuna ile TDK’ye arasındaki sınır farkı nedir?",
      answer:
        "Açık kurum adı kesmesiz ek alır; TDK kısaltması kesmeyle ve son harfin ke okunuşuna göre ye ekiyle yazılır.",
    },
    {
      prompt:
        "Her mayıs ile 12 Mayıs 2027; 8. ile 8’inci hangi kararları karşılaştırır?",
      answer:
        "Genel ay küçük, belirli tarih ayı büyüktür. Sıra sayısında nokta veya kesme+ek seçilir; ikisi birlikte kullanılmaz.",
    },
    {
      prompt:
        "Birleşik sözcükler için neden yalnız anlamca bütün olma ölçütü yetmez?",
      answer:
        "Not etmek ve iş birliği de anlam ilişkisi taşır ama ayrıdır. Ses değişimi, anlam değişimi ve gelenekleşmiş biçimler ayrı denetlenir; tek mekanik kural bütün örnekleri kapsamaz.",
    },
  ],
  source:
    "Aurelia Türkçe Yazım Kuralları kopya kâğıdı; OGM Türkçe Yazım Kuralları ve Noktalama İşaretleri; MEBİ TYT Türkçe Konu Özetleri ilgili bölümler. Gerçek kaynak koşulları karşılaştırılarak yazılmış özgün anlatım, kontrollü örnekler ve öğretim soruları; resmî soru gövdesi aktarımı değildir.",
};

export const punctuationGuide016: LessonGuide = {
  id: "noktalama-isaretleri",
  minutes: 100,
  objectives: [
    "İşaretin cümle, söz öbeği ve anlam ilişkisini nasıl değiştirdiğini göster.",
    "Virgül, noktalı virgül ve iki noktanın farklı görevlerini kanıtla.",
    "Doğrudan soru, dolaylı içerik, alıntı ve ek bilgi sınırlarını ayır.",
    "Genel kuralı zarf-fiil, kurum adı ve ek türü istisnalarıyla birlikte uygula.",
  ],
  sections: [
    {
      title: "Noktalama, cümledeki bağı görünür kılar",
      paragraphs: [
        "Noktalama işaretleri yalnız okurken nefes alınan yerler değildir; cümle sınırını, gruplamayı, alıntıyı ve anlam ilişkisini gösterir. “Yaralı, adama seslendi.” sözünde yaralı kişi özne olur; “Yaralı adama seslendi.” sözünde ise yaralı, adama sözcüğünü niteler. Sözcükler değişmeden işaretin yeriyle farklı bir ilişki okunabilir.",
        "Karar verirken önce tam yargıyı ve söz öbeklerini bul, sonra işaretin hangi görevi üstleneceğini açıkla. Her durakta virgül koymak, tamlamayı veya yan yapıyı yanlış bölebilir. Bazı edebî seçimler birden fazla biçime izin verebilir; tek doğru isteyen öğretim sorularında iletişim amacı ve gruplama koşulu bu nedenle açıkça verilir. Serbest metindeki bütün üslup kararlarını tek otomatik kuralla çözdüğümüzü iddia etmeyiz.",
      ],
    },
    {
      title: "Nokta: cümle sonu, sıra, saat ve sayı",
      paragraphs: [
        "Bildirme cümlesinin sonunda nokta kullanılır: “Görevli kapıyı açtı.” Bazı kısaltmalarda, sıra sayılarında, kaynak künyesinin sonunda, tarih ve saat yazımında da noktanın farklı görevleri vardır. “3. madde”, “12.05.2027”, “14.30” örneklerini aynı cümle sonu göreviyle açıklama; işaret aynı olsa da kurduğu sınır farklıdır.",
        "Dört ve daha çok basamaklı niceliklerde üçlü grupların arasına nokta, ondalık bölümün önüne virgül gelir: 12.500,75. Ay yazıyla verilmiş tarihte “12 Mayıs 2027” denir; ayın önüne arkasına ayrıca nokta konmaz. Günün saatini anlatan 14.30 ile dakika ve saniye gösteren 03:52 aynı şeyi ölçmez. Günün saati ile teknik süre gösterimi farklı bağlamlardır.",
      ],
    },
    {
      title: "Virgül: eş görevli ögeler ve sıralı cümle",
      paragraphs: [
        "Birbiri ardınca gelen eş görevli sözler virgülle ayrılır: “Kalem, defter, silgi aldım.” Burada üç nesne sıralanır. “Kapıyı açtı, içeri girdi.” sözünde ise ayrı yüklemlerden oluşan sıralı cümleler vardır. Sözcük listesiyle cümleler listesini aynı yapı sanma; virgül her ikisinde ayırma işi görse de ayrılan birimler farklıdır.",
        "“Ece ve Can geldi.” gibi tek öge içindeki ve bağlacının iki yanına sırf sözcükler sıralanıyor diye virgül koyma. Bir virgülün gerekli olup olmadığını anlamak için eş görevli birimlerin başlangıç ve bitişini göster. “Kırmızı kapaklı yeni defter” bir sıfat tamlamasıyken bütün sözleri otomatik virgülle bölmek aynı anlamı korumaz; tam bağlamı denetle.",
      ],
    },
    {
      title: "Uzun özne, zamir ve anlam belirsizliği",
      paragraphs: [
        "Uzun cümlede yüklemden uzak kalan özneyi belirginleştirmek için virgül kullanılabilir. “Geçen yıl onardığımız eski okul binası, bu sabah yeni öğrencilerini karşıladı.” sözünde özne öbeğinin sınırı görünür olur. Bu görev, her kısa özne ile yüklem arasına zorunlu virgül konacağı anlamına gelmez; işaretin vurgulama ve ayırma gerekçesini oku.",
        "Özne olarak kullanılan bu, şu, o zamirlerinden sonra virgül kullanımı kaynaklarda ayrıca gösterilir: “Bu, beklediğim sonuçtu.” Anlam karışıklığını önleyen “Yaralı, adama seslendi.” örneğinde de adlaşmış söz ile niteleme ayrılır. Sadece ilk sözcüğün ardından çizgi çekmek yerine kim, ne ve hangi sorularını cümle öbeklerine uygula; farklı işaret yerinin neyi değiştirdiğini açıklayabil.",
      ],
    },
    {
      title: "Ara söz, hitap ve ret–kabul sınırları",
      paragraphs: [
        "Ara söz veya ara cümle ana yargıya ek bilgi verir; iki sınırı da virgülle gösterilebilir: “Ece, takımın yeni kaptanı, konuştu.” Açıklayıcı bölüm çıkarılınca ana cümle kalır. Yalnız başlangıca virgül koyup bitişi açık bırakmak ara sözün sonraki ögeye yanlış bağlanmasına yol açabilir. Kısa çizgi ve ayraçla verilen açıklamaların da uygun iki sınırı korunur.",
        "Hitap edilen adın ardından virgül gelir: “Arkadaşlar, beni dinleyin.” Bu söz, “Arkadaşlar beni dinledi.” cümlesindeki özneyle aynı görevde değildir. Ret, kabul ve teşvik bildiren “Hayır, şimdi çıkmayalım.”, “Evet, başlayabiliriz.” türü sözlerde de virgül farklı bir söylem sınırını gösterir. Aynı sözcüğün başka cümlede normal öge olabileceğini unutma.",
      ],
    },
    {
      title: "Alıntı, tekrar, künye ve ondalık virgülü",
      paragraphs: [
        "Tırnak içinde verilmeyen alıntı cümlesinden sonra virgül kullanılabilir: “Anahtarı buldum, dedi.” Konuşma çizgisiyle başlayan aktarmada da kaynaklar bu virgülü gösterir. Tırnak içinde tam cümle kullanılıyorsa onun son işareti içeride kalır; iki farklı aktarma düzeninin kurallarını üst üste bindirip fazladan işaret ekleme.",
        "Anlatıma güç katan tekrarlar virgülle ayrılabilir; fakat normal ikileme olan ağır ağır sözünün arasına virgül konmaz. Kaynak künyesinde yazar, eser, basımevi gibi bilgileri ayıran; ondalık sayıda tam ve kesir bölümünü bölen virgül de ayrı görevlerdir. “3,5” içindeki virgülü cümlede iki eş görevli sözcük varmış gibi açıklamak yanlıştır; önce işaretin ait olduğu gösterim türünü bul.",
      ],
    },
    {
      title: "Virgül konmayan birleşme sınırları",
      paragraphs: [
        "Normal bağlama görevindeki ve, veya, yahut sözlerinin önüne arkasına otomatik virgül gelmez. Hem…hem, ne…ne, ya…ya gibi tekrarlı bağlaçlar da kendi birliklerini korur. Pekiştirme veya bağlama görevindeki da/de’den hemen sonra yalnız bu görev nedeniyle virgül konmaz. Başka bir ara sözün sınırı gibi özel bağlamları, bağlacın kendi kuralıyla karıştırma.",
        "Tamlayan ile tamlanan arasına, ikileme parçaları arasına ve şart ekinden hemen sonra sırf durak hissedildiği için virgül koyma. “Dersin sonunda” bir tamlamadır; “yavaş yavaş” tekrar grubudur; “Yağmur dinerse çıkarız.” koşul yapısıdır. Cümlede sonraki bağımsız bir sıralama veya ara açıklama varsa o ayrı işlev ayrıca incelenir. Önce hangi bağın bölünmemesi gerektiğini göster.",
      ],
    },
    {
      title: "Zarf-fiil kuralı ve art arda yapı istisnası",
      paragraphs: [
        "Tek zarf-fiil veya zarf-fiilli yapıdan sonra genel olarak virgül konmaz: “Notları okuyup çalıştı.” Burada okuyup ana eyleme bağlanan yan harekettir; bağımsız ikinci çekimli cümle değildir. “Bahar geldi mi göl canlanır.” gibi -ınca/-ince anlamındaki mı yapısından sonra da sırf zaman sınırı hissediliyor diye virgül ekleme.",
        "MEBİ, art arda gelen eş görevli zarf-fiilli yapıları ayrı bir koşul olarak gösterir: “Metni okuyup, biraz düşünüp yanıtını yazdı.” İlk yan yapıyı ayıran virgül bu bağlamda kullanılabilir. Bu istisna bütün zarf-fiillerden sonra zorunlu virgül var demek değildir; genel kural da hiçbir koşulda virgül olmaz diye genişletilmez. Kaç yan yapı olduğunu ve birbirine nasıl eş görevli bağlandığını açıkla.",
      ],
    },
    {
      title: "Noktalı virgül: üst gruplar ve iç virgüller",
      paragraphs: [
        "Noktalı virgül, kendi içinde virgülle ayrılan tür veya takımları ayırır: “Ece, Can; Ada, Deniz.” İki takım olduğu açıkça verildiğinde virgül üyeyi, noktalı virgül takım sınırını gösterir. “Ece; Can, Ada, Deniz.” biçimine dönüşürse Can’ın üyeliği değişir. İşaret burada yalnız daha uzun bir susma değil, hiyerarşik gruplama kurar.",
        "Ögeleri arasında virgül bulunan sıralı cümleler de noktalı virgülle ayrılabilir. Kaynaklar ayrıca ikiden fazla eş değer ögesi virgüllü cümlelerde özne sonrasında noktalı virgül kullanılabileceğini gösterir; bu seçeneği her özneye zorunlu işaret diye taşıma. İki noktayla karıştırmamak için şu soruyu sor: grupları mı ayırıyorum, önceki sözün açıklamasını mı başlatıyorum?",
      ],
    },
    {
      title: "İki nokta: açıklama, örnek ve konuşan kişi",
      paragraphs: [
        "Önceki sözle ilgili örnek veya açıklama başlatılırken iki nokta kullanılabilir: “Gerekli araçlar şunlar: kalem, cetvel, pergel.” Liste bir tam cümle değildir; genel adlar küçük başlar. “Bir şeyi anladım: Düzenli çalışmalıyım.” sözündeki açıklama ise tam cümledir ve büyük başlar. İlişkiyi anlamadan her liste öncesinde iki nokta varmış gibi genelleme yapma.",
        "Karşılıklı konuşmada konuşan kişinin ardından veya edebî metinde konuşma bölümünü başlatan ifadeden sonra da iki nokta görülebilir. Ses bilgisindeki uzun ünlü, matematikte bölme ve genel ağ adresi başka teknik kullanımlardır. Normal saat yazımında 14.30 kuralı varken teknik bir oran veya adres işaretini saat örneğine taşımamak gerekir; bağlam seçimi işaretin görevini belirler.",
      ],
    },
    {
      title: "Üç nokta: tamamlanmayan söz ve eksiltilen alıntı",
      paragraphs: [
        "Üç nokta anlatımca tamamlanmamış sözün, bilerek kesilen düşüncenin veya açık yazılmak istenmeyen bölümün yerine gelebilir. “Dolabı açınca gördüklerim…” sözünde yüklemli açıklama tamamlanmamıştır. Sadece bir nesnenin nerede olduğunun söylenmemesi ise her bildirme cümlesini eksiltili yapmaz; cümle yapısı ve iletişim amacı birlikte değerlendirilir.",
        "Alıntıda alınmayan bölümleri veya konuşmada eksik bırakılan cevabı göstermek de üç noktanın görevlerindendir. Üç nokta yerine keyfî sayıda nokta dizme. Soru ya da ünlem işaretinden sonra kaynaklar ?.. ve !.. biçimini gösterir; bu birleşik görünüm normal cümle sonuna gereksiz işaret yığma izni değildir. Hangi bölümün eksiltildiğini veya neden sesin kesildiğini açıklayabil.",
      ],
    },
    {
      title: "Doğrudan soru, dolaylı soru ve mı’nın diğer işi",
      paragraphs: [
        "Cümle doğrudan cevap istiyorsa soru işareti kullanılır: “Dosya nerede?” Soru sözcüğü olmadan sorulan “Adınız?” da bu iletişim amacını taşır. “Dosyanın nerede olduğunu biliyorum.” cümlesindeyse nerede içeren öbek bilinen içeriği bildirir; temel yargı soru değildir ve cümle noktayla biter. Sözcük avlamak yerine bütün ana yargıyı oku.",
        "“Yağmur başladı mı içeri gireriz.” sözünde mı zaman/koşul ilişkisi kurar; doğrudan soru sormaz. Soru anlamlı bağlı veya sıralı cümlelerde soru işareti sona gelebilir; son ana yargı bildirme olduğunda kaynaklar noktayla biten örnekler de verir. Bilinmeyen doğum tarihi gibi bir bilgi için yay ayraç içindeki (?) ise bambaşka bir görevdir; bunu sıradan soru cümlesiyle eşitleme.",
      ],
    },
    {
      title: "Ünlem, hitap, alay ve belirsizlik",
      paragraphs: [
        "Sevinç, korku, acı, şaşma veya güçlü uyarı bildiren sözler ünlemle bitebilir: “Eyvah, anahtarı unuttum!” Seslenme sözü tek başına ünlem alabilir veya virgülle ana cümleye bağlanıp ünlem sona konabilir. Duygu sözcüğünün varlığı her durumda bütün noktalamayı aynı yapmaz; aktarılmak istenen seslenme ve yargı sınırını belirle.",
        "Alay, kinaye veya küçümseme ilgili sözden sonra yay ayraç içindeki (!) ile belirtilebilir. Kesin olmayan veya şüpheli bilgi için (?) kullanımı ayrıdır. “Beş dakikada (!) bitirmiş.” sözünün amacı alaysa ünlem; bilinmeyen tarihe işaret ediliyorsa soru işareti seçilir. Salt işaret biçimini ezberlemek yerine konuşanın neden buna ihtiyaç duyduğunu verilen bağlamdan çıkar.",
      ],
    },
    {
      title: "Kısa çizgi: sözcük içi ve sözler arası görev",
      paragraphs: [
        "Kısa çizgi satıra sığmayan sözcüğün uygun hece sınırında bölünmesini, kök veya ekin gösterimini ve morfem ayırmayı sağlayabilir: “oku-”, “-de”, “Türk-çe-miz”. Bunlar normal yazıda her ekin arasına çizgi konacağı anlamına gelmez. “Araştırma” sözcüğünü hecelemekle eklerine ayırmak farklı işlemlerdir; sözcük içi iki çözümlemeyi karıştırma.",
        "Sözler veya sayılar arasında ilişki, aralık ve yön de kısa çizgiyle gösterilebilir: “10.00–11.00”, “Ankara–Eskişehir yolu”. İki kısa çizgi arasındaki ara söz açıklayıcı bir parça kurar. Buna karşılık yaklaşık sayı bildiren “üç beş kişi” gibi yinelemeler çizgiyle bölünmez. Matematikte eksi işareti veya negatif değer başka teknik bağlamlardır; her çizgiyi ara söz diye okuma.",
      ],
    },
    {
      title: "Uzun, eğik ve ters eğik çizgi",
      paragraphs: [
        "Satır başındaki konuşmayı gösteren uzun çizgiye konuşma çizgisi denir. Konuşan kişinin adı da ayrıca verilebilir. Konuşma doğrudan tırnak içine alınmışsa aynı aktarmaya gereksiz bir uzun çizgi daha ekleme; iki ayrı düzenin işaretlerini üst üste bindirmek anlamı güçlendirmez. Kısa çizgiyle uzun konuşma çizgisinin görev ve yerini ayır.",
        "Eğik çizgi, dizeler yan yana yazıldığında aralarını, adreste uygun numara/bölge sınırlarını veya sayısal tarihin parçalarını ayırabilir. Birim oranında km/sa gibi yazılırken boşluk bırakılmaz. Ters eğik çizgi ise bazı bilişim dosya yollarında kullanılan teknik ayırıcıdır. Şiir dizesi, tarih ve dosya yolu aynı metin türü değildir; işaretin görünüşünden önce gösterimin amacını belirle.",
      ],
    },
    {
      title: "Çift ve tek tırnak: alıntının içi ve dışı",
      paragraphs: [
        "Doğrudan ve olduğu gibi aktarılan söz tırnak içine alınır. Tam cümle olan alıntı büyük harfle başlar, kendi son işaretini kapanış tırnağının içinde taşır: “Ece ‘geldim’ dedi” gibi iç içe işaretleri düşünmeden karıştırmak yerine dış alıntıyı açıkça kur. Doğru tam aktarma örneği Ece “Anahtarı buldum.” dedi. biçimindedir.",
        "Alıntının içinde yeniden tırnak gerektiren bir söz varsa tek tırnak kullanılabilir. Eser veya bölüm adlarını belirginleştirmek için tırnak ya da uygun eğik yazı düzeni kullanılabilir; tırnakla yazılmış eser adına ek geldiğinde ayrıca kesme eklenmez: “Küçük Ağa”yı gibi. Tam cümle alıntısının noktası ile eser adından sonra gelen ekin sınırı ayrı kurallardır.",
      ],
    },
    {
      title: "Yay ve köşeli ayraç: ek bilginin sınırı",
      paragraphs: [
        "Yay ayraç ana cümlenin dışında kalan ek bilgi, sahne yönergesi veya yabancı adın okunuşunu gösterebilir. İçindeki söz bağımsız yargıysa uygun son işaretini de taşır; kısa bir ad açıklamasıysa otomatik nokta konmaz. Ayraç içini çıkardığında ana cümlenin nasıl sürdüğünü kontrol etmek sınırı görmeyi kolaylaştırır.",
        "İç içe ayraç gerektiğinde köşeli ve yay ayraç birbirinden ayrılan katmanları gösterebilir: dış açıklama içinde doğum–ölüm yılları gibi ikinci bilgi bulunabilir. Aktarılan bir metne sonradan eklenen açıklama için de kaynak düzenine göre köşeli ayraç kullanılır. Bütün parantez türleri rastgele süs değildir; hangi bilginin kime ve hangi katmana ait olduğunu açıkla.",
      ],
    },
    {
      title: "Kesme: özel ad, kurum, ek türü ve istisna",
      paragraphs: [
        "Özel adlara gelen durum, iyelik ve bildirme ekleri genel olarak kesmeyle ayrılır: “Ece’ye”, “Türkiye’miz”, “Deniz’miş”. Kısaltma ve sayıya gelen ekler de uygun okunuşla kesme alabilir; fakat sonunda nokta veya üs bulunan gösterimler ayrıca öğrenilir. Belirli tarihin ay/gün adı ve bir sesin şiirde düşürülmesi gibi kullanımların bağlamı da açık olmalıdır.",
        "Açık kurum, kuruluş, kurul ve iş yeri adlarına gelen ekler kesmeyle ayrılmaz: “Türk Dil Kurumuna”; kısaltma ise “TDK’ye” olabilir. Kaynaklar Avrupa Birliği’ne biçimini özel istisna olarak gösterir. Yapım ve çokluk ekleri ile bunlardan sonraki ekler “Ankaralı”, “Türkçenin”, “Ahmetler” gibi ayrılmaz; iyeliği değişmiş “Boğaz Köprümüz” de ayrı bir durumdur. Sözcük özel ad diye bütün eklerin önüne otomatik kesme koyma.",
      ],
    },
  ],
  examples: [
    {
      title: "Virgülle değişen özne",
      prompt:
        "A: “Yaralı, adama seslendi.” B: “Yaralı adama seslendi.” A’da yaralı olan sesleniyor; B’de ise söylenmeyen kişi yaralı olan adama sesleniyor. Öbekleri çöz.",
      strategy:
        "Kim seslendi ve hangi adama sorularını verilen iki bağlamda ayrı kullan.",
      steps: [
        {
          label: "A’nın öznesi",
          explanation:
            "Yaralı, yaralı kişi anlamıyla adlaşmış sıfattır ve özne olur. Adama sözü ayrı bir yer tamlayıcısıdır.",
        },
        {
          label: "B’nin öbeği",
          explanation:
            "Yaralı adama birlikte bir sıfat tamlaması kurar; yaralı, adamı niteler. Bu öbek yer tamlayıcısı, seslenen ise gizli öznedir.",
        },
        {
          label: "İşaretin görevi",
          explanation:
            "Virgül ilk örnekte yaralı sözünün sonraki ada bağlanmasını önleyerek amaçlanan anlam sınırını gösterir.",
        },
      ],
      answer: "A’da yaralı özne; B’de yaralı, adama sözünü niteleyen sıfattır.",
      check:
        "Her iki cümlede yaralı kişinin aynı dil bilgisel görevi taşıdığını varsayma.",
      pitfall:
        "Virgülü sadece nefes alma işareti sayıp öbek bağlantısını görmezden gelme.",
    },
    {
      title: "Takım sınırı yer değiştiriyor",
      prompt:
        "A: “Takımlar şöyle: Ece, Can; Ada, Deniz.” B: “Takımlar şöyle: Ece; Can, Ada, Deniz.” Aynı dört kişinin hangi üyeliği değişmiştir?",
      strategy: "Her noktalı virgülün iki yanını ayrı takım olarak çiz.",
      steps: [
        {
          label: "İlk gruplama",
          explanation:
            "A’da birinci takım Ece ve Can; ikinci takım Ada ve Deniz’dir. Virgül takımın kendi üyelerini listeler.",
        },
        {
          label: "Yeni gruplama",
          explanation:
            "B’de birinci takım yalnız Ece; ikinci takım Can, Ada ve Deniz olur. Kişi sayısı hâlâ dörttür.",
        },
        {
          label: "Karşılaştır",
          explanation:
            "Can birinci takımdan ikinci takıma geçmiştir. Noktalı virgülün konumu gerçek gruplama bilgisini değiştirmiştir.",
        },
      ],
      answer: "Takımı değişen kişi Can’dır.",
      check:
        "Ece’nin ilk; Ada ve Deniz’in ikinci grupta kaldığını tek tek doğrula.",
      pitfall:
        "İki nokta listeyi başlatır; noktalı virgülün takım sınırı görevini bununla eşitleme.",
    },
    {
      title: "Yerini sormak ile bildiğini söylemek",
      prompt:
        "“Dosya nerede?” ve “Dosyanın nerede olduğunu biliyorum.” cümlelerinin son işaretlerini açıkla.",
      strategy: "Soru sözcüğü yerine temel iletişim yargısını merkeze al.",
      steps: [
        {
          label: "Doğrudan soru",
          explanation:
            "İlk cümlede dinleyiciden dosyanın yerini bildirmesi beklenir; nerede soru yüklemidir ve soru işareti gelir.",
        },
        {
          label: "Dolaylı içerik",
          explanation:
            "İkincide dosyanın nerede olduğu, biliyorum yükleminin içeriğidir. Konuşan o bilgiyi bildiğini söyler; doğrudan cevap istemez.",
        },
        {
          label: "Sonuç",
          explanation:
            "İkinci cümle noktayla biter. Nerede sözcüğünün iki cümlede de bulunması, iki iletişim amacını eşitlemez.",
        },
      ],
      answer: "Doğrudan soru: ?. Bildirme içinde dolaylı soru öbeği: .",
      check:
        "İkinci cümlenin tamamına cevap verilmesi gereken bir soruymuş gibi davranmadığını denetle.",
      pitfall:
        "Nerede veya mı görülen her cümlenin sonuna otomatik soru işareti koyma.",
    },
    {
      title: "Ara sözün iki sınırı",
      prompt:
        "“Ece takımın yeni kaptanı konuştu.” ifadesinde takımın yeni kaptanı, Ece’yi açıklayan bir ara söz olarak verilecektir. Noktalamayı ve ana cümleyi göster.",
      strategy: "Açıklamayı çıkarılabilir bir blok olarak belirle.",
      steps: [
        {
          label: "Ana yargı",
          explanation:
            "Temel cümle Ece konuştu biçimindedir. Ece özne, konuştu yüklemdir.",
        },
        {
          label: "Açıklama",
          explanation:
            "Takımın yeni kaptanı öbeği Ece hakkında ek bilgi verir ve ara söz olarak ana yargının dışında sınırlandırılır.",
        },
        {
          label: "Çift işaret",
          explanation:
            "“Ece, takımın yeni kaptanı, konuştu.” yazımında hem başlangıç hem bitiş virgülü vardır; yalnız bir virgül ara sözün iki kenarını göstermez.",
        },
      ],
      answer: "Ece, takımın yeni kaptanı, konuştu.",
      check:
        "İki virgül arasını çıkardığında Ece konuştu cümlesi bozulmadan kalır.",
      pitfall:
        "Tamlamanın kendi içine rastgele virgül koyma; bütün açıklama öbeğini koru.",
    },
    {
      title: "Genel zarf-fiil kuralını istisnasıyla oku",
      prompt:
        "“Kitabı okuyup not aldı.” ve “Metni okuyup, biraz düşünüp görüşünü yazdı.” cümlelerindeki virgül kararlarını kaynakların iki ayrı koşuluyla açıkla.",
      strategy:
        "Tek zarf-fiilli yapıyla art arda eş görevli yapıları sayarak karşılaştır.",
      steps: [
        {
          label: "Tek yapı",
          explanation:
            "İlk cümlede okuyup tek yan eylemdir. Zarf-fiilden sonra genel kurala göre otomatik virgül konmaz.",
        },
        {
          label: "Eş görevli dizi",
          explanation:
            "İkinci cümlede metni okuyup ve biraz düşünüp yan yapıları art arda gelir; MEBİ bu tür eş görevli zarf-fiilli yapılar arasındaki virgülü ayrıca gösterir.",
        },
        {
          label: "Sınırı koru",
          explanation:
            "İstisna tek zarf-fiilden sonra her zaman virgül gerekir sonucunu vermez. Genel kural da istisnayı yok eden hiçbir zaman biçiminde kurulmaz.",
        },
      ],
      answer:
        "Tek yapıda virgül yok; art arda eş görevli yapılarda ayıran virgül kullanılabilir.",
      check: "Cümlede gerçekten iki eş görevli yan yapının bulunduğunu belirt.",
      pitfall:
        "Kaynakların biri genel kuralı, diğeri istisnayı verdiğinde ikisini çelişki diye silme.",
    },
    {
      title: "Açıklama, alıntı ve kurum ekini birlikte denetle",
      prompt:
        "Normal yazımda “Ece şöyle dedi; ‘Dosyayı Türk Dil Kurumu’na gönderdim’.” ifadesini, tam cümle doğrudan alıntı olacak biçimde düzelt.",
      strategy:
        "Açıklama başlangıcını, alıntının kendi sınırını ve kurum ekini ayrı incele.",
      steps: [
        {
          label: "Başlatma ilişkisi",
          explanation:
            "Şöyle dedi sözü ardından aktarılacak açıklamayı başlatır; burada noktalı virgül yerine iki nokta kullanılır.",
        },
        {
          label: "Alıntı sınırı",
          explanation:
            "Doğrudan aktarılan tam cümle çift tırnak içinde büyük başlar; kendi son noktası kapanış tırnağının içinde kalır.",
        },
        {
          label: "Kurum adı",
          explanation:
            "Açık kurum adı Türk Dil Kurumuna ek alırken kesmeyle ayrılmaz. Son biçim: Ece şöyle dedi: “Dosyayı Türk Dil Kurumuna gönderdim.”",
        },
      ],
      answer: "Ece şöyle dedi: “Dosyayı Türk Dil Kurumuna gönderdim.”",
      check:
        "Kapanış tırnağından sonra gereksiz ikinci bir nokta veya kesme eklemediğini doğrula.",
      pitfall:
        "Doğru bir alıntı işaretini seçip kurum adındaki bağımsız kesme hatasını bırakma.",
    },
  ],
  recall: [
    {
      prompt: "Virgül yaralı adama örneğinde neyi değiştirebilir?",
      answer:
        "Yaralı, adama seslendi biçiminde yaralı özne; yaralı adama seslendi biçiminde yaralı, adama sözünü niteleyen sıfattır. Tam cümle ve amaçlanan anlam birlikte okunur.",
    },
    {
      prompt:
        "Virgüllü üyeleri olan iki takımı hangi işaret ayırır; iki nokta ne yapar?",
      answer:
        "Noktalı virgül üst takım sınırını ayırır. İki nokta ise takımlar şöyle gibi önceki ifadenin ardından liste veya açıklamayı başlatabilir.",
    },
    {
      prompt: "Dosyanın nerede olduğunu biliyorum neden noktayla biter?",
      answer:
        "Temel yargı biliyorum bildirmesidir; nerede içeren öbek bilinen içeriktir. Doğrudan dosyanın yeri sorulmuyor.",
    },
    {
      prompt: "Zarf-fiilden sonra virgül kuralını nasıl koşullu kurarsın?",
      answer:
        "Tek zarf-fiilli yapıdan sonra genel olarak virgül konmaz; art arda eş görevli zarf-fiilli yapılar arasındaki kaynak istisnası ayrıca korunur.",
    },
    {
      prompt: "Tırnak içi tam cümle ve tırnaklı eser adı eki nasıl ayrılır?",
      answer:
        "Tam cümle kendi son işaretini kapanış tırnağından önce taşır. Tırnaklı eser adına ek getirirken ayrıca kesme kullanılmaz.",
    },
    {
      prompt: "Kesmede yalnız özel ad olup olmadığına bakmak neden yetmez?",
      answer:
        "Ek türü ve adın sınıfı da belirleyicidir: kurum adları, yapım/çokluk ekleri ve sonraki ekler kesmesiz; kısaltma, çekim ve özel istisnalar ayrı kurallıdır.",
    },
  ],
  source:
    "Aurelia Türkçe Noktalama İşaretleri kopya kâğıdı; OGM Türkçe Yazım Kuralları ve Noktalama İşaretleri; MEBİ TYT Türkçe Konu Özetleri ilgili bölümler. Gerçek kaynak koşulları karşılaştırılarak yazılmış özgün anlatım, kontrollü örnekler ve öğretim soruları; resmî soru gövdesi aktarımı değildir.",
};

const questionRows016: Record<
  string,
  {
    prompt: string;
    choices: string[];
    answer: number;
    hint: string;
    explanation: string;
  }[]
> = {
  "yazim-kurallari": [
    {
      prompt:
        "“Çocuklar bahçede oynuyor; öğretmen de onları izliyor.” cümlesindeki bahçede ve öğretmen de biçimleri için hangisi doğrudur?",
      choices: [
        "İlk de bulunma durum ekidir ve bitişik; ikinci de ekleme bildiren bağlaçtır ve ayrı yazılır.",
        "İki de de bağlaçtır ve ayrı yazılmalıdır.",
        "İlk de bağlaçtır, ikinci de bulunma ekidir.",
        "İkinci de öğretmen sözünün özel ad olmasına bağlı olarak ayrılır.",
        "İlk de her durumda bahçe de biçiminde yazılmalıdır.",
      ],
      answer: 0,
      hint: "Bahçede nerede sorusunu; öğretmen de eklenen kişiyi karşılıyor.",
      explanation:
        "Oynama eyleminin yeri bahçedir: bahçe-de tek sözcüktür. Öğretmen de sözünde de, öğretmeni eklenen kişi olarak bağlar; ayrı yazılan bağlaçtır. Sözcüğü silme denemesi yerine iki tam cümlede kurulan işlevi karşılaştır.",
    },
    {
      prompt:
        "“Masadaki dosya kapalı. Biliyorum ki dosyanın bir kopyası var.” cümlelerinde masadaki sözündeki ki ile biliyorum ki sözündeki ki nasıl ayrılır?",
      choices: [
        "İkisi de ayrı yazılması gereken bağlaçtır.",
        "İlki dosya adını belirleyen ektir ve bitişiktir; ikincisi cümleleri ilişkilendiren bağlaçtır ve ayrıdır.",
        "İlki bağlaç, ikincisi ilgi zamiridir.",
        "Her ikisi yalnız ünlü uyumu nedeniyle bitişik yazılır.",
        "İkincisi bir kişi eki olduğu için biliyorumki yazılır.",
      ],
      answer: 1,
      hint: "İlk ki hangi dosya sorusuna hizmet eder; ikinci ki yeni yargıyla bağlantı kurar.",
      explanation:
        "Masa-da-ki, masada bulunan dosyayı belirler; ki ek olduğu için sözcüğe bitişir. Biliyorum ki sözündeki ki bağlaçtır ve ayrı yazılır. Belki, çünkü gibi kalıplaşmış sözler bu cümledeki biliyorum ki bağlacının yazımını değiştirmez.",
    },
    {
      prompt:
        "“Hazır mısın?” gerçek bir cevap beklenen sorudur. “Güzel mi güzel bir bahçeydi!” ise güzelliği pekiştirir. Bu iki kullanım hakkında hangisi doğrudur?",
      choices: [
        "İkinci cümledeki mi pekiştirme yaptığı için güzelmi yazılır.",
        "İlk cümlede kişi eki ayrı yazılarak hazır mı sın biçimi kullanılır.",
        "Mı/mi iki cümlede de ayrı yazılır; ilkinde -sın soru parçasına bitişir, ikincide soru anlamı yoktur.",
        "Mi görülen her cümle mutlaka soru işaretiyle biter.",
        "İlk mı, hazır sözüne bitişik yazılır.",
      ],
      answer: 2,
      hint: "Yazım sınırı ile iletişimdeki soru anlamı aynı ölçüt değildir.",
      explanation:
        "Mı/mi gelenekleşmiş olarak önceki sözcükten ayrı yazılır; ardından gelen kişi eki ona bitişir: hazır mısın. Pekiştirmedeki güzel mi güzel de ayrı yazılır. İkinci cümle cevap isteyen soru değil, duygulu bir bildirmedir; ünlem bu bağlamla uyumludur.",
    },
    {
      prompt:
        "Normal cümle yazımındaki bir duyuruda belirli tarih, bir günlükte ise genel ay adı kullanılacaktır; vurgu için tümü büyük harf yazımı kullanılmayacaktır. Birinci metin 12 Mayıs 2027 tarihini, ikinci metin her yılın mayıs ayını anlatıyor. Hangi yazım çifti bu bağlamlara uygundur?",
      choices: [
        "Toplantı 12 mayıs 2027’de. / Her Mayıs bahçe canlanır.",
        "Toplantı 12 Mayıs 2027’de. / Her Mayıs bahçe canlanır.",
        "Toplantı 12 mayıs 2027’de. / Her mayıs bahçe canlanır.",
        "Toplantı 12 Mayıs 2027’de. / Her mayıs bahçe canlanır.",
        "Toplantı 12 MAYIS 2027’de. / Her MAYIS bahçe canlanır.",
      ],
      answer: 3,
      hint: "Belirli tarihin parçası olan ay adıyla genel zaman adını ayır.",
      explanation:
        "Belirli tarih bildiren 12 Mayıs 2027 dizisinde ay adı büyük harfle başlar. Her mayıs ifadesi belirli bir günün özel tarihi değil, genel ay adıdır; küçük yazılır. Tamamı büyük harfli tabela bağlamı verilmediği için duyuru ve günlük normal cümle yazımıyla değerlendirilir.",
    },
    {
      prompt:
        "Bir yazıda açık kurum adı Türk Dil Kurumu, başka bir cümlede aynı kurumun TDK kısaltması kullanılacaktır. Yönelme ekinin yazımı bakımından hangi seçenek doğrudur? TDK harf harf te-de-ke diye okunmaktadır.",
      choices: [
        "Türk Dil Kurumu’na / TDK’ye",
        "Türk Dil Kurumuna / TDKye",
        "Türk Dil Kurumuna / TDK’na",
        "Türk Dil Kurumu’na / TDKye",
        "Türk Dil Kurumuna / TDK’ye",
      ],
      answer: 4,
      hint: "Açık kurum adının kesme istisnası ile kısaltmanın ek kuralını ayrı uygula.",
      explanation:
        "Kurum adlarına gelen ekler kesmeyle ayrılmaz: Türk Dil Kurumuna. Büyük harfli ve harf harf okunan TDK kısaltması ekini son harfin okunuşuna göre kesmeyle alır: TDK’ye. İki biçim aynı kurumu anlatsa da yazım sınırları aynı değildir.",
    },
    {
      prompt:
        "Öğrenciler bir sıraya sekiz kişi olacak biçimde dağıtılmıştır; ayrıca listedeki sekizinci madde okunacaktır. Üleştirme ve sıra sayısı birlikte hangi seçenekte doğru yazılmıştır?",
      choices: [
        "Öğrenciler sekizer dizildi; 8’inci madde okundu.",
        "Öğrenciler 8’er dizildi; 8’inci madde okundu.",
        "Öğrenciler sekizer dizildi; 8.’inci madde okundu.",
        "Öğrenciler 8’er dizildi; 8. inci madde okundu.",
        "Öğrenciler sekiz er dizildi; 8.’inci madde okundu.",
      ],
      answer: 0,
      hint: "Üleştirme yazıyla; sıra ise nokta veya kesme+ek seçeneklerinden yalnız biriyle gösterilir.",
      explanation:
        "Paylaştırma anlamındaki üleştirme sayısı sekizer biçiminde yazıyla verilir. Sıra sayısı 8. ya da 8’inci olabilir; nokta ile -inci aynı anda kullanılmaz. Bu nedenle sekizer ve 8’inci birlikte doğrudur.",
    },
    {
      prompt:
        "Aşağıdaki kısaltmalardan TDK harf harf te-de-ke, NATO ise tek sözcük gibi nato okunmaktadır. “Kuruma gönderildi” ve “örgütten ayrıldı” anlamlarını sırasıyla verecek hangi ekler doğrudur?",
      choices: [
        "TDK’na / NATO’den",
        "TDK’ye / NATO’dan",
        "TDK’ya / NATO’dan",
        "TDK’ye / NATO’ten",
        "TDK’e / NATO’nun",
      ],
      answer: 1,
      hint: "Birinde son harfin adı, diğerinde bütün kısaltmanın okunuşu belirleyicidir.",
      explanation:
        "TDK’nin son harfi ke diye okunduğu için yönelme TDK’ye olur. NATO tek sözcük olarak okunur; ayrılma eki nato okunuşuna göre NATO’dan yazılır. NATO’nun ise ayrılma değil ilgi ekidir ve istenen anlamı karşılamaz.",
    },
    {
      prompt:
        "İlk cümlede nar ağacının gerçek çiçeği, ikinci cümlede bir kumaşın renk adı anlatılacaktır. Hangi seçenek verilen iki anlamın yazımını doğru ayırır?",
      choices: [
        "Bahçede narçiçeği açtı. / Nar çiçeği bir kumaş seçti.",
        "Bahçede nar çiçeği açtı. / Nar çiçeği bir kumaş seçti.",
        "Bahçede nar çiçeği açtı. / Narçiçeği bir kumaş seçti.",
        "Bahçede narçiçeği açtı. / Narçiçeği bir kumaş seçti.",
        "Bahçede Nar Çiçeği açtı. / Narçiçeği Bir kumaş seçti.",
      ],
      answer: 2,
      hint: "Çiçek tür sözü gerçek çiçeği mi karşılıyor, renk adına mı dönüşmüş?",
      explanation:
        "Nar ağacının gerçek çiçeği nar çiçeği biçiminde ayrıdır. Renk adı olan narçiçeği ise ikinci sözcüğün gerçek çiçek anlamından ayrıldığı yerleşik birleşiktir. Anlam değişikliği bu örnekte yazım farkını açıklar; her birleşiği tek bir mekanik kuralla çözme iddiası değildir.",
    },
    {
      prompt:
        "Bir yürüme biçimini belirten ikileme ve bir nesnenin çok sağlam olduğunu belirten pekiştirme yazılacaktır. Hangi seçenek ikisini de doğru verir?",
      choices: [
        "ağırağır / sapa sağlam",
        "ağır-ağır / sapa sağlam",
        "ağır, ağır / sapasağlam",
        "ağır ağır / sapasağlam",
        "ağır ağır / sapa sağlam",
      ],
      answer: 3,
      hint: "Tekrarlı ikilemeyle ses eklenerek kurulan pekiştirmeyi ayır.",
      explanation:
        "Yürüme biçimi bildiren ağır ağır bir ikilemedir ve araya çizgi veya virgül konmadan ayrı yazılır. Sapasağlam, pekiştirmeli sözdür ve bitişik yazılır. Tekrar grubu ile pekiştirmenin yazım koşulları farklıdır.",
    },
    {
      prompt:
        "“Af + etmek” birleşirken ikinci bir f sesi ortaya çıkar; “not + etmek” birleşmesinde ise ses düşmesi veya türemesi olmaz. Bu verilere göre hangi yazım çifti doğrudur?",
      choices: [
        "af etmek / notetmek",
        "afetmek / not etmek",
        "aff etmek / notetmek",
        "afetmek / notetmek",
        "affetmek / not etmek",
      ],
      answer: 4,
      hint: "Ses olayı olan yardımcı fiilli birleşikle ses olayı olmayanı karşılaştır.",
      explanation:
        "Af ile etmek birleşmesinde ünsüz türemesi vardır; sonuç affetmek bitişik yazılır. Not etmek birleşmesinde bu tür bir ses olayı yoktur ve sözcükler ayrı kalır. Verilen iki örnek yardımcı fiilli birleşiklerin farklı koşullarını gösterir.",
    },
  ],
  "noktalama-isaretleri": [
    {
      prompt:
        "“Yaralı, adama seslendi.” cümlesinde yaralı olan kişi seslenen öznedir. “Yaralı adama seslendi.” cümlesinde ise söylenmeyen bir kişi yaralı olan adama seslenmiştir. Virgül bu iki cümlede hangi farkı görünür kılar?",
      choices: [
        "Yaralı sözünün bağımsız özne olmasıyla adama sözünü nitelemesini ayırır.",
        "Seslenme fiilinin zamanını geçmişten geleceğe çevirir.",
        "Adama sözünü iki cümlede de özne yapar.",
        "Seslendi yüklemini her iki cümlede de isim cümlesine dönüştürür.",
        "Yaralı sözünü her durumda özel ad yapar.",
      ],
      answer: 0,
      hint: "Kim seslendi ve hangi adama seslendi sorularını iki bağlamda ayrı sor.",
      explanation:
        "Virgüllü biçimde yaralı, yaralı kişi anlamıyla adlaşmış sıfat ve öznedir; adama ayrı bir yer tamlayıcısıdır. Virgülsüz biçimde yaralı adama bir sıfat tamlaması olarak dolaylı tümleci kurar; özne gizlidir. İşaret burada anlam ve öbek sınırını ayırır; yalnız nefes durağı değildir.",
    },
    {
      prompt:
        "“Takımlar şöyle: Ece, Can; Ada, Deniz.” yazısında noktalı virgül iki takımı ayırmaktadır. Aynı kişiler “Takımlar şöyle: Ece; Can, Ada, Deniz.” biçiminde yazılırsa hangi kişinin takım grubu değişir?",
      choices: [
        "Ece",
        "Can",
        "Ada",
        "Deniz",
        "Dört kişi de aynı grupta kalır.",
      ],
      answer: 1,
      hint: "Noktalı virgülün solundaki ve sağındaki ad kümelerini iki yazımda karşılaştır.",
      explanation:
        "İlk yazımda birinci takım Ece ile Can, ikinci takım Ada ile Deniz’dir. İkincide birinci takım yalnız Ece; ikinci takım Can, Ada ve Deniz olur. Yalnız Can sınırı geçmiştir. Virgül aynı takımın üyelerini, noktalı virgül takımları ayırır.",
    },
    {
      prompt:
        "Bir öğretmen dosyanın yerini sormuyor, o yeri bildiğini bildiriyor. “Dosyanın nerede olduğunu biliyorum” cümlesinin son işareti ve gerekçesi hangisidir?",
      choices: [
        "Soru işareti; nerede sözü bulunan her cümle sorudur.",
        "Üç nokta; dosyanın yeri metinde açıkça söylenmemiştir.",
        "Nokta; temel yargı biliyorum bildirmesidir ve dolaylı soru öbeği doğrudan soru yapmaz.",
        "İki nokta; biliyorum her zaman liste başlatır.",
        "Noktalı virgül; iki çekimli yüklem arasında zorunludur.",
      ],
      answer: 2,
      hint: "Cümle dinleyiciden cevap mı istiyor, konuşanın bilgisini mi bildiriyor?",
      explanation:
        "Dosyanın nerede olduğunu öbeği bilinen içeriği karşılar; temel yargı biliyorumdur. Konuşan doğrudan yer sorusu sormadığı için cümle noktayla biter. Dosya nerede? bağımsız sorusu farklı bir iletişim amacı taşır.",
    },
    {
      prompt:
        "“Yanıtı biliyorum ( ) Önce veriyi kontrol etmeliyiz.” cümlesinde ikinci bölüm, ilk bölümde sözü edilen yanıtı tam bir cümleyle açıklamaktadır. Parantezle gösterilen boşluğa hangi işaret gelir?",
      choices: [
        "Virgül",
        "Noktalı virgül",
        "Kesme işareti",
        "İki nokta",
        "Eğik çizgi",
      ],
      answer: 3,
      hint: "İkinci bölüm bir önceki sözün açıklaması olarak sunuluyor.",
      explanation:
        "Önce veriyi kontrol etmeliyiz cümlesi, yanıtın ne olduğunu açıklamaktadır; açıklama başlatan iki nokta uygundur. Sonraki bölüm tam cümle olduğu için Önce büyük harfle başlamıştır. Noktalı virgül burada açıklama başlatma ilişkisinin karşılığı değildir.",
    },
    {
      prompt:
        "“Dün gelen yeni görevli ( ) arşivin anahtarını taşıyan kişi ( ) kapıda bekliyordu.” cümlesinde arşivin anahtarını taşıyan kişi bölümü, görevliyi açıklayan ve çıkarıldığında temel cümleyi bozmayan bir ara sözdür. İki boşluk için uygun işaret çifti hangisidir?",
      choices: [
        "İki nokta / nokta",
        "Virgül / nokta",
        "Noktalı virgül / virgül",
        "Kesme / kesme",
        "Virgül / virgül",
      ],
      answer: 4,
      hint: "Ara sözün hem başlangıç hem bitiş sınırını işaretle.",
      explanation:
        "Ara söz iki virgül arasına alınır: Dün gelen yeni görevli, arşivin anahtarını taşıyan kişi, kapıda bekliyordu. Açıklayıcı parça çıkarılınca Dün gelen yeni görevli kapıda bekliyordu temel cümlesi kalır. Tek virgül ara sözün iki sınırını birlikte göstermez.",
    },
    {
      prompt:
        "“Kitabı okuyup not aldı.” cümlesinde okuyup tek zarf-fiildir. “Yazıyı okuyup, biraz düşünüp görüşünü yazdı.” cümlesinde ise art arda gelen eş görevli iki zarf-fiilli yapı vardır. Kaynaklarda verilen genel kural ve istisna bakımından hangisi doğrudur?",
      choices: [
        "İlkinde tek zarf-fiilden sonra virgül konmaz; ikincide art arda gelen eş görevli zarf-fiilli yapıları ayıran virgül kullanılabilir.",
        "Her zarf-fiilden sonra zorunlu virgül gelir.",
        "Hiçbir koşulda zarf-fiilli yapıdan sonra virgül kullanılamaz.",
        "İlk okuyup sözü bağlaç olduğu için virgül alır.",
        "İkinci cümledeki virgül, düşünüp sözünü özne yapar.",
      ],
      answer: 0,
      hint: "Tek yan eylemle eş görevli art arda yan eylemleri birbirine eşitleme.",
      explanation:
        "Tek zarf-fiilden sonra otomatik virgül kullanılmaz. Ancak kaynaklar art arda gelen eş görevli zarf-fiilli yapılar arasındaki virgülü ayrıca gösterir. Örnekte okuyup ve biraz düşünüp yan eylemleri birbirini izler; istisnayı yok sayan hiçbir zaman genellemesi doğru değildir.",
    },
    {
      prompt:
        "Bir listede birinci grup kalem, defter ve silgi; ikinci grup cetvel, gönye ve pergeldir. Grupların kendi içinde virgülle yazıldığı tek cümlede iki grubu ayırmak için uygun işaret hangisidir?",
      choices: [
        "Kesme işareti",
        "Noktalı virgül",
        "Soru işareti",
        "Tek tırnak",
        "Ünlem işareti",
      ],
      answer: 1,
      hint: "Kendi içinde virgüllü iki tür veya takımı ayıran üst sınırı bul.",
      explanation:
        "Kalem, defter, silgi; cetvel, gönye, pergel yazımında noktalı virgül iki üst grubu ayırır. Her grubun içindeki virgül üyeleri listeler. İşaretin seçimi yalnız durak uzunluğuna değil bu açık gruplama ilişkisine dayanır.",
    },
    {
      prompt:
        "“Ece ‘Anahtarı buldum.’ dedi.” cümlesi dış aktarma tırnakları kullanılmadan yazılacaktır. Anahtarı buldum tam cümlesi doğrudan alıntı olarak çift tırnağa alınmalıdır. Hangi yazım bu koşulu karşılar?",
      choices: [
        "Ece “anahtarı buldum”. dedi.",
        "Ece “Anahtarı buldum”. dedi.",
        "Ece “Anahtarı buldum.” dedi.",
        "Ece “Anahtarı buldum” dedi?.",
        "Ece “Anahtarı buldum.”’ dedi.",
      ],
      answer: 2,
      hint: "Alıntı tam cümle olduğu için ilk büyük harfi ve kendi son işaretinin yerini denetle.",
      explanation:
        "Doğrudan aktarılan Anahtarı buldum tam cümlesi büyük harfle başlar ve noktası kapanış tırnağından önce yer alır. Ardından dedi aktarım yüklemi küçük harfle sürer. Tırnaktan sonra fazladan kesme veya soru işareti için bağlam yoktur.",
    },
    {
      prompt:
        "Bir kişi “Bütün işi beş dakikada bitirmiş” diyerek gerçekte buna inanmadığını ve alay ettiğini gösterecektir. Beş dakikada ifadesinden hemen sonra alay veya kinaye bildirmek için hangi işaret kullanılır?",
      choices: ["(?)", "[]", "/", "(!)", ":"],
      answer: 3,
      hint: "Belirsiz tarih için kullanılan işaretle alay işaretini ayır.",
      explanation:
        "Alay, kinaye veya küçümseme ilgili sözden sonra yay ayraç içindeki ünlemle gösterilebilir: beş dakikada (!). Yay ayraç içindeki soru işareti ise bilinmeyen ya da şüpheli bilgiye işaret eder; burada açıkça verilen amaç alaydır.",
    },
    {
      prompt:
        "Aşağıdaki biçimlerden hangisinde özel ada gelen yapım eki nedeniyle kesme kullanılmaması doğru örneklenmiştir? Diğer seçeneklerde kişi adı normal durumda çekim eki almaktadır.",
      choices: [
        "Eceye bir not verdim.",
        "Candan bir yanıt geldi.",
        "Denizin defteri kayıp.",
        "Adayla görüştüm.",
        "Ankaralı bir öğrenciyle tanıştım.",
      ],
      answer: 4,
      hint: "İlk dört adın bu soruda kişi adı olduğu koşulunu koru; son örnekte -lı yapım ekidir.",
      explanation:
        "Ankara özel adına gelen -lı yapım eki kesmeyle ayrılmaz: Ankaralı. Kökün özel ad olması büyük harfi korur; yapım eki kesme gerektirmez. Soruda kişi adı olarak tanımlanan Ece’ye, Can’dan, Deniz’in ve Ada’yla ise çekim ya da birleşen ile ilişkisi kesmeyle ayrılır. Candan gibi sözlerin başka bağlamda cins sözcük olabilmesi verilen kişi adı koşulunu değiştirmez.",
    },
  ],
};

function questionsFor016(id: string): Question[] {
  return questionRows016[id].map((q, i) => ({
    id: `f016-${id}-${i + 1}`,
    prompt: txt(q.prompt),
    options: q.choices.map(txt),
    answer: q.answer,
    hint: txt(q.hint),
    explanation: txt(q.explanation),
    skill: id,
  }));
}
export const forge016TurkishGuides: LessonGuide[] = [
  spellingGuide016,
  punctuationGuide016,
];
export const forge016TurkishTopics: Record<string, string> = {
  "yazim-kurallari": "detail-263",
  "noktalama-isaretleri": "detail-264",
};
const titles016 = [
  "Yazım kuralları: anlamdan doğru biçime",
  "Noktalama işaretleri: anlamı ve bağı görünür kıl",
];
export const forge016TurkishLessons: Lesson[] = forge016TurkishGuides.map(
  (g, i) => ({
    id: g.id,
    subjectId: "tyt-turkce",
    title: txt(titles016[i]),
    minutes: g.minutes,
    objectives: g.objectives.map(txt),
    body: g.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: questionsFor016(g.id),
    source: txt(g.source),
    tags: ["kaynakli-anlatim", "adim-adim", "dil-bilgisi"],
  }),
);

export interface TurkishFrame016 {
  sentence: string;
  context: string;
  tokens: string[];
  groups: { label: string; members: number[]; joined: boolean }[];
  relations: { from: number; to: number; label: string }[];
  focus: number;
  decision: string;
  reason: string;
  evidence: string[];
}
export interface TurkishCase016 {
  id: string;
  label: string;
  frames: [TurkishFrame016, TurkishFrame016];
}
// These authored frames are a bounded teaching corpus, not a general Turkish parser.
const authoredCases016: Record<string, TurkishCase016[]> = {
  "yazim-kurallari": [
    {
      id: "de",
      label: "Da/de: yer ilişkisi ve eklenen varlık",
      frames: [
        {
          sentence: "Duvarda bir saat var.",
          context: "Bir saatin nerede bulunduğu anlatılıyor.",
          tokens: ["Duvar", "da", "bir saat", "var."],
          groups: [
            {
              label: "Tek sözcük",
              members: [0, 1],
              joined: true,
            },
            {
              label: "Varlık",
              members: [2],
              joined: false,
            },
            {
              label: "Yargı",
              members: [3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 1,
              to: 0,
              label: "Bulunma eki",
            },
            {
              from: 0,
              to: 3,
              label: "Yer ilişkisi",
            },
            {
              from: 2,
              to: 3,
              label: "Var olan",
            },
          ],
          focus: 1,
          decision: "Bulunma eki bitişik",
          reason:
            "Duvar-da, saatin bulunduğu yeri gösteren tek sözcüktür; da bağımsız ekleme sözü değildir.",
          evidence: [
            "Nerede? Duvarda.",
            "Gerçek boşluk duvar ile da arasında değildir; sonraki bir sözünden öncedir.",
          ],
        },
        {
          sentence: "Duvar da boyandı.",
          context: "Oda ve tavanın yanında duvarın da boyandığı söyleniyor.",
          tokens: ["Duvar", "da", "boyandı."],
          groups: [
            {
              label: "Sözcük",
              members: [0],
              joined: false,
            },
            {
              label: "Bağımsız bağlaç",
              members: [1],
              joined: false,
            },
            {
              label: "Yargı",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 1,
              to: 0,
              label: "Ekleme",
            },
            {
              from: 0,
              to: 2,
              label: "Boyanan",
            },
          ],
          focus: 1,
          decision: "Ekleme bağlacı ayrı",
          reason:
            "Duvar da, duvarı boyanan varlıklar arasına ekler; da ayrı yazılan bağlaçtır.",
          evidence: [
            "Bu cümlede duvar bir yer tamlayıcısı değil, boyanan varlıktır.",
            "Bağlaç ta biçimine dönmez ve kesmeyle ayrılmaz.",
          ],
        },
      ],
    },
    {
      id: "ki",
      label: "Ki: adı niteleyen ek ve yargı bağlacı",
      frames: [
        {
          sentence: "Evdeki anahtar kayıp.",
          context:
            "Hangi anahtarın kayıp olduğu, evde bulunma ilişkisiyle belirleniyor.",
          tokens: ["Ev", "de", "ki", "anahtar", "kayıp."],
          groups: [
            {
              label: "Tek sözcük",
              members: [0, 1, 2],
              joined: true,
            },
            {
              label: "Nitelenen ad",
              members: [3],
              joined: false,
            },
            {
              label: "Yargı",
              members: [4],
              joined: false,
            },
          ],
          relations: [
            {
              from: 1,
              to: 0,
              label: "Bulunma",
            },
            {
              from: 2,
              to: 3,
              label: "Niteleme",
            },
            {
              from: 3,
              to: 4,
              label: "Yargının konusu",
            },
          ],
          focus: 2,
          decision: "Niteleyen ek bitişik",
          reason:
            "Ev-de-ki sözü anahtar adını belirler. -ki ek olarak aynı sözcüğe bitişir; ardından nitelenen ad gelir.",
          evidence: [
            "Hangi anahtar? Evdeki anahtar.",
            "Ekleri ayıran şema çizgileri normal yazıda boşluk olduğu anlamına gelmez.",
          ],
        },
        {
          sentence: "Belli ki anahtar kayıp.",
          context:
            "Bir çıkarım bildiriliyor; belli sözü ile anahtarın kayıp olması arasında yargı bağı kuruluyor.",
          tokens: ["Belli", "ki", "anahtar", "kayıp."],
          groups: [
            {
              label: "İlk bildirim",
              members: [0],
              joined: false,
            },
            {
              label: "Bağlaç",
              members: [1],
              joined: false,
            },
            {
              label: "Ad",
              members: [2],
              joined: false,
            },
            {
              label: "İkinci yargı",
              members: [3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 1,
              to: 0,
              label: "İlk yargı",
            },
            {
              from: 1,
              to: 3,
              label: "Bağlanan yargı",
            },
            {
              from: 2,
              to: 3,
              label: "Yargının konusu",
            },
          ],
          focus: 1,
          decision: "Yargı bağlacı ayrı",
          reason:
            "Belli ki sözündeki ki yargıları bağlayan bağlaçtır; belli veya anahtar sözüne eklenmez.",
          evidence: [
            "Buradaki ki, anahtar adını doğrudan niteleyen ek değildir.",
            "Belki gibi kalıplaşmış biçimler bu serbest bağlacın yazımını değiştirmez.",
          ],
        },
      ],
    },
    {
      id: "ilgi",
      label: "Ki: adın yerini tutma ve cümle bağlantısı",
      frames: [
        {
          sentence: "Benimki masada.",
          context:
            "İki kişinin dosyaları konuşuluyor; konuşan kendi dosyasının masada olduğunu bildiriyor.",
          tokens: ["Ben", "im", "ki", "masada."],
          groups: [
            {
              label: "Adın yerini tutan söz",
              members: [0, 1, 2],
              joined: true,
            },
            {
              label: "Yargı",
              members: [3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 1,
              to: 0,
              label: "Aidiyet",
            },
            {
              from: 2,
              to: 3,
              label: "Benim dosyam",
            },
          ],
          focus: 2,
          decision: "İlgi zamiri bitişik",
          reason:
            "Benim-ki, benim dosyam anlamını karşılayan ilgi zamiridir. Dosya adı yerine bu tek sözcük kullanılır.",
          evidence: [
            "Adı açıkça yazılmayan varlık, bu bağlamda dosyadır.",
            "Benimki bir yargı bağlacı değildir; aidiyet ilişkisini taşıyarak adın yerini tutar.",
          ],
        },
        {
          sentence: "Biliyorum ki dosya masada.",
          context: "Konuşan dosyanın masada olduğunu bildiğini söylüyor.",
          tokens: ["Biliyorum", "ki", "dosya", "masada."],
          groups: [
            {
              label: "İlk yargı",
              members: [0],
              joined: false,
            },
            {
              label: "Bağlaç",
              members: [1],
              joined: false,
            },
            {
              label: "Ad",
              members: [2],
              joined: false,
            },
            {
              label: "Bağlanan yargı",
              members: [3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 1,
              to: 0,
              label: "Bilme yargısı",
            },
            {
              from: 1,
              to: 3,
              label: "Bilinen içerik",
            },
            {
              from: 2,
              to: 3,
              label: "İçeriğin konusu",
            },
          ],
          focus: 1,
          decision: "Yargı bağlacı ayrı",
          reason:
            "Biliyorum ki sözünde ki, bilme yargısıyla dosyanın masada olması arasındaki bağı kurar; ayrı yazılır.",
          evidence: [
            "Bu ki dosya adının yerini tutmaz.",
            "İki cümlede aynı ses bulunmasına rağmen aidiyet ve yargı bağlantısı farklıdır.",
          ],
        },
      ],
    },
    {
      id: "mi",
      label: "Mı/mi: soru ve pekiştirme",
      frames: [
        {
          sentence: "Hazır mısın?",
          context:
            "Konuşan diğer kişiden hazır olup olmadığına cevap vermesini bekliyor.",
          tokens: ["Hazır", "mı", "sın?"],
          groups: [
            {
              label: "Ad yüklemi tabanı",
              members: [0],
              joined: false,
            },
            {
              label: "Soru ve kişi",
              members: [1, 2],
              joined: true,
            },
          ],
          relations: [
            {
              from: 1,
              to: 0,
              label: "Soru",
            },
            {
              from: 2,
              to: 1,
              label: "Kişi eki",
            },
          ],
          focus: 1,
          decision: "Ayrı mı: doğrudan soru",
          reason:
            "Mı hazır sözünden ayrıdır; ardından gelen -sın ona bitişir. Cümle gerçekten cevap istediği için soru işaretiyle biter.",
          evidence: [
            "Normal yazım hazır mısın biçimindedir; hazırmısın veya hazır mı sın olmaz.",
            "İkinci tekil kişi, mı parçasından sonraki ekle gösterilir.",
          ],
        },
        {
          sentence: "Güzel mi güzel!",
          context:
            "Konuşan güzelliği pekiştiriyor; dinleyiciden evet veya hayır cevabı istemiyor.",
          tokens: ["Güzel", "mi", "güzel!"],
          groups: [
            {
              label: "İlk sıfat",
              members: [0],
              joined: false,
            },
            {
              label: "Pekiştirme parçası",
              members: [1],
              joined: false,
            },
            {
              label: "Tekrarlanan sıfat",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 1,
              to: 0,
              label: "Pekiştirme",
            },
            {
              from: 1,
              to: 2,
              label: "Tekrar bağı",
            },
          ],
          focus: 1,
          decision: "Ayrı mi: pekiştirme",
          reason:
            "Mi bu bağlamda pekiştirme yapar ve yine ayrı yazılır. Görevin değişmesi yazımdaki boşluğu ortadan kaldırmaz.",
          evidence: [
            "Soru parçasının ayrı yazımı her kullanımda doğrudan soru olduğu anlamına gelmez.",
            "Güzelmi güzel bitişik yazımı uygun değildir.",
          ],
        },
      ],
    },
    {
      id: "tarih",
      label: "Ay adı: belirli tarih ve genel zaman",
      frames: [
        {
          sentence: "Toplantı 12 Mayıs 2027’de.",
          context:
            "Ay adı, belirli bir gün ve yılın bulunduğu tam tarihin parçasıdır.",
          tokens: ["Toplantı", "12", "Mayıs", "2027’de."],
          groups: [
            {
              label: "Konu",
              members: [0],
              joined: false,
            },
            {
              label: "Belirli tarih",
              members: [1, 2, 3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 1,
              to: 2,
              label: "Gün ve ay",
            },
            {
              from: 2,
              to: 3,
              label: "Ay ve yıl",
            },
            {
              from: 0,
              to: 3,
              label: "Toplantı tarihi",
            },
          ],
          focus: 2,
          decision: "Belirli tarihte büyük harf",
          reason:
            "Mayıs burada belirli tarih bildirdiği için büyük harfle başlar. Ay yazıyla verildiği için önünde ve arkasında tarih noktası yoktur.",
          evidence: [
            "Tarih 12 Mayıs 2027’dir.",
            "Cümlenin başında olduğu için değil, tarihin parçası olduğu için Mayıs büyük yazılır.",
          ],
        },
        {
          sentence: "Her mayıs bahçe canlanır.",
          context:
            "Her yıl yinelenen genel bir aydan söz ediliyor; belirli gün ve yıl yoktur.",
          tokens: ["Her", "mayıs", "bahçe", "canlanır."],
          groups: [
            {
              label: "Genel zaman",
              members: [0, 1],
              joined: false,
            },
            {
              label: "Özne",
              members: [2],
              joined: false,
            },
            {
              label: "Yargı",
              members: [3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Genelleme",
            },
            {
              from: 1,
              to: 3,
              label: "Zaman",
            },
            {
              from: 2,
              to: 3,
              label: "Özne",
            },
          ],
          focus: 1,
          decision: "Genel ay adında küçük harf",
          reason:
            "Mayıs sözü bu cümlede genel ay adıdır ve küçük yazılır. Önündeki her sözü bütün yıllardaki yinelenmeyi anlatır.",
          evidence: [
            "Belirli bir takvim tarihi yoktur.",
            "Genel ay adının da cümle başında bulunması hâlinde ilk harfi büyüyebilir; bu örnek cümle ortasını ele alır.",
          ],
        },
      ],
    },
    {
      id: "ses",
      label: "Yardımcı fiil: türeyen ses ve ayrı yazım",
      frames: [
        {
          sentence: "Onu affetmek kolay değildi.",
          context:
            "Af ile etmek birleşince ikinci bir f sesi ortaya çıkmıştır.",
          tokens: ["Onu", "af", "f", "et", "mek", "kolay değildi."],
          groups: [
            {
              label: "Etkilenen kişi",
              members: [0],
              joined: false,
            },
            {
              label: "Tek birleşik sözcük",
              members: [1, 2, 3, 4],
              joined: true,
            },
            {
              label: "Yargı",
              members: [5],
              joined: false,
            },
          ],
          relations: [
            {
              from: 2,
              to: 1,
              label: "Türeyen f sesi",
            },
            {
              from: 1,
              to: 3,
              label: "Birleşme",
            },
            {
              from: 0,
              to: 3,
              label: "Etkilenen",
            },
            {
              from: 3,
              to: 5,
              label: "Eylem adı",
            },
          ],
          focus: 2,
          decision: "Ses olayıyla bitişik",
          reason:
            "Af + etmek birleşmesi ikinci f sesiyle affetmek olur ve bitişik yazılır. Şemadaki ayrı f, türemeyi görünür kılar; bağımsız bir ek veya sözcük değildir.",
          evidence: [
            "Af + f + et + mek → affetmek.",
            "Ekleri gösteren öğretim parçaları gerçek yazıda boşlukla ayrılmaz.",
          ],
        },
        {
          sentence: "Not etmek yararlıydı.",
          context:
            "Bir bilgiyi kayda geçirme eylemi anlatılıyor; not ile etmek arasında ses düşmesi veya türemesi yoktur.",
          tokens: ["Not", "et", "mek", "yararlıydı."],
          groups: [
            {
              label: "İlk sözcük",
              members: [0],
              joined: false,
            },
            {
              label: "İkinci sözcük",
              members: [1, 2],
              joined: true,
            },
            {
              label: "Yargı",
              members: [3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Yardımcı fiille birleşme",
            },
            {
              from: 1,
              to: 3,
              label: "Eylem adı",
            },
          ],
          focus: 0,
          decision: "Ses olayı olmadan ayrı",
          reason:
            "Not etmek anlamca birlikte bir eylemi karşılar ama bu birleşmede ses olayı yoktur; not ve etmek ayrı yazılır.",
          evidence: [
            "Not + etmek → not etmek.",
            "Anlamca bütün olmak tek başına her yardımcı fiilli yapının bitişmesi için yeterli değildir.",
          ],
        },
      ],
    },
    {
      id: "birtakim",
      label: "Bir takım: sayılan set ve belirsizlik",
      frames: [
        {
          sentence: "Bir takım forma aldım.",
          context:
            "Bir takımın bütün oyuncuları için tek bir set forma alındığı anlatılıyor.",
          tokens: ["Bir", "takım", "forma", "aldım."],
          groups: [
            {
              label: "Sayı",
              members: [0],
              joined: false,
            },
            {
              label: "Set",
              members: [1],
              joined: false,
            },
            {
              label: "İçerik",
              members: [2],
              joined: false,
            },
            {
              label: "Yargı",
              members: [3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Bir set",
            },
            {
              from: 1,
              to: 2,
              label: "Sayılmış bütün",
            },
            {
              from: 2,
              to: 3,
              label: "Alınan",
            },
          ],
          focus: 0,
          decision: "Bir takım: sayılan set",
          reason:
            "Bir gerçek sayı, takım ise set anlamı taşır. Bir takım ifadesi bu bağlamda ayrı yazılır.",
          evidence: [
            "Kaç takım? Bir takım.",
            "Aynı ses dizisinin belirsizlik anlamındaki biçimiyle bu sayılan seti eşitleme.",
          ],
        },
        {
          sentence: "Birtakım sorunlar çıktı.",
          context:
            "Kaç tane olduğu belli olmayan bazı sorunlar ortaya çıktığı söyleniyor.",
          tokens: ["Bir", "takım", "sorunlar", "çıktı."],
          groups: [
            {
              label: "Tek belirsizlik sözü",
              members: [0, 1],
              joined: true,
            },
            {
              label: "Ad",
              members: [2],
              joined: false,
            },
            {
              label: "Yargı",
              members: [3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Kalıplaşmış birleşme",
            },
            {
              from: 1,
              to: 2,
              label: "Belirsiz miktar",
            },
            {
              from: 2,
              to: 3,
              label: "Ortaya çıkan",
            },
          ],
          focus: 0,
          decision: "Birtakım: belirsiz miktar",
          reason:
            "Birtakım, bazı anlamında yerleşik belirsizlik sıfatıdır ve tek sözcük olarak bitişik yazılır. Şemadaki iki parça yazımı kıyaslamak içindir; ayrı iki cümle sözcüğü değildir.",
          evidence: [
            "Burada kaç takım sorusuyla sayılmış bir set bulunmaz.",
            "Gerçek boşluk Birtakım sözünden sonra, sorunlar adından öncedir.",
          ],
        },
      ],
    },
  ],
  "noktalama-isaretleri": [
    {
      id: "virgul",
      label: "Virgül: bağımsız özne ve niteleme",
      frames: [
        {
          sentence: "Yaralı, adama seslendi.",
          context: "Yaralı olan kişi, başka bir adama sesleniyor.",
          tokens: ["Yaralı,", "adama", "seslendi."],
          groups: [
            {
              label: "Özne",
              members: [0],
              joined: false,
            },
            {
              label: "Yer tamlayıcısı",
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
            },
            {
              from: 1,
              to: 2,
              label: "Yer tamlayıcısı",
            },
          ],
          focus: 0,
          decision: "Virgülle bağımsız özne",
          reason:
            "Yaralı, yaralı kişi anlamında adlaşmış sıfat ve öznedir. Virgül, bu sözü adama sözüne niteleyici olarak bağlamayı önler.",
          evidence: [
            "Kim seslendi? Yaralı kişi.",
            "Adama ayrı bir ögedir; hangi adama sorusunun nitelemesi burada Yaralı değildir.",
          ],
        },
        {
          sentence: "Yaralı adama seslendi.",
          context:
            "Cümlede adı söylenmeyen bir kişi, yaralı olan adama sesleniyor.",
          tokens: ["Yaralı", "adama", "seslendi."],
          groups: [
            {
              label: "Bir sıfat tamlaması",
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
              label: "Niteleme",
            },
            {
              from: 1,
              to: 2,
              label: "Yer tamlayıcısı",
            },
          ],
          focus: 0,
          decision: "Virgülsüz niteleme",
          reason:
            "Yaralı, adama sözünü niteler; yaralı adama bütünü yer tamlayıcısı olur. Seslenen özne bu cümlede açık değildir.",
          evidence: [
            "Hangi adama? Yaralı adama.",
            "Kim seslendi? Bağlamdaki gizli kişi; yaralı sözü bu kullanımda özne değildir.",
          ],
        },
      ],
    },
    {
      id: "takim",
      label: "Noktalı virgül: üyeliği değişen takım",
      frames: [
        {
          sentence: "Takımlar şöyle: Ece, Can; Ada, Deniz.",
          context:
            "İki nokta listeyi başlatır; noktalı virgül iki takımın sınırıdır.",
          tokens: ["Ece", "Can", "Ada", "Deniz"],
          groups: [
            {
              label: "Birinci takım",
              members: [0, 1],
              joined: false,
            },
            {
              label: "İkinci takım",
              members: [2, 3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Aynı takım",
            },
            {
              from: 2,
              to: 3,
              label: "Aynı takım",
            },
          ],
          focus: 1,
          decision: "Can birinci takımda",
          reason:
            "Birinci takım Ece ile Can; ikinci takım Ada ile Deniz’dir. Virgüller takım içindeki kişileri, noktalı virgül takımları ayırır.",
          evidence: [
            "Birinci takımın üye sayısı 2; ikinci takımın üye sayısı 2.",
            "Toplam dört kişi vardır; kişilerden hiçbiri kaybolmaz.",
          ],
        },
        {
          sentence: "Takımlar şöyle: Ece; Can, Ada, Deniz.",
          context:
            "Aynı dört kişi korunuyor; takım sınırı Can adından önceye taşındı.",
          tokens: ["Ece", "Can", "Ada", "Deniz"],
          groups: [
            {
              label: "Birinci takım",
              members: [0],
              joined: false,
            },
            {
              label: "İkinci takım",
              members: [1, 2, 3],
              joined: false,
            },
          ],
          relations: [
            {
              from: 1,
              to: 2,
              label: "Aynı takım",
            },
            {
              from: 2,
              to: 3,
              label: "Aynı takım",
            },
          ],
          focus: 1,
          decision: "Can ikinci takımda",
          reason:
            "Can artık Ada ve Deniz ile ikinci takımdadır; birinci takım yalnız Ece’dir. Noktalı virgülün yeri gerçek gruplama bilgisini değiştirir.",
          evidence: [
            "Birinci takımın üye sayısı 1; ikinci takımın üye sayısı 3.",
            "Takımı değişen tek kişi Can’dır; Ece ilk, Ada ve Deniz ikinci takımda kalır.",
          ],
        },
      ],
    },
    {
      id: "soru",
      label: "Soru işareti: doğrudan soru ve bildirilen içerik",
      frames: [
        {
          sentence: "Dosya nerede?",
          context:
            "Konuşan dinleyiciden dosyanın yerini bildirmesini bekliyor.",
          tokens: ["Dosya", "nerede?"],
          groups: [
            {
              label: "Sorulan varlık",
              members: [0],
              joined: false,
            },
            {
              label: "Soru yüklemi",
              members: [1],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "Sorulan yer",
            },
          ],
          focus: 1,
          decision: "Doğrudan soru: soru işareti",
          reason:
            "Nerede bu cümlede doğrudan soru yüklemidir. Cümlenin iletişim amacı cevap istemektir; sonuna soru işareti gelir.",
          evidence: [
            "İstenen bilgi dosyanın yeridir.",
            "Bu bağımsız soru, başka bir bildirme yükleminin nesnesi değildir.",
          ],
        },
        {
          sentence: "Dosyanın nerede olduğunu biliyorum.",
          context:
            "Konuşan dosyanın yerini bildiğini söylüyor; doğrudan cevap istemiyor.",
          tokens: ["Dosyanın", "nerede olduğunu", "biliyorum."],
          groups: [
            {
              label: "Bilinen içerik",
              members: [0, 1],
              joined: false,
            },
            {
              label: "Temel yargı",
              members: [2],
              joined: false,
            },
          ],
          relations: [
            {
              from: 0,
              to: 1,
              label: "İçeriğin konusu",
            },
            {
              from: 1,
              to: 2,
              label: "Bilinen içerik",
            },
          ],
          focus: 1,
          decision: "Dolaylı soru içinde bildirme: nokta",
          reason:
            "Nerede olduğunu öbeği biliyorum yükleminin içeriğini karşılar. Temel yargı bir bildirme olduğu için bütün cümle noktayla biter.",
          evidence: [
            "Nerede sözcüğünün bulunması bütün cümleyi doğrudan soru yapmaz.",
            "Temel yargı biliyorum; bilinen içerik dosyanın nerede olduğudur.",
          ],
        },
      ],
    },
    {
      id: "arasoz",
      label: "Ara söz: açıklama ve normal sıfat tamlaması",
      frames: [
        {
          sentence: "Ece, yeni kaptan, konuştu.",
          context:
            "Yeni kaptan sözleri Ece’nin kim olduğunu açıklayan bir ara söz olarak sunuluyor.",
          tokens: ["Ece,", "yeni kaptan,", "konuştu."],
          groups: [
            {
              label: "Özne",
              members: [0],
              joined: false,
            },
            {
              label: "Ara açıklama",
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
              from: 1,
              to: 0,
              label: "Ece’yi açıklar",
            },
            {
              from: 0,
              to: 2,
              label: "Özne",
            },
          ],
          focus: 1,
          decision: "Çift virgülle ara açıklama",
          reason:
            "Yeni kaptan, Ece hakkında ek bilgidir ve iki yandan virgülle ayrılır. Çıkarılınca Ece konuştu ana cümlesi kalır.",
          evidence: [
            "İlk virgül açıklamayı başlatır, ikinci virgül kapatır.",
            "Ara söz bir sıfat tamlaması biçiminde olsa bile ana cümlenin ayrı yeni öznesi değildir.",
          ],
        },
        {
          sentence: "Yeni kaptan konuştu.",
          context:
            "Kimin konuştuğu doğrudan yeni kaptan özne öbeğiyle belirtiliyor; ek ara açıklama yoktur.",
          tokens: ["Yeni", "kaptan", "konuştu."],
          groups: [
            {
              label: "Özne öbeği",
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
              label: "Niteleme",
            },
            {
              from: 1,
              to: 2,
              label: "Özne",
            },
          ],
          focus: 0,
          decision: "Sıfat tamlaması bölünmez",
          reason:
            "Yeni kaptan, cümlenin özne öbeğidir; yeni sıfatı kaptan adını niteler. Bu öbeğin içini ara söz gibi çift virgülle bölmeyiz.",
          evidence: [
            "Hangi kaptan? Yeni kaptan.",
            "Ana yargının öznesini kuran sıfat tamlaması, ek ara sözle aynı değildir.",
          ],
        },
      ],
    },
  ],
};
export function turkishCases016(lessonId: string): readonly TurkishCase016[] {
  const cases = authoredCases016[lessonId];
  if (!cases)
    throw new RangeError("Bu model için hazırlanmış bir ünite seçilmeli.");
  return cases;
}
export function buildTurkishScene016(
  lessonId: string,
  caseId: string,
  changed: boolean,
  selected?: number,
) {
  const pair = turkishCases016(lessonId).find((item) => item.id === caseId);
  if (!pair)
    throw new RangeError("Bu ünitede hazırlanmış bir cümle çifti seçilmeli.");
  if (typeof changed !== "boolean")
    throw new RangeError("Cümle dönüşümü açık veya kapalı olmalı.");
  const frame = pair.frames[changed ? 1 : 0];
  const index = selected ?? frame.focus;
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
export const turkishExplorationDefaults016 = {
  pair: "de",
  changed: false,
  selected: -1,
  guess: "",
  reason: "",
  show: false,
  compared: false,
};
