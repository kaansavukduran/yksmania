import { circle, poly, pt, seg, span, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Biology figures: nucleotide parts, strand direction, the double helix,
 * hydrogen-bond counting, the replication fork with Okazaki fragments,
 * origins/bubbles and membrane vs lipid-layer counting. Drawings are
 * schematic (not to scale); numbers in readouts follow the guide text.
 */

const PURINE = new Set(["A", "G"]);
const pairOf: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };
const hBonds = (b: string) => (b === "G" || b === "C" ? 3 : 2);

function rect(x: number, y: number, w: number, h: number, tone: Tone, fill = true, dash = false): El {
  return poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], fill ? { tone, fill: tone } : { tone, dash, thin: true });
}

/** One base pair as a vertical rung between backbones at y=0 and y=2. */
function rung(x: number, top: string, opts: { hb?: boolean; shade?: boolean } = {}): El[] {
  const bottom = pairOf[top];
  const lenTop = PURINE.has(top) ? 1.1 : 0.75;
  const lenBottom = 2 - 0.15 - lenTop;
  const tTone: Tone = PURINE.has(top) ? "a" : "b";
  const bTone: Tone = PURINE.has(bottom) ? "a" : "b";
  const els: El[] = [
    rect(x - 0.22, 2 - lenTop, 0.44, lenTop, opts.shade ? "muted" : tTone),
    rect(x - 0.22, 0, 0.44, lenBottom, opts.shade ? "muted" : bTone),
    txt(v(x, 2 - lenTop / 2), top, "c", { tone: opts.shade ? "muted" : tTone, small: true, bold: true }),
    txt(v(x, lenBottom / 2), bottom, "c", { tone: opts.shade ? "muted" : bTone, small: true, bold: true }),
  ];
  if (opts.hb) {
    const n = hBonds(top);
    const y0 = lenBottom;
    for (let i = 0; i < n; i++) {
      const dx = (i - (n - 1) / 2) * 0.13;
      els.push(seg(v(x + dx, y0), v(x + dx, y0 + 0.15), { tone: "warn", bold: true }));
    }
  }
  return els;
}

const backbone = (x0: number, x1: number, y: number, tone: Tone = "ink"): El => seg(v(x0, y), v(x1, y), { tone, bold: true });

/* --------------- Nükleotit --------------- */
const nucleotide: FigureDef = {
  caption:
    "İleri ile nükleotidi kur: beşgen şeker halkası ve karbon numaraları, 1′ karbona baz (nükleozit), 5′ karbona fosfat (nükleotit), sonra riboz ile deoksiriboz farkı 2′ karbonda.",
  alt: "Beşgen pentoz halkası; köşelerde 1′–4′ karbonlar, halka dışında 5′ karbon. 1′ karbona dikdörtgen baz, 5′ karbona daire fosfat bağlanır; 2′ karbonda RNA'da OH, DNA'da H yazar.",
  steps: ["Şeker halkası", "Baz → nükleozit", "Fosfat → nükleotit", "2′ karbon: riboz mu deoksiriboz mu?", "3′ OH: sonraki fosfat buraya bağlanır"],
  draw: (_v, step) => {
    const O: V = v(0, 1.2);
    const C1: V = v(1.15, 0.35);
    const C2: V = v(0.7, -0.95);
    const C3: V = v(-0.7, -0.95);
    const C4: V = v(-1.15, 0.35);
    const C5: V = v(-2.1, 1.25);
    const els: El[] = [
      poly([O, C1, C2, C3, C4], { tone: "c", fill: "c", bold: true }),
      txt(O, "O", "n", { tone: "c", small: true }),
      txt(C1, "1′", "e", { tone: "c", small: true }),
      txt(C2, "2′", "se", { tone: "c", small: true }),
      txt(C3, "3′", "sw", { tone: "c", small: true }),
      txt(C4, "4′", "w", { tone: "c", small: true }),
      seg(C4, C5, { tone: "c", bold: true }),
      txt(C5, "5′", "n", { tone: "c", small: true }),
      txt(v(0, 0.05), "pentoz", "c", { tone: "c", small: true }),
    ];
    if (step >= 1) {
      els.push(seg(C1, v(2.3, 0.35), { tone: "a", bold: true }), rect(2.3, -0.15, 1.8, 1, "a"), txt(v(3.2, 0.35), "baz", "c", { tone: "a", small: true, bold: true }));
      els.push(txt(v(1.7, 0.6), "glikozit", "n", { tone: "muted", small: true }));
    }
    if (step >= 2) {
      els.push(seg(C5, v(-3.1, 1.25), { tone: "b", bold: true }), circle(v(-3.6, 1.25), 0.5, { tone: "b", fill: "b", bold: true }), txt(v(-3.6, 1.25), "P", "c", { tone: "b", bold: true }));
      els.push(txt(v(-2.6, 1.05), "ester", "s", { tone: "muted", small: true }));
    }
    if (step >= 3) {
      els.push(seg(C2, v(1.7, -1.7), { tone: "warn" }), txt(v(1.8, -1.7), "RNA: OH · DNA: H", "e", { tone: "warn", small: true, bold: true }));
    }
    if (step >= 4) {
      els.push(seg(C3, v(-1.4, -1.7), { tone: "b" }), txt(v(-1.5, -1.7), "3′ OH", "w", { tone: "b", small: true }));
      els.push(vec(v(-1.4, -2.9), v(-1.4, -2.0), { tone: "b", dash: true, thin: true }), txt(v(-1.4, -3), "sonraki nükleotidin fosfatı", "s", { tone: "b", small: true }));
    }
    const readout = [
      ["Pentozun karbonları 1′'den 5′'e numaralanır; 5′ karbon halkanın dışındadır."],
      ["Baz + şeker = nükleozit (fosfat yok)."],
      ["Baz + şeker + fosfat = nükleotit."],
      ["2′ karbonda OH varsa riboz (RNA), H varsa deoksiriboz (DNA): adın “deoksi” kısmı buradan gelir."],
      ["Zincir, bir nükleotidin 3′ OH'si ile sonrakinin 5′ fosfatı arasında fosfodiester bağıyla uzar."],
    ][step];
    return { els, readout };
  },
};

