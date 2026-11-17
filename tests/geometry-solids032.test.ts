import { describe, expect, it } from "vitest";
import {
  geometrySolids032Guides as guides,
  geometrySolids032Lessons as lessons,
  geometrySolids032Sheets as sheets,
} from "../src/learning/geometrySolids032";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";

const answer = (family: number, card: number) => {
  const q = lessons[family].questions[card - 1];
  return q.options[q.answer].tr;
};
describe("Dik prizma ve piramit öğretimi032", () => {
  it("dışbükey prizma ve piramitte sayımları farklı fiziksel gruplardan doğrular", () => {
    // Tabanlar, yan ayrıtlar ve tek tepe birbirinden bağımsız sayılır.
    const n = 7;
    expect(2 * n - 3 * n + n + 2).toBe(2);
    expect(answer(0, 1)).toBe(String(2 * n));
    expect(answer(0, 2)).toBe(String(2 * 8 + 8));
    expect(answer(1, 11)).toBe(String(5 + 5));
  });
  it("üçgen taban, kapaksız kutu ve yapışık yüz problemlerini alan toplamıyla çözer", () => {
    const base = (3 * 4) / 2;
    expect(answer(0, 3)).toBe(String(base * 10));
    expect(answer(0, 4)).toBe(String(2 * base + 3 * 10 + 4 * 10 + 5 * 10));
    expect(answer(0, 7)).toBe(String(2 * (2 * 3 + 2 * 4 + 3 * 4)));
    expect(answer(0, 8)).toBe(String(5 * 4 + 2 * 5 * 3 + 2 * 4 * 3));
    expect(answer(0, 11)).toBe(String(2 * (4 * 2 + 4 * 2 + 2 * 2)));
    expect(answer(0, 12)).toBe(String(120 / 15));
  });
  it("yüz köşegeni, uzay köşegeni, yüzey yolunu ve kübik ölçeği ayırır", () => {
    expect(answer(0, 5)).toBe(String(Math.hypot(3, 4, 12)));
    expect(answer(0, 6)).toBe(String(((6 * Math.SQRT2) / Math.SQRT2) ** 3));
    const cubeSide = 2;
    const inside = Math.hypot(cubeSide, cubeSide, cubeSide);
    const surface = Math.hypot(cubeSide * 2, cubeSide);
    expect(surface).toBeGreaterThan(inside);
    expect(surface ** 2).toBeCloseTo(20);
    expect(answer(0, 9)).toBe("2√5");
    expect(answer(0, 10)).toBe(String(3 * 3 * 3));
  });
  it("piramit için dik yükseklik, yan yüz yüksekliği ve yan ayrıtı ayrı hesaplar", () => {
    const a = 6,
      h = 4,
      slant = Math.hypot(a / 2, h);
    const edge = Math.hypot(a / Math.SQRT2, h);
    expect(slant).toBe(5);
    expect(edge ** 2).toBeCloseTo(34);
    expect(answer(1, 1)).toBe(String((a * a * h) / 3));
    expect(answer(1, 2)).toBe(String(slant));
    expect(answer(1, 3)).toBe(String(a * a + (4 * a * slant) / 2));
    expect(answer(1, 4)).toBe("√34");
    expect(answer(1, 5)).toBe(String((18 * 10) / 3));
  });
  it("tepeye göre paralel kesit alanını ve hacmini farklı üslerle ölçekler", () => {
    expect(answer(1, 6)).toBe(`1/${2 ** 3}`);
    expect(answer(1, 7)).toBe(String(144 * (3 / 12) ** 2));
    const full = (36 * 8) / 3,
      small = (9 * 4) / 3;
    const truncated = (4 * (36 + 9 + Math.sqrt(36 * 9))) / 3;
    expect(truncated).toBe(full - small);
    expect(answer(1, 12)).toBe(String(truncated));
  });
  it("düzgün dört yüzlü bağıntılarını eşkenar yüz ve Pisagorla denetler", () => {
    const side = 6,
      faceArea = (side ** 2 * Math.sqrt(3)) / 4;
    const centerToVertex = ((2 / 3) * side * Math.sqrt(3)) / 2;
    const height = Math.sqrt(side ** 2 - centerToVertex ** 2);
    expect(height).toBeCloseTo(2 * Math.sqrt(6));
    expect(4 * faceArea).toBeCloseTo(36 * Math.sqrt(3));
    expect((faceArea * height) / 3).toBeCloseTo(18 * Math.SQRT2);
    expect(answer(1, 8)).toBe("2√6");
    expect(answer(1, 9)).toBe("36√3");
    expect(answer(1, 10)).toBe("18√2");
  });
  it("24 bağımsız kartta tüm seçeneklerin gerekçesini anahtarla birlikte korur", () => {
    expect(
      new Set(lessons.flatMap((l) => l.questions.map((q) => q.id))).size,
    ).toBe(24);
    for (const lesson of lessons)
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(questionGuidanceSchema.safeParse(q.guidance).success).toBe(true);
        expect(q.guidance!.steps.length).toBeGreaterThanOrEqual(3);
        expect(q.guidance!.optionReasons).toHaveLength(5);
        expect(q.guidance!.optionReasons[q.answer]).toMatch(/^Doğru:/);
        expect(q.options[q.answer].tr).not.toBe("");
      }
    expect(answer(1, 12)).toBe("84");
    const wrong60 = lessons[1].questions[11].options.findIndex(
      (o) => o.tr === "60",
    );
    expect(lessons[1].questions[11].guidance!.optionReasons[wrong60]).toContain(
      "geometrik ortalama terimini atlar",
    );
  });
  it("özeti ayrı tutar; hacim ve alan için koşul ve birimleri öğretir", () => {
    expect(guides.map((g) => g.sections.length)).toEqual([8, 8]);
    expect(guides.map((g) => g.examples.length)).toEqual([4, 4]);
    expect(guides.map((g) => g.recall.length)).toEqual([4, 4]);
    expect(sheets.map((s) => s.sections.length)).toEqual([5, 5]);
    expect(sheets.map((s) => s.examples.length)).toEqual([2, 2]);
    expect(sheets.map((s) => s.recall.length)).toEqual([3, 3]);
    const prism = guides[0].sections.flatMap((s) => s.paragraphs).join(" ");
    const pyramid = guides[1].sections.flatMap((s) => s.paragraphs).join(" ");
    expect(prism).toContain("cm²");
    expect(prism).toContain("cm³");
    expect(pyramid).toContain(
      "Genel bir piramitte bunların eş olduğunu varsayma",
    );
    expect(pyramid).toContain("Kesit düzlemi tabana paralel değilse");
    for (let i = 0; i < guides.length; i++)
      expect(JSON.stringify(sheets[i]).length).toBeLessThan(
        JSON.stringify(guides[i]).length * 0.65,
      );
  });
});
