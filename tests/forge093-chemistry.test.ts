import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  covalentPairs,
  covalentPairResult,
  forge093ChemistryGuides,
  forge093ChemistryLessons,
  forge093ChemistryTopics,
  polarityMolecules,
  rotateChemistryVector,
  sumBondVectors,
  type DipoleVector,
} from "../src/learning/forge093Chemistry";

const molecule = (id: string) => polarityMolecules.find((m) => m.id === id)!;
const dot = (a: DipoleVector, b: DipoleVector) =>
  a.reduce((sum, v, i) => sum + v * b[i], 0);

describe("kovalent bağın iki farklı sayımı", () => {
  it("counts shared pairs separately from total electrons for every drawn bond", () => {
    const expected = [
      [2, 2, 0, 0],
      [8, 2, 6, 0.96],
      [8, 2, 6, 1.78],
      [12, 4, 8, 0],
      [10, 6, 4, 0],
    ];
    covalentPairs.forEach((pair, i) => {
      const r = covalentPairResult(pair);
      expect([r.total, r.shared, r.nonbonding]).toEqual(
        expected[i].slice(0, 3),
      );
      expect(r.difference).toBeCloseTo(expected[i][3], 10);
      expect(r.polar).toBe(i === 1 || i === 2);
    });
  });

  it("uses original self-contained five-option questions with independent keyed counts", () => {
    const questions = forge093ChemistryLessons[0].questions;
    expect(questions[2].options[questions[2].answer].tr).toBe("6");
    expect(questions[3].options[questions[3].answer].tr).toBe("8");
    expect(questions[6].options[questions[6].answer].tr).toBe("5 ve 0");
    expect(questions[9].options[questions[9].answer].tr).toBe("8 ve 2");
    expect(436 + 158 - 2 * 568).toBe(-542);
    expect(forge093ChemistryGuides[0].examples[4].answer).toContain("−542");
    expect(questions[4].options[questions[4].answer].tr).toContain(
      "molekül toplamda nötr",
    );
  });
});

