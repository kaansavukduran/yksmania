import { germinationSource002, germinationTotal } from "../germinationSource002";
import { poly, pt, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";
import { axis, BAR_R, barRow, LABEL_W } from "./geographyFigures061Kit";
import { flowFig, quadFig, tableFig } from "./turkishFigures060Kit";
import { drawFig, lines, nt } from "./biologyFigures062Kit";

/*
 * Forge062 TYT Biyoloji · Bilimsel yöntem ve mineraller. Örnek cümleler ve
 * sayılar bölüm metninden alınır (%30 → %45: 15 yüzde puan, %50 göreli
 * artış). Mineral kapasite modelinde bölüm sayı vermediği için stok ve
 * gereksinim değerleri ekranda açıkça “örnek” diye yazılır; sonuç yalnız
 * mevcut / gereken oranından hesaplanır. Tablolar kavram şemasıdır.
 */

/* ---------------- Bilimsel yöntem ---------------- */

// 1 · Hipotez, tahmin, veri.
const hypothesis = tableFig({
  caption:
    "Bölümdeki tuz örneğinde üç bilgi türü: açıklama adayı, ölçülebilir beklenti ve ölçümden sonra oluşan kayıt. Bir satıra tıkla. Beklenen ile gözlenen aynı bilgi türü değildir.",
  alt: "Üç satırlı tablo. Hipotez: bu türde tuz artışı su alımını azaltır. Tahmin: aynı koşullarda tuz düzeyi yüksek grupta 48 saat sonunda alınan su daha az olacak. Veri: sonuç ölçüldükten sonra oluşan kayıt.",
  cols: [
    { name: "Tür", w: 2.4 },
    { name: "Bölümdeki örnek", w: 7.6 },
  ],
  rows: [
    { cells: ["Hipotez", "bu türde tuz artışı su alımını azaltır"], tones: [undefined, "b"], detail: ["Hipotez gözlemleri açıklamak üzere önerilen, sınanabilir bir açıklamadır; burada yönlü bir açıklama adayıdır."] },
    { cells: ["Tahmin", "aynı koşullarda tuz düzeyi yüksek grupta 48 saat sonunda alınan su daha az olacak"], tones: [undefined, "c"], detail: ["Tahminde sonuç ölçütü (alınan su), karşılaştırma (yüksek tuz grubu) ve süre (48 saat) belirlidir."] },
    { cells: ["Veri", "sonuç ölçüldükten sonra oluşan kayıt"], tones: [undefined, "a"], detail: ["Yalnız olumlu bir beklenti yazmak sınama kurmaz; veri kaydı ölçümden sonra oluşur."] },
  ],
  foot: "Uygun sonuç hipotezi destekler; tek deney mutlak doğruluk sağlamaz.",
});

// 2 · Değişken rolleri soruya göre değişir.
const roles = tableFig({
  caption:
    "Aynı nicelik bir düzende bağımsız, ötekinde bağımlı olabilir. İki düzeni karşılaştır; bir düzene tıkla. Rol, sözcüğün kalıcı özelliği değil sorunun kurgusudur.",
  alt: "İki satırlı tablo. Birinci düzen: sıcaklık ayarlanır, bağımsız; büyüme ölçülür, bağımlı. İkinci düzen: ışık değiştirilir, bağımsız; yaprak sıcaklığı ölçülür, bağımlı.",
  cols: [
    { name: "Düzen", w: 2.6 },
    { name: "Değiştirilen (bağımsız)", w: 3.7 },
    { name: "Ölçülen (bağımlı)", w: 3.7 },
  ],
  rows: [
    { cells: ["Birinci", "sıcaklık", "büyüme"], tones: [undefined, "c", "a"], detail: ["Sıcaklık ayarlanıp büyüme ölçülürse sıcaklık bağımsız değişkendir."] },
    { cells: ["İkinci", "ışık", "yaprak sıcaklığı"], tones: [undefined, "c", "a"], detail: ["Işık değiştirilip yaprak sıcaklığı ölçülürse sıcaklık bağımlı değişkendir."] },
  ],
  foot: "Kontrol edilen değişken eş tutulan özelliktir; kontrol grubu ise referans gruptur.",
});

// 3 · Karıştırıcı ikinci değişken.
const confound = tableFig({
  caption:
    "Grupları satırlara, koşulları sütunlara yaz: hedef faktör dışında değişen sütun alternatif açıklamadır. Bölümdeki örnekte iki grup hem ışık hem su bakımından farklı. Bir gruba tıkla.",
  alt: "İki satırlı tablo, sütunlar ışık, su, tür ve süre. Birinci grup: ışık yüksek, su çok, tür ve süre aynı. İkinci grup: ışık düşük, su az, tür ve süre aynı. İki sütun farklı olduğu için sonuç farkı tek faktöre yüklenemez.",
  cols: [
    { name: "Grup", w: 2.2 },
    { name: "Işık", w: 2.2 },
    { name: "Su", w: 2.0 },
    { name: "Tür, süre", w: 3.6 },
  ],
  rows: [
    { cells: ["Birinci", "yüksek", "çok", "aynı"], tones: [undefined, "a", "warn", "muted"], detail: ["Hedef faktör ışık ise su sütunu da farklı olduğu için alternatif açıklama kalır."] },
    { cells: ["İkinci", "düşük", "az", "aynı"], tones: [undefined, "a", "warn", "muted"], detail: ["Aynı yanlış kurguya daha çok örnek eklemek karıştırıcı etkeni kendiliğinden gidermez."] },
  ],
  foot: "Rastgele atama sistematik grup farkını azaltır ama her hatayı sıfırlamaz.",
});

// 9 · Kontrol türleri.
const controls = tableFig({
  caption:
    "Kontrol grubu her zaman boş değildir. Bir kontrol türüne tıkla: hangi soruyu yanıtladığı açılır. Bir kontrol eksikse bütün veriyi atmak yerine hangi çıkarımın zayıfladığını söyle.",
  alt: "Üç satırlı tablo. Taşıyıcı kontrol: yalnız taşıyıcı sıvı ve aynı işlem koşulları. Negatif kontrol: aranan etki oluşmadığında ölçümün görünüşü. Pozitif kontrol: düzenek işlediğinde beklenen yanıtın elde edilebildiği.",
  cols: [
    { name: "Kontrol", w: 2.8 },
    { name: "Ne gösterir?", w: 7.2 },
  ],
  rows: [
    { cells: ["Taşıyıcı", "yalnız taşıyıcı sıvı ve aynı işlem koşulları"], tones: [undefined, "b"], detail: ["Hiçbir şey yapmadım grubu farklı taşıyıcı etkisini her durumda denetlemez."] },
    { cells: ["Negatif", "aranan etki oluşmadığında ölçümün nasıl göründüğü"], tones: [undefined, "c"], detail: ["Negatif kontrol, etki yokken okunacak değeri gösterebilir."] },
    { cells: ["Pozitif", "düzenek işlediğinde beklenen yanıtın elde edilebildiği"], tones: [undefined, "a"], detail: ["Pozitif kontrol, olumsuz sonucun düzenek hatasından gelip gelmediğini sınamaya yardım eder."] },
  ],
  foot: "Roller araştırmaya göre tanımlanır.",
});

// 14 · Yüzde puan ve göreli değişim.
const BASE = 30;
const pctX = (n: number) => LABEL_W + (n * (BAR_R - LABEL_W)) / 60;
const pctDraw = (p: number) => {
  const els: El[] = [];
  let y = 0;
  y = barRow(els, y, "Başlangıç oranı", [{ len: BASE, tone: "b" }], pctX, `%${BASE}`);
  y = barRow(els, y, "Yeni oran", [{ len: Math.min(p, BASE), tone: "b" }, { len: Math.max(0, p - BASE), tone: "a" }], pctX, `%${nt(p, 0)}`);
  y = axis(els, y + 0.2, [0, 10, 20, 30, 40, 50, 60], pctX, "%");
  y = lines(els, y, ["Ölçekli çubuk. Yeni oran çubuğunun 30 çizgisinden sonraki parçası farktır."]);
  return { els, h: -y };
};
const pctH = pctDraw(60).h;
const percent: FigureDef = drawFig({
  caption:
    "Bölümdeki örnek: oran %30’dan %45’e çıkarsa fark 15 yüzde puan, başlangıca göre göreli artış %50’dir. Sürgüyle yeni oranı değiştir; iki nicelik gerçek hesapla yeniden çıkar. Göreli değişimin paydası başlangıçtır.",
  alt: "Yüzde ekseninde iki yatay çubuk: başlangıç oranı yüzde 30, yeni oran sürgüdeki değer. Yeni oran yüzde 45 iken fark 15 yüzde puan, göreli artış yüzde 50.",
  h: pctH,
  param: { label: "Yeni oran", min: 0, max: 60, step: 1, init: 45, unit: " %" },
  draw: (p) => {
    const { els } = pctDraw(p);
    const pp = p - BASE;
    const rel = (pp / BASE) * 100;
    return {
      els,
      readout: [
        `Yüzde puan farkı: ${nt(p, 0)} − ${BASE} = ${nt(pp, 0)} puan. Göreli değişim: ${nt(pp, 0)} / ${BASE} × 100 = %${nt(rel, 1)}.`,
        "Oran = sonuç sayısı / toplam uygun sayı; başlangıç sıfırsa göreli değişim formülü kullanılamaz.",
      ],
    };
  },
});

// 13 · Kalibrasyon: sabit kayma ve ölçek hatası.
const calibration = tableFig({
  caption:
    "İki hata türü bilinen referanslarla ayrılır. Bir hata türüne tıkla: kısa ve uzun referansta nasıl göründüğü açılır. Tek referans bazı hataları ayırmaya yetmeyebilir.",
  alt: "İki satırlı tablo. Sabit kayma: her değere aynı miktarı ekler; kısa ve uzun referansta fark aynı. Ölçek hatası: büyüklükleri belirli bir çarpanla değiştirir; uzun referansta fark büyür.",
  cols: [
    { name: "Hata", w: 2.8 },
    { name: "Nasıl değiştirir?", w: 3.6 },
    { name: "İki referansta", w: 3.6 },
  ],
  rows: [
    { cells: ["Sabit kayma", "her değere aynı miktarı ekler", "kısa ve uzunda fark aynı"], tones: [undefined, "b", "c"], detail: ["Aynı bozuk aracı tekrar kullanmak sabit kaymayı sürdürür; tutarlı ölçüm gerçek değere yakınlığı kanıtlamaz."] },
    { cells: ["Ölçek hatası", "büyüklüğü bir çarpanla değiştirir", "uzun referansta fark büyür"], tones: [undefined, "b", "c"], detail: ["Bilinen kısa ve uzun iki referans, ek kayma ile oransal sapmayı ayırmada daha çok bilgi sağlar."] },
  ],
  foot: "Düzeltme kuralı yalnız sınanan aralıkta kullanılır.",
});

// 17 · İki faktörlü düzen.
const factorial = quadFig({
  caption:
    "Işık ve suyun düşük ve yüksek düzeyleri ayrı kombinasyonlarda denenir; ışık etkisi her su düzeyinde ayrı hesaplanır. Bir hücreye tıkla. İki karşılaştırmanın farkı eşit değilse ışık etkisi su düzeyine göre değişmektedir.",
  alt: "İki çarpı iki tablo. Sütunlar düşük ışık ve yüksek ışık, satırlar düşük su ve yüksek su. Her satırda yüksek ışık eksi düşük ışık farkı o su düzeyindeki ışık etkisidir.",
  cols: ["Düşük ışık", "Yüksek ışık"],
  rows: ["Düşük su", "Yüksek su"],
  axis: ["Işık düzeyi", "Satır başına fark: o su düzeyindeki ışık etkisi"],
  cells: [
    { head: "Düşük-düşük", text: "referans hücre", tone: "muted", detail: ["Düşük su satırında ışık etkisi = yüksek ışık − düşük ışık."] },
    { head: "Yüksek ışık, düşük su", text: "düşük sudaki ışık etkisi", tone: "c", detail: ["Bu fark yalnız düşük su düzeyindeki ışık etkisidir."] },
    { head: "Düşük ışık, yüksek su", text: "yüksek su satırının referansı", tone: "muted", detail: ["Yüksek su satırında ışık etkisi ayrıca hesaplanır."] },
    { head: "Yüksek-yüksek", text: "yüksek sudaki ışık etkisi", tone: "a", detail: ["İki satırdaki ışık etkisi farklıysa her faktörün sabit etki eklediği varsayımı yetersiz kalabilir."] },
  ],
  foot: "Etkileşim yorumunu tabloya dayandır; tekrarları ve diğer koşulları yine denetle.",
});

// 21 · Araştırma döngüsü.
const loop = flowFig({
  caption:
    "Araştırma tek çizgili bir ezber sıra değildir: beklenmedik sonuç soruya geri döndürebilir. İleri ile basamakları aç; son kart yeniden ilk karta bağlanır. Kavram şeması, ölçekli değil.",
  alt: "Beş kart alt alta: soru ve problem; hipotez ve tahmin; ölçüm ve kayıt; üç soruyla değerlendirme; yeni değişken ya da düzeltilmiş araçla yeni soru.",
  nodes: [
    { head: "Soru", text: "problem fark edilir, soru daraltılır", tone: "b", note: "Bir problem fark edilir, soru daraltılır ve ilgili kanıt aranır." },
    { head: "Hipotez ve tahmin", text: "sınanabilir açıklama, ölçülebilir beklenti", tone: "c", note: "Hipotezin verilerle karşılaşabilen sonuçları olmalıdır." },
    { head: "Ölçüm ve kayıt", text: "yöntem, örnek sayısı, dışlama ölçütü açık", tone: "c", note: "İstenmeyen verileri gerekçesiz çıkarmak geçerli değildir." },
    { head: "Değerlendirme", text: "veri ne gösteriyor, açıklama neyi öngörüyor, kurgu ikisini ayırabiliyor mu?", tone: "a", note: "Bu üçlü hem pozitif destek hem karşı sonuç için kullanılır." },
    { head: "Yeni soru", text: "yeni değişken ya da düzeltilmiş araçla yeniden sınama", tone: "b", note: "Döngü, düşüncenin veriye göre düzeltilmesini sağlar; basamak ezberini bozduğu için yanlış sayılmaz." },
  ],
  steps: ["Soru", "Hipotez", "Ölçüm", "Değerlendirme", "Yeni soru"],
  reveal: true,
  foot: "Geniş açıklama tek bir ölçümden daha kapsamlı kanıt gerektirir.",
});

/* ---------------- Mineraller ---------------- */

// 1 · Bir element, farklı yapılar.
const elements = tableFig({
  caption:
    "Bölümdeki eşleştirmeler: bir elementin atomları farklı yapılara katılabilir. Bir elemente tıkla: yapı ve görev ayrımı açılır. Aynı mineralin çok görevi olması minerallerin birbirinin yerine geçeceğini göstermez.",
  alt: "Dört satırlı tablo. Fosfor: DNA, RNA, ATP ve fosfolipitlerde fosfat grupları. Demir: hemoglobinin hem grubu, bazı elektron aktarım bileşenleri. Magnezyum: klorofilin yapısı. İyot: tiroit hormonlarının yapısı.",
  cols: [
    { name: "Element", w: 2.8 },
    { name: "Katıldığı yapılar", w: 7.2 },
  ],
  rows: [
    { cells: ["Fosfor", "DNA, RNA, ATP ve fosfolipitlerde fosfat grupları"], tones: [undefined, "b"], detail: ["Bu yapıların görevleri aynı değildir; ATP’nin fosfat içermesi fosforun yakılarak enerji verdiği anlamına gelmez."] },
    { cells: ["Demir", "hemoglobinin hem grubu; bazı elektron aktarım bileşenleri"], tones: [undefined, "a"], detail: ["Bir yapıya özgü görev, demirin yalnız tek yerde bulunduğu sonucunu vermez."] },
    { cells: ["Magnezyum", "klorofilin yapısı"], tones: [undefined, "c"], detail: ["Yapı adı, element kimliği ve olayın işlevini birlikte eşleştir."] },
    { cells: ["İyot", "tiroit hormonlarının yapısı"], tones: [undefined, "c"], detail: ["İyot her hormonun ya da her proteinin zorunlu elementi değildir."] },
  ],
  foot: "Mineraller organik yakıt gibi kalori sağlamaz.",
});

// 5 · Element, iyon, tuz.
const ions = tableFig({
  caption:
    "Element, iyon ve tuz farklı gösterimlerdir. Bir terime tıkla: bölümdeki örnek ve karıştırılan nokta açılır. İyon oluşturmak elementin kimliğini değiştirmez.",
  alt: "Dört satırlı tablo. Element: tek tür atomun kimliği; Fe demir, Mg magnezyum. İyon: yük taşıyan atom ya da atom grubu; Na⁺, Cl⁻. Tuz: artı ve eksi iyonlar birlikte; NaCl. Flor ve florür: F element simgesi, F⁻ florür iyonu; F₂ gazı aynı tür değil.",
  cols: [
    { name: "Terim", w: 2.6 },
    { name: "Örnek", w: 2.6 },
    { name: "Bölümdeki anlam", w: 4.8 },
  ],
  rows: [
    { cells: ["Element", "Fe, Mg", "tek tür atomun kimliği"], tones: [undefined, "b", "muted"], detail: ["Fe demir, Mg magnezyum simgesidir."] },
    { cells: ["İyon", "Na⁺, Cl⁻", "elektrik yükü taşıyan atom ya da atom grubu"], tones: [undefined, "c", "muted"], detail: ["Cl element simgesiyle Cl⁻ iyon gösterimini ayır."] },
    { cells: ["Tuz", "NaCl", "artı ve eksi iyonlar birlikte"], tones: [undefined, "a", "muted"], detail: ["Çözünürlerse sulu ortamda dağılabilirler."] },
    { cells: ["Florür", "F⁻ (element F, gaz F₂)", "diş mineral dokusuyla ilişkili iyon"], tones: [undefined, "c", "muted"], detail: ["F₂ biçimindeki gaz, besin ya da diş dokusunda söz edilen florürle aynı kimyasal tür değildir."] },
  ],
  foot: "Bulunduğu yapının organik olması elementin mineral beslenme rolünü kaldırmaz.",
});

// 17 · Enzim deneyi: eksiltme ve geri ekleme.
const cofactor = flowFig({
  caption:
    "Bir metal iyonunun kofaktör rolünü sınayan deney dizisi. İleri ile adımları aç. Toparlanma yardımcı rolü destekler; iyonun yakıt gibi tüketildiğini göstermez. Kavram şeması, ölçekli değil.",
  alt: "Dört kart alt alta: tam enzim hazırlığı; metal iyonu uzaklaştırılınca etkinlik düşer; aynı iyon geri eklenince etkinlik toparlanır; uzaklaştırma işleminin proteine başka zarar vermediğini denetleyen karşılaştırma.",
  nodes: [
    { head: "Tam hazırlık", text: "enzim ve metal iyonu birlikte", tone: "muted", note: "Taşıyıcı sıvı, pH, sıcaklık ve enzim miktarı bütün gruplarda eş tutulmalıdır." },
    { head: "İyon uzaklaştırıldı", text: "etkinlik düşer", tone: "warn", note: "Düşüş tek başına mekanizmayı kesinleştirmez; uzaklaştırma işlemi proteine zarar vermiş olabilir." },
    { head: "Aynı iyon geri eklendi", text: "etkinlik toparlanır", tone: "a", note: "Toparlanma iyonun yardımcı rolünü destekleyebilir." },
    { head: "Denetim", text: "uzaklaştırmanın proteine başka zarar vermediğini sınayan karşılaştırma", tone: "b", note: "Her enzim aynı mineral iyonuna gereksinim duymaz; ilişki belirli enzim bağlamında kurulur." },
  ],
  steps: ["Tam", "Eksiltme", "Geri ekleme", "Denetim"],
  reveal: true,
  foot: "Kofaktör enzimin uygun koşulunu destekler; yakıt değildir.",
});

// 18–19 · Sınırlayıcı mineral: kapasite = mevcut / gereken.
const XS = 12;
const XN = 3;
const YN = 2;
const capX = (n: number) => LABEL_W + (n * (BAR_R - LABEL_W)) / 10;
const capDraw = (ys: number) => {
  const els: El[] = [];
  const cx = XS / XN;
  const cy = ys / YN;
  const k = Math.floor(Math.min(cx, cy));
  let y = 0;
  y = barRow(els, y, "X kapasitesi", [{ len: cx, tone: cx <= cy ? "a" : "b" }], capX, `${XS} / ${XN} = ${nt(cx)} birim`);
  y = barRow(els, y, "Y kapasitesi", [{ len: cy, tone: cy <= cx ? "a" : "b" }], capX, `${nt(ys, 0)} / ${YN} = ${nt(cy)} birim`);
  y = barRow(els, y, "Ortak üretim", [{ len: k, tone: "c" }], capX, `en küçük kapasitenin tam kısmı: ${k} birim`);
  y = axis(els, y + 0.2, [0, 2, 4, 6, 8, 10], capX, "birim");
  y = lines(els, y, [`Örnek değerler: X stoku ${XS}, birim başına ${XN}; Y birim başına ${YN}. Kısa çubuk sınırlayıcıdır.`]);
  return { els, h: -y, k, cx, cy };
};
const capH = capDraw(20).h;
const limiting: FigureDef = drawFig({
  caption:
    "Bölümdeki oran kuralı: her mineralin desteklediği kapasite mevcut miktarın birim gereksinime bölümüdür; iki madde de zorunluysa küçük kapasite ortak sonucu sınırlar. Sürgüyle Y stokunu değiştir. Sayılar örnek değerlerdir, gerçek bitki ölçümü değildir.",
  alt: "Birim ekseninde üç yatay çubuk: X kapasitesi 12 bölü 3 eşittir 4; Y kapasitesi sürgüdeki stok bölü 2; ortak üretim iki kapasitenin küçüğünün tam kısmı. Sınırlayıcı olan kısa çubuktur.",
  h: capH,
  param: { label: "Y stoku", min: 0, max: 20, step: 1, init: 6 },
  draw: (ys) => {
    const { els, k, cx, cy } = capDraw(ys);
    const who = cx < cy ? "X sınırlayıcıdır" : cy < cx ? "Y sınırlayıcıdır" : "X ve Y birlikte sınırlayıcıdır";
    return {
      els,
      readout: [
        `${who}; ortak üretim ${k} birim. Kalan stok: X ${XS} − ${k} × ${XN} = ${XS - k * XN}, Y ${nt(ys, 0)} − ${k} × ${YN} = ${nt(ys - k * YN, 0)}.`,
        "Sınırlayıcı olmayanı artırmak ortak üretimi artırmaz; ilk kısıt giderilince öteki mineral sınır olabilir.",
      ],
    };
  },
});

const observedGermination: FigureDef = {
  caption: "Varsayımsal öğretim verisinde her sıcaklık için 20 tohumun yedinci gündeki sayımı var. Yalnız veri noktalarını kesin ölçüm olarak oku.",
  alt: "15, 20, 25, 30 ve 35 derecede sırasıyla 4, 10, 16, 12, 2 çimlenen tohum. 40 derecede veri noktası yok.",
  param: { label: "İncelenen sıcaklık", min: 15, max: 40, step: 5, init: 25 },
  draw: (temperature) => {
    const x = (value: number) => (value - 15) * 0.26;
    const y = (count: number) => count * 0.19;
    const values = germinationSource002.map(({ temperature: t, germinated }) => v(x(t), y(germinated)));
    const els: El[] = [
      vec(v(-0.28, 0), v(6.8, 0), { tone: "ink", thin: true }),
      vec(v(-0.28, 0), v(-0.28, y(21.5)), { tone: "ink", thin: true }),
      txt(v(5.58, -0.56), "Sıcaklık (°C)", "s", { tone: "ink", small: true }),
      txt(v(-0.28, y(21.5)), "Çimlenen tohum", "n", { tone: "ink", small: true }),
      poly(values, { tone: "muted", thin: true, open: true }),
    ];
    for (const label of [15, 20, 25, 30, 35, 40]) {
      els.push(txt(v(x(label), -0.12), String(label), "s", { tone: "ink", small: true }));
    }
    for (const count of [0, 5, 10, 15, 20]) {
      els.push(txt(v(-0.36, y(count)), String(count), "w", { tone: "ink", small: true }));
    }
    germinationSource002.forEach(({ temperature: measured, germinated }, i) => {
      els.push(pt(values[i], String(germinated), "n", measured === temperature ? "warn" : "a"));
    });
    const selected = germinationSource002.find((record) => record.temperature === temperature);
    if (selected) els.push(seg(v(x(temperature), 0), v(x(temperature), y(selected.germinated)), { tone: "warn", dash: true, thin: true }));
    els.push(txt(v(-1.0, 4.85), "", "c"), txt(v(7.2, -1), "", "c"));
    return { els, readout: selected
      ? [`${temperature} °C’de ${selected.germinated}/${germinationTotal} tohum çimlendi (%${100 * selected.germinated / germinationTotal}).`,
        "Ölçülen en yüksek sayı 25 °C’de 16. Bu veri türün kesin optimumunu göstermez."]
      : ["40 °C’de ölçüm yok. Kaç tohumun çimleneceği bu tablodan bilinmez.",
        "Çizginin 35 °C’de bitmesi, 40 °C’de sonucun sıfır olduğu anlamına gelmez."] };
  },
};

const requirementRatios: FigureDef = {
  caption: "İki mineralin gereksinimi farklı. Ham miktar yerine gereksinimin karşılanan yüzdesini karşılaştır.",
  alt: "İlk çubuk X gereksiniminin yüzde 50’sinde sabit. İkinci çubuk Y için değişir. Kapasite işareti yüzde 100.",
  param: { label: "Y için karşılanma yüzdesi", min: 0, max: 120, step: 10, init: 80 },
  draw: (yPercent) => {
    const xPercent = 50;
    const lengths = [xPercent, yPercent];
    const toWidth = (percent: number) => percent * 0.044;
    const els: El[] = [
      seg(v(toWidth(100), -0.49), v(toWidth(100), 2.42), { tone: "muted", dash: true }),
      txt(v(toWidth(100), 2.45), "%100", "n", { tone: "ink", small: true }),
    ];
    lengths.forEach((ratio, i) => {
      const bottom = 1.46 - i * 1.18;
      const end = toWidth(ratio);
      if (ratio > 0) {
        const tone = ratio === Math.min(...lengths) ? "warn" : "a";
        els.push(poly([v(0, bottom), v(end, bottom), v(end, bottom + 0.49), v(0, bottom + 0.49)], { tone, fill: tone, thin: true }));
      }
      els.push(txt(v(-0.35, bottom + 0.245), i === 0 ? "X" : "Y", "w", { tone: "ink", bold: true }));
      els.push(txt(v(end + 0.16, bottom + 0.245), `%${ratio}`, "e", { tone: "ink", small: true, bold: true }));
    });
    els.push(txt(v(-0.84, 3.04), "", "c"), txt(v(6.4, -0.83), "", "c"));
    const outcome = xPercent === yPercent ? "Gereksinimler aynı oranda karşılanıyor."
      : `${xPercent < yPercent ? "X" : "Y"} daha az karşılanıyor ve bu modelde sınırlayıcı.`;
    return { els, readout: [
      `X için 5 mg / 10 mg oranı %${xPercent}. Y için ${nt(yPercent / 100, 1)} mg / 1 mg oranı %${yPercent}.`,
      outcome,
      "Bu karşılaştırmada diğer koşulların uygun olduğu ve gereksinim oranlarının değişmediği kabul edilir.",
    ] };
  },
};

export const biologyFigures062Method: Record<string, Record<string, FigureDef>> = {
  "bilimsel-yontem": {
    "Hipotez, tahmin ve ölçüm": hypothesis,
    "Neyi değiştirdin, neyi ölçtün?": roles,
    "Karşılaştırmayı bozacak ikinci değişkeni ara": confound,
    "Referans grup her zaman boş değildir": controls,
    "Kalibrasyonda iki hata türünü gör": calibration,
    "Sayım, oran ve yüzde": percent,
    "Ölçülen en yüksek değer ile veri dışı tahmini ayır": observedGermination,
    "Faktörlerin etkisi koşula bağlı olabilir": factorial,
    "Yeni soruyla dönen araştırma": loop,
  },
  mineraller: {
    "Bir atom, farklı yapılara katılabilir": elements,
    "Element, iyon ve tuzun dilini ayır": ions,
    "Enzim deneyinde eksiltme ve geri ekleme": cofactor,
    "Minimum gereksinimi oranla karşılaştır": limiting,
    "Ham miktarı değil, karşılanan gereksinimi karşılaştır": requirementRatios,
  },
};
