import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * The eye, schematic (not to scale). Light comes from the left: kornea → ön
 * sıvı → göz bebeği → mercek → camsı cisim → retina (2020 AYT Fen 30 asks the
 * order kornea, mercek, camsı cisim). Every structure name is selectable and
 * opens its card: what it does and the usual confusion (göz bebeği is an
 * opening, kör nokta ≠ sarı benek, asıcı bağ is not a muscle). The second
 * figure compares the focus with the retina for refractive errors.
 */

const K = 1.6;
const e = (x: number, y: number) => v(x * K, y * K);
const CAMSI = e(0.3, -1.5);
type Part = { name: string; at: V; label: V; dir: "e" | "w"; what: string; trap: string };
const PARTS: Part[] = [
  { name: "Kornea", at: e(-3.4, 0.9), label: v(-6.3, 4.97), dir: "w", what: "Öndeki saydam pencere; ışığı ilk ve en çok kıran yapı. Skleranın saydam devamıdır.", trap: "Görüntüyü algılamaz; ışığı alan hücreler retinadadır." },
  { name: "İris", at: e(-2.35, 1.35), label: v(-6.3, 3.04), dir: "w", what: "Renkli halka; dairesel ve radyal kaslarıyla göz bebeğinin çapını ayarlar.", trap: "Merceğin şeklini değiştirmez; o kirpiksi kasın işidir." },
  { name: "Göz bebeği", at: e(-2.35, -0.15), label: v(-6.3, -1.79), dir: "w", what: "İrisin ortasındaki açıklık; parlak ışıkta daralır, loşta genişler.", trap: "Bir mercek ya da doku değildir; ışığın geçtiği boşluktur." },
  { name: "Mercek", at: e(-1.75, -0.7), label: v(-6.3, -3.59), dir: "w", what: "Esnek, saydam mercek; bombeliği değişerek yakın ve uzağa odak ayarlar (uyum).", trap: "Görüntü mercekte oluşmaz, retinada odaklanır. Bulanıklaşması katarakttır." },
  { name: "Kirpiksi kas", at: e(-1.75, -1.75), label: v(-6.3, -5.38), dir: "w", what: "Merceğe asıcı bağlarla bağlıdır. Yakına bakışta kirpiksi kas kasılır, asıcı bağ gevşer, mercek bombelenir; uzakta tersi.", trap: "Asıcı bağ kas değildir; gerilmesi aktif kasılma anlamına gelmez." },
  { name: "Camsı cisim", at: CAMSI, label: CAMSI, dir: "e", what: "Mercek ile retina arasını dolduran saydam jöle; göz küresinin biçimini korur.", trap: "Ön ve arka odadaki aköz sıvı ile aynı bölme değildir." },
  { name: "Sklera", at: e(0.9, 2.86), label: v(6.5, 5.52), dir: "e", what: "Dıştaki sert, beyaz bağ doku tabakası; göz kasları buna tutunur.", trap: "Önde saydamlaşıp korneaya dönüşür; ışık alıcısı içermez." },
  { name: "Koroit", at: e(2.0, 2.0), label: v(6.5, 3.72), dir: "e", what: "Damar tabaka: gözü besler, pigmentiyle iç yansımayı azaltır.", trap: "İris ve kirpiksi cisim bu tabakanın önde özelleşmiş kısımlarıdır." },
  { name: "Retina", at: e(2.55, 1.0), label: v(6.5, 1.93), dir: "e", what: "Ağ tabaka: çubuk (loş ışık) ve koni (renk, ayrıntı) hücreleri ışığı sinirsel bilgiye çevirir.", trap: "Saydam bir mercek değildir; görüntü burada ters odaklanır." },
  { name: "Sarı benek", at: e(2.7, 0), label: v(6.5, 0.13), dir: "e", what: "Merkezindeki fovea koniden zengindir; en net ve renkli görme burada.", trap: "Kör noktayla karıştırma: sarı benekte alıcı en yoğun." },
  { name: "Kör nokta", at: e(2.5, -1.0), label: v(6.5, -1.66), dir: "e", what: "Optik sinirin çıktığı optik disk; fotoreseptör yoktur.", trap: "Sarı benek değildir; buraya düşen ışık algılanmaz." },
  { name: "Optik sinir", at: e(3.5, -1.5), label: v(6.5, -3.46), dir: "e", what: "Gangliyon hücrelerinin aksonları; sinirsel bilgiyi beyne taşır, kiyazmada kısmen çaprazlanır.", trap: "Optik sinirde ışık değil aksiyon potansiyeli ilerler." },
];

