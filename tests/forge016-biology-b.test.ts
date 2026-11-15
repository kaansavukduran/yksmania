import { describe, expect, it } from "vitest";
import {
  bone016State,
  ear016State,
  eye016State,
  forge016BiologyBGuides,
  forge016BiologyBLessons,
  forge016BiologyBTopics,
  hearing016Stages,
  joint016State,
  skin016State,
  smellTaste016State,
} from "../src/learning/forge016BiologyB";

describe("016 duyu ve destek modelleri", () => {
  it("altı mevcut sırayı derin anlatıma ve bağımsız beş seçenekli sorulara bağlar", () => {
    expect(Object.values(forge016BiologyBTopics)).toEqual([
      "detail-298",
      "detail-299",
      "detail-300",
      "detail-301",
      "detail-302",
      "detail-303",
    ]);
    expect(forge016BiologyBLessons).toHaveLength(6);
    const questionIds = new Set<string>();
    for (const guide of forge016BiologyBGuides) {
      expect(guide.sections.length).toBeGreaterThanOrEqual(8);
      for (const s of guide.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length > 150)).toBe(true);
      }
      expect(guide.examples.length).toBeGreaterThanOrEqual(4);
      for (const e of guide.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.prompt.length).toBeGreaterThan(60);
      }
      expect(guide.recall.length).toBeGreaterThanOrEqual(4);
    }
    for (const lesson of forge016BiologyBLessons) {
      expect(lesson.questions).toHaveLength(10);
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.hint.tr.length).toBeGreaterThan(20);
        expect(q.explanation.tr.length).toBeGreaterThan(80);
        expect(questionIds.has(q.id)).toBe(false);
        questionIds.add(q.id);
      }
    }
  });
  it("sabit basınç ve titreşimde hızlı uyumu aynı saymaz", () => {
    expect(skin016State("pressure", "steady", "eccrine").responses).toEqual([
      {
        id: "pacini",
        name: "Pacini: basıncın değişimi",
        level: 0,
        pattern: [3, 0, 2],
      },
      {
        id: "merkel",
        name: "Merkel: süren basınç",
        level: 2,
        pattern: [2, 2, 0],
      },
    ]);
    expect(
      skin016State("vibration", "steady", "eccrine").responses[0].level,
    ).toBe(3);
    expect(
      skin016State("pressure", "offset", "apocrine").responses.map(
        (r) => r.level,
      ),
    ).toEqual([2, 0]);
    expect(skin016State("touch", "onset", "eccrine").outlet).toBe(
      "Deri yüzeyindeki por",
    );
    expect(skin016State("touch", "onset", "apocrine").outlet).toContain(
      "folikülü",
    );
  });
  it("koku erişimi kapalıyken temel tadı silmez, seçili hücreyi tüm dille karıştırmaz", () => {
    const blocked = smellTaste016State(false, "salty", "salty", "smell");
    expect(blocked.aromaPresent).toBe(false);
    expect(blocked.basicTastePresent).toBe(true);
    expect(blocked.selectedTasteActive).toBe(true);
    expect(blocked.signalPresent).toBe(false);
    expect(
      smellTaste016State(false, "salty", "salty", "taste").signalPresent,
    ).toBe(true);
    const different = smellTaste016State(true, "salty", "sweet", "taste");
    expect(different.selectedTasteActive).toBe(false);
    expect(different.basicTastePresent).toBe(true);
    expect(blocked.firstThalamus).toBe(false);
    expect(
      smellTaste016State(true, "sweet", "sweet", "taste").firstThalamus,
    ).toBe(true);
  });
  it("eşdeğer gözde odağı, ekseni ve düzeltme işaretini bağımsız hesaplar", () => {
    for (const distance of ["near", "far"] as const)
      for (const light of ["bright", "dim"] as const) {
        expect(
          eye016State(distance, light, "normal", false).imageDistance,
        ).toBeCloseTo(24, 10);
        const myopia = eye016State(distance, light, "myopia", false);
        expect(myopia.retinalDistance).toBe(27);
        expect(myopia.focus).toBe("front");
        const hyper = eye016State(distance, light, "hyperopia", false);
        expect(hyper.retinalDistance).toBe(21);
        expect(hyper.focus).toBe("behind");
        const correctedMyopia = eye016State(distance, light, "myopia", true);
        expect(correctedMyopia.imageDistance).toBeCloseTo(27, 10);
        expect(correctedMyopia.correctionDioptres).toBeCloseTo(-125 / 27, 10);
        expect(correctedMyopia.focus).toBe("retina");
        const correctedHyper = eye016State(distance, light, "hyperopia", true);
        expect(correctedHyper.imageDistance).toBeCloseTo(21, 10);
        expect(correctedHyper.correctionDioptres).toBeCloseTo(125 / 21, 10);
      }
  });
  it("aydınlığı uyum gücüyle aynı kontrol yapmaz", () => {
    const a = eye016State("near", "bright", "normal", false),
      b = eye016State("near", "dim", "normal", false);
    expect(a.focalLength).toBe(b.focalLength);
    expect(b.pupilRadius).toBe(2 * a.pupilRadius);
    expect(a.ciliaryContracted).toBe(true);
    expect(a.zonuleTaut).toBe(false);
    expect(eye016State("far", "bright", "normal", false).zonuleTaut).toBe(true);
  });
  it("işitme aşamasının fiziksel sinyal türünü değiştirir", () => {
    expect(hearing016Stages).toHaveLength(8);
    for (let i = 0; i < 8; i++) {
      const s = ear016State(i, "start", 60);
      expect(s.stageName).toBe(hearing016Stages[i]);
      expect(s.signal).toBe(
        i < 5
          ? "Mekanik titreşim"
          : i === 5
            ? "Dereceli hücre yanıtı ve iletici salımı"
            : "Sinirde aksiyon potansiyelleri",
      );
    }
  });
  it("basınç aktarımını alanla hesaplar, kuvveti üretmez", () => {
    for (const area of [30, 45, 60, 90]) {
      const s = ear016State(2, "steady", area);
      expect(s.pressureRatio).toBe(area / 3);
      expect(s.inputPressure * area).toBeCloseTo(1, 12);
      expect(s.outputPressure * s.ovalArea).toBe(1);
      expect(s.outputForce).toBe(1);
    }
  });
  it("başlangıç, sabit, durma ve otolit evrelerini ayırır", () => {
    expect(ear016State(0, "start", 60).cupulaDirection).toBe(-1);
    expect(ear016State(0, "steady", 60).cupulaDirection).toBe(0);
    expect(ear016State(0, "stop", 60).cupulaDirection).toBe(1);
    for (const motion of ["linear", "tilt"] as const) {
      const s = ear016State(0, motion, 60);
      expect(s.cupulaDirection).toBe(0);
      expect(Math.abs(s.otolithShift)).toBe(1);
      expect(s.rotation).toBe(false);
    }
  });
  it("kapalı plakta boyu artırmaz, kalınlık yapımını ayrı tutar", () => {
    for (let step = 0; step <= 4; step++) {
      const young = bone016State("growing", "length", step, "compact"),
        adult = bone016State("adult", "length", step, "spongy"),
        wide = bone016State("adult", "width", step, "marrow");
      expect(young.length).toBe(220 + 12 * step);
      expect(young.width).toBe(56);
      expect(young.top + young.length).toBe(350);
      expect(adult.length).toBe(220);
      expect(adult.lengthChanged).toBe(false);
      expect(wide.length).toBe(220);
      expect(wide.width).toBe(56 + 6 * step);
      expect(wide.widthChanged).toBe(step > 0);
    }
  });
  it("eklem tutunma noktalarını alt kemikle rijit döndürür", () => {
    const pivot = { x: 220, y: 200 };
    for (const angle of [0, 15, 30, 45, 60]) {
      const s = joint016State(angle, "ligament");
      expect(s.ligamentA).toEqual({ x: 202, y: 140 });
      expect(
        Math.hypot(s.ligamentB.x - pivot.x, s.ligamentB.y - pivot.y),
      ).toBeCloseTo(Math.hypot(-18, 70), 10);
      expect(
        Math.hypot(s.tendonEnd.x - pivot.x, s.tendonEnd.y - pivot.y),
      ).toBeCloseTo(Math.hypot(18, 85), 10);
      expect(
        Math.hypot(s.lowerTip.x - pivot.x, s.lowerTip.y - pivot.y),
      ).toBeCloseTo(150, 10);
      expect(s.tendonStart).toEqual({ x: 310, y: 104 });
    }
    const right = joint016State(30, "surface");
    expect(right.lowerTip.x).toBeCloseTo(295, 10);
    expect(right.lowerTip.y).toBeCloseTo(200 + 75 * Math.sqrt(3), 10);
  });
  it("aynı eklemde hiyalin yüz ve fibröz menisküsü ayırır", () => {
    expect(joint016State(0, "surface").cartilage).toBe("hiyalin");
    expect(joint016State(60, "meniscus").cartilage).toBe("fibröz");
    expect(joint016State(40, "ligament").cartilage).toBeNull();
  });
  it("geçersiz ve kalıtılmış nesne anahtarlarını reddeder", () => {
    expect(() => skin016State("sun" as never, "onset", "eccrine")).toThrow(
      RangeError,
    );
    expect(() =>
      smellTaste016State(true, "toString" as never, "sweet", "taste"),
    ).toThrow(RangeError);
    expect(() => eye016State("near", "bright", "none" as never, false)).toThrow(
      RangeError,
    );
    for (const n of [NaN, Infinity, -1, 61])
      expect(() => joint016State(n, "surface")).toThrow(RangeError);
    for (const n of [0.5, -1, 5, NaN])
      expect(() => bone016State("adult", "length", n, "compact")).toThrow(
        RangeError,
      );
    for (const n of [29, 91, NaN, Infinity])
      expect(() => ear016State(0, "start", n)).toThrow(RangeError);
  });
});
