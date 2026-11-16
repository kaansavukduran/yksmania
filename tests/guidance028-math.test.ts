import { createHash } from "node:crypto";
import { Children, createElement, isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance028Math.json";
import { visualLessons } from "../src/learning/lessons";
import { aytLessons } from "../src/learning/aytLessons";
import { mathLessons } from "../src/learning/mathLessons";
import { foundation013QuestionsByLesson } from "../src/learning/forge013FoundationQuestions";
import { factorizationQuestions } from "../src/learning/factorizationLesson";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";

// Stage only these new catalogue rows for the real identity resolver/renderer.
// Public runtime registration belongs to the integration owner.
vi.mock(
  "../src/learning/questionHelpCatalogue.json",
  async (importOriginal) => {
    const original = await importOriginal<{
      default: { id: string; identity: string; guidance: unknown }[];
    }>();
    return {
      default: [
        ...original.default.filter(
          (old) => !rows.some((row) => row.id === old.id),
        ),
        ...rows,
      ],
    };
  },
);

const basicIds = [
  "temel-kavramlar",
  "tek-cift-isaret",
  "ardisik-sayilar",
  "asal-sayilar",
  "faktoriyel",
];
const raw = [
  ...visualLessons.find((lesson) => lesson.id === "alan-donusumleri")!
    .questions,
  ...aytLessons.find((lesson) => lesson.id === "turev-teget")!.questions,
  ...basicIds.flatMap(
    (id) => mathLessons.find((lesson) => lesson.id === id)!.questions,
  ),
  ...foundation013QuestionsByLesson["birinci-dereceden-denklemler"],
  ...foundation013QuestionsByLesson["basit-esitsizlikler"],
  ...factorizationQuestions,
];
const questions: HelpQuestion[] = raw.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((option) => option.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
}));
const byId = new Map(questions.map((q) => [q.id, q]));
function stable(value: unknown): unknown {
  return Array.isArray(value)
    ? value.map(stable)
    : value && typeof value === "object"
      ? Object.fromEntries(
          Object.keys(value)
            .sort()
            .map((key) => [
              key,
              stable((value as Record<string, unknown>)[key]),
            ]),
        )
      : value;
}
const rawSHA = () =>
  createHash("sha256")
    .update(JSON.stringify(stable(raw)))
    .digest("hex");
const baselineSHA =
  "82904f1d8ae2f0adb68b4efc8ce64c3e2544e4c9b0e7b8b23958e41d760ff39c";
const escaped = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");
const choice = (id: string, result: string | number) => {
  const q = byId.get(id)!;
  const label =
    typeof result === "number" ? String(result).replaceAll("-", "−") : result;
  expect(q.options.filter((option) => option === label)).toHaveLength(1);
  expect(q.options[q.answer]).toBe(label);
};
const eqId = (n: number) => `f013-foundation-birinci-dereceden-denklemler-${n}`;
const ineId = (n: number) => `f013-foundation-basit-esitsizlikler-${n}`;
const factorial = (n: number): bigint => {
  let product = 1n;
  for (let i = 2; i <= n; i++) product *= BigInt(i);
  return product;
};
const prime = (n: number) => {
  if (n < 2 || !Number.isInteger(n)) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
};
const polygonArea = (points: [number, number][]) =>
  Math.abs(
    points.reduce((sum, [x, y], i) => {
      const next = points[(i + 1) % points.length];
      return sum + x * next[1] - y * next[0];
    }, 0),
  ) / 2;

