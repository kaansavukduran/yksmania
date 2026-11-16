import { createHash } from "node:crypto";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import rows from "../src/learning/guidance027Physics.json";
import { narrativeScienceQuestions } from "../src/learning/narrativeScienceQuestions";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";

const lessonIds = [
  "fizik-bilimine-giris",
  "madde-ozkutle",
  "dogrusal-hareket",
  "enerji-ve-hareket",
] as const;
const rawQuestions = lessonIds.flatMap((id) => narrativeScienceQuestions[id]);
const flatten = (q: (typeof rawQuestions)[number]): HelpQuestion => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((option) => option.tr),
  answer: q.answer,
  explanation: q.explanation.tr,
  hint: q.hint.tr,
});
// The raw bank stays byte-for-byte equivalent as data. Root owns two guarded
// presentation revisions; this whitelist audits their exact prompt-only views.
const auditedPresentationExceptions: Record<string, string> = {
  "ns-motion-4":
    "Doğrusal hareket yapan bir cismin hız–zaman ilişkisinin ilk bölümü boyunca hızı sıfır veya pozitif, ikinci bölümü boyunca sıfır veya negatiftir. İlk bölümdeki işaretli alan +12 m, ikinci bölümdeki işaretli alan −5 m’dir. Başka bölüm yoktur. Toplam yer değiştirme ve alınan yol nedir?",
  "ns-energy-4":
    "Başlangıçta mekanik enerjisi 200 J olan bir sistemde mekanik enerji yalnız kinetik enerji ile yerçekimi potansiyel enerjisinin toplamıdır. Mekanik enerjinin 40 J kadarı iç enerjiye aktarılır; mekanik enerjiyi değiştiren başka bir aktarım yoktur. Son yerçekimi potansiyel enerjisi 60 J ise son kinetik enerji nedir?",
};
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
    .update(JSON.stringify(stable(rawQuestions)))
    .digest("hex");
const expectedRawSHA =
  "11df88678166634dd66566aac903155f0533780f016fa1911fd2ccb817e1c29a";
const displayed = (raw: HelpQuestion): HelpQuestion => ({
  ...raw,
  prompt: auditedPresentationExceptions[raw.id] ?? raw.prompt,
});
const byId = new Map(rawQuestions.map((q) => [q.id, flatten(q)]));
const escaped = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");
let renderCount = 0;
const render = (q: HelpQuestion, level: number) => {
  renderCount++;
  return renderToStaticMarkup(
    createElement(QuestionHelp, {
      question: q,
      level,
      onLevel: () => {
        throw Error("Render must not dispatch a help event");
      },
    }),
  );
};

