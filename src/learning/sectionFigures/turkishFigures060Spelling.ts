import type { FigureDef } from "./figureKit";
import { groupFig, ladderFig, tableFig } from "./turkishFigures060Kit";

/*
 * Forge060 TYT Türkçe · yazım ve noktalama karar şemaları. Örnekler bölüm
 * metninden alınır. Şemalar hazırlanmış bağlamları karşılaştırır; bütün
 * Türkçe için kusursuz bir karar makinesi iddiası taşımaz.
 */

// yazim-kurallari · 1 · da/de.
const daDe = ladderFig({
  caption:
    "Da/de karar merdiveni: önce sözün cümlede ne yaptığını açıkla, sonra yazımı seç. İleri ile bölümdeki örnekleri yürüt. “Dahi” yerine koyma denemesi yardımcıdır ama tek kesin test değildir.",
  alt: "İki soru kartı. Başka bir varlığı ekliyor mu: ekleme bağlacı, ayrı yazılır. Sözcüğe yer, zaman ya da bulunma ilişkisi mi katıyor: bulunma eki, bitişik yazılır. Son kart: önce tam cümleyi yeniden oku.",
  rungs: [
    { q: "Başka bir varlığın yanına ekliyor mu (dahi anlamı)?", yes: "bağlaç: ayrı yaz", tone: "b" },
    { q: "Yer, zaman ya da bulunma ilişkisi mi kuruyor?", yes: "bulunma eki: bitişik", tone: "c" },
  ],
  last: "Karar yok: tam cümleyi yeniden oku",
  walks: [
    { step: "Bahçede", example: "Bahçede bekledi.", stop: 1, why: "Yer bildirir: bulunma eki, bitişik yazılır." },
    { step: "Bahçe de", example: "Bahçe de yenilendi.", stop: 0, why: "Başka bir varlığın yanına bahçeyi ekler: bağlaç, ayrı yazılır." },
    { step: "saat üçte", example: "Saat üçte geldi.", stop: 1, why: "Yer bildirmese de bulunma ilişkisi (zaman) kurar; ek bağlaç olmaz. Ünsüz benzeşmesiyle -te olur." },
    { step: "Kitap da", example: "Kitap da geldi.", stop: 0, why: "Bağlaç ayrı yazılır, ünlü uyumuna uyar ama ta/te biçimine dönmez." },
    { step: "Ece de / Ece’de", example: "Ece de katıldı.", stop: 0, why: "Özel addan sonra bağlaç kesmeyle ayrılmaz. “Ece’de” ise bulunma ekidir, başka ilişki kurar." },
  ],
  foot: "Sıra: tam cümleyi oku, parçanın ek mi bağımsız söz mü olduğunu belirle, en son kuralı uygula.",
});

// yazim-kurallari · 2 · ki.
const ki = ladderFig({
  caption:
    "Ki için üç kanıt: yargıları mı bağlıyor, bir adın yerini mi tutuyor, bir adı mı niteliyor? İleri ile bölümdeki örnekleri yürüt. Belki, çünkü, sanki gibi kalıplaşmış bitişik sözler ayrıca öğrenilir.",
  alt: "İki soru kartı. Yargılar arasında bağlantı mı kuruyor: bağlaç ki, ayrı. Bir adın yerini mi tutuyor: ilgi zamiri -ki, bitişik. Hiçbiri değilse niteleyen ek -ki, bitişik.",
  rungs: [
    { q: "Yargılar arasında bağlantı mı kuruyor?", yes: "bağlaç ki: ayrı", tone: "b" },
    { q: "Bir adın yerini mi tutuyor?", yes: "ilgi zamiri: bitişik", tone: "c" },
  ],
  last: "Adı niteleyen ek -ki: bitişik",
  lastTone: "c",
  walks: [
    { step: "Evdeki", example: "Evdeki anahtar", stop: 2, why: "-ki evde bulunan anahtarı belirler: ek, bitişik." },
    { step: "Benimki", example: "Benimki burada.", stop: 1, why: "-ki bir adın yerini tutan ilgi zamiridir: bitişik." },
    { step: "Biliyorum ki", example: "Biliyorum ki anahtar burada.", stop: 0, why: "Yargılar arasında bağlantı kuran bağlaç: ayrı yazılır." },
    { step: "mi ki?", example: "Ders bitti mi ki?", stop: 0, why: "Şüphe ya da pekiştirme kullanımında da bağlaç ayrıdır." },
  ],
  foot: "Kalıplaşmış bitişik biçimler (mademki, oysaki, hâlbuki) her serbest ki bağlacının bitişmesini gerektirmez.",
});

