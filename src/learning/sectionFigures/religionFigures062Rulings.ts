import { type El, type FigureDef } from "./figureKit";
import { axis, BAR_R, barRow, LABEL_W } from "./geographyFigures061Kit";
import { argFig, flowFig, tableFig } from "./turkishFigures060Kit";
import { drawFig, lines } from "./biologyFigures062Kit";

/*
 * Forge062 TYT Din Kültürü · Güncel dinî meseleler; ahlaki tutum ve
 * davranışlar. Terimler, ayet göndermeleri ve örnekler yalnız bölüm
 * metninden alınır; tablolar kaynağın anlatımını temsil eder, hiçbir
 * kişiye ya da ürüne hüküm vermez. Sağlık konuları figürlenmez; tablolar
 * fetva, tanı ya da tedavi önerisi değildir. Adalet modelindeki 2 ve 6
 * saatlik eksik bölümdeki sayılardır; toplam destek 4 + 4 = 8 saatten gelir.
 */

/* ---------------- Güncel dinî meseleler ---------------- */

// 2 · İcma ve kapsamı.
const ijma = tableFig({
  caption:
    "İcma uzmanlık ve görüş birliği koşullarını birlikte taşır. Bir ortaklık türüne tıkla: icma tanımını karşılayıp karşılamadığı açılır. Metnin verdiği ortaklığın kapsamını koru.",
  alt: "Üç satırlı tablo. Tek bir âlimin görüşü: bütün müçtehitlerin ittifakını kanıtlamaz. Belirli bir kurulun oy birliği: tek başına kanıtlamaz. Hz. Muhammed’in vefatından sonra bir dönemin müçtehitlerinin görüş birliği: icma tanımı.",
  cols: [
    { name: "Ortaklık", w: 4.2 },
    { name: "İcma tanımına göre", w: 5.8 },
  ],
  rows: [
    { cells: ["Tek âlimin görüşü", "ittifakı tek başına kanıtlamaz"], tones: [undefined, "muted"], detail: ["Tek bir âlimin görüşü bütün ilgili müçtehitlerin ittifakını kanıtlamaz."] },
    { cells: ["Bir kurulun oy birliği", "ittifakı tek başına kanıtlamaz"], tones: [undefined, "muted"], detail: ["Sırf çok sayıda kişi konuştu diye icma oluştuğu sonucuna gidilmez."] },
    { cells: ["Bir dönemin müçtehitleri", "Hz. Muhammed’in vefatından sonra görüş birliği: icma"], tones: [undefined, "a"], detail: ["Müçtehit gerekli kaynak ve yöntem bilgisiyle hüküm çıkarma yetkinliği olan âlimdir."] },
  ],
  foot: "Veri eksikse görüş birliğinin hiç olmadığını da kanıtsız ilan etme.",
});

// 4 · Kıyas.
const qiyas = argFig({
  caption:
    "Kıyas, yeni durumla hükmü bilinen durum arasında hüküm bakımından etkili ortak gerekçeye dayanarak ilişki kurmadır; bu gerekçeye illet denir. Adımlarla bölümdeki aldatma örneğini izle. Kavram şeması, ölçekli değil.",
  alt: "İki öncül kartı: bilinen durum yüz yüze aldatma; yeni durum çevrim içi aldatma, dış biçim farklı. Oklar ortak gerekçe, illet etiketiyle sonuç kartında birleşir: yanıltma ve hak ihlali ortak, hüküm bakımından ilişki kurulur.",
  premises: ["Bilinen durum: yüz yüze aldatma", "Yeni durum: çevrim içi aldatma; dış biçim farklı"],
  marker: "illet",
  conclusion: "Ortak etkili gerekçe yanıltma ve hak ihlali; iki durum hüküm bakımından ilişkilendirilir.",
  steps: [
    { label: "İki durum", note: "Bilinen hükmü ve yeni olayı ayrı yaz." },
    { label: "Ortak gerekçe", note: "Yalnız rengi ya da adı benzeyen iki nesneye aynı hüküm taşınamaz; ortak gerekçe açıkça gösterilir." },
  ],
  foot: "Kıyas içtihat içinde kullanılan bir yöntemdir; her içtihat yalnız kıyas değildir.",
});

