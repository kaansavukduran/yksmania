import { circle, seg, txt, v, vec, type El, type FigureDef, type FigureFrame, type Tone, type V } from "./figureKit";
import { CW, LH, fitH, frame, inner, rect, tw, wrap } from "./turkishFigures060Kit";

/*
 * Forge068: dört TYT Tarih kopya kâğıdı (Dünya Gücü Osmanlı, Devrimler
 * Çağında Değişen Devlet ve Toplum, Uluslararası İlişkilerde Denge
 * Stratejisi, 20. Yüzyıl Başlarında Osmanlı ve Dünya) özgün etkileşimli
 * figürlerle. Her figür dersin daha önce çizimi olmayan bir bölümüne bağlıdır;
 * dersin laboratuvarındaki olay–zincir kartlarını ve önceki belge çizelgelerini
 * tekrarlamaz, onların yanına yeni bir okuma biçimi (tür etiketli yıl satırı,
 * yıl sürgüsü, şematik konum haritası, karşılaştırma ızgarası) koyar.
 * Haritalar şematiktir: konumlar yaklaşık, uzaklıklar ölçekli değildir ve
 * bugünkü sınırlar çizilmez. Yıllar ve sonuç cümleleri yaygın ders kitabı
 * bilgisine göre yazıldı; kâğıtların cümleleri kopyalanmadı. Adım, seçim ve
 * sürgü öğrenme kaydı üretmez.
 */

type Legend = NonNullable<FigureFrame["legend"]>;

/* ---------------- ortak çizim yardımcıları ---------------- */

interface Ln {
  s: string;
  bold?: boolean;
  tone?: Tone;
  pick?: number;
}
/** Başlık (küçük kalın) ve metin satırlarını kutu genişliğine göre kaydırır. */
function boxLines(x0: number, x1: number, head: string | undefined, text: string | undefined, pick?: number): Ln[] {
  const m = inner(x0, x1);
  const out: Ln[] = [];
  if (head) wrap(head, m - (pick !== undefined ? 0.3 : 0), true, true).forEach((s, k) => out.push({ s, bold: true, pick: k === 0 ? pick : undefined }));
  if (text) wrap(text, m).forEach((s) => out.push({ s }));
  return out;
}
const linesH = (ls: Ln[]) => 1.0 + Math.max(0, ls.length - 1) * LH + (ls.some((l) => l.bold) && ls.some((l) => !l.bold) ? 0.06 : 0);
type State = "off" | "on" | "cur";
/** Yükseklik verilen kutu; kapalı kutu kesik çizgili ve boştur (cevabı göstermez). */
function box(els: El[], x0: number, y0: number, x1: number, h: number, ls: Ln[], tone: Tone, state: State = "on"): void {
  const y1 = y0 - h;
  if (state === "off") {
    els.push(rect(x0, y0, x1, y1, "muted", false, true));
    return;
  }
  els.push(rect(x0, y0, x1, y1, state === "cur" ? "a" : tone, true));
  let y = y0 - 0.5;
  ls.forEach((l, i) => {
    if (i > 0) y -= LH + (ls[i - 1].bold && !l.bold ? 0.06 : 0);
    els.push(txt(v(x0 + 0.2, y), l.s, "e", { small: true, bold: l.bold, tone: l.tone ?? "ink", pick: l.pick }));
  });
}
/** Kutu kenarında duran ok (yazının üstünden geçmez). */
const arrow = (a: V, b: V, on = true): El => vec(a, b, { thin: true, tone: on ? "ink" : "muted" });

/* ---------------- tür etiketli yıl satırları ---------------- */

interface Cat {
  word: string;
  tone: Tone;
}
interface YEv {
  y: number;
  y1?: number;
  s: string;
  cat: number;
  what: string;
}
const yt = (e: YEv) => (e.y1 ? `${e.y}–${e.y1}` : String(e.y));
const LW = 5.5; // etiket sütunu
const AX0 = 5.7;
const AX1 = 7.85;
const ROW = 0.74;
/**
 * Yıl satırları: solda olay adı, ortada yıl ekseninde işaret, sağda tür
 * sözcüğü (renk tek başına taşımaz). `upTo` verilirse o yıldan sonraki
 * satırlar soluk ve kesik çizilir.
 */
function yearRows(o: { events: YEv[]; cats: Cat[]; a0: number; a1: number; ticks: number[]; pick?: number; upTo?: number; pickable?: boolean }): { els: El[]; h: number } {
  const K = (AX1 - AX0) / (o.a1 - o.a0);
  const X = (y: number) => AX0 + (y - o.a0) * K;
  const els: El[] = [];
  const n = o.events.length;
  o.events.forEach((e, i) => {
    const y = -0.3 - i * ROW;
    const on = o.upTo === undefined || e.y <= o.upTo;
    const sel = o.pick === i;
    const c = o.cats[e.cat];
    const tone: Tone = !on ? "muted" : sel ? "a" : c.tone;
    els.push(txt(v(0, y), `${yt(e)} ${e.s}`, "e", { small: true, bold: sel, tone: on ? (sel ? "a" : "ink") : "muted", pick: o.pickable ? i : undefined }));
    els.push(seg(v(AX0, y), v(AX1, y), { tone: "muted", thin: true, dash: true }));
    if (e.y1) els.push(rect(X(e.y), y + 0.11, X(e.y1), y - 0.11, tone, on, !on));
    else els.push(circle(v(X(e.y), y), sel ? 0.13 : 0.1, { tone, fill: on ? tone : undefined, bold: sel }));
    els.push(txt(v(CW, y), c.word, "w", { small: true, bold: sel, tone: on ? c.tone : "muted" }));
  });
  const yb = -0.3 - (n - 1) * ROW - 0.55;
  els.push(seg(v(AX0, yb), v(AX1, yb), { tone: "muted" }));
  for (const t of o.ticks) els.push(seg(v(X(t), yb - 0.08), v(X(t), yb + 0.08), { tone: "muted" }), txt(v(X(t), yb - 0.12), String(t), "s", { small: true, tone: "muted" }));
  if (o.upTo !== undefined) els.push(seg(v(X(o.upTo), 0.05), v(X(o.upTo), yb), { tone: "a", thin: true }));
  return { els, h: -yb + 0.75 };
}

/* ---------------- şematik konum haritası ---------------- */

interface Spot {
  name: string;
  at: V;
  tone: Tone;
}
/** Numaralı halka; numara anahtarda adla eşleşir, seçilebilir olabilir. */
function token(c: V, code: string, tone: Tone, opts: { on?: boolean; sel?: boolean; pick?: number } = {}): El[] {
  const on = opts.on ?? true;
  const r = opts.sel ? 0.3 : 0.26;
  return [circle(c, r, { tone: on ? (opts.sel ? "a" : tone) : "muted", fill: on ? (opts.sel ? "a" : tone) : undefined, bold: opts.sel, thin: !on }), txt(c, code, "c", { small: true, bold: true, tone: on ? (opts.sel ? "a" : tone) : "muted", pick: opts.pick })];
}
/** İki halka arasında, halkaların kenarında duran yol çizgisi. */
function link(a: V, b: V, tone: Tone, on: boolean, head = false): El {
  const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const ux = (b[0] - a[0]) / d;
  const uy = (b[1] - a[1]) / d;
  const p = v(a[0] + ux * 0.36, a[1] + uy * 0.36);
  const q = v(b[0] - ux * 0.36, b[1] - uy * 0.36);
  return head ? vec(p, q, { tone: on ? tone : "muted", thin: !on }) : seg(p, q, { tone: on ? tone : "muted", thin: true, dash: !on });
}

/* ---------------- karşılaştırma ızgarası ---------------- */

/**
 * Satır satır açılan iki sütunlu karşılaştırma: her satırın adı tam genişlikte
 * üstte, altında iki hücre. Açılmamış satırların hücreleri boş ve kesik
 * çizgilidir; satır adı soluk kalır.
 */
function compareFig(o: { caption: string; alt: string; heads: [string, string]; tones: [Tone, Tone]; rows: { label: string; cells: [string, string]; note: string }[]; foot: string; all: string }): FigureDef {
  const C = [
    [0, (CW - 0.3) / 2],
    [(CW + 0.3) / 2, CW],
  ] as const;
  const headLs = o.heads.map((hd, i) => boxLines(C[i][0], C[i][1], hd, undefined));
  const headH = Math.max(...headLs.map(linesH));
  const cellLs = o.rows.map((r) => r.cells.map((c, i) => boxLines(C[i][0], C[i][1], undefined, c)));
  const labelLs = o.rows.map((r) => wrap(r.label, CW - 0.4, true, true));
  const rowH = o.rows.map((_, i) => Math.max(...cellLs[i].map(linesH)));
  const labH = labelLs.map((l) => 0.2 + l.length * LH);
  const total = headH + 0.25 + rowH.reduce((s, h, i) => s + labH[i] + h + 0.25, 0);
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(total),
    steps: [...o.rows.map((r) => r.label), "İki sütunu birlikte oku"],
    draw: (_v, step) => {
      const els: El[] = [];
      const all = step >= o.rows.length;
      o.heads.forEach((_, i) => box(els, C[i][0], 0, C[i][1], headH, headLs[i], o.tones[i]));
      let y = -headH - 0.25;
      o.rows.forEach((r, i) => {
        const st: State = all || i < step ? "on" : i === step ? "cur" : "off";
        labelLs[i].forEach((s, k) => els.push(txt(v(0, y - 0.3 - k * LH), s, "e", { small: true, bold: true, tone: st === "off" ? "muted" : st === "cur" ? "a" : "ink" })));
        y -= labH[i];
        r.cells.forEach((_, c) => box(els, C[c][0], y, C[c][1], rowH[i], cellLs[i][c], o.tones[c], st));
        y -= rowH[i] + 0.25;
      });
      els.push(...frame(total));
      const readout = all ? [o.all, o.foot] : [`${o.rows[step].label}: ${o.rows[step].note}`, o.foot];
      return { els, readout };
    },
  };
}

