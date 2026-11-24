import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { boardFig, rectEl, stepsFig, timelineFig } from "./historyFigures059Kit";
import { flowEls, flowPickFig, labeledTimeline, type FlowNode } from "./historyFigures061TytKit";
import { pad } from "./biologyFigures059Kit";

/*
 * TYT Tarih · Osmanlı medeniyeti, insanlığın ilk dönemleri, İlk ve Orta
 * Çağlarda Türk dünyası, Türklerin İslamiyeti kabulü (Forge061). Yıllar,
 * adlar, kurum işlevleri ve dönem özellikleri ilgili bölüm metinlerinden ve
 * bölüm tablolarından alınmıştır. Şematik harita gerçek koordinat iddia
 * etmez; çizelgede yalnız eksendeki konumlar ölçeklidir.
 */

/* ---------------- Osmanlı medeniyeti ---------------- */

const CLASS_NODES: FlowNode[] = [
  { c: v(6, 5.0), w: 5.2, s: "Osmanlı toplumu", tone: "muted" },
  { c: v(3.6, 3.2), w: 4.4, h: 1.25, s: "Askerî · yönetenler", tone: "b", what: "Padişahın dinî veya idari yetki tanıdığı yönetenler bütünü; yalnız savaşçılar değil, kadı ve müderris de bu kapsamdadır." },
  { c: v(10.0, 3.2), w: 3.8, h: 1.25, s: "Reaya · yönetilen", tone: "c", what: "Üretim ve vergiyle düzenin sürmesine katkı sağlayan yönetilen nüfus; yalnız bir dinî toplulukla veya köylülerle sınırlı değildir." },
  { c: v(1.8, 1.0), w: 3.6, h: 1.25, s: "Seyfiye · kılıç ehli", tone: "warn", what: "Askerî-idari görevler: vezir, sadrazam, beylerbeyi, sancakbeyi. Savaşta komuta, eyalet yönetimi, güvenlik." },
  { c: v(6.0, 1.0), w: 3.6, h: 1.25, s: "Kalemiye · kalem ehli", tone: "a", what: "Yazışma, mali kayıt, belge ve diplomasi: nişancı, defterdar, reisülküttap." },
  { c: v(10.2, 1.0), w: 3.6, h: 1.25, s: "İlmiye · eğitim, yargı", tone: "b", what: "Eğitim, yargı ve dinî-hukuki görüş: müderris, kadı, müftü, kazasker, şeyhülislam." },
];
const classes = flowPickFig({
  nodes: CLASS_NODES,
  edges: [
    { a: 0, b: 1 },
    { a: 0, b: 2 },
    { a: 1, b: 3 },
    { a: 1, b: 4 },
    { a: 1, b: 5 },
  ],
  caption:
    "Askerî sınıf, padişahın dinî veya idari yetki tanıdığı yönetenler bütünüdür ve seyfiye, kalemiye, ilmiye bu kapsamdadır; reaya üretim ve vergiyle ilişkili yönetilen kesimdir. Kılıçla savaşmayan kadı veya müderris de askerî sınıftandır. Bu, geçmiş toplumun hukuki-idari sınıflamasıdır; bugünün meslek düzeniyle aynı değildir.",
  alt: "Ağaç şeması: üstte Osmanlı toplumu; altında 'Askerî, yönetenler' ve 'Reaya, yönetilen'. Askerî kutusundan üç kola iniliyor: Seyfiye (kılıç ehli), Kalemiye (kalem ehli), İlmiye (eğitim, yargı). Kutular seçilebilir.",
  foot: "Sınıflandırma kişinin her günlük eylemine değil, görevin temel yetkisine dayanır.",
  extra: pad(v(-0.2, 5.8), v(12.2, 0.0)),
});

