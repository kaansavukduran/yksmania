import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { pad } from "./biologyFigures059Kit";
import { table } from "./biologyFigures059TytKit";
import { hbars } from "./chemistryFigures060Kit";
import { boardFig } from "./historyFigures059Kit";
import { flowPickFig, flowStepFig } from "./historyFigures061TytKit";

/*
 * TYT Biyoloji · Bakteri ve arke, Protista, bitkiler, omurgalılar
 * (Forge061). Yapılar ve sayılar bölüm metinlerindendir: N = N₀·2ᵏ;
 * kalp odacığı sayıları sazan 2, kurbağa 3, çoğu sürüngen 3, timsah 4,
 * kuş ve memeli 4. Hücre çizimleri bir türün fotoğrafı değil karşılaştırma
 * modelidir; boyutlar ölçekli değildir.
 */

const ellipse = (c: V, rx: number, ry: number, n = 48): V[] => Array.from({ length: n }, (_, i) => v(c[0] + rx * Math.cos((2 * Math.PI * i) / n), c[1] + ry * Math.sin((2 * Math.PI * i) / n)));

/* ---------------- Bakteri ve arke ---------------- */

type Part = { name: string; must: boolean; what: string };
const PARTS: Part[] = [
  { name: "hücre zarı", must: true, what: "Seçici alışveriş sınırı; bakteri ve arke hücrelerinde vardır." },
  { name: "sitoplazma", must: true, what: "Enzimler sitoplazmada veya zarlarla ilişkili bölgelerde çalışır." },
  { name: "ribozom", must: true, what: "Protein sentezler; zarlı organel olmaması işlev yokluğu değildir." },
  { name: "kromozom", must: true, what: "DNA zarla çevrili çekirdekte değildir; okul örneklerinde ana kromozom çoğunlukla halkasaldır." },
  { name: "duvar", must: false, what: "Bakterilerin çoğunda peptidoglikan içeren duvar destek sağlar; duvarsız bakteri örnekleri de vardır." },
  { name: "kapsül", must: false, what: "Bazı türlerde yüzeye tutunma ve korunmaya katkı verir; her türde yoktur." },
  { name: "plazmit", must: false, what: "Kromozomdan ayrı kalıtsal eleman olabilir; her türde yoktur." },
  { name: "pilus", must: false, what: "Bazı piluslar tutunma veya DNA aktarımını kuran etkileşimle ilişkilidir." },
  { name: "kamçı", must: false, what: "Hareketle ilişkilidir; hücrenin küre veya çomak biçimi kamçı durumunu belirlemez." },
];
const prokaryote: FigureDef = {
  caption:
    "Prokaryot hücre modeli: zar, sitoplazma, ribozom ve halkasal kromozom ortaktır (düz etiket); duvar, kapsül, plazmit, pilus ve kamçı her türde bulunmaz (kesik çizgili etiket). Yapı sorusunda önce zorunlu ile koşullu sütunlarını ayır. Çizim bir türün fotoğrafı değil, karşılaştırma modelidir; ölçekli değil.",
  alt: "Yatay oval bakteri hücresi: dıştan içe kesik çizgili kapsül, duvar ve hücre zarı. İçeride kıvrımlı halkasal kromozom, küçük plazmit halkası ve ribozom noktaları. Üst yüzeyde kısa pilus çizgileri, sağ uçta dalgalı kamçı. Yapı adları seçilebilir; ortak yapılar düz, koşullu yapılar kesik çerçeveli.",
  picks: PARTS.map((p) => ({ label: p.name, title: `${p.name} (${p.must ? "ortak" : "koşullu"})`, detail: [p.what] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const C: V = v(5.2, 2.4);
    const on = (n: string) => pick >= 0 && PARTS[pick].name === n;
    const tone = (n: string, base: Tone): Tone => (on(n) ? "a" : base);
    els.push(poly(ellipse(C, 3.7, 1.95), { tone: tone("kapsül", "muted"), dash: true, bold: on("kapsül") }));
    els.push(poly(ellipse(C, 3.35, 1.6), { tone: tone("duvar", "c"), bold: true }));
    els.push(poly(ellipse(C, 3.1, 1.36), { tone: tone("hücre zarı", "b"), fill: on("sitoplazma") ? "a" : undefined, thin: !on("hücre zarı"), bold: on("hücre zarı") }));
    const loop = Array.from({ length: 40 }, (_, i) => {
      const a = (2 * Math.PI * i) / 40;
      const r = 0.75 + 0.18 * Math.sin(5 * a);
      return v(C[0] - 0.4 + r * 1.3 * Math.cos(a), C[1] + 0.1 + r * 0.7 * Math.sin(a));
    });
    els.push(poly(loop, { tone: tone("kromozom", "warn"), bold: true, smooth: true }));
    els.push(circle(v(C[0] + 1.75, C[1] - 0.55), 0.26, { tone: tone("plazmit", "warn"), thin: !on("plazmit"), bold: on("plazmit") }));
    for (const p of [v(3.0, 1.6), v(3.4, 3.2), v(6.9, 3.0), v(7.3, 2.1), v(4.6, 1.3), v(6.2, 1.5)]) els.push(circle(p, 0.08, { tone: tone("ribozom", "ink"), fill: tone("ribozom", "ink") }));
    for (const x of [3.6, 4.6, 5.6, 6.6]) {
      const y0 = C[1] + 1.95 * Math.sqrt(Math.max(0, 1 - ((x - C[0]) / 3.7) ** 2));
      els.push(seg(v(x, y0), v(x + 0.12, y0 + 0.45), { tone: tone("pilus", "ink"), thin: !on("pilus") }));
    }
    const wave = Array.from({ length: 25 }, (_, i) => v(8.9 + i * 0.12, C[1] + 0.25 * Math.sin(i * 0.9)));
    els.push(poly(wave, { open: true, smooth: true, tone: tone("kamçı", "ink"), bold: on("kamçı") }));
    const label = (p: V, n: string, at: "n" | "s" | "e" | "w" | "c") => {
      const i = PARTS.findIndex((q) => q.name === n);
      els.push(txt(p, PARTS[i].must ? n : `${n}*`, at, { small: true, bold: on(n), tone: on(n) ? "a" : PARTS[i].must ? "ink" : "muted", pick: i }));
    };
    label(v(5.0, 4.85), "pilus", "n");
    label(v(11.0, 2.95), "kamçı", "n");
    label(v(1.3, 3.9), "kapsül", "w");
    els.push(seg(v(1.35, 3.9), v(2.0, 3.6), { thin: true, tone: "muted" }));
    label(v(1.3, 2.4), "duvar", "w");
    els.push(seg(v(1.35, 2.4), v(1.85, 2.4), { thin: true, tone: "muted" }));
    label(v(1.3, 0.9), "hücre zarı", "w");
    els.push(seg(v(1.35, 0.9), v(2.6, 1.45), { thin: true, tone: "muted" }));
    label(v(4.8, 2.45), "kromozom", "c");
    label(v(7.3, 1.45), "plazmit", "e");
    label(v(3.6, 0.0), "ribozom", "s");
    els.push(seg(v(3.6, 0.05), v(4.5, 1.25), { thin: true, tone: "muted" }));
    label(v(7.2, 0.0), "sitoplazma", "s");
    els.push(seg(v(7.0, 0.05), v(6.6, 1.3), { thin: true, tone: "muted" }));
    els.push(...pad(v(-1.3, 5.6), v(12.2, -0.8)));
    const sel = pick >= 0 ? PARTS[pick] : undefined;
    return { els, readout: [sel ? `${sel.name} (${sel.must ? "ortak" : "koşullu"}): ${sel.what}` : "Bir yapının adına tıkla ya da aşağıdan seç. Yıldızlı adlar her türde bulunmaz.", "Bir yapının çizimde bulunmaması gerçek türde kesin yokluk kanıtı olmayabilir."] };
  },
};

const fission: FigureDef = {
  caption:
    "İkiye bölünmede her hücre aynı sürede bir kez bölünür ve ölüm olmazsa her kuşakta sayı iki katına çıkar: N = N₀·2ᵏ. Model tek hücreyle (N₀ = 1) başlar; bu üstel ifade sınırsız gerçek kültür yasası değildir, besin, atık, yer, sıcaklık ve ölüm sayıyı sınırlar. Prokaryot ikiye bölünmesi mitoz değildir.",
  alt: "Sürgüyle kuşak sayısı k 0'dan 6'ya değişir; altta 2ᵏ hücre küçük ovaller hâlinde ızgara olarak çizilir ve toplam sayı yazılır.",
  param: { label: "Kuşak sayısı k", min: 0, max: 6, step: 1, init: 3, plain: true },
  draw: (kRaw) => {
    const k = Math.round(kRaw);
    const n = 2 ** k;
    const els: El[] = [];
    const cols = 16;
    for (let i = 0; i < n; i++) {
      const x = (i % cols) * 0.72 + 0.4;
      const y = 3.2 - Math.floor(i / cols) * 0.62;
      els.push(poly(ellipse(v(x, y), 0.3, 0.2, 16), { tone: "c", fill: "c", thin: true }));
    }
    els.push(txt(v(5.8, -0.4), `N = 1 × 2^${k} = ${n} hücre`.replace(`2^${k}`, `2${"⁰¹²³⁴⁵⁶"[k]}`), "s", { small: true, bold: true, tone: "a" }));
    els.push(...pad(v(-0.1, 3.7), v(11.8, -1.1)));
    return { els, readout: [`${k} kuşak sonra N = N₀ · 2${"⁰¹²³⁴⁵⁶"[k]} = ${n} (N₀ = 1).`, "Bölünme süresi soru açıkça verirse kullanılır; ezberden süre eklenmez."] };
  },
};

const archaea = boardFig(
  [
    { name: "Metanojen", tag: "oksijensiz ortam · metan üretir", what: "Uygun oksijensiz koşullarda metan üretir; biyogaz oluşumunda rol oynar.", tone: "b" },
    { name: "Halofil", tag: "aşırı tuz", what: "Aşırı tuzu seven arke türleri.", tone: "warn" },
    { name: "Termofil", tag: "yüksek sıcaklık", what: "Yüksek sıcaklığa uyumlu türler; yüksek sıcaklıkta çalışan enzimler endüstride yararlı olabilir.", tone: "a" },
    { name: "Ilımlı ortam", tag: "deniz, toprak · canlılarla ilişkili", what: "Denizlerde, toprakta ve canlılarla ilişkili ortamlarda ılımlı koşullarda yaşayan arkeler de vardır.", tone: "c" },
  ],
  2,
  "Arke çeşitliliği: metanojenler oksijensiz koşullarda metan üretir, halofiller aşırı tuza, termofiller yüksek sıcaklığa uyumludur; denizde, toprakta ve canlılarla ilişkili ılımlı ortamlarda yaşayan arkeler de vardır. Bu örnekler bütün arkelerin aşırı koşullarda yaşadığını veya her arkenin metan ürettiğini göstermez.",
  "İki sütunlu dört kutu: Metanojen (oksijensiz ortam, metan üretir), Halofil (aşırı tuz), Termofil (yüksek sıcaklık), Ilımlı ortam (deniz, toprak, canlılarla ilişkili). Kutular seçilebilir.",
  "Ekolojik işlevi grubun bütün üyelerine yükleme; ölçülen tür veya sürecin sınırını koru.",
  5.6,
);

/* ---------------- Protista ---------------- */

const vacuole: FigureDef = {
  caption:
    "Tatlı su iç çözünenlere göre daha seyreltik olduğundan su hücreye ozmozla girer; kontraktil koful fazla suyu toplayıp dışarı atarak hacim dengesine katkı sağlar. Bu düzenek ATP kullanan süreçlerle desteklenir; ozmotik su girişinin kendisi aktif taşıma değildir. İzotonik ortamda sürekli fazla su girişi beklenmez. Model ölçekli değil.",
  alt: "Ortada büyük daire hücre, içinde çekirdek ve kenara yakın ışınsal kanallı kontraktil koful. Dışarıdan hücreye doğru oklar 'ozmoz', koftan dışarı kalın ok 'atılır'. Adımlar: tatlı su, koful boşaltır, izotonik ortam (içe oklar kesik).",
  steps: ["Tatlı suda su girişi", "Koful suyu atar", "İzotonik ortam"],
  draw: (_v, step) => {
    const els: El[] = [];
    const C: V = v(5.0, 2.4);
    els.push(circle(C, 2.0, { tone: "c", thin: true }));
    els.push(poly(ellipse(v(4.3, 2.0), 0.55, 0.42, 24), { tone: "muted", fill: "muted", thin: true }), txt(v(4.3, 2.0), "çekirdek", "c", { small: true }));
    const K: V = v(6.1, 3.25);
    els.push(circle(K, step === 1 ? 0.24 : 0.4, { tone: "b", fill: "b", thin: true }));
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i;
      els.push(seg(v(K[0] + 0.45 * Math.cos(a), K[1] + 0.45 * Math.sin(a)), v(K[0] + 0.8 * Math.cos(a), K[1] + 0.8 * Math.sin(a)), { tone: "b", thin: true }));
    }
    const iso = step === 2;
    for (const a of [200, 250, 300, 160]) {
      const r = (a * Math.PI) / 180;
      els.push(vec(v(C[0] + 2.9 * Math.cos(r), C[1] + 2.9 * Math.sin(r)), v(C[0] + 2.15 * Math.cos(r), C[1] + 2.15 * Math.sin(r)), { tone: iso ? "muted" : "b", dash: iso, thin: true }));
    }
    els.push(txt(v(1.7, 0.1), iso ? "net giriş azalır" : "ozmoz: su girer", "e", { small: true, tone: iso ? "muted" : "b" }));
    if (step >= 1) els.push(vec(v(6.7, 4.0), v(7.9, 5.1), { tone: step === 1 ? "a" : "muted", bold: step === 1 }), txt(v(8.0, 5.1), step === 1 ? "su atılır (ATP)" : "yük azalır", "e", { small: true, tone: step === 1 ? "a" : "muted" }));
    els.push(txt(v(9.6, 2.4), iso ? "izotonik ortam" : "tatlı su", "c", { small: true, bold: true, tone: "muted" }));
    if (!iso) els.push(txt(v(9.6, 1.8), "(daha seyreltik)", "c", { small: true, tone: "muted" }));
    els.push(txt(v(6.95, 3.25), "koful", "e", { small: true }));
    els.push(...pad(v(1.0, 5.6), v(12.0, -0.6)));
    const r = ["Su ozmozla hücreye girer: pasif hareket.", "Kontraktil koful fazla suyu toplayıp uzaklaştırır; düzenek ATP kullanan süreçlerle desteklenir.", "Ortam izotonik olunca sürekli fazla su girişi beklentisi azalır; kofulun yükü değişir."];
    return { els, readout: [r[step], "Besin kofulu sindirim ortamıdır; kontraktil koful su düzenler."] };
  },
};

const euglena: FigureDef = {
  caption:
    "Seçilmiş öglena örneğinde ışık ve dış organik madde iki ayrı koşuldur. Uygun ışıkta fotosentezle organik madde üretir; karanlıkta fotosentez durur ama bu örnek hazır organik maddeden yararlanabilir (miksotrofi). Koşulları ayrı değiştirerek geçerli sonuç kurarsın. Bu özellikler seçilmiş örneğe aittir, bütün kamçılılara değil.",
  alt: "İki satır iki sütunlu tablo. Satırlar: ışık var, ışık yok. Sütunlar: dış organik madde yok, dış organik madde var. Işık varken iki hücrede de fotosentez; ışık yokken dış organik madde varsa onu kullanır, yoksa fotosentez durur.",
  draw: () => {
    const body = [
      ["ışık var", "fotosentez", "fotosentez + dış madde"],
      ["ışık yok", "fotosentez durur", "dış organik madde"],
    ];
    const els: El[] = [...table(["", "dış madde yok", "dış madde var"], body, [2.4, 4.2, 5.4], { top: 2.8, rowH: 0.95, tone: (r, c) => (c === 0 ? "muted" : r === 0 ? "c" : c === 2 ? "b" : "warn") }), ...pad(v(-0.1, 3.0), v(12.1, -0.1))];
    return { els, readout: ["Karanlıkta fotosentez durur; bundan bütün metabolizmanın anında durduğu çıkmaz.", "Işık algılayan yapı insan gözüne eşitlenmez."] };
  },
};

/* ---------------- Bitkiler ---------------- */

const KEY_NODES = [
  { c: v(2.2, 5.0), w: 3.6, s: "Damar var mı?", tone: "muted" as Tone },
  { c: v(8.6, 5.0), w: 6.0, h: 1.25, s: "Kara yosunu · damarsız tohumsuz", tone: "c" as Tone, what: "Damar ve gerçek kök yok; rizoidler kökün tüm işlevleriyle eşdeğer değildir. Tohum ve meyve yok; yaşam döngüsünde spor var." },
  { c: v(2.2, 3.0), w: 3.6, s: "Tohum var mı?", tone: "muted" as Tone },
  { c: v(8.6, 3.0), w: 6.0, h: 1.25, s: "Eğrelti · damarlı tohumsuz", tone: "c" as Tone, what: "İletim dokusu var ama tohum oluşturmaz: 'damar varsa tohum vardır' kısa yolu geçersizdir." },
  { c: v(2.2, 1.0), w: 3.6, s: "Meyve var mı?", tone: "muted" as Tone },
  { c: v(8.6, 1.0), w: 6.0, h: 1.25, s: "Çam · açık tohumlu", tone: "b" as Tone, what: "Damar ve tohum var; tohum taslakları kapalı yumurtalıkta değildir. Kozalak meyve değildir." },
  { c: v(2.2, -1.0), w: 4.2, h: 1.25, s: "Elma, buğday · kapalı tohumlu", tone: "a" as Tone, what: "Çiçek ve meyveyle ilişkili üreme düzeni; tohumlar yumurtalık kökenli meyvenin içindedir." },
];
const plantKey = flowPickFig({
  nodes: KEY_NODES,
  edges: [
    { a: 0, b: 1, s: "hayır" },
    { a: 0, b: 2, s: "evet" },
    { a: 2, b: 3, s: "hayır" },
    { a: 2, b: 4, s: "evet" },
    { a: 4, b: 5, s: "hayır" },
    { a: 4, b: 6, s: "evet" },
  ],
  caption:
    "Kanıtları sırayla birleştir: damar yoksa kara yosunu (damarsız tohumsuz); damar var ama tohum yoksa eğrelti (damarlı tohumsuz); damar ve tohum var, meyve yoksa çam gibi açık tohumlu; meyve varsa elma ve buğday gibi kapalı tohumlu. 'Tohumlu' meyveli demek değildir; odunsu gövde tek başına açık tohumluyu kanıtlamaz.",
  alt: "Ayırma anahtarı: solda alt alta üç soru kutusu (Damar var mı? Tohum var mı? Meyve var mı?) 'evet' oklarıyla bağlı. Her sorudan sağa 'hayır' okuyla bir grup: Kara yosunu, Eğrelti, Çam. Son sorudan aşağı 'evet' okuyla Elma, buğday: kapalı tohumlu. Grup kutuları seçilebilir.",
  foot: "Belirsiz veriyle kesin tür adı üretme; soru taşıma dokusu ve üreme yapısı olarak iki sütunda çözülür.",
  extra: pad(v(-0.1, 5.8), v(12.1, -1.9)),
});

const monocots: FigureDef = {
  caption:
    "Tek ve çift çenekliler kapalı tohumluların iç karşılaştırmasıdır: tek çeneklide bir çenek, çoğunlukla paralel damarlanma ve saçak kök (buğday); çift çeneklide iki çenek, çoğunlukla ağsı damarlanma ve kazık kök (fasulye). Bunlar tipik ilişkilerdir; tek bir yaprak görünüşüyle kesin tanı konmaz.",
  alt: "Dört satırlık tablo, sütunlar tek çenekli ve çift çenekli: çenek (bir / iki), damarlanma (çoğunlukla paralel / çoğunlukla ağsı), kök (saçak / kazık), örnek (buğday / fasulye).",
  draw: () => {
    const body = [
      ["çenek", "bir", "iki"],
      ["damarlanma", "çoğunlukla paralel", "çoğunlukla ağsı"],
      ["kök", "saçak", "kazık"],
      ["örnek", "buğday", "fasulye"],
    ];
    const els: El[] = [...table(["", "tek çenekli", "çift çenekli"], body, [3.0, 4.5, 4.5], { top: 4.5, rowH: 0.9, tone: (_r, c) => (c === 0 ? "muted" : c === 1 ? "c" : "b") }), ...pad(v(-0.1, 4.7), v(12.1, -0.1))];
    return { els, readout: ["Bu karşılaştırma bütün bitkileri değil, kapalı tohumluları böler.", "Her özellik bütün türlerde istisnasız değildir; tohum ve başka kanıtlar da aranır."] };
  },
};

/* ---------------- Omurgalılar ---------------- */

const fishLoop = flowStepFig({
  nodes: [
    { c: v(2.4, 3.6), w: 4.0, s: "Kalp · 2 odacık", h: 1.25, tone: "warn", step: 0 },
    { c: v(9.4, 3.6), w: 4.0, s: "Solungaç", tone: "b", step: 1 },
    { c: v(9.4, 0.8), w: 4.0, s: "Vücut", tone: "c", step: 2 },
  ],
  edges: [
    { a: 0, b: 1, step: 1, s: "oksijence fakir" },
    { a: 1, b: 2, step: 2, s: "oksijence zengin", at: "w" },
    { a: 2, b: 0, step: 3 },
  ],
  steps: [
    { s: "Kalp", what: "Sazan gibi tipik kemikli balıkta kalbin iki ana odacığı vardır." },
    { s: "Solungaç", what: "Kalpten çıkan kan önce solungaçlara gider; gaz alışverişi solungaçta olur." },
    { s: "Vücut", what: "Solungaçtan sonra kan vücuda gider." },
    { s: "Tek çevrim", what: "Kan bir turda kalpten yalnız bir kez geçer: dolaşım tek çevrimlidir." },
  ],
  caption:
    "Tipik kemikli balıkta (sazan) kalbin iki ana odacığından çıkan kan önce solungaçlara, sonra vücuda gider ve kalbe döner: kan bir turda kalpten bir kez geçer, dolaşım tek çevrimlidir. Kapalı dolaşım farklı odacık sayılarını kapsar; kapalı demek dört odacık demek değildir.",
  alt: "Üç kutulu döngü: Kalp (2 odacık) → Solungaç ('oksijence fakir' oku) → Vücut ('oksijence zengin' oku) → yeniden Kalp. Adımlarla oklar sırayla açılır.",
  foot: "Ektotermlik çevre ısısının vücut sıcaklığına etkisini anlatır; her an soğuk kan taşındığı anlamına gelmez.",
  extra: pad(v(-0.1, 4.6), v(12.1, -0.1)),
});

const HEARTS: [string, number, string][] = [
  ["sazan", 2, "ektoterm"],
  ["kurbağa", 3, "ektoterm"],
  ["çoğu sürüngen", 3, "ektoterm"],
  ["timsah", 4, "ektoterm"],
  ["kuş", 4, "endoterm"],
  ["memeli", 4, "endoterm"],
];
const hearts: FigureDef = {
  caption:
    "Kalp odacığı sayıları: sazan 2, kurbağa 3, çoğu sürüngen 3, timsah 4, kuş ve memeli 4. İki kulakçık ve iki karıncık oksijence zengin ve fakir akışları kalpte ayırır. Odacık sayısı ısı düzenlemesini belirlemez: dört odacıklı timsah ektoterm, dört odacıklı penguen (kuş) endotermdir.",
  alt: "Altı yatay çubuk: sazan 2, kurbağa 3, çoğu sürüngen 3, timsah 4, kuş 4, memeli 4 odacık. Her çubuğun sonunda ektoterm veya endoterm yazılı; timsah ektoterm, kuş ve memeli endoterm.",
  draw: () => {
    const rows = HEARTS.map(([n, k, t]) => ({ label: n, value: k, tone: (t === "endoterm" ? "warn" : "b") as Tone, text: `${k} odacık · ${t}` }));
    const els: El[] = [...hbars(rows, { x0: 3.4, y0: 4.6, w: 4.6, max: 4, gap: 0.85, h: 0.48, digits: 0 }), ...pad(v(0.2, 5.1), v(12.0, -0.1))];
    return { els, readout: ["Timsah 4 odacıklı ama ektoterm; odacık sayısından habitat veya ısı düzeni kesinleşmez.", "Şemadaki çizginin kısmi bölme mi tam duvar mı olduğunu kontrol et."] };
  },
};

export const biologyFigures061TytLife: Record<string, Record<string, FigureDef>> = {
  "bakteri-ve-arke": {
    "Duvar, kapsül, pilus ve kamçıyı işleve bağla": prokaryote,
    "İkiye bölünmede sayı artar": fission,
    "Arke çeşitliliği: metanojen, halofil ve termofil": archaea,
  },
  protista: {
    "Tatlı suda kontraktil koful neden çalışır?": vacuole,
    "Öglenada koşul, beslenme sonucunu değiştirir": euglena,
  },
  bitkiler: {
    "Açık ve kapalı tohumlunun kanıtı": plantKey,
    "Tek ve çift çenekliler: tek belirtiyi abartma": monocots,
  },
  omurgalilar: {
    "Balık: solungaç ve tek dolaşım": fishLoop,
    "Kalp odacığı ve kan yollarını birlikte değerlendir": hearts,
  },
};
