import { ball, poly, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Polimerler, kozmetik ürünler ve ilaçlar. TYT çekirdeği
 * (2026 TTKB 10.4.1.2): polimer adları, kullanım, oyuncak–tekstil, geri
 * dönüşüm yorumu. Yapı formülleri, monomer çıkarımı ve tekrar sayısı hesabı
 * isteğe bağlı AYT bağlantısıdır. ÖSYM bağı: 2019 TYT Fen 14 (yapılmış sınav,
 * resmî cevap A); çözüm özgündür. Tanecik çizimleri şematik, ölçekli değildir.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });

// 1 · Etilendeki çift bağ zincirde ne olur?
const chain: FigureDef = {
  caption:
    "n CH₂=CH₂ → [–CH₂–CH₂–]ₙ. Monomer sayısını kaydır: üstte ayrı etilen molekülleri (çift bağlı), altta oluşan zincir. Katılmada çift bağın biri açılır; zincirde serbest etilen çift bağı kalmaz, tekrar birimi –CH₂–CH₂– olur. Polimer = polietilen (PE).",
  alt: "Üst sırada n tane çift bağlı etilen, alt sırada 2n karbonlu tek bağlı zincir; uçlarda devam işaretleri.",
  param: { label: "Monomer (n)", min: 1, max: 5, step: 1, init: 3, unit: "" },
  draw: (nv) => {
    const n = Math.round(nv), els: El[] = [];
    for (let i = 0; i < n; i++) {
      const x = i * 1.5;
      els.push(seg(v(x, 1.55), v(x + 0.7, 1.55), { tone: "muted" }), seg(v(x, 1.4), v(x + 0.7, 1.4), { tone: "muted" }), ball(v(x, 1.48), 0.16, "ink"), ball(v(x + 0.7, 1.48), 0.16, "ink"));
    }
    els.push(txt(v(-0.4, 1.48), `${n} × CH₂=CH₂`, "w", { small: true, bold: true }));
    const C = 2 * n;
    els.push(seg(v(-0.5, 0), v((C - 1) * 0.75 + 0.5, 0), { tone: "b", bold: true }));
    for (let i = 0; i < C; i++) els.push(ball(v(i * 0.75, 0), 0.16, "ink"), ball(v(i * 0.75, 0.38), 0.08, "b"), ball(v(i * 0.75, -0.38), 0.08, "b"));
    els.push(txt(v(-0.65, 0), "…", "w", { small: true }), txt(v((C - 1) * 0.75 + 0.65, 0), "…", "e", { small: true }));
    for (let i = 0; i < n; i++) els.push(seg(v(i * 1.5 - 0.3, -0.6), v(i * 1.5 + 1.05, -0.6), { tone: "a", thin: true }));
    els.push(txt(v(0.45, -0.95), "tekrar birimi", "c", { small: true, tone: "a" }));
    els.push(txt(v(-2.6, 2.0), " ", "c"), txt(v(7.6, -1.2), " ", "c"));
    return { els, readout: [`${n} etilen → ${C} karbonlu zincir parçası; tekrar birimi ${n} kez.`, "AYT bağlantısı: 62 500 g/mol PVC zincirinde n = 62 500 ÷ 62,5 = 1000 (uçlar ihmal)."] };
  },
};

