import { createHash } from "node:crypto";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { clarifiedGuideView } from "../src/learning/guidePresentation028";
import { lessonGuides } from "../src/learning/guides";
import { lessons } from "../src/domain/content";
import {
  acceptedLesson031,
  acceptedGuide031,
} from "./helpers/accepted-content-031";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { resolveGuideStep } from "../src/learning/guides/position";
import { membraneTransport } from "../src/learning/forge093Biology";
import Forge093BiologyLab from "../src/learning/Forge093BiologyLab";
import { Theory } from "../src/pages/Theory";

const fixture = vi.hoisted(() => ({
  writes: vi.fn(),
  keys: [] as string[],
  saved: { step: 0, guided: false, sectionCount: 10 },
  state: { notes: {}, draft: undefined },
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: fixture.state,
    update: fixture.writes,
    t: (key: string) => key,
    l: (value: string | { tr: string }) =>
      typeof value === "string" ? value : value.tr,
  }),
}));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (key: string, defaults: Record<string, unknown>) => {
    fixture.keys.push(key);
    return [
      { ...defaults, ...(key.startsWith("guide:") ? fixture.saved : {}) },
      fixture.writes,
    ];
  },
}));
vi.mock("../src/learning/VisualLab", () => ({ VisualLab: () => null }));
vi.mock("../src/components/StudyTimer", () => ({ StudyTimer: () => null }));
vi.mock("../src/components/Aion", () => ({ Aion: () => null }));
vi.mock("../src/components/LearningReviews", () => ({
  TheoryReviewAction: () => null,
}));
vi.mock("../src/components/StudyPlanning", () => ({
  TopicCompletion: () => null,
}));

const id = "hucre-zarinda-madde-alisverisleri";
const source = lessonGuides.get(id)!;
const digest = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
const freeze = <T>(value: T): T => {
  if (value && typeof value === "object") {
    Object.freeze(value);
    Object.values(value).forEach(freeze);
  }
  return value;
};
const paths = (a: unknown, b: unknown, at = ""): string[] => {
  if (a === b) return [];
  if (a && b && typeof a === "object" && typeof b === "object") {
    return Object.keys(a).flatMap((key) =>
      paths(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
        at ? `${at}/${key}` : key,
      ),
    );
  }
  return [at];
};
const escape = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");

