import type { FigureDef } from "./figureKit";
import { flowFig, tableFig } from "./turkishFigures060Kit";

/*
 * Forge061 TYT Din Kültürü · Dünya ve ahiret, İslam ve bilim, Kur’an’a göre
 * Hz. Muhammed. Terim, ad, eser ve ayet göndermeleri yalnız bölüm metninden
 * alınır. Evre şeması bir takvim değildir; kurum ve bilgin tabloları ders
 * sınıflamasıdır, kimseye hüküm ya da puan vermez.
 */

// dunya-ve-ahiret · 1 · Ahiret evreleri (sıra, takvim değil).
const stages = flowFig({
  caption:
    "Ahiret ölüm sonrası hayatın bütününe verilen üst kavramdır; içinde anlatılan evreler bölümdeki sırayla. İleri ile her evreyi aç. Şemadaki sıra bir takvim değildir: A’râf 187 bağlamında vaktinin bilgisinin Allah’a ait olduğu öğretilir.",
  alt: "Yedi kart alt alta, oklarla bağlı: ölüm; berzah, ölümden yeniden dirilişe kadar ara dönem; kıyamet, kozmik düzenin bozulması; ba’s, yeniden dirilme; haşir, toplanma; hesap ve mizan, sorgulama ve tartı; cennet ve cehennem, sonuç kavramları.",
  nodes: [
    { head: "Ölüm", text: "dünya hayatının sona ermesi; ecel bu sonu anlatır", tone: "muted", note: "İslam öğretisi ölümü mutlak yok oluş olarak görmez; ölüm sonrası hayatın başlangıcıyla ilişkilendirir." },
    { head: "Berzah", text: "ölümden ba’sa kadar ara dönem (kabir hayatı)", tone: "b", note: "İki sınırı yaz: ölüm gerçekleşmiş, ba’s henüz gerçekleşmemiştir; toplanma veya hesap anlatılıyorsa artık bu dönem değildir." },
    { head: "Kıyamet", text: "evre şemasında kozmik düzenin bozulması", tone: "b", note: "Kıyamet geniş bir terimdir; tarihini veya süresini bir şemadan hesaplayamazsın." },
    { head: "Ba’s", text: "yeniden diriltilme; İsrafil’in sûra üflemesiyle ilişkilendirilir", tone: "c", note: "Ayırt edici fiil canlanma veya diriltilmedir; bir araya gelme ayrı bir eylemdir." },
    { head: "Haşir", text: "diriltilenlerin hesap için toplanması; yeri mahşer", tone: "c", note: "Haşir eylem, mahşer yerdir: ne oldu sorusu eylemi, nerede sorusu yeri arar." },
    { head: "Hesap ve mizan", text: "sorgulama; amellerin tartılması ve değerlendirilmesi", tone: "a", note: "Hesap sorgulama boyutunu, mizan tartı ve değerlendirme imgesini öne çıkarır; Enbiyâ 47 bağlamında haksızlık yapılmaması vurgulanır." },
    { head: "Cennet ve cehennem", text: "mükâfat ve ceza bağlamındaki sonuç kavramları", tone: "a", note: "Cennet tasvirlerinde Allah’ın rızası nimetlerin üstünde bir değer olarak vurgulanır; tek davranıştan gerçek kişinin sonucu ilan edilmez." },
  ],
  steps: ["Ölüm", "Berzah", "Kıyamet", "Ba’s", "Haşir", "Hesap, mizan", "Sonuç"],
  reveal: true,
  foot: "Üst kavram ile içindeki evre arasındaki ilişki bütün-parça ilişkisidir.",
});

