import { seg, txt, v, type El, type FigureDef } from "./figureKit";
import { flowFig, quadFig, rect, tableFig } from "./turkishFigures060Kit";
import { drawFig } from "./biologyFigures062Kit";

/*
 * Forge062 TYT Din Kültürü · Gençlik ve değerler; din ve hayat. Kavramlar,
 * ayet göndermeleri, eser ve sanatçı adları yalnız bölüm metninden alınır.
 * Tablolar kaynağın öğretim çerçevesini temsil eder; kişiye hüküm, not ya
 * da sağlık önerisi vermez. Yazma sayfası çizimi öğretim şemasıdır, tarihî
 * bir eserin kopyası değildir; ölçekli değildir.
 */

/* ---------------- Gençlik ve değerler ---------------- */

// 1 · Maddi ve manevi yön birlikte.
const twoSides = tableFig({
  caption:
    "Maddi ve manevi yön birbirini dışlayan kutular değildir; aynı nesne ikisini birlikte taşıyabilir. Bir örneğe tıkla. Önce sorunun hangi yönü istediğini belirle.",
  alt: "İki satırlı tablo. Cami: maddi yön taş ve mekân; manevi yön ibadet ve tarih hafızası. Tarihî el yazması: maddi yön fiziksel nesne; manevi yön dil ve bilgi birikiminin taşıyıcısı.",
  cols: [
    { name: "Örnek", w: 2.8 },
    { name: "Maddi yön", w: 3.2 },
    { name: "Manevi yön", w: 4.0 },
  ],
  rows: [
    { cells: ["Cami", "taş ve mekân", "ibadet ve tarih hafızası"], tones: [undefined, "c", "b"], detail: ["Maddi değerler somut eser, yapı ya da nesneyle; manevi değerler inanç, dil, hatıra, gelenek ve ahlaki anlamla ilişkilendirilir."] },
    { cells: ["El yazması", "fiziksel nesne", "dil ve bilgi birikiminin taşıyıcısı"], tones: [undefined, "c", "b"], detail: ["Nesnenin maddi oluşundan hiçbir manevi anlam taşıyamayacağı sonucu çıkmaz."] },
  ],
  foot: "Bir köprünün fiyatıyla ortak hafızadaki yeri aynı ölçüm değildir.",
});

// 5 · Geleneği ölçütle değerlendir.
const tradition = flowFig({
  caption:
    "Bir davranışın eski ya da yaygın olması ahlaki gerekçesinin ölçüsü değildir. İleri ile bölümdeki değerlendirme sorularını aç. Çoğunluğun yaptığı her şey doğrudur ya da eski olan her şey yanlıştır genellemelerini sınırla.",
  alt: "Dört kart alt alta: davranışı somutlaştır; kimin hangi hakkını etkiliyor; hangi amaca hizmet ediyor; dinin temel ilkeleriyle bağdaşıyor mu.",
  nodes: [
    { head: "Somutlaştır", text: "geleneksel olduğu bildirilen davranış ne?", tone: "muted", note: "Yaygınlık ile ahlaki gerekçe farklı verilerdir." },
    { head: "Hak", text: "kimin hangi hakkını etkiliyor?", tone: "b", note: "Haksızlık ve zarar üreten uygulamalar sırf gelenek olduğu için benimsenmez." },
    { head: "Amaç", text: "hangi amaca hizmet ediyor?", tone: "c", note: "Saygı, dayanışma ve ziyaretle ilgili gelenekler desteklenebilir." },
    { head: "İlke", text: "temel ilkelerle bağdaşıyor mu?", tone: "a", note: "Bir davranışın eski olması dinen zorunlu olduğunun tek başına kanıtı değildir." },
  ],
  steps: ["Somutlaştır", "Hak", "Amaç", "İlke"],
  reveal: true,
  foot: "Yaşını ölçmek bağdaşma sorusunu yanıtlamaz.",
});

