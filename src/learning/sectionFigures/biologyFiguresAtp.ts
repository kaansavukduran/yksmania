import { ball, circle, poly, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * ATP, schematic (not to scale): adenin – riboz – α–β–γ fosfat with the bond
 * types the MEBİ text names (N-glikozit, fosfoester, two fosfoanhidrit). Each
 * part opens a card. Hydrolysis removes the terminal (γ) phosphate. The second
 * figure decides the phosphorylation type by two questions: is the phosphate
 * handed over directly, or is there an ETS → H⁺ gradient → ATP sentaz chain;
 * and if a gradient, is the first energy light or a chemical donor? 2024 AYT
 * Fen 38: the common point of photosynthesis and respiration is chemiosmosis.
 */

type Part = { name: string; what: string; trap: string };
const PARTS: Part[] = [
  { name: "Adenin", what: "Azotlu baz (pürin). Adenin + riboz = adenozin.", trap: "Fosfat sayısı adı belirler: 1 AMP, 2 ADP, 3 ATP; baz aynı kalır." },
  { name: "Riboz", what: "Beş karbonlu şeker. Deoksiriboz olsaydı molekül ATP olmazdı.", trap: "Yalnız fosfat sayısına bakıp ad verme; şekeri de denetle." },
  { name: "α fosfat", what: "Ribozla fosfoester bağıyla bağlı ilk fosfat. Adenin–riboz arasında N-glikozit bağı vardır.", trap: "Riboz–fosfat bağı fosfoanhidrit değildir." },
  { name: "β fosfat", what: "α ile fosfoanhidrit bağıyla bağlı ikinci fosfat.", trap: "ATP'de iki fosfoanhidrit bağı vardır (α–β ve β–γ)." },
  { name: "γ fosfat", what: "Uç fosfat: hidrolizde ayrılır, ATP + H₂O → ADP + Pi.", trap: "Bağ koparmak tek başına enerji vermez; net enerji bütün tepkimenin sonucudur." },
];
const atp: FigureDef = {
  caption:
    "ATP: adenin + riboz (= adenozin) + üç fosfat. Bir parçaya tıkla. Hidrolizde uç (γ) fosfat ayrılır ve ADP + Pi oluşur; enerji başka bir işe enzimle eşlenir. ATP kısa süreli taşıyıcıdır, uzun süreli depo değildir.",
  alt: "Soldan sağa: altıgen ve beşgen halkalı adenin, beşgen riboz, ardından α, β, γ etiketli üç fosfat dairesi; aralarındaki bağların türleri yazılı; γ fosfatın ayrıldığı hidroliz oku.",
  picks: PARTS.map((p) => ({ label: p.name, title: p.name, detail: [p.what, `Karıştırma: ${p.trap}`] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const on = (i: number) => pick === i;
    const tone = (i: number, t: Tone): Tone => (on(i) ? "a" : t);
    const hex = Array.from({ length: 6 }, (_, k) => v(0.9 + 0.8 * Math.cos((k * Math.PI) / 3 + Math.PI / 6), 0.9 + 0.8 * Math.sin((k * Math.PI) / 3 + Math.PI / 6)));
    els.push(poly(hex, { tone: tone(0, "b"), fill: tone(0, "b"), thin: !on(0) }));
    const pent = Array.from({ length: 5 }, (_, k) => v(3.6 + 0.75 * Math.cos((k * 2 * Math.PI) / 5 - Math.PI / 2), 0.9 + 0.75 * Math.sin((k * 2 * Math.PI) / 5 - Math.PI / 2)));
    els.push(poly(pent, { tone: tone(1, "c"), fill: tone(1, "c"), thin: !on(1) }));
    els.push(seg(v(1.7, 0.9), v(2.85, 0.9), { tone: "ink" }));
    const px = [6.2, 8.4, 10.6];
    els.push(seg(v(4.35, 0.9), v(px[0] - 0.45, 0.9), { tone: "ink" }));
    px.forEach((x, k) => {
      els.push(circle(v(x, 0.9), 0.45, { tone: tone(2 + k, "warn"), fill: tone(2 + k, "warn"), thin: !on(2 + k) }));
      if (k < 2) els.push(seg(v(x + 0.45, 0.9), v(px[k + 1] - 0.45, 0.9), { tone: "ink", bold: true }));
    });
    els.push(txt(v(0.9, 1.75), "Adenin", "n", { small: true, bold: on(0), tone: on(0) ? "a" : "ink", pick: 0 }));
    els.push(txt(v(3.6, 1.75), "Riboz", "n", { small: true, bold: on(1), tone: on(1) ? "a" : "ink", pick: 1 }));
    ["α fosfat", "β fosfat", "γ fosfat"].forEach((n, k) => els.push(txt(v(px[k], 1.4), n, "n", { small: true, bold: on(2 + k), tone: on(2 + k) ? "a" : "ink", pick: 2 + k })));
    els.push(txt(v(10.6, 0.4), "hidrolizde ayrılır", "s", { small: true, tone: "warn" }));
    els.push(txt(v(-0.2, 2.6), " ", "c"), txt(v(11.6, -0.4), " ", "c"));
    const sel = pick >= 0 ? PARTS[pick] : undefined;
    return { els, readout: [sel ? `${sel.name}: ${sel.what}` : "Bir parçaya tıkla ya da aşağıdan seç.", "ATP + H₂O → ADP + Pi (ekzergonik) · ADP + Pi + enerji → ATP + H₂O (fosforilasyon)."] };
  },
};

type Kind = { name: string; rows: [string, string, string]; where: string; trap: string; tone: Tone };
const KINDS: Kind[] = [
  { name: "Substrat düzeyi", rows: ["fosfat doğrudan", "gradyan yok", "O₂ gerekmez"], where: "Glikoliz ve Krebs döngüsünün belirli basamakları; fermantasyonda da.", trap: "ATP oluşması tek başına ETS kanıtı değildir.", tone: "b" },
  { name: "Oksidatif", rows: ["H⁺ gradyanı", "ilk enerji: kimyasal", "son alıcı O₂ / başka"], where: "Mitokondri iç zarı; prokaryotta hücre zarı. Kemosentezde inorganik verici de olabilir.", trap: "Oksijenli solunum yalnız mitokondrili canlılara özgü değildir (2026 AYT Fen 38).", tone: "c" },
  { name: "Foto", rows: ["H⁺ gradyanı", "ilk enerji: ışık", "pigment gerekir"], where: "Kloroplast tilakoit zarı; fotosentetik prokaryot zarları.", trap: "‘Proton gradyanı’ görünce kör oksidatif seçme; ilk enerji ışık ise foto.", tone: "warn" },
];
const kinds: FigureDef = {
  caption:
    "İki soruyla seç: (1) Fosfat organik ara üründen doğrudan mı aktarılıyor? Evet → substrat düzeyinde. (2) ETS → H⁺ gradyanı → ATP sentaz varsa ilk enerji ışık mı (foto), kimyasal vericinin yükseltgenmesi mi (oksidatif)? Fotosentez ile solunumun ortak noktası kemiozmozdur, elektron kaynakları değil (2024 AYT Fen 38 mantığı). Bir sütuna tıkla.",
  alt: "Üç sütun: substrat düzeyinde, oksidatif ve foto fosforilasyon; her sütunda üç ölçüt satırı; oksidatif ve foto sütunları ortak 'kemiozmoz' bandıyla birleşiyor.",
  picks: KINDS.map((k) => ({ label: `${k.name} fosforilasyon`, title: `${k.name} fosforilasyon`, detail: [k.rows.join(" · "), `Nerede: ${k.where}`, `Karıştırma: ${k.trap}`] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const W = 5.2;
    KINDS.forEach((k, i) => {
      const x = i * (W + 0.3);
      const on = pick === i;
      const tone: Tone = on ? "a" : k.tone;
      els.push(poly([v(x, 0), v(x + W, 0), v(x + W, 3.2), v(x, 3.2)], { tone, fill: tone, thin: !on }));
      els.push(txt(v(x + W / 2, 3.2), k.name, "n", { bold: true, tone: on ? "a" : "ink", pick: i }));
      k.rows.forEach((r, j) => els.push(txt(v(x + W / 2, 2.5 - j * 0.8), r, "c", { small: true, tone: on ? "ink" : "muted" })));
    });
    els.push(poly([v(W + 0.3, -0.25), v(3 * W + 0.6, -0.25)], { tone: "a", open: true, bold: true }), txt(v(2 * W + 0.45, -0.25), "ortak: kemiozmoz", "s", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.2, 4.1), " ", "c"), txt(v(3 * W + 0.8, -1.1), " ", "c"));
    const sel = pick >= 0 ? KINDS[pick] : undefined;
    return { els, readout: [sel ? `${sel.name}: ${sel.where}` : "Bir sütuna tıkla ya da aşağıdan seç.", "Hücre ATP'yi sürekli üretir ve tüketir: son ATP = başlangıç + sentez − hidroliz."] };
  },
};

export const biologyFiguresAtp: Record<string, Record<string, FigureDef>> = {
  "atp-metabolizma": {
    "ATP’nin parçalarını say, besinle rolünü karıştırma": atp,
    "Fotofosforilasyon: ilk enerji kaynağı ışık, ortak mekanizma kemiozmoz": kinds,
  },
};