// dunya-ve-ahiret · 2 · Ba’s, haşir, mahşer.
const actPlace = tableFig({
  caption:
    "Yakın terimler farklı sorulara yanıt verir: bir eylem mi, bir yer mi? Bir terime tıkla: ayırt edici fiil ve karıştırılan nokta açılır. Bir cümle iki bilgiyi birlikte verebilir; birini silmeden ikisini ayrı eşleştir.",
  alt: "Üç satırlı tablo. Ba’s: ne oldu, yeniden dirilme. Haşir: ne oldu, diriltilenlerin toplanması. Mahşer: nerede, toplanmanın yeri.",
  cols: [
    { name: "Terim", w: 2.4 },
    { name: "Soru", w: 2.4 },
    { name: "Karşılığı", w: 5.2 },
  ],
  rows: [
    { cells: ["Ba’s", "Ne oldu?", "öldükten sonra yeniden diriltilme"], tones: [undefined, "muted", "c"], detail: ["Ayırt edici fiil canlanma veya diriltilmedir.", "Sorunun yalnız ilk eylemi istemesi ba’sı öne çıkarır."] },
    { cells: ["Haşir", "Ne oldu?", "diriltilenlerin hesap için bir araya getirilmesi"], tones: [undefined, "muted", "b"], detail: ["Haşir toplanma eylemidir; dirilme ayrı bir fiildir."] },
    { cells: ["Mahşer", "Nerede?", "toplanmanın yeri"], tones: [undefined, "muted", "a"], detail: ["Mahşer bu toplanmanın yeridir; aynı kökle ilişkili olsa da haşirle aynı soruya cevap vermez."] },
  ],
  foot: "Toplanma fiilini ve toplanılan yeri ayrı göster.",
});

// dunya-ve-ahiret · 3 · Amel defteri, hesap, mizan.
const record = tableFig({
  caption:
    "Kayıt, kayda dayanarak değerlendirme ve tartı imgesi üç ayrı vurgudur. Bir kavrama tıkla: bölümdeki tanımı açılır. Bu tablo bir puanlama değildir; uygulamadaki bir tıklama ya da doğru cevap dinî anlamda amel hesabı sayılmaz.",
  alt: "Üç satırlı tablo. Amel defteri: iş ve davranışların kaydı. Hesap: dünyada yapılanların değerlendirilmesi ve sorgulanması. Mizan: amellerin tartılması ve değerlendirilmesi imgesi; Enbiyâ 47, haksızlık yapılmaması.",
  cols: [
    { name: "Kavram", w: 2.9 },
    { name: "Vurgu", w: 3.0 },
    { name: "Bölümdeki açıklama", w: 4.1 },
  ],
  rows: [
    { cells: ["Amel defteri", "kayıt", "iş ve davranışların kaydı"], tones: [undefined, "b", "muted"], detail: ["Amel kişinin iş ve davranışları için kullanılan terimdir; amel defteri bunların kaydıyla ilişkilidir."] },
    { cells: ["Hesap", "sorgulama", "dünyada yapılanların değerlendirilmesi"], tones: [undefined, "c", "muted"], detail: ["Kayıt ile kayda dayanarak değerlendirme aynı işlem değildir; hiçbir davranışın önemsiz sayılmaması ve adalet vurgusu bulunur."] },
    { cells: ["Mizan", "tartı imgesi", "amellerin tartılması; Enbiyâ 47: haksızlık yapılmaz"], tones: [undefined, "a", "muted"], detail: ["Kaynak mizanın mahiyetini insanın bütünüyle ölçebileceği fiziksel bir terazi gibi açıklamaz."] },
  ],
  foot: "Şemadaki kutulara sayı koymak gerçek bir kişinin sonucunu hesaplamaya yetmez.",
});

