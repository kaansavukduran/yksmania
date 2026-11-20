import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * AYT Biyoloji · Çevresel sinir sistemi ve hastalıklar. Şemalar özgün ve
 * ölçekli değildir. Hastalık kartları okul düzeyi mekanizma ayrımıdır; kişisel
 * tanı veya tedavi çıkarımı değildir.
 */

const rect = (x0: number, x1: number, y: number, h: number, s: { fill?: Tone; tone?: Tone; thin?: boolean } = {}): El =>
  poly([v(x0, y + h), v(x1, y + h), v(x1, y - h), v(x0, y - h)], s);

// 1 · Sınıflama ağacı: yer → yön → hedef → kol.
type N = { label: string; at: V; parent?: number; title: string; detail: string[] };
const TREE: N[] = [
  { label: "Sinir sistemi", at: v(3.6, 0), title: "Sinir sistemi", detail: ["Üç soruyu sırayla sor: yer, yön, hedef.", "Yer, yön ve hedef birbirinin yerine geçmez."] },
  { label: "MSS", at: v(1.2, -1.2), parent: 0, title: "MSS · merkezî sinir sistemi", detail: ["Beyin ve omurilik."] },
  { label: "ÇSS", at: v(6.0, -1.2), parent: 0, title: "ÇSS · çevresel sinir sistemi", detail: ["Beyin ve omurilik dışındaki sinirler ve gangliyonlar.", "12 çift kafa siniri, 31 çift omurilik siniri.", "Gangliyon: MSS dışındaki nöron gövdesi topluluğu; sinir: akson demeti."] },
  { label: "Duyu", at: v(4.2, -2.4), parent: 2, title: "Duyu (afferent)", detail: ["Reseptörden MSS’ye.", "Duyu gangliyonları da vardır; gangliyon görmek motor yol demek değildir."] },
  { label: "Motor", at: v(7.6, -2.4), parent: 2, title: "Motor (efferent)", detail: ["MSS’den kas ya da beze.", "Karma sinir duyu ve motor liflerini birlikte taşır."] },
  { label: "Somatik", at: v(5.9, -3.6), parent: 4, title: "Somatik motor", detail: ["Hedef iskelet kası.", "İstemsiz refleksler de olabilir: diz refleksi somatiktir.", "MSS’den kasa tek motor nöron."] },
  { label: "Otonom", at: v(9.2, -3.6), parent: 4, title: "Otonom motor", detail: ["Hedef düz kas, kalp kası, bezler.", "Tipik yol iki motor nöron: gangliyon öncesi ve sonrası."] },
  { label: "Sempatik", at: v(7.8, -4.8), parent: 6, title: "Sempatik", detail: ["Çaba/alarm: kalp hızı artar, göz bebeği genişler, sindirim hareketi baskılanır.", "“Bütün organları hızlandırır” genellemesi yanlış (2010 LYS-2 Biyoloji 12)."] },
  { label: "Parasempatik", at: v(10.9, -4.8), parent: 6, title: "Parasempatik", detail: ["Dinlenme ve sindirim: kalp hızı azalır, göz bebeği daralır, sindirim hareketi artar.", "Her organ iki koldan aynı biçimde sinir almaz."] },
];

