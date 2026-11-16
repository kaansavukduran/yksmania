import { createHash } from "node:crypto";
import { Children, createElement, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance028ChemistryB.json";
import { lessons } from "../src/domain/content";
import type { Question } from "../src/domain/model";
import {
  clarifiedQuestionView,
  localizedQuestionView,
} from "../src/domain/questionPresentation";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import { QuestionHelp } from "../src/components/QuestionHelp";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";

// Scoped catalogue fixture: root owns runtime registration of these fifty rows.
vi.mock("../src/learning/questionHelpCatalogue.json", async () => ({
  default: (await import("../src/learning/guidance028ChemistryB.json")).default,
}));
const lessonIds = [
  "atom-capi-karsilastirma",
  "iyonlasma-enerjisi",
  "elektron-ilgisi-elektronegatiflik",
  "kimyasal-turler-lewis",
  "iyonik-bag-ve-guclu-etkilesimler",
  "iyonik-bilesik-adlandirma",
  "kimyasal-denge",
];
const original = lessonIds.flatMap(
  (id) => lessons.find((lesson) => lesson.id === id)!.questions,
);
const flatten = (q: Question): HelpQuestion => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((option) => option.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
});
const flat = original.map(flatten);
// Root-approved prompt-only views; raw original records remain unchanged.
// Literal expected prompts also verify the root's actual guarded projection.
const auditedPresentationExceptions: Record<string, string> = {
  "eq-2":
    "Sabit sıcaklıkta, ideal gazların A(g) ⇌ B(g) homojen dengesinde [A]=1 mol/L ve [B]=2 mol/L’dir. Derişimler cinsinden denge sabiti Kc kaçtır?",
  "eq-5":
    "Sabit sıcaklıkta, ideal gazların A(g) ⇌ B(g) homojen dengesi için Kc=2 ve toplam denge derişimi [A]+[B]=6 mol/L’dir. Denge karışımı hangisidir?",
  "iyonik-bilesik-adlandirma-q2":
    "Fe₂O₃’te oksidin yükü −2’dir ve her Fe aynı yükü taşır. Stock (Roma rakamlı) iyonik adlandırmaya göre bileşiğin adı hangisidir?",
};
const visible = (q: HelpQuestion): HelpQuestion => ({
  ...q,
  prompt: auditedPresentationExceptions[q.id] ?? q.prompt,
});
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
const fold = (text: string) =>
  text
    .normalize("NFKC")
    .toLocaleLowerCase("tr-TR")
    .replace(/[\p{P}\p{S}\s]+/gu, "");
const plain = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
const freeze = <T>(value: T): T => {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
};
const button = (tree: ReactNode): { onClick: () => void } | undefined => {
  let result: { onClick: () => void } | undefined;
  Children.forEach(tree, (node) => {
    if (!isValidElement<{ children?: ReactNode; onClick?: () => void }>(node))
      return;
    if (node.type === "button" && node.props.onClick)
      result = { onClick: node.props.onClick };
    else result ??= button(node.props.children);
  });
  return result;
};
const correct = (index: number) => flat[index].options[flat[index].answer];

