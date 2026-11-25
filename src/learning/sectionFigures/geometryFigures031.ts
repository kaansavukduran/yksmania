import {
  add,
  ang,
  angleAt,
  circle,
  centroid,
  circumcenter,
  dim,
  dist,
  fmt,
  foot,
  incenter,
  lerp,
  line,
  meet,
  mid,
  mul,
  orthocenter,
  par,
  pol,
  poly,
  pt,
  ray,
  right,
  rot,
  seg,
  sub,
  ticks,
  txt,
  unit,
  v,
  type El,
  type FigureDef,
  type V,
} from "./figureKit";

/** Apex of a triangle on base B(0,0)–C(base,0) with the given base angles. */
function fromAngles(base: number, b: number, c: number): [V, V, V] {
  const B = v(0, 0);
  const C = v(base, 0);
  const A = meet(B, pol(1, b), C, pol(1, 180 - c, C));
  return [A, B, C];
}
/** Third vertex for |AB| = ab and |AC| = ac on base B(0,0)–C(bc,0). */
function fromSides(bc: number, ab: number, ac: number): V | undefined {
  const x = (bc * bc + ab * ab - ac * ac) / (2 * bc);
  const y2 = ab * ab - x * x;
  if (y2 < -1e-9) return undefined;
  return v(x, Math.sqrt(Math.max(0, y2)));
}
const tri = (A: V, B: V, C: V, fill?: "a" | "b" | "c" | "muted") =>
  poly([A, B, C], { fill });
const r0 = (x: number) => Math.round(x);
const numberLine = (
  y: number,
  from: number,
  to: number,
  marks: number[],
): El[] => [
  line(v(from, y), v(to, y), { tone: "muted", thin: true, ext: 0.4 }),
  ...marks.flatMap((m) => [
    seg(v(m, y - 0.18), v(m, y + 0.18), { tone: "muted", thin: true }),
    txt(v(m, y - 0.25), String(m), "s", { tone: "muted", small: true }),
  ]),
];

export const linearPairBisectors031 = {
  caption:
    "Bir doğru üzerinde komşu bütünler iki açının iç açıortaylarını çiz. Sürgüyle açıyı değiştir: iki açıortay arasındaki açı hep 90° kalır.",
  alt: "Yatay bir doğru üzerindeki O noktasından çıkan ışın iki bütünler açı oluşturur; iki açıortay kesikli çizilmiş ve aralarında dik açı işareti var.",
  param: { label: "α", min: 30, max: 150, step: 2, init: 110, unit: "°" },
  draw: (a) => {
    const O = v(0, 0);
    const E = v(3.2, 0);
    const W = v(-3.2, 0);
    const R = pol(3.2, a);
    const b1 = pol(2.6, a / 2);
    const b2 = pol(2.6, (a + 180) / 2);
    return {
      els: [
        line(W, E, { ext: 0.2 }),
        ray(O, R, { ext: 0.2 }),
        ray(O, b1, { tone: "a", dash: true, ext: 0.1 }),
        ray(O, b2, { tone: "b", dash: true, ext: 0.1 }),
        ang(O, E, b1, `${a / 2}°`, { r: 40, tone: "a" }),
        ang(O, b1, R, undefined, { r: 40, tone: "a" }),
        ang(O, R, b2, `${(180 - a) / 2}°`, { r: 52, tone: "b" }),
        ang(O, b2, W, undefined, { r: 52, tone: "b" }),
        right(O, b1, b2, "ink"),
        pt(O, "O", "s"),
      ],
      readout: [`${a / 2}° + ${(180 - a) / 2}° = 90°`],
    };
  },
} satisfies FigureDef;

const temelAcilar: Record<string, FigureDef> = {
  "Şekli okumaya isimlerden başla": {
    caption:
      "Üç satır aynı A ve B noktalarını kullanır; uçtaki ok sonsuz devamı, dolu nokta sınırı gösterir. Sağda ∠ABC'nin köşesi ortadaki harf B'dir.",
    alt: "Üstte iki yönde oklu AB doğrusu, ortada A'dan başlayıp B yönünde oklu ışın, altta iki dolu uçlu AB doğru parçası. Sağda B köşeli, BA ve BC kollu bir açı.",
    draw: () => {
      const rows: [number, string, El][] = [
        [3, "AB doğrusu", line(v(0, 3), v(3, 3), { ext: 0.9 })],
        [1.6, "[AB ışını", ray(v(0, 1.6), v(3, 1.6), { ext: 0.9 })],
        [0.2, "[AB] doğru parçası", seg(v(0, 0.2), v(3, 0.2))],
      ];
      const B = v(9.6, 0.2);
      const A = pol(2.8, 62, B);
      const C = v(12.6, 0.2);
      return {
        els: [
          ...rows.flatMap(([y, name, el]) => [
            el,
            pt(v(0, y), "A", "n"),
            pt(v(3, y), "B", "n"),
            txt(v(4.2, y), name, "e", { small: true, tone: "muted" }),
          ]),
          ray(B, A, { ext: 0.5 }),
          ray(B, C, { ext: 0.5 }),
          ang(B, C, A, "∠ABC", { r: 38 }),
          pt(B, "B (köşe)", "s", "a"),
          pt(A, "A", "w"),
          pt(C, "C", "n"),
        ],
      };
    },
  },
  "Açıyı uzunlukla değil dönüşle ölç": {
    caption:
      "Hareketli kolu döndür: ölçü dönüş miktarıdır. Sınıf adı yalnız sınır değerlerde değişir; 90° ve 180° kendi adlarını alır.",
    alt: "O köşesinden sağa giden sabit bir kol ve sürgüyle dönen ikinci kol; aradaki açı yayı ve ölçüsü.",
    param: { label: "Dönüş", min: 5, max: 360, step: 5, init: 60, unit: "°" },
    draw: (a) => {
      const O = v(0, 0);
      const P = v(3, 0);
      const Q = pol(3, a);
      const name =
        a < 90
          ? "dar açı"
          : a === 90
            ? "dik açı"
            : a < 180
              ? "geniş açı"
              : a === 180
                ? "doğru açı"
                : a < 360
                  ? "180° ile 360° arasında"
                  : "tam açı";
      const els: El[] = [
        ray(O, P, { ext: 0.3 }),
        ray(O, Q, { ext: 0.3, tone: "b" }),
        pt(O, "O", "sw"),
        // Invisible frame so the drawing does not jump while turning.
        txt(v(-3.4, -3.4), "", "c"),
        txt(v(3.4, 3.4), "", "c"),
      ];
      if (a >= 360) els.push(circle(O, 0.62, { tone: "a" }));
      else if (a === 90) els.push(right(O, P, Q, "a"));
      else els.push(ang(O, P, Q, undefined, { r: 34, fill: true, reflex: a > 180 }));
      return {
        els,
        readout: [
          `${a}° · ${name}`,
          `Tam dönüşe oranı: %${fmt(a / 3.6, 1)}`,
        ],
      };
    },
  },
  "Toplam mı eşitlik mi?": {
    caption:
      "Solda bir dik açı iki parçaya ayrılır (tümler), sağda bir doğru açı ayrılır (bütünler). Aynı α için iki ayrı tamamlayıcı ölçü çıkar.",
    alt: "Sol şekilde 90° iki parçaya, sağ şekilde 180° iki parçaya ayrılmış; parçalar α ve tamamlayıcısı olarak işaretli.",
    param: { label: "α", min: 10, max: 80, step: 1, init: 35, unit: "°" },
    draw: (a) => {
      const O1 = v(0, 0);
      const O2 = v(7.5, 0);
      const X1 = v(3, 0);
      const Y1 = v(0, 3);
      const R1 = pol(3, a, O1);
      const L2 = v(4.5, 0);
      const X2 = v(10.5, 0);
      const R2 = pol(3, a, O2);
      return {
        els: [
          ray(O1, X1, { ext: 0.2 }),
          ray(O1, Y1, { ext: 0.2 }),
          ray(O1, R1, { ext: 0.2, tone: "b" }),
          right(O1, X1, Y1, "muted"),
          ang(O1, X1, R1, "α", { r: 46, fill: true }),
          ang(O1, R1, Y1, `${90 - a}°`, { r: 46, tone: "b", fill: true }),
          txt(v(1.5, -0.7), "Tümler: toplam 90°", "c", { small: true }),
          line(L2, X2, { ext: 0.2 }),
          ray(O2, R2, { ext: 0.2, tone: "b" }),
          ang(O2, X2, R2, "α", { r: 40, fill: true }),
          ang(O2, R2, L2, `${180 - a}°`, { r: 40, tone: "b", fill: true }),
          txt(v(7.5, -0.7), "Bütünler: toplam 180°", "c", { small: true }),
          pt(O1, undefined),
          pt(O2, undefined),
        ],
        readout: [`Tümleri: 90° − ${a}° = ${90 - a}°`, `Bütünleri: 180° − ${a}° = ${180 - a}°`],
      };
    },
  },
  "Kesişen doğrularda ters açıları izle": {
    caption:
      "İkinci doğruyu döndür: karşı karşıya duran iki açı hep eşit kalır, yan yana duran iki açı hep 180° tamamlar.",
    alt: "O noktasında kesişen yatay bir doğru ve eğik bir doğru; dört açı iki renkle işaretli, karşılıklı açılar aynı renkte.",
    param: { label: "Açı", min: 20, max: 160, step: 1, init: 68, unit: "°" },
    draw: (t) => {
      const O = v(0, 0);
      const E = v(3, 0);
      const W = v(-3, 0);
      const U = pol(3, t);
      const D = pol(3, t + 180);
      return {
        els: [
          line(W, E, { ext: 0.2 }),
          line(D, U, { ext: 0.2 }),
          ang(O, E, U, `${t}°`, { r: 36, fill: true }),
          ang(O, U, W, `${180 - t}°`, { r: 30, tone: "b", fill: true }),
          ang(O, W, D, `${t}°`, { r: 36, fill: true }),
          ang(O, D, E, `${180 - t}°`, { r: 30, tone: "b", fill: true }),
          pt(O),
        ],
        readout: [
          `Ters açılar: ${t}° = ${t}° ve ${180 - t}° = ${180 - t}°`,
          `Dört açı: ${t} + ${180 - t} + ${t} + ${180 - t} = 360°`,
        ],
      };
    },
  },
  "Paralellik açıları birbirine bağlar": {
    caption:
      "Adımlarla ilişki adını konumdan bul: aynı köşe konumu yöndeş, paraleller arasında karşı yanlar iç ters, aynı yandaki iki iç açı bütünler. Keseni döndürmek ilişkiyi değiştirmez.",
    alt: "Paralel d₁ ve d₂ doğrularını kesen bir doğru; seçilen adımdaki açı çifti renkli yaylarla işaretli.",
    param: { label: "Kesen açısı", min: 35, max: 145, step: 1, init: 60, unit: "°" },
    steps: ["Yöndeş", "İç ters", "Aynı yan iç açılar"],
    draw: (t, step) => {
      const u = pol(1, t);
      const x0 = 3 - 1 / Math.tan((t * Math.PI) / 180);
      const P2 = v(x0, 0);
      const P1 = add(P2, mul(u, 2 / Math.sin((t * Math.PI) / 180)));
      const R = v(1, 0);
      const els: El[] = [
        line(v(-0.5, 2), v(6.5, 2), { ext: 0.2 }),
        line(v(-0.5, 0), v(6.5, 0), { ext: 0.2 }),
        par(v(0.5, 2), v(1.5, 2), 1, "muted"),
        par(v(0.5, 0), v(1.5, 0), 1, "muted"),
        txt(v(6.9, 2), "d₁", "e", { tone: "muted" }),
        txt(v(6.9, 0), "d₂", "e", { tone: "muted" }),
        line(sub(P2, mul(u, 1.2)), add(P1, mul(u, 1.2)), { tone: "b", ext: 0.1 }),
        txt(v(3, -1.6), "", "c"),
        txt(v(3, 3.6), "", "c"),
      ];
      const upR = (P: V) => ang(P, add(P, R), add(P, u), `${t}°`, { fill: true, r: 30 });
      if (step === 0) els.push(upR(P1), upR(P2));
      if (step === 1)
        els.push(
          ang(P1, sub(P1, R), sub(P1, u), `${t}°`, { fill: true, r: 30 }),
          upR(P2),
        );
      if (step === 2)
        els.push(
          ang(P1, add(P1, R), sub(P1, u), `${180 - t}°`, {
            fill: true,
            r: 26,
            tone: "b",
          }),
          upR(P2),
        );
      return {
        els,
        readout: [
          step === 0
            ? `Yöndeş: ${t}° = ${t}°`
            : step === 1
              ? `İç ters: ${t}° = ${t}°`
              : `Aynı yan iç: ${180 - t}° + ${t}° = 180°`,
        ],
      };
    },
  },
  "Açıortay ve yardımcı çizgiyle yükü azalt": linearPairBisectors031,
  "Denklemden sonra şekle geri dön": {
    caption:
      "Önce ilişkiyi söyle, sonra denklemi kur, en sonda x'i istenen ifadeye geri koy. Bulduğun x tek başına açı değildir.",
    alt: "Kesişen iki doğruda karşılıklı açılar 3x + 8° ve 5x − 32° olarak verilmiş; adımlar ilerledikçe değerler yerleşir.",
    steps: ["İlişkiyi söyle", "Denklemi çöz", "x'i geri koy"],
    draw: (_, step) => {
      const O = v(0, 0);
      const E = v(3, 0);
      const W = v(-3, 0);
      const U = pol(3, 68);
      const D = pol(3, 248);
      const done = step === 2;
      return {
        els: [
          line(W, E, { ext: 0.2 }),
          line(D, U, { ext: 0.2 }),
          ang(O, E, U, done ? "68°" : "3x + 8°", { r: 34, fill: true }),
          ang(O, W, D, done ? "68°" : "5x − 32°", { r: 34, fill: true }),
          ...(done
            ? [ang(O, U, W, "112°", { r: 30, tone: "b" as const, fill: true })]
            : []),
          pt(O, undefined),
        ],
        readout:
          step === 0
            ? ["Ters açılar oldukları için eşit: 3x + 8 = 5x − 32"]
            : step === 1
              ? ["3x + 8 = 5x − 32", "40 = 2x  ⇒  x = 20"]
              : ["3·20 + 8 = 68°", "Komşusu: 180° − 68° = 112°"],
      };
    },
  },
};