/* --------------- Antiparalel yön --------------- */
const direction: FigureDef = {
  caption: "İleri ile karşı zinciri yaz: önce harfleri eşle, sonra uçların yönünü ters koy, en son karşı zinciri kendi 5′→3′ yönünde oku.",
  alt: "Üstte 5′-ATGC-3′ zinciri sağa okla; altta 3′-TACG-5′ zinciri sola okla; en altta karşı zincirin 5′-GCAT-3′ okunuşu.",
  steps: ["Üst zincir 5′→3′", "Harfleri eşle", "Uçları ters koy: antiparalel", "Karşı zinciri 5′→3′ oku"],
  draw: (_v, step) => {
    const top = ["A", "T", "G", "C"];
    const els: El[] = [backbone(0.4, 4.6, 2)];
    top.forEach((b, i) => els.push(rect(i + 0.75, 1.3, 0.5, 0.7, PURINE.has(b) ? "a" : "b"), txt(v(i + 1, 1.65), b, "c", { tone: PURINE.has(b) ? "a" : "b", bold: true, small: true })));
    els.push(txt(v(0.3, 2), "5′", "w", { tone: "ink", bold: true }), txt(v(4.7, 2), "3′", "e", { tone: "ink", bold: true }), vec(v(1, 2.5), v(4, 2.5), { tone: "ink" }));
    if (step >= 1) {
      els.push(backbone(0.4, 4.6, 0));
      top.forEach((b, i) => {
        const c = pairOf[b];
        els.push(rect(i + 0.75, 0, 0.5, 0.7, PURINE.has(c) ? "a" : "b"), txt(v(i + 1, 0.35), c, "c", { tone: PURINE.has(c) ? "a" : "b", bold: true, small: true }));
        els.push(seg(v(i + 1, 0.75), v(i + 1, 1.25), { tone: "muted", dash: true, thin: true }));
      });
    }
    if (step >= 2) {
      els.push(txt(v(0.3, 0), "3′", "w", { tone: "warn", bold: true }), txt(v(4.7, 0), "5′", "e", { tone: "warn", bold: true }), vec(v(4, -0.5), v(1, -0.5), { tone: "warn" }));
    }
    if (step >= 3) {
      els.push(txt(v(2.5, -1.4), "Karşı zincir kendi yönünde: 5′-GCAT-3′", "c", { tone: "c", bold: true }));
    }
    const readout = [
      ["Üst zincir: 5′-ATGC-3′."],
      ["A↔T, G↔C eşleşir: karşıda T A C G harfleri durur."],
      ["Hemen karşısı 3′-TACG-5′ yazılır; iki zincir antiparaleldir."],
      ["Karşı zinciri 5′'ten başlayarak yazmak için sırayı ters çevir: 5′-GCAT-3′. İki uca aynı yönü yazmak tuzaktır."],
    ][step];
    return { els, readout };
  },
};

