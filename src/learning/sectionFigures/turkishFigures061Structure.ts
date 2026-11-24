import type { FigureDef } from "./figureKit";
import { flowFig, ladderFig, rowsFig, tableFig, timelineFig } from "./turkishFigures060Kit";
import { stackFig, type Sent } from "./turkishFigures061Kit";

/*
 * Forge061 TYT Türkçe · paragrafın yapısı: sıralama, cümle ekleme, boşluk
 * doldurma, yardımcı düşünce, ikiye bölme ve akışı bozan cümle. Örnek
 * parçalar ve cümleler yalnız ilgili dersin bölüm metninden alınır. Şemalar
 * ölçekli değildir; adımlar öğrenme kaydı üretmez.
 */

// paragrafta-siralama · 2 · Giriş adayı.
const opener = ladderFig({
  caption:
    "Giriş adayının kendi dayanağı var mı? Sorun gönderme sözünün varlığı değil, gereken öncülün okura verilip verilmediğidir. İleri ile bölümdeki cümleleri merdivende yürüt.",
  alt: "İki basamaklı karar merdiveni. Gönderme sözü dışarıda kalan bir öncüle mi dönüyor, evet ise giriş olamaz. Cümle konuyu okura ilk kez açıyor mu: tanım, tanıtılan kişi ya da genel yargı, evet ise güçlü giriş adayı. Hayır ise öbür cümlelerle sına.",
  rungs: [
    { q: "Gönderme sözü (bu, o, söz konusu) dışarıda kalan bir öncüle mi dönüyor?", yes: "giriş olamaz: öncül verilmemiş", tone: "warn" },
    { q: "Cümle konuyu ilk kez açıyor mu: tanım, tanıtılan kişi, genel yargı?", yes: "güçlü giriş adayı", tone: "c" },
  ],
  last: "Karar için öbür cümlelerle birlikte sına",
  walks: [
    { step: "Bu işlem", example: "“Bu işlem sonucu hızlandırdı.”", stop: 0, why: "İşlem dışarıda bırakılmışsa okur açıklanmamış bir bilgiyle karşılaşır." },
    { step: "Bu yöntem", example: "“Yeni bir tarama yöntemi geliştirildi; bu yöntem silik yazıları belirginleştiriyor.”", stop: 1, why: "“Bu yöntem” aynı cümlenin içindeki tanıtıma döner; cümle konuyu açar." },
    { step: "Genel alan", example: "“Eski kayıtları korumanın farklı yolları vardır.”", stop: 1, why: "Genel bir alan açar; belirli bir arşivdeki yöntem onu somutlaştırabilir." },
  ],
  foot: "Belirli sözcükler için değişmez bir yasak listesi yapma.",
});

// paragrafta-siralama · 7 · Karşıtlık bağlaçları.
const contrastLinks = tableFig({
  caption:
    "Karşıtlık önce bir beklenti kurar. Bir bağlaca tıkla: hangi ilişkiyi kurabildiği ve denetim sorusu açılır. Bağlaç adını söylemek sıra için tek başına yetmez.",
  alt: "Üç satırlı tablo. Buna rağmen: beklenti aşılır, örnek salon küçüktü, buna rağmen katılım yüksekti. Oysa, fakat: karşıtlık, düzeltme ya da sınırlama. Ancak: karşıtlık ya da yalnız anlamı.",
  cols: [
    { name: "Bağlaç", w: 2.6 },
    { name: "Kurduğu ilişki", w: 3.4 },
    { name: "Bölümdeki örnek ya da not", w: 4.0 },
  ],
  rows: [
    { cells: ["buna rağmen", "beklenen sonuç aşılır", "Salon küçüktü. Buna rağmen katılım yüksekti."], tones: [undefined, "a", "muted"], detail: ["İlk durumun düşündürdüğü beklenti ile ikinci durum arasında terslik vardır.", "Hangi engel veya beklenen sonucun aşıldığını bul."] },
    { cells: ["oysa, fakat", "karşıtlık, düzeltme ya da sınırlama", "ilişki bağlama göre değişir"], tones: [undefined, "b", "muted"], detail: ["Bağlama göre karşıtlık, düzeltme veya sınırlama kurabilir."] },
    { cells: ["ancak", "karşıtlık ya da “yalnız”", "anlamı tam cümleden çıkar"], tones: [undefined, "c", "muted"], detail: ["Ancak sözü yalnız anlamında da kullanılabilir."] },
  ],
  foot: "Cümleyi kendi sözlerinle yeniden söyle; hangi beklentinin değiştiğini göster.",
});

