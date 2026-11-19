import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Madde ve özkütle. Graduated cylinder with meniscus and a real rise from
 * 45 to 57 mL; m–V graphs drawn to scale from the guide's numbers (slope = d,
 * intercept = container); 2024 TYT Fen 1 style slope comparison with original
 * values; equal-volume vs equal-mass mixtures; capillary tubes whose rise is
 * inversely proportional to the bore (wetting water up, mercury down).
 */

const fmt = (x: number, d = 2) => x.toLocaleString("tr-TR", { maximumFractionDigits: d });

/* ---------- 1. Mezürde hacim ---------- */
function cylinder(level: number, stone: boolean): El[] {
  // Inner width 1.6, 0–80 mL mapped to 0–4 units.
  const Y = (ml: number) => ml * 0.05;
  const els: El[] = [];
  const top = Y(level);
  // Liquid with a concave (water) meniscus.
  els.push(poly([v(-0.8, 0), v(0.8, 0), v(0.8, top + 0.08), v(0.4, top), v(0, top - 0.04), v(-0.4, top), v(-0.8, top + 0.08)], { tone: "b", fill: "b", thin: true, smooth: false }));
  els.push(poly([v(-0.8, 4.4), v(-0.8, 0), v(0.8, 0), v(0.8, 4.4)], { tone: "ink", open: true, bold: true }));
  els.push(poly([v(-1.1, 0), v(1.1, 0), v(1.1, -0.2), v(-1.1, -0.2)], { tone: "ink", fill: "muted", thin: true }));
  for (let ml = 0; ml <= 80; ml += 5) {
    const major = ml % 10 === 0;
    els.push(seg(v(0.8, Y(ml)), v(major ? 0.45 : 0.6, Y(ml)), { tone: "ink", thin: true }));
    if (major && ml > 0) els.push(txt(v(0.95, Y(ml)), String(ml), "e", { tone: "muted", small: true }));
  }
  if (stone) els.push(poly([v(-0.45, 0.05), v(0.2, 0.08), v(0.5, 0.35), v(0.3, 0.7), v(-0.2, 0.75), v(-0.5, 0.45)], { tone: "muted", fill: "muted", smooth: true }));
  return els;
}
const mezur: FigureDef = {
  caption:
    "İleri ile mezürü oku: önce 45 mL su, sonra 96 g'lık taş tamamen batırılınca seviye 57 mL. Taşın hacmi farktır: 57 − 45 = 12 cm³ (1 mL = 1 cm³), özkütle 96 / 12 = 8 g/cm³. Okumayı göz hizasından, çukur yüzeyin (menisküs) altından yap.",
  alt: "Ölçekli bir mezür; önce 45 çizgisinde, taş atılınca 57 çizgisinde mavi su yüzeyi; yüzeyin ortası hafif çukur. Göz hizasını gösteren yatay ok.",
  steps: ["İlk okuma", "Taşı batır", "Fark = hacim"],
  draw: (_v, step) => {
    const level = step === 0 ? 45 : 57;
    const els = cylinder(level, step >= 1);
    const y = level * 0.05;
    els.push(vec(v(-2.6, y - 0.04), v(-0.9, y - 0.04), { tone: "warn", thin: true }), txt(v(-2.7, y), `göz hizası: ${level} mL`, "w", { tone: "warn", small: true, bold: true }));
    if (step === 2) {
      els.push(seg(v(-1.2, 45 * 0.05), v(-1.2, 57 * 0.05), { tone: "c", bold: true }), seg(v(-1.35, 45 * 0.05), v(-1.05, 45 * 0.05), { tone: "c" }), txt(v(-1.35, 51 * 0.05), "12 mL", "w", { tone: "c", small: true, bold: true }));
    }
    els.push(txt(v(-5.4, 4.6), " ", "c"), txt(v(2.2, -0.5), " ", "c"));
    const rows: [string, string][] = [
      ["İlk okuma: 45 mL. Su camı ıslattığı için yüzey çukurdur; çukurun alt çizgisi okunur.", "Kenardaki yükselmiş su adezyonun (su–cam çekimi) izidir."],
      ["Taş tamamen batınca seviye 57 mL. Taş çözünmüyor, su emmiyor, üstünde hava kabarcığı yok.", "Yüzen bir cisimde yükselme yalnız batan kısmın hacmidir."],
      ["V = 57 − 45 = 12 cm³ · d = 96 / 12 = 8 g/cm³ · kontrol: 8 × 12 = 96 g.", "57'yi taşın hacmi sanmak en sık hatadır: son okuma su + taştır."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 2. Dara içeren m–V grafiği ---------- */
const GX = (V: number) => V * 0.18;
const GY = (m: number) => m * 0.03;
function axes(maxV: number, maxM: number, vt: number[], mt: number[]): El[] {
  const els: El[] = [vec(v(0, 0), v(GX(maxV), 0), { tone: "ink" }), vec(v(0, 0), v(0, GY(maxM)), { tone: "ink" })];
  for (const t of vt) els.push(seg(v(GX(t), -0.08), v(GX(t), 0.08), { tone: "ink" }), txt(v(GX(t), -0.2), String(t), "s", { tone: "ink", small: true }));
  for (const t of mt) els.push(seg(v(-0.08, GY(t)), v(0.08, GY(t)), { tone: "ink" }), txt(v(-0.15, GY(t)), String(t), "w", { tone: "ink", small: true }));
  els.push(txt(v(GX(maxV) + 0.1, 0), "V (cm³)", "e", { tone: "ink", small: true }), txt(v(0, GY(maxM) + 0.15), "m (g)", "n", { tone: "ink", small: true }));
  return els;
}
const tare: FigureDef = {
  caption:
    "İleri ile kap + sıvı grafiğini çöz: V = 10 cm³'te 70 g, 30 cm³'te 130 g. Doğru orijinden geçmiyor; eğim sıvının özkütlesi (3 g/cm³), düşey eksen kesişimi boş kabın kütlesidir (40 g).",
  alt: "m–V grafiği: (10, 70) ve (30, 130) noktalarından geçen, düşey ekseni 40'ta kesen doğru; eğim üçgeni ve kesişim noktası işaretli.",
  steps: ["İki ölçüm", "Eğim = d", "Kesişim = kap", "Tuzak: m/V"],
  draw: (_v, step) => {
    const els = axes(40, 170, [10, 20, 30, 40], [40, 70, 130]);
    const p1 = v(GX(10), GY(70));
    const p2 = v(GX(30), GY(130));
    if (step >= 1) els.push(seg(v(0, GY(40)), v(GX(40), GY(160)), { tone: "c", bold: true }));
    if (step === 1) els.push(seg(p1, v(p2[0], p1[1]), { tone: "warn", dash: true }), seg(v(p2[0], p1[1]), p2, { tone: "warn", dash: true }), txt(v((p1[0] + p2[0]) / 2, p1[1] - 0.15), "ΔV = 20", "s", { tone: "warn", small: true }), txt(v(p2[0] + 0.1, (p1[1] + p2[1]) / 2), "Δm = 60", "e", { tone: "warn", small: true }));
    if (step >= 2) els.push(circle(v(0, GY(40)), 0.13, { tone: "a", fill: "a" }), txt(v(0.2, GY(40) - 0.1), "boş kap 40 g", "se", { tone: "a", small: true, bold: true }));
    if (step === 3) els.push(seg(v(0, 0), p1, { tone: "warn", dash: true }), txt(v(p1[0] - 0.2, p1[1] + 0.2), "70 / 10 = 7 ✗", "nw", { tone: "warn", small: true, bold: true }));
    els.push(circle(p1, 0.12, { tone: "ink", fill: "ink" }), circle(p2, 0.12, { tone: "ink", fill: "ink" }));
    els.push(txt(v(-1.2, 5.6), " ", "c"), txt(v(8.4, -0.7), " ", "c"));
    const rows: [string, string][] = [
      ["Ölçümler kap + sıvı: (10 cm³, 70 g) ve (30 cm³, 130 g).", "Her ölçümde aynı boş kap tartılıyor."],
      ["Eğim = Δm / ΔV = (130 − 70) / (30 − 10) = 60 / 20 = 3 g/cm³: sıvının özkütlesi.", "Kap kütlesi iki ölçümde de aynı olduğu için farkta yok olur."],
      ["10 cm³ sıvı 3 × 10 = 30 g → kap = 70 − 30 = 40 g. Doğru düşey ekseni 40'ta keser.", "Kontrol: 40 + 3 × 30 = 130 g."],
      ["70 / 10 = 7 g/cm³ yazmak kabın kütlesini sıvıya katar: yanlış.", "Eksenler ters olsaydı (V düşey, m yatay) eğim 1/d olurdu."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 3. Eğimler ve yüzme (2024 TYT Fen 1 mantığı, özgün değerler) ---------- */
const LINES: { name: string; d: number; tone: Tone }[] = [
  { name: "A sıvısı", d: 1.6, tone: "b" },
  { name: "kırmızı boya", d: 1.3, tone: "warn" },
  { name: "yeşil boya", d: 1.1, tone: "c" },
  { name: "B sıvısı", d: 0.8, tone: "muted" },
];
const slopes: FigureDef = {
  caption:
    "Sürgüyle karışımdaki A oranını değiştir. Orijinden geçen her doğrunun eğimi o maddenin özkütlesidir: daha dik = daha yoğun. Boyaların üstte kalması için taşıyıcı sıvı ikisinden de yoğun olmalı; A ile B'nin her karışımı değil, A oranı yeterince büyük olanı uygundur. Değerler özgündür.",
  alt: "Orijinden çıkan dört doğru: en dik A sıvısı, sonra kırmızı boya, yeşil boya, en yatık B sıvısı. Sürgüye göre değişen kesik karışım doğrusu.",
  param: { label: "Karışımda A'nın hacim payı", min: 0, max: 100, step: 10, init: 50, unit: "%" },
  draw: (pct) => {
    const f = pct / 100;
    const dm = f * 1.6 + (1 - f) * 0.8;
    const X = (V: number) => V * 0.16;
    const Y = (m: number) => m * 0.11;
    const els: El[] = [vec(v(0, 0), v(X(42), 0), { tone: "ink" }), vec(v(0, 0), v(0, Y(70)), { tone: "ink" })];
    els.push(txt(v(X(42) + 0.1, 0), "V", "e", { tone: "ink", small: true }), txt(v(0, Y(70) + 0.15), "m", "n", { tone: "ink", small: true }));
    LINES.forEach((l, i) => {
      const V1 = Math.min(40, 62 / l.d);
      els.push(seg(v(0, 0), v(X(V1), Y(l.d * V1)), { tone: l.tone, bold: i === 1 || i === 2 }));
      els.push(txt(v(X(V1) + 0.1, Y(l.d * V1)), `${l.name} (${fmt(l.d)})`, "e", { tone: l.tone, small: true, bold: true }));
    });
    const Vm = Math.min(40, 62 / dm);
    els.push(seg(v(0, 0), v(X(Vm), Y(dm * Vm)), { tone: "ink", dash: true, bold: true }));
    els.push(txt(v(-0.6, 8.4), " ", "c"), txt(v(10.6, -0.4), " ", "c"));
    const ok = dm > 1.3;
    return {
      els,
      readout: [
        `%${pct} A + %${100 - pct} B → d = ${fmt(dm)} g/cm³ (hacimler toplanıyor kabulüyle)`,
        ok ? "Karışım iki boyadan da yoğun: iki boya da üstte kalabilir." : dm > 1.1 ? "Yeşil boya yüzer, kırmızı boya batar: bu oran uygun değil." : "Karışım iki boyadan da az yoğun: ikisi de batar.",
      ],
    };
  },
};

/* ---------- 4. Eşit hacim ile eşit kütle ---------- */
const mix: FigureDef = {
  caption:
    "İleri ile d₁ = 1 ve d₂ = 3 g/cm³ sıvıları önce eşit hacimde, sonra eşit kütlede karıştır. Önce korunan kütleyi yaz, sonra toplam hacme böl. Eşit hacimde sonuç 2, eşit kütlede 1,5 g/cm³: “iki yoğunluğu topla ikiye böl” yalnız eşit hacimde doğrudur.",
  alt: "İki beher: solda eşit yükseklikte mavi (1 g/cm³) ve kırmızı (3 g/cm³) katmanlar, sağda üç kat yüksek mavi ve bir kat kırmızı katman; altlarında kütle ve hacim değerleri.",
  steps: ["Eşit hacim", "Eşit kütle", "Karşılaştır"],
  draw: (_v, step) => {
    const els: El[] = [];
    const beaker = (x: number, v1: number, v2: number, label: string, on: boolean) => {
      const H = (ml: number) => ml * 0.09;
      els.push(poly([v(x - 0.9, 0), v(x + 0.9, 0), v(x + 0.9, H(v2)), v(x - 0.9, H(v2))], { tone: on ? "warn" : "muted", fill: on ? "warn" : "muted", thin: true }));
      els.push(poly([v(x - 0.9, H(v2)), v(x + 0.9, H(v2)), v(x + 0.9, H(v1 + v2)), v(x - 0.9, H(v1 + v2))], { tone: on ? "b" : "muted", fill: on ? "b" : "muted", thin: true }));
      els.push(poly([v(x - 0.9, 4.0), v(x - 0.9, 0), v(x + 0.9, 0), v(x + 0.9, 4.0)], { tone: "ink", open: true, bold: true }));
      els.push(txt(v(x + 1.0, H(v2) / 2), `${v2} cm³ · ${v2 * 3} g`, "e", { tone: on ? "warn" : "muted", small: true }));
      els.push(txt(v(x + 1.0, H(v2) + H(v1) / 2), `${v1} cm³ · ${v1} g`, "e", { tone: on ? "b" : "muted", small: true }));
      els.push(txt(v(x, -0.25), label, "s", { tone: on ? "ink" : "muted", small: true, bold: on }));
    };
    beaker(0, 10, 10, "eşit hacim: d = 2", step === 0 || step === 2);
    beaker(6.6, 30, 10, "eşit kütle: d = 1,5", step >= 1);
    els.push(txt(v(-1.6, 4.4), " ", "c"), txt(v(10.2, -0.9), " ", "c"));
    const rows: [string, string][] = [
      ["10'ar cm³: m = 10 + 30 = 40 g, V = 20 cm³ → d = 2 g/cm³ (aritmetik ortalama).", "Kolay sayı seçmek oranları değiştirmediği için güvenlidir."],
      ["30'ar g: V₁ = 30, V₂ = 10 cm³ → m = 60 g, V = 40 cm³ → d = 1,5 g/cm³.", "Eşit kütlede az yoğun sıvının hacmi büyük olduğu için sonuç ona yakın çıkar: 2d₁d₂/(d₁ + d₂)."],
      ["İkisi de 1 ile 3 arasında ama farklı: koşul (eşit hacim mi, eşit kütle mi?) sonucu değiştirir.", "Karışım hacmi büzülüyorsa V₁ + V₂ yerine ölçülen son hacim kullanılır."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 5. Kılcallık ---------- */
const capillary: FigureDef = {
  caption:
    "İleri ile üç farklı çaptaki cam boruyu suya, sonra cıvaya daldır. Su camı ıslatır (adezyon > kohezyon): borularda yükselir, yüzeyi çukurdur ve dar boruda daha çok yükselir. Cıva camı ıslatmaz: borularda alçalır, yüzeyi tümsektir. Yükseklik farkı boru çapıyla ters orantılı çizildi.",
  alt: "Kapta sıvı ve içine daldırılmış üç ince cam boru: kalın, orta, ince. Suda borulardaki seviye dış seviyeden yüksek ve incede en yüksek; cıvada borulardaki seviye dış seviyeden alçak.",
  steps: ["Su: yükselme", "Cıva: alçalma", "Neden?"],
  draw: (_v, step) => {
    const water = step !== 1;
    const tone: Tone = water ? "b" : "muted";
    const base = 1.6;
    const tubes = [
      { x: -2.4, r: 0.45 },
      { x: 0, r: 0.27 },
      { x: 2.2, r: 0.14 },
    ];
    const els: El[] = [];
    // Outer liquid drawn around the tubes (their inside is drawn separately),
    // with the tube bottoms open below y = 0.5.
    const edges = [-4, ...tubes.flatMap((t) => [t.x - t.r - 0.05, t.x + t.r + 0.05]), 4];
    for (let i = 0; i < edges.length; i += 2) els.push(poly([v(edges[i], 0), v(edges[i + 1], 0), v(edges[i + 1], base), v(edges[i], base)], { tone, fill: tone, bare: true }));
    for (const t of tubes) els.push(poly([v(t.x - t.r - 0.05, 0), v(t.x + t.r + 0.05, 0), v(t.x + t.r + 0.05, 0.5), v(t.x - t.r - 0.05, 0.5)], { tone, fill: tone, bare: true }));
    els.push(seg(v(-4, base), v(4, base), { tone, thin: true, dash: true }));
    els.push(poly([v(-4, 3.6), v(-4, 0), v(4, 0), v(4, 3.6)], { tone: "ink", open: true, bold: true }));
    for (const t of tubes) {
      const h = (water ? 0.32 : -0.12) / t.r;
      const top = base + h;
      // Liquid column with meniscus: concave for water, convex for mercury.
      const dip = water ? -0.08 : 0.08;
      els.push(poly([v(t.x - t.r, 0.5), v(t.x + t.r, 0.5), v(t.x + t.r, top), v(t.x, top + dip), v(t.x - t.r, top)], { tone, fill: tone, thin: true, smooth: false }));
      els.push(seg(v(t.x - t.r - 0.05, 0.5), v(t.x - t.r - 0.05, 5.4), { tone: "ink", thin: true }), seg(v(t.x + t.r + 0.05, 0.5), v(t.x + t.r + 0.05, 5.4), { tone: "ink", thin: true }));
      els.push(seg(v(t.x + t.r + 0.2, base), v(t.x + t.r + 0.2, top), { tone: "warn", bold: true }));
    }
    els.push(txt(v(-4.2, base), "dış seviye", "w", { tone: "muted", small: true }));
    if (step === 2) {
      els.push(ball(v(-3.3, 4.8), 0.22, "b", "su"), txt(v(-3.0, 4.8), "su–cam çekimi (adezyon) > su–su çekimi (kohezyon)", "e", { tone: "b", small: true }));
    }
    els.push(txt(v(-6.4, 5.8), " ", "c"), txt(v(5.4, -0.4), " ", "c"));
    const rows: [string, string][] = [
      ["Su camı ıslatır: borularda dış seviyeden yükselir. İnce boruda yükselme en fazla.", "Aynı sıvı, aynı temiz cam ve aynı sıcaklıkta daha dar boru → daha büyük seviye farkı."],
      ["Cıva camı ıslatmaz: borularda dış seviyeden alçalır, yüzeyi tümsektir.", "Kohezyonu adezyondan baskın sıvıda kılcal alçalma görülür."],
      ["Yükselme mi alçalma mı, adezyon ile kohezyonun karşılaştırmasına bağlıdır; ne kadar olduğu boru çapına.", "Bitkide suyun taşınmasını yalnız kılcallığa indirgeme; başka etkenler de vardır."],
    ];
    return { els, readout: rows[step] };
  },
};

export const physicsFiguresMatter: Record<string, Record<string, FigureDef>> = {
  "madde-ozkutle": {
    "Hacim ölçerken boşluk ve batma koşuluna bak": mezur,
    "Dara içeren m–V grafiği": tare,
    "Özkütle oranı neden miktara bağlı değildir?": slopes,
    "Karışımda kütle ve son hacmi ayır": mix,
    "Yapışma, yüzey ve kılcal boru": capillary,
  },
};

