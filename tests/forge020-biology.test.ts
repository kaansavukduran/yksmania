import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Forge020BiologyLab from "../src/learning/Forge020BiologyLab";
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (
    _id: string,
    defaults: Record<string, string | number | boolean>,
  ) => [defaults, () => undefined],
}));
import { questionContentIssues } from "../src/domain/questionContent";
import {
  femaleRoute020,
  gametogenesis020,
  menstrual020,
  embryo020,
  community020,
  population020,
  nucleic020,
  discovery020,
  forge020BiologyLessons,
  forge020BiologyGuides,
  forge020BiologyGuideExtensions,
  forge020BiologyTopics,
} from "../src/learning/forge020Biology";

describe("Üreme, ekoloji ve nükleik asitte ayrı süreç ve ölçüler", () => {
  it("seçili organın görevini hücrenin konumundan ve seçici yol engelinden ayırır", () => {
    expect(femaleRoute020("ovary", true, 4)).toMatchObject({
      selected: "Yumurtalık",
      position: "Endometriyum",
      arrived: 4,
      blocked: false,
      urinarySeparate: true,
    });
    expect(femaleRoute020("tube", false, 4)).toMatchObject({
      position: "Kanal girişi",
      arrived: 1,
      blocked: true,
    });
    expect(femaleRoute020("uterus", false, 0).blocked).toBe(false);
  });
  it("mayozun takım, kromatit ve C sayımını ana ürün ile kutup hücrelerinden ayırır", () => {
    expect(gametogenesis020("sperm", "primary", false, 23)).toMatchObject({
      mainCells: 1,
      chromosomesPerMainCell: 46,
      chromatidsPerMainCell: 92,
      dnaC: 4,
      functionalGametes: 0,
    });
    expect(gametogenesis020("sperm", "secondary", false, 23)).toMatchObject({
      mainCells: 2,
      chromosomesPerMainCell: 23,
      chromatidsPerMainCell: 46,
      dnaC: 2,
    });
    expect(gametogenesis020("sperm", "products", false, 23)).toMatchObject({
      mainCells: 4,
      functionalGametes: 4,
      dnaC: 1,
    });
    expect(gametogenesis020("oocyte", "products", false, 23)).toMatchObject({
      complete: false,
      dnaC: 2,
      mainCells: 1,
      polarBodies: 1,
      functionalGametes: 0,
    });
    expect(gametogenesis020("oocyte", "products", true, 23)).toMatchObject({
      complete: true,
      dnaC: 1,
      mainCells: 1,
      polarBodies: 2,
      functionalGametes: 1,
      chromosomesPerMainCell: 23,
    });
  });
  it("varsayımsal 28 günde ovaryum–uterus evresini ve hCG desteğini farklı çıktılar yapar", () => {
    expect(menstrual020(3, false)).toMatchObject({
      ovarian: "Folikül evresi",
      uterine: "Kanama",
      supported: false,
    });
    expect(menstrual020(14, false)).toMatchObject({
      ovarian: "Ovulasyon",
      lh: 100,
    });
    expect(menstrual020(28, false).progesterone).toBe(5);
    expect(menstrual020(28, true)).toMatchObject({
      progesterone: 80,
      estrogen: 60,
      supported: true,
      corpus: "hCG desteği var",
    });
    expect(menstrual020(10, true).supported).toBe(false);
  });
  it("segmentasyonda sabit toplam hacmi hücrelere böler; farklı evrelere keyfî sayı taşımaz", () => {
    expect(embryo020("cleavage", 4, "ecto")).toMatchObject({
      cellCount: 16,
      totalVolume: 128,
      volumePerCell: 8,
      ploidy: "2n",
    });
    expect(embryo020("cleavage", 0, "meso").volumePerCell).toBe(128);
    expect(embryo020("blastocyst", 5, "endo")).toMatchObject({
      cellCount: null,
      volumePerCell: null,
      implantation: true,
    });
    expect(embryo020("layers", 3, "meso").target).toContain("böbrek");
  });
  it("kontrollere göre bütün işaret örüntülerini bulur; artı eksiye tek mekanizma dayatmaz", () => {
    expect(community020(20, 12, 26, 18)).toMatchObject({
      deltaA: 6,
      deltaB: 6,
      pair: ["+", "+"],
    });
    expect(community020(16, 10, 12, 7).pair).toEqual(["−", "−"]);
    expect(community020(15, 30, 20, 18).interpretation).toContain(
      "veya parazitlik",
    );
    expect(community020(10, 10, 15, 10).interpretation).toContain(
      "Kommensalizm",
    );
    expect(community020(10, 10, 10, 5).interpretation).toContain("Amensalizm");
    expect(community020(10, 10, 10, 10).pair).toEqual(["0", "0"]);
  });
  it("bilanço son sayısını lojistik anlık eğimden ayırır; sıfır başlangıç yüzdesini uydurmaz", () => {
    expect(population020(200, 30, 10, 5, 40, 5, 400, 0.2)).toMatchObject({
      change: -15,
      final: 185,
      density: 37,
      percentage: -7.5,
      growthSlope: 20,
    });
    expect(population020(0, 0, 0, 0, 0, 1, 100, 0.2)).toMatchObject({
      final: 0,
      percentage: null,
      growthSlope: 0,
    });
    expect(population020(100, 0, 0, 0, 0, 4, 100, 0.2).growthSlope).toBe(0);
    expect(population020(120, 0, 0, 0, 0, 4, 100, 0.2).growthSlope).toBeCloseTo(
      -4.8,
    );
    expect(population020(40, 0, 0, 0, 0, 4, 100, 0.1).growthSlope).toBeCloseTo(
      2.4,
    );
  });
  it("antiparalel sırayı, bütün baz sayısını ve iki farklı bağ türünü korur", () => {
    expect(nucleic020("dna", "AGTC", false)).toMatchObject({
      complement: "TCAG",
      reverseComplement: "GACT",
      nucleotides: 8,
      phosphodiester: 6,
      hydrogen: 10,
      totals: { A: 2, T: 2, G: 2, C: 2, U: 0 },
    });
    expect(nucleic020("dna", "ATGC", true).phosphodiester).toBe(8);
    expect(nucleic020("rna", "AUGC", false)).toMatchObject({
      complement: null,
      reverseComplement: null,
      phosphodiester: 3,
      hydrogen: null,
      nucleotides: 4,
      sugar: "Riboz",
    });
    expect(nucleic020("dna", "A", false)).toMatchObject({
      phosphodiester: 0,
      hydrogen: 2,
    });
  });
  it("Griffith dönüşümünü kimyasal kimlikten; seçici enzim ve T2 sinyalini birbirinden ayırır", () => {
    expect(discovery020("griffith", "R")).toMatchObject({
      mouseSurvives: true,
      livingS: false,
      transformed: false,
    });
    expect(discovery020("griffith", "deadS")).toMatchObject({
      mouseSurvives: true,
      livingS: false,
    });
    expect(discovery020("griffith", "mix")).toMatchObject({
      mouseSurvives: false,
      livingS: true,
      transformed: true,
    });
    expect(discovery020("avery", "dnase").transformed).toBe(false);
    for (const c of ["none", "rnase", "protease"])
      expect(discovery020("avery", c).transformed).toBe(true);
    expect(discovery020("phage", "P32").signal).toContain("çökelti");
    expect(discovery020("phage", "S35").signal).toContain("üst sıvı");
  });
  it("sonluluk, geçerli seçenek, tam hücre sayısı ve açık payda koşullarını zorunlu tutar", () => {
    expect(() => femaleRoute020("missing" as never, true, 2)).toThrow();
    expect(() => femaleRoute020("ovary", true, 1.5)).toThrow();
    expect(() => gametogenesis020("sperm", "products", true, 0)).toThrow();
    expect(() => menstrual020(29, true)).toThrow();
    expect(() => embryo020("cleavage", 6, "ecto")).toThrow();
    expect(() => community020(0, 10, 10, 10)).toThrow();
    expect(() => population020(1, 0, 2, 0, 0, 1, 100, 0.1)).toThrow();
    expect(() => population020(1, 0, 0, 0, 0, 0, 100, 0.1)).toThrow();
    expect(() => population020(1, 0, 0, 0, 0, 1, 100, NaN)).toThrow();
    expect(() => nucleic020("rna", "ATGC", false)).toThrow();
    expect(() => nucleic020("dna", "", true)).toThrow();
    expect(() => discovery020("avery", "P32")).toThrow();
  });
  it("sekiz yeni rehber ve ayrı ileri soru seti üretir; varolan DNA rehberini yenisiyle değiştirmez", () => {
    expect(forge020BiologyGuides).toHaveLength(8);
    expect(forge020BiologyLessons).toHaveLength(9);
    expect(forge020BiologyLessons.flatMap((x) => x.questions)).toHaveLength(90);
    expect(forge020BiologyGuides.some((x) => x.id === "dna-eslenmesi")).toBe(
      false,
    );
    expect(
      forge020BiologyLessons.find((x) => x.id === "dna-replikasyonu-ileri"),
    ).toMatchObject({ body: [], tags: expect.arrayContaining(["soru-seti"]) });
    expect(forge020BiologyTopics["dna-replikasyonu-ileri"]).toBe("detail-330");
    const extension = forge020BiologyGuideExtensions[0];
    expect(extension.id).toBe("dna-eslenmesi");
    expect(extension.sections.length).toBeGreaterThanOrEqual(8);
    expect(extension.examples).toHaveLength(4);
    expect("minutes" in extension).toBe(false);
    expect("objectives" in extension).toBe(false);
    for (const guide of forge020BiologyGuides) {
      expect(guide.sections.length).toBeGreaterThanOrEqual(10);
      expect(guide.examples).toHaveLength(4);
      expect(guide.recall).toHaveLength(4);
      for (const section of guide.sections)
        expect(section.paragraphs).toHaveLength(2);
      for (const example of guide.examples)
        expect(example.steps).toHaveLength(3);
    }
  });
  it("doksan kartın gerçek bağlamını, beş benzersiz seçeneğini, anahtarını ve ipucu/açıklamasını doğrular", () => {
    const ids = new Set<string>();
    for (const lesson of forge020BiologyLessons)
      for (const q of lesson.questions) {
        expect(questionContentIssues(q), q.id).toEqual([]);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((x) => x.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.hint.tr.trim()).not.toBe("");
        expect(q.explanation.tr.trim()).not.toBe("");
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
      }
  });
  it("sekiz gerçek varsayılan bileşeni veri modeli hatası ve kayıp sonuç üretmeden sunar", () => {
    for (const guide of forge020BiologyGuides) {
      const html = renderToStaticMarkup(
        createElement(Forge020BiologyLab, { lessonId: guide.id }),
      );
      expect(html, guide.id).toContain(`data-forge020="${guide.id}"`);
      expect(html, guide.id).toContain("data-model-result");
      expect(html, guide.id).toContain("<svg");
      expect(html, guide.id).not.toContain("NaN");
      expect(html, guide.id).not.toContain("undefined");
      const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
      expect(new Set(ids).size, guide.id).toBe(ids.length);
    }
    expect(
      renderToStaticMarkup(
        createElement(Forge020BiologyLab, { lessonId: "dna-eslenmesi" }),
      ),
    ).toBe("");
    expect(
      renderToStaticMarkup(
        createElement(Forge020BiologyLab, {
          lessonId: "dna-replikasyonu-ileri",
        }),
      ),
    ).toBe("");
  });
});
