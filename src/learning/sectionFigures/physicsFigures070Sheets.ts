import { type El, type FigureDef, type Tone } from "./figureKit";
import { A, C, L, PL, R, T, chain, mk } from "./biologyFigures060Kit";
import { nf } from "./physicsFigures058Kit";

/*
 * Forge070: dört TYT Fizik kopya kâğıdı (Doğrusal Hareket, Enerji ve Hareket,
 * Elektrik Akımı, Sıvılarda Kaldırma Kuvveti) özgün etkileşimli figürlerle.
 * Her figür dersin daha önce çizimi olmayan bir bölümüne bağlıdır ve dersin
 * laboratuvarını (üç evreli hareket ve gözlemci modeli, rampa/yay/tüketim
 * modelleri) tekrarlamaz. Bütün sayılar çizimle aynı hesaptan gelir; g
 * gerektiren her yerde g = 10 m/s² açıkça yazılır. Senaryolar ve sayılar bu
 * dosya için kurulmuş öğretim örnekleridir; kâğıtların cümleleri
 * kopyalanmadı. ÖSYM atıfları yalnız yıl, oturum ve soru numarasıyla verilir
 * ve depodaki src/learning/osym kayıtlarıyla eşleşir. Sürgü, adım ve seçim
 * öğrenme kaydı üretmez.
 */

/** İşaretli sayı: pozitifte artı, negatifte gerçek eksi işareti. */
const sg = (x: number, d = 2) => (x > 0 ? `+${nf(x, d)}` : nf(x, d));
const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Number.isFinite(x) ? x : lo));
/** Sürgü değerini aralığa ve adıma oturtur (test ve ilk çizim 0 gönderebilir). */
const snap = (x: number, lo: number, hi: number, step: number, init: number) => {
  const v0 = x === 0 && lo > 0 ? init : x;
  return clamp(Math.round((clamp(v0, lo, hi) - lo) / step) * step + lo, lo, hi);
};

/* =====================================================================
 * 003 Doğrusal Hareket
 * ===================================================================== */

const REFS = [
  { label: "Sıfır durakta, doğu +", zero: 0, sign: 1, title: "Durak sıfır, doğu pozitif", detail: ["İlk konum 0, dönüş +8 m, son +5 m; Δx = +5 m.", "Yol iki parçanın uzunluklarının toplamıdır: 8 + 3 = 11 m."] },
  { label: "Sıfır durakta, batı +", zero: 0, sign: -1, title: "Aynı yürüyüş, ters eksen", detail: ["Konumlar 0, −8 m ve −5 m olur; Δx = −5 m.", "İşaret yalnız seçilen yönü anlatır; yol yine 11 m, |Δx| yine 5 m."] },
  { label: "Sıfır durağın 10 m batısında", zero: -10, sign: 1, title: "Başlangıç noktası kaydırıldı", detail: ["Bütün konumlara aynı 10 m eklenir: 10, 18 ve 15 m.", "Fark alınınca kayma gider: Δx = 15 − 10 = +5 m, yol 11 m."] },
];
// Yürüyüş durağa göre metre cinsinden: durak 0, dönüş 8 m doğu, son 5 m doğu.
const WALK = [
  { name: "Durak", m: 0, row: 250 },
  { name: "Son", m: 5, row: 190 },
  { name: "Dönüş", m: 8, row: 220 },
];
const refX = (m: number) => 36 + (m + 10) * 22;
const referenceFigure = mk({
  caption:
    "Aynı yürüyüşü üç farklı eksenle oku: duraktan 8 m doğuya gidip 3 m batıya dönen kişi. İleri ile ekseni değiştir; konumların sayısı ve işareti eksene göre değişir, yol (11 m) ve yer değiştirmenin büyüklüğü (5 m) değişmez.",
  alt: "Yatay sayı doğrusu üzerinde durak, son nokta ve dönüş noktası. Üstte duraktan dönüş noktasına 8 m doğuya bir ok, altında dönüşten son noktaya 3 m batıya ikinci ok. Noktaların altında seçilen eksendeki konum değerleri, sayı doğrusunun ucunda pozitif yön işareti var.",
  h: 270,
  steps: REFS.map((r) => r.label),
  draw: (_v, step) => {
    const r = REFS[step] ?? REFS[0];
    const pos = (m: number) => r.sign * (m - r.zero);
    const els: El[] = [
      T(14, 20, "batı", "e", { tone: "muted" }),
      T(518, 20, "doğu", "w", { tone: "muted" }),
      L(30, 130, 510, 130, { thin: true }),
      A(refX(0), 70, refX(8), 70, "a", { bold: true }),
      T((refX(0) + refX(8)) / 2, 44, "8 m doğuya", "c", { tone: "a" }),
      A(refX(8), 100, refX(5), 100, "b", { bold: true }),
      T(refX(5) - 10, 100, "3 m batıya", "w", { tone: "b" }),
    ];
    // Pozitif yön oku sayı doğrusunun ilgili ucunda.
    if (r.sign > 0) els.push(A(470, 130, 512, 130, "ink"), T(500, 104, "+", "c", { bold: true }));
    else els.push(A(70, 130, 28, 130, "ink"), T(40, 104, "+", "c", { bold: true }));
    if (r.zero !== 0) els.push(L(refX(r.zero), 120, refX(r.zero), 140, { tone: "c" }), T(refX(r.zero), 160, "sıfır", "c", { tone: "c" }));
    for (const w of WALK) {
      els.push(C(refX(w.m), 130, 6, { tone: "ink", fill: "ink" }), T(refX(w.m), 160, w.name, "c", { bold: true }));
      els.push(L(refX(w.m), 172, refX(w.m), w.row - 12, { thin: true, dash: true, tone: "muted" }), T(refX(w.m), w.row, `x = ${sg(pos(w.m), 0)} m`, "c", { tone: "a" }));
    }
    const dx = pos(5) - pos(0);
    return {
      els,
      readout: [
        `${r.title}: ilk konum ${sg(pos(0), 0)} m, dönüş ${sg(pos(8), 0)} m, son ${sg(pos(5), 0)} m.`,
        `Δx = son − ilk = ${sg(dx, 0)} m; yol L = 8 + 3 = 11 m. ${r.detail[1]}`,
        "Konum işareti yönü göstermez: x = −5 m'de duran biri +2 m/s ile doğuya (pozitif yöne) gidiyor olabilir; yönü hızın işareti verir.",
      ],
    };
  },
});