// paragrafta-siralama · 11 · Zorunlu çift ve blok.
const pairBlock = flowFig({
  caption:
    "Zorunlu çiftten küçük blok kurma adımları. İleri ile her adımı aç. Blok kesinliği kanıta göre kurulur; aynı kelime iki cümleyi ayrılmaz yapmaz.",
  alt: "Dört kart oklarla alt alta: yöntemin tanıtıldığı cümle; bu yöntem diye işlevinin açıklandığı cümle; bloğun önüne ve arkasına bağlanan görevler; bütün sıra içinde yeniden denetim.",
  nodes: [
    { head: "Tanıtım cümlesi", text: "yöntem önce tanıtılır", tone: "c", note: "Cümlenin ihtiyaç duyduğu belirli öncül burada verilir." },
    { head: "Gönderme cümlesi", text: "“bu yöntem” diye işlevi açıklanır", tone: "c", note: "İki cümle geçici bir blok olarak düşünülebilir." },
    { head: "Bloğun çevresi", text: "önüne ve arkasına hangi görevler bağlanıyor?", tone: "b", note: "Çok seçenekli soruda deneme sayısı azalır." },
    { head: "Bütün sırada denetim", text: "çift gerçekten çalışıyor mu?", tone: "a", note: "Her gönderme bir önceki cümleye dönmez; arada anlamı bozmayan açıklama olabilir." },
  ],
  steps: ["Tanıtım", "Gönderme", "Çevre", "Denetim"],
  reveal: true,
  foot: "Kurduğun çiftin neden zorunlu veya kuvvetli olduğunu belirt.",
});

// paragrafta-siralama · 13 · Son denetim.
const finalCheck = rowsFig({
  caption:
    "Aday sıra bulununca cümleler baştan sona kesintisiz okunur. Bir soruya tıkla: o denetimin neyi yakaladığı açılır.",
  alt: "Dört satır: her gönderme açık bir öncül buluyor mu; her örnek ilgili yargıyı destekliyor mu; neden ve sonuç aynı olayda mı kalıyor; iki aday kalırsa ayrıldıkları ilk bağ.",
  rows: [
    { head: "Gönderme öncülü", text: "her gönderme açık bir öncül buluyor mu?", tone: "c", detail: ["Tanıtılmamış bir nesne güçlü ayırt edici kanıttır."] },
    { head: "Örnek ve yargı", text: "her örnek ilgili yargıyı destekliyor mu?", tone: "c", detail: ["Örneğin genel yargının hangi yanını gösterdiğini söyle."] },
    { head: "Neden ve sonuç", text: "aynı olayda mı kalıyor?", tone: "c", detail: ["Neden ile sonuç her zaman aynı yönde sunulmaz; ama aynı olaya ait olmalıdır."] },
    { head: "İki aday kalırsa", text: "ayrıldıkları ilk bağı bul", tone: "a", detail: ["Somut farkı açıkla; kararı kulağa hoş gelmeye bırakma."] },
  ],
  foot: "Küçük eşleşmelerin toplamı ancak bütünsel denetimle tutarlı paragraf olur.",
});

// paragrafta-cumle-ekleme · 4 · Üçlü denetim.
const triple = flowFig({
  caption:
    "Aday yer bulununca önceki, eklenen ve sonraki cümle tek küçük metin olarak okunur. İleri ile iki bağı sırayla aç. Örnek parçalar bölümün sol ve sağ bağlantı anlatımından alınmıştır.",
  alt: "Üç kart oklarla alt alta. Önceki cümle: yeni cümlenin gerektirdiği bilgiyi verir, örneğin bu araç denmeden önce aracın tanıtılması. Eklenen cümle: yeni yargıyı kurar, örneğin bir sonuç gösterir. Sonraki cümle: Bu değer tabloya yazıldı, önce bir değerin elde edilmesini bekler.",
  nodes: [
    { head: "Önceki cümle (sol bağ)", text: "yeni cümlenin gerektirdiği bilgiyi verir: “bu araç” için aracın tanıtımı", tone: "c", note: "İlk bağlantı yeni yargıyı hazırlar. En yakın isim her zaman doğru dayanak değildir." },
    { head: "Eklenen cümle", text: "yeni bilgiyi kurar: ölçümün belirli bir sonuç gösterdiği", tone: "a", note: "Yeni cümle iki tarafın gereğini birlikte karşılamalıdır." },
    { head: "Sonraki cümle (sağ bağ)", text: "“Bu değer tabloya yazıldı.”: önce bir değer ister", tone: "b", note: "İkinci bağlantı yeni bilginin devamda nasıl kullanıldığını gösterir." },
  ],
  steps: ["Sol bağ", "Eklenen", "Sağ bağ"],
  reveal: true,
  foot: "Doğru yer iki gereği birlikte sağlar ve metnin kalanını bozmaz.",
});