const ilmiye = boardFig(
  [
    { name: "Müderris", tag: "medresede · ders verir", what: "Ayırıcı işi öğretimdir.", tone: "b" },
    { name: "Kadı", tag: "uyuşmazlığı · karara bağlar, · kayda geçirir", what: "Yargılama ve mahkeme kaydı yanında idari, beledî, mali ve noterlik türü işler de yürütür.", tone: "warn" },
    { name: "Müftü", tag: "fetva: · dinî-hukuki · görüş", what: "Belirli bir soruya dinî-hukuki görüş bildirir; fetva mahkeme hükmüyle aynı belge türü değildir.", tone: "c" },
  ],
  3,
  "İlmiye aynı ailede farklı işlemler taşır: müderris medresede ders verir, kadı uyuşmazlığı karara bağlayıp kayda geçirir, müftü fetva denilen dinî-hukuki görüş bildirir. 'Görüş istedi' diyen metin müftüyü, 'karara bağlayıp kayda geçirdi' diyen metin kadıyı gösterir.",
  "Yan yana üç kutu: Müderris (medresede ders verir), Kadı (uyuşmazlığı karara bağlar, kayda geçirir), Müftü (fetva: dinî-hukuki görüş). Kutular seçilebilir.",
  "Bir görüş kaydı, o görüşün her olayda aynı şekilde hükme dönüştüğünü tek başına göstermez.",
  4.1,
);

const arts = boardFig(
  [
    { name: "Hat", tag: "yazıyı estetik · kurallarla biçimlendirme", what: "Yazıyı estetik kurallarla biçimlendirme sanatı.", tone: "b" },
    { name: "Tezhip", tag: "yazma sayfalarını · bezeme", what: "Özellikle yazma sayfalarını bezeme.", tone: "a" },
    { name: "Minyatür", tag: "resimle · tasvir", what: "Resimle tasvir.", tone: "c" },
    { name: "Çini", tag: "sırlı pişmiş toprak · yüzeylerle bezeme", what: "Sırlı pişmiş toprak yüzeylerle bezeme.", tone: "warn" },
  ],
  2,
  "Sanat dalında eylem ve malzeme birlikte okunur: hat yazıyı estetik kurallarla biçimlendirir, tezhip yazma sayfalarını bezer, minyatür resimle tasvir eder, çini sırlı pişmiş toprak yüzeylerle bezer. Aynı yazmada hat, tezhip ve minyatür birlikte bulunabilir; bu, dalları tek teknik yapmaz.",
  "İki sütunlu dört kutu: Hat (yazıyı estetik kurallarla biçimlendirme), Tezhip (yazma sayfalarını bezeme), Minyatür (resimle tasvir), Çini (sırlı pişmiş toprak yüzeylerle bezeme). Kutular seçilebilir.",
  "Eser sahibi, metnin yazarı, müstensih ve resimleyen sanatçı ayrı görevler üstlenebilir.",
  5.6,
);

/* ---------------- İnsanlığın ilk dönemleri ---------------- */

const STAGES: [string, string, string][] = [
  ["Paleolitik", "Avcılık-toplayıcılık ve yontma taş", "Yalnız mağara yaşamı zorunlu değil"],
  ["Mezolitik", "Bazı bölgelerde mikrolit ve geçiş", "Her yerde aynı tarihte zorunlu basamak değil"],
  ["Neolitik", "Üretim, evcilleştirme ve yerleşme", "Seramikli ve seramiksiz evreler olabilir"],
  ["Kalkolitik", "Bakır ve taşın birlikte kullanımı", "Taşın bütün kullanımının bitmesi değil"],
  ["Tunç", "Alaşımlı metal teknolojisi", "Doğal tek element veya tek sabit reçete değil"],
  ["Demir", "Demir işlemenin yaygınlaşması", "İthal nesne tek başına yerel üretim değil"],
];
const MATS: { s: string; from: number; tone: Tone }[] = [
  { s: "taş", from: 0, tone: "muted" },
  { s: "bakır", from: 3, tone: "warn" },
  { s: "tunç", from: 4, tone: "a" },
  { s: "demir", from: 5, tone: "b" },
];
const materials: FigureDef = {
  caption:
    "Yeni malzemenin görülmesi öncekileri bir anda bitirmez: Kalkolitikte bakırla taş birlikte kullanılabilir, tunç (çoğunlukla bakır ile kalayın alaşımı) ve demir eklendikçe önceki malzemelerin çubukları sürer. Dönemler sıralamadır, eşit süre veya her bölgede aynı tarih değildir; şema ölçekli değil.",
  alt: "Satırlarda yukarıdan aşağıya altı dönem: Paleolitik, Mezolitik, Neolitik, Kalkolitik, Tunç, Demir. Sütunlarda dört malzeme: taş, bakır, tunç, demir. Taş çubuğu ilk dönemden sona kadar, bakır Kalkolitikten, tunç Tunç döneminden, demir Demir döneminden başlayarak aşağı uzanıyor. Adımlarla dönem satırları sırayla açılır.",
  steps: STAGES.map((s) => s[0]),
  draw: (_v, step) => {
    const els: El[] = [];
    const ROW = 0.95;
    const top = 5.4;
    const X0 = 4.0;
    const CW = 2.0;
    MATS.forEach((m, j) => els.push(txt(v(X0 + j * CW + CW / 2, top + 0.55), m.s, "c", { small: true, bold: true })));
    STAGES.forEach(([name], i) => {
      const y = top - i * ROW;
      const on = i <= step;
      els.push(txt(v(X0 - 0.25, y - ROW / 2), name, "w", { small: true, bold: i === step, tone: i === step ? "a" : on ? "ink" : "muted" }));
      els.push(seg(v(0.6, y), v(X0 + 4 * CW, y), { tone: "muted", thin: true, dash: true }));
    });
    els.push(seg(v(0.6, top - 6 * ROW), v(X0 + 4 * CW, top - 6 * ROW), { tone: "muted", thin: true, dash: true }));
    MATS.forEach((m, j) => {
      if (m.from > step) return;
      const x = X0 + j * CW + CW / 2;
      els.push(rectEl(x - 0.35, top - (step + 1) * ROW + 0.08, x + 0.35, top - m.from * ROW - 0.08, { tone: m.tone, fill: m.tone, thin: true }));
    });
    if (step >= 4) els.push(txt(v(X0 + 2 * CW + CW / 2, top - 4 * ROW - ROW / 2), "Cu + Sn", "c", { small: true, bold: true }));
    els.push(...pad(v(0.4, top + 1.0), v(X0 + 4 * CW + 0.2, top - 6 * ROW - 0.3)));
    const [n, f, lim] = STAGES[step];
    return { els, readout: [`${n}: ${f}.`, `Korunan sınır: ${lim}.`] };
  },
};

