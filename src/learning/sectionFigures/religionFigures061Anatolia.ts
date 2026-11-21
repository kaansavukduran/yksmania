import type { FigureDef } from "./figureKit";
import { flowFig, tableFig, timelineFig, treeFig } from "./turkishFigures060Kit";

/*
 * Forge061 TYT Din Kültürü · Anadolu’da İslam ve tasavvufi yorumlar. Ad, eser,
 * yer ve tarih yalnız bölüm metninden alınır; geleneklerin yalnız bölümde
 * anılan yönleri gösterilir. Şemalar sınıflama ve okuma desteğidir; hiçbir
 * gelenek ya da topluluk hakkında değer hükmü vermez, taraf tutmaz.
 */

// anadoluda-islam · 1 · Süreç çizelgesi (ölçekli değil).
const process = timelineFig({
  caption:
    "Türk topluluklarının İslam’la temasından Anadolu’ya uzanan süreç, bölümdeki duraklarla sıralı (ölçekli değil). Bir durağa tıkla: o aşamada neyin anlatıldığı ve hangi sonucun çıkmadığı açılır. Önemli bir dönemeç tek ve yeterli neden değildir.",
  alt: "Düşey zaman çizelgesi, dört durak: Emevi ve Abbasi dönemlerinde Maveraünnehir temasları; 751 Talas Savaşı; İdil Bulgarları, Karahanlılar ve Satuk Buğra Han; Selçuklu dönemi ve Anadolu’ya göçler.",
  eras: [
    { when: "Emevi ve Abbasi dönemleri", head: "Maveraünnehir temasları", text: "Seyhun ile Ceyhun arası; Buhara ve Semerkant", tone: "muted", detail: ["Maveraünnehir Seyhun ve Ceyhun nehirleri arasında kalan tarihî bölgedir; ticaret, şehir hayatı ve kişisel ilişkiler de etkili olabilir."] },
    { when: "751", head: "Talas Savaşı", text: "Abbasilerle ilişkide önemli dönemeç", tone: "c", detail: ["Savaş sonrası artan temas ve iş birliği İslamlaşma tarihinin unsurlarından biridir; bütün Türklerin o gün Müslüman olduğu sonucu çıkmaz."] },
    { when: "farklı hızlarda", head: "İdil Bulgarları, Karahanlılar", text: "Satuk Buğra Han Karahanlı tarihiyle ilişkili", tone: "b", detail: ["Toplulukların yeni dinle tanışma ve benimseme süreçleri aynı hızda ilerlememiştir; bir topluluğun sürecini başkasının yerine koyma."] },
    { when: "Selçuklu dönemi ve sonrası", head: "Anadolu’ya göç ve aktarım", text: "zanaatkâr, tüccar, âlim ve dervişler; eser, öğüt, kurum", tone: "a", detail: ["Göçlerle gelenler farklı birikimleri eser, sözlü öğüt ve kurumlar aracılığıyla taşımıştır; insan hareketi ile fikir dolaşımı ayrı ama ilişkili süreçlerdir."] },
  ],
  foot: "Savaş, ticaret, göç, eğitim ve toplulukların ilişkileri süreci birlikte etkiler.",
});

