import { createHash } from "node:crypto";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
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
import { effectiveHelpLevel } from "../src/learning/helpProgression";
import {
  helpPanels,
  previousHelpPanelCount,
  resolvedGuidance,
} from "../src/learning/questionHelp";
import curated from "../src/learning/questionHelpCatalogue.json";
import math from "../src/learning/guidance027Math.json";
import physics from "../src/learning/guidance027Physics.json";
import chemistry from "../src/learning/guidance027Chemistry.json";
import biologyA from "../src/learning/guidance027BiologyA.json";
import biologyB from "../src/learning/guidance027BiologyB.json";
import biologyC from "../src/learning/guidance027BiologyC.json";
import historyA from "../src/learning/guidance027HistoryA.json";
import historyB from "../src/learning/guidance027HistoryB.json";

// This is an integration gate, with no catalogue mock or inline guidance fixture.
// It deliberately fails before the root's 026 merge and 027 runtime registration.
const groups = [
  ["Math", math],
  ["Physics", physics],
  ["Chemistry", chemistry],
  ["BiologyA", biologyA],
  ["BiologyB", biologyB],
  ["BiologyC", biologyC],
  ["HistoryA", historyA],
  ["HistoryB", historyB],
] as const;
const rows = groups.flatMap(([, cohort]) => cohort);
const all = lessons.flatMap((lesson) => lesson.questions);
const rawById = new Map(all.map((question) => [question.id, question]));
const raw = (id: string): Question => {
  const question = rawById.get(id);
  if (!question) throw Error(`MISSING_027_ORIGINAL:${id}`);
  return question;
};
const original = rows.map((row) => raw(row.id));
const flat = (question: Question): HelpQuestion => ({
  id: question.id,
  prompt: question.prompt.tr,
  passage: question.passage?.tr,
  options: question.options.map((option) => option.tr),
  answer: question.answer,
  hint: question.hint.tr,
  explanation: question.explanation.tr,
  guidance: question.guidance,
});
const shown = (question: Question) => flat(localizedQuestionView(question));
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
const old20Ids = ["r", "c", "n", "p"].flatMap((prefix) =>
  [1, 2, 3, 4, 5].map((number) => prefix + number),
);
const presentationPrompts = {
  "ns-motion-4":
    "Doğrusal hareket yapan bir cismin hız–zaman ilişkisinin ilk bölümü boyunca hızı sıfır veya pozitif, ikinci bölümü boyunca sıfır veya negatiftir. İlk bölümdeki işaretli alan +12 m, ikinci bölümdeki işaretli alan −5 m’dir. Başka bölüm yoktur. Toplam yer değiştirme ve alınan yol nedir?",
  "ns-energy-4":
    "Başlangıçta mekanik enerjisi 200 J olan bir sistemde mekanik enerji yalnız kinetik enerji ile yerçekimi potansiyel enerjisinin toplamıdır. Mekanik enerjinin 40 J kadarı iç enerjiye aktarılır; mekanik enerjiyi değiştiren başka bir aktarım yoktur. Son yerçekimi potansiyel enerjisi 60 J ise son kinetik enerji nedir?",
};

