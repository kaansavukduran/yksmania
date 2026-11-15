import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  intestine018,
  enzymeNetwork018,
  liver018,
  pancreas018,
  heart018,
  vessels018,
  blood018,
  lymph018,
  immunity018,
  forge018BiologyGuides,
  forge018BiologyLessons,
  forge018BiologyTopics,
} from "../src/learning/forge018Biology";

describe("Sindirim ve dolaşımda bölme, yol ve bilanço", () => {
  it("glikozun seçici Na koşulunu fruktoza yaymaz, uzun zincir ve B12 yollarını ayrı tutar", () => {
    expect(intestine018("glucose", false, true, true)).toMatchObject({
      apical: false,
      exit: false,
      route: "Portal kan",
    });
    expect(intestine018("fructose", false, false, false)).toMatchObject({
      apical: true,
      exit: true,
      lymph: false,
    });
    expect(intestine018("longFat", true, false, true)).toMatchObject({
      apical: true,
      exit: false,
      lymph: true,
    });
    expect(intestine018("shortFat", false, false, false)).toMatchObject({
      exit: true,
      lymph: false,
    });
    expect(intestine018("b12", true, true, false).exit).toBe(false);
    expect(intestine018("b12", true, true, true).exit).toBe(true);
  });
  it("proteaz başlangıcını iki gerekli koşulla sınar, bağımsız hidroliz bağlarını korur", () => {
    for (const starter of [false, true])
      for (const precursor of [false, true]) {
        const m = enzymeNetwork018("acid", starter, precursor, 11, 4);
        expect(m.trypsin).toBe(starter && precursor);
        expect(m.amylasePreserved).toBe(true);
        expect([m.fragments, m.bonds, m.water]).toEqual([5, 6, 4]);
      }
    for (let size = 2; size <= 16; size++)
      for (let cuts = 0; cuts < size; cuts++) {
        const m = enzymeNetwork018("nutrient", true, true, size, cuts);
        expect(m.bonds + m.water).toBe(size - 1);
        expect(m.fragments).toBe(cuts + 1);
      }
  });
  it("kese kaybını veya sistik engeli hepatik üretimin durması saymaz", () => {
    expect(liver018("none", false, 2, 80)).toMatchObject({
      produced: true,
      direct: true,
      storedRoute: false,
      droplets: 8,
      relativeSurface: 2,
      relativeVolume: 1,
      loss: 20,
      replacement: 20,
    });
    expect(liver018("cystic", true, 3, 100)).toMatchObject({
      direct: true,
      storedRoute: false,
      loss: 0,
      replacement: 0,
      droplets: 27,
    });
    expect(liver018("common", true, 1, 0)).toMatchObject({
      produced: true,
      direct: false,
      bloodPreserved: true,
      loss: 100,
    });
    for (const r of [0, 20, 80, 100])
      expect(
        liver018("none", true, 4, r).recycled +
          liver018("none", true, 4, r).replacement,
      ).toBe(100);
  });
  it("kanal teslimi ile üretimi ayırır, eşdeğer miktarlarda iki stoktan fazlasını tüketmez", () => {
    expect(pancreas018(true, true, true, 8, 6)).toMatchObject({
      delivered: 6,
      acidLeft: 2,
      baseLeft: 0,
      neutralized: 6,
      endocrinePreserved: true,
    });
    expect(pancreas018(false, true, true, 8, 6)).toMatchObject({
      delivered: 0,
      acidLeft: 8,
      endocrinePreserved: true,
    });
    expect(pancreas018(true, false, false, 3, 9)).toMatchObject({
      secretin: false,
      cck: false,
      delivered: 9,
      acidLeft: 0,
      baseLeft: 6,
    });
    expect(pancreas018(true, true, true, 0, 0).neutralized).toBe(0);
  });
  it("kalbin hacim sabit evrelerinde bütün kapakları kapatır ve seri pompaları iki kez saymaz", () => {
    const states = [
      ["fill", true, false],
      ["atrial", true, false],
      ["isoContract", false, false],
      ["eject", false, true],
      ["isoRelax", false, false],
    ] as const;
    for (const [p, av, semi] of states) {
      const m = heart018(p, 120, 50, 75);
      expect([m.av, m.semilunar]).toEqual([av, semi]);
      expect(m.stroke).toBe(70);
      expect(m.output).toBe(5.25);
      expect(m.period).toBe(0.8);
    }
  });
  it("aynı Q için toplam alanla ters hız verir, basınç farkını akış miktarı saymaz", () => {
    expect(vessels018(100, 20, 40, 25, 20, 17, 3)).toMatchObject({
      velocity: 5,
      netPressure: 15,
      direction: "Dışa",
      accumulation: 0,
    });
    expect(vessels018(100, 200, 15, 25, 20, 17, 2)).toMatchObject({
      velocity: 0.5,
      netPressure: -10,
      direction: "İçe",
      excess: 3,
      lymph: 2,
      accumulation: 1,
    });
    expect(vessels018(100, 20, 25, 25, 2, 1, 15)).toMatchObject({
      direction: "Dengede",
      lymph: 1,
      accumulation: 0,
    });
  });
  it("hematokriti hacim oranıyla bulur; trombosit ve fibrin desteğini ayrı sınar", () => {
    expect(blood018(10, 4.5, "fibrin", true, true)).toMatchObject({
      hematocrit: 45,
      stablePlug: true,
      rest: 5.5,
    });
    expect(blood018(10, 4.5, "fibrin", false, true)).toMatchObject({
      plug: false,
      fibrin: true,
      active: true,
      stablePlug: false,
    });
    expect(blood018(10, 4.5, "platelet", true, false)).toMatchObject({
      plug: true,
      fibrin: false,
      active: true,
      stablePlug: false,
    });
    expect(blood018(10, 0, "vessel", false, false)).toMatchObject({
      hematocrit: 0,
      active: true,
    });
  });
  it("sağ üst bölgeyi alt bedenle karıştırmaz ve mevcut sıvıdan fazla lenf çıkarmaz", () => {
    for (const region of ["rightArm", "rightHead", "rightChest"] as const)
      expect(lymph018(region, false, 10, 5, 3).right).toBe(true);
    for (const region of ["leftArm", "legs", "intestine"] as const)
      expect(lymph018(region, false, 10, 5, 3)).toMatchObject({
        right: false,
        route: "Göğüs kanalı",
        final: 12,
        change: 2,
      });
    expect(lymph018("legs", true, 10, 5, 3)).toMatchObject({
      actual: 0,
      final: 15,
    });
    expect(lymph018("legs", false, 1, 0, 10)).toMatchObject({
      actual: 1,
      final: 0,
      change: -1,
    });
  });
  it("hazır A antikor miktarını hedef uyumu ve alıcının belleğiyle eşitlemez", () => {
    expect(immunity018("a", true, true, 8, true)).toMatchObject({
      matchingMemory: true,
      matchingPassive: true,
      passiveAmount: 8,
      tRecognition: true,
      passiveCreatesMemory: false,
    });
    expect(immunity018("b", true, true, 8, false)).toMatchObject({
      matchingMemory: false,
      matchingPassive: false,
      passiveAmount: 8,
      tRecognition: false,
    });
    expect(immunity018("a", false, false, 12, true)).toMatchObject({
      matchingMemory: false,
      passiveAmount: 0,
    });
    for (const [days, remaining] of [
      [0, 32],
      [4, 16],
      [8, 8],
      [12, 4],
    ])
      expect(immunity018("a", false, true, days, true).passiveAmount).toBe(
        remaining,
      );
  });
  it("sayısal ve kimlik sınırlarını reddeder", () => {
    expect(() => intestine018("x" as never, true, true, true)).toThrow();
    expect(() => enzymeNetwork018("acid", true, true, 11, 11)).toThrow();
    expect(() => enzymeNetwork018("acid", true, true, 11, 1.5)).toThrow();
    expect(() => liver018("none", true, 1.5, 80)).toThrow();
    expect(() => pancreas018(true, true, true, NaN, 6)).toThrow();
    expect(() => heart018("fill", 80, 80, 75)).toThrow();
    expect(() => vessels018(100, 0, 20, 25, 20, 17, 3)).toThrow();
    expect(() => vessels018(100, 20, 20, 25, 2, 3, 3)).toThrow();
    expect(() => blood018(10, 11, "fibrin", true, true)).toThrow();
    expect(() => lymph018("legs", false, 0, Infinity, 3)).toThrow();
    expect(() => immunity018("a", false, true, -1, true)).toThrow();
  });
});

