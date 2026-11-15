import { describe, it, expect } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  adverbFamilies,
  adverbGuide,
  buildAdverbScene,
  forge011TurkishLessons,
} from "../src/learning/forge011Turkish";

describe("zarfları bağlam ve doğrudan ilişkiyle çözme", () => {
  it("moves the same quality from an action to an explicit noun", () => {
    const a = buildAdverbScene("manner", false),
      b = buildAdverbScene("manner", true);
    expect(a.words.join(" ")).toBe("Çocuk sakin konuştu.");
    expect(a.words[a.head]).toBe("konuştu.");
    expect(a.kind).toBe("Durum zarfı");
    expect(b.words.join(" ")).toBe("Sakin çocuk konuştu.");
    expect(b.words[b.head]).toBe("çocuk");
    expect(b.kind).toBe("Sıfat");
  });
  it("distinguishes degree, case-marked direction, time, questions and nonfinite scope", () => {
    expect(buildAdverbScene("degree", false).link).toBe(
      "çok → sessiz → konuştu",
    );
    expect(buildAdverbScene("degree", true).kind).toBe("Sıfat");
    expect(buildAdverbScene("direction", false).kind).toBe("Yer-yön zarfı");
    expect(buildAdverbScene("direction", true).link).toBe("içeri-y-e → girdi");
    expect(buildAdverbScene("direction", true).kind).toBe("İsim");
    expect(buildAdverbScene("time", false).kind).toBe("Zaman zarfı");
    expect(buildAdverbScene("time", true).kind).toBe("İsim");
    expect(buildAdverbScene("question", false).kind).toBe("Soru zarfı");
    expect(buildAdverbScene("question", true).kind).toBe("Sıfat");
    expect(buildAdverbScene("nonfinite", false).words[1]).toBe("çalışan");
    expect(buildAdverbScene("nonfinite", true).kind).toBe("Sıfat");
    for (const family of adverbFamilies)
      for (const changed of [false, true]) {
        const s = buildAdverbScene(family.id, changed);
        expect(s.words[s.target]).toBeTruthy();
        expect(s.words[s.head]).toBeTruthy();
        expect(s.target).not.toBe(s.head);
      }
  });
  it("keeps ten independently reviewed answers and all required question contexts", () => {
    const qs = forge011TurkishLessons[0].questions;
    expect(qs.map((q) => q.answer)).toEqual([0, 1, 2, 3, 4, 0, 1, 2, 3, 4]);
    expect(qs[0].options[qs[0].answer].tr).toContain("Konuşmanın biçimini");
    expect(qs[1].options[qs[1].answer].tr).toBe(
      "Yer-yön zarfı / yönelme ekli isim",
    );
    expect(qs[2].options[qs[2].answer].tr).toBe(
      "Yavaş sözcüğünü, miktar zarfı göreviyle",
    );
    expect(qs[3].options[qs[3].answer].tr).toBe("Bu gece az uyudum.");
    expect(qs[4].options[qs[4].answer].tr).toBe("Dosyayı nasıl düzenledin?");
    expect(qs[5].options[qs[5].answer].tr).toContain("ilgi ekli isimdir");
    expect(qs[6].options[qs[6].answer].tr).toContain("Çalışan:");
    expect(qs[7].options[qs[7].answer].tr).toBe("Geniş sıfatının derecesi");
    expect(qs[8].options[qs[8].answer].tr).toContain("-erek");
    expect(qs[9].prompt.tr).toContain("Niçin bağırıyorsun?");
    expect(qs[9].options[qs[9].answer].tr).toContain("nedenini");
    for (const q of qs) {
      expect(questionContentIssues(q)).toEqual([]);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
    }
    expect(adverbGuide.examples).toHaveLength(5);
    expect(adverbGuide.sections.every((s) => s.paragraphs.length >= 2)).toBe(
      true,
    );
  });
});
