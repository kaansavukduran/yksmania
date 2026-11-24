import { poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame, type Tone } from "./figureKit";
import { SMALL_FS, textWidth } from "./labelPlacement";
import { CW, card, fitH, frame, LH, rect, rowsFig, SC, tableFig, wrap } from "./turkishFigures060Kit";

/*
 * Forge065: dört TYT Türkçe kopya kâğıdı (isimler ve isim tamlaması,
 * sıfatlar, zamirler, fiilde çatı) özgün etkileşimli figürlerle. Her figür
 * dersin daha önce çizimi olmayan bir bölümüne bağlıdır. Bütün örnek
 * cümleler bu dosya için yazıldı; kâğıtların cümleleri ve tabloları
 * kopyalanmadı. Çizimler kavram şemasıdır, ölçekli değildir; seçim ve adım
 * düğmeleri öğrenme kaydı üretmez.
 *
 * Yeni iki çizim biçimi var:
 *  - Bağ okları: cümlenin sözcükleri tek satırda, her sözcükten bağlandığı
 *    sözcüğe cümlenin altında köşeli bir ok iner. Ok üstünde yazı yoktur;
 *    ilişkinin adı okların altındaki satırda ve readout'ta yazılır.
 *  - Ek şeridi: sözcükler yan yana ek kutularına bölünür (kök kalın çerçeve,
 *    yapım eki dolu kutu, çekim eki kesik çerçeve, araya giren ses soluk
 *    kutu); adımlar şeridi kurar ya da dönüştürür.
 */

/** Küçük kalın yazının çizim birimi cinsinden genişliği. */
const bw = (s: string) => textWidth(s, SMALL_FS, 700) / SC;
/** Küçük düz yazının genişliği. */
const sw = (s: string) => textWidth(s, SMALL_FS, 500) / SC;
/** "e" ile bağlanan yazının bağlantı noktasından sağa kayması (12 SVG birimi). */
const OFF = 12 / SC;
/** Sözcük kutusunun yarı yüksekliği. */
const BOX = 0.3;
/** Sözcük satırları arası. */
const ROW = 0.78;
/** Ok katları arası. */
const LEVEL = 0.34;

export interface Arc {
  from: number;
  to: number;
  tone?: Tone;
  dash?: boolean;
  /** Seçili değilse ince ve soluk çizilir. */
  soft?: boolean;
}
export interface Box {
  i: number;
  tone: Tone;
  dash?: boolean;
  fill?: boolean;
}

/**
 * Bağ okları. Üstte cümlenin kendisi; altında sözcükler alt alta, her
 * sözcükten bağlandığı sözcüğe sağ yanda köşeli bir ok gider. Okların katı,
 * aynı katta iki okun aralığı çakışmayacak biçimde seçilir. Okların sağında
 * her sözcüğün kısa görev adı yazılır; ok üstünde yazı yoktur.
 */
function drawLinks(o: {
  sentence?: string;
  tokens: string[];
  muted?: number[];
  arcs: Arc[];
  boxes: Box[];
  roles?: (string | undefined)[];
  roleTone?: (i: number) => Tone;
  notes: { s: string; tone?: Tone }[];
  pick?: boolean;
  /** Ok katlarının en az sayısı (adımlar arasında görev sütununu sabitler). */
  minLevels?: number;
}) {
  const els: El[] = [];
  let y = 0;
  if (o.sentence) {
    for (const s of wrap(o.sentence, CW - 0.4)) {
      els.push(txt(v(0.1, y), s, "e", { small: true, tone: "muted" }));
      y -= LH;
    }
    y -= 0.32;
  }
  const ry = o.tokens.map((_, i) => y - i * ROW);
  const right = o.tokens.map((t) => 0.3 + OFF + bw(t) + 0.14);
  for (const b of o.boxes) els.push(rect(0.12, ry[b.i] + BOX, right[b.i], ry[b.i] - BOX, b.tone, b.fill ?? false, b.dash));
  o.tokens.forEach((t, i) =>
    els.push(txt(v(0.3, ry[i]), t, "e", { small: true, bold: true, tone: o.muted?.includes(i) ? "muted" : "ink", pick: o.pick ? i : undefined })),
  );
  // Her sözcükteki uçlar, öteki ucun yönüne göre kutu yüksekliğine yayılır.
  const ends = new Map<number, { key: string; other: number }[]>();
  o.arcs.forEach((a, k) => {
    for (const [i, side, other] of [
      [a.from, "from", a.to],
      [a.to, "to", a.from],
    ] as const) {
      if (!ends.has(i)) ends.set(i, []);
      ends.get(i)!.push({ key: `${k}:${side}`, other });
    }
  });
  const endY = new Map<string, number>();
  for (const [i, list] of ends) {
    list.sort((p, q) => q.other - p.other);
    const span = 0.32;
    list.forEach((e, n) => endY.set(e.key, list.length === 1 ? ry[i] : ry[i] + span / 2 - (span * n) / (list.length - 1)));
  }
  // Katlar: kısa oklar içte.
  const order = o.arcs
    .map((a, k) => ({ k, lo: Math.min(a.from, a.to), hi: Math.max(a.from, a.to) }))
    .sort((p, q) => p.hi - p.lo - (q.hi - q.lo));
  const levels: { lo: number; hi: number }[][] = [];
  const levelOf = new Map<number, number>();
  for (const r of order) {
    let L = 0;
    while (levels[L]?.some((s) => !(r.hi < s.lo || r.lo > s.hi))) L++;
    (levels[L] ??= []).push(r);
    levelOf.set(r.k, L);
  }
  const X0 = Math.max(...right) + 0.36;
  o.arcs.forEach((a, k) => {
    const x = X0 + levelOf.get(k)! * LEVEL;
    const y0 = endY.get(`${k}:from`)!;
    const y1 = endY.get(`${k}:to`)!;
    const tone = a.tone ?? "a";
    const st = { tone: a.soft ? ("muted" as Tone) : tone, thin: a.soft, dash: a.dash, bold: !a.soft };
    els.push(poly([v(right[a.from] + 0.04, y0), v(x, y0), v(x, y1)], { ...st, open: true }));
    els.push(vec(v(x, y1), v(right[a.to] + 0.04, y1), st));
  });
  const nLevels = Math.max(levels.length, o.minLevels ?? 0);
  const RX = X0 + Math.max(0, nLevels - 1) * LEVEL + 0.3;
  o.roles?.forEach((r, i) => {
    if (!r) return;
    if (RX + OFF + sw(r) > CW) throw Error(`görev adı sığmıyor: ${r}`);
    els.push(txt(v(RX, ry[i]), r, "e", { small: true, tone: o.roleTone?.(i) ?? "muted" }));
  });
  y = ry[ry.length - 1] - BOX - 0.55;
  for (const n of o.notes)
    for (const s of wrap(n.s, CW - 0.4)) {
      els.push(txt(v(0.1, y), s, "e", { small: true, tone: n.tone ?? "ink" }));
      y -= LH;
    }
  return { els, h: -y - 0.1 };
}

export interface LinkStep {
  label: string;
  sentence: string;
  tokens: string[];
  muted?: number[];
  arcs: Arc[];
  boxes?: Box[];
  roles?: (string | undefined)[];
  notes: { s: string; tone?: Tone }[];
  readout: string[];
}

/** Adım adım bağ okları: her adım bir cümle ya da aynı cümlenin yeni okuması. */
function linkSteps(o: { caption: string; alt: string; steps: LinkStep[]; foot: string; minLevels?: number }): FigureDef {
  const build = (st: LinkStep) =>
    drawLinks({ sentence: st.sentence, tokens: st.tokens, muted: st.muted, arcs: st.arcs, boxes: st.boxes ?? [], roles: st.roles, notes: st.notes, minLevels: o.minLevels });
  const top = 0.45;
  const h = Math.max(...o.steps.map((s) => build(s).h));
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h, top),
    steps: o.steps.map((s) => s.label),
    draw: (_v, step) => {
      const st = o.steps[Math.min(step, o.steps.length - 1)];
      const { els } = build(st);
      els.push(...frame(h, top));
      return { els, readout: [...st.readout, o.foot] };
    },
  };
}

export interface Tok {
  s: string;
  /** Bağlandığı sözcüğün sırası; yüklem ve bağımsız sözcükte yok. */
  head?: number;
  /** Sözcüğün sağına yazılan kısa görev adı. */
  role: string;
  detail: string[];
}