// anadoluda-islam · 2 · Fütüvvet, Ahilik, fütüvvetname.
const levels = tableFig({
  caption:
    "Üç terim üç ayrı düzeydedir: bir değerler bütünü, bir meslek örgütü ve bir yazılı metin türü. Bir terime tıkla: neyi adlandırdığı ve karıştırılan nokta açılır.",
  alt: "Üç satırlı tablo. Fütüvvet: değerler bütünü; cömertlik, mertlik, dayanışma, hak gözetme. Ahilik: esnaf ve zanaatkârların meslek örgütü; eğitim, çalışma ahlakı, yardımlaşma. Fütüvvetname: anlayışın adap, ilke ve kurallarını anlatan yazılı metin.",
  cols: [
    { name: "Terim", w: 3.3 },
    { name: "Düzey", w: 2.4 },
    { name: "Bölümdeki içerik", w: 4.3 },
  ],
  rows: [
    { cells: ["Fütüvvet", "değerler bütünü", "cömertlik, mertlik, dayanışma, hak gözetme"], tones: [undefined, "c", "muted"], detail: ["Fütüvvet Ahi teşkilatındaki meslek ahlakının önemli dayanaklarındandır.", "Cömert davranan her kişi tarihî Ahi teşkilatının kayıtlı üyesi sayılamaz."] },
    { cells: ["Ahilik", "meslek örgütü", "meslek eğitimi, çalışma ahlakı, yardımlaşma"], tones: [undefined, "b", "muted"], detail: ["Ahilik Anadolu’da esnaf ve zanaatkârların meslek eğitimi, çalışma ahlakı ve yardımlaşmasıyla ilişkilidir.", "Temel görev ile dolaylı etki ayrı değerlendirilir."] },
    { cells: ["Fütüvvetname", "yazılı metin", "adap, ilke ve kurallar"], tones: [undefined, "a", "muted"], detail: ["Fütüvvetname bu anlayışın adap, ilke ve kurallarını anlatan yazılı metin adıdır."] },
  ],
  foot: "Ortak ahlaki ilke, kurumların birebir aynı tarihî örgüt olduğunu tek başına kanıtlamaz.",
});

// anadoluda-islam · 3 · Usta-kalfa-çırak.
const guild = flowFig({
  caption:
    "Ahilikte beceri usta, kalfa ve çırak ilişkisiyle kuşaktan kuşağa aktarılır. İleri ile aktarım zincirini aç. Kurumu yalnız iyi niyetle değil, hangi işi kimin nasıl öğrendiğiyle açıkla.",
  alt: "Üç kart alt alta, oklarla bağlı: usta, beceriyi ve meslek ahlakını öğretir; kalfa, öğrenir ve aktarır; çırak, işi öğrenmeye başlar. Altta güvenilir üretim ve ticari dürüstlük.",
  nodes: [
    { head: "Usta", text: "beceriyi ve çalışma ahlakını öğretir", tone: "c", note: "Usta-kalfa-çırak ilişkisi becerinin kuşaktan kuşağa aktarılmasına katkı sağlar." },
    { head: "Kalfa", text: "öğrendiğini sürdürür, çırağa aktarır", tone: "b", note: "Aktarım tek bir derste değil, iş yerindeki süreğen ilişkide olur." },
    { head: "Çırak", text: "işi ve meslek ahlakını öğrenir", tone: "a", note: "Meslek eğitimi ile toplumsal dayanışma bölümde birlikte ele alınır." },
    { head: "Toplumsal bağ", text: "güvenilir üretim ve ticari dürüstlük", tone: "muted", note: "Güvenilir üretim ve ticari dürüstlük toplumsal hayatla bağ kurar; şehirdeki etki her siyasî işin kurumun ana programı olduğunu göstermez." },
  ],
  steps: ["Usta", "Kalfa", "Çırak", "Toplumsal bağ"],
  reveal: true,
  foot: "Temel görev (meslek eğitimi ve dayanışma) ile dolaylı etki ayrı değerlendirilir.",
});

