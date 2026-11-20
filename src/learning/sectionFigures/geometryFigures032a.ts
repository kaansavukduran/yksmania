import {
  add,
  ang,
  angleAt,
  circle,
  dim,
  dist,
  fmt,
  foot,
  line,
  meet,
  mid,
  mul,
  par,
  pol,
  poly,
  pt,
  regular,
  right,
  seg,
  sub,
  ticks,
  txt,
  unit,
  v,
  vec,
  type El,
  type FigureDef,
  type V,
} from "./figureKit";

const quad = (ps: V[], fill?: "a" | "b" | "c" | "muted") => poly(ps, { fill });
const labelAll = (ps: V[], names: string[], dirs: ("n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw")[]) =>
  ps.map((p, i) => pt(p, names[i], dirs[i]));
/** Interior angle at vertex i of polygon ps (convex or reflex), degrees. */
function interior(ps: V[], i: number) {
  const n = ps.length;
  const a = ps[(i + n - 1) % n];
  const o = ps[i];
  const b = ps[(i + 1) % n];
  // Signed area tells the winding; cross sign tells whether the turn is reflex.
  const area = ps.reduce((s, p, k) => s + p[0] * ps[(k + 1) % n][1] - ps[(k + 1) % n][0] * p[1], 0);
  const cr = (o[0] - a[0]) * (b[1] - o[1]) - (o[1] - a[1]) * (b[0] - o[0]);
  const base = angleAt(o, a, b);
  return cr * area >= 0 ? base : 360 - base;
}
/** Trapezoid with bottom base a on y = 0, top base c at height h, top shifted by dx. */
function trap(a: number, c: number, h: number, dx: number): [V, V, V, V] {
  return [v(0, 0), v(a, 0), v(dx + c, h), v(dx, h)];
}

