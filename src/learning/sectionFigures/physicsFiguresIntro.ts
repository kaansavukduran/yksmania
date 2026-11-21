import { ball, circle, fmt, poly, right, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Fizik bilimine giriş. One device with three mechanisms (lens, motor, heat),
 * the two independent classifications of quantities as a 2 × 2 grid, length /
 * area / volume conversion factors drawn as 100, 100² and 100³, signed sums on
 * one axis, perpendicular forces (why 8 − 3 = 5 is wrong there) and a ruler
 * with a constant zero offset. Schematic; numbers follow the guide examples.
 */

const rect = (x: number, y: number, w: number, h: number, tone: Tone, fill = true, thin = false): El =>
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], { tone, fill: fill ? tone : undefined, thin });

/* ---------- 1. Bir cihaz, üç mekanizma ---------- */
const device: FigureDef = {
  caption:
    "İleri ile aynı elektrikli cihazdaki üç olayı ayrı ayrı aç. Alt dalı cihazın adı değil, sorulan mekanizma belirler: mercekte kırılma optik, bobindeki akımın manyetik etkisi elektromanyetizma, gövdenin ısınıp soğuması termodinamiktir.",
  alt: "Kutu biçiminde bir cihaz: solda mercekten geçip kırılan ışık ışınları, ortada mıknatıs kutupları arasında bobin, sağda gövdeden yükselen ısı dalgaları. Her adımda bir bölüm vurgulanır ve alt dal adı yazılır.",
  steps: ["Mercek: kırılma", "Motor: akım ve manyetik alan", "Gövde: ısı aktarımı"],
  draw: (_v, step) => {
    const els: El[] = [rect(-5, -1.6, 10, 3.2, "muted", false)];
    const on = (i: number) => step === i;
    // Lens with three refracted rays meeting at a focus.
    const lt: Tone = on(0) ? "b" : "muted";
    const lens: V[] = [];
    for (let i = 0; i <= 16; i++) lens.push(v(-3.4 + 0.28 * Math.cos((Math.PI * i) / 16 - Math.PI / 2), -1.1 + (2.2 * i) / 16));
    for (let i = 0; i <= 16; i++) lens.push(v(-3.4 - 0.28 * Math.cos((Math.PI * i) / 16 - Math.PI / 2), 1.1 - (2.2 * i) / 16));
    els.push(poly(lens, { tone: lt, fill: on(0) ? "b" : undefined, smooth: true }));
    for (const y of [-0.7, 0, 0.7]) els.push(seg(v(-4.7, y), v(-3.4, y), { tone: on(0) ? "warn" : "muted", thin: !on(0) }), seg(v(-3.4, y), v(-2.1, 0), { tone: on(0) ? "warn" : "muted", thin: !on(0) }));
    // Motor: two pole blocks and a coil between them.
    const mt: Tone = on(1) ? "a" : "muted";
    els.push(rect(-1.3, -1.0, 0.6, 2.0, on(1) ? "warn" : "muted", on(1)), rect(0.9, -1.0, 0.6, 2.0, on(1) ? "b" : "muted", on(1)));
    els.push(txt(v(-1.0, 0), "N", "c", { tone: on(1) ? "ink" : "muted", small: true, bold: true }), txt(v(1.2, 0), "S", "c", { tone: on(1) ? "ink" : "muted", small: true, bold: true }));
    for (let i = 0; i < 4; i++) els.push(circle(v(0.1, -0.6 + i * 0.4), 0.28, { tone: mt, thin: !on(1), bold: on(1) }));
    if (on(1)) for (const y of [-0.75, 0.75]) els.push(vec(v(-0.65, y), v(0.85, y), { tone: "c", thin: true }));
    // Body heat: three wavy lines rising from the right side.
    const ht: Tone = on(2) ? "warn" : "muted";
    for (const x of [2.8, 3.5, 4.2]) {
      const ps: V[] = Array.from({ length: 21 }, (_, i) => v(x + 0.15 * Math.sin(i * 0.9), 1.6 + i * 0.07));
      els.push(poly(ps, { tone: ht, open: true, smooth: true, bold: on(2), thin: !on(2) }));
    }
    els.push(rect(2.5, -1.2, 2.0, 2.4, ht, on(2), !on(2)));
    // Labels below the box only.
    const names: [number, string][] = [[-3.4, "optik"], [0.1, "elektromanyetizma"], [3.5, "termodinamik"]];
    // The long middle name sits half a row lower so neighbours never touch.
    names.forEach(([x, s], i) => els.push(txt(v(x, i === 1 ? -2.45 : -1.9), s, "s", { tone: on(i) ? "ink" : "muted", small: true, bold: on(i) })));
    els.push(txt(v(-5.4, 3.4), " ", "c"), txt(v(5.4, -3.4), " ", "c"));
    const rows: [string, string][] = [
      ["Işığın mercekte kırılıp bir noktada toplanması: optik.", "Cihaz elektrikli diye bu olay elektromanyetizma olmaz."],
      ["Bobindeki akımın mıknatısın alanında itilmesi: elektromanyetizma.", "Aynı cihazdaki mercek sorulsaydı cevap optik olurdu."],
      ["Çalışan gövdenin ısınması ve ortama ısı vermesi: termodinamik.", "Isı (aktarılan enerji) ile sıcaklık (ölçülen durum) aynı nicelik değildir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 2. İki sınıflama ---------- */
const grid: FigureDef = {
  caption:
    "İleri ile iki ayrı soruyu sırayla sor. Temel mi türetilmiş mi sorusu tanıma bakar (yedi SI temel büyüklüğünden biri mi?). Skaler mi vektörel mi sorusu yöne bakar. Bir sütundan ötekini tahmin etme: kuvvet türetilmiş ve vektörel, enerji türetilmiş ama skalerdir.",
  alt: "İki satır iki sütunlu tablo: satırlar temel ve türetilmiş, sütunlar skaler ve vektörel. Temel–skaler hücresinde kütle, zaman, sıcaklık; temel–vektörel hücresi boş; türetilmiş–skaler hücresinde enerji, alan, sürat; türetilmiş–vektörel hücresinde kuvvet, hız, ivme.",
  steps: ["Temel ve skaler", "Türetilmiş ve skaler", "Türetilmiş ve vektörel", "Boş hücre"],
  draw: (_v, step) => {
    const els: El[] = [];
    const W = 4.2;
    const H = 1.6;
    const cells: { c: number; r: number; lines: string[]; tone: Tone; at: number }[] = [
      { c: 0, r: 0, lines: ["kütle, zaman,", "sıcaklık, akım"], tone: "b", at: 0 },
      { c: 1, r: 0, lines: ["boş", "(temeller skaler)"], tone: "muted", at: 3 },
      { c: 0, r: 1, lines: ["enerji, alan,", "hacim, sürat"], tone: "c", at: 1 },
      { c: 1, r: 1, lines: ["kuvvet, hız,", "ivme"], tone: "a", at: 2 },
    ];
    for (const cl of cells) {
      const x = cl.c * W;
      const y = -cl.r * H;
      const on = step === cl.at;
      els.push(poly([v(x, y), v(x + W, y), v(x + W, y - H), v(x, y - H)], { tone: on ? cl.tone : "muted", fill: on ? cl.tone : undefined, bold: on, thin: !on }));
      els.push(txt(v(x + W / 2, y - 0.5), cl.lines[0], "c", { tone: on ? "ink" : "muted", small: true, bold: on }), txt(v(x + W / 2, y - 1.05), cl.lines[1], "c", { tone: on ? "ink" : "muted", small: true, bold: on }));
    }
    els.push(txt(v(W / 2, 0.2), "skaler", "n", { tone: "ink", small: true, bold: true }), txt(v(1.5 * W, 0.2), "vektörel", "n", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(-0.2, -H / 2), "temel", "w", { tone: "ink", small: true, bold: true }), txt(v(-0.2, -1.5 * H), "türetilmiş", "w", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(-2.6, 1.0), " ", "c"), txt(v(2 * W + 0.3, -2 * H - 0.3), " ", "c"));
    const rows: [string, string][] = [
      ["Yedi SI temel büyüklüğü: uzunluk (m), kütle (kg), zaman (s), sıcaklık (K), akım (A), madde miktarı (mol), ışık şiddeti (cd).", "Hepsi skalerdir; −5 °C gibi eksi değer yön demek değildir."],
      ["Enerji J = kg·m²/s², alan m², hacim m³, sürat m/s: temel birimlerden kurulur, yön gerekmez.", "Alan yalnız uzunluktan türese de türetilmiştir."],
      ["Kuvvet N = kg·m/s², hız m/s, ivme m/s²: türetilmiş ve yön gerektirir.", "N tek harfli diye temel birim değildir."],
      ["Temel ve vektörel hücresi boş kalır.", "Önce tanım sütununu, sonra yön sütununu ayrı ayrı doldur."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 3. Uzunluk, alan, hacim çarpanı ---------- */
const powers: FigureDef = {
  caption:
    "İleri ile 1 m'yi cm'ye çevir. Uzunlukta çarpan 100, alanda iki uzunluk çarpıldığı için 100² = 10 000, hacimde 100³ = 1 000 000 olur. Izgarada her küçük kare 10 cm × 10 cm = 100 cm²'dir; 100 tane vardır.",
  alt: "Üç parça: 1 metrelik çubuk 100 santimetreye bölünmüş; 1 metrekarelik kare 10'a 10 ızgaraya bölünmüş; 1 metreküplük küp perspektif çizimde.",
  steps: ["Uzunluk: ×100", "Alan: ×100²", "Hacim: ×100³"],
  draw: (_v, step) => {
    const els: El[] = [];
    // 1 m rod with 10 major and 100 minor ticks.
    const on0 = step === 0;
    els.push(seg(v(0, 3.3), v(4, 3.3), { tone: on0 ? "b" : "muted", bold: true }));
    for (let i = 0; i <= 100; i++) {
      const h = i % 10 === 0 ? 0.22 : 0.09;
      if (i % 10 === 0 || on0) els.push(seg(v(i * 0.04, 3.3), v(i * 0.04, 3.3 + h), { tone: on0 ? "b" : "muted", thin: true }));
    }
    els.push(txt(v(4.2, 3.3), on0 ? "1 m = 100 cm" : "1 m", "e", { tone: on0 ? "ink" : "muted", small: true, bold: on0 }));
    // 1 m² square with 10 × 10 grid.
    const on1 = step === 1;
    els.push(poly([v(0, -1), v(4, -1), v(4, 3 - 0.0), v(0, 3)].map((p) => v(p[0], p[1] - 0.7)), { tone: on1 ? "c" : "muted", fill: on1 ? "c" : undefined, bold: on1, thin: !on1 }));
    if (on1)
      for (let i = 1; i < 10; i++) els.push(seg(v(i * 0.4, -1.7), v(i * 0.4, 2.3), { tone: "c", thin: true }), seg(v(0, -1.7 + i * 0.4), v(4, -1.7 + i * 0.4), { tone: "c", thin: true }));
    els.push(txt(v(2, -1.9), on1 ? "1 m² = 100 × 100 cm² = 10 000 cm²" : "1 m²", "s", { tone: on1 ? "ink" : "muted", small: true, bold: on1 }));
    // 1 m³ cube in oblique projection.
    const on2 = step === 2;
    const t2: Tone = on2 ? "a" : "muted";
    const o = v(6.2, -1.2);
    const d = v(1.3, 1.0);
    const sq = (p: V): V[] => [p, v(p[0] + 3, p[1]), v(p[0] + 3, p[1] + 3), v(p[0], p[1] + 3)];
    const back = sq(v(o[0] + d[0], o[1] + d[1]));
    const front = sq(o);
    els.push(poly(back, { tone: t2, thin: true, dash: true }), poly(front, { tone: t2, fill: on2 ? "a" : undefined, bold: on2, thin: !on2 }));
    for (let i = 0; i < 4; i++) els.push(seg(front[i], back[i], { tone: t2, thin: !on2 }));
    els.push(txt(v(o[0] + 1.5, o[1] - 0.2), on2 ? "1 m³ = 1 000 000 cm³" : "1 m³", "s", { tone: on2 ? "ink" : "muted", small: true, bold: on2 }));
    els.push(txt(v(-0.4, 4.4), " ", "c"), txt(v(11.4, -2.6), " ", "c"));
    const rows: [string, string][] = [
      ["1 m = 100 cm. 90 km/h = 90 × 1000 m ÷ 3600 s = 25 m/s.", "Oranlar (1000 m/km, 1 h/3600 s) 1'e eşittir; birimler sadeleşir."],
      ["1 cm² = (0,01 m)² = 0,0001 m². 2500 cm² = 0,25 m².", "Tuzak: 2500 ÷ 100 = 25 m² yanlış; alan çarpanı kareye alınır."],
      ["1 cm³ = (0,01 m)³ = 0,000001 m³. 1 L = 1 dm³ = 0,001 m³.", "Hacimde çarpanın küpü kullanılır."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 4. Tek eksende işaretli toplam ---------- */
const signed: FigureDef = {
  caption:
    "Sürgüyle ikinci kuvveti değiştir (sağ +, sol −). Birinci kuvvet 8 N sağa. Aynı doğrultudaki kuvvetler işaretleriyle toplanır: sola 3 N için (+8) + (−3) = +5 N, yani 5 N sağa. İşaret yönü söyler, büyüklük değildir.",
  alt: "Yatay eksende sıfır noktası; sağa 8 birimlik mavi ok, sürgüyle değişen ikinci ok ve altta bileşke oku.",
  param: { label: "İkinci kuvvet (sağ +)", min: -10, max: 10, step: 1, init: -3, unit: " N" },
  draw: (f2) => {
    const s = 0.35;
    const R = 8 + f2;
    const els: El[] = [seg(v(-4, 0), v(7, 0), { tone: "muted", thin: true }), seg(v(0, -2.6), v(0, 1.6), { tone: "muted", thin: true, dash: true })];
    els.push(vec(v(0, 1), v(8 * s, 1), { tone: "b", bold: true }), txt(v(8 * s, 1), "+8 N", "e", { tone: "b", small: true, bold: true }));
    if (f2 !== 0) els.push(vec(v(0, 0.4), v(f2 * s, 0.4), { tone: "warn", bold: true }), txt(v(f2 * s, 0.4), `${f2 > 0 ? "+" : "−"}${Math.abs(f2)} N`, f2 > 0 ? "e" : "w", { tone: "warn", small: true, bold: true }));
    if (R !== 0) els.push(vec(v(0, -0.8), v(R * s, -0.8), { tone: "c", bold: true }), txt(v(R * s, -0.8), `bileşke ${R > 0 ? "+" : "−"}${Math.abs(R)} N`, R > 0 ? "e" : "w", { tone: "c", small: true, bold: true }));
    else els.push(ball(v(0, -0.8), 0.1, "c"), txt(v(0.2, -0.8), "bileşke 0", "e", { tone: "c", small: true, bold: true }));
    els.push(txt(v(0, -1.6), "0", "s", { tone: "muted", small: true }), txt(v(-3, -2.4), "← sol (−)", "c", { tone: "muted", small: true }), txt(v(5, -2.4), "sağ (+) →", "c", { tone: "muted", small: true }));
    els.push(txt(v(-5.4, 2.2), " ", "c"), txt(v(8.2, -2.8), " ", "c"));
    return {
      els,
      readout: [
        `(+8) + (${f2 >= 0 ? "+" : "−"}${Math.abs(f2)}) = ${R > 0 ? "+" : R < 0 ? "−" : ""}${Math.abs(R)} N${R > 0 ? " → sağa" : R < 0 ? " → sola" : " (denge)"}`,
        "Bu yalnız aynı doğrultuda geçerlidir. Bileşke kuvvet hareket yönünü değil ivmeyi belirler: sağa giden cisim sola bileşkeyle yavaşlayabilir.",
      ],
    };
  },
};

/* ---------- 5. Dik iki kuvvet ---------- */
const perp: FigureDef = {
  caption:
    "İleri ile dik iki kuvveti topla. 8 N doğu ile 3 N kuzey zıt değildir; çıkarma geçersizdir. Bileşke dik üçgenin hipotenüsüdür: √(8² + 3²) = √73 ≈ 8,54 N. Tek eksende işaretli toplam ancak aynı doğrultuda kullanılır.",
  alt: "Orijinden doğuya 8 birim mavi ok, kuzeye 3 birim turuncu ok; uç uca eklenince oluşan dik üçgen ve yeşil bileşke oku; üstü çizili 5 N yazısı.",
  steps: ["İki kuvvet", "Uç uca ekle", "Bileşke"],
  draw: (_v, step) => {
    const k = 0.55;
    const O = v(0, 0);
    const E = v(8 * k, 0);
    const N = v(0, 3 * k);
    const T = v(8 * k, 3 * k);
    const els: El[] = [vec(O, E, { tone: "b", bold: true }), txt(v(4 * k, 0), "8 N doğu", "s", { tone: "b", small: true, bold: true })];
    if (step === 0) els.push(vec(O, N, { tone: "warn", bold: true }), txt(N, "3 N kuzey", "n", { tone: "warn", small: true, bold: true }));
    else els.push(vec(E, T, { tone: "warn", bold: true }), txt(v(E[0], 1.5 * k), "3 N", "e", { tone: "warn", small: true, bold: true }), right(E, O, T, "muted"));
    if (step === 2) {
      els.push(vec(O, T, { tone: "c", bold: true }), txt(v(2.2, 1.2), "√73 ≈ 8,54 N", "nw", { tone: "c", small: true, bold: true }));
    }
    els.push(txt(v(-1.2, 2.6), " ", "c"), txt(v(6.6, -1.0), " ", "c"));
    const rows: [string, string][] = [
      ["8 N doğu, 3 N kuzey: doğrultular diktir.", "8 − 3 = 5 N yalnız zıt yönlerde (aynı doğrultu) geçerli olurdu."],
      ["İkinci oku birincinin ucuna taşı: yön ve büyüklük korunur.", "Vektörü kaydırmak onu değiştirmez; yeri değil, yönü ve büyüklüğü önemlidir."],
      ["Bileşke = √(8² + 3²) = √73 ≈ 8,54 N, doğunun yaklaşık 20,6° kuzeyine.", "Bileşke 5 ile 11 N arasındadır: |8 − 3| ≤ R ≤ 8 + 3."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 6. Cetvel: uçlardan fark, sabit sıfır kayması ---------- */
const ruler: FigureDef = {
  caption:
    "İleri ile cetvel okumasını izle. Cismin sol ucu 2,0 cm, sağ ucu 8,4 cm: uzunluk 8,4 − 2,0 = 6,4 cm. Cetvel her okumaya aynı 0,3 cm'yi ekliyorsa (sabit sıfır kayması) iki uç da kayar, fark değişmez. Kayma okumadan okumaya değişseydi bu iptal varsayılamazdı.",
  alt: "Santimetre bölmeli yatay cetvel; üzerinde 2,0 ile 8,4 cm arasında duran turuncu çubuk; uçlardan inen kesik çizgiler; son adımda cetvelin bölmeleri 0,3 cm sola kaymış, iki okuma da 0,3 cm büyük.",
  steps: ["İki ucu oku", "Farkı al", "Sabit kayma"],
  draw: (_v, step) => {
    const els: El[] = [];
    const k = 0.9;
    const shift = step === 2 ? 0.3 : 0;
    els.push(rect(-0.3 * k, -1.45, 10.6 * k, 1.45, "muted", false));
    for (let i = 0; i <= 100; i++) {
      const x = (i / 10 - shift) * k;
      if (x < -0.25 * k) continue;
      els.push(seg(v(x, 0), v(x, i % 10 === 0 ? -0.45 : i % 5 === 0 ? -0.3 : -0.17), { tone: step === 2 ? "warn" : "ink", thin: i % 10 !== 0 }));
      if (i % 10 === 0) els.push(txt(v(x, -0.45), String(i / 10), "s", { tone: step === 2 ? "warn" : "muted", small: true }));
    }
    const L = 2.0 * k;
    const Rr = 8.4 * k;
    els.push(rect(L, 0.05, Rr - L, 0.5, "b"));
    for (const x of [L, Rr]) els.push(seg(v(x, 0.6), v(x, 1.4), { tone: "c", dash: true, thin: true }));
    const l = 2.0 + shift;
    const r = 8.4 + shift;
    els.push(txt(v(L, 1.4), `${fmt(l, 1)} cm`, "n", { tone: "c", small: true, bold: true }), txt(v(Rr, 1.4), `${fmt(r, 1)} cm`, "n", { tone: "c", small: true, bold: true }));
    if (step >= 1) els.push(txt(v((L + Rr) / 2, 0.3), "6,4 cm", "c", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(-0.8, 2.4), " ", "c"), txt(v(10.2, -1.6), " ", "c"));
    const rows: [string, string][] = [
      ["Sol uç 2,0 cm, sağ uç 8,4 cm.", "Yalnız sağ ucu okuyup 8,4 cm demek, başlangıcı atlamaktır."],
      ["Uzunluk = sağ uç − sol uç = 8,4 − 2,0 = 6,4 cm.", "Çok basamak yazmak doğruluk yaratmaz; en küçük bölme okuma düzeyini sınırlar."],
      [`Cetvel kaymış: okumalar ${fmt(l, 1)} ve ${fmt(r, 1)} cm; fark yine 6,4 cm.`, "Sabit kayma farkta iptal olur. Tekrarlı ölçüm rastlantısal değişimi azaltır ama sistematik kaymayı silmez."],
    ];
    return { els, readout: rows[step] };
  },
};

export const physicsFiguresIntro: Record<string, Record<string, FigureDef>> = {
  "fizik-bilimine-giris": {
    "Alanları sorudaki mekanizmaya göre ayır": device,
    "İki sınıflamayı çapraz kontrol et": grid,
    "SI ön eklerini kuvvetiyle dönüştür": powers,
    "Tek eksende ok ve bileşen": signed,
    "İki yöndeki bileşenlerden bileşkeye": perp,
    "Kalibrasyon ve sıfır sapması": ruler,
  },
};
