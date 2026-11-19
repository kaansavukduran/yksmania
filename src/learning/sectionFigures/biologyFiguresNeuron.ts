import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * AYT Biyoloji · Nöron ve glialar. Şemalar ölçekli değildir; tipik çok kutuplu
 * miyelinli nöron çizilir, bütün nöronların biçimi aynı değildir. İletim
 * karşılaştırmaları nitel öğretim modelidir, hız ölçümü değildir.
 */

const rect = (x0: number, x1: number, y: number, h: number, s: { fill?: Tone; tone?: Tone; thin?: boolean } = {}): El =>
  poly([v(x0, y + h), v(x1, y + h), v(x1, y - h), v(x0, y - h)], s);

// 1 · Nöron anatomisi.
const PARTS = [
  { label: "Dendrit", title: "Dendrit", detail: ["Genellikle başka hücrelerden gelen bilgiyi alır.", "Gövdeye yakın, çok dallı kısa uzantılardır.", "Her uzantı akson değildir; uzun tek çıkış akson olarak izlenir."] },
  { label: "Soma", title: "Soma (hücre gövdesi)", detail: ["Çekirdek ve metabolik organeller buradadır.", "Nissl cisimcikleri (granüllü ER + ribozom) protein sentezine katkı verir.", "Olgun nöron çoğunlukla bölünmez ama protein ve ATP üretimi sürer."] },
  { label: "Akson", title: "Akson", detail: ["Sinyali gövdeden uzaktaki uçlara iletir.", "Tipik nöronda tek ve uzundur.", "Her akson miyelinli değildir (2024 AYT Fen 31, II yanlış)."] },
  { label: "Miyelin", title: "Miyelin kılıf", detail: ["Aksonu saran yalıtıcı katmandır; elverişli koşulda iletimi hızlandırır.", "MSS’de oligodendrosit, ÇSS’de Schwann hücresi yapar.", "Yararlı olması evrensel olduğu anlamına gelmez."] },
  { label: "Ranvier boğumu", title: "Ranvier boğumu", detail: ["Miyelin parçaları arasındaki açık akson zarı bölgesidir.", "Boğumda miyelin yoktur (2024 AYT Fen 31, III doğru).", "Miyelinin kalınlaştığı yer değildir."] },
  { label: "Sinaptik uç", title: "Sinaptik uç", detail: ["Başka bir nöron, kas ya da bezle iletişim kurulan uçtur.", "Burada nörotransmitter salınır, alıcı hücredeki reseptöre bağlanır.", "Sinaps yalnız iki nöron arasında olmaz: nöromüsküler kavşak da sinapstır."] },
];
const MYELIN: [number, number][] = [[1.5, 2.9], [3.3, 4.7], [5.1, 6.5], [6.9, 8.3]];

