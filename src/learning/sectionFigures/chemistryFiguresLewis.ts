import { ball, poly, seg, txt, v, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * TYT Kimya · Kimyasal türler ve Lewis yapısı. Nokta = 1 değerlik elektronu,
 * çizgi = 2 ortak elektron. Çizimler elektron bütçesi içindir; bağ açısı ya da
 * atom boyu ölçekli değildir. ÖSYM bağı: 2026 TYT Fen 10 (yapılmış sınav,
 * resmî cevap C); kaynak çizimlerinin nokta sayıları metinle aktarılır.
 */

const rad = (d: number) => (d * Math.PI) / 180;
const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });

/** Atom çevresinde bir yönde nokta çifti (ya da tek nokta). */
function dots(c: V, angle: number, n: 1 | 2, tone: Tone = "a", r = 0.42): El[] {
  const t = rad(angle), px = -Math.sin(t) * 0.09, py = Math.cos(t) * 0.09;
  const p = v(c[0] + Math.cos(t) * r, c[1] + Math.sin(t) * r);
  return n === 1 ? [ball(p, 0.055, tone)] : [ball(v(p[0] + px, p[1] + py), 0.055, tone), ball(v(p[0] - px, p[1] - py), 0.055, tone)];
}
/** Tekli/çiftli/üçlü bağ: paralel çizgiler, uçlardan atom sembolüne kadar kısaltılmış. */
function bond(a: V, b: V, order: 1 | 2 | 3, tone: Tone = "ink"): El[] {
  const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d, sh = 0.3;
  const A = v(a[0] + ux * sh, a[1] + uy * sh), B = v(b[0] - ux * sh, b[1] - uy * sh);
  const off = order === 1 ? [0] : order === 2 ? [-0.06, 0.06] : [-0.1, 0, 0.1];
  return off.map((o) => seg(v(A[0] - uy * o, A[1] + ux * o), v(B[0] - uy * o, B[1] + ux * o), { tone, bold: true }));
}
const atom = (c: V, s: string, tone: Tone = "ink"): El => txt(c, s, "c", { bold: true, tone });
/** Köşeli ayraç ve yük. */
function bracket(x0: number, x1: number, y0: number, y1: number, charge: string): El[] {
  return [
    poly([v(x0 + 0.15, y1), v(x0, y1), v(x0, y0), v(x0 + 0.15, y0)], { open: true, thin: true }),
    poly([v(x1 - 0.15, y1), v(x1, y1), v(x1, y0), v(x1 - 0.15, y0)], { open: true, thin: true }),
    txt(v(x1 + 0.25, y1 - 0.05), charge, "c", { small: true, bold: true }),
  ];
}

/** Lewis sembolü: önce dört yana tek tek (üst, sağ, alt, sol), sonra eşleşerek. He: tek çift. */
function lewisSymbol(c: V, s: string, n: number, tone: Tone = "a"): El[] {
  const els: El[] = [atom(c, s)];
  if (s === "He") return [...els, ...dots(c, 90, 2, tone)];
  const sides = [90, 0, 270, 180];
  sides.forEach((a, i) => {
    const k = (n > i ? 1 : 0) + (n > i + 4 ? 1 : 0);
    if (k) els.push(...dots(c, a, k as 1 | 2, tone));
  });
  return els;
}

