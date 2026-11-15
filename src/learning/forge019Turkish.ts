import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
type GuideSpec019 = LessonGuide & { title: string };
const guideSpecs019: GuideSpec019[] = [
  {
    id: "yardimci-dusunce",
    title: "Yardımcı düşünce: her yargıya kanıt bul",
    minutes: 70,
    objectives: [
      "Yardımcı düşünceyi ana savı açıklayan ayrıntı olarak belirle.",
      "Değinileni, çıkarılabileni, çelişeni ve belirlenemeyeni ayır.",
      "Nicelik, olasılık, koşul ve zaman sınırlarını koru.",
    ],
    sections: [
      {
        title: "Ana savın çevresindeki düşünceler",
        paragraphs: [
          "Bir paragrafın ana düşüncesi, yazarın okura iletmek istediği temel yargıdır. Yardımcı düşünceler bu yargıyı açıklar, gerekçelendirir, örnekler veya sınırlar. Bir düşüncenin yardımcı olması onun önemsiz veya yanlış olduğu anlamına gelmez. Ana sav ile parçadaki diğer bilgilerin hangi ilişki içinde bulunduğunu gösterebilmelisin.",
          "Örneğin bir metin kent arşivlerinin kolay erişilebilir olması gerektiğini savunabilir. Yıl etiketlerinin aramayı hızlandırması ve katalogların farklı yerlerden taranabilmesi bu savı destekleyen ayrı bilgilerdir. Bir seçenek bu ayrıntılardan yalnız birini doğru söylüyorsa yardımcı düşünce olabilir; aynı seçenek bütün metnin ana düşüncesi olmak zorunda değildir.",
        ],
      },
      {
        title: "İlk okumada bilgileri yerleştir",
        paragraphs: [
          "Şu kısa parçayı adım adım inceleyelim: “Mahalle kütüphanesi 1990’da açıldı. Giderlerin yalnız yarısını mahalleli, kalanını belediye karşıladı. Yenilemeden sonra çocuklar için haftalık buluşmalar başladı.” İlk okumada konu kütüphanedir. Üç cümle üç ayrı bilgi verir: kuruluş, yenileme gideri ve çocuk etkinliği. Bunları birbirine karıştırmadan ayrı birer bilgi olarak tut.",
          "İkinci okumada her bilgiye kısa bir soru yönelt: ne zaman açıldı, gider nasıl paylaşıldı, yenilemeden sonra ne başladı? Cevaplar sırasıyla 1990, yarı yarıya iki katkı ve haftalık çocuk buluşmalarıdır. Bu işlem henüz bir seçenek eleme değildir; metnin ne söylediğini açık bir zemine yerleştirir. Yardımcı düşünce sorusunda değerlendireceğin iddialar bu zemine dayanır.",
        ],
      },
      {
        title: "Bir iddiayı kanıt cümlesine bağla",
        paragraphs: [
          "Şimdi “Çocuklar için düzenli bir etkinlik başlatılmıştır.” iddiasını al. Çocuklar sözü üçüncü cümlede aynı grubu gösterir; haftalık sözü düzenli tekrarı, başladı sözü etkinliğin başlatılmasını bildirir. İddianın üç parçası da aynı cümlede karşılık bulduğu için destek bağı kurulabilir. İddia metnin tümünün özeti değil, bir yardımcı bilgidir.",
          "Başka bir iddia birden fazla cümleyle desteklenebilir. “Atölyeye katılan herkes taslak verdi. Ece de katıldı.” bilgisinde Ece’nin taslak verdiğini iki cümleyi birleştirerek bulursun. Kanıt haritası bu yüzden yalnız sözcük benzerliği değildir: kimi sonuç açık yeniden söyleyiş, kimi sonuç açık öncülleri birleştirme işlemidir. Her adımda kullandığın öncülü belirt.",
        ],
      },
      {
        title: "Seçenekleri aynı ölçütle karşılaştır",
        paragraphs: [
          "Olumlu bir yardımcı düşünce sorusunda beş iddiayı sırayla değerlendir. Her biri için metindeki karşılığı, ilişkinin türünü ve kapsamı not et. Doğrudan verilen veya sağlam çıkarımla desteklenen iddia adaydır. Olumsuz kökte ise aynı denetim yapılır fakat aranan, metnin dayanak vermediği iddiadır; yöntem değişmez, hedef değişir.",
          "Kütüphane parçasında “Düzenli çocuk etkinliği başladı.” desteklidir. “Giderlerin tamamı mahalleliye aittir.” verilen paylaşımla çelişir. “Kentteki en eski kütüphanedir.” için karşılaştırma bilgisi yoktur. Bu üç sonuca ayrı adlar vererek ilerlemek hem doğruyu açıklamana hem de kendi yanlış gerekçeni düzeltmene yardım eder. Son kontrolde kökün olumlu mu olumsuz mu olduğunu yeniden oku.",
        ],
      },
      {
        title: "Değinilmiş olmak neyi gerektirir?",
        paragraphs: [
          "“Bu parçada hangisine değinilmemiştir?” sorusu, hangi başlığın veya bilginin metinde yer almadığını araştırır. İfade metindeki sözcüklerle birebir aynı olmak zorunda değildir; açık bir yeniden söyleyiş de değinilen bilgiyi taşıyabilir. Bununla birlikte metinde olmayan bir karşılaştırmayı sırf konuya yakın diye var kabul edemezsin.",
          "“Kütüphane 1990 yılında açıldı.” cümlesinde kuruluş zamanına değinilir. Bu bilgi kütüphanenin bölgenin en eski kütüphanesi olduğunu söylemez; başka kütüphanelerin kuruluş tarihleri yoktur. Tarihi görmek ile bir yaş sıralaması kurmak iki ayrı işlemdir. Her seçeneğe karşılık gelen cümleyi bul; bulamadığında önce aynı anlamın farklı sözlerle verilip verilmediğini kontrol et.",
        ],
      },
      {
        title: "Çıkarım ile dış bilgi farklıdır",
        paragraphs: [
          "Bir çıkarım metindeki bilgilerden ve bu bilgilerin açık ilişkilerinden doğmalıdır. “Salondaki bütün sandalyeler doluydu.” cümlesi, salonda oturan insanlar bulunduğunu destekler; salonun kentin en büyük salonu olduğunu desteklemez. Dünya hakkındaki bir bilginin doğru olması, o bilginin bu metnin çıkarımı olması için tek başına yeterli değildir.",
          "Soruyu çözerken “Ben bunu biliyorum.” yerine “Bu sonuca hangi cümlelerle ulaşıyorum?” diye sor. İki ayrı öncülün birleştirilmesi gerekebilir. Ece bütün gün okuldaydı ve toplantı aynı gün başka şehirde yüz yüze yapıldıysa Ece toplantıya yüz yüze katılmamıştır; fakat çevrim içi katılım hakkında bilgi yoksa onu da kesin dışlayamazsın.",
        ],
      },
      {
        title: "Desteklenmeyen her yargı yanlış değildir",
        paragraphs: [
          "Üç durumu ayrı düşün: metin bir yargıyı destekleyebilir, ona aykırı bir bilgi verebilir veya karar vermek için yeterli bilgi sunmayabilir. Sonuncusu yargının gerçek dünyada yanlış olduğunu göstermez. “Ulaşılamaz” kökünde hem metne aykırı hem de kanıtı olmayan seçenekler aday olabilir; tek doğruyu belirlemek için bütün seçenekler denetlenir.",
          "“Müze salı günleri kapalıdır.” bilgisine karşı “Salı günü açıktır.” yargısı metinle çelişir. “Müzenin on çalışanı vardır.” ise çalışan sayısı hiç verilmediyse belirlenemez. İki seçeneğin de neden metinden çıkarılamadığını farklı gerekçelerle açıklarsın. Hazırlanmış sorularda birden çok böyle seçenek varsa soru kusurlu olabilir; çözüm için olmayan bir öncül uydurulmaz.",
        ],
      },
      {
        title: "Bazı, bütün ve yalnız sınırları",
        paragraphs: [
          "“Bazı öğrenciler yürüyerek geldi.” cümlesi en az bir öğrencinin yürüyerek geldiğini bildirir. Diğerlerinin kesinlikle yürümediğini söylemez. “Yalnız üç öğrenci yürüdü.” ise açık bir sayı sınırı taşır. Bu sözcükleri atmak ya da eklemek, benzer görünen seçeneklerin mantıksal kapsamını değiştirir.",
          "“Giderlerin bir bölümünü mahalleli karşıladı.” sözü günlük kullanımda sınırlı katkıyı düşündürse de kesin dışlama gereken soruda kalan bölümün kimce karşılandığı açık verilmelidir. “Giderlerin yalnız yarısını mahalleli, kalanını belediye karşıladı.” ifadesi bütün giderlerin mahalleliye ait olduğu yargısını açıkça dışlar. Kesin kararını kesin öncüle dayandır.",
        ],
      },
      {
        title: "Büyük ile en büyük aynı değildir",
        paragraphs: [
          "Bir nesnenin büyük, önemli veya yaygın olduğunun söylenmesi, onun bütün benzerleri arasında birinci olduğunu göstermez. “Kentin önemli müzelerinden biri” ile “Kentin en önemli müzesi” aynı yargı değildir. İkincisi bütün ilgili müzeleri kapsayan bir sıralama iddiası ekler; metin bu sıralamayı vermiyorsa sonuç güçlendirilmiştir.",
          "Seçeneklerde özellikle en, tek, ilk, son ve hiçbir sözcüklerini izle. Bir kurumun kuruluş yılının verilmesi onun ilk kurum olduğunu kanıtlamaz. Bir araştırmanın ilgi görmesi de bütün araştırmalardan çok ilgi gördüğünü göstermez. Karşılaştırma için hangi varlıkların ve hangi ölçütün gerektiğini açıkça söylemek, bu çeldiricileri ayırmanı sağlar.",
        ],
      },
      {
        title: "Olabilir ile zorunludur ayrımı",
        paragraphs: [
          "“Düzenli okuma yeni sorular doğurabilir.” yargısı bir imkân bildirir; her okumanın mutlaka yeni soru doğurduğunu söylemez. “Yalnız düzenli okuyanlar soru sorar.” ise ayrıca gereklilik sınırı kurar. Olasılık, yeterlilik ve zorunluluk arasında geçiş yapmak için yeni kanıt gerekir; aynı konu sözcüklerini taşımaları bu farkı gidermez.",
          "“Bilet alırsa etkinliğe girebilir.” cümlesinden kişinin bilet aldığı veya girdiği kesin çıkmaz. Biletin tek koşul olduğunu da cümle söylemez. Metin bu ayrıntıları ayrıca verirse sonuç değişir. Kısa bir çıkarım zinciri kurarken her okun üzerine ilişkiyi yaz: koşul mu, gerçekleşmiş neden mi, yoksa olasılık mı? Böylece sonuçtaki kesinliği kontrol edebilirsin.",
        ],
      },
      {
        title: "Koşullu yargının tersini üretme",
        paragraphs: [
          "“Düzenli aranan belgeler kolay bulunur.” cümlesi, düzenli arama ile kolay bulma arasında verilen yönde bir ilişki kurar. Belgenin kolay bulunması, mutlaka bu yolla arandığını göstermez; belge masanın üstünde de olabilir. Aynı şekilde koşulun gerçekleşmediği durumda sonucun kesinlikle gerçekleşmeyeceğini söylemek, verilmemiş bir ters ilişki ekler.",
          "Bir metin iki yönlü veya tek seçenekli ilişki kurduğunda bunu açıkça belirtir. “Bu kapı yalnız geçerli kartla açılır.” ifadesi ile “Geçerli kartı olan bu kapıyı açabilir.” ifadesi aynı kapsamda değildir. Sorunun verdiği tam sözleri koru; sezgisel olarak benzer gelen iki durumun mantıksal olarak eşdeğer olduğunu varsayma.",
        ],
      },
      {
        title: "Zaman ve kişi sınırlarını koru",
        paragraphs: [
          "“Geçen yıl ziyaretçi sayısı arttı.” bilgisi, bu yılın da arttığını veya bundan sonra hep artacağını göstermez. Bir kişinin belirli bir eseri beğenmesi, o yazarın bütün eserlerini beğendiğini kanıtlamaz. Zaman, yer, kişi ve nesne kapsamını değiştirerek kurulan seçenekler, metindeki bilgiyi daha geniş bir alana taşır.",
          "Kanıt cümlesini seçeneğin yanına koyup kim, ne zaman, nerede ve hangi nesne sorularını karşılaştır. “Bu atölyede üç ay çalışanlar” grubunu “bütün sanatçılar” diye değiştiren seçenek aynı kişileri anlatmaz. Sayı ve zaman ifadelerini ayrı renkle işaretlemek faydalıdır; fakat doğruyu yalnız renkten değil, iki yargının gerçek kapsamından açıklamalısın.",
        ],
      },
      {
        title: "Örnek ile genel sonuç ilişkisi",
        paragraphs: [
          "Bir örnek, yazarın düşüncesini somutlaştırabilir ama tek başına bütün benzer durumları kanıtlamaz. İki mahallenin başarılı uygulamasından söz eden paragraf, örneklerin ortak özelliği açıklandığında daha genel bir savı destekleyebilir. Buna rağmen bütün mahallelerin aynı sonucu aldığı çıkarımı için ek bilgi gerekir.",
          "Örneğin “İki okulda bahçe çalışması öğrencilerin katılımını artırdı.” yargısı bu iki okulda gözlenen bir sonucu verir. Metin daha sonra katılımın hangi koşullarda artabileceğini tartışıyorsa yardımcı düşünce bu koşula bağlıdır. Örnekleri sırf özel ad içeriyor diye gereksiz sayma; ana savın dayanağını taşıyabilirler.",
        ],
      },
      {
        title: "Olumsuz kökü olumluya çevirmeden oku",
        paragraphs: [
          "“Söylenemez, çıkarılamaz, değinilmemiştir” kökleri olumsuz hedeflerdir. Seçeneklerden biri çok açık doğru bilgi taşıdığı için cazip gelebilir; ama sorunun istediği desteklenmeyen yargıdır. Önce kökü kendi sözlerinle yeniden söyle: “Metin hangi seçeneğe dayanak vermiyor?” Sonra beş seçeneği aynı ölçüte göre tara.",
          "Olumsuz kökü fark etmek, seçeneklerin olumsuz cümle olup olmadığına bakmak değildir. “Hiçbir etkinlik yapılmadı.” biçimindeki olumsuz seçenek de metinle desteklenebilir veya çelişebilir. Dil bilgisi olumsuzluğu ile soru hedefinin olumsuzluğunu ayır. Bir seçeneği eledikten sonra hangi cümleyle doğruladığını kısaca kaydet; bütün seçenekleri bitirmeden yalnız bir çağrışıma dayanarak karar verme.",
        ],
      },
      {
        title: "Kanıtla biten çözüm alışkanlığı",
        paragraphs: [
          "Yardımcı düşünce sorusunu çözdüğünde yalnız seçeneğin harfini değil, kanıtın yerini ve ilişkinin türünü söyle. “İkinci cümlede yalnız yarısı deniyor; seçenek bütününü söylüyor.” açıklaması belirli bir hatayı yakalar. “Bana mantıklı geldi.” ise hangi bilgiyi kullandığını göstermediği için başka bir soruya aktarılacak açık bir yöntem vermez.",
          "Bu ünitenin etkileşiminde hazır tam metinler üzerinden desteklenen, çelişen ve belirlenemeyen iddiaları karşılaştırırsın. Seçim ve gerekçe bir öğrenme denemesidir; kendiliğinden ustalık veya puan oluşturmaz. Ardından bağımsız sorularda aynı yöntemi yeni pasajlarla uygula. Takıldığında yalnız cevabı ezberlemek yerine kapsamı değiştiren sözcüğü bulup kendi yanlış çıkarımını yeniden yaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Kuruluş yılı sıralama değildir",
        prompt:
          "Kütüphane 1990’da açıldı. Giderlerin yalnız yarısını mahalleli, kalanını belediye karşıladı. Çocuklar için haftalık buluşmalar başladı. “Bu kütüphane kentin en eskisidir.” çıkarılabilir mi?",
        strategy: "Tarih bilgisini karşılaştırma iddiasından ayır.",
        steps: [
          {
            label: "Verilenleri ayır",
            explanation:
              "Kuruluş yılı ve gider paylaşımı açık; başka kütüphanelerin kuruluş tarihi verilmemiştir.",
          },
          {
            label: "Gerekli kanıtı ara",
            explanation:
              "En eski olmayı söylemek için karşılaştırılan diğer kütüphanelerin tarihlerini bilmek gerekir.",
          },
          {
            label: "Karar ver",
            explanation:
              "Yıl bilgisi doğru olsa da sıralama belirlenemez; yargı metinle kanıtlanmış değildir.",
          },
        ],
        answer: "Belirlenemez.",
        check:
          "Metinde 1990 yılına karşılık gelen bilgiyi bulmak, en eski ifadesindeki sıralamayı sağlamaz.",
        pitfall:
          "Metinde kanıtlanmayan bir yargıyı gerçek dünyada kesin yanlış ilan etme.",
      },
      {
        title: "Katkının sınırı",
        prompt:
          "Giderlerin yalnız yarısını mahalleli, kalanını belediye karşıladı. “Bütün giderleri mahalleli karşıladı.” yargısını denetle.",
        strategy: "Yalnız yarısı ile bütününü karşılaştır.",
        steps: [
          {
            label: "Niceliği bul",
            explanation:
              "Yalnız yarısı sözü katkıyı açıkça sınırlar; kalan bölümün belediyeye ait olduğu ayrıca verilir.",
          },
          {
            label: "Seçeneği çöz",
            explanation:
              "Bütün giderler ifadesi aynı gider toplamının tamamını mahalleliye bağlamaktadır.",
          },
          {
            label: "Çelişkiyi göster",
            explanation:
              "Kalan bölüm belediyece karşılandığı için bütününü mahalleliye yüklemek metne aykırıdır.",
          },
        ],
        answer: "Metinle çelişir.",
        check:
          "Burada dışlama yalnız sezgiye değil, yalnız yarısı ve kalanını belediye sözlerine dayanır.",
        pitfall:
          "Sadece bir bölümü ifadesinden gerektiğinden güçlü kesin dışlama üretme.",
      },
      {
        title: "Olasılık gerçekleşme değildir",
        prompt:
          "Ece bilet bulursa seminere katılabilir. “Ece seminere katılmıştır.” sonucu çıkar mı?",
        strategy: "Koşul, olasılık ve gerçekleşmeyi ayrı tut.",
        steps: [
          {
            label: "Koşulu oku",
            explanation:
              "Bilet bulma gerçekleşmiş bir olay olarak bildirilmemiş; katılım ona bağlanmıştır.",
          },
          {
            label: "Kipi koru",
            explanation:
              "Katılabilir sözü bir imkân bildirir; kesin katıldı biçimine dönüştürülemez.",
          },
          {
            label: "Sonucu sınırla",
            explanation:
              "Metin Ece’nin bilet bulduğunu veya katıldığını vermediği için gerçekleşme belirlenemez.",
          },
        ],
        answer: "Katıldığı çıkarılamaz.",
        check:
          "Ece bilet bulmasa bile başka bir nedenle katılamadı gibi yeni bir olay uydurulmaz.",
        pitfall: "Koşul cümlesini olmuş olay gibi okuma.",
      },
      {
        title: "İki kanıtı birleştirmek",
        prompt:
          "Salı günü müze kapalıdır. Deniz müzeyi salı günü ziyaret etmek istedi. Metne göre Deniz’in isteği müzenin o gün açık olduğunu gösterir mi?",
        strategy: "İstek ile kurumun gerçek durumunu karşılaştır.",
        steps: [
          {
            label: "Kurumu belirle",
            explanation:
              "İlk cümle müzenin salı günü kapalı olduğunu açıkça bildirir.",
          },
          {
            label: "İsteği ayır",
            explanation:
              "Ziyaret etmek istemek, ziyaretin gerçekleştiği veya müzenin açıldığı anlamına gelmez.",
          },
          {
            label: "Karar ver",
            explanation:
              "Kapalı olma bilgisi korunur; Deniz’in isteği bu bilgiyi değiştiren bir öncül değildir.",
          },
        ],
        answer: "Hayır; müze salı kapalıdır.",
        check:
          "Metin özel açılış veya istisna vermediği için böyle bir durum eklenmez.",
        pitfall: "Niyetin gerçekleştiğini varsayarak açık bilgiyi değiştirme.",
      },
    ],
    recall: [
      {
        prompt: "Değinilmemiş ile çelişen aynı şey midir?",
        answer:
          "Hayır. Bir bilgi hiç verilmemiş olabilir; çelişki için metinde ona aykırı dayanak gerekir.",
      },
      {
        prompt:
          "Bazı öğrenciler yürüdü bilgisi diğerlerinin yürümediğini kanıtlar mı?",
        answer: "Hayır; bazı sözü tek başına geri kalanları kesin dışlamaz.",
      },
      {
        prompt: "Bir kuruluş yılı neden en eski olmayı kanıtlamaz?",
        answer:
          "Diğer kuruluşlarla karşılaştırma tarihleri ve karşılaştırmanın kapsamı verilmemiştir.",
      },
      {
        prompt: "Ulaşabilir ifadesini ulaştırır diye değiştirmek ne yapar?",
        answer:
          "Olasılığı kesin sonuca güçlendirir; bunun için ek kanıt gerekir.",
      },
    ],
    source:
      "Aurelia Türkçe 021–024 kopya kâğıtları; MEBİ TYT Türkçe konu özetleri: paragrafta anlam ve yapı; OGM 12. sınıf paragrafta anlam ve yapı sunuları. Anlatımlar, modeller ve sorular uygulama için özgün olarak hazırlanmıştır.",
  },
  {
    id: "ikiye-bolme",
    title: "Paragrafı ikiye bölme: yeni yönü bul",
    minutes: 65,
    objectives: [
      "İkinci paragrafın ilk cümlesini doğru belirle.",
      "Konu ve bakış yönü değişimini örnek, gerekçe ve gönderimden ayır.",
      "Bölmeden sonra iki bloğun da bütünlüğünü denetle.",
    ],
    sections: [
      {
        title: "Bir sınır, iki tutarlı paragraf",
        paragraphs: [
          "İkiye bölme sorusunda bütün cümleler korunur; istenen, metnin hangi noktadan sonra yeni paragraf olarak sürmesi gerektiğidir. İlk bölüm bir düşünceyi tamamlamalı, ikinci bölüm de kendi odağını kurmalıdır. İşlem bir cümleyi metinden atmak değildir. Böylece akışı bozan cümle sorusuyla yüzeyde benzer görünen ama amacı farklı bir iş yaparsın.",
          "Örneğin ilk üç cümle kâğıt belgelerin nemden korunmasını, son üç cümle dijital katalogda arama yöntemlerini anlatabilir. İki bölüm de arşivle ilgilidir; buna rağmen birinde fiziksel koruma, ötekinde bilgiye erişim işlenir. Yeni paragraf için bütünüyle ilgisiz bir konu bekleme. Aynı konunun yeni bir yönü de uygun sınır oluşturabilir.",
        ],
      },
      {
        title: "Tam metinden küçük düşünce grupları kur",
        paragraphs: [
          "Şu düzeni birlikte okuyalım: “Kâğıt belgeler nemden korunmalıdır. Bu amaçla dolaplarda nem izlenir. Ölçümler yıpranma riskini gösterir. Dijital kataloglar belgeye erişimi kolaylaştırır. Yıl etiketleri aramayı hızlandırır.” İlk okumada hepsi arşivle ilgilidir. İkinci okumada ilk üç cümlenin korumayı, son iki cümlenin erişimi açıkladığını fark edersin.",
          "Her cümleyi tek sözcüğe indirmek yerine kısa bir işlevle not et: koruma gereği, koruma aracı, ölçüm yararı, erişim aracı, erişim yararı. Bu notlar iki küçük grubun iç bağını gösterir. Yeni paragraf, ilk grubun son ayrıntısında değil ikinci işlev grubunun tanıtıldığı yerde başlar. Bütün cümleleri gördüğün için yeni yönün sonraki cümlelerle geliştirildiğini de sınayabilirsin.",
        ],
      },
      {
        title: "İki bloğa ayrı birer soru sor",
        paragraphs: [
          "Bir sınır önerdiğinde ilk blok için “Neyi açıklıyor?”, ikinci blok için aynı soruyu sor. Örnekte I–III “Belgeler fiziksel olarak nasıl korunur?”, IV–V “Belgeler nasıl daha kolay bulunur?” sorularını yanıtlar. İki soru hem ortak arşiv konusuna bağlı hem de birbirinden ayrıdır; bu yüzden iki paragraf doğal biçimde kurulabilir.",
          "Aday sınırı III’ten önce koyarsan ölçümün yararı yeni erişim bloğunun başına taşınır. V’ten önce koyarsan erişimi tanıtan IV eski koruma bloğunda kalır. Doğru sınırı bu komşu yanlışlarla karşılaştırmak, cümlelerin hangi gruba ait olduğunu öğretir. Sorunun yanıtı yalnız bir numara değil, iki açıklama odağının birlikte korunmasıdır.",
        ],
      },
      {
        title: "Bölme işlemini görünür yap",
        paragraphs: [
          "Sınırı belirledikten sonra metni gerçekten iki paragraf gibi oku. İlk bloğun son cümlesi önceki açıklamaya bağlanıyor mu? İkinci bloğun ilk cümlesi yeni yönü tanıtıyor mu? Sonraki cümleler o yeni yönü sürdürüyor mu? Bu üç kontrol, özellikle uzun ve benzer konu sözcükleri taşıyan metinlerde yararlıdır.",
          "Etkileşimde sınır seçildiğinde bütün metin iki ayrı alanda yeniden düzenlenir; cümle numaraları ve tam cümleler korunur. Önce kendi gerekçeni söyle, sonra blokların ortak amaçlarını karşılaştır. Yanlış sınırda hangi cümlenin yanlış grupta kaldığını görmek, doğru sınırı ezberlemekten daha güçlü bir öğrenme sağlar. Yeni metinde aynı işlemi bağımsız olarak yeniden uygula.",
        ],
      },
      {
        title: "İlk yeni cümleyi işaretle",
        paragraphs: [
          "“İkinci paragraf hangi cümleyle başlar?” kökünde cevap, ilk paragrafın son cümlesi değil ikinci paragrafın ilk cümlesidir. Sınırı III ile IV arasına koyduysan cevap IV olur. Cümleleri numaralı okumak faydalıdır; fakat yalnız numaraya odaklanıp anlam değişimini atlamak kolay bir işlem hatasına yol açar.",
          "Önce iki bloğu ayrı yazılmış gibi oku: I–III ve IV–VI. Ardından cevabı tam bir cümleyle söyle: “İkinci paragraf IV ile başlar; çünkü fiziksel korumadan erişim düzenine burada geçiliyor.” Bu biçim hem numarayı hem gerekçeyi birlikte denetler. Soru sınırın öncesini başka bir dille sorarsa kökü yeniden okuyup istenen numarayı değiştirmelisin.",
        ],
      },
      {
        title: "Konu sözcüğü değişmeden yön değişebilir",
        paragraphs: [
          "Aynı isim bütün cümlelerde geçse bile cümlelerin metne yaptığı katkı değişebilir. Bir kitap kabının önce koruma işlevi, sonra tasarımla okuru etkilemesi anlatılıyorsa kitap kabı sözü sürer; işlevsel amaçtan görsel sunuma geçilmiştir. Kelime saymak bu ayrımı göstermez, her cümlenin neyi açıkladığını belirlemek gerekir.",
          "Cümlelerin yanına birer kısa işlev yaz: tanıtma, koruma koşulu, bu koşulun sonucu, yeni kullanım, yeni kullanımın örneği. Birbiriyle bağlı küçük kümeler oluştuğunda sınır daha görünür olur. Bu etiketler metnin yerine geçmez; aynı etiketi yazdığın iki cümlenin gerçekten aynı odağa hizmet edip etmediğini tam metinden kontrol et.",
        ],
      },
      {
        title: "Yeni kişi her zaman yeni paragraf değildir",
        paragraphs: [
          "Bir araştırmacının adı ilk kez geçtiğinde otomatik olarak sınır koyma. Önceki görüşün örneği olarak bir kişinin çalışması anlatılabilir; bu durumda özel ad, eski düşünceyi geliştirmeyi sürdürür. Başka bir kişiye geçiş iki ayrı yaklaşımın bağımsız anlatımlarını başlatıyorsa sınır adayı olabilir. Kararı özel adın kendisi değil, taşıdığı işlev belirler.",
          "İlk iki cümlede ortak çalışma savunulup üçüncüde bu yöntemi kullanan Ece örnekleniyorsa üçüncüyü sırf Ece yeni diye ayırmak zayıftır. Dördüncüden itibaren tek başına çalışmanın koşulları ve sonuçları ele alınıyorsa yeni yön orada başlayabilir. İki adayı karşılaştırırken hem önceki hem sonraki cümlenin ortak amacını açıkla.",
        ],
      },
      {
        title: "Örnek, önceki açıklamaya bağlı kalabilir",
        paragraphs: [
          "Örneğin ve söz gelimi gibi ifadeler, çoğunlukla bir önceki genel düşünceyi somutlaştırır. Genel sav ile onun kısa örneğini ayırmak, örneği açıklamasız bırakabilir. Bununla birlikte bir örnek uzun bir alt bölümün başlangıcı da olabilir; bağlaç tek başına kesin yasak veya zorunlu sınır değildir. Tam metnin nasıl geliştiğine bakılmalıdır.",
          "Bir cümlede “Arşivlerin düzenli etiketlenmesi erişimi kolaylaştırır.” denip sonraki cümlede bir arşivin uygulaması anlatılıyorsa bu kısa örneğin eski blokta kalması beklenebilir. Ardından arşivlerin korunmasındaki nem koşulları ele alınıyorsa yön erişimden fiziksel korumaya geçer. Örneğin varlığına değil, açıklanan ana ilişkinin değişmesine dayan.",
        ],
      },
      {
        title: "Gönderme sözlerinin öncülünü izle",
        paragraphs: [
          "Bu yöntem, böylece, söz konusu belge ve bunlar gibi ifadeler başka bir bilgiye dönebilir. Yeni paragrafın ilk cümlesini seçerken bu bağın anlaşılır kalıp kalmadığını kontrol et. Her gönderme ifadesi mutlaka paragrafın başında yasaktır demek doğru değildir; önceki paragrafla bağ kurulabilir veya öncül aynı cümlede açık verilebilir.",
          "Ancak kısa bir sınav metninde tek bir işlemin adı ile hemen sonraki “bu yöntem” açıklamasını gelişigüzel ayırmak çoğu zaman düşünce grubunu parçalar. Önce ifade neye dönüyor, sonra yeni blok gerçekten ayrı yön açıyor mu diye sor. Kaynağı belli bir gönderme ile kaynağı henüz verilmemiş zamiri aynı sorun sayma.",
        ],
      },
      {
        title: "Zaman değişimi tek başına yetmez",
        paragraphs: [
          "Bir paragraf geçmişten bugüne aynı kurumun gelişimini izleyebilir. Cümlede yıl değişmesi, anlatımın zaman çizgisi içinde doğal bir adım olabilir; mutlaka yeni paragraf gerektirmez. Buna karşılık tarihsel gelişim anlatımından bugünkü sorunların ayrı incelemesine geçiliyorsa yeni amaç doğabilir. Zaman bilgisi ancak metnin işleviyle birlikte değerlendirilir.",
          "“1990’da kuruldu, 2000’de yeni binaya taşındı, 2010’da dijital katalog açtı.” çizgisi tek bir gelişim özeti oluşturabilir. Sonraki cümleler ziyaretçinin bugünkü erişim güçlüklerini ve çözümlerini tartışıyorsa burada başka bir açıklama odağı başlar. Takvimdeki sıçramanın büyüklüğünü değil, cümle grubunun hangi soruya cevap verdiğini ara.",
        ],
      },
      {
        title: "Karşılaştırmanın iki yanı nasıl düzenlenir?",
        paragraphs: [
          "Metin iki sanatçıyı, iki yöntemi veya iki dönemi karşılaştırırken önce birini sonra diğerini anlatabilir. Bu yapıda ikinci kişinin ilk ayrıntılı cümlesi yeni paragraf adayıdır. Fakat tek bir cümlelik karşı örnek önceki düşünceyi sınırlıyor da olabilir. Sırf aksine veya buna karşılık sözü gördüğün için bütün bağlamlarda aynı karar verme.",
          "İlk üç cümlede bir yazarın ölüm anlayışı, sonraki üçte diğer yazarın farklı anlayışı ve nedeni ele alınıyorsa iki ayrı odak görülür. Yalnız tek bir karşıt bilgi ana savı niteliyorsa birlikte de kalabilir. Aday sınırın iki yanına kısa başlık koymak, gerçekten iki dengeli açıklama grubu bulunup bulunmadığını sınamana yardım eder.",
        ],
      },
      {
        title: "Genelden özele geçişi doğru oku",
        paragraphs: [
          "Genel bir yargının ayrıntılandırılması çoğu zaman aynı paragrafın doğal gelişimidir. Yeni paragraf her ayrıntıda başlamaz; aksi hâlde her örnek veya gerekçe ayrı bir metin parçasına dönüşürdü. Genel sav, açıklama ve sonuç zincirinin nerede tamamlandığını görmek, yeni yönü erken başlatmanı önler.",
          "Bir metin okuma alışkanlığının önemini söyleyip ardından düzenli zaman ayırma ve uygun ortam bulma yollarını açıklayabilir. Bu cümleler aynı düşüncenin nasıl uygulanacağını gösterebilir. Sonrasında okumada metin seçiminin kültürel etkileri bağımsız biçimde tartışılıyorsa ikinci bir yön doğabilir. İki adaydan hangisinin daha güçlü ortak odak oluşturduğunu karşılaştır.",
        ],
      },
      {
        title: "İki tarafı da sınamadan karar verme",
        paragraphs: [
          "Bir sınırdan önceki cümleler tutarlı görünse bile sonraki blok kopuksa seçimin eksiktir. İkiye bölme iki koşullu bir denetimdir: ilk grubun ortak yönü ve ikinci grubun ortak yönü. Yalnız ilk üç cümleyi okuyarak bütün altı cümle için karar vermek, son bölümün hangi cümleyle açıldığını görmeni engeller.",
          "Sınırı bir cümle sola ve sağa kaydırarak karşılaştır. Erken bölmede örnek genel savından ayrılıyor mu? Geç bölmede yeni yönün ilk cümlesi eski blokta yalnız kalıyor mu? Bu iki karşı deneme, doğru sınırın neden uygun olduğunu gösterir. Etkileşimde bütün cümleler görünür kalırken blokların değişmesini izle; sonuç yalnız doğru numara değildir.",
        ],
      },
      {
        title: "Bölme ile çıkarma arasındaki fark",
        paragraphs: [
          "İkiye bölmede bir cümle farklı göründüğü için metinden silinmez; o cümle yeni bir tutarlı grubun başlangıcı olabilir. Akışı bozan sorusunda ise bir cümle çıkarılınca kalan cümleler tek ana çizgiyi daha iyi sürdürür. İki işlem, farklı sorulara cevap verir ve farklı bir sonuç metni oluşturur.",
          "Örneğin üç cümle korumayı, üç cümle erişimi anlatıyorsa altı cümle iki paragrafta anlamlıdır. Buna araya tek bir yemek tarifi cümlesi girerse sorun ikiye bölmeden çok ilgisiz cümlenin çıkarılması olabilir. Sorunun kökü hangi işlemi istiyorsa onu yap; metni istediğin çözüm türüne uydurmak için cümle saklama veya yok sayma.",
        ],
      },
      {
        title: "Sınırı kısa bir gerekçeyle savun",
        paragraphs: [
          "İyi bir çözüm “IV olur.” demekle bitmez. Önceki blok hangi soruyu yanıtlıyor, yeni blok hangi soruyu yanıtlıyor ve yeni ilk cümle bu değişimi nasıl kuruyor? Bu üç sorunun yanıtı, başka bir paragrafta da kullanabileceğin bir yöntem verir. Yanlış sınırın bıraktığı kopukluğu söylemek de doğruyu açıklamanın parçasıdır.",
          "Yeni sınav metninde cümlelerin uzunluğu veya sıra sayısı değişse bile aynı adımları uygula: tam oku, işlevleri bul, aday sınırı kur, iki bloğu ayrı denetle ve ilk yeni cümleyi işaretle. Bu ünitenin modeli hazırlanmış tam metinleri karşılaştırır; belirli sözcüklere otomatik paragraf yasağı koymaz. Sonraki sorular aynı yöntemi farklı bağlamlarda sınar.",
        ],
      },
    ],
    examples: [
      {
        title: "Koruma ve erişim",
        prompt:
          "(I) Kâğıt belgeler nemden korunmalıdır. (II) Bu amaçla dolaplarda nem izlenir. (III) Düzenli ölçüm fiziksel yıpranmayı erken gösterir. (IV) Dijital kataloglar belgelere erişimi kolaylaştırır. (V) Yıl etiketleri aramayı hızlandırır. İkinci paragraf nerede başlar?",
        strategy: "İki grubun yanıtladığı soruyu bul.",
        steps: [
          {
            label: "İlk odağı kur",
            explanation:
              "İlk üç cümle belgenin fiziksel korunması ve bu amaçla yapılan ölçümlerle ilgilidir.",
          },
          {
            label: "Yeni yönü bul",
            explanation:
              "Dördüncü cümle fiziksel korumadan belgenin bulunmasına ve erişim düzenine geçer.",
          },
          {
            label: "İki bloğu denetle",
            explanation:
              "I–III koruma, IV–V erişim odağını korur; ilk yeni cümle IV olduğundan cevap IV olur.",
          },
        ],
        answer: "IV. cümle.",
        check:
          "III cevabı sınırın son eski cümlesini seçer; soru ilk yeni cümleyi istemektedir.",
        pitfall:
          "İkinci paragraf için arşiv konusunun bütünüyle bırakılmasını bekleme.",
      },
      {
        title: "Örnek aynı çizgiyi sürdürür",
        prompt:
          "(I) Açık etiketler aramayı kolaylaştırır. (II) Örneğin okul arşivinde yıl etiketi kullanılır. (III) Bu etiketler eski defterleri bulmayı hızlandırır. (IV) Belgelerin fiziksel korunmasında nem de izlenmelidir. (V) Bu ölçümler yıpranma riskini gösterir.",
        strategy: "Özel adı değil cümlenin işlevini izle.",
        steps: [
          {
            label: "Örneği bağla",
            explanation:
              "İkinci cümle yeni bir okul adı verse de ilk cümledeki etiketleme düşüncesini örnekler.",
          },
          {
            label: "Göndermeyi bul",
            explanation:
              "Üçüncü cümledeki bu etiketler, ikinci cümlede tanıtılan etiketlere döner.",
          },
          {
            label: "Yönü ayır",
            explanation:
              "Dördüncü cümlede erişimden fiziksel korumaya geçilir; ikinci blok IV ile başlar.",
          },
        ],
        answer: "IV. cümle.",
        check:
          "II’den bölmek örneği genel savdan ayırır ve uygun yeni yönü erken başlatır.",
        pitfall: "Her örneğin otomatik yeni paragraf açtığını düşünme.",
      },
      {
        title: "Aynı nesnenin iki işlevi",
        prompt:
          "(I) Kitap kabı önce kitabı kirden korur. (II) Katlanan kenarları cildi sarar. (III) Böylece taşıma sırasında yüzey daha az yıpranır. (IV) Kitap kabı aynı zamanda görsel tasarım alanıdır. (V) Renk ve çizimler okurun ilk izlenimini etkiler.",
        strategy: "Ortak nesneyle değişen amacı ayır.",
        steps: [
          {
            label: "Ortak adı gör",
            explanation:
              "Kitap kabı iki bölümde de anlatılır; yalnız sözcük tekrarı tek blok zorunluluğu kurmaz.",
          },
          {
            label: "Amaçları adlandır",
            explanation:
              "İlk grup fiziksel koruma, ikinci grup görsel sunum ve ilk izlenim üzerinde durur.",
          },
          {
            label: "Sınırı göster",
            explanation:
              "Yeni tasarım yönü IV ile açılır; V onu açıklar, I–III ise koruma bağını tamamlar.",
          },
        ],
        answer: "IV. cümle.",
        check:
          "V’den bölmek yeni yönün açıldığı IV’ü yanlışlıkla eski blokta bırakır.",
        pitfall: "Aynı isim sürüyorsa hiçbir koşulda paragraf ayrılamaz deme.",
      },
      {
        title: "Karşılaştırmada ikinci odak",
        prompt:
          "(I) Ece çalışırken ayrıntılı bir plan yapar. (II) İşlerini sırayla tamamlamak onu rahatlatır. (III) Bora ise planı yalnız başlangıç taslağı olarak görür. (IV) Yeni bir ihtiyaç doğunca çalışma sırasını değiştirir. (V) Bu esneklik beklenmedik işleri yetiştirmesini sağlar.",
        strategy: "Her kişinin yaklaşımını kendi açıklamasıyla eşleştir.",
        steps: [
          {
            label: "İlk kişiyi izle",
            explanation:
              "İlk iki cümle Ece’nin ayrıntılı planını ve bu planın ona etkisini anlatır.",
          },
          {
            label: "İkinci yaklaşımı bul",
            explanation:
              "Üçüncü cümle Bora’yı ve farklı plan anlayışını tanıtır; sonraki cümleler onu açıklar.",
          },
          {
            label: "Blokları oku",
            explanation:
              "I–II Ece, III–V Bora odağıyla anlamlıdır; ikinci paragraf III ile başlamalıdır.",
          },
        ],
        answer: "III. cümle.",
        check:
          "Yalnız kişi adı değiştiği için değil, ardından iki cümlelik ayrı yaklaşım geliştiği için sınır uygundur.",
        pitfall:
          "Karşılaştırmadaki her kısa karşıt sözü otomatik paragraf sınırı sayma.",
      },
    ],
    recall: [
      {
        prompt: "Sınır III ile IV arasındaysa ikinci paragraf nerede başlar?",
        answer: "IV. cümlede; III ilk paragrafın son cümlesidir.",
      },
      {
        prompt: "Aynı kitap kabı sözü sürerken paragraf ayrılabilir mi?",
        answer:
          "Evet; koruma işlevinden tasarım işlevine gibi yeni bir yöne geçilebilir.",
      },
      {
        prompt: "Yeni kişi adı neden tek başına sınır değildir?",
        answer:
          "Kişi önceki genel savın kısa örneği olabilir; cümlenin işlevi denetlenir.",
      },
      {
        prompt: "Sınırın iki yanında hangi iki koşul aranır?",
        answer:
          "İlk bloğun ortak odağı tamamlanmalı ve ikinci blok kendi tutarlı yönünü kurmalıdır.",
      },
    ],
    source:
      "Aurelia Türkçe 021–024 kopya kâğıtları; MEBİ TYT Türkçe konu özetleri: paragrafta anlam ve yapı; OGM 12. sınıf paragrafta anlam ve yapı sunuları. Anlatımlar, modeller ve sorular uygulama için özgün olarak hazırlanmıştır.",
  },
  {
    id: "akisi-bozan-cumle",
    title: "Akışı bozan cümle: çıkar ve bağı denetle",
    minutes: 65,
    objectives: [
      "Cümlenin konu yanında metindeki işlevini belirle.",
      "Adayı çıkarınca komşuların anlam ve gönderim bağını denetle.",
      "Karşıtlık, örnek ve yeni ayrıntıyı ilgisiz sapmadan ayır.",
    ],
    sections: [
      {
        title: "Akış, ortak bir düşünceyi geliştirmektir",
        paragraphs: [
          "Bir paragrafta cümleler yalnız aynı nesnenin adını taşımakla bağlı olmaz; ortak bir soruyu veya düşünceyi geliştirmeleri gerekir. Akışı bozan cümle bu ana çizgiye hizmet etmeyen başka bir açıklama yönüne sapabilir. Yeni bilgi taşıması tek başına kusur değildir; her gelişme cümlesi zaten bir ayrıntı ekler.",
          "Örneğin bir metin yağmur suyu toplama kabının kurulmasını ve kullanılmasını açıklarken bir serginin açılış tarihini söyleyen cümle araya girebilir. Sergi de aynı okulda olsa bile kurulum zincirine katkısı yoksa sapma doğar. Cümlenin yalnız yerini veya ortak adını değil, hangi açıklamaya ne kattığını belirle.",
        ],
      },
      {
        title: "Bir süreç paragrafını birlikte okuyalım",
        paragraphs: [
          "“Bahçede yağmur suyu biriktiriliyor. Su kapalı bir kapta tutuluyor. Okul sergisi cuma günü açılacak. Bu kap haftada bir temizleniyor. Biriken su çiçekleri sulamakta kullanılıyor.” parçasında önce beş cümlenin tamamını oku. Ortak açıklama yağmur suyunun toplanıp kullanılma düzenidir; bu kısa tanım sonraki denetimin ölçütünü verir.",
          "Sonra cümlelere sırayla işlev ver: uygulamayı tanıtma, saklama aracı, sergi tarihi, aracın bakımı ve suyun kullanımı. Sergi tarihi bu işlem zincirine diğerleri gibi katılmaz. Bu aşamada III bir adaydır; henüz metni kontrol etmeden yalnız ortak kelime yok diye kesin karar vermeyiz. Adayın çıkarılmasıyla kalan parçanın nasıl okunduğunu da görmek gerekir.",
        ],
      },
      {
        title: "Adayı çıkarıp bağı yeniden kur",
        paragraphs: [
          "III çıkarıldığında “Su kapalı bir kapta tutuluyor. Bu kap haftada bir temizleniyor.” cümleleri komşu olur. Bu kap sözü önceki cümlede tanıtılan kaba döner. Son cümle de biriktirilen suyun kullanımını verir. Böylece tanıtma, araç, bakım ve kullanım aynı düşünceyi geliştirir; çıkarma işlemi yalnız kısaltma değil anlam bağını onarma işidir.",
          "Karşı deneme olarak II’yi çıkar. Bu kez kap tanıtımı kaybolur, bu kap sözü belirsizleşir ve sergi cümlesi hâlâ aradadır. Yanlış adayın iki olumsuz sonucu görünür olur. Bu karşılaştırma, doğru cevabın III olmasını yalnız öğretmenin bildirdiği bir harf olmaktan çıkarır; metnin gerçek öncül ve amaç ilişkileriyle doğrular.",
        ],
      },
      {
        title: "İşlevleri izleyerek yeni metne geç",
        paragraphs: [
          "Aynı yöntemi başka bir metne aktarırken su, kap veya sergi kelimelerini aramazsın. Önce yeni metnin ortak sorusunu bulur, cümle işlevlerini belirler ve adayı çıkarınca kalan zinciri denetlersin. Bir anlatıda olay sırası, bir açıklamada neden ve sonuç, bir tartışmada sav ve itiraz bağlantısı öne çıkabilir.",
          "Örneğin katalogların yararından sonra yanlış etiket sorunu ve denetleme gereği geliyorsa üçü aynı erişim sorununu geliştirir. İtiraz veya koşul bir süreçteki bakım adımı kadar gerekli olabilir. Bu yüzden modelin farklı örneklerinde çıkarma işlemi bazen akışı onarır, bazen gerekli bağı koparır. Sonuçları tam metin ve gerekçeleriyle karşılaştırmak yöntemin özü olur.",
        ],
      },
      {
        title: "Önce ana çizgiyi kısa söyle",
        paragraphs: [
          "Akışı denetlemek için metnin neyi anlattığını bir kısa ifadeyle kur. Bu ifade çok geniş olursa ilgisiz cümleler de içine sığar; çok dar olursa gerekli açıklamalar dışarıda kalır. “Okul” başlığı, okulda yapılan her şeyi aynı paragrafta birleştirebilir; “yağmur suyunun bahçede kullanılması” daha ayırt edici bir odaktır.",
          "Ana çizgiyi belirledikten sonra her cümlenin rolünü sor: işlem adımı mı, neden mi, sonuç mu, örnek mi, sınırlama mı? Cümle farklı bir amaç taşıyorsa adaydır. Ancak bu ilk tarama son karar değildir; adayı çıkarıp geride kalan komşuları yeniden okuman gerekir. Böylece yalnız ilk izlenime dayalı bir eleme yapmamış olursun.",
        ],
      },
      {
        title: "Çıkar ve iki komşuyu birlikte oku",
        paragraphs: [
          "Aday cümleyi geçici olarak dışarı al; önceki ve sonraki cümleyi art arda oku. İki cümle anlam, zaman, neden ve gönderim bakımından doğal bağlanıyorsa çıkarma işlemi akışı onarmış olabilir. Bu deneme yalnız “cümle hoşuma gitmedi” duygusunu somut bir dil ilişkisine dönüştürür.",
          "Bir cümle çıkarılınca sonraki “bu kap” sözünün anlattığı kap artık tanıtılmamış kalıyorsa gerekli bir öncülü silmiş olabilirsin. Komşuların gramerce yan yana gelebilmesi de yetmez; ortak düşünce çizgisi sürmelidir. Etkileşimde çıkarılan cümle ayrıca görünür tutulur; hangi bilginin kaybolduğunu açıkça karşılaştırabilirsin.",
        ],
      },
      {
        title: "Aynı kelime aynı işlev demek değildir",
        paragraphs: [
          "Bir paragraftaki bütün cümlelerde kitap sözü geçebilir; biri kitabın nemden korunmasını, öteki sevilen bir romanın kahramanını anlatıyor olabilir. Aynı sözcük ortak konu izlenimi verse de düşünce yönleri farklıdır. Kelime tekrarını akışın tek kanıtı yapmak bu nedenle yanıltıcıdır.",
          "Tersine, zamir veya eş anlamlı bir ifade yüzünden kitap sözü tekrarlanmasa bile cümle aynı nesneyi açıklamayı sürdürebilir. Bağı nesne adı sayarak değil, anlam ilişkisi kurarak ara. “Bu cilt” ifadesinin hangi kitaba döndüğünü ve cümlenin koruma açıklamasına ne kattığını belirle; görünür sözcüklerin benzerliğiyle yetinme.",
        ],
      },
      {
        title: "Karşıt görüş gerekli olabilir",
        paragraphs: [
          "Ancak, oysa ve buna karşılık gibi ifadeler önceki düşünceyi sınırlayabilir veya ona karşı bir görüş sunabilir. Bu, yazarın tartışmayı geliştirmesinin bir yolu olabilir; karşıtlık otomatik kopukluk değildir. Aynı sorunun iki yönü birlikte ele alındığında zıt görünen cümleler birbirine güçlü biçimde bağlanır.",
          "“Dijital kataloglar aramayı hızlandırır. Ancak yanlış etiketlenen kayıtlar yine bulunamayabilir.” cümleleri aynı erişim sorununu tartışır. İkinci cümle başarının koşulunu hatırlatır. Onu çıkarınca metin daha kısa olur ama bu, onun akışı bozduğu anlamına gelmez. Hangi sınırın veya itirazın ana savı geliştirdiğini gerekçesiyle açıkla.",
        ],
      },
      {
        title: "Örnek ve gerekçe bağlantısını koru",
        paragraphs: [
          "Örneğin sözüyle başlayan bir cümle önceki genel yargıyı somutlaştırabilir; çünkü sözüyle başlayan bir cümle de nedenini açıklayabilir. Bunları farklı nesnelerden söz ediyor diye hemen çıkarma. Bir örneğin yeni şehir veya kişi adı taşıması, onun önceki savla ilişkisini ortadan kaldırmaz.",
          "Genel sav “Düzenli etiketleme aramayı hızlandırır.” ise bir arşivin etiketleme uygulamasını anlatan cümle beklenebilir. Ardından bu sayede araştırmacıların belgeye ulaşması sonuç bağı kurar. Araya giren örneğin gerçekten savı destekleyip desteklemediğini kontrol et; sırf örneğin etiketi var diye de her cümleyi otomatik uygun sayma.",
        ],
      },
      {
        title: "Gönderim bağı kopunca dur",
        paragraphs: [
          "Bu, bunlar, söz konusu yöntem ve böylece gibi ifadelerin ilişkili olduğu öncülü bul. Bir aday çıkarıldığında bu öncül kayboluyorsa çıkarma işlemi metnin anlamını zedelemiş olabilir. Gönderim bağı cümlelerin yan yana gelmesini değil, belirli bir bilginin önce tanıtılmasını gerektirir.",
          "Örneğin I. cümle yağmur suyunu, II. cümle suyun toplandığı kabı, III. cümle ilgisiz sergiyi ve IV. cümle bu kabın temizliğini anlatıyorsa III çıkarılınca II ile IV doğal bağlanır. II çıkarılırsa kap tanıtılmadan “bu kap” denir ve ilgisiz sergi de kalır. Bu iki sonucu karşılaştırmak doğru adayın nedenini görünür kılar.",
        ],
      },
      {
        title: "İlk veya son cümle de adaydır",
        paragraphs: [
          "Akışı bozan cümlenin mutlaka ortada olması gerekmez. İlk cümle, sonraki bütün cümlelerin kurduğu ortak odağa uymayabilir; son cümle de başka bir konuya sıçrayabilir. Sayı konumlarını ezberlemek yerine bütün cümlelerin ne yaptığını okuyarak karar vermelisin.",
          "İlk cümleyi dışarıda bırakınca geride kalan metnin anlaşılır bir başlangıcı olup olmadığını denetle. Son cümle çıkarılınca sonuç kayboluyor mu yoksa gereksiz sapma mı temizleniyor? Gerekli giriş veya sonuç cümlesini sırf farklı biçimde yazıldığı için çıkarma. Ana çizginin hangi cümle grubuyla kurulduğunu ve adayın bu çizgiye neden uymadığını söyle.",
        ],
      },
      {
        title: "Konu değişimi ile bakış değişimini ayır",
        paragraphs: [
          "Aynı konunun başka bir yönüne geçiş bazen yeni paragraf gerektirir; fakat akışı bozan sorusunda tek cümlenin ana çizgiden ayrılıp ayrılmadığı araştırılır. Bir cümle, bütün bir ikinci grubun başlangıcıysa metnin düzenlenmesi ikiye bölme olabilir. Yalnız tek bir yan bilgi araya giriyorsa çıkarma deneyi daha açıklayıcıdır.",
          "Sorunun istediği işlemi kökten belirle. İki tutarlı grubu olan altı cümleyi tek bir cümleyi silerek zorla birleştirme. Aynı biçimde beş cümlelik tek konu içinde alakasız bir yan bilgiyi iki ayrı paragraf açarak korumaya çalışma. Anlatım düzenini teşhis etmek, yalnız numaralı cümleleri seçmekten önce gelir.",
        ],
      },
      {
        title: "Kişi ve zaman değişimi doğal olabilir",
        paragraphs: [
          "Anlatı metni bir kişinin başka biriyle karşılaşmasını veya sabah başlayan olayın akşam sonucunu verebilir. Kişi ve zaman değişikliği bu olay zincirinin parçasıysa akış bozulmaz. Yeni özel ad ya da tarih görür görmez cümleyi aday yapmak, anlam ilişkisini atlayan mekanik bir kural olur.",
          "Bir deneyin önceki ve sonraki ölçümleri farklı saatlerde yapılabilir; zaman değişimi karşılaştırma için gereklidir. Buna karşılık deneyin yöntemi anlatılırken araştırmacının çocukluk tatilini açıklayan tek cümle ortak amaca bağlanmıyorsa sapma olabilir. Her değişikliğin aynı sorunun yanıtını sürdürüp sürdürmediğini gerekçelendir.",
        ],
      },
      {
        title: "Bütün kalan cümleleri kontrol et",
        paragraphs: [
          "İki komşu bağlandı diye iş bitmez; kalan cümlelerin tamamı aynı ana çizgide okunmalıdır. Adayı çıkardıktan sonra yeni bir belirsiz gönderim veya açıklanmayan sonuç ortaya çıkıyorsa ilk kararını gözden geçir. Tek bir pürüzsüz geçiş, bütün paragrafın doğru kurulduğunu garanti etmez.",
          "Metin kısa olduğunda tamamını yeniden okumak az zaman alır ve önemli bir kontrol sağlar. Cümlelerin işlev sırasını kısa söyle: tanıtım, işlem, koşul, sonuç. Bu sıra katı bir şablon değildir; farklı metinler başka düzenlerle de tutarlı olabilir. Kontrolün amacı metni belirli bir kalıba zorlamak değil, gerçekten verilen ilişkileri korumaktır.",
        ],
      },
      {
        title: "Yanlış adayı neden elemelisin?",
        paragraphs: [
          "Bir sorudan sonra yalnız doğru cümleyi ezberlemek yerine seçtiğin yanlış adayın metindeki gerekli işlevini bul. “Bu cümle kabı tanıtıyor; sonraki bu kap sözü ona dönüyor.” açıklaması belirli bir çıkarma hatasını gösterir. Böylece benzer gönderme ilişkisini yeni soruda daha erken fark edersin.",
          "Modelde cümleyi çıkarıp geri getirdiğinde bağlantılar ve kalan metin birlikte değişir. Her değişim bir düşünce denemesidir; otomatik puan, çalışma süresinden ustalık veya konu bitirme kaydı oluşturmaz. Bağımsız sorularda metni yeni baştan oku, gerekçeni kanıta bağla ve yanlış seçeneklerin neden uygun kalabildiğini de açıkla.",
        ],
      },
    ],
    examples: [
      {
        title: "Kap ve ilgisiz sergi",
        prompt:
          "(I) Bahçede yağmur suyu biriktiriliyor. (II) Su kapalı bir kapta tutuluyor. (III) Okul sergisi cuma günü açılacak. (IV) Bu kap haftada bir temizleniyor. (V) Biriken su çiçekleri sulamakta kullanılıyor. Akışı bozan hangisidir?",
        strategy: "Kurulum ve kullanım zincirini koru.",
        steps: [
          {
            label: "Odağı kur",
            explanation:
              "Metnin ana çizgisi yağmur suyunun depolanması, temiz tutulması ve bahçede kullanılmasıdır.",
          },
          {
            label: "Adayı çıkar",
            explanation:
              "Sergi açılışını veren III çıkarılınca II’deki kap doğrudan IV’teki bu kap sözüne bağlanır.",
          },
          {
            label: "Kalanı denetle",
            explanation:
              "I, II, IV ve V suyun kullanımı çizgisini sürdürür; sergi cümlesi bu işleve katkı vermez.",
          },
        ],
        answer: "III. cümle.",
        check:
          "II çıkarılsa bu kap öncülünü kaybeder; ayrıca sergi sapması da metinde kalır.",
        pitfall:
          "Aynı okuldan söz edilmesinin bütün cümleleri aynı amaca bağladığını sanma.",
      },
      {
        title: "Ancak gerekli bir sınır olabilir",
        prompt:
          "Dijital kataloglar aramayı hızlandırır. Ancak yanlış etiketlenen kayıtlar yine bulunamayabilir. Bu nedenle kayıtların düzenli denetlenmesi gerekir. İkinci cümle akışı bozar mı?",
        strategy: "Karşıtlığın aynı soruna yaptığı katkıyı belirle.",
        steps: [
          {
            label: "İlk savı bul",
            explanation:
              "İlk cümle katalogların erişim hızına katkısını açıklar; konu bilgiye ulaşmadır.",
          },
          {
            label: "Sınırı bağla",
            explanation:
              "İkinci cümle bu katkının doğru etikete bağlı olduğunu hatırlatır; başka konuya geçmez.",
          },
          {
            label: "Sonucu izle",
            explanation:
              "Üçüncü cümledeki denetleme gereği ikinci cümlede açıklanan sorunla gerekçelenir.",
          },
        ],
        answer: "Hayır; gerekli sınırlamayı verir.",
        check:
          "İkinci cümle çıkarılırsa denetleme sonucunun açık gerekçesi zayıflar.",
        pitfall: "Ancak sözcüğünü kopukluğun otomatik işareti sayma.",
      },
      {
        title: "İlk cümle de sapabilir",
        prompt:
          "(I) Şehrin eski sineması yenilendi. (II) Atölyede atık kâğıtlar ayrı toplanıyor. (III) Bu kâğıtlar küçük parçalara ayrılıyor. (IV) Parçalar yeniden kullanılacak hamura katılıyor. (V) Böylece kâğıt atığı azaltılıyor.",
        strategy: "Sonraki ortak çizgiyi de dikkate al.",
        steps: [
          {
            label: "Çoğunluğun odağını bul",
            explanation:
              "II–V kâğıt atığının toplanması ve yeniden kullanılması sürecini açıklamaktadır.",
          },
          {
            label: "İlk cümleyi karşılaştır",
            explanation:
              "Sinemanın yenilenmesi kâğıt işleme sürecini açıklamaz; farklı bir olay bilgisi taşır.",
          },
          {
            label: "Çıkarma deneyi yap",
            explanation:
              "I çıkarılınca II tanıtımı yapar; bu kâğıtlar, parçalar ve böylece bağları sırayla sürer.",
          },
        ],
        answer: "I. cümle.",
        check:
          "İlk cümle olduğu için giriş kabul etmek yerine yeni kalan metnin anlaşılır başladığını kontrol et.",
        pitfall: "Akışı bozan cümlenin her zaman ortada olacağını düşünme.",
      },
      {
        title: "Örnek gerekli olabilir",
        prompt:
          "Kayıtları düzenli etiketlemek aramayı kolaylaştırır. Örneğin okul arşivinde her deftere yıl etiketi eklenmiştir. Bu etiketler araştırmacıların doğru deftere ulaşmasını hızlandırmıştır. Ortadaki cümle gereksiz midir?",
        strategy: "Genel yargı, somut uygulama ve sonucu birlikte oku.",
        steps: [
          {
            label: "Genel savı belirle",
            explanation:
              "İlk cümle etiketlemenin aramayı kolaylaştırdığı düşüncesini genel düzeyde sunar.",
          },
          {
            label: "Örneği izle",
            explanation:
              "İkinci cümle bu düşüncenin okul arşivindeki uygulanışını tanıtır ve etiketleri açıklar.",
          },
          {
            label: "Sonuç bağını denetle",
            explanation:
              "Üçüncü cümledeki bu etiketler sözü örneğe döner; ortadaki cümle zincire gerekli katkı yapar.",
          },
        ],
        answer: "Hayır; örnek ve öncül işlevi vardır.",
        check:
          "Farklı bir okul adı eklenmesi konu sapması kanıtı değildir; etiketleme ilişkisi sürmektedir.",
        pitfall: "Yeni özel ad içeren her cümleyi ilgisiz sanma.",
      },
    ],
    recall: [
      {
        prompt: "Çıkarma deneyi neden gereklidir?",
        answer:
          "Aday çıkarılınca kalan komşuların ve bütün metnin anlam ile gönderim bağı sınanır.",
      },
      {
        prompt: "Ancak sözü akışı otomatik bozar mı?",
        answer:
          "Hayır; aynı konunun sınırını, itirazını veya karşıt yönünü açıklayabilir.",
      },
      {
        prompt: "Aynı isim neden yeterli tutarlılık kanıtı değildir?",
        answer:
          "Aynı nesne farklı amaçlarla anlatılabilir; cümlenin ortak düşünceye katkısı gerekir.",
      },
      {
        prompt: "Çıkardığın cümle bu kap öncülünü yok ediyorsa ne denetlenir?",
        answer:
          "Gerekli tanıtımı silmiş olabilirsin; ilgili cümleyi geri getirip başka adayı sınamalısın.",
      },
    ],
    source:
      "Aurelia Türkçe 021–024 kopya kâğıtları; MEBİ TYT Türkçe konu özetleri: paragrafta anlam ve yapı; OGM 12. sınıf paragrafta anlam ve yapı sunuları. Anlatımlar, modeller ve sorular uygulama için özgün olarak hazırlanmıştır.",
  },
];
export const forge019TurkishGuideExtensions: Pick<
  LessonGuide,
  "id" | "sections" | "examples" | "recall" | "source"
>[] = [
  {
    id: "paragraf",
    sections: [
      {
        title: "Ana yargıyı metnin sınırında kur",
        paragraphs: [
          "Ana düşünce, yazarın bütün paragraf boyunca geliştirdiği temel yargıdır; yalnız konunun adı değildir. “Arşivler” bir konuyu söyler, “Arşivlerde belgeyi korumak erişim düzeniyle tamamlanmalıdır.” ise bu konu hakkında savunulan bir görüş taşır. Seçenekleri karşılaştırırken önce hangilerinin gerçekten bir yargı sunduğunu belirle.",
          "Yargının bütün paragrafı kapsaması sınırsız bir genelleme olması demek değildir. İki okulun ortak bahçe çalışmasını anlatan metinden bütün eğitim sorunlarının yalnız bahçeyle çözüleceği sonucu çıkmaz. Kapsamı genişletirken metindeki kişi, durum ve koşulları koru. En kapsamlı seçenek, metin dışı yeni iddialar ekleyen en uzun seçenek değildir.",
        ],
      },
      {
        title: "Tam bir paragraftan kendi sav cümleni yaz",
        paragraphs: [
          "“Etiketleri açık olan arşivde belgeye daha çabuk ulaşılıyor. Katalog kayıtları farklı yerlerden taranabiliyor. Saklanan belgeler, erişim imkânıyla araştırmacının çalışmasına katılıyor.” parçasını okuduktan sonra önce konu adını yaz: arşiv belgeleri. Ardından her cümlenin ortak katkısını söyle: belgenin bulunması ve kullanılabilmesi.",
          "Şimdi iki bilgiyi birleştirip kısa bir sav yaz: “Belgeyi korumak, ona erişim sağlamakla işlevini tamamlar.” Bu sav yalnız ilk etiket ayrıntısını değil katalog ve araştırmacı ilişkisini de açıklar. Kendi cümlen metinde aynen bulunmak zorunda değildir; fakat kullandığın her temel unsurun metinde dayanağı olmalıdır. Bu işlem örtük ana düşünceyi kurmanın uygulanabilir bir yoludur.",
        ],
      },
      {
        title: "Üç sav adayını kanıtla karşılaştır",
        paragraphs: [
          "Aynı arşiv parçası için “Etiketlerde yıl yazılır.”, “Koruma, erişimle tamamlanır.” ve “Bütün arşivler her zaman kusursuzdur.” adaylarını düşün. Birincisi yalnız bir ayrıntıya yönelir; ikincisi örneklerin ortak amacını taşır; üçüncüsü bütün arşivler ve her zaman sözleriyle yeni bir kesinlik ekler. Böylece adayları dar, yeterli ve aşırı geniş olarak gerekçelendirirsin.",
          "Karşılaştırma bitince seçtiğin savı paragraftaki her cümleye geri götür. Etiket neden var, katalog ne sağlıyor, araştırmacı ilişkisinin rolü ne? Sav bu soruları ortak bir çerçevede açıklayabiliyorsa kapsamı uygundur. Ardından savdaki hiçbir sözcüğün verilmemiş bir koşul veya garanti eklemediğini kontrol et. Bu olumlu kontrol dizisi, yalnız yanlış genelleme uyarısını ezberlemekten daha işlevseldir.",
        ],
      },
      {
        title: "Konu aynı kalırken sav değişebilir",
        paragraphs: [
          "İki paragraf aynı dijital katalog konusunu anlatıp farklı düşünceler savunabilir. Biri erişim hızını, diğeri yanlış etiketlerin yarattığı güçlükleri öne çıkarabilir. Ana düşünceyi yalnız katalog sözcüğüne bağlamak bu ayrımı siler. Konunun hangi yönüne hangi tutumla yaklaşıldığını ve ayrıntıların hangi yargıya hizmet ettiğini birlikte oku.",
          "Bir metinde önce avantajlar sonra sınırlamalar anlatılıyorsa ana sav bu ikisini dengeleyen bir koşullu yargı olabilir. “Kataloglar her sorunu çözer.” veya “Kataloglar yararsızdır.” seçenekleri iki ayrı uçta kalır. Metnin verdiği yararı ve koşulu aynı açıklamada koruyabiliyor musun? Bu soru, yüzeyde çekici ama eksik seçenekleri ayırır.",
        ],
      },
      {
        title: "Yazarın sözü ile aktarılan görüşü ayır",
        paragraphs: [
          "Yazar, savunmadığı bir görüşü tartışmak için alıntılayabilir. “Kimi okurlar hızlı bitirmeyi başarı sayıyor; oysa anlama, durup düşünmeyi de gerektirir.” cümlesinde ilk görüş aktarılır, ikinci yönde bir itiraz kurulur. Alıntının dikkat çekici olması veya metnin başında bulunması onu otomatik ana sav yapmaz.",
          "Kimin hangi yargıyı söylediğini kısa notlarla ayır: aktarılan görüş, yazarın itirazı ve dayanak. Oysa, ancak ve buna karşılık gibi bağlayıcılar yönü gösterebilir; yine de her bağlacı aynı kalıba yerleştirme. Tam bağlamda hangi görüşün geliştirildiğini izlemek, sözcük avcılığından daha güvenilir bir çözümdür.",
        ],
      },
      {
        title: "Ana düşüncenin sabit bir yeri yoktur",
        paragraphs: [
          "Temel yargı ilk cümlede açıkça verilip örneklerle geliştirilebilir; son cümlede önceki ayrıntıları birleştirebilir veya hiçbir cümlede aynen yazılmayabilir. Bu yüzden “hep son cümleyi seç” yöntemi hem açık hem örtük savlı metinlerde hata üretebilir. Her cümlenin bütüne katkısını belirlemek gerekir.",
          "Örtük savı çıkarırken yeni bilgi uydurmazsın; verilen örneklerin ortak yönünü en küçük yeterli yargıyla söylersin. Bir öğrencinin her gün kısa çalışmayla ilerlemesi ve başka birinin düzensiz uzun oturumlarla zorlanması, bağlam uygunsa sürekliliğin değerini düşündürebilir. Ama bütün öğrenciler için kesin başarı yasası eklemek metnin kanıtını aşar.",
        ],
      },
      {
        title: "Ayrıntı doğru ama cevap eksik olabilir",
        paragraphs: [
          "Ana düşünce sorusunun bir çeldiricisi metindeki gerçek bir ayrıntıyı doğru tekrar edebilir. Bu seçeneği yanlış bilgi olduğu için değil, bütün metnin savını taşımadığı için elersin. Kanıtın doğru olması ile sorunun istediği kapsama ulaşması farklı ölçütlerdir; yardımcı düşünce sorusunda aynı bilgi uygun cevap olabilir.",
          "Örneğin bir metin arşivde yıl etiketi ve açık katalogla erişimin güçlendiğini savunuyorsa “Belgelerde yıl etiketi vardır.” cümlesi doğru bir ayrıntıdır. “Belgeyi düzenli ve erişilebilir sunmak arşivin işlevini tamamlar.” daha bütünleyici olabilir. Her seçeneği doğru/yanlış diye iki kutuya ayırmak yerine hangi kapsamda doğru olduğunu açıkla.",
        ],
      },
      {
        title: "Örnekler düşünceyi nasıl taşır?",
        paragraphs: [
          "Bir paragraf birkaç olay anlatarak ortak bir düşünceyi görünür kılabilir. Örneklerdeki özel adları ana savın zorunlu parçası sanma; ortak ilişkinin başka hangi duruma aktarılabildiğini düşün. Buna rağmen örnekleri atıp yalnız kulağa güzel gelen bir öğüt seçmek de doğru değildir; genellemenin dayanağı bu olaylardır.",
          "Aynı metinde iki kişinin küçük katkılarla bir işi tamamlaması anlatılıyorsa ortak emek düşüncesi öne çıkabilir. Tek bir kişinin çok hızlı çalışmasından verimlilikle ilgili ayrı bir düşünce doğabilir. Ana düşünceyi yazdıktan sonra her örneğin ona gerçekten destek olup olmadığını denetle. Bir örnek açıklamanın dışında kalıyorsa savı yeniden daralt veya düzelt.",
        ],
      },
      {
        title: "Amaç, duygu ve ana düşünceyi karıştırma",
        paragraphs: [
          "Yazarın amacı okuru uyarmak, bilgilendirmek veya düşündürmek olabilir; ana düşünce ise bu amaçla ilettiği temel yargıdır. Bir metin kaygı duygusu taşısa bile “kaygı” sözcüğü tek başına savı söylemez. Soru ana duygu, konu, amaç veya ana düşünceyi istediğinde aynı seçenek ölçütünü kullanmamalısın.",
          "“Kıyılardaki atıkları azaltmak için ortak sorumluluk gerekiyor.” savını taşıyan bir paragrafın amacı sorumluluğa çağırmak olabilir. Metnin konusu kıyı temizliğidir; duygusu kaygı veya umutla ilişkili olabilir. Bu dört karşılığı kısa ayrı cümlelerle söylemek, soru kökünün senden hangisini istediğini fark etmeni sağlar.",
        ],
      },
      {
        title: "Savını hem kapsam hem kanıtla denetle",
        paragraphs: [
          "Bir ana düşünce adayını iki yönden sına: metindeki temel ayrıntıları kapsıyor mu ve metinde bulunmayan iddialar ekliyor mu? Birinci sınav aşırı dar, ikinci sınav aşırı geniş veya dışarıdan eklenmiş seçenekleri yakalar. Uzun ve güçlü görünen bir ifade bu iki koşulu sağlamıyorsa iyi cevap değildir.",
          "Son kararı bir kanıt zinciriyle açıkla: ilk cümle hangi sorunu tanıtıyor, orta cümleler neyi gösteriyor ve bütün bunlar hangi yargıyı destekliyor? Aynı denetimi farklı uzunluktaki pasajlarda yeniden uygula. Yeni örneklerde aynı yöntemi başka tam metinlere taşıyarak yalnız bir yanıtı ezberlemenin ötesine geçebilir, ana savı kendi sözlerinle ve kanıtlarıyla kurabilirsin.",
        ],
      },
    ],
    examples: [
      {
        title: "Ayrıntıdan bütünleyici sava",
        prompt:
          "Arşivde belgeleri yalnız saklamak yetmez. Açık yıl etiketleri aramayı hızlandırır; kataloglar farklı yerlerden taramayı sağlar. Belgeyi koruma işi, ona düzenli erişim sunulduğunda işlevini tamamlar. Ana düşünceyi kur.",
        strategy: "Bütün ayrıntıların hangi savı desteklediğini birleştir.",
        steps: [
          {
            label: "Konuyu ayır",
            explanation:
              "Konu arşiv belgeleridir; yalnız bu ad ana düşünce için bir yargı taşımaz.",
          },
          {
            label: "Ortak işlevi bul",
            explanation:
              "Etiket ve katalog örnekleri, saklanan belgeye ulaşmayı kolaylaştırma yönünde birleşir.",
          },
          {
            label: "Savı söyle",
            explanation:
              "Arşivde koruma, düzenli erişim imkânıyla tamamlanmalıdır; yalnız bir örneğe indirgenmez.",
          },
        ],
        answer: "Arşivlerde koruma, erişim düzeniyle tamamlanmalıdır.",
        check:
          "Bütün arşivlerin kusursuz olduğu veya her belgenin dijital olması gerektiği eklenmez.",
        pitfall: "Doğru bir etiket ayrıntısını bütün metnin savı yerine koyma.",
      },
      {
        title: "Alıntı yazarın kabulü değildir",
        prompt:
          "“Hızlı bitiren iyi okurdur.” diyenler var. Oysa okur bazen tek sayfada durup sorular sorduğunda metni daha derinden kavrar. Okumanın değeri sayfa sayısından önce anlamayla ilişkilidir.",
        strategy: "Aktarılan görüş ile yazarın itirazını ayır.",
        steps: [
          {
            label: "Sesleri ayır",
            explanation:
              "İlk yargı başkalarına ait bir görüş olarak aktarılır; yazarın kesin kabulü diye sunulmaz.",
          },
          {
            label: "İtirazı bul",
            explanation:
              "Oysa ile başlayan cümle hızlı bitirme ölçütünü anlama ve soru sormayla karşılaştırır.",
          },
          {
            label: "Ana savı kur",
            explanation:
              "Okumanın temel değeri yalnız hızda değil, metni anlamada ve onunla düşünmede aranır.",
          },
        ],
        answer:
          "Okumanın değeri yalnız hızla değil, anlamayla değerlendirilmelidir.",
        check:
          "Yazar bütün kitapların mutlaka yavaş okunacağını söylemez; metnin kapsamını koru.",
        pitfall:
          "En başta veya tırnak içinde olduğu için bir yargıyı otomatik ana sav sayma.",
      },
      {
        title: "Koşullu ana düşünce",
        prompt:
          "Dijital kataloglar belge aramayı hızlandırır. Fakat yanlış etiketler araştırmacıyı yanıltabilir. Bu araçlardan yararlanmak, kayıtları doğru ve güncel tutmakla mümkündür.",
        strategy: "Yararı ve sınırlamayı aynı savda koru.",
        steps: [
          {
            label: "Yararı sapta",
            explanation:
              "İlk cümle arama hızını olumlu katkı olarak açıklar; katalogları bütünüyle reddetmez.",
          },
          {
            label: "Koşulu izle",
            explanation:
              "İkinci cümle yanlış etiket sorununu tanıtır; son cümle bunun giderilmesini gerektirir.",
          },
          {
            label: "Dengeyi kur",
            explanation:
              "Katalogların yararı doğru ve güncel kayıtla güçlenir; mutlak yararsızlık veya kusursuzluk yoktur.",
          },
        ],
        answer:
          "Dijital kataloglardan yararlanmak doğru ve güncel kaydı gerektirir.",
        check:
          "Her iki uç seçenek, paragrafın ya yararını ya da koşulunu siler.",
        pitfall: "Ancak sonrasını okuyup önceki olumlu bilgiyi yok sayma.",
      },
      {
        title: "Örtük savı örneklerden çıkar",
        prompt:
          "Ece her gün kısa bir bölüm çalışıp bir ay sonra metni tamamladı. Bora son güne bıraktığı uzun çalışmada yetiştiremedi. İkisinin çalışma düzeni anlatılırken küçük ama sürekli adımların yararı görünür oluyor.",
        strategy: "Örneklerin ortak karşılaştırmasını abartmadan söyle.",
        steps: [
          {
            label: "Örnekleri karşılaştır",
            explanation:
              "Ece’nin düzenli küçük adımları ile Bora’nın ertelediği tek uzun oturum karşılaştırılır.",
          },
          {
            label: "Dayanağı ayır",
            explanation:
              "Verilen sonuç bu iki örnek içinde sürekliliğin yararını gösterir; bütün öğrenciler için yasa kurulmaz.",
          },
          {
            label: "Savı sınırla",
            explanation:
              "Sürekli küçük çalışmalar, bir işi son güne bırakmaya göre ilerlemeyi destekleyebilir.",
          },
        ],
        answer: "Çalışmada süreklilik ilerlemeyi destekleyebilir.",
        check:
          "Bütün derslerin yalnız kısa oturumlarla kesin başarılacağı iddiası metinde yoktur.",
        pitfall: "Örneklerden istisnasız başarı garantisi üretme.",
      },
    ],
    recall: [
      {
        prompt: "Ana düşünce ile konu nasıl ayrılır?",
        answer:
          "Konu ne hakkında konuşulduğunu, ana düşünce o konuda iletilen temel yargıyı bildirir.",
      },
      {
        prompt: "En kapsamlı cevap en sınırsız genelleme midir?",
        answer:
          "Hayır; metindeki temel ayrıntıları kapsar ve metinde olmayan yeni kesinlikler eklemez.",
      },
      {
        prompt:
          "Yazarın aktardığı karşı görüş neden otomatik ana sav değildir?",
        answer:
          "Yazar onu tartışıp reddedebilir; kabul edilen yön bağlamdan izlenmelidir.",
      },
      {
        prompt: "Ayrıntı doğruyken ana düşünce cevabı neden olmayabilir?",
        answer: "Doğru ayrıntı bütün metnin ortak savını kapsamıyor olabilir.",
      },
    ],
    source:
      "Aurelia Türkçe 021–024 kopya kâğıtları; MEBİ TYT Türkçe konu özetleri: paragrafta anlam ve yapı; OGM 12. sınıf paragrafta anlam ve yapı sunuları. Anlatımlar, modeller ve sorular uygulama için özgün olarak hazırlanmıştır.",
  },
];
interface QuestionRow019 {
  passage: string;
  prompt: string;
  correct: string;
  distractors: string[];
  hint: string;
  explanation: string;
}
const questionRows019: Record<string, QuestionRow019[]> = {
  "yardimci-dusunce": [
    {
      passage:
        "Mahalle kütüphanesi 1990’da açıldı. Yenileme giderlerinin yalnız yarısını mahalle sakinleri, kalanını belediye karşıladı. Yenilemeden sonra çocuklar için haftalık okuma buluşmaları başladı.",
      prompt: "Bu parçadan hangisi kesin olarak çıkarılabilir?",
      correct: "Çocuklara yönelik düzenli bir etkinlik başlatılmıştır.",
      distractors: [
        "Kütüphane kentin en eski kütüphanesidir.",
        "Yenilemenin bütün giderlerini mahalle sakinleri karşılamıştır.",
        "Buluşmalara bütün çocuklar katılmıştır.",
        "Kütüphane daha önce hiç yenilenmemiştir.",
      ],
      hint: "Haftalık sözünün hangi tür düzeni bildirdiğine bak.",
      explanation:
        "Haftalık buluşmalar, tekrar eden bir etkinliğin başladığını açıkça gösterir. Kuruluş yılı kentin en eskisi olmayı, buluşma düzeni de bütün çocukların katıldığını kanıtlamaz. Giderlerin yalnız yarısı mahalleliye aittir; önceki yenilemeler hakkında bilgi verilmemiştir.",
    },
    {
      passage:
        "Bir okulun arşivinde defterler yıllarına göre ayrıldı. Her dolaba içerdiği yılları belirten bir etiket eklendi. Araştırmacılar artık aradıkları yılı hangi dolapta bulacaklarını kolayca görebiliyor.",
      prompt: "Bu parçada hangisine değinilmemiştir?",
      correct: "Düzenleme çalışmasının parasal giderine.",
      distractors: [
        "Defterlerin hangi ölçüte göre ayrıldığına.",
        "Dolapların nasıl tanıtıldığına.",
        "Etiketlerin hangi bilgiyi taşıdığına.",
        "Araştırmacıların düzenlemeden nasıl yararlandığına.",
      ],
      hint: "Her seçenek için karşılık gelen açık bilgiyi ara.",
      explanation:
        "Ayırma ölçütü yıl, tanıtım aracı etiket, etiketteki bilgi dolabın kapsadığı yıllardır. Son cümle araştırmacıların yararını verir. Çalışmanın kaç paraya mal olduğu veya kimin ödediği söylenmemiştir; bu bilgi dışarıdan eklenemez.",
    },
    {
      passage:
        "Atölye için gereken on kutunun yalnız dördünü öğrenciler hazırladı. Kalan altı kutuyu görevliler tamamladı. Bütün kutular aynı gün salona taşındı.",
      prompt: "Hangi yargı bu parçayla çelişir?",
      correct: "On kutunun tamamını öğrenciler hazırlamıştır.",
      distractors: [
        "Hazırlanan kutu sayısı ondur.",
        "Görevliler altı kutu hazırlamıştır.",
        "Kutular aynı gün salona götürülmüştür.",
        "Öğrenciler hazırlığa katkı vermiştir.",
      ],
      hint: "Yalnız dört ile toplam on arasındaki görev paylaşımını koru.",
      explanation:
        "Metin hazırlama işini iki gruba açıkça paylaştırır: dört kutu öğrencilerin, altı kutu görevlilerin katkısıdır. Bütün kutuları öğrencilere yüklemek bu dağılımla çelişir. Öteki dört seçenek verilen sayıları veya taşıma bilgisini aynen korur.",
    },
    {
      passage:
        "Sınıftaki bazı öğrenciler okula yürüyerek geldi. Öğretmen, o gün yürüyerek gelen öğrencilerle bahçe kapısında konuştu. Diğer ulaşım yolları hakkında açıklama yapılmadı.",
      prompt: "Hangisi bu parçadan kesin olarak çıkarılamaz?",
      correct: "Geri kalan öğrencilerin hiçbiri yürüyerek gelmemiştir.",
      distractors: [
        "En az bir öğrenci yürüyerek gelmiştir.",
        "Öğretmen yürüyen öğrencilerle konuşmuştur.",
        "Konuşma bahçe kapısında yapılmıştır.",
        "Ulaşım yollarının tamamı açıklanmamıştır.",
      ],
      hint: "Bazı sözü diğerlerini tek başına kesin olarak dışlar mı?",
      explanation:
        "Bazı öğrenciler ifadesi yürüyen en az bir öğrenci olduğunu gösterir; geri kalanların yürümediğini kesin olarak bildirmez. Son cümle de diğer yolların açıklanmadığını söyler. Konuşan kişi, yer ve en az bir yürüyen bulunması açık bilgilerle desteklenir.",
    },
    {
      passage:
        "Bu çalışma düzeni, dikkatini toplamakta zorlanan kimi öğrencilere yardımcı olabilir. Düzenin etkisi öğrencinin ihtiyacına ve uygulama koşullarına göre değişir.",
      prompt: "Hangi açıklama parçanın kapsamını korur?",
      correct: "Düzenin bazı öğrencilere katkı sağlama ihtimali vardır.",
      distractors: [
        "Düzen her öğrenciye kesin başarı sağlar.",
        "Bu düzen dışındaki hiçbir yöntem işe yaramaz.",
        "Kimi öğrencilerin yararlanma ihtimali tamamen dışlanmıştır.",
        "Düzeni uygulayan herkes aynı ölçüde yarar görür.",
      ],
      hint: "Kimi ve olabilir sözlerinin kesinlik sınırını birlikte oku.",
      explanation:
        "Kimi öğrenciler ve olabilir sözleri sınırlı bir grupta olasılık bildirir; değişen koşullar da tek tip sonuç olmadığını gösterir. Kesin başarı, tek yöntem veya herkesin aynı yararı görmesi metne eklenen güçlü iddialardır. Yararlanma ihtimali ise dışlanmamıştır.",
    },
    {
      passage:
        "Kentteki önemli sergi salonlarından biri bu yıl yenilendi. Yenilemede giriş bölümü genişletildi ve aydınlatma düzeni değiştirildi.",
      prompt: "Aşağıdakilerden hangisi bu parçadan çıkarılamaz?",
      correct: "Bu salon kentin en önemli sergi salonudur.",
      distractors: [
        "Sergi salonu bu yıl yenilenmiştir.",
        "Giriş bölümünde genişletme yapılmıştır.",
        "Aydınlatma düzenine müdahale edilmiştir.",
        "Salon kentteki önemli salonlar arasında sayılmaktadır.",
      ],
      hint: "Önemlilerden biri ile en önemli aynı sıralamayı mı kurar?",
      explanation:
        "Önemli salonlardan biri olmak, bütün salonlar arasında birinci olmak demek değildir. En önemli ifadesi karşılaştırma ve üstünlük ekler. Yenilemenin yılı, girişin genişlemesi, aydınlatmanın değişmesi ve önemli salonlar arasında oluşu açıkça verilmiştir.",
    },
    {
      passage:
        "Geçerli kartı bulunan ziyaretçiler bu kapıyı açabilir. Metinde kapının başka açılma yolları ya da kartı olmayan ziyaretçiler hakkında bilgi verilmemiştir.",
      prompt: "Hangi sonuç kesin olarak çıkarılamaz?",
      correct: "Kapıyı açan herkes mutlaka geçerli kart kullanmıştır.",
      distractors: [
        "Geçerli kart kapıyı açmaya imkân sağlayabilir.",
        "Geçerli kartı olan ziyaretçiler için bir açılma yolu açıklanmıştır.",
        "Kartsız ziyaretçiler hakkında açıklama yapılmamıştır.",
        "Başka açılma yollarının bulunup bulunmadığı belirtilmemiştir.",
      ],
      hint: "Verilen koşuldan onun ters yönünü zorunlu çıkarma.",
      explanation:
        "Metin kartı olanlara bir imkân verir; kapının yalnız kartla açılabileceğini söylemez. Bu nedenle açan herkesin kart kullandığı çıkarılamaz. Öteki seçenekler verilen imkânı veya açıkça bildirilen bilgi eksikliğini korur; yeni bir yol uydurmaz.",
    },
    {
      passage:
        "Müze 2020’de sayısal katalog hazırlamaya başladı. İlk katalog 2022’de ziyaretçilere açıldı. 2024’te katalogdaki kayıtlar güncellendi.",
      prompt: "Hangi yargı metinle desteklenir?",
      correct:
        "Katalog ziyaretçilere açıldıktan sonra bir güncelleme yapılmıştır.",
      distractors: [
        "Katalog hazırlığı 2022’de başlamıştır.",
        "Kayıtlar ziyaretçilere açılmadan önce son kez güncellenmiştir.",
        "Müze 2020’de kurulmuştur.",
        "Katalog 2024’e kadar ziyaretçilere hiç açılmamıştır.",
      ],
      hint: "Başlama, açılma ve güncelleme olaylarını ayrı tarihlere yerleştir.",
      explanation:
        "Hazırlık 2020, ziyaretçiye açılma 2022, güncelleme 2024 tarihindedir. Dolayısıyla güncelleme açılmadan sonra yapılmıştır. Müzenin kuruluş yılı verilmez; son kez güncellendiği de söylenmez. Olayların tarihlerini birbirinin yerine kullanmak doğru değildir.",
    },
    {
      passage:
        "Yazar, bazı eleştirmenlerin yeni öykülerini durağan bulduğunu aktarıyor. Kendisi ise kısa konuşmaların, kahramanların iç dünyasını daha belirgin kıldığını düşünüyor.",
      prompt: "Bu parçadan hangisi çıkarılabilir?",
      correct:
        "Yazarın kendi öykülerine ilişkin değerlendirmesi, aktardığı eleştirmen değerlendirmesiyle aynı değildir.",
      distractors: [
        "Bütün eleştirmenler öyküleri durağan bulmuştur.",
        "Yazar kısa konuşmaların gereksiz olduğunu düşünmektedir.",
        "Yazar eleştirmenlerin her sözünü kabul etmiştir.",
        "Öykülerde hiçbir kahramanın iç dünyası anlatılmamıştır.",
      ],
      hint: "Aktarılan görüş ile yazarın kabul ettiği görüşü ayır.",
      explanation:
        "Bazı eleştirmenlerin durağanlık değerlendirmesine karşı yazar kısa konuşmaların yararını savunur. İki değerlendirme aynı değildir. Bazı sözü bütün eleştirmenleri kapsamaz; yazarın konuşmaları gereksiz gördüğü veya iç dünyaya hiç yer vermediği de verilen görüşün tersidir.",
    },
    {
      passage:
        "Atölyeye katılan herkes bir taslak teslim etti. Taslak teslim edenlerden yalnız Ece çalışmasını sergiledi. Ece de atölyeye katılanlar arasındaydı.",
      prompt: "Hangisi bu parçadan kesin olarak çıkarılabilir?",
      correct: "Ece bir taslak teslim etmiştir.",
      distractors: [
        "Atölyeye katılan herkes çalışmasını sergilemiştir.",
        "Yalnız Ece atölyeye katılmıştır.",
        "Taslak teslim eden herkes atölyeye katılmıştır.",
        "Ece dışında hiç kimse taslak hazırlamamıştır.",
      ],
      hint: "Ece’nin gruba üyeliğini herkes için verilen kuralla birleştir.",
      explanation:
        "Ece katılımcıdır ve her katılımcı taslak teslim etmiştir; iki öncül Ece’nin taslak teslim ettiğini zorunlu kılar. Sergileme yalnız Ece’ye ait ayrı bir iştir. Taslak veren herkesin katılımcı olduğu veya katılımcı sayısının bir olduğu söylenmemiştir.",
    },
  ],
  "ikiye-bolme": [
    {
      passage:
        "(I) Kâğıt belgeler nemden korunmalıdır. (II) Bu amaçla dolaplarda nem izlenir. (III) Ölçümler yıpranma riskini erken gösterir. (IV) Dijital kataloglar belgeye erişimi kolaylaştırır. (V) Yıl etiketleri aramayı hızlandırır.",
      prompt:
        "Bu parça iki paragrafa ayrılsa ikinci paragraf hangi cümleyle başlar?",
      correct: "IV.",
      distractors: ["II.", "III.", "V.", "I."],
      hint: "Fiziksel korumadan belgeyi bulmaya geçilen ilk cümleyi ara.",
      explanation:
        "I–III fiziksel koruma ve ölçümü, IV–V belgeye erişimi anlatır. Erişim yönü IV ile başlar; bu nedenle ilk yeni cümle IV’tür. III son eski cümledir. V’den başlamak ise erişimi tanıtan IV’ü eski blokta bırakır.",
    },
    {
      passage:
        "(I) Açık etiketler aramayı kolaylaştırır. (II) Örneğin okul arşivinde yıl etiketi kullanılır. (III) Bu etiketler eski defterleri bulmayı hızlandırır. (IV) Belgeleri korumak için nem de izlenmelidir. (V) Bu ölçümler yıpranma riskini gösterir.",
      prompt: "İkinci paragrafın başlangıcı hangisidir?",
      correct: "IV.",
      distractors: ["I.", "II.", "III.", "V."],
      hint: "Örneği önceki genel savdan koparmadan yeni amacı bul.",
      explanation:
        "II ve III etiketleme savının örneği ile sonucudur; erişim yönünü sürdürür. IV fiziksel koruma için nem izlemeyi başlatır ve V onu açıklar. Özel okul adı II’yi otomatik yeni paragraf yapmaz. Uygun ayrım I–III ve IV–V’dir.",
    },
    {
      passage:
        "(I) Kitap kabı cildi kirden korur. (II) Katlanan kenarlar kitabı sarar. (III) Böylece taşıma sırasında yüzey daha az yıpranır. (IV) Kitap kabı görsel tasarım için de kullanılır. (V) Renk ve çizimler okurun ilk izlenimini etkiler.",
      prompt: "Bu parçada ikinci paragraf nerede başlatılmalıdır?",
      correct: "IV.",
      distractors: ["II.", "V.", "I.", "III."],
      hint: "Aynı nesnenin iki ayrı işlevini karşılaştır.",
      explanation:
        "İlk üç cümle kitap kabının koruma işlevini açıklarken IV tasarım işlevine geçer; V bu yeni yönü geliştirir. Nesne adının değişmemesi ayrımı engellemez. III sonuç cümlesiyle ilk grubun bağını sürdürdüğü için oradan ayırmak uygun değildir.",
    },
    {
      passage:
        "(I) Ece çalışırken ayrıntılı plan yapar. (II) İşlerini sırayla tamamlamak onu rahatlatır. (III) Bora ise planı yalnız başlangıç taslağı sayar. (IV) Yeni bir ihtiyaç doğunca çalışma sırasını değiştirir. (V) Bu esneklik beklenmedik işleri yetiştirmesini sağlar.",
      prompt: "İkinci paragraf hangi cümleyle başlamalıdır?",
      correct: "III.",
      distractors: ["I.", "II.", "IV.", "V."],
      hint: "İkinci kişinin yaklaşımının tanıtıldığı cümleyi bul.",
      explanation:
        "I–II Ece’nin plan anlayışını ve etkisini, III–V Bora’nın esnek yaklaşımını anlatır. Yeni odak III’te kurulmuştur; IV ve V ona bağlı açıklamalardır. Karar sırf yeni kişi adı olduğu için değil, iki ayrı yaklaşım grubu oluştuğu için verilir.",
    },
    {
      passage:
        "(I) Kent arşivi 1990’da kuruldu. (II) 2000’de daha büyük bir binaya taşındı. (III) 2010’da sayısal katalog hazırladı. (IV) Bugün ziyaretçilerin en çok zorlandığı konu katalog dilidir. (V) Teknik terimler yerine açık karşılıklar önerilmektedir.",
      prompt:
        "Bu parça iki paragrafa ayrılsa yeni paragrafın ilk cümlesi hangisidir?",
      correct: "IV.",
      distractors: ["I.", "II.", "III.", "V."],
      hint: "Kuruluş çizgisinden bugünkü erişim sorununa geçişi bul.",
      explanation:
        "I–III kurumun tarih içindeki gelişimini sıralar. IV bugünkü belirli bir sorunu tanıtır, V çözüm önerisini verir. Yılların II ve III’te değişmesi aynı gelişim özetini bozmaz. Yeni sorun odağının ilk cümlesi IV olduğundan sınır III–IV arasındadır.",
    },
    {
      passage:
        "(I) Ortak çalışma farklı fikirleri buluşturabilir. (II) Örneğin Ece’nin ekibi taslağı birlikte değerlendirdi. (III) Bu değerlendirme eksiklerin görülmesini kolaylaştırdı. (IV) Bireysel çalışmada ise kişi kendi hızını daha serbest belirler. (V) Kesintisiz düşünmek isteyenler bu esnekliği yararlı bulabilir.",
      prompt: "İkinci paragraf hangi cümleyle başlar?",
      correct: "IV.",
      distractors: ["II.", "I.", "V.", "III."],
      hint: "Kısa örneği genel açıklamayla tut, sonra ikinci çalışma biçimini izle.",
      explanation:
        "II’deki Ece örneği ve III’teki sonucu ortak çalışma savını geliştirir. IV bireysel çalışmanın farklı özelliğini başlatır; V bu özelliği açıklamayı sürdürür. Böylece I–III ve IV–V iki tutarlı blok oluşturur; örnek tek başına yeni yön sayılmaz.",
    },
    {
      passage:
        "(I) Geleneksel pazarda satıcıyla alıcı yüz yüze konuşur. (II) Ürünün niteliği bu konuşmada ayrıntılı sorulabilir. (III) Sayısal pazarlarda ise açıklama çoğunlukla yazılıdır. (IV) Alıcı farklı ürün bilgilerini aynı ekranda karşılaştırır. (V) Bu karşılaştırma seçim yapmasına yardımcı olabilir.",
      prompt:
        "Bu parça iki paragrafa ayrılsa ikinci paragraf hangisiyle başlamalıdır?",
      correct: "III.",
      distractors: ["IV.", "I.", "V.", "II."],
      hint: "İki satış ortamının açıklamalarını kendi içinde grupla.",
      explanation:
        "I–II yüz yüze pazardaki konuşmayı, III–V sayısal ortamdaki bilgi ve karşılaştırmayı anlatır. Yeni ortam III’te tanıtılır. IV’ten bölmek bu tanıtımı yanlış grupta bırakır. Her iki blok alışverişle ilgilidir ama bakış yönleri farklıdır.",
    },
    {
      passage:
        "(I) Bir serginin açılışına hazırlanmak plan ister. (II) Yapıtların yerleri önceden belirlenir. (III) Etiketler bu plana göre hazırlanır. (IV) Açılıştan sonra ziyaretçi yorumlarını toplamak da önemlidir. (V) Bu yorumlar sonraki düzenlemelere yön verebilir.",
      prompt: "İkinci paragraf nerede başlamalıdır?",
      correct: "IV.",
      distractors: ["III.", "II.", "I.", "V."],
      hint: "Hazırlık aşaması ile açılıştan sonraki değerlendirme amacını ayır.",
      explanation:
        "İlk grup sergi öncesi yerleşim ve etiket hazırlığını anlatır. IV açılış sonrasındaki değerlendirmeyi başlatır ve V onun yararını verir. Zaman değişimi burada aynı zamanda işlev değişimidir; karar yalnız bir takvim sözüne değil, bu iki odağa dayanır.",
    },
    {
      passage:
        "(I) Sözlü anlatıda ses tonu anlamı destekler. (II) Anlatıcı vurguyla önemli noktaları öne çıkarır. (III) Dinleyici bu vurgulardan duyguyu da sezebilir. (IV) Yazılı anlatıda ise noktalama ve sözcük seçimi öne çıkar. (V) Okur metindeki ipuçlarını yeniden okuyabilir.",
      prompt: "Hangi ayrım iki tutarlı paragraf oluşturur?",
      correct: "I–III / IV–V.",
      distractors: [
        "I / II–V.",
        "I–II / III–V.",
        "I–IV / V.",
        "I–V / boş ikinci bölüm.",
      ],
      hint: "Sözlü ve yazılı anlatımın açıklamalarını ayrı tut.",
      explanation:
        "I–III sözlü anlatıda ses ve vurgu ilişkisini geliştirir. IV yazılı anlatımın araçlarını tanıtır, V okurun bu metinle ilişkisini sürdürür. İlk bloğu III’ten önce kesmek aynı ses açıklamasını böler; IV’ü ilk blokta bırakmak yeni odağı ayırmaz.",
    },
    {
      passage:
        "(I) Bir bitkinin gelişimini izlemek düzenli gözlem ister. (II) Boyu aynı aralıklarla ölçmek karşılaştırmayı kolaylaştırır. (III) Örneğin her pazartesi ölçülen bir fide için haftalık kayıt tutulabilir. (IV) Bu kayıtlar büyüme hızındaki değişimleri gösterir. (V) Bitkinin çoğaltılmasında ise tohum veya çelik gibi yollar kullanılabilir. (VI) Seçilen yol bitkinin özelliklerine göre değişir.",
      prompt: "İkinci paragraf hangi cümleyle başlamalıdır?",
      correct: "V.",
      distractors: ["II.", "III.", "IV.", "VI."],
      hint: "Gözlem yöntemi ve örneğini tamamlayıp çoğaltma yönüne geç.",
      explanation:
        "I–IV ölçme ve kayıtla gelişimi izlemeyi anlatır; III kısa örnek, IV onun sonucudur. V çoğaltma yollarını tanıtır, VI bu yeni yönü açıklar. Yeni bitki ayrıntısı her cümlede paragraf gerektirmez; açıklamanın amacı V’te değişmektedir.",
    },
  ],
  "akisi-bozan-cumle": [
    {
      passage:
        "(I) Bahçede yağmur suyu biriktiriliyor. (II) Su kapalı bir kapta tutuluyor. (III) Okul sergisi cuma günü açılacak. (IV) Bu kap haftada bir temizleniyor. (V) Biriken su çiçekleri sulamakta kullanılıyor.",
      prompt: "Bu parçanın akışını hangi cümle bozmaktadır?",
      correct: "III.",
      distractors: ["I.", "II.", "IV.", "V."],
      hint: "Suyu toplama ve kullanma çizgisine katkı vermeyen cümleyi ara.",
      explanation:
        "III serginin açılışını bildirir; suyu toplama, temiz tutma ve kullanma açıklamasına katkı yapmaz. Çıkarıldığında II’deki kap IV’teki bu kap sözüne bağlanır, V kullanımı tamamlar. II’yi silmekse öncülü kaybettirir ve sergi sapmasını da bırakır.",
    },
    {
      passage:
        "(I) Kentin eski sineması yenilendi. (II) Atölyede atık kâğıtlar ayrı toplanıyor. (III) Bu kâğıtlar küçük parçalara ayrılıyor. (IV) Parçalar yeniden kullanılacak hamura katılıyor. (V) Böylece kâğıt atığı azaltılıyor.",
      prompt: "Düşüncenin akışını bozan cümle hangisidir?",
      correct: "I.",
      distractors: ["II.", "III.", "IV.", "V."],
      hint: "Sonraki dört cümlenin hangi ortak işlemi anlattığına bak.",
      explanation:
        "II–V kâğıt atığının yeniden kullanılması sürecini tanıtır ve sürdürür. I sinemanın yenilenmesiyle başka bir olayı bildirir. I çıkarılınca II anlaşılır bir başlangıç oluşturur; bu kâğıtlar, parçalar ve böylece bağları da korunur.",
    },
    {
      passage:
        "(I) Yıl etiketleri arşivde aramayı kolaylaştırır. (II) Her dolabın kapsadığı yıllar kapısında belirtilir. (III) Böylece araştırmacı ilgili dolaba doğrudan yönelir. (IV) Açık etiketler gereksiz aramayı azaltır. (V) Kent orkestrası gelecek hafta yeni bir konser verecektir.",
      prompt: "Hangisi akışı bozmaktadır?",
      correct: "V.",
      distractors: ["I.", "II.", "III.", "IV."],
      hint: "Arşivde erişim açıklamasından başka bir olaya sıçramayı bul.",
      explanation:
        "I–IV etiketlerin aramayı nasıl kolaylaştırdığını anlatır. V orkestra konserini bildirir ve bu erişim ilişkisinin örneği, nedeni veya sonucu değildir. Son cümle olduğu için sonuç kabul edilmez; çıkarılınca arşiv odağı tamamlanmış kalır.",
    },
    {
      passage:
        "(I) Dijital kataloglar aramayı hızlandırır. (II) Ancak yanlış etiketlenen kayıtlar yine bulunamayabilir. (III) Bu nedenle kayıtların düzenli denetlenmesi gerekir. (IV) Etiket denetimi erişimin doğruluğunu artırır. (V) Katalog binasının karşısında yeni bir fırın açılmıştır.",
      prompt: "Bu parçadan hangi cümle çıkarılırsa akış düzelir?",
      correct: "V.",
      distractors: ["I.", "II.", "III.", "IV."],
      hint: "Karşıtlığın aynı erişim sorununu açıklayıp açıklamadığını denetle.",
      explanation:
        "II bir kopukluk değil, katalog yararının sınırıdır; III ve IV denetleme gereğini bu sorunla bağlar. V fırın açılışıyla başka bir amaç taşır. V çıkarılınca yarar, sorun ve çözüm zinciri korunur; II’yi çıkarmak gerekçeyi zayıflatır.",
    },
    {
      passage:
        "(I) Düzenli etiketleme aramayı kolaylaştırır. (II) Örneğin okul arşivinde her deftere yıl etiketi eklenmiştir. (III) Bu etiketler araştırmacıların doğru deftere ulaşmasını hızlandırmıştır. (IV) Okul takımının yeni formaları mavi renktedir. (V) Uygulama, etiketlemenin erişime katkısını somutlaştırmıştır.",
      prompt: "Düşünce akışını bozan cümle hangisidir?",
      correct: "IV.",
      distractors: ["I.", "II.", "III.", "V."],
      hint: "Genel savı, örneğini ve sonucu bir arada tut.",
      explanation:
        "II’deki okul arşivi, I’deki etiketleme savının somut örneğidir; III sonucu ve V değerlendirmeyi verir. IV’teki forma rengi bu ilişkiye katkı yapmaz. Aynı okuldan söz edilmesi yeterli değildir; çıkarıldığında örnekten değerlendirmeye doğal geçiş sürer.",
    },
    {
      passage:
        "(I) Bir fidenin boyu her pazartesi ölçülüyor. (II) Ölçümler tarihleriyle bir deftere yazılıyor. (III) Defterdeki değerler haftalık gelişmeyi karşılaştırmayı sağlıyor. (IV) Mahalledeki yol çalışması cuma günü bitecek. (V) Böylece fidenin büyümesindeki değişim izlenebiliyor.",
      prompt: "Hangi cümle akışı bozar?",
      correct: "IV.",
      distractors: ["I.", "II.", "III.", "V."],
      hint: "Ölçme, kayıt ve büyümeyi izleme zincirini koru.",
      explanation:
        "I ölçümü, II kaydı, III karşılaştırmayı, V bu işlemlerin sonucunu verir. IV yol çalışmasının bitişiyle başka bir olayı bildirir. IV çıkarılınca III’ten V’e sonuç ilişkisi anlaşılır; tarih sözü geçmesi yol çalışmasını gözlemin parçası yapmaz.",
    },
    {
      passage:
        "(I) Kayıt görevlisi belgeleri yıllarına göre ayırdı. (II) Ardından her grubun bilgisini kataloğa yazdı. (III) Bu bilgiler arama ekranında yıl seçilerek bulunabiliyor. (IV) Ekrandaki filtre araştırmayı hızlandırıyor. (V) Görevlinin çocukken en sevdiği tatlı sütlaçtı.",
      prompt: "Bu parçada akışı bozan cümle hangisidir?",
      correct: "V.",
      distractors: ["I.", "II.", "III.", "IV."],
      hint: "Kişinin aynı olmasıyla işlevin aynı olmasını ayır.",
      explanation:
        "İlk dört cümle arşiv düzenlemesinden arama kolaylığına ilerler. V aynı görevliyle ilgili olsa da çocuklukta sevdiği tatlıyı anlatır; arşiv işlemlerini açıklamaz. Bu nedenle V çıkarılır. Aynı kişi adı bütün bilgileri aynı paragraf amacına bağlamaz.",
    },
    {
      passage:
        "(I) Bahçe ekibi yeni dikilen ağaçları düzenli suluyor. (II) Sabah yapılan kontrol toprağın kuruyup kurumadığını gösteriyor. (III) Ekip bu kontrolün sonucuna göre su miktarını ayarlıyor. (IV) Yüzme yarışında birinci olan sporcu kupasını aldı. (V) Bu düzen, gereksiz su kullanımını azaltmayı amaçlıyor.",
      prompt: "Hangisi düşüncenin akışını bozmaktadır?",
      correct: "IV.",
      distractors: ["I.", "II.", "III.", "V."],
      hint: "Sulama kararını açıklayan cümlelerle farklı olayı ayır.",
      explanation:
        "I–III sulama ve kontrol işlemlerini, V bu düzenin amacını anlatır. IV yüzme yarışıyla başka bir olayı bildirir. IV çıkarılınca III’teki miktar ayarlama doğrudan V’teki amaçla bağlanır. Başka bir başarı örneği olması bu cümleyi sulama açıklamasına katmaz.",
    },
    {
      passage:
        "(I) Müzedeki etiketler sade bir dille yeniden yazıldı. (II) Böylece ziyaretçiler terimlerin anlamını daha kolay kavrıyor. (III) Özellikle çocuklar kısa açıklamalardan yararlanıyor. (IV) Müzeye ait otobüsün lastikleri geçen ay değiştirildi. (V) Düzenleme, sergilenen nesneleri anlamayı kolaylaştırmayı hedefliyor.",
      prompt: "Bu parçadan hangisi çıkarılmalıdır?",
      correct: "IV.",
      distractors: ["I.", "II.", "III.", "V."],
      hint: "Müze ortak adının arkasındaki farklı amaçları incele.",
      explanation:
        "I–III ve V etiketlerin anlaşılabilirliğini ve yararını açıklar. IV ulaşım aracının bakımını bildirir; sergi nesnelerini anlama amacını geliştirmez. Ortak müze adı tek başına anlam bağı değildir. IV çıkarılınca yarardan hedefe geçiş aynı odağı korur.",
    },
    {
      passage:
        "(I) Sesli kitaplar, dinleyerek metin izlemek isteyenlere bir seçenek sunar. (II) Ancak anlatıcının tonlaması yorum üzerinde etkili olabilir. (III) Bu nedenle dinleyici anlatım sesinin metin deneyimine katkısını da fark etmelidir. (IV) Farklı anlatıcılar aynı metnin başka yönlerini öne çıkarabilir. (V) Ses kayıtlarının tutulduğu binanın karşısında bu yıl bir mağaza açıldı.",
      prompt: "Akışı bozan cümle hangisidir?",
      correct: "V.",
      distractors: ["I.", "II.", "III.", "IV."],
      hint: "Metin deneyiminin koşullarını anlatan karşıtlıkla yer bilgisini karşılaştır.",
      explanation:
        "I–IV sesli kitap deneyimini ve tonlamanın etkisini birlikte tartışır; II’deki ancak gerekli bir sınırlama getirir. V yalnız mağaza açılışını bildirir ve bu deneyime ilişkin açıklama değildir. V çıkarılınca seçenek, etki ve farkındalık zinciri bütün kalır.",
    },
  ],
  "paragraf-ana-dusunce-ileri": [
    {
      passage:
        "Arşivde belgeyi yalnız saklamak yetmez. Açık yıl etiketleri aramayı hızlandırır; kataloglar farklı yerlerden taramayı sağlar. Belgeyi koruma işi, ona düzenli erişim sunulduğunda işlevini tamamlar.",
      prompt: "Bu parçanın ana düşüncesi hangisidir?",
      correct:
        "Arşivlerde belgeyi korumak, ona düzenli erişim sağlamakla tamamlanmalıdır.",
      distractors: [
        "Bütün arşiv belgeleri aynı yılda üretilmiştir.",
        "Yıl etiketleri katalogların yerini tamamen almalıdır.",
        "Arşivlerde yalnız dijital belgeler tutulmalıdır.",
        "Belge sayısı arttıkça araştırma her koşulda kolaylaşır.",
      ],
      hint: "Etiket ve katalog örneklerinin hizmet ettiği ortak yargıyı bul.",
      explanation:
        "Metin yalnız saklamayı yetersiz görür; etiket ve katalog örnekleri erişim imkânını somutlaştırır. Ana düşünce koruma ile erişimin birlikte düşünülmesidir. Aynı yıl, yalnız dijital belge, katalogları kaldırma ve her koşulda kolaylaşma iddiaları metinde yoktur.",
    },
    {
      passage:
        "“Hızlı bitiren iyi okurdur.” diyenler var. Oysa okur bazen tek sayfada durup sorular sorduğunda metni daha derinden kavrar. Okumanın değeri sayfa sayısından önce anlamayla ilişkilidir.",
      prompt: "Yazarın asıl savunduğu düşünce hangisidir?",
      correct:
        "Okumanın değeri yalnız hızla değil, metni anlamayla değerlendirilmelidir.",
      distractors: [
        "En iyi okur her kitabı en hızlı bitirendir.",
        "Bütün kitaplar aynı sürede okunmalıdır.",
        "Kitap okumak yerine yalnız soru sormak yeterlidir.",
        "Bir kitabı bitirmek her durumda gereksizdir.",
      ],
      hint: "Aktarılan ilk görüş ile yazarın itirazını ayrı oku.",
      explanation:
        "İlk cümlede başkalarının hız ölçütü aktarılır; oysa ile başlayan bölüm yazarın anlamayı öne çıkardığını gösterir. Yazar bütün kitaplar için sabit hız veya kitabı bitirmeme kuralı koymaz. Ana sav hızın tek ölçüt olmamasıdır; sorular anlamaya katkı örneğidir.",
    },
    {
      passage:
        "Dijital kataloglar belge aramayı hızlandırır. Fakat yanlış etiketler araştırmacıyı yanıltabilir. Bu araçlardan yararlanmak, kayıtları doğru ve güncel tutmakla mümkündür.",
      prompt:
        "Bu parçanın ana düşüncesini en uygun karşılayan yargı hangisidir?",
      correct:
        "Dijital kataloglardan yararlanmak, kayıtların doğru ve güncel tutulmasına bağlıdır.",
      distractors: [
        "Dijital kataloglar bütün araştırma sorunlarını kesin çözer.",
        "Yanlış etiket ihtimali yüzünden bütün kataloglar kaldırılmalıdır.",
        "Katalogların tek amacı eski belgeleri yok etmektir.",
        "Araştırmacıların hiçbir kaydı kontrol etmesi gerekmez.",
      ],
      hint: "Yararı ve bu yararın koşulunu aynı yargıda birleştir.",
      explanation:
        "Metin arama hızına katkıyı kabul eder, yanlış etiketin sınırını gösterir ve doğru güncel kaydı gerekli görür. Uygun sav bu dengeyi korur. Mutlak başarı, bütün katalogları kaldırma, belge yok etme veya kontrol gereksizliği hem yararı hem koşulu çarpıtır.",
    },
    {
      passage:
        "Bir okulda bahçenin temiz tutulması yalnız görevlinin işi sayılıyordu. Öğrenciler de kendi kullandıkları alanları düzenli bırakmaya başlayınca atıklar azaldı. Ortak alanı korumak, onu kullananların sorumluluğu paylaşmasıyla güçlendi.",
      prompt: "Bu parçanın ana düşüncesi hangisidir?",
      correct:
        "Ortak alanları korumak, kullanıcıların sorumluluğu paylaşmasıyla güçlenir.",
      distractors: [
        "Ortak alanları yalnız görevliler kullanmalıdır.",
        "Öğrencilerin bulunduğu her bahçe mutlaka kirlenir.",
        "Temizliğin tek yolu bahçeyi tamamen kapatmaktır.",
        "Alan büyüdükçe sorumluluğa hiç gerek kalmaz.",
      ],
      hint: "Örnekteki değişimin hangi ortak ilkeyi gösterdiğini bul.",
      explanation:
        "Öğrencilerin sorumluluğa katılmasıyla atık azalması, ortak alan bakımında paylaşımın yararını somutlaştırır. Son cümle bu savı açıklar. Metin öğrencileri bütün bahçeler için suçlamaz, alanı kapatma veya yalnız görevlilere bırakma önerisi de sunmaz.",
    },
    {
      passage:
        "Bir sergiye çok sayıda yapıt koymak tek başına iyi bir sunum yaratmaz. Yapıtların ilişkisi açıklanmadığında ziyaretçi neye bakacağını bilemeyebilir. Az ama birbirini açıklayan yapıtlarla kurulan bir düzen, düşünceyi daha anlaşılır taşıyabilir.",
      prompt: "Bu parçanın ana düşüncesi hangisidir?",
      correct:
        "Sunumun niteliği yalnız yapıt sayısına değil, kurulan anlamlı düzene de bağlıdır.",
      distractors: [
        "İyi sergide mutlaka yalnız tek yapıt bulunmalıdır.",
        "Ziyaretçiler hiçbir yapıtı kendi başlarına anlayamaz.",
        "Bir sergide sayı her koşulda tek kalite ölçütüdür.",
        "Yapıtlar arasında hiçbir ilişki kurulmamalıdır.",
      ],
      hint: "Sayı ile anlamlı düzenin hangi yönde karşılaştırıldığına bak.",
      explanation:
        "Paragraf çokluğu tek başına yeterli bulmaz; ilişkilerin anlaşılır düzenlenmesini öne çıkarır. Az yapıtın yararlı olabilmesi örnektir, zorunlu tek yapıt kuralı değildir. Uygun ana düşünce kaliteyi sayıya indirgemeden anlamlı düzenin katkısını korur.",
    },
    {
      passage:
        "Çeviride sözcüklerin sözlük karşılıklarını yan yana getirmek her zaman yeterli olmaz. Bir sözün olay içindeki tonu ve amacı da yeni dilde karşılık bulmalıdır. Çevirmen, sözcüklerle birlikte bu ilişkileri de yeniden kurar.",
      prompt: "Asıl anlatılmak istenen hangisidir?",
      correct:
        "Çeviri, sözcük karşılıklarıyla birlikte bağlamın anlam ilişkilerini de taşımalıdır.",
      distractors: [
        "Çeviride hiçbir sözlük kullanılmamalıdır.",
        "Her sözcüğün bütün dillerde yalnız tek karşılığı vardır.",
        "Çevirmen kaynak metni hiç okumadan çalışabilir.",
        "Çevirinin tek görevi sözcük sayısını aynı tutmaktır.",
      ],
      hint: "Sözlük karşılığının yanında hangi iki unsurun istendiğini belirle.",
      explanation:
        "Parça sözlük karşılıklarını bütünüyle reddetmez; onları tek başına yetersiz bulur. Ton, amaç ve bağlam ilişkilerinin yeniden kurulmasını savunur. Bu yüzden sözlüğü yasaklama, kaynağı okumama, tek anlam veya eşit sözcük sayısı gibi uç yargılar ana düşünceyi vermez.",
    },
    {
      passage:
        "Bir denemenin ilk sonucu bekleneni vermeyince ekip bütün yöntemi bırakmadı. Ölçümün hangi aşamada değiştiğini inceleyip yalnız gerekli adımı düzeltti. Hata, süreci yeniden anlamak için bir ipucu oldu.",
      prompt: "Bu parçanın ana düşüncesi hangisidir?",
      correct:
        "Beklenmeyen sonuçları incelemek, süreci geliştirmeye yardımcı olabilir.",
      distractors: [
        "Her hata yöntemin tümüyle değersiz olduğunu kanıtlar.",
        "Denemelerde ölçüm yapmak hiçbir işe yaramaz.",
        "İlk sonuç bekleneni vermezse çalışmak bırakılmalıdır.",
        "Hatalar her durumda kesin başarı garantisidir.",
      ],
      hint: "Ekibin yaptığı inceleme ile yöntemdeki dar değişimi birlikte değerlendir.",
      explanation:
        "Ekip hatayı tüm çalışmayı terk etme nedeni olarak değil, değişen aşamayı anlama ve düzeltme ipucu olarak kullanır. Sav hatanın incelenmesinin yararıdır. Her hatanın garanti başarı verdiği söylenmediği gibi bütün yöntemin değersiz olduğu da çıkarılmaz.",
    },
    {
      passage:
        "Bir kentin belleği yalnız büyük anıtlarda yaşamaz. Mahallede tutulan günlükler, eski dükkân fotoğrafları ve sıradan insanların mektupları da geçmişi anlamaya katkı verir. Küçük kayıtlar büyük anlatının görünmeyen yanlarını tamamlar.",
      prompt: "Bu parçanın ana düşüncesi hangisidir?",
      correct:
        "Gündelik yaşamın küçük kayıtları da kentin geçmişini anlamada değerlidir.",
      distractors: [
        "Büyük anıtların geçmişle hiçbir ilgisi yoktur.",
        "Yalnız tanınmış kişilerin mektupları korunmalıdır.",
        "Fotoğraflar geçmişi anlamayı her durumda engeller.",
        "Kent belleği yalnız resmî binaların sayısından oluşur.",
      ],
      hint: "Yalnız değildir yapısının diğer ögeleri tümden reddedip reddetmediğini düşün.",
      explanation:
        "Parça anıtların değerini silmeden gündelik kayıtların da katkısını ekler. Günlük, fotoğraf ve mektup bu ortak savın örnekleridir. Yalnız gündelik veya yalnız resmî kayıt gibi dışlayıcı yargılar eklenemez; asıl düşünce küçük kayıtların da değer taşımasıdır.",
    },
    {
      passage:
        "Bir öğrencinin her gün kısa süre ayırarak sürdürdüğü çalışma sonunda ilerlediği görülüyor. Başka bir öğrenci aynı işi son güne bırakınca zorlanıyor. Bu iki örnekte çalışma süresinin tek seferde büyüklüğünden çok sürekliliği öne çıkıyor.",
      prompt: "Parçanın ana düşüncesine en uygun yargı hangisidir?",
      correct: "Düzenli küçük çalışmalar, ilerlemeyi destekleyebilir.",
      distractors: [
        "Bütün öğrenciler yalnız beş dakika çalışarak kesin başarılı olur.",
        "Uzun çalışma oturumlarının hiçbiri hiçbir yarar sağlamaz.",
        "Çalışmaya son gün başlamak her koşulda en etkili yoldur.",
        "Öğrencilerin hangi konuda çalıştığı hiçbir zaman önemli değildir.",
      ],
      hint: "İki örneğin desteklediği yönü, istisnasız yasaya dönüştürmeden söyle.",
      explanation:
        "İki örnek sürekliliğin yararını karşılaştırmalı olarak gösterir. Destekleyebilir ifadesi bu kapsamı korur. Bütün öğrenciler için belirli dakika garantisi, bütün uzun oturumları değersiz sayma veya konuyu önemsizleştirme metinde bulunmayan ek iddialardır.",
    },
    {
      passage:
        "Bir müze etiketinde kullanılan teknik terim ziyaretçiye açıklanmazsa nesneyle anlamlı bağ kurmak güçleşebilir. Terimi açık bir örnekle anlatan kısa bir açıklama ise nesnenin işlevini görünür kılar. Bilgi sunmak, okurun onu anlayabileceği bir dil kurmayı da gerektirir.",
      prompt: "Bu parçanın ana düşüncesi hangisidir?",
      correct:
        "Bilginin etkili sunumu, hedef kişinin anlayabileceği bir anlatımı gerektirir.",
      distractors: [
        "Teknik terimlerin bulunduğu bütün metinler değersizdir.",
        "Müzelerde hiçbir nesnenin işlevi açıklanmamalıdır.",
        "Açıklama ne kadar kapalıysa bilgi o kadar iyi aktarılır.",
        "Bilginin tek değeri kullanılan terimlerin uzunluğudur.",
      ],
      hint: "Örnekteki etiket sorununu son cümledeki genel yargıyla birleştir.",
      explanation:
        "Teknik terimin açıklanmaması ile açık örneğin sağladığı yarar karşılaştırılır. Ana sav bilginin anlaşılır dille sunulması gereğidir. Teknik terimlerin tümünü yasaklamak veya nesnenin işlevini açıklamamak söylenmez; açık ve hedefe uygun anlatım desteklenir.",
    },
  ],
};
const positions019 = [
  [1, 4, 0, 2, 3, 0, 3, 1, 4, 2],
  [4, 1, 3, 0, 2, 2, 0, 4, 1, 3],
  [2, 0, 4, 1, 3, 1, 4, 0, 3, 2],
  [0, 3, 1, 4, 2, 3, 2, 0, 4, 1],
];
export const forge019TurkishTopics: Record<string, string> = {
  "yardimci-dusunce": "detail-271",
  "ikiye-bolme": "detail-272",
  "akisi-bozan-cumle": "detail-273",
  "paragraf-ana-dusunce-ileri": "detail-270",
};
export const forge019TurkishGuides: LessonGuide[] = guideSpecs019.map(
  ({ title: _title, ...guide }) => guide,
);
function questions019(id: string, pack: number): Question[] {
  return questionRows019[id].map((row, index) => {
    const answer = positions019[pack][index],
      raw = [row.correct, ...row.distractors];
    return {
      id: `${id}-019-${index + 1}`,
      prompt: txt(row.prompt),
      passage: txt(row.passage),
      options: raw.map((_, i) => txt(raw[(i - answer + 5) % 5])),
      answer,
      hint: txt(row.hint),
      explanation: txt(row.explanation),
      skill: id,
    };
  });
}
export const forge019TurkishLessons: Lesson[] = guideSpecs019.map(
  (g, pack) => ({
    id: g.id,
    subjectId: "tyt-turkce",
    title: txt(g.title),
    minutes: g.minutes,
    objectives: g.objectives.map(txt),
    body: g.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: questions019(g.id, pack),
    source: txt(g.source),
    tags: ["kaynakli-anlatim", "adim-adim", "Özgün öğretim soruları"],
  }),
);
forge019TurkishLessons.push({
  id: "paragraf-ana-dusunce-ileri",
  subjectId: "tyt-turkce",
  title: txt("Ana düşünce: ileri kanıt uygulamaları"),
  minutes: 30,
  objectives: [
    txt("Tam pasajdan ana savı çıkar; kapsamını ve dayanaklarını karşılaştır."),
  ],
  body: [],
  questions: questions019("paragraf-ana-dusunce-ileri", 3),
  source: txt(
    "Aurelia Ana Düşünce; MEBİ ve OGM paragraf kaynakları doğrultusunda hazırlanmış özgün ek sorular.",
  ),
  tags: ["soru-seti", "Özgün öğretim soruları"],
});

export interface TurkishNode019 {
  label: string;
  text: string;
  group: number;
  excluded: boolean;
}
export interface TurkishLink019 {
  source: number;
  target: number;
  label: string;
  valid: boolean;
}
interface BaseCase019 {
  id: string;
  label: string;
  context: string;
  sentences: string[];
}
interface EvidenceCase019 extends BaseCase019 {
  kind: "evidence";
  claims: {
    text: string;
    decision: string;
    references: number[];
    reason: string;
  }[];
}
interface SplitCase019 extends BaseCase019 {
  kind: "split";
  boundary: number;
  titles: [string, string];
  links: { source: number; target: number; label: string }[];
}
interface FlowCase019 extends BaseCase019 {
  kind: "flow";
  intruder: number;
  links: { source: number; target: number; label: string; anaphor?: boolean }[];
}
type Case019 = EvidenceCase019 | SplitCase019 | FlowCase019;
const corpus019: Record<string, Case019[]> = {
  "yardimci-dusunce": [
    {
      kind: "evidence",
      id: "kutuphane",
      label: "Kütüphane: destek, çelişki ve belirsizlik",
      context:
        "Her iddiayı aynı tam pasajla karşılaştır. Kuruluş yılı, gider paylaşımı ve etkinlik bilgileri ayrı öncüllerdir.",
      sentences: [
        "Bu kütüphane 1990’da açıldı.",
        "Yenileme giderlerinin yalnız yarısını mahalleli, kalanını belediye karşıladı.",
        "Çocuklar için her hafta bir okuma buluşması başladı.",
      ],
      claims: [
        {
          text: "Kentteki en eski kütüphane budur.",
          decision: "Kanıt yetmez",
          references: [0],
          reason:
            "Kuruluş yılı var; başka bir kütüphane için tarih yok. Kent içi sıralama da açık değil.",
        },
        {
          text: "Çocuklar için düzenli bir etkinlik başladı.",
          decision: "Destek var",
          references: [2],
          reason:
            "Her hafta sözü düzenli tekrarı, başladı sözü yeni etkinliği bildirir; iki bilgi üçüncü cümlede açıkça var.",
        },
        {
          text: "Yenileme işinin tüm giderlerini mahalleli ödedi.",
          decision: "Metinle çelişiyor",
          references: [1],
          reason:
            "Yalnız yarısı mahalleliye, kalan yarısı belediyeye aittir; bütününü mahalleliye yüklemek bu bilgiye aykırıdır.",
        },
      ],
    },
    {
      kind: "evidence",
      id: "atolye",
      label: "Atölye: iki öncülden sonuç",
      context:
        "Bir gruba ait genel kuralı, o grupta olduğu açık verilen kişiye uygula. Sergileme ile taslak teslimini ayır.",
      sentences: [
        "Atölyeye katılan herkes bir taslak teslim etti.",
        "Ece atölyeye katıldı.",
        "Taslak veren kişiler içinde yalnız Ece çalışmasını sergiledi.",
      ],
      claims: [
        {
          text: "Ece bir taslak teslim etmiştir.",
          decision: "Destek var",
          references: [0, 1],
          reason:
            "Her katılımcı taslak verdi; Ece de katılımcıdır. İki öncül birlikte bu sonucu zorunlu kılar.",
        },
        {
          text: "Atölyeye katılan herkes işini sergiledi.",
          decision: "Kanıt yetmez",
          references: [2],
          reason:
            "Yalnız Ece sergiledi; Ece dışında katılım bilgisi yok. Bu yüzden herkes yargısı için yeterli kanıt yok.",
        },
        {
          text: "Ece’nin taslak teslim ettiği yıl 2024’tür.",
          decision: "Kanıt yetmez",
          references: [0, 1],
          reason:
            "Taslak teslimi ve Ece’nin üyeliği verilir; takvim yılı hiçbir cümlede belirtilmez.",
        },
      ],
    },
    {
      kind: "evidence",
      id: "katalog",
      label: "Katalog: olayları zaman çizgisinde birleştir",
      context:
        "Hazırlama, açılma ve güncelleme farklı olaylardır. Bir olayın tarihini diğerinin yerine koyma.",
      sentences: [
        "Müze 2020’de sayısal katalog için hazırlığa başladı.",
        "İlk katalog 2022’de ziyarete açıldı.",
        "Katalog kayıtları 2024’te güncellendi.",
      ],
      claims: [
        {
          text: "Katalog ziyarete açıldıktan sonra güncellendi.",
          decision: "Destek var",
          references: [1, 2],
          reason:
            "Açılma 2022, güncelleme 2024’tür. Tarihler iki olayın sırasını gösterir.",
        },
        {
          text: "Katalog hazırlığı 2022’de başladı.",
          decision: "Metinle çelişiyor",
          references: [0],
          reason:
            "Hazırlığın başlangıcı açıkça 2020’dir; 2022 ise kataloğun ziyaretçiye açıldığı tarihtir.",
        },
        {
          text: "Müze 2020’de kuruldu.",
          decision: "Kanıt yetmez",
          references: [0],
          reason:
            "2020 katalog hazırlığına aittir. Müzenin kuruluş tarihi verilmediği için bu tarih kuruluşa taşınamaz.",
        },
      ],
    },
  ],
  "ikiye-bolme": [
    {
      kind: "split",
      id: "arsiv",
      label: "Arşiv: fiziksel korumadan erişime",
      context:
        "Bütün cümleler korunur. Bir sınır seç; iki bloğun hangi ayrı soruya yanıt verdiğini incele.",
      sentences: [
        "Kâğıt belgeleri nemden korumak gerekir.",
        "Bu amaçla dolaplarda nem izlenir.",
        "Düzenli ölçüm fiziksel yıpranmayı erken gösterir.",
        "Dijital kataloglar belgeye erişimi daha kolay kılar.",
        "Yıl etiketleri aramayı hızlandırır.",
      ],
      boundary: 3,
      titles: ["Belgeleri fiziksel koruma", "Belgeye erişimi düzenleme"],
      links: [
        { source: 0, target: 1, label: "Koruma amacı → araç" },
        { source: 1, target: 2, label: "Ölçümün yararı" },
        { source: 3, target: 4, label: "Erişimin bir yolu" },
      ],
    },
    {
      kind: "split",
      id: "kisiler",
      label: "Plan: iki ayrı çalışma yaklaşımı",
      context:
        "Yeni kişi adını tek başına ölçüt sayma. Her yaklaşımın açıklandığı grubu bir arada tut.",
      sentences: [
        "Ece çalışırken ayrıntılı bir plan yapar.",
        "İşleri sırayla bitirmek onu rahatlatır.",
        "Bora ise planı yalnız başlangıç taslağı sayar.",
        "Yeni bir ihtiyaç doğunca çalışma sırasını değiştirir.",
        "Bu esneklik plansız işleri zamanında bitirmesini sağlar.",
      ],
      boundary: 2,
      titles: ["Ece’nin ayrıntılı planı", "Bora’nın esnek planı"],
      links: [
        { source: 0, target: 1, label: "Yaklaşımın etkisi" },
        { source: 2, target: 3, label: "Yaklaşımın uygulanışı" },
        { source: 3, target: 4, label: "Esnekliğin sonucu" },
      ],
    },
    {
      kind: "split",
      id: "fide",
      label: "Fide: gözlemden çoğaltmaya",
      context:
        "Örnek ve onun sonucu ilk açıklamayı geliştirir. Yeni paragrafı örnek sözcüğüne değil değişen amaca göre kur.",
      sentences: [
        "Bir bitkinin gelişimini izlemek düzenli gözlem ister.",
        "Boyu aynı aralıklarla ölçmek, ölçüleri yan yana görmeyi kolay kılar.",
        "Örneğin her pazartesi ölçülen bir fide için haftalık kayıt tutulabilir.",
        "Bu kayıtlar büyüme hızındaki değişimleri gösterir.",
        "Bitkiyi çoğaltmak için tohum veya çelik gibi yollar seçilebilir.",
        "Bitkinin nitelikleri yol seçimini etkiler.",
      ],
      boundary: 4,
      titles: ["Gelişimi ölçüp kaydetme", "Bitkiyi çoğaltma yolları"],
      links: [
        { source: 0, target: 1, label: "Gözlemin yöntemi" },
        { source: 1, target: 2, label: "Yöntemin örneği" },
        { source: 2, target: 3, label: "Kayıtların katkısı" },
        { source: 4, target: 5, label: "Yol seçiminin koşulu" },
      ],
    },
  ],
  "akisi-bozan-cumle": [
    {
      kind: "flow",
      id: "yagmur",
      label: "Yağmur suyu: kap ve ilgisiz sergi",
      context:
        "Adayı çıkarıp kalan tam metni oku. Sergi bilgisi ile suyu toplama ve kullanma zincirini karşılaştır.",
      sentences: [
        "Bahçede yağmur suyu toplanıyor.",
        "Su kapalı bir kapta tutuluyor.",
        "Okul sergisi cuma günü açılacak.",
        "Bu kap haftada bir temizlenir.",
        "Biriken su çiçekleri sulamakta kullanılıyor.",
      ],
      intruder: 2,
      links: [
        { source: 0, target: 1, label: "Toplanan suyun saklanması" },
        { source: 1, target: 3, label: "Kap → bu kap", anaphor: true },
        { source: 3, target: 4, label: "Bakım ve kullanım" },
      ],
    },
    {
      kind: "flow",
      id: "kagit",
      label: "Atık kâğıt: başlangıç da sapabilir",
      context:
        "İlk cümleyi otomatik giriş kabul etme. Sonraki dört cümlenin kurduğu işlem zincirini birlikte incele.",
      sentences: [
        "Kentin eski sineması yenilendi.",
        "Atölyede atık kâğıtlar ayrı toplanıyor.",
        "Bu kâğıtlar küçük parçalara ayrılıyor.",
        "Parçalar yeniden kullanım için hamura katılıyor.",
        "Böylece kâğıt atığı azaltılıyor.",
      ],
      intruder: 0,
      links: [
        {
          source: 1,
          target: 2,
          label: "Kâğıtlar → bu kâğıtlar",
          anaphor: true,
        },
        { source: 2, target: 3, label: "Parçalar → işlem", anaphor: true },
        { source: 3, target: 4, label: "İşlem → sonuç" },
      ],
    },
    {
      kind: "flow",
      id: "etiket",
      label: "Katalog: karşıtlık aynı sorunu geliştirir",
      context:
        "Ancak ile başlayan cümle yararı sınırlar ve çözüm için gerekçe olur. İlgisiz yer bilgisini bu işlevle karıştırma.",
      sentences: [
        "Dijital kataloglar aramayı hızlandırır.",
        "Ancak yanlış etiketlenen kayıtlara erişmek yine güç olabilir.",
        "Bu nedenle kayıtları düzenli kontrol etmek gerekir.",
        "Etiket kontrolü doğru kayda ulaşmayı destekler.",
        "Katalog binasının karşısında yeni bir fırın açılmıştır.",
      ],
      intruder: 4,
      links: [
        { source: 0, target: 1, label: "Yararın sınırı" },
        { source: 1, target: 2, label: "Sorun → bu neden", anaphor: true },
        { source: 2, target: 3, label: "Çözümün katkısı" },
      ],
    },
  ],
};
const numerals019 = ["I", "II", "III", "IV", "V", "VI"];
export function turkishCases019(lessonId: string): Case019[] {
  const cases = Object.hasOwn(corpus019, lessonId)
    ? corpus019[lessonId]
    : undefined;
  if (!cases) throw new RangeError("Bu başlık için hazırlanmış bir model yok.");
  return cases;
}
export function buildTurkishScene019(
  lessonId: string,
  caseId: string,
  choice?: number,
  selected?: number,
) {
  const item = turkishCases019(lessonId).find((c) => c.id === caseId);
  if (!item) throw new RangeError("Hazırlanmış örnek seçilmeli.");
  const initial = item.kind === "split" ? 1 : 0;
  const n = choice === undefined ? initial : choice;
  const max =
    item.kind === "evidence"
      ? item.claims.length - 1
      : item.kind === "split"
        ? item.sentences.length - 1
        : item.sentences.length;
  if (!Number.isInteger(n) || n < (item.kind === "split" ? 1 : 0) || n > max)
    throw new RangeError("Örnek için geçerli bir işlem seçilmeli.");
  const omitted = item.kind === "flow" ? n - 1 : -1;
  const nodes: TurkishNode019[] = item.sentences.map((text, i) => ({
    label: `Cümle ${numerals019[i]}`,
    text,
    group: item.kind === "split" ? (i < n ? 0 : 1) : 0,
    excluded: i === omitted,
  }));
  let decision: string,
    reason: string,
    evidence: string[],
    relations: TurkishLink019[],
    options: string[],
    claim = "";
  if (item.kind === "evidence") {
    const c = item.claims[n];
    claim = c.text;
    nodes.push({ label: "İddia", text: c.text, group: 1, excluded: false });
    decision = c.decision;
    reason = c.reason;
    options = ["Destek var", "Metinle çelişiyor", "Kanıt yetmez"];
    relations = c.references.map((source) => ({
      source,
      target: nodes.length - 1,
      label:
        c.decision === "Destek var"
          ? "İddiaya kanıt"
          : c.decision === "Metinle çelişiyor"
            ? "İddiaya aykırı bilgi"
            : "Gerekli kanıt yok",
      valid: c.decision === "Destek var",
    }));
    evidence = c.references.map(
      (i) => `${numerals019[i]}. cümle: ${item.sentences[i]}`,
    );
    evidence.push(
      c.decision === "Kanıt yetmez"
        ? "Kanıt yokluğu gerçek dünyada kesin yanlışlık demek değildir."
        : "İddianın kapsamını, zamanını ve kesinliğini bu kanıtla karşılaştır.",
    );
  } else if (item.kind === "split") {
    const correct = n === item.boundary;
    decision = correct ? "İki odak ayrıldı" : "Sınır uygun değil";
    options = ["İki odak ayrıldı", "Sınır uygun değil"];
    reason = correct
      ? `İlk blok ${item.titles[0].toLocaleLowerCase("tr-TR")}, ikinci blok ${item.titles[1].toLocaleLowerCase("tr-TR")} yönünü korur.`
      : `Seçtiğin sınır iki açıklama yönünü ayırmıyor. Yeni yön ${numerals019[item.boundary]}. cümlede başlıyor.`;
    relations = item.links.map((link) => ({
      ...link,
      valid: link.source < n === link.target < n,
    }));
    evidence = [
      `İlk odağın cümleleri: ${numerals019[0]}–${numerals019[item.boundary - 1]}. ${item.titles[0]}.`,
      `İkinci odağın cümleleri: ${numerals019[item.boundary]}–${numerals019[item.sentences.length - 1]}. ${item.titles[1]}.`,
      `İkinci paragraf ${numerals019[item.boundary]}. cümleyle başlar; önceki cümle ilk paragrafın sonudur.`,
      "Bütün cümleler korunur; burada yapılan işlem cümle çıkarmak değildir.",
    ];
  } else {
    const missing = item.links.filter(
      (link) =>
        link.anaphor && link.source === omitted && link.target !== omitted,
    );
    decision =
      omitted === item.intruder
        ? "Akış düzeldi"
        : missing.length
          ? "Öncül kayboldu"
          : "Kopukluk sürüyor";
    options = ["Akış düzeldi", "Kopukluk sürüyor", "Öncül kayboldu"];
    reason =
      omitted === item.intruder
        ? `${numerals019[omitted]}. cümle çıkarılınca ilgisiz bilgi ayrılır; kalan metin aynı düşünce çizgisini sürdürür.`
        : missing.length
          ? `${numerals019[omitted]}. cümledeki tanıtım çıkarıldı; sonraki gönderme gereken öncülü kaybetti. İlgisiz cümle de hâlâ metinde.`
          : `İlgisiz ${numerals019[item.intruder]}. cümle hâlâ metinde. Diğer cümlelerin ortak odağa katkısını ve bağlarını karşılaştır.`;
    relations = item.links
      .filter((link) => link.target !== omitted)
      .map((link) => ({
        source: link.source,
        target: link.target,
        label: link.label,
        valid: link.source !== omitted,
      }));
    if (omitted !== item.intruder) {
      const neighbor = item.intruder === 0 ? 1 : item.intruder - 1;
      if (neighbor !== omitted)
        relations.push({
          source: neighbor,
          target: item.intruder,
          label: "Ortak amaçtan sapma",
          valid: false,
        });
    }
    evidence = [
      `İlgisiz aday: ${numerals019[item.intruder]}. cümle. ${item.sentences[item.intruder]}`,
      ...missing.map(
        (link) =>
          `${numerals019[link.target]}. cümledeki gönderme, çıkarılan ${numerals019[link.source]}. cümleye ihtiyaç duyuyor.`,
      ),
      "Adayı çıkarınca iki komşuyu ve kalan metnin tamamını yeniden oku.",
      "Karşıtlık, örnek veya yeni ayrıntı tek başına akış kusuru değildir.",
    ];
  }
  const index = selected === undefined ? 0 : selected;
  if (!Number.isInteger(index) || index < 0 || index >= nodes.length)
    throw new RangeError("Şemada görünen bir parça seçilmeli.");
  const choiceLabels =
    item.kind === "evidence"
      ? item.claims.map((c) => c.text)
      : item.kind === "split"
        ? item.sentences
            .slice(1)
            .map((_, i) => `${numerals019[i + 1]}. cümleyle başlat`)
        : [
            "Hiçbirini çıkarma",
            ...item.sentences.map((_, i) => `${numerals019[i]}. cümleyi çıkar`),
          ];
  return {
    kind: item.kind,
    context: item.context,
    sentence: item.sentences.join(" "),
    nodes,
    selected: index,
    target: nodes[index],
    relations,
    decision,
    reason,
    evidence,
    options,
    claim,
    choice: n,
    choiceLabels,
    choiceOffset: item.kind === "split" ? 1 : 0,
    initialChoice: initial,
    excluded: omitted,
    blocks:
      item.kind === "split"
        ? [
            item.sentences.slice(0, n).join(" "),
            item.sentences.slice(n).join(" "),
          ]
        : [item.sentences.filter((_, i) => i !== omitted).join(" ")],
    titles: item.kind === "split" ? item.titles : [],
  };
}
export const turkishExplorationDefaults019 = {
  caseId: "",
  choice: 0,
  selected: 0,
  guess: "",
  reason: "",
  compared: false,
  show: false,
};
