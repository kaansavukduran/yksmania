import { circle, poly, regular, seg, txt, v, type El, type FigureDef } from "./figureKit";
import { axis, BAR_R, barRow, LABEL_W } from "./geographyFigures061Kit";
import { flowFig, rect, tableFig, treeFig } from "./turkishFigures060Kit";
import { drawFig, lines, nt } from "./biologyFigures062Kit";

/*
 * Forge062 TYT Biyoloji · Vitaminler ve nükleik asitler. Eşleştirmeler ve
 * oranlar bölüm metnindendir (rRNA %80, tRNA %15, mRNA %5 ders şeması;
 * A–T 2, G–C 3 hidrojen bağı; H = 2x + 3y). Üç bölmeli C vitamini
 * modelinde bölüm sayı vermediği için başlangıç ve katı miktarı ekranda
 * “örnek” diye yazılır; kayıp yalnız başlangıç − katı − su ile hesaplanır.
 * Figürler tanı, doz ya da kişisel sağlık önerisi vermez.
 */

/* ---------------- Vitaminler ---------------- */

// 1 · Çözünürlük grupları.
const groups = treeFig({
  caption:
    "Vitaminler iki çözünürlük grubunda ele alınır. Bir dala ya da vitamine tıkla: grup bilgisi ve istisna açılır. Bir özelliği bütün üyelere istisnasız yayma. Sınıflama ağacı, ölçekli değil.",
  alt: "Ağaç: kök vitaminler. Yağda çözünenler dalında A, D, E, K. Suda çözünenler dalında B grubu ve C; B12 için anlamlı vücut depoları bulunabilir.",
  root: "Vitaminler",
  branches: [
    {
      label: "Yağda çözünen",
      title: "Yağda çözünenler: A, D, E, K",
      detail: ["Yararlanma lipitlerin emilim koşullarıyla ilişkilidir; birikebilmeleri fazlasının her koşulda güvenli olduğu anlamına gelmez."],
      tone: "c",
      leaves: [
        { label: "A", title: "A vitamini", detail: ["Görme ve epitel işlevleriyle ilişkilidir."] },
        { label: "D", title: "D vitamini", detail: ["Kalsiyum–fosfor dengesi ve kemik mineralizasyonuyla ilişkilidir."] },
        { label: "E", title: "E vitamini", detail: ["Antioksidan savunmaya katkı verir."] },
        { label: "K", title: "K vitamini", detail: ["Pıhtılaşmada görevli bazı proteinlerin uygun işleviyle ilişkilidir."] },
      ],
    },
    {
      label: "Suda çözünen",
      title: "Suda çözünenler: B grubu ve C",
      detail: ["Genel olarak daha sınırlı depolanma öğretilir; bu koşulsuz bir depo yasağı değildir."],
      tone: "b",
      leaves: [
        { label: "B grubu", title: "B grubu", detail: ["B grubu tek bir molekül değildir; birbirinden farklı vitaminleri kapsar."] },
        { label: "B12 deposu", title: "B12 istisnası", detail: ["B12 için anlamlı vücut depoları bulunabilir; suda çözünenlerin hiç depolanmadığı yargısı geçersizdir."] },
        { label: "C", title: "C vitamini", detail: ["Kolajen yapımı gibi süreçlere katkı verir."] },
      ],
    },
  ],
  foot: "Ortak sınıflandırma ölçütü çözünürlüktür; moleküler yapılar aynı değildir.",
});

