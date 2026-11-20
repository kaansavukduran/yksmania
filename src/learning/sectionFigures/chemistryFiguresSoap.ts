import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Sabun, deterjan ve temizlik maddeleri. Şemalar ölçekli değildir;
 * misel kesiti çok sayıda taneciğin düzenini gösterir. Sertlik modeli ideal
 * 2 RCOO⁻ + M²⁺ → (RCOO)₂M(k) çökelmesidir; asit modeli RCOO⁻ + H⁺ → RCOOH.
 * ÖSYM bağı: 2017 LYS2 Kimya 29 (yapılmış sınav, resmî cevap E); çözüm özgündür.
 * Sayısal örnekler özgündür.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });

// 1 · Bir taneciğin iki bölgesi.
const PARTS = [
  { label: "Kuyruk (R)", title: "Kuyruk: uzun hidrokarbon zinciri, apolar", detail: ["C–H ve C–C bağlarından oluşur; yağlı kirle etkileşir (hidrofob).", "Hidrofob “sudan itilen” değil, suyla etkileşmesi elverişsiz demektir."] },
  { label: "Baş (COO⁻)", title: "Baş: karboksilat, iyonik ve polar", detail: ["Su molekülleriyle etkileşir (hidrofil); suya dönük kalır.", "Deterjanlarda baş sülfat veya sülfonat olabilir; ayrım aynıdır."] },
  { label: "Katyon (Na⁺)", title: "Katyon: Na⁺ (katı sabun) ya da K⁺", detail: ["RCOONa ve RCOOK ortak RCOO⁻ anyonunu taşır.", "Sıvı görünüş tek başına K⁺ sabunu olduğunu göstermez; etiket okunur."] },
];
const anatomy: FigureDef = {
  caption:
    "Sabun anyonu RCOO⁻: R uzun hidrokarbon zinciridir. Bir bölgeye tıkla: kuyruk apolar (yağla), baş iyonik (suyla) etkileşir; katyon Na⁺ ya da K⁺ olur. 2017 LYS2 Kimya 29 (resmî kitapçık, cevap E): apolar zincir ile polar başın aynı yapıda bulunması çelişki değil, temizlemenin temelidir.",
  alt: "Zikzak hidrokarbon kuyruğu, ucunda COO⁻ baş dairesi ve yanında Na⁺ iyonu.",
  picks: PARTS,
  draw: (_v, _s, pick = -1) => {
    const pts = Array.from({ length: 11 }, (_, i) => v(i * 0.45, i % 2 ? 0.22 : -0.02));
    const els: El[] = [poly(pts, { open: true, tone: pick === 0 ? "a" : "muted", bold: true })];
    els.push(ball(v(5.2, 0.1), 0.42, pick === 1 ? "a" : "b"), txt(v(5.2, 0.1), "COO⁻", "c", { small: true, bold: true }));
    els.push(ball(v(6.5, 0.1), 0.3, pick === 2 ? "a" : "c"), txt(v(6.5, 0.1), "Na⁺", "c", { small: true, bold: true }));
    els.push(txt(v(2.2, -0.75), "Kuyruk (R)", "c", { small: true, bold: pick === 0, tone: pick === 0 ? "a" : "ink", pick: 0 }));
    els.push(txt(v(5.2, -0.85), "Baş (COO⁻)", "c", { small: true, bold: pick === 1, tone: pick === 1 ? "a" : "ink", pick: 1 }));
    els.push(txt(v(7.0, -0.85), "Katyon (Na⁺)", "c", { small: true, bold: pick === 2, tone: pick === 2 ? "a" : "ink", pick: 2 }));
    els.push(txt(v(2.2, 0.75), "apolar · yağla", "c", { small: true, tone: "muted" }), txt(v(5.2, 0.85), "polar · suyla", "c", { small: true, tone: "muted" }));
    els.push(txt(v(-0.4, 1.2), " ", "c"), txt(v(8.0, -1.2), " ", "c"));
    return { els, readout: [pick >= 0 ? PARTS[pick].detail[0] : "Bir bölgeye tıkla.", "Şema ölçekli değildir; R gerçekte 11–17 karbonlu olabilir."] };
  },
};

