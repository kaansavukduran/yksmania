import { createHash } from "node:crypto";
import { PassThrough } from "node:stream";
import { Children, createElement, isValidElement, type ReactNode } from "react";
import { renderToPipeableStream, renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { initialState, type AppState } from "../src/domain/model";
import { xp } from "../src/domain/scheduler";
import { narrativePacks } from "../src/learning/narratives";
import { lessonGuides } from "../src/learning/guides";
import { clarifiedGuideView } from "../src/learning/guidePresentation028";
import { GuidedReading } from "../src/learning/GuidedReading";
import { NarrativeRecall } from "../src/learning/NarrativeExplorer";
import { Theory } from "../src/pages/Theory";

// Actual useExploration and recall components; only their provider state is controlled.
const fixture = vi.hoisted(() => ({
  state: undefined as unknown as AppState,
  updates: 0,
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: fixture.state,
    update: async (fn: (state: AppState) => AppState) => {
      fixture.updates++;
      fixture.state = fn(fixture.state);
    },
    l: (value: { tr: string }) => value.tr,
    t: (key: string) =>
      ({ note: "Notun", studyNotes: "Çalışma notları" })[
        key as "note" | "studyNotes"
      ] ?? key,
  }),
}));
// These siblings do not participate in recall placement, rendering or saved records.
vi.mock("../src/learning/VisualLab", () => ({ VisualLab: () => null }));
vi.mock("../src/components/Aion", () => ({ Aion: () => null }));
vi.mock("../src/components/StudyTimer", () => ({ StudyTimer: () => null }));
vi.mock("../src/components/LearningReviews", () => ({
  TheoryReviewAction: () => null,
}));
vi.mock("../src/components/StudyPlanning", () => ({
  TopicCompletion: () => null,
}));

const rawGuides = narrativePacks.map((pack) => lessonGuides.get(pack.id)!);
const guides = rawGuides.map((guide) => clarifiedGuideView(guide)!);
const sha = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
const escape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");
const htmlText = (html: string) => html.replace(/<!--.*?-->/g, "");
const recallRecords = () =>
  Object.fromEntries(
    narrativePacks.map((pack) => [
      `recall:${pack.id}`,
      {
        index: 1,
        open: false,
        attempt0: `Önceki ilk açıklamam: ${pack.id}`,
        attempt1: `Önceki ikinci açıklamam: ${pack.id}`,
        futureField: "Korunacak ek veri",
      },
    ]),
  );
function seed(id: string, guided: boolean, step: number) {
  const guide = guides.find((item) => item.id === id)!;
  fixture.state.explorations[`guide:${id}`] = {
    guided,
    step,
    sectionCount: guide.sections.length,
  };
}
function renderGuide(index: number) {
  const pack = narrativePacks[index];
  return htmlText(
    renderToStaticMarkup(
      createElement(GuidedReading, {
        guide: guides[index],
        recallSupplement: createElement(NarrativeRecall, { id: pack.id }),
      }),
    ),
  );
}
function native(
  tree: ReactNode,
  tag: string,
  label?: string,
): Record<string, any> {
  let found: Record<string, any> | undefined;
  function text(value: ReactNode): string {
    return Children.toArray(value)
      .map((child) =>
        isValidElement<{ children?: ReactNode }>(child)
          ? text(child.props.children)
          : String(child),
      )
      .join("");
  }
  function walk(value: ReactNode) {
    Children.forEach(value, (child) => {
      if (!isValidElement<Record<string, any>>(child)) return;
      if (child.type === tag && (label === undefined || text(child) === label))
        found = child.props;
      if (!found) walk(child.props.children);
    });
  }
  walk(tree);
  expect(found, `native ${tag} ${label ?? ""}`).toBeDefined();
  return found!;
}
async function renderReady(tree: ReactNode): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    let html = "";
    output.on("data", (chunk) => (html += chunk.toString()));
    output.on("end", () => resolve(htmlText(html)));
    output.on("error", reject);
    const stream = renderToPipeableStream(tree, {
      onAllReady: () => stream.pipe(output),
      onError: reject,
    });
  });
}
function noLearningCredit() {
  expect(fixture.state.sessions).toEqual([]);
  expect(fixture.state.reviews).toEqual([]);
  expect(fixture.state.theoryReviewCompletions).toEqual([]);
  expect(fixture.state.topicProgress).toEqual({});
  expect(xp(fixture.state)).toBe(0);
}

