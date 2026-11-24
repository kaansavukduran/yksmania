import { type El, type FigureDef } from "./figureKit";
import { A, B, L, PL, T, mk, tableFig } from "./biologyFigures060Kit";
import { graph } from "./biologyFigures061Kit";

/*
 * AYT Biyoloji · Döllenme-çimlenme ve bağışıklık (Forge061). Eğriler nitel
 * öğretim şemasıdır, ölçekli değildir: sıcaklık bölgeleri, yaş ve kuru kütle,
 * birincil ve ikincil yanıt için gerçek sayı verilmez. Sayılar bölüm metninden
 * gelir: n + n = 2n zigot, n + n + n = 3n endosperm, AAa; hazır A antikoru 32
 * birimle başlar ve modeldeki yapay yarı ömür 4 gündür. Tanı ya da tedavi
 * bilgisi değildir.
 */

/* ---------------- Döllenme ve çimlenme ---------------- */

const FUSE = [
  { name: "Birinci birleşme", txt: "Sperm (n) + yumurta (n) = zigot (2n): embriyonun başlangıcı." },
  { name: "İkinci birleşme", txt: "Sperm (n) + iki polar çekirdek (n + n) = 3n: birincil endosperm çekirdeği." },
  { name: "Toplam", txt: "Beş haploit çekirdek katkı verir (2 sperm, 1 yumurta, 2 polar); iki ürün oluşur." },
];
const double = mk({
  caption:
    "Çift döllenmede ne çift? (bölümdeki tipik model): iki sperm çekirdeği iki farklı hedefle birleşir. Birinci birleşme 2n zigotu, ikinci birleşme 3n birincil endosperm çekirdeğini verir; iki zigot ya da iki embriyo zorunlu sonucu değildir.",
  alt: "İki satır: üstte sperm n artı yumurta n oku zigot 2n kutusuna; altta sperm n artı iki polar çekirdek n artı n oku endosperm 3n kutusuna. Adımlar satırları sırayla vurgular.",
  h: 260,
  steps: FUSE.map((f) => f.name),
  draw: (_v, step) => {
    const on1 = step !== 1;
    const on2 = step !== 0;
    const row = (y: number, items: string[], out: string, on: boolean): El[] => {
      const els: El[] = [];
      const xs = items.length === 2 ? [56, 186] : [56, 166, 276];
      items.forEach((it, i) => {
        els.push(...B(xs[i], y, it, { w: 100, tone: on ? (i === 0 ? "c" : "warn") : "muted" }));
        if (i < items.length - 1) els.push(T((xs[i] + xs[i + 1]) / 2, y, "+", "c", { tone: on ? "ink" : "muted", bold: true }));
      });
      els.push(A(xs[xs.length - 1] + 54, y, 344, y, on ? "a" : "muted"), ...B(432, y, out, { w: 160, tone: on ? "a" : "muted", fill: on ? "a" : undefined, bold: on }));
      return els;
    };
    const els = [...row(60, ["sperm\nn", "yumurta\nn"], "zigot: 2n", on1), ...row(190, ["sperm\nn", "polar\nn", "polar\nn"], "endosperm: 3n", on2)];
    return { els, readout: [FUSE[step].txt, "Polar çekirdekler önceden birleşmişse 2n + n = 3n yazılır; ebeveyn katkısı aynıdır."] };
  },
});

const locus = tableFig({
  caption:
    "Tek lokusta ebeveyn katkısı (bölümdeki örnek): anne ve baba Aa, yumurta A, sperm a ise embriyo Aa, endosperm AAa olur; tohum kabuğu anne bitkinin örtülerinden gelir ve Aa'dır. Tek genli izleme modeli, bütün tohum özelliklerinin tek lokusla belirlendiği iddiası değildir.",
  alt: "Üç satırlı tablo: embriyo yumurta A ve sperm a, genotip Aa; endosperm iki polar A ve sperm a, AAa; tohum kabuğu anne örtüsü, Aa.",
  headers: ["Yapı", "Katkı", "Genotip"],
  rows: [
    ["Embriyo", "yumurta A +\nsperm a", "Aa"],
    ["Endosperm", "polar A + A +\nsperm a", "AAa"],
    ["Tohum kabuğu", "anne örtüsü", "Aa (anne)"],
  ],
  readout: ["Yumurtanın A taşıması kabuğu AA yapmaz; kabuk anne dokusudur.", "Endosperm: iki maternal, bir paternal takım."],
});

