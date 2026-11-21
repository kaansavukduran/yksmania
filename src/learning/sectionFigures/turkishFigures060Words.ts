import type { FigureDef } from "./figureKit";
import { groupFig, ladderFig, splitFig, tableFig, treeFig } from "./turkishFigures060Kit";

/*
 * Forge060 TYT Türkçe · sözcük türleri ve fiil konuları. Örnekler bölüm
 * metninden alınır; sınıflama bölümlerin izlediği OGM/MEBİ okul
 * konvansiyonudur. Kavram şemaları ölçekli değildir.
 */

// fiiller · 1 · Kılış, durum, oluş.
const verbMeaning = tableFig({
  caption:
    "Fiilin anlamına göre üç grup: kılış nesne alabilir, durum öznenin hâlini, oluş kendiliğinden değişimi anlatır. Bir örneğe tıkla: kararın kanıtı açılır. “Nesne yoksa durumdur” kuralı oluşu dışarıda bırakır.",
  alt: "Dört satırlı tablo: kitabı okudu kılış; bütün gün çizdi kılış, nesne söylenmemiş; bebek uyudu durum; yaprak sarardı oluş.",
  cols: [
    { name: "Örnek", w: 3.8 },
    { name: "Grup", w: 2.0 },
    { name: "Kanıt", w: 4.2 },
  ],
  rows: [
    { cells: ["kitabı okudu", "kılış", "neyi? kitabı"], tones: [undefined, "c", "muted"], detail: ["Kılış fiili anlamlı bir nesne üzerinde gerçekleşebilir.", "“Teknisyen cihazı onardı.”: Neyi onardı? Cihazı."] },
    { cells: ["bütün gün çizdi", "kılış", "nesne söylenmemiş, alabilir"], tones: [undefined, "c", "muted"], detail: ["Açık nesne bulunmaması, fiilin nesne alma yeteneğini ortadan kaldırmaz.", "Çizmek uygun anlamda nesne alabilir."] },
    { cells: ["bebek uyudu", "durum", "öznenin hâli"], tones: [undefined, "b", "muted"], detail: ["Durumda öznenin içinde bulunduğu hâl ya da hareket öne çıkar.", "Bazı fiiller bağlama göre farklı nesne ilişkisi kurabilir; kendi anlamıyla denetle."] },
    { cells: ["yaprak sarardı", "oluş", "kendiliğinden değişim"], tones: [undefined, "a", "muted"], detail: ["Oluşta öznede zamanla kendiliğinden değişim vurgulanır: “Meyve olgunlaştı.”", "Nesne almadığı hâlde durum değildir; değişim ölçüttür."] },
  ],
  foot: "Karşılaştırmayı açık örneklerle yap: kitabı okudu / bebek uyudu / yaprak sarardı.",
});

// fiiller · 2 · Haber kipleri.
const newsMoods = tableFig({
  caption:
    "Beş haber kipi ve “gel-” kökü: kip ekinden sonra kişi eki gelir. Bir kipe tıkla: ekin biçimi ve sık yapılan hata açılır. Gelecekteki k→ğ gibi ses değişimi eki başka kip yapmaz.",
  alt: "Beş satırlı tablo: görülen geçmiş -dı, gel-di-m; öğrenilen geçmiş -mış, gel-miş-im; şimdiki -(ı)yor, gel-iyor-um; gelecek -acak, gel-eceğ-im; geniş zaman -r, -ar, -er, gel-ir-im.",
  cols: [
    { name: "Kip", w: 3.8 },
    { name: "Ek", w: 2.6 },
    { name: "Çözüm", w: 3.6 },
  ],
  rows: [
    { cells: ["görülen geçmiş", "-dı/-di", "gel-di-m"], tones: [undefined, "b", "c"], detail: ["-dı/-di ve uyumlu biçimleri; ardından kişi eki -m.", "Kipten sonra kişi anlamı bulunur."] },
    { cells: ["öğrenilen geçmiş", "-mış/-miş", "gel-miş-im"], tones: [undefined, "b", "c"], detail: ["-mış/-miş; ardından kişi eki -im.", "Bilgi kaynağı ve zaman anlamı bağlama bağlıdır."] },
    { cells: ["şimdiki zaman", "-(ı)yor", "gel-iyor-um"], tones: [undefined, "b", "c"], detail: ["-(ı)yor; ardından kişi eki -um.", "“Çalışmaktayım.” da sürmekte olan eylemi anlatabilir; yüzey biçimi aynı değildir."] },
    { cells: ["gelecek zaman", "-acak/-ecek", "gel-eceğ-im"], tones: [undefined, "b", "c"], detail: ["-ecek, ünlüyle başlayan kişi ekinden önce -eceğ olur.", "k→ğ ses değişimi eki başka kip yapmaz."] },
    { cells: ["geniş zaman", "-r/-ar/-er", "gel-ir-im"], tones: [undefined, "b", "c"], detail: ["-r/-ar/-er ve uyumlu biçimleri.", "Olumsuzu kişiye göre değişir: gelmez, gelmem, gelmeyiz; her durumda görünür -mez arama."] },
  ],
  foot: "Kip ve kişi ayrı parçalardır; her parçanın görevini koru.",
});

