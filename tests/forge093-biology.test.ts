import { describe, expect, it } from "vitest";
import {
  alignedDifferences,
  classificationInference,
  classificationRanks,
  forge093BiologyGuides,
  forge093BiologyLessons,
  forge093BiologyTopics,
  membraneTransport,
  namedOrganisms,
  narrowestSharedRank,
  osmosisModel,
  teachingSequences,
  type SoluteExperiment,
} from "../src/learning/forge093Biology";

const oxygen: SoluteExperiment = {
  solute: "oxygen",
  active: false,
  carrier: false,
  atp: false,
  permeability: 3,
  outside: 8,
  inside: 2,
};

describe("zar modelinin fiziksel sınırları", () => {
  it("geçebilir O₂ için8→2 net akışını7/3 yaparken toplamı korur", () => {
    const result = membraneTransport(oxygen);
    expect(result.direction).toBe("in");
    expect(result.amount).toBe(1);
    expect(result.outsideAfter).toBe(7);
    expect(result.insideAfter).toBe(3);
    expect(result.outsideAfter + result.insideAfter).toBe(10);
    expect(result.mechanism).toBe("Basit difüzyon");
  });
  it("pasif yolda yönü tersine çevirir; iki bölmede negatif miktar veya denge aşımı üretmez", () => {
    for (const outside of [0, 0.5, 2, 5, 10, 15])
      for (const inside of [0, 0.5, 2, 5, 10, 15]) {
        const result = membraneTransport({ ...oxygen, outside, inside });
        expect(result.outsideAfter + result.insideAfter).toBeCloseTo(
          outside + inside,
          10,
        );
        expect(result.outsideAfter).toBeGreaterThanOrEqual(0);
        expect(result.insideAfter).toBeGreaterThanOrEqual(0);
        expect(
          Math.abs(result.outsideAfter - result.insideAfter),
        ).toBeLessThanOrEqual(Math.abs(outside - inside));
        expect(result.direction).toBe(
          outside === inside ? "none" : outside > inside ? "in" : "out",
        );
      }
  });
  it("geçirgenliği0 yapınca fark olsa da geçişi durdurur; katsayı gerçek sayısal adımı değiştirir", () => {
    expect(membraneTransport({ ...oxygen, permeability: 0 })).toMatchObject({
      direction: "none",
      amount: 0,
      outsideAfter: 8,
      insideAfter: 2,
    });
    expect(
      membraneTransport({ ...oxygen, permeability: 1 }).amount,
    ).toBeCloseTo(1 / 3);
    expect(
      membraneTransport({ ...oxygen, permeability: 2 }).amount,
    ).toBeCloseTo(2 / 3);
    expect(
      membraneTransport({ ...oxygen, outside: 5, inside: 5 }).direction,
    ).toBe("none");
  });
  it("glikoz ve Na⁺ için protein seçiciliği ister; protein varlığını ATP şartı saymaz", () => {
    for (const solute of ["glucose", "sodium"] as const) {
      expect(
        membraneTransport({ ...oxygen, solute, carrier: false }).amount,
      ).toBe(0);
      const withoutAtp = membraneTransport({
        ...oxygen,
        solute,
        carrier: true,
        atp: false,
      });
      const withAtp = membraneTransport({
        ...oxygen,
        solute,
        carrier: true,
        atp: true,
      });
      expect(withoutAtp).toEqual(withAtp);
      expect(withoutAtp.direction).toBe("in");
      expect(withoutAtp.mechanism).toBe("Kolaylaştırılmış difüzyon");
    }
  });
  it("küçük-madde yolunu açmak büyük proteini veya uygun olmayan ATP yükünü geçirmez", () => {
    for (const active of [false, true])
      expect(
        membraneTransport({
          ...oxygen,
          solute: "protein",
          active,
          carrier: true,
          atp: true,
        }).amount,
      ).toBe(0);
    expect(
      membraneTransport({ ...oxygen, active: true, carrier: true, atp: true })
        .amount,
    ).toBe(0);
  });
  it("ATP ve pompa varsa Na⁺’u gradyana karşı dışarı taşır;10 üstünde de maddeyi korur", () => {
    const base: SoluteExperiment = {
      ...oxygen,
      solute: "sodium",
      active: true,
      carrier: true,
      atp: true,
    };
    const pumped = membraneTransport(base);
    expect(pumped).toMatchObject({
      direction: "out",
      outsideAfter: 9,
      insideAfter: 1,
    });
    expect(membraneTransport({ ...base, atp: false }).amount).toBe(0);
    expect(membraneTransport({ ...base, carrier: false }).amount).toBe(0);
    const beyondOriginalScale = membraneTransport({
      ...base,
      outside: 10,
      inside: 2,
    });
    expect(beyondOriginalScale.outsideAfter).toBe(11);
    expect(beyondOriginalScale.insideAfter).toBe(1);
    expect(
      beyondOriginalScale.outsideAfter + beyondOriginalScale.insideAfter,
    ).toBe(12);
    expect(membraneTransport({ ...base, inside: 0 }).blocked).toContain(
      "Na⁺ kalmadı",
    );
  });
  it("NaN, negatif derişim ve model dışı geçirgenliği reddeder", () => {
    for (const input of [
      { ...oxygen, outside: NaN },
      { ...oxygen, inside: -1 },
      { ...oxygen, permeability: 4 },
      { ...oxygen, permeability: Infinity },
    ])
      expect(() => membraneTransport(input)).toThrow(RangeError);
  });
});