describe("028 immutable actual mathematics cohort", () => {
  it("retains all65 original payloads,255 choices and exact identities", () => {
    expect(raw).toHaveLength(65);
    expect(rawSHA()).toBe(baselineSHA);
    expect(questions.filter((q) => q.options.length === 3)).toHaveLength(35);
    expect(questions.filter((q) => q.options.length === 5)).toHaveLength(30);
    expect(rows.map((row) => row.id)).toEqual(questions.map((q) => q.id));
    expect(new Set(rows.map((row) => row.id)).size).toBe(65);
    for (const row of rows) {
      const q = byId.get(row.id)!;
      expect(row.identity).toBe(questionIdentity(q));
      expect(q.guidance).toBeUndefined();
      expect(resolvedGuidance(q)).toEqual(row.guidance);
    }
  });
  it("adds separate positive knowledge,concrete methods,195 steps and255 aligned reasons", () => {
    expect(rows.reduce((n, r) => n + r.guidance.knowledge.length, 0)).toBe(130);
    expect(rows.reduce((n, r) => n + r.guidance.steps.length, 0)).toBe(195);
    expect(rows.reduce((n, r) => n + r.guidance.optionReasons.length, 0)).toBe(
      255,
    );
    expect(new Set(rows.map((r) => r.guidance.strategy)).size).toBe(65);
    for (const row of rows) {
      const q = byId.get(row.id)!;
      const g = questionGuidanceSchema.parse(row.guidance);
      expect(g).toEqual(row.guidance);
      expect(g.steps).toHaveLength(3);
      expect(new Set(g.steps).size).toBe(3);
      expect(new Set(g.knowledge).size).toBe(g.knowledge.length);
      expect(g.steps).not.toContain(g.strategy);
      expect(g.knowledge).not.toContain(g.strategy);
      expect(g.strategy).not.toBe(q.hint);
      expect(g.strategy).not.toBe(q.explanation);
      expect(g.optionReasons).toHaveLength(q.options.length);
      expect(
        g.optionReasons.filter((text) => text.startsWith("Doğru.")),
      ).toHaveLength(1);
      expect(g.optionReasons[q.answer]).toMatch(/^Doğru\./);
      for (const step of g.steps) {
        expect(step).not.toBe(q.hint);
        expect(step).not.toBe(q.explanation);
      }
    }
    // Two historically equivalent WRONG distractors remain exactly as saved.
    // A new meaning must never be substituted for those old selections.
    const q = byId.get("factr-8")!;
    expect(q.options[1]).toBe("(x−2)(x−3)(x+3)");
    expect(q.options[4]).toBe("(x−2)(x²−9)");
    expect(q.answer).toBe(3);
  });
});

