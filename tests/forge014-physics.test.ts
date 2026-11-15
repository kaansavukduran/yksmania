import { describe, it, expect } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  forge014PhysicsLessons as lessons,
  forge014PhysicsGuides as guides,
  forge014PhysicsTopics as topics,
  opticalImage,
  opticalRays,
  lensPower,
  snellState,
  channelMasks,
  filterChannels,
  reflectedChannels,
  prismState,
  type OpticalRay,
} from "../src/learning/forge014Physics";
const keys: Record<string, string[]> = {
  "kuresel-aynalar": [
    "15 cm önde",
    "Ters; 6 cm",
    "Arkada 10 cm; sanal, düz, 2 kat",
    "1/3",
    "Çıkan ışınlar paraleldir; sonlu görüntü yoktur",
    "Yerel normali",
    "v=30 cm; m=−2",
    "Yansıyan ışınların kendileri yerine geri uzantıları birleşir",
    "20 cm",
    "Eğrilik yarıçapına; f≈R/2",
  ],
  "isigin-kirilmasi": [
    "1/3",
    "Yön sapmaz; sürat azalır, frekans korunur",
    "1/2",
    "Tam iç yansıma",
    "400 nm",
    "n₁>n₂ ve i>i_c",
    "2×10⁸ m/s",
    "3 m",
    "Gelene paraleldir; yanal kaymış olabilir",
    "90°",
  ],
  mercekler: [
    "15 cm çıkış tarafında",
    "Çıkışta 20 cm; ters, 4 cm",
    "3",
    "Giriş tarafında 20/3 cm; düz, küçük",
    "Çıkan paraksiyal ışınlar paralel; sonlu görüntü yok",
    "10 cm",
    "f=−80 cm; ıraksak",
    "Optik güç sıfır; ayrı kırıcı odak etkisi yok",
    "Yaklaşık doğrusal devam eder",
    "|f_mor|<|f_kırmızı|",
  ],
  "prizmalar-renkler": [
    "Sarı",
    "Işık yok: [0,0,0]",
    "Kırmızı: [1,0,0]",
    "Karanlık",
    "Yeşil",
    "Mor ışık kırmızıdan daha fazla sapar",
    "Tam iç yansıma yapar",
    "Aynı renk algısı tek başına aynı tayfı kanıtlamaz",
    "Camgöbeği",
    "Kırmızı",
  ],
};
function crossing(a: OpticalRay, b: OpticalRay) {
  const det = a.direction.x * b.direction.y - a.direction.y * b.direction.x;
  const dx = b.start.x - a.start.x,
    dy = b.start.y - a.start.y;
  if (Math.abs(det) < 1e-12) return null;
  const t = (dx * b.direction.y - dy * b.direction.x) / det;
  return {
    x: a.start.x + t * a.direction.x,
    y: a.start.y + t * a.direction.y,
    t,
  };
}
describe("four actual-source optics units", () => {
  it("maps134–137andretains32deepsections16examples16recall40Qs", () => {
    expect(topics).toEqual({
      "kuresel-aynalar": "detail-134",
      "isigin-kirilmasi": "detail-135",
      mercekler: "detail-136",
      "prizmalar-renkler": "detail-137",
    });
    expect(guides.reduce((n, g) => n + g.sections.length, 0)).toBe(32);
    expect(guides.reduce((n, g) => n + g.examples.length, 0)).toBe(16);
    expect(guides.reduce((n, g) => n + g.recall.length, 0)).toBe(16);
    for (const g of guides) {
      expect(g.sections.every((s) => s.paragraphs.length === 2)).toBe(true);
      expect(g.examples.every((e) => e.steps.length >= 3)).toBe(true);
      expect(g.source).toContain("MEBİ TYT Fizik");
    }
  });
  it("keeps all40 original cards self-contained and all independent keys unique", () => {
    const ids = new Set();
    for (const l of lessons) {
      expect(l.questions).toHaveLength(10);
      for (const [i, q] of l.questions.entries()) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.options[q.answer].tr, q.id).toBe(keys[l.id][i]);
        expect(questionContentIssues(q), q.id).toEqual([]);
        expect(q.hint.tr.trim()).not.toBe("");
        expect(q.explanation.tr.trim()).not.toBe(q.options[q.answer].tr);
      }
      expect(new Set(l.questions.map((q) => q.answer)).size).toBe(5);
    }
  });
  it("distinguishes real,virtual,equal-height and exact-focal infinity without fake finite values", () => {
    expect(opticalImage(10, 30)).toEqual({
      kind: "real",
      distance: 15,
      magnification: -0.5,
      height: -0.5,
    });
    expect(opticalImage(10, 20).magnification).toBe(-1);
    expect(opticalImage(10, 15).distance).toBe(30);
    expect(opticalImage(10, 5)).toEqual({
      kind: "virtual",
      distance: -10,
      magnification: 2,
      height: 2,
    });
    expect(opticalImage(-10, 20).distance).toBeCloseTo(-20 / 3);
    expect(opticalImage(-10, 20).magnification).toBeCloseTo(1 / 3);
    expect(opticalImage(10, 10)).toEqual({
      kind: "infinity",
      distance: null,
      magnification: null,
      height: null,
    });
    expect(Number.isFinite(opticalImage(10, 11).distance)).toBe(true);
  });
  it("makes actual signed ray intersections agree with image side and height", () => {
    for (const device of ["mirror", "lens"] as const)
      for (const [f, u] of [
        [10, 30],
        [10, 20],
        [10, 15],
        [10, 5],
        [-10, 20],
      ]) {
        const r = opticalRays(device, f, u),
          c = crossing(r.parallel, r.central)!;
        expect(c.x).toBeCloseTo(r.imagePoint!.x);
        expect(c.y).toBeCloseTo(r.imagePoint!.y);
        expect(c.t > 0).toBe(r.image.kind === "real");
      }
    for (const device of ["mirror", "lens"] as const) {
      const r = opticalRays(device, 10, 10);
      expect(crossing(r.parallel, r.central)).toBeNull();
    }
    const reflected = opticalRays("mirror", 10, 30).central;
    expect(reflected.direction.x).toBe(-1);
    expect(reflected.direction.y).toBeCloseTo(-1 / 30);
  });
  it("recomputes relative-index lens power instead of freezingf across a medium change", () => {
    expect(lensPower("convex", 1.5, 1, 10)).toEqual({
      power: 0.1,
      focal: 10,
      behavior: "converging",
    });
    expect(lensPower("convex", 1.5, 1.6, 10).focal).toBe(-80);
    expect(lensPower("concave", 1.5, 1, 10).focal).toBe(-10);
    expect(lensPower("concave", 1.5, 1.6, 10).focal).toBe(80);
    expect(lensPower("convex", 1.5, 1.5, 10)).toEqual({
      power: 0,
      focal: null,
      behavior: "neutral",
    });
    expect(lensPower("convex", 1.5, 1, 20).focal).toBe(20);
  });
  it("uses normalSnellangleswithcritical equality and no transmitted ray above it", () => {
    const a = snellState(1, 1.5, 30);
    expect(a.angle).toBeCloseTo(19.4712206);
    expect(a.lambda1).toBe(600);
    expect(a.lambda2).toBe(400);
    expect(a.frequency / 5e14).toBeCloseTo(1);
    expect(a.speed2).toBe(2e8);
    expect(snellState(1, 1.5, 0).angle).toBe(0);
    const c = (Math.asin(2 / 3) * 180) / Math.PI;
    expect(snellState(1.5, 1, c).kind).toBe("critical");
    expect(snellState(1.5, 1, c).angle).toBe(90);
    expect(snellState(1.5, 1, c + 0.01)).toMatchObject({
      kind: "total",
      angle: null,
      lambda2: null,
    });
    expect(snellState(1, 1.5, 80).criticalAngle).toBeNull();
    expect(snellState(1.5, 1, 30).frequency).toBe(a.frequency);
  });
  it("conservesavailableRGBchannelsacrossserialfiltersandreflection", () => {
    expect(
      filterChannels(channelMasks.none, channelMasks.yellow, channelMasks.blue)
        .output,
    ).toEqual([0, 0, 0]);
    expect(
      filterChannels(channelMasks.none, channelMasks.yellow, channelMasks.red)
        .output,
    ).toEqual([1, 0, 0]);
    expect(reflectedChannels(channelMasks.blue, channelMasks.yellow)).toEqual([
      0, 0, 0,
    ]);
    for (const input of Object.values(channelMasks))
      for (const f of Object.values(channelMasks))
        for (const g of Object.values(channelMasks)) {
          const a = filterChannels(input, f, g).output,
            b = filterChannels(input, g, f).output;
          expect(a).toEqual(b);
          a.forEach((v, j) => {
            expect(v).toBeLessThanOrEqual(input[j]);
            expect(v).toBeLessThanOrEqual(f[j]);
            expect(v).toBeLessThanOrEqual(g[j]);
          });
        }
  });
  it("traces twoactualprismsurfaces with Snell conditions and given-index dispersion", () => {
    const red = prismState(1.5),
      violet = prismState(1.6),
      rad = Math.PI / 180;
    expect(red.deviation).toBeCloseTo(21.7367145);
    expect(violet.deviation).toBeCloseTo(26.4364177);
    expect(violet.deviation!).toBeGreaterThan(red.deviation!);
    for (const [n, p] of [
      [1.5, red],
      [1.6, violet],
    ] as const) {
      expect(n * Math.sin(p.insideAngle * rad)).toBeCloseTo(0.5);
      expect(p.insideAngle + p.secondIncidence).toBeCloseTo(40);
      expect(n * Math.sin(p.secondIncidence * rad)).toBeCloseTo(
        Math.sin(p.exitAngle! * rad),
      );
      expect(p.exit.x + p.halfBase * p.exit.y).toBeCloseTo(p.halfBase);
      expect(
        Math.atan2(p.incomingDirection.y, p.incomingDirection.x) / rad -
          Math.atan2(p.outgoingDirection!.y, p.outgoingDirection!.x) / rad,
      ).toBeCloseTo(p.deviation!);
    }
    expect(prismState(2.5)).toMatchObject({
      total: true,
      exitAngle: null,
      deviation: null,
      outgoingDirection: null,
    });
  });
  it("rejects nonphysical or nonfinite inputs without NaNrays", () => {
    expect(() => opticalImage(0, 10)).toThrow();
    expect(() => opticalImage(Infinity, 10)).toThrow();
    expect(() => opticalImage(10, 0)).toThrow();
    expect(() => lensPower("convex", 1.5, 0, 10)).toThrow();
    expect(() => lensPower("bad" as never, 1.5, 1, 10)).toThrow();
    expect(() => snellState(1, 1.5, 90)).toThrow();
    expect(() => snellState(1, 1.5, -1)).toThrow();
    expect(() =>
      filterChannels([1, 2, 0], channelMasks.none, channelMasks.none),
    ).toThrow();
    expect(() => prismState(0)).toThrow();
    expect(() => prismState(1.5, 0)).toThrow();
    expect(() => prismState(0.5)).toThrow();
  });
});
