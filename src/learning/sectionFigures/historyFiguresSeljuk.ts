import { dist, lerp, poly, pt, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Selçuklu dönemi savaş şemaları. Her savaş, sürgü veya "Oynat" ile ilerleyen
 * aşamalardan oluşur: birlikler bir aşamadan ötekine kayar, kesik oklar o
 * aşamadaki hareketi, kısa ok demetleri atlı okçu atışını gösterir.
 * Konumlar temsilîdir; ölçekli harita değildir. Anlatım ders kaynaklarının
 * genel çerçevesini izler, ayrıntılı birlik sayıları verilmez.
 */

type Unit = {
  label: string;
  tone: Tone;
  /** One position per stage (stage 0 … n-1). */
  path: V[];
  /** Stage from which the unit appears in a different colour (side change). */
  switchAt?: number;
  toneAfter?: Tone;
  /** Before this stage the unit is hidden in ambush (outline only). */
  hiddenUntil?: number;
  /** From this stage on the label is dropped (the unit merges into a group). */
  labelUntil?: number;
  at?: "n" | "s" | "e" | "w";
  w?: number;
  h?: number;
};
type Stage = { name: string; text: string };
type Battle = {
  stages: Stage[];
  units: Unit[];
  terrain: El[];
  /** Arrow volleys: [stage window start, end, from unit index, to unit index]. */
  volleys?: [number, number, number, number][];
  /** Extra marks for a stage window. */
  marks?: (t: number, pos: (i: number) => V) => El[];
};

const smooth = (x: number) => x * x * (3 - 2 * x);
function posAt(path: V[], t: number): V {
  if (path.length === 1) return path[0];
  const i = Math.max(0, Math.min(path.length - 2, Math.floor(t)));
  const f = smooth(Math.max(0, Math.min(1, t - i)));
  return lerp(path[i], path[i + 1], f);
}
function box(c: V, w: number, h: number, tone: Tone, hidden: boolean): El {
  const [x, y] = c;
  return poly(
    [v(x - w / 2, y - h / 2), v(x + w / 2, y - h / 2), v(x + w / 2, y + h / 2), v(x - w / 2, y + h / 2)],
    hidden ? { tone, dash: true, thin: true } : { tone, fill: tone, bold: true },
  );
}
function labelPoint(c: V, u: Unit): V {
  const h = (u.h ?? 0.7) / 2 + 0.25;
  const w = (u.w ?? 1.4) / 2 + 0.2;
  switch (u.at ?? "n") {
    case "s":
      return v(c[0], c[1] - h);
    case "e":
      return v(c[0] + w, c[1]);
    case "w":
      return v(c[0] - w, c[1]);
    default:
      return v(c[0], c[1] + h);
  }
}
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

function battleFigure(b: Battle, caption: string, alt: string): FigureDef {
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
        els.push(box(c, u.w ?? 1.4, u.h ?? 0.7, tone, hidden));
        const at = u.at ?? "n";
        if (u.labelUntil !== undefined && t >= u.labelUntil - 0.5) return;
        els.push(txt(labelPoint(c, u), hidden ? `${u.label} (pusu)` : u.label, at === "n" ? "n" : at === "s" ? "s" : at, { tone, small: true }));
      });
      if (b.marks) els.push(...b.marks(t, pos));
      const stage = b.stages[k];
      return { els, readout: [`Aşama ${k + 1}/${n}: ${stage.name}`, stage.text] };
    },
  };
}

const frame = (w: number, h: number): El =>
  poly([v(0, 0), v(w, 0), v(w, h), v(0, h)], { tone: "muted", thin: true });
const mountain = (x: number, y: number, w: number, h: number): El =>
  poly([v(x - w / 2, y), v(x, y + h), v(x + w / 2, y)], { tone: "muted", fill: "muted", thin: true });
const mountains = (xs: number[], y: number, w: number, h: number, down = false): El[] =>
  xs.map((x) => (down ? poly([v(x - w / 2, y), v(x, y - h), v(x + w / 2, y)], { tone: "muted", fill: "muted", thin: true }) : mountain(x, y, w, h)));
