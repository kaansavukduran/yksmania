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
  absExamples207, absRows207, absSpecs207, absSupplement207,
  equationExamples207, equationStart207, equationSteps207, equationSupplement207,
  inequalityExamples207, inequalityRows207, inequalitySpecs207, inequalitySupplement207,
  sufficiencyExamples207, sufficiencyRows207, sufficiencySpecs207, sufficiencySupplement207,
  thirdSideExamples207, thirdSidePairs207, thirdSideRows207, thirdSideSupplement207,
  type AbsSpec207, type InequalitySpec207, type Quad207,
} from "../src/learning/depth207";

const added207 = {
  "tyt-geo-ucgen-esitsizligi-031": [thirdSideSupplement207, thirdSideExamples207],
  "tyt-geo-dortgen-hiyerarsi-032": [sufficiencySupplement207, sufficiencyExamples207],
  "birinci-dereceden-denklemler": [equationSupplement207, equationExamples207],
  "basit-esitsizlikler": [inequalitySupplement207, inequalityExamples207],
  "mutlak-deger": [absSupplement207, absExamples207],
} as const;

type Pt = [number, number];
const sub = (p: Pt, q: Pt): Pt => [p[0] - q[0], p[1] - q[1]];
const len = (p: Pt) => Math.hypot(p[0], p[1]);
const cross = (p: Pt, q: Pt) => p[0] * q[1] - p[1] * q[0];
const near = (x: number, y: number) => Math.abs(x - y) < 1e-9;
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
/** En büyük açı (derece), kosinüs teoreminden; kenar uzunluklarından bağımsız sıralama yok. */
const largestAngle = (a: number, b: number, c: number) => {
  const angle = (opp: number, s: number, t: number) => (Math.acos((s * s + t * t - opp * opp) / (2 * s * t)) * 180) / Math.PI;
  return Math.max(angle(a, b, c), angle(b, a, c), angle(c, a, b));
};
const kindOf = (a: number, b: number, c: number) => {
  const m = largestAngle(a, b, c);
  return Math.abs(m - 90) < 1e-7 ? "dik" : m < 90 ? "dar" : "geniş";
};