// yazim-kurallari · 3 · Ek fiilin ayrı ve bitişik biçimleri.
const copula = tableFig({
  caption:
    "Ek fiilin idi, imiş, ise ve iken biçimleri ayrı ya da bitişik yazılabilir. Bir biçime tıkla: bitişmede hangi sesin düştüğü ya da korunduğu açılır. Ayrı yazılabilmek çekimi ya da görevi değiştirmez.",
  alt: "Dört satırlı tablo. idi: yorgun idi, yorgundu. imiş: güzel imiş, güzelmiş. ise: gelir ise, gelirse. iken: okulda iken, okuldayken.",
  cols: [
    { name: "Biçim", w: 2.0 },
    { name: "Ayrı", w: 3.6 },
    { name: "Bitişik", w: 4.4 },
  ],
  rows: [
    { cells: ["idi", "yorgun idi", "yorgundu"], tones: [undefined, "ink", "c"], detail: ["Bitişmede baştaki i düşer, ses uyumları işler.", "Ünlüyle biten tabanda y gelir: öğrenci idi / öğrenciydi."] },
    { cells: ["imiş", "güzel imiş", "güzelmiş"], tones: [undefined, "ink", "c"], detail: ["Baştaki i düşer: güzel + miş.", "“hazır değildi” ile “öğrenciydi” tabanlarını ayrı çöz."] },
    { cells: ["ise", "gelir ise", "gelirse"], tones: [undefined, "ink", "c"], detail: ["Baştaki i düşer: gelir + se.", "Koşul ilişkisi biçimden bağımsız olarak korunur."] },
    { cells: ["iken", "okulda iken", "okuldayken (okuldaykan değil)"], tones: [undefined, "ink", "c"], detail: ["Bitişik -ken kalın ünlülü tabana gelse de ince ünlüsünü korur.", "“geliyor iken / geliyorken” de aynı kurala uyar."] },
  ],
  foot: "İsim yüklemi, birleşik çekimli fiil ve zaman bildiren yan yapı arasındaki farkı koru.",
});

// yazim-kurallari · 4 · Birleşik sözcükler.
const compounds = tableFig({
  caption:
    "Birleşik sözcükte ayrı mı, bitişik mi? Bir örneğe tıkla: kararı ses olayının ya da anlam değişiminin mi verdiği açılır. Yalnız ikinci sözcüğe bakıp sınırsız algoritma kurma; gelenekleşmiş istisnalar vardır.",
  alt: "Altı satırlı tablo: not etmek ayrı, ses olayı yok; kaybolmak ve hissetmek bitişik, ses düşmesi ya da türemesi; okuyabilmek bitişik, tasvir fiili; nar çiçeği ayrı, gerçek tür adı; narçiçeği bitişik, renk adı; çalar saat ayrı, cankurtaran bitişik.",
  cols: [
    { name: "Örnek", w: 3.4 },
    { name: "Yazım", w: 2.0 },
    { name: "Gerekçe", w: 4.6 },
  ],
  rows: [
    { cells: ["not etmek", "ayrı", "ses düşmesi ya da türemesi yok"], tones: [undefined, "b", "muted"], detail: ["Yardımcı fiilli birleşikte ses olayı yoksa ayrı yazılır: kabul etmek, var olmak.", "Bir anlam ilişkisi kurmaları tek başına bitişme nedeni değildir."] },
    { cells: ["kaybolmak, affetmek", "bitişik", "ses düşmesi ya da türemesi"], tones: [undefined, "c", "muted"], detail: ["Birleşmede ses düşmesi ya da türemesi olduğunda bitişik yazılır; hissetmek de böyledir.", "Hangi sesin değiştiğini göster; uzun sözcük görünümü karar değildir."] },
    { cells: ["okuyabilmek", "bitişik", "tasvir fiili"], tones: [undefined, "c", "muted"], detail: ["Tasvir fiilleri bitişir: gülüvermek, uyuyakalmak, düşeyazmak.", "Yardımcı yapının eyleme ne kattığını göster."] },
    { cells: ["nar çiçeği", "ayrı", "gerçek tür adı korunur"], tones: [undefined, "b", "muted"], detail: ["Gerçek tür adını koruyan sözler ayrı: bal arısı, duvar saati.", "İş birliği, dil bilgisi gibi birçok terim de ayrı yazılır."] },
    { cells: ["narçiçeği", "bitişik", "renk adına dönüşmüş"], tones: [undefined, "c", "muted"], detail: ["İkinci söz gerçek anlamından uzaklaşıp başka kavramı karşılarsa bitişik: danaburnu (böcek), kedidili (bisküvi).", "Sözcükleşmiş adın anlamı ve yerleşmiş yazımı denetlenir."] },
    { cells: ["çalar saat / cankurtaran", "ayrı / bitişik", "kalıplaşma"], tones: [undefined, "warn", "muted"], detail: ["“Çalar saat” ayrı iken “cankurtaran” kalıplaşmıştır.", "Fiilimsi ya da çekim eki görüntüsü tek başına ayrı/bitişik kararı verdirmez."] },
  ],
  foot: "Önce ses olayına, sonra anlam değişimine bak; gelenekleşmiş biçimi ayrıca öğren.",
});

