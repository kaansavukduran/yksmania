import { createHash } from "node:crypto";
import {
  createElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance029Turkish.json";
import { lessons } from "../src/domain/content";
import { QuestionHelp } from "../src/components/QuestionHelp";
import {
  helpPanels,
  resolvedGuidance,
  previousHelpPanelCount,
} from "../src/learning/questionHelp";
import {
  clarifiedQuestionView,
  localizedQuestionView,
} from "../src/domain/questionPresentation";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";

// Stage owned rows only inside this module. Existing accepted rows stay loaded;
// root owns runtime registration. Old hint-only numbering is1 for these cards.
vi.mock("../src/learning/questionHelpCatalogue.json", async (loadOriginal) => {
  const actual = await loadOriginal<{ default: unknown[] }>();
  return {
    default: [
      ...actual.default,
      ...(await import("../src/learning/guidance029Turkish.json")).default.map(
        (row) => ({ ...row, legacyPanelCount: 1 }),
      ),
    ],
  };
});
const ids = ["isimler-isim-tamlamasi", "sifatlar", "zamirler"];
const oldLessons = ids.map((id) => lessons.find((l) => l.id === id)!);
const raw = oldLessons.flatMap((l) => l.questions);
const hash = (v: unknown) =>
  createHash("sha256").update(JSON.stringify(v)).digest("hex");
const stable = (v: unknown): unknown =>
  Array.isArray(v)
    ? v.map(stable)
    : v && typeof v === "object"
      ? Object.fromEntries(
          Object.entries(v)
            .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
            .map(([k, value]) => [k, stable(value)]),
        )
      : v;
const perQuestion = [
  [
    "f093-noun-1",
    "2ac8d74b0eeb837a53086eef4378def1aa9f3d55f939f64782f32595cdf3ae5f",
  ],
  [
    "f093-noun-2",
    "16117aafdd06a3db8e24fd73bf8a6d543763b32517ec82642ef063599b9aba8a",
  ],
  [
    "f093-noun-3",
    "7be527589060348c3ad4aff97fee13f6eaa597bdf96afafd5607190410f3ba2e",
  ],
  [
    "f093-noun-4",
    "558ba890f39d78ea4511ae7977622b884d24364f2f453e0730420d52f512a0eb",
  ],
  [
    "f093-noun-5",
    "8434c9a53cdf93de48f425adbfce7e7b256f7157b288d1754e1adceecb8b08ce",
  ],
  [
    "f093-noun-6",
    "483602b490965c26651e998aa09e975af1cac6247c9abb819a68b2dfcdb76571",
  ],
  [
    "f093-noun-7",
    "fae336f24967618155c7adc1ec3b17f19971cf799a82c8c44877b208ea18199b",
  ],
  [
    "f093-noun-8",
    "84503af24dab10a074e7a2891b1c3050198e853a36ee3f2231b3da68c93b02a9",
  ],
  [
    "f093-noun-9",
    "7db56c57483bc4ea3bedbbbb30ae4ffc2ba7f9f0ca1073a87b220ba4f22fdd18",
  ],
  [
    "f093-noun-10",
    "2feed4fdb98cd991a35514eebba2d3b49ac54bfc8fdf70ff66757912bab04433",
  ],
  [
    "f093-adj-1",
    "b158009fceb6363015035d30eccb0258265dc18af040ad7b8840ee07d01d3a95",
  ],
  [
    "f093-adj-2",
    "525ce41ce7ff50e2a179c2a2e70a97d94139f29a67057266cff20a0c15979123",
  ],
  [
    "f093-adj-3",
    "67e96d92c190f85850ea1175960a2dfc8140d88a7efa933ad5e35ab9213a74ad",
  ],
  [
    "f093-adj-4",
    "5c254db6cd5faeb4d9a83bea0a8d2c89dcba3405c789afc8aa83dae52b4b895f",
  ],
  [
    "f093-adj-5",
    "1ddeac8b75a4c63f4332cec026d5eac2c3a4ba41d5ce74025330d6ea9e286ff1",
  ],
  [
    "f093-adj-6",
    "da7e95e27f48a81a7a6bd35e44ec584a72960722919f713461e0fe3808cd5579",
  ],
  [
    "f093-adj-7",
    "2952564203a140ca376b142005abdaa01b5109cd1d2c738658395cc7ccc61162",
  ],
  [
    "f093-adj-8",
    "25f6ee48d3a1c4fff5bb0f3c6423463f5797d1e00a3a0802fcb36624a2259c5c",
  ],
  [
    "f093-adj-9",
    "16bf787dac1d4399518bad7cd89294bab1e4ebb9c626af39577826312fbc1f17",
  ],
  [
    "f093-adj-10",
    "6d51a6642122ef4723fdcb072d9047083b796ee4fe16769b9de38c7c3518d050",
  ],
  [
    "f093-pron-1",
    "bb8542b3e08347d53a0e24541b3cd7ad379537d03069608ccce9a763e3d8ba8b",
  ],
  [
    "f093-pron-2",
    "978925da1d02671366e3f6a3f860dcb7df9fac361841dc13aedf01a125f05a04",
  ],
  [
    "f093-pron-3",
    "58cabcde3f48096ab735af10e7b340452b9466dc5f34725e2993b2ea04cfd251",
  ],
  [
    "f093-pron-4",
    "7adbc6a8ac8d8a8151fa06ed8c78c6dcf17ae243efbcfb489460ff2f1d443263",
  ],
  [
    "f093-pron-5",
    "ba63fca57348387d440e23c7b9ccf8a1131f00b21b7087685980bf8ce9a04338",
  ],
  [
    "f093-pron-6",
    "e5d5c3d8e9abe599a31334d66c4d69b092542697d1fd3d7dee494f9835ecc1a2",
  ],
  [
    "f093-pron-7",
    "95d748a50a572cdea5f02af418d2ab2515ddc389907b81a56ee9f75d6a99b9e1",
  ],
  [
    "f093-pron-8",
    "8cef5e370e1843abf55dc854f9480d88c107d5a39f1967a27fa1cb3d3385b847",
  ],
  [
    "f093-pron-9",
    "5b84bd8659868d4717f37a4ca49c4ac70b63ab601b2ab2295719dfca4ca38e54",
  ],
  [
    "f093-pron-10",
    "ab4ddc4410ed3f20bf5a3725d522be0cf00f05d95fc3c5a5d6d51bd7c81db6cf",
  ],
];
const originalFlat: HelpQuestion[] = raw.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  ...(q.passage ? { passage: q.passage.tr } : {}),
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
}));
const noun10Prompt =
  "‘Öğretmenin ve öğrencinin çantası kapıda duruyor.’ cümlesinde öğretmenin ve öğrencinin sözcükleri ilgi eki almış iki tamlayan olarak kullanılmıştır. Bu tamlama grubunda ortak kullanılan unsur hangisidir?";
