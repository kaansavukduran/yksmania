import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { radicalValue203 } from "../src/learning/geometryDepth203";
import {
  circleAngleRows206, circleAngleSupplement206, circleExamples206, fracValue206,
  polygonExamples206, polygonRows206, polygonSupplement206, powerExamples206, powerRows206, powerSignSupplement206,
  prismExamples206, prismRows206, prismSupplement206, pyramidExamples206, pyramidRows206, pyramidSupplement206,
  solidExamples206, solidRows206, solidSupplement206,
} from "../src/learning/geometryDepth206";

type Pt = [number, number];
type P3 = [number, number, number];
const rad = (deg: number) => (deg * Math.PI) / 180;
const onCircle = (deg: number, r = 1): Pt => [r * Math.cos(rad(deg)), r * Math.sin(rad(deg))];
const angleAt = (o: Pt, p: Pt, q: Pt) => {
  const a = [p[0] - o[0], p[1] - o[1]];
  const b = [q[0] - o[0], q[1] - o[1]];
  return (Math.acos((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(a[0], a[1]) * Math.hypot(b[0], b[1]))) * 180) / Math.PI;
};
const intersect = (p1: Pt, p2: Pt, p3: Pt, p4: Pt): Pt => {
  const d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
  const a = p1[0] * p2[1] - p1[1] * p2[0];
  const b = p3[0] * p4[1] - p3[1] * p4[0];
  return [(a * (p3[0] - p4[0]) - (p1[0] - p2[0]) * b) / d, (a * (p3[1] - p4[1]) - (p1[1] - p2[1]) * b) / d];
};
const sub3 = (a: P3, b: P3): P3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross3 = (a: P3, b: P3): P3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm3 = (a: P3) => Math.hypot(...a);
const dist3 = (a: P3, b: P3) => norm3(sub3(a, b));
const shoelace = (ps: Pt[]) => Math.abs(ps.reduce((s, p, i) => {
  const q = ps[(i + 1) % ps.length];
  return s + p[0] * q[1] - q[0] * p[1];
}, 0)) / 2;

const lessons206 = {
  "tyt-geo-cember-aci-040": [circleAngleSupplement206, circleExamples206],
  "tyt-geo-silindir-koni-kure-040": [solidSupplement206, solidExamples206],
  "uslu-sayilar": [powerSignSupplement206, powerExamples206],
  "tyt-geo-cokgenler-032": [polygonSupplement206, polygonExamples206],
  "tyt-geo-dik-prizmalar-032": [prismSupplement206, prismExamples206],
  "tyt-geo-piramitler-032": [pyramidSupplement206, pyramidExamples206],
} as const;

