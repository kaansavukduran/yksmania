import { type FigureDef } from "./figureKit";
import { flowFig, mapFig, tableFig } from "./turkishFigures060Kit";

/*
 * Forge062 TYT Din Kültürü · Gönül coğrafyamız; Allah ve insan ilişkisi.
 * Şehir, eser, kişi ve isim anlamları yalnız bölüm metninden alınır. Gezi
 * şeması yalnız batı-doğu ve kuzey-güney yönünde yaklaşık göreli sıradır:
 * şematik, ölçekli değil, siyasi sınır çizmez. Kavram tabloları kaynağın
 * öğretimini temsil eder; inanç ölçmez, kişiye hüküm vermez.
 */

/* ---------------- Gönül coğrafyamız ---------------- */

// 10 · Bölge, şehir, güncel ülke ölçekleri.
const scales = tableFig({
  caption:
    "Harita ve metni birlikte okurken tarihî bölge, şehir ve güncel ülke ölçeklerini ayır. Bir ada tıkla. Buhara ve Semerkant iki farklı şehirdir; ortak ilmî hayat onları tek şehir ya da tek dönem yapmaz.",
  alt: "Dört satırlı tablo. Maveraünnehir: tarihî bölge, Seyhun ile Ceyhun nehirleri arası. Türkistan: daha geniş tarihî ve kültürel bölge. Buhara: şehir. Semerkant: şehir.",
  cols: [
    { name: "Ad", w: 3.6 },
    { name: "Ölçek", w: 2.4 },
    { name: "Bölümdeki bilgi", w: 4.0 },
  ],
  rows: [
    { cells: ["Maveraünnehir", "tarihî bölge", "Seyhun ile Ceyhun arası"], tones: [undefined, "b", "muted"], detail: ["Günümüz idari haritasının birebir eş anlamlısı değildir."] },
    { cells: ["Türkistan", "geniş bölge", "tarihî ve kültürel bölge adı"], tones: [undefined, "b", "muted"], detail: ["Türkistan daha geniş tarihî ve kültürel bir bölge adıdır."] },
    { cells: ["Buhara", "şehir", "önemli merkez"], tones: [undefined, "a", "muted"], detail: ["Buhara ve Semerkant iki farklı şehirdir."] },
    { cells: ["Semerkant", "şehir", "önemli merkez"], tones: [undefined, "a", "muted"], detail: ["Aynı coğrafyanın ilmî hayatında yer almak tek şehir ya da tek dönem demek değildir."] },
  ],
  foot: "Tarihî bölge, şehir ve güncel ülke ayrı ölçeklerdir.",
});

// 11 · Âlimler ve alanlar.
const scholars = tableFig({
  caption:
    "Kişi, alan ve katkıyı ayrı sütunlarda düzenle. Bir ada tıkla. Ortak coğrafi bağdan aynı çağda yaşadıkları ya da aynı kitabı yazdıkları sonucu çıkmaz.",
  alt: "Yedi satırlı tablo. Buhari ve Tirmizi: hadis. Matüridi: kelam. Farabi: felsefe. İbni Sina: tıp ve felsefe. Biruni: çeşitli bilim alanları. Harezmi: matematik. Ali Kuşçu: astronomi ve matematik.",
  cols: [
    { name: "Kişi", w: 4.0 },
    { name: "Bölümdeki alan", w: 6.0 },
  ],
  rows: [
    { cells: ["Buhari, Tirmizi", "hadis çalışmaları"], tones: [undefined, "b"], detail: ["Hepsinin katkısı aynı bilim dalı değildir."] },
    { cells: ["Matüridi", "kelam"], tones: [undefined, "b"], detail: ["Kelam alanında anılır."] },
    { cells: ["Farabi", "felsefe"], tones: [undefined, "c"], detail: ["Felsefe alanında anılır."] },
    { cells: ["İbni Sina", "tıp ve felsefe"], tones: [undefined, "c"], detail: ["Tıp ve felsefe alanlarında anılır."] },
    { cells: ["Biruni", "çeşitli bilim alanları"], tones: [undefined, "a"], detail: ["Çeşitli bilim alanlarıyla ilişkilendirilir."] },
    { cells: ["Harezmi", "matematik"], tones: [undefined, "a"], detail: ["Matematikle ilişkilendirilir."] },
    { cells: ["Ali Kuşçu", "astronomi ve matematik"], tones: [undefined, "a"], detail: ["Astronomi ve matematik geleneğinde anılır."] },
  ],
  foot: "Benzer isimleri ayrı ilişkilerle hatırla.",
});