const ucgendeAcilar: Record<string, FigureDef> = {
  "İki dik uzaklığın toplamı": {
    caption: "P’yi taban boyunca kaydır. ABP ile APC alanları değişir. Eş yan kenarlara inen iki dik uzaklığın toplamı yan yüksekliğe eşit kalır.",
    alt: "AB ve AC beşer birim, BC altı birim olan ikizkenar üçgen. Taban üzerindeki P noktası A ile birleşiyor. P’den AB ve AC’ye iki dik parça çizilmiş.",
    param: { label: "P’nin yatay konumu", min: -2, max: 2, step: 1, init: 1 },
    draw: (x) => {
      const A = v(0, 4);
      const B = v(-3, 0);
      const C = v(3, 0);
      const D = v(0, 0);
      const P = v(x, 0);
      const F = foot(P, A, B);
      const G = foot(P, A, C);
      const leftDistance = dist(P, F);
      const rightDistance = dist(P, G);
      return {
        els: [
          poly([A, B, P], { fill: "a", thin: true }),
          poly([A, P, C], { fill: "b", thin: true }),
          tri(A, B, C),
          seg(A, D, { tone: "muted", dash: true }),
          seg(A, P, { thin: true }),
          seg(P, F, { tone: "a", bold: true }),
          seg(P, G, { tone: "b", bold: true }),
          right(F, A, P, "a"),
          right(G, A, P, "b"),
          dim(B, A, "5", C),
          dim(A, C, "5", B),
          txt(mid(P, F), "d₁", "nw", { tone: "a" }),
          txt(mid(P, G), "d₂", "ne", { tone: "b" }),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          pt(P, "P", "s"),
        ],
        readout: [
          `d₁ = ${fmt(leftDistance, 1)}, d₂ = ${fmt(rightDistance, 1)}`,
          `d₁ + d₂ = ${fmt(leftDistance + rightDistance, 1)} birim`,
          `Alanlar: ${fmt(5 * leftDistance / 2, 1)} + ${fmt(5 * rightDistance / 2, 1)} = 12 birim²`,
          "Tepe yüksekliği 4 birim.",
        ],
      };
    },
  },
  "Açıortay ve orta nokta": {
    caption: "Aynı üçgende B’den iki farklı çizgi dene. Açıortay köşedeki iki açıyı eşitler. Kenarortay AC’deki iki parçayı eşitler.",
    alt: "ABC üçgeninin AC kenarında seçilen bir nokta. Açıortay adımında B açısı iki eş yaya ayrılıyor. Kenarortay adımında AC üzerindeki eş parçalar çizgiyle işaretleniyor.",
    steps: ["Açıortay BD", "Kenarortay BM"],
    draw: (_, step) => {
      const b = 50;
      const c = 60;
      const halfB = b / 2;
      const angleAtD = 180 - c - halfB;
      const [A, B, C] = fromAngles(6, b, c);
      const bisector = step === 0;
      const X = bisector ? meet(B, pol(1, halfB), A, C) : mid(A, C);
      const els = [
        tri(A, B, C),
        seg(B, X, { tone: "a", bold: true }),
        pt(A, "A", "n"),
        pt(B, "B", "sw"),
        pt(C, "C", "se"),
        pt(X, bisector ? "D" : "M", "ne", "a"),
      ];
      if (bisector) {
        els.push(
          ang(B, C, X, `${halfB}°`, { tone: "a", r: 45 }),
          ang(B, X, A, `${halfB}°`, { tone: "a", r: 45 }),
          ang(X, B, C, `${angleAtD}°`, { tone: "b", r: 34 }),
        );
      } else {
        els.push(ticks(A, X, 1, "a"), ticks(X, C, 1, "a"));
      }
      return {
        els,
        readout: bisector
          ? [`B: ${halfB}° + ${halfB}° = ${b}°.`, `BDC üçgeninde D: 180° − ${c}° − ${halfB}° = ${angleAtD}°.`]
          : ["AM = MC.", `B’deki parçalar yaklaşık ${fmt(angleAt(B, C, X))}° ve ${fmt(angleAt(B, X, A))}°.`],
      };
    },
  },
  "Üç köşe bir üçgeni nasıl oluşturur?": {
    caption:
      "D eklendiğinde A köşesinde iki farklı açı adı oluşur: ∠BAD, ∠BAC'nin yalnız bir parçasıdır. Ölçüyü tam olarak ait olduğu iki kolun arasına yaz.",
    alt: "ABC üçgeni ve BC üzerinde D noktası. A köşesinde küçük ∠BAD ve büyük ∠BAC ayrı yaylarla gösterilmiş.",
    draw: () => {
      const B = v(0, 0);
      const C = v(6, 0);
      const A = v(1.2, 3.6);
      const D = v(4, 0);
      return {
        els: [
          tri(A, B, C),
          seg(A, D, { tone: "b" }),
          ang(A, B, D, "∠BAD", { r: 34, tone: "b", fill: true }),
          ang(A, B, C, "∠BAC", { r: 96, tone: "a" }),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          pt(D, "D", "s", "b"),
        ],
      };
    },
  },
  "İç açı toplamını paralellikten gör": {
    caption:
      "A'dan BC'ye paralel çizince B ve C açıları iç ters açı olarak A'nın iki yanına taşınır; üçü birlikte bir doğru açı yapar.",
    alt: "ABC üçgeni; ikinci adımda A'dan geçen BC'ye paralel kesikli doğru, üçüncü adımda B ve C açılarının A'daki eşleri renkli yaylarla.",
    steps: ["Üçgeni oku", "A'dan BC'ye paralel çiz", "Açıları A'ya taşı"],
    draw: (_, step) => {
      const [A, B, C] = fromAngles(6, 50, 60);
      const els: El[] = [
        tri(A, B, C),
        ang(B, C, A, "50°", { fill: true, tone: "a" }),
        ang(C, A, B, "60°", { fill: true, tone: "b" }),
        ang(A, B, C, "70°", { fill: true, tone: "c", r: 30 }),
        pt(A, "A", "n"),
        pt(B, "B", "sw"),
        pt(C, "C", "se"),
      ];
      if (step >= 1)
        els.push(
          line(sub(A, v(3.2, 0)), add(A, v(3.2, 0)), { dash: true, ext: 0.1 }),
          par(v(2.4, 0), v(3.6, 0), 1, "muted"),
          par(add(A, v(-2.6, 0)), add(A, v(-1.6, 0)), 1, "muted"),
        );
      if (step >= 2)
        els.push(
          ang(A, sub(A, v(1, 0)), B, "50°", { fill: true, tone: "a", r: 44 }),
          ang(A, C, add(A, v(1, 0)), "60°", { fill: true, tone: "b", r: 44 }),
        );
      return {
        els,
        readout:
          step >= 2 ? ["50° + 70° + 60° = 180° (doğru açı)"] : undefined,
      };
    },
  },
  "Dış açı uzak iki iç açıyı toplar": {
    caption:
      "BC kenarını C'nin ötesine uzat. Dış açı, kendi komşu iç açısı dışındaki iki uzak iç açının toplamıdır.",
    alt: "ABC üçgeninde BC kenarı C'den sağa uzatılmış; C'deki dış açı A ve B iç açılarıyla aynı renk ailesinde gösterilmiş.",
    param: { label: "B açısı", min: 30, max: 80, step: 1, init: 50, unit: "°" },
    draw: (b) => {
      const a = 70;
      const c = 180 - a - b;
      const [A, B, C] = fromAngles(5, b, c);
      const E = v(7.6, 0);
      return {
        els: [
          tri(A, B, C),
          seg(C, E, { dash: true }),
          ang(B, C, A, `${b}°`, { fill: true, tone: "b" }),
          ang(A, B, C, `${a}°`, { fill: true, tone: "c", r: 30 }),
          ang(C, A, B, `${c}°`, { r: 24, tone: "muted" }),
          ang(C, E, A, `${a + b}°`, { fill: true, tone: "a", r: 40 }),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "s"),
          pt(E, "E", "s", "muted"),
        ],
        readout: [
          `Dış açı = ${a}° + ${b}° = ${a + b}°`,
          `Komşu iç açıyla: ${a + b}° + ${c}° = 180°`,
        ],
      };
    },
  },
  "Eş kenarın karşısına eş açı yaz": {
    caption:
      "AB = AC işaretli. Eşit olan açılar, eş kenarların karşısındaki B ve C taban açılarıdır; tepe açısı değiştikçe ikisi birlikte değişir.",
    alt: "Tepe noktası A olan ikizkenar üçgen; AB ve AC kenarlarında eşlik çentikleri, B ve C'deki taban açıları aynı renkte.",
    param: { label: "Tepe açısı α", min: 20, max: 160, step: 2, init: 40, unit: "°" },
    draw: (a) => {
      const base = (180 - a) / 2;
      const [A, B, C] = fromAngles(5, base, base);
      return {
        els: [
          tri(A, B, C),
          ticks(A, B),
          ticks(A, C),
          ang(A, B, C, `${a}°`, { fill: true, tone: "a", r: 30 }),
          ang(B, C, A, `${fmt(base)}°`, { fill: true, tone: "b" }),
          ang(C, A, B, `${fmt(base)}°`, { fill: true, tone: "b" }),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          txt(v(2.5, 3.2), "", "c"),
        ],
        readout: [`Taban açıları: (180° − ${a}°) / 2 = ${fmt(base)}°`],
      };
    },
  },
  "Açıortayları küçük üçgenlerde çalıştır": {
    caption:
      "B ve C açıortayları I'da kesişir. BIC küçük üçgeninde B/2 ve C/2 bulunur; I açısı 180°'den bunlar çıkarılarak hesaplanır.",
    alt: "ABC üçgeninde B ve C'den çıkan iç açıortaylar I noktasında buluşur; BIC üçgeni renkli, I'daki açı işaretli.",
    param: { label: "A açısı", min: 30, max: 110, step: 2, init: 60, unit: "°" },
    draw: (a) => {
      const b = (180 - a) * 0.56;
      const c = 180 - a - b;
      const [A, B, C] = fromAngles(6, b, c);
      const I = incenter(A, B, C);
      const bic = 90 + a / 2;
      return {
        els: [
          tri(A, B, C),
          poly([B, I, C], { fill: "a", thin: true }),
          seg(B, I, { tone: "b", dash: true }),
          seg(C, I, { tone: "c", dash: true }),
          ang(B, C, I, undefined, { tone: "b", r: 40 }),
          ang(B, I, A, undefined, { tone: "b", r: 46 }),
          ang(C, I, B, undefined, { tone: "c", r: 40 }),
          ang(C, A, I, undefined, { tone: "c", r: 46 }),
          ang(I, C, B, `${fmt(bic)}°`, { tone: "a", r: 26 }),
          ang(A, B, C, `${a}°`, { tone: "muted", r: 22 }),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          pt(I, "I", "n", "a"),
        ],
        readout: [`∠BIC = 90° + A/2 = 90° + ${fmt(a / 2)}° = ${fmt(bic)}°`],
      };
    },
  },
  "İkizkenarda aynı çizgi farklı görevler taşır": {
    caption:
      "A'dan çizilen yükseklik (mavi) ve iç açıortay (turuncu) yalnız B = C olduğunda çakışır. Aradaki açı |B − C|/2'dir.",
    alt: "ABC üçgeninde A'dan BC'ye inen yükseklik dik işaretli, A açısının açıortayı ayrı çizgi. C açısı değiştikçe iki çizgi arasındaki açı değişir.",
    param: { label: "C açısı", min: 30, max: 80, step: 1, init: 70, unit: "°" },
    draw: (c) => {
      const b = 50;
      const [A, B, C] = fromAngles(6, b, c);
      const H = foot(A, B, C);
      const D = meet(A, add(A, add(unit(sub(B, A)), unit(sub(C, A)))), B, C);
      const gap = Math.abs(b - c) / 2;
      const els: El[] = [
        tri(A, B, C),
        seg(A, H, { tone: "b" }),
        right(H, C, A, "b"),
        pt(A, "A", "n"),
        pt(B, "B", "sw"),
        pt(C, "C", "se"),
        pt(H, "H", gap > 0.01 && D[0] > H[0] ? "sw" : gap > 0.01 ? "se" : "s", "b"),
      ];
      if (gap > 0.01) {
        els.push(
          seg(A, D, { tone: "a" }),
          // H and D are close when the gap is small: push their labels apart.
          pt(D, "D", D[0] > H[0] ? "se" : "sw", "a"),
          ang(A, H, D, `${fmt(gap)}°`, { r: 70, tone: "a" }),
        );
      }
      return {
        els,
        readout: [
          gap > 0.01
            ? `Yükseklik ile açıortay arası: |${b}° − ${c}°| / 2 = ${fmt(gap)}°`
            : "B = C: ikizkenar üçgen, yükseklik ve açıortay aynı çizgi",
        ],
      };
    },
  },
  "Birleşik şekillerde çözümü parçalara ayır": {
    caption:
      "D, BC üzerinde olduğu için D'deki iki açı doğrusal çifttir. ABD'de bulduğun açıyı ACD'ye eşit taşıma; bütünlerini kullan.",
    alt: "BC kenarı üzerinde D noktası ve AD parçası; D'de ∠ADB = 75° ve ∠ADC = 105° iki renkle gösterilmiş.",
    draw: () => {
      const B = v(0, 0);
      const C = v(7, 0);
      const D = v(3, 0);
      const A = pol(3.2, 105, D);
      return {
        els: [
          poly([A, B, D], { fill: "b", thin: true }),
          poly([A, D, C], { fill: "a", thin: true }),
          tri(A, B, C),
          seg(A, D),
          ang(D, A, B, "75°", { tone: "b", fill: true }),
          ang(D, C, A, "105°", { tone: "a", fill: true }),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          pt(D, "D", "s"),
        ],
        readout: ["∠ADB + ∠ADC = 75° + 105° = 180°"],
      };
    },
  },
};