/**
 * Tıklanabilir cümle: her sözcük seçim düğmesidir. Bütün bağlar soluk
 * çizilir; seçilen sözcüğün oku koyulaşır, sözcük dolu, bağlandığı sözcük
 * kesik çerçeveyle işaretlenir.
 */
function linkPick(o: { caption: string; alt: string; sentence: string; tokens: Tok[]; foot: string; prompt: string; dashTo?: number[] }): FigureDef {
  const tokens = o.tokens.map((t) => t.s);
  const base = o.tokens.flatMap((t, i) => (t.head === undefined ? [] : [{ from: i, to: t.head, dash: o.dashTo?.includes(i) }]));
  const build = (pick: number) => {
    const t = o.tokens[pick];
    const arcs: Arc[] = base.map((a) => ({ ...a, soft: a.from !== pick }));
    const boxes: Box[] = pick < 0 ? [] : [{ i: pick, tone: "a", fill: true }, ...(t.head === undefined ? [] : [{ i: t.head, tone: "a" as Tone, dash: true }])];
    return drawLinks({
      sentence: o.sentence,
      tokens,
      arcs,
      boxes,
      roles: o.tokens.map((x) => x.role),
      roleTone: (i) => (i === pick ? "a" : "muted"),
      notes: [],
      pick: true,
    });
  };
  const top = 0.45;
  const h = build(-1).h;
  const name = (s: string) => s.replace(/[.,]$/, "");
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h, top),
    picks: o.tokens.map((t) => ({ label: name(t.s), title: `${name(t.s)}: ${t.role}`, detail: t.detail })),
    draw: (_v, _s, pick = -1) => {
      const { els } = build(pick);
      els.push(...frame(h, top));
      const t = o.tokens[pick];
      return {
        els,
        readout: [pick >= 0 ? `${name(t.s)}${t.head === undefined ? "" : ` → ${name(tokens[t.head])}`}: ${t.detail[0]}` : o.prompt, o.foot],
      };
    },
  };
}

/* ───────────── Ek şeridi ───────────── */

export type Kind = "kök" | "yapım" | "çekim" | "ara";
const KIND_TONE: Record<Kind, Tone> = { kök: "ink", yapım: "c", çekim: "b", ara: "muted" };
const KIND_NAME: Record<Kind, string> = { kök: "kök / taban", yapım: "yapım eki", çekim: "çekim eki", ara: "araya giren ses" };
const KIND_SHAPE: Record<Kind, string> = { kök: "kalın çerçeve", yapım: "dolu kutu", çekim: "kesik çerçeve", ara: "soluk kutu" };

export interface Word {
  parts: [string, Kind][];
  /** Sözcüğün altında kısa görev adı. */
  tag?: string;
  tagTone?: Tone;
}
export interface StripStep {
  label: string;
  /** Şeridin üstünde bağlam satırı. */
  context: string;
  words: Word[];
  /** Birden çok sözcüğü kapsayan öbek: şeridin altında köşeli çizgi. */
  group?: { from: number; to: number; label: string; tone: Tone };
  readout: string[];
}

function stripFig(o: { caption: string; alt: string; steps: StripStep[]; foot: string }): FigureDef {
  const PAD = 0.12;
  const build = (st: StripStep) => {
    const els: El[] = [];
    let y = 0;
    for (const s of wrap(st.context, CW - 0.4)) {
      els.push(txt(v(0.1, y), s, "e", { small: true, tone: "muted" }));
      y -= LH;
    }
    const by = y - 0.42;
    const ws = st.words.map((w) => w.parts.map(([s]) => bw(s) + 2 * PAD));
    const wordW = ws.map((p) => p.reduce((a, b) => a + b, 0));
    const total = wordW.reduce((a, b) => a + b, 0) + 0.5 * (wordW.length - 1);
    if (total > CW - 0.2) throw Error(`şerit sığmıyor: ${st.label}`);
    let x = (CW - total) / 2;
    const spans: [number, number][] = [];
    st.words.forEach((w, i) => {
      const x0 = x;
      w.parts.forEach(([s, kind], j) => {
        const x1 = x + ws[i][j];
        const tone = KIND_TONE[kind];
        els.push(
          kind === "kök"
            ? poly([v(x, by + BOX), v(x1, by + BOX), v(x1, by - BOX), v(x, by - BOX)], { tone, bold: true })
            : rect(x, by + BOX, x1, by - BOX, tone, kind !== "çekim", kind === "çekim"),
        );
        els.push(txt(v((x + x1) / 2, by), s, "c", { small: true, bold: true, tone: kind === "ara" ? "muted" : "ink" }));
        x = x1;
      });
      spans.push([x0, x]);
      x += 0.5;
    });
    // Görev adları: komşu ad çakışırsa ikinci sıraya iner.
    let low = by - BOX;
    let lastEnd = -Infinity;
    let lastRow = 1;
    st.words.forEach((w, i) => {
      if (!w.tag) return;
      const c = (spans[i][0] + spans[i][1]) / 2;
      const half = bw(w.tag) / 2;
      const row = c - half < lastEnd + 0.2 && lastRow === 0 ? 1 : 0;
      const ty = by - BOX - 0.36 - row * LH;
      els.push(txt(v(c, ty), w.tag, "c", { small: true, tone: w.tagTone ?? "muted" }));
      low = Math.min(low, ty - 0.2);
      lastEnd = c + half;
      lastRow = row;
    });
    if (st.group) {
      const gy = low - 0.25;
      const x0 = spans[st.group.from][0];
      const x1 = spans[st.group.to][1];
      els.push(seg(v(x0, gy), v(x1, gy), { tone: st.group.tone }), seg(v(x0, gy), v(x0, gy + 0.14), { tone: st.group.tone }), seg(v(x1, gy), v(x1, gy + 0.14), { tone: st.group.tone }));
      const lc = Math.min(Math.max((x0 + x1) / 2, bw(st.group.label) / 2 + 0.1), CW - bw(st.group.label) / 2 - 0.1);
      els.push(txt(v(lc, gy - 0.36), st.group.label, "c", { small: true, tone: st.group.tone }));
      low = gy - 0.6;
    }
    return { els, h: -low + 0.15 };
  };
  const top = 0.45;
  const h = Math.max(...o.steps.map((s) => build(s).h));
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(h, top),
    steps: o.steps.map((s) => s.label),
    draw: (_v, step): FigureFrame => {
      const st = o.steps[Math.min(step, o.steps.length - 1)];
      const { els } = build(st);
      els.push(...frame(h, top));
      const kinds = (["kök", "yapım", "çekim", "ara"] as Kind[]).filter((k) => st.words.some((w) => w.parts.some(([, kk]) => kk === k)));
      return { els, legend: kinds.map((k) => ({ code: "", label: `${KIND_NAME[k]}: ${KIND_SHAPE[k]}`, tone: KIND_TONE[k] })), readout: [...st.readout, o.foot] };
    },
  };
}

/* ───────────── 003 İsimler ve isim tamlaması ───────────── */

const caseLinks = linkPick({
  caption:
    "Cümledeki her ada tıkla. Ok, adın ekiyle hangi sözcüğe bağlandığını gösterir: durum ekleri adı yükleme, ilgi eki adı başka bir ada bağlar. Bir ek ancak bağlandığı sözcük ve sorusuyla adlandırılır.",
  alt: "Komşunun kızı kütüphaneden kitabı eve taşıdı cümlesi, altında sözcükler alt alta. Komşunun kızı sözcüğüne, kızı, kütüphaneden, kitabı ve eve taşıdı yüklemine köşeli oklarla bağlı. Seçilen sözcük dolu, bağlandığı sözcük kesik çerçeveli.",
  prompt: "Bir sözcüğe tıkla: eki, sorusu ve bağlandığı sözcük açılır.",
  sentence: "“Komşunun kızı kütüphaneden kitabı eve taşıdı.”",
  tokens: [
    { s: "Komşunun", head: 1, role: "ilgi eki: ada bağlanır", detail: ["komşu-nun: ilgi eki. Kimin kızı? Ok yükleme değil, kızı adına gider.", "İlgi eki adı fiile değil başka bir ada bağlar; tamlamanın tamlayanıdır."] },
    { s: "kızı", head: 5, role: "iyelik, yalın: özne", detail: ["kız-ı: buradaki -ı iyeliktir (komşunun kızı), belirtme değildir. Kim taşıdı? Komşunun kızı: özne.", "Durum eki yok, yani yalın durum. Aynı biçim ‘Kızı gördüm.’ cümlesinde belirtme olurdu."] },
    { s: "kütüphaneden", head: 5, role: "ayrılma: nereden?", detail: ["kütüphane-den: ayrılma durumu. Nereden taşıdı? Kütüphaneden.", "Durum ekleri adı yükleme bağlar; bu ok fiile gider."] },
    { s: "kitabı", head: 5, role: "belirtme: neyi?", detail: ["kitab-ı: belirtme durumu, p → b yumuşaması. Neyi taşıdı? Kitabı.", "‘Onun kitabı’ diye açılmaz; aitlik değil, belirli nesne ilişkisi var."] },
    { s: "eve", head: 5, role: "yönelme: nereye?", detail: ["ev-e: yönelme durumu. Nereye taşıdı? Eve.", "Yönelme eki ünlüyle biten adlarda araya y alır: masa-y-a."] },
    { s: "taşıdı", role: "yüklem", detail: ["taşı-dı: yüklem. Dört ok buraya gelir; yalnız komşunun başka bir ada bağlanır.", "Önce yüklemi bul, sonra her adın ekini yükleme ya da ada yönelt."] },
  ],
  foot: "Örnek cümle bu figür için yazıldı. Ok yönü bağlanan sözcüğü gösterir; okların üstünde yazı yoktur.",
});

