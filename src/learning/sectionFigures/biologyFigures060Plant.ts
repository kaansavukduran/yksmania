import { fmt, type El, type FigureDef, type Tone } from "./figureKit";
import { A, B, C, L, R, S, T, chain, lead, mk, tableFig } from "./biologyFigures060Kit";

/*
 * AYT Biyoloji · Meristem, iletim doku, bitkide madde taşınması ve kök
 * anatomisi (Forge060). Doku ve organ çizimleri nitel öğretim şemasıdır,
 * ölçekli değildir; bölge sınırları gerçek dokuda keskin değildir. Sayılar
 * bölümlerden gelir: ideal soyda N × 2ᵏ, su potansiyeli örneği −0,2 ile
 * −0,9 MPa.
 */

/* ---------------- Ortak: kök ucu boyuna kesiti ---------------- */

type Zone = "olg" | "uz" | "bol" | "kal";
const ZONES: { id: Zone; name: string; y0: number; y1: number }[] = [
  { id: "olg", name: "Olgunlaşma", y0: 14, y1: 120 },
  { id: "uz", name: "Uzama", y0: 120, y1: 210 },
  { id: "bol", name: "Bölünme", y0: 210, y1: 262 },
  { id: "kal", name: "Kaliptra", y0: 262, y1: 316 },
];
const rootTip = (hi: Zone | null): El[] => {
  const els: El[] = [S([[150, 14], [150, 250], [160, 290], [195, 314], [230, 290], [240, 250], [240, 14]], { open: true, bold: true })];
  const tone = (z: Zone): Tone => (hi === z ? "a" : "muted");
  for (let y = 214; y < 258; y += 11) for (let x = 156; x < 236; x += 13) els.push(R(x, y, x + 11, y + 9, { tone: tone("bol"), thin: true }));
  for (let y = 124; y < 206; y += 41) for (let x = 156; x < 236; x += 20) els.push(R(x, y, x + 18, y + 38, { tone: tone("uz"), thin: true }));
  for (let y = 20; y < 116; y += 48) for (let x = 156; x < 236; x += 20) els.push(R(x, y, x + 18, y + 44, { tone: tone("olg"), thin: true }));
  for (const y of [30, 52, 74, 96]) els.push(L(150, y, 112, y - 10, { tone: tone("olg") }), L(240, y + 8, 278, y - 2, { tone: tone("olg") }));
  els.push(S([[154, 262], [160, 290], [195, 312], [230, 290], [236, 262], [195, 270]], { tone: tone("kal"), fill: hi === "kal" ? "a" : "muted" }));
  ZONES.forEach((z, i) => {
    els.push(L(300, z.y0 + 3, 300, z.y1 - 3, { tone: hi === z.id ? "a" : "ink", bold: hi === z.id }));
    els.push(T(306, (z.y0 + z.y1) / 2, z.name, "e", { bold: hi === z.id, tone: hi === z.id ? "a" : "ink" }));
    void i;
  });
  return els;
};

const ZTXT: Record<Zone, string> = {
  kal: "Kaliptra ilerleyen hassas ucu ve meristemi korur; emici tüy bölgesi değildir.",
  bol: "Apikal meristemle ilişkili bölünme bölgesinde hücre sayısı artar; hücreler küçüktür.",
  uz: "Uzama bölgesinde hücreler su alımı ve çeper düzenlenmesiyle boy kazanır.",
  olg: "Olgunlaşma bölgesinde görevler belirginleşir; emici tüyler burada görülür.",
};
const ZORDER: Zone[] = ["kal", "bol", "uz", "olg"];
const tipZones = mk({
  caption:
    "Kök ucundaki sıralı bölgeler (nitel boyuna kesit şeması, ölçekli değil): uçta kaliptra, gerisinde bölünme, daha geride uzama ve olgunlaşma bölgeleri. Hücreler oluşturulur, uzar ve işlev kazanır. Bölge sınırları öğrenmeyi kolaylaştırır; gerçek dokuda geçişler keskin değildir.",
  alt: "Aşağı doğru uzanan kök ucu: en altta başlık biçimli kaliptra, üstünde küçük hücreli bölünme bölgesi, uzun hücreli uzama bölgesi ve yanlara emici tüy çıkan olgunlaşma bölgesi. Sağda bölge adları; adımlarda bölgeler sırayla vurgulanıyor.",
  h: 330,
  steps: ZORDER.map((z) => ZONES.find((x) => x.id === z)!.name),
  draw: (_v, step) => ({ els: rootTip(ZORDER[step]), readout: [ZTXT[ZORDER[step]], "Kök boyunca farklı yerlerden alınan örneklerde hücre boyu ve bölünme oranı bu yüzden farklıdır."] }),
});

/* ---------------- Meristem ---------------- */