beforeEach(() => {
  fixture.state = initialState();
  fixture.state.explorations = recallRecords();
  fixture.updates = 0;
});

describe("029 narrative recall continuity inside enriched guides", () => {
  it("retains all31 original packs,62 recall questions,96 pitfalls and191 current guide recalls", () => {
    expect(narrativePacks).toHaveLength(31);
    expect(narrativePacks.reduce((n, p) => n + p.recall.length, 0)).toBe(62);
    expect(narrativePacks.reduce((n, p) => n + p.pitfalls.length, 0)).toBe(96);
    expect(rawGuides.reduce((n, g) => n + g.recall.length, 0)).toBe(191);
    expect(sha(narrativePacks)).toBe(
      "52edcce807f2e53f3048f7e117df1ffb437069e114ca083740f075aa7eae55ef",
    );
    expect(sha(rawGuides)).toBe(
      "e7aba90f4fab2e9ff09450027adfbdabfddef1dc4d50d583fc1e951d7e16fc67",
    );
  });

  it("keeps the optional-slot-free guide contract and never dispatches while reading", () => {
    const before = structuredClone(fixture.state);
    for (const guide of guides) {
      const html = renderToStaticMarkup(
        createElement(GuidedReading, { guide }),
      );
      expect(html).not.toContain('class="narrative-recall"');
      for (const item of guide.recall) {
        expect(html).toContain(escape(item.prompt));
        expect(html).toContain(escape(item.answer));
      }
    }
    expect(fixture.updates).toBe(0);
    expect(fixture.state).toEqual(before);
  });

  it("hides old recall and pitfalls during teaching and worked-example stages for all31 IDs", () => {
    for (const [i, pack] of narrativePacks.entries()) {
      for (const step of [0, guides[i].sections.length]) {
        seed(pack.id, true, step);
        const before = structuredClone(fixture.state);
        const html = renderGuide(i);
        expect(html).not.toContain('class="narrative-recall"');
        expect(html).not.toContain('class="narrative-pitfalls"');
        expect(html).not.toContain("Hatırlama alanı açılıyor");
        expect(fixture.state).toEqual(before);
      }
    }
    expect(fixture.updates).toBe(0);
    noLearningCredit();
  });

  it("renders every current guide recall plus the exact saved second legacy question only at final stage", () => {
    for (const [i, pack] of narrativePacks.entries()) {
      seed(pack.id, true, guides[i].sections.length + 1);
      const before = structuredClone(fixture.state);
      const html = renderGuide(i);
      expect(html.match(/class="narrative-recall"/g)).toHaveLength(1);
      expect(html.match(/class="narrative-pitfalls"/g)).toHaveLength(1);
      expect(html.match(/<h2>Bakmadan hatırla<\/h2>/g)).toHaveLength(1);
      expect(html).toContain("Hatırlama 1");
      expect(html).toContain("Hatırlama 2");
      expect(html).toContain(escape(pack.recall[1].prompt));
      expect(html).toContain(escape(`Önceki ikinci açıklamam: ${pack.id}`));
      expect(html).not.toContain('class="recall-explanation"');
      for (const item of guides[i].recall) {
        expect(html).toContain(escape(item.prompt));
        expect(html).toContain(escape(item.answer));
      }
      for (const item of pack.pitfalls) {
        expect(html).toContain(escape(item.label));
        expect(html).toContain(escape(item.reason));
      }
      expect(fixture.state).toEqual(before);
    }
    expect(fixture.updates).toBe(0);
    noLearningCredit();
  });

  it("restores both62 saved legacy prompts,answers and attempts in the full-reading layout", () => {
    for (const [i, pack] of narrativePacks.entries()) {
      seed(pack.id, false, 0);
      for (const index of [0, 1]) {
        Object.assign(fixture.state.explorations[`recall:${pack.id}`], {
          index,
          open: true,
        });
        const before = structuredClone(fixture.state);
        const html = renderGuide(i);
        expect(html).toContain(escape(pack.recall[index].prompt));
        expect(html).toContain(escape(pack.recall[index].answer));
        expect(html).toContain(
          escape(`Önceki ${index ? "ikinci" : "ilk"} açıklamam: ${pack.id}`),
        );
        expect(html).toContain('class="recall-explanation"');
        expect(fixture.state).toEqual(before);
      }
    }
    expect(fixture.updates).toBe(0);
    noLearningCredit();
  });

  it("actual recall callbacks preserve all31 old keys and both attempts without learning credit", async () => {
    for (const [i, pack] of narrativePacks.entries()) {
      fixture.state = initialState();
      fixture.state.explorations = recallRecords();
      seed(pack.id, true, guides[i].sections.length + 1);
      const key = `recall:${pack.id}`;
      fixture.state.explorations[key].index = 0;
      const before = structuredClone(fixture.state);
      const calls = fixture.updates;
      native(
        NarrativeRecall({ id: pack.id }),
        "button",
        "Hatırlama 2",
      ).onClick();
      expect(fixture.updates).toBe(calls + 1);
      expect(fixture.state.explorations[key]).toEqual({
        ...before.explorations[key],
        index: 1,
        open: false,
      });
      const attempt = `Yeni ikinci açıklamam: ${pack.id}`;
      native(NarrativeRecall({ id: pack.id }), "textarea").onChange({
        target: { value: attempt },
      });
      native(
        NarrativeRecall({ id: pack.id }),
        "button",
        "Gerekçeyi göster",
      ).onClick();
      expect(fixture.updates).toBe(calls + 3);
      expect(fixture.state.explorations[key]).toEqual({
        ...before.explorations[key],
        index: 1,
        open: true,
        attempt1: attempt,
      });
      for (const [other, record] of Object.entries(before.explorations))
        if (other !== key)
          expect(fixture.state.explorations[other]).toEqual(record);
      // A fresh provider snapshot, not an IndexedDB/browser acceptance claim.
      fixture.state = structuredClone(fixture.state);
      const html = renderGuide(i);
      expect(html).toContain(escape(pack.recall[1].prompt));
      expect(html).toContain(escape(pack.recall[1].answer));
      expect(html).toContain(escape(attempt));
      expect(fixture.state.notes).toEqual(before.notes);
      noLearningCredit();
    }
  });

  it("actual Theory lazy-loads old recall exactly once at final stage and leaves it absent early", async () => {
    const before = structuredClone(fixture.state);
    for (const [i, pack] of narrativePacks.entries()) {
      seed(pack.id, true, 0);
      const early = await renderReady(
        createElement(Theory, {
          id: pack.id,
          practice: () => {},
          navigate: () => {},
        }),
      );
      expect(early).not.toContain('class="narrative-recall"');
      expect(early).not.toContain('class="narrative-pitfalls"');
      seed(pack.id, true, guides[i].sections.length + 1);
      const html = await renderReady(
        createElement(Theory, {
          id: pack.id,
          practice: () => {},
          navigate: () => {},
        }),
      );
      expect(html.match(/class="narrative-recall"/g)).toHaveLength(1);
      expect(html).toContain(escape(pack.recall[1].prompt));
      expect(html).toContain(escape(`Önceki ikinci açıklamam: ${pack.id}`));
    }
    for (const pack of narrativePacks)
      expect(fixture.state.explorations[`recall:${pack.id}`]).toEqual(
        before.explorations[`recall:${pack.id}`],
      );
    expect(fixture.updates).toBe(0);
    noLearningCredit();
  });
});