// dunya-ve-ahiret · 4 · Teçhiz ve alt işlemleri.
const tajhiz = flowFig({
  caption:
    "Teçhiz, vefat edenin defin için hazırlanması ve uğurlanmasına ilişkin işlemlerin genel adıdır; dört alt işlem bölümdeki sırayla. İleri ile her işlemi aç ve nesnesini oku: yıkama mı, kefenleme mi, taşıma mı, toprağa verme mi?",
  alt: "Dört kart alt alta: gasil, yıkama; tekfin, kefenleme; teşyî, cenazeyi taşıma ve uğurlama; defin, toprağa verme. Hepsinin üst adı teçhiz.",
  nodes: [
    { head: "Gasil", text: "bedenin yıkanması", tone: "b", note: "Gasil yıkama anlamıyla ayırt edilir." },
    { head: "Tekfin", text: "kefene sarma", tone: "b", note: "Tekfin kefenlemedir ve teçhiz bütününün yalnız bir parçasıdır." },
    { head: "Teşyî", text: "cenazeyi taşıma ve uğurlama", tone: "c", note: "Teşyî cenazeyi taşıma ve uğurlama anlamıyla ayırt edilir." },
    { head: "Defin", text: "toprağa verme", tone: "a", note: "Defin toprağa vermedir; aynı süreçte bulunmaları bu fiilleri eş anlamlı yapmaz." },
  ],
  steps: ["Gasil", "Tekfin", "Teşyî", "Defin"],
  reveal: true,
  foot: "Üst başlık isteniyorsa teçhiz, özel eylem isteniyorsa onun adı seçilir.",
});

// islam-ve-bilim · 1 · Gözlem, deney, çıkarım.
const method = tableFig({
  caption:
    "Aynı çalışmada üçü birlikte bulunabilir ama tanımları ayrıdır. Bir işleme tıkla: tanımı ve sık yapılan aşırı genelleme açılır.",
  alt: "Üç satırlı tablo. Gözlem: olayı sistemli izleyip kaydetme. Deney: koşulları düzenleyerek bir açıklamayı sınama. Çıkarım: öncüllerden gerekçeli sonuca yönelme.",
  cols: [
    { name: "İşlem", w: 2.6 },
    { name: "Ne yapılır?", w: 7.4 },
  ],
  rows: [
    { cells: ["Gözlem", "olayı sistemli biçimde izleyip kaydetme"], tones: [undefined, "b"], detail: ["Gözlem bir olayı sistemli biçimde izleyip kaydetmedir.", "İki olayın birlikte görülmesi tek başına birinin ötekine neden olduğunu kanıtlamaz."] },
    { cells: ["Deney", "koşulları düzenleyerek bir açıklamayı sınama"], tones: [undefined, "c"], detail: ["Deney koşulları düzenleyerek bir açıklamayı sınamadır.", "Metin yalnız eski bir kitabın çevrildiğini söylüyorsa yeni deney yapıldığını ekleme."] },
    { cells: ["Çıkarım", "verilen öncüllerden gerekçeli sonuca yönelme"], tones: [undefined, "a"], detail: ["Çıkarım verilen öncüllerden gerekçeli sonuca yönelmedir.", "Karşılaştırma, koşullar ve alternatif açıklamalar gerekebilir."] },
  ],
  foot: "İlham ile sonucun deneysel kanıtı farklıdır.",
});

// islam-ve-bilim · 2 · Eğitim ortamları (yer, dönem, faaliyet).
const schools = tableFig({
  caption:
    "Bölümdeki eğitim ortamlarını yer, dönem ve faaliyet üçlüsüyle oku. Bir ortama tıkla: bölümdeki bilgi ve uyarı açılır. Yeni kurumların açılması öncekilerin sona erdiği anlamına gelmez; bu ortamlar birlikte var olabilmiştir.",
  alt: "Beş satırlı tablo. Dârülerkâm: Mekke, ilk dönem, Erkam’ın evi. Suffe: Medine, Mescid-i Nebî’ye bitişik eğitim. Cami ve ders halkası: tefsir, hadis, fıkıh. Mektep: temel okuma-yazma. Medrese: örgütlü ve ileri öğretim; Nizamiye, Sahn-ı Seman, Süleymaniye.",
  cols: [
    { name: "Ortam", w: 2.8 },
    { name: "Yer ya da örnek", w: 3.5 },
    { name: "Faaliyet", w: 3.7 },
  ],
  rows: [
    { cells: ["Dârülerkâm", "Mekke, Erkam’ın evi", "ilk dönem eğitim ortamı"], tones: [undefined, "muted", "b"], detail: ["İlk dönem Mekke’de Erkam’ın evi eğitim ortamları arasında anılır."] },
    { cells: ["Suffe", "Medine, Mescid-i Nebî’ye bitişik", "eğitim ve öğrenim"], tones: [undefined, "muted", "b"], detail: ["Suffe’yi Bağdat’taki sonraki çeviri merkezinin başka adı sayma."] },
    { cells: ["Cami, ders halkası", "camiler", "tefsir, hadis, fıkıh dersleri"], tones: [undefined, "muted", "c"], detail: ["Ders halkası öğreticinin çevresinde öğrenim görme biçimidir; medreseler açılınca camilerdeki eğitim zorunlu olarak bitmez."] },
    { cells: ["Mektep", "tarihî bağlam", "temel okuma-yazma, başlangıç öğretimi"], tones: [undefined, "muted", "c"], detail: ["Bugünkü okul türleriyle karşılaştırma benzetmedir, tam kurum özdeşliği değildir."] },
    { cells: ["Medrese", "Nizamiye, Sahn-ı Seman, Süleymaniye", "örgütlü ve ileri öğretim"], tones: [undefined, "muted", "a"], detail: ["Programlar zamana ve yere göre değişebilir; kurum adından bütün öğrencilerin aynı içerikle eğitim aldığı çıkmaz."] },
  ],
  foot: "Erken bir ortamdan söz edilmesi bütün uzmanlıkların orada aynı biçimde okutulduğunu göstermez.",
});

