import { describe, expect, it } from "vitest";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  geometryPolygons032Guides as guides,
  geometryPolygons032Lessons as lessons,
  geometryPolygons032Sheets as sheets,
} from "../src/learning/geometryPolygons032";
const q = (family: number, index: number) =>
  lessons[family].questions[index - 1];
const correct = (family: number, index: number) => {
  const item = q(family, index);
  return item.options[item.answer].tr;
};
const diagonal = (n: number) => {
  let count = 0;
  for (let a = 0; a < n; a++)
    for (let b = a + 1; b < n; b++)
      if (b - a !== 1 && !(a === 0 && b === n - 1)) count++;
  return count;
};
describe("032 çokgen ve dörtgen kaynak öğretimi", () => {
  it("yeni kimlikler, bütün kademeleri olan bağımsız sorular ve ayrı özetler sunar", () => {
    expect(lessons.map((l) => l.id)).toEqual([
      "tyt-geo-cokgenler-032",
      "tyt-geo-dortgen-hiyerarsi-032",
    ]);
    expect(lessons.flatMap((l) => l.questions)).toHaveLength(28);
    expect(
      new Set(lessons.flatMap((l) => l.questions.map((q) => q.id))).size,
    ).toBe(28);
    for (const [i, lesson] of lessons.entries()) {
      expect(lesson.subjectId).toBe("tyt-geometri");
      expect(lesson.tags).toContain("Özgün öğretim soruları");
      expect(guides[i].sections.length).toBeGreaterThanOrEqual(8);
      expect(guides[i].examples.length).toBeGreaterThanOrEqual(4);
      expect(guides[i].recall.length).toBeGreaterThanOrEqual(4);
      expect(sheets[i].sections).toHaveLength(5);
      expect(sheets[i].examples).toHaveLength(2);
      expect(sheets[i].recall).toHaveLength(3);
      expect(sheets[i].topicId).toBe(`topic-${lesson.id}`);
      const full = guides[i].sections.flatMap((s) => s.paragraphs).join(" ");
      const summary = sheets[i].sections.flatMap((s) => s.text).join(" ");
      expect(summary.length).toBeLessThan(full.length / 2);
      for (const item of lesson.questions) {
        expect(item.options).toHaveLength(5);
        expect(new Set(item.options.map((o) => o.tr)).size).toBe(5);
        const help = questionGuidanceSchema.parse(item.guidance);
        expect(help.steps.length).toBeGreaterThanOrEqual(3);
        expect(help.optionReasons).toHaveLength(5);
        expect(item.prompt.tr).not.toMatch(
          /yukarıdaki|aşağıdaki şekil|önceki şekil/,
        );
        expect(item.explanation.tr).toContain(help.check);
      }
    }
  });
  it("çokgenin köşegenlerini çift uçları tekilleştirerek bağımsız hesaplar", () => {
    expect(correct(0, 2)).toBe(String(diagonal(11)));
    expect(correct(0, 3)).toBe(String(diagonal(9 + 3)));
    expect(correct(0, 5)).toBe(String(diagonal(360 / (180 - 156))));
    expect(diagonal(3)).toBe(0);
    expect(diagonal(4)).toBe(2);
  });
  it("açı sorularındaki varlık ve dönüş koşullarını korur", () => {
    expect(correct(0, 1)).toBe(`${(7 - 2) * 180}°`);
    expect(correct(0, 4)).toBe(String(360 / 24));
    expect(correct(0, 6)).toBe(String(360 / (180 - 140) - 2));
    const candidates = [145, 60, 90, 120, 150];
    expect(
      candidates.filter((a) => !Number.isInteger(360 / (180 - a))),
    ).toEqual([145]);
    expect(correct(0, 7)).toBe("145°");
    expect(correct(0, 8)).toBe(`${360 - 318}°`);
    expect(guides[0].sections[3].paragraphs.join(" ")).toMatch(
      /ters işaretlidir/,
    );
  });
  it("alan ve uzunluğu doğru birim ve doğru şekille hesaplar", () => {
    expect(correct(0, 9)).toBe("24√3");
    expect((6 * (4 * 4)) / 4).toBe(24);
    expect(correct(0, 10)).toBe(String(6 * 6));
    expect(correct(0, 11)).toBe(String((4 * 6 * 3) / 2));
    expect(correct(0, 13)).toBe("1+√5");
    expect(2 * ((1 + Math.sqrt(5)) / 2)).toBeCloseTo(1 + Math.sqrt(5));
    expect(correct(0, 14)).toBe("150√3");
    expect((3 * 10 * 10) / 2).toBe(150);
    expect(correct(0, 12)).toMatch(/Bütün kenarları ve bütün iç açıları/);
  });
  it("çözümdeki açı ve kenar sayısı eşlemesini şık sırasından bağımsız belirtir", () => {
    const item = q(0, 7);
    const [angleClause, sideClause] = item.guidance!.steps[2].split("sırasıyla");
    const angles = [...angleClause.matchAll(/(\d+)°/g)].map((m) => Number(m[1]));
    const sides = [...sideClause.matchAll(/\d+/g)].map((m) => Number(m[0]));
    expect(angles).toHaveLength(4);
    expect(sides).toEqual(angles.map((angle) => 360 / (180 - angle)));
    expect(angles.map((angle) => `${angle}°`).sort()).toEqual(
      item.options.filter((_, index) => index !== item.answer).map((o) => o.tr).sort(),
    );
  });
  it("içbükey açı, kapsayıcı sınıf ve eksik özel koşulu ayırt eder", () => {
    expect(correct(1, 1)).toBe(`${360 - 78 - 104 - 91}°`);
    expect(correct(1, 2)).toBe(`${360 - 220 - 40 - 50}°`);
    expect(correct(1, 3)).toMatch(/^Dikdörtgendir/);
    expect(correct(1, 4)).toMatch(/^Eşkenar dörtgendir/);
    expect(correct(1, 5)).toMatch(/^Her kare aynı zamanda yamuk/);
    expect(guides[1].sections[2].paragraphs.join(" ")).toContain(
      "en az bir çift karşı kenarı paralel",
    );
    expect(guides[1].sections[3].paragraphs.join(" ")).toContain(
      "BD’nin AC’yi ortalaması",
    );
  });
  it("yamuk orta tabanı ve iç parçayı farklı sayar", () => {
    expect(correct(1, 6)).toBe(String((8 + 14) / 2));
    expect(correct(1, 7)).toBe(String(((6 + 12) * 5) / 2));
    expect(correct(1, 8)).toBe(String((16 - 6) / 2));
    expect(correct(1, 9)).toBe(`${180 - 68}°`);
  });
  it("dik köşegen, Varignon ve açıortay sorularını bağımsız hesaplar", () => {
    expect(correct(1, 10)).toBe(String((13 * 10) / 2));
    expect(correct(1, 11)).toBe(String(2 * (10 / 2 + 18 / 2)));
    const a = [0, 3],
      b = [-4, 0],
      c = [0, -6],
      d = [8, 0];
    const distance2 = (p: number[], r: number[]) =>
      p.reduce((s, x, i) => s + (x - r[i]) ** 2, 0);
    expect([
      distance2(a, b),
      distance2(b, c),
      distance2(c, d),
      distance2(d, a),
    ]).toEqual([25, 52, 100, 73]);
    expect(correct(1, 12)).toBe("√73");
    expect(correct(1, 13)).toBe(`${180 - (360 - 80 - 100) / 2}°`);
    expect(correct(1, 14)).toBe(String((15 * 8) / 2));
  });
  it("yanlış köşegen seçeneğini gerçek sayım hatasıyla açıklar", () => {
    const item = q(0, 3);
    const index = item.options.findIndex((o) => o.tr === "36");
    expect((9 * 8) / 2).toBe(36);
    expect(diagonal(9)).toBe(27);
    expect(item.guidance!.optionReasons[index]).toContain("kenarlar dahil");
    expect(item.guidance!.optionReasons[index]).not.toContain(
      "n=9 varsayımının sonucudur",
    );
  });
  it("yanlış aynı-yan-kenar açısını ek simetriyle geçerli göstermez", () => {
    const item = q(1, 9);
    const index = item.options.findIndex((o) => o.tr === "68°");
    expect(68 + 68).toBe(136);
    expect(68 + 112).toBe(180);
    expect(item.guidance!.optionReasons[index]).toContain("136°");
    expect(item.guidance!.optionReasons[index]).toContain(
      "İkizkenar yamukta da",
    );
  });
  it("tam arşiv kapanışı veya resmî soru kökeni iddia etmez", () => {
    const publicText = JSON.stringify([lessons, guides, sheets]);
    expect(publicText).not.toMatch(
      /drive\.google\.com|docs\.google\.com|PDF.{0,12}yükle|arşivin tamamı işlendi/,
    );
    expect(lessons.every((l) => l.source.tr.includes("özgün"))).toBe(true);
  });
});