const cokgenler: Record<string, FigureDef> = {
  "Önce kapalı şekli ve köşeleri tanı": {
    caption:
      "Bu derste yalnız soldaki gibi kenarları yalnız komşu uçlarda buluşan kapalı şekiller çokgen sayılır. Kendini kesen yıldız ve kapanmayan çizgi bu sınıfa girmez.",
    alt: "Üç şekil: kapalı basit beşgen, kenarları birbirini kesen beş köşeli yıldız ve iki ucu açık kırık çizgi.",
    draw: () => {
      const p5 = regular(5, 1.6, 90, v(0, 0));
      const star = [0, 2, 4, 1, 3].map((i) => regular(5, 1.6, 90, v(4.4, 0))[i]);
      const open: V[] = [v(7.6, -1), v(8.4, 1.2), v(9.4, -0.4), v(10.4, 1.3), v(11.2, -0.8)];
      return {
        els: [
          poly(p5, { fill: "b" }),
          ...p5.map((p) => pt(p)),
          poly(star, { tone: "warn" }),
          poly(open, { open: true, tone: "muted" }),
          ...open.map((p) => pt(p, undefined, "n", "muted")),
          txt(v(0, -2.3), "basit çokgen", "c", { small: true, tone: "b" }),
          txt(v(4.4, -2.3), "kendini kesiyor", "c", { small: true, tone: "warn" }),
          txt(v(9.4, -2.3), "kapanmıyor", "c", { small: true, tone: "muted" }),
        ],
      };
    },
  },
  "Dışbükey ve içbükey: çizimdeki fark": {
    caption:
      "Sağdaki altıgenin işaretli köşesinde iç açı 180°'den büyüktür; şekil o köşede içeri çöker. Bu yüzden bazı köşegenler (kesikli) şeklin dışından geçer.",
    alt: "Solda dışbükey bir altıgen ve içinde kalan bir köşegen; sağda bir köşesi içeri çökmüş içbükey altıgen, o köşedeki büyük iç açı ve dışarı taşan kesikli köşegen.",
    draw: () => {
      const cv: V[] = [v(0, 0), v(2.4, -0.4), v(3.4, 1.2), v(2.6, 2.8), v(0.6, 3), v(-0.6, 1.4)];
      const cc: V[] = [v(5, 0), v(8.6, -0.2), v(8.2, 3), v(7, 1.3), v(5.4, 3.1), v(4.6, 1.5)];
      const k = 3;
      return {
        els: [
          poly(cv, { fill: "b" }),
          seg(cv[0], cv[3], { tone: "b", dash: true }),
          ...cv.map((p) => pt(p)),
          poly(cc, { fill: "a" }),
          ang(cc[k], cc[k + 1], cc[k - 1], `${fmt(interior(cc, k), 0)}°`, {
            reflex: true,
            r: 22,
            tone: "warn",
          }),
          seg(cc[2], cc[4], { tone: "warn", dash: true }),
          ...cc.map((p) => pt(p)),
          txt(v(1.4, -1.3), "dışbükey", "c", { small: true, tone: "b" }),
          txt(v(6.6, -1.3), "içbükey", "c", { small: true, tone: "a" }),
        ],
      };
    },
  },
  "İç açı toplamını üçgenlerden çıkar": {
    caption:
      "Düzgün olmayan bir yedigende de tek köşeden çizilen köşegenler beş üçgen oluşturur. Toplam için kenar veya açı eşitliği gerekmez.",
    alt: "Kenarları farklı uzunlukta dışbükey yedigen; A köşesinden çizilen dört köşegenle beş renkli üçgene ayrılmış.",
    draw: () => {
      const ps: V[] = [v(0, 0), v(3.2, -0.6), v(5.4, 0.8), v(5.8, 3), v(3.8, 4.6), v(1.2, 4.2), v(-0.8, 2.2)];
      const tones = ["a", "b", "c", "a", "b"] as const;
      const tris = [1, 2, 3, 4, 5].map((i, k) =>
        poly([ps[0], ps[i], ps[i + 1]], { fill: tones[k], thin: true }),
      );
      const total = ps.reduce((s, _, i) => s + interior(ps, i), 0);
      return {
        els: [
          ...tris,
          poly(ps),
          ...ps.map((p, i) => pt(p, i === 0 ? "A" : undefined, "sw")),
        ],
        readout: [`(7 − 2)·180° = 900°`, `Ölçülen açıların toplamı: ${fmt(total, 0)}°`],
      };
    },
  },
  "Dış açıda aynı dönüş yönünü koru": {
    caption:
      "Çevrede aynı yönde yürü: her köşede kenarın uzantısından sonraki kenara dönersin. Beş dönüşün toplamı bir tam turdur.",
    alt: "Dışbükey beşgen; her kenar ileri yönde kesikli uzatılmış ve her köşedeki dış açı yayla işaretli.",
    draw: () => {
      // Build the pentagon from whole-degree turns so the labels add up
      // exactly: three side lengths are chosen, the last two close the loop.
      const turns = [70, 80, 60, 90, 60];
      const dirs = [0, 70, 150, 210, 300].map((t) => pol(1, t));
      const L = [4, 3, 3];
      const open = L.reduce((s2, l, i) => add(s2, mul(dirs[i], l)), v(0, 0));
      const det = dirs[3][0] * dirs[4][1] - dirs[3][1] * dirs[4][0];
      const l3 = (-open[0] * dirs[4][1] + open[1] * dirs[4][0]) / det;
      const l4 = (-dirs[3][0] * open[1] + dirs[3][1] * open[0]) / det;
      const lens = [...L, l3, l4];
      const ps: V[] = [];
      lens.reduce((p0, l, i) => {
        ps.push(p0);
        return add(p0, mul(dirs[i], l));
      }, v(0, 0) as V);
      const els: El[] = [poly(ps, { fill: "muted" })];
      const ext: number[] = [];
      ps.forEach((p, i) => {
        const prev = ps[(i + ps.length - 1) % ps.length];
        const next = ps[(i + 1) % ps.length];
        const fwd = add(p, mul(unit(sub(p, prev)), 1.3));
        const e = turns[(i + turns.length - 1) % turns.length];
        ext.push(e);
        els.push(
          seg(p, fwd, { dash: true, tone: "muted", thin: true }),
          ang(p, fwd, next, `${fmt(e, 0)}°`, { tone: i % 2 ? "b" : "a", r: 24, fill: true }),
        );
      });
      els.push(...ps.map((p) => pt(p)));
      return {
        els,
        readout: [`${ext.join("° + ")}° = ${ext.reduce((a, b) => a + b, 0)}°`],
      };
    },
  },
  "Köşegenleri çift saymadan say": {
    caption:
      "Sekizgende A'dan 8 − 3 = 5 köşegen çıkar (turuncu). Her köşeden sayınca 8·5 = 40 olur, ama her köşegen iki ucundan sayıldığı için 20 farklı köşegen vardır.",
    alt: "Düzgün sekizgen; A köşesinden çıkan beş köşegen kalın, diğer bütün köşegenler ince çizgiyle.",
    draw: () => {
      const ps = regular(8, 3, 112.5);
      const els: El[] = [];
      for (let i = 0; i < 8; i++)
        for (let j = i + 2; j < 8; j++) {
          if (i === 0 && j === 7) continue;
          if (i !== 0) els.push(seg(ps[i], ps[j], { thin: true, tone: "muted" }));
        }
      for (let j = 2; j <= 6; j++) els.push(seg(ps[0], ps[j], { tone: "a" }));
      els.push(poly(ps), ...ps.map((p, i) => pt(p, i === 0 ? "A" : undefined, "nw")));
      return { els, readout: ["Bir köşeden: 5", "Toplam: 8·5/2 = 20"] };
    },
  },
  "Düzgün olmak iki eşitlik ister": {
    caption:
      "Eşkenar dörtgenin kenarları eşittir ama açıları 60° ve 120°dir. Dikdörtgenin açıları eşittir ama kenarları 3 ve 5'tir. İkisi birden yalnız karede sağlanır.",
    alt: "Üç dörtgen: kenarları çentikli eşkenar dörtgen, dik açılı ama kenarları farklı dikdörtgen ve hem çentikli hem dik açılı kare.",
    draw: () => {
      // Rhombus side 3.6 keeps the 60° and 120° labels apart on a phone.
      const r1: V[] = [v(0, 0), v(3.6, 0), add(v(3.6, 0), pol(3.6, 60)), pol(3.6, 60)];
      const r2: V[] = [v(6.8, 0), v(11.8, 0), v(11.8, 3), v(6.8, 3)];
      const r3: V[] = [v(13.4, 0), v(16.4, 0), v(16.4, 3), v(13.4, 3)];
      return {
        els: [
          quad(r1, "b"),
          ...r1.map((p, i) => ticks(p, r1[(i + 1) % 4], 1, "b")),
          ang(r1[0], r1[1], r1[3], "60°", { tone: "a" }),
          ang(r1[3], r1[0], r1[2], "120°", { tone: "a", r: 22 }),
          quad(r2, "c"),
          ...r2.map((p, i) => right(p, r2[(i + 1) % 4], r2[(i + 3) % 4], "c")),
          dim(r2[0], r2[1], "5", r2[3]),
          dim(r2[1], r2[2], "3", r2[0]),
          quad(r3, "a"),
          ...r3.map((p, i) => ticks(p, r3[(i + 1) % 4], 1, "a")),
          ...r3.map((p, i) => right(p, r3[(i + 1) % 4], r3[(i + 3) % 4], "a")),
          txt(v(2.7, -1.5), "yalnız eş kenar", "c", { small: true }),
          txt(v(9.3, -1.5), "yalnız eş açı", "c", { small: true }),
          txt(v(14.9, -1.5), "düzgün", "c", { small: true, bold: true, tone: "a" }),
        ],
      };
    },
  },
  "Merkez açısı, çevre ve alanı ilişkilendir": {
    caption:
      "Düzgün beşgende merkez O'dan iki komşu köşeye çizilen R'ler 72°lik merkez açısı yapar. Kenara inen dik ρ (apotem) R'den kısadır.",
    alt: "Düzgün beşgen ve merkezi O; O'dan iki komşu köşeye R uzunlukları, aradaki 72° açı ve O'dan kenarın orta noktasına inen dik apotem.",
    draw: () => {
      const ps = regular(5, 3, 90 + 36);
      const O = v(0, 0);
      const M = mid(ps[2], ps[3]);
      return {
        els: [
          ...ps.map((p, i) => poly([O, p, ps[(i + 1) % 5]], { fill: i === 2 ? "a" : undefined, thin: true, tone: "muted" })),
          poly(ps),
          seg(O, ps[2], { tone: "b" }),
          seg(O, ps[3], { tone: "b" }),
          seg(O, M, { tone: "a" }),
          right(M, ps[3], O, "a"),
          ang(O, ps[2], ps[3], "72°", { r: 26, tone: "b" }),
          dim(O, ps[2], "R", ps[3], "b"),
          dim(O, M, "ρ", ps[3], "a"),
          pt(O, "O", "n"),
        ],
        readout: ["Merkez açısı = dış açı = 360°/5 = 72°", "Alan = 5·a·ρ/2 = Ç·ρ/2"],
      };
    },
  },
  "Düzgün altıgeni altı eşkenar üçgenle gör": {
    caption:
      "a = 4 olan düzgün altıgen altı eşkenar üçgendir: R = a. Bir köşe atlayan köşegen 4√3, karşı köşelere giden köşegen 8 birimdir.",
    alt: "Merkezden köşelere çizgilerle altı eşkenar üçgene ayrılmış düzgün altıgen; kısa köşegen ve uzun köşegen iki renkle.",
    draw: () => {
      const ps = regular(6, 4, 0);
      const O = v(0, 0);
      return {
        els: [
          ...ps.map((p, i) => poly([O, p, ps[(i + 1) % 6]], { fill: i % 2 ? "c" : "muted", thin: true })),
          poly(ps),
          seg(ps[1], ps[5], { tone: "b", bold: true }),
          seg(ps[2], ps[5], { tone: "a", bold: true }),
          dim(ps[0], ps[1], "4", O),
          pt(O, "O", "s"),
          ...ps.map((p) => pt(p)),
        ],
        readout: [
          `Kısa köşegen 4√3 ≈ ${fmt(dist(ps[1], ps[5]), 2)}`,
          "Uzun köşegen 8",
          `Alan 6·16√3/4 = 24√3 ≈ ${fmt(24 * Math.sqrt(3), 1)}`,
        ],
      };
    },
  },
  "Genel çember formülünün arkasındaki dik üçgen": {
    caption:
      "n'yi değiştir: merkezden bir kenara dikme indirince açısı θ = 180°/n olan dik üçgen oluşur. Karşı kenar a/2, komşu kenar ρ, hipotenüs R'dir.",
    alt: "R = 3 yarıçaplı çembere çizilmiş düzgün çokgen; bir kenarın yarısı, apotem ve R'den oluşan dik üçgen boyalı.",
    param: { label: "Kenar sayısı n", min: 3, max: 12, step: 1, init: 5 },
    draw: (n) => {
      const R = 3;
      const ps = regular(n, R, 90 - 180 / n - 90);
      const O = v(0, 0);
      const A = ps[0];
      const B = ps[1];
      const M = mid(A, B);
      const th = 180 / n;
      const a = 2 * R * Math.sin((th * Math.PI) / 180);
      const rho = R * Math.cos((th * Math.PI) / 180);
      return {
        els: [
          circle(O, R, { dash: true, thin: true, tone: "muted" }),
          poly([O, A, M], { fill: "a", thin: true, tone: "a" }),
          poly(ps),
          seg(O, A, { tone: "b" }),
          seg(O, M, { tone: "a" }),
          right(M, A, O),
          ang(O, A, M, "θ", { r: 30, tone: "a" }),
          dim(O, A, "R", M, "b"),
          dim(O, M, "ρ", A, "a"),
          dim(M, A, "a/2", O, "a"),
          pt(O, "O", "w"),
        ],
        readout: [
          `θ = 180°/${n} = ${fmt(th, 1)}°`,
          `a = 2R·sin θ ≈ ${fmt(a, 2)} · ρ = R·cos θ ≈ ${fmt(rho, 2)} (R = 3)`,
        ],
      };
    },
  },
  "Beşgenin özel oranı ve sonuç denetimi": {
    caption:
      "Düzgün beşgende iç açı 108°dir ve köşegenin kenara oranı altın oran (1 + √5)/2 ≈ 1,618'dir. Bu oran yalnız düzgün beşgene aittir.",
    alt: "Düzgün beşgen; bir kenar ve bir köşegen farklı renkte, bir iç açı 108° olarak işaretli.",
    draw: () => {
      const ps = regular(5, 3, 90);
      const side = dist(ps[0], ps[1]);
      const diag = dist(ps[0], ps[2]);
      return {
        els: [
          poly(ps, { fill: "muted" }),
          seg(ps[2], ps[3], { tone: "b", bold: true }),
          seg(ps[0], ps[2], { tone: "a", bold: true }),
          ang(ps[1], ps[2], ps[0], "108°", { r: 26, tone: "c" }),
          ...ps.map((p) => pt(p)),
          dim(ps[2], ps[3], "a", ps[0], "b"),
        ],
        readout: [`köşegen / kenar ≈ ${fmt(diag / side, 3)} = (1 + √5)/2`],
      };
    },
  },
};

