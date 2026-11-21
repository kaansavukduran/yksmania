import { fmt, type El, type FigureDef, type Tone } from "./figureKit";
import { A, B, C, L, R, S, T, chain, mk, table, tableFig } from "./biologyFigures060Kit";

/*
 * AYT Biyoloji · Genetik çeşitlilik, biyoteknoloji, kalıtım molekülünün
 * keşfi ve fermantasyon (Forge060). Hücre ve molekül çizimleri nitel
 * şemadır, ölçekli değildir. Sayılar bölümlerden gelir: 2ʰ gamet türü,
 * ideal PCR N = N₀·2ᵏ, Chargaff eşitlikleri, glikolizde 4 − 2 = 2 ATP,
 * glikoz başına 2 NADH, 2 etanol + 2 CO₂ ve 2 laktat.
 */

/** Üs yazımı: 2 ve 10 → "2¹⁰". */
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const pow2 = (k: number) => `2${String(k).replace(/\d/g, (d) => SUP[+d])}`;

/* ---------------- Genetik çeşitlilik ---------------- */

const lineage = mk({
  caption:
    "Değişikliğin bulunduğu hücre soyunu izle (olağan insan eşeyli üremesi için nitel şema): deri gibi somatik bir hücredeki değişiklik yalnız o soyda kalır, bu yoldan gamete geçmez. Gamet öncülü soyundaki değişiklik aktarılabilir; ama varyantı taşıyan gametin döllenmeye katılması gerekir. Bitkilerde ve eşeysiz üremede durum farklı olabilir.",
  alt: "Üstte zigot kutusu, ondan iki kol. Solda somatik soy: deri hücresinde değişiklik, yalnız bu soyda kalır. Sağda üreme hücresi soyu: gamet öncülünde değişiklik, gamet, döllenmeye katılırsa yeni zigotta.",
  h: 384,
  draw: () => {
    const els: El[] = [...B(266, 30, "Zigot", { w: 140, bold: true }), A(230, 52, 140, 92, "muted"), A(302, 52, 392, 92, "muted")];
    const l = chain([{ label: "Somatik soy:\nderi hücresi", tone: "muted" }, { label: "Değişiklik", tone: "warn" }, { label: "Yalnız bu soyda\n(mozaik olabilir)", tone: "muted", fill: "muted" }], { cx: 130, w: 220, y0: 96, gap: 22 });
    const r = chain([{ label: "Gamet öncülü\nsoyu", tone: "a" }, { label: "Değişiklik", tone: "warn" }, { label: "Gamet", tone: "a" }, { label: "Döllenirse\nzigotta", tone: "a", fill: "a" }], { cx: 400, w: 220, y0: 96, gap: 14 });
    return { els: [...els, ...l.els, ...r.els], readout: ["'Aktarılabilir' garanti demek değildir.", "Bir hücredeki mutasyon ile bütün bireyin genotipi aynı kapsam değildir."] };
  },
});

const XO = ["Homolog çift", "Parça değişimi", "Dört kromatit"];
const crossing = mk({
  caption:
    "Rekombinasyon mevcut alelleri yeniden birleştirir (nitel şema, ölçekli değil): profaz I'de kardeş olmayan kromatitler arasında A ile B lokusları arasındaki parça değişimi AB ve ab yanında Ab ve aB birleşimlerini verir. A, a, B ve b alellerinin hepsi önceden vardı; yeni olan birlikteliktir.",
  alt: "Dört yatay kromatit: üstteki ikisi A ve B, alttaki ikisi a ve b taşıyor. İkinci adımda ortadaki iki kromatit arasında çapraz işaret; üçüncü adımda bu iki kromatitin sağ parçaları yer değiştirmiş: Ab ve aB.",
  h: 300,
  steps: XO,
  draw: (_v, step) => {
    const ys = [60, 110, 190, 240];
    const top: Tone = "a";
    const bot: Tone = "c";
    const els: El[] = [];
    const xA = 140;
    const xB = 400;
    const swap = step === 2;
    ys.forEach((y, i) => {
      const leftT = i < 2 ? top : bot;
      let rightT = leftT;
      if (swap && i === 1) rightT = bot;
      if (swap && i === 2) rightT = top;
      els.push(L(50, y, 266, y, { bold: true, tone: leftT }), L(266, y, 480, y, { bold: true, tone: rightT }));
      els.push(T(xA, y - 18, leftT === top ? "A" : "a", "c", { bold: true, tone: leftT }), T(xB, y - 18, rightT === top ? "B" : "b", "c", { bold: true, tone: rightT }));
      if (swap && (i === 1 || i === 2)) els.push(T(505, y, "R", "c", { bold: true, tone: "warn" }));
    });
    els.push(C(266, 85, 6, { tone: top, fill: top }), C(266, 215, 6, { tone: bot, fill: bot }));
    if (step === 1) els.push(L(250, 100, 282, 200, { tone: "warn", bold: true }), L(282, 100, 250, 200, { tone: "warn", bold: true }), T(330, 150, "A ile B arasında", "e", { tone: "warn" }));
    if (step === 2) els.push(T(330, 150, "R: rekombinant", "e", { tone: "warn" }));
    const combos = step === 2 ? "AB, Ab, aB, ab" : "AB, AB, ab, ab";
    return { els, readout: [`${step + 1}. ${XO[step]}: kromatitlerdeki birleşimler ${combos}.`, "Kromozomun başka bölümündeki parça değişimi seçilen iki lokusun birlikte aktarımını mutlaka değiştirmez."] };
  },
});

