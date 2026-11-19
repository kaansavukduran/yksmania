import { ball, poly, seg, txt, v, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Lipitler. Fatty acid chains are zigzag carbon skeletons with shaded carbon
 * atoms; a C=C is a double line and, when cis, the chain bends there (trans
 * stays nearly straight). Triglyceride assembly shows glycerol's three OH
 * groups meeting three COOH groups, each ester bond releasing one water.
 * Phospholipids are a polar head with two tails; the bilayer has water on both
 * sides. The steroid skeleton is the fused 6-6-6-5 ring system. Schematic:
 * chain lengths are shortened and angles idealised.
 */

const BOND = 0.55;
/** Zigzag chain from p heading in direction ang (radians); returns carbon positions. */
function chain(p: V, ang: number, n: number, kinkAt = -1, kink = 0): V[] {
  const pts: V[] = [p];
  let a = ang;
  for (let i = 1; i < n; i++) {
    if (i === kinkAt + 1) a += kink;
    const zig = i % 2 === 0 ? 0.52 : -0.52;
    const last = pts[pts.length - 1];
    pts.push(v(last[0] + Math.cos(a + zig) * BOND, last[1] + Math.sin(a + zig) * BOND));
  }
  return pts;
}
function drawChain(pts: V[], tone: Tone, dbl = -1): El[] {
  const els: El[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    if (i === dbl) {
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const l = Math.hypot(dx, dy) || 1;
      const o = v((-dy / l) * 0.07, (dx / l) * 0.07);
      els.push(seg(v(a[0] + o[0], a[1] + o[1]), v(b[0] + o[0], b[1] + o[1]), { tone: "warn", bold: true }), seg(v(a[0] - o[0], a[1] - o[1]), v(b[0] - o[0], b[1] - o[1]), { tone: "warn", bold: true }));
    } else els.push(seg(a, b, { tone, bold: true }));
  }
  for (const p of pts) els.push(ball(p, 0.11, "muted"));
  return els;
}

/* ---------- 1. Trigliserit kurulumu ---------- */
const tag: FigureDef = {
  caption:
    "İleri ile trigliseriti kur: gliserolün üç –OH grubu, üç yağ asidinin –COOH ucuyla birleşir. Her birleşmede bir ester bağı kurulur ve bir su (H₂O) çıkar: 1 gliserol + 3 yağ asidi → 1 trigliserit + 3 H₂O. Son adım tersidir: hidroliz suyu tüketir.",
  alt: "Solda dikey üç karbonlu gliserol ve üç OH grubu; sağda üç zikzak yağ asidi zinciri ve COOH uçları. Adımlarda aralarına ester bağı çiziliyor ve her birinden bir su molekülü ayrılıyor.",
  steps: ["Bileşenler", "1. ester bağı", "3 ester bağı", "Hidroliz"],
  draw: (_v, step) => {
    const els: El[] = [];
    const ys = [1.6, 0, -1.6];
    const bonded = (i: number) => (step === 3 ? false : step >= 2 || (step === 1 && i === 0));
    // Glycerol backbone.
    for (let i = 0; i < 3; i++) {
      els.push(ball(v(-2.6, ys[i]), 0.22, "muted", "C"));
      if (i < 2) els.push(seg(v(-2.6, ys[i] - 0.22), v(-2.6, ys[i + 1] + 0.22), { tone: "ink", bold: true }));
    }
    els.push(txt(v(-3.0, 2.3), "gliserol", "w", { tone: "ink", small: true, bold: true }));
    ys.forEach((y, i) => {
      const b = bonded(i);
      const gap = b ? 0 : 0.9;
      els.push(ball(v(-1.9, y), 0.17, "warn", "O"));
      els.push(seg(v(-2.38, y), v(-2.07, y), { tone: "ink" }));
      if (!b) els.push(txt(v(-1.65, y + 0.3), "H", "c", { tone: "ink", small: true }));
      // Carboxyl carbon with =O and the chain.
      const cx = -1.2 + gap;
      els.push(ball(v(cx, y), 0.17, "muted", "C"), seg(v(cx, y + 0.17), v(cx, y + 0.55), { tone: "ink" }), seg(v(cx + 0.07, y + 0.17), v(cx + 0.07, y + 0.55), { tone: "ink" }), ball(v(cx + 0.03, y + 0.7), 0.15, "warn", "O"));
      if (!b) els.push(ball(v(cx - 0.45, y - 0.25), 0.14, "warn", "O"), txt(v(cx - 0.75, y - 0.45), "H", "c", { tone: "ink", small: true }));
      if (b) els.push(seg(v(-1.73, y), v(cx - 0.17, y), { tone: "c", bold: true }), txt(v(-1.55, y - 0.32), "ester", "c", { tone: "c", small: true, bold: true }));
      els.push(...drawChain(chain(v(cx + 0.17, y), 0, 9), "a"));
      if (b && step < 3) els.push(txt(v(3.9, y), "→ H₂O", "e", { tone: "b", small: true, bold: true }));
      if (step === 3) els.push(txt(v(3.9, y), "+ H₂O harcanır", "e", { tone: "b", small: true, bold: true }));
    });
    els.push(txt(v(-4.6, 2.8), " ", "c"), txt(v(5.6, -2.4), " ", "c"));
    const rows: [string, string][] = [
      ["Gliserol: üç karbonlu, üç –OH taşıyan alkol. Yağ asidi: bir ucunda –COOH, devamında karbon–hidrojen zinciri.", "Lipitler tek tip monomerin tekrarından oluşan polimerler değildir."],
      ["Bir –OH ile bir –COOH birleşir: bir ester bağı, bir su.", "Su, –OH'nin H'si ile –COOH'nin OH'sinden oluşur."],
      ["Üç yağ asidi → üç ester bağı → üç su. n trigliserit için: n gliserol, 3n yağ asidi, 3n su.", "“Bir trigliserit = bir su” en sık hatadır (2021 TYT Fen 16)."],
      ["Hidroliz: 1 trigliserit + 3 H₂O → 1 gliserol + 3 yağ asidi. Su üretilmez, tüketilir.", "Lipaz ester bağını koparır; safra yağı damlacıklara ayırır ama bağ koparmaz."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 2. Doymuş, cis, trans ---------- */
const sat: FigureDef = {
  caption:
    "İleri ile üç yağ asidi zincirini karşılaştır. Doymuş zincirde karbonlar arasında çift bağ yoktur, zincir düz uzanır. Doymamış zincirde en az bir C=C (turuncu çift çizgi) vardır; cis çift bağda zincir kırılır, trans çift bağda düze yakın kalır. Uçtaki C=O karboksil grubundadır, doymamışlık ölçütü değildir.",
  alt: "Üç zikzak karbon zinciri: üstte düz doymuş zincir, ortada bir çift bağdan sonra aşağı kırılan cis zincir, altta çift bağa rağmen düz devam eden trans zincir. Her zincirin solunda COOH ucu.",
  steps: ["Doymuş", "Cis doymamış", "Trans doymamış", "Paketlenme"],
  draw: (_v, step) => {
    const els: El[] = [];
    const rows3: { y: number; kink: number; dbl: number; label: string; i: number }[] = [
      { y: 2.6, kink: 0, dbl: -1, label: "doymuş", i: 0 },
      { y: -1.4, kink: -0.6, dbl: 4, label: "cis", i: 1 },
      { y: 0.6, kink: 0, dbl: 4, label: "trans", i: 2 },
    ];
    for (const r of rows3) {
      const on = step === r.i || step === 3;
      const pts = chain(v(-2.6, r.y), 0, 13, r.dbl, r.kink);
      els.push(...drawChain(pts, on ? "a" : "muted", r.dbl));
      els.push(txt(v(-2.8, r.y), "HOOC", "w", { tone: on ? "warn" : "muted", small: true, bold: true }));
      els.push(txt(v(-4.6, r.y + 0.55), r.label, "e", { tone: on ? "ink" : "muted", small: true, bold: on }));
    }
    els.push(txt(v(-5, 3.4), " ", "c"), txt(v(5, -4.6), " ", "c"));
    const rows: [string, string][] = [
      ["Doymuş: karbon zincirinde yalnız tekli C–C bağları. Zincir düz, sıkı paketlenir.", "Karboksil ucundaki C=O, karbon–oksijen bağıdır; doymamışlık kanıtı değildir."],
      ["Cis C=C: iki hidrojen aynı tarafta, zincir çift bağda kırılır.", "Kırık zincirler sıkı dizilemez: çoğu bitkisel yağın oda sıcaklığında sıvı olmasının bir nedeni."],
      ["Trans C=C: çift bağ hâlâ var (doymamış) ama zincir düze yakın.", "Trans, “çift bağ kalmadı” demek değildir; kısmi hidrojenasyonda oluşabilir."],
      ["Düz zincirler (doymuş, trans) sıkı dizilir; kırık zincirler (cis) aralık bırakır.", "Katı/sıvı hâl zincir uzunluğuna ve karışıma da bağlıdır: palm ve hindistan cevizi yağı bitkisel ama doymuşça zengindir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 3. Fosfolipit ve çift katman ---------- */
function phospholipid(c: V, up: boolean, tone: Tone = "b"): El[] {
  const s = up ? 1 : -1;
  const els: El[] = [];
  for (const dx of [-0.13, 0.13]) {
    const pts: V[] = [];
    for (let i = 0; i <= 6; i++) pts.push(v(c[0] + dx + (i % 2 ? 0.06 : -0.06) * (dx > 0 ? 1 : -1), c[1] - s * (0.3 + i * 0.22)));
    els.push(poly(pts, { tone: "a", open: true, bold: true, smooth: true }));
  }
  els.push(ball(c, 0.26, tone));
  return els;
}
const bilayer: FigureDef = {
  caption:
    "İleri ile fosfolipitten zara geç. Fosfolipitin suyu seven (hidrofilik) fosfatlı başı ve suyu sevmeyen (hidrofobik) iki yağ asidi kuyruğu vardır. Zarın iki yanı da sulu olduğundan başlar iki yüze, kuyruklar ortada birbirine bakar: çift katman.",
  alt: "Önce tek fosfolipit: yuvarlak mavi baş ve iki dalgalı kuyruk. Sonra iki sıra fosfolipitten çift katman: üst sıranın başları yukarıdaki suya, alt sıranın başları aşağıdaki suya bakıyor, kuyruklar ortada.",
  steps: ["Tek fosfolipit", "Çift katman", "İki sulu yüz"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) {
      els.push(...phospholipid(v(0, 1.2), true));
      els.push(txt(v(0.4, 1.3), "baş: fosfat + gliserol (hidrofilik)", "e", { tone: "b", small: true, bold: true }), txt(v(0.4, 0.1), "2 yağ asidi kuyruğu (hidrofobik)", "e", { tone: "a", small: true, bold: true }));
      els.push(txt(v(-1.6, 2), " ", "c"), txt(v(6, -0.6), " ", "c"));
    } else {
      for (let i = 0; i < 10; i++) {
        const x = -4.5 + i;
        els.push(...phospholipid(v(x, 1.7), true), ...phospholipid(v(x, -1.7), false));
      }
      if (step === 2) {
        els.push(poly([v(-5.2, 2.05), v(5, 2.05), v(5, 3.0), v(-5.2, 3.0)], { tone: "b", fill: "b", bare: true }), txt(v(0, 2.55), "hücre dışı sulu ortam", "c", { tone: "b", small: true, bold: true }));
        els.push(poly([v(-5.2, -2.05), v(5, -2.05), v(5, -3.0), v(-5.2, -3.0)], { tone: "b", fill: "b", bare: true }), txt(v(0, -2.55), "sitoplazma (sulu)", "c", { tone: "b", small: true, bold: true }));
        els.push(txt(v(5.3, 0), "yağlı iç bölge", "e", { tone: "a", small: true, bold: true }));
      }
      els.push(txt(v(-5.4, 3.2), " ", "c"), txt(v(7.4, -3.2), " ", "c"));
    }
    const rows: [string, string][] = [
      ["Amfipatik: bir bölgesi suyla etkileşir (baş), bir bölgesi etkileşmez (kuyruk).", "Trigliseritte üç kuyruk vardır; tipik fosfolipitte iki kuyruk ve fosfatlı baş."],
      ["Fosfolipitler iki sıra hâlinde dizilir: kuyruklar birbirine dönük ortada.", "Çizim ölçekli değildir; zar proteinleri ve kolesterol gösterilmedi."],
      ["Hücrenin hem dışı hem içi sulu: başlar iki yüze yönelir.", "Başları yalnız dışa çevirmek iç sulu yüzeyi açıklayamaz."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 4. Steroit iskeleti ---------- */
function ring(c: V, n: number, r: number, rot: number): V[] {
  return Array.from({ length: n }, (_, i) => v(c[0] + Math.cos(rot + (i * 2 * Math.PI) / n) * r, c[1] + Math.sin(rot + (i * 2 * Math.PI) / n) * r));
}
const steroid: FigureDef = {
  caption:
    "İleri ile steroit iskeletini trigliseritle karşılaştır. Steroitler birbirine kaynaşmış dört halkalı temel iskeletle tanınır (üç altıgen + bir beşgen); gliserol ve üç yağ asidinden oluşmaz. Kolesterol bu iskeleti taşır; zar yapısına, steroid hormonlara, safra asitlerine ve D vitamini üretimine katılır.",
  alt: "Solda üç altıgen ve bir beşgenden oluşan kaynaşmış halka sistemi; üzerinde OH grubu ve yan zincir. Sağda karşılaştırma için gliserole bağlı üç kuyruklu trigliserit şeması.",
  steps: ["Dört halka", "Kolesterol", "Trigliseritle karşılaştır"],
  draw: (_v, step) => {
    const els: El[] = [];
    const r = 0.7;
    const h = r * Math.sqrt(3);
    // Fused rings: share edges by placing centres along the hex grid.
    const cA = v(-3.2, -0.4);
    const cB = v(cA[0] + h, cA[1]);
    const cC = v(cB[0] + h / 2, cB[1] + 1.5 * r);
    const cD = v(cC[0] + h * 0.92, cC[1] - 0.15);
    const rings: { pts: V[]; label: string }[] = [
      { pts: ring(cA, 6, r, Math.PI / 6), label: "A" },
      { pts: ring(cB, 6, r, Math.PI / 6), label: "B" },
      { pts: ring(cC, 6, r, Math.PI / 6), label: "C" },
      { pts: ring(cD, 5, r * 0.86, Math.PI), label: "D" },
    ];
    for (const rg of rings) els.push(poly(rg.pts, { tone: "c", fill: "c", bold: true }));
    if (step === 0) [cA, cB, cC, cD].forEach((c, i) => els.push(txt(c, rings[i].label, "c", { tone: "c", bold: true })));
    if (step >= 1) {
      els.push(seg(rings[0].pts[3], v(rings[0].pts[3][0] - 0.6, rings[0].pts[3][1] - 0.2), { tone: "ink", bold: true }), txt(v(rings[0].pts[3][0] - 0.65, rings[0].pts[3][1] - 0.2), "HO", "w", { tone: "warn", bold: true }));
      const tail = chain(v(cD[0] + r * 0.86, cD[1]), 0.35, 7);
      els.push(...drawChain(tail, "a"));
      els.push(txt(v(cD[0] + 0.3, cD[1] + 1.4), "yan zincir", "e", { tone: "a", small: true }));
    }
    if (step === 2) {
      const g = v(3.6, -1.6);
      for (let i = 0; i < 3; i++) {
        const y = g[1] + i * 0.7;
        els.push(ball(v(g[0], y), 0.18, "muted"), seg(v(g[0] + 0.18, y), v(g[0] + 2.2, y), { tone: "a", bold: true }));
      }
      els.push(seg(v(g[0], g[1]), v(g[0], g[1] + 1.4), { tone: "ink", bold: true }), txt(v(g[0] + 1.1, g[1] - 0.45), "trigliserit: gliserol + 3 yağ asidi", "s", { tone: "ink", small: true }));
    }
    els.push(txt(v(-4.8, 2.6), " ", "c"), txt(v(6.4, -2.4), " ", "c"));
    const rows: [string, string][] = [
      ["Steroit: A, B, C (altıgen) ve D (beşgen) halkalarının kaynaşmış iskeleti.", "Yapısında yağ asidi zinciri ya da ester bağıyla bağlı gliserol yoktur."],
      ["Kolesterol: dört halka + –OH grubu + karbon yan zinciri.", "Zarda akışkanlığı düzenler; steroid hormonların, safra asitlerinin ve D vitamininin öncülüdür. A vitamini (retinol) steroit değildir."],
      ["Trigliserit üç yağ asidinin gliserole ester bağlarıyla bağlanmasıdır; steroit ise halka iskeletidir.", "İkisi de lipittir: “lipit” tek bir molekül adı değil, suda az çözünen bir grup adıdır."],
    ];
    return { els, readout: rows[step] };
  },
};

export const biologyFiguresLipids: Record<string, Record<string, FigureDef>> = {
  lipitler: {
    "Bir trigliseritin parçalarını birleştir": tag,
    "Yağ asidi zincirindeki bağa bak": sat,
    "Fosfolipitte iki farklı uç": bilayer,
    "Steroidin iskeleti trigliseritten farklıdır": steroid,
  },
};