const fruits = tableFig({
  caption:
    "Basit, küme ve bileşik meyve (bölüm metninden): ölçüt çiçek ve yumurtalık sayısıdır; yenilen parçanın büyüklüğü ya da tohum sayısı değildir.",
  alt: "Üç satırlı tablo: basit meyve bir çiçek, tek yumurtalık, kiraz; küme meyve bir çiçek, birden fazla ayrı yumurtalık, böğürtlen; bileşik meyve birçok çiçek, birlikte gelişen yumurtalıklar, ananas ve dut.",
  headers: ["Tür", "Çiçek", "Yumurtalık", "Örnek"],
  rows: [
    ["Basit", "bir", "tek", "kiraz"],
    ["Küme", "bir", "birden\nfazla ayrı", "böğürtlen"],
    ["Bileşik", "birçok", "birlikte\ngelişen", "ananas, dut"],
  ],
  readout: ["Elma ve çilekte çiçek tablası gibi ek dokular da yenilen yapıya katılır.", "Partenokarpiyle döllenmesiz meyve gelişebilir."],
});

const temp = mk({
  caption:
    "Sıcaklık aralığı ve hız (nitel eğri, ölçekli değil): türe ve tohum partisine bağlı alt, uygun ve üst bölgeler vardır; belli aralıkta artış hızı artırır, daha da artması hızı düşürür. Bütün bitkiler için tek optimum yoktur; eksende sayı verilmez.",
  alt: "Yatay eksen sıcaklık, düşey eksen çimlenme hızı. Eğri alt sınırda sıfırdan başlayıp uygun bölgede tepe yapıyor ve üst sınırda yeniden sıfıra iniyor. Altta alt, uygun ve üst bölge etiketleri.",
  h: 280,
  draw: () => {
    const g = graph({ x0: 60, yb: 220, w: 430, h: 180, xmax: 10, ymax: 1.1, xl: "sıcaklık", yl: "hız" });
    const f = (x: number) => (x < 2 || x > 9 ? 0 : x <= 6.5 ? ((x - 2) / 4.5) ** 1.3 : 1 - ((x - 6.5) / 2.5) ** 1.6);
    const els: El[] = [...g.els, PL(g.plot(f, 0, 10, 60), { open: true, bold: true, tone: "a" })];
    for (const x of [2, 6.5, 9]) els.push(L(g.X(x), 220, g.X(x), 234, { tone: "muted" }));
    els.push(T(g.X(2), 256, "alt sınır", "c", { tone: "b" }), T(g.X(6.5), 256, "uygun", "c", { tone: "a", bold: true }), T(g.X(9), 256, "üst sınır", "c", { tone: "warn" }));
    return { els, readout: ["Optimumu bir türden başka türe ya da farklı evreye aktarma.", "Hız eğrisi bir öğretim modelidir; gerçek veri değildir."] };
  },
});