const nounStructure = stripFig({
  caption:
    "İleri ile üç sözcüğü şeride böl. Çekim ekleri (kesik çerçeve) çıkarılınca kalan taban sözcüğün yapısını söyler: yalnız kök kalırsa basit, yapım eki kalırsa türemiş, iki sözcük kaynaşmışsa birleşik. Ek sayısı yapıyı değiştirmez.",
  alt: "Yatay ek şeridi. Yollarımızdan: yol kök, lar ımız dan çekim ekleri, basit. Yolcularımızdan: yol kök, cu yapım eki, lar ımız dan çekim, türemiş. Gökkuşağından: gök ve kuşağ kaynaşmış taban, ı iyelik, n araya giren ses, dan çekim, birleşik.",
  steps: [
    {
      label: "yollarımızdan",
      context: "“Yollarımızdan biri kapandı.”",
      words: [{ parts: [["yol", "kök"], ["lar", "çekim"], ["ımız", "çekim"], ["dan", "çekim"]], tag: "basit" }],
      readout: ["Üç çekim eki çıkarılınca yalnız yol kalır: yapıca basit isim.", "Çoğul, iyelik ve ayrılma eki sözcüğü cümleye bağlar; yeni ad kurmaz."],
    },
    {
      label: "yolcularımızdan",
      context: "“Yolcularımızdan biri indi.”",
      words: [{ parts: [["yol", "kök"], ["cu", "yapım"], ["lar", "çekim"], ["ımız", "çekim"], ["dan", "çekim"]], tag: "türemiş" }],
      readout: ["Çekim ekleri çıkarılınca yolcu kalır: -cu yeni bir ad kurmuştur, yapıca türemiş.", "Bir önceki sözcükten tek farkı bir yapım eki; ek sayısı değil türü belirleyicidir."],
    },
    {
      label: "gökkuşağından",
      context: "“Gökkuşağından bir renk seç.”",
      words: [{ parts: [["gök", "kök"], ["kuşağ", "kök"], ["ı", "çekim"], ["n", "ara"], ["dan", "çekim"]], tag: "birleşik" }],
      readout: ["Çekim ekleri çıkarılınca gökkuşağı kalır: iki sözcük tek kavramda kaynaşmış, yapıca birleşik.", "kuşak → kuşağ: ünlüyle başlayan ek gelince k yumuşar; n iki ek arasına giren sestir."],
    },
  ],
  foot: "Önce çekim eklerini at, kalan tabana bak. Örnek sözcükler bu figür için seçildi.",
});

const countTable = tableFig({
  caption:
    "Sayı bakımından ad, biçimdeki ekle anlamdaki çokluğun birlikte okunmasıyla sınıflanır. Bir satıra tıkla: -lar ekinin bulunup bulunmadığı ve gerçekte kaç varlıktan söz edildiği açılır.",
  alt: "Altı satırlı tablo. arı: ek yok, tek varlık, tekil. arılar: -lar var, birden çok arı, çoğul. koro: ek yok, çok kişi tek bütün, topluluk. korolar: -lar var, birden çok koro, topluluk adının çoğulu. halamlar: -lar var, hala ve ailesi, aile anlamı. otuzlu yaşlar: -lar var, yaklaşık dönem.",
  cols: [
    { name: "Ad", w: 2.5 },
    { name: "-lar eki", w: 1.9 },
    { name: "Anlamda", w: 3.1 },
    { name: "Sonuç", w: 2.5 },
  ],
  rows: [
    { cells: ["arı", "yok", "tek varlık", "tekil"], tones: [undefined, "muted", "ink", "c"], detail: ["“Bir arı pencereye kondu.”: ek yok, tek varlık: tekil ad.", "Tekil ad türün genelini de anlatabilir: ‘Arı çalışkandır.’"] },
    { cells: ["arılar", "var", "birden çok arı", "çoğul"], tones: [undefined, "b", "ink", "c"], detail: ["“Arılar çiçeklere döndü.”: -lar birden çok varlık bildirir: çoğul ad.", "Sayı sıfatından sonra olağan sayma bağlamında -lar gelmez: üç arı."] },
    { cells: ["koro", "yok", "çok kişi, tek bütün", "topluluk"], tones: [undefined, "muted", "ink", "a"], detail: ["“Koro sahneye çıktı.”: ek yok ama birçok kişiden oluşan bir bütün: topluluk adı.", "Biçim tekil, anlam çokluk; ‘koro’ çoğul ad değildir."] },
    { cells: ["korolar", "var", "birden çok koro", "topluluk + çoğul"], tones: [undefined, "b", "ink", "a"], detail: ["“Korolar sırayla söyledi.”: topluluk adı da çoğul eki alabilir; birden çok topluluk anlatılır.", "Ek topluluğun kendisini çoğaltır, içindeki kişileri değil."] },
    { cells: ["halamlar", "var", "hala ve ailesi", "aile, çevre"], tones: [undefined, "b", "ink", "warn"], detail: ["“Bayramda halamlara gittik.”: -lar birden çok hala değil, hala ve ailesi anlamı verir.", "Çoğul eki her zaman sayı çokluğu bildirmez; bağlamı göster."] },
    { cells: ["otuzlu yaşlar", "var", "yaklaşık dönem", "yaklaşıklık"], tones: [undefined, "b", "ink", "warn"], detail: ["“Otuzlu yaşlarında taşındı.”: -lar kesin bir sayıyı değil yaklaşık bir dönemi anlatır.", "Soru sayı anlamı istiyorsa ek görmekle yetinme; anlamı yaz."] },
  ],
  foot: "Ek biçimi ve anlamdaki çokluk iki ayrı kanıttır. Örnekler bu figür için yazıldı.",
});

