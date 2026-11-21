import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * TYT Coğrafya · Dış kuvvetler: akarsular, karst, rüzgâr ve buzul, kıyılar
 * (Forge058). Hepsi özgün, ölçekli olmayan öğretim şemalarıdır; sayı
 * kullanılmaz. Kesitlerde düşey ölçek abartılıdır; üstten görünüşler gerçek
 * bir yerin haritası değildir.
 */

const pad = (a: V, b: V): El[] => [txt(a, " ", "c"), txt(b, " ", "c")];
const wavy = (x0: number, x1: number, y: number, amp = 0.08, n = 12): V[] =>
  Array.from({ length: n + 1 }, (_, i) => v(x0 + ((x1 - x0) * i) / n, y + (i % 2 ? amp : -amp)));

/* ---------------- Akarsular ---------------- */

const basin: FigureDef = {
  caption:
    "Üstten şematik görünüş. Havza ana kol ve kollarının sularını topladığı alandır; kesikli su bölümü çizgisi komşu havzaları ayırır. Soldaki açık havza denize yüzeysel çıkış sağlar, sağdaki kapalı havza denize ulaşmayan bir iç çanağa (göl) yönelir. Bir yere tıkla. Sayfadaki sağ–sol pusula yönü değildir.",
  alt: "Kesikli su bölümü çizgisiyle ayrılmış iki havza. Solda kollar birleşip denize dökülüyor (ağız); sağda kollar bir göle akıyor. Kaynaklar yüksek kenarlarda.",
  picks: [
    { label: "Kaynak", title: "Kaynak", detail: ["Akarsuyun doğduğu alan; havzanın yüksek kenarına yakındır."] },
    { label: "Ağız", title: "Ağız", detail: ["Akarsuyun göle ya da denize ulaştığı yer. Açık havzadaki her damla denize varmaz: buharlaşma, sızma ve kullanım da vardır."] },
    { label: "Su bölümü", title: "Su bölümü çizgisi", detail: ["Komşu havzaları ayıran yüksek çizgi; iki yanına düşen yağış farklı havzalara akar."] },
    { label: "Kapalı havza", title: "Kapalı havza", detail: ["Denize yüzeysel çıkışı olmayan, suların iç çanağa yöneldiği havza."] },
  ],
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const t = (i: number): Tone => (pick === i ? "a" : "ink");
    els.push(poly([v(-6, -2.6), v(-1.6, -2.6), v(-1.6, -3.3), v(-6, -3.3)], { tone: "b", fill: "b", bare: true }), txt(v(-5.6, -2.95), "deniz", "e", { small: true, tone: "b" }));
    els.push(poly([v(0.2, 2.6), v(-0.3, 1.2), v(0.3, -0.2), v(-0.2, -1.4), v(0.1, -2.6)], { open: true, smooth: true, tone: pick === 2 ? "a" : "warn", dash: true, bold: pick === 2 }));
    // Açık havza: ana kol ve kollar.
    const main: V[] = [v(-3.2, 2.2), v(-3.6, 0.8), v(-3.4, -0.6), v(-3.9, -1.7), v(-3.8, -2.6)];
    els.push(poly(main, { open: true, smooth: true, tone: "b", bold: true }));
    els.push(poly([v(-1.0, 1.6), v(-2.0, 0.6), v(-3.45, -0.3)], { open: true, smooth: true, tone: "b" }), poly([v(-5.6, 1.2), v(-4.6, 0.2), v(-3.5, -0.9)], { open: true, smooth: true, tone: "b" }));
    els.push(circle(v(-3.2, 2.2), 0.1, { tone: t(0), fill: t(0) }), txt(v(-3.0, 2.35), "kaynak", "e", { small: true, bold: true, tone: t(0), pick: 0 }));
    els.push(txt(v(-3.6, -2.25), "ağız", "e", { small: true, bold: true, tone: t(1), pick: 1 }));
    els.push(txt(v(0.35, 2.45), "su bölümü", "e", { small: true, bold: true, tone: pick === 2 ? "a" : "warn", pick: 2 }));
    // Kapalı havza.
    els.push(poly([v(2.6, -1.3), v(4.4, -1.3), v(4.8, -2.0), v(3.6, -2.4), v(2.3, -2.0)], { smooth: true, tone: "b", fill: "b" }));
    els.push(poly([v(3.2, 2.0), v(3.0, 0.6), v(3.4, -1.3)], { open: true, smooth: true, tone: "b", bold: true }), poly([v(5.4, 1.0), v(4.6, -0.2), v(4.2, -1.35)], { open: true, smooth: true, tone: "b" }));
    els.push(txt(v(3.55, -2.9), "kapalı havza (göl)", "c", { small: true, bold: true, tone: t(3), pick: 3 }));
    els.push(txt(v(-3.4, 3.1), "açık havza", "c", { small: true, tone: "muted" }));
    els.push(...pad(v(-6.2, 3.5), v(6.4, -3.5)));
    const det = pick >= 0 ? [["Kaynak: akarsuyun doğduğu alan."], ["Ağız: göle ya da denize ulaştığı yer."], ["Su bölümü: komşu havzaları ayırır."], ["Kapalı havza: denize çıkışı olmayan iç çanak."]][pick][0] : "Bir yere tıkla ya da aşağıdan seç.";
    return { els, readout: [det, "Akarsu sürekli, mevsimlik ya da geçici olabilir; yön için pusula ya da harita bilgisi gerekir."] };
  },
};

const profile: FigureDef = {
  caption:
    "Boyuna profil: kaynaktan ağıza yatak tabanının yüksekliği. Eğimin büyük olduğu yukarı kesimde derine aşındırma, eğimin azaldığı aşağı kesimde yana aşındırma ve birikim öne çıkar. Taban seviyesi deniz ya da yerel bir göldür. Eğim yüzdesi = yükseklik farkı ÷ aynı birimdeki yatay uzaklık × 100. Düşey ölçek abartılı, sayı yok.",
  alt: "Soldan sağa alçalan içbükey eğri: solda dik kaynak kesimi, sağda deniz seviyesine yaklaşan yatık ağız kesimi; altta kesikli taban seviyesi çizgisi.",
  steps: ["Profil ve taban seviyesi", "Denge profili (ideal)"],
  draw: (_v, step) => {
    const f = (x: number) => 3.4 * Math.exp(-x / 2.4);
    const pts = Array.from({ length: 21 }, (_, i) => v(i * 0.45, f(i * 0.45) - f(9)));
    const els: El[] = [seg(v(-0.3, 0), v(10, 0), { tone: "b", dash: true })];
    if (step === 0) els.push(poly([v(0, 3.25), v(1.2, 2.1), v(2.0, 2.1), v(3.0, 1.0), v(5.0, 0.7), v(7.0, 0.2), v(9, 0)], { open: true, tone: "warn", bold: true }));
    else els.push(poly(pts, { open: true, smooth: true, tone: "warn", bold: true }));
    els.push(txt(v(10, 0.3), "taban seviyesi", "nw", { small: true, tone: "b" }));
    els.push(txt(v(0.2, 3.4), "kaynak", "e", { small: true, bold: true }), txt(v(9, -0.35), "ağız", "s", { small: true, bold: true }));
    els.push(txt(v(2.2, 2.9), "derine aşındırma", "e", { small: true, tone: "a" }), txt(v(5.4, 1.3), "yana aşındırma, birikim", "e", { small: true, tone: "c" }));
    els.push(...pad(v(-0.6, 4.0), v(10.4, -0.9)));
    return {
      els,
      readout:
        step === 0
          ? ["Gerçek profilde basamaklar (direnç farkı, şelale) bulunabilir; her basamakta eğim ve aşındırma değişir.", "Yalnız eğimden kesin akış hızı ya da aşınan ton miktarı çıkarılmaz."]
          : ["Denge profili uzun dönem ideal yaklaşımdır: profil taban seviyesine yaklaşan düzgün içbükey bir eğriye döner.", "Akarsu bir anda tamamen durmaz, aşındırması sıfırlanmaz."],
    };
  },
};