const anatomy: FigureDef = {
  caption:
    "Şematik göz kesiti (ölçekli değil). Işık soldan girer: kornea → göz bebeği → mercek → camsı cisim → retina (2020 AYT Fen 30 sırası: kornea, mercek, camsı cisim). Bir yapının adına tıkla: görevi ve sık karıştırılan nokta açılır.",
  alt: "Yandan göz kesiti: önde saydam kornea, iris ve aradaki göz bebeği açıklığı, mercek ve ona bağlı kirpiksi kas; içte camsı cisim; arka duvarda retina, sarı benek ve optik sinirin çıktığı kör nokta. İki ışık ışını sarı benekte birleşir.",
  picks: PARTS.map((p) => ({ label: p.name, title: p.name, detail: [p.what, `Karıştırma: ${p.trap}`] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    // Outer layers: sklera, koroit, retina (back half).
    els.push(circle(e(0, 0), 3 * K, { tone: pick === 6 ? "a" : "muted" }));
    els.push(circle(e(0, 0), 2.82 * K, { tone: pick === 7 ? "a" : "muted", thin: true }));
    const arc = (r: number, a0: number, a1: number) => Array.from({ length: 31 }, (_, i) => { const t = ((a0 + ((a1 - a0) * i) / 30) * Math.PI) / 180; return e(r * Math.cos(t), r * Math.sin(t)); });
    els.push(poly(arc(2.66, -120, 120), { tone: pick === 8 ? "a" : "c", open: true, bold: true }));
    // Cornea bulge.
    els.push(poly([e(-2.55, 1.6), e(-3.25, 1.0), e(-3.5, 0), e(-3.25, -1.0), e(-2.55, -1.6)], { tone: pick === 0 ? "a" : "b", open: true, smooth: true, bold: true }));
    // Iris with the pupil opening between.
    const ti: Tone = pick === 1 ? "a" : "warn";
    els.push(seg(e(-2.35, 0.45), e(-2.35, 1.75), { tone: ti, bold: true }), seg(e(-2.35, -0.45), e(-2.35, -1.75), { tone: ti, bold: true }));
    // Lens and its suspension.
    const lens = Array.from({ length: 41 }, (_, i) => { const t = (i / 40) * 2 * Math.PI; return e(-1.75 + 0.32 * Math.cos(t), 1.05 * Math.sin(t)); });
    els.push(poly(lens, { tone: pick === 3 ? "a" : "b", fill: pick === 3 ? "a" : "b", thin: true }));
    const tl: Tone = pick === 4 ? "a" : "muted";
    els.push(seg(e(-1.75, 1.05), e(-1.9, 2.25), { tone: tl, thin: pick !== 4 }), seg(e(-1.75, -1.05), e(-1.9, -2.25), { tone: tl, thin: pick !== 4 }));
    // Optic nerve.
    els.push(poly([e(2.45, -0.75), e(3.6, -1.2), e(3.75, -1.55), e(2.55, -1.25)], { tone: pick === 11 ? "a" : "muted", fill: pick === 11 ? "a" : undefined, thin: true }));
    // Light rays to the fovea.
    for (const y0 of [0.38, -0.38]) els.push(poly([e(-5.0, y0), e(-3.45, y0), e(-1.75, y0 * 0.75), e(2.66, 0)], { tone: "muted", open: true, thin: true, dash: true }));
    els.push(vec(e(-5.0, 0.38), e(-4.2, 0.38), { tone: "muted", thin: true }));
    els.push(ball(e(2.66, 0), pick === 9 ? 0.2 : 0.14, pick === 9 ? "a" : "warn"), ball(e(2.5, -1.0), pick === 10 ? 0.2 : 0.14, pick === 10 ? "a" : "ink"));
    // Leader lines and selectable names.
    PARTS.forEach((p, i) => {
      const on = pick === i;
      if (p.at !== p.label) els.push(seg(p.label, p.at, { tone: on ? "a" : "muted", thin: true, dash: !on }));
      els.push(txt(p.label, p.name, p === PARTS[5] ? "c" : p.dir, { small: true, bold: on, tone: on ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(-6.4, 6.2), " ", "c"), txt(v(6.6, -6.2), " ", "c"));
    const sel = pick >= 0 ? PARTS[pick] : undefined;
    return { els, readout: [sel ? `${sel.name}: ${sel.what}` : "Işık yolu: kornea → ön sıvı → göz bebeği → mercek → camsı cisim → retina.", "Retinadan sonra ışık değil sinirsel bilgi ilerler (optik sinir)."] };
  },
};

type Case = { name: string; focus: number; lens?: "ıraksak" | "yakınsak"; text: string };
const CASES: Case[] = [
  { name: "Normal", focus: 4, text: "Uzak cismin ışınları retinada birleşir." },
  { name: "Miyop", focus: 2.9, text: "Odak retinanın ÖNÜNDE: göz uzun ya da kırıcılık fazla; uzak bulanık." },
  { name: "Miyop + ıraksak mercek", focus: 4, lens: "ıraksak", text: "Kalın kenarlı (ıraksak) mercek ışınları önce açar; odak retinaya kayar." },
  { name: "Hipermetrop", focus: 5.1, text: "Odak retinanın ARKASINDA (uyum yetmezse); yakın bulanık." },
  { name: "Hipermetrop + yakınsak mercek", focus: 4, lens: "yakınsak", text: "İnce kenarlı (yakınsak) mercek kırıcılığı artırır; odak retinaya gelir." },
];
const refraction: FigureDef = {
  caption:
    "Kırma kusurunda odağı retinayla karşılaştır. Miyop: odak önde, ıraksak (kalın kenarlı) mercek. Hipermetrop: odak arkada, yakınsak (ince kenarlı) mercek. Presbitlik (yaşla esneklik kaybı), astigmatizma (doğrultuya göre farklı kırılma) ve katarakt (mercek bulanıklığı) başka mekanizmalardır.",
  alt: "Soldan gelen iki paralel ışın göz merceğinden geçip bir noktada birleşiyor; sağda düşey retina çizgisi. Adımlarda birleşme noktası retinanın önüne, arkasına kayıyor ve gözün önüne düzeltici mercek ekleniyor.",
  steps: CASES.map((c) => c.name),
  draw: (_v, step) => {
    const c = CASES[step];
    const els: El[] = [];
    const R = 4;
    els.push(seg(v(R, -1.6), v(R, 1.6), { tone: "c", bold: true }), txt(v(R, 1.6), "retina", "n", { small: true, tone: "c" }));
    const lens = Array.from({ length: 41 }, (_, i) => { const t = (i / 40) * 2 * Math.PI; return v(0.25 * Math.cos(t), 1.2 * Math.sin(t)); });
    els.push(poly(lens, { tone: "b", fill: "b", thin: true }), txt(v(0, -1.2), "göz merceği", "s", { small: true, tone: "b" }));
    const pre = c.lens === "ıraksak" ? 0.35 : c.lens === "yakınsak" ? -0.3 : 0; // spread or squeeze before the eye
    if (c.lens) {
      const x = -2;
      const shape = c.lens === "ıraksak"
        ? [v(x - 0.35, 1.1), v(x + 0.35, 1.1), v(x + 0.12, 0), v(x + 0.35, -1.1), v(x - 0.35, -1.1), v(x - 0.12, 0)]
        : Array.from({ length: 41 }, (_, i) => { const t = (i / 40) * 2 * Math.PI; return v(x + 0.18 * Math.cos(t), 1.1 * Math.sin(t)); });
      els.push(poly(shape, { tone: "a", fill: "a", thin: true }), txt(v(x, 1.1), `${c.lens} mercek`, "n", { small: true, bold: true, tone: "a" }));
    }
    for (const s of [1, -1]) {
      const y0 = 0.7 * s;
      const yEye = y0 * (1 + pre);
      const pts = c.lens ? [v(-4, y0), v(-2, y0), v(0, yEye)] : [v(-4, y0), v(0, y0)];
      const fx = c.focus;
      const end = fx <= R ? v(R + 0.6, -yEye * (0.6 / fx)) : v(R, yEye * (1 - R / fx));
      els.push(poly([...pts, ...(fx <= R ? [v(fx, 0), end] : [end])], { tone: "warn", open: true }));
      if (fx > R) els.push(seg(end, v(fx, 0), { tone: "warn", dash: true, thin: true }));
    }
    els.push(ball(v(c.focus, 0), 0.1, "warn"), txt(v(c.focus, -0.15), "odak", "s", { small: true, tone: "warn" }));
    els.push(txt(v(-4.6, 2.3), " ", "c"), txt(v(5.8, -2.0), " ", "c"));
    return { els, readout: [c.text, step === 0 ? "Uyum: yakında kirpiksi kas kasılır, bağ gevşer, mercek bombelenir." : "Optik düzeltme odağı taşır; retina ya da optik sinir hasarını onarmaz."] };
  },
};

export const biologyFiguresEye: Record<string, Record<string, FigureDef>> = {
  "duyu-organlari-goz": {
    "Dıştan içe üç örtü ve öndeki saydam pencere": anatomy,
    "Kırılma kusurunda odak ile retinayı karşılaştır": refraction,
  },
};
