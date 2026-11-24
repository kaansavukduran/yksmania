import { fmt, type FigureDef } from "./figureKit";
import { flowFig, ladderFig, rowsFig, tableFig, treeFig } from "./turkishFigures060Kit";
import { barsFig, pieFig } from "./turkishFigures061Kit";

/*
 * Forge061 TYT Türkçe · paragraf: anlatım biçimleri, çoklu sorular, konu,
 * metin-tablo yorumlama, soru–cevap ve röportaj. Örnek cümleler ve sayılar
 * yalnız ilgili dersin bölüm metninden alınır; hesaplar çizimde yapılır.
 * Kavram şemaları ölçekli değildir.
 */

// paragrafta-anlatim-bicimleri · 0 · Dört soru, dört biçim.
const modeLadder = ladderFig({
  caption:
    "Bölümün dört sorusu karar merdiveni olarak: yazar bir değişimi mi izletiyor, bir görünüşü mü canlandırıyor, bir görüşü mü savunuyor, yoksa bir işleyişi mi öğretiyor? İleri ile dersteki örnek cümleleri merdivende yürüt. Tartışma açıklamadan önce sorulur: bilgi cümleleri bir savın dayanağı olabilir. Şema ölçekli değildir.",
  alt: "Dört basamaklı karar merdiveni. Olaylar bir değişim örgüsünde ilerliyor mu, evet ise öyküleme. Aynı anın nitelikleri mi canlandırılıyor, evet ise betimleme. Bir görüş gerekçeyle mi savunuluyor, evet ise tartışma. Hayır ise kavram ya da işleyiş öğretiliyor: açıklama.",
  rungs: [
    { q: "Kişi, olay, zaman ve mekân bir değişim örgüsünde mi ilerliyor?", yes: "öyküleme", tone: "c" },
    { q: "Bir nesnenin aynı anda görülen nitelikleri mi canlandırılıyor?", yes: "betimleme", tone: "b" },
    { q: "Bir görüş gerekçeyle benimsetilmeye mi çalışılıyor?", yes: "tartışma", tone: "a" },
  ],
  last: "Kavram ya da işleyiş öğretiliyor: açıklama",
  lastTone: "c",
  walks: [
    { step: "Öyküleme", example: "“Ece kutuyu açtı, eksik parçayı buldu ve modeli tamamladı.”", stop: 0, why: "Son durum ilk durumdan farklıdır; eylemler birbirini ilerletir." },
    { step: "Betimleme", example: "“Kutunun kapağı mat, köşeleri yuvarlak, yüzeyi çizikliydi.”", stop: 1, why: "Olay zinciri yok; nesnenin aynı anda görülen özellikleri verilir." },
    { step: "Tartışma", example: "“Bu alan yalnız süs değildir; çocukların birlikte üretmesine de imkân verir, bu yüzden korunmalıdır.”", stop: 2, why: "Bir değerlendirme gerekçelendirilir; metnin omurgası tezi savunmaktır." },
    { step: "Açıklama", example: "“Filtre, sıvıdaki belirli parçacıkları ayırır; gözenek boyu hangi parçaların tutulacağını etkiler.”", stop: 3, why: "Bir işleyiş öğretilir; okur hangi ilişkiyi öğrendiğini söyleyebilir." },
  ],
  foot: "Sonucu tek bir kelimeye değil, metindeki gerçek işleve dayandır.",
});

// paragrafta-anlatim-bicimleri · 5 · Nesnel, izlenimsel betimleme ve açıklama.
const describeTable = tableFig({
  caption:
    "Laboratuvar örneğiyle üç iş: gözlenebilir özellikleri aktarmak, izlenimle canlandırmak ve ilkeyi öğretmek. Bir satıra tıkla: hangi sorunun ayırdığı açılır. Önce “öznel mi” değil, “ne yapılıyor” sorusu sorulur.",
  alt: "Üç satırlı tablo. Nesnel betimleme: üç raf, dar bir pencere ve beyaz bir masa vardı; gözlenebilir özellikler. İzlenimsel betimleme: yazarın seçimi, benzetmesi ve duygusal izlenimi. Açıklama: cihazın hangi ilkeyle ölçtüğünü öğretmek.",
  cols: [
    { name: "Biçim", w: 3.1 },
    { name: "Ne yapılıyor?", w: 3.6 },
    { name: "Bölümdeki örnek", w: 3.3 },
  ],
  rows: [
    { cells: ["nesnel betimleme", "gözlenebilir özellikleri aktarır", "üç raf, dar pencere, beyaz masa"], tones: [undefined, "c", "muted"], detail: ["“Üç raf, dar bir pencere ve beyaz bir masa vardı.” görünüşü bilgiyle kurar.", "Nesnel dil betimlemeyi açıklamaya dönüştürmez."] },
    { cells: ["izlenimsel betimleme", "aynı ortamı izlenimle canlandırır", "seçim, benzetme, duygu"], tones: [undefined, "b", "muted"], detail: ["Yazarın seçimi, benzetmesi ve duygusal izlenimi aynı ortamı farklı bir etkiye açar.", "Yine görünüş canlandırılır; iş betimlemedir."] },
    { cells: ["açıklama", "bir ilkeyi öğretir", "cihazın hangi ilkeyle ölçtüğü"], tones: [undefined, "a", "muted"], detail: ["Laboratuvarın rengini ve yerleşimini göstermek betimleme; cihazın ölçme ilkesini öğretmek açıklamadır.", "Aynı konu farklı işlevler taşıyabilir."] },
  ],
  foot: "Konu aynı kalabilir; biçimi metnin o konuyla yaptığı iş belirler.",
});