const GENES = ["A", "B", "C", "D"];
const gametes = (h: number): string[] => {
  let out = [""];
  for (let i = 0; i < h; i++) out = out.flatMap((g) => [g + GENES[i], g + GENES[i].toLowerCase()]);
  return out;
};
const assortment = mk({
  caption:
    "Bağımsız dağılım (bölümdeki model): h, birbirinden bağımsız ayrılan heterozigot gen çifti sayısıdır ve teorik gamet genotipi sayısı 2ʰ'dir. AaBb dört, AaBbCc sekiz tür verir; bu tek bir mayozun ürün sayısı değildir. Bağlı AB/ab ve aralarında parça değişimi yoksa yalnız AB ve ab beklenir.",
  alt: "Sürgüyle heterozigot gen çifti sayısı 1 ile 4 arasında seçilir; altta olası gamet genotipleri kutular hâlinde listelenir.",
  h: 280,
  param: { label: "Bağımsız heterozigot çift (h)", min: 1, max: 4, step: 1, init: 2 },
  draw: (h) => {
    const g = gametes(h);
    const genotype = GENES.slice(0, h).map((x) => x + x.toLowerCase()).join("");
    const els: El[] = [T(266, 22, `${genotype}: ${pow2(h)} = ${g.length} gamet türü`, "c", { bold: true })];
    g.forEach((s, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      els.push(...B(70 + col * 130, 76 + row * 52, s, { w: 112, h: 40, tone: "a" }));
    });
    return { els, readout: [`${h} bağımsız heterozigot çift → 2ʰ = ${g.length} teorik gamet türü.`, "Baskın alel gamete zorunlu üstünlükle gitmez; A veya a, B veya b ayrı seçilir."] };
  },
});

const fertilization = mk({
  caption:
    "Döllenme iki örnek uzayını birleştirir (nitel şema): Ab gameti ile aB gameti birleşirse seçilen lokuslar için AaBb zigotu oluşur. Bunun için yeni alel gerekmez; yeni olan genotip birleşimidir. Bir gamet türünün mümkün olması her doğumda seçileceği anlamına gelmez.",
  alt: "Solda Ab gameti, sağda aB gameti; iki oktan ortada aşağıdaki AaBb zigotu kutusuna ulaşılıyor.",
  h: 260,
  draw: () => {
    const els: El[] = [
      C(110, 70, 46, { tone: "a", fill: "a" }),
      T(110, 70, "Ab", "c", { bold: true }),
      C(422, 70, 46, { tone: "c", fill: "c" }),
      T(422, 70, "aB", "c", { bold: true }),
      T(110, 140, "1. ebeveyn gameti", "c", { tone: "a" }),
      T(422, 140, "2. ebeveyn gameti", "c", { tone: "c" }),
      A(150, 100, 236, 186, "a"),
      A(382, 100, 296, 186, "c"),
      ...B(266, 214, "Zigot: AaBb", { bold: true, w: 180 }),
    ];
    return { els, readout: ["Genotipin yeni birleşimi ile DNA dizisinde yeni varyant oluşumu aynı çıkarım değildir.", "Olasılık hesabında gametlerin oluşma ve birleşme olasılıkları ayrıca verilmelidir."] };
  },
});

/* ---------------- Biyoteknoloji ---------------- */

const pcr = mk({
  caption:
    "PCR ideal sayım modeli (bölümdeki varsayım: başlangıçta iki ucu belirli tam hedef çift DNA, bütün koşullar ideal): her döngü ayrılma, primer bağlanması ve uzama ile kopya sayısını ikiye katlar, N = N₀·2ᵏ. Çubuklar log₂ ölçeklidir. Gerçek örnekte verim ve madde sınırı bu büyümeyi değiştirir.",
  alt: "Üstte üç kutulu döngü: ayrılma, primer bağlanması, uzama. Altta döngü sayısına göre yükselen çubuklar; düşey eksen log₂ N. Sürgü döngü sayısını 0 ile 10 arasında seçer.",
  h: 330,
  param: { label: "Döngü sayısı (k)", min: 0, max: 10, step: 1, init: 3 },
  draw: (k) => {
    const els: El[] = [
      ...B(90, 26, "Ayrılma", { w: 150, tone: "warn" }),
      ...B(266, 26, "Primer bağlanır", { w: 170, tone: "b" }),
      ...B(442, 26, "Uzama", { w: 150, tone: "c" }),
      A(166, 26, 180, 26, "muted"),
      A(352, 26, 366, 26, "muted"),
    ];
    const base = 300;
    els.push(L(30, base, 520, base, { thin: true, tone: "muted" }), T(36, 82, "log₂ N", "e", { tone: "muted" }));
    for (let i = 0; i <= k; i++) {
      const x = 46 + i * 43;
      els.push(R(x, base - 18 - i * 18, x + 30, base, { tone: i === k ? "a" : "c", fill: i === k ? "a" : "c" }));
    }
    els.push(T(46 + k * 43 + 15, base - 36 - k * 18, `${pow2(k)} = ${fmt(2 ** k, 0)}`, k > 7 ? "w" : "c", { bold: true, tone: "a" }));
    return { els, readout: [`N₀ = 1 hedef çift DNA ile k = ${k}: N = 1 · ${pow2(k)} = ${fmt(2 ** k, 0)} kopya (ideal model).`, "DNA miktarını artırmak protein üretmek değildir."] };
  },
});