describe("ozmoz: çözünen, basınç ve su yolu birlikte", () => {
  it("aynı derişim farkında karşı basınçla net yönü dengeler ve tersine çevirebilir", () => {
    expect(osmosisModel(3, 1, 0, true)).toMatchObject({
      direction: "in",
      drive: 2,
      environment: "Hipotonik",
    });
    expect(osmosisModel(3, 1, 2, true)).toMatchObject({
      direction: "none",
      drive: 0,
    });
    expect(osmosisModel(3, 1, 3, true)).toMatchObject({
      direction: "out",
      drive: -1,
    });
    expect(osmosisModel(1, 3, 0, true)).toMatchObject({
      direction: "out",
      environment: "Hipertonik",
    });
  });
  it("su geçirmeyen zarda gradyan tek başına akış oluşturmaz; eşit koşul net0’dır", () => {
    expect(osmosisModel(6, 0, 0, false).direction).toBe("none");
    expect(osmosisModel(2, 2, 0, true)).toMatchObject({
      direction: "none",
      environment: "İzotonik",
    });
    expect(() => osmosisModel(-1, 2, 0, true)).toThrow(RangeError);
    expect(() => osmosisModel(1, 2, Infinity, true)).toThrow(RangeError);
  });
});

describe("sınıflandırmada kanıt ve kapsama", () => {
  it("yalnız ortak hücre bilgisi veya amniyonla iç dallanma uydurmaz", () => {
    expect(classificationInference("cell")).toMatchObject({
      resolved: false,
      expected: "insufficient",
    });
    expect(classificationInference("structure")).toMatchObject({
      resolved: false,
      expected: "insufficient",
    });
    expect(classificationInference("dna")).toMatchObject({
      resolved: true,
      expected: "sister",
    });
    expect(classificationInference("dna").detail).toContain("Oluşturulmuş");
    expect(() => classificationInference("görünüş")).toThrow(RangeError);
  });
  it("hizalanmış öğretim dizilerinin farklarını bağımsız sayar", () => {
    expect(alignedDifferences("GGCCGA", "GGCCGG")).toBe(1);
    expect(alignedDifferences("GGCCGA", "GGCCTT")).toBe(2);
    expect(alignedDifferences("GGCCGG", "GGCCTT")).toBe(2);
    expect(alignedDifferences("AAAAAA", "AACCAA")).toBe(2);
    expect(() => alignedDifferences("AAA", "AA")).toThrow(RangeError);
    expect(() => alignedDifferences("AAN", "AAA")).toThrow(RangeError);
    expect(teachingSequences).toHaveLength(5);
  });
  it("aynı cins ile aynı familyayı ayırır, tamamlayıcı adı tek başına tür saymaz", () => {
    expect(narrowestSharedRank("lion", "tiger")).toMatchObject({
      index: 6,
      rank: "Cins",
      taxon: "Panthera",
    });
    expect(narrowestSharedRank("lion", "cat")).toMatchObject({
      index: 5,
      rank: "Familya",
      taxon: "Felidae",
    });
    expect(narrowestSharedRank("sparrow", "cricket")).toMatchObject({
      index: 1,
      rank: "Âlem",
      taxon: "Animalia",
    });
    expect(narrowestSharedRank("human", "human")).toMatchObject({
      index: 7,
      rank: "Tür",
      taxon: "Homo sapiens",
    });
    expect(() => narrowestSharedRank("uydurulmuş", "lion")).toThrow(RangeError);
  });
  it("bilinen iki parçalı adları doğru hiyerarşiye bağlar", () => {
    expect(classificationRanks).toEqual([
      "Üst âlem",
      "Âlem",
      "Şube",
      "Sınıf",
      "Takım",
      "Familya",
      "Cins",
      "Tür",
    ]);
    for (const organism of namedOrganisms) {
      expect(organism.genus).toMatch(/^[A-Z][a-z]+$/);
      expect(organism.epithet).toMatch(/^[a-z]+$/);
      expect(organism.lineage).toHaveLength(8);
      expect(organism.lineage[6]).toBe(organism.genus);
      expect(organism.lineage[7]).toBe(`${organism.genus} ${organism.epithet}`);
    }
    expect(namedOrganisms.find((o) => o.id === "human")?.lineage).toEqual([
      "Eukarya",
      "Animalia",
      "Chordata",
      "Mammalia",
      "Primates",
      "Hominidae",
      "Homo",
      "Homo sapiens",
    ]);
  });
});