const classTable = tableFig({
  caption:
    "İki sınıflama iki farklı soru sorar (bölümdeki tablo): konum sorusu apikal, lateral ve bazı türlerde ara meristemi; köken sorusu birincil ve ikincil meristemi ayırır. Apikal etkinlik boyuna, lateral etkinlik enine büyümeye katkı verir. Konum ve köken aynı eksen değildir.",
  alt: "İki satırlı tablo: soru, sınıflama ve ana ilişki. Nerede sorusu apikal, lateral ve ara; büyümenin konumu. Hangi gelişim kökeni sorusu birincil ve ikincil; bölünme özelliğinin sürekliliği ya da yeniden kazanılması.",
  headers: ["Soru", "Sınıflama", "Ana ilişki"],
  rows: [
    ["Nerede?", "apikal / lateral /\nbazı türlerde ara", "büyümenin\nkonumu"],
    ["Hangi gelişim\nkökeni?", "birincil /\nikincil", "bölünme\nsürer ya da\nyeniden\nkazanılır"],
  ],
  readout: ["Bütün lateral meristem hücrelerini tek bir sonradan dönüşmüş hücre tipine indirgemek aşırı basitleştirmedir.", "Çimensi türlerin boğum ve yaprak tabanlarında ara meristem yeniden uzamayı destekleyebilir."],
});

const woodyRings = (mode: "cambium" | "bark"): El[] => {
  const cx = 140;
  const cy = 150;
  const k = 0.86;
  const r = (x: number) => x * k;
  const els: El[] = [
    C(cx, cy, r(148), { tone: "warn", fill: "warn" }),
    C(cx, cy, r(136), { tone: "muted", fill: "muted" }),
    C(cx, cy, r(120), { tone: "b", fill: "b" }),
    C(cx, cy, r(102), { tone: "c", fill: "c" }),
    C(cx, cy, r(22), { tone: "ink", fill: "muted" }),
    C(cx, cy, r(104), { tone: "a", bold: true }),
    T(cx, cy, "öz", "c", { tone: "muted" }),
  ];
  if (mode === "cambium") {
    els.push(A(cx + r(104), cy - 20, cx + r(60), cy - 20, "c", { bold: true }), A(cx + r(104), cy + 20, cx + r(128), cy + 20, "b", { bold: true }));
    els.push(...lead(cx + r(104) * Math.cos(-0.6), cy + r(104) * Math.sin(-0.6), 300, 30, "damar kambiyumu", "a", true));
    els.push(...lead(cx + r(50), cy + 40, 300, 110, "içe: ikincil ksilem", "c"));
    els.push(...lead(cx + r(112) * Math.cos(0.5), cy + r(112) * Math.sin(0.5), 300, 190, "dışa: ikincil floem", "b"));
    els.push(...lead(cx + r(142) * Math.cos(0.9), cy + r(142) * Math.sin(0.9), 300, 270, "dış koruyucu doku", "warn"));
  } else {
    const y = cy + r(148) + 24;
    els.push(L(cx, y, cx + r(104), y, { bold: true, tone: "c" }), L(cx + r(104), y - 10, cx + r(104), y + 10, { tone: "a", bold: true }), L(cx + r(104), y, cx + r(148), y, { bold: true, tone: "warn" }));
    els.push(T(cx + r(40), y + 24, "odun", "c", { bold: true, tone: "c" }), T(cx + r(126), y + 24, "kabuk", "c", { bold: true, tone: "warn" }));
    els.push(...lead(cx + r(104) * Math.cos(-0.6), cy + r(104) * Math.sin(-0.6), 300, 30, "kambiyum: sınır", "a", true));
    els.push(T(300, 110, "kabuk: kambiyumun", "e", { tone: "warn" }), T(300, 136, "dışındaki floem ve", "e", { tone: "warn" }), T(300, 162, "koruyucu dokular", "e", { tone: "warn" }));
    els.push(T(300, 230, "odun: ikincil ksilem", "e", { tone: "c" }));
  }
  return els;
};
const cambium = mk({
  caption:
    "Damar kambiyumunun iki yanı (öğretim modeli, ölçekli değil): kambiyum bölünerek içe ikincil ksilem, dışa ikincil floem oluşturur; ksilem birikimi odunun önemli bölümüdür. Yönü merkeze ve dış çevreye göre izle. Kambiyum hücrelerinin kökeni her yerde aynı değildir.",
  alt: "İç içe halkalar: merkezde öz, geniş ikincil ksilem halkası, kalın çizgiyle damar kambiyumu, ince ikincil floem halkası ve en dışta koruyucu doku. Kambiyumdan içe ve dışa iki ok.",
  h: 330,
  draw: () => ({ els: woodyRings("cambium"), readout: ["İç ksilem, dış floem: kambiyum sabit referanstır.", "Renkler ezber değil; konum ilişkisi tanı sağlar."] }),
});
const woodBark = mk({
  caption:
    "Odun ve kabuk aynı sınır değildir (öğretim modeli, ölçekli değil): odun ikincil ksilem birikimiyle ilişkilidir; botanik kullanımda kabuk damar kambiyumunun dışında kalan bütün dokulardır, yalnız en dış kuru tabaka değil. Her renkli halka bir yaş çizgisi değildir.",
  alt: "Aynı iç içe halkalar; altta yatay bir yarıçap çizgisi kambiyumda ikiye bölünmüş: içte odun, dışta kabuk. Sağda kabuğun floem ve koruyucu dokuları kapsadığı notu.",
  h: 360,
  draw: () => ({ els: woodyRings("bark"), readout: ["Kesiti merkezden dışa sırala: öz, ksilem, kambiyum, floem, dış dokular.", "Yaş hesabı için yıllık odun artışlarının nasıl tanımlandığı verilmelidir."] }),
});

