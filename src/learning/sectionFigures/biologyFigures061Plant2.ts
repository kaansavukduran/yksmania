import { type El, type FigureDef, type Tone } from "./figureKit";
import { A, B, C, L, PL, R, T, chain, mk, tableFig } from "./biologyFigures060Kit";
import { tr } from "./biologyFigures061Kit";

/*
 * AYT Biyoloji · Bitkilerde hareket ve fotoperiyodizm (Forge061). Sürgün,
 * koleoptil ve saksı çizimleri nitel öğretim şemasıdır, ölçekli değildir;
 * ilerleme ve kıvrılma miktarı saniye ya da milimetre değildir. Saat
 * hesapları bölüm metnindeki örneklerden gelir: 24 − 9 = 15; kritik gece
 * 10 saat için 12 saat (kısa gün) ve 8 saat (uzun gün); 14 = 7 + 7; 16 = 8 + 8.
 * Eşitlikte model karar üretmez.
 */

/* ---------------- Bitkilerde hareket ---------------- */

/**
 * Sürgün: tabanı (cx, base), boyu h; bend > 0 sola, < 0 sağa kıvrılır.
 * Kenarlar ayrı çizilir ki uzun taraf dış yayda görünsün.
 */
const stem = (cx: number, base: number, h: number, bend: number, o: { capTone?: Tone; cap?: "opaque" | "clear" | "none"; cut?: boolean; block?: "gel" | "mica" | "agarL" | "agarR" | "agarC" } = {}): El[] => {
  const n = 10;
  const mid: [number, number][] = Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    return [cx - bend * 60 * t * t, base - h * t];
  });
  const off = (s: number) =>
    mid.map(([x, y], i) => {
      const t = i / n;
      const dx = -bend * 120 * t;
      const l = Math.hypot(dx, -h) || 1;
      return [x + s * 12 * (h / l), y + s * 12 * (dx / l)] as [number, number];
    });
  const els: El[] = [PL(off(-1), { open: true, bold: true, tone: "a" }), PL(off(1), { open: true, bold: true, tone: "a" })];
  const [tx, ty] = mid[n];
  if (!o.cut) {
    if (o.cap === "opaque") els.push(C(tx, ty, 16, { tone: "ink", fill: "ink" }));
    else if (o.cap === "clear") els.push(C(tx, ty, 16, { tone: "c", dash: true }));
    else els.push(C(tx, ty, 10, { tone: "a", fill: "a" }));
  } else els.push(L(tx - 16, ty, tx + 16, ty, { tone: "warn", bold: true }));
  if (o.block === "gel") els.push(R(cx - 16, base - h * 0.62, cx + 16, base - h * 0.55, { tone: "c", fill: "c", dash: true }));
  if (o.block === "mica") els.push(L(cx - 20, base - h * 0.58, cx + 20, base - h * 0.58, { tone: "ink", bold: true }));
  if (o.block === "agarL") els.push(R(tx - 14, ty - 14, tx, ty, { tone: "warn", fill: "warn" }));
  if (o.block === "agarR") els.push(R(tx, ty - 14, tx + 14, ty, { tone: "warn", fill: "warn" }));
  if (o.block === "agarC") els.push(R(tx - 10, ty - 14, tx + 10, ty, { tone: "warn", fill: "warn" }));
  return els;
};

const geometry = mk({
  caption:
    "Asimetrik uzamanın geometrisi (nitel şema, ölçekli değil): iki taraf eşit uzarsa sürgün düz kalır; sağ taraf daha çok uzarsa sağ taraf dış yayda kalır ve sürgün sola kıvrılır. “Daha çok büyüyen tarafa doğru kıvrılır” ezberi geometriyi ters çevirir.",
  alt: "Tabandan yükselen iki kenarlı sürgün. Sürgü sağ ile sol tarafın uzama farkını değiştirir; fark arttıkça sürgün kısa tarafa doğru kıvrılıyor.",
  h: 300,
  param: { label: "Sağ − sol uzama", min: -2, max: 2, step: 1, init: 0 },
  draw: (d) => {
    const els = [L(120, 280, 412, 280, { tone: "muted" }), ...stem(266, 280, 220, d * 0.5)];
    const longer = d > 0 ? "sağ" : d < 0 ? "sol" : "";
    els.push(T(150, 230, "sol", "c", { tone: d < 0 ? "warn" : "muted", bold: d < 0 }), T(382, 230, "sağ", "c", { tone: d > 0 ? "warn" : "muted", bold: d > 0 }));
    return {
      els,
      readout: [d === 0 ? "İki taraf eşit uzar: düz uzama." : `Uzun taraf ${longer}: dış yayda kalır, tepe ${d > 0 ? "sola" : "sağa"} kıvrılır.`, "Önce uzun tarafı, sonra kısa tarafa yönelen tepeyi işaretle."],
    };
  },
});