// 5 · Beş temel değer.
const five = tableFig({
  caption:
    "Zarûrât-ı hamse, korunması hedeflenen beş temel değerdir; zarûrât-ı diniyye ise dinin kesin temel esaslarıdır. Bir değere tıkla: bölümdeki örnek açılır. Bir olay birden fazla değeri etkileyebilir.",
  alt: "Beş satırlı tablo. Din; can; akıl, aklı bozan maddeler akıl ve cana temas eder; nesil, aile ve gelecek kuşaklarla ilgili sorumluluk; mal, hırsızlık.",
  cols: [
    { name: "Değer", w: 2.4 },
    { name: "Bölümdeki örnek ilişki", w: 7.6 },
  ],
  rows: [
    { cells: ["Din", "korunması hedeflenen beş değerden biri"], tones: [undefined, "b"], detail: ["Ad benzerliği zarûrât-ı diniyye ile zarûrât-ı hamseyi özdeş yapmaz."] },
    { cells: ["Can", "aklı bozan maddeler cana da temas edebilir"], tones: [undefined, "c"], detail: ["Baskın değeri seçmek diğerlerinin ilişkisiz olduğunu söylemek değildir."] },
    { cells: ["Akıl", "aklı bozan maddeler"], tones: [undefined, "c"], detail: ["Aynı olay akıl ve canı birlikte etkileyebilir."] },
    { cells: ["Nesil", "aile ve gelecek kuşaklarla ilgili sorumluluk"], tones: [undefined, "a"], detail: ["Nesil değeri aile ve gelecek kuşaklarla ilişkilendirilir."] },
    { cells: ["Mal", "hırsızlık"], tones: [undefined, "a"], detail: ["Hırsızlık mal değerine temas eder."] },
  ],
  foot: "Tablo bir olayın bütün yönlerini tek kutuya indirmez.",
});

// 6 · Yarar, zarar ve hak.
const balance = tableFig({
  caption:
    "Bölümdeki dört terim ve anlamları. Bir terime tıkla. Yararlı sonuç iddiası, açıklanmış bir hak ihlalini otomatik ortadan kaldırmaz.",
  alt: "Dört satırlı tablo. Maslahat: yarar. Mefsedet: zarar ya da bozulma. Def-i mefâsid celb-i menâfiden önce gelir: zararı önleme yarar sağlamaya göre önceliklidir. Sedd-i zerâi: ciddi zarara götüren yolları önleme.",
  cols: [
    { name: "Terim", w: 3.4 },
    { name: "Bölümdeki anlam", w: 6.6 },
  ],
  rows: [
    { cells: ["Maslahat", "yarar"], tones: [undefined, "a"], detail: ["Yarar ve zarar somut koşullarla incelenir."] },
    { cells: ["Mefsedet", "zarar ya da bozulma"], tones: [undefined, "warn"], detail: ["Zararla ilişki, olasılık ve somut koşullar incelenir."] },
    { cells: ["Def-i mefâsid", "zararı önleme, yarar sağlamaya göre önceliklidir"], tones: [undefined, "b"], detail: ["İlkenin tam adı: def-i mefâsid celb-i menâfiden önce gelir."] },
    { cells: ["Sedd-i zerâi", "ciddi zarara götüren yolları önleme"], tones: [undefined, "c"], detail: ["Salt kuşkuyla bütün davranışları yasaklamak bu ilkenin yeterli açıklaması değildir."] },
  ],
  foot: "Hakların korunması değerlendirmeye dâhildir.",
});

