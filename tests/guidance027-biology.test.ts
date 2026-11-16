import { createHash } from "node:crypto";
import { Children, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import rowsA from "../src/learning/guidance027BiologyA.json";
import rowsB from "../src/learning/guidance027BiologyB.json";
import rowsC from "../src/learning/guidance027BiologyC.json";
import { lessons } from "../src/domain/content";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";

const groups = [
  ["canli-ozellikleri", "bilimsel-yontem", "mineraller", "su-asit-baz-tuz"],
  ["karbohidratlar", "lipitler"],
  ["proteinler", "enzimler", "vitaminler"],
];
const originals = groups.map((ids) =>
  ids.flatMap((id) => lessons.find((lesson) => lesson.id === id)!.questions),
);
const original = originals.flat();
const flat: HelpQuestion[] = original.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
}));
const rows = [...rowsA, ...rowsB, ...rowsC];
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
const digest = (x: unknown) =>
  createHash("sha256")
    .update(JSON.stringify(stable(x)))
    .digest("hex");
const fold = (s: string) =>
  s
    .normalize("NFKC")
    .replace(/[\p{P}\p{S}\s]/gu, "")
    .toLocaleLowerCase("tr-TR");
const plain = (s: string) =>
  s
    .replace(/<[^>]*>/g, "")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
const findButton = (tree: ReactNode): Record<string, unknown> | undefined => {
  let found: Record<string, unknown> | undefined;
  Children.forEach(tree, (node) => {
    if (!isValidElement<Record<string, unknown>>(node) || found) return;
    found =
      node.type === "button"
        ? node.props
        : findButton(node.props.children as ReactNode);
  });
  return found;
};
const qById = (id: string) => flat.find((q) => q.id === id)!;
const correct = (id: string) => {
  const q = qById(id);
  return q.options[q.answer];
};