// 2 · Kirin çevrelenmesi ve misel.
const MSTAGES = [
  { title: "1 · Yağlı kir yüzeyde", text: "Su yağlı kiri tek başına uzaklaştıramaz: yağ ile su sınırlı karışır." },
  { title: "2 · Kuyruklar yağa girer", text: "Hidrofob kuyruklar yağa, hidrofil başlar suya yönelir; karıştırma teması artırır." },
  { title: "3 · Misel suda dağılır", text: "Kuyruklar içte kiri sarar, başlar dışta suya dönük; durulama dağılmış kiri taşır." },
];
const micelle: FigureDef = {
  caption:
    "Kirin çevrelenmesinden durulamaya. Aşamayı ilerlet: yüzeydeki yağ damlasına kuyruklar girer, başlar suya bakar; sonunda kir, başları dışa dönük bir kümenin (misel) içinde suya dağılır. Misel tek bir sabun iyonu değildir; çok sayıda taneciğin düzenidir. Kesit ölçekli değildir.",
  alt: "Yüzey çizgisi üstünde yağ damlası; aşamalara göre çevresine dizilen kuyruk–baş tanecikleri ve yüzeyden ayrılan küme.",
  param: { label: "Aşama", min: 0, max: 2, step: 1, init: 2, unit: "" },
  draw: (s) => {
    const st = Math.round(s), cy = st === 2 ? 1.9 : 0.75, r = 0.7;
    const els: El[] = [seg(v(-2.6, 0), v(2.6, 0), { tone: "muted", bold: true }), txt(v(2.6, -0.3), "yüzey", "e", { small: true, tone: "muted" }), txt(v(-2.6, 3.0), "su", "e", { small: true, tone: "muted" })];
    els.push(circle(v(0, cy), r, { fill: "warn", tone: "warn", thin: true }), txt(v(0, cy), "yağlı kir", "c", { small: true, bold: true }));
    if (st >= 1) {
      const n = st === 2 ? 12 : 7;
      for (let i = 0; i < n; i++) {
        const a = st === 2 ? (i * 2 * Math.PI) / n : Math.PI * (0.08 + (0.84 * i) / (n - 1));
        const inner = v(Math.cos(a) * (r - 0.25), cy + Math.sin(a) * (r - 0.25)), outer = v(Math.cos(a) * (r + 0.35), cy + Math.sin(a) * (r + 0.35));
        els.push(seg(inner, outer, { tone: "muted" }), ball(v(Math.cos(a) * (r + 0.47), cy + Math.sin(a) * (r + 0.47)), 0.12, "b"));
      }
    }
    if (st === 2) els.push(vec(v(1.9, 1.2), v(1.9, 2.5), { tone: "a", thin: true }), txt(v(2.05, 1.85), "durulama", "e", { small: true, tone: "a" }));
    els.push(txt(v(0, -0.6), MSTAGES[st].title, "c", { small: true, bold: true }));
    els.push(ball(v(-2.3, -1.15), 0.1, "b"), txt(v(-2.1, -1.15), "baş (suya)", "e", { small: true }), seg(v(0.2, -1.15), v(0.7, -1.15), { tone: "muted" }), txt(v(0.85, -1.15), "kuyruk (yağa)", "e", { small: true }));
    els.push(txt(v(-2.8, 3.3), " ", "c"), txt(v(3.6, -1.4), " ", "c"));
    return { els, readout: [MSTAGES[st].text, "Başları içe, kuyrukları suya çizmek iki bölgenin etkileşimini ters kurar."] };
  },
};

// 3 · Sabunlaşma.
const SAPON = [
  { label: "Ester bağı", title: "Ester bağı: –C(=O)–O–", detail: ["Triaçilgliserolde üç yağ asidi kalıntısı gliserole üç ester bağıyla bağlıdır.", "Her ester bağı bir OH⁻ ile kopar: 3 NaOH gerekir."] },
  { label: "Gliserol", title: "Gliserol: ikinci ürün", detail: ["Üç OH grubu taşıyan alkol; sabunla birlikte oluşur."] },
  { label: "3 RCOONa", title: "Sabun: 3 RCOONa", detail: ["Üç kalıntı aynı varsayıldı; farklı olsaydı üç farklı sabun anyonu oluşurdu.", "KOH ile RCOOK (yumuşak sabun) oluşur."] },
];
const saponification: FigureDef = {
  caption:
    "Sabunlaşmada üç ester bağı: triaçilgliserol + 3 NaOH → gliserol + 3 RCOONa (üç kalıntı aynı varsayıldı). Bir parçaya tıkla: ester bağları turuncu işaretlidir; her bağ bir hidroksitle kopar. Her deterjan sabunlaşmayla üretilmez.",
  alt: "Solda gliserol omurgasına bağlı üç kuyruk ve üç ester işareti; ok; sağda gliserol ve üç sabun taneciği.",
  picks: SAPON,
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [rect(-0.3, 0.3, -1.0, 1.0, pick === 1 ? "a" : "muted", false)];
    [0.7, 0, -0.7].forEach((y) => {
      els.push(ball(v(0.6, y), 0.13, pick === 0 ? "a" : "warn"), seg(v(0.75, y), v(2.4, y), { tone: "muted", bold: true }));
    });
    els.push(txt(v(0, 1.3), "triaçilgliserol", "c", { small: true }), txt(v(4.8, 0.4), "+ 3 NaOH", "c", { small: true, bold: true }));
    els.push(vec(v(4.1, 0), v(5.4, 0), { tone: "a", bold: true }));
    els.push(rect(5.6, 6.2, -1.0, 1.0, pick === 1 ? "a" : "muted", false), txt(v(5.9, 1.3), "gliserol", "c", { small: true, bold: pick === 1, tone: pick === 1 ? "a" : "ink", pick: 1 }));
    ["OH", "OH", "OH"].forEach((l, i) => els.push(txt(v(6.3, 0.7 - i * 0.7), l, "e", { small: true })));
    [0.7, 0, -0.7].forEach((y) => els.push(seg(v(7.4, y), v(8.8, y), { tone: "muted", bold: true }), ball(v(9.0, y), 0.16, pick === 2 ? "a" : "b"), txt(v(9.25, y), "COO⁻ Na⁺", "e", { small: true })));
    els.push(txt(v(9.6, 1.3), "3 RCOONa", "c", { small: true, bold: pick === 2, tone: pick === 2 ? "a" : "ink", pick: 2 }));
    els.push(txt(v(0.6, -1.3), "Ester bağı", "c", { small: true, bold: pick === 0, tone: pick === 0 ? "a" : "ink", pick: 0 }));
    els.push(txt(v(-0.6, 1.6), " ", "c"), txt(v(11.2, -1.6), " ", "c"));
    return { els, readout: [pick >= 0 ? SAPON[pick].detail[0] : "Bir parçaya tıkla.", "Denkleştirme: 3 ester bağı ↔ 3 NaOH ↔ 3 sabun taneciği."] };
  },
};

