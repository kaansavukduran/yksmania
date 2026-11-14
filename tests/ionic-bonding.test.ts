import { expect, it } from "vitest";
import { balanceCharges } from "../src/learning/IonicWorkshop";
import { ionicLessons, ionicGuides } from "../src/learning/ionicBonding";
it("balances every allowed charge pair to a neutral minimal ratio", () => {
  for (let p = 1; p <= 4; p++)
    for (let n = 1; n <= 4; n++) {
      const r = balanceCharges(p, n);
      expect(r.cations * p - r.anions * n).toBe(0);
      for (let c = 1; c < r.cations; c++) expect((c * p) % n === 0).toBe(false);
    }
  expect(balanceCharges(3, 2)).toEqual({ cations: 2, anions: 3 });
  expect(balanceCharges(2, 2)).toEqual({ cations: 1, anions: 1 });
  for (const p of [0, -1, NaN, Infinity, 1.5])
    expect(() => balanceCharges(p, 1)).toThrow();
});
it("preserves scientific distinctions and stepwise solutions in actual authored answers", () => {
  const answers = ionicLessons.map((l) =>
    l.questions.map((q) => q.options[q.answer].tr),
  );
  expect(answers[0][2]).toBe("Al₂O₃");
  expect(answers[0][5]).toBe("CaO");
  expect(answers[1][1]).toBe("Demir(III) oksit");
  expect(answers[1][6]).toBe("Demir(II) fosfat");
  expect(answers[1][4]).toBe("8");
  for (const g of ionicGuides) {
    expect(g.sections).toHaveLength(8);
    expect(g.examples).toHaveLength(4);
    expect(g.examples.every((e) => e.steps.length >= 3)).toBe(true);
  }
});
