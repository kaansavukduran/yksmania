import { createHash } from "node:crypto";
import { Children, createElement, isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance029Math.json";
import { forge093MathLessons } from "../src/learning/forge093Math";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import { resolvedGuidance, helpPanels } from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";

// Stage only this new catalogue in the real resolver. Runtime registration is
// owned separately; raw lesson questions never receive inline guidance.
vi.mock("../src/learning/questionHelpCatalogue.json", async (original) => {
  const old = await original<{ default: { id: string }[] }>();
  return {
    default: [
      ...old.default.filter((r) => !rows.some((n) => n.id === r.id)),
      ...rows,
    ],
  };
});
const raw = forge093MathLessons.flatMap((l) => l.questions);
const questions: HelpQuestion[] = raw.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
}));
const byId = new Map(questions.map((q) => [q.id, q]));
const id = (topic: string, n: number) => `${topic}-093-${n}`;
const stable = (x: unknown): unknown =>
  Array.isArray(x)
    ? x.map(stable)
    : x && typeof x === "object"
      ? Object.fromEntries(
          Object.keys(x)
            .sort()
            .map((k) => [k, stable((x as Record<string, unknown>)[k])]),
        )
      : x;
const rawSHA = () =>
  createHash("sha256")
    .update(JSON.stringify(stable(raw)))
    .digest("hex");
const baseline =
  "9ed4a44160ca5ef38f12428c1d1083fc13644492885eee594c022e9c3442e94d";
const choice = (topic: string, n: number, expected: string | number) => {
  const q = byId.get(id(topic, n))!;
  const label =
    typeof expected === "number"
      ? String(expected).replaceAll("-", "−").replace(".", ",")
      : expected;
  expect(q.options.filter((o) => o === label)).toHaveLength(1);
  expect(q.options[q.answer]).toBe(label);
};
const decisions = (topic: string, n: number, truth: boolean[]) => {
  const q = byId.get(id(topic, n))!;
  expect(truth).toHaveLength(q.options.length);
  expect(truth.flatMap((ok, i) => (ok ? [i] : []))).toEqual([q.answer]);
};
const escaped = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");

describe("029 exact fifty-card mathematics help", () => {
  it("preserves the complete original cohort and all fifty five-choice identities", () => {
    expect(raw).toHaveLength(50);
    expect(rawSHA()).toBe(baseline);
    expect(rows.map((r) => r.id)).toEqual(questions.map((q) => q.id));
    expect(new Set(rows.map((r) => r.id)).size).toBe(50);
    for (const row of rows) {
      const q = byId.get(row.id)!;
      expect(q.options).toHaveLength(5);
      expect(row.identity).toBe(questionIdentity(q));
      expect(q.guidance).toBeUndefined();
      expect(resolvedGuidance(q)).toEqual(row.guidance);
    }
  });
  it("keeps prerequisites, methods, advancing steps and five aligned reasons separate", () => {
    expect(rows.reduce((n, r) => n + r.guidance.knowledge.length, 0)).toBe(100);
    expect(rows.reduce((n, r) => n + r.guidance.steps.length, 0)).toBe(150);
    expect(rows.reduce((n, r) => n + r.guidance.optionReasons.length, 0)).toBe(
      250,
    );
    expect(new Set(rows.map((r) => r.guidance.strategy)).size).toBe(50);
    for (const row of rows) {
      const q = byId.get(row.id)!,
        g = questionGuidanceSchema.parse(row.guidance);
      expect(g).toEqual(row.guidance);
      expect(g.steps).toHaveLength(3);
      expect(
        new Set([...g.knowledge, g.strategy, ...g.steps, q.hint]).size,
      ).toBe(7);
      expect(g.optionReasons).toHaveLength(5);
      expect(new Set(g.optionReasons).size).toBe(5);
      expect(
        g.optionReasons.filter((r) => r.startsWith("Doğru.")),
      ).toHaveLength(1);
      expect(g.optionReasons[q.answer]).toMatch(/^Doğru\./);
      expect(g.strategy).not.toMatch(/(?:yanıt|cevap)\s*[ABCDE]/iu);
      expect(g.steps).not.toContain(q.explanation);
      expect(g.commonError).not.toBe(g.check);
    }
  });
});