// 4 · Sert su.
const WATERS = [
  { k: "X", ca: 1, mg: 1 },
  { k: "Y", ca: 2, mg: 0 },
  { k: "Z", ca: 0, mg: 0.5 },
];
const hardWater: FigureDef = {
  caption:
    "Birer litre X, Y, Z suyuna aynı koşulda 10 mmol aynı sabun ekleniyor (özgün model). Bir suya tıkla: her Ca²⁺ ya da Mg²⁺ iki sabun anyonu bağlar (yük dengesi: 2 × (−1) + (+2) = 0). Turuncu kısım çöken, mavi kısım çözeltide kalan sabundur. X ve Y’de iyon türü farklı, toplam iki değerlikli iyon aynı: tüketim eşit.",
  alt: "Üç yığılmış çubuk: X ve Y 4 mmol tüketilen + 6 kalan, Z 1 tüketilen + 9 kalan.",
  picks: WATERS.map((w) => ({ label: w.k, title: `${w.k}: ${String(2 * (w.ca + w.mg)).replace(".", ",")} mmol bağlandı`, detail: [`Ca²⁺ ${String(w.ca).replace(".", ",")} + Mg²⁺ ${String(w.mg).replace(".", ",")} mmol → tüketilen 2 × ${String(w.ca + w.mg).replace(".", ",")} = ${String(2 * (w.ca + w.mg)).replace(".", ",")} mmol.`, `Kalan sabun: 10 − ${String(2 * (w.ca + w.mg)).replace(".", ",")} = ${String(10 - 2 * (w.ca + w.mg)).replace(".", ",")} mmol.`] })),
  draw: (_v, _s, pick = -1) => {
    const k = 0.55, els: El[] = [];
    WATERS.forEach((w, i) => {
      const y = -i * 0.9, used = 2 * (w.ca + w.mg), sel = pick === i;
      els.push(txt(v(-0.2, y), w.k, "w", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }), rect(0, used * k, y - 0.25, y + 0.25, "warn"), rect(used * k, 10 * k, y - 0.25, y + 0.25, sel ? "a" : "b"));
      els.push(txt(v(10 * k + 0.15, y), `${String(used).replace(".", ",")} çöktü · ${String(10 - used).replace(".", ",")} kaldı`, "e", { small: true }));
    });
    els.push(txt(v(-0.8, 0.6), " ", "c"), txt(v(9.0, -2.2), " ", "c"));
    return { els, readout: [pick >= 0 ? `${WATERS[pick].k}: 2 × (Ca²⁺ + Mg²⁺) mmol sabun bağlanır.` : "Bir suya tıkla.", "Hacimler farklı olsaydı mmol sayısı tek başına sertlik derişimini vermezdi."] };
  },
};

