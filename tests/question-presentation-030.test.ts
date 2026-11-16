import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { lessons } from "../src/domain/content";
import {
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import {
  clarifiedQuestionView,
  localizedQuestionView,
  questionPresentationRevisions,
} from "../src/domain/questionPresentation";
import { QuestionHelp } from "../src/components/QuestionHelp";
import expected from "./fixtures/question-presentation-030.json";

const sha = (x: string) => createHash("sha256").update(x).digest("hex");
const all = lessons.flatMap((l) => l.questions);
const original = (id: string) => all.find((q) => q.id === id)!;
const plain = (id: string): HelpQuestion => {
  const q = original(id);
  return {
    id: q.id,
    prompt: q.prompt.tr,
    passage: q.passage?.tr,
    options: q.options.map((o) => o.tr),
    answer: q.answer,
    hint: q.hint.tr,
    explanation: q.explanation.tr,
  };
};
const freeze = <T>(x: T): T => {
  if (x && typeof x === "object") {
    Object.values(x).forEach(freeze);
    Object.freeze(x);
  }
  return x;
};
const unescape = (s: string) =>
  s
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
describe("030 self-contained scientific question conditions", () => {
  it("appends exactly seven prompt-only views and reverses to the accepted029 helper byte for byte", () => {
    expect(questionPresentationRevisions).toHaveLength(19);
    expect(questionPresentationRevisions.slice(12)).toEqual(expected);
    const text = readFileSync(
      new URL("../src/domain/questionPresentation.ts", import.meta.url),
      "utf8",
    );
    const start = text.indexOf('  {\n    id: "f011-viruses-3",');
    const end = text.indexOf("];\nconst revisions", start);
    expect(start).toBeGreaterThan(0);
    expect(end).toBeGreaterThan(start);
    expect(sha(text.slice(0, start) + text.slice(end))).toBe(
      "7de5897fc957fb1915f2c044e85d8319ccab7ed1242497a6284d77ebc0b193ba",
    );
    for (const row of expected) {
      expect(Object.keys(row).sort()).toEqual([
        "before",
        "id",
        "prompt",
        "revision",
      ]);
      expect(questionIdentity(plain(row.id))).toBe(
        questionIdentity(row.before),
      );
    }
  });
  it("preserves raw questions, ordered options, keys, explanations, metadata and personal hints", () => {
    for (const row of expected) {
      const raw = freeze(structuredClone(original(row.id))),
        snapshot = structuredClone(raw);
      const shown = localizedQuestionView(raw);
      expect(shown.prompt.tr).toBe(row.prompt);
      expect(shown.options).toBe(raw.options);
      expect(shown.answer).toBe(raw.answer);
      expect(shown.hint).toBe(raw.hint);
      expect(shown.explanation).toBe(raw.explanation);
      expect(raw).toEqual(snapshot);
      expect(localizedQuestionView(shown)).toBe(shown);
      const historical = {
        ...plain(row.id),
        hint: "Kendi eski ipucum",
        annotation: { text: "Kişisel not" },
      };
      const view = clarifiedQuestionView(historical);
      expect(view.hint).toBe(historical.hint);
      expect(view.annotation).toBe(historical.annotation);
    }
  });
  it("rejects every changed identity field and remains stable for an already clarified card", () => {
    let guarded = 0;
    for (const row of expected) {
      const q = plain(row.id);
      const mutations = [
        { ...q, id: q.id + "-other" },
        { ...q, prompt: q.prompt + " Başka koşul." },
        { ...q, passage: "Başka metin" },
        { ...q, options: [q.options[1], q.options[0], ...q.options.slice(2)] },
        { ...q, answer: (q.answer + 1) % 5 },
        { ...q, explanation: q.explanation + " Başka açıklama." },
      ];
      for (const mutation of mutations) {
        const raw = freeze(mutation);
        expect(clarifiedQuestionView(raw)).toBe(raw);
        guarded++;
      }
      const view = clarifiedQuestionView(q);
      expect(clarifiedQuestionView(view)).toBe(view);
    }
    expect(guarded).toBe(42);
  });
  it("confirms each visible condition addresses a real alternative model", () => {
    // Assembly can use old capsid stock even when new protein synthesis stops.
    const assemble = (genomes: number, availableCapsids: number) =>
      Math.min(genomes, availableCapsids);
    expect(assemble(10, 0)).toBe(0);
    expect(assemble(10, 3)).toBe(3);
    expect(expected[0].prompt).toContain(
      "Başlangıçta kullanılabilir kapsid proteini veya hazır kapsid stoku bulunmuyor",
    );
    // Group life-history traits distinguish a fern from an immature seed plant.
    const groups = [
      { name: "kara yosunu", vascular: false, seed: false, fruit: false },
      { name: "eğrelti", vascular: true, seed: false, fruit: false },
      { name: "çam", vascular: true, seed: true, fruit: false },
      { name: "elma", vascular: true, seed: true, fruit: true },
    ];
    expect(
      groups.filter((x) => x.vascular && !x.seed).map((x) => x.name),
    ).toEqual(["eğrelti"]);
    expect(groups.filter((x) => !x.fruit).map((x) => x.name)).toEqual([
      "kara yosunu",
      "eğrelti",
      "çam",
    ]);
    for (const id of ["f011-plants-1", "f011-plants-4"])
      expect(expected.find((x) => x.id === id)!.prompt).toContain(
        "yaşam döngüsü",
      );
    expect(
      expected.find(
        (x) => x.id === "f011-chem-kovalent-adlandirma-metalik-bag-7",
      )!.prompt,
    ).toContain("TYT katyon–anyon adlandırma");
    // Two first maxima fit a variable-frequency signal as well as a harmonic one.
    const phase = (t: number) =>
      t <= 1.2 ? 2 * (t - 0.7) : 1 + (10 / 7) * (t - 1.2);
    for (const [t, k] of [
      [0.7, 0],
      [1.2, 1],
      [1.9, 2],
    ])
      expect(phase(t)).toBeCloseTo(k, 12);
    expect(1.2 - 0.7).toBeCloseTo(0.5);
    expect(1.9 - 1.2).not.toBeCloseTo(0.5);
    const harmonic = (t: number) => Math.cos(4 * Math.PI * (t - 0.7));
    for (const t of [0.7, 1.2, 1.7]) expect(harmonic(t)).toBeCloseTo(1, 12);
    expect(1 / (1.2 - 0.7)).toBe(2);
    expect(
      expected.find((x) => x.id === "dalgalara-giris-q10")!.prompt,
    ).toContain("Sinüzoidal (harmonik)");
    const heat = 1 * 334 + 1 * 4.18 * (100 - 0);
    expect(heat).toBe(752);
    expect(
      expected.find((x) => x.id === "f011-chem-maddenin-halleri-2")!.prompt,
    ).toContain("1 atm");
  });
  it("actual QuestionHelp preserves the correct option and raw card without a write", () => {
    const warn = vi.spyOn(console, "error"),
      writes = vi.fn();
    try {
      for (const row of expected) {
        const q = freeze(plain(row.id)),
          before = structuredClone(q);
        const html = unescape(
          renderToStaticMarkup(
            createElement(QuestionHelp, {
              question: q,
              level: 6,
              onLevel: writes,
            }),
          ),
        );
        // QuestionHelp shows the solution; the card stem is rendered by Study/Exams.
        expect(html).toContain(q.options[q.answer]);
        expect(q).toEqual(before);
      }
      expect(writes).not.toHaveBeenCalled();
      expect(warn).not.toHaveBeenCalled();
    } finally {
      warn.mockRestore();
    }
  });
});
