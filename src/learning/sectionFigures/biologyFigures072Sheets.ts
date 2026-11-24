import { type El, type FigureDef, type Tone } from "./figureKit";
import { A, B, C, L, PL, R, S, T, bw, mk } from "./biologyFigures060Kit";

/*
 * Forge072: dört AYT Biyoloji kopya kâğıdı (Dolaşım sistemi: kalp,
 * Damarlar ve Starling, Soluk alışverişi, Gazların taşınması) özgün
 * etkileşimli figürlerle. Her figür dersin ders sayfasında görünen ve daha
 * önce çizimi olmayan bir bölümüne bağlıdır; derslerin laboratuvarlarını
 * (kalp çevrimi ve kapak durumu, akış–alan–Starling sürgüleri, soluk evresi
 * ve direnç R, Hb sayısı–doluluk ve oyuncak Hill eğrisi) tekrarlamaz.
 * Organ ve damar çizimleri nitel şemadır, ölçekli değildir. Basınçlar mmHg,
 * O₂ içeriği mL O₂/dL kan birimindedir; sayılar bu dosyada kurulan öğretim
 * modelleridir, kişisel ölçüm ya da tanı eşiği değildir. Kâğıtların cümleleri
 * kopyalanmadı. ÖSYM atıfları yalnız yıl, oturum ve soru numarasıyla verilir
 * ve depodaki src/learning/osym kayıtlarıyla eşleşir. Adım, seçim ve sürgü
 * öğrenme kaydı üretmez.
 */

/** Sabit ondalıklı Türkçe sayı. */
const fx = (x: number, d = 1) => (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace(".", ",");
const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Number.isFinite(x) ? x : lo));
const snap = (x: number, lo: number, hi: number, step: number) => Number((lo + Math.round((clamp(x, lo, hi) - lo) / step) * step).toFixed(6));
const on = (sel: number, i: number, tone: Tone = "a"): Tone => (sel === i ? tone : "ink");

/** Satır: ad solda, değer sağ kenarda, çubuk bir alt satırda. */
const meterRow = (y: number, label: string, value: string, len: number, tone: Tone, o: { dash?: boolean; extra?: [number, Tone] } = {}): El[] => {
  const els: El[] = [T(14, y, label, "e", { bold: true }), T(518, y, value, "w", { tone })];
  const x1 = 14 + Math.max(1, len);
  els.push(R(14, y + 20, x1, y + 42, { tone, fill: o.dash ? undefined : tone, dash: o.dash }));
  if (o.extra && o.extra[0] > 0.5) els.push(R(x1, y + 20, x1 + o.extra[0], y + 42, { tone: o.extra[1], dash: true }));
  return els;
};

/* =====================================================================
 * 029 Dolaşım sistemi: kalp
 * ===================================================================== */

const CHAMBERS_REL = ["Yol: ana toplardamarlar → sağ atriyum → triküspit → sağ ventrikül.", "Yol: akciğer toplardamarları → sol atriyum → mitral → sol ventrikül.", "Yol: sağ ventrikül → pulmoner kapak → akciğer atardamarı → akciğer.", "Yol: sol ventrikül → aort kapağı → aort → vücut.", "Septum sağ ve sol yolu ayırır; iki yol yalnız akciğer devresiyle birbirine bağlanır."];
const CHAMBERS = [
  {
    label: "Sağ atriyum",
    title: "Sağ atriyum: büyük dolaşımdan dönüş",
    detail: [
      "Üst ve alt ana toplardamar vücuttan dönen, O₂'si görece düşük kanı getirir; koroner sinüs de buraya açılır.",
      "Kan triküspit kapaktan sağ ventriküle geçer; sol ventriküle açılan normal bir yol yoktur.",
    ],
  },
  {
    label: "Sol atriyum",
    title: "Sol atriyum: akciğerden dönüş",
    detail: [
      "Akciğer toplardamarları gaz değişiminden gelen, O₂'si görece yüksek kanı getirir.",
      "Damar kalbe döndüğü için toplardamardır; adı oksijenden değil yönden gelir. Kan mitral kapaktan sol ventriküle iner.",
    ],
  },
  {
    label: "Sağ ventrikül",
    title: "Sağ ventrikül: küçük dolaşımın pompası",
    detail: [
      "Kanı pulmoner yarımay kapağından akciğer atardamarına, düşük basınçlı akciğer devresine gönderir.",
      "Duvarı soldakinden incedir; dengeli dolaşımda dakikada gönderdiği hacim sol ventrikülünkine eşittir.",
    ],
  },
  {
    label: "Sol ventrikül",
    title: "Sol ventrikül: büyük dolaşımın pompası",
    detail: [
      "Kanı aort yarımay kapağından aorta, yüksek basınçlı vücut devresine gönderir.",
      "Kalın kas duvarı yüksek basınca karşı iş üretmek içindir; her atımda iki kat kan gönderdiği anlamına gelmez.",
    ],
  },
  {
    label: "septum",
    title: "Septum: sağ ile solu ayıran duvar",
    detail: [
      "Erişkin kalbinde iki tarafın kanının odacıklar arasında karışmasını engeller.",
      "Sağdan sola geçiş akciğer yoluyla olur. İbn Nefis bu yolu septumdaki varsayılan gözenekler yerine akciğerle açıklamıştı.",
    ],
  },
];
const chamberFigure = mk({
  caption:
    "Kalbin dört odacığı iki seri pompa kurar: sağ taraf akciğere, sol taraf vücuda gönderir. Bir odacığa ya da septuma dokun: giren ve çıkan damar, kapak ve duvar kalınlığı birlikte açılır. Çizim önden görünüştür; kişinin sağı çizimin solundadır. Nitel şema, ölçekli değildir.",
  alt: "İki satır, iki sütunlu kalp şeması. Üstte sağ ve sol atriyum, altta sağ ve sol ventrikül; ortada dikey septum çizgisi. Sol ventrikülün iç çizgisi duvardan daha içeride, duvarı kalın. Atriyumlara üstten giren oklar ana toplardamarlar ve akciğer toplardamarları; ventriküllerden yanlara ve yukarı çıkan oklar akciğer atardamarı ve aort.",
  h: 470,
  picks: CHAMBERS.map((c) => ({ label: c.label, title: c.title, detail: c.detail })),
  draw: (_v, _s, pick) => {
    const els: El[] = [
      // Çıkış ve giriş damarlarının adları
      T(14, 20, "akciğer atardamarı", "e", { tone: pick === 2 ? "a" : "muted" }),
      T(518, 20, "aort", "w", { tone: pick === 3 ? "a" : "muted" }),
      T(60, 54, "ana toplardamarlar", "e", { tone: pick === 0 ? "a" : "muted" }),
      T(472, 86, "akciğer toplardamarları", "w", { tone: pick === 1 ? "a" : "muted" }),
      A(161, 68, 161, 120, pick === 0 ? "a" : "ink", { thin: true }),
      A(371, 100, 371, 120, pick === 1 ? "a" : "ink", { thin: true }),
      // Odacıklar
      R(60, 124, 262, 234, { tone: on(pick, 0) }),
      R(270, 124, 472, 234, { tone: on(pick, 1) }),
      R(60, 242, 262, 392, { tone: on(pick, 2) }),
      R(270, 242, 472, 392, { tone: on(pick, 3) }),
      R(66, 248, 256, 386, { tone: "muted" }),
      R(288, 260, 454, 374, { tone: "muted" }),
      L(266, 124, 266, 392, { bold: true, tone: on(pick, 4) }),
      // AV geçişleri
      A(104, 200, 104, 280, "ink", { thin: true }),
      A(314, 200, 314, 280, "ink", { thin: true }),
      // Çıkışlar: sağ ventrikül → akciğer atardamarı, sol ventrikül → aort
      PL([[60, 340], [36, 340], [36, 38]], { open: true, thin: true, tone: pick === 2 ? "a" : "ink" }),
      PL([[472, 340], [496, 340], [496, 38]], { open: true, thin: true, tone: pick === 3 ? "a" : "ink" }),
      A(36, 60, 36, 36, pick === 2 ? "a" : "ink", { thin: true }),
      A(496, 60, 496, 36, pick === 3 ? "a" : "ink", { thin: true }),
    ];
    CHAMBERS.slice(0, 4).forEach((c, i) => {
      const x = i % 2 === 0 ? 161 : 371;
      const y = i < 2 ? 179 : 310;
      els.push(T(x, y, c.label, "c", { bold: true, tone: on(pick, i), pick: i }));
    });
    els.push(L(266, 392, 266, 406, { thin: true }), T(266, 420, "septum", "c", { bold: true, tone: on(pick, 4), pick: 4 }));
    els.push(T(266, 452, "önden görünüş: kişinin sağı solda", "c", { tone: "muted" }));
    const c = CHAMBERS[pick];
    return {
      els,
      readout: c
        ? [CHAMBERS_REL[pick]]
        : [
            "Bir odacığa dokun. Atriyumlar kanı alır, ventriküller çıkış atardamarlarına pompalar.",
            "Sağ kalp: ana toplardamarlar → sağ atriyum → sağ ventrikül → akciğer atardamarı. Sol kalp: akciğer toplardamarları → sol atriyum → sol ventrikül → aort.",
          ],
    };
  },
});

