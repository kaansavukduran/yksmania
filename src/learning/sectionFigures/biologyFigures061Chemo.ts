import { type El, type FigureDef, type Tone } from "./figureKit";
import { A, B, L, T, chain, mk, tableFig } from "./biologyFigures060Kit";
import { bars, tr } from "./biologyFigures061Kit";

/*
 * AYT Biyoloji · Kemosentez ve oksijensiz solunum (Forge061). Akış şemaları
 * nitel öğretim şemasıdır, ölçekli değildir. Sayılar bölüm metninden gelir:
 * nitrifikasyonda mol N başına 1,5 ve 0,5 mol O₂; elektron katsayıları nitrat
 * → N₂ için 5, sülfat → sülfürlü ürün için 8, Fe³⁺ → Fe²⁺ için 1, CO₂ → CH₄
 * için 8; kapasite örneği 10 mol e⁻ ve 3 mol nitrat. ATP verimi uydurulmaz.
 */

/* ---------------- Kemosentez ---------------- */

const three = tableFig({
  caption:
    "Üç ayrı soruyu sırayla sor (bölüm metninden): karbon nereden, enerji hangi dönüşümden, elektron hangi maddeden geliyor? Kemolitoototrofta karbon CO₂'den, enerji kimyasal redoks tepkimesinden, elektron indirgenmiş inorganik maddeden gelir. Kimyasal enerji kullanan her canlı ototrof değildir.",
  alt: "Üç satırlı tablo: karbon kaynağı kemolitoototrofta CO₂, insanda organik besin; enerji iki canlıda da kimyasal; elektron vericisi kemolitoototrofta inorganik madde, insanda organik besin.",
  headers: ["Soru", "Kemolitoototrof", "İnsan"],
  rows: [
    ["Karbon", "CO₂", "organik besin"],
    ["Enerji", "kimyasal\n(redoks)", "kimyasal\n(besin)"],
    ["Elektron", "inorganik\nmadde", "organik\nbesin"],
  ],
  readout: ["Ototrof: karbon inorganik kaynaktan. Kemotrof: enerji kimyasal tepkimeden.", "Litotrof: elektron vericisi inorganik."],
});

const redox = mk({
  caption:
    "Oksidasyon elektron kaybıdır (nitel şema): Fe²⁺ bir elektron vererek Fe³⁺ olur ve yükseltgenir; aynı anda bu elektronu alan başka bir sistem indirgenir. Oksidasyon için O₂ ile birleşme şartı yoktur; iki olay birlikte bir redoks çiftidir.",
  alt: "Solda Fe²⁺ kutusundan Fe³⁺ kutusuna ok ve yükseltgenme yazısı; ortadan çıkan elektron oku sağdaki alıcı kutusuna gidiyor, alıcı indirgenmiş alıcıya dönüşüyor.",
  h: 260,
  draw: () => {
    const els: El[] = [
      ...B(90, 50, "Fe²⁺", { w: 110, tone: "warn", bold: true }),
      A(90, 74, 90, 170, "warn"),
      ...B(90, 196, "Fe³⁺", { w: 110, tone: "warn", fill: "warn", bold: true }),
      T(104, 100, "yükseltgenir", "e", { tone: "warn" }),
      A(150, 150, 340, 150, "c", { bold: true }),
      T(250, 128, "e⁻", "c", { tone: "c", bold: true }),
      ...B(430, 50, "Alıcı", { w: 150, tone: "b" }),
      A(430, 74, 430, 170, "b"),
      ...B(430, 196, "İndirgenmiş\nalıcı", { w: 170, tone: "b", fill: "b" }),
      T(416, 100, "indirgenir", "w", { tone: "b" }),
    ];
    return { els, readout: ["Elektron veren yükseltgenir, elektron alan indirgenir.", "Enerji veren maddenin oksitlenmesi ile karbonun indirgenmesi bağlı ama ayrı süreçlerdir."] };
  },
});

