import { createHash } from "node:crypto";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance027HistoryA.json";
import { lessons } from "../src/domain/content";
import { QuestionHelp } from "../src/components/QuestionHelp";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";

// Exercise the real catalogue resolver with only this authored cohort. Root owns
// the production catalogue merge; this test does not edit that shared catalogue.
vi.mock("../src/learning/questionHelpCatalogue.json", async () => ({
  default: (await import("../src/learning/guidance027HistoryA.json")).default,
}));
const lessonIds = [
  "osmanli-kurulus-siyaseti",
  "osmanli-askeri-teskilat",
  "osmanli-medeniyeti",
  "tarih-zaman",
  "insanligin-ilk-donemleri",
];
const oldLessons = lessonIds.map((id) => lessons.find((l) => l.id === id)!);
const raw = oldLessons.flatMap((l) => l.questions);
const hash = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
const frozenPerQuestion = [
  ["otp-1", "87809ae83243f4a0ccdad50553bfad0a9556a0182fbc95eb3863396bcda99960"],
  ["otp-2", "35632f21fdc493acd34e311d3fb0aa4190e8ceada69bc867a8e8c73c4ad396bc"],
  ["otp-3", "b1be7c758bd47964b40cf7c92ae479849e8c16e3aae2fb26373c3128201b5f8c"],
  ["otp-4", "08d4053e8ba3f27865aa1dd340915e0a28a4f96dee7eb35a1b3ff8ed83a41b87"],
  ["otp-5", "7b127a5d1798a2f5eca6c1b39db3d098a9c4eff4fdfbbcf712579638aaac9e21"],
  ["otm-1", "c2528aba731f37c0291ee283d2eafa655c8b6a53d0aebc435ca09bbbcb0ccee3"],
  ["otm-2", "0c9947380ccc8895c57bbcc1c1bdcc159e084d2f93555672a325dfbd68fa6302"],
  ["otm-3", "c551c9742c64437a77fb79d5c8754fd841d2af619c2988b590124f58a4120cb6"],
  ["otm-4", "b69fdba0039cc44460c1400168c1628c21a59cf69c8377cb387c1ad938d4a2c3"],
  ["otm-5", "efb73a00a29ba9128991617e2d14864a985953506eb753c31cfb7914cb96a4cf"],
  ["otc-1", "13cf88d5a63381657fa2b4e7325fb04cf3216efb27ae4cf6d44bf3d5c0372418"],
  ["otc-2", "91afcff6e61ac39b4c7177b21c5a30e22ff205f8124901d922b667fa0e4c9e23"],
  ["otc-3", "8d8431fe655ea1fdfa98867204546016b00e658aad5ba2b6ce96abb487b7daa5"],
  ["otc-4", "13612543f41167426f3b651ee10e1cfd67104f99794fe35213291c2a09d4d09e"],
  ["otc-5", "9e697b663b8be7ad9e932ec08c7d056c48b9b58b4c4db6fafdadc6ae2833ff04"],
  [
    "f013-foundation-tarih-zaman-1",
    "603b0716a2027926ab1b8b512d9119782e4b7dc277a72c80de848dd4a30ef02e",
  ],
  [
    "f013-foundation-tarih-zaman-2",
    "32dc7c9581f572b8dd04d1d280ef0a085fc82e30338ada5aa32363609010819c",
  ],
  [
    "f013-foundation-tarih-zaman-3",
    "c605acd825e754bfbcb8b11f48254d4958089696ac9ce89f558d19a2754ba0c2",
  ],
  [
    "f013-foundation-tarih-zaman-4",
    "38680d4dae975dad8de64d2cf1c58ca3fca72759bbc6f186ad5faba8c9bb2b8f",
  ],
  [
    "f013-foundation-tarih-zaman-5",
    "dc7084113717c83272aac0d7569205e14efc84a061e8dc6c1c325cc4e3a68542",
  ],
  [
    "f013-foundation-tarih-zaman-6",
    "9c5ab195896ab7e007c3d68715dea3f9e391f0d718fc6beca60cd27d868a6113",
  ],
  [
    "f013-foundation-tarih-zaman-7",
    "4a26d510eb2b5f941a0b8e43137d689ceb202446e75af89cf1d9f880fdf37eec",
  ],
  [
    "f013-foundation-tarih-zaman-8",
    "04b73691087416d019c3e73d0b1debc7bb4394cdbfdc70eaf26503cbcfaf24c6",
  ],
  [
    "f013-foundation-tarih-zaman-9",
    "6bcc27e776616769c56992df3a036bd1940eab8067763e333d26fe9bebc5c411",
  ],
  [
    "f013-foundation-tarih-zaman-10",
    "da5b7304198d930afd72ec58758e5d357a9afa72f0d4dfdca1eeed5ce39f6d2f",
  ],
  [
    "f013-foundation-insanligin-ilk-donemleri-1",
    "073bb4f683c3f6ac420fd12ce1e69bd9bfebb829ac7909b990261ab9458cf8a0",
  ],
  [
    "f013-foundation-insanligin-ilk-donemleri-2",
    "9c08be23f147d25ca0a64e065d6dbd3c9e0cc5eb839c046b145ecc858b86372a",
  ],
  [
    "f013-foundation-insanligin-ilk-donemleri-3",
    "2dd3d08c59b61c353c2bedbd6be2349a104931708d295a3524737bb1dab4f002",
  ],
  [
    "f013-foundation-insanligin-ilk-donemleri-4",
    "539e51f723c7ff9b3d9772784a645ece6eef1c7da10f296f086ccebfb82e0cf1",
  ],
  [
    "f013-foundation-insanligin-ilk-donemleri-5",
    "a31191605b2f8f64654e65a23299445dfe3dcb11a0ed4d04af2858bf10983241",
  ],
  [
    "f013-foundation-insanligin-ilk-donemleri-6",
    "0bdfbc9d9bab26fdcbd69a2fa0e7f63daf23ebd2a623fd0a561dd77df82378ca",
  ],
  [
    "f013-foundation-insanligin-ilk-donemleri-7",
    "60db2f4e85a94c2feda1890578bbb32a8152164c0eb8ce4ca7908134696e2200",
  ],
  [
    "f013-foundation-insanligin-ilk-donemleri-8",
    "eaf6f99a4bb3f652ea42bdc2b3a26356c698fd06ffef65f5afbb37b1342addbc",
  ],
  [
    "f013-foundation-insanligin-ilk-donemleri-9",
    "7bf7f0b2ecdd424433e83cfd8e849c98f2a3d2049548090632ecd70134b51f94",
  ],
  [
    "f013-foundation-insanligin-ilk-donemleri-10",
    "fc8acb13a3dbdded3fc2b59ab6e70b99719306dcd2d61af0f91b00ad8d86ae5e",
  ],
];
const flat: HelpQuestion[] = raw.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  ...(q.passage ? { passage: q.passage.tr } : {}),
  options: q.options.map((option) => option.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
}));
const bank = new Map(flat.map((q) => [q.id, q]));
const escape = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");