const sharedParts = linkSteps({
  caption:
    "İleri ile dört yapıyı aç. Oklar tamlayandan tamlanana gider; ayraç içindeki soluk sözcük cümlede söylenmeyen ama ekin taşıdığı unsurdur. Ortak tamlanan iki oku tek ada toplar, ortak tamlayan tek adı iki ada bağlar.",
  alt: "Dört adımlı bağ oku çizimi, sözcükler alt alta. Benim düşmüş, bisikletim -im ile aitliği taşır. Benim bisikletim eski, seninki yeni: seninki bisikletim adını karşılar. Dedemin ve ninemin bahçesi: iki tamlayan tek tamlanana bağlı. Ninemin bahçesi ve evi: tek tamlayan iki tamlanana bağlı.",
  minLevels: 2,
  steps: [
    {
      label: "Düşen tamlayan",
      sentence: "“Bisikletim bahçede kaldı.”",
      tokens: ["(benim)", "bisikletim"],
      muted: [0],
      arcs: [{ from: 0, to: 1, dash: true }],
      boxes: [{ i: 0, tone: "muted", dash: true }],
      roles: ["söylenmeyen tamlayan", "tamlanan: -im"],
      notes: [{ s: "bisiklet-im: -im aitliği korur; benim söylenmese de tamlayan ekte yaşar.", tone: "a" }],
      readout: ["Bisikletim = benim bisikletim. Tamlayan düşer, iyelik eki kalır."],
    },
    {
      label: "Düşen tamlanan",
      sentence: "“Benim bisikletim eski, seninki yeni.”",
      tokens: ["Benim", "bisikletim", "seninki"],
      arcs: [
        { from: 0, to: 1 },
        { from: 2, to: 1, dash: true, tone: "c" },
      ],
      boxes: [{ i: 2, tone: "c", fill: true }],
      roles: ["tamlayan", "tamlanan", "senin bisikletin"],
      notes: [{ s: "seninki: -ki önceki tamlananın yerini tutar (ilgi zamiri), ad tekrarlanmaz.", tone: "c" }],
      readout: ["seninki = senin bisikletin: ilgi zamiri -ki, düşen bisiklet adını karşılar."],
    },
    {
      label: "Ortak tamlanan",
      sentence: "“Dedemin ve ninemin bahçesi çiçek açtı.”",
      tokens: ["dedemin", "ninemin", "bahçesi"],
      arcs: [
        { from: 0, to: 2 },
        { from: 1, to: 2 },
      ],
      roles: ["tamlayan", "tamlayan", "ortak tamlanan"],
      notes: [{ s: "İki tamlayan, tek tamlanan: bahçe ikisine de aittir; bahçesi iki kez yazılmaz.", tone: "a" }],
      readout: ["Kimin bahçesi? Dedemin ve ninemin. İki ok aynı ada iner."],
    },
    {
      label: "Ortak tamlayan",
      sentence: "“Ninemin bahçesi ve evi satıldı.”",
      tokens: ["ninemin", "bahçesi", "evi"],
      arcs: [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
      ],
      roles: ["ortak tamlayan", "tamlanan", "tamlanan"],
      notes: [{ s: "Tek tamlayan, iki tamlanan: ninemin hem bahçesi hem evi; ikisinde de iyelik eki var.", tone: "a" }],
      readout: ["Kimin evi? Ninemin. Tamlayan bir kez yazılır, iki tamlanana bağlanır."],
    },
  ],
  foot: "Önce grubu doğal sıraya al, sonra hangi tamlayanın hangi ada bağlandığını okla göster. Örnekler bu figür için yazıldı.",
});

/* ───────────── 004 Sıfatlar ───────────── */

const degreeLinks = linkPick({
  caption:
    "Her sözcüğe tıkla. Oklar sözcüğün neyi etkilediğini gösterir: sıfattan ada, derece zarfından sıfata, durum zarfından fiile. Çok, en, daha bir sıfatın önünde durduğu için sıfat olmaz; ok sıfata gidiyorsa zarftır.",
  alt: "Çok yorgun yolcular boş trene hızlı koştu cümlesi, altında sözcükler alt alta. Çok yorgun sözcüğüne, yorgun yolcular adına, boş trene adına, hızlı koştu fiiline oklarla bağlı; yolcular ve trene koştu yüklemine bağlı.",
  prompt: "Bir sözcüğe tıkla: neyi etkilediği ve türü açılır.",
  sentence: "“Çok yorgun yolcular boş trene hızlı koştu.”",
  tokens: [
    { s: "Çok", head: 1, role: "derece zarfı", detail: ["çok → yorgun: adı değil sıfatı derecelendirir; zarftır.", "‘Çok yolcu bekledi.’ cümlesinde ok yolcu adına giderdi: belgisiz sıfat."] },
    { s: "yorgun", head: 2, role: "niteleme sıfatı", detail: ["yorgun → yolcular: nasıl yolcular? Ok ada gider; niteleme sıfatı.", "Önündeki çok bu sıfatın derecesidir; sıfat tamlaması ‘yorgun yolcular’dır."] },
    { s: "yolcular", head: 5, role: "ad, özne", detail: ["yolcular: nitelenen ad; cümlenin öznesi olarak yükleme bağlanır.", "Sıfatı bulmanın ilk adımı bu adı bulmaktır."] },
    { s: "boş", head: 4, role: "niteleme sıfatı", detail: ["boş → trene: nasıl tren? Niteleme sıfatı.", "Sıfat ada bağlanır; trene sözcüğündeki yönelme eki bunu değiştirmez."] },
    { s: "trene", head: 5, role: "ad, yönelme", detail: ["tren-e: yönelme durumundaki ad; nereye koştu?", "Sıfat tamlaması bütün olarak yükleme bağlanır: boş trene."] },
    { s: "hızlı", head: 6, role: "durum zarfı", detail: ["hızlı → koştu: nasıl koştu? Ok fiile gider; durum zarfı.", "‘Hızlı tren’de aynı sözcüğün oku ada giderdi: sıfat."] },
    { s: "koştu", role: "yüklem", detail: ["koş-tu: yüklem. Ad, zarf ve tamlamalar sonunda buraya bağlanır.", "Zarf ile sıfatı ayırmak için okun bittiği sözcüğe bak: ad mı, fiil ya da sıfat mı?"] },
  ],
  foot: "Örnek cümle bu figür için yazıldı. Tür, sözcüğün kendisinden değil okun gittiği yerden çıkar.",
});

const questionTable = tableFig({
  caption:
    "Soru sözcüğünün türünü yanıtın neyi tamamladığı belirler. Bir soruya tıkla: açık ad var mı, yanıt adın özelliğini mi, adın yerini mi, eylemin biçimini mi verir, açılır.",
  alt: "Altı satırlı tablo. Hangi otobüse bindin: açık ad otobüs, soru sıfatı. Hangisine bindin: ad yok, soru zamiri. Kaç durak kaldı: adın miktarı, soru sıfatı. Kaçıncı sırada oturdun: adın sırası, soru sıfatı. Nasıl bir yolculuktu: adın niteliği, soru sıfatı. Nasıl geldin: eylemin biçimi, soru zarfı.",
  cols: [
    { name: "Soru", w: 4.2 },
    { name: "Yanıt neyi tamamlar?", w: 3.2 },
    { name: "Tür", w: 2.6 },
  ],
  rows: [
    { cells: ["Hangi otobüse bindin?", "açık adın kimliği", "soru sıfatı"], tones: [undefined, "ink", "c"], detail: ["hangi → otobüs: açık adı soru yoluyla belirtir; soru sıfatı.", "Yanıt: ‘Son otobüse.’ Seçilen otobüsü tamamlar."] },
    { cells: ["Hangisine bindin?", "düşen adın yerini", "soru zamiri"], tones: [undefined, "ink", "b"], detail: ["hangisi-ne: otobüs adı söylenmez; sözcük adın yerini soru yoluyla tutar: soru zamiri.", "Ekin hangisi + ne biçiminde ada değil zamire gelmesi de ipucudur."] },
    { cells: ["Kaç durak kaldı?", "adın miktarı", "soru sıfatı"], tones: [undefined, "ink", "c"], detail: ["kaç → durak: adın miktarını sorar; soru sıfatı.", "Yanıt: ‘İki durak.’ Bir sayı sıfatı bu soru sıfatının yerine geçer."] },
    { cells: ["Kaçıncı sırada oturdun?", "adın sırası", "soru sıfatı"], tones: [undefined, "ink", "c"], detail: ["kaçıncı → sıra: sırayı sorar; yanıtı sıra sayı sıfatıdır (üçüncü sıra).", "Soru sıfatının yanıtı aynı adı belirten bir sıfattır."] },
    { cells: ["Nasıl bir yolculuktu?", "adın niteliği", "soru sıfatı"], tones: [undefined, "ink", "c"], detail: ["nasıl → yolculuk: adın niteliğini sorar; soru sıfatı.", "Yanıt: ‘Sarsıntılı bir yolculuktu.’ Niteleme sıfatı yerine geçer."] },
    { cells: ["Nasıl geldin?", "eylemin biçimi", "soru zarfı"], tones: [undefined, "ink", "warn"], detail: ["nasıl → geldin: soru fiile yöneliyor; soru zarfı.", "Aynı nasıl sözcüğü, yanıt adı değil eylemi tamamladığı için sıfat değildir."] },
  ],
  foot: "Soru işareti türü söylemez; sorulan birimi yaz. Örnek sorular bu figür için yazıldı.",
});

