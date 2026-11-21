import { circle, fmt, poly, seg, txt, v, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { arrow, axes, box, curve, hi, pad, rect } from "./biologyFigures059Kit";

/*
 * AYT Biyoloji · Kas doku, üriner organlar, sindirim enzimleri ve hormonlar
 * (Forge059). Sarkomer modeli bölüm metnindendir: kalın filament 1,6 µm,
 * her ince filament 1,0 µm, sarkomer 2,0–3,2 µm; I toplamı L − 1,6 ve
 * H = en büyük(0, L − 2,0). Diğer şemalar nitel ve ölçekli değildir; kas
 * seğirme eğrisi biçim gösterir, ölçüm değildir.
 */

/* ---------------- Kas doku ---------------- */

const LADDER = [
  ["Kas (organ)", "bağ doku kılıfıyla sarılı"],
  ["Kas demeti", "lif grupları"],
  ["Kas lifi", "tek kas hücresi"],
  ["Miyofibril", "hücre içi düzenek"],
  ["Sarkomer", "Z ile Z arası birim"],
  ["Aktin, miyozin", "protein filamentleri"],
];
const ladder: FigureDef = {
  caption:
    "İskelet kasında ölçek basamakları (özgün şema, ölçekli değil): organ → demet → lif → miyofibril → sarkomer → filament. Lif burada tek bir kas hücresidir; aktin ve miyozin hücre değil, protein yapılı düzeneklerdir. Her basamak bir öncekinin içindedir.",
  alt: "Yukarıdan aşağı daralan altı kutu: kas, kas demeti, kas lifi, miyofibril, sarkomer, aktin ve miyozin. Her kutunun yanında kısa açıklama; kas lifi satırında tek kas hücresi yazıyor.",
  draw: () => {
    const els: El[] = [];
    LADDER.forEach(([n, d], i) => {
      const w = 4.4 - i * 0.3;
      const cell = i === 2;
      els.push(...box(0, -i * 1.0, w, 0.65, n, { bold: cell, tone: cell ? "a" : i === 5 ? "c" : "ink", fill: cell ? "a" : undefined }));
      els.push(txt(v(2.6, -i * 1.0), d, "e", { small: true, tone: cell ? "a" : "muted", bold: cell }));
    });
    els.push(...pad(v(-2.4, 0.6), v(6.8, -5.6)));
    return { els, readout: ["Lif = hücre; sarkomer = miyofibrildeki tekrar birimi; filament = protein.", "Şemadaki birkaç filament çizgisi hücrede yalnız o kadar filament olduğu anlamına gelmez."] };
  },
};

const THICK = 1.6;
const THIN = 1.0;
/** Sarkomer çizimi: Z çizgileri 0 ve L'de (µm, model). */
const sarcomere = (L: number, labels: boolean): El[] => {
  const S = 3; // çizim ölçeği: 1 µm = 3 birim
  const x = (u: number) => u * S;
  const c = L / 2;
  const els: El[] = [seg(v(x(0), -1.4), v(x(0), 1.4), { bold: true, tone: "ink" }), seg(v(x(L), -1.4), v(x(L), 1.4), { bold: true, tone: "ink" })];
  for (const y of [1.0, 0, -1.0]) {
    els.push(seg(v(x(0), y + 0.25), v(x(THIN), y + 0.25), { tone: "c" }), seg(v(x(L), y + 0.25), v(x(L - THIN), y + 0.25), { tone: "c" }));
    els.push(seg(v(x(0), y - 0.25), v(x(THIN), y - 0.25), { tone: "c" }), seg(v(x(L), y - 0.25), v(x(L - THIN), y - 0.25), { tone: "c" }));
  }
  for (const y of [1.0, 0, -1.0]) els.push(seg(v(x(c - THICK / 2), y), v(x(c + THICK / 2), y), { bold: true, tone: "warn" }));
  // Bant açıklıkları
  const yA = 2.0;
  const yI = -2.0;
  els.push(seg(v(x(c - THICK / 2), yA), v(x(c + THICK / 2), yA), { thin: true, tone: "warn" }), seg(v(x(c - THICK / 2), yA - 0.15), v(x(c - THICK / 2), yA + 0.15), { thin: true, tone: "warn" }), seg(v(x(c + THICK / 2), yA - 0.15), v(x(c + THICK / 2), yA + 0.15), { thin: true, tone: "warn" }));
  els.push(txt(v(x(c), yA + 0.25), labels ? "A bandı" : `A = ${fmt(THICK, 1)} µm`, "n", { small: true, bold: true, tone: "warn" }));
  const halfI = (L - THICK) / 2;
  if (halfI > 0.02) {
    els.push(seg(v(x(0), yI), v(x(halfI), yI), { thin: true, tone: "c" }), seg(v(x(L - halfI), yI), v(x(L), yI), { thin: true, tone: "c" }));
    els.push(txt(v(x(halfI / 2), yI - 0.2), "½ I", "s", { small: true, tone: "c" }), txt(v(x(L - halfI / 2), yI - 0.2), "½ I", "s", { small: true, tone: "c" }));
  }
  const H = Math.max(0, L - 2 * THIN);
  if (H > 0.02) els.push(seg(v(x(c - H / 2), -1.55), v(x(c + H / 2), -1.55), { thin: true, tone: "b" }), txt(v(x(c), -1.7), "H", "s", { small: true, bold: true, tone: "b" }));
  els.push(txt(v(x(0), 1.6), "Z", "n", { small: true, bold: true }), txt(v(x(L), 1.6), "Z", "n", { small: true, bold: true }));
  els.push(...pad(v(-1.4, 2.9), v(x(3.2) + 1.0, -2.9)));
  return els;
};
const sarcMap: FigureDef = {
  caption:
    "Sarkomer haritası (model: kalın filament 1,6 µm, ince filament 1,0 µm; ölçekli şema). İki Z çizgisi arası sarkomerdir. A bandı kalın filamentin bütün boyudur; H, A'nın ortasında yalnız kalın filament bulunan alt bölgedir; I yalnız ince filamentin bulunduğu alandır ve tek sarkomerde iki yarım I vardır.",
  alt: "İki dikey Z çizgisi arasında, her Z'den içe uzanan ince aktin çizgileri ve ortada kalın miyozin çizgileri. Üstte A bandı aralığı, ortanın altında H bölgesi, iki uçta yarım I bantları işaretli.",
  draw: () => ({ els: sarcomere(2.6, true), readout: ["Sarkomer 2,6 µm örneğinde: A 1,6; I toplamı 2,6 − 1,6 = 1,0; H = 2,6 − 2,0 = 0,6 µm.", "H, A'nın dışında ayrı bir toplam uzunluk değil, A'nın içindeki alt bölgedir."] }),
};
const sliding: FigureDef = {
  caption:
    "Kayan filament modeli: sürgü sarkomer boyunu (L) 2,0–3,2 µm arasında değiştirir. Filament boyları sabittir, dolayısıyla A = 1,6 µm değişmez; I toplamı = L − 1,6, H = en büyük(0, L − 2,0). Kısalmada I ve H daralır, L = 2,0'da H kaybolur. Bu aralık gerçek kuvvet-uzunluk eğrisinin tamamı değildir.",
  alt: "Sürgüyle boyu değişen sarkomer: Z çizgileri birbirine yaklaştıkça ince filamentler kalın filamentin üzerine kayar; A bandı aynı kalırken yarım I bantları ve H bölgesi daralır.",
  param: { label: "Sarkomer boyu", min: 2.0, max: 3.2, step: 0.1, init: 2.6, unit: " µm" },
  draw: (L) => ({
    els: sarcomere(L, false),
    readout: [`L = ${fmt(L, 1)} µm → I toplamı ${fmt(L - THICK, 1)} µm, H = ${fmt(Math.max(0, L - 2 * THIN), 1)} µm, A = 1,6 µm.`, "Filamentler kısalmaz; örtüşme değişir."],
  }),
};

const BRIDGE = [
  { name: "Ca²⁺ kilidi açar", text: "Ca²⁺ troponine bağlanır, tropomiyozin kayar; aktindeki bağlanma bölgeleri açılır.", angle: 60, bound: false },
  { name: "Baş aktine bağlanır", text: "ATP hidroliziyle enerji yüklenmiş miyozin başı aktine bağlanır.", angle: 60, bound: true },
  { name: "Kuvvet vuruşu", text: "Fosfatın ayrılmasıyla baş döner, ince filamenti merkeze çeker; ardından ADP ayrılır.", angle: 120, bound: true },
  { name: "Yeni ATP: ayrılma", text: "Yeni ATP'nin bağlanması başı aktinden ayırır; hidroliz başı yeni çevrime hazırlar.", angle: 120, bound: false },
];
const crossBridge: FigureDef = {
  caption:
    "Çapraz köprü döngüsü dört adımda (özgün şema, ölçekli değil). ATP'nin bağlanması ayrılmayı, ATP'nin hidrolizi başın hazırlanmasını sağlar; ikisi farklı olaydır. ATP yokluğunda bağlı köprülerin ayrılması bozulabilir: enerji azlığı kendiliğinden gevşeme getirmez.",
  alt: "Üstte yatay aktin filamenti ve üzerinde bağlanma bölgeleri, altta kalın miyozin filamenti ve ondan çıkan bir baş. Adımlarda baş açık bölgeye bağlanıyor, dönüp aktini sola çekiyor ve yeni ATP ile ayrılıyor.",
  steps: BRIDGE.map((b) => b.name),
  draw: (_v, step) => {
    const b = BRIDGE[step];
    const shift = step >= 2 ? -0.6 : 0;
    const open = step >= 0;
    const els: El[] = [seg(v(-3 + shift, 2), v(3 + shift, 2), { bold: true, tone: "c" }), seg(v(-3, -0.2), v(3, -0.2), { bold: true, tone: "warn" })];
    for (const xx of [-2, 0, 2]) els.push(circle(v(xx + shift, 2), 0.16, { tone: open ? "c" : "muted", fill: open ? "c" : undefined }));
    const base: V = v(0, -0.2);
    const r = b.bound ? 2.05 : 1.5;
    const tip: V = v(base[0] + r * Math.cos((b.angle * Math.PI) / 180), base[1] + r * Math.sin((b.angle * Math.PI) / 180));
    els.push(seg(base, tip, { bold: true, tone: b.bound ? "a" : "warn" }), circle(tip, 0.18, { tone: b.bound ? "a" : "warn", fill: b.bound ? "a" : "warn" }));
    els.push(txt(v(3.3 + shift, 2), "aktin", "e", { small: true, tone: "c" }), txt(v(3.3, -0.2), "miyozin", "e", { small: true, tone: "warn" }));
    if (step === 0) els.push(txt(v(-2.2, 2.4), "Ca²⁺", "n", { small: true, bold: true, tone: "a" }));
    if (step === 2) els.push(arrow(v(1.6, 2.6), v(0.2, 2.6), "a", { bold: true }), txt(v(1.7, 2.6), "çekilir", "e", { small: true, tone: "a" }));
    if (step === 3) els.push(txt(v(-1.2, 0.7), "ATP", "w", { small: true, bold: true, tone: "a" }));
    els.push(...pad(v(-3.8, 3.2), v(5.8, -0.8)));
    return { els, readout: [`${step + 1}. ${b.text}`, "Bütün başların aynı anda aynı evrede olması gerekmez."] };
  },
};

const twitch: FigureDef = {
  caption:
    "Mekanik kuvvet kaydı (nitel grafik, ölçekli değil). Tek uyarıda gizli evre, kasılma ve gevşeme ayrılır. Uyarılar lif tam gevşemeden yinelenirse yanıtlar toplanır; yüksek frekansta tetanik kuvvet görülebilir. Bu grafik aksiyon potansiyelinin elektrik kaydı değildir.",
  alt: "Zaman ekseninde kuvvet eğrisi. Birinci adımda tek bir seğirme tepesi; uyarı anı, gizli evre, kasılma ve gevşeme işaretli. İkinci adımda sık uyarılarla tepeler üst üste binip daha yüksek bir düzlüğe ulaşıyor.",
  steps: ["Tek seğirme", "Sık uyarı: toplanma"],
  draw: (_v, step) => {
    const tw = (t: number) => (t <= 0.9 ? 0 : 1.6 * ((t - 0.9) / 1.2) * Math.exp(1 - (t - 0.9) / 1.2));
    const els: El[] = [...axes(8.4, 3.6, "zaman", "kuvvet")];
    if (step === 0) {
      els.push(curve(tw, 0, 8, 80, { tone: "b", bold: true }));
      els.push(seg(v(0.5, -0.1), v(0.5, -0.45), { tone: "a", bold: true }), txt(v(0.5, -0.5), "uyarı", "s", { small: true, tone: "a" }));
      els.push(txt(v(0.7, 0.3), "gizli", "n", { small: true, tone: "muted" }), txt(v(1.2, 2.2), "kasılma", "c", { small: true, tone: "b" }), txt(v(4.0, 1.5), "gevşeme", "e", { small: true, tone: "b" }));
    } else {
      const sum = (t: number) => {
        let s = 0;
        for (let k = 0; k < 8; k++) s += tw(t - k * 0.55) * 0.55;
        return Math.min(3.0, s);
      };
      els.push(curve(tw, 0, 8, 80, { tone: "muted", dash: true }), curve(sum, 0, 8, 160, { tone: "a", bold: true }));
      for (let k = 0; k < 8; k++) els.push(seg(v(0.5 + k * 0.55, -0.1), v(0.5 + k * 0.55, -0.35), { tone: "a" }));
      els.push(txt(v(6.2, 3.2), "toplanmış kuvvet", "c", { small: true, bold: true, tone: "a" }), txt(v(4.6, 0.65), "tek seğirme", "e", { small: true, tone: "muted" }));
    }
    els.push(...pad(v(-0.6, 3.9), v(8.8, -0.9)));
    return { els, readout: [step ? "Tam gevşeme olmadan gelen uyarılar mekanik yanıtları toplar." : "Gizli evre → kasılma → gevşeme: elektriksel ve mekanik kayıtlar aynı nicelik değildir.", "Bütün kasın kuvveti motor birim sayısı ve uyarı sıklığıyla derecelenir."] };
  },
};

/* ---------------- Üriner organlar ---------------- */

const wastes: FigureDef = {
  caption:
    "Azotlu atıkların kaynakları farklıdır (özgün şema, ölçekli değil): amino asitlerin amino grubundan gelen amonyak karaciğerin üre döngüsünde üreye dönüşür; ürik asit pürinlerin, kreatinin kas kreatin metabolizmasının ürünüdür. Üçü kanla böbreğe taşınır; tek çizgi kurma.",
  alt: "Üç kaynak satırı: amino asit, amonyak, karaciğerde üre döngüsü, üre; pürinler, ürik asit; kas kreatini, kreatinin. Üç satırın sonu kan yoluyla böbrek kutusunda birleşiyor.",
  draw: () => {
    const rows: [string, string, string][] = [["Amino asit", "Amonyak", "Üre"], ["Pürinler", "", "Ürik asit"], ["Kas kreatini", "", "Kreatinin"]];
    const els: El[] = [];
    rows.forEach(([a, b, c], i) => {
      const y = -i * 1.3;
      els.push(...box(-0.2, y, 3.0, 0.7, a));
      if (b) els.push(...box(3.3, y, 2.4, 0.7, b), arrow(v(1.3, y), v(2.1, y)), arrow(v(4.5, y), v(5.4, y), "c"), txt(v(4.95, y + 0.4), "üre döngüsü", "n", { small: true, tone: "c" }));
      else els.push(arrow(v(1.3, y), v(5.4, y)));
      els.push(...box(6.6, y, 2.6, 0.7, c, { tone: "b", fill: "b", bold: true }));
      els.push(seg(v(7.8, y), v(8.6, y), { tone: "muted" }));
    });
    els.push(seg(v(8.6, 0), v(8.6, -2.6), { tone: "muted" }), arrow(v(8.6, -1.3), v(9.4, -1.3), "muted"), ...box(10.5, -1.3, 2.0, 0.8, "Böbrek", { bold: true }));
    els.push(txt(v(8.8, -2.75), "kan", "e", { small: true, tone: "muted" }), ...pad(v(-1.5, 1.1), v(11.7, -3.1)));
    return { els, readout: ["Amonyağın üreye dönüşümü toksik yükü azaltır ama enerji gerektirir.", "Proteinlerin bütünü süzgeçten atılan atık değildir."] };
  },
};

const KID = [
  { label: "Korteks", title: "Korteks", detail: ["Böbrek kesitinin dış kısmıdır.", "Glomerulus ve Bowman kapsülü burada bulunur.", "Pelvisin iç boşluğuyla aynı yapı değildir."] },
  { label: "Medulla", title: "Medulla ve piramitler", detail: ["İç kısımdır; piramitlerin uçları papilla bölgesidir.", "Nefron tüp kollarının bir bölümü medullaya uzanır.", "Bütün nefron tek noktada duran bir kese değildir."] },
  { label: "Kaliks", title: "Küçük ve büyük kaliksler", detail: ["Papilladan gelen idrar önce küçük, sonra büyük kalikslere dökülür.", "Toplayıcı yolun başlangıcıdır.", "Kan damarı değildir."] },
  { label: "Pelvis", title: "Böbrek pelvisi", detail: ["Kalikslerin birleştiği toplayıcı boşluktur.", "Üretere devam eder.", "Korteks dokusuyla tek havuz değildir."] },
  { label: "Üreter", title: "Üreter", detail: ["İdrarı pelvisten mesaneye iletir.", "Peristaltik hareketle taşır.", "Kan damarı değildir."] },
];
const kidneySection: FigureDef = {
  caption:
    "Böbrek kesiti (özgün şema, ölçekli değil): dışta korteks, içte piramitli medulla; papilladan çıkan idrar kalikslere, pelvise ve üretere geçer. Bir bölgenin adına tıkla: görevi ve sık karışan noktası açılır.",
  alt: "Fasulye biçimli böbrek kesiti. Dış bantta korteks, içinde üç üçgen piramit (medulla), piramit uçlarında kaliksler, ortada pelvis ve pelvisten aşağı uzanan üreter.",
  picks: KID,
  draw: (_v, _s, pick = -1) => {
    const bean: V[] = [v(-1.5, 2.6), v(-2.7, 1.6), v(-3.0, 0), v(-2.7, -1.6), v(-1.5, -2.6), v(0, -2.4), v(0.6, -1.2), v(0.4, 0), v(0.6, 1.2), v(0, 2.4)];
    const inner: V[] = bean.map((p) => v(p[0] * 0.78 - 0.1, p[1] * 0.78));
    const els: El[] = [
      poly(bean, { tone: hi(pick === 0, "ink"), fill: hi(pick === 0, "b"), smooth: true, bold: pick === 0 }),
      poly(inner, { tone: "muted", thin: true, smooth: true, dash: true }),
    ];
    const pyr: [V, V, V][] = [[v(-2.1, 1.6), v(-1.3, 2.0), v(-0.8, 1.0)], [v(-2.4, 0.4), v(-2.4, -0.4), v(-1.0, 0)], [v(-2.1, -1.6), v(-1.3, -2.0), v(-0.8, -1.0)]];
    for (const t of pyr) els.push(poly(t, { tone: hi(pick === 1, "c"), fill: hi(pick === 1, "c") }));
    for (const p of [v(-0.65, 0.9), v(-0.85, 0), v(-0.65, -0.9)]) els.push(circle(p, 0.2, { tone: hi(pick === 2, "warn"), fill: hi(pick === 2, "warn") }));
    els.push(poly([v(-0.5, 1.0), v(0.1, 0.3), v(0.1, -0.3), v(-0.5, -1.0), v(-0.35, 0)], { tone: hi(pick === 3, "warn"), fill: hi(pick === 3, "warn"), smooth: true }));
    els.push(poly([v(0.1, -0.2), v(0.9, -0.8), v(1.1, -2.2), v(1.2, -3.2)], { open: true, smooth: true, bold: true, tone: hi(pick === 4, "warn") }));
    els.push(
      txt(v(-3.2, 2.0), "Korteks", "w", { small: true, bold: pick === 0, tone: hi(pick === 0, "ink"), pick: 0 }),
      txt(v(-3.3, -0.2), "Medulla", "w", { small: true, bold: pick === 1, tone: hi(pick === 1, "c"), pick: 1 }),
      txt(v(1.0, 1.4), "Kaliks", "e", { small: true, bold: pick === 2, tone: hi(pick === 2, "warn"), pick: 2 }),
      txt(v(1.0, 0.2), "Pelvis", "e", { small: true, bold: pick === 3, tone: hi(pick === 3, "warn"), pick: 3 }),
      txt(v(1.4, -2.6), "Üreter", "e", { small: true, bold: pick === 4, tone: hi(pick === 4, "warn"), pick: 4 }),
      seg(v(0.9, 1.3), v(-0.5, 0.95), { thin: true, tone: "muted" }),
      seg(v(0.9, 0.2), v(0.05, 0.05), { thin: true, tone: "muted" }),
      ...pad(v(-5.0, 3.0), v(3.4, -3.5)),
    );
    return { els, readout: [pick >= 0 ? KID[pick].detail[0] : "Bir bölgeye tıkla ya da aşağıdan seç.", "Yol: toplama kanalı → papilla → kaliksler → pelvis → üreter."] };
  },
};

const BLOOD = ["Böbrek atardamarı", "Afferent arteriyol", "Glomerulus", "Efferent arteriyol", "Kılcal ağ", "Böbrek toplardamarı"];
const URINE = ["Bowman aralığı", "Nefron tüpü", "Toplama kanalı", "Kaliks, pelvis", "Üreter", "Mesane → üretra"];
const twoPaths: FigureDef = {
  caption:
    "Kan yolu ve idrar yolu iki ayrı hattır (özgün şema, ölçekli değil). Glomerulusta kanın su ve bazı küçük maddeleri seçici bariyerden Bowman aralığına süzülür; kan hücrelerinin çoğu damarda kalır ve kan toplardamarla döner. Üreter kan damarı değildir.",
  alt: "İki sütun. Solda kan yolu: böbrek atardamarı, afferent arteriyol, glomerulus, efferent arteriyol, kılcal ağ, böbrek toplardamarı. Sağda idrar yolu: Bowman aralığı, nefron tüpü, toplama kanalı, kaliks ve pelvis, üreter, mesane ve üretra. Glomerulustan Bowman aralığına süzülme oku.",
  steps: ["Kan yolu", "İdrar yolu"],
  draw: (_v, step) => {
    const els: El[] = [];
    BLOOD.forEach((n, i) => {
      const on = step === 0;
      els.push(...box(0, -i * 1.0, 4.0, 0.62, n, { tone: on ? "warn" : "muted", text: on ? "ink" : "muted", bold: i === 2 }));
      if (i < 5) els.push(arrow(v(0, -i * 1.0 - 0.32), v(0, -i * 1.0 - 0.68), on ? "warn" : "muted"));
    });
    URINE.forEach((n, i) => {
      const on = step === 1;
      els.push(...box(5.6, -(i + 2) * 1.0, 3.6, 0.62, n, { tone: on ? "c" : "muted", text: on ? "ink" : "muted", bold: i === 0 }));
      if (i < 5) els.push(arrow(v(5.6, -(i + 2) * 1.0 - 0.32), v(5.6, -(i + 2) * 1.0 - 0.68), on ? "c" : "muted"));
    });
    els.push(arrow(v(2.05, -2.0), v(3.75, -2.0), "a", { bold: true }), txt(v(2.9, -1.75), "süzülme", "n", { small: true, bold: true, tone: "a" }));
    els.push(...pad(v(-2.2, 0.5), v(7.6, -7.5)));
    return { els, readout: [step ? "İdrar yolu: Bowman aralığından mesaneye ve dışarıya." : "Kan yolu: atardamardan glomerulusa, oradan toplardamarla dolaşıma geri.", "Bütün kan Bowman aralığına dökülmez; sağlıklı bariyerde kan hücreleri damarda kalır."] };
  },
};

const bladderModel: FigureDef = {
  caption:
    "Stok ve akış modeli (nitel şema, sayı verilmedi): her böbrek sabit hızla idrar üretir, açık üreter mesaneye teslim eder, kapalı üreterin teslimi sıfırdır. Son mesane = başlangıç + teslimler − gerçek çıkış; gerçek çıkış, çıkış kapasitesi ile mevcut sıvının küçüğüdür. Engelin yukarısındaki birikim ayrıca izlenir.",
  alt: "Üstte iki böbrek kutusu, ikisinden aşağı üreterler, altta mesane deposu ve üretradan çıkış oku. İkinci adımda sağdaki üreter çarpıyla kapalı ve onun üstünde birikim yazıyor.",
  steps: ["İki üreter açık", "Bir üreter kapalı"],
  draw: (_v, step) => {
    const closed = step === 1;
    const els: El[] = [
      ...box(0, 2.4, 2.4, 0.8, "Böbrek 1"),
      ...box(4, 2.4, 2.4, 0.8, "Böbrek 2", { tone: closed ? "warn" : "ink" }),
      arrow(v(0, 2.0), v(1.6, 0.55), "c", { bold: true }),
      arrow(v(4, 2.0), v(2.4, 0.55), closed ? "muted" : "c", { bold: !closed, dash: closed }),
      ...box(2, 0, 2.6, 1.0, "Mesane (stok)", { tone: "b", fill: "b", bold: true }),
      arrow(v(2, -0.5), v(2, -1.5), "a", { bold: true }),
      txt(v(2.2, -1.1), "çıkış ≤ kapasite", "e", { small: true, tone: "a" }),
      txt(v(-0.2, 1.3), "teslim", "w", { small: true, tone: "c" }),
    ];
    if (closed) els.push(seg(v(2.9, 1.5), v(3.5, 1.0), { tone: "warn", bold: true }), seg(v(2.9, 1.0), v(3.5, 1.5), { tone: "warn", bold: true }), txt(v(5.4, 2.4), "birikim", "e", { small: true, bold: true, tone: "warn" }));
    els.push(...pad(v(-1.4, 3.0), v(6.8, -1.9)));
    return { els, readout: [closed ? "Kapalı üreterin teslimi 0; o böbreğin ürettiği sıvı engelin yukarısında birikir." : "İki açık teslim mesaneye eklenir.", "Son mesane = başlangıç + teslimler − gerçek çıkış."] };
  },
};

/* ---------------- Sindirim enzimleri ve hormonlar ---------------- */

const carbs: FigureDef = {
  caption:
    "Karbonhidrat zinciri (özgün şema, ölçekli değil): tükürük amilazı ağızda başlatır, pankreas amilazı ince bağırsakta sürdürür; fırçamsı kenarda maltaz, sükraz ve laktaz disakkaritleri monosakkaritlere ayırır. Her hidrolizde su kullanılır. İnsan amilazı selülozu parçalayamaz.",
  alt: "Solda nişasta, amilazla maltoza, maltazla glikoza oklar. Altında sükroz sükrazla glikoz ve fruktoza, laktoz laktazla glikoz ve galaktoza. En altta selüloz, amilaz okunun üstünde çarpı.",
  draw: () => {
    const els: El[] = [];
    const row = (y: number, a: string, enz: string, b: string, tone: Tone = "ink") => {
      els.push(...box(0, y, 2.4, 0.65, a), arrow(v(1.2, y), v(3.5, y), tone === "ink" ? "c" : tone), txt(v(2.3, y + 0.35), enz, "n", { small: true, tone: tone === "ink" ? "c" : tone }), ...box(5.4, y, 3.7, 0.65, b, { tone: "b", fill: "b" }));
    };
    els.push(...box(0, 2.4, 2.4, 0.65, "Nişasta"), arrow(v(1.2, 2.4), v(3.4, 2.4), "c"), txt(v(2.3, 2.75), "amilaz", "n", { small: true, tone: "c" }), ...box(4.8, 2.4, 2.8, 0.65, "Maltoz"));
    els.push(arrow(v(6.2, 2.4), v(7.6, 2.4), "c"), txt(v(6.9, 2.75), "maltaz", "n", { small: true, tone: "c" }), ...box(8.9, 2.4, 2.4, 0.65, "Glikoz", { tone: "b", fill: "b" }));
    row(1.0, "Sükroz", "sükraz", "Glikoz + fruktoz");
    row(-0.4, "Laktoz", "laktaz", "Glikoz + galaktoz");
    els.push(...box(0, -1.8, 2.4, 0.65, "Selüloz", { tone: "muted", text: "muted" }), arrow(v(1.2, -1.8), v(3.4, -1.8), "muted", { dash: true }), seg(v(2.0, -1.5), v(2.6, -2.1), { tone: "warn", bold: true }), seg(v(2.0, -2.1), v(2.6, -1.5), { tone: "warn", bold: true }), txt(v(3.6, -1.8), "insan amilazı kesemez", "e", { small: true, tone: "warn" }));
    els.push(txt(v(2.3, 3.4), "ağız → ince bağırsak", "n", { small: true, tone: "muted" }), ...pad(v(-1.4, 3.9), v(10.3, -2.4)));
    return { els, readout: ["Sükroz → glikoz + fruktoz; laktoz → glikoz + galaktoz.", "Enzim ürünü oluşturur; glikozun zardan taşınması sonraki, ayrı olaydır."] };
  },
};

const proteins: FigureDef = {
  caption:
    "Protein sindirimi midede başlar, ince bağırsakta sürer (özgün şema, ölçekli değil). Pepsin proteinleri peptitlere ayırır; tripsin ve kimotripsin iç bağları, karboksipeptidaz uçtaki amino asidi keser; fırçamsı kenar ve hücre içi peptidazlar son ürünlere ulaştırır. Asitle denatürasyon enzimli hidroliz değildir.",
  alt: "Yukarıdan aşağı dört basamak: protein, mide pepsiniyle peptitler, pankreas proteazlarıyla küçük peptitler, fırçamsı kenar peptidazlarıyla amino asitler. Her okun yanında enzim ve yer adı.",
  draw: () => {
    const S = ["Protein", "Peptitler", "Küçük peptitler", "Amino asitler"];
    const E = ["pepsin · mide", "pankreas proteazları", "peptidazlar · fırçamsı kenar"];
    const els: El[] = [];
    S.forEach((s, i) => {
      els.push(...box(0, -i * 1.5, 3.0, 0.65, s, { bold: i === 3, tone: i === 3 ? "b" : "ink", fill: i === 3 ? "b" : undefined }));
      if (i < 3) els.push(arrow(v(0, -i * 1.5 - 0.34), v(0, -i * 1.5 - 1.16), "c"), txt(v(0.3, -i * 1.5 - 0.75), E[i], "e", { small: true, tone: "c" }));
    });
    els.push(...pad(v(-1.8, 0.6), v(6.4, -5.0)));
    return { els, readout: ["Mide: pepsin; ince bağırsak: pankreas proteazları ve fırçamsı kenar peptidazları.", "Karboksipeptidaz pankreas kökenlidir; aminopeptidaz bağırsak örneğidir."] };
  },
};

const zymogens: FigureDef = {
  caption:
    "Zimojen etkinleşme ağı (özgün şema, ölçekli değil): duodenum fırçamsı kenarındaki enteropeptidaz (enterokinaz) tripsinojeni tripsine çevirir; tripsin başka tripsinojenleri, kimotripsinojeni ve prokarboksipeptidazı etkinleştirir. Başlangıç enzimi yoksa alt basamaklar da etkilenir. Amilaz, lipaz ve nükleaz bu proteaz öncülleri değildir.",
  alt: "Üstte enteropeptidaz kutusu, okla tripsinojenden tripsine. Tripsinden üç ok: tripsinojen, kimotripsinojen ve prokarboksipeptidaz etkin biçimlerine. İkinci adımda enteropeptidaz yok, bütün aşağı oklar soluk.",
  steps: ["Ağ çalışıyor", "Enteropeptidaz yok"],
  draw: (_v, step) => {
    const off = step === 1;
    const t: Tone = off ? "muted" : "c";
    const els: El[] = [
      ...box(0, 2.4, 3.2, 0.7, "Enteropeptidaz", { tone: off ? "warn" : "b", fill: off ? undefined : "b", dash: off, bold: true }),
      ...box(0, 0.8, 3.2, 0.7, "Tripsinojen → tripsin", { tone: t, text: off ? "muted" : "ink" }),
      arrow(v(0, 2.03), v(0, 1.17), t, { bold: !off, dash: off }),
    ];
    ["tripsinojen", "kimotripsinojen", "prokarboksipeptidaz"].forEach((n, k) => {
      const y = 1.6 - k * 0.95;
      els.push(...box(5.4, y, 3.6, 0.7, n, { tone: t, text: off ? "muted" : "ink" }), arrow(v(1.6, 0.8), v(3.55, y), t, { dash: off }));
    });
    els.push(txt(v(0, -0.6), "amilaz, lipaz, nükleaz:", "c", { small: true, tone: "muted" }), txt(v(0, -1.1), "bu ağın öncülü değil", "c", { small: true, tone: "muted" }));
    if (off) els.push(txt(v(1.8, 2.4), "seçici yokluk", "e", { small: true, bold: true, tone: "warn" }));
    els.push(...pad(v(-1.8, 3.0), v(7.3, -1.5)));
    return { els, readout: [off ? "Başlatıcı yoksa tripsin oluşmaz; bağlı proteaz öncülleri de etkinleşemez." : "Enteropeptidaz başlatır, tripsin ağı çoğaltır.", "Öncül salgılanması etkin proteazın kendi hücresine zarar vermesini azaltır."] };
  },
};

const HORM = [
  { name: "Gastrin", trig: "protein parçaları, sinir", src: "Mide G hücresi", tgt: "Mide", resp: "salgı ve hareket ↑" },
  { name: "Sekretin", trig: "duodenumda asit", src: "Duodenum", tgt: "Pankreas kanalları", resp: "bikarbonatlı salgı ↑" },
  { name: "CCK", trig: "yağ ve protein ürünleri", src: "Duodenum", tgt: "Pankreas, safra kesesi", resp: "enzim salgısı, kese kasılır" },
];
const hormoneFig = (i: number, caption: string): FigureDef => ({
  caption,
  alt: `${HORM[i].name} yolu yukarıdan aşağı: uyaran, salgılayan hücre, hormonun kana geçişi, hedef organ ve yanıt kutuları.`,
  draw: () => {
    const h = HORM[i];
    const rows: [string, Tone | undefined, boolean][] = [[h.trig, undefined, false], [h.src, undefined, true], [`${h.name} → kan`, "a", true], [h.tgt, undefined, true], [h.resp, "c", false]];
    const els: El[] = [];
    rows.forEach(([l, f, b], k) => {
      els.push(...box(0, -k * 1.1, 4.4, 0.65, l, { tone: f ?? (k === 0 ? "muted" : "ink"), fill: f, bold: b }));
      if (k < 4) els.push(arrow(v(0, -k * 1.1 - 0.34), v(0, -k * 1.1 - 0.76), k === 1 || k === 2 ? "a" : "ink", { bold: k === 1 || k === 2 }));
    });
    els.push(txt(v(2.4, 0), "uyaran", "e", { small: true, tone: "muted" }), txt(v(2.4, -2.2), "kanla taşınır", "e", { small: true, tone: "a" }), txt(v(2.4, -4.4), "yanıt", "e", { small: true, tone: "c" }));
    els.push(...pad(v(-2.4, 0.5), v(5.2, -4.9)));
    return { els, readout: [`${h.trig} → ${h.src} → ${h.name} kanla → ${h.tgt}: ${h.resp}.`, "Hormon kana gider, salgı kanalla lümene; hormon kendisi enzim gibi kesmez."] };
  },
});
const gastrin = hormoneFig(0, "Gastrin yolu (özgün şema, ölçekli değil): mide G hücreleri protein parçaları ve sinirsel girdilerle gastrin salgılar; gastrin kana katılır ve mide salgısı ile hareketinin düzenlenmesine katkı verir. Pepsin gibi lümende protein kesen bir enzim değildir; çok asitli koşulda geri denetim vardır.");
const secretin = hormoneFig(1, "Sekretin yolu (özgün şema, ölçekli değil): duodenuma gelen asit sekretin salımını uyarır; sekretin kanla pankreasa gider ve sulu, bikarbonatça zengin salgıyı destekler. Bikarbonatlı salgı kanalla lümene gider ve asidik kimusu nötralleştirir. Sekretin asidi kendisi parçalamaz.");
const cck = hormoneFig(2, "CCK yolu (özgün şema, ölçekli değil): yağ ve protein sindirim ürünleri duodenumda CCK yanıtını destekler; CCK kanla pankreasa ve safra kesesine gider: enzimce zengin salgı ve kese kasılması. CCK safra üretmez; depolanmış safranın akışını destekler.");

export const biologyFigures059Body: Record<string, Record<string, FigureDef>> = {
  "kas-doku": {
    "Organ, demet, hücre ve molekülü aynı çizgi sanma": ladder,
    "Sarkomer haritası: Z, A, I ve H": sarcMap,
    "Kayan filamentte ne değişir, ne sabit kalır?": sliding,
    "Kalsiyum kilidi ve çapraz köprü döngüsü": crossBridge,
    "Tek seğirme, frekans ve motor birim katılımı": twitch,
  },
  "uriner-organlar": {
    "Azotlu atığın kaynağını izle": wastes,
    "Kesitte korteks, medulla ve toplayıcı yol": kidneySection,
    "Kan yolu ile idrar yolu farklıdır": twoPaths,
    "Depo bilançosunda miktarı koru": bladderModel,
  },
  "sindirim-enzimler-hormonlar": {
    "Ağızdan başlayan karbonhidrat zinciri": carbs,
    "Protein sindirimi midede başlar, bağırsakta sürer": proteins,
    "Zimojenler için bir etkinleşme ağı kur": zymogens,
    "Gastrin: mideden kana, hedefte yanıta": gastrin,
    "Sekretin: asit girdisinden bikarbonat desteğine": secretin,
    "CCK: besin içeriğinden enzim ve safra yanıtına": cck,
  },
};