const VENN: { c: [number, number]; s: string; d: string; lab: [number, number]; tone: Tone }[] = [
  { c: [4.2, 3.4], s: "Tarım", d: "ekim, bakım, hasat", lab: [2.9, 4.3], tone: "c" },
  { c: [7.8, 3.4], s: "Evcilleştirme", d: "nesiller boyu değişim", lab: [9.2, 4.3], tone: "b" },
  { c: [6.0, 0.6], s: "Yerleşiklik", d: "uzun süreli yaşama", lab: [6.0, -0.4], tone: "warn" },
];
const venn: FigureDef = {
  caption:
    "Tarım bitkilerin ekim, bakım ve hasatla üretilmesi; evcilleştirme bitki veya hayvan topluluklarının insan yönetiminde nesiller boyu değişmesi; yerleşiklik bir yerde uzun süreli yaşama biçimidir. Üç küme kesişir ama örtüşmez: tarım yapanlar avcılığı sürdürebilir, bir hayvanı bir kez yakalamak evcilleştirme değildir. Şema ölçekli değil.",
  alt: "Kesişen üç daire: sol üstte Tarım (ekim, bakım, hasat), sağ üstte Evcilleştirme (nesiller boyu değişim), altta Yerleşiklik (uzun süreli yaşama). Dairelerin yalnız bir kısmı ortaktır.",
  draw: () => {
    const els: El[] = [];
    for (const k of VENN) els.push(circle(v(k.c[0], k.c[1]), 2.3, { tone: k.tone, thin: true }));
    for (const k of VENN) els.push(txt(v(k.lab[0], k.lab[1]), k.s, "c", { small: true, bold: true, tone: "ink" }), txt(v(k.lab[0], k.lab[1] - 0.6), k.d, "c", { small: true, tone: "muted" }));
    els.push(...pad(v(1.6, 6.0), v(10.4, -1.9)));
    return { els, readout: ["Bu değişimler ilişkilidir ama her tür ve coğrafyada aynı sırada, aynı tarihte başlamaz.", "Depolama imkânı bütün bireylerin daha sağlıklı veya eşit yaşadığının ölçümü değildir."] };
  },
};

