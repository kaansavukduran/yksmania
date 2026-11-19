import { ball, circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Kimya disiplinleri. A flame test (qualitative analysis: which element?)
 * next to a measured sample (quantitative: how many mg?), carbon compounds
 * sorted into organic and the traditional inorganic exceptions, a polymer
 * chain grown from repeating units, and a capacity–quality plot where only
 * production settings inside both limits compete on cost. Flame colours are
 * the usual textbook ones; plots use the guide's own numbers.
 */

/* ---------- 1. Nitel ve nicel analiz ---------- */
const FLAMES: { el: string; colour: string; tone: Tone }[] = [
  { el: "Na", colour: "sarı", tone: "a" },
  { el: "Cu", colour: "yeşil", tone: "c" },
  { el: "Li", colour: "kırmızı", tone: "warn" },
];
const flame = (x: number, tone: Tone): El[] => {
  const ps: V[] = [];
  for (let i = 0; i <= 24; i++) {
    const t = (i / 24) * Math.PI * 2;
    const r = 0.45 * (1 - 0.55 * Math.max(0, Math.sin(t)));
    ps.push(v(x + r * Math.cos(t) * (1 - 0.4 * Math.max(0, Math.sin(t))), 1.55 + 1.1 * Math.sin(t) * (Math.sin(t) > 0 ? 1.4 : 0.6)));
  }
  return [poly(ps, { tone, fill: tone, smooth: true })];
};
const analysis: FigureDef = {
  caption:
    "İleri ile iki analiz sorusunu ayır. Nitel analiz \"ne var?\" sorusudur: alev rengi elementi tanıtır (sodyum sarı, bakır yeşil, lityum kırmızı). Isıtma burada yalnız araçtır, amaç tür tanımaktır. Nicel analiz \"ne kadar var?\" sorusudur: 20 mL su numunesinde kaç mg demir bulunduğu ölçülür. İkisi de analitik kimyadır.",
  alt: "Üç bek alevi ve alevlere tutulan tel halkalar; alevler sarı, yeşil ve kırmızı. Son adımda 20 mL'lik dereceli silindir ve yanında mg cinsinden sonuç kartı.",
  steps: ["Nitel: alev rengi", "Nicel: kaç mg?"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) FLAMES.forEach((f, i) => {
      const x = i * 2.2;
      const on = true;
      els.push(poly([v(x - 0.25, 0), v(x + 0.25, 0), v(x + 0.25, 1.0), v(x - 0.25, 1.0)], { tone: on ? "ink" : "muted", thin: !on }));
      els.push(poly([v(x - 0.6, -0.15), v(x + 0.6, -0.15), v(x + 0.6, 0), v(x - 0.6, 0)], { tone: on ? "ink" : "muted", thin: !on }));
      if (on) els.push(...flame(x, f.tone), seg(v(x + 0.9, 2.95), v(x + 0.15, 2.3), { tone: "ink" }), circle(v(x + 0.1, 2.25), 0.08, { tone: "ink" }));
      els.push(txt(v(x, -0.3), on ? `${f.el}: ${f.colour}` : f.el, "s", { tone: on ? f.tone : "muted", small: true, bold: on }));
    });
    if (step === 1) {
      const x0 = 1.6;
      els.push(poly([v(x0, 0), v(x0, 2.6), v(x0 + 0.8, 2.6), v(x0 + 0.8, 0)], { tone: "ink", open: true }));
      els.push(poly([v(x0, 0), v(x0 + 0.8, 0), v(x0 + 0.8, 1.6), v(x0, 1.6)], { tone: "b", fill: "b", bare: true }));
      for (let k = 1; k <= 5; k++) els.push(seg(v(x0, k * 0.5), v(x0 + 0.2, k * 0.5), { tone: "ink", thin: true }));
      els.push(txt(v(x0 + 0.9, 1.6), "20 mL su", "e", { tone: "b", small: true, bold: true }));
      els.push(vec(v(x0 + 1.0, 0.8), v(x0 + 2.0, 0.8), { tone: "ink" }), txt(v(x0 + 2.1, 0.8), "Fe: ? mg", "e", { tone: "warn", small: true, bold: true }));
    }
    els.push(txt(v(-1.4, 3.0), " ", "c"), txt(v(5.8, -0.9), " ", "c"));
    const rows: [string, string][] = [
      ["Tür tanıma (nitel analiz): alevin rengi, numunede hangi elementin bulunduğunu söyler. 2022 TYT Fen 8 bu ayrımı sorar.", "Tuzak: ısıtma var diye fizikokimya seçmek. Sorulan, sıcaklığın etkisi değil türdür."],
      ["Miktar ölçme (nicel analiz): 20 mL örnekte kaç mg demir var? Yüzde de bir miktar ifadesidir: 200 g'da 20 g → %10.", "Kan örneğinde glikoz miktarı da analitiktir; enzimin hücredeki işleyişi ise biyokimya."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 2. Karbonlu her madde organik mi? ---------- */
const organic: FigureDef = {
  caption:
    "İleri ile dört karbonlu maddeyi sınıfla. Metan ve etanol organik kimyanın konusudur: karbon zinciri ve C–H bağları taşırlar. CO₂ ve karbonatlar (ör. CaCO₃) karbon içerdikleri hâlde geleneksel olarak anorganik sayılır. Karbon içermek tek başına ölçüt değildir.",
  alt: "Dört top-çubuk molekül modeli: metan, etanol, karbon dioksit ve kalsiyum karbonat iyonları. Adımlara göre organik olanlar ve anorganik istisnalar ayrı renkle vurgulanır.",
  steps: ["Dört madde", "Organik olanlar", "Karbonlu ama anorganik"],
  draw: (_v, step) => {
    const els: El[] = [];
    const tOrg: Tone = step === 1 ? "c" : "muted";
    const tIn: Tone = step === 2 ? "warn" : "muted";
    const atom = (p: V, s: string, r: number, tone: Tone) => els.push(ball(p, r, tone, s));
    const bond = (a: V, b: V) => els.push(seg(a, b, { tone: "ink", thin: true }));
    // CH4
    const m: V = v(0, 1);
    for (const d of [v(0, 0.7), v(0.65, -0.35), v(-0.65, -0.35), v(0, -0.75)]) { bond(m, v(m[0] + d[0], m[1] + d[1])); atom(v(m[0] + d[0], m[1] + d[1]), "H", 0.17, step === 0 ? "b" : tOrg); }
    atom(m, "C", 0.28, step === 0 ? "muted" : tOrg);
    // C2H5OH
    const c1: V = v(2.6, 1);
    const c2: V = v(3.5, 1);
    const o: V = v(4.4, 1.3);
    bond(c1, c2); bond(c2, o); bond(o, v(4.9, 1.75));
    for (const d of [v(-0.5, 0.55), v(-0.5, -0.55), v(0, 0.75)]) { bond(c1, v(c1[0] + d[0], c1[1] + d[1])); atom(v(c1[0] + d[0], c1[1] + d[1]), "H", 0.17, step === 0 ? "b" : tOrg); }
    for (const d of [v(0, 0.75), v(0, -0.75)]) { bond(c2, v(c2[0] + d[0], c2[1] + d[1])); atom(v(c2[0] + d[0], c2[1] + d[1]), "H", 0.17, step === 0 ? "b" : tOrg); }
    atom(v(4.9, 1.75), "H", 0.17, step === 0 ? "b" : tOrg);
    atom(c1, "C", 0.28, step === 0 ? "muted" : tOrg); atom(c2, "C", 0.28, step === 0 ? "muted" : tOrg); atom(o, "O", 0.26, step === 0 ? "warn" : tOrg);
    // CO2
    const k: V = v(6.6, 1);
    bond(v(5.9, 1), v(7.3, 1));
    atom(v(5.9, 1), "O", 0.26, step === 0 ? "warn" : tIn); atom(k, "C", 0.28, step === 0 ? "muted" : tIn); atom(v(7.3, 1), "O", 0.26, step === 0 ? "warn" : tIn);
    // CaCO3: Ca2+ and carbonate triangle
    const cc: V = v(9.6, 1);
    for (const a of [90, 210, 330]) { const p = v(cc[0] + 0.62 * Math.cos((a * Math.PI) / 180), cc[1] + 0.62 * Math.sin((a * Math.PI) / 180)); bond(cc, p); atom(p, "O", 0.24, step === 0 ? "warn" : tIn); }
    atom(cc, "C", 0.26, step === 0 ? "muted" : tIn);
    atom(v(8.4, 0.2), "Ca", 0.3, step === 0 ? "a" : tIn);
    const names: [number, string, boolean][] = [[0, "CH₄ (metan)", true], [3.5, "C₂H₅OH (etanol)", true], [6.6, "CO₂", false], [9.2, "CaCO₃", false]];
    for (const [x, s, org] of names) els.push(txt(v(x, -0.7), s, "s", { tone: step === 0 ? "ink" : org === (step === 1) ? "ink" : "muted", small: true, bold: step !== 0 && org === (step === 1) }));
    els.push(txt(v(-1.2, 2.9), " ", "c"), txt(v(11.4, -1.4), " ", "c"));
    const rows: [string, string][] = [
      ["Dördünde de karbon var. Soru: hepsi organik kimyanın konusu mu?", "Önce madde sınıfını, sonra sorulan hedefi (yapı mı, miktar mı) ayrı yaz."],
      ["Metan ve etanol organik: karbon iskeleti ve C–H bağları. Etanolün tepkimesini incelemek organik kimyadır.", "Organik bir ilacın sentezi organik; kandaki miktarını ölçmek analitiktir."],
      ["CO₂ ve karbonatlar geleneksel olarak anorganik. Karbonat mineralinin yapısı anorganik kimyanın konusudur.", "Aynı mineralde bir bileşenin miktarını ölçmek ise analitik kimyadır."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 3. Polimer: tekrarlanan birim ---------- */
const polymer: FigureDef = {
  caption:
    "Sürgüyle zincire monomer ekle. Polimer, çok sayıda küçük birimin (monomer) bağlanmasıyla oluşan büyük moleküldür. Zincirin uzunluğu ve düzeni malzemenin özelliklerini etkiler; bu ilişki polimer kimyasının konusudur. Selüloz doğaldır ama yine polimerdir.",
  alt: "Yan yana bağlanmış altıgen birimlerden oluşan zincir; sürgüyle birim sayısı artar, köşeli parantez içinde tekrarlanan birim ve n gösterimi.",
  param: { label: "Monomer sayısı", min: 1, max: 10, step: 1, init: 4 },
  draw: (n) => {
    const els: El[] = [];
    const hex = (cx: number, cy: number, tone: Tone) => {
      const ps: V[] = Array.from({ length: 6 }, (_, i) => v(cx + 0.35 * Math.cos(((60 * i + 30) * Math.PI) / 180), cy + 0.35 * Math.sin(((60 * i + 30) * Math.PI) / 180)));
      els.push(poly(ps, { tone, fill: tone }));
    };
    for (let i = 0; i < n; i++) {
      const x = i * 1.0;
      const y = 0.25 * Math.sin(i * 0.9);
      if (i > 0) els.push(seg(v(x - 0.65, 0.25 * Math.sin((i - 1) * 0.9)), v(x - 0.35, y), { tone: "ink", bold: true }));
      hex(x, y, i === 0 ? "warn" : "c");
    }
    els.push(txt(v(0, -0.7), "monomer", "s", { tone: "warn", small: true, bold: true }));
    if (n >= 3) els.push(txt(v(((n - 1) * 1.0) / 2 + 0.5, 1.0), `${n} birimlik zincir`, "n", { tone: "c", small: true, bold: true }));
    els.push(txt(v(-0.8, 1.9), " ", "c"), txt(v(9.8, -1.3), " ", "c"));
    return {
      els,
      readout: [n === 1 ? "Tek birim: monomer." : `${n} monomer bağlandı. Gerçek polimerlerde n binlerce olabilir.`, "Plastik zincirinin dayanımla ilişkisi polimer kimyası; aynı plastikteki metal miktarı analitik; enzimin selülozu parçalaması biyokimya."],
    };
  },
};

/* ---------- 4. Üretimde önce uygunluk, sonra maliyet ---------- */
const PLANTS: { name: string; cap: number; q: number; cost: number }[] = [
  { name: "A", cap: 120, q: 98, cost: 10 },
  { name: "B", cap: 150, q: 94, cost: 8 },
  { name: "C", cap: 130, q: 97, cost: 9 },
];
const plant: FigureDef = {
  caption:
    "Sürgüyle en düşük kapasite şartını değiştir (kalite şartı %96). Önce iki şartı birden sağlayan düzenler kalır (yeşil bölge); maliyet yalnız onların arasında karşılaştırılır. 125 birimde yalnız C uygundur; B daha ucuzdur ama kalite şartını sağlamaz.",
  alt: "Yatay eksende günlük kapasite, düşey eksende kalite yüzdesi; A, B, C noktaları ve birim maliyetleri. Kesik dikey çizgi kapasite şartı, kesik yatay çizgi %96 kalite şartı; ikisinin sağ üstü yeşil uygun bölge.",
  param: { label: "En az kapasite", min: 110, max: 140, step: 5, init: 125, unit: " birim" },
  draw: (minCap) => {
    const X = (c: number) => (c - 110) * 0.15;
    const Y = (q: number) => (q - 92) * 0.6;
    const els: El[] = [vec(v(0, 0), v(X(158), 0), { tone: "ink" }), vec(v(0, 0), v(0, Y(100)), { tone: "ink" })];
    els.push(poly([v(X(minCap), Y(96)), v(X(155), Y(96)), v(X(155), Y(99.5)), v(X(minCap), Y(99.5))], { tone: "c", fill: "c", bare: true }));
    els.push(seg(v(X(minCap), 0), v(X(minCap), Y(99.5)), { tone: "c", dash: true }), seg(v(0, Y(96)), v(X(155), Y(96)), { tone: "c", dash: true }));
    for (const c of [110, 120, 130, 140, 150]) els.push(txt(v(X(c), 0), String(c), "s", { tone: "muted", small: true, soft: true }));
    for (const q of [94, 96, 98]) els.push(txt(v(0, Y(q)), `%${q}`, "w", { tone: "muted", small: true, soft: true }));
    const ok = PLANTS.filter((p) => p.cap >= minCap && p.q >= 96);
    const best = ok.reduce<(typeof PLANTS)[number] | undefined>((b, p) => (!b || p.cost < b.cost ? p : b), undefined);
    for (const p of PLANTS) {
      const good = ok.includes(p);
      els.push(ball(v(X(p.cap), Y(p.q)), 0.14, p === best ? "c" : good ? "b" : "warn"));
      els.push(txt(v(X(p.cap), Y(p.q)), `${p.name} · ${p.cost} TL`, "ne", { tone: p === best ? "c" : good ? "ink" : "warn", small: true, bold: p === best }));
    }
    els.push(txt(v(X(158), 0), "kapasite", "se", { tone: "ink", small: true }), txt(v(0, Y(100)), "kalite", "n", { tone: "ink", small: true }));
    els.push(txt(v(-1.2, Y(100) + 0.6), " ", "c"), txt(v(X(158) + 1.4, -0.9), " ", "c"));
    return {
      els,
      readout: [
        ok.length === 0 ? "Uygun düzen yok: hiçbir seçeneği zorla seçme." : `Uygun: ${ok.map((p) => p.name).join(", ")} · en ucuz uygun: ${best!.name} (${fmt(best!.cost)} TL)`,
        ok.length > 1 ? "Birden çok uygun düzen kaldı: şimdi maliyet karşılaştırılır." : "Önce kısıtları ele; uygun tek düzen kalınca maliyet sıralamasına gerek yok. Bu sanayi ölçeğinde üretim kararı endüstriyel kimyadır.",
      ],
    };
  },
};

export const chemistryFiguresDisciplines: Record<string, Record<string, FigureDef>> = {
  "kimya-disiplinleri": {
    "Analitik kimya: ne var, ne kadar var?": analysis,
    "Organik ve anorganik kimya": organic,
    "Fizikokimya, biyokimya ve polimer kimyası": polymer,
    "Endüstriyel kimya ve üretim ölçeği": plant,
  },
};