// 7 · Hüküm terimleri.
const terms = tableFig({
  caption:
    "Dersin verdiği hüküm tanımları. Bir terime tıkla. Mekruh ile haram aynı hüküm adı değildir; vacip ve sünnetin teknik sınıflandırılması mezheplere göre farklılık gösterebilir.",
  alt: "Beş satırlı tablo. Farz: yapılması kesin biçimde istenen. Haram: kesin biçimde yasaklanan. Mübah: yapılıp yapılmaması serbest. Helal: izin verilen alan. Mekruh: kaçınılması uygun görülen.",
  cols: [
    { name: "Terim", w: 2.6 },
    { name: "Dersteki tanım", w: 7.4 },
  ],
  rows: [
    { cells: ["Farz", "yapılması kesin biçimde istenen"], tones: [undefined, "a"], detail: ["Tanımı öğrenmek bir kişinin inancını ya da bütün sorumluluk koşullarını ölçmek değildir."] },
    { cells: ["Haram", "kesin biçimde yasaklanan"], tones: [undefined, "warn"], detail: ["Haram kesin yasak anlamındadır."] },
    { cells: ["Mübah", "yapılıp yapılmaması serbest bırakılan"], tones: [undefined, "b"], detail: ["Mübah serbest bırakılan davranıştır."] },
    { cells: ["Helal", "izin verilen alan"], tones: [undefined, "b"], detail: ["Helal izin verilen alanı anlatır."] },
    { cells: ["Mekruh", "kaçınılması uygun görülen"], tones: [undefined, "c"], detail: ["Mekruh haramla aynı hüküm adı değildir."] },
  ],
  foot: "Dersin verdiği tanımı bağlamıyla oku.",
});

// 29 · En’âm 151.
const anam151 = tableFig({
  caption:
    "Bölümde En’âm 151’in öne çıkardığı mesajlar. Bir mesaja tıkla. Soruda hangi fiilin hangi mesajla ilişkili olduğunu göster; metinde olmayan ayrıntı ekleme.",
  alt: "Beş satırlı tablo: Allah’a ortak koşmamak; anne babaya iyilik; yoksulluk korkusuyla çocukların canına kıymamak; çirkinliklerden uzak durmak; canın dokunulmazlığı.",
  cols: [
    { name: "Mesaj", w: 6.4 },
    { name: "Alan", w: 3.6 },
  ],
  rows: [
    { cells: ["Allah’a ortak koşmamak", "inanç"], tones: [undefined, "b"], detail: ["Bu mesajlarda inanç, aile sorumluluğu ve yaşamın korunması birlikte görülür."] },
    { cells: ["Anne babaya iyilik", "aile sorumluluğu"], tones: [undefined, "c"], detail: ["Aile sorumluluğu mesajı."] },
    { cells: ["Yoksulluk korkusuyla çocukların canına kıymamak", "yaşamın korunması"], tones: [undefined, "a"], detail: ["Yaşamın korunması mesajı."] },
    { cells: ["Çirkinliklerden uzak durmak", "ahlak"], tones: [undefined, "c"], detail: ["Çirkinliklerden uzak durma mesajı."] },
    { cells: ["Canın dokunulmazlığı", "yaşamın korunması"], tones: [undefined, "a"], detail: ["Ayetin açık ilkesi kişisel kararların bütün ayrıntısıyla aynı şey değildir."] },
  ],
  foot: "Metinde olmayan teşhis, nüfus hedefi ya da teknik yaptırım ekleme.",
});