const VALLEYS: { name: string; ps: V[]; note: string }[] = [
  { name: "Kertik (V)", ps: [v(-3, 3), v(-0.15, 0), v(0.15, 0), v(3, 3)], note: "Derine aşınma baskın: dar V kesit." },
  { name: "Kanyon", ps: [v(-3, 3), v(-1.4, 3), v(-1.4, 2), v(-1.0, 2), v(-1.0, 0.8), v(-0.6, 0.8), v(-0.6, 0), v(0.6, 0), v(0.6, 0.8), v(1.0, 0.8), v(1.0, 2), v(1.4, 2), v(1.4, 3), v(3, 3)], note: "Dirençli ya da uygun yatay tabakalı yapıda derin, dik ve basamaklı yamaçlar." },
  { name: "Geniş tabanlı", ps: [v(-3, 3), v(-1.8, 0.4), v(-1.5, 0), v(1.5, 0), v(1.8, 0.4), v(3, 3)], note: "Yana aşınma ve alüvyal taban belirgin." },
  { name: "Asimetrik", ps: [v(-3, 3), v(-0.4, 0), v(0.4, 0), v(3, 1.0)], note: "İki yamaç farklı özellik gösterir: biri dik, öteki yatık." },
];
const valleys: FigureDef = {
  caption:
    "Vadi kesitlerinde şekil ile yapıyı birleştir. Adımlarda dört vadi türünün enine kesiti var. Yalnız tek bir çizgiden kayaç türü, kesin yaş ya da oluşum hızı seçilmez; soruda verilen yapı kanıtı gerekir. Şematik kesit, ölçekli değil.",
  alt: "Enine vadi kesiti: adımlarda dar V biçimli kertik vadi, basamaklı kanyon, düz tabanlı geniş vadi ve bir yamacı dik öteki yatık asimetrik vadi.",
  steps: VALLEYS.map((x) => x.name),
  draw: (_v, step) => {
    const k = VALLEYS[step];
    const els: El[] = [poly([...k.ps, v(3, -0.6), v(-3, -0.6)], { tone: "muted", fill: "muted", thin: true })];
    const floor = k.ps.filter((p) => p[1] === 0);
    if (floor.length >= 2) els.push(seg(v(floor[0][0] + 0.05, 0.06), v(floor[floor.length - 1][0] - 0.05, 0.06), { tone: "b", bold: true }));
    else els.push(circle(v(0, 0.1), 0.08, { tone: "b", fill: "b" }));
    els.push(txt(v(0, -1.0), k.name, "c", { small: true, bold: true }));
    els.push(...pad(v(-3.4, 3.4), v(3.4, -1.5)));
    return { els, readout: [k.note, "Şelalede eğim kırığı ve altında dev kazanı aranır; peneplen uzun aşınmayla taban seviyesine yaklaşmış yüzeydir."] };
  },
};

const meander: FigureDef = {
  caption:
    "Üstten görünüş. Menderes kıvrımının dış kıyısında daha hızlı akış aşındırır (oyulan yamaç), iç kıyısında görece yavaş akış biriktirir (kum birikimi). Aynı kesimde hem aşındırma hem biriktirme olur. Akış okunu ve virajın merkezini birlikte izle; şema ölçekli değildir.",
  alt: "Kıvrımlı akarsu yatağı; akış oku soldan sağa. Her kıvrımın dış kıyısı turuncu kalın çizgi (aşınma), iç kıyısı yeşil dolgu (birikim).",
  draw: () => {
    const c = (x: number) => 1.3 * Math.sin((x / 6) * 2 * Math.PI);
    const n = 40;
    const top = Array.from({ length: n + 1 }, (_, i) => v(-6 + (12 * i) / n, c(-6 + (12 * i) / n) + 0.35));
    const bot = Array.from({ length: n + 1 }, (_, i) => v(-6 + (12 * i) / n, c(-6 + (12 * i) / n) - 0.35));
    const els: El[] = [poly([...top, ...bot.reverse()], { tone: "b", fill: "b", bare: true })];
    els.push(poly(top, { open: true, smooth: true, tone: "b" }), poly(bot.slice().reverse(), { open: true, smooth: true, tone: "b" }));
    // Bend at x = 1.5 (crest): outer bank is top, inner bank is bottom.
    const outer = Array.from({ length: 9 }, (_, i) => { const x = 0.3 + i * 0.3; return v(x, c(x) + 0.42); });
    els.push(poly(outer, { open: true, smooth: true, tone: "warn", bold: true }));
    els.push(poly([v(0.6, c(0.6) - 0.42), v(1.5, 1.3 - 0.42), v(2.4, c(2.4) - 0.42), v(1.5, 0.15)], { smooth: true, tone: "c", fill: "c", thin: true }));
    els.push(txt(v(1.5, 2.05), "dış kıyı: aşınma", "n", { small: true, bold: true, tone: "warn" }), txt(v(1.5, -0.3), "iç kıyı: birikim", "s", { small: true, bold: true, tone: "c" }));
    // Trough at x = −1.5: outer bank bottom.
    const outer2 = Array.from({ length: 9 }, (_, i) => { const x = -2.7 + i * 0.3; return v(x, c(x) - 0.42); });
    els.push(poly(outer2, { open: true, smooth: true, tone: "warn", bold: true }));
    els.push(vec(v(-5.4, c(-5.4)), v(-4.4, c(-4.4)), { tone: "ink", bold: true }), txt(v(-5.2, c(-5.2) + 0.65), "akış", "c", { small: true }));
    els.push(...pad(v(-6.3, 2.9), v(6.3, -2.5)));
    return { els, readout: ["Büklümlü yol aynı iki uç arasında uzunluğu artırır; eğimi az alanlarda yana işleme önemlidir.", "İç bankta kum birikimini dış banktaki oyulmayla karıştırma."] };
  },
};

