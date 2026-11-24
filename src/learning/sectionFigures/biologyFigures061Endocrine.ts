import { type El, type FigureDef } from "./figureKit";
import { A, B, L, R, S, T, chain, lead, mk, tableFig } from "./biologyFigures060Kit";
import { bars, clock, hh } from "./biologyFigures061Kit";

/*
 * AYT Biyoloji · Hipofiz, böbreküstü bezi ve epifiz (Forge061). Bez ve organ
 * çizimleri nitel öğretim şemasıdır, ölçekli değildir; denetim okları yol
 * eşleştirmesidir, tanı ya da tedavi bilgisi değildir. Sayılar bölüm
 * metnindeki örneklerden gelir: kortizol 10 → 16, ACTH 8 → 4 (birimsiz);
 * 22.00–06.00 = 8 saat, 20.00–08.00 = 12 saat; varsayımsal sabit hız 2 sinyal
 * birimi/saat. Melatonin derişimi tahmin edilmez.
 */

/* ---------------- Hipofiz ---------------- */

const lobes = mk({
  caption:
    "Hipofizin iki bölümü (nitel şema, ölçekli değil): ön lob hipotalamustan gelen portal kanla düzenlenir ve kendi hormonlarını sentezler; arka lob hipotalamik nöronların uzantılarıyla ilişkilidir, ADH ve oksitosin orada depolanıp kana salınır.",
  alt: "Üstte hipotalamus kutusu. Sola portal kan oku ön loba, sağa akson oku arka loba iniyor. Ön lobun altında kendi sentezi, arka lobun altında depo ve salım yazılı.",
  h: 330,
  draw: () => {
    const els: El[] = [
      ...B(266, 34, "Hipotalamus", { tone: "a", fill: "a", bold: true }),
      A(220, 58, 136, 150, "c"),
      A(312, 58, 396, 150, "warn", { dash: true }),
      ...B(136, 180, "Ön lob", { w: 190, tone: "c", fill: "c", bold: true }),
      ...B(396, 180, "Arka lob", { w: 190, tone: "warn", fill: "warn", bold: true }),
      ...B(136, 270, "kendi hormonlarını\nsentezler", { w: 220, tone: "c" }),
      ...B(396, 270, "ADH, oksitosin:\ndepo ve salım", { w: 220, tone: "warn" }),
      A(136, 204, 136, 228, "c"),
      A(396, 204, 396, 228, "warn"),
    ];
    els.push(T(160, 96, "portal kan", "w", { tone: "c" }), T(372, 96, "akson", "e", { tone: "warn" }));
    return { els, readout: ["“Hipofizden salgılanır” sözü sentez yerini tek başına açıklamaz.", "Önce bölümü ve hücre türünü, sonra hormonu eşleştir."] };
  },
});

const tropic = tableFig({
  caption:
    "Ön lob hormonu, hedef ve hedefin ürünü (bölüm metninden): tropik hormonlar başka bir bezi düzenler; GH ve prolaktinin doğrudan etkileri de vardır. Hedef bezin hormonu ile onu uyaran hipofiz hormonu ayrı moleküllerdir.",
  alt: "Beş satırlı tablo: TSH tiroidin foliküler hormon yolunu, ACTH adrenal korteksin kortizol yolunu düzenler; FSH ve LH gonadlarda farklı hücreleri etkiler; GH doğrudan metabolik ve IGF-1 aracılı etki gösterir; prolaktin meme bezinde süt sentezini destekler.",
  headers: ["Hormon", "Hedef", "Yol ya da etki"],
  rows: [
    ["TSH", "tiroit", "foliküler\nhormon yolu"],
    ["ACTH", "adrenal korteks", "kortizol yolu"],
    ["FSH, LH", "gonadlar", "farklı hücreler"],
    ["GH", "karaciğer,\ndokular", "doğrudan ve\nIGF-1 aracılı"],
    ["Prolaktin", "meme bezi", "süt sentezi"],
  ],
  readout: ["Bir hedef hormonun önceki merkezleri baskılaması negatif geri bildirimdir.", "ACTH bütün böbreküstü salgılarının tek denetleyicisi değildir."],
});