describe("Dokuz yerleşik, kaynakla karşılaştırılmış yeni AYT anlatımı", () => {
  it("atanan ayrıntıları bağımsız soru kartı ve adımlı öğretimle sunar", () => {
    expect(Object.values(forge018BiologyTopics)).toEqual(
      Array.from({ length: 9 }, (_, i) => `detail-${307 + i}`),
    );
    expect(forge018BiologyLessons).toHaveLength(9);
    for (const g of forge018BiologyGuides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(10);
      expect(
        g.sections.every(
          (s) =>
            s.paragraphs.length === 2 &&
            s.paragraphs.every((p) => p.trim().length > 0),
        ),
      ).toBe(true);
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(4);
      expect(
        g.examples.every(
          (e) =>
            e.steps.length === 3 &&
            e.steps.every((s) => s.explanation.trim()) &&
            e.answer &&
            e.pitfall,
        ),
      ).toBe(true);
    }
    const ids = new Set<string>();
    for (const l of forge018BiologyLessons) {
      expect(l.subjectId).toBe("ayt-biyoloji");
      expect(l.questions).toHaveLength(10);
      for (const q of l.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.options[q.answer]).toBeDefined();
        expect(questionContentIssues(q), q.id).toEqual([]);
      }
    }
    expect(ids.size).toBe(90);
  });
  it("soruların gerçek sayısal anahtarlarını ve önemli genelleme sınırlarını korur", () => {
    const key = (id: string, k: number) => {
      const q = forge018BiologyLessons.find((l) => l.id === id)!.questions[
        k - 1
      ];
      return q.options[q.answer].tr;
    };
    expect(key("sindirim-bagirsaklar", 8)).toBe("200");
    expect(key("sindirim-enzimler-hormonlar", 6)).toBe(
      "5 parça, 6 kalan bağ, 4 su kullanımı",
    );
    expect(key("sindirim-karaciger-safra", 6)).toBe("20");
    expect(key("sindirim-pankreas", 6)).toBe("8");
    expect(key("dolasim-kalp", 4)).toBe("5,25");
    expect(key("dolasim-damarlar-starling", 6)).toBe("+1 birim");
    expect(key("dolasim-kan-doku", 9)).toBe("10 milyon");
    expect(key("lenf-sistemi", 5)).toBe("15 mL");
    expect(key("bagisiklik-sistemi", 7)).toBe("8");
    expect(
      forge018BiologyGuides
        .find((g) => g.id === "dolasim-damarlar-starling")!
        .sections.map((s) => s.paragraphs.join(" "))
        .join(" "),
    ).toContain("her organda venöz uç mutlaka");
  });
});