// islam-ve-bilim · 3 · Kurumlar ve öğretimin nesnesi.
const institutions = tableFig({
  caption:
    "Kurum adını seçmeden önce öğretimin ya da faaliyetin nesnesini yaz. Bir kuruma tıkla: bölümdeki örnekler ve karıştırılan nokta açılır.",
  alt: "Beş satırlı tablo. Dârülkurra: Kur’an okuma ve kıraat. Dârülhadis: hadis rivayetlerinin aktarımı ve incelenmesi. Beytü’l-hikme: Abbasi Bağdat’ında kitap, çeviri, ilmî çalışma; Huneyn bin İshak. Rasathane: gök cisimlerinin sistemli gözlemi; Merâga, Semerkant, İstanbul. Şifahane: hasta bakımı ve tedavi, bazen tıp öğretimi; Gevher Nesibe, Divriği.",
  cols: [
    { name: "Kurum", w: 3.3 },
    { name: "Nesne", w: 3.4 },
    { name: "Bölümdeki örnek", w: 3.3 },
  ],
  rows: [
    { cells: ["Dârülkurra", "Kur’an okuma, kıraat", "hafızlık, doğru okuma"], tones: [undefined, "c", "muted"], detail: ["Kıraat metnin okunuşuyla ilgili özel alandır; İslamî eğitim veren her kurum dârülkurra değildir."] },
    { cells: ["Dârülhadis", "hadis rivayetleri", "aktarım, açıklama, inceleme"], tones: [undefined, "c", "muted"], detail: ["Kur’an okuma usulü verilmişse kıraat, Hz. Peygamber’e nispet edilen rivayetler verilmişse hadis odağı öne çıkar."] },
    { cells: ["Beytü’l-hikme", "kitap, çeviri, ilmî çalışma", "Abbasi Bağdat’ı; Huneyn bin İshak"], tones: [undefined, "b", "muted"], detail: ["Farklı dillerdeki bilgi birikiminin aktarılmasında rol oynar; bütün araştırmaların yalnız o binada doğduğu sonucu çıkmaz."] },
    { cells: ["Rasathane", "gök cisimlerinin sistemli gözlemi", "Merâga, Semerkant, İstanbul"], tones: [undefined, "b", "muted"], detail: ["Gözlem araçları, konum kayıtları ve astronomi cetvelleri bu faaliyete hizmet eder."] },
    { cells: ["Şifahane", "hasta bakımı, tedavi; bazen tıp öğretimi", "Gevher Nesibe, Divriği"], tones: [undefined, "a", "muted"], detail: ["Dârüşşifa olarak da anılır; tarihî tedavilerin bugün güvenli olduğu anlamına gelmez, modern tedavi için güncel kanıt gerekir."] },
  ],
  foot: "Kurumun rolünü belgelenen faaliyetle sınırla.",
});