const VALVES_REL = ["Kapalı olduğu an: sağ ventrikül basıncı sağ atriyumunkinden yüksek.", "Açık olduğu an: sol atriyum basıncı sol ventrikülünkinden yüksek.", "Açık olduğu an: sağ ventrikül basıncı akciğer atardamarınkinden yüksek.", "Açık olduğu an: sol ventrikül basıncı aortunkinden yüksek.", "Bu destek yalnız iki AV kapakta, triküspit ve mitralde bulunur."];
const VALVES = [
  {
    label: "triküspit",
    title: "Triküspit: sağ AV kapak, üç yaprak",
    detail: [
      "Sağ atriyum ile sağ ventrikül arasındadır; ventrikül basıncı atriyumunkini geçince kapanır.",
      "Yaprakları kordalarla papiller kaslara bağlıdır; ventrikül kasılırken atriyuma doğru dönmez.",
    ],
  },
  {
    label: "mitral",
    title: "Mitral (biküspit): sol AV kapak, iki yaprak",
    detail: [
      "Sol atriyum ile sol ventrikül arasındadır; atriyum basıncı ventrikülünkinden yüksekken açıktır.",
      "Aynı korda ve papiller kas desteği burada da vardır.",
    ],
  },
  {
    label: "pulmoner",
    title: "Pulmoner yarımay kapağı",
    detail: [
      "Sağ ventrikül çıkışındadır; ventrikül basıncı akciğer atardamarınkini aşınca açılır.",
      "Cep biçiminde üç yarımay yaprağı vardır; korda ve papiller kas yoktur.",
    ],
  },
  {
    label: "aort kapağı",
    title: "Aort yarımay kapağı",
    detail: [
      "Sol ventrikül çıkışındadır; ventrikül gevşeyip basıncı aortun altına inince geri akım eğilimi cepleri kapatır.",
      "Kapanışı ikinci kalp sesiyle ilişkilidir; birinci ses AV kapakların kapanışıyla ilişkilidir.",
    ],
  },
  {
    label: "korda + papiller kas",
    title: "Korda ve papiller kas: kapağı tutan destek",
    detail: [
      "Papiller kas ventrikül duvarından çıkan kas çıkıntısıdır; korda tendinea onu AV kapak yaprağına bağlar.",
      "Kasılması kapağı açmaz; ventrikül sistolünde yaprakları yerinde tutar. Kapakları basınç farkı açar ve kapatır.",
    ],
  },
];
const valveFigure = mk({
  caption:
    "Nitel akış şeması, anatomik yerleşim değil: her sütunda kan atriyumdan ventriküle, oradan çıkış atardamarına gider. Bir kapağa ya da destek düzenine dokun. AV kapakların yaprakları kordalarla papiller kasa bağlıdır; çıkıştaki yarımay kapaklarında bu düzen yoktur.",
  alt: "Solda sağ kalp, sağda sol kalp sütunu. Her sütunda üstte atriyum kutusu, altında AV kapak yaprakları (sağ kalpte üç, sol kalpte iki çizgi), ventrikül kutusu içinde yapraktan aşağı inen iki korda çizgisi ve küçük papiller kas çıkıntısı, ventrikülün altında üç cepli yarımay kapağı ve en altta çıkış atardamarının adı.",
  h: 430,
  picks: VALVES.map((v) => ({ label: v.label, title: v.title, detail: v.detail })),
  draw: (_v, _s, pick) => {
    const els: El[] = [T(266, 22, "korda + papiller kas", "c", { bold: true, tone: on(pick, 4), pick: 4 })];
    const column = (cx: number, side: 0 | 1) => {
      const av = side; // 0 triküspit, 1 mitral
      const sl = 2 + side; // 2 pulmoner, 3 aort
      const atrium = side === 0 ? "Sağ atriyum" : "Sol atriyum";
      const ventricle = side === 0 ? "Sağ ventrikül" : "Sol ventrikül";
      const out = side === 0 ? "akciğer atardamarı" : "aort";
      const avTone = on(pick, av);
      const slTone = on(pick, sl);
      const cTone = on(pick, 4);
      els.push(
        R(cx - 100, 54, cx + 100, 112, {}),
        T(cx, 83, atrium, "c", { bold: true }),
        // AV kapak: atriyum ile ventrikül arasında iki ya da üç yaprak
        L(cx - 30, 124, cx - 6, 160, { tone: avTone, bold: pick === av }),
        L(cx + 30, 124, cx + 6, 160, { tone: avTone, bold: pick === av }),
        // Triküspitin üçüncü yaprağı (şematik)
        ...(side === 0 ? [L(cx, 122, cx, 150, { tone: avTone, bold: pick === av })] : []),
        T(cx + 40, 142, VALVES[av].label, "e", { bold: true, tone: avTone, pick: av }),
        R(cx - 100, 172, cx + 100, 316, {}),
        // Kordalar ve papiller kas
        L(cx - 6, 160, cx - 4, 238, { thin: true, tone: cTone }),
        L(cx + 6, 160, cx + 4, 238, { thin: true, tone: cTone }),
        R(cx - 14, 238, cx + 14, 262, { tone: cTone, fill: cTone }),
        T(cx, 292, ventricle, "c", { bold: true }),
      );
      // Yarımay kapağı: üç cep
      [-26, 0, 26].forEach((dx) =>
        els.push(S([[cx + dx - 12, 330], [cx + dx, 346], [cx + dx + 12, 330]], { open: true, tone: slTone, bold: pick === sl })),
      );
      els.push(T(cx, 372, VALVES[sl].label, "c", { bold: true, tone: slTone, pick: sl }), T(cx, 406, out, "c", { tone: "muted" }));
    };
    column(122, 0);
    column(398, 1);
    const v = VALVES[pick];
    return {
      els,
      readout: v
        ? [VALVES_REL[pick]]
        : [
            "Bir kapağa dokun. Dört kapak da kanın geri kaçmasını sınırlar; hiçbiri kendi başına kanı iten bir pompa değildir.",
            "AV kapaklar atriyum ile ventrikül arasında, yarımay kapakları ventrikül çıkışlarındadır.",
          ],
    };
  },
});

const WALL_BANDS: [string, number, number, Tone, boolean][] = [
  ["perikart kesesi", 30, 66, "muted", false],
  ["perikart sıvısı", 66, 100, "muted", true],
  ["epikart", 100, 136, "ink", false],
  ["miyokart (kas)", 136, 262, "ink", false],
  ["endokart", 262, 296, "ink", false],
  ["odacık kanı", 296, 340, "muted", true],
];
const WALL_STEPS = ["Katmanlar", "Koroner giriş", "Koroner dönüş", "Akış aksarsa"];
const wallFigure = mk({
  caption:
    "Kalp duvarının kesiti, dıştan içe: kese, sıvı, epikart, kalın kas katmanı miyokart, iç yüzey endokart ve odacıktaki kan. İleri ile koroner damarları ekle: kas katmanı oksijenini odacıktaki kandan değil, aort kökünden ayrılan koroner atardamarlardan alır. Nitel şema, ölçekli değildir.",
  alt: "Üst üste altı yatay bant, her birinin adı sağda. Adımlarda epikart bandında bir koroner atardamar dairesinden miyokarta inen iki ok, ikinci bir daireye miyokarttan çıkan dönüş oku ve en son miyokartta kesik çizgili bir oksijen yetersizliği bölgesi eklenir.",
  h: 430,
  steps: WALL_STEPS,
  draw: (_v, step) => {
    const els: El[] = [];
    WALL_BANDS.forEach(([name, y0, y1, tone, dash]) => {
      els.push(R(20, y0, 300, y1, { tone, dash }), T(316, (y0 + y1) / 2, name, "e", { bold: name.startsWith("miyokart"), tone: tone === "muted" ? "muted" : "ink" }));
    });
    if (step >= 1)
      els.push(
        C(80, 118, 12, { tone: "a", fill: "a" }),
        A(80, 132, 80, 212, "a"),
        A(90, 128, 140, 212, "a"),
        L(80, 340, 80, 360, { thin: true, tone: "a" }),
        T(20, 374, "koroner atardamar", "e", { tone: "a", bold: true }),
        T(20, 404, "aort kökünden", "e", { tone: "a" }),
      );
    if (step >= 2)
      els.push(
        C(260, 118, 12, { tone: "b", fill: "b" }),
        A(260, 212, 260, 134, "b"),
        L(260, 340, 260, 360, { thin: true, tone: "b" }),
        T(246, 374, "koroner toplardamar", "e", { tone: "b", bold: true }),
        T(246, 404, "sinüs → sağ atriyum", "e", { tone: "b" }),
      );
    if (step >= 3) els.push(R(40, 222, 196, 258, { tone: "warn", dash: true }), T(116, 240, "O₂ yetersiz", "c", { tone: "warn", bold: true }));
    const readout =
      [
        ["Perikart kalbi saran kesedir; içindeki az miktar sıvı hareket sırasında sürtünmeyi azaltır.", "Epikart dış yüzey, miyokart kuvvet üreten kas, endokart odacığa bakan iç yüzeydir; üçü aynı katman değildir."],
        ["Koroner atardamarlar aortun kökünden ayrılır, epikart yüzeyinde ilerler ve dallarıyla miyokartın içine girer.", "Kalın kas duvarı yalnız odacıktaki kandan difüzyonla yeterince beslenemez."],
        ["Koroner toplardamarlar kası boşaltır; dönüşün büyük bölümü koroner sinüs aracılığıyla sağ atriyuma açılır.", "Bu dönüş sağ atriyuma gelen ana toplardamar kanına katılır."],
        ["Bir koroner dalda akış belirgin azalırsa yalnız o dalın beslediği kas bölgesi oksijensiz kalır ve zarar görebilir: kalp krizi.", "Kalp durması ise kalbin etkin pompalamayı bırakmasıdır; kalp kriziyle aynı olay adı değildir."],
      ][step] ?? [];
    return { els, readout };
  },
});