const milk = mk({
  caption:
    "Süt sentezi ile süt atımı (nitel şema): prolaktin ön lobda sentezlenir ve meme bezinin salgı hücrelerinde süt sentezini destekler; oksitosin hipotalamusta sentezlenip arka lobdan salınır, miyoepitelyal hücrelerin kasılmasıyla mevcut sütü kanallara iter. Aynı organda iki hedef hücre, iki iş.",
  alt: "İki sütun. Solda ön lob, prolaktin, salgı hücresi, süt sentezi. Sağda hipotalamus ve arka lob, oksitosin, miyoepitelyal hücre, süt atımı.",
  h: 330,
  draw: () => {
    const l = chain(
      [
        { label: "Ön lob", tone: "c" },
        { label: "Prolaktin", tone: "c", fill: "c", bold: true },
        { label: "Salgı hücresi", tone: "c" },
        { label: "Süt sentezi", tone: "c", fill: "c" },
      ],
      { cx: 136, w: 230, gap: 26 },
    );
    const r = chain(
      [
        { label: "Hipotalamus →\narka lob", tone: "warn" },
        { label: "Oksitosin", tone: "warn", fill: "warn", bold: true },
        { label: "Miyoepitelyal\nhücre", tone: "warn" },
        { label: "Süt atımı", tone: "warn", fill: "warn" },
      ],
      { cx: 396, w: 230, gap: 14 },
    );
    return { els: [...l.els, ...r.els], readout: ["Atımın azalması sütün hiç sentezlenmediğini göstermez.", "“Süt salgısı” ifadesinde üretim mi atım mı kastedildiğini ayrıca aç."] };
  },
});

const POST = [
  { name: "Sentez", txt: "ADH ve oksitosin hipotalamik nöronların gövdesinde sentezlenir." },
  { name: "Aksonla taşıma", txt: "Hormonlar nöron uzantıları boyunca arka loba taşınır." },
  { name: "Depo ve salım", txt: "Arka lobdaki sinir uçlarından kana salınır." },
  { name: "Hedefler", txt: "ADH böbrekte suyun korunmasına; oksitosin rahim kasılması ve süt atımına katkı verir." },
];
const posterior = mk({
  caption:
    "ADH ve oksitosin arka lobun kendi üretimi değildir (nitel sıra şeması): sentez hipotalamik nöronlarda, taşıma aksonla, depo ve salım arka hipofizde, etki hedef organda. Arka lob hasarı sentezin normal olabilmesiyle çelişmez.",
  alt: "Yukarıdan aşağı dört kutu: hipotalamik nöron, akson, arka lob, hedefler. Hedef satırında ADH için böbrek, oksitosin için rahim ve meme. Seçili adım vurgulu.",
  h: 360,
  steps: POST.map((p) => p.name),
  draw: (_v, step) => {
    const items = [
      { label: "Hipotalamik nöron: sentez" },
      { label: "Akson: taşıma" },
      { label: "Arka lob: depo, salım" },
    ];
    const c = chain(
      items.map((it, i) => ({ ...it, tone: i === step ? ("a" as const) : ("ink" as const), fill: i === step ? ("a" as const) : undefined, bold: i === step })),
      { cx: 266, w: 330, gap: 30 },
    );
    const hi = step === 3;
    const els = [
      ...c.els,
      A(200, c.h - 10, 140, c.h + 40, hi ? "a" : "ink"),
      A(332, c.h - 10, 392, c.h + 40, hi ? "a" : "ink"),
      ...B(140, c.h + 80, "ADH: böbrek,\nsu korunması", { w: 220, tone: hi ? "a" : "ink", fill: hi ? "a" : undefined }),
      ...B(392, c.h + 80, "Oksitosin: rahim,\nsüt atımı", { w: 230, tone: hi ? "a" : "ink", fill: hi ? "a" : undefined }),
    ];
    return { els, readout: [`${step + 1}. ${POST[step].txt}`, "Ön hipofizden ADH yapıldığı eşleştirmesi yanlıştır."] };
  },
});

/* ---------------- Böbreküstü bezi ---------------- */