// İki ortalama: 40 m doğuya 10 s, sonra d m batıya 5 s.
const meansFigure = mk({
  caption:
    "Payları ayrı iki ortalama: 40 m doğuya 10 s, ardından d metre batıya 5 s. Sürgüyle dönüş yolunu değiştir. Ortalama hız yer değiştirmeyi, ortalama sürat toplam yolu aynı 15 s'ye böler; dönüş varken sürat her zaman daha büyüktür.",
  alt: "Üstte doğuya 40 metrelik ok, altında batıya d metrelik dönüş oku. Altta iki yatay çubuk: ortalama sürat ve ortalama hızın büyüklüğü; çubuk boyları m/s değerleriyle orantılı ve uçlarında sayılar yazılı.",
  h: 262,
  param: { label: "Dönüş yolu d", min: 0, max: 40, step: 5, init: 10, unit: "m" },
  draw: (raw) => {
    const d = snap(raw, 0, 40, 5, 10);
    const X = (m: number) => 40 + m * 11;
    const dx = 40 - d;
    const path = 40 + d;
    const vAvg = dx / 15;
    const sAvg = path / 15;
    const bar = (y: number, label: string, val: number, tone: Tone): El[] => [
      T(14, y, label, "e", { bold: true }),
      R(200, y - 13, 200 + val * 38, y + 13, { tone, fill: tone }),
      T(200 + val * 38 + 10, y, `${nf(val)} m/s`, "e", { tone }),
    ];
    const els: El[] = [
      L(30, 88, 500, 88, { thin: true, tone: "muted" }),
      C(X(0), 88, 6, { fill: "ink" }),
      A(X(0), 62, X(40), 62, "a", { bold: true }),
      T(260, 34, "40 m doğuya, 10 s", "c", { tone: "a" }),
      ...bar(196, "Ortalama sürat", sAvg, "a"),
      ...bar(242, "|Ortalama hız|", Math.abs(vAvg), "b"),
    ];
    if (d > 0) {
      const mx = clamp((X(40) + X(dx)) / 2, 110, 420);
      els.push(A(X(40), 114, X(dx), 114, "b", { bold: true }), T(mx, 144, `${d} m batıya, 5 s`, "c", { tone: "b" }), C(X(dx), 88, 6, { tone: "b", fill: "b" }));
    } else els.push(T(260, 144, "dönüş yok, 5 s bekleme", "c", { tone: "muted" }));
    return {
      els,
      readout: [
        `Δx = 40 − ${d} = ${dx} m, yol L = 40 + ${d} = ${path} m, Δt = 10 + 5 = 15 s.`,
        `Ortalama hız = ${dx}/15 ≈ ${nf(vAvg)} m/s${dx > 0 ? " doğuya" : ""}; ortalama sürat = ${path}/15 ≈ ${nf(sAvg)} m/s.`,
        d === 0
          ? "Dönüş olmayınca yol ile |Δx| eşittir; yine de bekleme süresi iki ortalamanın paydasındadır."
          : d === 40
            ? "Başlangıca dönüldü: ortalama hız 0, ortalama sürat 0 değil; her an durulduğu sonucu çıkmaz."
            : "|ortalama hız| ≤ ortalama sürat; eşitlik yalnız yön hiç değişmezse olur.",
      ],
    };
  },
});

// E2 tablosu, ortadaki bekleme süresi değişken: (0, 2), (2, 10), (2 + w, 10), (4 + w, 4).
const waitFigure = mk({
  caption:
    "Konum–zaman grafiğinde ortadaki yatay parça beklemedir: yol ve yer değiştirmeye katkısı 0, süreye katkısı w. Sürgüyle bekleme süresini değiştir; toplam yol 14 m ve Δx = +2 m sabit kalırken iki ortalama da küçülür.",
  alt: "Konum–zaman grafiği. Konum 0 ile 2 s arasında 2 m'den 10 m'ye doğrusal artar, ardından w saniye 10 m'de yatay kalır, son 2 s'de 4 m'ye iner. Doğru parçalarının yanında eğimleri yazılıdır: +4 m/s, bekleme ve −3 m/s.",
  h: 252,
  param: { label: "Bekleme süresi w", min: 0, max: 6, step: 1, init: 3, unit: "s" },
  draw: (raw) => {
    const w = snap(raw, 0, 6, 1, 3);
    const X = (t: number) => 70 + t * 42;
    const Y = (x: number) => 210 - x * 15;
    const pts: [number, number][] = [
      [0, 2],
      [2, 10],
      [2 + w, 10],
      [4 + w, 4],
    ];
    const els: El[] = [
      A(70, 210, 522, 210, "ink", { thin: true }),
      A(70, 210, 70, 18, "ink", { thin: true }),
      T(80, 16, "x (m)", "e", { tone: "muted" }),
      T(522, 188, "t (s)", "w", { tone: "muted" }),
      PL(pts.map(([t, x]) => [X(t), Y(x)]), { open: true, tone: "a", bold: true }),
    ];
    for (const x of [2, 4, 10]) els.push(L(66, Y(x), 74, Y(x), { thin: true }), T(60, Y(x), String(x), "w", { tone: "muted" }));
    const tLabels = [...new Set([0, 2, 2 + w, 4 + w])];
    for (const t of tLabels) els.push(L(X(t), 206, X(t), 214, { thin: true }), T(X(t), 236, String(t), "c", { tone: "muted" }));
    for (const [t, x] of pts) els.push(C(X(t), Y(x), 5, { tone: "a", fill: "a" }));
    els.push(T(120, 150, "+4 m/s", "e", { tone: "a" }));
    if (w > 0) els.push(T((X(2) + X(2 + w)) / 2, 40, "bekleme", "c", { tone: "b", bold: true }));
    const mx = X(3 + w);
    els.push(mx + 18 + 80 <= 526 ? T(mx + 18, 105, "−3 m/s", "e", { tone: "a" }) : T(mx - 14, 128, "−3 m/s", "w", { tone: "a" }));
    const T0 = 4 + w;
    return {
      els,
      readout: [
        `Yol 8 + 0 + 6 = 14 m, Δx = 4 − 2 = +2 m, toplam süre 2 + ${w} + 2 = ${T0} s.`,
        `Ortalama sürat 14/${T0} ≈ ${nf(14 / T0)} m/s; ortalama hız +2/${T0} ≈ ${nf(2 / T0)} m/s.`,
        w > 0
          ? `Beklemeyi atmak 14/4 = 3,5 m/s verir; bu yalnız hareket hâlindeki 4 s'nin ortalamasıdır, bütün yolculuğun değil.`
          : "Bekleme yokken iki ortalama hareket süresi 4 s ile hesaplanır.",
      ],
    };
  },
});