describe("027 gerçek yardım kataloğunun 205 eski soruya bağlanması", () => {
  it("sekiz kohortu ve eski 205 tam soru payloadını donmuş kanonik SHA ile korur", () => {
    expect(groups.map(([, cohort]) => cohort.length)).toEqual([
      30, 20, 10, 20, 20, 20, 35, 50,
    ]);
    expect(rows).toHaveLength(205);
    expect(new Set(rows.map((row) => row.id)).size).toBe(205);
    // Captured from both pre-registration worktrees and checked against the
    // existing independent family freezes. Includes original hints/metadata.
    expect(digest(original)).toBe(
      "a208bbbba6ab10b80cc2dc0ec090d5fa8e6fb9be3ff5010fc563f791a0a41321",
    );
    expect(
      groups.map(([, cohort]) => digest(cohort.map((row) => raw(row.id)))),
    ).toEqual([
      "eb540e708a4606240e91da957a2e7df44537dae6b3d6ca244405f7b4668c7c54",
      "11df88678166634dd66566aac903155f0533780f016fa1911fd2ccb817e1c29a",
      "3a76599caa36c094bafca4ef9edb6d2a799f688eeb9677d7b33064578fcc0ebc",
      "dbeb966d24c4ebbdb6d3e8e669f62f072a003c202a24eca664bf3384a304872f",
      "46060984bf192531660d2a4a23964a41d4855463d48602901b4d4fc3bf7b3d31",
      "8a04924414cc2ba8f5b350a68ab8254216ce199d0eaad59d6b2e9caaff39bfe3",
      "f32e40161dc8b80b3a1ff323b1bf39c03e07ea1be12de66c38603382c1eeb0d3",
      "2400f828f763f1893af1b5fa4923fd324a6b16fea62bc37a62ab1cf0ffdd9bd7",
    ]);
  });

  it("205 özgül yöntem, 615 ayrı adım ve gerçek sırada 1025 şık gerekçesi içerir", () => {
    expect(new Set(rows.map((row) => fold(row.guidance.strategy))).size).toBe(
      205,
    );
    expect(rows.reduce((n, row) => n + row.guidance.steps.length, 0)).toBe(615);
    expect(
      rows.reduce((n, row) => n + row.guidance.optionReasons.length, 0),
    ).toBe(1025);
    for (const row of rows) {
      const question = shown(raw(row.id));
      const guidance = questionGuidanceSchema.parse(row.guidance);
      expect(Object.keys(row).sort()).toEqual(["guidance", "id", "identity"]);
      expect(row.identity, row.id).toBe(questionIdentity(question));
      expect(question.options).toHaveLength(5);
      // Keep scientific signs: +7 and −7 are distinct answer choices.
      expect(
        new Set(
          question.options.map((option) =>
            option.normalize("NFKC").replace(/\s+/g, " ").trim(),
          ),
        ).size,
      ).toBe(5);
      expect(guidance.steps).toHaveLength(3);
      expect(guidance.optionReasons).toHaveLength(question.options.length);
      const panels = [
        ...guidance.knowledge,
        guidance.strategy,
        ...guidance.steps,
      ].map(fold);
      expect(new Set(panels).size, row.id).toBe(panels.length);
      expect(new Set(guidance.optionReasons.map(fold)).size, row.id).toBe(5);
      expect(guidance.steps.map(fold)).not.toContain(
        fold(question.explanation),
      );
    }
  });

  it("yalnız gerçek katalogdan çözer; yeni 205 kayda legacy1 bağlar ve inline numarayı korur", () => {
    // The runtime combines the original JSON and the eight reviewed modules;
    // registration does not rewrite the original twenty-row JSON artifact.
    expect(curated).toHaveLength(20);
    expect(new Set([...curated, ...rows].map((row) => row.id)).size).toBe(225);
    for (const row of rows) {
      const question = shown(raw(row.id));
      expect(question.guidance).toBeUndefined();
      expect(resolvedGuidance(question), row.id).toEqual(row.guidance);
      expect(previousHelpPanelCount(question), row.id).toBe(1);
      expect(helpPanels(question)).toHaveLength(5);
      const inline = { ...question, guidance: row.guidance };
      expect(previousHelpPanelCount(inline)).toBeUndefined();
      expect(resolvedGuidance(inline)).toBe(row.guidance);
      expect(
        effectiveHelpLevel(
          helpPanels(inline),
          2,
          undefined,
          previousHelpPanelCount(inline),
          inline.hint,
        ),
      ).toBe(2);
    }
  });

  it("1230 değişmiş kimlikli geçmiş snapshotı yeni rehbere bağlamaz veya değiştirmez", () => {
    for (const row of rows) {
      const question = flat(raw(row.id));
      const variants: HelpQuestion[] = [
        { ...question, id: question.id + "-retained-snapshot" },
        { ...question, prompt: question.prompt + " Başka koşul." },
        { ...question, passage: "Değişmiş geçmiş pasaj." },
        {
          ...question,
          options: [
            question.options[1],
            question.options[0],
            ...question.options.slice(2),
          ],
        },
        {
          ...question,
          answer: (question.answer + 1) % question.options.length,
        },
        { ...question, explanation: question.explanation + " Başka açıklama." },
      ];
      for (const changed of variants) {
        const retained = freeze(structuredClone(changed));
        const before = JSON.stringify(retained);
        expect(resolvedGuidance(retained), row.id).toBeUndefined();
        expect(previousHelpPanelCount(retained), row.id).toBeUndefined();
        expect(clarifiedQuestionView(retained)).toBe(retained);
        expect(JSON.stringify(retained)).toBe(before);
      }
    }
  });

  it("yalnız iki denetlenmiş fizik kökünü görünümde netleştirir; ham 205 soru değişmez", () => {
    const revised: string[] = [];
    for (const row of rows) {
      const question = freeze(structuredClone(raw(row.id)));
      const before = JSON.stringify(question);
      const view = localizedQuestionView(question);
      const plainView = clarifiedQuestionView(flat(question));
      expect(flat(view)).toEqual(plainView);
      expect(questionIdentity(plainView)).toBe(row.identity);
      const expected =
        presentationPrompts[row.id as keyof typeof presentationPrompts];
      if (expected) {
        revised.push(row.id);
        expect(view).not.toBe(question);
        expect(plainView.prompt).toBe(expected);
        expect(plainView.prompt).not.toBe(question.prompt.tr);
        expect({ ...view, prompt: question.prompt }).toEqual(question);
        expect({ ...plainView, prompt: question.prompt.tr }).toEqual(
          flat(question),
        );
        expect(resolvedGuidance(flat(question))).toEqual(row.guidance);
      } else {
        expect(view).toBe(question);
        expect(questionIdentity(flat(question))).toBe(row.identity);
      }
      expect(JSON.stringify(question)).toBe(before);
    }
    expect(revised.sort()).toEqual(["ns-energy-4", "ns-motion-4"]);
  });

  it("ilk 20 zengin katalog kaydını, eski sorularını ve mevcut numaralarını korur", () => {
    const original20 = old20Ids.map(raw);
    expect(digest(original20)).toBe(
      "1a8c9e732a09bc048a9b7165864cc6d706f61642af832fe5643224e01b6ba778",
    );
    expect(
      digest(old20Ids.map((id) => curated.find((entry) => entry.id === id))),
    ).toBe("ce87ba2ac5fba472b7aaf7379222375bfacf05ef1e1458c9797564aef3f8e5e6");
    for (const question of original20) {
      expect(localizedQuestionView(question)).toBe(question);
      const current = flat(question);
      expect(previousHelpPanelCount(current)).toBeUndefined();
      expect(resolvedGuidance(current)).toEqual(
        curated.find((entry) => entry.id === current.id)!.guidance,
      );
      expect(
        effectiveHelpLevel(
          helpPanels(current),
          2,
          undefined,
          previousHelpPanelCount(current),
          current.hint,
        ),
      ).toBe(2);
    }
  });

  it("1435 gerçek yardım görünümünde bilgi, yöntem ve üç adımı sırayla açar", () => {
    const warnings = vi.spyOn(console, "error").mockImplementation(() => {});
    const onLevel = vi.fn();
    try {
      for (const row of rows) {
        const question = shown(raw(row.id));
        for (let level = 0; level <= 6; level++) {
          const html = renderToStaticMarkup(
            createElement(QuestionHelp, { question, level, onLevel }),
          );
          const text = plain(html);
          for (const knowledge of row.guidance.knowledge)
            expect(text.includes(knowledge), row.id).toBe(level >= 1);
          expect(text.includes(row.guidance.strategy), row.id).toBe(level >= 2);
          for (const [index, step] of row.guidance.steps.entries())
            expect(text.includes(step), row.id).toBe(level >= index + 3);
          expect(html.includes('aria-label="Tam çözüm"')).toBe(level === 6);
          expect(text.includes("Doğru yanıt:")).toBe(level === 6);
          if (level === 6) {
            expect(text).toContain(question.explanation);
            for (const reason of row.guidance.optionReasons)
              expect(text).toContain(reason);
            expect(text).toContain(row.guidance.commonError);
            expect(text).toContain(row.guidance.check);
          }
        }
      }
      expect(onLevel).not.toHaveBeenCalled();
      expect(warnings).not.toHaveBeenCalled();
    } finally {
      warnings.mockRestore();
    }
  });

  it("kabul edilen 2508 rehberi korur ve sonraki katalog ekleri için kısmi kapsamı büyütmez", () => {
    expect(all).toHaveLength(5883);
    expect(new Set(all.map((question) => question.id)).size).toBe(5883);
    const full = all.filter((question) => resolvedGuidance(shown(question)));
    const partial = all.filter(
      (question) => !resolvedGuidance(shown(question)),
    );
    const acceptedIds = new Set([
      ...old20Ids,
      ...rows.map((row) => row.id),
      ...all.filter((q) => q.guidance).map((q) => q.id),
    ]);
    expect(acceptedIds.size).toBe(2508);
    for (const question of all.filter((q) => acceptedIds.has(q.id)))
      expect(resolvedGuidance(shown(question)), question.id).toBeDefined();
    expect(full.length).toBeGreaterThanOrEqual(2508);
    expect(partial.length).toBeLessThanOrEqual(3375);
    expect(full.length + partial.length).toBe(all.length);
    for (const question of partial)
      expect(helpPanels(shown(question)).length).toBeLessThanOrEqual(1);
  });
});