// 2 · İşlev eşleştirmesi.
const functions = tableFig({
  caption:
    "Bölümdeki işlev eşleştirmeleri. Bir vitamine tıkla. Tablo sorusunda çözünürlük, görev ve koşul sütunlarını ayrı eşleştir; bu tablo tanı ya da doz önerisi vermez.",
  alt: "Altı satırlı tablo. A: görme ve epitel. D: kalsiyum–fosfor dengesi, kemik mineralizasyonu. K: pıhtılaşmada görevli bazı proteinler. E: antioksidan savunma. C: kolajen yapımı. B grubu: farklı vitaminler, enerji dönüşümünde yardımcı roller.",
  cols: [
    { name: "Vitamin", w: 2.4 },
    { name: "Grup", w: 1.8 },
    { name: "Bölümdeki işlev", w: 5.8 },
  ],
  rows: [
    { cells: ["A", "yağda", "görme ve epitel işlevleri"], tones: [undefined, "c", "ink"], detail: ["Bazı bitkisel karotenoidler A vitaminiyle ilişkili ürünlere dönüştürülebilen öncüllerdir."] },
    { cells: ["D", "yağda", "kalsiyum–fosfor dengesi, kemik mineralizasyonu"], tones: [undefined, "c", "ink"], detail: ["Oluşum deride başlayabilir; etkin biçimler karaciğer ve böbrekle ilişkili sonraki dönüşümlerle oluşur."] },
    { cells: ["E", "yağda", "antioksidan savunma"], tones: [undefined, "c", "ink"], detail: ["Ortak yağda çözünürlük E ve K’nin görevlerini eşitlemez."] },
    { cells: ["K", "yağda", "pıhtılaşmada görevli bazı proteinler"], tones: [undefined, "c", "ink"], detail: ["Her kanama sorunu K eksikliği diye adlandırılamaz."] },
    { cells: ["C", "suda", "kolajen yapımı gibi süreçler"], tones: [undefined, "b", "ink"], detail: ["Suya geçiş ile kimyasal etkinlik kaybı farklı olaylardır."] },
    { cells: ["B grubu", "suda", "farklı üyeler; yardımcı roller"], tones: [undefined, "b", "ink"], detail: ["Aynı grup adı bütün üyelerin aynı yardımcı moleküle dönüştüğü anlamına gelmez."] },
  ],
  foot: "Vitaminler yakıt değildir; birçoğu enerji dönüşümünde yardımcı rollerle ilişkilidir.",
});

// 8 · D vitamini basamakları.
const dSteps = flowFig({
  caption:
    "D vitaminiyle ilişkili süreç deride başlayabilir; etkin biçimler sonraki organlarda oluşur. İleri ile basamakları aç. Deride öncül dönüşümü bütün işlemlerin tek yerde tamamlandığını söylemez. Şema, ölçekli değil.",
  alt: "Dört kart alt alta: deride uygun UVB ışığıyla öncül dönüşümü; karaciğerle ilişkili sonraki dönüşüm; böbrekle ilişkili dönüşüm ve etkin biçim; kalsiyum–fosfor dengesi ve kemik mineralizasyonuna katkı.",
  nodes: [
    { head: "Deri", text: "uygun UVB ışığıyla öncül dönüşümü", tone: "c", note: "Süreç deride uygun ultraviyole B ışığıyla öncül dönüşümü üzerinden başlayabilir." },
    { head: "Karaciğer", text: "sonraki dönüşüm", tone: "b", note: "Etkin biçimlerin oluşması karaciğer ve böbrek gibi organlarla ilişkilidir." },
    { head: "Böbrek", text: "etkin biçimin oluşmasıyla ilişkili", tone: "b", note: "Her basamağın kendi öncül ve koşulu vardır." },
    { head: "İşlev", text: "kalsiyum–fosfor dengesi ve kemik mineralizasyonu", tone: "a", note: "Raşitizm ve osteomalazi okul eşleştirmesidir; kişisel belirti tanısı değildir." },
  ],
  steps: ["Deri", "Karaciğer", "Böbrek", "İşlev"],
  reveal: true,
  foot: "Soruda hangi basamağın anlatıldığını seç.",
});

