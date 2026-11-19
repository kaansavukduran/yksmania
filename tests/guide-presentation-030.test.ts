import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { lessonGuides } from "../src/learning/guides";
import { clarifiedGuideView } from "../src/learning/guidePresentation028";
import { GuidedReading } from "../src/learning/GuidedReading";
import { resolveGuideStep } from "../src/learning/guides/position";
import expected from "./fixtures/virus-worked-030.json";
const fixture = vi.hoisted(() => ({ writes: vi.fn(), keys: [] as string[] }));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (key: string, defaults: Record<string, unknown>) => {
    fixture.keys.push(key);
    return [defaults, fixture.writes];
  },
}));
vi.mock("../src/learning/VisualLab", () => ({ VisualLab: () => null }));
const raw = lessonGuides.get("virusler")!;
const freeze = <T>(x: T): T => {
  if (x && typeof x === "object") {
    Object.values(x).forEach(freeze);
    Object.freeze(x);
  }
  return x;
};
const leaves = (a: unknown, b: unknown, p = ""): string[] => {
  if (a === b) return [];
  if (a && b && typeof a === "object" && typeof b === "object")
    return [...new Set([...Object.keys(a), ...Object.keys(b)])].flatMap((k) =>
      leaves(
        (a as Record<string, unknown>)[k],
        (b as Record<string, unknown>)[k],
        p ? `${p}/${k}` : k,
      ),
    );
  return [p];
};
const escape = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");
describe("030 capsid stock worked-example clarification", () => {
  it("changes only two leaves atomically and keeps original positions, answers and all raw guides intact", () => {
    expect(raw.examples[1]).toEqual(expected.before);
    const source = freeze(structuredClone(raw)),
      before = structuredClone(source),
      view = clarifiedGuideView(source);
    expect(leaves(source, view)).toEqual([
      "examples/1/prompt",
      "examples/1/steps/1/explanation",
    ]);
    expect(view.examples[1]).toEqual(expected.after);
    expect(source).toEqual(before);
    expect(view.sections).toBe(source.sections);
    expect(view.recall).toBe(source.recall);
    for (let i = 0; i < source.examples.length; i++)
      if (i !== 1) expect(view.examples[i]).toBe(source.examples[i]);
    expect(view.examples[1].steps[0]).toBe(source.examples[1].steps[0]);
    expect(view.examples[1].steps[2]).toBe(source.examples[1].steps[2]);
    expect(clarifiedGuideView(view)).toBe(view);
    for (let saved = 0; saved <= raw.sections.length + 3; saved++)
      for (const count of [0, raw.sections.length])
        expect(
          resolveGuideStep(view.id, saved, count, view.sections.length),
        ).toBe(resolveGuideStep(raw.id, saved, count, raw.sections.length));
    expect(lessonGuides.size).toBe(502);
  });
  it("does not mix old and new conditions after any known-field edit or missing/reordered step", () => {
    let rejected = 0;
    for (const field of [
      "title",
      "prompt",
      "strategy",
      "answer",
      "check",
      "pitfall",
    ] as const) {
      const q = structuredClone(raw);
      q.examples[1][field] += " Kişisel değişiklik";
      expect(clarifiedGuideView(q)).toBe(q);
      rejected++;
    }
    for (let i = 0; i < 3; i++)
      for (const field of ["label", "explanation", "expression"] as const) {
        const q = structuredClone(raw);
        q.examples[1].steps[i][field] += " Başka adım";
        expect(clarifiedGuideView(q)).toBe(q);
        rejected++;
      }
    const partial = structuredClone(raw);
    partial.examples[1].prompt = expected.after.prompt;
    expect(clarifiedGuideView(partial)).toBe(partial);
    const sparse = structuredClone(raw);
    delete sparse.examples[1].steps[1];
    expect(clarifiedGuideView(sparse)).toBe(sparse);
    const shorter = structuredClone(raw);
    shorter.examples[1].steps.pop();
    expect(clarifiedGuideView(shorter)).toBe(shorter);
    const longer = structuredClone(raw);
    longer.examples[1].steps.push({ ...longer.examples[1].steps[0] });
    expect(clarifiedGuideView(longer)).toBe(longer);
    const reordered = structuredClone(raw);
    [reordered.examples[0], reordered.examples[1]] = [
      reordered.examples[1],
      reordered.examples[0],
    ];
    expect(clarifiedGuideView(reordered)).toBe(reordered);
    const other = { ...raw, id: "personal-virusler" };
    expect(clarifiedGuideView(other)).toBe(other);
    expect(rejected).toBe(15);
  });
  it("keeps unknown annotations and custom step metadata by reference", () => {
    const note = { text: "Kendi notum" };
    const source = {
      ...raw,
      note,
      examples: raw.examples.map((e) => ({
        ...e,
        note,
        steps: e.steps.map((s) => ({ ...s, note })),
      })),
    };
    const view = clarifiedGuideView(source);
    expect(view.note).toBe(note);
    expect(view.examples[1].note).toBe(note);
    for (const s of view.examples[1].steps) expect(s.note).toBe(note);
  });
  it("exposes the complete experimental condition in the actual guided reader without learning writes", () => {
    const warn = vi.spyOn(console, "error");
    try {
      const html = renderToStaticMarkup(
        createElement(GuidedReading, { guide: clarifiedGuideView(raw) }),
      );
      expect(html).toContain(escape(expected.after.prompt));
      expect(html).not.toContain(escape(expected.before.prompt));
      expect(html).toContain("İlk adımı göster");
      expect(html).toContain("Çözümün tamamını göster");
      expect(fixture.keys).toContain("guide:virusler");
      expect(fixture.writes).not.toHaveBeenCalled();
      expect(warn).not.toHaveBeenCalled();
    } finally {
      warn.mockRestore();
    }
  });
});

