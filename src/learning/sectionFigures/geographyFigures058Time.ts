import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type V } from "./figureKit";

/*
 * TYT Coğrafya · Yerel saat (Forge058). Okul modeli: 360° dönüş 24 saat,
 * 1° = 4 dakika; doğu boylamı pozitif. Örnekler bölüm metnindedir:
 * 30°D → 45°D (+15°, +60 dk), 30°D ile 30°B (60°), 00.20 − 240 dk = önceki
 * gün 20.20, 23.40 + 80 dk = ertesi gün 01.00, 30°D'nin karşısı 150°B,
 * Türkiye ortak saati UTC+3 ve ideal merkez boylamı 45°D.
 */

const lon = (x: number) => (x === 0 ? "0°" : Math.abs(x) === 180 ? "180°" : `${Math.abs(x)}°${x > 0 ? "D" : "B"}`);
const hm = (min: number) => {
  const m = ((min % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}`;
};

const fourMinutes: FigureDef = {
  caption:
    "Kutup üstünden bakış: 360° dönüş 24 saat = 1.440 dakika, 1.440 / 360 = 4 dakika/derece. Sürgüyle iki meridyen arasındaki boylam farkını değiştir. Meridyenler arası kilometre enleme göre değişir, ama bir derecenin zaman karşılığı değişmez. Şema ölçekli değildir.",
  alt: "Kuzey kutbundan bakılan daire; merkezden çıkan iki meridyen ve aralarındaki boylam farkı yayı; yayın yanında dakika karşılığı.",
  param: { label: "Boylam farkı", min: 0, max: 180, step: 5, init: 15, unit: "°", plain: true },
  draw: (d) => {
    const R = 2.4;
    const a0 = 90;
    const a1 = 90 - d;
    const P = (a: number, r = R): V => v(r * Math.cos((a * Math.PI) / 180), r * Math.sin((a * Math.PI) / 180));
    const els: El[] = [circle(v(0, 0), R, { tone: "muted", fill: "muted", thin: true }), circle(v(0, 0), 0.07, { tone: "ink", fill: "ink" })];
    els.push(seg(v(0, 0), P(a0), { bold: true }), seg(v(0, 0), P(a1), { bold: true, tone: "a" }));
    if (d > 0) {
      const n = Math.max(2, Math.round(d / 5) + 1);
      const arc = Array.from({ length: n }, (_, i) => P(a0 - (d * i) / (n - 1), R * 0.62));
      els.push(poly(arc, { open: true, tone: "a", bold: true }));
    }
    els.push(txt(v(-0.12, R + 0.3), "A", "w", { small: true, bold: true }), txt(v(P(a1, R + 0.3)[0] + 0.12, P(a1, R + 0.3)[1]), "B", "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(0.15, -0.2), "kutup", "se", { small: true, tone: "muted" }));
    els.push(txt(v(-3.4, 3.2), " ", "c"), txt(v(4.4, -3), " ", "c"));
    const m = d * 4;
    return {
      els,
      readout: [`${d}° × 4 dk/° = ${fmt(m, 0)} dakika = ${Math.floor(m / 60)} saat ${m % 60} dakika.`, "Tersi: dakika farkını 4'e böl, boylam farkını bul. Dereceyi doğrudan saat sanma, 60 ile çarpma."],
    };
  },
};

const CASES = [
  { from: 30, to: 45, note: "Hedef − başlangıç = 45 − 30 = +15°; +15 × 4 = +60 dk: doğudaki hedefte saat 1 saat ileri." },
  { from: 30, to: -30, note: "Hedef − başlangıç = −30 − 30 = −60°; −60 × 4 = −240 dk: batıdaki hedefte saat 4 saat geri." },
];
const signMethod: FigureDef = {
  caption:
    "Doğu boylamını pozitif, batıyı negatif al; hedeften başlangıcı çıkar ve 4 ile çarp. Pozitif sonuç hedefte saatin ileri, negatif sonuç geri olduğunu gösterir. Farklı yarımkürelerde mutlak değerler toplanır (30°D ile 30°B arası 60°).",
  alt: "Batıdan doğuya boylam doğrusu: 180°, 90°B, 0°, 90°D, 180°. Başlangıç ve hedef işaretli; aralarındaki ok farkın yönünü ve dakika karşılığını gösteriyor.",
  steps: ["30°D → 45°D", "30°D → 30°B"],
  draw: (_v, step) => {
    const c = CASES[step];
    const X = (l: number) => l / 30;
    const els: El[] = [seg(v(X(-180), 0), v(X(180), 0), { thin: true })];
    for (const l of [-180, -90, 0, 90, 180]) els.push(seg(v(X(l), -0.12), v(X(l), 0.12), { thin: true }), txt(v(X(l), -0.4), lon(l), "s", { small: true, tone: "muted", soft: true }));
    els.push(txt(v(X(-180), 0.4), "batı (−)", "ne", { small: true, tone: "muted" }), txt(v(X(180), 0.4), "doğu (+)", "nw", { small: true, tone: "muted" }));
    els.push(circle(v(X(c.from), 0), 0.12, { tone: "ink", fill: "ink" }), circle(v(X(c.to), 0), 0.12, { tone: "a", fill: "a" }));
    const diff = c.to - c.from;
    els.push(vec(v(X(c.from), 1.5), v(X(c.to), 1.5), { tone: "a", bold: true }));
    els.push(txt(v((X(c.from) + X(c.to)) / 2, 1.85), `${diff > 0 ? "+" : "−"}${Math.abs(diff)}° → ${diff > 0 ? "+" : "−"}${Math.abs(diff * 4)} dk`, "n", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(X(c.from), -1.05), lon(c.from), "s", { small: true, bold: true }), txt(v(X(c.to), 0.45), lon(c.to), "n", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(X(-186), 2.6), " ", "c"), txt(v(X(186), -1.8), " ", "c"));
    return { els, readout: [c.note, "Her soruda saatin nerede verildiğini ve nerede istendiğini işaretle."] };
  },
};

const DAYS = [
  { start: 20, delta: -240, note: "00.20 = 20 dk; 20 − 240 = −220 dk; bir gün (1.440 dk) eklenir: 1.220 dk = önceki gün 20.20." },
  { start: 23 * 60 + 40, delta: 80, note: "23.40 = 1.420 dk; 1.420 + 80 = 1.500 dk; 1.440 çıkarılır: 60 dk = ertesi gün 01.00." },
];
const dayCarry: FigureDef = {
  caption:
    "Hesabı toplam dakika üzerinden yap; gece yarısını geçen sonuçta günü taşı. Saat 0–23, dakika 0–59 aralığına getirilir; 24.80 gibi bırakılmaz.",
  alt: "Önceki gün akşamından ertesi gün sabahına uzanan zaman şeridi; iki gece yarısı işaretli. Ok başlangıç saatinden verilen dakika kadar geriye ya da ileriye gidiyor.",
  steps: ["00.20 − 240 dk", "23.40 + 80 dk"],
  draw: (_v, step) => {
    const c = DAYS[step];
    const base = step === 0 ? 0 : 1440;
    const X = (min: number) => (min - (base - 360)) / 60;
    const end = c.start + c.delta;
    const els: El[] = [seg(v(X(base - 360), 0), v(X(base + 360), 0), { thin: true })];
    els.push(seg(v(X(base), -0.25), v(X(base), 0.25), { bold: true }), txt(v(X(base), -0.45), "gece yarısı", "s", { small: true, tone: "muted" }));
    els.push(txt(v(X(base - 180), 0.35), step === 0 ? "önceki gün" : "aynı gün", "n", { small: true, tone: "muted" }), txt(v(X(base + 180), 0.35), step === 0 ? "aynı gün" : "ertesi gün", "n", { small: true, tone: "muted" }));
    const s = step === 0 ? c.start : c.start - 1440 + base;
    const e = step === 0 ? end : end - 1440 + base;
    els.push(circle(v(X(s), 0), 0.1, { tone: "ink", fill: "ink" }), circle(v(X(e), 0), 0.1, { tone: "a", fill: "a" }));
    els.push(vec(v(X(s), 1.3), v(X(e), 1.3), { tone: "a", bold: true }), txt(v((X(s) + X(e)) / 2, 1.6), `${c.delta > 0 ? "+" : "−"}${Math.abs(c.delta)} dk`, "n", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(X(s), 0.35), hm(c.start), "n", { small: true, bold: true }), txt(v(X(e), -1.1), hm(end), "s", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(X(base - 380), 2.4), " ", "c"), txt(v(X(base + 380), -1.8), " ", "c"));
    return { els, readout: [c.note, "Aynı anda karşılaştırılan iki yer için 'önceki gün' ifadesi başlangıç yerinin takvim gününe göredir."] };
  },
};

const antimeridian: FigureDef = {
  caption:
    "Kutup üstünden bakış. Bir meridyenin karşısı (antimeridyen) 180° ötesidir: 30°D'nin karşısı 150°B. 180°D ile 180°B ayrı iki yer değil, aynı meridyenin iki yazımıdır. Aynı meridyendeki yerlerin yerel güneş saati aynıdır; gündüz süresi ve iklim aynı olmak zorunda değildir. Şema ölçekli değildir.",
  alt: "Kuzey kutbundan bakılan daire; 0°, 30°D, 150°B ve 180° meridyenleri merkezden çıkan çizgiler. 30°D ile 150°B tek bir çap oluşturuyor.",
  draw: () => {
    const R = 2.4;
    // Kutup üstünden bakışta doğu boylamı saat yönünün tersine artar; 0° aşağıda.
    const P = (l: number, r = R): V => v(r * Math.cos(((l - 90) * Math.PI) / 180), r * Math.sin(((l - 90) * Math.PI) / 180));
    const els: El[] = [circle(v(0, 0), R, { tone: "muted", fill: "muted", thin: true })];
    els.push(seg(P(30), P(-150), { tone: "a", bold: true }));
    els.push(seg(v(0, 0), P(0), { thin: true }), seg(v(0, 0), P(180), { thin: true, dash: true }));
    els.push(txt(P(0, R + 0.3), "0°", "c", { small: true, tone: "muted" }), txt(P(180, R + 0.55), "180°D = 180°B", "c", { small: true, tone: "muted" }));
    els.push(txt(P(30, R + 0.3), "30°D", "c", { small: true, bold: true, tone: "a" }), txt(P(-150, R + 0.3), "150°B", "c", { small: true, bold: true, tone: "a" }));
    els.push(circle(v(0, 0), 0.07, { tone: "ink", fill: "ink" }));
    els.push(txt(v(-4.2, 3.4), " ", "c"), txt(v(4.2, -3.4), " ", "c"));
    return { els, readout: ["30°D + 180° = 210° → 360 − 210 = 150°B. İki meridyen arasında 180° = 720 dk = 12 saat güneş saati farkı vardır.", "180°D ve 180°B'yi iki fiziksel nokta sayıp 24 saatlik güneş saati farkı üretme."] };
  },
};

const commonTime: FigureDef = {
  caption:
    "Ortak saat bir yönetim kararıdır. Türkiye UTC+3 kullanır; ideal merkez boylamı 45°D. 45°D'de güneş öğlesi (12.00) olduğunda 30°D'nin yerel güneş saati 15° × 4 = 60 dk geridedir (11.00), ama iki kentin duvar saati aynıdır. Saat dilimi farkları zaten saattir; boylam gibi 4 ile çarpılmaz.",
  alt: "İki saat yan yana: 45°D'de güneş saati 12.00 ve ortak saat 12.00; 30°D'de güneş saati 11.00, ortak saat 12.00.",
  draw: () => {
    const els: El[] = [];
    const clock = (cx: number, minutes: number, name: string, solar: string) => {
      const c = v(cx, 0);
      els.push(circle(c, 1.3, { tone: "muted", fill: "muted", thin: true }));
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * 2 * Math.PI;
        els.push(seg(v(cx + 1.1 * Math.sin(a), 1.1 * Math.cos(a)), v(cx + 1.25 * Math.sin(a), 1.25 * Math.cos(a)), { thin: true }));
      }
      const hA = ((minutes / 60) % 12) / 12 * 2 * Math.PI;
      const mA = ((minutes % 60) / 60) * 2 * Math.PI;
      els.push(seg(c, v(cx + 0.65 * Math.sin(hA), 0.65 * Math.cos(hA)), { bold: true, tone: "a" }), seg(c, v(cx + 1.0 * Math.sin(mA), 1.0 * Math.cos(mA)), { tone: "a" }));
      els.push(txt(v(cx, 1.65), name, "n", { small: true, bold: true }), txt(v(cx, -1.6), solar, "s", { small: true, bold: true, tone: "a" }), txt(v(cx, -2.25), "ortak saat 12.00", "s", { small: true, tone: "muted" }));
    };
    clock(-2.2, 11 * 60, "30°D", "güneş saati 11.00");
    clock(2.2, 12 * 60, "45°D", "güneş saati 12.00");
    els.push(txt(v(-4.6, 2.6), " ", "c"), txt(v(4.6, -3.1), " ", "c"));
    return { els, readout: ["45 − 30 = 15°; 15 × 4 = 60 dk: 30°D'nin güneş saati 1 saat geri.", "Hedef gösterimi = kaynak gösterimi − kaynak UTC farkı + hedef UTC farkı."] };
  },
};

export const geographyFigures058Time: Record<string, Record<string, FigureDef>> = {
  "yerel-saat": {
    "Neden bir derece dört dakika?": fourMinutes,
    "Doğu ileri; işaret yöntemi güvenlidir": signMethod,
    "Dakikayı taşı; günü kaybetme": dayCarry,
    "Aynı meridyen; farklı yaşam koşulları": antimeridian,
    "Ortak saat bir yönetim kararıdır": commonTime,
  },
};