describe("027 physics exact old-card bindings", () => {
  it("keeps all20 complete raw questions, including hints/explanations, unchanged", () => {
    expect(rawQuestions).toHaveLength(20);
    expect(rawSHA()).toBe(expectedRawSHA);
    expect(rawQuestions.map((q) => q.options.length)).toEqual(
      Array(20).fill(5),
    );
    expect(rows.map((row) => row.id)).toEqual(rawQuestions.map((q) => q.id));
    expect(new Set(rows.map((row) => row.id)).size).toBe(20);
  });
  it("allows only the two named audited presentation exceptions and only a prompt delta", () => {
    expect(Object.keys(auditedPresentationExceptions)).toEqual([
      "ns-motion-4",
      "ns-energy-4",
    ]);
    const revised: string[] = [];
    for (const row of rows) {
      const raw = byId.get(row.id)!;
      const originalCore = JSON.parse(questionIdentity(raw)) as unknown[];
      const boundCore = JSON.parse(row.identity) as unknown[];
      expect(boundCore).toHaveLength(6);
      if (Object.hasOwn(auditedPresentationExceptions, row.id)) {
        expect(boundCore[1]).toBe(auditedPresentationExceptions[row.id]);
        expect(boundCore[1]).not.toBe(originalCore[1]);
        expect(boundCore.filter((_, i) => i !== 1)).toEqual(
          originalCore.filter((_, i) => i !== 1),
        );
        revised.push(row.id);
      } else expect(boundCore).toEqual(originalCore);
      expect(row.identity).toBe(questionIdentity(displayed(raw)));
    }
    expect(revised).toEqual(["ns-motion-4", "ns-energy-4"]);
    expect(rawSHA()).toBe(expectedRawSHA);
  });
});
describe("027 authored teaching guidance", () => {
  it("supplies distinct knowledge/methods,60progressing steps and100option-specific reasons", () => {
    expect(rows.reduce((n, row) => n + row.guidance.steps.length, 0)).toBe(60);
    expect(
      rows.reduce((n, row) => n + row.guidance.optionReasons.length, 0),
    ).toBe(100);
    expect(new Set(rows.map((row) => row.guidance.strategy)).size).toBe(20);
    expect(
      new Set(rows.map((row) => JSON.stringify(row.guidance.knowledge))).size,
    ).toBe(20);
    const panelTitles = [
      "Bilmen gerekenler",
      "Çözüm yolu",
      "Tam çözüm",
      "Şıkların mantığı",
      "Sık hata",
      "Sonucu kontrol et",
    ];
    for (const row of rows) {
      const q = byId.get(row.id)!;
      const g = questionGuidanceSchema.parse(row.guidance);
      expect(g).toEqual(row.guidance);
      expect(g.steps).toHaveLength(3);
      expect(new Set(g.steps).size).toBe(3);
      expect(g.optionReasons).toHaveLength(q.options.length);
      expect(
        g.optionReasons.filter((reason) => reason.startsWith("Doğru.")),
      ).toHaveLength(1);
      expect(g.optionReasons[q.answer]).toMatch(/^Doğru\./);
      expect(g.strategy).not.toContain(q.options[q.answer]);
      expect(g.strategy).not.toBe(q.hint);
      expect(g.strategy).not.toBe(q.explanation);
      expect(g.steps).not.toContain(g.strategy);
      expect(g.knowledge).not.toContain(g.strategy);
      for (const text of [
        ...g.knowledge,
        g.strategy,
        ...g.steps,
        ...g.optionReasons,
        g.commonError,
        g.check,
      ])
        expect(panelTitles).not.toContain(text);
      for (const step of g.steps) {
        expect(step).not.toBe(q.hint);
        expect(step).not.toBe(q.explanation);
      }
    }
  });
  it("renders staged knowledge/method/each step before the explicit solution for all20 actual cards", () => {
    const beforeRenders = renderCount,
      warnings: string[] = [],
      originalError = console.error;
    console.error = (...args) => {
      warnings.push(args.map(String).join(" "));
    };
    try {
      for (const row of rows) {
        const original = byId.get(row.id)!;
        const q = { ...displayed(original), guidance: row.guidance };
        const panels = helpPanels(q);
        expect(panels).toHaveLength(5);
        expect(resolvedGuidance(q)).toEqual(row.guidance);
        const hidden = render(q, 0);
        expect(hidden).not.toContain("help-content");
        for (let level = 1; level <= 5; level++) {
          const html = render(q, level);
          expect(html).toContain(escaped(q.hint!));
          for (const knowledge of row.guidance.knowledge)
            expect(html).toContain(escaped(knowledge));
          expect(html).not.toContain("help-full-solution");
          expect(html).not.toContain("Doğru yanıt:");
          expect(html).not.toContain(escaped(q.explanation));
          if (level >= 2)
            expect(html).toContain(escaped(row.guidance.strategy));
          else expect(html).not.toContain(escaped(row.guidance.strategy));
          for (let i = 0; i < 3; i++) {
            if (i + 3 <= level)
              expect(html).toContain(escaped(row.guidance.steps[i]));
            else expect(html).not.toContain(escaped(row.guidance.steps[i]));
          }
        }
        const full = render(q, 6);
        expect(full).toContain(
          "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
        );
        expect(full).toContain(escaped(q.explanation));
        for (const reason of row.guidance.optionReasons)
          expect(full).toContain(escaped(reason));
        expect(full).toContain(escaped(row.guidance.commonError));
        expect(full).toContain(escaped(row.guidance.check));
        expect(full).not.toContain("help-next");
        expect(full).toContain("Yardım alındı");
        expect(q.prompt).toBe(
          auditedPresentationExceptions[q.id] ?? original.prompt,
        );
      }
    } finally {
      console.error = originalError;
    }
    expect(renderCount - beforeRenders).toBe(140);
    expect(warnings).toEqual([]);
    expect(rawSHA()).toBe(expectedRawSHA);
  });
});