const flat = originalFlat.map((q) => clarifiedQuestionView(q));
const bank = new Map(flat.map((q) => [q.id, q]));
const escape = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");
type ActionProps = {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};
function nextButton(node: ReactNode): ReactElement<ActionProps> | undefined {
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = nextButton(child);
      if (found) return found;
    }
  } else if (isValidElement<ActionProps>(node)) {
    if (node.type === "button" && node.props.className?.includes("help-next"))
      return node;
    return nextButton(node.props.children);
  }
  return undefined;
}

describe("029 Turkish old30 individual staged guidance", () => {
  it("preserves every complete old card, option order, answer, hint, explanation and full lesson", () => {
    expect(oldLessons.map((l) => l.questions.length)).toEqual([10, 10, 10]);
    expect(hash(raw)).toBe(
      "5e89ce2a670908775f097da96f44eedc696c718e70f56d9238c49509d4f295c4",
    );
    expect(hash(stable(raw))).toBe(
      "c50c374f58546660fe376287528278c34fcd61a709494efef70a8cfde9f2decc",
    );
    expect(hash(oldLessons)).toBe(
      "25fdebb708e2c8829ae7ca1b3f15711bbc1529716316455100f922f57ef56801",
    );
    expect(raw.map((q) => [q.id, hash(q)])).toEqual(perQuestion);
    expect(raw.map((q) => q.answer)).toEqual([
      0, 3, 1, 4, 2, 0, 3, 1, 4, 2, 1, 4, 0, 3, 2, 1, 4, 0, 3, 2, 2, 0, 3, 1, 4,
      2, 0, 3, 1, 4,
    ]);
    expect(raw.map((q) => q.options.length)).toEqual(Array(30).fill(5));
    expect(raw.every((q) => q.guidance === undefined)).toBe(true);
    for (const [i, q] of flat.entries()) {
      expect(clarifiedQuestionView(q)).toBe(q);
      if (q.id === "f093-noun-10") {
        const shown = localizedQuestionView(raw[i]);
        expect(shown.prompt.tr).toBe(noun10Prompt);
        expect(q.prompt).toBe(noun10Prompt);
        expect({ ...shown, prompt: raw[i].prompt }).toEqual(raw[i]);
      } else {
        expect(localizedQuestionView(raw[i])).toBe(raw[i]);
        expect(q).toBe(originalFlat[i]);
      }
    }
  });
  it("binds30 exact identities and390 distinct positive teaching leaves to all150 actual choices", () => {
    expect(rows.map((r) => r.id)).toEqual(flat.map((q) => q.id));
    expect(rows.reduce((n, r) => n + r.guidance.knowledge.length, 0)).toBe(60);
    expect(rows.reduce((n, r) => n + r.guidance.steps.length, 0)).toBe(90);
    expect(rows.reduce((n, r) => n + r.guidance.optionReasons.length, 0)).toBe(
      150,
    );
    const all: string[] = [];
    for (const row of rows) {
      const q = bank.get(row.id)!,
        g = row.guidance;
      expect(Object.keys(row).sort()).toEqual(["guidance", "id", "identity"]);
      expect(row.identity).toBe(questionIdentity(q));
      expect(questionGuidanceSchema.parse(g)).toEqual(g);
      expect(resolvedGuidance(q)).toEqual(g);
      expect(previousHelpPanelCount(q)).toBe(1);
      expect(g.steps).toHaveLength(3);
      expect(g.optionReasons).toHaveLength(q.options.length);
      const partial = [q.hint!, ...g.knowledge, g.strategy, ...g.steps];
      expect(new Set(partial).size, row.id).toBe(partial.length);
      expect(g.strategy).not.toMatch(
        /(?:doğru (?:yanıt|cevap)|[A-E] (?:şıkkı|seçeneği))/i,
      );
      for (const t of [...g.knowledge, g.strategy])
        expect(t).not.toContain(q.options[q.answer]);
      for (const reason of g.optionReasons)
        expect(reason.length, row.id).toBeGreaterThan(45);
      all.push(
        ...g.knowledge,
        g.strategy,
        ...g.steps,
        ...g.optionReasons,
        g.commonError,
        g.check,
      );
    }
    expect(all).toHaveLength(390);
    expect(new Set(all).size).toBe(390);
    expect(all.some((s) => /[\u00ad\u200b]/u.test(s))).toBe(false);
  });
  it("refuses catalogue help after any of six complete identity changes", () => {
    for (const q of flat)
      for (const changed of [
        { ...q, id: q.id + "-other" },
        { ...q, prompt: q.prompt + " Yeni koşul." },
        { ...q, passage: "Başka bir metin." },
        { ...q, options: [...q.options].reverse() },
        { ...q, answer: (q.answer + 1) % q.options.length },
        { ...q, explanation: q.explanation + " Ek çözüm." },
      ]) {
        expect(questionIdentity(changed)).not.toBe(questionIdentity(q));
        expect(resolvedGuidance(changed)).toBeUndefined();
      }
  });
  it("opens every actual knowledge/method/step through real next callbacks before full solution", () => {
    let renders = 0,
      actions = 0;
    for (const q of flat) {
      const g = rows.find((r) => r.id === q.id)!.guidance,
        panels = helpPanels(q);
      expect(panels).toHaveLength(5);
      expect(panels[0].paragraphs).toEqual([q.hint, ...g.knowledge]);
      let level = 0;
      const transitions: number[] = [];
      const onLevel = (n: number) => {
        transitions.push(n);
        level = n;
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
        for (const t of g.knowledge)
          expect(html.includes(escape(t)), q.id).toBe(level >= 1);
        expect(html.includes(escape(g.strategy)), q.id).toBe(level >= 2);
        for (let i = 0; i < g.steps.length; i++)
          expect(html.includes(escape(g.steps[i])), q.id + ":" + i).toBe(
            level >= i + 3,
          );
        if (level < 6) {
          expect(html).not.toContain("help-full-solution");
          expect(html).not.toContain("Doğru yanıt:");
          for (const t of [...g.optionReasons, g.commonError, g.check])
            expect(html).not.toContain(escape(t));
          const next = nextButton(
            QuestionHelp({ question: q, level, onLevel }),
          );
          expect(next).toBeDefined();
          expect(next!.props.disabled).toBe(false);
          next!.props.onClick!();
          actions++;
        } else {
          expect(html).toContain(
            "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
          );
          expect(html).toContain(escape(q.options[q.answer]));
          expect(html).toContain(escape(q.explanation));
          for (const t of [...g.optionReasons, g.commonError, g.check])
            expect(html).toContain(escape(t));
          expect((html.match(/<li>/g) ?? []).length).toBe(5);
          expect(
            nextButton(QuestionHelp({ question: q, level, onLevel })),
          ).toBeUndefined();
        }
      }
      expect(transitions).toEqual([1, 2, 3, 4, 5, 6]);
    }
    expect(renders).toBe(210);
    expect(actions).toBe(180);
  });
  it("keeps disabled and reviewed help honest and rejects incomplete option reasoning", () => {
    for (const q of flat) {
      const g = rows.find((r) => r.id === q.id)!.guidance;
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
      const help = renderToStaticMarkup(
        createElement(QuestionHelp, {
          question: q,
          level: 1,
          onLevel: () => {},
        }),
      );
      expect(help).toContain("bu soru bağımsız doğru olarak sayılmaz");
      const review = renderToStaticMarkup(
        createElement(QuestionHelp, {
          question: q,
          level: 6,
          onLevel: () => {},
          reviewed: true,
        }),
      );
      expect(review).not.toContain("bu soru bağımsız doğru olarak sayılmaz");
      const malformed = {
        ...q,
        guidance: { ...g, optionReasons: g.optionReasons.slice(1) },
      };
      expect(resolvedGuidance(malformed)).toBeUndefined();
      expect(helpPanels(malformed)).toEqual([
        { title: "İlk ipucu", paragraphs: [q.hint] },
      ]);
    }
  });
  it("retains the actual contextual evidence instead of silently inventing a referent or count", () => {
    const sevgi = bank.get("f093-noun-1")!;
    expect(sevgi.prompt).toContain("Aralarındaki sevgi");
    expect(sevgi.options[sevgi.answer]).toBe("Cins, soyut, tekil");
    const amount = bank.get("f093-adj-4")!;
    expect(amount.prompt).toContain("İki bilet değil, yalnız bir bilet");
    expect(amount.options[amount.answer]).toBe("Asıl sayı sıfatı");
    const future = rows.find((r) => r.id === "f093-adj-10")!.guidance;
    expect(future.steps[0]).toContain("edilgen okun-");
    expect(future.steps[1]).toContain("yüklemi ise koydum");
    const referent = bank.get("f093-pron-10")!,
      g = rows.find((r) => r.id === referent.id)!.guidance;
    expect(referent.prompt).toContain("başka bağlam verilmediğinde");
    expect(referent.options[referent.answer]).toContain(
      "tek başına kesinleştirmez",
    );
    expect(g.steps[1]).toContain("Merve’nin");
    expect(g.steps[1]).toContain("Selin’in");
    expect(g.steps[2]).toContain("En az bu iki okuma");
    const shared = rows.find((r) => r.id === "f093-noun-10")!.guidance;
    expect(shared.check).toContain("eşya sayısı seçmek gerekmez");
  });
  it("binds noun10 only to the actual guarded two-genitive view without relying on an optional hint", () => {
    const raw = originalFlat.find((q) => q.id === "f093-noun-10")!;
    const before = structuredClone(raw);
    const view = clarifiedQuestionView(raw);
    expect(view.prompt).toBe(noun10Prompt);
    expect(view.prompt).not.toBe(raw.prompt);
    expect({ ...view, prompt: raw.prompt }).toEqual(raw);
    expect(raw).toEqual(before);
    const row = rows.find((r) => r.id === raw.id)!;
    expect(row.identity).toBe(questionIdentity(view));
    expect(row.identity).not.toBe(questionIdentity(raw));
    expect(resolvedGuidance(raw)).toEqual(row.guidance);
    const { hint: _hint, ...withoutHint } = raw;
    const noHintView = clarifiedQuestionView(withoutHint);
    expect(noHintView.prompt).toBe(noun10Prompt);
    expect(Object.hasOwn(noHintView, "hint")).toBe(false);
    expect(resolvedGuidance(withoutHint)).toEqual(row.guidance);
    expect(helpPanels(withoutHint)[0].paragraphs).toEqual(
      row.guidance.knowledge,
    );
  });
});