// anadoluda-islam · 4 · Âlimler: alan ve eser.
const scholars = tableFig({
  caption:
    "Bölümde anılan âlimlerin öne çıkan alanı ve eserleri. Bir ada tıkla: kişi-eser bağı ve okuma uyarısı açılır. Alanın baskın örneği kişinin bütün eser listesi değildir; aynı şahsiyet birden çok alanda etkili olabilir.",
  alt: "Beş satırlı tablo. Ebû Hanîfe: fıkıh, Hanefî gelenek. Cafer es-Sâdık: hadis ve fıkıh, Caferî gelenek. Mâtürîdî: kelam ve tefsir, Kitâbü’t-Tevhîd, Te’vîlâtü’l-Kur’an. Şâfiî: fıkıh usulü, er-Risâle, el-Ümm. Eş’arî: kelam, Makâlâtü’l-İslâmiyyîn.",
  cols: [
    { name: "Âlim", w: 2.9 },
    { name: "Öne çıkan alan", w: 3.0 },
    { name: "Eser ya da gelenek", w: 4.1 },
  ],
  rows: [
    { cells: ["Ebû Hanîfe", "fıkıh, içtihat", "Hanefî fıkıh geleneği"], tones: [undefined, "c", "muted"], detail: ["Asıl adı Numan bin Sabit; İmam-ı Âzam adıyla da anılır. İnanç meseleleri üzerine görüş ve eserleri de bulunur."] },
    { cells: ["Cafer es-Sâdık", "hadis, fıkıh", "Caferî fıkıh geleneği"], tones: [undefined, "c", "muted"], detail: ["Farklı İslam çevrelerinde saygıyla anılır; İmamiye çerçevesiyle de tarihî ve düşünsel bağı bulunur.", "Fıkhi gelenek ile itikadi-siyasi çerçeveyi tek tanım yapma."] },
    { cells: ["Mâtürîdî", "kelam, tefsir", "Kitâbü’t-Tevhîd; Te’vîlâtü’l-Kur’an"], tones: [undefined, "b", "muted"], detail: ["Semerkant çevresinde yetişmiştir; akıl, duyular ve doğru haber bilgi kaynakları arasında ele alınır.", "Akla yer verilmesi vahyin dışlandığı anlamına gelmez."] },
    { cells: ["Şâfiî", "fıkıh usulü", "er-Risâle; el-Ümm"], tones: [undefined, "c", "muted"], detail: ["Fıkıh usulünün sistemleştirilmesindeki katkısıyla tanınır; er-Risâle yöntem, el-Ümm fıkıh birikimiyle ilişkilidir."] },
    { cells: ["Eş’arî", "kelam", "Makâlâtü’l-İslâmiyyîn"], tones: [undefined, "b", "muted"], detail: ["İnanç esaslarının açıklanması ve savunulmasındaki çalışmalarıyla tanınır; Eş’arîlik ve Mâtürîdîlik Ehlisünnet içindeki itikadi geleneklerdir.", "İki geleneğin bulunması mensuplarının her konuda zıt olduğu anlamına gelmez."] },
  ],
  foot: "Eser adındaki benzer kelimeden yazar tahmin etme; açık kişi-eser bağını öğren.",
});

