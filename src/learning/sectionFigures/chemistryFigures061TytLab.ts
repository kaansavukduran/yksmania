import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { pad, rect } from "./biologyFigures059Kit";
import { hbars } from "./chemistryFigures060Kit";
import { table } from "./biologyFigures059TytKit";
import { nf } from "./physicsFigures058Kit";
import { boardFig, stepsFig } from "./historyFigures059Kit";
import { flowPickFig, pickRows } from "./historyFigures061TytKit";

/*
 * TYT Kimya · Kimyada güvenlik, su ve hayat, doğa ve kimya, fiziksel ve
 * kimyasal değişimler (Forge061). Sayılar bölüm metinlerindendir: 12 L/dk
 * musluk, 5 dakikalık kullanım 60 L, günde üç kullanım; eski 60 L, yeni
 * 32 L, %46,67; debi ve süre yarıya inince %75; A 240 mg / 3 L, B 180 mg /
 * 1,5 L, C 50 mg / 1 L (öğretim verisi). İşaretler yalnız bölüm metninde
 * anlatılanlardır; çizimler şematiktir, resmî piktogramın birebir kopyası
 * değildir.
 */

/* ---------------- Kimyada güvenlik ---------------- */

const risk = flowPickFig({
  nodes: [
    { c: v(3.0, 4.2), w: 5.6, h: 1.25, s: "Tehlike · madde özelliği", tone: "warn", what: "Bir maddenin tehlikesi zarar verme özelliğidir; etiketteki işaret bunu gösterir." },
    { c: v(9.0, 4.2), w: 5.6, h: 1.85, s: "Koşullar · miktar, derişim · temas yolu, süre", tone: "b", what: "Risk değerlendirmesinde miktar, derişim, temas yolu, süre ve kullanılan önlemler de dikkate alınır." },
    { c: v(6.0, 1.4), w: 6.0, h: 1.25, s: "Risk · değerlendirmesi", tone: "a", what: "Tehlike bilgisi ile çalışma koşulları birlikte değerlendirilir; güvenlik bilgi formu ve öğretmenin yönergesi koşulları tamamlar." },
  ],
  edges: [
    { a: 0, b: 2 },
    { a: 1, b: 2 },
  ],
  caption:
    "Tehlike, maddenin zarar verme özelliğidir; risk ise bu özelliğin miktar, derişim, temas yolu, süre ve önlemlerle birlikte değerlendirilmesidir. Etiketteki işaret tek başına bir deneyin bütün çalışma koşullarını vermez. 'Kimyasal' sözcüğü 'zehirli' demek değildir; doğal, kokulu ya da renksiz olmak da güvenli olmayı kanıtlamaz.",
  alt: "Üstte iki kutu: solda 'Tehlike, madde özelliği', sağda 'Koşullar: miktar, derişim, temas yolu, süre'. İkisinden oklar alttaki 'Risk değerlendirmesi' kutusuna iniyor. Kutular seçilebilir.",
  foot: "Güvenli karar görüntüye değil, maddenin tanımlanmış özelliklerine ve kullanım koşuluna dayanır.",
  extra: pad(v(-0.1, 5.9), v(12.1, 0.3)),
});

function diamond(c: V, s: number, on: boolean): El {
  return poly([v(c[0], c[1] + s), v(c[0] + s, c[1]), v(c[0], c[1] - s), v(c[0] - s, c[1])], { tone: on ? "a" : "warn", bold: true });
}
function flame(c: V, k: number): El {
  return poly(
    [v(c[0] - 0.42 * k, c[1]), v(c[0] - 0.5 * k, c[1] + 0.45 * k), v(c[0] - 0.2 * k, c[1] + 0.9 * k), v(c[0] - 0.1 * k, c[1] + 0.55 * k), v(c[0] + 0.05 * k, c[1] + 1.2 * k), v(c[0] + 0.3 * k, c[1] + 0.7 * k), v(c[0] + 0.5 * k, c[1] + 0.4 * k), v(c[0] + 0.42 * k, c[1])],
    { tone: "ink", fill: "ink", smooth: true },
  );
}
const SIGNS = [
  { name: "Yanıcı", what: ["Alev işareti yangın tehlikesiyle ilişkili sınıfları belirtir.", "Önlem: ateş ve kıvılcım kaynaklarının kontrolü."] },
  { name: "Oksitleyici", what: ["Alev bir çember üzerindedir: madde başka maddelerin yanmasını başlatabilir veya şiddetlendirebilir; kendisinin yakıt gibi yanması demek değildir.", "Önlem: yanıcı ve oksitleyici maddeler uygun biçimde ayrı tutulur."] },
];
const flammable: FigureDef = {
  caption:
    "Alev işareti yangın tehlikesiyle ilişkili sınıfları, alevin bir çember üzerinde durduğu oksitleyici işareti ise başka maddelerin yanmasını başlatabilen veya şiddetlendirebilen maddeyi gösterir. Oksijen yanmayı destekler ama yakıtla aynı sınıfta değildir. İki şekli yalnız alev benzerliğiyle aynı sayma. Çizimler şematiktir.",
  alt: "Yan yana iki elmas çerçeve. Solda yalnız alev: Yanıcı. Sağda alevin altında bir çember: Oksitleyici. Adlar seçilebilir.",
  picks: SIGNS.map((s) => ({ label: s.name, title: s.name, detail: s.what })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const cs: V[] = [v(3.0, 2.4), v(9.0, 2.4)];
    cs.forEach((c, i) => {
      els.push(diamond(c, 1.9, pick === i));
      if (i === 0) els.push(flame(v(c[0], c[1] - 0.75), 1.2));
      else els.push(flame(v(c[0], c[1] - 0.1), 0.95), circle(v(c[0], c[1] - 0.55), 0.42, { tone: "ink", bold: true }));
      els.push(txt(v(c[0], 0.2), SIGNS[i].name, "s", { bold: true, tone: pick === i ? "a" : "ink", pick: i }));
    });
    els.push(...pad(v(0.6, 4.6), v(11.4, -0.8)));
    const sel = pick >= 0 ? SIGNS[pick] : undefined;
    return { els, readout: sel ? sel.what : ["Bir işaretin adına tıkla ya da aşağıdan seç.", "İşareti gördüğünde adı, tehlikeyi ve uygun önlemi birlikte söyle."] };
  },
};