const REGULATORS_REL = ["Yön: hız azalır · yol: sinir ucu.", "Yön: hız ve güç artar · yol: sinir ucu.", "Yön: hız ve güç artar · yol: kan.", "Yön: hız artar · yol: kan, uzun dönem.", "Yön: doza bağlı artış · yol: kan."];
const REGULATORS = [
  {
    label: "vagus (ACh)",
    title: "Vagus: parasempatik yol, hızı azaltma yönü",
    detail: [
      "Sinir ucundan salınan asetilkolin SA düğümüne yakın etki eder; burada nörotransmiterdir, hormon değildir.",
      "Dinlenimde kalbin, SA düğümünün kendi hızından daha yavaş atması bu yolun sürekli etkisiyle ilişkilidir.",
    ],
  },
  {
    label: "sempatik sinir",
    title: "Sempatik sinir: hız ve kasılma gücünü artırma yönü",
    detail: ["Sinir uçlarından noradrenalin salınır; SA düğümü ve ventrikül kası etkilenir.", "Sinir yolu hedefe yakın ve hızlı başlayan bir etkidir."],
  },
  {
    label: "adrenalin",
    title: "Adrenalin: kanla taşınan hormon",
    detail: [
      "Böbreküstü bezinin öz bölgesi kana verir; kalp hızını ve kasılma gücünü artırma yönünde etki eder.",
      "Hedefe kan yoluyla ulaşır; sinir ucundan salınan aracıyla aynı yol değildir.",
    ],
  },
  {
    label: "tiroit hormonları",
    title: "Tiroit hormonları: uzun dönem katkı",
    detail: [
      "Metabolizmayı ve kalbin uyarılara duyarlılığını artırarak hızın artmasına katkı verir.",
      "Etki dakikalar değil, saatler ve günler ölçeğinde kurulur.",
    ],
  },
  {
    label: "kafein",
    title: "Kafein: uyarıcı madde",
    detail: [
      "Kafein ile tein aynı maddenin iki adıdır, iki ayrı kimyasal değildir.",
      "Etkisi doza ve kişinin durumuna bağlıdır; miktar ve koşul verilmeden kesin bir atım sayısı çıkarılmaz.",
    ],
  },
];
const regulatorFigure = mk({
  caption:
    "Atım SA düğümünde kendiliğinden başlar; sinirler ve hormonlar yalnız hızı ve gücü ayarlar. Bir kaynağa dokun: yönü (artırma ya da azaltma) ve yolu (sinir ucu ya da kan) birlikte açılır. Çizim nitel bir yön şemasıdır, kişisel nabız değeri vermez.",
  alt: "Ortada SA düğümü kutusu. Solda vagus düz okla kutuya bağlı; sağda sempatik sinir düz okla, adrenalin ve tiroit hormonları kesik okla; altta kafein kesik okla kutuya bağlı. Üstte artırma ve azaltma yönü ile düz ve kesik okun anlamı yazılı.",
  h: 370,
  picks: REGULATORS.map((r) => ({ label: r.label, title: r.title, detail: r.detail })),
  draw: (_v, _s, pick) => {
    const tone = (i: number, base: Tone): Tone => (pick === i ? "warn" : base);
    const els: El[] = [
      T(14, 24, "artırma yönü", "e", { tone: "a", bold: true }),
      T(518, 24, "azaltma yönü", "w", { tone: "b", bold: true }),
      T(266, 58, "düz ok: sinir ucu · kesik ok: kan", "c", { tone: "muted" }),
      ...B(266, 200, "SA düğümü", { bold: true, tone: "ink" }),
      T(14, 200, REGULATORS[0].label, "e", { bold: true, tone: tone(0, "b"), pick: 0 }),
      A(150, 200, 184, 200, tone(0, "b"), { bold: pick === 0 }),
      T(518, 112, REGULATORS[1].label, "w", { bold: true, tone: tone(1, "a"), pick: 1 }),
      A(356, 122, 318, 176, tone(1, "a"), { bold: pick === 1 }),
      T(518, 200, REGULATORS[2].label, "w", { bold: true, tone: tone(2, "a"), pick: 2 }),
      A(400, 200, 348, 200, tone(2, "a"), { dash: true, bold: pick === 2 }),
      T(518, 290, REGULATORS[3].label, "w", { bold: true, tone: tone(3, "a"), pick: 3 }),
      A(330, 270, 316, 226, tone(3, "a"), { dash: true, bold: pick === 3 }),
      T(266, 330, REGULATORS[4].label, "c", { bold: true, tone: tone(4, "c"), pick: 4 }),
      A(266, 314, 266, 226, tone(4, "c"), { dash: true, bold: pick === 4 }),
    ];
    const r = REGULATORS[pick];
    return {
      els,
      readout: r
        ? [REGULATORS_REL[pick]]
        : ["Bir kaynağa dokun. Vagus azaltma yönünde, sempatik sinir, adrenalin ve tiroit hormonları artırma yönünde etki eder.", "Hız değişince bir çevrimin süresi T = 60/f saniye ile yeniden bulunur."],
    };
  },
});

/* =====================================================================
 * 030 Damarlar ve Starling
 * ===================================================================== */

const VESSELS_REL = ["Orta tabaka kalın, lümen görece dar, kapak yok.", "Orta tabaka lümene göre kalın; görevi direnç ayarı.", "Orta tabaka ince, lümen geniş; uzuv toplardamarlarının çoğunda kapak var.", "Yalnız endotel ve bazal lamina; görevi değişim."];
const VESSELS = [
  {
    label: "Atardamar",
    title: "Atardamar: kalın, esnek orta tabaka",
    detail: [
      "Endotel, düz kas ve elastik liften zengin kalın orta tabaka, dışta bağ doku. Atımla gelen basınç dalgasını karşılar ve akışı sürdürür.",
      "Kalpten çıkan kanı taşır; adı taşıdığı oksijenden değil akış yönünden gelir.",
    ],
  },
  {
    label: "Arteriyol",
    title: "Arteriyol: çapını ayarlayan dal",
    detail: [
      "Küçük çaplı ama kas tabakası görece kalındır; düz kas kasılıp gevşeyerek bağlı kılcal yatağa gelen akışı ayarlar.",
      "Dolaşımdaki en büyük basınç düşüşlerinden biri bu düzeydedir.",
    ],
  },
  {
    label: "Toplardamar",
    title: "Toplardamar: ince duvar, geniş lümen",
    detail: [
      "Aynı üç tabaka vardır ama orta tabaka incedir; geniş lümen kan depolamaya katkı verir.",
      "Özellikle kol ve bacak toplardamarlarında geri akımı sınırlayan kapaklar bulunur; her toplardamarda bulunmaz.",
    ],
  },
  {
    label: "Kılcal",
    title: "Kılcal: endotel ve bazal lamina",
    detail: [
      "Ayrı bir kas ya da bağ doku tabakası yoktur; ince duvar kan ile doku arasındaki geçiş mesafesini kısaltır.",
      "Tek kılcal çok dar olsa da paralel kılcalların toplam kesit alanı çok büyüktür.",
    ],
  },
];
const vesselWallFigure = mk({
  caption:
    "Dört damarın enine kesiti, benzer büyüklükteki damarların yapısal karşılaştırması olarak. Bir damara dokun. Atardamarda orta tabaka kalın, toplardamarda ince ve lümen geniş; kılcalda yalnız endotel ve bazal lamina kalır. Şema ölçeksizdir; arteriyol ve kılcal büyütülmüştür.",
  alt: "Yan yana dört daire grubu: atardamar, arteriyol, toplardamar ve kılcal. Atardamar ve arteriyolde iki kalın çember arasında ışınsal kas çizgileri, toplardamarda bu aralık dar ve iç boşluk geniş, kılcalda tek ince çember ve kesik çizgili bazal lamina. Altta üç tabakanın adlarını veren açıklama satırları.",
  h: 370,
  picks: VESSELS.map((v) => ({ label: v.label, title: v.title, detail: v.detail })),
  draw: (_v, _s, pick) => {
    const els: El[] = [];
    const cy = 110;
    const vessel = (cx: number, outer: number, mOut: number, mIn: number, endo: number, i: number) => {
      const t = on(pick, i);
      els.push(C(cx, cy, outer, { tone: pick === i ? "a" : "muted", thin: true }));
      if (mOut > 0) {
        els.push(C(cx, cy, mOut, { tone: "a" }), C(cx, cy, mIn, { tone: "a" }));
        for (let k = 0; k < 12; k++) {
          const a = (k * Math.PI) / 6;
          els.push(L(cx + (mIn + 2) * Math.cos(a), cy + (mIn + 2) * Math.sin(a), cx + (mOut - 2) * Math.cos(a), cy + (mOut - 2) * Math.sin(a), { tone: "a", thin: true }));
        }
      }
      els.push(C(cx, cy, endo, { tone: "b", thin: true }), T(cx, 196, VESSELS[i].label, "c", { bold: true, tone: t, pick: i }));
    };
    vessel(72, 52, 44, 26, 23, 0);
    vessel(200, 30, 25, 13, 11, 1);
    vessel(334, 52, 44, 38, 36, 2);
    // Kılcal: endotel + kesik bazal lamina
    els.push(C(466, cy, 17, { tone: pick === 3 ? "a" : "muted", dash: true, thin: true }), C(466, cy, 14, { tone: "b" }), T(466, 196, VESSELS[3].label, "c", { bold: true, tone: on(pick, 3), pick: 3 }));
    // Toplardamar kapağı (kesitte iki yaprak çizgisi)
    els.push(L(310, 104, 334, 116, { thin: true, tone: "muted" }), L(358, 104, 334, 116, { thin: true, tone: "muted" }));
    els.push(
      L(14, 244, 48, 244, { thin: true, tone: "muted" }),
      T(60, 244, "dış tabaka: bağ doku", "e"),
      L(14, 280, 48, 280, { tone: "a" }),
      T(60, 280, "orta tabaka: düz kas, elastik lif", "e"),
      L(14, 316, 48, 316, { tone: "b", thin: true }),
      T(60, 316, "endotel: tek kat yassı hücre", "e"),
      T(266, 352, "ölçeksiz şema; küçük damarlar büyütüldü", "c", { tone: "muted" }),
    );
    const v = VESSELS[pick];
    return {
      els,
      readout: v
        ? [VESSELS_REL[pick]]
        : ["Bir damara dokun. Endotel bütün damarların iç yüzünü örter; farklar orta ve dış tabakanın kalınlığındadır.", "Toplardamarın kesitindeki iki çizgi kapak yapraklarını gösterir."],
    };
  },
});