// paragrafta-anlatim-bicimleri · 11 · Amaç ve araç iki katmandır.
const modeTools = treeFig({
  caption:
    "İki katman: anlatım biçimi metnin genel amacını, düşünceyi geliştirme yolu bu amaca hizmet eden aracı adlandırır. Bir dala ya da yaprağa tıkla. Aynı araç açıklayıcı da tartışmacı da metinde kullanılabilir.",
  alt: "Sınıflama ağacı. Kök: bir paragrafı iki katmanda oku. Birinci dal anlatım biçimi, amaç: öyküleme, betimleme, açıklama, tartışma. İkinci dal düşünceyi geliştirme yolu, araç: tanım, örnek, karşılaştırma, tanık sözü, sayısal veri, benzetme.",
  root: "Bir paragrafı iki katmanda oku",
  branches: [
    {
      label: "Biçim: amaç",
      title: "Anlatım biçimi: metnin genel kuruluş ve iletişim amacı",
      detail: ["Anlatım biçimi metnin genel kuruluş ve iletişim amacını belirtir.", "Baskın biçim sorulduğunda araçların hangi bütüne hizmet ettiğine bak."],
      tone: "a",
      leaves: [
        { label: "öyküleme", title: "Öyküleme", detail: ["Kişi, olay, zaman ve mekân bir değişim örgüsünde ilişki kurar."] },
        { label: "betimleme", title: "Betimleme", detail: ["Kişi, nesne veya yerin nitelikleri okurun zihninde canlandırılır."] },
        { label: "açıklama", title: "Açıklama", detail: ["Bir konuyu anlamamızı sağlayacak bilgi sunulur."] },
        { label: "tartışma", title: "Tartışma", detail: ["Bir görüş benimsetilmeye, itiraz karşılanmaya çalışılır."] },
      ],
    },
    {
      label: "Yol: araç",
      title: "Düşünceyi geliştirme yolu: amacı destekleyen araç",
      detail: ["Düşünceyi geliştirme yolu amacı destekleyen aracı belirtir.", "Sayı görüldüğünde açıklama, alıntı görüldüğünde tartışma diye otomatik seçim yapma."],
      tone: "c",
      leaves: [
        { label: "tanım", title: "Tanımlama", detail: ["Bir kavram tanımlanıyorsa tanımlama kullanılmıştır; biçim sorusu ayrıca cevaplanır."] },
        { label: "örnek", title: "Örnekleme", detail: ["Örnek açıklayıcı da tartışmacı da metinde bulunabilir."] },
        { label: "karşılaştırma", title: "Karşılaştırma", detail: ["İki yöntemi taraf tutmadan karşılaştırmak açıklayıcı, birini savunmak için karşılaştırmak tartışmacı örgüye hizmet edebilir."] },
        { label: "tanık sözü", title: "Tanık gösterme", detail: ["Alıntı görmek tek başına tartışma kanıtı değildir."] },
        { label: "sayısal veri", title: "Sayısal veri", detail: ["Sayı görmek tek başına açıklama kanıtı değildir."] },
        { label: "benzetme", title: "Benzetme", detail: ["Benzetme de bir araçtır; amacı belirlemez."] },
      ],
    },
  ],
  foot: "Önce amaç, ardından onu destekleyen yöntem.",
});

// paragrafta-coklu-sorular · 1 · Kök hedefi.
const stemTargets = tableFig({
  caption:
    "Aynı metne bağlı farklı kökler farklı kanıt ister. Bir köke tıkla: hedefi kendi sözlerinle nasıl yazacağın ve kanıtın nerede aranacağı açılır. Hepsine tek bir ana düşünce cevabı yetmez.",
  alt: "Dört satırlı tablo. Asıl anlatılmak istenen: bütünün savı, bütün metin. Parçaya göre: verilmiş ayrıntı, seçeneğin metindeki desteği. Değinilmemiştir: metinde bulunmayan bilgi alanı. Altı çizili sözün işlevi: sözün metindeki işi, komşu cümleler.",
  cols: [
    { name: "Kök", w: 3.7 },
    { name: "Hedef", w: 3.0 },
    { name: "Kanıt yeri", w: 3.3 },
  ],
  rows: [
    { cells: ["asıl anlatılmak istenen", "bütünün savı", "bütün metnin merkez yargısı"], tones: [undefined, "a", "muted"], detail: ["Bütünün merkez yargısını ister.", "Tek bir ayrıntı doğru olsa da bütünün savı olmayabilir."] },
    { cells: ["parçaya göre", "verilmiş ayrıntı", "seçeneği destekleyen cümle"], tones: [undefined, "c", "muted"], detail: ["Seçeneklerin metinle desteğini araştırır.", "Her seçeneğe karşılık gelen cümleyi bul."] },
    { cells: ["değinilmemiştir", "kanıtsız yargı", "metinde olmayan bilgi alanı"], tones: [undefined, "b", "muted"], detail: ["Metinde bulunmayan bilgi alanını araştırır.", "Olumsuz kökte açıkça desteklenen seçenek elenir."] },
    { cells: ["altı çizili sözün işlevi", "sözün metindeki işi", "önceki ve sonraki cümleler"], tones: [undefined, "a", "muted"], detail: ["Belirli ifadenin yerel bağlamdaki görevini sorar.", "Anlamı etkileyen karşıtlık veya açıklama komşu cümlede olabilir."] },
  ],
  foot: "Önce kökü yeniden yaz, sonra o hedefe uygun kanıtı ara.",
});

// paragrafta-coklu-sorular · 2 · Anlam iskeleti.
const skeleton = flowFig({
  caption:
    "Bölümdeki editör örneği anlam iskeleti olarak: önce tercih, sonra gerekçe, en sonda istisna. İleri ile her parçayı aç: hangi kökün hangi cümleye döndüğü yazılır. İskelet yol gösterir, seçenek denetiminin yerine geçmez.",
  alt: "Üç kart oklarla alt alta: tercih, editörün anlattığı seçim; gerekçe, bu tercihin nedeni; istisna, en sonda konan sınır. Tercihin nedeni sorulursa gerekçe cümlesine, istisna sorulursa son cümleye dönülür.",
  nodes: [
    { head: "Tercih (ana iddia)", text: "editör önce bir tercihi anlatır", tone: "a", note: "İlk okumada kimden, hangi durumdan ve hangi ilişkiden söz edildiğini belirle." },
    { head: "Gerekçe", text: "sonra bu tercihin gerekçesini açıklar", tone: "c", note: "“Tercihin nedeni” soran kök bu cümleye döner." },
    { head: "İstisna (sınır)", text: "en sonda bir istisna koyar", tone: "b", note: "“İstisna” soran kök farklı bir cümleye, sona döner." },
  ],
  steps: ["Tercih", "Gerekçe", "İstisna"],
  reveal: true,
  foot: "İskelet sorular arasında yeniden kullanılır; hazır cevap olarak taşınmaz.",
});

