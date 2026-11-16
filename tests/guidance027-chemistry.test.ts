import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import rows from "../src/learning/guidance027Chemistry.json";
import { narrativeScienceQuestions } from "../src/learning/narrativeScienceQuestions";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";

const ids = [
  "ns-atom-1",
  "ns-atom-2",
  "ns-atom-3",
  "ns-atom-4",
  "ns-atom-5",
  "ns-isotope-1",
  "ns-isotope-2",
  "ns-isotope-3",
  "ns-isotope-4",
  "ns-isotope-5",
];
const originalQuestions = [
  ...narrativeScienceQuestions["atomun-temel-tanecikleri"],
  ...narrativeScienceQuestions["izotop-izoton-izobar"],
];
const flatten = (q: (typeof originalQuestions)[number]): HelpQuestion => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((option) => option.tr),
  answer: q.answer,
  explanation: q.explanation.tr,
  hint: q.hint.tr,
});
const byId = new Map(originalQuestions.map((q) => [q.id, flatten(q)]));
const normalize = (text: string) =>
  text
    .normalize("NFKC")
    .toLocaleLowerCase("tr-TR")
    .replace(/[\p{P}\p{S}\s]+/gu, "");
const escaped = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");

describe("027 original chemistry question identities", () => {
  it("preserves both old source files and every field of all ten actual questions", () => {
    expect(originalQuestions.map((q) => q.id)).toEqual(ids);
    expect(rows.map((row) => row.id)).toEqual(ids);
    expect(new Set(rows.map((row) => row.id)).size).toBe(10);
    expect(
      createHash("sha256")
        .update(JSON.stringify(originalQuestions))
        .digest("hex"),
    ).toBe("bc9f8794d6e06564fa3aeb838cd8fe76eaba4d091c9b28b8c8c9004905809535");
    for (const [path, hash] of [
      [
        "../src/learning/narrativeScienceQuestions.ts",
        "f5fd484dc7a0b6d02df0ab7e04ef23c8b17e09535ede334fc275e31af6a449f8",
      ],
      [
        "../src/learning/narratives/chemistry.ts",
        "668596ecc333b3fe40de8523b30d741e3c89962cb41668fbab8e79a5d366c019",
      ],
    ])
      expect(
        createHash("sha256")
          .update(readFileSync(new URL(path, import.meta.url)))
          .digest("hex"),
      ).toBe(hash);
    for (const row of rows) {
      expect(Object.keys(row)).toEqual(["id", "identity", "guidance"]);
      expect(row.identity).toBe(questionIdentity(byId.get(row.id)!));
      expect(byId.get(row.id)!.options).toHaveLength(5);
    }
  });

  it("requires a new identity for a changed stem, option, key or explanation", () => {
    for (const row of rows) {
      const q = byId.get(row.id)!;
      for (const changed of [
        { ...q, prompt: q.prompt + " Ek koşul." },
        { ...q, options: [q.options[0] + " değişti", ...q.options.slice(1)] },
        { ...q, answer: (q.answer + 1) % q.options.length },
        { ...q, explanation: q.explanation + " Ek açıklama." },
      ])
        expect(questionIdentity(changed)).not.toBe(row.identity);
    }
  });
});

