import { createHash } from "node:crypto";
import {
  createElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance028Humanities.json";
import { lessons } from "../src/domain/content";
import { QuestionHelp } from "../src/components/QuestionHelp";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";

// Only the owned cohort is supplied to the real resolver. Root owns runtime
// registration and the guarded snd-10 presentation correction; raw data stays fixed.
vi.mock("../src/learning/questionHelpCatalogue.json", async () => ({
  default: (await import("../src/learning/guidance028Humanities.json")).default,
}));
const lessonIds = ["dunya-gucu-osmanli", "ses-bilgisi", "sozcukte-yapi"];
const oldLessons = lessonIds.map((id) => lessons.find((l) => l.id === id)!);
const raw = oldLessons.flatMap((l) => l.questions);
const hash = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
const stable = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(stable)
    : value && typeof value === "object"
      ? Object.fromEntries(
          Object.entries(value)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([k, v]) => [k, stable(v)]),
        )
      : value;
const frozenPerQuestion = [
  ["dgo-1", "6b5d52a1830c9173db12684217c3dea5b0392f66ebe936c668a00dc340c78dd5"],
  ["dgo-2", "8849a74ab3e27eb8b73b4bee13721c2ab90cf1568dfba51f8cb2aa0582dd9007"],
  ["dgo-3", "7874faad1d250a321ae8fe34439081725225f46e8b449d6103cf5d04bc6d47b1"],
  ["dgo-4", "a42a7acc8674fd8c727ef039034b7e0fbe9b0171ab5aa8560490f240226173f0"],
  ["dgo-5", "421ec23390821b5052dd47b20750c48dab1dd362efa717911006ba0c67a2f464"],
  ["dgo-6", "7222440f107ae57d89bae741309c107d7c7cdf2249a753a7121a331cd774c028"],
  ["dgo-7", "b95429de9720410458e5027bcd27c451c7acce063c2fb379fe33007cf5264e83"],
  ["dgo-8", "c24cc304419fb149bcdf51cd1d892cf3a63a09ba4fc5052b6c12295ed591ca98"],
  ["dgo-9", "02427306d359805f9208490654d320990e5aa949cb915654b2507a1ef7db5e55"],
  [
    "dgo-10",
    "336adcabb70eb0ebaba0cc2f52377580baaeaf075011e6e711a1b34877c4fd62",
  ],
  ["snd-1", "3638f31ed33363634d67520004f476138595287c425e4648c099c3f9ebc06633"],
  ["snd-2", "3306282e8dcfa3170dab1a7c977195f1a7181dc40821c002b4d3f7b65c4901ea"],
  ["snd-3", "f68515941bee82dbd242cdeb940dad6ae45a9498fbd02b7ddd6b1d448a133220"],
  ["snd-4", "a1fc44d9aba295e0413302bd237cf116e77afb1acae6290ac004216dcff2fc0b"],
  ["snd-5", "2bc91bf4c49454e0508ae565c0af7f8d33d3980adbd5452e8f45969927eb50ee"],
  ["snd-6", "0f33236ec0dd394e8e23cccc8ff541c520df017daeb8101574df337805f2ccd2"],
  ["snd-7", "ae09c61902886e48a886d5129035809afdd16ba1440eabe0b3e32b3d72159a44"],
  ["snd-8", "cca03ec730f2ab3f761fd9c577790999c023e1e763520922f8a66f22a2ddeea1"],
  ["snd-9", "0efad3c426271b830c870bf62b90d09633aee4bfbcbd45c683f0fdb3566b160c"],
  [
    "snd-10",
    "70ee22601b892c524def5e5125ea7b77257e395f7171c16d23356e21cdd9cfa9",
  ],
  ["wrd-1", "48f7113ee73a38fc9354e2a8f2c7fc7f0ecc326569158794265c5fcd0e8ff69b"],
  ["wrd-2", "25c7d62da825f6b79bada55a707b9363e2f07f3a35677732f0a6977ad41850c6"],
  ["wrd-3", "b720a1294b9f5b7dc6d7c43645cfdd8ad9ad7f51c73e2f80f6a3be6d9b47084d"],
  ["wrd-4", "86af6c8527bcbef84bf3fc0d98674778e2e56ea0f56033d660b0b6fd5d29e85b"],
  ["wrd-5", "b33bab9f62ae0f184cf5561331099cec9d7ae5f8817f1433983b9fd2b906495c"],
  ["wrd-6", "c3d8467b13e1fbf6defd28a20d5e092df510a9413424db6fb1b325b4cc3a5290"],
  ["wrd-7", "1010ef803e0105118fdc48d66d57897f1e0590f828990bb2e8a4465af6d5c38a"],
  ["wrd-8", "0d9afd9d3f6bfa54be83e4f0bafadff0b9c82dc15dcca70a00d888b0a1cf9810"],
  ["wrd-9", "45311f48532e2c231d9ea247b134ae8ab4dda9ff01d7803e6f5c3f3e6053da77"],
  [
    "wrd-10",
    "196ed73a8c61dfa7d20913aa3a554d07772b3608f5121db62ed70ecb742ebffd",
  ],
];
const original: HelpQuestion[] = raw.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  ...(q.passage ? { passage: q.passage.tr } : {}),
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
}));
const oldSnd10Identity =
  '["snd-10","‘Yarın başlayacak.’ cümlesindeki başlayacak sözcüğü hakkında hangisi doğrudur?","",["Başla kökündeki a, ı’ya daralmıştır.","Başla kökünün a’sı korunur; -yor önündeki daralma bu gelecek zaman biçimine genellenmez.","Kök başlangıçta başlı olduğu için ses olayı yoktur.","Her y harfi ünsüz türemesi olduğu için iki y yazılmalıdır.","Doğru yazım başlıyacak olmalıdır."],1,"Başla- tabanının a’sı başlayacak biçiminde durur. Yardımcı y ek sınırındadır; başlıyor örneğindeki -yor daralması -(y)acak önüne taşınmaz. Yanlış bir başlangıç kökü veya başlıyacak yazımı kurmak kuralı hatalı genişletir."]';
