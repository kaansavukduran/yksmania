import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { clarifiedGuideView } from "../src/learning/guidePresentation028";
import { lessonGuides } from "../src/learning/guides";
import { lessons } from "../src/domain/content";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { resolveGuideStep } from "../src/learning/guides/position";
import type { LessonGuide } from "../src/learning/guides/types";
import { Theory } from "../src/pages/Theory";
import { GuidedReading } from "../src/learning/GuidedReading";

const fixtures = vi.hoisted(() => ({
  writes: vi.fn(),
  explorationKeys: [] as string[],
  saved: { step: 2, guided: true, sectionCount: 0 },
  state: { notes: {}, draft: undefined },
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: fixtures.state,
    update: fixtures.writes,
    t: (key: string) => key,
    l: (value: string | { tr: string }) =>
      typeof value === "string" ? value : value.tr,
  }),
}));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (key: string) => {
    fixtures.explorationKeys.push(key);
    return [fixtures.saved, fixtures.writes];
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

const ids = [
  "periyodik-sistem",
  "katman-elektron-dizilimi",
  "ayt-periyodik-sistem-atom-capi",
];
const guides = ids.map((id) => lessonGuides.get(id)!);
const frozen = <T>(value: T): T => {
  if (value && typeof value === "object") {
    Object.freeze(value);
    for (const item of Object.values(value)) frozen(item);
  }
  return value;
};
const digits = (text: string) => text.match(/\d+/g) ?? [];
const changedPaths = (raw: LessonGuide, shown: LessonGuide) => {
  const paths: string[] = [];
  raw.sections.forEach((section, i) =>
    section.paragraphs.forEach((paragraph, j) => {
      if (paragraph !== shown.sections[i].paragraphs[j])
        paths.push(`sections/${i}/paragraphs/${j}`);
    }),
  );
  raw.examples.forEach((example, i) =>
    example.steps.forEach((step, j) => {
      if (step.explanation !== shown.examples[i].steps[j].explanation)
        paths.push(`examples/${i}/steps/${j}/explanation`);
    }),
  );
  return paths;
};

describe("028 exact and pure guide copy presentation", () => {
  it("clarifies only nine known complete leaves, keeping every other field and reference", () => {
    const expected = [
      [
        "sections/2/paragraphs/0",
        "sections/4/paragraphs/0",
        "examples/0/steps/1/explanation",
      ],
      [
        "sections/3/paragraphs/1",
        "sections/4/paragraphs/0",
        "sections/4/paragraphs/1",
        "examples/1/steps/1/explanation",
      ],
      ["sections/1/paragraphs/1", "examples/0/steps/0/explanation"],
    ];
    for (const [i, source] of guides.entries()) {
      const raw = frozen(structuredClone(source));
      const before = JSON.stringify(raw);
      const shown = clarifiedGuideView(raw);
      expect(shown).not.toBe(raw);
      expect(JSON.stringify(raw)).toBe(before);
      expect(changedPaths(raw, shown).sort()).toEqual(expected[i].sort());
      expect(shown.id).toBe(raw.id);
      expect(shown.minutes).toBe(raw.minutes);
      expect(shown.objectives).toBe(raw.objectives);
      expect(shown.recall).toBe(raw.recall);
      expect(shown.source).toBe(raw.source);
      expect(shown.sections).toHaveLength(raw.sections.length);
      expect(shown.examples).toHaveLength(raw.examples.length);
      raw.sections.forEach((section, s) => {
        const current = shown.sections[s];
        expect(current.title).toBe(section.title);
        expect(current.table).toBe(section.table);
        expect(current.paragraphs).toHaveLength(section.paragraphs.length);
        if (current === section)
          expect(current.paragraphs).toBe(section.paragraphs);
        section.paragraphs.forEach((paragraph, p) => {
          expect(digits(current.paragraphs[p])).toEqual(digits(paragraph));
        });
      });
      raw.examples.forEach((example, e) => {
        const current = shown.examples[e];
        expect({ ...current, steps: example.steps }).toEqual(example);
        expect(current.steps).toHaveLength(example.steps.length);
        example.steps.forEach((step, s) => {
          expect({
            ...current.steps[s],
            explanation: step.explanation,
          }).toEqual(step);
          expect(digits(current.steps[s].explanation)).toEqual(
            digits(step.explanation),
          );
        });
      });
      expect(clarifiedGuideView(shown)).toBe(shown);
    }
    expect(clarifiedGuideView(undefined)).toBeUndefined();
  });
  it("requires stable guide ID, exact full text and exact structural location", () => {
    for (const source of guides) {
      const shown = clarifiedGuideView(source);
      const otherID = { ...source, id: source.id + "-historical" };
      expect(clarifiedGuideView(otherID)).toBe(otherID);
      for (const path of changedPaths(source, shown)) {
        const parts = path.split("/");
        const altered = structuredClone(source);
        const outer = Number(parts[1]),
          inner = Number(parts[3]);
        if (parts[0] === "sections") {
          const text =
            altered.sections[outer].paragraphs[inner] + " Başka kaynak sürümü.";
          altered.sections[outer].paragraphs[inner] = text;
          expect(
            clarifiedGuideView(altered).sections[outer].paragraphs[inner],
          ).toBe(text);
          const moved = {
            ...altered,
            sections: altered.sections.map((s) => ({
              ...s,
              paragraphs: ["eşleşmeyen"],
            })),
            examples: [],
          };
          moved.sections[outer].paragraphs.push(
            source.sections[outer].paragraphs[inner],
          );
          // Place the original at a different index, even if the known index was 1.
          if (inner === 1)
            moved.sections[outer].paragraphs.unshift("eşleşmeyen");
          expect(clarifiedGuideView(moved)).toBe(moved);
        } else {
          const text =
            altered.examples[outer].steps[inner].explanation +
            " Başka kaynak sürümü.";
          altered.examples[outer].steps[inner].explanation = text;
          expect(
            clarifiedGuideView(altered).examples[outer].steps[inner]
              .explanation,
          ).toBe(text);
        }
      }
    }
    const unknown = {
      ...guides[0],
      id: "unregistered",
      preservedExtra: { text: guides[0].sections[2].paragraphs[0] },
    };
    expect(clarifiedGuideView(unknown)).toBe(unknown);
    expect(clarifiedGuideView(unknown).preservedExtra).toBe(
      unknown.preservedExtra,
    );
  });
  it("preserves true full-shell He statements, ion caveats and limited Pd scope", () => {
    const [periodic, shells, orbital] = guides.map((g) =>
      clarifiedGuideView(g),
    );
    expect(periodic.sections[2].paragraphs[1]).toBe(
      guides[0].sections[2].paragraphs[1],
    );
    expect(periodic.examples[1].steps[1]).toBe(guides[0].examples[1].steps[1]);
    expect(shells.sections[4].paragraphs[0]).toContain(
      "He iki elektronuna rağmen 18. gruptadır; ilk katmanı tam doludur.",
    );
    expect(shells.sections[2]).toBe(guides[1].sections[2]);
    expect(orbital.sections[2]).toBe(guides[2].sections[2]);
    expect(orbital.examples[1]).toBe(guides[2].examples[1]);
    expect(orbital.sections[1].paragraphs[1]).toContain(
      "Bütün elementlere istisnasız bir tanım diye genişletme; daha ileri Pd gibi düzenler ayrı ele alınır.",
    );
    expect(orbital.sections[1].paragraphs[1]).toContain(
      "Bu çalışmanın ilk 36 nötr atom kapsamında",
    );
    expect(orbital.sections[1].paragraphs[1]).toContain(
      "orbitalin iki elektronla tam dolu olması gerekmez",
    );
    expect(shells.sections[3].paragraphs[1]).toContain(
      "Geçiş metallerinin iyonlarını bu basit yöntemle genelleme",
    );
    expect(periodic.sections[2].paragraphs[0]).toContain(
      "kapasitesinin tamamen dolu olması gerekmez",
    );
  });
  it("distinguishes occupancy from capacity for Al, Ca and a singly occupied 4s orbital", () => {
    const occupied = (distribution: number[]) =>
      distribution.filter((n) => n > 0).length;
    const full = (distribution: number[]) =>
      distribution.filter((electrons, i) => electrons === 2 * (i + 1) ** 2)
        .length;
    expect([occupied([2, 8, 3]), full([2, 8, 3])]).toEqual([3, 2]);
    expect([occupied([2, 8, 8, 2]), full([2, 8, 8, 2])]).toEqual([4, 2]);
    const potassium = [
      { n: 1, e: 2 },
      { n: 2, e: 2 },
      { n: 2, e: 2 },
      { n: 2, e: 2 },
      { n: 2, e: 2 },
      { n: 3, e: 2 },
      { n: 3, e: 2 },
      { n: 3, e: 2 },
      { n: 3, e: 2 },
      { n: 4, e: 1 },
    ];
    expect(potassium.reduce((n, o) => n + o.e, 0)).toBe(19);
    expect(Math.max(...potassium.filter((o) => o.e > 0).map((o) => o.n))).toBe(
      4,
    );
    expect(
      Math.max(...potassium.filter((o) => o.e === 2).map((o) => o.n)),
    ).toBe(3);
    expect(full([2])).toBe(1);
    expect(clarifiedGuideView(guides[0]).examples[1].answer).toBe(
      "1. periyot, 18. grup.",
    );
  });
  it("leaves all raw guide, lesson and question payloads unchanged and reading indices stable", () => {
    const guideBefore = JSON.stringify([...lessonGuides]);
    const lessonsBefore = JSON.stringify(lessons);
    const questionsBefore = JSON.stringify(lessons.flatMap((l) => l.questions));
    for (const source of lessonGuides.values()) {
      const shown = clarifiedGuideView(source);
      expect(shown.sections.map((s) => s.title)).toEqual(
        source.sections.map((s) => s.title),
      );
      expect(shown.examples.map((e) => e.title)).toEqual(
        source.examples.map((e) => e.title),
      );
      // The subsequent029 membrane worked revision has its own exact-example
      // guard. All other guides outside the accepted028 trio stay referentially
      // identical; the original nine chemistry leaf assertions remain above.
      if (
        !ids.includes(source.id) &&
        source.id !== "hucre-zarinda-madde-alisverisleri"
      )
        expect(shown).toBe(source);
    }
    for (const raw of guides) {
      const shown = clarifiedGuideView(raw);
      for (const count of [0, raw.sections.length - 1, raw.sections.length]) {
        for (let step = 0; step <= raw.sections.length + 2; step++) {
          expect(
            resolveGuideStep(shown.id, step, count, shown.sections.length),
          ).toBe(resolveGuideStep(raw.id, step, count, raw.sections.length));
        }
      }
    }
    expect(JSON.stringify([...lessonGuides])).toBe(guideBefore);
    expect(JSON.stringify(lessons)).toBe(lessonsBefore);
    expect(JSON.stringify(lessons.flatMap((l) => l.questions))).toBe(
      questionsBefore,
    );
  });
  it("feeds the same clarified guide to actual Theory and built-in cheatsheets without writes", () => {
    fixtures.writes.mockClear();
    for (const raw of guides) {
      const guide = clarifiedGuideView(raw);
      const before = JSON.stringify(fixtures.saved);
      const html = renderToStaticMarkup(
        createElement(Theory, {
          id: raw.id,
          practice: () => {},
          navigate: () => {},
        }),
      );
      expect(html).toContain("elektron");
      expect(fixtures.explorationKeys).toContain(`guide:${raw.id}`);
      expect(JSON.stringify(fixtures.saved)).toBe(before);
      const sheet = [...builtInCheatSheets.values()].find(
        (s) => s.lessonId === raw.id,
      )!;
      expect(sheet).toBeDefined();
      const text = JSON.stringify(sheet);
      for (const path of changedPaths(raw, guide)) {
        const p = path.split("/"),
          outer = Number(p[1]),
          inner = Number(p[3]);
        if (p[0] === "sections") {
          // Older summary sheets intentionally keep only a section's first
          // paragraph; any included paragraph must use the clarified version.
          if (
            sheet.sections.some((s) =>
              s.text.includes(guide.sections[outer].paragraphs[inner]),
            )
          )
            expect(text).not.toContain(raw.sections[outer].paragraphs[inner]);
          if (inner === 0)
            expect(text).toContain(guide.sections[outer].paragraphs[inner]);
        } else if (outer < sheet.examples.length) {
          expect(text).toContain(
            guide.examples[outer].steps[inner].explanation,
          );
          expect(text).not.toContain(
            raw.examples[outer].steps[inner].explanation,
          );
        }
      }
    }
    expect(fixtures.writes).not.toHaveBeenCalled();
  });
  it("preserves saved guided reading positions and never persists during actual SSR", () => {
    fixtures.writes.mockClear();
    const warnings: string[] = [],
      error = console.error;
    console.error = (...args) => warnings.push(args.map(String).join(" "));
    try {
      for (const source of guides) {
        const guide = clarifiedGuideView(source);
        for (const step of [
          0,
          2,
          source.sections.length,
          source.sections.length + 1,
        ]) {
          fixtures.saved.step = step;
          fixtures.saved.sectionCount = source.sections.length;
          const savedBefore = JSON.stringify(fixtures.saved);
          const html = renderToStaticMarkup(
            createElement(GuidedReading, { guide }),
          );
          expect(html).toContain("learning-journey");
          expect(JSON.stringify(fixtures.saved)).toBe(savedBefore);
        }
      }
    } finally {
      console.error = error;
    }
    expect(warnings).toEqual([]);
    expect(fixtures.writes).not.toHaveBeenCalled();
  });
});
