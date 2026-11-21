import { circle, dist, lerp, poly, pt, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Selçuklu dönemi savaş şemaları. Her savaş, sürgü veya "Oynat" ile ilerleyen
 * aşamalardan oluşur: birlikler bir aşamadan ötekine kayar, kesik oklar o
 * aşamadaki hareketi, kısa ok demetleri atlı okçu atışını gösterir.
 * Konumlar temsilîdir; ölçekli harita değildir. Anlatım ders kaynaklarının
 * genel çerçevesini izler, ayrıntılı birlik sayıları verilmez.
 * Birlikler harfli pullardır; adları haritanın altındaki lejantta durur, böylece
 * hiçbir yazı birliklerin veya okların üstüne binmez.
 */

export type Unit = {
  /** One or two letters drawn inside the token; the legend names it. */
  code: string;
  label: string;
  tone: Tone;
  /** One position per stage (stage 0 … n-1). */
  path: V[];
  /** Stage from which the unit appears in a different colour (side change). */
  switchAt?: number;
  toneAfter?: Tone;
  /** Before this stage the unit is hidden in ambush (outline only). */
  hiddenUntil?: number;
};
export type Stage = { name: string; text: string };
export type Battle = {
  stages: Stage[];
  units: Unit[];
  terrain: El[];
  /** Arrow volleys: [stage window start, end, from unit index, to unit index]. */
  volleys?: [number, number, number, number][];
  /** Extra marks for a stage window. */
  marks?: (t: number, pos: (i: number) => V) => El[];
  /** Map width (legend wraps inside it) and the two sides for the colour key. */
  width: number;
  sides: [string, Tone][];
};

const smooth = (x: number) => x * x * (3 - 2 * x);
function posAt(path: V[], t: number): V {
  if (path.length === 1) return path[0];
  const i = Math.max(0, Math.min(path.length - 2, Math.floor(t)));
  const f = smooth(Math.max(0, Math.min(1, t - i)));
  return lerp(path[i], path[i + 1], f);
}
const R = 0.5;
function token(c: V, code: string, tone: Tone, hidden: boolean): El[] {
  return [
    hidden ? circle(c, R, { tone, dash: true, thin: true }) : circle(c, R, { tone, fill: tone, bold: true }),
    txt(c, code, "c", { tone, small: true, bold: true }),
  ];
}
/** Legend entries: side key first, then each unit code once. */
function legendItems(units: Unit[], sides: [string, Tone][]) {
  const items: { code: string; label: string; tone: Tone }[] = sides.map(([label, tone]) => ({ code: "", label, tone }));
  for (const u of units) if (!items.some((i) => i.code === u.code)) items.push({ code: u.code, label: u.label, tone: u.tone });
  return items;
}
export const ring = (c: V): El => circle(c, R + 0.22, { tone: "warn", bold: true });
/** Three short dashed arrows from a to b: one volley of mounted archers. */
function volley(a: V, b: V, tone: Tone): El[] {
  const d = dist(a, b) || 1;
  const nx = -(b[1] - a[1]) / d;
  const ny = (b[0] - a[0]) / d;
  return [-0.35, 0, 0.35].map((o) => {
    const s = lerp(a, b, 0.25);
    const e = lerp(a, b, 0.75);
    return vec(v(s[0] + nx * o, s[1] + ny * o), v(e[0] + nx * o, e[1] + ny * o), { tone, dash: true, thin: true });
  });
}

export function battleFigure(b: Battle, caption: string, alt: string): FigureDef {
  const n = b.stages.length;
  return {
    caption,
    alt,
    param: { label: "Aşama", min: 1, max: n, step: 0.05, init: 1, once: true, playMs: 3200 * (n - 1) },
    draw: (value) => {
      const t = Math.max(0, Math.min(n - 1, value - 1));
      const k = Math.min(n - 1, Math.floor(t + 0.5));
      const pos = (i: number) => posAt(b.units[i].path, t);
      const els: El[] = [...b.terrain];
      const seg0 = Math.min(Math.floor(t), n - 2);
      // Movement arrow for the stage now being played.
      b.units.forEach((u, i) => {
        if (u.path.length < 2 || t >= n - 1) return;
        const a = u.path[Math.min(seg0, u.path.length - 1)];
        const z = u.path[Math.min(seg0 + 1, u.path.length - 1)];
        if (dist(a, z) < 0.4) return;
        const tone = u.switchAt !== undefined && seg0 + 1 >= u.switchAt ? (u.toneAfter ?? u.tone) : u.tone;
        els.push(vec(a, z, { tone, dash: true, thin: true }));
      });
      for (const [s, e, from, to] of b.volleys ?? []) {
        if (t >= s && t <= e) {
          const tone = b.units[from].tone;
          els.push(...volley(pos(from), pos(to), tone));
        }
      }
      b.units.forEach((u, i) => {
        const c = pos(i);
        const tone = u.switchAt !== undefined && t >= u.switchAt - 0.5 ? (u.toneAfter ?? u.tone) : u.tone;
        const hidden = u.hiddenUntil !== undefined && t < u.hiddenUntil - 0.5;
        els.push(...token(c, u.code, tone, hidden));
      });
      if (b.marks) els.push(...b.marks(t, pos));

      const stage = b.stages[k];
      return { els, legend: legendItems(b.units, b.sides), readout: [`Aşama ${k + 1}/${n}: ${stage.name}`, stage.text] };
    },
  };
}

/** Compass words under the map instead of a frame around it. */
export const compass = (w: number, left = "← batı", right = "doğu →"): El[] => [
  txt(v(0.1, -0.35), left, "e", { tone: "muted", small: true }),
  txt(v(w - 0.1, -0.35), right, "w", { tone: "muted", small: true }),
];
/**
 * A mountain range as one smooth silhouette: peaks at xs with slightly
 * different heights and soft saddles between them, filled down to the base.
 * `down` draws the range hanging below the base line (the far side of a pass).
 */
export const mountains = (xs: number[], y: number, w: number, h: number, down = false): El[] => {
  const s = down ? -1 : 1;
  const pts: V[] = [];
  const x0 = xs[0] - w / 2;
  const x1 = xs[xs.length - 1] + w / 2;
  pts.push(v(x0, y), v(x0, y), v(x0 + w * 0.12, y + s * h * 0.25));
  xs.forEach((x, i) => {
    const peak = h * (0.82 + 0.18 * Math.abs(Math.sin(i * 1.7 + x)));
    pts.push(v(x - w * 0.18, y + s * peak * 0.72), v(x, y + s * peak), v(x + w * 0.16, y + s * peak * 0.8));
    if (i < xs.length - 1) pts.push(v((x + xs[i + 1]) / 2, y + s * h * 0.42));
  });
  pts.push(v(x1 - w * 0.12, y + s * h * 0.25), v(x1, y), v(x1, y));
  return [poly(pts, { tone: "muted", fill: "muted", thin: true, smooth: true })];
};
/* ---------------- Malazgirt 1071 ---------------- */
const malazgirt: Battle = {
  stages: [
    { name: "Ordular karşı karşıya", text: "Bizans ordusu batıdan, Alp Arslan doğudan gelir. Bizans safında Uz ve Peçenek paralı askerleri vardır; Selçuklu kanatlarında atlı okçular durur." },
    { name: "Atlı okçular taciz eder", text: "Selçuklu atlı okçuları Bizans saflarına yaklaşıp ok atar, göğüs göğüse çarpışmaya girmeden geri döner." },
    { name: "Sahte geri çekilme", text: "Selçuklu merkezi geri çekiliyormuş gibi doğuya kayar. Bizans ana ordusu takibe çıkar; artçı ile ana ordu arasındaki boşluk büyür." },
    { name: "Saflar bozulur", text: "Ders kaynaklarındaki anlatıma göre Uz ve Peçenek birlikleri Selçuklu tarafına geçer. Bizans artçısı ana orduyu desteklemeden geri çekilir." },
    { name: "Hilal kapanır", text: "Pusudaki birlikler kanatlardan dolanır; ana ordu önden, arkadan ve yanlardan sarılır. Bu kuşatma Turan (hilal) taktiği olarak öğretilir." },
    { name: "İmparator esir", text: "Romen Diyojen esir düşer. Sonuç: Anadolu'ya Türk göçü ve yerleşimi hızlanır. Türkiye Selçuklu Devleti'nin kuruluşu ayrı bir olaydır (1077)." },
  ],
  units: [
    { code: "R", label: "Romen Diyojen", tone: "b", path: [v(3, 4), v(3, 4), v(6.2, 4), v(7, 4), v(7, 4), v(7, 4)] },
    { code: "K", label: "Bizans kanatları", tone: "b", path: [v(3.6, 6.4), v(3.6, 6.4), v(5.8, 6), v(6.6, 5.4), v(7, 5.1), v(7, 5.1)] },
    { code: "K", label: "Bizans kanatları", tone: "b", path: [v(3.6, 1.6), v(3.6, 1.6), v(5.8, 2), v(6.6, 2.6), v(7, 2.9), v(7, 2.9)] },
    { code: "U", label: "Uz–Peçenek (taraf değiştirir)", tone: "c", path: [v(1.6, 2.8), v(1.6, 2.8), v(4.2, 2.8), v(9.8, 1.8), v(9.6, 2.4), v(9.6, 2.4)], switchAt: 3, toneAfter: "a" },
    { code: "Ç", label: "Bizans artçısı", tone: "b", path: [v(1.2, 4.8), v(1.2, 4.8), v(1.5, 4.8), v(0.6, 6.6), v(0.6, 6.6), v(0.6, 6.6)] },
    { code: "A", label: "Alp Arslan", tone: "a", path: [v(10, 4), v(10, 4), v(11.6, 4), v(11.2, 4), v(9.3, 4), v(9.3, 4)] },
    { code: "O", label: "Atlı okçular", tone: "a", path: [v(9, 6.4), v(6.4, 6.3), v(9.6, 6.4), v(10.2, 6.4), v(7.4, 6.6), v(7.4, 6.6)] },
    { code: "O", label: "Atlı okçular", tone: "a", path: [v(9, 1.6), v(6.4, 1.7), v(9.6, 1.6), v(11.4, 2.8), v(7.4, 1.4), v(7.4, 1.4)] },
    { code: "P", label: "Pusudaki Selçuklu birlikleri", tone: "a", path: [v(12, 7), v(12, 7), v(12, 7), v(8, 7.6), v(5, 5.6), v(5, 5.6)], hiddenUntil: 3 },
    { code: "P", label: "Pusudaki Selçuklu birlikleri", tone: "a", path: [v(12, 1), v(12, 1), v(12, 1), v(8, 0.4), v(5, 2.4), v(5, 2.4)], hiddenUntil: 3 },
  ],
  terrain: [...compass(13)],
  width: 13,
  sides: [["Selçuklu", "a"], ["Bizans", "b"]],
  volleys: [
    [0.3, 1.4, 6, 1],
    [0.3, 1.4, 7, 2],
    [3.4, 5, 6, 0],
    [3.4, 5, 7, 0],
  ],
  marks: (t, pos) => (t >= 4.6 ? [ring(pos(0))] : []),
};

/* ---------------- Miryokefalon 1176 ---------------- */
const miryokefalon: Battle = {
  stages: [
    { name: "Bizans Konya'ya yürür", text: "İmparator Manuel Komnenos, Türkiye Selçuklu merkezine doğru büyük bir orduyla ilerler; ordunun arkasında ağırlık ve kuşatma araçları vardır." },
    { name: "Uzun kol dar geçide girer", text: "Yol iki dağ sırası arasındaki dar bir geçitten geçer. Kol uzar; öncü ile artçı birbirini göremez." },
    { name: "Tepelerden saldırı", text: "II. Kılıç Arslan'ın birlikleri tepelerden ok atar ve yamaçlardan iner. Dar yolda Bizans birlikleri yayılamaz." },
    { name: "Kol bölünür", text: "Ağırlıklar yolu tıkar; öncü ile ana ordu ayrı düşer. Geçidin çıkışı da Selçuklu birlikleriyle kapanır." },
    { name: "Barış ve geri dönüş", text: "Manuel barış ister ve geri çekilir. Sonuç: Bizans'ın Türkleri Anadolu'dan çıkarma hedefi sonuçsuz kalır; Türk yerleşiminin kalıcılığı güçlenir." },
  ],
  units: [
    { code: "Ö", label: "Bizans öncüsü", tone: "b", path: [v(3.8, 4), v(10.4, 4), v(10.4, 4), v(10.8, 4), v(3.8, 4)] },
    { code: "M", label: "Manuel Komnenos", tone: "b", path: [v(2.6, 4), v(8.4, 4), v(8.4, 4), v(8.1, 4), v(2.6, 4)] },
    { code: "Y", label: "Ağırlık ve kuşatma araçları", tone: "b", path: [v(1.4, 4), v(6.4, 4), v(6.4, 4), v(6.4, 4), v(1.4, 4)] },
    { code: "Ç", label: "Bizans artçısı", tone: "b", path: [v(0.2, 4), v(4.4, 4), v(4.4, 4), v(4.2, 4), v(0.2, 4)] },
    { code: "K", label: "II. Kılıç Arslan", tone: "a", path: [v(8.6, 6.5), v(8.6, 6.5), v(8.6, 5.4), v(8.4, 5.2), v(8.6, 6.5)] },
    { code: "T", label: "Tepelerdeki birlikler", tone: "a", path: [v(5.2, 6.5), v(5.2, 6.5), v(5.4, 5.4), v(5.8, 5.2), v(5.2, 6.5)] },
    { code: "T", label: "Tepelerdeki birlikler", tone: "a", path: [v(7.2, 1.5), v(7.2, 1.5), v(7, 2.6), v(6.8, 2.8), v(7.2, 1.5)] },
    { code: "G", label: "Geçit çıkışını kapatan birlik", tone: "a", path: [v(13.4, 4), v(13.4, 4), v(13.4, 4), v(12, 4), v(13.4, 4)], hiddenUntil: 3 },
  ],
  terrain: [
    ...mountains([4.4, 6, 7.6, 9.2, 10.8], 5.1, 1.6, 1.7),
    ...mountains([5.2, 6.8, 8.4, 10, 11.6], 2.9, 1.6, 1.7, true),
    txt(v(1.7, 5.9), "dar geçit", "c", { tone: "muted", small: true }),
    ...compass(14, "← batı", "Konya yönü →"),
  ],
  width: 14,
  sides: [["Türkiye Selçuklu", "a"], ["Bizans", "b"]],
  volleys: [
    [1.6, 3.2, 4, 1],
    [1.6, 3.2, 5, 2],
    [1.6, 3.2, 6, 2],
    [2.6, 3.4, 7, 0],
  ],
};

/* ---------------- Kösedağ 1243 ---------------- */
const kosedag: Battle = {
  stages: [
    { name: "Ordular karşılaşır", text: "Sivas ile Erzincan arasındaki Kösedağ'da II. Gıyaseddin Keyhüsrev'in ordusu Baycu Noyan komutasındaki Moğol ordusuyla karşılaşır." },
    { name: "Selçuklu öncüsü saldırır", text: "Selçuklu öncüsü ana orduyu beklemeden Moğol saflarına hücum eder." },
    { name: "Moğollar geri çekilir gibi yapar", text: "Moğol merkezi geri çekilir; öncü takibe çıkar ve ana ordudan kopar." },
    { name: "Pusu kapanır", text: "Yamaçlardaki Moğol birlikleri öncüyü yanlardan sarar; öncü dağılır. (Aynı sahte geri çekilme taktiğini Malazgirt'te Selçuklular kullanmıştı.)" },
    { name: "Ana ordu dağılır", text: "Ana ordu savaşmadan dağılır, sultan çekilir. Sonuç: Moğol üstünlüğü ve vergi/bağlılık ilişkisi. Siyasi son ayrı tarihtir (1308)." },
  ],
  units: [
    { code: "Ö", label: "Selçuklu öncüsü", tone: "a", path: [v(4.6, 4), v(6.8, 4), v(8.6, 4), v(8.6, 4), v(8.6, 4)] },
    { code: "K", label: "II. Gıyaseddin Keyhüsrev", tone: "a", path: [v(2.2, 4), v(2.4, 4), v(2.4, 4), v(2.2, 4), v(0.9, 2.2)] },
    { code: "B", label: "Baycu Noyan", tone: "b", path: [v(10.6, 4), v(10.6, 4), v(12, 4), v(10.4, 4), v(10.2, 4)] },
    { code: "P", label: "Pusudaki Moğol birlikleri", tone: "b", path: [v(10.6, 6.6), v(10.6, 6.6), v(10.6, 6.6), v(8.6, 5.1), v(8.6, 5.1)], hiddenUntil: 3 },
    { code: "P", label: "Pusudaki Moğol birlikleri", tone: "b", path: [v(10.6, 1.4), v(10.6, 1.4), v(10.6, 1.4), v(8.6, 2.9), v(8.6, 2.9)], hiddenUntil: 3 },
  ],
  terrain: [
    ...mountains([4.2, 6, 7.8], 6.4, 1.8, 1.1),
    txt(v(6, 7.85), "Kösedağ", "c", { tone: "muted", small: true }),
    ...compass(13),
  ],
  width: 13,
  sides: [["Türkiye Selçuklu", "a"], ["Moğol", "b"]],
  volleys: [
    [2.6, 3.4, 3, 0],
    [2.6, 3.4, 4, 0],
  ],
  marks: (t, pos) => (t >= 3.6 ? [ring(pos(0))] : []),
};

const caption = (who: string) =>
  `Sürgüyü sürükle veya Oynat'a bas: ${who} Harfli pullar birliklerdir, adları altta yazar; kesik halka pusudaki birliktir. Kesik ok o aşamadaki hareketi, kısa ok demeti ok atışını, kırmızı halka sonucu gösterir. Konumlar temsilîdir, ölçekli harita değildir.`;

/* ---------------- Üç baskı hattı: zaman şeridi ---------------- */
const rivals: { year: number; name: string; side: string; rival: string; tone: Tone; result: string; at: "n" | "nw" | "ne"; h: number }[] = [
  { year: 1071, name: "Malazgirt", side: "Büyük Selçuklu", rival: "Bizans", tone: "b", result: "Anadolu'ya göç ve yerleşim hızlanır." , at: "n", h: 1 },
  { year: 1176, name: "Miryokefalon", side: "Türkiye Selçuklu", rival: "Bizans", tone: "b", result: "Türk yerleşiminin kalıcılığı güçlenir." , at: "n", h: 2.8 },
  { year: 1230, name: "Yassıçemen", side: "Türkiye Selçuklu", rival: "Harzemşahlar", tone: "c", result: "Harzemşah baskısı kırılır; Moğollarla doğrudan komşuluk başlar." , at: "nw", h: 4.6 },
  { year: 1243, name: "Kösedağ", side: "Türkiye Selçuklu", rival: "Moğollar", tone: "warn", result: "Moğol üstünlüğü; merkezî güç sarsılır." , at: "ne", h: 1 },
];
const X = (year: number) => ((year - 1060) / (1250 - 1060)) * 12;
const timeline: FigureDef = {
  caption:
    "İleri ile savaşları sırayla aç. Her kartta yıl, taraf, karşı güç ve sonuç ayrı satırdadır: aynı \"savaş\" sözcüğü farklı rakip ve farklı sonuç demektir.",
  alt: "1060–1250 arası zaman çizgisi; 1071 Malazgirt ve 1176 Miryokefalon Bizans'a, 1230 Yassıçemen Harzemşahlara, 1243 Kösedağ Moğollara karşı.",
  steps: rivals.map((r) => `${r.year} ${r.name}`),
  draw: (_v, step) => {
    const els: El[] = [seg(v(0, 0), v(12, 0), { tone: "ink" })];
    for (const y of [1100, 1150, 1200]) {
      els.push(seg(v(X(y), -0.15), v(X(y), 0.15), { tone: "muted", thin: true }), txt(v(X(y), -0.3), String(y), "s", { tone: "muted", small: true }));
    }
    rivals.forEach((r, i) => {
      const x = X(r.year);
      const on = i <= step;
      const h = r.h;
      els.push(seg(v(x, 0), v(x, h), { tone: on ? r.tone : "muted", thin: !on, dash: !on }));
      els.push(pt(v(x, 0), undefined, "n", on ? r.tone : "muted", !on));
      if (on) els.push(txt(v(x, h + 0.95), `karşı güç: ${r.rival}`, r.at, { tone: r.tone, small: true }));
      els.push(txt(v(x, h + 0.15), on ? `${r.year} ${r.name}` : String(r.year), r.at, { tone: on ? r.tone : "muted", small: true, bold: i === step }));
    });
    const r = rivals[step];
    return { els, readout: [`${r.year} ${r.name}: ${r.side} – ${r.rival}`, `Sonuç: ${r.result}`] };
  },
};

export const historyFiguresSeljuk: Record<string, Record<string, FigureDef>> = {
  "selcuklu-yerlesme-devletlesme": {
    "Malazgirt ile kuruluş tarihini ayır": battleFigure(
      malazgirt,
      caption("1071 Malazgirt'te sahte geri çekilmeyi, saf değiştiren birlikleri ve hilal biçimli kuşatmayı izle."),
      "Malazgirt şeması: batıda Bizans merkezi, kanatları, artçısı ve Uz–Peçenek birlikleri; doğuda Alp Arslan, iki atlı okçu grubu ve kanatlarda pusu birlikleri. Aşamalar ilerledikçe Bizans takibe çıkar ve kuşatılır.",
    ),
    "Üç baskı hattını karıştırma": timeline,
    "Zayıflama, bağlılık ve sona erme ayrı tarihlerdir": battleFigure(
      kosedag,
      caption("1243 Kösedağ'da öncünün ana ordudan kopup pusuya düşmesini izle."),
      "Kösedağ şeması: batıda Selçuklu ana ordusu ve öncüsü, doğuda Moğol merkezi, kuzey ve güney yamaçlarında pusu birlikleri; öncü takip ederken kuşatılır, ana ordu dağılır.",
    ),
    "Miryokefalon’da hangi sonuç güçlendi?": battleFigure(
      miryokefalon,
      caption("1176 Miryokefalon'da uzun Bizans kolunun dar geçitte tepelerden vurulmasını izle."),
      "Miryokefalon şeması: iki dağ sırası arasında dar geçit; Bizans öncü, ana ordu, ağırlık ve artçısı geçide girer; tepelerdeki Selçuklu birlikleri ok atar, geçit çıkışı kapanır, Bizans geri döner.",
    ),
  },
};