// 6 · Kişilik, mizaç, karakter.
const personality = tableFig({
  caption:
    "Kişilik geniş bütündür; mizaç ve karakter onun farklı yönlerini adlandırır. Bir kavrama tıkla. Sessizliği güvenilmezlikle, konuşkanlığı dürüstlükle otomatik eşleştirme.",
  alt: "Üç satırlı tablo. Kişilik: duygu, düşünce, inanç, tutum, değer, mizaç ve davranış özelliklerinin bütünü. Mizaç: duygu ve davranış eğilimleri; sessiz ya da konuşkan olmak. Karakter: benimsenen ahlaki yönelim ve alışkanlıklar; verilen sözü tutmak.",
  cols: [
    { name: "Kavram", w: 2.6 },
    { name: "Kapsam", w: 4.2 },
    { name: "Bölümdeki örnek", w: 3.2 },
  ],
  rows: [
    { cells: ["Kişilik", "duygu, düşünce, inanç, tutum, değer, mizaç, davranış", "geniş bütün"], tones: [undefined, "muted", "muted"], detail: ["Bir olay kişinin bütün kişilik yapısına ilişkin tanı vermeye yetmez."] },
    { cells: ["Mizaç", "duygu ve davranış eğilimleri", "sessiz ya da konuşkan"], tones: [undefined, "b", "b"], detail: ["Sessiz ya da konuşkan olmak bir iletişim eğilimini anlatabilir."] },
    { cells: ["Karakter", "ahlaki yönelim ve alışkanlıklar", "verilen sözü tutmak"], tones: [undefined, "a", "a"], detail: ["Verilen sözü tutmak ahlaki davranışa ilişkin kanıt sağlar."] },
  ],
  foot: "İki kavram kişiliğin aynı yönünü adlandırmaz.",
});

// 7 · İki koşulu ayrı değiştir.
const twoAxes = quadFig({
  caption:
    "Bölümdeki model: konuşma biçimi ve göreve ilişkin davranış bağımsız seçilir. Bir hücreye tıkla. Konuşma biçimi değişince görev kanıtı aynı kalır; görev davranışı değişince sorumluluk yorumu değişir.",
  alt: "İki çarpı iki tablo. Sütunlar sessiz ve konuşkan konuşma biçimi; satırlar görevi yaptı ve görevi yapmadı. Sorumluluk yorumu yalnız satırla değişir.",
  cols: ["Sessiz", "Konuşkan"],
  rows: ["Görevi yaptı", "Görevi yapmadı"],
  axis: ["Konuşma biçimi (mizaç)", "Görev davranışı satırı sorumluluk yorumunu belirler"],
  cells: [
    { head: "Sessiz, yaptı", text: "görevi yerine getirdi", tone: "a", detail: ["Sessizlik güvenilmezlik kanıtı değildir; görev yerine getirilmiştir."] },
    { head: "Konuşkan, yaptı", text: "görevi yerine getirdi", tone: "a", detail: ["Konuşma biçimi değişti, görev kanıtı aynı kaldı."] },
    { head: "Sessiz, yapmadı", text: "o olayda sorumluluk yorumu değişir", tone: "warn", detail: ["Yorum yalnız o olay hakkındadır; ömür boyu karakter tanısı çıkmaz."] },
    { head: "Konuşkan, yapmadı", text: "o olayda sorumluluk yorumu değişir", tone: "warn", detail: ["Konuşkanlık dürüstlük ya da görev kanıtı değildir."] },
  ],
  foot: "Bu, mizaç ve karakterin gerçek hayatta hiç ilişkisi olmadığı iddiası değildir.",
});

// 14 · İsrâ 23–29.
const isra = tableFig({
  caption:
    "MEB öğretiminde İsrâ 23–29 ayetleri birbirine bağlı sorumluluklarla incelenir. Bir sorumluluğa tıkla. Bütün mesajı tek bir sözcüğe indirgeme.",
  alt: "Dört satırlı tablo: yalnız Allah’a kulluk; anne babaya iyi davranma, sözün yumuşak olması; yakınları ve ihtiyaç sahiplerini gözetme, yardımın onuru gözetmesi; israf ve cimrilikten kaçınma, harcamada denge.",
  cols: [
    { name: "Sorumluluk", w: 4.6 },
    { name: "Vurgu", w: 5.4 },
  ],
  rows: [
    { cells: ["Yalnız Allah’a kulluk", "inanç"], tones: [undefined, "b"], detail: ["İnanç, aile ilişkileri ve kaynak kullanımı aynı sorumluluk çerçevesinde ele alınır."] },
    { cells: ["Anne babaya iyi davranma", "sözün yumuşak olması"], tones: [undefined, "c"], detail: ["Sözün yumuşaklığı ayrı bir vurgudur."] },
    { cells: ["Yakınları ve ihtiyaç sahiplerini gözetme", "yardımın onuru gözetmesi"], tones: [undefined, "c"], detail: ["Yardım ile onur birlikte gözetilir."] },
    { cells: ["İsraf ve cimrilikten kaçınma", "harcamada denge"], tones: [undefined, "a"], detail: ["Bu bağlantılar belirli bir kişi için ayrıntılı hüküm üretme yetkisi değildir."] },
  ],
  foot: "Farklı ama ilişkili vurguları ayrı ayrı göster.",
});

