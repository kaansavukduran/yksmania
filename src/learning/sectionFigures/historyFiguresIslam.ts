import { battleFigure, compass, mountains, ring, type Battle } from "./historyFiguresSeljuk";
import { circle, pt, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

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
  },
  "hz-muhammed-ve-gencler": {
    "Âl-i İmrân 159: ilişki ve karar süreci": battleFigure(
      uhud,
      "Sürgüyü sürükle veya Oynat'a bas: 625 Uhud'da dağın arkaya alınmasını, okçuların tepeyi bırakmasını ve süvarinin arkadan dolanmasını izle. Harfli pullar birliklerdir, adları altta yazar. Kesik ok o aşamadaki hareketi, kısa ok demeti ok atışını gösterir. Konumlar temsilîdir, ölçekli harita değildir.",
      "Uhud şeması: kuzeyde Uhud Dağı, batıda küçük Ayneyn Tepesi üzerinde okçular, ortada Müslüman ordusu, güneyde Kureyş ordusu ve iki kanatta süvari. Aşamalarda okçular tepeyi bırakır, süvari tepenin yanından dolanıp arkadan gelir, ordu dağa çekilir.",
    ),
  },
};