// 11 · B grubu yardımcı rolleri.
const bGroup = tableFig({
  caption:
    "B grubu üyelerinin bölümdeki yardımcı rolleri. Bir üyeye tıkla. Vitaminin besinle alınan biçimi, görevli türevi ve protein enzimin bütünü aynı molekül değildir.",
  alt: "Altı satırlı tablo. B1 tiamin: etkin biçimi tiamin difosfat, TDP. B2: FAD. B3: NAD. B5: koenzim A. B6: amino asit metabolizması basamakları. B9 ve B12: DNA sentezi ve kan hücresi oluşumu; B12 sinir sistemiyle de ilişkili.",
  cols: [
    { name: "Üye", w: 2.2 },
    { name: "Bölümdeki ilişki", w: 7.8 },
  ],
  rows: [
    { cells: ["B1", "tiamin; etkin biçimlerinden biri tiamin difosfat (TDP)"], tones: [undefined, "b"], detail: ["TDP bazı tepkimelerde koenzimdir; B1 doğrudan kalori veren yakıt değildir."] },
    { cells: ["B2", "FAD ile ilişkili"], tones: [undefined, "b"], detail: ["B2 kökenli FAD enerji dönüşümlerinde kullanılan yardımcı moleküle örnektir."] },
    { cells: ["B3", "NAD ile ilişkili"], tones: [undefined, "b"], detail: ["B3 kökenli NAD enerji dönüşümlerinde kullanılan yardımcı moleküle örnektir."] },
    { cells: ["B5", "koenzim A ile ilişkili"], tones: [undefined, "c"], detail: ["B5 koenzim A’yla ilişkilidir."] },
    { cells: ["B6, B7", "B6 amino asit metabolizması; B7 bazı karboksilleme süreçleri"], tones: [undefined, "c"], detail: ["Farklı üyeler farklı basamaklarla ilişkilidir."] },
    { cells: ["B9, B12", "DNA sentezi ve kan hücresi oluşumu; B12 sinir sistemi"], tones: [undefined, "a"], detail: ["İki vitaminin bütün işlevleri aynı sayılmaz."] },
  ],
  foot: "B grubu tek bir vitamin sayılmaz.",
});

// 13–15 · Üç bölmeli C vitamini modeli.
const START = 100;
const SOLID = 55;
const vcX = (n: number) => LABEL_W + (n * (BAR_R - LABEL_W)) / START;
const vcDraw = (w: number) => {
  const els: El[] = [];
  const loss = START - SOLID - w;
  let y = 0;
  y = barRow(els, y, "Başlangıç", [{ len: SOLID, tone: "b" }, { len: w, tone: "c" }, { len: loss, tone: "warn", dash: true }], vcX, `katı ${SOLID} + su ${nt(w, 0)} + kayıp ${nt(loss, 0)} = ${START}`);
  y = barRow(els, y, "Su tutulursa", [{ len: SOLID, tone: "b" }, { len: w, tone: "c" }], vcX, `yenebilir ${SOLID} + ${nt(w, 0)} = ${nt(SOLID + w, 0)}`);
  y = barRow(els, y, "Su dökülürse", [{ len: SOLID, tone: "b" }], vcX, `yenebilir ${SOLID}`);
  y = axis(els, y + 0.2, [0, 25, 50, 75, 100], vcX, "birim");
  y = lines(els, y, ["Örnek değerler, keyfî miktar birimi. Çubuk sırası: katı, su, kesik çerçeveli etkinlik kaybı."]);
  return { els, h: -y };
};
const vcH = vcDraw(20).h;
const vitC: FigureDef = drawFig({
  caption:
    "Kapalı modelde başlangıçtaki etkin C vitamini üç bölmeye ayrılır: katıda kalan, suya geçen ve etkin olarak ölçülmeyen. Kayıp = başlangıç − katı − su. Sürgüyle suya geçen miktarı değiştir. Sayılar örnektir; gram besin ya da kişisel gereksinim değildir.",
  alt: "Üç yatay çubuk. Başlangıç 100 birim: katı 55, su sürgü değeri, kalan kayıp. Su tutulursa yenebilir bölüm katı artı su. Su dökülürse yenebilir bölüm yalnız katı, 55.",
  h: vcH,
  param: { label: "Suya geçen", min: 0, max: 45, step: 1, init: 20 },
  draw: (w) => {
    const { els } = vcDraw(w);
    return {
      els,
      readout: [`Kayıp = ${START} − ${SOLID} − ${nt(w, 0)} = ${nt(START - SOLID - w, 0)}. Su dökülürse yenebilir ${SOLID}, tutulursa ${nt(SOLID + w, 0)}.`, "Suyu dökmek daha önce olmuş kimyasal kaybı değiştirmez; ölçülmeyen suyu sıfır diye kaydetme."],
    };
  },
});

