import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  forge011HistoryLessons,
  forge011HistoryGuides,
  forge011HistoryTopics,
  history011Cases,
  history011State,
  historyDocumentProfiles,
} from "../src/learning/forge011History";

describe("Kaynak sırasındaki beş yeni tarih ünitesi", () => {
  it("beş başlığı ayrı ve kaynaklı öğretir; özet yerine tam bölüm ve çözümlü vaka sunar", () => {
    expect(forge011HistoryTopics).toEqual({
      "degisim-caginda-avrupa-osmanli": "detail-240",
      "devrimler-caginda-devlet-toplum": "detail-241",
      "denge-stratejisi": "detail-242",
      "degisen-sosyoekonomik-hayat": "detail-243",
      "yirminci-yuzyil-baslarinda-osmanli": "detail-244",
    });
    expect(forge011HistoryLessons).toHaveLength(5);
    for (const l of forge011HistoryLessons) {
      const g = forge011HistoryGuides.find((x) => x.id === l.id)!;
      expect(l.subjectId).toBe("tyt-tarih");
      expect(g.sections.length).toBeGreaterThanOrEqual(10);
      expect(
        g.sections.every(
          (s) =>
            s.paragraphs.length >= 2 &&
            s.paragraphs.every((p) => p.trim().length > 100),
        ),
      ).toBe(true);
      expect(g.examples).toHaveLength(4);
      expect(
        g.examples.every(
          (e) => e.steps.length >= 3 && e.answer && e.check && e.pitfall,
        ),
      ).toBe(true);
      expect(g.recall).toHaveLength(4);
      expect(l.tags).toContain(forge011HistoryTopics[l.id]);
      expect(g.source).toContain("OGM");
      expect(g.source).toContain("Aurelia");
      expect(l.body.map((s) => s.text.tr).join(" ")).toContain(
        g.sections[0].paragraphs[0],
      );
    }
  });
  it("50 sorunun her birini kendi pasajı, beş farklı şıkkı ve gerekçesiyle sunar", () => {
    const questions = forge011HistoryLessons.flatMap((l) => l.questions);
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map((q) => q.id)).size).toBe(50);
    for (const l of forge011HistoryLessons) {
      expect(l.questions).toHaveLength(10);
      expect(l.questions.map((q) => q.answer)).toEqual([
        0, 1, 2, 3, 4, 0, 1, 2, 3, 4,
      ]);
      for (const q of l.questions) {
        expect(questionContentIssues(q), q.id).toEqual([]);
        expect(q.passage?.tr.length, q.id).toBeGreaterThan(50);
        expect(new Set(q.options.map((o) => o.tr)).size, q.id).toBe(5);
        expect(q.options).toHaveLength(5);
        expect(q.explanation.tr.length, q.id).toBeGreaterThan(120);
        expect(q.hint.tr.trim(), q.id).not.toBe("");
      }
    }
  });
  it("belge türü ile temsili ayırır;1839 güvencesini seçimli meclis saymaz", () => {
    const profiles = historyDocumentProfiles;
    expect(profiles.map((p) => p.year)).toEqual([1808, 1839, 1856, 1876, 1909]);
    expect(profiles.filter((p) => p.constitution).map((p) => p.year)).toEqual([
      1876, 1909,
    ]);
    expect(profiles.filter((p) => p.elected).map((p) => p.year)).toEqual([
      1876, 1909,
    ]);
    expect(profiles[0].type).toBe("Uzlaşma");
    expect(profiles[1].type).toBe("Ferman");
    expect(profiles[2].type).toBe("Ferman");
    const q = forge011HistoryLessons[1].questions[3];
    expect(q.options[q.answer].tr).toContain("Atama ve seçimle");
  });
  it("1798,1833,1856 ve1882'de tehdidi/desteği değişen çıkarla bağlar", () => {
    const rows = history011Cases["denge-stratejisi"];
    expect(rows.map((r) => r.year)).toEqual([
      1798, 1833, 1841, 1856, 1878, 1882,
    ]);
    expect(rows[0].threat).toBe("Fransa");
    expect(rows[0].support).toBe("İngiltere ve Rusya");
    expect(rows[1].threat).toBe("Mısır kuvvetleri");
    expect(rows[1].support).toBe("Rusya");
    expect(rows[3].threat).toBe("Rusya");
    expect(rows[3].support).toBe("İngiltere ve Fransa");
    expect(rows[5].threat).toBe("İngiltere");
  });
  it("mali zincirde ticaret, borç, ödeme krizi ve gelir denetimini birleştirmez", () => {
    const rows = history011Cases["degisen-sosyoekonomik-hayat"];
    expect(rows.map((r) => r.year)).toEqual([
      1838, 1854, 1875, 1881, 1888, 1913,
    ]);
    expect(rows[0].chain[1]).toBe("İthal mal rekabeti");
    expect(rows[1].chain[1]).toBe("Dış borçlanma");
    expect(rows[2].chain[1]).toBe("Ödeme güçlüğü");
    expect(rows[3].chain[1]).toBe("Gelirlerin özel idaresi");
    expect(rows[4].choices[rows[4].answer]).toBe("Tarımsal kredi");
  });
  it("savaşta1914 tarafsız İtalya'yı fiilen Almanya yanında göstermez", () => {
    const q = forge011HistoryLessons[4].questions[4];
    expect(q.options[q.answer].tr).toBe(
      "İtalya 1914'te Almanya yanında fiilen savaşmıştır.",
    );
    expect(q.prompt.tr).toContain("yanlıştır");
    expect(q.explanation.tr).toContain("tarafsızlık");
  });
  it("1917 devrimi ile1918 resmî çekilişi ve Mondros'un türünü ayırır", () => {
    const rows = history011Cases["yirminci-yuzyil-baslarinda-osmanli"];
    expect(rows.map((r) => r.year)).toEqual([
      1911, 1912, 1914, 1915, 1917, 1918, 1918,
    ]);
    expect(rows[4].choices[rows[4].answer]).toBe("İtilaf'a yeni kaynak");
    expect(rows[5].choices[rows[5].answer]).toBe("Rusya'nın resmî çekilişi");
    expect(rows[6].choices[rows[6].answer]).toBe(
      "Ateşkes ve savunma sınırlaması",
    );
    expect(rows[6].conclusion).toContain("kesin barış");
  });
  it("sınır dışı ve geçersiz kalıcı sayıları güvenli olay ve adım aralığına taşır", () => {
    const id = "denge-stratejisi";
    expect(history011State(id, -99, -2).index).toBe(0);
    expect(history011State(id, 99, 9).index).toBe(5);
    expect(history011State(id, 99, 9).step).toBe(2);
    expect(
      history011State(id, Number.NaN, Number.POSITIVE_INFINITY).index,
    ).toBe(0);
    expect(history011State(id, Number.NaN, Number.POSITIVE_INFINITY).step).toBe(
      0,
    );
    expect(history011State(id, 1.9, 1.9).index).toBe(1);
    expect(history011State(id, 1.9, 1.9).visible).toHaveLength(2);
    expect(() => history011State("bilinmeyen", 0, 0)).toThrow(RangeError);
  });
  it("sebep, mekanizma ve sonucu üç açık bağlantıyla üretir", () => {
    for (const id of Object.keys(history011Cases)) {
      const rows = history011Cases[id];
      for (const [i, row] of rows.entries()) {
        expect(new Set(row.chain).size, row.name).toBe(3);
        expect(row.details).toHaveLength(3);
        expect(new Set(row.choices).size, row.name).toBe(3);
        expect(row.answer).toBeGreaterThanOrEqual(0);
        expect(row.answer).toBeLessThan(3);
        expect(history011State(id, i, 0).visible).toEqual(
          row.chain.slice(0, 1),
        );
        expect(history011State(id, i, 1).visible).toEqual(
          row.chain.slice(0, 2),
        );
        expect(history011State(id, i, 2).visible).toEqual(row.chain);
      }
    }
  });
});
