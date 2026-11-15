import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  buildConnectorScene,
  buildVerbScene,
  buildVoiceScene,
  connectorsGuide,
  forge012TurkishCheatSheets,
  forge012TurkishGuides,
  forge012TurkishLessons,
  forge012TurkishTopics,
  grammarCasesFor,
  verbsGuide,
  voiceGuide,
} from "../src/learning/forge012Turkish";

describe("kaynak sırasındaki üç Türkçe ünitesinin dil ilişkileri", () => {
  it("distinguishes equal subjects from an instrument despite the same ile", () => {
    const conjunction = buildConnectorScene("ile", false),
      instrument = buildConnectorScene("ile", true);
    expect(conjunction.sentence).toBe("Ada ile Can projeyi bitirdi.");
    expect(conjunction.kind).toBe("Bağlaç");
    expect(
      conjunction.parts
        .filter((p) => p.role === "Özne parçası")
        .map((p) => p.form),
    ).toEqual(["Ada", "Can"]);
    expect(instrument.kind).toBe("Edat");
    expect(instrument.parts.find((p) => p.form === "pense")?.role).toBe(
      "Araç adı",
    );
    expect(instrument.links.join(" ")).toContain("Neyle kesti?");
  });
  it("separates location morphology, addition, adjectival ki and noun-like interjections", () => {
    expect(buildConnectorScene("de", false).kind).toBe("Durum eki");
    expect(buildConnectorScene("de", true).kind).toBe("Bağlaç");
    expect(buildConnectorScene("ki", true).kind).toBe("Sıfat yapan ek");
    expect(buildConnectorScene("unlem", false).kind).toBe("Ünlem");
    expect(buildConnectorScene("unlem", true).kind).toBe("İsimleşmiş söz");
    expect(
      connectorsGuide.sections
        .find((s) => s.title.startsWith("Yalnız"))
        ?.paragraphs.join(" "),
    ).toContain("bazı özetlerde sınırlama zarfı");
  });
  it("moves contextual time without changing the inflected present form", () => {
    const now = buildVerbScene("shift", false),
      future = buildVerbScene("shift", true);
    expect(now.parts[1].form).toBe(future.parts[1].form);
    expect(now.parts[1].form).toBe("bin-iyor-um");
    expect(now.time).toBe(0);
    expect(future.time).toBe(1);
    expect(future.kind).toBe("Zaman kayması");
    expect(future.links).toEqual([
      "Biçim: şimdiki zaman.",
      "Bağlamdaki zaman: gelecek.",
    ]);
  });
  it("keeps past negation/person distinct and does not confuse compound structure with tense", () => {
    expect(buildVerbScene("parts", false).parts.map((p) => p.form)).toEqual([
      "gel-",
      "-me",
      "-di",
      "-k",
    ]);
    expect(buildVerbScene("parts", true).parts.map((p) => p.form)).toEqual([
      "gel-",
      "-eceğ-",
      "-iz",
    ]);
    expect(buildVerbScene("compound", false).kind).toBe("Birleşik yapı");
    expect(buildVerbScene("compound", true).kind).toBe("Birleşik çekim");
    expect(buildVerbScene("copula", false).kind).toBe("Ad yüklemi ve ek fiil");
    expect(buildVerbScene("copula", true).kind).toBe("Türemiş fiil");
    expect(buildVerbScene("role", false).kind).toBe("Sıfat-fiil");
    expect(buildVerbScene("role", true).kind).toBe("Çekimli fiil");
  });
  it("does not infer passive from an n suffix without the actual agent relation", () => {
    const reflexive = buildVoiceScene("reflexive", false),
      passive = buildVoiceScene("reflexive", true);
    expect(reflexive.parts[1].form).toBe(passive.parts[1].form);
    expect(reflexive.kind).toBe("Dönüşlü");
    expect(passive.kind).toBe("Edilgen");
    expect(reflexive.parts[0].form).toBe("çocuk");
    expect(passive.parts[0].form).toBe("anne tarafından");
    expect(passive.parts[2].role).toBe("Sözde özne");
  });
  it("uses original transitivity for causative types and rejects plurality-only reciprocity", () => {
    expect(buildVoiceScene("causative", false).kind).toBe("Geçişsiz");
    expect(buildVoiceScene("causative", true).kind).toBe("Oldurgan");
    expect(buildVoiceScene("factitive", false).kind).toBe("Geçişli");
    expect(buildVoiceScene("factitive", true).kind).toBe("Ettirgen");
    expect(buildVoiceScene("reciprocal", false).kind).toBe("İşteş");
    expect(buildVoiceScene("reciprocal", true).kind).toBe("Etken");
    expect(buildVoiceScene("nominal", false).kind).toBe("Çatı aranmaz");
    expect(buildVoiceScene("nominal", true).kind).toBe("Edilgen");
  });
  it("provides an actual contrasting frame for every curated pair", () => {
    for (const id of Object.keys(forge012TurkishTopics))
      for (const c of grammarCasesFor(id)) {
        expect(c.frames[0].sentence).not.toBe(c.frames[1].sentence);
        for (const f of c.frames) {
          expect(f.parts.length).toBeGreaterThan(0);
          expect(f.links.length).toBeGreaterThan(1);
          expect(f.reason.trim()).not.toBe("");
        }
      }
  });
  it("retains complete reviewed teaching and worked examples in the separate sheets", () => {
    expect(forge012TurkishGuides.map((g) => g.sections.length)).toEqual([
      10, 10, 10,
    ]);
    expect(forge012TurkishGuides.map((g) => g.examples.length)).toEqual([
      5, 5, 5,
    ]);
    expect(forge012TurkishGuides.map((g) => g.recall.length)).toEqual([
      5, 5, 5,
    ]);
    for (const guide of forge012TurkishGuides) {
      const sheet = forge012TurkishCheatSheets.find(
        (s) => s.lessonId === guide.id,
      )!;
      expect(sheet.sections.map((s) => s.text)).toEqual(
        guide.sections.map((s) => s.paragraphs),
      );
      expect(sheet.examples).toHaveLength(guide.examples.length);
    }
    expect(
      verbsGuide.sections
        .find((s) => s.title.startsWith("Ek fiil"))
        ?.paragraphs.join(" "),
    ).toContain("-dır");
    expect(
      voiceGuide.sections
        .find((s) => s.title.startsWith("Edilgende"))
        ?.paragraphs.join(" "),
    ).toContain("sözde özne yok");
  });
  it("checks independently chosen answer keys and complete local question contexts", () => {
    const expectedFirst = [
      "Eş görevli iki özne parçasını bağlayan bağlaç",
      "Kılış / durum / oluş",
      "Aranmaz; yararlıydı ad soylu yüklemdir.",
    ];
    for (const [i, l] of forge012TurkishLessons.entries()) {
      expect(l.questions).toHaveLength(10);
      expect(l.questions.map((q) => q.answer)).toEqual([
        0, 1, 2, 3, 4, 0, 1, 2, 3, 4,
      ]);
      expect(l.questions[0].options[l.questions[0].answer].tr).toBe(
        expectedFirst[i],
      );
      for (const q of l.questions) {
        expect(questionContentIssues(q)).toEqual([]);
        expect(q.skill).toBe(l.id);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      }
    }
    const voice = forge012TurkishLessons[2].questions;
    expect(voice[3].prompt.tr).toContain("bizzat kendi yaptığı açıkça");
    expect(voice[5].prompt.tr).toContain("kitap okuma anlamındadır");
    expect(voice[8].options[voice[8].answer].tr).toBe(
      "Bu salonda erken yatıldı.",
    );
  });
});