type Setup = { name: string; o: Parameters<typeof stem>[4]; light: boolean; bend: number; txt: string };
const SETUPS: Setup[] = [
  { name: "Kontrol", o: {}, light: true, bend: 1, txt: "İşlem görmemiş koleoptil ışığa yönelir: karşılaştırma zemini." },
  { name: "Uç çıkarıldı", o: { cut: true }, light: true, bend: 0, txt: "Uç kaynaklı sinyal ve algılama bölgesi gider; uzama azalır, yönelme kaybolur." },
  { name: "Opak başlık", o: { cap: "opaque" }, light: true, bend: 0, txt: "Işık uca ulaşmaz; yönelme kaybolur, simetrik uzama sürebilir." },
  { name: "Saydam başlık", o: { cap: "clear" }, light: true, bend: 1, txt: "Kapak var ama ışık geçer; yönelme sürer: kapak etkisi kontrolü." },
  { name: "Jelatin blok", o: { block: "gel" }, light: true, bend: 1, txt: "Kimyasal geçebilir; yanıt sürer." },
  { name: "Mika", o: { block: "mica" }, light: true, bend: 0, txt: "Geçirimsiz bariyer enine bağlantıyı keser; sinyal geçişi engellenebilir." },
];
const setups = mk({
  caption:
    "Düzenek sonucunu üç soruyla çöz (klasik koleoptil deneylerinin nitel şeması, ölçekli değil): algılama alanı açık mı, sinyal geçebilir mi, iki tarafın büyümesi eşit mi? Opak uçta ışık algısı, mikada kimyasal yol değişir; her düzenek kontrolle karşılaştırılır.",
  alt: "Solda ışık okları, ortada koleoptil. Adımlarda kontrol, ucu kesilmiş, opak başlıklı, saydam başlıklı, arasına jelatin blok ve mika konmuş koleoptiller; ışığa yönelenler sola kıvrılmış, diğerleri düz.",
  h: 300,
  steps: SETUPS.map((s) => s.name),
  draw: (_v, step) => {
    const s = SETUPS[step];
    const els: El[] = [L(100, 280, 360, 280, { tone: "muted" }), ...stem(230, 280, 210, s.bend * 0.45, s.o)];
    for (let i = 0; i < 3; i++) els.push(A(20, 80 + i * 40, 70, 80 + i * 40, "warn", { thin: true }));
    els.push(T(20, 40, "ışık", "e", { tone: "warn", bold: true }));
    els.push(T(330, 110, s.name, "e", { tone: "a", bold: true }), T(330, 150, s.bend ? "yönelme var" : "yönelme yok", "e", { tone: s.bend ? "a" : "muted" }));
    return { els, readout: [`${s.name}: ${s.txt}`, "Yönelme yok sonucunu her durumda hiç büyüme yok ile aynı sayma."] };
  },
});