/* --------------- Çift sarmal --------------- */
const helixSeq = ["A", "T", "G", "C", "G", "A"];
const helix: FigureDef = {
  caption:
    "İleri ile çift sarmalı oku: omurgalar dışta, bazlar içte; pürin (A, G turuncu, uzun) her zaman pirimidinle (T, C mavi, kısa) karşılaşır, bu yüzden her basamak aynı genişliktedir. Kırmızı çizgiler hidrojen bağlarıdır.",
  alt: "Altı basamaklı DNA merdiveni: üstte ve altta şeker–fosfat omurgası, aralarda uzun pürin ve kısa pirimidin dikdörtgenleri; A–T çiftinde iki, G–C çiftinde üç kırmızı hidrojen bağı çizgisi. Son adımda sarmal biçimi ve 0,34 nm, 3,4 nm, 2 nm ölçüleri.",
  steps: ["Omurga dışta, bazlar içte", "Pürin + pirimidin = sabit genişlik", "A–T 2, G–C 3 hidrojen bağı", "Sarmal: 10 baz çifti bir tur"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step < 3) {
      els.push(backbone(0.3, 6.7, 2.05, "c"), backbone(0.3, 6.7, -0.05, "c"));
      els.push(txt(v(0.2, 2.05), "5′", "w", { tone: "c", small: true }), txt(v(6.8, 2.05), "3′", "e", { tone: "c", small: true }));
      els.push(txt(v(0.2, -0.05), "3′", "w", { tone: "c", small: true }), txt(v(6.8, -0.05), "5′", "e", { tone: "c", small: true }));
      els.push(txt(v(3.5, 2.5), "şeker–fosfat omurgası", "n", { tone: "c", small: true }));
      helixSeq.forEach((b, i) => els.push(...rung(i + 1, b, { hb: step >= 2, shade: step === 0 })));
      if (step >= 1) els.push(...span(v(7.3, -0.05), v(7.3, 2.05), "≈ 2 nm", 1, "muted"));
      const readout = [
        ["Bazlar içe, şeker–fosfat omurgaları dışa dönüktür."],
        ["Her basamakta bir pürin (A, G) bir pirimidinle (T, C) karşılaşır: sarmalın genişliği yaklaşık sabit kalır."],
        ["Bu parçada 4 A–T, 2 G–C çifti: hidrojen bağı = 2·4 + 3·2 = 14."],
      ][step];
      return { els, readout };
    }
    // Helix projection: two sine backbones with rungs, one full turn = 10 bp.
    const turn = 10;
    const N = 200;
    const pts1: V[] = [];
    const pts2: V[] = [];
    for (let i = 0; i <= N; i++) {
      const x = (i / N) * 12;
      const ph = (2 * Math.PI * x) / turn;
      pts1.push(v(x, 1 + Math.sin(ph)));
      pts2.push(v(x, 1 + Math.sin(ph + Math.PI)));
    }
    els.push(poly(pts1, { open: true, tone: "c", bold: true }), poly(pts2, { open: true, tone: "b", bold: true }));
    for (let k = 0; k <= 12; k++) {
      const ph = (2 * Math.PI * k) / turn;
      const y1 = 1 + Math.sin(ph);
      const y2 = 1 + Math.sin(ph + Math.PI);
      els.push(seg(v(k, y1), v(k, y2), { tone: "muted", thin: true }));
    }
    els.push(...span(v(0, -0.6), v(10, -0.6), "1 tur ≈ 3,4 nm = 10 baz çifti", -1, "a"));
    els.push(...span(v(12.7, 0), v(12.7, 2), "≈ 2 nm", 1, "muted"));
    els.push(...span(v(2, 2.5), v(3, 2.5), "0,34 nm", 1, "warn"));
    return {
      els,
      readout: ["Komşu baz çiftleri ≈ 0,34 nm, bir tur ≈ 10 baz çifti ≈ 3,4 nm (okul düzeyi B-DNA modeli).", "10 baz çifti = 20 nükleotit; 10 nükleotit değil."],
    };
  },
};

