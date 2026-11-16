import { createHash } from "node:crypto";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { lessons } from "../src/domain/content";
import type { Question } from "../src/domain/model";
import { QuestionHelp } from "../src/components/QuestionHelp";
import { localizedQuestionView } from "../src/domain/questionPresentation";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import {
  helpPanels,
  previousHelpPanelCount,
  resolvedGuidance,
} from "../src/learning/questionHelp";
import { effectiveHelpLevel } from "../src/learning/helpProgression";
import previous from "./fixtures/source-stage-028-guidance-fingerprints.json";
import math from "../src/learning/guidance029Math.json";
import physics from "../src/learning/guidance029Physics.json";
import chemistry from "../src/learning/guidance029Chemistry.json";
import biology from "../src/learning/guidance029Biology.json";
import turkish from "../src/learning/guidance029Turkish.json";
import history from "../src/learning/guidance029History.json";

const cohorts = [math, physics, chemistry, biology, turkish, history];
const rows = cohorts.flat();
const all = lessons.flatMap((lesson) => lesson.questions);
const byId = new Map(all.map((q) => [q.id, q]));
const raw = (id: string) => {
  const question = byId.get(id);
  if (!question) throw Error(`Missing029Original:${id}`);
  return question;
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
const hash = (value: unknown) =>
  createHash("sha256")
    .update(JSON.stringify(canonical(value)))
    .digest("hex");
const normalize = (text: string) =>
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

describe("029 gerçek katalog bütünleşmesi ve eski çözüm koruması", () => {
  it("ayrı 028 sürümünden alınmış 2743 çözümün içeriğini ve eski panel sırasını korur", () => {
    expect(previous).toHaveLength(2743);
    expect(new Set(previous.map((q) => q.id)).size).toBe(2743);
    for (const item of previous) {
      const question = flat(localizedQuestionView(raw(item.id)));
      expect(hash(resolvedGuidance(question)), item.id).toBe(item.sha256);
      expect(previousHelpPanelCount(question) ?? null, item.id).toBe(
        item.previousHelpPanelCount,
      );
    }
  });

  it("200 eski beşli soruyu tam kimliğine bağlar; 1000 gerekçe ve 600 farklı adım sunar", () => {
    expect(cohorts.map((cohort) => cohort.length)).toEqual([
      50, 50, 20, 20, 30, 30,
    ]);
    expect(rows).toHaveLength(200);
    expect(new Set(rows.map((row) => row.id)).size).toBe(200);
    const previousIds = new Set(previous.map((row) => row.id));
    const oldQuestions = rows.map((row) => raw(row.id));
    expect(hash(oldQuestions)).toBe(
      "02054f36a80db06bfd5151bc55b41a7b130621450792ce73272b55b52a8977bf",
    );
    let reasons = 0,
      steps = 0;
    for (const row of rows) {
      expect(previousIds.has(row.id), row.id).toBe(false);
      const original = freeze(structuredClone(raw(row.id)));
      const before = structuredClone(original);
      expect(original.guidance, row.id).toBeUndefined();
      const q = flat(localizedQuestionView(original));
      expect(q.options, row.id).toHaveLength(5);
      expect(questionIdentity(q), row.id).toBe(row.identity);
      expect(resolvedGuidance(q), row.id).toEqual(row.guidance);
      expect(previousHelpPanelCount(q), row.id).toBe(1);
      const g = questionGuidanceSchema.parse(row.guidance);
      expect(g.steps, row.id).toHaveLength(3);
      expect(g.optionReasons, row.id).toHaveLength(5);
      const teaching = [...g.knowledge, g.strategy, ...g.steps].map(normalize);
      expect(teaching.every(Boolean), row.id).toBe(true);
      expect(new Set(teaching).size, row.id).toBe(teaching.length);
      expect(new Set(g.optionReasons.map(normalize)).size, row.id).toBe(5);
      const marked = g.optionReasons.flatMap((text, i) =>
        /^Doğru[.:]/u.test(text) ? [i] : [],
      );
      if (marked.length) expect(marked, row.id).toEqual([q.answer]);
      expect(g.commonError.trim(), row.id).not.toBe("");
      expect(g.check.trim(), row.id).not.toBe("");
      expect(original, row.id).toEqual(before);
      reasons += g.optionReasons.length;
      steps += g.steps.length;
    }
    expect(reasons).toBe(1000);
    expect(steps).toBe(600);
  });

  it("2943 hazır ve 2940 kısmi çözümü sayar; eski ham soru bankası 5883 olarak kalır", () => {
    expect(all).toHaveLength(5883);
    const full = all.filter((q) =>
      resolvedGuidance(flat(localizedQuestionView(q))),
    );
    const partial = all.filter(
      (q) => !resolvedGuidance(flat(localizedQuestionView(q))),
    );
    expect(full).toHaveLength(2943);
    expect(partial).toHaveLength(2940);
    for (const question of partial) {
      expect(question.options, question.id).toHaveLength(5);
      expect(
        helpPanels(flat(question)).length,
        question.id,
      ).toBeLessThanOrEqual(1);
    }
  });

  it("1200 değişmiş kimliği reddeder; tarihî inline çözümü ve eski full2 kaydını korur", () => {
    let rejected = 0;
    for (const row of rows) {
      const q = flat(raw(row.id));
      const variants = [
        { ...q, id: q.id + "-other" },
        { ...q, prompt: q.prompt + " Başka koşul." },
        { ...q, passage: "Geçmiş başka metin." },
        { ...q, options: [q.options[1], q.options[0], ...q.options.slice(2)] },
        { ...q, answer: (q.answer + 1) % 5 },
        { ...q, explanation: q.explanation + " Başka açıklama." },
      ];
      for (const changed of variants) {
        const historical = freeze(structuredClone(changed));
        const before = structuredClone(historical);
        expect(resolvedGuidance(historical), row.id).toBeUndefined();
        expect(previousHelpPanelCount(historical), row.id).toBeUndefined();
        expect(historical).toEqual(before);
        rejected++;
      }
      const panels = helpPanels(q);
      expect(panels).toHaveLength(5);
      expect(effectiveHelpLevel(panels, 2, undefined, 1, q.hint), row.id).toBe(
        6,
      );
      expect(effectiveHelpLevel(panels, 2, 5, 1, q.hint), row.id).toBe(2);
      const inline = freeze({
        ...variants[1],
        guidance: {
          ...row.guidance,
          knowledge: ["Bu geçmiş kâğıdın kendi öğretim metni."],
        },
      });
      expect(resolvedGuidance(inline), row.id).toBe(inline.guidance);
      expect(previousHelpPanelCount(inline), row.id).toBeUndefined();
      expect(
        effectiveHelpLevel(
          helpPanels(inline),
          2,
          undefined,
          undefined,
          inline.hint,
        ),
        row.id,
      ).toBe(2);
    }
    expect(rejected).toBe(1200);
  });

  it("gerçek küresel QuestionHelp ile 400 SSR'de cevap yalnız tam çözümde açılır", () => {
    const errors = vi.spyOn(console, "error");
    let rendered = 0,
      writes = 0;
    try {
      for (const row of rows) {
        const q = freeze(flat(structuredClone(raw(row.id))));
        const before = structuredClone(q);
        for (const level of [1, 6]) {
          const html = renderToStaticMarkup(
            createElement(QuestionHelp, {
              question: q,
              level,
              onLevel: () => {
                writes++;
              },
            }),
          );
          rendered++;
          const text = plain(html);
          for (const paragraph of row.guidance.knowledge)
            expect(text, row.id).toContain(paragraph);
          expect(text.includes(row.guidance.strategy), row.id).toBe(
            level === 6,
          );
          for (const step of row.guidance.steps)
            expect(text.includes(step), row.id).toBe(level === 6);
          expect(html.includes('aria-label="Tam çözüm"'), row.id).toBe(
            level === 6,
          );
          expect(text.includes("Doğru yanıt:"), row.id).toBe(level === 6);
          if (level === 6) {
            const shown = flat(localizedQuestionView(raw(row.id)));
            expect(text, row.id).toContain(
              "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
            );
            expect(text, row.id).toContain(q.options[q.answer]);
            expect(text, row.id).toContain(shown.explanation);
            for (const reason of row.guidance.optionReasons)
              expect(text, row.id).toContain(reason);
            expect(text, row.id).toContain(row.guidance.commonError);
            expect(text, row.id).toContain(row.guidance.check);
          }
          expect(q, row.id).toEqual(before);
        }
      }
      expect(rendered).toBe(400);
      expect(writes).toBe(0);
      expect(errors).not.toHaveBeenCalled();
    } finally {
      errors.mockRestore();
    }
  });
});