describe("independent numerical and complete-option decisions", () => {
  it("checks absolute-value branches, interval membership, minima and graph coordinates", () => {
    const t = "mutlak-deger";
    choice(t, 1, Math.abs(-7) - Math.abs(-2));
    const candidates = [-5 / 3, 3];
    expect(candidates.map((x) => Math.abs(3 * x - 2))).toEqual([7, 7]);
    choice(t, 2, "{−5/3,3}");
    const grid = Array.from({ length: 161 }, (_, i) => (i - 80) / 8);
    const inside = [
      (x: number) => -3 < x && x < 2,
      (x: number) => -2 <= x && x <= 3,
      (x: number) => -3 <= x && x <= 2,
      (x: number) => x <= -3 || x >= 2,
      (x: number) => -5 <= x && x <= 5,
    ];
    decisions(
      t,
      3,
      inside.map((p) => grid.every((x) => p(x) === Math.abs(2 * x + 1) <= 5)),
    );
    const outside = [
      (x: number) => 2 < x && x < 6,
      (x: number) => 2 <= x && x <= 6,
      (x: number) => x <= 2 || x >= 6,
      (x: number) => x > 6,
      (x: number) => x < 2 || x > 6,
    ];
    decisions(
      t,
      4,
      outside.map((p) => grid.every((x) => p(x) === Math.abs(x - 4) > 2)),
    );
    const roots = [-3, 1 / 3, 3, -1 / 3, 2];
    decisions(
      t,
      5,
      roots.map((x) => Math.abs(Math.abs(x - 2) - (2 * x + 1)) < 1e-12),
    );
    choice(t, 5, "1/3");
    const expressions = [
      (x: number) => x - 3,
      (x: number) => 3 + x,
      (x: number) => -x - 3,
      (x: number) => 3 - x,
    ];
    decisions(t, 6, [
      ...expressions.map((f) =>
        grid
          .filter((x) => x < 3)
          .every((x) => f(x) === Math.sqrt((x - 3) ** 2)),
      ),
      false,
    ]);
    const distance = (x: number) => Math.abs(x + 2) + Math.abs(x - 4);
    for (const x of grid) {
      expect(distance(x)).toBeGreaterThanOrEqual(6);
      expect(distance(x) === 6).toBe(-2 <= x && x <= 4);
    }
    choice(t, 7, Math.min(...grid.map(distance)));
    expect(grid.every((x) => !(Math.abs(x - 1) < -2))).toBe(true);
    choice(t, 8, "∅");
    const nested = grid.filter((x) => Math.abs(Math.abs(x - 1) - 3) === 2);
    expect(nested).toEqual([-4, 0, 2, 6]);
    choice(t, 9, nested.length);
    const y = (x: number) => Math.abs(x + 2) - 3;
    expect(Math.min(...grid.map(y))).toBe(-3);
    expect(grid.filter((x) => y(x) === -3)).toEqual([-2]);
    choice(t, 10, "(−2,−3)");
  });
  it("checks parentheses, inverse powers, definedness, exponent order and repeated doubling", () => {
    const t = "uslu-sayilar";
    choice(t, 1, -(2 ** 4) + (-2) ** 4);
    expect(2 ** -3).toBe(1 / 8);
    choice(t, 2, "1/8");
    decisions(
      t,
      3,
      [(-5) ** 0, 0 ** 5, 0 ** -2, 1 ** -8, (-1) ** 3].map(
        (v) => !Number.isFinite(v),
      ),
    );
    choice(t, 4, (3 ** 2 * 3 ** 5) / 3 ** 3);
    choice(t, 5, 2 ** 3 + 2 ** 5);
    const grid = Array.from({ length: 65 }, (_, i) => (i - 32) / 4);
    const predicates = [
      (x: number) => x < 3,
      (x: number) => x <= 3,
      (x: number) => x === 3,
      (x: number) => x > 3,
      (x: number) => x >= 3,
    ];
    decisions(
      t,
      6,
      predicates.map((p) => grid.every((x) => p(x) === 0.5 ** x < 0.5 ** 3)),
    );
    const xs = [5, -5, 1, 3, 2];
    decisions(
      t,
      7,
      xs.map((x) => 4 ** (x + 1) === 8 ** (x - 1)),
    );
    const a = 8 ** 4,
      b = 4 ** 5;
    decisions(t, 8, [a === b, a < b, a > b, a === 2 * b, b === 4 * a]);
    choice(t, 9, Math.cbrt(8) ** 2);
    let cells = 3;
    for (let i = 0; i < 4; i++) cells += cells;
    choice(t, 10, cells);
  });
  it("checks scientific notation with exact rational decimal arithmetic and coefficient boundaries", () => {
    const t = "bilimsel-gosterim-katsayi";
    type Fraction = { n: bigint; d: bigint };
    const decimal = (text: string): Fraction => {
      const s = text.replaceAll("−", "-").replace(",", ".");
      const parts = s.split(".");
      return {
        n: BigInt(parts.join("")),
        d: 10n ** BigInt(parts[1]?.length ?? 0),
      };
    };
    const equal = (a: Fraction, b: Fraction) => a.n * b.d === b.n * a.d;
    const chars: Record<string, string> = {
      "⁻": "-",
      "⁰": "0",
      "¹": "1",
      "²": "2",
      "³": "3",
      "⁴": "4",
      "⁵": "5",
      "⁶": "6",
      "⁷": "7",
      "⁸": "8",
      "⁹": "9",
    };
    const parse = (text: string) => {
      const [coefficient, exponent] = text.split("×10");
      const c = decimal(coefficient),
        e = Number([...exponent].map((c) => chars[c]).join(""));
      return {
        c,
        value: {
          n: c.n * 10n ** BigInt(Math.max(e, 0)),
          d: c.d * 10n ** BigInt(Math.max(-e, 0)),
        },
      };
    };
    const standard = (c: Fraction) => {
      const n = c.n < 0 ? -c.n : c.n;
      return n >= c.d && n < 10n * c.d;
    };
    const check = (n: number, target: Fraction, normalized: boolean) =>
      decisions(
        t,
        n,
        byId.get(id(t, n))!.options.map((o) => {
          const p = parse(o);
          return equal(p.value, target) && (!normalized || standard(p.c));
        }),
      );
    check(1, decimal("0,000072"), true);
    check(2, decimal("48000000"), true);
    decisions(
      t,
      3,
      byId.get(id(t, 3))!.options.map((o) => standard(parse(o).c)),
    );
    check(4, { n: 6n * 4n * 10n ** 5n, d: 10n ** 3n }, true);
    check(5, { n: 320000n + 70000n, d: 1n }, false);
    check(6, { n: 84000000n, d: 2100n }, false);
    const a = 9 * 10 ** -8,
      b = 2 * 10 ** -9;
    decisions(t, 7, [a > b, a < b, a === b, a === 9 * b, b === 2 * a]);
    check(8, { n: 3200000n, d: 1000n }, false);
    const c = -8 * 10 ** 4,
      d = -2 * 10 ** 3;
    decisions(t, 9, [c > d, c < d, c === d, c === 4 * d, c > 0 && d > 0]);
    decisions(
      t,
      10,
      byId
        .get(id(t, 10))!
        .options.map((o) => equal(decimal(o), { n: 64n, d: 10n ** 8n })),
    );
  });
  it("checks principal roots, exact radical values, denominator domains and extraneous roots", () => {
    const t = "koklu-sayilar";
    choice(t, 1, Math.sqrt(49));
    const grid = Array.from({ length: 81 }, (_, i) => (i - 40) / 4);
    const f = [
      (x: number) => x - 2,
      (x: number) => x + 2,
      (x: number) => -x - 2,
      (x: number) => 2 - x,
    ];
    decisions(t, 2, [
      ...f.map((p) =>
        grid
          .filter((x) => x < 2)
          .every((x) => p(x) === Math.sqrt((x - 2) ** 2)),
      ),
      false,
    ]);
    const radical = (s: string) => {
      const [k, m] = s.split("√");
      return { k: Number(k || "1"), m: Number(m) };
    };
    const squareFree = (n: number) => {
      for (let i = 2; i * i <= n; i++) if (n % (i * i) === 0) return false;
      return true;
    };
    decisions(
      t,
      3,
      byId.get(id(t, 3))!.options.map((s) => {
        const { k, m } = radical(s);
        return k > 0 && k * k * m === 72 && squareFree(m);
      }),
    );
    decisions(
      t,
      4,
      byId.get(id(t, 4))!.options.map((s) => {
        const { k, m } = radical(s);
        return (
          k > 0 &&
          k * k * m === 12 + 27 + 2 * Math.sqrt(12 * 27) &&
          squareFree(m)
        );
      }),
    );
    const domains = [
      (x: number) => 1 <= x && x <= 5,
      (x: number) => 1 <= x && x < 5,
      (x: number) => 1 < x && x < 5,
      (x: number) => x < 5,
      (x: number) => x >= 5,
    ];
    decisions(
      t,
      5,
      domains.map((p) =>
        grid.every(
          (x) => p(x) === Number.isFinite(Math.sqrt(x - 1) / Math.sqrt(5 - x)),
        ),
      ),
    );
    const r = Math.sqrt(7),
      rationalized = [r - 2, 3 * r + 2, (r + 2) / 3, r + 2, 7 + 2];
    decisions(
      t,
      6,
      rationalized.map((v) => Math.abs(v * (r - 2) - 3) < 1e-12),
    );
    expect([-1, 3].filter((x) => Math.sqrt(2 * x + 3) === x)).toEqual([3]);
    choice(t, 7, "{3}");
    const a = 3 * Math.sqrt(2),
      b = 2 * Math.sqrt(5);
    decisions(t, 8, [a === b, a > b, a < b, a === 2 * b, b === 3 * a]);
    const circumference = 4 * Math.sqrt(72);
    const options = [
      12 * Math.sqrt(2),
      24 * Math.sqrt(2),
      36,
      288,
      72 * Math.sqrt(2),
    ];
    decisions(
      t,
      9,
      options.map((v) => Math.abs(v - circumference) < 1e-12),
    );
    choice(t, 10, Math.cbrt(-8) + Math.sqrt(16));
  });
  it("checks part-whole ratios, invariant models, common scales and inverse shares", () => {
    const t = "oran-oranti";
    decisions(
      t,
      1,
      [3 / 8, 3 / 5, 5 / 3, 5 / 8, 2 / 5].map((r) => r === 15 / (15 + 25)),
    );
    const as = [3, 8, 40, 24, 32];
    decisions(
      t,
      2,
      as.map((a) => a / (64 - a) === 3 / 5),
    );
    choice(t, 3, (36 * 7) / 9);
    choice(t, 4, (60 / 4) * 7);
    choice(t, 5, (6 * 10) / 15);
    const ratios = [1, 2, 3, 4].map((x) => (x + 3) / x);
    expect(new Set(ratios).size).toBeGreaterThan(1);
    expect([1, 2, 3].map((x) => x * (x + 3))).toEqual([4, 10, 18]);
    choice(t, 6, "y/x=1+3/x sabit olmadığı için doğru orantılı değildir");
    decisions(
      t,
      7,
      byId.get(id(t, 7))!.options.map((o) => {
        const [a, b, c] = o.split(":").map(Number);
        return 7 * a === 4 * b && 15 * b === 14 * c;
      }),
    );
    // Use a common integer denominator to keep the rational shares exact.
    const weights = [3, 4, 6].map((d) => 12 / d),
      total = weights.reduce((a, b) => a + b);
    const shares = weights.map((w) => (216 * w) / total);
    expect(shares).toEqual([96, 72, 48]);
    expect(shares.map((s, i) => s * [3, 4, 6][i])).toEqual([288, 288, 288]);
    choice(t, 8, Math.min(...shares));
    choice(t, 9, (7.2 * 25000) / 100000);
    const constant = 12 / 2 ** 2;
    choice(t, 10, constant * 3 ** 2);
    expect((constant * 3 ** 2) / 12).toBe((3 / 2) ** 2);
  });
});