// paragrafta-cumle-ekleme · 7 · Aracı adım.
const bridgeStep = flowFig({
  caption:
    "Bölümdeki olay çifti: bir yol kapanıyor, ulaşım daha sonra normale dönüyor. Eklenecek cümle aradaki aracı adımı kurar. İleri ile köprüyü aç.",
  alt: "Üç kart oklarla alt alta: bir yol kapanıyor; aracı adım, geçici yan yolun açılması; ulaşım daha sonra normale dönüyor.",
  nodes: [
    { head: "İlk olay", text: "bir yol kapanıyor", tone: "muted", note: "İlk olay bir güçlük doğurur." },
    { head: "Aracı adım (eklenecek cümle)", text: "geçici yan yolun açılması", tone: "a", note: "Güçlüğe karşı ne yapıldığını açıklayınca sonuca geçiş anlaşılır." },
    { head: "Sonuç", text: "ulaşım daha sonra normale dönüyor", tone: "c", note: "Aracı işlem aynı sorunu mu çözüyor, önce yapılması gereken adımı atlıyor mu?" },
  ],
  steps: ["Olay", "Köprü", "Sonuç"],
  reveal: true,
  foot: "Yalnız olayların ortak yerde geçmesine bakma; anlatımın yönünü ve zaman işaretlerini koru.",
});

// paragrafta-cumle-ekleme · 11 · Kapsam sınırları.
const scopeAdd = rowsFig({
  caption:
    "Metin yalnız bazı belgelerin taranmasını anlatırken “Bütün belgeler artık erişime açıldı.” cümlesi ek bir iddia getirir. Bir sınıra tıkla: yeni cümlenin hangi sınırı aşabileceği açılır.",
  alt: "Dört satır: kişi, yer, zaman ve nicelik sınırları; yeni cümlenin yargısı metnin sınırlarıyla karşılaştırılır.",
  lead: "Metin: bazı belgelerin taranması. Aday: “Bütün belgeler artık erişime açıldı.”",
  rows: [
    { head: "Nicelik", text: "bazı → bütün: kapsam aşılır", tone: "warn", detail: ["Aynı sözcükleri taşıdığı için uygun görünse bile belirtilen kapsamı aşar."] },
    { head: "Zaman", text: "“artık” yeni bir gerçekleşme iddiası ekler", tone: "b", detail: ["Metnin zamanı ile adayın zamanını karşılaştır."] },
    { head: "Kişi ve yer", text: "kim, nerede: metindekiyle aynı mı?", tone: "c", detail: ["Kişi ve yer sınırları da yeni cümlenin yargısıyla karşılaştırılır."] },
    { head: "Doğru bilgi, doğru konum", text: "gerçek dünyada doğru olmak yetmez", tone: "a", detail: ["Cümle ekleme sorusu dışarıdan en ilginç bilgiyi seçmek değildir."] },
  ],
  foot: "Metin hangi yargıyı kuruyor ve yeni cümle bunun neresinde işe yarıyor, bunu kanıtla.",
});

// paragrafta-bosluk-doldurma · 3 · Ortadaki boşluk.
const middleGap = flowFig({
  caption:
    "Ortadaki boşluk iki yana aynı anda bağlanır. Bölümdeki örnek: önce yöntemin yararı, sonra “Bu sınırlama yüzünden…”. İleri ile boşluğun hangi bilgiyi taşıması gerektiğini aç.",
  alt: "Üç kart oklarla alt alta: önceki cümle yöntemin yararını anlatır; boşluk yöntemin belirli bir sınırını açıklar; sonraki cümle Bu sınırlama yüzünden diye başlar.",
  nodes: [
    { head: "Önceki cümle", text: "yöntemin yararı anlatılır", tone: "c", note: "Sol bağ yarar bilgisiyle ilişkiyi denetler." },
    { head: "Boşluk", text: "yöntemin belirli bir sınırı", tone: "a", note: "Aday hem öncekini almalı hem sonrakini hazırlamalıdır." },
    { head: "Sonraki cümle", text: "“Bu sınırlama yüzünden…”", tone: "b", note: "Sağ bağ sınırlamanın dayanağını denetler: “bu sınırlama” neyi gerektiriyor?" },
  ],
  steps: ["Sol", "Boşluk", "Sağ"],
  reveal: true,
  foot: "Yalnız önceki cümleyle uyuşan adayı hemen seçme; üç cümleyi birlikte oku.",
});

