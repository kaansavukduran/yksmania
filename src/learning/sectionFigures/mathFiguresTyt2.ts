import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Matematik problems: meeting and catching up on a road with a time
 * slider, a train crossing a bridge, combined work as filled fractions of one
 * job, a dilution beaker whose solute particles stay constant, and EBOB/EKOK as
 * equal tiles versus a common meeting point. Positions are computed from the
 * stated speeds and times. Labels are placed on separate rows so they never
 * share space with each other or with the moving objects.
 */

const fmt = (x: number, d = 2) => x.toLocaleString("tr-TR", { maximumFractionDigits: d });
function rect(x: number, y: number, w: number, h: number, tone: Tone, fill = true): El {
  return poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], fill ? { tone, fill: tone, thin: true } : { tone, thin: true });
}
function car(x: number, y: number, tone: Tone, dir: 1 | -1): El[] {
  // Body drawn facing right, then mirrored about x for dir = −1.
  const base: [number, number][] = [
    [-0.45, 0],
    [0.45, 0],
    [0.45, 0.22],
    [0.15, 0.38],
    [-0.3, 0.38],
    [-0.45, 0.22],
  ];
  const pts = base.map(([dx, dy]) => v(x + dx * dir, y + dy));
  return [poly(pts, { tone, fill: tone, thin: true }), ball(v(x - 0.25, y - 0.02), 0.09, "ink"), ball(v(x + 0.25, y - 0.02), 0.09, "ink")];
}

/* ---------- Karşılaşma ---------- */
const meeting: FigureDef = {
  caption:
    "Sürgüyle zamanı ilerlet. 300 km arayla A'dan 60 km/sa, B'den 40 km/sa hızla aynı anda birbirine doğru çıkan araçlar aradaki mesafeyi birlikte kapatır: her saat 60 + 40 = 100 km. Karşılaşma 300 / 100 = 3. saatte, A'dan 180 km uzakta.",
  alt: "Yatay yol, solda A, sağda B şehri; iki araç zamanla birbirine yaklaşıyor; araçların altında A'dan uzaklıkları, üstte kalan mesafe.",
  param: { label: "Zaman (sa)", min: 0, max: 3, step: 0.25, init: 1 },
  draw: (t) => {
    const K = 0.03; // km → units
    const xA = 60 * t * K;
    const xB = (300 - 40 * t) * K;
    const els: El[] = [seg(v(0, 0), v(9, 0), { tone: "ink", bold: true })];
    for (const [x, s] of [
      [0, "A"],
      [9, "B"],
    ] as [number, string][])
      els.push(seg(v(x, -0.15), v(x, 0.15), { tone: "ink", bold: true }), txt(v(x, -1.2), s, "s", { tone: "ink", bold: true }));
    els.push(...car(xA, 0.12, "b", 1), ...car(xB, 0.12, "warn", -1));
    els.push(txt(v(xA, -0.3), `${fmt(60 * t, 0)} km`, "s", { tone: "b", small: true }), txt(v(xB, -0.75), `${fmt(300 - 40 * t, 0)} km`, "s", { tone: "warn", small: true }));
    if (xB - xA > 0.6) els.push(vec(v(xA + 0.5, 1.0), v(xB - 0.5, 1.0), { tone: "muted", thin: true }), vec(v(xB - 0.5, 1.0), v(xA + 0.5, 1.0), { tone: "muted", thin: true }), txt(v((xA + xB) / 2, 1.15), `aralık ${fmt(300 - 100 * t, 0)} km`, "n", { tone: "muted", small: true }));
    else els.push(txt(v(xA, 1.0), "karşılaştılar", "n", { tone: "c", small: true, bold: true }));
    els.push(txt(v(-0.6, 1.9), " ", "c"), txt(v(9.6, -1.8), " ", "c"));
    return {
      els,
      readout: [`t = ${fmt(t)} sa: A ${fmt(60 * t, 0)} km, B ${fmt(40 * t, 0)} km yol aldı; aralık 300 − 100·t = ${fmt(300 - 100 * t, 0)} km`, "Birbirine gelenlerde hızlar toplanır (ortak kapatma hızı). Aynı yönde yetişmede hızlar çıkarılır."],
    };
  },
};