// 1 · Nokta yerleştirme (2. periyot).
const P2 = ["Li", "Be", "B", "C", "N", "O", "F", "Ne"];
const place: FigureDef = {
  caption:
    "Lewis sembolü yalnız değerlik elektronlarını gösterir. Değerlik elektron sayısını değiştir: noktalar önce dört yana birer birer, beşinciden sonra eşleşerek yerleşir. Hangi yana konduğunun fiziksel bir anlamı yoktur; sayı ve eşleşme önemlidir.",
  alt: "Ortada seçilen 2. periyot elementinin sembolü ve çevresinde değerlik elektron noktaları.",
  param: { label: "Değerlik elektronu", min: 1, max: 8, step: 1, init: 5, unit: "", plain: true },
  draw: (n) => {
    const els: El[] = [...lewisSymbol(v(0, 0), P2[n - 1], n)];
    const pairs = Math.max(0, n - 4), singles = n - 2 * pairs;
    els.push(txt(v(1.4, 0.35), `${P2[n - 1]}: ${n} değerlik e⁻`, "e", { small: true, bold: true, tone: "a" }), txt(v(1.4, -0.25), `${pairs} çift + ${singles} tek`, "e", { small: true }));
    els.push(txt(v(-1.2, 1.1), " ", "c"), txt(v(4.6, -1.1), " ", "c"));
    return { els, readout: [`${P2[n - 1]} (${n}A ana grubu): ${n} nokta; ${pairs} çift, ${singles} eşleşmemiş.`, "He istisnası: 2 elektron tek çift olarak çizilir, iki ayrı nokta değil."] };
  },
};

// 2 · 2026 TYT Fen 10.
const OPTIONS = [
  { k: "A", s: "Na", q: 0, expect: 1, drawn: "8 nokta", ok: false, why: "Nötr Na 1. grup: 1 nokta beklenir." },
  { k: "B", s: "Mg", q: 2, expect: 0, drawn: "2 nokta, 2+ yük", ok: false, why: "Mg²⁺ iki dış elektronunu vermiştir: nokta kalmaz. Yük doğru, noktalar yanlış." },
  { k: "C", s: "S", q: -2, expect: 8, drawn: "8 nokta, 2− yük", ok: true, why: "S: 6 + 2 = 8 nokta ve 2− yük: doğru eşleşme." },
  { k: "D", s: "Ca", q: 0, expect: 2, drawn: "8 nokta", ok: false, why: "Nötr Ca 2. grup: 2 nokta beklenir." },
  { k: "E", s: "F", q: -1, expect: 8, drawn: "7 nokta, − yük", ok: false, why: "F⁻: 7 + 1 = 8 nokta gerekir; çizim bir elektron eksik." },
];
const sup = (q: number) => (q === 0 ? "" : `${Math.abs(q) > 1 ? "²" : ""}${q > 0 ? "⁺" : "⁻"}`);
const osym: FigureDef = {
  caption:
    "2026 TYT Fen 10 (resmî kitapçık, cevap C): türle Lewis çiziminin doğru eşleşmesi aranıyor. Bir seçeneğe tıkla: beklenen çizim solda, kaynaktaki çizimin nokta sayısı metinde. Beklenen sembolü bilmek yetmez; seçenekte gerçekten kaç nokta çizildiğini say.",
  alt: "Seçilen türün beklenen Lewis sembolü; altında A’dan E’ye seçenek etiketleri.",
  picks: OPTIONS.map((o) => ({ label: `${o.k} · ${o.s}${sup(o.q)}`, title: `${o.k} · ${o.s}${sup(o.q)}: ${o.ok ? "doğru" : "yanlış"}`, detail: [o.why, `Beklenen ${o.expect} nokta; kaynakta ${o.drawn}.`] })),
  draw: (_v, _s, pick = -1) => {
    const o = OPTIONS[pick >= 0 ? pick : 2];
    const els: El[] = [...lewisSymbol(v(0, 0), o.s, o.expect)];
    if (o.q !== 0) els.push(...bracket(-0.75, 0.75, -0.7, 0.7, o.q > 0 ? `${Math.abs(o.q) > 1 ? "2" : ""}+` : `${Math.abs(o.q) > 1 ? "2" : ""}−`));
    els.push(txt(v(1.6, 0.4), `beklenen: ${o.expect} nokta`, "e", { small: true, bold: true, tone: "a" }), txt(v(1.6, -0.1), `kaynakta: ${o.drawn}`, "e", { small: true, tone: o.ok ? "b" : "warn" }));
    OPTIONS.forEach((oo, i) => els.push(txt(v(-1.4 + i * 1.35, -1.6), `${oo.k} · ${oo.s}${sup(oo.q)}`, "c", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-1.9, 1.2), " ", "c"), txt(v(5.4, -1.9), " ", "c"));
    return { els, readout: [pick >= 0 ? o.why : "Bir seçeneğe tıkla (varsayılan C).", "Lewis nokta sayısı ≠ toplam elektron: Mg²⁺’da 0 nokta ama 10 elektron."] };
  },
};