// 16 · Ezher, Darülhikme, Beytülhikme.
const houses = tableFig({
  caption:
    "Benzer seslerden dolayı yakın kurum adlarını aynı bina sanma: kent, kurum ve işlevi birlikte eşleştir. Bir kuruma tıkla.",
  alt: "Üç satırlı tablo. Ezher: Kahire, ibadet ve eğitimle ilişkili önemli kurum. Darülhikme: Kahire, farklı alanlardaki çalışmalar. Beytülhikme: Bağdat, çeviri ve bilgi çalışmaları.",
  cols: [
    { name: "Kurum", w: 3.0 },
    { name: "Kent", w: 2.4 },
    { name: "İşlev", w: 4.6 },
  ],
  rows: [
    { cells: ["Ezher", "Kahire", "ibadet ve eğitim"], tones: [undefined, "c", "muted"], detail: ["Mısır İslam medeniyetinin ilim ve eğitim merkezlerinden biridir."] },
    { cells: ["Darülhikme", "Kahire", "farklı alanlardaki çalışmalar"], tones: [undefined, "c", "muted"], detail: ["Ortak hikmet sözcüğü farklı kurumlarda bulunabilir."] },
    { cells: ["Beytülhikme", "Bağdat", "çeviri ve bilgi çalışmaları"], tones: [undefined, "b", "muted"], detail: ["Bağdat’taki Beytülhikme ile Kahire’deki Darülhikme aynı bina değildir."] },
  ],
  foot: "Kent, kurum ve işlev üç ayrı bilgidir.",
});

// 18 · Endülüs.
const andalus = tableFig({
  caption:
    "Endülüs, İber Yarımadası’ndaki Müslüman yönetimlerin tarihî coğrafyasıdır. Bir esere ya da kişiye tıkla. Günümüz adları Granada ve Córdoba olarak da karşına çıkabilir.",
  alt: "Üç satırlı tablo. Elhamra Sarayı: Gırnata, Granada. Kurtuba Camii: Kurtuba, Córdoba. Düşünce tarihi: İbni Rüşd, İbni Hazm, İbnülarabi.",
  cols: [
    { name: "Ad", w: 3.6 },
    { name: "Yer ya da alan", w: 6.4 },
  ],
  rows: [
    { cells: ["Elhamra Sarayı", "Gırnata (Granada)"], tones: [undefined, "b"], detail: ["Gırnata, Kurtuba ve İşbiliye önemli merkezlerdir."] },
    { cells: ["Kurtuba Camii", "Kurtuba (Córdoba)"], tones: [undefined, "b"], detail: ["Eser ve şehri birlikte eşleştir."] },
    { cells: ["İbni Rüşd, İbni Hazm, İbnülarabi", "havzanın düşünce tarihi"], tones: [undefined, "c"], detail: ["Çeviriler bilginin Avrupa’nın başka bölgelerine taşınmasını gösterir; eserin ilk yeri değişmez."] },
  ],
  foot: "Bir eserin farklı toplumlarca kullanılması ilk yerinin değiştiği anlamına gelmez.",
});

// 19 · Yayılma yolları.
const routes = tableFig({
  caption:
    "Medeniyet etkileşimi tek bir yolla açıklanmaz. Bir yola tıkla. Soru bilim merkezini soruyorsa yalnız savaş tarihiyle yanıt verme; metinde gerçekten verilen rolü belirle.",
  alt: "Beş satırlı tablo: askerî-siyasi gelişmeler; âlimler ve öğrenciler; tüccarlar; tasavvuf gelenekleri; eserlerin çoğaltılması, çevrilmesi ve farklı dillerde anlatılması.",
  cols: [
    { name: "Yol", w: 4.4 },
    { name: "Aktardığı", w: 5.6 },
  ],
  rows: [
    { cells: ["Askerî-siyasi gelişmeler", "siyasi etkileşim"], tones: [undefined, "muted"], detail: ["Tek başına bütün örnekleri açıklamaz."] },
    { cells: ["Âlimler ve öğrenciler", "ilim ve öğretim"], tones: [undefined, "b"], detail: ["Bilim merkezi sorusunda öne çıkar."] },
    { cells: ["Tüccarlar", "ticari ilişkiler"], tones: [undefined, "c"], detail: ["Tüccarların ilişkisini soruyorsa bir âlimin eserini tek açıklama sayma."] },
    { cells: ["Tasavvuf gelenekleri", "kültürel ve dinî aktarım"], tones: [undefined, "b"], detail: ["Gelenekler öğrenciler ve dervişler aracılığıyla başka bölgelere taşınabilir."] },
    { cells: ["Eserler", "çoğaltma, çeviri, farklı dillerde anlatım"], tones: [undefined, "a"], detail: ["Bilgi aktarımının somut yollarıdır."] },
  ],
  foot: "Bu çoğulluk medeniyeti yalnız yapı ya da yönetim listesi sanmayı önler.",
});