/* --------------- Hidrojen bağı sayacı --------------- */
const hbond: FigureDef = {
  caption: "Sürgüyle 10 baz çiftlik parçadaki G–C çifti sayısını değiştir; nükleotit sayısı sabit kalırken hidrojen bağı her G–C ile bir artar.",
  alt: "On basamaklı DNA merdiveni; sürgü arttıkça A–T basamakları G–C basamaklarına dönüşür ve kırmızı hidrojen bağı çizgileri ikiden üçe çıkar.",
  param: { label: "G–C çifti", min: 0, max: 10, step: 1, init: 4 },
  draw: (gc) => {
    const g = Math.round(gc);
    const a = 10 - g;
    const seq = Array.from({ length: 10 }, (_, i) => (i < g ? (i % 2 ? "C" : "G") : i % 2 ? "T" : "A"));
    const els: El[] = [backbone(0.3, 10.7, 2.05, "c"), backbone(0.3, 10.7, -0.05, "c")];
    seq.forEach((b, i) => els.push(...rung(i + 1, b, { hb: true })));
    return {
      els,
      readout: [`A–T: ${a}, G–C: ${g} → baz çifti ${a + g}, nükleotit ${2 * (a + g)}`, `Hidrojen bağı = 2·${a} + 3·${g} = ${2 * a + 3 * g}`],
    };
  },
};

/* --------------- Replikasyon çatalı --------------- */
const fork: FigureDef = {
  caption:
    "Oynat ile çatalı ilerlet: yeni zincirler hep 5′→3′ uzar. Çatalla aynı yöne uzayan öncü zincir kesintisizdir; ters yöne uzayan geri zincir kısa Okazaki parçalarıyla (her biri küçük primerle başlar) kurulur.",
  alt: "Sağa ilerleyen replikasyon çatalı: sağda henüz açılmamış çift zincir, solda ayrılmış iki kalıp. Üst kalıp boyunca sağa uzayan kesintisiz öncü zincir; alt kalıp boyunca sola bakan oklarla kısa Okazaki parçaları ve primerleri.",
  param: { label: "Çatalın konumu", min: 2.5, max: 11, step: 0.1, init: 4.5, once: true, playMs: 7000 },
  draw: (xf) => {
    const L = 2;
    const end = 13;
    const els: El[] = [];
    // Templates (old strands) behind the fork, duplex ahead of it.
    els.push(seg(v(0, 2.4), v(xf, 2.4), { tone: "b", bold: true }), seg(v(0, -0.4), v(xf, -0.4), { tone: "b", bold: true }));
    els.push(seg(v(xf, 2.4), v(xf + 0.7, 1.15), { tone: "b", bold: true }), seg(v(xf, -0.4), v(xf + 0.7, 0.85), { tone: "b", bold: true }));
    els.push(seg(v(xf + 0.7, 1.15), v(end, 1.15), { tone: "b", bold: true }), seg(v(xf + 0.7, 0.85), v(end, 0.85), { tone: "b", bold: true }));
    els.push(txt(v(-0.1, 2.4), "3′", "w", { tone: "b", small: true }), txt(v(-0.1, -0.4), "5′", "w", { tone: "b", small: true }));
    els.push(txt(v(end + 0.1, 1.15), "5′", "e", { tone: "b", small: true }), txt(v(end + 0.1, 0.85), "3′", "e", { tone: "b", small: true }));
    els.push(pt(v(xf + 0.35, 1), "helikaz", "n", "warn"));
    // Leading strand: continuous, grows toward the fork.
    const tip = xf - 0.3;
    els.push(vec(v(0.2, 1.9), v(tip, 1.9), { tone: "a", bold: true }));
    els.push(txt(v(0.2, 2.95), "öncü zincir (kesintisiz) →", "e", { tone: "a", small: true }));
    // Lagging strand: Okazaki fragments, each synthesised away from the fork.
    let n = 0;
    for (let j = 0; (j + 1) * L <= tip + 1e-9; j++) {
      const r = (j + 1) * L - 0.08;
      const l = j * L + 0.12;
      els.push(rect(r - 0.35, 0.02, 0.35, 0.16, "warn"));
      els.push(vec(v(r - 0.35, 0.1), v(l, 0.1), { tone: "c", bold: true }));
      n++;
    }
    els.push(txt(v(0.2, -0.95), "← geri zincir (Okazaki parçaları)", "e", { tone: "c", small: true }));
    return {
      els,
      readout: [`Okazaki parçası: ${n} · öncü zincir uzunluğu ≈ ${tip.toFixed(1).replace(".", ",")} birim`, "Parçalar arası kesintileri sonra ligaz birleştirir; sentez yönü iki zincirde de 5′→3′'tür."],
    };
  },
};