// 3 · CO₂ bütçesi.
const CO2 = ["Bütçe: 16", "İskelet + tek bağlar", "Uç oktetler", "Çoklu bağ"];
const co2: FigureDef = {
  caption:
    "CO₂’nin Lewis yapısını bütçeyi sabit tutarak kur. Adımları ilerlet: toplam 4 + 2×6 = 16 değerlik elektronu; O–C–O tek bağları 4 kullanır; O’ların okteti 12 daha kullanır ve bütçe biter ama C’de yalnız 4 elektron kalır; her O’dan bir yalnız çift bağa dönünce O=C=O, herkes oktette.",
  alt: "O, C, O atomları; adımlarla tek bağlar, O’lardaki yalnız çiftler ve sonunda iki çift bağ.",
  steps: CO2,
  draw: (_v, step) => {
    const L = v(-1.4, 0), C = v(0, 0), R = v(1.4, 0);
    const els: El[] = [atom(L, "O"), atom(C, "C"), atom(R, "O")];
    let used = 0;
    if (step >= 1) {
      const order = step === 3 ? 2 : 1;
      els.push(...bond(L, C, order), ...bond(C, R, order));
      used += order * 4;
    }
    if (step === 2) {
      for (const a of [90, 180, 270]) els.push(...dots(L, a, 2));
      for (const a of [90, 0, 270]) els.push(...dots(R, a, 2));
      used += 12;
    }
    if (step === 3) {
      for (const a of [130, 230]) els.push(...dots(L, a, 2));
      for (const a of [50, 310]) els.push(...dots(R, a, 2));
      used += 8;
    }
    els.push(txt(v(-1.9, -1.1), step === 0 ? "bütçe 16 e⁻" : `kullanılan ${used} / 16 e⁻`, "e", { small: true, bold: true, tone: used === 16 ? "b" : "a" }));
    if (step === 2) els.push(txt(v(0, 0.75), "C çevresi: 4 e⁻ ✗", "c", { small: true, bold: true, tone: "warn" }));
    if (step === 3) els.push(txt(v(0, 0.75), "her atom 8 e⁻ ✓", "c", { small: true, bold: true, tone: "b" }));
    els.push(txt(v(-2.2, 1.2), " ", "c"), txt(v(2.2, -1.4), " ", "c"));
    return {
      els,
      readout: [
        ["4 + 6 + 6 = 16 değerlik elektronu: çizimde tam bu kadar kullanılacak.", "İki tek bağ = 4 elektron; kalan 12.", "O’lara 6’şar elektron: bütçe bitti ama C’de 4 elektron var.", "Elektron eklemeden: her O’dan bir yalnız çift bağa döner; O=C=O, toplam yine 16."][step],
        "Oktet için bütçeye elektron eklemek türün yükünü değiştirir.",
      ],
    };
  },
};