// paragrafta-bosluk-doldurma · 4 · Konum ipucu verir, işi anlam belirler.
const gapJobs = tableFig({
  caption:
    "Bölümdeki boşluk kalıpları: konum ipucu verir, işi bağlaçlar ve düşüncenin yönü belirler. Bir satıra tıkla: boşluğun beklediği iş açılır.",
  alt: "Dört satırlı tablo. Başta: Çünkü kapının menteşesi kırılmış, öncesinde gerekçeyle desteklenen durum ya da öneri. Ortada: Bu sınırlama yüzünden, yöntemin sınırı. Sonda: Bu öneri beklenen etkiyi yaratmadı; çünkü, gerekçe, özet değil. Karşıtlık: Çok ayrıntılı hazırlandık. Oysa, kırılan beklenti.",
  cols: [
    { name: "Konum", w: 1.9 },
    { name: "Bölümdeki kalıp", w: 4.6 },
    { name: "Beklenen iş", w: 3.5 },
  ],
  rows: [
    { cells: ["başta", "“… Çünkü kapının menteşesi kırılmış.”", "gerekçenin desteklediği durum ya da öneri"], tones: [undefined, "muted", "c"], detail: ["Ardından çünkü geliyorsa boşlukta o gerekçeyle desteklenen bir iddia beklenir."] },
    { cells: ["ortada", "“Bu sınırlama yüzünden…” öncesi", "yöntemin belirli bir sınırı"], tones: [undefined, "muted", "c"], detail: ["Orta konumdaki cümle öncekini alır, sonrakini hazırlar."] },
    { cells: ["sonda", "“Bu öneri beklenen etkiyi yaratmadı; çünkü…”", "gerekçe, özet değil"], tones: [undefined, "muted", "a"], detail: ["Cümlenin sonda olması onun işini tek başına belirlemez."] },
    { cells: ["karşıtlık", "“Çok ayrıntılı hazırlandık. Oysa…”", "hazırlığın beklentisinden farklı durum"], tones: [undefined, "muted", "b"], detail: ["Başarısızlık, beklenmedik engel veya hazırlığın her sorunu çözmediği durum bu bağı kurabilir."] },
  ],
  foot: "Son cümleyi seçince neyi tamamladığını somut bir işlevle söyle.",
});

// paragrafta-bosluk-doldurma · 8 · Oysa sonrası.
const oysa = rowsFig({
  caption:
    "“Çok ayrıntılı hazırlandık. Oysa…” boşluğu için aday türleri. Bir satıra tıkla: neden uygun olduğu ya da olmadığı açılır. Her olumsuz cümle karşıtlık için uygun değildir.",
  alt: "Dört satır: başarısızlık, uygun; beklenmedik engel, uygun; hazırlığın her sorunu çözmediğini gösteren durum, uygun; başka bir olay hakkında kötü bilgi, uygun değil.",
  rows: [
    { head: "Başarısızlık", text: "hazırlığın beklentisini bozar", tone: "c", detail: ["Hazırlığın akla getirdiği beklentiden farklı bir durumdur."] },
    { head: "Beklenmedik engel", text: "aynı işlem ve zaman çerçevesinde", tone: "c", detail: ["Aynı kişi, işlem ve zaman çerçevesi sürmelidir."] },
    { head: "Her sorunu çözmeyen hazırlık", text: "beklentinin sınırını gösterir", tone: "c", detail: ["Karşıtlık bağı ilk yargının tümüyle yanlışlığını kanıtlamaz; sınır kurar."] },
    { head: "Başka olay hakkında kötü bilgi", text: "beklentiyi değiştirmez", tone: "warn", detail: ["Başka bir olay hakkında kötü bilgi önceki yargının beklentisini değiştirmeyebilir."] },
  ],
  foot: "Hangi beklentinin kırıldığını metnin verdiği koşullardan çıkar.",
});

// yardimci-dusunce · 0 · Ana sav ve yardımcılar.
const supports = rowsFig({
  caption:
    "Bölümdeki örnek: ana sav ve onu destekleyen iki ayrı bilgi. Bir satıra tıkla: ilişkisi açılır. Yardımcı düşünce önemsiz ya da yanlış demek değildir.",
  alt: "Üç satır: ana düşünce, kent arşivleri kolay erişilebilir olmalı; yardımcı düşünce, yıl etiketleri aramayı hızlandırır; yardımcı düşünce, kataloglar farklı yerlerden taranabilir.",
  rows: [
    { head: "Ana düşünce", text: "kent arşivleri kolay erişilebilir olmalı", tone: "a", detail: ["Yazarın okura iletmek istediği temel yargıdır."] },
    { head: "Yardımcı düşünce", text: "yıl etiketleri aramayı hızlandırır", tone: "c", detail: ["Savı destekleyen ayrı bir bilgidir.", "Bunu doğru söyleyen seçenek yardımcı düşünce olabilir; bütünün ana düşüncesi olmak zorunda değildir."] },
    { head: "Yardımcı düşünce", text: "kataloglar farklı yerlerden taranabilir", tone: "c", detail: ["Savı destekleyen ikinci bir bilgidir."] },
  ],
  foot: "Yardımcı düşünceler savı açıklar, gerekçelendirir, örnekler veya sınırlar.",
});