// paragrafta-coklu-sorular · 9 · Nicelik sözleri.
const quantifiers = tableFig({
  caption:
    "Nicelik sözleri aynı ilişkiyi kurmaz. Bir söze tıkla: neyi gerektirdiği ve neyi gerektirmediği açılır. Günlük sezgi yerine sorunun verdiği açık kapsamı koru.",
  alt: "Üç satırlı tablo. Bazı dinleyiciler not aldı: en az bir dinleyici not aldı; herkesin aldığını da almadığını da söylemez. Çoğu: grubun yarıdan fazlası; başka gruba taşınmaz. En az beş: beş veya daha fazla; tam beş demek değildir.",
  cols: [
    { name: "Söz", w: 3.3 },
    { name: "Gerektirir", w: 3.3 },
    { name: "Gerektirmez", w: 3.4 },
  ],
  rows: [
    { cells: ["bazı dinleyiciler", "en az biri not aldı", "herkes aldı ya da herkes almadı"], tones: [undefined, "c", "warn"], detail: ["“Bazı dinleyiciler not aldı” herkesin not aldığını gerektirmez; herkesin not almadığını da kesin söylemez."] },
    { cells: ["çoğu", "belirli grubun yarıdan fazlası", "başka bir gruba taşınma"], tones: [undefined, "c", "warn"], detail: ["“Çoğu” belirli grubun yarıdan fazlasını belirtir; bu bilgi başka bir gruba taşınmaz."] },
    { cells: ["en az beş", "beş veya daha fazla", "tam beş"], tones: [undefined, "c", "warn"], detail: ["“En az beş” sayının beş veya daha fazla olmasına izin verir; tam beş demek değildir."] },
  ],
  foot: "Kim, kaç, ne zaman ve hangi eylem sınırının aynı kaldığını denetle.",
});

// paragrafta-coklu-sorular · 16 · İlk kopan bağ.
const firstBreak = rowsFig({
  caption:
    "Yanlış bir cevapta anahtarı ezberlemek yerine ilk kopan bağı bul. Bir satıra tıkla: o bağ koptuysa bir sonraki soruda hangi denetimi uygulayacağın açılır.",
  alt: "Dört satır: soru hedefi değişti mi; sözün sahibi karıştı mı; kapsam büyüdü mü; kanıt yerine önceki seçenek mi kullanıldı.",
  rows: [
    { head: "Soru hedefi değişti mi?", text: "kökü yeniden yaz, hedefini adlandır", tone: "a", detail: ["Hatalı kökü yeniden yaz ve gerekli cümleyi bul.", "Bütünün savı mı, ayrıntı mı, kanıtsız yargı mı istendi?"] },
    { head: "Sözün sahibi karıştı mı?", text: "yargının kime ait olduğunu koru", tone: "b", detail: ["Kimin söylediği seçeneğin doğruluğunu değiştirebilir."] },
    { head: "Kapsam büyüdü mü?", text: "zaman, nicelik ve kişi sınırını geri koy", tone: "c", detail: ["“İlk gün”, “bazı” gibi sınırlar yargının parçasıdır.", "Aynı sayıyı iki kökte aynı genişlikle kullanma."] },
    { head: "Kanıt yerine önceki seçenek mi?", text: "her soruyu tam pasajdan kanıtla", tone: "warn", detail: ["Doğru şıkkı daha önce görmek ile yeni metinde bağımsız kanıt kurmak farklı gözlemlerdir."] },
  ],
  foot: "Seçeneğin yalnız bozuk bölümünü düzelt, sonra farklı bir pasajda aynı işlemi dene.",
});

// paragrafta-konu · 1 · Konu, ana düşünce, başlık.
const topicIdea = tableFig({
  caption:
    "Konu alanı, ana düşünce o alandaki temel yargıyı, başlık ise konuyu ve temel vurguyu kısaca tanıtır. Bir satıra tıkla: bölümdeki örnek ve sık hata açılır.",
  alt: "Üç satırlı tablo. Konu: üzerinde konuşulan alan, örnek çeviride dipnot kullanımı. Ana düşünce: alandaki temel yargı, örnek dipnot ancak gerekli bağlamı tamamladığında yararlıdır. Başlık: konuyu ve vurguyu kısaca tanıtır, örnek Sessiz Harfler şiir üzerine bir metinde.",
  cols: [
    { name: "Kavram", w: 2.6 },
    { name: "Ne gösterir?", w: 3.3 },
    { name: "Bölümdeki örnek", w: 4.1 },
  ],
  rows: [
    { cells: ["konu", "üzerinde konuşulan alan", "çeviride dipnot kullanımı"], tones: [undefined, "c", "muted"], detail: ["Konu üzerinde konuşulan alanı gösterir.", "Aynı konudaki iki yazar farklı temel görüşler savunabilir."] },
    { cells: ["ana düşünce", "alandaki temel yargı", "dipnot ancak gerekli bağlamı tamamladığında yararlıdır"], tones: [undefined, "a", "muted"], detail: ["Ana düşünce bu alanda iletilen temel yargıdır.", "Ad öbeği ile yargı cümlesi ayrımı yardımcıdır; mekanik bir anahtar değildir."] },
    { cells: ["başlık", "konuyu ve vurguyu kısaca tanıtır", "“Sessiz Harfler”, şiir üzerine bir metinde"], tones: [undefined, "b", "muted"], detail: ["Başlık konu ve temel vurguya bağlıdır.", "Metnin işlemediği alanı öne çıkaran başlık uygun olmaz."] },
  ],
  foot: "Önce kökün neyi istediğini, sonra seçeneğin odağı mı savı mı üstlendiğini incele.",
});