const anatomy: FigureDef = {
  caption:
    "Tipik çok kutuplu miyelinli nöron (özgün şema, ölçekli değil). Bir parçanın adına tıkla: işi ve en sık karıştırılan noktası açılır.",
  alt: "Solda dallanmış dendritlerle bir hücre gövdesi, gövdeden sağa uzanan akson. Akson dört miyelin parçasıyla sarılı, aralarda Ranvier boğumları var. Sağ uçta üç sinaptik uç dalı.",
  picks: PARTS.map((p) => ({ label: p.label, title: p.title, detail: p.detail })),
  draw: (_v, _s, pick = -1) => {
    const t = (i: number): Tone | undefined => (pick === i ? "a" : undefined);
    const els: El[] = [];
    for (const a of [130, 165, 200, 235]) {
      const r = (a * Math.PI) / 180;
      const p1 = v(0.7 * Math.cos(r), 0.7 * Math.sin(r));
      const p2 = v(1.6 * Math.cos(r), 1.6 * Math.sin(r));
      els.push(seg(p1, p2, { tone: t(0) }));
      els.push(seg(p2, v(p2[0] - 0.35, p2[1] + 0.3), { thin: true, tone: t(0) }));
      els.push(seg(p2, v(p2[0] - 0.35, p2[1] - 0.25), { thin: true, tone: t(0) }));
    }
    els.push(circle(v(0, 0), 0.7, { fill: pick === 1 ? "a" : "b", tone: pick === 1 ? "a" : "b" }));
    els.push(circle(v(0, 0), 0.22, { fill: "ink", tone: "ink", thin: true }));
    els.push(seg(v(0.7, 0), v(9.0, 0), { bold: true, tone: t(2) }));
    MYELIN.forEach(([a, b]) => els.push(rect(a, b, 0, 0.26, { fill: pick === 3 ? "a" : "c", tone: pick === 3 ? "a" : "c" })));
    if (pick === 4) MYELIN.slice(0, 3).forEach(([, b], i) => els.push(circle(v((b + MYELIN[i + 1][0]) / 2, 0), 0.16, { tone: "a" })));
    for (const dy of [0.6, 0, -0.6]) {
      els.push(seg(v(9.0, 0), v(9.7, dy), { tone: t(5) }));
      els.push(circle(v(9.82, dy), 0.12, { fill: pick === 5 ? "a" : "warn", tone: pick === 5 ? "a" : "warn" }));
    }
    els.push(
      txt(v(-1.5, 1.75), "Dendrit", "c", { bold: pick === 0, tone: t(0) ?? "ink", pick: 0 }),
      txt(v(0, -1.15), "Soma", "c", { bold: pick === 1, tone: t(1) ?? "ink", pick: 1 }),
      txt(v(1.1, 0.75), "Akson", "c", { bold: pick === 2, tone: t(2) ?? "ink", pick: 2 }),
      txt(v(4.0, 0.75), "Miyelin", "c", { bold: pick === 3, tone: t(3) ?? "c", pick: 3 }),
      txt(v(4.9, -0.8), "Ranvier boğumu", "c", { bold: pick === 4, tone: t(4) ?? "ink", pick: 4 }),
      txt(v(9.4, -1.25), "Sinaptik uç", "c", { bold: pick === 5, tone: t(5) ?? "warn", pick: 5 }),
    );
    if (pick !== 4) els.push(seg(v(4.9, -0.5), v(4.9, -0.12), { thin: true, tone: "muted" }));
    els.push(txt(v(-2.6, 2.2), " ", "c"), txt(v(10.6, -1.7), " ", "c"));
    return {
      els,
      readout: [
        pick >= 0 ? PARTS[pick].detail[0] : "Bir parçaya tıkla ya da aşağıdan seç.",
        "Akış: dendrit → soma → akson → sinaptik uç. Şema tipik nöronu gösterir.",
      ],
    };
  },
};

// 2 · Glia panosu: yer × görev.
type Glia = { name: string; where: 0 | 1; role: number; title: string; detail: string[] };
const ROLES = ["Miyelin", "Savunma", "Destek", "Boşluk/BOS"];
const GLIA: Glia[] = [
  { name: "Oligodendrosit", where: 0, role: 0, title: "Oligodendrosit · MSS miyelini", detail: ["Beyin ve omurilikteki (MSS) aksonları miyelinler.", "Omuriliğin beyaz cevheri, beyin içi akson → oligodendrosit.", "Kol veya bacak sinirinde bu iş Schwann’ındır."] },
  { name: "Schwann", where: 1, role: 0, title: "Schwann hücresi · ÇSS miyelini", detail: ["Çevresel sinirlerdeki (ÇSS) aksonları miyelinler.", "Periferik bacak siniri, kol siniri → Schwann.", "Önce yeri seç: MSS mi ÇSS mi?"] },
  { name: "Mikroglia", where: 0, role: 1, title: "Mikroglia · savunma", detail: ["Hücresel artıkları ve yabancıları fagositozla uzaklaştırır.", "Miyelin yapmaz; “her glia miyelin üretir” iddiasının karşı örneğidir.", "Fagositoz ipucu yoksa astrositle karıştırma."] },
  { name: "Astrosit", where: 0, role: 2, title: "Astrosit · metabolik destek", detail: ["Ortamı ve madde değişimini düzenlemeye katkı verir.", "Kan-beyin bariyeri işlevine katkı sağlar; bariyer yalnız astrositten oluşmaz.", "Yalnız “destek hücresi” denmişse tür kesin belirlenmez."] },
  { name: "Ependim", where: 0, role: 3, title: "Ependim · boşluklar ve BOS", detail: ["MSS boşluklarını döşer.", "Beyin-omurilik sıvısının (BOS) üretim ve akışına katkı verir.", "Miyelin yapmaz."] },
];
const COLX = [3.4, 6.4];