// 22 · Gezi listesi: eser–şehir eşleşmesi, şematik konum.
const trip = mapFig({
  caption:
    "Bölümdeki dört eser–şehir eşleşmesi, batıdan doğuya yaklaşık göreli sırayla yerleştirildi. Bir şehre tıkla: eser açılır. Aynı sanat havzası aynı konum demek değildir. Şematik, ölçekli değil; siyasi sınır çizmez, mesafe ya da tarih üretmez.",
  alt: "Şematik yerleşim: en batıda Granada, ortada kuzeyde Edirne ve güneyde Medine, en doğuda Agra. Çizgi ya da sınır yok.",
  h: 3.9,
  nodes: [
    { x: 1.0, y: -0.9, label: "Granada", tone: "b", title: "Granada (Gırnata)", detail: ["Elhamra Sarayı Granada’dadır."] },
    { x: 4.3, y: -0.3, label: "Edirne", tone: "c", title: "Edirne", detail: ["Selimiye Camii Edirne’dedir."] },
    { x: 5.4, y: -2.3, label: "Medine", tone: "a", title: "Medine", detail: ["Mescid-i Nebevî Medine’dedir."] },
    { x: 8.9, y: -1.7, label: "Agra", tone: "b", title: "Agra", detail: ["Tac Mahal, Babürlü döneminde Agra’da yapılmış bir mimari eserdir."] },
  ],
  edges: [],
  notes: ["Batı solda, doğu sağda; yaklaşık göreli sıra."],
  foot: "Kök görülemez diyorsa eşleşenleri ayırıp dışarıda kalan eseri seç.",
});

/* ---------------- Allah ve insan ilişkisi ---------------- */

// 3 · İki gerekçenin başlangıçları.
const arguments_ = tableFig({
  caption:
    "Gaye ve nizam ile ekmel varlık düşüncesi aynı sonuca yönelse de başlangıç öncülleri farklıdır. Bir gerekçeye tıkla. İkisi de din felsefesi çerçevesinde öğretilir; deneysel ölçüm sonucu diye sunulmaz.",
  alt: "İki satırlı tablo. Gaye ve nizam: başlangıç evrendeki uyum ve işleyiş gözlemi; amaç ve düzenleyici yorumuna geçiş. Ekmel varlık: başlangıç zihindeki en mükemmel varlık düşüncesi; yetkinlik fikrinin varlıkla ilişkisi.",
  cols: [
    { name: "Gerekçe", w: 2.8 },
    { name: "Başlangıç öncülü", w: 3.8 },
    { name: "Yönelim", w: 3.4 },
  ],
  rows: [
    { cells: ["Gaye ve nizam", "evrendeki uyum ve işleyiş", "amaç ve düzenleyici yorumu"], tones: [undefined, "b", "muted"], detail: ["Gaye amaç, nizam düzen demektir; düzen gözlendi öncülünü bütün görüşler deneyle elendi sonucuna büyütme."] },
    { cells: ["Ekmel varlık", "zihindeki en yetkin varlık düşüncesi", "yetkinlik fikrinin varlıkla ilişkisi"], tones: [undefined, "c", "muted"], detail: ["Ekmel en yetkin demektir; başlangıç bir laboratuvar ölçümü değildir."] },
  ],
  foot: "Gerekçenin türünü kullanılan öncüle bakarak belirle.",
});