const dortgenHiyerarsi: Record<string, FigureDef> = {
  "Dört köşe, iki köşegen ve bir kapalı çevre": {
    caption:
      "Köşeler çevre boyunca sırayla okunur: ABCD'de kenarlar AB, BC, CD, DA; köşegenler AC ve BD. Ortadaki papyon çizimi basit dörtgen değildir.",
    alt: "Solda dışbükey ABCD ve iki köşegeni, ortada kenarları kesişen papyon şekli, sağda bir köşesi içeri çökmüş içbükey dörtgen.",
    draw: () => {
      const q: V[] = [v(0, 0), v(3.4, 0.2), v(3, 2.8), v(0.4, 2.4)];
      const bow: V[] = [v(5, 0), v(7.6, 2.6), v(7.6, 0), v(5, 2.6)];
      const cc: V[] = [v(9.2, 0), v(12.4, 0.2), v(10.6, 1.1), v(10.2, 2.8)];
      return {
        els: [
          quad(q, "b"),
          seg(q[0], q[2], { tone: "b", dash: true }),
          seg(q[1], q[3], { tone: "b", dash: true }),
          ...labelAll(q, ["A", "B", "C", "D"], ["sw", "se", "ne", "nw"]),
          poly(bow, { tone: "warn" }),
          quad(cc, "a"),
          ...cc.map((p) => pt(p)),
          txt(v(1.7, -0.9), "dışbükey", "c", { small: true, tone: "b" }),
          txt(v(6.3, -0.9), "basit değil", "c", { small: true, tone: "warn" }),
          txt(v(10.8, -0.9), "içbükey", "c", { small: true, tone: "a" }),
        ],
      };
    },
  },
  "360° toplamının gerekçesi": {
    caption:
      "AC köşegeni dörtgeni iki üçgene böler. İki üçgenin altı açısı birlikte dörtgenin dört iç açısını kaplar: 180° + 180°.",
    alt: "Dışbükey ABCD dörtgeni AC köşegeniyle iki renkli üçgene ayrılmış; köşelerdeki açılar renkli yaylarla.",
    draw: () => {
      const [A, B, C, D] = [v(0, 0), v(5, 0), v(4.2, 3.2), v(0.8, 2.8)];
      return {
        els: [
          poly([A, B, C], { fill: "a", thin: true }),
          poly([A, C, D], { fill: "b", thin: true }),
          quad([A, B, C, D]),
          seg(A, C, { dash: true }),
          ang(A, B, C, undefined, { tone: "a", r: 28 }),
          ang(A, C, D, undefined, { tone: "b", r: 34 }),
          ang(B, C, A, undefined, { tone: "a" }),
          ang(C, A, B, undefined, { tone: "a", r: 22 }),
          ang(C, D, A, undefined, { tone: "b", r: 30 }),
          ang(D, A, C, undefined, { tone: "b" }),
          ...labelAll([A, B, C, D], ["A", "B", "C", "D"], ["sw", "se", "ne", "nw"]),
        ],
        readout: ["ABC: 180° · ACD: 180° · toplam 360°"],
      };
    },
  },
  "Sınıfları birbiri içinde oku": {
    caption:
      "Ok, “özel hâlidir” anlamındadır. Her paralelkenar bir yamuktur; kare hem dikdörtgen hem eşkenar dörtgendir; eşkenar dörtgen aynı zamanda deltoiddir.",
    alt: "Küçük şekillerle sınıf şeması: yamuktan paralelkenara, paralelkenardan dikdörtgen ve eşkenar dörtgene, ikisinden kareye; deltoidden eşkenar dörtgene oklar.",
    draw: () => {
      const icon = (o: V, ps: V[]) => poly(ps.map((p) => add(o, p)), { fill: "muted", thin: true });
      const T = v(0, 4);
      const Pg = v(4.6, 4);
      const R = v(9.2, 6);
      const Rh = v(9.2, 2);
      const Sq = v(13.6, 4);
      const K = v(4.6, 0);
      const trapS: V[] = [v(-1.1, -0.6), v(1.1, -0.6), v(0.5, 0.6), v(-0.6, 0.6)];
      const pgS: V[] = [v(-1.1, -0.6), v(0.6, -0.6), v(1.1, 0.6), v(-0.6, 0.6)];
      const rS: V[] = [v(-1.1, -0.6), v(1.1, -0.6), v(1.1, 0.6), v(-1.1, 0.6)];
      const rhS: V[] = [v(-0.9, 0), v(0, -0.65), v(0.9, 0), v(0, 0.65)];
      const sqS: V[] = [v(-0.65, -0.65), v(0.65, -0.65), v(0.65, 0.65), v(-0.65, 0.65)];
      const kS: V[] = [v(-0.7, 0), v(0, -0.5), v(1.4, 0), v(0, 0.5)];
      const arrow = (a: V, b: V) => {
        const d = unit(sub(b, a));
        return vec(add(a, mul(d, 1.5)), sub(b, mul(d, 1.5)), { tone: "a", thin: true });
      };
      return {
        els: [
          icon(T, trapS),
          icon(Pg, pgS),
          icon(R, rS),
          icon(Rh, rhS),
          icon(Sq, sqS),
          icon(K, kS),
          arrow(T, Pg),
          arrow(Pg, R),
          arrow(Pg, Rh),
          arrow(R, Sq),
          arrow(Rh, Sq),
          arrow(K, Rh),
          txt(add(T, v(0, -1.1)), "yamuk", "c", { small: true }),
          txt(add(Pg, v(0, -1.1)), "paralelkenar", "c", { small: true }),
          txt(add(R, v(0, 1.1)), "dikdörtgen", "c", { small: true }),
          txt(add(Rh, v(0, -1.1)), "eşkenar dörtgen", "c", { small: true }),
          txt(add(Sq, v(0, -1.1)), "kare", "c", { small: true, bold: true }),
          txt(add(K, v(0, -1)), "deltoid", "c", { small: true }),
        ],
      };
    },
  },
  "Deltoidde komşu eş çiftleri bul": {
    caption:
      "AB = AD (tek çentik) ve CB = CD (çift çentik): eş kenarlar komşudur. AC simetri eksenidir, BD'ye diktir ve onu ortalar.",
    alt: "Deltoid ABCD; AB ve AD tek çentikli, CB ve CD çift çentikli. AC kesikli simetri ekseni, BD'yi K'de dik kesiyor ve BK = KD.",
    draw: () => {
      const A = v(0, 0);
      const C = v(7, 0);
      const B = v(2.2, -2.2);
      const D = v(2.2, 2.2);
      const K = v(2.2, 0);
      return {
        els: [
          quad([A, B, C, D], "b"),
          line(A, C, { dash: true, tone: "a", ext: 0.5 }),
          seg(B, D, { tone: "muted" }),
          right(K, C, D, "a"),
          ticks(A, B, 1),
          ticks(A, D, 1),
          ticks(C, B, 2),
          ticks(C, D, 2),
          ticks(B, K, 1, "a"),
          ticks(K, D, 1, "a"),
          ang(A, B, K, undefined, { tone: "a", r: 30 }),
          ang(A, K, D, undefined, { tone: "a", r: 36 }),
          ...labelAll([A, B, C, D, K], ["A", "B", "C", "D", "K"], ["w", "s", "e", "n", "ne"]),
        ],
        readout: ["Alan = AC·BD/2", "Çevre = 2(AB + BC)"],
      };
    },
  },
  "Paralel tabanlar açıları ve alanı bağlar": {
    caption:
      "AB ∥ DC olduğundan aynı yan kenardaki açılar bütünlerdir: 70° + 110° ve 60° + 120°. Yükseklik h, eğik yan kenar değil, tabanlar arası dik uzaklıktır.",
    alt: "AB alt ve DC üst tabanlı yamuk; köşelerde 70°, 60°, 120°, 110° açıları; D'den AB'ye inen kesikli dik yükseklik.",
    draw: () => {
      const h = 3.2 * Math.sin((70 * Math.PI) / 180);
      const A = v(0, 0);
      const B = v(8, 0);
      const D = pol(3.2, 70);
      const C = add(B, pol(h / Math.sin((60 * Math.PI) / 180), 120));
      const H = v(D[0], 0);
      return {
        els: [
          quad([A, B, C, D], "muted"),
          par(A, B, 1, "muted"),
          par(D, C, 1, "muted"),
          seg(D, H, { dash: true, tone: "a" }),
          right(H, B, D, "a"),
          dim(D, H, "h", B, "a"),
          ang(A, B, D, "70°", { tone: "b", fill: true }),
          ang(D, A, C, "110°", { tone: "b", fill: true, r: 24 }),
          ang(B, C, A, "60°", { tone: "c", fill: true }),
          ang(C, D, B, "120°", { tone: "c", fill: true, r: 24 }),
          ...labelAll([A, B, C, D], ["A", "B", "C", "D"], ["sw", "se", "ne", "nw"]),
        ],
        readout: ["A + D = 180° · B + C = 180°", "Alan = (AB + DC)·h/2"],
      };
    },
  },
  "Orta taban ve köşegenlerdeki küçük parçalar": {
    caption:
      "a = 10, b = 4 olan yamukta orta taban EF = 7. Köşegenler EF'yi üç parçaya ayırır: b/2 = 2, (a − b)/2 = 3, b/2 = 2.",
    alt: "Alt tabanı 10, üst tabanı 4 olan yamuk; yan kenarların orta noktalarını birleştiren EF ve iki köşegenin EF'yi kestiği K ile L noktaları.",
    draw: () => {
      const [A, B, C, D] = trap(10, 4, 4, 2.6);
      const E = mid(A, D);
      const F = mid(B, C);
      const K = meet(E, F, A, C);
      const L = meet(E, F, B, D);
      return {
        els: [
          quad([A, B, C, D]),
          seg(A, C, { tone: "muted", thin: true }),
          seg(B, D, { tone: "muted", thin: true }),
          seg(E, F, { tone: "a", bold: true }),
          ticks(A, E, 1),
          ticks(E, D, 1),
          ticks(B, F, 2),
          ticks(F, C, 2),
          dim(E, K, "2", A, "b"),
          dim(K, L, "3", A, "c"),
          dim(L, F, "2", A, "b"),
          dim(A, B, "10", C),
          dim(D, C, "4", A),
          ...labelAll([A, B, C, D, E, F, K, L], ["A", "B", "C", "D", "E", "F", "K", "L"], ["sw", "se", "ne", "nw", "w", "e", "n", "n"]),
        ],
        readout: ["EF = 2 + 3 + 2 = 7 = (10 + 4)/2"],
      };
    },
  },
  "Dik ve ikizkenar yamukta yardımcı dikmeler": {
    caption:
      "Solda dik yamuk: eğik kenar h ve |a − b| ile dik üçgen kurar. Sağda ikizkenar yamuk: dikmeler taban farkını iki eş parçaya böler.",
    alt: "Solda tabanları 14 ve 5, yüksekliği 12 olan dik yamuk ve eğik kenarı 15; sağda tabanları 20 ve 8, yan kenarları 10 olan ikizkenar yamuk, iki yanda 6'şar birimlik parça ve yükseklik 8.",
    draw: () => {
      const k = 0.3;
      const [A, B, C, D] = trap(14, 5, 12, 0).map((p) => mul(p, k));
      const P = foot(C, A, B);
      const o = v(6, 0);
      const [E, F, G, H] = trap(20, 8, 8, 6).map((p) => add(o, mul(p, k)));
      const H1 = foot(H, E, F);
      const G1 = foot(G, E, F);
      return {
        els: [
          quad([A, B, C, D]),
          right(A, B, D),
          seg(C, P, { dash: true, tone: "a" }),
          poly([P, B, C], { fill: "a", thin: true, tone: "a" }),
          dim(A, B, "14", D),
          dim(D, C, "5", A),
          dim(A, D, "12", B),
          dim(B, C, "15", A, "a"),
          quad([E, F, G, H]),
          seg(H, H1, { dash: true, tone: "b" }),
          seg(G, G1, { dash: true, tone: "b" }),
          right(H1, F, H, "b"),
          right(G1, E, G, "b"),
          ticks(E, H, 1),
          ticks(F, G, 1),
          dim(E, H1, "6", H, "b"),
          dim(G1, F, "6", G, "b"),
          dim(H1, H, "8", E, "b"),
          dim(H, G, "8", E),
          dim(E, H, "10", F),
        ],
        readout: ["√(12² + 9²) = 15", "√(10² − 6²) = 8"],
      };
    },
  },
  "Köşegenleri dik olan her şekil kare değildir": {
    caption:
      "Köşegenleri O'da dik kesişen bu dörtgen kare değildir; yine de dört dik üçgenden AB² + CD² = BC² + DA² çıkar.",
    alt: "Köşegenleri O noktasında dik kesişen, kenarları farklı uzunlukta dışbükey ABCD dörtgeni; dört küçük dik üçgen iki renkle.",
    draw: () => {
      const O = v(0, 0);
      const A = v(-2, 0);
      const C = v(5, 0);
      const B = v(0, -3);
      const D = v(0, 1.5);
      const sq = (p: V, q: V) => dist(p, q) ** 2;
      return {
        els: [
          poly([O, A, B], { fill: "a", thin: true }),
          poly([O, B, C], { fill: "b", thin: true }),
          poly([O, C, D], { fill: "a", thin: true }),
          poly([O, D, A], { fill: "b", thin: true }),
          quad([A, B, C, D]),
          seg(A, C, { dash: true }),
          seg(B, D, { dash: true }),
          right(O, C, D),
          ...labelAll([A, B, C, D, O], ["A", "B", "C", "D", "O"], ["w", "s", "e", "n", "ne"]),
        ],
        readout: [
          `AB² + CD² = ${fmt(sq(A, B))} + ${fmt(sq(C, D), 2)} = ${fmt(sq(A, B) + sq(C, D), 2)}`,
          `BC² + DA² = ${fmt(sq(B, C))} + ${fmt(sq(D, A), 2)} = ${fmt(sq(B, C) + sq(D, A), 2)}`,
        ],
      };
    },
  },
  "Kenar orta noktaları gizli bir paralelkenar kurar": {
    caption:
      "D köşesini kaydır: ABCD hangi biçime girerse girsin kenar orta noktalarını birleştiren EFGH paralelkenardır ve alanı ABCD'nin yarısıdır.",
    alt: "Dışbükey ABCD dörtgeni ve kenarlarının orta noktaları E, F, G, H; EFGH paralelkenarı boyalı, karşılıklı kenarlarında paralellik işaretleri.",
    param: { label: "D'nin yatay konumu", min: -1.5, max: 2.5, step: 0.25, init: 0.5 },
    draw: (x) => {
      const A = v(0, 0);
      const B = v(5, -0.4);
      const C = v(5.6, 3);
      const D = v(x, 3.6);
      const [E, F, G, H] = [mid(A, B), mid(B, C), mid(C, D), mid(D, A)];
      const area = (ps: V[]) =>
        Math.abs(ps.reduce((s, p, i) => s + p[0] * ps[(i + 1) % ps.length][1] - ps[(i + 1) % ps.length][0] * p[1], 0)) / 2;
      return {
        els: [
          quad([A, B, C, D]),
          seg(A, C, { thin: true, tone: "muted", dash: true }),
          seg(B, D, { thin: true, tone: "muted", dash: true }),
          poly([E, F, G, H], { fill: "a", tone: "a" }),
          par(E, F, 1, "a"),
          par(H, G, 1, "a"),
          par(F, G, 2, "a"),
          par(E, H, 2, "a"),
          ...labelAll([A, B, C, D], ["A", "B", "C", "D"], ["sw", "se", "ne", "nw"]),
          ...labelAll([E, F, G, H], ["E", "F", "G", "H"], ["s", "e", "n", "w"]),
        ],
        readout: [`Alan(EFGH) / Alan(ABCD) = ${fmt(area([E, F, G, H]) / area([A, B, C, D]), 3)}`],
      };
    },
  },
  "Açıortaylarda hangi açıları yarıya böldüğünü yaz": {
    caption:
      "B ve C açıortayları E'de kesişir. BEC üçgeninde B/2 ve C/2 bulunduğundan ∠BEC = 180° − (B + C)/2 = (A + D)/2 olur.",
    alt: "ABCD dörtgeninde B ve C iç açılarının açıortayları E noktasında buluşuyor; BEC üçgeni boyalı ve E'deki açı işaretli.",
    draw: () => {
      const [A, B, C, D] = [v(0.4, 4), v(0, 0), v(6, 0), v(5, 4.4)];
      const bisB = add(B, add(unit(sub(A, B)), unit(sub(C, B))));
      const bisC = add(C, add(unit(sub(B, C)), unit(sub(D, C))));
      const E = meet(B, bisB, C, bisC);
      const ps = [A, B, C, D];
      const a = interior(ps, 0);
      const d = interior(ps, 3);
      return {
        els: [
          poly([B, E, C], { fill: "a", thin: true }),
          quad(ps),
          seg(B, E, { tone: "b" }),
          seg(C, E, { tone: "c" }),
          ang(B, C, E, undefined, { tone: "b", r: 34 }),
          ang(B, E, A, undefined, { tone: "b", r: 40 }),
          ang(C, E, B, undefined, { tone: "c", r: 34 }),
          ang(C, D, E, undefined, { tone: "c", r: 40 }),
          ang(E, C, B, `${fmt(angleAt(E, B, C), 1)}°`, { tone: "a", r: 24 }),
          ...labelAll([A, B, C, D, E], ["A", "B", "C", "D", "E"], ["nw", "sw", "se", "ne", "n"]),
        ],
        readout: [`A ≈ ${fmt(a, 1)}°, D ≈ ${fmt(d, 1)}° ⇒ (A + D)/2 ≈ ${fmt((a + d) / 2, 1)}°`],
      };
    },
  },
  "Yamukta köşegen oranı ve benzerlik": {
    caption:
      "AB = 9, CD = 6 olan yamukta AOB ile COD benzerdir. Bu yüzden köşegen parçaları AO/OC = BO/OD = 9/6 = 3/2 oranındadır.",
    alt: "AB alt tabanı 9, CD üst tabanı 6 olan yamuk; köşegenler O'da kesişiyor, AOB ve COD üçgenleri iki renkle.",
    draw: () => {
      const [A, B, C, D] = trap(9, 6, 4, 1.2);
      const O = meet(A, C, B, D);
      return {
        els: [
          poly([A, O, B], { fill: "a", thin: true }),
          poly([C, O, D], { fill: "b", thin: true }),
          quad([A, B, C, D]),
          seg(A, C),
          seg(B, D),
          dim(A, B, "9", C),
          dim(D, C, "6", A),
          ...labelAll([A, B, C, D, O], ["A", "B", "C", "D", "O"], ["sw", "se", "ne", "nw", "e"]),
        ],
        readout: [`AO/OC ≈ ${fmt(dist(A, O) / dist(O, C), 3)} · BO/OD ≈ ${fmt(dist(B, O) / dist(O, D), 3)}`],
      };
    },
  },
  "Çember koşulları ve kullanmadan önce kontrol": {
    caption:
      "Kirişler dörtgeninde köşeler aynı çember üzerindedir ve karşı açılar 180° tamamlar. Teğetler dörtgeninde aynı köşeden çıkan teğet parçaları eşittir; karşı kenar toplamları eşit olur.",
    alt: "İlk adımda çembere içten çizilmiş dörtgen ve karşı açıları; ikinci adımda kenarları çembere teğet dörtgen ve eşit teğet parçaları.",
    steps: ["Kirişler dörtgeni", "Teğetler dörtgeni"],
    draw: (_, step) => {
      const O = v(0, 0);
      if (step === 0) {
        const ps = [200, 305, 15, 110].map((t) => pol(3, t));
        const ins = ps.map((_, i) => interior(ps, i));
        return {
          els: [
            circle(O, 3, { tone: "muted", thin: true }),
            quad(ps, "muted"),
            ang(ps[0], ps[1], ps[3], `${fmt(ins[0], 0)}°`, { tone: "a", fill: true }),
            ang(ps[2], ps[3], ps[1], `${fmt(ins[2], 0)}°`, { tone: "a", fill: true }),
            ang(ps[1], ps[2], ps[0], `${fmt(ins[1], 0)}°`, { tone: "b", fill: true }),
            ang(ps[3], ps[0], ps[2], `${fmt(ins[3], 0)}°`, { tone: "b", fill: true }),
            ...labelAll(ps, ["A", "B", "C", "D"], ["sw", "se", "ne", "nw"]),
          ],
          readout: [
            `A + C = ${fmt(ins[0] + ins[2], 0)}° · B + D = ${fmt(ins[1] + ins[3], 0)}°`,
          ],
        };
      }
      const ts = [250, 340, 60, 150];
      const tp = ts.map((t) => pol(2, t));
      const vs = ts.map((t, i) => {
        const u = ts[(i + ts.length - 1) % ts.length];
        const half = ((t - u + 360) % 360) / 2;
        return pol(2 / Math.cos((half * Math.PI) / 180), u + half);
      });
      const s = vs.map((p, i) => dist(p, vs[(i + 1) % 4]));
      return {
        els: [
          circle(O, 2, { tone: "b" }),
          quad(vs),
          ...tp.map((p) => pt(p, undefined, "n", "b")),
          ...vs.flatMap((p, i) => [ticks(p, tp[i], i + 1, "a"), ticks(p, tp[(i + vs.length - 1) % vs.length], i + 1, "a")]),
          ...labelAll(vs, ["A", "B", "C", "D"], ["sw", "se", "ne", "nw"]),
        ],
        readout: [`AB + CD ≈ ${fmt(s[0] + s[2], 2)} · BC + DA ≈ ${fmt(s[1] + s[3], 2)}`],
      };
    },
  },
};

