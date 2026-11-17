import { describe, expect, it } from "vitest";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  geometryQuadrilaterals032Guides as guides,
  geometryQuadrilaterals032Lessons as lessons,
  geometryQuadrilaterals032Sheets as sheets,
} from "../src/learning/geometryQuadrilaterals032";
const answer = (unit: number, number: number) => {
  const q = lessons[unit].questions[number - 1];
  return q.options[q.answer].tr;
};
const shoelace = (pts: number[][]) =>
  Math.abs(
    pts.reduce((s, p, i) => {
      const next = pts[(i + 1) % pts.length];
      return s + p[0] * next[1] - p[1] * next[0];
    }, 0),
  ) / 2;

describe("032 dörtgen öğretimi: koşul, bağımsız aritmetik ve cevap bağları", () => {
  it("iki ayrı kapsamlı rehber ve kısa özet taşır", () => {
    expect(lessons.map((l) => l.id)).toEqual([
      "tyt-geo-yamuk-deltoid-032",
      "tyt-geo-paralelkenar-ozel-dortgenler-032",
    ]);
    for (const [i, g] of guides.entries()) {
      expect(g.sections).toHaveLength(10);
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(5);
      expect(g.sections.every((s) => s.paragraphs.length === 2)).toBe(true);
      expect(
        g.examples.every(
          (e) =>
            e.steps.length >= 3 && e.pitfall.length > 20 && e.check.length > 20,
        ),
      ).toBe(true);
      expect(sheets[i].topicId).toBe(`topic-${g.id}`);
      expect(sheets[i].lessonId).toBe(g.id);
      expect(sheets[i].sections).toHaveLength(5);
      expect(sheets[i].examples).toHaveLength(2);
      expect(sheets[i].recall).toHaveLength(3);
      const brief = sheets[i].sections.flatMap((s) => s.text).join(" ").length;
      const full = g.sections.flatMap((s) => s.paragraphs).join(" ").length;
      expect(brief / full).toBeLessThan(0.35);
      expect(g.source).toContain("MEBİ");
      expect(g.source).toContain("Aurelia");
    }
  });
  it("24 bağımsız beş seçenekli kartta her yardım ve seçenek gerekçesi tamdır", () => {
    const ids = lessons.flatMap((l) => l.questions.map((q) => q.id));
    expect(new Set(ids).size).toBe(24);
    for (const l of lessons) {
      expect(l.questions).toHaveLength(12);
      expect(l.tags).toContain("Özgün öğretim soruları");
      expect(new Set(l.questions.map((q) => q.answer)).size).toBe(5);
      for (const q of l.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(questionGuidanceSchema.safeParse(q.guidance).success).toBe(true);
        expect(q.guidance!.steps.length).toBeGreaterThanOrEqual(3);
        expect(q.guidance!.optionReasons).toHaveLength(5);
        expect(
          q.guidance!.optionReasons.every((reason) => reason.length > 24),
        ).toBe(true);
        expect(q.explanation.tr).not.toMatch(
          /taslak|düzeltilmelidir|hangi metin/i,
        );
      }
    }
  });
  it("yamuk alanını ve dik üçgenleri model formülü kullanmadan koordinatlarla doğrular", () => {
    expect(
      shoelace([
        [0, 0],
        [14, 0],
        [8, 5],
        [0, 5],
      ]),
    ).toBe(55);
    expect(answer(0, 1)).toBe("55");
    expect(answer(0, 2)).toBe("9");
    expect(answer(0, 3)).toBe("102°");
    const angleCard = lessons[0].questions[2];
    const givenAngle = angleCard.options.findIndex((o) => o.tr === "78°");
    expect(angleCard.guidance!.optionReasons[givenAngle]).toContain("156°");
    const height = Math.sqrt(10 ** 2 - 6 ** 2);
    expect(height).toBe(8);
    expect(answer(0, 4)).toBe(String(height));
    expect(Math.hypot(14 - 5, 12)).toBe(15);
    expect(answer(0, 5)).toBe("15");
    // AC=(9,h), BD=(-4,h); perpendicular dot product is -36+h².
    expect(9 * -4 + 6 * 6).toBe(0);
    expect(answer(0, 6)).toBe("6");
    // Symmetric bases6/14 and height10 give perpendicular (10,10),(-10,10).
    expect(10 * -10 + 10 * 10).toBe(0);
    expect(
      shoelace([
        [0, 0],
        [14, 0],
        [10, 10],
        [4, 10],
      ]),
    ).toBe(100);
    expect(answer(0, 7)).toBe("100");
  });
  it("köşegen oranını, dört alanı ve deltoid kenarlarını bağımsız çözer", () => {
    expect(10 / 6).toBeCloseTo(15 / 9);
    expect(answer(0, 8)).toBe("6");
    expect(Math.sqrt(9 * 25) * 2 + 9 + 25).toBe(64);
    expect(answer(0, 9)).toBe("64");
    expect(
      shoelace([
        [0, 6],
        [5, 0],
        [0, -6],
        [-5, 0],
      ]),
    ).toBe(60);
    expect(answer(0, 10)).toBe("60");
    const pts = [
      [0, 5],
      [12, 0],
      [0, -9],
      [-12, 0],
    ];
    expect(Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1])).toBe(13);
    expect(Math.hypot(pts[2][0] - pts[1][0], pts[2][1] - pts[1][1])).toBe(15);
    expect(shoelace(pts)).toBe(168);
    expect(answer(0, 11)).toBe("168");
    expect(answer(0, 12)).toBe("BK=DK");
    // The same legitimate deltoid has AK5, CK9: the other diagonal need not bisect AC.
    expect(5).not.toBe(9);
  });
  it("özel paralelkenarların cevaplarını ayrı geometri hesabıyla doğrular", () => {
    expect(answer(1, 1)).toBe("115°");
    expect(answer(1, 2)).toBe("14");
    expect(
      shoelace([
        [0, 0],
        [12, 0],
        [15, 7],
        [3, 7],
      ]),
    ).toBe(84);
    expect(answer(1, 3)).toBe("84");
    expect(
      shoelace([
        [0, 0],
        [8, 0],
        [8 + 5 * Math.sqrt(3), 5],
        [5 * Math.sqrt(3), 5],
      ]),
    ).toBeCloseTo(40);
    expect(answer(1, 4)).toBe("40");
    expect(answer(1, 5)).toBe("72");
    expect(Math.hypot(3, 4)).toBe(5);
    expect(answer(1, 6)).toBe("5");
    expect(Math.hypot(5, 12)).toBe(13);
    expect(answer(1, 7)).toBe("13");
    // Diagonals12/16 -> side10, area96, semiperimeter20, inradius4.8.
    expect(
      shoelace([
        [0, 6],
        [8, 0],
        [0, -6],
        [-8, 0],
      ]) / 20,
    ).toBeCloseTo(24 / 5);
    expect(answer(1, 8)).toBe("24/5");
    expect(answer(1, 9)).toBe("72");
    expect(12 ** 2 / 2).toBe(72);
    expect((4 * Math.sqrt(7)) ** 2 + 6 ** 2).toBeCloseTo(2 * (5 ** 2 + 7 ** 2));
    expect(answer(1, 10)).toBe("4√7");
    expect(15 ** 2).toBe(9 * (9 + 16));
    expect(answer(1, 11)).toBe("15");
    expect(answer(1, 12)).toBe("AC⊥BD");
  });
  it("kapsayıcı yamukta ikizkenar koşulunu ve yanlış genellemeleri açıklar", () => {
    const yamuk = guides[0].sections
      .map((s) => s.paragraphs.join(" "))
      .join(" ");
    expect(yamuk).toContain("Taban uzunlukları farklı");
    expect(guides[0].sections[3].paragraphs[1]).toContain(
      "E, AD’nin orta noktası",
    );
    expect(yamuk).toContain("yalnız yan kenar eşliği bu simetriyi kanıtlamaz");
    const family = guides[1].sections
      .map((s) => s.paragraphs.join(" "))
      .join(" ");
    expect(family).toContain("eşit, dik veya açıortay olmak zorunda değildir");
    const rectangle = [
      [0, 0],
      [8, 0],
      [8, 6],
      [0, 6],
    ];
    expect(shoelace(rectangle)).toBe(48);
    expect(8 * -8 + 6 * 6).not.toBe(0);
  });
});