// yardimci-dusunce · 6 · Destekler, aykırı, belirlenemez.
const threeStates = tableFig({
  caption:
    "Metin bir yargıyı destekleyebilir, ona aykırı bilgi verebilir ya da karar için yeterli bilgi sunmayabilir. Bir yargıya tıkla: gerekçesi açılır. Belirlenemeyen yargı gerçek dünyada yanlış demek değildir.",
  alt: "Dört satırlı tablo. Metin müze salı günleri kapalıdır; yargı salı günü açıktır: aykırı. Metin aynı; yargı müzenin on çalışanı vardır: belirlenemez. Metin kütüphane 1990 yılında açıldı; yargı kuruluş zamanına değinilmiştir: destekler. Yargı bölgenin en eski kütüphanesidir: belirlenemez.",
  cols: [
    { name: "Metin", w: 3.4 },
    { name: "Yargı", w: 3.9 },
    { name: "Durum", w: 2.7 },
  ],
  rows: [
    { cells: ["Müze salı günleri kapalıdır.", "Salı günü açıktır.", "aykırı"], tones: [undefined, "ink", "warn"], detail: ["Yargı metinle çelişir."] },
    { cells: ["Müze salı günleri kapalıdır.", "Müzenin on çalışanı vardır.", "belirlenemez"], tones: [undefined, "ink", "b"], detail: ["Çalışan sayısı hiç verilmemiştir; farklı bir gerekçeyle çıkarılamaz."] },
    { cells: ["Kütüphane 1990 yılında açıldı.", "Kuruluş zamanına değinilmiştir.", "destekler"], tones: [undefined, "ink", "c"], detail: ["İfade birebir aynı olmak zorunda değildir; açık yeniden söyleyiş yeter."] },
    { cells: ["Kütüphane 1990 yılında açıldı.", "Bölgenin en eski kütüphanesidir.", "belirlenemez"], tones: [undefined, "ink", "b"], detail: ["Başka kütüphanelerin tarihleri yoktur; tarih görmek yaş sıralaması kurmak değildir."] },
  ],
  foot: "“Ulaşılamaz” kökünde hem aykırı hem kanıtsız seçenek aday olabilir; bütün seçenekleri denetle.",
});

// yardimci-dusunce · 7 · Nicelik ve derece sınırları.
const limits = tableFig({
  caption:
    "Küçük sözler seçeneğin mantıksal kapsamını değiştirir. Bir cümleye tıkla: neyi bildirdiği ve neyi bildirmediği açılır.",
  alt: "Dört satırlı tablo. Bazı öğrenciler yürüyerek geldi: en az biri; diğerlerinin yürümediğini söylemez. Yalnız üç öğrenci yürüdü: açık sayı sınırı. Kentin önemli müzelerinden biri: sıralama iddiası yok; en önemli müzesi sıralama ekler. Düzenli okuma yeni sorular doğurabilir: imkân; her okuma demez.",
  cols: [
    { name: "Cümle", w: 4.4 },
    { name: "Bildirir", w: 2.8 },
    { name: "Bildirmez", w: 2.8 },
  ],
  rows: [
    { cells: ["Bazı öğrenciler yürüyerek geldi.", "en az biri yürüdü", "ötekiler yürümedi"], tones: [undefined, "c", "warn"], detail: ["Diğerlerinin kesinlikle yürümediğini söylemez."] },
    { cells: ["Yalnız üç öğrenci yürüdü.", "açık sayı sınırı", "dördüncü bir yürüyen"], tones: [undefined, "c", "warn"], detail: ["“Yalnız” açık bir sayı sınırı taşır."] },
    { cells: ["Kentin önemli müzelerinden biri", "önemli bir müze", "en önemli müze"], tones: [undefined, "c", "warn"], detail: ["“En önemli” bütün müzeleri kapsayan bir sıralama iddiası ekler.", "En, tek, ilk, son ve hiçbir sözcüklerini izle."] },
    { cells: ["Düzenli okuma yeni sorular doğurabilir.", "bir imkân", "her okuma soru doğurur"], tones: [undefined, "c", "warn"], detail: ["Olasılık, yeterlilik ve zorunluluk arasında geçiş yeni kanıt ister."] },
  ],
  foot: "Kesin kararını kesin öncüle dayandır.",
});

// yardimci-dusunce · 10 · Koşullu yargının yönü.
const conditional = tableFig({
  caption:
    "Bölümdeki yargı: “Düzenli aranan belgeler kolay bulunur.” Bir duruma tıkla: yargının o durum için ne söylediği açılır. Yargı tek yönlüdür; tersini üretmek verilmemiş bir ilişki ekler.",
  alt: "Dört satırlı tablo. Düzenli arandı ve kolay bulundu: yargı bunu söyler. Düzenli arandı, kolay bulunmadı: yargıyla çelişir. Düzenli aranmadı, kolay bulundu: mümkün, belge masanın üstünde olabilir. Düzenli aranmadı, kolay bulunmadı: yargı bir şey söylemez.",
  cols: [
    { name: "Arama", w: 2.6 },
    { name: "Sonuç", w: 2.6 },
    { name: "Yargıya göre", w: 4.8 },
  ],
  rows: [
    { cells: ["düzenli", "kolay bulundu", "yargı bunu söyler"], tones: [undefined, "ink", "c"], detail: ["Düzenli arama ile kolay bulma arasında verilen yönde ilişki."] },
    { cells: ["düzenli", "bulunmadı", "yargıyla çelişir"], tones: [undefined, "ink", "warn"], detail: ["Düzenli aranıp kolay bulunmayan belge yargıyla çelişir."] },
    { cells: ["düzenli değil", "kolay bulundu", "mümkün: belge masanın üstünde olabilir"], tones: [undefined, "ink", "b"], detail: ["Kolay bulunması mutlaka bu yolla arandığını göstermez."] },
    { cells: ["düzenli değil", "bulunmadı", "yargı bir şey söylemez"], tones: [undefined, "ink", "muted"], detail: ["Koşul gerçekleşmediğinde sonucun kesin gerçekleşmeyeceğini söylemek verilmemiş bir ters ilişki ekler."] },
  ],
  foot: "“Yalnız geçerli kartla açılır” ile “geçerli kartı olan açabilir” aynı kapsamda değildir.",
});

