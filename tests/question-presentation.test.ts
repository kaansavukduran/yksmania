import { expect, it } from "vitest";
import { lessons } from "../src/domain/content";
import {
  clarifiedQuestionView,
  localizedQuestionView,
} from "../src/domain/questionPresentation";
import type { Question } from "../src/domain/model";
const raw = (id: string) =>
  lessons.flatMap((l) => l.questions).find((q) => q.id === id)!;
const flat = (q: Question) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
});

it("states the one-dimensional direction conditions needed to derive distance from the two net areas", () => {
  const original = raw("ns-motion-4"),
    before = structuredClone(original),
    shown = localizedQuestionView(original);
  expect(shown.prompt.tr).toContain("Doğrusal hareket");
  expect(shown.prompt.tr).toContain(
    "ilk bölümü boyunca hızı sıfır veya pozitif",
  );
  expect(shown.prompt.tr).toContain(
    "ikinci bölümü boyunca sıfır veya negatiftir",
  );
  expect({ ...shown, prompt: original.prompt }).toEqual(original);
  expect(original).toEqual(before);
  expect(shown.id).toBe("ns-motion-4");
  expect(shown.answer).toBe(1);
  expect(shown.options[1].tr).toBe("+7 m ve 17 m");
  const first = [[12], [20, -8]],
    second = [-5];
  const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
  expect(first.map((a) => sum(a))).toEqual([12, 12]);
  expect(first.map((a) => sum(a) + sum(second))).toEqual([7, 7]);
  expect(
    first.map((a) => sum(a.map(Math.abs)) + sum(second.map(Math.abs))),
  ).toEqual([17, 33]);
  expect(
    first.map((a) => a.every((v) => v >= 0) && second.every((v) => v <= 0)),
  ).toEqual([true, false]);
});

it("specifies initial mechanical energy and its two components instead of silently assuming zero initial internal energy", () => {
  const original = raw("ns-energy-4"),
    shown = localizedQuestionView(original);
  expect(shown.prompt.tr).toContain("Başlangıçta mekanik enerjisi 200 J");
  expect(shown.prompt.tr).toContain(
    "yalnız kinetik enerji ile yerçekimi potansiyel enerjisinin toplamıdır",
  );
  expect(shown.prompt.tr).toContain(
    "Mekanik enerjinin 40 J kadarı iç enerjiye aktarılır",
  );
  expect(shown.prompt.tr).toContain("başka bir aktarım yoktur");
  expect({ ...shown, prompt: original.prompt }).toEqual(original);
  expect(shown.answer).toBe(2);
  expect(shown.options[2].tr).toBe("100 J");
  // Both histories satisfy the old total-system-energy wording.
  const possibilities = [0, 20].map((initialInternal) => ({
    finalInternal: initialInternal + 40,
    finalPotential: 60,
    finalKinetic: 200 - initialInternal - 40 - 60,
  }));
  expect(
    possibilities.map(
      (s) => s.finalInternal + s.finalPotential + s.finalKinetic,
    ),
  ).toEqual([200, 200]);
  expect(possibilities.map((s) => s.finalKinetic)).toEqual([100, 80]);
  // Initial mechanical energy makes the result independent of initial internal energy.
  expect([0, 20, 75].map(() => 200 - 40 - 60)).toEqual([100, 100, 100]);
});

it("only revises the complete known original identity and retains every other field and original reference", () => {
  for (const id of ["ns-motion-4", "ns-energy-4"]) {
    const original = flat(raw(id)),
      frozen = structuredClone(original);
    const shown = clarifiedQuestionView(original);
    expect(shown).not.toBe(original);
    expect(shown.options).toBe(original.options);
    expect({ ...shown, prompt: original.prompt }).toEqual(original);
    expect(original).toEqual(frozen);
    expect(clarifiedQuestionView(shown)).toBe(shown);
    for (const changed of [
      { ...original, id: id + "-custom" },
      { ...original, prompt: original.prompt + " Yeni koşul." },
      { ...original, passage: "Başka bir hareket" },
      { ...original, options: [...original.options].reverse() },
      { ...original, answer: (original.answer + 1) % 5 },
      { ...original, explanation: "Özgün farklı çözüm" },
    ])
      expect(clarifiedQuestionView(changed)).toBe(changed);
    const personal = {
      ...original,
      hint: "Kendi notum: ÇĞİÖŞÜ  +  −",
      extraNote: "kişisel",
    };
    expect(clarifiedQuestionView(personal).hint).toBe(personal.hint);
    expect(clarifiedQuestionView(personal).extraNote).toBe(personal.extraNote);
  }
  const ordinary = raw("ns-motion-1");
  expect(localizedQuestionView(ordinary)).toBe(ordinary);
});