// Eşit yol (her parça 30 m) ile eşit süre (her parça 2 s), süratler 10 ve w m/s.
const equalFigure = mk({
  caption:
    "Aynı iki sürat, iki farklı koşul: üst şeritte iki parça eşit yol, alt şeritte eşit süre. Şerit boyu süreyi gösterir. Sürgüyle ikinci parçanın süratini değiştir; eşit yolda yavaş parça daha uzun sürdüğü için ortalama küçük sürate yaklaşır.",
  alt: "İki yatay zaman şeridi. Üstte eşit yol: 10 m/s ile 3 s ve w m/s ile 30/w s süren iki parça. Altta eşit süre: her biri 2 s süren iki parça. Her şeridin altında toplam yol, toplam süre ve ortalama sürat yazılıdır.",
  h: 244,
  param: { label: "İkinci parçanın sürati w", min: 10, max: 60, step: 5, init: 30, unit: "m/s" },
  draw: (raw) => {
    const w = snap(raw, 10, 60, 5, 30);
    const u = 10;
    const t2 = 30 / w;
    const S = 60; // birim / saniye
    const strip = (y: number, a: number, b: number): El[] => [
      R(14, y, 14 + a * S, y + 30, { tone: "a", fill: "a" }),
      R(14 + a * S, y, 14 + (a + b) * S, y + 30, { tone: "b", fill: "b" }),
    ];
    const yolOrt = 60 / (3 + t2);
    const sureOrt = (u + w) / 2;
    const els: El[] = [
      T(14, 22, "Eşit yol: her parça 30 m", "e", { bold: true }),
      ...strip(40, 3, t2),
      T(14, 96, `${nf(3 + t2)} s: 60 m → ${nf(yolOrt)} m/s`, "e"),
      T(14, 146, "Eşit süre: her parça 2 s", "e", { bold: true }),
      ...strip(164, 2, 2),
      T(14, 220, `4 s: ${20 + 2 * w} m → ${nf(sureOrt)} m/s`, "e"),
    ];
    return {
      els,
      readout: [
        `Eşit yol: süreler 3 s ve 30/${w} ≈ ${nf(t2)} s; ortalama 2uw/(u + w) = 2·10·${w}/(10 + ${w}) ≈ ${nf(yolOrt)} m/s.`,
        `Eşit süre: yollar 20 m ve ${2 * w} m; ortalama (u + w)/2 = ${nf(sureOrt)} m/s.`,
        w === u
          ? "Süratler eşitken iki koşul aynı sonucu verir; fark ancak süratler ayrılınca ortaya çıkar."
          : "İki kısa yol ayrı koşulların sonucudur: önce yolların mı sürelerin mi eşit olduğunu yaz; bekleme varsa genel tanıma dön.",
      ],
    };
  },
});

// E3: 0–2 s +4 m/s; 2–5 s +4'ten −2'ye; 5–7 s −2 m/s.
const VT_STEPS = ["Grafik", "Dönüş anı", "Pozitif alanlar", "Negatif alanlar", "Δx ve yol"];
const areaFigure = mk({
  caption:
    "Hız–zaman grafiğinde alanı sıfır hız anında böl. İleri ile adımları aç: dönüş anı t = 4 s, eksen üstü alanlar +8 ve +4 m, eksen altı alanlar −1 ve −4 m. İşaretli toplam yer değiştirmeyi, büyüklüklerin toplamı yolu verir.",
  alt: "Hız–zaman grafiği: 0 ile 2 s arasında hız 4 m/s'de yatay, 2 ile 5 s arasında 4'ten −2 m/s'ye doğrusal iner ve 4 s'de zaman eksenini keser, 5 ile 7 s arasında −2 m/s'de yataydır. Adımlarda eksen üstü bir dikdörtgen ve üçgen, eksen altı bir üçgen ve dikdörtgen taranır.",
  h: 310,
  steps: VT_STEPS,
  draw: (_v, step) => {
    const X = (t: number) => 70 + t * 60;
    const Y = (v: number) => 40 + (4 - v) * 35;
    const els: El[] = [];
    if (step >= 2) {
      els.push(R(X(0), Y(4), X(2), Y(0), { tone: "a", fill: "a" }), PL([[X(2), Y(4)], [X(2), Y(0)], [X(4), Y(0)]], { tone: "a", fill: "a", thin: true }));
      els.push(T(X(1), Y(2), "+8 m", "c", { bold: true, tone: "a" }), T(X(2) + 42, 160, "+4 m", "c", { bold: true, tone: "a" }));
    }
    if (step >= 3) {
      els.push(PL([[X(4), Y(0)], [X(5), Y(-2)], [X(5), Y(0)]], { tone: "b", fill: "b", thin: true }), R(X(5), Y(0), X(7), Y(-2), { tone: "b", fill: "b" }));
      els.push(T(X(6), Y(-1), "−4 m", "c", { bold: true, tone: "b" }), T(X(4.67), 268, "−1 m", "c", { bold: true, tone: "b" }));
    }
    els.push(
      A(70, Y(0), 522, Y(0), "ink", { thin: true }),
      A(70, 262, 70, 18, "ink", { thin: true }),
      T(80, 16, "v (m/s)", "e", { tone: "muted" }),
      T(522, Y(0) - 20, "t (s)", "w", { tone: "muted" }),
      PL([[X(0), Y(4)], [X(2), Y(4)], [X(5), Y(-2)], [X(7), Y(-2)]], { open: true, tone: "ink", bold: true }),
    );
    for (const v of [4, 0, -2]) els.push(L(66, Y(v), 74, Y(v), { thin: true }), T(60, Y(v), nf(v, 0), "w", { tone: "muted" }));
    for (let t = 1; t <= 7; t++) els.push(L(X(t), Y(0) - 4, X(t), Y(0) + 4, { thin: true }), T(X(t), 296, String(t), "c", { tone: "muted" }));
    if (step >= 1) els.push(C(X(4), Y(0), 6, { tone: "warn", fill: "warn" }), T(X(4) + 8, 120, "dönüş: t = 4 s", "e", { tone: "warn", bold: true }));
    const readout = [
      ["Önce eksenleri oku: düşey eksen hız, yatay eksen zaman; alanın birimi (m/s)·s = m.", "Eğik parçanın eğimi (−2 − 4)/(5 − 2) = −2 m/s²."],
      ["+4 m/s hız, −2 m/s² ivmeyle 4/2 = 2 s sonra sıfırlanır: parça t = 2 s'de başladığı için dönüş t = 4 s.", "Bu andan önce hareket pozitif yönde, sonra negatif yöndedir."],
      ["0–2 s dikdörtgeni 2 × 4 = +8 m, 2–4 s üçgeni 2 × 4/2 = +4 m.", "Pozitif yönde toplam 12 m gidildi."],
      ["4–5 s üçgeni 1 × 2/2 = 1 m, 5–7 s dikdörtgeni 2 × 2 = 4 m; ikisi de negatif yönde.", "Geometrik alan pozitiftir; yer değiştirmeye katkıları −1 ve −4 m'dir."],
      ["Δx = 8 + 4 − 1 − 4 = +7 m; yol L = 8 + 4 + 1 + 4 = 17 m.", "Ortalama hız 7/7 = +1 m/s, ortalama sürat 17/7 ≈ 2,43 m/s. 2–5 s yamuğu tek başına net +3 m verir, yolu vermez."],
    ][step] ?? [];
    return { els, readout };
  },
});

/* =====================================================================
 * 005 Enerji ve Hareket
 * ===================================================================== */

