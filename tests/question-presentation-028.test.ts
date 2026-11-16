import { expect, it } from "vitest";
import { lessons } from "../src/domain/content";
import type { Question } from "../src/domain/model";

import {
  clarifiedQuestionView,
  localizedQuestionView,
  questionPresentationRevisions,
} from "../src/domain/questionPresentation";
import { questionIdentity } from "../src/domain/questionHelpModel";

const ids = [
  "snd-10",
  "periodic-4",
  "eq-2",
  "eq-5",
  "iyonik-bilesik-adlandirma-q2",
  "f013-foundation-katman-elektron-dizilimi-3",
  "f013-foundation-katman-elektron-dizilimi-7",
];
const bank = new Map(lessons.flatMap((l) => l.questions).map((q) => [q.id, q]));
const flat = (q: Question) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
});
const freeze = <T>(v: T): T => {
  if (v && typeof v === "object") {
    Object.freeze(v);
    for (const x of Object.values(v)) freeze(x);
  }
  return v;
};

it("clarifies the derived stem while retaining the selected answer meaning and all five option positions", () => {
  const raw = bank.get("snd-10")!,
    shown = localizedQuestionView(raw);
  expect(shown.options).toHaveLength(5);
  expect(shown.answer).toBe(1);
  expect(shown.options[1].tr).toBe(
    "Başla- tabanının a’sı korunur; -yor önündeki daralma bu gelecek zaman biçimine genellenmez.",
  );
  for (const i of [0, 2, 3, 4]) expect(shown.options[i]).toBe(raw.options[i]);
  expect({ ...shown, options: raw.options }).toEqual(raw);
  expect("baş" + "la" + "y" + "acak").toBe("başlayacak");
  expect(shown.options[1].tr).not.toContain("kökünün");
});

it("distinguishes occupied shells from full shells without changing the original period question or grade", () => {
  const raw = bank.get("periodic-4")!,
    shown = localizedQuestionView(raw);
  expect(shown.prompt).toBe(raw.prompt);
  expect(shown.options).toBe(raw.options);
  expect(shown.answer).toBe(1);
  expect(shown.hint.tr).toContain("elektron içeren katmanları say");
  expect(shown.explanation.tr).toContain("tam dolu olması gerekmez");
  expect(shown.explanation.tr).toContain("son katmanda 3 elektron");
  expect({ ...shown, hint: raw.hint, explanation: raw.explanation }).toEqual(
    raw,
  );
  const electrons = [2, 8, 3];
  expect(electrons.reduce((a, b) => a + b, 0)).toBe(13);
  expect(electrons.filter((n) => n > 0)).toHaveLength(3);
  expect(electrons.filter((n, i) => n === 2 * (i + 1) ** 2)).toHaveLength(2);
});

it("makes the homogeneous gas concentration and requested Stock naming conventions explicit", () => {
  for (const id of ["eq-2", "eq-5"]) {
    const raw = bank.get(id)!,
      shown = localizedQuestionView(raw);
    expect(shown.prompt.tr).toContain(
      "ideal gazların A(g) ⇌ B(g) homojen denge",
    );
    expect(shown.prompt.tr).toContain("Sabit sıcaklıkta");
    expect({ ...shown, prompt: raw.prompt }).toEqual(raw);
  }
  expect(2 / 1).toBe(2);
  const possible = Array.from({ length: 7 }, (_, a) => ({
    a,
    b: 6 - a,
  })).filter(({ a, b }) => a > 0 && b / a === 2);
  expect(possible).toEqual([{ a: 2, b: 4 }]);
  const raw = bank.get("iyonik-bilesik-adlandirma-q2")!,
    shown = localizedQuestionView(raw);
  expect(shown.prompt.tr).toContain(
    "Stock (Roma rakamlı) iyonik adlandırmaya göre",
  );
  expect(shown.options[shown.answer].tr).toBe("Demir(III) oksit");
  expect(shown.options.map((o) => o.tr)).toContain("Didemir trioksit");
  expect({ ...shown, prompt: raw.prompt }).toEqual(raw);
  expect(-(3 * -2) / 2).toBe(3);
});

it("projects only exact original identities, preserves caller metadata, and never mutates source arrays or personal hints", () => {
  expect(new Set(questionPresentationRevisions.map((r) => r.id)).size).toBe(
    questionPresentationRevisions.length,
  );
  for (const id of ids) {
    const source = bank.get(id)!,
      raw = freeze({ ...flat(source), callerNote: "Kişisel ÇĞİÖŞÜ + −" }),
      before = structuredClone(raw);
    const shown = clarifiedQuestionView(raw);
    expect(shown).not.toBe(raw);
    expect(raw).toEqual(before);
    expect(shown.id).toBe(raw.id);
    expect(shown.answer).toBe(raw.answer);
    expect(shown.callerNote).toBe(raw.callerNote);
    expect(clarifiedQuestionView(shown)).toBe(shown);
    for (const changed of [
      { ...raw, id: raw.id + "-custom" },
      { ...raw, prompt: raw.prompt + " Yeni koşul." },
      { ...raw, passage: "Başka bir bağlam" },
      {
        ...raw,
        options: raw.options.map((x, i) => (i === 0 ? x + " farklı" : x)),
      },
      { ...raw, answer: (raw.answer + 1) % raw.options.length },
      { ...raw, explanation: raw.explanation + " Ek çözüm." },
    ])
      expect(clarifiedQuestionView(changed)).toBe(changed);
    const personal = { ...raw, hint: "Benim özgün ipucum" };
    expect(clarifiedQuestionView(personal).hint).toBe(personal.hint);
    const { hint: _hint, ...withoutHint } = raw;
    expect(Object.hasOwn(clarifiedQuestionView(withoutHint), "hint")).toBe(
      false,
    );
    const revision = questionPresentationRevisions.find((r) => r.id === id)!;
    expect(questionIdentity(revision.before)).toBe(questionIdentity(raw));
  }
});

it("keeps ionic occupied shells distinct from neutral period and makes the isoelectronic configuration conditional", () => {
  const raw3 = bank.get("f013-foundation-katman-elektron-dizilimi-3")!,
    raw7 = bank.get("f013-foundation-katman-elektron-dizilimi-7")!;
  const a = localizedQuestionView(raw3),
    b = localizedQuestionView(raw7);
  expect(a.explanation.tr).toContain("İyonun elektron içeren üç katmanı");
  expect(a.explanation.tr).not.toContain("üç dolu katmanı");
  expect(b.explanation.tr).toContain("Temel hâlde ele alınırlarsa");
  expect(b.explanation.tr).toContain("Kökte temel hâl verildiği varsayılmaz");
  expect({ ...a, explanation: raw3.explanation }).toEqual(raw3);
  expect({ ...b, explanation: raw7.explanation }).toEqual(raw7);
  expect([10, 11 - 1, 12 - 2]).toEqual([10, 10, 10]);
  expect([2, 8, 8, 2].reduce((s, n) => s + n, 0)).toBe(20);
  expect([2, 8, 8].reduce((s, n) => s + n, 0) + 2).toBe(20);
});