/* ---------------- Din ve hayat ---------------- */

// 3 · Sanat alanları.
const arts = tableFig({
  caption:
    "Bölümdeki sanat alanlarını amaç ve malzemeyle ayır. Bir alana tıkla. Aynı eserde birden çok sanat birlikte yer alabilir.",
  alt: "Yedi satırlı tablo. Mimari: mekân ve yapı. Edebiyat: dil ve anlatım. Musiki: ses ve ezgi. Hat: güzel yazı, hattat. Tezhip: süsleme, müzehhip. Ebru: su yüzeyindeki desenin kâğıda aktarımı. Minyatür: küçük ve ayrıntılı tasvir, nakkaş.",
  cols: [
    { name: "Sanat", w: 2.6 },
    { name: "Amaç ve malzeme", w: 4.8 },
    { name: "Sanatçı", w: 2.6 },
  ],
  rows: [
    { cells: ["Mimari", "mekân ve yapı", "Mimar Sinan"], tones: [undefined, "b", "muted"], detail: ["Külliye birden çok işlevi aynı çevrede birleştirebilir."] },
    { cells: ["Edebiyat", "dil ve anlatım", "Yunus Emre, Fuzuli"], tones: [undefined, "b", "muted"], detail: ["Yazar, eser, dil ve tür farklı ilişkilerdir."] },
    { cells: ["Musiki", "ses ve ezgi", "Itri, Dede Efendi"], tones: [undefined, "b", "muted"], detail: ["Tarihî kullanım ile güncel klinik etkililik farklı kanıtlar gerektirir."] },
    { cells: ["Hat", "Arap harfleriyle güzel yazı", "hattat"], tones: [undefined, "c", "muted"], detail: ["Harfin biçimi, çizginin dengesi ve yazının düzeni önemlidir."] },
    { cells: ["Tezhip", "kitap ve yazı çevresinde bezeme", "müzehhip"], tones: [undefined, "c", "muted"], detail: ["Her sarı renk tek başına tezhip kanıtı değildir."] },
    { cells: ["Ebru", "su yüzeyindeki desenin kâğıda aktarımı", "Necmeddin Okyay"], tones: [undefined, "a", "muted"], detail: ["Hatip Mehmet Efendi, Necmeddin Okyay ve Mustafa Düzgünman önemli isimler arasında anılır."] },
    { cells: ["Minyatür", "küçük, ayrıntılı, renkli tasvir", "nakkaş"], tones: [undefined, "a", "muted"], detail: ["Çalışma yeri için nakkaşhane terimi kullanılabilir."] },
  ],
  foot: "Sorunun eser bütünü mü, belirli bölümdeki teknik mi istediğini belirle.",
});

// 5 · Edebiyat eserleri.
const literature = tableFig({
  caption:
    "Bölümdeki yazar ve eser eşleştirmeleri. Bir yazara tıkla. Bütün eserlerin aynı dilde, biçimde ya da yüzyılda yazıldığını varsayma.",
  alt: "Yedi satırlı tablo. Yusuf Has Hacib: Kutadgu Bilig. Edib Ahmed: Atabetü’l-Hakayık. Ahmed Yesevi: Divan-ı Hikmet. Mevlana: Mesnevi. Yunus Emre: şiirler. Fuzuli: Su Kasidesi. Mehmet Akif: Safahat.",
  cols: [
    { name: "Yazar", w: 4.2 },
    { name: "Eser", w: 5.8 },
  ],
  rows: [
    { cells: ["Yusuf Has Hacib", "Kutadgu Bilig"], tones: [undefined, "b"], detail: ["Dinî-ahlaki düşüncenin Türkçe eserlerle aktarımında anılır."] },
    { cells: ["Edib Ahmed", "Atabetü’l-Hakayık"], tones: [undefined, "b"], detail: ["Dinî-ahlaki düşüncenin Türkçe eserlerle aktarımında anılır."] },
    { cells: ["Ahmed Yesevi", "Divan-ı Hikmet"], tones: [undefined, "b"], detail: ["Dinî-ahlaki düşüncenin Türkçe eserlerle aktarımında anılır."] },
    { cells: ["Mevlana", "Mesnevi"], tones: [undefined, "c"], detail: ["Farklı edebî bağlamlarda yer alır."] },
    { cells: ["Yunus Emre", "şiirler"], tones: [undefined, "c"], detail: ["Farklı edebî bağlamlarda yer alır."] },
    { cells: ["Fuzuli", "Su Kasidesi"], tones: [undefined, "c"], detail: ["Farklı edebî bağlamlarda yer alır."] },
    { cells: ["Mehmet Akif", "Safahat"], tones: [undefined, "a"], detail: ["Yakın dönem örneğidir."] },
  ],
  foot: "Sorunun verdiği eşleştirmeyi koruyarak düşün.",
});