// anadoluda-islam · 5 · Şahsiyet, yer ve eser.
const figures = tableFig({
  caption:
    "Kişi, yer ve eser üç ayrı ilişkidir: yaşanan şehir, eserin okunduğu yer ve sonraki kurumların yayıldığı bölge aynı şey değildir. Bir şahsiyete tıkla: bölümdeki ipuçları ve kanıt uyarısı açılır.",
  alt: "Yedi satırlı tablo. Ahmed Yesevî: Türkistan, Yesi; Divân-ı Hikmet. Mevlânâ: Konya; Mesnevî, Divân-ı Kebîr, Fîhi Mâ Fîh. Ahi Evran: Kırşehir; esnaf teşkilatlanması. Hacı Bektaş-ı Velî: Sulucakarahöyük; Makâlât. Yunus Emre: Divan, Risâletü’n-Nushiyye. Sarı Saltuk: Dobruca; Saltuknâme. Hacı Bayrâm-ı Velî: Ankara; Somuncu Baba.",
  cols: [
    { name: "Şahsiyet", w: 2.9 },
    { name: "Bölümdeki yer", w: 3.8 },
    { name: "Eser ya da ipucu", w: 3.3 },
  ],
  rows: [
    { cells: ["Ahmed Yesevî", "Türkistan, Yesi", "hikmetler, Divân-ı Hikmet"], tones: [undefined, "b", "muted"], detail: ["Dinî ve ahlaki öğütleri sade Türkçeyle aktarmıştır.", "Öğretinin Anadolu ve Balkanlar’da etkili olması Yesevî’nin oralarda yaşadığını kanıtlamaz."] },
    { cells: ["Mevlânâ", "Konya", "Mesnevî, Divân-ı Kebîr, Fîhi Mâ Fîh"], tones: [undefined, "b", "muted"], detail: ["Âlim, mutasavvıf ve şairdir; Mevlevilik mirasının sonraki kurumsallaşmasıyla ilişkilidir.", "Eserlerin başka ülkelerde okunması oralarda doğduğunu göstermez."] },
    { cells: ["Ahi Evran", "Kırşehir", "esnaf teşkilatlanması, meslek ahlakı"], tones: [undefined, "b", "muted"], detail: ["Ahiliğin Anadolu’daki gelişiminde etkili âlim ve mutasavvıftır.", "Kırşehir’de geçen her olay onunla ilgili değildir."] },
    { cells: ["Hacı Bektaş-ı Velî", "Sulucakarahöyük", "Makâlât; Horasan erenleri"], tones: [undefined, "b", "muted"], detail: ["İnsana saygı, ahlaki eğitim ve kişinin eline, diline, davranışlarına sahip olması öğretileriyle tanınır.", "Bektaşilik onun adına gelişen tarihî mirastır."] },
    { cells: ["Yunus Emre", "farklı makamlar", "Divan, Risâletü’n-Nushiyye"], tones: [undefined, "b", "muted"], detail: ["Dinî ve ahlaki anlamları halkın anlayacağı Türkçeyle işler; Tapduk Emre’yle ilişkisi gelenekte anılır.", "Makam, hatıra ve tarihî mezar bilgisini ayır."] },
    { cells: ["Sarı Saltuk", "Anadolu, Balkanlar, Dobruca", "Saltuknâme"], tones: [undefined, "b", "muted"], detail: ["Dinî-kültürel etkiyle ilişkili alperendir; Saltuknâme menkıbeleri de içeren edebî mirastır.", "Menkıbe her ayrıntısıyla bağımsız tarihî belgeyle aynı kanıt türünde değildir."] },
    { cells: ["Hacı Bayrâm-ı Velî", "Ankara", "Somuncu Baba; yardımlaşma"], tones: [undefined, "b", "muted"], detail: ["Öğretim hayatı ve toplumsal yardımlaşmayla ilişkilidir; üretim ve yoksula yardım öğretisinin toplumsal boyutudur.", "Yardımlaşma tek başına ayırt edici değildir; Ankara ve açık isim gibi ek kanıt gerekir."] },
  ],
  foot: "Kişi-eser-yer tablosunda her oku ayrı gerekçeyle kur.",
});

// islam-dusuncesinde-tasavvufi-yorumlar · 1 · Üç dönem.
const sufiEras = timelineFig({
  caption:
    "Ders anlatımındaki üç tarihsel dönem ve anılan adlar, sıralı (ölçekli değil). Bir döneme tıkla: ayırt edici özelliği açılır. Bu dönemlendirme bütün bölgelerde aynı gün başlayan bir takvim değildir.",
  alt: "Düşey çizelge, üç durak: zühd dönemi, sade yaşayış, Hasan-ı Basrî ve Râbia; tasavvuf dönemi, kavram, yöntem ve klasik eserler, Cüneyd-i Bağdâdî ve Gazzâlî; tarikat dönemi, düzenli rehberlik ve kurumsal yapılar.",
  eras: [
    { when: "1. evre", head: "Zühd dönemi", text: "sade yaşayış; Hasan-ı Basrî, Râbia", tone: "muted", detail: ["Zühd dönemi sade yaşayışın belirginleşmesiyle açıklanır."] },
    { when: "2. evre", head: "Tasavvuf dönemi", text: "kavram, yöntem, klasik eser; Cüneyd-i Bağdâdî, Gazzâlî", tone: "b", detail: ["Tasavvuf dönemi kavramların, yöntemlerin ve klasik eserlerin belirginleşmesiyle açıklanır."] },
    { when: "3. evre", head: "Tarikat dönemi", text: "düzenli rehberlik ve kurumsal yapılar", tone: "c", detail: ["Tarikat dönemi düzenli rehberlik ve kurumsal yapıların belirginleşmesiyle açıklanır; tarikat öncüleri bu evrede anılır.", "Yalnız bir kişinin zikir yaptığını okumak kurumsal tarikat yapısının bulunduğunu kanıtlamaz."] },
  ],
  foot: "Metin yaşayışı mı, kavramsallaşmayı mı, örgütlenmeyi mi anlatıyor? Evreyi buna göre seç.",
});