const gland = mk({
  caption:
    "Böbreküstü bezinin iki bölümü (nitel şema, ölçekli değil): bez böbreğin üstündedir ama nefronun parçası değildir. Dış korteks steroidleri (aldosteron, kortizol, adrenal androjenler), iç medulla katekolaminleri (adrenalin, noradrenalin) üretir.",
  alt: "Altta fasulye biçimli böbrek, üstünde üçgenimsi böbreküstü bezi. Bezin dış katmanı korteks, iç çekirdeği medulla olarak işaretli; yanlarında hormon grupları yazılı.",
  h: 330,
  draw: () => {
    const els: El[] = [
      S([[90, 200], [150, 170], [230, 180], [260, 240], [230, 300], [150, 310], [90, 280], [120, 240]], { bold: true, tone: "muted" }),
      S([[110, 180], [170, 40], [240, 170], [180, 150]], { bold: true, tone: "a", fill: "a" }),
      S([[150, 150], [172, 90], [205, 150], [178, 140]], { tone: "warn", fill: "warn" }),
    ];
    els.push(T(176, 250, "böbrek", "c", { tone: "muted" }));
    els.push(...lead(220, 120, 270, 50, "korteks: steroidler", "a", true));
    els.push(T(270, 80, "aldosteron, kortizol,", "e", { tone: "a" }), T(270, 106, "adrenal androjenler", "e", { tone: "a" }));
    els.push(...lead(178, 126, 270, 170, "medulla:", "warn", true));
    els.push(T(270, 196, "katekolaminler", "e", { tone: "warn", bold: true }), T(270, 226, "adrenalin,", "e", { tone: "warn" }), T(270, 252, "noradrenalin", "e", { tone: "warn" }));
    return { els, readout: ["Korteks ve medulla aynı hormonun iki üretim aşaması değildir.", "Konum adı organ kimliği değildir."] };
  },
});

const HPA = [
  { name: "İleri uyarı", fb: false, txt: "CRH ön hipofizde ACTH yolunu, ACTH adrenal kortekste kortizol salgısını destekler." },
  { name: "Geri baskı", fb: true, txt: "Kortizol hipotalamus ve hipofize baskılayıcı geri etki yapar: negatif geri bildirim." },
];
const hpa = mk({
  caption:
    "Kortizol yolu (nitel denetim şeması): hipotalamik CRH, ön hipofiz ACTH, adrenal korteks kortizol. Kortizolün hipotalamus ve hipofize dönen baskısı negatif geri bildirimdir. Uyaran, hipofiz hormonu ve hedef bez ürünü farklı moleküllerdir.",
  alt: "Yukarıdan aşağı üç kutu: hipotalamus CRH, ön hipofiz ACTH, adrenal korteks kortizol. İkinci adımda kortizolden yukarı iki kesik eksi oku.",
  h: 320,
  steps: HPA.map((h) => h.name),
  draw: (_v, step) => {
    const c = chain(
      [
        { label: "Hipotalamus: CRH", tone: "a" },
        { label: "Ön hipofiz: ACTH", tone: "c" },
        { label: "Adrenal korteks", tone: "b" },
        { label: "Kortizol", tone: "b", fill: "b", bold: true },
      ],
      { cx: 200, w: 250, gap: 30 },
    );
    const els = [...c.els];
    if (HPA[step].fb) {
      els.push(S([[325, 278], [420, 240], [430, 120], [400, 36], [330, 36]], { open: true, dash: true, tone: "warn" }), A(345, 36, 328, 36, "warn"));
      els.push(L(425, 110, 330, 110, { dash: true, tone: "warn" }), A(342, 110, 328, 110, "warn"));
      els.push(T(440, 180, "−", "c", { tone: "warn", bold: true }));
    }
    return { els, readout: [HPA[step].txt, "Önce ileri uyarı okunu, sonra çıktının geri dönüşünü adlandır."] };
  },
});