const controls = tableFig({
  caption:
    "Kontroller sonuçtan önce gelir (bölüm metninden): negatif kontrol hedef eklenmemiş koşuldur, burada ürün görülmesi bulaşma şüphesi doğurur; pozitif kontrol bilinen hedefle sistemin çalıştığını sınar. Örnekte çoğalma olmaması tek başına hedef yok demek için yeterli değildir.",
  alt: "Üç satırlı tablo: tüp, eklenen, beklenen ve yorum. Negatif kontrolde hedef yok, ürün beklenmez; pozitif kontrolde bilinen hedef, ürün beklenir; örnekte sonuç kontrollerle birlikte yorumlanır.",
  headers: ["Tüp", "Eklenen", "Beklenen", "Yorum"],
  rows: [
    ["Negatif\nkontrol", "hedef yok", "ürün yok", "ürün varsa\nbulaşma\nşüphesi"],
    ["Pozitif\nkontrol", "bilinen\nhedef", "ürün var", "sistem\nçalışıyor"],
    ["Örnek", "bilinmeyen", "?", "kontrollerle\nyorumlanır"],
  ],
  readout: ["Primer veya polimeraz basamağı kapatılırsa yeni kopya eklenmez; başlangıç DNA'sı yok olmaz.", "Sonuç kesin tanı veya kimlik hükmü değildir."],
});

const gel = mk({
  caption:
    "Elektroforez (nitel şema, ölçekli değil): aynı jel koşullarında benzer doğrusal çift DNA parçalarından küçük olan genellikle daha uzağa ilerler. Referans işaretleri bantları yorumlamaya yardım eder; tek bir bant baz dizisini vermez. Profil uyumu istatistik ve örnek kalitesiyle değerlendirilir.",
  alt: "Dikdörtgen jel: üstte üç kuyucuk, üstte eksi, altta artı kutup. Soldaki işaret şeridinde beş bant, iki örnek şeridinde ikişer bant. Sağda aşağı doğru küçük parça daha uzağa oku.",
  h: 330,
  draw: () => {
    const els: El[] = [R(84, 40, 404, 300, { tone: "muted", fill: "muted" })];
    const lanes = [136, 240, 344];
    const bands = [[80, 120, 170, 230, 280], [120, 230], [170, 230]];
    lanes.forEach((x, i) => {
      els.push(R(x - 34, 46, x + 34, 58, { tone: "ink", bold: true }));
      for (const y of bands[i]) els.push(R(x - 30, y - 5, x + 30, y + 5, { tone: i === 0 ? "ink" : "a", fill: i === 0 ? "ink" : "a" }));
    });
    els.push(T(136, 20, "işaret", "c", { tone: "muted" }), T(240, 20, "örnek 1", "c", { tone: "a" }), T(344, 20, "örnek 2", "c", { tone: "a" }));
    els.push(T(420, 50, "− kutup", "e", { bold: true }), T(420, 292, "+ kutup", "e", { bold: true }));
    els.push(A(436, 90, 436, 250, "c", { bold: true }), T(442, 150, "küçük", "e", { tone: "c" }), T(442, 176, "parça", "e", { tone: "c" }), T(442, 202, "uzağa", "e", { tone: "c" }));
    els.push(T(74, 80, "uzun", "w", { tone: "muted" }), T(74, 280, "kısa", "w", { tone: "muted" }));
    return { els, readout: ["Bantlar boy ve yapıya göre ayrılır; işaretler göreli konumu okumaya yardım eder.", "Tek yumurta ikizleri, karışım örnekleri ve bulaşma profil yorumunun sınırlarıdır."] };
  },
});

