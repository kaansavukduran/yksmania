import { createHash } from "node:crypto";
import { Children, createElement, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance028Physics.json";
import { lessonById } from "../src/domain/content";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";

// Stage only these new rows in this test module. Runtime registration belongs
// to Root; the real resolver and renderer below use their actual implementations.
vi.mock("../src/learning/questionHelpCatalogue.json", async (original) => {
  const actual = await original<{ default: unknown[] }>();
  const authored = await import("../src/learning/guidance028Physics.json");
  return {
    default: [
      ...actual.default,
      ...authored.default.map((row) => ({ ...row, legacyPanelCount: 1 })),
    ],
  };
});

const originals = ["elektrik-alan", "isi-ve-sicaklik"].flatMap(
  (id) => lessonById(id)!.questions,
);
const flat = originals.map((question) => ({
  id: question.id,
  prompt: question.prompt.tr,
  passage: question.passage?.tr,
  options: question.options.map((option) => option.tr),
  answer: question.answer,
  hint: question.hint.tr,
  explanation: question.explanation.tr,
}));
const byId = (id: string) => flat.find((question) => question.id === id)!;
const chosen = (id: string) => {
  const question = byId(id);
  return question.options[question.answer];
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
const fold = (value: string) => value.replace(/\s+/g, " ").trim();
const text = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replaceAll("&amp;", "&")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
const button = (
  tree: ReactNode,
): { onClick: () => void; disabled?: boolean } | undefined => {
  let result: { onClick: () => void; disabled?: boolean } | undefined;
  Children.forEach(tree, (child) => {
    if (
      !isValidElement<{
        children?: ReactNode;
        onClick?: () => void;
        disabled?: boolean;
      }>(child)
    )
      return;
    if (child.type === "button" && child.props.onClick)
      result = { onClick: child.props.onClick, disabled: child.props.disabled };
    else result ??= button(child.props.children);
  });
  return result;
};

describe("028 eski 15 fizik kartına özgü kademeli yardım", () => {
  it("15 tam ham kartı ve gerçek üç/beş seçeneklerini dondurulmuş kimlikleriyle korur", () => {
    expect(originals).toHaveLength(15);
    expect(
      createHash("sha256")
        .update(JSON.stringify(stable(originals)))
        .digest("hex"),
    ).toBe("5357fb8f40a0320290bc49c6cc13d6db26360eb9f7102724fa60f42d41798be5");
    expect(rows.map((row) => row.id)).toEqual(
      flat.map((question) => question.id),
    );
    expect(new Set(rows.map((row) => row.id)).size).toBe(15);
    expect(flat.map((question) => question.options.length)).toEqual([
      3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    ]);
    for (const [index, row] of rows.entries()) {
      expect(Object.keys(row).sort()).toEqual(["guidance", "id", "identity"]);
      expect(row.identity).toBe(questionIdentity(flat[index]));
      expect(originals[index].guidance).toBeUndefined();
    }
  });

  it("15 bilgi ve yöntemi, 45 ilerleyen adımı ve şıklara bağlı 65 nedeni birbirinden ayırır", () => {
    expect(rows.reduce((sum, row) => sum + row.guidance.steps.length, 0)).toBe(
      45,
    );
    expect(
      rows.reduce((sum, row) => sum + row.guidance.optionReasons.length, 0),
    ).toBe(65);
    expect(
      new Set(rows.map((row) => fold(row.guidance.knowledge.join(" ")))).size,
    ).toBe(15);
    expect(new Set(rows.map((row) => fold(row.guidance.strategy))).size).toBe(
      15,
    );
    expect(
      new Set(rows.flatMap((row) => row.guidance.steps.map(fold))).size,
    ).toBe(45);
    for (const [index, row] of rows.entries()) {
      const guidance = questionGuidanceSchema.parse(row.guidance);
      const question = flat[index];
      expect(guidance.knowledge).toHaveLength(1);
      expect(guidance.steps).toHaveLength(3);
      const teaching = [
        ...guidance.knowledge,
        guidance.strategy,
        ...guidance.steps,
      ].map(fold);
      expect(new Set(teaching).size).toBe(teaching.length);
      expect(teaching).not.toContain(fold(question.hint));
      expect(guidance.steps).not.toContain(question.explanation);
      expect(guidance.strategy).not.toMatch(
        /Doğru\.|[ABCDE] (?:şıkkı|seçeneği)/,
      );
      expect(guidance.optionReasons).toHaveLength(question.options.length);
      expect(new Set(guidance.optionReasons.map(fold)).size).toBe(
        question.options.length,
      );
      for (const [option, reason] of guidance.optionReasons.entries()) {
        expect(reason.length).toBeGreaterThan(55);
        expect(reason.startsWith("Doğru."), `${row.id}/${option}`).toBe(
          option === question.answer,
        );
      }
      expect(guidance.commonError.length).toBeGreaterThan(70);
      expect(guidance.check.length).toBeGreaterThan(70);
    }
  });

  it("alan ve kuvvetin yönlerini iki yükün rolünden, sayısal alanları bağımsız fizikten doğrular", () => {
    // Right is positive: source sign sets E; the separate test sign sets F.
    const directions = (source: number, test: number) => ({
      field: Math.sign(source),
      force: Math.sign(source * test),
    });
    expect(directions(1, -1)).toEqual({ field: 1, force: -1 });
    expect(chosen("ef-1")).toBe("Alan sağa, kuvvet sola.");
    expect(directions(-1, 1)).toEqual({ field: -1, force: -1 });
    expect(chosen("ef-3")).toBe("Alan sola, kuvvet sola.");
    const farther = 9000 * (1 / 2) ** 2;
    expect(farther).toBe(2250);
    expect(chosen("ef-2")).toBe(farther.toLocaleString("tr-TR"));
    const field = 0.009 / 1e-6;
    expect(field).toBeCloseTo(9000);
    expect(0 * field).toBe(0);
    expect(chosen("ef-4")).toBe(
      "Kaynağın alanı aynı kalır; bu taneciğe elektriksel kuvvet sıfır olur.",
    );
    const newForce = 2e-6 * field;
    expect(newForce).toBeCloseTo(0.018);
    expect(newForce / 2e-6).toBeCloseTo(field);
    expect(chosen("ef-5")).toBe("Alan aynı kalır; kuvvet 0,018 N olur.");
  });

  it("sıcaklık farkını, birimleri, işareti ve c/C ayrımını eski anahtardan bağımsız hesaplar", () => {
    const initialKelvin = 10 + 273.15;
    const finalKelvin = 35 + 273.15;
    expect(finalKelvin - initialKelvin).toBe(25);
    expect(chosen("isi-ve-sicaklik-q3")).toBe(
      `${finalKelvin - initialKelvin} K`,
    );
    const heat = (200 / 1000) * 600 * (45 - 15);
    expect(heat).toBe(3600);
    expect(chosen("isi-ve-sicaklik-q4")).toBe(`${heat} J`);
    const cooling = 0.4 * 500 * (20 - 60);
    expect(cooling).toBe(-8000);
    expect(chosen("isi-ve-sicaklik-q5")).toBe(
      `${cooling}`.replace("-", "−") + " J",
    );
    for (const mass of [0.1, 0.25, 2]) {
      for (const c of [100, 500, 4200]) {
        expect((3 * mass * c) / (mass * c)).toBeCloseTo(3);
        expect((3 * mass * c) / (3 * mass)).toBeCloseTo(c);
      }
    }
    expect(chosen("isi-ve-sicaklik-q6")).toBe("cY=cX; CY=3CX");
  });

  it("denge şıklarını enerji bakiyesiyle tek tek sınar ve grafikte kapasitenin ters eğim olduğunu denetler", () => {
    const water = byId("isi-ve-sicaklik-q7");
    const validWater = water.options.flatMap((option, index) =>
      Math.abs(0.1 * (80 - Number(option)) - 0.3 * (Number(option) - 20)) <
      1e-10
        ? [index]
        : [],
    );
    expect(validWater).toEqual([water.answer]);
    expect(water.options[validWater[0]]).toBe("35");
    const capacities = byId("isi-ve-sicaklik-q8");
    const validCapacity = capacities.options.flatMap((option, index) =>
      200 * (80 - Number(option)) === 600 * (Number(option) - 20)
        ? [index]
        : [],
    );
    expect(validCapacity).toEqual([capacities.answer]);
    expect(200 * (80 - 35)).toBe(9000);
    expect(600 * (35 - 20)).toBe(9000);
    const cx = 1 / 0.02;
    const cy = 1 / 0.01;
    expect([cx, cy, cx / cy]).toEqual([50, 100, 0.5]);
    expect(chosen("isi-ve-sicaklik-q9")).toBe("1/2");
    expect(10 / cx).toBe(2 * (10 / cy));
  });

  it("kavramsal seçimleri aktarım/durum, ölçüm/his ve erime/sıcaklık ayrımlarında tutar", () => {
    expect(chosen("isi-ve-sicaklik-q1")).toBe("Isı — iç enerji");
    expect(chosen("isi-ve-sicaklik-q2")).toBe(
      "Metal elden enerjiyi daha hızlı çekebilir; his, sıcaklığın doğrudan ölçümü değildir.",
    );
    expect(chosen("isi-ve-sicaklik-q10")).toBe(
      "Sıcaklık artmadan buzun bir kısmı eriyebilir; iç enerji artar.",
    );
    // A counterexample to ΔT=0 => Q=0: one positive melted portion at the
    // transition temperature consumes latent energy, without warming the mix.
    const meltedKilograms = 0.001;
    const latentJoulesPerKilogram = 334000;
    expect(meltedKilograms * latentJoulesPerKilogram).toBe(334);
    expect(meltedKilograms * latentJoulesPerKilogram).toBeGreaterThan(0);
    const explanation = rows.find(
      (row) => row.id === "isi-ve-sicaklik-q2",
    )!.guidance;
    expect(explanation.steps[1]).toContain("El yüzeylerden daha sıcaksa");
    expect(explanation.steps[1]).toContain("sayısal sıcaklığını vermemiştir");
    expect(
      rows.find((row) => row.id === "isi-ve-sicaklik-q10")!.guidance.check,
    ).toContain("sayısal eriyen kütle uydurmaya gerek yoktur");
  });

  it("gerçek staged resolver farklı kök, pasaj, şık, anahtar veya açıklamaya eski yardımı vermez", () => {
    for (const [index, question] of flat.entries()) {
      expect(resolvedGuidance(question)).toEqual(rows[index].guidance);
      const variants: HelpQuestion[] = [
        { ...question, id: question.id + "-degisen" },
        { ...question, prompt: question.prompt + " Yeni koşul." },
        { ...question, passage: "Bağımsız başka metin." },
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
        { ...question, explanation: question.explanation + " Başka sonuç." },
      ];
      for (const variant of variants) {
        expect(questionIdentity(variant)).not.toBe(rows[index].identity);
        expect(resolvedGuidance(variant)).toBeUndefined();
      }
      // Hint is intentionally outside current identity; raw full-payload SHA protects it.
      expect(questionIdentity({ ...question, hint: "Kişisel ipucu." })).toBe(
        rows[index].identity,
      );
    }
  });

  it("gerçek QuestionHelp tüm bilgi/yöntem/adım kapılarını ve tam çözümde gerçek 3/5 nedenleri gösterir", () => {
    for (const [index, question] of flat.entries()) {
      const guidance = rows[index].guidance;
      const panels = helpPanels(question);
      expect(panels).toHaveLength(5);
      expect(panels[0].paragraphs).toContain(question.hint);
      expect(panels[1].paragraphs).toEqual([guidance.strategy]);
      for (let level = 0; level <= 6; level++) {
        const html = text(
          renderToStaticMarkup(
            createElement(QuestionHelp, { question, level, onLevel: () => {} }),
          ),
        );
        if (level === 0) expect(html).not.toContain("Çözüm rehberi");
        if (level >= 1) expect(html).toContain(guidance.knowledge[0]);
        if (level < 2) expect(html).not.toContain(guidance.strategy);
        else expect(html).toContain(guidance.strategy);
        for (const [step, paragraph] of guidance.steps.entries()) {
          if (level >= step + 3) expect(html).toContain(paragraph);
          else expect(html).not.toContain(paragraph);
        }
        if (level < 6) {
          expect(html).not.toContain("Doğru yanıt:");
          for (const reason of guidance.optionReasons)
            expect(html).not.toContain(reason);
        } else {
          expect(html).toContain(
            "Doğru yanıt: " + String.fromCharCode(65 + question.answer),
          );
          expect(html).toContain(question.explanation);
          for (const reason of guidance.optionReasons)
            expect(html).toContain(reason);
          expect(html).toContain(guidance.commonError);
          expect(html).toContain(guidance.check);
        }
      }
    }
  });

  it("90 gerçek sonraki düğme çağrısı birer adım ister; tam çözüm ve kapalı düğme sınırlarını korur", () => {
    for (const question of flat) {
      for (let level = 0; level < 6; level++) {
        const onLevel = vi.fn();
        const action = button(QuestionHelp({ question, level, onLevel }));
        expect(action).toBeDefined();
        action!.onClick();
        expect(onLevel).toHaveBeenCalledExactlyOnceWith(level + 1);
      }
      expect(
        button(QuestionHelp({ question, level: 6, onLevel: () => {} })),
      ).toBeUndefined();
      const disabled = QuestionHelp({
        question,
        level: 2,
        disabled: true,
        onLevel: () => {},
      });
      expect(button(disabled)?.disabled).toBe(true);
      expect(renderToStaticMarkup(disabled)).toMatch(/<button[^>]*disabled=""/);
    }
  });

  it("eksik şık nedeni bulunan inline rehberi tam yardım diye sunmaz", () => {
    for (const [index, question] of flat.entries()) {
      const changed = {
        ...question,
        guidance: {
          ...rows[index].guidance,
          optionReasons: rows[index].guidance.optionReasons.slice(1),
        },
      };
      expect(resolvedGuidance(changed)).toBeUndefined();
      expect(helpPanels(changed)).toEqual([
        { title: "İlk ipucu", paragraphs: [question.hint] },
      ]);
    }
  });
});