const twoPoints = mk({
  caption:
    "İki zaman noktasında ters yönlü değişim (bölümdeki varsayımsal veri, birimsiz): kortizol 10'dan 16'ya, ACTH 8'den 4'e değişir. Bu sağlam negatif geri etkiyle uyumludur, ancak iki ölçüm bütün nedenleri kesin belirlemez. Gerçek hormon düzeyi ya da klinik sayı değildir.",
  alt: "İki adım: birinci ve ikinci zaman noktası. Her adımda kortizol ve ACTH için iki yatay çubuk.",
  h: 130,
  steps: ["Birinci zaman", "İkinci zaman"],
  draw: (_v, step) => {
    const k = step === 0 ? 10 : 16;
    const a = step === 0 ? 8 : 4;
    const b = bars(
      [
        { label: "Kortizol", value: k, tone: "b" },
        { label: "ACTH", value: a, tone: "c" },
      ],
      { max: 16 },
    );
    return { els: b.els, readout: [step === 0 ? "Kortizol 10, ACTH 8." : "Kortizol 10 → 16 (artış), ACTH 8 → 4 (azalış): ters yönlü değişim.", "Birim, zaman ve deney koşulu yoksa gerçek düzey karşılaştırması sınırlıdır."] };
  },
});

const compare = tableFig({
  caption:
    "Karşılaştırma tablosunu yeni duruma uygula (bölüm metninden): önce korteks mi medulla mı, sonra ana uyarı yolu, en son hedefteki temel olay. Tablo bir tanı aracı değildir.",
  alt: "Üç satırlı tablo: kortizol korteks, CRH-ACTH, metabolizma; aldosteron korteks, RAAS ve potasyum, mineral-su; katekolamin medulla, sempatik giriş, kısa süreli organ yanıtı.",
  headers: ["Hormon", "Ana uyarı", "Olay"],
  rows: [
    ["Kortizol\n(korteks)", "CRH-ACTH", "metabolizma"],
    ["Aldosteron\n(korteks)", "RAAS,\npotasyum", "mineral-su"],
    ["Katekolamin\n(medulla)", "sempatik\ngiriş", "kısa süreli\nyanıt"],
  ],
  readout: ["Bütün etkiler aynı anda ve aynı ölçüde olmaz; reseptör, süre ve durum önemlidir.", "Üç yolu tek düğmeye bağlama."],
});

const aldo = mk({
  caption:
    "Aldosteron: sodyum ve potasyum ters yönde (nitel şema, ölçekli değil): uygun böbrek koşullarında sodyum geri emilimi ve potasyumun tübül sıvısına salgılanması desteklenir. Suyun izlemesi uygun su geçirgenliğine bağlıdır; aldosteron yeni su üretmez.",
  alt: "Üstte yatay tübül, altta kan. Na+ oku tübülden kana, K+ oku kandan tübüle; su için kesik ok ve koşul notu.",
  h: 260,
  draw: () => {
    const els: El[] = [
      L(20, 40, 512, 40, { bold: true, tone: "c" }),
      L(20, 100, 512, 100, { bold: true, tone: "c" }),
      T(30, 70, "tübül sıvısı", "e", { tone: "c" }),
      L(20, 200, 512, 200, { bold: true, tone: "warn" }),
      T(30, 230, "kan", "e", { tone: "warn" }),
      A(200, 104, 200, 194, "a", { bold: true }),
      A(300, 194, 300, 104, "b", { bold: true }),
      A(410, 104, 410, 194, "muted", { dash: true }),
    ];
    els.push(T(190, 150, "Na⁺", "w", { tone: "a", bold: true }), T(310, 150, "K⁺", "e", { tone: "b", bold: true }), T(420, 136, "su:", "e", { tone: "muted" }), T(420, 164, "koşullu", "e", { tone: "muted" }));
    return { els, readout: ["Sodyum korunması ile potasyum çıkışı ayrı yönlerdir.", "Başlıca düzenleme: renin-anjiyotensin sistemi ve kan potasyumu."] };
  },
});

/* ---------------- Epifiz ---------------- */

const names = tableFig({
  caption:
    "Benzer üç ad, üç farklı kavram (bölüm metninden): melatonin epifizle ilişkili hormon, melanin pigment, MSH melanokortin sinyalleriyle ilişkili ayrı hormon. Ortak heceler aynı molekülü göstermez.",
  alt: "Üç satırlı tablo: melatonin hormon, epifiz, ritim; melanin pigment, deri ve başka dokular; MSH hormon, pigment düzenleme bağlamı.",
  headers: ["Ad", "Tür", "Bağlam"],
  rows: [
    ["Melatonin", "hormon", "epifiz, ritim"],
    ["Melanin", "pigment", "deri ve başka\ndokular"],
    ["MSH", "hormon", "pigment\ndüzenleme"],
  ],
  readout: ["Epifiz melatonininin temel görevi deriyi renklendirmek değildir.", "Her karta molekül türü, kaynak ve ana bağlam yaz."],
});