const AGAR = [
  { name: "Sol yarıda agar", o: { cut: true, block: "agarL" as const }, bend: -1, txt: "Sol tarafta uzama daha çok; tepe sağa kıvrılır." },
  { name: "Ortada agar", o: { cut: true, block: "agarC" as const }, bend: 0, txt: "Simetrik uzama; karanlıkta bile oluşur." },
  { name: "Sağ yarıda agar", o: { cut: true, block: "agarR" as const }, bend: 1, txt: "Sağ tarafta uzama daha çok; tepe sola kıvrılır." },
];
const agar = mk({
  caption:
    "Yandaki agar kıvrılma yönünü sınar (karanlıkta nitel deney şeması, ölçekli değil): oksinli agar kesik ucun sol yarısına konursa tepe sağa, sağ yarısına konursa sola kıvrılır; ortada simetrik uzama olur. Işık verilmediği için bu yönelim fototropizma diye adlandırılmaz.",
  alt: "Karanlık zeminde ucu kesilmiş koleoptil; kesik ucun üstünde küçük agar bloğu. Adımlarda blok sol yarıda, ortada ve sağ yarıda; sürgün sırasıyla sağa, düz ve sola kıvrılıyor.",
  h: 300,
  steps: AGAR.map((a) => a.name),
  draw: (_v, step) => {
    const a = AGAR[step];
    const els: El[] = [R(60, 20, 472, 290, { tone: "muted", dash: true }), L(120, 280, 412, 280, { tone: "muted" }), ...stem(266, 280, 210, a.bend * 0.45, a.o)];
    els.push(T(80, 50, "karanlık", "e", { tone: "muted" }), T(80, 80, "oksinli agar", "e", { tone: "warn" }));
    return { els, readout: [`${a.name}: ${a.txt}`, "Asimetrik kimyasal dağılım büyüme farkı yaratabilir."] };
  },
});

const gravity = mk({
  caption:
    "Gravitropizmada referans yerçekimidir (nitel şema, ölçekli değil): yatırılmış saksıda kök yerçekimi yönünde aşağı (pozitif), sürgün ters yönde yukarı (negatif) kıvrılır. Kök ve sürgünün oksin doz yanıtı farklıdır; oksin yalnız su gibi akmaz.",
  alt: "Yan yatırılmış saksı. Sürgün önce yatay çıkıp yukarı kıvrılıyor; kök yatay çıkıp aşağı kıvrılıyor. Sağda aşağı yönlü yerçekimi oku.",
  h: 300,
  draw: () => {
    const els: El[] = [
      R(60, 110, 170, 210, { bold: true, tone: "muted" }),
      PL([[170, 140], [260, 140], [310, 120], [330, 70], [334, 30]], { open: true, bold: true, tone: "a" }),
      PL([[170, 180], [240, 180], [280, 200], [300, 240], [304, 280]], { open: true, bold: true, tone: "b" }),
      A(500, 80, 500, 200, "ink", { bold: true }),
    ];
    els.push(T(488, 60, "yerçekimi", "w", { tone: "ink" }));
    els.push(T(346, 40, "sürgün: negatif", "e", { tone: "a", bold: true }), T(316, 270, "kök: pozitif", "e", { tone: "b", bold: true }), T(115, 236, "saksı", "c", { tone: "muted" }));
    return { els, readout: ["Ekranın altı değil fiziksel yerçekimi doğrultusu referanstır.", "Işık yönü de değişiyorsa iki uyaranın etkisini ayırmak gerekir."] };
  },
});

const classes = tableFig({
  caption:
    "Uyaranı değiştirerek sınıflamayı sına (bölüm metninden): tropizmada hareket yönü uyaranın geliş yönüne bağlıdır; nastide yanıtın biçimini organın yapısı belirler. Pozitif ve negatif yarar–zarar değil, yön etiketidir.",
  alt: "İki sütunlu tablo: tropizma örnekleri fototropizma ışık, gravitropizma yerçekimi, hidrotropizma nem, tigmotropizma temas; nasti örnekleri fotonasti ışık, termonasti sıcaklık, sismonasti dokunma.",
  headers: ["Tropizma: yöne bağlı", "Nasti: yöne bağlı değil"],
  rows: [
    ["fototropizma: ışık", "fotonasti: ışık"],
    ["gravitropizma:\nyerçekimi", "termonasti:\nsıcaklık"],
    ["hidrotropizma: nem", "sismonasti: dokunma"],
    ["tigmotropizma: temas", "turgor ya da\nfarklı büyüme"],
  ],
  readout: ["Uyaran yönü değişince hareket yönü düzenli değişiyorsa tropizma açıklaması güçlenir.", "Uyaranın adı tek başına tropizma/nasti ayrımını yapmaz."],
});