const EXCHANGE_REL = ["Mekanizma: süzülme · itici fark: Pc − π.", "Mekanizma: difüzyon · yön: kandan dokuya.", "Mekanizma: difüzyon · yön: kandan dokuya.", "Mekanizma: difüzyon · yön: dokudan kana.", "Çoğu içeride kalır; az bir kısmı lenfle döner.", "Damar içinde kalır; taşıdığı O₂ difüze olur."];
const EXCHANGE = [
  { label: "su", x: 48, dir: 1, tone: "a" as Tone, dash: false, title: "Su: toplu süzülme", detail: ["Yönü basınç terimlerinin farkıyla bulunur: klasik modelde Pc − π artıysa dışa, eksiyse içe.", "Net sıvı sıfır olsa da gazların ve küçük çözünenlerin difüzyonu sürer."] },
  { label: "O₂", x: 128, dir: 1, tone: "a" as Tone, dash: false, title: "O₂: kendi kısmi basınç farkıyla", detail: ["Kandaki PO₂ dokudakinden yüksek olduğu için kandan dokuya difüze olur.", "Yönünü sıvının net yönü değil, O₂'nin kendi kısmi basınç farkı belirler."] },
  { label: "glikoz", x: 210, dir: 1, tone: "a" as Tone, dash: false, title: "Glikoz: küçük çözünen", detail: ["Derişim farkıyla kandan dokuya geçer.", "Geçirgenlik organa göre değişir; bütün kılcallar aynı gözenek boyuna sahip değildir."] },
  { label: "CO₂", x: 296, dir: -1, tone: "b" as Tone, dash: false, title: "CO₂: dokudan kana", detail: ["Dokuda üretildiği için PCO₂ dokuda yüksektir; dokudan kana difüze olur.", "Aynı duvarda O₂ ve CO₂ aynı anda zıt yönlerde geçebilir."] },
  { label: "protein", x: 378, dir: 1, tone: "muted" as Tone, dash: true, title: "Plazma proteini: çoğu içeride", detail: ["Proteinlerin çoğu damar içinde kalır ve içe doğru onkotik çekişi oluşturur.", "Az bir kısmı dokuya geçer ve lenfle kana döner; ‘hiç çıkamaz’ mutlak bir kural değildir."] },
  { label: "eritrosit", x: 474, dir: 0, tone: "muted" as Tone, dash: false, title: "Eritrosit: damar içinde kalır", detail: ["Normalde kılcal duvarını geçmez; dar kılcalda tek sıra hâlinde ilerler.", "Taşıdığı O₂ önce plazmaya, oradan dokuya difüze olur; hücrenin kendisi dışarı çıkmaz."] },
];
const exchangeFigure = mk({
  caption:
    "Kılcal duvarında birden çok geçiş aynı anda olur ve her birinin kendi itici farkı vardır. Bir maddeye dokun: su basınç terimlerinin farkıyla süzülür, O₂ ve CO₂ kendi kısmi basınç farklarıyla zıt yönlerde difüze olur, proteinlerin çoğu ve eritrositler içeride kalır. Nitel şema, ölçekli değildir.",
  alt: "Üstte yatay bir kılcal tüp, içinde bir eritrosit dairesi. Tüpün altında altı madde adı; su, O₂ ve glikoz için tüpten aşağı, CO₂ için yukarı ok, protein için kısa kesik ok; eritrositin oku yok. En altta doku sıvısı ve hücreler yazısı.",
  h: 340,
  picks: EXCHANGE.map((e) => ({ label: e.label, title: e.title, detail: e.detail })),
  draw: (_v, _s, pick) => {
    const els: El[] = [
      L(14, 60, 518, 60, { tone: "b" }),
      L(14, 120, 518, 120, { tone: "b" }),
      T(266, 90, "kılcal (kan)", "c", { tone: "muted" }),
      C(474, 90, 12, { tone: pick === 5 ? "a" : "warn", fill: pick === 5 ? "a" : "warn" }),
      T(266, 318, "doku sıvısı ve hücreler", "c", { tone: "muted" }),
    ];
    EXCHANGE.forEach((e, i) => {
      const t: Tone = pick === i ? "warn" : e.tone;
      if (e.dir === 1) els.push(A(e.x, 126, e.x, e.dash ? 168 : 212, t, { dash: e.dash, bold: pick === i }));
      if (e.dir === -1) els.push(A(e.x, 212, e.x, 126, t, { bold: pick === i }));
      els.push(T(e.x, 240, e.label, "c", { bold: true, tone: pick === i ? "warn" : "ink", pick: i }));
    });
    els.push(T(14, 280, "aşağı ok: kandan dokuya · yukarı: tersi", "e", { tone: "muted" }));
    const e = EXCHANGE[pick];
    return {
      els,
      readout: e
        ? [EXCHANGE_REL[pick]]
        : ["Bir maddeye dokun. Süzülme toplu sıvı hareketidir; difüzyon her maddenin kendi farkıyla olur.", "Bu yüzden net sıvı hesabı O₂ ya da CO₂'nin yönünü vermez."],
    };
  },
});

// Ortalama basınç (mmHg), öğretim modeli: her bölümün giriş ve çıkış değeri.
const SEGMENTS = [
  { label: "atardamar", p: [95, 90], row: 0, detail: ["Ortalama basınç yüksektir; atımla yaklaşık 120 ile 80 mmHg arasında dalgalanır (fark 40: nabız basıncı).", "Nabız duvarda yayılan basınç dalgasıdır; tek bir alyuvarın yol alma hızı değildir."] },
  { label: "arteriyol", p: [85, 35], row: 1, detail: ["Modeldeki en büyük düşüş burada: 85'ten 35 mmHg'ye. Düz kas çapı değiştirerek direnci ayarlar.", "Çap küçülünce aynı basınç farkında akış azalır; bunu Q = v × A tek başına söylemez, direnç bilgisi gerekir."] },
  { label: "kılcal", p: [35, 15], row: 0, detail: ["Basınç 35'ten 15 mmHg'ye iner ve dalgalanma kalmaz.", "Toplam kesit en büyük olduğu için ortalama hız en düşüktür: basınç ile hız ayrı grafiklerdir."] },
  { label: "venül", p: [15, 10], row: 1, detail: ["Kılcallardan gelen kan birleşir; basınç 15'ten 10 mmHg'ye düşer.", "Basınç farkı küçülse de sıfır olmadıkça akış kalbe doğru sürer."] },
  { label: "toplardamar", p: [10, 5], row: 0, detail: ["Basınç düşüktür; dönüşe kapaklar, iskelet kası pompası ve solunumla değişen göğüs basıncı yardım eder.", "Kapak yönü belirler; enerji kaynağı değildir."] },
  { label: "vena kava", p: [5, 2], row: 1, detail: ["Sağ atriyuma yaklaşırken basınç birkaç mmHg'ye iner (modelde 2).", "Dolaşım boyunca akış, yüksek basınçlı atardamar ucundan düşük basınçlı atriyuma doğrudur."] },
];
const pressureFigure = mk({
  caption:
    "Büyük dolaşımda ortalama basınç kalpten uzaklaştıkça düşer; en büyük düşüş arteriyollerdedir. Bir damar bölümüne dokun: giriş ve çıkış basıncı, düşüşün nedeni ve basıncın hızla neden karıştırılmaması gerektiği açılır. Değerler öğretim modelidir (mmHg).",
  alt: "Yatay eksende altı damar bölümü: atardamar, arteriyol, kılcal, venül, toplardamar, vena kava. Düşey eksen 0 ile 120 mmHg. Atardamar bölümünde 120 ile 80 arasında zikzak çizen dalgalı basınç ve ortalama çizgisi, sonraki bölümlerde soldan sağa düşen kırık çizgi; en dik düşüş arteriyol bölümünde.",
  h: 380,
  picks: SEGMENTS.map((s) => ({ label: s.label, title: `${s.label[0].toLocaleUpperCase("tr")}${s.label.slice(1)}: ${s.p[0]} → ${s.p[1]} mmHg`, detail: s.detail })),
  draw: (_v, _s, pick) => {
    const x0 = 64;
    const w = 72;
    const Y = (p: number) => 300 - p * (260 / 120);
    const els: El[] = [T(14, 16, "ortalama basınç (mmHg), öğretim modeli", "e", { tone: "muted" }), L(x0, 300, x0 + 6 * w, 300, { thin: true }), L(x0, 40, x0, 300, { thin: true })];
    [0, 40, 80, 120].forEach((p) => els.push(T(56, Y(p), String(p), "w", { tone: "muted" }), L(x0, Y(p), x0 + 6 * w, Y(p), { thin: true, dash: true, tone: "muted" })));
    // Atardamarda atımla dalgalanan basınç
    const zig: [number, number][] = [];
    for (let k = 0; k <= 6; k++) zig.push([x0 + (k * w) / 6, Y(k % 2 === 0 ? 80 : 120)]);
    els.push(PL(zig, { open: true, thin: true, tone: "c" }));
    SEGMENTS.forEach((s, i) => {
      const a = x0 + i * w;
      const t: Tone = pick === i ? "a" : "ink";
      els.push(L(a, Y(s.p[0]), a + w, Y(s.p[1]), { tone: t, bold: true }));
      if (i > 0) els.push(L(a, Y(SEGMENTS[i - 1].p[1]), a, Y(s.p[0]), { tone: "ink", thin: true }));
      if (pick === i) els.push(R(a, 40, a + w, 300, { tone: "a", dash: true }));
      els.push(T(a + w / 2, s.row === 0 ? 322 : 354, s.label, "c", { bold: true, tone: pick === i ? "a" : "ink", pick: i }));
    });
    const s = SEGMENTS[pick];
    return {
      els,
      readout: s
        ? [`${s.label[0].toLocaleUpperCase("tr")}${s.label.slice(1)}: ortalama ${s.p[0]} → ${s.p[1]} mmHg, düşüş ${s.p[0] - s.p[1]}.`, `Toplam düşüş 95 − 2 = 93 mmHg; bu bölümün payı %${Math.round(((s.p[0] - s.p[1]) / 93) * 100)}.`]
        : ["Bir bölüme dokun. Kalp basınç farkını kurar; damarların direnci bu farkın nerede harcandığını belirler.", "İnce zikzak atardamardaki 120/80 dalgalanmasıdır; kalın çizgi ortalama basınçtır."],
    };
  },
});