const WRIT: FlowNode[] = [
  { c: v(3.0, 3.6), w: 4.6, s: "Hiyeroglif", tone: "b", what: "Mısır hiyeroglifleri: bir yazı sistemi." },
  { c: v(3.0, 2.4), w: 4.6, s: "Çivi yazısı", tone: "b", what: "Mezopotamya çivi yazısı; erken Sümer örnekleri MÖ 4. binyıl sonlarındaki Uruk kayıtlarıyla ilişkilidir." },
  { c: v(3.0, 1.2), w: 4.6, s: "Fenike alfabesi", tone: "b", what: "Alfabe geleneği; Fenike, Yunan ve Latin gelenekleri etkileşimlidir ama işaretler değişmeden kalmadı." },
  { c: v(9.0, 3.9), w: 4.0, s: "Kil", tone: "warn", what: "İşaretlerin bırakıldığı yüzey; çivi yazısı kil yüzeye bırakılır." },
  { c: v(9.0, 2.8), w: 4.0, s: "Papirüs", tone: "warn", what: "İşaretlerin yazıldığı malzeme." },
  { c: v(9.0, 1.7), w: 4.0, s: "Parşömen", tone: "warn", what: "İşaretlerin yazıldığı malzeme." },
  { c: v(9.0, 0.6), w: 4.0, s: "Kâğıt", tone: "warn", what: "İşaretlerin yazıldığı malzeme." },
];
const writing = flowPickFig({
  nodes: WRIT,
  edges: [],
  caption:
    "Sistem ile yüzey aynı sınıflama değildir: Mısır hiyeroglifleri, Mezopotamya çivi yazısı ve Fenike alfabe geleneği yazı sistemleridir; kil, papirüs, parşömen ve kâğıt işaretlerin yazıldığı malzemelerdir. Alfabe, her işaretin tek sese karşılık gelmediği sistemlerden ayrılır.",
  alt: "İki çerçeve. Solda 'yazı sistemi': Hiyeroglif, Çivi yazısı, Fenike alfabesi. Sağda 'yazı yüzeyi': Kil, Papirüs, Parşömen, Kâğıt. Kutular seçilebilir.",
  foot: "Ekonomik kaydın varlığı bütün metinlerin yalnız ekonomi için yazıldığı anlamına gelmez.",
  extra: [
    rectEl(0.3, 0.5, 5.7, 4.5, { tone: "b", thin: true, dash: true }),
    rectEl(6.6, 0.0, 11.4, 4.75, { tone: "warn", thin: true, dash: true }),
    txt(v(3.0, 4.65), "yazı sistemi", "n", { small: true, tone: "muted" }),
    txt(v(9.0, 4.9), "yazı yüzeyi", "n", { small: true, tone: "muted" }),
    ...pad(v(0.0, 5.6), v(11.7, -0.3)),
  ],
});

const meso = boardFig(
  [
    { name: "Sümer", tag: "şehir devletleri · çivi yazısı, ziggurat", what: "Şehir devletleri, erken çivi yazısı ve zigguratlarla ilişkili tapınak ekonomisi.", tone: "b" },
    { name: "Akad", tag: "daha geniş · siyasi egemenlik", what: "Daha geniş siyasi egemenlik.", tone: "c" },
    { name: "Babil", tag: "Babil merkezi · Hammurabi derlemesi", what: "Babil merkezi ve Hammurabi hukuk derlemesi.", tone: "a" },
    { name: "Asur", tag: "askerî yayılma · Anadolu ile ticaret", what: "Askerî yayılma ve Anadolu ile ticari bağlar.", tone: "warn" },
  ],
  2,
  "Mezopotamya tek devlet adı değil, Dicle ve Fırat çevresinde farklı dönemlerde Sümer, Akad, Babil ve Asur gibi oluşumların bulunduğu bölgedir. Her birinin öne çıkan öğretim bağlantısı farklıdır. Ziggurat basamaklı tapınak yapısıdır; yalnız hükümdar mezarı değildir.",
  "İki sütunlu dört kutu: Sümer (şehir devletleri; çivi yazısı, ziggurat), Akad (daha geniş siyasi egemenlik), Babil (Babil merkezi; Hammurabi derlemesi), Asur (askerî yayılma; Anadolu ile ticaret). Kutular seçilebilir.",
  "Kutuların sırası bir yükseliş merdiveni değildir; aynı bölgenin farklı oluşumlarıdır.",
  5.6,
);

/* ---------------- İlk ve Orta Çağlarda Türk dünyası ---------------- */

