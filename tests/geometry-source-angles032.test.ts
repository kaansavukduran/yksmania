import { describe, expect, it } from "vitest";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  geometrySourceAngles032Guides as guides,
  geometrySourceAngles032Lessons as lessons,
  geometrySourceAngles032Sheets as sheets,
} from "../src/learning/geometrySourceAngles032";

describe("032 kaynak açıları: tam koşullu bağımsız pekiştirme", () => {
  it("dört kaynak örneğinin cevaplarını bağımsız aritmetikle doğrular", () => {
    const answers = lessons[0].questions.map((q) => q.options[q.answer].tr);
    const small = (90 - 6) / 3;
    const parallelX = (180 - 10 - 20) / (3 + 2);
    const verticalX = (18 + 7) / (4 - 3);
    const recallX = (30 + 10) / (5 - 3);
    expect(answers.slice(0, 5)).toEqual([
      "B",
      `${small}°`,
      `${3 * parallelX + 10}°`,
      `${180 - (4 * verticalX - 7)}°`,
      `${recallX}`,
    ]);
    expect(small + (2 * small + 6)).toBe(90);
    expect(3 * parallelX + 10 + (2 * parallelX + 20)).toBe(180);
    expect(4 * verticalX - 7).toBe(3 * verticalX + 18);
    expect(5 * recallX - 10).toBe(3 * recallX + 30);
  });

  it("gerekçeleri seçenekler döndürülünce aynı cevapla birlikte tutar", () => {
    const answerWords = [
      "B ortadaki",
      "28° hem",
      "3·30+10=100°",
      "87° ile 93°",
      "x=20",
      "Ters açı eşitliği",
      "A başlangıç",
      "Komşuluk koşulları",
    ];
    const seen = new Set<number>();
    lessons[0].questions.slice(0, 8).forEach((q, index) => {
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((v) => v.tr)).size).toBe(5);
      expect(questionGuidanceSchema.safeParse(q.guidance).success).toBe(true);
      expect(q.guidance!.steps.length).toBeGreaterThanOrEqual(3);
      expect(q.guidance!.optionReasons[q.answer]).toContain(answerWords[index]);
      expect(q.guidance!.optionReasons).toHaveLength(5);
      seen.add(q.answer);
    });
    expect(seen.size).toBe(5);
  });

  it("soruyu kendi kartındaki koşulla çözdürür, eski sayfaya bağımlı bırakmaz", () => {
    const q = lessons[0].questions;
    expect(q[1].prompt.tr).toContain("iki katından 6°");
    expect(q[2].prompt.tr).toMatch(/Paralel.*aynı yan/);
    expect(q[3].prompt.tr).toContain("Kesişen iki doğru");
    expect(q[3].prompt.tr).toContain("komşu");
    expect(q[5].guidance!.optionReasons[0]).toBeTruthy();
    expect(q[6].options[q[6].answer].tr).toContain("A’dan başlar");
    expect(q[7].options[q[7].answer].tr).toContain("70°");
    expect(
      q.every(
        (item) => !/yukarıdaki|önceki şekil|şekle göre/i.test(item.prompt.tr),
      ),
    ).toBe(true);
  });

  it("anlatım, örnek, kısa özet ve geri çağırmayı ayrı sunar", () => {
    expect(guides).toHaveLength(1);
    expect(guides[0].sections).toHaveLength(12);
    expect(guides[0].examples).toHaveLength(10);
    expect(guides[0].recall).toHaveLength(12);
    expect(
      guides[0].examples.every(
        (e) => e.steps.length >= 3 && e.check && e.pitfall,
      ),
    ).toBe(true);
    expect(sheets).toHaveLength(1);
    expect(sheets[0].sections).toHaveLength(6);
    expect(sheets[0].examples).toHaveLength(3);
    expect(sheets[0].recall).toHaveLength(5);
    const theoryLength = guides[0].sections
      .flatMap((s) => s.paragraphs)
      .join(" ").length;
    const summaryLength = sheets[0].sections
      .flatMap((s) => s.text)
      .join(" ").length;
    expect(summaryLength).toBeLessThan(theoryLength * 0.4);
    expect(lessons[0].id).toBe("tyt-geo-acilar-kaynak-pekitirme-032");
    expect(sheets[0].topicId).toBe(`topic-${lessons[0].id}`);
    expect(lessons[0].questions.map((q) => q.id)).toEqual(
      [
        ...Array.from({ length: 18 }, (_, i) => `f032-${lessons[0].id}-${i + 1}`),
        ...["bisectors", "parallel-complement", "no-parallel", "adjacent-sum"].map(
          (suffix) => `${lessons[0].id}-source-001-${suffix}`,
        ),
      ],
    );
  });
  it("önceki yedi sayfalık kaynağın sayısal örneklerini ve karışık provasını korur", () => {
    const questions = lessons[0].questions;
    const expected = [
      (180 - 12) / 3,
      180 - 127,
      3 * ((20 + 10) / (5 - 3)) + 10,
      360 - 30 - 85 - 120,
      180 - 68,
      90 - 37,
      180 - 118,
      82,
      180 - 122,
      360 / 6,
    ];
    questions.slice(8, 18).forEach((q, index) => {
      expect(q.options[q.answer].tr).toBe(`${expected[index]}°`);
      expect(questionGuidanceSchema.safeParse(q.guidance).success).toBe(true);
      expect(q.guidance!.steps.length).toBeGreaterThanOrEqual(3);
      expect(q.guidance!.optionReasons).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
    });
    expect(guides[0].source).toContain("yedi sayfalık");
    const explanation = guides[0].sections.find(
      (section) => section.title === "Bir tam turdan ÖSYM çözümüne geç",
    )!.paragraphs.join(" ");
    expect(explanation).toContain("360°/5=72°");
    expect(explanation).toContain("72°−9°=63°");
  });
});
