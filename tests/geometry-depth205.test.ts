import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { SectionFigureView } from "../src/learning/sectionFigures/figureKit";
import {
  centerExamples205, centerSupplement205, centerVertices205, euclidExamples205, euclidLegs205, euclidSupplement205,
  quadExamples205, quadExamples205Worked, quadSupplement205, similarityExamples205, similarityScales205,
  similaritySupplement205, trapezoidExamples205, trapezoidSets205, trapezoidSupplement205,
} from "../src/learning/geometryDepth205";

type Pt = [number, number];
const added205 = {
  "tyt-geo-ucgen-merkezleri-031": [centerSupplement205, centerExamples205],
  "tyt-geo-eslik-benzerlik-031": [similaritySupplement205, similarityExamples205],
  "tyt-geo-dik-ucgen-031": [euclidSupplement205, euclidExamples205],
  "tyt-geo-paralelkenar-ozel-dortgenler-032": [quadSupplement205, quadExamples205Worked],
  "tyt-geo-yamuk-deltoid-032": [trapezoidSupplement205, trapezoidExamples205],
} as const;

/** "19/3", "−5/2", "2,4", "√73", "2√13", "65/8" → sayı */
const num = (text: string): number => {
  const s = text.trim().replace("−", "-").replace(",", ".");
  const root = s.match(/^(-?\d*)√(\d+)(?:\/(\d+))?$/);
  if (root) return (root[1] === "" ? 1 : Number(root[1])) * Math.sqrt(Number(root[2])) / (root[3] ? Number(root[3]) : 1);
  const f = s.match(/^(-?\d+(?:\.\d+)?)(?:\/(\d+))?$/);
  if (!f) throw new Error(`Sayı okunamadı: ${text}`);
  return Number(f[1]) / (f[2] ? Number(f[2]) : 1);
};
const d = (p: Pt, q: Pt) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const sub = (p: Pt, q: Pt): Pt => [p[0] - q[0], p[1] - q[1]];
const dot = (p: Pt, q: Pt) => p[0] * q[0] + p[1] * q[1];
const cross = (p: Pt, q: Pt) => p[0] * q[1] - p[1] * q[0];
const midpoint = (p: Pt, q: Pt): Pt => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
const shoelace = (ps: Pt[]) => Math.abs(ps.reduce((s, p, i) => s + cross(p, ps[(i + 1) % ps.length]), 0)) / 2;
const lineDistance = (p: Pt, a: Pt, b: Pt) => Math.abs(cross(sub(b, a), sub(p, a))) / d(a, b);
/** İki doğrunun kesişimi: a + t(b−a) ve c + s(e−c). */
const intersect = (a: Pt, b: Pt, c: Pt, e: Pt): Pt => {
  const r = sub(b, a);
  const q = sub(e, c);
  const t = cross(sub(c, a), q) / cross(r, q);
  return [a[0] + t * r[0], a[1] + t * r[1]];
};
const angleAt = (o: Pt, p: Pt, q: Pt) => (Math.acos(dot(sub(p, o), sub(q, o)) / (d(o, p) * d(o, q))) * 180) / Math.PI;
const rad = (deg: number) => (deg * Math.PI) / 180;
const polar = (r: number, deg: number): Pt => [r * Math.cos(rad(deg)), r * Math.sin(rad(deg))];
/** İki kenar orta dikmesinin kesişimi (çevrel merkez). */
const bisectorPoint = (A: Pt, B: Pt, C: Pt): Pt => {
  const u = sub(B, A);
  const w = sub(C, A);
  const M1 = midpoint(A, B);
  const M2 = midpoint(A, C);
  return intersect(M1, [M1[0] - u[1], M1[1] + u[0]], M2, [M2[0] - w[1], M2[1] + w[0]]);
};
const orthocenter = (A: Pt, B: Pt, C: Pt): Pt => {
  const bc = sub(C, B);
  const ca = sub(A, C);
  return intersect(A, [A[0] - bc[1], A[1] + bc[0]], B, [B[0] - ca[1], B[1] + ca[0]]);
};
const incenter = (A: Pt, B: Pt, C: Pt): Pt => {
  const dir = (X: Pt, Y: Pt, Z: Pt): Pt => {
    const u = sub(Y, X); const w = sub(Z, X);
    return [X[0] + u[0] / d(X, Y) + w[0] / d(X, Z), X[1] + u[1] / d(X, Y) + w[1] / d(X, Z)];
  };
  return intersect(A, dir(A, B, C), B, dir(B, C, A));
};