const legend = (x: number, y: number, a: string, b: string, aTone: Tone = "a", bTone: Tone = "b"): El[] => [
  box(v(x, y), 0.5, 0.35, aTone, false),
  txt(v(x + 0.4, y), a, "e", { tone: aTone, small: true }),
  box(v(x + 1.4 + a.length * 0.3, y), 0.5, 0.35, bTone, false),
  txt(v(x + 1.8 + a.length * 0.3, y), b, "e", { tone: bTone, small: true }),
];

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
    { label: "Romen Diyojen", tone: "b", path: [v(3, 4), v(3, 4), v(6.2, 4), v(7, 4), v(7, 4), v(7, 4)], w: 1.8, at: "w" },
    { label: "Bizans sol", tone: "b", path: [v(3.6, 6.6), v(3.6, 6.6), v(5.8, 6.1), v(6.6, 5.2), v(7, 4.75), v(7, 4.75)], labelUntil: 3 },
    { label: "Bizans sağ", tone: "b", path: [v(3.6, 1.4), v(3.6, 1.4), v(5.8, 1.9), v(6.6, 2.8), v(7, 3.25), v(7, 3.25)], labelUntil: 3, at: "s" },
    { label: "Uz–Peçenek", tone: "c", path: [v(1.4, 2.9), v(1.4, 2.9), v(4, 2.8), v(9.8, 1.8), v(9.8, 2.2), v(9.8, 2.2)], switchAt: 3, toneAfter: "a", at: "s" },
    { label: "Artçı", tone: "b", path: [v(1, 4.8), v(1, 4.8), v(1.3, 4.8), v(0.8, 6.8), v(0.8, 6.8), v(0.8, 6.8)], at: "e", w: 1.1 },
    { label: "Alp Arslan", tone: "a", path: [v(10, 4), v(10, 4), v(11.6, 4), v(11.2, 4), v(9.6, 4), v(9.6, 4)], w: 1.6 },
    { label: "Atlı okçu", tone: "a", path: [v(9, 6.6), v(6.4, 6.5), v(9.6, 6.6), v(10.2, 6.6), v(7.4, 6.5), v(7.4, 6.5)], w: 1.1 },
    { label: "Atlı okçu", tone: "a", path: [v(9, 1.4), v(6.4, 1.5), v(9.6, 1.4), v(11.6, 3), v(7.4, 1.5), v(7.4, 1.5)], w: 1.1, at: "s" },
    { label: "Selçuklu", tone: "a", path: [v(11.8, 7), v(11.8, 7), v(11.8, 7), v(7.6, 7.6), v(4.8, 5.6), v(4.8, 5.6)], hiddenUntil: 3, w: 1.1 },
    { label: "Selçuklu", tone: "a", path: [v(11.8, 0.9), v(11.8, 0.9), v(11.8, 0.9), v(7.6, 0.4), v(4.8, 2.4), v(4.8, 2.4)], hiddenUntil: 3, w: 1.1, at: "s" },
  ],
  terrain: [
    frame(13, 8),
    ...legend(0.5, -1.1, "Selçuklu", "Bizans"),
    txt(v(0.4, 7.6), "batı", "e", { tone: "muted", small: true }),
    txt(v(12.6, 4), "doğu", "w", { tone: "muted", small: true }),
  ],
  volleys: [
    [0.3, 1.4, 6, 1],
    [0.3, 1.4, 7, 2],
    [3.4, 5, 6, 0],
    [3.4, 5, 7, 0],
  ],
  marks: (t, pos) => (t >= 4.6 ? [pt(pos(0), "esir", "s", "warn")] : []),
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
    { label: "Öncü", tone: "b", path: [v(3.8, 4), v(10.4, 4), v(10.4, 4), v(10.8, 4), v(3.8, 4)], w: 1.1, at: "n" },
    { label: "Manuel", tone: "b", path: [v(2.3, 4), v(8.2, 4), v(8.2, 4), v(7.9, 4), v(2.3, 4)], w: 1.3, at: "s" },
    { label: "Ağırlık", tone: "b", path: [v(0.8, 4), v(6, 4), v(6, 4), v(6, 4), v(0.8, 4)], w: 1.3, at: "n" },
    { label: "Artçı", tone: "b", path: [v(-0.6, 4), v(3.8, 4), v(3.8, 4), v(3.6, 4), v(-0.6, 4)], w: 1, at: "s" },
    { label: "Kılıç Arslan", tone: "a", path: [v(8.6, 6.5), v(8.6, 6.5), v(8.6, 5.5), v(8.4, 5.3), v(8.6, 6.5)], w: 1.4 },
    { label: "Yamaç birliği", tone: "a", path: [v(4.2, 6.5), v(4.2, 6.5), v(4.4, 5.5), v(4.6, 5.3), v(4.2, 6.5)], w: 1.1 },
    { label: "Yamaç birliği", tone: "a", path: [v(7.4, 1.4), v(7.4, 1.4), v(7.2, 2.3), v(7, 2.4), v(7.4, 1.4)], w: 1.1, at: "s" },
    { label: "Geçit çıkışı", tone: "a", path: [v(13.4, 4), v(13.4, 4), v(13.4, 4), v(12.4, 4), v(13.4, 4)], hiddenUntil: 3, w: 1, at: "s" },
  ],
  terrain: [
    frame(14, 8),
    ...mountains([4.4, 6, 7.6, 9.2, 10.8], 5.1, 1.6, 1.7),
    ...mountains([5.2, 6.8, 8.4, 10, 11.6], 2.9, 1.6, 1.7, true),
    txt(v(0.2, 5.6), "geçit girişi →", "e", { tone: "muted", small: true }),
    ...legend(0.4, -0.6, "Türkiye Selçuklu", "Bizans"),
    txt(v(13.8, 7.5), "Konya yönü →", "w", { tone: "muted", small: true }),
  ],
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
    { label: "Selçuklu öncü", tone: "a", path: [v(4.6, 4), v(6.8, 4), v(8.6, 4), v(8.6, 4), v(8.6, 4)], w: 1.3, labelUntil: 4 },
    { label: "Keyhüsrev", tone: "a", path: [v(2.2, 4), v(2.4, 4), v(2.4, 4), v(2.2, 4), v(0.9, 2)], w: 1.4, at: "s" },
    { label: "Baycu Noyan", tone: "b", path: [v(10.6, 4), v(10.6, 4), v(12, 4), v(10.6, 4), v(10.6, 4)], w: 1.4, at: "s" },
    { label: "Moğol", tone: "b", path: [v(10.6, 6.9), v(10.6, 6.9), v(10.6, 6.9), v(8.6, 5.5), v(8.6, 5.6)], hiddenUntil: 3, w: 1 },
    { label: "Moğol", tone: "b", path: [v(10.6, 1), v(10.6, 1), v(10.6, 1), v(8.6, 2.5), v(8.6, 2.4)], hiddenUntil: 3, w: 1, at: "s" },
  ],
  terrain: [
    frame(13, 8),
    ...mountains([3.8, 5.6, 7.4], 6.8, 1.8, 1),
    txt(v(1.8, 7.3), "Kösedağ", "c", { tone: "muted", small: true }),
    ...legend(0.4, -0.6, "Türkiye Selçuklu", "Moğol"),
  ],
  volleys: [
    [2.6, 3.4, 3, 0],
    [2.6, 3.4, 4, 0],
  ],
  marks: (t, pos) => (t >= 3.6 ? [pt(pos(0), "dağıldı", "w", "warn")] : []),
};