describe("independent finite,numeric and algebra checks of old keys", () => {
  it("checks geometry by coordinates and derivative values by separate quotients", () => {
    const triangle: [number, number][] = [
      [0, 0],
      [8, 0],
      [0, 5],
    ];
    const parallelogram: [number, number][] = [
      [0, 0],
      [8, 0],
      [10, 5],
      [2, 5],
    ];
    choice("area-1", `${polygonArea(triangle)} birim²`);
    choice("area-2", `${polygonArea(parallelogram)} birim²`);
    const doubled: [number, number][] = [
      [0, 0],
      [8, 0],
      [0, 10],
    ];
    expect(polygonArea(doubled) / polygonArea(triangle)).toBe(2);
    choice("area-3", "İki katına çıkar.");
    const piece: [number, number][] = [
      [0, 0],
      [2, 0],
      [2, 5],
    ];
    const moved = piece.map(([x, y]): [number, number] => [x + 8, y - 3]);
    expect(polygonArea(piece)).toBe(polygonArea(moved));
    choice("area-4", "Korunur.");
    expect(8 * 0 + 0 * 5).toBe(0);
    choice("area-5", "Seçilen tabana dik uzaklık");
    choice("dt-1", String((6.25 - 4) / (2.5 - 2)).replace(".", ","));
    for (const h of [-0.5, -0.25, 0.25, 0.5])
      expect(((2 + h) ** 2 - 4) / h).toBe(4 + h);
    choice("dt-2", 4);
    choice("dt-3", ((-1 + 0.5) ** 2 - (-1 - 0.5) ** 2) / 1);
    expect(Math.abs(-0.5) / -0.5).toBe(-1);
    expect(Math.abs(0.5) / 0.5).toBe(1);
    choice("dt-4", "Fonksiyon sürekli olsa da bu noktada türev yoktur.");
    expect(Number.isNaN((0 - 0) / 0)).toBe(true);
    choice(
      "dt-5",
      "h ≠ 0 değerleriyle yaklaşılır; iki yönün ortak limiti kontrol edilir.",
    );
  });
  it("enumerates digit,parity,sequence,prime and factorial conclusions", () => {
    expect(Math.sqrt(49)).toBe(7);
    choice("bas-1", "Doğal, tam, rasyonel ve gerçektir.");
    const numbers = [];
    for (let a = 1; a <= 9; a++)
      for (let b = 0; b <= 9; b++) if (a !== b) numbers.push(10 * a + b);
    choice("bas-2", Math.max(...numbers));
    choice("bas-3", (15 / 3) * 2);
    expect(-2 + 2).toBe(0);
    for (const x of [-9, -1, 0, 2, 10]) expect((3 * x + 6) / (x + 2)).toBe(3);
    choice("bas-4", "x ≠ −2 iken");
    choice("bas-5", Math.sqrt((-7) ** 2));
    expect(-8 % 2 === 0 && -8 < 0).toBe(true);
    choice("par-1", "Negatif ve çift");
    expect([-(3 ** 2), (-3) ** 2]).toEqual([-9, 9]);
    choice("par-2", "−9 ve 9");
    expect([6 / 2, 8 / 2, 2 / 4]).toEqual([3, 4, 0.5]);
    choice("par-3", "Tek, çift veya tam sayı olmayan sonuç verebilir.");
    expect(-2 * -3 * 0 === 0).toBe(true);
    choice("par-4", "Sıfır");
    expect(0 % 2 === 0 && !(0 > 0) && !(0 < 0)).toBe(true);
    choice("par-5", "Çifttir; ne pozitif ne negatiftir.");
    choice("seq-1", -5 + 4 * 2);
    choice(
      "seq-2",
      Array.from({ length: 40 }, (_, i) => i).filter(
        (x) => x >= 4 && x <= 28 && (x - 4) % 3 === 0,
      ).length,
    );
    choice(
      "seq-3",
      [6, 10, 14, 18, 22, 26, 30].reduce((a, b) => a + b),
    );
    const starts = Array.from({ length: 101 }, (_, i) => i - 50).filter(
      (a) => a % 2 === 0 && a + (a + 2) + (a + 4) === 42,
    );
    expect(starts).toHaveLength(1);
    choice("seq-4", starts[0]);
    const mean = [3, 4, 5, 6].reduce((a, b) => a + b) / 4;
    expect(mean).toBe(4.5);
    expect([3, 4, 5, 6]).not.toContain(mean);
    choice("seq-5", "4,5’tir ve listede bir terim değildir.");
    expect(prime(1)).toBe(false);
    choice("pri-1", "Ne asal ne bileşiktir.");
    expect(
      Array.from({ length: 101 }, (_, n) => n).filter(
        (n) => n % 2 === 0 && prime(n),
      ),
    ).toEqual([2]);
    choice("pri-2", 2);
    expect(7 ** 2).toBe(49);
    expect(prime(49)).toBe(false);
    choice("pri-3", 7);
    choice(
      "pri-4",
      Array.from({ length: 84 }, (_, i) => i + 1).filter(
        (p) => prime(p) && 84 % p === 0,
      ).length,
    );
    const pairs = Array.from({ length: 22 }, (_, a) => [a, 21 - a]).filter(
      ([a, b]) => a <= b && prime(a) && prime(b),
    );
    expect(pairs).toEqual([[2, 19]]);
    choice("pri-5", pairs[0][0] * pairs[0][1]);
    const arrangements = new Set<string>();
    for (const a of "ABC")
      for (const b of "ABC")
        for (const c of "ABC")
          if (new Set([a, b, c]).size === 3) arrangements.add(a + b + c);
    choice("fac-1", arrangements.size);
    choice("fac-2", String(factorial(9) / factorial(7)));
    choice("fac-3", String((factorial(7) + factorial(6)) / factorial(6)));
    expect(
      Array.from({ length: 12 }, (_, n) => n).filter(
        (n) => factorial(n) === 1n,
      ),
    ).toEqual([0, 1]);
    choice("fac-4", "0 ve 1");
    choice("fac-5", factorial(35).toString().match(/0+$/)![0].length);
  });
  it("checks equation roots and separately proves parameter and identity cases", () => {
    const left = (x: number) => 5 - 2 * (x - 3);
    expect([2, -2, 1, 3, 10].filter((x) => left(x) === 3 * x + 1)).toEqual([2]);
    choice(eqId(1), 2);
    expect((2 * (34 / 5) - 1) / 3 - (34 / 5 + 2) / 4).toBeCloseTo(2, 13);
    choice(eqId(2), "34/5");
    expect(13 / 3).not.toBe(2);
    expect((13 / 3 + 5) / (13 / 3 - 2)).toBeCloseTo(4, 13);
    choice(eqId(3), "{13/3}");
    for (const x of [-9, -2, 0, 2, 4, 100]) {
      expect(6 * (x - 2) - (6 * x - 12)).toBe(0);
      expect(4 * (x + 1) - (4 * x - 3)).toBe(7);
    }
    choice(eqId(4), "ℝ");
    choice(eqId(5), "∅");
    for (let k = -10; k <= 10; k++)
      for (let x = -10; x <= 10; x++) {
        expect((k + 2) * x === k + 2).toBe(k === -2 || x === 1);
        if (k === 4) expect((k - 4) * x === 8).toBe(false);
      }
    choice(eqId(6), "k=−2 ise ÇK=ℝ; k≠−2 ise ÇK={1}.");
    choice(eqId(7), 4);
    for (const k of [-4, 0, 2, 8]) expect((k - 4) * (8 / (k - 4))).toBe(8);
    for (const x of [-10, 0, 1, 2, 4, 100]) expect((x - 3) / (x - 3)).toBe(1);
    expect(Number.isNaN((3 - 3) / (3 - 3))).toBe(true);
    choice(eqId(8), "ℝ∖{3}");
    const counts = Array.from({ length: 17 }, (_, a) => a).filter(
      (a) => 90 * a + 60 * (16 - a) === 1200,
    );
    expect(counts).toEqual([8]);
    choice(eqId(9), counts[0]);
    const indices = Array.from({ length: 30 }, (_, i) => i + 1).filter(
      (n) => 4 + 5 * (n - 1) === 89,
    );
    expect(indices).toEqual([18]);
    choice(eqId(10), indices[0]);
  });
  it("checks inequality predicates,integer boundaries and complete interval images", () => {
    for (let i = -40; i <= 40; i++) {
      const x = i / 4;
      expect(-4 * x + 7 <= 19).toBe(x >= -3);
      expect(-5 < 2 - 3 * x && 2 - 3 * x <= 11).toBe(-3 <= x && x < 7 / 3);
      expect(x < -3 || x >= 2).toBe(!(x >= -3 && x < 2));
      expect(0 * x - 1 < 2).toBe(true);
      expect(0 * x - 1 >= 2).toBe(false);
      for (const a of [-5, -2, -0.5]) expect(a * x + 4 < 10).toBe(x > 6 / a);
    }
    choice(ineId(1), "[−3,∞)");
    const ints = Array.from({ length: 41 }, (_, i) => i - 20).filter(
      (x) => -5 < 2 - 3 * x && 2 - 3 * x <= 11,
    );
    expect(ints).toEqual([-3, -2, -1, 0, 1, 2]);
    choice(ineId(2), ints.length);
    choice(ineId(3), "(−2,5]");
    choice(ineId(4), "(−∞,−3)∪[2,∞)");
    choice(ineId(5), "ℝ ve ∅");
    choice(ineId(6), "x>6/a");
    choice(
      ineId(7),
      Math.max(
        ...Array.from({ length: 20 }, (_, n) => n).filter(
          (n) => 45 + 22 * n <= 200,
        ),
      ),
    );
    choice(
      ineId(8),
      Math.min(
        ...Array.from({ length: 20 }, (_, i) => i - 10).filter(
          (x) => x > -7 / 2 && x <= 5 / 2,
        ),
      ),
    );
    for (let a = 0.25; a < 4; a += 0.25)
      for (let b = a + 0.25; b < 4; b += 0.25)
        expect(1 / a > 1 / b && 1 / b > 1 / 4).toBe(true);
    choice(ineId(9), "1/a>1/b>1/4");
    for (let a = -4.875; a < -2; a += 0.125)
      expect(a * a > 4 && a * a < 25).toBe(true);
    for (let t = 4.25; t < 25; t += 0.25)
      expect(-5 < -Math.sqrt(t) && -Math.sqrt(t) < -2).toBe(true);
    choice(ineId(10), "(4,25)");
  });
  it("expands every factorization distractor independently and retains equivalent wrong forms", () => {
    const grids = Array.from({ length: 9 }, (_, i) => i - 4);
    const source = [
      (x: number) => 6 * x * x + 15 * x,
      (x: number) => x * x - 2 * x - 15,
      (x: number) => 9 * x * x - 16,
      (x: number) => 2 * x * x + 7 * x + 3,
      (x: number) => x ** 3 - 27,
      (x: number) => x ** 3 + 2 * x * x - 9 * x - 18,
    ];
    const candidates = [
      [
        (x: number) => 3 * x * (2 * x + 5),
        (x: number) => 3 * (2 * x * x + 5),
        (x: number) => 3 * x * (2 * x + 15),
        (x: number) => x * (6 * x * x + 15),
        (x: number) => (6 * x + 3) * (x + 5),
      ],
      [],
      [
        (x: number) => (3 * x - 4) ** 2,
        (x: number) => (9 * x - 4) * (x + 4),
        (x: number) => (3 * x + 4) ** 2,
        (x: number) => (3 * x - 4) * (3 * x + 4),
        (x: number) => (9 * x - 16) * (x + 1),
      ],
      [
        (x: number) => (2 * x + 3) * (x + 1),
        (x: number) => (2 * x + 1) * (x + 3),
        (x: number) => (x + 1) * (x + 3),
        (x: number) => (2 * x - 1) * (x - 3),
        (x: number) => (x + 3) ** 2,
      ],
      [
        (x: number) => (x - 3) * (x * x - 3 * x + 9),
        (x: number) => (x - 3) ** 3,
        (x: number) => (x + 3) * (x * x - 3 * x + 9),
        (x: number) => (x - 9) * (x * x + 3),
        (x: number) => (x - 3) * (x * x + 3 * x + 9),
      ],
      [
        (x: number) => (x + 2) * (x - 9),
        (x: number) => (x - 2) * (x - 3) * (x + 3),
        (x: number) => (x + 2) * (x * x + 9),
        (x: number) => (x + 2) * (x - 3) * (x + 3),
        (x: number) => (x - 2) * (x * x - 9),
      ],
    ];
    for (const [group, id] of [
      [0, "factr-1"],
      [2, "factr-3"],
      [3, "factr-4"],
      [4, "factr-5"],
      [5, "factr-8"],
    ] as const) {
      const matching = candidates[group]
        .map((fn, i) =>
          grids.every((x) => fn(x) === source[group](x)) ? i : -1,
        )
        .filter((i) => i >= 0);
      // All differences have degree at most3; nine distinct points establish
      // polynomial equality here, beyond mere single-point checks.
      expect(matching).toEqual([byId.get(id)!.answer]);
    }
    for (const x of grids)
      expect(candidates[5][1](x) - candidates[5][4](x)).toBe(0);
    expect([3, -5, 5, 15, -2].map((r) => source[1](r) === 0)).toEqual([
      false,
      false,
      true,
      false,
      false,
    ]);
    choice("factr-2", "x−5");
    expect(grids.filter((x) => x * x - 7 * x === 0)).toEqual([0]);
    expect(7 * 7 - 7 * 7).toBe(0);
    choice("factr-6", "{0,7}");
    for (const x of grids) expect((x * x - 25) / (x - 5)).toBe(x + 5);
    expect(Number.isNaN((25 - 25) / (5 - 5))).toBe(true);
    choice("factr-7", "x+5, x≠5");
    choice("factr-9", 2 * 2 + 7 * 7);
    const p = (x: number) => x ** 4 - 13 * x * x + 36;
    expect([1, 2, 5].map((x) => p(x))).toEqual([24, 0, 336]);
    expect((-4) ** 2 - 13 * -4 + 36).toBe(104);
    expect(6 ** 2 - 13 * 6 + 36).toBe(-6);
    choice("factr-10", "x−2");
  });
});