const RECOMB = ["Tanıma bölgesi", "Kesim: yapışkan uçlar", "Uyumlu uçlu parça", "Ligaz birleştirir"];
const restriction = mk({
  caption:
    "Kesim enzimi ve ligaz (nitel şema, okul örneği): restriksiyon enzimi tanıma bölgesinden kesim yapar; aynı enzimle kesilen vektör ve hedef parça uyumlu uçlar taşır. DNA ligaz omurga uçlarını birleştirir. Bütün gerçek teknikler tek yapışkan uç biçimiyle sınırlı değildir.",
  alt: "İki çizgili çift zincir DNA. Birinci adımda ortada işaretli tanıma bölgesi; ikinci adımda zincirler kademeli kesilmiş, iki yapışkan uç; üçüncü adımda araya aynı uçlara sahip renkli parça yaklaşıyor; dördüncü adımda parça yerleşmiş ve birleşme noktaları ligaz işaretli.",
  h: 280,
  steps: RECOMB,
  draw: (_v, step) => {
    const els: El[] = [];
    const y1 = 110;
    const y2 = 140;
    if (step === 0) {
      els.push(L(30, y1, 500, y1, { bold: true }), L(30, y2, 500, y2, { bold: true }), R(230, 96, 300, 154, { tone: "warn", dash: true }), T(265, 70, "tanıma bölgesi", "c", { tone: "warn" }));
    } else if (step === 1) {
      els.push(L(30, y1, 240, y1, { bold: true }), L(30, y2, 280, y2, { bold: true }), L(260, y1, 500, y1, { bold: true }), L(300, y2, 500, y2, { bold: true }));
      els.push(L(240, y1, 240, y2 - 6, { thin: true, tone: "warn", dash: true }), L(280, y1 + 6, 280, y2, { thin: true, tone: "warn", dash: true }));
      els.push(T(150, 186, "yapışkan uç", "c", { tone: "warn" }), T(390, 186, "yapışkan uç", "c", { tone: "warn" }));
    } else {
      const joined = step === 3;
      const gap = joined ? 0 : 40;
      els.push(L(20, y1, 160 - gap, y1, { bold: true }), L(20, y2, 200 - gap, y2, { bold: true }));
      els.push(L(160, y1, 330, y1, { bold: true, tone: "a" }), L(200, y2, 370, y2, { bold: true, tone: "a" }));
      els.push(L(330 + gap, y1, 512, y1, { bold: true }), L(370 + gap, y2, 512, y2, { bold: true }));
      els.push(T(265, 186, "hedef parça (aynı enzimle kesilmiş)", "c", { tone: "a" }));
      if (joined) for (const [x, y] of [[160, y1], [200, y2], [330, y1], [370, y2]] as const) els.push(C(x, y, 6, { tone: "c", fill: "c" }));
      if (joined) els.push(T(265, 70, "ligaz: omurga bağları", "c", { tone: "c", bold: true }));
      else els.push(T(265, 70, "uyumlu uçlar eşleşir", "c", { tone: "muted" }));
    }
    els.push(T(20, 240, "vektör DNA", "e", { tone: "muted" }));
    return { els, readout: [`${step + 1}. ${RECOMB[step]}.`, "Doğru yön ve sağlam bağlar olmadan rekombinant DNA işlevsel olmaz."] };
  },
});

const dolly = mk({
  caption:
    "Somatik hücre çekirdek transferi (bölümdeki Dolly örneği: doğum 1996, geniş duyuru 1997): vücut hücresinin çekirdeği çekirdeği çıkarılmış yumurtaya aktarılır, gelişen yapı taşıyıcıda ilerletilir. Çekirdek DNA'sı esas olarak çekirdek vericisinden, mitokondri DNA'sı büyük ölçüde yumurta vericisinden gelir; taşıyıcı DNA kaynağı değildir.",
  alt: "Üstte iki kutu: çekirdek vericisinin vücut hücresi ve yumurta vericisinin çekirdeksiz yumurtası; ikisinden ortadaki çekirdek aktarılmış yumurta kutusuna oklar. Ondan taşıyıcıda gelişim ve klon kuzu kutularına inen oklar.",
  h: 340,
  draw: () => {
    const els: El[] = [
      ...B(122, 42, "Çekirdek vericisi:\nvücut hücresi", { w: 216, tone: "a", fill: "a" }),
      ...B(410, 42, "Yumurta vericisi:\nçekirdeksiz yumurta", { w: 230, tone: "c", fill: "c" }),
      A(122, 84, 220, 140, "a", { bold: true }),
      A(410, 84, 312, 140, "c", { bold: true }),
      T(100, 104, "çekirdek DNA", "c", { tone: "a" }),
      T(440, 96, "sitoplazma,", "c", { tone: "c" }),
      T(440, 126, "mitokondri DNA", "c", { tone: "c" }),
      ...B(266, 166, "Çekirdek aktarılmış yumurta", { bold: true }),
      A(266, 188, 266, 210, "ink"),
      ...B(266, 232, "Taşıyıcıda gelişim", { tone: "b" }),
      T(384, 216, "ortam", "e", { tone: "b" }),
      T(384, 242, "DNA vermez", "e", { tone: "b" }),
      A(266, 250, 266, 284, "ink"),
      ...B(266, 306, "Klon kuzu", { bold: true }),
    ];
    return { els, readout: ["Hücre döngüsü düzenlemesi bütün genlerin aynı anda açılması demek değildir.", "Nükleer benzerlik bütün genetik ayrıntının ve fenotipin mutlak özdeşliği değildir."] };
  },
});

/* ---------------- Kalıtım molekülünün keşfi ---------------- */

