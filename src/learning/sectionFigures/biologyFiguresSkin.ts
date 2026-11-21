import { ball, circle, poly, seg, txt, v, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Skin, schematic (not to scale): three bands — epidermis (avascular, keratin
 * on top, dividing cells at the base), dermis (connective tissue with vessels,
 * nerves, glands, follicles), deri altı (fat). Every structure name opens a card
 * with its role and the usual confusion. Receptor roles follow the current MEBİ
 * AYT table (Meissner, Merkel, Pacini, Ruffini, serbest sinir uçları, kıl kökü).
 */

const Q = 1.6;
const q = (x: number, y: number) => v(x * Q, y * Q);
type Part = { name: string; at: V; y: number; what: string; trap: string };
const EPI_TOP = 6;
const EPI_BOT = 5.1;
const DER_BOT = 2.0;
const SUB_BOT = 0.4;
const PARTS: Part[] = [
  { name: "Keratinli yüzey", at: q(1.2, 5.95), y: 6.9, what: "Epidermisin dış tabakası: keratinleşmiş hücreler su kaybına ve dış etkenlere karşı bariyer kurar.", trap: "Bütün epidermis ölü değildir; tabanındaki hücreler canlı ve bölünür." },
  { name: "Epidermis tabanı", at: q(1.6, 5.15), y: 6.1, what: "Bölünen canlı hücreler; damar yoktur, besin ve O₂ alttaki dermisten difüzyonla gelir.", trap: "Damarsız olmak sinirsiz ya da cansız olmak demek değildir." },
  { name: "Melanosit", at: q(3.4, 5.2), y: 5.3, what: "Melanin pigmenti üretir; renk ve UV'ye karşı korunmaya katkı verir.", trap: "Melanin keratin değildir; UV hasarını kesin engelleyen tam kalkan da değildir." },
  { name: "Ter bezi (ekrin)", at: q(5.6, 2.6), y: 4.5, what: "Salgı bölümü dermiste derinde; kanalı doğrudan deri yüzeyine açılır. Buharlaşan ter ısı çeker.", trap: "Kanal ağzı yüzeyde diye bezin tamamı epidermiste değildir; ter ancak buharlaşırsa soğutur." },
  { name: "Kıl folikülü", at: q(2.4, 3.0), y: 3.7, what: "Dermise gömülü kıl kökü; çevresindeki sinir uçları kılın hareketini algılar.", trap: "Kılın kendisi nöron değildir." },
  { name: "Yağ bezi", at: q(2.95, 3.8), y: 2.9, what: "Sebum üretir; çoğunlukla kıl folikülüne açılır.", trap: "Ter bezi değildir; apokrin ter bezi de çoğunlukla foliküle açılır, ekrin açılmaz." },
  { name: "Kan damarı", at: q(4.2, 3.4), y: 2.1, what: "Dermiste bulunur; genişleyince yüzeye ısı aktarımı artar, daralınca ısı korunur.", trap: "Epidermiste damar yoktur: yüzeysel çizikte kan çıkmayabilir." },
  { name: "Serbest sinir ucu", at: q(6.6, 5.4), y: 1.3, what: "Ağrı, sıcaklık ve bazı dokunma uyarılarını alır; epidermise uzanabilir.", trap: "Uyarının alınması ile ağrının bilinçli yaşanması ayrı basamaklardır." },
  { name: "Meissner", at: q(7.5, 4.9), y: 0.5, what: "Dermis tepesinde; hafif dokunmanın başlangıcı ve düşük frekanslı titreşim.", trap: "Süren baskıyı Merkel, derin titreşimi Pacini alır." },
  { name: "Pacini", at: q(6.8, 0.9), y: -0.3, what: "Deri altında derin; basınç değişimi ve hızlı titreşim.", trap: "Sıcaklık alıcısı değildir." },
];

const section: FigureDef = {
  caption:
    "Şematik deri kesiti (ölçekli değil): üstte damarsız epidermis, ortada damarlı ve sinirli dermis, altta yağlı deri altı. Bir yapının adına tıkla: görevi ve sık karıştırılan noktası açılır.",
  alt: "Üç yatay bant: epidermis, dermis, deri altı. Dermiste kıvrımlı ter bezi ve yüzeye açılan kanalı, kıl folikülü ve yağ bezi, kan damarı, sinir uçları; deri altında soğan kesitli Pacini. Sağda yapı adları çizgilerle bağlı.",
  picks: PARTS.map((p) => ({ label: p.name, title: p.name, detail: [p.what, `Karıştırma: ${p.trap}`] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const W = 8;
    const band = (y0: number, y1: number, tone: Tone, name: string) => {
      els.push(poly([q(0, y0), q(W, y0), q(W, y1), q(0, y1)], { tone, fill: tone, thin: true }));
      els.push(txt(q(-0.15, (y0 + y1) / 2), name, "w", { small: true, bold: true, tone }));
    };
    band(EPI_BOT, EPI_TOP, "warn", "epidermis");
    band(DER_BOT, EPI_BOT, "c", "dermis");
    band(SUB_BOT, DER_BOT, "b", "deri altı");
    els.push(seg(q(0, EPI_TOP - 0.15), q(W, EPI_TOP - 0.15), { tone: "warn", thin: true }));
    // Sweat gland: coil deep in dermis, duct to surface.
    const on = (i: number) => pick === i;
    const t = (i: number, base: Tone): Tone => (on(i) ? "a" : base);
    els.push(circle(q(5.6, 2.6), 0.35 * Q, { tone: t(3, "ink"), thin: !on(3) }), poly([q(5.6, 2.95), q(5.75, 3.6), q(5.5, 4.3), q(5.7, 5.0), q(5.6, EPI_TOP)], { tone: t(3, "ink"), open: true, smooth: true, thin: !on(3) }));
    // Hair follicle with hair and sebaceous gland.
    els.push(poly([q(2.2, 2.7), q(2.6, 2.7), q(2.75, EPI_TOP), q(2.45, EPI_TOP)], { tone: t(4, "ink"), thin: !on(4) }), seg(q(2.5, 3.0), q(2.4, EPI_TOP + 0.9), { tone: t(4, "ink") }));
    els.push(circle(q(2.95, 3.8), 0.25 * Q, { tone: t(5, "warn"), fill: t(5, "warn"), thin: true }));
    // Blood vessel loop.
    els.push(poly([q(3.6, 2.3), q(3.9, 3.9), q(4.5, 3.9), q(4.8, 2.3)], { tone: t(6, "warn"), open: true, smooth: true, bold: on(6) }));
    // Free nerve ending into epidermis, Meissner at dermal top, Pacini deep.
    els.push(poly([q(6.6, 2.2), q(6.6, 4.8), q(6.4, 5.5), q(6.6, 4.8), q(6.8, 5.5)], { tone: t(7, "ink"), open: true, thin: !on(7) }));
    els.push(ball(q(7.5, 4.85), 0.22, t(8, "b")));
    for (const r of [0.15, 0.3, 0.45]) els.push(circle(q(6.8, 0.95), r * Q, { tone: t(9, "b"), thin: true }));
    els.push(ball(q(3.4, 5.2), 0.1, t(2, "ink")));
    // Labels on the right with leaders.
    PARTS.forEach((p, i) => {
      els.push(seg(v(W * Q + 0.9, p.y * Q), p.at, { tone: on(i) ? "a" : "muted", thin: true, dash: !on(i) }));
      els.push(txt(v(W * Q + 1.0, p.y * Q), p.name, "e", { small: true, bold: on(i), tone: on(i) ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(-2.8, 7.4 * Q), " ", "c"), txt(v(W * Q + 5.2, -0.6 * Q), " ", "c"));
    const sel = pick >= 0 ? PARTS[pick] : undefined;
    return { els, readout: [sel ? `${sel.name}: ${sel.what}` : "Bir yapının adına tıkla ya da aşağıdan seç.", "Damar ve ter üreten bölüm dermiste; keratinli örtü epidermiste."] };
  },
};

type R = { name: string; tag: string; what: string; trap: string };
const RECEPTORS: R[] = [
  { name: "Meissner", tag: "dokunma başlangıcı", what: "Hafif dokunmanın başlangıcı, düşük frekanslı titreşim; parmak ucunda yoğun.", trap: "Nesne dururken süren baskıyı Merkel bildirir." },
  { name: "Merkel diski", tag: "süren hafif baskı", what: "Sürdürülen hafif baskı ve yüzey ayrıntısı.", trap: "Yalnız kıl hareketi değildir." },
  { name: "Pacini", tag: "derin basınç · hızlı titreşim", what: "Deri altında; basınç değişimi ve hızlı titreşim.", trap: "Sıcaklık alıcısı diye seçme." },
  { name: "Ruffini", tag: "deri gerilmesi", what: "Deri gerilmesi ve süren mekanik deformasyon (güncel MEBİ tablosu).", trap: "Eski OGM tablosunda sıcak ile eşlenir; soruda verilen tabloyu kullan." },
  { name: "Serbest sinir uçları", tag: "ağrı · sıcaklık", what: "Ağrı, sıcaklık ve bazı dokunma biçimleri; epidermise uzanabilir.", trap: "Her uç tek bir duyudan sorumlu değildir." },
  { name: "Kıl kökü uçları", tag: "kıl hareketi", what: "Kılın yer değiştirmesini algılayan sinir uçları.", trap: "Kılın kendisi alıcı nöron değildir." },
];
const receptors: FigureDef = {
  caption:
    "Uyarının niteliğine göre alıcı seç: basınç ve titreşim mekanoreseptör, sıcaklık termoreseptör, doku hasarı ağrı. Bir kutuya tıkla. Hepsi mekanoreseptör olsa da süre, frekans ve derinlik ayrıntısı farklıdır.",
  alt: "İki sütunlu altı kutu: Meissner, Merkel diski, Pacini, Ruffini, serbest sinir uçları, kıl kökü uçları; altlarında uyardıkları uyaran.",
  picks: RECEPTORS.map((r) => ({ label: r.name, title: `${r.name} · ${r.tag}`, detail: [r.what, `Karıştırma: ${r.trap}`] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const W = 4.6;
    const H = 1.65;
    RECEPTORS.forEach((r, i) => {
      const x = (i % 2) * (W + 0.3);
      const y = (2 - Math.floor(i / 2)) * (H + 0.3);
      const on = pick === i;
      const tone: Tone = on ? "a" : i < 4 ? "b" : "c";
      els.push(poly([v(x, y), v(x + W, y), v(x + W, y + H), v(x, y + H)], { tone, fill: tone, thin: !on }));
      els.push(txt(v(x + W / 2, y + H * 0.67), r.name, "c", { bold: true, pick: i }), txt(v(x + W / 2, y + H * 0.24), r.tag, "c", { small: true, tone: on ? "ink" : "muted" }));
    });
    els.push(txt(v(-0.2, 3 * (H + 0.3) + 0.1), " ", "c"), txt(v(2 * (W + 0.3), -0.3), " ", "c"));
    const sel = pick >= 0 ? RECEPTORS[pick] : undefined;
    return { els, readout: [sel ? `${sel.name}: ${sel.what}` : "Bir kutuya tıkla ya da aşağıdan seç.", "Alıcı uyarılsa da yol kesikse bilinçli algı oluşmayabilir; refleks yine olabilir."] };
  },
};

export const biologyFiguresSkin: Record<string, Record<string, FigureDef>> = {
  "duyu-organlari-deri": {
    "Şemayı nasıl okuyacaksın?": section,
    "Dokunma reseptörlerini görevle eşleştir": receptors,
  },
};
