import { createHash } from "node:crypto";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import oldQuestions from "./fixtures/source-stage-027-question-fingerprints.json";
import oldLessons from "./fixtures/source-stage-027-lesson-fingerprints.json";
import oldGuides from "./fixtures/source-stage-027-guide-fingerprints.json";
import workbookBaseline from "./fixtures/source-stage-025-topic-associations.json";
import { lessons } from "../src/domain/content";
import type { Question } from "../src/domain/model";
import {
  lessonTopic,
  studyTopics,
  workbookStudyTopics,
} from "../src/domain/studyPlan";
import {
  acceptedQuestion031,
  acceptedLesson031,
  acceptedGuide031,
} from "./helpers/accepted-content-031";
import {
  clarifiedQuestionView,
  localizedQuestionView,
  questionPresentationRevisions,
} from "../src/domain/questionPresentation";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { QuestionHelp } from "../src/components/QuestionHelp";
import { effectiveHelpLevel } from "../src/learning/helpProgression";
import {
  helpPanels,
  previousHelpPanelCount,
  resolvedGuidance,
} from "../src/learning/questionHelp";
import math from "../src/learning/guidance028Math.json";
import chemistryA from "../src/learning/guidance028ChemistryA.json";
import chemistryB from "../src/learning/guidance028ChemistryB.json";
import biology from "../src/learning/guidance028Biology.json";
import humanities from "../src/learning/guidance028Humanities.json";
import physics from "../src/learning/guidance028Physics.json";
import curated from "../src/learning/questionHelpCatalogue.json";
import oldMath from "../src/learning/guidance027Math.json";
import oldPhysics from "../src/learning/guidance027Physics.json";
import oldChemistry from "../src/learning/guidance027Chemistry.json";
import oldBiologyA from "../src/learning/guidance027BiologyA.json";
import oldBiologyB from "../src/learning/guidance027BiologyB.json";
import oldBiologyC from "../src/learning/guidance027BiologyC.json";
import oldHistoryA from "../src/learning/guidance027HistoryA.json";
import oldHistoryB from "../src/learning/guidance027HistoryB.json";

// This gate imports the actual global catalogue and renderer. No vi.mock,
// inline fixture catalogue, or replacement resolver is used.
const cohorts = [math, chemistryA, chemistryB, biology, humanities, physics];
const rows = cohorts.flat();
const previousRows = [
  ...oldMath,
  ...oldPhysics,
  ...oldChemistry,
  ...oldBiologyA,
  ...oldBiologyB,
  ...oldBiologyC,
  ...oldHistoryA,
  ...oldHistoryB,
];
const all = lessons
  .flatMap((lesson) => lesson.questions)
  .filter(acceptedQuestion031);
const byId = new Map(all.map((q) => [q.id, q]));
const original = (id: string): Question => {
  const q = byId.get(id);
  if (!q) throw Error(`MISSING_028_ORIGINAL:${id}`);
  return q;
};
const flat = (q: Question): HelpQuestion => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
  guidance: q.guidance,
});
const shown = (q: Question) => flat(localizedQuestionView(q));
const canonical = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(canonical)
    : value && typeof value === "object"
      ? Object.fromEntries(
          Object.entries(value)
            .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
            .map(([key, item]) => [key, canonical(item)]),
        )
      : value;
const fingerprint = (value: unknown) =>
  createHash("sha256")
    .update(JSON.stringify(canonical(value)))
    .digest("hex");
// Ignore case, spacing and terminal sentence punctuation, preserving all
// mathematical operators: a+b and a−b must never collapse to one statement.
const normalized = (text: string) =>
  text
    .normalize("NFKC")
    .toLocaleLowerCase("tr-TR")
    .trim()
    .replace(/[.!?;:…]+$/u, "")
    .replace(/\s+/gu, "");
const freeze = <T>(value: T): T => {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
};
const plain = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");