const lineage = mk({
  caption:
    "İdeal soyu sayısallaştır (bölümdeki kapalı model: her turda her hücre bir kez bölünür, kayıp yok): N başlangıç hücresinden k tur sonra N × 2ᵏ hücre; yeni hücre ve toplam bölünme olayı sayısı N × 2ᵏ − N. Çizim tek başlangıç hücresinin soyudur; uzama hücre sayısını ikiye katlamaz.",
  alt: "En üstte tek hücre; her satırda hücre sayısı ikiye katlanan soy ağacı. Sürgü tur sayısını 0 ile 5 arasında seçer.",
  h: 340,
  param: { label: "Bölünme turu (k)", min: 0, max: 5, step: 1, init: 3 },
  draw: (k) => {
    const els: El[] = [];
    const y = (i: number) => 24 + i * 52;
    const x = (i: number, j: number) => 20 + ((j + 0.5) * 492) / 2 ** i;
    for (let i = 0; i <= k; i++)
      for (let j = 0; j < 2 ** i; j++) {
        if (i > 0) els.push(L(x(i - 1, j >> 1), y(i - 1) + 7, x(i, j), y(i) - 7, { thin: true, tone: "muted" }));
        els.push(C(x(i, j), y(i), i === k ? 7 : 6, { tone: i === k ? "a" : "c", fill: i === k ? "a" : "c" }));
      }
    const n = 2 ** k;
    els.push(T(266, 322, `1 × 2^${k} = ${n} hücre; ${n - 1} bölünme olayı`.replace(`2^${k}`, `2${"⁰¹²³⁴⁵"[k]}`), "c", { bold: true }));
    return { els, readout: [`1 başlangıç hücresi, k = ${k}: ${n} hücre; yeni hücre ve bölünme olayı = ${n} − 1 = ${n - 1}.`, "N başlangıç hücresi için sonuç N × 2ᵏ; model gerçek bitkinin günlük büyümesini öngörmez."] };
  },
});

/* ---------------- İletim doku ---------------- */

const xylemCells = mk({
  caption:
    "Trakeit ve trake (nitel şema, ölçekli değil): trakeitler uzun, dar ve uçları sivri elemanlardır; su komşu elemana çeperdeki geçitlerden geçer. Trake elemanları daha geniş ve kısadır, uç uca dizilip damar oluşturur; uçtaki perforasyon plakaları daha açık bağlantı sağlar. Ligninli yan duvarlar kalır.",
  alt: "Solda üst üste binen iki uzun sivri uçlu trakeit; yan duvarlarında küçük geçit noktaları ve aralarında oklar. Sağda üç kısa geniş trake elemanı uç uca dizilmiş; aralarındaki uç çeperlerinde açıklık.",
  h: 350,
  draw: () => {
    const els: El[] = [
      S([[70, 20], [92, 60], [92, 220], [70, 260], [48, 220], [48, 60]], { bold: true, tone: "c" }),
      S([[120, 70], [142, 110], [142, 270], [120, 310], [98, 270], [98, 110]], { bold: true, tone: "c" }),
    ];
    for (let y = 120; y <= 210; y += 18) els.push(C(92, y, 3, { tone: "c", fill: "c" }), C(98, y + 9, 3, { tone: "c", fill: "c" }));
    els.push(A(70, 230, 70, 160, "b"), A(120, 160, 120, 90, "b"));
    for (let i = 0; i < 3; i++) {
      const y0 = 30 + i * 96;
      els.push(L(260, y0, 260, y0 + 90, { bold: true, tone: "a" }), L(340, y0, 340, y0 + 90, { bold: true, tone: "a" }));
      if (i > 0) els.push(L(260, y0 - 3, 278, y0 - 3, { tone: "a" }), L(322, y0 - 3, 340, y0 - 3, { tone: "a" }));
    }
    els.push(A(300, 300, 300, 50, "b", { bold: true }));
    els.push(T(96, 330, "trakeit", "c", { bold: true, tone: "c" }), T(300, 330, "trake elemanları", "c", { bold: true, tone: "a" }));
    els.push(...lead(92, 156, 200, 140, "geçit", "c", false, "e"));
    els.push(...lead(340, 123, 360, 100, "perforasyon", "a"));
    els.push(T(372, 126, "plakası", "e", { tone: "a" }));
    els.push(...lead(340, 220, 360, 220, "ligninli yan", "a"));
    els.push(T(372, 246, "duvar kalır", "e", { tone: "a" }));
    return { els, readout: ["Geçit alanı bütün hücre zarıyla aynı yapı değildir.", "Bu farklar akış yolunu anlatır; bütün bitki için sabit hız vermez."] };
  },
});