const lightPath = mk({
  caption:
    "Işık bilgisinin yolu (nitel akış şeması): retina ışığı algılar, bilgi hipotalamustaki suprakiazmatik çekirdeğe ulaşır, epifize sinirsel ve sempatik basamaklarla iletilir. Epifiz kendisine görüntü düşen ikinci bir göz değildir; bu yol portal kanla giden RH/IH yolu da değildir.",
  alt: "Yukarıdan aşağı dört kutu: retina, suprakiazmatik çekirdek, sinirsel ve sempatik basamaklar, epifiz melatonin. Retinadan epifize doğrudan giden kesik ok üzeri çizili.",
  h: 360,
  draw: () => {
    const c = chain(
      [
        { label: "Retina: ışık", tone: "c" },
        { label: "Hipotalamus: SÇN", tone: "a" },
        { label: "Sinirsel, sempatik\nbasamaklar" },
        { label: "Epifiz: melatonin", tone: "b", fill: "b", bold: true },
      ],
      { cx: 170, w: 270, gap: 30 },
    );
    const els = [...c.els];
    els.push(S([[310, 36], [400, 80], [410, 200], [380, 300], [312, 316]], { open: true, dash: true, tone: "muted" }));
    els.push(L(380, 160, 440, 200, { tone: "warn", bold: true }), L(440, 160, 380, 200, { tone: "warn", bold: true }));
    els.push(T(400, 240, "doğrudan", "e", { tone: "warn" }), T(400, 266, "değil", "e", { tone: "warn" }));
    return { els, readout: ["Her ara basamak farklı doku ve iletişim biçimidir.", "Çevresel zamanlayıcı ve iç saat fazı birlikte düşünülür."] };
  },
});

const dur = (s: number, e: number) => (((e - s) % 24) + 24) % 24;
const WIN = [
  { name: "22.00–06.00", s: 22, e: 6 },
  { name: "20.00–08.00", s: 20, e: 8 },
];
const daylen = mk({
  caption:
    "Gece yarısını geçen süre (bölümdeki örnekler, 24 saatlik kadran): 22.00–06.00 penceresi 2 + 6 = 8 saat, 20.00–08.00 penceresi 4 + 8 = 12 saattir. 6 − 22 diye negatif süre sayılmaz. Dilim karanlık süresidir; hormon derişimi değildir.",
  alt: "24 saatlik saat kadranı, 24.00 tepede. Karanlık penceresi dolgulu dilim. İki adım: 22.00–06.00 ve 20.00–08.00.",
  h: 300,
  steps: WIN.map((w) => w.name),
  draw: (_v, step) => {
    const w = WIN[step];
    const before = 24 - w.s;
    const els = [...clock(150, 150, 90, w.s, w.e)];
    els.push(T(316, 110, `başlangıç ${hh(w.s)}`, "e", { tone: "b" }), T(316, 150, `bitiş ${hh(w.e)}`, "e", { tone: "b" }), T(316, 190, `süre ${dur(w.s, w.e)} saat`, "e", { tone: "a", bold: true }));
    return { els, readout: [`${hh(w.s)}–${hh(w.e)}: ${before} + ${w.e} = ${dur(w.s, w.e)} saat karanlık.`, step === 1 ? "12 − 8 = 4 saat daha uzun; hormon toplamının aynı oranda arttığını kanıtlamaz." : "Önce gece yarısına kadar, sonra sabaha kadar say."] };
  },
});