// 5 · Asidik ortam.
const acid: FigureDef = {
  caption:
    "Asidik ortam ayrı bir sınırdır: RCOO⁻ + H⁺ → RCOOH (1 : 1). 8 mmol sabun anyonuna eklenen H⁺ miktarını kaydır: oluşan yağ asidi az çözünür ve temizlemeye katılmaz; kalan sabun anyonu azalır. Sertlikteki 2 : 1 oranı burada geçerli değildir.",
  alt: "Tek yığılmış çubuk: RCOOH kısmı ve kalan RCOO⁻ kısmı.",
  param: { label: "Eklenen H⁺", min: 0, max: 8, step: 1, init: 3, unit: " mmol" },
  draw: (h) => {
    const k = 0.7, els: El[] = [
      rect(0, Math.max(h * k, 0.001), -0.3, 0.3, "warn"), rect(h * k, 8 * k, -0.3, 0.3, "b"),
      txt(v((h * k) / 2, 0.6), h ? `RCOOH ${h}` : "", "c", { small: true, bold: true }), txt(v(((h + 8) * k) / 2, -0.6), h < 8 ? `RCOO⁻ ${8 - h}` : "", "c", { small: true, bold: true, tone: "a" }),
      seg(v(0, -1.0), v(8 * k, -1.0), { thin: true, tone: "muted" }),
    ];
    [0, 4, 8].forEach((t) => els.push(txt(v(t * k, -1.3), String(t), "c", { small: true, tone: "muted" })));
    els.push(txt(v(8 * k, -1.65), "mmol", "c", { small: true, tone: "muted" }));
    els.push(txt(v(-0.6, 1.0), " ", "c"), txt(v(6.4, -1.9), " ", "c"));
    return { els, readout: [`${h} mmol H⁺ → ${h} mmol RCOOH; kalan RCOO⁻ = 8 − ${h} = ${8 - h} mmol.`, "Koşul sertlik iyonu değil asit olunca denklem ve oran değişir."] };
  },
};

// 6 · Hipoklorit ile kireç türleri.
const LIME = [
  { label: "Çamaşır suyu", formula: "NaOCl", ocl: true, note: "Sulu NaOCl çözeltisi; hipoklorit temelli ağartma/dezenfeksiyon; yağ asidi tuzu değildir." },
  { label: "Kireç kaymağı", formula: "Ca(OCl)₂", ocl: true, note: "Ca²⁺ + 2 OCl⁻: +2 + 2(−1) = 0. Adında “kireç” olsa da kireç taşı değildir." },
  { label: "Sönmüş kireç", formula: "Ca(OH)₂", ocl: false, note: "Bazdır; hipoklorit içermez." },
  { label: "Kireç taşı", formula: "CaCO₃", ocl: false, note: "Karbonattır; hipoklorit içermez." },
];
const limes: FigureDef = {
  caption:
    "Temiz görünmek steril olmak değildir: temizlik kiri uzaklaştırır, dezenfeksiyon mikroorganizmaları hedefler. Bir ürüne tıkla: ayırıcı tür ve hipoklorit (OCl⁻) içerip içermediği açılır. Hipokloritli ürünler asit ya da amonyaklı temizleyicilerle karıştırılmaz: tehlikeli gaz oluşabilir.",
  alt: "Dört kartlık pano: ürün adı, formül ve OCl⁻ var/yok işareti.",
  picks: LIME.map((l) => ({ label: l.label, title: `${l.label}: ${l.formula}`, detail: [l.note, l.ocl ? "OCl⁻ içerir." : "OCl⁻ içermez."] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    LIME.forEach((l, i) => {
      const x = (i % 2) * 3.6, y = -Math.floor(i / 2) * 1.4, sel = pick === i;
      els.push(rect(x, x + 3.3, y - 0.55, y + 0.55, sel ? "a" : "muted", false));
      els.push(txt(v(x + 0.15, y + 0.22), l.label, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }), txt(v(x + 0.15, y - 0.25), l.formula, "e", { small: true }));
      els.push(txt(v(x + 3.15, y - 0.25), l.ocl ? "OCl⁻ var" : "OCl⁻ yok", "w", { small: true, tone: l.ocl ? "a" : "muted" }));
    });
    els.push(txt(v(-0.3, 0.8), " ", "c"), txt(v(7.2, -2.2), " ", "c"));
    return { els, readout: [pick >= 0 ? LIME[pick].note : "Bir ürüne tıkla.", "Köpük, koku ya da görünür temizlik mikroorganizma ölçümü değildir."] };
  },
};

export const chemistryFiguresSoap: Record<string, Record<string, FigureDef>> = {
  "sabun-deterjan-temizlik": {
    "Aynı taneciğin iki farklı bölgesi": anatomy,
    "Kirin çevrelenmesinden durulamaya": micelle,
    "Sabunlaşmada üç ester bağı": saponification,
    "Sert su sabunun bir kısmını bağlar": hardWater,
    "Asidik ortam ayrı bir sınırdır": acid,
    "Temiz görünmek steril olmak değildir": limes,
  },
};