const sieve = mk({
  caption:
    "Floemin canlı iletim elemanı (nitel şema, ölçekli değil): kapalı tohumlularda kalburlu boru elemanları olgunlukta canlıdır ama çekirdeklerini ve bazı iç yapılarını kaybeder; uçtaki kalburlu plakalar akışı kolaylaştırır. Yanındaki çekirdekli arkadaş hücresi metabolik destek verir ve yükleme ile boşaltmaya katılır.",
  alt: "Üst üste iki uzun kalburlu boru elemanı, aralarında delikli kalburlu plaka; içlerinde çekirdek yok. Sağlarında dar, çekirdekli arkadaş hücreleri.",
  h: 330,
  draw: () => {
    const els: El[] = [];
    for (let i = 0; i < 2; i++) {
      const y0 = 20 + i * 150;
      els.push(R(140, y0, 230, y0 + 144, { bold: true, tone: "b" }));
      els.push(R(234, y0 + 10, 270, y0 + 134, { tone: "c" }), C(252, y0 + 72, 9, { tone: "c", fill: "c" }));
    }
    for (let x = 146; x < 228; x += 14) els.push(L(x, 167, x + 8, 167, { bold: true, tone: "b" }));
    els.push(A(185, 60, 185, 290, "a", { bold: true }));
    els.push(...lead(226, 167, 300, 170, "kalburlu plaka", "b"));
    els.push(T(185, 316, "kalburlu boru: canlı, çekirdeksiz", "c", { tone: "b" }));
    els.push(...lead(252, 92, 320, 60, "arkadaş hücresi:", "c", true));
    els.push(T(336, 86, "çekirdekli", "e", { tone: "c" }));
    els.push(T(60, 240, "akış", "c", { tone: "a" }));
    return { els, readout: ["Canlı olmak ile bütün organelleri taşımak aynı koşul değildir.", "Arkadaş hücresi uzun eksenli borunun kendisi değildir ama taşımaya katılır."] };
  },
});

const PF = [
  { name: "Yükleme", txt: "Kaynakta çözünmüş organik madde floeme yüklenir; su potansiyeli düşer." },
  { name: "Su girişi", txt: "Ksilemden su girer, turgor basıncı yükselir." },
  { name: "Basınç akışı", txt: "Kaynak–havuz basınç farkı kalburlu yol boyunca çözelti akışını yönlendirir." },
  { name: "Havuzda boşaltma", txt: "Havuzda madde boşaltılır, su çıkar; basınç düşük kalır ve fark sürer." },
];
const pressureFlow = mk({
  caption:
    "Basınç akışı (nitel model, ölçekli değil): kaynakta yükleme su girişini, su girişi basıncı artırır; havuzda boşaltma ve su çıkışı daha düşük basınçla ilişkilidir. Basınç farkı çözeltiyi taşır. Tek bir sükroz molekülü her milimetrede ATP ile çekilmez; yükleme ve boşaltma basamakları enerji gerektirebilir.",
  alt: "Solda yukarı akan ksilem borusu, sağda aşağı akan floem borusu. Üstte kaynak hücresi floeme şeker yüklüyor ve ksilemden floeme su giriyor; altta havuz hücresi floemden şeker alıyor ve su ksileme dönüyor. Adımlarla oklar sırayla beliriyor.",
  h: 340,
  steps: PF.map((p) => p.name),
  draw: (_v, step) => {
    const on = (i: number) => step >= i;
    const els: El[] = [
      R(110, 40, 150, 300, { tone: "c" }),
      R(330, 40, 370, 300, { tone: "b", bold: true }),
      T(130, 20, "ksilem", "c", { tone: "c", bold: true }),
      T(350, 20, "floem", "c", { tone: "b", bold: true }),
      ...B(456, 80, "Kaynak", { w: 110, tone: "a", fill: "a" }),
      ...B(456, 260, "Havuz", { w: 110, tone: "warn", fill: "warn" }),
      A(130, 280, 130, 60, "c", { thin: true }),
    ];
    if (on(0)) els.push(A(400, 80, 374, 80, "a", { bold: true }), T(456, 46, "yükleme", "c", { tone: "a" }));
    if (on(1)) els.push(A(154, 100, 326, 100, "c", { bold: true }), T(240, 124, "su girer", "c", { tone: "c" }));
    if (on(2)) els.push(A(350, 110, 350, 240, "b", { bold: true }), T(300, 170, "basınç farkı", "w", { tone: "b", bold: true }), T(456, 116, "yüksek P", "c", { tone: "b", bold: true }));
    if (on(3)) els.push(A(374, 260, 400, 260, "warn", { bold: true }), A(326, 240, 154, 240, "c"), T(240, 216, "su döner", "c", { tone: "c" }), T(456, 224, "düşük P", "c", { tone: "b", bold: true }), T(456, 296, "boşaltma", "c", { tone: "warn" }));
    return { els, readout: [`${step + 1}. ${PF[step].txt}`, "Akışa boru geometrisi ve çözelti direnci de etki eder."] };
  },
});