describe("027 historical old35 question guidance", () => {
  it("preserves all35 complete raw questions, including original hint and explanation", () => {
    expect(oldLessons.map((l) => l.questions.length)).toEqual([
      5, 5, 5, 10, 10,
    ]);
    expect(hash(raw)).toBe(
      "5512f9c07c550a4eef13a3dc0375b008a976e95a6018220edcfd01c135db6888",
    );
    expect(raw.map((q) => [q.id, hash(q)])).toEqual(frozenPerQuestion);
    expect(raw.every((q) => q.guidance === undefined)).toBe(true);
  });
  it("binds35 distinct guides to exact old identities and actual option order", () => {
    expect(rows.map((r) => r.id)).toEqual(flat.map((q) => q.id));
    expect(new Set(rows.map((r) => r.id)).size).toBe(35);
    expect(rows.reduce((n, r) => n + r.guidance.knowledge.length, 0)).toBe(70);
    expect(rows.reduce((n, r) => n + r.guidance.steps.length, 0)).toBe(105);
    expect(rows.reduce((n, r) => n + r.guidance.optionReasons.length, 0)).toBe(
      175,
    );
    for (const row of rows) {
      const q = bank.get(row.id)!;
      expect(row.identity, row.id).toBe(questionIdentity(q));
      expect(questionGuidanceSchema.parse(row.guidance)).toEqual(row.guidance);
      expect(row.guidance.optionReasons, row.id).toHaveLength(q.options.length);
      expect(resolvedGuidance(q), row.id).toEqual(row.guidance);
      expect(row.guidance.steps.length).toBeGreaterThanOrEqual(3);
      expect(new Set(row.guidance.steps).size).toBe(row.guidance.steps.length);
      expect(new Set(row.guidance.optionReasons).size).toBe(q.options.length);
      expect(row.guidance.steps).not.toContain(row.guidance.strategy);
      expect(row.guidance.strategy).not.toMatch(
        /(?:doğru (?:yanıt|cevap)|[A-E] (?:şıkkı|seçeneği))/i,
      );
    }
  });
  it("refuses catalogue guidance for changed saved stems, passages, keys, options or explanations", () => {
    for (const q of flat) {
      for (const changed of [
        { ...q, id: q.id + "-changed" },
        { ...q, prompt: q.prompt + " Değişmiş kök." },
        { ...q, passage: (q.passage ?? "") + " Değişmiş veri." },
        { ...q, answer: (q.answer + 1) % q.options.length },
        { ...q, options: [...q.options].reverse() },
        { ...q, explanation: q.explanation + " Başka açıklama." },
      ]) {
        expect(questionIdentity(changed), q.id).not.toBe(questionIdentity(q));
        expect(resolvedGuidance(changed), q.id).toBeUndefined();
      }
    }
  });
  it("stages knowledge, strategy and all three steps before explicit full solution for every old question", () => {
    for (const q of flat) {
      const guidance = rows.find((r) => r.id === q.id)!.guidance;
      const panels = helpPanels(q);
      expect(panels).toHaveLength(5);
      expect(panels[0].paragraphs).toContain(q.hint);
      for (let level = 0; level <= panels.length + 1; level++) {
        const html = renderToStaticMarkup(
          createElement(QuestionHelp, {
            question: q,
            level,
            onLevel: () => {},
          }),
        );
        for (let step = 0; step < 3; step++)
          expect(
            html.includes(escape(guidance.steps[step])),
            q.id + ":" + level + ":" + step,
          ).toBe(level >= step + 3);
        if (level <= panels.length) {
          expect(html).not.toContain("Doğru yanıt:");
          expect(html).not.toContain("Şıkların mantığı");
          expect(html).not.toContain("help-full-solution");
        } else {
          expect(html).toContain(
            "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
          );
          expect(html).toContain(escape(q.explanation));
          for (const reason of guidance.optionReasons)
            expect(html).toContain(escape(reason));
          expect(html).toContain(escape(guidance.commonError));
          expect(html).toContain(escape(guidance.check));
          expect(html).not.toContain("help-next");
        }
      }
    }
  });
  it("does not show a solution at level0 or award an independent-correct claim when help is open", () => {
    const q = bank.get("f013-foundation-tarih-zaman-9")!;
    const closed = renderToStaticMarkup(
      createElement(QuestionHelp, {
        question: q,
        level: 0,
        onLevel: () => {},
        disabled: true,
      }),
    );
    expect(closed).toContain('disabled=""');
    expect(closed).not.toContain("Çözüm rehberi");
    const opened = renderToStaticMarkup(
      createElement(QuestionHelp, { question: q, level: 1, onLevel: () => {} }),
    );
    expect(opened).toContain("bu soru bağımsız doğru olarak sayılmaz");
    const review = renderToStaticMarkup(
      createElement(QuestionHelp, {
        question: q,
        level: 6,
        onLevel: () => {},
        reviewed: true,
      }),
    );
    expect(review).not.toContain("bu soru bağımsız doğru olarak sayılmaz");
  });
});