const phase = mk({
  caption:
    "Faz kayması süre değişimi değildir (bölümdeki örnek, 24 saatlik kadran): 22.00–06.00 penceresinin başlangıcı ve bitişi birlikte kaydırılınca dilimin yeri değişir, süresi 8 saat kalır; 3 saat ileri kayma 01.00–09.00 verir. Model kişisel melatonin zamanı ya da dozu belirlemez.",
  alt: "24 saatlik kadran ve sekiz saatlik karanlık dilimi. Sürgü dilimi 0 ile 3 saat arasında ileri kaydırır.",
  h: 300,
  param: { label: "İleri kayma", min: 0, max: 3, step: 1, init: 0, unit: "saat" },
  draw: (k) => {
    const s = 22 + k;
    const e = 6 + k;
    const els = [...clock(150, 150, 90, s, e)];
    els.push(T(316, 90, "pencere:", "e", { tone: "b" }), T(316, 120, `${hh(s)}–${hh(e)}`, "e", { tone: "b", bold: true }), T(316, 160, `faz: ${k} saat ileri`, "e", { tone: "warn" }), T(316, 200, `süre ${dur(s, e)} saat`, "e", { tone: "a", bold: true }));
    return { els, readout: [`${hh(s)}–${hh(e)}: süre ${dur(s, e)} saat; değişen yalnız konum (faz).`, "Başlangıç saatini değiştirmek otomatik olarak süreyi uzatmaz."] };
  },
});

const signal = mk({
  caption:
    "Sinyal alanı yalnız hız varsayımıyla (bölümdeki kurgusal model): karanlıkta sabit 2 sinyal birimi/saat, aydınlıkta 0 kabul edilirse 8 saatlik pencere 16, 12 saatlik pencere 24 birim verir; 24 / 16 = 1,5. Gerçek melatonin ritmi bu dikdörtgen modelle aynı değildir.",
  alt: "Zaman ekseni üzerinde yüksekliği 2 olan dikdörtgen alan. İki adım: 8 saat ve 12 saat. Alanın değeri yazılı.",
  h: 250,
  steps: ["8 saat", "12 saat"],
  draw: (_v, step) => {
    const d = step === 0 ? 8 : 12;
    const x0 = 60;
    const px = 36;
    const yb = 190;
    const els: El[] = [
      A(x0, yb, x0 + 12 * px + 30, yb, "ink", { thin: true }),
      A(x0, yb, x0, 40, "ink", { thin: true }),
      R(x0, yb - 100, x0 + d * px, yb, { tone: "b", fill: "b" }),
      T(x0 + (d * px) / 2, yb - 50, `${d} × 2 = ${d * 2}`, "c", { tone: "b", bold: true }),
      T(x0 - 2, yb - 100, "2", "w", { tone: "muted" }),
      T(x0 + d * px, yb + 26, `${d} saat`, "c", { tone: "muted" }),
      T(x0 + 6, 30, "birim/saat", "e", { tone: "muted" }),
    ];
    return { els, readout: [`Alan = 2 birim/saat × ${d} saat = ${d * 2} sinyal birimi.`, step === 1 ? "24 / 16 = 1,5: yalnız bu kurgusal varsayım altında." : "Hız ile süre farklı büyüklüklerdir; çarpım alanı verir."] };
  },
});

export const biologyFigures061Endocrine: Record<string, Record<string, FigureDef>> = {
  "endokrin-hipofiz": {
    "Küçük bez, farklı kökenli iki bölüm": lobes,
    "Tropik hormon, doğrudan etki ve geri dönüş": tropic,
    "Süt sentezi ile süt atımı aynı iş değildir": milk,
    "ADH ve oksitosini arka lobun kendi üretimi sanma": posterior,
  },
  "endokrin-bobrek-ustu": {
    "Böbreğin üstünde ama böbrekle aynı organ değil": gland,
    "Kortizol yolu: hipotalamus, ACTH ve geri baskı": hpa,
    "Aldosteron: sodyum, potasyum ve su ilişkisi": aldo,
    "Hedef reseptörü, süre ve geri bildirim birlikte": twoPoints,
    "Karşılaştırma tablosunu yeni duruma uygula": compare,
  },
  "endokrin-epifiz": {
    "Benzer üç ad, üç farklı kavram": names,
    "Işık bilgisi doğrudan gözden epifize atlamaz": lightPath,
    "Gün uzunluğu: gece yarısını geçen süre": daylen,
    "Faz kayması süre değişimi değildir": phase,
    "Sinyal alanını ancak hız varsayımı verilince hesapla": signal,
  },
};