describe("028 Kimya B eski elli karta özgü yardım", () => {
  it("50 eski tam sorunun bütün alanlarını ve gerçek 3/5 seçenek sayılarını korur", () => {
    expect(original).toHaveLength(50);
    expect(digest(original)).toBe(
      "60702ab5f3ce2753ff43d2a567deeb9e8f42be5b0992c82217a4682f032f3240",
    );
    expect(rows.map((row) => row.id)).toEqual(flat.map((q) => q.id));
    expect(new Set(rows.map((row) => row.id)).size).toBe(50);
    expect(flat.filter((q) => q.options.length === 5)).toHaveLength(45);
    expect(flat.filter((q) => q.options.length === 3)).toHaveLength(5);
    for (const q of original) expect(q.guidance).toBeUndefined();
  });

  it("47 ham kimlik ve yalnız üç açık koşullu görünüm kimliğini tam veriye bağlar", () => {
    expect(Object.keys(auditedPresentationExceptions)).toHaveLength(3);
    let changed = 0;
    for (const [index, row] of rows.entries()) {
      const raw = flat[index];
      const displayed = visible(raw);
      expect(row.identity).toBe(questionIdentity(displayed));
      const core = JSON.parse(row.identity) as unknown[];
      const rawCore = JSON.parse(questionIdentity(raw)) as unknown[];
      if (auditedPresentationExceptions[row.id]) {
        changed++;
        expect(core[1]).not.toBe(rawCore[1]);
        expect([core[0], ...core.slice(2)]).toEqual([
          rawCore[0],
          ...rawCore.slice(2),
        ]);
      } else expect(row.identity).toBe(questionIdentity(raw));
      expect(displayed.options).toBe(raw.options);
      expect(displayed.answer).toBe(raw.answer);
      expect(displayed.explanation).toBe(raw.explanation);
      expect(displayed.hint).toBe(raw.hint);
    }
    expect(changed).toBe(3);
  });

  it("gerçek kök görünümü yalnız üç promptu kopyalar ve eski soru nesnelerini değiştirmez", () => {
    const revised: string[] = [];
    for (const [index, q] of original.entries()) {
      const retained = freeze(structuredClone(q));
      const before = JSON.stringify(retained);
      const projected = localizedQuestionView(retained);
      const flatProjection = clarifiedQuestionView(flatten(retained));
      expect(flatten(projected)).toEqual(visible(flat[index]));
      expect(flatProjection).toEqual(visible(flat[index]));
      expect(questionIdentity(flatProjection)).toBe(rows[index].identity);
      expect(resolvedGuidance(flatten(retained))).toEqual(rows[index].guidance);
      if (auditedPresentationExceptions[q.id]) {
        revised.push(q.id);
        expect(projected).not.toBe(retained);
        expect({ ...projected, prompt: retained.prompt }).toEqual(retained);
      } else expect(projected).toBe(retained);
      expect(JSON.stringify(retained)).toBe(before);
    }
    expect(revised.sort()).toEqual(
      Object.keys(auditedPresentationExceptions).sort(),
    );
  });

  it("50 ayrı bilgi ve yöntemden 150 ilerleyen adım ve 240 özgül seçenek nedeni kurar", () => {
    expect(new Set(rows.map((row) => fold(row.guidance.strategy))).size).toBe(
      50,
    );
    expect(rows.reduce((n, row) => n + row.guidance.steps.length, 0)).toBe(150);
    expect(
      rows.reduce((n, row) => n + row.guidance.optionReasons.length, 0),
    ).toBe(240);
    for (const [index, row] of rows.entries()) {
      expect(Object.keys(row).sort()).toEqual(["guidance", "id", "identity"]);
      const g = questionGuidanceSchema.parse(row.guidance);
      const q = visible(flat[index]);
      expect(g.steps).toHaveLength(3);
      const sections = [...g.knowledge, g.strategy, ...g.steps].map(fold);
      expect(new Set(sections).size, row.id).toBe(sections.length);
      expect(sections).not.toContain(fold(q.hint!));
      expect(g.steps.map(fold)).not.toContain(fold(q.explanation));
      expect(g.optionReasons).toHaveLength(q.options.length);
      expect(new Set(g.optionReasons.map(fold)).size).toBe(q.options.length);
      for (const [option, reason] of g.optionReasons.entries()) {
        expect(reason.length).toBeGreaterThan(45);
        expect(reason.startsWith("Doğru."), row.id).toBe(option === q.answer);
      }
      expect(g.commonError.length).toBeGreaterThan(45);
      expect(g.check.length).toBeGreaterThan(45);
      expect(resolvedGuidance(q)).toEqual(g);
    }
  });

  it("300 değişmiş kimlikli geçmiş karta yeni rehber bağlamaz ve snapshotı değiştirmez", () => {
    for (const raw of flat) {
      const q = visible(raw);
      const changes: HelpQuestion[] = [
        { ...q, id: q.id + "-historical" },
        { ...q, prompt: q.prompt + " Başka koşul." },
        { ...q, passage: "Başka geçmiş pasaj." },
        { ...q, options: [q.options[1], q.options[0], ...q.options.slice(2)] },
        { ...q, answer: (q.answer + 1) % q.options.length },
        { ...q, explanation: q.explanation + " Başka açıklama." },
      ];
      for (const changed of changes) {
        const retained = freeze(structuredClone(changed));
        const before = JSON.stringify(retained);
        expect(resolvedGuidance(retained)).toBeUndefined();
        expect(clarifiedQuestionView(retained)).toBe(retained);
        expect(JSON.stringify(retained)).toBe(before);
      }
      // Hint is intentionally outside the shared identity; full raw SHA guards it.
      expect(questionIdentity({ ...q, hint: "Başka ipucu" })).toBe(
        questionIdentity(q),
      );
    }
  });

  it("elektron, yük ve basit Lewis bütçelerini bağımsız sayımla denetler", () => {
    const electrons = [8 - -2, 9 - -1, 11 - 1, 12 - 2];
    expect(electrons).toEqual([10, 10, 10, 10]);
    const protons = [8, 9, 11, 12];
    expect(protons.indexOf(Math.max(...protons))).toBe(flat[2].answer);
    expect(correct(16)).toBe(`${12 - 2} ve ${2 - 2}`);
    expect(correct(17)).toContain(`${7 + 1} nokta`);
    const waterBudget = 2 * 1 + 6;
    expect(correct(18)).toBe(`2 ve ${(waterBudget - 2 * 2) / 2}`);
    expect(4 + 2 * 6).toBe(2 * 4 + 4 * 2);
    expect(correct(20)).toBe(`${5 + 4 - 1} ve ${(5 + 4 - 1 - 4 * 2) / 2}`);
    const nitrogenShared = 2 * 8 - 2 * 5;
    expect(correct(21)).toBe(`${nitrogenShared} ve ${2 * 5 - nitrogenShared}`);
    expect(4 + 3 + 4).toBe(5 + 6);
    expect(correct(22)).toContain(`${5 + 6} değerlik elektronu`);
    expect(2 * 2 + 2).toBe(6);
    const energy = [900, 1750, 14850, 21000];
    const gaps = energy.slice(1).map((n, i) => n - energy[i]);
    const outside = gaps.indexOf(Math.max(...gaps)) + 1;
    expect(correct(8)).toBe(String(outside));
  });

  it("en küçük nötr iyon oranlarını sonlu aramayla ve metal yüklerini bilançoyla bulur", () => {
    const ratio = (positive: number, negative: number) => {
      const candidates: [number, number][] = [];
      for (let cation = 1; cation <= 12; cation++)
        for (let anion = 1; anion <= 12; anion++)
          if (cation * positive === anion * negative)
            candidates.push([cation, anion]);
      return candidates.sort((a, b) => a[0] + a[1] - b[0] - b[1])[0];
    };
    expect(ratio(3, 2)).toEqual([2, 3]);
    expect(correct(27)).toBe("Al₂O₃");
    expect(ratio(2, 2)).toEqual([1, 1]);
    expect(correct(30)).toBe("CaO");
    expect(ratio(2, 1)).toEqual([1, 2]);
    expect(correct(37)).toBe("Ca(NO₃)₂");
    expect(correct(36)).toBe(`Demir(${"I".repeat((3 * 2) / 2)}) oksit`);
    expect(correct(38)).toBe(`Bakır(${"I".repeat(2 / 2)}) oksit`);
    expect(correct(41)).toBe(`Demir(${"I".repeat((2 * 3) / 3)}) fosfat`);
    expect(correct(39)).toBe(String(2 * 4));
    expect(correct(43)).toBe("Al₂(SO₄)₃");
    const wrongAlO = [
      [1, 1],
      [3, 2],
      [2, 2],
      [1, 3],
    ];
    expect(wrongAlO.every(([a, b]) => 3 * a - 2 * b !== 0)).toBe(true);
    expect(3 * 2 - 2 * 3).toBe(0);
    expect(2 * 2 - 2 * 2).toBe(0); // Ca₂O₂ neutral but not minimum.
  });

  it("üç seçenekli denge modellerinde oranı, toplamı ve ilk hızları ayrı denetler", () => {
    expect(correct(46)).toBe(String(2 / 1));
    const pairs = [
      [3, 3],
      [4, 2],
      [2, 4],
    ];
    const accepted = pairs.flatMap(([a, b], i) =>
      a + b === 6 && b / a === 2 ? [i] : [],
    );
    expect(accepted).toEqual([flat[49].answer]);
    for (const forward of [0.1, 0.6, 2])
      for (const reverse of [0.2, 0.3, 1]) {
        expect((3 * forward) / (3 * reverse)).toBeCloseTo(forward / reverse);
        for (const b of [0.1, 1, 6]) {
          expect(forward * 0).toBe(0);
          expect(reverse * b).toBeGreaterThan(0);
        }
      }
    expect(flat[47].answer).toBe(0);
    expect(flat[48].answer).toBe(2);
  });

  it("350 gerçek SSR ve 300 native next callback ile yardımın yedi aşamasını açar", () => {
    const warnings = vi.spyOn(console, "error").mockImplementation(() => {});
    const onLevel = vi.fn();
    let calls = 0;
    try {
      for (const [index, row] of rows.entries()) {
        const q = visible(flat[index]);
        expect(helpPanels(q)).toHaveLength(5);
        for (let level = 0; level <= 6; level++) {
          const before = onLevel.mock.calls.length;
          const html = renderToStaticMarkup(
            createElement(QuestionHelp, { question: q, level, onLevel }),
          );
          expect(onLevel.mock.calls).toHaveLength(before);
          const text = plain(html);
          for (const paragraph of row.guidance.knowledge)
            expect(text.includes(paragraph)).toBe(level >= 1);
          expect(text.includes(row.guidance.strategy)).toBe(level >= 2);
          for (const [step, paragraph] of row.guidance.steps.entries())
            expect(text.includes(paragraph)).toBe(level >= step + 3);
          expect(html.includes('aria-label="Tam çözüm"')).toBe(level === 6);
          expect(text.includes("Doğru yanıt:")).toBe(level === 6);
          if (level === 6) {
            expect(text).toContain(q.explanation);
            for (const reason of row.guidance.optionReasons)
              expect(text).toContain(reason);
            expect(text).toContain(row.guidance.commonError);
            expect(text).toContain(row.guidance.check);
          } else {
            const next = button(QuestionHelp({ question: q, level, onLevel }));
            expect(next).toBeDefined();
            next!.onClick();
            expect(onLevel).toHaveBeenLastCalledWith(level + 1);
            calls++;
          }
        }
      }
      expect(calls).toBe(300);
      expect(onLevel).toHaveBeenCalledTimes(300);
      expect(warnings).not.toHaveBeenCalled();
    } finally {
      warnings.mockRestore();
    }
  });
});
