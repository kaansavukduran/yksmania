import { ball, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT problem figures (yüzde, kâr–zarar, yaş, ardışık sayılar). Bars and dot
 * grids are drawn to scale inside each figure; every number shown is computed
 * from the slider or step, and the worked values match the guide examples
 * (100 → 120 → 96, 30 + 70 people at %20 / %40, 500 g/200 TL → 400 g/192 TL,
 * cost 100 with a %50 mark-up, two ages with a constant gap, 7 … 31 by 3).
 */

const rect = (x: number, y: number, w: number, h: number, tone: Tone, fill = true): El =>
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], { tone, fill: fill ? tone : undefined });

/* ---------- Yüzde 1: art arda değişim ---------- */
const chain: FigureDef = {
  caption:
    "Sürgüyle yüzdeyi değiştir. 100 önce %a artar, sonra yeni değerden %a azalır. İkinci yüzdenin tabanı büyümüş değer olduğu için düşüş daha büyüktür: sonuç 100 · (1 + a/100) · (1 − a/100), yani 100'den küçük. a = 20 için 100 → 120 → 96.",
  alt: "Üç dikey çubuk: başlangıç 100, artıştan sonra, azalıştan sonra. Kesik çizgi 100 düzeyini gösterir; son çubuk her a için bu çizginin altında kalır.",
  param: { label: "Yüzde a", min: 0, max: 50, step: 5, init: 20, unit: "%" },
  draw: (a) => {
    const k = 0.03;
    const up = 100 * (1 + a / 100);
    const down = up * (1 - a / 100);
    const els: El[] = [seg(v(-0.4, 0), v(7.4, 0), { tone: "ink" })];
    const bars: [number, number, string, Tone][] = [
      [0, 100, "başlangıç", "muted"],
      [2.6, up, `%${a} artış`, "c"],
      [5.2, down, `%${a} azalış`, "warn"],
    ];
    for (const [x, val, name, tone] of bars) {
      els.push(rect(x, 0, 1.6, val * k, tone), txt(v(x + 0.8, val * k), fmt(val, 2), "n", { tone: "ink", small: true, bold: true }), txt(v(x + 0.8, 0), name, "s", { tone: "muted", small: true }));
    }
    els.push(seg(v(-0.4, 100 * k), v(7.4, 100 * k), { tone: "muted", dash: true, thin: true }));
    if (a > 0) els.push(vec(v(4.3, up * k), v(5.1, up * k), { tone: "warn", thin: true }), txt(v(4.5, up * k + 0.15), `−${fmt(up - down, 2)}`, "n", { tone: "warn", small: true }));
    els.push(txt(v(-1, 5.4), " ", "c"), txt(v(8.2, -0.9), " ", "c"));
    return {
      els,
      readout: [
        `100 · ${fmt(1 + a / 100, 2)} · ${fmt(1 - a / 100, 2)} = ${fmt(down, 2)} → net %${fmt(100 - down, 2)} azalış`,
        "Yüzdeleri toplamak (+a − a = 0) yanlış tabanı kullanır; çarpanları çarp. Geri dönmek için kalan çarpana böl: 96 ÷ 0,96 = 100.",
      ],
    };
  },
};