// 30 · En’âm 152.
const anam152 = tableFig({
  caption:
    "Bölümde En’âm 152’nin vurguladığı dört mesaj. Bir mesaja tıkla. Mal güvenliği ve tarafsız söz farklı ama ilişkili alanlardır; her birinin ayrı ilkesini göster.",
  alt: "Dört satırlı tablo: yetim malını en iyi biçimde korumak; ölçü ve tartıda adalet; yakınlar hakkında bile adil konuşmak; verilen söze bağlılık. Güç yetirebilme ifadesi sorumluluğun bağlamında bulunur.",
  cols: [
    { name: "Mesaj", w: 6.4 },
    { name: "Alan", w: 3.6 },
  ],
  rows: [
    { cells: ["Yetim malını en iyi biçimde korumak", "mal güvenliği"], tones: [undefined, "b"], detail: ["Mal güvenliği alanı."] },
    { cells: ["Ölçü ve tartıda adalet", "ticaret ve hak"], tones: [undefined, "c"], detail: ["Eksik tartı ayrı bir ilkeyle ilişkilidir."] },
    { cells: ["Yakınlar hakkında bile adil konuşmak", "tarafsız söz"], tones: [undefined, "a"], detail: ["Akraba lehine yalan tanıklık eksik tartıyla aynı belirsiz sözle anlatılmaz."] },
    { cells: ["Verilen söze bağlılık", "ahit"], tones: [undefined, "c"], detail: ["Güç yetirebilme ifadesi sorumluluğun bağlamında bulunur."] },
  ],
  foot: "Genel adalet mesajı çağdaş suçların ayrıntılı yaptırımını tek başına vermez.",
});

/* ---------------- Ahlaki tutum ve davranışlar ---------------- */

// 2 · İlke, tutum, davranış.
const levels = flowFig({
  caption:
    "İlke genel ölçüt, tutum görece kalıcı eğilim, davranış belirli olayda gözlenen eylemdir. İleri ile bölümdeki adalet örneğini aç. Tek bir doğru davranıştan kalıcı kişilik tanısı çıkarılmaz. Kavram şeması.",
  alt: "Üç kart alt alta: ilke, adalet; tutum, haksızlığa duyarlılık; davranış, ayrımcı karara itiraz etmek.",
  nodes: [
    { head: "İlke", text: "adalet", tone: "b", note: "İlke farklı durumlara uygulanabilen genel ölçüttür." },
    { head: "Tutum", text: "haksızlığa duyarlılık", tone: "c", note: "Tutum bir konuya yönelik görece kalıcı eğilimdir." },
    { head: "Davranış", text: "ayrımcı karara itiraz etmek", tone: "a", note: "Davranış belirli bir olayda gözlenen eylemdir." },
  ],
  steps: ["İlke", "Tutum", "Davranış"],
  reveal: true,
  foot: "Soru hangi düzeyi istiyorsa cevabını o düzeyde kur.",
});

// 4 · İrade yönetimi.
const will = flowFig({
  caption:
    "Öfkeyi hissetmekle birine zarar vermek aynı şey değildir. Bölümdeki irade yönetimi adımlarını ileri ile aç. İtidal her koşulda sayısal yarıyı seçmek değil, hak ve ihtiyaca uygun ölçüdür.",
  alt: "Dört kart alt alta: duyguyu fark et; tepkiyi durdur; uygun davranışı seç; sonucu gözden geçir.",
  nodes: [
    { head: "Fark et", text: "duyguyu fark et", tone: "b", note: "Nefis terbiyesi istekleri yok saymak yerine ilke ve sorumlulukla yönetmeyi amaçlar." },
    { head: "Durdur", text: "tepkiyi durdur", tone: "c", note: "İfrat aşırılık, tefrit gerekli olanı eksik bırakmadır." },
    { head: "Seç", text: "uygun davranışı seç", tone: "c", note: "İtidal ölçülü dengedir." },
    { head: "Gözden geçir", text: "sonucu değerlendir", tone: "a", note: "İyi davranış adım adım alışkanlığa dönüşür." },
  ],
  steps: ["Fark et", "Durdur", "Seç", "Gözden geçir"],
  reveal: true,
  foot: "Ahlak eğitimi ailede başlar; okul, çevre ve kişinin kendi çabasıyla sürer.",
});