const deposit: FigureDef = {
  caption:
    "Birikim şekli konuma bağlıdır. Dağdan düzlüğe çıkışta eğim ve akış enerjisi azalınca birikinti konisi ya da yayvan yelpaze gelişebilir. Deltada akarsu ağzına getirilen tortunun sığ kıyıda tutulması gerekir; güçlü kıyı akıntısı tortuyu uzaklaştırabilir. Üstten şematik görünüş.",
  alt: "Adım 1: dağ eteğinden düzlüğe açılan yelpaze biçimli birikinti. Adım 2: akarsuyun denize döküldüğü yerde kollara ayrılan üçgen biçimli delta.",
  steps: ["Birikinti konisi", "Delta"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) {
      els.push(poly([v(-4, 3), v(4, 3), v(4, 1.6), v(-4, 1.6)], { tone: "muted", fill: "muted", bare: true }), txt(v(-3.8, 2.3), "dağ", "e", { small: true, tone: "muted" }));
      els.push(seg(v(-4, 1.6), v(4, 1.6), { thin: true }));
      els.push(poly([v(0, 1.6), v(-2.4, -0.8), v(-1.2, -1.5), v(0, -1.7), v(1.2, -1.5), v(2.4, -0.8)], { smooth: true, tone: "c", fill: "c", thin: true }));
      els.push(poly([v(0, 3), v(0, 1.6)], { open: true, tone: "b", bold: true }), vec(v(0, 1.4), v(-1.2, -0.6), { tone: "b" }), vec(v(0, 1.4), v(0, -0.9), { tone: "b" }), vec(v(0, 1.4), v(1.2, -0.6), { tone: "b" }));
      els.push(txt(v(2.6, -0.2), "birikinti konisi", "e", { small: true, bold: true, tone: "c" }), txt(v(-3.8, -1.6), "düzlük", "e", { small: true, tone: "muted" }));
    } else {
      els.push(poly([v(-4, -0.4), v(4, -0.4), v(4, -2.2), v(-4, -2.2)], { tone: "b", fill: "b", bare: true }), txt(v(-3.8, -1.8), "deniz (sığ kıyı)", "e", { small: true, tone: "b" }));
      els.push(seg(v(-4, -0.4), v(-1.6, -0.4), { thin: true }), seg(v(1.6, -0.4), v(4, -0.4), { thin: true }));
      els.push(poly([v(-1.6, -0.4), v(0, 0.6), v(1.6, -0.4), v(1.0, -1.4), v(0, -1.6), v(-1.0, -1.4)], { smooth: true, tone: "c", fill: "c", thin: true }));
      els.push(poly([v(0, 3), v(0, 0.6)], { open: true, tone: "b", bold: true }), poly([v(0, 0.6), v(-0.8, -1.25)], { open: true, tone: "b" }), poly([v(0, 0.6), v(0, -1.5)], { open: true, tone: "b" }), poly([v(0, 0.6), v(0.8, -1.25)], { open: true, tone: "b" }));
      els.push(txt(v(1.9, 0.0), "delta", "e", { small: true, bold: true, tone: "c" }), txt(v(0.2, 2.3), "akarsu", "e", { small: true, tone: "b" }));
    }
    els.push(...pad(v(-4.3, 3.3), v(4.3, -2.5)));
    return {
      els,
      readout:
        step === 0
          ? ["Yan yana birleşen koniler dağ eteği ovasına katkı verir; dağ içi çukurlar tortuyla dolabilir."]
          : ["Akarsu ağzı görmek delta varlığını tek başına kanıtlamaz; delta göl kıyısında da oluşabilir."],
    };
  },
};

const terrace: FigureDef = {
  caption:
    "Taraça: akarsu eski tabanını yarıp aşağı gömüldüğünde eski taban yüzeyleri yamaçlarda basamak olarak kalır. Taban seviyesi ya da yükselme değişimi olası nedenlerdir. Her basamak bir tortu yığını değildir. Enine şematik kesit, ölçekli değil.",
  alt: "Adım 1: geniş, düz tabanlı vadi. Adım 2: akarsu tabana gömülmüş; eski taban iki yanda basamak (taraça) olarak kalmış.",
  steps: ["Geniş eski taban", "Gömülme ve taraça"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) {
      els.push(poly([v(-4, 3), v(-2.6, 1.4), v(2.6, 1.4), v(4, 3), v(4, -0.8), v(-4, -0.8)], { tone: "muted", fill: "muted", thin: true }));
      els.push(seg(v(-0.4, 1.46), v(0.4, 1.46), { tone: "b", bold: true }), txt(v(0, 1.85), "eski taban", "n", { small: true, bold: true, tone: "c" }));
    } else {
      els.push(poly([v(-4, 3), v(-2.6, 1.4), v(-1.2, 1.4), v(-0.5, 0), v(0.5, 0), v(1.2, 1.4), v(2.6, 1.4), v(4, 3), v(4, -0.8), v(-4, -0.8)], { tone: "muted", fill: "muted", thin: true }));
      els.push(seg(v(-2.55, 1.46), v(-1.25, 1.46), { tone: "c", bold: true }), seg(v(1.25, 1.46), v(2.55, 1.46), { tone: "c", bold: true }));
      els.push(seg(v(-0.35, 0.06), v(0.35, 0.06), { tone: "b", bold: true }));
      els.push(txt(v(-1.9, 1.85), "taraça", "n", { small: true, bold: true, tone: "c" }), txt(v(1.9, 1.85), "taraça", "n", { small: true, bold: true, tone: "c" }));
      els.push(vec(v(0, 1.3), v(0, 0.35), { tone: "a" }), txt(v(0.2, 0.75), "gömülme", "e", { small: true, tone: "a" }));
    }
    els.push(...pad(v(-4.3, 3.3), v(4.3, -1.1)));
    return { els, readout: [step === 0 ? "Akarsu geniş bir taban üzerinde yana işler." : "Akarsu yeniden derine aşındırınca eski taban yüzeyleri iki yanda basamak olarak kalır.", "Eski birikim yüzeyi sonradan aşınmış olabilir; nedeni verilen koşulla kur."] };
  },
};

/* ---------------- Karst ---------------- */