// noktalama-isaretleri · 1 · Virgülün yeri, ilişkinin yeri.
const comma = groupFig({
  caption:
    "Aynı sözcükler, farklı virgül yeri, farklı ilişki. Köşeli çizgiler hangi sözlerin bir öbek kurduğunu ve öbeğin görevini gösterir. Örnek bölüm metnindendir. Kavram şeması, ölçekli değildir.",
  alt: "İki yazılış. Yaralı, adama seslendi: Yaralı özne, adama yer tamlayıcısı, seslendi yüklem. Yaralı adama seslendi: Yaralı adama tek öbek, yaralı adama sözcüğünü niteler; özne söylenmemiştir.",
  variants: [
    {
      tokens: ["Yaralı,", "adama", "seslendi."],
      groups: [
        { from: 0, to: 0, label: "özne", tone: "c" },
        { from: 1, to: 1, label: "yer tamlayıcısı", tone: "b" },
        { from: 2, to: 2, label: "yüklem", tone: "ink" },
      ],
      note: "Virgül özneyi ayırır: seslenen yaralı kişidir.",
      noteTone: "c",
    },
    {
      tokens: ["Yaralı", "adama", "seslendi."],
      groups: [
        { from: 0, to: 1, label: "yaralı → adama (niteleme)", tone: "b" },
        { from: 2, to: 2, label: "yüklem", tone: "ink" },
      ],
      note: "Virgül yok: “yaralı” adamı niteler; seslenen kişi söylenmemiştir.",
      noteTone: "b",
    },
  ],
  foot: "Önce tam yargıyı ve söz öbeklerini bul, sonra işaretin hangi görevi üstleneceğini açıkla.",
});

// noktalama-isaretleri · 2 · Noktalı virgül takım sınırı.
const semicolon = groupFig({
  caption:
    "Noktalı virgül takım sınırını, virgül takım içindeki üyeyi gösterir. Köşeli çizgiler iki yazılışta takımları ayırır: işaretin yeri değişince Can’ın üyeliği değişir. Örnek bölüm metnindendir.",
  alt: "İki yazılış. Ece, Can; Ada, Deniz: iki takım, Ece ile Can bir takım, Ada ile Deniz öbür takım. Ece; Can, Ada, Deniz: Ece tek başına bir takım, Can, Ada ve Deniz öbür takım.",
  variants: [
    {
      tokens: ["Ece,", "Can;", "Ada,", "Deniz."],
      groups: [
        { from: 0, to: 1, label: "takım: Ece, Can", tone: "c" },
        { from: 2, to: 3, label: "takım: Ada, Deniz", tone: "b" },
      ],
      note: "İki takım, ikişer üye. Can birinci takımda.",
      noteTone: "c",
    },
    {
      tokens: ["Ece;", "Can,", "Ada,", "Deniz."],
      groups: [
        { from: 0, to: 0, label: "takım: Ece", tone: "c" },
        { from: 1, to: 3, label: "takım: Can, Ada, Deniz", tone: "b" },
      ],
      note: "Can artık ikinci takımda: üyelik değişti.",
      noteTone: "b",
    },
  ],
  foot: "Soru: grupları mı ayırıyorum (noktalı virgül), önceki sözün açıklamasını mı başlatıyorum (iki nokta)?",
});

