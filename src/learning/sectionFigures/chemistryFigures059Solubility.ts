import { ball, circle, poly, seg, txt, v, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { axes, box, curve, nf, pad, xtick, ytick } from "./physicsFigures058Kit";
import { sci } from "./chemistryFigures059AcidBase";

/*
 * Forge059 AYT Kimya: çözünürlük dengesi. Aynı Kç'de farklı formül türlerinin
 * molar çözünürlüğü, AgCl'de ortak iyonun tam denklemi (Kç = s(c + s)),
 * karışımda son hacimle Q, sıcaklığın Kç'ye etkisi (bölüm verisi: 10 °C'de
 * 1·10⁻⁴, 40 °C'de 9·10⁻⁴), ısı alan/veren çözünmenin eğilimi, ortak iyonun
 * katsayısı ve sonlu katı ile doygunluk kapasitesi. AgCl için Kç = 1,8×10⁻¹⁰
 * (25 °C tablo değeri).
 */

const KSP_AGCL = 1.8e-10;

/* ---------- ayt-cozunurluk-dengesi ---------- */

const TYPES: { name: string; a: number; b: number; coef: number; pow: number; rel: string }[] = [
  { name: "AB", a: 1, b: 1, coef: 1, pow: 2, rel: "Kç = s²" },
  { name: "AB₂", a: 1, b: 2, coef: 4, pow: 3, rel: "Kç = s · (2s)² = 4s³" },
  { name: "AB₃", a: 1, b: 3, coef: 27, pow: 4, rel: "Kç = s · (3s)³ = 27s⁴" },
  { name: "A₂B₃", a: 2, b: 3, coef: 108, pow: 5, rel: "Kç = (2s)² · (3s)³ = 108s⁵" },
];
const formulas: FigureDef = {
  caption:
    "İleri ile formül türlerini sırayla aç. Her birinde 1 formül biriminden kaç A ve kaç B iyonu çıktığı Kç bağıntısının katsayısını ve üssünü belirler (bölüm tablosu). Sağdaki çubuklar aynı örnek Kç = 1,0×10⁻¹² için hesaplanan molar çözünürlüklerdir (log ölçek): Kç'si aynı olan tuzların çözünürlüğü aynı değildir.",
  alt: "Solda bir formül biriminin iyonlara ayrılışı: A iyonları dolu, B iyonları halka. Sağda dört yatay çubuk: AB, AB₂, AB₃, A₂B₃ için çözünürlük; seçili tür vurgulu.",
  steps: TYPES.map((t) => t.name),
  draw: (_v, step) => {
    const t = TYPES[step];
    const els: El[] = [];
    els.push(txt(v(1.4, 3.5), `${t.name}(k) → ${t.a > 1 ? t.a : ""}A + ${t.b > 1 ? t.b : ""}B`, "n", { tone: "ink", small: true, bold: true }));
    for (let i = 0; i < t.a; i++) els.push(circle(v(0.5 + i * 0.6, 2.3), 0.22, { tone: "a", fill: "a" }));
    for (let i = 0; i < t.b; i++) els.push(circle(v(0.5 + i * 0.6, 1.4), 0.22, { tone: "b" }));
    els.push(txt(v(0.5 + t.a * 0.6, 2.3), t.a > 1 ? `${t.a}s` : "s", "e", { tone: "a", small: true, bold: true }));
    els.push(txt(v(0.5 + t.b * 0.6, 1.4), t.b > 1 ? `${t.b}s` : "s", "e", { tone: "b", small: true, bold: true }));
    const K = 1e-12;
    const bx = 4.6;
    const L = (s: number) => (Math.log10(s) + 7) * 1.1;
    TYPES.forEach((u, i) => {
      const s = (K / u.coef) ** (1 / u.pow);
      const y = 3.0 - i * 0.8;
      const on = i === step;
      els.push(box(bx, y - 0.25, bx + L(s), y + 0.25, on ? "warn" : "muted", on));
      els.push(txt(v(bx - 0.1, y), u.name, "w", { tone: on ? "ink" : "muted", small: true, bold: on }));
      els.push(txt(v(bx + L(s) + 0.1, y), sci(s, 2), "e", { tone: on ? "ink" : "muted", small: true }));
    });
    els.push(txt(v(bx + 1.6, 3.55), "s (mol/L), log ölçek", "n", { tone: "muted", small: true }));
    els.push(...pad(-0.3, 4.2, 10.4, 0));
    const s = (K / t.coef) ** (1 / t.pow);
    return { els, readout: [`${t.name}: ${t.rel}`, `Kç = 1,0×10⁻¹² ise s = (Kç ÷ ${t.coef})^(1/${t.pow}) = ${sci(s, 2)} mol/L`] };
  },
};

const commonIon: FigureDef = {
  caption:
    "Sürgüyle ortamdaki Cl⁻ derişimini (c, NaCl'den) artır. AgCl'nin bu ortamdaki molar çözünürlüğü Kç = s(c + s) denkleminden: s = 2Kç / [c + √(c² + 4Kç)] (Kç = 1,8×10⁻¹⁰). c büyüdükçe s küçülür; Kç değişmez. Kesikli çizgi saf sudaki çözünürlüktür.",
  alt: "Yatay eksen log c (−9'dan −1'e), dikey eksen log s. Solda yatay seyreden, sonra aşağı inen eğri; saf su çözünürlüğünde kesikli yatay çizgi; sürgüyle kayan nokta.",
  param: { label: "log c (Cl⁻)", min: -9, max: -1, step: 0.5, init: -3, unit: "" },
  draw: (lc) => {
    const sOf = (l: number) => {
      const c = 10 ** l;
      return (2 * KSP_AGCL) / (c + Math.sqrt(c * c + 4 * KSP_AGCL));
    };
    const X = (l: number) => (l + 9) * 0.85;
    const Y = (ls: number) => (ls + 10) * 0.85;
    const els: El[] = [...axes(v(0, 0), X(-0.5), Y(-3.6), "log c", "log s")];
    els.push(seg(v(0, Y(Math.log10(Math.sqrt(KSP_AGCL)))), v(X(-1), Y(Math.log10(Math.sqrt(KSP_AGCL)))), { tone: "muted", dash: true, thin: true }));
    els.push(poly(curve((l) => Math.log10(sOf(l)), -9, -1, 80, X, Y), { tone: "c", open: true, bold: true, smooth: true }));
    for (const l of [-9, -7, -5, -3, -1]) els.push(...xtick(X(l), 0, String(l).replace("-", "−")));
    for (const ls of [-9, -7, -5]) els.push(...ytick(0, Y(ls), String(ls).replace("-", "−")));
    els.push(ball(v(X(lc), Y(Math.log10(sOf(lc)))), 0.11, "warn"));
    els.push(txt(v(X(-3), Y(Math.log10(Math.sqrt(KSP_AGCL)))), "saf su", "n", { tone: "muted", small: true }));
    els.push(...pad(-0.8, Y(-3.0), X(-0.5) + 0.9, -0.7));
    const c = 10 ** lc;
    const s = sOf(lc);
    return {
      els,
      readout: [`c = ${sci(c, 1)} M: s = ${sci(s, 3)} mol/L (saf suda ${sci(Math.sqrt(KSP_AGCL), 3)})`, `Kestirim Kç/c = ${sci(KSP_AGCL / c, 3)} · s/c = ${sci(s / c, 1)}${s / c > 0.05 ? ": küçük değil, tam kök gerekir." : ": kestirim uygun."}`],
    };
  },
};

const mixQ: FigureDef = {
  caption:
    "İleri ile 50 mL 2,0×10⁻⁴ M AgNO₃ ve 50 mL 2,0×10⁻⁴ M NaCl karışımını değerlendir (AgCl, Kç = 1,8×10⁻¹⁰). Önce her iyonun molü son toplam hacme (100 mL) bölünür: derişimler yarıya iner. Sonra Q = [Ag⁺][Cl⁻] hesaplanır ve Kç ile karşılaştırılır. Şişelerdeki molariteleri doğrudan çarpmak seyreltmeyi atlar.",
  alt: "Solda 50 mL'lik AgNO₃ ve NaCl şişeleri, sağda 100 mL'lik karışım kabı. Adımlarda iyon derişimleri ve Q ile Kç'yi karşılaştıran iki çubuk (log ölçek) görünüyor.",
  steps: ["İki şişe", "Son hacim", "Q ile Kç"],
  draw: (_v, step) => {
    const els: El[] = [];
    const flask = (x: number, w: number, h: number, tone: Tone, label: string) => {
      els.push(poly([v(x, h), v(x, 0), v(x + w, 0), v(x + w, h)], { tone: "ink", open: true }), box(x + 0.05, 0.05, x + w - 0.05, h * 0.7, tone));
      els.push(txt(v(x + w / 2, 0), label, "s", { tone: "ink", small: true }));
    };
    flask(0, 1.3, 1.8, "a", "AgNO₃");
    flask(2.5, 1.3, 1.8, "b", "NaCl");
    els.push(txt(v(0.65, 1.8), "50 mL", "n", { tone: "a", small: true }), txt(v(3.15, 1.8), "50 mL", "n", { tone: "b", small: true }));
    if (step >= 1) {
      flask(4.9, 1.8, 2.4, "c", "100 mL");
      els.push(txt(v(5.8, 2.4), "[Ag⁺] = [Cl⁻] = 1,0×10⁻⁴ M", "n", { tone: "ink", small: true, bold: true }));
    }
    if (step >= 2) {
      const L = (x: number) => (Math.log10(x) + 11) * 0.45;
      const bx = 7.6;
      els.push(box(bx, 0, bx + 0.6, L(1e-8), "warn"), box(bx + 1.0, 0, bx + 1.6, L(KSP_AGCL), "muted"));
      els.push(txt(v(bx + 0.3, L(1e-8)), "Q", "n", { tone: "warn", small: true, bold: true }), txt(v(bx + 1.3, L(KSP_AGCL)), "Kç", "n", { tone: "ink", small: true, bold: true }));
    }
    els.push(...pad(-0.3, 3.2, 9.6, -0.6));
    const rows: [string, string][] = [
      ["Her şişede 2,0×10⁻⁴ M · 0,050 L = 1,0×10⁻⁵ mol iyon.", "Şişe derişimlerini çarpmak (4,0×10⁻⁸) yanlış: karışımda hacim değişti."],
      ["Son hacim 100 mL: [Ag⁺] = [Cl⁻] = 1,0×10⁻⁵ mol ÷ 0,100 L = 1,0×10⁻⁴ M.", "Hacimler toplamsal kabul edildi."],
      ["Q = (1,0×10⁻⁴)² = 1,0×10⁻⁸ > Kç = 1,8×10⁻¹⁰ → AgCl çökmesi elverişli.", "Çökelmeden sonra iyonlar sıfırlanmaz: kalan [Ag⁺] = [Cl⁻] = √Kç ≈ 1,34×10⁻⁵ M."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- cozunurluk-faktorleri ---------- */

const endoTemp: FigureDef = {
  caption:
    "İleri ile sıcaklığı 10 °C'den 40 °C'ye çıkar. Isı alan çözünmede (MX(k) + ısı ⇌ iyonlar) sıcaklık artışı çözünme yönünü destekler; Kç büyür. Bölümdeki veri: Kç 10 °C'de 1·10⁻⁴, 40 °C'de 9·10⁻⁴. 1 : 1 tuz, ideal saf su: s = √Kç → 0,01 ve 0,03 mol/L. Bu iki nokta arasının doğrusal olduğu söylenmez.",
  alt: "İki beher: soğuk olanda dipte çok katı ve çözeltide az iyon, sıcak olanda dipte az katı ve çözeltide üç kat iyon. Altlarında Kç ve s değerleri.",
  steps: ["10 °C", "40 °C"],
  draw: (_v, step) => {
    const els: El[] = [];
    const beaker = (x: number, ions: number, solid: number, label: string, on: boolean) => {
      els.push(poly([v(x, 2.8), v(x, 0), v(x + 2.4, 0), v(x + 2.4, 2.8)], { tone: on ? "ink" : "muted", open: true }));
      els.push(box(x + 0.05, 0.05, x + 2.35, 2.2, on ? "b" : "muted"));
      els.push(box(x + 0.2, 0.05, x + 0.2 + solid, 0.3, on ? "warn" : "muted"));
      for (let i = 0; i < ions; i++) els.push(circle(v(x + 0.4 + (i % 4) * 0.5, 0.75 + Math.floor(i / 4) * 0.45), 0.09, { tone: on ? "c" : "muted", fill: on ? "c" : undefined }));
      els.push(txt(v(x + 1.2, 2.8), label, "n", { tone: on ? "ink" : "muted", small: true, bold: true }));
    };
    beaker(0, 4, 1.8, "10 °C · s = 0,01 mol/L", true);
    if (step >= 1) beaker(3.6, 12, 0.6, "40 °C · s = 0,03 mol/L", true);
    els.push(...pad(-0.3, 3.4, 6.3, -0.3));
    const rows: [string, string][] = [
      ["10 °C: Kç = 1·10⁻⁴ → s = √(1·10⁻⁴) = 0,01 mol/L.", "Her nokta aynı miktar çözünmüş tuzu temsil eder; dipte çözünmemiş katı var."],
      ["40 °C: Kç = 9·10⁻⁴ → s = √(9·10⁻⁴) = 0,03 mol/L (üç kat).", "Değişen denge sabitidir; karıştırma hızı Kç'yi değiştirmez. Soğutunca kristal ayrılabilir."],
    ];
    return { els, readout: rows[step] };
  },
};

const exoTemp: FigureDef = {
  caption:
    "İleri ile iki çözünme türünün eğilimini karşılaştır (şematik, ölçekli değil). Isı alan çözünmede sıcaklık artınca doygun çözünürlük artar; ısı veren çözünmede (MX(k) ⇌ iyonlar + ısı) azalabilir. Her katının sıcak suda daha çok çözündüğü genel bir yasa değildir; ısı yönünü ya da gerçek tabloyu oku.",
  alt: "Çözünürlük–sıcaklık grafiği: yükselen eğri ısı alan çözünmeyi, ikinci adımda eklenen alçalan eğri ısı veren çözünmeyi gösteriyor; eğrilerin altı doymamış, üstü aşırı doymuş bölge.",
  steps: ["Isı alan çözünme", "Isı veren çözünme"],
  draw: (_v, step) => {
    const els: El[] = [...axes(v(0, 0), 7.4, 4.4, "T", "çözünürlük")];
    const up = (x: number) => 0.8 + 0.06 * x * x;
    const down = (x: number) => 3.4 - 0.32 * x;
    els.push(poly(curve(up, 0.2, 6.6, 40, (x) => x, (y) => y), { tone: "a", open: true, bold: true, smooth: true }));
    els.push(txt(v(6.6, up(6.6)), "ısı alan", "e", { tone: "a", small: true, bold: true }));
    if (step >= 1) {
      els.push(poly(curve(down, 0.2, 6.6, 20, (x) => x, (y) => y), { tone: "b", open: true, bold: true, dash: true }));
      els.push(txt(v(6.6, down(6.6)), "ısı veren", "e", { tone: "b", small: true, bold: true }));
    }
    els.push(...pad(-0.6, 4.9, 9.2, -0.7));
    const rows: [string, string][] = [
      ["MX(k) + ısı ⇌ iyonlar: ısıtma ileri yönü destekler, Kç ve s artar.", "Soğuyan doygun çözelti kristal ayırabilir."],
      ["MX(k) ⇌ iyonlar + ısı: ısıtma katı tarafını destekler, Kç ve s azalabilir.", "Bu durumda soğutma kristal ayırmayı zorunlu kılmaz; eğri sınırın değişimidir."],
    ];
    return { els, readout: rows[step] };
  },
};

const coefVolume: FigureDef = {
  caption:
    "İleri ile ortak iyonun katsayısını ve son hacmi say. 0,01 M MgX₂ tam ayrışınca her formül biriminden iki X⁻ çıkar: X⁻ katkısı 0,02 M. 1 L'de 0,02 mol X⁻ var; hacim 2 L'ye tamamlanınca son katkı 0,01 M olur. Q bu son derişimle kurulur.",
  alt: "Solda MgX₂ formül birimlerinin bir Mg²⁺ ve iki X⁻ iyonuna ayrılışı; sağda 1 L ve 2 L kaplar, aynı sayıda X⁻ noktası daha geniş hacme yayılmış.",
  steps: ["Katsayı: 1 → 2", "Son hacim: 2 L"],
  draw: (_v, step) => {
    const els: El[] = [];
    els.push(txt(v(1.5, 3.4), "MgX₂ → Mg²⁺ + 2X⁻", "n", { tone: "ink", small: true, bold: true }));
    for (let i = 0; i < 2; i++) {
      const y = 2.3 - i * 1.0;
      els.push(circle(v(0.4, y), 0.22, { tone: "a", fill: "a" }), circle(v(1.3, y), 0.18, { tone: "b" }), circle(v(1.8, y), 0.18, { tone: "b" }));
    }
    els.push(txt(v(0.4, 0.9), "Mg²⁺", "s", { tone: "a", small: true }), txt(v(1.55, 0.9), "X⁻", "s", { tone: "b", small: true }));
    const vessel = (x: number, w: number, label: string, n: number) => {
      els.push(poly([v(x, 2.8), v(x, 0), v(x + w, 0), v(x + w, 2.8)], { tone: "ink", open: true }));
      const spots: V[] = [];
      for (let i = 0; i < n; i++) spots.push(v(x + 0.3 + (i % 4) * ((w - 0.6) / 3), 0.5 + Math.floor(i / 4) * 0.7));
      for (const p of spots) els.push(circle(p, 0.13, { tone: "b" }));
      els.push(txt(v(x + w / 2, 2.8), label, "n", { tone: "ink", small: true, bold: true }));
    };
    vessel(3.2, 1.6, "1 L · 0,02 M X⁻", 8);
    if (step >= 1) vessel(5.6, 3.2, "2 L · 0,01 M X⁻", 8);
    els.push(...pad(-0.4, 3.9, 9.2, -0.3));
    const rows: [string, string][] = [
      ["0,01 M MgX₂ → [X⁻] = 2 · 0,01 = 0,02 M. Tuz molaritesini iyon derişimi yerine koymak iki kat hata.", "Her nokta 0,0025 mol X⁻."],
      ["Mol aynı (0,02 mol), hacim iki kat: [X⁻] = 0,02 mol ÷ 2 L = 0,01 M.", "Q, tepkime başlamadan önceki bu son derişimle kurulur."],
    ];
    return { els, readout: rows[step] };
  },
};

const finiteSolid: FigureDef = {
  caption:
    "Sürgüyle 1,0 L suya konan 1 : 1 tuzun toplam molünü değiştir (10 °C, Kç = 1·10⁻⁴, doygunluk kapasitesi s = 0,01 mol/L). Kapasitenin altında bütün katı çözünür ve Q < Kç kalır; eksik tuz kendiliğinden oluşmaz. Kapasite aşılınca çözünmüş miktar 0,01 mol'de sabitlenir, kalan katı = toplam − çözünmüş.",
  alt: "Yatay eksen konan tuz (mol), dikey eksen miktar. Çözünmüş miktar çizgisi 0,01 mol'e kadar yükselip yatay kalıyor; kalan katı çizgisi 0,01 mol'den sonra yükseliyor. Sürgüyle kayan dikey çizgi.",
  param: { label: "Konan tuz", min: 0, max: 20, step: 1, init: 6, unit: " mmol" },
  draw: (mmol) => {
    const n = mmol / 1000;
    const cap = 0.01;
    const X = (x: number) => x * 330;
    const Y = (y: number) => y * 330;
    const els: El[] = [...axes(v(0, 0), X(0.022), Y(0.0125), "konan tuz (mol)", "mol")];
    els.push(poly([v(0, 0), v(X(cap), Y(cap)), v(X(0.02), Y(cap))], { tone: "c", open: true, bold: true }));
    els.push(poly([v(X(cap), 0), v(X(0.02), Y(0.01))], { tone: "warn", open: true, bold: true, dash: true }));
    els.push(...xtick(X(0.01), 0, "0,01"), ...xtick(X(0.02), 0, "0,02"), ...ytick(0, Y(cap), "0,01"));
    els.push(txt(v(X(0.02), Y(cap)), "çözünmüş", "e", { tone: "c", small: true, bold: true }), txt(v(X(0.0185), Y(0.0085)), "kalan katı", "se", { tone: "warn", small: true, bold: true }));
    const d = Math.min(n, cap);
    const solid = n - cap > 1e-9 ? n - cap : 0;
    els.push(seg(v(X(n), 0), v(X(n), Y(0.0115)), { tone: "muted", thin: true }), ball(v(X(n), Y(d)), 0.1, "c"));
    if (solid > 0) els.push(ball(v(X(n), Y(solid)), 0.1, "warn"));
    els.push(...pad(-0.8, Y(0.0145), X(0.022) + 1.6, -0.7));
    return {
      els,
      readout: [
        `Çözünmüş ${nf(d, 3)} mol · kalan katı ${nf(solid, 3)} mol · Q = (${nf(d, 3)})² = ${sci(d * d, 2)}`,
        n < cap - 1e-9 ? "Q < Kç: doymamış; katı varsa çözünür, burada hepsi çözündü." : Math.abs(n - cap) < 1e-9 ? "Q = Kç: tam sınır; katı kalmadı ama çözelti doygun." : "Q = Kç: doygun; fazla tuz dipte kalır.",
      ],
    };
  },
};

export const chemistryFigures059Solubility: Record<string, Record<string, FigureDef>> = {
  "ayt-cozunurluk-dengesi": {
    "Farklı formüllerde bağıntı değişir": formulas,
    "Ortak iyonun tam denklemi": commonIon,
    "Karışımda önce son derişimleri bul": mixQ,
  },
  "cozunurluk-faktorleri": {
    "Isı alan çözünmeyi dengeyle yorumla": endoTemp,
    "Isı veren çözünmede yön ters olabilir": exoTemp,
    "Ortak iyonun katsayısını ve son hacmi say": coefVolume,
    "Q, Kç ve eldeki katı birlikte okunur": finiteSolid,
  },
};
