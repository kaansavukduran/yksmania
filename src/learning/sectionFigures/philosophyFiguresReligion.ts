import { circle, poly, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Din felsefesi. The three classic arguments are told apart by their starting
 * point, not by the word "Tanrı": a concept (ontolojik), the existence of the
 * world or a chain of causes (kozmolojik), order and purpose (teleolojik). The
 * second figure is a conceptual diagram of the God–world relation; "inside" is
 * not a physical place. Naming an argument never shows it is sound.
 */

const COLS: { name: string; start: string; tone: Tone }[] = [
  { name: "Ontolojik", start: "kavram / tanım", tone: "a" },
  { name: "Kozmolojik", start: "evren ve neden", tone: "b" },
  { name: "Teleolojik", start: "düzen, amaç", tone: "c" },
];
const CASES: { text: string[]; col: number; why: string }[] = [
  { text: ["“En yetkin varlık", "yalnız düşüncede", "kalamaz.”"], col: 0, why: "Başlangıç bir kavram: Anselmus örneği (2024 TYT Sosyal 14 mantığı)." },
  { text: ["“Başlayan her şeyin", "nedeni var; evren", "başlamıştır.”"], col: 1, why: "Başlangıç var olan evren ve neden zinciri." },
  { text: ["“Bu uyum bilinçli", "bir tasarımla", "açıklanır.”"], col: 2, why: "Başlangıç gözlenen düzen ve amaç." },
];

const startBoard: FigureDef = {
  caption:
    "Argümanı hareket noktasından tanı: ‘Tanrı’ sözcüğünü örtünce gerekçe hâlâ kavramdan mı, var olan evrenden mi, düzenden mi başlıyor? İleri ile üç örnek cümle kendi sütununa yerleşir. Türü adlandırmak argümanın geçerli olduğunu kanıtlamaz.",
  alt: "Üç sütunlu pano: ontolojik (kavram), kozmolojik (var olan evren, neden), teleolojik (düzen, amaç); her adımda bir örnek cümle ilgili sütuna yerleşiyor.",
  steps: CASES.map((c, i) => `${i + 1}. cümle`),
  draw: (_, step) => {
    const els: El[] = [];
    const W = 4.2;
    COLS.forEach((c, i) => {
      const x0 = i * (W + 0.3);
      const on = CASES[step].col === i;
      els.push(poly([v(x0, 0), v(x0 + W, 0), v(x0 + W, 4.6), v(x0, 4.6)], { tone: on ? c.tone : "muted", fill: on ? c.tone : undefined, thin: !on }));
      els.push(txt(v(x0 + W / 2, 4.6), c.name, "n", { bold: true, tone: on ? c.tone : "muted" }));
      els.push(txt(v(x0 + W / 2, 4.05), c.start, "c", { small: true, tone: on ? "ink" : "muted" }));
    });
    CASES.slice(0, step + 1).forEach((cs, k) => {
      const x = cs.col * (W + 0.3) + W / 2;
      const cur = k === step;
      // Narrow columns: the sentence is re-wrapped to about 11 characters a
      // line so a phone-size font stays inside its column.
      const lines: string[] = [];
      for (const w of cs.text.join(" ").split(" ")) {
        const last = lines[lines.length - 1];
        if (last && (last + " " + w).length <= 11) lines[lines.length - 1] = last + " " + w;
        else lines.push(w);
      }
      lines.forEach((line, r) => els.push(txt(v(x, 3.3 - r * 0.68), line, "c", { small: true, tone: cur ? "ink" : "muted", bold: cur })));
    });
    els.push(txt(v(-0.2, 5.4), " ", "c"), txt(v(3 * W + 0.8, -0.4), " ", "c"));
    return { els, readout: [CASES[step].why, "Kritik öncülü ayrıca sına: bir neden bulmak o nedenin bütün niteliklerini bulmak değildir."] };
  },
};

const relation: FigureDef = {
  caption:
    "Kavramsal şema, fiziksel konum değil. Panteizm: Tanrı ile evren özdeştir (tek çember). Panenteizm: evren Tanrı'dadır ama Tanrı evreni aşar (büyük çemberin içinde küçük çember). ‘Tanrı evrendedir’ cümlesi tek başına özdeşlik kanıtı değildir; devamında ‘evrenden fazlası değildir’ mi, ‘onu aşar’ mı dendiğine bak.",
  alt: "Solda tek çember, içinde ‘Tanrı = evren’; sağda büyük ‘Tanrı’ çemberinin içinde küçük ‘evren’ çemberi, aradaki halka aşkınlığı gösteriyor.",
  steps: ["Panteizm: özdeşlik", "Panenteizm: içkin ve aşkın"],
  draw: (_, step) => {
    const els: El[] = [];
    const a = step === 0;
    els.push(circle(v(2, 1.8), 1.6, { tone: a ? "a" : "muted", fill: a ? "a" : undefined }));
    els.push(txt(v(2, 1.8), "Tanrı = evren", "c", { bold: a, tone: a ? "ink" : "muted" }));
    els.push(txt(v(2, 0.2), "panteizm", "s", { small: true, bold: a, tone: a ? "a" : "muted" }));
    els.push(circle(v(7, 1.8), 1.6, { tone: !a ? "b" : "muted", fill: !a ? "b" : undefined }));
    els.push(circle(v(7, 1.45), 0.85, { tone: !a ? "c" : "muted", fill: !a ? "c" : undefined }));
    els.push(txt(v(7, 1.45), "evren", "c", { small: true, bold: !a, tone: !a ? "ink" : "muted" }));
    els.push(txt(v(7, 2.75), "Tanrı", "c", { small: true, bold: !a, tone: !a ? "ink" : "muted" }));
    els.push(txt(v(7, 0.2), "panenteizm", "s", { small: true, bold: !a, tone: !a ? "b" : "muted" }));
    els.push(txt(v(0.2, 3.7), " ", "c"), txt(v(8.8, -0.6), " ", "c"));
    return {
      els,
      readout: [
        a ? "Özdeşlik: Tanrı evrenden fazlası değildir." : "İçkin: evren Tanrı'dadır · aşkın: Tanrı evrenle sınırlı değildir.",
        "Deizm ayrı bir eksendir: yaratıcıyı kabul edip müdahaleyi ve vahyi dışlar. Ateizm varlık hükmü, agnostisizm bilgi sınırı hükmüdür.",
      ],
    };
  },
};

export const philosophyFiguresReligion: Record<string, Record<string, FigureDef>> = {
  "din-felsefesi": {
    "Argümanın öncülünü ve sonucunu görünür yap": startBoard,
    "Panteizm ve panenteizmde ilişkiyi çiz": relation,
  },
};
