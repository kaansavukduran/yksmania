import { createHash } from "node:crypto";
import { createElement, Children, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance027HistoryB.json";
import { foundation013QuestionsByLesson } from "../src/learning/forge013FoundationQuestions";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";

const lessonIds = [
  "ortacag-dunya",
  "ilk-turk-dunyasi",
  "islam-medeniyetinin-dogusu",
  "turklerin-islamiyeti-kabulu",
  "selcuklu-yerlesme-devletlesme",
];
const originals = lessonIds.flatMap((id) => foundation013QuestionsByLesson[id]);
const flat = originals.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((option) => option.tr),
  answer: q.answer,
  explanation: q.explanation.tr,
  hint: q.hint.tr,
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
const fold = (value: string) => value.replace(/\s+/g, " ").trim();
const plain = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replaceAll("&amp;", "&")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
const button = (tree: ReactNode): { onClick: () => void } | undefined => {
  let found: { onClick: () => void } | undefined;
  Children.forEach(tree, (child) => {
    if (!isValidElement<{ children?: ReactNode; onClick?: () => void }>(child))
      return;
    if (child.type === "button" && child.props.onClick)
      found = { onClick: child.props.onClick };
    else found ??= button(child.props.children);
  });
  return found;
};

describe("027 eski Tarih B 50 sorusuna özgü aşamalı yardım", () => {
  it("eski 50 tam soruyu kimlik, pasaj, kök, şık, anahtar, ipucu ve açıklamasıyla korur", () => {
    expect(originals).toHaveLength(50);
    expect(
      createHash("sha256")
        .update(JSON.stringify(stable(originals)))
        .digest("hex"),
    ).toBe("2400f828f763f1893af1b5fa4923fd324a6b16fea62bc37a62ab1cf0ffdd9bd7");
    expect(rows.map((row) => row.id)).toEqual(flat.map((q) => q.id));
    expect(new Set(rows.map((row) => row.id)).size).toBe(50);
    for (const [i, row] of rows.entries()) {
      expect(Object.keys(row).sort()).toEqual(["guidance", "id", "identity"]);
      expect(row.identity).toBe(questionIdentity(flat[i]));
      expect(originals[i].guidance).toBeUndefined();
      expect(originals[i].options).toHaveLength(5);
      expect(flat[i].passage?.length).toBeGreaterThan(20);
    }
  });

  it("bilgi, yöntem ve 150 ilerleyen adımı ayırır; 250 şık nedenini eski sıraya bağlar", () => {
    expect(rows.reduce((sum, row) => sum + row.guidance.steps.length, 0)).toBe(
      150,
    );
    expect(
      rows.reduce((sum, row) => sum + row.guidance.optionReasons.length, 0),
    ).toBe(250);
    expect(new Set(rows.map((row) => fold(row.guidance.strategy))).size).toBe(
      50,
    );
    expect(
      new Set(rows.map((row) => fold(row.guidance.knowledge.join(" ")))).size,
    ).toBe(50);
    for (const [i, row] of rows.entries()) {
      const g = questionGuidanceSchema.parse(row.guidance),
        q = flat[i];
      expect(g.steps).toHaveLength(3);
      const teaching = [...g.knowledge, g.strategy, ...g.steps].map(fold);
      expect(new Set(teaching).size).toBe(teaching.length);
      expect(teaching).not.toContain(fold(q.hint));
      expect(g.steps).not.toContain(q.explanation);
      expect(g.strategy.length).toBeGreaterThan(70);
      expect(g.strategy).not.toMatch(/Doğru\.|[ABCDE] (?:şıkkı|seçeneği)/);
      expect(g.optionReasons).toHaveLength(q.options.length);
      expect(new Set(g.optionReasons.map(fold)).size).toBe(q.options.length);
      for (const [index, reason] of g.optionReasons.entries()) {
        expect(reason.length).toBeGreaterThan(40);
        expect(reason.startsWith("Doğru."), `${row.id}/${index}`).toBe(
          index === q.answer,
        );
      }
      expect(g.commonError.length).toBeGreaterThan(50);
      expect(g.check.length).toBeGreaterThan(50);
    }
  });

  it("değişmiş sorunun eski yardımı ödünç almasını kimlik düzeyinde ayırır", () => {
    for (const [i, q] of flat.entries()) {
      const changed: HelpQuestion[] = [
        { ...q, id: q.id + "-farkli" },
        { ...q, prompt: q.prompt + " Başka koşul." },
        { ...q, passage: q.passage + " Başka kanıt." },
        { ...q, options: [q.options[1], q.options[0], ...q.options.slice(2)] },
        { ...q, answer: (q.answer + 1) % q.options.length },
        { ...q, explanation: q.explanation + " Başka sonuç." },
      ];
      for (const variant of changed)
        expect(questionIdentity(variant)).not.toBe(rows[i].identity);
      // Existing identity omits hint; the complete original-payload hash above protects it.
      expect(questionIdentity({ ...q, hint: "Başka ipucu." })).toBe(
        rows[i].identity,
      );
    }
  });

  it("50 gerçek bileşende bilgi, yöntem, tek tek adımlar ve tam çözüm kapısını sırayla açar", () => {
    for (const [i, row] of rows.entries()) {
      const q = { ...flat[i], guidance: row.guidance },
        panels = helpPanels(q);
      expect(panels).toHaveLength(5);
      expect(panels[0].paragraphs).toContain(q.hint);
      expect(panels[0].paragraphs).toContain(row.guidance.knowledge[0]);
      expect(panels[1].paragraphs).toEqual([row.guidance.strategy]);
      for (const level of [0, 1, 2, 3, 4, 5, 6]) {
        const html = plain(
          renderToStaticMarkup(
            createElement(QuestionHelp, {
              question: q,
              level,
              onLevel: () => {},
            }),
          ),
        );
        if (level === 0) expect(html).not.toContain("Çözüm rehberi");
        if (level >= 1) expect(html).toContain(row.guidance.knowledge[0]);
        if (level < 2) expect(html).not.toContain(row.guidance.strategy);
        else expect(html).toContain(row.guidance.strategy);
        for (const [step, text] of row.guidance.steps.entries()) {
          if (level >= step + 3) expect(html).toContain(text);
          else expect(html).not.toContain(text);
        }
        if (level < 6) {
          expect(html).not.toContain("Doğru yanıt:");
          for (const reason of row.guidance.optionReasons)
            expect(html).not.toContain(reason);
        } else {
          expect(html).toContain(
            "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
          );
          expect(html).toContain(q.explanation);
          for (const reason of row.guidance.optionReasons)
            expect(html).toContain(reason);
          expect(html).toContain(row.guidance.commonError);
          expect(html).toContain(row.guidance.check);
        }
      }
    }
  });

  it("gerçek aç düğmesi yalnız bir sonraki seviyeyi ister ve tam çözümde kalkar", () => {
    for (const [i, row] of rows.entries()) {
      const q = { ...flat[i], guidance: row.guidance };
      for (const level of [0, 2, 4, 5]) {
        const onLevel = vi.fn(),
          tree = QuestionHelp({ question: q, level, onLevel });
        const action = button(tree);
        expect(action).toBeDefined();
        action!.onClick();
        expect(onLevel).toHaveBeenCalledExactlyOnceWith(level + 1);
      }
      expect(
        button(QuestionHelp({ question: q, level: 6, onLevel: () => {} })),
      ).toBeUndefined();
      const disabled = renderToStaticMarkup(
        createElement(QuestionHelp, {
          question: q,
          level: 2,
          disabled: true,
          onLevel: () => {},
        }),
      );
      expect(disabled).toMatch(/<button[^>]*disabled=""/);
    }
  });

  it("yanlış uzunluktaki şık nedenlerini tam yardımmış gibi sunmaz", () => {
    for (const [i, row] of rows.entries()) {
      const q = {
        ...flat[i],
        guidance: {
          ...row.guidance,
          optionReasons: row.guidance.optionReasons.slice(1),
        },
      };
      expect(resolvedGuidance(q)).toBeUndefined();
      expect(helpPanels(q)).toEqual([
        { title: "İlk ipucu", paragraphs: [q.hint] },
      ]);
    }
  });
});
