import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView } from "../src/learning/sectionFigures/figureKit";
import { theorySupplements } from "../src/learning/theorySupplements";
import {
  illuminanceRows213, intensity213, lightExamples213, lightSupplement213, mirrorExamples213, mirrorRows213, mirrorSupplement213,
  obstacle213, refractionExamples213, refractionRows213, refractionSupplement213, refractiveIndex213, shadowCases213,
  shadowExamples213, shadowRows213, shadowSupplement213, sphericalExamples213, sphericalRows213, sphericalSupplement213,
} from "../src/learning/depth213";

const added = [
  ["isik-bilgisi", lightSupplement213, lightExamples213],
  ["golge-yari-golge", shadowSupplement213, shadowExamples213],
  ["duzlem-ayna", mirrorSupplement213, mirrorExamples213],
  ["kuresel-aynalar", sphericalSupplement213, sphericalExamples213],
  ["isigin-kirilmasi", refractionSupplement213, refractionExamples213],
] as const;

const tr = (x: number, d = 2) => {
  const s = String(Number(x.toFixed(d))).replace(".", ",");
  return s.startsWith("-") ? `−${s.slice(1)}` : s;
};
const sind = (d: number) => Math.sin((d * Math.PI) / 180);
const asind = (x: number) => (Math.asin(x) * 180) / Math.PI;

