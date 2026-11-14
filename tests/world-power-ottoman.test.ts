import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  worldPowerOttomanGuide,
  worldPowerOttomanLesson,
  worldPowerTurningPoints,
} from "../src/learning/worldPowerOttoman";

describe("Dünya Gücü Osmanlı: tarihsel kapsam ve bağımsız sorular", () => {
  it("aynı savaşı veya antlaşmayı farklı rakiple eşleştirmez", () => {
    const caldiran = worldPowerTurningPoints.find(
      (point) => point.year === 1514,
    )!;
    const ridaniye = worldPowerTurningPoints.find(
      (point) => point.year === 1517,
    )!;
    const amasya = worldPowerTurningPoints.find(
      (point) => point.year === 1555,
    )!;
    expect(caldiran.actor).toContain("Safevi");
    expect(caldiran.limit).toContain("sona ermedi");
    expect(ridaniye.actor).toContain("Memlûk");
    expect(ridaniye.outcome).toContain("Memlûk Devleti sona erdi");
    expect(amasya.actor).toContain("Safevi");
    expect(amasya.choices[amasya.answer]).toContain(
      "rekabet bütünüyle sona ermemiştir",
    );
  });

  it("kuşatma, zafer ve yenilgiyi; üstünlük ve rakipsizlikten ayırır", () => {
    const vienna = worldPowerTurningPoints.find(
      (point) => point.year === 1529,
    )!;
    const preveza = worldPowerTurningPoints.find(
      (point) => point.year === 1538,
    )!;
    const lepanto = worldPowerTurningPoints.find(
      (point) => point.year === 1571,
    )!;
    expect(vienna.outcome).toContain("alınamadı");
    expect(preveza.outcome).toContain("zafer");
    expect(preveza.limit).toContain("rakipsiz egemenlik");
    expect(lepanto.outcome).toContain("yenilgi");
    expect(lepanto.choices[lepanto.answer]).toContain("yeniden kurulması");
    expect(worldPowerTurningPoints.map((point) => point.year)).toEqual(
      worldPowerTurningPoints.map((point) => point.year).sort((a, b) => a - b),
    );
    expect(
      new Set(worldPowerTurningPoints.map((point) => point.label)).size,
    ).toBe(worldPowerTurningPoints.length);
  });

  it("metne dayalı yorumları kendi kartında sunar ve tek doğru seçenek taşır", () => {
    const questions = worldPowerOttomanLesson.questions;
    expect(questions).toHaveLength(10);
    expect(new Set(questions.map((question) => question.id)).size).toBe(10);
    for (const question of questions) {
      expect(questionContentIssues(question), question.id).toEqual([]);
      expect(question.options).toHaveLength(5);
      expect(new Set(question.options.map((option) => option.tr)).size).toBe(5);
      expect(question.answer).toBeGreaterThanOrEqual(0);
      expect(question.answer).toBeLessThan(5);
    }
    for (const id of ["dgo-1", "dgo-4", "dgo-6", "dgo-7", "dgo-9"]) {
      expect(
        questions.find((question) => question.id === id)?.passage?.tr,
      ).toBeTruthy();
    }
    expect(worldPowerOttomanLesson.source.tr).toContain("özgündür");
    expect(worldPowerOttomanLesson.tags).toContain("detail-236");
  });

  it("kanıt keşfindeki her göreve açık gerekçe ve sınırlı iddia verir", () => {
    for (const point of worldPowerTurningPoints) {
      expect(point.answer).toBeGreaterThanOrEqual(0);
      expect(point.answer).toBeLessThan(point.choices.length);
      expect(point.evidence.trim()).not.toBe("");
      expect(point.explanation.trim()).not.toBe("");
      expect(point.limit.trim()).not.toBe("");
    }
    expect(worldPowerOttomanGuide.id).toBe(worldPowerOttomanLesson.id);
    expect(
      worldPowerOttomanGuide.sections.every(
        (section) => section.paragraphs.length >= 2,
      ),
    ).toBe(true);
    expect(
      worldPowerOttomanGuide.examples.every(
        (example) =>
          example.steps.length >= 3 && example.check && example.pitfall,
      ),
    ).toBe(true);
    expect(worldPowerOttomanGuide.recall).toHaveLength(5);
  });
});
