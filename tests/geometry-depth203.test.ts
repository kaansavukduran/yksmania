import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import {
  parallelAngleRows203, parallelExamples203, radicalValue203, sectorExamples203, sectorRows203,
  specialAngleRows203, trigExamples203, parallelSupplement203, trigSupplement203, sectorSupplement203,
} from "../src/learning/geometryDepth203";

const added203: Record<string, { title: string; table: unknown }> = {
  "tyt-geo-temel-acilar-031": parallelSupplement203,
  "tyt-geo-trigonometrik-oranlar-040": trigSupplement203,
  "tyt-geo-daire-040": sectorSupplement203,
};
const rad = (deg: number) => (deg * Math.PI) / 180;
const dir = (x: number, y: number) => ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
const between = (a: number, b: number) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };

describe("geometry depth 0.203.0", () => {
  it("appends a table section and two examples without touching the accepted guide", () => {
    for (const [id, added] of [
      ["tyt-geo-temel-acilar-031", parallelExamples203],
      ["tyt-geo-trigonometrik-oranlar-040", trigExamples203],
      ["tyt-geo-daire-040", sectorExamples203],
    ] as const) {
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections.filter(({ table }) => table === added203[id].table)).toHaveLength(1);
      expect(shown.sections.at(-1)!.title).toBe(added203[id].title);
      expect(shown.sections.at(-1)!.table?.layout).toBe("table");
      expect(shown.examples.slice(-2)).toEqual(added);
      expect(shown.examples.slice(0, raw.examples.length)).toEqual(raw.examples);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.sections.at(-1)!.table).toBe(shown.sections.at(-1)!.table);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(added.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(added.map(({ pitfall }) => pitfall));
    }
  });

  it("derives the eight parallel angles from real line directions", () => {
    for (const alpha of [58, 35, 104]) {
      // Kesen yönü: sol üstteki açı (d₁'in sol ışını ile kesenin üst ışını) α olacak biçimde.
      const up = 180 - alpha;
      const rays = { left: 180, right: 0, up, down: up + 180 };
      const measures = [
        between(rays.left, rays.up), between(rays.right, rays.up), between(rays.left, rays.down), between(rays.right, rays.down),
      ];
      // d₂ paralel olduğundan aynı yönler: 5–8 = 1–4.
      const expected = [...measures, ...measures];
      expect(parallelAngleRows203(alpha).map(({ measure }) => measure)).toEqual(expected.map((m) => Math.round(m)));
    }
  });

  it("matches special angle ratios with Math.sin, Math.cos and Math.tan", () => {
    for (const { angle, sin, cos, tan, opposite, adjacent, hypotenuse, squareSum } of specialAngleRows203()) {
      expect(radicalValue203(sin)).toBeCloseTo(Math.sin(rad(angle)), 12);
      expect(radicalValue203(cos)).toBeCloseTo(Math.cos(rad(angle)), 12);
      expect(radicalValue203(tan)).toBeCloseTo(Math.tan(rad(angle)), 12);
      expect(radicalValue203(opposite) ** 2 + radicalValue203(adjacent) ** 2).toBeCloseTo(radicalValue203(hypotenuse) ** 2, 12);
      expect(squareSum).toBeCloseTo(1, 12);
    }
  });

  it("computes sector rows from the formulas", () => {
    for (const { angle, fraction, arcPi, areaPi, straight } of sectorRows203()) {
      const [n, d] = fraction.split("/").map(Number);
      expect(n / d).toBeCloseTo(angle / 360, 12);
      expect(arcPi * Math.PI).toBeCloseTo((2 * Math.PI * 6 * angle) / 360, 12);
      expect(areaPi * Math.PI).toBeCloseTo((arcPi * Math.PI * 6) / 2, 12);
      expect(straight).toBe(12);
    }
  });

  it("checks every new example answer", () => {
    // Kırık çizgi: A(0;4), d₁: y=4, d₂: y=0.
    const A = [0, 4];
    const t = 4 / 2 / Math.sin(rad(38));
    const B = [A[0] + t * Math.cos(rad(38)), A[1] - t * Math.sin(rad(38))];
    const s = B[1] / Math.sin(rad(47));
    const C = [B[0] - s * Math.cos(rad(47)), 0];
    expect(C[1]).toBeCloseTo(B[1] - s * Math.sin(rad(47)), 12);
    expect(between(dir(A[0] - B[0], A[1] - B[1]), dir(C[0] - B[0], C[1] - B[1]))).toBeCloseTo(85, 10);
    // Doğrusal çift ve açıortaylar.
    const x = (180 - 18) / 6;
    expect([x, 4 * x + 12, 2 * x + 6]).toEqual([27, 120, 60]);
    expect((4 * x + 12) / 2 + (2 * x + 6) / 2).toBe(90);
    expect(4 * x + 12 + (2 * x + 6) / 2).toBe(150);
    // tan A = 5/12, hipotenüs 39.
    const k = 39 / 13;
    expect(5 * k + 12 * k + 39).toBe(90);
    expect((5 * k) ** 2 + (12 * k) ** 2).toBe(39 ** 2);
    // İki bakış açısı.
    const h = 20 * Math.sqrt(3);
    expect(h / Math.tan(rad(30)) - h / Math.tan(rad(60))).toBeCloseTo(40, 10);
    // Dilim: alan 15π, yay 5π.
    const r = (2 * 15) / 5;
    expect(r).toBe(6);
    expect((5 * 360) / (2 * r)).toBe(150);
    // İki çeyrek dairenin ortak bölgesi: A(0;0), C(4;4), kenar 4. Sayısal integral.
    const n = 2000;
    let inside = 0;
    for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) {
      const px = ((i + 0.5) * 4) / n;
      const py = ((j + 0.5) * 4) / n;
      if (px * px + py * py <= 16 && (px - 4) ** 2 + (py - 4) ** 2 <= 16) inside += 1;
    }
    expect((inside * 16) / (n * n)).toBeCloseTo(8 * Math.PI - 16, 2);
    expect((8 * Math.PI - 16).toFixed(2)).toBe("9.13");
  });
});
