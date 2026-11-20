import { describe, expect, it } from "vitest";
import { foundationLessons, foundationSubjects } from "../src/learning/foundations";
import { lessonById, lessons } from "../src/domain/content";
import { studyTopics } from "../src/domain/studyPlan";
import type { FigureDef } from "../src/learning/sectionFigures/figureKit";

// Temel İnşa: ayrı köprü katmanı. Plan/sayaç değişmez, içerik kendi kendine yeter.
describe("051 Temel İnşa ön dersleri", () => {
  it("does not change the lesson list or the 505-topic plan", () => {
    const ids = new Set(foundationLessons.map((l) => l.id));
    expect(lessons.some((l) => ids.has(l.id))).toBe(false);
    expect(studyTopics.some((t) => ids.has(t.id))).toBe(false);
    expect(studyTopics).toHaveLength(505);
  });

  it("uses unique ids, TYT subjects and real prepared lessons", () => {
    expect(new Set(foundationLessons.map((l) => l.id)).size).toBe(foundationLessons.length);
    for (const l of foundationLessons) {
      expect(foundationSubjects as readonly string[]).toContain(l.subjectId);
      expect(l.prepares.length).toBeGreaterThan(0);
      for (const id of l.prepares) expect(lessonById(id)?.subjectId, `${l.id} → ${id}`).toBe(l.subjectId);
    }
  });

  it("gives every lesson pages with figures, stepwise examples and five-option checks", () => {
    for (const l of foundationLessons) {
      expect(l.pages.length, l.id).toBeGreaterThanOrEqual(2);
      expect(l.pages.filter((p) => p.figure).length, l.id).toBeGreaterThanOrEqual(2);
      expect(l.examples.length, l.id).toBeGreaterThanOrEqual(2);
      for (const e of l.examples) {
        expect(e.steps.length).toBeGreaterThanOrEqual(2);
        expect(e.answer && e.check).toBeTruthy();
      }
      expect(l.checks.length, l.id).toBeGreaterThanOrEqual(3);
      for (const c of l.checks) {
        expect(c.options).toHaveLength(5);
        expect(new Set(c.options).size, c.prompt).toBe(5);
        expect(c.answer).toBeGreaterThanOrEqual(0);
        expect(c.answer).toBeLessThan(5);
        expect(c.reasons).toHaveLength(5);
        expect(c.reasons.every((r) => r.length > 5)).toBe(true);
        expect(c.explain.length).toBeGreaterThan(5);
      }
    }
  });

  it("draws every figure state with finite coordinates and reachable picks", () => {
    const figures: [string, FigureDef][] = foundationLessons.flatMap((l) =>
      l.pages.filter((p) => p.figure).map((p) => [`${l.id} / ${p.title}`, p.figure!] as [string, FigureDef]),
    );
    expect(figures.length).toBeGreaterThanOrEqual(14);
    for (const [name, def] of figures) {
      expect(def.caption.length, name).toBeGreaterThan(40);
      expect(def.alt.length, name).toBeGreaterThan(20);
      const values = def.param
        ? Array.from({ length: Math.round((def.param.max - def.param.min) / def.param.step) + 1 }, (_, i) => def.param!.min + i * def.param!.step)
        : [0];
      const steps = def.steps ? def.steps.map((_, i) => i) : [0];
      const picks = def.picks ? [-1, ...def.picks.map((_, i) => i)] : [-1];
      for (const val of values)
        for (const s of steps)
          for (const pk of picks) {
            const out = def.draw(val, s, pk);
            expect(JSON.stringify(out.els), `${name} ${val}/${s}/${pk}`).not.toMatch(/NaN|Infinity|undefined/);
            expect(out.readout?.length ?? 0).toBeGreaterThan(0);
          }
      if (def.picks) {
        const drawn = JSON.stringify(def.draw(def.param?.init ?? 0, 0, -1).els);
        def.picks.forEach((p, i) => {
          expect(drawn, `${name} pick ${i}`).toContain(`"pick":${i}`);
          expect(p.title.length).toBeGreaterThan(3);
        });
      }
    }
  });
});