// 18 · B12 emilim basamakları.
const b12 = flowFig({
  caption:
    "Vitaminler büyük polimerler gibi monomerlere parçalanmaz, ama her zarı engelsiz de geçmez. B12 örneğinde bölümdeki basamakları ileri ile aç. Ön basamak verimsizse sonraki basamağa ulaşan miktar azalabilir. Şema, ölçekli değil.",
  alt: "Dört kart alt alta: besine bağlı B12; serbestleşme; mide kaynaklı iç faktörle ilişki, iç faktör bir proteindir; özel bağırsak alımı.",
  nodes: [
    { head: "Besine bağlı B12", text: "besindeki biçim", tone: "muted", note: "Vitaminin adı, besindeki kimyasal biçim ve etkin biçim ayrı bilgilerdir." },
    { head: "Serbestleşme", text: "besinden ayrılma", tone: "b", note: "Bu basamak verimsizse sonraki basamağa ulaşan miktar azalabilir." },
    { head: "İç faktör", text: "mide kaynaklı iç faktörle ilişki; iç faktör bir proteindir", tone: "c", note: "İç faktör vitaminin kendisi değildir." },
    { head: "Bağırsak alımı", text: "özel bağırsak alımı", tone: "a", note: "Ardışık yüzde hesabında her yüzde kendi giriş miktarına uygulanır; uygulama kişisel emilim ölçmez." },
  ],
  steps: ["Besin", "Serbestleşme", "İç faktör", "Alım"],
  reveal: true,
  foot: "Basamak yüzdeleri yalnız çözümlü özgün örnek içindir.",
});

/* ---------------- Nükleik asitler ---------------- */

// 1 · Baz, şeker, fosfat.
const PARTS = ["Baz", "Nükleozit", "Nükleotit"];
const parts = drawFig({
  caption:
    "Baz + şeker nükleozittir; fosfat eklenince nükleotit olur. Adımlarla parçaları ekle: öteki iki parça aynı kalırken birimin adı değişir. Şekiller simgedir, atomların yerleşimi değildir; ölçekli değil.",
  alt: "Sağda dikdörtgen azotlu baz, ortada beşgen pentoz şeker, solda daire fosfat. Birinci adımda yalnız baz, ikincide baz ve şeker, üçüncüde üçü birden.",
  h: 3.2,
  steps: PARTS,
  draw: (_v, step) => {
    const els: El[] = [];
    const cy = -1.0;
    els.push(rect(6.6, cy + 0.42, 8.6, cy - 0.42, "b"), txt(v(7.6, cy - 0.95), "azotlu baz", "c", { small: true, bold: true, tone: "b" }));
    if (step >= 1) {
      els.push(poly(regular(5, 0.55, 90, v(4.6, cy)), { tone: "c", fill: "c" }), txt(v(4.6, cy - 0.95), "pentoz", "c", { small: true, bold: true, tone: "c" }));
      els.push(seg(v(5.15, cy), v(6.6, cy), { tone: "ink" }));
    }
    if (step >= 2) {
      els.push(circle(v(2.0, cy), 0.45, { tone: "a", fill: "a" }), txt(v(2.0, cy - 0.95), "fosfat", "c", { small: true, bold: true, tone: "a" }));
      els.push(seg(v(2.45, cy), v(4.07, cy), { tone: "ink" }));
    }
    const name = ["Yalnız baz: nükleotit değil.", "Baz + şeker (glikozit bağı) = nükleozit.", "Baz + şeker + fosfat (fosfoester bağı) = nükleotit."][step];
    lines(els, -2.7, [name], "ink");
    return { els, readout: [name, "Bir nükleotidin içindeki bağlar ile zincirdeki komşu nükleotit bağlantıları ayrı sayılır."] };
  },
});

