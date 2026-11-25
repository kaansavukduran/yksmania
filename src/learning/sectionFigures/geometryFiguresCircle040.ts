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
    // The major arc runs from 50° to 310°; C must stay on it.
    param: { label: "C konumu", min: 70, max: 290, step: 20, init: 210, unit: "°" },
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
          pt(C, "C", c < 130 ? "n" : c > 230 ? "s" : "w", "a"),
        ],
        readout: ["ACB = 100° / 2 = 50° (C büyük yayın neresinde olursa olsun)"],
      };
    },
  },
  "Kirişin iki tarafında görülen yay değişir": {
    caption: "Küçük AB yayı 100°. Köşenin hangi yayda olduğunu değiştir. Açı, köşenin üzerinde bulunmadığı yayın yarısıdır.",
    alt: "A ve B’yi birleştiren kiriş kesikli. Çevre açının köşesi seçilen yay boyunca hareket eder. Köşenin karşısındaki yay kalın çizilir.",
    steps: ["C büyük yayda", "D küçük yayda"],
    param: { label: "Köşenin yay üzerindeki yeri", min: 0, max: 100, step: 5, init: 50, unit: "%" },
    draw: (position, step) => {
      const arcStart = 40;
      const smallArc = 100;
      const arcEnd = arcStart + smallArc;
      const smallSide = step === 1;
      const seenStart = smallSide ? arcEnd : arcStart;
      const seenDegrees = smallSide ? 360 - smallArc : smallArc;
      const vertexStart = smallSide ? arcStart : arcEnd;
      const vertexDegrees = 360 - seenDegrees;
      const location = vertexStart + vertexDegrees * (0.18 + position * 0.0064);
      const A = P(arcStart);
      const B = P(arcEnd);
      const X = P(location);
      const name = smallSide ? "D" : "C";
      return {
        els: [
          circle(O, R, { tone: "ink" }),
          { k: "poly", ps: Array.from({ length: 49 }, (_, i) => P(seenStart + (seenDegrees * i) / 48)), open: true, tone: "b", bold: true },
          seg(A, B, { tone: "muted", dash: true }),
          seg(X, A, { tone: "a", bold: true }),
          seg(X, B, { tone: "a", bold: true }),
          ang(X, A, B, `${seenDegrees / 2}°`, { tone: "a" }),
          pt(A, "A", "e"),
          pt(B, "B", "w"),
          pt(X, name, smallSide ? "n" : "s", "a"),
        ],
        readout: [
          `Görülen ${smallSide ? "büyük" : "küçük"} AB yayı ${seenDegrees}°. A${name}B = ${seenDegrees}° / 2 = ${seenDegrees / 2}°.`,
          "Kirişin karşı tarafındaki çevre açıyla toplam 180° olur.",
        ],
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
      const o2 = v(8.6, 0);
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
          txt(v(8.6 + 1.2, -r - 0.4), "dış açı = (130 − 30)/2 = 50°", "s", { small: true, bold: true }),
        ],
      };
    },
  },
  "Kiriş ve teğette hipotenüsü ayır": {
    caption: "Yarıçapı değiştir. Kiriş için merkezden inen dikme, teğet için değme noktasındaki diklik bir dik üçgen kurar.",
    alt: "İlk adımda kirişin orta noktasına merkezden dikme iniyor. İkinci adımda değme noktasında yarıçap ve teğet dik açı oluşturuyor.",
    steps: ["Yarım kiriş", "Dış noktadan teğet"],
    param: { label: "Yarıçap", min: 9, max: 15, step: 1, init: 13 },
    draw: (r, step) => {
      const scale = 0.25;
      const chordDistance = 5;
      const externalDistance = 17;
      const chordSquared = r ** 2 - chordDistance ** 2;
      const tangentSquared = externalDistance ** 2 - r ** 2;
      const els: El[] = [circle(O, r * scale, { tone: "ink" }), pt(O, "O", "sw")];
      if (step === 0) {
        const half = Math.sqrt(chordSquared);
        const M = v(0, chordDistance * scale);
        const A = v(-half * scale, chordDistance * scale);
        const B = v(half * scale, chordDistance * scale);
        els.push(
          seg(A, B, { tone: "a", bold: true }),
          seg(O, A, { tone: "b" }),
          seg(O, M, { tone: "muted", dash: true }),
          right(M, O, A, "ink"),
          pt(A, "A", "nw"),
          pt(B, "B", "ne"),
          pt(M, "M", "n"),
          txt(mid(O, M), String(chordDistance), "e", { tone: "ink", small: true }),
          txt(mid(O, A), String(r), "s", { tone: "b", small: true }),
        );
        return {
          els,
          readout: [
            `Yarım kiriş = √(${r}²−${chordDistance}²) = √${chordSquared} ${Number.isInteger(half) ? "=" : "≈"} ${fmt(half, 2)} birim.`,
            `Tam kiriş ${fmt(2 * half, 2)} birim. Bu dik üçgende hipotenüs yarıçap.`,
          ],
        };
      }
      const tangent = Math.sqrt(tangentSquared);
      const touchX = r ** 2 / externalDistance;
      const T = v(touchX * scale, Math.sqrt(r ** 2 - touchX ** 2) * scale);
      const P = v(externalDistance * scale, 0);
      els.push(
        seg(O, P, { tone: "ink" }),
        seg(O, T, { tone: "b" }),
        seg(T, P, { tone: "a", bold: true }),
        right(T, O, P, "ink"),
        pt(T, "T", "n"),
        pt(P, "P", "se"),
        txt(mid(O, P), String(externalDistance), "s", { tone: "ink", small: true }),
        txt(mid(O, T), String(r), "nw", { tone: "b", small: true }),
      );
      return {
        els,
        readout: [
          `Teğet PT = √(${externalDistance}²−${r}²) = √${tangentSquared} ${Number.isInteger(tangent) ? "=" : "≈"} ${fmt(tangent, 2)} birim.`,
          "Bu dik üçgende hipotenüs O ile P arasındaki uzaklık.",
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
    param: { label: "D konumu", min: 200, max: 300, step: 10, init: 260, unit: "°" },
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
          pt(O, "O", a > 180 ? "s" : "sw"),
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
      els: [circle(O, 3, { tone: "muted" }), sector(O, 3, 0, a, "a"), pt(O, "O", "sw"), txt(pol(1.95, a / 2, O), `${a}°`, "c", { small: true, bold: true })],
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
      const radius = 6;
      const r = radius / 2;
      const A = pol(r, 0, O);
      const B = pol(r, a, O);
      const seg040: V[] = Array.from({ length: 41 }, (_, i) => pol(r, (a * i) / 40, O));
      const triangle = (radius ** 2 * Math.sin((a * Math.PI) / 180)) / 2;
      const sectorCoefficient = (radius ** 2 * a) / 360;
      const piece = sectorCoefficient * Math.PI - triangle;
      const exactTriangle = a === 60 || a === 120 ? "9√3" : fmt(triangle, 2);
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
        readout: [
          `Dilim ${fmt(sectorCoefficient, 1)}π birim². Üçgen ${exactTriangle} birim².`,
          `Parça = ${fmt(sectorCoefficient, 1)}π − ${exactTriangle} ≈ ${fmt(piece, 2)} birim².`,
        ],
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

/** Ellipse for an oblique view of a circle (horizontal radius r, vertical squash q). */
const ell = (c: V, r: number, q = 0.32, from = 0, to = 360, n = 48): V[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = ((from + ((to - from) * i) / n) * Math.PI) / 180;
    return v(c[0] + r * Math.cos(t), c[1] + r * q * Math.sin(t));
  });
const openPoly = (ps: V[], tone: "a" | "b" | "c" | "ink" | "muted" | "warn" = "ink", dash = false): El => ({ k: "poly", ps, open: true, tone, dash, bold: !dash });
/** Cylinder of radius r, height h with its base centre at b. */
function cylinder(b: V, r: number, h: number, tone: "a" | "b" | "c" | "ink" = "ink"): El[] {
  const top = add(b, v(0, h));
  return [
    openPoly(ell(b, r, 0.32, 180, 360), tone),
    openPoly(ell(b, r, 0.32, 0, 180), tone, true),
    openPoly(ell(top, r, 0.32), tone),
    seg(add(b, v(-r, 0)), add(top, v(-r, 0)), { tone }),
    seg(add(b, v(r, 0)), add(top, v(r, 0)), { tone }),
  ];
}
function cone(b: V, r: number, h: number, tone: "a" | "b" | "c" | "ink" = "ink"): El[] {
  const apex = add(b, v(0, h));
  return [
    openPoly(ell(b, r, 0.32, 180, 360), tone),
    openPoly(ell(b, r, 0.32, 0, 180), tone, true),
    seg(add(b, v(-r, 0)), apex, { tone }),
    seg(add(b, v(r, 0)), apex, { tone }),
  ];
}
function sphere(c: V, r: number, tone: "a" | "b" | "c" | "ink" = "ink"): El[] {
  return [circle(c, r, { tone }), openPoly(ell(c, r, 0.3, 180, 360), tone), openPoly(ell(c, r, 0.3, 0, 180), tone, true)];
}

const kati: Record<string, FigureDef> = {
  "Silindir: daire tabanlı dik prizma gibi": {
    caption: "r = 3. Yüksekliği değiştir: hacim taban alanı (9π) çarpı yüksekliktir. Arka taraftaki taban yayı kesikli çizilir.",
    alt: "Eğik görünümde dik silindir; taban yarıçapı ve yükseklik ölçüleri.",
    param: { label: "h", min: 2, max: 8, step: 1, init: 5, unit: "" },
    draw: (h) => {
      const sc = 0.6;
      const b = v(0, 0);
      return {
        els: [
          ...cylinder(b, 3 * sc, h * sc, "a"),
          seg(b, v(3 * sc, 0), { tone: "b" }),
          txt(v(1.5 * sc, 0), "r = 3", "s", { small: true, tone: "b" }),
          seg(v(3 * sc + 0.4, 0), v(3 * sc + 0.4, h * sc), { tone: "c" }),
          txt(v(3 * sc + 0.4, (h * sc) / 2), `h = ${h}`, "e", { small: true, tone: "c" }),
        ],
        readout: [`V = π·3²·${h} = ${9 * h}π`],
      };
    },
  },
  "Silindirin açınımı bir dikdörtgen ve iki dairedir": {
    caption: "h = 4. Yarıçapı değiştir: yan yüz açılınca eni 2πr, boyu h olan dikdörtgen olur; iki taban daire eklenir.",
    alt: "Ortada uzun dikdörtgen, üstünde ve altında birer daire: silindirin açınımı.",
    param: { label: "r", min: 0.5, max: 1.5, step: 0.25, init: 1, unit: "" },
    draw: (r) => {
      const w = 2 * Math.PI * r;
      const h = 4 * 0.5;
      return {
        els: [
          { k: "poly", ps: [v(0, 0), v(w, 0), v(w, h), v(0, h)], fill: "b", tone: "b", thin: true },
          circle(v(w / 2, h + r), r, { tone: "a", fill: "a" }),
          circle(v(w / 2, -r), r, { tone: "a", fill: "a" }),
          txt(v(w / 2, h / 2), `2πr = ${fmt(2 * r, 2)}π`, "c", { small: true, bold: true }),
          txt(v(w, h / 2), "h = 4", "e", { small: true }),
        ],
        readout: [`Yanal ${fmt(8 * r, 2)}π + iki taban ${fmt(2 * r * r, 2)}π = ${fmt(8 * r + 2 * r * r, 2)}π`],
      };
    },
  },
  "Koni: hacim silindirin üçte biri": {
    caption: "Aynı taban ve yükseklikte silindir ile koni. Adım adım: üç koni dolusu su silindiri tam doldurur.",
    alt: "Silindir ve içinde aynı taban ve yükseklikte koni; silindirde üç eşit su seviyesi çizgisi.",
    steps: ["Silindir ve koni", "1 koni dolusu", "2 koni dolusu", "3 koni dolusu: dolu"],
    draw: (_, step) => {
      const r = 1.8;
      const h = 3.6;
      const fillH = (h * step) / 3;
      return {
        els: [
          ...(step > 0 ? [{ k: "poly" as const, ps: [v(-r, 0), v(r, 0), v(r, fillH), v(-r, fillH)], fill: "b" as const, tone: "b" as const, thin: true }] : []),
          ...cylinder(v(0, 0), r, h, "ink"),
          ...cone(v(4.5, 0), r, h, "a"),
        ],
        readout: [`Su: ${step}/3 · πr²h`],
      };
    },
  },
  "Ana doğru, yanal alan ve açınım açısı": {
    caption: "r = 3. Yüksekliği değiştir: ℓ² = r² + h²; yan yüz açılınca yarıçapı ℓ olan dilim olur ve açısı 360°·r/ℓ.",
    alt: "Solda koni ve içindeki yükseklik–yarıçap–ana doğru dik üçgeni; sağda açınımdaki daire dilimi.",
    param: { label: "h", min: 2, max: 8, step: 1, init: 4, unit: "" },
    draw: (h) => {
      const sc = 0.9;
      const r = 3;
      const l = Math.sqrt(r * r + h * h);
      const a = (360 * r) / l;
      const c = v(7.5, 2);
      return {
        els: [
          ...cone(v(0, 0), r * sc, h * sc, "ink"),
          seg(v(0, 0), v(0, h * sc), { tone: "c", dash: true }),
          seg(v(0, 0), v(r * sc, 0), { tone: "b" }),
          right(v(0, 0), v(0, 1), v(1, 0), "muted"),
          txt(v(0.12, (h * sc) * 0.62), `h = ${h}`, "e", { small: true, tone: "c" }),
          txt(v((r * sc) / 2, 0.05), "r = 3", "n", { small: true, tone: "b" }),
          txt(v((r * sc) / 2 + 0.3, (h * sc) / 2), `ℓ = ${fmt(l, 2)}`, "e", { small: true, tone: "a" }),
          { k: "poly", ps: [c, ...Array.from({ length: 49 }, (_, i) => pol(l * 0.22, 90 - a / 2 + (a * i) / 48, c))], fill: "a", tone: "a", thin: true },
          txt(c, `${fmt(a)}°`, "s", { small: true, bold: true }),
        ],
        readout: [`ℓ = √(9 + ${h * h}) = ${fmt(l, 2)}`, `Yanal alan πrℓ = ${fmt(3 * l, 2)}π, açı = ${fmt(a)}°`],
      };
    },
  },
  "Küre: hacim 4πr³/3, alan 4πr²": {
    caption: "Yarıçapı değiştir: yüzey alanı aynı yarıçaplı dört dairenin alanı kadardır (4πr²); hacim 4πr³/3.",
    alt: "Ekvator çemberi kesikli çizilmiş küre ve yanında aynı yarıçaplı dört küçük daire.",
    param: { label: "r", min: 1, max: 3, step: 0.5, init: 2, unit: "" },
    draw: (r) => {
      const sc = 0.7;
      return {
        els: [
          ...sphere(v(0, 0), r * sc, "a"),
          seg(v(0, 0), v(r * sc, 0), { tone: "b" }),
          txt(v((r * sc) / 2, 0), `r = ${fmt(r)}`, "n", { small: true, tone: "b" }),
          ...[0, 1, 2, 3].map((i) => circle(v(r * sc + 1.2 + (i % 2) * (r * sc * 0.55 * 2 + 0.2), (i < 2 ? 1 : -1) * (r * sc * 0.55 + 0.1)), r * sc * 0.55, { tone: "c", fill: "c" })),
        ],
        readout: [`S = 4π·${fmt(r * r, 2)} = ${fmt(4 * r * r, 2)}π`, `V = 4π·${fmt(r ** 3, 2)}/3 = ${fmt((4 * r ** 3) / 3, 2)}π`],
      };
    },
  },
  "Silindir : küre : koni = 3 : 2 : 1": {
    caption: "Yarıçap r, yükseklik 2r. Silindir 2πr³, içine tam sığan küre 4πr³/3, aynı taban–yükseklikteki koni 2πr³/3: oran 3 : 2 : 1.",
    alt: "Yan yana üç cisim: silindir, onun içine sığan küre ve aynı ölçülerde koni; altlarında 3, 2, 1 oranları.",
    draw: () => {
      const r = 1.3;
      return {
        els: [
          ...cylinder(v(0, 0), r, 2 * r, "ink"),
          ...sphere(v(0, r), r, "b"),
          ...cone(v(3.8, 0), r, 2 * r, "a"),
          txt(v(0, -0.7), "silindir 3 · küre 2", "s", { small: true, bold: true }),
          txt(v(3.8, -0.7), "koni 1", "s", { small: true, bold: true }),
        ],
        readout: ["2πr³ : 4πr³/3 : 2πr³/3 = 3 : 2 : 1"],
      };
    },
  },
  "Batırılan cisim suyu yükseltir": {
    caption: "Kap yarıçapı 6, bilyenin yarıçapını değiştir: bilye hacmi 4πr³/3 = 36π·Δh, su Δh kadar yükselir (tam batar, taşmaz).",
    alt: "Silindir kapta su, dipte bilye; ilk su seviyesi kesikli, yükselmiş seviye kalın çizgi.",
    param: { label: "bilye r", min: 1, max: 4, step: 0.5, init: 3, unit: "" },
    draw: (rb) => {
      const sc = 0.4;
      const R = 6 * sc;
      const h0 = 4 * sc;
      const dh = ((4 / 3) * rb ** 3) / 36;
      const h1 = h0 + dh * sc;
      return {
        els: [
          { k: "poly", ps: [v(-R, 0), v(R, 0), v(R, h1), v(-R, h1)], fill: "b", tone: "b", thin: true },
          ...cylinder(v(0, 0), R, 4.5, "ink"),
          circle(v(0, rb * sc), rb * sc, { tone: "warn", fill: "warn" }),
          seg(v(-R, h0), v(R, h0), { tone: "muted", dash: true }),
          seg(v(-R, h1), v(R, h1), { tone: "a", bold: true }),
          txt(v(R, h1), `Δh = ${fmt(dh, 2)}`, "e", { small: true, tone: "a" }),
        ],
        readout: [`4π·${fmt(rb ** 3, 3)}/3 = 36π·Δh → Δh = ${fmt(dh, 3)}`],
      };
    },
  },
  "Paralel kesit ve benzer cisimler": {
    caption: "k = tepeden kesite uzaklık / tam yükseklik. Kesiti kaydır: küçük koninin yarıçapı k, taban alanı k², hacmi k³ oranında; kesik koni 1 − k³.",
    alt: "Koni ve tabana paralel kesit düzlemi; üstteki küçük koni farklı renkte.",
    param: { label: "k", min: 0.25, max: 0.9, step: 0.05, init: 0.5, unit: "" },
    draw: (k) => {
      const r = 2;
      const h = 4;
      const cy = h * (1 - k);
      return {
        els: [
          ...cone(v(0, 0), r, h, "ink"),
          { k: "poly", ps: [v(-r * k, cy), v(r * k, cy), v(0, h)], fill: "a", tone: "a", thin: true },
          openPoly(ell(v(0, cy), r * k), "a"),
          txt(v(r * k, cy), `k = ${fmt(k, 2)}`, "e", { small: true, tone: "a" }),
        ],
        readout: [`Küçük/büyük hacim = k³ = ${fmt(k ** 3, 3)}`, `Kesik koni = ${fmt(1 - k ** 3, 3)} · büyük`],
      };
    },
  },
  "Dönel cisimleri şekilden tanı": {
    caption: "Dik kenarları 3 ve 4 olan üçgen. Adım: 4'lük kenar etrafında dönerse r = 3, h = 4 (12π); 3'lük kenar etrafında dönerse r = 4, h = 3 (16π).",
    alt: "Dik üçgen ve seçilen dönme ekseni etrafında oluşan koninin eğik görünümü.",
    steps: ["Eksen: 4 birimlik kenar", "Eksen: 3 birimlik kenar"],
    draw: (_, step) => {
      const sc = 0.7;
      const [r, h] = step === 0 ? [3, 4] : [4, 3];
      return {
        els: [
          { k: "poly", ps: [v(0, 0), v(r * sc, 0), v(0, h * sc)], fill: "a", tone: "a", thin: true },
          seg(v(0, -0.4), v(0, h * sc + 0.5), { tone: "warn", dash: true }),
          txt(v(0, h * sc + 0.5), "eksen", "n", { small: true, tone: "warn" }),
          ...cone(v(0, 0), r * sc, h * sc, "ink"),
          txt(v((r * sc) / 2, 0), `r = ${r}`, "s", { small: true }),
          txt(v(0, (h * sc) / 2), `h = ${h}`, "w", { small: true }),
        ],
        readout: [`V = π·${r * r}·${h}/3 = ${(r * r * h) / 3}π`],
      };
    },
  },
};

const trig: Record<string, FigureDef> = {
  "Kenarları açıya göre adlandır": {
    caption: "Adım: önce x açısına göre karşı ve komşu kenar; sonra öbür dar açı y'ye geçince karşı ve komşu yer değiştirir, hipotenüs aynı kalır.",
    alt: "Dik üçgen; seçili açının karşısındaki ve yanındaki dik kenarlar renkli etiketli, hipotenüs ayrıca işaretli.",
    steps: ["x açısına göre", "y açısına göre"],
    draw: (_, step) => {
      const A = v(0, 0);
      const B = v(4, 0);
      const C = v(4, 3);
      const xAt = step === 0;
      return {
        els: [
          seg(A, C, { tone: "ink", bold: true }),
          seg(A, B, { tone: xAt ? "b" : "a", bold: true }),
          seg(B, C, { tone: xAt ? "a" : "b", bold: true }),
          right(B, A, C),
          ang(xAt ? A : C, xAt ? B : A, xAt ? C : B, xAt ? "x" : "y", { tone: "c" }),
          txt(v(2, 0), xAt ? "komşu" : "karşı", "s", { small: true, tone: xAt ? "b" : "a" }),
          txt(v(4, 1.5), xAt ? "karşı" : "komşu", "e", { small: true, tone: xAt ? "a" : "b" }),
          txt(v(2, 1.5), "hipotenüs", "nw", { small: true }),
        ],
      };
    },
  },
  "sin, cos, tan ve cot birer orandır": {
    caption: "Hipotenüs 5 birim. x açısını değiştir: karşı ve komşu kenarlar değişir, oranlar anlık hesaplanır.",
    alt: "Hipotenüsü sabit, açısı sürgüyle değişen dik üçgen; karşı ve komşu kenar uzunlukları.",
    param: { label: "x", min: 10, max: 80, step: 5, init: 37, unit: "°" },
    draw: (x) => {
      const r = 5;
      const t = (x * Math.PI) / 180;
      const B = v(r * Math.cos(t), 0);
      const C = v(r * Math.cos(t), r * Math.sin(t));
      const sc = 0.8;
      const S = (p: V): V => v(p[0] * sc, p[1] * sc);
      return {
        els: [
          seg(S(O), S(C), { tone: "ink", bold: true }),
          seg(S(O), S(B), { tone: "b", bold: true }),
          seg(S(B), S(C), { tone: "a", bold: true }),
          right(S(B), S(O), S(C)),
          ang(S(O), S(B), S(C), `${x}°`, { tone: "c" }),
          txt(S(v(B[0] / 2, 0)), `komşu ${fmt(B[0], 2)}`, "s", { small: true, tone: "b" }),
          txt(S(v(B[0], C[1] / 2)), `karşı ${fmt(C[1], 2)}`, "e", { small: true, tone: "a" }),
          txt(S(v(C[0] / 2, C[1] / 2)), "5", "nw", { small: true }),
        ],
        readout: [`sin = ${fmt(Math.sin(t), 3)}, cos = ${fmt(Math.cos(t), 3)}, tan = ${fmt(Math.tan(t), 3)}`],
      };
    },
  },
  "Oran üçgenin boyutuna bağlı değildir": {
    caption: "Aynı x açılı üç benzer dik üçgen (3–4–5, 6–8–10, 9–12–15): sin x = 3/5 hepsinde aynıdır.",
    alt: "Ortak köşeli, iç içe üç dik üçgen; her birinin karşı kenarı ve hipotenüsü etiketli.",
    draw: () => {
      const els: El[] = [];
      for (const k of [1, 2, 3]) {
        const s0 = 0.55 * k;
        els.push(seg(v(0, 0), v(4 * s0, 3 * s0), { tone: "ink" }), seg(v(4 * s0, 0), v(4 * s0, 3 * s0), { tone: "a" }), txt(v(4 * s0, 1.5 * s0), `${3 * k}`, "e", { small: true, tone: "a" }));
      }
      els.push(seg(v(0, 0), v(4 * 1.65, 0), { tone: "b" }), ang(v(0, 0), v(1, 0), v(4, 3), "x", { tone: "c" }));
      return { els, readout: ["3/5 = 6/10 = 9/15 = 0,6"] };
    },
  },
  "Özel açılar: 30°, 45°, 60°": {
    caption: "Sol: ikizkenar dik üçgen (1, 1, √2) → 45°. Sağ: kenarı 2 olan eşkenar üçgenin yarısı (1, √3, 2) → 30° ve 60°.",
    alt: "Solda dik kenarları 1 olan ikizkenar dik üçgen; sağda eşkenar üçgen ve yüksekliğiyle oluşan 30-60-90 üçgeni.",
    draw: () => {
      const s0 = 2;
      const A = v(0, 0), B = v(s0, 0), C = v(0, s0);
      const P = v(4, 0), Q = v(4 + s0, 0), R = v(4 + s0 / 2, s0 * Math.sqrt(3) / 2 * 1);
      const H = v(4 + s0 / 2, 0);
      return {
        els: [
          { k: "poly", ps: [A, B, C], tone: "a", bold: true },
          right(A, B, C),
          ang(B, C, A, "45°", { tone: "c" }),
          txt(v(1, 0), "1", "s", { small: true }),
          txt(v(0, 1), "1", "w", { small: true }),
          txt(v(1, 1), "√2", "ne", { small: true }),
          { k: "poly", ps: [P, Q, R], tone: "muted", dash: true },
          { k: "poly", ps: [P, H, R], tone: "b", bold: true },
          right(H, P, R),
          ang(P, H, R, "60°", { tone: "c" }),
          ang(R, P, H, "30°", { tone: "c" }),
          txt(mid(P, H), "1", "s", { small: true }),
          txt(mid(H, R), "√3", "e", { small: true }),
          txt(mid(P, R), "2", "nw", { small: true }),
        ],
      };
    },
  },
  "Tümler açılarda oranlar yer değiştirir": {
    caption: "Dar açılar x ve 90° − x. x'in karşı kenarı (a), tümler açının komşu kenarıdır: sin x = a/c = cos(90° − x).",
    alt: "Dik üçgen; iki dar açı x ve 90 eksi x, karşı kenar a her iki açıya göre farklı adla etiketli.",
    draw: () => {
      const A = v(0, 0), B = v(4, 0), C = v(4, 3);
      return {
        els: [
          { k: "poly", ps: [A, B, C], tone: "ink", bold: true },
          right(B, A, C),
          ang(A, B, C, "x", { tone: "a" }),
          ang(C, A, B, "90° − x", { tone: "b" }),
          seg(B, C, { tone: "warn", bold: true }),
          txt(v(4, 1.5), "a", "e", { small: true, tone: "warn", bold: true }),
          txt(v(2, 1.5), "c", "nw", { small: true }),
        ],
        readout: ["sin x = a/c = cos(90° − x)", "tan x = cot(90° − x)"],
      };
    },
  },
  "sin²x + cos²x = 1": {
    caption: "Hipotenüs 1 olan dik üçgende karşı kenar sin x, komşu kenar cos x'tir. Açıyı değiştir: kareler toplamı hep 1.",
    alt: "Birim çeyrek çember içinde hipotenüsü 1 olan dik üçgen; dik kenarları sin x ve cos x.",
    param: { label: "x", min: 10, max: 80, step: 5, init: 30, unit: "°" },
    draw: (x) => {
      const t = (x * Math.PI) / 180;
      const r = 3;
      const C = v(r * Math.cos(t), r * Math.sin(t));
      const B = v(C[0], 0);
      return {
        els: [
          { k: "poly", ps: Array.from({ length: 31 }, (_, i) => pol(r, (90 * i) / 30, O)), open: true, tone: "muted" },
          seg(O, C, { tone: "ink", bold: true }),
          seg(O, B, { tone: "b", bold: true }),
          seg(B, C, { tone: "a", bold: true }),
          right(B, O, C),
          ang(O, B, C, `${x}°`, { tone: "c" }),
          txt(v(B[0] / 2, 0), "cos x", "s", { small: true, tone: "b" }),
          txt(v(B[0], C[1] / 2), "sin x", "e", { small: true, tone: "a" }),
          txt(mid(O, C), "1", "nw", { small: true }),
        ],
        readout: [`${fmt(Math.sin(t) ** 2, 3)} + ${fmt(Math.cos(t) ** 2, 3)} = 1`],
      };
    },
  },
  "Verilen bir orandan üçgeni kur": {
    caption: "tan x = 5/12: karşı 5k, komşu 12k, hipotenüs Pisagor ile 13k. k'yı değiştir: kenarlar büyür, oranlar değişmez.",
    alt: "Dik kenarları 5k ve 12k, hipotenüsü 13k olan dik üçgen.",
    param: { label: "k", min: 0.2, max: 0.6, step: 0.1, init: 0.4, unit: "" },
    draw: (k) => {
      const A = v(0, 0), B = v(12 * k, 0), C = v(12 * k, 5 * k);
      return {
        els: [
          { k: "poly", ps: [A, B, C], tone: "ink", bold: true },
          right(B, A, C),
          ang(A, B, C, "x", { tone: "c" }),
          txt(mid(A, B), `12k = ${fmt(12 * k, 1)}`, "s", { small: true, tone: "b" }),
          txt(mid(B, C), `5k = ${fmt(5 * k, 1)}`, "e", { small: true, tone: "a" }),
          txt(mid(A, C), `13k = ${fmt(13 * k, 1)}`, "nw", { small: true }),
        ],
        readout: ["sin x = 5/13, cos x = 12/13 (k sadeleşir)"],
      };
    },
  },
  "Yükseklik ve uzaklık problemleri": {
    caption: "Gözlemci ağaçtan 20 m uzakta. Bakış açısını değiştir: yükseklik h = 20·tan x.",
    alt: "Yerde gözlemci, ileride dikey ağaç; gözlemciden ağacın tepesine bakış doğrusu ve yerle yaptığı açı.",
    param: { label: "x", min: 15, max: 60, step: 5, init: 30, unit: "°" },
    draw: (x) => {
      const d = 20;
      const h = d * Math.tan((x * Math.PI) / 180);
      const sc = 0.3;
      const G = v(0, 0), T = v(d * sc, 0), Top = v(d * sc, h * sc);
      return {
        els: [
          seg(v(-0.5, 0), v(d * sc + 1, 0), { tone: "muted" }),
          seg(T, Top, { tone: "c", bold: true }),
          seg(G, Top, { tone: "a", dash: true }),
          right(T, G, Top),
          ang(G, T, Top, `${x}°`, { tone: "a" }),
          pt(G, "göz", "sw"),
          txt(mid(G, T), "20 m", "s", { small: true }),
          txt(v(d * sc, (h * sc) / 2), `h = ${fmt(h, 1)} m`, "e", { small: true, tone: "c" }),
        ],
        readout: [`h = 20·tan ${x}° ≈ ${fmt(h, 2)} m`],
      };
    },
  },
};

export const geometryFiguresCircle040: Record<string, Record<string, FigureDef>> = {
  "tyt-geo-cember-aci-040": cember,
  "tyt-geo-daire-040": daire,
  "tyt-geo-silindir-koni-kure-040": kati,
  "tyt-geo-trigonometrik-oranlar-040": trig,
};