const vascTable = tableFig({
  caption:
    "İletim sistemini oluşturan hücreleri karşılaştır (bölümdeki tablo): 'ana iletim elemanı' ile 'dokunun bütün bileşenleri' ayrı satırlarda tutulur. Olgun trakenin ölülüğü ile ksilem parankimasının canlılığı aynı dokuda bulunabilir; floemde çekirdeksiz kalburlu eleman ile çekirdekli arkadaş hücresi iş bölümü yapar.",
  alt: "Dört satırlı tablo: ölçüt, ksilem ve floem. Ana eleman trake ve trakeit ile kalburlu boru elemanı; olgun ana eleman genellikle canlılığını yitirmiş ile canlı ama çekirdeksiz olabilir; ek canlı hücre ksilem parankiması ile arkadaş hücresi ve parankima; içerik su ve mineral ile şeker ve organik madde.",
  headers: ["Ölçüt", "Ksilem", "Floem"],
  rows: [
    ["Ana eleman", "trake, trakeit", "kalburlu boru\nelemanı"],
    ["Olgun ana\neleman", "genellikle\ncanlılığını\nyitirmiş", "canlı;\nçekirdeksiz\nolabilir"],
    ["Ek canlı\nhücre", "ksilem\nparankiması", "arkadaş\nhücresi,\nparankima"],
    ["Yaygın içerik", "su, mineral", "şeker, organik\nmadde"],
  ],
  readout: ["Yapı, konum ve görev üçlüsünü birlikte düşün.", "Her bitki grubunda aynı halka kambiyumu bulunmaz."],
});

/* ---------------- Bitkilerde madde taşınması ---------------- */

const PSI_A = -0.2;
const mpa = (x: number) => fmt(x).replace("-", "−");
const waterPot = mk({
  caption:
    "Su potansiyelinde işaret (bölüm örneği: −0,2 MPa, −0,9 MPa'dan yüksektir): suya geçirgen bağlantıda net su daha yüksek toplam Ψ'den daha düşüğe gider. A bölmesi −0,2 MPa'da sabit; sürgü B'yi değiştirir. Eşit değerde net akış yoktur. Model aynı yükseklik ve Ψ = Ψs + Ψp varsayar.",
  alt: "Yan yana iki bölme, A ve B; altlarında Ψ değerleri. Aralarındaki ok net su yönünü gösteriyor; değerler eşitse ok yerine net akış yok yazısı çıkıyor.",
  h: 240,
  param: { label: "B bölmesinin Ψ değeri", min: -1, max: 0, step: 0.1, init: -0.9, unit: " MPa" },
  draw: (pb) => {
    const b = Math.round(pb * 10) / 10;
    const d = PSI_A - b;
    const els: El[] = [...B(110, 100, "A", { w: 150, h: 100, tone: "c", bold: true }), ...B(422, 100, "B", { w: 150, h: 100, tone: "b", bold: true })];
    els.push(T(110, 176, `Ψ = ${mpa(PSI_A)} MPa`, "c", { bold: true, tone: "c" }), T(422, 176, `Ψ = ${mpa(b)} MPa`, "c", { bold: true, tone: "b" }));
    if (Math.abs(d) < 1e-9) els.push(T(266, 100, "net akış yok", "c", { bold: true, tone: "muted" }));
    else if (d > 0) els.push(A(196, 100, 336, 100, "a", { bold: true }), T(266, 74, "su", "c", { tone: "a" }));
    else els.push(A(336, 100, 196, 100, "a", { bold: true }), T(266, 74, "su", "c", { tone: "a" }));
    const dir = Math.abs(d) < 1e-9 ? "net yön yok" : d > 0 ? "A → B" : "B → A";
    return { els, readout: [`${mpa(PSI_A)} ile ${mpa(b)} MPa: ${dir}.`, "Yalnız çözünen miktarına bakmak karşı taraftaki basıncı görmezden gelebilir."] };
  },
});