const correctedSnd10Option =
  "Başla- tabanının a’sı korunur; -yor önündeki daralma bu gelecek zaman biçimine genellenmez.";
const visible = original.map((q) =>
  q.id === "snd-10"
    ? {
        ...q,
        options: q.options.map((o, i) => (i === 1 ? correctedSnd10Option : o)),
      }
    : q,
);
const bank = new Map(visible.map((q) => [q.id, q]));
const escape = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");
type NextProps = {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};
function nextButton(node: ReactNode): ReactElement<NextProps> | undefined {
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = nextButton(child);
      if (found) return found;
    }
  } else if (isValidElement<NextProps>(node)) {
    if (node.type === "button" && node.props.className?.includes("help-next"))
      return node;
    return nextButton(node.props.children);
  }
  return undefined;
}

describe("028 Turkish20 and Ottoman10 old-card guidance", () => {
  it("freezes every complete original card and original lesson payload", () => {
    expect(oldLessons.map((l) => l.questions.length)).toEqual([10, 10, 10]);
    expect(hash(raw)).toBe(
      "2483503b0aa71fe1178b8986f0286b0835a13de100985e526958b388d0c050aa",
    );
    expect(hash(stable(raw))).toBe(
      "46a219a4dcef3628db709bfd41605eeed18e9f21fdbe615057627fd87c60d742",
    );
    expect(hash(oldLessons)).toBe(
      "bb539a304bd15b34340b208ba7a869e1f3b557e5bb5816e078229440cd4409fc",
    );
    expect(raw.map((q) => [q.id, hash(q)])).toEqual(frozenPerQuestion);
    expect(raw.every((q) => q.guidance === undefined)).toBe(true);
    expect(original.map((q) => q.answer)).toEqual([
      2, 1, 3, 4, 0, 2, 3, 1, 4, 0, 1, 3, 0, 4, 2, 3, 0, 2, 4, 1, 2, 0, 3, 4, 1,
      3, 0, 2, 4, 1,
    ]);
    expect(original.map((q) => q.options.length)).toEqual(Array(30).fill(5));
  });
  it("limits the authorized presentation repair to exactly one option while retaining raw snd-10", () => {
    const old = original.find((q) => q.id === "snd-10")!;
    const corrected = bank.get("snd-10")!;
    expect(questionIdentity(old)).toBe(oldSnd10Identity);
    expect(old.options[1]).toBe(
      "Başla kökünün a’sı korunur; -yor önündeki daralma bu gelecek zaman biçimine genellenmez.",
    );
    expect(corrected.options[1]).toBe(correctedSnd10Option);
    expect({ ...corrected, options: old.options }).toEqual(old);
    expect(
      corrected.options.filter((o, i) => o !== old.options[i]),
    ).toHaveLength(1);
    expect(rows.find((r) => r.id === "snd-10")!.identity).toBe(
      questionIdentity(corrected),
    );
    expect(questionIdentity(corrected)).not.toBe(questionIdentity(old));
    for (const q of original.filter((q) => q.id !== "snd-10"))
      expect(rows.find((r) => r.id === q.id)!.identity).toBe(
        questionIdentity(q),
      );
  });
  it("binds all30 complete distinct guidance records to actual option order", () => {
    expect(rows.map((r) => r.id)).toEqual(visible.map((q) => q.id));
    expect(new Set(rows.map((r) => r.id)).size).toBe(30);
    expect(rows.reduce((n, r) => n + r.guidance.knowledge.length, 0)).toBe(60);
    expect(rows.reduce((n, r) => n + r.guidance.steps.length, 0)).toBe(90);
    expect(rows.reduce((n, r) => n + r.guidance.optionReasons.length, 0)).toBe(
      150,
    );
    const leaves: string[] = [];
    for (const row of rows) {
      const q = bank.get(row.id)!;
      const g = row.guidance;
      expect(Object.keys(row).sort()).toEqual(["guidance", "id", "identity"]);
      expect(row.identity, row.id).toBe(questionIdentity(q));
      expect(questionGuidanceSchema.parse(g)).toEqual(g);
      expect(g.optionReasons, row.id).toHaveLength(q.options.length);
      expect(resolvedGuidance(q), row.id).toEqual(g);
      expect(g.steps.length).toBeGreaterThanOrEqual(3);
      const staged = [q.hint!, ...g.knowledge, g.strategy, ...g.steps];
      expect(new Set(staged).size, row.id).toBe(staged.length);
      expect(g.strategy).not.toMatch(
        /(?:doğru (?:yanıt|cevap)|[A-E] (?:şıkkı|seçeneği))/i,
      );
      leaves.push(
        ...g.knowledge,
        g.strategy,
        ...g.steps,
        ...g.optionReasons,
        g.commonError,
        g.check,
      );
    }
    expect(leaves).toHaveLength(390);
    expect(new Set(leaves).size).toBe(390);
  });
  it("rejects all six identity changes for every visible card", () => {
    for (const q of visible) {
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
  it("uses genuine next callbacks and actual SSR for every staged panel and full solution", () => {
    let renders = 0;
    let actions = 0;
    for (const q of visible) {
      const g = rows.find((r) => r.id === q.id)!.guidance;
      const panels = helpPanels(q);
      expect(panels).toHaveLength(5);
      expect(panels[0].paragraphs).toEqual([q.hint, ...g.knowledge]);
      let level = 0;
      const requested: number[] = [];
      const onLevel = (next: number) => {
        requested.push(next);
        level = next;
      };
      for (let expected = 0; expected <= 6; expected++) {
        expect(level).toBe(expected);
        const html = renderToStaticMarkup(
          createElement(QuestionHelp, { question: q, level, onLevel }),
        );
        renders++;
        expect((html.match(/<h3>/g) ?? []).length).toBe(
          Math.min(level, 5) + (level > 5 ? 1 : 0),
        );
        for (const paragraph of g.knowledge)
          expect(html.includes(escape(paragraph)), q.id).toBe(level >= 1);
        expect(html.includes(escape(g.strategy)), q.id).toBe(level >= 2);
        for (let i = 0; i < g.steps.length; i++)
          expect(html.includes(escape(g.steps[i])), q.id + ":" + i).toBe(
            level >= i + 3,
          );
        if (level < 6) {
          expect(html).not.toContain("help-full-solution");
          expect(html).not.toContain("Doğru yanıt:");
          expect(html).not.toContain("Şıkların mantığı");
          for (const text of [...g.optionReasons, g.commonError, g.check])
            expect(html).not.toContain(escape(text));
          const button = nextButton(
            QuestionHelp({ question: q, level, onLevel }),
          );
          expect(button).toBeDefined();
          expect(button!.props.disabled).toBe(false);
          button!.props.onClick!();
          actions++;
        } else {
          expect(html).toContain(
            "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
          );
          expect(html).toContain(escape(q.options[q.answer]));
          expect(html).toContain(escape(q.explanation));
          for (const text of [...g.optionReasons, g.commonError, g.check])
            expect(html).toContain(escape(text));
          // Option reasons only; a question-type tactic panel has its own list.
          const reasons = html.replace(/<div class="help-tactic">[\s\S]*?<\/div>/g, "");
          expect((reasons.match(/<li>/g) ?? []).length).toBe(5);
          expect(
            nextButton(QuestionHelp({ question: q, level, onLevel })),
          ).toBeUndefined();
        }
      }
      expect(requested).toEqual([1, 2, 3, 4, 5, 6]);
    }
    expect(renders).toBe(210);
    expect(actions).toBe(180);
  });
  it("keeps disabled help closed, distinguishes reviewed help and rejects wrong reason counts", () => {
    for (const q of visible) {
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
        createElement(QuestionHelp, {
          question: q,
          level: 1,
          onLevel: () => {},
        }),
      );
      expect(opened).toContain("bu soru bağımsız doğru olarak sayılmaz");
      const reviewed = renderToStaticMarkup(
        createElement(QuestionHelp, {
          question: q,
          level: 6,
          onLevel: () => {},
          reviewed: true,
        }),
      );
      expect(reviewed).not.toContain("bu soru bağımsız doğru olarak sayılmaz");
      const g = rows.find((r) => r.id === q.id)!.guidance;
      expect(
        resolvedGuidance({
          ...q,
          guidance: { ...g, optionReasons: g.optionReasons.slice(1) },
        }),
      ).toBeUndefined();
    }
  });
  it("checks the focal sound and morphology evidence without changing the old keys", () => {
    // Reference transformations are independent of help copy and the original explanations.
    const removeOne = (word: string, i: number) =>
      [...word].filter((_, n) => n !== i).join("");
    expect(removeOne("omuz", 2) + "u").toBe("omzu");
    expect(removeOne("ağız", 2) + "ı").toBe("ağzı");
    expect(removeOne("küçük", 4) + "cük").toBe("küçücük");
    expect("bekle".slice(0, -1) + "i" + "yor").toBe("bekliyor");
    expect("başla" + "yacak").toBe("başlayacak");
    const vowels = [..."kavun"].filter((x) => "aeıioöuü".includes(x));
    expect(vowels).toEqual(["a", "u"]);
    expect(vowels.every((x) => "aıou".includes(x))).toBe(true);
    expect("aeıi".includes(vowels[0]) && "aeıi".includes(vowels[1])).toBe(
      false,
    );
    const harmony = bank.get("snd-7")!;
    expect(harmony.options[harmony.answer]).toBe(
      "Büyük uyuma uyar, küçük uyuma uymaz; iki hecelidir.",
    );
    // All five actual option pairs satisfy the antecedent; find the one
    // whose final consonant really stays unchanged after the vowel suffix.
    const counterexample = bank.get("snd-4")!;
    const unchanged = counterexample.options.flatMap((option, index) => {
      const [before, after] = option.split(" → ");
      expect("pçtk".includes(before.at(-1)!)).toBe(true);
      expect("aeıioöuü".includes(after.at(-1)!)).toBe(true);
      return before === after.slice(0, -1) ? [index] : [];
    });
    expect(unchanged).toEqual([counterexample.answer]);
    const target = bank.get("wrd-3")!;
    const segments = [
      { text: "Göz", kind: "kök" },
      { text: "lük", kind: "yapım" },
      { text: "çü", kind: "yapım" },
      { text: "ler", kind: "çekim" },
      { text: "imiz", kind: "çekim" },
      { text: "den", kind: "çekim" },
    ];
    expect(target.prompt.startsWith(segments.map((x) => x.text).join(""))).toBe(
      true,
    );
    const derived = segments.filter((x) => x.kind === "yapım").length;
    const inflected = segments.filter((x) => x.kind === "çekim").length;
    expect(target.options[target.answer]).toBe(
      `${derived} yapım, ${inflected} çekim`,
    );
    expect(bank.get("snd-10")!.answer).toBe(1);
  });
});