const energy = mk({
  caption:
    "Elektron akışı ATP ve indirgeme gücü sağlar (nitel akış şeması): inorganik vericinin oksidasyonundan gelen elektronlar zar üzerindeki taşıyıcılardan geçer, iyon farkı kurulur ve ATP sentazla ATP üretilir. CO₂ özümlemesi ATP'nin yanında indirgenmiş taşıyıcılar da ister. ATP verimi için sayı verilmez.",
  alt: "Solda yukarıdan aşağı: inorganik verici oksitlenir, zar taşıyıcıları, iyon farkı, ATP sentaz ve ATP. Sağda indirgenmiş taşıyıcılar kutusu. ATP ve indirgenmiş taşıyıcılardan alttaki CO₂ özümlemesi ve organik madde kutusuna oklar.",
  h: 440,
  draw: () => {
    const c = chain(
      [
        { label: "İnorganik verici\noksitlenir", tone: "warn" },
        { label: "Zar taşıyıcıları" },
        { label: "İyon farkı" },
        { label: "ATP sentaz → ATP", tone: "a", fill: "a", bold: true },
      ],
      { cx: 140, w: 240, gap: 26 },
    );
    const els = [...c.els];
    els.push(...B(410, 110, "İndirgenmiş\ntaşıyıcılar", { w: 200, tone: "c" }), A(262, 50, 330, 90, "c"));
    els.push(...B(266, 388, "CO₂ özümlemesi →\norganik madde", { w: 300, tone: "b", fill: "b", bold: true }));
    els.push(A(140, c.h - 10, 200, 344, "a"), A(410, 150, 330, 344, "c"));
    return { els, readout: ["Bir amonyak molekülü için türden bağımsız sabit ATP sayısı kurulmaz.", "Klorofilin ışıkla uyarılması bu süreçte zorunlu değildir."] };
  },
});

const NIT = [
  { name: "Başlangıç", n: [1, 0, 0], o2: 0, txt: "1 mol N amonyum (NH₄⁺) olarak." },
  { name: "1. basamak", n: [0, 1, 0], o2: 1.5, txt: "NH₄⁺ + 1,5 O₂ → NO₂⁻ + 2 H⁺ + H₂O: 1 mol N nitrite, 1,5 mol O₂ tüketilir." },
  { name: "2. basamak", n: [0, 0, 1], o2: 2, txt: "NO₂⁻ + 0,5 O₂ → NO₃⁻: 1 mol N nitrata; toplam O₂ 1,5 + 0,5 = 2 mol." },
];
const nitrify = mk({
  caption:
    "Nitrifikasyonda atom miktarı korunur (bölümdeki denklemler, 1 mol N için): amonyumdan nitrite 1,5 mol O₂, nitritten nitrata 0,5 mol O₂ gerekir. Her azotlu tanecikte bir N vardır; giriş ve başka çıkış yoksa üç deponun toplamı sabittir. Oksijen depo olarak üretilmez; tüketilir.",
  alt: "Üç yatay çubuk: amonyum, nitrit ve nitrat depolarındaki mol N; dördüncü çubuk tüketilen toplam O₂. Adımlar azotu amonyumdan nitrite, sonra nitrata taşır.",
  h: 220,
  steps: NIT.map((s) => s.name),
  draw: (_v, step) => {
    const s = NIT[step];
    const tone = (i: number): Tone => (s.n[i] ? "a" : "muted");
    const b = bars(
      [
        { label: "NH₄⁺ (mol N)", value: s.n[0], tone: tone(0) },
        { label: "NO₂⁻ (mol N)", value: s.n[1], tone: tone(1) },
        { label: "NO₃⁻ (mol N)", value: s.n[2], tone: tone(2) },
        { label: "Tüketilen O₂", value: s.o2, text: `${tr(s.o2)} mol`, tone: "warn" },
      ],
      { max: 2 },
    );
    return { els: b.els, readout: [s.txt, `Azot toplamı: ${s.n.join(" + ")} = 1 mol.`] };
  },
});

const cycle = mk({
  caption:
    "Azot bağlama, nitrifikasyon ve denitrifikasyon (nitel döngü şeması): N₂ → NH₃ bağlamadır (indirgenme); NH₄⁺ → NO₂⁻ → NO₃⁻ nitrifikasyondur (yükseltgenme); NO₃⁻ → N₂ seçili denitrifikasyon yoludur. Başlangıç maddesi, elektron yönü ve ekolojik sonuç farklıdır.",
  alt: "Dört kutulu döngü: üstte N₂, sağda NH₃/NH₄⁺, altta NO₂⁻, solda NO₃⁻. N₂'den amonyuma bağlama oku, amonyumdan nitrite ve nitrata nitrifikasyon okları, nitrattan N₂'ye denitrifikasyon oku.",
  h: 340,
  draw: () => {
    const els: El[] = [
      ...B(266, 34, "N₂", { w: 110, tone: "muted", bold: true }),
      ...B(440, 170, "NH₃ / NH₄⁺", { w: 150, tone: "b", bold: true }),
      ...B(266, 306, "NO₂⁻", { w: 110, tone: "a", bold: true }),
      ...B(92, 170, "NO₃⁻", { w: 110, tone: "a", bold: true }),
      A(320, 50, 420, 144, "b", { bold: true }),
      A(420, 196, 316, 290, "a", { bold: true }),
      A(214, 290, 112, 196, "a", { bold: true }),
      A(112, 144, 212, 50, "warn", { bold: true }),
    ];
    els.push(T(380, 80, "bağlama", "e", { tone: "b" }), T(380, 262, "nitrifikasyon", "e", { tone: "a" }), T(152, 262, "nitrifikasyon", "w", { tone: "a" }), T(20, 30, "denitrifikasyon", "e", { tone: "warn" }));
    return { els, readout: ["Nitrifikasyon havanın N₂'sini doğrudan bitkiye bağlamak değildir.", "Bitkiler türe ve koşula göre amonyum ya da nitrat kullanabilir."] };
  },
});