// islam-dusuncesinde-tasavvufi-yorumlar · 2 · Nefis mertebeleri.
const nafs = flowFig({
  caption:
    "Bazı tasavvuf anlatılarındaki nefis mertebeleri, bölümdeki sırayla. İleri ile her mertebeyi aç. Bunlar manevi öğretinin kavramlarıdır; birkaç seçime bakarak birinin hangi mertebede olduğu hesaplanmaz.",
  alt: "Yedi kart alt alta: emmâre, kötülüğe yönelten; levvâme, yanlışını kınayan; mülhime, iyiliğe yöneliş ve ilham; mutmainne, huzura ermiş; râdiye, Allah’tan razı olan; mardiyye, Allah’ın razı olduğu; kâmile, olgunlaşmış nefis.",
  nodes: [
    { head: "Emmâre", text: "kötülüğe yönelten", tone: "muted", note: "Emmâre kötülüğe yönelten nefis olarak açıklanır." },
    { head: "Levvâme", text: "yanlışını kınayan", tone: "muted", note: "Levvâme yanlışını kınayan nefis olarak açıklanır." },
    { head: "Mülhime", text: "iyiliğe yöneliş ve ilham", tone: "b", note: "Mülhime iyiliğe yöneliş ve ilhamla açıklanır." },
    { head: "Mutmainne", text: "huzura ermiş nefis", tone: "b", note: "Mutmainne huzura ermiş nefis olarak açıklanır." },
    { head: "Râdiye", text: "Allah’tan razı olan", tone: "c", note: "Râdiye Allah’tan razı olan nefis olarak anlatılır." },
    { head: "Mardiyye", text: "Allah’ın razı olduğu", tone: "c", note: "Mardiyye Allah’ın razı olduğu nefis olarak anlatılır." },
    { head: "Kâmile", text: "olgunlaşmış nefis", tone: "a", note: "Kâmile olgunlaşmış nefis olarak anlatılır; insan-ı kâmil tasavvufta ahlaki olgunluk idealidir." },
  ],
  steps: ["Emmâre", "Levvâme", "Mülhime", "Mutmainne", "Râdiye", "Mardiyye", "Kâmile"],
  reveal: true,
  foot: "Mertebeler manevi öğretinin dilidir; bir ölçüm ya da puan cetveli değildir.",
});