/* ---------- Yetişme ---------- */
const chase: FigureDef = {
  caption:
    "Sürgüyle zamanı ilerlet. Önde 40 km/sa giden araç 60 km önden başlıyor; arkadan 70 km/sa ile gelen araç her saat aradaki farkı 70 − 40 = 30 km kapatır. Yetişme 60 / 30 = 2. saatte. Arkadaki daha hızlı değilse hiç yetişemez.",
  alt: "Aynı yönde giden iki araç: önde mavi, arkada turuncu; zamanla aradaki fark azalıyor ve 2. saatte aynı noktaya geliyorlar.",
  param: { label: "Zaman (sa)", min: 0, max: 2.5, step: 0.25, init: 1 },
  draw: (t) => {
    const K = 0.045;
    const xF = (60 + 40 * t) * K;
    const xR = 70 * t * K;
    const els: El[] = [seg(v(0, 0), v(9, 0), { tone: "ink", bold: true }), seg(v(0, -0.15), v(0, 0.15), { tone: "ink", bold: true }), txt(v(0, -0.3), "başlangıç", "s", { tone: "ink", small: true })];
    els.push(...car(xF, 0.12, "b", 1), ...car(Math.min(xR, xF), 0.12, "warn", 1));
    const gap = 60 - 30 * t;
    if (gap > 2) els.push(vec(v(xR + 0.5, 1.0), v(xF - 0.5, 1.0), { tone: "muted", thin: true }), txt(v((xR + xF) / 2, 1.15), `fark ${fmt(gap, 0)} km`, "n", { tone: "muted", small: true }));
    else els.push(txt(v(xF, 1.0), t > 2 ? "geçti" : "yetişti", "n", { tone: "c", small: true, bold: true }));
    els.push(txt(v(-0.6, 1.9), " ", "c"), txt(v(9.6, -0.8), " ", "c"));
    return {
      els,
      readout: [`t = ${fmt(t)} sa: önde ${fmt(60 + 40 * t, 0)} km, arkada ${fmt(70 * t, 0)} km · fark ${fmt(Math.max(gap, 0), 0)} km`, "Yetişme süresi = aradaki fark ÷ hız farkı = 60 ÷ (70 − 40) = 2 sa."],
    };
  },
};

