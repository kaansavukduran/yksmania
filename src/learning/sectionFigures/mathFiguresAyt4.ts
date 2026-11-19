import { fmt, poly, seg, txt, v, type El, type FigureDef, type V } from "./figureKit";

/*
 * Riemann sums against the true area. The three-sum board follows the logic of
 * 2022 AYT Matematik 27 with the cheat-sheet's own check function f(x) = x + 1
 * on [0, 6] (area 24): for an increasing positive f, right endpoints give upper
 * sums (6·f(6) = 42, 3f(3) + 3f(6) = 33) and left endpoints a lower sum
 * (2f(0) + 2f(2) + 2f(4) = 18). The second figure splits at the root: net
 * integral of x on [−2, 1] is −3/2, the area is 2 + 1/2 = 5/2.
 */

const f = (x: number) => x + 1;
const SY = 0.55;
const P = (x: number, y: number) => v(x, y * SY);
const curve = (g: (x: number) => number, a: number, b: number): V[] => Array.from({ length: 61 }, (_, i) => P(a + ((b - a) * i) / 60, g(a + ((b - a) * i) / 60)));

const SUMS: { name: string; parts: [number, number, number][]; value: number; kind: string }[] = [
  { name: "I. 6·f(6)", parts: [[0, 6, 6]], value: 42, kind: "üst" },
  { name: "II. 3f(3) + 3f(6)", parts: [[0, 3, 3], [3, 6, 6]], value: 33, kind: "üst" },
  { name: "III. 2f(0) + 2f(2) + 2f(4)", parts: [[0, 2, 0], [2, 4, 2], [4, 6, 4]], value: 18, kind: "alt" },
];

const threeSums: FigureDef = {
  caption:
    "Artan ve pozitif f(x) = x + 1, [0, 6]: gerçek alan 24 (yeşil). Sağ uç yükseklikleri her parçada eğrinin üstünde kalır (üst toplam), sol uçlar altında (alt toplam). 18 < 24 < 33 < 42; bu yüzden I ve II alanı aşar, III aşmaz (2022 AYT Matematik 27 mantığı; sayılar özgün kontrol fonksiyonundan).",
  alt: "f(x) = x + 1 doğrusu, altında gölgeli gerçek alan; her adımda dikdörtgenler: tek geniş sağ uç dikdörtgeni, iki sağ uç dikdörtgeni, üç sol uç dikdörtgeni.",
  steps: SUMS.map((s) => s.name),
  draw: (_, step) => {
    const s = SUMS[step];
    const els: El[] = [];
    els.push(poly([P(0, 0), ...curve(f, 0, 6), P(6, 0)], { tone: "c", fill: "c", thin: true }));
    for (const [a, b, at] of s.parts) {
      const h = f(at);
      els.push(poly([P(a, 0), P(b, 0), P(b, h), P(a, h)], { tone: s.kind === "üst" ? "warn" : "b", thin: true, dash: true }));
    }
    els.push(poly(curve(f, 0, 6), { tone: "c", open: true, bold: true }));
    els.push(seg(P(0, 0), P(6.4, 0), { tone: "muted" }), seg(P(0, 0), P(0, 7.6), { tone: "muted" }));
    for (let x = 0; x <= 6; x += 2) els.push(txt(P(x, 0), String(x), "s", { small: true, tone: "muted" }));
    for (const y of [1, 4, 7]) els.push(txt(P(-0.1, y), String(y), "w", { small: true, tone: "muted" }));
    els.push(txt(P(6.6, f(6)), "f(x) = x + 1", "e", { small: true, tone: "c" }));
    els.push(txt(P(-1, 8.4), " ", "c"), txt(P(9.2, -1.4), " ", "c"));
    return { els, readout: [`${s.name} = ${s.value} (${s.kind} toplam)`, `Gerçek alan ∫(x + 1)dx = 24 → ${s.value} ${s.value > 24 ? ">" : "<"} 24`] };
  },
};

const g = (x: number) => x;
const rootSplit: FigureDef = {
  caption:
    "f(x) = x, [−2, 1]. Kök x = 0'da aralığı böl: solda üçgen 2 (eksenin altında), sağda 1/2. Alan 2 + 1/2 = 5/2. Net integral ise −2 + 1/2 = −3/2; mutlak değeri sona taşımak 3/2 verir ve alan değildir.",
  alt: "y = x doğrusu; x = −2 ile 0 arasında eksenin altında kalan üçgen, 0 ile 1 arasında üstte kalan küçük üçgen; iki adımda net integral ve alan.",
  steps: ["Net integral (işaretli)", "Alan (kökte böl)"],
  draw: (_, step) => {
    const els: El[] = [];
    const Q = (x: number, y: number) => v(x * 1.4, y * 1.4);
    els.push(poly([Q(-2, 0), Q(0, 0), Q(-2, -2)], { tone: step === 0 ? "warn" : "a", fill: step === 0 ? "warn" : "a", thin: true }));
    els.push(poly([Q(0, 0), Q(1, 0), Q(1, 1)], { tone: "c", fill: "c", thin: true }));
    els.push(seg(Q(-2.4, 0), Q(1.6, 0), { tone: "muted" }), seg(Q(0, -2.3), Q(0, 1.6), { tone: "muted" }));
    els.push(poly([Q(-2.2, g(-2.2)), Q(1.3, g(1.3))], { tone: "ink", open: true, bold: true }));
    els.push(txt(Q(-2, 0), "−2", "n", { small: true, tone: "muted" }), txt(Q(1, 0), "1", "s", { small: true, tone: "muted" }));
    els.push(txt(Q(-1.35, -0.65), step === 0 ? "−2" : "2", "c", { bold: true }), txt(Q(1.15, 0.35), step === 0 ? "+1/2" : "1/2", "e", { small: true, bold: true, tone: "c" }));
    els.push(txt(Q(1.4, 1.3), "y = x", "e", { small: true }));
    els.push(txt(Q(-2.8, 1.9), " ", "c"), txt(Q(2.6, -2.6), " ", "c"));
    return {
      els,
      readout: step === 0 ? ["Net: ∫x dx = [x²/2] = 1/2 − 2 = −3/2", "Alt parça eksi, üst parça artı sayılır."] : [`Alan: 2 + 1/2 = ${fmt(2.5, 1)} = 5/2`, "|∫f| ≠ ∫|f|: |−3/2| = 3/2 alan değildir."],
    };
  },
};

export const mathFiguresAyt4: Record<string, Record<string, FigureDef>> = {
  "ayt-alan-riemann": {
    "Alt ve üst toplam gerçek uç değerleri arar": threeSums,
    "Eksenle alan hesabında bütün kökleri bul": rootSplit,
  },
};