/* ---------------- Oksijensiz solunum ---------------- */

const sequence = mk({
  caption:
    "Verici, zincir ve son alıcı (nitel akış şeması): elektron vericisi oksitlenir, elektronlar zar üzerindeki taşıyıcılardan geçer, son alıcı indirgenir. Anaerobik solunumu ayıran, solunumsal taşıma yolunda O₂ yerine nitrat, sülfat, Fe³⁺ ya da CO₂ gibi başka bir son alıcının kullanılmasıdır.",
  alt: "Yukarıdan aşağı dört kutu: verici oksitlenir, zar taşıyıcıları, son alıcı indirgenir, ürün. Son alıcı kutusunun yanında örnekler nitrat, sülfat, Fe³⁺, CO₂.",
  h: 330,
  draw: () => {
    const c = chain(
      [
        { label: "Verici: oksitlenir", tone: "warn" },
        { label: "Zar taşıyıcıları (ETS)" },
        { label: "Son alıcı: indirgenir", tone: "b", fill: "b", bold: true },
        { label: "Ürün", tone: "a" },
      ],
      { cx: 160, w: 280, gap: 30 },
    );
    const els = [...c.els, T(316, 196, "NO₃⁻, SO₄²⁻,", "e", { tone: "b" }), T(316, 224, "Fe³⁺, CO₂", "e", { tone: "b" })];
    return { els, readout: ["Bir madde adı tek başına verici mi alıcı mı olduğunu söylemez.", "Bu mikroorganizmalarda taşıyıcılar hücre zarında yer alabilir; mitokondri gerekmez."] };
  },
});

const LADDER = [
  { name: "Nitrat → N₂", el: "N", from: 5, to: 0, per: 5 },
  { name: "Sülfat → sülfür", el: "S", from: 6, to: -2, per: 8 },
  { name: "Fe³⁺ → Fe²⁺", el: "Fe", from: 3, to: 2, per: 1 },
  { name: "CO₂ → CH₄", el: "C", from: 4, to: -4, per: 8 },
];
const ladder = mk({
  caption:
    "Yükseltgenme basamağı farkı elektron sayısını verir (bölümdeki dört referans): nitratın N'si +5'ten 0'a (5 e⁻), sülfatın S'si +6'dan −2'ye (8 e⁻), demir +3'ten +2'ye (1 e⁻), CO₂'nin C'si +4'ten −4'e (8 e⁻) iner. Elektron sayısı ATP verimi değildir.",
  alt: "Düşey yükseltgenme basamağı ekseni, +6'dan −4'e. Seçili alıcı için başlangıç basamağından ürün basamağına inen ok ve elektron sayısı. Adımlar dört alıcıyı sırayla gösterir.",
  h: 330,
  steps: LADDER.map((l) => l.name),
  draw: (_v, step) => {
    const l = LADDER[step];
    const Y = (k: number) => 40 + (6 - k) * 26;
    const els: El[] = [L(120, Y(6), 120, Y(-4), { tone: "muted" })];
    for (let k = 6; k >= -4; k -= 2) els.push(L(112, Y(k), 128, Y(k), { tone: "muted" }), T(100, Y(k), k > 0 ? `+${k}` : k < 0 ? `−${-k}` : "0", "w", { tone: "muted" }));
    els.push(A(200, Y(l.from), 200, Y(l.to), "b", { bold: true }));
    els.push(T(212, Y(l.from), `${l.el}: ${l.from > 0 ? "+" : ""}${l.from}`, "e", { tone: "warn", bold: true }), T(212, Y(l.to), `${l.el}: ${l.to > 0 ? "+" : l.to < 0 ? "−" : ""}${Math.abs(l.to)}`, "e", { tone: "a", bold: true }));
    els.push(T(330, (Y(l.from) + Y(l.to)) / 2, `${l.per} e⁻ / alıcı`, "e", { tone: "b", bold: true }));
    return { els, readout: [`${l.name}: ${l.from} − (${String(l.to).replace("-", "−")}) = ${l.per} elektron.`, "Katsayı formüldeki atom sayısından değil, basamak farkından gelir."] };
  },
});