describe("028 gerçek küresel yardım kayıtları ve eski kaynak koruması", () => {
  it("ayrı 027 kaynağının 5883 sorusunu, 514 ders metadata'sını ve 480 ham rehberini korur", () => {
    expect(all).toHaveLength(5883);
    expect(byId.size).toBe(5883);
    expect(Object.keys(oldQuestions)).toHaveLength(5883);
    expect(Object.keys(oldLessons)).toHaveLength(514);
    expect(Object.keys(oldGuides)).toHaveLength(480);
    for (const [id, sha] of Object.entries(oldQuestions))
      expect(fingerprint(byId.get(id)), id).toBe(sha);
    for (const [id, sha] of Object.entries(oldLessons)) {
      const lesson = lessons.find((item) => item.id === id)!;
      expect(lesson, id).toBeDefined();
      const { questions: _questions, ...metadata } = lesson;
      expect(fingerprint(metadata), id).toBe(sha);
    }
    // The Map is the raw accepted guide collection, not a display projection.
    for (const [id, sha] of Object.entries(oldGuides))
      expect(fingerprint(lessonGuides.get(id)), id).toBe(sha);
  });

  it("026'nın yerleşik 479 çalışma sırasını ve teori/rehber/özet sayılarını korur", () => {
    // This is the same immutable sequence baseline already used by026.
    expect(workbookStudyTopics).toEqual(workbookBaseline.studyTopics);
    expect(studyTopics.slice(0, 479)).toEqual(workbookBaseline.studyTopics);
    expect(new Set(workbookStudyTopics.map((topic) => topic.id)).size).toBe(
      479,
    );
    for (const [id, topic] of Object.entries(workbookBaseline.lessonTopic))
      expect(lessonTopic[id], id).toBe(topic);
    expect(lessons.filter(acceptedLesson031)).toHaveLength(514);
    expect(
      lessons
        .filter(acceptedLesson031)
        .filter((lesson) => !lesson.tags.includes("soru-seti")),
    ).toHaveLength(480);
    expect([...lessonGuides].filter(acceptedGuide031)).toHaveLength(480);
    expect(
      [...builtInCheatSheets.values()].filter(
        (sheet) => sheet.lessonId && acceptedLesson031({ id: sheet.lessonId }),
      ),
    ).toHaveLength(480);
  });

  it("altı kohorttaki 235 yardımı gerçek gösterilen kimliklere ve legacy1'e bağlar", () => {
    expect(cohorts.map((cohort) => cohort.length)).toEqual([
      65, 50, 50, 25, 30, 15,
    ]);
    expect(rows).toHaveLength(235);
    expect(new Set(rows.map((row) => row.id)).size).toBe(235);
    expect(curated).toHaveLength(20);
    expect(previousRows).toHaveLength(205);
    expect(
      new Set([...curated, ...previousRows, ...rows].map((row) => row.id)).size,
    ).toBe(460);
    for (const row of rows) {
      const q = original(row.id),
        displayed = shown(q),
        raw = flat(q);
      expect(q.guidance, row.id).toBeUndefined();
      expect(clarifiedQuestionView(raw), row.id).toStrictEqual(displayed);
      expect(questionIdentity(displayed), row.id).toBe(row.identity);
      expect(resolvedGuidance(raw), row.id).toEqual(row.guidance);
      expect(resolvedGuidance(displayed), row.id).toEqual(row.guidance);
      expect(previousHelpPanelCount(displayed), row.id).toBe(1);
    }
    // Existing027 tests retain their full content/SSR gates; here only their
    // global registrations and the original20 registrations are checked.
    for (const row of [...curated, ...previousRows])
      expect(resolvedGuidance(shown(original(row.id))), row.id).toEqual(
        row.guidance,
      );
  });

  it("028'in 2743 kabul edilmiş yardımını, 95 üçlü ve 140 beşli gerçek şıkkını korur", () => {
    const full = all.filter((q) => resolvedGuidance(shown(q)) !== undefined);
    const partial = all.filter((q) => resolvedGuidance(shown(q)) === undefined);
    const acceptedIds = new Set([
      ...all.filter((q) => q.guidance).map((q) => q.id),
      ...[...curated, ...previousRows, ...rows].map((row) => row.id),
    ]);
    expect(acceptedIds.size).toBe(2743);
    for (const id of acceptedIds)
      expect(resolvedGuidance(shown(original(id))), id).toBeDefined();
    // Later identity-bound help may extend coverage. Its exact current census
    // is asserted in source-systems-029; the accepted028 cohort stays fixed.
    expect(full.length).toBeGreaterThanOrEqual(2743);
    expect(partial.length).toBeLessThanOrEqual(3140);
    expect(full.length + partial.length).toBe(5883);
    for (const q of partial)
      expect(helpPanels(shown(q)).length, q.id).toBeLessThanOrEqual(1);
    expect(
      rows.filter((row) => original(row.id).options.length === 3),
    ).toHaveLength(95);
    expect(
      rows.filter((row) => original(row.id).options.length === 5),
    ).toHaveLength(140);
    expect(
      rows.reduce((sum, row) => sum + row.guidance.optionReasons.length, 0),
    ).toBe(985);
    expect(rows.reduce((sum, row) => sum + row.guidance.steps.length, 0)).toBe(
      705,
    );
  });

  it("bilgi/yöntem/adımları işaretleri silmeden ayırır ve gerçek şık sırasını korur", () => {
    expect(normalized(" A + B. ")).toBe(normalized("a+b"));
    expect(normalized("a+b")).not.toBe(normalized("a−b"));
    expect(normalized("a+b")).not.toBe(normalized("a-b"));
    for (const row of rows) {
      const q = shown(original(row.id)),
        g = questionGuidanceSchema.parse(row.guidance);
      expect(g.steps, row.id).toHaveLength(3);
      const teaching = [...g.knowledge, g.strategy, ...g.steps].map(normalized);
      expect(teaching.every(Boolean), row.id).toBe(true);
      expect(new Set(teaching).size, row.id).toBe(teaching.length);
      if (g.knowledge.length > 1)
        expect([g.strategy, ...g.steps].map(normalized), row.id).not.toContain(
          normalized(g.knowledge.join(" ")),
        );
      expect(g.optionReasons, row.id).toHaveLength(q.options.length);
      expect(new Set(g.optionReasons.map(normalized)).size, row.id).toBe(
        q.options.length,
      );
      expect(q.answer, row.id).toBeGreaterThanOrEqual(0);
      expect(q.answer, row.id).toBeLessThan(q.options.length);
      // The full identity binds the ordered options and key. Where authors use
      // an explicit correct marker, also prevent an index shift in its reason.
      const marked = g.optionReasons.flatMap((reason, index) =>
        /^Doğru[.:]/u.test(reason) ? [index] : [],
      );
      if (marked.length) expect(marked, row.id).toEqual([q.answer]);
      expect(g.commonError.trim(), row.id).not.toBe("");
      expect(g.check.trim(), row.id).not.toBe("");
    }
  });

  it("1410 kimlik değişimini reddeder; inline rehber ve eski/yeni yardım sırası saf kalır", () => {
    let rejected = 0;
    for (const row of rows) {
      const q = flat(original(row.id));
      const variants: HelpQuestion[] = [
        { ...q, id: q.id + "-historical-other" },
        { ...q, prompt: q.prompt + " Başka koşul." },
        { ...q, passage: "Değişmiş geçmiş pasaj." },
        { ...q, options: [q.options[1], q.options[0], ...q.options.slice(2)] },
        { ...q, answer: (q.answer + 1) % q.options.length },
        { ...q, explanation: q.explanation + " Başka açıklama." },
      ];
      for (const variant of variants) {
        const retained = freeze(structuredClone(variant)),
          before = structuredClone(retained);
        expect(resolvedGuidance(retained), row.id).toBeUndefined();
        expect(previousHelpPanelCount(retained), row.id).toBeUndefined();
        expect(clarifiedQuestionView(retained), row.id).toBe(retained);
        expect(retained).toStrictEqual(before);
        rejected++;
      }
      const displayed = freeze(structuredClone(shown(original(row.id))));
      const before = structuredClone(displayed),
        panels = helpPanels(displayed);
      expect(panels).toHaveLength(5);
      const old = freeze({
        helpLevel: 2,
        hint: true,
        checked: true,
        note: "Eski not korunur",
        startedAt: 1234,
      });
      const marked = freeze({ ...old, helpPanelCount: panels.length });
      expect(
        effectiveHelpLevel(
          panels,
          old.helpLevel,
          undefined,
          previousHelpPanelCount(displayed),
          displayed.hint,
        ),
      ).toBe(6);
      expect(
        effectiveHelpLevel(
          panels,
          marked.helpLevel,
          marked.helpPanelCount,
          previousHelpPanelCount(displayed),
          displayed.hint,
        ),
      ).toBe(2);
      const inlineGuide = {
        ...row.guidance,
        knowledge: ["Bu geçmiş kaydın kendi rehberi önceliklidir."],
      };
      const inline = freeze({ ...variants[1], guidance: inlineGuide });
      expect(resolvedGuidance(inline)).toBe(inlineGuide);
      expect(previousHelpPanelCount(inline)).toBeUndefined();
      expect(
        effectiveHelpLevel(
          helpPanels(inline),
          2,
          undefined,
          previousHelpPanelCount(inline),
          inline.hint,
        ),
      ).toBe(2);
      expect(displayed).toStrictEqual(before);
      expect(old).toStrictEqual({
        helpLevel: 2,
        hint: true,
        checked: true,
        note: "Eski not korunur",
        startedAt: 1234,
      });
      expect(marked).toStrictEqual({ ...old, helpPanelCount: 5 });
    }
    expect(rejected).toBe(1410);
  });

  it("gerçek katalogla 470 SSR'de yalnız bilgi ve tam çözüm aşamalarını gösterir", () => {
    const warnings = vi.spyOn(console, "error");
    let renders = 0,
      dispatches = 0;
    try {
      for (const row of rows) {
        const q = freeze(structuredClone(flat(original(row.id)))),
          before = structuredClone(q);
        const g = row.guidance;
        for (const level of [1, 6]) {
          const html = renderToStaticMarkup(
            createElement(QuestionHelp, {
              question: q,
              level,
              onLevel: () => {
                dispatches++;
              },
            }),
          );
          renders++;
          const text = plain(html);
          for (const paragraph of g.knowledge)
            expect(text, row.id).toContain(paragraph);
          expect(text.includes(g.strategy), row.id).toBe(level === 6);
          for (const step of g.steps)
            expect(text.includes(step), row.id).toBe(level === 6);
          expect(html.includes('aria-label="Tam çözüm"'), row.id).toBe(
            level === 6,
          );
          expect(text.includes("Doğru yanıt:"), row.id).toBe(level === 6);
          expect(text.includes("Şıkların mantığı"), row.id).toBe(level === 6);
          if (level === 6) {
            const view = clarifiedQuestionView(q);
            expect(text).toContain(
              "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
            );
            expect(text).toContain(view.options[q.answer]);
            expect(text).toContain(view.explanation);
            expect(row.guidance.optionReasons).toHaveLength(
              view.options.length,
            );
            for (const reason of g.optionReasons)
              expect(text, row.id).toContain(reason);
            expect(text).toContain(g.commonError);
            expect(text).toContain(g.check);
          }
          expect(q).toStrictEqual(before);
          expect(dispatches).toBe(0);
        }
      }
      expect(renders).toBe(470);
      expect(warnings).not.toHaveBeenCalled();
    } finally {
      warnings.mockRestore();
    }
  });

  it("dokuz bilinen raw/görünür kaydın panellerini ve 36 ek SSR HTML'sini eşit tutar", () => {
    const ids = [
      "ns-motion-4",
      "ns-energy-4",
      "snd-10",
      "periodic-4",
      "eq-2",
      "eq-5",
      "iyonik-bilesik-adlandirma-q2",
      "f013-foundation-katman-elektron-dizilimi-3",
      "f013-foundation-katman-elektron-dizilimi-7",
    ];
    expect(
      questionPresentationRevisions
        .filter((revision) => ids.includes(revision.id))
        .map((revision) => revision.id),
    ).toEqual(ids);
    let renders = 0,
      dispatches = 0;
    const warnings = vi.spyOn(console, "error");
    try {
      for (const id of ids) {
        const raw = freeze(structuredClone(flat(original(id)))),
          before = structuredClone(raw);
        const revision = questionPresentationRevisions.find(
          (item) => item.id === id,
        )!;
        expect(questionIdentity(raw)).toBe(questionIdentity(revision.before));
        const view = freeze(clarifiedQuestionView(raw));
        expect(view).not.toBe(raw);
        expect(shown(original(id))).toStrictEqual(view);
        expect(helpPanels(raw)).toEqual(helpPanels(view));
        for (const level of [1, 6]) {
          const render = (question: HelpQuestion) => {
            renders++;
            return renderToStaticMarkup(
              createElement(QuestionHelp, {
                question,
                level,
                onLevel: () => {
                  dispatches++;
                },
              }),
            );
          };
          expect(render(raw), id + "/" + level).toBe(render(view));
        }
        expect(raw).toStrictEqual(before);
      }
      expect(renders).toBe(36);
      expect(dispatches).toBe(0);
      expect(warnings).not.toHaveBeenCalled();
    } finally {
      warnings.mockRestore();
    }
  });
});