// islam-ve-bilim · 4 · Bilginler ve katkılar.
const scientists = tableFig({
  caption:
    "Bölümde anılan bilginler ve katkılarının alanı. Bir ada tıkla: eser ya da yöntem ve aşırı genelleme uyarısı açılır. Ortak olan araştırma ve katkı çabasıdır; dönem, araç ve problem farklıdır.",
  alt: "On satırlı tablo. Hârizmî: cebir, El-Cebr ve’l-Mukabele. İbnü’l-Heysem: optik, karanlık oda. İbn Sînâ: tıp, el-Kânûn fi’t-Tıbb. Ebû Bekir er-Râzî: hastalıkların ayırt edilmesi. Zehrâvî: cerrahi. İbnü’n-Nefîs: küçük kan dolaşımı. Cezerî: su düzenekleri, saatler, otomatlar. Uluğ Bey: Semerkant’ta astronomi ve cetveller. Ali Kuşçu: astronomi ve matematik. Aziz Sancar: DNA onarımı, Nobel Kimya Ödülü.",
  cols: [
    { name: "Bilgin", w: 3.4 },
    { name: "Alan", w: 2.4 },
    { name: "Eser ya da katkı", w: 4.2 },
  ],
  rows: [
    { cells: ["Hârizmî", "matematik", "El-Cebr ve’l-Mukabele"], tones: [undefined, "c", "muted"], detail: ["Adı algoritma teriminin tarihine kaynaklık etmiştir.", "Katkıyı sıfırı veya logaritmayı tek başına icat ettiği şeklinde genişletme."] },
    { cells: ["İbnü’l-Heysem", "optik", "ışık, görme; karanlık oda"], tones: [undefined, "c", "muted"], detail: ["Görmeyi cisimlerden göze ulaşan ışıkla açıklar; optiği yalnız gözden ışın çıkması varsayımıyla eşleme."] },
    { cells: ["İbn Sînâ", "tıp", "el-Kânûn fi’t-Tıbb"], tones: [undefined, "a", "muted"], detail: ["Eski bir eserin yaygın okunması bugünkü bütün önerilerinin geçerli olduğunu kanıtlamaz."] },
    { cells: ["Ebû Bekir er-Râzî", "tıp", "hastalıkların ayırt edilmesi"], tones: [undefined, "a", "muted"], detail: ["Tıp ve hastalıkların ayırt edilmesine ilişkin çalışmalarıyla tanınır."] },
    { cells: ["Zehrâvî", "tıp", "cerrahi eserler"], tones: [undefined, "a", "muted"], detail: ["Cerrahi eserleriyle tanınır; bütün tıbbın tek kurucusu diye tanıtılmaz."] },
    { cells: ["İbnü’n-Nefîs", "tıp", "küçük kan dolaşımı"], tones: [undefined, "a", "muted"], detail: ["Küçük kan dolaşımına ilişkin açıklamalarıyla anılır."] },
    { cells: ["Cezerî", "mekanik", "su düzenekleri, saatler, otomatlar"], tones: [undefined, "b", "muted"], detail: ["Cezerî’nin otomatı modern dijital bilgisayarla aynı nesne değildir."] },
    { cells: ["Uluğ Bey", "astronomi", "Semerkant; astronomi cetvelleri"], tones: [undefined, "b", "muted"], detail: ["Semerkant’taki astronomi çalışmaları ve cetvellerle tanınır."] },
    { cells: ["Ali Kuşçu", "astronomi", "astronomi ve matematik birikimi"], tones: [undefined, "b", "muted"], detail: ["Astronomi ve matematik birikimiyle tanınır."] },
    { cells: ["Aziz Sancar", "kimya", "DNA onarımı; Nobel Kimya Ödülü"], tones: [undefined, "c", "muted"], detail: ["Güncel örnektir; bir ödülün alanı kişinin bütün çalışmasını tek terimle açıklamaz."] },
  ],
  foot: "Katkının eser, yöntem ve tarih bağlamını ayır.",
});