import plantsExpected from "./fixtures/plants-worked-030.json";
import previousViews from "./fixtures/source-stage-029-guide-views.json";
import { createHash } from "node:crypto";
const canonical = (x: unknown): unknown =>
  Array.isArray(x)
    ? x.map(canonical)
    : x && typeof x === "object"
      ? Object.fromEntries(
          Object.entries(x)
            .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
            .map(([k, v]) => [k, canonical(v)]),
        )
      : x;
const digest = (x: unknown) =>
  createHash("sha256")
    .update(JSON.stringify(canonical(x)))
    .digest("hex");
describe("030 plant life-history worked conditions", () => {
  it("changes only two plant prompts, retaining raw examples, all answers and reading positions", () => {
    const raw = freeze(structuredClone(lessonGuides.get("bitkiler")!)),
      before = structuredClone(raw),
      view = clarifiedGuideView(raw);
    expect(leaves(raw, view)).toEqual([
      "examples/0/prompt",
      "examples/3/prompt",
    ]);
    for (const row of plantsExpected) {
      expect(raw.examples[row.index]).toEqual(row.before);
      expect(view.examples[row.index]).toEqual(row.after);
      expect(view.examples[row.index].steps).toBe(
        raw.examples[row.index].steps,
      );
    }
    for (const i of [1, 2]) expect(view.examples[i]).toBe(raw.examples[i]);
    expect(view.sections).toBe(raw.sections);
    expect(view.recall).toBe(raw.recall);
    expect(raw).toEqual(before);
    expect(clarifiedGuideView(view)).toBe(view);
  });
  it("gates each complete original plant example independently of the other legitimate correction", () => {
    const source = lessonGuides.get("bitkiler")!;
    for (const row of plantsExpected) {
      for (const field of [
        "title",
        "prompt",
        "strategy",
        "answer",
        "check",
        "pitfall",
      ] as const) {
        const q = structuredClone(source);
        q.examples[row.index][field] += " Kişisel metin";
        const shown = clarifiedGuideView(q);
        expect(shown.examples[row.index]).toBe(q.examples[row.index]);
      }
      for (let i = 0; i < 3; i++)
        for (const field of ["label", "explanation", "expression"] as const) {
          const q = structuredClone(source);
          q.examples[row.index].steps[i][field] += " Başka adım";
          expect(clarifiedGuideView(q).examples[row.index]).toBe(
            q.examples[row.index],
          );
        }
      const partial = structuredClone(source);
      partial.examples[row.index].prompt = row.after.prompt;
      expect(clarifiedGuideView(partial).examples[row.index]).toBe(
        partial.examples[row.index],
      );
      const missing = structuredClone(source);
      missing.examples[row.index].steps.pop();
      expect(clarifiedGuideView(missing).examples[row.index]).toBe(
        missing.examples[row.index],
      );
    }
  });
  it("preserves all480 original guides and every accepted029 view outside the three explicitly revised guides", () => {
    expect(previousViews).toHaveLength(480);
    let oldViews = 0;
    for (const previous of previousViews) {
      const guide = lessonGuides.get(previous.id)!;
      expect(digest(guide), previous.id).toBe(previous.rawSHA256);
      if (!["virusler", "bitkiler", "dalgalara-giris"].includes(previous.id)) {
        expect(digest(clarifiedGuideView(guide)), previous.id).toBe(
          previous.viewSHA256,
        );
        oldViews++;
      }
    }
    expect(oldViews).toBe(477);
  });
});