const radial = mk({
  caption:
    "Radyal yolda duvar ve sitoplazma (nitel şema, ölçekli değil): apoplast yol çeperler ve hücreler arası alanlardan, simplast yol plazmodezmlerle bağlı sitoplazmalardan geçer. Endodermisteki Kaspari şeridi çeper boyunca kesintisiz apoplast geçişini sınırlar; madde bir hücre zarından geçmeye zorlanır.",
  alt: "Soldan sağa hücre sırası: epidermis, iki korteks hücresi, endodermis ve merkezî silindir. Üstte çeper boyunca ilerleyen kesik apoplast oku endodermisteki Kaspari şeridinde durup hücre içine giriyor. Ortada hücreler arasındaki plazmodezm noktalarından geçen simplast oku.",
  h: 312,
  draw: () => {
    const names = ["epidermis", "korteks", "korteks", "endodermis", "silindir"];
    const els: El[] = [];
    names.forEach((n, i) => {
      const x0 = 20 + i * 100;
      els.push(R(x0, 70, x0 + 92, 190, { tone: i === 3 ? "a" : i === 4 ? "b" : "ink", fill: i === 4 ? "b" : undefined }));
      els.push(T(x0 + 46, i % 2 ? 238 : 212, n, "c", { tone: i === 3 ? "a" : "muted", bold: i === 3 }));
      if (i < 4) for (const y of [110, 150]) els.push(C(x0 + 96, y, 3, { tone: "c", fill: "c" }));
    });
    els.push(R(320, 62, 412, 70, { tone: "warn", fill: "warn" }), R(320, 190, 412, 198, { tone: "warn", fill: "warn" }));
    els.push(L(14, 64, 314, 64, { dash: true, bold: true, tone: "warn" }), A(314, 64, 340, 96, "warn", { bold: true }));
    els.push(A(30, 130, 500, 130, "c", { bold: true }));
    els.push(T(160, 40, "apoplast: çeperden", "c", { tone: "warn", bold: true }), T(366, 40, "Kaspari şeridi", "c", { tone: "warn" }));
    els.push(T(266, 268, "simplast: plazmodezmle sitoplazmadan", "c", { tone: "c", bold: true }));
    els.push(T(266, 296, "şeritte zar geçişi zorunlu", "c", { tone: "a" }));
    return { els, readout: ["Transmembran yolda komşu hücrelere geçerken zarlar tekrar tekrar aşılabilir.", "Şerit bütün suyu geçirmeyen bir kapak değildir; seçici zar geçişine zorlar."] };
  },
});

const cohesion = mk({
  caption:
    "Kohezyon–gerilim zinciri (nitel akış şeması): mezofil çeperindeki su filmi buharlaşır, buhar hava boşluğundan stomaya ve dışarı yayılır; film yenilenirken ksilemden su çekilir ve sütunda gerilim oluşur. Kohezyon çekimi köke iletir, kökten yeni su girer. Kılcallık tek başına uzun ağacı açıklamaz.",
  alt: "Yukarıdan aşağı beş kutu: stomadan buhar çıkışı, mezofil su filmi buharlaşır, ksilem sütununda gerilim, kohezyon çekimi iletir, kökten su girişi. Yanlarda adhezyon ve kohezyon notları.",
  h: 340,
  draw: () => {
    const c = chain(
      [
        { label: "Stomadan buhar çıkışı", tone: "muted" },
        { label: "Su filmi buharlaşır", note: "mezofil çeperi", tone: "b" },
        { label: "Ksilemde gerilim", note: "negatif basınç", tone: "a", bold: true },
        { label: "Sütun çekimi iletir", note: "kohezyon: su–su" },
        { label: "Kökten su girişi", note: "adhezyon: su–çeper", tone: "c" },
      ],
      { cx: 140, w: 252, gap: 22, arrowTone: () => "muted" },
    );
    return { els: c.els, readout: ["Oklar olayların sırasını gösterir; su ksilemde aşağıdan yukarı çekilir.", "Hava kabarcığı sütunu keserse o yolun iletkenliği azalabilir."] };
  },
});

const bidir = mk({
  caption:
    "Çift yönlülüğü ayrı borulara yerleştir (nitel şema, ölçekli değil): kaynak yaprak üstündeki genç sürgüne ve altındaki köke organik madde gönderebilir. Bitkinin floem sisteminde iki yön görülür; ama aynı kalburlu boruda aynı anda iki zıt kütlesel akış çizilmez. Havuz kaynağın üstünde olsa da basınç farkıyla madde alabilir.",
  alt: "Ortada kaynak yaprak kutusu; yukarıdaki genç sürgün havuzuna bir borudan yukarı ok, aşağıdaki kök havuzuna başka bir borudan aşağı ok.",
  h: 320,
  draw: () => {
    const els: El[] = [
      ...B(266, 30, "Genç sürgün: havuz", { tone: "warn", fill: "warn" }),
      ...B(266, 160, "Kaynak yaprak", { tone: "a", fill: "a", bold: true }),
      ...B(266, 290, "Kök: havuz", { tone: "warn", fill: "warn" }),
      A(200, 140, 200, 52, "b", { bold: true }),
      A(332, 180, 332, 268, "b", { bold: true }),
      T(188, 96, "boru 1: yukarı", "w", { tone: "b" }),
      T(344, 224, "boru 2: aşağı", "e", { tone: "b" }),
    ];
    return { els, readout: ["Bir boruda bir anda tek net yön vardır; farklı koşullarda yön değişebilir.", "Yükseklikle basıncı karıştırma."] };
  },
});

/* ---------------- Kök anatomisi ---------------- */