const mass = mk({
  caption:
    "Yaş kütle ve kuru kütle (nitel eğri, ölçekli değil): erken çimlenmede su alımı yaş kütleyi artırır, depoların solunumda kullanılması kuru organik kütleyi azaltır; yeşil organlar fotosenteze başlayınca net kuru kütle üretim ve solunumun toplamına bağlıdır.",
  alt: "Yatay eksen zaman, düşey eksen kütle. Yaş kütle eğrisi hızla yükseliyor; kuru kütle eğrisi önce azalıyor, fotosentez başlangıcını gösteren kesik çizgiden sonra yükseliyor.",
  h: 280,
  draw: () => {
    const g = graph({ x0: 76, yb: 230, w: 414, h: 190, xmax: 10, ymax: 1.25, xl: "zaman", yl: "kütle" });
    const wet = (x: number) => 0.3 + 0.6 * (1 - Math.exp(-x / 2.2));
    const dry = (x: number) => (x <= 5 ? 0.35 - 0.012 * x * x : 0.05 + 0.05 * (x - 5) ** 1.5);
    const els: El[] = [...g.els, PL(g.plot(wet), { open: true, bold: true, tone: "c" }), PL(g.plot(dry), { open: true, bold: true, tone: "warn" }), L(g.X(5), 230, g.X(5), 50, { dash: true, thin: true, tone: "muted" })];
    els.push(T(g.X(8.6), g.Y(wet(8.6)) - 22, "yaş kütle", "c", { tone: "c", bold: true }), T(g.X(2.6), g.Y(dry(2.6)) + 26, "kuru kütle", "c", { tone: "warn", bold: true }), T(g.X(5) + 2, 40, "fotosentez başlar", "e", { tone: "muted" }));
    return { els, readout: ["Ölçülen parçayı ve dönemi belirt: yalnız embriyo ile bütün tohum aynı bilanço değildir.", "Büyüyen embriyonun kütlesi artarken depo dokunun kütlesi azalabilir."] };
  },
});

/* ---------------- Bağışıklık ---------------- */

const layers = tableFig({
  caption:
    "Savunma katmanları işbirliği yapar (bölümdeki öğretim düzeni): birinci, ikinci ve üçüncü hat mekanizmaları gruplamaya yardım eder; gerçekte basamaklar biri bitince diğeri başlayacak biçimde yalıtık değildir.",
  alt: "Üç satırlı tablo: birinci hat deri, mukoza, lizozim, mide asidi; ikinci hat fagositler, inflamasyon, ateş, kompleman, interferon, NK; üçüncü hat B ve T lenfositleri, bellek.",
  headers: ["Hat", "Örnek mekanizma"],
  rows: [
    ["Birinci", "deri, mukoza,\nlizozim, mide asidi"],
    ["İkinci", "fagosit, inflamasyon,\nkompleman, NK"],
    ["Üçüncü", "B ve T lenfosit,\nbellek"],
  ],
  readout: ["Doğal bağışıklık yaygın örüntüleri tanır; rastgele bir güç değildir.", "Doğal yanıt antijen sunumuyla özgül yanıtın başlamasını da etkiler."],
});

const humoral = mk({
  caption:
    "B hücresinden plazma hücresine (nitel akış şeması): uygun B hücresi antijenle karşılaşır ve gereken yardımcı sinyallerle etkinleşip çoğalır; hücrelerin bir bölümü antikor salgılayan plazma hücresine, bir bölümü bellek hücresine farklılaşır.",
  alt: "Üstte antijen ve yardımcı sinyal oklarının girdiği B hücresi kutusu, altında çoğalma kutusu; çoğalmadan sola plazma hücresi ve antikor, sağa bellek hücresi kutusu.",
  h: 340,
  draw: () => {
    const els: El[] = [
      ...B(110, 34, "Antijen", { w: 150, tone: "warn" }),
      ...B(422, 34, "Yardımcı sinyal", { w: 190, tone: "c" }),
      A(150, 56, 230, 100, "warn"),
      A(380, 56, 302, 100, "c"),
      ...B(266, 122, "Uygun B hücresi", { tone: "b", fill: "b", bold: true }),
      A(266, 144, 266, 176, "ink"),
      ...B(266, 198, "Etkinleşme, çoğalma"),
      A(220, 220, 140, 262, "ink"),
      A(312, 220, 392, 262, "ink"),
      ...B(130, 296, "Plazma hücresi:\nantikor", { w: 210, tone: "a", fill: "a" }),
      ...B(402, 296, "Bellek hücresi", { w: 210, tone: "b" }),
    ];
    return { els, readout: ["Grubun bütün hücreleri aynı anda aynı miktarda antikor salgılamaz.", "Antikor nötralizasyon ve hedefin tanınmasına yardımla etki gösterebilir."] };
  },
});