describe("actual production help rendering and button progression", () => {
  it("stages every panel, preserves raw cards, and refuses changed snapshot identities", () => {
    const warnings: string[] = [];
    const previous = console.error;
    let renders = 0,
      callbacks = 0,
      renderWrites = 0;
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
            renderWrites++;
          },
        }),
      );
    };
    console.error = (...args) => warnings.push(args.map(String).join(" "));
    try {
      for (const row of rows) {
        const q = byId.get(row.id)!,
          g = row.guidance,
          before = JSON.stringify(q);
        expect(helpPanels(q)).toHaveLength(5);
        for (let level = 0; level <= 6; level++) {
          const html = render(q, level);
          expect(html.includes('aria-label="Çözüm rehberi"')).toBe(level > 0);
          for (const text of [...g.knowledge, q.hint!])
            expect(html.includes(escaped(text))).toBe(level >= 1);
          expect(html.includes(escaped(g.strategy))).toBe(level >= 2);
          g.steps.forEach((s, i) =>
            expect(html.includes(escaped(s))).toBe(level >= i + 3),
          );
          expect(html.includes('class="help-full-solution"')).toBe(level === 6);
          expect(html.includes("Doğru yanıt:")).toBe(level === 6);
          for (const text of [
            q.explanation,
            ...g.optionReasons,
            g.commonError,
            g.check,
          ])
            expect(html.includes(escaped(text))).toBe(level === 6);
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
              (child) => isValidElement(child) && child.type === "button",
            );
            expect(isValidElement<{ onClick: () => void }>(button)).toBe(true);
            if (isValidElement<{ onClick: () => void }>(button))
              button.props.onClick();
          }
        }
        const changes: Partial<HelpQuestion>[] = [
          { id: q.id + "-historical" },
          { prompt: q.prompt + " Başka sürüm" },
          { passage: "Başka pasaj" },
          { options: [q.options[1], q.options[0], ...q.options.slice(2)] },
          { options: q.options.map((o, i) => (i === 0 ? o + " değişti" : o)) },
          { options: q.options.slice(0, -1) },
          { answer: (q.answer + 1) % 5 },
          { explanation: q.explanation + " Başka açıklama" },
        ];
        for (const patch of changes) {
          const changed = { ...q, ...patch },
            changedBefore = JSON.stringify(changed);
          expect(resolvedGuidance(changed)).toBeUndefined();
          const html = render(changed, 6);
          expect(html).not.toContain(escaped(g.strategy));
          expect(html).not.toContain(escaped(g.optionReasons[0]));
          expect(JSON.stringify(changed)).toBe(changedBefore);
        }
        expect(resolvedGuidance({ ...q, hint: "Tarihsel ipucu" })).toEqual(g);
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
        const tree = QuestionHelp({
          question: q,
          level: 0,
          disabled: true,
          onLevel: () => {},
        });
        const button = Children.toArray(tree.props.children).find(
          (child) => isValidElement(child) && child.type === "button",
        );
        expect(
          isValidElement<{ disabled: boolean }>(button) &&
            button.props.disabled,
        ).toBe(true);
        expect(JSON.stringify(q)).toBe(before);
      }
    } finally {
      console.error = previous;
    }
    expect(renders).toBe(800);
    expect(callbacks).toBe(300);
    expect(renderWrites).toBe(0);
    expect(warnings).toEqual([]);
    expect(rawSHA()).toBe(baseline);
  });
});