describe("geometry and powers depth 0.206.0", () => {
  it("appends a table section, a figure and two examples without touching the accepted guide", () => {
    for (const [id, [added, examples]] of Object.entries(lessons206)) {
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(raw.sections.some(({ title }) => title === added.title), id).toBe(false);
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections.filter(({ table }) => table === added.table)).toHaveLength(1);
      const last = shown.sections.at(-1)!;
      expect(last.title).toBe(added.title);
      expect(last.figureTitle).toBe(added.title);
      expect(last.table?.layout).toBe("table");
      expect(last.table!.rows.every((row) => row.length === last.table!.headers.length)).toBe(true);
      expect(shown.examples.slice(-2)).toEqual(examples);
      expect(shown.examples.slice(0, raw.examples.length)).toEqual(raw.examples);
      // Earlier supplements of the same lesson stay in place before the new one.
      expect(theorySupplements[id]!.at(-1)).toBe(added);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.at(-1)!;
      expect(sheetSection.table).toBe(last.table);
      expect(sheetSection.text).toEqual([added.summary]);
      expect(sheetSection.figureTitle).toBe(added.title);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        expect(`${example.title} ${example.prompt} ${example.answer}`).not.toMatch(/ÖSYM|resmî|resmi sınav/i);
      }
      // Figure registered under the new section title and drawable in every step.
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBeDefined();
      const values = figure!.param ? [figure!.param.min, figure!.param.init, figure!.param.max] : [0];
      for (const value of values)
        for (let step = 0; step < (figure!.steps?.length ?? 1); step++) {
          const frame = figure!.draw(value, step);
          expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        }
    }
  });

  it("measures every circle angle type on real coordinates", () => {
    for (const [ab, cd] of [[110, 40], [100, 30], [130, 50]]) {
      const rows = circleAngleRows206(ab, cd);
      const [A, B, C, D] = [90 + ab / 2, 90 - ab / 2, 270 + cd / 2, 270 - cd / 2].map((d) => onCircle(d));
      const O: Pt = [0, 0];
      const measured = [
        angleAt(O, A, B),
        angleAt(onCircle(200), A, B),
        // Teğet A’da: OA’ya dik doğrultu, AB yayı tarafı.
        angleAt(A, [A[0] + Math.sin(rad(90 + ab / 2)), A[1] - Math.cos(rad(90 + ab / 2))], B),
        angleAt(intersect(A, C, B, D), A, B),
        angleAt(intersect(A, D, B, C), A, B),
        angleAt([0, 1 / Math.cos(rad(ab / 2))], A, B),
      ];
      const Q = intersect(A, D, B, C);
      expect(Math.hypot(...Q)).toBeGreaterThan(1);
      expect(Math.hypot(...intersect(A, C, B, D))).toBeLessThan(1);
      rows.forEach(({ value }, i) => expect(measured[i], rows[i].kind).toBeCloseTo(value, 9));
    }
    expect(circleAngleRows206().map(({ value }) => value)).toEqual([110, 55, 55, 75, 35, 70]);
  });

  it("checks the circle examples with coordinates", () => {
    // Saat yönünün tersine A, B, D, C: AB 95°, BD 130°, DC 95°, CA 40°.
    const [A, B, D, C] = [0, 95, 225, 320].map((d) => onCircle(d));
    const P = intersect(A, B, C, D);
    expect(Math.hypot(...P)).toBeGreaterThan(1);
    expect(Math.hypot(P[0] - A[0], P[1] - A[1])).toBeLessThan(Math.hypot(P[0] - B[0], P[1] - B[1]));
    expect(angleAt(P, A, C)).toBeCloseTo(45, 9);
    const E = intersect(A, D, B, C);
    expect(Math.hypot(...E)).toBeLessThan(1);
    expect(angleAt(E, A, C)).toBeCloseTo(85, 9);
    // İki teğet arası 52°: küçük yay 128°.
    const [TA, TB] = [90 + 64, 90 - 64].map((d) => onCircle(d));
    const T: Pt = [0, 1 / Math.cos(rad(64))];
    expect(angleAt(T, TA, TB)).toBeCloseTo(52, 9);
    for (const c of [220, 270, 330]) expect(angleAt(onCircle(c), TA, TB)).toBeCloseTo(64, 9);
    expect(angleAt(TA, T, TB)).toBeCloseTo(64, 9);
    expect(circleExamples206.map(({ answer }) => answer)).toEqual(["∠APC = 45°, ∠AEC = 85°.", "∠ACB = 64°, ∠PAB = 64°."]);
  });

  it("integrates cone, sphere and cylinder volumes in the circumscribed cylinder", () => {
    const slices = 20000;
    for (const row of solidRows206([1, 2, 3, 6, 5])) {
      const { r, h } = row;
      expect(h).toBe(2 * r);
      let sphere = 0;
      let cone = 0;
      for (let i = 0; i < slices; i++) {
        const y = -r + ((i + 0.5) * h) / slices; // merkezden yükseklik
        sphere += Math.PI * (r * r - y * y) * (h / slices);
        const coneRadius = (r * (r - y)) / h; // tepe üstte (y = r)
        cone += Math.PI * coneRadius * coneRadius * (h / slices);
      }
      expect(fracValue206(row.sphere) * Math.PI).toBeCloseTo(sphere, 3);
      expect(fracValue206(row.cone) * Math.PI).toBeCloseTo(cone, 3);
      expect(fracValue206(row.cylinder) * Math.PI).toBeCloseTo(Math.PI * r * r * h, 9);
      expect(fracValue206(row.sphereArea)).toBe(fracValue206(row.cylinderLateral));
      expect(fracValue206(row.cylinderTotal) * Math.PI).toBeCloseTo(2 * Math.PI * r * r + 2 * Math.PI * r * h, 9);
      expect(fracValue206(row.sphere) / fracValue206(row.cone)).toBeCloseTo(2, 12);
      expect(fracValue206(row.cylinder) / fracValue206(row.cone)).toBeCloseTo(3, 12);
    }
    expect(solidSupplement206.table.rows[2]).toEqual(["3", "6", "18π", "36π", "54π", "36π", "36π", "54π"]);
    // Örnekler: r = 3 için silindir − küre ve küreyle aynı hacimli koni.
    expect(Math.PI * 9 * 6 - (4 * Math.PI * 27) / 3).toBeCloseTo((Math.PI * 9 * 6) / 3, 9);
    const h = ((4 * Math.PI * 27) / 3) / ((Math.PI * 9) / 3);
    expect(h).toBeCloseTo(12, 12);
    expect(Math.hypot(3, h)).toBeCloseTo(3 * Math.sqrt(17), 12);
    expect(Math.hypot(3, h).toFixed(2)).toBe("12.37");
  });

  it("matches the power table with Math.pow and brute-forces the power examples", () => {
    for (const { n, positive, negativeBase, outsideMinus, parity } of powerRows206([-5, -3, -2, -1, 0, 1, 2, 3, 4, 7])) {
      expect(fracValue206(positive)).toBeCloseTo(2 ** n, 15);
      expect(fracValue206(negativeBase)).toBeCloseTo((-2) ** n, 15);
      expect(fracValue206(outsideMinus)).toBeCloseTo(-(2 ** n), 15);
      expect(parity).toBe(n % 2 === 0 ? "çift" : "tek");
    }
    expect(powerSignSupplement206.table.rows.map((row) => row.slice(3))).toEqual([
      ["1/8", "−1/8", "−1/8"], ["1/4", "1/4", "−1/4"], ["1/2", "−1/2", "−1/2"], ["1", "1", "−1"],
      ["2", "−2", "−2"], ["4", "4", "−4"], ["8", "−8", "−8"], ["16", "16", "−16"],
    ]);
    expect((-2) ** 3 * (-2) ** -5 - -(2 ** 0)).toBeCloseTo(5 / 4, 15);
    const hits = [];
    for (let n = -3; n <= 4; n++) if ((-2) ** n < 0 && 2 ** n < 1) hits.push(n);
    expect(hits).toEqual([-3, -1]);
  });

  it("counts polygon angles and diagonals on a drawn regular polygon", () => {
    for (const row of polygonRows206([3, 4, 5, 6, 7, 8, 10, 12, 16])) {
      const { n } = row;
      const ps = Array.from({ length: n }, (_, i) => onCircle((360 * i) / n));
      let interiorSum = 0;
      for (let i = 0; i < n; i++) interiorSum += angleAt(ps[i], ps[(i + n - 1) % n], ps[(i + 1) % n]);
      expect(row.interiorSum).toBeCloseTo(interiorSum, 9);
      expect(row.interior).toBeCloseTo(angleAt(ps[1], ps[0], ps[2]), 9);
      const ext: Pt = [2 * ps[1][0] - ps[0][0], 2 * ps[1][1] - ps[0][1]];
      expect(row.exterior).toBeCloseTo(angleAt(ps[1], ext, ps[2]), 9);
      let diagonals = 0;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if ((j - i) % n !== 1 && (i - j + n) % n !== 1) diagonals += 1;
      expect(row.diagonals).toBe(diagonals);
      expect(row.fromVertex).toBe(Array.from({ length: n }, (_, j) => j).filter((j) => j !== 0 && j !== 1 && j !== n - 1).length);
      expect(row.triangles).toBe(row.fromVertex + 1);
    }
    // Örnek 1: toplam 1440°.
    const n1 = [...Array(40).keys()].find((n) => n >= 3 && (n - 2) * 180 === 1440)!;
    expect([n1, (n1 * (n1 - 3)) / 2, 1440 / n1]).toEqual([10, 35, 144]);
    // Örnek 2: iç açı = 7 · dış açı.
    const n2 = [...Array(100).keys()].find((n) => n >= 3 && Math.abs(180 - 360 / n - 7 * (360 / n)) < 1e-9)!;
    expect([n2, (n2 * (n2 - 3)) / 2]).toEqual([16, 104]);
  });

  it("recomputes prism rows from vertices and brute-forces the prism examples", () => {
    for (const row of prismRows206()) {
      const { a, b } = row.base;
      const base: Pt[] = row.base.kind === "rect" ? [[0, 0], [a, 0], [a, b], [0, b]] : [[0, 0], [a, 0], [0, b]];
      const B = shoelace(base);
      const p = base.reduce((s, q, i) => s + Math.hypot(base[(i + 1) % base.length][0] - q[0], base[(i + 1) % base.length][1] - q[1]), 0);
      expect(row.B).toBeCloseTo(B, 12);
      expect(row.p).toBeCloseTo(p, 12);
      const faces = base.map((q, i) => Math.hypot(base[(i + 1) % base.length][0] - q[0], base[(i + 1) % base.length][1] - q[1]) * row.h);
      expect(row.lateral).toBeCloseTo(faces.reduce((s, f) => s + f, 0), 12);
      expect(row.total).toBeCloseTo(2 * B + row.lateral, 12);
      // Hacim: tabana paralel ince dilimlerin toplamı.
      expect(row.volume).toBeCloseTo(Array.from({ length: 100 }, () => B * (row.h / 100)).reduce((x, y) => x + y, 0), 9);
    }
    expect(prismSupplement206.table.rows.map((row) => row.slice(3))).toEqual([
      ["16", "16", "64", "96", "64"], ["4", "8", "64", "72", "32"], ["12", "14", "70", "94", "60"], ["24", "24", "120", "168", "120"],
    ]);
    const a1 = [...Array(50).keys()].find((a) => 4 * a * 6 === 96)!;
    expect([2 * a1 * a1 + 96, a1 * a1 * 6]).toEqual([128, 96]);
    const boxes = [];
    for (let a = 1; a <= 12; a++) for (let b = a; b <= 12; b++) for (let c = b; c <= 12; c++)
      if ([a * b, a * c, b * c].sort((x, y) => x - y).join() === "6,8,12") boxes.push([a, b, c, a * b * c, 2 * (a * b + a * c + b * c)]);
    expect(boxes).toEqual([[2, 3, 4, 24, 52]]);
  });

  it("recomputes pyramid rows in 3D and checks the pyramid examples", () => {
    for (const row of pyramidRows206()) {
      const s = row.a / 2;
      const base: P3[] = [[-s, 0, -s], [s, 0, -s], [s, 0, s], [-s, 0, s]];
      const T: P3 = [0, row.h, 0];
      const M: P3 = [0, 0, -s];
      expect(row.slant).toBeCloseTo(dist3(T, M), 12);
      expect(Number.isInteger(row.slant)).toBe(true);
      expect(radicalValue203(row.edge)).toBeCloseTo(dist3(T, base[0]), 12);
      const lateral = base.reduce((sum, p, i) => sum + norm3(cross3(sub3(base[(i + 1) % 4], p), sub3(T, p))) / 2, 0);
      expect(row.lateral).toBeCloseTo(lateral, 9);
      expect(row.total).toBeCloseTo(lateral + row.a ** 2, 9);
      // İki dört yüzlüye ayır: |det| / 6.
      const tet = (p: P3, q: P3, r: P3) => {
        const [u, v, w] = [sub3(p, T), sub3(q, T), sub3(r, T)];
        const c = cross3(v, w);
        return Math.abs(u[0] * c[0] + u[1] * c[1] + u[2] * c[2]) / 6;
      };
      expect(row.volume).toBeCloseTo(tet(base[0], base[1], base[2]) + tet(base[0], base[2], base[3]), 9);
      expect(row.prismVolume).toBe(3 * row.volume);
    }
    expect(pyramidSupplement206.table.rows.map((row) => row.slice(3, 8))).toEqual([
      ["5", "√34", "60", "96", "48"], ["5", "√41", "80", "144", "64"], ["13", "√194", "260", "360", "400"], ["10", "2√41", "320", "576", "512"],
    ]);
    const h = Math.sqrt(25 ** 2 - 7 ** 2);
    expect([h, 14 ** 2 + 2 * 14 * 25, (14 ** 2 * h) / 3]).toEqual([24, 896, 1568]);
    expect(6 ** 2 * 9 - (6 ** 2 * 9) / 3).toBe(216);
  });

  it("builds figure readouts from the same rows as the tables", () => {
    const read = (id: string, title: string, value: number, step: number) =>
      sectionFigures[id][title].draw(value, step).readout!.join(" ");
    circleAngleRows206().forEach(({ value, formula }, step) =>
      expect(read("tyt-geo-cember-aci-040", circleAngleSupplement206.title, 0, step)).toContain(`${formula} = ${value}°`));
    expect(read("tyt-geo-silindir-koni-kure-040", solidSupplement206.title, 3, 1)).toContain("Küre hacmi 36π");
    expect(read("uslu-sayilar", powerSignSupplement206.title, -3, 0)).toContain("(−2)⁻³ = −1/8");
    expect(read("tyt-geo-cokgenler-032", polygonSupplement206.title, 12, 2)).toContain("= 54.");
    prismRows206().forEach(({ volume }, step) =>
      expect(read("tyt-geo-dik-prizmalar-032", prismSupplement206.title, 0, step)).toContain(`= ${volume} cm³`));
    pyramidRows206().forEach(({ total }, step) =>
      expect(read("tyt-geo-piramitler-032", pyramidSupplement206.title, 0, step)).toContain(`= ${total} cm²`));
  });
});