// islam-dusuncesinde-tasavvufi-yorumlar · 3 · Gelenekler: kişi ve özgül veri.
const orders = tableFig({
  caption:
    "Bölümde anılan tasavvufi geleneklerin ilişkilendirildiği kişi ve özgül ipucu. Bir geleneğe tıkla: bölümdeki vurgu ve eşleştirme uyarısı açılır. Zikir, zühd ve güzel ahlak birçok gelenekte görülür; eşleştirmede kişi ve eser gibi özgül veri belirleyicidir.",
  alt: "Beş satırlı tablo. Yesevilik: Hoca Ahmed Yesevî, Türkçe hikmetler, Divân-ı Hikmet. Kadirilik: Abdülkadir Geylânî, Eşrefoğlu Rûmî, Müzekki’n-Nüfûs. Rifailik: Ahmed er-Rifâî, rehberlik ve eğitim aşamaları. Mevlevilik: Mevlânâ, Sultan Veled, Mesnevî. Nakşibendilik: Bahâeddin Nakşibend, kalbî zikir, halk içinde Hakk’la olmak.",
  cols: [
    { name: "Gelenek", w: 3.0 },
    { name: "Kişi", w: 3.0 },
    { name: "Özgül ipucu", w: 4.0 },
  ],
  rows: [
    { cells: ["Yesevilik", "Hoca Ahmed Yesevî", "Türkçe hikmetler, Divân-ı Hikmet"], tones: [undefined, "c", "muted"], detail: ["Türkistan çevresinde Türkçe hikmetler aracılığıyla ahlak, ibadet ve Hz. Peygamber sevgisinin anlatılması önem taşır."] },
    { cells: ["Kadirilik", "Abdülkadir Geylânî", "Eşrefoğlu Rûmî, Müzekki’n-Nüfûs"], tones: [undefined, "c", "muted"], detail: ["Tevazu, doğru söz, başkasına yük olmama ve Allah’ı anma vurgulanır; Anadolu’daki yayılışında Eşrefoğlu Rûmî anılır."] },
    { cells: ["Rifailik", "Ahmed er-Rifâî", "rehberlik ve eğitim aşamaları"], tones: [undefined, "c", "muted"], detail: ["Nefis terbiyesi, edep, zikir ve manevi eğitim öne çıkar.", "Tek bir tören görüntüsünden bütün geleneğin mahiyetini çıkarma."] },
    { cells: ["Mevlevilik", "Mevlânâ; Sultan Veled", "Mesnevî okuma, musiki, hüsn-i hat"], tones: [undefined, "c", "muted"], detail: ["Oğlu Sultan Veled’in düzenleme ve kurumsallaşmadaki rolü önemlidir.", "Eser yazarlığı ile sonradan gelişen kurumsal düzen ayrı katkılardır."] },
    { cells: ["Nakşibendilik", "Bahâeddin Nakşibend", "kalbî zikir, halk içinde Hakk’la olmak"], tones: [undefined, "c", "muted"], detail: ["Gizli veya kalbî zikir, zamanın değerini bilme ve davranışta ölçülülük vurgulanır.", "Her sessiz davranış zikir değildir; her zikir de yalnız bu geleneğe ait değildir."] },
  ],
  foot: "Kişi, eser ve gelenek zincirini birlikte doğrula.",
});

// islam-dusuncesinde-tasavvufi-yorumlar · 4 · Dört kapı.
const fourGates = tableFig({
  caption:
    "Makâlât’la ilişkili anlatımda dört kapı ve her kapıyla ilişkilendirilen unsurlar; her kapıya on makam düşer. Bir kapıya tıkla: bölümdeki unsurlar açılır. Kapı ve makam manevi eğitim dilidir; bina kapısı ya da kırk günlük süre değildir.",
  alt: "Dört satırlı tablo. Şeriat: iman, öğrenme ve ibadet. Tarikat: rehberlik ve hizmet. Marifet: edep ve kendini bilme. Hakikat: tevazu ve iyilik. Her kapıda on makam, toplam kırk.",
  cols: [
    { name: "Kapı", w: 2.6 },
    { name: "Bölümdeki unsurlar", w: 5.0 },
    { name: "Makam", w: 2.4 },
  ],
  rows: [
    { cells: ["Şeriat", "iman, öğrenme ve ibadet", "10"], tones: [undefined, "c", "muted"], detail: ["Şeriat kapısıyla iman, öğrenme ve ibadet gibi unsurlar ilişkilendirilir."] },
    { cells: ["Tarikat", "rehberlik ve hizmet", "10"], tones: [undefined, "b", "muted"], detail: ["Tarikat kapısıyla rehberlik ve hizmet gibi unsurlar ilişkilendirilir."] },
    { cells: ["Marifet", "edep ve kendini bilme", "10"], tones: [undefined, "a", "muted"], detail: ["Marifet kapısıyla edep ve kendini bilme gibi unsurlar ilişkilendirilir."] },
    { cells: ["Hakikat", "tevazu ve iyilik", "10"], tones: [undefined, "c", "muted"], detail: ["Hakikat kapısıyla tevazu ve iyilik gibi unsurlar ilişkilendirilir."] },
  ],
  foot: "4 kapı × 10 makam = 40 makam; bir metinde yalnız dört ad geçmesi her makamın ayrıntısını vermez.",
});