// paragrafta-konu · 4 · Kapsam merdiveni.
const scopeLadder = ladderFig({
  caption:
    "Konu adayını kapsamıyla sına: metnin vermediği alan mı ekleniyor, yalnız genel alan mı söyleniyor, yoksa cümleler dışarıda mı kalıyor? İleri ile bölümdeki adayları yürüt.",
  alt: "Üç basamaklı karar merdiveni. Aday metnin kapsamadığı alanları ekliyor mu, evet ise fazla geniş, kapsam büyür. Aday yalnız genel alanı mı söylüyor, evet ise fazla geniş, özel yön eksik. Aday metnin bazı cümlelerini dışarıda mı bırakıyor, evet ise fazla dar. Hayır ise uygun konu: alan ve özel yön birlikte.",
  rungs: [
    { q: "Aday metnin hiç kapsamadığı alanları ekliyor mu?", yes: "fazla geniş: kapsam büyür", tone: "warn" },
    { q: "Aday yalnız genel alanı mı söylüyor?", yes: "fazla geniş: özel yön eksik", tone: "b" },
    { q: "Aday metnin bazı cümlelerini dışarıda mı bırakıyor?", yes: "fazla dar", tone: "b" },
  ],
  last: "Uygun konu: alan ve özel yön birlikte",
  lastTone: "c",
  walks: [
    { step: "Bütün kentler", example: "Tamir masaları metnine “Bütün kentlerin bütün sorunları”", stop: 0, why: "Metnin hiç kapsamadığı alanları da ekler." },
    { step: "Kent yaşamı", example: "Tamir masaları metnine “Kent yaşamı”", stop: 1, why: "Metne uzaktan ilişkilidir; konunun özel odağını belirlemez." },
    { step: "Masal akşamı", example: "Üç bölgedeki anlatıcılık gelenekleri metnine “bir köydeki masal akşamı”", stop: 2, why: "Öteki bölgeleri anlatan cümleleri dışarıda bırakır." },
    { step: "Uygun aday", example: "“kentteki ortak tamir masalarının işleyişi”", stop: 3, why: "Metnin işlediği bilgi alanını ve özel yönünü birlikte taşır." },
  ],
  foot: "Kapsamı seçenek uzunluğundan değil, metnin işlediği bilgi alanından çıkar.",
});

// paragrafta-konu · 16 · Küçük sözler.
const smallWords = tableFig({
  caption:
    "Küçük sözler konunun sınırını değiştirir. Bir söze tıkla: kapsamı nasıl daralttığı ya da koruduğu açılır. Konu adını son kez metne geri koyup denetle.",
  alt: "Dört satırlı tablo. Yalnız, bazı, yerel, ilk deneme: sınırı daraltır; yerel ağızların bir belgedeki yazımı bütün dil tarihi değildir. Da: önceki işlev kaldırılmamıştır. Önerildi: uygulanmış olması diye adlandırılmaz. İki örnek: ülke çapındaki bütün örnekler denmez.",
  cols: [
    { name: "Söz", w: 3.1 },
    { name: "Etkisi", w: 3.2 },
    { name: "Bölümdeki örnek", w: 3.7 },
  ],
  rows: [
    { cells: ["yalnız, bazı, yerel, ilk deneme", "sınırı daraltır", "yerel ağızların bir belgedeki yazımı"], tones: [undefined, "c", "muted"], detail: ["Bu metni bütün dil tarihinin konu edildiği biçiminde okumak kapsamı büyütür."] },
    { cells: ["da", "önceki işlev sürer", "önceki işlev tamamen kaldırılmamış"], tones: [undefined, "b", "muted"], detail: ["“Da” sözü önceki işlevin tamamen kaldırılmadığını gösterebilir."] },
    { cells: ["önerildi", "gerçekleşme durumu", "“uygulanmış olması” denmez"], tones: [undefined, "warn", "muted"], detail: ["Bir süreç yalnız önerildiyse “uygulanmış olması” diye adlandırma."] },
    { cells: ["iki örnek", "nicelik sınırı", "“ülke çapındaki bütün örnekler” denmez"], tones: [undefined, "warn", "muted"], detail: ["İki örnek verilmişse “ülke çapındaki bütün örnekler” deme."] },
  ],
  foot: "Nicelik, zaman ve gerçekleşme durumu düşünceyi değiştiren gerçek verilerdir.",
});

// metin-tablo-gorsel-yorumlama · 3 · Fark ve oran (36 ve 24 kayıt).
const A = 36;
const B = 24;
const diffRatio = barsFig({
  caption:
    "Bölümdeki iki kol: otuz altı ve yirmi dört kayıt. İleri ile aynı karşılaştırmanın farklı sorularını aç: fark çıkarma, oran bölmedir; yüzde fazlada payda karşılaştırılan değerdir. Çubuk boyları sıfırdan başlayan ortak ölçekle değerlerle orantılıdır.",
  alt: `Yatay çubuk grafiği, eksen 0’dan 40’a. Birinci kol ${A} kayıt, ikinci kol ${B} kayıt. Fark ${A - B} kayıt; oran ${fmt(A / B)}; birinci, ikinciden yüzde ${fmt(((A - B) / B) * 100, 0)} fazla; ikinci, birincinin yaklaşık yüzde ${fmt((B / A) * 100, 0)}’si.`,
  steps: [
    { label: "Değerler", base: 0, top: 40, bars: [{ label: "birinci kol", value: A, tone: "c", text: `${A} kayıt` }, { label: "ikinci kol", value: B, tone: "b", text: `${B} kayıt` }], readout: ["İki değeri aynı ölçekte yan yana gör; işlemi soru cümlesi seçer."] },
    { label: "Fark", base: 0, top: 40, bars: [{ label: "birinci kol", value: A, tone: "c", text: `${A} kayıt` }, { label: "ikinci kol", value: B, tone: "b", text: `${B} kayıt` }], bridge: { from: B, to: A, label: `fark ${A - B}` }, readout: [`Fark: ${A} − ${B} = ${A - B} kayıt.`] },
    { label: "Oran", base: 0, top: 40, bars: [{ label: "birinci kol", value: A, tone: "c", text: `${A} kayıt` }, { label: "ikinci kol", value: B, tone: "b", text: `${B} kayıt` }], readout: [`Oran: ${A} / ${B} = ${fmt(A / B)}; ilk değer ikincinin ${fmt(A / B)} katıdır.`] },
    { label: "Yüzde fazla", base: 0, top: 40, bars: [{ label: "birinci kol", value: A, tone: "c", text: `${A} kayıt` }, { label: "ikinci kol", value: B, tone: "b", part: B, text: `${B} kayıt` }], bridge: { from: B, to: A, label: `${A - B} / ${B}` }, readout: [`“Birinci, ikinciden yüzde kaç fazla?”: (${A} − ${B}) / ${B} = %${fmt(((A - B) / B) * 100, 0)}. Payda ${B}’tür.`, `“İkinci, birincinin yüzde kaçı?”: ${B} / ${A} ≈ %${fmt((B / A) * 100, 0)}. Sayıların yeri değişince yüzde değişir.`] },
  ],
  foot: "İşlemden önce soru cümlesini birim ve yönüyle yeniden kur.",
});