/* ---------- Tren ve köprü ---------- */
const train: FigureDef = {
  caption:
    "İleri ile 200 m'lik trenin 600 m'lik köprüyü tamamen geçişini izle. Lokomotif köprüye girdiği andan son vagon köprüden çıktığı ana kadar trenin ön ucu 600 + 200 = 800 m yol alır. 20 m/s hızla süre 800 / 20 = 40 s.",
  alt: "Nehir üstünde köprü; soldan gelen beş vagonlu tren. Üç adımda ön uç köprü başında, tren köprü ortasında, son vagon köprüden çıkmış; ön ucun aldığı yol ok ile.",
  steps: ["Ön uç köprüye girer", "Tren köprüde", "Son vagon çıkar"],
  draw: (_v, step) => {
    const K = 0.008; // m → units
    const B0 = 1.5;
    const B1 = B0 + 600 * K;
    const L = 200 * K;
    const front = [B0, B0 + 400 * K, B1 + L][step];
    const els: El[] = [];
    els.push(poly([v(B0, -0.9), v(B1, -0.9), v(B1, -0.35), v(B0, -0.35)], { tone: "b", fill: "b", bare: true }));
    els.push(seg(v(0, 0), v(B0, 0), { tone: "ink" }), seg(v(B1, 0), v(9.6, 0), { tone: "ink" }), rect(B0, -0.3, B1 - B0, 0.3, "muted"));
    els.push(txt(v((B0 + B1) / 2, -0.95), "köprü 600 m", "s", { tone: "ink", small: true, bold: true }));
    for (let i = 0; i < 5; i++) {
      const x1 = front - i * (L / 5);
      els.push(rect(x1 - L / 5 + 0.03, 0.05, L / 5 - 0.06, 0.35, i === 0 ? "warn" : "c"));
    }
    if (step === 2) {
      els.push(vec(v(B0, 0.9), v(front, 0.9), { tone: "warn", bold: true }), txt(v((B0 + front) / 2, 1.05), "ön uç: 600 + 200 = 800 m", "n", { tone: "warn", small: true, bold: true }));
    } else els.push(txt(v(front - L / 2, 0.6), "tren 200 m", "n", { tone: "c", small: true }));
    els.push(txt(v(-0.3, 1.8), " ", "c"), txt(v(9.8, -1.4), " ", "c"));
    const rows: [string, string][] = [
      ["Ön uç köprü başında: ölçüm burada başlar.", "Trenin bir uzunluğu vardır; nokta gibi düşünülemez."],
      ["Tren köprünün üstünde ilerliyor.", "“Tamamen köprü üstünde” süresi istenirse ön uç 600 − 200 = 400 m yol alır."],
      ["Son vagon köprüden çıktı: ön uç köprü + tren = 800 m yol aldı → 800 ÷ 20 = 40 s.", "Tünelden “tamamen çıkma” da aynı mantıkla: tünel uzunluğu + tren uzunluğu."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- İşçi: birlikte çalışma ---------- */
const work: FigureDef = {
  caption:
    "Sürgüyle günü ilerlet. Bir işi A tek başına 6 günde (günde işin 1/6'sı), B 3 günde (1/3'ü) bitiriyor. Birlikte günde 1/6 + 1/3 = 1/2'sini yaparlar: iş 2 günde biter. Süreler toplanmaz; hızlar (günlük iş payları) toplanır.",
  alt: "Altı eşit parçaya bölünmüş tek bir iş çubuğu; her gün A'nın bir parçası (mavi) ve B'nin iki parçası (yeşil) doluyor; 2. günün sonunda çubuk tamamen dolu.",
  param: { label: "Gün", min: 0, max: 2, step: 0.5, init: 1 },
  draw: (d) => {
    const W = 6;
    const u = W / 6;
    const els: El[] = [];
    const doneA = d * 1;
    const doneB = d * 2;
    let x = 0;
    for (let i = 0; i < Math.round(doneA * 2) / 2; i += 0.5) {
      els.push(rect(x, 0, u / 2 - 0.02, 0.8, "b"));
      x += u / 2;
    }
    for (let i = 0; i < Math.round(doneB * 2) / 2; i += 0.5) {
      els.push(rect(x, 0, u / 2 - 0.02, 0.8, "c"));
      x += u / 2;
    }
    els.push(rect(0, 0, W, 0.8, "ink", false));
    for (let i = 1; i < 6; i++) els.push(seg(v(i * u, 0), v(i * u, 0.8), { tone: "muted", thin: true, dash: true }));
    els.push(txt(v(0, 1.0), "1 iş = 6 parça", "ne", { tone: "ink", small: true, bold: true }));
    els.push(rect(0, -0.9, 0.3, 0.3, "b"), txt(v(0.4, -0.75), "A: günde 1 parça (1/6)", "e", { tone: "b", small: true }));
    els.push(rect(0, -1.45, 0.3, 0.3, "c"), txt(v(0.4, -1.3), "B: günde 2 parça (1/3)", "e", { tone: "c", small: true }));
    els.push(txt(v(-0.4, 1.6), " ", "c"), txt(v(7.4, -1.8), " ", "c"));
    const done = (3 * d) / 6;
    return {
      els,
      readout: [`${fmt(d, 1)} gün: yapılan iş = ${fmt(d, 1)} × (1/6 + 1/3) = ${fmt(done, 3)} (işin ${fmt(done * 100, 0)}%'i)`, d >= 2 ? "İş bitti: 1 ÷ (1/6 + 1/3) = 2 gün. Ortak süre her iki tek başına süreden de kısadır." : "Kalan işi yeni evrede, o evrede çalışanların toplam hızına böl."],
    };
  },
};

/* ---------- Karışım: saf su ekleme ---------- */
const dilution: FigureDef = {
  caption:
    "Sürgüyle saf su ekle. 200 g'lık %30 tuzlu suda 60 g tuz vardır; su eklemek tuzu değiştirmez (noktalar sabit), yalnız toplamı büyütür. 100 g su eklenince 60 / 300 = %20. Önce saf maddeyi ayrı yaz.",
  alt: "Beher içinde tuz parçacıklarını temsil eden sabit sayıda nokta ve sürgüyle yükselen su seviyesi; yanında toplam kütle ve derişim.",
  param: { label: "Eklenen su", min: 0, max: 200, step: 25, init: 100, unit: "g" },
  draw: (w) => {
    const total = 200 + w;
    const H = total * 0.008;
    const els: El[] = [poly([v(0, 3.6), v(0, 0), v(2.6, 0), v(2.6, 3.6)], { tone: "ink", open: true, bold: true })];
    els.push(rect(0.04, 0.02, 2.52, H, "b"));
    for (let i = 0; i < 12; i++) {
      const px = 0.3 + (i % 4) * 0.62;
      const py = 0.25 + Math.floor(i / 4) * 0.4;
      els.push(circle(v(px, py), 0.08, { tone: "warn", fill: "warn" }));
    }
    els.push(txt(v(2.9, H), `toplam ${fmt(total, 0)} g`, "e", { tone: "b", small: true, bold: true }), txt(v(2.9, 0.6), "tuz 60 g (sabit)", "e", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(-0.4, 4), " ", "c"), txt(v(6.6, -0.4), " ", "c"));
    return {
      els,
      readout: [`Derişim = 60 ÷ ${fmt(total, 0)} = %${fmt((60 / total) * 100, 1)}`, "Su eklemek: tuz sabit, toplam artar. Su buharlaşırsa tersi: tuz sabit, toplam azalır. İki karışım birleşirse tuzlar ve toplamlar ayrı ayrı toplanır."],
    };
  },
};

/* ---------- EBOB / EKOK ---------- */
const gcd: FigureDef = {
  caption:
    "İleri ile iki ayrı soruyu ayır. 12 × 18'lik bir alanı boşluksuz kaplayan en büyük eş kare, kenarı EBOB(12, 18) = 6 olan karedir (6 kare). 12 ve 18 dakikada bir kalkan iki otobüs ise EKOK(12, 18) = 36 dakika sonra yeniden birlikte kalkar.",
  alt: "Önce 12'ye 18 dikdörtgen ve onu dolduran altı tane 6'ya 6 kare; sonra iki sayı doğrusu: 12'nin katları ve 18'in katları, 36'da ortak nokta işaretli.",
  steps: ["Eş parça: EBOB", "Ortak buluşma: EKOK"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) {
      const u = 0.22;
      for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) els.push(rect(i * 6 * u, j * 6 * u, 6 * u - 0.03, 6 * u - 0.03, (i + j) % 2 ? "c" : "b"));
      els.push(rect(0, 0, 18 * u, 12 * u, "ink", false));
      els.push(txt(v(9 * u, -0.15), "18", "s", { tone: "ink", small: true, bold: true }), txt(v(-0.15, 6 * u), "12", "w", { tone: "ink", small: true, bold: true }), txt(v(3 * u, 3 * u), "6 × 6", "c", { tone: "ink", small: true }));
      els.push(txt(v(-0.8, 3.2), " ", "c"), txt(v(4.6, -0.6), " ", "c"));
    } else {
      const K = 0.12;
      for (const [y, n, tone] of [
        [1, 12, "b"],
        [0, 18, "c"],
      ] as [number, number, Tone][]) {
        els.push(seg(v(0, y), v(40 * K + 0.3, y), { tone: "ink" }), txt(v(-0.2, y), `${n}'in katları`, "w", { tone, small: true, bold: true }));
        for (let m = 0; m <= 36; m += n) els.push(ball(v(m * K, y), 0.08, tone), txt(v(m * K, y - 0.18), String(m), "s", { tone, small: true }));
      }
      els.push(seg(v(36 * K, -0.5), v(36 * K, 1.5), { tone: "warn", dash: true }), txt(v(36 * K, 1.55), "ilk ortak: 36", "n", { tone: "warn", small: true, bold: true }));
      els.push(txt(v(-2.6, 2), " ", "c"), txt(v(5.2, -0.6), " ", "c"));
    }
    return {
      els,
      readout:
        step === 0
          ? ["12 = 2²·3, 18 = 2·3² → EBOB: ortak asallar küçük üsleriyle = 2·3 = 6. Kare sayısı (12/6)·(18/6) = 6.", "Parçalara bölme, eş kesme, en büyük ortak ölçü → EBOB."]
          : ["EKOK: bütün asallar büyük üsleriyle = 2²·3² = 36. Buluşma, tekrar, en küçük ortak kat → EKOK.", "Kontrol: EBOB · EKOK = 6 · 36 = 216 = 12 · 18."],
    };
  },
};

const positionTime: FigureDef = {
  caption: "Saat ilerledikçe iki aracı aynı konum ekseninde izle. Eğimlerin işareti yönü, doğruların kesişimi ortak yer ve zamanı gösterir.",
  alt: "Yatay eksen saat, düşey eksen kilometre. A’nın konumu 20’den artıyor, B’nin konumu 140’tan azalıyor. Doğrular 2. saatte 100 kilometrede kesişiyor.",
  param: { label: "Geçen süre", min: 0, max: 4, step: 0.25, init: 2, unit: " saat" },
  draw: (t) => {
    const aStart = 20;
    const bStart = 140;
    const aSpeed = 40;
    const bSpeed = -20;
    const a = (hour: number) => aStart + aSpeed * hour;
    const b = (hour: number) => bStart + bSpeed * hour;
    const meetTime = (bStart - aStart) / (aSpeed - bSpeed);
    const x = (hour: number) => hour * 1.67;
    const y = (km: number) => km * 0.023;
    const point = (hour: number, km: number) => v(x(hour), y(km));
    const els: El[] = [
      vec(v(0, 0), v(x(4.45), 0), { tone: "ink" }),
      vec(v(0, 0), v(0, y(204)), { tone: "ink" }),
      txt(v(x(4.45), 0), "saat", "se", { small: true }),
      txt(v(0, y(204)), "km", "n", { small: true }),
    ];
    for (const hour of [0, 1, 2, 3, 4]) {
      els.push(txt(v(x(hour), 0), String(hour), "s", { small: true, tone: "ink" }));
    }
    for (const km of [40, 80, 120, 160]) {
      els.push(seg(point(0, km), point(4, km), { tone: "muted", thin: true, dash: true }));
      els.push(txt(point(0, km), String(km), "w", { small: true, tone: "ink" }));
    }
    els.push(
      seg(point(0, a(0)), point(4, a(4)), { tone: "a", bold: true }),
      seg(point(0, b(0)), point(4, b(4)), { tone: "c", bold: true }),
      txt(point(4, a(4)), "A", "e", { tone: "a" }),
      txt(point(4, b(4)), "B", "e", { tone: "c" }),
      seg(point(t, 0), point(t, Math.max(a(t), b(t))), { tone: "muted", dash: true }),
      ball(point(t, a(t)), 0.1, "a"),
      ball(point(t, b(t)), 0.1, "c"),
      ball(point(meetTime, a(meetTime)), 0.085, "ink"),
    );
    return {
      els,
      readout: [
        `${fmt(t)} saat. A ${fmt(a(t))} km, B ${fmt(b(t))} km konumunda. Aralık ${fmt(Math.abs(a(t) - b(t)))} km.`,
        `20 + 40t = 140 − 20t ⇒ t = ${meetTime} saat. İki konum da ${a(meetTime)} km.`,
        "A’nın eğimi +40 km/sa, B’nin eğimi −20 km/sa. Eksi işaret yönü gösterir.",
      ],
    };
  },
};

const sharedWorkGraph: FigureDef = {
  caption: "Sabit hızda eğim, bir saatte biten iş payıdır. A tek 12, B tek 18 saatte bitiriyor. Birlikte çalışmayı gösteren doğru 1 işe daha erken ulaşır.",
  alt: "Yatay eksen saat, düşey eksen bitirilen iş payı. A, B ve birlikte çalışma doğruları sıfırdan başlar. Bir işi bitiren doğru o noktada sonlanır.",
  param: { label: "Geçen süre", min: 0, max: 12, step: 0.2, init: 7.2, unit: " saat" },
  draw: (t) => {
    const x = (hour: number) => hour * 0.62;
    const y = (share: number) => share * 4.1;
    const rateA = 1 / 12;
    const rateB = 1 / 18;
    const together = rateA + rateB;
    const xEnd = x(12.8);
    const els: El[] = [
      vec(v(0, 0), v(xEnd, 0), { tone: "ink" }),
      vec(v(0, 0), v(0, y(1.13)), { tone: "ink" }),
      seg(v(0, y(1)), v(x(12), y(1)), { tone: "muted", dash: true }),
      txt(v(xEnd, 0), "saat", "se", { small: true }),
      txt(v(0, y(1.13)), "iş payı", "n", { small: true }),
    ];
    for (const hour of [0, 3, 6, 9, 12]) {
      els.push(txt(v(x(hour), 0), String(hour), "s", { small: true, tone: "ink" }));
    }
    for (const share of [0.5, 1]) {
      els.push(txt(v(0, y(share)), fmt(share, 1), "w", { small: true, tone: "ink" }));
    }
    const models: { name: string; rate: number; tone: Tone }[] = [
      { name: "A", rate: rateA, tone: "b" },
      { name: "B", rate: rateB, tone: "c" },
      { name: "A+B", rate: together, tone: "warn" },
    ];
    for (const { name, rate, tone } of models) {
      const end = Math.min(12, 1 / rate);
      const target = v(x(end), y(rate * end));
      els.push(seg(v(0, 0), target, { tone, bold: true }));
      els.push(txt(target, name, name === "A+B" ? "n" : "e", { tone, small: true, bold: true }));
    }
    els.push(seg(v(x(t), 0), v(x(t), y(Math.min(1, t * together))), { tone: "muted", dash: true }));
    els.push(ball(v(x(Math.min(t, 1 / together)), y(Math.min(1, t * together))), 0.095, "warn"));
    return {
      els,
      readout: [
        `${fmt(t, 1)} saat. A tek %${fmt(100 * t * rateA, 1)}, B tek %${fmt(100 * t * rateB, 1)}, birlikte %${fmt(100 * Math.min(1, t * together), 1)} iş.`,
        "Ortak hız 1/12 + 1/18 = 5/36 iş/saat. Bir iş 36/5 = 7,2 saatte biter.",
        "0,2 saat = 12 dakika. Sonuç 7 saat 12 dakika.",
      ],
    };
  },
};

const weightedMixture: FigureDef = {
  caption: "Çubukların tümü karışımın kütlesini, iki parçası şeker ve suyu gösterir. İkinci karışımın kütlesini değiştir ve son yüzdeyi şeker kütlesinden hesapla.",
  alt: "Üç yatay çubuk ilk karışımı, ikinci karışımı ve sonucu aynı ölçekle gösterir. Her çubuğun ilk bölümü şeker, geri kalanı sudur.",
  param: { label: "İkinci karışımın kütlesi", min: 40, max: 160, step: 5, init: 80, unit: " g" },
  draw: (secondMass) => {
    const firstMass = 120;
    const firstSugar = (firstMass * 20) / 100;
    const secondSugar = (secondMass * 40) / 100;
    const sugar = firstSugar + secondSugar;
    const total = firstMass + secondMass;
    const scale = 1 / 34;
    const rows = [
      { label: "İlk karışım", mass: firstMass, sugar: firstSugar },
      { label: "İkinci karışım", mass: secondMass, sugar: secondSugar },
      { label: "Sonuç", mass: total, sugar },
    ];
    const els: El[] = [];
    rows.forEach((row, index) => {
      const y = 4 - index * 1.75;
      els.push(
        txt(v(0, y + 0.65), `${row.label} · ${row.mass} g`, "ne", { tone: "ink", small: true }),
        rect(0, y, row.sugar * scale, 0.47, "a"),
        rect(row.sugar * scale, y, (row.mass - row.sugar) * scale, 0.47, "c"),
        txt(v(0, y - 0.12), `Şeker ${row.sugar} g · Su ${row.mass - row.sugar} g`, "se", { tone: "ink", small: true }),
      );
    });
    return {
      els,
      readout: [
        `Şeker ${firstSugar} + ${secondSugar} = ${sugar} g. Toplam ${firstMass} + ${secondMass} = ${total} g.`,
        `Şeker oranı: ${sugar}/${total} → %${fmt((100 * sugar) / total)}.`,
        "Bu iki farklı yüzdeyi doğrudan ortalamak, yalnız kütleler eşitse doğru sonuç verir.",
      ],
    };
  },
};

export const mathFiguresTyt2: Record<string, Record<string, FigureDef>> = {
  "hiz-problemleri": {
    "Birbirine gelenler aralığı birlikte kapatır": meeting,
    "Aynı yönde yetişme için arkadaki hızlı olmalı": chase,
    "Tren tamamen geçiyorsa iki uzunluğu say": train,
    "Grafik ile çözümü geri denetle": positionTime,
  },
  "isci-problemleri": {
    "Birlikte hızlar toplanır, süreler değil": work,
    "İş payı grafiğinde eğimleri topla": sharedWorkGraph,
  },
  "karisim-problemleri": {
    "Saf su eklemek yalnız toplamı büyütür": dilution,
    "Karışırken şeker ve su kütlesini ayrı topla": weightedMixture,
  },
  "ebob-ekok": { "Eş parça ile ortak buluşmayı ayır": gcd },
};