const ucgenEsitsizligi: Record<string, FigureDef> = {
  "Uzunluk listesi her zaman üçgen değildir": {
    caption:
      "2 ve 3 uzunluğundaki kollar 6'lık tabanın uçlarından ne kadar döndürülse de buluşamaz: 2 + 3 < 6. Yaylar kolların uçlarının gidebileceği yerlerdir.",
    alt: "6 birimlik taban; sol uçta 2 yarıçaplı, sağ uçta 3 yarıçaplı kesikli çemberler. Çemberler kesişmez, aralarında 1 birim boşluk kalır.",
    draw: () => {
      const B = v(0, 0);
      const C = v(6, 0);
      return {
        els: [
          circle(B, 2, { dash: true, tone: "b", thin: true }),
          circle(C, 3, { dash: true, tone: "a", thin: true }),
          seg(B, C),
          seg(B, v(2, 0), { tone: "b", bold: true }),
          seg(C, v(3, 0), { tone: "a", bold: true }),
          dim(v(2, 0), v(3, 0), "boşluk 1", -1, "warn"),
          dim(B, C, "6", v(3, -1)),
          pt(B, "B", "w"),
          pt(C, "C", "e"),
          txt(v(1, 2.3), "2", "c", { tone: "b" }),
          txt(v(4.5, 3.3), "3", "c", { tone: "a" }),
        ],
        readout: ["2 + 3 = 5 < 6 ⇒ uçlar kapanmaz, üçgen yok"],
      };
    },
  },
  "Bilinmeyen kenarı iki açık sınır arasında tut": {
    caption:
      "AB = 4 ve AC = 9 sabit; BC = c'yi değiştir. Üçgen yalnız 5 < c < 13 iken kurulur; uçlarda A tabana yapışır.",
    alt: "B'den 4, C'den 9 uzaklıktaki A noktası; altta 5 ile 13 arası açık aralık ve c'nin konumu.",
    param: { label: "c = BC", min: 3, max: 15, step: 0.5, init: 6 },
    draw: (c) => {
      const B = v(0, 0);
      const C = v(c, 0);
      const A = fromSides(c, 4, 9);
      const ok = c > 5 && c < 13;
      const els: El[] = [
        ...numberLine(-4.5, 0, 15, [0, 5, 13, 15]),
        seg(v(5, -4.5), v(13, -4.5), { tone: "a", bold: true }),
        pt(v(5, -4.5), undefined, "n", "a", true),
        pt(v(13, -4.5), undefined, "n", "a", true),
        pt(v(c, -4.5), `c = ${fmt(c)}`, "n", ok ? "b" : "warn"),
        seg(B, C),
        pt(B, "B", "sw"),
        pt(C, "C", "se"),
        txt(v(7.5, 5.5), "", "c"),
      ];
      if (A && (ok || c === 5 || c === 13)) {
        els.push(
          seg(B, A, { tone: "b" }),
          seg(C, A, { tone: "a" }),
          pt(A, "A", "n"),
          dim(B, A, "4", C, "b"),
          dim(A, C, "9", B, "a"),
        );
      } else {
        els.push(
          circle(B, 4, { dash: true, thin: true, tone: "b" }),
          circle(C, 9, { dash: true, thin: true, tone: "a" }),
        );
      }
      return {
        els,
        readout: [
          ok
            ? `|4 − 9| = 5 < ${fmt(c)} < 13 = 4 + 9 · üçgen var`
            : c === 5 || c === 13
              ? `c = ${c}: köşeler doğrusal, iç bölge yok`
              : `c = ${fmt(c)} aralığın dışında · üçgen kurulamaz`,
        ],
      };
    },
  },
  "Tam sayı sayarken uçları dışarıda bırak": {
    caption:
      "Açık aralığın uçları (boş daireler) dahil değildir. Dolu noktalar 5 < c < 13 koşulunu sağlayan tam sayılardır.",
    alt: "4'ten 14'e sayı doğrusu; 5 ve 13 boş daire, 6'dan 12'ye kadar yedi tam sayı dolu nokta.",
    draw: () => ({
      els: [
        ...numberLine(0, 4, 14, [4, 5, 13, 14]),
        seg(v(5, 0), v(13, 0), { tone: "a", bold: true }),
        pt(v(5, 0), undefined, "n", "warn", true),
        pt(v(13, 0), undefined, "n", "warn", true),
        ...[6, 7, 8, 9, 10, 11, 12].map((n) => pt(v(n, 0), String(n), "n", "b")),
      ],
      readout: ["6, 7, 8, 9, 10, 11, 12 → 7 değer", "5 ve 13 sayılmaz"],
    }),
  },
  "Birden fazla üçgende aralıkların kesişimini al": {
    caption:
      "Ortak kenar iki üçgenin koşulunu birlikte sağlamalı: alt sınırların büyüğü, üst sınırların küçüğü seçilir.",
    alt: "Üç sayı doğrusu: üstte 3 ile 11 arası, ortada 5 ile 9 arası, altta ikisinin kesişimi olan 5 ile 9 arası.",
    draw: () => {
      const band = (y: number, a: number, b: number, tone: "a" | "b" | "c", name: string): El[] => [
        ...numberLine(y, 0, 13, [a, b]),
        seg(v(a, y), v(b, y), { tone, bold: true }),
        pt(v(a, y), undefined, "n", tone, true),
        pt(v(b, y), undefined, "n", tone, true),
        txt(v(13.6, y), name, "e", { small: true, tone }),
      ];
      return {
        els: [
          ...band(4, 3, 11, "b", "1. üçgen"),
          ...band(2, 5, 9, "c", "2. üçgen"),
          ...band(0, 5, 9, "a", "ikisi birden"),
          seg(v(5, 4.3), v(5, -0.3), { tone: "muted", dash: true, thin: true }),
          seg(v(9, 4.3), v(9, -0.3), { tone: "muted", dash: true, thin: true }),
        ],
        readout: ["3 < x < 11 ve 5 < x < 9 ⇒ 5 < x < 9"],
      };
    },
  },
  "Büyük açının karşısında büyük kenar bulunur": {
    caption:
      "A açısını değiştir: hangi açı en büyükse karşısındaki kenar da en uzundur. Aynı renk, köşe ile karşı kenarını eşleştirir.",
    alt: "ABC üçgeninde a, b, c kenarları karşı köşelerinin açılarıyla aynı renkte; sıralama sürgüyle değişir.",
    param: { label: "A açısı", min: 20, max: 110, step: 1, init: 70, unit: "°" },
    draw: (a) => {
      const b = 50;
      const c = 130 - a;
      // Law of sines with a fixed circumdiameter keeps the scale steady.
      const s = (x: number) => 6 * Math.sin((x * Math.PI) / 180);
      const [A, B, C] = fromAngles(s(a), b, c);
      const sides = [
        ["a", s(a)],
        ["b", s(b)],
        ["c", s(c)],
      ] as const;
      const order = [...sides].sort((x, y) => y[1] - x[1]);
      const rel = (x: number, y: number) => (Math.abs(x - y) < 1e-9 ? "=" : ">");
      return {
        els: [
          seg(B, C, { tone: "a", bold: true }),
          seg(C, A, { tone: "b" }),
          seg(A, B, { tone: "c" }),
          ang(A, B, C, `${a}°`, { tone: "a", fill: true, r: 30 }),
          ang(B, C, A, `${b}°`, { tone: "b", fill: true }),
          ang(C, A, B, `${c}°`, { tone: "c", fill: true }),
          dim(B, C, "a", A, "a"),
          dim(C, A, "b", B, "b"),
          dim(A, B, "c", C, "c"),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
        ],
        readout: [
          `Kenarlar: ${order
            .map(([n, l], i) => (i ? ` ${rel(order[i - 1][1], l)} ` : "") + `${n} ≈ ${fmt(l, 2)}`)
            .join("")}`,
        ],
      };
    },
  },
  "En büyük açı üzerinden türü belirle": {
    caption:
      "AB = 4, AC = 5 sabit; BC'yi değiştir. Tür, en büyük kenarın karesi ile diğer iki karenin toplamı karşılaştırılarak bulunur; en büyük açı turuncu.",
    alt: "AB = 4 ve AC = 5 olan üçgende BC sürgüyle değişir; en büyük kenarın karşısındaki açı işaretli.",
    param: { label: "BC", min: 1.5, max: 8.5, step: 0.5, init: 6 },
    draw: (x) => {
      const A = fromSides(x, 4, 5)!;
      const B = v(0, 0);
      const C = v(x, 0);
      const sides: [string, number, V, V, V][] = [
        ["BC", x, A, B, C],
        ["AB", 4, C, A, B],
        ["AC", 5, B, C, A],
      ];
      const big = [...sides].sort((p, q) => q[1] - p[1])[0];
      const L = big[1];
      const rest = sides.filter((s) => s !== big).reduce((s, q) => s + q[1] ** 2, 0);
      const kind =
        Math.abs(L * L - rest) < 1e-9 ? "dik" : L * L < rest ? "dar açılı" : "geniş açılı";
      const [, , O, P, Q] = big;
      const els: El[] = [
        tri(A, B, C),
        seg(P, Q, { tone: "a", bold: true }),
        kind === "dik"
          ? right(O, P, Q, "a")
          : ang(O, P, Q, undefined, { tone: "a", fill: true, r: 26 }),
        pt(A, "A", "n"),
        pt(B, "B", "sw"),
        pt(C, "C", "se"),
        dim(B, A, "4", C),
        dim(A, C, "5", B),
        dim(B, C, fmt(x), A),
      ];
      return {
        els,
        readout: [
          `En büyük kenar ${big[0]} = ${fmt(L)} · ${fmt(L * L, 2)} ${L * L === rest ? "=" : L * L < rest ? "<" : ">"} ${fmt(rest, 2)}`,
          `Üçgen ${kind}`,
        ],
      };
    },
  },
  "Kesin sonucu verilmemiş ölçüden ayır": {
    caption:
      "3 < x < 9 için gerçel en küçük değer yoktur: 3'e istediğin kadar yaklaşabilirsin ama 3'ü alamazsın. Tam sayı koşuluyla uçlar 4 ve 8 olur.",
    alt: "3 ile 9 arası açık aralık; içinde 4'ten 8'e beş dolu tam sayı noktası, 3 ve 9 boş daire.",
    draw: () => ({
      els: [
        ...numberLine(0, 2, 10, [2, 3, 9, 10]),
        seg(v(3, 0), v(9, 0), { tone: "b", bold: true }),
        pt(v(3, 0), undefined, "n", "warn", true),
        pt(v(9, 0), undefined, "n", "warn", true),
        ...[4, 5, 6, 7, 8].map((n) => pt(v(n, 0), String(n), "n", "a")),
        txt(v(3.2, 0.9), "3,1 · 3,01 · 3,001 …", "e", { small: true, tone: "muted" }),
      ],
      readout: ["Gerçel x: en küçük/en büyük yok", "Tam sayı x: en küçük 4, en büyük 8"],
    }),
  },
};