const KARST = [
  { label: "Lapya", where: "yüzeyde", text: "Kaya yüzeyindeki küçük çözünme olukları." },
  { label: "Dolin", where: "yüzeyde", text: "Çözünme ya da çökme katkısıyla gelişen kapalı çanak." },
  { label: "Düden", where: "girişte", text: "Yüzey suyunun yer altına girdiği açıklık; su yok olmaz, yer altı akışına katılır." },
  { label: "Mağara", where: "yer altında", text: "Çözünmeyle genişleyen boşluk; bağlantılı geçitler galeri." },
  { label: "Sarkıt ve dikit", where: "boşluğun içinde", text: "Çökelmeyle büyür: sarkıt tavandan, dikit tabandan." },
  { label: "Karstik kaynak", where: "çıkışta", text: "Yer altındaki su yeniden yüzeye çıkabilir; giriş–kaynak bağlantısı izleme çalışması ister." },
];
const karstSection: FigureDef = {
  caption:
    "Kalker kesitinde karst şekillerinin konumu: lapya ve dolin yüzeyde, düden girişte, mağara yer altında, sarkıt ve dikit boşluğun içinde, kaynak çıkışta. Bir şekle tıkla. Kesit büyütülmüş özgün şemadır, gerçek bir mağaranın ölçüsü değildir.",
  alt: "Kalker kütlesi kesiti: yüzeyde tırtıklı lapya ve çanak biçimli dolin; bir akarsu düdenden yer altına giriyor; içeride mağara boşluğu, tavanından sarkıt ve tabanından dikit; sağ yamaçta su kaynaktan çıkıyor.",
  picks: KARST.map((k) => ({ label: k.label, title: `${k.label} (${k.where})`, detail: [k.text] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const tone = (i: number): Tone => (pick === i ? "a" : "ink");
    const ground: V[] = [v(-6, 3), v(-4.6, 3), v(-4.4, 3.2), v(-4.2, 3), v(-4.0, 3.2), v(-3.8, 3), v(-2.4, 3), v(-1.8, 2.3), v(-1.0, 2.3), v(-0.4, 3), v(1.0, 3), v(1.2, 2.7), v(1.4, 3), v(6, 3), v(6, 0.6)];
    els.push(poly([...ground, v(6, -0.6), v(-6, -0.6)], { tone: "muted", fill: "muted", thin: true }));
    // Mağara boşluğu.
    els.push(poly([v(-2.6, 0.4), v(-2.0, 1.5), v(1.6, 1.6), v(3.2, 0.9), v(3.6, 0.4), v(2.0, 0.1), v(-1.8, 0.1)], { smooth: true, tone: tone(3), fill: "ink", bold: pick === 3 }));
    // Sarkıt ve dikit.
    els.push(poly([v(0.0, 1.58), v(0.15, 1.05), v(0.3, 1.6)], { tone: tone(4), fill: "c", thin: true }), poly([v(0.0, 0.12), v(0.15, 0.6), v(0.3, 0.12)], { tone: tone(4), fill: "c", thin: true }));
    // Akarsu ve düden.
    els.push(poly([v(4.6, 3.05), v(3.0, 3.05), v(1.25, 2.75)], { open: true, tone: "b", bold: true }), vec(v(1.2, 2.6), v(1.0, 1.65), { tone: "b" }));
    // Kaynak.
    els.push(vec(v(3.6, 0.5), v(6.2, 0.6), { tone: "b", bold: true }));
    els.push(txt(v(-4.2, 3.45), "lapya", "n", { small: true, bold: true, tone: tone(0), pick: 0 }));
    els.push(txt(v(-1.4, 3.35), "dolin", "n", { small: true, bold: true, tone: tone(1), pick: 1 }));
    els.push(txt(v(1.3, 3.35), "düden", "n", { small: true, bold: true, tone: tone(2), pick: 2 }));
    els.push(txt(v(-1.6, -0.25), "mağara", "s", { small: true, bold: true, tone: tone(3), pick: 3 }));
    els.push(txt(v(0.6, -0.25), "sarkıt · dikit", "se", { small: true, bold: true, tone: tone(4), pick: 4 }));
    els.push(txt(v(6.1, 0.25), "kaynak", "sw", { small: true, bold: true, tone: tone(5), pick: 5 }));
    els.push(...pad(v(-6.3, 4.1), v(6.5, -1.4)));
    const sel = pick >= 0 ? `${KARST[pick].label} (${KARST[pick].where}): ${KARST[pick].text}` : "Bir şekle tıkla ya da aşağıdan seç.";
    return { els, readout: [sel, "Önce sor: malzeme yerinden çözünüp uzaklaşıyor mu (lapya, dolin, mağara), yoksa çökelip ekleniyor mu (sarkıt, dikit, traverten)?"] };
  },
};

const dolines: FigureDef = {
  caption:
    "Üstten şematik görünüş. Kapalı çanaklar büyüdükçe birleşebilir: dolinlerin birleşmesi daha büyük ve düzensiz uvalayı oluşturabilir. Polye geniş, çoğunlukla düz tabanlı karstik kapalı alandır; yerel yapı ve tektonik de biçimlenmesine katılır, bu yüzden her polye tek bir doğrusal büyümenin sonucu değildir.",
  alt: "Adım 1: ayrı ayrı küçük daire biçimli dolinler. Adım 2: kenarları birleşmiş düzensiz uvala. Adım 3: geniş düz tabanlı polye.",
  steps: ["Dolinler", "Uvala", "Polye"],
  draw: (_v, step) => {
    const els: El[] = [];
    const ring = (c: V, r: number) => Array.from({ length: 24 }, (_, i) => v(c[0] + r * Math.cos((i / 24) * 2 * Math.PI), c[1] + r * 0.7 * Math.sin((i / 24) * 2 * Math.PI)));
    if (step === 0) for (const c of [v(-2, 0), v(0, 0.3), v(2, -0.1)]) els.push(poly(ring(c, 0.7), { smooth: true, tone: "c", fill: "c" }));
    else if (step === 1) els.push(poly([v(-2.8, 0), v(-2.2, 0.6), v(-1, 0.5), v(0, 0.9), v(1, 0.5), v(2.2, 0.5), v(2.8, -0.1), v(2.1, -0.7), v(1, -0.4), v(0, -0.5), v(-1, -0.4), v(-2.2, -0.6)], { smooth: true, tone: "c", fill: "c" }));
    else {
      els.push(poly([v(-3.6, 0), v(-3, 1), v(0, 1.3), v(3, 1), v(3.6, 0), v(3, -1), v(0, -1.3), v(-3, -1)], { smooth: true, tone: "c", fill: "c" }));
      els.push(txt(v(0, 0), "düz taban", "c", { small: true, tone: "c" }));
    }
    els.push(txt(v(0, -1.9), ["dolin", "uvala", "polye"][step], "c", { small: true, bold: true }));
    els.push(...pad(v(-4, 1.8), v(4, -2.4)));
    return { els, readout: [["Dolin: kapalı çanak.", "Uvala: birleşen dolinler, daha büyük ve düzensiz çanak.", "Polye: geniş, düz tabanlı kapalı alan."][step], "Bu adlar yalnız mutlak derinliğe göre sıralanan cetvel aralıkları değildir."] };
  },
};

const dripstone: FigureDef = {
  caption:
    "Mağara boşluğu çoğunlukla çözünmeyle açılır, içindeki birikim ise çökelmeyle büyür: tavanda biriken mineral aşağı uzanan sarkıtı, tabanda büyüyen birikim dikiti oluşturur; ikisi birleşince sütun gelişir. Her damla sütun yapmaz; uzun süreli beslenme gerekir. Şema ölçekli değildir.",
  alt: "Mağara kesiti: adım 1'de tavandan sarkan sivri sarkıt ve damla, adım 2'de tabandan yükselen dikit, adım 3'te ikisi birleşmiş sütun.",
  steps: ["Sarkıt", "Dikit", "Sütun"],
  draw: (_v, step) => {
    const els: El[] = [];
    els.push(poly([v(-3, 3), v(3, 3), v(3, 2.4), v(-3, 2.4)], { tone: "muted", fill: "muted", bare: true }), seg(v(-3, 2.4), v(3, 2.4), { thin: true }));
    els.push(poly([v(-3, 0), v(3, 0), v(3, -0.6), v(-3, -0.6)], { tone: "muted", fill: "muted", bare: true }), seg(v(-3, 0), v(3, 0), { thin: true }));
    const len = step === 2 ? 1.2 : 0.9 + step * 0.15;
    els.push(poly([v(-0.35, 2.4), v(0, 2.4 - len), v(0.35, 2.4)], { tone: "c", fill: "c" }));
    if (step >= 1) els.push(poly([v(-0.45, 0), v(0, step === 2 ? 1.2 : 0.8), v(0.45, 0)], { tone: "c", fill: "c" }));
    if (step === 0) els.push(circle(v(0, 2.4 - len - 0.3), 0.07, { tone: "b", fill: "b" }), txt(v(0.25, 2.4 - len - 0.3), "damla", "e", { small: true, tone: "b" }));
    els.push(txt(v(-0.6, 1.95), "sarkıt (tavandan)", "w", { small: true, bold: true, tone: "c" }));
    if (step >= 1) els.push(txt(v(0.6, 0.35), "dikit (tabandan)", "e", { small: true, bold: true, tone: "c" }));
    if (step === 2) els.push(txt(v(0.5, 1.2), "sütun", "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-2.8, 2.7), "tavan", "e", { small: true, tone: "muted" }), txt(v(-2.8, -0.3), "taban", "e", { small: true, tone: "muted" }));
    els.push(...pad(v(-3.3, 3.3), v(3.3, -0.9)));
    return { els, readout: [["Sarkıt tavandan aşağı uzanır.", "Dikit tabandan yukarı büyür.", "Sarkıt ile dikit birleşince sütun gelişir."][step], "Aynı fotoğraftaki boşluk ve birikim şekline tek bir süreç etiketi vermek yetersizdir."] };
  },
};

/* ---------------- Rüzgâr ve buzul ---------------- */

const barchan: FigureDef = {
  caption:
    "Barkan, tek baskın rüzgâr ve sınırlı kum koşullarında hilal biçimiyle tanınabilir; kolları taşınma yönüne uzanır. İkinci adımda tane boyu: kumul kum tanelerinden, lös çoğunlukla silt boyutlu ince malzemeden oluşur; her kumul lös değildir. Üstten şematik görünüş; taneler temsilîdir, ölçüm değildir.",
  alt: "Adım 1: soldan esen rüzgâr oku ve kolları sağa uzanan hilal biçimli barkan. Adım 2: iri kum taneleri ve daha ince silt taneleri yan yana, ince taneler daha uzağa taşınmış.",
  steps: ["Barkan", "Kum ve silt"],
  draw: (_v, step) => {
    const els: El[] = [];
    els.push(vec(v(-4.2, 1.8), v(-2.4, 1.8), { tone: "b", bold: true }), txt(v(-4.2, 2.15), "baskın rüzgâr", "e", { small: true, tone: "b" }));
    if (step === 0) {
      const outer = Array.from({ length: 13 }, (_, i) => { const a = -Math.PI / 2 + (i / 12) * Math.PI; return v(-0.2 - 1.6 * Math.cos(a), 1.5 * Math.sin(a)); });
      const inner = Array.from({ length: 13 }, (_, i) => { const a = Math.PI / 2 - (i / 12) * Math.PI; return v(1.1 - 0.9 * Math.cos(a), 1.3 * Math.sin(a)); });
      els.push(poly([...outer, v(2.4, 1.5), ...inner, v(2.4, -1.5)], { smooth: true, tone: "warn", fill: "warn" }));
      els.push(txt(v(2.6, 1.55), "kol", "e", { small: true, tone: "warn" }), txt(v(2.6, -1.55), "kol", "e", { small: true, tone: "warn" }));
      els.push(txt(v(-1.0, -1.9), "barkan", "c", { small: true, bold: true, tone: "warn" }));
    } else {
      let seed = 3;
      const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
      for (let k = 0; k < 10; k++) els.push(circle(v(-2.6 + rnd() * 2.0, -0.6 + rnd() * 1.4), 0.14, { tone: "warn", fill: "warn", thin: true }));
      for (let k = 0; k < 22; k++) els.push(circle(v(0.8 + rnd() * 3.2, -0.6 + rnd() * 1.4), 0.05, { tone: "c", fill: "c" }));
      els.push(txt(v(-1.6, -1.1), "kum (kumul)", "c", { small: true, bold: true, tone: "warn" }), txt(v(2.4, -1.1), "silt (lös)", "c", { small: true, bold: true, tone: "c" }));
    }
    els.push(...pad(v(-4.4, 2.6), v(4.4, -2.3)));
    return { els, readout: [step === 0 ? "Hilalin kolları rüzgârın taşıdığı yöne uzanır; bütün kumullar aynı şekil ya da yön bilgisi taşımaz." : "İnce silt taneleri daha uzağa taşınıp lös olarak birikebilir; bitki örtüsü kum hareketini azaltabilir.", "Kurak yer görmek bütün aşındırmayı yalnız rüzgâra bağlamaz; ani seller de etkilidir."] };
  },
};

const UV = [
  { name: "Akarsu: V kesit", note: "Akarsu derine aşındırır: dar V kesit." },
  { name: "Buzul: U kesit", note: "Buzul tekne biçimli U vadi bırakır; çizikler ve cilalı yüzeyler kanıtı güçlendirir." },
  { name: "Asılı vadi", note: "Yan vadi ana buzul vadisine göre yüksekte kalır: farklı oyulmanın izi." },
];
const uValley: FigureDef = {
  caption:
    "Akarsu V kesiti ile buzul U kesitinin öğretim şeması; gerçek her vadinin kusursuz harf biçiminde olduğu iddiası değildir. Asılı vadide yan vadinin ağzı ana vadi tabanının üstünde kalır. Şematik enine kesit.",
  alt: "Adım 1: dar V biçimli vadi. Adım 2: geniş, dik yamaçlı ve çukur tabanlı U vadi. Adım 3: U vadinin yamacında yüksekte kalan yan vadi ağzı ve ondan düşen şelale.",
  steps: UV.map((u) => u.name),
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) els.push(poly([v(-3, 3), v(-0.15, 0), v(0.15, 0), v(3, 3), v(3, -0.6), v(-3, -0.6)], { tone: "muted", fill: "muted", thin: true }));
    else {
      const u = Array.from({ length: 15 }, (_, i) => { const a = Math.PI + (i / 14) * Math.PI; return v(2.0 * Math.cos(a), 2.6 + 2.6 * Math.sin(a)); });
      els.push(poly([v(-3, 3), v(-2.0, 2.6), ...u, v(2.0, 2.6), v(3, 3), v(3, -0.6), v(-3, -0.6)], { smooth: true, tone: "muted", fill: "muted", thin: true }));
      if (step === 2) {
        els.push(poly([v(1.95, 2.0), v(2.4, 1.85), v(3.0, 2.1)], { open: true, tone: "b", bold: true }), vec(v(1.95, 1.95), v(1.6, 0.7), { tone: "b" }));
        els.push(txt(v(2.6, 1.6), "asılı vadi", "se", { small: true, bold: true, tone: "a" }));
      }
    }
    els.push(txt(v(0, -1.35), step === 0 ? "V" : "U", "c", { bold: true, tone: step === 0 ? "b" : "c" }));
    els.push(...pad(v(-3.3, 3.3), v(3.6, -1.9)));
    return { els, readout: [UV[step].note, "Tek bir geniş çukur tek başına kesin buzul teşhisi değildir."] };
  },
};

const moraine: FigureDef = {
  caption:
    "Buzul farklı boydaki malzemeyi birlikte taşıyıp doğrudan bırakınca kötü boylanmış moren gelişir. Erime suyunun taşıdığı malzeme buzul önünde daha iyi boylanmış ve tabakalı sander düzlüğü oluşturur: başlangıç malzemesi buzulla ilişkili, son taşıyıcı akarsudur. Boyuna şematik kesit, taneler temsilî.",
  alt: "Solda buzul dili, önünde karışık boylu tanelerden oluşan moren tepesi, sağda erime suyunun bıraktığı ince ve düzenli tabakalı sander düzlüğü.",
  draw: () => {
    const els: El[] = [];
    els.push(seg(v(-6, 0), v(6, 0), { thin: true }));
    els.push(poly([v(-6, 0), v(-6, 2.4), v(-3.6, 1.6), v(-2.6, 0)], { smooth: true, tone: "b", fill: "b", thin: true }), txt(v(-5.0, 1.0), "buzul", "c", { small: true, bold: true, tone: "b" }));
    els.push(poly([v(-2.6, 0), v(-1.6, 1.3), v(-0.4, 0)], { smooth: true, tone: "muted", fill: "muted", thin: true }));
    let seed = 11;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    for (let k = 0; k < 9; k++) {
      const x = -2.2 + rnd() * 1.3;
      const r = 0.05 + rnd() * 0.17;
      els.push(circle(v(x, 0.1 + r + rnd() * Math.max(0, 0.9 - Math.abs(x + 1.5) * 0.9)), r, { tone: "warn", fill: "warn", thin: true }));
    }
    for (let row = 0; row < 3; row++) els.push(poly(wavy(0.2, 5.6, 0.15 + row * 0.22, 0.03, 14), { open: true, tone: "c", thin: true }));
    els.push(vec(v(-0.2, 1.1), v(1.6, 0.9), { tone: "b" }), txt(v(0.0, 1.45), "erime suyu", "e", { small: true, tone: "b" }));
    els.push(txt(v(-1.5, -0.35), "moren: karışık", "s", { small: true, bold: true, tone: "warn" }), txt(v(3.0, -1.0), "sander: boylanmış, tabakalı", "s", { small: true, bold: true, tone: "c" }));
    els.push(...pad(v(-6.3, 2.8), v(6.3, -1.8)));
    return { els, readout: ["Kötü boylanmış taşlı yığın doğrudan buzulla, düzenli çakıl–kum tabakaları erime suyuyla uyumludur.", "Drumlinler buzul altındaki akış yönüyle ilişkili uzamış tepelerdir."] };
  },
};

const SNOW = [
  { name: "Ekvatora yakın", y: 3.0, note: "Ekvatora yakın yüksek dağlarda da buzul bulunabilir; kar sınırı yüksektedir." },
  { name: "Orta enlem", y: 2.0, note: "Orta enlemlerde kalıcı kar sınırı daha alçaktır; bakı ve yağış yerel farklar yaratır." },
  { name: "Kutba yakın", y: 0.7, note: "Kutba yakın alanlarda kar sınırı alçalır; geniş örtü buzulları gelişebilir." },
];
const snowline: FigureDef = {
  caption:
    "Kalıcı kar sınırı, karın yıl boyunca kalabildiği alt yükselti sınırı için kullanılan ideal kavramdır. Enlem, yükselti, bakı ve yağışla değişir; bütün dünyada sabit metre değildir. Adımlarda aynı dağ şemasında sınırın enleme göre nitel konumu (sayı yok, ölçekli değil).",
  alt: "Tek bir dağ kesiti; kesikli yatay kalıcı kar sınırı ve üstündeki beyaz kar örtüsü. Adımlarda sınır ekvatora yakın yerde yüksek, orta enlemde ortada, kutba yakın yerde alçakta.",
  steps: SNOW.map((s) => s.name),
  draw: (_v, step) => {
    const s = SNOW[step];
    const H = 3.6;
    const els: El[] = [poly([v(-3.6, 0), v(0, H), v(3.6, 0)], { tone: "muted", fill: "muted", thin: true })];
    const w = (H - s.y) / H * 3.6;
    els.push(poly([v(-w, s.y), v(0, H), v(w, s.y)], { tone: "ink", fill: "ink", thin: true }));
    els.push(seg(v(-4.4, s.y), v(4.4, s.y), { tone: "b", dash: true }), txt(v(4.5, s.y), "kalıcı kar sınırı", "e", { small: true, bold: true, tone: "b" }));
    els.push(seg(v(-4.6, 0), v(4.6, 0), { thin: true }));
    els.push(...pad(v(-4.8, 4.0), v(8.6, -0.5)));
    return { els, readout: [s.note, "Aysberg kara buzulundan kopan parça, bankiz deniz suyunun donmasıyla oluşan deniz buzudur."] };
  },
};

/* ---------------- Kıyılar ---------------- */

const cliff: FigureDef = {
  caption:
    "Dalga aşındırması dik kıyının tabanını oyar; üst bölüm çökerken dik yüzey geriler ve falez gelişir. Önünde açığa çıkan aşınım düzlüğü abrazyon platformudur. Adımlarda gerileme yönü ve malzeme kaybı birlikte görülür. Şematik kesit, ölçekli değil.",
  alt: "Adım 1: deniz seviyesinde dalga çentiği oyulmuş dik kıyı. Adım 2: üst bölüm çökmüş, kıyı kara yönünde gerilemiş, önünde düz abrazyon platformu.",
  steps: ["Taban oyulur", "Falez geriler"],
  draw: (_v, step) => {
    const els: El[] = [];
    const back = step === 0 ? 0 : 1.8;
    els.push(poly([v(-5, -0.8), v(-5, 0.2), v(0 + back, 0.2), v(0 + back, -0.8)], { tone: "b", fill: "b", bare: true }));
    const land: V[] = step === 0
      ? [v(0, 3), v(0, 0.9), v(0.5, 0.5), v(0, 0.1), v(-1.5, -0.3), v(-5, -0.8)]
      : [v(1.8, 3), v(1.8, 0.9), v(2.3, 0.5), v(1.8, 0.1), v(0, 0.0), v(-1.5, -0.3), v(-5, -0.8)];
    els.push(poly([...land, v(-5, -1.4), v(5, -1.4), v(5, 3)], { tone: "muted", fill: "muted", thin: true }));
    els.push(seg(v(-5, 0.2), v(back, 0.2), { tone: "b" }), txt(v(-4.8, 0.45), "deniz", "e", { small: true, tone: "b" }));
    els.push(vec(v(-2.6, 0.55), v(back - 0.2, 0.55), { tone: "a", bold: true }), txt(v(-2.6, 0.9), "dalga", "e", { small: true, tone: "a" }));
    if (step === 1) {
      els.push(poly([v(0, 3), v(1.8, 3), v(1.8, 0.9), v(0, 0.9)], { tone: "warn", dash: true, thin: true }));
      els.push(txt(v(0.9, 3.35), "aşınan kısım", "n", { small: true, tone: "warn" }));
      els.push(seg(v(-1.4, -0.15), v(1.7, 0.06), { tone: "c", bold: true }), txt(v(0.2, -0.55), "abrazyon platformu", "s", { small: true, bold: true, tone: "c" }));
      els.push(txt(v(2.0, 2.2), "falez", "e", { small: true, bold: true }));
    } else {
      els.push(txt(v(0.6, 0.5), "çentik", "e", { small: true, bold: true, tone: "a" }));
    }
    els.push(...pad(v(-5.3, 3.8), v(5.3, -1.7)));
    return { els, readout: [step === 0 ? "Dalga, deniz seviyesine yakın tabanı oyar; üstteki kütle desteksiz kalır." : "Üst kütle çöker, falez kara yönünde geriler; önünde aşınım düzlüğü kalır.", "Dar şelf ve dik kıyı aşınımı destekleyebilir; her dar şelf kıyısında aynı gerileme hızı zorunlu değildir."] };
  },
};

const SPITS = [
  { label: "Kıyı oku", text: "Bir ucu karaya bağlı uzanan birikim şeridi." },
  { label: "Kordon ve lagün", text: "Koy ağzını kapatmaya uzanan kordon koyun önünü ayırınca lagün gelişebilir; lagün suyu mutlaka tatlı değildir." },
  { label: "Tombolo", text: "Ada ile ana kara arasında kum boynu kuran birikim; dalganın oyduğu bir geçit değildir." },
];
const spits: FigureDef = {
  caption:
    "Üstten şematik görünüş. Kıyı boyu taşınan tortu farklı yerlere bağlanır: kıyı oku tek ucundan karaya bağlıdır, kordon koy ağzını kapatıp lagün ayırabilir, tombolo adayı karaya bağlar. Bir şekle tıkla. Gerçek kıyı koordinatı değildir.",
  alt: "Üstte kara, altta deniz. Solda karadan denize uzanan ince kıyı oku; ortada bir koyun ağzını kapatan kordon ve arkasında lagün; sağda ada ile karayı birleştiren kum boynu.",
  picks: SPITS.map((s) => ({ label: s.label, title: s.label, detail: [s.text] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const t = (i: number): Tone => (pick === i ? "a" : "c");
    const coast: V[] = [v(-6, 1), v(-3.6, 1), v(-2.4, 1), v(-1.4, 2.2), v(0.6, 2.4), v(1.6, 1), v(3.2, 1), v(6, 1)];
    els.push(poly([...coast, v(6, 3), v(-6, 3)], { tone: "muted", fill: "muted", thin: true }));
    els.push(txt(v(-5.6, 2.3), "kara", "e", { small: true, tone: "muted" }), txt(v(0.2, -2.3), "deniz", "c", { small: true, tone: "b" }));
    els.push(vec(v(-5.8, -1.0), v(-4.6, -1.0), { tone: "b" }), txt(v(-5.8, -1.4), "kıyı akıntısı", "e", { small: true, tone: "b" }));
    // Kıyı oku.
    els.push(poly([v(-5.0, 1), v(-4.3, 0.2), v(-3.3, -0.5), v(-3.2, -0.3), v(-4.1, 0.35), v(-4.6, 1)], { smooth: true, tone: t(0), fill: "c", bold: pick === 0 }));
    els.push(txt(v(-3.0, -0.45), "kıyı oku", "e", { small: true, bold: true, tone: t(0), pick: 0 }));
    // Kordon ve lagün.
    els.push(poly([v(-1.4, 2.2), v(-2.2, 1.05), v(1.6, 1.05), v(0.6, 2.4)], { smooth: true, tone: "b", fill: "b", thin: true }));
    els.push(poly([v(-2.4, 1.0), v(1.6, 1.0), v(1.6, 0.8), v(-2.4, 0.8)], { tone: t(1), fill: "c", bold: pick === 1 }));
    els.push(txt(v(-0.4, 1.6), "lagün", "c", { small: true, tone: "b" }), txt(v(1.8, 0.85), "kordon", "e", { small: true, bold: true, tone: t(1), pick: 1 }));
    // Tombolo.
    els.push(poly([v(4.0, -0.8), v(4.8, -0.6), v(5.0, -1.4), v(4.3, -1.8), v(3.7, -1.4)], { smooth: true, tone: "muted", fill: "muted", thin: true }));
    els.push(poly([v(4.15, 1), v(4.25, -0.7), v(4.55, -0.7), v(4.55, 1)], { tone: t(2), fill: "c", bold: pick === 2 }));
    els.push(txt(v(4.8, 0.2), "tombolo", "e", { small: true, bold: true, tone: t(2), pick: 2 }), txt(v(3.5, -1.3), "ada", "w", { small: true, tone: "muted" }));
    els.push(...pad(v(-6.3, 3.3), v(6.9, -2.2)));
    const sel = pick >= 0 ? `${SPITS[pick].label}: ${SPITS[pick].text}` : "Bir şekle tıkla ya da aşağıdan seç.";
    return { els, readout: [sel, "Tortu girişi artarken kıyı akıntısı daha fazlasını uzaklaştırıyorsa net birikim şart değildir."] };
  },
};

const orient: FigureDef = {
  caption:
    "Üstten şematik görünüş. Dağ sıraları kıyıya genel olarak paralelse boyuna kıyı, kıyıya dik uzanan sırt ve vadiler varsa enine kıyı örüntüsü düşünülür. Enine örüntü koy ve körfezlerle girintili kıyıyı destekleyebilir. Türkiye'de Karadeniz ve Akdeniz ana kuşakları boyuna, Ege'nin birçok kesimi enine örneğidir.",
  alt: "Adım 1: kıyı çizgisine paralel uzanan sırtlar ve düz kıyı. Adım 2: kıyıya dik uzanan sırtlar, aralarındaki vadilere sokulan koylar.",
  steps: ["Boyuna kıyı", "Enine kıyı"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) {
      els.push(poly([v(-5, 0), v(5, 0.1), v(5, 3), v(-5, 3)], { tone: "muted", fill: "muted", thin: true }));
      for (const y of [0.9, 1.8]) els.push(poly([v(-4.5, y), v(-1.5, y + 0.15), v(1.5, y - 0.1), v(4.5, y + 0.1)], { open: true, smooth: true, tone: "warn", bold: true }));
      els.push(txt(v(0, 2.45), "sırtlar kıyıya paralel", "c", { small: true, bold: true, tone: "warn" }));
    } else {
      const coast: V[] = [];
      for (let i = 0; i <= 8; i++) {
        const x = -5 + i * 1.25;
        coast.push(v(x, i % 2 ? 1.4 : 0));
      }
      els.push(poly([...coast, v(5, 3), v(-5, 3)], { smooth: true, tone: "muted", fill: "muted", thin: true }));
      for (const x of [-5, -2.5, 0, 2.5, 5]) if (Math.abs(x) < 5) els.push(seg(v(x, 0.2), v(x, 2.6), { tone: "warn", bold: true }));
      els.push(txt(v(-3.75, 0.7), "koy", "c", { small: true, tone: "b" }), txt(v(1.25, 0.7), "koy", "c", { small: true, tone: "b" }));
      els.push(txt(v(0, -0.5), "sırtlar kıyıya dik", "c", { small: true, bold: true, tone: "warn" }));
    }
    els.push(txt(v(-4.8, -1.0), "deniz", "e", { small: true, tone: "b" }));
    els.push(...pad(v(-5.3, 3.3), v(5.3, -1.4)));
    return { els, readout: [step === 0 ? "Boyuna kıyı: dağlar kıyıya paralel, kıyı görece az girintili; kıyı–iç kesim geçişi güçleşebilir." : "Enine kıyı: sırtlar kıyıya dik, vadiler koy ve körfez olarak sokulur; vadiler koridor sağlayabilir.", "Yön tek başına iklimi ya da bütün limanların yerini kanıtlamaz; kuzey okunu ve kıyı çizgisini birlikte kullan."] };
  },
};

const RIA = [
  { name: "Ria", note: "Göreli deniz yükselmesi akarsu vadisini su altında bırakır: kesit V biçimlidir; akarsu vadisi ağı kanıtı aranır." },
  { name: "Fiyort", note: "Buzulla oyulmuş derin U vadi denizle dolar; buzul aşınım kanıtı aranır. Norveç örnek bağlamdır." },
];
const ria: FigureDef = {
  caption:
    "İkisinde de vadiyi deniz basar; fark, deniz basmadan önce vadiyi oyan etkendedir. Ria akarsu vadisi (V), fiyort buzul vadisi (U) ile ilişkilidir. Yalnız girintili kıyı çizgisiyle ayrım yapılmaz. Enine şematik kesit; kesikli çizgi bugünkü deniz seviyesi.",
  alt: "Enine kesit: adım 1'de V biçimli vadinin alt kısmı suyla dolu (ria); adım 2'de U biçimli derin vadinin büyük bölümü suyla dolu (fiyort).",
  steps: RIA.map((r) => r.name),
  draw: (_v, step) => {
    const els: El[] = [];
    const sea = 1.6;
    let prof: V[];
    if (step === 0) prof = [v(-3.4, 3.2), v(-0.15, 0), v(0.15, 0), v(3.4, 3.2)];
    else {
      const u = Array.from({ length: 13 }, (_, i) => { const a = Math.PI + (i / 12) * Math.PI; return v(1.9 * Math.cos(a), 3.0 + 3.0 * Math.sin(a)); });
      prof = [v(-3.4, 3.2), v(-1.9, 3.0), ...u, v(1.9, 3.0), v(3.4, 3.2)];
    }
    const wet = prof.filter((p) => p[1] <= sea);
    const wl = step === 0 ? (sea / 3.2) * 3.25 : 1.9 * Math.sqrt(1 - ((3.0 - sea) / 3.0) ** 2);
    els.push(poly([v(-wl, sea), ...wet, v(wl, sea)], { tone: "b", fill: "b", bare: true }));
    els.push(poly([...prof, v(3.4, -0.6), v(-3.4, -0.6)], { smooth: step === 1, tone: "muted", fill: "muted", thin: true }));
    els.push(seg(v(-4.2, sea), v(4.2, sea), { tone: "b", dash: true }), txt(v(4.3, sea), "deniz seviyesi", "e", { small: true, tone: "b" }));
    els.push(txt(v(0, -1.3), step === 0 ? "ria: su basmış akarsu vadisi" : "fiyort: su basmış buzul vadisi", "c", { small: true, bold: true }));
    els.push(...pad(v(-4.4, 3.6), v(7.8, -1.8)));
    return { els, readout: [RIA[step].note, "Hamsilos'u yalnız girintili görüntüsü yüzünden fiyort sayma; deniz altında kalmış gerçek buzul vadisi gerekir."] };
  },
};

export const geographyFigures058Landforms: Record<string, Record<string, FigureDef>> = {
  "dis-kuvvetler-akarsular": {
    "Kaynak, yatak, ağız ve havza": basin,
    "Eğim, yük ve aşındırmanın yönü": profile,
    "Vadilerde şekil ile yapıyı birleştir": valleys,
    "Menderesin iki kıyısı iki işi yapar": meander,
    "Birikim şekli konuma bağlıdır": deposit,
    "Taraça ve direnç farkının geçmişi": terrace,
  },
  "karstik-sekiller": {
    "Lapya, dolin ve birleşen çukurlar": dolines,
    "Sarkıt tavandan, dikit tabandan": dripstone,
    "Şemadan koşullu sonuca": karstSection,
  },
  "ruzgar-ve-buzul": {
    "Kumulu lösle karıştırma": barchan,
    "Karın kalıcılığı ve buzun türleri": snowline,
    "Buzul aşındırır, çizik ve U kesit bırakır": uValley,
    "Moren ile sanderin taşıyıcısı farklı": moraine,
  },
  "dalga-akinti-kiyi-tipleri": {
    "Aşınan kıyıda falez ve platform": cliff,
    "Biriken tortunun bağlandığı yer": spits,
    "Dağların yönü: enine ve boyuna": orient,
    "Ria ve fiyort: su bastığı vadiyi tanı": ria,
  },
};