const carrierFigure = mk({
  caption:
    "Birincil kaynaktan aygıta zincir (örnek değerler): aygıt 2 kW gücü 0,5 saat çeker, yani 1 kWh = 3,6 MJ alır. Elektrik bu enerjiyi taşıyan yoldur, kaynak değildir. Sürgüyle santral verimini değiştir: gereken birincil giriş yararlı enerjinin verime bölümüdür.",
  alt: "Alt alta dört kutu ve aralarında aşağı oklar: birincil kaynak, santral, elektrik taşıyıcı ve aygıt. Kutuların sağında birincil giriş, verim ve kayıp, 1 kWh = 3,6 MJ ve 2 kW × 0,5 h değerleri yazılıdır.",
  h: 300,
  param: { label: "Santral verimi", min: 30, max: 90, step: 5, init: 40, unit: "%" },
  draw: (raw) => {
    const p = snap(raw, 30, 90, 5, 40);
    const eta = p / 100;
    const inMJ = 3.6 / eta;
    const c = chain(
      [
        { label: "Birincil kaynak", bold: true, note: `giriş ${nf(inMJ)} MJ` },
        { label: "Santral", bold: true, note: `verim %${p}, kayıp ${nf(inMJ - 3.6)} MJ`, tone: "warn" },
        { label: "Elektrik: taşıyıcı", bold: true, note: "1 kWh = 3,6 MJ", tone: "a" },
        { label: "Aygıt", bold: true, note: "2 kW × 0,5 h = 1 kWh", tone: "b" },
      ],
      { y0: 14, w: 220 },
    );
    return {
      els: c.els,
      readout: [
        "1 kWh = 1000 J/s × 3600 s = 3,6 MJ; kWh enerji birimidir, güç birimi değildir.",
        `Santral verimi %${p} ise birincil giriş 3,6/${nf(eta)} ≈ ${nf(inMJ)} MJ, ısıya giden kayıp ${nf(inMJ - 3.6)} MJ (iletim kaybı ihmal edildi).`,
        `Giriş = yararlı/verim; 3,6 × ${nf(eta)} = ${nf(3.6 * eta)} MJ girişin değil, aynı oranla elde edilecek yararlı payın hesabıdır.`,
      ],
    };
  },
});

const MODELS = [
  {
    label: "İş–kinetik enerji",
    eq: "+200 J − 200 J = 0 = ΔEk",
    title: "Bütün kuvvetlerin işi kinetik enerji değişimini verir",
    detail: ["İpin işi +100 N × 2 m = +200 J, yerçekiminin işi −200 J.", "Sabit hızda ΔEk = 0; net işin 0 olması motorun enerji vermediği anlamına gelmez."],
  },
  {
    label: "Mekanik enerji",
    eq: "ΔEp = Wip = +200 J",
    title: "Yerçekimi potansiyel enerjide sayılır",
    detail: ["Em,son = Em,ilk + Wdiğer: Wdiğer burada yalnız ipin işidir.", "Yerçekiminin işini hem iş hem Ep olarak yazmak aynı etkiyi iki kez sayar."],
  },
  {
    label: "Güç ve verim",
    eq: "P = 200 J / 5 s = 40 W",
    title: "Aktarım hızı ve yararlı pay ayrı sorulardır",
    detail: ["Yüke aktarılan ortalama güç 40 W.", "Motor verimi %80 ise giriş 200/0,8 = 250 J, giriş gücü 50 W."],
  },
];
const modelFigure = mk({
  caption:
    "Aynı kaldırma, üç model: 10 kg yük ipte sabit hızla 5 s'de 2 m yükseliyor (g = 10 m/s²). Bir modelin adına dokun: iş–kinetik enerji bütün kuvvetlerin işini toplar, mekanik enerji yerçekimini potansiyelde sayar, güç ve verim aynı enerjinin hızını ve payını sorar.",
  alt: "Solda kutu biçiminde yük; yukarı doğru T = 100 N ip kuvveti, aşağı doğru G = 100 N ağırlık oku. Sağda alt alta üç model adı ve her birinin denklemi: iş–kinetik enerji, mekanik enerji, güç ve verim.",
  h: 284,
  picks: MODELS.map((m) => ({ label: m.label, title: m.title, detail: m.detail })),
  draw: (_v, _s, pick) => {
    const els: El[] = [
      R(60, 120, 140, 170, { tone: "ink", bold: true }),
      T(100, 145, "10 kg", "c", { bold: true }),
      A(100, 120, 100, 40, pick === 2 || pick < 0 ? "ink" : "a", { bold: true }),
      T(110, 70, "T = 100 N", "e", { tone: pick >= 0 && pick !== 2 ? "a" : "ink" }),
      A(100, 170, 100, 250, pick === 1 ? "muted" : pick === 0 ? "b" : "ink", { bold: pick !== 1, dash: pick === 1 }),
      T(110, 222, pick === 1 ? "G: Ep'de" : "G = 100 N", "e", { tone: pick === 1 ? "muted" : pick === 0 ? "b" : "ink" }),
    ];
    MODELS.forEach((m, i) => {
      const y = 36 + i * 88;
      const on = pick === i;
      els.push(T(236, y, m.label, "e", { bold: true, tone: on ? "a" : "ink", pick: i }), T(236, y + 30, m.eq, "e", { tone: on ? "a" : "muted" }));
    });
    const m = MODELS[pick];
    return {
      els,
      readout: m
        ? [`${m.label}: ${m.detail.join(" ")}`, "2019 TYT Fen 3 mantığı: yük ve yükseklik aynıysa yararlı iş aynıdır; daha kısa süre yalnız gücü büyütür."]
        : ["Bir modelin adına dokun: hangi kuvvetin işi nerede sayılıyor?", "Model seçmeden önce sistemi ve başlangıç–son durumlarını yaz."],
    };
  },
});

// İlk kinetik enerji 20 J, sabit 2 N sürtünme, başka yatay etki yok.
const thresholdFigure = mk({
  caption:
    "Eşikte formül biter: ilk kinetik enerjisi 20 J olan kutu duran yatay yüzeyde sabit 2 N sürtünmeyle yavaşlıyor. Sürgüyle yolu artır. 10 m'de kinetik enerji 0 olur; daha ötesi için formülün verdiği negatif değer fiziksel değildir, kutu orada durmuştur.",
  alt: "Kinetik enerji–yol grafiği. Düz çizgi 0 m'de 20 J'den 10 m'de 0'a iner; 10 m'den sonra gerçek değer yatay eksen üzerinde 0'da kalır, formülün devamı eksenin altına kesik çizgiyle uzar. Seçilen yolda bir nokta işaretlidir.",
  h: 300,
  param: { label: "Alınan yol d", min: 0, max: 14, step: 1, init: 6, unit: "m" },
  draw: (raw) => {
    const d = snap(raw, 0, 14, 1, 6);
    const X = (x: number) => 70 + x * 30;
    const Y = (e: number) => 40 + (20 - e) * 7;
    const formula = 20 - 2 * d;
    const real = Math.max(0, formula);
    const els: El[] = [
      A(70, Y(0), 522, Y(0), "ink", { thin: true }),
      A(70, 250, 70, 18, "ink", { thin: true }),
      T(80, 16, "Ek (J)", "e", { tone: "muted" }),
      T(522, Y(0) - 20, "d (m)", "w", { tone: "muted" }),
      L(X(0), Y(20), X(10), Y(0), { tone: "a", bold: true }),
      L(X(10), Y(0), X(14), Y(0), { tone: "a", bold: true }),
      L(X(10), Y(0), X(14), Y(-8), { tone: "muted", dash: true }),
      T(486, 258, "formül: model dışı", "w", { tone: "muted" }),
      T(X(10) - 8, Y(0) + 24, "durma: 10 m", "w", { tone: "warn", bold: true }),
    ];
    for (const e of [20, 10, 0]) els.push(L(66, Y(e), 74, Y(e), { thin: true }), T(60, Y(e), String(e), "w", { tone: "muted" }));
    for (const x of [5, 10, 14]) els.push(L(X(x), Y(0) - 4, X(x), Y(0) + 4, { thin: true }), T(X(x), 284, String(x), "c", { tone: "muted" }));
    els.push(C(X(d), Y(real), 7, { tone: "b", fill: "b" }));
    return {
      els,
      readout:
        d < 10
          ? [`Sürtünmenin işi −2 × ${d} = ${nf(-2 * d, 0)} J; Ek = 20 − ${2 * d} = ${real} J. Kutu hâlâ hareketli.`, "Sürtünme mekanik enerjiyi iç enerjiye aktarır; toplam enerji yok olmaz."]
          : d === 10
            ? ["Tam eşik: Ek = 20 − 20 = 0 J; kutu 10 m'de hızı sıfır olarak varır.", "Durma mesafesi = ilk kinetik enerji / sürtünme kuvveti = 20/2 = 10 m."]
            : [`Formül 20 − ${2 * d} = ${nf(formula, 0)} J verir; kinetik enerji negatif olamaz.`, `Kutu 10 m'de durur ve duran kutuya kinetik sürtünme iş yapmaz; ${d} m'ye ulaşmaz.`],
    };
  },
});

