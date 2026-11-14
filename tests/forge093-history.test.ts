import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  forge093HistoryLessons,
  forge093HistoryGuides,
  forge093HistoryTopics,
  history093Cases,
} from "../src/learning/forge093History";

describe("Kaynak sırasındaki üç Osmanlı ünitesi", () => {
  it("önceki medeniyet ünitesine karışmadan üç ayrı tam başlığı yayınlar", () => {
    expect(forge093HistoryTopics).toEqual({
      "sultan-osmanli-merkez-teskilati": "detail-237",
      "klasik-cag-osmanli-toplum-duzeni": "detail-238",
      "degisen-dunya-dengeleri-osmanli": "detail-239",
    });
    expect(new Set(forge093HistoryLessons.map((x) => x.id)).size).toBe(3);
    for (const lesson of forge093HistoryLessons) {
      const guide = forge093HistoryGuides.find((g) => g.id === lesson.id)!;
      expect(guide.sections.length).toBeGreaterThanOrEqual(8);
      expect(guide.sections.every((s) => s.paragraphs.length >= 2)).toBe(true);
      expect(guide.examples.length).toBeGreaterThanOrEqual(4);
      expect(
        guide.examples.every(
          (e) => e.steps.length >= 3 && e.check && e.pitfall,
        ),
      ).toBe(true);
      expect(guide.recall.length).toBeGreaterThanOrEqual(4);
      expect(lesson.tags).toContain(forge093HistoryTopics[lesson.id]);
      expect(lesson.source.tr).toContain("özgün");
    }
  });
  it("otuz soruyu kendi kartında çözülebilir tutar, cevabı önceki modele bağlamaz", () => {
    const all = forge093HistoryLessons.flatMap((l) => l.questions);
    expect(all).toHaveLength(30);
    expect(new Set(all.map((q) => q.id)).size).toBe(30);
    for (const lesson of forge093HistoryLessons) {
      expect(lesson.questions).toHaveLength(10);
      for (const q of lesson.questions) {
        expect(questionContentIssues(q), q.id).toEqual([]);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.hint.tr.trim()).not.toBe("");
        expect(q.explanation.tr.trim()).not.toBe("");
      }
    }
    for (const id of [
      "f93h-c3",
      "f93h-c6",
      "f93h-c9",
      "f93h-s1",
      "f93h-s3",
      "f93h-s5",
      "f93h-s7",
      "f93h-s8",
      "f93h-b2",
      "f93h-b5",
      "f93h-b10",
    ]) {
      expect(all.find((q) => q.id === id)?.passage?.tr, id).toBeTruthy();
    }
  });
  it("aynı defter aracıyla farklı uzmanlığı ve vekâlet/onay ilişkisini ayırır", () => {
    const cases = history093Cases["sultan-osmanli-merkez-teskilati"];
    expect(cases[0].choices[cases[0].answer]).toBe("Nişancı");
    expect(cases[1].choices[cases[1].answer]).toBe("Defterdar");
    expect(cases[2].choices[cases[2].answer]).toBe("Kazasker");
    expect(cases[3].choices[cases[3].answer]).toBe("Padişah");
    expect(cases[3].result).toContain("sadrazamın vekâleti");
  });
  it("meslek, din ve yönetici statüsünü tek eksene indirgemez", () => {
    const cases = history093Cases["klasik-cag-osmanli-toplum-duzeni"];
    expect(cases[0].nodes[0]).not.toBe(cases[1].nodes[0]);
    expect(cases[0].nodes[1]).toBe(cases[1].nodes[1]);
    expect(cases[0].nodes[2]).toBe(cases[1].nodes[2]);
    expect(cases[0].nodes[0]).toBe(cases[2].nodes[0]);
    expect(cases[0].nodes[1]).not.toBe(cases[2].nodes[1]);
    expect(cases[2].choices[cases[2].answer]).toBe("Askerî sınıf");
  });
  it("statü, sınır, kayıp ve geri kazanımı kronolojide ayırır", () => {
    const cases = history093Cases["degisen-dunya-dengeleri-osmanli"];
    expect(cases.map((c) => c.year)).toEqual([1606, 1639, 1699, 1739, 1774]);
    expect(cases[0].choices[cases[0].answer]).toBe("Diplomatik statü");
    expect(cases[1].choices[cases[1].answer]).toBe("Sınır çerçevesi");
    expect(cases[2].choices[cases[2].answer]).toBe("Toprak ve siyaset dengesi");
    expect(cases[3].result).toContain("geri kazanım");
    expect(cases[4].choices[cases[4].answer]).toBe(
      "Siyasi bağımsızlık ve artan Rus nüfuzu",
    );
    expect(cases[4].result).toContain("ilhakla aynı şey değildir");
    const bank = forge093HistoryLessons.find(
      (l) => l.id === "degisen-dunya-dengeleri-osmanli",
    )!.questions;
    const alliance = bank.find((q) => q.id === "f93h-b2")!;
    expect(alliance.options[alliance.answer].tr).toContain("ortak ordu");
    expect(alliance.explanation.tr).toContain("koordinasyon kanıtı");
  });
});
