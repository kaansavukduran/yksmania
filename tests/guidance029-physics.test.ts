import { createHash } from "node:crypto";
import { Children, createElement, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance029Physics.json";
import {
  forge093PhysicsLessons,
  forge093PhysicsGuides,
} from "../src/learning/forge093Physics";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import {
  clarifiedQuestionView,
  localizedQuestionView,
} from "../src/domain/questionPresentation";
import { QuestionHelp } from "../src/components/QuestionHelp";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";

// Isolated catalogue fixture only: root owns registration of these 50 reviewed rows.
vi.mock("../src/learning/questionHelpCatalogue.json", async () => ({
  default: (await import("../src/learning/guidance029Physics.json")).default,
}));
const original = forge093PhysicsLessons.flatMap((lesson) => lesson.questions);
const flat: HelpQuestion[] = original.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
}));
const stable = (value: unknown): unknown =>
  Array.isArray(value)
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
const digest = (value: unknown) =>
  createHash("sha256")
    .update(JSON.stringify(stable(value)))
    .digest("hex");
const fold = (s: string) =>
  s.normalize("NFKC").toLocaleLowerCase("tr-TR").replace(/\s+/g, " ").trim();
const plain = (s: string) =>
  s
    .replace(/<[^>]*>/g, "")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
const freeze = <T>(x: T): T => {
  if (x && typeof x === "object") {
    Object.values(x).forEach(freeze);
    Object.freeze(x);
  }
  return x;
};
const chosen = (id: string) => {
  const q = flat.find((q) => q.id === id)!;
  return q.options[q.answer];
};
const number = (id: string) =>
  Number(chosen(id).replace("−", "-").replace(",", "."));
const next = (tree: ReactNode): (() => void) | undefined => {
  let found: (() => void) | undefined;
  Children.forEach(tree, (node) => {
    if (!isValidElement<{ children?: ReactNode; onClick?: () => void }>(node))
      return;
    if (node.type === "button" && node.props.onClick)
      found = node.props.onClick;
    else found ??= next(node.props.children);
  });
  return found;
};

