import { fmt, poly, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";
import { axis, BAR_R, barRow, LABEL_W, notes } from "./geographyFigures061Kit";
import { CW, fitH, flowFig, frame, quadFig, rect, tableFig } from "./turkishFigures060Kit";

/*
 * Forge061 TYT Coğrafya · Afetler, bölge türleri, çevre ve toplum, dünya
 * yerleşmeleri. Sayılar yalnız bölüm metnindeki özgün deneylerden alınır;
 * kesit ve yerleşme planları şematiktir (ölçekli değil), gerçek bir yerin
 * koordinatını iddia etmez. Sürgü ve adımlar öğrenme kaydı üretmez.
 */

// afetler-risk · 1 · Tehlike, maruziyet, kırılganlık, kapasite.
const risk = tableFig({
  caption:
    "Riski değerlendirirken dört ayrı bileşeni ayır. Bir bileşene tıkla: bölümdeki tanımı ve hangi önlemin onu değiştirdiği açılır. Bölüm kesin hasar olasılığı üreten tek bir çarpım formülü vermez.",
  alt: "Dört satırlı tablo. Tehlike: zarar doğurma potansiyeli. Maruziyet: insan ve değerlerin tehlikenin etkileyebileceği yerde bulunması; güvenli alana taşınma değiştirir. Kırılganlık: zarara karşı duyarlılık; yapı iyileştirme değiştirir. Kapasite: bilgi, örgütlenme, altyapı ve kaynaklarla baş etme olanağı.",
  cols: [
    { name: "Bileşen", w: 2.8 },
    { name: "Tanım", w: 4.0 },
    { name: "Onu değiştiren örnek", w: 3.2 },
  ],
  rows: [
    { cells: ["Tehlike", "zarar doğurma potansiyeli", "tehlike haritası ile tanınır"], tones: [undefined, "warn", "muted"], detail: ["Deprem, yağış, püskürme veya fırtına birer fiziksel olaydır; afet toplumun işleyişinde ciddi kayıp ve kesinti yaratan durumdur."] },
    { cells: ["Maruziyet", "insan ve değerlerin etki alanında bulunması", "güvenli alana taşınma"], tones: [undefined, "b", "muted"], detail: ["Suya maruz yerden güvenli alana taşınmak maruziyeti değiştirebilir."] },
    { cells: ["Kırılganlık", "etkinin zarar doğurmasına duyarlılık", "yapıyı daha dayanıklı yapma"], tones: [undefined, "c", "muted"], detail: ["Aynı taşkın alanındaki iki yapı aynı sayıda maruz ev sayılır ama dayanımları farklı olabilir; yapı iyileştirme suya ulaşan ev sayısını azaltmaz."] },
    { cells: ["Kapasite", "bilgi, örgütlenme, altyapı, kaynakla baş etme", "tatbikat, görev dağılımı, uyarı"], tones: [undefined, "a", "muted"], detail: ["Yoksulluk, erişim ve bakım olanakları önlemi uygulama gücünü etkileyebilir."] },
  ],
  foot: "İki işlem aynı değişkeni değiştirmez: taşınma maruziyete, güçlendirme kırılganlığa yönelir.",
});

// afetler-risk · 2 · Orman yangınında üçlü koşul.
const fire = tableFig({
  caption:
    "Orman yangını için üç koşul birlikte ele alınır. Bir koşula tıkla: bölümdeki örnek açılır. Sıcak hava tek başına her ormanda kendiliğinden kesin yangın demek değildir.",
  alt: "Üç satırlı tablo. Yanabilir örtü: yakıt. Tutuşma kaynağı: yıldırım veya insan etkinliği. Yayılma koşulu: kuruluk ve rüzgâr.",
  cols: [
    { name: "Koşul", w: 3.4 },
    { name: "Bölümdeki örnek", w: 6.6 },
  ],
  rows: [
    { cells: ["Yanabilir örtü", "yakıt; Akdeniz çevresinin kuru yaz koşulları önemli bağlam"], tones: [undefined, "c"], detail: ["Yakıtın ve tutuşmanın koşulu önemlidir; uygun arazi yönetimi etkili olabilir."] },
    { cells: ["Tutuşma kaynağı", "yıldırım veya insan etkinliği"], tones: [undefined, "warn"], detail: ["Tarihi ve örneklemi verilmeyen insan kaynaklı yangın yüzdeleri bütün ülke ve yıllara taşınmaz."] },
    { cells: ["Yayılma koşulu", "kuruluk ve rüzgâr"], tones: [undefined, "b"], detail: ["Gözetim ve erken müdahale yayılımı sınırlayabilir."] },
  ],
  foot: "Yangın sonrası toprağın korunması, su ve habitatın iyileşmesi de uzun sürecin parçasıdır.",
});

// afetler-risk · 3 · Afet yönetimi döngüsü.
const cycle = flowFig({
  caption:
    "Afet yönetimi bir kez ilerleyip biten çizgi değildir; öğrenilenler yeni zarar azaltma ve hazırlığa aktarılır. İleri ile aşamaları aç; her kartta olaydan önce mi sonra mı olduğu yazılı.",
  alt: "Beş kart alt alta: olaydan önce zarar azaltma; olaydan önce hazırlık ve erken uyarı; olay; olaydan hemen sonra müdahale; sonra iyileştirme, öğrenilenler yeniden zarar azaltmaya döner.",
  nodes: [
    { head: "Önce · zarar azaltma", text: "tehlike haritası, yer seçimi, yapı ve altyapı denetimi", tone: "c", note: "Planın kâğıtta bulunması yetmez; uygulanması ve denetlenmesi gerekir." },
    { head: "Önce · hazırlık ve erken uyarı", text: "tatbikat, görev dağılımı, iletişim planı, uyarı denemesi", tone: "c", note: "Algılama, mesajın ulaşması ve uygulanması ayrı aşamalardır; deprem uyarısı depremin gününü önceden bilmek değildir." },
    { head: "Olay", text: "fiziksel süreç; afete dönüşüp dönüşmemesi koşullara bağlı", tone: "warn", note: "Yerleşme, yapı durumu, altyapı, hazırlık ve müdahale kapasitesi sonucu etkiler." },
    { head: "Sonra · müdahale", text: "arama-kurtarma, acil sağlık, temel ihtiyaç, geçici barınma", tone: "a", note: "Müdahale olayın hemen ardından başlar; süreçler bazı dönemlerde örtüşebilir." },
    { head: "Sonra · iyileştirme", text: "altyapı, hizmet ve geçim düzeninin yeniden kurulması", tone: "b", note: "İyileştirme önceki kırılganlığı aynen geri getirmek yerine daha güvenli planlamayla bağlantılanabilir; öğrenilenler yeniden zarar azaltmaya döner." },
  ],
  steps: ["Zarar azaltma", "Hazırlık", "Olay", "Müdahale", "İyileştirme"],
  reveal: true,
  foot: "Aşama, olaydan önce veya sonra koşuluna göre gerekçeyle seçilir.",
});

// afetler-risk · 4 · Kesitte maruz ev sayısı (bölümdeki özgün deney).
const KX = (k: number) => 1.3 + k * 0.6;
const Y0 = -5.0;
const KY = (k: number) => Y0 + 0.3 * k;
const floodDraw = (level: number, moved: boolean) => {
  const els: El[] = [];
  const kots = Array.from({ length: 10 }, (_, i) => i + 1).map((k) => (moved && k <= 3 ? k + 11 : k));
  if (level > 0) els.push(poly([v(KX(0), KY(0)), v(KX(level), KY(level)), v(KX(0), KY(level))], { fill: "b", tone: "b", thin: true }));
  els.push(seg(v(KX(0), KY(0)), v(KX(14), KY(14)), { tone: "ink" }));
  els.push(seg(v(1.0, KY(0)), v(1.0, KY(14)), { tone: "muted", thin: true }));
  for (const t of [0, 5, 10, 14]) {
    els.push(seg(v(0.92, KY(t)), v(1.08, KY(t)), { tone: "muted", thin: true }));
    els.push(txt(v(0.85, KY(t)), String(t), "w", { small: true, tone: "muted" }));
  }
  els.push(txt(v(0, KY(14) + 0.55), "kot (m)", "e", { small: true, tone: "muted" }));
  if (level > 0) els.push(seg(v(KX(0), KY(level)), v(KX(level), KY(level)), { tone: "b", dash: true }));
  let n = 0;
  for (const k of kots) {
    const hit = level >= k;
    if (hit) n++;
    const x = KX(k);
    const y = KY(k);
    const tone: Tone = hit ? "warn" : "ink";
    els.push(rect(x - 0.17, y + 0.36, x + 0.17, y + 0.02, tone, hit));
    els.push(poly([v(x - 0.22, y + 0.36), v(x, y + 0.56), v(x + 0.22, y + 0.36)], { tone, thin: true, open: true }));
  }
  const ny = notes(els, Y0 - 0.5, [`Su ${fmt(level, 0)} m: maruz ev ${n} / 10. Dolu ev: kat kotuna su ulaşmış; boş ev: ulaşmamış.`, "Şematik kesit (ölçekli değil); evler 1–10 m kotlarda, taşınınca ilk üç ev 12, 13, 14 m’ye gider."]);
  return { els, h: -ny, n };
};
const floodH = floodDraw(14, true).h;
const flood: FigureDef = {
  caption:
    "Bölümdeki özgün deney: on evin kat kotları 1’den 10 metreye kadar; kat kotuna su ulaşınca ev maruz sayılır. Sürgüyle su seviyesini, adımlarla ilk üç evin 12, 13 ve 14 m kotlu yerlere taşınmasını dene. Önce sayısal kanıtı, sonra hangi bileşenin değiştiğini açıkla.",
  alt: "Eğimli arazi kesiti; solda kot ekseni 0–14 m. On ev 1’den 10 metreye kadar yamaca dizili; mavi su seviyesi yatay çizgiyle gösterilir. Su 6 m iken ilk altı ev maruz; ilk üç ev taşınınca aynı seviyede yalnız 4, 5 ve 6 m’deki evler maruz kalır.",
  maxHeight: fitH(floodH),
  param: { label: "Su seviyesi", min: 0, max: 14, step: 1, init: 6, unit: " m" },
  steps: ["Evler yerinde", "İlk üç ev taşındı"],
  draw: (level, step) => {
    const { els, n } = floodDraw(level, step === 1);
    els.push(...frame(floodH));
    return {
      els,
      readout: [
        `Su ${fmt(level, 0)} m, ${step === 1 ? "ilk üç ev taşınmış" : "evler yerinde"}: maruz ev sayısı ${n}.`,
        "Taşıma maruziyeti değiştirir, araziyi yükseltmez; yapı iyileştirme bu sayıyı değil kırılganlığı değiştirir. Model gerçek hasar ya da gelecekteki su düzeyi hesaplamaz.",
      ],
    };
  },
};

// bolge-turleri · 1 · Şekilsel ve işlevsel bölge.
const regionTypes = tableFig({
  caption:
    "Bölge bir soruya verilen cevaptır: ortak özellik mi, merkez ve akış mı? Bir türe tıkla: bölümdeki örnekler ve karıştırılan nokta açılır.",
  alt: "İki satırlı tablo. Şekilsel bölge: belirli özelliğin benzerliği veya ortak varlığı; dağlık alan, bozkır kuşağı, yoğun nüfuslu yerler, aynı ürünün yetiştiği alanlar. İşlevsel bölge: merkezin çevresiyle hizmet, yönetim, ulaşım veya mal akışı ilişkisi; hastanenin hizmet alanı, limanın hinterlantı.",
  cols: [
    { name: "Tür", w: 2.6 },
    { name: "Ölçüt", w: 3.5 },
    { name: "Bölümdeki örnek", w: 3.9 },
  ],
  rows: [
    { cells: ["Şekilsel", "özelliğin benzerliği veya ortak varlığı", "dağlık alan, bozkır kuşağı, buğday yetiştiren yerler"], tones: [undefined, "c", "muted"], detail: ["Benzerlik her özelliğin aynı olması demek değildir; buğday alanlarını ortak ürünle seçmek beşerî şekilsel sınıflamadır."] },
    { cells: ["İşlevsel", "merkez ile çevresi arasındaki akış ve bağlantı", "hastanenin hizmet alanı, limanın hinterlantı"], tones: [undefined, "b", "muted"], detail: ["Merkeze bağlı alanlarda aynı yağış, toprak veya nüfus yoğunluğu gerekmez; haritada en yakın görünen yer o merkeze bağlı olmak zorunda değildir."] },
  ],
  foot: "Buğday alanlarının hangi fabrikaya ürün gönderdiği incelenirse aynı yerlerden işlevsel bir ağ kurulabilir.",
});

// bolge-turleri · 2 · Örtüşme: iki ölçüt, dört grup.
const overlap = quadFig({
  caption:
    "İki ölçütü birlikte sayınca dört grup oluşur: kesişim, yalnız bir grupta kalanlar ve hiçbirine girmeyenler. Bir hücreye tıkla: bölümdeki örnek açılır. Örtüşme ölçütlerin aynı olduğunu göstermez.",
  alt: "2×2 tablo. Sütunlar: liman A’nın hizmet alanında, değil. Satırlar: Akdeniz iklim alanında, değil. Kesişim: bölümdeki kıyı ovası. Yalnız iklim grubunda: aynı iklimde olup başka limana bağlı ova.",
  cols: ["Liman A’ya bağlı", "Başka limana bağlı"],
  rows: ["Akdeniz iklimi", "Başka iklim"],
  axis: ["Hizmet (işlevsel) katmanı", "Satır: iklim (şekilsel) katmanı"],
  cells: [
    { head: "Kesişim", text: "kıyı ovası iki alanda", tone: "c", detail: ["Bir kıyı ovası aynı anda Akdeniz iklim alanı, tarım alanı ve bir limanın hizmet alanı içinde olabilir."] },
    { head: "Yalnız iklim", text: "aynı iklim, başka liman", tone: "b", detail: ["Başka bir ova aynı iklimi taşıdığı hâlde farklı limana bağlanabilir."] },
    { head: "Yalnız hizmet", text: "aynı liman, başka iklim", tone: "a", detail: ["Merkeze bağlı alanların hepsinde aynı iklim bulunması gerekmez."] },
    { head: "Hiçbiri", text: "iki gruba da girmez", tone: "muted", detail: ["İki gruba da girmeyenler ayrı sayılır."] },
  ],
  foot: "Doğal sınırlar geçiş kuşağı oluşturabilir; eşik, veri çözünürlüğü ve ölçek sınırı etkiler.",
});

// bolge-turleri · 3 · Neyi değiştirdin?
const changeKind = tableFig({
  caption:
    "Sınır değiştiğinde önce neyin değiştiğini söyle: veri mi, seçim kuralı mı, ilişki mi? Bir türe tıkla: bölümdeki örnek ve sonucu açılır.",
  alt: "Üç satırlı tablo. Seçim kuralı: yağış eşiği 600 mm’den 800 mm’ye çıkınca ölçülen yağış artmaz, seçilen hücreler azalabilir. İlişki: kurum 3. hücreyi A’dan B’ye bağlarsa hizmet katmanı değişir. Veri: akarsu yatağının yön değiştirmesi, heyelan, volkanik olay doğal özelliği değiştirebilir.",
  cols: [
    { name: "Değişen", w: 2.6 },
    { name: "Bölümdeki örnek", w: 4.2 },
    { name: "Sonuç", w: 3.2 },
  ],
  rows: [
    { cells: ["Seçim kuralı", "yağış eşiği 600 mm → 800 mm", "seçilen hücreler azalabilir; yağış artmaz"], tones: [undefined, "muted", "c"], detail: ["Eşik yükseltmek ölçümdeki yağışı değiştirmez, yalnız hangi hücrelerin seçildiğini değiştirir."] },
    { cells: ["İlişki", "kurum 3. hücreyi A’dan B’ye bağlar", "hizmet katmanı değişir"], tones: [undefined, "muted", "b"], detail: ["Beşerî sınırlar kurum kararı, yatırım, yeni yol veya göçle değişebilir."] },
    { cells: ["Veri", "akarsu yatağı, heyelan, volkanik olay", "doğal özellik kısa sürede değişebilir"], tones: [undefined, "muted", "a"], detail: ["Doğal her zaman yavaş, beşerî her zaman hızlı biçiminde mutlak bir yasa kurulmaz."] },
  ],
  foot: "Önce değişen şeyi adlandır, sonra sınırın etkisini karşılaştır.",
});

// cevre-toplum · 1 · Kaynak, taşınma yolu, alıcı.
const pathway = flowFig({
  caption:
    "Kirliliği anlamak için madde ya da enerjinin nereden çıktığını, nasıl taşındığını ve neye ulaştığını izle. İleri ile bölümdeki örneği ve her aşamadaki müdahale noktasını aç.",
  alt: "Üç kart alt alta: kaynak, tesisin atığı, kaynakta önleme; taşınma yolu, dere akışı, yayılmayı azaltma; alıcı, sucul canlılar, alıcıyı koruma.",
  nodes: [
    { head: "Kaynak · tesisin atığı", text: "müdahale: kaynakta önleme, verimli üretim", tone: "warn", note: "Verimli üretim atık oluşumunu azaltabilir; her kirlenme katı çöp biçiminde değildir, gürültü ve ışık da vardır." },
    { head: "Taşınma yolu · dere akışı", text: "müdahale: yayılmayı azaltma, arıtma", tone: "b", note: "Arıtma oluşmuş atığın bir bölümünü tutabilir; tutulan madde yok olmuş sayılmaz, güvenli yönetimi gerekir." },
    { head: "Alıcı · sucul canlılar", text: "müdahale: alıcıyı koruma", tone: "c", note: "Yalnız rengi açılan veya seyrelmiş görünen suyun zararsız olduğu çıkarılamaz." },
  ],
  steps: ["Kaynak", "Taşınma yolu", "Alıcı"],
  reveal: true,
  foot: "Kaynakta önleme, yayılmayı azaltma ve alıcıyı koruma farklı müdahale noktalarıdır.",
});

// cevre-toplum · 2 · Sera etkisi ve ozon seyrelmesi.
const greenOzone = tableFig({
  caption:
    "İki ayrı mekanizma: sera gazları uzun dalga ışınımla, stratosfer ozonu morötesi ışınımla ilişkilidir. Bir konuya tıkla: bölümdeki örnek ve karıştırılan nokta açılır.",
  alt: "Üç satırlı tablo. Sera etkisi: uzun dalga ışınımın bir bölümü soğurulup yeniden yayılır; CO₂, CH₄, N₂O; artış ek ısınma baskısı. Ozon seyrelmesi: stratosferde morötesinin tutulması azalır; klorlu bileşikler, CFC. Yerdeki ozon: hava kalitesi bağlamı.",
  cols: [
    { name: "Konu", w: 2.8 },
    { name: "Işınım ve yer", w: 3.6 },
    { name: "Bölümdeki örnek", w: 3.6 },
  ],
  rows: [
    { cells: ["Sera etkisi", "yerden yayılan uzun dalga ışınım", "CO₂, CH₄, N₂O"], tones: [undefined, "warn", "muted"], detail: ["Doğal sera etkisi yaşanabilir koşulların parçasıdır; insan etkinlikleriyle bazı gazların artması ek ısınma baskısı oluşturur. Metan CH₂ olarak yazılmaz."] },
    { cells: ["Ozon seyrelmesi", "stratosfer; zararlı morötesi ışınım", "klorlu bileşikler, CFC"], tones: [undefined, "b", "muted"], detail: ["Seyrelme daha fazla morötesi maruziyetle ilişkilidir; sera gazlarının etkisiyle aynı süreç değildir."] },
    { cells: ["Yerdeki ozon", "yere yakın hava", "hava kalitesi bağlamı"], tones: [undefined, "a", "muted"], detail: ["Aynı kimyasal adın atmosferdeki konumu değişince rolü farklılaşabilir."] },
  ],
  foot: "Ozon kaybı, kent hava kirliliği ve küresel ısınma tek nedene indirgenirse doğru çözüm açıklanamaz.",
});

// cevre-toplum · 3 · Yük ve derişim.
const loadX = (n: number) => LABEL_W + (n * (BAR_R - LABEL_W)) / 4;
const loadDraw = (k: number) => {
  const els: El[] = [];
  let y = 0;
  y = barRow(els, y, "Günlük yük", [{ len: 1, tone: "warn" }], loadX, "çıkan kütle sabit: 1 (mg/gün, göreli)");
  y = barRow(els, y, "Günlük akış", [{ len: k, tone: "b" }], loadX, `başlangıcın ${fmt(k)} katı (L/gün, göreli)`);
  y = barRow(els, y, "Derişim", [{ len: 1 / k, tone: "c" }], loadX, `yük ÷ akış = başlangıcın ${fmt(1 / k, 2)} katı (mg/L)`);
  y = axis(els, y + 0.2, [0, 1, 2, 3, 4], loadX, "kat");
  y = notes(els, y, ["Bölümdeki model: tam karışım, sabit günlük akış, tepkimesiz madde. Göreli birimler; gerçek tesis verisi değildir."]);
  return { els, h: -y };
};
const loadH = loadDraw(1).h;
const loadConc: FigureDef = {
  caption:
    "Yük bir zamanda taşınan kütledir (mg/gün), derişim kütlenin su hacmine oranıdır (mg/L). Sürgüyle akışı artır; çıkan kütle aynı kalırken derişim akışla ters orantılı düşer. Derişimin yarıya inmesi maddenin yarısının yok olduğu anlamına gelmez.",
  alt: "Üç yatay çubuk: günlük yük sabit 1; günlük akış sürgüyle 1 ile 4 kat arası; derişim akışın tersi, akış 2 kat olunca yarıya iner.",
  maxHeight: fitH(loadH),
  param: { label: "Akış katsayısı", min: 1, max: 4, step: 0.5, init: 2, unit: "×" },
  draw: (k) => {
    const { els } = loadDraw(k);
    els.push(...frame(loadH));
    return { els, readout: [`Akış ${fmt(k)} kat: derişim başlangıcın ${fmt(1 / k, 2)} katı; günlük yük değişmedi.`, "Örnek sonuç içilebilirlik ya da sağlık güveni diye yorumlanmaz."] };
  },
};

// cevre-toplum · 4 · Azaltma ve uyum.
const mitigation = tableFig({
  caption:
    "İklim değişikliğine iki ayrı yönden yaklaşılır: salımı azaltmak ya da değişen koşullara uyum sağlamak. Bir yöne tıkla: bölümdeki örnekler ve uyarı açılır. Bir proje iki amaca da katkı yapabilir.",
  alt: "İki satırlı tablo. Azaltma: sera gazı salımlarını azaltma, yutakları güçlendirme; enerji verimi, düşük salımlı ulaşım, habitat koruma. Uyum: zararları azaltma, dayanıklılığı artırma; sıcak dalgası planı, su tasarrufu, taşkına uygun yer seçimi.",
  cols: [
    { name: "Yön", w: 2.4 },
    { name: "Amaç", w: 3.6 },
    { name: "Bölümdeki örnek", w: 4.0 },
  ],
  rows: [
    { cells: ["Azaltma", "salımı azaltma, yutakları güçlendirme", "enerji verimi, düşük salımlı ulaşım, habitat koruma"], tones: [undefined, "c", "muted"], detail: ["Sayısal karbon ayak izi veriliyorsa kapsam, dönem ve eşdeğerlik birimi açıklanmalıdır."] },
    { cells: ["Uyum", "zararı azaltma, dayanıklılığı artırma", "sıcak dalgası planı, su tasarrufu, taşkına uygun yer seçimi"], tones: [undefined, "b", "muted"], detail: ["Yağmur suyu yönetimi tek başına bütün sera gazlarını sıfırlamaz; etki, hedef ve ölçüm ayrı yazılır."] },
  ],
  foot: "Önce hedefi yaz: salım mı azalıyor, zarar mı?",
});

// dunya-yerlesmeleri · Sekiz konut modeli (şematik, ölçekli değil).
const CX = CW / 2;
const house = (els: El[], x: number, y: number, tone: Tone) => {
  els.push(rect(x - 0.2, y + 0.18, x + 0.2, y - 0.18, tone, true));
  els.push(poly([v(x - 0.26, y + 0.18), v(x, y + 0.42), v(x + 0.26, y + 0.18)], { tone, thin: true, open: true }));
};
const PLAN_H = 4.2;
const planCenter = -2.0;
type Layout = { name: string; pts: [number, number][]; draw: (els: El[]) => void };
const ring = Array.from({ length: 8 }, (_, i) => {
  const a = (Math.PI * 2 * i) / 8 + Math.PI / 8;
  return [CX + 2.3 * Math.cos(a), planCenter + 1.5 * Math.sin(a)] as [number, number];
});
const LAYOUTS: Layout[] = [
  {
    name: "Çizgisel",
    pts: Array.from({ length: 8 }, (_, i) => [1.2 + i * 1.1, planCenter + 0.5] as [number, number]),
    draw: (els) => {
      els.push(seg(v(0.4, planCenter - 0.15), v(CW - 0.4, planCenter - 0.15), { tone: "muted" }));
      els.push(txt(v(CX, planCenter - 0.55), "yol, vadi ya da kıyı hattı", "c", { small: true, tone: "muted" }));
    },
  },
  {
    name: "Dairesel",
    pts: ring,
    draw: (els) => {
      els.push(txt(v(CX, planCenter), "merkez", "c", { small: true, tone: "muted" }));
    },
  },
  {
    name: "Işınsal",
    pts: [0, 1, 2, 3].flatMap((j) => {
      const a = (Math.PI * 2 * j) / 4 + Math.PI / 4;
      return [1.0, 1.75].map((r) => [CX + r * 1.55 * Math.cos(a), planCenter + r * Math.sin(a)] as [number, number]);
    }),
    draw: (els) => {
      for (let j = 0; j < 4; j++) {
        const a = (Math.PI * 2 * j) / 4 + Math.PI / 4;
        els.push(seg(v(CX, planCenter), v(CX + 3.1 * Math.cos(a), planCenter + 2.0 * Math.sin(a)), { tone: "muted", thin: true }));
      }
    },
  },
  {
    name: "Küme",
    pts: [
      [2.2, planCenter + 0.8], [3.0, planCenter + 0.3], [2.4, planCenter - 0.5], [3.3, planCenter - 0.9],
      [6.6, planCenter + 0.9], [7.5, planCenter + 0.4], [6.9, planCenter - 0.4], [7.9, planCenter - 0.8],
    ],
    draw: () => {},
  },
];
const planDraw = (step: number) => {
  const els: El[] = [];
  const L = LAYOUTS[step];
  L.draw(els);
  for (const [x, y] of L.pts) house(els, x, y, "c");
  const y = notes(els, -PLAN_H - 0.2, [`${L.name} düzen · konut sayısı 8 (değişmez). Şematik, ölçekli değil.`]);
  return { els, h: -y };
};
const planH = Math.max(...LAYOUTS.map((_, i) => planDraw(i).h));
const PLAN_NOTES = [
  "Yol, nehir vadisi veya kıyı boyunca uzanan yapı dizisi çizgisel dokuyu destekler.",
  "Bir merkez çevresindeki halka benzeri düzen dairesel örnektir.",
  "Işınsal planda yollar veya yapı dizileri merkezden farklı doğrultulara uzanır; tekerleğin kollarına benzer.",
  "Küme planda yakın yapı çekirdekleri düzenli halka olmayan bir topluluk oluşturur.",
];
const plans: FigureDef = {
  caption:
    "Bölümdeki model aynı sekiz konutu farklı konumlara koyarak yalnız plan farkını görünür kılar. İleri ile dört düzeni sırayla aç; konut sayısı değişmez. Plan diziliş biçimidir; toplu ya da dağınık doku konut aralığı ölçütüdür ve planlarla birlikte bulunabilir.",
  alt: "Sekiz konutluk şematik plan, dört adım: çizgisel, bir hat boyunca dizili; dairesel, merkez çevresinde halka; ışınsal, merkezden dört yöne uzanan kollar üzerinde; küme, iki düzensiz çekirdek.",
  maxHeight: fitH(planH),
  steps: LAYOUTS.map((l) => l.name),
  draw: (_v, step) => {
    const { els } = planDraw(step);
    els.push(...frame(planH));
    return { els, readout: [PLAN_NOTES[step], "Gerçek yerleşmeler kusursuz geometrik şekil olmayabilir; planın şekli işlev verisi üretmez."] };
  },
};

// dunya-yerlesmeleri · Toplu ve dağınık doku.
const TEXTURES: { name: string; pts: [number, number][] }[] = [
  { name: "Toplu", pts: [[4.0, -1.2], [4.8, -1.0], [5.6, -1.3], [4.3, -2.0], [5.1, -2.1], [5.9, -1.9], [4.6, -2.8], [5.4, -2.9]] },
  { name: "Dağınık", pts: [[0.8, -0.9], [3.6, -1.4], [6.4, -0.8], [9.2, -1.2], [1.8, -3.0], [4.7, -2.7], [7.4, -3.2], [9.0, -2.6]] },
];
const textureDraw = (step: number) => {
  const els: El[] = [];
  for (const [x, y] of TEXTURES[step].pts) house(els, x, y, step === 0 ? "c" : "b");
  const y = notes(els, -PLAN_H + 0.4, [`${TEXTURES[step].name} doku · konut sayısı 8 (değişmez). Şematik, ölçekli değil.`]);
  return { els, h: -y };
};
const textureH = Math.max(textureDraw(0).h, textureDraw(1).h);
const textures: FigureDef = {
  caption:
    "Toplu dokuda konutlar birbirine görece yakın, dağınık dokuda aralıklar daha geniştir. İleri ile aynı sekiz konutu iki dokuda karşılaştır. Toplu yerleşme çok nüfuslu kent, dağınık yerleşme az nüfuslu alan demek değildir; konut aralığı başka bir ölçüttür.",
  alt: "Sekiz konutluk şematik çizim, iki adım: toplu, konutlar ortada sık; dağınık, konutlar alana geniş aralıklarla yayılmış.",
  maxHeight: fitH(textureH),
  steps: TEXTURES.map((t) => t.name),
  draw: (_v, step) => {
    const { els } = textureDraw(step);
    els.push(...frame(textureH));
    return {
      els,
      readout: [
        step === 0 ? "Kurak alanda ortak su çevresinde toplu doku gelişebilir; bu evrensel zorunluluk değildir." : "Nemli ve parçalı bazı arazilerde dağınık örnekler görülebilir; yol ve planlama eski ilişkiyi değiştirebilir.",
        "Suya erişim, arazi parçalanması, tarla düzeni, güvenlik ve toplumsal tercihler dokuya katılabilir.",
      ],
    };
  },
};

// dunya-yerlesmeleri · Kullanım takvimi.
const monthX = (n: number) => LABEL_W + (n * (BAR_R - LABEL_W)) / 12;
const calendarDraw = (months: number) => {
  const els: El[] = [];
  let y = 0;
  y = barRow(els, y, "Sürekli örnek", [{ len: 12, tone: "c" }], monthX, "yıl boyunca yerleşik kullanım; 8 konut");
  y = barRow(els, y, "Model örneği", [{ len: months, tone: "b" }, { len: 12 - months, tone: "muted", dash: true }], monthX, `${fmt(months, 0)} ay kullanım; yine 8 konut, idari statü aynı`);
  y = axis(els, y + 0.2, [0, 3, 6, 9, 12], monthX, "ay");
  y = notes(els, y, ["Kullanım süresi bir eksendir; yapı sayısı ve idari statü ayrı verilerdir."]);
  return { els, h: -y };
};
const calendarH = calendarDraw(12).h;
const calendar: FigureDef = {
  caption:
    "Yıl boyu kullanılan örnek sürekli, yılın belirli döneminde kullanılan örnek mevsimlik olarak ele alınır. Sürgüyle model örneğinin kullanım süresini değiştir: yalnız süre değişir, konut sayısı ve statü değişmez. Bölümdeki model sekiz konut için altı ay kullanım verir.",
  alt: "İki yatay çubuk, ay ekseninde 0–12. Sürekli örnek 12 ay. Model örneği sürgüyle seçilen ay kadar dolu, kalanı kesik çerçeve; başlangıçta 6 ay.",
  maxHeight: fitH(calendarH),
  param: { label: "Kullanım süresi", min: 1, max: 12, step: 1, init: 6, unit: " ay" },
  draw: (m) => {
    const { els } = calendarDraw(m);
    els.push(...frame(calendarH));
    return { els, readout: [m >= 12 ? "12 ay: yıl boyunca kullanım, sürekli örneğe denk." : `${fmt(m, 0)} ay: yılın belirli döneminde kullanım; konut sayısı yine 8.`, "Turizm kentinde yaz ziyaretçisinin artması kışın kimsenin yaşamadığını göstermez; ziyaretçi ve yerleşik nüfusu ayır."] };
  },
};

export const geographyFigures061Environment: Record<string, Record<string, FigureDef>> = {
  "afetler-risk": {
    "Maruziyet ve kırılganlık farklıdır": risk,
    "Orman yangınında üçlü koşul": fire,
    "Müdahale ve iyileştirme": cycle,
    "Kesitte say, sonra yorumla": flood,
  },
  "bolge-turleri": {
    "İşlevsel bölgede merkez ve bağlantıyı izle": regionTypes,
    "Örtüşme, ayrılma ve geçiş kuşağı": overlap,
    "Sınır değişiminin nedenini açıkla": changeKind,
  },
  "cevre-toplum": {
    "Kaynak, taşınma yolu ve alıcı": pathway,
    "Ozon seyrelmesi başka mekanizmadır": greenOzone,
    "Yük ile derişimi farklı ölç": loadConc,
    "Azaltma ile uyumu ayır": mitigation,
  },
  "dunya-yerlesmeleri": {
    "Sürekli ve geçici kullanımda takvimi oku": calendar,
    "Toplu ve dağınık doku": textures,
    "Işınsal planı kümeyle karıştırma": plans,
  },
};