/* =====================================================================
 * 011 Dünya Gücü Osmanlı
 * ===================================================================== */

const FB_CATS: Cat[] = [
  { word: "kara", tone: "c" },
  { word: "deniz", tone: "b" },
  { word: "iç düzen", tone: "warn" },
];
const FB: YEv[] = [
  { y: 1461, s: "Trabzon", cat: 0, what: "Trabzon Rum İmparatorluğu sona erdi; Karadeniz kıyısındaki son Bizans kolu da Osmanlı'ya geçti." },
  { y: 1463, y1: 1479, s: "Venedik savaşı", cat: 1, what: "Ege ve Mora'da uzun deniz rekabeti; 1479 barışında Venedik, ticaret izni karşılığında yıllık ödemeyi kabul etti." },
  { y: 1473, s: "Otlukbeli", cat: 0, what: "Akkoyunlu hükümdarı Uzun Hasan yenildi; doğuda tehdit geriledi ama Akkoyunlu Devleti bu savaşla sona ermedi." },
  { y: 1475, s: "Kefe ve Kırım", cat: 1, what: "Cenevizlilerin Karadeniz kolonileri alındı, Kırım Hanlığı Osmanlı'ya bağlandı; Karadeniz ticareti denetim altına girdi." },
  { y: 1480, s: "Otranto", cat: 1, what: "İtalya kıyısına çıkarma yapıldı; 1481'de Fatih ölünce kuvvetler geri çekildi. Kalıcı bir kazanım değildir." },
  { y: 1481, y1: 1495, s: "Cem Sultan", cat: 2, what: "Taht kavgasında yenilen Cem Avrupa'da tutuldu; dış güçler onu II. Bayezid'e karşı baskı aracı yaptı. Sorun Cem'in 1495'teki ölümüyle kapandı." },
  { y: 1484, s: "Kili ve Akkerman", cat: 0, what: "Boğdan'daki iki ticaret kalesi alındı; Karadeniz'in kuzeybatısında kara–deniz yolu birleşti." },
  { y: 1499, y1: 1503, s: "Venedik savaşı", cat: 1, what: "İkinci savaşta İnebahtı, Modon ve Koron alındı; büyüyen donanma deniz gücünün yeni aşamasını gösterir." },
  { y: 1511, s: "Şahkulu İsyanı", cat: 2, what: "Safevi propagandasıyla Anadolu'da büyük ayaklanma; doğu sorunu bir iç güvenlik sorununa da dönüştü." },
];
const fbCount = (c: number) => FB.filter((e) => e.cat === c).length;
const fatihBayezid: FigureDef = {
  caption:
    "1461–1511 arasında dokuz olay, her satırın sağında türü yazılı: kara, deniz ya da iç düzen. Bir olayın adına tıkla. Fatih döneminde kara ve deniz hamleleri iç içe ilerler; II. Bayezid döneminde Cem Sultan sorunu dış siyasetin hızını keser, ardından deniz gücü yeniden öne çıkar.",
  alt: "Dokuz satırlı yıl çizelgesi. Solda olay adları, ortada 1450–1515 ekseninde nokta ya da dönem çubuğu, sağda tür sözcüğü. Venedik savaşları ve Cem Sultan sorunu çubukla gösterilir.",
  maxHeight: fitH(yearRows({ events: FB, cats: FB_CATS, a0: 1450, a1: 1515, ticks: [1450, 1510] }).h),
  picks: FB.map((e) => ({ label: `${yt(e)} ${e.s}`, title: `${yt(e)} · ${e.s} · ${FB_CATS[e.cat].word}`, detail: [e.what] })),
  draw: (_v, _s, pick = -1) => {
    const { els, h } = yearRows({ events: FB, cats: FB_CATS, a0: 1450, a1: 1515, ticks: [1450, 1510], pick, pickable: true });
    els.push(...frame(h));
    const sel = pick >= 0 ? FB[pick] : undefined;
    return {
      els,
      readout: [
        sel ? `${yt(sel)} ${sel.s} (${FB_CATS[sel.cat].word}): ${sel.what}` : `Dokuz olayın ${fbCount(0)}'ü kara, ${fbCount(1)}'ü deniz, ${fbCount(2)}'si iç düzen olayı. Bir olaya tıkla.`,
        "Saltanat değişince hedefler sıfırlanmaz: Karadeniz ve Venedik rekabeti iki dönemi birbirine bağlar.",
      ],
    };
  },
};

const LATE_CATS: Cat[] = [
  { word: "kazanım", tone: "c" },
  { word: "maliyet", tone: "warn" },
  { word: "diplomasi", tone: "b" },
];
const LATE: YEv[] = [
  { y: 1566, s: "Zigetvar", cat: 0, what: "Kale alındı; Kanuni sefer sırasında öldü. Haber ordu dönene kadar saklandı." },
  { y: 1568, s: "Edirne Antlaşması", cat: 2, what: "Habsburglarla barış; Avusturya'nın yıllık ödemesi sürdü." },
  { y: 1569, s: "Don–Volga kanalı", cat: 1, what: "Rus ilerleyişine karşı Hazar'a su yolu açma girişimi; kanal tamamlanamadı." },
  { y: 1569, s: "Fransa ahitnamesi", cat: 2, what: "Fransa'ya verilen ticari ayrıcalıklar yazılı ahitnameyle yenilendi; Habsburg dengesine yönelik bir araçtır." },
  { y: 1571, s: "Kıbrıs", cat: 0, what: "1570'te başlayan sefer 1571'de tamamlandı; ada Venedik'ten alındı, Doğu Akdeniz yolu güvenceye girdi." },
  { y: 1571, s: "İnebahtı", cat: 1, what: "Haçlı donanması Osmanlı donanmasını yendi; kayıp ağırdı ama donanma ertesi yıl yeniden kuruldu." },
  { y: 1574, s: "Tunus", cat: 0, what: "Tunus İspanya'dan kesin olarak alındı; Kuzey Afrika kıyısında denetim sürdü." },
  { y: 1578, s: "Safevi savaşları", cat: 1, what: "1578–1590 arasında süren uzun sefer dönemi; asker, para ve ikmal yükünü büyüttü." },
  { y: 1590, s: "Ferhat Paşa barışı", cat: 2, what: "Safevilerle barış; Tebriz ve Kafkasya'da geniş topraklar Osmanlı'ya bırakıldı." },
  { y: 1593, s: "Uzun Savaş", cat: 1, what: "Habsburglarla 1593–1606 savaşı başladı; kale savaşları uzadı, nakit ihtiyacı arttı." },
];
const lateAt = (year: number) => LATE.filter((e) => e.y <= year);
const lateFigure: FigureDef = {
  caption:
    "Yıl sürgüsünü 1566'dan 1595'e kaydır: o yıla kadar gerçekleşen olaylar koyulaşır, sonrakiler soluk kalır. Her satırda olayın türü yazılı: kazanım, maliyet ya da diplomasi. 1566 sonrası dönem tek yönlü bir gerileme değil; kazanım sürerken uzun savaşların bedeli de birikir.",
  alt: "On satırlı yıl çizelgesi, 1560–1600 ekseni. Solda olay adları, sağda tür sözcüğü; düşey imleç seçilen yılı gösterir. İmleçten sonraki olaylar soluk ve kesik çizgili.",
  maxHeight: fitH(yearRows({ events: LATE, cats: LATE_CATS, a0: 1560, a1: 1600, ticks: [1560, 1600], upTo: 1566 }).h),
  param: { label: "Yıl", min: 1566, max: 1595, step: 1, init: 1571, plain: true },
  draw: (year) => {
    const { els, h } = yearRows({ events: LATE, cats: LATE_CATS, a0: 1560, a1: 1600, ticks: [1560, 1600], upTo: year });
    els.push(...frame(h));
    const done = lateAt(year);
    const n = (c: number) => done.filter((e) => e.cat === c).length;
    const last = done[done.length - 1];
    return {
      els,
      readout: [
        `${year} yılına kadar: ${n(0)} kazanım, ${n(1)} maliyet, ${n(2)} diplomasi olayı.`,
        `Son olay ${yt(last)} ${last.s}: ${last.what}`,
      ],
    };
  },
};