// ikiye-bolme · 2 · Arşiv parçasında sınır.
const ARCHIVE: Sent[] = [
  { n: "I", s: "Kâğıt belgeler nemden korunmalıdır.", role: "koruma gereği" },
  { n: "II", s: "Bu amaçla dolaplarda nem izlenir.", role: "koruma aracı" },
  { n: "III", s: "Ölçümler yıpranma riskini gösterir.", role: "ölçüm yararı" },
  { n: "IV", s: "Dijital kataloglar belgeye erişimi kolaylaştırır.", role: "erişim aracı" },
  { n: "V", s: "Yıl etiketleri aramayı hızlandırır.", role: "erişim yararı" },
];
const split = stackFig({
  caption:
    "Bölümdeki arşiv parçası ve cümle işlevleri. İleri ile üç aday sınırı dene: yanlış sınırda hangi cümlenin yanlış grupta kaldığı uyarı tonuyla işaretlenir. Doğru sınır ikinci işlev grubunun tanıtıldığı yerdedir.",
  alt: "Beş numaralı cümle alt alta, her birinin altında işlevi: koruma gereği, koruma aracı, ölçüm yararı, erişim aracı, erişim yararı. Sınır III’ten önce konursa ölçüm yararı erişim bloğuna taşınır; V’ten önce konursa erişimi tanıtan IV koruma bloğunda kalır; IV’ten önce konursa iki blok tutarlıdır.",
  sents: ARCHIVE,
  steps: [
    { label: "Tam metin", note: "İlk okumada hepsi arşivle ilgilidir; ikinci okumada işlev grupları görünür." },
    { label: "III’ten önce", cut: 2, flags: { 2: "ölçüm yararı yeni erişim bloğuna taşındı" }, note: "Ölçümün yararı koruma açıklamasına aittir; yanlış grupta kalır." },
    { label: "V’ten önce", cut: 4, flags: { 3: "erişimi tanıtan cümle eski blokta kaldı" }, note: "IV erişimi tanıtır; koruma bloğunda kalınca yeni yönün başı kaybolur." },
    { label: "IV’ten önce", cut: 3, note: "I–III “Belgeler fiziksel olarak nasıl korunur?”, IV–V “Belgeler nasıl daha kolay bulunur?” sorusunu yanıtlar." },
  ],
  foot: "Sorunun yanıtı yalnız bir numara değil, iki açıklama odağının birlikte korunmasıdır.",
});

// ikiye-bolme · 9 · Zaman değişimi tek başına yetmez.
const timeline = timelineFig({
  caption:
    "Bölümdeki kurum çizgisi: üç tarih tek bir gelişim özeti kurar; yeni paragraf, bugünkü erişim güçlüklerinin ayrı incelemesiyle başlar. Bir durağa tıkla. Çizelge ölçekli değildir.",
  alt: "Dört duraklı düşey çizelge: 1990 kuruldu; 2000 yeni binaya taşındı; 2010 dijital katalog açtı; bugün ziyaretçinin erişim güçlükleri ve çözümleri, yeni açıklama odağı.",
  eras: [
    { when: "1990", head: "kuruldu", text: "gelişim özeti", tone: "c", detail: ["Yıl değişmesi zaman çizgisi içinde doğal bir adımdır."] },
    { when: "2000", head: "yeni binaya taşındı", text: "aynı gelişim özeti", tone: "c", detail: ["Takvimdeki sıçrama tek başına yeni paragraf gerektirmez."] },
    { when: "2010", head: "dijital katalog açtı", text: "aynı gelişim özeti", tone: "c", detail: ["Üç tarih tek bir gelişim özeti oluşturabilir."] },
    { when: "bugün", head: "erişim güçlükleri ve çözümleri", text: "yeni açıklama odağı: sınır burada", tone: "a", detail: ["Tarihsel gelişimden bugünkü sorunların ayrı incelemesine geçiş yeni amaç doğurur."] },
  ],
  foot: "Takvimdeki sıçramanın büyüklüğünü değil, cümle grubunun hangi soruya cevap verdiğini ara.",
});