describe("molekülün üç boyutlu yön toplamı", () => {
  it("keeps polar bonds and molecular polarity separate in all nine models", () => {
    const nonpolar = new Set(["co2", "bf3", "ch4", "ccl4"]);
    for (const model of polarityMolecules) {
      const result = sumBondVectors(model.directions, model.weights);
      expect(result.polar, model.id).toBe(!nonpolar.has(model.id));
      expect(
        model.weights.every((weight) => weight !== 0),
        model.id,
      ).toBe(true);
      for (const direction of model.directions)
        expect(Math.hypot(...direction), model.id).toBeCloseTo(1, 12);
    }
  });

  it("represents actual geometry rather than interpreting a flat Lewis drawing as 180 degrees", () => {
    const water = molecule("h2o"),
      ammonia = molecule("nh3"),
      tetra = molecule("ch4");
    expect(
      (Math.acos(dot(water.directions[0], water.directions[1])) * 180) /
        Math.PI,
    ).toBeCloseTo(104.5, 10);
    for (let a = 0; a < ammonia.directions.length; a++)
      for (let b = a + 1; b < ammonia.directions.length; b++)
        expect(
          (Math.acos(dot(ammonia.directions[a], ammonia.directions[b])) * 180) /
            Math.PI,
        ).toBeCloseTo(107, 10);
    for (let a = 0; a < tetra.directions.length; a++)
      for (let b = a + 1; b < tetra.directions.length; b++)
        expect(dot(tetra.directions[a], tetra.directions[b])).toBeCloseTo(
          -1 / 3,
          12,
        );
  });

  it("calculates the nonzero bend and asymmetric tetrahedral sums without invented debye measurements", () => {
    const water = molecule("h2o"),
      chloromethane = molecule("ch3cl"),
      dichloromethane = molecule("ch2cl2");
    expect(
      sumBondVectors(water.directions, water.weights).magnitude,
    ).toBeCloseTo(2 * Math.cos(((104.5 / 2) * Math.PI) / 180), 12);
    expect(
      sumBondVectors(chloromethane.directions, chloromethane.weights).magnitude,
    ).toBeCloseTo(1.2, 12);
    expect(
      sumBondVectors(dichloromethane.directions, dichloromethane.weights)
        .magnitude,
    ).toBeCloseTo(1.2 * Math.sqrt(4 / 3), 12);
    const linear = molecule("hcn");
    expect(
      sumBondVectors(linear.directions, linear.weights).vector[0],
    ).toBeCloseTo(1.2, 12);
  });

  it("preserves full three-dimensional polarity when rotating the view including edge-on projections", () => {
    for (const model of polarityMolecules) {
      const initial = sumBondVectors(model.directions, model.weights);
      for (const angle of [-70, 0, 25, 90, 180, 360]) {
        const rotated = sumBondVectors(
          model.directions.map((v) => rotateChemistryVector(v, angle)),
          model.weights,
        );
        expect(rotated.magnitude, `${model.id}/${angle}`).toBeCloseTo(
          initial.magnitude,
          11,
        );
        expect(rotated.polar, `${model.id}/${angle}`).toBe(initial.polar);
      }
    }
    expect(() => sumBondVectors([[1, 0, 0]], [])).toThrow("DIPOLE_VECTOR_DATA");
    expect(() => sumBondVectors([[NaN, 0, 0]], [1])).toThrow(
      "DIPOLE_VECTOR_DATA",
    );
    expect(() => rotateChemistryVector([1, 0, 0], Infinity)).toThrow(
      "DIPOLE_ROTATION_DATA",
    );
  });

  it("keys numeric vector problems from the complete supplied stem", () => {
    const questions = forge093ChemistryLessons[1].questions;
    expect(questions[4].options[questions[4].answer].tr).toBe("Sağa 3 birim");
    expect(questions[5].options[questions[5].answer].tr).toBe("Yukarı 1 birim");
    expect(questions[8].options[questions[8].answer].tr).toContain(
      "geometri bilgisi de gerekir",
    );
    expect(questions[9].options[questions[9].answer].tr).toContain(
      "London etkileşimi bulunabilir",
    );
  });
});

it("publishes two detailed original guides and 20 complete questions only for their exact source headings", () => {
  expect(forge093ChemistryTopics).toEqual({
    "kovalent-bag-polar-apolar": "detail-155",
    "molekullerde-polarlik-apolarlik": "detail-156",
  });
  expect(forge093ChemistryLessons).toHaveLength(2);
  for (const [i, lesson] of forge093ChemistryLessons.entries()) {
    const guide = forge093ChemistryGuides[i];
    expect(lesson.id).toBe(guide.id);
    expect(lesson.subjectId).toBe("tyt-kimya");
    expect(guide.sections.length).toBeGreaterThanOrEqual(8);
    expect(
      guide.sections.every(
        (s) =>
          s.paragraphs.length >= 2 && s.paragraphs.every((p) => p.length > 180),
      ),
    ).toBe(true);
    expect(guide.examples.length).toBeGreaterThanOrEqual(4);
    expect(
      guide.examples.every(
        (e) =>
          e.steps.length >= 3 && e.check.length > 20 && e.pitfall.length > 20,
      ),
    ).toBe(true);
    expect(guide.recall.length).toBeGreaterThanOrEqual(4);
    expect(lesson.questions).toHaveLength(10);
    for (const q of lesson.questions) {
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(questionContentIssues(q), q.id).toEqual([]);
      expect(q.hint.tr.length).toBeGreaterThan(20);
      expect(q.explanation.tr.length).toBeGreaterThan(120);
    }
    expect(new Set(lesson.questions.map((q) => q.answer)).size).toBe(5);
  }
  const ids = forge093ChemistryLessons.flatMap((l) =>
    l.questions.map((q) => q.id),
  );
  expect(new Set(ids).size).toBe(20);
});