// fiiller · 3 · Dilek kipleri.
const wishMoods = tableFig({
  caption:
    "Dört dilek kipi aynı “oku-” kökünden farklı tutum kurar. Bir kipe tıkla: hangi tutumu anlattığı ve benzer görünen yapı açılır. Kip adını yalnız olayın gelecekte olmasına bakarak seçme.",
  alt: "Dört satırlı tablo: gereklilik -malı, Okumalısın, gerekli ya da uygun iş; dilek-şart -sa, Okusan, koşul ya da istek; istek -a, Okuyalım, istek; emir, Oku, buyurma ya da rica.",
  cols: [
    { name: "Kip", w: 3.0 },
    { name: "Örnek", w: 3.0 },
    { name: "Tutum", w: 4.0 },
  ],
  rows: [
    { cells: ["gereklilik", "Okumalısın.", "gerekli ya da uygun iş"], tones: [undefined, "ink", "c"], detail: ["-malı/-meli: yapılması gerekli ya da uygun görülen iş.", "Zaman etiketinden önce tutumu oku."] },
    { cells: ["dilek-şart", "Okusan.", "koşul ya da istek"], tones: [undefined, "ink", "c"], detail: ["-sa/-se: koşul ya da istek.", "Her -sa/-se görünümü iki yargılı koşul cümlesi değildir."] },
    { cells: ["istek", "Okuyalım.", "istek"], tones: [undefined, "ink", "c"], detail: ["-a/-e ve kişiyle birleşen biçimler isteği anlatır.", "“Geleli bir saat oldu.” sözündeki -eli süre bildiren zarf-fiildir; istek değildir."] },
    { cells: ["emir", "Oku.", "buyurma ya da rica"], tones: [undefined, "ink", "c"], detail: ["İkinci tekil emir çıplak olabilir: Oku.", "“Gelsin.” ve “Geliniz.” gibi kişiyle biçimlenen emirler de vardır."] },
  ],
  foot: "Ek benzerliğinde sözcüğün çekimli yüklem mi, başka yapının parçası mı olduğunu denetle.",
});

// fiiller · 4 · Yapı: çekim çokluğu yeni kök değildir.
const verbBuild = splitFig({
  caption:
    "Fiilin yapısı kök–ek ayrıştırmasıyla görünür: kök kalın çerçeve, yapım eki dolu yeşil kutu, çekim eki kesik çerçeve, olumsuzluk gibi ara parçalar soluk kutu. İleri ile bölümdeki üç fiili aç: çok parça, yapım eki olmadıkça yeni kök demek değildir.",
  alt: "Satır satır sözcük parçaları. gel-me-di-m: kök, olumsuzluk, geçmiş zaman, kişi; basit fiil. temiz-le-di: ad kökü, isimden fiil yapım eki, geçmiş zaman; türemiş fiil. yaz-acak-tı: kök, gelecek kip eki, ek fiil hikâyesi; birleşik çekim.",
  parses: [
    {
      step: "gelmedim",
      word: "gelmedim",
      context: "Basit fiil: çok parçalı görünür, yapım eki yoktur.",
      parts: [
        { s: "gel-", kind: "kök", label: "fiil kökü" },
        { s: "-me", kind: "ara", label: "olumsuzluk" },
        { s: "-di", kind: "çekim", label: "görülen geçmiş" },
        { s: "-m", kind: "çekim", label: "kişi (1. tekil)" },
      ],
      note: "basit fiildir; çekim çokluğu yeni kök değildir.",
    },
    {
      step: "temizledi",
      word: "temizledi",
      context: "Türemiş fiil: addan fiil yapan ek almıştır.",
      parts: [
        { s: "temiz", kind: "kök", label: "ad (sıfat) kökü" },
        { s: "-le-", kind: "yapım", label: "isimden fiil yapım eki" },
        { s: "-di", kind: "çekim", label: "görülen geçmiş" },
      ],
      note: "isimden fiil yapım eki aldığı için türemiştir.",
    },
    {
      step: "yazacaktı",
      word: "yazacaktı",
      context: "Birleşik çekim: iki kip katmanı.",
      parts: [
        { s: "yaz-", kind: "kök", label: "fiil kökü" },
        { s: "-acak", kind: "çekim", label: "gelecek zaman" },
        { s: "-tı", kind: "çekim", label: "ek fiil, hikâye" },
      ],
      note: "birleşik çekimlidir; “Yazıverdi.” ise tezlik bildiren birleşik yapıdır. Aynı “birleşik” sözü farklı sınıflama sorularında kullanılır.",
    },
  ],
  foot: "Et- ve ol- her yerde yardımcı değildir: “Bu ürün yüz lira eder.” temel fiildir.",
});

// fiilde-cati · 1 · İki eksen.
const voiceTree = treeFig({
  caption:
    "Fiilde çatı iki ayrı eksende incelenir: özneye göre ve nesneye göre. Bir türe tıkla: bölümdeki örnek ve tuzak açılır. Bir etiket öbür ekseni ortadan kaldırmaz; ilk kapı yüklemin fiil olmasıdır. Kavram şeması, ölçekli değildir.",
  alt: "Ağaç şema. Kökte fiilde çatı. Sol dal özneye göre: etken, edilgen, dönüşlü, işteş. Sağ dal nesneye göre: geçişli, geçişsiz, oldurgan, ettirgen.",
  root: "Fiilde çatı (yüklem fiil)",
  branches: [
    {
      label: "Özneye göre",
      title: "Özne bakımından çatı",
      detail: ["Gerçek yapan kim, etkilenen kim?", "Gizli özne edilgenlik, kendi zamiri dönüşlülük, çoğul özne işteşlik kanıtı değildir."],
      tone: "c",
      leaves: [
        { label: "etken", title: "Etken", detail: ["“Aşçı çorbayı karıştırdı.”: işi yapan gerçek özne aşçıdır.", "“Çorbayı karıştırdım.”: gizli özne edilgenlik değildir."] },
        { label: "edilgen", title: "Edilgen", detail: ["“Çorba karıştırıldı.”: işi yapan söylenmez; çorba sözde öznedir.", "“aşçı tarafından” öbeği yüklemi etken yapmaz."] },
        { label: "dönüşlü", title: "Dönüşlü", detail: ["“Çocuk kendi elleriyle yıkandı.”: yapan ve etkilenen aynı.", "“Çocuk kendi defterini açtı.” etkendir; kendi sözcüğü yetmez."] },
        { label: "işteş", title: "İşteş", detail: ["“İki sporcu güreşti.” karşılıklı; “Kuşlar sağa sola uçuştu.” birlikte.", "“Çocuklar koştu.” çok öznelidir ama işteş değildir."] },
      ],
    },
    {
      label: "Nesneye göre",
      title: "Nesne bakımından çatı",
      detail: ["Başlangıç ve son taban nesne alabiliyor mu?", "Gerçek cümlede nesne bulunmasıyla geçişlilik yeteneği aynı şey değildir."],
      tone: "b",
      leaves: [
        { label: "geçişli", title: "Geçişli", detail: ["“Öğrenci kitabı okudu.”: oku- nesne alabilir.", "“Öğrenci bugün okudu.” sözünde nesne söylenmese de fiil geçişlidir."] },
        { label: "geçişsiz", title: "Geçişsiz", detail: ["“Bebek uyudu.”: uyu- nesne almaz.", "“Parkta yürüdü.”: parkta yer tamlayıcısıdır, nesne değildir."] },
        { label: "oldurgan", title: "Oldurgan", detail: ["uyu- → uyut-: “Anne bebeği uyuttu.” Geçişsizden geçişliye.", "Görünüş (-dır, -t, -r) tek başına kanıt değildir."] },
        { label: "ettirgen", title: "Ettirgen", detail: ["kes- → kestir-: “Ev sahibi ustaya tahtayı kestirdi.” Geçişliden yaptırmaya.", "Başlangıçta geçişli olma, oldurgandan ayrımın ana kanıtıdır."] },
      ],
    },
  ],
  foot: "Çözüm sırası: yüklem fiil mi, gerçek yapan kim, etkilenen kim, ek hangi tabana gelmiş, taban nesne alabiliyor mu?",
});