// ikiye-bolme · 13 · Bölme ile çıkarma.
const splitVsRemove = tableFig({
  caption:
    "İki işlem iki ayrı soruya cevap verir. Bir satıra tıkla: bölümdeki örnek ve sonuç metni açılır.",
  alt: "İki satırlı tablo. İkiye bölme: cümle silinmez, yeni tutarlı grubun başı olabilir; örnek üç cümle koruma, üç cümle erişim; sonuç iki paragraf. Akışı bozan cümle: bir cümle çıkarılır; örnek araya giren yemek tarifi cümlesi; sonuç tek ana çizgi.",
  cols: [
    { name: "Soru", w: 2.6 },
    { name: "İşlem", w: 3.0 },
    { name: "Bölümdeki örnek", w: 4.4 },
  ],
  rows: [
    { cells: ["ikiye bölme", "sınır koy, cümle silme", "üç cümle koruma, üç cümle erişim: iki paragraf"], tones: [undefined, "c", "muted"], detail: ["Farklı görünen cümle yeni bir tutarlı grubun başlangıcı olabilir."] },
    { cells: ["akışı bozan cümle", "bir cümle çıkar", "araya giren tek yemek tarifi cümlesi"], tones: [undefined, "warn", "muted"], detail: ["Çıkarılınca kalan cümleler tek ana çizgiyi daha iyi sürdürür."] },
  ],
  foot: "Metni istediğin çözüm türüne uydurmak için cümle saklama veya yok sayma.",
});

// akisi-bozan-cumle · 2 · Yağmur suyu parçası.
const RAIN: Sent[] = [
  { n: "I", s: "Bahçede yağmur suyu biriktiriliyor.", role: "uygulamayı tanıtma" },
  { n: "II", s: "Su kapalı bir kapta tutuluyor.", role: "saklama aracı" },
  { n: "III", s: "Okul sergisi cuma günü açılacak.", role: "sergi tarihi" },
  { n: "IV", s: "Bu kap haftada bir temizleniyor.", role: "aracın bakımı" },
  { n: "V", s: "Biriken su çiçekleri sulamakta kullanılıyor.", role: "suyun kullanımı" },
];
const removeTest = stackFig({
  caption:
    "Bölümdeki süreç paragrafı ve cümle işlevleri. İleri ile adayı çıkar ve karşı denemeyi yap: çıkarılan cümle soluk ve kesik çerçeveyle yerinde kalır, bozulan bağ uyarı tonuyla yazılır.",
  alt: "Beş numaralı cümle alt alta: yağmur suyu biriktiriliyor, uygulamayı tanıtma; su kapalı bir kapta tutuluyor, saklama aracı; okul sergisi cuma günü açılacak, sergi tarihi; bu kap haftada bir temizleniyor, aracın bakımı; biriken su çiçekleri sulamakta kullanılıyor, suyun kullanımı. III çıkarılınca bağ onarılır; II çıkarılınca bu kap sözü belirsizleşir ve sergi cümlesi arada kalır.",
  sents: RAIN,
  steps: [
    { label: "Tam metin", flags: { 2: "sergi tarihi: işlem zincirine katılmıyor" }, note: "Ortak açıklama yağmur suyunun toplanıp kullanılma düzenidir; III bir adaydır." },
    { label: "III’ü çıkar", removed: [2], note: "“Bu kap” önceki cümlede tanıtılan kaba döner; tanıtma, araç, bakım ve kullanım aynı düşünceyi geliştirir." },
    { label: "II’yi çıkar", removed: [1], flags: { 2: "sergi cümlesi hâlâ arada", 3: "“bu kap” belirsizleşti: kap tanıtılmadı" }, note: "Karşı deneme: kap tanıtımı kaybolur ve sergi cümlesi aradadır; yanlış adayın iki olumsuz sonucu görünür." },
  ],
  foot: "Çıkarma işlemi yalnız kısaltma değil, anlam bağını onarma işidir.",
});

// akisi-bozan-cumle · 5 · Çıkarma kararı.
const removeLadder = ladderFig({
  caption:
    "Adayı geçici olarak dışarı al ve komşularını birlikte oku. İleri ile bölümdeki adayları merdivende yürüt: gerekli öncül, karşıt görüş ya da gerçekten ortak amaca bağlanmayan yan bilgi.",
  alt: "Üç basamaklı karar merdiveni. Çıkarılınca bir gönderme öncülsüz kalıyor mu, evet ise gerekli öncül, çıkarma. Cümle bir sınır veya itirazla ana savı geliştiriyor mu, evet ise akışta kalır. Cümle ikinci bir tutarlı grubun başı mı, evet ise ikiye bölme sorusu. Hayır ise ortak amaca bağlanmıyor, akışı bozan aday.",
  rungs: [
    { q: "Çıkarılınca bir gönderme (“bu kap”) öncülsüz kalıyor mu?", yes: "gerekli öncül: çıkarma", tone: "warn" },
    { q: "Bir sınır ya da itirazla ana savı geliştiriyor mu?", yes: "akışta kalır", tone: "c" },
    { q: "İkinci bir tutarlı grubun başı mı?", yes: "ikiye bölme sorusu", tone: "b" },
  ],
  last: "Ortak amaca bağlanmıyor: akışı bozan aday",
  lastTone: "a",
  walks: [
    { step: "Kap cümlesi", example: "“Su kapalı bir kapta tutuluyor.”", stop: 0, why: "Çıkarılınca sonraki “bu kap” sözü tanıtılmamış kalır." },
    { step: "Ancak", example: "“Dijital kataloglar aramayı hızlandırır. Ancak yanlış etiketlenen kayıtlar yine bulunamayabilir.”", stop: 1, why: "İkinci cümle başarının koşulunu hatırlatır; aynı erişim sorununu tartışır." },
    { step: "Sergi", example: "“Okul sergisi cuma günü açılacak.”", stop: 3, why: "Yağmur suyu düzenine katılmaz; çıkarılınca bağ onarılır." },
    { step: "Tatil", example: "Deney yöntemi anlatılırken araştırmacının çocukluk tatilini açıklayan tek cümle", stop: 3, why: "Ortak amaca bağlanmıyorsa sapma olabilir." },
  ],
  foot: "Bütün kalan cümleleri kontrol et; yalnız “hoşuma gitmedi” duygusuna dayanma.",
});

