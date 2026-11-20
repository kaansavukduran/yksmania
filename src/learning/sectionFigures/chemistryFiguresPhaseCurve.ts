import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Gazlar, hâl değişim grafikleri ve plazma. Isıtma eğrileri saf
 * madde, sabit dış basınç ve düzenli ısıtma modeline aittir; süre/ısı ekseni
 * temsilî, ölçekli değildir. ÖSYM bağı: 2023 TYT Fen 11 (yapılmış sınav, resmî
 * cevap A; cıva 1 atm’de −39 °C erir, 357 °C kaynar); çözüm özgündür.
 * Plazma tanecik sayıları özgün öğretim modelidir.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });

// Isıtma eğrisi noktaları (temsilî): x = verilen ısı, y = sıcaklık (°C), saf su 1 atm.
const CURVE: [number, number][] = [[0, -20], [1, 0], [2.6, 0], [4.2, 100], [6.6, 100], [7.6, 120]];
const sy = 0.03, ty = (t: number) => (t + 20) * sy;

// 1 · Enerji grafiğinde beş bölge.
const REGIONS = [
  { label: "I", title: "I: yalnız katı, sıcaklık artar", detail: ["Katı ısınır; eğimli bölge."] },
  { label: "II", title: "II: katı + sıvı, erime platosu (0 °C)", detail: ["Isı alınır ama sıcaklık sabit: enerji hâl değişimine gider.", "Sabit sıcaklık “ısı verilmedi” demek değildir."] },
  { label: "III", title: "III: yalnız sıvı, sıcaklık artar", detail: ["İki eşik arasında yalnız sıvı."] },
  { label: "IV", title: "IV: sıvı + gaz, kaynama platosu (100 °C)", detail: ["İkinci yatay bölüm kaynamadır; sıvı ve gaz birlikte."] },
  { label: "V", title: "V: yalnız gaz, sıcaklık artar", detail: ["Kaynama bitti; buhar ısınır."] },
];
const fiveRegions: FigureDef = {
  caption:
    "Saf su, 1 atm, düzenli ısıtma (temsilî eksen). Bir bölgeye tıkla: o bölüm vurgulanır ve hangi hâllerin bulunduğu açılır. Eğimli bölgelerde tek hâl ısınır; yatay bölgelerde (II erime, IV kaynama) iki hâl birlikte bulunur ve verilen ısı hâl değişimine gider.",
  alt: "Sıcaklık–verilen ısı eğrisi: −20 °C’den 0 °C’ye çıkış, 0 °C platosu, 100 °C’ye çıkış, 100 °C platosu, 120 °C’ye çıkış; I–V etiketleri.",
  picks: REGIONS,
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [vec(v(0, 0), v(8.2, 0), { thin: true }), vec(v(0, 0), v(0, ty(130)), { thin: true }), txt(v(8.2, -0.35), "verilen ısı", "e", { small: true }), txt(v(0.15, ty(130)), "°C", "e", { small: true })];
    [0, 100].forEach((t) => els.push(txt(v(-0.15, ty(t)), String(t), "w", { small: true, tone: "muted" }), seg(v(0, ty(t)), v(8, ty(t)), { dash: true, thin: true, tone: "muted" })));
    for (let i = 0; i < 5; i++) {
      const [x0, t0] = CURVE[i], [x1, t1] = CURVE[i + 1], sel = pick === i;
      els.push(seg(v(x0, ty(t0)), v(x1, ty(t1)), { tone: sel ? "a" : "b", bold: true }));
      els.push(txt(v((x0 + x1) / 2, ty((t0 + t1) / 2) + 0.35), REGIONS[i].label, "c", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
    }
    els.push(txt(v(-0.8, 4.6), " ", "c"), txt(v(8.8, -0.6), " ", "c"));
    return { els, readout: [pick >= 0 ? REGIONS[pick].title + "." : "Bir bölgeye tıkla.", "Beşli sınıflama saf madde ve sabit basınç içindir; karışımın tek platosu olmak zorunda değildir."] };
  },
};

// 2 · Soğutma: aynı eşikler, ters olaylar.
const DIRS = [
  { label: "Isıtma", plateaus: ["erime (katı + sıvı)", "kaynama (sıvı + gaz)"], note: "Isıtmada ilk plato erime, ikinci plato kaynamadır; platoda sistem enerji alır." },
  { label: "Soğutma", plateaus: ["donma (sıvı + katı)", "yoğuşma (gaz + sıvı)"], note: "Soğutmada ilk plato yoğuşmadır (100 °C), sonra donma (0 °C); platoda sistem çevreye enerji verir." },
];
const cooling: FigureDef = {
  caption:
    "Isıtma ile soğutmayı ters yönde oku. Yöne tıkla: aynı saf su eğrisi soldan sağa (ısıtma) ya da sağdan sola (soğutma) okunur; ok yönü ve plato adları değişir. Yalnız “0 °C” bilgisi faz oranını vermez; geçişin başı, ortası ya da sonu olabilir. Dış basınç değişirse kaynama eşiği de değişir.",
  alt: "Aynı ısıtma eğrisi; seçili yöne göre üzerinde ok ve iki platonun adı.",
  picks: DIRS.map((d) => ({ label: d.label, title: d.label, detail: [d.note] })),
  draw: (_v, _s, pick = -1) => {
    const d = DIRS[pick >= 0 ? pick : 1], cool = d.label === "Soğutma";
    const els: El[] = [vec(v(0, 0), v(8.2, 0), { thin: true }), vec(v(0, 0), v(0, ty(130)), { thin: true }), txt(v(0.15, ty(130)), "°C", "e", { small: true })];
    els.push(txt(v(8.2, -0.35), cool ? "verilen ısı (azalan)" : "verilen ısı", "e", { small: true }));
    [0, 100].forEach((t) => els.push(txt(v(-0.15, ty(t)), String(t), "w", { small: true, tone: "muted" })));
    els.push(poly(CURVE.map(([x, t]) => v(x, ty(t))), { open: true, tone: "b", bold: true }));
    els.push(cool ? vec(v(7.2, ty(130)), v(5.2, ty(130)), { tone: "a", bold: true }) : vec(v(1.2, ty(130)), v(3.2, ty(130)), { tone: "a", bold: true }));
    els.push(txt(v(2.4, ty(0) - 0.36), d.plateaus[0], "c", { small: true, tone: "a" }), txt(v(4.9, ty(100) + 0.4), d.plateaus[1], "c", { small: true, tone: "a" }));
    DIRS.forEach((dd, i) => els.push(txt(v(i * 2.6, -1.0), dd.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.8, 4.8), " ", "c"), txt(v(9.4, -1.3), " ", "c"));
    return { els, readout: [d.note, "Sıcaklık ≠ ısı: platoda sıcaklık sabit kalırken enerji aktarımı sürer."] };
  },
};

// 3 · Plazmanın yük taşıyıcıları.
const plasma: FigureDef = {
  caption:
    "Plazma iyonlaşmış gazdır: serbest elektronlar ve pozitif iyonlar bulunur, nötr tanecikler de kalabilir. 2+ iyon sayısını kaydır: yük dengesi için gereken serbest elektron sayısı iyon sayısının değil toplam yükün karşılığıdır (12 iyon × +2 = +24 → 24 elektron). Yalnız sıcak ya da parlak görünmek plazma kanıtı değildir; tuzlu su da iyonla iletir ama sıvıdır.",
  alt: "Kap içinde 2+ iyonlar, serbest elektronlar ve birkaç nötr tanecik; yük sayımı.",
  param: { label: "2+ iyon", min: 0, max: 12, step: 1, init: 6, unit: "" },
  draw: (nv) => {
    const n = Math.round(nv), e = 2 * n, els: El[] = [rect(0, 6, 0, 3, "muted", false)];
    for (let i = 0; i < n; i++) els.push(ball(v(0.5 + (i % 6) * 1.0, 2.5 - Math.floor(i / 6) * 0.9), 0.2, "warn"), txt(v(0.5 + (i % 6) * 1.0, 2.5 - Math.floor(i / 6) * 0.9), "2+", "c", { small: true, bold: true }));
    for (let i = 0; i < e; i++) els.push(ball(v(0.3 + (i % 12) * 0.48, 0.75 - Math.floor(i / 12) * 0.4), 0.07, "b"));
    [[1.0, 1.12], [3.0, 1.12], [5.0, 1.12]].forEach(([x, y]) => els.push(ball(v(x, y), 0.15, "muted")));
    els.push(txt(v(3, -0.4), `+${2 * n} iyon yükü, −${e} elektron yükü → toplam 0`, "c", { small: true, bold: true, tone: "a" }));
    els.push(ball(v(6.6, 2.5), 0.15, "warn"), txt(v(6.85, 2.5), "2+ iyon", "e", { small: true }), ball(v(6.6, 2.0), 0.07, "b"), txt(v(6.85, 2.0), "elektron", "e", { small: true }), ball(v(6.6, 1.5), 0.12, "muted"), txt(v(6.85, 1.5), "nötr", "e", { small: true }));
    els.push(txt(v(-0.3, 3.3), " ", "c"), txt(v(8.4, -0.7), " ", "c"));
    return { els, readout: [`${n} adet 2+ iyon için ${e} elektron; nötr tanecikler yük hesabını değiştirmez.`, "Yıldırım ve neon lamba örnek olabilir; sıradan oda havası plazma değildir."] };
  },
};

// 4 · Eşik doğrusu: 2023 TYT Fen 11.
const HG = { melt: -39, boil: 357 };
const threshold: FigureDef = {
  caption:
    "2023 TYT Fen 11 (resmî kitapçık, cevap A): saf cıva 1 atm’de −39 °C’de erir, 357 °C’de kaynar. Sıcaklığı kaydır: eşiklere göre hâl okunur. −50 °C katı (I doğru), −30 °C yalnız sıvı (II yanlış: katı + sıvı değil), 360 °C gaz (III yanlış). Tam eşikte hâl oranı ek bilgi ister.",
  alt: "Sayı doğrusu: −39 ve 357 eşikleri, katı/sıvı/gaz aralıkları ve seçili sıcaklık işareti.",
  param: { label: "Sıcaklık", min: -60, max: 380, step: 10, init: -30, unit: " °C" },
  draw: (t) => {
    const k = 0.016, x = (tt: number) => (tt + 60) * k;
    const els: El[] = [rect(x(-60), x(HG.melt), -0.15, 0.15, "c"), rect(x(HG.melt), x(HG.boil), -0.15, 0.15, "b"), rect(x(HG.boil), x(380), -0.15, 0.15, "warn")];
    els.push(txt(v(x(-50), 0.45), "katı", "c", { small: true }), txt(v(x(160), 0.45), "sıvı", "c", { small: true }), txt(v(x(370), 0.45), "gaz", "c", { small: true }));
    [HG.melt, HG.boil].forEach((tt) => els.push(seg(v(x(tt), -0.35), v(x(tt), 0.3), { tone: "ink" }), txt(v(x(tt), -0.6), String(tt).replace("-", "−"), "c", { small: true, bold: true })));
    const phase = t < HG.melt ? "katı" : t === HG.melt ? "katı/sıvı (oran belirsiz)" : t < HG.boil ? "sıvı" : t === HG.boil ? "sıvı/gaz (oran belirsiz)" : "gaz";
    els.push(vec(v(x(t), 1.2), v(x(t), 0.25), { tone: "a", bold: true }), txt(v(x(t), 1.45), `${String(t).replace("-", "−")} °C: ${phase}`, "c", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.5, 1.8), " ", "c"), txt(v(7.6, -0.9), " ", "c"));
    return { els, readout: [`${String(t).replace("-", "−")} °C → ${phase}.`, "Negatif sayıları dikkatle karşılaştır: −30 > −39, −50 < −39."] };
  },
};

export const chemistryFiguresPhaseCurve: Record<string, Record<string, FigureDef>> = {
  "gazlar-hal-degisim-plazma": {
    "Enerji grafiğinde beş bölge": fiveRegions,
    "Soğutma, saflık ve zaman ekseni": cooling,
    "Plazmanın yük taşıyıcıları": plasma,
    "İlk hata denetim sırası": threshold,
  },
};