const yamukDeltoid: Record<string, FigureDef> = {
  "İsimden önce verilen dörtgeni oku": {
    caption:
      "AB ∥ CD ise AB ve CD tabandır, AD ve BC yan kenardır. AC ve BD ise köşegendir; bir köşegen yan kenar değildir.",
    alt: "Yamuk ABCD; tabanlar mavi, yan kenarlar turuncu, köşegenler kesikli gri.",
    draw: () => {
      const [A, B, C, D] = trap(8, 4.4, 3.4, 1.4);
      return {
        els: [
          seg(A, C, { dash: true, tone: "muted" }),
          seg(B, D, { dash: true, tone: "muted" }),
          seg(A, B, { tone: "b", bold: true }),
          seg(D, C, { tone: "b", bold: true }),
          seg(A, D, { tone: "a" }),
          seg(B, C, { tone: "a" }),
          par(A, B, 1, "b"),
          par(D, C, 1, "b"),
          dim(A, B, "taban", C, "b"),
          dim(D, C, "taban", A, "b"),
          dim(A, D, "yan kenar", B, "a"),
          ...labelAll([A, B, C, D], ["A", "B", "C", "D"], ["sw", "se", "ne", "nw"]),
        ],
      };
    },
  },
  "Paralellik açıları, yükseklik ise alanı belirler": {
    caption:
      "Üst tabanı kaydır: A açısı değişir, D açısı hep 180° − A kalır. Yükseklik değişmez; dikmenin ayağı taban parçasının dışına düşse bile tabanlar arası uzaklık aynıdır.",
    alt: "Alt tabanı sabit yamuk; üst taban yatay kaydırılıyor. D'den alt taban doğrusuna inen kesikli yükseklik ve A ile D açıları.",
    param: { label: "Üst tabanı kaydır", min: -2.5, max: 4.5, step: 0.25, init: 1.1 },
    draw: (dx) => {
      const [A, B, C, D] = trap(7, 4, 3, dx);
      const H = v(dx, 0);
      const a = angleAt(A, B, D);
      return {
        els: [
          line(v(Math.min(-2.8, dx - 0.4), 0), v(9, 0), { tone: "muted", thin: true, ext: 0 }),
          quad([A, B, C, D], "muted"),
          seg(D, H, { dash: true, tone: "a" }),
          right(H, B[0] > H[0] ? B : A, D, "a"),
          dim(D, H, "h = 3", C, "a"),
          ang(A, B, D, `${fmt(a, 0)}°`, { tone: "b", fill: true }),
          ang(D, A, C, `${fmt(180 - a, 0)}°`, { tone: "c", fill: true }),
          ...labelAll([A, B, C, D], ["A", "B", "C", "D"], ["sw", "se", "ne", "nw"]),
        ],
        readout: [`A + D = ${fmt(a, 0)}° + ${fmt(180 - a, 0)}° = 180°`, "Alan = (7 + 4)·3/2 = 16,5"],
      };
    },
  },
  "Orta tabanı ortalama olarak kur": {
    caption:
      "Kısa tabanı değiştir: orta taban EF her zaman iki tabanın ortalamasıdır ve köşegenler onu c/2, (a − c)/2, c/2 parçalarına ayırır.",
    alt: "Alt tabanı 10 olan yamuk; üst taban sürgüyle değişiyor. EF orta tabanı ve köşegenlerin EF üzerindeki K, L kesişimleri.",
    param: { label: "Kısa taban c", min: 2, max: 9, step: 0.5, init: 4 },
    draw: (c) => {
      const a = 10;
      const [A, B, C, D] = trap(a, c, 4, (a - c) / 2 - 0.6);
      const E = mid(A, D);
      const F = mid(B, C);
      const K = meet(E, F, A, C);
      const L = meet(E, F, B, D);
      return {
        els: [
          quad([A, B, C, D]),
          seg(A, C, { thin: true, tone: "muted" }),
          seg(B, D, { thin: true, tone: "muted" }),
          seg(E, K, { tone: "b", bold: true }),
          seg(K, L, { tone: "a", bold: true }),
          seg(L, F, { tone: "b", bold: true }),
          dim(A, B, "a = 10", C),
          dim(D, C, `c = ${fmt(c)}`, A),
          ...labelAll([E, F, K, L], ["E", "F", "K", "L"], ["w", "e", "n", "n"]),
        ],
        readout: [
          `EK = LF = ${fmt(c / 2, 2)} · KL = ${fmt((a - c) / 2, 2)}`,
          `EF = (10 + ${fmt(c)})/2 = ${fmt((a + c) / 2, 2)}`,
        ],
      };
    },
  },
  "Alan formülünü iki üçgenden çıkar": {
    caption:
      "AC köşegeni yamuğu ABC ve ACD üçgenlerine ayırır. İkisinin yüksekliği aynı h'dir: alan ah/2 + ch/2 = (a + c)h/2.",
    alt: "AB = 8, CD = 4, yüksekliği 3 olan yamuk; AC köşegeniyle ABC ve ACD üçgenleri iki renkte, ortak yükseklik kesikli.",
    draw: () => {
      const [A, B, C, D] = trap(8, 4, 3, 1.6);
      const H1 = foot(C, A, B);
      const H2 = foot(A, D, C);
      return {
        els: [
          poly([A, B, C], { fill: "b", thin: true }),
          poly([A, C, D], { fill: "c", thin: true }),
          quad([A, B, C, D]),
          seg(A, C),
          seg(C, H1, { dash: true, tone: "b" }),
          right(H1, B, C, "b"),
          line(D, C, { thin: true, tone: "muted", dash: true, ext: 2.2 }),
          seg(A, H2, { dash: true, tone: "c" }),
          dim(A, B, "8", C),
          dim(D, C, "4", A),
          dim(C, H1, "3", B, "b"),
          ...labelAll([A, B, C, D], ["A", "B", "C", "D"], ["sw", "se", "ne", "nw"]),
        ],
        readout: ["ABC: 8·3/2 = 12 · ACD: 4·3/2 = 6", "Toplam (8 + 4)·3/2 = 18 birimkare"],
      };
    },
  },
  "İkizkenar yamukta simetriyi gerçekten doğrula": {
    caption:
      "b = 20, a = 8, ℓ = 10: kısa tabanın uçlarından inen dikmeler 12'lik farkı iki yana 6 ve 6 olarak böler; h = √(100 − 36) = 8.",
    alt: "Alt tabanı 20, üst tabanı 8, yan kenarları 10 olan ikizkenar yamuk; kesikli simetri ekseni, iki dikme ve yanlarda 6'şar birimlik parçalar.",
    draw: () => {
      const [A, B, C, D] = trap(20, 8, 8, 6).map((p) => mul(p, 0.4));
      const H1 = foot(D, A, B);
      const H2 = foot(C, A, B);
      return {
        els: [
          quad([A, B, C, D], "muted"),
          seg(v(4, -0.4), v(4, 3.2), { dash: true, tone: "a" }),
          seg(D, H1, { dash: true, tone: "b" }),
          seg(C, H2, { dash: true, tone: "b" }),
          right(H1, B, D, "b"),
          right(H2, A, C, "b"),
          ticks(A, D, 1),
          ticks(B, C, 1),
          ang(A, B, D, undefined, { tone: "c" }),
          ang(B, C, A, undefined, { tone: "c" }),
          dim(A, H1, "6", D, "b"),
          dim(H2, B, "6", C, "b"),
          dim(D, H1, "8", B),
          dim(A, D, "10", B),
          dim(D, C, "8", A),
          ...labelAll([A, B, C, D], ["A", "B", "C", "D"], ["sw", "se", "ne", "nw"]),
        ],
        readout: ["(20 − 8)/2 = 6", "h = √(10² − 6²) = 8"],
      };
    },
  },
  "Dik yamuk ve dik köşegen koşulunu ayır": {
    caption:
      "İlk adım: dik yamukta eğik kenar 9 ve 12'lik dik üçgenin hipotenüsüdür. İkinci adım: köşegenlerin de dik olması ayrı bir koşuldur, h² = ac ister.",
    alt: "İlk adımda tabanları 14 ve 5, yüksekliği 12 olan dik yamuk; ikinci adımda a = 8, c = 2, h = 4 olan ve köşegenleri dik kesişen dik yamuk.",
    steps: ["Eğik kenar", "Köşegenler dik: h² = ac"],
    draw: (_, step) => {
      if (step === 0) {
        const [A, B, C, D] = trap(14, 5, 12, 0).map((p) => mul(p, 0.35));
        const P = foot(C, A, B);
        return {
          els: [
            quad([A, B, C, D]),
            right(A, B, D),
            right(D, A, C),
            poly([P, B, C], { fill: "a", thin: true, tone: "a" }),
            seg(C, P, { dash: true, tone: "a" }),
            dim(P, B, "9", C, "a"),
            dim(C, P, "12", B, "a"),
            dim(B, C, "15", A, "a"),
            dim(D, C, "5", A),
            ...labelAll([A, B, C, D], ["A", "B", "C", "D"], ["sw", "se", "ne", "nw"]),
          ],
          readout: ["√(9² + 12²) = 15"],
        };
      }
      const [A, B, C, D] = trap(8, 2, 4, 0).map((p) => mul(p, 0.6));
      const O = meet(A, C, B, D);
      return {
        els: [
          quad([A, B, C, D]),
          right(A, B, D),
          seg(A, C, { tone: "b" }),
          seg(B, D, { tone: "b" }),
          right(O, C, D, "b"),
          dim(A, B, "a = 8", C),
          dim(D, C, "c = 2", A),
          dim(A, D, "h = 4", B),
          ...labelAll([A, B, C, D, O], ["A", "B", "C", "D", "O"], ["sw", "se", "ne", "nw", "s"]),
        ],
        readout: ["AC·BD = −ac + h² = −16 + 16 = 0 ⇒ dik"],
      };
    },
  },
  "Köşegen kesişiminden oran ve alan çıkar": {
    caption:
      "a = 10, c = 6, h = 8 olan yamukta köşegenler dört bölge oluşturur: COD = 9, AOB = 25, yan bölgeler √(9·25) = 15 ve toplam 64.",
    alt: "Köşegenleriyle dört üçgene ayrılmış yamuk; üstte 9, altta 25, iki yanda 15'er birimkarelik bölgeler.",
    draw: () => {
      const [A, B, C, D] = trap(10, 6, 8, 2).map((p) => mul(p, 0.5));
      const O = meet(A, C, B, D);
      const ar = (p: V, q: V, r: V) => Math.abs((q[0] - p[0]) * (r[1] - p[1]) - (r[0] - p[0]) * (q[1] - p[1])) / 2 / 0.25;
      const regions: [V[], string, "a" | "b" | "c"][] = [
        [[C, O, D], fmt(ar(C, O, D), 0), "b"],
        [[C, O, B], fmt(ar(C, O, B), 0), "c"],
        [[A, O, B], fmt(ar(A, O, B), 0), "a"],
        [[A, O, D], fmt(ar(A, O, D), 0), "c"],
      ];
      return {
        els: [
          ...regions.map(([ps, , t]) => poly(ps, { fill: t, thin: true })),
          quad([A, B, C, D]),
          seg(A, C),
          seg(B, D),
          ...regions.map(([ps, s]) => txt(mul(add(add(ps[0], ps[1]), ps[2]), 1 / 3), s, "c", { bold: true })),
          ...labelAll([A, B, C, D, O], ["A", "B", "C", "D", "O"], ["sw", "se", "ne", "nw", "e"]),
        ],
        readout: ["S₂ = S₄ = √(9·25) = 15", "Toplam 9 + 15 + 25 + 15 = 64"],
      };
    },
  },
  "Deltoidin simetri köşegenini eş kenarlardan bul": {
    caption:
      "A ve C, B ile D'ye eşit uzaklıkta olduğu için AC, BD'nin orta dikmesidir. AC, A ve C açılarını ikiye böler; ama BD, AC'yi ortalamaz (AK ≠ KC).",
    alt: "Deltoid ABCD; AC ekseni BD'yi K'de dik kesiyor, BK = KD işaretli. A ve C açılarının yarıları eş yaylarla; AK ile KC farklı uzunlukta.",
    draw: () => {
      const K = v(0, 0);
      const A = v(-5, 0);
      const C = v(9, 0);
      const B = v(0, -12);
      const D = v(0, 12);
      const s = 0.25;
      const [a, b, c, d, k] = [A, B, C, D, K].map((p) => mul(p, s));
      return {
        els: [
          quad([a, b, c, d], "muted"),
          seg(a, c, { tone: "a" }),
          seg(b, d, { tone: "muted" }),
          right(k, c, d, "a"),
          ticks(b, k, 1, "a"),
          ticks(k, d, 1, "a"),
          ticks(a, b, 1),
          ticks(a, d, 1),
          ticks(c, b, 2),
          ticks(c, d, 2),
          ang(a, b, k, undefined, { tone: "b", r: 26 }),
          ang(a, k, d, undefined, { tone: "b", r: 32 }),
          ang(c, k, b, undefined, { tone: "c", r: 26 }),
          ang(c, d, k, undefined, { tone: "c", r: 32 }),
          dim(a, k, "AK = 5", d, "b"),
          dim(k, c, "KC = 9", d, "c"),
          ...labelAll([a, b, c, d, k], ["A", "B", "C", "D", "K"], ["w", "s", "e", "n", "ne"]),
        ],
      };
    },
  },
  "Deltoidde alanı dört dik üçgenle tamamla": {
    caption:
      "u = 13, v = 15, BD = 24 için BK = 12; AK = √(169 − 144) = 5, KC = √(225 − 144) = 9, AC = 14. Alan 14·24/2 = 168.",
    alt: "Köşegenleri dik deltoid; dört küçük dik üçgen iki renkle, kenar uzunlukları 13 ve 15, köşegen parçaları 5, 9, 12 ve 12.",
    draw: () => {
      const s = 0.25;
      const [A, B, C, D, K] = [v(-5, 0), v(0, -12), v(9, 0), v(0, 12), v(0, 0)].map((p) => mul(p, s));
      return {
        els: [
          poly([K, A, B], { fill: "a", thin: true }),
          poly([K, B, C], { fill: "b", thin: true }),
          poly([K, C, D], { fill: "b", thin: true }),
          poly([K, D, A], { fill: "a", thin: true }),
          quad([A, B, C, D]),
          seg(A, C),
          seg(B, D),
          right(K, C, D),
          dim(A, B, "13", C, "a"),
          dim(A, D, "13", C, "a"),
          dim(B, C, "15", A, "b"),
          dim(C, D, "15", A, "b"),
          dim(K, B, "12", A),
          ...labelAll([A, B, C, D, K], ["A", "B", "C", "D", "K"], ["w", "s", "e", "n", "ne"]),
        ],
        readout: ["AC = 5 + 9 = 14", "Alan = 14·24/2 = 168 · Çevre = 2(13 + 15) = 56"],
      };
    },
  },
  "Soruda işe yarayan yardımcı çizgiyi seç": {
    caption:
      "Yamukta uzunluk için dikmeler, alan için ortak yükseklik işe yarar. Deltoidde simetri köşegeni yarım köşegen ve bir kenarla dik üçgen kurar.",
    alt: "İlk adımda iki dikmesi çizilmiş yamuk; ikinci adımda simetri köşegeni ve bir dik üçgeni boyalı deltoid.",
    steps: ["Yamukta dikme", "Deltoidde simetri köşegeni"],
    draw: (_, step) => {
      if (step === 0) {
        const [A, B, C, D] = trap(8, 4, 3, 1.4);
        const H1 = foot(D, A, B);
        const H2 = foot(C, A, B);
        return {
          els: [
            quad([A, B, C, D]),
            seg(D, H1, { dash: true, tone: "a" }),
            seg(C, H2, { dash: true, tone: "a" }),
            right(H1, B, D, "a"),
            right(H2, A, C, "a"),
            poly([A, H1, D], { fill: "a", thin: true, tone: "a" }),
            poly([H2, B, C], { fill: "a", thin: true, tone: "a" }),
            ...labelAll([A, B, C, D], ["A", "B", "C", "D"], ["sw", "se", "ne", "nw"]),
          ],
          readout: ["Dikmeler iki dik üçgen ve bir dikdörtgen kurar"],
        };
      }
      const [A, B, C, D, K] = [v(-1.5, 0), v(0, -2.4), v(4, 0), v(0, 2.4), v(0, 0)];
      return {
        els: [
          poly([K, B, C], { fill: "b", thin: true, tone: "b" }),
          quad([A, B, C, D]),
          seg(A, C, { tone: "a" }),
          seg(B, D, { tone: "muted" }),
          right(K, C, D),
          ...labelAll([A, B, C, D, K], ["A", "B", "C", "D", "K"], ["w", "s", "e", "n", "ne"]),
        ],
        readout: ["KBC: (BD/2)² + KC² = BC²"],
      };
    },
  },
};

export const geometryFigures032a: Record<string, Record<string, FigureDef>> = {
  "tyt-geo-cokgenler-032": cokgenler,
  "tyt-geo-dortgen-hiyerarsi-032": dortgenHiyerarsi,
  "tyt-geo-yamuk-deltoid-032": yamukDeltoid,
};
