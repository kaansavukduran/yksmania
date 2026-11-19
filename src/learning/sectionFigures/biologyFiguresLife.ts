import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Canlıların ortak özellikleri. A prokaryote/eukaryote cutaway (capsule-shaped
 * bacterium with a looped nucleoid and ribosomes; rounded eukaryotic cell with a
 * double-membrane nucleus), a 2 × 2 grid for carbon source × energy source, a
 * homeostasis band where a disturbance is corrected back into range, and an
 * organisation ladder that stops at the cell for a unicellular organism.
 * Schematic and not to scale; labels sit outside the drawn shapes.
 */

function smoothBlob(c: V, rx: number, ry: number, n = 28, wob = 0.04, seed = 0): V[] {
  return Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    const k = 1 + wob * Math.sin(3 * t + seed);
    return v(c[0] + Math.cos(t) * rx * k, c[1] + Math.sin(t) * ry * k);
  });
}
function capsule(c: V, L: number, r: number): V[] {
  const ps: V[] = [];
  for (let i = 0; i <= 10; i++) {
    const t = -Math.PI / 2 + (Math.PI * i) / 10;
    ps.push(v(c[0] + L / 2 + Math.cos(t) * r, c[1] + Math.sin(t) * r));
  }
  for (let i = 0; i <= 10; i++) {
    const t = Math.PI / 2 + (Math.PI * i) / 10;
    ps.push(v(c[0] - L / 2 + Math.cos(t) * r, c[1] + Math.sin(t) * r));
  }
  return ps;
}

