import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  buildEkFiilScene,
  ekFiilGuide,
  forge014TurkishGuides,
  forge014TurkishLessons,
  forge014TurkishTopics,
  type CopulaForm,
  type CopulaMode,
} from "../src/learning/forge014Turkish";

describe("Ek fiil: taban, çekim, bağlam ve kişi", () => {
  it("distinguishes the same idi ending on a nominal base from a second verbal tense", () => {
    const nominal = buildEkFiilScene("nominal", "past", "o", false);
    const verbal = buildEkFiilScene("verbal", "past", "o", false);
    expect(nominal.target).toBe("hazırdı");
    expect(nominal.kind).toBe("Ad soylu yüklem");
    expect(nominal.parts.find((p) => p.kind === "first")).toBeUndefined();
    expect(verbal.target).toBe("geliyordu");
    expect(verbal.kind).toBe("Birleşik çekimli fiil");
    expect(verbal.parts.find((p) => p.kind === "first")?.form).toBe("-iyor");
    expect(verbal.parts.find((p) => p.kind === "copula")?.form).toBe("-du");
  });
  it("checks all 48 actual spellings against an independent literal inflection table", () => {
    const tables: Record<CopulaMode, Record<CopulaForm, string[][]>> = {
      nominal: {
        present: [
          ["hazırım", "hazırsın", "hazır"],
          ["hazır değilim", "hazır değilsin", "hazır değil"],
        ],
        past: [
          ["hazırdım", "hazırdın", "hazırdı"],
          ["hazır değildim", "hazır değildin", "hazır değildi"],
        ],
        reported: [
          ["hazırmışım", "hazırmışsın", "hazırmış"],
          ["hazır değilmişim", "hazır değilmişsin", "hazır değilmiş"],
        ],
        conditional: [
          ["hazırsam", "hazırsan", "hazırsa"],
          ["hazır değilsem", "hazır değilsen", "hazır değilse"],
        ],
      },
      verbal: {
        present: [
          ["geliyorum", "geliyorsun", "geliyor"],
          ["gelmiyorum", "gelmiyorsun", "gelmiyor"],
        ],
        past: [
          ["geliyordum", "geliyordun", "geliyordu"],
          ["gelmiyordum", "gelmiyordun", "gelmiyordu"],
        ],
        reported: [
          ["geliyormuşum", "geliyormuşsun", "geliyormuş"],
          ["gelmiyormuşum", "gelmiyormuşsun", "gelmiyormuş"],
        ],
        conditional: [
          ["geliyorsam", "geliyorsan", "geliyorsa"],
          ["gelmiyorsam", "gelmiyorsan", "gelmiyorsa"],
        ],
      },
    };
    let checked = 0;
    for (const mode of ["nominal", "verbal"] as const)
      for (const form of [
        "present",
        "past",
        "reported",
        "conditional",
      ] as const)
        for (const [negativeIndex, negative] of [false, true].entries())
          for (const [personIndex, person] of ["ben", "sen", "o"].entries()) {
            const scene = buildEkFiilScene(
              mode,
              form,
              person as "ben" | "sen" | "o",
              negative,
            );
            expect(scene.target).toBe(
              tables[mode][form][negativeIndex][personIndex],
            );
            expect(scene.sentence).toContain(scene.target);
            expect(scene.parts.at(-1)?.role).toBe(`Kişi: ${person}`);
            checked++;
          }
    expect(checked).toBe(48);
  });
  it("keeps nominal değil separate from verbal negation and its contracted vowel", () => {
    const nominal = buildEkFiilScene("nominal", "past", "ben", true);
    const verbal = buildEkFiilScene("verbal", "past", "ben", true);
    expect(nominal.parts.map((p) => p.form)).toEqual([
      "hazır",
      "değil",
      "-di",
      "-m",
    ]);
    expect(verbal.parts.map((p) => p.form)).toEqual([
      "gel-",
      "-mi-",
      "-yor",
      "-du",
      "-m",
    ]);
    expect(verbal.evidence.join(" ")).toContain("gel-me-yor");
  });
  it("does not invent a second tense in simple present or mistake a condition for the main predicate", () => {
    const simple = buildEkFiilScene("verbal", "present", "sen", false);
    expect(simple.kind).toBe("Basit çekimli fiil");
    expect(simple.parts.filter((p) => p.kind === "copula")).toEqual([]);
    const condition = buildEkFiilScene("nominal", "conditional", "sen", false);
    expect(condition.sentence).toBe("Sen hazırsan, kapı açık kalabilir.");
    expect(condition.kind).toBe("Ad soylu koşul");
    expect(condition.evidence.join(" ")).toContain(
      "ana yargı kapı açık kalabilir",
    );
    expect(buildEkFiilScene("verbal", "conditional", "sen", false).tense).toBe(
      "Şimdiki zamanın şartı",
    );
  });
  it("provides the report source in the full sentence without forcing past time from miş alone", () => {
    const reported = buildEkFiilScene("nominal", "reported", "o", false);
    expect(reported.sentence).toBe(
      "Arkadaşımın bugüne ilişkin aktardığına göre o hazırmış.",
    );
    expect(reported.evidence.join(" ")).toContain(
      "-miş tek başına geçmişte bir tarih",
    );
  });
  it("retains eight deep two-paragraph sections and four three-step worked/recall examples", () => {
    expect(forge014TurkishTopics).toEqual({ "ek-fiil": "detail-259" });
    expect(forge014TurkishGuides).toEqual([ekFiilGuide]);
    expect(ekFiilGuide.sections).toHaveLength(8);
    for (const section of ekFiilGuide.sections) {
      expect(section.paragraphs).toHaveLength(2);
      for (const paragraph of section.paragraphs)
        expect(paragraph.length).toBeGreaterThan(200);
    }
    expect(ekFiilGuide.examples).toHaveLength(4);
    for (const example of ekFiilGuide.examples) {
      expect(example.steps).toHaveLength(3);
      expect(example.check.trim()).not.toBe("");
      expect(example.pitfall.trim()).not.toBe("");
    }
    expect(ekFiilGuide.recall).toHaveLength(4);
    expect(ekFiilGuide.sections[5].paragraphs.join(" ")).toContain(
      "-dır her durumda ikinci zaman",
    );
    expect(ekFiilGuide.sections[6].paragraphs.join(" ")).toContain(
      "Hazır mıydın?",
    );
    expect(forge014TurkishLessons[0].body.map((s) => s.text.tr)).toEqual(
      ekFiilGuide.sections.map((s) => s.paragraphs.join("\n\n")),
    );
  });
  it("checks ten independent five-choice original questions, exact keys and complete local context", () => {
    const lesson = forge014TurkishLessons[0];
    expect(lesson.questions).toHaveLength(10);
    expect(lesson.questions.map((q) => q.answer)).toEqual([
      0, 1, 2, 3, 4, 0, 1, 2, 3, 4,
    ]);
    expect(lesson.questions[3].passage?.tr).toContain("yalnız tahmin ediyorum");
    expect(lesson.questions[7].prompt.tr).toContain("Yorgun muydun?");
    for (const q of lesson.questions) {
      expect(questionContentIssues(q)).toEqual([]);
      expect(q.skill).toBe("ek-fiil");
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.explanation.tr.length).toBeGreaterThan(150);
      expect(q.hint.tr.trim()).not.toBe("");
    }
  });
});