describe("iki kaynaklı biyoloji ünitesinin öğretim sözleşmesi", () => {
  it("iki ayrıntılı konu, çözümler ve koşullu hatırlama içerir", () => {
    expect(forge093BiologyTopics).toEqual({
      "hucre-zarinda-madde-alisverisleri": "detail-12",
      "canlilarin-siniflandirilmasi": "detail-13",
    });
    expect(forge093BiologyGuides).toHaveLength(2);
    for (const guide of forge093BiologyGuides) {
      expect(guide.sections.length).toBeGreaterThanOrEqual(8);
      for (const section of guide.sections) {
        expect(section.paragraphs.length).toBeGreaterThanOrEqual(2);
        for (const paragraph of section.paragraphs)
          expect(paragraph.length).toBeGreaterThan(180);
      }
      expect(guide.examples.length).toBeGreaterThanOrEqual(4);
      for (const example of guide.examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        expect(example.prompt.length).toBeGreaterThan(100);
        expect(example.pitfall.length).toBeGreaterThan(40);
        expect(example.check.length).toBeGreaterThan(40);
      }
      expect(guide.recall.length).toBeGreaterThanOrEqual(4);
    }
  });
  it("20 tam bağlamlı özgün soruyu doğrulanmış cevap sıraları ve gerekçeleriyle korur", () => {
    const expectedKeys = [
      [0, 1, 2, 3, 4, 1, 3, 0, 4, 2],
      [2, 0, 4, 1, 3, 0, 2, 4, 1, 3],
    ];
    expect(forge093BiologyLessons).toHaveLength(2);
    const questionIds = new Set<string>();
    forge093BiologyLessons.forEach((lesson, i) => {
      expect(lesson.questions).toHaveLength(10);
      expect(lesson.questions.map((q) => q.answer)).toEqual(expectedKeys[i]);
      for (const question of lesson.questions) {
        expect(questionIds.has(question.id)).toBe(false);
        questionIds.add(question.id);
        expect(question.options).toHaveLength(5);
        expect(new Set(question.options.map((option) => option.tr)).size).toBe(
          5,
        );
        expect(question.prompt.tr.length).toBeGreaterThan(100);
        expect(question.hint.tr.length).toBeGreaterThan(25);
        expect(question.explanation.tr.length).toBeGreaterThan(200);
        expect(question.options[question.answer].tr.trim()).not.toBe("");
      }
    });
  });
});