/* ---------- 1. Prokaryot ve ökaryot ---------- */
const cells: FigureDef = {
  caption:
    "İleri ile iki hücre planını karşılaştır. Prokaryotta (bakteri) DNA sitoplazmada bir bölgededir, çekirdek zarı ve zarlı organel yoktur, ama ribozom vardır. Ökaryotta DNA çift zarlı çekirdektedir. Hücre sayısı ayrı bir eksendir: maya tek hücreli bir ökaryottur.",
  alt: "Solda kapsül biçimli bakteri: hücre duvarı, zar, ortada kıvrımlı DNA halkası, dağınık ribozom noktaları. Sağda yuvarlak ökaryot hücre: çift çizgili çekirdek zarı içinde DNA, sitoplazmada ribozomlar.",
  steps: ["Prokaryot", "Ökaryot", "Ortak olanlar"],
  draw: (_v, step) => {
    const els: El[] = [];
    const P = v(-3, 0);
    const on0 = step !== 1;
    const on1 = step !== 0;
    els.push(poly(capsule(P, 2.2, 0.95), { tone: on0 ? "a" : "muted", bold: true, smooth: true }), poly(capsule(P, 2.2, 0.8), { tone: on0 ? "c" : "muted", fill: on0 ? "c" : undefined, thin: true, smooth: true }));
    const loop: V[] = Array.from({ length: 24 }, (_, i) => {
      const t = (i / 24) * Math.PI * 2;
      return v(P[0] + Math.cos(t) * 0.7 + 0.12 * Math.sin(5 * t), P[1] + Math.sin(t) * 0.32 + 0.08 * Math.cos(4 * t));
    });
    els.push(poly(loop, { tone: on0 ? "warn" : "muted", bold: true, smooth: true }));
    const ribs: V[] = [v(-4.4, 0.4), v(-4.2, -0.45), v(-1.7, 0.45), v(-1.6, -0.35), v(-3.0, 0.62), v(-3.4, -0.6)];
    for (const r of ribs) els.push(ball(r, 0.08, on0 ? "a" : "muted"));
    const E = v(3, 0);
    els.push(poly(smoothBlob(E, 1.7, 1.45, 28, 0.05, 1), { tone: on1 ? "c" : "muted", fill: on1 ? "c" : undefined, bold: true, smooth: true }));
    els.push(circle(v(E[0] - 0.2, 0.1), 0.62, { tone: on1 ? "b" : "muted", bold: true }), circle(v(E[0] - 0.2, 0.1), 0.52, { tone: on1 ? "b" : "muted", thin: true }));
    const dna: V[] = Array.from({ length: 14 }, (_, i) => v(E[0] - 0.55 + i * 0.055, 0.1 + 0.18 * Math.sin(i * 1.3)));
    els.push(poly(dna, { tone: on1 ? "warn" : "muted", open: true, bold: true, smooth: true }));
    for (const r of [v(4.0, 0.7), v(4.2, -0.4), v(2.3, -0.95), v(3.6, -1.0), v(1.7, 0.6)]) els.push(ball(r, 0.08, on1 ? "a" : "muted"));
    // Labels below the cells only.
    els.push(txt(v(P[0], -1.7), "prokaryot (bakteri)", "s", { tone: on0 ? "ink" : "muted", small: true, bold: true }), txt(v(E[0], -1.7), "ökaryot", "s", { tone: on1 ? "ink" : "muted", small: true, bold: true }));
    const lead = (from: V, to: V, s: string, on: boolean) => els.push(seg(from, to, { tone: "muted", thin: true }), txt(to, s, "n", { tone: on ? "ink" : "muted", small: true }));
    lead(v(-3.5, 0.3), v(-4.5, 2.0), "DNA (sitoplazmada)", on0);
    lead(v(-1.7, 0.45), v(-1.1, 2.0), "ribozom", on0);
    lead(v(2.6, 0.6), v(2.2, 2.0), "çekirdek zarı", on1);
    lead(v(4.0, 0.7), v(4.4, 2.0), "ribozom", on1);
    els.push(txt(v(-5.4, 2.6), " ", "c"), txt(v(5.4, -2.3), " ", "c"));
    const rows: [string, string][] = [
      ["Prokaryot: hücre duvarı ve zar; DNA sitoplazmada (turuncu halka); çekirdek zarı ve zarlı organel yok; ribozom (noktalar) var.", "“Organeli yok” ezberi yanlış: zarsız ribozom vardır."],
      ["Ökaryot: DNA çift zarlı çekirdekte; ribozom ve zarlı organeller (burada gösterilmedi) vardır.", "Bitki, hayvan, mantar ve protistler ökaryottur."],
      ["İkisinde de: hücre zarı, sitoplazma, DNA, ribozom, ATP kullanımı.", "Tek hücreli olmak prokaryot demek değildir: maya ve amip tek hücreli ökaryottur."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 2. Karbon × enerji kaynağı ---------- */
const nutrition: FigureDef = {
  caption:
    "İleri ile iki soruyu ayrı sor: karbonu nereden alıyor (CO₂ mi, hazır organik madde mi), enerjiyi nereden alıyor (ışık mı, kimyasal tepkime mi)? Hücreler bu iki eksenin kesişimidir. ATP kullanmak beslenme türünü söylemez: bitkiler de ATP kullanır.",
  alt: "İki satır iki sütunlu tablo: satırlar karbon kaynağı (CO₂, organik madde), sütunlar enerji kaynağı (ışık, kimyasal). Hücrelerde fotoototrof (bitki, alg), kemoototrof (nitrifikasyon bakterisi), fotoheterotrof (bazı bakteriler), heterotrof (hayvan, mantar) yazıyor.",
  steps: ["Fotoototrof", "Kemoototrof", "Heterotrof"],
  draw: (_v, step) => {
    const els: El[] = [];
    const W = 3.8;
    const H = 1.4;
    const cell = (col: number, row: number, title: string, ex: string, on: boolean, tone: Tone) => {
      const x = col * W;
      const y = -row * H;
      els.push(poly([v(x, y), v(x + W, y), v(x + W, y - H), v(x, y - H)], { tone: on ? tone : "muted", fill: on ? tone : undefined, thin: !on, bold: on }));
      els.push(txt(v(x + W / 2, y - 0.45), title, "c", { tone: on ? tone : "muted", small: true, bold: true }), txt(v(x + W / 2, y - 0.95), ex, "c", { tone: on ? "ink" : "muted", small: true }));
    };
    cell(0, 0, "fotoototrof", "bitki, alg", step === 0, "c");
    cell(1, 0, "kemoototrof", "nitrifikasyon bakterisi", step === 1, "a");
    cell(0, 1, "fotoheterotrof", "bazı bakteriler", step === 2, "warn");
    cell(1, 1, "heterotrof", "hayvan, mantar", step === 2, "warn");
    els.push(txt(v(W / 2, 0.25), "ışık", "n", { tone: "ink", small: true, bold: true }), txt(v(1.5 * W, 0.25), "kimyasal", "n", { tone: "ink", small: true, bold: true }), txt(v(W, 0.85), "enerji kaynağı", "n", { tone: "muted", small: true }));
    els.push(txt(v(-0.15, -H / 2), "CO₂", "w", { tone: "ink", small: true, bold: true }), txt(v(-0.15, -1.5 * H), "organik", "w", { tone: "ink", small: true, bold: true }), txt(v(-1.75, -H), "karbon", "w", { tone: "muted", small: true }));
    els.push(txt(v(-3.4, 1.5), " ", "c"), txt(v(7.8, -3.1), " ", "c"));
    const rows: [string, string][] = [
      ["Karbon CO₂'den, enerji ışıktan: fotoototrof. Gece fotosentez yapmaması üretici kimliğini değiştirmez.", "Ototrof = inorganik karbondan (CO₂) organik madde üretir."],
      ["Karbon CO₂'den, enerji inorganik maddelerin oksidasyonundan: kemoototrof. Karanlıkta yaşaması heterotrof yapmaz.", "Örnek: amonyağı nitrite yükselten nitrifikasyon bakterileri."],
      ["Karbonu hazır organik maddeden alan: heterotrof. Hayvan ve mantar enerjiyi de besinin kimyasal bağlarından alır; bazı bakteriler ışığı kullanır ama karbonu organik maddeden alır.", "Öglena ışıkta ototrof, ışıksız ortamda heterotrof beslenebilir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 3. Homeostazi ---------- */
const homeo: FigureDef = {
  caption:
    "Sürgüyle zamanı ilerlet. Vücut sıcaklığı sabit bir sayı değil, uygun bir aralıktadır (yeşil bant). Sıcak ortamda sıcaklık yükselmeye başlayınca terleme artar; terin buharlaşması ısıyı uzaklaştırır ve sıcaklık bandın içine döner. Denge, hiç değişmemek değil, sınırlar içinde tutulmaktır.",
  alt: "Zaman–sıcaklık grafiği: yeşil normal aralık bandı; sıcaklık eğrisi bandın içinde dalgalanıyor, bir noktada yukarı çıkıyor, terleme işaretinden sonra yeniden banda iniyor; sürgüyle hareket eden nokta.",
  param: { label: "Zaman", min: 0, max: 10, step: 0.25, init: 5 },
  draw: (t) => {
    const T = (x: number) => 37 + 0.18 * Math.sin(x * 1.6) + 0.9 * Math.exp(-Math.pow((x - 5) / 1.1, 2));
    const Y = (c: number) => (c - 36) * 2;
    const els: El[] = [vec(v(0, 0), v(10.6, 0), { tone: "ink" }), vec(v(0, 0), v(0, Y(38.8)), { tone: "ink" })];
    els.push(poly([v(0, Y(36.6)), v(10.3, Y(36.6)), v(10.3, Y(37.4)), v(0, Y(37.4))], { tone: "c", fill: "c", bare: true }));
    for (const c of [36.6, 37.4]) els.push(txt(v(-0.15, Y(c)), `${String(c).replace(".", ",")} °C`, "w", { tone: "c", small: true }));
    const ps: V[] = Array.from({ length: 121 }, (_, i) => v((i / 120) * 10, Y(T((i / 120) * 10))));
    els.push(poly(ps, { tone: "warn", open: true, bold: true, smooth: true }));
    els.push(seg(v(t, 0), v(t, Y(38.6)), { tone: "muted", dash: true, thin: true }), ball(v(t, Y(T(t))), 0.12, "warn"));
    els.push(vec(v(4.4, Y(38.5)), v(4.4, Y(38.05)), { tone: "b", bold: true }), txt(v(4.4, Y(38.55)), "terleme artar", "n", { tone: "b", small: true, bold: true }));
    els.push(txt(v(10.65, 0), "zaman", "e", { tone: "ink", small: true }));
    els.push(txt(v(-1.8, 6.6), " ", "c"), txt(v(11.6, -0.5), " ", "c"));
    const c = T(t);
    const out = c > 37.4;
    return {
      els,
      readout: [`Sıcaklık ≈ ${c.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} °C ${out ? "(aralığın üstünde)" : "(aralıkta)"}`, out ? "Sapma algılandı: terleme ve deri damarlarının genişlemesi ısı kaybını artırır." : "Küçük dalgalanmalar normaldir; düzenleyici yanıt sapmanın tersi yönündedir."],
    };
  },
};

/* ---------- 4. Örgütlenme basamakları ---------- */
const LEVELS = ["atom", "molekül", "organel", "hücre", "doku", "organ", "sistem", "organizma"];
const EX = ["C, O", "glikoz, protein", "mitokondri", "kas hücresi", "kas dokusu", "kalp", "dolaşım sistemi", "insan"];
const ladder: FigureDef = {
  caption:
    "İleri ile çok hücreli bir canlıda örgütlenme basamaklarını yukarı çık. Tek hücreli bir canlıda (bakteri, maya) hücre aynı zamanda organizmadır: doku, organ ve sistem basamakları yoktur, yine de örgütlüdür.",
  alt: "Alttan üste sekiz basamak: atom, molekül, organel, hücre, doku, organ, sistem, organizma; her basamağın yanında örnek. Son adımda tek hücreli için hücre basamağından organizmaya doğrudan ok.",
  steps: ["Hücreye kadar", "Çok hücreli", "Tek hücreli"],
  draw: (_v, step) => {
    const els: El[] = [];
    LEVELS.forEach((name, i) => {
      const y = i * 0.62;
      const x = i * 0.35;
      const reached = step === 0 ? i <= 3 : step === 1 ? true : i <= 3 || i === 7;
      const skip = step === 2 && i > 3 && i < 7;
      els.push(poly([v(x, y), v(x + 2.2, y), v(x + 2.2, y + 0.5), v(x, y + 0.5)], { tone: skip ? "muted" : reached ? (i === 3 ? "warn" : "b") : "muted", fill: reached && !skip ? (i === 3 ? "warn" : "b") : undefined, thin: skip || !reached, dash: skip }));
      els.push(txt(v(x + 1.1, y + 0.25), name, "c", { tone: skip ? "muted" : "ink", small: true, bold: reached && !skip }));
      const ex = skip ? "yok" : step === 2 && i === 3 ? "maya hücresi" : step === 2 && i === 7 ? "maya" : EX[i];
      els.push(txt(v(x + 2.4, y + 0.25), ex, "e", { tone: skip ? "muted" : "ink", small: true }));
    });
    if (step === 2) els.push(poly([v(1.05, 3 * 0.62 + 0.25), v(0.35, 3 * 0.62 + 0.25), v(0.35, 7 * 0.62 + 0.25)], { tone: "warn", open: true, bold: true }), vec(v(0.35, 7 * 0.62 + 0.25), v(2.45, 7 * 0.62 + 0.25), { tone: "warn", bold: true }));
    els.push(txt(v(-0.4, 5.4), " ", "c"), txt(v(7.4, -0.4), " ", "c"));
    const rows: [string, string][] = [
      ["Atom → molekül → organel → hücre: hücre, canlılığın en küçük birimidir.", "Molekül ya da organel tek başına canlı değildir."],
      ["Çok hücrelide: benzer hücreler doku, farklı dokular organ, organlar sistem, sistemler organizma.", "Örnek zincir: kas hücresi → kas dokusu → kalp → dolaşım sistemi → insan."],
      ["Tek hücrelide hücre = organizma; doku, organ, sistem basamakları yoktur.", "Tek hücreli de örgütlüdür: bütün yaşamsal işler tek hücrede düzenli yürür."],
    ];
    return { els, readout: rows[step] };
  },
};

export const biologyFiguresLife: Record<string, Record<string, FigureDef>> = {
  "canli-ozellikleri": {
    "İki farklı sınıflama ekseni": cells,
    "Karbon kaynağı ile enerji kaynağını ayır": nutrition,
    "Denge, hiç değişmemek değildir": homeo,
    "Tek hücreli de örgütlüdür": ladder,
  },
};