const EDEMA_REL = ["Değişen terim: dışa itme (Pc) artar.", "Değişen terim: içe çekiş (π) azalır.", "Değişen terim: duvardan protein ve sıvı geçişi artar.", "Değişen terim: doku arasından lenfe dönüş azalır."];
const EDEMA = [
  { label: "itme: Pc", x: 80, dir: 1, title: "Kılcal hidrostatik basınç artarsa", detail: ["Dışa iten terim büyür; doku arasına çıkış artabilir.", "Ödem tek nedenli bir hastalık adı değil, doku arasında sıvı birikimidir."] },
  { label: "çekiş: π", x: 200, dir: -1, title: "Plazma proteini azalırsa", detail: ["Damar içinde tutan onkotik çekiş azalır; aynı Pc'de dışa doğru net eğilim artar.", "Örnek: albümin azalmasında itme aynı kalsa bile denge dışa kayar."] },
  { label: "protein", x: 320, dir: 1, title: "Damar geçirgenliği artarsa", detail: ["Sıvı ve protein dokuya daha kolay geçer; doku arasındaki protein de sıvıyı orada tutar.", "Klasik iki terimli hesap bu terimi sıfır kabul eder; sorunun modeli açıkça yazılmalıdır."] },
  { label: "lenfe dönüş", x: 0, dir: 0, title: "Lenf tıkanırsa", detail: ["Süzülme olağan olsa bile fazla sıvı ve protein geri dönemez; birikim giriş ile çıkışın farkıdır.", "Aynı şişlik dört farklı mekanizmadan doğabilir; şişlikten tek neden çıkarılmaz."] },
];
const edemaFigure = mk({
  caption:
    "Klasik iki terimli hesap yalnız Pc ile π'yi kullanır; gerçek dokuda geçirgenlik, doku proteinleri ve lenf dönüşü de vardır. Bir terime dokun: o terim bozulduğunda doku arasında sıvı birikebilir, ama dört mekanizma aynı yoldan işlemez. Nitel şema, ölçekli değildir.",
  alt: "Üstte yatay kılcal tüp, sağda düşey lenf damarı. Tüpten aşağı itme oku, aşağıdan tüpe çekiş oku, tüpten aşağı kesik protein oku; doku arasından lenf damarına yatay dönüş oku. Seçilen terimin oku kalınlaşır ve doku arasında kesik çizgili birikim kutusu belirir.",
  h: 380,
  picks: EDEMA.map((e) => ({ label: e.label, title: e.title, detail: e.detail })),
  draw: (_v, _s, pick) => {
    const tone = (i: number, base: Tone): Tone => (pick === i ? "warn" : base);
    const els: El[] = [
      L(14, 40, 420, 40, { tone: "b" }),
      L(14, 90, 420, 90, { tone: "b" }),
      T(200, 65, "kılcal", "c", { tone: "muted" }),
      L(440, 110, 440, 340, { tone: "c" }),
      L(490, 110, 490, 340, { tone: "c" }),
      T(465, 360, "lenf", "c", { tone: "muted" }),
      T(150, 300, "doku arası sıvı", "c", { tone: "muted" }),
    ];
    EDEMA.forEach((e, i) => {
      if (e.dir === 1) els.push(A(e.x, 96, e.x, 176, tone(i, i === 2 ? "muted" : "a"), { dash: i === 2, bold: pick === i }), T(e.x + 16, 134, e.label, "e", { bold: true, tone: tone(i, "ink"), pick: i }));
      if (e.dir === -1) els.push(A(e.x, 176, e.x, 96, tone(i, "b"), { bold: pick === i }), T(e.x + 16, 134, e.label, "e", { bold: true, tone: tone(i, "ink"), pick: i }));
    });
    els.push(A(320, 240, 434, 240, tone(3, "c"), { bold: pick === 3, dash: pick === 3 }), T(372, 270, EDEMA[3].label, "c", { bold: true, tone: tone(3, "ink"), pick: 3 }));
    if (pick >= 0) els.push(R(40, 196, 280, 262, { tone: "warn", dash: true }), T(160, 218, "birikim olabilir", "c", { tone: "warn" }));
    const e = EDEMA[pick];
    return {
      els,
      readout: e
        ? [EDEMA_REL[pick]]
        : ["Bir terime dokun. Klasik model: net = Pc − π; artı dışa, eksi içe eğilim.", "Modern yaklaşımda çoğu dokuda sürekli toplardamar ucu geri emilimi zorunlu değildir; lenf dönüşü önemlidir."],
    };
  },
});

/* =====================================================================
 * 035 Soluk alışverişi
 * ===================================================================== */

const RIB_STEPS = ["Dinlenim", "Dış interkostal kasılır", "Hacim artar, basınç düşer", "Hava içe akar"];
const RIB_L = 260;
const ribEnd = (py: number, deg: number): [number, number] => [70 + RIB_L * Math.cos((deg * Math.PI) / 180), py + RIB_L * Math.sin((deg * Math.PI) / 180)];
const ribFigure = mk({
  caption:
    "Yandan görünüş, nitel ve ölçeksiz: kaburgalar arkada omurgaya eklemlidir. Dış interkostal kaslar kasılınca kaburgalar yukarı kalkar, öndeki uçları ve göğüs kemiği öne gelir; göğsün ön–arka çapı büyür. İleri ile çapı, ardından basıncı ve akışı aç.",
  alt: "Solda düşey omurga. Üç kaburga çizgisi omurgadan sağa ve aşağı uzanır, uçları düşey göğüs kemiği çizgisiyle birleşir. Adımlarda dinlenim kaburgaları kesik çizgide kalır, kalkmış kaburgalar düz çizilir; alttaki çift yönlü ok ön–arka çapı ve sayısını gösterir.",
  h: 440,
  steps: RIB_STEPS,
  draw: (_v, step) => {
    const pivots = [70, 120, 170];
    const rest = 28;
    const up = 14;
    const els: El[] = [R(40, 40, 70, 330, { tone: "muted" }), T(55, 24, "omurga", "c", { tone: "muted" })];
    const draw = (deg: number, tone: Tone, dash: boolean) => {
      const ends = pivots.map((p) => ribEnd(p, deg));
      ends.forEach(([x, y], i) => els.push(L(70, pivots[i], x, y, { tone, dash, bold: !dash })));
      els.push(L(ends[0][0], ends[0][1], ends[2][0], ends[2][1], { tone, dash, bold: !dash }));
      return ends;
    };
    const restEnds = draw(rest, step >= 1 ? "muted" : "ink", step >= 1);
    const ends = step >= 1 ? draw(up, "a", false) : restEnds;
    const sx = ends[0][0];
    els.push(T(sx + 14, (ends[0][1] + ends[2][1]) / 2, "göğüs kemiği", "e", { tone: step >= 1 ? "a" : "ink" }));
    if (step >= 1) els.push(A(ends[2][0] + 6, 246, ends[2][0] + 6, 214, "a", { thin: true }));
    const d0 = Math.round(RIB_L * Math.cos((rest * Math.PI) / 180));
    const d1 = Math.round(RIB_L * Math.cos((up * Math.PI) / 180));
    const d = step >= 1 ? d1 : d0;
    els.push(A(76, 320, 70 + d, 320, step >= 1 ? "a" : "ink", { thin: true }), A(70 + d - 6, 320, 72, 320, step >= 1 ? "a" : "ink", { thin: true }));
    els.push(T(200, 352, step >= 1 ? `ön–arka çap: ${d0} → ${d1} birim` : `ön–arka çap: ${d0} birim`, "c", { bold: step >= 1 }));
    if (step >= 2) els.push(T(266, 390, "Palv 759 < Patm 760 mmHg", "c", { tone: "b", bold: true }));
    if (step >= 3) els.push(T(266, 422, "hava içe akar, eşitlenince durur", "c", { tone: "a", bold: true }));
    const readout =
      [
        ["Dinlenimde kaburgalar omurgadan öne ve aşağı eğiktir.", "Çizimdeki birimler şematiktir; gerçek göğüs ölçüsü değildir."],
        [
          `Dış interkostaller kasılınca kaburgalar ${rest}° yerine ${up}° eğimde kalır; ön uçlar öne ve yukarı gelir: çap ${d0} → ${d1} birim (%${Math.round(((d1 - d0) / d0) * 100)} artış).`,
          "Diyaframın inmesiyle birlikte göğüs boşluğunun hacmi büyür. Sıra: önce kas, sonra hacim.",
        ],
        ["Hacim büyüyünce alveol basıncı atmosferin biraz altına iner (örnek 759 ile 760 mmHg).", "Hava hacim arttığı için değil, basınç farkı oluştuğu için hareket eder."],
        ["Hava yüksek basınçtan düşüğe, atmosferden alveole akar; basınçlar eşitlenince toplu akış durur.", "Akış durduğunda alveol ile kan arasındaki gaz difüzyonu sürer; ikisi ayrı süreçtir."],
      ][step] ?? [];
    return { els, readout };
  },
});