const PLAN_STEPS = ["Sistem ve kaynaklar", "Dik kuvvetler", "Kuvvet işleri", "Bilanço", "Geri kontrol"];
const planFigure = mk({
  caption:
    "Bir enerji çözümünü sırayla kur: 2 kg kutu yatayda 3 m/s ile kayarken 10 N çekme ve 2 N sürtünme altında 3 m gidiyor (g = 10 m/s²). İleri ile kuvvet kaynaklarını ayır, yer değiştirmeye dik kuvvetlerin işini sıfırla, işleri topla, son kinetik enerjiyi bul ve geri koy.",
  alt: "Yatay zemin üzerinde kutu. Sağa doğru çekme kuvveti F, sola doğru sürtünme f, yukarı zemin tepkisi N ve aşağı ağırlık G okları. Kutunun altında sağa doğru d = 3 m yer değiştirme oku. Adımlarda okların yanına iş değerleri yazılır.",
  h: 292,
  steps: PLAN_STEPS,
  draw: (_v, step) => {
    const dim = (on: boolean): Tone => (on ? "muted" : "ink");
    const els: El[] = [
      L(30, 180, 500, 180, { thin: true }),
      R(200, 120, 280, 180, { tone: "ink", bold: true }),
      T(240, 150, "2 kg", "c", { bold: true }),
      A(280, 150, 362, 150, "a", { bold: true }),
      T(292, 124, step >= 2 ? "F: +30 J" : "F = 10 N (ip)", "e", { tone: "a", bold: step >= 2 }),
      A(200, 165, 160, 165, "b", { bold: true }),
      T(150, 138, step >= 2 ? "f: −6 J" : "f = 2 N", "c", { tone: "b", bold: step >= 2 }),
      A(240, 150, 240, 62, dim(step >= 1), { dash: step >= 1 }),
      T(250, 80, step >= 1 ? "N: iş 0" : "N (zemin)", "e", { tone: dim(step >= 1) }),
      A(240, 150, 240, 230, dim(step >= 1), { dash: step >= 1 }),
      T(250, 214, step >= 1 ? "G: iş 0" : "G (Dünya)", "e", { tone: dim(step >= 1) }),
      A(200, 252, 380, 252, "ink", { thin: true }),
      T(290, 276, "d = 3 m", "c"),
    ];
    const readout = [
      ["Hedef cisim kutu; kuvvet kaynakları ip (F), zemin (N ve f) ve Dünya (G).", "İstenen son sürat: başlangıç Ek = ½ × 2 × 3² = 9 J."],
      ["N ve G yer değiştirmeye diktir: cos 90° = 0, işleri 0 J.", "Dik kuvvet varsa iş vardır demek ilk yanlış adımdır."],
      ["Çekmenin işi 10 × 3 = +30 J; sürtünmenin işi −2 × 3 = −6 J.", "Net iş +24 J; çekmenin işi net iş değildir."],
      ["Ek,son = 9 + 24 = 33 J; ½ × 2 × v² = 33 → v = √33 ≈ 5,74 m/s.", "Kare alma sırası: önce v², sonra pozitif kök; yön ayrıca hareketten bilinir."],
      ["Geri koy: 33 − 9 = 24 J ve (10 − 2) × 3 = 24 J aynı sonucu verir.", "Negatif Ek ya da %100'ü aşan verim çıkarsa varsayım, işaret ya da birim adımına dön."],
    ][step] ?? [];
    return { els, readout };
  },
});

/* =====================================================================
 * 010 Elektrik Akımı
 * ===================================================================== */

const CASES = [
  { label: "10 C, 2 s", q: 10, t: 2, conv: "q = 10 C, t = 2 s", title: "Birimler zaten SI", detail: ["I = 10/2 = 5 A; 1 A = 1 C/s.", "Kesitten saniyede 5 C yük geçer."] },
  { label: "10 mC, 2 ms", q: 10e-3, t: 2e-3, conv: "q = 10 × 10⁻³ C, t = 2 × 10⁻³ s", title: "İki önek birlikte dönüşür", detail: ["I = (10 × 10⁻³)/(2 × 10⁻³) = 5 A.", "Yalnız yükü çevirip 0,01/2 = 0,005 A yazmak ilk yanlış adımdır."] },
  { label: "6 × 10¹⁹ elektron, 3 s", q: 9.6, t: 3, conv: "q = N·e = 6 × 10¹⁹ × 1,6 × 10⁻¹⁹ = 9,6 C", title: "Önce sayıyı yüke çevir", detail: ["e ≈ 1,6 × 10⁻¹⁹ C alınarak q = 9,6 C, I = 9,6/3 = 3,2 A.", "Elektronlar akım okunun tersine sürüklenir; akım şiddeti yine pozitif yazılır."] },
];
const seriesFigure = mk({
  caption:
    "Seri tek yolda yük birikmez ve tükenmez: pilden önce, lambadan sonra ve alt telde konan üç ampermetre aynı akımı okur. İleri ile üç veri durumunu aç; I = q/t ile akımı bul. Lamba elektrik enerjisini ışık ve ısıya dönüştürür, yükü tüketmez.",
  alt: "Dikdörtgen devre: sol kolda pil, üst kolda iki ampermetre arasında bir lamba, alt kolda üçüncü ampermetre. Sağ kolun dışında saat yönünde akım oku, içinde ters yönde kesik çizgili elektron oku. Ampermetrelerin yanında okunan akım yazılıdır.",
  h: 278,
  steps: ["Ölçüm", ...CASES.map((c) => c.label)],
  draw: (_v, step) => {
    const c = CASES[step - 1];
    const I = c ? c.q / c.t : 0;
    const reading = c ? `${nf(I, 2)} A` : "? A";
    const meter = (x: number, y: number): El[] => [C(x, y, 17, { tone: "a" }), T(x, y, "A", "c", { bold: true, tone: "a" })];
    const els: El[] = [
      // Üst tel: 90 → 163 | ampermetre 180 | 197 → 249 | lamba 265 | 281 → 333 | ampermetre 350 | 367 → 440
      L(90, 60, 163, 60),
      L(197, 60, 249, 60),
      L(281, 60, 333, 60),
      L(367, 60, 440, 60),
      L(440, 60, 440, 220),
      L(440, 220, 282, 220),
      L(248, 220, 90, 220),
      L(90, 220, 90, 152),
      L(90, 128, 90, 60),
      L(66, 128, 114, 128, { bold: true }),
      L(78, 152, 102, 152, { bold: true }),
      T(56, 128, "+", "w", { bold: true }),
      T(56, 152, "−", "w", { bold: true }),
      ...meter(180, 60),
      ...meter(350, 60),
      ...meter(265, 220),
      C(265, 60, 16, { tone: "ink", fill: c ? "warn" : undefined }),
      L(254, 49, 276, 71, { thin: true }),
      L(254, 71, 276, 49, { thin: true }),
      T(265, 26, "lamba", "c", { tone: "muted" }),
      T(180, 26, reading, "c", { bold: true, tone: "a" }),
      T(350, 26, reading, "c", { bold: true, tone: "a" }),
      T(265, 256, reading, "c", { bold: true, tone: "a" }),
      A(462, 105, 462, 175, "ink", { bold: true }),
      T(472, 140, "akım", "e"),
      A(418, 175, 418, 105, "b", { dash: true }),
      T(408, 140, "elektron", "w", { tone: "b" }),
    ];
    return {
      els,
      readout: c
        ? [`${c.conv}; I = q/t = ${nf(I, 2)} A.`, `${c.title}: ${c.detail.join(" ")}`, `Üç ampermetre de ${nf(I, 2)} A okur: seri yolda bir noktadan geçen yük aynı sürede sonraki noktadan da geçer.`]
        : ["İleri ile bir veri durumu aç: önce yükü coulomba, süreyi saniyeye çevir.", "Akım seçilen kesitten birim zamanda geçen net yüktür; devrenin neresinde ölçülürse ölçülsün seri yolda aynıdır."],
    };
  },
});