const capFig = mk({
  caption:
    "Kök ucunu kaliptra korur (nitel boyuna kesit, ölçekli değil): kaliptra toprakla temas ederek arkasındaki uç meristemini korur; salgılanan kaygan müsilaj ilerlemeye yardım eder; bazı kaliptra hücrelerindeki nişasta tanelerinin yer değiştirmesi yerçekimi algısına katılır. Koruma şapkası ile meristem aynı yapı değildir.",
  alt: "Kök ucu boyuna kesiti: en altta vurgulu kaliptra, arkasında bölünme, uzama ve olgunlaşma bölgeleri. Sağda bölge adları.",
  h: 330,
  draw: () => ({ els: [...rootTip("kal"), T(60, 290, "müsilaj", "c", { tone: "a" }), L(96, 290, 158, 288, { thin: true, tone: "a" })], readout: ["Boyuna kesit bölgelerin sırasını, enine kesit iç içe doku katmanlarını gösterir.", "Kaliptranın hemen arkasındaki hücre üreten bölge meristemdir."] }),
});

const rootSection = (kind: "dicot" | "mono", cx: number, cy: number, r: number): El[] => {
  const els: El[] = [C(cx, cy, r, { bold: true }), C(cx, cy, r * 0.48, { tone: "a", bold: true }), C(cx, cy, r * 0.43, { tone: "muted", thin: true })];
  if (kind === "dicot") {
    const arm = r * 0.36;
    els.push(S([[cx, cy - arm], [cx + 9, cy - 9], [cx + arm, cy], [cx + 9, cy + 9], [cx, cy + arm], [cx - 9, cy + 9], [cx - arm, cy], [cx - 9, cy - 9]], { tone: "c", fill: "c" }));
    for (const a of [45, 135, 225, 315]) {
      const t = (a * Math.PI) / 180;
      els.push(C(cx + r * 0.27 * Math.cos(t), cy + r * 0.27 * Math.sin(t), r * 0.07, { tone: "b", fill: "b" }));
    }
  } else {
    els.push(C(cx, cy, r * 0.22, { tone: "muted", fill: "muted" }));
    for (let i = 0; i < 12; i++) {
      const t = (i / 12) * 2 * Math.PI;
      const ro = r * 0.33;
      els.push(C(cx + ro * Math.cos(t), cy + ro * Math.sin(t), i % 2 ? r * 0.035 : r * 0.055, { tone: i % 2 ? "b" : "c", fill: i % 2 ? "b" : "c", bold: !(i % 2) }));
    }
  }
  return els;
};
const crossLayers = mk({
  caption:
    "Dıştan içe katmanlar (genç çift çenekli kök enine kesiti, nitel şema, ölçekli değil): epidermis, çoğunlukla parankimadan oluşan korteks, korteksin en iç sınırı endodermis, merkezî silindirin dış katmanı periskl, içte ksilem ve floem. Epidermis ile endodermis benzer adlı ama farklı konumlu dokulardır.",
  alt: "Büyük daire: dış çizgi epidermis ve emici tüyler, geniş korteks, vurgulu endodermis halkası, hemen içinde ince periskl, merkezde yıldız biçimli ksilem ve kolları arasında floem grupları.",
  h: 330,
  draw: () => {
    const cx = 160;
    const cy = 165;
    const els: El[] = [...rootSection("dicot", cx, cy, 145)];
    for (const a of [200, 230, 250]) {
      const t = (a * Math.PI) / 180;
      els.push(L(cx + 145 * Math.cos(t), cy + 145 * Math.sin(t), cx + 168 * Math.cos(t), cy + 168 * Math.sin(t), { tone: "muted" }));
    }
    els.push(...lead(cx + 145 * Math.cos(-0.6), cy + 145 * Math.sin(-0.6), 340, 40, "epidermis", "ink"));
    els.push(...lead(cx + 100, cy - 30, 340, 90, "korteks", "muted"));
    els.push(...lead(cx + 70, cy, 340, 150, "endodermis", "a", true));
    els.push(...lead(cx + 60, cy + 18, 340, 200, "periskl", "muted"));
    els.push(...lead(cx + 40, cy + 40, 340, 250, "floem", "b"));
    els.push(...lead(cx, cy + 40, 340, 300, "ksilem", "c"));
    return { els, readout: ["Su yolu: yüzey → korteks → endodermis sınırı → merkezî silindir.", "Periskl endodermisin dışındaki bir kabuk değildir; silindirin dış kenarıdır."] };
  },
});

