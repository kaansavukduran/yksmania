import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "../sectionFigures/figureKit";
import type { FoundationLesson } from "./types";

/*
 * TYT Kimya ve Biyoloji · Temel İnşa ön dersleri. Tanecik çizimleri
 * şematiktir (ölçekli değil); suyun hâl değişim sıcaklıkları deniz seviyesi
 * (1 atm) içindir. Bütün örnek ve sorular özgündür.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });

// ─── Kimya 1 · Madde sınıfları ───────────────────────────────────────────────
type P = [number, number, Tone, number?];
const BOXES: { label: string; parts: P[][]; detail: string[] }[] = [
  { label: "Element (atomlar)", parts: [[[0.4, 0.4, "b"]], [[1.2, 0.9, "b"]], [[0.7, 1.4, "b"]], [[1.5, 0.3, "b"]]], detail: ["Tek tür atom: hepsi aynı renk.", "Örnek: demir (Fe), helyum (He)."] },
  { label: "Element (molekül)", parts: [[[0.4, 0.5, "b"], [0.65, 0.5, "b"]], [[1.1, 1.2, "b"], [1.35, 1.2, "b"]], [[1.2, 0.4, "b"], [1.45, 0.4, "b"]]], detail: ["Aynı tür atomlar ikişer bağlanmış: O₂, H₂, N₂.", "Molekül olması bileşik olduğu anlamına gelmez."] },
  { label: "Bileşik", parts: [[[0.4, 0.5, "warn"], [0.65, 0.5, "b"]], [[1.1, 1.2, "warn"], [1.35, 1.2, "b"]], [[1.2, 0.4, "warn"], [1.45, 0.4, "b"]]], detail: ["Farklı tür atomlar belirli oranda bağlanmış: H₂O, NaCl, CO₂.", "Her tanecik aynıdır: saf madde."] },
  { label: "Karışım", parts: [[[0.4, 0.5, "warn"], [0.65, 0.5, "b"]], [[1.2, 1.3, "c"]], [[1.3, 0.4, "c"], [1.55, 0.4, "c"]], [[0.6, 1.3, "warn"], [0.85, 1.3, "b"]]], detail: ["Farklı tanecikler bağlanmadan bir arada: tuzlu su, hava.", "Oranı değişebilir; fiziksel yollarla ayrılır."] },
];
const particles: FigureDef = {
  caption:
    "Her kutu bir maddenin tanecik resmidir; renk atom türünü gösterir. Bir kutuya tıkla: element mi, bileşik mi, karışım mı olduğu ve gerekçesi açılır. Karar sorusu: tanecikler aynı mı, aynıysa içinde kaç tür atom var?",
  alt: "Dört kare kutu: tek renk tek atomlar, tek renk ikili moleküller, iki renkli aynı moleküller, farklı taneciklerin karışımı.",
  picks: BOXES.map((b) => ({ label: b.label, title: b.label, detail: b.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    BOXES.forEach((b, i) => {
      const x0 = (i % 2) * 3.2, y0 = -Math.floor(i / 2) * 2.9, sel = pick === i;
      els.push(rect(x0, x0 + 2.0, y0, y0 + 1.8, sel ? "a" : "muted", false));
      for (const mol of b.parts) {
        if (mol.length === 2) els.push(seg(v(x0 + mol[0][0], y0 + mol[0][1]), v(x0 + mol[1][0], y0 + mol[1][1]), { thin: true, tone: "muted" }));
        for (const [x, y, t] of mol) els.push(ball(v(x0 + x, y0 + y), 0.13, t));
      }
      els.push(txt(v(x0 + 1.0, y0 - 0.35), b.label, "c", { small: true, bold: sel, tone: sel ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(-0.3, 2.1), " ", "c"), txt(v(5.6, -3.6), " ", "c"));
    return { els, readout: [pick >= 0 ? BOXES[pick].detail[0] : "Bir kutuya tıkla.", "Saf madde: bütün tanecikler aynı. Karışım: en az iki farklı tanecik."] };
  },
};

const TREE = ["Madde", "Saf madde mi, karışım mı?", "Saf madde: element ya da bileşik", "Karışım: homojen ya da heterojen"];
const tree: FigureDef = {
  caption:
    "Maddeyi iki soruyla sınıflandır. Adımları ilerlet: önce bütün tanecikler aynı mı (saf madde) diye sor; sonra saf maddede tek tür atom mu (element) birden çok tür mü (bileşik), karışımda her yeri aynı görünüyor mu (homojen) diye ayır.",
  alt: "Ağaç şeması: madde, altında saf madde ve karışım; saf maddenin altında element ve bileşik, karışımın altında homojen ve heterojen.",
  steps: TREE,
  draw: (_v, step) => {
    const node = (x: number, y: number, t: string, on: boolean, ex?: string): El[] => [
      rect(x - 0.85, x + 0.85, y - 0.3, y + 0.3, on ? "b" : "muted", on),
      txt(v(x, y), t, "c", { small: true, bold: true, tone: on ? "ink" : "muted" }),
      ...(ex ? [txt(v(x, y - 0.6), ex, "c", { small: true, tone: on ? "c" : "muted" })] : []),
    ];
    const els: El[] = [...node(2.8, 2.4, "Madde", true)];
    if (step >= 1) els.push(seg(v(2.8, 2.1), v(0.8, 1.5), { thin: true }), seg(v(2.8, 2.1), v(4.8, 1.5), { thin: true }), ...node(0.8, 1.2, "Saf madde", true), ...node(4.8, 1.2, "Karışım", true));
    if (step >= 2) els.push(seg(v(0.8, 0.9), v(-0.25, 0.0), { thin: true }), seg(v(0.8, 0.9), v(1.85, 0.0), { thin: true }), ...node(-0.25, -0.3, "Element", step === 2, "Fe, O₂"), ...node(1.85, -0.3, "Bileşik", step === 2, "H₂O"));
    if (step >= 3) els.push(seg(v(4.8, 0.9), v(3.75, 0.0), { thin: true }), seg(v(4.8, 0.9), v(5.85, 0.0), { thin: true }), ...node(3.75, -0.3, "Homojen", true, "tuzlu su"), ...node(5.85, -0.3, "Heterojen", true, "kum–su"));
    els.push(txt(v(-1.3, 2.9), " ", "c"), txt(v(6.9, -1.2), " ", "c"));
    return { els, readout: [step === 0 ? "Her şey maddedir: kütlesi ve hacmi olan." : step === 1 ? "Tanecikler aynı → saf madde; farklı → karışım." : step === 2 ? "Tek tür atom → element; birden çok tür, belirli oran → bileşik." : "Her yeri aynı → homojen (çözelti); bölgeler ayırt ediliyor → heterojen.", "Hava homojen bir karışımdır; su bir bileşiktir."] };
  },
};

// ─── Kimya 2 · Hâl değişimi ──────────────────────────────────────────────────
const heating: FigureDef = {
  caption:
    "Buzu sabit hızla ısıttığını düşün. Zamanı ilerlet: sıcaklık önce yükselir, 0 °C’de erime boyunca sabit kalır, sonra yine yükselir, 100 °C’de kaynama boyunca sabit kalır. Düz kısımlarda verilen ısı sıcaklığı değil, hâli değiştirir.",
  alt: "Sıcaklık–zaman grafiği: −20 °C’den 0 °C’ye çıkış, 0 °C’de yatay erime, 100 °C’ye çıkış, 100 °C’de yatay kaynama, sonra buhar ısınması.",
  param: { label: "Zaman", min: 0, max: 10, step: 1, init: 3, unit: " dk" },
  draw: (t) => {
    const T = (s: number) => (s <= 1 ? -20 + 20 * s : s <= 3 ? 0 : s <= 5 ? (s - 3) * 50 : s <= 9 ? 100 : 100 + (s - 9) * 20);
    const phase = (s: number) => (s < 1 ? "katı (buz) ısınıyor" : s <= 3 ? "erime: katı + sıvı, 0 °C sabit" : s < 5 ? "sıvı (su) ısınıyor" : s <= 9 ? "kaynama: sıvı + gaz, 100 °C sabit" : "gaz (buhar) ısınıyor");
    const sx = 0.55, sy = 0.022, y0 = 20 * sy;
    const pts = Array.from({ length: 21 }, (_, i) => i / 2).map((s) => v(s * sx, T(s) * sy + y0));
    const els: El[] = [vec(v(0, 0), v(10.6 * sx, 0), { thin: true }), vec(v(0, 0), v(0, 125 * sy + y0), { thin: true }), txt(v(10.6 * sx, -0.35), "zaman", "c", { small: true }), txt(v(-0.15, 125 * sy + y0), "°C", "w", { small: true })];
    els.push(txt(v(-0.15, y0), "0", "w", { small: true }), txt(v(-0.15, 100 * sy + y0), "100", "w", { small: true }));
    els.push(seg(v(0, y0), v(10 * sx, y0), { dash: true, thin: true, tone: "muted" }), seg(v(0, 100 * sy + y0), v(10 * sx, 100 * sy + y0), { dash: true, thin: true, tone: "muted" }));
    els.push(poly(pts, { open: true, tone: "b", bold: true }), ball(v(t * sx, T(t) * sy + y0), 0.12, "a"));
    els.push(txt(v(0.2, 3.6), phase(t), "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.9, 4.0), " ", "c"), txt(v(6.4, -0.6), " ", "c"));
    return { els, readout: [`${t}. dakika: ${T(t)} °C, ${phase(t)}.`, "Erime ve kaynama sırasında sıcaklık sabit kalır (saf madde, sabit basınç)."] };
  },
};

const STATES = [
  { label: "Katı", n: 9, detail: ["Tanecikler çok yakın ve düzenli; yerinde titreşir.", "Belirli şekil ve belirli hacim."] },
  { label: "Sıvı", n: 9, detail: ["Tanecikler yakın ama düzensiz; birbirinin üzerinden kayar.", "Belirli hacim, kabın şeklini alır."] },
  { label: "Gaz", n: 6, detail: ["Tanecikler birbirinden çok uzak ve hızlı; her yöne dağılır.", "Ne şekli ne hacmi belirli: kabı doldurur."] },
];
const SOLID: [number, number][] = [[0.3, 0.3], [0.7, 0.3], [1.1, 0.3], [0.3, 0.7], [0.7, 0.7], [1.1, 0.7], [0.3, 1.1], [0.7, 1.1], [1.1, 1.1]];
const LIQUID: [number, number][] = [[0.3, 0.25], [0.7, 0.3], [1.15, 0.25], [0.45, 0.62], [0.95, 0.6], [0.25, 0.95], [0.7, 0.98], [1.15, 0.9], [0.5, 0.3]];
const GAS: [number, number][] = [[0.25, 1.2], [1.1, 1.0], [0.6, 0.6], [0.2, 0.3], [1.15, 0.25], [0.8, 1.3]];
const states: FigureDef = {
  caption:
    "Aynı maddenin üç hâli: tanecikler aynıdır, aralarındaki uzaklık ve hareket değişir. Bir hâle tıkla: tanecik düzeni ve şekil–hacim özelliği açılır. Hâl değişiminde tanecik değişmez, bu yüzden hâl değişimi fiziksel değişimdir.",
  alt: "Üç kutu: düzenli sıkı tanecikler, düzensiz yakın tanecikler, seyrek dağılmış tanecikler.",
  picks: STATES.map((s) => ({ label: s.label, title: `${s.label} hâl`, detail: s.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    [SOLID, LIQUID, GAS].forEach((pts, i) => {
      const x0 = i * 2.0, sel = pick === i;
      els.push(rect(x0, x0 + 1.5, 0, 1.6, sel ? "a" : "muted", false));
      for (const [x, y] of pts) els.push(ball(v(x0 + x * 1.05, y + 0.05), 0.15, "b"));
      els.push(txt(v(x0 + 0.75, -0.35), STATES[i].label, "c", { small: true, bold: sel, tone: sel ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(-0.3, 1.9), " ", "c"), txt(v(5.8, -0.7), " ", "c"));
    return { els, readout: [pick >= 0 ? STATES[pick].detail[0] : "Bir hâle tıkla.", "Katı → sıvı: erime; sıvı → gaz: buharlaşma/kaynama; gaz → sıvı: yoğuşma; sıvı → katı: donma."] };
  },
};

// ─── Kimya 3 · Semboller ve yüzde ────────────────────────────────────────────
const SYMS = [
  { s: "Na", n: "sodyum", why: "Latince natrium" }, { s: "K", n: "potasyum", why: "Latince kalium" }, { s: "Fe", n: "demir", why: "Latince ferrum" },
  { s: "Cu", n: "bakır", why: "Latince cuprum" }, { s: "Ag", n: "gümüş", why: "Latince argentum" }, { s: "Au", n: "altın", why: "Latince aurum" },
  { s: "Hg", n: "cıva", why: "Latince hydrargyrum" }, { s: "Pb", n: "kurşun", why: "Latince plumbum" }, { s: "Sn", n: "kalay", why: "Latince stannum" },
];
const symbols: FigureDef = {
  caption:
    "Element sembolü bir ya da iki harftir; ilk harf büyük, ikinci harf küçük yazılır (Co kobalt, CO karbon monoksit). Bazı semboller Latince adlardan gelir. Bir sembole tıkla: Türkçe adı ve kökeni açılır.",
  alt: "Üç sütun üç satır sembol kartı: Na, K, Fe, Cu, Ag, Au, Hg, Pb, Sn.",
  picks: SYMS.map((x) => ({ label: x.s, title: `${x.s}: ${x.n}`, detail: [`${x.s} = ${x.n} (${x.why}).`, "Adın baş harfiyle sembol aynı değil: ezberde kartla çalış."] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    SYMS.forEach((x, i) => {
      const cx = (i % 3) * 1.5, cy = -Math.floor(i / 3) * 1.5, sel = pick === i;
      els.push(rect(cx - 0.6, cx + 0.6, cy - 0.6, cy + 0.6, sel ? "a" : "b"));
      els.push(txt(v(cx, cy + 0.12), x.s, "c", { bold: true, pick: i }), txt(v(cx, cy - 0.35), sel ? x.n : " ", "c", { small: true }));
    });
    els.push(txt(v(-0.8, 0.8), " ", "c"), txt(v(3.8, -3.8), " ", "c"));
    return { els, readout: [pick >= 0 ? `${SYMS[pick].s} = ${SYMS[pick].n}.` : "Bir sembole tıkla.", "Kolay olanlar: H hidrojen, C karbon, N azot, O oksijen, S kükürt, Cl klor, Ca kalsiyum."] };
  },
};

const percent: FigureDef = {
  caption:
    "Kütlece yüzde, bütünün yüzde kaçının o parça olduğunu söyler: % = parça ÷ bütün × 100. 200 g tuzlu suda tuz miktarını değiştir. Dikkat: bütün çözeltidir (su + tuz), yalnız su değildir.",
  alt: "Yatay çubuk: 200 g çözelti; tuz kısmı renkli, su kısmı gri; yüzde değeri yazıyor.",
  param: { label: "Tuz kütlesi", min: 10, max: 60, step: 10, init: 30, unit: " g" },
  draw: (m) => {
    const W = 6, k = W / 200;
    const els: El[] = [rect(0, m * k, -0.3, 0.3, "a"), rect(m * k, W, -0.3, 0.3, "muted"), txt(v((m * k) / 2, 0.65), `tuz ${m} g`, "c", { small: true, bold: true, tone: "a" }), txt(v((m * k + W) / 2, 0.65), `su ${200 - m} g`, "c", { small: true, tone: "muted" })];
    els.push(txt(v(0, -0.9), `% tuz = ${m} ÷ 200 × 100 = %${(m / 2).toString().replace(".", ",")}`, "e", { small: true, bold: true }));
    els.push(txt(v(-0.3, 1.1), " ", "c"), txt(v(6.4, -1.3), " ", "c"));
    return { els, readout: [`${m} g tuz / 200 g çözelti = %${(m / 2).toString().replace(".", ",")}.`, `Yalnız suya bölmek hata olur: ${m} ÷ ${200 - m} × 100 ≈ %${((m / (200 - m)) * 100).toFixed(1).replace(".", ",")}.`] };
  },
};

// ─── Biyoloji 1 · Canlı ve cansız ────────────────────────────────────────────
const TRAITS = [
  { label: "Hücreden oluşur", ce: "karşı örnek: kristal büyür, hücresi yok", detail: ["Her canlı en az bir hücreden oluşur.", "Kristal büyür ama hücresi yoktur."] },
  { label: "Metabolizma (enerji kullanır)", ce: "karşı örnek: araba yakıt yakar", detail: ["Besinden enerji elde eder, madde yapar ve yıkar.", "Araba yakıt yakar ama kendi yapısını onarıp çoğalmaz."] },
  { label: "Çoğalır", ce: "kısır katır yine de canlıdır", detail: ["Kendine benzer yeni bireyler oluşturur.", "Tek bir bireyin çoğalmaması onu cansız yapmaz (ör. kısır katır)."] },
  { label: "Uyarana tepki verir", ce: "karşı örnek: termometre", detail: ["Işık, sıcaklık gibi değişikliklere yanıt verir.", "Termometre de tepki verir: tek özellik yetmez."] },
  { label: "Büyür ve gelişir", ce: "karşı örnek: sarkıt büyür", detail: ["Hücre sayısı ya da boyu artar, yapısı değişir.", "Sarkıt da büyür: tek özellikle karar verme."] },
];
const traits: FigureDef = {
  caption:
    "Bir varlığın canlı sayılması için ortak özelliklerin birlikte bulunması gerekir; tek özellik yanıltır. Bir özelliğe tıkla: tanımı ve aynı özelliği gösteren bir cansız örnek açılır.",
  alt: "Beş satırlık özellik listesi: hücre, metabolizma, çoğalma, uyarana tepki, büyüme.",
  picks: TRAITS.map((t) => ({ label: t.label, title: t.label, detail: t.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    TRAITS.forEach((t, i) => {
      const y = -i * 1.3, sel = pick === i;
      els.push(rect(-0.32, -0.16, y - 0.85, y + 0.25, "c"));
      els.push(txt(v(0, y), t.label, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }), txt(v(0.3, y - 0.58), t.ce, "e", { small: true, tone: sel ? "a" : "muted" }));
    });
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(5.4, -6.2), " ", "c"));
    return { els, readout: [pick >= 0 ? TRAITS[pick].detail[0] : "Bir özelliğe tıkla.", "Karar: özellikler birlikte mi var? Tek benzerlik kanıt değildir."] };
  },
};

const LEVELS = [
  { label: "Hücre", ex: "kas hücresi", detail: ["Canlılığın en küçük birimi.", "Kendi başına yaşayabilen en küçük yapı."] },
  { label: "Doku", ex: "kas dokusu", detail: ["Aynı görevi yapan benzer hücreler topluluğu."] },
  { label: "Organ", ex: "kalp", detail: ["Farklı dokuların birlikte bir görev yaptığı yapı.", "Kalpte kas, sinir ve bağ dokusu birliktedir."] },
  { label: "Sistem", ex: "dolaşım sistemi", detail: ["Ortak bir işi paylaşan organlar: kalp, damarlar."] },
  { label: "Organizma", ex: "insan", detail: ["Sistemlerin birlikte çalıştığı bütün birey."] },
];
const levels: FigureDef = {
  caption:
    "Çok hücreli canlılarda yapı basamak basamak büyür: hücre → doku → organ → sistem → organizma. Bir basamağa tıkla: tanımı ve kalp–dolaşım örneğindeki karşılığı açılır.",
  alt: "Soldan sağa büyüyen beş daire: hücre, doku, organ, sistem, organizma; aralarında oklar.",
  picks: LEVELS.map((l) => ({ label: l.label, title: `${l.label}: ${l.ex}`, detail: l.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    let x = 0;
    LEVELS.forEach((l, i) => {
      const r = 0.25 + i * 0.13, sel = pick === i;
      x += r;
      els.push(circle(v(x, 0), r, { fill: sel ? "a" : "b", tone: sel ? "a" : "b", thin: true }));
      els.push(txt(v(x, -1.15), l.label, "c", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
      if (i < LEVELS.length - 1) els.push(vec(v(x + r + 0.08, 0), v(x + r + 0.42, 0), { thin: true, tone: "muted" }));
      x += r + 0.5;
    });
    els.push(txt(v(-0.4, 1.0), " ", "c"), txt(v(x + 0.2, -1.5), " ", "c"));
    return { els, readout: [pick >= 0 ? LEVELS[pick].detail[0] : "Bir basamağa tıkla.", "Tek hücreli canlıda (bakteri) hücre aynı zamanda organizmadır."] };
  },
};

const SCALE = [
  { label: "Virüs ~100 nm", e: -7, detail: ["Işık mikroskobunda görülmez; elektron mikroskobu gerekir.", "1 nm = 10⁻⁹ m."] },
  { label: "Bakteri ~2 µm", e: -6, detail: ["Işık mikroskobuyla görülür.", "1 µm = 10⁻⁶ m."] },
  { label: "Hayvan hücresi ~20 µm", e: -5, detail: ["Bakteriden yaklaşık 10 kat büyük."] },
  { label: "Kum tanesi ~1 mm", e: -3, detail: ["Çıplak gözle görülür (sınır ~0,1 mm)."] },
  { label: "İnsan ~1,7 m", e: 0, detail: ["Bir hayvan hücresinden yaklaşık 100 000 kat büyük."] },
];
const scale: FigureDef = {
  caption:
    "Mikro ve makro ölçek: her çentik bir öncekinin 10 katıdır, bu yüzden doğru eşit aralıklı ama değerler 10’ar kat büyür. Bir canlıya tıkla: yaklaşık boyu ve hangi araçla görüldüğü açılır. Değerler yaklaşık ölçek fikri içindir.",
  alt: "10⁻⁹ m’den 1 m’ye logaritmik doğru; virüs, bakteri, hayvan hücresi, kum tanesi ve insan yaklaşık yerlerinde.",
  picks: SCALE.map((s) => ({ label: s.label, title: s.label, detail: s.detail })),
  draw: (_v, _s, pick = -1) => {
    const X = (e: number) => (e + 9) * 0.75;
    const els: El[] = [vec(v(X(-9) - 0.1, 0), v(X(1), 0), { thin: true })];
    for (let e = -9; e <= 0; e++) els.push(seg(v(X(e), -0.1), v(X(e), 0.1), { thin: true }), ...(e % 3 === 0 ? [txt(v(X(e), -0.4), `10${e === 0 ? "⁰" : "⁻" + "⁰¹²³⁴⁵⁶⁷⁸⁹"[-e]} m`, "c", { small: true, tone: "muted" })] : []));
    SCALE.forEach((s, i) => {
      const sel = pick === i, y = 0.5 + (i % 2) * 0.55;
      els.push(seg(v(X(s.e), 0.1), v(X(s.e), y - 0.15), { thin: true, tone: sel ? "a" : "b" }), ball(v(X(s.e), 0), 0.09, sel ? "a" : "b"));
      els.push(txt(v(X(s.e), y), s.label.split(" ")[0], "c", { small: true, bold: sel, tone: sel ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(-0.5, 1.5), " ", "c"), txt(v(X(1) + 0.4, -0.7), " ", "c"));
    return { els, readout: [pick >= 0 ? `${SCALE[pick].label}: ${SCALE[pick].detail[0]}` : "Bir canlıya tıkla.", "Ölçek doğrusunda bir adım = 10 kat. Doğrusal ölçekte virüs ile insan aynı şekle sığmazdı."] };
  },
};


const CMP = ["İki boy", "Aynı birime çevir", "Böl: kaç kat?"];
const compare: FigureDef = {
  caption:
    "Hayvan hücresi 20 µm, virüs 100 nm. Adımları ilerlet: önce ikisini de nanometreye çevir, sonra büyük olanı küçüğe böl. Doğrusal çizimde virüs neredeyse bir nokta kalır: 200 kat fark budur.",
  alt: "İki yatay çubuk aynı ölçekte: 20 000 nm uzunluğunda hücre çubuğu ve 100 nm’lik çok kısa virüs çubuğu.",
  steps: CMP,
  draw: (_v, step) => {
    const k = 6 / 20000;
    const els: El[] = [txt(v(-0.2, 0.5), "hücre", "w", { small: true, bold: true }), txt(v(-0.2, -0.5), "virüs", "w", { small: true, bold: true })];
    els.push(rect(0, 20000 * k, 0.3, 0.7, "b"), rect(0, Math.max(100 * k, 0.04), -0.7, -0.3, "a"));
    els.push(txt(v(20000 * k + 0.15, 0.5), step === 0 ? "20 µm" : "20 000 nm", "e", { small: true }), txt(v(0.35, -0.5), "100 nm", "e", { small: true }));
    if (step === 2) els.push(txt(v(0, -1.3), "20 000 ÷ 100 = 200 kat", "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-1.4, 1.1), " ", "c"), txt(v(7.8, -1.6), " ", "c"));
    return { els, readout: [step === 0 ? "Birimler farklı: µm ve nm." : step === 1 ? "1 µm = 1000 nm → 20 µm = 20 000 nm." : "Hücre virüsten 200 kat büyük.", "Farklı birimleri doğrudan bölme: 20 ÷ 100 = 0,2 yanlış olur."] };
  },
};

export const scienceFoundations: FoundationLesson[] = [
  {
    id: "temel-kim-madde-siniflari",
    subjectId: "tyt-kimya",
    title: "Madde, element, bileşik ve karışım",
    minutes: 20,
    prepares: ["karisim-sinif-cozunme", "sembolik-dil", "fiziksel-kimyasal-degisimler"],
    goal: "Bir maddeyi tanecik resminden saf madde ya da karışım, element ya da bileşik olarak sınıflandırmak.",
    pages: [
      {
        title: "Tanecik resmini oku",
        paragraphs: [
          "Her madde çok küçük taneciklerden (atom ya da molekül) oluşur. Atom, bir elementin en küçük parçasıdır; molekül, birbirine bağlı atom grubudur.",
          "Bütün tanecikleri aynı olan madde saf maddedir. Saf maddede tek tür atom varsa element, birden çok tür atom belirli oranda bağlıysa bileşiktir. Farklı tanecikler bağlanmadan bir aradaysa karışımdır.",
        ],
        terms: [["Atom", "Elementin özelliğini taşıyan en küçük tanecik."], ["Molekül", "Bağlı atom grubu: O₂, H₂O."]],
        figure: particles,
        predict: { question: "O₂ bir bileşik midir?", answer: "Hayır: iki atom da oksijen, yani element molekülüdür." },
      },
      {
        title: "İki soruluk sınıflandırma",
        paragraphs: ["Karışımın her yeri aynı görünüyorsa homojen (çözelti, örneğin şekerli su), bölgeler ayırt ediliyorsa heterojendir (kum–su). Karışımlar süzme, buharlaştırma gibi fiziksel yollarla ayrılır; bileşik ise ancak kimyasal tepkimeyle bileşenlerine ayrılır."],
        figure: tree,
      },
    ],
    examples: [
      { title: "Sınıflandır", given: "Saf su, tuzlu su, demir, hava", steps: ["Saf su: tek tür tanecik (H₂O), iki tür atom → bileşik.", "Tuzlu su: su ve tuz tanecikleri → homojen karışım.", "Demir: tek tür atom → element.", "Hava: N₂, O₂, Ar… → homojen karışım."], answer: "Bileşik · homojen karışım · element · homojen karışım", check: "Saf maddelerde tek tanecik türü var mı? Su ve demirde evet ✓." },
      { title: "Formülden oku", given: "CO₂ bir element mi bileşik mi?", steps: ["İki farklı sembol var: C ve O.", "İki tür atom belirli oranda bağlı (1 C, 2 O)."], answer: "Bileşik", check: "Tek sembollü (O₂, Fe) olsaydı element olurdu ✓." },
    ],
    checks: [
      { prompt: "Aşağıdakilerden hangisi bir bileşiktir?", options: ["O₂", "Fe", "H₂O", "Hava", "Tuzlu su"], answer: 2, explain: "İki tür atom (H, O) belirli oranda bağlı.", reasons: ["Tek tür atom: element molekülü.", "Tek tür atom: element.", "Doğru.", "Gazların karışımı.", "Su ve tuzun karışımı."] },
      { prompt: "Her yeri aynı görünen şekerli su için hangisi doğrudur?", options: ["Element", "Bileşik", "Heterojen karışım", "Homojen karışım", "Saf madde"], answer: 3, explain: "İki farklı tanecik (su, şeker), her yeri aynı: homojen karışım.", reasons: ["Birden çok tür atom var.", "Su ve şeker bağlanmamış, oran değişebilir.", "Bölgeler ayırt edilmiyor.", "Doğru.", "İki farklı tanecik var."] },
      { prompt: "Tanecik resminde aynı renkte ikişer atomdan oluşan özdeş moleküller var. Madde nedir?", options: ["Bileşik", "Element", "Karışım", "Çözelti", "Heterojen karışım"], answer: 1, explain: "Tek tür atom: element (ör. N₂).", reasons: ["Bileşikte en az iki tür atom olur.", "Doğru.", "Bütün tanecikler aynı: saf.", "Çözelti bir karışımdır.", "Tanecikler aynı."] },
    ],
  },
  {
    id: "temel-kim-hal-degisimi",
    subjectId: "tyt-kimya",
    title: "Maddenin hâlleri ve hâl değişimi",
    minutes: 20,
    prepares: ["maddenin-halleri", "gazlar-hal-degisim-plazma", "fiziksel-kimyasal-degisimler"],
    goal: "Katı, sıvı ve gazı tanecik düzeniyle ayırmak; ısınma eğrisinde sıcaklığın sabit kaldığı hâl değişimi bölgelerini okumak.",
    pages: [
      {
        title: "Üç hâl, aynı tanecik",
        paragraphs: ["Su, buz ve buhar aynı H₂O taneciklerinden oluşur. Değişen, taneciklerin birbirine uzaklığı ve hareketidir. Bu yüzden hâl değişimi fiziksel değişimdir: yeni madde oluşmaz."],
        figure: states,
      },
      {
        title: "Isınma eğrisi",
        paragraphs: [
          "Saf bir katıyı ısıtınca sıcaklık erime noktasına kadar yükselir; erime bitene kadar sabit kalır. Aynı şey kaynamada da olur.",
          "Düz bölgelerde verilen ısı tanecikler arası çekimi yenmeye harcanır. Deniz seviyesinde su 0 °C’de erir, 100 °C’de kaynar.",
        ],
        terms: [["Erime noktası", "Katının sıvıya dönüştüğü sabit sıcaklık."], ["Kaynama noktası", "Sıvının her yerinden gaz çıktığı sabit sıcaklık (basınca bağlı)."]],
        figure: heating,
        predict: { question: "Kaynayan suya ısı vermeye devam edersen sıcaklığı yükselir mi?", answer: "Hayır: su bitene kadar 100 °C’de kalır (1 atm)." },
      },
    ],
    examples: [
      { title: "Eğriden hâl", given: "Isınma eğrisinde sıcaklık 0 °C’de 2 dakika sabit kalıyor.", steps: ["Sabit sıcaklık → hâl değişimi.", "0 °C su için erime noktası.", "Bu sürede buz ve su birlikte bulunur."], answer: "Erime (katı + sıvı)", check: "Sabit bölge ısının hâl değiştirmeye harcandığını gösterir ✓." },
      { title: "Hâl değişimi adları", given: "Soğuk bardağın dışında su damlaları oluşuyor.", steps: ["Havadaki su buharı (gaz) soğuk yüzeye çarpıyor.", "Gaz → sıvı."], answer: "Yoğuşma", check: "Su bardaktan sızmadı; damlalar havadaki buhardan geldi ✓." },
    ],
    checks: [
      { prompt: "Saf bir maddenin ısınma eğrisinde sıcaklığın sabit kaldığı bölge neyi gösterir?", options: ["Isı verilmediğini", "Hâl değişimini", "Maddenin bittiğini", "Kimyasal tepkimeyi", "Kütlenin azaldığını"], answer: 1, explain: "Verilen ısı hâl değiştirmeye harcanır.", reasons: ["Isı verilmeye devam ediyor.", "Doğru.", "Madde hâl değiştiriyor, bitmiyor.", "Tanecikler değişmiyor: fiziksel.", "Kapalı kapta kütle korunur."] },
      { prompt: "Taneciklerin birbirinden çok uzak olduğu ve kabı tamamen doldurduğu hâl hangisidir?", options: ["Katı", "Sıvı", "Gaz", "Kristal katı", "Amorf katı"], answer: 2, explain: "Gazın belirli şekli ve hacmi yoktur.", reasons: ["Katıda tanecikler sıkı ve düzenlidir.", "Sıvının hacmi belirlidir.", "Doğru.", "Katı türüdür.", "Katı türüdür."] },
      { prompt: "Sıvının gaza dönüşmesine ne ad verilir?", options: ["Donma", "Erime", "Yoğuşma", "Buharlaşma", "Süblimleşme"], answer: 3, explain: "Sıvı → gaz: buharlaşma (her sıcaklıkta yüzeyden) ya da kaynama.", reasons: ["Sıvı → katı.", "Katı → sıvı.", "Gaz → sıvı.", "Doğru.", "Katı → gaz."] },
    ],
  },
  {
    id: "temel-kim-sembol-yuzde",
    subjectId: "tyt-kimya",
    title: "Yaygın element sembolleri ve yüzde–oran",
    minutes: 15,
    prepares: ["sembolik-dil", "cozelti-derisimi", "kutle-korunumu-sabit-oran"],
    goal: "Sık kullanılan element sembollerini doğru okumak ve kütlece yüzdeyi doğru bütüne bölerek hesaplamak.",
    pages: [
      {
        title: "Sembolü doğru oku",
        paragraphs: ["Sembolün ilk harfi büyük, ikinci harfi küçüktür. Bu kural önemlidir: Co kobalt elementidir; CO ise karbon ve oksijenden oluşan bir bileşiktir. Na, K, Fe gibi semboller Latince adlardan geldiği için Türkçe adla eşleşmez."],
        figure: symbols,
      },
      {
        title: "Yüzde: parça ÷ bütün",
        paragraphs: ["Kütlece yüzde = parçanın kütlesi ÷ bütünün kütlesi × 100. Çözeltide bütün, çözünen ile çözücünün toplamıdır. Oran da aynı mantıkla yazılır: 30 g tuz ve 170 g su için tuz : su = 30 : 170 = 3 : 17."],
        terms: [["Çözünen", "Çözeltide az olan ve dağılan madde (tuz)."], ["Çözücü", "İçinde dağıtan madde (su)."]],
        figure: percent,
        predict: { question: "20 g tuz 80 g suya katılırsa kütlece % kaç tuz olur?", answer: "%20: 20 ÷ (20 + 80) × 100." },
      },
    ],
    examples: [
      { title: "Yüzde", given: "150 g çözeltide 30 g şeker var.", steps: ["Bütün = 150 g.", "30 ÷ 150 = 0,2.", "0,2 × 100 = %20."], answer: "%20", check: "Şeker 30, su 120: 30 + 120 = 150 ✓." },
      { title: "Yüzdeden kütle", given: "%15’lik 400 g tuzlu suda kaç g tuz var?", steps: ["Tuz = 400 × 15 / 100.", "= 60 g."], answer: "60 g tuz (340 g su)", check: "60 ÷ 400 = 0,15 ✓." },
    ],
    checks: [
      { prompt: "Fe sembolü hangi elementindir?", options: ["Flor", "Fosfor", "Demir", "Fermiyum", "Kurşun"], answer: 2, explain: "Fe, Latince ferrum: demir.", reasons: ["Flor F’dir.", "Fosfor P’dir.", "Doğru.", "Fermiyum Fm’dir.", "Kurşun Pb’dir."] },
      { prompt: "30 g tuz 170 g suda çözülüyor. Çözelti kütlece % kaç tuzdur?", options: ["%30", "%17,6", "%15", "%85", "%3"], answer: 2, explain: "30 ÷ 200 × 100 = %15.", reasons: ["Tuz kütlesi doğrudan yüzde sanılmış.", "Yalnız suya bölünmüş.", "Doğru.", "Su yüzdesi hesaplanmış.", "100 ile çarpma unutulmuş ve basamak kaymış."] },
      { prompt: "“CO” ile “Co” için hangisi doğrudur?", options: ["İkisi de aynı elementtir.", "CO bir bileşik, Co bir elementtir.", "İkisi de bileşiktir.", "CO bir element, Co bir bileşiktir.", "İkisi de karışımdır."], answer: 1, explain: "Büyük O ayrı bir element (oksijen): CO karbon monoksit; Co kobalt.", reasons: ["Harf büyüklüğü farklı anlamdır.", "Doğru.", "Co tek elementtir.", "Tersi.", "İkisi de saf maddedir."] },
    ],
  },
  {
    id: "temel-biy-canli-hiyerarsi",
    subjectId: "tyt-biyoloji",
    title: "Canlı–cansız ayrımı ve yapı basamakları",
    minutes: 20,
    prepares: ["canli-ozellikleri", "hucre-organelleri", "canlilarin-siniflandirilmasi"],
    goal: "Canlılığı tek belirtiyle değil ortak özelliklerin birlikteliğiyle tanımak; hücre–doku–organ–sistem–organizma basamaklarını sıralamak.",
    pages: [
      {
        title: "Canlıyı ne tanımlar?",
        paragraphs: [
          "Canlılar hücreden oluşur, enerji kullanır (metabolizma), büyür, uyarana tepki verir ve çoğalır. Bu özelliklerin her biri tek başına bir cansızda da benzer biçimde görülebilir; karar, birlikte bulunmalarına göre verilir.",
        ],
        terms: [["Metabolizma", "Canlının madde yapma ve yıkma tepkimelerinin tümü."], ["Uyaran", "Canlıda tepki doğuran değişiklik (ışık, ses, sıcaklık)."]],
        figure: traits,
        predict: { question: "Büyüyen bir tuz kristali canlı mıdır?", answer: "Hayır: büyür ama hücresi, metabolizması yoktur." },
      },
      {
        title: "Hücreden organizmaya",
        paragraphs: ["Benzer hücreler doku, farklı dokular birlikte organ, ortak iş yapan organlar sistem, sistemler birlikte organizma oluşturur. Tek hücreli bir canlıda tek hücre aynı zamanda organizmanın kendisidir."],
        figure: levels,
      },
    ],
    examples: [
      { title: "Sıralama", given: "Mide, epitel dokusu, sindirim sistemi, epitel hücresi, insan", steps: ["En küçük: epitel hücresi.", "Benzer hücreler: epitel dokusu.", "Farklı dokular bir arada: mide.", "Organlar birlikte: sindirim sistemi.", "Bütün: insan."], answer: "Hücre → doku → organ → sistem → organizma", check: "Her basamak bir öncekini içerir ✓." },
      { title: "Tek belirti tuzağı", given: "Hareket eden bir robot canlı mıdır?", steps: ["Hareket ve tepki var.", "Hücre, metabolizma ve çoğalma yok."], answer: "Hayır", check: "Özelliklerin birlikteliği aranır ✓." },
    ],
    checks: [
      { prompt: "Aynı görevi yapan benzer hücrelerin oluşturduğu topluluğa ne denir?", options: ["Organ", "Doku", "Sistem", "Organizma", "Organel"], answer: 1, explain: "Benzer hücreler → doku.", reasons: ["Organ farklı dokulardan oluşur.", "Doğru.", "Sistem organlardan oluşur.", "Organizma bütün bireydir.", "Organel hücrenin içindeki yapıdır."] },
      { prompt: "Bir varlığın canlı olduğuna en güçlü biçimde hangisi kanıt olur?", options: ["Hareket etmesi", "Büyümesi", "Isıya tepki vermesi", "Hücreden oluşup metabolizma ve çoğalma göstermesi", "Ses çıkarması"], answer: 3, explain: "Ortak özelliklerin birlikte bulunması.", reasons: ["Robot da hareket eder.", "Kristal de büyür.", "Termometre de tepki verir.", "Doğru.", "Hoparlör de ses çıkarır."] },
      { prompt: "Hangisi organdır?", options: ["Kan hücresi", "Kas dokusu", "Kalp", "Dolaşım sistemi", "Mitokondri"], answer: 2, explain: "Kalp farklı dokulardan oluşur ve bir görevi yerine getirir.", reasons: ["Bu bir hücre.", "Bu bir doku.", "Doğru.", "Bu bir sistem.", "Bu bir organel."] },
    ],
  },
  {
    id: "temel-biy-olcek",
    subjectId: "tyt-biyoloji",
    title: "Mikro ve makro ölçek duygusu",
    minutes: 15,
    prepares: ["hucre-organelleri", "virusler", "bakteri-ve-arke"],
    goal: "Virüsten insana boyları 10’un kuvvetleriyle karşılaştırmak; mm, µm, nm birimlerini ve görme araçlarını ilişkilendirmek.",
    pages: [
      {
        title: "Onar kat büyüyen bir doğru",
        paragraphs: [
          "Canlıların boyları çok geniş bir aralıktadır. Bunu tek bir doğruya sığdırmak için her çentiği bir öncekinin 10 katı yaparız (logaritmik ölçek).",
          "1 mm = 1000 µm, 1 µm = 1000 nm. Çıplak göz yaklaşık 0,1 mm’ye kadar görür; hücreler için ışık mikroskobu, virüsler için elektron mikroskobu gerekir.",
        ],
        terms: [["µm (mikrometre)", "Metrenin milyonda biri."], ["nm (nanometre)", "Metrenin milyarda biri."]],
        figure: scale,
        predict: { question: "Bir bakteri (2 µm) bir hayvan hücresinden (20 µm) kaç kat küçüktür?", answer: "10 kat." },
      },
      {
        title: "Önce birimi eşitle",
        paragraphs: ["İki boyu karşılaştırmadan önce aynı birime çevir; sonra büyüğü küçüğe böl. “Kaç kat” sorusunun cevabı birimsiz bir sayıdır."],
        figure: compare,
      },
    ],
    examples: [
      { title: "Kaç kat?", given: "Hayvan hücresi 20 µm, virüs 100 nm.", steps: ["Aynı birime çevir: 20 µm = 20 000 nm.", "20 000 ÷ 100 = 200."], answer: "Hücre virüsten yaklaşık 200 kat büyük", check: "Birim eşitlenmeden bölmek yanlış sonuç verir ✓." },
      { title: "Hangi araç?", given: "5 µm boyunda bir hücre", steps: ["0,1 mm = 100 µm göz sınırının altında.", "Işık mikroskobu µm düzeyini gösterir."], answer: "Işık mikroskobu", check: "Virüs (nm) olsaydı elektron mikroskobu gerekirdi ✓." },
    ],
    checks: [
      { prompt: "1 mm kaç µm’dir?", options: ["10", "100", "1 000", "1 000 000", "0,001"], answer: 2, explain: "mili binde bir, mikro milyonda bir: 1 mm = 1000 µm.", reasons: ["Bir basamak.", "İki basamak.", "Doğru.", "Bu 1 m’nin µm karşılığıdır.", "Ters yön."] },
      { prompt: "Hangisini görmek için elektron mikroskobu gerekir?", options: ["Kum tanesi", "Bir insan saç teli", "Virüs", "Karınca", "Yumurta"], answer: 2, explain: "Virüs ~100 nm: ışık mikroskobunun ayırt edebildiğinden küçüktür.", reasons: ["Gözle görülür.", "Gözle görülür (~0,1 mm).", "Doğru.", "Gözle görülür.", "Gözle görülür."] },
      { prompt: "Logaritmik ölçekte bir çentik ilerlemek ne anlama gelir?", options: ["1 birim artmak", "2 katına çıkmak", "10 katına çıkmak", "100 birim artmak", "Yarıya inmek"], answer: 2, explain: "Her çentik bir öncekinin 10 katı.", reasons: ["Bu doğrusal ölçektir.", "Bu ikilik ölçektir.", "Doğru.", "Doğrusal artıştır.", "Ters yön ve yanlış çarpan."] },
    ],
  },
];
