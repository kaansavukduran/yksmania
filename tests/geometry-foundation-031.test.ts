import { describe, expect, it } from "vitest";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  geometryFoundation031Guides as guides,
  geometryFoundation031Lessons as lessons,
  geometryFoundation031Sheets as sheets,
  geometryFoundation031Topics as topics,
} from "../src/learning/geometryFoundation031";

const ids = [
  "tyt-geo-temel-acilar-031",
  "tyt-geo-ucgende-acilar-031",
  "tyt-geo-ucgen-esitsizligi-031",
  "tyt-geo-dik-ucgen-031",
  "tyt-geo-eslik-benzerlik-031",
  "tyt-geo-ucgen-merkezleri-031",
];
const questionCounts = [10, 15, 15, 10, 10, 10];
const sheetSections = [5, 8, 7, 6, 6, 5];
const sheetExamples = [2, 6, 4, 2, 3, 2];
const question = (unit: number, number: number) =>
  lessons.find((l) => l.id === ids[unit])!.questions[number - 1];
const answer = (unit: number, number: number) => {
  const q = question(unit, number);
  return q.options[q.answer].tr;
};

describe("031 temel geometri: bağımsız öğretim ve matematik denetimi", () => {
  it("altı yeni birimi eski çalışma kimliklerine bağlamadan ekler", () => {
    expect(lessons.map((l) => l.id)).toEqual(ids);
    expect(
      new Set(lessons.flatMap((l) => l.questions.map((q) => q.id))).size,
    ).toBe(questionCounts.reduce((total, count) => total + count, 0));
    for (const id of ids) {
      expect(topics[id]).toBe(`topic-${id}`);
      expect(sheets.find((s) => s.lessonId === id)?.topicId).toBe(
        `topic-${id}`,
      );
      expect(lessons.find((l) => l.id === id)?.subjectId).toBe("tyt-geometri");
    }
  });

  it("her birimde kavram, gerekçeli örnek ve geri çağırma bulunur", () => {
    expect(guides).toHaveLength(6);
    expect(sheets).toHaveLength(6);
    for (const g of guides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(6);
      expect(g.examples.length).toBeGreaterThanOrEqual(3);
      expect(g.recall.length).toBeGreaterThanOrEqual(3);
      expect(g.source).toContain("MEBİ");
      expect(g.sections.every((s) => s.paragraphs.length >= 2)).toBe(true);
      expect(
        g.examples.every(
          (e) =>
            e.steps.length >= 3 && e.check.length > 12 && e.pitfall.length > 12,
        ),
      ).toBe(true);
      // Built-in teaching cannot send the learner away to supply missing source files.
      expect(JSON.stringify(g)).not.toMatch(
        /PDF.?yi yükle|PDF ekle|kaynağını yükle|anlatım henüz hazırlanmadı/i,
      );
    }
  });

  it("özgün sorular önceki kimliklerini korur ve beş seçenek için gerekçe taşır", () => {
    lessons.forEach((lesson, index) => {
      expect(lesson.questions).toHaveLength(questionCounts[index]);
      expect(lesson.questions.slice(0, 10).map((q) => q.id)).toEqual(
        Array.from({ length: 10 }, (_, i) => `f031-${lesson.id}-${i + 1}`),
      );
      expect(lesson.tags).toContain("Özgün öğretim soruları");
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.prompt.tr).not.toMatch(
          /yukarıdaki|aşağıdaki şekil|önceki şekil|şekilde gösterilen/i,
        );
        const guidance = questionGuidanceSchema.parse(q.guidance);
        expect(guidance.steps.length).toBeGreaterThanOrEqual(3);
        expect(guidance.optionReasons).toHaveLength(5);
        expect(
          guidance.optionReasons.every((reason) => reason.length > 10),
        ).toBe(true);
        expect(q.explanation.tr).toContain(guidance.check);
      }
      // Correct choices are distributed; no unit teaches the answer position.
      expect(
        new Set(lesson.questions.slice(0, 10).map((q) => q.answer)).size,
      ).toBe(5);
    });
  });

  it("kopya kağıtları tam anlatımdan ayrı, kısa formül ve koşul kartlarıdır", () => {
    for (const [index, id] of ids.entries()) {
      const guide = guides.find((g) => g.id === id)!;
      const sheet = sheets.find((s) => s.lessonId === id)!;
      expect(sheet.sections).toHaveLength(sheetSections[index]);
      expect(sheet.examples).toHaveLength(sheetExamples[index]);
      expect(sheet.cautions.length).toBeGreaterThanOrEqual(3);
      const fullText = guide.sections.flatMap((s) => s.paragraphs).join(" ");
      const quickText = sheet.sections.flatMap((s) => s.text).join(" ");
      expect(quickText.length).toBeLessThan(fullText.length * 0.7);
      expect(quickText).not.toBe(fullText);
    }
    const rightSheet = sheets.find((s) => s.lessonId === ids[3])!;
    const rightText = rightSheet.sections.flatMap((s) => s.text).join(" ");
    expect(rightText).toContain("A=90°");
    expect(rightText).toContain("AH⊥BC");
    expect(rightText).toContain("h²=pq");
    const similaritySheet = sheets.find((s) => s.lessonId === ids[4])!;
    expect(similaritySheet.sections.flatMap((s) => s.text).join(" ")).toContain(
      "t/(1−t)",
    );
  });

  it("açı sorularında eşitlik ve bütünlerlik ayrımını korur", () => {
    const x = (43 - 5) / (4 - 2);
    const adjacent = 180 - (4 * x + 5);
    expect(adjacent).toBe(99);
    expect(answer(0, 4)).toBe(String(adjacent));
    const sameSideX = (180 - 15 + 5) / 5;
    expect(answer(0, 8)).toBe(String(2 * sameSideX + 15));
    expect(answer(0, 9)).toBe(String((102 + 78) / 2));
    expect(answer(0, 10)).toContain("paralel");
  });

  it("üçgen açısında köşe ve yardımcı çizgi koşullarını ayrı hesaplar", () => {
    expect(answer(1, 1)).toBe(String(180 - 48 - 67));
    expect(answer(1, 4)).toBe(String(180 - 2 * 64));
    expect(answer(1, 5)).toBe(String(360 - 114 - 128));
    const halfA = (180 - 68 - 44) / 2;
    const altitudeAngle = 90 - 68;
    expect(answer(1, 9)).toBe(String(Math.abs(halfA - altitudeAngle)));
    expect(answer(1, 10)).toBe(String(180 - (180 - 40 - 60 - 30) - 60));
  });

  it("üçgen eşitsizliği sıkıdır; birden çok koşulun kesişimi alınır", () => {
    const valid = (a: number, b: number, c: number) =>
      a > 0 && b > 0 && c > Math.abs(a - b) && c < a + b;
    expect(valid(4, 9, 5)).toBe(false);
    expect(valid(4, 9, 13)).toBe(false);
    const candidates = Array.from({ length: 30 }, (_, x) => x);
    expect(answer(2, 2)).toBe(
      String(candidates.filter((x) => valid(6, 10, x)).length),
    );
    expect(answer(2, 4)).toBe(
      String(candidates.filter((x) => valid(5, 8, x) && valid(7, 9, x)).length),
    );
    expect(answer(2, 10)).toBe(
      String(
        Math.max(...candidates.filter((x) => valid(5, 7, x) && 5 + 7 + x < 20)),
      ),
    );
    expect(answer(2, 7)).toContain("Dik");
    expect(answer(2, 8)).toContain("Dar");
    expect(answer(2, 9)).toContain("Geniş");
  });

  it("Pisagor ve Öklid anahtarlarını gerçek dik üçgen modeliyle sınar", () => {
    expect(answer(3, 1)).toBe(String(Math.hypot(7, 24)));
    expect(answer(3, 2)).toBe(String(Math.sqrt(15 ** 2 - 9 ** 2)));
    const p = 4,
      q = 9,
      A = { x: p, y: Math.sqrt(p * q) };
    const B = { x: 0, y: 0 },
      C = { x: p + q, y: 0 };
    const dot = (B.x - A.x) * (C.x - A.x) + (B.y - A.y) * (C.y - A.y);
    expect(dot).toBe(0);
    expect(answer(3, 6)).toBe(String(A.y));
    expect(answer(3, 10)).toBe(String(12 ** 2 / 9));
    expect(answer(3, 8)).toBe("36/5");
    expect((9 * 12) / Math.hypot(9, 12)).toBe(36 / 5);
    expect(
      question(3, 7).guidance!.optionReasons[question(3, 7).answer],
    ).toContain("125");
  });

  it("benzerlikte karşılıklı parçayı, yönü ve alanın karesini ayırır", () => {
    expect(answer(4, 1)).toBe("11");
    expect(answer(4, 4)).toBe(String((10 * 9) / 6));
    expect(answer(4, 5)).toBe(String(20 * Math.sqrt(9 / 25)));
    expect(answer(4, 6)).toBe(String((15 * 4) / (4 + 6)));
    expect(answer(4, 7)).toBe(String((8 * 3) / 2));
    expect(answer(4, 9)).toBe(String(81 * (1 - (2 / 3) ** 2)));
    expect(answer(4, 10)).toBe(String((4 * 9) / 6));
  });

  it("merkezlerde kenar/köşe uzaklığı ve iç/dış parça koşullarını korur", () => {
    expect(answer(5, 1)).toBe(String((10 * 6) / (6 + 9)));
    expect(answer(5, 2)).toBe(String((18 * 2) / 3));
    expect(answer(5, 3)).toBe(String(48 / 2));
    expect(answer(5, 4)).toBe(String(90 + 80 / 2));
    expect(answer(5, 6)).toBe(String(26 / 2));
    const external = 10;
    expect(external / (external + 5)).toBe(6 / 9);
    expect(answer(5, 9)).toBe(String(external));
    expect(answer(5, 10)).toBe(String(Math.sqrt(5 ** 2 - (6 / 2) ** 2)));
    const example = guides[5].examples.find(
      (e) => e.title === "Kenarortay uzunluğunu bağımsız denetle",
    )!;
    const A = { x: 5 / 2, y: (5 * Math.sqrt(3)) / 2 };
    expect(Math.hypot(A.x, A.y)).toBeCloseTo(5, 12);
    expect(Math.hypot(A.x - 8, A.y)).toBeCloseTo(7, 12);
    expect((A.x - 4) ** 2 + A.y ** 2).toBeCloseTo(21, 12);
    expect(example.answer).toContain("√21");
    expect(example.check).toContain("A=(5/2,5√3/2)");
  });

  it("yanlış seçenek gerekçeleri sabit veriyi değiştirmeyi önermeden çelişkiyi gösterir", () => {
    const reasonFor = (unit: number, number: number, option: string) => {
      const q = question(unit, number);
      const i = q.options.findIndex((o) => o.tr === option);
      expect(i).toBeGreaterThanOrEqual(0);
      return q.guidance!.optionReasons[i];
    };
    // x=90 in x+2x+80+100 gives 450°, not a full turn.
    expect(reasonFor(0, 6, "90")).toContain(String(90 + 2 * 90 + 80 + 100));
    // Fixed hypotenuses fix both midpoint distances, regardless of leg lengths.
    expect(reasonFor(3, 9, "10√2")).toContain("her durumda10");
    expect(reasonFor(5, 6, "13√2")).toContain("her durumda13");
    expect(reasonFor(3, 8, "5")).toContain("75≠108");
  });
});