// kur-ana-gore-hz-muhammed · 1 · İki yön.
const twoAspects = tableFig({
  caption:
    "Kaynak Hz. Muhammed’i insan oluşu ve peygamber oluşuyla birlikte tanıtır; iki yön aynı kişide bulunur, biri ötekini silmez. Bir yöne tıkla: örnekleri ve çıkarılamayacak sonuç açılır.",
  alt: "İki satırlı tablo. İnsani yön: yemek, çalışmak, dinlenmek, hastalanmak, ölümlü olmak. Peygamberlik yönü: vahiy alarak ilahî mesajı bildirme görevi.",
  cols: [
    { name: "Yön", w: 3.0 },
    { name: "Bölümdeki örnekler", w: 7.0 },
  ],
  rows: [
    { cells: ["İnsani yön", "yemek, çalışmak, dinlenmek, hastalanmak, ölümlü olmak"], tones: [undefined, "b"], detail: ["İnsan oluşuna ait veri bulunduğunda elçilik görevinin olmadığı sonucuna varılmaz."] },
    { cells: ["Peygamberlik yönü", "vahiy alarak ilahî mesajı bildirme görevi"], tones: [undefined, "c"], detail: ["Peygamberlikten yorulmaz veya ölümsüz olduğu sonucu çıkarılamaz."] },
  ],
  foot: "Önce her fiilin hangi yönü anlattığını yaz; sonra sorunun çelişki mi, ortak özellik mi, ayırt edici görev mi sorduğunu belirle.",
});

// kur-ana-gore-hz-muhammed · 2 · Dört görev.
const duties = tableFig({
  caption:
    "Dört görevi belirleyici fiilleriyle karşılaştır. Bir göreve tıkla: bölümdeki örnek ve karıştırılan nokta açılır. Aynı olayda birden çok görev bulunabilir; kök yalnız birini soruyorsa o aşamanın fiilini seç.",
  alt: "Dört satırlı tablo. Tebliğ: ulaştırmak, bildirmek; namazı kılın buyruğunu bildirme. Tebyin: anlamı ve uygulamayı açıklamak; namazın nasıl kılınacağını öğretme. Teşri: hüküm koymak; açık helal-haram hükmü. Temsil: ilkeyi davranışla göstermek; adaleti uygulamada gözetme.",
  cols: [
    { name: "Görev", w: 2.4 },
    { name: "Belirleyici fiil", w: 3.4 },
    { name: "Bölümdeki örnek", w: 4.2 },
  ],
  rows: [
    { cells: ["Tebliğ", "ulaştırmak, bildirmek", "“Namazı kılın” buyruğunu bildirme"], tones: [undefined, "c", "muted"], detail: ["Peygamberin aldığı ilahî bilgiyi eksiksiz biçimde insanlara duyurması; anlam uzun uzadıya açıklanmadan da duyurulabilir."] },
    { cells: ["Tebyin", "anlamı ve uygulamayı açıklamak", "namazın nasıl kılınacağını öğretme"], tones: [undefined, "b", "muted"], detail: ["Anlaşılması güç ayetlerin veya ibadetlerin uygulanışının öğretilmesi; açıklama yeni hüküm koyma sayılmaz."] },
    { cells: ["Teşri", "hüküm koymak", "açık helal-haram hükmü bildirme"], tones: [undefined, "a", "muted"], detail: ["Allah’ın izni ve bilgisi çerçevesindeki peygamberlik yetkisiyle ilişkilendirilir; sıradan öğütten farklı normatif işlev taşır."] },
    { cells: ["Temsil", "ilkeyi davranışla göstermek", "belirli durumda hakkı gözeterek davranma"], tones: [undefined, "c", "muted"], detail: ["Adalet hakkında konuşmak sözel bildirim, hakkı gözeterek davranmak temsil yönüdür."] },
  ],
  foot: "Görev adını gündelik başka anlamından değil, verilen davranıştan kur.",
});