describe("depth 0.207.0", () => {
  it("appends a table section, a figure and two examples without touching the accepted guides", () => {
    for (const [id, [supplement, examples]] of Object.entries(added207)) {
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections).toHaveLength(raw.sections.length + theorySupplements[id]!.filter((x) => x.appendSection).length);
      expect(shown.examples.slice(0, raw.examples.length)).toEqual(raw.examples);
      expect(shown.sections.filter(({ table }) => table === supplement.table)).toHaveLength(1);
      expect(shown.sections.at(-1)!.title).toBe(supplement.title);
      expect(shown.sections.at(-1)!.figureTitle).toBe(supplement.title);
      expect(shown.sections.at(-1)!.table?.layout).toBe("table");
      expect(shown.examples.slice(-2)).toEqual(examples);
      expect(theorySupplements[id]!.at(-1)).toBe(supplement);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.sections.at(-1)!.table).toBe(shown.sections.at(-1)!.table);
      expect(sheet.sections.at(-1)!.text).toEqual([supplement.summary]);
      expect(sheet.sections.at(-1)!.figureTitle).toBe(supplement.title);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const row of supplement.table.rows) expect(row).toHaveLength(supplement.table.headers.length);
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      const figure = sectionFigures[id]?.[supplement.title];
      expect(figure).toBeDefined();
      for (let step = 0; step < (figure!.steps?.length ?? 1); step += 1) {
        const frame = figure!.draw(0, step);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        expect(frame.readout!.length).toBeGreaterThan(0);
      }
      expect(renderToStaticMarkup(createElement(SectionFigureView, { def: figure!, title: supplement.title }))).toContain('role="img"');
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        expect(`${example.title} ${example.prompt} ${example.answer}`).not.toMatch(/ÖSYM|resmî|resmi|çıkmış/i);
      }
      // Paragraf, özet, tablo ve çizim metninde sabit yazılmış sayı yerine veri: NaN/undefined sızmaz.
      expect(JSON.stringify([supplement.paragraphs, supplement.summary, supplement.table])).not.toMatch(/NaN|undefined|Infinity/);
    }
    // Önceki çizimler korunur.
    expect(Object.keys(sectionFigures["mutlak-deger"]!).length).toBeGreaterThan(1);
    expect(Object.keys(sectionFigures["tyt-geo-ucgen-esitsizligi-031"]!).length).toBeGreaterThan(1);
  });

  it("classifies every third side with the law of cosines", () => {
    const rows = thirdSideRows207();
    for (const [i, [a, b]] of thirdSidePairs207.entries()) {
      const allowed = range(1, 40).filter((c) => a + b > c && a + c > b && b + c > a);
      expect(rows[i].values).toEqual(allowed);
      expect(rows[i].acute).toEqual(allowed.filter((c) => kindOf(a, b, c) === "dar"));
      expect(rows[i].right).toEqual(allowed.filter((c) => kindOf(a, b, c) === "dik"));
      expect(rows[i].obtuse).toEqual(allowed.filter((c) => kindOf(a, b, c) === "geniş"));
      const cells = thirdSideSupplement207.table.rows[i];
      expect(cells[2]).toBe(`${allowed[0]}–${allowed.at(-1)} (${allowed.length})`);
    }
    // Örnek 1: 6, 10, x dar açılı.
    expect(range(1, 40).filter((x) => x > 4 && x < 16 && kindOf(6, 10, x) === "dar")).toEqual([9, 10, 11]);
    expect(kindOf(6, 10, 8)).toBe("dik");
    // Örnek 2: ikizkenar 4 ve 9.
    const valid = [[4, 4, 9], [4, 9, 9]].filter(([p, q, r]) => p + q > r);
    expect(valid).toEqual([[4, 9, 9]]);
    expect(valid[0].reduce((s, x) => s + x, 0)).toBe(22);
    expect(kindOf(4, 9, 9)).toBe("dar");
    expect((4 * Math.sqrt(77) / 2).toFixed(2)).toBe("17.55");
  });

  it("checks quadrilateral sufficiency by brute force over a grid", () => {
    // Bağımsız kayan noktalı sınıflama.
    const sides = (q: Pt[]) => q.map((p, i) => len(sub(q[(i + 1) % 4], p)));
    const angles = (q: Pt[]) => q.map((p, i) => {
      const u = sub(q[(i + 3) % 4], p); const w = sub(q[(i + 1) % 4], p);
      return (Math.acos((u[0] * w[0] + u[1] * w[1]) / (len(u) * len(w))) * 180) / Math.PI;
    });
    const isPar = (q: Pt[]) => { const s = sides(q); return near(s[0], s[2]) && near(s[1], s[3]); };
    const target = {
      "Paralelkenar": isPar,
      "Dikdörtgen": (q: Pt[]) => isPar(q) && angles(q).every((x) => near(x, 90)),
      "Eşkenar dörtgen": (q: Pt[]) => sides(q).every((x) => near(x, sides(q)[0])),
      "Kare": (q: Pt[]) => sides(q).every((x) => near(x, sides(q)[0])) && angles(q).every((x) => near(x, 90)),
    } as const;
    const diag = (q: Pt[]) => [sub(q[2], q[0]), sub(q[3], q[1])];
    const conds = {
      bisect: (q: Pt[]) => near((q[0][0] + q[2][0]) / 2, (q[1][0] + q[3][0]) / 2) && near((q[0][1] + q[2][1]) / 2, (q[1][1] + q[3][1]) / 2),
      equalDiagonals: (q: Pt[]) => near(len(diag(q)[0]), len(diag(q)[1])),
      perpendicularDiagonals: (q: Pt[]) => { const [p, r] = diag(q); return near(p[0] * r[0] + p[1] * r[1], 0); },
      parallelAndOtherEqual: (q: Pt[]) => near(cross(sub(q[1], q[0]), sub(q[2], q[3])), 0) && near(len(sub(q[3], q[0])), len(sub(q[2], q[1]))),
    };
    const convex = (q: Pt[]) => {
      const t = q.map((p, i) => cross(sub(q[(i + 1) % 4], p), sub(q[(i + 2) % 4], q[(i + 1) % 4])));
      return t.every((x) => x > 0) || t.every((x) => x < 0);
    };
    const grid: Pt[] = [];
    for (let x = 0; x <= 4; x += 1) for (let y = 0; y <= 4; y += 1) grid.push([x, y]);
    const quads: Pt[][] = [];
    for (const A of grid) for (const B of grid) for (const C of grid) for (const D of grid) {
      const q = [A, B, C, D];
      if (convex(q)) quads.push(q);
    }
    expect(quads.length).toBeGreaterThan(1000);
    const rows = sufficiencyRows207();
    for (const [i, spec] of sufficiencySpecs207.entries()) {
      const satisfying = quads.filter((q) => spec.conditions.every((key) => conds[key](q)));
      expect(satisfying.length, spec.target).toBeGreaterThan(0);
      const outside = satisfying.filter((q) => !target[spec.target as keyof typeof target](q));
      if (spec.sufficient) expect(outside, `${spec.target} ${spec.conditions}`).toEqual([]);
      else expect(outside.length, `${spec.target} ${spec.conditions}`).toBeGreaterThan(0);
      const ex = spec.example.map(([x, y]) => [x, y] as Pt);
      expect(convex(ex)).toBe(true);
      expect(spec.conditions.every((key) => conds[key](ex))).toBe(true);
      expect(target[spec.target as keyof typeof target](ex)).toBe(spec.sufficient);
      expect(sufficiencySupplement207.table.rows[i][2]).toBe(spec.sufficient ? "Evet" : "Hayır");
      expect(rows[i].diagonals.map((d) => Number(d.replace(/^(\d*)√(\d+)$/, (_, k, m) => String((k ? Number(k) : 1) * Math.sqrt(Number(m))))))).toEqual(diag(ex).map(len).map((x) => expect.closeTo(x, 9)));
    }
    // Karşı örneklerin adları: ikizkenar yamuk (bir çift paralel, yanlar eş) ve deltoid (komşu eş çiftler).
    const isoTrap = (q: Quad207) => { const p = q.map(([x, y]) => [x, y] as Pt); const s = sides(p); return near(cross(sub(p[1], p[0]), sub(p[2], p[3])), 0) && !isPar(p) && near(s[1], s[3]); };
    const kite = (q: Quad207) => { const s = sides(q.map(([x, y]) => [x, y] as Pt)); return !near(s[0], s[1]) && near(s[0], s[3]) && near(s[1], s[2]); };
    expect([1, 2].map((i) => isoTrap(sufficiencySpecs207[i].example))).toEqual([true, true]);
    expect([4, 6].map((i) => kite(sufficiencySpecs207[i].example))).toEqual([true, true]);
    // Örnek 1: A(1;1), B(7;3), C(5;9), D(−1;7) kare, alan 40.
    {
      const q: Pt[] = [[1, 1], [7, 3], [5, 9], [-1, 7]];
      expect(target["Kare"](q)).toBe(true);
      const area = Math.abs(q.reduce((s, p, i) => s + cross(p, q[(i + 1) % 4]), 0)) / 2;
      expect(area).toBeCloseTo(40, 10);
    }
    // Örnek 2: K(0;0), A(−2;0), C(8;0), B(0;−5), D(0;5).
    {
      const q: Pt[] = [[-2, 0], [0, -5], [8, 0], [0, 5]];
      expect(convex(q)).toBe(true);
      expect(Math.abs(q.reduce((s, p, i) => s + cross(p, q[(i + 1) % 4]), 0)) / 2).toBeCloseTo(50, 10);
      expect(sides(q).map((x) => x * x).map((x) => Math.round(x))).toEqual([29, 89, 89, 29]);
      expect(target["Kare"](q)).toBe(false);
      expect(conds.equalDiagonals(q) && conds.perpendicularDiagonals(q) && !conds.bisect(q)).toBe(true);
    }
  });

  it("keeps the root through every equation step", () => {
    const { p, q, r, s, t } = equationStart207;
    const f = (x: number) => p * (x - q) + r - (s * x + t);
    // Kökü kesirler üzerinde tarayarak bul (bağımsız).
    const roots = range(-600, 600).map((k) => k / 6).filter((x) => near(f(x), 0));
    const { root, rows } = equationSteps207();
    expect(roots).toEqual([root]);
    for (const row of rows) {
      const g = (x: number) => row.left.x * x + row.left.k - (row.right.x * x + row.right.k);
      expect(range(-600, 600).map((k) => k / 6).filter((x) => near(g(x), 0))).toEqual([root]);
      expect(row.leftValue).toBe(row.left.x * root + row.left.k);
      expect(row.rightValue).toBe(row.right.x * root + row.right.k);
      expect(row.leftValue).toBe(row.rightValue);
    }
    expect(equationSupplement207.table.rows.map((row) => row[2])).toEqual(rows.map(({ text }) => text));
    // Örnek 1: 0,3x − 0,5 = 0,1x + 1,3.
    expect(range(-1000, 1000).map((k) => k / 10).filter((x) => near(0.3 * x - 0.5, 0.1 * x + 1.3))).toEqual([9]);
    // Örnek 2: 3x − m = mx + 6.
    // Sol − sağ doğrusaldır: iki noktadaki değeri eğimi ve sabiti verir.
    const g = (m: number, x: number) => 3 * x - m - (m * x + 6);
    const slope = (m: number) => g(m, 1) - g(m, 0);
    expect(range(-10, 10).filter((m) => near(g(m, 2), 0))).toEqual([0]);
    expect(range(-10, 10).filter((m) => slope(m) === 0 && g(m, 0) !== 0)).toEqual([3]);
    expect(range(-10, 10).filter((m) => slope(m) === 0 && g(m, 0) === 0)).toEqual([]);
    expect(range(-10, 10).filter((m) => g(m, 0) === 0)).toEqual([-6]);
    expect(slope(-6)).toBe(9);
  });

  it("matches every inequality row with brute-force membership", () => {
    const holds = ({ a, b, lo, hi }: InequalitySpec207, x: number) => {
      const e = a * x + b;
      return (!lo || (lo.strict ? lo.v < e : lo.v <= e)) && (!hi || (hi.strict ? e < hi.v : e <= hi.v));
    };
    const rows = inequalityRows207();
    for (const [i, spec] of inequalitySpecs207.entries()) {
      const row = rows[i];
      const inRow = (x: number) => (!row.lower || (row.lower.strict ? row.lower.v.n / row.lower.v.d < x : row.lower.v.n / row.lower.v.d <= x))
        && (!row.upper || (row.upper.strict ? x < row.upper.v.n / row.upper.v.d : x <= row.upper.v.n / row.upper.v.d));
      for (const x of range(-240, 240).map((k) => k / 12)) expect(inRow(x), `${row.text} @ ${x}`).toBe(holds(spec, x));
      const ints = range(-100, 100).filter((x) => holds(spec, x));
      if (row.integers) expect(row.integers).toEqual(ints);
      else if (row.maxInt !== undefined && row.minInt === undefined) expect(row.maxInt).toBe(Math.max(...ints));
      else expect(row.minInt).toBe(Math.min(...ints));
      expect(row.flipped).toBe(spec.a < 0);
    }
    // Örnek 1: 5 − 3x ≥ x − 7.
    expect(range(-50, 50).filter((x) => 5 - 3 * x >= x - 7 && x > 0)).toEqual([1, 2, 3]);
    expect(range(-50, 50).filter((x) => 5 - 3 * x >= x - 7).at(-1)).toBe(3);
    // Örnek 2: −2 < x ≤ 3 ⇒ 4 − 2x ∈ [−2, 8).
    const values = range(-1999, 3000).map((k) => 4 - 2 * (k / 1000));
    expect(Math.min(...values)).toBeCloseTo(-2, 10);
    expect(Math.max(...values)).toBeLessThan(8);
    const reachable = range(-20, 20).filter((n) => { const x = (4 - n) / 2; return x > -2 && x <= 3; });
    expect(reachable).toEqual(range(-2, 7));
  });

  it("matches every absolute value row with brute-force distance", () => {
    const holds = ({ m, n, rel, r }: AbsSpec207, x: number) => {
      const e = Math.abs(m * x + n);
      return rel === "<" ? e < r : rel === "≤" ? e <= r : rel === "=" ? near(e, r) : rel === ">" ? e > r : e >= r;
    };
    const rows = absRows207();
    for (const [i, spec] of absSpecs207.entries()) {
      const row = rows[i];
      const c = row.center.n / row.center.d;
      const rad = row.radius.n / row.radius.d;
      for (const x of range(-240, 240).map((k) => k / 12)) {
        const d = Math.abs(x - c);
        const byDistance = spec.rel === "<" ? d < rad : spec.rel === "≤" ? d <= rad + 1e-12 : spec.rel === "=" ? near(d, rad) : d > rad;
        expect(byDistance, `${row.text} @ ${x}`).toBe(holds(spec, x));
      }
      const ints = range(-100, 100).filter((x) => holds(spec, x));
      if (row.integers) expect(row.integers).toEqual(ints);
      else expect(row.outsideInts).toEqual(range(-100, 100).filter((x) => !holds(spec, x)));
    }
    // Örnek 1: 1 ≤ |x − 3| < 4.
    const ring = range(-50, 50).filter((x) => Math.abs(x - 3) >= 1 && Math.abs(x - 3) < 4);
    expect(ring).toEqual([0, 1, 2, 4, 5, 6]);
    expect(ring.reduce((s, x) => s + x, 0)).toBe(18);
    // Örnek 2: −3 ≤ x ≤ 9 ⇔ |x − 3| ≤ 6 ⇔ |2x − 6| ≤ 12.
    for (const x of range(-200, 200).map((k) => k / 10)) {
      expect(Math.abs(x - 3) <= 6 + 1e-12).toBe(x >= -3 && x <= 9);
      expect(Math.abs(2 * x - 6) <= 12 + 1e-12).toBe(x >= -3 && x <= 9);
    }
    expect(range(-50, 50).filter((x) => x >= -3 && x <= 9)).toHaveLength(13);
    expect(range(-50, 50).filter((x) => Math.abs(x + 3) <= 12)).toEqual(range(-15, 9));
  });
});
