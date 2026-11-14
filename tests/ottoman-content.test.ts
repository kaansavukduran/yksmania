import { expect, it } from "vitest";
import {
  ottomanNarratives,
  ottomanQuestions,
} from "../src/learning/narratives/ottoman";
import { ottomanEvidence } from "../src/learning/OttomanWorkshop";
it("keeps the chronological source headings separate while exposing native deep explanations and independent original sets", () => {
  expect(ottomanNarratives.map((pack) => pack.topicId)).toEqual([
    "detail-233",
    "detail-234",
    "detail-235",
  ]);
  const ids = new Set<string>();
  for (const pack of ottomanNarratives) {
    expect(pack.body.length).toBeGreaterThanOrEqual(12);
    expect(pack.cases.length).toBeGreaterThanOrEqual(4);
    expect(pack.recall).toHaveLength(2);
    expect(pack.source).toContain("PDF");
    const questions = ottomanQuestions[pack.id];
    expect(questions).toHaveLength(5);
    for (const question of questions) {
      expect(ids.has(question.id)).toBe(false);
      ids.add(question.id);
      expect(question.options).toHaveLength(5);
      expect(question.answer).toBeGreaterThanOrEqual(0);
      expect(question.answer).toBeLessThan(5);
      expect(new Set(question.options.map((option) => option.tr)).size).toBe(5);
      expect(question.explanation.tr.length).toBeGreaterThan(100);
    }
  }
  expect(ids.size).toBe(15);
});
it("preserves the two easy-to-confuse military evidence distinctions and political chronology", () => {
  const military = ottomanEvidence["osmanli-askeri-teskilat"];
  const ulufeliAtli = military.tasks.find((task) =>
    task.evidence.includes("Profil: atlı; merkezî"),
  )!;
  expect(military.choices[ulufeliAtli.answer]).toBe("Kapıkulu süvarisi");
  const dirlik = military.tasks.find((task) =>
    task.evidence.includes("cebelü yetiştiriyor"),
  )!;
  expect(military.choices[dirlik.answer]).toBe("Tımarlı sipahi");
  const chronology = ottomanQuestions["osmanli-kurulus-siyaseti"].find(
    (question) => question.id === "otp-4",
  )!;
  expect(chronology.options[chronology.answer].tr).toBe(
    "Niğbolu – Ankara Savaşı – Fetret’in sonu",
  );
  const property = ottomanQuestions["osmanli-askeri-teskilat"].find(
    (question) => question.id === "otm-3",
  )!;
  expect(property.options[property.answer].tr).toContain(
    "özel mülk olarak satabilir",
  );
});
it("keeps evidence feedback bounded and differentiates teaching from scored exam evidence", () => {
  for (const data of Object.values(ottomanEvidence)) {
    for (const task of data.tasks) {
      expect(task.answer).toBeLessThan(data.choices.length);
      expect(task.chain).toHaveLength(3);
      expect(task.limit.trim()).not.toBe("");
    }
  }
  const roles = ottomanEvidence["osmanli-medeniyeti"];
  expect(roles.choices[roles.tasks[0].answer]).toBe("Müderris");
  expect(roles.choices[roles.tasks[1].answer]).toBe("Kadı");
  expect(roles.choices[roles.tasks[2].answer]).toBe("Müftü");
});