const caption = (who: string) =>
  `Sürgüyü sürükle veya Oynat'a bas: ${who} Kesik ok o aşamadaki hareketi, kısa ok demeti atlı okçu atışını gösterir. Konumlar temsilîdir, ölçekli harita değildir.`;

/* ---------------- Üç baskı hattı: zaman şeridi ---------------- */
const rivals: { year: number; name: string; side: string; rival: string; tone: Tone; result: string; at: "n" | "nw" | "ne"; h: number }[] = [
  { year: 1071, name: "Malazgirt", side: "Büyük Selçuklu", rival: "Bizans", tone: "b", result: "Anadolu'ya göç ve yerleşim hızlanır." , at: "n", h: 1 },
  { year: 1176, name: "Miryokefalon", side: "Türkiye Selçuklu", rival: "Bizans", tone: "b", result: "Türk yerleşiminin kalıcılığı güçlenir." , at: "n", h: 2.6 },
  { year: 1230, name: "Yassıçemen", side: "Türkiye Selçuklu", rival: "Harzemşahlar", tone: "c", result: "Harzemşah baskısı kırılır; Moğollarla doğrudan komşuluk başlar." , at: "nw", h: 4.2 },
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
      if (on) els.push(txt(v(x, h + 0.75), `karşı güç: ${r.rival}`, r.at, { tone: r.tone, small: true }));
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