// 3 · DNA ve RNA karşılaştırması.
const compare = tableFig({
  caption:
    "Bölümdeki karşılaştırma tablosu: bazlar halka sayısına göre pürin ve pirimidin, nükleotitler şekere göre DNA ya da RNA. Bir ölçüte tıkla. Beş baz adı, şeker farkıyla sekiz standart nükleotit çeşidi kurar.",
  alt: "Beş satırlı tablo. Şeker: DNA deoksiriboz, RNA riboz. Standart bazlar: DNA A, T, G, C; RNA A, U, G, C. Pürinler: A, G her ikisinde. Pirimidinler: DNA T, C; RNA U, C. Nükleotit çeşidi: dörder.",
  cols: [
    { name: "Ölçüt", w: 3.6 },
    { name: "DNA", w: 3.0 },
    { name: "RNA", w: 3.4 },
  ],
  rows: [
    { cells: ["Şeker", "deoksiriboz", "riboz"], tones: [undefined, "b", "c"], detail: ["Deoksiribozda riboza göre bir oksijen daha azdır; basit çizimde 2′ konumunda DNA için H, RNA için OH."] },
    { cells: ["Standart bazlar", "A, T, G, C", "A, U, G, C"], tones: [undefined, "b", "c"], detail: ["A, G ve C temel hücresel karşılaştırmada ortaktır."] },
    { cells: ["Pürinler", "A, G", "A, G"], tones: [undefined, "a", "a"], detail: ["Adenin ve guanin çift halkalı pürindir."] },
    { cells: ["Pirimidinler", "T, C", "U, C"], tones: [undefined, "b", "c"], detail: ["Sitozin, timin ve urasil tek halkalı pirimidindir."] },
    { cells: ["Nükleotit çeşidi", "4", "4"], tones: [undefined, "b", "c"], detail: ["A/G/C taşıyan RNA nükleotitlerinin şekeri DNA’dakinden farklıdır."] },
  ],
  foot: "Halka sayısı bazın sınıfını gösterir, nükleotidin hangi moleküle ait olduğunu tek başına göstermez.",
});

// 6 · Baz çifti ve hidrojen bağı.
const PAIRS = 10;
const hbonds = drawFig({
  caption:
    "Çift zincirli DNA’da N nükleotit varsa N/2 baz çifti vardır; A–T çifti x, G–C çifti y ise H = 2x + 3y. Örnek molekül 20 nükleotit, 10 baz çifti. Sürgüyle G–C çifti sayısını değiştir. Merdiven şemadır; ölçekli değil.",
  alt: "Yatay iki zincir arasında on basamaklı merdiven. Her basamak bir baz çifti: A–T basamağında iki kısa çizgi, G–C basamağında üç kısa çizgi. Üstte ve altta karşılıklı baz harfleri.",
  h: 3.9,
  param: { label: "G–C çifti", min: 0, max: PAIRS, step: 1, init: 4 },
  draw: (gc) => {
    const els: El[] = [];
    const top = -0.65;
    const bot = -2.05;
    els.push(seg(v(0.3, top), v(9.7, top), { tone: "muted", bold: true }), seg(v(0.3, bot), v(9.7, bot), { tone: "muted", bold: true }));
    for (let i = 0; i < PAIRS; i++) {
      const x = 0.75 + i * 0.95;
      const isGC = i < gc;
      const n = isGC ? 3 : 2;
      for (let k = 0; k < n; k++) {
        const dx = (k - (n - 1) / 2) * 0.13;
        els.push(seg(v(x + dx, top - 0.12), v(x + dx, bot + 0.12), { tone: isGC ? "a" : "b", thin: true }));
      }
      const [a, b] = isGC ? (i % 2 ? ["C", "G"] : ["G", "C"]) : i % 2 ? ["T", "A"] : ["A", "T"];
      els.push(txt(v(x, -0.15), a, "c", { small: true, bold: true, tone: isGC ? "a" : "b" }));
      els.push(txt(v(x, -2.55), b, "c", { small: true, bold: true, tone: isGC ? "a" : "b" }));
    }
    const at = PAIRS - gc;
    const H = 2 * at + 3 * gc;
    lines(els, -3.1, [`x = ${at}, y = ${gc}: H = 2 × ${at} + 3 × ${gc} = ${H}.`], "ink");
    return {
      els,
      readout: [`20 nükleotit → 10 baz çifti. A–T ${at}, G–C ${gc}: H = ${H} (sınırlar 20 ile 30 arası).`, "G sayısı G–C çifti sayısına eşittir; G ile C’yi toplayınca çifti iki kez saymış olursun."],
    };
  },
});