// Kanuni'nin doğu seferleri: şematik konumlar (ölçekli değil).
const EP = (lon: number, lat: number): V => v((lon - 35) * 0.8, (lat - 33) * 0.75);
const EAST: Spot[] = [
  { name: "Amasya", at: EP(35.83, 40.65), tone: "b" },
  { name: "Erzurum", at: EP(41.27, 39.9), tone: "c" },
  { name: "Van", at: EP(43.38, 38.5), tone: "c" },
  { name: "Nahçıvan", at: EP(45.41, 39.21), tone: "warn" },
  { name: "Tebriz", at: EP(46.29, 38.08), tone: "warn" },
  { name: "Bağdat", at: EP(44.36, 33.31), tone: "c" },
];
const EAST_STEPS: { s: string; spots: number[]; route: [number, number][]; owner: string; read: string }[] = [
  {
    s: "1534–1535 Irakeyn Seferi",
    spots: [1, 4, 5],
    route: [[1, 4], [4, 5]],
    owner: "Bağdat Osmanlı'ya geçti (1534); Tebriz alındı ama elde tutulmadı.",
    read: "İki Irak (Irak-ı Arap ve Irak-ı Acem) seferi: Tebriz ve Bağdat alındı; Bağdat ile Basra yoluna açılan kapı kazanıldı.",
  },
  {
    s: "1548–1549 ikinci sefer",
    spots: [1, 2, 4],
    route: [[1, 2], [2, 4]],
    owner: "Van kalesi alındı (1548); Tebriz yine kalıcı olmadı.",
    read: "Safevi ordusu meydan savaşından kaçınıp geri çekildi; sefer sınır kalelerinde sonuç verdi, kesin bir zafer getirmedi.",
  },
  {
    s: "1553–1555 Nahçıvan Seferi",
    spots: [1, 3],
    route: [[1, 3]],
    owner: "Kalıcı yeni toprak yok; iki taraf da uzun savaşın bedelini görüyor.",
    read: "Nahçıvan çevresine yürüyüş; Safeviler yine yıpratma yolunu seçti ve iki taraf barışa yöneldi.",
  },
  {
    s: "1555 Amasya Antlaşması",
    spots: [0, 4, 5],
    route: [],
    owner: "Bağdat Osmanlı'da, Tebriz Safevi'de kaldı.",
    read: "İki devlet arasında ilk resmî antlaşma: savaşla kurulan sınır diplomatik düzene bağlandı. Barış, rekabetin sona erdiği anlamına gelmez; 1578'de savaş yeniden başladı.",
  },
];
const eastFigure: FigureDef = {
  caption:
    "İleri ile Kanuni'nin doğu siyasetini aç: üç sefer ve 1555 Amasya Antlaşması. Her adımda yalnız o aşamanın yerleri koyulaşır, anahtar her yerin o anki durumunu yazar. Konumlar yaklaşıktır, harita şematiktir ve ölçekli değildir; bugünkü sınırlar çizilmedi.",
  alt: "Altı numaralı halkalı şematik harita: batıda Amasya, ortada Erzurum ve Van, doğuda Nahçıvan ve Tebriz, güneyde Bağdat. Sefer adımlarında Erzurum'dan çıkan oklar Tebriz, Bağdat, Van ve Nahçıvan'a uzanır.",
  steps: EAST_STEPS.map((s) => s.s),
  draw: (_v, step) => {
    const st = EAST_STEPS[step];
    const els: El[] = [txt(v(-0.4, 6.3), " ", "c"), txt(v(9.6, -0.6), " ", "c")];
    for (const [a, b] of st.route) els.push(link(EAST[a].at, EAST[b].at, "ink", true, true));
    EAST.forEach((p, i) => els.push(...token(p.at, String(i + 1), p.tone, { on: st.spots.includes(i), sel: false })));
    const legend: Legend = EAST.map((p, i) => ({ code: String(i + 1), label: st.spots.includes(i) ? `${p.name} (bu aşamada)` : p.name, tone: st.spots.includes(i) ? p.tone : "muted" }));
    return { els, legend, readout: [`${st.s}: ${st.read}`, `Durum: ${st.owner}`] };
  },
};