const gliaBoard: FigureDef = {
  caption:
    "Glia hücrelerini iki ölçütle yerleştir: sütun yeri (MSS = beyin + omurilik, ÇSS = çevresel sinirler), satır görevi gösterir. Bir hücreye tıkla: ayırt edici ipucu açılır.",
  alt: "İki sütunlu tablo. MSS sütununda miyelin satırında oligodendrosit, savunmada mikroglia, destekte astrosit, boşluk ve BOS satırında ependim. ÇSS sütununda miyelin satırında Schwann.",
  picks: GLIA.map((g) => ({ label: g.name, title: g.title, detail: g.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [
      txt(v(COLX[0], 0), "MSS", "c", { bold: true }),
      txt(v(COLX[1], 0), "ÇSS", "c", { bold: true }),
      seg(v(-0.2, -0.45), v(7.9, -0.45), { thin: true, tone: "muted" }),
      seg(v(4.9, 0.3), v(4.9, -4.5), { thin: true, tone: "muted", dash: true }),
    ];
    ROLES.forEach((r, i) => els.push(txt(v(0, -(i + 1) * 1.0), r, "e", { small: true, tone: "muted" })));
    GLIA.forEach((g, i) => {
      const x = COLX[g.where], y = -(g.role + 1) * 1.0;
      const sel = pick === i;
      if (sel) els.push(rect(x - 1.4, x + 1.4, y, 0.38, { fill: "a", tone: "a", thin: true }));
      els.push(txt(v(x, y), g.name, "c", { bold: sel, tone: sel ? "a" : g.role === 0 ? "c" : "ink", pick: i }));
    });
    els.push(txt(v(-0.4, 0.5), " ", "c"), txt(v(8.1, -4.6), " ", "c"));
    return {
      els,
      readout: [
        pick >= 0 ? GLIA[pick].detail[0] : "Önce yeri (MSS/ÇSS), sonra görevi (miyelin, savunma, destek, BOS) seç.",
        "Miyelin: MSS → oligodendrosit, ÇSS → Schwann. Mikroglia ve ependim miyelin yapmaz.",
      ],
    };
  },
};

// 3 · Görev yolu: çok sinapslı ve tek sinapslı.
const NODES = ["Alıcı", "Duyu n.", "Ara n.", "Motor n.", "Kas"];

const pathway: FigureDef = {
  caption:
    "Uyarıdan yanıta görev sırası. Duyu nöronu bilgiyi merkeze götürür, ara nöron MSS içinde işler, motor nöron yanıtı efektöre taşır. İkinci adımda tek sinapslı gerilme refleksi: ara nöron zorunlu değildir.",
  alt: "Soldan sağa alıcı, duyu nöronu, ara nöron, motor nöron ve kas kutuları oklarla bağlı. İkinci adımda ara nöron soluk ve ok duyu nöronundan doğrudan motor nörona gidiyor.",
  steps: ["Çok sinapslı yol", "Tek sinapslı refleks"],
  draw: (_v, step) => {
    const els: El[] = [];
    const X = (i: number) => i * 2.3;
    els.push(rect(X(1) + 1.0, X(3) - 1.0, 0, 1.0, { fill: "b", tone: "b", thin: true }));
    els.push(txt(v(X(2), 1.35), "MSS (omurilik)", "c", { small: true, tone: "b" }));
    NODES.forEach((n, i) => {
      const off = step === 1 && i === 2;
      els.push(rect(X(i) - 0.9, X(i) + 0.9, 0, 0.38, { fill: off ? undefined : i === 0 || i === 4 ? "muted" : "c", tone: off ? "muted" : "ink", thin: true }));
      els.push(txt(v(X(i), 0), n, "c", { small: true, tone: off ? "muted" : "ink" }));
    });
    const arrow = (a: number, b: number, y = 0) => els.push(vec(v(X(a) + 0.95, y), v(X(b) - 0.95, y), { tone: "a" }));
    arrow(0, 1);
    if (step === 0) { arrow(1, 2); arrow(2, 3); }
    else {
      els.push(seg(v(X(1), -0.4), v(X(1), -0.9), { tone: "a" }), seg(v(X(1), -0.9), v(X(3), -0.9), { tone: "a" }), vec(v(X(3), -0.9), v(X(3), -0.42), { tone: "a" }));
      els.push(txt(v(X(2), -1.25), "tek sinaps", "c", { small: true, tone: "a" }));
    }
    arrow(3, 4);
    els.push(txt(v(-1.1, 1.9), " ", "c"), txt(v(X(4) + 1.1, -1.7), " ", "c"));
    return {
      els,
      readout: [
        step === 0 ? "Alıcı → duyu → ara → motor → kas: kas mesaj üretmez, yanıtı oluşturan efektördür." : "Gerilme refleksinde duyu nöronu motor nöronla doğrudan sinaps yapabilir; “her refleks ara nöronludur” yanlıştır.",
        "Duyu/ara/motor görev adıdır; MSS/ÇSS yer adıdır. İki sınıflamayı tek etiket sanma.",
      ],
    };
  },
};

// 4 · Sabit koşul: iki aksonu karşılaştır.
const compare: FigureDef = {
  caption:
    "İki akson, iki durum (nitel model, hız ölçümü değil). Önce sabit tutulanları işaretle: çap ve sıcaklık eşitken yalnız miyelin farklıysa miyelinli olanın daha hızlı iletmesi beklenir. Çap da değişiyorsa iki etken karşı yönde çalışır.",
  alt: "Üstte A, altta B aksonu. Birinci durumda eşit kalınlıkta, yalnız A miyelinli. İkinci durumda A ince ve miyelinli, B kalın ve miyelinsiz.",
  steps: ["Çap eşit", "Çap farklı"],
  draw: (_v, step) => {
    const els: El[] = [];
    const axon = (y: number, h: number, myel: boolean, name: string) => {
      els.push(rect(0, 8, y, h, { fill: "muted", tone: "muted", thin: true }));
      if (myel) [[0.4, 1.8], [2.2, 3.6], [4.0, 5.4], [5.8, 7.2]].forEach(([a, b]) => els.push(rect(a, b, y, h + 0.14, { fill: "c", tone: "c" })));
      els.push(txt(v(-0.3, y), name, "w", { bold: true }));
      els.push(txt(v(8.3, y), myel ? "miyelinli" : "miyelinsiz", "e", { small: true, tone: myel ? "c" : "muted" }));
    };
    if (step === 0) { axon(0.9, 0.18, true, "A"); axon(-0.9, 0.18, false, "B"); }
    else { axon(0.9, 0.1, true, "A"); axon(-0.9, 0.42, false, "B"); }
    els.push(txt(v(4, -2.0), step === 0 ? "Beklenen: A daha hızlı (oran verilmedi)" : "Kesin sıralama yok: veri yetersiz", "c", { small: true, tone: step === 0 ? "c" : "warn" }));
    els.push(txt(v(-1.3, 1.6), " ", "c"), txt(v(10.9, -2.4), " ", "c"));
    return {
      els,
      readout: [
        step === 0 ? "Sabit: çap ve sıcaklık. Değişen: miyelin. Sonuç yönlüdür, “iki kat” gibi sayı söylenemez." : "Miyelin A’yı, büyük çap B’yi destekler; nicel model olmadan “kesin daha hızlı” denemez.",
        "Önce sabit tutulan değişkenleri listele, sonra tek farkın etkisini yorumla.",
      ],
    };
  },
};

export const biologyFiguresNeuron: Record<string, Record<string, FigureDef>> = {
  "sinir-sistemi-noron-ve-glialar": {
    "Dendrit, soma ve akson aynı parça değildir": anatomy,
    "Duyu, ara ve motor birer görev tanımıdır": pathway,
    "Glia yalnız boşluk dolduran destek değildir": gliaBoard,
    "Karşılaştırmada sabit koşulu ara": compare,
  },
};
