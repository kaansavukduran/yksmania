import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
type SourceGuide025 = LessonGuide & { title: string; detail: string };
const sourceGuides025: SourceGuide025[] = [
  {
    id: "islam-dusuncesinde-tasavvufi-yorumlar",
    title: "İslam düşüncesinde tasavvufi yorumlar",
    detail: "detail-94",
    minutes: 140,
    objectives: [
      "Tasavvufun oluşumunu, ahlaki amaçlarını ve gelişim dönemlerini açıkla.",
      "Kültürümüzdeki altı tasavvufi gelenekte kişi, eser ve uygulama ilişkilerini ayır.",
      "Cem erkânını, hizmetleri ve Hucurât 10’un kardeşlik mesajını bağlamıyla yorumla.",
    ],
    source:
      "MEB 12. sınıf DKAB 3. ünite İslam Düşüncesinde Tasavvufi Yorumlar ve ilgili Aurelia kâğıdı karşılaştırılarak hazırlanan özgün öğretim. Alıştırmalar özgündür; resmî sınav sorusu değildir.",
    sections: [
      {
        title: "Tasavvufun konusu",
        paragraphs: [
          "Tasavvuf İslam düşüncesinde nefsi kötü eğilimlerden arındırmayı, güzel ahlakı, içtenliği ve Allah’a yakınlaşmayı öne çıkaran manevi eğitim alanıdır. Bu yolu benimseyenlere sufi veya mutasavvıf denir. Edep, ihlas ve zikir bu alanın başlıca kavramlarındandır.",
          "Fıkıh davranışların dinî hükümlerini, kelam inanç esaslarını, tasavvuf özellikle ahlaki ve manevi gelişimi inceler. Alanlar ilişkilidir; aynı kişinin ikisinde çalışması onları özdeş yapmaz. Tasavvufi yorumlar aynı din içinde gelişmiştir.",
        ],
      },
      {
        title: "Oluşumun dinî ve toplumsal zemini",
        paragraphs: [
          "Mutasavvıflar Kur’an’ı, Hz. Muhammed’in örnekliğini ve ilk Müslümanların sade hayatını temel kaynakları arasında görür. Şems 9 nefsi arındırmayı; Kalem 4 Hz. Peygamber’in güzel ahlakını öne çıkarır. Tevazu, merhamet ve paylaşma manevi eğitimin davranış yönüdür.",
          "Fetihlerle artan refah karşısında sade yaşama ve mal sevgisine kapılmamaya yapılan vurgu, tarihsel oluşumu anlamaya yardımcı olur. Manevi eğilimlerin varlığıyla sonradan oluşan adlandırılmış tarikat kurumlarının varlığı ayrı tarihsel iddialardır.",
        ],
      },
      {
        title: "Zühd ve dünyayla ilişki",
        paragraphs: [
          "Zühd, dünya malına ve hazlara aşırı bağlanmama; zahid bu tutumu benimseyen kişidir. Malın elde bulunmasıyla gönlün bütünüyle mala bağlanması farklıdır. Ölçülü tüketim, kanaat ve helal emek bu çerçevede birlikte düşünülebilir.",
          "Bir çalışanın geçimini dürüstçe sağlayıp fazlasını paylaşması zühdle çelişmez. Zühdü bütün üretimi ve toplumsal sorumluluğu bırakmak diye tanımlamak kavramın anlamını daraltır. Soruda fiilin kendisinden çok bağlılık ve amaç açıklamasına bak.",
        ],
      },
      {
        title: "Üç tarihsel dönem",
        paragraphs: [
          "Ders anlatımlarında zühd dönemi sade yaşayışın; tasavvuf dönemi kavramların, yöntemlerin ve klasik eserlerin; tarikat dönemi düzenli rehberlik ve kurumsal yapıların belirginleşmesiyle açıklanır. Hasan-ı Basrî ve Râbia, Cüneyd-i Bağdâdî ve Gazzâlî, ardından tarikat öncüleri bu süreçte anılır.",
          "Bu dönemlendirme bütün bölgelerde aynı gün başlayan değişmez takvim değildir. Yalnız bir kişinin zikir yaptığını okumak kurumsal tarikat yapısının bulunduğunu kanıtlamaz. Evreyi belirlerken metnin yaşayış, kavramsallaşma veya örgütlenmeden hangisini anlattığını ayır.",
        ],
      },
      {
        title: "Nefis terbiyesi ve tezkiye",
        paragraphs: [
          "Nefis terbiyesi insanın bencillik, kibir, haset ve zarar verici isteklerini fark edip güzel huylar geliştirmeye çalışmasıdır. Tezkiye arındırma demektir. Sabır, doğru sözlülük, emaneti koruma ve başkasına zarar vermeme bu eğitimin somut örnekleridir.",
          "Bu kavramlar dinî ve manevi bir çerçeveye aittir; klinik tanı veya psikoterapi yöntemi değildir. Bir olayda yanlışından dönme çabası anlatılabilir; bundan kişinin bütün iç dünyasının veya manevi mertebesinin kesin bilindiği sonucu çıkmaz.",
        ],
      },
      {
        title: "İhsan ve ihlas",
        paragraphs: [
          "İhsan, dinî anlatımda Allah’ı görüyormuşçasına kulluk etme bilincidir. İhlas ise niyetin içtenliği ve Allah’ın rızasını gözetip gösterişten uzak durmadır. İkisi de manevi sorumlulukla ilişkilidir; vurgu noktaları farklıdır.",
          "Görünen bir yardım davranışı yardımın yapıldığını gösterir. Niyet açıkça verilmişse ihlasla ilişki kurulabilir; yalnız dış görünüşten niyetin kesinliği çıkarılmaz. Metindeki bilinç ve niyet ifadelerini ayrı ayrı işaretle.",
        ],
      },
      {
        title: "Edep ve ahlak eğitimi",
        paragraphs: [
          "Edep, Hakk’a ve halka karşı ölçülü, saygılı ve sorumlu davranmaktır. Tahalluk tasavvufun ahlakı öğrenme ve yaşama boyutunu; tahakkuk ise manevi hakikati tanıma boyutunu anlatmak için kullanılır. Eğitim, sözde kalmayıp davranışa yansımayı amaçlar.",
          "Saygılı konuşmak, öfkeyi yönetmek ve emaneti korumak edebin anlaşılır örnekleridir. Bir törene katılmış olmak tek başına güzel ahlakın tamamını kanıtlamaz. Tasavvufun ahlaki amacını kıyafet veya unvanla sınırlandırma.",
        ],
      },
      {
        title: "İrfan, marifet ve mâsivâ",
        paragraphs: [
          "İrfan ve marifet, tasavvufi bağlamda manevi tanıma, tecrübe ve kavrayışla ilişkilidir. Mâsivâ Allah’ın dışındaki varlıklar için kullanılan terimdir. Bu sözlük, tasavvuf metinlerinde neyin amaç neyin araç sayıldığını anlamaya yardım eder.",
          "Manevi tecrübeye dayalı bir anlatımı laboratuvar ölçümü gibi sunmak bilgi türlerini karıştırır. Soruda yalnız bir kavramın anlamı soruluyorsa tanımı bağlama yerleştir; verilenin ötesinde bütün metafizik sorunların çözüldüğünü varsayma.",
        ],
      },
      {
        title: "Rehberlik ve seyr-u sülûk",
        paragraphs: [
          "Mürşit veya şeyh manevi eğitimde rehber; mürit ya da talip bu eğitime yönelen kişidir. Veli, dinî yakınlık ve olgunluk anlayışı içinde anılan kişidir. Seyr-u sülûk rehberlik eşliğinde sürdürülen manevi yolculuğu ifade eder.",
          "Halvet veya uzlet belirli bağlamlarda yalnız kalmayı; riyazet ve mücahede nefsin eğitimi için çabayı anlatır. Rol, süreç ve uygulama aynı türden değildir. Talip sözcüğünün Alevi-Bektaşi erkânındaki özel kullanımını metnin bağlamı belirler.",
        ],
      },
      {
        title: "İnsan-ı kâmil ve nefis mertebeleri",
        paragraphs: [
          "İnsan-ı kâmil, tasavvufta ahlaki olgunluk idealidir. Bazı tasavvuf anlatılarındaki nefis mertebeleri emmâre: kötülüğe yönelten; levvâme: yanlışını kınayan; mülhime: iyiliğe yöneliş ve ilham; mutmainne: huzura ermiş nefis biçiminde açıklanır.",
          "Râdiye Allah’tan razı olan; mardiyye Allah’ın razı olduğu; kâmile olgunlaşmış nefis olarak anlatılır. Bunlar manevi öğretinin kavramlarıdır. Uygulamada birkaç seçime bakıp kullanıcının hangi mertebede olduğu hesaplanmaz.",
        ],
      },
      {
        title: "Yesevilik",
        paragraphs: [
          "Yesevilik Hoca Ahmed Yesevî’nin düşünceleriyle ilişkilidir. Türkistan çevresinde Türkçe hikmetler aracılığıyla ahlak, ibadet ve Hz. Peygamber sevgisinin anlatılması önem taşır. Divân-ı Hikmet bu gelenekle ilişkili temel eser adıdır.",
          "Zikir, zühd ve güzel ahlak birçok gelenekte görülür. Yesevilik eşleştirmesinde Ahmed Yesevî veya Divân-ı Hikmet gibi özgül veri daha belirleyicidir. Bir eserin Anadolu’da okunması, yazarının o yerde yaşadığını tek başına kanıtlamaz.",
        ],
      },
      {
        title: "Kadirilik",
        paragraphs: [
          "Kadirilik Abdülkadir Geylânî’nin düşünceleri çevresinde gelişen tasavvufi gelenektir. Tevazu, doğru söz, başkasına yük olmama ve Allah’ı anma vurgulanır. Anadolu’daki yayılışında Eşrefoğlu Rûmî ve Müzekki’n-Nüfûs eseri anılır.",
          "Sadece cömertlik veya zikir bilgisi bu geleneğe özgü değildir. Kişi, eser ve gelenek zincirini birlikte doğrula. Eşrefoğlu’nun katkısını belirtmekle gelenekteki bütün uygulamaların onun tarafından ilk kez yapıldığını iddia etmek farklıdır.",
        ],
      },
      {
        title: "Rifailik",
        paragraphs: [
          "Rifailik Ahmed er-Rifâî ile ilişkilendirilir. Nefis terbiyesi, edep, zikir ve manevi eğitim bu yorumda öne çıkar. Kaynaklarda rehberlik ve eğitim aşamalarına verilen önem anlatılır.",
          "Dikkat çeken tek bir tören görüntüsünden bütün bir geleneğin mahiyetini çıkarma. Soruda Ahmed er-Rifâî adı varsa kişi-gelenek bağı kurulabilir; yalnız ortak bir ahlak ilkesi varsa adayları ayırmak için ek bilgi gerekir.",
        ],
      },
      {
        title: "Mevlevilik ve kurumsallaşma",
        paragraphs: [
          "Mevlevilik Mevlânâ Celâleddîn-i Rûmî’nin düşünceleri çevresinde gelişmiştir. Oğlu Sultan Veled’in düzenleme ve kurumsallaşmadaki rolü önemlidir. Mesnevî, Dîvân-ı Kebîr ve Fîhi Mâ Fîh Mevlânâ’nın eserleri arasında anılır.",
          "Dergâhlarda Mesnevî okunması, musiki ve hüsn-i hat gibi sanatların öğrenilmesi kültürel boyutu gösterir. Eser yazarlığı ile eserin çevresinde sonradan gelişen kurumsal düzen ayrı katkılardır. Birini seçmek diğerini yok saymayı gerektirmez.",
        ],
      },
      {
        title: "Sema ve sembolik anlatım",
        paragraphs: [
          "Mevlevi seması musiki ve zikirle ilişkili, düzenlenmiş sembolik bir törendir; katılanlara semazen denir. Kaynaklarda sikke mezar taşıyla, hırka mezarla, tennure kefenle ilişkilendirilir. Mukabele karşılıklı saygıyla baş eğme bağlamında açıklanır.",
          "Bir metin belirli hareketin anlamını açıkça veriyorsa o anlatımdan çıkarım yapılabilir. Açıklanmayan süre, katılımcı sayısı veya kişinin niyeti kendiliğinden eklenmez. Mevlevi semasıyla Alevi-Bektaşi semahı farklı bağlamlarda öğrenilir.",
        ],
      },
      {
        title: "Nakşibendilik",
        paragraphs: [
          "Nakşibendilik Bahâeddin Nakşibend’in düşünceleriyle ilişkilidir. Özellikle gizli veya kalbî zikir, zamanın değerini bilme ve davranışta ölçülülük vurgulanır. Halk içinde Hakk’la olmak anlayışı gündelik hayatla manevi dikkati birlikte düşünür.",
          "Her sessiz davranış zikir değildir; her zikir de yalnız Nakşibendiliğe ait değildir. Kişi adıyla tanımlanmış gelenek ve belirli uygulama birlikte verilirse eşleştirme güçlenir. Tarihsel bir kolun kuruluş tarihini yalnız adından hesaplama.",
        ],
      },
      {
        title: "Alevilik-Bektaşilik ve kültürel çeşitlilik",
        paragraphs: [
          "Alevilik-Bektaşilik ders kapsamında Hz. Ali ve Ehl-i beyt sevgisi, Hacı Bektaş-ı Veli’nin etkisi, cem, semah ve ahlak öğretisiyle ele alınır. Ocaklar, dede veya baba rehberliği, deyiş ve nefesler bu kültürel mirasın parçalarıdır.",
          "Uygulamalar ocak, bölge ve topluluğa göre farklılaşabilir. Ders kitabındaki bir erkân tasvirini her kişinin zorunlu ve değişmez biyografisi sayma. Ortak kavramları tanımakla bütün Alevi-Bektaşi toplulukların aynı biçimde uyguladığını ileri sürmek farklıdır.",
        ],
      },
      {
        title: "Dört kapı kırk makam",
        paragraphs: [
          "Hacı Bektaş-ı Veli’nin Makâlât’ıyla ilişkili anlatımda dört kapı şeriat, tarikat, marifet ve hakikattir. Her kapıyla on makam ilişkilendirilir. İman, öğrenme ve ibadet; rehberlik ve hizmet; edep ve kendini bilme; tevazu ve iyilik gibi unsurlar eğitim bütünlüğü içinde açıklanır.",
          "Kapı ve makam burada manevi eğitim dilidir; bina kapısı veya kırk günlük zorunlu süre değildir. Bir metinde yalnız dört ad geçmesi her makamın ayrıntısını verdiği anlamına gelmez. Benzetmelerin anlamı kaynakta açıklandığı ölçüde yorumlanır.",
        ],
      },
      {
        title: "Cem ve cemevi",
        paragraphs: [
          "Cem Alevi-Bektaşi toplu ibadet erkânı; cemevi bu erkânın yapıldığı ve yolun öğrenildiği mekândır. Bektaşi bağlamında meydan evi veya kırklar meydanı adları da görülebilir. Törenin yönetimi, hizmetler, dua ve paylaşma bir düzen içinde yürütülür.",
          "Ne yapıldı sorusu cemi, nerede yapıldı sorusu cemevini öne çıkarır. Aynı anlatıda mekân ve tören bulunması ikisini eş anlamlı yapmaz. Dede veya baba ise bir kişi ve rehberlik rolüdür; mekân adı değildir.",
        ],
      },
      {
        title: "Cem türlerinin amaçları",
        paragraphs: [
          "Abdal Musa cemi birlik ve paylaşmayla; musahiplik cemi yol kardeşliğiyle; düşkünlükten kaldırma cemi hakların iadesi ve topluluğa dönüşle ilişkilendirilir. Dardan indirme cemi vefat edenin ardından razılık alınması bağlamında anlatılır.",
          "Bu adları amaçlarıyla öğrenmek, hepsini aynı takvim gününe yerleştirmekten daha açıklayıcıdır. Yerel tarihler ve ayrıntılar değişebilir. Metinde belirtilmeyen süreyi veya belirli bir günde yapılma zorunluluğunu yalnız tür adından çıkarma.",
        ],
      },
      {
        title: "Musahiplik",
        paragraphs: [
          "Musahiplik, ders anlatımında iki ailenin yol kardeşliği için ikrar vermesi ve karşılıklı sorumluluk üstlenmesidir. Dayanışma, dürüstlük, yalan ve gıybetten kaçınma bu kardeşliğin ahlaki boyutudur. Gelenekte muâhat ve kardeşlik ayetleriyle ilişkilendirilir.",
          "Birlikte yemek yemek veya aynı cemevine gitmek tek başına musahiplik bağı kurulduğunu göstermez. Bağı belirleyen şey açıklanan ikrar ve süreklilik taşıyan sorumluluktur. Tarihsel dayandırma ile iki uygulamanın bütün ayrıntılarının aynı olması ayrı iddialardır.",
        ],
      },
      {
        title: "İkrar, razılık ve kul hakkı",
        paragraphs: [
          "İkrar bağlılık sözü; razılık topluluk üyelerinin aralarındaki hak ve kırgınlıkları ele alma yönüdür. Cem anlatılarında dargınların barıştırılması, hakkın sahibine iadesi ve helallik alınması öne çıkar. Söz vermekle somut hakkı yerine getirmek birlikte değerlendirilir.",
          "Bir kişinin razı olduğunu söylemesi, başka bir kişinin açıklanmış alacağını otomatik ortadan kaldırmaz. Hakkın sahibi, konusu ve iade bilgisi ayrı veridir. Bu öğretim modeli gerçek bir kişinin bütün manevi durumuna hükmetmez.",
        ],
      },
      {
        title: "On iki hizmet: rehberlik ve düzen",
        paragraphs: [
          "Cem hizmetleri içinde mürşit veya dede erkânı yönetir; rehber yola hazırlıkta yol gösterir; gözcü düzen ve sükûneti gözetir. Çerağcı veya delilci aydınlatma hizmetini; zakir bağlama ve deyişlerle müzikli anlatımı; süpürgeci veya ferraş temizlik hizmetini üstlenir.",
          "Görev adları belirli işlevleri gösterir. On iki hizmet bir görev düzenidir; her yerde toplam katılımcı sayısının yalnız on iki olduğu anlamına gelmez. Adlandırma ve görevlerin uygulanışında yerel farklılıklar olabilir.",
        ],
      },
      {
        title: "On iki hizmet: hazırlık ve paylaşma",
        paragraphs: [
          "Meydancı meydanı ve postları düzenler; niyazcı veya lokmacı lokma hizmetinde; ibrikçi veya tezekkâr temizlik ve su hizmetinde görev alır. Kapıcı güvenlikle, peyikçi duyuruyla, sakka suyun temini ve dağıtımıyla ilişkilendirilir.",
          "Suyu dağıtmak, töreni haber vermek ve yiyeceği paylaşmak farklı işlerdir. Bir soruda görev tanımı verilmişse fiili ilgili role bağla. Ortak bir su sözcüğü geçti diye ibrikçiyle sakkayı her bağlamda aynı görev sayma.",
        ],
      },
      {
        title: "Gülbank ve lokma",
        paragraphs: [
          "Gülbank Allah’a sığınma, şükür, af ve iyilik dileme amacı taşıyan geleneksel duadır. Lokma paylaşılan yiyeceği ve buna bağlı paylaşma pratiğini anlatır. Lokma duası yiyecek paylaşımına eşlik eden dua örneğidir.",
          "Dua metni ile dağıtılan yiyecek farklı türden verilerdir. Birlikte bulunmaları onları özdeş yapmaz. Gülbank bireysel veya toplu bağlamda okunabilir; yalnız tek sofrada okunabildiği sonucunu kavramın adından çıkarma.",
        ],
      },
      {
        title: "Semahın bağlamı",
        paragraphs: [
          "Semah Alevi-Bektaşi cem erkânında müzik, deyiş ve manevi yönelişle ilişkili ritüeldir. Birlik, sevgi ve Allah’ı anma bu uygulamanın anlatımında öne çıkar. Mevlevilikteki semayla ad benzerliği olsa da gelenek ve erkân bağlamı farklıdır.",
          "Yalnız dönmek fiili hangi ritüelin anlatıldığını belirlemeyebilir. Cem, deyiş ve dede gibi verileri birlikte oku. Bir ritüeli öğrenmek onu bütün halk danslarıyla veya her topluluktaki uygulamayla özdeşleştirmek değildir.",
        ],
      },
      {
        title: "Muharrem ve Hızır orucu",
        paragraphs: [
          "Muharrem orucu ve matem, Kerbelâ’da Hz. Hüseyin ve yakınlarına yapılan zulmün hatırlanmasıyla ilişkilendirilir. Aşure paylaşımı, mersiye ve dua gelenekte önemli yer tutar. Hızır orucu ise dayanışma, şükür ve ihtiyaç sahibini gözetmeyle anılır.",
          "Muharrem ve Hızır oruçları aynı takvim olayı değildir. Hızır orucunun günleri ve matem uygulamalarının ayrıntıları yörelere göre değişebilir. Tarihsel hatırlama, yerel erkân ve dinî rivayeti tek türden kesin tarih belgesi sayma.",
        ],
      },
      {
        title: "Hucurât 10 ve barıştırma",
        paragraphs: [
          "Hucurât 10 müminlerin kardeşliğini, aralarının düzeltilmesini ve Allah’a karşı sorumluluk bilincini öne çıkarır. Ortak bağın davranışa yansıması, kırgınlıkta arabuluculuk ve dayanışma bu mesajın somut yönüdür. Kardeşlik yalnız bir unvan değildir.",
          "Ayetin bu mesajı belirli bir tarikata katılma şartını veya cem hizmetlerinin bütün ayrıntılarını tek başına vermez. Önce açık ilkeyi belirle, ardından olayın hangi fiilinin bu ilkeyle ilişkili olduğunu gerekçelendir. Kan bağıyla dinî kardeşlik de ayrı bağ türleridir.",
        ],
      },
      {
        title: "Kavramı doğru ölçeğe yerleştirmek",
        paragraphs: [
          "Kişi, eser, gelenek, tören, mekân, görev, niyet ve ahlaki ilke tasavvuf sorularında ayrı ölçeklerdir. Ahmed er-Rifâî kişi; Rifailik gelenek; cem tören; cemevi mekân; ihlas niyet niteliğidir. Bu sınıflama yakın seçenekleri ayırmayı sağlar.",
          "Önce sorunun hangi tür nesneyi istediğini söyle. Sonra verilen fiili ve özgül adı o türe bağla. Birden çok gelenekte görülen ortak değeri öğrenmek önemlidir; fakat ortak değer tek başına tarihsel aidiyetin kesin kanıtı değildir.",
        ],
      },
    ],
    examples: [
      {
        title: "Üç ayrı kavram türü",
        prompt:
          "Özgün katalog taslağında üç satır var: Halvet = bütün varlıkların adı; mâsivâ = yalnız kalma uygulaması; riyazet = nefis eğitimi için çaba. Tanım kartı halveti belirli bağlamda yalnızlık, mâsivâyı Allah dışındaki varlıklar, riyazeti eğitim çabası diye açıklıyor. En az kaç satırın açıklaması yer değiştirmeli?",
        strategy:
          "Önce her satırı verilen tanımla karşılaştır; doğru satırı koru.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Halvet ve mâsivânın açıklamaları ters yazılmıştır; riyazet satırı verilen tanıma uyar.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "İlk iki açıklamayı birbirine taşımak her ikisini düzeltir; üçüncü satır değişmeden kalır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "İki satır değişir. Üçüncü satırı da bozmak en az değişiklik koşuluna aykırıdır.",
          },
        ],
        answer: "İki satırın açıklaması yer değiştirmeli.",
        check: "Riyazet satırını neden korudun?",
        pitfall: "Bütün satırları yanlış sayıp geçerli veriyi de değiştirmek.",
      },
      {
        title: "Yeni niyet bilgisi neyi değiştirir?",
        prompt:
          "Özgün iki aşamalı dosyada önce bir kişinin yaşlı komşusunun ilaçlarını eczaneden getirdiği yazıyor. Sonra kendi beyanı ekleniyor: Bunu gösteriş için değil Allah’ın rızasını gözeterek yaptım. Soru kişinin bütün hayatını değil, eklenen bilginin hangi yorumu artık doğrudan desteklediğini soruyor.",
        strategy:
          "Yeni verinin görünür fiile mi niyet açıklamasına mı ait olduğunu belirle.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "İlk kayıt yardım fiilini verir; niyetin içtenliğini açıkça vermez.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "İkinci kayıt niyeti açıklar; bu beyan ihlas kavramıyla ilişkilendirilebilir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Değişen şey fiilin yapılıp yapılmadığı değil, metindeki niyet bilgisidir. Bütün iç dünyanın kesin ölçümü yapılmaz.",
          },
        ],
        answer:
          "İkinci aşamada ihlasla ilişki kurmak için açık niyet beyanı eklenmiştir.",
        check: "İlk kayıt tek başına aynı niyet kanıtını verir miydi?",
        pitfall:
          "Bir ek cümleden kişinin bütün manevi durumunu bildiğini sanmak.",
      },
      {
        title: "Dergâhın işlevlerini birlikte okumak",
        prompt:
          "Özgün bir günlükte aynı dergâhta sabah Mesnevî okunduğu, öğleden sonra hat meşk edildiği, akşam musiki çalışıldığı kayıtlıdır. Not dergâhın tarihini veya her gün aynı programın yapıldığını söylemiyor. Bu tek günlük verinin desteklediği en kapsamlı ama sınırlı sonuç nedir?",
        strategy:
          "Üç etkinliğin alanını ayır, sonra ortak mekân bilgisinde birleştir.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Mesnevî okuma metin ve manevi eğitim; hat meşki ve musiki sanat eğitimi boyutunu gösterir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Aynı gün aynı mekânda bu faaliyetler birlikte kaydedilmiştir; çok işlevli kullanım çıkar.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Sonuç bu kayda aittir. Her gün aynı saatlerin sürdüğü veya başka faaliyet bulunmadığı iddia edilemez.",
          },
        ],
        answer:
          "Bu günlük, dergâhta metin ve sanat eğitiminin birlikte yer aldığını gösterir.",
        check: "Çıkarımın hangi sözcüğü her güne değil bu güne bağlıyor?",
        pitfall: "Tek günlük kaydı değişmez tarihsel programa dönüştürmek.",
      },
      {
        title: "Hizmette eksik kalan iş",
        prompt:
          "Özgün cem hazırlığında zakir deyişleri hazırlamış, çerağcı aydınlatmayı sağlamıştır. Zemin temizliği henüz yapılmamıştır. Verilen görev kartı süpürgeciyi temizlikle tanımlıyor. Soru toplam kişi sayısını değil, tamamlanması gereken işin hangi görev alanına girdiğini istiyor.",
        strategy: "Yapılan iki iş ile yapılmayan üçüncü işi ayır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Müzikli anlatım ve aydınlatma tamamlanan farklı hizmetlerdir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Eksik veri zeminin temizlenmesidir; kartta bu süpürgecinin alanıdır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Süpürgeci hizmetine ihtiyaç kaydı düşülür; bütün diğer görevlerin yapılmadığı söylenmez.",
          },
        ],
        answer: "Eksik iş süpürgeci veya ferraş hizmetiyle ilişkilidir.",
        check: "Aydınlatma yapılınca temizlik de yapılmış olur mu?",
        pitfall:
          "Bir hizmetin tamamlanmasını tüm hazırlığın tamamlandığı sanmak.",
      },
      {
        title: "Söz ile hakkın yerine gelişi",
        prompt:
          "Özgün musahiplik dosyası iki ailenin yol kardeşliği sözü verdiğini ve sonraki bir ayda birbirlerine destek olduğunu kaydediyor. Ayrıca bir ailenin üçüncü kişiye olan borcunun henüz ödenmediği açıkça yazılı. Yol kardeşliği kaydı ile bu borcun durumu nasıl birlikte açıklanır?",
        strategy:
          "Kardeşlik bağını ve üçüncü kişinin alacağını iki ayrı ilişki olarak çiz.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "İkrar ve destek bilgisi yol kardeşliği ilişkisini anlatır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Borç üçüncü kişinin hakkıdır ve metin ödenmediğini açıkça söyler.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Kardeşlik bağını kabul etmek borcun ödendiğini gerektirmez; iki veri çelişmeden birlikte bulunur.",
          },
        ],
        answer:
          "Yol kardeşliği kaydı vardır; ayrı borç hakkı henüz yerine getirilmemiştir.",
        check: "Hakkın sahibi hangi kişidir ve ödeme hakkında ne yazıyor?",
        pitfall:
          "Bir dayanışma bağını bütün farklı borçları kendiliğinden silen işlem saymak.",
      },
      {
        title: "Barıştırma fiili çıkarılırsa",
        prompt:
          "Özgün duyuru iki kırgın kişinin konuşmasına aracılık edildiğini ve tarafların birbirini dinlemesinin sağlandığını söylüyor. Başlık Hucurât 10’daki arayı düzeltme mesajına gönderme yapıyor. Duyurudan aracılık ve dinleme cümlesi çıkarılır, yalnız törenin salon adı kalırsa hangi kanıt kaybolur?",
        strategy: "İlkenin adını değil onu gösteren somut fiili ara.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "İlk sürümde arayı düzeltme, konuşmaya aracılık ve dinlemeyle somutlaşır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Salon adı yalnız yer bilgisidir; barıştırma fiilini kendi başına göstermez.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "İkinci sürümde bu mesajla somut davranış bağı için gereken kanıt eksilir; ayetin mesajı değişmiş olmaz.",
          },
        ],
        answer:
          "Kaybolan, barıştırma ilkesini bu olayda destekleyen somut fiil bilgisidir.",
        check: "Mekân bilgisi hangi eylemin yapıldığını tek başına verir mi?",
        pitfall:
          "Kaynak mesajının değişmesiyle olay kanıtının azalmasını karıştırmak.",
      },
    ],
    recall: [
      {
        prompt: "Zühd ile üretim niçin çelişmek zorunda değildir?",
        answer:
          "Zühd aşırı bağlılıktan kaçınmadır; dürüst emek ve ölçülü paylaşma sürebilir.",
      },
      {
        prompt: "İhsan ile ihlasın ayrı vurguları nedir?",
        answer:
          "İhsan kulluk bilinci; ihlas niyetin içtenliği ve gösterişten uzak oluşudur.",
      },
      {
        prompt: "Tasavvuf dönemlendirmesinde hangi üç özellik ayrılır?",
        answer:
          "Sade yaşayış, kavram ve eserlerin gelişmesi, örgütlü rehberlik ve kurumsallaşma.",
      },
      {
        prompt: "Mevlânâ ile Sultan Veled’in katkıları nasıl ayrılır?",
        answer:
          "Mevlânâ düşünce ve eserlerle; Sultan Veled Mevlevi düzenin kurumsallaşmasıyla ilişkilidir.",
      },
      {
        prompt: "Cem, cemevi ve musahiplik hangi tür nesnelerdir?",
        answer: "Tören, mekân ve yol kardeşliği bağı.",
      },
      {
        prompt: "Hucurât 10 hangi davranışı açıkça öne çıkarır?",
        answer:
          "Kardeşlik ve çekişenlerin arasını sorumluluk bilinciyle düzeltme.",
      },
    ],
  },
  {
    id: "guncel-dini-meseleler",
    title: "Güncel dinî meseleler",
    detail: "detail-95",
    minutes: 150,
    objectives: [
      "Yeni meseleleri kaynak, yöntem, korunan değer ve somut koşul bakımından çözümle.",
      "Gıda, çalışma, dijital hayat ve sağlık alanlarının temel kavramlarını öğren.",
      "En’âm 151–152’deki farklı yükümlülükleri somut fiillerle ilişkilendir.",
    ],
    source:
      "MEB 12. sınıf DKAB 4. ünite Güncel Dinî Meseleler, güncel MEB programındaki 12.3.1–12.3.5 kapsamı ve ilgili Aurelia kâğıdı karşılaştırılarak hazırlanan özgün öğretim. Alıştırmalar özgündür; resmî sınav sorusu değildir.",
    sections: [
      {
        title: "Güncel bir mesele nasıl doğar?",
        paragraphs: [
          "Teknoloji, üretim, ticaret ve sağlık alanındaki değişimler daha önce aynı biçimde karşılaşılmamış durumlar doğurur. İslam düşüncesinde bu durumlar kaynaklar, genel ilkeler ve somut koşullar birlikte ele alınarak incelenir. Yeni bir ürün adının eski metinde geçmemesi değerlendirme yapılamayacağı anlamına gelmez.",
          "Önce olayın ne olduğunu, kimlerin hakkını etkilediğini ve hangi verilerin bilindiğini belirle. Yeni olmak tek başına izin veya yasak sonucu vermez. Buradaki amaç ders metnini çözümlemektir; kişisel fetva veya tıbbi karar üretmek değildir.",
        ],
      },
      {
        title: "Kur’an ve sünnet",
        paragraphs: [
          "Kur’an ve sünnet dinî hükümlerin başlıca kaynaklarıdır. Sünnet Hz. Muhammed’in söz, davranış ve onaylarıyla ilişkilidir. Bir meseleyi değerlendirirken açık hüküm, genel ilke ve bunların yorumu birbirinden ayırt edilir.",
          "Bir cümleyi bağlamından koparmak veya yorumcunun sözünü doğrudan ayet saymak kaynak türlerini karıştırır. Soruda kaynağın ne olduğu isteniyorsa sözün kimden aktarıldığını ve hangi tür metne ait olduğunu incele.",
        ],
      },
      {
        title: "İcma ve kapsamı",
        paragraphs: [
          "İcma, Hz. Muhammed’in vefatından sonra bir dönemin müçtehitlerinin bir dinî hüküm üzerinde görüş birliği olarak tanımlanır. Müçtehit, gerekli kaynak ve yöntem bilgisiyle hüküm çıkarma yetkinliği olan âlimdir. İcma kavramı uzmanlık ve görüş birliği koşullarını birlikte taşır.",
          "Tek bir âlimin görüşü veya belirli bir kurulun oy birliği, bütün ilgili müçtehitlerin ittifakını tek başına kanıtlamaz. Metnin verdiği ortaklığın kapsamını koru. Veri eksikse görüş birliğinin hiç var olmadığını da kanıtsız ilan etme.",
        ],
      },
      {
        title: "İçtihat ve uzmanlık",
        paragraphs: [
          "İçtihat, ehliyetli âlimin kaynak ve yöntemlerden hareketle dinî meselenin hükmüne ulaşmak için çaba göstermesidir. Kesin temel esaslar gelişigüzel değiştirilmez. Güncel bir sağlık veya üretim meselesinde ilgili alan uzmanlarının teknik bilgisine de ihtiyaç duyulur.",
          "Bir tıp uzmanı işlemin etkilerini, bir hukuk uzmanı hak ve mevzuat boyutunu açıklayabilir. Bu katkılarla dinî yöntemin işlevi aynı değildir. Farklı uzmanların birlikte çalışması bilgi açığını azaltır; sırf çok sayıda kişi konuştu diye icma oluştuğu sonucuna gidilmez.",
        ],
      },
      {
        title: "Kıyas ve etkili ortak neden",
        paragraphs: [
          "Kıyas, yeni bir durumla hükmü bilinen durum arasında hüküm bakımından etkili ortak gerekçeye dayanarak ilişki kurmadır. Yüz yüze aldatmayla çevrim içi aldatmada dış biçimler değişse de yanıltma ve hak ihlali ortak olabilir. Bu etkili ortak gerekçe için illet terimi kullanılır.",
          "İki nesnenin yalnız rengi veya adı benziyor diye aynı hüküm taşınamaz. Ortak gerekçeyi açıkça göster; bilinen hükmü ve yeni olayı ayrı yaz. Kıyas kapsamlı içtihat faaliyeti içinde kullanılabilen bir yöntemdir; her içtihat yalnız kıyas değildir.",
        ],
      },
      {
        title: "Zarûrât-ı diniyye ve beş temel değer",
        paragraphs: [
          "Zarûrât-ı diniyye dinin kesin temel esasları için; zarûrât-ı hamse veya zarûriyyât korunması hedeflenen beş temel değer için kullanılır. Beşli din, can, akıl, nesil ve malın korunmasıdır. Ad benzerliği iki kavramı özdeş yapmaz.",
          "Aklı bozan maddeler akıl ve cana; hırsızlık mala; aile ve gelecek kuşaklarla ilgili sorumluluk nesle temas edebilir. Bir olay birden fazla değeri etkileyebilir. Baskın değeri seçmek diğerlerinin hiçbir ilişkisinin bulunmadığını söylemek değildir.",
        ],
      },
      {
        title: "Yarar, zarar ve hak dengesi",
        paragraphs: [
          "Maslahat yarar; mefsedet zarar veya bozulmayla ilişkilidir. Def-i mefâsidin celb-i menâfiden önce gelmesi, zararı önlemenin yarar sağlamaya göre önceliğini anlatan ilkedir. Yararlı sonuç iddiası, açıklanmış bir hak ihlalini otomatik ortadan kaldırmaz.",
          "Sedd-i zerâi ciddi zarara götüren yolları önleme ilkesidir. Salt kuşkuyla bütün davranışları yasaklamak bu ilkenin yeterli açıklaması değildir. Zararla ilişki, olasılık ve somut koşullar incelenir; hakların korunması değerlendirmeye dâhildir.",
        ],
      },
      {
        title: "Hüküm terimlerini ayırmak",
        paragraphs: [
          "Farz yapılması kesin biçimde istenen; haram kesin biçimde yasaklanan; mübah yapılıp yapılmaması serbest bırakılan davranıştır. Helal izin verilen alanı anlatır. Mekruh kaçınılması uygun görülen davranıştır; haramla aynı hüküm adı değildir.",
          "Vacip ve sünnetin teknik sınıflandırılması mezheplere göre farklılık gösterebilir; dersin verdiği tanımı bağlamıyla oku. Bir hükmün tanımını öğrenmek, belirli bir kişinin inancını veya bütün sorumluluk koşullarını ölçmek değildir.",
        ],
      },
      {
        title: "Gıdada temel yaklaşım",
        paragraphs: [
          "Eşyada asıl olan ibaha ilkesi, yasak bulunduğu kanıtlanmadıkça izin alanının geniş olduğunu anlatır. Helal ve haram değerlendirmesinde içerik, elde ediliş biçimi, üretim süreci ve sağlık etkileri farklı veri alanlarıdır.",
          "Bir ürünün yabancı ülkede üretilmesi içeriğini tek başına açıklamaz. Bilinmeyen içeriği varmış gibi tamamlamadan hangi ek bilginin gerektiğini söyle. İzin alanının genişliği, açıkça verilmiş yasak veya zarar bilgisini yok saymak değildir.",
        ],
      },
      {
        title: "Yasak gıdalar ve sağlık",
        paragraphs: [
          "Kur’an’da meyte (leş), domuz eti, akıtılmış kan ve Allah’tan başkası adına kesilen hayvan gibi yasaklar anılır. Sarhoşluk veren içkiler ve uyuşturucu maddeler akıl ve canın korunmasıyla birlikte ele alınır. Temiz ve dengeli beslenme de sağlık sorumluluğunun parçasıdır. Meyte, eti için kesim şartı bulunan hayvanın bu kesim gerçekleşmeden ölmesiyle ilişkilidir; av ve su ürünlerinin özel hükümleri ayrıca ele alınır.",
          "Yiyecek türleri ve kesimle ilgili ayrıntılarda istisnalar ve mezhep yorumları bulunabilir. Tek bir kısa listeden bütün canlıların değişmez hükmünü çıkarma. Somut soruda verilen kapsamı kullan; dinî izinle beslenme açısından uygunluğu aynı veri sayma.",
        ],
      },
      {
        title: "Üretim, katkı ve izlenebilirlik",
        paragraphs: [
          "Hazır gıdalarda katkının kaynağı, üretim koşulları ve içeriği doğrulayan bilgi önemlidir. Et ürünlerinde ilgili hayvan ve işlem bilgileri ayrı ayrı incelenir. Etiket, güvenilir belgelendirme ve uzman analizi farklı sorulara cevap verebilir.",
          "Bir belgenin yalnız ürünün menşeini göstermesi bütün üretim aşamalarını doğruladığı anlamına gelmez. Jelatin hayvansal kaynaklı protein ürünüdür; agar gibi bitkisel alternatifler aynı madde adı değildir. Ad veya tanıtım görüntüsünden içeriği tahmin etme.",
        ],
      },
      {
        title: "İstihale ve genetik değişiklik",
        paragraphs: [
          "İstihale maddenin niteliğinde dönüşümle ilgili fıkhi tartışmadır. Hangi dönüşümün hangi hükme etkisi olduğu konusunda görüş ayrılıkları bulunabilir. Genetik değişiklikte de işlemin niteliği, sağlık ve çevre etkileri ile hak boyutu araştırılır.",
          "Her kimyasal değişim bütün maddeleri otomatik helal yapar veya her genetik değişim kesin zararlıdır denemez. Böyle geniş sonuçlar işlem ve kanıt gerektirir. Ders, tartışmalı bir ürüne kişisel hüküm vermek yerine hangi verilerin incelendiğini öğretir.",
        ],
      },
      {
        title: "Zaruret ve ihtiyaç ölçüsü",
        paragraphs: [
          "Zaruret, ciddi ve kaçınılmaz ihtiyaç karşısında belirli yasağın sınırlı olarak değerlendirilebilmesiyle ilgilidir. Nahl 115 gibi metinlerde mecburiyet, haddi aşmama ve başkasının hakkına saldırmama koşulları görülür. İhtiyaç miktarı ve alternatifler önemlidir.",
          "Bir kolaylık arzusunu zaruret saymak veya bir istisnadan bütün yasakların kalktığını çıkarmak geçerli değildir. Koşul değiştiğinde sonucun kapsamı da değişebilir. Gerçek sağlık kararında zorunluluk ve seçeneklerin değerlendirilmesi yetkin uzmanlık ister.",
        ],
      },
      {
        title: "Kazanç ve mülkiyet ahlakı",
        paragraphs: [
          "İslam öğretisinde meşru kazanç, emek, dürüst ticaret ve malın korunması önemlidir. Hırsızlık, hile, rüşvet, kumar ve haksız kazanç eleştirilir. Hediye ve miras gibi meşru edinme yolları da bulunduğu için bütün mülkiyeti yalnız ücretli emeğe indirgememek gerekir.",
          "Mülkiyet hakkı başkasına ve kamuya zarar verme yetkisi değildir. Ürün ve sözleşme bilgilerini gizlemek karşılıklı rızanın değerlendirilmesini etkiler. Fiyatın yüksek olması tek başına bütün şartların bilindiğini veya bütün hakların yerine geldiğini göstermez.",
        ],
      },
      {
        title: "Paylaşma, israf ve borç",
        paragraphs: [
          "Zekât, sadaka ve infak paylaşma ve dayanışmayla ilişkilidir. İsraf kaynakları gereksiz tüketme; cimrilik gerekli paylaşmadan kaçınma yönünü anlatır. Ölçülülük, kişinin kendi ve bakmakla sorumlu olduğu kişilerin ihtiyaçlarını da gözetir.",
          "Gönüllü yardım ile belirli bir kişiye olan borç farklı yükümlülüklerdir. Bağış yapmak ödenmemiş borcu kendiliğinden kapatmaz. Borcu ödeyememe ve ödeyebildiği hâlde bilerek geciktirme de aynı somut koşul değildir.",
        ],
      },
      {
        title: "İşverenin sorumluluğu",
        paragraphs: [
          "İşin niteliği, süresi ve ücretinin açıkça belirlenmesi karşılıklı hakkı korur. İşveren ücretleri zamanında ödemeli, çalışanların onurunu gözetmeli, güvenli ortam ve gerekli koruyucu önlemleri sağlamalıdır. Liyakat ve ayrımcılıktan kaçınma çalışma ahlakının parçalarıdır.",
          "İş güvenliği yalnız çalışana verilen bir öğüt değildir; ortamı hazırlayanın da sorumluluğu vardır. Yüksek ücret veya bir bağış açıklanmış güvenlik ihlalini ortadan kaldırmaz. Hangi hakkın kim tarafından yerine getirildiğini ayrı denetle.",
        ],
      },
      {
        title: "Çalışanın sorumluluğu",
        paragraphs: [
          "Çalışan işi özenli ve dürüst yapmalı, sözleşmedeki sorumluluğu gözetmeli, kendisine emanet edilen araç ve malzemeyi korumalıdır. Güvenlik eğitimini uygulamak kendi ve başkalarının sağlığıyla ilişkilidir. Emek hakkı ile emanete riayet birlikte önem taşır.",
          "İşverenin bir kusuru çalışanın bütün sorumluluklarını yok saydırmaz; çalışanın bir kusuru da ücret ve güvenlik haklarını silmez. Her fiili ayrı kanıtla değerlendir. Somut uyuşmazlıkta kişisel hukuk hükmü yerine metindeki görev ilişkisi açıklanır.",
        ],
      },
      {
        title: "Dijital haklar ve telif",
        paragraphs: [
          "Telif hakkı emek ve fikrî üretimle, mahremiyet kişisel bilgi ve izinle ilişkilidir. Bir içeriği ücretsiz görmek, çoğaltma veya yeniden yayımlama yetkisinin de verildiğini göstermez. Açık lisans varsa kullanım koşulları ayrıca okunur.",
          "İzin, erişim, atıf ve ücret farklı değişkenlerdir. Kaynağın adını yazmak her durumda izin yerine geçmez. Öte yandan her paylaşımın yasak olduğunu da lisans bilgisi olmadan ilan etme; verilen yetkinin kapsamını belirle.",
        ],
      },
      {
        title: "Zorbalık ve mobbing",
        paragraphs: [
          "Akran zorbalığı başkasını inciten, dışlayan veya baskılayan davranışlarla; mobbing çalışma ortamındaki sistemli psikolojik yıldırmayla ilişkilidir. Dijital ortamda da hakaret, izinsiz ifşa ve hedef gösterme kişinin onuruna ve haklarına zarar verebilir.",
          "Olayı sırf şaka diye adlandırmak verilen zarar ve baskı bilgisini silmez. Bir tek tartışmadan bütün teknik ölçütlerin sağlandığını da çıkarma. Metnin belirttiği süreklilik, güç ilişkisi ve zarar alanlarını açıkça ayır.",
        ],
      },
      {
        title: "Bağımlılık ve risk",
        paragraphs: [
          "Uyuşturucu madde, alkol, tütün, kumar ve teknoloji kullanımındaki denetim kaybı sağlık ve haklar bakımından incelenir. Akıl, can, mal, aile ilişkileri ve çalışma hayatı aynı olayda etkilenebilir. Riskleri tanımak ve destek aramak koruyucu yaklaşımdır.",
          "Sık kullanım tek başına klinik bağımlılık tanısı değildir. İşlev kaybı ve uzman değerlendirmesi gibi bilgiler ayrı önem taşır. Dinî ve ahlaki öğretim kişiyi damgalamak yerine zararı önleme ve insanın iyiliğini koruma amacıyla açıklanır.",
        ],
      },
      {
        title: "Alkol, tütün ve kumar",
        paragraphs: [
          "Mâide 90–91’de içki ve kumardan uzak durma, düşmanlık ve sorumluluklardan alıkoyma boyutları öne çıkar. Tütün kullanımı da sağlık zararı, çevredekilerin hakkı ve israf açısından değerlendirilir. Teknik dinî hüküm adlandırmalarında kaynak ve dönem farklılığı bulunabilir.",
          "Bir davranışın zararını açıklamak onu yapan herkesin aynı kişilikte olduğunu söylemek değildir. Sağlık desteğiyle ahlaki sorumluluğu birbirinin yerine koyma. Ekran, oyun veya teknolojinin her kullanımını kumar ve bağımlılıkla eşitleme.",
        ],
      },
      {
        title: "Sağlık ve tedavi",
        paragraphs: [
          "Canın korunması, hastalıklardan korunma ve tedavi arayışı İslam öğretisinde önemlidir. Tıbbi bilginin uzmanlardan alınması, zarar vermeme, insan onuru ve rıza güncel meselelerin farklı boyutlarıdır. Dinî ilke tıbbi etkililik kanıtının yerine geçmez.",
          "Bir uygulamanın iyi amaç taşıması güvenli ve etkili olduğunun tek başına kanıtı değildir. Sağlıkla ilgili alıştırmalar verilen koşulları çözümletir; gerçek kişiye tedavi seçmez. Hastalık yaşayan kişiyi suçlamak öğretinin koruma amacıyla bağdaşan bir açıklama değildir.",
        ],
      },
      {
        title: "Otopsi",
        paragraphs: [
          "Otopsi ölüm ve hastalık nedenlerini araştırmak için vefat eden beden üzerinde yapılan tıbbi incelemedir. Dinî değerlendirmede bedenin saygınlığıyla adalet, tıbbi gereklilik ve toplum sağlığı gibi amaçlar birlikte ele alınır. Gereklilik ve ölçülülük kaynaklarda önem taşır.",
          "Otopsi organ nakli veya ötenaziyle aynı işlem değildir. Birinde ölüm nedeni araştırılır; diğerlerinde farklı amaç ve koşullar vardır. Yalnız beden üzerinde işlem yapılması bütün işlemleri tek hükme ve tek kavrama indirgemeye yetmez.",
        ],
      },
      {
        title: "Organ nakli",
        paragraphs: [
          "Organ nakli bir organ veya dokunun tedavi amacıyla başka kişiye aktarılmasıdır. Kaynaklarda tıbbi gereklilik, başarı beklentisi, vericiye zarar vermeme, izin ve ticaret konusu yapmama gibi koşullar tartışılır. Canın korunması ile hakların korunması birlikte gözetilir.",
          "Alıcının rızası vericinin bütün koşullarının sağlandığını göstermez. Bir metnin belirttiği koşullarla gerçek dünyadaki bütün tıbbi ve hukuki şartlar aynı liste olmayabilir. Ders sorusunda yazılmayan şartı yazılmış gibi sunmadan eksik bilgiyi belirt.",
        ],
      },
      {
        title: "Kan bağışı",
        paragraphs: [
          "Kan bağışı tedavi ihtiyacını karşılamaya yönelik dayanışma örneğidir. Sağlık uygunluğu, gönüllülük ve güvenli uygulama önemlidir. Kaynaklarda insan hayatını koruma ve istismardan kaçınma boyutları vurgulanır.",
          "İyi niyetle yardım istemek herkesin tıbben bağışa uygun olduğu anlamına gelmez. Uygunluk değerlendirmesi sağlık uzmanlarının işidir. Yardım ilkesiyle belirli kişinin işlem için uygun olup olmadığını ayrı düşün.",
        ],
      },
      {
        title: "Ötenazi ve yaşam desteği",
        paragraphs: [
          "Ötenazi, dersin kullandığı anlamda kişinin yaşamını kasıtlı olarak sonlandırmayı anlatır; İslam öğretisinde canın korunması ilkesiyle değerlendirilip yasak sayılır. Ağrıyı hafifletme, doğal ölüm sürecinde bakım ve yaşam desteğiyle ilgili kararlar aynı kavramın basit eş anlamlıları değildir.",
          "Beyin ölümüyle bitkisel hayatın tıbbi anlamları farklıdır. Bu ayrımı öğrenmek bireyin yalnız kısa bir metne bakarak yaşam desteği kararı verebileceği anlamına gelmez. Tıbbi ölçütler, hukuk ve etik süreç gerçek olayın uzman değerlendirmesini gerektirir.",
        ],
      },
      {
        title: "Tedavide zorunluluk ve hayatın değeri",
        paragraphs: [
          "Normalde yasaklanan bir maddenin tedavide kullanımıyla ilgili tartışmalarda gerçek ihtiyaç, güvenilir uzman görüşü, alternatif ve gerekli miktar incelenir. Canı koruma ilkesi bu çok koşullu değerlendirmede önem taşır. Her tedavi iddiası bu koşulları kendiliğinden sağlamaz.",
          "İntihar kişinin kendi hayatını kasıtlı olarak sonlandırmasıdır; İslam öğretisinde canı koruma ilkesiyle bağdaşmadığı için yasaklanır. Kişinin hayatı emanet sorumluluğu içinde ele alınır. Bu konu kişiyi aşağılayan veya yaşadığı sıkıntıyı tek nedene indirgeyen bir dille açıklanmaz. Yardım ve sağlık desteği aramak koruma amacının somut yollarındandır.",
        ],
      },
      {
        title: "Beden, estetik ve dövme",
        paragraphs: [
          "Güncel programda estetik ameliyat ve dövme gibi bedenle ilgili uygulamalar da incelenir. Tedavi, işlev kazandırma, zarar, kalıcılık, amaç ve uygulama koşulları birbirinden farklı boyutlardır. Bedenin saygınlığı ve sağlığın korunması temel çerçeveye dâhildir.",
          "Tek bir görünüşten bütün işlemlerin aynı amaçla yapıldığını varsayma. Onarıcı bir müdahaleyle yalnız görünüş amaçlı işlem aynı veri seti değildir. Bu ayrım gerçek kişiye hüküm vermek için değil, olayın hangi koşullarının sorulduğunu anlamak için kullanılır.",
        ],
      },
      {
        title: "Bidat, hurafe ve kanıt",
        paragraphs: [
          "Bidat dinî alana sonradan eklenen uygulamayla; hurafe dinî veya akli dayanağı bulunmayan batıl inanışla ilişkilidir. Bidatin sınıflandırılmasına ilişkin yorumlar farklılaşabilir. Falcılık, büyücülük ve ruh çağırma iddiaları güncel programda yanlış inanışlar çerçevesinde ele alınır.",
          "Her yeni teknoloji ibadet iddiası değildir; her kültürel alışkanlık da otomatik dinî yükümlülük sayılmaz. Bir iddianın çok paylaşılması doğruluğunu kanıtlamaz. Türünü, kaynağını ve gerekçesini ayrı sorgula.",
        ],
      },
      {
        title: "En’âm 151’in mesajları",
        paragraphs: [
          "En’âm 151 Allah’a ortak koşmamayı, anne babaya iyiliği, yoksulluk korkusuyla çocukların canına kıymamayı, çirkinliklerden uzak durmayı ve canın dokunulmazlığını öne çıkarır. Bu mesajlarda inanç, aile sorumluluğu ve yaşamın korunması birlikte görülür.",
          "Ayetin açık ilkesiyle kişisel sağlık veya aile kararının bütün ayrıntıları aynı şey değildir. Soruda hangi fiilin hangi mesajla ilişkili olduğunu göster. Metinde olmayan bireysel teşhis, nüfus hedefi veya teknik hukuk yaptırımı ekleme.",
        ],
      },
      {
        title: "En’âm 152’nin mesajları",
        paragraphs: [
          "En’âm 152 yetim malını en iyi biçimde korumayı, ölçü ve tartıda adaleti, yakınlar hakkında bile adil konuşmayı ve verilen söze bağlılığı vurgular. Güç yetirebilme ifadesi de sorumluluğun bağlamında bulunur. Mal güvenliği ve tarafsız söz farklı ama ilişkili alanlardır.",
          "Eksik tartıyla akraba lehine yalan tanıklığı aynı belirsiz iyilik sözüne indirgeme; her birinin ayrı ilkesini göster. Genel adalet mesajı bütün çağdaş teknik suçların ayrıntılı yaptırımını tek başına vermez. İstenen çıkarımın ölçeğini koru.",
        ],
      },
    ],
    examples: [
      {
        title: "Bir başlığa üç farklı iddia",
        prompt:
          "Özgün ürün afişi üç bilgi içeriyor: ücret açık, kullanıcı verisi izinsiz toplanıyor, ürünün kesin tedavi ettiği söyleniyor fakat araştırma verisi sunulmuyor. Editör yalnız fiyatı doğrulayıp afişin bütünüyle güvenilir olduğunu yazıyor. İlk mantık hatası nedir?",
        strategy: "Her iddianın gerektirdiği kanıt türünü ayrı yaz.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Fiyatın açık olması yalnız ücret bilgisinin görünürlüğünü destekler.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "İzin ve tedavi etkililiği farklı iddialardır; fiyat kontrolü bunları doğrulamaz.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "İlk hata tek alanın doğrulanmasını tüm iddialara taşımaktır. Mahremiyet ve sağlık kanıtı ayrı incelenir.",
          },
        ],
        answer:
          "Bir iddianın doğrulanması, bağımsız iki iddiayı doğrulanmış yapmaz.",
        check: "Hangi iki alanın kanıtı hâlâ eksik veya aykırı?",
        pitfall:
          "Doğru bir ayrıntıyı bütün ilan için güvenilirlik belgesi saymak.",
      },
      {
        title: "Verilen, aykırı ve bilinmeyen",
        prompt:
          "Özgün araştırma dosyası, çalışma için üç ilke tanımlıyor: gönüllü izin, veriyi gizli tutma, bağımsız uzman incelemesi. Kayıt gönüllü izin alındığını, adların açık yayımlandığını söylüyor; uzman incelemesine hiç değinmiyor. Üç koşulu bu metne göre sınıflandır.",
        strategy:
          "Her koşula tek kayıt bağla; boşluğu gerçekleşmedi diye doldurma.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Gönüllü izin açıkça vardır; gizlilik açık yayımlama bilgisiyle uyuşmaz.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Uzman incelemesi hakkında kayıt yoktur; bu koşulun sağlandığı da sağlanmadığı da belirtilmemiştir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Sıra verilen izin, aykırı gizlilik, bilinmeyen incelemedir. Bir koşulun varlığı diğerlerini tamamlamaz.",
          },
        ],
        answer:
          "İzin: verilmiş; gizlilik: aykırı veri var; uzman incelemesi: bilinmiyor.",
        check: "Bilinmiyor ile yapılmadı arasındaki farkı korudun mu?",
        pitfall: "Sessiz kalınan koşulu olumlu veya olumsuz kesinleştirmek.",
      },
      {
        title: "İki belge iki farklı soruyu yanıtlar",
        prompt:
          "Özgün gıda dosyasında A belgesi parti numarasını ve üretim yerini, B analizi aynı partiye ait katkının hangi hayvansal kaynaktan geldiğini gösteriyor. İncelenen soru yalnız katkının kaynağı; hijyen raporu dosyada yok. Hangi belgenin bu soruya doğrudan katkısı vardır ve hangi sonuç hâlâ çıkmaz?",
        strategy:
          "Sorulan veri alanını iki belgenin içerikleriyle karşılaştır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Parti eşleşmesi belgelerin aynı ürüne ait olduğunu kurar; menşe katkının kaynağıyla aynı değildir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Katkının kaynağını B analizi açıkça verir; bu soruda doğrudan kanıt odur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Bu dosyadan bütün hijyen koşullarının doğrulandığı çıkmaz; kaynak analizi hijyen raporu değildir.",
          },
        ],
        answer:
          "B katkı kaynağını açıklar; bütün hijyen şartları doğrulanmış sayılmaz.",
        check:
          "Hangi sonuç, hiçbir belgenin incelemediği yeni bir alan ekliyor?",
        pitfall:
          "Bir analiz raporunu ürünün her özelliğini onaylayan belge saymak.",
      },
      {
        title: "Ölçüde adalet: iki kaydı uzlaştır",
        prompt:
          "Özgün market kaydında paket üzerindeki net miktar 500 gram, doğru çalıştığı belirtilen tartının ölçtüğü net miktar 460 gramdır. Ambalaj ağırlığı iki değere de dâhil değildir. İade koşulu bilinmiyor. En’âm 152’deki ölçü ve tartı mesajına bağlanacak somut sorun nedir?",
        strategy:
          "Karşılaştırılabilir iki net değeri ayır; üçüncü bir hukuk sonucu ekleme.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "İki veri de net ağırlıktır; ambalaj farkı açıklaması bu soruda geçerli değildir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Ölçülen miktar etikette vaat edilenin 40 gram altındadır; açıklanan eksiklik budur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Adil ölçü mesajıyla bu fark ilişkilendirilir. Dosya iadenin nasıl yapıldığını veya ceza miktarını vermez.",
          },
        ],
        answer:
          "Vaat edilen net miktarla ölçülen net miktar arasında 40 gram eksik bulunmasıdır.",
        check: "İki değerin aynı ölçü türünde olduğunu hangi cümle sağlıyor?",
        pitfall:
          "Metinde bulunmayan ambalaj veya iade varsayımıyla somut farkı silmek.",
      },
      {
        title: "Gelenek, ibadet iddiası, kanıt",
        prompt:
          "Özgün üç nottan ilki köyün hasat günü ortak yemek verdiğini; ikincisi yeni bir düğümü bağlamanın dinen zorunlu olduğunu iddia ettiğini; üçüncüsü bu düğümün geleceği kesin bildirdiğini savunduğunu söylüyor. Hiçbiri için dinî delil sunulmuyor. Araştırmacı hangi farklı soruları sormalıdır?",
        strategy:
          "Kültürel etkinlik, dinî yükümlülük ve geleceği bilme iddiasını ayır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Ortak yemek kültürel etkinlik kaydıdır; tek başına ibadet zorunluluğu iddiası taşımaz.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Düğümün zorunlu ibadet olduğu iddiası için dinî dayanak; geleceği bildirdiği iddiası için ayrıca doğruluk gerekçesi sorulur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Üçünü sırf yeni veya eski oluşuna göre aynı kategoriye koymak iddia türlerini siler.",
          },
        ],
        answer:
          "Önce her iddianın türü, sonra o türe uygun kaynak ve kanıt araştırılır.",
        check: "Ortak yemek kaydı hangi iki iddiayı hiç ileri sürmüyor?",
        pitfall:
          "Bütün kültürel gelenekleri otomatik dinî emir veya hurafe saymak.",
      },
      {
        title: "İki ayrı fiili ayrı düzeltmek",
        prompt:
          "Özgün kurul tutanağında görevli, yetimin parasını kendi borcuna aktarıyor ve yakını hakkında gerçeğe aykırı tanıklık ediyor. Görevi iki cümleyle düzeltmen isteniyor. Verilen En’âm 152 özeti, yetim malını en iyi biçimde korumayı ve akraba hakkında bile adil konuşmayı öğütlüyor.",
        strategy:
          "Her ihlale aynı genel slogan yerine ilgili ayrı ilkeyi bağla.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "İlk fiil yetim malını yetimin yararı dışına taşımaktır; malı koruma ilkesiyle çatışır.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "İkinci fiil akraba lehine gerçeği değiştirmektir; sözde tarafsızlıkla çatışır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Düzeltme, parayı sahibinin hakkını gözeterek koruma ve doğru-adil tanıklık yapma biçiminde iki ayrı iş ister.",
          },
        ],
        answer:
          "Malı hak sahibinin yararına koru; tanıklıkta yakınlık yerine doğruluğu esas al.",
        check: "Her düzeltme hangi ayrı fiili onarıyor?",
        pitfall:
          "İki farklı hakkı tek bir belirsiz iyilik cümlesine indirgemek.",
      },
    ],
    recall: [
      {
        prompt: "İcma ile tek kurul kararını neden ayırırsın?",
        answer:
          "Kurulun kapsamı bütün ilgili müçtehitlerin görüş birliğini tek başına kanıtlamaz.",
      },
      {
        prompt: "Kıyas için hangi ortaklık önemlidir?",
        answer:
          "Hükümde etkili ortak gerekçe; yalnız ad veya görünüş benzerliği değil.",
      },
      {
        prompt: "Beş temel koruma değeri nedir?",
        answer: "Din, can, akıl, nesil ve mal.",
      },
      {
        prompt: "Ücretsiz erişim hangi yetkiyi kendiliğinden vermez?",
        answer:
          "Çoğaltma ve yeniden yayımlama yetkisini; lisans ayrıca incelenir.",
      },
      {
        prompt: "Bir sağlık koşulunun bilinmiyor olması ne anlama gelir?",
        answer: "Metin sağlandığını da sağlanmadığını da belirtmemiştir.",
      },
      {
        prompt: "En’âm 152’deki mal ve söz alanlarını örnekle.",
        answer:
          "Yetim malını koruma ve doğru tartı mal hakkına; yakını hakkında bile adil konuşma tarafsız söze ilişkindir.",
      },
    ],
  },
  {
    id: "hint-ve-cin-dinleri",
    title: "Hint ve Çin dinleri",
    detail: "detail-96",
    minutes: 150,
    objectives: [
      "Hinduizm, Budizm, Konfüçyanizm ve Taoizmi kişi, metin, öğreti ve uygulama bakımından karşılaştır.",
      "Karma, yeniden doğum, kurtuluş ve Çin düşüncesindeki erdem kavramlarını bağlamıyla ayır.",
      "Ortak sembol veya sözcükten kişisel aidiyet ve evrensel uygulama çıkarmadan kanıt kullan.",
    ],
    source:
      "MEB 12. sınıf DKAB 5. ünite Hint ve Çin Dinleri ve ilgili Aurelia kâğıdı karşılaştırılarak hazırlanan özgün öğretim. Alıştırmalar özgündür; resmî sınav sorusu değildir.",
    sections: [
      {
        title: "Dört geleneğin çerçevesi",
        paragraphs: [
          "Bu ünitede Hint alt kıtasında gelişen Hinduizm ve Budizm ile Çin kökenli Konfüçyanizm ve Taoizm ele alınır. Din, düşünce, ritüel ve kültür boyutları bu geleneklerde farklı biçimlerde bir araya gelir. Bir kişinin coğrafyası onun dinini tek başına belirlemez.",
          "Önce kişi, metin, öğreti, ritüel, topluluk ve mekânı ayrı öğren. Ortak terimler görülebilir; ayrım için özgül verileri birlikte kullan. Tarihsel bir ders anlatımını bugün bütün mensupların aynı biçimde yaşadığı iddiasına dönüştürme.",
        ],
      },
      {
        title: "Hinduizmin oluşumu ve çeşitliliği",
        paragraphs: [
          "Hinduizm Hint alt kıtasında uzun tarihsel süreçte oluşmuş dinî gelenekler bütünüdür; tek bir tarihsel kurucuya dayandırılmaz. Veda geleneği, farklı felsefe okulları ve tanrısal varlıklara bağlılık biçimleri bu çeşitliliğin parçalarıdır.",
          "Hinduizm Hindistan’daki bütün insanların veya bütün dinlerin ortak adı değildir. Mensupları farklı ülkelerde de yaşar. Güncel nüfus ve devlet dini bilgileri tarih gerektirir; eski kitaptaki sayılar değişmez güncel veri sayılmaz.",
        ],
      },
      {
        title: "Tanrısal varlıklar ve yorumlar",
        paragraphs: [
          "Brahma, Vişnu ve Şiva Hindu anlatımlarında sırasıyla yaratma, koruma ve dönüştürme veya sona erdirme işlevleriyle öne çıkar. Devi adı tanrıça veya tanrısal dişil güçle ilişkilidir. Farklı Hindu gelenekleri bu varlıklara farklı önem verir.",
          "Tek bir kısa tablo bütün Hindu teolojilerini aynı inanç kalıbına sığdırmaz. Bir metinde belirli tanrısal kişi soruluyorsa onun verilen işlevine bak. Bütün mensupların aynı varlığı aynı biçimde yorumladığını varsayma.",
        ],
      },
      {
        title: "Brahma, Brahman ve avatar",
        paragraphs: [
          "Brahma belirli tanrısal varlığın adı; Brahman özellikle Hindu felsefelerinde mutlak gerçeklikle ilgili kavramdır. Brahmin ise din adamı veya tarihsel toplumsal sınıf bağlamında kullanılan başka bir terimdir. Benzer sesler aynı anlamı taşımaz.",
          "Avatar özellikle Vişnu’nun dünyada bedenlenerek görünmesiyle ilişkilidir. Yeniden doğan sıradan insanın döngüsüyle aynı kavram değildir. Dijital profil resmi anlamındaki avatar da bu dinler tarihi sorusunun bağlamını değiştirmez.",
        ],
      },
      {
        title: "Vedalar ve Hindu metinleri",
        paragraphs: [
          "Vedalar Sanskritçe metin geleneğinin temel derlemelerindendir. Upanişadlar varlık, benlik ve nihai gerçeklik gibi sorularla ilişkilidir. Şruti vahyedilmiş veya işitilmiş kabul edilen; smriti hatırlanan gelenek bağlamında anlatılan metin grupları için kullanılır.",
          "Mahabharata, Bhagavad Gita ve Ramayana farklı işlev ve türlere sahip metinlerdir. Bütün metinleri tek yazarın tek zamanda yazdığı kitap sayma. Metin adıyla ritüel veya kutsal mekân adını ayrı sınıflandır.",
        ],
      },
      {
        title: "Karma",
        paragraphs: [
          "Karma eylem ve eylemin etik sonuçları arasındaki ilişkiyi anlatır. Hinduizmde ve Budizmde farklı öğreti bağlamlarında kullanılır. Kişinin davranışlarının sonuç taşıması, bu kavramı anlamanın temel başlangıcıdır.",
          "Karma sözcüğü tek başına hangi geleneğin anlatıldığını kesinleştirmez. Ayrıca herkesin zenginliğini, yoksulluğunu veya yaşadığı zararı dışarıdan kesin hesaplayabileceğin deneysel yasa değildir. Sorudaki öğretinin anlamıyla somut kişi hakkında kanıtsız yargıyı ayır.",
        ],
      },
      {
        title: "Samsara ve yeniden doğum",
        paragraphs: [
          "Samsara doğum, ölüm ve yeniden doğum döngüsüdür. Tenasüh veya reenkarnasyon terimleri ders anlatımlarında ruh göçü ya da yeniden bedenlenmeyle ilişkilendirilir. Hindu geleneklerinde atman ve kurtuluş tartışmaları bu bağlamda önemlidir.",
          "Budizmde yeniden doğum anlatımı değişmez bir ruhun aynı biçimde taşındığı varsayımını zorunlu kılmaz. Aynı Türkçe yeniden doğum sözü iki öğretinin bütün benlik anlayışlarını özdeşleştirmez. Döngü, neden ve kurtuluş kavramlarını ayrı tut.",
        ],
      },
      {
        title: "Mokşa ve Hindu kurtuluş anlayışları",
        paragraphs: [
          "Mokşa Hindu geleneklerinde samsaradan kurtuluş veya özgürleşmeyle ilişkilidir. Bilgi, bağlılık, eylem ve manevi disiplin farklı okullarda farklı biçimlerde vurgulanabilir. Bu yüzden kurtuluş öğretisi tek bir uygulamadan ibaret değildir.",
          "Mokşa ile Budist nirvana benzer özgürleşme temalarında karşılaştırılabilir; ama iki öğretinin içeriklerini tek terimmiş gibi eşitlemek doğru değildir. Bir soruda hangi geleneğin benlik ve kurtuluş çerçevesinin verildiğini denetle.",
        ],
      },
      {
        title: "Dharma ve görev",
        paragraphs: [
          "Dharma Hindu bağlamında düzen, görev, doğru yaşayış ve sorumluluk anlamları taşıyabilir. Budist bağlamda Buda’nın öğretisini anlatabilir. Sözcüğün anlamını yalnız tek cümlelik bir eşleştirmeyle bütün kullanımlara yayma.",
          "Bir metin aile ve toplumsal görevlerden; diğeri Buda, sangha ve öğretiden söz ediyorsa aynı dharma sözcüğü farklı çerçevede kullanılır. Önce cümledeki işlevini ve eşlik eden verileri belirle.",
        ],
      },
      {
        title: "Varna, kast ve tarihsel eşitsizlik",
        paragraphs: [
          "Derslerde tarihsel varna şeması brahminler, kşatriyalar, vaişyalar ve şudralar biçiminde anlatılır. Günlük toplumsal grupları ifade eden jati sistemi daha ayrıntılıdır. Kast dışına itilmiş topluluklara yönelik ayrımcılık da tarihsel incelemenin konusudur.",
          "Bu sistemi açıklamak ayrımcılığı haklı görmek değildir. Bütün modern Hindu bireylerin aynı uygulamayı benimsediği söylenemez. Kişilerin değerini doğuştan geldikleri gruptan çıkaran yargılar öğretimin kendi yargısı olarak sunulmaz.",
        ],
      },
      {
        title: "Puja, yoga ve ibadet mekânı",
        paragraphs: [
          "Puja evde veya tapınakta adak ve sunularla ilişkilendirilen Hindu ibadet pratiğidir. Mandir tapınak için kullanılan addır. Yoga ve meditasyon bazı dinî ve felsefi geleneklerde disiplin, dikkat ve manevi amaçlarla ilişkilidir.",
          "Bu uygulamaların biçimi topluluğa göre değişebilir. Günümüzde yoga yapan her kişinin Hindu olduğu veya yalnız bir ülkede yaşayabildiği sonucu çıkmaz. Ritüelin dinî bağlamını öğrenmekle kişisel aidiyet tayin etmek farklıdır.",
        ],
      },
      {
        title: "Om ve kutsal coğrafya",
        paragraphs: [
          "Om Hindu metin ve uygulamalarında kutsal kabul edilen hece ve semboldür. Ganj Nehri, Varanasi ve bazı dağlar kutsal coğrafya bağlamında anılır. İnek birçok Hindu gelenekte saygı ve kutsallıkla ilişkilendirilir.",
          "Bir nehir kıyısında bulunmak veya bir sembolü kullanmak kişinin bütün inancını kanıtlamaz. Cenaze uygulamaları dâhil ritüellerde çeşitlilik vardır. Bütün kadınların ibadet edemediği veya bütün cenazelerin aynı işlemden geçtiği gibi genellemeler kurulmaz.",
        ],
      },
      {
        title: "Budizmin doğuşu ve Buda",
        paragraphs: [
          "Budizm Siddhartha Gautama’nın öğretileri çevresinde Hint alt kıtasında gelişmiştir. Buda aydınlanmış veya uyanmış anlamlı bir unvandır. Kaynaklarda saray hayatı, acıyla karşılaşma, arayış ve aydınlanma anlatıları öğretiyle birlikte aktarılır.",
          "Buda’nın yaratıcı tanrı olduğu bütün Budist geleneklerin ortak öğretisi değildir. Farklı ekollerde Buda tasvirleri ve bağlılık pratikleri bulunabilir. Tarihsel kurucu, verilen unvan ve tanrı anlayışı ayrı sorulardır.",
        ],
      },
      {
        title: "Dört Yüce Hakikat",
        paragraphs: [
          "Budist öğretide Dört Yüce Hakikat, ıstırabın varlığı; kaynağı olarak bağlanma ve doymak bilmeyen arzu anlamındaki susuzluk (tanhâ); bunun sona ermesinin mümkün oluşu; sona erdirmeye götüren yol biçiminde açıklanır. Öğreti sorun, neden, imkân ve yöntem ilişkisini kurar.",
          "Istırabın varlığını anlatmak bütün hayatın her anını tek duyguyla özdeşleştirmek değildir. Soruda neden ile çözüm soruluyorsa aynı öğenin ikisinin yerine konmasına dikkat et. Dört hakikat bir metin derlemesinin adı değildir.",
        ],
      },
      {
        title: "Sekiz Aşamalı Yol",
        paragraphs: [
          "Sekiz Aşamalı Yol doğru anlayış, niyet veya karar, konuşma, davranış, geçim, çaba, farkındalık veya dikkat ve yoğunlaşma bileşenleriyle anlatılır. Bilgelik, ahlak ve zihinsel eğitim boyutları birlikte bulunur.",
          "Orta yol aşırı haz düşkünlüğüyle kendini aşırı eziyetle yıpratma arasındaki yaklaşımı anlatır. Yolun bir öğesini öğrenmek bütün aşamaların yalnız bedensel hareketlerden oluştuğunu göstermez. Sırf sekiz sayısı geçen her liste bu yol değildir.",
        ],
      },
      {
        title: "Geçicilik ve anatta",
        paragraphs: [
          "Budist öğretilerde geçicilik ve koşullara bağlı oluş önemlidir. Anatta, değişmez ve bağımsız öz-benliğin bulunmadığı yaklaşımıdır. Bu yönü Hindu düşüncesindeki atman kavramıyla karşılaştırılırken temel farklardan biridir.",
          "Değişmez benliğin reddi, insanların günlük sorumlulukları veya davranış sonuçları hiç yoktur demek değildir. Karma ve yeniden doğum ortak sözcükleri bulunduğu için iki geleneğin benlik anlayışını aynı sayma.",
        ],
      },
      {
        title: "Nirvana",
        paragraphs: [
          "Nirvana Budist bağlamda bağlanma ve ıstırabın sona ermesiyle ilişkili özgürleşmeyi anlatır. Çeşitli Budist gelenekler bu hedefin yorum ve yollarını farklı biçimlerde ele alır. Kavram gündelik haz veya kısa süreli rahatlıkla sınırlanmaz.",
          "Yalnız önceki hayatında rahip olanların her gelenekte bu hedefe ulaşabileceği gibi evrensel bir şart kurulmaz. Nirvanayı Hindu mokşasıyla tamamen eşitleme; hangi öğreti çerçevesinin verildiğini koru.",
        ],
      },
      {
        title: "Üç sığınak veya üç cevher",
        paragraphs: [
          "Buda, dharma ve sangha Budist üç sığınak veya üç cevher olarak anılır. Buda öğretici ve aydınlanma; dharma öğreti; sangha topluluk boyutunu gösterir. Bu üçlü öğretici, öğreti ve topluluk arasındaki ilişkiyi açıklar.",
          "Üç sığınak Tripitaka’nın üç bölümünün adı değildir. Aynı sayı iki ayrı listeyi özdeş yapmaz. Bir soruda sığınılan üç unsur mu yoksa yazılı metin bölümleri mi istendiğini önce belirle.",
        ],
      },
      {
        title: "Tripitaka: üç sepet",
        paragraphs: [
          "Tripitaka üç sepet olarak adlandırılan Budist metin derlemesidir. Vinaya Pitaka disiplin; Sutta veya Sutra Pitaka söylev ve öğreti; Abhidhamma veya Abhidharma Pitaka doktrinin sistemli açıklamalarıyla ilişkilidir. Pali Kanonu belirli gelenekler için temel konumdadır.",
          "Budist metin mirası yalnız bütün ekollerin aynı biçimde kullandığı tek derlemeyle sınırlı değildir. Üç sepet ile Buda-dharma-sangha üçlüsünü karıştırma. Disiplin bölümü bir manastır binasının adı değildir.",
        ],
      },
      {
        title: "Sangha ve rahiplik",
        paragraphs: [
          "Sangha Budist topluluktur; dar bağlamda rahip ve rahibeler cemaatini ifade eder. Manastır disiplini, öğrenme, meditasyon ve topluluğun desteği bu hayatla ilişkilidir. Ruhban ve ruhban olmayan mensupların rolleri farklılaşabilir.",
          "Her Budist rahip değildir; bütün rahiplerin kıyafeti ve günlük uygulaması her ekolde aynı değildir. Bir topluluğun adıyla bulunduğu mekânın adını ayır. Sangha insan topluluğunu, vihara ise mekânı anlatır.",
        ],
      },
      {
        title: "Vihara, stupa ve uygulamalar",
        paragraphs: [
          "Vihara Budist manastır, yaşam ve ibadet mekânıyla ilişkilidir. Stupa kutsal emanet veya hatırayla ilgili anıtsal yapı; pagoda bazı Asya geleneklerinde gelişen yapı biçimidir. Meditasyon, sunular ve saygı davranışları farklı Budist uygulamalarda görülür.",
          "Bir binanın bulunması bütün tören ayrıntılarının aynı olduğunu göstermez. Mekân, topluluk ve ritüel farklı kavram türleridir. Cenaze uygulamalarını yalnız ekonomik sınıftan çıkaran genellemelerden kaçın.",
        ],
      },
      {
        title: "Budist semboller ve ziyaret yerleri",
        paragraphs: [
          "Dharma çarkı, lotus ve Buda tasvirleri Budizmle ilişkilendirilen sembollerdendir. Lumbini doğum; Bodhgaya aydınlanma; Sarnath ilk öğretim; Kushinagar ölüm anlatısıyla ilişkilendirilen kutsal yerlerdir.",
          "Dharma çarkı öğretinin yol ve düzen boyutuyla ilişkilendirilebilir; bir kişinin kullandığı her çark resmi kişisel dinini kanıtlamaz. Sembol, kişi ve ziyaret yerini doğru kavram türünde karşılaştır.",
        ],
      },
      {
        title: "Konfüçyüs ve toplumsal amaç",
        paragraphs: [
          "Konfüçyanizm Çin’de Konfüçyüs’ün öğretileri çevresinde gelişen ahlaki, toplumsal ve dinî gelenektir. Eğitim, geçmişten öğrenme, kişinin kendini geliştirmesi ve yöneticinin erdemli örnekliği önem taşır. Aileyle devlet arasında sorumluluk ilişkileri kurulur.",
          "Çin kökeni Taoizmle ortaktır; tek başına ayırıcı değildir. İyi yönetim, eğitim ve uygun davranış kümesi verilmişse Konfüçyanizm bağlantısını araştır. Her Çinlinin tek ve aynı dine mensup olduğunu varsayma.",
        ],
      },
      {
        title: "Ren, li, xiao ve ilişkiler",
        paragraphs: [
          "Ren insanlık ve başkasını gözeten erdem; li uygun davranış ve ritüel düzen; xiao aile büyüklerine saygı ve evlat sorumluluğuyla ilişkilidir. Yönetici, aile ve arkadaşlık ilişkilerinde ahlaki ödevler öne çıkar. Erdemli kişi idealinde öğrenme ve davranış bütünlüğü önemlidir.",
          "Büyüklerin gözetilmesi yalnız tek geleneğe özgü değildir. Konuşmalar, ren ve li gibi özgül veriler birlikte sınıflandırmayı güçlendirir. Tarihsel rol düzenini açıklamak günümüzde bütün insanlara tek aile rolü dayatmak değildir.",
        ],
      },
      {
        title: "Tian ve göğün düzeni",
        paragraphs: [
          "Tian veya T’ien gök ve ahlaki kozmik düzenle ilişkilendirilen temel kavramdır. Gelenek içindeki yorumlarda yüce güç ve göğün buyruğu vurguları bulunabilir. Bu çerçeve yönetimin ahlaki sorumluluğu anlatılırken önem taşır.",
          "Tian’ı her kaynakta yalnız fiziksel gökyüzü veya bütün dinlerde aynı tanrı kavramı diye çevirmek anlamı daraltır. Metnin kullanımı belirleyicidir. Ahengi anlatan bir kavramı nüfus veya tarih ölçümü gibi ele alma.",
        ],
      },
      {
        title: "Beş Klasik",
        paragraphs: [
          "Konfüçyan metin geleneğinde Beş Klasik; Değişiklikler, Tarih veya Belgeler, Şiirler, Ayinler ve İlkbahar-Sonbahar Vakayinameleri biçiminde anılır. Yönetim, tarih, tören ve ahlaki eğitimle ilişkili farklı metin türlerini içerir.",
          "Bu derlemeleri yalnız Konfüçyüs’ün tek zamanda yazdığı beş kitap gibi sunmak tarihsel aktarımı basitleştirir. Öğrenciler, yorum geleneği ve önceki metinlerle ilişki önemlidir. Koleksiyon adıyla tek bir ritüeli karıştırma.",
        ],
      },
      {
        title: "Dört Kitap ve Konuşmalar",
        paragraphs: [
          "Dört Kitap Konuşmalar veya Analektler, Büyük Öğrenme, Orta Yol Doktrini ve Mensiyüs’ün kitabı olarak sıralanır. Konuşmalar, Konfüçyüs ve öğrencileriyle ilişkilendirilen söz ve diyaloglar aracılığıyla öğretisini tanımaya yardımcı olur.",
          "Budist orta yol ile Konfüçyan Orta Yol Doktrini aynı ad benzerliği üzerinden özdeş sayılamaz. Metin adının ait olduğu koleksiyonu ve geleneği denetle. Beş Klasik ile Dört Kitap iki ayrı sınıflama başlığıdır.",
        ],
      },
      {
        title: "Ata saygısı, tören ve mekân",
        paragraphs: [
          "Konfüçyan gelenekte atalara saygı, anma törenleri, aile devamlılığı ve Konfüçyüs’e adanmış mekânlar önem taşır. Tarihsel imparatorluk törenleriyle aile içindeki uygulamalar farklı ölçeklerdir. Çin dinî hayatında geleneklerin iç içe geçtiği örnekler vardır.",
          "Bir ata töreni tek başına bütün diğer Çin geleneklerini dışlamaz. Bütün Çinlilerin aynı töreni yaptığı veya çocuğu olmayan herkesin aynı biçimde değerlendirildiği gibi genellemeler kurulmaz. Açıklanan topluluk ve tarih kapsamını koru.",
        ],
      },
      {
        title: "Taoizm ve Laozi",
        paragraphs: [
          "Taoizm Çin’de gelişmiş düşünce ve dinî gelenekler bütünüdür. Laozi veya Lao Tzu geleneksel öncü olarak anılır; yaşamına ilişkin ayrıntıların tarihsel kesinliği sınırlıdır. Tao veya Dao yol, varoluşun düzeni ve kaynağıyla ilişkili temel kavramdır.",
          "Tao’yu yalnız yürünülen fiziksel yol veya bütün dinlerde aynı kişisel yaratıcı tasarımı diye açıklamak yeterli değildir. Soruda kavramın işlevini oku. Tek bir kesin doğum yılı üzerinden bütün geleneğin başlangıcını hesaplama.",
        ],
      },
      {
        title: "Tao Te Ching ve Te",
        paragraphs: [
          "Tao Te Ching veya Dao De Jing, Tao ve onun erdemi veya etkinliğiyle ilişkili temel metindir. Te varlıklarda beliren erdem ve güç boyutunu anlatır. Zhuangzi de Taoist düşünce mirasında önemli bir metin ve isimdir.",
          "Metin, düşünce ilkesi ve ibadet mekânı ayrı kategorilerdir. Tao Te Ching’i bir tören veya tanrı adı sayma. Aynı kavramın farklı çevirilerini ayrı dinlermiş gibi sınıflandırmak yerine bağlamlarını karşılaştır.",
        ],
      },
      {
        title: "Wu wei ve doğal uyum",
        paragraphs: [
          "Wu wei zorlayıcı, yapay ve aşırı müdahaleden kaçınarak doğal akışa uygun eylemle açıklanabilir. Su benzetmeleri, yumuşaklık ve gösterişsizlik Taoist anlatımlarda önem taşır. Bu yaklaşım her koşulda bütün işleri bırakmak değildir.",
          "Bir bahçıvanın mevsime göre ölçülü bakım yapması eylemsizlikten farklıdır. Soruda hangi müdahalenin niçin azaltıldığına bak. Taoist bir benzetmeyi tıbbi veya mühendislik sorununun deneysel çözümü gibi sunma.",
        ],
      },
      {
        title: "Yin-yang ve tamamlayıcılık",
        paragraphs: [
          "Yin-yang, karşıt ama birbirini tamamlayan ögelerin ilişkisini anlatır; taijitu bu ilişkinin bilinen görsel simgesidir. Taoizmle güçlü biçimde ilişkilidir ve daha geniş Çin düşüncesinde de kullanılır. Karşıtlıklar sürekli ilişki ve değişim içinde düşünülür.",
          "Yin’i ahlaken kötü veya bir cinsiyeti değersiz; yangı ahlaken iyi diye ölçmek bu tamamlayıcılığı bozar. Sembolün bir duvarda bulunması sahibinin dinini kesinleştirmez. Sembolün öğreti ilişkisiyle kişisel aidiyet farklı sorulardır.",
        ],
      },
      {
        title: "Taoist uygulamalar ve kutsal yerler",
        paragraphs: [
          "Dinî Taoist geleneklerde tapınaklar, rahiplik, tören, tütsü ve sunular; bazı okullarda meditasyon ve beden disiplini bulunur. Dağlar ve mağaralar kutsal ziyaret yeri olarak önem kazanabilir. Kung, kuan ve miao gibi adlar mekân bağlamında kullanılır.",
          "Felsefi ilkelerle bütün yerel ritüelleri tek kalıpta düşünme. Tarihsel ölümsüzlük arayışını gerçek sağlık etkisinin kanıtı olarak sunma. Her topluluğun aynı töreni aynı ayrıntıyla yaptığı sonucu çıkmaz.",
        ],
      },
      {
        title: "Karşılaştırmayı iki kanıtla kurmak",
        paragraphs: [
          "Veda ve mokşa Hinduizmi; Buda ve Sekiz Aşamalı Yol Budizmi; Konuşmalar ve li Konfüçyanizmi; Tao Te Ching ve wu wei Taoizmi tanımaya yardımcı olur. Karma, meditasyon veya Çin coğrafyası gibi ortak veriler ek ipucu gerektirebilir.",
          "Sorunun istediği nesneye göre kişi, metin, yer veya ilkeyi seç. Bir kavramın bir gelenekte bulunması onu yalnız o geleneğe ait yapmaz. Bilgi yetersizliğini belirtmek, o ilişkinin dünyada hiç bulunmadığını söylemekten farklıdır.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı sayı, farklı üçlü",
        prompt:
          "Özgün kütüphane taslağında üç sığınak başlığı altına Vinaya, Sutta, Abhidhamma; üç sepet başlığı altına Buda, dharma, sangha yazılmıştır. Tanım notu ilk grubun metin bölümleri, ikinci grubun öğretici-öğreti-topluluk olduğunu açıklıyor. Başlıklar nasıl düzeltilir?",
        strategy:
          "Önce listenin eleman türünü belirle; yalnız üç sayısına bakma.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Vinaya, Sutta ve Abhidhamma metin derlemesinin bölüm adlarıdır.",
          },
          {
            label: "İlişkiyi kur",
            explanation: "Buda, dharma ve sangha üç sığınak veya üç cevherdir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Başlıklar karşılıklı değiştirilir; iki listenin aynı sayıda olması aynı liste olduklarını göstermez.",
          },
        ],
        answer:
          "Metin bölümleri üç sepet; Buda-dharma-sangha üç sığınak başlığına alınır.",
        check:
          "Her listede insan, öğreti, topluluk veya metin bölümü türünden hangisi var?",
        pitfall: "Sayı eşitliğini anlam eşitliği saymak.",
      },
      {
        title: "Hangi yeni veri adayları ayırır?",
        prompt:
          "Özgün iki din kartı H ve B olarak gizlenmiş; anahtar not H’nin Hinduizm, B’nin Budizm olduğunu söylüyor. İlk dosyada yalnız karma kavramı var. İkinci dosyada aynı açıklamaya Vedalara başvuru ekleniyor. Soru iki aşamada kanıtın ayırıcı gücünün nasıl değiştiğini soruyor.",
        strategy:
          "İlk ortak veriyle sonradan eklenen özgül veriyi ayrı değerlendir.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Karma iki gelenekte de bulunduğu için ilk dosya H ile B’yi tek başına ayırmaz.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Vedalara başvuru Hindu metin geleneğiyle ilişkilidir; ikinci dosya H yönünde ayırıcı veri kazanır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Değişen, karma tanımı değil ek metin bilgisidir. Bu bir kişinin bütün inancının ölçümü değildir.",
          },
        ],
        answer:
          "İlk aşama ayrım için yetersiz; ikinci aşamada H’yi destekleyen özgül metin verisi vardır.",
        check: "Vedalar cümlesi kaldırılırsa aynı kesinlik kalır mı?",
        pitfall:
          "Ortak terimin sonradan tek geleneğe özgü hâle geldiğini sanmak.",
      },
      {
        title: "Yolun üç farklı boyutu",
        prompt:
          "Özgün Budist eğitim planında gerçek dışı haber yaymamak, başkasına zarar veren geçimden kaçınmak ve dikkat çalışması yapmak için ayrı zamanlar ayrılmıştır. Verilen sözlükte doğru konuşma sözle, doğru geçim kazançla, doğru dikkat farkındalıkla ilişkilidir. Plan niçin tek tür bedensel alıştırma sayılamaz?",
        strategy: "Üç eylemin yöneldiği alanları ayrı isimlendir.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Haberin doğruluğu konuşma; kazanç yolu geçim; dikkat çalışması farkındalık boyutuna girer.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Üçü Sekiz Aşamalı Yolun farklı ahlaki ve zihinsel yönlerine bağlanır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Verilen planın bütün öğelerini tek bedensel hareket türü saymak iki ayrı alanı siler.",
          },
        ],
        answer: "Söz, geçim ve zihinsel dikkat alanları birlikte vardır.",
        check: "Her etkinlik için ayrı bir kanıt fiili gösterebilir misin?",
        pitfall: "Yol kelimesini yalnız fiziksel yürüyüş diye anlamak.",
      },
      {
        title: "Ses benzerliğiyle bozulan etiket",
        prompt:
          "Özgün sergi etiketinde mutlak gerçeklik açıklamasının yanına Brahma; yaratıcı tanrısal kişi açıklamasının yanına Brahman yazılmıştır. Yan not Brahman’ın mutlak gerçeklik, Brahma’nın belirli ilah olduğunu tanımlıyor. Sorulan dinin adını bulmak değil, iki etiketin doğruluğunu onarmaktır.",
        strategy:
          "Önce aynı sesli iki terimin verilen işlevlerini karşılaştır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Mutlak gerçeklik kavramı Brahman tanımına uyar.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Belirli tanrısal kişi Brahma ile eşleşir; iki etiket ters konmuştur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Adlar karşılıklı düzeltilir. Bütün Hindu yorumlarının tek olduğu sonucu bu iki tanımdan çıkmaz.",
          },
        ],
        answer: "Mutlak gerçeklik: Brahman; belirli tanrısal kişi: Brahma.",
        check: "Kişi adı ile metafizik kavramı hangi açıklama ayırıyor?",
        pitfall: "Bir harf farkını anlamsız sayıp iki işlevi birleştirmek.",
      },
      {
        title: "Örneklik ile görev dağılımı",
        prompt:
          "Özgün Konfüçyan ahlak etkinliğinde yönetici verdiği sözü tutuyor; öğretmen kendi yanlışını açıkça düzeltiyor; öğrenci öğrendiği kuralı arkadaşını incitmeden uyguluyor. Metin yalnız ceza miktarlarından söz etmiyor. Bu üç farklı rol arasında hangi ortak ilişki kurulabilir?",
        strategy:
          "Rollerin adlarını değil davranışların ahlaki işlevini karşılaştır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Üç farklı konumda kişinin kendi davranışıyla sorumluluk göstermesi verilmiştir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Bu, erdemin örneklik ve eğitim yoluyla ilişkilerde görünür olmasıyla bağlanabilir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Sadece buyurma veya cezalandırma sonucu çıkmaz; açık veriler söz tutma, düzeltme ve saygılı uygulamadır.",
          },
        ],
        answer:
          "Farklı roller, erdemi kendi davranışlarıyla örnekleyerek eğitime katkı sağlar.",
        check: "Ortak ilişkiyi her üç fiile de bağladın mı?",
        pitfall:
          "Yalnız yönetici sözcüğünden bütün ilişkinin zor kullanma olduğunu çıkarmak.",
      },
      {
        title: "Müdahaleyi azaltmak ile işi bırakmak",
        prompt:
          "Özgün Taoist benzetmede iki dere bakım planı karşılaştırılıyor. A planı akış yönünü sürekli zorla değiştiriyor; B planı yalnız tıkanıklığı temizleyip suyun doğal yatağını koruyor. İki planda da emek var. Metin wu weiyi zorlayıcı müdahaleden kaçınarak uygun eylem diye tanımlıyor.",
        strategy:
          "Eylemin varlığını ve eylemin zorlayıcı niteliğini iki değişken say.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "A ve B’de iş yapıldığı açık; hiç çalışmama iki planın da tanımı değildir.",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "B, tıkanıklığı giderirken doğal akışa zorla yeni yön vermemeyi amaçlar.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Bu tanım çerçevesinde B, wu wei benzetmesine daha uygundur. Bu bir gerçek mühendislik güvenlik kararı değildir.",
          },
        ],
        answer:
          "B, eylemi sürdürürken zorlayıcı müdahaleyi azalttığı için tanımla daha uyumludur.",
        check: "B’de hangi fiil işin tümüyle bırakılmadığını gösteriyor?",
        pitfall: "Zorlamamayı her koşulda hareketsizlikle eşitlemek.",
      },
    ],
    recall: [
      {
        prompt: "Karma tek başına hangi iki adayı ayırmayabilir?",
        answer: "Hinduizm ve Budizm; bağlama ait ek bilgi gerekir.",
      },
      {
        prompt: "Üç sepet ile üç cevheri ayır.",
        answer:
          "Tripitaka metin derlemesi; Buda-dharma-sangha üç cevher veya sığınaktır.",
      },
      {
        prompt: "Mokşa ile nirvanayı niçin tek terim saymazsın?",
        answer:
          "Hindu ve Budist öğreti çerçeveleri farklıdır; özgürleşme teması ortaklık tüm içerik özdeşliği değildir.",
      },
      {
        prompt: "Ren, li, xiao neyle ilişkilidir?",
        answer:
          "İnsanlık erdemi, uygun ritüel/davranış ve aile büyüklerine saygı sorumluluğu.",
      },
      {
        prompt: "Wu wei bütün işleri bırakmak mıdır?",
        answer:
          "Zorlayıcı müdahaleden kaçınan uygun eylemi anlatabilir; mutlak hareketsizliğe indirgenmez.",
      },
      {
        prompt: "Yin-yang şekli kişinin dinini kesin verir mi?",
        answer:
          "Hayır; öğreti ve sembol ilişkisi kişisel aidiyetin kesin kanıtı değildir.",
      },
    ],
  },
];
type QuestionRow025 = {
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
const questionRows025: QuestionRow025[][] = [
  [
    {
      passage:
        "Bir ders çizelgesinde inanç esaslarını tartışma kelam, davranışların dinî hükümlerini araştırma fıkıh, nefsi arındırıp güzel huy kazanma tasavvuf başlığına yerleştiriliyor. Bir araştırma üçüncü işi amaçladığını açıkça belirtiyor.",
      prompt: "Araştırmanın çizelgedeki karşılığı hangisidir?",
      options: ["Tasavvuf", "Kelam", "Fıkıh", "Kıraat", "Coğrafya"],
      reasons: [
        "Nefis terbiyesi ve güzel ahlak amacı üçüncü alanın tanımıdır.",
        "İnanç esaslarını tartışma ayrı başlık olarak verilmiştir.",
        "Hüküm araştırması bu çalışmanın bildirilen amacı değildir.",
        "Kur’an’ın okunuşuna ilişkin alan bu çizelgedeki hedefle aynı değildir.",
        "Yer ve bölge incelemesi verilmiş bir amaç değildir.",
      ],
      steps: [
        "Araştırma nefsi arındırma ve güzel huy kazanmayı amaçlar.",
        "Çizelge bu iki amacı tasavvuf başlığına bağlar.",
        "İnanç ve hukuk başlıklarıyla amaç farklılığını koruyarak tasavvufu seç.",
      ],
      strategy: "Araştırmanın amaç fiilini alanın tanımıyla eşleştir.",
      commonError: "Dinle ilgili her alanı aynı inceleme konusu saymak.",
      check: "Yanıtın araştırmanın açık amacına mı dayanıyor?",
      knowledge: [
        "Kelam, fıkıh ve tasavvuf ilişkilidir; konu vurguları farklıdır.",
      ],
    },
    {
      passage:
        "Bir esnaf geçimini dürüstçe sağlıyor, işini bırakmıyor ve kazancının ihtiyaç fazlasını paylaşıyor. Kendi açıklamasında malı hayatın tek amacı hâline getirmemeye çalıştığını söylüyor. Notta zühd, dünya malına aşırı bağlanmama diye tanımlanıyor.",
      prompt: "Hangi yorum notla en uyumludur?",
      options: [
        "Çalışmayı sürdürmesi zühdü dışlamaz.",
        "Zühd için bütün üretimi bırakması gerekir.",
        "Paylaşması mal kazandığını inkâr eder.",
        "Malı varsa mutlaka mala esirdir.",
        "Zühd yalnız meslek adını belirtir.",
      ],
      reasons: [
        "Tanım aşırı bağlılığa yöneliktir; dürüst emeğin bırakılmasını istemez.",
        "Tanımda bütün üretimi durdurma koşulu yoktur.",
        "Metin kazanç ve paylaşmanın birlikte bulunduğunu söyler.",
        "Malın elde bulunmasıyla aşırı bağlılık aynı bilgi değildir.",
        "Zühd bir tutumdur; bu notta meslek adı değildir.",
      ],
      steps: [
        "Esnafın çalışmayı sürdürdüğü açıkça verilir.",
        "Zühd tanımı işin yokluğunu değil aşırı bağlılıktan kaçınmayı anlatır.",
        "Çalışma ve ölçülü tutum bu veride birlikte bulunduğundan dışlama yapılamaz.",
      ],
      strategy: "Malın varlığını ve mala bağlılığı iki ayrı veri say.",
      commonError: "Kazanç sahibi olmayı zühdün tanımsal karşıtı sanmak.",
      check: "Tanımda çalışmayı bırakma koşulu var mı?",
      knowledge: ["Zühdün odağı dünya malına aşırı bağlılıktan kaçınmadır."],
    },
    {
      passage:
        "Bir tarih yazısı önce sade yaşayışa yönelik eğilimleri, sonra manevi eğitim kavramlarının gelişmesini, daha sonra düzenli rehberlik kurumlarının oluşmasını anlatıyor. Yazar bu aşamaların her bölgede aynı yılda başladığını söylemiyor.",
      prompt: "Bu anlatıdan hangisi çıkarılabilir?",
      options: [
        "Manevi yönelim ile kurumsallaşma farklı aşamalardır.",
        "Tarikat kurumları ilk günden bugünkü biçimiyle vardı.",
        "Her bölge için aynı başlangıç yılı belirlenmiştir.",
        "Kavramların gelişmesi hiç yaşanmamıştır.",
        "Sade yaşayışın tarihsel anlatıda yeri yoktur.",
      ],
      reasons: [
        "Metin yönelim, kavram gelişimi ve kurumlaşmayı sırayla ayırır.",
        "Anlatı kurumların daha sonraki oluşumundan söz eder.",
        "Yazar ortak yıl iddiasını açıkça ileri sürmez.",
        "İkinci aşama doğrudan kavram gelişimidir.",
        "İlk aşama sade yaşayışı açıkça içerir.",
      ],
      steps: [
        "Yazıda üç ayrı gelişim özelliğini belirle.",
        "Düzenli kurumlar sade yaşayış eğiliminden sonra anlatılmıştır.",
        "Bu ayrım aşama farkını destekler; evrensel tek yıl vermez.",
      ],
      strategy: "Özellik sırasını takvim iddiasından ayır.",
      commonError:
        "Açıklayıcı dönemlendirmeyi bütün coğrafyaların tek takvimi saymak.",
      check: "Seçtiğin yorum metinde verilmeyen yıl ekliyor mu?",
      knowledge: [
        "Tasavvuf tarihi yaşayış, kavramlaşma ve kurumsallaşma boyutlarında anlatılabilir.",
      ],
    },
    {
      passage:
        "Bir tasavvuf dersinin hedefleri tevazu, sözünde durma ve emaneti koruma olarak açıklanıyor. Bir öğrenci yalnız özel bir kıyafet giydiğini söyleyerek bu üç hedefi bütünüyle gerçekleştirdiğinin kanıtlandığını savunuyor. Davranışları hakkında başka kayıt yok.",
      prompt: "İlk gerekçelendirme sorunu hangisidir?",
      options: [
        "Kıyafet verisinden üç ahlaki davranışı kesinleştirmesi.",
        "Emaneti korumayı ahlaki hedef sayması.",
        "Sözünde durmayı davranışla ilişkili görmesi.",
        "Dersin birden fazla hedefi olduğunu okuması.",
        "Kıyafetin giyildiğini verilen bilgi sayması.",
      ],
      reasons: [
        "Giyim bilgisi üç hedefin fiilen yerine geldiğini göstermiyor.",
        "Emanet açıkça dersin hedefleri arasında yer alır.",
        "Sözünü tutmak verilen davranış hedefidir.",
        "Metin üç ayrı hedefi gerçekten listeler.",
        "Kıyafet giyildiği bilgisi doğrudan verilir; sorun bunun kapsamını aşmaktır.",
      ],
      steps: [
        "Kanıt olarak sunulan tek veri özel kıyafettir.",
        "Tevazu, söz ve emanet için ayrı davranış kaydı bulunmuyor.",
        "Bu nedenle kıyafetten tam ahlaki gerçekleşmeye geçiş kanıtı aşar.",
      ],
      strategy: "İddiadaki her hedef için verilen fiili tek tek ara.",
      commonError:
        "Unvan veya görünüşü bütün ahlaki özelliklerin yeterli kanıtı saymak.",
      check: "Hangi üç davranış için veri eksik?",
      knowledge: [
        "Tasavvufi ahlakın amacı davranış niteliğidir; kıyafet tek başına yeterli kanıt değildir.",
      ],
    },
    {
      passage:
        "Bir açıklama ihsanı Allah’ı görüyormuşçasına kulluk bilinci, ihlası niyetin içtenliği ve gösterişten uzak oluşu diye tanımlıyor. İki nottan ilki kullukta Allah’ın kendisini gördüğü bilincini; ikincisi yalnız beğeni toplama niyetini anlatıyor.",
      prompt: "Tanımlara göre hangi eşleştirme doğrudur?",
      options: [
        "İlk not ihsanla uyumlu; ikinci not ihlasla uyuşmaz.",
        "İlk not ihlası reddeder; ikinci not ihsandır.",
        "İki not da zorunlu olarak ihlastır.",
        "İki not da yalnız mekân bildirir.",
        "İlk not nefsin tarihsel dönem adıdır.",
      ],
      reasons: [
        "İlkinde kulluk bilinci, ikincide gösteriş amacı açıkça verilmiştir.",
        "İlk not niyetin içtenliğini reddetmez; ikinci de kulluk bilinci anlatmaz.",
        "Beğeni toplama amacı ihlasın gösterişten kaçınma vurgusuyla uyuşmaz.",
        "Notlar yer değil bilinç ve amaç bilgisi verir.",
        "İlk not bir tarihsel evreyi değil bilinç durumunu anlatır.",
      ],
      steps: [
        "İhsan tanımındaki kulluk bilincini ilk notla eşleştir.",
        "İkinci notun tek amacını beğeni toplamak olarak işaretle.",
        "Bu gösteriş amacı ihlas tanımına aykırıdır; iki ayrı sonucu koru.",
      ],
      strategy: "Bilinç ve amaç cümlelerini farklı tanımlarla karşılaştır.",
      commonError:
        "İhsan ve ihlası ses benzerliği nedeniyle aynı tanım saymak.",
      check: "İkinci notta hangi amaç açıkça yazılı?",
      knowledge: [
        "İhsan kulluk bilincini, ihlas niyetin samimiyetini vurgular.",
      ],
    },
    {
      passage:
        "Bir kavram kartında nefs-i levvâme, kişinin yanlışını kınayıp ondan dönme yönelişiyle açıklanıyor. Kurmaca bir anlatıda kişi yaptığı haksızlığı fark ettiğini, kendini eleştirdiğini ve özür aradığını söylüyor. Soru bu sözlerin hangi kart tanımına benzediğini istiyor.",
      prompt: "Hangi karşılık daha uygundur?",
      options: [
        "Nefs-i levvâme",
        "Nefs-i emmâre",
        "Cemevi",
        "Mâsivâ",
        "Peyikçi",
      ],
      reasons: [
        "Yanlışını kınama ve dönüş yönelişi verilen tanımla uyuşur.",
        "Emmâre kötülüğe yönelten nefis olarak anlatılır; burada öz eleştiri vardır.",
        "Cemevi mekândır; bu yönelişin adı değildir.",
        "Mâsivâ Allah dışındaki varlıklarla ilgili kavramdır.",
        "Peyikçi bir cem hizmetidir; bu manevi yönelişin adı değildir.",
      ],
      steps: [
        "Anlatıdaki fiiller yanlışını fark etme ve kendini kınamadır.",
        "Kart levvâmeyi bu özelliklerle tanımlar.",
        "Tanım benzerliği seçilir; gerçek kişinin bütün manevi derecesi ölçülmüş sayılmaz.",
      ],
      strategy: "Kartın tanımını verilen öz eleştiri fiiline bağla.",
      commonError:
        "Kavram alıştırmasını gerçek kişinin kesin manevi derecesi saymak.",
      check: "Cevabın tanımla sınırlı mı, kişinin bütünü hakkında mı?",
      knowledge: [
        "Nefis mertebeleri manevi öğretinin kavramlarıdır; kullanıcıya puanla atanmaz.",
      ],
    },
    {
      passage:
        "Bir manevi eğitim kaydında rehberin yol gösterdiği, eğitime katılan kişinin de bu rehberlikten yararlandığı belirtiliyor. Sözlük rehberi mürşit, eğitime yönelen kişiyi mürit olarak adlandırıyor; süreç için seyr-u sülûk terimini veriyor.",
      prompt: "Kişi rolleri hangi sırayla doğru yazılır?",
      options: [
        "Mürşit – mürit",
        "Mürit – mürşit",
        "Seyr-u sülûk – cemevi",
        "Gülbank – lokma",
        "Semah – sema",
      ],
      reasons: [
        "Önce yol gösteren, sonra eğitime katılan rolü tanımlanmıştır.",
        "Sıra rehberle öğreneni tersine çevirir.",
        "İlki süreç, ikincisi mekândır; iki kişi rolü değildir.",
        "Dua ve paylaşım kavramları burada rol çifti değildir.",
        "İki ritüel adı verilen kişi rollerini karşılamaz.",
      ],
      steps: [
        "İlk kişinin fiili yol göstermektir; mürşit tanımına uyar.",
        "İkinci kişi rehberlikten yararlanır; mürittir.",
        "Süreç adı olan seyr-u sülûku iki kişiden birinin yerine koyma.",
      ],
      strategy: "Önce fiilin öznesini, sonra rol adını belirle.",
      commonError: "Kişi rolü ile yürütülen süreci aynı türden sanmak.",
      check: "İlk sıraya yol gösteren kişiyi yazdın mı?",
      knowledge: ["Mürşit rehber; mürit manevi eğitime yönelen kişidir."],
    },
    {
      passage:
        "Bir tasavvuf metni marifeti manevi tanıma ve tecrübeyle ilişkilendiriyor. İncelemeci, metinde deney düzeneği veya ölçüm verisi bulunmadığı hâlde bunun bütün doğa olayları için laboratuvar kanıtı sunduğunu yazıyor.",
      prompt: "İncelemecinin eklediği sorunlu iddia hangisidir?",
      options: [
        "Manevi tanımayı deneysel ölçüm kanıtı sayması.",
        "Metnin bir kavramı açıkladığını söylemesi.",
        "Marifetin manevi bağlamını fark etmesi.",
        "Ölçüm verisinin yazılmadığını okuması.",
        "Tecrübenin metinde anıldığını belirtmesi.",
      ],
      reasons: [
        "Metin manevi bir kavram açıklar; verilmemiş deney kanıtını sağlamaz.",
        "Metin gerçekten marifetin anlamını açıklar.",
        "Manevi bağlam doğrudan verilmiştir.",
        "Ölçüm verisinin yokluğu soruda açıkça söylenir.",
        "Tecrübe kavramı açıklamada gerçekten yer alır.",
      ],
      steps: [
        "Metnin bilgi türü manevi tanıma olarak verilmiştir.",
        "Deney ve ölçüm kaydı açıkça bulunmamaktadır.",
        "Bu yüzden bütün doğa olayları için laboratuvar kanıtı sonucu ek varsayımdır.",
      ],
      strategy: "Kavramın bilgi türüyle iddia edilen kanıt türünü karşılaştır.",
      commonError: "Her tanıma ifadesini otomatik deneysel doğrulama sanmak.",
      check: "Metinde hangi deney veya ölçüm gerçekten verildi?",
      knowledge: [
        "Manevi tecrübe anlatımıyla deneysel ölçüm aynı kanıt türü değildir.",
      ],
    },
    {
      passage:
        "Bir kaynak kartı Ahmed Yesevî’nin Türkçe hikmetlerini Divân-ı Hikmet adıyla ilişkilendiriyor. Müze görevlisi bu eser ve kişi bağından hareketle ilgili tasavvufi geleneğin adını yazmak istiyor. Kartta Mevlânâ veya Bahâeddin Nakşibend adı geçmiyor.",
      prompt: "Hangi gelenek adı kartın özgül verisiyle uyuşur?",
      options: [
        "Yesevilik",
        "Mevlevilik",
        "Nakşibendilik",
        "Rifailik",
        "Kadirilik",
      ],
      reasons: [
        "Ahmed Yesevî ve Divân-ı Hikmet doğrudan bu geleneğe bağlanır.",
        "Mevlânâ ve Mesnevî farklı kişi-eser bağlarıdır.",
        "Bahâeddin Nakşibend bu kartın verilen kişisi değildir.",
        "Ahmed er-Rifâî adı kartta verilen kişiyle aynı değildir.",
        "Abdülkadir Geylânî bu özgül eser bağını karşılamaz.",
      ],
      steps: [
        "Karttaki kişiyi Ahmed Yesevî olarak belirle.",
        "Eser adı Divân-ı Hikmet de aynı bağı destekler.",
        "İki özgül veriyle Yesevilik eşleştirmesini doğrula.",
      ],
      strategy: "Kişi ve eseri birlikte gelenek adına bağla.",
      commonError:
        "Türkçe şiir ortaklığından bütün şairleri aynı geleneğe yerleştirmek.",
      check: "Hem kişi hem eser aynı adayla uyuşuyor mu?",
      knowledge: ["Divân-ı Hikmet Ahmed Yesevî ve Yesevilikle ilişkilidir."],
    },
    {
      passage:
        "Bir tarih notu Kadiriliği Abdülkadir Geylânî’nin düşünceleriyle ilişkilendiriyor; Anadolu’daki yayılışta Eşrefoğlu Rûmî ve Müzekki’n-Nüfûs’u anıyor. Not iki kişinin aynı kişi olduğunu söylemiyor.",
      prompt: "Bu iki katkı nasıl ayrılmalıdır?",
      options: [
        "Geylânî gelenekle; Eşrefoğlu Anadolu’daki aktarım ve eserle ilişkilidir.",
        "Eşrefoğlu ile Geylânî aynı kişinin iki adıdır.",
        "Müzekki’n-Nüfûs bu nota göre Mevlânâ’nın eseridir.",
        "Anadolu’daki aktarım gelenekle hiçbir ilişki taşımaz.",
        "Geylânî adı yalnız bir ibadet mekânını gösterir.",
      ],
      reasons: [
        "Not iki farklı kişiye farklı ama ilişkili katkılar verir.",
        "Metin bu kişileri birbirinden ayrı tanıtır.",
        "Eser notta Eşrefoğlu ile ilişkilendirilmiştir.",
        "Not aktarımı doğrudan Kadirilikle bağlantılı anlatır.",
        "Geylânî bu notta kişi adıdır; mekân değildir.",
      ],
      steps: [
        "İlk kişi-gelenek bağını Geylânî ve Kadirilik olarak ayır.",
        "İkinci kişi Anadolu’daki aktarım ve eserle anılmıştır.",
        "Katkıları birleştirmeden aynı tarihsel zincirde ilişkilendir.",
      ],
      strategy: "Kişi adlarını ayrı tutup her birinin yüklemini oku.",
      commonError:
        "Bir gelenekte katkısı bulunan bütün kişileri tek kişi sanmak.",
      check: "Eser hangi kişiye bağlanmıştı?",
      knowledge: [
        "Kurucu düşünce bağı ve yayılışa katkı farklı tarihsel ilişkilerdir.",
      ],
    },
    {
      passage:
        "Bir sergi metninde Ahmed er-Rifâî adı açıkça veriliyor; onun çevresinde gelişen tasavvufi geleneğin başlığı boş bırakılıyor. Metin edep ve nefis terbiyesini de anıyor, fakat bunların yalnız tek geleneğe ait olduğunu ileri sürmüyor.",
      prompt: "Boş başlık için hangi ad uygundur?",
      options: [
        "Rifailik",
        "Hanefilik",
        "Mâtürîdîlik",
        "Konfüçyanizm",
        "Yahudilik",
      ],
      reasons: [
        "Adı verilen kişiyle ilişkili tasavvufi gelenektir.",
        "Hanefilik fıkhi yorum alanında ayrı bir gelenektir.",
        "Mâtürîdîlik itikadi yorum alanıyla ilişkilidir.",
        "Konfüçyanizm Çin kökenli ayrı bir öğretidir.",
        "Yahudilik bu kişinin tasavvufi geleneğinin adı değildir.",
      ],
      steps: [
        "En özgül veri Ahmed er-Rifâî’nin adıdır.",
        "Kişi-gelenek ilişkisi Rifailiği gösterir.",
        "Ortak edep vurgusunu tek başına ayırıcı sanmadan kişi verisiyle sonucu kur.",
      ],
      strategy: "Ortak ahlak sözcükleri yerine açık kişi adını öncele.",
      commonError: "Rifailiği fıkhi veya itikadi mezhep başlığına taşımak.",
      check: "Seçtiğin ad tasavvufi gelenek türünde mi?",
      knowledge: ["Ahmed er-Rifâî, Rifailikle ilişkilendirilir."],
    },
    {
      passage:
        "Bir not Mevlânâ’nın Mesnevî’yi yazdığını, oğlu Sultan Veled’in Mevlevi düzenin kurumsallaşmasında rol aldığını söylüyor. Editör iki farklı katkıyı koruyan bir cümle arıyor. Başka bir yazarlık veya kuruluş iddiası verilmemiştir.",
      prompt: "Hangi cümle notu doğru aktarır?",
      options: [
        "Eser yazarlığı Mevlânâ’ya, belirtilen kurumsal katkı Sultan Veled’e aittir.",
        "Mesnevî’nin yazarı Sultan Veled olarak verilmiştir.",
        "Mevlânâ ile Sultan Veled aynı kişidir.",
        "Kurumsal katkı hiçbir kişiye bağlanmamıştır.",
        "Eserin varlığı kurumsallaşmayı imkânsız kılar.",
      ],
      reasons: [
        "İki özne ve iki katkı nottaki gibi korunur.",
        "Not yazarı açıkça Mevlânâ olarak belirtir.",
        "Baba-oğul ilişkisi iki farklı kişiyi anlatır.",
        "Sultan Veled’in rolü açıkça verilmiştir.",
        "Eser ve kurumsal düzen arasında böyle bir dışlama yoktur.",
      ],
      steps: [
        "Mesnevî yazarlığını ilgili özneye bağla.",
        "Kurumsallaşma rolünün ayrı öznesini belirle.",
        "Cümlede iki ilişkiyi yer değiştirmeden birlikte koru.",
      ],
      strategy: "Her yüklemi kendi öznesiyle eşleştir.",
      commonError:
        "Eseri yazanla kurumu düzenleyenin mutlaka aynı kişi olduğunu varsaymak.",
      check: "Seçenekte iki katkının öznesi değişmiş mi?",
      knowledge: [
        "Mevlânâ’nın düşünce ve eserleriyle Sultan Veled’in kurumsal katkısı ayrı öğrenilir.",
      ],
    },
    {
      passage:
        "Bir metin Bahâeddin Nakşibend’le ilişkili gelenekte kalbî ve gizli zikre önem verildiğini anlatıyor. Aynı metin zikir kavramının başka tasavvufi geleneklerde de bulunduğunu belirtiyor.",
      prompt: "Hangi sonuç metnin iki bilgisini de korur?",
      options: [
        "Nakşibendilik bağı kişi verisiyle güçlenir; zikir tek başına özgül değildir.",
        "Zikir bulunan her metin kesin Nakşibendiliktir.",
        "Nakşibendilikte zikir bulunmaz.",
        "Gizli sözcüğü bütün diğer gelenekleri yok eder.",
        "Bahâeddin Nakşibend bir mekân adıdır.",
      ],
      reasons: [
        "Kişi-gelenek bağı ve ortak uygulama ayrımı birlikte korunur.",
        "Metin zikrin başka geleneklerde de bulunduğunu söyler.",
        "Metin özellikle bu gelenekte zikrin önemini anlatır.",
        "Bir vurgudan bütün diğer geleneklerin yokluğu çıkmaz.",
        "Verilen ad tarihsel kişi adıdır.",
      ],
      steps: [
        "Kişi adının özgül Nakşibendilik bağı kurduğunu belirle.",
        "Zikir sözcüğünün birden fazla gelenekte kullanıldığını ayrıca koru.",
        "Kesinliği ortak kelimeye değil kişiyle birlikte verilen bağa dayandır.",
      ],
      strategy: "Ortak uygulama ile özgül kişi adının kanıt gücünü ayır.",
      commonError:
        "Bir geleneğin vurgusunu o kavramın tek sahibi olması sanmak.",
      check: "Cevap zikrin başka geleneklerde de bulunmasını koruyor mu?",
      knowledge: [
        "Gizli zikir Nakşibendilikte öne çıkar; zikir tek geleneğe özgü değildir.",
      ],
    },
    {
      passage:
        "Bir eğitim şeması dört kapıyı şeriat, tarikat, marifet ve hakikat diye adlandırıyor; her kapıyla on makam ilişkilendiriyor. Şema tarih, oda sayısı veya eğitimin gün cinsinden süresini vermiyor.",
      prompt: "Hangi yargı şemadan çıkarılamaz?",
      options: [
        "Eğitimin zorunlu olarak kırk gün sürdüğü.",
        "Dört ana başlığın bulunduğu.",
        "Her başlıkla on makam ilişkilendirildiği.",
        "Marifetin başlıklardan biri olduğu.",
        "Şemanın manevi eğitim bağlamında olduğu.",
      ],
      reasons: [
        "Makam sayısı süre bilgisi değildir; gün verilmemiştir.",
        "Şema dört başlığı açıkça listeler.",
        "On makam ilişkisi doğrudan verilmiştir.",
        "Marifet adlandırılmış dört kapıdan biridir.",
        "Şema eğitim bağlamıyla tanıtılmıştır.",
      ],
      steps: [
        "Olumsuz kökün kanıtlanmayan yargıyı istediğini belirle.",
        "Verilen sayılar kapı ve makama aittir.",
        "Gün bilgisi olmadığından kırk günlük zorunlu süre iddiasını seç.",
      ],
      strategy: "Her sayının hangi nesneyi saydığını yaz.",
      commonError: "Makam sayısını eğitimin takvim süresine dönüştürmek.",
      check: "Kırk sayısının birimi gün mü makam mı?",
      knowledge: [
        "Dört kapı kırk makam manevi eğitim şemasıdır; sayı tek başına süre vermez.",
      ],
    },
    {
      passage:
        "Bir cem açıklaması on iki hizmetin görev adlarını sayıyor. Katılımcı listesi veya görevlerin kaç kişi tarafından birlikte yürütüldüğü verilmemiştir. Bir okur bu sayıdan törene toplam yalnız on iki kişinin katıldığını çıkarıyor.",
      prompt: "Okurun ilk hatası nedir?",
      options: [
        "Görev sayısını toplam katılımcı sayısı sayması.",
        "Açıklamada görev adları bulunduğunu okuması.",
        "Cemin bir erkân olduğunu söylemesi.",
        "Katılımcı listesinin verilmediğini fark etmesi.",
        "Hizmetlerin düzenle ilişkili olduğunu belirtmesi.",
      ],
      reasons: [
        "On iki hizmet görev düzenidir; toplam katılımcı sayısı ayrıca verilmelidir.",
        "Görev adlarının sayıldığı metinde açıkça yazılıdır.",
        "Cem erkân bağlamında tanıtılmıştır.",
        "Listenin verilmediği soruda açıkça belirtilir.",
        "Görevlerin bulunması düzenle ilişkilidir; hata bu değildir.",
      ],
      steps: [
        "Verilen sayının hizmetlere ait olduğunu işaretle.",
        "Toplam katılımcı için bağımsız bir liste bulunmadığını belirle.",
        "İki farklı sayılan nesneyi eşitleme geçersizdir.",
      ],
      strategy: "Görev sayısı ile insan sayısı için ayrı veri ara.",
      commonError:
        "Bir törendeki görev adlarını tüm katılımcı sayısının ölçüsü sanmak.",
      check: "Metinde kaç kişinin katıldığı gerçekten yazıyor mu?",
      knowledge: [
        "Cemde on iki hizmet toplam katılımcı sayısını zorunlu olarak belirlemez.",
      ],
    },
    {
      passage:
        "Bir görev çizelgesi cemin yapılacağını topluluğa duyurma işini peyikçiye, tören sırasında su temin ve dağıtımını sakkaya bağlıyor. İki ayrı görevli önce duyuruyu yapıyor, sonra su hizmetini yürütüyor.",
      prompt: "Bu iki işin doğru sırası hangisidir?",
      options: [
        "Peyikçi – sakka",
        "Sakka – peyikçi",
        "Zakir – çerağcı",
        "Mürşit – gülbank",
        "Cemevi – musahiplik",
      ],
      reasons: [
        "Duyuru ve su işlevleri çizelgedeki sırayla eşleşir.",
        "Görevlerin işlev sırasını ters çevirir.",
        "Zakir müzikli anlatım, çerağcı aydınlatmayla ilişkilidir.",
        "İlki kişi rolü, ikincisi duadır; verilen iki hizmet çifti değildir.",
        "Mekân ve kardeşlik bağı iki görevli adı değildir.",
      ],
      steps: [
        "İlk fiil duyurmaktır; çizelge peyikçiyi verir.",
        "İkinci fiil su sağlamaktır; çizelge sakkayı verir.",
        "Sırayı bu iki fiile göre koru.",
      ],
      strategy: "Her fiili çizelgedeki ayrı görevliye bağla.",
      commonError:
        "Su ve duyuru hizmetlerini benzer tören bağlamı yüzünden ters yazmak.",
      check: "İkinci sıradaki rol su hizmeti mi yapıyor?",
      knowledge: ["Peyikçi duyuruyla, sakka su hizmetiyle ilişkilidir."],
    },
    {
      passage:
        "İki kayıt açıkça farklı geleneklerden söz ediyor: I. Mevlevi semazenlerinin musiki eşliğindeki töreni. II. Alevi-Bektaşi cem erkânındaki deyişlerle yapılan dönüş ritüeli. Soru bu iki ritüelin ders kapsamındaki adlarını soruyor.",
      prompt: "Doğru adlandırma hangisidir?",
      options: [
        "I sema; II semah",
        "I semah; II sema",
        "I lokma; II cemevi",
        "I musahiplik; II kıyas",
        "I ikrar; II mizan",
      ],
      reasons: [
        "Açık gelenek bilgisi iki benzer sesli ritüeli ayırır.",
        "Gelenek-ritüel ilişkileri ters çevrilmiştir.",
        "Yiyecek paylaşımı ve mekân iki ritüelin adı değildir.",
        "Kardeşlik ve yöntem kavramları anlatılan törenleri adlandırmaz.",
        "Bağlılık sözü ve ahiret kavramı bu iki ritüel değildir.",
      ],
      steps: [
        "İlk kaydın Mevlevi bağlamını semayla eşleştir.",
        "İkinci kaydın cem bağlamını semahla eşleştir.",
        "Yalnız dönüş ortaklığına değil iki açık gelenek verisine dayan.",
      ],
      strategy: "Benzer hareketin yanında verilen geleneği de oku.",
      commonError: "Sema ve semahı aynı yazılışın iki biçimi saymak.",
      check: "İki ritüel adını ait oldukları gelenekle yeniden eşleştirdin mi?",
      knowledge: [
        "Mevlevi seması ile Alevi-Bektaşi semahı farklı bağlamlarda öğrenilir.",
      ],
    },
    {
      passage:
        "Bir toplulukta Allah’tan iyilik ve af dileyen kısa dua okunuyor; sonrasında yiyecek paylaşılıyor. Açıklama duayı gülbank, paylaşılan yiyeceği lokma diye adlandırıyor. İki fiilin de gerçekleştiği açıkça belirtiliyor.",
      prompt: "Hangi özet açıklamadaki tür ayrımını korur?",
      options: [
        "Gülbank dua; lokma paylaşımın yiyeceğidir.",
        "Gülbank binanın, lokma rehberin adıdır.",
        "İki ad da yalnız takvim gününü gösterir.",
        "Dua okununca yiyecek paylaşılmadığı anlaşılır.",
        "Lokma bir eserin yazarıdır.",
      ],
      reasons: [
        "Dua metniyle paylaşılan yiyecek ayrı türler olarak korunur.",
        "Açıklama mekân veya kişi adı vermemiştir.",
        "Hiçbir ad burada günün adı olarak kullanılmaz.",
        "Metin iki fiilin birlikte gerçekleştiğini söyler.",
        "Lokma bu bağlamda yazar adı değildir.",
      ],
      steps: [
        "İlk fiilin dua okumak olduğunu belirle.",
        "İkinci fiil yiyecek paylaşmaktır.",
        "Açıklamanın verdiği adları iki ayrı türe bağlayarak özetle.",
      ],
      strategy: "Fiil ve nesneyi birer kısa cümlede ayrı yaz.",
      commonError: "Birlikte yapılan dua ve paylaşımı aynı nesne saymak.",
      check: "Yanıt dua ile yiyeceği ayırıyor mu?",
      knowledge: ["Gülbank duayla, lokma paylaşılan yiyecekle ilişkilidir."],
    },
    {
      passage:
        "Bir kültür notu Muharrem matemini Kerbelâ’da Hz. Hüseyin ve yakınlarının yaşadığı zulmün hatırlanmasıyla ilişkilendiriyor. Hızır orucunu ayrı başlıkta açıklıyor ve yerel uygulama tarihlerinin değişebildiğini belirtiyor.",
      prompt: "Notun desteklediği sonuç hangisidir?",
      options: [
        "İki başlık farklıdır; bütün yerel tarihler özdeş sayılmaz.",
        "Muharrem ve Hızır aynı takvim olayının iki adıdır.",
        "Not her yöre için tek değişmez tarih verir.",
        "Kerbelâ Muharrem notunda hiç anılmamıştır.",
        "Yerel farklar iki başlığın hiçbir anlamı olmadığını gösterir.",
      ],
      reasons: [
        "Ayrı başlıklar ve yerel değişkenlik birlikte açıkça verilmiştir.",
        "Not iki başlığı farklı tanıtır.",
        "Metin tarihlerde yerel fark olabileceğini söyler.",
        "Kerbelâ bağlantısı ilk cümlede doğrudan vardır.",
        "Farklı uygulama anlamın bulunmadığını gerektirmez.",
      ],
      steps: [
        "Muharrem bağının Kerbelâ hatırlamasına ait olduğunu ayır.",
        "Hızır orucunun ayrıca anlatıldığını belirle.",
        "Yerel değişkenliği koruyarak iki olayı tek takvim olayı sayma.",
      ],
      strategy: "Başlık farkı ile yerel uygulama farkını birlikte koru.",
      commonError: "Gelenek içindeki her orucu aynı olay ve aynı gün saymak.",
      check: "Seçenek notun belirttiği değişkenliği siliyor mu?",
      knowledge: [
        "Muharrem ve Hızır oruçları farklı başlıklardır; yerel uygulamalar değişebilir.",
      ],
    },
    {
      passage:
        "Hucurât 10’un verilen özeti müminlerin kardeşliğini ve aralarının düzeltilmesini vurguluyor. Bir yorumcu bu özeti yalnız kan bağı bulunan kişilere uygulanabilen aile kuralı diye sınırlandırıyor. Özette kan bağı koşulu yer almıyor.",
      prompt: "Yorumdaki ilk kapsam hatası nedir?",
      options: [
        "Dinî kardeşlik bağını kan bağı koşuluyla daraltması.",
        "Arayı düzeltmenin ayette yer aldığını belirtmesi.",
        "Özette kardeşlik kavramı bulunduğunu okuması.",
        "Bir toplumsal ilişkiden söz edildiğini fark etmesi.",
        "Özetin iki mesaj taşıdığını söylemesi.",
      ],
      reasons: [
        "Özetin vermediği soy koşulu eklenerek kapsam daraltılmıştır.",
        "Arayı düzeltme özette açıkça vardır.",
        "Kardeşlik verilen temel kavramdır.",
        "Kardeşlik ve barıştırma toplumsal ilişki boyutu taşır.",
        "Kardeşlik ve arayı düzeltme iki mesaj olarak verilmiştir.",
      ],
      steps: [
        "Özetin bağını müminlerin kardeşliği olarak belirle.",
        "Kan bağı şartının metinde bulunmadığını gör.",
        "Yorumcunun ek şartla kapsamı daraltmasını hata olarak seç.",
      ],
      strategy: "Kardeşlik bağının metinde hangi temelde kurulduğunu denetle.",
      commonError: "Dinî kardeşlik ifadesine verilmemiş soy koşulu eklemek.",
      check: "Kan bağı koşulu özette gerçekten var mı?",
      knowledge: ["Hucurât 10’daki kardeşlik kan bağıyla sınırlı değildir."],
    },
  ],
  [
    {
      passage:
        "Yeni bir veri saklama hizmetinin ayrıntılı adı eski kaynaklarda geçmiyor. Yetkin bir heyet, Kur’an ve sünnetteki genel ilkeleri, hakları ve teknik uzmanların verdiği bilgileri birlikte inceleyerek dinî değerlendirme yapıyor. Metin bütün âlimlerin aynı sonuca vardığını söylemiyor.",
      prompt: "Bu çalışma en doğrudan hangi kavramla açıklanır?",
      options: [
        "İçtihat",
        "Kesin icma",
        "Yalnız menşe tespiti",
        "Kişisel fal yorumu",
        "Ezbere ürün eşleştirme",
      ],
      reasons: [
        "Ehliyetli kişilerin kaynak ve yöntemle yeni meseleyi inceleme çabasıdır.",
        "Heyetin çalışması bütün müçtehitlerin ittifakını tek başına vermez.",
        "Çalışma yalnız ürünün ülkesini saptamaktan daha kapsamlıdır.",
        "Metinde fal değil kaynak ve uzmanlık incelemesi vardır.",
        "İnceleme gerekçeli yürütülür; yalnız ürün adına dayanmaz.",
      ],
      steps: [
        "Yeni hizmet hakkında kaynak ve teknik veri incelendiğini belirle.",
        "Bu inceleme ehliyetli kişilerce dinî sonuca ulaşma çabasıdır.",
        "İçtihadı seç; verilmemiş bütün âlimler ittifakını ekleme.",
      ],
      strategy: "Çalışmanın yöntemini ve heyetin kapsamını ayrı oku.",
      commonError: "Bir heyetin her çalışmasını bütün âlimlerin icması saymak.",
      check: "Metin bütün müçtehitlerin görüş birliğini gerçekten veriyor mu?",
      knowledge: [
        "İçtihat yetkin kaynak ve yöntem çalışmasıdır; icma ayrıca görüş birliği koşulu taşır.",
      ],
    },
    {
      passage:
        "Bir tutanak yalnız altı kişilik kurulun oy birliğiyle karar aldığını bildiriyor. Sözlük icmayı, ilgili dönemdeki müçtehitlerin dinî hüküm üzerinde ittifakı diye tanımlıyor. Tutanak kurul dışındaki kişilerin görüşünü vermiyor.",
      prompt: "Hangi ifade tutanağın kapsamına uygundur?",
      options: [
        "Kurulun oy birliği bilinir; tanımdaki bütün ittifak bu veriden kanıtlanmaz.",
        "Bütün müçtehitlerin aynı hükme vardığı kesinleşir.",
        "Kurulun hiç karar almadığı kanıtlanır.",
        "Kurul dışında kimsenin bu görüşü paylaşmadığı kesindir.",
        "Oy birliği kavramı tutanakta hiç yer almamıştır.",
      ],
      reasons: [
        "Yerel oy birliği ile tanımdaki geniş kapsam birbirinden ayrılır.",
        "Kurul dışındaki görüşler verilmediğinden kapsam genişletilemez.",
        "Tutanak karar alındığını açıkça söyler.",
        "Dışarıdakilerin karşıt olduğu da verilmemiştir.",
        "Oy birliği tutanağın doğrudan bilgisidir.",
      ],
      steps: [
        "Tutanaktaki kümenin yalnız altı kişilik kurul olduğunu yaz.",
        "İcma tanımının bundan geniş kapsam istediğini karşılaştır.",
        "Kurul dışı bilgi olmadığı için tam ittifakı bu veriyle kanıtlanmış sayma.",
      ],
      strategy: "Görüş birliğinin hangi kişi kümesinde kurulduğunu belirle.",
      commonError: "Küçük bir grubun ittifakını tüm ilgili uzmanlara yaymak.",
      check: "Yanıt bilinmiyor ile karşı çıkıldı ayrımını koruyor mu?",
      knowledge: [
        "Bir grubun oy birliği, daha geniş grubun ittifakının yeterli kanıtı değildir.",
      ],
    },
    {
      passage:
        "A işinde müşteriye ürünün kusuru bilerek gizleniyor. B işinde aynı kusur çevrim içi ekrandan bilerek saklanıyor. Bir ilke notu, hile yasağında etkili gerekçenin aldatma ve hak ihlali olduğunu belirtiyor.",
      prompt: "İki işi ilişkilendiren geçerli ortaklık hangisidir?",
      options: [
        "İkisinde de kusurun gizlenerek müşterinin aldatılması.",
        "İkisinin de aynı renkte kutu kullanması.",
        "İkisinin de aynı sokakta bulunması.",
        "İkisinin de aynı yıl başlaması.",
        "İkisinin adlarının aynı harfle başlaması.",
      ],
      reasons: [
        "Notta hüküm bakımından etkili olan ortak neden budur.",
        "Kutu rengi verilmediği gibi hile gerekçesi de değildir.",
        "Çevrim içi iş için aynı sokak bilgisi yoktur.",
        "Başlangıç yılı verilmemiştir ve aldatmanın gerekçesi değildir.",
        "Ad harfi verilmemiştir; etkili gerekçeyle ilgili değildir.",
      ],
      steps: [
        "A ve B’deki ayrı yüzeyleri dükkân ve ekran olarak ayır.",
        "İki fiilde de kusurun bilinçli gizlendiğini bul.",
        "İlke notundaki etkili gerekçe bu aldatma ortaklığıdır.",
      ],
      strategy: "Dış görünüş yerine hükümde etkili nedeni bul.",
      commonError: "Kıyası yalnız yüzey benzerliğiyle kurmaya çalışmak.",
      check: "Ortaklığın hak ihlaliyle ilişkisini açıkça gösterebiliyor musun?",
      knowledge: ["Kıyasın dayanağı hüküm bakımından etkili ortak gerekçedir."],
    },
    {
      passage:
        "Bir kavram sözlüğü zarûrât-ı hamseyi din, can, akıl, nesil ve malın korunması olarak veriyor. Zarûrât-ı diniyyeyi ise dinin kesin temel esasları diye açıklıyor. Öğrenci bu iki tanımı aynı başlığa tek anlam olarak topluyor.",
      prompt: "Hangi düzeltme gerekir?",
      options: [
        "Beş koruma amacı ile kesin temel esas tanımını ayırmak.",
        "Beş koruma amacı sayısını ikiye indirmek.",
        "Malın korunmasını listeden çıkarmak.",
        "Kesin temel esasları yalnız mekân adı saymak.",
        "İki farklı tanımın verildiğini inkâr etmek.",
      ],
      reasons: [
        "Benzer adlar sözlükte iki farklı kapsamla tanımlanmıştır.",
        "Sözlük beş amacı açıkça sayar.",
        "Mal verilen beşli listede yer alır.",
        "Kesin esaslar mekân değildir.",
        "Soruda iki tanımın da bulunduğu açıktır.",
      ],
      steps: [
        "İlk tanımın korunan değerleri saydığını belirle.",
        "İkinci tanımın kesin dinî esaslara ait olduğunu ayır.",
        "İki kapsamı aynı ad benzerliğiyle özdeşleştirmeden yaz.",
      ],
      strategy: "İki tanımın yüklemlerini ayrı cümlelerde göster.",
      commonError: "Benzer kelimeleri aynı kapsamın iki yazılışı saymak.",
      check: "Yanıt iki tanımın farklı nesnelerini koruyor mu?",
      knowledge: [
        "Zarûrât-ı hamse beş koruma değeri; zarûrât-ı diniyye kesin temel esaslarla ilişkilidir.",
      ],
    },
    {
      passage:
        "Bir öneri mahalleye gelir getirecektir; ancak verilen rapora göre içme suyunu ciddi biçimde kirletecektir. İlke notu, zararı önlemeye yarar sağlamaya göre öncelik tanınmasını def-i mefâsidin celb-i menâfiden önce gelmesiyle açıklıyor.",
      prompt: "Bu not açısından hangi gerekçe eksik kalır?",
      options: [
        "Gelir getiriyor, bu yüzden açıklanan su zararı önem taşımaz.",
        "Su zararının niteliği ayrıca değerlendirilmelidir.",
        "Yarar ile zarar aynı olayda bulunabilir.",
        "Gelir bilgisi tek başına tüm incelemeyi bitirmez.",
        "Can ve çevre etkisi somut veriye bağlanmalıdır.",
      ],
      reasons: [
        "Yarar, açık zarar verisini silmek için kullanılıyor; notla uyuşmaz.",
        "Notun zarar önleme yaklaşımıyla uyumludur.",
        "Senaryo iki etkiyi birlikte açıkça verir.",
        "İlke tam da tek taraflı yarar gerekçesini yetersiz kılar.",
        "Somut zarar bilgisinin incelenmesi gerekir.",
      ],
      steps: [
        "Arananın eksik gerekçe olduğunu işaretle.",
        "Senaryoda gelir ve ciddi su zararı birlikte vardır.",
        "Yalnız gelirle su zararını önemsiz sayan seçeneği bul.",
      ],
      strategy:
        "Yararın açıklanmış zararı ortadan kaldırıp kaldırmadığını denetle.",
      commonError:
        "Bir yararı bütün hak ve sağlık zararlarını silen gerekçe saymak.",
      check: "Seçenek rapordaki su zararını hesaba katıyor mu?",
      knowledge: [
        "Zararı önleme ilkesi yarar iddiasıyla birlikte değerlendirilir.",
      ],
    },
    {
      passage:
        "Bir not, sedd-i zerâiyi ciddi zarara götüren yolları önleme ilkesi diye tanımlıyor. İnceleme için yol ile zarar arasındaki ilişkinin ve somut koşulların araştırılması gerektiğini belirtiyor.",
      prompt: "Hangi uygulama bu tanımı aşar?",
      options: [
        "Hiçbir somut bağ araştırmadan her davranışı yasaklamak.",
        "Zarara götüren ilişkiyi incelemek.",
        "Zararın ciddiyetini değerlendirmek.",
        "Verilen olayın koşullarını ayırmak.",
        "Gerekçeyi somut bilgiyle kurmak.",
      ],
      reasons: [
        "Tanımın aradığı ilişki ve koşul incelemesi kaldırılmıştır.",
        "Bu inceleme notta açıkça istenir.",
        "Ciddi zarar tanımın temel unsurudur.",
        "Koşulların değerlendirilmesi gerekli görülür.",
        "Somut gerekçe kurma tanımla uyumludur.",
      ],
      steps: [
        "Tanımın hangi zarara götüren yolu istediğini belirle.",
        "Not somut bağ ve koşul araştırması ister.",
        "Araştırmasız bütün davranışları yasaklayan yaklaşım bu sınırı aşar.",
      ],
      strategy: "Önleme ilkesinin kanıt ve kapsam koşullarını koru.",
      commonError: "Ciddi zarar önlemeyi sınırsız kuşku yasağına dönüştürmek.",
      check: "Tanım bütün davranışları mı, belirli zarar yolunu mu anlatıyor?",
      knowledge: [
        "Sedd-i zerâi ciddi zarara götüren yolları önlemeyle ilişkilidir.",
      ],
    },
    {
      passage:
        "Bir ders kartı mübahı yapılıp yapılmaması serbest bırakılan, mekruhu kaçınılması uygun görülen, haramı kesin yasaklanan davranış olarak açıklıyor. Sorulan davranış kartta yalnız serbest bırakılmış diye tanımlanıyor.",
      prompt: "Kartın istediği hüküm adı hangisidir?",
      options: ["Mübah", "Haram", "Mekruh", "Farz", "İcma"],
      reasons: [
        "Yapma veya yapmama serbestliği doğrudan mübah tanımıdır.",
        "Kesin yasak bilgisi verilmemiştir.",
        "Kaçınılması uygun görülen nitelik bu davranışa verilmemiştir.",
        "Kesin yapılma yükümlülüğü belirtilmemiştir.",
        "İcma bir görüş birliği kavramıdır; bu davranışın hüküm adı değildir.",
      ],
      steps: [
        "Sorulanın bir hüküm adı olduğunu belirle.",
        "Verilen nitelik yalnız serbest bırakılmadır.",
        "Kartın bu niteliğe verdiği mübah karşılığını seç.",
      ],
      strategy: "Tanımdaki izin, yasak ve yükümlülüğü ayır.",
      commonError:
        "Serbest davranışla kesin yasak davranışı aynı hüküm saymak.",
      check: "Yanıtın karttaki serbestlik tanımına uyuyor mu?",
      knowledge: ["Mübah yapılıp yapılmaması serbest bırakılan davranıştır."],
    },
    {
      passage:
        "Bir ürün dosyasında yalnız hangi ülkede üretildiği yazıyor. Katkının içeriği, işlem biçimi ve güvenilir doğrulama bilgisi bulunmuyor. İncelemeci sadece yabancı ülkede üretilmiş olmasından kesin haram sonucu çıkarıyor.",
      prompt: "İlk kanıt sorunu nedir?",
      options: [
        "Menşe bilgisini verilmemiş içerik ve işlem kanıtı yerine koyması.",
        "Üretim ülkesinin dosyada yazdığını okuması.",
        "İçerik için ek bilgi gerektiğini düşünmesi.",
        "Menşe ile içerik verisini farklı tutması.",
        "Doğrulama bilgisinin eksik olduğunu fark etmesi.",
      ],
      reasons: [
        "Ülke, içeriğin yasak bir madde içerdiğini tek başına göstermez.",
        "Bu bilgi gerçekten dosyada vardır; hata bunu okumak değildir.",
        "Ek bilgi ihtiyacı dosyanın sınırına uygundur.",
        "Bu ayrım yapılması gereken doğru kontroldür.",
        "Doğrulama eksikliği soruda açıkça belirtilir.",
      ],
      steps: [
        "Verilen tek alanın üretim ülkesi olduğunu yaz.",
        "İçerik ve işlem alanlarının bilinmediğini ayrı tut.",
        "Ülkeden bu iki alana kesin yasak verisi taşıma geçersizdir.",
      ],
      strategy: "Ülke, içerik ve işlemi üç ayrı veri alanı olarak yaz.",
      commonError:
        "Menşe adını ürünün dinî ve teknik bütün özellikleri yerine koymak.",
      check: "Haram sonucunu kuran içerik bilgisi dosyada var mı?",
      knowledge: [
        "Gıda değerlendirmesinde menşe ile içerik ve işlem farklı bilgilerdir.",
      ],
    },
    {
      passage:
        "Bir tartışmada istihale, maddenin niteliğinde dönüşüm olarak tanımlanıyor; hangi dönüşümün hükme nasıl etki ettiği konusunda farklı görüşler bulunduğu belirtiliyor. Teknik rapor belirli bir değişim gerçekleştiğini söylüyor ama dinî değerlendirme vermiyor.",
      prompt: "Hangisi bu veriyi aşan kesinlik taşır?",
      options: [
        "Her kimyasal değişim bütün ürünleri otomatik helal yapar.",
        "Teknik değişim ile dinî yorum farklı sorulardır.",
        "Değişimin niteliği incelenmelidir.",
        "Verilen görüş ayrılığı korunmalıdır.",
        "Rapor tek başına bütün hüküm tartışmasını bitirmez.",
      ],
      reasons: [
        "Belirli değişimden bütün ürünlere koşulsuz hüküm genişletilir.",
        "Tanım ve rapor ayrımı bu yorumu destekler.",
        "İstihale incelemesi dönüşümün niteliğiyle ilgilidir.",
        "Görüş ayrılığı metinde açıkça verilmiştir.",
        "Teknik raporun kapsamı böyle sınırlanabilir.",
      ],
      steps: [
        "Raporun yalnız teknik bir değişimi verdiğini belirle.",
        "Metin dinî yorumda farklı görüşler bulunduğunu söyler.",
        "Her değişim ve bütün ürünler iddiası bu kapsamı kanıtsız aşar.",
      ],
      strategy: "Belirli dönüşümü bütün maddelere genelleyen sözcükleri ara.",
      commonError: "İstihale adını her ürün için koşulsuz izin kuralı sanmak.",
      check: "Her ve bütün sözcükleri verilen teknik rapordan çıkıyor mu?",
      knowledge: [
        "İstihalenin hükme etkisi dönüşümün niteliği ve yorumuyla ilişkilidir.",
      ],
    },
    {
      passage:
        "Bir bilim raporu yalnız X adlı bitkide belirli genetik işlemin yapıldığını bildiriyor. Sağlık etkileriyle ilgili sonuç henüz verilmemiştir. Bir yorumcu bundan bütün genetik işlemlerin her koşulda aynı sağlık zararını verdiğini çıkarıyor.",
      prompt: "Hangi düzeltme uygundur?",
      options: [
        "İşlemin varlığı ile bütün işlemlerin zarar sonucunu ayırmak.",
        "Bütün işlemlerin güvenli olduğu sonucunu kesinleştirmek.",
        "X’te hiç işlem yapılmadığını söylemek.",
        "Sağlık etkisi araştırmasını gereksiz görmek.",
        "Bütün genetik işlemleri aynı teknik olay saymak.",
      ],
      reasons: [
        "Rapordaki sınırlı veri, evrensel zarar sonucunu vermez.",
        "Zarar kanıtlanmaması koşulsuz güvenlik kanıtı da değildir.",
        "Rapor X’te işlem yapıldığını açıkça bildirir.",
        "Sağlık etkisinin ayrıca incelenmesi gerekir.",
        "Farklı işlemler ve koşullar tek veriyle özdeşleşmez.",
      ],
      steps: [
        "Kesin verilenin X’te işlem yapıldığı olduğunu belirle.",
        "Sağlık sonucu bu raporda henüz yoktur.",
        "Ne evrensel zarar ne evrensel güvenlik çıkar; kapsam ayrımını koru.",
      ],
      strategy: "İşlem kaydı ile etki kanıtını farklı sorular olarak ele al.",
      commonError:
        "Tek üründeki işlem bilgisinden bütün tekniklerin aynı etkisini çıkarmak.",
      check: "Cevabın bu kez kanıtsız güvenlik iddiası ekliyor mu?",
      knowledge: [
        "Genetik işlem ve sağlık etkileri somut süreç ve kanıtla incelenir.",
      ],
    },
    {
      passage:
        "Bir metin zorunluluk nedeniyle belirli maddenin yalnız ihtiyaç miktarınca kullanılmasını anlatıyor; alternatif bulunmadığını ve sınırın aşılmaması gerektiğini belirtiyor. Konu kişisel tedavi seçimi değil metindeki istisnanın kapsamıdır.",
      prompt: "Hangi sonuç metindeki koşulları korur?",
      options: [
        "İzin anlatısı zorunluluk ve ihtiyaç miktarıyla sınırlıdır.",
        "Bütün yasaklar her zaman kaldırılmıştır.",
        "İstenen her miktar koşulsuz uygundur.",
        "Alternatifin bulunmaması metinde yoktur.",
        "Mecburiyet hiç değerlendirilmemiştir.",
      ],
      reasons: [
        "Metin izin alanını açıkça iki koşulla sınırlar.",
        "Belirli istisna bütün yasakların kalktığını vermez.",
        "İhtiyaç miktarı sınırı bu iddiayı dışlar.",
        "Alternatif bulunmadığı doğrudan belirtilir.",
        "Zorunluluk anlatının açık koşuludur.",
      ],
      steps: [
        "İstisnanın gerekçesini zorunluluk olarak belirle.",
        "Miktar sınırını ihtiyaç kadar biçiminde ayır.",
        "Sonucu bu iki koşulu kaldırmadan ifade et.",
      ],
      strategy: "İstisnayı doğuran koşul ve miktarı ayrı denetle.",
      commonError:
        "Koşullu istisnayı her zaman geçerli sınırsız izne çevirmek.",
      check: "Seçenek ihtiyaç miktarı sınırını koruyor mu?",
      knowledge: ["Zaruret değerlendirmesi koşul ve ihtiyaç ölçüsünü içerir."],
    },
    {
      passage:
        "Bir iş sözleşmesi aylık ücreti ve çalışma süresini açıkça belirtiyor. İşveren ücreti zamanında ödüyor; rapor ise koruyucu donanımın sağlanmadığını açıkça yazıyor. İşveren ücret ödediği için güvenlik konusunda da bütün yükümlülüklerin yerine geldiğini savunuyor.",
      prompt: "Hangi ayrım gerekir?",
      options: [
        "Ücret ödemesi ile güvenli ortam sağlama ayrı yükümlülüklerdir.",
        "Ücret ödendiyse donanımın sağlandığı kesinleşir.",
        "Güvenlik raporu ücretin hiç ödenmediğini kanıtlar.",
        "Ücret bilgisi sözleşmede bulunmamaktadır.",
        "Çalışan güvenliği yalnız bağış miktarıyla ölçülür.",
      ],
      reasons: [
        "Bir yükümlülük yerine gelmişken diğeri açıkça eksik olabilir.",
        "Ödeme donanım verisini kendiliğinden değiştirmez.",
        "Raporda donanım eksikliği vardır; ödeme ise ayrı olarak verilmiştir.",
        "Sözleşmede ücretin açık olduğu söylenir.",
        "Bağış, güvenlik önleminin yerine geçtiği bir veri değildir.",
      ],
      steps: [
        "Ücretin ödendiği olumlu bilgiyi koru.",
        "Donanım sağlanmadığı olumsuz bilgiyi ayrıca koru.",
        "Ayrı yükümlülüklerin tek ödeme bilgisiyle tamamlanamayacağını seç.",
      ],
      strategy: "Her yükümlülüğü kendi somut kaydıyla değerlendir.",
      commonError:
        "Bir hakkın yerine gelmesini diğer bütün hakların tamamlanması saymak.",
      check: "Donanım hakkındaki açık kayıt seçenekte korunuyor mu?",
      knowledge: ["Ücret ve iş güvenliği ilişkili ama ayrı sorumluluklardır."],
    },
    {
      passage:
        "Bir çalışan kendisine verilen aracı özensiz kullanarak zarar verdiğini kabul ediyor. Aynı dosya ücret alacağının da ödenmediğini belirtiyor. Soru mahkeme kararı değil, iki fiilin iş ahlakı bakımından ayrı değerlendirilebilmesini soruyor.",
      prompt: "Hangi yaklaşım uygundur?",
      options: [
        "Emanet sorumluluğu ve ücret hakkını ayrı değerlendirmek.",
        "Araç zararı varsa ücret hakkını hiç yok saymak.",
        "Ücret ödenmediyse bütün araç zararlarını doğru saymak.",
        "İki açık kaydın birbirini mantıken yok ettiğini söylemek.",
        "İki olay için de hiçbir fiil verilmediğini savunmak.",
      ],
      reasons: [
        "Her iki fiil ve hak kendi kanıtıyla ele alınır.",
        "Bir kusur, ayrı hakkın hiç bulunmadığını göstermez.",
        "Bir hakkın ihlali başka zararı otomatik doğru yapmaz.",
        "İki farklı ihlal aynı olayda birlikte bulunabilir.",
        "Zarar verme ve ödememe açıkça belirtilmiştir.",
      ],
      steps: [
        "Çalışanın araçla ilgili kabulünü emanet sorumluluğuna bağla.",
        "Ödenmemiş ücreti ayrı hak olarak yaz.",
        "Birini diğerini silmek için kullanmadan iki fiili değerlendir.",
      ],
      strategy: "Hak sahibi olmayı başka fiilde kusursuzlukla özdeşleştirme.",
      commonError:
        "Bir tarafın kusurundan diğer bütün hak ve sorumlulukları silmek.",
      check: "Her iki açık fiile ayrı açıklama verdin mi?",
      knowledge: [
        "Çalışma hayatında ücret hakkı ve emaneti koruma ayrı ilişkiler taşır.",
      ],
    },
    {
      passage:
        "Bir görselin lisansı ücretsiz eğitim sunusunda, kaynak gösterilerek kullanılmasına açıkça izin veriyor. Ticari satış ve değiştirme için izin vermediği de yazılı. Öğretmen görseli değiştirmeden, kaynak belirterek ücretsiz ders sunusuna koyuyor.",
      prompt: "Bu dosyaya göre hangi sonuç desteklenir?",
      options: [
        "Verilen kullanım açıklanan izin koşullarına uyar.",
        "Lisans bütün ticari satışları serbest bırakır.",
        "Kaynak belirtme koşulu hiç verilmemiştir.",
        "Ücretsiz ders kullanımı açıkça yasaklanmıştır.",
        "Değiştirme yapılmadığı için izin kapsamı okunamaz.",
      ],
      reasons: [
        "Ücretsiz eğitim, atıf ve değiştirmeme koşulları olayda birlikte sağlanmıştır.",
        "Ticari satış için izin verilmediği açıkça yazılıdır.",
        "Kaynak gösterme lisansın açık koşuludur.",
        "Bu kullanım lisansın izin verdiği alan olarak tanımlanır.",
        "Koşulların sağlanması kapsam değerlendirmesini mümkün kılar.",
      ],
      steps: [
        "Lisansın izin verdiği kullanım türünü ücretsiz eğitim olarak belirle.",
        "Olayda atıf yapıldığını ve görselin değiştirilmediğini doğrula.",
        "Yalnız bu kapsamda uyumu seç; ticari satış izni ekleme.",
      ],
      strategy:
        "Gerçek kullanımın her özelliğini verilen lisans maddesiyle karşılaştır.",
      commonError: "Sınırlı açık izni bütün kullanım türlerine genişletmek.",
      check: "Cevap yalnız lisansın izin verdiği kullanım için mi geçerli?",
      knowledge: [
        "Dijital kullanım yetkisi lisansın kapsam ve koşullarıyla değerlendirilir.",
      ],
    },
    {
      passage:
        "Bir işyeri kaydı aynı çalışanın haftalar boyunca sistemli biçimde aşağılandığını ve dışlandığını bildiriyor. Ders notu mobbingi çalışma ortamında sistemli psikolojik yıldırmayla ilişkilendiriyor. Kayıt yalnız tek bir karşılıklı görüş ayrılığından söz etmiyor.",
      prompt: "Verilen kayıt hangi kavramla en doğrudan ilişkilidir?",
      options: ["Mobbing", "Gönüllü bağış", "İcma", "İstihale", "Kan bağışı"],
      reasons: [
        "İşyeri, süreklilik ve sistemli yıldırma unsurları tanımla uyuşur.",
        "Metin gönüllü maddi yardımı değil yıldırmayı anlatır.",
        "Dinî hüküm üzerinde âlimler ittifakı söz konusu değildir.",
        "Maddenin niteliğinde dönüşüm verilmemiştir.",
        "Tedavi için kan desteği bu olayın konusu değildir.",
      ],
      steps: [
        "Ortamın işyeri olduğunu belirle.",
        "Haftalar süren sistemli aşağılama ve dışlama verilerini topla.",
        "Bu özellikleri nottaki mobbing tanımıyla ilişkilendir.",
      ],
      strategy: "Tanımın ortam ve süreklilik unsurlarını birlikte bul.",
      commonError:
        "Sistemli yıldırmayı yalnız fikir ayrılığı diye adlandırıp verilen veriyi silmek.",
      check: "Metinde süreklilik gösteren hangi davranışlar var?",
      knowledge: [
        "Mobbing iş ortamındaki sistemli psikolojik yıldırmayla ilişkilidir.",
      ],
    },
    {
      passage:
        "Bir öğrenci hafta sonu uzun süre oyun oynadığını söylüyor. Uykusu, eğitimi, ilişkileri ve kontrol kaybı hakkında bilgi verilmiyor. Ders notu sık kullanımla klinik bağımlılık tanısının aynı veri olmadığını belirtiyor.",
      prompt: "Hangi değerlendirme kanıt sınırına uygundur?",
      options: [
        "Bu kayıt tek başına kesin klinik bağımlılık tanısı vermez.",
        "Kesin bağımlıdır; başka bilgi gerekmez.",
        "Kesinlikle hiçbir risk bulunmadığı kanıtlanmıştır.",
        "Eğitiminin aksadığı açıkça verilmiştir.",
        "Her oyun kullanımı kumardır.",
      ],
      reasons: [
        "Sıklık verilmiş; tanıya ilişkin diğer bilgi ve değerlendirme verilmemiştir.",
        "Metin tek kaydın tanıyla özdeş olmadığını söyler.",
        "Tanı kanıtlanmaması bütün risklerin yokluğunu kanıtlamaz.",
        "Eğitim etkisi hakkında bilgi verilmediği belirtilir.",
        "Oyun ve kumar koşulları aynı şey olarak verilmemiştir.",
      ],
      steps: [
        "Kesin verilenin hafta sonu uzun kullanım olduğunu yaz.",
        "İşlevsellik ve kontrol kaybı alanlarının bilinmediğini ayır.",
        "Bu eksiklikte kesin tanı veya kesin risksizlik ekleme.",
      ],
      strategy: "Sıklık bilgisini tanı ve işlev kaybından ayır.",
      commonError:
        "Tek kullanım süresinden kişinin klinik durumunu kesinleştirmek.",
      check:
        "Cevabın tanı yokluğu yerine bütün risklerin yokluğunu mu söylüyor?",
      knowledge: [
        "Bağımlılık değerlendirmesi yalnız kullanım sıklığına indirgenmez.",
      ],
    },
    {
      passage:
        "Bir hastane ders dosyası ölüm nedenini araştırmak amacıyla vefat edenin bedeni üzerinde tıbbi inceleme yapıldığını söylüyor. Organın başka hastaya aktarılması veya yaşamın sonlandırılması anlatılmıyor.",
      prompt: "İşlemin adı hangisidir?",
      options: [
        "Otopsi",
        "Organ nakli",
        "Ötenazi",
        "Kan bağışı",
        "Estetik ameliyat",
      ],
      reasons: [
        "Vefat sonrası ölüm nedeni için yapılan tıbbi incelemedir.",
        "Başka kişiye organ aktarımı açıkça verilmemiştir.",
        "İşlem yaşamı sonlandırma olarak anlatılmıyor.",
        "Tedavi için kan verme olayı yoktur.",
        "Görünüşü veya işlevi düzeltmek için yapılan ameliyat anlatılmıyor.",
      ],
      steps: [
        "İşlemin vefattan sonra yapıldığını belirle.",
        "Amacı ölüm nedenini araştırmaktır.",
        "Bu amaç ve zaman birlikte otopsi kavramını verir.",
      ],
      strategy: "İşlemin amacını ve zamanını birlikte kullan.",
      commonError:
        "Beden üzerinde yapılan bütün tıbbi işlemleri tek kavram saymak.",
      check: "İşlem başka kişiye aktarım mı, ölüm nedeni araştırması mı?",
      knowledge: [
        "Otopsi ölüm ve hastalık nedenlerini araştıran tıbbi incelemedir.",
      ],
    },
    {
      passage:
        "Bir organ nakli metni alıcının rızasını ve tedavi amacını açıkça veriyor. Canlı vericinin zarar görmemesi ve izni hakkında bilgi bulunmuyor. Soru yalnız yazılan koşulların kapsamını soruyor.",
      prompt: "Hangi sonuç bu kapsamı aşar?",
      options: [
        "Alıcı rızası bulunduğu için vericinin bütün şartları da sağlanmıştır.",
        "Tedavi amacı metinde yer alır.",
        "Alıcı rızası açıkça verilmiştir.",
        "Verici koşulları hakkında ek bilgi gerekir.",
        "İki kişinin koşulları ayrı incelenebilir.",
      ],
      reasons: [
        "Bir kişinin rızası diğer kişinin izin ve zarar koşullarını kanıtlamaz.",
        "Tedavi amacı ilk cümlede açıkça vardır.",
        "Rıza bilgisi doğrudan alıcıya aittir.",
        "Metnin eksik bıraktığı alan için uygun sınır budur.",
        "Farklı kişiler ve koşullar ayrıştırılmalıdır.",
      ],
      steps: [
        "Olumsuz kökün veriyi aşan sonucu istediğini belirle.",
        "Verilen rızanın alıcıya ait olduğunu yaz.",
        "Bu bilgiyi vericinin bütün koşullarına taşıyan seçeneği seç.",
      ],
      strategy: "Her rıza ve zarar koşulunu ait olduğu kişiye bağla.",
      commonError: "Alıcı ile vericiyi tek rıza değişkeni gibi değerlendirmek.",
      check: "Hangi kişinin izni gerçekten yazılı?",
      knowledge: ["Organ naklinde alıcı ve verici koşulları ayrı ele alınır."],
    },
    {
      passage:
        "En’âm 151’in verilen özeti Allah’a ortak koşmama, anne babaya iyilik ve canın dokunulmazlığı mesajlarını içeriyor. Soru bu kısa özetten hangi ayrıntının çıkarılamayacağını soruyor; başka bir hukuk veya sağlık metni verilmemiştir.",
      prompt: "Hangi seçenek özetin doğrudan kapsamı dışındadır?",
      options: [
        "Her çağdaş sağlık işleminin teknik ve hukuki bütün koşulları açıklanmıştır.",
        "İnançla ilgili bir ilke vardır.",
        "Aileye karşı bir iyilik yükümlülüğü vardır.",
        "Yaşamın korunması vurgulanır.",
        "Birden fazla ahlaki alan birlikte anılır.",
      ],
      reasons: [
        "Kısa genel mesajlar bütün teknik işlem ve hukuk ayrıntılarını vermez.",
        "Ortak koşmama inanç alanına ilişkindir.",
        "Anne babaya iyilik doğrudan özette vardır.",
        "Can dokunulmazlığı yaşamın korunmasıyla ilişkilidir.",
        "Üç farklı alan özette birlikte listelenir.",
      ],
      steps: [
        "Kökün kapsam dışı ayrıntıyı aradığını belirle.",
        "Özette inanç, aile ve can mesajlarını ayrı göster.",
        "Bütün teknik sağlık koşullarının açıklanması iddiası bu genel özeti aşar.",
      ],
      strategy:
        "Genel ilke ile teknik ayrıntı listesinin ölçeğini karşılaştır.",
      commonError:
        "Ayetin genel mesajından bütün bireysel tıp ve hukuk şartlarını üretmek.",
      check: "Özette hangi teknik işlem şartı gerçekten yazılı?",
      knowledge: [
        "En’âm 151 inanç, aile sorumluluğu ve canın korunması mesajları taşır.",
      ],
    },
    {
      passage:
        "En’âm 152’nin verilen bölümünde ölçüyü ve tartıyı doğru yapmak ile yakınlar hakkında bile adil konuşmak birlikte anılıyor. Bir rapor yalnız ilk mesajın ticari ölçüyle ilişkisini açıklıyor, ikincisini hiç değerlendirmiyor.",
      prompt: "Raporun tamamlanması için hangi alan ayrıca ele alınmalıdır?",
      options: [
        "Tanıklık ve sözde tarafsızlık",
        "Ürünün coğrafi menşei",
        "Dört kapının sıralaması",
        "Törenin müzik düzeni",
        "Bir manastırın yapı biçimi",
      ],
      reasons: [
        "Yakınlar hakkında adil konuşma söz ve tarafsızlık alanını gerektirir.",
        "Menşe verilen ikinci mesajın karşılığı değildir.",
        "Manevi kapı şeması bu ayet bölümünün konusu değildir.",
        "Müzik düzeni iki mesajda yer almaz.",
        "Manastır mimarisi bu raporun eksik mesajı değildir.",
      ],
      steps: [
        "İlk mesajın raporda zaten ölçüyle eşleştirildiğini belirle.",
        "Eksik bırakılan mesaj yakınlar hakkında adil konuşmadır.",
        "Bu yüzden sözde tarafsızlık alanını ekleyerek iki mesajı koru.",
      ],
      strategy: "Açıklanan mesajı ve eksik mesajı ayrı işaretle.",
      commonError:
        "Adalet başlığını yalnız tartıya daraltıp sözde adaleti atlamak.",
      check: "Eklediğin alan ikinci açık mesajı karşılıyor mu?",
      knowledge: [
        "En’âm 152 ölçüde adaletin yanında yakınlar hakkında bile adil sözü vurgular.",
      ],
    },
  ],
  [
    {
      passage:
        "Bir araştırma Hint alt kıtasında Hinduizm, Budizm ve başka dinî toplulukların birlikte bulunduğunu açıklıyor. İncelemeci buna rağmen yalnız Hindistan’da yaşıyor bilgisinden bir kişinin Hindu olduğunu kesinleştiriyor. Kişinin inancı ayrıca verilmemiştir.",
      prompt: "İncelemecinin ilk hatası nedir?",
      options: [
        "Coğrafi bilgiyi tek başına kişisel dinî aidiyetin kanıtı sayması.",
        "Bölgede birden fazla din bulunduğunu okuması.",
        "Kişinin ikamet bilgisini verilen veri kabul etmesi.",
        "İnanç hakkında ek bilgi araması.",
        "Yer ile din kavramını farklı tutması.",
      ],
      reasons: [
        "Çok dinli bölge bilgisi böyle bir tekil kesinliği sağlamaz.",
        "Birden fazla topluluk araştırmada açıkça verilmiştir.",
        "İkamet bilgisi gerçekte verilen veridir; hata bunun kapsamını aşmaktır.",
        "Ek bilgi aramak bu eksikliğe uygun yaklaşımdır.",
        "Yapılması gereken ayrım budur; hata değildir.",
      ],
      steps: [
        "Verilenin kişinin yaşadığı ülke olduğunu belirle.",
        "Aynı bölgede farklı dinlerin bulunduğu bilgisini koru.",
        "Ülkeden tek kişinin dinine kesin geçiş kanıtı aşar.",
      ],
      strategy: "Coğrafya ile kişisel aidiyeti ayrı veri alanları say.",
      commonError:
        "Bir ülkede yaşamakla tek bir dine mensup olmayı özdeşleştirmek.",
      check: "Kişinin kendi inancı hakkında hangi veri gerçekten var?",
      knowledge: ["Bir coğrafyada birden fazla din ve gelenek bulunabilir."],
    },
    {
      passage:
        "Bir dinler tarihi notu Hinduizmi Hint alt kıtasında uzun süreçte oluşan, farklı metin ve düşünce okullarını içeren gelenekler bütünü diye tanımlıyor. Not tek tarihsel kurucu vermiyor.",
      prompt: "Hangi özet bu çerçeveye uygundur?",
      options: [
        "Tek kurucuya indirgenmeyen tarihsel çeşitlilik vardır.",
        "Bütün okullar tek tarihte bir kişinin emriyle kurulmuştur.",
        "Not hiçbir metin geleneği bulunmadığını söyler.",
        "Hinduizm yalnız bir ibadet binasının adıdır.",
        "Çeşitlilik anlatıldığı için tarihsel oluşum yoktur.",
      ],
      reasons: [
        "Uzun süreç ve farklı okullar notun açık iki özelliğidir.",
        "Tek kişi ve tek tarih iddiası notta bulunmaz.",
        "Not metin ve düşünce okullarını açıkça içerir.",
        "Hinduizm bu notta gelenekler bütünüdür; bina değildir.",
        "Çeşitlilik tarihsel oluşumu ortadan kaldırmaz.",
      ],
      steps: [
        "Notun zaman ifadesini uzun süreç olarak belirle.",
        "Birden fazla okul ve metin bilgisi verildiğini gör.",
        "Bu iki veriyi tek kurucu eklemeden tarihsel çeşitlilikle özetle.",
      ],
      strategy: "Süreç, kurucu ve çeşitlilik bilgilerini ayrı oku.",
      commonError:
        "Her dinin mutlaka tek kurucu ve tek başlangıç yılı gerektirdiğini varsaymak.",
      check: "Seçeneğin notta verilmeyen bir kurucu ekliyor mu?",
      knowledge: [
        "Hinduizm tek tarihsel kurucuya dayandırılmaz; farklı gelenekleri içerir.",
      ],
    },
    {
      passage:
        "Bir katalog Vedaları Sanskritçe metin derlemeleri arasında, puja uygulamasını ibadet pratiği arasında, Ganj’ı kutsal coğrafya arasında listeliyor. Öğrenci yalnız yazılı kaynak türündeki satırı seçmek istiyor.",
      prompt: "Hangi kayıt istenen türe girer?",
      options: ["Vedalar", "Puja", "Ganj Nehri", "Mandir", "Puja sunusu"],
      reasons: [
        "Katalogda metin derlemesi olarak tanımlanmıştır.",
        "Puja verilen sınıflamada ibadet pratiğidir.",
        "Ganj bu katalogda kutsal coğrafya kaydıdır.",
        "Mandir tapınak veya mekân adıdır.",
        "Sunulan nesne yazılı metin derlemesi değildir.",
      ],
      steps: [
        "İstenen türün yazılı kaynak olduğunu belirle.",
        "Katalogda bu türün karşılığı Vedalardır.",
        "Ritüel, coğrafya ve mekân seçeneklerini farklı türlerde tut.",
      ],
      strategy: "Kavramı bildiğin kadar hangi türe ait olduğunu da denetle.",
      commonError: "Kaynak, ritüel ve kutsal yeri aynı katalog türü saymak.",
      check: "Yanıtın bir metin derlemesi mi?",
      knowledge: ["Vedalar Hindu metin geleneğinin temel derlemelerindendir."],
    },
    {
      passage:
        "Bir açıklama Vişnu’nun dünya düzenindeki bozulmayı gidermek için yeryüzünde bedenlenerek görünmesini anlatıyor. Sözlük avatarı bu bağlama, samsarayı doğum-ölüm-yeniden doğum döngüsüne, karmayı eylem-sonuç ilişkisine bağlıyor.",
      prompt: "Açıklanan somut eylemi hangi terim adlandırır?",
      options: ["Avatar", "Samsara", "Karma", "Vihara", "Li"],
      reasons: [
        "Vişnu’nun bedenlenerek görünmesi verilen avatar tanımıdır.",
        "Samsara genel yeniden doğum döngüsünü anlatır; verilen özel tanrısal iniş değildir.",
        "Karma eylemin etik sonuç ilişkisiyle ilgilidir.",
        "Vihara Budist mekânla ilişkilidir.",
        "Li Konfüçyan uygun davranış ve ritüel kavramıdır.",
      ],
      steps: [
        "Açıklamadaki tanrısal kişiyi Vişnu olarak belirle.",
        "Eylem bedenlenerek görünmektir; sözlük bunu avatarla eşleştirir.",
        "Döngü ve etik sonuç terimlerini bu özel eylemle karıştırma.",
      ],
      strategy: "Kişi ve eylemi birlikte sözlük tanımına bağla.",
      commonError:
        "Her bedenlenme anlatısını bağlamdan bağımsız samsara saymak.",
      check: "Cevap Vişnu’nun özel eylemini mi adlandırıyor?",
      knowledge: [
        "Avatar özellikle Vişnu’nun bedenlenerek görünmesiyle ilişkilidir.",
      ],
    },
    {
      passage:
        "İki sözlük aynı dharma kelimesini farklı bağlamlarda açıklıyor: H kartında görev ve doğru yaşam; B kartında Buda’nın öğretisi. Her kart kendi kullanım bağlamını açıkça belirtiyor.",
      prompt: "Hangi yaklaşım bu iki kaydı doğru işler?",
      options: [
        "Anlamı kartın bağlamıyla birlikte okumak.",
        "İki karttan birini yalnız aynı sözcük geçtiği için yok saymak.",
        "Dharma her kullanımda yalnız mekândır demek.",
        "B kartının Buda’dan hiç söz etmediğini söylemek.",
        "Ortak yazılışın bütün öğretileri özdeşleştirdiğini savunmak.",
      ],
      reasons: [
        "Aynı terimin verilen bağlama göre farklı vurguları korunur.",
        "Yazılış ortaklığı bağlama dayalı iki tanımı geçersiz kılmaz.",
        "Kartlar mekân değil görev ve öğreti anlamlarını verir.",
        "B kartı Buda öğretisini açıkça tanımlar.",
        "Ortak kelime bütün doktrinlerin aynı olduğunu kanıtlamaz.",
      ],
      steps: [
        "H kartındaki görev anlamını ayrı yaz.",
        "B kartındaki Buda öğretisi anlamını ayrı yaz.",
        "Aynı sözcüğün iki bağlamını koruyan yaklaşımı seç.",
      ],
      strategy: "Ortak terimin yanında verilen gelenek ve işlevi oku.",
      commonError: "Bir terimin tek çevirisini bütün geleneklere zorlamak.",
      check: "Cevap iki kartın açık bağlamını da koruyor mu?",
      knowledge: [
        "Dharma farklı Hint geleneklerinde farklı vurgu ve anlamlarla kullanılır.",
      ],
    },
    {
      passage:
        "Bir tarih metni varna şemasını brahmin, kşatriya, vaişya ve şudra adlarıyla açıklıyor. Aynı metin bu tarihsel sınıflandırmayı anlatmanın günümüzde doğuştan eşitsizliği haklı görmek anlamına gelmediğini belirtiyor.",
      prompt: "Hangi yorum metnin iki yönünü de korur?",
      options: [
        "Tarihsel düzen açıklanabilir; bu açıklama ayrımcılığı onaylamak değildir.",
        "Şema anlatıldığı için bütün ayrımcılık haklıdır.",
        "Her modern Hindu kişinin aynı uygulamayı benimsediği kanıtlanmıştır.",
        "Metin hiçbir tarihsel sınıflandırma vermemiştir.",
        "Dört ad yalnız dört nehrin ismidir.",
      ],
      reasons: [
        "Tarihsel betimleme ile ahlaki onay birbirinden ayrılır.",
        "Metin bu özdeşliği açıkça reddeder.",
        "Modern bireylerin tutumları bu şemadan tek tek çıkarılamaz.",
        "Dört sınıf adı doğrudan verilmiştir.",
        "Adlar metinde toplumsal sınıflandırma bağlamındadır.",
      ],
      steps: [
        "Şemanın tarihsel toplumsal düzeni anlattığını belirle.",
        "Metnin açıklama ve onayı ayıran cümlesini koru.",
        "Betimlemeden bütün modern kişiler ve ahlaki haklılık sonucu üretme.",
      ],
      strategy:
        "Tarihsel açıklama ile güncel değer yargısını ayrı değerlendir.",
      commonError:
        "Bir düzenin ders kitabında anlatılmasını o düzenin onayı saymak.",
      check: "Metin hangi genellemeyi açıkça sınırlıyor?",
      knowledge: [
        "Bir tarihsel sistemi betimlemek onu haklı görmek anlamına gelmez.",
      ],
    },
    {
      passage:
        "Bir gezi notu mandiri Hindu tapınağı, pujayı bu mekânda veya evde yapılabilen ibadet pratiği diye açıklıyor. Aynı notta evde puja yapıldığı da açıkça kayıtlı.",
      prompt: "Bu veriden hangi sonuç çıkar?",
      options: [
        "Puja yalnız tapınak mekânına bağlı olmak zorunda değildir.",
        "Puja bir tapınak binasının tek adıdır.",
        "Evde yapılan uygulama notta bulunmamaktadır.",
        "Mandir bir Budist topluluğun adıdır.",
        "Mekân adı ile ritüel adı her zaman aynıdır.",
      ],
      reasons: [
        "Evdeki puja kaydı mekânın yalnız tapınakla sınırlı olmadığını gösterir.",
        "Not pujayı uygulama, mandiri mekân diye ayırır.",
        "Evde yapıldığı ikinci cümlede doğrudan verilmiştir.",
        "Mandir burada Hindu tapınağıdır; sangha gibi topluluk değildir.",
        "Verilen iki tanım bu özdeşliği desteklemez.",
      ],
      steps: [
        "Mandir ve pujanın türlerini mekân ve uygulama olarak ayır.",
        "Evde puja kaydının açık olduğunu belirle.",
        "Bu tek kayıt bile yalnız tapınakta yapılır iddiasını dışlar.",
      ],
      strategy: "Bir yalnızlık iddiasını açık karşı örnekle kontrol et.",
      commonError:
        "Ritüelin bir mekânda yapılmasını yalnız o mekânda yapılabilir saymak.",
      check: "Evdeki uygulama hangi genellemeye karşı örnek?",
      knowledge: [
        "Puja uygulama; mandir mekândır ve puja evde de yapılabilir.",
      ],
    },
    {
      passage:
        "Bir sergide Om işaretinin Hindu geleneklerinde kutsal heceyle ilişkisi açıklanıyor. Ziyaretçinin çantasında aynı şekil var; ziyaretçinin inancına ilişkin başka beyan bulunmuyor.",
      prompt: "Hangi çıkarım veriyi aşmaz?",
      options: [
        "Sembolün öğreti bağı bilinir; ziyaretçinin kişisel inancı bu tek veriden kesinleşmez.",
        "Şekli taşıyan herkesin Hindu olduğu kesinleşir.",
        "Om yalnız bir dağın coğrafi adıdır.",
        "Ziyaretçi kesinlikle hiçbir dine inanmıyordur.",
        "Sembolün sergideki açıklaması kişiye ait inanç beyanıdır.",
      ],
      reasons: [
        "Öğretiyle sembol ilişkisi ve kişisel aidiyet farklı iddialardır.",
        "Sembolü kullanma kişisel inancın yeterli kanıtı değildir.",
        "Sergi işareti kutsal heceyle ilişkilendirir.",
        "İnanç yokluğu da bu gözlemden çıkarılamaz.",
        "Serginin açıklaması ziyaretçinin kendi beyanı değildir.",
      ],
      steps: [
        "Sergideki bilginin sembole ait olduğunu belirle.",
        "Ziyaretçiye ait tek verinin çantadaki şekil olduğunu ayır.",
        "Sembolik ilişkiyi koru ama kişinin inancını kesinleştirme.",
      ],
      strategy: "Nesne hakkındaki bilgi ile kişi hakkındaki iddiayı ayır.",
      commonError: "Sembol kullanımını kişinin bütün inanç açıklaması saymak.",
      check: "Kişinin kendi beyanı gerçekten verilmiş mi?",
      knowledge: [
        "Kutsal sembol bilgisi kişisel aidiyeti tek başına kesinleştirmez.",
      ],
    },
    {
      passage:
        "Bir sözlük Siddhartha Gautama’nın Budizmle ilişkili tarihsel kişi olduğunu, Buda sözcüğünün aydınlanmış veya uyanmış anlamında bir unvan olduğunu açıklıyor. Metin bütün Budist geleneklerin Buda’yı yaratıcı tanrı saydığını ileri sürmüyor.",
      prompt: "Hangi ifade sözlüğe uygundur?",
      options: [
        "Buda verilen bağlamda aydınlanmayı anlatan unvandır.",
        "Buda bu sözlükte yalnız bir nehir adıdır.",
        "Bütün Budist geleneklerde aynı yaratıcı tanrı hükmü kanıtlanmıştır.",
        "Gautama adı sözlükte geçmemektedir.",
        "Unvan bilgisi kişiyle hiçbir ilişki taşımaz.",
      ],
      reasons: [
        "Aydınlanmış veya uyanmış anlamı sözlükte doğrudan verilmiştir.",
        "Sözcük burada nehir değil kişiyle ilişkili unvandır.",
        "Sözlük bu evrensel iddiayı ileri sürmez.",
        "Kişi adı ilk cümlede açıkça vardır.",
        "Unvan verilen tarihsel kişiyle ilişkilendirilmiştir.",
      ],
      steps: [
        "Kişi adıyla unvanı iki ayrı alan olarak belirle.",
        "Buda unvanının açıklanan anlamını aydınlanmış olarak oku.",
        "Bu anlamdan verilmemiş evrensel yaratıcı tanrı iddiası çıkarma.",
      ],
      strategy: "Unvanın tanımıyla tanrı anlayışını aynı soru sayma.",
      commonError:
        "Aydınlanmış unvanını bütün ekollerde yaratıcı tanrı hükmüne çevirmek.",
      check: "Yanıtın sözlükteki unvan anlamını koruyor mu?",
      knowledge: ["Buda aydınlanmış veya uyanmış anlamlı unvandır."],
    },
    {
      passage:
        "Bir Budist öğreti şeması dört satır veriyor: ıstırap vardır; bağlanma ve doymak bilmeyen arzu anlamındaki susuzluk (tanhâ) ıstırabın kaynağıdır; ıstırabın sona ermesi mümkündür; Sekiz Aşamalı Yol bu sona erişe götüren yöntemdir. Soru yalnız kaynak satırını soruyor.",
      prompt: "Hangi bilgi istenen işlevdedir?",
      options: [
        "Bağlanma ve susuzluğun ıstırabın nedeni olarak verilmesi.",
        "Yolun yöntem olarak açıklanması.",
        "Sona ermenin mümkün oluşu.",
        "Istırabın varlığının saptanması.",
        "Şemanın dört satırdan oluşması.",
      ],
      reasons: [
        "Neden veya kaynak işlevi ikinci satırda bu içerikle verilir.",
        "Bu dördüncü satırın yöntem işlevidir; neden satırı değildir.",
        "Bu üçüncü satırın imkân bildiren işlevidir.",
        "Bu ilk satırın sorun saptamasıdır.",
        "Satır sayısı ıstırabın kaynağını adlandırmaz.",
      ],
      steps: [
        "İstenen işlevin kaynak veya neden olduğunu işaretle.",
        "Şemada bağlanma kaynak olarak doğrudan adlandırılmıştır.",
        "Sorun, imkân ve yöntem satırlarını nedenin yerine koyma.",
      ],
      strategy:
        "Dört satırın problem, neden, imkân ve yöntem işlevlerini ayır.",
      commonError: "Çözüm yolunu sorunun nedeniyle aynı satır saymak.",
      check: "Seçtiğin bilgi neden mi, yöntem mi bildiriyor?",
      knowledge: ["Dört Yüce Hakikat farklı ama ilişkili işlevler taşır."],
    },
    {
      passage:
        "Ders kartı Sekiz Aşamalı Yolu doğru anlayış, niyet, konuşma, davranış, geçim, çaba, dikkat ve yoğunlaşma olarak listeliyor. Soru bu listeyi esas alıyor.",
      prompt: "Aşağıdakilerden hangisi verilen listenin bir öğesi değildir?",
      options: [
        "Doğduğu kastı zorunlu olarak değiştirmek",
        "Doğru geçim",
        "Doğru konuşma",
        "Doğru çaba",
        "Doğru dikkat",
      ],
      reasons: [
        "Kast değiştirme listedeki sekiz bileşenden biri olarak verilmemiştir.",
        "Geçim açıkça listede yer alır.",
        "Konuşma açıkça listede yer alır.",
        "Çaba açıkça listede yer alır.",
        "Dikkat açıkça listede yer alır.",
      ],
      steps: [
        "Olumsuz kökün liste dışındaki öğeyi istediğini belirle.",
        "Geçim, konuşma, çaba ve dikkati listede ayrı ayrı doğrula.",
        "Kast değiştirme koşulu bulunmadığı için onu seç.",
      ],
      strategy: "Her seçeneği verilen sekiz öğeyle tek tek karşılaştır.",
      commonError:
        "Olumsuz kökte listedeki doğru öğelerden birini işaretlemek.",
      check: "Seçtiğin ifade sekizli listede gerçekten var mı?",
      knowledge: [
        "Sekiz Aşamalı Yol ahlaki ve zihinsel eğitim bileşenleriyle anlatılır.",
      ],
    },
    {
      passage:
        "Bir Budist açıklama varlıkların koşullara bağlı ve geçici oluşunu, anattayı değişmez bağımsız öz-benliğin bulunmadığı yaklaşımıyla anlatıyor. Açıklama eylemlerin hiçbir sonuç taşımadığını söylemiyor.",
      prompt: "Hangi özet bu metne uygundur?",
      options: [
        "Sabit öz-benlik reddi, bütün davranış sonuçlarının yokluğu demek değildir.",
        "Anatta değişmez ruhun her bağlamda zorunlu olduğunu kanıtlar.",
        "Bütün fiillerin sonucu olmadığı doğrudan yazılmıştır.",
        "Geçicilik metinde hiç anılmamıştır.",
        "Anatta bir ibadet binasının adıdır.",
      ],
      reasons: [
        "Metin benlik anlayışıyla eylem sonuçlarını özdeşleştirmemiştir.",
        "Tanım değişmez bağımsız öz-benliğin reddini açıklar.",
        "Açıklama bunu söylemediğini özellikle belirtir.",
        "Geçicilik ilk cümlenin doğrudan bilgisidir.",
        "Anatta burada öğreti kavramıdır; bina değildir.",
      ],
      steps: [
        "Anattanın verilmiş tanımını değişmez öz-benlik reddi olarak belirle.",
        "Bütün eylem sonuçlarının yokluğunun verilmediğini koru.",
        "Bir kavramdan ayrı bir iddiayı zorunlu sonuç saymayan özeti seç.",
      ],
      strategy: "Benlik yaklaşımı ile etik sonuç iddiasının farklılığını koru.",
      commonError:
        "Değişmez benliği reddetmeyi bütün sorumlulukların yokluğu saymak.",
      check: "Metin hangi ikinci iddiayı açıkça ileri sürmüyor?",
      knowledge: [
        "Anatta değişmez bağımsız öz-benliğin bulunmadığı yaklaşımla ilişkilidir.",
      ],
    },
    {
      passage:
        "Bir karşılaştırma notu mokşayı Hindu, nirvanayı Budist öğreti çerçevesinde özgürleşmeyle ilişkilendiriyor. İki kavramın benzer temalar taşısa da benlik ve yol açıklamalarının bütünüyle aynı olmadığını belirtiyor.",
      prompt: "Hangi ifade bu karşılaştırmaya uygundur?",
      options: [
        "Ortak özgürleşme teması bütün doktrinlerin özdeşliğini gerektirmez.",
        "İki kavram bütün ayrıntılarıyla tek terimdir.",
        "Nirvana yalnız bir pazar yerinin adıdır.",
        "Mokşa bu notta Çin kökenli vergi türüdür.",
        "Benzer tema varsa öğreti çerçevesini okumak gereksizdir.",
      ],
      reasons: [
        "Not ortak temayı korurken doktrin farkını da açıkça belirtir.",
        "Not bütün içeriklerin aynı olmadığını söyler.",
        "Nirvana burada Budist özgürleşme kavramıdır.",
        "Mokşa notta Hindu öğreti çerçevesine yerleştirilir.",
        "Çerçeve farkı karşılaştırmanın temel bilgisidir.",
      ],
      steps: [
        "İki kavramın ortak temasını özgürleşme olarak belirle.",
        "Notun benlik ve yol açıklamalarında fark tanıdığını gör.",
        "Benzerliği özdeşliğe çevirmeyen seçeneği seç.",
      ],
      strategy: "Ortak tema ile bütün içerik eşitliğini ayrı değerlendir.",
      commonError: "Benzer amacı aynı doktrinin değişmez iki adı saymak.",
      check: "Yanıt iki öğreti çerçevesini de koruyor mu?",
      knowledge: ["Mokşa ve nirvana farklı öğreti bağlamlarıyla öğrenilir."],
    },
    {
      passage:
        "Bir açıklama sanghayı Budist topluluk, viharayı manastır ve yaşam mekânıyla ilişkilendiriyor. Arşiv kaydı bir sanghanın yeni viharaya taşındığını bildiriyor.",
      prompt: "Hangi özet kayıtla uyumludur?",
      options: [
        "Topluluk yeni mekâna taşınmıştır.",
        "Bir bina yeni bir insan grubunun içine bina olarak dönüşmüştür.",
        "Sangha yalnız yazılı kitap adıdır.",
        "Vihara yalnız bir tanrısal kişi adıdır.",
        "Taşınma kaydı topluluğun varlığını reddeder.",
      ],
      reasons: [
        "Topluluk ve mekân türleri tanımlarla doğru eşleşir.",
        "Mekân değiştirme türlerin birbirine dönüşmesini gerektirmez.",
        "Sangha bu açıklamada topluluk olarak tanımlıdır.",
        "Vihara burada manastır ve yaşam mekânıdır.",
        "Taşınan topluluk kayıt tarafından açıkça verilmiştir.",
      ],
      steps: [
        "Sanghanın topluluk türünde olduğunu belirle.",
        "Viharanın mekân türünde olduğunu ayır.",
        "Taşınma fiilini topluluğun mekân değişimi olarak özetle.",
      ],
      strategy: "Eylemin öznesini ve yöneldiği mekânı türleriyle birlikte oku.",
      commonError: "Topluluk adı ile manastır adını eş anlam saymak.",
      check: "Taşınan şey insan topluluğu mu bina mı?",
      knowledge: ["Sangha topluluk; vihara mekândır."],
    },
    {
      passage:
        "Bir metin kılavuzu Tripitaka içindeki Vinaya bölümünü manastır disiplini, Sutta bölümünü söylev ve öğreti, Abhidhamma bölümünü doktrinin sistemli açıklamalarıyla ilişkilendiriyor. Araştırmacı yalnız topluluk disiplinine ilişkin bölümü arıyor.",
      prompt: "Kılavuza göre önce hangi bölüme bakmalıdır?",
      options: [
        "Vinaya Pitaka",
        "Sutta Pitaka",
        "Abhidhamma Pitaka",
        "Tao Te Ching",
        "Konuşmalar",
      ],
      reasons: [
        "Aranan disiplin işlevi kılavuzda Vinaya bölümüne bağlanır.",
        "Sutta verilen sınıflamada söylev ve öğretiyle ilişkilidir.",
        "Abhidhamma sistemli doktrin açıklamalarıyla ilişkilendirilmiştir.",
        "Taoist metin bu Tripitaka bölümünü karşılamaz.",
        "Konfüçyan metin verilen Budist bölümün adı değildir.",
      ],
      steps: [
        "Arananın bölüm adı ve disiplin işlevi olduğunu belirle.",
        "Kılavuz bu işlevi Vinaya ile açıkça eşleştirir.",
        "Diğer bölüm ve gelenek adlarını aynı kaynak türüymüş gibi birleştirme.",
      ],
      strategy: "Bölüm adını kılavuzda verilen işleviyle eşleştir.",
      commonError:
        "Aynı metin derlemesindeki bütün bölümlerin aynı işlevi taşıdığını sanmak.",
      check: "Disiplin hangi bölümün açık işleviydi?",
      knowledge: ["Vinaya Pitaka manastır disipliniyle ilişkilidir."],
    },
    {
      passage:
        "Bir Konfüçyan metin Tian kavramını gök ve ahlaki kozmik düzenle ilişkilendiriyor; yöneticinin sorumluluğunu bu bağlamda açıklıyor. Fiziksel havanın sıcaklığı veya atmosfer ölçümü yapılmıyor.",
      prompt: "Hangi yorum verilen bağlamı korur?",
      options: [
        "Tian burada yalnız meteorolojik ölçüm adı değildir.",
        "Metin yalnız günlük hava sıcaklığını ölçmektedir.",
        "Ahlaki düzen kavramı metinde hiç yoktur.",
        "Tian bu notta Budist manastır adıdır.",
        "Yönetici sorumluluğu ile metnin hiçbir bağı yoktur.",
      ],
      reasons: [
        "Kavramın ahlaki ve kozmik bağlamı fiziksel hava verisinden farklıdır.",
        "Soruda sıcaklık ölçümü yapılmadığı açıkça belirtilir.",
        "Ahlaki düzen ilk cümlede doğrudan vardır.",
        "Metin kavramı Konfüçyan gök ve düzen bağlamında kullanır.",
        "Yöneticinin sorumluluğu bu bağlamla açıkça ilişkilendirilmiştir.",
      ],
      steps: [
        "Tianın metindeki işlevini ahlaki kozmik düzen olarak belirle.",
        "Atmosfer ölçümü yapılmadığı bilgisini ayrı tut.",
        "Kavramı yalnız hava olayı terimine indirmeyen yorumu seç.",
      ],
      strategy: "Bir çevirinin metindeki anlamını konu bağlamıyla denetle.",
      commonError:
        "Gök sözcüğü geçen her metni yalnız meteoroloji verisi saymak.",
      check: "Yanıt metnin ahlaki boyutunu koruyor mu?",
      knowledge: [
        "Tian Konfüçyan bağlamda gök ve ahlaki kozmik düzenle ilişkilidir.",
      ],
    },
    {
      passage:
        "Bir Konfüçyan kaynak kartında Konuşmalar, Büyük Öğrenme, Orta Yol Doktrini ve Mensiyüs’ün kitabı Dört Kitap başlığı altında listeleniyor. İkinci bir kart Budist orta yol yaklaşımını aşırılıklar arasında denge bağlamında anlatıyor.",
      prompt: "Bu iki kart için hangi kontrol gereklidir?",
      options: [
        "Benzer orta yol sözünü kaynak ve öğreti bağlamıyla ayırmak.",
        "İki kartı yalnız ortak sözden aynı kitap saymak.",
        "Budist kartın Konfüçyüs tarafından yazıldığını varsaymak.",
        "Dört Kitap listesinden kaynak adlarını çıkarmak.",
        "Kartların farklı bağlam verdiğini inkâr etmek.",
      ],
      reasons: [
        "İlk kart koleksiyon ve metin adı; ikincisi farklı öğreti yaklaşımı verir.",
        "Ortak çeviri sözü iki farklı bağlamı özdeşleştirmez.",
        "Böyle bir yazarlık bilgisi kartlarda yoktur.",
        "Kaynak adları ilk kartın doğrudan bilgisidir.",
        "İki bağlam açıkça ayrı tanıtılır.",
      ],
      steps: [
        "İlk kartın Konfüçyan kaynak koleksiyonu olduğunu belirle.",
        "İkinci kartın Budist yaklaşımını ayrı tut.",
        "Ortak sözün kaynak özdeşliği kanıtı olmadığını seç.",
      ],
      strategy:
        "Benzer adların hangi koleksiyon veya öğretiye bağlandığını sor.",
      commonError: "Ad benzerliğinden metin ve doktrin özdeşliği çıkarmak.",
      check:
        "İlk kartta istenen bir kitap adı mı, ikinci kartta anlatılan bir yaklaşım mı?",
      knowledge: [
        "Konfüçyan Orta Yol Doktrini ile Budist orta yol farklı bağlamlardır.",
      ],
    },
    {
      passage:
        "Bir sergi kartı Laoziyi Taoist düşüncenin geleneksel öncüsü, Tao Te Chingi temel metinlerinden biri olarak anıyor. Kart Laozi’nin kesin doğum yılını vermediği gibi bütün yerel ritüellerin aynı olduğunu da söylemiyor.",
      prompt: "Hangi eşleştirme kartın verdiği ilişkiye uygundur?",
      options: [
        "Laozi – Taoizm – Tao Te Ching",
        "Konfüçyüs – Budizm – Vedalar",
        "Gautama – Konfüçyanizm – Divân-ı Hikmet",
        "Ahmed Yesevî – Hinduizm – Tripitaka",
        "Mevlânâ – Taoizm – Talmud",
      ],
      reasons: [
        "Kişi, gelenek ve metin karttaki sırayla eşleşir.",
        "Üç farklı bağlamın adları kartın ilişkisiyle uyuşmaz.",
        "Gautama, Konfüçyanizm ve Divân-ı Hikmet bu zinciri kurmaz.",
        "Verilen kişi ve metinler farklı geleneklere aittir.",
        "Mevlânâ ve Talmud karttaki Taoist ilişkiyi karşılamaz.",
      ],
      steps: [
        "Kartın kişi adını Laozi olarak belirle.",
        "Gelenek ve metin adını ayrı ayrı Taoizm ve Tao Te Ching olarak doğrula.",
        "Üçlü bağı koru; kartta bulunmayan kesin doğum yılı ekleme.",
      ],
      strategy: "Kişi, gelenek ve metnin üç bağlantısını ayrı doğrula.",
      commonError:
        "Bir doğru kelime bulunan karma zincirin bütününü doğru saymak.",
      check: "Seçtiğin üç adın her biri karttaki aynı bağa uyuyor mu?",
      knowledge: ["Laozi ve Tao Te Ching Taoist düşünceyle ilişkilidir."],
    },
    {
      passage:
        "Bir Çin düşüncesi kartı yin-yangı karşıt ama birbirini tamamlayan ögelerin ilişkisi diye açıklıyor. Kart bu iki ögenin ahlaken iyi ve kötü diye derecelendirilmediğini de belirtiyor.",
      prompt: "Hangi yorum karta aykırıdır?",
      options: [
        "Yin her koşulda ahlaken kötü, yang her koşulda ahlaken iyidir.",
        "İki öge arasında tamamlayıcı ilişki vardır.",
        "Karşıtlık ilişkiyi tümüyle ortadan kaldırmaz.",
        "Kart ahlaki derecelendirmeyi sınırlıyor.",
        "Sembol bir düşünsel ilişkiyi anlatıyor.",
      ],
      reasons: [
        "Kartın açıkça reddettiği koşulsuz ahlaki derecelendirmeyi yapar.",
        "Tamamlayıcılık kartta doğrudan verilmiştir.",
        "Karşıt ve tamamlayıcı olma birlikte tanımlanır.",
        "Ahlaken iyi-kötü ayrımı yapılmadığı açıkça belirtilir.",
        "Kart sembolik ilişkiyi açıklamaktadır.",
      ],
      steps: [
        "Olumsuz kökün karta aykırı yorumu istediğini belirle.",
        "Karttaki tamamlayıcılık ve ahlaki derecelendirmeme bilgilerini koru.",
        "Yini kötü ve yangı iyi diye koşulsuz yargılayan seçeneği seç.",
      ],
      strategy: "Karşıtlık ile ahlaki değer yargısını ayır.",
      commonError:
        "İki tamamlayıcı ögeyi iyi-kötü veya değerli-değersiz hiyerarşisine çevirmek.",
      check: "Seçenek kartın reddettiği hangi ölçüyü ekliyor?",
      knowledge: [
        "Yin-yang tamamlayıcı karşıtlıkla ilişkilidir; ahlaki iyi-kötü sıralaması değildir.",
      ],
    },
    {
      passage:
        "Kapalı bir sınıflandırma sorusunda iki aday vardır: Konfüçyanizm ve Taoizm. Tablo her ikisini Çin kökenli gösteriyor; Tao Te Ching metnini yalnız ikinci adayla ilişkilendiriyor. Dosya hem Çin kökeni hem Tao Te Ching verisini içeriyor.",
      prompt: "Bu tablonun sınırları içinde hangi aday desteklenir?",
      options: [
        "Taoizm",
        "Yalnız Konfüçyanizm",
        "İki adayın hiçbiri",
        "Her iki aday zorunlu olarak aynı ölçüde",
        "Dosyadaki bütün kişilerin tek dini olduğu sonucu",
      ],
      reasons: [
        "Ortak coğrafyaya ek özgül metin verisi ikinci adayı destekler.",
        "Tao Te Ching tablosu bu adaya bağlanmamıştır.",
        "Dosyadaki iki veri ikinci adayla birlikte uyuşur.",
        "Metin verisi iki aday arasında ayırıcıdır.",
        "Tablo bir sınıflandırma dosyasıdır; bütün kişilerin inancını ölçmez.",
      ],
      steps: [
        "Çin kökeninin iki aday için ortak olduğunu belirle.",
        "Tao Te Chingin tabloda yalnız Taoizmle eşleştiğini gör.",
        "İki veriyi birlikte kullanarak tablo sınırında Taoizmi seç.",
      ],
      strategy:
        "Ortak veriyle ayırıcı metin verisini farklı ağırlıkta değerlendir.",
      commonError:
        "Ortak coğrafyanın iki adayı sonsuza kadar ayıramayacağını sanmak.",
      check: "Sonuç yalnız verilen kapalı tablo için mi kuruluyor?",
      knowledge: ["Tao Te Ching Taoizmle ilişkili özgül metin verisidir."],
    },
  ],
];
const answerPositions025: number[][] = [
  [3, 4, 4, 1, 0, 2, 0, 2, 4, 3, 1, 3, 1, 4, 2, 0, 0, 3, 1, 2],
  [1, 4, 1, 3, 3, 0, 3, 2, 1, 2, 1, 2, 2, 4, 0, 3, 0, 0, 4, 4],
  [4, 3, 3, 4, 1, 0, 2, 3, 1, 4, 0, 0, 2, 3, 2, 2, 4, 1, 1, 0],
];
export const forge025HumanitiesTopics: Record<string, string> =
  Object.fromEntries(sourceGuides025.map((g) => [g.id, g.detail]));
export const forge025HumanitiesGuides: LessonGuide[] = sourceGuides025.map(
  ({ title: _title, detail: _detail, ...g }) => g,
);
export const forge025HumanitiesLessons: Lesson[] = sourceGuides025.map(
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
    questions: questionRows025[pack].map((q, i): Question => {
      const answer = answerPositions025[pack][i];
      const order = [0, 1, 2, 3, 4].map((j) => (j - answer + 5) % 5);
      return {
        id: `${g.id}-025-${i + 1}`,
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
export type HumanitiesScene025 = {
  title: string;
  context: string;
  nodes: { id: string; label: string; detail: string }[];
  links: { from: string; to: string; valid: boolean; evidence: string }[];
  result: string;
  explanation: string;
};
function bounded025(n: number, max: number) {
  if (!Number.isInteger(n) || n < 0 || n >= max)
    throw new RangeError("Seçim aralık dışında.");
  return n;
}
function flag025(b: boolean) {
  if (typeof b !== "boolean")
    throw new TypeError("Koşul doğru veya yanlış olmalı.");
  return b;
}
export const humanitiesDefaults025 = {
  record: 0,
  target: 0,
  detail: false,
  case: 0,
  first: 0,
  second: 0,
  third: 0,
  claim: 0,
  evidenceA: 0,
  evidenceB: 1,
  sameRecord: true,
  reason: "",
  reveal: false,
};
export const tasavvufTargets025 = [
  "Tören veya uygulama",
  "Mekân",
  "Kişi veya görev",
  "Süreklilik taşıyan bağ",
] as const;
type TasavvufRecord025 = {
  label: string;
  base: string;
  extra: string;
  known: (string | null)[];
  added: (string | null)[];
};
const tasavvufRecords025: TasavvufRecord025[] = [
  {
    label: "Mevlevi töreni",
    base: "Bir kayıtta Mevlevi semasının yapıldığı yazılı. Yer ve katılan kişinin görevi söylenmiyor.",
    extra:
      "Aynı olayın ek kaydı: Semazenler Konya’daki bir dergâhta yer alıyor.",
    known: ["Mevlevi seması", null, null, null],
    added: [null, "Dergâh", "Semazen", null],
  },
  {
    label: "Cemde ritüel",
    base: "Alevi-Bektaşi ceminde semah yapıldığı yazılı; binanın adı ve yönetici belirtilmiyor.",
    extra: "Aynı olayın ek kaydı: Cem cemevinde, dede yönetiminde yapılıyor.",
    known: ["Semah", null, null, null],
    added: [null, "Cemevi", "Dede", null],
  },
  {
    label: "Yol kardeşliği",
    base: "İki ailenin ömür boyu yol kardeşliği için ikrar verdiği yazılı. Mekân ve yöneten kişi belirtilmiyor.",
    extra:
      "Aynı olayın ek kaydı: Musahiplik cemi, cemevinde dede yönetiminde yapılıyor.",
    known: [null, null, null, "Musahiplik"],
    added: ["Musahiplik cemi", "Cemevi", "Dede", null],
  },
  {
    label: "Dua kaydı",
    base: "Alevi-Bektaşi geleneğinde gülbank duası okunduğu yazılı. Okuyan kişinin rolü ve mekân adı verilmiyor.",
    extra: "Aynı olayın ek kaydı: Duayı bir baba cemevinde okuyor.",
    known: ["Gülbank duası", null, null, null],
    added: [null, "Cemevi", "Baba", null],
  },
  {
    label: "Kalbî zikir",
    base: "Nakşibendi geleneğinde kalbî zikirden söz ediliyor. Rehber ve yer adı yazılı değil.",
    extra:
      "Aynı olayın ek kaydı: Zikir, mürşidin rehberliğiyle bir dergâhta yapılıyor.",
    known: ["Kalbî zikir", null, null, null],
    added: [null, "Dergâh", "Mürşit", null],
  },
  {
    label: "Su hizmeti",
    base: "Bir cem kaydında sakkanın su hizmetini yürüttüğü açıkça yazılı. Bina adı ve aileler arasındaki bağ verilmemiş.",
    extra:
      "Aynı olayın ek kaydı: Cem cemevinde yapılıyor. İki ailenin musahip olduğu da açıkça yazılı.",
    known: ["Cem", "", "Sakka", null].map((x) => x || null),
    added: [null, "Cemevi", null, "Musahiplik"],
  },
];
export const tasavvufRecordLabels025 = tasavvufRecords025.map((r) => r.label);
export function tasavvufEvidence025(
  record = 0,
  target = 0,
  detail = false,
): HumanitiesScene025 {
  const r = tasavvufRecords025[bounded025(record, 6)];
  bounded025(target, 4);
  flag025(detail);
  const base = r.known[target],
    added = detail ? r.added[target] : null,
    value = added ?? base;
  const extra = detail ? r.extra : "Ek kayıt bu sürümde verilmemiştir.";
  return {
    title: "Kayıtta hangi tür bilgi var?",
    context:
      r.base + " " + extra + " Aranan: " + tasavvufTargets025[target] + ".",
    nodes: [
      { id: "base", label: "İlk kayıt", detail: r.base },
      {
        id: "extra",
        label: detail ? "Ek kayıt" : "Ek kayıt yok",
        detail: extra,
      },
      {
        id: "target",
        label: tasavvufTargets025[target],
        detail:
          "Aranan türü açık veriyle ilişkilendir; eksik olanı kendin ekleme.",
      },
    ],
    links: [
      {
        from: "base",
        to: "target",
        valid: base !== null,
        evidence: base
          ? "İlk kayıt aranan tür için şu bilgiyi verir: " + base
          : "İlk kayıt bu türü açıkça vermez.",
      },
      {
        from: "extra",
        to: "target",
        valid: added !== null,
        evidence: added
          ? "Aynı olaya ait ek kayıt şu bilgiyi verir: " + added
          : "Bu sürümdeki ek veri aranan türü tamamlamaz.",
      },
    ],
    result: value ? "Bilgi açık: " + value : "Bu bilgi kayıtta yok",
    explanation: value
      ? "Aranan " +
        tasavvufTargets025[target].toLocaleLowerCase("tr-TR") +
        " için açık bilgi: " +
        value +
        ". Bilginin ilk veya aynı olaya ait ek kayıttan gelmesi denetlendi. Bu eşleştirme kişinin bütün manevi durumunu ölçmez."
      : "Kayıt başka bilgiler verse de aranan " +
        tasavvufTargets025[target].toLocaleLowerCase("tr-TR") +
        " açık değildir. Bu olaydaki bilgi eksikliği, geleneğin hiçbir yerinde böyle bir unsur bulunmadığı anlamına gelmez.",
  };
}
const conditionCases025 = [
  {
    label: "Araştırma dosyası",
    context:
      "Kurmaca inceleme kuralı üç koşulu ayrı arıyor: gönüllü izin, gizlilik, bağımsız uzman incelemesi. Yalnız aşağıdaki kayıtlar verilmiştir.",
    conditions: ["Gönüllü izin", "Veri gizliliği", "Uzman incelemesi"],
  },
  {
    label: "İş dosyası",
    context:
      "Kurmaca sözleşme incelemesi ücretin ödenmesi, güvenli donanım ve açık görev tanımı için ayrı kayıt arıyor. Bir koşul ötekini yerine getirmez.",
    conditions: ["Ücret ödemesi", "Güvenli donanım", "Açık görev tanımı"],
  },
  {
    label: "Lisans dosyası",
    context:
      "Kurmaca lisans ücretsiz ders kullanımına, atıf yapılmasına ve görselin değiştirilmemesine bağlı izin veriyor. Gerçek bir içerik için lisans ayrıca okunur.",
    conditions: ["Ücretsiz ders", "Kaynak gösterme", "Değiştirmeme"],
  },
  {
    label: "Ürün dosyası",
    context:
      "Kurmaca izlenebilirlik incelemesi aynı partiye ait belgeyi, katkı kaynağını ve işlem kaydını ayrı arıyor. Bu üç kayıt ürünün bütün dinî veya sağlık koşullarını tek başına belirlemez.",
    conditions: ["Parti eşleşmesi", "Katkı kaynağı", "İşlem kaydı"],
  },
  {
    label: "Nakil metni",
    context:
      "Bu kurmaca soru yalnız alıcı rızası, verici izni ve uzman uygunluk kaydının yazılı olup olmadığını inceliyor. Bunlar gerçek naklin bütün şartları değildir; model tedavi veya fetva kararı vermez.",
    conditions: ["Alıcı rızası", "Verici izni", "Uzman uygunluğu"],
  },
  {
    label: "Hak dosyası",
    context:
      "Kurmaca paylaşım düzeni hak sahibinin iznini, geri verilecek hakkın iadesini ve kayıtların doğruluğunu ayrı koşullar olarak belirtiyor. Bağış tek başına bütün koşulların yerine geçmez.",
    conditions: ["Hak sahibi izni", "Hakkın iadesi", "Doğru kayıt"],
  },
] as const;
export const conditionCaseLabels025 = conditionCases025.map((c) => c.label);
export const conditionStatusLabels025 = [
  "Bilgi verilmemiş",
  "Sağlandığı yazılı",
  "Sağlanmadığı yazılı",
] as const;
export const conditionClaimLabels025 = [
  "Üç koşul da sağlanmış",
  "İkinci koşul sağlanmış",
  "Üçüncü koşul sağlanmamış",
] as const;
export function conditionNames025(caseIndex: number) {
  return [...conditionCases025[bounded025(caseIndex, 6)].conditions];
}
export function conditionEvidence025(
  caseIndex = 0,
  first = 0,
  second = 0,
  third = 0,
  claim = 0,
): HumanitiesScene025 {
  const c = conditionCases025[bounded025(caseIndex, 6)];
  [first, second, third].forEach((x) => bounded025(x, 3));
  bounded025(claim, 3);
  const statuses = [first, second, third];
  const truth =
    claim === 0
      ? statuses.includes(2)
        ? false
        : statuses.includes(0)
          ? null
          : true
      : claim === 1
        ? second === 0
          ? null
          : second === 1
        : third === 0
          ? null
          : third === 2;
  const facts = c.conditions.map(
    (name, i) => name + ": " + conditionStatusLabels025[statuses[i]],
  );
  const explanation =
    claim === 0
      ? truth === true
        ? "Üç ayrı koşulun sağlandığı da açıkça kayıtlıdır."
        : truth === false
          ? "En az bir koşulun sağlanmadığı açıkça yazılıdır. Bir olumlu kayıt bu aykırılığı silmez."
          : "Açık bir aykırılık verilmemiş olsa da en az bir koşulun durumu bilinmiyor. Yazılmayanı sağlanmış kabul edemeyiz."
      : claim === 1
        ? second === 0
          ? "İkinci koşul hakkında bilgi verilmedi; sağlandı veya sağlanmadı diye tamamlanamaz."
          : "İkinci koşulun kaydı " +
            conditionStatusLabels025[second].toLocaleLowerCase("tr-TR") +
            " biçimindedir. Diğer iki koşul bu tek kayıt sorusunun yerine geçmez."
        : third === 0
          ? "Üçüncü koşulun durumu yazılı değil. Sağlanmadığı iddiası da ek kanıt ister."
          : "Üçüncü koşulun kaydı " +
            conditionStatusLabels025[third].toLocaleLowerCase("tr-TR") +
            " biçimindedir. Olumsuz iddiayı bu kayıtla ayrı karşılaştır.";
  return {
    title: "Üç koşulu birbirine taşımadan denetle",
    context:
      c.context +
      " " +
      facts.join(". ") +
      ". İncelenen iddia: " +
      conditionClaimLabels025[claim] +
      ".",
    nodes: [
      ...c.conditions.map((name, i) => ({
        id: "condition-" + i,
        label: name,
        detail: conditionStatusLabels025[statuses[i]],
      })),
      {
        id: "claim",
        label: "İncelenen iddia",
        detail: conditionClaimLabels025[claim],
      },
    ],
    links: (claim === 0 ? [0, 1, 2] : claim === 1 ? [1] : [2]).map((i) => ({
      from: "condition-" + i,
      to: "claim",
      valid: statuses[i] === (claim === 2 ? 2 : 1),
      evidence:
        c.conditions[i] +
        " için kayıt: " +
        conditionStatusLabels025[statuses[i]] +
        ". Bu iddiada aranan durum: " +
        conditionStatusLabels025[claim === 2 ? 2 : 1] +
        ". Bilinmeyen kayıt karşıt durumun kanıtı değildir.",
    })),
    result:
      truth === null
        ? "İddia için bilgi eksik"
        : truth
          ? "İddia verilen kayda uyuyor"
          : "İddia verilen kayda uymuyor",
    explanation:
      explanation +
      " Bu sonuç yalnız seçili kayıt iddiasına aittir; gerçek kişinin, ürünün veya işlemin bütün dinî ve hukuki durumuna hüküm değildir.",
  };
}
export const eastTraditions025 = [
  "Hinduizm",
  "Budizm",
  "Konfüçyanizm",
  "Taoizm",
] as const;
const eastClues025 = [
  {
    label: "Karma",
    text: "Bu öğretim tablosunda karma Hinduizm ve Budizmle ilişkilendirilir.",
    candidates: [0, 1],
  },
  {
    label: "Vedalar",
    text: "Bu tabloda Vedalar Hindu metin geleneğinin verisidir.",
    candidates: [0],
  },
  {
    label: "Mokşa",
    text: "Bu tabloda mokşa Hindu kurtuluş anlayışlarıyla ilişkilidir.",
    candidates: [0],
  },
  {
    label: "Sekiz Aşamalı Yol",
    text: "Bu tabloda Sekiz Aşamalı Yol Budist öğreti verisidir.",
    candidates: [1],
  },
  {
    label: "Sangha",
    text: "Bu tabloda sangha Budist topluluğu anlatır.",
    candidates: [1],
  },
  {
    label: "Konuşmalar",
    text: "Bu tabloda Konuşmalar Konfüçyan metin geleneğiyle ilişkilidir.",
    candidates: [2],
  },
  {
    label: "Ren ve li",
    text: "Bu tabloda ren ve li Konfüçyan ahlak kavramlarıdır.",
    candidates: [2],
  },
  {
    label: "Tao Te Ching",
    text: "Bu tabloda Tao Te Ching Taoist metin verisidir.",
    candidates: [3],
  },
  {
    label: "Wu wei",
    text: "Bu tabloda wu wei Taoist doğal uyum yaklaşımıyla ilişkilidir.",
    candidates: [3],
  },
  {
    label: "Çin kökeni",
    text: "Bu dört adaylı tabloda Konfüçyanizm ve Taoizm Çin kökeni verisini paylaşır.",
    candidates: [2, 3],
  },
  {
    label: "Hint kökeni",
    text: "Bu dört adaylı tabloda Hinduizm ve Budizm Hint alt kıtası kökeni verisini paylaşır.",
    candidates: [0, 1],
  },
  {
    label: "Bir metin okunuyor",
    text: "Bu genel bilgi tablodaki dört adayı tek başına ayırmaz; hepsinin metin mirası vardır.",
    candidates: [0, 1, 2, 3],
  },
] as const;
export const eastClueLabels025 = eastClues025.map((c) => c.label);
export function eastCandidates025(clue: number): number[] {
  return [...eastClues025[bounded025(clue, 12)].candidates];
}
export function eastEvidence025(
  evidenceA = 0,
  evidenceB = 1,
  sameRecord = true,
): HumanitiesScene025 {
  const a = eastClues025[bounded025(evidenceA, 12)],
    b = eastClues025[bounded025(evidenceB, 12)];
  flag025(sameRecord);
  const aa = eastCandidates025(evidenceA),
    bb = eastCandidates025(evidenceB),
    common = aa.filter((n) => bb.includes(n));
  const names = (ns: number[]) =>
    ns.map((n) => eastTraditions025[n]).join(", ");
  let result: string, explanation: string;
  if (!sameRecord) {
    result = "İki kayıt ayrı değerlendirilmeli";
    explanation =
      "A verisinin adayları: " +
      names(aa) +
      ". B verisinin adayları: " +
      names(bb) +
      ". Veriler farklı dosyalara ait olduğundan tek geleneğe ilişkin ortak aday üretmek için birleştirilmez. Kayıtların kişisel aidiyet anlattığı da varsayılmaz.";
  } else if (!common.length) {
    result = "Bu tabloda ortak aday yok";
    explanation =
      "Aynı dosyada birlikte sınıflandırılmak istenen iki veri, bu kapalı öğretim tablosunda ortak aday vermiyor. Dosyanın birden fazla geleneği karşılaştırması veya kayıtların yanlış birleştirilmesi araştırılabilir. Dünyadaki kültürel ilişkilerin imkânsız olduğu sonucu çıkmaz.";
  } else if (common.length === 1) {
    result = "Tabloda tek aday: " + names(common);
    explanation =
      "A verisi " +
      names(aa) +
      "; B verisi " +
      names(bb) +
      " adaylarını destekler. Aynı dosyada birlikte kullanılınca ortak aday " +
      names(common) +
      " olur. Bu tablo kavram sınıflandırır; gerçek kişinin bütün inancını ölçmez.";
  } else {
    result = "Birden çok ortak aday var";
    explanation =
      "Aynı dosyadaki iki veri birlikte kullanılsa da şu adaylar kalır: " +
      names(common) +
      ". Daha özgül kişi, metin veya öğreti verisi gerekir. Ortak kavramın tekrarlanması tek başına yeni ayırıcı kanıt yaratmaz.";
  }
  return {
    title: "İki ipucunun kapsamını birleştir",
    context:
      "Bu keşif yalnız aşağıda açıkça verilen dört adaylı öğretim tablosunu kullanır. Evrensel dinî aidiyet testi değildir. A: " +
      a.text +
      " B: " +
      b.text +
      " Veriler " +
      (sameRecord ? "aynı sınıflandırma dosyasına" : "iki ayrı dosyaya") +
      " aittir.",
    nodes: [
      {
        id: "a",
        label: "A: " + a.label,
        detail: a.text + " Adaylar: " + names(aa),
      },
      {
        id: "b",
        label: "B: " + b.label,
        detail: b.text + " Adaylar: " + names(bb),
      },
      {
        id: "scope",
        label: sameRecord ? "Aynı dosya" : "Ayrı dosyalar",
        detail: sameRecord
          ? "İki verinin ortak adayını yalnız verilen tablo içinde ara."
          : "A verisini B dosyasına taşımadan her birini ayrı incele.",
      },
    ],
    links: [
      {
        from: "a",
        to: "scope",
        valid: sameRecord && common.length > 0,
        evidence: sameRecord
          ? "A verisi aynı dosya için ortak aday arayışına katılır."
          : "A verisi kendi dosyasının sınırında kalır.",
      },
      {
        from: "b",
        to: "scope",
        valid: sameRecord && common.length > 0,
        evidence: sameRecord
          ? "B verisi aynı dosya için ortak aday arayışına katılır."
          : "B verisi kendi dosyasının sınırında kalır.",
      },
    ],
    result,
    explanation,
  };
}