const EXPIRATION_ROWS = [
  { name: "inspirasyon kasları", calm: "gevşer", forced: "gevşer", active: [true, true] },
  { name: "elastik geri dönüş", calm: "temel itici etki", forced: "sürer", active: [true, true] },
  { name: "karın kasları", calm: "katılmaz", forced: "kasılır (karın içi)", active: [false, true] },
  { name: "iç interkostaller", calm: "katılmaz", forced: "kaburgaları indirir", active: [false, true] },
];
const expirationFigure = mk({
  caption:
    "Sakin soluk vermede soluk alma kasları gevşer ve akciğer ile göğüs duvarı esneklikleriyle geri çekilir; bu yüzden pasif denir. Zorlu soluk vermede karın kasları ve iç interkostaller ek basınç kurar. İki adımı karşılaştır: aynı çıkış yönü, farklı kas düzeni. Nitel şema, ölçekli değildir.",
  alt: "Solda göğüs kutusu, içinde akciğer yazısı, altında kubbeli diyafram eğrisi ve karın bölümü. Zorlu adımda kubbe daha yüksektir ve karın yanlarından içe iki ok vardır. Sağda dört katkı adı ve her adımda durumu: katılan katkılar koyu, katılmayanlar soluk yazılır. Altta alveol basıncının atmosfere göre durumu.",
  h: 400,
  steps: ["Sakin veriş", "Zorlu veriş"],
  draw: (_v, step) => {
    const peak = step === 0 ? 200 : 160;
    const els: El[] = [
      R(30, 40, 250, 250, {}),
      T(140, 80, "akciğer", "c", { tone: "muted" }),
      S([[30, 250], [80, peak + 15], [140, peak], [200, peak + 15], [250, 250]], { open: true, tone: "a", bold: true }),
      T(140, 232, "diyafram", "c", { tone: "a" }),
      R(30, 250, 250, 340, { tone: "muted" }),
      T(140, 300, "karın", "c", { tone: "muted" }),
      A(140, peak - 6, 140, peak - 40, "a", { thin: true }),
    ];
    if (step === 1) els.push(A(8, 315, 40, 315, "warn"), A(272, 315, 240, 315, "warn"));
    EXPIRATION_ROWS.forEach((r, i) => {
      const y = 50 + i * 70;
      const act = r.active[step];
      els.push(T(270, y, r.name, "e", { bold: true, tone: act ? "ink" : "muted" }), T(270, y + 28, step === 0 ? r.calm : r.forced, "e", { tone: act ? (i >= 2 ? "warn" : "a") : "muted" }));
    });
    els.push(T(266, 378, step === 0 ? "Palv biraz > Patm: dışa akış" : "Palv çok > Patm: hızlı dışa akış", "c", { bold: true }));
    return {
      els,
      readout:
        step === 0
          ? ["Sakin veriş: kaslar gevşer, diyafram yukarı kubbeleşir, hacim azalır; alveol basıncı atmosferi kısa süre aşar (örnek 761 ile 760 mmHg).", "Pasif sözcüğü hiçbir hücrenin ATP kullanmadığı anlamına gelmez; yalnız ek kas kasılması gerekmez."]
          : ["Zorlu veriş: karın kasları karın içeriğini diyaframa doğru iter, iç interkostaller kaburgaları indirir; basınç farkı büyür.", "Öksürme ya da kuvvetli üfleme bu düzene örnektir; sakin verişin açıklaması her duruma genellenmez."],
    };
  },
});

const RHYTHM_BOXES = [
  { label: "CO₂ artar, pH düşer", note: "kan ve BOS" },
  { label: "kemoreseptörler", note: "çevresel + merkezi" },
  { label: "soğan ve pons", note: "ritim ağı" },
  { label: "solunum kasları", note: "diyafram + kaburga" },
  { label: "ventilasyon artar", note: "hacim ve akış" },
  { label: "fazla CO₂ atılır", note: "geri bildirim (−)" },
];
const rhythmFigure = mk({
  caption:
    "Solunum ritmi bir denetim döngüsüdür: algılanan değişken, merkeze giden duyu yolu (afferent), merkezden kasa giden motor yol (efferent) ve sonucun değişkeni geri düzeltmesi. İleri ile döngüyü kur; okların yönü bilginin yönüdür. Nitel şema, ölçekli değildir.",
  alt: "Alt alta altı kutu: CO₂ artar ve pH düşer, kemoreseptörler, omurilik soğanı ve pons, solunum kasları, ventilasyon artar, fazla CO₂ atılır. Kutuların arasında aşağı oklar; ikinci ile üçüncü arasında afferent, üçüncü ile dördüncü arasında efferent yazısı. Son adımda en alttan en üste solda kesik geri bildirim oku. Kutuların sağında kısa notlar.",
  h: 470,
  steps: ["Algıla", "Merkeze ilet", "Kasa ilet", "Geri bildirim"],
  draw: (_v, step) => {
    const shown = [2, 3, 5, 6][step] ?? 2;
    const w = Math.max(...RHYTHM_BOXES.map((b) => bw(b.label, true)));
    const x0 = 44;
    const cx = x0 + w / 2;
    const els: El[] = [];
    RHYTHM_BOXES.slice(0, shown).forEach((b, i) => {
      const cy = 36 + i * 78;
      els.push(...B(cx, cy, b.label, { w, bold: true, tone: i === 5 ? "a" : "ink" }), T(x0 + w + 12, cy, b.note, "e", { tone: "muted" }));
      if (i < shown - 1) {
        els.push(A(cx, cy + 25, cx, cy + 53, "ink"));
        if (i === 1) els.push(T(cx + 12, cy + 39, "afferent", "e", { tone: "b" }));
        if (i === 2) els.push(T(cx + 12, cy + 39, "efferent", "e", { tone: "a" }));
      }
    });
    if (step >= 3) els.push(PL([[x0, 426], [22, 426], [22, 36]], { open: true, dash: true, tone: "a" }), A(22, 36, x0 - 2, 36, "a", { dash: true }));
    const readout =
      [
        ["Algılanan başlıca değişken kanın ve beyin–omurilik sıvısının CO₂ ve H⁺ durumudur.", "Karotit ve aort bölgesindeki alıcılar çevresel, omurilik soğanı yakınındakiler merkezi kemoreseptördür."],
        ["Duyu bilgisi merkeze doğru gider: afferent yön.", "Omurilik soğanı ve pons ritmi ve örüntüyü düzenler; sinyalin kaynağı ile hedefi ayrı etiketlenir."],
        ["Merkezden kasa giden motor sinyal efferent yöndür; diyafram ve dış interkostaller kasılır.", "Sonuç: göğüs hacmi büyür, alveol basıncı düşer, ventilasyon artar."],
        ["Artan ventilasyon fazla CO₂'yi uzaklaştırır; değişken azalınca uyarı da azalır: negatif geri bildirim.", "İstemli denetim kısa süre katkı verebilir; otomatik döngünün yerine geçmez."],
      ][step] ?? [];
    return { els, readout };
  },
});

/* =====================================================================
 * 036 Gazların taşınması
 * ===================================================================== */