// 5 · Temel erdemler.
const virtues = tableFig({
  caption:
    "MEB kaynaklarının ele aldığı temel erdemler farklı becerileri ilişkilendirir. Bir erdeme tıkla. Aynı olay birden çok erdem taşıyabilir; bu, bütün ahlak kuramlarının aynı terimleri kullandığı iddiası değildir.",
  alt: "Dört satırlı tablo. Adalet: hak gözetme. Hikmet: bilgiyi yerinde kullanma. İffet: isteklerde ölçülülük. Şecaat: doğru için ölçülü cesaret.",
  cols: [
    { name: "Erdem", w: 2.6 },
    { name: "Beceri", w: 7.4 },
  ],
  rows: [
    { cells: ["Adalet", "hak gözetme"], tones: [undefined, "b"], detail: ["Hak sahibinin hakkını gözetmek ve gerekçesiz kayırmadan kaçınmaktır."] },
    { cells: ["Hikmet", "bilgiyi yerinde kullanma"], tones: [undefined, "c"], detail: ["Bilgiyi amaçla ilişkilendiren muhakeme biçimidir."] },
    { cells: ["İffet", "isteklerde ölçülülük"], tones: [undefined, "a"], detail: ["Yeme, konuşma ve harcama gibi alanlara da uzanır."] },
    { cells: ["Şecaat", "doğru için ölçülü cesaret"], tones: [undefined, "a"], detail: ["Korkusuzca her tehlikeye atılmak şecaatin yeterli koşulu değildir."] },
  ],
  foot: "Sabır ve cömertlik bu çerçeveyle birlikte açıklanabilir.",
});

// 12 · Adalet ve eşitlik: ihtiyaç ölçütü.
const NEED = [2, 6];
const TOTAL = 8;
const hX = (n: number) => LABEL_W + (n * (BAR_R - LABEL_W)) / 8;
const fairDraw = (a: number) => {
  const els: El[] = [];
  const give = [a, TOTAL - a];
  let y = 0;
  give.forEach((g, i) => {
    const gap = Math.max(0, NEED[i] - g);
    const extra = Math.max(0, g - NEED[i]);
    y = barRow(els, y, `${i === 0 ? "Birinci" : "İkinci"} öğrenci`, [{ len: Math.min(g, NEED[i]), tone: "b" }, { len: gap, tone: "warn", dash: true }, { len: extra, tone: "muted" }], hX, `eksik ${NEED[i]} sa, destek ${g} sa, açık ${gap} sa`);
  });
  y = axis(els, y + 0.2, [0, 2, 4, 6, 8], hX, "saat");
  y = lines(els, y, ["Dolu parça karşılanan, kesik çerçeve açık kalan, soluk parça ihtiyacı aşan destek."]);
  return { els, h: -y };
};
const fairH = fairDraw(4).h;
const fairness: FigureDef = drawFig({
  caption:
    "Bölümdeki model: ölçüt kaçırılan ders kadar destek vermektir. İki ve altı saat eksiği olan öğrencilere toplam 8 saat dağıtılır. Sürgüyle birinci öğrencinin payını değiştir: dört-dört paylaşım iki saat açık bırakır, iki-altı paylaşım açık bırakmaz.",
  alt: "Saat ekseninde iki yatay çubuk. Birinci öğrencinin eksiği 2, ikincinin 6 saat. Sürgü birinci öğrenciye verilen desteği, kalan ikinciye gider. Açık kalan saat kesik çerçeveyle gösterilir.",
  h: fairH,
  param: { label: "Birinciye destek", min: 0, max: TOTAL, step: 1, init: 4, unit: " sa" },
  draw: (a) => {
    const { els } = fairDraw(a);
    const gaps = [Math.max(0, NEED[0] - a), Math.max(0, NEED[1] - (TOTAL - a))];
    return { els, readout: [`Paylaşım ${a}–${TOTAL - a}: açıklar ${gaps[0]} ve ${gaps[1]} saat, toplam ${gaps[0] + gaps[1]} saat.`, "Bu sınırlı örnek bütün ahlaki sorunları tek formülle çözen bir adalet makinesi değildir."] };
  },
});

