import { circle, fmt, lerp, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Chemistry figures: Rutherford scattering, Bohr transitions, electron
 * transfer in NaCl and the metallic electron sea. Every drawing is a
 * schematic model; sizes, distances and counts are not to scale. Moving
 * electrons follow fixed formulas, so the same slider value always shows
 * the same picture.
 */

const TAU = Math.PI * 2;
const dot = (p: V, tone: Tone = "b"): El => circle(p, 0.09, { tone, fill: tone });
const plus = (c: V, r: number, tone: Tone = "a"): El[] => [
  circle(c, r, { tone, fill: tone, bold: true }),
  txt(c, "+", "c", { tone, bold: true }),
];
/** Wavy photon arrow from a to b. */
function photon(a: V, b: V, tone: Tone = "warn"): El[] {
  const n = 60;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const L = Math.hypot(dx, dy) || 1;
  const ux = dx / L;
  const uy = dy / L;
  const pts: V[] = [];
  for (let i = 0; i <= n; i++) {
    const s = (i / n) * (L - 0.3);
    const w = 0.16 * Math.sin((s / 0.45) * TAU);
    pts.push(v(a[0] + ux * s - uy * w, a[1] + uy * s + ux * w));
  }
  return [poly(pts, { open: true, tone }), vec(pts[n], b, { tone })];
}

/* ---------------- Rutherford ---------------- */
type Path = { y: number; kind: "straight" | "deflect" | "back"; nucleus?: V; out?: V };
const FOIL_X = 6;
const nuclei: V[] = [v(6, 3.1), v(6, 1.5), v(6, -0.1), v(6, -1.7)];
const rays: Path[] = [
  { y: 3.9, kind: "straight" },
  { y: 3.3, kind: "deflect", nucleus: nuclei[0], out: v(10.5, 5.6) },
  { y: 2.4, kind: "straight" },
  { y: 1.5, kind: "back", nucleus: nuclei[1], out: v(1.5, 2.6) },
  { y: 0.7, kind: "straight" },
  { y: -0.4, kind: "deflect", nucleus: nuclei[2], out: v(10.5, -2.6) },
  { y: -1, kind: "straight" },
  { y: -2.3, kind: "straight" },
];
const rutherford: FigureDef = {
  caption:
    "Oynat ile alfa taneciklerini altın levhaya gönder. Çoğu sapmadan geçer (atomun büyük kısmı boşluklu), çekirdeğe çok yaklaşan birkaçı büyük açıyla sapar, biri geri döner (pozitif yük ve kütle küçük bir merkezde).",
  alt: "Soldan sağa giden sekiz alfa izi; ortada dikey altın levha ve levhadaki atomların küçük pozitif çekirdekleri. Altı iz düz geçer, ikisi büyük açıyla sapar, biri geri döner.",
  param: { label: "Zaman", min: 0, max: 1, step: 0.01, init: 1, once: true, playMs: 5000 },
  draw: (t) => {
    const els: El[] = [];
    // Foil: atoms drawn as faint dashed circles with a tiny nucleus.
    els.push(poly([v(FOIL_X - 0.25, -3), v(FOIL_X + 0.25, -3), v(FOIL_X + 0.25, 4.6), v(FOIL_X - 0.25, 4.6)], { tone: "c", fill: "c", thin: true }));
    for (const n of nuclei) els.push(circle(n, 0.75, { tone: "muted", dash: true, thin: true }), circle(n, 0.12, { tone: "a", fill: "a" }));
    els.push(txt(v(FOIL_X, 4.85), "altın levha", "n", { tone: "c", small: true }));
    els.push(txt(v(0, 4.85), "alfa (α⁺) kaynağı", "ne", { tone: "b", small: true }));
    let straight = 0;
    let deflected = 0;
    let back = 0;
    for (const r of rays) {
      const start = v(0, r.y);
      // Path: approach to foil (or nucleus), then exit.
      const hit = r.kind === "straight" ? v(FOIL_X, r.y) : v(FOIL_X - (r.kind === "back" ? 0.3 : 0.15), r.y);
      const end = r.kind === "straight" ? v(11, r.y) : (r.out as V);
      const p1 = Math.min(1, t * 2);
      const p2 = Math.max(0, Math.min(1, t * 2 - 1));
      const head = p2 === 0 ? lerp(start, hit, p1) : lerp(hit, end, p2);
      els.push(seg(start, p2 === 0 ? head : hit, { tone: "b", thin: true }));
      if (p2 > 0) els.push(seg(hit, head, { tone: r.kind === "straight" ? "b" : "warn", thin: r.kind === "straight", bold: r.kind !== "straight" }));
      els.push(dot(head, r.kind === "straight" ? "b" : "warn"));
      if (p2 >= 1) {
        if (r.kind === "straight") straight++;
        else if (r.kind === "back") back++;
        else deflected++;
      }
    }
    return {
      els,
      readout: [
        `Geçen: ${straight} · büyük sapan: ${deflected} · geri dönen: ${back}`,
        "Gözlem: çoğu geçti, azı saptı. Çıkarım: atom büyük ölçüde boşluklu, pozitif yük ve kütle küçük bir çekirdekte.",
      ],
    };
  },
};

/* ---------------- Bohr ---------------- */
const radii = [1.1, 2, 2.9, 3.8];
const bohrSteps = [
  { label: "Temel hal (n = 1)", n: 1 },
  { label: "Foton soğurur → n = 3 (uyarılma)", n: 3 },
  { label: "n = 3 → n = 2: foton yayar", n: 2 },
  { label: "n = 2 → n = 1: daha enerjili foton", n: 1 },
  { label: "İyonlaşma: elektron atomdan kopar", n: 5 },
];
const bohr: FigureDef = {
  caption:
    "İleri ile elektronun düzeyler arası geçişini izle: yukarı geçiş için tam düzey farkı kadar enerji soğurulur; aşağı geçişte bu fark kadar enerjili foton yayılır. Düzey farkı büyüdükçe foton enerjisi artar, dalga boyu kısalır.",
  alt: "Ortada çekirdek, çevresinde n = 1'den 4'e eş merkezli düzey halkaları; elektron noktası adımlara göre halkalar arasında yer değiştirir; dalgalı oklar soğurulan veya yayılan fotonu gösterir.",
  steps: bohrSteps.map((s) => s.label),
  draw: (_v, step) => {
    const els: El[] = [...plus(v(0, 0), 0.45)];
    radii.forEach((r, i) => {
      els.push(circle(v(0, 0), r, { tone: "muted", thin: true, dash: i > 0 }));
      // Each ring's name sits at its own angle so neighbouring names never touch.
      const a = 0.12 + i * 0.3;
      els.push(txt(v(r * Math.cos(a), r * Math.sin(a)), `n=${i + 1}`, "ne", { tone: "muted", small: true }));
    });
    const at = (n: number): V => (n <= 4 ? v(-radii[n - 1] * Math.cos(0.6), -radii[n - 1] * Math.sin(0.6)) : v(-6, -3.4));
    const cur = bohrSteps[step].n;
    const prev = step > 0 ? bohrSteps[step - 1].n : cur;
    if (step > 0 && prev !== cur) els.push(vec(at(prev), at(cur), { tone: "b", dash: true }));
    els.push(circle(at(cur), 0.2, { tone: "b", fill: "b", bold: true }), txt(v(at(cur)[0] - 0.22, at(cur)[1] - 0.22), "e⁻", "sw", { tone: "b", small: true }));
    let readout: string[] = ["Elektron en düşük uygun enerji düzeyinde."];
    if (step === 1) {
      els.push(...photon(v(-6.5, 1.5), v(-2.9, -1.5), "c"), txt(v(-6.5, 1.7), "soğurulan foton", "n", { tone: "c", small: true }));
      readout = ["Soğurulan enerji = E₃ − E₁. Daha az ya da fazla enerji bu geçişi yaptırmaz.", "Elektron hâlâ atoma bağlı: uyarılmış hal."];
    } else if (step === 2) {
      els.push(...photon(at(2), v(4.6, -3.6), "warn"), txt(v(4.6, -3.8), "yayılan foton (E₃ − E₂)", "s", { tone: "warn", small: true }));
      readout = ["Yayılan fotonun enerjisi iki düzeyin farkına eşittir: E = E₃ − E₂ = hf."];
    } else if (step === 3) {
      els.push(...photon(at(1), v(4.6, -3.6), "warn"), txt(v(4.6, -3.8), "yayılan foton (E₂ − E₁)", "s", { tone: "warn", small: true }));
      readout = ["E₂ − E₁ > E₃ − E₂: bu fotonun frekansı daha büyük, dalga boyu daha kısa."];
    } else if (step === 4) {
      readout = ["İyonlaşmada elektron atomdan ayrılır; uyarılmada ise atomda kalır.", "Uyarılma proton ve elektron sayısını değiştirmez."];
    }
    return { els, readout };
  },
};

/* ---------------- NaCl elektron aktarımı ---------------- */
function shells(c: V, rs: number[], counts: number[], tone: Tone, skipLast = 0): El[] {
  const els: El[] = [];
  rs.forEach((r, i) => {
    els.push(circle(c, r, { tone: "muted", thin: true }));
    const n = counts[i] - (i === rs.length - 1 ? skipLast : 0);
    for (let k = 0; k < n; k++) {
      const a = (k / counts[i]) * TAU + 0.3;
      els.push(dot(v(c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)), tone));
    }
  });
  return els;
}
const ionic: FigureDef = {
  caption:
    "Oynat ile Na'nın tek değerlik elektronunu Cl'ye taşı: Na⁺ (11 p, 10 e⁻) ve Cl⁻ (17 p, 18 e⁻) oluşur. Bağ, aktarımın kendisi değil; oluşan zıt yüklü iyonlar arasındaki elektrostatik çekimdir.",
  alt: "Solda katmanlarında 2-8-1 elektron bulunan Na atomu, sağda 2-8-7 elektronlu Cl atomu. Bir elektron Na'nın dış katmanından Cl'nin dış katmanına kayar; ardından Na⁺ ve Cl⁻ arasında çekim okları belirir.",
  param: { label: "Aktarım", min: 0, max: 1, step: 0.02, init: 0, once: true, playMs: 4000 },
  draw: (t) => {
    const na = v(-3.4, 0);
    const cl = v(3.6, 0);
    const naR = [0.6, 1.1, 1.75];
    const clR = [0.6, 1.1, 1.6];
    const moved = Math.min(1, t / 0.7);
    const els: El[] = [
      ...plus(na, 0.38),
      ...plus(cl, 0.38),
      ...shells(na, naR, [2, 8, 1], "b", 1),
      ...shells(cl, clR, [2, 8, 8], "b", 1),
    ];
    // The travelling electron: from Na's outer shell to Cl's free slot.
    const from = v(na[0] + 1.75 * Math.cos(0.3), na[1] + 1.75 * Math.sin(0.3));
    const to = v(cl[0] + 1.6 * Math.cos((7 / 8) * TAU + 0.3), cl[1] + 1.6 * Math.sin((7 / 8) * TAU + 0.3));
    const mid: V = v(0, 1.6);
    const q = moved;
    const p = v((1 - q) ** 2 * from[0] + 2 * (1 - q) * q * mid[0] + q * q * to[0], (1 - q) ** 2 * from[1] + 2 * (1 - q) * q * mid[1] + q * q * to[1]);
    els.push(circle(p, 0.14, { tone: "warn", fill: "warn", bold: true }));
    if (moved < 1) els.push(vec(lerp(from, mid, 0.2), lerp(mid, to, 0.8), { tone: "warn", dash: true, thin: true }));
    const done = t >= 0.7;
    els.push(txt(v(na[0], -2.35), done ? "Na⁺: 11 p, 10 e⁻" : "Na: 11 p, 11 e⁻", "s", { tone: "a", small: true, bold: true }));
    els.push(txt(v(cl[0], -2.35), done ? "Cl⁻: 17 p, 18 e⁻" : "Cl: 17 p, 17 e⁻", "s", { tone: "a", small: true, bold: true }));
    if (t >= 0.85) {
      els.push(vec(v(-1, -0.2), v(-0.2, -0.2), { tone: "c", bold: true }), vec(v(1.2, -0.2), v(0.4, -0.2), { tone: "c", bold: true }));
      els.push(txt(v(0.1, -0.75), "çekim", "s", { tone: "c", small: true }));
    }
    return {
      els,
      readout: done
        ? ["Proton sayıları değişmedi; yalnız bir elektron yer değiştirdi.", "İyonik bağ = Na⁺ ile Cl⁻ arasındaki elektrostatik çekim (kristalde her iyon birçok komşuyu çeker)."]
        : ["Na dış katmanında 1, Cl dış katmanında 7 elektron var.", "Aktarım yüklerin kaynağını açıklar; bağ henüz çekimle kurulmadı."],
    };
  },
};