describe("027 dokuz eski biyoloji dersinin altmış kartına özgü yardım", () => {
  it("altmış eski sorunun tam payloadını, ipucu ve açıklamalar dahil dondurulmuş SHA ile korur", () => {
    expect(originals.map((qs) => qs.length)).toEqual([20, 20, 20]);
    expect(digest(original)).toBe(
      "3b8ffc6e4ce02f78765090689fca3a6dcfeb4aebd43f17727650438fbccd4e68",
    );
    expect(originals.map(digest)).toEqual([
      "dbeb966d24c4ebbdb6d3e8e669f62f072a003c202a24eca664bf3384a304872f",
      "46060984bf192531660d2a4a23964a41d4855463d48602901b4d4fc3bf7b3d31",
      "8a04924414cc2ba8f5b350a68ab8254216ce199d0eaad59d6b2e9caaff39bfe3",
    ]);
    expect(rows.map((row) => row.id)).toEqual(flat.map((q) => q.id));
    expect(new Set(rows.map((row) => row.id)).size).toBe(60);
    for (const [i, row] of rows.entries()) {
      expect(Object.keys(row).sort()).toEqual(["guidance", "id", "identity"]);
      expect(row.identity, row.id).toBe(questionIdentity(flat[i]));
      expect(JSON.parse(row.identity)).toEqual([
        flat[i].id,
        flat[i].prompt,
        flat[i].passage ?? "",
        flat[i].options,
        flat[i].answer,
        flat[i].explanation,
      ]);
    }
  });

  it("bilgi ve yöntem tekrar etmeden 180 adımı ve gerçek sıradaki 300 şık nedenini bağlar", () => {
    expect(rows.reduce((n, row) => n + row.guidance.steps.length, 0)).toBe(180);
    expect(
      rows.reduce((n, row) => n + row.guidance.optionReasons.length, 0),
    ).toBe(300);
    expect(new Set(rows.map((row) => fold(row.guidance.strategy))).size).toBe(
      60,
    );
    for (const [i, row] of rows.entries()) {
      const g = questionGuidanceSchema.parse(row.guidance);
      const q = flat[i];
      expect(g.steps).toHaveLength(3);
      expect(new Set(g.steps.map(fold)).size).toBe(3);
      expect(g.knowledge.length).toBeGreaterThanOrEqual(1);
      expect(g.optionReasons).toHaveLength(q.options.length);
      expect(new Set(g.optionReasons.map(fold)).size).toBe(q.options.length);
      for (const knowledge of g.knowledge) {
        expect(fold(knowledge)).not.toBe(fold(g.strategy));
        expect(g.steps.map(fold)).not.toContain(fold(knowledge));
      }
      expect(g.steps.map(fold)).not.toContain(fold(g.strategy));
      expect([...g.knowledge, g.strategy, ...g.steps].map(fold)).not.toContain(
        fold(q.hint!),
      );
      expect(g.steps.map(fold)).not.toContain(fold(q.explanation));
      expect(g.strategy).not.toMatch(/(?:doğru|yanıt|cevap)\s*[:=]\s*[A-E]/i);
      for (const [option, reason] of g.optionReasons.entries()) {
        expect(reason.length, row.id + "/" + option).toBeGreaterThan(40);
        expect(reason.startsWith("Doğru."), row.id + "/" + option).toBe(
          option === q.answer,
        );
      }
      expect(g.commonError.length).toBeGreaterThan(40);
      expect(g.check.length).toBeGreaterThan(40);
    }
  });

  it("değişmiş kök, pasaj, şık sırası, anahtar veya açıklamayı aynı katalog kartı saymaz", () => {
    for (const [i, q] of flat.entries()) {
      for (const changed of [
        { ...q, id: q.id + "-changed" },
        { ...q, prompt: q.prompt + " ek bilgi" },
        { ...q, passage: "Başka bir pasaj" },
        { ...q, options: [q.options[1], q.options[0], ...q.options.slice(2)] },
        { ...q, answer: (q.answer + 1) % q.options.length },
        { ...q, explanation: q.explanation + " ek bilgi" },
      ])
        expect(questionIdentity(changed)).not.toBe(rows[i].identity);
      // The existing identity contract omits hint; the full raw-payload SHA protects it.
      expect(questionIdentity({ ...q, hint: "Başka ipucu" })).toBe(
        rows[i].identity,
      );
    }
  });

  it("gerçek QuestionHelp üzerinde bütün kartları yedi düzeyde aşamalı açar", () => {
    for (const [i, row] of rows.entries()) {
      const question = { ...flat[i], guidance: row.guidance };
      const panels = helpPanels(question);
      expect(panels.map((panel) => panel.title)).toEqual([
        "Bilmen gerekenler",
        "Çözüm yolu",
        "1. adım",
        "2. adım",
        "3. adım",
      ]);
      expect(panels[0].paragraphs).toContain(question.hint);
      expect(panels[0].paragraphs).toContain(row.guidance.knowledge[0]);
      for (let level = 0; level <= 6; level++) {
        const tree = QuestionHelp({ question, level, onLevel: () => {} });
        const html = renderToStaticMarkup(tree);
        const text = plain(html);
        expect(text.includes(row.guidance.knowledge[0])).toBe(level >= 1);
        expect(text.includes(row.guidance.strategy)).toBe(level >= 2);
        row.guidance.steps.forEach((step, index) => {
          expect(text.includes(step), row.id + "/step" + index).toBe(
            level >= index + 3,
          );
        });
        expect(text.includes("Doğru yanıt:")).toBe(level === 6);
        expect(html.includes('aria-label="Tam çözüm"')).toBe(level === 6);
        if (level === 6) {
          expect(text).toContain(
            "Doğru yanıt: " + String.fromCharCode(65 + question.answer),
          );
          expect(text).toContain(question.explanation);
          for (const reason of row.guidance.optionReasons)
            expect(text).toContain(reason);
          expect(text).toContain(row.guidance.commonError);
          expect(text).toContain(row.guidance.check);
          expect(findButton(tree)).toBeUndefined();
        } else {
          let next = -1;
          const button = findButton(
            QuestionHelp({
              question,
              level,
              onLevel: (v) => {
                next = v;
              },
            }),
          )!;
          expect(button.disabled).toBe(false);
          (button.onClick as () => void)();
          expect(next).toBe(level + 1);
        }
      }
    }
  });

  it("şık sayısı yanlış yardımı reddeder ve inceleme kipinde bağımsız çözüm uyarısını doğru ayırır", () => {
    for (const [i, row] of rows.entries()) {
      const question = { ...flat[i], guidance: row.guidance };
      expect(resolvedGuidance(question)).toEqual(row.guidance);
      const broken = {
        ...question,
        guidance: {
          ...row.guidance,
          optionReasons: row.guidance.optionReasons.slice(1),
        },
      };
      expect(resolvedGuidance(broken)).toBeUndefined();
      expect(helpPanels(broken)).toEqual([
        { title: "İlk ipucu", paragraphs: [question.hint] },
      ]);
      const fresh = plain(
        renderToStaticMarkup(
          QuestionHelp({ question, level: 1, onLevel: () => {} }),
        ),
      );
      const reviewed = plain(
        renderToStaticMarkup(
          QuestionHelp({
            question,
            level: 1,
            reviewed: true,
            onLevel: () => {},
          }),
        ),
      );
      expect(fresh).toContain("bu soru bağımsız doğru olarak sayılmaz");
      expect(reviewed).not.toContain("bu soru bağımsız doğru olarak sayılmaz");
    }
  });

  it("açık zincir, hidroliz, pH ve eşit enerji yanıtlarını bağımsız sonlu hesaplarla doğrular", () => {
    for (let a = 1; a <= 11; a++) {
      expect(a - 1 + (12 - a - 1)).toBe(10);
    }
    expect(correct("ns-protein-1")).toBe(String(12 - 2));
    for (let a = 1; a <= 10; a++)
      for (let b = 1; b < 12 - a; b++) {
        const c = 12 - a - b;
        expect(a - 1 + (b - 1) + (c - 1)).toBe(9);
      }
    expect(correct("f012-foundation-karbohidratlar-2")).toBe("9 bağ ve 9 su");
    const products = { glucose: 2 * 2 + 1, galactose: 1 };
    expect(correct("f012-foundation-karbohidratlar-1")).toBe(
      `${products.glucose} glikoz ve ${products.galactose} galaktoz`,
    );
    expect(correct("f012-foundation-karbohidratlar-10")).toBe(
      `${3 * 2} monosakkarit ve ${3} su`,
    );
    expect(correct("f012-foundation-lipitler-1")).toBe(
      `${4} gliserol, ${4 * 3} yağ asidi ve ${4 * 3} su`,
    );
    const energy = 2 * 9;
    const carbohydrateMass = energy / 4;
    expect(carbohydrateMass * 4).toBe(energy);
    expect(correct("f012-foundation-lipitler-8")).toBe(
      carbohydrateMass.toLocaleString("tr-TR") + " g",
    );
    const protonRatio = 10 ** -4 / 10 ** -6;
    expect(protonRatio).toBeCloseTo(100);
    expect(correct("ns-water-2")).toBe(String(Math.round(protonRatio)));
  });

  it("yedi ester kesiminde gliserol belirsizliğini bütün olası dağılımlarla sınar", () => {
    const freeGlycerol = new Set<number>();
    let distributions = 0;
    for (let a = 0; a <= 3; a++)
      for (let b = 0; b <= 3; b++)
        for (let c = 0; c <= 3; c++) {
          if (a + b + c !== 7) continue;
          distributions++;
          expect(9 - a - b - c).toBe(2);
          freeGlycerol.add([a, b, c].filter((cuts) => cuts === 3).length);
        }
    expect(distributions).toBeGreaterThan(1);
    expect([...freeGlycerol].sort()).toEqual([1, 2]);
    expect(correct("f012-foundation-lipitler-2")).toBe(
      "7 yağ asidi serbestleşir; serbest gliserol sayısı bağların moleküllere dağılımına bağlıdır.",
    );
    const guidance = rows.find(
      (row) => row.id === "f012-foundation-lipitler-2",
    )!.guidance;
    expect(guidance.steps.join(" ")).toContain("3,3,1");
    expect(guidance.steps.join(" ")).toContain("3,2,2");
  });
});