// 4 · Bağ çifti ve yalnız çift.
type Mol = { label: string; bonds: number; lone: number; total: number; draw: () => El[]; detail: string[] };
const MOLS: Mol[] = [
  {
    label: "H₂O", bonds: 2, lone: 2, total: 8,
    draw: () => { const O = v(0, 0), H1 = v(-1.1, -0.6), H2 = v(1.1, -0.6); return [atom(O, "O"), atom(H1, "H"), atom(H2, "H"), ...bond(O, H1, 1), ...bond(O, H2, 1), ...dots(O, 60, 2), ...dots(O, 120, 2)]; },
    detail: ["Bütçe 2×1 + 6 = 8: iki bağ (4) + O’da iki yalnız çift (4).", "H uçta, duet: tek bağ."],
  },
  {
    label: "NH₃", bonds: 3, lone: 1, total: 8,
    draw: () => { const N = v(0, 0), a = v(-1.1, 0), b = v(1.1, 0), c = v(0, -1.1); return [atom(N, "N"), atom(a, "H"), atom(b, "H"), atom(c, "H"), ...bond(N, a, 1), ...bond(N, b, 1), ...bond(N, c, 1), ...dots(N, 90, 2)]; },
    detail: ["Bütçe 5 + 3 = 8: üç bağ (6) + N’de bir yalnız çift (2)."],
  },
  {
    label: "NH₄⁺", bonds: 4, lone: 0, total: 8,
    draw: () => { const N = v(0, 0), ps = [v(-1.1, 0), v(1.1, 0), v(0, 1.0), v(0, -1.0)]; return [atom(N, "N"), ...ps.flatMap((p) => [atom(p, "H"), ...bond(N, p, 1)]), ...bracket(-1.5, 1.5, -1.35, 1.35, "+")]; },
    detail: ["Bütçe 5 + 4 − 1 = 8: dört bağ (8), yalnız çift yok.", "NH₃’teki yalnız çift NH₄⁺’ta H⁺ ile bağ olmuştur."],
  },
  {
    label: "N₂", bonds: 3, lone: 2, total: 10,
    draw: () => { const a = v(-0.65, 0), b = v(0.65, 0); return [atom(a, "N"), atom(b, "N"), ...bond(a, b, 3), ...dots(a, 180, 2), ...dots(b, 0, 2)]; },
    detail: ["Bütçe 2×5 = 10: üçlü bağ (6) + her N’de bir yalnız çift (4).", "Bağ elektronları iki atomun çevresinde de sayılır ama bütçede bir kez."],
  },
];
const pairs: FigureDef = {
  caption:
    "Çizgiler ortak (bağ) çiftleri, nokta çiftleri yalnız çiftleri gösterir; her ikisi de 2 elektrondur. Bir türe tıkla: çizimi açılır ve bağ çifti, yalnız çift ve toplam elektron sayımı yazılır. Toplam e⁻ = 2 × (bütün çiftler).",
  alt: "Seçilen molekülün ya da iyonun Lewis yapısı; altında H₂O, NH₃, NH₄⁺, N₂ etiketleri.",
  picks: MOLS.map((m) => ({ label: m.label, title: `${m.label}: ${m.bonds} bağ çifti, ${m.lone} yalnız çift`, detail: m.detail })),
  draw: (_v, _s, pick = -1) => {
    const m = MOLS[pick >= 0 ? pick : 0];
    const els: El[] = [...m.draw()];
    els.push(txt(v(2.2, 0.6), `${m.bonds} bağ çifti`, "e", { small: true, bold: true }), txt(v(2.2, 0.05), `${m.lone} yalnız çift`, "e", { small: true, bold: true, tone: "a" }), txt(v(2.2, -0.5), `2 × ${m.bonds + m.lone} = ${m.total} e⁻`, "e", { small: true, tone: "b" }));
    MOLS.forEach((mm, i) => els.push(txt(v(-1.5 + i * 1.3, -2.0), mm.label, "c", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-2.0, 1.6), " ", "c"), txt(v(4.8, -2.3), " ", "c"));
    return { els, readout: [m.detail[0], "Çift ve üçlü bağı tek bağ sanma: çift bağ 2, üçlü bağ 3 bağ çiftidir."] };
  },
};