// 2 · PE, PP, PVC, PS, PTFE, PET.
const POLY = [
  { label: "PE", name: "polietilen", unit: "–CH₂–CH₂–", mono: "etilen", use: "film, ambalaj" },
  { label: "PP", name: "polipropilen", unit: "–CH₂–CH(CH₃)–", mono: "propilen", use: "kap, lif" },
  { label: "PVC", name: "polivinil klorür", unit: "–CH₂–CHCl–", mono: "vinil klorür", use: "boru, profil" },
  { label: "PS", name: "polistiren", unit: "aromatik yan grup", mono: "stiren", use: "köpük, rijit ambalaj" },
  { label: "PTFE", name: "politetrafloroeten", unit: "–CF₂–CF₂–", mono: "tetrafloroeten", use: "yapışmayı azaltan kaplama" },
  { label: "PET", name: "polietilen tereftalat", unit: "ester bağlı polyester", mono: "(yoğunlaşmalı)", use: "şişe, polyester lif" },
];
const polymers: FigureDef = {
  caption:
    "PE, PP, PVC ve PS aynı malzeme değildir; kısaltmayı tam ada, tekrar birimine ve tipik kullanıma aç. Bir kısaltmaya tıkla. 2019 TYT Fen 14 (resmî kitapçık, cevap A): düşük yapışmalı mutfak kaplaması PTFE ile eşleşir; PET ile PTFE harf benzerliğine rağmen farklıdır. Tipik kullanım her üründe aynı malzeme garantisi vermez.",
  alt: "Altı kısaltma düğmesi; seçilen polimerin tam adı, tekrar birimi, monomeri ve tipik kullanımı.",
  picks: POLY.map((p) => ({ label: p.label, title: `${p.label}: ${p.name}`, detail: [`Tekrar: ${p.unit}; monomer: ${p.mono}.`, `Tipik kullanım: ${p.use}.`] })),
  draw: (_v, _s, pick = -1) => {
    const p = POLY[pick >= 0 ? pick : 4], els: El[] = [];
    els.push(txt(v(0, 1.2), `${p.label} = ${p.name}`, "e", { bold: true, tone: "a" }));
    els.push(txt(v(0, 0.6), `tekrar birimi: ${p.unit}`, "e", { small: true }), txt(v(0, 0.15), `monomer: ${p.mono}`, "e", { small: true }), txt(v(0, -0.3), `tipik kullanım: ${p.use}`, "e", { small: true }));
    POLY.forEach((pp, i) => els.push(rect(i * 1.3, i * 1.3 + 1.1, -1.25, -0.8, pick === i ? "a" : "b", pick === i), txt(v(i * 1.3 + 0.55, -1.02), pp.label, "c", { small: true, bold: true, pick: i })));
    els.push(txt(v(-0.3, 1.6), " ", "c"), txt(v(7.9, -1.5), " ", "c"));
    return { els, readout: [`${p.label}: ${p.name}, ${p.use}.`, "Günlük “naylon poşet” adı malzemenin poliamid olduğunu kanıtlamaz; çoğu PE’dir."] };
  },
};

// 3 · Çözelti, süspansiyon, emülsiyon.
const DISP = [
  { label: "Çözelti", note: "Bileşen molekül/iyon ölçeğinde dağılır; tek faz.", kind: 0 },
  { label: "Süspansiyon", note: "Sıvıda ayrı katı tanecikler dağılmıştır (ör. oral süspansiyon ilaç).", kind: 1 },
  { label: "Emülsiyon", note: "Karışmayan bir sıvı diğerinde damlalar hâlinde (krem: suda yağ damlaları); emülgatör dağılımı destekler.", kind: 2 },
];
const dispersion: FigureDef = {
  caption:
    "Krem tekdüze görünebilir ama gerçek çözelti değildir. Bir dağılım türüne tıkla: aynı kap içinde tanecik ölçeği şematik çizilir. İkisi de sıvı görünen çözelti ve süspansiyon tanecik dağılımıyla ayrılır; emülsiyonda dağılan faz sıvı damlalardır.",
  alt: "Kare kap: çözeltide küçük noktalar, süspansiyonda katı parçacıklar, emülsiyonda yağ damlaları.",
  picks: DISP.map((d) => ({ label: d.label, title: d.label, detail: [d.note] })),
  draw: (_v, _s, pick = -1) => {
    const d = DISP[pick >= 0 ? pick : 2], els: El[] = [rect(0, 3.2, 0, 2.6, "muted", false)];
    const pts: [number, number][] = [[0.5, 2.1], [1.3, 1.8], [2.2, 2.2], [2.7, 1.4], [0.8, 1.1], [1.7, 0.9], [2.4, 0.5], [0.4, 0.4], [1.2, 0.3], [2.0, 1.5]];
    pts.forEach(([x, y], i) => {
      if (d.kind === 0) els.push(ball(v(x, y), 0.05, "b"));
      else if (d.kind === 1) els.push(poly([v(x - 0.12, y - 0.1), v(x + 0.14, y - 0.06), v(x + 0.1, y + 0.12), v(x - 0.1, y + 0.1)], { fill: "warn", tone: "warn", thin: true }));
      else if (i % 2 === 0) els.push(ball(v(x, y), 0.22, "warn"));
    });
    els.push(txt(v(1.6, -0.4), d.label, "c", { small: true, bold: true, tone: "a" }));
    DISP.forEach((dd, i) => els.push(txt(v(3.8, 2.0 - i * 0.6), dd.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 2.9), " ", "c"), txt(v(6.6, -0.7), " ", "c"));
    return { els, readout: [d.note, "Fiziksel hâl (sıvı/katı) dağılım türünü ya da ürün amacını tek başına vermez."] };
  },
};