// fiilde-cati · 2 · Etkenden edilgene.
const passive = groupFig({
  caption:
    "Etken cümlenin nesnesi edilgen cümlede özne konumuna gelir. Köşeli çizgiler her cümlede ögeleri gösterir; “tarafından” öbeği yapanı dolaylı belirtir ama yüklemi etken yapmaz. Örnekler bölüm metnindendir.",
  alt: "Üç cümle. Aşçı çorbayı karıştırdı: aşçı gerçek özne, çorbayı nesne, karıştırdı etken yüklem. Çorba karıştırıldı: çorba sözde özne, karıştırıldı edilgen yüklem. Çorba aşçı tarafından karıştırıldı: aşçı tarafından örtülü özne, öge olarak zarf tümleci.",
  variants: [
    {
      tokens: ["Aşçı", "çorbayı", "karıştırdı."],
      groups: [
        { from: 0, to: 0, label: "gerçek özne", tone: "c" },
        { from: 1, to: 1, label: "nesne", tone: "b" },
        { from: 2, to: 2, label: "etken yüklem", tone: "ink" },
      ],
      note: "İşi yapan açık: etken.",
    },
    {
      tokens: ["Çorba", "karıştırıldı."],
      groups: [
        { from: 0, to: 0, label: "sözde özne", tone: "b" },
        { from: 1, to: 1, label: "edilgen yüklem (-ıl-)", tone: "ink" },
      ],
      note: "Etkendeki nesne (çorba) özne konumuna geldi.",
      noteTone: "b",
    },
    {
      tokens: ["Çorba", "aşçı", "tarafından", "karıştırıldı."],
      groups: [
        { from: 0, to: 0, label: "sözde özne", tone: "b" },
        { from: 1, to: 2, label: "örtülü özne", tone: "c" },
        { from: 3, to: 3, label: "edilgen yüklem", tone: "ink" },
      ],
      note: "Öge çözümünde “aşçı tarafından” zarf tümlecidir; yüklem yine edilgendir.",
    },
  ],
  foot: "Gerçek dünyada yapanın biliniyor olmasıyla cümledeki dil bilgisel özne türünü karıştırma.",
});

// fiilde-cati · 3 · Aynı biçim, farklı çatı.
const reflexive = tableFig({
  caption:
    "Aynı “yıkandı” biçimi bağlama göre dönüşlü ya da edilgen olur; “kendi” sözcüğü tek başına dönüşlülük kanıtı değildir. Bir cümleye tıkla: yapan ve etkilenenin kim olduğu açılır.",
  alt: "Dört satırlı tablo: Çocuk kendi elleriyle yıkandı, dönüşlü. Çocuk annesi tarafından yıkandı, edilgen. Çocuk kendi defterini açtı, etken. Çocuk yıkandı, bağlamsız belirsiz.",
  cols: [
    { name: "Cümle", w: 5.0 },
    { name: "Yapan", w: 2.4 },
    { name: "Çatı", w: 2.6 },
  ],
  rows: [
    { cells: ["Çocuk kendi elleriyle yıkandı.", "çocuk", "dönüşlü"], tones: [undefined, "muted", "c"], detail: ["Yapan ve yıkanmadan etkilenen aynı kişi: dönüşlü.", "Yıka-n- biçimi bu açık bağlamda dönüşlüdür."] },
    { cells: ["Çocuk annesi tarafından yıkandı.", "annesi", "edilgen"], tones: [undefined, "muted", "b"], detail: ["Çocuk işi yapan değildir: aynı biçim bu kez edilgen.", "Ek biçimi tek başına son kararı vermez."] },
    { cells: ["Çocuk kendi defterini açtı.", "çocuk", "etken"], tones: [undefined, "muted", "a"], detail: ["“kendi” defterin kime ait olduğunu belirler; yüklem etkendir.", "Dönüşlülük zamiri her fiili dönüşlü yapmaz."] },
    { cells: ["Çocuk yıkandı.", "?", "belirsiz"], tones: [undefined, "muted", "warn"], detail: ["Bağlam olmadan iki olasılık vardır.", "İki olasılığı zorla tekleştirme."] },
  ],
  foot: "Fiilin yapısına ve işi yapanın eylemden kendisinin etkilenmesine birlikte bak.",
});