describe("029 Physics: original fifty cards with progressive help", () => {
  it("retains all raw fields, order, five options, keys, hints and complete original guide payloads", () => {
    expect(original).toHaveLength(50);
    expect(digest(original)).toBe(
      "f423af23d3b1cb3c5c5493a31cb81b41d8986886bfd8ac801265f9529d851222",
    );
    expect(rows.map((r) => r.id)).toEqual(flat.map((q) => q.id));
    expect(new Set(rows.map((r) => r.id)).size).toBe(50);
    expect(forge093PhysicsGuides.map((g) => digest(g))).toEqual([
      "e2cf41861008b33d225706c2fb6b0b5f7caa085399d2a7dd54e43d33543516a0",
      "c482a36aa213c306c2d139d24bb12761277fdd064edab8d189b3fb40396f59e1",
      "eb49338596e4bf174b4d1c9a9c4ed073ae0effd39658373897fa62c0aa10ddc9",
      "b0fe1b1fb8e0d4e34970b519a1a9bc0ec9ab61a4e232856d0d6f1eb7c709864f",
      "4d0e6032f4876ff4888f33f86a9321292c20457a2a570a7d5a5355dd29bd4a6b",
    ]);
    expect(forge093PhysicsGuides.map((g) => g.sections.length)).toEqual([
      8, 8, 8, 10, 8,
    ]);
    for (const q of original) {
      expect(q.options).toHaveLength(5);
      expect(q.guidance).toBeUndefined();
    }
  });
  it("binds fifty full identities without a prompt projection or source mutation", () => {
    for (const [i, row] of rows.entries()) {
      expect(row.identity).toBe(questionIdentity(flat[i]));
      const raw = freeze(structuredClone(original[i])),
        before = JSON.stringify(raw);
      expect(localizedQuestionView(raw)).toBe(raw);
      expect(clarifiedQuestionView(flat[i])).toBe(flat[i]);
      expect(JSON.stringify(raw)).toBe(before);
      expect(resolvedGuidance(flat[i])).toEqual(row.guidance);
    }
  });
  it("provides individual knowledge, methods, 150 different advancing steps and 250 ordered reasons", () => {
    expect(
      new Set(rows.map((r) => fold(r.guidance.knowledge.join(" ")))).size,
    ).toBe(50);
    expect(new Set(rows.map((r) => fold(r.guidance.strategy))).size).toBe(50);
    expect(new Set(rows.flatMap((r) => r.guidance.steps.map(fold))).size).toBe(
      150,
    );
    expect(rows.reduce((n, r) => n + r.guidance.optionReasons.length, 0)).toBe(
      250,
    );
    for (const [i, row] of rows.entries()) {
      expect(Object.keys(row).sort()).toEqual(["guidance", "id", "identity"]);
      const g = questionGuidanceSchema.parse(row.guidance),
        q = flat[i];
      expect(g.steps).toHaveLength(3);
      expect(g.optionReasons).toHaveLength(q.options.length);
      const panels = [...g.knowledge, g.strategy, ...g.steps].map(fold);
      expect(new Set(panels).size, row.id).toBe(panels.length);
      expect(panels).not.toContain(fold(q.hint!));
      expect(panels).not.toContain(fold(q.explanation));
      expect(new Set(g.optionReasons.map(fold)).size, row.id).toBe(5);
      for (const text of [
        ...g.knowledge,
        g.strategy,
        ...g.steps,
        ...g.optionReasons,
        g.commonError,
        g.check,
      ])
        expect(text.trim().length, row.id).toBeGreaterThan(25);
    }
  });
  it("rejects six changed identity fields per card while retaining the historical payload", () => {
    for (const q of flat) {
      const mutants: HelpQuestion[] = [
        { ...q, id: q.id + "-old" },
        { ...q, prompt: q.prompt + " Başka veri." },
        { ...q, passage: "Başka pasaj." },
        { ...q, options: [q.options[1], q.options[0], ...q.options.slice(2)] },
        { ...q, answer: (q.answer + 1) % 5 },
        { ...q, explanation: q.explanation + " Başka yorum." },
      ];
      for (const mutant of mutants) {
        const saved = freeze(structuredClone(mutant)),
          before = JSON.stringify(saved);
        expect(resolvedGuidance(saved)).toBeUndefined();
        const html = plain(
          renderToStaticMarkup(
            createElement(QuestionHelp, {
              question: saved,
              level: 6,
              onLevel: () => {
                throw new Error("RENDER_WRITE");
              },
            }),
          ),
        );
        expect(html).not.toContain(
          rows.find((row) => row.id === q.id)!.guidance.strategy,
        );
        expect(clarifiedQuestionView(saved)).toBe(saved);
        expect(JSON.stringify(saved)).toBe(before);
      }
      // Hints are deliberately outside questionIdentity; full raw-payload SHA guards them.
      expect(questionIdentity({ ...q, hint: "Başka ipucu" })).toBe(
        questionIdentity(q),
      );
    }
  });
  it("checks expansion using independent dimensionless scale, area geometry, mass and gas budgets", () => {
    expect(number("genlesme-q1")).toBeCloseTo(2000 * (20e-6 * (70 - 20)));
    expect(chosen("genlesme-q2")).toBe("Artar");
    const exactArea = 2 * (1 + 10e-6 * 100) ** 2 - 2;
    expect(Math.abs(number("genlesme-q3") - exactArea)).toBeLessThan(0.000003);
    expect(chosen("genlesme-q4")).toBe("100/102");
    expect((100 / 102) * 102).toBe(100);
    expect(number("genlesme-q5")).toBeCloseTo(
      500 * (1 + 8e-4 * 50) - 500 * (1 + 2e-5 * 50),
    );
    expect(chosen("genlesme-q6")).toBe("Hacim azalır, yoğunluk artar");
    const radii = [12, 10],
      angle = 0.2;
    expect(radii[0] * angle).toBeGreaterThan(radii[1] * angle);
    expect(chosen("genlesme-q7")).toBe(
      "Şerit B tarafına eğilir, A dış yayda kalır",
    );
    expect(number("genlesme-q8")).toBeCloseTo(
      3000 * (1 + 10e-6 * (30 - 80)) - 3000,
    );
    expect(number("genlesme-q9") + 10000 * 12e-6 * 40).toBeCloseTo(6);
    expect(number("genlesme-q10") / 330).toBeCloseTo(10 / 300);
  });
  it("independently verifies phase energy sufficiency, all masses and constant-power time", () => {
    expect(chosen("hal-degisimi-q1")).toBe("Kırağılaşma, enerji verir");
    expect(number("hal-degisimi-q2") / 30).toBe(200);
    const three = 20 * (2.1 * 10 + 334 + 4.2 * 10);
    expect(number("hal-degisimi-q3")).toBe(three);
    const available = 100 * 4.2 * 10,
      allIce = 25 * 336;
    expect(available).toBeLessThan(allIce);
    expect(25 - available / 336).toBe(12.5);
    expect(chosen("hal-degisimi-q4")).toBe(
      "12,5 g buz kalır, sıcaklık 0 °C olur",
    );
    const t = number("hal-degisimi-q5");
    expect(100 * 4.2 * (40 - t)).toBe(25 * 336 + 25 * 4.2 * t);
    expect(chosen("hal-degisimi-q6")).toBe("Kaynama sıcaklığı düşer");
    for (const m of [1, 5, 30])
      for (const latent of [20, 200, 334]) {
        expect((2 * m * latent) / (m * latent)).toBe(2);
        expect((m * latent) / (2 * 10) / ((m * latent) / 10)).toBe(0.5);
      }
    expect(number("hal-degisimi-q7")).toBe(2);
    expect(chosen("hal-degisimi-q8")).toBe("Yarısına iner");
    expect(chosen("hal-degisimi-q9")).toBe(
      "Ayrılan tanecikler enerji taşıyabilir; kalan sıvının ortalama enerjisi azalabilir",
    );
    expect(Number(chosen("hal-degisimi-q10").split(" ")[0]) / 10).toBe(2250);
  });
  it("checks electrostatic charge conservation, symmetry, force size and vector signs", () => {
    expect(chosen("durgun-elektrik-q1")).toBe("−5e");
    expect(chosen("durgun-elektrik-q2")).toBe("+4e,−4e");
    expect(chosen("durgun-elektrik-q3")).toBe(`+${(8 - 2) / 2} μC`);
    expect(chosen("durgun-elektrik-q4")).toBe(
      "Elektronlar çubuğa yakın bölgeye kayabilir, toplam küre yükü 0 kalır",
    );
    expect(chosen("durgun-elektrik-q5")).toBe("Negatif");
    expect(chosen("durgun-elektrik-q6")).toBe("Cismin net yük işaretini");
    expect(chosen("durgun-elektrik-q7")).toBe("1/4");
    const f = (9e9 * Math.abs(1e-6 * -2e-6)) / 0.3 ** 2;
    expect(f).toBeCloseTo(0.2);
    expect(chosen("durgun-elektrik-q8")).toBe("0,2 N çekme");
    expect(-2 * 3).toBeLessThan(0);
    expect(chosen("durgun-elektrik-q9")).toBe("Sola");
    expect(chosen("durgun-elektrik-q10")).toBe(
      "Elektronlar küreden Dünya’ya gider",
    );
    for (let transferred = 1; transferred <= 30; transferred++)
      expect(transferred + -transferred).toBe(0);
  });
  it("checks electric circuits by branch and loop budgets and recovers units", () => {
    expect(number("elektrik-akimi-q1") * 8).toBe(24);
    expect(chosen("elektrik-akimi-q2")).toBe("−uçtan+uca");
    expect(Number(chosen("elektrik-akimi-q3").split(" ")[0]) * 4).toBe(12);
    expect(number("elektrik-akimi-q4") * 2).toBe(10);
    expect(chosen("elektrik-akimi-q5")).toBe("1/4");
    expect(1 / 2 ** 2).toBe(0.25);
    const i = 18 / (3 + 6);
    expect(chosen("elektrik-akimi-q6")).toBe(`${i} A ve ${i * 3} V`);
    expect(i * 3 + i * 6).toBe(18);
    const main = 12 / 6 + 12 / 3;
    expect(number("elektrik-akimi-q7")).toBe(main);
    expect(main * 12).toBe((12 / 6) ** 2 * 6 + (12 / 3) ** 2 * 3);
    expect(chosen("elektrik-akimi-q8")).toBe(
      "Ampermetre seri, voltmetre paralel",
    );
    expect(number("elektrik-akimi-q9") * 3.6e6).toBe(2000 * (3 * 3600));
    expect(chosen("elektrik-akimi-q10")).toBe(
      `${(4 * 3600) / 1 / 3600} saat, yük`,
    );
  });
  it("checks magnetic direction with cross-product geometry and independent scaling", () => {
    const facts = [
      "İtme",
      "Her biri N ve S",
      "Cismin kalıcı mıknatıs olması",
      "N→S ve S→N",
      "Sağa",
      "Yukarı",
    ];
    facts.forEach((answer, i) =>
      expect(chosen(`miknatislar-ve-manyetik-alan-q${i + 1}`)).toBe(answer),
    );
    const current = [0, 0, 1],
      radial = [1, 0, 0];
    expect([
      current[1] * radial[2] - current[2] * radial[1],
      current[2] * radial[0] - current[0] * radial[2],
      current[0] * radial[1] - current[1] * radial[0],
    ]).toEqual([0, 1, 0]);
    const b = (4 * Math.PI * 1e-7 * 6) / (2 * Math.PI * 0.03) / 1e-6;
    expect(number("miknatislar-ve-manyetik-alan-q7")).toBeCloseTo(b);
    expect(number("miknatislar-ve-manyetik-alan-q8")).toBe(2 / 0.5 / (1 / 1));
    expect(chosen("miknatislar-ve-manyetik-alan-q9")).toBe("Aynı kalır");
    expect((2 * 30) / (2 * 0.4)).toBe(30 / 0.4);
    expect(chosen("miknatislar-ve-manyetik-alan-q10")).toBe(
      "Nitelik olarak S gibi davranır; coğrafi ve manyetik eksenler tam aynı olmak zorunda değildir",
    );
  });
  it("shows all stages in 350 actual SSR renders and 300 real next callbacks without early full solutions", () => {
    const warning = vi.spyOn(console, "error").mockImplementation(() => {}),
      onLevel = vi.fn();
    let calls = 0;
    try {
      for (const [i, row] of rows.entries()) {
        const q = flat[i];
        expect(helpPanels(q)).toHaveLength(5);
        expect(helpPanels(q)[0].paragraphs).toContain(q.hint);
        for (let level = 0; level <= 6; level++) {
          const before = onLevel.mock.calls.length;
          const html = renderToStaticMarkup(
            createElement(QuestionHelp, { question: q, level, onLevel }),
          );
          expect(onLevel.mock.calls).toHaveLength(before);
          const text = plain(html);
          for (const k of row.guidance.knowledge)
            expect(text.includes(k)).toBe(level >= 1);
          expect(text.includes(row.guidance.strategy)).toBe(level >= 2);
          row.guidance.steps.forEach((s, j) =>
            expect(text.includes(s)).toBe(level >= j + 3),
          );
          expect(html.includes('aria-label="Tam çözüm"')).toBe(level === 6);
          expect(text.includes("Doğru yanıt:")).toBe(level === 6);
          if (level === 6) {
            expect(text).toContain(q.explanation);
            for (const reason of row.guidance.optionReasons)
              expect(text).toContain(reason);
            expect(text).toContain(row.guidance.commonError);
            expect(text).toContain(row.guidance.check);
          } else {
            const advance = next(QuestionHelp({ question: q, level, onLevel }));
            expect(advance).toBeDefined();
            advance!();
            expect(onLevel).toHaveBeenLastCalledWith(level + 1);
            calls++;
          }
        }
      }
      expect(calls).toBe(300);
      expect(onLevel).toHaveBeenCalledTimes(300);
      expect(warning).not.toHaveBeenCalled();
    } finally {
      warning.mockRestore();
    }
  });
});