/* ---------------- Metalik bağ ---------------- */
const grid: V[] = [];
for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) grid.push(v(c * 1.6, r * 1.6));
/** Deterministic electron positions for time s: electrons travel along the
 * corridors between rows of metal centres, so no dot hides a centre. */
function electrons(s: number, drift = 0): V[] {
  const lanes = [-0.8, 0.8, 2.4, 4];
  return Array.from({ length: 20 }, (_, i) => {
    const lane = lanes[i % lanes.length];
    const dir = i % 3 === 0 ? -1 : 1;
    const speed = 0.5 + ((i * 0.37) % 1) * 0.8;
    const x0 = ((i * 0.61) % 1) * 9.6;
    const x = x0 + dir * speed * s * 1.6 + drift;
    const wrapped = ((((x + 0.8) % 9.6) + 9.6) % 9.6) - 0.8;
    return v(wrapped, lane + 0.18 * Math.sin(TAU * (s * 0.7 + i * 0.29)));
  });
}
const sea: FigureDef = {
  caption:
    "Oynat ile elektron denizini izle: pozitif metal merkezleri (çekirdek + iç elektronlar) yerinde titreşir, değerlik elektronları bütün örgüye yayılmış hâlde dolaşır. Bağ, merkezlerle bu yayılmış elektronlar arasındaki çekimdir; iki atom arasında tek bir bağ çizgisi yoktur.",
  alt: "Üç sıra altı pozitif metal merkezi; aralarında rastgele dolaşan mavi elektron noktaları.",
  param: { label: "Zaman", min: 0, max: 3, step: 0.02, init: 0, once: true, playMs: 9000 },
  draw: (s) => {
    const els: El[] = [];
    for (const g of grid) els.push(...plus(v(g[0] + 0.05 * Math.sin(TAU * s * 1.3 + g[0]), g[1]), 0.42));
    for (const e of electrons(s)) els.push(dot(e, "b"));
    return {
      els,
      readout: ["Artılar serbest iyon çözeltisi değildir; noktalar ölçülmüş elektron yörüngesi de değildir.", "Parçanın bütünü yüksüzdür."],
    };
  },
};

