import { createHash } from "node:crypto";
import { Children, createElement, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance030Physics.json";
import {
  forge011PhysicsLessons,
  forge011PhysicsGuides,
} from "../src/learning/forge011Physics";
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
import {
  helpPanels,
  previousHelpPanelCount,
  resolvedGuidance,
} from "../src/learning/questionHelp";

// Scoped catalogue fixture; root owns future registration. The renderer,
// identity projection and resolver below are the actual production modules.
vi.mock("../src/learning/questionHelpCatalogue.json", async () => ({
  default: (
    await import("../src/learning/guidance030Physics.json")
  ).default.map((row) => ({ ...row, legacyPanelCount: 1 })),
}));

const original = forge011PhysicsLessons.flatMap((lesson) => lesson.questions);
const flat: HelpQuestion[] = original.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
}));
const views = flat.map(clarifiedQuestionView);
const harmonicId = "dalgalara-giris-q10";
const harmonicPrompt =
  "Sinüzoidal (harmonik) bir dalganın bir noktasına ait y–t grafiğinde art arda iki maksimum t=0,7 s ve t=1,2 s’de oluşuyor. Bu veriden doğrudan bulunanlar hangisidir?";
const harmonicPrompts: Record<string, string> = {
  "dalgalara-giris-q3":
    "Sinüzoidal (harmonik) bir dalganın anlık y–x grafiğinde ardışık iki dalga tepesi x=0,3 m ve x=1,1 m konumundadır. Dalga boyu kaç m?",
  [harmonicId]: harmonicPrompt,
};
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
const freeze = <T>(value: T): T => {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
};
const fold = (text: string) =>
  text.normalize("NFKC").toLocaleLowerCase("tr-TR").replace(/\s+/g, " ").trim();
const plain = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
const question = (id: string) => views.find((q) => q.id === id)!;
const numeric = (text: string) => {
  const value = text.replaceAll("−", "-").replace(",", ".");
  if (!/^-?\d+(?:\.\d+)?$/.test(value)) return NaN;
  return Number(value);
};
function numericDecisions(id: string, result: number) {
  const q = question(id);
  const decisions = q.options.map(
    (option) => Math.abs(numeric(option) - result) < 1e-8,
  );
  expect(decisions.filter(Boolean), id).toHaveLength(1);
  expect(decisions[q.answer], id).toBe(true);
  return decisions.length;
}
function literalDecisions(id: string, result: string) {
  const q = question(id);
  const decisions = q.options.map((option) => option === result);
  expect(decisions.filter(Boolean), id).toHaveLength(1);
  expect(decisions[q.answer], id).toBe(true);
  return decisions.length;
}
function next(tree: ReactNode): (() => void) | undefined {
  let found: (() => void) | undefined;
  Children.forEach(tree, (node) => {
    if (!isValidElement<{ children?: ReactNode; onClick?: () => void }>(node))
      return;
    if (node.type === "button") found = node.props.onClick;
    else found ??= next(node.props.children);
  });
  return found;
}

