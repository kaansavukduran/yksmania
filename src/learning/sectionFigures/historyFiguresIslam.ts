import { battleFigure, compass, mountains, ring, type Battle } from "./historyFiguresSeljuk";
import { circle, poly, pt, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Early Islamic history figures. Uhud follows the school-level account in the
 * guide (MEB çerçevesi): the army takes the mountain behind it, archers hold a
 * hill with the order not to leave, most archers leave the hill, cavalry rides
 * around it and the army withdraws towards the mountain. Positions are
 * schematic; no troop numbers are drawn.
 */

const uhud: Battle = {
  stages: [
    {
      name: "Dizilim",
      text: "Medine dışında Uhud Dağı'nın eteğinde dizilinir; dağ arkaya alınır. Okçular Ayneyn (Okçular) Tepesi'ne yerleştirilir ve “ne olursa olsun yerinizden ayrılmayın” talimatı verilir.",
    },
    {
      name: "İlk üstünlük",
      text: "İlk çarpışmada Müslümanlar üstün gelir, Kureyş ordusu geri çekilir. Tepedeki okçular süvarinin yaklaşmasını engeller.",
    },
    {
      name: "Okçular tepeyi bırakır",
      text: "Savaşın bittiğini düşünen okçuların çoğu, talimata rağmen tepeden iner. Arka koruyan nokta boşalır.",
    },
    {
      name: "Süvari arkadan dolanır",
      text: "Halid bin Velid komutasındaki süvariler boşalan tepenin yanından dolanıp arkadan saldırır; geri çekilen Kureyş ordusu da yeniden ilerler.",
    },
    {
      name: "Dağa çekiliş ve sonuç",
      text: "Müslümanlar Uhud Dağı'nın yamacına çekilir. Hz. Hamza şehit olur, Hz. Peygamber yaralanır. Mekkeliler kesin bir sonuç alamadan döner. Ders: talimata uymak ve sonrasında istişare (Âl-i İmrân 159).",
    },
  ],
  units: [
    { code: "M", label: "Müslüman ordusu (Hz. Peygamber)", tone: "a", path: [v(7, 5.4), v(7, 4.2), v(7, 4.2), v(7, 4.6), v(8.7, 6.5)] },
    { code: "O", label: "Okçular (Ayneyn Tepesi)", tone: "a", path: [v(4.3, 4.6), v(4.3, 4.6), v(5.9, 3.6), v(6.0, 3.5), v(7.3, 6.0)] },
    { code: "K", label: "Kureyş ordusu", tone: "b", path: [v(7, 2.2), v(7, 1.3), v(7, 1.3), v(7, 3.0), v(7, 3.4)] },
    { code: "H", label: "Halid bin Velid'in süvarileri", tone: "b", path: [v(2.6, 2.2), v(2.6, 2.2), v(2.6, 2.2), v(3.2, 5.8), v(5.4, 5.0)] },
    { code: "İ", label: "Kureyş süvarileri (sol kanat)", tone: "b", path: [v(11.4, 2.2), v(11.4, 2.2), v(11.4, 2.2), v(10.2, 3.6), v(10.2, 3.6)] },
  ],
  terrain: [
    ...mountains([3.4, 5.4, 7.4, 9.4, 11.2], 7.2, 2.4, 1.6),
    txt(v(7.2, 9.0), "Uhud Dağı", "c", { tone: "muted", small: true }),
    ...mountains([4.3], 4.15, 2.2, 0.55),
    txt(v(3.0, 4.35), "Ayneyn Tepesi", "w", { tone: "muted", small: true }),
    txt(v(12.6, 0.4), "Medine yönü ↓", "w", { tone: "muted", small: true }),
    ...compass(13),
  ],
  volleys: [
    [0.4, 1.6, 1, 3],
    [3.2, 4, 3, 0],
  ],
  marks: (t, pos) => (t >= 1.6 && t < 3.6 ? [circle(v(4.3, 4.6), 0.55, { tone: "warn", dash: true }), txt(v(4.3, 5.35), "boş", "n", { tone: "warn", small: true, bold: true })] : t >= 3.6 ? [ring(pos(0))] : []),
  width: 13,
  sides: [
    ["Müslümanlar", "a"],
    ["Kureyş (Mekke)", "b"],
  ],
};

/* ---------- Bedir 624 ---------- */
const bedir: Battle = {
  stages: [
    {
      name: "Kervan ve iki yol",
      text: "Şam'dan dönen büyük Kureyş kervanı Bedir yakınından geçecektir. Müslümanlar Medine'den çıkar; kervan yolunu kıyıya çevirerek uzaklaşır, Mekke'den ise kervanı korumak için bir ordu yola çıkar.",
    },
    {
      name: "Kuyuların başında konum",
      text: "Müslüman ordusu Bedir kuyularının yakınında düzen alır ve suyu kendi tarafında tutar. Kureyş ordusu güneyden vadiye girer.",
    },
    {
      name: "Teke tek çarpışma ve genel savaş",
      text: "Savaş geleneğe göre teke tek çarpışmalarla (mübareze) başlar, ardından iki ordu karşılaşır.",
    },
    {
      name: "Sonuç",
      text: "Kureyş ordusu yenilir ve geri çekilir. Bedir, Müslümanların ilk büyük askerî başarısıdır; Medine'deki konum güçlenir. Esirlerin bir kısmının okuma-yazma öğretmesi karşılığında serbest bırakılması ders anlatımında örnektir.",
    },
  ],
  units: [
    { code: "M", label: "Müslüman ordusu (Medine'den)", tone: "a", path: [v(9.0, 6.4), v(6.6, 4.7), v(6.4, 4.4), v(6.4, 4.4)] },
    { code: "V", label: "Kureyş kervanı (kıyı yolu)", tone: "c", path: [v(3.2, 7.4), v(2.0, 2.6), v(1.6, 1.2), v(1.4, 0.6)] },
    { code: "K", label: "Mekke'den gelen Kureyş ordusu", tone: "b", path: [v(7.6, 0.6), v(6.6, 2.4), v(6.5, 2.9), v(8.2, 0.6)] },
  ],
  terrain: [
    poly([v(0, 0), v(0.6, 2), v(0.3, 4.2), v(0.9, 6.2), v(1.1, 8), v(0, 8)], { tone: "b", fill: "b", thin: true, smooth: true }),
    txt(v(0.15, 7.6), "Kızıldeniz", "e", { tone: "b", small: true }),
    circle(v(5.1, 4.2), 0.22, { tone: "b", fill: "b", thin: true }),
    circle(v(4.8, 4.7), 0.18, { tone: "b", fill: "b", thin: true }),
    txt(v(4.5, 4.4), "Bedir kuyuları", "w", { tone: "muted", small: true }),
    ...mountains([8.6, 9.8], 3.6, 1.4, 0.8),
    txt(v(12, 7.9), "Medine yönü ↗", "w", { tone: "muted", small: true }),
    txt(v(9.4, 1.4), "Mekke yönü ↓", "e", { tone: "muted", small: true }),
    ...compass(12),
  ],
  volleys: [[1.6, 2.6, 0, 2]],
  marks: (t, pos) => (t >= 2.6 ? [ring(pos(0))] : []),
  width: 12,
  sides: [
    ["Müslümanlar", "a"],
    ["Kureyş (Mekke)", "b"],
  ],
};

/* ---------- Hendek 627 ---------- */
const trench: El[] = [poly([v(2.4, 5.3), v(4.2, 5.8), v(6.2, 5.9), v(8.2, 5.7), v(10.0, 5.2)], { tone: "warn", open: true, bold: true, smooth: true })];
const hendek: Battle = {
  stages: [
    {
      name: "Savunma planı",
      text: "Mekkeliler ve müttefik kabileler (Ahzab) büyük bir orduyla Medine'ye yürür. İstişarede Selman-ı Farisi'nin önerisiyle şehrin açık kalan kuzey tarafına hendek kazılmasına karar verilir; doğu ve batıdaki lav arazisi (harra) ile güneydeki yerleşim ve bahçeler doğal engeldir.",
    },
    {
      name: "Ahzab ordusu gelir",
      text: "Kureyş ve müttefik kabileler kuzeyden gelir ve hendekle karşılaşır. Meydan savaşı yerine kuşatma başlar.",
    },
    {
      name: "Kuşatma: geçiş denemeleri",
      text: "Hendeği geçme denemeleri sonuç vermez; iki taraf arasında ok atışları olur. Kuşatma haftalarca sürer.",
    },
    {
      name: "Kuşatma kalkar",
      text: "İttifak içindeki anlaşmazlıklar, soğuk ve rüzgârlı hava ile erzak sıkıntısı sonucunda kuşatanlar çekilir. Sonuç: Medine savunulur; Mekke'nin saldırı gücü zayıflar. Bu bir fetih değil, savunmadır.",
    },
  ],
  units: [
    { code: "M", label: "Medine'yi savunanlar", tone: "a", path: [v(6.2, 4.6), v(6.2, 4.8), v(6.2, 4.9), v(6.2, 4.6)] },
    { code: "K", label: "Kureyş ordusu", tone: "b", path: [v(4.4, 12.4), v(5.0, 7.4), v(5.4, 6.8), v(3.8, 12.4)] },
    { code: "A", label: "Müttefik kabileler (Ahzab)", tone: "b", path: [v(9.2, 12.4), v(8.0, 7.4), v(7.6, 6.8), v(9.8, 12.4)] },
  ],
  terrain: [
    ...trench,
    txt(v(10.3, 5.9), "hendek", "e", { tone: "warn", small: true, bold: true }),
    poly([v(0.4, 1.2), v(2.0, 1.6), v(2.6, 3.4), v(2.2, 5.0), v(0.8, 5.4), v(0.2, 3.4)], { tone: "muted", fill: "muted", thin: true, smooth: true }),
    poly([v(10.2, 1.0), v(11.8, 1.4), v(12.2, 3.4), v(11.6, 5.0), v(10.4, 4.6), v(9.9, 2.8)], { tone: "muted", fill: "muted", thin: true, smooth: true }),
    txt(v(1.4, 3.3), "harra", "c", { tone: "muted", small: true }),
    txt(v(11.0, 3.0), "harra", "c", { tone: "muted", small: true }),
    circle(v(6.2, 2.9), 1.1, { tone: "a", dash: true, thin: true }),
    txt(v(6.2, 2.9), "Medine", "c", { tone: "a", small: true }),
    ...mountains([5.2, 6.6, 8.0], 9.6, 1.6, 1.0),
    txt(v(6.6, 11.0), " ", "c"),
    txt(v(9.6, 9.9), "Uhud Dağı", "e", { tone: "muted", small: true }),
    txt(v(12.4, 13.4), "kuzey ↑", "w", { tone: "muted", small: true }),
    ...compass(12.4),
  ],
  volleys: [[1.6, 2.6, 0, 1]],
  width: 12.4,
  sides: [
    ["Müslümanlar", "a"],
    ["Kuşatan güçler", "b"],
  ],
};

/* ---------- Bedir'den Mekke'nin alınmasına: olay türleri ---------- */
const events: { year: number; name: string; kind: string; tone: Tone; result: string; h: number; at: "n" | "nw" | "ne" }[] = [
  { year: 624, name: "Bedir", kind: "savaş", tone: "warn", result: "Müslümanların ilk büyük askerî başarısı; Medine'deki konum güçlenir.", h: 1, at: "n" },
  { year: 625, name: "Uhud", kind: "savaş", tone: "warn", result: "Talimatın terk edilmesi ağır kayba yol açar; kesin sonuç çıkmaz.", h: 2.6, at: "n" },
  { year: 627, name: "Hendek", kind: "savunma", tone: "b", result: "Medine'nin önüne hendek kazılır; kuşatma sonuçsuz kalır.", h: 1, at: "n" },
  { year: 628, name: "Hudeybiye", kind: "antlaşma", tone: "c", result: "Antlaşma: Mekkeliler Müslümanları siyasi muhatap kabul eder.", h: 2.6, at: "n" },
  { year: 630, name: "Mekke'nin alınması", kind: "fetih", tone: "a", result: "Mekke büyük çatışma olmadan alınır; ayrı bir olaydır.", h: 4.2, at: "nw" },
];
const X = (year: number) => ((year - 622) / (632 - 622)) * 12;
const timeline: FigureDef = {
  caption:
    "İleri ile olayları sırayla aç: her olayın yılı, türü (savaş, savunma, antlaşma, fetih) ve sonucu ayrı satırdadır. Antlaşmayı fetihle, savunmayı başka seferlerle karıştırma.",
  alt: "622–632 arası zaman çizgisi: 624 Bedir ve 625 Uhud savaş, 627 Hendek savunma, 628 Hudeybiye antlaşma, 630 Mekke'nin alınması fetih olarak renklendirilmiş.",
  steps: events.map((e) => `${e.year} ${e.name}`),
  draw: (_v, step) => {
    const els: El[] = [seg(v(0, 0), v(12, 0), { tone: "ink" })];
    for (const y of [622, 627, 632]) els.push(seg(v(X(y), -0.15), v(X(y), 0.15), { tone: "muted", thin: true }), txt(v(X(y), -0.3), String(y), "s", { tone: "muted", small: true }));
    events.forEach((e, i) => {
      const x = X(e.year);
      const on = i <= step;
      els.push(seg(v(x, 0), v(x, e.h), { tone: on ? e.tone : "muted", thin: !on, dash: !on }));
      els.push(pt(v(x, 0), undefined, "n", on ? e.tone : "muted", !on));
      if (on) els.push(txt(v(x, e.h + 0.75), e.kind, e.at, { tone: e.tone, small: true }));
      els.push(txt(v(x, e.h + 0.15), on ? `${e.year} ${e.name}` : String(e.year), e.at, { tone: on ? e.tone : "muted", small: true, bold: i === step }));
    });
    const e = events[step];
    return { els, readout: [`${e.year} ${e.name} · ${e.kind}`, e.result] };
  },
};

export const historyFiguresIslam: Record<string, Record<string, FigureDef>> = {
  "islam-medeniyetinin-dogusu": {
    "Savaş kadar diplomasiye de bak": timeline,
    "Savaşın türü, amacı ve sonucu": battleFigure(
      bedir,
      "Sürgüyü sürükle veya Oynat'a bas: 624 Bedir'de kervanın kıyı yolundan uzaklaşmasını, Müslümanların kuyuların başında konum almasını ve iki ordunun karşılaşmasını izle. Harfli pullar birliklerdir, adları altta yazar. Konumlar temsilîdir, ölçekli harita değildir.",
      "Bedir şeması: batıda Kızıldeniz kıyısı, ortada Bedir kuyuları; kuzeydoğudan Medine'den gelen Müslüman ordusu kuyuların yanında, kervan kıyı yolundan güneye uzaklaşıyor, güneyden Mekke'den gelen Kureyş ordusu vadiye giriyor ve sonunda geri çekiliyor.",
    ),
    "Göç, dayanışma ve ortak düzen": battleFigure(
      hendek,
      "Sürgüyü sürükle veya Oynat'a bas: 627 Hendek'te Medine'nin açık kuzey tarafına kazılan hendeği (turuncu), iki yandaki lav arazisini (harra) ve kuzeyden gelen ittifak ordusunun kuşatmasını izle. Hendek bir savunmadır; sonuç kuşatmanın kalkmasıdır. Konumlar temsilîdir.",
      "Hendek şeması: ortada Medine, doğu ve batısında gri lav arazileri, kuzeyinde turuncu kavisli hendek, daha kuzeyde Uhud Dağı. Kureyş ve müttefik kabileler kuzeyden gelip hendeğin önünde durur, sonra geri çekilir.",
    ),
  },
  "hz-muhammed-ve-gencler": {
    "Âl-i İmrân 159: ilişki ve karar süreci": battleFigure(
      uhud,
      "Sürgüyü sürükle veya Oynat'a bas: 625 Uhud'da dağın arkaya alınmasını, okçuların tepeyi bırakmasını ve süvarinin arkadan dolanmasını izle. Harfli pullar birliklerdir, adları altta yazar. Kesik ok o aşamadaki hareketi, kısa ok demeti ok atışını gösterir. Konumlar temsilîdir, ölçekli harita değildir.",
      "Uhud şeması: kuzeyde Uhud Dağı, batıda küçük Ayneyn Tepesi üzerinde okçular, ortada Müslüman ordusu, güneyde Kureyş ordusu ve iki kanatta süvari. Aşamalarda okçular tepeyi bırakır, süvari tepenin yanından dolanıp arkadan gelir, ordu dağa çekilir.",
    ),
  },
};
