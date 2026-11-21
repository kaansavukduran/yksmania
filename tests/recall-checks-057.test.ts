import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { lessons } from "../src/domain/content";
import { lessonGuides } from "../src/learning/guides";
import { recallCheckCount, recallCheckLessonCount, recallChecksFor } from "../src/learning/recallChecks";
import { RecallCheckCard } from "../src/learning/RecallCheckCard";

describe("mid-lesson recall checks", () => {
  it("belong to real guides, sit between sections and stay short", () => {
    let lessonsWith = 0;
    let total = 0;
    for (const lesson of lessons) {
      const checks = recallChecksFor(lesson.id);
      if (!checks.length) continue;
      const guide = lessonGuides.get(lesson.id);
      expect(guide, lesson.id).toBeDefined();
      lessonsWith++;
      let previous = 0;
      const seen = new Set<string>();
      for (const check of checks) {
        const where = `${lesson.id} after ${check.after}`;
        total++;
        // Never after the last section: the lesson already ends with recall.
        expect(check.after, where).toBeGreaterThanOrEqual(1);
        expect(check.after, where).toBeLessThanOrEqual(guide!.sections.length - 2);
        expect(check.after, where).toBeGreaterThan(previous);
        previous = check.after;
        expect(check.prompt.trim().endsWith("?"), where).toBe(true);
        expect(check.prompt.length, where).toBeLessThanOrEqual(140);
        expect(check.answer.length, where).toBeLessThanOrEqual(220);
        expect(`${check.prompt} ${check.answer}`, where).not.toMatch(/\.\.\.|—|MEBİ|OGM|kaynakta/);
        expect(seen.has(check.prompt), where).toBe(false);
        seen.add(check.prompt);
        // Not a second copy of the end-of-lesson recall.
        expect(guide!.recall.some((r) => r.prompt.trim() === check.prompt.trim()), where).toBe(false);
      }
    }
    expect(lessonsWith).toBe(recallCheckLessonCount);
    expect(total).toBe(recallCheckCount);
  });

  it("shows the question first and keeps the answer behind one tap", () => {
    const html = renderToStaticMarkup(
      createElement(RecallCheckCard, { check: { after: 1, prompt: "Birim kesir nedir?", answer: "Payı 1 olan kesirdir." } }),
    );
    expect(html).toContain("Birim kesir nedir?");
    expect(html).toContain("Cevabı göster");
    expect(html).not.toContain("Payı 1 olan kesirdir.");
  });
});