/* --------------- Orijin, kabarcık, çatal --------------- */
const origins: FigureDef = {
  caption: "Oynat ile üç orijinden açılan kabarcıkları büyüt: her kabarcığın iki ucunda bir çatal ilerler; kabarcıklar birleşince tek uzun DNA'nın kopyalanması tamamlanır.",
  alt: "Doğrusal DNA üzerinde üç orijin; zaman ilerledikçe her orijinden iki yöne genişleyen kabarcıklar ve uçlarında çatal işaretleri; sonunda kabarcıklar birleşir.",
  param: { label: "Zaman", min: 0, max: 1, step: 0.02, init: 0.35, once: true, playMs: 6000 },
  draw: (t) => {
    const ori = [3, 8, 13];
    const half = 2.5 * t;
    const els: El[] = [];
    const inBubble = (x: number) => ori.some((o) => Math.abs(x - o) < half);
    // Duplex outside bubbles; separated strands inside.
    const xs = Array.from({ length: 161 }, (_, i) => i * 0.1);
    let run: number[] = [];
    const flush = () => {
      if (run.length > 1) els.push(seg(v(run[0], 1), v(run[run.length - 1], 1), { tone: "b", bold: true }));
      run = [];
    };
    for (const x of xs) {
      if (!inBubble(x)) run.push(x);
      else flush();
    }
    flush();
    let forks = 0;
    const merged: [number, number][] = [];
    for (const o of ori) {
      const a = Math.max(0, o - half);
      const b = Math.min(16, o + half);
      const last = merged[merged.length - 1];
      if (last && a <= last[1]) last[1] = b;
      else merged.push([a, b]);
    }
    for (const [a, b] of merged) {
      if (b - a < 0.05) continue;
      const up: V[] = [];
      const dn: V[] = [];
      for (let i = 0; i <= 40; i++) {
        const x = a + ((b - a) * i) / 40;
        const h = 0.55 * Math.sin((Math.PI * (x - a)) / (b - a)) ** 0.6;
        up.push(v(x, 1 + h));
        dn.push(v(x, 1 - h));
      }
      els.push(poly(up, { open: true, tone: "b", bold: true }), poly(dn, { open: true, tone: "b", bold: true }));
      if (a > 0.05) {
        els.push(pt(v(a, 1), undefined, "n", "warn"));
        forks++;
      }
      if (b < 15.95) {
        els.push(pt(v(b, 1), undefined, "n", "warn"));
        forks++;
      }
    }
    ori.forEach((o, i) => els.push(seg(v(o, 0.2), v(o, 0.5), { tone: "a", bold: true }), txt(v(o, 0.15), i === 0 ? "orijin" : "orijin", "s", { tone: "a", small: true })));
    els.push(txt(v(0, 2), "tek uzun DNA molekülü", "e", { tone: "muted", small: true }));
    const done = merged.length === 1 && merged[0][0] <= 0.05 && merged[0][1] >= 15.95;
    return {
      els,
      readout: [
        `Orijin: 3 · ilerleyen çatal: ${forks} · kabarcık: ${merged.filter(([a, b]) => b - a > 0.05).length}`,
        done ? "Kabarcıklar birleşti: aynı DNA'nın bölgeleri iş bölümüyle kopyalandı, sonuçta 2 DNA molekülü var (3 değil, 6 değil)." : "Orijin sayısı molekül sayısını katlamaz; aynı DNA'nın farklı bölgeleri aynı anda kopyalanır.",
      ],
    };
  },
};