describe("030 Physics: forty retained cards with reviewed staged guidance", () => {
  it("preserves every original raw field, order, option, key, hint and full guide", () => {
    expect(original).toHaveLength(40);
    expect(digest(original)).toBe(
      "742b8860a0176066fb8f7d2dea340525a98d27a3430ad3dd4813e91cd25ed877",
    );
    expect(rows.map((row) => row.id)).toEqual(flat.map((q) => q.id));
    expect(new Set(rows.map((row) => row.id)).size).toBe(40);
    expect(forge011PhysicsGuides.map(digest)).toEqual([
      "7267f8a36fe97477702ed3308d40626d41950804ce559294cdb64adb6f29829d",
      "59664caa78d319ad89c6d9f27c0950097c94e64aa7af1f9a87b7968b9de0d497",
      "7ac3d2261cd8de4e38711a948680365e0df137ea73d9885c08e4f19134fc4692",
      "9b5a3f9747026c1b8d392c33687ae546929537e67d059aaac71acdcc94ee7060",
    ]);
    expect(forge011PhysicsGuides.map((g) => g.sections.length)).toEqual([
      10, 10, 10, 10,
    ]);
    for (const q of original) {
      expect(q.options).toHaveLength(5);
      expect(q.guidance).toBeUndefined();
    }
    expect(
      [0, 1, 2, 3, 4].map(
        (answer) => original.filter((q) => q.answer === answer).length,
      ),
    ).toEqual([8, 8, 8, 8, 8]);
  });

  it("uses the two actual approved harmonic views for unchanged raw identities", () => {
    expect(views.filter((q, i) => q !== flat[i]).map((q) => q.id)).toEqual([
      ...Object.keys(harmonicPrompts),
    ]);
    for (const [index, q] of flat.entries()) {
      const before = JSON.stringify(original[index]);
      const localized = localizedQuestionView(
        freeze(structuredClone(original[index])),
      );
      const view = views[index];
      expect(rows[index].identity).toBe(questionIdentity(view));
      expect(resolvedGuidance(q)).toEqual(rows[index].guidance);
      expect(resolvedGuidance(view)).toEqual(rows[index].guidance);
      expect(previousHelpPanelCount(q)).toBe(1);
      expect(localized.options).toEqual(original[index].options);
      expect(localized.answer).toBe(original[index].answer);
      expect(localized.hint).toEqual(original[index].hint);
      expect(localized.explanation).toEqual(original[index].explanation);
      expect(localized.prompt.tr).toBe(view.prompt);
      expect(clarifiedQuestionView(view)).toBe(view);
      expect(JSON.stringify(original[index])).toBe(before);
      if (harmonicPrompts[q.id]) {
        expect(view.prompt).toBe(harmonicPrompts[q.id]);
        expect(rows[index].identity).not.toBe(questionIdentity(q));
      } else {
        expect(view).toBe(q);
        expect(localized).toEqual(original[index]);
      }
    }
  });

  it("supplies forty distinct prerequisites/methods,120 advancing steps and200 ordered reasons", () => {
    expect(
      new Set(rows.map((row) => fold(row.guidance.knowledge.join(" ")))).size,
    ).toBe(40);
    expect(new Set(rows.map((row) => fold(row.guidance.strategy))).size).toBe(
      40,
    );
    expect(
      new Set(rows.flatMap((row) => row.guidance.steps.map(fold))).size,
    ).toBe(120);
    expect(
      rows.reduce((sum, row) => sum + row.guidance.optionReasons.length, 0),
    ).toBe(200);
    for (const [index, row] of rows.entries()) {
      expect(Object.keys(row).sort()).toEqual(["guidance", "id", "identity"]);
      const g = questionGuidanceSchema.parse(row.guidance);
      expect(g.steps).toHaveLength(3);
      expect(g.optionReasons).toHaveLength(views[index].options.length);
      const panels = [...g.knowledge, g.strategy, ...g.steps].map(fold);
      expect(new Set(panels).size, row.id).toBe(panels.length);
      expect(panels).not.toContain(fold(views[index].hint!));
      expect(panels).not.toContain(fold(views[index].explanation));
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
      for (const early of [...g.knowledge, g.strategy])
        expect(early).not.toMatch(
          /doğru (?:yanıt|cevap|seçenek|şık)|[A-E] şıkkı/i,
        );
    }
  });

  it("rejects six complete-core mutations per card and retains failed historical views", () => {
    let count = 0;
    for (const q of views) {
      const mutants: HelpQuestion[] = [
        { ...q, id: q.id + "-stale" },
        { ...q, prompt: q.prompt + " Başka koşul." },
        { ...q, passage: "Başka veri." },
        { ...q, options: [q.options[1], q.options[0], ...q.options.slice(2)] },
        { ...q, answer: (q.answer + 1) % 5 },
        { ...q, explanation: q.explanation + " Başka açıklama." },
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
                throw Error("RENDER_WRITE");
              },
            }),
          ),
        );
        expect(html).not.toContain(
          rows.find((row) => row.id === q.id)!.guidance.strategy,
        );
        expect(clarifiedQuestionView(saved)).toBe(saved);
        expect(JSON.stringify(saved)).toBe(before);
        count++;
      }
    }
    expect(count).toBe(240);
    const raw = flat.find((q) => q.id === harmonicId)!;
    const stale = { ...raw, prompt: raw.prompt + " Yeni kayıt." };
    expect(clarifiedQuestionView(stale)).toBe(stale);
    expect(resolvedGuidance(stale)).toBeUndefined();
    expect(questionIdentity({ ...raw, hint: "Kişisel ipucum" })).toBe(
      questionIdentity(raw),
    );
    expect(clarifiedQuestionView({ ...raw, hint: "Kişisel ipucum" }).hint).toBe(
      "Kişisel ipucum",
    );
  });

  it("solves all fifty pressure option decisions from force/area,hydrostatic and flow budgets", () => {
    let n = 0;
    const calculations: Array<[string, number]> = [
      ["basinc-q1", 50 / 0.025],
      ["basinc-q2", (10 * 10 - 40) / 0.03],
      ["basinc-q3", 800 * 10 * 0.5],
      ["basinc-q4", (100000 + 1000 * 10 * 0.4) / (100000 + 1000 * 10 * 0.4)],
      ["basinc-q5", (45 * 12) / 3],
      ["basinc-q6", (80 * 450) / 300],
      ["basinc-q7", 100000 + 1000 * 10 * 0.2],
      ["basinc-q9", 3000 * 0.02],
    ];
    for (const [id, result] of calculations) n += numericDecisions(id, result);
    const heightRatio = 1 / 0.5;
    expect(heightRatio).toBe(2);
    n += literalDecisions("basinc-q8", "İki katına çıkar");
    const area1 = 2,
      area2 = 1,
      speed1 = 3,
      speed2 = (area1 * speed1) / area2;
    expect(speed2).toBeGreaterThan(speed1);
    expect((speed1 ** 2 - speed2 ** 2) / 2).toBeLessThan(0);
    n += literalDecisions("basinc-q10", "Hız artar, statik basınç azalır");
    expect(n).toBe(50);
  });

  it("solves all fifty buoyancy decisions with displaced mass and signed force balance", () => {
    let n = 0;
    n += numericDecisions("sivilarin-kaldirma-kuvveti-q1", 800 * 0.003 * 10);
    n += numericDecisions("sivilarin-kaldirma-kuvveti-q2", (0.8 / 1000) * 1000);
    const weight = 6,
      volumes = [weight / (1000 * 10), weight / (1200 * 10)];
    expect(volumes[1]).toBeLessThan(volumes[0]);
    n += literalDecisions(
      "sivilarin-kaldirma-kuvveti-q3",
      "Kaldırma aynı, tuzlu suda batık hacim daha küçük",
    );
    n += numericDecisions("sivilarin-kaldirma-kuvveti-q4", 28 - 16);
    const downTension = 1000 * 10 * 0.001 - 3;
    n += literalDecisions(
      "sivilarin-kaldirma-kuvveti-q5",
      `${downTension} N aşağı`,
    );
    for (const depth of [0.2, 0.7])
      expect(1000 * 10 * (depth + 0.3) - 1000 * 10 * depth).toBeCloseTo(3000);
    n += literalDecisions("sivilarin-kaldirma-kuvveti-q6", "Aynı kalır");
    n += numericDecisions("sivilarin-kaldirma-kuvveti-q7", 0.5 * 10);
    n += numericDecisions(
      "sivilarin-kaldirma-kuvveti-q8",
      (2000 - 1000) * 0.002 * 10,
    );
    n += literalDecisions("sivilarin-kaldirma-kuvveti-q9", "Batık hacimleri");
    expect(0.25 - (2 / 1000) * 1000).toBe(-1.75);
    n += literalDecisions("sivilarin-kaldirma-kuvveti-q10", "1,75 L azalır");
    expect(n).toBe(50);
  });

  it("solves wave options and verifies the added harmonic condition is necessary", () => {
    let n = 0;
    for (const [id, value] of [
      ["dalgalara-giris-q1", 24 / 8],
      ["dalgalara-giris-q2", 1 / 0.4],
      ["dalgalara-giris-q3", 1.1 - 0.3],
      ["dalgalara-giris-q4", Math.max(Math.abs(5), Math.abs(-5))],
      ["dalgalara-giris-q5", 0.6 * 5],
      ["dalgalara-giris-q7", 16 / 4],
    ] as Array<[string, number]>)
      n += numericDecisions(id, value);
    expect(1 / (2 * 1)).toBe(0.5);
    n += literalDecisions(
      "dalgalara-giris-q6",
      "Sürat aynı, dalga boyu yarı olur",
    );
    n += literalDecisions("dalgalara-giris-q8", "Radyo dalgası");
    const propagation = [1, 0],
      oscillation = [0, 1];
    expect(
      propagation[0] * oscillation[0] + propagation[1] * oscillation[1],
    ).toBe(0);
    n += literalDecisions("dalgalara-giris-q9", "Mekanik ve enine");
    const period = 1.2 - 0.7;
    expect(period).toBe(0.5);
    expect(1 / period).toBe(2);
    n += literalDecisions(harmonicId, "T=0,5 s ve f=2 Hz");
    expect(n).toBe(50);
    // Same first two peaks also fit this nonperiodic C1 signal. The approved
    // harmonic scope prevents silently treating arbitrary peaks as one period.
    const phase = (t: number) =>
      t <= 1.2 ? 2 * (t - 0.7) : 1 + (10 / 7) * (t - 1.2);
    const nonperiodic = (t: number) => Math.cos(2 * Math.PI * phase(t));
    for (const peak of [0.7, 1.2, 1.9]) {
      expect(nonperiodic(peak)).toBeCloseTo(1);
      expect(nonperiodic(peak - 0.001)).toBeLessThan(nonperiodic(peak));
      expect(nonperiodic(peak + 0.001)).toBeLessThan(nonperiodic(peak));
    }
    expect(nonperiodic(1.7)).not.toBeCloseTo(1);
    expect(Math.cos(4 * Math.PI * (1.7 - 0.7))).toBeCloseTo(1);
  });

  it("solves all fifty string decisions using square-root ratios,boundary conditions and signed sums", () => {
    let n = 0;
    n += numericDecisions("yay-dalgalari-q1", Math.sqrt(25 / 0.25));
    n += numericDecisions("yay-dalgalari-q2", Math.sqrt(9));
    n += numericDecisions("yay-dalgalari-q3", 4 * 0.3);
    expect(6 + -6).toBe(0);
    n += literalDecisions("yay-dalgalari-q4", "Sola giden −6 cm çukur");
    n += literalDecisions(
      "yay-dalgalari-q5",
      "Tepe olarak sola döner; sürat büyüklüğü aynı kalır",
    );
    expect(Math.sqrt(1 / 4)).toBe(0.5);
    n += literalDecisions(
      "yay-dalgalari-q6",
      "Yansıyan ters; iletilenin sürati ilk ortamın yarısı",
    );
    expect(Math.sqrt(4 / 1)).toBeGreaterThan(1);
    n += literalDecisions(
      "yay-dalgalari-q7",
      "Yansıyan tepe; iletilen daha hızlı",
    );
    n += numericDecisions("yay-dalgalari-q8", 5 - 8);
    n += literalDecisions(
      "yay-dalgalari-q9",
      "Anlık uzanım sıfır olabilir; atmalar sonra ilerlemeyi sürdürür",
    );
    n += numericDecisions("yay-dalgalari-q10", (3 * 2) / 4);
    expect(n).toBe(50);
  });

  it("uses280 actual stage renders,240 next callbacks and ordered200 reasons without render writes", () => {
    const warning = vi.spyOn(console, "error").mockImplementation(() => {}),
      onLevel = vi.fn();
    let renders = 0,
      callbacks = 0;
    try {
      for (const [index, row] of rows.entries()) {
        const q = flat[index];
        expect(helpPanels(q)).toHaveLength(5);
        for (let level = 0; level <= 6; level++) {
          const before = onLevel.mock.calls.length;
          const html = renderToStaticMarkup(
            createElement(QuestionHelp, { question: q, level, onLevel }),
          );
          renders++;
          expect(onLevel.mock.calls).toHaveLength(before);
          const text = plain(html);
          row.guidance.knowledge.forEach((k) =>
            expect(text.includes(k)).toBe(level >= 1),
          );
          expect(text.includes(row.guidance.strategy)).toBe(level >= 2);
          row.guidance.steps.forEach((step, j) =>
            expect(text.includes(step)).toBe(level >= j + 3),
          );
          expect(text.includes("Doğru yanıt:")).toBe(level === 6);
          expect(html.includes('aria-label="Tam çözüm"')).toBe(level === 6);
          if (level === 6) {
            const positions = row.guidance.optionReasons.map((reason) =>
              text.indexOf(reason),
            );
            expect(positions.every((position) => position >= 0)).toBe(true);
            expect(positions).toEqual([...positions].sort((a, b) => a - b));
            expect(text).toContain(views[index].explanation);
            expect(text).toContain(row.guidance.commonError);
            expect(text).toContain(row.guidance.check);
          } else {
            const advance = next(QuestionHelp({ question: q, level, onLevel }));
            expect(advance).toBeDefined();
            advance!();
            expect(onLevel).toHaveBeenLastCalledWith(level + 1);
            callbacks++;
          }
        }
      }
      expect(renders).toBe(280);
      expect(callbacks).toBe(240);
      expect(onLevel).toHaveBeenCalledTimes(240);
      expect(warning).not.toHaveBeenCalled();
    } finally {
      warning.mockRestore();
    }
  });

  it("keeps personal hints/inline guidance and refuses mismatched option-reason counts", () => {
    for (const [index, q] of flat.entries()) {
      const personal = { ...q, hint: "Kişisel hatırlatmam" };
      expect(helpPanels(personal)[0].paragraphs).toContain(personal.hint);
      const inline = {
        ...q,
        guidance: {
          ...rows[index].guidance,
          strategy: "Bu tarihsel kaydın kendi yöntemi.",
        },
      };
      expect(resolvedGuidance(inline)?.strategy).toBe(inline.guidance.strategy);
      expect(previousHelpPanelCount(inline)).toBeUndefined();
      const invalid = {
        ...inline,
        guidance: {
          ...inline.guidance,
          optionReasons: inline.guidance.optionReasons.slice(1),
        },
      };
      expect(resolvedGuidance(invalid)).toBeUndefined();
      const html = renderToStaticMarkup(
        createElement(QuestionHelp, {
          question: q,
          level: 2,
          onLevel: () => {
            throw Error("RENDER_WRITE");
          },
          disabled: true,
        }),
      );
      expect(html).toContain("disabled");
      expect(plain(html)).not.toContain("Doğru yanıt:");
    }
  });
});