// metin-tablo-gorsel-yorumlama · 4 · Aynı yüzde, farklı bütün.
const P = 20;
const share = barsFig({
  caption:
    "Aynı yüzde yirmi, farklı iki bütün: toplam yüz elli ve altmış. Koyu bölüm payı gösterir. İleri ile kişi sayısını hesapla: yüzde tek başına kişi sayısını vermez. Çubuklar sıfırdan başlayan ortak ölçektedir.",
  alt: `Yatay çubuk grafiği, eksen 0’dan 150’ye. Birinci grup toplam 150, yüzde ${P}’si ${(150 * P) / 100} kişi. İkinci grup toplam 60, yüzde ${P}’si ${(60 * P) / 100} kişi.`,
  unit: " kişi",
  steps: [
    { label: "Aynı yüzde", base: 0, top: 150, bars: [{ label: "toplam 150", value: 150, part: (150 * P) / 100, tone: "c", text: `%${P}` }, { label: "toplam 60", value: 60, part: (60 * P) / 100, tone: "b", text: `%${P}` }], readout: [`İki grupta da pay %${P}; koyu bölümlerin boyu yine farklıdır.`] },
    { label: "Kişi sayısı", base: 0, top: 150, bars: [{ label: "toplam 150", value: 150, part: (150 * P) / 100, tone: "c", text: `${(150 * P) / 100} kişi` }, { label: "toplam 60", value: 60, part: (60 * P) / 100, tone: "b", text: `${(60 * P) / 100} kişi` }], readout: [`150 × ${P} / 100 = ${(150 * P) / 100} kişi; 60 × ${P} / 100 = ${(60 * P) / 100} kişi.`, "Farklı büyüklükteki gruplarda önce payı kendi toplamıyla çarp, sonra kişi sayılarını karşılaştır."] },
  ],
  foot: "Oran ile mutlak sayıyı ayrı tut.",
});

// metin-tablo-gorsel-yorumlama · 5 · Yüzde puanı ve göreli değişim.
const P0 = 30;
const P1 = 40;
const points = barsFig({
  caption:
    "Oran yüzde otuzdan yüzde kırka çıkıyor. İleri ile iki ayrı iddiayı aç: yüzde puanı farkı ve göreli artış. Çubuklar sıfırdan yüze ortak ölçektedir.",
  alt: `Yatay çubuk grafiği, eksen 0’dan 100’e. Önce yüzde ${P0}, sonra yüzde ${P1}. Artış ${P1 - P0} yüzde puanı; göreli artış (${P1}−${P0})/${P0}, yaklaşık yüzde ${fmt(((P1 - P0) / P0) * 100, 0)}.`,
  steps: [
    { label: "İki oran", base: 0, top: 100, bars: [{ label: "önce", value: P0, tone: "b", text: `%${P0}` }, { label: "sonra", value: P1, tone: "c", text: `%${P1}` }], readout: ["Sorunun hangi değişimi istediğini önce belirle."] },
    { label: "Yüzde puanı", base: 0, top: 100, bars: [{ label: "önce", value: P0, tone: "b", text: `%${P0}` }, { label: "sonra", value: P1, tone: "c", text: `%${P1}` }], bridge: { from: P0, to: P1, label: `+${P1 - P0} puan` }, readout: [`${P1} − ${P0} = ${P1 - P0} yüzde puanı artış.`] },
    { label: "Göreli artış", base: 0, top: 100, bars: [{ label: "önce", value: P0, tone: "b", part: P0, text: `%${P0}` }, { label: "sonra", value: P1, tone: "c", text: `%${P1}` }], bridge: { from: P0, to: P1, label: `${P1 - P0} / ${P0}` }, readout: [`(${P1} − ${P0}) / ${P0} ≈ %${fmt(((P1 - P0) / P0) * 100, 0)} göreli artış.`, "“On puan” ile “yüzde on artış” aynı iddia değildir."] },
  ],
  foot: "Oran arttı diye katılan kişi sayısının da arttığını söyleme; pay ve paydayı birlikte incele.",
});

// metin-tablo-gorsel-yorumlama · 7 · Eksen başlangıcı.
const V0 = 104;
const V1 = 112;
const look = (base: number) => fmt((V1 - base) / (V0 - base));
const axisStart = barsFig({
  caption:
    "Bölümdeki iki etiket: yüz dört ve yüz on iki. İleri ile ekseni sıfırdan başlat: 100’den başlayan eksende görünen boy oranı gerçek değer oranından çok büyüktür. Boylar her adımın ekseniyle orantılıdır.",
  alt: `Yatay çubuk grafiği iki adımda. Eksen 100’den başlarken ${V0} ve ${V1} çubuklarının boy oranı ${look(100)}. Eksen 0’dan başlarken boy oranı ${look(0)}; gerçek oran ${fmt(V1 / V0, 2)}.`,
  steps: [
    { label: "Eksen 100’den", base: 100, top: 114, bars: [{ label: "birinci", value: V0, tone: "b", text: `${V0}` }, { label: "ikinci", value: V1, tone: "c", text: `${V1}` }], readout: [`Görünen boy oranı (${V1} − 100) / (${V0} − 100) = ${look(100)}: ikinci çubuk üç kat uzun görünür.`] },
    { label: "Eksen 0’dan", base: 0, top: 120, bars: [{ label: "birinci", value: V0, tone: "b", text: `${V0}` }, { label: "ikinci", value: V1, tone: "c", text: `${V1}` }], readout: [`Gerçek oran ${V1} / ${V0} ≈ ${fmt(V1 / V0, 2)}; ikinci miktar iki kat değildir.`] },
  ],
  foot: "Başlangıç çizgisini ve basamak aralığını okuyarak gerçek sayıları kullan.",
});

