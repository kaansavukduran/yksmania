import { ball, circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Simyadan kimyaya. Aristotle's four qualities as a historical model set
 * against the modern classification, filtration versus distillation drawn as
 * simple glassware (sand stays on the paper, dissolved salt passes, only the
 * condensed vapour is collected), and a closed-vessel balance in which the
 * solid gains exactly what the gas loses while an open vessel loses mass to
 * the room. Numbers follow the guide examples; glassware is schematic.
 */

/* ---------- 1. Aristo'nun nitelik karesi ---------- */
const aristo: FigureDef = {
  caption:
    "İleri ile tarihsel modeli bugünkü sınıflandırmayla karşılaştır. Aristo dört unsuru iki nitelik çiftiyle eşleştirdi: ateş sıcak-kuru, hava sıcak-ıslak, su soğuk-ıslak, toprak soğuk-kuru. Model içindeki soru model içinde yanıtlanır; bugünkü ölçüt (element = tek tür atom) ile su bileşik, hava ve toprak karışımdır, ateş madde adı değildir.",
  alt: "Kare: köşelerde ateş, hava, su, toprak; kenarlarda sıcak, ıslak, soğuk, kuru nitelikleri. Son adımda her unsurun altında bugünkü sınıfı yazar.",
  steps: ["Nitelikler", "Soğuk + ıslak = ?", "Bugünkü sınıflandırma"],
  draw: (_v, step) => {
    const els: El[] = [];
    const C: Record<string, V> = { ateş: v(0, 3), hava: v(3, 3), su: v(3, 0), toprak: v(0, 0) };
    const tone: Record<string, Tone> = { ateş: "warn", hava: "b", su: "c", toprak: "a" };
    els.push(poly([C.ateş, C.hava, C.su, C.toprak], { tone: "muted", thin: true }));
    const side = (a: V, b: V, s: string, at: "n" | "s" | "e" | "w", hi: boolean) => els.push(txt(v((a[0] + b[0]) / 2, (a[1] + b[1]) / 2), s, at, { tone: hi ? "ink" : "muted", small: true, bold: hi }));
    side(C.ateş, C.hava, "sıcak", "n", false);
    side(C.su, C.toprak, "soğuk", "s", step === 1);
    side(C.hava, C.su, "ıslak", "e", step === 1);
    side(C.toprak, C.ateş, "kuru", "w", false);
    const modern: Record<string, string> = { ateş: "yanma olayı", hava: "karışım", su: "bileşik (H₂O)", toprak: "karışım" };
    for (const k of Object.keys(C)) {
      const p = C[k];
      const hi = step === 1 ? k === "su" : true;
      els.push(ball(p, 0.32, hi ? tone[k] : "muted"));
      const out: "nw" | "ne" | "se" | "sw" = k === "ateş" ? "nw" : k === "hava" ? "ne" : k === "su" ? "se" : "sw";
      els.push(txt(p, k.toLocaleUpperCase("tr-TR"), out, { tone: hi ? "ink" : "muted", small: true, bold: true }));
      if (step === 2) els.push(txt(v(p[0], p[1] + (p[1] > 1 ? 0.95 : -0.95)), modern[k], p[1] > 1 ? "n" : "s", { tone: "muted", small: true }));
    }
    els.push(txt(v(-3.4, 4.9), " ", "c"), txt(v(6.4, -1.9), " ", "c"));
    const rows: [string, string][] = [
      ["Her köşe bir unsur, her kenar bir nitelik. Bir unsur, iki komşu kenarın niteliğini taşır.", "Bu tarihsel bir modeldir; nicel ölçüm ve sınama içermez."],
      ["Soğuk ile ıslak kenarlarının kesiştiği köşe: su (Aristo'ya göre).", "Soru model adını veriyorsa yanıt o modelin içinden verilir."],
      ["Bugünkü ölçüt: element, tek tür atom içeren saf maddedir. Su bileşik; hava ve toprak karışım.", "Tuzak: \"Aristo'ya göre unsur\" demek \"bugün element\" demek değildir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 2. Süzme ve damıtma ---------- */
const separate: FigureDef = {
  caption:
    "İleri ile iki ayırma tekniğini koşuluna göre izle. Süzme, sıvıda çözünmeyen katıyı (kum) filtre kâğıdında tutar. Suda çözünmüş tuz kâğıttan geçer; süzme onu ayırmaz. Suyu geri toplamak için damıtma gerekir: su buharlaşır, soğutucuda yoğunlaşır ve ayrı kapta toplanır, tuz balonda kalır.",
  alt: "Solda huni, içinde filtre kâğıdı ve altında beher; sağda ısıtılan balon, eğik soğutucu ve toplama kabı. Adımlara göre kum taneleri kâğıtta kalır, tuz iyonları geçer ya da su buharı soğutucudan geçip damla olarak toplanır.",
  steps: ["Kumlu su: süzme", "Tuzlu su: süzme işe yaramaz", "Tuzlu su: damıtma"],
  draw: (_v, step) => {
    const els: El[] = [];
    const filt = step < 2;
    const ft: Tone = filt ? "ink" : "muted";
    // Funnel with filter paper and beaker.
    els.push(poly([v(-4.6, 3), v(-2.4, 3), v(-3.3, 1.6), v(-3.3, 0.9), v(-3.7, 0.9), v(-3.7, 1.6)], { tone: ft, thin: !filt }));
    els.push(poly([v(-4.4, 2.9), v(-2.6, 2.9), v(-3.5, 1.7)], { tone: filt ? "a" : "muted", dash: true, thin: true }));
    els.push(poly([v(-4.4, 0.6), v(-4.4, -1.4), v(-2.6, -1.4), v(-2.6, 0.6)], { tone: ft, open: true, thin: !filt }));
    els.push(poly([v(-4.4, -0.4), v(-2.6, -0.4), v(-2.6, -1.4), v(-4.4, -1.4)], { tone: filt ? "b" : "muted", fill: filt ? "b" : undefined, bare: true }));
    if (step === 0) {
      for (const p of [v(-3.9, 2.4), v(-3.6, 2.2), v(-3.3, 2.5), v(-3.0, 2.6), v(-3.5, 2.0), v(-3.2, 2.2)]) els.push(ball(p, 0.1, "warn"));
      els.push(txt(v(-2.3, 2.3), "kum kâğıtta kalır", "e", { tone: "warn", small: true, bold: true }));
    }
    if (step === 1) {
      for (const p of [v(-3.9, 2.4), v(-3.3, 2.5), v(-3.5, 1.1), v(-4.0, -0.8), v(-3.2, -1.0), v(-3.6, -0.6)]) els.push(circle(p, 0.08, { tone: "c", fill: "c" }));
      els.push(txt(v(-2.3, -0.9), "çözünmüş tuz da geçer", "e", { tone: "c", small: true, bold: true }));
    }
    els.push(txt(v(-3.5, -1.6), "süzme", "s", { tone: filt ? "ink" : "muted", small: true, bold: filt }));
    // Distillation: flask, condenser, receiver.
    const dt: Tone = step === 2 ? "ink" : "muted";
    const fl: V = v(2.2, 0.2);
    // Round-bottom flask: a full circle with a straight neck on top.
    els.push(circle(fl, 0.8, { tone: dt, thin: step !== 2 }));
    els.push(poly([v(fl[0] - 0.22, fl[1] + 0.77), v(fl[0] - 0.22, 1.75), v(fl[0] + 0.22, 1.75), v(fl[0] + 0.22, fl[1] + 0.77)], { tone: dt, open: true, thin: step !== 2 }));
    els.push(poly([v(fl[0] - 0.62, -0.3), v(fl[0] + 0.62, -0.3), v(fl[0] + 0.38, -0.5), v(fl[0] - 0.38, -0.5)], { tone: step === 2 ? "c" : "muted", fill: step === 2 ? "c" : undefined, bare: true }));
    // Condenser: inner tube and cooling jacket.
    const c0: V = v(2.42, 1.65);
    const c1: V = v(5.3, 0.55);
    els.push(seg(c0, c1, { tone: dt, bold: step === 2 }), poly([v(3.0, 1.85), v(5.0, 0.99), v(4.84, 0.62), v(2.84, 1.48)], { tone: step === 2 ? "b" : "muted", thin: true }));
    els.push(seg(c1, v(5.3, 0.0), { tone: dt }));
    // Receiver.
    els.push(poly([v(4.8, 0.2), v(4.8, -1.4), v(5.8, -1.4), v(5.8, 0.2)], { tone: dt, open: true, thin: step !== 2 }));
    if (step === 2) {
      els.push(poly([v(4.8, -0.8), v(5.8, -0.8), v(5.8, -1.4), v(4.8, -1.4)], { tone: "b", fill: "b", bare: true }));
      els.push(vec(v(fl[0], 1.0), v(fl[0], 1.6), { tone: "muted", thin: true }), txt(v(fl[0], 1.8), "su buharı", "n", { tone: "ink", small: true }));
      for (const p of [v(4.0, 1.12), v(4.6, 0.86)]) els.push(ball(p, 0.07, "b"));
      els.push(txt(v(5.95, -1.1), "saf su", "e", { tone: "b", small: true, bold: true }), txt(v(fl[0] - 0.85, -0.3), "tuz kalır", "w", { tone: "c", small: true, bold: true }));
      // Heat source under the flask.
      els.push(poly([v(1.95, -1.25), v(2.2, -0.75), v(2.45, -1.25)], { tone: "warn", fill: "warn" }), txt(v(2.5, -1.05), "ısı", "e", { tone: "warn", small: true }));
    }
    els.push(txt(v(3.7, -1.6), "damıtma", "s", { tone: dt, small: true, bold: step === 2 }));
    els.push(txt(v(-5.2, 3.6), " ", "c"), txt(v(7.6, -2.3), " ", "c"));
    const rows: [string, string][] = [
      ["Kum suda çözünmez: filtre kâğıdında tutulur, su beherde toplanır.", "Süzmede maddelerin kimliği değişmez: fiziksel ayırmadır."],
      ["Tuz suda çözünmüştür: iyonları kâğıttan geçer, beherde yine tuzlu su olur.", "İlk hatayı yakala: \"içinde katı var, süzerim\" koşulu denetlemez."],
      ["Isı ile su buharlaşır, soğutucuda yoğunlaşır, ayrı kapta saf su toplanır; tuz balonda kalır.", "Yalnız \"ısıttı\" demek damıtma değildir: yoğunlaştırma ve toplama olmalı."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 3. Kapalı ve açık kapta tartım ---------- */
const closed: FigureDef = {
  caption:
    "Sürgüyle tepkimeyi ilerlet. Kapalı düzeneğin toplamı 148 g: katı oksijenle birleşip 20 g'dan 26 g'a çıkarken kaptaki gaz ve geri kalan kısım 128 g'dan 122 g'a iner, toplam değişmez (Lavoisier). Son adımda kapak açılırsa kaçan gaz tartıma girmez; azalan tartım kütlenin yok olduğunu göstermez.",
  alt: "Kefeli terazi üzerinde kapalı cam kap; içinde katı yığını ve gaz molekülleri. Sürgü ilerledikçe katı büyür, gaz molekülleri azalır, terazinin göstergesi 148 g'da kalır. Açık kap durumunda moleküller kaptan çıkar ve gösterge düşer.",
  param: { label: "İlerleme (açık kap: 1'in üstü)", min: 0, max: 1.5, step: 0.1, init: 0 },
  draw: (p) => {
    const t = Math.min(p, 1);
    const open = p > 1;
    const solid = 20 + 6 * t;
    const escaped = open ? (p - 1) * 2 * 4 : 0; // up to 4 g of other gas leaves
    const total = 148 - escaped;
    const els: El[] = [];
    // Balance pan and display.
    els.push(poly([v(-2.6, -0.4), v(2.6, -0.4), v(2.2, -1.2), v(-2.2, -1.2)], { tone: "muted", fill: "muted" }));
    els.push(poly([v(-1.1, -0.65), v(1.1, -0.65), v(1.1, -1.05), v(-1.1, -1.05)], { tone: "ink" }), txt(v(0, -0.85), `${fmt(total, 1)} g`, "c", { tone: open && escaped > 0 ? "warn" : "ink", small: true, bold: true }));
    // Glass vessel.
    els.push(poly([v(-1.8, -0.4), v(-1.8, 2.4), v(1.8, 2.4), v(1.8, -0.4)], { tone: "b", thin: true, open: false }));
    if (!open) els.push(seg(v(-2.0, 2.4), v(2.0, 2.4), { tone: "ink", bold: true }));
    else els.push(seg(v(-2.0, 2.4), v(-0.6, 2.4), { tone: "ink", bold: true }), seg(v(0.6, 2.75), v(2.0, 3.2), { tone: "ink", bold: true }));
    // Solid heap grows.
    const h = 0.35 + 0.35 * t;
    els.push(poly([v(-1.3, -0.4), v(1.3, -0.4), v(0.9, -0.4 + h), v(-0.9, -0.4 + h)], { tone: "a", fill: "a" }));
    // Gas molecules: fewer as the solid grows; some leave if open.
    const spots: V[] = [v(-1.2, 1.9), v(-0.4, 1.6), v(0.6, 2.0), v(1.3, 1.5), v(-1.0, 1.0), v(0.2, 1.1), v(1.0, 0.9), v(-0.3, 0.6)];
    const left = Math.round(8 - 4 * t);
    spots.slice(0, left).forEach((s, i) => {
      const out = open && i < Math.round((p - 1) * 2 * 3);
      els.push(ball(out ? v(s[0] * 0.4, 3.2 + i * 0.25) : s, 0.11, out ? "warn" : "c"));
    });
    els.push(txt(v(2.0, -0.4 + h / 2), `katı ${fmt(solid, 1)} g`, "e", { tone: "a", small: true, bold: true }), txt(v(2.0, 1.4), `gaz + kap ${fmt(148 - solid - escaped, 1)} g`, "e", { tone: "c", small: true }));
    els.push(txt(v(-4.2, 4.6), " ", "c"), txt(v(6.6, -1.5), " ", "c"));
    return {
      els,
      readout: open
        ? [`Kap açık: ${fmt(escaped, 1)} g gaz tartımın dışına çıktı, gösterge ${fmt(total, 1)} g.`, "Kütle yok olmadı; sistem sınırı değişti. Açık kaptaki tartıma kapalı sistem eşitliği uygulanmaz."]
        : [`Katı +${fmt(6 * t, 1)} g, geri kalan −${fmt(6 * t, 1)} g, toplam 148 g.`, "Kısa yol: toplam sabitse bir parçanın artışı ötekinin azalışıdır (yalnız aynı kapalı sistemde)."],
    };
  },
};

export const chemistryFiguresAlchemy: Record<string, Record<string, FigureDef>> = {
  "simyadan-kimyaya": {
    "Dört element düşüncesini tarihsel model olarak oku": aristo,
    "Ayırma tekniğini hedeften seç": separate,
    "Kütleyi hangi sistemde ölçtüğünü belirle": closed,
  },
};