/* --------------- Zar ve lipit katmanı --------------- */
function bilayer(y: number, x0 = 0, x1 = 8): El[] {
  const els: El[] = [];
  for (let x = x0 + 0.2; x <= x1 - 0.1; x += 0.4) {
    els.push(circle(v(x, y + 0.55), 0.13, { tone: "a", fill: "a" }), seg(v(x - 0.05, y + 0.42), v(x - 0.05, y + 0.08), { tone: "a", thin: true }), seg(v(x + 0.05, y + 0.42), v(x + 0.05, y + 0.08), { tone: "a", thin: true }));
    els.push(circle(v(x, y - 0.55), 0.13, { tone: "a", fill: "a" }), seg(v(x - 0.05, y - 0.42), v(x - 0.05, y - 0.08), { tone: "a", thin: true }), seg(v(x + 0.05, y - 0.42), v(x + 0.05, y - 0.08), { tone: "a", thin: true }));
  }
  return els;
}
const membranes: FigureDef = {
  caption: "İleri ile üç grubu karşılaştır: bir zar = çift katlı fosfolipit; çift zarlı organelde iki ayrı zar, yani dört lipit katmanı var; zarsız yapılarda hiç yok.",
  alt: "Üstte tek fosfolipit çift katmanı; ikinci adımda aralarında boşluk olan iki çift katman; üçüncü adımda zarsız iki alt birimli ribozom.",
  steps: ["Tek zarlı", "Çift zarlı", "Zarsız"],
  draw: (_v, step) => {
    const els: El[] = [];
    let readout: string[] = [];
    if (step === 0) {
      els.push(...bilayer(1));
      els.push(txt(v(8.3, 1.55), "1. lipit katmanı", "e", { tone: "a", small: true }), txt(v(8.3, 0.45), "2. lipit katmanı", "e", { tone: "a", small: true }));
      els.push(txt(v(4, 2.2), "organel içi", "n", { tone: "muted", small: true }), txt(v(4, -0.2), "sitoplazma", "s", { tone: "muted", small: true }));
      readout = ["Zar sayısı 1 · lipit katmanı 2", "ER, Golgi, lizozom, peroksizom, koful."];
    } else if (step === 1) {
      els.push(...bilayer(3), ...bilayer(0.6));
      els.push(txt(v(8.3, 3), "dış zar", "e", { tone: "a", small: true }), txt(v(8.3, 0.6), "iç zar", "e", { tone: "a", small: true }));
      els.push(txt(v(4, 1.8), "zarlar arası boşluk", "c", { tone: "muted", small: true }));
      readout = ["Zar sayısı 2 · lipit katmanı 4", "Çekirdek, mitokondri, plastitler (kloroplast)."];
    } else {
      els.push(poly([v(0, -1.6), v(8, -1.6), v(8, 3.2), v(0, 3.2)], { tone: "muted", thin: true, dash: true }), txt(v(0.2, 3), "sitoplazma", "se", { tone: "muted", small: true }));
      els.push(circle(v(3.4, 1.6), 1, { tone: "b", fill: "b", bold: true }), circle(v(3.4, 0.2), 0.65, { tone: "b", fill: "b", bold: true }));
      els.push(txt(v(3.4, 1.6), "büyük alt birim", "c", { tone: "b", small: true }), txt(v(3.4, 0.2), "küçük", "c", { tone: "b", small: true }));
      els.push(seg(v(1.2, 0.7), v(5.8, 0.7), { tone: "c", dash: true }), txt(v(5.9, 0.7), "mRNA", "e", { tone: "c", small: true }));
      els.push(txt(v(3.4, -0.8), "zar yok", "s", { tone: "warn", small: true, bold: true }));
      readout = ["Zar sayısı 0 · lipit katmanı 0", "Ribozom, sentrozom, hücre iskeleti. Ribozom prokaryotta da bulunur."];
    }
    return { els, readout };
  },
};

export const biologyFiguresNucleic: Record<string, Record<string, FigureDef>> = {
  "nukleik-asitler-yapi": {
    "Bir nükleotidi üç parçayla kur": nucleotide,
    "Zincirin yönü şekerin karbon numaralarından gelir": direction,
    "Çift sarmalda pürin ile pirimidin karşılaşır": helix,
    "Hidrojen bağlarını baz çifti sayısıyla hesapla": hbond,
  },
  "dna-eslenmesi": {
    "Neden biri kesintisiz, öteki parçalı?": fork,
    "Orijin, kabarcık ve çatal: başlangıçla ilerleyen sınırı ayır": origins,
  },
  "hucre-organelleri": {
    "Zar sayısı ile lipit katmanı sayısını karıştırma": membranes,
  },
};