// 6 · Halık, Bâri, Musavvir.
const creator = tableFig({
  caption:
    "Yaratma fikrinin üç anlam vurgusu. Bir isme tıkla. Soruda şekil ya da suret öne çıkıyorsa Musavvir, genel yaratma ifadesinden daha ayırt edicidir; fiilin nesnesine bak.",
  alt: "Üç satırlı tablo. Halık: yaratma. Bâri: varlıkları örneksiz meydana getirme. Musavvir: biçim ve özellik verme.",
  cols: [
    { name: "İsim", w: 2.8 },
    { name: "Anlam vurgusu", w: 7.2 },
  ],
  rows: [
    { cells: ["Halık", "yaratma"], tones: [undefined, "b"], detail: ["Genel yaratma vurgusudur."] },
    { cells: ["Bâri", "varlıkları örneksiz meydana getirme"], tones: [undefined, "c"], detail: ["Örneksiz meydana getirme vurgusudur."] },
    { cells: ["Musavvir", "biçim ve özellik verme"], tones: [undefined, "a"], detail: ["Bu isimler biçimlenmenin biyolojik ya da fiziksel mekanizmasının yerine konan deneysel açıklamalar değildir."] },
  ],
  foot: "Var etme mi, biçim verme mi, hayat verme mi? Önce fiili yaz.",
});

// 10 · Akıl, irade, sorumluluk.
const human = flowFig({
  caption:
    "Akıl seçenekleri değerlendirir, irade tercih eder, sorumluluk sonuçları üstlenir. İleri ile aç. Bu üç kavram insan her şeyi kontrol eder demek değildir; sorumluluk yetki ve imkânla birlikte düşünülür.",
  alt: "Üç kart alt alta: akıl, seçenekleri değerlendirme; irade, tercih etme; sorumluluk, tercih ve eylemlerin sonuçlarını üstlenme.",
  nodes: [
    { head: "Akıl", text: "seçenekleri değerlendirir", tone: "b", note: "Düşünme, öğrenme ve değerlendirme yetileri Allah–insan ilişkisi içinde ele alınır." },
    { head: "İrade", text: "tercih eder", tone: "c", note: "İrade vurgusu insanın sınırsız güç sahibi olduğu sonucunu vermez." },
    { head: "Sorumluluk", text: "tercih ve eylemlerin sonuçlarını üstlenir", tone: "a", note: "Hazırlık yapmak kişinin eylemidir; sınavın bütün dış koşullarını yönetmek mümkün değildir." },
  ],
  steps: ["Akıl", "İrade", "Sorumluluk"],
  reveal: true,
  foot: "İlahî kudretle insanın sınırlı kapasitesi aynı ölçekte tanımlanmaz.",
});

// 11 · Alîm, Basîr, Semî.
const senses = tableFig({
  caption:
    "İsim, sıfat adı ve fiil birlikte düşünülür ama aynı tanım değildir. Bir isme tıkla. Soru hangi fiili veriyorsa önce onu belirle; soyut nitelik bir organ tasviri olarak çizilmez.",
  alt: "Üç satırlı tablo. Alîm: her şeyi bilen; sıfat ilim; fiil bilmek. Basîr: gören; sıfat basar; fiil görmek. Semî: işiten; sıfat sem; fiil işitmek.",
  cols: [
    { name: "İsim", w: 2.6 },
    { name: "Anlam", w: 3.0 },
    { name: "Sıfat", w: 2.0 },
    { name: "Fiil", w: 2.4 },
  ],
  rows: [
    { cells: ["Alîm", "her şeyi bilen", "ilim", "bilmek"], tones: [undefined, "b", "c", "a"], detail: ["Bilme fiili vurgulanıyorsa Alîm ve ilim öne çıkar."] },
    { cells: ["Basîr", "gören", "basar", "görmek"], tones: [undefined, "b", "c", "a"], detail: ["Yalnız görme vurgusunda Basîr öne çıkar."] },
    { cells: ["Semî", "işiten", "sem", "işitmek"], tones: [undefined, "b", "c", "a"], detail: ["Bir ses örneğinde yalnız işitme fiili vurgulanmışsa Semî anlamı aranır."] },
  ],
  foot: "Seçim, ilahî bilginin başka yönü olmadığı iddiası değildir.",
});