// ε = 18 V ideal pil, R₁ = 2 Ω, R₂ sürgüyle.
const potentialFigure = mk({
  caption:
    "Devre boyunca potansiyel: ideal pil yük başına 18 J/C kazandırır, iki seri direnç bunu paylaşır. Sürgüyle R₂'yi değiştir. Akım her yerde aynıdır; değişen, her coulomb yükün dirençlerde bıraktığı enerjidir (1 V = 1 J/C).",
  alt: "Potansiyel–devre boyunca konum grafiği. Pilde potansiyel 0'dan 18 V'a sıçrar, telde sabit kalır, R₁ boyunca bir miktar düşer, telde sabit kalır, R₂ boyunca 0'a iner. Altta pil, R₁ ve R₂ bölgelerinin adları yazılıdır.",
  h: 270,
  param: { label: "R₂ direnci", min: 1, max: 10, step: 1, init: 4, unit: "Ω" },
  draw: (raw) => {
    const r2 = snap(raw, 1, 10, 1, 4);
    const I = 18 / (2 + r2);
    const v1 = 2 * I;
    const v2 = r2 * I;
    const vc = 18 - v1;
    const Y = (v: number) => 220 - v * 9;
    const els: El[] = [
      A(60, 220, 522, 220, "ink", { thin: true }),
      A(60, 220, 60, 30, "ink", { thin: true }),
      T(70, 22, "V (volt)", "e", { tone: "muted" }),
      L(56, Y(18), 64, Y(18), { thin: true }),
      T(52, Y(18), "18", "w", { tone: "muted" }),
      T(52, 220, "0", "w", { tone: "muted" }),
      PL(
        [
          [60, 220],
          [85, 220],
          [85, Y(18)],
          [170, Y(18)],
          [250, Y(vc)],
          [320, Y(vc)],
          [400, 220],
          [480, 220],
        ],
        { open: true, tone: "a", bold: true },
      ),
      T(285, Y(vc) - 20, `${nf(vc)} V`, "c", { tone: "a", bold: true }),
      T(85, 248, "pil", "c", { tone: "muted" }),
      T(210, 248, "R₁ = 2 Ω", "c", { tone: "b" }),
      T(360, 248, `R₂ = ${r2} Ω`, "c", { tone: "b" }),
    ];
    return {
      els,
      readout: [
        `Seri bağ: Reş = 2 + ${r2} = ${2 + r2} Ω, I = 18/${2 + r2} ≈ ${nf(I)} A (her noktada aynı).`,
        `V₁ = I·R₁ ≈ ${nf(v1)} V, V₂ = I·R₂ ≈ ${nf(v2)} V; toplam 18 V.`,
        `Her 1 C yük R₁'de ${nf(v1)} J, R₂'de ${nf(v2)} J bırakır. 1 s'de ${nf(I)} C geçtiği için dönüşen güç ${nf(18 * I)} W.`,
      ],
    };
  },
});