// islam-dusuncesinde-tasavvufi-yorumlar · 5 · On iki hizmet.
const twelve = treeFig({
  caption:
    "Cem hizmetlerinde on iki görev, bölümdeki iki gruba ayrılmış. Bir göreve tıkla: üstlendiği iş açılır. On iki hizmet bir görev düzenidir; katılımcı sayısının on iki olduğu anlamına gelmez, adlandırmada yerel farklılıklar olabilir.",
  alt: "İki dallı ağaç. Rehberlik ve düzen: mürşit veya dede, rehber, gözcü, çerağcı, zakir, süpürgeci. Hazırlık ve paylaşma: meydancı, niyazcı, ibrikçi, kapıcı, peyikçi, sakka.",
  root: "On iki hizmet",
  branches: [
    {
      label: "Rehberlik ve düzen",
      title: "Rehberlik ve düzen",
      tone: "c",
      detail: ["Erkânı yönetme, yol gösterme, düzen, aydınlatma, müzikli anlatım ve temizlik hizmetleri."],
      leaves: [
        { label: "mürşit / dede", title: "Mürşit veya dede", detail: ["Erkânı yönetir."] },
        { label: "rehber", title: "Rehber", detail: ["Yola hazırlıkta yol gösterir."] },
        { label: "gözcü", title: "Gözcü", detail: ["Düzen ve sükûneti gözetir."] },
        { label: "çerağcı", title: "Çerağcı veya delilci", detail: ["Aydınlatma hizmetini üstlenir."] },
        { label: "zakir", title: "Zakir", detail: ["Bağlama ve deyişlerle müzikli anlatımı üstlenir."] },
        { label: "süpürgeci", title: "Süpürgeci veya ferraş", detail: ["Temizlik hizmetini üstlenir."] },
      ],
    },
    {
      label: "Hazırlık ve paylaşma",
      title: "Hazırlık ve paylaşma",
      tone: "b",
      detail: ["Meydanın düzeni, lokma, su, güvenlik ve duyuru hizmetleri."],
      leaves: [
        { label: "meydancı", title: "Meydancı", detail: ["Meydanı ve postları düzenler."] },
        { label: "niyazcı", title: "Niyazcı veya lokmacı", detail: ["Lokma hizmetinde görev alır."] },
        { label: "ibrikçi", title: "İbrikçi veya tezekkâr", detail: ["Temizlik ve su hizmetinde görev alır; sakkayla her bağlamda aynı görev sayılmaz."] },
        { label: "kapıcı", title: "Kapıcı", detail: ["Güvenlikle ilişkilendirilir."] },
        { label: "peyikçi", title: "Peyikçi", detail: ["Duyuruyla ilişkilendirilir; töreni haber vermek ayrı bir iştir."] },
        { label: "sakka", title: "Sakka", detail: ["Suyun temini ve dağıtımıyla ilişkilendirilir."] },
      ],
    },
  ],
  foot: "Görev tanımı verilmişse fiili ilgili role bağla; ortak bir su sözcüğü iki görevi aynı yapmaz.",
});

export const religionFigures061Anatolia: Record<string, Record<string, FigureDef>> = {
  "anadoluda-islam": {
    "Talas ve yakınlaşma": process,
    "Fütüvvet: değer ve davranış": levels,
    "Ahilik: meslek ve dayanışma": guild,
    "Eş’arî ve kelam geleneği": scholars,
    "Etki coğrafyası ve eser ilişkisi": figures,
  },
  "islam-dusuncesinde-tasavvufi-yorumlar": {
    "Üç tarihsel dönem": sufiEras,
    "İnsan-ı kâmil ve nefis mertebeleri": nafs,
    "Nakşibendilik": orders,
    "Dört kapı kırk makam": fourGates,
    "On iki hizmet: hazırlık ve paylaşma": twelve,
  },
};