const memory = mk({
  caption:
    "İlk karşılaşma ve antijene özgü bellek (nitel eğri, ölçekli değil): birincil yanıtta uygun klonların çoğalması zaman alır; aynı antijenle yeniden karşılaşmada bellek hücreleri daha hızlı ve güçlü yanıtı destekleyebilir. Her kişinin kesin hiç hastalanmayacağı anlamına gelmez.",
  alt: "Yatay eksen zaman, düşey eksen yanıt. İki karşılaşma işareti; birincisinden sonra gecikmeli ve küçük tepe, ikincisinden sonra daha hızlı yükselen büyük tepe.",
  h: 280,
  draw: () => {
    const g = graph({ x0: 76, yb: 230, w: 414, h: 170, xmax: 10, ymax: 1.05, xl: "zaman", yl: "yanıt" });
    const bump = (x: number, at: number, h: number, lag: number, wid: number) => (x < at + lag ? 0 : h * ((x - at - lag) / wid) * Math.exp(1 - (x - at - lag) / wid));
    const f = (x: number) => bump(x, 0.5, 0.3, 0.8, 0.9) + bump(x, 5.5, 0.9, 0.2, 0.8);
    const els: El[] = [...g.els, PL(g.plot(f, 0, 10, 80), { open: true, bold: true, tone: "a" })];
    els.push(A(g.X(0.5), 40, g.X(0.5), 70, "warn"), A(g.X(5.5), 40, g.X(5.5), 70, "warn"));
    els.push(T(g.X(0.5) + 2, 28, "ilk karşılaşma", "e", { tone: "warn" }), T(g.X(5.5) + 2, 28, "aynı antijen", "e", { tone: "warn" }));
    els.push(T(g.X(2.2), g.Y(0.3) - 24, "birincil", "c", { tone: "a" }), T(g.X(7.6), g.Y(0.9) + 4, "ikincil", "e", { tone: "a", bold: true }));
    return { els, readout: ["A antijenine ait bellek, farklı B antijeni için otomatik bellek değildir.", "Zaman ekseni, antijen türü ve yanıt büyüklüğü birlikte okunur."] };
  },
});

const activePassive = tableFig({
  caption:
    "Aktif kazanım ile hazır antikor desteği (bölüm metninden): ayrım ürünün adına değil, yanıtın kimde üretildiğine dayanır. Pasif destek daha hızlı başlayabilir ama alıcıda otomatik özgül bellek kurmaz; koruma süresi hedefe, ürüne ve kişiye göre değişir.",
  alt: "Dört satırlı tablo: aktif bağışıklıkta yanıtı kişinin kendisi üretir, örnekler doğal karşılaşma ve aşı, bellek oluşabilir; pasif bağışıklıkta hazır antikor alınır, örnekler antiserum ve anneden geçen antikor, alıcıda otomatik bellek oluşmaz.",
  headers: ["", "Aktif", "Pasif"],
  rows: [
    ["Yanıt", "kişinin\nkendisi", "hazır\nantikor"],
    ["Örnek", "karşılaşma,\naşı", "antiserum,\nanneden IgG"],
    ["Bellek", "oluşabilir", "otomatik\noluşmaz"],
    ["Başlama", "zaman alır", "daha hızlı\nolabilir"],
  ],
  readout: ["Plasentayla geçen IgG ve sütteki salgısal IgA farklı yol ve bölgede görev yapar.", "Her aşı ömür boyu tam koruma demek değildir."],
});