// kur-ana-gore-hz-muhammed · 3 · Kavlî, fiilî, takrirî.
const sunnahTypes = tableFig({
  caption:
    "Aktarımda merkezde hangi fiil var: söz mü, uygulama mı, başkasının davranışına onay mı? Bir türe tıkla: tanımı ve uyarı açılır. Aktarım türü ile eylemin farz, vacip ya da başka hükümde olması aynı sınıflama değildir.",
  alt: "Üç satırlı tablo. Kavlî: söz ve öğüt. Fiilî: yapılan uygulama. Takrirî: başka bir kişinin söz veya davranışının bağlam içinde onaylanması.",
  cols: [
    { name: "Tür", w: 2.4 },
    { name: "Merkezdeki fiil", w: 7.6 },
  ],
  rows: [
    { cells: ["Kavlî", "söz ve öğüt"], tones: [undefined, "c"], detail: ["Kavlî sünnet söz ve öğüttür."] },
    { cells: ["Fiilî", "yapılan uygulama"], tones: [undefined, "b"], detail: ["Fiilî sünnet yapılan uygulamadır; onu yalnız farz dışındaki davranışlarla sınırlamak aktarım türünü hüküm derecesiyle karıştırır."] },
    { cells: ["Takrirî", "başka bir kişinin söz veya davranışının bağlam içinde onaylanması"], tones: [undefined, "a"], detail: ["Yalnız sessizlik gördüğünde otomatik onay sonucu çıkarma; metin onay niteliğini veya bağlamı vermelidir."] },
  ],
  foot: "Aynı olay birden çok aktarım unsuruna sahip olabilir.",
});

// kur-ana-gore-hz-muhammed · 4 · Görev zinciri.
const chain = flowFig({
  caption:
    "Bir olayı parçalarına ayır: mesaj duyurulur, anlamı açıklanır, davranışta örneklenir. İleri ile zinciri kur; son adım teşri için ayrıca neyin gerektiğini gösterir. Açıklamayı seçmek duyuruyu silmez, yalnız odağı değiştirir.",
  alt: "Dört kart alt alta: duyuruldu, tebliğ; anlamı açıklandı, tebyin; davranışla gösterildi, temsil; teşri yalnız ayrıca hüküm koyma bağlamı varsa eklenir.",
  nodes: [
    { head: "Mesaj duyuruldu", text: "tebliğ", tone: "c", note: "Belirleyici fiil ulaştırmak veya bildirmektir." },
    { head: "Anlamı açıklandı", text: "tebyin", tone: "b", note: "Soru “nasıl uygulanacağı anlatıldı” diyorsa açıklama kanıtı vardır." },
    { head: "Davranışla gösterildi", text: "temsil", tone: "a", note: "Duyurma, açıklama ve davranışla gösterme aynı olayın üç ayrı aşaması olabilir: tebliğ→tebyin→temsil." },
    { head: "Hüküm koyma bağlamı var mı?", text: "varsa teşri eklenir; yoksa eklenmez", tone: "muted", note: "Teşriyi eklemek için ayrıca hüküm koyma bağlamı gerekir; bir görevin varlığı öbürlerinin mutlaka gerçekleştiğini göstermez." },
  ],
  steps: ["Duyuru", "Açıklama", "Örneklik", "Teşri denetimi"],
  reveal: true,
  foot: "Verilen fiillerin listesini çıkar, kökün istediği aşamayı seç, kullanılmayan görevi ekleme.",
});

export const religionFigures061Life: Record<string, Record<string, FigureDef>> = {
  "dunya-ve-ahiret": {
    "Ahiret: geniş üst kavram": stages,
    "Haşir ve mahşer": actPlace,
    "Mizan ve adalet": record,
    "Teçhiz ve alt işlemleri": tajhiz,
  },
  "islam-ve-bilim": {
    "Gözlem, deney ve çıkarım": method,
    "Mektep ve medrese": schools,
    "Şifahane ve tıp öğretimi": institutions,
    "Mekanik, astronomi ve güncel örnek": scientists,
  },
  "kur-ana-gore-hz-muhammed": {
    "İnsan ve peygamber: iki yön": twoAspects,
    "Temsil: ilkeyi yaşayarak gösterme": duties,
    "Kavlî, fiilî ve takrirî": sunnahTypes,
    "Görev zincirini parçalara ayır": chain,
  },
};