/* ---------------- Fotoperiyodizm ---------------- */

/** 24 saatlik yatay şerit: [ [başlangıç, bitiş, aydınlık mı] ]; saat 0 solda. */
const strip = (segs: [number, number, boolean][], y: number, o: { x0?: number; w?: number; pulse?: number } = {}): El[] => {
  const x0 = o.x0 ?? 30;
  const w = o.w ?? 472;
  const X = (h: number) => x0 + (h / 24) * w;
  const els: El[] = [];
  for (const [a, b, light] of segs) els.push(R(X(a), y, X(b), y + 40, { tone: light ? "warn" : "b", fill: light ? "warn" : "b" }));
  els.push(R(x0, y, x0 + w, y + 40, { bold: true }));
  if (o.pulse !== undefined) els.push(R(X(o.pulse) - 3, y - 10, X(o.pulse) + 3, y + 50, { tone: "warn", fill: "warn" }));
  for (const h of [0, 6, 12, 18, 24]) els.push(L(X(h), y + 40, X(h), y + 48, { tone: "muted" }), T(X(h), y + 64, String(h), "c", { tone: "muted" }));
  return els;
};

const cycle = mk({
  caption:
    "Yirmi dört saatlik döngüyü önce tamamla (bölümdeki aritmetik): gece süresi 24 − gündüz süresidir; 9 saat gündüz 15 saat gece demektir. Işığın şiddeti, spektrumu ve bitkinin yaşı bu hesaptan ayrı verilerdir.",
  alt: "24 saatlik yatay şerit: solda açık renkli gündüz, sağda koyu renkli gece. Sürgü gündüz süresini 6 ile 18 saat arasında değiştirir.",
  h: 180,
  param: { label: "Gündüz", min: 6, max: 18, step: 1, init: 9, unit: "saat" },
  draw: (d) => {
    const els = strip(
      [
        [0, d, true],
        [d, 24, false],
      ],
      60,
    );
    els.push(T(30 + (d / 24) * 236, 36, `gündüz ${d}`, "c", { tone: "warn", bold: true }), T(30 + ((d + 24) / 48) * 472, 36, `gece ${24 - d}`, "c", { tone: "b", bold: true }));
    return { els, readout: [`Gece = 24 − ${d} = ${24 - d} saat.`, "Geceyi gündüzle aynı uzunlukta varsayma."] };
  },
});

const verdict = (night: number, crit: number, group: "kg" | "ug") => (night === crit ? "karar yok (eşitlik)" : (group === "kg" ? night > crit : night < crit) ? "uyarım" : "uyarım yok");
const critical = mk({
  caption:
    "Kısa gün ve uzun gün örneği aynı eşikte (bölümdeki örnek: kritik gece 10 saat): kısa gün (uzun gece) örneği eşiği aşan kesintisiz geceyle, uzun gün (kısa gece) örneği eşikten kısa geceyle uyarılır. 12 saat kısa gün, 8 saat uzun gün örneğini destekler; eşitlikte model karar üretmez. Gerçek türlerin eşiği değildir.",
  alt: "Yatay gece süresi ekseni üzerinde 10 saatte kesik eşik çizgisi ve seçili gece süresini gösteren çubuk. Altında kısa gün ve uzun gün örnekleri için sonuç kutuları. Sürgü kesintisiz geceyi 6 ile 16 saat arasında değiştirir.",
  h: 260,
  param: { label: "Kesintisiz gece", min: 6, max: 16, step: 1, init: 12, unit: "saat" },
  draw: (n) => {
    const crit = 10;
    const x0 = 40;
    const X = (h: number) => x0 + (h / 16) * 450;
    const els: El[] = [R(X(0), 40, X(n), 76, { tone: "b", fill: "b" }), A(x0, 90, X(16) + 10, 90, "ink", { thin: true }), L(X(crit), 26, X(crit), 100, { tone: "warn", dash: true, bold: true })];
    for (const h of [0, 4, 8, 12, 16]) els.push(T(X(h), 114, String(h), "c", { tone: "muted" }));
    els.push(T(X(crit), 14, "kritik 10", "c", { tone: "warn", bold: true }), T(X(n) - 6, 58, `${n} saat`, n > 2 ? "w" : "e", { tone: "ink", bold: true }));
    const kg = verdict(n, crit, "kg");
    const ug = verdict(n, crit, "ug");
    const box = (cx: number, title: string, v: string): El[] => B(cx, 200, `${title}\n${v}`, { w: 230, tone: v === "uyarım" ? "a" : "muted", fill: v === "uyarım" ? "a" : undefined });
    els.push(...box(140, "Kısa gün", kg), ...box(392, "Uzun gün", ug));
    return { els, readout: [`Gece ${n}, kritik ${crit}: kısa gün ${kg}, uzun gün ${ug}.`, "Bitki olgun değilse uygun geceye rağmen yanıt oluşmayabilir."] };
  },
});