// 12 V ideal pil, özdeş 4 Ω lambalar: K seri, L ve M paralel; S anahtarı L–M çiftini kısa devre eder.
const BRIGHT = [
  { label: "S açık, M bağlı", req: 6, p: [16, 4, 4], mOpen: false, s: false, title: "Seri lamba ana akımın tamamını taşır", detail: ["K'den 2 A, L ve M'den 1'er A geçer; akım yarıya inince güç dörtte bire iner."] },
  { label: "M kolu açık", req: 8, p: [9, 9, 0], mOpen: true, s: false, title: "Kol açılınca kalan iki lamba seri olur", detail: ["Toplam direnç arttı, ana akım azaldı: K kararır, L parlar."] },
  { label: "S kapalı", req: 4, p: [36, 0, 0], mOpen: false, s: true, title: "Anahtar L–M çiftini kısa devre eder", detail: ["Çiftin uçları aynı düğüme bağlanır, uçlarındaki gerilim 0 olur; 2,5 A'lik örnek sigorta 3 A'de devreyi açar."] },
];
const brightnessFigure = mk({
  caption:
    "Özdeş üç lamba (her biri 4 Ω) ve 12 V ideal pil: K seri, L ile M paralel. İleri ile üç bağlantı durumunu aç; önce düğümleri yeniden oku, sonra eşdeğer direnç, ana akım ve P = I²R ile güçleri karşılaştır. Parlaklığı lamba sayısı değil, her lambanın akımı belirler.",
  alt: "Sol kolda 12 V pil. Üst telde K lambası, ardından bir düğümden ayrılan iki kol: üstte L, altta M lambası. Paralel çiftin altında, çiftin iki ucunu birleştiren S anahtarlı bir tel. Lambaların yanında güçleri watt olarak yazılı; açık kol kesik çizgiyle gösterilir.",
  h: 280,
  steps: ["Devre", ...BRIGHT.map((b) => b.label)],
  draw: (_v, step) => {
    const b = BRIGHT[step - 1] ?? BRIGHT[0];
    const on = step > 0;
    const lamp = (x: number, y: number, p: number): El[] => [
      C(x, y, 16, { tone: "ink", fill: on && p > 0 ? "warn" : undefined }),
      L(x - 11, y - 11, x + 11, y + 11, { thin: true }),
      L(x - 11, y + 11, x + 11, y - 11, { thin: true }),
    ];
    const w = (name: string, p: number) => (on ? `${name}: ${p} W` : name);
    const els: El[] = [
      // Sol kol ve pil
      L(70, 60, 70, 143),
      L(70, 167, 70, 250),
      L(46, 143, 94, 143, { bold: true }),
      L(58, 167, 82, 167, { bold: true }),
      T(104, 155, "12 V", "e", { tone: "muted" }),
      // Üst tel ve K
      L(70, 60, 154, 60),
      ...lamp(170, 60, b.p[0]),
      L(186, 60, 260, 60),
      T(170, 26, w("K", b.p[0]), "c", { bold: true, tone: on ? "a" : "ink" }),
      // L kolu
      L(260, 60, 339, 60),
      ...lamp(355, 60, b.p[1]),
      L(371, 60, 450, 60),
      T(355, 26, w("L", b.p[1]), "c", { bold: true, tone: on ? "a" : "ink" }),
      // M kolu
      L(260, 60, 260, 205),
      L(260, 140, 339, 140, { dash: b.mOpen, tone: b.mOpen ? "muted" : "ink" }),
      ...lamp(355, 140, b.p[2]),
      L(371, 140, 450, 140, { dash: b.mOpen, tone: b.mOpen ? "muted" : "ink" }),
      T(355, 176, b.mOpen ? "M: kol açık" : w("M", b.p[2]), "c", { bold: true, tone: on ? (b.mOpen ? "muted" : "a") : "ink" }),
      // Sağ kol, alt tel
      L(450, 60, 450, 250),
      L(450, 250, 70, 250),
      // Anahtar teli
      L(260, 205, 318, 205),
      C(318, 205, 4, { fill: "ink" }),
      b.s ? L(318, 205, 382, 205, { tone: "warn", bold: true }) : L(318, 205, 376, 188, { tone: "ink" }),
      C(382, 205, 4, { fill: "ink" }),
      L(382, 205, 450, 205),
      T(350, 228, b.s ? "S kapalı" : "S açık", "c", { tone: b.s ? "warn" : "muted" }),
    ];
    const I = 12 / b.req;
    return {
      els,
      readout: on
        ? [`Reş = ${b.req} Ω, ana akım I = 12/${b.req} = ${nf(I)} A.`, `P = I²R: K ${b.p[0]} W, L ${b.p[1]} W, M ${b.p[2]} W.`, `${b.title}: ${b.detail[0]}`, b.s ? "Toplam direnç azaldı, kaynak akımı arttı: aşırı akım koruması bu artışa karşı çalışır; şebekede deney yapılmaz." : "2023 TYT Fen 5 mantığı: anahtar konumu değişince düğümleri yeniden çiz; ortak görünen her lambanın akımı aynı kalmaz."]
        : ["İleri ile bir bağlantı durumu aç: önce hangi uçların aynı düğüm olduğunu belirle.", "Sıra: eşdeğer direnç → ana akım → kol akımları → güç."],
    };
  },
});

/* =====================================================================
 * 013 Sıvılarda Kaldırma Kuvveti
 * ===================================================================== */

// Metal top ρ = 8000 kg/m³, su 1000 kg/m³, kap kesiti 500 cm², g = 10 m/s².
const boatFigure = mk({
  caption:
    "Teknedeki yük suyu ağırlığı kadar, dipteki yük hacmi kadar yer değiştirir (çizim ölçekli değil). Sürgüyle metal topun kütlesini değiştir: teknedeyken m kg için m litre, dipteyken m/8 litre su yerinden çıkar; kaptaki su düzeyi düşer.",
  alt: "Yan yana iki kap. Solda top tekne içinde, tekne daha derine batmış; su düzeyi h₁. Sağda top kabın dibinde, tekne daha az batmış; eski düzey h₁ kesik çizgiyle, yeni ve daha alçak düzey h₂ düz çizgiyle gösterilir.",
  h: 270,
  param: { label: "Topun kütlesi m", min: 0.2, max: 1.2, step: 0.2, init: 0.8, unit: "kg" },
  draw: (raw) => {
    const m = Number(snap(raw, 0.2, 1.2, 0.2, 0.8).toFixed(1));
    const drop = 1.75 * m; // cm: (m − m/8) L / 500 cm²
    const h1 = 140;
    const h2 = h1 + drop * 12;
    const tank = (x0: number): El[] => [L(x0, 60, x0, 250), L(x0, 250, x0 + 230, 250), L(x0 + 230, 60, x0 + 230, 250)];
    const boat = (cx: number, level: number, draft: number): El =>
      PL(
        [
          [cx - 60, level - 36 + draft],
          [cx + 60, level - 36 + draft],
          [cx + 40, level + draft],
          [cx - 40, level + draft],
        ],
        { tone: "ink" },
      );
    const els: El[] = [
      T(135, 30, "Top teknede", "c", { bold: true }),
      T(397, 30, "Top dipte", "c", { bold: true }),
      ...tank(20),
      ...tank(282),
      L(20, h1, 105, h1, { tone: "b", bold: true }),
      L(225, h1, 250, h1, { tone: "b", bold: true }),
      boat(165, h1, 16),
      C(165, h1 - 32, 12, { tone: "a", fill: "a" }),
      T(30, h1 - 22, "h₁", "e", { tone: "b" }),
      L(282, h1, 512, h1, { tone: "muted", dash: true }),
      L(282, h2, 367, h2, { tone: "b", bold: true }),
      L(487, h2, 512, h2, { tone: "b", bold: true }),
      boat(427, h2, 6),
      C(330, 237, 12, { tone: "a", fill: "a" }),
      T(292, h1 - 22, "h₁", "e", { tone: "muted" }),
      T(292, h2 + 24, "h₂", "e", { tone: "b" }),
    ];
    return {
      els,
      readout: [
        `Teknede: topun ağırlığı ${nf(10 * m)} N; ek yer değiştirme m/ρs = ${nf(m)} kg / 1000 kg/m³ = ${nf(m)} L.`,
        `Dipte: top kendi hacmi kadar, ${nf(m)}/8000 m³ = ${nf(m / 8, 3)} L su yerinden çıkarır.`,
        `Toplam yer değiştirme ${nf(m - m / 8, 3)} L azalır; 500 cm² kesitli kapta düzey ${nf(drop)} cm düşer (g = 10 m/s²).`,
      ],
    };
  },
});