// fiilde-cati · 4 · Oldurgan ve ettirgen.
const causative = tableFig({
  caption:
    "Oldurgan ile ettirgeni başlangıç fiili ayırır: geçişsizden geçişliye oldurgan, geçişliden yaptırmaya ettirgen. Bir tabana tıkla: yeni katılımcının kim olduğu açılır. Ek sayısını ezberleme; katılımcı rollerini kur.",
  alt: "Dört satırlı tablo: uyu- geçişsiz, uyut- oldurgan, Anne bebeği uyuttu. kes- geçişli, kestir- ettirgen, Ev sahibi ustaya tahtayı kestirdi. yaz-, yazdır-, yazdırt-: birden çok yaptırma katmanı. piş-, pişir-: Aşçı yemeği pişirdi.",
  cols: [
    { name: "Başlangıç", w: 2.6 },
    { name: "Türemiş", w: 2.6 },
    { name: "Bölümdeki cümle", w: 4.8 },
  ],
  rows: [
    { cells: ["uyu- (geçişsiz)", "uyut- (oldurgan)", "Anne bebeği uyuttu."], tones: [undefined, "c", "ink"], detail: ["“Bebek uyudu.” geçişsiz; uyut- ile yeni yapan (anne) ve etkilenen (bebek).", "uyut-tu: -t oldurganlaştıran katman, -tu geçmiş zaman çekimi."] },
    { cells: ["kes- (geçişli)", "kestir- (ettirgen)", "Ev sahibi ustaya tahtayı kestirdi."], tones: [undefined, "b", "ink"], detail: ["kes- zaten geçişlidir; kestir- işi başkasına yaptırmayı gösterir.", "İşin nesnesi tahta kalır; yaptıran yeni katılımcıdır."] },
    { cells: ["yaz- (geçişli)", "yazdır-, yazdırt-", "Müdür, danışmana sekretere metni yazdırttı."], tones: [undefined, "b", "ink"], detail: ["Birden fazla yaptırma katmanı olabilir.", "Katılımcı rollerini sırayla kur: müdür, danışman, sekreter."] },
    { cells: ["piş- (geçişsiz)", "pişir- (geçişli)", "Aşçı yemeği pişirdi."], tones: [undefined, "c", "ink"], detail: ["Geçişsizden geçişliye değişim vardır; işi yapan özne açıktır.", "Bir etiketin bulunması öbür çözüm eksenini ortadan kaldırmaz."] },
  ],
  foot: "OGM ayrımı: geçişsiz → geçişli oldurgan; geçişli → daha yüksek geçişlilik ettirgen.",
});

// isimler-isim-tamlamasi · 1 · Tamlama türleri.
const compoundTypes = tableFig({
  caption:
    "İsim tamlamasında hangi uç hangi eki alır? Bir türe tıkla: bölümdeki örnek ve dönüşüm açılır. Sıfat tamlamasında iki ad değil, bir nitelik ve bir ad vardır.",
  alt: "Dört satırlı tablo. Belirtili: okulun bahçesi, tamlayan ilgi eki, tamlanan iyelik eki. Belirtisiz: okul bahçesi, tamlayan eksiz, tamlanan iyelik eki. Sıfat tamlaması: geniş bahçe, niteleme. Zincirleme: okulun bahçe kapısı, en az iki tamlama ilişkisi.",
  cols: [
    { name: "Tür", w: 2.8 },
    { name: "Örnek", w: 3.2 },
    { name: "Ekler", w: 4.0 },
  ],
  rows: [
    { cells: ["belirtili", "okul-un bahçe-si", "tamlayan ilgi, tamlanan iyelik"], tones: [undefined, "ink", "c"], detail: ["Belirtili tamlamada tamlayan ilgi, tamlanan iyelik eki alır.", "“Okulun geniş bahçesi” yine belirtilidir; sıfat araya girebilir."] },
    { cells: ["belirtisiz", "okul bahçe-si", "tamlayan eksiz, tamlanan iyelik"], tones: [undefined, "ink", "b"], detail: ["Tamlayan ilgi eki almaz; genel tür ilişkisi öne çıkabilir.", "Tamlayana ilgi eki eklenince “okulun bahçesi” olur: belirtiliye dönüşür."] },
    { cells: ["sıfat tamlaması", "geniş bahçe", "nitelik + ad, iyelik yok"], tones: [undefined, "ink", "a"], detail: ["“geniş” bahçenin niteliğidir.", "“okul geniş bahçesi” doğal değildir; “geniş okul bahçesi” ya da “okulun geniş bahçesi” incelenir."] },
    { cells: ["zincirleme", "okulun [bahçe kapısı]", "en az iki tamlama ilişkisi"], tones: [undefined, "ink", "warn"], detail: ["En az bir unsurun kendisi isim tamlamasıdır.", "Ölçüt sözcük sayısı değil, iki tamlama ilişkisinin bağlanmasıdır."] },
  ],
  foot: "Kimin/neyin nesi sorusu anlam ilişkisini denetler; ek sınırı yazıdaki sözcük sınırıyla aynı görünmeyebilir (kitabın).",
});

// isimler-isim-tamlamasi · 2 · Zincirleme mi, değil mi?
const chain = groupFig({
  caption:
    "Üç sözcük gördüğün her grup zincirleme değildir. Köşeli çizgiler iç içe öbekleri gösterir: üstteki kat iç öbek, alttaki kat bütün tamlama. Örnekler bölüm metnindendir.",
  alt: "İki grup. Okulun bahçe kapısı: bahçe kapısı iç belirtisiz tamlama, okulun bu bütünün tamlayanı; zincirleme. Okulun büyük kapısı: büyük sıfat, temel tamlama okulun kapısı; zincirleme değil.",
  variants: [
    {
      tokens: ["okulun", "bahçe", "kapısı"],
      groups: [
        { from: 1, to: 2, label: "iç: belirtisiz tamlama", tone: "b", level: 0 },
        { from: 0, to: 2, label: "dış: okulun + [bahçe kapısı]", tone: "c", level: 1 },
      ],
      note: "İki tamlama ilişkisi bağlanmış: zincirleme.",
      noteTone: "c",
    },
    {
      tokens: ["okulun", "büyük", "kapısı"],
      groups: [
        { from: 1, to: 1, label: "sıfat", tone: "a", level: 0 },
        { from: 0, to: 2, label: "belirtili: okulun … kapısı", tone: "c", level: 1 },
      ],
      note: "“büyük” yeni bir isim tamlaması kurmaz: zincirleme değil.",
      noteTone: "warn",
    },
  ],
  foot: "Parçaları köşeli ayraçla göster ve asıl dış tamlananı sona doğru bul.",
});