const halfLife = mk({
  caption:
    "Özgüllük ve azalma hesabı ayrı koşullardır (bölümdeki model: hazır A antikoru 32 birim, yapay yarı ömür 4 gün): her 4 günde miktar yarıya iner, 8 günde 8 birim kalır. Miktar ne olursa olsun hedef B ise A antikoru B'ye bağlanmaz. Yarı ömür gerçek antikorların ortak ölçümü değildir.",
  alt: "Yatay eksen gün, düşey eksen antikor birimi. 0, 4, 8, 12 ve 16. günlerde yarılanan basamaklı eğri; seçili gün noktası işaretli. Sürgü günü 0 ile 16 arasında değiştirir.",
  h: 280,
  param: { label: "Gün", min: 0, max: 16, step: 4, init: 8 },
  draw: (d) => {
    const g = graph({ x0: 76, yb: 230, w: 400, h: 180, xmax: 16, ymax: 36, xl: "gün", yl: "birim", xlBelow: true });
    const f = (x: number) => 32 * 0.5 ** (x / 4);
    const els: El[] = [...g.els, PL(g.plot(f, 0, 16, 64), { open: true, bold: true, tone: "b" })];
    for (const x of [0, 4, 8, 12, 16]) els.push(L(g.X(x), 230, g.X(x), 236, { tone: "muted" }));
    for (const x of [0, 4, 8, 12]) els.push(T(g.X(x), 256, String(x), "c", { tone: "muted" }));
    const v = f(d);
    els.push(L(g.X(d), 230, g.X(d), g.Y(v), { tone: "warn", dash: true }), T(d > 10 ? g.X(d) - 6 : g.X(d) + 6, g.Y(v) - 16, `${v} birim`, d > 10 ? "w" : "e", { tone: "warn", bold: true }));
    els.push(T(g.X(16), g.Y(32), "hedef B: bağlanma yok", "w", { tone: "muted" }));
    return { els, readout: [`${d} gün = ${d / 4} yarılanma: 32 × (1/2)^${d / 4} = ${v} birim.`, "Miktar ve eşleşme iki ayrı koşuldur."] };
  },
});

const lineage = mk({
  caption:
    "Kök hücreden olgun lenfosite ve karşılaşma yerine (nitel akış şeması): B ve T soyları kemik iliğindeki kan yapıcı kök hücrelerle ilişkilidir; insan B hücreleri kemik iliğinde, T hücreleri timusta olgunlaşır. Olgun hücreler lenf düğümü, dalak ve mukozal lenfoid dokularda antijenle karşılaşır.",
  alt: "Üstte kemik iliği kök hücre kutusu; sola B: kemik iliğinde olgunlaşma, sağa T: timusta olgunlaşma. İkisi de alttaki ikincil organlar kutusunda birleşiyor: lenf düğümü, dalak, mukozal doku.",
  h: 320,
  draw: () => {
    const els: El[] = [
      ...B(266, 34, "Kemik iliği: kök hücre", { tone: "warn", fill: "warn", bold: true }),
      A(210, 56, 140, 110, "ink"),
      A(322, 56, 392, 110, "ink"),
      ...B(130, 146, "B: kemik\niliğinde olgunlaşır", { w: 230, tone: "b" }),
      ...B(402, 146, "T: timusta\nolgunlaşır", { w: 230, tone: "c" }),
      A(150, 186, 230, 236, "b"),
      A(382, 186, 302, 236, "c"),
      ...B(266, 270, "İkincil organlar: lenf\ndüğümü, dalak, mukoza", { tone: "a", fill: "a" }),
    ];
    return { els, readout: ["Birincil olgunlaşma organı ile karşılaşmanın olduğu ikincil organ aynı sınıf değildir.", "Etkinleşme, çoğalma ve farklılaşma sonraki ayrı basamaklardır."] };
  },
});

export const biologyFigures061Seed: Record<string, Record<string, FigureDef>> = {
  "bitkilerde-dollenme-cimlenme": {
    "Çift döllenmede ne çift?": double,
    "Tek lokusta ebeveyn katkısı": locus,
    "Basit, küme ve bileşik meyve": fruits,
    "Sıcaklık aralığı ve hız": temp,
    "Yaş kütle, kuru kütle ve kaynak akışı": mass,
  },
  "bagisiklik-sistemi": {
    "Savunma katmanları işbirliği yapar": layers,
    "B hücresinden plazma hücresine humoral yanıt": humoral,
    "İlk karşılaşma ve antijene özgü bellek": memory,
    "Aktif kazanım ile hazır antikor desteği": activePassive,
    "Kök hücreden olgun lenfosite ve karşılaşma yerine": lineage,
    "Özgüllük ve azalma hesabını karıştırma": halfLife,
  },
};
