import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";

const section = (title: string, ...paragraphs: string[]): GuideSection => ({
  title,
  paragraphs,
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
const question = (
  id: string,
  prompt: string,
  options: string[],
  answer: number,
  hint: string,
  explanation: string,
  skill: string,
  passage?: string,
): Question => ({
  id,
  prompt: txt(prompt),
  options: options.map(txt),
  answer,
  hint: txt(hint),
  explanation: txt(explanation),
  skill,
  ...(passage ? { passage: txt(passage) } : {}),
});
const centreSource =
  "OGM Materyal Tarih 10: Sultan ve Osmanlı Merkez Teşkilatı 1–2, her biri s. 1. Aurelia aynı başlıklı kopya kağıdı s. 1–5. İşlev ve dönem ayrımlarıyla yazılmış özgün öğretim; sorular özgündür, resmî ÖSYM sorusu değildir.";
const societySource =
  "OGM Tarih 10 ders anlatım sunuları: Millet Sistemi (metinli öğretim sayfaları 5–53), Lonca/Toprak–Çifthane (s. 4–20, 23–43, 46–56), Vakıflar (s. 5–15, 18–21). Aurelia Klasik Çağda Osmanlı Toplum Düzeni s. 1–6 ile karşılaştırılmış özgün öğretim. Sorular özgündür; resmî ÖSYM sorusu değildir.";
const balanceSource =
  "OGM Tarih 11 konu özetleri 001–009, her biri s. 1: Uzun Savaşlardan Diplomasiye; Avusturya; Lehistan; Avrupa’da Din Savaşlarından Modern Devlete 1–2; Denizcilik; Kadırgadan Kalyona; Fetihlerden Savunmaya 1–2. Aurelia Değişen Dünya Dengeleri Osmanlı s. 1–6 ile karşılaştırılmış özgün öğretim. Sorular özgündür; resmî ÖSYM sorusu değildir.";

const centreGuide: LessonGuide = {
  id: "sultan-osmanli-merkez-teskilati",
  minutes: 60,
  objectives: [
    "Padişah, Divan ve saray kurumları arasındaki yetki–görev ilişkisini açıklamak.",
    "Seyfiye, ilmiye ve kalemiye görevlerini işin içeriğinden ayırmak.",
    "Veraset uygulamalarını dönem ve amaç–sonuç ayrımıyla değerlendirmek.",
    "Kayıt, maliye, fetva ve yargıyı yakın örneklerde karşılaştırmak.",
  ],
  sections: [
    section(
      "Merkez teşkilatını bir iş akışı olarak kur",
      "Başkentte alınan bir kararın uygulanması için görüşme, kayıt, mali kaynak, görevlendirme ve denetim gerekir. Osmanlı merkez teşkilatı bu farklı işleri padişah, Divan-ı Hümayun ve saray çevresinde birleştiriyordu. Padişah en üst siyasi otoriteydi; fakat her defteri kendisinin tutması veya her davayı bizzat görmesi beklenmezdi. Görevlerin uzmanlaşması, merkezi yönetimin işleri görevliler aracılığıyla yürütmesidir.",
      "Önce kurumla kişiyi ayır: Divan bir kurul, sadrazam bir görevli, Enderun bir eğitim kurumudur. Beylerbeyi ve sancakbeyi ise taşra yönetimiyle ilişkilidir. Merkez ile taşra birbirine bağlıdır; bağlantı bulunması aynı kurum olduklarını göstermez. Modelde bir yazının içeriğini değiştirerek aynı ‘defter’ sözcüğünün nişancıya da defterdara da götürebildiğini incele; cevabı nesnenin adı değil yapılan iş belirler.",
    ),
    section(
      "Padişah, hukuk ve kanunname",
      "Osmanlı hükümdarlığı hanedana dayanır. Padişah, yönetimin ve ordunun başındaki otorite olarak görevlileri tayin eder, devlet işlerini gözetir ve kararları onaylar. Şer‘î hukuk, örfî düzenlemeler, gelenek ve kurumlar siyasi işleyişin parçasıdır. Bu yapı modern demokratik kuvvetler ayrılığıyla aynı değildir; fakat ‘en üst otorite’ ifadesinden hukukun veya bütün görevlilerin işlevsiz olduğu da çıkarılamaz.",
      "Fatih’in Kanunname-i Âl-i Osman düzenlemeleri, daha önceki uygulamaların da derlenip merkezi düzenin güçlendirilmesiyle ilişkilidir. Sadrazamın hükümdarı temsil etmesi, mührü taşıması ve yürütmede geniş yetki kullanması vekâlet ilişkisidir. Bir yetkinin görevliye kullandırılması hükümdarlığın bütünüyle devredildiği anlamına gelmez. Siyasetnamelerde adalet, liyakat, danışma ve halkın korunması ideal hükümdarlığın ölçütleri olarak anlatılır; idealin dile getirilmesi her dönemde kusursuz uygulandığını kanıtlamaz.",
    ),
    section(
      "Veraset: aynı hanedan, değişen uygulamalar",
      "Erken dönemde hanedanın geniş üyelik anlayışı taht üzerinde birden çok hak iddiasına zemin oluşturabiliyordu. I. Murat dönemindeki padişah ve oğulları vurgusu ve Fatih’in kardeş katline ilişkin hükmü, merkezi iktidarı koruma ve taht mücadelelerini sınırlama arayışları içinde değerlendirilir. Bunlar farklı dönemlerin uygulamalarıdır; hepsini kuruluşun ilk gününden beri aynı biçimde işleyen tek kural gibi görmek anakronizmdir.",
      "XVII. yüzyılda ekber ve erşed anlayışıyla hanedanın yaşça büyük ve uygun görülen üyesinin önceliği güçlendi. Şehzadelerin sancakta yetişmesi yerine sarayda tutulmasının yaygınlaşması, taşra yönetimi deneyimi bakımından farklı sonuçlar doğurdu. Taht kavgasını azaltma amacı, her çatışmanın bittiği veya her seçimin en yetenekli kişiyi belirlediği garantisi değildir. Yaş, deneyim, uygunluk ve uygulamanın siyasi sonucu ayrı ayrı değerlendirilmelidir.",
    ),
    section(
      "Topkapı: aynı sarayda üç farklı işlev",
      "Topkapı Sarayı yalnız hükümdarın evi değildi; devlet yönetimi, saray hizmetleri ve eğitim de burada örgütleniyordu. Birun dış hizmetler ve resmî işlerle, Enderun iç hizmet ve yönetici yetiştirmeyle, Harem hanedan ailesinin yaşamı ve saray eğitimiyle ilişkilidir. Bunlar birbirinden tamamen kopuk üç dünya değil, saray düzenindeki farklı işlev alanlarıdır.",
      "Birun’da hekimbaşı, darphane emini, saray mutfak ve kapı hizmetleri gibi çok çeşitli görevler bulunurdu. Enderun kademeli eğitim ve hizmetle yönetici kadro yetiştirirdi; Harem’in de eğitim ve kültür aktarımı boyutu vardı. ‘Harem yalnız özel yaşamdır’ veya ‘Enderun bütün sarayın adıdır’ gibi eşitlemeler kapsamı bozar. Bir soruda mekânı yalnız adına göre değil, verilen eyleme göre seç: idari kadro eğitimi mi, dış hizmet mi, hanedan yaşamı mı?",
    ),
    section(
      "Yönetici ve şehzade yetiştirme yolları",
      "Enderun, yetenekli kişilerin saray hizmeti içinde eğitim alıp idari ve askerî görevlere hazırlanmasını amaçlıyordu. Türkçe, saray adabı, bilgi ve uygulamalı hizmetin birleşmesi, padişaha bağlı nitelikli kadro yetiştirme anlayışıyla ilişkilidir. Kul sistemi merkezle doğrudan bağlılık kuran kadro yapısını anlatır; bu kavramı yalnız bir kişinin kökenine veya bütün topluma aynı statünün uygulanmasına indirgemek doğru değildir.",
      "Şehzadelerin sancaklara gönderilmesi, yanlarındaki lala aracılığıyla yönetim tecrübesi kazanmasını sağlayan bir eğitim yoluydu. Sarayda ilk eğitim ile sancakta uygulama birbirini tamamlayabilirdi. Sancağa çıkmanın zayıflaması taşra deneyiminin azalmasıyla ilişkilendirilir; bu gözlemden tek bir kurumun bütün siyasi sorunların tek nedeni olduğu sonucu çıkmaz. Yönetici eğitimi, veraset ve siyasi yetkiyi aynı başlık altında eritmeden bağlantılarını kur.",
    ),
    section(
      "Merkezî otorite, servet ve müsadere",
      "Merkezî yönetimi güçlendirme yalnız savaş veya verasetle ilgili değildi; görevlilerin hanedandan bağımsız güç ve servet odağına dönüşmesini sınırlama arayışı da vardı. Müsadere, belirli koşullarda mal varlığının devlet tarafından alınması uygulamasıdır. Özellikle kul statüsündeki görevlilerin servetinin aile içinde kalıcı siyasi güç hâline gelmesini önleme amacıyla ilişkilendirilir. Bu, ülkedeki her kişinin bütün malına her gün aynı işlemin uygulandığı anlamına gelmez.",
      "Görev, mal varlığı ve veraset ilişkisini ayrı oku: bir memurun yetkisinin genişliği onun hanedanın bağımsız rakibi olduğu anlamına gelmez; serveti sınırlama amacı da uygulamanın her zaman adil veya kusursuz yürüdüğünü kanıtlamaz. Kaynakta bir tedbirin merkezîleşme amacıyla anlatılması, sonuçlarının tek yönlü ve koşulsuz olduğu iddiasını gerektirmez. Kanunname, vekâlet, saray eğitimi ve servet denetimi bu yüzden farklı araçlarla aynı otorite sorununa bağlanabilir.",
    ),
    section(
      "Divan nasıl çalışırdı, ne zaman değişti?",
      "Divan-ı Hümayun siyasi, idari, askerî, mali ve önemli adli meselelerin görüşüldüğü merkezî kuruldu. Savaş ve barış, elçi kabulü, halkın şikâyetleri ve önemli davalar burada ele alınabiliyordu. Bu yüzden onu yalnız bir savaş kurulu veya yalnız mahkeme saymak eksiktir. Farklı iş alanlarının aynı kurulda görüşülmesi, üyelerin farklı uzmanlıklar taşımasını da açıklar.",
      "Divanın temelleri Orhan Bey dönemine götürülür; Fatih döneminde başkanlık sadrazama geçti. Hükümdarın doğrudan başkanlık etmemesi denetiminin sona erdiği anlamına gelmez; kararların uygulanması padişahın onayıyla ilişkilidir. Üyelik ve katılım da zamanla değişmiştir. Modern bakanlar kurulu veya yüksek mahkemeyle yapılan benzetmeler bazı işlevleri açıklayabilir; günümüzdeki kurumlarla tam hukuki özdeşlik anlamına gelmez. Veraset sırasını belirlemek Divanın olağan görevlerinden değildir.",
    ),
    section(
      "Seyfiye: yönetim ve askerî yürütme",
      "Sadrazam, padişahın geniş yetkili vekili olarak Divana başkanlık eder, siyasi ve askerî işlerin yürütülmesinde merkezi rol oynardı. Kubbealtı vezirleri yönetimde yardımcıydı. Kaptan-ı derya donanmanın komutanıydı; Yeniçeri ağasının Divana katılması rütbe ve dönemin koşullarıyla ilişkiliydi. Seyfiye, yalnız fiilen kılıç kullanan kişileri değil yönetim ve askerî yürütme alanını anlatan bir görev sınıflamasıdır.",
      "Mühr-i hümayun, padişah vekilliği ve seferde en üst komutanlık sadrazamı ayırt eden ipuçlarıdır. Bunları padişahın tuğrasını belgeye çekmekle karıştırma; belgeye tuğra çekmek nişancının görev alanındadır. Aynı padişahla ilişkili iki sembol, iki farklı işi gösterebilir. Bir görevlinin geniş yetkisi de bütün mali, yargısal ve eğitimsel işleri tek başına yaptığı anlamına gelmez.",
    ),
    section(
      "İlmiye: atama, hüküm ve fetvayı ayır",
      "İlmiye hukuk, eğitim ve dinî bilgi alanlarındaki kadrolarla ilişkilidir. Kazasker, kadı ve müderrislerle ilgili atama ve adli işlerde önemli görev üstlenirdi. Kadı mahkemede uyuşmazlıklar hakkında hüküm verir; müderris medresede öğretim yapardı. Bunların aynı geniş görev alanına bağlı olması aynı işi yaptıkları anlamına gelmez: ders vermek, atamayı yürütmek ve dava hakkında karar vermek farklı fiillerdir.",
      "Şeyhülislamın ayırt edici işlevi dinî-hukuki konuda fetva vermektir. Fetva ile bir davadaki mahkeme hükmünü veya kadı atamasını özdeşleştirme. Divana üyelik ve katılım dönem ve konuya göre değerlendirilir; şeyhülislamı bütün Osmanlı tarihi boyunca değişmez biçimde her toplantının aslî üyesi saymak güvenilir değildir. ‘Dinî bir kavram geçti’ diye hemen şeyhülislamı seçmek yerine, işin atama mı, eğitim mi, yargılama mı, görüş bildirme mi olduğuna bak.",
    ),
    section(
      "Kalemiye: parayı ve kaydın içeriğini izle",
      "Defterdar gelir, gider ve hazine gibi mali işlerle ilgilenirdi. Nişancı padişahın tuğrasını çeker, tahrir ve arazi kayıtlarıyla, örfî kanun ve belge düzeniyle ilişkili görevler yürütürdü. Reisülküttap Divan kâtiplerinin başıydı; zamanla dış yazışmalardaki rolü arttı. Klasik iş bölümü anlatımında bu maliye, kayıt ve yazışma görevleri kalemiye altında ele alınır; unvanların kapsamı ve personel kökenleri yüzyıllar boyunca tamamen sabit değildir.",
      "Bir defterde ne yazdığı belirleyicidir. ‘Hazine gelir ve giderleri’ maliyeye, ‘arazinin tasarruf ve tahrir kayıtları’ nişancının iş alanına götürür. ‘Defter’ sözcüğünden otomatik defterdar cevabına gitmek sözcük benzerliğini görev bilgisi yerine koymaktır. Son kontrolde görevli, ana fiil ve kurum türü birlikte uyuşmalı: tuğra–nişancı, gelir/gider–defterdar, kadı/müderris ataması–kazasker, fetva–şeyhülislam. Modelde karşılaştırdığın kayıtlar bu ayrımı somutlaştırır.",
    ),
  ],
  examples: [
    example(
      "İki defter, iki görevli",
      "Bir yazı arazinin tahririni ve fermanın tuğrasını; diğeri hazine gelir ve giderlerini konu alıyor. İkisi de ‘defter işi’ diye tek görevliye verilebilir mi?",
      "Nesnenin adını değil içeriği karşılaştır.",
      [
        [
          "İlk içeriği ayır",
          "Arazi kaydı ve tuğra nişancının iş kümesinde birleşir.",
        ],
        [
          "İkinci içeriği ayır",
          "Hazine gelir ve gideri maliyedir; defterdarın işidir.",
        ],
        [
          "İlişkiyi kur",
          "İki görev de kayıtla ilişkilidir; uzmanlık alanları farklıdır.",
        ],
      ],
      "İlk yazı nişancıya, ikinci yazı defterdara gider.",
      "‘Defter’ ortak kaldığı hâlde cevabın neden değiştiğini açıklayabiliyor musun?",
      "Her kayıt işini defterdar saymak.",
    ),
    example(
      "Vekâlet egemenlikten farklıdır",
      "Fatih sonrasında Divana sadrazam başkanlık ediyor, kararlar padişahın onayına sunuluyor. Hükümdarın yetkisinin sona erdiği söylenebilir mi?",
      "Başkanlık, vekâlet ve son onay rollerini ayır.",
      [
        [
          "Görünen değişikliği bul",
          "Kurula bizzat başkanlık etme görevi sadrazama geçmiştir.",
        ],
        [
          "Devam eden yetkiyi bul",
          "Son onay padişahla bağlantılıdır; sadrazam onun vekilidir.",
        ],
        ["Kapsamı denetle", "Başkanlık değişimi hükümdarlığın devri değildir."],
      ],
      "Hayır; işleyiş ve temsil değişmiştir, en üst siyasi otorite ortadan kalkmamıştır.",
      "Yorum her iki bilgiyi de kullanıyor mu?",
      "Başkanlık etmeme ile hiçbir denetim yapamamayı eşitlemek.",
    ),
    example(
      "Fetva mı, atama mı?",
      "Bir görevli müderris ve kadıların atanmasıyla, diğeri bir kararın dinî uygunluğu hakkında görüş bildirmekle ilgileniyor.",
      "İlk anahtar olarak kişinin alanını değil yaptığı fiili seç.",
      [
        ["Atamayı ayır", "Kadı ve müderris ataması kazaskerin iş alanıdır."],
        ["Görüşü ayır", "Dinî-hukuki fetva şeyhülislamı ayırt eder."],
        [
          "Sınıfı ortak tut, görevi ayır",
          "İkisi ilmiye alanındadır; bu onları aynı görevli yapmaz.",
        ],
      ],
      "Sırasıyla kazasker ve şeyhülislam.",
      "İpucunu ‘din’ sözcüğü yerine ‘atamak/fetva vermek’ fiilleriyle kur.",
      "Aynı sınıftaki her işi aynı kişiye vermek.",
    ),
    example(
      "Amaç sonuç garantisi değildir",
      "Bir düzenleme taht mücadelelerini azaltmak amacıyla hanedanın yaşlı ve uygun üyesine öncelik veriyor. Bütün anlaşmazlıkların sonsuza dek bittiği sonucu çıkar mı?",
      "Uygulama, amaç ve ölçülemeyen sonucu ayır.",
      [
        [
          "Uygulamayı tanı",
          "Yaş ve uygunluk vurgusu ekber ve erşed anlayışına götürür.",
        ],
        [
          "Amacı açıkla",
          "Tahtın geçişini daha belirli kılma ve mücadeleyi azaltma hedeflenir.",
        ],
        [
          "Garantiyi reddet",
          "Hedefin varlığı bütün sonraki olayların sorunsuz olduğunu kanıtlamaz.",
        ],
      ],
      "Hayır; düzenlemenin amacından bütün sonuçların başarıyla gerçekleştiği çıkarılamaz.",
      "Uygulamayı XVII. yüzyıl bağlamına yerleştir.",
      "Yaşlılıkla her koşulda en yüksek yeteneği eşitlemek.",
    ),
  ],
  recall: [
    {
      prompt: "Padişah–sadrazam–Divan ilişkisini tek bir iş akışıyla açıkla.",
      answer:
        "Devlet işleri Divanda farklı uzmanlıklarla görüşülür; sadrazam vekil olarak başkanlık eder; kararların uygulanması padişahın onayıyla ilişkilidir.",
    },
    {
      prompt:
        "Aynı defter sözcüğü nişancıya ve defterdara nasıl ayrı ayrı götürebilir?",
      answer:
        "Tahrir/arazi ve tuğra nişancı; hazine gelir/gideri defterdar. Kaydın içeriği belirleyicidir.",
    },
    {
      prompt: "Enderun, Birun ve Harem neden aynı şey değildir?",
      answer:
        "İç hizmet ve kadro eğitimi; dış/resmî hizmet; hanedan yaşamı ve eğitim farklı işlevlerdir. Saray bunların hepsini barındırır.",
    },
    {
      prompt: "Kazaskerle şeyhülislamı ayıran iki fiil söyle.",
      answer:
        "Kadı/müderris atamasıyla ilgilenmek kazasker; fetva vermek şeyhülislam. Aynı geniş ilmiye alanı, aynı görev demek değildir.",
    },
  ],
  source: centreSource,
};

const societyGuide: LessonGuide = {
  id: "klasik-cag-osmanli-toplum-duzeni",
  minutes: 65,
  objectives: [
    "Toplumsal aidiyeti dinî, idari ve ekonomik eksenleri karıştırmadan açıklamak.",
    "Mülkiyet, kullanım ve vergi gelirini ayrı rollerle ilişkilendirmek.",
    "Çift-hane, tımar, lonca, narh ve vakıf mekanizmalarını örneklerde ayırmak.",
    "Şehir hayatı, hizmetler ve dayanışmanın farklı kurumlarla nasıl bağlandığını göstermek.",
  ],
  sections: [
    section(
      "Bir kişi toplumda birden çok ilişkiye katılır",
      "Osmanlı toplumunu tek bir çizgide ‘asker–köylü’ diye bölmek yetersizdir. Dinî aidiyet, görev ve vergi statüsü, meslek ve yaşanılan yer ayrı sınıflandırma eksenleridir. Bir kişi dinî aidiyet bakımından Müslüman, meslek bakımından terzi, görev-vergi bakımından reaya, yaşadığı çevre bakımından şehirli olabilir. Bu özelliklerden biri diğerinin yerine geçmez; her soru hangi ekseni sorduğunu açıkça belirlemelidir.",
      "Askerî sınıf yalnız savaşçıları kapsamaz; yönetim, hukuk, eğitim ve bürokrasi hizmetindeki görevlileri de içeren yönetenler grubudur. Reaya ise üretim ve vergiyle ilişkilendirilen yönetilenlerdir; yalnız Müslüman köylüler değildir. Şehirli esnaf ve farklı dinlerden insanlar da bu kapsamda bulunabilir. Modelde yalnız dinî aidiyeti değişen iki terziyi karşılaştır: meslek ve görev statüsü aynı kalabilir. Sonra kadıya geç; değişen şeyin inanç değil görev olduğunu incele.",
    ),
    section(
      "Millet kavramı ve cemaatlerin yönetimi",
      "Klasik bağlamdaki millet, günümüzün ulus-devlet veya etnik soy kavramıyla özdeş değildir; din ve mezhep aidiyeti temelindeki toplulukları anlatır. Dinî önderler, ibadet, eğitim ve belirli iç işlerin düzenlenmesinde aracı olabiliyordu. Bunun yanında merkezi otoritenin mali, adli ve kamu düzenine ilişkin yetkileri sürüyordu. Bazı alanlarda topluluğun kendi kurumlarıyla iş görmesi, bağımsız bir devlet olduğu anlamına gelmez.",
      "Millet düzenini bütün yüzyıllarda aynı ayrıntıyla işleyen tek ve değişmez bir şema gibi okumamak gerekir. Statüler, tanınan yetkiler ve uygulamalar zaman ve yere göre farklılaşabiliyordu. Ümmet dinî topluluk bağını, zimmî statüsü belirli yükümlülük ve koruma ilişkileri içindeki gayrimüslim tebaanın hukuki konumunu anlatan kavramlardandır. Topluluğun haklarını tümüyle yok saymak da herkese modern anlamda aynı vatandaşlık statüsü tanındığını söylemek de dönemi yanlış okur.",
    ),
    section(
      "İstimâlet, iskân ve fethedilen yerlerin dönüşümü",
      "İstimâlet, yeni yönetimle halk arasında güven ve bağlılık oluşturmayı hedefleyen siyasettir. Can-mal güvenliği, dinî hayatın belirli güvenceleri ve yerel ihtiyaçların gözetilmesi bu çerçevede değerlendirilir. Amaç nüfusun üretime ve yerel yaşama devam etmesiyle yönetimin kalıcılığını bir arada sağlamaktır. Bu politikayı her topluluğun zorla aynı dine geçirilmesi şeklinde tanımlamak, belirtilen araçlarla çelişir.",
      "İskân ve imar şehirlerin fiziksel ve toplumsal yapısını etkilerdi. Kadı ve subaşı tayini, tahrir, yeni mahalleler, cami, çarşı, medrese ve sosyal hizmet yapıları yönetimle şehir hayatını bağlardı. Farklı topluluklar aynı şehirde ticaret ve günlük yaşam ilişkileri kurabiliyordu. Bunun amacıyla bütün insanların her zaman çatışmasız yaşadığını birbirinden ayır: düzenin hedefini öğrenmek, dönemde hiçbir sorun veya eşitsizlik bulunmadığı iddiasını gerektirmez.",
    ),
    section(
      "Toprak türleri: önce hukuki niteliği belirle",
      "Osmanlı coğrafyasında bütün araziler aynı hukuki statüde değildi. Genel sınıflamada mirî, mülk ve vakıf toprak ayrımı önemlidir. Mirî arazide çıplak mülkiyet devlete aittir; belirli şartlarla üreticiye kullanım hakkı tanınır. Mülk arazi özel mülkiyetle, vakıf arazi veya gelir ise tahsis edilen hizmet amacıyla ilişkilidir. Bir statü için söylenen her kuralı başka arazi türüne otomatik taşımamak gerekir.",
      "Bir toprak sorusunda üç sütun aç: Mülkiyet kimde? Kullanım kimde? Vergi gelirinden kim, hangi hizmet karşılığında yararlanıyor? Bu üç hak veya yetki aynı kişide olmak zorunda değildir. Sipahinin gelir elde etmesi toprağı serbestçe satabileceğini göstermez; köylünün ekip biçmesi de mirî toprağın tam özel mülkiyetini kazandığı anlamına gelmez. Bölge, zaman ve arazi türü verilmişse çıkarımın sınırını o bilgiler belirler.",
    ),
    section(
      "Çift-hane: üretimin birimi neden hanedir?",
      "Çift-hane düzeninde köylü ailesinin emeği, bir çift öküz ve işlenen arazi bir üretim ve vergilendirme birimi olarak düşünülür. Çiftin büyüklüğü toprağın verimine göre değişebilir; bu nedenle her çiftliği aynı yüzölçümünde bir geometrik parça gibi öğrenmek doğru değildir. Devletin amacı üretimi, vergi tabanını ve işlenen arazinin sürekliliğini korumaktı. Tahrir kayıtları bu düzenin izlenmesine yardımcı olurdu.",
      "Mirî araziyi kullanan üreticinin toprağı serbest özel mülk gibi satması, bağışlaması veya vakfetmesi aynı hak değildir. Haklı neden olmadan üretimi bırakmak ve toprağı boş tutmak çiftbozan yükümlülüğüyle ilişkilendirilebilirdi. Düzenin üretimi koruma amacı, her bölgede hiç aksama yaşanmadığı garantisi değildir. Çift-hane üretim birimini; tımar ise vergi gelirinin hizmet karşılığı tahsisini açıklar. İlişkilidirler, fakat birbirinin tanımı değildirler.",
    ),
    section(
      "Tımar: gelir karşılığında hizmet",
      "Tımar düzeninde belirli vergi gelirleri hizmet ve asker yetiştirme yükümlülüğü karşılığında sipahiye bırakılırdı. Böylece taşra düzeni, üretim, yerel gelir ve askerî hizmet arasında bağ kuruluyordu. Devletin nakit ödeme ihtiyacını kısmen azaltan bu ilişki, sipahinin bütün geliri hiçbir yükümlülük olmadan tüketmesi demek değildi. Üretimin devamı hem köylü geçimi hem gelir ve hizmet düzeni için önemliydi.",
      "Mülkiyeti devlete, kullanımı köylüye, belirli vergi gelirini hizmet karşılığında sipahiye bağlayan örnekte üç aktör aynı araziyle farklı ilişki kurar. Bu rol ayrımı sipahiyi Batı Avrupa’daki her senyörle birebir özdeşleştirmeyi de engeller. Devletin feodal güç birikimini sınırlandırma hedefi, hiçbir yerel güç veya toprak sorunu yaşanmadığı anlamına gelmez. Soruya cevap verirken sistemin ayırt edici hukuki ilişkisinden başla; genel etiketle bütün ayrıntıları silme.",
    ),
    section(
      "Lonca: yalnız üretim değil meslek eğitimi de var",
      "Şehirlerde aynı meslek kolundaki esnafın örgütlenmesi, hammadde temini, üretim miktarı, ürün standardı ve meslek eğitimi için işliyordu. Lonca, Ahilik ve fütüvvet geleneğiyle ilişkiliydi. Çırak–kalfa–usta ilerleyişi bilgi, uygulama, meslek ahlakı ve denetimi birleştirirdi. Kethüda, yiğitbaşı ve tecrübeli ustalar mesleğin işleyişinde roller üstlenebilirdi; bunların her biri bütün devlet yönetiminin başı değildir.",
      "Aynı meslek örgütünde Müslüman ve gayrimüslim esnaf bulunabilirdi; dinî topluluk ekseni meslek örgütünü tek başına açıklamaz. Orta ve yardımlaşma sandıkları hastalık, yaşlılık veya iş ihtiyacı gibi durumlarda üyeleri destekleyebilirdi. Bu yardımlaşma loncayı vakıfla tamamen aynı kurum yapmaz. Kurumu tanımak için yalnız ‘yardım’ kelimesine değil, meslek eğitimi, üretim, hammadde ve denetim kümesine bak.",
    ),
    section(
      "İaşecilik ve narh: amaçla aracın farkı",
      "İaşecilik yaklaşımında temel ihtiyaçların yeterli, kaliteli ve erişilebilir olması önem taşır. Lonca ve kamu otoritesinin piyasa üzerindeki düzenlemeleri bu yaklaşımla ilişkilidir. Narh, belirli mal veya hizmet için fiyatın ya da fiyat sınırının denetlenmesidir; ürün niteliği ve halkın alım gücüyle birlikte ele alınır. Düzenlemenin hedefi sınırsız fiyat rekabeti kurmaktan farklıdır.",
      "Bir uygulama fiyat ve standardı belirleyerek tüketiciyi korumaya çalışabilir; bundan herkesin aynı gelire sahip olduğu sonucu çıkmaz. Narh loncanın tamamı değildir: loncada eğitim, üretim ve dayanışma gibi daha geniş işler bulunur. Gedik mesleği yapabilme yetkisiyle ilişkili bir kavramdır; bütün yüzyıllarda aynı ayrıntıyla uygulanmış değişmez bir belge gibi düşünülmez. Koşulları ve dönemi okumak, modern serbest piyasa kavramlarını geriye taşımaktan daha açıklayıcıdır.",
    ),
    section(
      "Vakıf: maldan gelire, gelirden hizmete",
      "Vakıfta bir mal veya gelir belirli hayır ve kamu yararı hizmetinin sürekliliği için tahsis edilir. Gelir üreten bir dükkânın kirası medrese, imaret, şifahane, çeşme veya köprünün giderlerine ayrılabilir. Vakfiye amacı, malı, işleyiş şartlarını ve yönetimi belirleyen belgedir; mütevelli yönetici, vakfeden ise kurucudur. Kurum, belge, yönetici ve gelir getiren malı aynı şey sanmamak gerekir.",
      "Kurucunun ölümü vakfın kendiliğinden sona erdiği anlamına gelmez; süreklilik için gelir ve hukuki düzen kurulmuştur. Hanedan üyeleri, görevliler ve başka kişiler vakıf kurabiliyordu. Vakıfların kamu hizmetindeki büyük rolünden bütün hizmetlerin aynı yöntemle finanse edildiği veya hazinenin hiçbir sosyal işle ilişkisi olmadığı sonucu çıkarılamaz. Bir vakfın kime ve nasıl hizmet ettiğini belge şartları belirler; her vakfın bütün insanlara aynı hizmeti verdiği mutlak yargısı yerine somut örneği oku.",
    ),
    section(
      "Mahalle, çarşı ve ortak yaşamı birlikte oku",
      "Mahalle günlük dayanışma ve aidiyetin, çarşı meslek ve alışverişin, bedesten güvenli ticari saklama ve satışın, kapan belirli malların toptan dağıtımının mekânları arasındadır. Külliye cami çevresindeki birden çok hizmet yapısının bir araya gelmesidir; yalnız okul veya yalnız pazar demek değildir. Bu yapılar üretim, ibadet, eğitim ve sosyal hizmeti aynı şehir dokusu içinde bağlayabilir.",
      "Kahvehane, panayır, düğün ve şenlikler de sosyalleşme, kültür aktarımı ve ticari hareketlilik bakımından işlev taşırdı. Toplum düzeni yalnız erkek görevlilerin listesi değildir; hane emeği, farklı dinî topluluklar, esnaf, kadınların vakıf kuruculuğu ve yerel dayanışma gibi ilişkiler de önemlidir. Bir kişinin bir kurumla ilişkisi diğer bütün aidiyetlerini silmez. Son tekrarında dört kurum için ana mekanizmayı söyle: çift-hane üretim birimi, tımar hizmete bağlı vergi geliri, lonca meslek düzeni, vakıf sürekli hizmet finansmanı.",
    ),
  ],
  examples: [
    example(
      "İki terzi, değişmeyen meslek",
      "Bir şehirde Müslüman ve gayrimüslim iki terzi üretim yapıp vergi veriyor; ikisi de yönetim görevlisi değil. Dinî aidiyetlerinin farklı olması görev-vergi grubunun da mutlaka farklı olduğunu gösterir mi?",
      "Eksenleri ayrı ayrı karşılaştır.",
      [
        [
          "Aynı kalan veriyi bul",
          "İkisi terzidir; örnekte üretip vergi vermektedir.",
        ],
        ["Değişen veriyi bul", "Dinî aidiyetleri farklıdır."],
        [
          "Doğru eksene cevap ver",
          "Görev-vergi bakımından ikisi de reayadır; dinî aidiyet bakımından farklıdırlar.",
        ],
      ],
      "Hayır; farklı dinî aidiyet aynı meslek ve aynı görev-vergi statüsüyle birleşebilir.",
      "İnançtan otomatik olarak askerî sınıf sonucu çıkarmadın mı?",
      "Bir sınıflandırma ekseninin bütün diğerlerini belirlediğini sanmak.",
    ),
    example(
      "Arazide üç hakkı paylaştır",
      "Mirî araziyi bir köylü işler; sipahi vergi geliri karşılığında atlı asker yetiştirir. Sipahi bu araziyi özel mülkü olarak satabilir mi?",
      "Mülkiyet, kullanım ve gelir yetkisini ayır.",
      [
        ["Mülkiyeti belirle", "Mirî arazinin çıplak mülkiyeti devlettedir."],
        [
          "Kullanımı belirle",
          "Üretim yapan köylü koşulları içinde kullanım hakkından yararlanır.",
        ],
        [
          "Geliri hizmete bağla",
          "Sipahinin belirli vergi gelirini alması hizmet yükümlülüğüyle ilişkilidir, özel mülkiyet değildir.",
        ],
      ],
      "Hayır; gelir tahsisi toprağın serbestçe satılabilecek özel mülk olmasını sağlamaz.",
      "Cevabında üç aktörün üç farklı ilişkisi bulunuyor mu?",
      "Vergi gelirini elde etmeyi araziye sahip olmakla eşitlemek.",
    ),
    example(
      "Aynı yardım, farklı kurum",
      "Bir esnaf sandığı hasta üyeye destek olurken bir dükkânın vakfedilmiş kirası çeşme onarımına ayrılıyor. İkisi de yardım yaptığına göre aynı kurum mudur?",
      "Amaç benzerliğine ek olarak kaynak ve hukuki yapıyı oku.",
      [
        [
          "İlk kaynağı izle",
          "Meslek üyelerinin sandığı lonca dayanışmasıyla ilişkilidir.",
        ],
        [
          "İkinci kaynağı izle",
          "Tahsis edilen malın geliri ve sürekli hizmet vakıf mekanizmasıdır.",
        ],
        [
          "Benzerliği sınırla",
          "Sosyal destek ortak olabilir, örgütlenme ve hukuki tahsis farklıdır.",
        ],
      ],
      "Hayır; yardım ortak işlev olabilir, fakat lonca ile vakıf aynı kurum değildir.",
      "Yalnız ‘yardım’ kelimesiyle karar vermekten kaçındın mı?",
      "Aynı sonucu üreten bütün kurumları hukuken eşitlemek.",
    ),
    example(
      "Vakfiyeden kanıtlı yorum",
      "Bir vakfiye dükkânları, kira gelirinin okul ve aşevine harcanmasını ve mütevelliyi belirtiyor. Bu belge kurucunun ölümünde hizmetin biteceğini gösterir mi?",
      "Belgede söylenenlerle eklenen varsayımı ayır.",
      [
        ["Mekanik zinciri kur", "Mal işletilir; gelir hizmete gider."],
        ["Yönetimi bul", "Mütevelli ve yazılı şartlar işleyişi düzenler."],
        [
          "Sürekliliği değerlendir",
          "Gelir ve yönetimin düzenlenmesi kurucunun yaşamıyla sınırlı anlık yardımdan farklıdır.",
        ],
      ],
      "Hayır; bu sonuç belgeyle desteklenmez ve vakfın süreklilik mantığıyla bağdaşmaz.",
      "Mal, gelir, hizmet ve yönetici kavramlarını birbirinden ayırabildin mi?",
      "Kurumun faaliyetiyle kurucunun biyolojik yaşamını aynı süre saymak.",
    ),
  ],
  recall: [
    {
      prompt: "Müslüman şehirli terziyi üç ayrı eksende açıkla.",
      answer:
        "Dinî aidiyet Müslüman; meslek/yer şehirli esnaf; örnekte üretip vergi veren yönetilen olarak reaya. Bu özellikler aynı anda bulunur.",
    },
    {
      prompt: "Mirî arazide devlet, köylü ve sipahinin ilişkilerini ayır.",
      answer:
        "Devlet çıplak mülkiyeti korur; köylü belirli koşullarda kullanıp üretir; sipahi hizmet karşılığında tahsis edilmiş vergi gelirinden yararlanır.",
    },
    {
      prompt: "Lonca–narh–vakıf–vakfiye arasındaki fark nedir?",
      answer:
        "Lonca meslek örgütü; narh fiyat/standart düzenlemesi; vakıf sürekli hizmet için tahsis; vakfiye bu tahsisin şartlarını belirleyen belgedir.",
    },
    {
      prompt: "Cemaat kurumlarının bulunması neden tam bağımsızlık değildir?",
      answer:
        "Bazı iç işlerin kendi kurumlarınca yürütülmesi yanında devletin kamu düzeni ve mali yetkileri sürer. Hakların kapsamı dönem ve yere göre değerlendirilir.",
    },
  ],
  source: societySource,
};

const balanceGuide: LessonGuide = {
  id: "degisen-dunya-dengeleri-osmanli",
  minutes: 70,
  objectives: [
    "1595–1774 gelişmelerini taraf, cephe ve değişim türüyle ilişkilendirmek.",
    "Askerî zafer, diplomatik statü ve toprak değişikliğini birbirinden ayırmak.",
    "Avrupa devletler sistemi, denizcilik ve çok cepheliliğin etkisini mekanizmasıyla açıklamak.",
    "Karlofça–İstanbul ve Kırım bağımsızlığı–ilhak ayrımlarında kanıt sınırını korumak.",
  ],
  sections: [
    section(
      "1595–1774: tek yönlü bir gerileme çizgisi değil",
      "Bu dönemi yalnız yenilgi listesi olarak öğrenmek kazanımları, geçici toparlanmaları ve farklı cephelerin etkisini siler. Uzun savaşlar, maliyet, isyanlar, Avrupa’daki siyasi rekabet, Rusya’nın yükselişi ve deniz teknolojisi birlikte etkiliydi. Bir cephedeki başarı bütün kaynak sorunlarını çözmediği gibi, bir yenilgi de devletin bütün faaliyetlerini anında bitirmedi. Dönemin açıklaması olay–ara mekanizma–sonuç ilişkisiyle kurulmalıdır.",
      "Her antlaşma için tarafı, coğrafyayı ve değişen ilişkiyi sor: Toprak mı el değiştirdi, protokol statüsü mü düzenlendi, ticari hak mı tanındı? Haçova zaferiyle Zitvatorok’taki protokol eşitliği farklı tür sonuçlardır. Çizelgedeki tarihler sıralama sağlar; komşu iki noktanın otomatik olarak birbirinin tek nedeni olduğunu kanıtlamaz. Modelde değişim türünü tahmin edip kanıtın gösterdiği ve göstermediği sonuçları karşılaştır.",
    ),
    section(
      "Habsburglarla uzun savaş ve Zitvatorok",
      "1593’te başlayan uzun savaş döneminde kaleler el değiştirdi, kuşatmalar ve meydan savaşları yaşandı. III. Mehmet’in katıldığı 1596 Haçova Muharebesi Osmanlı zaferidir. Fakat savaşın yıllarca sürmesi, tek bir meydan zaferinin bütün savaşı kesin biçimde bitirmediğini gösterir. Asker, ikmal ve para ihtiyacı; doğu cephesi ve içerideki Celâli sorunlarıyla birlikte düşünülmelidir.",
      "1606 Zitvatorok Antlaşması’nda Habsburg hükümdarının protokolde Osmanlı padişahına denk kabul edilmesi, önceki tek taraflı üstünlük anlayışında değişimi gösterir. Mütekabiliyet karşılıklılık ilkesidir; burada siyasi ve diplomatik statü vurgulanır. Yıllık ödeme düzenindeki değişim de ilişkiyi etkiler. Bu bilgiden otomatik büyük toprak kaybı veya Habsburg ülkesinin Osmanlı’ya katıldığı sonucu çıkmaz. Askerî güç, mali şartlar ve protokol ayrı göstergelerdir.",
    ),
    section(
      "Safevi cephesi: ticaret, iç sorun ve sınır",
      "1590 Ferhat Paşa Antlaşması’yla doğuda elde edilen geniş kazanımlar kalıcı ve değişmez olmadı. Safevilerle ipek ticareti güzergâhları, kıymetli maden akışı ve Kafkasya çevresindeki siyasi nüfuz rekabeti devam etti. Osmanlı’nın başka cephede savaşması ve içeride isyanlarla uğraşması, rakibin fırsat görmesini kolaylaştırabiliyordu. Buradan ortak plan veya resmî ittifak sonucuna geçmek için ayrıca kanıt gerekir.",
      "Nasuh Paşa ve Serav antlaşmaları bu yeniden düzenlenen ilişkilerin aşamalarıdır. IV. Murat dönemindeki seferlerin ardından 1639 Kasr-ı Şirin Antlaşması doğu sınırının ana çerçevesini belirleyen önemli bir düzenleme oldu. Uzun süreli sınır çerçevesi, bütün sorunların sonsuza dek ortadan kalkması değildir. Özetlerdeki tarih yazım farklılıklarını soru anahtarı yapmadan olayın tarafını ve işlevini öğren: Safevi cephesi, toprak ve ticaret rekabeti, ardından diplomatik sınır düzeni.",
    ),
    section(
      "Avrupa’da din savaşları ve 1648 barışları",
      "1618–1648 Otuz Yıl Savaşları dinî ayrılıkların yanında hanedan ve devlet çıkarlarının etkili olduğu bir mücadeleydi. Katolik Fransa’nın Habsburglara karşı tutumu, aynı mezhebin bütün devletleri her koşulda aynı ittifakta toplamadığını gösterir. Dinî ve siyasi etkenler birlikte bulunabilir; birinin varlığı diğerini otomatik olarak yok etmez. Bu ortam Osmanlı’nın ilişki kurduğu Avrupa dengesinin de parçasıdır.",
      "1648 Westphalia barışları Avrupa’da çok taraflı diplomasi, siyasi birimlerin egemenliği ve güç dengesi bakımından önemli bir dönüm noktasıdır. Osmanlı bu antlaşmaların imzacısı değildir. ‘Modern devlet bir günde tamamlandı’, ‘din artık hiç etkili olmadı’ veya ‘Avrupa hemen tek devlet oldu’ gibi yargılar aşırıdır. İmparatorluk iddiası, bölgesel yetkiler ve devlet çıkarları arasındaki uzun değişim sürecini gör; bir barışın önemini açıklamak bütün sonraki tarihi o tarihten türetmeyi gerektirmez.",
    ),
    section(
      "Lehistan, Venedik ve Rusya: üç farklı ilişki",
      "Lehistan’la Kazak hareketleri ve Eflak–Boğdan çevresindeki etki rekabeti ilişkileri zorlaştırdı. 1621 Hotin sonrasında sınır düzeni korundu; 1672 Bucaş Osmanlı’nın batıdaki önemli kazanımlarından biriyle, özellikle Podolya’yla ilişkilidir. 1676’daki Zoravna ayrı bir düzenlemedir. Bir kazanımı bütün yüzyılın kesintisiz yükselişi diye sunmak, aynı dönemdeki diğer savaş ve maliyetleri gözden kaçırır.",
      "Venedik’le uzun Girit mücadelesi 1669’da adanın fethiyle sonuçlandı; kuşatmanın uzunluğu deniz gücü ve ikmal kapasitesinin önemini gösterir. Kuzeyde Rusya giderek daha kalıcı bir rakip hâline geldi. 1681 Bahçesaray Antlaşması Osmanlı–Rusya arasındaki ilk antlaşma olarak öğrenilir. Lehistan, Venedik ve Rusya aynı anda rakip olabilir; ancak her biriyle aynı yerde, aynı gerekçeyle ve aynı antlaşmayla ilişki kurulduğu söylenemez.",
    ),
    section(
      "II. Viyana’dan Karlofça’ya: ittifak ve uzun savaş",
      "1683 II. Viyana Kuşatması başarısız oldu. Ardından Avusturya, Lehistan, Venedik ve Rusya gibi güçlerle Kutsal İttifak savaşları yaşandı. Burada birden fazla gücün koordinasyonu ve uzun savaşın insan, para ve ikmal baskısı, tek bir kuşatma anından daha geniş açıklama gerektirir. ‘Viyana alınamadı, ertesi gün bütün topraklar kaybedildi’ biçiminde ara süreci atlamak nedenselliği bozar.",
      "1699 Karlofça Antlaşması Avusturya, Lehistan ve Venedik karşısında büyük toprak kayıplarıyla ilişkilidir. Rusya’yla ayrı barış 1700 İstanbul Antlaşması’dır; Azak Rusya’ya bırakıldı. Kutsal İttifak savaşlarında yer almakla aynı antlaşmanın doğrudan tarafı olmak birbirinden farklıdır. Büyük kayıplar savunma, müzakere ve geçici ittifakların önemini artırdı; diplomasi yalnız zayıf devletlerin yaptığı bir faaliyet değildir, çıkarları yönetmenin araçlarından biridir.",
    ),
    section(
      "Kadırga, kalyon ve deniz rekabeti",
      "Kadırga ağırlıkla kürek gücüyle, kalyon yelkenle hareket eden gemi tipleridir. Açık deniz, uzun menzil ve ağır top kullanımının önem kazanması kalyonun değerini artırdı. Akdeniz’deki rüzgâr, kıyı ve manevra şartları ise kadırganın bazı görevlerde kullanılmasını açıklıyordu. Gemi tipi tek başına ‘her yerde üstün’ etiketi taşımaz; görev ve çevre koşulları teknik tercihi belirler.",
      "XVII. yüzyılda Girit mücadelesi ve Venedik kalyonlarıyla karşılaşmalar Osmanlı denizciliğindeki dönüşümü etkiledi. Denizcilik yalnız gemi gövdesi değil eğitimli personel, top, tersane, mali kaynak ve taktik bilgisidir. İngiltere, Hollanda ve Fransa’nın denizaşırı ticaret ve sömürge rekabeti Avrupa güç dengesini değiştirdi. Atlantik’te ticaretin büyümesi Akdeniz’in göreli önemini etkiledi; Akdeniz ticareti bir anda tamamen yok olmadı. Sömürgecilik yerel toplumlar üzerindeki zor ve kaynak aktarımıyla da değerlendirilir.",
    ),
    section(
      "XVIII. yüzyılın başında geri kazanım ve savunma",
      "1700’de Azak’ı alan Rusya’yla mücadele 1711 Prut Antlaşması’na uzandı; Azak’ın geri alınması Osmanlı açısından kazanımdı. Bu başarıdan Karlofça’da kaybedilen bütün yerlerin alındığı sonucu çıkmaz. Tek cephedeki kazanım farklı antlaşmaların bütün sonuçlarını otomatik olarak tersine çevirmez. Osmanlı, kaybettiği yerleri geri alma hedefini sürdürürken birden fazla rakip ve kaynak baskısıyla karşılaşıyordu.",
      "Venedik’ten Mora’nın geri alınmasının ardından Avusturya’nın savaşa girmesi koşulları değiştirdi. 1718 Pasarofça Antlaşması Mora’nın Osmanlı’da kalmasıyla birlikte Avusturya karşısındaki kayıpları da içeriyordu. Bu yüzden aynı antlaşmada farklı taraflarla ilişkili farklı yönlü sonuçlar bulunabilir. Antlaşma adını yalnız ‘zafer’ veya ‘yenilgi’ etiketiyle ezberlemek yerine her maddeyi taraf ve bölgeyle eşleştir. Siyaset, kaybedileni geri alma yanında mevcut toprakları koruma ve diplomatik imkan arama yönünde şekillendi.",
    ),
    section(
      "Belgrad ve doğuda sınır çerçevesinin devamı",
      "1736–1739 Osmanlı–Rus ve Avusturya savaşlarının ardından Belgrad Antlaşmaları Osmanlı açısından görece elverişli sonuçlar doğurdu. Belgrad’ın geri alınması ve Rusya’nın Karadeniz’deki askerî imkanlarının sınırlandırılması, XVIII. yüzyıldaki her antlaşmanın aynı yönde kayıp olmadığını gösterir. Kazançla uzun vadeli bütün sorunların bittiği iddiası yine farklıdır. Güç dengeleri değişebilir; antlaşmanın koşulları kendi savaş bağlamında değerlendirilir.",
      "Doğuda Safevi düzeninin çözülmesi ve İran’daki siyasi değişimler yeni mücadelelere yol açtı. 1746 Kerden düzenlemesi, Kasr-ı Şirin’in sınır çerçevesinin yeniden esas alınmasıyla ilişkilidir. Burada aynı coğrafyada farklı dönemlerin siyasi aktörleri bulunur; bütün İran hükümdarlarını değişmez bir Safevi kişiliği gibi okumamak gerekir. Değişen hanedan ve liderle devam eden sınır sorununu ayırmak kronolojiyi ve taraf tanımını birlikte korur.",
    ),
    section(
      "1774: Kırım, ticaret ve siyasi nüfuz",
      "1768–1774 Osmanlı–Rus Savaşı, 1770 Çeşme’de donanmanın yakılması dahil ağır askerî sorunlarla ilerledi. 1774 Küçük Kaynarca Antlaşması Kırım’ın siyasi bağımsızlığını, Rusya’ya verilen ticari hakları ve başka ağır yükümlülükleri içeriyordu. Kırım’ın bu tarihte bağımsızlığı ile daha sonraki Rus ilhakını aynı olay sayma. 1774’te doğrudan Rus toprağına katıldığı yorumu, antlaşmanın ayırt edici statü maddesini yanlış okur.",
      "Rusya’nın Karadeniz ve Osmanlı iç işleri üzerindeki etkisi arttı; dinî ilişkiler de siyasi nüfuz iddialarında kullanılabildi. Bu süreci ‘Rusya bütün Osmanlı Ortodoksları üzerinde sınırsız ve tartışmasız yetki kazandı’ gibi geniş, koşulsuz bir hükme indirgememek gerekir. Ticaret gemilerine tanınan imkanla bütün savaş gemilerine her koşulda serbest geçiş de aynı değildir. Son kontrolde statü, ticaret, askerî sonuç ve yorumlanan siyasi nüfuzu ayrı başlıklarda düşün; kanıtın desteklemediği yetkiyi ekleme.",
    ),
    section(
      "Kanıtı nedensellikten ve varsayımdan ayır",
      "‘Safeviler Osmanlı’nın Habsburg savaşından yararlandı’ ifadesi, fırsat kullanımını ve eş zamanlı sorunları gösterir. Ortak ordu, sözleşme veya koordinasyon kanıtı verilmeden ‘Safevi–Habsburg ittifakı kuruldu’ denemez. Aynı şekilde önce gelen her olay sonraki olayın tek nedeni değildir. Nedensel açıklamada ara mekanizmayı yaz: çok cepheli savaş → insan, para ve ikmal baskısı → bazı cephelerde barış arayışının artması.",
      "Olumsuz soru kökünde her seçeneğin dayanağını ayrı denetle. Toprak değişimini statü eşitliğiyle, savaşta aynı tarafta bulunmayı aynı antlaşmanın tarafı olmakla, siyasi bağımsızlığı ilhakla karıştırma. Tarih şeridini kapatıp Zitvatorok, Kasr-ı Şirin, Karlofça, İstanbul, Belgrad ve Küçük Kaynarca’yı birer taraf–değişim cümlesiyle açıkla. Bu yöntem adı ezberlemekten daha fazla bağlantı kurdurur; yine de sorunun vermediği yeni olay veya kesinliği yoruma eklememelisin.",
    ),
  ],
  examples: [
    example(
      "Statü mü, toprak mı?",
      "Bir antlaşma Habsburg hükümdarını protokol bakımından Osmanlı padişahına denk kabul ediyor. Sırf bu bilgi büyük toprak kaybı gösterir mi?",
      "Maddeyi değişim türüyle eşleştir.",
      [
        ["Tarafı bul", "Habsburg ve Osmanlı ilişkisidir."],
        [
          "Fiili oku",
          "Denk kabul edilme diplomatik protokol statüsünü düzenler.",
        ],
        ["Ek iddiayı sınırla", "Toprak devri ayrı madde ve kanıt gerektirir."],
      ],
      "Hayır; 1606 Zitvatorok’ta ayırt edici değişim siyasi-protokol statüsüdür.",
      "Cevapta olmayan bir toprak maddesi eklemedin mi?",
      "Bütün antlaşmaları aynı ‘toprak kaybı’ etiketiyle okumak.",
    ),
    example(
      "Fırsat kullanımı ittifak değildir",
      "Devlet A, rakibi B başka savaş ve iç isyanla uğraşırken sınırda ilerliyor. A ile B’nin diğer düşmanı arasında ittifak kesin midir?",
      "Fiilin anlamıyla ortak hareket için gereken kanıtı karşılaştır.",
      [
        ["Açık bilgiyi ayır", "B aynı anda farklı sorunlarla uğraşmaktadır."],
        ["A’nın eylemini tanımla", "A koşullardan yararlanıp ilerlemektedir."],
        [
          "Eksik kanıtı bul",
          "Ortak karar veya koordinasyon verilmemiştir; ittifak ek varsayımdır.",
        ],
      ],
      "Hayır; fırsat kullanımı kanıtlıdır, ittifak için ek bilgi gerekir.",
      "Yorumun aktör veya ilişki ekleyip eklemediğini denetle.",
      "Aynı rakibe karşı çıkarı olanların mutlaka resmî ortak olduğunu sanmak.",
    ),
    example(
      "İttifak savaşıyla barışın tarafı aynı liste değildir",
      "Rusya Kutsal İttifak savaşlarında Osmanlı’ya karşı yer alıyor. 1699 Karlofça’dan sonra 1700’de ayrı İstanbul barışı yapılıyor. Rusya’nın Karlofça’nın doğrudan tarafı olduğu söylenebilir mi?",
      "Savaş katılımı ve ayrı barış işlemini ayır.",
      [
        ["Savaş bağını bul", "Rusya aynı genel savaşlar içinde rakiptir."],
        [
          "Antlaşmayı ayır",
          "Rusya’yla barış 1700 İstanbul’dur; Azak maddesi bu düzenlemeye aittir.",
        ],
        [
          "Sonucu sınırla",
          "İttifaka katılmak bütün barışları aynı tarihte imzalamak değildir.",
        ],
      ],
      "Hayır; 1699 Karlofça ile 1700 İstanbul barışı ayrı değerlendirilir.",
      "Her antlaşmanın yanına kendi tarafını yazdın mı?",
      "Bir koalisyonun bütün üyelerini her antlaşmaya otomatik imzacı yapmak.",
    ),
    example(
      "1774’te Kırım’ın statüsü",
      "Bir antlaşma Kırım’a siyasi bağımsızlık tanıyor. Öğrenci ‘Kırım aynı tarihte Rusya’ya ilhak edildi’ diyor. İlk hata nedir?",
      "Statü bildiren kelimeyi aynen koru.",
      [
        [
          "Maddeyi oku",
          "Siyasi bağımsızlık doğrudan başka devlete katılmak demek değildir.",
        ],
        ["Dönemi belirle", "1774 Küçük Kaynarca’nın sonucu soruluyor."],
        [
          "Sonraki olayı taşıma",
          "Daha sonraki ilhakın bu tarihin yerine konması kronolojiyi bozar.",
        ],
      ],
      "İlk hata bağımsızlık ile ilhakı eşitlemektir.",
      "Statü değişikliğini tek sözcükle doğru adlandırabiliyor musun?",
      "Daha sonra gerçekleşen olayı önceki antlaşmanın maddesi saymak.",
    ),
  ],
  recall: [
    {
      prompt: "1606 ve 1699’un ayırt edici değişimlerini karşılaştır.",
      answer:
        "Zitvatorok’ta Habsburg–Osmanlı protokol eşitliği; Karlofça’da Avusturya, Lehistan ve Venedik karşısında büyük toprak kaybı. Değişim türleri farklıdır.",
    },
    {
      prompt: "1639, 1648 ve 1700 için taraf–işlev bağı kur.",
      answer:
        "Kasr-ı Şirin: Osmanlı–Safevi doğu sınırı. Westphalia: Avrupa’daki Otuz Yıl Savaşları barışları, Osmanlı imzacı değil. İstanbul: Osmanlı–Rusya barışı ve Azak.",
    },
    {
      prompt: "Neden kalyon her görevde otomatik olarak üstün değildir?",
      answer:
        "Açık deniz, rüzgâr, menzil ve top gücü avantaj yaratabilir; kıyı, manevra ve rüzgârsızlık koşulları farklıdır. Gemi tercihi görevle ilişkilidir.",
    },
    {
      prompt:
        "1739 ve 1774’ü tek bir ‘XVIII. yüzyıl kayıpları’ etiketine koymak neden yetersizdir?",
      answer:
        "Belgrad görece elverişli sonuçlar taşır; Küçük Kaynarca ağır siyasi ve ekonomik sonuçlar doğurur. Dönem içindeki yön değişimleri ve maddeler ayrı okunmalıdır.",
    },
  ],
  source: balanceSource,
};

export const forge093HistoryGuides: LessonGuide[] = [
  centreGuide,
  societyGuide,
  balanceGuide,
];
export const forge093HistoryTopics: Record<string, string> = {
  "sultan-osmanli-merkez-teskilati": "detail-237",
  "klasik-cag-osmanli-toplum-duzeni": "detail-238",
  "degisen-dunya-dengeleri-osmanli": "detail-239",
};

const centreQuestions: Question[] = [
  question(
    "f93h-c1",
    "Bir fermanın tuğrasını çeken ve arazi tahrir kayıtlarıyla ilgilenen görevli hangisidir?",
    ["Defterdar", "Kazasker", "Nişancı", "Kaptan-ı derya", "Şeyhülislam"],
    2,
    "Yazının mali bütçe mi yoksa tuğra ve arazi kaydı mı olduğunu ayır.",
    "Tuğra ve tahrir nişancının iş kümesidir. Defterdar hazine ve gelir–giderle, kazasker hukuk–eğitim kadrolarıyla ilgilidir; donanma ve fetva görevleri de verilen fiillerle uyuşmaz.",
    "görev-kayıt",
  ),
  question(
    "f93h-c2",
    "Hazine gelir ve giderlerini düzenleyen görevlinin, klasik iş bölümü anlatımındaki görevi ve sınıfı hangisidir?",
    [
      "Defterdar–kalemiye",
      "Nişancı–seyfiye",
      "Kazasker–kalemiye",
      "Sadrazam–ilmiye",
      "Şeyhülislam–seyfiye",
    ],
    0,
    "Önce mali işlevi, sonra görev grubunu belirle.",
    "Hazine gelir–gideri maliye işidir; defterdar ve kalemiye eşleşir. Nişancı da klasik sınıflamada kalemiye alanındadır fakat ayırt edici görev mali bütçe değildir. Diğer eşleştirmelerde görev veya sınıf bozulur.",
    "görev-sınıf",
  ),
  question(
    "f93h-c3",
    "Bu düzenlemeden hangi sonuç çıkarılabilir?",
    [
      "Padişahlık makamı ortadan kalkmıştır.",
      "Divan modern bir seçilmiş parlamento olmuştur.",
      "Sadrazam bütün hanedan üyelerinin üstünde yeni hükümdardır.",
      "Başkanlık devredilirken hükümdarın son onay yetkisi sürmüştür.",
      "Divanın mali konuları görüşmesi yasaklanmıştır.",
    ],
    3,
    "Başkanlıkla en üst siyasi otoriteyi aynı şey sayma.",
    "Sadrazam vekil olarak başkanlık eder; onay hükümdarla ilişkilidir. Bu iki bilgi yetki kullanımındaki iş bölümünü gösterir. Hükümdarlığın ortadan kalkması, parlamento veya maliye yasağı hakkında kanıt yoktur.",
    "yetki-ve-vekâlet",
    "Fatih döneminde Divan-ı Hümayuna başkanlık etme görevi sadrazama geçti. Devlet işleri kurulda görüşülüyor, kararlar padişahın onayıyla uygulamaya konuluyordu.",
  ),
  question(
    "f93h-c4",
    "Yönetici yetiştirme, dış saray hizmetleri ve hanedan ailesinin yaşam/eğitimi işlevleri sırasıyla hangi alanlarla eşleşir?",
    [
      "Harem–Enderun–Birun",
      "Divan–Harem–Enderun",
      "Enderun–Harem–Birun",
      "Birun–Divan–Enderun",
      "Enderun–Birun–Harem",
    ],
    4,
    "Üçünün aynı sarayın içinde farklı işlevler taşıdığını düşün.",
    "Yönetici yetiştirme Enderun, dış/resmî hizmet Birun, hanedan yaşamı ve eğitimi Harem’le ilişkilidir. Seçeneklerde yerlerin değiştirilmesi veya Divanın saray eğitim bölümü sayılması işlev sırasını bozar.",
    "saray-işlevleri",
  ),
  question(
    "f93h-c5",
    "Kadı ve müderrislerin atanmasıyla ilgilenmek ile dinî-hukuki fetva vermek sırasıyla hangi görevlileri ayırt eder?",
    [
      "Defterdar–nişancı",
      "Kazasker–şeyhülislam",
      "Şeyhülislam–kazasker",
      "Sadrazam–kaptan-ı derya",
      "Nişancı–defterdar",
    ],
    1,
    "Atama ve görüş bildirme fiillerini ayrı oku.",
    "Kadı/müderris ataması kazasker; fetva şeyhülislamla ilişkilidir. Ters sıra görevleri karıştırır. Maliye, tuğra, askerî yönetim veya donanma verilen iki fiilin karşılığı değildir.",
    "atama-fetva",
  ),
  question(
    "f93h-c6",
    "Bu bilgi hangi yargıyı destekler?",
    [
      "Yaşça büyük her üye her alanda en yeteneklidir.",
      "Bütün taht anlaşmazlıklarının kesin olarak bittiği kanıtlanmıştır.",
      "Verasette yaş ve uygunluğu öne çıkaran bir öncelik benimsenmiştir.",
      "Sultanlık artık hanedan dışından seçimle belirlenmektedir.",
      "Uygulama Orhan Bey döneminden beri aynı ayrıntıyla işlemektedir.",
    ],
    2,
    "Uygulamanın tanımıyla bütün sonuçların garanti edilmesini ayır.",
    "Verilen bilgi ekber ve erşed anlayışındaki yaş/uygunluk önceliğini gösterir. Her kişinin en yetenekli olduğu, çatışmaların tamamen bittiği veya hanedan dışı seçim yapıldığı söylenmez; dönem XVII. yüzyıldır.",
    "veraset-kanıtı",
    "XVII. yüzyılda hanedanın yaşça büyük ve uygun görülen üyesine öncelik veren ekber ve erşed anlayışı güçlendi. Amaç tahtın geçişini daha belirli kılmak ve mücadeleleri azaltmaktı.",
  ),
  question(
    "f93h-c7",
    "Bir şehzadenin yanında lala bulunarak sancakta yönetim görevine hazırlanması en doğrudan hangi amaca yöneliktir?",
    [
      "Uygulamalı yönetim deneyimi kazandırmak",
      "Her şehzadeyi ömür boyu bağımsız hükümdar yapmak",
      "Merkezle bütün bağları koparmak",
      "Tahrir defterlerini özel mülke çevirmek",
      "Divanın bütün mali görevlerini kaldırmak",
    ],
    0,
    "Eğitimle fiilî görev tecrübesinin bağlantısına bak.",
    "Lala ve sancak uygulaması şehzadenin yönetim tecrübesi kazanmasıyla ilişkilidir. Bu eğitimden bağımsız egemenlik, merkezden kopma veya mali kurumların kaldırılması sonucu çıkmaz.",
    "şehzade-eğitimi",
  ),
  question(
    "f93h-c8",
    "Aşağıdaki görevli–işlev eşleştirmelerinden hangisi yanlıştır?",
    [
      "Kaptan-ı derya–donanma komutanlığı",
      "Reisülküttap–Divan kâtiplerinin başı",
      "Sadrazam–padişahın geniş yetkili vekili",
      "Defterdar–hanedanın tahta çıkış sırasını tek başına belirleme",
      "Nişancı–tuğra ve arazi kayıtları",
    ],
    3,
    "Maliye göreviyle veraset düzenini birbirinden ayır.",
    "Defterdarın ayırt edici işi maliyedir; hanedan veraset sırasını tek başına belirlemek bu görevin tanımı değildir. Diğer seçenekler temel işlevlerle uyumludur; olumsuz kök yanlış eşleştirmeyi ister.",
    "işlev-sınırı",
  ),
  question(
    "f93h-c9",
    "Bu sınıflandırmadan hangisine ulaşılamaz?",
    [
      "Görev alanları arasında uzmanlaşma vardır.",
      "Eğitim ve hukuk aynı geniş sınıf içinde ele alınabilir.",
      "Maliye ve yazışma yönetimin kayıt boyutuyla ilişkilidir.",
      "Yönetim ve askerlik seyfiye alanında ele alınır.",
      "Aynı sınıftaki bütün görevliler tamamen aynı işi yapar.",
    ],
    4,
    "Geniş bir sınıfa bağlı olmakla görevlerin özdeş olmasını ayır.",
    "Geniş sınıf ortak alanı gösterir; nişancı ve defterdarın veya kazasker ve müderrisin işleri özdeş değildir. İlk dört yargı verilen sınıflamayla uyumludur; sonuncu uzmanlaşmayı yok sayar.",
    "uzmanlaşma",
    "Klasik görev dağılımında seyfiye yönetim–askerlik; ilmiye hukuk–eğitim–dinî bilgi; kalemiye maliye–kayıt–yazışma alanlarıyla ilişkilendirilir. Bu alanlar içinde farklı görevliler bulunur.",
  ),
  question(
    "f93h-c10",
    "Bir öğrenci ‘Divan-ı Hümayun, Enderun ve sadrazam aynı tür kurumdur’ diyor. Doğru düzeltme hangisidir?",
    [
      "Üçü de yalnız askerî birliktir.",
      "Divan kurul, Enderun eğitim kurumu, sadrazam görevlidir.",
      "Divan kişi, Enderun vergi, sadrazam saray bölümüdür.",
      "Üçü de taşradaki tarım birimidir.",
      "Enderun yalnız bir antlaşmanın adıdır.",
    ],
    1,
    "Kişi, kurul ve eğitim kurumu ayrımını kur.",
    "Divan devlet işlerini görüşen kurul; Enderun sarayda eğitim/hizmet kurumu; sadrazam yönetici görevlidir. Aralarında ilişki bulunması aynı tür yapı olmalarını gerektirmez.",
    "kurum-kişi-ayrımı",
  ),
];

const societyQuestions: Question[] = [
  question(
    "f93h-s1",
    "İki kişi hakkında hangi değerlendirme doğrudur?",
    [
      "Dinleri farklıysa meslekleri mutlaka farklıdır.",
      "İkisi de askerî sınıfa mensuptur, çünkü şehirde yaşarlar.",
      "Aynı mesleği yapabilir ve aynı reaya statüsünde bulunabilirler.",
      "Gayrimüslim olan kişi şehirli esnaf olamaz.",
      "İkisi de vergi verdiği için dinî aidiyetleri aynıdır.",
    ],
    2,
    "Din, meslek ve görev-vergi eksenlerini ayrı tut.",
    "Senaryoda iki kişi de terzi, üretici ve vergi veren yönetilendir. Bu nedenle meslek ve reaya statüsü ortak olabilir; dinî aidiyetleri farklıdır. Şehirde yaşamak askerî görev kazandırmaz, vergi de dinin aynı olmasını gerektirmez.",
    "çoklu-aidiyet",
    "Bir şehirde Müslüman bir terzi ile gayrimüslim bir terzi aynı meslek örgütünde çalışmaktadır. İkisi de üretim yapıp vergi verir; yönetim görevlisi değildir.",
  ),
  question(
    "f93h-s2",
    "Klasik Osmanlı bağlamında millet kavramı en uygun nasıl açıklanır?",
    [
      "Bugünkü etnik ulus-devletin tam karşılığıdır.",
      "Din ve mezhep aidiyetine göre tanınan topluluklarla ilişkilidir.",
      "Yalnız aynı meslekteki ustaları kapsar.",
      "Sadece aynı tarlayı işleyen haneyi belirtir.",
      "Her topluluğun sınırsız bağımsız devlet olduğu anlamına gelir.",
    ],
    1,
    "Kavramı kendi döneminin aidiyet düzeni içinde oku.",
    "Klasik kullanımda millet dinî/mezhebî toplulukla ilişkilidir. Modern ulus, meslek örgütü ve üretici hane farklı eksenlerdir. Bazı cemaat işlerinin yürütülmesi sınırsız siyasi bağımsızlık değildir.",
    "millet-bağlamı",
  ),
  question(
    "f93h-s3",
    "Mülkiyet–kullanım–hizmete bağlı vergi geliri sırası hangisinde doğrudur?",
    [
      "Sipahi–devlet–köylü",
      "Köylü–sipahi–devlet",
      "Devlet–sipahi–köylü",
      "Devlet–köylü–sipahi",
      "Köylü–devlet–sipahi",
    ],
    3,
    "Üretim yapma ve gelir alma, aynı mülkiyet hakkı değildir.",
    "Mirî arazinin çıplak mülkiyeti devlette; koşullu kullanım üretici köylüde; belirli vergi geliri hizmet karşılığında sipahidedir. Diğer sıralar bu ayrı ilişkileri karıştırır.",
    "arazi-hakları",
    "Mirî bir araziyi köylü hane işlemektedir. Bu arazinin belirli vergi geliri, atlı asker yetiştirme hizmeti karşılığında sipahiye tahsis edilmiştir.",
  ),
  question(
    "f93h-s4",
    "Çift-hane düzeninin üretim birimi hangisiyle en doğru açıklanır?",
    [
      "Aile emeği, bir çift öküz ve işlenen arazi",
      "Yalnız donanmadaki top sayısı",
      "Sadece bütün şehrin tek dükkânı",
      "Her bölgede aynı yüzölçümlü özel mülk",
      "Sadece hanedanın saraydaki eğitim kadrosu",
    ],
    0,
    "Hane, emek ve tarımsal araç arasındaki bağı kur.",
    "Çift-hane tarımsal üretim ve vergi düzeninde hane emeği, öküz çifti ve araziyi bağlar. Her bölgede sabit alan veya tam özel mülkiyet değildir. Denizcilik, dükkân ve saray kadrosu bu üretim biriminin tanımı değildir.",
    "çift-hane",
  ),
  question(
    "f93h-s5",
    "Bu uygulamaların ortak kurumsal çerçevesi hangisidir?",
    [
      "Divan-ı Hümayun",
      "Veraset düzeni",
      "Kadırga filosu",
      "Sancak şehzadeliği",
      "Lonca teşkilatı",
    ],
    4,
    "Hammadde, meslek eğitimi ve ürün standardını birlikte değerlendir.",
    "Aynı meslek kolunda eğitim ve üretim standardı loncanın temel işlevleridir. Tek başına fiyat uygulaması olsaydı narh vurgulanabilirdi; burada daha geniş meslek örgütü anlatılır. Merkez yönetimi veya donanma bu kümeyi açıklamaz.",
    "meslek-örgütü",
    "Bir şehirde aynı meslekteki ustalar hammaddeyi üyeler arasında dağıtıyor, çırakları eğitiyor ve ürünlerin standardını denetliyor.",
  ),
  question(
    "f93h-s6",
    "Narh uygulaması hakkında hangi yargı doğrudur?",
    [
      "Bütün toplumun gelirini zorunlu olarak eşitler.",
      "Her tür kalite denetimini yasaklar.",
      "Fiyat ve ürün niteliğinin düzenlenmesiyle tüketiciyi koruma amacı taşır.",
      "Sınırsız ve kuralsız fiyat rekabetinin diğer adıdır.",
      "Yalnız hanedanın tahta geçişini düzenler.",
    ],
    2,
    "Hedefi fiyat ve standart alanında tut; gelir dağılımı garantisi ekleme.",
    "Narh fiyat/standart düzeni ve tüketicinin korunmasıyla ilişkilidir. Bundan bütün gelirlerin eşitliği çıkmaz; sınırsız fiyat rekabetiyle aynı değildir. Kalite yasağı ve veraset ilişkisi de yoktur.",
    "narh-amaç",
  ),
  question(
    "f93h-s7",
    "Bu düzenlemede belge ve yönetici sırasıyla hangileridir?",
    [
      "Lonca–kalfa",
      "Vakfiye–mütevelli",
      "Tımar–sipahi",
      "Gedik–nişancı",
      "Narh–kazasker",
    ],
    1,
    "Gelir getiren malı, şartları yazan belgeyi ve yöneticiyi ayır.",
    "Vakıf tahsis kurumudur; şartları yazan belge vakfiye, yönetici mütevellidir. Lonca/kalfa meslek; tımar/sipahi gelir–hizmet ilişkisidir. Diğer eşleştirmeler bu mekanizmayı açıklamaz.",
    "vakıf-bileşenleri",
    "Bir kişi dükkânının kira gelirini sürekli okul ve çeşme hizmetine ayırıyor. Yazılı şartlarda malları, harcama amacını ve yönetimden sorumlu kişiyi belirtiyor.",
  ),
  question(
    "f93h-s8",
    "Bu durumdan hangisine ulaşılamaz?",
    [
      "Cemaatin bazı iç işlerinde kendi kurumları rol alır.",
      "Merkezi otoritenin yetkileri devam eder.",
      "Topluluk yönetimiyle devlet ilişkisi birlikte vardır.",
      "Cemaat her alanda tam bağımsız bir devlettir.",
      "Farklı yetki alanlarını ayırmak gerekir.",
    ],
    3,
    "Kamu düzeni ve vergi yetkisinin kimde kaldığına bak.",
    "Metin hem cemaat kurumlarını hem devlet yetkilerinin devamını verir. Tam bağımsızlık bu sınırla çelişir. Diğer seçenekler iki alanın birlikte varlığını korur.",
    "yetki-sınırı",
    "Bir cemaatin okul ve ibadet işlerinde kendi kurumları görev yapmaktadır. Devlet vergi ve kamu düzeni denetimini sürdürmektedir.",
  ),
  question(
    "f93h-s9",
    "Kurucusunun ölümünden sonra geliri ve hizmeti vakfiye şartlarıyla devam eden bir vakıf hangi niteliği gösterir?",
    [
      "Yardımın hukuki düzen ve gelir kaynağıyla süreklileştirilmesini",
      "Bütün harcamaların yalnız merkez hazinesinden çıkmasını",
      "Kurucunun bütün mallarının kendiliğinden sipahiye geçmesini",
      "Loncaların bütün görevlerinin sona ermesini",
      "Her yararlanıcının yönetici sınıfa alınmasını",
    ],
    0,
    "Kurucunun kişisel ömrüyle kurumun işleyiş süresini ayır.",
    "Vakıf mal–gelir–hizmet ve yazılı şartlarla devam edebilir. Bu süreklilik doğrudan hazine finansmanı, sipahiye devir veya statü değişimi anlamına gelmez; diğer kurumların yok olmasını da gerektirmez.",
    "kurumsal-süreklilik",
  ),
  question(
    "f93h-s10",
    "Osmanlı şehir hayatıyla ilgili hangi eşleştirme yanlıştır?",
    [
      "Mahalle–günlük dayanışma ve aidiyet",
      "Külliye–birden çok hizmet yapısının bir arada bulunması",
      "Bedesten–ticari saklama ve satış mekânı",
      "Kapan–belirli malların toptan dağıtımı",
      "Kahvehane–yalnız veraset sırasını belirleyen resmî kurul",
    ],
    4,
    "Sosyalleşme mekânını merkezî yönetim kuruluyla özdeşleştirme.",
    "Kahvehane sosyalleşme, konuşma ve kültürel etkinliklerle ilişkilidir; veraset belirleyen resmî kurul değildir. Diğer mekân–işlev eşleştirmeleri temel anlamlarıyla uyumludur.",
    "şehir-mekânları",
  ),
];

const balanceQuestions: Question[] = [
  question(
    "f93h-b1",
    "1606 Zitvatorok’ta Habsburg hükümdarının Osmanlı padişahına protokol bakımından denk kabul edilmesi en doğrudan hangi değişimi gösterir?",
    [
      "Bütün Osmanlı topraklarının kaybını",
      "Denizcilik teknolojisinin tamamen sona ermesini",
      "Diplomatik statü ve karşılıklılık ilişkisindeki değişimi",
      "Habsburg ülkesinin Osmanlı’ya katılmasını",
      "Avrupa’daki bütün mezheplerin birleşmesini",
    ],
    2,
    "Denk kabul edilme fiilinin toprak mı yoksa statü mü düzenlediğini belirle.",
    "Protokol eşitliği siyasi/diplomatik statüyle ilgilidir. Toprak devri ayrı kanıt ister; verilen maddeden denizcilik sonu, ilhak veya mezhep birliği sonucu çıkmaz.",
    "statü-ve-toprak",
  ),
  question(
    "f93h-b2",
    "Bu bilgilerden hangisi çıkarılamaz?",
    [
      "Osmanlı eş zamanlı sorunlarla uğraşmaktadır.",
      "Safeviler koşulları fırsat olarak değerlendirmiştir.",
      "Farklı cepheler birbirini etkileyebilir.",
      "Safeviler Habsburglarla ortak ordu kurmuştur.",
      "Ek bilgi olmadan ittifak iddiası kurulamaz.",
    ],
    3,
    "Fırsattan yararlanmakla ortak hareket için açık kanıt bulunmasını ayır.",
    "Ortak ordu ve ittifak için koordinasyon kanıtı gerekir; metin yalnız koşullardan yararlanmayı verir. Diğer seçenekler çok cephelilik ve kanıt sınırıyla uyumludur.",
    "kanıtsız-ittifak",
    "Safeviler, Osmanlı’nın Habsburg savaşı ve içerideki isyanlarla uğraştığı sırada sınırdaki bazı bölgeleri geri aldı. Bu anlatımda ortak karar veya iki rakip arasında koordinasyon bilgisi yoktur.",
  ),
  question(
    "f93h-b3",
    "1639 Kasr-ı Şirin Antlaşması’nın temel bağlamı hangisidir?",
    [
      "Osmanlı–Safevi ilişkilerinde doğu sınırının ana çerçevesi",
      "Osmanlı–Rusya ilişkilerinde Azak’ın 1700’de bırakılması",
      "Otuz Yıl Savaşları’nın Avrupa’da sona ermesi",
      "Kıbrıs’ın Venedik’ten alınması",
      "Bütün Avrupa devletlerinin tek ülkede birleşmesi",
    ],
    0,
    "Doğu sınırıyla Avrupa din savaşlarını farklı cephelere yerleştir.",
    "Kasr-ı Şirin Osmanlı–Safevi sınır düzenidir; bütün gelecekteki sorunların kesin sonu değildir. Azak/İstanbul, Westphalia ve Kıbrıs başka dönem ve ilişkilerdir; Avrupa birliği sonucu da yoktur.",
    "antlaşma-taraf",
  ),
  question(
    "f93h-b4",
    "1648 Westphalia barışlarıyla ilgili hangi değerlendirme doğrudur?",
    [
      "Osmanlı’nın Safevilerle yaptığı ilk antlaşmadır.",
      "Avrupa’daki Otuz Yıl Savaşları’nı bitiren ve çok taraflı diplomasi bakımından önemli bir düzenlemedir.",
      "Osmanlı bu barışlarla bütün Balkanları Rusya’ya bırakmıştır.",
      "Dinin bütün ülkelerde aynı gün etkisizleştiğini kanıtlar.",
      "Bütün Avrupa’yı tek hükümdara bağlamıştır.",
    ],
    1,
    "Osmanlı’nın imzaladığı antlaşmayla Avrupa bağlamındaki gelişmeyi ayır.",
    "Westphalia Avrupa’daki 1648 barışlarıdır; Osmanlı imzacı değildir. Çok taraflı diplomasi ve egemenlik bakımından önemlidir, fakat tek günde tam laiklik veya siyasi birlik gibi mutlak sonuçlar doğurduğu söylenemez.",
    "avrupa-bağlamı",
  ),
  question(
    "f93h-b5",
    "Bu gelişmeler için doğru değerlendirme hangisidir?",
    [
      "Rusya 1699 Karlofça’nın bütün maddelerini aynı tarihte imzalamıştır.",
      "Karlofça Safevi sınırını belirleyen 1639 antlaşmasıdır.",
      "İstanbul barışı Venedik’le yalnız Girit için yapılmıştır.",
      "Koalisyona katılan bütün devletler her barışın aynı taraflarıdır.",
      "Savaşta aynı koalisyonda yer almakla aynı antlaşmayı imzalamak farklıdır.",
    ],
    4,
    "İki ayrı tarih ve iki ayrı barış işlemini koru.",
    "Rusya’yla 1700 İstanbul barışı, 1699 Karlofça’dan ayrıdır. Savaş koalisyonu otomatik olarak aynı barışın imzacı listesi değildir. Diğer seçenekler taraf, tarih veya cepheyi karıştırır.",
    "savaş-ve-antlaşma",
    "Rusya Kutsal İttifak savaşlarında Osmanlı’ya karşı yer aldı. 1699 Karlofça’dan sonra Osmanlı ile Rusya 1700 İstanbul Antlaşması’nı yaptı; Azak Rusya’ya bırakıldı.",
  ),
  question(
    "f93h-b6",
    "Açık denizde uzun menzil, rüzgârla hareket ve ağır top kullanımının önem kazandığı koşullarda hangi çıkarım uygundur?",
    [
      "Kürekle hareket eden gemiler her görevde otomatik üstün olur.",
      "Rüzgâr ve ikmal koşullarının hiçbir etkisi yoktur.",
      "Kalyonun önemi artabilir; bu her koşulda üstün olduğu anlamına gelmez.",
      "Tek bir gemi türü bütün dönemlerde aynı sonucu sağlar.",
      "Deniz savaşlarında eğitimli personele ihtiyaç kalmaz.",
    ],
    2,
    "Teknik aracın değerini görev ve çevre koşuluna bağla.",
    "Bu koşullar yelkenli ve top gücü yüksek kalyonun önemini artırır. Dar kıyı suları veya rüzgârsızlık gibi koşullar farklı olabilir; teknik tercih personel ve ikmal ihtiyacını yok etmez.",
    "koşullu-teknoloji",
  ),
  question(
    "f93h-b7",
    "1711 Prut’ta Azak’ın geri alınmasından hangi sonuç çıkarılamaz?",
    [
      "Rusya’yla ilişkide bir kazanım elde edilmiştir.",
      "1700’deki Azak kaybı bakımından değişim olmuştur.",
      "Aynı yüzyılda farklı yönlü sonuçlar yaşanabilir.",
      "Karlofça’da kaybedilen bütün bölgeler geri alınmıştır.",
      "Tek bir yerin kazanımı bütün cepheleri açıklamaz.",
    ],
    3,
    "Bir kalenin geri alınmasını bütün antlaşma kayıplarının giderilmesine genişletme.",
    "Azak’ın geri alınması Rusya cephesindeki somut kazanımdır. Karlofça’da başka taraflara bırakılan bütün yerlerin aynı işlemle geri alındığı söylenmez; ilk üç ve son seçenek bu sınırı korur.",
    "kapsam-denetimi",
  ),
  question(
    "f93h-b8",
    "1739 Belgrad Antlaşmaları’nın Osmanlı bakımından görece elverişli olması hangi genellemeyi sınırlar?",
    [
      "XVIII. yüzyıldaki bütün antlaşmalar aynı yönde kayıptır.",
      "Antlaşmalar kendi savaş koşullarında incelenmelidir.",
      "Aynı dönemde farklı sonuçlar bulunabilir.",
      "Diplomatik maddeler taraflarına göre okunmalıdır.",
      "Kazanım bütün sorunların sonsuza dek bitmesi demek değildir.",
    ],
    0,
    "Soru doğru yöntemi değil yanlış mutlak genellemeyi soruyor.",
    "Elverişli 1739 sonuçları, bütün XVIII. yüzyıl antlaşmalarının kayıp olduğu iddiasına karşı örnektir. Diğer seçenekler bu farklılığı incelemeye izin veren doğru yöntem ifadeleridir.",
    "karşı-örnek",
  ),
  question(
    "f93h-b9",
    "1774 Küçük Kaynarca’da Kırım’a siyasi bağımsızlık tanınması için doğru yorum hangisidir?",
    [
      "Kırım aynı maddede doğrudan Rusya’ya ilhak edilmiştir.",
      "Bağımsızlık ile başka devlete ilhak farklı statü değişiklikleridir.",
      "Kırım’ın statüsünde hiçbir değişiklik olmamıştır.",
      "Antlaşma Osmanlı ile Venedik arasında yapılmıştır.",
      "Bu madde bütün Rus savaş gemilerine her koşulda serbest geçiş demektir.",
    ],
    1,
    "Statü sözcüğünü sonraki olayın yerine kullanma.",
    "Siyasi bağımsızlık doğrudan başka devlete katılmak değildir; sonraki ilhakla aynı tarihe konulamaz. Antlaşma Rusya’yla yapılmıştır; statü maddesinden sınırsız askerî geçiş sonucu da çıkmaz.",
    "bağımsızlık-ilhak",
  ),
  question(
    "f93h-b10",
    "Bu açıklamada doğrudan verilen ara mekanizma hangisidir?",
    [
      "Aynı sıradaki her olayın tek neden olması",
      "Bir zaferle bütün mali baskının kendiliğinden kalkması",
      "Her rakibin zorunlu olarak aynı ittifaka girmesi",
      "Bütün antlaşmaların yalnız toprak devri içermesi",
      "Eş zamanlı cephelerin kaynak ve ikmal ihtiyacını artırması",
    ],
    4,
    "Başlangıç koşuluyla sonucu bağlayan ortadaki açıklamayı bul.",
    "Çok cephelilik insan, para ve ikmal baskısı üzerinden barış arayışını artırabilir. Bu mekanizma tek neden veya kaçınılmaz sonuç iddiası değildir. Diğer seçenekler metinde olmayan mutlak genellemeler ekler.",
    "nedensel-mekanizma",
    "Birden fazla cephede savaşan devlet daha çok asker, para ve ikmale ihtiyaç duyabilir. Kaynak baskısı büyüdükçe bazı cephelerde kısa vadeli barış arayışı önem kazanabilir. Bu açıklama, her barışın yalnız tek nedenle yapıldığını ileri sürmez.",
  ),
];
const banks: Record<string, Question[]> = {
  [centreGuide.id]: centreQuestions,
  [societyGuide.id]: societyQuestions,
  [balanceGuide.id]: balanceQuestions,
};
export const forge093HistoryLessons: Lesson[] = forge093HistoryGuides.map(
  (g) => ({
    id: g.id,
    subjectId: "tyt-tarih",
    title: txt(
      g.id === centreGuide.id
        ? "Sultan ve Osmanlı Merkez Teşkilatı"
        : g.id === societyGuide.id
          ? "Klasik Çağda Osmanlı Toplum Düzeni"
          : "Değişen Dünya Dengeleri Osmanlı",
    ),
    minutes: g.minutes,
    objectives: g.objectives.map(txt),
    body: g.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: banks[g.id],
    source: txt(g.source),
    tags: [forge093HistoryTopics[g.id], "Osmanlı", "kaynaklı öğretim", "kanıt"],
  }),
);

export interface History093Case {
  name: string;
  evidence: string;
  nodes: [string, string, string];
  choices: string[];
  answer: number;
  result: string;
  explanation: string;
  limit: string;
  year?: number;
  domain?: string;
}
export const history093Cases: Record<string, History093Case[]> = {
  [centreGuide.id]: [
    {
      name: "Arazi ve tuğra kaydı",
      evidence:
        "Bir kayıt arazinin tahririni ve fermanlara padişah tuğrasının çekilmesini konu alıyor. Bunu hangi uzmanlıkla eşleştirirsin?",
      nodes: ["Arazi / tuğra", "Görevli", "Klasik görev alanı"],
      choices: ["Defterdar", "Nişancı", "Kazasker"],
      answer: 1,
      result: "Arazi ve tuğra → nişancı → kalemiye",
      explanation:
        "Burada defterin içeriği arazi ve belge düzenidir. Aynı defter sözcüğü hazine gelir–gideri olsaydı görevli değişirdi.",
      limit:
        "Bu, klasik görev dağılımı şemasıdır; unvanların kapsamı bütün yüzyıllarda aynı kalmaz.",
    },
    {
      name: "Maliye kaydı",
      evidence:
        "Aynı kurulda bu kez hazine gelir ve giderlerinin hesabı ele alınıyor. Kayıt işinin içeriği değişince görevli hangisi olur?",
      nodes: ["Gelir / gider", "Görevli", "Klasik görev alanı"],
      choices: ["Defterdar", "Nişancı", "Kazasker"],
      answer: 0,
      result: "Gelir–gider → defterdar → kalemiye",
      explanation:
        "Belirleyici içerik maliyedir. Nişancının arazi ve tuğra işleviyle ortak kayıt aracı bulunması görevleri aynı yapmaz.",
      limit:
        "Bir kurulda farklı görevler görüşülebilir; her üye bütün işleri tek başına yapmaz.",
    },
    {
      name: "Eğitim ve yargı kadrosu",
      evidence:
        "Kadı ve müderrislerin atanmasıyla ilgili bir iş ele alınıyor. Burada fetva değil atama fiili belirleyicidir.",
      nodes: ["Kadı / müderris", "Görevli", "Klasik görev alanı"],
      choices: ["Defterdar", "Şeyhülislam", "Kazasker"],
      answer: 2,
      result: "Kadı–müderris ataması → kazasker → ilmiye",
      explanation:
        "Atama ve hukuk–eğitim kadroları kazaskeri ayırt eder. Dinî alandan bir sözcüğün bulunması her işi şeyhülislama verdirmez.",
      limit: "Fetva, atama ve mahkeme hükmü ayrı fiillerdir.",
    },
    {
      name: "Divan ve son onay",
      evidence:
        "Fatih döneminden sonra devlet işleri sadrazamın başkanlığındaki Divanda görüşülüyor. Sadrazam padişahın vekilidir. Kararların uygulanmasındaki son onay hangi makamla ilişkilidir?",
      nodes: ["Divanda görüşme", "Onay makamı", "Yetki ilişkisi"],
      choices: ["Padişah", "Nişancı", "Defterdar"],
      answer: 0,
      result: "Divanda görüşme → sadrazamın vekâleti → padişahın onayı",
      explanation:
        "Başkanlığın sadrazama geçmesi hükümdarın en üst siyasi otoritesinin sona ermesi değildir. Kurul, başkan ve onay makamının işlevleri ayrı tutulmalıdır.",
      limit:
        "Bu ilişkiyi modern kuvvetler ayrılığı veya seçilmiş parlamento düzeniyle özdeşleştirme.",
      domain: "Vekâlet ve son onay",
    },
  ],
  [societyGuide.id]: [
    {
      name: "Müslüman terzi",
      evidence:
        "Şehirde terzilik yapan Müslüman kişi bu örnekte üretip vergi veren yönetilendir; devlet görevi bulunmaz.",
      nodes: ["Müslüman", "Reaya", "Şehirli esnaf"],
      choices: ["Reaya", "Askerî sınıf", "Dinî cemaat"],
      answer: 0,
      result:
        "Görev–vergi: reaya; meslek: şehirli esnaf; dinî aidiyet: Müslüman",
      explanation:
        "Bir kişide üç farklı eksen aynı anda bulunabilir. Meslek ile dinî aidiyet aynı sınıflandırma değildir.",
      limit:
        "Bu senaryoda statü açıkça verilmiştir; bütün kişilerin statüsü yalnız mesleğinden çıkarılmaz.",
    },
    {
      name: "Gayrimüslim terzi",
      evidence:
        "Şehirde terzilik yapan gayrimüslim kişi bu örnekte üretip vergi veren yönetilendir; devlet görevi bulunmaz.",
      nodes: ["Gayrimüslim", "Reaya", "Şehirli esnaf"],
      choices: ["Reaya", "Askerî sınıf", "Dinî cemaat"],
      answer: 0,
      result:
        "Görev–vergi: reaya; meslek: şehirli esnaf; dinî aidiyet: gayrimüslim",
      explanation:
        "Önceki terziye göre yalnız dinî aidiyet değişti. Bu durum aynı mesleğin ve aynı görev–vergi grubunun farklı inançlarla birleşebildiğini gösterir.",
      limit:
        "Dinî cemaatlere tanınan yetkilerin ayrıntısı dönem ve yere göre değişebilir.",
    },
    {
      name: "Müslüman kadı",
      evidence:
        "Müslüman bir kadı mahkemede görev yapıyor. Burada kişinin devlet hizmeti ve hukuk görevi, dinî aidiyetinden ayrı bir eksendir.",
      nodes: ["Müslüman", "Askerî sınıf / ilmiye", "Hukuk hizmeti"],
      choices: ["Reaya", "Askerî sınıf", "Dinî cemaat"],
      answer: 1,
      result:
        "Görev–vergi: askerî sınıf; hizmet: ilmiye; dinî aidiyet: Müslüman",
      explanation:
        "Askerî sınıf yalnız savaşçılar değildir; kadının hukuk görevi de bu geniş hizmet statüsü içinde ele alınır. Müslüman terziyle aynı inanç aynı görev statüsünü gerektirmez.",
      limit:
        "Askerî sınıf burada tarihsel yönetici/hizmet statüsüdür, yalnız bugünkü ordu anlamında kullanılmaz.",
    },
  ],
  [balanceGuide.id]: [
    {
      name: "1606 · Zitvatorok",
      year: 1606,
      evidence:
        "Habsburg hükümdarı protokol bakımından Osmanlı padişahına denk kabul ediliyor. Bu madde doğrudan hangi değişim türünü gösterir?",
      nodes: ["Uzun savaş", "Protokol maddesi", "Değişen ilişki"],
      choices: [
        "Diplomatik statü",
        "Doğrudan bütün toprakların devri",
        "Deniz teknolojisi",
      ],
      answer: 0,
      result:
        "Zitvatorok: değişen ilişki diplomatik statü ve karşılıklılıktır.",
      explanation:
        "Denk kabul edilme protokolü düzenler. Toprak devri başka bir madde ve kanıt gerektirir.",
      limit: "Askerî zafer ile diplomatik protokol aynı gösterge değildir.",
    },
    {
      name: "1639 · Kasr-ı Şirin",
      year: 1639,
      evidence:
        "Osmanlı–Safevi savaşlarından sonra doğu sınırının ana çerçevesi düzenleniyor. Bu sonucun türü nedir?",
      nodes: ["Doğu savaşları", "Sınır maddesi", "Değişen ilişki"],
      choices: [
        "Avrupa’da din savaşlarının bitişi",
        "Sınır çerçevesi",
        "Rusya’ya Azak devri",
      ],
      answer: 1,
      result: "Kasr-ı Şirin: doğuda Osmanlı–Safevi sınır çerçevesi.",
      explanation:
        "Taraf ve coğrafya Safevi cephesidir; Westphalia ve 1700 İstanbul başka ilişkilerdir.",
      limit:
        "Ana çerçevenin belirlenmesi bütün sorunların sonsuza dek bittiği anlamına gelmez.",
    },
    {
      name: "1699 · Karlofça",
      year: 1699,
      evidence:
        "Uzun Kutsal İttifak savaşları sonrasında Avusturya, Lehistan ve Venedik’e geniş topraklar bırakılıyor. Temel değişim türü hangisidir?",
      nodes: ["Uzun ittifak savaşı", "Toprak maddeleri", "Değişen ilişki"],
      choices: [
        "Yalnız gemi biçimi",
        "Yalnız hanedan veraseti",
        "Toprak ve siyaset dengesi",
      ],
      answer: 2,
      result:
        "Karlofça: büyük toprak kaybı ve savunma/diplomasi ihtiyacının artması.",
      explanation:
        "Kanıt toprak maddelerini ve uzun savaş koşullarını birlikte verir. Rusya’yla barış 1700 İstanbul’da ayrıca yapılmıştır.",
      limit:
        "Kutsal İttifak’a katılmakla Karlofça’nın doğrudan tarafı olmak aynı liste değildir.",
    },
    {
      name: "1739 · Belgrad",
      year: 1739,
      evidence:
        "Avusturya ve Rusya ile savaşların ardından Belgrad’ın geri alınması dahil Osmanlı açısından görece elverişli koşullar oluşuyor.",
      nodes: ["Çok cepheli savaş", "Elverişli barış", "Değişen ilişki"],
      choices: [
        "Bütün antlaşmalar kayıptır",
        "Bütün rakipler yok oldu",
        "Dönem içinde geri kazanım vardır",
      ],
      answer: 2,
      result:
        "Belgrad: XVIII. yüzyılda da geri kazanım ve elverişli düzenleme mümkündür.",
      explanation:
        "Bu örnek her antlaşmanın aynı yönde kayıp olduğu genellemesini sınırlar; bütün sorunların kalıcı olarak bittiğini ise kanıtlamaz.",
      limit:
        "Bir karşı örnek yanlış mutlak genellemeyi bozar, ters yönde yeni bir mutlak genelleme kurdurmaz.",
    },
    {
      name: "1774 · Küçük Kaynarca",
      year: 1774,
      evidence:
        "Kırım’a siyasi bağımsızlık tanınıyor; Rusya ticari haklar ve siyasi nüfuz bakımından güçleniyor.",
      nodes: ["Osmanlı–Rus savaşı", "Kırım statüsü", "Değişen ilişki"],
      choices: [
        "Kırım aynı gün Rusya’ya ilhak edildi",
        "Siyasi bağımsızlık ve artan Rus nüfuzu",
        "Kırım’ın statüsü değişmedi",
      ],
      answer: 1,
      result:
        "Küçük Kaynarca: Kırım’ın siyasi bağımsızlığı; ilhakla aynı şey değildir.",
      explanation:
        "Bağımsızlık başka devlete katılmak değildir. Sonraki ilhakı 1774’ün yerine taşımak kronolojiyi bozar.",
      limit:
        "Ticaret haklarından bütün savaş gemilerine koşulsuz serbestlik sonucu çıkarılmaz.",
    },
  ],
};