const ROUTE = [
  { label: "alveol havası", note: "PO₂ yüksek" },
  { label: "alveol–kılcal zarı", note: "difüzyon" },
  { label: "plazmada çözünür", note: "küçük pay" },
  { label: "eritrositte Hb–O₂", note: "büyük pay" },
  { label: "kan akışı", note: "toplu taşıma" },
  { label: "doku kılcalında bırakılır", note: "difüzyon" },
  { label: "doku hücresi", note: "O₂ tüketir" },
];
const routeFigure = mk({
  caption:
    "O₂'nin yolu iki farklı hareketi birleştirir: zar boyunca difüzyon ve kanın toplu akışıyla taşıma. İleri ile yolu adım adım aç. Önce plazmada çözünen O₂, hemoglobine bağlanır; dokuda tersine ayrılıp hücreye geçer. Hemoglobin O₂'yi bırakamayan bir kilit değildir. Nitel şema, ölçekli değildir.",
  alt: "Alt alta yedi kutu: alveol havası, alveol–kılcal zarı, plazmada çözünür, eritrositte Hb–O₂, kan akışı, doku kılcalında bırakılır, doku hücresi. Kutular aşağı oklarla bağlı; sağda difüzyon, küçük pay, büyük pay, toplu taşıma gibi notlar. Adımlarla kutular sırayla eklenir.",
  h: 510,
  steps: ["Akciğerde geçiş", "Hemoglobine bağlanma", "Taşıma", "Dokuda bırakma"],
  draw: (_v, step) => {
    const shown = [3, 4, 5, 7][step] ?? 3;
    const w = Math.max(...ROUTE.map((r) => bw(r.label, true)));
    const cx = 14 + w / 2;
    const els: El[] = [];
    ROUTE.slice(0, shown).forEach((r, i) => {
      const cy = 36 + i * 72;
      const tone: Tone = i === 3 ? "a" : i === 1 || i === 5 ? "b" : "ink";
      els.push(...B(cx, cy, r.label, { w, bold: true, tone }), T(14 + w + 12, cy, r.note, "e", { tone: tone === "ink" ? "muted" : tone }));
      if (i < shown - 1) els.push(A(cx, cy + 25, cx, cy + 47, "ink", { dash: i === 3 }));
    });
    const readout =
      [
        ["Alveoldeki PO₂ kılcala gelen kandakinden yüksektir; O₂ zarı difüzyonla geçer ve önce plazmada çözünür.", "Çözünmüş O₂ toplam taşınanın küçük bir payıdır ama kısmi basıncı o belirler."],
        ["Eritrositte her hemoglobin dört hem grubunda dört O₂'ye kadar tersinir bağlar.", "Bağlanma çözünmüş O₂'yi azaltır ve alveolden kana difüzyonun sürmesine yardım eder."],
        ["Kan akışı O₂ yükünü dokulara toplu taşır; bu adım difüzyon değildir.", "Sistemik atardamarlar yükü dokulara götürür; akciğer atardamarı ise dokudan dönen kanı akciğere getirir."],
        ["Dokuda PO₂ düşüktür; Hb O₂'yi bırakır, O₂ plazma ve doku sıvısından hücreye difüze olur.", "Hücre O₂'yi tükettikçe doku PO₂'si düşük kalır ve fark korunur. CO₂ artışı ve pH düşüşü bırakmayı kolaylaştırır (Bohr etkisi)."],
      ][step] ?? [];
    return { els, readout };
  },
});

// 1 g Hb en çok 1,34 mL O₂ bağlar; çözünmüş O₂ = 0,003 mL/dL her mmHg için.
const contentFigure = mk({
  caption:
    "Kısmi basınç, doygunluk ve içerik üç ayrı niceliktir. PO₂ 95 mmHg ve doygunluk %97 sabitken sürgüyle kandaki hemoglobini değiştir: iki üst çubuk yerinde kalır, toplam O₂ içeriği hemoglobinle birlikte değişir. Bağlı O₂ = 1,34 × Hb × doygunluk; çözünmüş O₂ = 0,003 × PO₂. Nitel şema, ölçekli değildir.",
  alt: "Üç satır: PO₂ çubuğu 95 mmHg, doygunluk çubuğu yüzde 97, O₂ içeriği çubuğu bağlı ve çözünmüş paydan oluşan iki parçalı çubuk. Sürgü yalnız alttaki içerik çubuğunu değiştirir; değerler satır sonlarında yazılı.",
  h: 320,
  param: { label: "Hemoglobin", min: 6, max: 16, step: 1, init: 15, unit: "g/dL" },
  draw: (raw) => {
    const hb = snap(raw === 0 ? 15 : raw, 6, 16, 1);
    const bound = 1.34 * hb * 0.97;
    const diss = 0.003 * 95;
    const total = bound + diss;
    const k = 23;
    const els: El[] = [
      ...meterRow(24, "PO₂ (kısmi basınç)", "95 mmHg", 95 * 4.8, "b"),
      ...meterRow(114, "doygunluk", "%97", 97 * 4.8, "c"),
      ...meterRow(204, "O₂ içeriği", `${fx(total)} mL/dL`, bound * k, "a", { extra: [diss * k, "a"] }),
      T(266, 300, "PO₂ ve doygunluk sabit, içerik değişir", "c", { tone: "muted" }),
    ];
    return {
      els,
      readout: [
        `Hb = ${hb} g/dL: bağlı O₂ = 1,34 × ${hb} × 0,97 = ${fx(bound)} mL/dL; çözünmüş = 0,003 × 95 = ${fx(diss, 2)} mL/dL; toplam ${fx(total)} mL/dL.`,
        "Hemoglobin hiç bağlamasaydı aynı PO₂'de yalnız çözünmüş pay, yaklaşık 0,29 mL/dL kalırdı.",
        "Değerler okul modelidir: Hb başına 1,34 mL O₂ ve çözünürlük katsayısı kabul edilmiştir; kişisel ölçüm değildir.",
      ],
    };
  },
});

const SITES_REL = ["O₂: 104 > 40, alveolden kana · CO₂: 45 > 40, kandan alveole.", "O₂: 100 > 30, kandan dokuya · CO₂: 50 > 40, dokudan kana.", "Yön: sağ ventrikülden akciğere · PO₂ 40 mmHg.", "Yön: akciğerden sol atriyuma · PO₂ 100 mmHg."];
const SITES = [
  { label: "akciğer kılcalı", title: "Akciğer kılcalı: yükleme", detail: ["Alveol PO₂ 104, gelen kan 40 mmHg: O₂ alveolden kana geçer.", "Alveol PCO₂ 40, gelen kan 45 mmHg: CO₂ kandan alveole geçer ve soluk vermeyle dışarı atılır."] },
  { label: "doku kılcalı", title: "Doku kılcalı: boşaltma", detail: ["Gelen kan PO₂ 100, doku 30 mmHg: O₂ kandan dokuya geçer.", "Doku PCO₂ 50, gelen kan 40 mmHg: CO₂ dokudan kana geçer."] },
  { label: "akciğer atardamarı", title: "Akciğer atardamarı: O₂'si görece düşük", detail: ["Sağ ventrikülden akciğere gider; dokudan dönen kanı taşır (PO₂ 40, PCO₂ 45).", "Atardamar adı kalpten çıktığı için verilir; oksijen miktarı adı değiştirmez."] },
  { label: "akciğer toplardamarı", title: "Akciğer toplardamarı: O₂'si görece yüksek", detail: ["Akciğerden sol atriyuma döner; sol ventrikül bu kanı aortla dokulara gönderir (PO₂ 100, PCO₂ 40).", "Kalbe döndüğü için toplardamardır."] },
];
const circuitFigure = mk({
  caption:
    "Her gaz kendi kısmi basıncının yüksek olduğu yerden düşük olduğu yere geçer. Bir kılcala ya da damara dokun: akciğerde O₂ kana, CO₂ alveole; dokuda tersi. Damar adı kalbe göre yöndür, gaz içeriği değil. Basınçlar öğretim modelidir (mmHg).",
  alt: "Üstte akciğer kılcalı kutusu, üzerinde alveol değerleri ve aşağı O₂, yukarı CO₂ okları. Altta doku kılcalı kutusu, altında doku hücresi değerleri ve aşağı O₂, yukarı CO₂ okları. Solda alttan üste akciğer atardamarı, sağda üstten alta akciğer toplardamarı yolu ve değerleri.",
  h: 410,
  picks: SITES.map((s) => ({ label: s.label, title: s.title, detail: s.detail })),
  draw: (_v, _s, pick) => {
    const t = (i: number): Tone => (pick === i ? "a" : "ink");
    const wTop = bw(SITES[0].label, true);
    const wBot = bw(SITES[1].label, true);
    const els: El[] = [
      T(266, 26, "alveol: PO₂ 104 · PCO₂ 40", "c", { tone: "muted" }),
      A(220, 42, 220, 64, "a"),
      T(206, 53, "O₂", "w", { tone: "a", bold: true }),
      A(312, 64, 312, 42, "b"),
      T(326, 53, "CO₂", "e", { tone: "b", bold: true }),
      ...B(266, 90, SITES[0].label, { bold: true, tone: t(0), pick: 0 }),
      ...B(266, 310, SITES[1].label, { bold: true, tone: t(1), pick: 1 }),
      A(220, 336, 220, 358, "a"),
      T(206, 347, "O₂", "w", { tone: "a", bold: true }),
      A(312, 358, 312, 336, "b"),
      T(326, 347, "CO₂", "e", { tone: "b", bold: true }),
      T(266, 384, "doku: PO₂ 30 · PCO₂ 50", "c", { tone: "muted" }),
      // Sol yol: dokudan dönen kan sağ kalp üzerinden akciğere
      PL([[266 - wBot / 2, 310], [50, 310], [50, 90]], { open: true, tone: t(2) }),
      A(50, 90, 266 - wTop / 2 - 2, 90, t(2)),
      T(62, 150, SITES[2].label, "e", { bold: true, tone: t(2), pick: 2 }),
      T(62, 180, "PO₂ 40 · PCO₂ 45", "e", { tone: "muted" }),
      // Sağ yol: akciğerden sol kalp ve aort üzerinden dokuya
      PL([[266 + wTop / 2, 90], [482, 90], [482, 310]], { open: true, tone: t(3) }),
      A(482, 310, 266 + wBot / 2 + 2, 310, t(3)),
      T(470, 230, SITES[3].label, "w", { bold: true, tone: t(3), pick: 3 }),
      T(470, 260, "PO₂ 100 · PCO₂ 40", "w", { tone: "muted" }),
    ];
    const s = SITES[pick];
    return {
      els,
      readout: s
        ? [SITES_REL[pick]]
        : ["Bir kılcala ya da damara dokun. Yönü bulmak için aynı gazın iki taraftaki kısmi basıncını karşılaştır; toplam basınç bu soruyu çözmez.", "O₂ ve CO₂ aynı kılcalda zıt yönlerde geçer."],
    };
  },
});