// metin-tablo-gorsel-yorumlama · 8 · Daire grafiğinde pay.
const pie = pieFig({
  caption:
    "Yüz sekiz derecelik dilim: açıyı tam dairenin üç yüz altmış derecesine böl. Kişi sayısı istenirse bu pay ilgili bütünün toplamıyla ayrıca çarpılır. Dilim açısı ölçeklidir.",
  alt: "Daire grafiği, 108 derecelik vurgulu dilim. 108 bölü 360 eşittir 0,30; dilim bütünün yüzde 30’udur.",
  angle: 108,
  lines: (pay) => [`dilim: 108°`, `tam daire: 360°`, `pay: 108 / 360 = ${fmt(pay, 2)}`, "farklı toplamlı daireleri açıyla karşılaştırma"],
  foot: "Büyük dilim daha küçük bir toplamda az kişi taşıyabilir.",
});

// paragrafta-soru-cevap · 5 · Neden ve amaç.
const causePurpose = tableFig({
  caption:
    "Neden gerçekleşmiş etkeni, amaç ulaşılmak istenen sonucu verir. Bir cümleye tıkla: ilişkinin kanıtı ve cümlenin neyi kanıtlamadığı açılır. “İçin” iki ilişkide de görülebilir.",
  alt: "Dört satırlı tablo. Yağmur yağdığı için içeri girdik: neden. Islanmamak için içeri girdik: amaç. Toplantıyı erteledik; salonun güvenlik kontrolü bitmemişti: neden. Etiketleri büyüttük ki ziyaretçiler uzaktan da okuyabilsin: amaç.",
  cols: [
    { name: "Cümle", w: 6.0 },
    { name: "İlişki", w: 1.6 },
    { name: "Kanıt", w: 2.4 },
  ],
  rows: [
    { cells: ["Yağmur yağdığı için içeri girdik.", "neden", "gerçekleşmiş etken"], tones: [undefined, "b", "muted"], detail: ["Yağmur gerçekleşmiş etkendir."] },
    { cells: ["Islanmamak için içeri girdik.", "amaç", "hedeflenen sonuç"], tones: [undefined, "c", "muted"], detail: ["Islanmamak ulaşılmak istenen sonuçtur; aynı olay çevresinde başka bir ilişki."] },
    { cells: ["Toplantıyı erteledik; salonun güvenlik kontrolü bitmemişti.", "neden", "“Niçin ertelediniz?”"], tones: [undefined, "b", "muted"], detail: ["Bağlaç olmadan iki cümle neden ilişkisini kurar.", "Salonun neden denetlendiği ayrı bir sorudur."] },
    { cells: ["Etiketleri büyüttük ki ziyaretçiler uzaktan da okuyabilsin.", "amaç", "“Hangi amaçla büyüttünüz?”"], tones: [undefined, "c", "muted"], detail: ["Uzaktan okunabilmesi hedeflenen sonuçtur.", "Her ziyaretçinin artık okuyabildiğini tek başına kanıtlamaz."] },
  ],
  foot: "Gerçekleşmiş etken ile ulaşılmak istenen sonucu ayrı yaz.",
});

// paragrafta-soru-cevap · 7 · Araç, yöntem, ölçüt.
const toolCriterion = tableFig({
  caption:
    "Bölümdeki tek yanıtta üç ayrı alan: inceleme aracı, sınıflama yöntemi ve öncelik ölçütü. Bir parçaya tıkla: hangi soruya karşılık verdiği açılır. Bir alanın cevabı diğerini doldurmaz.",
  alt: "Üç satırlı tablo. Büyüteçle inceledik: araç. Sayfaları durumlarına göre grupladık: yöntem. Riski yüksek olanı önce aldık: ölçüt, neye göre seçtiniz sorusunun cevabı.",
  cols: [
    { name: "Yanıtın parçası", w: 4.6 },
    { name: "Alan", w: 2.0 },
    { name: "Karşıladığı soru", w: 3.4 },
  ],
  rows: [
    { cells: ["Büyüteçle inceledik", "araç", "araç sorusu"], tones: [undefined, "b", "muted"], detail: ["Büyüteç inceleme aracıdır; seçim ölçütünün büyüteç olduğu söylenemez."] },
    { cells: ["sayfaları durumlarına göre grupladık", "yöntem", "yöntem sorusu"], tones: [undefined, "c", "muted"], detail: ["Sınıflama yöntemi işin hangi işlemle yürütüldüğünü verir."] },
    { cells: ["riski yüksek olanı önce aldık", "ölçüt", "Neye göre seçtiniz?"], tones: [undefined, "a", "muted"], detail: ["Kararın dayandığı özellik risk düzeyidir.", "“Onarılacak kitapları hasarın ilerleme riskine göre seçtik.” cümlesinde de ölçüt aynıdır."] },
  ],
  foot: "Soru hangi alanı istiyorsa karşılığını o alandan seç.",
});

// paragrafta-soru-cevap · 9 · Gerekli koşul.
const condition = tableFig({
  caption:
    "Bölümdeki iki kural: “Yalnız izin verilen kayıtlar yayımlanabilir.” ve “İzni olan ve teknik kontrolü geçen her kayıt yayımlanır.” Bir duruma tıkla: iki kurala göre ne söylenebildiği açılır. İzin gereklidir ama tek başına yeterli değildir.",
  alt: "Dört satırlı tablo. İzin var ve teknik kontrol geçti: yayımlanır. İzin var, teknik kontrol geçmedi: kurallar sonuç vermez. İzin yok, kontrol geçti: yayımlanamaz. İzin yok, kontrol geçmedi: yayımlanamaz.",
  cols: [
    { name: "İzin", w: 2.2 },
    { name: "Teknik kontrol", w: 2.6 },
    { name: "Kurallara göre", w: 5.2 },
  ],
  rows: [
    { cells: ["var", "geçti", "yayımlanır: iki parçalı yeterli koşul"], tones: [undefined, "ink", "c"], detail: ["İkinci kural yeterli koşulu iki parçayla açıkça kurar."] },
    { cells: ["var", "geçmedi", "belirsiz: izin tek başına yetmez"], tones: [undefined, "ink", "b"], detail: ["İzin gerekli koşuldur; tek başına yeterli koşula çevirmek yanıta yeni bilgi ekler."] },
    { cells: ["yok", "geçti", "yayımlanamaz: gerekli koşul eksik"], tones: [undefined, "ink", "warn"], detail: ["İzin verilmeyen bir kayıt birinci kurala göre yayımlanamaz."] },
    { cells: ["yok", "geçmedi", "yayımlanamaz: gerekli koşul eksik"], tones: [undefined, "ink", "warn"], detail: ["İzin yoksa teknik kontrolün sonucu kararı değiştirmez."] },
  ],
  foot: "Koşulu değiştirdiğinde hangi sözün değiştiğini göster; başka seçim koşulu verilmemiştir.",
});