// Hint Deniz Seferleri: hedef ile erişilen sonuç (şematik, ölçekli değil).
const IP = (lon: number, lat: number): V => v((lon - 31) * 0.225, (lat - 11) * 0.24);
const INDIAN: (Spot & { goal: string; got: string })[] = [
  { name: "Süveyş", at: IP(32.55, 29.97), tone: "b", goal: "Kızıldeniz'de donanma üssü ve tersane.", got: "Seferlerin çıkış limanı oldu; gemiler burada hazırlandı." },
  { name: "Aden (1538)", at: IP(45.03, 12.8), tone: "c", goal: "Kızıldeniz'in ağzını denetlemek.", got: "Hadım Süleyman Paşa yolda Aden'i aldı; Kızıldeniz girişi Osmanlı denetimine girdi." },
  { name: "Diu (1538)", at: IP(70.98, 20.71), tone: "warn", goal: "Portekiz kalesini düşürüp Hindistan kıyısında dayanak bulmak.", got: "Kuşatma başarısız oldu; Hindistan kıyısında kalıcı üs kurulamadı." },
  { name: "Basra (1546)", at: IP(47.8, 30.5), tone: "c", goal: "Körfez ticaretine kara yolundan bağlanmak.", got: "Basra Osmanlı'ya katıldı; Körfez filosunun limanı oldu." },
  { name: "Maskat (1552)", at: IP(58.4, 23.6), tone: "c", goal: "Hürmüz yolunda Portekiz desteğini kesmek.", got: "Piri Reis Maskat'ı aldı." },
  { name: "Hürmüz (1552)", at: IP(56.45, 27.1), tone: "warn", goal: "Körfez'in ağzındaki Portekiz kalesini almak.", got: "Kuşatma sonuçsuz kaldı; Körfez'in çıkışı Portekiz'de kaldı." },
];
const indianFigure: FigureDef = {
  caption:
    "Şematik harita (konumlar yaklaşık, ölçekli değil): Kızıldeniz, Basra Körfezi ve Hindistan kıyısı. Bir numaraya tıkla; kart önce hedefi, sonra erişilen sonucu yazar. Aden, Basra ve Maskat alındı; Diu ve Hürmüz alınamadı. Hedef ile sonucu aynı cümlede eşitleme.",
  alt: "Batıda Süveyş, güneyde Aden, kuzeyde Basra, ortada Maskat ve Hürmüz, en doğuda Diu. Süveyş'ten Aden'e, Aden'den Diu'ya ve Aden'den Maskat ile Hürmüz üzerinden Basra'ya giden kesik yollar. Alınan yerler ile alınamayan yerler farklı tonda.",
  picks: INDIAN.map((p) => ({ label: p.name, title: p.name, detail: [`Hedef: ${p.goal}`, `Sonuç: ${p.got}`] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [txt(v(-0.4, 5.2), " ", "c"), txt(v(9.4, -0.3), " ", "c")];
    const A = INDIAN.map((p) => p.at);
    els.push(link(A[0], A[1], "b", true), link(A[1], A[2], "warn", true), link(A[1], A[4], "c", true), link(A[4], A[5], "c", true), link(A[5], A[3], "c", true));
    els.push(txt(v(0.75, 1.6), "Kızıldeniz", "c", { small: true, tone: "muted" }), txt(v(6.6, 0.35), "Hint Okyanusu", "c", { small: true, tone: "muted" }), txt(v(5.9, 4.95), "Basra Körfezi", "c", { small: true, tone: "muted" }));
    INDIAN.forEach((p, i) => els.push(...token(p.at, String(i + 1), p.tone, { sel: pick === i, pick: i })));
    const legend: Legend = INDIAN.map((p, i) => ({ code: String(i + 1), label: `${p.name}: ${p.tone === "warn" ? "alınamadı" : i === 0 ? "üs" : "alındı"}`, tone: p.tone }));
    const sel = pick >= 0 ? INDIAN[pick] : undefined;
    return {
      els,
      legend,
      readout: sel
        ? [`${sel.name}. Hedef: ${sel.goal} Sonuç: ${sel.got}`, "Kızıldeniz ve Körfez'de denetim kuruldu; Hint Okyanusu'nda kalıcı üstünlük kurulamadı."]
        : ["Bir numaraya tıkla ya da aşağıdan seç.", "Kızıldeniz ve Körfez'de denetim kuruldu; Hint Okyanusu'nda kalıcı üstünlük kurulamadı."],
    };
  },
};

/* =====================================================================
 * 016 Devrimler Çağında Değişen Devlet ve Toplum
 * ===================================================================== */

const IND: [string, string][] = [
  ["Makine ve buhar gücü", "Ücretli işçi"],
  ["Fabrika ve seri üretim", "Kentleşme"],
  ["Ham madde ve pazar arayışı", "Çalışma koşulları sorunu"],
  ["Rekabet ve sömürge yarışı", "Eğitim, sağlık ve çalışma düzenlemesi talebi"],
];
const IND_READ = [
  "Üretimin enerjisi ve aracı değişti: insan ve hayvan gücü yerine makine. Aynı adım üretimi atölyeden çıkarıp ücret karşılığı çalışan işçiye bağladı.",
  "Makineler fabrikada toplandı, aynı ürün büyük sayıda üretildi; işçiler fabrikaların çevresindeki kentlere taşındı.",
  "Seri üretim daha çok ham madde ve satılacak pazar ister. Kentte uzun mesai, çocuk emeği ve sağlıksız konut gibi yeni sorunlar çıktı.",
  "Pazar ve ham madde rekabeti sömürge yarışını hızlandırdı. Toplum zincirinin ucunda devletin eğitim, sağlık ve çalışma hayatına düzenleme getirmesi talebi büyüdü.",
];
const industryFigure: FigureDef = (() => {
  const X0 = [0, 5.15];
  const X1 = [4.85, CW];
  const ls = IND.map((r) => r.map((s, c) => boxLines(X0[c], X1[c], s, undefined)));
  const hs = ls.map((r) => Math.max(...r.map(linesH)));
  const headH = 0.6;
  const trap = boxLines(1.6, 8.4, "Ulus-devletlerin zayıflaması", "Bu zincirden doğrudan çıkmaz: vergi, ordu ve okul kapasitesi birçok yerde güçlendi.");
  const trapH = linesH(trap);
  const total = headH + hs.reduce((s, h) => s + h + 0.55, 0) + trapH + 0.2;
  return {
    caption:
      "İleri ile iki zinciri birlikte aç: solda üretim, sağda çalışma ilişkisi ve toplum. Her satır bir üst satırın sonucudur. Son adımda zincire bağlanmayan bir sonuç çıkar: Sanayi Devrimi ulus-devletleri otomatik olarak zayıflatmadı.",
    alt: "İki sütunlu dört katlı neden–sonuç zinciri. Sol: makine ve buhar gücü, fabrika ve seri üretim, ham madde ve pazar arayışı, rekabet ve sömürge yarışı. Sağ: ücretli işçi, kentleşme, çalışma koşulları sorunu, düzenleme talebi. Altta kesik çerçeveli zincir dışı kart.",
    maxHeight: fitH(total),
    steps: ["Üretim aracı", "Fabrika ve kent", "Yeni ihtiyaç ve sorun", "Rekabet ve kamu talebi", "Zincir dışı sonuç"],
    draw: (_v, step) => {
      const els: El[] = [txt(v(X0[0], -0.25), "Üretim", "e", { small: true, bold: true, tone: "c" }), txt(v(X0[1], -0.25), "Toplum ve çalışma", "e", { small: true, bold: true, tone: "b" })];
      let y = -headH;
      IND.forEach((_, i) => {
        const st: State = step === i ? "cur" : i < step || step === 4 ? "on" : "off";
        for (const c of [0, 1]) box(els, X0[c], y, X1[c], hs[i], ls[i][c], c === 0 ? "c" : "b", st);
        if (i < IND.length - 1) for (const c of [0, 1]) els.push(arrow(v((X0[c] + X1[c]) / 2, y - hs[i] - 0.06), v((X0[c] + X1[c]) / 2, y - hs[i] - 0.49), i < step));
        y -= hs[i] + 0.55;
      });
      box(els, 1.6, y + 0.35, 8.4, trapH, trap, "warn", step === 4 ? "cur" : "off");
      els.push(...frame(total));
      return {
        els,
        readout:
          step === 4
            ? ["Sonuç seçeneğini zincire bağla: fabrika, seri üretim, işçi ve pazar bağlanır; ulus-devletlerin zayıflaması bağlanmaz.", "Kentleşme bir kamu hizmeti ihtiyacı üretir; ihtiyaç ile çözülmüş sorun aynı şey değildir."]
            : [IND_READ[step], "Her yeni satır bir üst satırın mekanizmasıyla açıklanır; yalnız aynı yüzyılda olmak yetmez."],
      };
    },
  };
})();

const CIT: { s: string; col: 0 | 1 | 2; area: string; what: string }[] = [
  { s: "Kanun önünde eşitlik", col: 0, area: "toplum ve hukuk", what: "Ayrıcalık yerine aynı kuralın herkese uygulanması; 1789'un temel fikirlerinden." },
  { s: "Can ve mal güvenliği", col: 0, area: "hukuk", what: "Yargısız ceza ve el koymaya karşı güvence; Osmanlı'da 1839 Tanzimat Fermanı'nın ana vaadi." },
  { s: "Temsil ve oy", col: 0, area: "siyaset", what: "Yönetime seçilmiş temsilcilerle katılma; Osmanlı'da 1876 Kanun-ı Esasi ile Meclis-i Mebusan." },
  { s: "İlköğretim", col: 1, area: "eğitim", what: "Hem hak hem zorunluluk: Osmanlı'da 1869 Maarif-i Umumiye Nizamnamesi ilköğretimi zorunlu tuttu. Ortak okul, ortak siyasal kimlik aracıdır." },
  { s: "Düzenli vergi", col: 2, area: "ekonomi", what: "Herkesin gücüne göre ve belirli kurala bağlı vergi; iltizamın keyfîliğine karşı Tanzimat ilkesi." },
  { s: "Zorunlu askerlik", col: 2, area: "askerlik", what: "Ulusal ordu yurttaşın yükümlülüğüdür; yalnız silah değişimi değil, devlet ile birey ilişkisinin değişimidir." },
  { s: "Kanuna uyma", col: 2, area: "hukuk", what: "Kural herkesi bağlıyorsa yönetenin de yönetilenin de uyması beklenir; hak ile yükümlülük birlikte tanımlanır." },
];
const CIT_HEAD = ["Hak", "İkisi birden", "Yükümlülük"];
const CIT_WORD = ["hak", "hak ve yükümlülük", "yükümlülük"];
const CIT_TONE: Tone[] = ["c", "b", "warn"];
const citizenFigure: FigureDef = (() => {
  const XS = [0, 3.4, 6.8].map((x) => [x, x + 3.2] as const);
  const cardLs = CIT.map((c, i) => boxLines(XS[c.col][0], XS[c.col][1], c.s, undefined, i));
  const hs = cardLs.map(linesH);
  const colH = [0, 1, 2].map((col) => CIT.reduce((s, c, i) => (c.col === col ? s + hs[i] + 0.25 : s), 0));
  const total = 0.7 + Math.max(...colH);
  return {
    caption:
      "Yurttaşlık iki yönlü bir ilişkidir: solda haklar, sağda yükümlülükler, ortada ikisini birden taşıyan ilköğretim. Bir kutuya tıkla; kart alanını (siyaset, toplum, ekonomi, askerlik, eğitim) ve Osmanlı'daki karşılığını yazar. Yurttaşlık yalnız oy vermek değildir.",
    alt: "Üç sütun: Hak sütununda kanun önünde eşitlik, can ve mal güvenliği, temsil ve oy; orta sütunda ilköğretim; Yükümlülük sütununda düzenli vergi, zorunlu askerlik, kanuna uyma. Kutular seçilebilir.",
    maxHeight: fitH(total),
    picks: CIT.map((c) => ({ label: c.s, title: `${c.s} · ${CIT_WORD[c.col]} · ${c.area}`, detail: [c.what] })),
    draw: (_v, _s, pick = -1) => {
      const els: El[] = [];
      XS.forEach(([x0], col) => els.push(txt(v(x0, -0.25), CIT_HEAD[col], "e", { small: true, bold: true, tone: CIT_TONE[col] })));
      const ys = [-0.7, -0.7, -0.7];
      CIT.forEach((c, i) => {
        box(els, XS[c.col][0], ys[c.col], XS[c.col][1], hs[i], cardLs[i], CIT_TONE[c.col], pick === i ? "cur" : "on");
        ys[c.col] -= hs[i] + 0.25;
      });
      els.push(...frame(total));
      const sel = pick >= 0 ? CIT[pick] : undefined;
      return {
        els,
        readout: [
          sel ? `${sel.s} (${CIT_WORD[sel.col]}, ${sel.area}): ${sel.what}` : "Bir kutuya tıkla ya da aşağıdan seç.",
          "Eşitlik, vergi ve askerlik birlikte verilmişse aranan kavram modern yurttaşlıktır.",
        ],
      };
    },
  };
})();

const nationFigure: FigureDef = (() => {
  const top = boxLines(1.5, 8.5, "1789: millet egemenliği ve eşitlik", "Egemenliğin kaynağı hanedandan millete kayar.");
  const mid = boxLines(1.5, 8.5, "Yayılma", "Napolyon savaşları ve sonraki 1830, 1848 devrimleri fikri Avrupa'ya taşır.");
  const left = boxLines(0, 4.85, "Çok uluslu imparatorluk: bölücü etki", "Osmanlı'da 1804 Sırp ve 1821 Yunan isyanları; Avusturya ve Rusya da aynı baskıyı yaşar.");
  const right = boxLines(5.15, CW, "Parçalı ülke: birleştirici etki", "İtalyan birliği 1861 krallık (Roma 1870), Alman birliği 1871 imparatorluk.");
  const end = boxLines(1.5, 8.5, "Osmanlı'nın yanıtı", "Osmanlıcılık: din ve köken ayırmadan ortak vatandaşlıkla birliği korumak; Tanzimat ve Islahat bu çizgidedir.");
  const hT = linesH(top);
  const hM = linesH(mid);
  const hB = Math.max(linesH(left), linesH(right));
  const hE = linesH(end);
  const G = 0.55;
  const total = hT + hM + hB + hE + 3 * G + 0.1;
  const READ = [
    "Fikir: egemenlik milletin, yurttaşlar kanun önünde eşit. Bu, çok dilli ve çok dinli devletler için yeni bir soru doğurur: millet kim?",
    "Fikir yalnız kitapla değil savaş ve devrim dalgalarıyla yayıldı; aynı kavram farklı ülkelerde farklı sonuç üretti.",
    "Aynı milliyetçilik iki zıt sonuç verdi: çok uluslu imparatorlukları parçaladı, parçalı İtalya ve Almanya'yı birleştirdi.",
    "Osmanlı aydınları ayrılığı ortak vatandaşlıkla durdurmayı denedi; bu çözüm Balkan milliyetçiliklerini durduramadı.",
  ];
  return {
    caption:
      "İleri ile aç: 1789 fikri, yayılma yolu, iki zıt etki ve Osmanlı'nın yanıtı. Aynı milliyetçilik çok uluslu imparatorlukta bölücü, parçalı ülkede birleştirici çalıştı. Sonucu ülkenin yapısından oku, fikrin adından değil.",
    alt: "Yukarıdan aşağıya: 1789 kutusu, yayılma kutusu, iki kola ayrılan kutular (solda çok uluslu imparatorlukta bölücü etki, sağda parçalı ülkede birleştirici etki) ve altta Osmanlı'nın yanıtı: Osmanlıcılık.",
    maxHeight: fitH(total),
    steps: ["1789 fikri", "Yayılma", "İki zıt etki", "Osmanlı'nın yanıtı"],
    draw: (_v, step) => {
      const els: El[] = [];
      const st = (i: number): State => (step === i ? "cur" : i < step ? "on" : "off");
      let y = 0;
      box(els, 1.5, y, 8.5, hT, top, "b", st(0));
      y -= hT;
      els.push(arrow(v(5, y - 0.06), v(5, y - G + 0.06), step > 0));
      y -= G;
      box(els, 1.5, y, 8.5, hM, mid, "b", st(1));
      y -= hM;
      els.push(arrow(v(4, y - 0.06), v(2.4, y - G + 0.06), step > 1), arrow(v(6, y - 0.06), v(7.6, y - G + 0.06), step > 1));
      y -= G;
      box(els, 0, y, 4.85, hB, left, "warn", st(2));
      box(els, 5.15, y, CW, hB, right, "c", st(2));
      y -= hB;
      els.push(arrow(v(2.4, y - 0.06), v(3.6, y - G + 0.06), step > 2));
      y -= G;
      box(els, 1.5, y, 8.5, hE, end, "b", st(3));
      els.push(...frame(total));
      return { els, readout: [READ[step], "Her milliyetçilik sonucu demokrasi demek değildir; önce hangi devlet yapısında yaşandığını sor."] };
    },
  };
})();

const armyFigure = compareFig({
  caption:
    "Üç ordu girişimini satır satır aç, son adımda birlikte oku: kim kurdu, nasıl kuruldu ve nasıl sona erdi. Ayırt edici soru: yeni ordu eski ocağın yanında mı kuruldu, eski ocak kaldırıldıktan sonra mı?",
  alt: "Üç satırlı, iki sütunlu tablo. Satırlar: Nizam-ı Cedit (1793), Sekban-ı Cedit (1808), Asakir-i Mansure (1826). Sütunlar: nasıl kuruldu ve sonu. Satırlar adım adım açılır.",
  heads: ["Kim kurdu, nasıl kuruldu", "Sonu"],
  tones: ["c", "warn"],
  rows: [
    {
      label: "Nizam-ı Cedit, 1793",
      cells: ["III. Selim; İrad-ı Cedit hazinesiyle Avrupa usulü eğitilen yeni ocak", "1807 Kabakçı Mustafa İsyanı: ocak kaldırıldı, padişah tahttan indirildi"],
      note: "Yeni birlik eski ocağın yanında kuruldu; iki ordu yan yana kaldıkça direniş büyüdü.",
    },
    {
      label: "Sekban-ı Cedit, 1808",
      cells: ["II. Mahmut ve Alemdar Mustafa Paşa; Nizam-ı Cedit deneyimi yeni adla sürdürüldü", "Aynı yıl yeniçeri ayaklanması: Alemdar öldü, ocak dağıtıldı"],
      note: "Ad değişti, temel sorun değişmedi: eski ocak yerinde durdukça yeni birlik korunamadı.",
    },
    {
      label: "Asakir-i Mansure, 1826",
      cells: ["II. Mahmut; önce Yeniçeri Ocağı kaldırıldı (Vaka-i Hayriye), sonra Asakir-i Mansure-i Muhammediye kuruldu", "Kalıcı oldu; merkezî ve düzenli ordu yolu açıldı"],
      note: "Bu kez eski ocak kaldırıldıktan sonra yeni ordu kuruldu; yan yana iki ordu sorunu ortadan kalktı.",
    },
  ],
  foot: "Ayaklanma (1807, 1808) ile reform (1793, 1826) aynı türden olay değildir.",
  all: "İlk iki girişim eski ocak dururken kuruldu ve ayaklanmayla sona erdi; 1826'da önce ocak kaldırıldı. Ordu reformu yalnız silah değişimi değildir.",
});

/* =====================================================================
 * 017 Uluslararası İlişkilerde Denge Stratejisi
 * ===================================================================== */

const MP = (lon: number, lat: number): V => v((lon - 5) * 0.32, (lat - 30) * 0.4);
const MED: Spot[] = [
  { name: "Toulon", at: MP(5.93, 43.12), tone: "warn" },
  { name: "Malta", at: MP(14.5, 35.9), tone: "warn" },
  { name: "İskenderiye ve Ebukır", at: MP(29.92, 31.2), tone: "warn" },
  { name: "Akka", at: MP(35.07, 32.93), tone: "c" },
  { name: "İstanbul", at: MP(28.98, 41.01), tone: "b" },
];
const EGYPT_STEPS: { s: string; on: number[]; route: [number, number][]; read: string }[] = [
  { s: "Haziran 1798 Malta", on: [0, 1], route: [[0, 1]], read: "Fransız donanması Toulon'dan çıktı, yolda Malta'yı aldı. Hedef Doğu Akdeniz ve İngiltere'nin Hindistan yolu." },
  { s: "Temmuz 1798 İskenderiye", on: [0, 1, 2], route: [[0, 1], [1, 2]], read: "Napolyon İskenderiye'ye çıktı, kısa sürede Kahire'ye girdi. Osmanlı toprağına doğrudan saldırı Fransa'yı tehdit yaptı." },
  { s: "Ağustos 1798 Ebukır", on: [2], route: [], read: "İngiliz filosu Ebukır'da Fransız donanmasını yok etti; Fransız ordusu Mısır'da denizden kesildi." },
  { s: "1798–1799 yeni ortaklar", on: [4, 2], route: [[4, 2]], read: "Osmanlı Fransa'ya savaş açtı; Rusya ve İngiltere ile ittifak yaptı. Dünün rakibi Rusya ortak oldu, çünkü tehdit Fransa'ydı." },
  { s: "1799 Akka", on: [2, 3], route: [[2, 3]], read: "Napolyon Suriye'ye yürüdü; Cezzar Ahmed Paşa'nın savunması ve İngiliz deniz desteğiyle Akka düşmedi, Fransız ordusu geri döndü." },
  { s: "1801–1802 çekiliş ve barış", on: [2, 4], route: [], read: "Fransız ordusu 1801'de Mısır'dan çekildi; 1802 Paris Antlaşması ile Mısır Osmanlı'ya döndü ve Osmanlı–Fransa ilişkisi onarıldı." },
];
const egyptFigure: FigureDef = {
  caption:
    "İleri ile 1798 Mısır seferini aşama aşama aç. Şematik harita: konumlar yaklaşık, ölçekli değil, kıyı çizgisi çizilmedi. Okları izlerken her adımda tehdidi ve ortağı yaz: tehdit Fransa olunca Osmanlı İngiltere ve Rusya ile aynı tarafta durdu; ortaklık kalıcı dostluk değil, ortak tehdide karşı çıkar birliğiydi.",
  alt: "Beş numaralı halka: batıda Toulon, ortada Malta, güneydoğuda İskenderiye ve Akka, kuzeydoğuda İstanbul. Toulon'dan Malta'ya ve İskenderiye'ye oklar, İskenderiye'den Akka'ya ok, İstanbul'dan İskenderiye'ye ok.",
  steps: EGYPT_STEPS.map((s) => s.s),
  draw: (_v, step) => {
    const st = EGYPT_STEPS[step];
    const els: El[] = [txt(v(-0.4, 5.7), " ", "c"), txt(v(10.0, -0.3), " ", "c")];
    for (const [a, b] of st.route) els.push(link(MED[a].at, MED[b].at, MED[a].tone === "b" ? "b" : "warn", true, true));
    MED.forEach((p, i) => els.push(...token(p.at, String(i + 1), p.tone, { on: st.on.includes(i) })));
    const legend: Legend = MED.map((p, i) => ({ code: String(i + 1), label: p.name, tone: p.tone }));
    return { els, legend, readout: [`${st.s}: ${st.read}`, "Tehdit: Fransa. Ortaklar: İngiltere ve Rusya. Hedef: Osmanlı'nın varlığını ve toprağını korumak."] };
  },
};

const POWERS: { name: string; want: string; tool: string; mean: string; tone: Tone }[] = [
  { name: "Rusya", want: "Boğazlar, sıcak denizler, Balkan nüfuzu", tool: "Ortodoks koruyuculuğu ve Panslavizm", mean: "Osmanlı'nın en sürekli baskı kaynağı; dinî gerekçe stratejik hedefle birlikte okunur.", tone: "warn" },
  { name: "İngiltere", want: "Hindistan yolu ve Akdeniz dengesi", tool: "Rus yayılmasını sınırlama, konferans ve donanma", mean: "Uzun süre Osmanlı bütünlüğünü korumaktan yana; bu tutum çıkara bağlıydı ve 1878 sonrası değişti.", tone: "b" },
  { name: "Fransa", want: "Mısır, Akdeniz ve kültürel nüfuz", tool: "Katolik koruyuculuğu, okul ve sermaye", mean: "1798'de saldıran, 1854'te yanında savaşan devlet; rolü konuya göre değişir.", tone: "c" },
  { name: "Avusturya", want: "Balkanlar ve Orta Avrupa güvenliği", tool: "Viyana düzeni, Rusya ile pazarlık", mean: "Rusya'nın Balkanlarda büyümesini istemez; kimi zaman ortak proje, kimi zaman rekabet.", tone: "ink" },
];
const powersFigure: FigureDef = (() => {
  const XS = [
    [0, 4.85],
    [5.15, CW],
  ] as const;
  const ls = POWERS.map((p, i) => boxLines(XS[i % 2][0], XS[i % 2][1], p.name, p.want, i));
  const rowH = [0, 1].map((r) => Math.max(linesH(ls[2 * r]), linesH(ls[2 * r + 1])));
  const total = rowH[0] + rowH[1] + 0.3;
  return {
    caption:
      "1815 Viyana Kongresi Napolyon sonrası Avrupa'yı düzenledi; Osmanlı bu kongreye katılmadı ve düzenin garantisi dışında kaldı. Dört büyük devletin çıkarını ayrı kutularda oku, bir kutuya tıkla: kart aracı ve Osmanlı için anlamını yazar. Şark Meselesi bu çıkarların Osmanlı toprakları üzerinde çatışmasıdır.",
    alt: "İki satır iki sütunlu dört kutu: Rusya (Boğazlar, sıcak denizler, Balkan nüfuzu), İngiltere (Hindistan yolu ve Akdeniz dengesi), Fransa (Mısır, Akdeniz ve kültürel nüfuz), Avusturya (Balkanlar ve Orta Avrupa güvenliği). Kutular seçilebilir.",
    maxHeight: fitH(total),
    picks: POWERS.map((p) => ({ label: p.name, title: `${p.name} · ${p.want}`, detail: [`Araç: ${p.tool}.`, p.mean] })),
    draw: (_v, _s, pick = -1) => {
      const els: El[] = [];
      POWERS.forEach((p, i) => {
        const r = Math.floor(i / 2);
        const y0 = r === 0 ? 0 : -rowH[0] - 0.3;
        box(els, XS[i % 2][0], y0, XS[i % 2][1], rowH[r], ls[i], p.tone, pick === i ? "cur" : "on");
      });
      els.push(...frame(total));
      const sel = pick >= 0 ? POWERS[pick] : undefined;
      return {
        els,
        readout: [sel ? `${sel.name}: çıkar ${sel.want}; araç ${sel.tool}. ${sel.mean}` : "Bir kutuya tıkla ya da aşağıdan seç.", "Aktörün adından önce o anki çıkarını oku: aynı devlet bir dosyada destek, ötekinde tehdit olabilir."],
      };
    },
  };
})();

const BP = (lon: number, lat: number): V => v((lon - 25) * 0.5, (lat - 40) * 0.9);
const CRIMEA: (Spot & { what: string })[] = [
  { name: "Eflak ve Boğdan", at: BP(26.5, 45.5), tone: "c", what: "1853'te Rusya'nın işgal ettiği prenslikler; Paris'te Osmanlı egemenliğinde özerk kaldı, Tuna'da gemi geçişi serbest bırakıldı." },
  { name: "Sinop", at: BP(35.15, 42.03), tone: "warn", what: "Kasım 1853'te Rus donanması Osmanlı filosunu Sinop'ta yaktı; İngiltere ve Fransa'nın savaşa girmesini hızlandırdı." },
  { name: "Sivastopol", at: BP(33.52, 44.6), tone: "warn", what: "Rus Karadeniz donanmasının üssü; 1854–1855 kuşatmasıyla düştü. Paris'te Rusya'ya geri verildi." },
  { name: "Kars", at: BP(43.1, 40.6), tone: "warn", what: "1855'te Rusya'nın eline geçti; Paris'te Osmanlı'ya geri verildi." },
  { name: "Karadeniz", at: BP(31.5, 43.3), tone: "b", what: "Paris'te tarafsız sayıldı: kıyılarda savaş gemisi ve tersane tutulamayacaktı. Rusya 1871'de bu hükmü tanımadığını açıkladı ve Londra'da kaldırıldı." },
  { name: "İstanbul", at: BP(28.98, 41.01), tone: "b", what: "Şubat 1856'da, barıştan hemen önce Islahat Fermanı ilan edildi; büyük devletlerin müdahale gerekçesini daraltma amacı da taşıyordu." },
];
const crimeaFigure: FigureDef = {
  caption:
    "Kırım Savaşı'nın yerleri şematik haritada (konumlar yaklaşık, ölçekli değil). Bir numaraya tıkla: kart olayı ve 1856 Paris Antlaşması'ndaki karşılığını yazar. Paris Osmanlı'yı Avrupa devletler hukukuna kattı ve toprak bütünlüğünü ortak güvenceye bağladı; bu hukuki tanınma güç eşitliği değildir.",
  alt: "Altı numaralı halka: batıda Eflak ve Boğdan ile İstanbul, ortada Karadeniz, kuzeyde Sivastopol, güneyde Sinop, doğuda Kars. Halkalar seçilebilir.",
  picks: CRIMEA.map((p) => ({ label: p.name, title: p.name, detail: [p.what] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [txt(v(-0.4, 5.6), " ", "c"), txt(v(9.6, -0.2), " ", "c")];
    CRIMEA.forEach((p, i) => els.push(...token(p.at, String(i + 1), p.tone, { sel: pick === i, pick: i })));
    const legend: Legend = CRIMEA.map((p, i) => ({ code: String(i + 1), label: p.name, tone: p.tone }));
    const sel = pick >= 0 ? CRIMEA[pick] : undefined;
    return {
      els,
      legend,
      readout: [
        sel ? `${sel.name}: ${sel.what}` : "Bir numaraya tıkla ya da aşağıdan seç.",
        "Tehdit Rusya; destek İngiltere, Fransa ve 1855'ten itibaren Sardinya. Garanti dış müdahaleyi bitirmedi: 1878'de yeniden savaş çıktı.",
      ],
    };
  },
};

const ACTORS = ["İngiltere", "Fransa", "Rusya", "Almanya"];
const SHIFT: { s: string; roles: [string, string, string, string]; changed: number[]; read: string }[] = [
  {
    s: "1878",
    roles: ["Ayastefanos'un daraltılmasını destekledi; karşılığında Kıbrıs'ın yönetimini aldı.", "Kuzey Afrika'da nüfuz arıyor.", "93 Harbi'nin galibi; Berlin'de kazancı daraltıldı.", "Berlin Kongresi'ne ev sahipliği yaptı; Osmanlı'dan toprak istemedi."],
    changed: [0, 2, 3],
    read: "Destek bedelsiz değil: İngiltere'nin desteği Kıbrıs'la ödendi.",
  },
  {
    s: "1881",
    roles: ["Ayastefanos'un daraltılmasını destekledi; karşılığında Kıbrıs'ın yönetimini aldı.", "Tunus'u işgal etti.", "93 Harbi'nin galibi; Berlin'de kazancı daraltıldı.", "Berlin Kongresi'ne ev sahipliği yaptı; Osmanlı'dan toprak istemedi."],
    changed: [1],
    read: "Fransa Tunus'ta Osmanlı toprağını aldı: Kırım'daki ortak bu dosyada tehdit.",
  },
  {
    s: "1882",
    roles: ["Mısır'ı işgal etti; bütünlüğü koruma siyasetinden uzaklaştı.", "Tunus'u işgal etti.", "93 Harbi'nin galibi; Berlin'de kazancı daraltıldı.", "Berlin Kongresi'ne ev sahipliği yaptı; Osmanlı'dan toprak istemedi."],
    changed: [0],
    read: "Eski destekçi İngiltere Mısır'da tehdide dönüştü; Osmanlı yeni bir denge ortağı arar.",
  },
  {
    s: "1899–1903",
    roles: ["Mısır'ı işgal etti; bütünlüğü koruma siyasetinden uzaklaştı.", "Tunus'u işgal etti.", "Balkanlarda ve Boğazlarda baskı sürüyor.", "Bağdat Demiryolu imtiyazı (1899 ön, 1903 kesin); subay ve sermaye ilişkisi."],
    changed: [3, 2],
    read: "Almanya toprak istemeyen, sermaye ve askerî eğitim veren ortak olarak öne çıktı.",
  },
  {
    s: "1907",
    roles: ["Rusya ile uzlaştı; Fransa ile birlikte Üçlü İtilaf tamamlandı.", "Üçlü İtilaf'ın parçası.", "İngiltere ile uzlaştı; Üçlü İtilaf tamamlandı.", "Üçlü İttifak'ın başı."],
    changed: [0, 1, 2],
    read: "Osmanlı'nın eski rakipleri aynı blokta birleşti; İngiltere–Rusya çekişmesinden yararlanma imkânı daraldı.",
  },
  {
    s: "1914",
    roles: ["İtilaf: karşı blok.", "İtilaf: karşı blok.", "İtilaf: karşı blok.", "2 Ağustos 1914 gizli ittifakın ortağı."],
    changed: [3],
    read: "Denge siyaseti tek bir ittifaka dönüştü: tarafsız kalarak dengeleme imkânı kalmadı.",
  },
];
const shiftFigure: FigureDef = (() => {
  const XS = [
    [0, 4.85],
    [5.15, CW],
  ] as const;
  const maxLs = ACTORS.map((a, i) => SHIFT.map((st) => boxLines(XS[i % 2][0], XS[i % 2][1], a, st.roles[i])).reduce((m, l) => (l.length > m.length ? l : m)));
  const rowH = [0, 1].map((r) => Math.max(linesH(maxLs[2 * r]), linesH(maxLs[2 * r + 1])));
  const total = rowH[0] + rowH[1] + 0.3;
  return {
    caption:
      "İleri ile 1878'den 1914'e ilerle: dört devletin o yılki tutumu kutularda, o adımda değişen kutular vurgulu. İngiltere destekten işgale, Almanya uzak güçten ortağa geçti; 1907'de eski rakipler aynı blokta buluştu. Değişen ortak, değişmeyen amaç: varlığı ve toprağı korumak.",
    alt: "İki satır iki sütunlu dört kutu: İngiltere, Fransa, Rusya, Almanya. Her adımda kutuların metni o yılki tutumu yazar; adımlar 1878, 1881, 1882, 1899–1903, 1907, 1914.",
    maxHeight: fitH(total),
    steps: SHIFT.map((s) => s.s),
    draw: (_v, step) => {
      const st = SHIFT[step];
      const els: El[] = [];
      ACTORS.forEach((a, i) => {
        const r = Math.floor(i / 2);
        const y0 = r === 0 ? 0 : -rowH[0] - 0.3;
        box(els, XS[i % 2][0], y0, XS[i % 2][1], rowH[r], boxLines(XS[i % 2][0], XS[i % 2][1], a, st.roles[i]), i === 3 ? "c" : "b", st.changed.includes(i) ? "cur" : "on");
      });
      els.push(...frame(total));
      return { els, readout: [`${st.s}: ${st.read}`, "Önce tehdidi belirle, sonra onu sınırlamak isteyen gücü bul, en son desteğin bedelini ara."] };
    },
  };
})();

/* =====================================================================
 * 019 20. Yüzyıl Başlarında Osmanlı ve Dünya
 * ===================================================================== */

const IDEAS: { name: string; base: string; tone: Tone }[] = [
  { name: "Osmanlıcılık", base: "Din ve köken ayırmadan ortak vatandaşlık ve hukuki eşitlik", tone: "c" },
  { name: "İslamcılık", base: "Halifelik çevresinde Müslüman toplulukların dayanışması", tone: "b" },
  { name: "Türkçülük", base: "Ortak dil, tarih ve kültürle millî kimlik", tone: "warn" },
  { name: "Batıcılık", base: "Avrupa'nın bilim, teknik ve kurumlarından yararlanma", tone: "ink" },
];
const IDEA_EV: { s: string; hit: number[]; why: string }[] = [
  { s: "“Hangi dinden ve soydan olursa olsun herkes aynı kanun önünde eşit vatandaştır.”", hit: [0], why: "Kanıt ortak vatandaşlık ve eşitlik; birlik bütün toplulukları kapsayan hukuk bağıyla kurulur." },
  { s: "“Halifenin çevresinde birleşen Müslümanlar dış baskıya karşı birbirini korumalıdır.”", hit: [1], why: "Kanıt halifelik ve Müslüman dayanışması; birlik din bağıyla kurulur." },
  { s: "“Ortak dil, tarih ve kültür millî kimliğin temelidir; okulda yalın Türkçe okutulmalıdır.”", hit: [2], why: "Kanıt dil, tarih ve kültür; birlik millî kimlikle kurulur." },
  { s: "“Devleti güçlendirmek için Avrupa'nın okul, bilim ve tekniği örnek alınmalıdır.”", hit: [3], why: "Kanıt kurum, bilim ve teknik; Batıcılık bir birlik temeli değil, güçlenme yöntemi önerir." },
  { s: "“Avrupa'nın tekniği alınmalı, ama Müslüman toplulukların dayanışması korunmalıdır.”", hit: [1, 3], why: "Bir metinde iki akım birlikte bulunabilir: teknik vurgusu Batıcılık, dayanışma vurgusu İslamcılık." },
];
const ideasFigure: FigureDef = (() => {
  const evLs = IDEA_EV.map((e) => boxLines(0, CW, "Kanıt cümlesi", e.s));
  const evH = Math.max(...evLs.map(linesH));
  const XS = [
    [0, 4.85],
    [5.15, CW],
  ] as const;
  const ls = IDEAS.map((d, i) => boxLines(XS[i % 2][0], XS[i % 2][1], d.name, d.base));
  const rowH = [0, 1].map((r) => Math.max(linesH(ls[2 * r]), linesH(ls[2 * r + 1])));
  const G = 0.55;
  const total = evH + G + rowH[0] + 0.3 + rowH[1];
  return {
    caption:
      "Her adımda özgün bir kanıt cümlesi üstte, dört fikir akımı altta. Cümlenin birliği hangi bağla kurduğuna bak; eşleşen akım vurgulanır. Tek bir “birlik” sözcüğü yetmez, son adımda iki akımın aynı metinde birlikte bulunabildiğini gör.",
    alt: "Üstte bir kanıt cümlesi kutusu, altında iki satır iki sütunlu dört kutu: Osmanlıcılık, İslamcılık, Türkçülük, Batıcılık; her kutuda birlik temeli yazılı. Adım adım eşleşen kutu vurgulanır.",
    maxHeight: fitH(total),
    steps: ["Eşit vatandaşlık", "Halifelik ve dayanışma", "Dil ve kültür", "Bilim ve teknik", "İki akım birlikte"],
    draw: (_v, step) => {
      const ev = IDEA_EV[step];
      const els: El[] = [];
      box(els, 0, 0, CW, evH, evLs[step], "muted");
      els.push(arrow(v(5, -evH - 0.06), v(5, -evH - G + 0.06)));
      IDEAS.forEach((d, i) => {
        const r = Math.floor(i / 2);
        const y0 = -evH - G - (r === 0 ? 0 : rowH[0] + 0.3);
        box(els, XS[i % 2][0], y0, XS[i % 2][1], rowH[r], ls[i], d.tone, ev.hit.includes(i) ? "cur" : "on");
      });
      els.push(...frame(total));
      return { els, readout: [`${ev.hit.map((h) => IDEAS[h].name).join(" ve ")}: ${ev.why}`, "Akımı vurgu sözcüğünden değil, birliği hangi bağla kurduğundan bul."] };
    },
  };
})();

const balkanFigure = compareFig({
  caption:
    "İki Balkan Savaşı'nı satır satır karşılaştır: tarih, taraflar, Osmanlı'nın durumu, sonuç belgesi ve Osmanlı için sonuç. Birinci savaşta Osmanlı Balkan devletlerinin ortak hedefiydi; ikincisinde eski müttefikler toprak paylaşımı için birbirine düştü ve Osmanlı bu fırsatla Edirne'yi geri aldı.",
  alt: "İki sütunlu karşılaştırma tablosu: I. Balkan Savaşı ve II. Balkan Savaşı. Satırlar: tarih, taraflar, Osmanlı'nın durumu, sonuç belgesi, Osmanlı için sonuç. Satırlar adım adım açılır.",
  heads: ["I. Balkan Savaşı", "II. Balkan Savaşı"],
  tones: ["warn", "c"],
  rows: [
    { label: "Tarih", cells: ["Ekim 1912 – Mayıs 1913", "Haziran – Ağustos 1913"], note: "İkinci savaş birincinin barışından yalnız bir ay sonra başladı." },
    { label: "Taraflar", cells: ["Sırbistan, Bulgaristan, Yunanistan ve Karadağ Osmanlı'ya karşı", "Bulgaristan'a karşı Sırbistan, Yunanistan, Romanya ve Osmanlı"], note: "Müttefikler değişti: Bulgaristan birinci savaşta ortak, ikincisinde hedef." },
    { label: "Osmanlı'nın durumu", cells: ["Savaşan ve yenilen taraf; Edirne Mart 1913'te düştü", "Fırsatı kullanan taraf; Edirne Temmuz 1913'te geri alındı"], note: "Aynı yıl içinde Edirne kaybedildi ve geri alındı." },
    { label: "Sonuç belgesi", cells: ["Londra Antlaşması, 30 Mayıs 1913", "Bükreş (Balkan devletleri arası), İstanbul (Bulgaristan) ve Atina (Yunanistan) antlaşmaları, 1913"], note: "İkinci savaşta Osmanlı her devletle ayrı antlaşma imzaladı." },
    { label: "Osmanlı için sonuç", cells: ["Midye–Enez çizgisinin batısı kaybedildi; Arnavutluk bağımsızlığını ilan etti", "Edirne ve Kırklareli Osmanlı'da kaldı; Ege adaları sorunu çözülmedi"], note: "Kayıplar büyük ölçüde kaldı; geri alınan Edirne bugünkü Trakya sınırının temelidir." },
  ],
  foot: "Balkan Savaşlarını Trablusgarp'tan (1911) önceye koyma; kronoloji 1911 → 1912 → 1913 → 1914.",
  all: "Birinci savaş Osmanlı'ya karşı ortak bir savaş, ikincisi kazananların paylaşım savaşıdır; taraf ve sonuç sütunlarını karıştırma.",
});

const frontsCompare = compareFig({
  caption:
    "Kafkas ve Kanal cephelerinde hedef ile gerçekleşen sonucu satır satır ayır. İki cephede de hedef bir saldırıydı; ilk harekâtlar başarısız oldu ve cephe savunmaya döndü. Sonuç sütununu hedef sütunuyla eşitleme.",
  alt: "İki sütunlu karşılaştırma tablosu: Kafkas Cephesi ve Kanal Cephesi. Satırlar: hedef, ilk harekât, sonraki gelişme, savaş sonu. Satırlar adım adım açılır.",
  heads: ["Kafkas Cephesi", "Kanal Cephesi"],
  tones: ["c", "b"],
  rows: [
    { label: "Hedef", cells: ["1878'de kaybedilen Kars, Ardahan ve Batum'u geri almak; Kafkasya ve Orta Asya ile bağlantı", "Süveyş Kanalı'nı keserek İngiltere'nin Hindistan yolunu aksatmak; Mısır'ı geri kazanmak"], note: "Hedefler saldırı hedefidir; gerçekleşmiş sonuç değildir." },
    { label: "İlk harekât", cells: ["Aralık 1914 – Ocak 1915 Sarıkamış: soğuk ve ikmal yetersizliğiyle ağır kayıp", "Şubat 1915 kanal saldırısı: kanal geçilemedi"], note: "İki ilk harekât da hedefe ulaşmadı." },
    { label: "Sonraki gelişme", cells: ["1916'da Rus ilerleyişi: Erzurum ve Trabzon kaybedildi", "Ağustos 1916 ikinci saldırı başarısız; cephe Filistin'e çekilen savunmaya döndü"], note: "Saldırı cephesi savunma cephesine dönüştü." },
    { label: "Savaş sonu", cells: ["Rusya 1917'de çekildi; 1918 Brest-Litovsk ile Kars, Ardahan ve Batum geri alındı", "Aralık 1917 Kudüs kaybedildi; cephe 1918'de çöktü"], note: "Kafkas'taki geri alım kendi saldırısıyla değil, Rusya'nın çekilmesiyle geldi." },
  ],
  foot: "Hedef, gerçekleşen sonuç ve sonucu doğuran etkeni üç ayrı satıra yaz.",
  all: "İki cephede de saldırı hedefi gerçekleşmedi; Kafkas'taki 1918 kazancının nedeni Rusya'nın savaştan çekilmesidir.",
});

const FP = (lon: number, lat: number): V => v((lon - 21) * 0.4, (lat - 15) * 0.2);
const GROUPS: { word: string; tone: Tone }[] = [
  { word: "sınır ve savunma", tone: "c" },
  { word: "Boğaz ve başkent", tone: "warn" },
  { word: "müttefike destek", tone: "b" },
  { word: "imparatorluk çevresi", tone: "ink" },
];
const FRONTS: { name: string; at: V; g: number; what: string }[] = [
  { name: "Çanakkale", at: FP(26.4, 40.15), g: 1, what: "Boğazları ve başkenti savunma. 1915'te önce deniz, sonra kara harekâtı; İtilaf geçemedi, savaş uzadı, Rusya'ya yardım yolu kapalı kaldı." },
  { name: "Kafkas", at: FP(42.57, 40.33), g: 0, what: "Rusya'ya karşı doğu sınırı. Sarıkamış kaybı, 1916 Rus ilerleyişi, 1918 Brest-Litovsk ile geri alım." },
  { name: "Irak", at: FP(45.8, 32.5), g: 0, what: "Basra Körfezi ve petrol yolu. Nisan 1916 Kut'ta İngiliz kuvveti teslim oldu; Mart 1917'de Bağdat kaybedildi." },
  { name: "Suriye ve Filistin", at: FP(34.45, 31.5), g: 0, what: "Güney hattı ve Kanal'a yönelen saldırının üssü; İngiliz ilerleyişiyle 1917–1918'de çözüldü." },
  { name: "Hicaz ve Yemen", at: FP(41.5, 21.5), g: 3, what: "Kutsal yerler ve Arap Yarımadası'ndaki hâkimiyet. 1916 Şerif Hüseyin isyanı ve ikmal sorunu belirleyici oldu; Medine savaş sonrasına kadar savunuldu." },
  { name: "Galiçya", at: FP(24, 49.8), g: 2, what: "Avusturya-Macaristan'a destek için gönderilen kolordu; Osmanlı sınırlarının dışında." },
  { name: "Makedonya", at: FP(22.94, 40.64), g: 2, what: "Bulgaristan'a destek; Selanik çevresindeki İtilaf cephesine karşı." },
  { name: "Romanya", at: FP(26.1, 44.43), g: 2, what: "Romanya 1916'da İtilaf yanında savaşa girince İttifak harekâtına destek." },
];
const frontsMap: FigureDef = {
  caption:
    "Cepheleri adından önce amacına göre grupla: sınır ve savunma, Boğaz ve başkent, müttefike destek, imparatorluk çevresi. Şematik harita: konumlar yaklaşık, ölçekli değil, sınır çizilmedi. Bir numaraya tıkla; anahtar her cephenin grubunu yazar.",
  alt: "Sekiz numaralı halka: kuzeybatıda Galiçya, Romanya, Makedonya ve Çanakkale; doğuda Kafkas; güneydoğuda Irak; güneyde Suriye ve Filistin, Hicaz ve Yemen. Halkalar seçilebilir.",
  picks: FRONTS.map((f) => ({ label: f.name, title: `${f.name} · ${GROUPS[f.g].word}`, detail: [f.what] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [txt(v(-0.4, 7.4), " ", "c"), txt(v(10.4, -0.4), " ", "c")];
    FRONTS.forEach((f, i) => els.push(...token(f.at, String(i + 1), GROUPS[f.g].tone, { sel: pick === i, pick: i })));
    const legend: Legend = FRONTS.map((f, i) => ({ code: String(i + 1), label: `${f.name}: ${GROUPS[f.g].word}`, tone: GROUPS[f.g].tone }));
    const sel = pick >= 0 ? FRONTS[pick] : undefined;
    return {
      els,
      legend,
      readout: [sel ? `${sel.name} (${GROUPS[sel.g].word}): ${sel.what}` : "Bir numaraya tıkla ya da aşağıdan seç.", "Kafkas Cephesi Rusya'ya karşıdır; bir cepheyi rakibi ve amacıyla birlikte eşleştir."],
    };
  },
};

export const historyFigures068Sheets: Record<string, Record<string, FigureDef>> = {
  "dunya-gucu-osmanli": {
    "Fatih’ten II. Bayezid’e: kara, deniz ve iç istikrar": fatihBayezid,
    "Kanuni’nin doğu siyaseti: harekâttan Amasya’ya": eastFigure,
    "Hint Deniz Seferleri: hedefi ve erişilen sonucu ayrı oku": indianFigure,
    "1566–1595: büyük gücü sürdürmenin koşulları": lateFigure,
  },
  "devrimler-caginda-devlet-toplum": {
    "Milliyetçilik ve devrimlerin yayılması": nationFigure,
    "Sanayi Devrimi: üretim kadar çalışma ilişkisi": industryFigure,
    "Yurttaşlık: haklar ve yükümlülükler": citizenFigure,
    "Nizam-ı Cedit'ten 1826'ya ordu reformu": armyFigure,
  },
  "denge-stratejisi": {
    "1798 Mısır: aynı Rusya yeni ortak olabilir": egyptFigure,
    "1815 Viyana ve Şark Meselesi": powersFigure,
    "1853–1856 Kırım Savaşı ve Paris": crimeaFigure,
    "Değişen destekler ve 1914'e giden ortam": shiftFigure,
  },
  "yirminci-yuzyil-baslarinda-osmanli": {
    "Fikir akımları: birliği hangi temelde kuruyor?": ideasFigure,
    "1912–1913 Balkan savaşları: iki farklı çatışma": balkanFigure,
    "Kafkas ve Kanal: hedef ile gerçekleşen sonuç": frontsCompare,
    "Çanakkale, Irak ve güney cepheleri": frontsMap,
  },
};

/** Testler için: yıl satırı etiketlerinin sütuna sığdığını denetler. */
export const yearRowLabelsFit = () => [...FB, ...LATE].every((e) => tw(`${yt(e)} ${e.s}`) <= LW - 0.35);