// isimler-isim-tamlamasi · 3 · İyelik ve durum eki.
const possessive = splitFig({
  caption:
    "İyelik eki aitlik bildirir, kişilik eki değildir. Kök–ek ayrıştırmasında kök kalın çerçeve, çekim ekleri kesik çerçeve, araya giren ses soluk kutu. İleri ile bölümdeki biçimleri aç: aynı sözcük hem iyelik hem durum eki taşıyabilir.",
  alt: "Satır satır sözcük parçaları. defter-i-n-i: ad kökü, üçüncü tekil iyelik, zamir n'si, belirtme durumu. kalem-imiz: ad kökü, birinci çoğul iyelik. çanta-sı: ad kökü, ünlüden sonra üçüncü tekil iyelik.",
  parses: [
    {
      step: "defterini",
      word: "defterini",
      context: "“Onun defterini aldım.”",
      parts: [
        { s: "defter", kind: "kök", label: "ad kökü" },
        { s: "-i", kind: "çekim", label: "3. tekil iyelik" },
        { s: "-n-", kind: "ara", label: "zamir n’si" },
        { s: "-i", kind: "çekim", label: "belirtme durumu" },
      ],
      note: "ilk -i iyelik, son -i belirtme durumudur; aynı sözcük ikisini birden taşır.",
    },
    {
      step: "kalemimiz",
      word: "kalemimiz",
      context: "Tamlayanla aç: bizim kalemimiz",
      parts: [
        { s: "kalem", kind: "kök", label: "ad kökü" },
        { s: "-imiz", kind: "çekim", label: "1. çoğul iyelik" },
      ],
      note: "“bizim” tamlayanı aitliği görünür kılar.",
    },
    {
      step: "çantası",
      word: "çantası",
      context: "Ünlüyle biten ad: onun çantası",
      parts: [
        { s: "çanta", kind: "kök", label: "ad kökü" },
        { s: "-sı", kind: "çekim", label: "3. tekil iyelik (ünlüden sonra)" },
      ],
      note: "ünlüyle biten adlarda üçüncü tekil iyelik -sı/-si olur.",
    },
  ],
  foot: "Tek başına “defterin” ya da “öğretmenim” birden çok çözüme açıktır; bağlamsız tek ek görevi uydurma.",
});

// sifatlar · 1 · Sıfat türleri.
const adjTree = treeFig({
  caption:
    "Sıfatın iki ana işi: adı nitelemek ya da belirtmek. Bir türe tıkla: bölümdeki örnek ve ayırt etme sorusu açılır. Sıfat görevi bir adla kurulan ilişkiyle kanıtlanır; önce adı bul. Kavram şeması, ölçekli değildir.",
  alt: "Ağaç şema. Kökte sıfat. Sol dal niteleme: nasıl? sorusu. Sağ dal belirtme: işaret, sayı, belgisiz, soru sıfatı.",
  root: "Sıfat (ön ad): önce adı bul",
  branches: [
    {
      label: "Niteleme",
      title: "Niteleme sıfatı",
      detail: ["Adın renk, biçim, durum ve benzeri özelliklerini bildirir: mor çiçek, yuvarlak masa, sakin öğrenci.", "“Nasıl çiçek?” sorusu niteliği görünür kılar; değerlendirme de olabilir: dürüst insan."],
      tone: "c",
      leaves: [
        { label: "mor çiçek", title: "Renk", detail: ["“mor” çiçeğin rengini bildirir.", "Soru: nasıl çiçek?"] },
        { label: "yuvarlak masa", title: "Biçim", detail: ["“yuvarlak” masanın biçimini bildirir.", "Soru: nasıl masa?"] },
        { label: "yararlı fikir", title: "Değerlendirme", detail: ["Nitelik dış görünüşle sınırlı değildir.", "“dürüst insan” da niteleme sıfatıdır."] },
      ],
    },
    {
      label: "Belirtme",
      title: "Belirtme sıfatları",
      detail: ["Adı gösterir, sayar, belirsiz bırakır ya da soru yoluyla belirtir.", "Ad açıkça bulunuyorsa sıfat ilişkisi sürer."],
      tone: "b",
      leaves: [
        { label: "işaret: bu yol", title: "İşaret sıfatı", detail: ["bu, şu, o bir adı göstererek belirtir: bu yol, şu kutu.", "“Şunu taşı.” derken ad düşer: işaret zamiri olur."] },
        { label: "sayı: dört soru", title: "Sayı sıfatı", detail: ["Asıl, sıra, üleştirme ve kesir: dört, dördüncü, dörder soru; yarım ekmek.", "Sayının varlığı hangi görevi yaptığını tek başına söylemez."] },
        { label: "belgisiz: bazı günler", title: "Belgisiz sıfat", detail: ["Kesin sayı vermeden belirtir: birkaç öğrenci, her soru, hiçbir engel.", "“Bir gün bu şehre döneceğim.” belirsiz zaman: belgisiz."] },
        { label: "soru: hangi sokak", title: "Soru sıfatı", detail: ["Adı soru yoluyla belirtir: hangi sokak, kaç bilet.", "“Hangisini aldın?” zamir; “Nasıl anlattın?” zarftır."] },
      ],
    },
  ],
  foot: "Sözcük bir listede bulunduğu için değil, hangi ada bağlandığı için sıfattır.",
});