const birRows = rowsFig({
  caption:
    "Bir, her, hiçbir, birkaç sözcüklerinin her biri bir adı belirtir; fark, kesin sayının söylenip söylenmediğindedir. Bir satıra tıkla: ‘bir yerine iki koy’ denemesi ve karar açılır.",
  alt: "Beş satırlı seçim panosu. Yalnız bir şemsiye kaldı: asıl sayı. Bir akşam kapı çaldı: belgisiz. Her yolcu biletini gösterdi: belgisiz. Hiçbir pencere açık değildi: belgisiz. Birkaç şemsiye unutuldu: belgisiz.",
  lead: "Deneme: bir yerine iki koy. Anlam yalnız sayıca değişiyorsa asıl sayı; tümüyle bozuluyorsa belgisiz okuma.",
  rows: [
    { head: "Yalnız bir şemsiye kaldı.", text: "kesin adet: asıl sayı sıfatı", tone: "c", detail: ["‘Yalnız iki şemsiye kaldı.’ de anlamlıdır; değişen yalnız sayı. Bir kesin adet bildirir: asıl sayı sıfatı.", "Yalnız sözü de sayıyı vurgular."] },
    { head: "Bir akşam kapı çaldı.", text: "herhangi bir zaman: belgisiz sıfat", tone: "b", detail: ["‘İki akşam kapı çaldı.’ başka bir olay anlatır; burada sayı değil belirsiz bir zaman söylenmiştir: belgisiz sıfat.", "Bir, hikâye başlatan belirsizlik anlamındadır."] },
    { head: "Her yolcu biletini gösterdi.", text: "bütün kapsam, rakam yok: belgisiz", tone: "b", detail: ["her → yolcu: bütün yolcuları kapsar ama sayı vermez: belgisiz sıfat.", "Kapsamın geniş olması belgisizliği bozmaz; kesin rakam yoktur."] },
    { head: "Hiçbir pencere açık değildi.", text: "olumsuz kapsam: belgisiz", tone: "b", detail: ["hiçbir → pencere: varlığın yokluğunu kapsar: belgisiz sıfat.", "Ad düşerse ‘Hiçbiri açık değildi.’ olur ve zamire döner."] },
    { head: "Birkaç şemsiye unutuldu.", text: "az ama belirsiz miktar: belgisiz", tone: "b", detail: ["birkaç → şemsiye: miktar az ama belirsiz: belgisiz sıfat.", "Sayı sıfatı kesin rakam ister; birkaç bunu vermez."] },
  ],
  foot: "Deneme yalnız bir ipucudur; kararı bağlamdaki anlamla ver. Örnek cümleler bu figür için yazıldı.",
});

const adjStructure = stripFig({
  caption:
    "İleri ile dört sıfatı şeride böl. Sıfatın yapısını nitelediği addan önceki parça belirler: tek kök basit, yapım ekli taban türemiş, kaynaşmış iki sözcük birleşik; bir söz öbeği ekle ada bağlanıyorsa öbeğin tamamı sıfattır (köşeli çizgi).",
  alt: "Ek şeridi. dar sokak: dar kök, basit. tuzlu çorba: tuz kök, lu yapım eki, türemiş. hayırsever komşu: kaynaşmış birleşik sıfat. kısa saçlı kız: kısa saç öbeği lı ekiyle kız adına bağlı, köşeli çizgi öbeği gösterir.",
  steps: [
    {
      label: "dar sokak",
      context: "“Dar sokakta yürüdük.”",
      words: [{ parts: [["dar", "kök"]], tag: "basit sıfat", tagTone: "c" }, { parts: [["sokak", "kök"]], tag: "ad" }],
      readout: ["dar: yapım eki yok, birleşme yok: basit niteleme sıfatı."],
    },
    {
      label: "tuzlu çorba",
      context: "“Tuzlu çorbayı geri gönderdi.”",
      words: [{ parts: [["tuz", "kök"], ["lu", "yapım"]], tag: "türemiş sıfat", tagTone: "c" }, { parts: [["çorba", "kök"]], tag: "ad" }],
      readout: ["tuz-lu: addan sıfat yapan -lu; yapıca türemiş, görevce niteleme sıfatı.", "Yapı ile görev iki ayrı sınıflamadır."],
    },
    {
      label: "hayırsever komşu",
      context: "“Hayırsever komşu kitap bağışladı.”",
      words: [{ parts: [["hayır", "kök"], ["sever", "kök"]], tag: "birleşik sıfat", tagTone: "c" }, { parts: [["komşu", "kök"]], tag: "ad" }],
      readout: ["hayırsever: iki sözcük tek nitelikte kaynaşmış, bitişik yazılır: birleşik sıfat."],
    },
    {
      label: "kısa saçlı kız",
      context: "“Kısa saçlı kız sahneye çıktı.”",
      words: [{ parts: [["kısa", "kök"]] }, { parts: [["saç", "kök"], ["lı", "yapım"]] }, { parts: [["kız", "kök"]], tag: "ad" }],
      group: { from: 0, to: 1, label: "kısa saç + -lı: öbek bütün olarak sıfat", tone: "c" },
      readout: ["Kısa yalnız saçı niteler; kısa saç öbeği -lı ile kız adına bağlanır. Sıfat kısa saçlı öbeğinin tamamıdır.", "Öbeğin her sözcüğünü ayrı sıfat türüne zorlama."],
    },
  ],
  foot: "Önce nitelenen adı bul, sonra addan önceki parçayı ek ek böl. Örnekler bu figür için yazıldı.",
});

/* ───────────── 005 Zamirler ───────────── */

const PERSONS = ["ben", "sen", "o", "biz", "siz", "onlar"] as const;
const CASES: { name: string; q: string; forms: string[]; parts: string[]; example: string }[] = [
  { name: "yalın", q: "kim?", forms: ["ben", "sen", "o", "biz", "siz", "onlar"], parts: ["ek yok", "ek yok", "ek yok", "ek yok", "ek yok", "ek yok"], example: "“Sen erken kalktın.”: yalın zamir özne." },
  { name: "belirtme", q: "kimi?", forms: ["beni", "seni", "onu", "bizi", "sizi", "onları"], parts: ["ben + i", "sen + i", "o + n + u", "biz + i", "siz + i", "onlar + ı"], example: "“Onu kapıda bekledim.”: belirtme, nesne." },
  { name: "yönelme", q: "kime?", forms: ["bana", "sana", "ona", "bize", "size", "onlara"], parts: ["ben + e → bana", "sen + e → sana", "o + n + a", "biz + e", "siz + e", "onlar + a"], example: "“Bana bir not bıraktı.”: ben + e düzenli ‘bene’ olmaz, bana olur." },
  { name: "bulunma", q: "kimde?", forms: ["bende", "sende", "onda", "bizde", "sizde", "onlarda"], parts: ["ben + de", "sen + de", "o + n + da", "biz + de", "siz + de", "onlar + da"], example: "“Anahtar sende mi?”: bulunma." },
  { name: "ayrılma", q: "kimden?", forms: ["benden", "senden", "ondan", "bizden", "sizden", "onlardan"], parts: ["ben + den", "sen + den", "o + n + dan", "biz + den", "siz + den", "onlar + dan"], example: "“Bizden haber bekliyor.”: ayrılma." },
  { name: "ilgi", q: "kimin?", forms: ["benim", "senin", "onun", "bizim", "sizin", "onların"], parts: ["ben + im", "sen + in", "o + n + un", "biz + im", "siz + in", "onlar + ın"], example: "“Onun dosyası masada.”: ilgi eki, tamlayan." },
];