/* ---------- Yüzde 2: grupları adetle birleştir ---------- */
const groups: FigureDef = {
  caption:
    "İleri ile iki ayrık grubu birleştir. 30 kişinin %20'si 6 kişi, 70 kişinin %40'ı 28 kişidir. Birleşik oran 34 / 100 = %34. Oranların düz ortalaması (%30) yalnız gruplar eşit olsaydı doğru olurdu; büyük grup sonucu kendi oranına doğru çeker.",
  alt: "Noktalardan oluşan iki ızgara: solda 30 noktadan 6'sı, sağda 70 noktadan 28'i renkli. Son adımda 100 noktanın 34'ü renkli ve %34 yazar.",
  steps: ["A grubu", "B grubu", "Birleşik oran"],
  draw: (_v, step) => {
    const els: El[] = [];
    const grid = (x0: number, n: number, hit: number, on: boolean, tone: Tone) => {
      for (let i = 0; i < n; i++) {
        const c = i % 5;
        const r = Math.floor(i / 5);
        els.push(ball(v(x0 + c * 0.42, 5.6 - r * 0.42), 0.14, on ? (i < hit ? tone : "muted") : "muted"));
      }
    };
    grid(0, 30, 6, step === 0 || step === 2, "c");
    grid(3.2, 70, 28, step >= 1, "warn");
    els.push(txt(v(0.84, 2.7), "A: 30 kişi, %20", "s", { tone: step === 1 ? "muted" : "ink", small: true, bold: true }), txt(v(4.04, -0.4), "B: 70 kişi, %40", "s", { tone: step === 0 ? "muted" : "ink", small: true, bold: true }));
    if (step === 2) els.push(txt(v(7.0, 3.0), "6 + 28 = 34", "e", { tone: "ink", small: true, bold: true }), txt(v(7.0, 2.3), "34 / 100 = %34", "e", { tone: "c", small: true, bold: true }));
    els.push(txt(v(-0.6, 6.4), " ", "c"), txt(v(10.6, -1.4), " ", "c"));
    const rows: [string, string][] = [
      ["A: 30 · 0,20 = 6 kişi.", "Önce yüzdeleri adede çevir."],
      ["B: 70 · 0,40 = 28 kişi.", "Gruplar ayrık olmalı: ortak kişi varsa toplam bu şekilde kurulmaz."],
      ["Toplam 34 olumlu, 100 kişi: %34. Sonuç %20 ile %40 arasında, büyük gruba yakın.", "Tuzak: (20 + 40) / 2 = %30."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- Yüzde 3: paket ve birim fiyat ---------- */
const unitPrice: FigureDef = {
  caption:
    "İleri ile paketi ve gram fiyatını karşılaştır. 500 g 200 TL iken 400 g 192 TL olmuş. Paket %4 ucuzladı ama gram fiyatı 0,40'tan 0,48 TL'ye çıktı: %20 artış. Kısa yol: fiyat çarpanı ÷ miktar çarpanı = 0,96 ÷ 0,80 = 1,20.",
  alt: "Solda iki paket: eskisi daha büyük, yenisi daha küçük; üzerlerinde gram ve fiyat. Sağda iki çubuk: eski ve yeni TL/g; yeni çubuk %20 daha yüksek.",
  steps: ["Paketler", "Gram fiyatı"],
  draw: (_v, step) => {
    const els: El[] = [];
    els.push(rect(0, 0, 1.6, 2.5, "b"), rect(2.1, 0, 1.6, 2.0, "c"));
    els.push(txt(v(0.8, 2.5), "500 g · 200 TL", "n", { tone: "ink", small: true, bold: true }), txt(v(2.9, 2.0), "400 g · 192 TL", "n", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(0.8, 0), "eski", "s", { tone: "muted", small: true }), txt(v(2.9, 0), "yeni", "s", { tone: "muted", small: true }));
    if (step === 1) {
      const k = 5;
      els.push(seg(v(5.2, 0), v(9.0, 0), { tone: "ink" }));
      els.push(rect(5.6, 0, 1.2, 0.4 * k, "b"), rect(7.4, 0, 1.2, 0.48 * k, "warn"));
      els.push(txt(v(6.2, 0.4 * k), "0,40 TL/g", "n", { tone: "ink", small: true, bold: true }), txt(v(8.0, 0.48 * k), "0,48 TL/g", "n", { tone: "warn", small: true, bold: true }));
      els.push(txt(v(7.1, 0), "gram fiyatı", "s", { tone: "muted", small: true }));
    }
    els.push(txt(v(-0.6, 3.4), " ", "c"), txt(v(9.6, -0.9), " ", "c"));
    const rows: [string, string][] = [
      ["Paket fiyatı 200 → 192 TL: %4 düştü. Ama gram da 500 → 400 azaldı (%20).", "Paket etiketi ile birim fiyat farklı niceliklerdir."],
      ["Birim fiyat 200/500 = 0,40 → 192/400 = 0,48 TL/g: (0,48 − 0,40)/0,40 = %20 artış.", "Kontrol: kilogramda 400 → 480 TL."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- Yüzde 4: kenar, alan, maliyet ---------- */
const area: FigureDef = {
  caption:
    "Sürgüyle karenin kenarındaki artışı değiştir. İki kenar da aynı çarpanla büyüdüğü için alan çarpanın karesiyle büyür: %20 kenar artışı alanı 1,2² = 1,44 kat yapar. Birim alan maliyeti %25 düşerse toplam maliyet 1,44 · 0,75 = 1,08 kat olur, yani %8 artar.",
  alt: "İç içe iki kare: içte ilk kare, dışta kenarı büyütülmüş kare; fark bölgesi renkli. Kenar uzunlukları ve alan çarpanı yazılı.",
  param: { label: "Kenar artışı", min: 0, max: 50, step: 5, init: 20, unit: "%" },
  draw: (p) => {
    const c = 1 + p / 100;
    const s = 3;
    const els: El[] = [rect(0, 0, s * c, s * c, "c"), rect(0, 0, s, s, "b")];
    els.push(txt(v(s / 2, s / 2), "ilk alan", "c", { tone: "ink", small: true, bold: true }));
    els.push(txt(v((s * c) / 2, s * c), `kenar × ${fmt(c, 2)}`, "n", { tone: "c", small: true, bold: true }), txt(v(s * c, (s * c) / 2), `alan × ${fmt(c * c, 4)}`, "e", { tone: "c", small: true, bold: true }));
    els.push(txt(v(-0.6, 5.2), " ", "c"), txt(v(8.4, -0.4), " ", "c"));
    const total = c * c * 0.75;
    return {
      els,
      readout: [
        `Alan çarpanı ${fmt(c, 2)}² = ${fmt(c * c, 4)} · birim maliyet çarpanı 0,75 → toplam ${fmt(total, 4)} kat (${total >= 1 ? "+" : "−"}%${fmt(Math.abs(total - 1) * 100, 2)})`,
        "Yalnız bir kenar uzasaydı alan çarpanı c olurdu, c² değil. Yüzdeleri toplamak (+20 + 20 − 25) yanlıştır.",
      ],
    };
  },
};

/* ---------- Kâr–zarar: maliyet, etiket, satış ---------- */
const markup: FigureDef = {
  caption:
    "Sürgüyle etiket üzerinden yapılan indirimi değiştir. Maliyet 100 TL, etiket maliyetin %50 fazlası: 150 TL. İndirim etiketin yüzdesidir; kâr ise maliyetin yüzdesi olarak ölçülür. %20 indirimle satış 120 TL, kâr 20 TL, yani maliyete göre %20.",
  alt: "Yatay para doğrusu: maliyet 100, etiket 150 işaretli; sürgüyle satış fiyatı noktası etiketten sola kayar. Maliyet ile satış arası yeşil (kâr) ya da kırmızı (zarar) şerit.",
  param: { label: "İndirim (etiket üzerinden)", min: 0, max: 50, step: 5, init: 20, unit: "%" },
  draw: (d) => {
    const cost = 100;
    const tag = 150;
    const sale = tag * (1 - d / 100);
    const X = (tl: number) => (tl - 60) * 0.07;
    const els: El[] = [seg(v(X(60), 0), v(X(165), 0), { tone: "ink" })];
    for (let t = 60; t <= 160; t += 20) els.push(seg(v(X(t), -0.1), v(X(t), 0.1), { tone: "muted", thin: true }), txt(v(X(t), -0.1), String(t), "s", { tone: "muted", small: true, soft: true }));
    const prof = sale - cost;
    if (Math.abs(prof) > 1e-9) els.push(rect(Math.min(X(cost), X(sale)), 0.15, Math.abs(X(sale) - X(cost)), 0.35, prof > 0 ? "c" : "warn"), txt(v((X(cost) + X(sale)) / 2, 1.3), `${prof > 0 ? "kâr" : "zarar"} ${fmt(Math.abs(prof), 1)}`, "n", { tone: prof > 0 ? "c" : "warn", small: true, bold: true }));
    els.push(ball(v(X(cost), 0), 0.13, "b"), txt(v(X(cost), 0.6), "maliyet 100", "nw", { tone: "b", small: true, bold: true }));
    els.push(ball(v(X(tag), 0), 0.13, "muted"), txt(v(X(tag), 0.6), "etiket 150", "ne", { tone: "ink", small: true, bold: true }));
    els.push(ball(v(X(sale), 0), 0.15, "warn"), txt(v(X(sale), -0.85), `satış ${fmt(sale, 1)}`, "s", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(X(55), 1.8), " ", "c"), txt(v(X(170), -1.8), " ", "c"));
    return {
      els,
      readout: [
        `Satış = 150 · ${fmt(1 - d / 100, 2)} = ${fmt(sale, 1)} TL → ${prof >= 0 ? "kâr" : "zarar"} ${fmt(Math.abs(prof), 1)} TL = maliyetin %${fmt(Math.abs(prof), 1)}'i`,
        d > 100 / 3 ? "Bu indirimle satış maliyetin altına indi. Başabaş indirimi: 150 · (1 − x) = 100 → x = %33⅓." : "Tuzak: %50 zam ve %20 indirim için %30 kâr demek; taban önce maliyet, sonra etikettir.",
      ],
    };
  },
};

/* ---------- Kâr–zarar: başabaş ---------- */
const breakEven: FigureDef = {
  caption:
    "Sürgüyle satış adedini değiştir. Örnekte sabit gider 600 TL, birim maliyet 20 TL, birim satış 35 TL. Her ürün 35 − 20 = 15 TL katkı bırakır; sabit gideri karşılamak için 600 ÷ 15 = 40 ürün gerekir. Gelir doğrusu toplam maliyet doğrusunu 40'ta keser.",
  alt: "Adet–para grafiği: 600'den başlayan toplam maliyet doğrusu ve sıfırdan başlayan gelir doğrusu; 40 adette kesişiyorlar. Sürgüyle hareket eden dikey çizgi kâr ya da zarar aralığını gösterir.",
  param: { label: "Satış adedi", min: 0, max: 80, step: 5, init: 30 },
  draw: (n) => {
    const X = (q: number) => q * 0.09;
    const Y = (tl: number) => tl * 0.0016;
    const els: El[] = [vec(v(0, 0), v(X(86), 0), { tone: "ink" }), vec(v(0, 0), v(0, Y(3000)), { tone: "ink" })];
    els.push(seg(v(0, Y(600)), v(X(80), Y(600 + 20 * 80)), { tone: "warn", bold: true }), seg(v(0, 0), v(X(80), Y(35 * 80)), { tone: "c", bold: true }));
    els.push(txt(v(X(80), Y(2200)), "toplam maliyet", "e", { tone: "warn", small: true, bold: true }), txt(v(X(80), Y(2800)), "gelir", "e", { tone: "c", small: true, bold: true }));
    for (const q of [0, 20, 40, 60, 80]) els.push(txt(v(X(q), 0), String(q), "s", { tone: "muted", small: true, soft: true }));
    els.push(txt(v(0, Y(600)), "600", "w", { tone: "muted", small: true, soft: true }));
    const rev = 35 * n;
    const tot = 600 + 20 * n;
    els.push(seg(v(X(n), 0), v(X(n), Y(Math.max(rev, tot))), { tone: "muted", dash: true, thin: true }));
    if (rev !== tot) els.push(seg(v(X(n), Y(rev)), v(X(n), Y(tot)), { tone: rev > tot ? "c" : "warn", bold: true }));
    els.push(ball(v(X(40), Y(1400)), 0.1, "ink"), txt(v(X(40), Y(1400)), "başabaş 40", "nw", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(X(86), 0), "adet", "se", { tone: "ink", small: true }), txt(v(0, Y(3000)), "TL", "n", { tone: "ink", small: true }));
    els.push(txt(v(-1.2, Y(3000) + 0.6), " ", "c"), txt(v(X(86) + 2.6, -0.8), " ", "c"));
    return {
      els,
      readout: [
        `${n} adet: gelir ${rev} TL, toplam maliyet ${tot} TL → ${rev >= tot ? "kâr" : "zarar"} ${Math.abs(rev - tot)} TL`,
        "Kâr = katkı · adet − sabit gider = 15n − 600. Başabaşta 15n = 600.",
      ],
    };
  },
};

/* ---------- Yaş: fark sabit, oran değişir ---------- */
const ages: FigureDef = {
  caption:
    "Sürgüyle zamanı ileri ya da geri al. Bugün anne 30, çocuk 6 yaşında. Herkes aynı süre yaşlandığı için yaş farkı hep 24 kalır; oran ise değişir: bugün 5 kat, 6 yıl sonra 36 / 12 = 3 kat. Oranı, verildiği andaki yaşlarla kur.",
  alt: "İki yaş çubuğu veya iki paralel yaş doğrusu. Zaman sürgüsü iki yaşı birlikte değiştirir. Aynı zamandaki fark sabit kalır.",
  param: { label: "Yıl (bugün = 0)", min: -6, max: 18, step: 1, init: 0 },
  steps: ["Anne ve çocuk", "Deniz ile Işıl’ın yaş grafiği"],
  draw: (t, step) => {
    if (step === 1) {
      const scale = 0.29;
      const x = (year: number) => (year + 6) * 0.65;
      const point = (year: number, age: number) => v(x(year), age * scale);
      const oldAge = 30 + t;
      const youngAge = 16 + t;
      const start = -6;
      const end = 18;
      const els: El[] = [
        vec(v(0, 0), v(16.6, 0), { tone: "muted" }),
        vec(v(0, 0), v(0, 15.4), { tone: "muted" }),
        txt(v(16, -1.25), "Yıl", "s", { small: true }),
        txt(v(0, 15.4), "Yaş", "n", { small: true }),
      ];
      for (const year of [-6, 0, 6, 12, 18]) {
        els.push(txt(v(x(year), -0.15), String(year), "s", { small: true }));
      }
      for (const age of [10, 20, 30, 40, 50]) {
        els.push(seg(point(start, age), point(end, age), { tone: "muted", thin: true, dash: true }));
        els.push(txt(point(start, age), String(age), "w", { small: true }));
      }
      els.push(
        seg(point(start, 30 + start), point(end, 30 + end), { tone: "b", bold: true }),
        seg(point(start, 16 + start), point(end, 16 + end), { tone: "c", bold: true }),
        seg(point(t, 0), point(t, youngAge), { tone: "muted", thin: true, dash: true }),
        seg(point(t, youngAge), point(t, oldAge), { tone: "warn", bold: true }),
        ball(point(t, oldAge), 0.13, "b"),
        ball(point(t, youngAge), 0.13, "c"),
      );
      return {
        els,
        legend: [
          { code: "D", label: "Deniz", tone: "b" },
          { code: "I", label: "Işıl", tone: "c" },
        ],
        readout: [
          `${t === 0 ? "Bugün" : t > 0 ? `${t} yıl sonra` : `${-t} yıl önce`}: Deniz ${oldAge}, Işıl ${youngAge} yaşında.`,
          `${oldAge} − ${youngAge} = ${oldAge - youngAge} yıl fark. Yaş oranı ${oldAge}/${youngAge}.`,
        ],
      };
    }
    const mom = 30 + t;
    const kid = 6 + t;
    const k = 0.15;
    const els: El[] = [rect(0, 1.4, mom * k, 0.6, "b"), rect(0, 0, Math.max(kid, 0) * k, 0.6, "c")];
    els.push(rect(Math.max(kid, 0) * k, 0.65, 24 * k, 0.12, "warn"), txt(v((kid + 12) * k, 0.77), "fark 24", "n", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(-0.2, 1.7), "anne", "w", { tone: "b", small: true, bold: true }), txt(v(-0.2, 0.3), "çocuk", "w", { tone: "c", small: true, bold: true }));
    els.push(txt(v(mom * k + 0.15, 1.7), String(mom), "e", { tone: "ink", small: true, bold: true }), txt(v(Math.max(kid, 0) * k + 0.15, 0.3), String(kid), "e", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(-1.6, 2.6), " ", "c"), txt(v(8.4, -0.4), " ", "c"));
    const ratio = kid > 0 ? mom / kid : NaN;
    return {
      els,
      readout: [
        kid > 0 ? `${t === 0 ? "Bugün" : t > 0 ? `${t} yıl sonra` : `${-t} yıl önce`}: ${mom} ve ${kid} · fark 24 · oran ${fmt(ratio, 2)}` : "Çocuk henüz doğmamış ya da yeni doğmuş: oran tanımsız.",
        "Toplam yaş t yılda 2t artar (iki kişi); fark hiç değişmez. 6 yıl sonra oran 3 olur: 30 + t = 3(6 + t) → t = 6.",
      ],
    };
  },
};

/* ---------- Ardışık: uçlar dahil terim sayısı ---------- */
const count: FigureDef = {
  caption:
    "İleri ile 7'den 31'e 3'er artan sayıları say. Uçlar arasındaki fark 24, adım 3: 24 ÷ 3 = 8 aralık vardır. Terim sayısı aralıktan bir fazladır: 8 + 1 = 9 (çit direği ilkesi). Toplam = terim sayısı · (ilk + son) ÷ 2 = 9 · 38 ÷ 2 = 171.",
  alt: "Sayı doğrusu üzerinde 7, 10, 13 … 31 noktaları; aralarında 3'lük yaylar. Adımlara göre aralıklar ve noktalar ayrı sayılır, son adımda ilk ile son, ikinci ile sondan ikinci eşleştirilir.",
  steps: ["Aralıkları say", "Terimleri say", "Uçları eşleştir"],
  draw: (_v, step) => {
    const terms = Array.from({ length: 9 }, (_, i) => 7 + 3 * i);
    const X = (n: number) => (n - 7) * 0.3;
    const els: El[] = [seg(v(X(5), 0), v(X(33), 0), { tone: "ink" })];
    terms.forEach((n, i) => {
      els.push(ball(v(X(n), 0), 0.13, step === 1 ? "c" : "b"), txt(v(X(n), -0.1), String(n), "s", { tone: "ink", small: true }));
      if (i < 8 && step === 0) {
        const ps = Array.from({ length: 9 }, (_, j) => v(X(n) + (j / 8) * 0.9, 0.18 + 0.32 * Math.sin((Math.PI * j) / 8)));
        els.push(poly(ps, { tone: "warn", open: true, smooth: true }));
      }
      if (step === 1) els.push(txt(v(X(n), 0.25), String(i + 1), "n", { tone: "c", small: true, bold: true }));
    });
    if (step === 2)
      for (let i = 0; i < 4; i++) {
        const a = X(terms[i]);
        const b = X(terms[8 - i]);
        const h = 0.6 + i * 0.75;
        els.push(poly([v(a, 0.2), v(a, h), v(b, h), v(b, 0.2)], { tone: "c", open: true, thin: true }), txt(v((a + b) / 2, h), "38", "n", { tone: "c", small: true, bold: true }));
      }
    els.push(txt(v(X(5), 3.9), " ", "c"), txt(v(X(33), -0.9), " ", "c"));
    const rows: [string, string][] = [
      ["(31 − 7) ÷ 3 = 8 aralık.", "Aralık sayısını terim sayısı sanmak en sık hatadır."],
      ["Terim sayısı = (son − ilk) ÷ adım + 1 = 9.", "Kontrol: 7 + 3 · (9 − 1) = 31."],
      ["Uçlardan eşit uzaklıktaki çiftlerin toplamı hep 38. Toplam = 9 · 38 ÷ 2 = 171; ortanca terim 19.", "Tek terim sayısında ortalama bir terimdir (19); çiftte iki terimin ortasıdır."],
    ];
    return { els, readout: rows[step] };
  },
};

export const mathFiguresTyt3: Record<string, Record<string, FigureDef>> = {
  "yuzde-problemleri": {
    "Art arda yüzdelerde her aşama yeni taban alır": chain,
    "Farklı grupları adetlerle birleştir": groups,
    "Paket fiyatıyla birim fiyat aynı değişken değildir": unitPrice,
    "Alan ve toplam maliyette çarpanları birlikte taşı": area,
  },
  "kar-zarar-problemleri": {
    "İndirim etiket üzerinde yapılır": markup,
    "Sabit gider ve birim katkı başabaşı belirler": breakEven,
  },
  "yas-problemleri": {
    "Aynı anda herkes aynı süre yaşlanır": ages,
  },
  "ardisik-sayilar": {
    "Uçlar dahilken kaç terim var?": count,
  },
};