// 4 · Etkin ve yardımcı madde: bir ürünün dört ayrı bilgisi.
const LEVELS = [
  { label: "Ambalaj", text: "PET şişe", note: "Şişenin PET olması içindeki kremi PET yapmaz." },
  { label: "Dağılım", text: "suda yağ emülsiyonu", note: "Yağ damlaları suda dağılmış; emülgatör destekler." },
  { label: "Bileşen görevi", text: "gliserol: nem tutucu · koruyucu: dayanım", note: "Bir bileşen birden çok rol üstlenebilir; görevi formüldeki işlevidir." },
  { label: "Kullanım amacı", text: "bakım (kozmetik)", note: "Etkin madde amaçlanan farmakolojik etkiyle, yardımcı madde biçim/kararlılıkla ilişkilidir; krem biçimi tek başına tedavi kanıtı değildir." },
];
const fourLevels: FigureDef = {
  caption:
    "Etkin ve yardımcı madde ayrımı, bir ürünü dört ayrı düzeyde okumayı ister (özgün örnek: PET şişedeki bakım kremi). Bir düzeye tıkla: o düzeyin bilgisi ve sınırı açılır. Tablette de etkin madde etkiyle, bağlayıcı fiziksel bütünlükle ilgilidir; yardımcı madde “her koşulda etkisiz” demek değildir.",
  alt: "Dört katmanlı pano: ambalaj, dağılım, bileşen görevi, kullanım amacı; seçili katman vurgulu.",
  picks: LEVELS.map((l) => ({ label: l.label, title: `${l.label}: ${l.text}`, detail: [l.note] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    LEVELS.forEach((l, i) => {
      const y = -i * 1.0, sel = pick === i;
      els.push(rect(0, 5.8, y - 0.42, y + 0.42, sel ? "a" : "b", sel), txt(v(0.15, y + 0.17), l.label, "e", { small: true, bold: true, pick: i }), txt(v(0.15, y - 0.2), l.text, "e", { small: true }));
    });
    els.push(txt(v(-0.3, 0.7), " ", "c"), txt(v(6.2, -3.6), " ", "c"));
    return { els, readout: [pick >= 0 ? LEVELS[pick].note : "Bir düzeye tıkla.", "Form (tablet, çözelti, krem) doz ya da etkin madde eşitliği vermez; gerçek ilaç talimatının yerine geçmez."] };
  },
};

export const chemistryFiguresPolymers: Record<string, Record<string, FigureDef>> = {
  "polimer-kozmetik-ilac": {
    "Etilendeki çift bağ zincirde ne olur?": chain,
    "PE, PP, PVC ve PS aynı malzeme değil": polymers,
    "Krem tekdüze görünebilir": dispersion,
    "Etkin ve yardımcı madde": fourLevels,
  },
};