const GRIFF = [
  ["Canlı S", "ölür", "virülans kontrolü"],
  ["Canlı R", "yaşar", "R kontrolü"],
  ["Isıyla öldürülmüş S", "yaşar", "ısı kontrolü"],
  ["Canlı R + ölü S", "ölür", "canlı S elde edilir"],
];
const griffith = mk({
  caption:
    "Griffith 1928 (bölümdeki ders modeli): canlı S fareyi öldürür, canlı R ve ısıyla öldürülmüş S tek başına öldürmez. Canlı R ile ölü S birlikte verilince fare ölür ve canlı S elde edilir; bu kalıcı özellik dönüşümünü destekler. Etkenin hangi molekül olduğunu henüz göstermez.",
  alt: "Dört satırlı tablo: verilen, fare ve not sütunları. Canlı S ölür; canlı R yaşar; ısıyla öldürülmüş S yaşar; canlı R ile ölü S ölür ve canlı S elde edilir. Adımlarda satırlar sırayla vurgulanıyor.",
  h: 250,
  steps: GRIFF.map((g) => g[0]),
  draw: (_v, step) => {
    const t = table(["Verilen", "Fare", "Not"], GRIFF.map((g) => [...g]), { hi: step, hiTone: step === 3 ? "warn" : "a" });
    return { els: t.els, readout: [`${step + 1}. ${GRIFF[step][0]} → fare ${GRIFF[step][1]}; ${GRIFF[step][2]}.`, "Her grup ayrı bir alternatifi sınar: virülans, ısı etkisi ve dönüşüm."] };
  },
});

const avery = mk({
  caption:
    "Avery, MacLeod ve McCarty 1944 (bölüm metninden): S kökenli özüt seçici enzimlerle işlenir. Proteaz, RNaz, lipaz ve karbonhidrat parçalayıcı işlem sonrası dönüşüm sürer; DNA'yı bozan DNaz dönüşümü kaldırır. Çıkarım gereken bileşenin DNA olduğuyla uyumludur; enzim seçiciliği ve alıcı hücrenin yaşaması ayrıca denetlenir.",
  alt: "Beş satırlı tablo: işlem, bozulan molekül ve dönüşüm. Yalnız DNaz satırında dönüşüm yok ve bu satır vurgulu.",
  h: 306,
  draw: () => {
    const t = table(
      ["İşlem", "Bozulan", "Dönüşüm"],
      [
        ["Proteaz", "protein", "sürer"],
        ["RNaz", "RNA", "sürer"],
        ["DNaz", "DNA", "yok"],
        ["Lipaz", "yağ", "sürer"],
        ["Karbonhidrat\nparçalayıcı", "karbonhidrat", "sürer"],
      ],
      { hi: 2, hiTone: "warn" },
    );
    return { els: t.els, readout: ["Dönüşümü yalnız DNA'yı bozan işlem kaldırır.", "DNaz bütün canlıları zehirleseydi dönüşüm yokluğu DNA gerekliliğine bağlanamazdı; kontroller bunu sınar."] };
  },
});

const HC = [
  { name: "³²P: DNA işaretli", pellet: true, txt: "Fosfor-32 DNA'nın fosfat omurgasını işaretler; sinyal çoğunlukla bakteri çökeltisindedir." },
  { name: "³⁵S: kılıf işaretli", pellet: false, txt: "Kükürt-35 kılıf proteinini işaretler; sinyal çoğunlukla üst sıvıdaki ayrılmış kılıflardadır." },
];
const hershey = mk({
  caption:
    "Hershey ve Chase 1952 (nitel şema, ölçekli değil): enfeksiyondan sonra karıştırma kılıfları bakteri yüzeyinden ayırır, santrifüj bakterileri çökeltiye, hafif kılıfları üst sıvıya ayırır. ³²P sinyali daha çok çökeltide, ³⁵S sinyali daha çok üst sıvıda bulunur. Ölçüm çoğunluk dağılımıdır, yüzde yüz değildir.",
  alt: "Santrifüj tüpü: altta bakteri çökeltisi, üstte sıvı. Noktalar sinyali gösteriyor. Birinci adımda noktaların çoğu çökeltide, ikinci adımda çoğu üst sıvıda.",
  h: 340,
  steps: HC.map((h) => h.name),
  draw: (_v, step) => {
    const h = HC[step];
    const t: Tone = h.pellet ? "warn" : "b";
    const els: El[] = [
      S([[180, 20], [180, 250], [200, 290], [240, 304], [280, 290], [300, 250], [300, 20]], { open: true, bold: true }),
      S([[186, 250], [200, 284], [240, 298], [280, 284], [294, 250], [240, 240]], { tone: "c", fill: "c" }),
      L(184, 60, 296, 60, { thin: true, tone: "muted", dash: true }),
    ];
    const many: [number, number][] = h.pellet ? [[210, 262], [230, 276], [250, 262], [270, 272], [240, 286], [220, 252], [262, 252]] : [[206, 100], [236, 130], [266, 96], [220, 170], [258, 190], [280, 140], [200, 210]];
    const few: [number, number][] = h.pellet ? [[230, 120], [262, 180]] : [[236, 272]];
    for (const [x, y] of [...many, ...few]) els.push(C(x, y, 5, { tone: t, fill: t }));
    els.push(T(320, 150, "üst sıvı: kılıflar", "e", { tone: "muted" }), T(320, 272, "çökelti: bakteriler", "e", { tone: "c" }));
    els.push(T(240, 316, h.name, "c", { bold: true, tone: t }));
    return { els, readout: [h.txt, "Karıştırma ve ayırma yapılmadan toplam radyoaktivite maddenin içeri mi yüzeye mi geldiğini ayıramaz."] };
  },
});