const personCases: FigureDef = (() => {
  const CW2 = (CW - 0.3) / 2;
  const build = (pick: number) => {
    const els: El[] = [];
    // Durum adları: seçim düğmeleri, tek satır.
    const names = CASES.map((c) => c.name);
    const ws = names.map((n) => bw(n));
    const gap = (CW - ws.reduce((a, b) => a + b, 0)) / (names.length + 1);
    let x = gap;
    names.forEach((n, i) => {
      els.push(txt(v(x + ws[i] / 2, 0), n, "c", { small: true, bold: true, tone: i === pick ? "a" : "ink", pick: i }));
      if (i === pick) els.push(seg(v(x, -0.32), v(x + ws[i], -0.32), { tone: "a", bold: true }));
      x += ws[i] + gap;
    });
    const c = CASES[pick < 0 ? 0 : pick];
    let low = 0;
    PERSONS.forEach((p, i) => {
      const x0 = (i % 2) * (CW2 + 0.3);
      const y0 = -0.75 - Math.floor(i / 2) * 2.6;
      const odd = c.parts[i].includes("→");
      const lines = [
        { s: p, tone: "muted" as Tone },
        { s: c.forms[i], bold: true, small: true, tone: (odd ? "warn" : "ink") as Tone },
        { s: c.parts[i], tone: (odd ? "warn" : "muted") as Tone },
      ];
      low = Math.min(low, card(els, x0, y0, x0 + CW2, lines, odd ? "warn" : pick < 0 ? "muted" : "b", { fill: true, dash: odd }));
    });
    return { els, h: -low + 0.15 };
  };
  const top = 0.45;
  const h = build(2).h;
  return {
    caption:
      "Bir durum ekine tıkla: altı kişi zamiri o durumda kartlarda açılır, altında ek ayrımı yazılır. Kesik çerçeveli kartlar düzenli kalıba uymayan biçimlerdir (bana, sana); o zamiri ek almadan önce araya n alır.",
  alt: "Üstte altı durum adı: yalın, belirtme, yönelme, bulunma, ayrılma, ilgi. Altında üç sıra iki kart: ben ve sen, o ve biz, siz ve onlar. Seçilen durumdaki biçim ve ek ayrımı kartta yazılı; yönelmede bana ve sana kesik çerçeveli.",
    maxHeight: fitH(h, top),
    picks: CASES.map((c) => ({ label: c.name, title: `${c.name} durumu: ${c.q}`, detail: [c.example, `Soru: ${c.q} Biçimler: ${c.forms.join(", ")}.`] })),
    draw: (_v, _s, pick = -1) => {
      const { els } = build(pick);
      els.push(...frame(h, top));
      const c = CASES[pick < 0 ? 0 : pick];
      return {
        els,
        readout: [
          pick < 0 ? "Yalın biçimler gösteriliyor; bir durum adına tıkla." : `${c.name} (${c.q}): ${c.forms.join(", ")} · ${c.example}`,
          "Zamir çekimi isim çekimi gibidir. Yüklemdeki kişi eki (geldim) açık zamir değildir. Örnek cümleler bu figür için yazıldı.",
        ],
      };
    },
  };
})();

const reflexLinks = linkPick({
  caption:
    "Her sözcüğe tıkla. Kesik oklar zamirin gönderdiği kişiyi gösterir; düz oklar ögeleri yükleme bağlar. İki kendi de Oya’ya döner: biri tamlayan olarak notun kime ait olduğunu, öteki işi başkasının değil Oya’nın yaptığını söyler.",
  alt: "Oya, Efe’ye kendi notunu kendisi okudu cümlesi, sözcükler alt alta. Kendi ve kendisi Oya’ya kesik oklarla bağlı; Oya, Efe’ye ve notunu okudu yüklemine düz oklarla bağlı. Her sözcüğün sağında görev adı yazılı.",
  prompt: "Bir sözcüğe tıkla: neye gönderdiği ya da neye bağlandığı açılır.",
  sentence: "“Oya, Efe’ye kendi notunu kendisi okudu.”",
  dashTo: [2, 4],
  tokens: [
    { s: "Oya", head: 5, role: "özne", detail: ["Oya: kim okudu? Özne. Dönüşlülük zamiri bu kişiye döner.", "Adı yerine koyarak dene: Oya, Efe’ye Oya’nın notunu Oya okudu."] },
    { s: "Efe’ye", head: 5, role: "yönelme: kime?", detail: ["Efe’ye: kime okudu? Yönelme durumunda ad.", "Olağan okumada kendi bu kişiye değil özneye döner."] },
    { s: "kendi", head: 0, role: "dönüşlülük: tamlayan", detail: ["kendi notu = Oya’nın notu: dönüşlülük zamiri tamlayan görevinde.", "Ok özneye gider; ‘kendi’ başka birinin notunu anlatmaz."] },
    { s: "notunu", head: 5, role: "nesne", detail: ["not-u-nu: -u iyelik, -nu belirtme. Neyi okudu? Nesne.", "İyelik eki kendi ile kurulan tamlamanın tamlananı olduğunu gösterir."] },
    { s: "kendisi", head: 0, role: "dönüşlülük: vurgu", detail: ["kendisi: işi başkasının değil Oya’nın yaptığını vurgular; yine Oya’ya döner.", "Tür aynı (dönüşlülük), cümledeki işi farklı: burada özneyi pekiştirir."] },
    { s: "okudu", role: "yüklem", detail: ["oku-du: yüklem. Özne, yönelme ve nesne buraya bağlanır.", "Zamirin türü ile cümledeki görevi ayrı sorulardır."] },
  ],
  foot: "Örnek cümle bu figür için yazıldı. Gönderimi adı yerine koyarak sına.",
});

const ambiguity = linkSteps({
  caption:
    "İleri ile onun zamirinin iki olası gönderimini dene. Cümle iki okumaya da izin veriyorsa kesin sahibi seçmek kanıtsızdır; açıklık için ad tekrarlanır. Kesik ok olası gönderim, düz ok onarılmış cümledeki kesin ilişkidir.",
  alt: "Dört adımlı çizim, sözcükler alt alta. Can, Arda’ya onun haritasını gösterdi cümlesinde onun önce Can’a, sonra Arda’ya kesik okla bağlanır; üçüncü adımda iki ok birlikte; dördüncü adımda Can, Arda’ya Can’ın haritasını gösterdi cümlesinde Can’ın haritasını adına düz okla bağlı.",
  minLevels: 2,
  steps: [
    {
      label: "Okuma 1: Can",
      sentence: "“Can, Arda’ya onun haritasını gösterdi.”",
      tokens: ["Can", "Arda’ya", "onun", "haritasını"],
      arcs: [{ from: 2, to: 0, dash: true }],
      boxes: [{ i: 2, tone: "a", fill: true }],
      roles: ["olası sahip", undefined, "gönderim: Can?", undefined],
      notes: [{ s: "onun = Can’ın: Can kendi haritasını göstermiş olabilir.", tone: "a" }],
      readout: ["İlk okuma: harita Can’ın. Cümle bunu yasaklamaz."],
    },
    {
      label: "Okuma 2: Arda",
      sentence: "“Can, Arda’ya onun haritasını gösterdi.”",
      tokens: ["Can", "Arda’ya", "onun", "haritasını"],
      arcs: [{ from: 2, to: 1, dash: true, tone: "c" }],
      boxes: [{ i: 2, tone: "c", fill: true }],
      roles: [undefined, "olası sahip", "gönderim: Arda?", undefined],
      notes: [{ s: "onun = Arda’nın: Can, Arda’nın kendi haritasını göstermiş de olabilir.", tone: "c" }],
      readout: ["İkinci okuma: harita Arda’nın. Bu da dil bilgisine uygundur."],
    },
    {
      label: "İkisi birden",
      sentence: "“Can, Arda’ya onun haritasını gösterdi.”",
      tokens: ["Can", "Arda’ya", "onun", "haritasını"],
      arcs: [
        { from: 2, to: 0, dash: true },
        { from: 2, to: 1, dash: true, tone: "c" },
      ],
      boxes: [{ i: 2, tone: "warn", fill: true }],
      roles: ["olası sahip", "olası sahip", "belirsiz", undefined],
      notes: [{ s: "İki ok da geçerli: başka bağlam yoksa gönderim belirsizdir, biri uydurulmaz.", tone: "warn" }],
      readout: ["Bağlam seçmiyorsa doğru yargı: onun iki kişiye de gönderebilir."],
    },
    {
      label: "Onarım",
      sentence: "“Can, Arda’ya Can’ın haritasını gösterdi.”",
      tokens: ["Can", "Arda’ya", "Can’ın", "haritasını"],
      arcs: [{ from: 2, to: 3 }],
      boxes: [{ i: 2, tone: "a", fill: true }],
      roles: [undefined, undefined, "tamlayan: ad", "tamlanan"],
      notes: [{ s: "Ad tekrarlanınca ilişki tektir: Can’ın haritası. İstenen buysa zamir yerine ad yazılır.", tone: "a" }],
      readout: ["Onarım: zamir yerine adı yaz. Can’ın haritasını ya da Arda’nın haritasını."],
    },
  ],
  foot: "Zamiri aç, iki okumayı da sına, belirsizse bunu söyle. Örnek cümle bu figür için yazıldı.",
});