// 10 · Yazma sayfasında hat, tezhip, minyatür.
type Part = { name: string; what: string };
const PAGE: Part[] = [
  { name: "tezhip", what: "Kenardaki bezeme tezhiptir; sanatçısı müzehhiptir. Süslü kenar ile harfin kendisi farklı görsel öğelerdir." },
  { name: "hat", what: "Anlam taşıyan harflerin estetik düzeni hattır; sanatçısı hattattır." },
  { name: "minyatür", what: "Olay resmi gibi küçük, ayrıntılı ve renkli tasvir minyatürdür; sanatçısı nakkaştır." },
];
const page = drawFig({
  caption:
    "Bir yazma kitapta yazı, kenar süsü ve olay resmi bulunabilir: hat, tezhip ve minyatür aynı eserde farklı görevlerle yer alır. Bir bölüme tıkla. Öğretim şeması; tarihî bir eserin kopyası değil, ölçekli değil.",
  alt: "Dikdörtgen kitap sayfası: kenarda kesik çizgili bezeme bandı, üst yarıda yatay yazı satırları, alt yarıda dikdörtgen resim alanı. Sağda bölüm adları: tezhip, hat, minyatür.",
  h: 4.2,
  picks: PAGE.map((p) => ({ label: p.name, title: `Yazma sayfasında ${p.name}`, detail: [p.what] })),
  draw: (_v, _s, pick) => {
    const els: El[] = [];
    const on = (n: string) => pick >= 0 && PAGE[pick].name === n;
    els.push(rect(1.0, -0.2, 6.0, -4.0, "muted", false));
    els.push(rect(1.25, -0.45, 5.75, -3.75, on("tezhip") ? "a" : "c", false, true));
    for (const y of [-0.9, -1.25, -1.6, -1.95]) els.push(seg(v(1.8, y), v(5.2, y), { tone: on("hat") ? "a" : "ink", bold: on("hat") }));
    els.push(rect(2.2, -2.35, 4.8, -3.4, on("minyatür") ? "a" : "b", true));
    els.push(seg(v(5.75, -0.6), v(6.6, -0.6), { tone: "muted", thin: true }), seg(v(5.2, -1.4), v(6.6, -1.4), { tone: "muted", thin: true }), seg(v(4.8, -2.9), v(6.6, -2.9), { tone: "muted", thin: true }));
    const label = (y: number, i: number) => els.push(txt(v(6.6, y), PAGE[i].name, "e", { small: true, bold: true, tone: pick === i ? "a" : "ink", pick: i }));
    label(-0.6, 0);
    label(-1.4, 1);
    label(-2.9, 2);
    return { els, readout: [pick >= 0 ? PAGE[pick].what : "Bir bölümün adına tıkla ya da aşağıdan seç.", "Eserin kitap olması bu farklı teknikleri özdeşleştirmez."] };
  },
});

// 17 · İktisat, israf, cimrilik.
const moderation = tableFig({
  caption:
    "İktisat bu bağlamda israf ile cimrilik arasında ölçülü harcamadır. Bir kavrama tıkla: bölümdeki okul ve kurum örneği açılır. En az harcamayı seçmek her durumda doğru ölçüt değildir.",
  alt: "Üç satırlı tablo. İsraf: ihtiyacı aşan gereksiz tüketim. İktisat: ölçülü harcama; okulun gerekli temizliği sürdürürken gereksiz su kaybını azaltması. Cimrilik: uygun ve gerekli harcamayı esirgemek; güvenlik için zorunlu malzemeyi almamak.",
  cols: [
    { name: "Kavram", w: 2.6 },
    { name: "Tanım", w: 3.6 },
    { name: "Bölümdeki örnek", w: 3.8 },
  ],
  rows: [
    { cells: ["İsraf", "ihtiyacı aşan gereksiz tüketim", "gereksiz su kaybı"], tones: [undefined, "warn", "muted"], detail: ["İsraf ihtiyacı aşan tüketimdir."] },
    { cells: ["İktisat", "ölçülü harcama", "kayıp azalır, gerekli temizlik sürer"], tones: [undefined, "a", "muted"], detail: ["İhtiyaç, amaç ve hak koşulları miktarla birlikte değerlendirilir."] },
    { cells: ["Cimrilik", "gerekli harcamayı esirgemek", "zorunlu güvenlik malzemesini almamak"], tones: [undefined, "c", "muted"], detail: ["Daha az para harcandı diye olumlu tasarruf sayılmaz."] },
  ],
  foot: "Miktarı ihtiyaç ve amaçla birlikte oku.",
});