describe("geometry depth 0.205.0", () => {
  it("appends a table section, a figure and two examples without touching the accepted guide", () => {
    for (const [id, [supplement, examples]] of Object.entries(added205)) {
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections).toHaveLength(raw.sections.length + theorySupplements[id]!.filter((x) => x.appendSection).length);
      expect(shown.examples.slice(0, raw.examples.length)).toEqual(raw.examples);
      expect(shown.sections.filter(({ table }) => table === supplement.table)).toHaveLength(1);
      expect(shown.sections.at(-1)!.title).toBe(supplement.title);
      expect(shown.sections.at(-1)!.table?.layout).toBe("table");
      expect(shown.examples.slice(-2)).toEqual(examples);
      expect(theorySupplements[id]!.at(-1)).toBe(supplement);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.sections.at(-1)!.table).toBe(shown.sections.at(-1)!.table);
      expect(sheet.sections.at(-1)!.text).toEqual([supplement.summary]);
      expect(sheet.sections.at(-1)!.figureTitle).toBe(supplement.title);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      // Bölüm çizimi aynı başlıkla kayıtlı ve her adımda sonlu.
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      const figure = sectionFigures[id]?.[supplement.title];
      expect(figure).toBeDefined();
      for (let step = 0; step < (figure!.steps?.length ?? 1); step += 1) {
        const frame = figure!.draw(0, step);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null/);
        expect(frame.readout!.length).toBeGreaterThan(0);
      }
      expect(renderToStaticMarkup(createElement(SectionFigureView, { def: figure!, title: supplement.title }))).toContain('role="img"');
      // Her örnek eksiksiz ve özgün etiketli: resmî soru iddiası yok.
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        expect(`${example.title} ${example.prompt} ${example.answer}`).not.toMatch(/ÖSYM|resmî|resmi|çıkmış/i);
      }
    }
    // Daha önceki ekler korunur.
    expect(studyGuide("tyt-geo-paralelkenar-ozel-dortgenler-032")!.sections.at(-2)!.title).toBe("Orta noktalarla iç kareyi kur");
    expect(theorySupplements["tyt-geo-yamuk-deltoid-032"]).toHaveLength(2);
  });

  it("recomputes every center row with floating-point constructions", () => {
    const A = centerVertices205.A as unknown as Pt;
    const B = centerVertices205.B as unknown as Pt;
    const C = centerVertices205.C as unknown as Pt;
    expect([d(A, B), d(B, C), d(C, A)]).toEqual([13, 14, 15]);
    const area = shoelace([A, B, C]);
    const M: Pt = midpoint(B, C);
    const G: Pt = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
    const I = incenter(A, B, C);
    const H = orthocenter(A, B, C);
    const O = bisectorPoint(A, B, C);
    const expected: Record<string, Pt> = { G, I, H, O };
    const rows = centerSupplement205.table.rows;
    for (const row of rows) {
      const m = row[3].match(/^([GIHO])\((.+); (.+)\)$/)!;
      expect(num(m[2])).toBeCloseTo(expected[m[1]][0], 10);
      expect(num(m[3])).toBeCloseTo(expected[m[1]][1], 10);
    }
    const r = lineDistance(I, B, C);
    for (const [P1, P2] of [[A, B], [C, A]] as [Pt, Pt][]) expect(lineDistance(I, P1, P2)).toBeCloseTo(r, 10);
    expect(num(rows[1][2].split("= ")[1])).toBeCloseTo(r, 10);
    expect(num(rows[3][2].split("= ")[1])).toBeCloseTo(d(O, A), 10);
    expect(d(O, B)).toBeCloseTo(d(O, C), 10);
    expect(num(rows[0][2].match(/alanı: (\S+);/)![1])).toBeCloseTo(shoelace([G, B, M]), 10);
    expect(d(A, G) / d(G, M)).toBeCloseTo(2, 10);
    expect(rows[0][2]).toContain("AG : GM = 2 : 1");
    // Euler: O, G, H doğrusal ve GH = 2·OG; I bu doğrunun dışında.
    expect(cross(sub(G, O), sub(H, O))).toBeCloseTo(0, 10);
    expect(d(G, H) / d(O, G)).toBeCloseTo(2, 10);
    expect(Math.abs(cross(sub(I, O), sub(H, O)))).toBeGreaterThan(0.1);
    expect(area / ((13 + 14 + 15) / 2)).toBeCloseTo(r, 10);
  });

  it("recomputes similarity rows from scaled coordinates", () => {
    const rows = similaritySupplement205.table.rows;
    expect(rows).toHaveLength(similarityScales205.length);
    for (const [i, row] of rows.entries()) {
      const k = num(row[0]);
      expect(k).toBeCloseTo(similarityScales205[i].n / similarityScales205[i].d, 12);
      const A: Pt = [0, 0]; const B: Pt = [0, 6 * k]; const C: Pt = [8 * k, 0];
      const sides = row[1].split(" – ").map(num);
      expect(sides).toEqual([d(A, B), d(A, C), d(B, C)].map((x) => Number(x.toFixed(10))));
      expect(num(row[2])).toBeCloseTo(lineDistance(A, B, C), 10);
      const [perimeter, pRatio] = row[3].match(/^(\S+) \((\S+)\)$/)!.slice(1).map(num);
      const [area, aRatio] = row[4].match(/^(\S+) \((\S+)\)$/)!.slice(1).map(num);
      expect(perimeter).toBeCloseTo(d(A, B) + d(A, C) + d(B, C), 10);
      expect(area).toBeCloseTo(shoelace([A, B, C]), 10);
      expect(pRatio).toBeCloseTo(perimeter / 24, 10);
      expect(aRatio).toBeCloseTo(area / 24, 10);
      expect(aRatio).toBeCloseTo(pRatio ** 2, 10);
    }
  });

  it("recomputes Öklid rows by placing A from its two leg lengths", () => {
    const rows = euclidSupplement205.table.rows;
    for (const [i, row] of rows.entries()) {
      const [ab, ac] = euclidLegs205[i];
      expect(row[0]).toBe(`${ab}, ${ac}`);
      const bc = num(row[1]);
      expect(ab ** 2 + ac ** 2).toBe(bc ** 2);
      // B(0;0), C(bc;0); A iki çemberin kesişimi.
      const x = (bc ** 2 + ab ** 2 - ac ** 2) / (2 * bc);
      const A: Pt = [x, Math.sqrt(ab ** 2 - x ** 2)];
      const B: Pt = [0, 0]; const C: Pt = [bc, 0];
      expect(angleAt(A, B, C)).toBeCloseTo(90, 9);
      const Hf: Pt = [A[0], 0];
      expect(num(row[2])).toBeCloseTo(d(B, Hf), 10);
      expect(num(row[3])).toBeCloseTo(d(Hf, C), 10);
      expect(num(row[4])).toBeCloseTo(d(A, Hf), 10);
      expect(num(row[5])).toBeCloseTo(d(B, Hf) * d(Hf, C), 9);
      expect(num(row[5])).toBeCloseTo(num(row[4]) ** 2, 9);
    }
  });

  it("checks each quadrilateral property against random members of every family", () => {
    const tol = 1e-9;
    const tests: Record<string, (q: Pt[]) => boolean> = {
      "Karşı kenarlar paralel": ([A, B, C, D]) => Math.abs(cross(sub(B, A), sub(C, D))) < tol && Math.abs(cross(sub(D, A), sub(C, B))) < tol,
      "Karşı kenarlar eş": ([A, B, C, D]) => Math.abs(d(A, B) - d(C, D)) < tol && Math.abs(d(A, D) - d(B, C)) < tol,
      "Köşegenler birbirini ortalar": ([A, B, C, D]) => d(midpoint(A, C), midpoint(B, D)) < tol,
      "Köşegenler eş": ([A, B, C, D]) => Math.abs(d(A, C) - d(B, D)) < tol,
      "Köşegenler dik": ([A, B, C, D]) => Math.abs(dot(sub(C, A), sub(D, B))) < tol,
      "Köşegenler köşe açılarını ortalar": ([A, B, C, D]) =>
        Math.abs(angleAt(A, B, C) - angleAt(A, C, D)) < 1e-7 && Math.abs(angleAt(B, C, D) - angleAt(B, D, A)) < 1e-7,
      "Bütün açılar 90°": (q) => q.every((P, i) => Math.abs(angleAt(P, q[(i + 3) % 4], q[(i + 1) % 4]) - 90) < 1e-7),
      "Bütün kenarlar eş": (q) => q.every((P, i) => Math.abs(d(P, q[(i + 1) % 4]) - d(q[0], q[1])) < tol),
    };
    const pgram = (a: number, b: number, alpha: number): Pt[] => {
      const D = polar(b, alpha);
      return [[0, 0], [a, 0], [a + D[0], D[1]], D];
    };
    let seed = 7;
    const rand = (lo: number, hi: number) => { seed = (seed * 16807) % 2147483647; return lo + ((seed % 10000) / 10000) * (hi - lo); };
    const makers: Record<string, () => Pt[]> = {
      Paralelkenar: () => pgram(rand(2, 9), rand(2, 9), rand(20, 160)),
      Dikdörtgen: () => pgram(rand(2, 9), rand(2, 9), 90),
      "Eşkenar dörtgen": () => { const s = rand(2, 9); return pgram(s, s, rand(20, 160)); },
      Kare: () => { const s = rand(2, 9); return pgram(s, s, 90); },
    };
    const table = quadSupplement205.table;
    expect(table.headers.slice(1)).toEqual(quadExamples205.map(({ name }) => name));
    for (const [column, shape] of quadExamples205.entries()) {
      const vertices = shape.vertices.map(([x, y]) => [x, y] as Pt);
      const randoms = Array.from({ length: 40 }, makers[shape.name]);
      for (const row of table.rows.slice(0, 8)) {
        const test = tests[row[0]];
        expect(test, row[0]).toBeDefined();
        const cell = row[column + 1];
        // Tablodaki örnek hücreyi doğrular; "Evet" ise ailenin rastgele her üyesinde de geçerlidir.
        expect(test(vertices) ? "Evet" : "Hayır").toBe(cell);
        if (cell === "Evet") expect(randoms.every(test), `${shape.name}: ${row[0]}`).toBe(true);
      }
      const [d1, d2] = table.rows[8][column + 1].split(" ve ").map(num);
      const [A, B, C, D] = vertices;
      expect(d1).toBeCloseTo(d(A, C), 10);
      expect(d2).toBeCloseTo(d(B, D), 10);
      const theta = rad(angleAt([0, 0], sub(C, A), sub(D, B)));
      expect(num(table.rows[9][column + 1])).toBeCloseTo((d1 * d2 * Math.sin(theta)) / 2, 9);
      expect(num(table.rows[9][column + 1])).toBeCloseTo(shoelace(vertices), 10);
    }
  });

  it("recomputes trapezoid rows from coordinates", () => {
    const rows = trapezoidSupplement205.table.rows;
    for (const [i, row] of rows.entries()) {
      const { a, c, h } = trapezoidSets205[i];
      expect(row[0]).toBe(`${a} ve ${c}`);
      const A: Pt = [0, 0]; const B: Pt = [a, 0]; const D: Pt = [(a - c) / 2, h]; const C: Pt = [D[0] + c, h];
      expect(d(A, D)).toBeCloseTo(d(B, C), 12);
      expect(num(row[1])).toBe(h);
      expect(num(row[2])).toBeCloseTo(d(midpoint(A, D), midpoint(B, C)), 10);
      expect(num(row[3])).toBeCloseTo(shoelace([A, B, C, D]), 10);
      expect(num(row[4])).toBeCloseTo(d(midpoint(A, C), midpoint(B, D)), 10);
      expect(num(row[5])).toBeCloseTo(d(A, D), 10);
      // Köşegen orta noktaları arası her yamukta aynı: ikizkenar olmayan kayık bir üst taban.
      const D2: Pt = [1, h]; const C2: Pt = [1 + c, h];
      expect(num(row[4])).toBeCloseTo(d(midpoint(A, C2), midpoint(B, D2)), 10);
      expect(num(row[3])).toBeCloseTo(shoelace([A, B, C2, D2]), 10);
    }
  });

  it("checks every new example answer independently", () => {
    // Merkezler 1: A(0;0), B(9;0), C(0;12).
    {
      const A: Pt = [0, 0]; const B: Pt = [9, 0]; const C: Pt = [0, 12];
      const O = bisectorPoint(A, B, C); const H = orthocenter(A, B, C);
      const G: Pt = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
      expect(d(O, G)).toBeCloseTo(2.5, 10);
      expect(d(G, H)).toBeCloseTo(5, 10);
      expect(d(H, A)).toBeCloseTo(0, 10);
    }
    // Merkezler 2: açıları 50°, 60°, 70° olan üçgen.
    {
      const B: Pt = [0, 0]; const C: Pt = [10, 0];
      const A = intersect(B, polar(1, 60), C, [10 + Math.cos(rad(110)), Math.sin(rad(110))]);
      expect(angleAt(A, B, C)).toBeCloseTo(50, 9);
      expect(angleAt(orthocenter(A, B, C), B, C)).toBeCloseTo(130, 9);
      expect(angleAt(bisectorPoint(A, B, C), B, C)).toBeCloseTo(100, 9);
      expect(angleAt(incenter(A, B, C), B, C)).toBeCloseTo(115, 9);
    }
    // Benzerlik 1: kare köşesi E(x;x) BC üzerinde; kaba tarama.
    {
      let best = 0;
      for (let x = 0; x <= 6; x += 0.001) if (Math.abs(x / 12 + x / 6 - 1) < Math.abs(best / 12 + best / 6 - 1)) best = x;
      expect(best).toBeCloseTo(4, 6);
      expect(best ** 2).toBeCloseTo(16, 4);
    }
    // Benzerlik 2: 5–6–7 üçgenini kenarortay 6 ve 9 olacak biçimde ölçekle.
    {
      const T: Pt[] = [[0, 0], [6, 0], [(36 + 25 - 49) / 12, Math.sqrt(25 - ((36 + 25 - 49) / 12) ** 2)]];
      const median = d(T[2], midpoint(T[0], T[1]));
      const scaled = (k: number) => T.map(([x, y]) => [x * k, y * k] as Pt);
      const small = scaled(6 / median); const big = scaled(9 / median);
      expect(d(small[2], midpoint(small[0], small[1]))).toBeCloseTo(6, 10);
      expect((28 * shoelace(big)) / shoelace(small)).toBeCloseTo(63, 10);
    }
    // Öklid 1: Thales çemberinde H(5;0) üstündeki A.
    {
      const B: Pt = [0, 0]; const C: Pt = [20, 0];
      const A: Pt = [5, Math.sqrt(10 ** 2 - 5 ** 2)];
      expect(angleAt(A, B, C)).toBeCloseTo(90, 9);
      expect(d(A, B)).toBeCloseTo(10, 10);
      expect(A[1]).toBeCloseTo(5 * Math.sqrt(3), 10);
      expect(d(A, C)).toBeCloseTo(10 * Math.sqrt(3), 10);
    }
    // Öklid 2: A(0;0), B(9;0), C(0;12).
    {
      const A: Pt = [0, 0]; const B: Pt = [9, 0]; const C: Pt = [0, 12];
      const M = midpoint(B, C);
      const H = intersect(B, C, A, [12, 9]);
      expect(dot(sub(H, A), sub(C, B))).toBeCloseTo(0, 10);
      expect([d(A, M), d(A, H), d(H, M)].map((x) => Number(x.toFixed(10)))).toEqual([7.5, 7.2, 2.1]);
    }
    // Paralelkenar 1: farklı A açılarında açıortayların DC üzerindeki ayakları.
    for (const alpha of [60, 75, 110]) {
      const A: Pt = [0, 0]; const B: Pt = [10, 0]; const D = polar(6, alpha); const C: Pt = [D[0] + 10, D[1]];
      const E = intersect(A, polar(1, alpha / 2), D, C);
      const F = intersect(B, [10 + Math.cos(rad(180 - (180 - alpha) / 2)), Math.sin(rad(180 - (180 - alpha) / 2))], D, C);
      expect(d(D, E)).toBeCloseTo(6, 9);
      expect(d(E, C)).toBeCloseTo(4, 9);
      expect(d(E, F)).toBeCloseTo(2, 9);
      expect(d(D, F)).toBeCloseTo(4, 9);
    }
    // Paralelkenar 2: kenar 8, A = 60°.
    {
      const rh = [[0, 0], [8, 0], [8 + 8 * Math.cos(rad(60)), 8 * Math.sin(rad(60))], polar(8, 60)] as Pt[];
      expect(d(rh[1], rh[3])).toBeCloseTo(8, 10);
      expect(d(rh[0], rh[2])).toBeCloseTo(8 * Math.sqrt(3), 10);
      expect(shoelace(rh)).toBeCloseTo(32 * Math.sqrt(3), 10);
      expect((32 * Math.sqrt(3)).toFixed(2)).toBe("55.43");
    }
    // Yamuk 1: ikizkenar olmayan bir yamukta da sonuç aynı.
    {
      const q: Pt[] = [[0, 0], [21, 0], [11, 6], [2, 6]];
      expect(shoelace(q)).toBeCloseTo(90, 10);
      expect(d(midpoint(q[0], q[3]), midpoint(q[1], q[2]))).toBeCloseTo(15, 10);
      expect(d(midpoint(q[0], q[2]), midpoint(q[1], q[3]))).toBeCloseTo(6, 10);
    }
    // Yamuk 2 (deltoid): A(0;0), C(40;0); K’yi ikiye bölmeyle bul.
    {
      const f = (x: number) => (13 ** 2 - x ** 2) - (37 ** 2 - (40 - x) ** 2);
      let lo = 0; let hi = 13;
      for (let i = 0; i < 100; i += 1) { const m = (lo + hi) / 2; if (f(lo) * f(m) <= 0) hi = m; else lo = m; }
      const x = (lo + hi) / 2;
      const y = Math.sqrt(169 - x * x);
      const q: Pt[] = [[0, 0], [x, -y], [40, 0], [x, y]];
      expect(x).toBeCloseTo(5, 9);
      expect(d(q[1], q[2])).toBeCloseTo(37, 9);
      expect(d(q[1], q[3])).toBeCloseTo(24, 9);
      expect(shoelace(q)).toBeCloseTo(480, 8);
      expect(q.reduce((s, p, i) => s + d(p, q[(i + 1) % 4]), 0)).toBeCloseTo(100, 8);
    }
  });
});
