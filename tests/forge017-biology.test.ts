import { describe, expect, it } from "vitest";
import {
  sarcomere017,
  muscleStep017,
  motorRecruitment017,
  cubeSurface017,
  swallowing017,
  gastricScene017,
  gastricFluid017,
  forge017BiologyGuides,
  forge017BiologyLessons,
  forge017BiologyTopics,
  type MuscleStep017,
} from "../src/learning/forge017Biology";

describe("Kas ve bölgesel sindirim için verilen koşulları koruyan modeller", () => {
  it("sarkomer kısalırken filament boylarını sabit tutar, I toplamını ve H sınırını ayırır", () => {
    for (const [length, i, h, overlap] of [
      [2, 0.4, 0, 0.8],
      [2.2, 0.6, 0.2, 0.7],
      [2.6, 1, 0.6, 0.5],
      [3.2, 1.6, 1.2, 0.2],
    ]) {
      const m = sarcomere017(length);
      expect(m.a).toBe(1.6);
      expect(m.thin).toBe(1);
      expect(m.thick).toBe(1.6);
      expect(m.iTotal).toBeCloseTo(i);
      expect(m.h).toBeCloseTo(h);
      expect(m.overlap).toBeCloseTo(overlap);
      expect(m.iHalf * 2).toBeCloseTo(i);
      expect(m.a + m.iTotal).toBeCloseTo(length);
    }
  });
  it("hazır tek vuruşu yeni ATP bağlanmasına eşitlemez; ayrılma ve pompayı ayrıca sınar", () => {
    const matrix: Record<MuscleStep017, boolean[]> = {
      signal: [true, true, true, true],
      calcium: [true, true, true, true],
      expose: [false, false, true, true],
      stroke: [false, false, true, true],
      detach: [false, true, false, true],
      pump: [false, true, false, true],
    };
    for (const step of Object.keys(matrix) as MuscleStep017[]) {
      let i = 0;
      for (const ca of [false, true])
        for (const atp of [false, true])
          expect(muscleStep017(step, ca, atp).enabled).toBe(matrix[step][i++]);
    }
    expect(muscleStep017("stroke", true, false).evidence).toContain(
      "önceden ATP hidroliziyle hazırdır",
    );
    expect(muscleStep017("detach", true, false).evidence).toContain(
      "normal ayrılması",
    );
    expect(muscleStep017("pump", false, false).enabled).toBe(false);
  });
  it("bütün kasın birim katılımını tek lif elektrik genliğinden ayrı sayar", () => {
    expect(motorRecruitment017(0, 2).force).toBe(0);
    expect(motorRecruitment017(3, 2).force).toBe(6);
    expect(motorRecruitment017(5, 2).force).toBe(10);
    expect(motorRecruitment017(5, 0).force).toBe(0);
  });
  it("mekanik parçalamada hacmi korur; bütün parça yüzeylerini sayar", () => {
    for (const [d, p, a] of [
      [1, 1, 24],
      [2, 8, 48],
      [3, 27, 72],
      [4, 64, 96],
    ]) {
      const m = cubeSurface017(d);
      expect(m.volume).toBe(8);
      expect(m.fragments).toBe(p);
      expect(m.surface).toBeCloseTo(a);
      expect(m.each ** 3 * m.fragments).toBeCloseTo(8);
    }
  });
  it("faringeal koruma başarısızken başarılı geçiş bildirmez; evreleri bağımsız koşullarıyla ayırır", () => {
    expect(swallowing017(0, true, 4, 5)).toMatchObject({
      position: 0,
      airwayOpen: true,
      arrived: false,
      upperOpen: false,
    });
    expect(swallowing017(1, true, 4, 5)).toMatchObject({
      position: 0,
      arrived: false,
    });
    expect(swallowing017(2, true, 4, 5)).toMatchObject({
      coordinated: true,
      airwayOpen: false,
      upperOpen: true,
      lowerOpen: false,
    });
    expect(swallowing017(2, false, 4, 5)).toMatchObject({
      coordinated: false,
      airwayOpen: true,
      upperOpen: false,
      arrived: false,
    });
  });
  it("özofagus oyuncak yolunu zamanla taşır, varışı ve son sınırı doğru gösterir", () => {
    expect(swallowing017(3, true, 4, 4)).toMatchObject({
      position: 16,
      arrived: false,
      lowerOpen: false,
    });
    expect(swallowing017(3, true, 4, 5)).toMatchObject({
      position: 20,
      arrived: true,
      lowerOpen: true,
    });
    expect(swallowing017(3, true, 5, 20).position).toBe(20);
    expect(swallowing017(3, true, 1, 0).position).toBe(0);
  });
  it("öncül aktivasyonu, salgı yolu ve ayrıca verilen zincir kesimlerini karıştırmaz", () => {
    for (const signal of ["vagus", "gastrin", "duodenum"] as const)
      for (const acid of [false, true])
        for (const precursor of [false, true])
          for (const mucus of [false, true]) {
            const m = gastricScene017(signal, acid, precursor, mucus, 12, 2);
            expect(m.activationExample).toBe(acid && precursor);
            expect(m.fragments).toBe(3);
            expect(m.bondsAfter).toBe(9);
            expect(m.water).toBe(2);
          }
    expect(gastricScene017("vagus", true, true, true, 12, 2).route).toBe(
      "Sinirsel düzenleme",
    );
    expect(gastricScene017("gastrin", true, true, true, 12, 2).route).toBe(
      "Kan yoluyla düzenleme",
    );
    expect(gastricScene017("duodenum", true, true, true, 12, 2).route).toBe(
      "Bağırsaktan geri denetim",
    );
  });
  it("doğrusal tek zincirde bağ, parça ve hidroliz suyunu tüm geçerli kesimlerde korur", () => {
    for (let size = 8; size <= 20; size++)
      for (let cuts = 0; cuts < size; cuts++) {
        const m = gastricScene017("gastrin", false, false, false, size, cuts);
        expect(m.bondsAfter + m.water).toBe(size - 1);
        expect(m.fragments).toBe(cuts + 1);
        expect(m.bondsAfter).toBeGreaterThanOrEqual(0);
        expect(m.activationExample).toBe(false);
      }
  });
  it("sıvı bilançosunda negatif hacim veya mevcut miktarı aşan çıkış kabul etmez", () => {
    expect(gastricFluid017(200, 20, 40).final).toBe(180);
    expect(gastricFluid017(0, 0, 0).final).toBe(0);
    expect(gastricFluid017(30, 20, 50).final).toBe(0);
    expect(() => gastricFluid017(10, 0, 11)).toThrow();
  });
  it("belirsiz, sonlu olmayan ve model aralığı dışındaki sayıları reddeder", () => {
    for (const length of [NaN, Infinity, 1.9, 3.3])
      expect(() => sarcomere017(length)).toThrow();
    expect(() => cubeSurface017(1.5)).toThrow();
    expect(() => motorRecruitment017(-1, 2)).toThrow();
    expect(() => swallowing017(4, true, 4, 1)).toThrow();
    expect(() => swallowing017(3, true, 0, 1)).toThrow();
    expect(() =>
      gastricScene017("gastrin", true, true, true, 12, 12),
    ).toThrow();
    expect(() =>
      gastricScene017("gastrin", true, true, true, 12, 1.5),
    ).toThrow();
  });
});
describe("Üç ayrıntılı ve uygulama içinde hazır AYT ünitesi", () => {
  it("atanan ayrıntıları derin anlatım, adımlı örnek ve bağımsız beş seçenekli kartlarla kapsar", () => {
    expect(Object.values(forge017BiologyTopics)).toEqual([
      "detail-304",
      "detail-305",
      "detail-306",
    ]);
    expect(forge017BiologyLessons).toHaveLength(3);
    for (const g of forge017BiologyGuides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(10);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length > 300)).toBe(true);
      }
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(4);
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.check.length).toBeGreaterThan(30);
        expect(e.pitfall.length).toBeGreaterThan(20);
      }
    }
    const ids = new Set<string>();
    for (const l of forge017BiologyLessons) {
      expect(l.subjectId).toBe("ayt-biyoloji");
      expect(l.questions).toHaveLength(10);
      for (const q of l.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.hint.tr.length).toBeGreaterThan(15);
        expect(q.explanation.tr.length).toBeGreaterThan(100);
        expect(q.prompt.tr).not.toMatch(
          /önceki sayfa|yukarıdaki şekil|bu metne göre/iu,
        );
      }
    }
    expect(ids.size).toBe(30);
  });
  it("normal soru kartlarında sayısal anahtarları ve çözümlerin sınırlarını korur", () => {
    const key = (id: string, q: number) => {
      const x = forge017BiologyLessons.find((l) => l.id === id)!.questions[
        q - 1
      ];
      return x.options[x.answer].tr;
    };
    expect(key("kas-doku", 4)).toBe("0,6 ve 0,2");
    expect(key("kas-doku", 9)).toBe("23");
    expect(key("sindirim-agiz-yutak-yemek-borusu", 2)).toBe("48");
    expect(key("sindirim-agiz-yutak-yemek-borusu", 8)).toBe("16 ve 3");
    expect(key("sindirim-agiz-yutak-yemek-borusu", 10)).toBe("4");
    expect(key("sindirim-mide", 4)).toBe("3 ve 9");
    expect(key("sindirim-mide", 5)).toBe("100");
    expect(key("sindirim-mide", 8)).toBe("180");
    expect(
      forge017BiologyGuides.find((g) => g.id === "sindirim-mide")!.examples[0]
        .answer,
    ).toBe("3 parça, 9 kalan bağ, 2 su.");
  });
});