const tree: FigureDef = {
  caption:
    "Bir yolu üç soruyla sınıfla: yer (MSS mi ÇSS mi?), yön (merkeze mi, hedefe mi?), hedef (iskelet kası mı, düz kas/kalp/bez mi?). Bir ada tıkla.",
  alt: "Ağaç: sinir sistemi MSS ve ÇSS’ye; ÇSS duyu ve motora; motor somatik ve otonoma; otonom sempatik ve parasempatiğe ayrılıyor.",
  picks: TREE.map((n) => ({ label: n.label, title: n.title, detail: n.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    TREE.forEach((n) => {
      if (n.parent !== undefined) els.push(seg(v(TREE[n.parent].at[0], TREE[n.parent].at[1] - 0.3), v(n.at[0], n.at[1] + 0.3), { thin: true, tone: "muted" }));
    });
    TREE.forEach((n, i) => els.push(txt(n.at, n.label, "c", { small: i >= 3, bold: pick === i || i < 3, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(0.0, 0.5), " ", "c"), txt(v(12.4, -5.3), " ", "c"));
    return {
      els,
      readout: [pick >= 0 ? TREE[pick].detail[0] : "Bir ada tıkla ya da aşağıdan seç.", "İstemsiz başlaması yolu otonom yapmaz; motor sınıfı hedef belirler."],
    };
  },
};

// 2 · Hedef → motor sınıf.
const TARGETS = [
  { ev: "Diz refleksi", c: "Somatik", why: ["Hedef iskelet kası; istemsiz başlasa da somatik.", "En sık tuzak: “istemsiz = otonom”."] },
  { ev: "İğneden kolu çekme", c: "Somatik", why: ["Hedef iskelet kası.", "Aynı anda terleme artarsa ter bezi ayrıca otonom sınıflanır."] },
  { ev: "Nesneyi bilerek sıkma", c: "Somatik", why: ["İstemli hareket, hedef iskelet kası."] },
  { ev: "Kalp hızının artması", c: "Otonom", why: ["Kalbin kendi uyarı üretimi var; otonom etkinlik hızı ayarlar.", "Çaba/alarm: tipik sempatik etki."] },
  { ev: "Göz bebeği daralması", c: "Otonom", why: ["Hedef iris düz kası.", "Tipik parasempatik etki; genişleme sempatik."] },
  { ev: "Terleme", c: "Otonom", why: ["Hedef ter bezi.", "Tipik düzenleme sempatik ağırlıklıdır."] },
];

const targets: FigureDef = {
  caption:
    "Motor sınıfı istemli olup olmamaya göre değil, hedefe göre seç: iskelet kası somatik; düz kas, kalp kası ve bez otonom. Bir yanıta tıkla.",
  alt: "Altı satır: diz refleksi, iğneden kolu çekme ve bilerek sıkma somatik; kalp hızı, göz bebeği ve terleme otonom.",
  picks: TARGETS.map((t) => ({ label: t.ev, title: `${t.ev} → ${t.c}`, detail: t.why })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    TARGETS.forEach((t, i) => {
      const y = -i * 0.85;
      const sel = pick === i;
      if (sel) els.push(rect(-0.2, 7.0, y, 0.36, { fill: "a", tone: "a", thin: true }));
      els.push(txt(v(0, y), t.ev, "e", { small: true, bold: sel, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(6.8, y), t.c, "w", { small: true, tone: t.c === "Somatik" ? "c" : "b" }));
    });
    els.push(txt(v(-0.4, 0.6), " ", "c"), txt(v(7.2, -4.8), " ", "c"));
    return {
      els,
      readout: [pick >= 0 ? `${TARGETS[pick].c}: ${TARGETS[pick].why[0]}` : "Bir yanıta tıkla ya da aşağıdan seç.", "Önce efektörü yaz; sonra motor sınıfı seç."],
    };
  },
};

// 3 · Somatik ve otonom motor yol.
const pathway: FigureDef = {
  caption:
    "Tipik somatik motor yolda MSS’deki tek motor nöron iskelet kasına ulaşır. Tipik otonom motor yolda gangliyon öncesi nöron bir gangliyonda gangliyon sonrası nörona bağlanır; ikinci nöron hedefe gider.",
  alt: "Üstte MSS’den iskelet kasına tek akson. Altta MSS’den gangliyona bir akson, gangliyondan düz kasa ikinci akson.",
  steps: ["Somatik", "Otonom"],
  draw: (_v, step) => {
    const els: El[] = [rect(-0.6, 0.6, 0, 1.9, { fill: "b", tone: "b", thin: true }), txt(v(0, 2.25), "MSS", "c", { small: true, bold: true })];
    const som = step === 0;
    const tS: Tone = som ? "a" : "muted", tO: Tone = som ? "muted" : "a";
    els.push(circle(v(0, 1.0), 0.16, { fill: tS, tone: tS }), vec(v(0.2, 1.0), v(5.6, 1.0), { tone: tS, bold: som }));
    els.push(rect(5.7, 8.3, 1.0, 0.35, { fill: som ? "c" : undefined, tone: tS, thin: true }), txt(v(7.0, 1.0), "iskelet kası", "c", { small: true, tone: som ? "ink" : "muted" }));
    els.push(txt(v(2.9, 1.4), "tek motor nöron", "c", { small: true, tone: tS }));
    els.push(circle(v(0, -1.0), 0.16, { fill: tO, tone: tO }), vec(v(0.2, -1.0), v(2.6, -1.0), { tone: tO, bold: !som }));
    els.push(circle(v(3.0, -1.0), 0.4, { tone: tO, fill: som ? undefined : "c" }), circle(v(3.0, -1.0), 0.14, { fill: tO, tone: tO }));
    els.push(vec(v(3.2, -1.0), v(5.6, -1.0), { tone: tO, bold: !som, }));
    els.push(rect(5.7, 8.3, -1.0, 0.35, { fill: som ? undefined : "c", tone: tO, thin: true }), txt(v(7.0, -1.0), "düz kas / bez", "c", { small: true, tone: som ? "muted" : "ink" }));
    els.push(txt(v(1.4, -1.45), "öncesi", "c", { small: true, tone: tO }), txt(v(3.0, -1.7), "gangliyon", "c", { small: true, tone: tO }), txt(v(4.5, -1.45), "sonrası", "c", { small: true, tone: tO }));
    els.push(txt(v(-1.0, 2.7), " ", "c"), txt(v(8.6, -2.2), " ", "c"));
    return {
      els,
      readout: [
        som ? "Somatik: MSS → iskelet kası, arada gangliyon yok; istemli hareket ya da refleks olabilir." : "Otonom: MSS → gangliyon öncesi nöron → gangliyon → gangliyon sonrası nöron → düz kas, kalp kası ya da bez.",
        "Yalnız gangliyon görmek motor yol demek değildir; yönü ve hedefi de oku. Özel durumlar bu temel şemadan ayrılabilir.",
      ],
    };
  },
};

// 4 · Hastalık mekanizmaları.
const DISEASES = [
  { name: "MS", mech: "MSS miyelini", detail: ["Bağışıklıkla ilişkili hasar MSS’de miyelin ve sinir liflerini etkileyebilir.", "İletim yavaşlayabilir ya da kesintiye uğrayabilir; belirtiler herkeste aynı değildir.", "Çevresel Schwann hasarıyla özdeş değildir (MSS’de oligodendrosit)."] },
  { name: "Parkinson", mech: "dopaminli nöron kaybı", detail: ["Orta beyindeki substantia nigra’nın dopamin üreten nöronları kaybolur.", "Hareket yavaşlığı, sertlik, titreme gibi bulgularla ilişkilidir.", "Miyelin kaybı değildir; her titremenin adı da değildir."] },
  { name: "Alzheimer", mech: "amiloid ve tau", detail: ["İlerleyici nöron/ağ işlev bozukluğu; bellek ve diğer bilişsel yetiler etkilenir.", "Amiloid plakları ve tau yumakları temel patolojik özelliklerdendir.", "Normal yaşlanma ya da her unutkanlıkla eş anlamlı değildir."] },
  { name: "Epilepsi", mech: "anormal elektriksel etkinlik", detail: ["Tekrarlayan nöbetlere yatkınlık içeren hastalık grubu.", "Her nöbette tüm vücut kasılması ya da bilinç kaybı olmaz.", "Tek nöbet tek başına epilepsi tanısı değildir; tetikleyici ≠ neden."] },
  { name: "Depresyon", mech: "çok etkenli", detail: ["Duygu durumu, ilgi, düşünme ve günlük işlevi etkileyebilir.", "Genetik, biyolojik, çevresel ve psikolojik etkenler birlikte rol oynar.", "“Tek bir kimyasal eksik” ya da “isteksizlik” açıklaması yetmez."] },
];

const diseases: FigureDef = {
  caption:
    "Beş başlığı ortak “sinir sistemi hastalığı” etiketiyle değil, mekanizmayla ayır. Bir başlığa tıkla: mekanizma ve kesinlik sınırı açılır. Bu, okul düzeyi ayrımdır; tanı ya da tedavi önerisi değildir.",
  alt: "Beş satır: MS merkezî miyelin, Parkinson dopaminli nöron kaybı, Alzheimer amiloid ve tau, epilepsi anormal elektriksel etkinlik, depresyon çok etkenli.",
  picks: DISEASES.map((d) => ({ label: d.name, title: `${d.name} · ${d.mech}`, detail: d.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    DISEASES.forEach((d, i) => {
      const y = -i * 0.85;
      const sel = pick === i;
      if (sel) els.push(rect(-0.2, 7.0, y, 0.36, { fill: "a", tone: "a", thin: true }));
      els.push(txt(v(0, y), d.name, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(6.8, y), d.mech, "w", { small: true, tone: "muted" }));
    });
    els.push(txt(v(-0.4, 0.6), " ", "c"), txt(v(7.2, -4.0), " ", "c"));
    return {
      els,
      readout: [pick >= 0 ? DISEASES[pick].detail[0] : "Bir başlığa tıkla ya da aşağıdan seç.", "Tek belirtiden kesin hastalık çıkarma; mekanizma ipucu ile klinik değerlendirme farklı kanıt düzeyidir."],
    };
  },
};

export const biologyFiguresPns: Record<string, Record<string, FigureDef>> = {
  "sinir-sistemi-css-hastaliklar": {
    "ÇSS bir haberleşme ağıdır": tree,
    "Somatik yolun hedefi iskelet kasıdır; her yanıt istemli değildir": targets,
    "Otonom temel yolakta iki motor hücreyi izle": pathway,
    "Miyelin ve dopaminerjik ağ bozuklukları farklıdır": diseases,
  },
};