describe("real staged help and native button callbacks", () => {
  it("opens one useful panel per action,delays complete reasons and rejects changed identities", () => {
    const warnings: string[] = [];
    const originalError = console.error;
    let renders = 0,
      callbacks = 0,
      renderDispatches = 0;
    const render = (
      question: HelpQuestion,
      level: number,
      reviewed = false,
    ) => {
      renders++;
      return renderToStaticMarkup(
        createElement(QuestionHelp, {
          question,
          level,
          reviewed,
          onLevel: () => {
            renderDispatches++;
          },
        }),
      );
    };
    console.error = (...args) => {
      warnings.push(args.map(String).join(" "));
    };
    try {
      for (const row of rows) {
        const q = byId.get(row.id)!;
        const g = row.guidance;
        const before = JSON.stringify(q);
        expect(helpPanels(q)).toHaveLength(5);
        for (let level = 0; level <= 6; level++) {
          const html = render(q, level);
          expect(html.includes('aria-label="Çözüm rehberi"')).toBe(level > 0);
          for (const paragraph of g.knowledge)
            expect(html.includes(escaped(paragraph))).toBe(level >= 1);
          expect(html.includes(escaped(q.hint!))).toBe(level >= 1);
          expect(html.includes(escaped(g.strategy))).toBe(level >= 2);
          g.steps.forEach((step, i) => {
            expect(html.includes(escaped(step))).toBe(level >= 3 + i);
          });
          expect(html.includes('class="help-full-solution"')).toBe(level === 6);
          expect(html.includes("Doğru yanıt:")).toBe(level === 6);
          expect(html.includes(escaped(q.explanation))).toBe(level === 6);
          for (const reason of g.optionReasons)
            expect(html.includes(escaped(reason))).toBe(level === 6);
          expect(html.includes(escaped(g.commonError))).toBe(level === 6);
          expect(html.includes(escaped(g.check))).toBe(level === 6);
          if (level < 6) {
            const tree = QuestionHelp({
              question: q,
              level,
              onLevel: (next) => {
                expect(next).toBe(level + 1);
                callbacks++;
              },
            });
            const button = Children.toArray(tree.props.children).find(
              (child) =>
                isValidElement<{ onClick: () => void }>(child) &&
                child.type === "button",
            );
            expect(isValidElement<{ onClick: () => void }>(button)).toBe(true);
            if (isValidElement<{ onClick: () => void }>(button))
              button.props.onClick();
          }
        }
        const patches: Partial<HelpQuestion>[] = [
          { id: q.id + "-historic" },
          { prompt: q.prompt + " Ek" },
          { passage: "Başka tarihsel pasaj" },
          { options: [q.options[1], q.options[0], ...q.options.slice(2)] },
          { options: q.options.map((o, i) => (i === 0 ? o + " değişti" : o)) },
          { options: q.options.slice(0, -1) },
          { answer: (q.answer + 1) % q.options.length },
          { explanation: q.explanation + " Başka sürüm" },
        ];
        for (const patch of patches) {
          const changed = { ...q, ...patch };
          const changedBefore = JSON.stringify(changed);
          expect(resolvedGuidance(changed)).toBeUndefined();
          const html = render(changed, 6);
          expect(html).not.toContain(escaped(g.strategy));
          expect(html).not.toContain(escaped(g.optionReasons[0]));
          expect(JSON.stringify(changed)).toBe(changedBefore);
        }
        expect(resolvedGuidance({ ...q, hint: "Başka ipucu" })).toEqual(g);
        expect(
          resolvedGuidance({
            ...q,
            options: q.options.slice(0, -1),
            guidance: g,
          }),
        ).toBeUndefined();
        expect(render(q, 1, true)).not.toContain(
          "bağımsız doğru olarak sayılmaz",
        );
        const disabled = QuestionHelp({
          question: q,
          level: 0,
          disabled: true,
          onLevel: () => {},
        });
        const disabledButton = Children.toArray(disabled.props.children).find(
          (child) =>
            isValidElement<{ disabled?: boolean }>(child) &&
            child.type === "button",
        );
        expect(
          isValidElement<{ disabled: boolean }>(disabledButton) &&
            disabledButton.props.disabled,
        ).toBe(true);
        expect(JSON.stringify(q)).toBe(before);
      }
    } finally {
      console.error = originalError;
    }
    expect(renders).toBe(1040);
    expect(callbacks).toBe(390);
    expect(renderDispatches).toBe(0);
    expect(warnings).toEqual([]);
    expect(rawSHA()).toBe(baselineSHA);
  });
});