// paragrafta-soru-cevap · 12 · Kanıt çizelgesi.
const evidenceGrid = tableFig({
  caption:
    "Bölümdeki yanıt: “Gönüllüler cumartesi müzede toplandı, kırk nesneyi kaydetti ve çalışmayı üç günde bitirdi.” Her soruyu istenen alana ve metindeki karşılığa eşle. Bir satıra tıkla. Karşılık yoksa “belirtilmemiş” yazılır.",
  alt: "Altı satırlı çizelge. Kim: gönüllüler. Hangi gün: cumartesi. Nerede: müzede. Kaç nesne: kırk. Ne kadar süre: üç gün. Hangi yazılımla: belirtilmemiş.",
  cols: [
    { name: "Soru", w: 3.4 },
    { name: "Alan", w: 2.0 },
    { name: "Metinde", w: 2.6 },
    { name: "Durum", w: 2.0 },
  ],
  rows: [
    { cells: ["Kim?", "kişi", "gönüllüler", "var"], tones: [undefined, "muted", "ink", "c"], detail: ["Kim sorusu belirli cevap alır: gönüllüler."] },
    { cells: ["Hangi gün?", "zaman", "cumartesi", "var"], tones: [undefined, "muted", "ink", "c"], detail: ["Gün adı verilmiştir; takvim tarihi verilmemiştir."] },
    { cells: ["Nerede?", "yer", "müzede", "var"], tones: [undefined, "muted", "ink", "c"], detail: ["Toplanma yeri müzedir."] },
    { cells: ["Kaç nesne?", "sayı", "kırk", "var"], tones: [undefined, "muted", "ink", "c"], detail: ["Kaydedilen nesne sayısı kırktır."] },
    { cells: ["Ne kadar sürede?", "süre", "üç gün", "var"], tones: [undefined, "muted", "ink", "c"], detail: ["Süre üç gündür."] },
    { cells: ["Hangi yazılımla?", "araç", "yok", "belirtilmemiş"], tones: [undefined, "muted", "warn", "warn"], detail: ["Araç bilgisi yoktur; uygulama adı tahmin edilemez.", "“Hiç yazılım kullanmadılar” demek de metinde olmayan bir bilgidir."] },
  ],
  foot: "Bilginin verilmemesi ile olayın gerçekleşmediğinin bildirilmesi farklı sonuçlardır.",
});

// paragrafta-roportaj · 1 · Mülakat ve röportaj.
const interviewKinds = tableFig({
  caption:
    "Bölümdeki ayrım: mülakat kişinin görüşlerine planlı sorularla yönelir; röportaj kişi, yer, olay veya sorun üzerine araştırma, gözlem ve tanıklık içeren daha geniş bir metindir. Bir türe tıkla. Örnek yapıt ve yazar dersin son bölümünden alınmıştır.",
  alt: "İki satırlı tablo. Mülakat: odak kişinin görüşleri, malzeme planlı soru ve yanıt, örnek Ruşen Eşref Ünaydın, Diyorlar ki. Röportaj: odak kişi, yer, olay veya sorun; malzeme araştırma, gözlem, tanıklık ve gerektiğinde görüşme; örnek Yaşar Kemal.",
  cols: [
    { name: "Tür", w: 2.2 },
    { name: "Odak", w: 2.7 },
    { name: "Malzeme", w: 2.9 },
    { name: "Örnek", w: 2.2 },
  ],
  rows: [
    { cells: ["mülakat", "kişinin görüşleri", "planlı sorular ve yanıtlar", "Ruşen Eşref Ünaydın, Diyorlar ki"], tones: [undefined, "c", "ink", "muted"], detail: ["Mülakat bir kişinin görüşlerini planlı sorular ve yanıtlarla ortaya koyar.", "Yapıt–yazar bilgisi paragraf çözümünün yerine geçmez."] },
    { cells: ["röportaj", "kişi, yer, olay veya sorun", "araştırma, gözlem, tanıklık, gerekirse görüşme", "Yaşar Kemal"], tones: [undefined, "b", "ink", "muted"], detail: ["Her röportajın yalnız soru–cevap satırlarından oluşması gerekmez.", "Bir türün tek örneğinden bütün örneklerin aynı düzenle yazıldığı çıkarılmaz."] },
  ],
  foot: "Tür sorusunda yapı özelliklerini, okuma sorusunda parçadaki gerçek sözleri kullan.",
});

// paragrafta-roportaj · 3 · Turdan tura değişen bilgi isteği.
const turns = flowFig({
  caption:
    "Bölümdeki görüşme turları: konu aynı kalır, bilgi isteği değişir. İleri ile turları aç; her turun yeni eklediği bilgi ayrı adlandırılır.",
  alt: "Üç kart oklarla alt alta. Soru: Onarımda önce neye bakarsınız, başlangıç adımı ister. Yanıt: Önce çatlağın yerini kaydederim, adımı verir. Takip sorusu: Bu kaydı neden tutarsınız, aynı eylemin gerekçesini ister.",
  nodes: [
    { head: "Soru: “Onarımda önce neye bakarsınız?”", text: "bir başlangıç adımı ister", tone: "c", note: "Kök bir sıra bilgisi istiyor: ilk adım." },
    { head: "Yanıt: “Önce çatlağın yerini kaydederim.”", text: "istenen adımı verir; “önce” sıra kurar", tone: "b", note: "Yanıt sorunun istediği yönü karşılar." },
    { head: "Takip: “Bu kaydı neden tutarsınız?”", text: "aynı eylemin gerekçesini ister", tone: "a", note: "“Bu kayıt” önceki yanıttaki eyleme döner; hedef sıradan gerekçeye geçmiştir." },
  ],
  steps: ["Soru", "Yanıt", "Takip"],
  reveal: true,
  foot: "Aynı nesnenin sürekli geçmesi turların aynı bilgiye sahip olduğunu göstermez.",
});