// 18 · Zekât, sadaka, infak.
const giving = tableFig({
  caption:
    "Üç kavram paylaşma ve dayanışmayla ilişkilidir ama kapsamları farklıdır. Bir kavrama tıkla. Bir metin yalnız bağış davranışını veriyorsa zekât şartlarının gerçekleştiğini zihninden ekleme.",
  alt: "Üç satırlı tablo. Zekât: belirli şartları ve ölçüleri bulunan ibadet. Sadaka: daha geniş maddi ve manevi yardım çerçevesi. İnfak: imkânlarını uygun yolda harcama.",
  cols: [
    { name: "Kavram", w: 2.6 },
    { name: "Bölümdeki tanım", w: 7.4 },
  ],
  rows: [
    { cells: ["Zekât", "belirli şartları ve ölçüleri bulunan ibadet"], tones: [undefined, "a"], detail: ["Her yardımın aynı oran ve zamanda zorunlu olduğunu varsayma."] },
    { cells: ["Sadaka", "daha geniş maddi ve manevi yardım çerçevesi"], tones: [undefined, "b"], detail: ["Sadaka maddi ve manevi yardımı kapsar."] },
    { cells: ["İnfak", "imkânlarını uygun yolda harcama"], tones: [undefined, "c"], detail: ["Toplumsal dayanışma ile belirli ibadetin teknik koşulları farklı soru düzeyleridir."] },
  ],
  foot: "Gönüllü yardım ile teknik ibadet koşulunu ayır.",
});

// 24 · Birleşik soruda alanlar.
const combined = tableFig({
  caption:
    "Bölümdeki birleşik örnekte her fiil farklı bir alanı temsil eder. Bir fiile tıkla. Seçenek bütün verileri açıklıyor mu, birini dışarıda mı bırakıyor diye kontrol et.",
  alt: "Üç satırlı tablo. Çeşmenin korunması: kültürel miras. Su kaybının azaltılması: çevre. Farklı kişilerin erişiminin sağlanması: hak.",
  cols: [
    { name: "Fiil", w: 5.6 },
    { name: "Alan", w: 4.4 },
  ],
  rows: [
    { cells: ["Çeşmenin korunması", "kültürel miras"], tones: [undefined, "b"], detail: ["Tarihî çeşme hem miras hem ortak kullanım sorumluluğuyla bağlantılıdır."] },
    { cells: ["Su kaybının azaltılması", "çevre"], tones: [undefined, "c"], detail: ["Kaybı azaltmakla gerekli temizliği bırakmak farklıdır."] },
    { cells: ["Farklı kişilerin erişimi", "hak"], tones: [undefined, "a"], detail: ["Yalnız tek alanı söylemek örneğin kalan verilerini açıklamaz."] },
  ],
  foot: "Önce her fiile kavram bağla, sonra ortak üst ilişkiyi kur.",
});

export const religionFigures062Values: Record<string, Record<string, FigureDef>> = {
  "genclik-ve-degerler": {
    "Maddi ve manevi yön birlikte": twoSides,
    "Gelenekleri ölçütle değerlendir": tradition,
    "Kişilik, mizaç ve karakter": personality,
    "Modelde iki koşulu ayrı değiştir": twoAxes,
    "İsrâ 23–29: sorumlulukları ilişkilendir": isra,
  },
  "din-ve-hayat": {
    "Sanat alanlarını amaç ve malzemeyle ayır": arts,
    "Edebiyat: düşüncenin dilde izi": literature,
    "Minyatür ve nakkaş": page,
    "İktisat, israf ve cimrilik": moderation,
    "Zekât, sadaka ve infak": giving,
    "Birleşik soruda alanları eşleştir": combined,
  },
};