// 5 · BF₃ eksik oktet.
const bf3: FigureDef = {
  caption:
    "Oktet bir denetimdir, sınırsız bir yasa değildir. BF₃’te bütçe 3 + 3×7 = 24: üç B–F bağı 6, F’lerdeki dokuz yalnız çift 18 elektron kullanır ve bütçe biter. F’ler oktette, B çevresinde 6 elektron kalır (eksik oktet). “Sekize ulaşmadı” diye elektron eklemek başka bir tür üretir.",
  alt: "Ortada B, üç yönde F atomları ve tek bağlar; her F’de üç yalnız çift; B yanında 6 elektron notu.",
  draw: () => {
    const B = v(0, 0), Fs = [90, 210, 330].map((a) => v(Math.cos(rad(a)) * 1.3, Math.sin(rad(a)) * 1.3));
    const els: El[] = [atom(B, "B")];
    Fs.forEach((F, i) => {
      const a = [90, 210, 330][i];
      els.push(atom(F, "F"), ...bond(B, F, 1), ...dots(F, a, 2), ...dots(F, a + 75, 2), ...dots(F, a - 75, 2));
    });
    els.push(txt(v(1.9, 0.9), "B çevresi: 6 e⁻", "e", { small: true, bold: true, tone: "warn" }), txt(v(1.9, 0.35), "kullanılan: 6 + 18 = 24 ✓", "e", { small: true, tone: "b" }));
    els.push(txt(v(-2.1, 2.2), " ", "c"), txt(v(5.4, -1.4), " ", "c"));
    return { els, readout: ["B üç bağla 6 elektrona sahip: elektronca eksik oktet.", "H duet yapar; B ve Be başlangıç modelinde eksik oktet örnekleridir."] };
  },
};

// 6 · Radikal ve iyon.
const RAD = [
  { label: "OH• (radikal)", total: 7, detail: ["Bütçe 6 + 1 = 7: bağ 2 + iki yalnız çift 4 + bir eşleşmemiş elektron 1.", "• eşleşmemiş elektronu gösterir; tür nötrdür."] },
  { label: "OH⁻ (iyon)", total: 8, detail: ["Bütçe 6 + 1 + 1 = 8: bağ 2 + üç yalnız çift 6.", "− net yüktür; eşleşmemiş elektron yok."] },
];
const radical: FigureDef = {
  caption:
    "Radikal ile iyon farklı sorulardır: radikal eşleşmemiş elektron taşır (yüklü ya da nötr olabilir), iyon net yük taşır. Bir türe tıkla: OH• ile OH⁻ arasındaki tek elektron farkı çizimde görünür.",
  alt: "O–H bağı; O üzerinde yalnız çiftler ve OH• için tek nokta, OH⁻ için üçüncü çift ve köşeli ayraçla − yük.",
  picks: RAD.map((r) => ({ label: r.label, title: `${r.label}: ${r.total} değerlik e⁻`, detail: r.detail })),
  draw: (_v, _s, pick = -1) => {
    const ion = pick === 1, O = v(0, 0), H = v(1.2, 0);
    const els: El[] = [atom(O, "O"), atom(H, "H"), ...bond(O, H, 1), ...dots(O, 90, 2), ...dots(O, 270, 2), ...dots(O, 180, ion ? 2 : 1, ion ? "a" : "warn")];
    if (ion) els.push(...bracket(-0.8, 1.65, -0.75, 0.75, "−"));
    els.push(txt(v(2.4, 0.3), `${RAD[ion ? 1 : 0].total} değerlik e⁻`, "e", { small: true, bold: true }), txt(v(2.4, -0.25), ion ? "eşleşmemiş e⁻ yok" : "1 eşleşmemiş e⁻", "e", { small: true, tone: ion ? "b" : "warn" }));
    RAD.forEach((r, i) => els.push(txt(v(-0.6 + i * 2.6, -1.4), r.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-1.3, 1.1), " ", "c"), txt(v(5.4, -1.7), " ", "c"));
    return { els, readout: [RAD[ion ? 1 : 0].detail[0], "Tek sayılı bütçede bütün elektronlar çiftlenemez; ama çift sayılı olmak radikal olmamayı garanti etmez."] };
  },
};

export const chemistryFiguresLewis: Record<string, Record<string, FigureDef>> = {
  "kimyasal-turler-lewis": {
    "Noktaları yerleştir; yönlere anlam yükleme": place,
    "Yüklü tek atomlu türde iki ayrı elektron hesabı": osym,
    "Molekül ve çok atomlu iyon için bütçeyi sabitle": co2,
    "Bağ çifti ile yalnız çifti ayır": pairs,
    "Duet ve oktet bir denetimdir; sınırsız kural değildir": bf3,
    "Radikal: yükten farklı bir soru": radical,
  },
};