const indefTable = tableFig({
  caption:
    "Belgisiz sözcüğün yanında açık ad varsa sıfat, ad düşüp sözcük onun yerini tutuyorsa zamirdir. Bir çifte tıkla: iki cümle ve düşen ad açılır.",
  alt: "Altı satırlı tablo: bazı ve bazıları, hiçbir ve hiçbiri, birkaç ve birkaçı, her ve herkes, bütün ve hepsi, çok ve çoğu; her satırda açık adlı sıfat cümlesi ve adı düşmüş zamir cümlesi.",
  cols: [
    { name: "Çift", w: 2.5 },
    { name: "Sıfat: ad açık", w: 3.75 },
    { name: "Zamir: ad düşmüş", w: 3.75 },
  ],
  rows: [
    { cells: ["bazı / bazıları", "Bazı yolcular indi.", "Bazıları indi."], tones: [undefined, "c", "b"], detail: ["İlkinde bazı açık yolcular adını belirtir; ikincide bazıları o adın yerini tutar.", "Zamir çoğul ve durum eki alabilir: bazılarına."] },
    { cells: ["hiçbir / hiçbiri", "Hiçbir masa boş değil.", "Hiçbiri boş değil."], tones: [undefined, "c", "b"], detail: ["hiçbir → masa: belgisiz sıfat; hiçbiri: masaların yerini tutan belgisiz zamir.", "Yokluk anlatması belgisizliği değiştirmez."] },
    { cells: ["birkaç / birkaçı", "Birkaç kalem eksik.", "Birkaçı eksik."], tones: [undefined, "c", "b"], detail: ["birkaç → kalem: sıfat; birkaçı düşen kalem adını karşılar: zamir.", "İyelik görünümlü -ı zamir biçiminin parçasıdır."] },
    { cells: ["her / herkes", "Her öğrenci geldi.", "Herkes geldi."], tones: [undefined, "c", "b"], detail: ["her → öğrenci: sıfat; herkes ayrı bir sözcük olarak kişileri karşılar: zamir.", "Çiftin iki üyesi her zaman aynı kökün eklisi değildir."] },
    { cells: ["bütün / hepsi", "Bütün sorular kolaydı.", "Hepsi kolaydı."], tones: [undefined, "c", "b"], detail: ["bütün → sorular: sıfat; hepsi bütün kümeyi karşılar ama adı söylemez: belgisiz zamir.", "Kümenin tamamı söylenmesi belgisizliği bozmaz; adlar tek tek sayılmaz."] },
    { cells: ["çok / çoğu", "Çok kitap okundu.", "Çoğu okundu."], tones: [undefined, "c", "b"], detail: ["çok → kitap: belgisiz sıfat; çoğu kitapların büyük kısmını karşılar: belgisiz zamir.", "‘Çok okudu.’ cümlesinde çok fiile bağlanırdı: zarf."] },
  ],
  foot: "Önce yanında açık bir ad ara, sonra düşen adı geri koyarak dene. Örnek cümleler bu figür için yazıldı.",
});

/* ───────────── 009 Fiilde çatı ───────────── */

const firstGate = linkSteps({
  caption:
    "İleri ile dört cümlede asıl yüklemi bul. Kalın çerçeve asıl yüklemi, kesik çerçeve fiilimsiyi gösterir; ok fiilimsinin nitelediği ada gider. Asıl yüklem isimse çatı aranmaz; fiilimsi bunu değiştirmez.",
  alt: "Dört adımlı çizim, sözcükler alt alta. Boyanan kapı kuruydu: yüklem kuruydu isim, boyanan kapıyı niteleyen fiilimsi. Kapı dün boyandı: yüklem fiil. Kapıyı boyayan usta yorgundu: yüklem yorgundu isim, boyayan ustayı niteler. Usta kapıyı sabah boyadı: yüklem fiil.",
  minLevels: 1,
  steps: [
    {
      label: "Boyanan kapı kuruydu.",
      sentence: "“Boyanan kapı kuruydu.”",
      tokens: ["Boyanan", "kapı", "kuruydu"],
      arcs: [{ from: 0, to: 1, dash: true, tone: "muted" }],
      boxes: [
        { i: 2, tone: "ink" },
        { i: 0, tone: "muted", dash: true },
      ],
      roles: ["fiilimsi", "ad", "asıl yüklem: isim"],
      notes: [{ s: "Asıl yüklem kuruydu: ad soylu (kuru + idi). Çatı aranmaz; boyanan yalnız kapıyı niteler.", tone: "warn" }],
      readout: ["Yüklem isim: fiilde çatı sınıflaması bu cümlede yapılmaz."],
    },
    {
      label: "Kapı dün boyandı.",
      sentence: "“Kapı dün boyandı.”",
      tokens: ["Kapı", "dün", "boyandı"],
      arcs: [],
      boxes: [{ i: 2, tone: "a", fill: true }],
      roles: ["sözde özne", undefined, "asıl yüklem: fiil"],
      notes: [{ s: "Asıl yüklem boyandı: çekimli fiil. Çatı incelenir: kapı işi yapmaz, sözde öznedir; edilgen.", tone: "a" }],
      readout: ["Yüklem fiil: çatıya geçilir. Kim boyadı? Söylenmemiş: edilgen."],
    },
    {
      label: "Kapıyı boyayan usta yorgundu.",
      sentence: "“Kapıyı boyayan usta yorgundu.”",
      tokens: ["Kapıyı", "boyayan", "usta", "yorgundu"],
      arcs: [{ from: 1, to: 2, dash: true, tone: "muted" }],
      boxes: [
        { i: 3, tone: "ink" },
        { i: 1, tone: "muted", dash: true },
      ],
      roles: ["fiilimsinin nesnesi", "fiilimsi", "ad", "asıl yüklem: isim"],
      notes: [{ s: "Asıl yüklem yorgundu: ad soylu. Boyayan nesne alsa da fiilimsidir, yüklem değildir.", tone: "warn" }],
      readout: ["Fiilimsinin kendi nesnesi olabilir (kapıyı); asıl yargı yine isimdir."],
    },
    {
      label: "Usta kapıyı sabah boyadı.",
      sentence: "“Usta kapıyı sabah boyadı.”",
      tokens: ["Usta", "kapıyı", "sabah", "boyadı"],
      arcs: [],
      boxes: [{ i: 3, tone: "a", fill: true }],
      roles: ["gerçek özne", "nesne", undefined, "asıl yüklem: fiil"],
      notes: [{ s: "Asıl yüklem boyadı: çekimli fiil. Usta gerçek özne (etken), kapıyı nesne (geçişli).", tone: "a" }],
      readout: ["İki eksen ayrı ayrı: özne yönünden etken, nesne yönünden geçişli."],
    },
  ],
  foot: "İlk kapı her zaman aynı: asıl yüklem fiil mi? Örnek cümleler bu figür için yazıldı.",
});

const objectTest = tableFig({
  caption:
    "Geçişlilik, cümlede nesne bulunmasına değil fiilin o anlamda nesne alabilmesine bakar. Bir fiile tıkla: ‘neyi?’ denemesi doğal mı, ad hangi ekle bağlanıyor, açılır. Yıldızlı cümle doğal olmayan denemedir.",
  alt: "Beş satırlı tablo. dinle-: Şarkıyı dinledi, doğal, geçişli. otur-: yıldızlı Sandalyeyi oturdu, doğal biçim sandalyeye, geçişsiz. yaz-: Akşam uzun süre yazdı, nesne yazılmamış ama mektubu yazdı doğal, geçişli. kork-: yıldızlı Köpeği korktu, doğal biçim köpekten, geçişsiz. bekle-: Otobüsü bekledi, geçişli.",
  cols: [
    { name: "Fiil", w: 1.8 },
    { name: "Neyi? denemesi", w: 4.6 },
    { name: "Sonuç", w: 3.6 },
  ],
  rows: [
    { cells: ["dinle-", "Şarkıyı dinledi.", "doğal: geçişli"], tones: [undefined, "ink", "c"], detail: ["Neyi dinledi? Şarkıyı. Belirtme ekli ad nesnedir: geçişli.", "Nesne belirtisiz de olabilir: ‘Şarkı dinledi.’"] },
    { cells: ["otur-", "*Sandalyeyi oturdu. → sandalyeye", "doğal değil: geçişsiz"], tones: [undefined, "warn", "b"], detail: ["Neyi oturdu? Doğal değil. Ad yönelme ekiyle bağlanır: sandalyeye. Geçişsiz.", "Yönelme eki alan ad nesne değil, yer tamlayıcısıdır."] },
    { cells: ["yaz-", "Akşam uzun süre yazdı. → mektubu yazdı", "nesne yok ama alabilir: geçişli"], tones: [undefined, "ink", "c"], detail: ["Cümlede nesne yok; ‘Mektubu yazdı.’ aynı anlamda doğaldır. Fiil geçişlidir.", "Nesnenin söylenmemesi geçişliliği silmez."] },
    { cells: ["kork-", "*Köpeği korktu. → köpekten", "doğal değil: geçişsiz"], tones: [undefined, "warn", "b"], detail: ["Neyi korktu? Doğal değil. Ad ayrılma ekiyle bağlanır: köpekten korktu. Geçişsiz.", "Korkut- biçimi ise nesne alır: ‘Gök gürültüsü kediyi korkuttu.’"] },
    { cells: ["bekle-", "Otobüsü bekledi.", "doğal: geçişli"], tones: [undefined, "ink", "c"], detail: ["Neyi bekledi? Otobüsü. Geçişli.", "Durakta bekledi dense de fiil aynı anlamda nesne alabilir."] },
  ],
  foot: "‘Neyi?’ sorusunu fiilin cümledeki anlamıyla sor; yönelme ve ayrılma ekli adlar nesne değildir. Örnekler bu figür için yazıldı.",
});