// sifatlar · 2 · Sıfat mı, zarf mı?
const adjAdv = groupFig({
  caption:
    "Aynı “sakin” sözcüğü hangi söze bağlandığına göre sıfat ya da zarf olur. Köşeli çizgiler bağlandığı sözü gösterir. Soru sözcüğü aynı (nasıl?) olsa bile sorunun hangi sözcüğe sorulduğu değişir. Örnekler bölüm metnindendir.",
  alt: "İki cümle. Sakin öğrenci konuştu: sakin öğrenciyi niteler, niteleme sıfatı. Öğrenci sakin konuştu: sakin konuşmayı niteler, durum zarfı.",
  variants: [
    {
      tokens: ["Sakin", "öğrenci", "konuştu."],
      groups: [
        { from: 0, to: 1, label: "sakin → öğrenci: sıfat", tone: "c" },
        { from: 2, to: 2, label: "yüklem", tone: "ink" },
      ],
      note: "Nasıl öğrenci? Sakin: niteleme sıfatı.",
      noteTone: "c",
    },
    {
      tokens: ["Öğrenci", "sakin", "konuştu."],
      groups: [
        { from: 0, to: 0, label: "özne", tone: "muted" },
        { from: 1, to: 2, label: "sakin → konuştu: zarf", tone: "a" },
      ],
      note: "Nasıl konuştu? Sakin: durum zarfı.",
      noteTone: "a",
    },
  ],
  foot: "Önce sözcüğün bağlandığı birimi bul: ad mı, eylem mi?",
});

// sifatlar · 3 · Sayı sıfatları.
const numberAdj = tableFig({
  caption:
    "Sayı sıfatının dört görevi: miktar, sıra, pay ve parça. Bir türe tıkla: örnek ve yazım uyarısı açılır. Bir sayının varlığı hangi görevi yaptığını tek başına söylemez.",
  alt: "Dört satırlı tablo: asıl sayı dört soru, kesin miktar; sıra sayı dördüncü soru, sıra; üleştirme dörder soru, paylaştırma; kesir yarım ekmek ve çeyrek saat, bütünün parçası.",
  cols: [
    { name: "Tür", w: 2.8 },
    { name: "Örnek", w: 3.6 },
    { name: "Bildirdiği", w: 3.6 },
  ],
  rows: [
    { cells: ["asıl sayı", "dört soru", "kesin miktar"], tones: [undefined, "ink", "c"], detail: ["Kesin miktar bildirir.", "Sayı sıfatından sonra olağan sayma bağlamında çoğul eki gelmez: iki kitap."] },
    { cells: ["sıra sayı", "dördüncü soru", "sıra"], tones: [undefined, "ink", "c"], detail: ["Varlığın sırasını gösterir.", "“İlk” ve “son” da sıra bildirebilir."] },
    { cells: ["üleştirme", "dörder soru", "paylaştırma"], tones: [undefined, "ink", "c"], detail: ["Paylaştırma bildirir.", "Yazım sözcükle kurulur: ikişer; “2’şer” biçimini kural olarak kullanma."] },
    { cells: ["kesir", "yarım ekmek, çeyrek saat", "bütünün parçası"], tones: [undefined, "ink", "c"], detail: ["Bütünün bir parçasını belirtir.", "Hangi adı belirttiğini cümlede göster."] },
  ],
  foot: "Sayıyı gör, sonra anlamına bak: miktar mı, sıra mı, pay mı, parça mı?",
});

// sifatlar · 4 · Ad düşünce.
const nominalized = tableFig({
  caption:
    "Ad açıkça söylendiğinde sıfat; ad düşünce işaret sözü zamire, niteleme sözü adlaşmış sıfata döner. Bir cümleye tıkla: düşen adın ne olduğu ve neyin korunduğu açılır.",
  alt: "Beş satırlı tablo: Şu kutuyu taşı, işaret sıfatı; Şunu taşı, işaret zamiri; Yaşlı komşular oturdu, niteleme sıfatı; Yaşlılar oturdu, adlaşmış sıfat; Kırmızıları ayırdım, adlaşmış sıfat, renk niteliği korunur.",
  cols: [
    { name: "Cümle", w: 4.4 },
    { name: "Ad", w: 2.2 },
    { name: "Tür", w: 3.4 },
  ],
  rows: [
    { cells: ["Şu kutuyu taşı.", "kutu açık", "işaret sıfatı"], tones: [undefined, "muted", "c"], detail: ["“şu” açık kutu adını gösterir.", "“Şu küçük kutu”da araya giren sıfat bu ilişkiyi bozmaz."] },
    { cells: ["Şunu taşı.", "düştü", "işaret zamiri"], tones: [undefined, "warn", "b"], detail: ["Kutu adı söylenmez; şu adın yerini tutar.", "İnsanı göstermesi onu kişi zamiri yapmaz."] },
    { cells: ["Yaşlı komşular oturdu.", "komşular açık", "niteleme sıfatı"], tones: [undefined, "muted", "c"], detail: ["“yaşlı” komşular adını niteler.", "Önce nitelenen adı bul."] },
    { cells: ["Yaşlılar oturdu.", "düştü", "adlaşmış sıfat"], tones: [undefined, "warn", "a"], detail: ["Niteleme sıfatı insanları adlandıracak biçimde kullanılır; çoğul ve durum eki alabilir.", "Ad görevi gören her sözcük zamir değildir."] },
    { cells: ["Kırmızıları ayırdım.", "düştü", "adlaşmış sıfat"], tones: [undefined, "warn", "a"], detail: ["Renk niteliği korunur, açık ad düşer.", "Bağlam kalem demiyorsa düşen varlığı kalem diye uydurma; “bazıları” belgisiz zamirle aynı torbaya koyma."] },
  ],
  foot: "Ad açıksa sıfat ilişkisini, ad düşmüşse yerini tutma ya da adlaşmayı ara.",
});