const SIGN_ROWS: [string, string, string][] = [
  ["Aşındırıcı", "deri, göz, malzeme", "Deri, göz veya bazı malzemelerde aşındırma tehlikesi."],
  ["Kafatası", "akut toksisite", "Akut toksisite."],
  ["Ünlem", "tahriş, daha düşük kategori", "Tahriş gibi ilgili daha düşük kategorili sağlık tehlikeleri."],
  ["Yıldızlı silüet", "ciddi, uzun süreli sağlık", "Göğsünde yıldız biçimi bulunan insan silüeti: belirli ciddi veya uzun süreli sağlık tehlikeleri."],
  ["Bomba", "patlama", "Patlayan bomba patlama tehlikesiyle ilişkilidir."],
  ["Gaz tüpü", "basınç altındaki gaz", "Basınç altındaki gazlar."],
  ["Balık–ağaç", "sucul çevre", "Sucul çevre tehlikeleri."],
  ["Gözlük", "önlem, tehlike değil", "Zorunlu koruyucu donanım işaretidir: alınacak önlemi anlatır, maddenin tehlikesini değil."],
];
const otherSigns: FigureDef = {
  caption:
    "Tehlike işaretlerini etkileriyle ayır: aşındırıcı deri, göz ve malzeme; kafatası akut toksisite; ünlem tahriş gibi daha düşük kategorili sağlık tehlikesi; göğsünde yıldızlı silüet ciddi veya uzun süreli sağlık tehlikesi; bomba patlama; gaz tüpü basınçlı gaz; balık–ağaç sucul çevre. Gözlük işareti önlemdir, tehlike değildir. Aynı madde birden fazla işaret taşıyabilir.",
  alt: "Sekiz satırlık tablo, sütunlar işaret ve etki: Aşındırıcı (deri, göz, malzeme), Kafatası (akut toksisite), Ünlem (tahriş, daha düşük kategori), Yıldızlı silüet (ciddi, uzun süreli sağlık), Bomba (patlama), Gaz tüpü (basınç altındaki gaz), Balık–ağaç (sucul çevre), Gözlük (önlem, tehlike değil). Satırlar seçilebilir.",
  picks: SIGN_ROWS.map(([n, e, d]) => ({ label: n, title: `${n}: ${e}`, detail: [d] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [...pickRows(table(["işaret", "etki"], SIGN_ROWS.map(([n, e]) => [n, e]), [4.4, 7.6], { top: 8.1, rowH: 0.9, tone: (r) => (r === 7 ? "b" : r === 6 ? "c" : undefined), on: (r) => r === pick }), SIGN_ROWS.map((r) => r[0])), ...pad(v(-0.1, 8.3), v(12.1, -0.1))];
    const sel = pick >= 0 ? SIGN_ROWS[pick] : undefined;
    return { els, readout: [sel ? `${sel[0]}: ${sel[2]}` : "Bir işareti aşağıdan seç.", "Tehlike piktogramı maddenin tehlikesini, zorunlu donanım işareti alınacak önlemi anlatır; radyasyon işareti ayrı bir uyarı sistemidir."] };
  },
};

type Ware = { name: string; what: string; draw: (c: V) => El[] };
const WARE: Ware[] = [
  { name: "Beher", what: "Karıştırma, aktarma ve uygun koşullarda çözeltiyle çalışma; üzerindeki yaklaşık çizgiler hassas hacim ölçümünün yerine geçmez.", draw: (c) => [poly([v(c[0] - 0.75, c[1] + 1.4), v(c[0] - 0.6, c[1] + 1.25), v(c[0] - 0.6, c[1]), v(c[0] + 0.6, c[1]), v(c[0] + 0.6, c[1] + 1.4)], { open: true, tone: "ink", bold: true })] },
  { name: "Erlen", what: "Karıştırma, aktarma ve uygun koşullarda çözeltiyle çalışma.", draw: (c) => [poly([v(c[0] - 0.22, c[1] + 1.5), v(c[0] - 0.22, c[1] + 0.95), v(c[0] - 0.75, c[1]), v(c[0] + 0.75, c[1]), v(c[0] + 0.22, c[1] + 0.95), v(c[0] + 0.22, c[1] + 1.5)], { open: true, tone: "ink", bold: true })] },
  { name: "Mezür", what: "Dereceli silindir.", draw: (c) => [poly([v(c[0] - 0.25, c[1] + 1.6), v(c[0] - 0.25, c[1] + 0.12), v(c[0] + 0.25, c[1] + 0.12), v(c[0] + 0.25, c[1] + 1.6)], { open: true, tone: "ink", bold: true }), seg(v(c[0] - 0.5, c[1]), v(c[0] + 0.5, c[1]), { bold: true }), ...[0.5, 0.8, 1.1, 1.4].map((y) => seg(v(c[0] - 0.25, c[1] + y), v(c[0] - 0.05, c[1] + y), { thin: true }))] },
  { name: "Pipet", what: "Belirli küçük hacimleri daha hassas aktarır; ağızla değil pipet yardımcısıyla kullanılır.", draw: (c) => [seg(v(c[0], c[1]), v(c[0], c[1] + 0.55), { bold: true }), circle(v(c[0], c[1] + 0.8), 0.22, { tone: "ink", bold: true }), seg(v(c[0], c[1] + 1.02), v(c[0], c[1] + 1.65), { bold: true }), seg(v(c[0] - 0.12, c[1] + 1.4), v(c[0] + 0.12, c[1] + 1.4), { thin: true })] },
  { name: "Büret", what: "Kontrollü hacim verir; titrasyonda verilen hacmi izlemeye yarar.", draw: (c) => [poly([v(c[0] - 0.12, c[1] + 1.65), v(c[0] - 0.12, c[1] + 0.45), v(c[0] + 0.12, c[1] + 0.45), v(c[0] + 0.12, c[1] + 1.65)], { open: true, tone: "ink", bold: true }), seg(v(c[0] - 0.32, c[1] + 0.35), v(c[0] + 0.32, c[1] + 0.35), { bold: true }), seg(v(c[0], c[1] + 0.3), v(c[0], c[1]), { bold: true })] },
  { name: "Balon joje", what: "Belirli son hacimde çözelti hazırlamak için kalibre edilir; boynunda ölçü çizgisi vardır, sıradan ısıtma kabı değildir.", draw: (c) => [circle(v(c[0], c[1] + 0.45), 0.45, { tone: "ink", bold: true }), poly([v(c[0] - 0.1, c[1] + 0.88), v(c[0] - 0.1, c[1] + 1.65)], { open: true, bold: true, tone: "ink" }), poly([v(c[0] + 0.1, c[1] + 0.88), v(c[0] + 0.1, c[1] + 1.65)], { open: true, bold: true, tone: "ink" }), seg(v(c[0] - 0.22, c[1] + 1.3), v(c[0] + 0.22, c[1] + 1.3), { tone: "a" })] },
];
const glassware: FigureDef = {
  caption:
    "Araç seçimini amaç belirler: beher ve erlen karıştırma ve aktarma, mezür dereceli ölçüm, pipet küçük hacmi hassas aktarma, büret kontrollü hacim verme ve titrasyon, balon joje belirli son hacimde çözelti hazırlama içindir. 'Üzerinde çizgi var' tek başına eşit hassasiyet kanıtı değildir. Çizimler şematiktir, ölçekli değil.",
  alt: "İki satırda altı cam araç şeması: üstte beher, erlen, mezür; altta pipet, büret, balon joje (boynunda ölçü çizgisi). Adlar seçilebilir.",
  picks: WARE.map((w) => ({ label: w.name, title: w.name, detail: [w.what] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    WARE.forEach((w, i) => {
      const c = v(2.0 + (i % 3) * 4.0, i < 3 ? 3.1 : 0.2);
      els.push(...w.draw(c));
      els.push(txt(v(c[0], c[1] - 0.2), w.name, "s", { small: true, bold: true, tone: pick === i ? "a" : "ink", pick: i }));
    });
    els.push(...pad(v(0.4, 5.1), v(11.6, -1.0)));
    const sel = pick >= 0 ? WARE[pick] : undefined;
    return { els, readout: [sel ? `${sel.name}: ${sel.what}` : "Bir aracın adına tıkla ya da aşağıdan seç.", "Hangi aracın kalibre edildiği ve ölçüm koşulları önemlidir."] };
  },
};

const deliveredVolume: FigureDef = {
  caption: "Aynı bürette küçük okumadan büyük okumaya ilerleyince verilen hacim, son okuma eksi ilk okumadır. Bu çizim yalnız sayısal okumayı gösterir.",
  alt: "Büret ölçeği yukarıda sıfır, aşağıda 10 mL. İlk okuma 2 mL, değiştirilebilir son okuma başlangıçta 7,5 mL. İki okuma arasındaki aralık işaretli.",
  param: { label: "Son büret okuması (mL)", min: 2, max: 10, step: 0.5, init: 7.5 },
  draw: (reading) => {
    const first = 2;
    const y = (value: number) => 5 - value * 0.45;
    const els: El[] = [
      rect(2.8, y(10), 1.2, y(0) - y(10), { tone: "ink", thin: true }),
      ...(reading > first ? [rect(2.8, y(reading), 1.2, y(first) - y(reading), { tone: "b", fill: "b", thin: true })] : []),
      seg(v(3.4, y(10)), v(3.4, 0), { tone: "ink" }),
      txt(v(2.4, 5.4), "mL", "w", { small: true, bold: true }),
      ...[0, 2, 4, 6, 8, 10].flatMap((tick) => [
        seg(v(2.8, y(tick)), v(3.12, y(tick)), { tone: "ink", thin: true }),
        txt(v(2.5, y(tick)), String(tick), "w", { small: true }),
      ]),
      txt(v(4.35, y(first)), `İlk ${nf(first, 1)}`, "ne", { tone: "ink", small: true }),
      txt(v(4.35, y(reading)), `Son ${nf(reading, 1)}`, "se", { tone: "ink", small: true }),
      ...pad(v(1.35, 5.85), v(7.0, -0.45)),
    ];
    return { els, readout: [`Verilen hacim ${nf(reading, 1)} − ${nf(first, 1)} = ${nf(reading - first, 1)} mL.`] };
  },
};

/* ---------------- Su ve hayat ---------------- */

const FLOW = 12;
const budget: FigureDef = {
  caption:
    "Debi birim zamanda geçen hacimdir: hacim = debi × süre. 12 L/dk akan muslukta 5 dakikalık tek kullanım 60 L, günde üç kullanım 180 L eder. Dikdörtgenin yüksekliği debi, genişliği süre, alanı hacimdir; L/dk ile dakika çarpılınca dakika sadeleşir, litre kalır.",
  alt: "Yüksekliği 12 L/dk debiyi, genişliği süreyi gösteren dikdörtgen; içinde hacim yazılı. Sürgü süreyi 1–10 dakika arasında değiştirir.",
  param: { label: "Kullanım süresi (dk)", min: 1, max: 10, step: 1, init: 5 },
  draw: (t) => {
    const W = 0.95;
    const H = 0.25;
    const V = FLOW * t;
    const els: El[] = [
      seg(v(0, 0), v(10.4, 0), { tone: "muted" }),
      seg(v(0, 0), v(0, FLOW * H + 0.4), { tone: "muted" }),
      rect(0, 0, t * W, FLOW * H, { tone: "b", fill: "b", thin: true }),
      txt(v((t * W) / 2, (FLOW * H) / 2), `${V} L`, "c", { small: true, bold: true }),
      txt(v(-0.12, FLOW * H), "12 L/dk", "w", { small: true, tone: "muted" }),
      txt(v(t * W, -0.15), `${t} dk`, "s", { small: true, tone: "muted" }),
      ...pad(v(-2.0, FLOW * H + 0.8), v(10.6, -0.9)),
    ];
    return { els, readout: [`12 L/dk × ${t} dk = ${V} L; günde üç kullanım: 3 × ${V} = ${3 * V} L.`, "Kaçak kaybı kullanım dışı ayrı bir kalemdir."] };
  },
};

const saving: FigureDef = {
  caption:
    "Tasarruf yüzdesinin tabanı eski tüketimdir: eski 60 L, yeni 32 L ise fark 28 L ve 28/60 ≈ %46,67. Yeni hacmi payda seçersen başka bir soruya, artış oranına cevap verirsin. Debi ve süre birlikte yarıya inerse hacim dörtte birine iner: tasarruf %75, %50 + %50 değil.",
  alt: "Üç adım. 1: eski 60 L ve yeni 32 L çubukları, fark 28 L. 2: aynı fark yanlış paydayla (32). 3: 12 L/dk × 5 dk dikdörtgeni ve içinde 6 L/dk × 2,5 dk dikdörtgeni; alan dörtte bir.",
  steps: ["Eski tabana göre", "Yanlış payda", "Debi ve süre yarıya"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step < 2) {
      els.push(...hbars([{ label: "eski", value: 60, tone: "b", text: "60 L" }, { label: "yeni", value: 32, tone: "c", text: "32 L" }], { x0: 1.6, y0: 2.6, w: 8.4, max: 60, gap: 1.1, h: 0.6 }));
      els.push(seg(v(1.6 + 8.4 * (32 / 60), 1.2), v(1.6 + 8.4 * (32 / 60), 3.1), { tone: "a", dash: true, thin: true }), txt(v(1.6 + 8.4 * (46 / 60), 0.85), "fark 28 L", "c", { small: true, bold: true, tone: "a" }));
      els.push(...pad(v(0.2, 3.4), v(11.8, 0.3)));
      return { els, readout: step === 0 ? ["(60 − 32) / 60 × 100 ≈ %46,67 tasarruf.", "Günlük farkı 30 ile çarpmak yalnız her gün aynı düzen varsayımıyla geçerlidir."] : ["28 / 32 × 100 = %87,5: bu, 32'den 60'a artış oranıdır, tasarruf değil.", "Payda soruya göre seçilir: tasarrufta eski tüketim."] };
    }
    const W = 0.8;
    const H = 0.25;
    els.push(rect(0, 0, 5 * W, 12 * H, { tone: "b", thin: true }), rect(0, 0, 2.5 * W, 6 * H, { tone: "c", fill: "c", thin: true }));
    els.push(txt(v(1.0, 0.75), "15 L", "c", { small: true, bold: true }), txt(v(3.0, 2.4), "60 L", "c", { small: true, bold: true }));
    els.push(txt(v(5 * W + 0.3, 12 * H), "12 L/dk × 5 dk", "e", { small: true }), txt(v(5 * W + 0.3, 6 * H), "6 L/dk × 2,5 dk", "e", { small: true, tone: "c" }));
    els.push(...pad(v(-0.2, 3.4), v(11.6, -0.4)));
    return { els, readout: ["Yeni hacim 6 × 2,5 = 15 L = 60 L'nin dörtte biri: tasarruf (60 − 15) / 60 = %75.", "Aynı suyu etkileyen önlemlerin yüzdeleri körlemesine toplanmaz."] };
  },
};

const SAMPLES: [string, number, number][] = [
  ["A", 240, 3],
  ["B", 180, 1.5],
  ["C", 50, 1],
];
const concentration: FigureDef = {
  caption:
    "Toplam miktar, farklı hacimli örnekleri sıralamaya yetmez; önce aynı birime geç. Aynı CaCO₃ eşdeğeri tanımıyla A: 240 mg / 3 L = 80 mg/L, B: 180 mg / 1,5 L = 120 mg/L, C: 50 mg / 1 L = 50 mg/L. A'nın toplamı büyük, B'nin derişimi büyüktür. Değerler bölümdeki öğretim verisidir.",
  alt: "İki adım. 1: A, B, C için toplam mg çubukları (240, 180, 50). 2: aynı örnekler için mg/L çubukları (80, 120, 50). Çubuk boyları değerlerle orantılı.",
  steps: ["Toplam kütle (mg)", "Derişim (mg/L)"],
  draw: (_v, step) => {
    const rows = SAMPLES.map(([s, mg, L], i) => {
      const val = step ? mg / L : mg;
      return { label: s, value: val, tone: (["b", "warn", "c"] as Tone[])[i], text: step ? `${mg}/${nf(L, 1)} = ${nf(val, 0)} mg/L` : `${mg} mg` };
    });
    const els: El[] = [...hbars(rows, { x0: 1.0, y0: 2.6, w: 6.4, max: step ? 120 : 240, gap: 1.0, h: 0.55 }), ...pad(v(0.0, 3.2), v(11.8, 0.2))];
    return { els, readout: step ? ["Derişim sırası B > A > C.", "'mg/L CaCO₃ eşdeğeri' ortak ölçektir; suda o kadar CaCO₃ molekülü olduğu anlamına gelmez."] : ["Toplam kütle sırası A > B > C.", "Toplam kütle ile derişim farklı sorulara cevap verir."] };
  },
};

/* ---------------- Doğa ve kimya ---------------- */

const CYCLE = [
  { s: "Buharlaşma", what: "Su buhara dönüşür; birçok çözünmüş tuz geride kalabilir, uçucu kirleticiler farklı davranabilir." },
  { s: "Yoğuşma", what: "Buhar bulutta damlacıklara dönüşür." },
  { s: "Yağış", what: "Yağmur suyu havadaki maddelerle yeniden kirlenebilir." },
  { s: "Yüzey akışı", what: "Toplandığı yüzeylerle su yeniden kirlenebilir." },
  { s: "Yeraltına sızma", what: "Su toprağa sızıp yeraltına ulaşır." },
];
const waterCycle: FigureDef = {
  caption:
    "Buharlaşma, yoğuşma, yağış, yüzey akışı ve yeraltına sızma suyun çevrimini oluşturur. Buharlaşmada birçok tuz geride kalabilir, ama yağmur suyu havadaki maddelerle ve toplandığı yüzeylerle yeniden kirlenebilir: doğal döngü her suyu otomatik içilebilir yapmaz. Şematik, ölçekli değil.",
  alt: "Şematik su döngüsü: sağda deniz, solda yükselen kara, üstte bulut. Denizden buluta 'buharlaşma' oku, bulutta 'yoğuşma', buluttan karaya kesik 'yağış' çizgileri, karadan denize 'yüzey akışı' oku, karadan aşağı 'yeraltına sızma' oku ve yeraltı suyu katmanı. Adımlarla süreçler sırayla vurgulanır.",
  steps: CYCLE.map((c) => c.s),
  draw: (_v, step) => {
    const els: El[] = [];
    const hi = (i: number): Tone => (i === step ? "a" : "muted");
    els.push(poly([v(7.4, 0.9), v(12, 0.9), v(12, 0), v(7.4, 0)], { tone: "b", fill: "b", thin: true }), txt(v(9.7, 0.45), "deniz", "c", { small: true }));
    els.push(poly([v(0, 0), v(0, 2.0), v(2.4, 2.6), v(5.0, 1.7), v(7.4, 0.9), v(7.4, 0)], { tone: "c", fill: "c", thin: true }));
    els.push(seg(v(0, -0.7), v(7.4, -0.7), { tone: "b", dash: true }), txt(v(3.7, -0.85), "yeraltı suyu", "s", { small: true, tone: "b" }));
    for (const [x, y, r] of [[4.4, 5.0, 0.5], [5.0, 5.2, 0.6], [5.7, 5.0, 0.5]] as [number, number, number][]) els.push(circle(v(x, y), r, { tone: "muted", fill: "muted", thin: true }));
    els.push(vec(v(9.6, 1.1), v(6.6, 4.6), { tone: hi(0), bold: step === 0 }), txt(v(9.0, 2.9), "buharlaşma", "e", { small: true, bold: step === 0, tone: step === 0 ? "a" : "ink" }));
    els.push(txt(v(5.0, 5.95), "yoğuşma", "n", { small: true, bold: step === 1, tone: step === 1 ? "a" : "ink" }));
    for (const x of [3.6, 4.4, 5.2]) els.push(seg(v(x, 4.3), v(x - 0.4, 3.0), { tone: hi(2), dash: true, bold: step === 2 }));
    els.push(txt(v(3.2, 3.6), "yağış", "w", { small: true, bold: step === 2, tone: step === 2 ? "a" : "ink" }));
    els.push(vec(v(5.2, 1.85), v(7.2, 1.05), { tone: hi(3), bold: step === 3 }), txt(v(6.3, 1.65), "yüzey akışı", "ne", { small: true, bold: step === 3, tone: step === 3 ? "a" : "ink" }));
    els.push(vec(v(1.6, 1.9), v(1.6, -0.55), { tone: hi(4), bold: step === 4 }), txt(v(1.75, 0.9), "sızma", "e", { small: true, bold: step === 4, tone: step === 4 ? "a" : "ink" }));
    els.push(...pad(v(-0.2, 6.6), v(12.2, -1.6)));
    const c = CYCLE[step];
    return { els, readout: [`${c.s}: ${c.what}`, "Berraklık çözünmüş kirletici veya mikroorganizma yokluğunu kanıtlamaz."] };
  },
};

const eutrophication = stepsFig({
  items: [
    { s: "Fosfat, nitrat girdisi", what: "Fazla besin girdileri suya ulaşır." },
    { s: "Alg ve üretici çoğalması", what: "Bazı sularda alg ve diğer üreticilerin aşırı çoğalmasını destekleyebilir." },
    { s: "Organik madde ayrışması", what: "Çoğalan üreticilerden oluşan organik madde ayrışır." },
    { s: "Çözünmüş O₂ tüketimi", what: "Ayrışma çözünmüş oksijeni tüketir.", tone: "warn" },
    { s: "Diğer canlılar etkilenir", what: "Oksijen azalması diğer canlıları etkileyebilir.", tone: "warn" },
  ],
  caption:
    "Ötrofikasyon zinciri: besin girdisi (fosfat, nitrat) → alg ve üreticilerin aşırı çoğalması → organik maddenin ayrışması → çözünmüş oksijenin tüketilmesi → diğer canlıların etkilenmesi. Zinciri kurmak, yalnız suyun rengine bakmaktan daha açıklayıcıdır.",
  alt: "Yukarıdan aşağıya beş kutu oklarla bağlı: Fosfat, nitrat girdisi; Alg ve üretici çoğalması; Organik madde ayrışması; Çözünmüş O₂ tüketimi; Diğer canlılar etkilenir.",
  foot: "Her deterjan aynı formülde değildir; bütün ürünlere tek fosfat miktarı atanmaz.",
  w: 7,
});

const atmosphere: FigureDef = {
  caption:
    "Sera etkisi ile ozon incelmesi aynı mekanizma değildir. Troposferde CO₂, CH₄ ve su buharı gibi sera gazları yeryüzünden yayılan kızılötesi ışınımla etkileşir; yere yakın ozon hava kirleticisi olabilir. Stratosferdeki ozon Güneş'ten gelen morötesi ışınımın bir bölümünü soğurur. Katman kalınlıkları ölçekli değil.",
  alt: "Üst üste katmanlar: altta yeryüzü, üstünde troposfer (sera gazları CO₂, CH₄, su buharı; yere yakın ozon kirletici), en üstte stratosfer (ozon tabakası). Yukarıdan gelen 'morötesi' oku stratosferde kısalıyor; yeryüzünden çıkan 'kızılötesi' oku troposferde geri kıvrılıyor.",
  draw: () => {
    const els: El[] = [];
    els.push(rect(0, 0, 12, 0.5, { tone: "c", fill: "c", thin: true }), txt(v(6, 0.25), "yeryüzü", "c", { small: true }));
    els.push(rect(0, 0.5, 12, 3.0, { tone: "muted", thin: true }), txt(v(0.2, 2.7), "troposfer", "e", { small: true, bold: true }));
    els.push(rect(0, 3.0, 12, 5.0, { tone: "muted", thin: true }), txt(v(0.2, 4.7), "stratosfer", "e", { small: true, bold: true }));
    els.push(rect(3.6, 3.6, 12, 4.2, { tone: "b", fill: "b", thin: true }), txt(v(7.8, 3.9), "ozon tabakası", "c", { small: true, bold: true }));
    els.push(txt(v(4.4, 1.9), "sera gazları: CO₂, CH₄, su buharı", "c", { small: true }));
    els.push(txt(v(4.4, 1.0), "yere yakın ozon: kirletici", "c", { small: true, tone: "warn" }));
    els.push(vec(v(10.0, 5.6), v(10.0, 4.3), { tone: "a" }), seg(v(10.0, 4.3), v(10.0, 3.0), { tone: "a", dash: true, thin: true }), txt(v(10.15, 5.45), "morötesi", "e", { small: true, tone: "a" }));
    els.push(poly([v(9.0, 0.55), v(9.0, 2.2), v(9.4, 2.6), v(9.8, 2.2), v(9.8, 1.0)], { tone: "warn", open: true, smooth: true }), vec(v(9.8, 1.2), v(9.8, 0.75), { tone: "warn" }), txt(v(8.85, 2.3), "kızılötesi", "w", { small: true, tone: "warn" }));
    els.push(...pad(v(-0.2, 6.0), v(12.2, -0.3)));
    return { els, readout: ["CFC gibi ozon incelmesine katkı verenlerle sera gazları kısmen örtüşebilir ama mekanizmalar farklıdır.", "Bir gazın doğal bulunması, artan derişimin etkisiz olduğu anlamına gelmez."] };
  },
};

/* ---------------- Fiziksel ve kimyasal değişimler ---------------- */

function h2o(els: El[], o: V, k = 0.8) {
  els.push(ball(v(o[0] - 0.36 * k, o[1] - 0.26 * k), 0.16 * k, "b"), ball(v(o[0] + 0.36 * k, o[1] - 0.26 * k), 0.16 * k, "b"), ball(o, 0.26 * k, "warn"));
}
function pair(els: El[], o: V, tone: Tone, r = 0.2) {
  els.push(ball(v(o[0] - r * 0.95, o[1]), r, tone), ball(v(o[0] + r * 0.95, o[1]), r, tone));
}
const CLOSE: V[] = [v(0.9, 0.8), v(1.8, 0.75), v(2.7, 0.8), v(1.35, 1.55), v(2.25, 1.55), v(3.1, 1.5)];
const FAR: V[] = [v(0.8, 0.6), v(2.4, 0.9), v(3.4, 2.6), v(1.2, 2.3), v(2.6, 3.3), v(0.9, 3.5)];
const phase: FigureDef = {
  caption:
    "Hâl değişimi molekülü parçalamaz: su buharlaşırken moleküller arası komşuluk ve uzaklık değişir, H₂O içindeki O–H bağları korunur; iyot süblimleşirken I₂(k) → I₂(g) olur, ayrı I atomları oluşmaz. Her iki kapta aynı sayıda molekül vardır; çizim ölçekli değil.",
  alt: "İki adım. Her adımda solda önceki, sağda sonraki kap. 1: sıvı suda birbirine yakın altı H₂O, buharda birbirinden uzak altı H₂O. 2: katı iyotta sıkı dizili altı I₂ çifti, gazda dağınık altı I₂ çifti.",
  steps: ["H₂O(s) → H₂O(g)", "I₂(k) → I₂(g)"],
  draw: (_v, step) => {
    const els: El[] = [];
    [0, 7.4].forEach((x0, k) => {
      els.push(rect(x0, 0, x0 + 4.2, 4.2, { tone: "muted", thin: true }));
      const pts = k ? FAR : CLOSE;
      for (const p of pts) {
        const o = v(x0 + p[0], p[1]);
        if (step === 0) h2o(els, o);
        else pair(els, o, "a");
      }
      els.push(txt(v(x0 + 2.1, -0.15), step === 0 ? (k ? "H₂O(g)" : "H₂O(s)") : k ? "I₂(g)" : "I₂(k)", "s", { small: true, bold: true }));
    });
    els.push(vec(v(4.6, 2.1), v(7.0, 2.1), { tone: "a" }), txt(v(5.8, 2.25), step ? "süblimleşme" : "buharlaşma", "n", { small: true, tone: "a" }));
    els.push(...pad(v(-0.2, 4.6), v(11.8, -0.8)));
    return { els, readout: [step ? "6 I₂ → 6 I₂: tanecikler çift olarak kalır, I atomlarına ayrılmaz." : "6 H₂O → 6 H₂O: O–H bağları korunur, değişen moleküller arası uzaklıktır.", "Kimlik testi kaba 'güçlü–zayıf' enerji sınıflamasından daha güvenlidir."] };
  },
};

const conservation: FigureDef = {
  caption:
    "Atom türü ve sayısı korunurken tür değişebilir: 2H₂O → 2H₂ + O₂ denkleminde iki tarafta 4 H ve 2 O vardır, molekül sayısı ise 2'den 3'e çıkar. Zn + 2H⁺ → Zn²⁺ + H₂ denkleminde Zn'nin yükü değişir ama toplam yük iki tarafta da +2'dir. Korunum kimyasal değişim olmadığını göstermez.",
  alt: "İki adım. 1: solda iki su molekülü, sağda iki H₂ ve bir O₂ molekülü; altta H 4 = 4, O 2 = 2, molekül 2 → 3. 2: solda Zn atomu ve iki H⁺, sağda Zn²⁺ ve bir H₂; altta toplam yük +2 = +2.",
  steps: ["Suyun elektrolizi", "Zn ile H⁺"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) {
      h2o(els, v(1.2, 2.2), 1.2);
      h2o(els, v(3.2, 2.2), 1.2);
      pair(els, v(7.0, 2.6), "b", 0.2);
      pair(els, v(7.0, 1.6), "b", 0.2);
      pair(els, v(9.4, 2.1), "warn", 0.3);
      els.push(txt(v(2.2, 0.9), "2H₂O", "s", { small: true, bold: true }), txt(v(7.0, 0.9), "2H₂", "s", { small: true, bold: true }), txt(v(9.4, 0.9), "O₂", "s", { small: true, bold: true }));
      els.push(txt(v(5.6, -0.1), "H: 4 = 4 · O: 2 = 2 · molekül: 2 → 3", "s", { small: true, tone: "a" }));
    } else {
      els.push(ball(v(1.4, 2.1), 0.45, "muted", "Zn"), ball(v(3.0, 2.5), 0.22, "b", "+"), ball(v(3.0, 1.7), 0.22, "b", "+"));
      els.push(ball(v(7.4, 2.1), 0.4, "muted", "2+"));
      pair(els, v(9.6, 2.1), "b", 0.22);
      els.push(txt(v(2.2, 0.9), "Zn + 2H⁺", "s", { small: true, bold: true }), txt(v(7.4, 0.9), "Zn²⁺", "s", { small: true, bold: true }), txt(v(9.6, 0.9), "H₂", "s", { small: true, bold: true }));
      els.push(txt(v(5.6, -0.1), "toplam yük: 0 + 2 = +2 · +2 + 0 = +2", "s", { small: true, tone: "a" }));
    }
    els.push(vec(v(4.3, 2.1), v(5.9, 2.1), { tone: "ink" }));
    els.push(...pad(v(0.0, 3.4), v(11.2, -0.9)));
    return { els, readout: step ? ["Zn atomu Zn²⁺ olur, H⁺'tan H₂ oluşur: yeni türler, korunan toplam yük.", "Yalnız katının kayboluşu çözünme ile tepkimeyi ayıramaz."] : ["Korunan atom türü ve sayısıdır; molekül adedi her tepkimede aynı kalmak zorunda değildir.", "H₂O yerine H₂ ve O₂ oluştu: kimyasal değişim."] };
  },
};

const identity = boardFig(
  [
    { name: "Cam kırılır", tag: "fiziksel · kimlik korunur", what: "Şekil ve boyut değişir; kimyasal tür aynıdır.", tone: "c" },
    { name: "Şeker öğütülür", tag: "fiziksel · kimlik korunur", what: "Parçanın küçülmesi moleküllerin atomlara ayrıldığı anlamına gelmez.", tone: "c" },
    { name: "Su donar", tag: "fiziksel · kimlik korunur", what: "Hâl değişir; H₂O kimliği korunur.", tone: "c" },
    { name: "Su elektrolizi", tag: "kimyasal · H₂ ve O₂ oluşur", what: "H₂O yerine H₂ ve O₂ oluşur; atom türleri korunurken hangi atomların hangi tür içinde bulunduğu değişir.", tone: "warn" },
  ],
  2,
  "Kimlik ile görünüşü ayrı sütunda tut: camın kırılması, şekerin öğütülmesi ve saf suyun donması farklı görünüşler üretir ama kimyasal tür kimliği korunur; suyun elektrolizinde ise H₂O yerine H₂ ve O₂ oluşur. Çekirdek dönüşümünü sıradan kimyasal tepkimelerle karıştırma.",
  "İki sütunlu dört kutu: Cam kırılır, Şeker öğütülür, Su donar (fiziksel, kimlik korunur) ve Su elektrolizi (kimyasal, H₂ ve O₂ oluşur). Kutular seçilebilir.",
  "Gözlemler kanıtı destekler; kimlik sorusunu tür analizi çözer.",
  5.6,
);

export const chemistryFigures061TytLab: Record<string, Record<string, FigureDef>> = {
  "kimya-guvenlik": {
    "Tehlike ve risk aynı bilgi değildir": risk,
    "Yanıcı ile oksitleyici farklıdır": flammable,
    "Diğer işaretleri etkileriyle ayır": otherSigns,
    "İlk ve son büret okumasının farkını al": deliveredVolume,
    "Araç seçimi: ne yapmak istiyorsun?": glassware,
  },
  "su-hayat-cevre": {
    "Su bütçesi: hacmi debiden kur": budget,
    "Tasarruf yüzdesinin tabanı": saving,
    "Derişimi eşitle, sertlikte eksik veriyi ara": concentration,
  },
  "doga-ve-kimya": {
    "Su döngüsü arıtmaya eşit değildir": waterCycle,
    "Suya besin fazlası ve oksijen dengesi": eutrophication,
    "Hava: sera etkisi ile ozonun konumu": atmosphere,
  },
  "fiziksel-kimyasal-degisimler": {
    "Kimlik ile görünüşü iki ayrı sütunda tut": identity,
    "Hâl değişimi molekülü parçalamak değildir": phase,
    "Atom ve yük korunurken tür değişebilir": conservation,
  },
};
