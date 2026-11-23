import {
  dim,
  fmt,
  line,
  poly,
  pt,
  right,
  seg,
  txt,
  v,
  type El,
  type FigureDef,
  type V,
} from "./figureKit";
import { axes } from "./geometryFiguresArea";
import { radicalsSource015SquareFigure } from "./radicalsSource015SquareFigure";

const graph = (f: (x: number) => number, x0: number, x1: number, tone: "a" | "b" | "c" = "b", dash = false): El =>
  poly(
    Array.from({ length: 81 }, (_, i) => {
      const x = x0 + ((x1 - x0) * i) / 80;
      return v(x, f(x));
    }),
    { open: true, tone, dash },
  );
const rect = (x: number, y: number, w: number, h: number, tone: "a" | "b" | "c" | "muted", thin = true): El =>
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], { fill: tone, tone, thin });

const kokluSayilar: Record<string, FigureDef> = {
  "Sıralama, eşlenik, denklem ve alan": radicalsSource015SquareFigure,
  "Karekök bir değer, denklem iki çözüm verebilir": {
    caption:
      "a'yı değiştir: y = x² eğrisini y = a doğrusu a > 0 iken iki noktada keser, bunlar x = ±√a'dır. Kök işareti bu iki çözümden yalnız negatif olmayanı (turuncu) seçer.",
    alt: "y = x² parabolü ve yatay y = a doğrusu; kesişim noktaları −√a ve +√a, pozitif olan vurgulu.",
    param: { label: "a", min: -2, max: 9, step: 1, init: 4 },
    draw: (a) => {
      const els: El[] = [...axes(-3.5, 3.5, -2.5, 9.5, 2), graph((x) => x * x, -3.1, 3.1), line(v(-3.4, a), v(3.4, a), { tone: "c", ext: 0 })];
      if (a > 0) {
        const r = Math.sqrt(a);
        els.push(
          seg(v(-r, 0), v(-r, a), { dash: true, thin: true, tone: "muted" }),
          seg(v(r, 0), v(r, a), { dash: true, thin: true, tone: "a" }),
          pt(v(-r, a), `−√${a}`, "nw", "muted"),
          pt(v(r, a), `√${a} ≈ ${fmt(r, 2)}`, "ne", "a"),
        );
      } else if (a === 0) els.push(pt(v(0, 0), "x = 0", "ne", "a"));
      return {
        els,
        readout: [
          a > 0
            ? `x² = ${a} → x = ±${fmt(Math.sqrt(a), 3)} · √${a} = ${fmt(Math.sqrt(a), 3)} (tek değer)`
            : a === 0
              ? "x² = 0 → x = 0"
              : `x² = ${a}: gerçek çözüm yok, √${a} gerçek sayı değil`,
        ],
      };
    },
  },
  "Kök derecesi ve gerçek sayı koşulu": {
    caption:
      "xⁿ = a denkleminin gerçek çözümlerini grafikte say. Çift derecede (n = 2) a < 0 için çözüm yok, a > 0 için iki çözüm; tek derecede (n = 3) her a için tam bir çözüm vardır: ∛(−8) = −2.",
    alt: "Adıma göre y = x² ya da y = x³ eğrisi ve sürgüyle kayan y = a doğrusu; kesişim noktaları işaretli.",
    param: { label: "a", min: -8, max: 8, step: 1, init: -8 },
    steps: ["Çift derece: x² = a", "Tek derece: x³ = a"],
    draw: (a, step) => {
      const n = step === 0 ? 2 : 3;
      // y is drawn at half scale so x³ = ±8 fits; tick labels keep true values.
      const k = 0.5;
      const els: El[] = [
        line(v(-3, 0), v(3, 0), { tone: "muted", thin: true, ext: 0.2 }),
        line(v(0, -9 * k), v(0, 9 * k), { tone: "muted", thin: true, ext: 0.2 }),
        ...[-8, -4, 4, 8].flatMap((y) => [seg(v(-0.1, y * k), v(0.1, y * k), { tone: "muted", thin: true }), txt(v(0, y * k), String(y), "w", { small: true, tone: "muted", soft: true })]),
        ...[-2, -1, 1, 2].map((x) => txt(v(x, 0), String(x), "s", { small: true, tone: "muted", soft: true })),
        graph((x) => k * x ** n, n === 2 ? -2.95 : -2.05, n === 2 ? 2.95 : 2.05),
        line(v(-3, a * k), v(3, a * k), { tone: "c", ext: 0 }),
        txt(v(3, a * k), `y = ${a}`, "se", { small: true, tone: "c" }),
      ];
      const roots: number[] = n === 3 ? [Math.cbrt(a)] : a > 0 ? [-Math.sqrt(a), Math.sqrt(a)] : a === 0 ? [0] : [];
      roots.forEach((r) => els.push(pt(v(r, a * k), fmt(r, 2), r < 0 ? "nw" : "ne", "a")));
      return {
        els,
        readout: [
          roots.length === 0
            ? `x² = ${a}: gerçek çözüm yok`
            : `x${n === 2 ? "²" : "³"} = ${a} → ${roots.map((r) => fmt(r, 3)).join(" ve ")}`,
        ],
      };
    },
  },
  "Kareden çıkarken mutlak değer kalır": {
    caption:
      "√(x²) = |x|: x negatifken bile sonuç negatif olmaz. Mavi y = x doğrusu ile turuncu y = √(x²) grafiği yalnız x ≥ 0'da çakışır.",
    alt: "y = x doğrusu ve V biçimindeki y = √(x²) = |x| grafiği; sürgüyle seçilen x için iki değer işaretli.",
    param: { label: "x", min: -4, max: 4, step: 0.5, init: -3 },
    draw: (x) => ({
      els: [
        ...axes(-4.5, 4.5, -4.5, 4.5, 2),
        line(v(-4.4, -4.4), v(4.4, 4.4), { tone: "b", ext: 0, dash: true }),
        graph((t) => Math.abs(t), -4.4, 4.4, "a"),
        pt(v(x, Math.abs(x)), `√(${x < 0 ? `(${fmt(x)})` : fmt(x)}²) = ${fmt(Math.abs(x))}`, x < 0 ? "nw" : "ne", "a"),
        ...(x < 0 ? [pt(v(x, x), `x = ${fmt(x)}`, "sw", "b")] : []),
      ],
      readout: [x < 0 ? `x = ${fmt(x)} < 0 → √(x²) = −x = ${fmt(-x)}` : `x = ${fmt(x)} ≥ 0 → √(x²) = x`],
    }),
  },
  "Tam kare çarpanı dışarı çıkar": {
    caption:
      "Alanı 72 olan kare, alanı 2 olan 36 küçük kareye bölünür: 6 × 6 küçük kare. Her küçük karenin kenarı √2 olduğundan büyük karenin kenarı √72 = 6√2'dir.",
    alt: "Büyük kare 6'ya 6 ızgarayla 36 eş küçük kareye bölünmüş; bir küçük kare vurgulu ve kenarı √2, büyük karenin kenarı 6√2 olarak işaretli.",
    draw: () => {
      const s = Math.SQRT2;
      const els: El[] = [];
      for (let i = 1; i < 6; i++) {
        els.push(seg(v(i * s, 0), v(i * s, 6 * s), { thin: true, tone: "muted" }), seg(v(0, i * s), v(6 * s, i * s), { thin: true, tone: "muted" }));
      }
      return {
        els: [
          rect(0, 0, 6 * s, 6 * s, "b", false),
          ...els,
          rect(0, 0, s, s, "a"),
          txt(v(s / 2, s / 2), "2", "c", { small: true, bold: true }),
          dim(v(0, 0), v(s, 0), "√2", v(0, 1), "a"),
          dim(v(0, 6 * s), v(6 * s, 6 * s), "6√2", v(0, 0)),
        ],
        readout: ["72 = 36 · 2 → √72 = √36 · √2 = 6√2"],
      };
    },
  },
  "Toplamada önce benzer kökü oluştur": {
    caption:
      "2√3 ile 3√3 aynı √3 biriminden oluşur; uç uca 5√3 ederler. √2 ve √3 farklı birimlerdir: dik üçgende hipotenüs √5 olur, ama uç uca toplamları √2 + √3 ≈ 3,15'tir, √5 ≈ 2,24 değil.",
    alt: "Üstte √3 uzunluğunda beş eş parça, ikisi bir renk üçü başka renk; altta √2 ve √3 uzunluklu parçalar uç uca ve aynı parçalarla kurulmuş dik üçgenin √5 hipotenüsü.",
    draw: () => {
      const r3 = Math.sqrt(3);
      const r2 = Math.SQRT2;
      const els: El[] = [];
      for (let i = 0; i < 5; i++) els.push(seg(v(i * r3, 3), v((i + 1) * r3, 3), { tone: i < 2 ? "a" : "b", bold: true }), seg(v(i * r3, 2.85), v(i * r3, 3.15), { thin: true }));
      els.push(seg(v(5 * r3, 2.85), v(5 * r3, 3.15), { thin: true }));
      els.push(txt(v(r3, 3.4), "2√3", "n", { tone: "a" }), txt(v(3.5 * r3, 3.4), "3√3", "n", { tone: "b" }), txt(v(5 * r3 + 0.3, 3), "= 5√3", "e"));
      els.push(seg(v(0, 0), v(r2, 0), { tone: "a", bold: true }), seg(v(r2, 0), v(r2 + r3, 0), { tone: "b", bold: true }), txt(v(r2 + r3 + 0.3, 0), "√2 + √3 ≈ 3,15", "e", { small: true }));
      const o = v(6.5, -0.4);
      const A: V = [o[0] + r2, o[1]];
      const B: V = [o[0], o[1] + r3];
      els.push(poly([o, A, B], { fill: "c", tone: "c", thin: true }), right(o, A, B), dim(o, A, "√2", B, "a"), dim(B, o, "√3", A, "b"), dim(A, B, "√5 ≈ 2,24", o, "c"));
      return { els, readout: ["√12 + √27 = 2√3 + 3√3 = 5√3", "√2 + √3 ≠ √5"] };
    },
  },
  "Çarpma ve bölmede tanımı koru": {
    caption:
      "Kenarları √2 ve √8 olan dikdörtgenin alanı √2 · √8 = √16 = 4'tür; kenarı 2 olan kareyle aynı alandır.",
    alt: "Kenarları √2 ve √8 olan dikdörtgen ve yanında kenarı 2 olan kare; ikisinin içinde alan 4 yazıyor.",
    draw: () => {
      const a = Math.SQRT2;
      const b = Math.sqrt(8);
      return {
        els: [
          rect(0, 0, b, a, "b", false),
          rect(b + 1, 0, 2, 2, "a", false),
          txt(v(b / 2, a / 2), "4", "c", { bold: true }),
          txt(v(b + 2, 1), "4", "c", { bold: true }),
          dim(v(0, 0), v(b, 0), "√8", v(0, 1)),
          dim(v(b, 0), v(b, a), "√2", v(0, 0)),
          dim(v(b + 1, 0), v(b + 3, 0), "2", v(b + 1, 1)),
        ],
        readout: ["√2 · √8 = √(2 · 8) = √16 = 4 (a, b ≥ 0)"],
      };
    },
  },
  "Eşlenik değeri değil gösterimi değiştirir": {
    caption:
      "(√7 − 2)(√7 + 2) = 7 − 4: kenarı √7 olan kareden kenarı 2 olan kare çıkarılınca kalan L parçası, kenarları √7 + 2 ve √7 − 2 olan dikdörtgene dönüşür; alanı 3'tür.",
    alt: "İlk adımda kenarı √7 olan karenin köşesinden kenarı 2 olan kare çıkarılmış L biçimi; ikinci adımda L'nin bir parçası taşınarak oluşturulan √7 + 2 ile √7 − 2 kenarlı dikdörtgen.",
    steps: ["√7 kareden 2 kare çıkar", "Parçayı taşı: dikdörtgen"],
    draw: (_, step) => {
      const s = Math.sqrt(7);
      const d = s - 2;
      if (step === 0)
        return {
          els: [
            rect(0, 0, s, s, "b", false),
            rect(d, d, 2, 2, "muted"),
            txt(v(d + 1, d + 1), "4", "c", { small: true }),
            dim(v(0, 0), v(s, 0), "√7", v(0, s)),
            dim(v(d, s), v(s, s), "2", v(0, 0)),
          ],
          readout: ["Kalan alan: 7 − 4 = 3"],
        };
      return {
        els: [
          rect(0, 0, s, d, "b", false),
          rect(s, 0, 2, d, "a", false),
          dim(v(0, 0), v(s + 2, 0), "√7 + 2", v(0, 1)),
          dim(v(s + 2, 0), v(s + 2, d), "√7 − 2", v(0, 0)),
          txt(v((s + 2) / 2, d / 2), "3", "c", { bold: true }),
        ],
        readout: ["(√7 + 2)(√7 − 2) = 3 → 3/(√7 − 2) = √7 + 2"],
      };
    },
  },
  "Sıralamada pozitiflik ve tam kare aralığı": {
    caption:
      "25 < 30 < 36 olduğundan √30, 5 ile 6 arasındadır. Pozitif sayılarda karekök sırayı korur; aynı yolla 3√2 = √18 ile 2√5 = √20 karşılaştırılır.",
    alt: "Üstte kareler sayı doğrusu 25, 30, 36; altta karekökler sayı doğrusu 5, √30, 6; eşleşen noktalar kesikli çizgilerle bağlı.",
    draw: () => {
      const sq = (x: number) => 0.4 * x;
      return {
        els: [
          seg(v(sq(15), 2), v(sq(40), 2), { tone: "muted" }),
          seg(v(4.5 * 2, 0), v(6.5 * 2, 0), { tone: "muted" }),
          ...[
            [25, 5],
            [30, Math.sqrt(30)],
            [36, 6],
          ].flatMap(([a, r], i) => [
            pt(v(sq(a), 2), String(a), "n", i === 1 ? "a" : "ink"),
            pt(v(r * 2, 0), i === 1 ? "√30" : String(r), "s", i === 1 ? "a" : "ink"),
            seg(v(sq(a), 2), v(r * 2, 0), { dash: true, thin: true, tone: i === 1 ? "a" : "muted" }),
          ]),
          txt(v(sq(15), 2), "kare", "w", { small: true, tone: "muted" }),
          txt(v(9, 0), "kök", "w", { small: true, tone: "muted" }),
        ],
        readout: [`5 < √30 ≈ ${fmt(Math.sqrt(30), 2)} < 6`, "3√2 = √18 < √20 = 2√5"],
      };
    },
  },
  "Köklü denklemde önce koşul, sonra kare": {
    caption:
      "√(2x + 3) = x: turuncu eğri ile mavi doğru yalnız x = 3'te kesişir. Kare almak −√(2x + 3) dalını da (kesikli) ekler; x = −1 o dalın kesişimidir, ilk denklemin çözümü değildir.",
    alt: "y = √(2x + 3) eğrisi, onun kesikli negatif dalı ve y = x doğrusu; (3; 3) gerçek kesişim, (−1; −1) yalnız kesikli dalla kesişim.",
    draw: () => ({
      els: [
        ...axes(-2.5, 5, -3, 5),
        graph((x) => Math.sqrt(2 * x + 3), -1.5, 4.8, "a"),
        graph((x) => -Math.sqrt(2 * x + 3), -1.5, 4.8, "a", true),
        line(v(-2.4, -2.4), v(4.8, 4.8), { tone: "b", ext: 0 }),
        pt(v(3, 3), "x = 3 ✓", "nw", "c"),
        pt(v(-1, -1), "x = −1 sahte", "sw", "warn", true),
      ],
      readout: ["Kare: x² = 2x + 3 → x = 3 veya x = −1", "x ≥ 0 koşulu: yalnız 3"],
    }),
  },
  "Özel kökü açarken eşleşen toplam ve çarpımı bul": {
    caption:
      "Kenarı 2 + √3 olan karenin alanı 4 + 3 + 2·2√3 = 7 + 4√3'tür. Bu yüzden √(7 + 4√3) = 2 + √3: m + n = 7 ve m·n = 12 ile m = 4, n = 3.",
    alt: "Kenarı 2 + √3 olan kare dört parçaya bölünmüş: alanı 4 olan kare, alanı 3 olan kare ve alanı 2√3 olan iki dikdörtgen.",
    draw: () => {
      const r = Math.sqrt(3);
      return {
        els: [
          rect(0, 0, 2, 2, "a", false),
          rect(2, 2, r, r, "b", false),
          rect(2, 0, r, 2, "c", false),
          rect(0, 2, 2, r, "c", false),
          txt(v(1, 1), "4", "c", { bold: true }),
          txt(v(2 + r / 2, 2 + r / 2), "3", "c", { bold: true }),
          txt(v(2 + r / 2, 1), "2√3", "c", { small: true, bold: true }),
          txt(v(1, 2 + r / 2), "2√3", "c", { small: true, bold: true }),
          dim(v(0, 0), v(2, 0), "2", v(0, 1)),
          dim(v(2, 0), v(2 + r, 0), "√3", v(2, 1)),
        ],
        readout: ["(2 + √3)² = 7 + 4√3 → √(7 + 4√3) = 2 + √3"],
      };
    },
  },
};

export const mathFiguresRoots: Record<string, Record<string, FigureDef>> = {
  "koklu-sayilar": kokluSayilar,
};