const pieces = (total: number, day: number) =>
  mk({
    caption:
      total === 14
        ? "Toplam karanlık ile kesintisiz karanlık (bölümdeki örnek): 14 saatlik gece ortada etkili kısa ışık darbesiyle bölünürse toplam karanlık yaklaşık aynı kalır ama en uzun kesintisiz parça 7 saattir. Darbe süresi ihmal edilir; model tek gece ortası darbeye duyarlı örnek kullanır."
        : "Tabloyu gece parçalarına çevir (bölümdeki örnek): gündüz 8, gece 16 saat ve orta darbe varsa gece iki etkili 8 saatlik parçaya ayrılır. Sonra türün kritik eşiği ve darbenin tersine çevrilip çevrilmediği kullanılır; darbe süresi ihmal edilir.",
    alt: `24 saatlik şerit: ${day} saat açık renkli gündüz, ${total} saat koyu renkli gece. İkinci adımda gecenin ortasında dar ışık darbesi ve iki eşit gece parçası.`,
    h: 200,
    steps: ["Kesintisiz gece", "Ortada darbe"],
    draw: (_v, step) => {
      const half = total / 2;
      const els = strip(
        [
          [0, day, true],
          [day, 24, false],
        ],
        70,
        { pulse: step === 1 ? day + half : undefined },
      );
      const X = (h: number) => 30 + (h / 24) * 472;
      if (step === 0) els.push(T(X(day + half), 46, `kesintisiz ${total} saat`, "c", { tone: "b", bold: true }));
      else els.push(T(X(day + half / 2), 46, `${tr(half)} saat`, "c", { tone: "b", bold: true }), T(X(day + (3 * half) / 2), 46, `${tr(half)} saat`, "c", { tone: "b", bold: true }), T(X(day + half), 168, "darbe", "c", { tone: "warn", bold: true }));
      return {
        els,
        readout: [step === 0 ? `Toplam karanlık ${total}, en uzun kesintisiz parça ${total} saat.` : `${total} = ${tr(half)} + ${tr(half)}: en uzun kesintisiz parça ${tr(half)} saat.`, "Yalnız günlük toplamı toplamak deneyi açıklamayabilir."],
      };
    },
  });