const chargaff = mk({
  caption:
    "Chargaff eşitlikleri (çift zincirli DNA için bölüm metni): A = T ve G = C. A yüzdesi seçilince T aynıdır, G = C = (100 − 2A) / 2. Türler arasında A+T ve G+C oranları değişebilir. Aynı yüzdeler aynı diziyi göstermez; tek zincirde A = T beklenmez.",
  alt: "Yüzde yüzlük yatay çubuk dört parçaya bölünmüş: A, T, G, C. Sürgüyle A yüzdesi değişince T aynı genişlikte, G ve C kalan yarıyı eşit paylaşıyor.",
  h: 220,
  param: { label: "A yüzdesi", min: 10, max: 40, step: 1, init: 30, unit: " %" },
  draw: (a) => {
    const g = (100 - 2 * a) / 2;
    const parts: [string, number, Tone][] = [
      ["A", a, "a"],
      ["T", a, "a"],
      ["G", g, "c"],
      ["C", g, "c"],
    ];
    const els: El[] = [];
    let x = 26;
    const k = 4.8;
    parts.forEach(([n, p, t], i) => {
      els.push(R(x, 70, x + p * k, 130, { tone: t, fill: t, dash: i % 2 === 1 }));
      els.push(T(x + (p * k) / 2, 100, n, "c", { bold: true }));
      els.push(T(x + (p * k) / 2, 158, `%${fmt(p, 0)}`, "c", { tone: t }));
      x += p * k;
    });
    els.push(T(266, 30, `A + T = %${fmt(2 * a, 0)}, G + C = %${fmt(2 * g, 0)}`, "c", { bold: true }));
    return { els, readout: [`A = T = %${fmt(a, 0)}; G = C = (100 − ${2 * a}) / 2 = %${fmt(g, 0)}.`, "Yüzde bileşimi, dizideki konumlar ve üç boyutlu yapı farklı veri türleridir."] };
  },
});

/* ---------------- Fermantasyon ---------------- */

const GLY = [
  { name: "Yatırım", txt: "İlk basamaklarda glikozun işlenmesi için 2 ATP harcanır." },
  { name: "Kazanç", txt: "Sonraki basamaklarda substrat düzeyinde fosforilasyonla toplam 4 ATP oluşur." },
  { name: "Net", txt: "Net kazanç 4 − 2 = 2 ATP; brüt üretim net kazanç değildir." },
];
const glycolysis = mk({
  caption:
    "Glikoliz (bölüm metni): sitozolde bir 6 karbonlu glikoz iki 3 karbonlu pirüvata dönüşür. İlk basamaklarda 2 ATP harcanır, sonra substrat düzeyinde fosforilasyonla 4 ATP oluşur; net 4 − 2 = 2 ATP. Bu adım için ETS gerekmez. Şema nitel, ölçekli değildir.",
  alt: "Üstte glikoz 6C kutusu, altında iki pirüvat 3C kutusu. Sol yanda harcanan 2 ATP, sağ yanda oluşan 4 ATP ve en altta net 2 ATP satırı adımlarla beliriyor.",
  h: 300,
  steps: GLY.map((g) => g.name),
  draw: (_v, step) => {
    const els: El[] = [
      ...B(266, 40, "Glikoz (6 C)", { bold: true, w: 200 }),
      A(240, 62, 160, 196, "ink"),
      A(292, 62, 372, 196, "ink"),
      ...B(140, 220, "Pirüvat (3 C)", { w: 190, tone: "c", fill: "c" }),
      ...B(392, 220, "Pirüvat (3 C)", { w: 190, tone: "c", fill: "c" }),
      T(60, 110, "− 2 ATP", "c", { bold: true, tone: "warn" }),
      T(60, 136, "harcanır", "c", { tone: "warn" }),
    ];
    if (step >= 1) els.push(T(472, 110, "+ 4 ATP", "c", { bold: true, tone: "a" }), T(472, 136, "oluşur", "c", { tone: "a" }));
    if (step >= 2) els.push(T(266, 280, "net: 4 − 2 = 2 ATP", "c", { bold: true, tone: "a" }));
    return { els, readout: [GLY[step].txt, "Glikoz sayısını katlarken harcanan ve oluşan ATP'yi ayrı çarp."] };
  },
});