describe("027 individually authored chemistry help", () => {
  it("has ten distinct methods, thirty progressing steps and fifty bound reasons", () => {
    expect(rows.reduce((n, row) => n + row.guidance.steps.length, 0)).toBe(30);
    expect(
      rows.reduce((n, row) => n + row.guidance.optionReasons.length, 0),
    ).toBe(50);
    expect(
      new Set(rows.map((row) => normalize(row.guidance.strategy))).size,
    ).toBe(10);
    for (const row of rows) {
      const q = byId.get(row.id)!;
      const g = questionGuidanceSchema.parse(row.guidance);
      expect(g).toEqual(row.guidance);
      expect(g.knowledge.length).toBeGreaterThanOrEqual(1);
      expect(g.knowledge.length).toBeLessThanOrEqual(3);
      expect(g.steps).toHaveLength(3);
      expect(new Set(g.steps.map(normalize)).size).toBe(3);
      expect(g.optionReasons).toHaveLength(q.options.length);
      expect(new Set(g.optionReasons.map(normalize)).size).toBe(5);
      const method = normalize(g.strategy);
      for (const earlier of [...g.knowledge, q.hint!, q.explanation])
        expect(method).not.toBe(normalize(earlier));
      for (const step of g.steps) {
        expect(normalize(step)).not.toBe(method);
        expect(g.knowledge.map(normalize)).not.toContain(normalize(step));
        expect(normalize(step)).not.toBe(normalize(q.hint!));
        expect(normalize(step)).not.toBe(normalize(q.explanation));
      }
      expect(g.strategy).not.toContain(q.options[q.answer]);
      expect(
        g.optionReasons.flatMap((reason, i) =>
          reason.startsWith("Doğru.") ? [i] : [],
        ),
      ).toEqual([q.answer]);
      expect(g.commonError).not.toBe(g.check);
      expect(g.commonError).not.toBe(q.explanation);
    }
  });

  it("keeps each reason attached to its actual numerical or conceptual option", () => {
    // Short diagnostic anchors audit all fifty semantic bindings, not a shared
    // generic reason or a copy of the complete authored paragraphs.
    const anchors: Record<string, string[]> = {
      "ns-atom-1": [
        "18+20=38",
        "20+18=38",
        "20−22=−2",
        "20−18=+2",
        "22 proton",
      ],
      "ns-atom-2": ["10 elektron", "27+10=37", "27+13", "27+3", "27 çekirdek"],
      "ns-atom-3": [
        "iki tanecik elektrondur",
        "nötron ayrıldığı",
        "Z=p",
        "A=p+n",
        "0’dan +2’ye",
      ],
      "ns-atom-4": [
        "+17−18=−1",
        "e−p=18−17",
        "18−17=1",
        "katkısı +17",
        "−18 katkı",
      ],
      "ns-atom-5": [
        "yarım proton",
        "kesirli nükleon",
        "kütle ve bolluk",
        "Z=35,5",
        "yaklaşık ihmal",
      ],
      "ns-isotope-1": [
        "n=6 ve n=7",
        "Z=6",
        "13−6=7",
        "kütle numaraları",
        "7 nötronlu",
      ],
      "ns-isotope-2": [
        "A değerleri 13 ve 14",
        "kütle numaralarıdır",
        "karbon ile azot",
        "eşit nötron ve farklı Z",
        "elektronlar 6 ve 7",
      ],
      "ns-isotope-3": ["Z’si 6", "A=14", "14−6=8", "İkisi nötr olsa", "6p+8n"],
      "ns-isotope-4": [
        "10 ve 11 proton",
        "bir elektronun verilmesi",
        "11p/10e",
        "A gerekir",
        "1s² 2s² 2p⁶",
      ],
      "ns-isotope-5": [
        "%50–%50",
        "42,0=20+22",
        "12+8,8=20,8",
        "22−20=2",
        "20–22 aralığını",
      ],
    };
    for (const row of rows)
      row.guidance.optionReasons.forEach((reason, i) =>
        expect(reason).toContain(anchors[row.id][i]),
      );
  });

  it("checks ion options against all given conservation equations", () => {
    const q = byId.get("ns-atom-1")!;
    const valid = q.options.flatMap((option, i) => {
      const [p, n, e] = option.split(", ").map(Number);
      return p === 20 && p + n === 40 && p - e === 2 ? [i] : [];
    });
    expect(valid).toEqual([q.answer]);
    // The final distractor satisfies both totals but changes the element.
    expect(22 + 18).toBe(40);
    expect(22 - 20).toBe(2);
    expect(22).not.toBe(20);
    const q2 = byId.get("ns-atom-2")!;
    const e = 13 - 3;
    expect(e).toBe(10);
    expect(q2.options[q2.answer]).toBe(String(27 + e));
    expect(13 + (27 - 13) + e).toBe(37);
  });

  it("separates isotope relations and validates the exact weighted mean", () => {
    const carbon = { z: 6, a: 13, e: 6 };
    const nitrogen = { z: 7, a: 14, e: 7 };
    expect(carbon.a - carbon.z).toBe(nitrogen.a - nitrogen.z);
    expect(carbon.z).not.toBe(nitrogen.z);
    expect(carbon.e).not.toBe(nitrogen.e);
    const isotone = byId.get("ns-isotope-2")!;
    expect(isotone.options[isotone.answer]).toBe("7 ve 7; izoton");
    const percentages = [60, 40];
    const numerator = 20 * percentages[0] + 22 * percentages[1];
    expect(percentages[0] + percentages[1]).toBe(100);
    expect(numerator).toBe(2080);
    const mean = numerator / 100;
    const q = byId.get("ns-isotope-5")!;
    expect(q.options[q.answer]).toBe(String(mean).replace(".", ","));
    expect(mean).toBeGreaterThan(20);
    expect(mean).toBeLessThan(21);
    expect(mean - 20).toBeCloseTo((22 - 20) * 0.4, 12);
    expect(mean).not.toBe((20 + 22) / 2);
  });

  it("reveals knowledge, method and each step in order before the full old solution", () => {
    const warnings: string[] = [];
    const originalError = console.error;
    let rendered = 0;
    console.error = (...args) => warnings.push(args.map(String).join(" "));
    try {
      for (const row of rows) {
        const q = { ...byId.get(row.id)!, guidance: row.guidance };
        expect(resolvedGuidance(q)).toEqual(row.guidance);
        expect(helpPanels(q)).toHaveLength(5);
        for (let level = 0; level <= 6; level++) {
          const html = renderToStaticMarkup(
            createElement(QuestionHelp, {
              question: q,
              level,
              onLevel: () => {
                throw Error("Read-only render must not dispatch");
              },
            }),
          );
          rendered++;
          if (level === 0) {
            expect(html).not.toContain("help-content");
            continue;
          }
          for (const paragraph of row.guidance.knowledge)
            expect(html).toContain(escaped(paragraph));
          if (level >= 2)
            expect(html).toContain(escaped(row.guidance.strategy));
          else expect(html).not.toContain(escaped(row.guidance.strategy));
          row.guidance.steps.forEach((step, i) => {
            if (level >= i + 3) expect(html).toContain(escaped(step));
            else expect(html).not.toContain(escaped(step));
          });
          if (level <= 5) {
            expect(html).not.toContain("help-full-solution");
            expect(html).not.toContain(escaped(q.explanation));
            expect(html).not.toContain("Doğru yanıt:");
          } else {
            expect(html).toContain(escaped(q.explanation));
            expect(html).toContain(
              "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
            );
            for (const reason of row.guidance.optionReasons)
              expect(html).toContain(escaped(reason));
            expect(html).toContain(escaped(row.guidance.commonError));
            expect(html).toContain(escaped(row.guidance.check));
            expect(html).not.toContain("help-next");
          }
        }
      }
    } finally {
      console.error = originalError;
    }
    expect(rendered).toBe(70);
    expect(warnings).toEqual([]);
  });
});