const causativeStrip = stripFig({
  caption:
    "İleri ile dört fiili şeride böl. Dolu kutu çatı ekidir, kesik çerçeve zaman ve kişi çekimidir. Karar ekten değil kökten çıkar: geçişsiz kök ekle nesne alabiliyorsa oldurgan, zaten geçişli kök başkasına yaptırılıyorsa ettirgen.",
  alt: "Ek şeridi. uyuttu: uyu kök, t çatı eki, tu çekim, oldurgan. korkuttu: kork kök, ut çatı eki, tu çekim, oldurgan. oturttu: otur kök, t çatı eki, tu çekim, oldurgan. içirdi: iç kök, ir çatı eki, di çekim, geçişli kökten ettirgen.",
  steps: [
    {
      label: "uyuttu",
      context: "“Ninni bebeği uyuttu.” · kök: “Bebek uyudu.” (geçişsiz)",
      words: [{ parts: [["uyu", "kök"], ["t", "yapım"], ["tu", "çekim"]], tag: "oldurgan", tagTone: "c" }],
      readout: ["uyu- nesne almaz; uyu-t- ile bebeği nesne olur: oldurgan.", "İki t aynı değildir: -t çatı eki, -tu geçmiş zaman."],
    },
    {
      label: "korkuttu",
      context: "“Gök gürültüsü kediyi korkuttu.” · kök: “Kedi korktu.” (geçişsiz)",
      words: [{ parts: [["kork", "kök"], ["ut", "yapım"], ["tu", "çekim"]], tag: "oldurgan", tagTone: "c" }],
      readout: ["kork- ile ‘kediyi korktu’ kurulamaz; korkut- ile kediyi nesne olur: oldurgan."],
    },
    {
      label: "oturttu",
      context: "“Hemşire hastayı koltuğa oturttu.” · kök: “Hasta oturdu.” (geçişsiz)",
      words: [{ parts: [["otur", "kök"], ["t", "yapım"], ["tu", "çekim"]], tag: "oldurgan", tagTone: "c" }],
      readout: ["otur- geçişsiz; otur-t- ile hastayı nesne olur: oldurgan. Koltuğa yönelme tümleci kalır."],
    },
    {
      label: "içirdi",
      context: "“Annem kardeşime şurubu içirdi.” · kök: “Kardeşim şurubu içti.” (geçişli)",
      words: [{ parts: [["iç", "kök"], ["ir", "yapım"], ["di", "çekim"]], tag: "ettirgen", tagTone: "b" }],
      readout: ["iç- zaten nesne alır (şurubu); iç-ir- işi başkasına yaptırır: ettirgen.", "Kardeşime işi yapan tarafı gösterir, nesne değildir; nesne yine şurubu."],
    },
  ],
  foot: "Ekten önce kökü yaz ve kökle ‘neyi?’ sor. Örnek cümleler bu figür için yazıldı.",
});

const reciprocalTable = tableFig({
  caption:
    "İşteşlik için iki kanıt birlikte gerekir: -ış/-iş/-uş/-üş çatı eki ve birden çok katılımcının işi birlikte ya da karşılıklı yapması. Bir cümleye tıkla: hangi kanıtın bulunup hangisinin eksik olduğu açılır.",
  alt: "Beş satırlı tablo. Eski dostlar mektuplaştı: ek var, karşılıklı, işteş. Serçeler dalda cıvıldaştı: ek var, birlikte, işteş. Yolcular kapıya koştu: ek yok, yalnız çok özne, işteş değil. Hava akşama doğru serinleşti: -leş addan fiil yapım eki, tek özne, işteş değil. Takımlar sahada karşılaştı: ek var, karşılıklı, işteş.",
  cols: [
    { name: "Cümle", w: 3.9 },
    { name: "-ış eki", w: 1.7 },
    { name: "Ortak iş", w: 2.2 },
    { name: "Sonuç", w: 2.2 },
  ],
  rows: [
    { cells: ["Eski dostlar mektuplaştı.", "var", "karşılıklı", "işteş"], tones: [undefined, "c", "c", "c"], detail: ["Her biri ötekine mektup yazar: karşılıklı; mektup-la-ş- çatı eki taşır. İşteş.", "Tek kişiyle kurulamaz: ‘Dost mektuplaştı.’ eksik kalır."] },
    { cells: ["Serçeler dalda cıvıldaştı.", "var", "birlikte", "işteş"], tones: [undefined, "c", "c", "c"], detail: ["Serçeler aynı anda birlikte ses çıkarır: birlikte yapma anlamı; işteş.", "Karşılıklılık şart değil; ortak eylem yeter."] },
    { cells: ["Yolcular kapıya koştu.", "yok", "yalnız çok özne", "işteş değil"], tones: [undefined, "muted", "warn", "warn"], detail: ["Özne çoğul ama çatı eki yok; her yolcu kendi koşar: işteş değil.", "Koşuştu dense ek ve birlikte anlam gelirdi."] },
    { cells: ["Hava akşama doğru serinleşti.", "-leş yapım", "tek özne", "işteş değil"], tones: [undefined, "warn", "warn", "warn"], detail: ["serin-leş-: addan fiil yapan -leş; bir oluşu anlatır. Ortada birden çok katılımcı yok: işteş değil.", "Sözcükte ş sesi görmek kanıt değildir."] },
    { cells: ["Takımlar sahada karşılaştı.", "var", "karşılıklı", "işteş"], tones: [undefined, "c", "c", "c"], detail: ["İki takım birbiriyle karşı karşıya gelir: karşılıklı; işteş.", "İki katılımcıyı ve ortak eylemi cümleden göster."] },
  ],
  foot: "Ek ve anlam birlikte aranır; ses benzerliği yetmez. Örnek cümleler bu figür için yazıldı.",
});

export const turkishFigures065Sheets: Record<string, Record<string, FigureDef>> = {
  "isimler-isim-tamlamasi": {
    "Durum, ilgi ve eşitlik: adı ilişkiye yerleştir": caseLinks,
    "Yapı: çekim eki sözcüğü türemiş yapmaz": nounStructure,
    "Tekil, çoğul ve topluluk: biçimle bütünü karıştırma": countTable,
    "Düşen ve ortak unsurlar; çözümü denetle": sharedParts,
  },
  sifatlar: {
    "Derecelendirme: sıfatı etkileyen sözcük de sıfat değildir": degreeLinks,
    "Soru sıfatı: yanıt adın özelliğini mi tamamlar?": questionTable,
    "Belgisizlik ve bir sözcüğünün bağlamı": birRows,
    "Yapı: basit, türemiş ve birleşik sıfatlar": adjStructure,
  },
  zamirler: {
    "Kişi zamirleri ve çekimleri": personCases,
    "Dönüşlülük: kendi hangi kişiye dönüyor?": reflexLinks,
    "Görev, gönderim ve son denetim": ambiguity,
    "Belgisiz zamir: kimlik açık, miktar belirsiz olabilir": indefTable,
  },
  "fiilde-cati": {
    "Çatı için ilk kapı: yüklem fiil mi?": firstGate,
    "Geçişli ve geçişsiz: nesne alma yeteneği": objectTest,
    "Oldurgan: nesnesizden nesne alabilene": causativeStrip,
    "İşteş: karşılıklı veya birlikte": reciprocalTable,
  },
};