// akisi-bozan-cumle · 6 · Yanıltan sinyaller.
const signals = tableFig({
  caption:
    "Akış kararını mekanik sinyaller vermez. Bir sinyale tıkla: bölümdeki örnek ve doğru ölçüt açılır.",
  alt: "Dört satırlı tablo. Aynı kelime: kitabın nemden korunması ile romanın kahramanı, aynı işlev değildir. Karşıtlık: yanlış etiketlenen kayıtlar, gerekli olabilir. Kişi ve zaman değişimi: sabah başlayan olayın akşam sonucu, doğal olabilir. Ortak amaca bağlanmayan tek cümle: çocukluk tatili, sapma olabilir.",
  cols: [
    { name: "Sinyal", w: 2.9 },
    { name: "Bölümdeki örnek", w: 4.2 },
    { name: "Karar", w: 2.9 },
  ],
  rows: [
    { cells: ["aynı kelime", "kitabın nemden korunması / romanın kahramanı", "aynı işlev değil"], tones: [undefined, "muted", "warn"], detail: ["Kelime tekrarı akışın tek kanıtı olamaz.", "Tersine “bu cilt” gibi bir ifade kelime tekrarı olmadan aynı nesneyi sürdürebilir."] },
    { cells: ["karşıtlık", "“Ancak yanlış etiketlenen kayıtlar yine bulunamayabilir.”", "gerekli olabilir"], tones: [undefined, "muted", "c"], detail: ["Karşıtlık otomatik kopukluk değildir; tartışmayı geliştirebilir."] },
    { cells: ["kişi ve zaman değişimi", "sabah başlayan olayın akşam sonucu", "doğal olabilir"], tones: [undefined, "muted", "c"], detail: ["Olay zincirinin parçasıysa akış bozulmaz."] },
    { cells: ["tek yan bilgi", "yöntem anlatılırken çocukluk tatili", "sapma olabilir"], tones: [undefined, "muted", "a"], detail: ["Ortak amaca bağlanmıyorsa akışı bozar."] },
  ],
  foot: "Bağı nesne adı sayarak değil, anlam ilişkisi kurarak ara.",
});

export const turkishFigures061Structure: Record<string, Record<string, FigureDef>> = {
  "paragrafta-siralama": {
    "Giriş adayının kendi dayanağı var mı?": opener,
    "Karşıtlık, önce bir beklenti kurar": contrastLinks,
    "Zorunlu çiftlerden küçük bloklar kur": pairBlock,
    "Son denetim bütün metni kapsar": finalCheck,
  },
  "paragrafta-cumle-ekleme": {
    "İki bağı aynı anda sınayan üçlü kur": triple,
    "Neden, sonuç ve aracı adımı ayır": bridgeStep,
    "Kapsamı yeni cümleyle büyütme": scopeAdd,
  },
  "paragrafta-bosluk-doldurma": {
    "Ortadaki boşluk iki yana aynı anda bağlanır": middleGap,
    "Son boşluk her zaman özet değildir": gapJobs,
    "Karşıtlıkta beklentiyi ve tersini birlikte oku": oysa,
  },
  "yardimci-dusunce": {
    "Ana savın çevresindeki düşünceler": supports,
    "Desteklenmeyen her yargı yanlış değildir": threeStates,
    "Bazı, bütün ve yalnız sınırları": limits,
    "Koşullu yargının tersini üretme": conditional,
  },
  "ikiye-bolme": {
    "İki bloğa ayrı birer soru sor": split,
    "Zaman değişimi tek başına yetmez": timeline,
    "Bölme ile çıkarma arasındaki fark": splitVsRemove,
  },
  "akisi-bozan-cumle": {
    "Adayı çıkarıp bağı yeniden kur": removeTest,
    "Çıkar ve iki komşuyu birlikte oku": removeLadder,
    "Aynı kelime aynı işlev demek değildir": signals,
  },
};