// edat-baglac-unlem · 1 · Üç görev.
const functionWords = treeFig({
  caption:
    "Edat, bağlaç ve ünlem üç ayrı görevdir. Bir türe ya da örneğe tıkla: bölümdeki cümle ve görevin kanıtı açılır. Önce sözcüğün cümledeki işini açıkla; yalnız bir listeden tür seçme. Kavram şeması, ölçekli değildir.",
  alt: "Ağaç şema. Kökte görev sözcükleri. Edat dalı: gibi, kadar, göre, için. Bağlaç dalı: ve, ama, çünkü, ya da. Ünlem dalı: eyvah, hey, ah.",
  root: "Görev: sözcük cümlede ne yapıyor?",
  branches: [
    {
      label: "Edat",
      title: "Edat (ilgeç)",
      detail: ["Önündeki ad ya da öbekle birlikte başka bir ögeye anlam ilişkisi kurar: “Takıma göre program yaptık.”", "“İp gibi ince” benzerlik öbeğidir; edat iki eş öge kurmaz."],
      tone: "c",
      leaves: [
        { label: "gibi", title: "gibi: benzerlik", detail: ["Benzerlik ya da bağlama göre olasılık: “Buz gibi su”.", "Öbeğin sıfat ya da zarf görevi, edatın türünü değiştirmez."] },
        { label: "kadar", title: "kadar: ölçü, sınır", detail: ["Ölçü, karşılaştırma ya da sınır ilişkisi kurar.", "Öbeğin sınırını göster."] },
        { label: "göre", title: "göre: görüş, ölçüt", detail: ["Görüş ya da ölçüt: “Takıma göre program yaptık.”", "Önündeki adla birlikte okunur."] },
        { label: "için", title: "için: amaç ya da neden", detail: ["Amaç, neden ya da yarar: “Dinlenmek için durdu.” amaç; “Hasta olduğu için durdu.” neden.", "Aynı için’e her cümlede amaç etiketi verme."] },
      ],
    },
    {
      label: "Bağlaç",
      title: "Bağlaç",
      detail: ["Eş görevli sözcükleri, öbekleri ya da yargıları bağlar: “Programı yaptık ama değiştirdik.”", "İki yanda aynı uzunlukta söz gerekmez: “İnce ve oldukça dayanıklı bir ip”."],
      tone: "b",
      leaves: [
        { label: "ve", title: "ve: ekleme", detail: ["Ekleme ilişkisi.", "“Ada ile Can” yerine “Ada ve Can” denebiliyorsa ile de bağlaçtır."] },
        { label: "ama", title: "ama: karşıtlık", detail: ["Karşıtlık: “İnce ama sağlam”.", "Bağlaç çıkarınca karşıtlık vurgusu kaybolabilir."] },
        { label: "çünkü", title: "çünkü: neden", detail: ["Açıklama ya da neden ilişkisi.", "Kalıplaşmış bitişik yazımı ayrıca öğrenilir."] },
        { label: "ya da", title: "ya da: seçenek", detail: ["Seçenek ilişkisi (veya ile aynı grup).", "Hangi iki parçanın bağlandığını açıkça yaz."] },
      ],
    },
    {
      label: "Ünlem",
      title: "Ünlem",
      detail: ["Duygu, seslenme ya da anlık tepki: “Eyvah, program silindi!”", "Ünlem işareti cümlenin tonunu gösterir; her sözcüğü ünlem yapmaz."],
      tone: "a",
      leaves: [
        { label: "eyvah", title: "eyvah: anlık tepki", detail: ["Anlık tepki: “Eyvah, program silindi!”", "Duygulu söylenen “Ne güzel bir gün!” cümlesinde güzel yine sıfattır."] },
        { label: "hey", title: "hey: seslenme", detail: ["Seslenme ünlemi: “Hey, sesimi duyuyor musun?”", "“Çocuklar, buraya bakın!” sözünde çocuklar isimdir, seslenme işlevi kazanmıştır."] },
        { label: "ah", title: "ah: duygu", detail: ["Duygu bildirir; ek alınca adlaşabilir: “Ahlarını duyduk.”", "Kökeni, bu cümledeki türü ve iletişim işlevi ayrı açıklanır."] },
      ],
    },
  ],
  foot: "Önce sözcüğün cümledeki işini açıkla, sonra türünü adlandır.",
});

// edat-baglac-unlem · 2 · İle.
const ile = ladderFig({
  caption:
    "İle karar merdiveni: “ve” değişimi bir denetim aracıdır, ama aynı anlam ve öge ilişkisi korunmalıdır. İleri ile bölümdeki örnekleri yürüt. Bitişik -la/-le yazılışı türü tek başına kesinleştirmez.",
  alt: "İki soru kartı. ile yerine ve konunca aynı anlam ve öge ilişkisi korunuyor mu: bağlaç. Neyle sorusuna araç yanıtı mı veriyor: araç edatı. Hiçbiri değilse birliktelik edatı.",
  rungs: [
    { q: "“ve” konunca aynı anlam ve öge ilişkisi korunuyor mu?", yes: "bağlaç: eş görevli", tone: "b" },
    { q: "Eylemin aracını mı bildiriyor?", yes: "edat: araç", tone: "c" },
  ],
  last: "Edat: birliktelik",
  lastTone: "c",
  walks: [
    { step: "Ada ile Can", example: "Ada ile Can projeyi bitirdi.", stop: 0, why: "Ada ve Can aynı özne grubunun iki parçasıdır: bağlaç." },
    { step: "makas ile", example: "Ada makas ile kâğıdı kesti.", stop: 1, why: "Makas kesmenin aracıdır: edat. Makas ve kâğıt eş görevli özne değildir." },
    { step: "Can ile geldi", example: "Ada, Can ile geldi.", stop: 2, why: "“Can ile” birliktelik öbeği kurar; özne Ada’dır." },
    { step: "Fırçayla", example: "Fırçayla boyadı.", stop: 1, why: "-la ile kaynaklıdır ve araç bildirir: edat." },
    { step: "Annesiyle babası", example: "Annesiyle babası geldi.", stop: 0, why: "Eş özne bağlantısı: bağlaç." },
  ],
  foot: "Kulağa düzgün gelen yeni cümle yetmez; aynı anlam ve öge ilişkisi korunmalıdır.",
});