// noktalama-isaretleri · 3 · Virgül karar tablosu.
const commaTable = tableFig({
  caption:
    "Virgül karar tablosu: bölümün örnekleriyle virgülün konduğu ve konmadığı sınırlar. Bir yapıya tıkla: bölünmemesi gereken bağ ya da ayrılan birim açılır. Durak hissetmek tek başına virgül gerekçesi değildir.",
  alt: "Sekiz satırlı tablo. Konur: eş görevli sözler, sıralı cümleler. Konabilir: art arda eş görevli zarf-fiilli yapılar. Konmaz: tek öge içindeki ve, tamlayan ile tamlanan arası, ikileme, şart ekinden sonra, tek zarf-fiilden sonra.",
  cols: [
    { name: "Yapı", w: 3.3 },
    { name: "Bölümdeki örnek", w: 4.5 },
    { name: "Virgül", w: 2.2 },
  ],
  rows: [
    { cells: ["eş görevli sözler", "Kalem, defter, silgi aldım.", "konur"], tones: [undefined, "ink", "c"], detail: ["Üç nesne sıralanır; virgül sözcükleri ayırır.", "Eş görevli birimlerin başlangıç ve bitişini göster."] },
    { cells: ["sıralı cümleler", "Kapıyı açtı, içeri girdi.", "konur"], tones: [undefined, "ink", "c"], detail: ["Ayrı yüklemli cümleleri ayırır.", "Sözcük listesiyle cümle listesini aynı yapı sanma."] },
    { cells: ["tek öge içinde ve", "Ece ve Can geldi.", "konmaz"], tones: [undefined, "ink", "warn"], detail: ["“ve” tek özne içinde iki adı bağlar; iki yanına virgül konmaz.", "Normal bağlama görevindeki ve, veya, yahut otomatik virgül almaz."] },
    { cells: ["tamlama", "Dersin sonunda", "konmaz"], tones: [undefined, "ink", "warn"], detail: ["Tamlayan ile tamlanan arası bölünmez.", "“Kırmızı kapaklı yeni defter” gibi sıfat tamlaması da virgülle bölünmez."] },
    { cells: ["ikileme", "yavaş yavaş", "konmaz"], tones: [undefined, "ink", "warn"], detail: ["İkileme parçaları bir tekrar grubudur.", "Durak hissedildiği için virgül koyma."] },
    { cells: ["şart ekinden sonra", "Yağmur dinerse çıkarız.", "konmaz"], tones: [undefined, "ink", "warn"], detail: ["Koşul yapısı bölünmez.", "Sonraki bağımsız ara açıklama varsa o ayrı işlev olarak incelenir."] },
    { cells: ["tek zarf-fiilden sonra", "Notları okuyup çalıştı.", "konmaz"], tones: [undefined, "ink", "warn"], detail: ["“okuyup” ana eyleme bağlanan yan harekettir; ikinci çekimli cümle değildir.", "“Bahar geldi mi göl canlanır.” yapısından sonra da virgül eklenmez."] },
    { cells: ["art arda zarf-fiiller", "Metni okuyup, biraz düşünüp yanıtını yazdı.", "konabilir"], tones: [undefined, "ink", "b"], detail: ["MEBİ, art arda eş görevli zarf-fiilli yapıları ayrı koşul olarak gösterir.", "Bu istisna bütün zarf-fiillerden sonra zorunlu virgül var demek değildir."] },
  ],
  foot: "Önce hangi bağın bölünmemesi gerektiğini göster, sonra ayrılan birimleri işaretle.",
});

// noktalama-isaretleri · 4 · Soru işareti.
const question = ladderFig({
  caption:
    "Soru işareti karar merdiveni: sözcük avlama, ana yargıyı oku. İleri ile bölümdeki örnekleri yürüt. Soru sözcüğü ya da mı görmek, cümlenin soru işaretiyle bitmesi için yeterli değildir.",
  alt: "İki soru kartı. Ana yargı doğrudan cevap istiyor mu: soru işareti. mı zaman ya da koşul ilişkisi mi kuruyor: nokta. Hiçbiri değilse soru sözcüğü yan öbektedir ve cümle noktayla biter.",
  rungs: [
    { q: "Ana yargı doğrudan cevap istiyor mu?", yes: "soru işareti", tone: "c" },
    { q: "“mı” zaman ya da koşul ilişkisi mi kuruyor?", yes: "nokta: soru değil", tone: "b" },
  ],
  last: "Soru sözcüğü yan öbekte: nokta",
  walks: [
    { step: "Dosya nerede?", example: "Dosya nerede?", stop: 0, why: "Cümle doğrudan cevap istiyor: soru işareti." },
    { step: "Adınız?", example: "Adınız?", stop: 0, why: "Soru sözcüğü olmadan da aynı iletişim amacını taşır." },
    { step: "başladı mı", example: "Yağmur başladı mı içeri gireriz.", stop: 1, why: "“mı” zaman/koşul ilişkisi kurar; doğrudan soru sormaz." },
    { step: "nerede olduğunu", example: "Dosyanın nerede olduğunu biliyorum.", stop: 2, why: "“nerede” içeren öbek bilinen içeriği bildirir; temel yargı soru değildir." },
  ],
  foot: "Doğum tarihi gibi bilinmeyen bilgi için yay ayraç içindeki (?) bambaşka bir görevdir.",
});

export const turkishFigures060Spelling: Record<string, Record<string, FigureDef>> = {
  "yazim-kurallari": {
    "Da/de: yer eki mi, ekleme bağlacı mı?": daDe,
    "Ki: niteleme, aidiyet ve cümle bağlantısı": ki,
    "İdi, imiş, ise ve iken birleşmesi": copula,
    "Bitişik birleşikler: değişen ses veya kavram": compounds,
  },
  "noktalama-isaretleri": {
    "Noktalama, cümledeki bağı görünür kılar": comma,
    "Noktalı virgül: üst gruplar ve iç virgüller": semicolon,
    "Virgül konmayan birleşme sınırları": commaTable,
    "Doğrudan soru, dolaylı soru ve mı’nın diğer işi": question,
  },
};