const current: FigureDef = {
  caption: "İleri ile elektrik alanı aç: elektronlar rastgele hareketlerine ek olarak alana zıt yönde yavaşça sürüklenir, akım oluşur. Metal merkezleri telin bir ucundan öbürüne göç etmez.",
  alt: "Pil uçlarına bağlı metal örgü; alan açılınca elektron noktalarının hepsi aynı yöne kaymış hâlde ve yön oku görünür.",
  steps: ["Alan yok: net akım yok", "Alan var: elektronlar sürüklenir"],
  draw: (_v, step) => {
    const els: El[] = [];
    for (const g of grid) els.push(...plus(g, 0.42));
    const shift = step === 1 ? 0.9 : 0;
    for (const e of electrons(0.37, shift)) els.push(dot(e, "b"));
    els.push(txt(v(-1.2, 1.6), "−", "c", { tone: "warn", bold: true }), txt(v(9.2, 1.6), "+", "c", { tone: "c", bold: true }));
    els.push(seg(v(-0.9, -1.1), v(8.9, -1.1), { tone: "muted", thin: true }));
    if (step === 1) {
      els.push(vec(v(1, 4.1), v(7, 4.1), { tone: "b", bold: true }), txt(v(4, 4.3), "elektronların sürüklenme yönü (− → +)", "n", { tone: "b", small: true }));
    }
    return {
      els,
      readout:
        step === 1
          ? ["Akımı katı metalde hareketli elektronlar taşır; erimiş NaCl'de ise iyonlar taşır.", "“İletiyor, öyleyse metal” çıkarımı geçersizdir (grafit de iletir)."]
          : ["Elektronlar her yöne dolaşır; ortalamada net yön yoktur."],
    };
  },
};