// 16 · Tövbe ve istiğfar.
const repent = tableFig({
  caption:
    "Tövbe ve istiğfar yakın kavramlardır ama vurguları ayrıdır. Bir kavrama tıkla. Uygulama kimsenin tövbesinin kabulünü ya da ahlaki puanını hesaplamaz.",
  alt: "Üç satırlı tablo. Tövbe: pişmanlık duyarak yanlıştan dönme ve sürdürmemeye yönelme. İstiğfar: bağışlanma dileme. Hak onarımı: birine zarar verilmişse mümkün düzeltme ayrıca düşünülür.",
  cols: [
    { name: "Kavram", w: 3.0 },
    { name: "Vurgu", w: 7.0 },
  ],
  rows: [
    { cells: ["Tövbe", "pişmanlıkla yanlıştan dönme, sürdürmemeye yönelme"], tones: [undefined, "b"], detail: ["Pişmanlığı davranış değişikliğine bağlama vurgusu."] },
    { cells: ["İstiğfar", "bağışlanma dileme"], tones: [undefined, "c"], detail: ["Af dileme vurgusu."] },
    { cells: ["Hak onarımı", "zarar verilmişse mümkün düzeltme"], tones: [undefined, "a"], detail: ["Yalnız üzülmek zarar gören kişinin hakkını kendiliğinden onarmaz."] },
  ],
  foot: "Kişinin sözünü ve eylemini birlikte incele.",
});

// 21 · Yakın kavramlar çizelgesi.
const chart = tableFig({
  caption:
    "Bir isim ya da sıfat sorusunda önce belirleyici fiili yaz. Bir fiile tıkla: karşılığı açılır. Birden çok kavram uyuyorsa kökün en doğrudan kısıtına dön.",
  alt: "Yedi satırlı tablo. Diri olma: Hayy. Hayat verme: Muhyî. Rızık verme: Rezzak. Biçim verme: Musavvir. Bilme: ilim. Güç yetirme: kudret. Yaratma: tekvin.",
  cols: [
    { name: "Belirleyici fiil", w: 4.0 },
    { name: "Karşılık", w: 3.0 },
    { name: "Tür", w: 3.0 },
  ],
  rows: [
    { cells: ["Diri olma", "Hayy", "isim"], tones: [undefined, "a", "muted"], detail: ["Hayy diri olan anlamındadır."] },
    { cells: ["Hayat verme", "Muhyî", "isim"], tones: [undefined, "a", "muted"], detail: ["Diri olan kim, hayat verilen kim? Özne ve yönü yaz."] },
    { cells: ["Rızık verme", "Rezzak", "isim"], tones: [undefined, "a", "muted"], detail: ["Rezzak rızık vermeyi öne çıkarır."] },
    { cells: ["Biçim verme", "Musavvir", "isim"], tones: [undefined, "a", "muted"], detail: ["Musavvir biçim ve özellik verme yönüyle açıklanır."] },
    { cells: ["Bilme", "ilim", "sıfat"], tones: [undefined, "b", "muted"], detail: ["Her şeyi bilme açıkça veriliyorsa ilim."] },
    { cells: ["Güç yetirme", "kudret", "sıfat"], tones: [undefined, "b", "muted"], detail: ["Kudret güç yetirme anlamıyla öğretilir."] },
    { cells: ["Yaratma", "tekvin", "sıfat"], tones: [undefined, "b", "muted"], detail: ["Tekvin daha geniş yaratma sıfatıdır."] },
  ],
  foot: "Yeni koşul icat ederek seçim yapılmaz.",
});

export const religionFigures062Belief: Record<string, Record<string, FigureDef>> = {
  "gonul-cografyamiz": {
    "Türkistan ve Maveraünnehir": scales,
    "Âlimler ve farklı katkılar": scholars,
    "Mısır, Kahire ve Ezher": houses,
    "Endülüs: İber Yarımadası": andalus,
    "Yayılma yollarını çoğul düşün": routes,
    "Gezi listesi ve olumsuz kök": trip,
  },
  "allah-ve-insan-iliskisi": {
    "Ekmel varlık düşüncesi": arguments_,
    "Halık, Bâri ve Musavvir": creator,
    "İnsan: akıl, irade ve sorumluluk": human,
    "Alîm, Basîr ve Semî: fiilleri ayrı tanı": senses,
    "Tövbe ve istiğfar": repent,
    "Yakın kavramları bir çizelgede ayır": chart,
  },
};