const coeffs = tableFig({
  caption:
    "Elektron hesabı için dört açık referans (bölümdeki tablo): katsayılar seçilen ürün ve yükseltgenme basamağı farkından gelir. Bunlar yarı tepkime kapasitesidir; tam hücresel denklem ya da ATP verimi değildir. Mol cinsinden yarım mol N₂ anlamlıdır.",
  alt: "Dört satırlı tablo: nitrat → N₂ 5 mol elektron, ürün 0,5 mol; sülfat → H₂S ya da HS⁻ 8 mol elektron, 1; Fe³⁺ → Fe²⁺ 1 mol elektron, 1; CO₂ → CH₄ 8 mol elektron, 1.",
  headers: ["Alıcı → ürün", "e⁻ / alıcı", "Ürün / alıcı"],
  rows: [
    ["NO₃⁻ → N₂", "5", "0,5"],
    ["SO₄²⁻ → H₂S/HS⁻", "8", "1"],
    ["Fe³⁺ → Fe²⁺", "1", "1"],
    ["CO₂ → CH₄", "8", "1"],
  ],
  readout: ["Elektronları veren yakıt ve pH koşulları ayrıca tanımlanmadan tam denklem çıkmaz.", "İki nitrat N atomu bir mol N₂ oluşturur."],
});

const capacity = mk({
  caption:
    "Kapasiteyi hangi stok sınırlar? (bölümdeki örnek: 3 mol nitrat, nitrat → N₂ yolu, 5 e⁻/nitrat): işlenen alıcı = min(alıcı, elektron / 5). 10 mol e⁻ yalnız 2 mol nitratı işler, 1 mol nitrat artar, 1 mol N₂ oluşur. Son stoklar negatif olamaz.",
  alt: "Dört yatay çubuk: işlenen nitrat, artan nitrat, kullanılan elektron ve oluşan N₂. Sürgü elektron havuzunu 0 ile 20 mol arasında değiştirir.",
  h: 220,
  param: { label: "Elektron havuzu", min: 0, max: 20, step: 1, init: 10, unit: "mol e⁻" },
  draw: (e) => {
    const nit = 3;
    const done = Math.min(nit, e / 5);
    const used = done * 5;
    const b = bars(
      [
        { label: "İşlenen NO₃⁻", value: done, text: `${tr(done)} mol`, tone: "a" },
        { label: "Artan NO₃⁻", value: nit - done, text: `${tr(nit - done)} mol`, tone: "muted" },
        { label: "Kullanılan e⁻", value: used / 5, text: `${tr(used)} mol`, tone: "c" },
        { label: "Oluşan N₂", value: done / 2, text: `${tr(done / 2, 2)} mol`, tone: "b" },
      ],
      { max: 4 },
    );
    const lim = e / 5 < nit ? "elektron" : e / 5 > nit ? "nitrat" : "ikisi birlikte";
    return { els: b.els, readout: [`min(3, ${e} / 5) = ${tr(done)} mol nitrat işlenir; ${tr(nit - done)} mol artar; N₂ = ${tr(done / 2, 2)} mol.`, `Sınırlayan stok: ${lim}.`] };
  },
});

const ferment = tableFig({
  caption:
    "Fermantasyonla ayırırken üç ölçüt (bölüm metninden): ETS'nin varlığı, son alıcının kimliği ve ATP sentezinin yolu birlikte sorulur. O₂ kullanılmaması tek başına iki mekanizmayı ayırmaya yetmez.",
  alt: "Üç satırlı tablo: anaerobik solunumda solunumsal ETS var, son alıcı O₂ dışı dış alıcı, ATP ETS ve ATP sentazla; klasik fermantasyonda ETS yok, elektronlar organik ürüne aktarılır, net ATP glikolizde substrat düzeyinde.",
  headers: ["Ölçüt", "Anaerobik\nsolunum", "Klasik\nfermantasyon"],
  rows: [
    ["ETS", "var", "yok"],
    ["Son alıcı", "O₂ dışı\ndış alıcı", "organik\nürün"],
    ["ATP", "ETS ve\nATP sentaz", "glikoliz,\nsubstrat düzeyi"],
  ],
  readout: ["“Oksijensiz” sözcüğünü fermantasyonun eş anlamlısı yapma.", "Fermantasyonda NADH'ın elektronları organik ürüne aktarılır ve NAD⁺ yenilenir."],
});

export const biologyFigures061Chemo: Record<string, Record<string, FigureDef>> = {
  "kemosentez-enerji-karbon": {
    "Üç ayrı soruyu sırayla sor": three,
    "Oksidasyon elektron kaybıdır": redox,
    "Elektron akışı ATP ve indirgeme gücü sağlar": energy,
    "Azot bağlama ile nitrifikasyon aynı değildir": cycle,
    "Modelde atom miktarı korunur": nitrify,
  },
  "solunum-oksijensiz-alicilar": {
    "Verici, zincir ve son alıcıyı sırala": sequence,
    "Sülfat indirgenince kükürt biçimi değişir": ladder,
    "Elektron hesabı için dört açık referans": coeffs,
    "Kapasiteyi hangi stok sınırlar?": capacity,
    "Fermantasyonla ayırırken üç ölçüt kullan": ferment,
  },
};