// paragrafta-roportaj · 6 · Takip sorusunun öncülü.
const followUp = ladderFig({
  caption:
    "Takip sorusunun uygunluğu akıcılıkla değil, önceki yanıta dayanan öncül ve yeni bilgi isteğiyle gerekçelendirilir. İleri ile bölümdeki iki soruyu merdivende yürüt.",
  alt: "İki basamaklı karar merdiveni. Soru söylenmemiş bir şeyi yapılmış sayıyor mu, evet ise yanlış öncül, yönlendiren soru. İstenen bilgi yanıtta zaten tam verilmiş mi, evet ise bilgi açığını kapatmaz. Hayır ise uygun takip sorusu.",
  rungs: [
    { q: "Soru söylenmemiş bir şeyi yapılmış ya da söylenmiş sayıyor mu?", yes: "yanlış öncül: yönlendiren soru", tone: "warn" },
    { q: "İstenen bilgi yanıtta zaten tam verilmiş mi?", yes: "bilgi açığını kapatmaz", tone: "b" },
  ],
  last: "Uygun takip: öncül önceki yanıttan, yeni bilgi isteği",
  lastTone: "c",
  walks: [
    { step: "Yönlendiren", example: "“Her eleştiriyi reddettiğinize göre neden görüş alıyorsunuz?”", stop: 0, why: "Kişinin her eleştiriyi reddettiğini peşinen kabul eder; yanıt “Hepsini reddetmiyorum” diyerek öncülü düzeltir." },
    { step: "Uygun takip", example: "“Son aşamada iki farklı okur grubuyla deniyorum.” yanıtına “Bu iki grubu hangi ölçütle seçiyorsunuz?”", stop: 2, why: "Grupların seçildiği bilgisi önceki yanıttan gelir; ölçüt henüz açıklanmamıştır." },
  ],
  foot: "Kişinin bir soruya cevap vermesi, sorudaki bütün iddiaları onayladığı anlamına gelmez.",
});

// paragrafta-roportaj · 8 · Gözlem, görüş, aktarılmış ve doğrudan söz.
const voices = tableFig({
  caption:
    "Görüşme parçasında dört farklı söz türü: gözlem, görüş, aktarılmış bildiri ve doğrudan söz. Bir cümleye tıkla: hangi yargının kime ait olduğu ve sınırı açılır.",
  alt: "Dört satırlı tablo. Atölye kapısı kırmızıydı: gözlem. Bu rengin mekânı daha sıcak gösterdiğini düşünüyorum: görüş. Ada, yöntemi değiştirdiğini söyledi: aktarılmış söz. Ada: Yöntemi değiştirdim: doğrudan söz.",
  cols: [
    { name: "Cümle", w: 6.4 },
    { name: "Tür", w: 3.6 },
  ],
  rows: [
    { cells: ["Atölye kapısı kırmızıydı.", "gözlem"], tones: [undefined, "c"], detail: ["Gözleme dayalı bir nitelik bildirir."] },
    { cells: ["Bu rengin mekânı daha sıcak gösterdiğini düşünüyorum.", "görüş"], tones: [undefined, "b"], detail: ["Yorum ve değerlendirmedir; konuşanın tutumunun dayanağıdır.", "Görüş herkes için evrensel gerçek hâline gelmez."] },
    { cells: ["Ada, yöntemi değiştirdiğini söyledi.", "aktarılmış söz"], tones: [undefined, "muted"], detail: ["Bir anlatıcı kişinin söylediğini kendi cümlesiyle aktarır."] },
    { cells: ["Ada: Yöntemi değiştirdim.", "doğrudan söz"], tones: [undefined, "a"], detail: ["Söz kişiye açıkça verilir.", "Sunuş biçimi iddianın doğruluğunu garanti etmez."] },
  ],
  foot: "Soruda konuşmacının görüşü istendiğinde yalnız nesne bilgisini tekrarlamak yetmez.",
});

export const turkishFigures061Paragraph: Record<string, Record<string, FigureDef>> = {
  "paragrafta-anlatim-bicimleri": {
    "Ne anlatılıyor, nasıl anlatılıyor?": modeLadder,
    "Nesnel ve izlenimsel betimleme": describeTable,
    "Biçim ve düşünceyi geliştirme yolu": modeTools,
  },
  "paragrafta-coklu-sorular": {
    "Önce soru hedefini adlandır": stemTargets,
    "İlk okumada anlam iskeleti": skeleton,
    "Nicelik sözlerini dikkatle oku": quantifiers,
    "Yanlışı ilk bozulan bağdan onar": firstBreak,
  },
  "paragrafta-konu": {
    "Konu ve ana düşünce": topicIdea,
    "Geniş alan ve özel yön": scopeLadder,
    "Kapsamı değiştiren küçük sözler": smallWords,
  },
  "metin-tablo-gorsel-yorumlama": {
    "Fark ve oran": diffRatio,
    "Yüzde, pay ve bütün": share,
    "Yüzde puanı ve yüzde değişim": points,
    "Eksen başlangıcı ve görsel uzunluk": axisStart,
    "Daire grafiğinde payda": pie,
  },
  "paragrafta-soru-cevap": {
    "Amaç, beklenen sonuca yönelir": causePurpose,
    "Ölçüt ile araç birbirinden ayrılır": toolCriterion,
    "Koşulun yönünü koru": condition,
    "Cevabı olmayan soru için kanıt çizelgesi": evidenceGrid,
  },
  "paragrafta-roportaj": {
    "Röportaj ile mülakatın kapsamı": interviewKinds,
    "Soru, yanıt ve dayanak": turns,
    "Takip sorusu önceki söze dayanır": followUp,
    "Görüş ile gözlemi ayır": voices,
  },
};
