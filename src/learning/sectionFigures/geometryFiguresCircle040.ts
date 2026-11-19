import {
  add,
  ang,
  circle,
  dist,
  fmt,
  mid,
  pol,
  pt,
  right,
  seg,
  txt,
  v,
  ticks,
  type El,
  type FigureDef,
  type V,
} from "./figureKit";

/*
 * Çemberde açı, kiriş ve teğet. All points are placed on the circle by angle,
 * so every printed angle is the measured arc (or its half) of the drawing.
 */

const O = v(0, 0);
const R = 3;
const P = (deg: number, r = R): V => pol(r, deg, O);
const base = (): El[] => [circle(O, R, { tone: "ink" }), pt(O, "O", "sw")];

const cember: Record<string, FigureDef> = {
  "Çemberin elemanlarını adlandır": {
    caption:
      "Aynı çemberde yarıçap (OA), çap (BC), kiriş (DE), teğet (T noktasında değen doğru) ve kesen (çemberi iki noktada kesen doğru). Çap en uzun kiriştir.",
    alt: "Merkezi O olan çember; bir yarıçap, merkezden geçen çap, bir kiriş, bir noktada değen teğet ve iki noktadan geçen kesen doğrusu etiketli.",
    draw: () => {
      const A = P(60);
      const B = P(170);
      const C = P(-10);
      const D = P(110);
      const E = P(20);
      const T = P(-90);
      return {
        els: [
          ...base(),
          seg(O, A, { tone: "a", bold: true }),
          txt(mid(O, A), "yarıçap", "nw", { small: true, tone: "a" }),
          seg(B, C, { tone: "b" }),
          txt(mid(B, mid(B, C)), "çap", "s", { small: true, tone: "b" }),
          seg(D, E, { tone: "c" }),
          txt(mid(D, E), "kiriş", "n", { small: true, tone: "c" }),
          seg(add(T, v(-3.2, 0)), add(T, v(3.2, 0)), { tone: "warn" }),
          txt(add(T, v(3.2, 0)), "teğet", "e", { small: true, tone: "warn" }),
          seg(v(-4.2, -1.6), v(4.4, 2.2), { tone: "muted" }),
          txt(v(4.4, 2.2), "kesen", "e", { small: true, tone: "muted" }),
          pt(A, "A", "ne"),
          pt(B, "B", "w"),
          pt(C, "C", "e"),
          pt(T, "T", "s", "warn"),
        ],
      };
    },
  },
  "Merkez açı gördüğü yaya eşittir": {
    caption: "B noktasını kaydır: AOB merkez açısı ile vurgulanan AB yayının derece ölçüsü her zaman aynıdır.",
    alt: "Çemberde merkezden A ve B'ye iki yarıçap, aralarındaki merkez açı ve kalın çizilmiş AB yayı.",
    param: { label: "AOB", min: 20, max: 170, step: 10, init: 80, unit: "°" },
    draw: (a) => {
      const A = P(0);
      const B = P(a);
      const arc = Array.from({ length: 31 }, (_, i) => P((a * i) / 30));
      return {
        els: [
          ...base(),
          { k: "poly", ps: arc, open: true, tone: "a", bold: true },
          seg(O, A, { tone: "b" }),
          seg(O, B, { tone: "b" }),
          ang(O, A, B, `${a}°`, { tone: "b" }),
          pt(A, "A", "e"),
          pt(B, "B", a < 90 ? "ne" : "nw"),
          txt(P(a / 2, R + 0.4), `yay ${a}°`, a / 2 < 90 ? "ne" : "nw", { small: true, tone: "a" }),
        ],
        readout: [`Merkez açı = AB yayı = ${a}°`],
      };
    },
  },
  "Çevre açı yayın yarısıdır": {
    caption:
      "AB yayı 100° (merkez açı 100°). C noktasını büyük yay üzerinde gezdir: ACB çevre açısı her konumda 50°'dir, yani yayın yarısı.",
    alt: "Çemberde sabit A ve B, merkez açı ve sürgüyle büyük yay üzerinde hareket eden C noktasından çizilen çevre açı.",
    param: { label: "C konumu", min: 140, max: 360, step: 20, init: 220, unit: "°" },
    draw: (c) => {
      const A = P(-50);
      const B = P(50);
      const C = P(c);
      return {
        els: [
          ...base(),
          seg(O, A, { tone: "muted", thin: true }),
          seg(O, B, { tone: "muted", thin: true }),
          ang(O, A, B, "100°", { tone: "muted" }),
          seg(C, A, { tone: "a", bold: true }),
          seg(C, B, { tone: "a", bold: true }),
          ang(C, A, B, "50°", { tone: "a" }),
          pt(A, "A", "se"),
          pt(B, "B", "ne"),
          pt(C, "C", c > 260 && c < 300 ? "s" : "w", "a"),
        ],
        readout: ["ACB = 100° / 2 = 50° (C nerede olursa olsun)"],
      };
    },
  },
  "Çapı gören çevre açı dik açıdır": {
    caption: "AB çap. C'yi çember üzerinde gezdir: ACB açısı her zaman 90°'dir; hipotenüs AB, çevrel çemberin çapıdır.",
    alt: "Çemberde yatay çap AB ve çember üzerindeki C noktasından A ve B'ye çizilen kenarlar; C'de dik açı işareti.",
    param: { label: "C konumu", min: 20, max: 160, step: 10, init: 60, unit: "°" },
    draw: (c) => {
      const A = P(180);
      const B = P(0);
      const C = P(c);
      return {
        els: [
          ...base(),
          seg(A, B, { tone: "b", bold: true }),
          seg(C, A, { tone: "a" }),
          seg(C, B, { tone: "a" }),
          right(C, A, B, "a"),
          pt(A, "A", "w"),
          pt(B, "B", "e"),
          pt(C, "C", "n", "a"),
          txt(v(0, -0.5), "çap = 2r", "s", { small: true, tone: "b" }),
        ],
        readout: [`AC = ${fmt(dist(A, C), 2)}, BC = ${fmt(dist(B, C), 2)}; AC² + BC² = ${fmt(dist(A, C) ** 2 + dist(B, C) ** 2, 1)} = AB² = 36`],
      };
    },
  },
  "Teğet yarıçapa diktir": {
    caption:
      "Yarıçap 3; P'nin merkeze uzaklığını değiştir. Teğet noktasında yarıçap teğete diktir, bu yüzden t² + r² = d² olur. İki teğet parçası eşittir (PA = PB).",
    alt: "Çember ve dıştaki P noktasından çizilen iki teğet; teğet noktalarında dik açı işaretleri ve eşitlik çentikleri.",
    param: { label: "OP = d", min: 3.5, max: 7, step: 0.5, init: 5, unit: "" },
    draw: (d) => {
      const Pp = v(d, 0);
      const th = (Math.acos(R / d) * 180) / Math.PI;
      const A = P(th);
      const B = P(-th);
      const t = Math.sqrt(d * d - R * R);
      return {
        els: [
          ...base(),
          seg(O, Pp, { tone: "muted", dash: true }),
          seg(O, A, { tone: "b" }),
          seg(O, B, { tone: "b" }),
          seg(Pp, A, { tone: "a", bold: true }),
          seg(Pp, B, { tone: "a", bold: true }),
          right(A, O, Pp, "b"),
          right(B, O, Pp, "b"),
          ticks(Pp, A, 1, "a"),
          ticks(Pp, B, 1, "a"),
          pt(Pp, "P", "e"),
          pt(A, "A", "n"),
          pt(B, "B", "s"),
        ],
        readout: [`t = √(d² − r²) = √(${fmt(d * d, 2)} − 9) = ${fmt(t, 2)}`, `PA = PB = ${fmt(t, 2)}`],
      };
    },
  },
  "Teğet–kiriş açısı da yayın yarısıdır": {
    caption: "A noktasındaki teğet ile AB kirişi arasındaki açı, aradaki AB yayının yarısıdır. Yayı değiştir.",
    alt: "Çemberin altındaki A noktasında yatay teğet, A'dan B'ye kiriş, teğet ile kiriş arasındaki açı ve kalın AB yayı.",
    param: { label: "AB yayı", min: 40, max: 200, step: 20, init: 100, unit: "°" },
    draw: (arcDeg) => {
      const A = P(-90);
      const B = P(-90 + arcDeg);
      const arc = Array.from({ length: 31 }, (_, i) => P(-90 + (arcDeg * i) / 30));
      return {
        els: [
          ...base(),
          { k: "poly", ps: arc, open: true, tone: "c", bold: true },
          seg(add(A, v(-4, 0)), add(A, v(4, 0)), { tone: "warn" }),
          seg(A, B, { tone: "a", bold: true }),
          ang(A, add(A, v(1, 0)), B, `${arcDeg / 2}°`, { tone: "a" }),
          pt(A, "A", "s"),
          pt(B, "B", "e"),
          txt(P(-90 + arcDeg / 2, R + 0.4), `${arcDeg}°`, "e", { small: true, tone: "c" }),
        ],
        readout: [`Teğet–kiriş açısı = ${arcDeg}° / 2 = ${arcDeg / 2}°`],
      };
    },
  },
  "İç açı ve dış açı yayları birleştirir": {
    caption:
      "Sol: kirişler içeride kesişir; açı iki yayın ortalamasıdır (100° + 40°)/2 = 70°. Sağ: köşe dışarıda; açı farkın yarısıdır (130° − 30°)/2 = 50°.",
    alt: "İki çember: solda içeride kesişen iki kiriş ve yay etiketleri; sağda dıştaki P noktasından çizilen iki kesen ve yay etiketleri.",
    draw: () => {
      const r = 2.2;
      const o1 = v(0, 0);
      const o2 = v(7.5, 0);
      const Q = (o: V, d: number) => pol(r, d, o);
      // Chords AB and CD; arc A→C (through 180°) is 100°, arc B→D is 40°.
      const A1 = Q(o1, 130);
      const C1 = Q(o1, 230);
      const B1 = Q(o1, -10);
      const D1 = Q(o1, 30);
      const cross = (() => {
        const [x1, y1] = A1, [x2, y2] = B1, [x3, y3] = C1, [x4, y4] = D1;
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        return v(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
      })();
      // outer: P on the right, secants through arcs 130° (far) and 30° (near)
      const far1 = Q(o2, 115);
      const far2 = Q(o2, -115);
      const near1 = Q(o2, 15);
      const near2 = Q(o2, -15);
      const meetP = (() => {
        const [x1, y1] = far1, [x2, y2] = near1, [x3, y3] = far2, [x4, y4] = near2;
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        return v(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
      })();
      return {
        els: [
          circle(o1, r, { tone: "ink" }),
          seg(A1, B1, { tone: "a" }),
          seg(C1, D1, { tone: "a" }),
          pt(cross, "", "n", "a"),
          txt(Q(o1, 180), "100°", "w", { small: true, tone: "c" }),
          txt(Q(o1, 10), "40°", "e", { small: true, tone: "c" }),
          txt(v(0, -r - 0.4), "iç açı = (100 + 40)/2 = 70°", "s", { small: true, bold: true }),
          circle(o2, r, { tone: "ink" }),
          seg(far1, meetP, { tone: "b" }),
          seg(far2, meetP, { tone: "b" }),
          pt(meetP, "P", "e", "b"),
          txt(Q(o2, 180), "130°", "w", { small: true, tone: "c" }),
          txt(Q(o2, 0), "30°", "w", { small: true, tone: "c" }),
          txt(v(7.5 + 1.5, -r - 0.4), "dış açı = (130 − 30)/2 = 50°", "s", { small: true, bold: true }),
        ],
      };
    },
  },
  "Merkezden kirişe inen dikme kirişi ortalar": {
    caption: "r = 5 birim; kirişin merkeze uzaklığını değiştir. Dikme kirişi ortalar ve r² = d² + (c/2)² dik üçgeni oluşur. Merkeze yaklaşan kiriş uzar.",
    alt: "Çemberde yatay bir kiriş, merkezden kirişe dik çizgi, kirişin iki yarısında eşitlik çentikleri ve yarıçapla oluşan dik üçgen.",
    param: { label: "d", min: 0, max: 4.5, step: 0.5, init: 3, unit: "" },
    draw: (d) => {
      const r = 5;
      const h = Math.sqrt(r * r - d * d);
      const L = v(-h, -d);
      const Rr = v(h, -d);
      const M = v(0, -d);
      return {
        els: [
          circle(O, r, { tone: "ink" }),
          pt(O, "O", "nw"),
          seg(L, Rr, { tone: "a", bold: true }),
          ...(d > 0 ? [seg(O, M, { tone: "b", dash: true }), right(M, O, Rr, "b")] : []),
          seg(O, Rr, { tone: "c" }),
          ticks(L, M, 1, "a"),
          ticks(M, Rr, 1, "a"),
          pt(M, "H", "s"),
          txt(mid(O, Rr), "r = 5", "ne", { small: true, tone: "c" }),
          ...(d > 0 ? [txt(mid(O, M), `d = ${fmt(d)}`, "w", { small: true, tone: "b" })] : []),
        ],
        readout: [`c/2 = √(25 − ${fmt(d * d, 2)}) = ${fmt(h, 2)} → kiriş = ${fmt(2 * h, 2)}`],
      };
    },
  },
  "Kuvvet bağıntıları: çarpımlar eşittir": {
    caption:
      "Sol: içeride kesişen kirişler, PA·PB = PC·PD (ölçülen parçalar). Sağ: dıştaki P'den teğet ve kesen, PT² = PA·PB; dış parça bütün kesenle çarpılır.",
    alt: "İki çember: solda içeride kesişen iki kiriş ve dört parça uzunluğu; sağda dıştaki P noktasından teğet ve kesen, parça uzunlukları.",
    draw: () => {
      const r = 2.2;
      const o1 = v(0, 0);
      const Q = (o: V, d: number) => pol(r, d, o);
      const A = Q(o1, 150);
      const B = Q(o1, -20);
      const C = Q(o1, 220);
      const D = Q(o1, 40);
      const [x1, y1] = A, [x2, y2] = B, [x3, y3] = C, [x4, y4] = D;
      const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
      const X = v(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
      const o2 = v(6.8, 0);
      const Pp = v(6.8 + 4.4, 0);
      const dd = 4.4;
      const th = (Math.acos(r / dd) * 180) / Math.PI;
      const T = Q(o2, th);
      const near = v(6.8 + r, 0);
      const far = v(6.8 - r, 0);
      const pa = dist(Pp, near);
      const pb = dist(Pp, far);
      return {
        els: [
          circle(o1, r, { tone: "ink" }),
          seg(A, B, { tone: "a" }),
          seg(C, D, { tone: "b" }),
          pt(X, "P", "s"),
          pt(A, "A", "nw"),
          pt(B, "B", "se"),
          pt(C, "C", "sw"),
          pt(D, "D", "ne"),
          txt(v(0, -r - 0.4), `${fmt(dist(X, A), 2)}·${fmt(dist(X, B), 2)} = ${fmt(dist(X, C), 2)}·${fmt(dist(X, D), 2)}`, "s", { small: true }),
          circle(o2, r, { tone: "ink" }),
          seg(Pp, T, { tone: "warn", bold: true }),
          seg(Pp, far, { tone: "b" }),
          right(T, o2, Pp, "muted"),
          pt(Pp, "P", "e"),
          pt(T, "T", "n", "warn"),
          pt(near, "A", "ne"),
          pt(far, "B", "w"),
          txt(v(6.8 + 1.5, -r - 0.4), `PT² = ${fmt(pa, 2)}·${fmt(pb, 2)} = ${fmt(pa * pb, 2)}`, "s", { small: true }),
        ],
        readout: [`İç: ${fmt(dist(X, A) * dist(X, B), 2)} = ${fmt(dist(X, C) * dist(X, D), 2)}`, `Dış: PT = ${fmt(dist(Pp, T), 2)}, PT² = ${fmt(dist(Pp, T) ** 2, 2)}`],
      };
    },
  },
  "Kirişler dörtgeninde karşı açılar 180°": {
    caption: "D noktasını kaydır: ABCD çembere çizili kaldıkça A ve C açılarının toplamı 180°, B ve D açılarının toplamı da 180°'dir.",
    alt: "Çembere çizilmiş dörtgen ABCD; dört köşesinde açı yayları ve ölçüleri.",
    param: { label: "D konumu", min: 200, max: 320, step: 10, init: 260, unit: "°" },
    draw: (dDeg) => {
      const A = P(150);
      const B = P(60);
      const C = P(-20);
      const D = P(dDeg);
      const angAt = (o: V, p: V, q: V) => {
        const a = Math.atan2(p[1] - o[1], p[0] - o[0]);
        const b = Math.atan2(q[1] - o[1], q[0] - o[0]);
        let x = Math.abs(((b - a) * 180) / Math.PI);
        if (x > 180) x = 360 - x;
        return x;
      };
      const a = angAt(A, B, D);
      const c = angAt(C, B, D);
      const b = angAt(B, A, C);
      const d = angAt(D, A, C);
      return {
        els: [
          ...base(),
          { k: "poly", ps: [A, B, C, D], tone: "a", bold: true },
          ang(A, D, B, `${fmt(a)}°`, { tone: "b" }),
          ang(C, B, D, `${fmt(c)}°`, { tone: "b" }),
          ang(B, A, C, `${fmt(b)}°`, { tone: "c" }),
          ang(D, C, A, `${fmt(d)}°`, { tone: "c" }),
          pt(A, "A", "nw"),
          pt(B, "B", "ne"),
          pt(C, "C", "e"),
          pt(D, "D", "s"),
        ],
        readout: [`A + C = ${fmt(a)} + ${fmt(c)} = ${fmt(a + c)}°`, `B + D = ${fmt(b)} + ${fmt(d)} = ${fmt(b + d)}°`],
      };
    },
  },
};

const sector = (o: V, r: number, a0: number, a1: number, tone: "a" | "b" | "c" | "warn" | "muted" = "a"): El => ({
  k: "poly",
  ps: [o, ...Array.from({ length: 41 }, (_, i) => pol(r, a0 + ((a1 - a0) * i) / 40, o))],
  fill: tone,
  tone,
  thin: true,
});

const daire: Record<string, FigureDef> = {
  "Çember bir çizgi, daire bir bölgedir": {
    caption: "Sol: çember yalnız sınır çizgisidir; uzunluğu çevredir (cm). Sağ: daire iç bölgedir; kapladığı yer alandır (cm²).",
    alt: "Solda içi boş, kalın çizgili çember; sağda içi boyalı daire.",
    draw: () => ({
      els: [
        circle(v(0, 0), 2.2, { tone: "a", bold: true }),
        txt(v(0, -2.6), "çember: uzunluk (çevre)", "s", { small: true, bold: true }),
        circle(v(6.5, 0), 2.2, { tone: "b", fill: "b" }),
        txt(v(6.5, -2.6), "daire: bölge (alan)", "s", { small: true, bold: true }),
      ],
    }),
  },
  "π, çevrenin çapa oranıdır": {
    caption: "Yarıçapı değiştir: çember açılınca elde edilen doğru parçası 2πr uzunluğundadır; çapın yaklaşık 3,14 katı. Oran her yarıçapta aynıdır.",
    alt: "Solda çember ve çapı; sağda çemberin açılmasıyla oluşan uzun doğru parçası ve üzerinde çap uzunluğunda üç işaret.",
    param: { label: "r", min: 0.5, max: 1.5, step: 0.25, init: 1, unit: "" },
    draw: (r) => {
      const C = 2 * Math.PI * r;
      return {
        els: [
          circle(v(0, 0), r, { tone: "a", bold: true }),
          seg(v(-r, 0), v(r, 0), { tone: "b" }),
          seg(v(2, -1.6), v(2 + C, -1.6), { tone: "a", bold: true }),
          ...[0, 1, 2, 3].map((k) => seg(v(2 + k * 2 * r, -1.8), v(2 + k * 2 * r, -1.4), { tone: "b" })),
          txt(v(2 + C / 2, -1.6), `çevre = 2π·${fmt(r, 2)} ≈ ${fmt(C, 2)}`, "s", { small: true, tone: "a" }),
          txt(v(0, 0), `çap ${fmt(2 * r, 2)}`, "n", { small: true, tone: "b" }),
        ],
        readout: [`çevre / çap = ${fmt(C, 2)} / ${fmt(2 * r, 2)} = ${fmt(Math.PI, 2)}`],
      };
    },
  },
  "Daire alanını dilimlerden kur": {
    caption: "Dilim sayısını artır: dilimler ters–düz dizilince şekil, tabanı πr ve yüksekliği r olan dikdörtgene yaklaşır; alan πr² olur.",
    alt: "Yan yana sırayla yukarı ve aşağı bakan ince daire dilimleri; dilim sayısı arttıkça dikdörtgene benzeyen şerit.",
    param: { label: "dilim", min: 4, max: 24, step: 2, init: 8, unit: "" },
    draw: (n) => {
      const r = 2;
      const w = (Math.PI * r) / (n / 2);
      const half = 180 / n;
      const els: El[] = [];
      for (let i = 0; i < n; i++) {
        const up = i % 2 === 0;
        const x = (i * w) / 2;
        const o = up ? v(x + w / 2, 0) : v(x + w / 2, r);
        const dir = up ? 90 : -90;
        els.push(sector(o, r, dir - half, dir + half, up ? "b" : "c"));
      }
      return {
        els: [
          ...els,
          txt(v((Math.PI * r) / 2 + w / 4, -0.3), "≈ πr", "s", { small: true, bold: true }),
          txt(v(-0.2, r / 2), "r", "w", { small: true, bold: true }),
        ],
        readout: [`Alan ≈ πr · r = πr² (dilim sayısı ${n})`],
      };
    },
  },
  "Yay uzunluğu açıyla orantılıdır": {
    caption: "r = 6. Merkez açıyı değiştir: yay, çemberin α/360'lık kısmıdır; uzunluğu 2π·6·α/360.",
    alt: "Çemberde merkez açı ve kalın çizilmiş yay; yay uzunluğu etiketi.",
    param: { label: "α", min: 30, max: 330, step: 30, init: 60, unit: "°" },
    draw: (a) => {
      const r = 3;
      const arc = Array.from({ length: 61 }, (_, i) => pol(r, (a * i) / 60, O));
      return {
        els: [
          circle(O, r, { tone: "muted" }),
          { k: "poly", ps: arc, open: true, tone: "a", bold: true },
          seg(O, pol(r, 0, O), { tone: "b" }),
          seg(O, pol(r, a, O), { tone: "b" }),
          ang(O, pol(r, 0, O), pol(r, a, O), `${a}°`, { tone: "b", reflex: a > 180 }),
          pt(O, "O", "sw"),
        ],
        readout: [`ℓ = 2π·6·${a}/360 = ${fmt((12 * a) / 360, 2)}π`],
      };
    },
  },
  "Daire dilimi alanı da aynı oranla bulunur": {
    caption: "r = 6. Açıyı değiştir: dilim alanı πr²·α/360 ve yay·r/2 aynı sonucu verir.",
    alt: "Boyalı daire dilimi ve onu çevreleyen soluk çember.",
    param: { label: "α", min: 30, max: 330, step: 30, init: 120, unit: "°" },
    draw: (a) => ({
      els: [circle(O, 3, { tone: "muted" }), sector(O, 3, 0, a, "a"), pt(O, "O", "sw"), txt(pol(1.5, a / 2, O), `${a}°`, "c", { small: true, bold: true })],
      readout: [`A = 36π·${a}/360 = ${fmt(a / 10, 1)}π`, `yay·r/2 = ${fmt((12 * a) / 360, 2)}π·6/2 = ${fmt(a / 10, 1)}π`],
    }),
  },
  "Halka: büyükten küçüğü çıkar": {
    caption: "R = 5, iç yarıçapı değiştir: halka alanı π(R² − r²). Küçük çembere teğet kirişin yarısı t için t² = R² − r²; halka alanı πt².",
    alt: "İç içe iki çember, arası boyalı halka; küçük çembere teğet olan büyük çember kirişi ve yarısı.",
    param: { label: "r", min: 1, max: 4.5, step: 0.5, init: 3, unit: "" },
    draw: (r) => {
      const R = 5;
      const t = Math.sqrt(R * R - r * r);
      return {
        els: [
          circle(O, R, { tone: "b", fill: "b" }),
          circle(O, r, { tone: "ink", fill: "muted" }),
          seg(v(-t, -r), v(t, -r), { tone: "a", bold: true }),
          seg(O, v(0, -r), { tone: "muted", dash: true }),
          seg(O, v(t, -r), { tone: "c" }),
          right(v(0, -r), O, v(t, -r), "muted"),
          txt(v(t / 2, -r), `t = ${fmt(t, 2)}`, "s", { small: true, tone: "a" }),
          pt(O, "O", "nw"),
        ],
        readout: [`Halka = π(25 − ${fmt(r * r, 2)}) = ${fmt(25 - r * r, 2)}π = πt²`],
      };
    },
  },
  "Daire parçası: dilimden üçgeni çıkar": {
    caption: "r = 6. Açıyı değiştir: kiriş ile yay arasındaki parça = dilim − üçgen (üçgen alanı ½·r²·sin α).",
    alt: "Çemberde dilim, dilimin içindeki üçgen ve kiriş ile yay arasında kalan boyalı daire parçası.",
    param: { label: "α", min: 60, max: 150, step: 30, init: 90, unit: "°" },
    draw: (a) => {
      const r = 3;
      const A = pol(r, 0, O);
      const B = pol(r, a, O);
      const seg040: V[] = Array.from({ length: 41 }, (_, i) => pol(r, (a * i) / 40, O));
      const tri = 0.5 * 36 * Math.sin((a * Math.PI) / 180);
      return {
        els: [
          circle(O, r, { tone: "muted" }),
          { k: "poly", ps: [O, A, B], fill: "muted", tone: "b", thin: true },
          { k: "poly", ps: seg040, fill: "a", tone: "a", thin: true },
          ang(O, A, B, `${a}°`, { tone: "b" }),
          pt(O, "O", "sw"),
          pt(A, "A", "e"),
          pt(B, "B", "n"),
        ],
        readout: [`Parça = ${fmt(a / 10, 1)}π − ${fmt(tri, 2)}`],
      };
    },
  },
  "Yarıçap k katına çıkınca": {
    caption: "k'yı değiştir: yarıçap k katına çıkınca çevre k, alan k² katına çıkar. Küçük daire içine kaç tane sığdığı alan oranını gösterir.",
    alt: "Küçük ve büyük daire yan yana; büyük dairenin yarıçapı küçüğün k katı.",
    param: { label: "k", min: 1, max: 3, step: 0.5, init: 2, unit: "" },
    draw: (k) => ({
      els: [
        circle(v(0, 0), 1, { tone: "a", fill: "a" }),
        circle(v(2 + k * 1.2, 0), k, { tone: "b", fill: "b" }),
        txt(v(0, -1.3), "r", "s", { small: true }),
        txt(v(2 + k * 1.2, -k - 0.3), `${fmt(k)}r`, "s", { small: true }),
      ],
      readout: [`Çevre oranı ${fmt(k)}, alan oranı ${fmt(k * k, 2)}`],
    }),
  },
  "Boyalı alan sorusunu ekle–çıkar ile çöz": {
    caption: "Kenarı 4 olan karede, merkezi A olan r = 4 çeyrek daire. Boyalı bölge = kare − çeyrek daire = 16 − 4π ≈ 3,43.",
    alt: "Kare, sol alt köşe merkezli çeyrek daire ve karenin sağ üst köşesinde kalan boyalı bölge.",
    draw: () => {
      const s = 4;
      const arc = Array.from({ length: 41 }, (_, i) => pol(s, (90 * i) / 40, v(0, 0)));
      return {
        els: [
          { k: "poly", ps: [v(s, 0), v(s, s), v(0, s), ...[...arc].reverse()], fill: "warn", tone: "warn", thin: true },
          { k: "poly", ps: [v(0, 0), v(s, 0), v(s, s), v(0, s)], tone: "ink" },
          { k: "poly", ps: arc, open: true, tone: "a", bold: true },
          pt(v(0, 0), "A", "sw"),
          pt(v(s, 0), "B", "se"),
          pt(v(s, s), "C", "ne"),
          pt(v(0, s), "D", "nw"),
          txt(v(3.55, 3.55), "?", "c", { bold: true }),
        ],
        readout: ["16 − π·16/4 = 16 − 4π"],
      };
    },
  },
};

export const geometryFiguresCircle040: Record<string, Record<string, FigureDef>> = {
  "tyt-geo-cember-aci-040": cember,
  "tyt-geo-daire-040": daire,
};