// Aynı hacim üç akışkanda: su 1000, yağ 800, hava yaklaşık 1,2 kg/m³; g = 10 m/s².
const FLUIDS: { name: string; rho: number; tone: Tone }[] = [
  { name: "Su, 1000 kg/m³", rho: 1000, tone: "b" },
  { name: "Yağ, 800 kg/m³", rho: 800, tone: "a" },
  { name: "Hava, 1,2 kg/m³", rho: 1.2, tone: "c" },
];
const fluidFigure = mk({
  caption:
    "Aynı hacim, üç akışkan: Fk = ρ·g·V'deki ρ cismin değil akışkanındır (g = 10 m/s²). Sürgüyle tam batık hacmi değiştir. Su ve yağdaki kaldırma hacimle orantılı büyür; havadaki statik kaldırma suya göre yaklaşık 830 kat küçüktür, çoğu sıvı sorusunda bu yüzden ihmal edilir.",
  alt: "Üç yatay çubuk: su, yağ ve hava için kaldırma kuvveti. Su ve yağ çubukları hacimle uzar; hava çubuğu neredeyse sıfır uzunluktadır. Çubukların sağında newton değerleri yazılıdır.",
  h: 200,
  param: { label: "Tam batık hacim V", min: 1, max: 10, step: 1, init: 2, unit: "L" },
  draw: (raw) => {
    const V = snap(raw, 1, 10, 1, 2);
    const els: El[] = [];
    FLUIDS.forEach((f, i) => {
      const y = 40 + i * 60;
      const fk = (f.rho * 10 * V) / 1000;
      const len = fk * 2.3;
      els.push(T(14, y, f.name, "e", { bold: true }), L(205, y - 16, 205, y + 16, { thin: true, tone: "muted" }));
      if (len >= 1) els.push(R(205, y - 13, 205 + len, y + 13, { tone: f.tone, fill: f.tone }));
      els.push(T(205 + Math.max(len, 0) + 10, y, `${nf(fk, fk < 1 ? 3 : 1)} N`, "e", { tone: f.tone, bold: true }));
    });
    return {
      els,
      readout: [
        `V = ${V} L = ${nf(V / 1000, 3)} m³. Su ${nf(10 * V, 0)} N, yağ ${nf(8 * V, 0)} N, hava ${nf(0.012 * V, 3)} N.`,
        "Aynı hacim farklı akışkanda farklı kaldırma görür; eşit Fk, eşit hacmi ancak aynı akışkanda ve aynı g'de gösterir.",
        "Kanat kuvveti akışa bağlıdır; durgun akışkandaki bu statik hesaba girmez.",
      ],
    };
  },
});

// 0,3 kg, 1 L blok; tam batık, alttan iple bağlı; su 1000 kg/m³; g = 10 m/s².
const EQ_STEPS = ["İlk konum", "İp kesildi", "Son denge", "Veri kontrolü"];
const equilibriumFigure = mk({
  caption:
    "Üç ayrı çizim: ilk konum, serbest bırakıldıktan sonraki ilk eğilim ve son denge. 0,3 kg, 1 L blok suyun içinde alttan bir iple tutuluyor (g = 10 m/s²). İleri ile ipi kes, bloğun yüzeye çıkıp yeni dengeye oturmasını izle; sonunda verinin neyi belirlediğini denetle.",
  alt: "Su dolu kap. İlk adımda blok tamamen batık ve alttan kabın tabanına iple bağlı; yukarı Fk = 10 N, aşağı G = 3 N ve ip kuvveti T = 7 N okları. Sonraki adımda ip kesik, net kuvvet yukarı. Son dengede blok yüzeyde, hacminin %30’u suyun altında; Fk = 3 N ve G = 3 N eşit oklar.",
  h: 288,
  steps: EQ_STEPS,
  draw: (_v, step) => {
    const els: El[] = [L(60, 40, 60, 270), L(60, 270, 480, 270), L(480, 40, 480, 270)];
    if (step < 2) {
      els.push(L(60, 70, 480, 70, { tone: "b", bold: true }));
      els.push(R(240, 140, 300, 200, { tone: "ink", bold: true }), T(270, 170, "1 L", "c", { bold: true }));
      els.push(A(320, 200, 320, 110, "a", { bold: true }), T(330, 155, "Fk = 10 N", "e", { tone: "a", bold: true }));
      els.push(A(220, 140, 220, 167, "ink", { bold: true }), T(212, 153, "G = 3 N", "w"));
      if (step === 0) {
        els.push(L(270, 200, 270, 270, { tone: "ink" }), A(250, 200, 250, 263, "warn", { bold: true }), T(242, 236, "T = 7 N", "w", { tone: "warn", bold: true }));
      } else {
        els.push(L(270, 245, 270, 270, { tone: "muted", dash: true }), T(282, 258, "ip kesik", "e", { tone: "muted" }), T(270, 225, "net 7 N yukarı", "c", { tone: "a", bold: true }));
      }
    } else {
      els.push(L(60, 70, 240, 70, { tone: "b", bold: true }), L(300, 70, 480, 70, { tone: "b", bold: true }));
      els.push(R(240, 28, 300, 88, { tone: "ink", bold: true }));
      els.push(A(320, 88, 320, 61, "a", { bold: true }), T(330, 44, "Fk = 3 N", "e", { tone: "a", bold: true }));
      els.push(A(220, 58, 220, 85, "ink", { bold: true }), T(212, 44, "G = 3 N", "w"));
      els.push(T(270, 120, "batan hacim 0,3 L", "c", { tone: "b" }));
      if (step === 3) els.push(T(270, 220, "0 ≤ 0,3 L ≤ 1 L", "c", { tone: "a", bold: true }));
    }
    const readout = [
      ["Tam batık: Fk = 1000 × 10 × 0,001 = 10 N yukarı, G = 0,3 × 10 = 3 N aşağı.", "Denge için ip T = 10 − 3 = 7 N aşağı çekmelidir; üstten ip varsaymak G − Fk = −7 N gibi olanaksız bir gerilme verir."],
      ["İp kesilince ilk an hâlâ tam batık: Fk = 10 N, G = 3 N, net 7 N yukarı.", "İlk eğilim son denge değildir; blok yüzeye doğru hızlanır."],
      ["Serbest yüzmede Fk = G = 3 N; 1000 × 10 × Vb = 3 → Vb = 0,0003 m³ = 0,3 L.", "Türdeş blokta Vb/V = ρc/ρs = 300/1000 = 0,3."],
      ["Sonuç denetimi: 0 ≤ Vb ≤ V sağlanıyor. Yüzmede G biliniyorsa Fk bulunur; tam batıkta Vb ve ρs gerekir.", "2020 TYT Fen 3 mantığı: serbest yüzen cisimde sıvı yoğunlaşınca Fk aynı kalır, batan hacim azalır. İp yönü verilmemişse varsayma, belirt."],
    ][step] ?? [];
    return { els, readout };
  },
});

export const physicsFigures070Sheets: Record<string, Record<string, FigureDef>> = {
  "dogrusal-hareket": {
    "Hareket gözlemci ve referansla tanımlanır": referenceFigure,
    "İki ortalamanın payları farklı": meansFigure,
    "Bekleme de zamandır": waitFigure,
    "Eşit süre ve eşit yol ortalamaları": equalFigure,
    "Hız grafiği: alan ile yol": areaFigure,
  },
  "enerji-ve-hareket": {
    "Birincil kaynak ve enerji taşıyıcısı": carrierFigure,
    "Üç enerji modelinin varsayımları": modelFigure,
    "Sıfır ve eşik durumları": thresholdFigure,
    "Enerji çözümünü planla": planFigure,
  },
  "elektrik-akimi": {
    "Yük hareketi var; yük tüketimi yok": seriesFigure,
    "Gerilim enerji başına değil, yük başına enerjidir": potentialFigure,
    "Güç ve enerjiyle parlaklığı ve güvenliği yorumla": brightnessFigure,
  },
  "sivilarin-kaldirma-kuvveti": {
    "Tekne ve yükte ağırlık hacme çevrilir": boatFigure,
    "Gazlar da kaldırır, fakat her yükselme Arşimet değildir": fluidFigure,
    "Denge, ilk eğilim ve veri yeterliliğini denetle": equilibriumFigure,
  },
};