const states = labeledTimeline({
  events: [
    { y: -209, t: "MÖ 209", s: "Mete Han", what: "Asya Hunları: Mete Han'ın yönetimi alması; onlu teşkilat ve geniş siyasi birlik bağlamı.", tone: "warn" },
    { y: 552, t: "552", s: "Bumin", what: "I. Kök Türk: Türk adının devlet adı olarak kullanılmasıyla ayırt edilir.", tone: "b" },
    { y: 682, t: "682", s: "Kutluk/İlteriş", what: "II. Kök Türk: yeniden bağımsız siyasi örgütlenme; I. Kök Türk kuruluşundan ayrı gelişme.", tone: "b" },
    { y: 744, t: "744", s: "Uygur Kağanlığı", what: "Uygur Kağanlığı; şehir, sulama, tarım ve yazılı işlemlerle izlenen şehirli hayat.", tone: "c" },
    { y: 840, t: "840", s: "yeni merkezler", what: "840 sonrasındaki yeni merkezlerde süren faaliyetler, siyasi kopuşla kültürel devamın birlikte bulunabileceğini gösterir.", tone: "c" },
  ],
  a0: -300,
  a1: 900,
  ticks: [
    { y: -200, t: "MÖ 200" },
    { y: 200, t: "200" },
    { y: 400, t: "400" },
    { y: 600, t: "600" },
    { y: 800, t: "800" },
  ],
  caption:
    "Hun, Kök Türk ve Uygur aynı kesintisiz devletin farklı adları değildir: MÖ 209 Mete Han, 552 Bumin (I. Kök Türk), 682 Kutluk/İlteriş (II. Kök Türk), 744 Uygur Kağanlığı. MÖ tarihlerde sayı büyüdükçe daha eskiye gidilir. Eksendeki boşluklar yıl farkıyla orantılıdır.",
  alt: "Yatay yıl ekseni MÖ 300'den MS 900'e. Beş satır: MÖ 209 Mete Han, 552 Bumin, 682 Kutluk/İlteriş, 744 Uygur Kağanlığı, 840 yeni merkezler. Noktaların konumu yıl farkıyla orantılı.",
  foot: "Devletin siyasi sonu ile topluluğun, dilin ve kültürün sonu aynı tarih olmak zorunda değildir.",
});

const UNITS = ["on", "yüz", "bin", "on bin"];
const decimal: FigureDef = {
  caption:
    "Onlu askerî düzende birlikler on, yüz, bin ve on bin kademeleriyle örgütlenir: her kademe bir alttaki birlikten onunu toplar. Adımla bir kademe yukarı çık; on kutu her seferinde bir alt birliktir, kutu boyu ölçek değildir.",
  alt: "On kutudan oluşan bir sıra. Her kutunun içinde bir alt kademenin asker sayısı yazılı; altında toplam. Adımlarla kademe 10, 100, 1000, 10000 olur.",
  steps: UNITS.map((u) => `${u}lu birlik`),
  draw: (_v, step) => {
    const sub = 10 ** step;
    const total = sub * 10;
    const els: El[] = [];
    for (let i = 0; i < 10; i++) {
      const x = i * 1.18;
      els.push(rectEl(x, 0, x + 1.0, 1.0, { tone: "b", fill: "b", thin: true }));
    }
    els.push(txt(v(5.81, 1.25), `her kutu: ${sub.toLocaleString("tr-TR")} asker`, "n", { small: true, tone: "muted" }));
    els.push(txt(v(5.81, -0.3), `10 × ${sub.toLocaleString("tr-TR")} = ${total.toLocaleString("tr-TR")}`, "s", { small: true, bold: true, tone: "a" }));
    els.push(...pad(v(-0.2, 2.2), v(11.8, -1.3)));
    return { els, readout: [`${UNITS[step]} kademesi: 10 × ${sub.toLocaleString("tr-TR")} = ${total.toLocaleString("tr-TR")} asker.`, "Teşkilat bütün askerlerin aynı silahı taşıdığını veya her savaşın kazanıldığını göstermez."] };
  },
};