const dikUcgen: Record<string, FigureDef> = {
  "Dik yolda eğim ve uzunluk": {
    caption: "Yükselmeyi değiştir. Yatay ilerleme sabit kalır. Eğim için yatay kenarı, sinüs için eğik kenarı kullan.",
    alt: "Yatay tabanı 12 metre olan dik üçgen. Düşey yükselme, eğik yol ve yolun yatayla yaptığı açı işaretlidir.",
    param: { label: "Dikey yükselme", min: 1, max: 9, step: 1, init: 5, unit: " m" },
    draw: (rise) => {
      const run = 12;
      const length = Math.hypot(run, rise);
      const origin = v(0, 0);
      const corner = v(run, 0);
      const end = v(run, rise);
      return {
        els: [
          tri(origin, corner, end),
          right(corner, origin, end),
          ang(origin, corner, end, "α", { tone: "a", r: 42 }),
          dim(origin, corner, `${run} m`, end),
          dim(corner, end, `${rise} m`, origin, "b"),
          dim(origin, end, `${fmt(length, 2)} m`, corner, "a"),
          txt(v(-0.5, -1.5), "", "c"),
          txt(v(13, 10.2), "", "c"),
        ],
        readout: [
          `Eğim: tan α = ${rise}/${run}.`,
          `Eğik yol: √(${run}² + ${rise}²) ${Number.isInteger(length) ? "=" : "≈"} ${fmt(length, 2)} m.`,
        ],
      };
    },
  },
  "Dik köşeyi ve hipotenüsü önce işaretle": {
    caption:
      "Çizimi döndür: hipotenüs her konumda dik açının karşısındaki en uzun kenardır. Yön, tanımı değiştirmez.",
    alt: "A köşesinde dik açılı ABC üçgeni; hipotenüs BC kalın çizgiyle, dik kenarlar AB ve AC ayrı renkle gösterilmiş.",
    param: { label: "Döndür", min: 0, max: 330, step: 15, init: 30, unit: "°" },
    draw: (t) => {
      const A0 = v(0, 0);
      const B0 = v(4, 0);
      const C0 = v(0, 3);
      const [A, B, C] = [A0, B0, C0].map((p) => rot(p, t));
      return {
        els: [
          seg(A, B, { tone: "b" }),
          seg(A, C, { tone: "b" }),
          seg(B, C, { tone: "a", bold: true }),
          right(A, B, C),
          dim(B, C, "hipotenüs", A, "a"),
          pt(A, "A", "s"),
          pt(B, "B", "e"),
          pt(C, "C", "n"),
          txt(v(-4.3, -4.3), "", "c"),
          txt(v(4.3, 4.3), "", "c"),
        ],
        readout: ["A = 90° ⇒ hipotenüs BC; AB ve AC dik kenar"],
      };
    },
  },
  "Pisagor: karelerin alanından uzunluğa": {
    caption:
      "Kenarlara kurulan kareler: 36 ve 64 birimkare toplanınca 100 birimkare eder. Uzunluğa dönmek için karekök alınır: hipotenüs 10.",
    alt: "Dik kenarları 6 ve 8 olan dik üçgen; her kenarın üzerinde kare. Küçük kareler 36 ve 64, büyük kare 100 birimkare.",
    draw: () => {
      const C = v(0, 0);
      const B = v(8, 0);
      const A = v(0, 6);
      const n = v(6, 8);
      return {
        els: [
          poly([C, B, v(8, -8), v(0, -8)], { fill: "b", thin: true, tone: "b" }),
          poly([C, A, v(-6, 6), v(-6, 0)], { fill: "c", thin: true, tone: "c" }),
          poly([A, B, add(B, n), add(A, n)], { fill: "a", thin: true, tone: "a" }),
          tri(A, B, C),
          right(C, B, A),
          txt(v(4, -4), "64", "c", { tone: "b", bold: true }),
          txt(v(-3, 3), "36", "c", { tone: "c", bold: true }),
          txt(mid(add(A, mul(n, 0.5)), add(B, mul(n, 0.5))), "100", "c", {
            tone: "a",
            bold: true,
          }),
          dim(C, B, "8", A),
          dim(A, C, "6", B),
          dim(B, A, "10", add(A, n)),
        ],
        readout: ["6² + 8² = 36 + 64 = 100 = 10²", "Diğer dik kenar: √(100 − 36) = 8"],
      };
    },
  },
  "Hipotenüse yükseklik indir: üç benzer üçgen": {
    caption:
      "AH yüksekliği ABC'yi iki küçük dik üçgene böler. Üçü de benzerdir; her dik kenar, hipotenüs ile kendi izdüşümünün çarpımının köküdür.",
    alt: "A'da dik açılı ABC; A'dan BC'ye inen AH. ABH ve AHC üçgenleri iki renkle boyalı, BH = p ve HC = q işaretli.",
    steps: ["Ana üçgen ABC", "AH yüksekliğini indir", "İki küçük üçgeni gör"],
    draw: (_, step) => {
      const B = v(0, 0);
      const C = v(10, 0);
      const A = v(3.6, 4.8);
      const H = v(3.6, 0);
      const els: El[] = [];
      if (step >= 2)
        els.push(
          poly([A, B, H], { fill: "b", thin: true, tone: "b" }),
          poly([A, H, C], { fill: "a", thin: true, tone: "a" }),
        );
      els.push(tri(A, B, C), right(A, B, C), pt(A, "A", "n"), pt(B, "B", "sw"), pt(C, "C", "se"));
      if (step >= 1)
        els.push(
          seg(A, H, { dash: step === 1 }),
          right(H, C, A),
          pt(H, "H", "s"),
          dim(H, B, "p = 3,6", A, "b"),
          dim(C, H, "q = 6,4", A, "a"),
        );
      return {
        els,
        readout:
          step >= 2
            ? ["AB² = BC·BH: 36 = 10 · 3,6", "AC² = BC·HC: 64 = 10 · 6,4"]
            : ["AB = 6, AC = 8, BC = 10"],
      };
    },
  },
  "Öklid yüksekliği ve alanla ikinci yol": {
    caption:
      "Hipotenüs 10 sabit; H'nin yerini değiştir. h² = p·q her konumda sağlanır ve alan iki yoldan aynı çıkar.",
    alt: "BC = 10 hipotenüslü dik üçgen; A'dan inen yükseklik h, BH = p ve HC = q parçaları sürgüyle değişir.",
    param: { label: "p = BH", min: 1, max: 9, step: 0.5, init: 3.6 },
    draw: (p) => {
      const q = 10 - p;
      const h = Math.sqrt(p * q);
      const B = v(0, 0);
      const C = v(10, 0);
      const H = v(p, 0);
      const A = v(p, h);
      const ab = Math.sqrt(10 * p);
      const ac = Math.sqrt(10 * q);
      return {
        els: [
          tri(A, B, C),
          right(A, B, C),
          seg(A, H, { tone: "a" }),
          right(H, C, A, "a"),
          dim(A, H, `h ≈ ${fmt(h, 2)}`, C, "a"),
          dim(H, B, `p = ${fmt(p)}`, A, "b"),
          dim(C, H, `q = ${fmt(q)}`, A, "b"),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          // Keep H clear of the shorter of the two projection labels.
          pt(H, "H", p < 5 ? "se" : "sw"),
          txt(v(5, 5.4), "", "c"),
        ],
        readout: [
          `h² = p·q = ${fmt(p)} · ${fmt(q)} = ${fmt(p * q, 2)}`,
          `Alan: AB·AC/2 ≈ ${fmt((ab * ac) / 2, 2)} = BC·h/2 ≈ ${fmt((10 * h) / 2, 2)}`,
        ],
      };
    },
  },
  "Yardımcı dik üçgeni bir durumdan üret": {
    caption:
      "5 metrelik merdiven duvara dayalı. Duvar ile zemin dik olduğundan merdiven hipotenüstür; ayağı uzaklaştıkça tepesi alçalır.",
    alt: "Düşey duvar, yatay zemin ve aralarında eğik merdiven. Merdivenin ayağının duvara uzaklığı sürgüyle değişiyor.",
    param: { label: "Duvara uzaklık", min: 1, max: 4.5, step: 0.5, init: 3, unit: " m" },
    draw: (d) => {
      const h = Math.sqrt(25 - d * d);
      const O = v(0, 0);
      const T = v(0, h);
      const F = v(d, 0);
      return {
        els: [
          seg(v(0, -0.2), v(0, 5.3), { tone: "muted", bold: true }),
          seg(v(-0.4, 0), v(5.5, 0), { tone: "muted", bold: true }),
          seg(F, T, { tone: "a", bold: true }),
          right(O, F, T),
          dim(T, F, "5 m", O, "a"),
          dim(O, T, `${fmt(h, 2)} m`, F),
          dim(F, O, `${fmt(d)} m`, T),
          txt(v(0, 5.3), "duvar", "n", { small: true, tone: "muted" }),
        ],
        readout: [`Yükseklik = √(5² − ${fmt(d)}²) ≈ ${fmt(h, 2)} m`],
      };
    },
  },
};