describe("029 atomic membrane worked display clarification", () => {
  it("changes exactly six leaves without changing the original guide or its positions", () => {
    const raw = freeze(structuredClone(source)),
      before = JSON.stringify(raw);
    const view = clarifiedGuideView(raw);
    expect(paths(raw, view).sort()).toEqual(
      [
        "examples/0/prompt",
        "examples/0/steps/1/explanation",
        "examples/0/steps/1/expression",
        "examples/0/steps/2/explanation",
        "examples/0/steps/2/expression",
        "examples/0/answer",
      ].sort(),
    );
    expect(JSON.stringify(raw)).toBe(before);
    expect(view.id).toBe(id);
    expect(view.sections).toBe(raw.sections);
    expect(view.objectives).toBe(raw.objectives);
    expect(view.recall).toBe(raw.recall);
    expect(view.examples).toHaveLength(4);
    expect(view.examples[0].steps).toHaveLength(3);
    expect(view.examples[0].steps[0]).toBe(raw.examples[0].steps[0]);
    for (let i = 1; i < 4; i++) expect(view.examples[i]).toBe(raw.examples[i]);
    for (const field of ["title", "strategy", "check", "pitfall"] as const)
      expect(view.examples[0][field]).toBe(raw.examples[0][field]);
    expect(clarifiedGuideView(view)).toBe(view);
    const inverse = {
      ...view,
      examples: [raw.examples[0], ...view.examples.slice(1)],
    };
    expect(JSON.stringify(inverse)).toBe(before);
  });
  it("rejects every known-field drift atomically, including a custom2L prompt and reordered examples", () => {
    for (const field of [
      "title",
      "prompt",
      "strategy",
      "answer",
      "check",
      "pitfall",
    ] as const) {
      const changed = structuredClone(source);
      changed.examples[0][field] += " Başka sürüm; her bölme 2 L.";
      expect(clarifiedGuideView(changed)).toBe(changed);
    }
    for (let i = 0; i < 3; i++)
      for (const field of ["label", "explanation", "expression"] as const) {
        const changed = structuredClone(source);
        changed.examples[0].steps[i][field] += " Farklı adım";
        expect(clarifiedGuideView(changed)).toBe(changed);
      }
    const short = structuredClone(source);
    short.examples[0].steps.pop();
    expect(clarifiedGuideView(short)).toBe(short);
    const long = structuredClone(source);
    long.examples[0].steps.push({ ...long.examples[0].steps[0] });
    expect(clarifiedGuideView(long)).toBe(long);
    const sparse = structuredClone(source);
    delete sparse.examples[0].steps[1];
    expect(clarifiedGuideView(sparse)).toBe(sparse);
    const reordered = {
      ...source,
      examples: [
        source.examples[1],
        source.examples[0],
        ...source.examples.slice(2),
      ],
    };
    expect(clarifiedGuideView(reordered)).toBe(reordered);
    const other = { ...source, id: id + "-custom" };
    expect(clarifiedGuideView(other)).toBe(other);
    const empty = { ...source, examples: [] };
    expect(clarifiedGuideView(empty)).toBe(empty);
    const partial = structuredClone(source);
    partial.examples[0].prompt = clarifiedGuideView(source).examples[0].prompt;
    expect(clarifiedGuideView(partial)).toBe(partial);
  });
  it("retains unknown metadata by reference while cloning only the changed example and steps", () => {
    const meta = { origin: "saved custom annotation" };
    const example = {
      ...source.examples[0],
      extra: meta,
      steps: source.examples[0].steps.map((s) => ({ ...s, extra: meta })),
    };
    const raw = {
      ...source,
      extra: meta,
      examples: [example, ...source.examples.slice(1)],
    };
    const view = clarifiedGuideView(raw);
    expect(view.extra).toBe(meta);
    expect((view.examples[0] as typeof example).extra).toBe(meta);
    for (const step of view.examples[0].steps)
      expect((step as (typeof example.steps)[number]).extra).toBe(meta);
  });
  it("distinguishes concentration from amount for1L,2L and unequal fixed volumes", () => {
    const transfer = (outsideVolume: number, insideVolume: number) => {
      const outsideN = 8 * outsideVolume,
        insideN = 2 * insideVolume;
      return {
        outsideC: (outsideN - 1) / outsideVolume,
        insideC: (insideN + 1) / insideVolume,
        totalBefore: outsideN + insideN,
        totalAfter: outsideN - 1 + insideN + 1,
      };
    };
    expect(transfer(1, 1)).toEqual({
      outsideC: 7,
      insideC: 3,
      totalBefore: 10,
      totalAfter: 10,
    });
    expect(transfer(2, 2)).toEqual({
      outsideC: 7.5,
      insideC: 2.5,
      totalBefore: 20,
      totalAfter: 20,
    });
    expect(transfer(2, 2).outsideC + transfer(2, 2).insideC).toBe(10);
    expect(transfer(2, 1)).toEqual({
      outsideC: 7.5,
      insideC: 3,
      totalBefore: 18,
      totalAfter: 18,
    });
    expect(transfer(2, 1).outsideC + transfer(2, 1).insideC).toBe(10.5);
    const flow = membraneTransport({
      solute: "oxygen",
      active: false,
      carrier: false,
      atp: true,
      permeability: 3,
      outside: 8,
      inside: 2,
    });
    expect([flow.amount, flow.outsideAfter, flow.insideAfter]).toEqual([
      1, 7, 3,
    ]);
    const view = clarifiedGuideView(source).examples[0];
    expect(view.prompt).toContain("Her biri 1 model hacim birimi");
    expect(view.steps[1].explanation).toContain("Δc = Δn / V = 1 / 1 = 1");
    expect(view.steps[2].explanation).toContain(
      "derişim ve miktarın sayısal değerleri aynıdır",
    );
    expect(view.answer).toContain(
      "toplam madde miktarı 10 model miktar birimi",
    );
  });
  it("preserves all480 raw guides,514 lessons,5883 questions and the earlier nine display corrections", () => {
    const previousGuides = [...lessonGuides].filter(acceptedGuide031);
    const previousLessons = lessons.filter(acceptedLesson031);
    expect(previousGuides).toHaveLength(480);
    expect(digest(previousGuides)).toBe(
      "9ee7770f36a8114f042cf08b73cc6a7d3ee417ab0dea459829b6d9ef7119d666",
    );
    expect(digest(previousLessons)).toBe(
      "da9ab891182c546e8f11004407f0d9bb51112b71f9abd1c931d2b25b7d3e20f8",
    );
    expect(digest(previousLessons.flatMap((l) => l.questions))).toBe(
      "e445d7ad64aa47c776af1fa59123853f05718da840f6103b597b713c153b3b0d",
    );
    const others = previousGuides
      .filter(([key]) => key !== id)
      .map(([key, guide]) => [
        key,
        //030 changes only the separately guarded virus example. Compare its
        // raw guide here so this accepted029 fingerprint stays meaningful.
        ["virusler", "bitkiler", "dalgalara-giris"].includes(key)
          ? guide
          : clarifiedGuideView(guide),
      ]);
    expect(digest(others)).toBe(
      "c7981eba92cf6007575646095fee207e46a4e165a900831f3e4a335adb542208",
    );
    const view = clarifiedGuideView(source);
    for (const storedCount of [0, 9, 10])
      for (let step = 0; step <= 12; step++) {
        expect(
          resolveGuideStep(id, step, storedCount, view.sections.length),
        ).toBe(resolveGuideStep(id, step, storedCount, source.sections.length));
      }
  });
  it("uses the same view in actualTheory and built-in summaries without a state write", () => {
    fixture.writes.mockClear();
    const saved = JSON.stringify(fixture.saved),
      view = clarifiedGuideView(source);
    const html = renderToStaticMarkup(
      createElement(Theory, { id, practice: () => {}, navigate: () => {} }),
    );
    expect(html).toContain(escape(view.examples[0].prompt));
    expect(html).not.toContain(escape(source.examples[0].prompt));
    const sheet = [...builtInCheatSheets.values()].find(
      (s) => s.lessonId === id,
    )!;
    expect(sheet.examples[0].prompt).toBe(view.examples[0].prompt);
    for (const [i, step] of view.examples[0].steps.entries()) {
      expect(sheet.examples[0].steps[i]).toContain(step.explanation);
      if (step.expression)
        expect(sheet.examples[0].steps[i]).toContain(step.expression);
    }
    expect(sheet.examples[0].answer).toContain(view.examples[0].answer);
    expect(sheet.examples[0].answer).toContain(view.examples[0].check);
    expect(fixture.keys).toContain(`guide:${id}`);
    expect(JSON.stringify(fixture.saved)).toBe(saved);
    expect(fixture.writes).not.toHaveBeenCalled();
  });
  it("shows only the explicit unit-volume caption in actual modelJSX and makes no render writes", () => {
    fixture.writes.mockClear();
    const warnings: string[] = [],
      old = console.error;
    console.error = (...args) => warnings.push(args.map(String).join(" "));
    try {
      const html = renderToStaticMarkup(
        createElement(Forge093BiologyLab, { id }),
      );
      expect(html).toContain(
        "Her bölmenin sabit hacmi 1 model hacim birimi seçildi.",
      );
      expect(html).toContain("derişim = miktar / hacim");
      expect(html).toContain(
        "aktarılan miktar 1 ise derişim değişimi de 1’dir.",
      );
      expect(html).toContain("adım gerçek saniye değildir.");
      expect(html).toContain(
        'data-forge093="hucre-zarinda-madde-alisverisleri"',
      );
      expect(html).toContain("viewBox");
    } finally {
      console.error = old;
    }
    expect(warnings).toEqual([]);
    expect(fixture.writes).not.toHaveBeenCalled();
  });
});