describe("depth 0.213.0 TYT Fizik optik", () => {
  it("appends one table section and two examples without touching the accepted guide", () => {
    for (const [id, supplement, examples] of added) {
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(raw.sections.map(({ title }) => title)).not.toContain(supplement.title);
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections).toHaveLength(raw.sections.length + 1);
      const section = shown.sections.at(-1)!;
      expect(section.title).toBe(supplement.title);
      expect(section.figureTitle).toBe(supplement.title);
      expect(section.table).toBe(supplement.table);
      expect(section.table?.layout).toBe("table");
      expect(section.table!.rows.length).toBeLessThanOrEqual(8);
      expect(section.table!.headers.length).toBeLessThanOrEqual(5);
      for (const row of section.table!.rows) {
        expect(row).toHaveLength(section.table!.headers.length);
        for (const c of row) expect(c).not.toMatch(/NaN|Infinity|undefined|-\d/);
      }
      expect(shown.examples.slice(0, raw.examples.length)).toEqual(raw.examples);
      expect(shown.examples.slice(-2)).toEqual(examples);
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        for (const key of ["title", "prompt", "strategy", "answer", "check", "pitfall"] as const) expect(example[key].length).toBeGreaterThan(5);
        expect(`${example.title} ${example.prompt}`).not.toMatch(/ÖSYM|resmî|resmi|çıkmış/i);
        expect(JSON.stringify(example)).not.toMatch(/NaN|Infinity|undefined/);
      }
      expect(theorySupplements[id]).toEqual([supplement]);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.find(({ title }) => title === supplement.title)!;
      expect(sheetSection.table).toBe(supplement.table);
      expect(sheetSection.figureTitle).toBe(supplement.figureTitle);
      expect(sheetSection.text).toEqual([supplement.summary]);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
    }
  });

  it("registers one drawable figure per new section", () => {
    for (const [id, supplement] of added) {
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      const def = sectionFigures[id][supplement.figureTitle];
      expect(def, id).toBeDefined();
      expect(def.steps!.length).toBe(supplement.table.rows.length);
      for (const step of def.steps!.map((_, i) => i)) {
        const frame = def.draw(0, step);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        expect(frame.readout?.length).toBeGreaterThan(0);
      }
      const html = renderToStaticMarkup(createElement(SectionFigureView, { def, title: supplement.figureTitle }));
      expect(html).toContain('role="img"');
    }
  });

  it("recomputes the illuminance rows", () => {
    const rows = illuminanceRows213();
    expect(rows.map(({ r }) => r)).toEqual([0.5, 1, 1.5, 2, 3, 4]);
    for (const row of rows) {
      expect(row.E).toBeCloseTo(intensity213 / row.r ** 2, 12);
      expect(row.Etilt).toBeCloseTo((intensity213 * Math.cos(Math.PI / 3)) / row.r ** 2, 12);
    }
    expect(lightSupplement213.table.rows).toEqual([
      ["0,5", "0,25", "144", "72", "4"],
      ["1", "1", "36", "18", "1"],
      ["1,5", "2,25", "16", "8", "4/9"],
      ["2", "4", "9", "4,5", "1/4"],
      ["3", "9", "4", "2", "1/9"],
      ["4", "16", "2,25", "1,125", "1/16"],
    ]);
  });

  it("recomputes the shadow widths by casting rays from sampled source points", () => {
    const h = obstacle213;
    for (const c of shadowCases213) {
      // A screen point y is dark for source point s when the line s→y crosses the obstacle.
      const sources = c.D === 0 ? [0] : Array.from({ length: 201 }, (_, i) => -c.D / 2 + (c.D * i) / 200);
      const blocked = (y: number, s: number) => Math.abs(s + ((y - s) * c.a) / c.b) <= h / 2 + 1e-12;
      const ys = Array.from({ length: 4001 }, (_, i) => -50 + i * 0.025);
      const full = ys.filter((y) => sources.every((s) => blocked(y, s)));
      const any = ys.filter((y) => sources.some((s) => blocked(y, s)));
      const width = (list: number[]) => (list.length ? list.at(-1)! - list[0] : 0);
      const row = shadowRows213().find((r) => r.D === c.D && r.b === c.b)!;
      expect(width(full)).toBeCloseTo(row.umbra, 1);
      expect(width(any)).toBeCloseTo(row.total, 1);
    }
    expect(shadowSupplement213.table.rows.map((r) => r.slice(2))).toEqual([
      ["30", "0", "30"], ["22", "16", "38"], ["16", "8", "24"], ["10", "20", "30"],
      ["10", "40", "50"], ["5", "20", "25"], ["0 (tek nokta)", "40", "40"], ["yok", "70", "70"],
    ]);
  });

  it("counts the two-mirror images independently by reflecting point coordinates", () => {
    // Bağımsız yöntem: noktaları koordinatla yansıt, aynanın önündeyse (yarı düzlem) devam et.
    const count = (alpha: number, theta: number) => {
      const a = (alpha * Math.PI) / 180;
      const normals = [[0, 1], [Math.sin(a), -Math.cos(a)]] as const; // iç yüzlere doğru normaller
      const reflect = ([x, y]: number[], k: 0 | 1) => {
        const [nx, ny] = normals[k];
        const d = x * nx + y * ny;
        return [x - 2 * d * nx, y - 2 * d * ny];
      };
      const inFront = ([x, y]: number[], k: 0 | 1) => x * normals[k][0] + y * normals[k][1] > 1e-7;
      const found: number[][] = [];
      for (const first of [0, 1] as const) {
        let p = [Math.cos((theta * Math.PI) / 180), Math.sin((theta * Math.PI) / 180)];
        let k: 0 | 1 = first;
        while (inFront(p, k)) {
          p = reflect(p, k);
          if (!found.some((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) < 1e-6)) found.push(p);
          k = k === 0 ? 1 : 0;
        }
      }
      return found.length;
    };
    for (const row of mirrorRows213()) {
      expect(count(row.alpha, row.alpha / 2)).toBe(row.bisector.length);
      expect(count(row.alpha, row.alpha / 3)).toBe(row.offAxis.length);
      expect(count(row.alpha, row.alpha / 2)).toBe(360 / row.alpha - 1);
    }
    expect(mirrorSupplement213.table.rows.map((r) => r.slice(2))).toEqual([
      ["2", "2", "3"], ["3", "3", "3"], ["4", "4", "5"], ["5", "5", "5"], ["7", "7", "7"], ["8", "8", "9"], ["9", "9", "9"], ["11", "11", "11"],
    ]);
  });

  it("recomputes every spherical mirror row from 1/f = 1/u + 1/v", () => {
    const f = 10;
    for (const row of sphericalRows213()) {
      if (row.u === f) {
        expect(row.img).toBeUndefined();
        continue;
      }
      const v = 1 / (1 / f - 1 / row.u);
      expect(row.v).toBeCloseTo(v, 12);
      expect(row.m).toBeCloseTo(-v / row.u, 12);
    }
    expect(sphericalSupplement213.table.rows.map((r) => r.slice(0, 4))).toEqual([
      ["60", "12", "−0,2", "gerçek, ters, küçük"],
      ["30", "15", "−0,5", "gerçek, ters, küçük"],
      ["20", "20", "−1", "gerçek, ters, eş boylu"],
      ["15", "30", "−2", "gerçek, ters, büyük"],
      ["12", "60", "−5", "gerçek, ters, büyük"],
      ["10", "tanımsız (payda 0)", "—", "sonlu görüntü yok"],
      ["6", "−15", "2,5", "sanal, düz, büyük"],
      ["2", "−2,5", "1,25", "sanal, düz, büyük"],
    ]);
  });

  it("recomputes the refraction rows and critical angles with Snell’s law", () => {
    expect(refractiveIndex213).toEqual({ hava: 1, su: 1.33, cam: 1.5 });
    for (const row of refractionRows213()) {
      expect(row.rSu).toBeCloseTo(asind(sind(row.i) / 1.33), 10);
      expect(row.rCam).toBeCloseTo(asind(sind(row.i) / 1.5), 10);
    }
    const rows = refractionSupplement213.table.rows;
    expect(rows.map((r) => [r[2], r[3]])).toEqual([
      ["0°", "0°"], ["11,2°", "9,9°"], ["22,1°", "19,5°"], ["32,1°", "28,1°"], ["40,6°", "35,3°"], ["46,6°", "40,1°"], ["48,8°", "41,8°"],
    ]);
    expect(tr(asind(1 / 1.33), 1)).toBe("48,8");
    expect(tr(asind(1 / 1.5), 1)).toBe("41,8");
    expect(refractionSupplement213.summary).toContain(`cam→su ${tr(asind(1.33 / 1.5), 1)}°`);
  });

  it("checks every new example answer", () => {
    // Işık: eşit aydınlanma ve masa lambası.
    expect(36 / 2 ** 2).toBe(9 / 1 ** 2);
    expect(lightExamples213[0].answer).toContain("K’den 2 m");
    expect(lightExamples213[0].answer).toContain("9 lx");
    const h = Math.sqrt(36 / 16);
    const r = Math.hypot(h, 2);
    expect((36 * (h / r)) / r ** 2).toBeCloseTo(3.456, 12);
    expect(lightExamples213[1].answer).toContain("1,5 m");
    expect(lightExamples213[1].answer).toContain("3,456 lx");
    // Gölge: disk ve tam gölge ucu.
    expect((12 * 60 - 6 * 40) / 20).toBe(24);
    expect((12 * 60 + 6 * 40) / 20).toBe(48);
    expect(shadowExamples213[0].answer).toContain("24 cm");
    expect(shadowExamples213[0].answer).toContain("12 cm");
    expect((24 * 40) / (24 - 12) - 40).toBe(40);
    expect(shadowExamples213[1].answer).toContain("40 cm");
    // Düzlem ayna.
    expect(360 / (7 + 1)).toBe(45);
    expect(360 / 30 - 1).toBe(11);
    expect(mirrorExamples213[0].answer).toContain("45°");
    expect(mirrorExamples213[0].answer).toContain("11 görüntü");
    // 60°’lik aynalar: A yüzeyiyle 40° → B yüzeyiyle 80°, gelme açısı 10°, yön farkı 120°.
    const dirIn = [-Math.cos((40 * Math.PI) / 180), -Math.sin((40 * Math.PI) / 180)];
    const afterA = [dirIn[0], -dirIn[1]];
    const nB = [Math.sin(Math.PI / 3), -Math.cos(Math.PI / 3)];
    const dn = afterA[0] * nB[0] + afterA[1] * nB[1];
    const afterB = [afterA[0] - 2 * dn * nB[0], afterA[1] - 2 * dn * nB[1]];
    expect((Math.acos(Math.abs(dn)) * 180) / Math.PI).toBeCloseTo(10, 9);
    expect((Math.acos(dirIn[0] * afterB[0] + dirIn[1] * afterB[1]) * 180) / Math.PI).toBeCloseTo(120, 9);
    expect(mirrorExamples213[1].answer).toContain("10°");
    expect(mirrorExamples213[1].answer).toContain("120°");
    // Küresel ayna.
    expect(1 / 15 + 1 / 30).toBeCloseTo(1 / 10, 12);
    expect(1 / 5 - 1 / 10).toBeCloseTo(1 / 10, 12);
    expect(sphericalExamples213[0].answer).toContain("u = 15 cm");
    expect(sphericalExamples213[0].answer).toContain("u = 5 cm");
    expect(sphericalExamples213[1].answer).toContain("15 cm uzaklaşır");
    expect(sphericalExamples213[1].answer).toContain("2 cm’den 8 cm’ye");
    // Kırılma: ışık çemberi ve camdan suya.
    expect(tr(2 * Math.tan(Math.asin(1 / 1.33)))).toBe("2,28");
    expect(refractionExamples213[0].answer).toContain("2,28 m");
    expect(tr(asind((1.5 * sind(45)) / 1.33), 1)).toBe("52,9");
    expect((1.5 * sind(70)) / 1.33).toBeGreaterThan(1);
    expect(refractionExamples213[1].answer).toContain("52,9°");
    expect(refractionExamples213[1].answer).toContain("tam iç yansıma");
  });
});
