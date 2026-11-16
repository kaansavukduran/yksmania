import { describe, expect, it, vi } from "vitest";
import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createHash } from "node:crypto";
import { sourceNarratives } from "../src/learning/narratives";
import { foundation013QuestionsByLesson } from "../src/learning/forge013FoundationQuestions";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  historyInterval026,
  historyYear026,
  militaryMatch026,
  politicsEvidence026,
  foundationBudget026,
  stratigraphy026,
  forge026HistoryGuides,
  forge026HistoryLessons,
  forge026HistoryLegacyIds,
  type HistoryEra026,
} from "../src/learning/forge026History";
const fixture = vi.hoisted(() => ({
  values: {} as Record<string, Record<string, unknown>>,
  writes: 0,
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: { explorations: fixture.values },
    update: (
      fn: (state: { explorations: typeof fixture.values }) => {
        explorations: typeof fixture.values;
      },
    ) => {
      fixture.values = fn({ explorations: fixture.values }).explorations;
      fixture.writes++;
      return Promise.resolve();
    },
  }),
}));
vi.mock("react", async (original) => ({
  ...(await original<typeof import("react")>()),
  useId: () => "history-test",
}));
import Lab, { historyDefaults026 } from "../src/learning/Forge026HistoryLab";
type Props = {
  children?: ReactNode;
  id?: string;
  disabled?: boolean;
  onChange?: (e: { target: { value: string; checked?: boolean } }) => void;
  onClick?: () => void;
  value?: unknown;
};
function nodes(tree: ReactNode): ReactElement<Props>[] {
  const result: ReactElement<Props>[] = [];
  Children.forEach(tree, (child) => {
    if (isValidElement<Props>(child)) {
      result.push(child);
      result.push(...nodes(child.props.children));
    }
  });
  return result;
}
function render(id: string) {
  const tree = Lab({ lessonId: id });
  return { html: renderToStaticMarkup(tree), nodes: nodes(tree) };
}
function control(id: string, tag: string, suffix?: string) {
  const found = render(id).nodes.find(
    (n) => n.type === tag && (!suffix || n.props.id?.endsWith(suffix)),
  );
  if (!found) throw Error(`Missing ${tag} ${suffix}`);
  return found;
}
const active = [
  ["file", "claim", "otherCause"],
  ["pay", "formation", "task"],
  ["profile", "income", "deed"],
  ["fromYear", "fromEra", "toYear", "toEra"],
  ["layer", "disturbed", "layerClaim"],
] as const;
const initialGuesses = [
  "destekli",
  "Birden çok aday",
  "Artan pay",
  "1",
  "destekli",
];