const eslikBenzerlik: Record<string, FigureDef> = {
  "Eş yükseklik, farklı alan": {
    caption: "İki kesim tabana paralel. Sürgüyle bir şerit seç ve alanını tepeden biriken iki alanın farkında gör.",
    alt: "Eşkenar üçgen, tabana paralel iki çizgiyle eş yükseklikte üç şeride ayrılmış. Seçilen şerit vurgulanıyor.",
    param: { label: "Şerit", min: 1, max: 3, step: 1, init: 2 },
    draw: (band) => {
      const wholeArea = 81;
      const width = Math.sqrt(4 * wholeArea / Math.sqrt(3));
      const A = v(0, width * Math.sqrt(3) / 2);
      const B = v(-width / 2, 0);
      const C = v(width / 2, 0);
      const outer = band / 3;
      const inner = (band - 1) / 3;
      const lower = [lerp(A, B, outer), lerp(A, C, outer)];
      const upper = [lerp(A, B, inner), lerp(A, C, inner)];
      const selected: V[] = band === 1
        ? [A, lower[0], lower[1]]
        : [upper[0], lower[0], lower[1], upper[1]];
      const cumulativeArea = (ratio: number) => wholeArea * ratio ** 2;
      const lowerArea = cumulativeArea(outer);
      const upperArea = cumulativeArea(inner);
      return {
        els: [
          poly(selected, { fill: "a", tone: "a" }),
          tri(A, B, C),
          seg(lerp(A, B, 1 / 3), lerp(A, C, 1 / 3), { tone: "muted" }),
          seg(lerp(A, B, 2 / 3), lerp(A, C, 2 / 3), { tone: "muted" }),
          txt(lerp(A, C, 1 / 3), "1/3", "e"),
          txt(lerp(A, C, 2 / 3), "2/3", "e"),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
        ],
        readout: [
          `Şerit ${band}: ${fmt(lowerArea)} − ${fmt(upperArea)} = ${fmt(lowerArea - upperArea)} birim²`,
          "Üç şerit birlikte: 9 + 27 + 45 = 81 birim².",
        ],
      };
    },
  },
  "Aynı biçim ile aynı büyüklüğü ayır": {
    caption:
      "Ortadaki üçgen soldakinin döndürülmüş kopyasıdır: eştir. Sağdaki her kenarı 2 katına çıkmış hâlidir: açıları aynı, büyüklüğü farklı; benzerdir.",
    alt: "Kenarları 3, 4, 5 olan üçgen; ortada aynı üçgenin döndürülmüşü; sağda kenarları 6, 8, 10 olan büyütülmüş benzeri.",
    draw: () => {
      const base: V[] = [v(0, 0), v(4, 0), v(0, 3)];
      const moved = base.map((p) => add(rot(p, 150, v(2, 1.5)), v(4.6, 0.8)));
      const big = base.map((p) => add(mul(p, 2), v(10, -1)));
      return {
        els: [
          poly(base, { fill: "b" }),
          right(base[0], base[1], base[2]),
          dim(base[0], base[1], "4", base[2]),
          dim(base[2], base[0], "3", base[1]),
          poly(moved, { fill: "b" }),
          right(moved[0], moved[1], moved[2]),
          txt(v(6.6, -1.9), "eş", "c", { tone: "b", bold: true }),
          poly(big, { fill: "a" }),
          right(big[0], big[1], big[2]),
          dim(big[0], big[1], "8", add(big[0], v(4, -3))),
          dim(big[2], big[0], "6", add(big[0], v(-3, 3))),
          txt(v(14, -1.9), "benzer (k = 2)", "c", { tone: "a", bold: true }),
          txt(v(2, -1.9), "ilk üçgen", "c", { tone: "muted" }),
        ],
      };
    },
  },
  "Köşe sırası bir bilgi taşır": {
    caption:
      "ABC ∼ DEF yazımı A↔D, B↔E, C↔F eşlemesini söyler. Şekil döndürülmüş olsa da aynı işaretli açılar ve aynı renkli kenarlar karşılıklıdır.",
    alt: "ABC üçgeni ve döndürülmüş, büyütülmüş DEF üçgeni. Karşılıklı açılar tek, çift, üç yay ile; karşılıklı kenarlar aynı renkle işaretli.",
    draw: () => {
      const [A, B, C] = fromAngles(4, 55, 70);
      const T = (p: V) => add(rot(mul(p, 1.4), 200, v(0, 0)), v(12, 3.5));
      const [D, E, F] = [A, B, C].map(T);
      return {
        els: [
          seg(A, B, { tone: "a" }),
          seg(B, C, { tone: "b" }),
          seg(C, A, { tone: "c" }),
          ang(A, B, C, undefined, { tone: "ink", r: 24 }),
          ang(B, C, A, undefined, { tone: "ink", r: 24, double: true }),
          ang(C, A, B, undefined, { tone: "ink", r: 20, fill: true }),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          seg(D, E, { tone: "a" }),
          seg(E, F, { tone: "b" }),
          seg(F, D, { tone: "c" }),
          ang(D, F, E, undefined, { tone: "ink", r: 24 }),
          ang(E, D, F, undefined, { tone: "ink", r: 24, double: true }),
          ang(F, E, D, undefined, { tone: "ink", r: 20, fill: true }),
          pt(D, "D", "s"),
          pt(E, "E", "ne"),
          pt(F, "F", "nw"),
        ],
        readout: ["AB ↔ DE · BC ↔ EF · AC ↔ DF", "Oran: AB/DE = BC/EF = AC/DF"],
      };
    },
  },
  "Eşliği hangi veriler kanıtlar?": {
    caption:
      "KKK: üç kenar. KAK: iki kenar ve ARALARINDAKİ açı. AKA: iki açı ve aralarındaki kenar. İşaretlenen elemanlar eşliği kuran verilerdir.",
    alt: "Üç küçük üçgen: KKK'da üç kenar çentikli; KAK'ta iki kenar çentikli ve aralarındaki açı yaylı; AKA'da iki açı yaylı ve aralarındaki kenar çentikli.",
    draw: () => {
      const mk = (x: number): [V, V, V] => [v(x + 1.2, 2.6), v(x, 0), v(x + 3.4, 0)];
      const [A1, B1, C1] = mk(0);
      const [A2, B2, C2] = mk(4.6);
      const [A3, B3, C3] = mk(9.2);
      return {
        els: [
          tri(A1, B1, C1),
          ticks(A1, B1, 1, "a"),
          ticks(B1, C1, 2, "a"),
          ticks(C1, A1, 3, "a"),
          txt(v(1.7, -0.9), "KKK", "c", { bold: true }),
          tri(A2, B2, C2),
          ticks(A2, B2, 1, "a"),
          ticks(B2, C2, 2, "a"),
          ang(B2, C2, A2, undefined, { tone: "b", fill: true }),
          txt(v(6.3, -0.9), "KAK", "c", { bold: true }),
          tri(A3, B3, C3),
          ang(B3, C3, A3, undefined, { tone: "b", fill: true }),
          ang(C3, A3, B3, undefined, { tone: "b", fill: true, double: true }),
          ticks(B3, C3, 1, "a"),
          txt(v(10.9, -0.9), "AKA", "c", { bold: true }),
        ],
      };
    },
  },
  "Arada olmayan açı iki üçgene izin verebilir": {
    caption: "AB = 5 birim ve B açısı 30° sabit. AC uzunluğu, A merkezli çemberin yarıçapıdır. C ancak çember ile B’den çıkan ışının B dışındaki kesişiminde olabilir.",
    alt: "B’den çıkan yatay kenar ve 30 derece eğimli ışın. A merkezli çember ve A’dan ışına inen dikme. Çemberin izin verdiği C noktaları ışın üzerinde gösterilir.",
    param: {label: "AC uzunluğu", min: 2, max: 5.5, step: 0.5, init: 4, unit: "birim"},
    draw: (radius) => {
      const B = v(0, 0);
      const A = v(5, 0);
      const along = pol(1, 30);
      const H = foot(A, B, along);
      const height = dist(A, H);
      const projected = dist(B, H);
      const delta = radius ** 2 - height ** 2;
      const candidates = delta < -1e-9 ? [] : Math.abs(delta) < 1e-9
        ? [projected]
        : [projected - Math.sqrt(delta), projected + Math.sqrt(delta)].filter((value) => value > 1e-9);
      const els: El[] = [
        ray(B, pol(11, 30), {thin: true}),
        seg(A, B),
        seg(A, H, {tone: "muted", dash: true}),
        right(H, B, A),
        circle(A, radius, {tone: "a", thin: true}),
        ang(B, A, along, "30°", {tone: "b", r: 28}),
        pt(A, "A", "s"), pt(B, "B", "sw"), pt(H, "H", "n", "muted"),
      ];
      for (const [index, length] of candidates.entries()) {
        const C = mul(along, length);
        const tone = index === 0 ? "c" : "b";
        const name = candidates.length === 1 ? "C" : index === 0 ? "C₁" : "C₂";
        els.push(seg(A, C, {tone}), pt(C, name, index === 0 ? "nw" : "ne", tone));
      }
      const verdict = ["Üçgen kurulamaz.", "Tek üçgen kurulur.", "İki farklı üçgen kurulur."][candidates.length];
      return {
        els,
        readout: [
          `AB = 5 ve ∠B = 30°. Dik uzaklık AH = ${fmt(height)} birim. AC = ${fmt(radius)} birim.`,
          verdict,
          ...(candidates.length ? [`Olası BC uzunlukları: ${candidates.map((length) => fmt(length, 2)).join(" ve ")} birim.`] : []),
        ],
      };
    },
  },
  "Benzerliği hangi veriler kanıtlar?": {
    caption:
      "Kum saati görünümünde O'daki ters açılar yalnız bir çift eşit açı verir. AB ∥ DC verildiğinde iç ters açılar ikinci çifti sağlar ve AA benzerliği kurulur.",
    alt: "O'da kesişen iki doğru parçası iki üçgen oluşturur. İlk adımda yalnız O'daki ters açılar, ikinci adımda paralellikten gelen eş açılar işaretli.",
    steps: ["Yalnız ters açılar", "AB ∥ DC eklenince"],
    draw: (_, step) => {
      const O = v(0, 0);
      const A = v(-3, 2);
      const B = v(1, 2);
      const C = v(-1.5, -3);
      const D = v(4.5, -3);
      const els: El[] = [
        tri(O, A, B),
        tri(O, C, D),
        ang(O, A, B, undefined, { tone: "a", fill: true }),
        ang(O, D, C, undefined, { tone: "a", fill: true }),
        pt(A, "A", "nw"),
        pt(B, "B", "ne"),
        pt(C, "D", "sw"),
        pt(D, "C", "se"),
        pt(O, "O", "e"),
      ];
      if (step === 1)
        els.push(
          par(A, B, 1, "muted"),
          par(C, D, 1, "muted"),
          ang(A, O, B, undefined, { tone: "b", fill: true, r: 22 }),
          ang(D, C, O, undefined, { tone: "b", fill: true, r: 22 }),
        );
      return {
        els,
        readout:
          step === 1
            ? ["İki açı çifti eşit ⇒ OAB ∼ OCD (AA)"]
            : ["Tek açı çifti benzerlik için yetmez"],
      };
    },
  },
  "Paralel kesitte küçük üçgeni gör": {
    caption:
      "DE ∥ BC. t = AD/AB oranını değiştir: parça/bütün oranı t, parça/parça oranı AD/DB ise farklı bir sayıdır.",
    alt: "ABC üçgeninde AB üzerinde D, AC üzerinde E; DE tabana paralel. Küçük ADE üçgeni boyalı.",
    param: { label: "t = AD/AB", min: 0.15, max: 0.85, step: 0.05, init: 0.4 },
    draw: (t) => {
      const A = v(2, 4.5);
      const B = v(0, 0);
      const C = v(6.5, 0);
      const D = lerp(A, B, t);
      const E = lerp(A, C, t);
      return {
        els: [
          poly([A, D, E], { fill: "a" }),
          tri(A, B, C),
          seg(D, E, { tone: "a" }),
          par(D, E, 1, "a"),
          par(B, C, 1, "a"),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          pt(D, "D", "w", "a"),
          pt(E, "E", "e", "a"),
        ],
        readout: [
          `AD/AB = AE/AC = DE/BC = ${fmt(t, 2)}`,
          `AD/DB = ${fmt(t, 2)} / ${fmt(1 - t, 2)} ≈ ${fmt(t / (1 - t), 2)}`,
        ],
      };
    },
  },
  "Orta taban ve Thales: ayrı şekiller, aynı oran fikri": {
    caption:
      "Orta taban, iki kenarın orta noktalarını birleştirir: üçüncü kenara paraleldir ve yarısıdır. Thales'te paraleller iki keseni aynı oranda böler.",
    alt: "İlk adımda D ve E orta noktaları işaretli bir üçgen; ikinci adımda üç paralel doğruyu kesen iki doğru ve 2–3 ile 4–6 aralıkları.",
    steps: ["Orta taban", "Thales"],
    draw: (_, step) => {
      if (step === 0) {
        const A = v(2.2, 4.4);
        const B = v(0, 0);
        const C = v(7, 0);
        const D = mid(A, B);
        const E = mid(A, C);
        return {
          els: [
            tri(A, B, C),
            seg(D, E, { tone: "a" }),
            ticks(A, D, 1),
            ticks(D, B, 1),
            ticks(A, E, 2),
            ticks(E, C, 2),
            dim(D, E, "7/2 = 3,5", B, "a"),
            dim(B, C, "7", A),
            pt(A, "A", "n"),
            pt(B, "B", "sw"),
            pt(C, "C", "se"),
            pt(D, "D", "w", "a"),
            pt(E, "E", "e", "a"),
          ],
          readout: ["DE ∥ BC ve DE = BC/2"],
        };
      }
      const ys = [5, 3, 0];
      const P = (y: number) => v(1 + (5 - y) * 0.15, y);
      const Q = (y: number) => v(5 + (5 - y) * 0.75, y);
      return {
        els: [
          ...ys.map((y) => line(v(0, y), v(10, y), { tone: "muted", ext: 0.2 })),
          ...ys.map((y) => par(v(8.4, y), v(9.2, y), 1, "muted")),
          line(P(5), P(0), { tone: "b", ext: 0.3 }),
          line(Q(5), Q(0), { tone: "a", ext: 0.3 }),
          dim(P(3), P(5), "2", 1, "b"),
          dim(P(0), P(3), "3", 1, "b"),
          dim(Q(5), Q(3), "4", 1, "a"),
          dim(Q(3), Q(0), "6", 1, "a"),
          ...ys.flatMap((y) => [pt(P(y)), pt(Q(y))]),
        ],
        readout: ["2/3 = 4/6"],
      };
    },
  },
  "Uzunluk k iken alan neden k²?": {
    caption:
      "Kenarları üçe bölünen üçgen 9 eş küçük üçgene ayrılır. t = 2/3 olan üst üçgen bunların 4'ünü kapsar: alan oranı (2/3)² = 4/9, kalan yamuk 5/9.",
    alt: "Kenarları üç eş parçaya bölünmüş üçgen, kenarlara paralel çizgilerle dokuz eş küçük üçgene ayrılmış; üstteki dört küçük üçgen boyalı.",
    draw: () => {
      const A = v(3, 3 * Math.sqrt(3));
      const B = v(0, 0);
      const C = v(6, 0);
      const g = (i: number, j: number): V =>
        // i steps from A toward B, j steps from A toward C (thirds).
        add(add(A, mul(sub(B, A), i / 3)), mul(sub(C, A), j / 3));
      const cells: El[] = [];
      for (let i = 0; i < 3; i++)
        for (let j = 0; i + j < 3; j++) {
          const up = [g(i, j), g(i + 1, j), g(i, j + 1)];
          cells.push(poly(up, { fill: i + j < 2 ? "a" : undefined, thin: true }));
          if (i + j < 2) {
            const down = [g(i + 1, j), g(i + 1, j + 1), g(i, j + 1)];
            cells.push(poly(down, { fill: i + j < 1 ? "a" : undefined, thin: true }));
          }
        }
      return {
        els: [
          ...cells,
          tri(A, B, C),
          seg(g(2, 0), g(0, 2), { tone: "a", bold: true }),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          pt(g(2, 0), "D", "w", "a"),
          pt(g(0, 2), "E", "e", "a"),
        ],
        readout: ["Uzunluk oranı 2/3 ⇒ alan oranı 4/9", "Yamuk DBCE: 5/9"],
      };
    },
  },
  "Gölge ve ölçek problemlerinde varsayımı yaz": {
    caption:
      "Aynı anda, düz zeminde ve paralel güneş ışınlarıyla iki dik nesnenin yükseklik–gölge üçgenleri benzerdir.",
    alt: "2 metrelik direk 3 metre, ağaç 12 metre gölge veriyor; iki gölgenin ucuna giden ışınlar paralel.",
    draw: () => {
      const pole = [v(0, 0), v(0, 2), v(3, 0)] as const;
      const tree = [v(6, 0), v(6, 8), v(18, 0)] as const;
      return {
        els: [
          seg(v(-0.5, 0), v(18.6, 0), { tone: "muted" }),
          seg(pole[0], pole[1], { bold: true }),
          seg(pole[1], pole[2], { tone: "a", dash: true }),
          seg(tree[0], tree[1], { tone: "c", bold: true }),
          seg(tree[1], tree[2], { tone: "a", dash: true }),
          par(pole[1], pole[2], 1, "a"),
          par(tree[1], tree[2], 1, "a"),
          right(pole[0], pole[2], pole[1]),
          right(tree[0], tree[2], tree[1]),
          dim(pole[0], pole[1], "2 m", pole[2]),
          dim(pole[2], pole[0], "3 m", pole[1]),
          dim(tree[0], tree[1], "h = 8 m", tree[2], "c"),
          dim(tree[2], tree[0], "12 m", tree[1]),
        ],
        readout: ["2/3 = h/12 ⇒ h = 8 m"],
      };
    },
  },
};