const NADS = [
  { name: "Döngü sürer", ok: true, txt: "Glikolizde 2 NAD⁺ indirgenip 2 NADH olur; fermantasyonun son basamağı NADH'yi yeniden NAD⁺'a çevirir." },
  { name: "Son basamak yok", ok: false, txt: "NAD⁺ havuzu sonludur: taşıyıcı NADH biçiminde birikirse glikolizin ilgili basamakları sürdürülemez." },
];
const nad = mk({
  caption:
    "NAD⁺ neden yeniden kazanılır? (nitel döngü şeması): bir glikozun glikolizinde 2 NADH oluşur. Fermantasyonun son ürün basamakları NADH'yi NAD⁺'a döndürür; taşıyıcı yoktan üretilmez, kimyasal biçimi değişir. Bu basamak ayrıca ATP üretmez.",
  alt: "Solda NAD⁺, sağda NADH kutusu. Üstte NAD⁺'dan NADH'ye glikoliz oku, altta NADH'den NAD⁺'a fermantasyon son basamağı oku. İkinci adımda alt ok kesik ve NAD⁺ tükenir notu.",
  h: 260,
  steps: NADS.map((n) => n.name),
  draw: (_v, step) => {
    const n = NADS[step];
    const els: El[] = [
      ...B(90, 130, "NAD⁺", { w: 120, tone: "c", fill: n.ok ? "c" : undefined, bold: true }),
      ...B(442, 130, "NADH", { w: 120, tone: "a", fill: "a", bold: true }),
      S([[150, 110], [266, 60], [382, 110]], { open: true, bold: true, tone: "a" }),
      A(370, 104, 384, 112, "a"),
      T(266, 34, "glikoliz: 2 NAD⁺ → 2 NADH", "c", { tone: "a" }),
      S([[382, 150], [266, 200], [150, 150]], { open: true, bold: n.ok, dash: !n.ok, tone: n.ok ? "c" : "muted" }),
      A(162, 156, 148, 148, n.ok ? "c" : "muted"),
      T(266, 228, n.ok ? "son ürün basamağı: NADH → NAD⁺" : "son basamak yok: NAD⁺ tükenir", "c", { tone: n.ok ? "c" : "warn", bold: !n.ok }),
    ];
    return { els, readout: [n.txt, "İki kanonik son ürün yolunda geri kazanım basamağı ATP üretmez."] };
  },
});

const pathway = (ethanol: boolean): El[] => {
  const els: El[] = [...B(266, 30, "2 pirüvat (2 × 3 C)", { bold: true, w: 240, tone: "c", fill: "c" })];
  if (ethanol) {
    els.push(A(266, 52, 266, 92, "ink"), ...B(240, 114, "2 asetaldehit (2 × 2 C)", { w: 260 }), A(300, 58, 422, 100, "warn"), ...B(470, 114, "2 CO₂", { w: 90, tone: "warn", fill: "warn" }), T(470, 150, "ayrılır", "c", { tone: "warn" }));
    els.push(A(266, 136, 266, 176, "ink"), ...B(266, 198, "2 etanol (2 × 2 C)", { w: 240, tone: "a", fill: "a", bold: true }));
    els.push(T(140, 156, "NADH → NAD⁺", "c", { tone: "b" }), T(266, 256, "C: 6 = 4 (etanol) + 2 (CO₂)", "c", { bold: true }));
  } else {
    els.push(A(266, 52, 266, 176, "ink"), T(140, 114, "NADH → NAD⁺", "c", { tone: "b" }), T(300, 114, "CO₂ ayrılmaz", "e", { tone: "muted" }));
    els.push(...B(266, 198, "2 laktat (2 × 3 C)", { w: 240, tone: "a", fill: "a", bold: true }), T(266, 256, "C: 6 = 6 (laktat)", "c", { bold: true }));
  }
  return els;
};
const ethanolPath = mk({
  caption:
    "Etanol yolu (bölüm metni): her pirüvat bir CO₂ kaybederek iki karbonlu asetaldehide dönüşür; asetaldehit NADH'den elektron alarak etanole indirgenir ve NAD⁺ yenilenir. Bir glikozdan 2 etanol (4 C) ve 2 CO₂ (2 C) oluşur; 6 karbon korunur. Elektron alan son ara ürün asetaldehittir, CO₂ değildir.",
  alt: "Yukarıdan aşağı: 2 pirüvat, yandan 2 CO₂ ayrılırken 2 asetaldehit, ardından NADH'nin NAD⁺'a döndüğü indirgenmeyle 2 etanol. En altta karbon denetimi 6 = 4 + 2.",
  h: 280,
  draw: () => ({ els: pathway(true), readout: ["Karbon defteri: 2 × 3 = 2 × 2 + 2 × 1.", "Gaz molü tek başına kapalı kaptaki basınç değildir; sıcaklık, hacim ve çözünme de etkiler."] }),
});
const lactatePath = mk({
  caption:
    "Homolaktik yol (bölüm metni): pirüvat NADH'den elektron alarak doğrudan laktata dönüşür; bir glikozdan iki 3 karbonlu laktat oluşur ve bu kanonik yolda CO₂ ayrılmaz. İki pirüvatın indirgenmesiyle 2 NAD⁺ yeniden kazanılır; ek ATP oluşmaz, net 2 ATP glikolizden gelir.",
  alt: "Üstte 2 pirüvat, okla doğrudan 2 laktat; okun yanında NADH'nin NAD⁺'a döndüğü ve CO₂ ayrılmadığı yazılı. En altta karbon denetimi 6 = 6.",
  h: 280,
  draw: () => ({ els: pathway(false), readout: ["Karbon laktatta kalır: 2 × 3 = 2 × 3.", "Laktat son durak olmak zorunda değildir; başka yollar onu değerlendirebilir."] }),
});