// 7 · Fosfodiester bağlantısı ve topoloji.
const topology = tableFig({
  caption:
    "Fosfodiester bağlantı sayısı molekülün topolojisine bağlıdır. Bir yapıya tıkla. Bu sayım hidrojen bağlarını ve nükleotit içindeki glikozit bağını içermez.",
  alt: "Dört satırlı tablo. Açık uçlu doğrusal tek zincir, n nükleotit: n − 1. İki açık uçlu doğrusal zincir, toplam N: N − 2. Kapalı halkasal tek zincir: n. İki kapalı zincirli DNA: N.",
  cols: [
    { name: "Yapı", w: 4.6 },
    { name: "Bağlantı", w: 1.8 },
    { name: "Neden?", w: 3.6 },
  ],
  rows: [
    { cells: ["Doğrusal tek zincir", "n − 1", "komşular arası, uçlar açık"], tones: [undefined, "a", "muted"], detail: ["Tek nükleotitlik açık zincirde komşu bağlantısı 0’dır; yapı taşının kendi içindeki bağlar ayrıdır."] },
    { cells: ["İki doğrusal zincir", "N − 2", "her zincir n − 1"], tones: [undefined, "a", "muted"], detail: ["İki zincirin bağlantılarını ayrı ayrı topla."] },
    { cells: ["Halkasal tek zincir", "n", "son nükleotit ilkine bağlı"], tones: [undefined, "c", "muted"], detail: ["Kovalent olarak tamamen kapalı zincirde son nükleotit ilkine de bağlanır."] },
    { cells: ["İki kapalı zincir", "N", "her halka n"], tones: [undefined, "c", "muted"], detail: ["Soru doğrusal mı, halkasal mı, açık uç mu diyor; önce bunu işaretle."] },
  ],
  foot: "Hangi bağın sorulduğunu yaz.",
});

// 8 · RNA türleri.
const rnaX = (n: number) => LABEL_W + (n * (BAR_R - LABEL_W)) / 100;
const rnaDraw = () => {
  const els: El[] = [];
  let y = 0;
  y = barRow(els, y, "rRNA %80", [{ len: 80, tone: "a" }], rnaX, "ribozomun yapı ve işlevi; peptit bağında katalitik katkı");
  y = barRow(els, y, "tRNA %15", [{ len: 15, tone: "b" }], rnaX, "amino asidi ribozoma taşır; antikodon");
  y = barRow(els, y, "mRNA %5", [{ len: 5, tone: "c" }], rnaX, "DNA’dan aktarılan bilgi; kodonlar");
  y = axis(els, y + 0.2, [0, 25, 50, 75, 100], rnaX, "%");
  y = lines(els, y, ["Yaklaşık ders şeması; her hücrede her koşulda aynı oran değildir."]);
  return { els, h: -y };
};
const rnaH = rnaDraw().h;
const rna: FigureDef = drawFig({
  caption:
    "Kaynaktaki yaklaşık dağılım rRNA %80, tRNA %15, mRNA %5; çubuklar bu ders şemasıyla ölçeklidir. Her çubuğun altında neyin taşındığı ve hangi işin yapıldığı yazılı. Taşır sözünde taşınan şey bilgi mi, amino asit mi diye sor.",
  alt: "Yüzde ekseninde üç yatay çubuk: rRNA yüzde 80, ribozomun yapı ve işlevi; tRNA yüzde 15, amino asit taşıma ve antikodon; mRNA yüzde 5, bilgi kalıbı ve kodonlar.",
  h: rnaH,
  draw: () => ({ els: rnaDraw().els, readout: ["Üç RNA türü birbirinin yerine geçmez; katlanmış tRNA bölgelerinde hidrojen bağları bulunabilir.", "Oranlar genel ders şemasıdır, ölçüm değildir."] }),
});

export const biologyFigures062Vitamins: Record<string, Record<string, FigureDef>> = {
  vitaminler: {
    "İki çözünürlük grubunu ayrı tut": groups,
    "İşlevi vitamin adıyla eşleştir": functions,
    "D vitamininde deri ve etkinleşme basamaklarını ayır": dSteps,
    "B grubunda yardımcı roller çeşitlidir": bGroup,
    "Besin hazırlamada üç bölmeli miktar hesabı kur": vitC,
    "B12 örneğinde emilim basamaklarını görünür tut": b12,
  },
  "nukleik-asitler": {
    "Üç parçayı birleştir: baz, şeker, fosfat": parts,
    "Bazları iki farklı ölçütle sınıflandır": compare,
    "Üç sayı, üç farklı hesap: nükleotit, baz çifti, hidrojen bağı": hbonds,
    "Fosfodiester sayısında uçları ve topolojiyi unutma": topology,
    "RNA türlerini neyin taşındığı ve hangi işin yapıldığıyla tanı": rna,
  },
};