// edat-baglac-unlem · 3 · Bağlaçların ilişkileri.
const conjRelations = tableFig({
  caption:
    "Bağlaçlar farklı anlam ilişkileri kurar. Bir ilişkiye tıkla: bölümdeki örnek (varsa) ve denetim notu açılır. “Çıkarınca anlam hiç değişmezse bağlaçtır” mutlak bir kural değildir.",
  alt: "Yedi satırlı tablo: ekleme ve, hem hem; seçenek veya, ya da; karşıtlık ama, fakat, oysa; neden çünkü, zira; açıklık yani; koşul eğer; ne ne yapısı olumsuzluk ya da iki uç arası.",
  cols: [
    { name: "İlişki", w: 3.4 },
    { name: "Bağlaç", w: 6.6 },
  ],
  rows: [
    { cells: ["ekleme", "ve, hem…hem"], tones: [undefined, "b"], detail: ["“Hem çizdi hem boyadı.” iki eylemi bağlar.", "Hangi iki parçanın bağlandığını açıkça yaz."] },
    { cells: ["seçenek", "veya, ya da"], tones: [undefined, "b"], detail: ["Seçenek ilişkisi kurar.", "Bağlanan parçaları ayrı yaz."] },
    { cells: ["karşıtlık", "ama, fakat, oysa"], tones: [undefined, "b"], detail: ["“İnce ama sağlam” iki niteliği karşıtlıkla bağlar.", "Bir cümlede ama var diye otomatik hata arama."] },
    { cells: ["neden", "çünkü, zira"], tones: [undefined, "b"], detail: ["Açıklama ya da neden ilişkisi kurar.", "Bağlaç çıkarılınca neden vurgusu kaybolabilir."] },
    { cells: ["açıklık", "yani"], tones: [undefined, "b"], detail: ["Açıklık ilişkisi kurar.", "Önceki sözü açar."] },
    { cells: ["koşul", "eğer"], tones: [undefined, "b"], detail: ["Koşul ilişkisi kurar.", "Koşul yargısını ve ana yargıyı ayrı göster."] },
    { cells: ["ne…ne", "ne…ne"], tones: [undefined, "b"], detail: ["“Ne mesaj geldi ne telefon çaldı.” olumsuzluk bildirir.", "“Ne sıcak ne soğuk.” ise iki uç arasında olmayı anlatır."] },
  ],
  foot: "Sözdizimi ile anlamı birlikte denetle.",
});

// edat-baglac-unlem · 4 · Edatın öbeği ve anlamı.
const postposition = tableFig({
  caption:
    "Aynı edat farklı anlam ilişkisi kurabilir; öbeğin görevi edatın türünü değiştirmez. Bir cümleye tıkla: edat öbeğinin neye bağlandığı ve ilişkinin adı açılır.",
  alt: "Dört satırlı tablo: Dinlenmek için durdu, amaç; Hasta olduğu için durdu, neden; Buz gibi su, öbek suyu niteler; Buz gibi üşüdü, öbek eylemi açıklar.",
  cols: [
    { name: "Cümle", w: 4.4 },
    { name: "Edat", w: 1.8 },
    { name: "İlişki", w: 3.8 },
  ],
  rows: [
    { cells: ["Dinlenmek için durdu.", "için", "amaç (hedeflenen iş)"], tones: [undefined, "c", "b"], detail: ["Hedeflenen bir işi anlatır: amaç.", "Aynı için’e her cümlede amaç etiketi verme."] },
    { cells: ["Hasta olduğu için durdu.", "için", "neden (gerçekleşmiş)"], tones: [undefined, "c", "a"], detail: ["Gerçekleşmiş nedenin etkisini anlatır.", "Amaç ile nedeni bağlamdan ayır."] },
    { cells: ["Buz gibi su", "gibi", "öbek suyu niteler"], tones: [undefined, "c", "b"], detail: ["“Buz gibi” öbeği suyu niteler.", "gibi yine edattır."] },
    { cells: ["Buz gibi üşüdü.", "gibi", "öbek eylemi açıklar"], tones: [undefined, "c", "a"], detail: ["Öbek eylemi açıklar.", "Öbeğin sıfat ya da zarf görevinde bulunması edatın türünü değiştirmez."] },
  ],
  foot: "-e doğru, -den dolayı, -den sonra gibi yapılarda durum ekini ve edatı birlikte oku.",
});

export const turkishFigures060Words: Record<string, Record<string, FigureDef>> = {
  fiiller: {
    "Kılış, durum ve oluş: nesne ve değişim": verbMeaning,
    "Haber kipleri: beş temel biçim": newsMoods,
    "Dilek kipleri: zaman etiketinden önce tutum": wishMoods,
    "Fiilin yapısı: çekim çokluğu yeni kök değildir": verbBuild,
  },
  "fiilde-cati": {
    "İki eksenli çözüm ve tuzak kontrolü": voiceTree,
    "Edilgen: etkilenen öğe özne konumuna gelir": passive,
    "Dönüşlü: yapan ve etkilenen aynı": reflexive,
    "Ettirgen: geçişliyi başkasına yaptırma": causative,
  },
  "isimler-isim-tamlamasi": {
    "Belirtisiz tamlama ve sıfat tamlaması": compoundTypes,
    "Zincirleme tamlama: adları saymakla yetinme": chain,
    "İyelik: aitlik bildirir, kişilik eki değildir": possessive,
  },
  sifatlar: {
    "Sıfatı bulmak için önce adı bul": adjTree,
    "Niteleme: nasıl bir varlık?": adjAdv,
    "Sayı: miktar, sıra, pay ve parça": numberAdj,
    "Adlaşmış sıfat: nitelik kalır, açık ad düşer": nominalized,
  },
  "edat-baglac-unlem": {
    "Üç görev, üç farklı kanıt": functionWords,
    "İle: eş görevli iki ad mı, araç veya birliktelik mi?": ile,
    "Bağlaçların kurduğu anlam ilişkileri": conjRelations,
    "Edatın öbeğini ve anlamını birlikte bul": postposition,
  },
};