const compare = tableFig({
  caption:
    "İki yolu aynı ölçütle karşılaştır (bölümdeki tablo, 1 mol serbest glikoz için): net ATP ve yenilenen NAD⁺ iki yolda eşittir; CO₂ ve son organik ürünün karbon sayısı farklıdır. 'CO₂ yok' yalnız homolaktik yol içindir.",
  alt: "Dört satırlı tablo: ölçüt, etanol yolu ve homolaktik yol. Net ATP 2 ve 2 mol; organik ürün 2 mol etanol her biri 2 C ve 2 mol laktat her biri 3 C; CO₂ 2 ve 0 mol; yenilenen NAD⁺ 2 ve 2 mol.",
  headers: ["Ölçüt\n(1 mol glikoz)", "Etanol yolu", "Homolaktik yol"],
  rows: [
    ["Net ATP", "2 mol", "2 mol"],
    ["Organik ürün", "2 mol etanol,\nher biri 2 C", "2 mol laktat,\nher biri 3 C"],
    ["CO₂", "2 mol", "0 mol"],
    ["Yenilenen NAD⁺", "2 mol", "2 mol"],
  ],
  readout: ["Her satıra tek ölçüt yazmak ürün çeşidi ile enerji kazancını karıştırmayı önler.", "Farklı mikroplar başka fermantasyon ürünleri oluşturabilir."],
});

const budget = mk({
  caption:
    "Karbon bütçesi (bölümdeki etanol yolu katsayıları; kapalı karbon modeli): işlenen her mol glikoz 2 mol etanol ve 2 mol CO₂ verir. Karbon denetimi 6n = 4n + 2n. İşlenmeyen glikoz ürün sayılmaz; mol molekül ile mol karbon atomu ayrı yazılır.",
  alt: "İki yatay çubuk: üstte işlenen glikozun karbonu, altta etanol karbonu ile CO₂ karbonunun toplamı. Sürgü işlenen glikozu 0 ile 4 mol arasında değiştirir; iki çubuk hep eşit uzunlukta.",
  h: 230,
  param: { label: "İşlenen glikoz", min: 0, max: 4, step: 0.5, init: 1, unit: " mol" },
  draw: (n) => {
    const k = 16;
    const els: El[] = [T(24, 50, "glikoz C", "e", { tone: "muted" }), T(24, 130, "ürün C", "e", { tone: "muted" })];
    if (n > 0) {
      els.push(R(130, 30, 130 + 6 * n * k, 70, { tone: "c", fill: "c" }));
      els.push(R(130, 110, 130 + 4 * n * k, 150, { tone: "a", fill: "a" }), R(130 + 4 * n * k, 110, 130 + 6 * n * k, 150, { tone: "warn", fill: "warn", dash: true }));
    }
    els.push(T(330, 190, `${fmt(6 * n)} mol C = ${fmt(4 * n)} (etanol) + ${fmt(2 * n)} (CO₂)`, "c", { bold: true }));
    return { els, readout: [`${fmt(n)} mol glikoz → ${fmt(2 * n)} mol etanol + ${fmt(2 * n)} mol CO₂; karbon ${fmt(6 * n)} = ${fmt(4 * n)} + ${fmt(2 * n)}.`, "Model büyüme, yan ürünler ve ATP tüketimini hesaplamaz."] };
  },
});

export const biologyFigures060Genetics: Record<string, Record<string, FigureDef>> = {
  "genetik-cesitlilik": {
    "Aktarım için değişikliğin bulunduğu hücre soyunu izle": lineage,
    "Rekombinasyon mevcut bilgiyi yeniden bir araya getirir": crossing,
    "Bağımsız dağılım için fiziksel yerleşimi denetle": assortment,
    "Döllenme iki ayrı örnek uzayını birleştirir": fertilization,
  },
  "ayt-biyoteknoloji": {
    "PCR hedef DNA'yı çoğaltır": pcr,
    "Kontroller sonuçtan önce gelir": controls,
    "Elektroforez ve DNA profili": gel,
    "Rekombinant DNA'nın parçaları": restriction,
    "Dolly örneğinde çekirdek ve sitoplazma": dolly,
  },
  "kalitim-molekulu-kesfi": {
    "Griffith’in iki bakteri tipini ve kontrol gruplarını tanı": griffith,
    "Avery, MacLeod ve McCarty etkeni seçici enzimlerle sınar": avery,
    "Karıştırma ve santrifüj sinyalin yerini anlamlı kılar": hershey,
    "Chargaff bileşimi ölçer, diziyi doğrudan çözmez": chargaff,
  },
  "ayt-fermantasyon": {
    "Glikoliz: iki üç karbonlu ürün": glycolysis,
    "NAD⁺ neden yeniden kazanılır?": nad,
    "Etanol yolunda karbonun ayrılması": ethanolPath,
    "Laktat yolunda karbon içeride kalır": lactatePath,
    "İki yolu aynı ölçütle karşılaştır": compare,
    "Bütçeyi kur, ardından kontrol et": budget,
  },
};