const PULSE = [
  { name: "Kırmızı", seq: ["K"], txt: "Kırmızı darbe Pr'yi Pfr'ye çevirir; uzun gece işlevsel olarak kesilir." },
  { name: "Kırmızı → uzak kırmızı", seq: ["K", "UK"], txt: "Son darbe uzak kırmızı: Pfr → Pr; kesinti etkisi tersine çevrilebilir." },
  { name: "Uzak kırmızı → kırmızı", seq: ["UK", "K"], txt: "Son darbe kırmızı: sistem Pfr durumunda; kesinti etkisi sürer." },
];
const phyto = mk({
  caption:
    "Ardışık darbelerde son uygulamayı izle (bölümdeki fitokrom duyarlı örnek, nitel şema): Pr kırmızı ışıkla Pfr'ye, Pfr uzak kırmızıyla Pr'ye dönüşür. Kırmızı → uzak kırmızı ile uzak kırmızı → kırmızı aynı sonucu vermez; son etkin darbe durumu belirler. Renkler ölçülmüş reseptör yüzdesi değildir.",
  alt: "Solda Pr, sağda Pfr kutusu; üstte Pr'den Pfr'ye kırmızı oku, altta Pfr'den Pr'ye uzak kırmızı oku. Adımlarda darbe dizisi ve son durumun kutusu vurgulu.",
  h: 280,
  steps: PULSE.map((p) => p.name),
  draw: (_v, step) => {
    const p = PULSE[step];
    const last = p.seq[p.seq.length - 1];
    const state = last === "K" ? "Pfr" : "Pr";
    const els: El[] = [
      ...B(110, 140, "Pr", { w: 140, h: 70, tone: state === "Pr" ? "a" : "muted", fill: state === "Pr" ? "a" : undefined, bold: true }),
      ...B(422, 140, "Pfr", { w: 140, h: 70, tone: state === "Pfr" ? "a" : "muted", fill: state === "Pfr" ? "a" : undefined, bold: true }),
      A(190, 116, 342, 116, "warn", { bold: last === "K" }),
      A(342, 164, 190, 164, "b", { bold: last === "UK" }),
    ];
    els.push(T(266, 92, "kırmızı", "c", { tone: "warn" }), T(266, 190, "uzak kırmızı", "c", { tone: "b" }));
    els.push(T(266, 34, `darbe: ${p.seq.map((s) => (s === "K" ? "kırmızı" : "uzak kırmızı")).join(" → ")}`, "c", { tone: "ink", bold: true }));
    els.push(T(266, 250, `son durum: ${state}`, "c", { tone: "a", bold: true }));
    return { els, readout: [p.txt, "Kural yalnız belirtilen darbe koşulu ve örnek için geçerlidir."] };
  },
});

const leaf = mk({
  caption:
    "Yaprağın algısı ve sürgünün gelişimi (nitel akış şeması): yapraklar fotoperiyodu algılayabilir; floemle gidebilen hareketli çiçeklenme sinyalleri sürgün uç meristeminin çiçeklenme programına geçişine katkı verir. Algılanan yer ile çiçeğin oluştuğu yer aynı olmak zorunda değildir.",
  alt: "Yukarıdan aşağı dört kutu: yaprak ışık süresini algılar, hareketli sinyal floemle taşınır, sürgün uç meristemi, çiçeklenme programına geçiş.",
  h: 320,
  draw: () => {
    const c = chain(
      [
        { label: "Yaprak: süreyi algılar", tone: "a" },
        { label: "Hareketli sinyal (floem)", tone: "c" },
        { label: "Sürgün uç meristemi", tone: "b" },
        { label: "Çiçeklenme programı", tone: "b", fill: "b", bold: true },
      ],
      { cx: 266, w: 320, gap: 30 },
    );
    return { els: c.els, readout: ["Yaprak yalnız şeker üretmez; düzenleyici ileti de başlatır.", "Sinyal her bitkide aynı tek molekül diye iddia edilmez."] };
  },
});

export const biologyFigures061Plant2: Record<string, Record<string, FigureDef>> = {
  "bitkilerde-hareket": {
    "Asimetrik uzamanın geometrisini kur": geometry,
    "Yandaki agar kıvrılma yönünü sınar": agar,
    "Gravitropizmada referans yerçekimidir": gravity,
    "Düzenek sonucunu üç soruyla çöz": setups,
    "Uyaranı değiştirerek sınıflamayı sınayabilirsin": classes,
  },
  "bitki-fotoperiyodizm": {
    "Yirmi dört saatlik döngüyü önce tamamla": cycle,
    "Kısa gün örneğini uzun gece koşuluyla kur": critical,
    "Toplam karanlık ile kesintisiz karanlığı ayır": pieces(14, 10),
    "Ardışık darbelerde son uygulamayı izle": phyto,
    "Yaprağın algısı ve sürgünün gelişimi bağlantılıdır": leaf,
    "Tabloyu gece parçalarına çevir": pieces(16, 8),
  },
};