const merkezSteps = ["Kenarortay", "Açıortay", "Yükseklik", "Kenar orta dikmesi", "Hepsi birlikte"];

const ucgenMerkezleri: Record<string, FigureDef> = {
  "Dört çizginin dört ayrı görevi": {
    caption:
      "Aynı genel üçgende dört çizgiyi tek tek aç. Her biri farklı bir işaretle tanınır: eş parça, eş açı, 90° köşeden, 90° orta noktadan.",
    alt: "Çeşitkenar ABC üçgeninde A'dan çıkan kenarortay, açıortay ve yükseklik ile BC'nin orta dikmesi; adım adım gösterilir.",
    steps: merkezSteps,
    draw: (_, step) => {
      const B = v(0, 0);
      const C = v(8, 0);
      const A = v(2.2, 4.6);
      const M = mid(B, C);
      const D = meet(A, add(A, add(unit(sub(B, A)), unit(sub(C, A)))), B, C);
      const H = foot(A, B, C);
      const all = step === 4;
      const els: El[] = [tri(A, B, C), pt(A, "A", "n"), pt(B, "B", "sw"), pt(C, "C", "se")];
      if (step === 0 || all)
        els.push(seg(A, M, { tone: "a" }), ticks(B, M, 1, "a"), ticks(M, C, 1, "a"), pt(M, "M", "s", "a"));
      if (step === 1 || all)
        els.push(
          seg(A, D, { tone: "b" }),
          ang(A, B, D, undefined, { tone: "b", r: 36 }),
          ang(A, D, C, undefined, { tone: "b", r: 42 }),
          pt(D, "D", "s", "b"),
        );
      if (step === 2 || all)
        els.push(seg(A, H, { tone: "c" }), right(H, C, A, "c"), pt(H, "H", "s", "c"));
      if (step === 3 || all)
        els.push(
          line(v(4, -0.4), v(4, 3.6), { tone: "warn", dash: true, ext: 0.2 }),
          right(M, C, v(4, 1), "warn"),
          ...(all ? [] : [ticks(B, M, 1, "warn"), ticks(M, C, 1, "warn"), pt(M, "M", "s", "warn")]),
        );
      return { els };
    },
  },
  "Açıortay eş açı kurar, eş kenar parçası zorunlu değildir": {
    caption:
      "AD açıortayı A açısını eşit böler ama BC'yi eşit bölmez: BD/DC = AB/AC = 6/9. Açıortay üzerindeki P'nin iki kola dik uzaklıkları eşittir.",
    alt: "AB = 6, AC = 9, BC = 10 olan üçgen; A'nın açıortayı BC'yi 4 ve 6 olarak böler. Açıortay üzerindeki P'den iki kola dikmeler eşit işaretli.",
    draw: () => {
      const B = v(0, 0);
      const C = v(10, 0);
      const A = fromSides(10, 6, 9)!;
      const D = v(4, 0);
      const P = lerp(A, D, 0.55);
      const F1 = foot(P, A, B);
      const F2 = foot(P, A, C);
      return {
        els: [
          tri(A, B, C),
          seg(A, D, { tone: "a" }),
          ang(A, B, D, undefined, { tone: "a", r: 34 }),
          ang(A, D, C, undefined, { tone: "a", r: 40 }),
          seg(P, F1, { tone: "b", thin: true }),
          seg(P, F2, { tone: "b", thin: true }),
          right(F1, A, P, "b"),
          right(F2, P, A, "b"),
          ticks(P, F1, 1, "b"),
          ticks(P, F2, 1, "b"),
          dim(B, A, "6", C),
          dim(A, C, "9", B),
          dim(D, B, "4", A, "a"),
          dim(C, D, "6", A, "a"),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          pt(D, "D", "s", "a"),
          pt(P, "P", "e", "b"),
        ],
        readout: ["BD/DC = AB/AC = 6/9 = 2/3", "BD = 10 · 2/5 = 4, DC = 6"],
      };
    },
  },
  "İç açıortayın uzunluğu ve alanla anlamı": {
    caption:
      "Kenarları 5, 5, 6 olan üçgende tepe açıortayı tabanı 3 ve 3 böler; AD² = bc − mn = 25 − 9 ile AD = 4 bulunur.",
    alt: "AB = AC = 5, BC = 6 olan ikizkenar üçgen; A'dan D'ye açıortay 4 birim, tabanı 3 ve 3 parçaya ayırıyor.",
    draw: () => {
      const B = v(0, 0);
      const C = v(6, 0);
      const A = v(3, 4);
      const D = v(3, 0);
      return {
        els: [
          poly([A, B, D], { fill: "b", thin: true }),
          poly([A, D, C], { fill: "c", thin: true }),
          tri(A, B, C),
          seg(A, D, { tone: "a", bold: true }),
          ang(A, B, D, undefined, { tone: "a", r: 34 }),
          ang(A, D, C, undefined, { tone: "a", r: 40 }),
          dim(B, A, "5", C),
          dim(A, C, "5", B),
          dim(D, B, "3", A),
          dim(C, D, "3", A),
          dim(A, D, "4", C, "a"),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          pt(D, "D", "s"),
        ],
        readout: ["AD² = 5·5 − 3·3 = 16 ⇒ AD = 4", "Alanlar oranı = AB/AC = 1"],
      };
    },
  },
  "Dış açıortayda nokta uzantıda olur": {
    caption: "AC ve BC altışar birim. AB’nin değerini değiştirerek dış açıortayın hangi uzantıyı kestiğini gör.",
    alt: "A köşesinden dış açıortayı çizilmiş ABC üçgeni. Eş yan kenarlarda dış açıortay tabana paralel. Farklı uzunluklarda E uzantıda işaretli.",
    steps: ["AB < AC", "AB = AC", "AB > AC"],
    draw: (_, step) => {
      const ab = [4, 6, 8][step];
      const ac = 6;
      const bc = 6;
      const B = v(0, 0);
      const C = v(bc, 0);
      const A = fromSides(bc, ab, ac)!;
      const inner = add(unit(sub(B, A)), unit(sub(C, A)));
      const exterior = rot(inner, 90);
      const frame = [
        tri(A, B, C),
        dim(B, A, String(ab), C),
        dim(A, C, String(ac), B),
        pt(A, "A", "n"),
        pt(B, "B", "s"),
        pt(C, "C", "s"),
      ];
      if (ab === ac) {
        return {
          els: [...frame, line(v(-1, A[1]), v(7, A[1]), { tone: "a", ext: 0.25 })],
          readout: ["AB = AC = 6", "Dış açıortay ∥ BC. Sonlu bir E noktası yok."],
        };
      }
      const E = meet(A, add(A, exterior), B, C);
      const near = ab < ac ? B : C;
      const far = ab < ac ? C : B;
      const continuation = add(A, mul(unit(sub(A, far)), 1.5));
      const be = dist(B, E);
      const ce = dist(C, E);
      return {
        els: [
          ...frame,
          seg(E, near, { dash: true, tone: "muted" }),
          seg(A, continuation, { dash: true, tone: "muted" }),
          seg(A, E, { tone: "a" }),
          ang(A, near, E, undefined, { tone: "a", r: 26 }),
          ang(A, E, continuation, undefined, { tone: "a", r: 26 }),
          pt(E, "E", "s", "a"),
        ],
        readout: [
          ab < ac ? "E, B tarafındaki uzantıda." : "E, C tarafındaki uzantıda.",
          `|BE|/|CE| = ${fmt(be)}/${fmt(ce)} = ${ab}/${ac}`,
          `Uzaklıkların farkı: ${fmt(Math.max(be, ce))} − ${fmt(Math.min(be, ce))} = ${bc}`,
        ],
      };
    },
  },
  "Kenarortay uzunluğu ve dik üçgendeki özel hâl": {
    caption: "AB=7 ve AC=9 sabit. BC’yi değiştirip orta noktaya giden AM ile dik inen AH’yi karşılaştır.",
    alt: "ABC üçgeni. A’dan tabanın orta noktası M’ye kenarortay, taban doğrusundaki H’ye kesikli dikme çizilmiş. M’de iki eş parça işareti var.",
    param: { label: "BC tabanı", min: 4, max: 14, step: 2, init: 8, unit: " birim" },
    draw: (base) => {
      const B = v(0, 0);
      const C = v(base, 0);
      const A = fromSides(base, 7, 9)!;
      const M = mid(B, C);
      const H = foot(A, B, C);
      const median = dist(A, M);
      const height = dist(A, H);
      const square = (2 * 7 ** 2 + 2 * 9 ** 2 - base ** 2) / 4;
      return {
        els: [
          tri(A, B, C),
          ...(H[0] < 0 ? [seg(H, B, { tone: "muted", dash: true })] : []),
          seg(A, M, { tone: "a" }),
          seg(A, H, { tone: "b", dash: true }),
          right(H, C, A, "b"),
          ticks(B, M, 1, "a"),
          ticks(M, C, 1, "a"),
          dim(B, A, "7", C),
          dim(A, C, "9", B),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          pt(M, "M", "s", "a"),
          pt(H, "H", "nw", "b"),
        ],
        readout: [
          `BM = MC = ${base / 2} birim`,
          `AM² = (2·7² + 2·9² − ${base}²)/4 = ${square}`,
          `AM ${Number.isInteger(Math.sqrt(square)) ? "=" : "≈"} ${fmt(median, 2)} birim, AH ≈ ${fmt(height, 2)} birim`,
        ],
      };
    },
  },
  "Yükseklikler ve diklik merkezi H": {
    caption:
      "A'yı yatay kaydır. Dar açılı üçgende H içeride, dik üçgende dik köşede, geniş açılı üçgende dışarıdadır; geniş üçgende uzantılar çizilir.",
    alt: "Tabanı sabit ABC üçgeni; A sürgüyle sağa sola kayar. Üç yükseklik doğrusu kesikli ve kesişim noktası H işaretli.",
    param: { label: "A'nın yatay konumu", min: -3, max: 9, step: 0.5, init: 2 },
    draw: (x) => {
      const B = v(0, 0);
      const C = v(6, 0);
      const A = v(x, 4);
      const H = orthocenter(A, B, C);
      const kind =
        x < 0 || x > 6 ? "geniş açılı" : x === 0 || x === 6 ? "dik" : "dar açılı";
      const where = kind === "dar açılı" ? "içeride" : kind === "dik" ? "dik köşede" : "dışarıda";
      const fA = foot(A, B, C);
      const fB = foot(B, A, C);
      const fC = foot(C, A, B);
      const finite = H.every((n) => Number.isFinite(n) && Math.abs(n) < 40);
      return {
        els: [
          tri(A, B, C),
          ...(finite
            ? [
                seg(A, fA, { tone: "b", dash: true }),
                seg(B, fB, { tone: "b", dash: true }),
                seg(C, fC, { tone: "b", dash: true }),
                seg(fA, H, { tone: "muted", dash: true, thin: true }),
                seg(fB, H, { tone: "muted", dash: true, thin: true }),
                seg(fC, H, { tone: "muted", dash: true, thin: true }),
                pt(H, "H", "e", "a"),
              ]
            : []),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          txt(v(-3, -1), "", "c"),
          txt(v(9, 5), "", "c"),
        ],
        readout: [`Üçgen ${kind}: H ${where}`],
      };
    },
  },
  "Kenar orta dikmeleri ve çevrel merkez O": {
    caption:
      "A'yı kaydır: O üç köşeye eşit uzaklıktadır ve çevrel çemberin merkezidir. Dik üçgende hipotenüsün orta noktasına, geniş üçgende dışarıya çıkar.",
    alt: "Tabanı sabit ABC üçgeni, kenar orta dikmeleri ve bunların kesişimi O merkezli çevrel çember.",
    param: { label: "A'nın yatay konumu", min: -2, max: 8, step: 0.5, init: 2 },
    draw: (x) => {
      const B = v(0, 0);
      const C = v(6, 0);
      const A = v(x, 4);
      const O = circumcenter(A, B, C);
      const R = dist(O, A);
      const kind = x < 0 || x > 6 ? "geniş açılı" : x === 0 || x === 6 ? "dik" : "dar açılı";
      return {
        els: [
          circle(O, R, { tone: "muted", thin: true, dash: true }),
          tri(A, B, C),
          ...[
            [B, C],
            [C, A],
            [A, B],
          ].map(([p, q]) => seg(mid(p, q), O, { tone: "a", thin: true })),
          ...[A, B, C].map((p) => seg(O, p, { tone: "b", thin: true })),
          pt(A, "A", "n"),
          pt(B, "B", "sw"),
          pt(C, "C", "se"),
          pt(O, "O", "s", "a"),
        ],
        readout: [`OA = OB = OC = R ≈ ${fmt(R, 2)}`, `Üçgen ${kind}`],
      };
    },
  },
};

export const geometryFigures031: Record<string, Record<string, FigureDef>> = {
  "tyt-geo-temel-acilar-031": temelAcilar,
  "tyt-geo-ucgende-acilar-031": ucgendeAcilar,
  "tyt-geo-ucgen-esitsizligi-031": ucgenEsitsizligi,
  "tyt-geo-dik-ucgen-031": dikUcgen,
  "tyt-geo-eslik-benzerlik-031": eslikBenzerlik,
  "tyt-geo-ucgen-merkezleri-031": ucgenMerkezleri,
};