const LEVELS: [string, string][] = [
  ["il", "devlet"],
  ["budun", "boylar topluluğu"],
  ["boy", "siyasi-toplumsal birlik"],
  ["urug", "aileler birliği"],
  ["oguş", "aile"],
];
const nesting: FigureDef = {
  caption:
    "Ders şemasında oguş aileyi, urug aileler birliğini, boy siyasi-toplumsal birliği, budun daha geniş boylar topluluğunu, il devleti anlatır. İç içe kutular örgütlenme düzeylerini gösterir; bütün toplulukların aynı tarihte aynı basamaklardan geçtiği bir gelişme yasası değildir. Bir düzeye tıkla.",
  alt: "Beş iç içe kutu, dıştan içe: il (devlet), budun (boylar topluluğu), boy (siyasi-toplumsal birlik), urug (aileler birliği), oguş (aile). Terim solda, anlamı kutunun içinde.",
  picks: LEVELS.map(([t, m]) => ({ label: t, title: `${t}: ${m}`, detail: [`${t}: ${m}.`, "Şema örgütlenme düzeyini ayırt eder; kesintisiz gelişme yasası değildir."] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const H = 0.85;
    LEVELS.forEach(([t, m], i) => {
      const on = pick === i;
      const x0 = 2.4 + i * 0.4;
      const x1 = 11.6 - i * 0.4;
      const y1 = 4.6 - i * H;
      const y0 = 0.1 + i * 0.14;
      els.push(rectEl(x0, y0, x1, y1, { tone: on ? "a" : i % 2 ? "c" : "b", fill: on ? "a" : undefined, thin: !on, bold: on }));
      els.push(txt(v(2.25, y1 - H / 2), t, "w", { small: true, bold: true, tone: on ? "a" : "ink", pick: i }));
      els.push(txt(v((x0 + x1) / 2, y1 - H / 2), m, "c", { small: true, tone: on ? "a" : "ink" }));
    });
    els.push(...pad(v(0.6, 4.8), v(11.8, 0.0)));
    const sel = pick >= 0 ? LEVELS[pick] : undefined;
    return { els, readout: [sel ? `${sel[0]}: ${sel[1]}.` : "Bir terime tıkla ya da aşağıdan seç.", "Güçlü boyların ayrılması merkezî düzeni zorlayabilir."] };
  },
};

const migration = timelineFig({
  events: [
    { y: 375, s: "Kavimler Göçü", what: "Geleneksel dönüm noktası; Hunların batıya yönelmesi.", tone: "warn" },
    { y: 395, s: "Roma'nın ayrılması", what: "375 ile aynı olay değildir.", tone: "b" },
    { y: 476, s: "Batı Roma'nın sonu", what: "Batı Roma'nın siyasi sonu; göç baskısı ilişkilidir ama tek ve yeterli açıklama değildir.", tone: "b" },
  ],
  a0: 360,
  a1: 490,
  ticks: [375, 400, 425, 450, 475],
  caption:
    "375 Kavimler Göçü'nün geleneksel dönüm noktası, 395 Roma'nın ayrılması, 476 Batı Roma'nın siyasi sonudur: üç ayrı olay. Göç baskısı bu dönüşümlerle ilişkilidir, ama tek ve yeterli açıklama olarak kullanılmaz.",
  alt: "Yatay yıl ekseni 360–490. Üç satır: 375 Kavimler Göçü, 395 Roma'nın ayrılması, 476 Batı Roma'nın sonu.",
  foot: "Uldız ve Attila dönemleri farklı siyasi koşullar taşır.",
});

/* ---------------- Türklerin İslamiyeti kabulü ---------------- */

const levels = boardFig(
  [
    { name: "Temas", tag: "karşılaşma", what: "Temas etmek sürecin bir parçasıdır; din değişimi kanıtı değildir.", tone: "muted" },
    { name: "Hizmet", tag: "orduda görev", what: "Abbasi ordusunda görev askerî-idari ilişkiyi gösterir.", tone: "b" },
    { name: "İttifak", tag: "savaşta destek", what: "Bir boyun savaşta desteği belirli karşılaşmadaki ittifakı anlatır.", tone: "c" },
    { name: "Birey", tag: "din değiştirme", what: "Kişinin dini açıkça belirtilmişse bu bilgi o kişiye aittir; bütün nüfusa taşınmaz.", tone: "a" },
    { name: "Devlet", tag: "resmî karar", what: "Devletin resmî kararı; yerel toplulukların yaygın uygulaması için başka kayıtlar gerekir.", tone: "warn" },
  ],
  3,
  "Temas etmek, orduda görev almak, askerî ittifak kurmak, bireyin din değiştirmesi ve devletin resmî kararı farklı kanıt düzeyleridir. Her biri sürecin bir parçasına ışık tutar; hükümdarın tercihi için bir belge, yerel toplulukların uygulaması için başka kayıtlar gerekir.",
  "Beş kutu (üç üstte, iki altta): Temas (karşılaşma), Hizmet (orduda görev), İttifak (savaşta destek), Birey (din değiştirme), Devlet (resmî karar). Kutular seçilebilir.",
  "İlişkinin türü önce verilen eylemden belirlenir.",
  3.9,
);

const talas = stepsFig({
  items: [
    { s: "VII. yy Sasani çözülmesi", what: "Maveraünnehir çevresindeki mücadeleler temasların zeminindedir." },
    { s: "Emevi dönemi çatışmaları", what: "Çatışmalar ve dışlayıcı uygulamalar ilişkilerin bazı yönlerini zorlaştırdı.", tone: "warn" },
    { s: "750 Abbasi yönetimi", what: "Talas'ın hangi siyasi dönemde olduğunu ayırmaya yardım eder.", tone: "b" },
    { s: "751 Talas", what: "Abbasi ordusu ile Tang kuvvetleri karşılaştı; Karluklar Abbasi tarafını destekledi.", tone: "b" },
    { s: "Sonraki yüzyıllar", what: "Yerel kabul yolları ayrıca incelenir; ittifak bütün boyların aynı anda din değiştirmesi değildir." },
  ],
  caption:
    "Talas bir zincirin halkasıdır: VII. yüzyılda Sasani hâkimiyetinin çözülmesi, Emevi dönemindeki çatışmalar, 750'de Abbasi yönetiminin başlaması, 751'de Abbasi ordusu ile Tang kuvvetlerinin karşılaşması (Karluklar Abbasi tarafında) ve sonraki yüzyıllardaki yerel kabul yolları.",
  alt: "Yukarıdan aşağıya beş kutu: VII. yy Sasani çözülmesi, Emevi dönemi çatışmaları, 750 Abbasi yönetimi, 751 Talas, Sonraki yüzyıllar.",
  foot: "Bir ittifakın sonucu bütün boyların aynı anda din değiştirmesi değildir.",
  w: 7,
});

const FACT: FlowNode[] = [
  { c: v(2.4, 4.9), w: 4.6, s: "Ticaret", tone: "b" },
  { c: v(8.8, 4.9), w: 6.0, h: 1.25, s: "düzenli karşılaşma · ortak iş, güven", tone: "c" },
  { c: v(2.4, 2.95), w: 4.6, s: "Öğreticiler", tone: "b" },
  { c: v(8.8, 2.95), w: 6.0, h: 1.25, s: "yeni inancın · tanınması", tone: "c" },
  { c: v(2.4, 1.0), w: 4.6, s: "Kapsayıcı siyaset", tone: "b" },
  { c: v(8.8, 1.0), w: 6.0, h: 1.25, s: "görev ve katılım · engeli azalır", tone: "c" },
  { c: v(2.4, -0.95), w: 4.6, s: "Benzerlikler", tone: "b" },
  { c: v(8.8, -0.95), w: 6.0, h: 1.25, s: "yaratıcı ve ahlak · anlayışında", tone: "c" },
];
const factors: FigureDef = {
  caption:
    "Etkeni söylemek yetmez, nasıl etkilediğini yaz: ticaret düzenli karşılaşma, ortak iş ve güven ilişkileri kurabilir; öğreticiler yeni inancın tanınmasına yardım edebilir; kapsayıcı siyasi yaklaşım görev ve katılım engellerini azaltabilir; ders kaynakları Gök Tanrı inancıyla bazı yaratıcı ve ahlak benzerliklerini de kolaylaştırıcı sayar.",
  alt: "Dört satır, solda etken sağda mekanizma, aralarında ok: Ticaret → düzenli karşılaşma, ortak iş, güven; Öğreticiler → yeni inancın tanınması; Kapsayıcı siyaset → görev ve katılım engeli azalır; Benzerlikler → yaratıcı ve ahlak anlayışında.",
  draw: () => {
    const els = [
      ...flowEls(FACT, [
        { a: 0, b: 1 },
        { a: 2, b: 3 },
        { a: 4, b: 5 },
        { a: 6, b: 7 },
      ]),
      txt(v(2.4, 6.0), "etken", "n", { small: true, tone: "muted" }),
      txt(v(8.8, 6.0), "nasıl etkiler?", "n", { small: true, tone: "muted" }),
      ...pad(v(-0.1, 6.7), v(12.1, -2.0)),
    ];
    return { els, readout: ["Bu mekanizmalar aynı bölgede birlikte işleyebilir.", "Benzerlik bütün öğreti, ibadet ve hukuk esaslarının aynı olduğu anlamına gelmez."] };
  },
};

const regions: FigureDef = {
  caption:
    "Şematik harita, ölçekli değil ve gerçek koordinat iddiası yok: Maveraünnehir Ceyhun (Amuderya) ile Seyhun (Siriderya) arasındaki tarihsel bölgedir; Horasan İran'ın doğusu ve çevresindeki geniş alanlarla, İdil (Volga) daha kuzeybatıdaki başka bir nehir sahasıyla ilişkilidir. Bu adlar günümüz sınırlarıyla birebir örtüşmez.",
  alt: "Şematik harita. Sağda soldan sağa uzanan iki nehir: üstte Seyhun/Siriderya, altta Ceyhun/Amuderya; aralarında Maveraünnehir yazısı. Ceyhun'un güneybatısında Horasan, haritanın sol üst köşesinde kuzeye uzanan İdil (Volga) nehri. Sağ üstte kuzey oku.",
  draw: () => {
    const els: El[] = [];
    const seyhun = [v(5.4, 3.7), v(7.0, 3.9), v(8.6, 4.3), v(10.4, 4.7), v(11.6, 5.3)];
    const ceyhun = [v(5.0, 1.5), v(6.8, 1.6), v(8.4, 1.9), v(10.2, 2.4), v(11.6, 2.6)];
    const idil = [v(1.6, 0.4), v(1.9, 1.6), v(1.4, 2.8), v(2.0, 4.0), v(1.7, 5.4)];
    els.push(poly(seyhun, { tone: "b", open: true, smooth: true, bold: true }), poly(ceyhun, { tone: "b", open: true, smooth: true, bold: true }), poly(idil, { tone: "b", open: true, smooth: true, bold: true }));
    els.push(txt(v(8.4, 4.5), "Seyhun / Siriderya", "n", { small: true, tone: "b" }), txt(v(8.4, 1.7), "Ceyhun / Amuderya", "s", { small: true, tone: "b" }));
    els.push(txt(v(8.4, 3.05), "Maveraünnehir", "c", { bold: true, tone: "a" }));
    els.push(txt(v(5.6, 0.3), "Horasan", "c", { bold: true, tone: "warn" }), txt(v(5.6, -0.3), "İran'ın doğusu", "c", { small: true, tone: "muted" }));
    els.push(txt(v(2.2, 3.3), "İdil (Volga)", "e", { bold: true, tone: "c" }), txt(v(2.2, 2.7), "kuzeybatı", "e", { small: true, tone: "muted" }));
    els.push(vec(v(11.3, 0.3), v(11.3, 1.3), { tone: "muted", thin: true }), txt(v(11.3, 1.4), "K", "n", { small: true, bold: true, tone: "muted" }));
    els.push(...pad(v(0.6, 6.0), v(12.0, -0.9)));
    return { els, readout: ["Bir bölgedeki tüccar teması başka bölgenin resmî kabul tarihi değildir.", "Haritada okların yönü kadar hangi tarihte hangi topluluğun hangi ilişkisinin gösterildiğini de oku."] };
  },
};

export const historyFigures061TytEarly: Record<string, Record<string, FigureDef>> = {
  "osmanli-medeniyeti": {
    "Askerî sınıf sözü yalnız savaşçıyı anlatmaz": classes,
    "İlmiye: ders, hüküm ve görüşü ayır": ilmiye,
    "Kurum sorusunu ad değil eylem çözer": arts,
  },
  "insanligin-ilk-donemleri": {
    "Taş ve maden dönemlerini bölgesel özelliklerle öğren": materials,
    "Tarım, evcilleştirme ve yerleşiklik aynı kavram değildir": venn,
    "Yazı araçları ile yazı sistemlerini ayrı karşılaştır": writing,
    "Mezopotamya tek devlet adı değildir": meso,
  },
  "ilk-turk-dunyasi": {
    "Devletleri tarih ve belgeyle ayır": states,
    "İkili idare ve askeri örgütlenme": decimal,
    "Oguş, urug, boy, budun ve il": nesting,
    "Kavimler Göçü ve Avrupa Hunları": migration,
  },
  "turklerin-islamiyeti-kabulu": {
    "Bir tarih değil, uzun bir süreç": levels,
    "Talas’ın önceki ve sonraki halkaları": talas,
    "Etkeni söylemek yetmez, nasıl etkilediğini açıkla": factors,
    "Maveraünnehir, Horasan ve İdil aynı yer değildir": regions,
  },
};

