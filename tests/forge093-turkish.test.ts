import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  buildTurkishPhrase,
  forge093TurkishGuides,
  forge093TurkishLessons,
  forge093TurkishTopics,
  wordContexts,
} from "../src/learning/forge093Turkish";

describe("Türkçe ad-sıfat-zamir ayrımları", () => {
  it("changes genitive morphology without losing the possessed suffix, then embeds an actual noun phrase", () => {
    const bare = buildTurkishPhrase("indefinite", false);
    const definite = buildTurkishPhrase("definite", false);
    const embedded = buildTurkishPhrase("chain", false);
    expect(bare.parts).toEqual(["okul", "kapı-sı"]);
    expect(definite.parts).toEqual(["okul-un", "kapı-sı"]);
    expect(embedded.parts).toEqual(["okul-un", "[bahçe kapı-sı]"]);
    expect(bare.sentence).toBe("Okul kapısı açıldı.");
    expect(definite.sentence).toBe("Okulun kapısı açıldı.");
    expect(embedded.sentence).toBe("Okulun bahçe kapısı açıldı.");
    expect(buildTurkishPhrase("definite", true).kind).toBe(
      "Belirtili isim tamlaması",
    );
    expect(buildTurkishPhrase("definite", true).sentence).toBe(
      "Okulun yeni kapısı açıldı.",
    );
    expect(buildTurkishPhrase("indefinite", true).sentence).toBe(
      "Yeni okul kapısı açıldı.",
    );
    expect(buildTurkishPhrase("chain", true).kind).toBe(
      "Zincirleme isim tamlaması",
    );
  });
  it("distinguishes a noun qualifier, a replacement and a verb modifier in actually changed sentences", () => {
    const byId = (id: string) => wordContexts.find((c) => c.id === id)!;
    expect(byId("point-open").words.join(" ")).toBe("Bu kitabı seçtim.");
    expect(byId("point-open").answer).toBe("adjective");
    expect(byId("point-replace").words.join(" ")).toBe("Bunu seçtim.");
    expect(byId("point-replace").answer).toBe("pronoun");
    expect(byId("quality-open").words.join(" ")).toBe("Hızlı tren geldi.");
    expect(byId("quality-open").answer).toBe("adjective");
    expect(byId("quality-action").words.join(" ")).toBe("Tren hızlı geldi.");
    expect(byId("quality-action").answer).toBe("adverb");
    expect(byId("old-replace").answer).toBe("nominalized");
    expect(byId("uncertain-replace").answer).toBe("pronoun");
    expect(byId("question-open").answer).toBe("adjective");
    expect(byId("question-replace").answer).toBe("pronoun");
  });
  it("keeps all 30 independently read answer keys and missing-context regression conditions", () => {
    const expectedTexts = [
      [
        "Cins, soyut, tekil",
        "Çoğul eki olmadan birçok bireyi bütün olarak adlandırır.",
        "Yalnız çekim ekleri taşıyan basit isimdir.",
        "İyelik ve belirtme durumu",
        "Mahallenin parkı: belirtili isim tamlaması",
        "Tren istasyonu",
        "Bahçe kapısı grubunun kendi içinde isim tamlaması olması",
        "Evi niteler; komşunun evi belirtili tamlaması sürer.",
        "Benim çantam",
        "Tamlanan olan çantası",
      ],
      [
        "Uçurtma adının rengini bildiren niteleme sıfatıdır.",
        "İşaret sıfatı / işaret zamiri",
        "Sıra / üleştirme / kesir",
        "Asıl sayı sıfatı",
        "Açık öğrenciler adını belirsiz miktarla belirten sıfattır.",
        "Açık sokak adını soru yoluyla belirten sıfat",
        "Düşen komşular adını karşılayan adlaşmış sıfat",
        "Geniş sıfatını derecelendiren zarf / odayı niteleyen sıfat",
        "Birlikte çocuk adını niteleyen kurallı birleşik sıfattır.",
        "Fiil kökünden kurulmuş, eylem anlamını koruyarak roman adını niteler.",
      ],
      [
        "Ben kişi zamirinin yönelme durumu",
        "Deniz adının yerini tutan kişi zamiri",
        "Kalem adının yerini tutan işaret zamiri",
        "Ece’ye dönen dönüşlülük zamiri",
        "Katılımcıları ayrı ayrı adlandırmadan karşılayan belgisiz zamir",
        "Belgisiz sıfat / soru zamiri",
        "Senin defterin diye açılabilen ilgi zamiri",
        "Bağlaç / sıfat yapan -ki / ilgi zamiri",
        "Ev adına aitlik bildiren iyelik / yüklemde kişiyi bildiren kişi eki",
        "Notun Merve’ye mi Selin’e mi ait olduğunu cümle tek başına kesinleştirmez.",
      ],
    ];
    forge093TurkishLessons.forEach((lesson, index) => {
      expect(lesson.questions.map((q) => q.options[q.answer].tr)).toEqual(
        expectedTexts[index],
      );
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(questionContentIssues(q)).toEqual([]);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      }
    });
    // The original capitalized Sevgi could denote a person's name. The actual
    // question must retain the explicit shared-emotion context after revision.
    expect(forge093TurkishLessons[0].questions[0].prompt.tr).toContain(
      "Aralarındaki sevgi",
    );
    expect(forge093TurkishGuides[0].examples[0].prompt).toContain(
      "İçlerindeki umut",
    );
    expect(forge093TurkishLessons[2].questions[9].options[4].tr).toContain(
      "kesinleştirmez",
    );
  });
  it("links the three workbook topics to complete native lessons without duplicate ids", () => {
    expect(forge093TurkishTopics).toEqual({
      "isimler-isim-tamlamasi": "detail-252",
      sifatlar: "detail-253",
      zamirler: "detail-254",
    });
    expect(forge093TurkishLessons).toHaveLength(3);
    expect(
      new Set(
        forge093TurkishLessons.flatMap((l) => l.questions.map((q) => q.id)),
      ).size,
    ).toBe(30);
    for (const guide of forge093TurkishGuides) {
      expect(guide.sections.length).toBeGreaterThanOrEqual(8);
      expect(guide.sections.every((s) => s.paragraphs.length >= 2)).toBe(true);
      expect(guide.examples.length).toBeGreaterThanOrEqual(4);
      expect(guide.examples.every((e) => e.steps.length >= 3)).toBe(true);
      expect(guide.recall.length).toBeGreaterThanOrEqual(4);
      expect(
        forge093TurkishLessons.find((l) => l.id === guide.id)?.questions,
      ).toHaveLength(10);
    }
  });
});