import waveExpected from "./fixtures/wave-guide-030.json";
describe("030 harmonic-wave model scope in linked teaching", () => {
  it("clarifies exactly four visible leaves and preserves every raw answer, step and guide position", () => {
    const source = freeze(
        structuredClone(lessonGuides.get("dalgalara-giris")!),
      ),
      before = structuredClone(source),
      view = clarifiedGuideView(source);
    expect(leaves(source, view)).toEqual([
      "sections/3/paragraphs/0",
      "sections/4/paragraphs/1",
      "examples/1/prompt",
      "recall/1/prompt",
    ]);
    for (const change of waveExpected.paragraphs) {
      expect(source.sections[change.outer].paragraphs[change.inner]).toBe(
        change.before,
      );
      expect(view.sections[change.outer].paragraphs[change.inner]).toBe(
        change.after,
      );
    }
    expect(source.examples[1]).toEqual(waveExpected.worked.before);
    expect(view.examples[1]).toEqual({
      ...waveExpected.worked.before,
      prompt: waveExpected.worked.prompt,
    });
    expect(view.examples[1].steps).toBe(source.examples[1].steps);
    expect(source.recall[1]).toEqual(waveExpected.recall.before);
    expect(view.recall[1]).toEqual({
      ...waveExpected.recall.before,
      prompt: waveExpected.recall.prompt,
    });
    for (let i = 0; i < source.examples.length; i++)
      if (i !== 1) expect(view.examples[i]).toBe(source.examples[i]);
    for (let i = 0; i < source.recall.length; i++)
      if (i !== 1) expect(view.recall[i]).toBe(source.recall[i]);
    expect(source).toEqual(before);
    expect(clarifiedGuideView(view)).toBe(view);
  });
  it("rejects complete-example drift and personal recall changes without overwriting the other independent clarification", () => {
    const source = lessonGuides.get("dalgalara-giris")!;
    for (const field of [
      "title",
      "prompt",
      "strategy",
      "answer",
      "check",
      "pitfall",
    ] as const) {
      const q = structuredClone(source);
      q.examples[1][field] += " Kendi değişikliğim";
      expect(clarifiedGuideView(q).examples[1]).toBe(q.examples[1]);
    }
    for (let i = 0; i < 3; i++)
      for (const field of ["label", "explanation", "expression"] as const) {
        const q = structuredClone(source);
        q.examples[1].steps[i][field] += " Kendi adımım";
        expect(clarifiedGuideView(q).examples[1]).toBe(q.examples[1]);
      }
    for (const field of ["prompt", "answer"] as const) {
      const q = structuredClone(source);
      q.recall[1][field] += " Kendi yanıtım";
      expect(clarifiedGuideView(q).recall).toBe(q.recall);
      expect(clarifiedGuideView(q).examples[1].prompt).toBe(
        waveExpected.worked.prompt,
      );
    }
    const empty = { ...source, recall: [] };
    expect(clarifiedGuideView(empty).recall).toBe(empty.recall);
    const note = { text: "Kişisel hatırlama notu" };
    const custom = {
      ...source,
      recall: source.recall.map((q) => ({ ...q, note })),
    };
    expect(clarifiedGuideView(custom).recall[1].note).toBe(note);
  });
  it("exhibits equal-height consecutive global maxima that are only half the fundamental wavelength apart", () => {
    const L = 1.6,
      k = (2 * Math.PI) / L;
    const signal = (u: number) =>
      Math.cos(2 * k * u) + 0.5 * Math.sin(k * u) ** 3;
    expect(signal(0)).toBeCloseTo(1, 12);
    expect(signal(L / 2)).toBeCloseTo(1, 12);
    expect(signal(L / 4)).toBeCloseTo(-0.5, 12);
    expect(signal((3 * L) / 4)).toBeCloseTo(-1.5, 12);
    for (let i = 0; i <= 128; i++)
      expect(signal((L * i) / 128)).toBeLessThanOrEqual(1 + 1e-12);
    expect(signal(L / 4)).not.toBeCloseTo(signal((3 * L) / 4));
    // y=1+sin²(a)(-2+0.5sin(a)) <=1, with a different trough in each half-cycle.
    // Therefore two equal global peaks do not prove a sinusoid or its wavelength.
    expect(1.1 - 0.3).toBeCloseTo(0.8, 12);
    const harmonic = (x: number) => Math.cos((2 * Math.PI * (x - 0.3)) / 0.8);
    for (const x of [0.3, 1.1, 1.9]) expect(harmonic(x)).toBeCloseTo(1, 12);
    expect((2 - 0.2) / 3).toBeCloseTo(0.6, 12);
    expect(0.6 * 5).toBe(3);
  });
});