// 18 · Mahremiyet alanları.
const privacy = tableFig({
  caption:
    "Mahremiyet alanları birbirini dışlamaz; bir olay birden çok alanı ihlal edebilir. Bir alana tıkla: bölümdeki örnek açılır. Tecessüs başkasının gizli hâl ve kusurlarını araştırmaktır.",
  alt: "Dört satırlı tablo. Beden: bedene ve örtüsüne ilişkin. Bilgi: kişisel kayıtlar. Mekân: özel yaşam alanı. Dijital: çevrim içi veriler. Telefonu izinsiz incelemek dijital ve bilgi alanını, odaya izinsiz girip belge okumak mekân ve bilgi alanını ihlal edebilir.",
  cols: [
    { name: "Alan", w: 2.4 },
    { name: "Kapsam", w: 3.4 },
    { name: "Bölümdeki örnek", w: 4.2 },
  ],
  rows: [
    { cells: ["Beden", "beden ve örtüsü", "bedene ilişkin özel alan"], tones: [undefined, "b", "muted"], detail: ["Merak tek başına özel alana girme yetkisi vermez."] },
    { cells: ["Bilgi", "kişisel kayıtlar", "özel belge, telefon içeriği"], tones: [undefined, "b", "muted"], detail: ["Bilgi alanı başka alanlarla birlikte ihlal edilebilir."] },
    { cells: ["Mekân", "özel yaşam alanı", "odaya izinsiz girmek"], tones: [undefined, "c", "muted"], detail: ["Odaya izinsiz girip belge okumak mekân ve bilgi alanını birlikte ihlal edebilir."] },
    { cells: ["Dijital", "çevrim içi veriler", "telefonu izinsiz incelemek"], tones: [undefined, "c", "muted"], detail: ["Telefonu izinsiz incelemek dijital ve bilgi alanını birlikte ihlal edebilir."] },
  ],
  foot: "Zararı yetkili birime gerektiği ölçüde bildirmek, eğlence için gizli bilgi yaymakla aynı değildir.",
});

// 19 · Zan ve haber.
const suspicion = tableFig({
  caption:
    "Sorunun verdiği fiile bak: bilinen yanlış söz, asılsız kusur yükleme, kanıtsız kötü kanaat ya da iyi niyetli değerlendirme. Bir kavrama tıkla. Hüsnüzan gözlenen tehlikeyi yok saymak değildir.",
  alt: "Dört satırlı tablo. Yalan: yanlış olduğu bilinen söz. İftira: kişiye asılsız kusur yükleme. Suizan: yeterli kanıt olmadan kötü kanaat. Hüsnüzan: iyi niyetli değerlendirme.",
  cols: [
    { name: "Kavram", w: 2.8 },
    { name: "Ayırıcı fiil", w: 7.2 },
  ],
  rows: [
    { cells: ["Yalan", "yanlış olduğu bilinen söz"], tones: [undefined, "warn"], detail: ["Yanlış olduğu bilinen söz yalanla ilişkilidir."] },
    { cells: ["İftira", "bir kişiye asılsız kusur yükleme"], tones: [undefined, "warn"], detail: ["Yalan bir isnadı sırf kişi yok diye gıybet başlığında bırakmak doğruluk sorununu gizler."] },
    { cells: ["Suizan", "yeterli kanıt olmadan kötü kanaate yönelme"], tones: [undefined, "c"], detail: ["Cevap vermeyen arkadaşı hemen kasıtlı saymak bilinmeyen nedeni kötü niyetle doldurmaktır."] },
    { cells: ["Hüsnüzan", "iyi niyetli değerlendirme"], tones: [undefined, "a"], detail: ["Hüsnüzan her iddiayı doğru kabul etmek değildir; kaynak araştırılır."] },
  ],
  foot: "Kanıt ile yorumu ayır; doğrulanmamış suçlamayı yayma.",
});