const slide: FigureDef = {
  caption: "Sürgüyle üst katmanı kaydır: elektron denizi yeni düzene uyar, merkezleri tutan çekim kopmaz. Tel ve levha hâline getirilebilme böyle açıklanır.",
  alt: "İki sıra pozitif metal merkezi; sürgü arttıkça üst sıra sağa kayar, elektron noktaları iki sıranın arasında kalmaya devam eder.",
  param: { label: "Kayma", min: 0, max: 1.6, step: 0.1, init: 0, unit: " birim" },
  draw: (dx) => {
    const els: El[] = [];
    for (let c = 0; c < 6; c++) {
      els.push(...plus(v(c * 1.6, 0), 0.42));
      els.push(...plus(v(c * 1.6 + dx, 1.6), 0.42));
    }
    for (let i = 0; i < 14; i++) {
      // Free electrons move in the gap between the two ion layers, never on an ion.
      const x = (i % 7) * 1.3 - 0.1 + (i < 7 ? 0 : 0.65) + dx * (i % 2 ? 0.5 : 0.2);
      const y = i < 7 ? 0.64 : 0.98;
      els.push(dot(v(x, y), "b"));
    }
    els.push(vec(v(-0.6, 2.6), v(-0.6 + Math.max(0.3, dx + 0.3), 2.6), { tone: "warn", dash: true }));
    return {
      els,
      readout: [`Üst katman ${fmt(dx)} birim kaydı; bağlanma sürüyor.`, "İyonik kristalde aynı kayma, aynı yüklü iyonları karşı karşıya getirip itme yaratır; bu yüzden tuz kırılgandır."],
    };
  },
};

export const chemistryFiguresAtoms: Record<string, Record<string, FigureDef>> = {
  "atom-modelleri": {
    "Rutherford: çoğu geçer, azı güçlü sapar": rutherford,
    "Bohr: yalnız belirli enerji düzeyleri": bohr,
  },
  "iyonik-bag-ve-guclu-etkilesimler": {
    "Elektron alışverişi iyonu oluşturur; bağ çekimdir": ionic,
  },
  "kovalent-adlandirma-metalik-bag": {
    "Elektron denizi modeli neyi temsil eder?": sea,
    "Akım, parlaklık ve ısı aktarımı": current,
    "Levha bükülürken bağlanma neden sürer?": slide,
  },
};
