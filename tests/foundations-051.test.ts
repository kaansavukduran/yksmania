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

import { initialState } from "../src/domain/model";
import { validateState } from "../src/domain/storage";
import { foundationScore, foundationsMastered, recordFoundationAttempt } from "../src/domain/foundationAttempts";
import { evaluateTrophies } from "../src/domain/achievements";
import { resetLearningProgress } from "../src/domain/resetProgress";

describe("051 Temel İnşa ilk deneme kaydı ve kupası", () => {
  const lesson = foundationLessons[0];
  it("records only the first answer and keeps old states valid", () => {
    const old = initialState() as Record<string, unknown>;
    delete old.foundationAttempts;
    expect(validateState(old).foundationAttempts).toEqual({});
    let s = initialState();
    const wrong = (lesson.checks[0].answer + 1) % 5;
    s = recordFoundationAttempt(s, lesson.id, 0, wrong, "2026-11-20");
    s = recordFoundationAttempt(s, lesson.id, 0, lesson.checks[0].answer, "2026-11-20");
    expect(s.foundationAttempts[lesson.id]["0"]).toEqual({ selected: wrong, correct: false, date: "2026-11-20" });
    expect(foundationScore(s, lesson.id)).toEqual({ answered: 1, firstCorrect: 0 });
    expect(validateState(structuredClone(s))).toEqual(s);
    expect(recordFoundationAttempt(s, "yok", 0, 0, "2026-11-20")).toBe(s);
  });
  it("rejects forged attempts", () => {
    const s = initialState();
    s.foundationAttempts = { [lesson.id]: { "0": { selected: lesson.checks[0].answer, correct: false, date: "2026-11-20" } } };
    expect(() => validateState(s)).toThrow("INVALID_FOUNDATION_ATTEMPT");
    s.foundationAttempts = { yok: {} };
    expect(() => validateState(s)).toThrow("UNKNOWN_FOUNDATION");
  });
  it("awards the trophy only for whole lessons answered correctly on the first try, and reset clears it", () => {
    let s = initialState();
    for (const l of foundationLessons.slice(0, 3)) l.checks.forEach((c, i) => (s = recordFoundationAttempt(s, l.id, i, c.answer, "2026-11-20")));
    const other = foundationLessons[3];
    s = recordFoundationAttempt(s, other.id, 0, (other.checks[0].answer + 1) % 5, "2026-11-20");
    other.checks.slice(1).forEach((c, i) => (s = recordFoundationAttempt(s, other.id, i + 1, c.answer, "2026-11-20")));
    expect(foundationsMastered(s)).toBe(3);
    const t = evaluateTrophies(s, () => undefined).find((x) => x.id === "temel-insa")!;
    expect(t.value).toBe(3);
    expect(t.tier).toBe(1);
    expect(evaluateTrophies(s, () => undefined).find((x) => x.id === "soru-canavari")!.value).toBe(0);
    expect(resetLearningProgress(s).foundationAttempts).toEqual({});
  });
});
