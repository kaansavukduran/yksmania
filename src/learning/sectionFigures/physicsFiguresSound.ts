import { circle, poly, pt, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Ses ve deprem dalgaları. The longitudinal wave moves real particle positions
 * x + A·sin(kx − ωt): crowding and thinning travel while each particle only
 * oscillates about its own place (one is tracked in red). Waveforms are exact
 * sines (timbre adds harmonics with stated weights). Numbers follow the guide
 * and the source examples; drawings are not to scale.
 */

const TAU = Math.PI * 2;

/* ---------- 1. Boyuna dalga: sıkışma ve seyrelme ---------- */
const longitudinal: FigureDef = {
  caption:
    "Oynat'a bas ya da sürgüyü sürükle: sıkışma (yoğun) ve seyrelme (seyrek) bölgeleri sağa ilerler, ama kırmızı tanecik yalnız kendi yerinin çevresinde ileri geri titreşir. Ses enerjiyi taşır, maddeyi taşımaz.",
  alt: "Beş sıra küçük noktadan oluşan hava tanecikleri; yer yer sıkışmış ve seyrelmiş bölgeler. Bir tanecik kırmızı ve kendi denge konumu kesik çizgiyle işaretli. Altta basınç eğrisi.",
  param: { label: "Zaman (periyot)", min: 0, max: 2, step: 0.02, init: 0, playMs: 8000 },
  draw: (t) => {
    const els: El[] = [];
    const A = 0.4;
    const lam = 6;
    const k = TAU / lam;
    const disp = (x: number) => A * Math.sin(k * x - TAU * t);
    for (let row = 0; row < 5; row++) {
      for (let i = 0; i <= 40; i++) {
        const x0 = i * 0.3;
        const tracked = row === 2 && i === 15;
        const p = v(x0 + disp(x0), row * 0.32);
        els.push(circle(p, tracked ? 0.09 : 0.05, { tone: tracked ? "warn" : "b", fill: tracked ? "warn" : "b", thin: true }));
      }
    }
    const xT = 15 * 0.3;
    els.push(seg(v(xT, -0.25), v(xT, 1.55), { tone: "warn", dash: true, thin: true }));
    // Pressure (density) curve: compression where displacement gradient is negative.
    const pres: V[] = [];
    for (let i = 0; i <= 120; i++) {
      const x = i * 0.1;
      pres.push(v(x, -1.2 - 0.5 * Math.cos(k * x - TAU * t)));
    }
    els.push(seg(v(0, -1.2), v(12, -1.2), { tone: "muted", thin: true }), poly(pres, { tone: "c", open: true, bold: true, smooth: true }));
    els.push(txt(v(12.1, -1.2), "basınç", "e", { tone: "c", small: true }));
    // Label the first compression and rarefaction currently in view.
    // Density ∝ −∂(disp)/∂x: compressions where k·x − ωt = π, rarefactions at 0.
    const xc = (((0.5 + t) % 1) + 1) % 1 * lam;
    const xr = ((t % 1) + 1) % 1 * lam;
    for (const [x0, s, tone] of [
      [xc, "sıkışma", "c"],
      [xr, "seyrelme", "muted"],
    ] as [number, string, Tone][]) {
      const x = x0 < 2.5 ? x0 + lam : x0;
      els.push(txt(v(x, -1.85), s, "s", { tone, small: true, bold: true }), seg(v(x, -1.75), v(x, -0.45), { tone, dash: true, thin: true }));
    }
    els.push(vec(v(8.6, 2.35), v(11.2, 2.35), { tone: "ink", thin: true }), txt(v(8.5, 2.35), "yayılma yönü", "w", { tone: "ink", small: true }));
    els.push(txt(v(-0.4, 2.7), " ", "c"), txt(v(13.6, -2), " ", "c"));
    return {
      els,
      readout: [
        `Kırmızı taneciğin denge konumundan uzaklığı: ${(disp(xT) / A).toLocaleString("tr-TR", { maximumFractionDigits: 2 })} × genlik (hep −1 ile +1 arasında kalır)`,
        "Sıkışmada basınç yüksek, seyrelmede düşüktür. Dalga boyu: iki ardışık sıkışma arası. Maddesiz boşlukta (vakum) bu titreşim kurulamaz.",
      ],
    };
  },
};

/* ---------- 2. Tizlik, gürlük, tını ---------- */
const WAVES: { name: string; f: number; a: number; harm?: number[]; tone: Tone; note: string; why: string }[] = [
  { name: "Temel ses", f: 1, a: 1, tone: "b", note: "300 Hz, genlik A.", why: "Karşılaştırma için başlangıç sesi." },
  { name: "Daha tiz", f: 2, a: 1, tone: "c", note: "600 Hz, aynı genlik: aynı sürede iki kat salınım.", why: "Tizlik (yükseklik) frekansla belirlenir; 600 Hz daha incedir ama daha gür değildir." },
  { name: "Daha gür", f: 1, a: 1.8, tone: "warn", note: "300 Hz, genlik daha büyük.", why: "Aynı düzenekte genlik büyükse ses daha şiddetlidir; tizlik değişmez." },
  { name: "Farklı tını", f: 1, a: 1, harm: [1, 0.45, 0.25], tone: "a", note: "300 Hz temel frekans + harmonikler: periyot aynı, biçim farklı.", why: "Aynı notayı çalan gitar ve piyano tınılarıyla ayırt edilir." },
];
const pitch: FigureDef = {
  caption:
    "İleri ile her sesi gri temel sesle karşılaştır. Yatay eksen zamandır: daha sık salınım = yüksek frekans (tiz), daha büyük tepe = büyük genlik (gür), aynı periyotta farklı biçim = farklı tını.",
  alt: "Zaman ekseni üzerinde gri temel sinüs ve onunla karşılaştırılan renkli dalga: iki kat sık, daha yüksek tepeli ya da aynı periyotlu ama girintili çıkıntılı biçimde.",
  steps: WAVES.map((w) => w.name),
  draw: (_v, step) => {
    const w = WAVES[step];
    const curve = (f: number, a: number, harm?: number[]): V[] => {
      const ps: V[] = [];
      const hs = harm ?? [1];
      const norm = hs.reduce((s, h) => s + h, 0);
      for (let i = 0; i <= 240; i++) {
        const x = (i / 240) * 10;
        let y = 0;
        hs.forEach((h, n) => (y += h * Math.sin(TAU * f * (n + 1) * (x / 5))));
        ps.push(v(x, (a * y) / norm));
      }
      return ps;
    };
    const els: El[] = [vec(v(0, 0), v(10.5, 0), { tone: "ink" }), txt(v(10.6, 0), "zaman", "e", { tone: "ink", small: true })];
    els.push(poly(curve(1, 1), { tone: "muted", open: true, thin: true, smooth: true }));
    if (step > 0) els.push(poly(curve(w.f, w.a, w.harm), { tone: w.tone, open: true, bold: true, smooth: true }));
    els.push(seg(v(0, -0.15), v(0, 0.15), { tone: "ink" }), seg(v(5, -0.15), v(5, 0.15), { tone: "ink" }), txt(v(2.5, -1.15), "T (temel ses)", "s", { tone: "muted", small: true }));
    els.push(seg(v(0, -1.0), v(5, -1.0), { tone: "muted", thin: true }));
    els.push(txt(v(-0.3, 2.2), " ", "c"), txt(v(11.8, -2.2), " ", "c"));
    return { els, readout: [`${w.name}: ${w.note}`, w.why] };
  },
};

/* ---------- 3. Yankı ---------- */
const echo: FigureDef = {
  caption:
    "Sürgüyle zamanı ilerlet: ses 340 m/s ile duvara gider (0,30 s), yansıyıp aynı noktaya döner (0,30 s). Yankı 0,60 s'de duyulur; toplam yol 2d olduğundan d = v·t / 2 = 102 m.",
  alt: "Solda hoparlör ve kulak, sağda tuğla duvar. Aralarındaki yolda sağa giden, sonra sola dönen bir ses atması; altta 0 ile 0,60 s arası zaman çizgisi.",
  param: { label: "Zaman (s)", min: 0, max: 0.6, step: 0.01, init: 0, unit: "s", playMs: 6000 },
  draw: (t) => {
    const D = 8; // 102 m drawn as 8 units
    const vd = D / 0.3;
    const out = t <= 0.3;
    const x = out ? t * vd : D - (t - 0.3) * vd;
    const els: El[] = [];
    // Speaker.
    els.push(poly([v(-0.9, -0.35), v(-0.5, -0.35), v(-0.1, -0.7), v(-0.1, 0.7), v(-0.5, 0.35), v(-0.9, 0.35)], { tone: "ink", fill: "muted" }));
    // Wall of bricks.
    for (let r = 0; r < 6; r++) for (let c = 0; c < 2; c++) els.push(poly([v(D + 0.2 + c * 0.5 + (r % 2) * 0.25, -1.5 + r * 0.5), v(D + 0.68 + c * 0.5 + (r % 2) * 0.25, -1.5 + r * 0.5), v(D + 0.68 + c * 0.5 + (r % 2) * 0.25, -1.04 + r * 0.5), v(D + 0.2 + c * 0.5 + (r % 2) * 0.25, -1.04 + r * 0.5)], { tone: "warn", fill: "warn", thin: true }));
    // Pulse as three arcs facing its direction.
    const dir = out ? 1 : -1;
    for (const k of [0, 0.25, 0.5]) {
      const cx = x - dir * k;
      const arc: V[] = [];
      for (let i = -6; i <= 6; i++) {
        const a = (i / 6) * 0.9;
        arc.push(v(cx + dir * Math.cos(a) * 0.6 - dir * 0.6, Math.sin(a) * 0.6));
      }
      els.push(poly(arc, { tone: out ? "c" : "b", open: true, bold: k === 0, thin: k !== 0, smooth: true }));
    }
    els.push(vec(v(0.2, 1.3), v(D - 0.2, 1.3), { tone: "c", thin: !out }), txt(v(D / 2, 1.45), "gidiş: d", "n", { tone: "c", small: true }));
    els.push(vec(v(D - 0.2, -1.3), v(0.2, -1.3), { tone: "b", thin: out }), txt(v(D / 2, -1.45), "dönüş: d", "s", { tone: "b", small: true }));
    // Time line.
    els.push(seg(v(0, -2.6), v(D, -2.6), { tone: "muted" }), pt(v((t / 0.6) * D, -2.6), undefined, "c", "warn"), txt(v(0, -2.8), "0 s", "s", { tone: "muted", small: true }), txt(v(D, -2.8), "0,60 s", "s", { tone: "muted", small: true }));
    els.push(txt(v(-1.4, 2.2), " ", "c"), txt(v(D + 1.6, -3.4), " ", "c"));
    const gone = 340 * t;
    return {
      els,
      readout: [
        `t = ${t.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} s · sesin aldığı toplam yol = 340 × t = ${Math.round(gone)} m`,
        t >= 0.59 ? "Yankı duyuldu: toplam yol 204 m = 2d → d = 102 m. Kaynak ile alıcı ayrı yerdeyse /2 kuralını körlemesine kullanma." : out ? "Ses henüz duvara ulaşmadı." : "Ses duvardan yansıdı, geri dönüyor.",
      ],
    };
  },
};

/* ---------- 4. Tel uzunluğu yarıya (2020 TYT Fen 6 mantığı) ---------- */
const stringLen: FigureDef = {
  caption:
    "İleri ile gitar telinin titreşen kısmını L'den L/2'ye indir. Temel titreşimde iki ucu sabit telin üstünde yarım dalga vardır: λ = 2L. Aynı tel ve aynı gerginlikte dalga sürati değişmez, bu yüzden frekans iki katına çıkar.",
  alt: "Üstte iki ucu sabit uzun tel ve üzerinde tek kambur duran dalga; altta perdeye basılarak yarıya kısaltılmış tel ve daha kısa tek kambur.",
  steps: ["Uzunluk L", "Uzunluk L/2", "Ne değişti?"],
  draw: (_v, step) => {
    const els: El[] = [];
    const draw1 = (y: number, L: number, tone: Tone, on: boolean) => {
      const ps: V[] = [];
      const ps2: V[] = [];
      for (let i = 0; i <= 60; i++) {
        const x = (i / 60) * L;
        ps.push(v(x, y + 0.7 * Math.sin((Math.PI * x) / L)));
        ps2.push(v(x, y - 0.7 * Math.sin((Math.PI * x) / L)));
      }
      els.push(poly(ps, { tone: on ? tone : "muted", open: true, bold: on, smooth: true }), poly(ps2, { tone: on ? tone : "muted", open: true, dash: true, thin: true, smooth: true }));
      els.push(seg(v(0, y - 0.9), v(0, y + 0.9), { tone: "ink", bold: true }), seg(v(L, y - 0.9), v(L, y + 0.9), { tone: "ink", bold: true }));
    };
    draw1(1.5, 8, "b", step !== 1);
    els.push(txt(v(4, 2.45), "L · λ₁ = 2L", "n", { tone: "b", small: true, bold: true }));
    if (step >= 1) {
      draw1(-1.5, 4, "warn", true);
      els.push(seg(v(4, -2.4), v(8, -2.4), { tone: "muted", dash: true, thin: true }), txt(v(2, -2.5), "L/2 · λ₂ = L", "s", { tone: "warn", small: true, bold: true }));
      els.push(txt(v(4.1, -1.0), "perde", "e", { tone: "ink", small: true }));
    }
    els.push(txt(v(-0.6, 3), " ", "c"), txt(v(9.8, -3.2), " ", "c"));
    const rows: [string, string][] = [
      ["Temel mod: tel boyu yarım dalga boyudur, λ₁ = 2L.", "Örnek: v = 200 m/s, λ₁ = 2 m → f₁ = 100 Hz."],
      ["Titreşen boy L/2: λ₂ = 2·(L/2) = L, yani λ₂/λ₁ = 1/2.", "Örnek: λ₂ = 1 m, v aynı 200 m/s → f₂ = 200 Hz."],
      ["Aynı tel ve gerginlik: v₂ = v₁. v = λf olduğundan f₂/f₁ = λ₁/λ₂ = 2: ses daha tiz.", "Ses dalgası başka ortama geçerken f sabit kalır; burada ise kaynağın (telin) kendisi değişti."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 5. Deprem: odak, merkez üssü, yerel şiddet ---------- */
const quake: FigureDef = {
  caption:
    "Sürgüyle dalga cephelerini odaktan yay. Odak yer altında, merkez üssü onun yeryüzündeki izdüşümüdür. Tek depremin büyüklüğü tektir; A ve B kasabalarında hissedilen yerel şiddet uzaklık, zemin ve yapıya göre farklı olabilir.",
  alt: "Yer kesiti: üstte yeryüzü çizgisi, altında katmanlar; yer altındaki odaktan halka halka yayılan dalga cepheleri, yeryüzünde merkez üssü işareti ve iki yanda A (yumuşak zemin) ve B (kaya zemin) kasabaları.",
  param: { label: "Zaman", min: 0, max: 1, step: 0.02, init: 0.4, playMs: 5000 },
  draw: (t) => {
    const F = v(0, -2.6);
    const els: El[] = [];
    // Layers.
    els.push(poly([v(-7, 0), v(7, 0), v(7, -1.2), v(-7, -1.2)], { tone: "a", fill: "a", thin: true }));
    els.push(poly([v(-7, -1.2), v(7, -1.2), v(7, -4.2), v(-7, -4.2)], { tone: "muted", fill: "muted", thin: true }));
    // Soft basin under A.
    els.push(poly([v(-6.4, 0), v(-3.6, 0), v(-4.2, -0.8), v(-5.8, -0.8)], { tone: "warn", fill: "warn", thin: true, smooth: true }));
    for (let i = 1; i <= 4; i++) {
      const r = (t * 7 + (i - 1) * 1.6) % 7;
      if (r < 0.2) continue;
      const arc: V[] = [];
      for (let a = 0; a <= 72; a++) {
        const th = (a / 72) * TAU;
        const p = v(F[0] + Math.cos(th) * r, F[1] + Math.sin(th) * r);
        if (p[1] <= 0 && p[1] >= -4.2 && Math.abs(p[0]) <= 7) arc.push(p);
        else if (arc.length > 1) {
          els.push(poly(arc.splice(0), { tone: "c", open: true, thin: true, smooth: true }));
        } else arc.length = 0;
      }
      if (arc.length > 1) els.push(poly(arc, { tone: "c", open: true, thin: true, smooth: true }));
    }
    els.push(circle(F, 0.18, { tone: "warn", fill: "warn" }), txt(v(0.3, F[1]), "odak (yer altında)", "e", { tone: "warn", small: true, bold: true }));
    els.push(seg(F, v(0, 0), { tone: "warn", dash: true, thin: true }), poly([v(0, 0.05), v(-0.25, 0.45), v(0.25, 0.45)], { tone: "warn", fill: "warn" }), txt(v(0, 0.6), "merkez üssü", "n", { tone: "warn", small: true, bold: true }));
    const house = (x: number, tone: Tone, label: string) => {
      els.push(poly([v(x - 0.35, 0), v(x + 0.35, 0), v(x + 0.35, 0.45), v(x, 0.75), v(x - 0.35, 0.45)], { tone, fill: tone }));
      els.push(txt(v(x, 0.95), label, "n", { tone, small: true, bold: true }));
    };
    house(-5, "warn", "A · yumuşak zemin");
    house(4.6, "b", "B · kaya zemin");
    els.push(txt(v(-7.4, 2.1), " ", "c"), txt(v(7.4, -4.4), " ", "c"));
    return {
      els,
      readout: [
        "Büyüklük kaynağın ölçeğidir: bu deprem için tek değerdir, kasabaya göre değişmez.",
        "Yerel şiddet A'da daha yüksek olabilir: yumuşak zemin sarsıntıyı büyütebilir, yapı dayanımı da etkilidir. Daha çok hasar, daha büyük “büyüklük” kanıtı değildir.",
      ],
    };
  },
};

export const physicsFiguresSound: Record<string, Record<string, FigureDef>> = {
  "ses-deprem-dalgalari": {
    "Ses bir ortam titreşimidir": longitudinal,
    "Yükseklik sözcüğünün iki anlamını çöz": pitch,
    "Yankıda mesafeyi iki kez say": echo,
    "Kaynağı değiştirerek notayı değiştir": stringLen,
    "Büyüklük ve yerel şiddet farklıdır": quake,
  },
};