describe("026 Tarih: kanıt ve tarihsel zaman", () => {
  it("keeps the five original Lessons, 49 body sections and 35 actual questions byte stable", () => {
    const hashes = [
      "74479b994326538a27824c28d810455e3ee8607a81a3280e75cb4dfe0096db26",
      "87818920a7546a6cbd792a175493ced224c70b94117744fd73365cfd9cf0ec11",
      "545d4a0c223643992f2d0be8a903615b1e8a4ffa63f056f7957ef69da29c0f2c",
      "e075ba31c89e07859d9b87a551a1fcb71b86290a8796ffe206c18e6c341cbad6",
      "69549e383de6d5b9ddb466b5923739c671e4b51f5cbb28e37b71a9cc5dbf8307",
    ];
    for (const [i, id] of forge026HistoryLegacyIds.entries()) {
      const old = sourceNarratives.find((l) => l.id === id)!;
      const actual = {
        ...old,
        questions: foundation013QuestionsByLesson[id] ?? old.questions,
      };
      expect(
        createHash("sha256").update(JSON.stringify(actual)).digest("hex"),
      ).toBe(hashes[i]);
      expect(
        forge026HistoryGuides[i].sections
          .slice(0, old.body.length)
          .map((s) => s.title),
      ).toEqual(old.body.map((s) => s.title.tr));
    }
  });
  it("gives 65 self-contained original cards matched five-option guidance and balanced nonperiodic keys", () => {
    expect(forge026HistoryLessons.map((l) => l.questions.length)).toEqual([
      10, 10, 10, 15, 20,
    ]);
    for (const lesson of forge026HistoryLessons) {
      expect(lesson.id).toMatch(/-ileri$/);
      const counts = [0, 0, 0, 0, 0];
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(q.passage?.tr.length).toBeGreaterThan(80);
        expect(questionContentIssues(q)).toEqual([]);
        const h = questionGuidanceSchema.parse(q.guidance);
        expect(h.steps.length).toBeGreaterThanOrEqual(2);
        expect(h.steps.length).toBeLessThanOrEqual(4);
        expect(h.optionReasons).toHaveLength(5);
        counts[q.answer]++;
      }
      expect(new Set(counts).size).toBe(1);
      for (let period = 1; period <= 5; period++)
        expect(
          lesson.questions.every(
            (q, i, all) => i < period || q.answer === all[i - period].answer,
          ),
        ).toBe(false);
    }
  });
  it("separates temporal order, a documented contribution and an exclusive cause in all 18 files", () => {
    for (let f = 0; f < 3; f++)
      for (let c = 0; c < 3; c++)
        for (const other of [false, true]) {
          const expected =
            c === 0
              ? f === 2
                ? "çelişkili"
                : "destekli"
              : c === 1
                ? f === 2
                  ? "çelişkili"
                  : f === 1
                    ? "destekli"
                    : "kararsız"
                : other || f === 2
                  ? "çelişkili"
                  : "kararsız";
          expect(politicsEvidence026(f, c, other).state).toBe(expected);
        }
    const result = politicsEvidence026(1, 1, false);
    result.events[0].year = 1410;
    expect(politicsEvidence026(1, 1, false).events[0].year).toBe(1400);
  });
  it("checks all 150 budgets while keeping finance, authority and actual service separate", () => {
    const totals = [10, 13, 7];
    for (let p = 0; p < 3; p++)
      for (let income = 0; income <= 24; income++)
        for (const deed of [false, true]) {
          const result = foundationBudget026(p, income, deed);
          expect(result.total).toBe(totals[p]);
          expect(result.balance).toBe(income - totals[p]);
          expect(result.allocation.includes("izinli")).toBe(deed);
          expect(result.costs.reduce((sum, r) => sum + r.amount, 0)).toBe(
            totals[p],
          );
        }
    const result = foundationBudget026(0, 12, true);
    result.costs[0].amount = 6;
    expect(foundationBudget026(0, 12, true).costs[0].amount).toBe(3);
  });
  it("makes disturbed contexts and absent lower layers inconclusive rather than inventing a date", () => {
    for (let layer = 0; layer < 3; layer++)
      for (let claim = 0; claim < 3; claim++)
        for (const disturbed of [false, true]) {
          expect(stratigraphy026(layer, disturbed, claim).state).toBe(
            claim === 2
              ? "çelişkili"
              : claim === 1 || disturbed || layer === 0
                ? "kararsız"
                : "destekli",
          );
        }
  });
  it("rejects invalid model indexes, enums and boolean lookalikes", () => {
    for (const n of [-1, 3, 1.5, NaN, Infinity]) {
      expect(() => politicsEvidence026(n, 0, false)).toThrow(RangeError);
      expect(() => politicsEvidence026(0, n, false)).toThrow(RangeError);
      expect(() => foundationBudget026(n, 12, false)).toThrow(RangeError);
      expect(() => stratigraphy026(n, false, 0)).toThrow(RangeError);
      expect(() => stratigraphy026(0, false, n)).toThrow(RangeError);
    }
    for (const n of [-1, 25, 1.5, NaN, Infinity])
      expect(() => foundationBudget026(0, n, true)).toThrow(RangeError);
    expect(() =>
      politicsEvidence026(0, 0, "false" as unknown as boolean),
    ).toThrow(RangeError);
    expect(() => foundationBudget026(0, 12, 1 as unknown as boolean)).toThrow(
      RangeError,
    );
    expect(() => stratigraphy026(0, "false" as unknown as boolean, 0)).toThrow(
      RangeError,
    );
  });
  it("suppresses wrong-type restored answers using the actual hook and repairs every active field on the first fresh reason", () => {
    for (const [kind, id] of forge026HistoryLegacyIds.entries())
      for (const field of active[kind]) {
        const key = `forge026:history:${id}`;
        const bad =
          typeof historyDefaults026[field] === "boolean" ? "false" : "2";
        fixture.values = {
          [key]: {
            ...historyDefaults026,
            [field]: bad,
            reason: "Önceki bozuk seçimin gerekçesi.",
            guess: initialGuesses[kind],
            reveal: true,
          },
        };
        expect(render(id).html).not.toContain("data-model-result");
        expect(control(id, "textarea").props.value).toBe("");
        expect(control(id, "button").props.disabled).toBe(true);
        control(id, "textarea").props.onChange!({
          target: { value: "Yeni varsayılan veriyi yeniden inceledim." },
        });
        for (const keyField of active[kind])
          expect(typeof fixture.values[key][keyField]).toBe(
            typeof historyDefaults026[keyField],
          );
        expect(fixture.values[key].reveal).toBe(false);
        control(id, kind === 3 ? "input" : "select", "-guess").props.onChange!({
          target: { value: initialGuesses[kind] },
        });
        expect(control(id, "button").props.disabled).toBe(false);
        control(id, "button").props.onClick!();
        expect(render(id).html).toContain('data-compatible="true"');
      }
  });
  it("closes comparison for range corruption and edits, ignores unrelated corruption and bounds reasons", () => {
    for (const [kind, id] of forge026HistoryLegacyIds.entries()) {
      const key = `forge026:history:${id}`,
        field = active[kind][0];
      fixture.values = {
        [key]: {
          ...historyDefaults026,
          [field]: 9999,
          reason: "Eski gerekçe.",
          guess: initialGuesses[kind],
          reveal: true,
        },
      };
      expect(render(id).html).not.toContain("data-model-result");
      const unrelated = kind === 0 ? "layer" : "file";
      fixture.values = {
        [key]: {
          ...historyDefaults026,
          [unrelated]: "bad",
          reason: "Geçerli veriyi kullandım.",
          guess: initialGuesses[kind],
          reveal: true,
        },
      };
      expect(render(id).html).toContain("data-model-result");
      control(id, "textarea").props.onChange!({
        target: { value: "a".repeat(600) },
      });
      expect(String(fixture.values[key].reason)).toHaveLength(120);
      expect(render(id).html).not.toContain("data-model-result");
      control(id, "textarea").props.onChange!({ target: { value: "   " } });
      expect(control(id, "button").props.disabled).toBe(true);
    }
  });
  it("clears old reasoning and repairs all active choices when the first new action is a model selection", () => {
    for (const [kind, id] of forge026HistoryLegacyIds.entries()) {
      const key = `forge026:history:${id}`,
        field = active[kind][0];
      fixture.values = {
        [key]: {
          ...historyDefaults026,
          [field]: "2",
          reason: "Önceki gerekçe.",
          guess: initialGuesses[kind],
          reveal: true,
        },
      };
      control(id, kind === 3 ? "input" : "select", `-${field}`).props.onChange!(
        { target: { value: String(historyDefaults026[field] + 1) } },
      );
      expect(fixture.values[key][field]).toBe(historyDefaults026[field] + 1);
      expect(fixture.values[key].reason).toBe("");
      expect(fixture.values[key].guess).toBe("");
      expect(fixture.values[key].reveal).toBe(false);
      for (const activeField of active[kind])
        expect(typeof fixture.values[key][activeField]).toBe(
          typeof historyDefaults026[activeField],
        );
      expect(render(id).html).not.toContain("data-model-result");
    }
  });
  it("keeps payment, formation and job clues independent within the declared six-candidate table", () => {
    expect(
      militaryMatch026("ulufe", "süvari", "bilinmiyor").candidates.map(
        (c) => c.name,
      ),
    ).toEqual(["Kapıkulu sipahisi"]);
    expect(
      militaryMatch026("bilinmiyor", "bilinmiyor", "çarpışma").candidates.map(
        (c) => c.name,
      ),
    ).toEqual(["Yeniçeri", "Kapıkulu sipahisi", "Tımarlı sipahi"]);
    expect(
      militaryMatch026("dirlik", "piyade", "bilinmiyor").candidates,
    ).toEqual([]);
    expect(
      militaryMatch026("dirlik", "süvari", "cebelü").candidates.map(
        (c) => c.name,
      ),
    ).toEqual(["Tımarlı sipahi"]);
    expect(
      militaryMatch026("bilinmiyor", "bilinmiyor", "bilinmiyor").candidates,
    ).toHaveLength(6);
    const original = militaryMatch026("ulufe", "piyade", "top atışı");
    original.candidates[0].name =
      "changed" as (typeof original.candidates)[0]["name"];
    expect(
      militaryMatch026("ulufe", "piyade", "top atışı").candidates[0].name,
    ).toBe("Topçu");
    expect(() =>
      militaryMatch026("tahıl" as "ulufe", "piyade", "top atışı"),
    ).toThrow(RangeError);
  });
  it("changes the SVG with military clues, candidate reveal and disturbed layer context", () => {
    const militaryId = "osmanli-askeri-teskilat";
    const militaryKey = `forge026:history:${militaryId}`;
    const svg = (html: string) => html.match(/<svg[\s\S]*?<\/svg>/)?.[0] ?? "";
    fixture.values = {
      [militaryKey]: { ...historyDefaults026, pay: 1, formation: 1, task: 2 },
    };
    const first = svg(render(militaryId).html);
    expect(first).toContain("ulufe");
    expect(first).toContain("silah bakımı");
    expect(first).not.toContain("Cebeci");
    fixture.values[militaryKey] = {
      ...historyDefaults026,
      pay: 2,
      formation: 2,
      task: 5,
      guess: "Tek aday",
      reason: "Dirlik, süvari ve cebelü ipuçlarını birlikte kullandım.",
      reveal: true,
    };
    const second = svg(render(militaryId).html);
    expect(second).not.toBe(first);
    expect(second).toContain("dirlik");
    expect(second).toContain("Tımarlı sipahi");
    const layerId = "insanligin-ilk-donemleri";
    const layerKey = `forge026:history:${layerId}`;
    fixture.values = {
      [layerKey]: { ...historyDefaults026, layer: 0, disturbed: false },
    };
    const intact = svg(render(layerId).html);
    expect(intact).toContain('data-layer-selection="0"');
    expect(intact).not.toContain('data-later-pit="true"');
    expect(intact).toContain('cy="316"');
    fixture.values[layerKey] = {
      ...historyDefaults026,
      layer: 2,
      disturbed: true,
    };
    const disturbed = svg(render(layerId).html);
    expect(disturbed).not.toBe(intact);
    expect(disturbed).toContain('data-layer-selection="2"');
    expect(disturbed).toContain('data-later-pit="true"');
    expect(disturbed).toContain('cx="210" cy="68"');
    fixture.values = {};
  });

  it("places each year in an independently enumerated chronological century", () => {
    for (const era of ["MÖ", "MS"] as const) {
      for (let c = 1; c <= 40; c++) {
        const labels = Array.from({ length: 100 }, (_, i) =>
          era === "MS" ? (c - 1) * 100 + i + 1 : c * 100 - i,
        );
        for (const [index, year] of labels.entries()) {
          const actual = historyYear026(year, era);
          expect(actual.century).toBe(c);
          expect(actual.firstYear).toBe(labels[0]);
          expect(actual.lastYear).toBe(labels[99]);
          expect(actual.half).toBe(index < 50 ? 1 : 2);
          expect(actual.quarter).toBe(
            index < 25 ? 1 : index < 50 ? 2 : index < 75 ? 3 : 4,
          );
        }
      }
    }
    expect(historyYear026(2000, "MS").century).toBe(20);
    expect(historyYear026(2001, "MS").century).toBe(21);
  });

  it("counts adjacent historical year starts without inserting a year zero", () => {
    const sequence: [number, HistoryEra026][] = [
      [4, "MÖ"],
      [3, "MÖ"],
      [2, "MÖ"],
      [1, "MÖ"],
      [1, "MS"],
      [2, "MS"],
      [3, "MS"],
      [4, "MS"],
    ];
    for (const [i, from] of sequence.entries()) {
      for (const [j, to] of sequence.entries()) {
        const result = historyInterval026(...from, ...to);
        expect(result.intervals).toBe(Math.abs(j - i));
        expect(result.inclusiveYearLabels).toBe(Math.abs(j - i) + 1);
        expect(result.direction).toBe(
          j > i ? "ileri" : j < i ? "geri" : "aynı",
        );
      }
    }
  });

  it("rejects absent, zero, fractional and nonfinite years and unknown era names", () => {
    for (const bad of [0, -1, 4001, 1.5, NaN, Infinity]) {
      expect(() => historyYear026(bad, "MS")).toThrow(RangeError);
      expect(() => historyInterval026(1, "MÖ", bad, "MS")).toThrow(RangeError);
    }
    expect(() => historyYear026(1, "BC" as HistoryEra026)).toThrow(RangeError);
    expect(() => historyInterval026(1, "MÖ", 1, "CE" as HistoryEra026)).toThrow(
      RangeError,
    );
  });
});