const KAS = [
  { name: "Bant yokmuş gibi", band: false, txt: "Düşünce deneyi: şerit olmasaydı çeper yolu merkeze kesintisiz ilerleyebilirdi." },
  { name: "Sağlam Kaspari bandı", band: true, txt: "Çeper yolu bantta kesilir; su ve uygun çözünmüş maddeler canlı hücre zarının denetimine girer." },
];
const caspar = mk({
  caption:
    "Kaspari bandı apoplast yolunu keser (nitel şema, ölçekli değil): olgun endodermisin çeperinde ligninli bir kuşak çeper yolunu keser; sonraki evrelerde süberin bariyeri artırabilir. Seçiciliği zar ve taşıma proteinleri sağlar; endodermis su geçirmeyen katı bir duvar değildir.",
  alt: "Ortada endodermis hücresi, solunda korteks, sağında periskl. Çeper boyunca ilerleyen ok. Birinci adımda ok merkeze kadar kesintisiz; ikinci adımda endodermis çeperindeki koyu bantta durup hücre zarından içeri giriyor ve öteki yandan çıkıyor.",
  h: 260,
  steps: KAS.map((k) => k.name),
  draw: (_v, step) => {
    const k = KAS[step];
    const els: El[] = [R(30, 70, 170, 190, { tone: "muted" }), R(190, 70, 340, 190, { tone: "a", bold: true }), R(360, 70, 500, 190, { tone: "b" })];
    els.push(R(196, 76, 334, 184, { tone: "a", dash: true, thin: true }));
    els.push(T(100, 214, "korteks", "c", { tone: "muted" }), T(265, 214, "endodermis", "c", { tone: "a", bold: true }), T(430, 214, "periskl", "c", { tone: "b" }));
    if (k.band) {
      els.push(R(240, 60, 290, 70, { tone: "warn", fill: "warn" }), R(240, 190, 290, 200, { tone: "warn", fill: "warn" }));
      els.push(L(14, 64, 232, 64, { dash: true, bold: true, tone: "warn" }), A(232, 64, 248, 104, "warn", { bold: true }), A(282, 150, 380, 150, "c", { bold: true }));
      els.push(T(265, 36, "bant: çeper yolu kesilir", "c", { tone: "warn", bold: true }), T(265, 130, "zar", "c", { tone: "c" }), T(265, 246, "seçici zar geçişi", "c", { tone: "c" }));
    } else {
      els.push(L(14, 64, 500, 64, { dash: true, bold: true, tone: "muted" }), A(470, 64, 512, 64, "muted"));
      els.push(T(265, 36, "çeper yolu kesintisiz (düşünce deneyi)", "c", { tone: "muted" }));
    }
    return { els, readout: [k.txt, "Bant en geç bu sınırda canlı zar denetimini zorunlu kılar."] };
  },
});

const dicotMono = mk({
  caption:
    "Tek ve çift çenekli tipik kök kesitleri (nitel şema, ölçekli değil): çift çenekli genç kökte merkezde yıldız biçimli ksilem kolları ve aralarında floem; tek çenekli kökte çok sayıda ksilem ve floem grubu belirgin öz çevresinde halka düzeninde. İkisinde de epidermis, korteks ve endodermis vardır; çoğu tek çenekli kökte tipik kambiyum halkası yoktur.",
  alt: "Yan yana iki daire. Solda merkezde dört kollu yıldız ksilem ve kollar arasında floem; sağda ortada öz ve çevresinde dönüşümlü sıralanmış ksilem ve floem grupları. Her iki dairede endodermis halkası vurgulu.",
  h: 300,
  draw: () => {
    const els: El[] = [...rootSection("dicot", 130, 140, 112), ...rootSection("mono", 402, 140, 112)];
    els.push(T(130, 280, "çift çenekli: yıldız ksilem", "c", { bold: true }), T(402, 280, "tek çenekli: öz + halka", "c", { bold: true }));
    return { els, readout: ["Endodermis halkası (kalın) iki kesitte de korteksi silindirden ayırır.", "Bazı grupların özel kalınlaşma biçimleri bu okul modelinden farklıdır."] };
  },
});

export const biologyFigures060Plant: Record<string, Record<string, FigureDef>> = {
  "ayt-meristem-doku": {
    "Kök ucundaki sıralı bölgeler": tipZones,
    "İki sınıflama iki farklı soru sorar": classTable,
    "Damar kambiyumunun iki yanı": cambium,
    "Odun ve kabuk aynı sınır değildir": woodBark,
    "İdeal soyu sayısallaştır": lineage,
  },
  "ayt-iletim-doku": {
    "Trakeit ve trake: geçit ve delik": xylemCells,
    "Floemin canlı iletim elemanı": sieve,
    "Basınç akışı nasıl kurulur?": pressureFlow,
    "İletim sistemini oluşturan hücreleri karşılaştır": vascTable,
  },
  "bitki-madde-tasinmasi": {
    "Su potansiyelinde işareti ve kapsamı yaz": waterPot,
    "Radyal yolda duvar ve sitoplazmayı ayır": radial,
    "Terleme çekimini buharlaşma yüzeyinde başlat": cohesion,
    "Çift yönlülüğü ayrı borulara yerleştir": bidir,
  },
  "bitki-kok-anatomisi": {
    "Kök ucunu kaliptra korur": capFig,
    "Dıştan içe katmanları sırala": crossLayers,
    "Kaspari bandı apoplast yolunu keser": caspar,
    "Tek ve çift çenekli tipik kök kesitlerini karşılaştır": dicotMono,
  },
};