// 20 · İsraf, tasarruf, cimrilik.
const thrift = tableFig({
  caption:
    "Miktar yerine önce amaç ve ihtiyaç koşulunu yaz. Bir kavrama tıkla: bölümdeki lamba örneği açılır. Bir harcamanın az olması tek başına iyi olduğunun kanıtı değildir.",
  alt: "Üç satırlı tablo. İsraf: gereksiz savurganlık. Tasarruf: kaynağı amacına uygun ve ölçülü kullanma; gereksiz yanan lambayı kapatmak. Cimrilik: gereken uygun harcamadan kaçınma; güvenli çalışma için gereken ışığı kapatmak ihtiyacı ihmal edebilir.",
  cols: [
    { name: "Kavram", w: 2.8 },
    { name: "Tanım", w: 3.6 },
    { name: "Lamba örneği", w: 3.6 },
  ],
  rows: [
    { cells: ["İsraf", "gereksiz savurganlık", "gereksiz yanan lamba"], tones: [undefined, "warn", "muted"], detail: ["Fazlalık sürdürülür."] },
    { cells: ["Tasarruf", "amacına uygun, ölçülü kullanım", "gereksiz lambayı kapatmak"], tones: [undefined, "a", "muted"], detail: ["Fazlalık azaltılır, ihtiyaç karşılanır."] },
    { cells: ["Cimrilik", "gereken harcamadan kaçınma", "gereken ışığı da kapatmak"], tones: [undefined, "c", "muted"], detail: ["İhtiyaç ihmal edilebilir."] },
  ],
  foot: "İhtiyacın karşılanıp karşılanmadığına bak.",
});

// 23 · Beş adımda vaka.
const caseSteps = flowFig({
  caption:
    "Bir ahlak vakasını beş adımda çöz. İleri ile adımları aç. Bu sırada yeni kişi ya da sonuç ekleme; model keşfi öğrenme puanı üretmez.",
  alt: "Beş kart alt alta: kişileri ve somut fiilleri belirle; sorunun istediği değer, koşul ya da çıkarımı yaz; niyet verilmiş mi kontrol et; en yakın kavramla farkı kur; seçeneği metindeki kanıtla eşleştir.",
  nodes: [
    { head: "Fiiller", text: "kişileri ve somut fiilleri belirle", tone: "b", note: "Metinde olmayan kişi ya da sonuç ekleme." },
    { head: "İstenen", text: "değer, koşul ya da çıkarım", tone: "b", note: "Olumsuz kökte ölçüte uyanları bulup dışarıda kalanı gerekçelendir." },
    { head: "Niyet", text: "niyet verilmiş mi?", tone: "c", note: "Yalnız davranış verildiyse niyeti zihninden tamamlama." },
    { head: "Yakın kavram", text: "en yakın kavramla farkı kur", tone: "c", note: "Örneğin gıpta ile haseti ayıran şey başkasının iyiliğine yönelen istektir." },
    { head: "Eşleştir", text: "seçeneği metindeki kanıtla eşleştir", tone: "a", note: "Kesinlik isteniyorsa başka açıklamayı metnin engelleyip engellemediğine bak." },
  ],
  steps: ["Fiiller", "İstenen", "Niyet", "Yakın kavram", "Eşleştir"],
  reveal: true,
  foot: "İlk çözümü kapatıp yeni bir örnekle dene.",
});

export const religionFigures062Rulings: Record<string, Record<string, FigureDef>> = {
  "guncel-dini-meseleler": {
    "İcma ve kapsamı": ijma,
    "Kıyas ve etkili ortak neden": qiyas,
    "Zarûrât-ı diniyye ve beş temel değer": five,
    "Yarar, zarar ve hak dengesi": balance,
    "Hüküm terimlerini ayırmak": terms,
    "En’âm 151’in mesajları": anam151,
    "En’âm 152’nin mesajları": anam152,
  },
  "ahlaki-tutum-ve-davranislar": {
    "İlke, tutum ve davranış": levels,
    "Terbiye, nefis eğitimi ve irade yönetimi": will,
    "İslam ahlakında temel erdemler": virtues,
    "Adalet ve eşitlik arasındaki bağ": fairness,
    "Mahremiyet alanları ve tecessüs": privacy,
    "Suizan, hüsnüzan ve haberin doğrulanması": suspicion,
    "İsraf, tasarruf ve cimrilik": thrift,
    "Bir vakayı beş adımda çöz": caseSteps,
  },
};