const CONDITIONS_REL = ["PO₂ ≈ 160 mmHg; Hb yerleri O₂ ile dolu.", "PO₂ ≈ 80 mmHg; oran aynı %21, toplam basınç yarı.", "PO₂ ≈ 160 mmHg; Hb yerlerinin bir kısmı CO ile kapalı."];
const CONDITIONS = [
  { label: "deniz düzeyi", p: 760, po2: 160, sites: ["O", "O", "O", "O"], note: "4 yer O₂", title: "Deniz düzeyi", detail: ["Kuru havada PO₂ = 0,21 × 760 ≈ 160 mmHg.", "Akciğerden çıkan kanda hemoglobin yerleri neredeyse tümüyle O₂ ile doludur."] },
  { label: "yüksek rakım", p: 380, po2: 80, sites: ["O", "O", "O", "-"], note: "ort. 3 yer O₂", title: "Yüksek rakım (yaklaşık 5500 m)", detail: ["O₂ oranı yine yaklaşık %21'dir ama toplam basınç yarıya iner: PO₂ ≈ 0,21 × 380 ≈ 80 mmHg.", "Düşen kısmi basınç yükleme farkını azaltır; ortalama doluluk düşer. Zamanla solunum ve kan yapımında uyum görülebilir."] },
  { label: "CO soluma", p: 760, po2: 160, sites: ["O", "O", "C", "C"], note: "2 O₂ + 2 CO", title: "Karbonmonoksit soluma", detail: ["Havadaki PO₂ normal olabilir ama CO hemoglobine O₂'den çok daha güçlü bağlanır ve yerleri kapatır.", "Kalan O₂'nin dokuda bırakılması da zorlaşır. CO, karbondioksit (CO₂) ile aynı gaz değildir."] },
];
const altitudeFigure = mk({
  caption:
    "Havada O₂ bulunması, hemoglobinin O₂ taşıyabildiğini tek başına göstermez. Üç koşula dokun: yüksek rakımda O₂ yüzdesi aynı kalır ama toplam basınç düştüğü için PO₂ düşer; karbonmonoksitte PO₂ normalken hemoglobin yerleri CO ile kapanır. Hesap kuru hava içindir; yer sayıları örnek modeldir.",
  alt: "Üç sütun: deniz düzeyi, yüksek rakım, CO soluma. Her sütunda toplam basınç ve O₂ yüzdesi, PO₂ ile orantılı dikey çubuk ve değeri, altında hemoglobinin dört bağlanma yerini gösteren dört daire. Dolu daireler O₂, kesik kenarlı daireler CO, boş daireler boş yer; altında yer sayısı yazılı.",
  h: 360,
  picks: CONDITIONS.map((c) => ({ label: c.label, title: c.title, detail: c.detail })),
  draw: (_v, _s, pick) => {
    const els: El[] = [];
    CONDITIONS.forEach((c, i) => {
      const cx = 100 + i * 166;
      const t: Tone = pick === i ? "a" : "ink";
      const base = 270;
      const h = c.po2 * 0.9;
      els.push(
        T(cx, 22, c.label, "c", { bold: true, tone: t, pick: i }),
        T(cx, 50, `${c.p} mmHg`, "c", { tone: "muted" }),
        T(cx, 78, "O₂ oranı %21", "c", { tone: "muted" }),
        R(cx - 30, base - h, cx + 30, base, { tone: "b", fill: "b" }),
        T(cx, base - h - 16, `PO₂ ≈ ${c.po2}`, "c", { tone: "b", bold: true }),
      );
      c.sites.forEach((s, j) => {
        const x = cx - 39 + j * 26;
        if (s === "O") els.push(C(x, 298, 10, { tone: "a", fill: "a" }));
        else if (s === "C") els.push(C(x, 298, 10, { tone: "warn", dash: true }));
        else els.push(C(x, 298, 10, { tone: "muted" }));
      });
      els.push(T(cx, 334, c.note, "c", { tone: c.sites.includes("C") ? "warn" : "muted" }));
    });
    els.push(L(30, 270, 502, 270, { thin: true }));
    const c = CONDITIONS[pick];
    return {
      els,
      readout: c
        ? [CONDITIONS_REL[pick]]
        : ["Bir koşula dokun. PO₂ = O₂ oranı × toplam basınç (kuru hava, su buharı yok sayıldı).", "Dolu daire O₂, kesik daire CO, boş daire boş yer."],
    };
  },
});

// Her 10 m deniz suyu yaklaşık 1 atm ekler; N₂ oranı 0,78. Henry: dengede çözünen ∝ kısmi basınç.
const diveFigure = mk({
  caption:
    "Basınç arttıkça bir gazın sıvıda dengede çözünen miktarı kendi kısmi basıncıyla orantılı artar. Sürgüyle dalış derinliğini değiştir: toplam basınç, azotun kısmi basıncı ve dengede çözünen azot birlikte büyür. Bu doğrusal ilişki O₂–hemoglobin eğrisiyle aynı grafik değildir. Nitel şema, ölçekli değildir.",
  alt: "Üç satır yatay çubuk: toplam basınç (atm), N₂ kısmi basıncı (atm) ve yüzeye göre dengede çözünen N₂ katı. Derinlik arttıkça üç çubuk aynı oranda uzar; değerler satır sonlarında yazılı.",
  h: 320,
  param: { label: "Derinlik", min: 0, max: 30, step: 5, init: 10, unit: "m" },
  draw: (raw) => {
    const d = snap(raw, 0, 30, 5);
    const P = 1 + d / 10;
    const n2 = 0.78 * P;
    const k = 120;
    return {
      els: [
        ...meterRow(24, "toplam basınç", `${fx(P)} atm`, P * k, "ink"),
        ...meterRow(114, "N₂ kısmi basıncı", `${fx(n2, 2)} atm`, n2 * k, "b"),
        ...meterRow(204, "dengede çözünen N₂", `yüzeyin ${fx(P)} katı`, P * k, "c", { dash: true }),
        T(266, 300, "her 10 m deniz suyu yaklaşık 1 atm ekler", "c", { tone: "muted" }),
      ],
      readout: [
        `${d} m: P = 1 + ${d}/10 = ${fx(P)} atm; pN₂ = 0,78 × ${fx(P)} = ${fx(n2, 2)} atm.`,
        "Dokunun bu yeni dengeye ulaşması zaman alır; çubuk denge değerini gösterir.",
        "Basınç hızla düşerse fazla çözünmüş azot kabarcık oluşturabilir (vurgun); yavaş çıkışta fazla azot akciğerden verilir. Kanda azot sıvılaşmaz.",
      ],
    };
  },
});

export const biologyFigures072Sheets: Record<string, Record<string, FigureDef>> = {
  "dolasim-kalp": {
    "Dört odacık ve ayırıcı duvar": chamberFigure,
    "Dört kapak ve destek düzeni": valveFigure,
    "Duvarın beslenmesi odacık kanından ayrı": wallFigure,
    "Sinir ve hormonla hız düzenlenebilir": regulatorFigure,
  },
  "dolasim-damarlar-starling": {
    "Duvarın bileşimi yükle ilişkilidir": vesselWallFigure,
    "Kılcal damar değişim yüzeyidir": exchangeFigure,
    "Basınç, direnç ve hız aynı büyüklük değildir": pressureFigure,
    "Klasik şemanın gerçek fizyoloji sınırı": edemaFigure,
  },
  "soluk-alisverisi": {
    "Kaburgaların hareketi ve inspirasyon": ribFigure,
    "Dinlenim ekspirasyonu ve elastik geri dönüş": expirationFigure,
    "Solunum ritmini düzenleyen merkezler": rhythmFigure,
  },
  "solunum-gaz-tasinmasi": {
    "Gazı taşımak, kanı havayla doldurmak değildir": routeFigure,
    "Kısmi basınç, doygunluk ve içerik": contentFigure,
    "Gaz geçişi yönü ve dolaşım devresi": circuitFigure,
    "Karbonmonoksit ve yüksekliğin farklı etkisi": altitudeFigure,
    "Basınç değişimi ve çözünmüş gaz": diveFigure,
  },
};
