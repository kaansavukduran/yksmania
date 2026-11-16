import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  createElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance030Humanities.json";
import { lessons } from "../src/domain/content";
import { lessonGuides } from "../src/learning/guides";
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

// Only this owned cohort is staged in the real resolver. Runtime registration is root-owned.
vi.mock("../src/learning/questionHelpCatalogue.json", async (loadOriginal) => {
  const actual = await loadOriginal<{ default: unknown[] }>();
  return {
    default: [
      ...actual.default,
      ...(
        await import("../src/learning/guidance030Humanities.json")
      ).default.map((row) => ({ ...row, legacyPanelCount: 1 })),
    ],
  };
});
const ids = [
  "zarflar",
  "degisim-caginda-avrupa-osmanli",
  "devrimler-caginda-devlet-toplum",
  "denge-stratejisi",
  "degisen-sosyoekonomik-hayat",
  "yirminci-yuzyil-baslarinda-osmanli",
];
const oldLessons = ids.map((id) => lessons.find((l) => l.id === id)!);
const raw = oldLessons.flatMap((l) => l.questions);
const originalFlat: HelpQuestion[] = raw.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  ...(q.passage ? { passage: q.passage.tr } : {}),
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
}));
const flat = originalFlat.map((q) => clarifiedQuestionView(q));
const bank = new Map(flat.map((q) => [q.id, q]));
const hash = (v: unknown) =>
  createHash("sha256").update(JSON.stringify(v)).digest("hex");
const stable = (v: unknown): unknown =>
  Array.isArray(v)
    ? v.map(stable)
    : v && typeof v === "object"
      ? Object.fromEntries(
          Object.entries(v)
            .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
            .map(([k, x]) => [k, stable(x)]),
        )
      : v;
const perQuestion = [
  [
    "f011-adverb-1",
    "19e9c14c72677a981e5f2da93b4f3a8fbe60baeb2a615c17afdd5141d6a77b57",
  ],
  [
    "f011-adverb-2",
    "9d500ca8797c20245b55a569e1247c1160fd93736b23583b3fe7e1fe9169fbbc",
  ],
  [
    "f011-adverb-3",
    "fd06e274480547f8be86def6a81a7432b396aa3aff7536efb181a70a543bb460",
  ],
  [
    "f011-adverb-4",
    "be48bfbceceb4f0ed51aa3f6b0df2dd5729c97d5471f42fb996aa2aea818e0d5",
  ],
  [
    "f011-adverb-5",
    "d546e21060e1e2c372e7a84854b017633441f717e0bc52077c96fc675875b4ea",
  ],
  [
    "f011-adverb-6",
    "91df61de04d969d6c3fc3eaf772eb01f89baf6a3a325a9715f206363e684e10e",
  ],
  [
    "f011-adverb-7",
    "28fa020e0c6c183a29eb52057f1eac228af4df5ac4ba49e7410c4522b8a03be1",
  ],
  [
    "f011-adverb-8",
    "91c122d7ba3c7d8a9dbffc6c03137b359a69eaac401f0489f97d2ddd7ac152d2",
  ],
  [
    "f011-adverb-9",
    "18fd141cffd712d845b886c7d00000a0929fccf748fda215b15cbe1f620c1067",
  ],
  [
    "f011-adverb-10",
    "7dbf8926bf5262897aa2e3b364dfa916bc5d93f62e545f3de6cf244d331779b0",
  ],
  [
    "f11h-c01",
    "b58b7f0ac15c07eddaf10155ca2734bf5763330d2ebe060996554443f2b4c645",
  ],
  [
    "f11h-c02",
    "e1b5410c5e9672d96f79194d7a95095b4e6392f0180228d072a076b1dc93529a",
  ],
  [
    "f11h-c03",
    "cfc26273557172472b3ef72241ba75edafcca28f12b24540db3abbe0a316bed1",
  ],
  [
    "f11h-c04",
    "a969abfce0a629244fad8639e919f22133a569967c20cc2def4283657958f26d",
  ],
  [
    "f11h-c05",
    "913f5c255ef58c8ae559542a1eda222e6a548558cad4a25940852fa5f4cbf402",
  ],
  [
    "f11h-c06",
    "8ea7a8e3a6599817f1adc6acde214f30eb69deb037e81d4ddfdd50c5c2e5ee09",
  ],
  [
    "f11h-c07",
    "d63e717a125f48fd97c2a4f9d89f62597ba04d1a9e8984051d6d7db6b8460017",
  ],
  [
    "f11h-c08",
    "105e5101462e2af23732159a38a55452aed9fbf061e771b2ebdb4ff3b0fdf7d3",
  ],
  [
    "f11h-c09",
    "a0221671d0fc1151b14747bb8a728a09d61d34ae6ac6c82514f2d38aa945841c",
  ],
  [
    "f11h-c10",
    "8507f48cbf24a18c3972ddbef805d518bcd6ba0a3b00c70eb28b3803bbb0db88",
  ],
  [
    "f11h-r01",
    "be8c43481fc7712beb0c9a74f8ef2bbc5d9270d4e4f64c33972770186dc244bf",
  ],
  [
    "f11h-r02",
    "d145eca0f6b7a61e0b43c8f25ed0197742aa77d51dd256f8a4b77a5c238d0735",
  ],
  [
    "f11h-r03",
    "499a92f42edc2d4c2768ab58bd6741d2db1b73a5dde6d65d7b860814b2bde626",
  ],
  [
    "f11h-r04",
    "51e0acb541cf2f05b38e79c72b9c4a03d4e56490f2b211aed65beda5ff6b4b94",
  ],
  [
    "f11h-r05",
    "670feeb37eec14f237fb8a8756b1b32992169f54e4385431dd341245294cec9b",
  ],
  [
    "f11h-r06",
    "5e4fb54fc5103d6a432861bb2df55a3803ba41f7c2a1b893ed53f5e64481f414",
  ],
  [
    "f11h-r07",
    "5db681c9a525226abc90aa7cfcc391fc42566fa6334b5ab5fcb7c10cc11c7d53",
  ],
  [
    "f11h-r08",
    "3825f238441488d489b997ae40e4d78ef5ec06392c52b7005dbc755eca04840a",
  ],
  [
    "f11h-r09",
    "26bb0b08f72550e27c7f2dffb3984e11391f03b90bdd85de18261243b70a69ad",
  ],
  [
    "f11h-r10",
    "5fadf064b29ae4c440a40f28a899d571cc6b162d2ab8894cc0b81a155cb1effa",
  ],
  [
    "f11h-b01",
    "c2d350a00e1b20699e5f48f50f31893670b8b9d06fa0640e279e6302e8fd0503",
  ],
  [
    "f11h-b02",
    "530252594fa69e27135100fafc1c478eaf6663be0ec0594dd92072e3d5bac798",
  ],
  [
    "f11h-b03",
    "58985654224b88d2a7ebdc99d0e86045ad930fbed2741d696c931396ee0cd774",
  ],
  [
    "f11h-b04",
    "a739b643034f9ac0431ac84ed5f36ee4051fd67c4c69700b2b8b2a50ea9f2c94",
  ],
  [
    "f11h-b05",
    "8295741c2f5ebced770c03578e5803091e0fd881f926deed859330d1254b0523",
  ],
  [
    "f11h-b06",
    "9c202bb723c495d043926ac60231df3b654560f58eb1348138dc6e5eb98bda57",
  ],
  [
    "f11h-b07",
    "e0b3bbd98de4504d7e9e5d1427af12d01dcf3c33e9e8f5a8d24a1fb646200a96",
  ],
  [
    "f11h-b08",
    "0bf3efd346338f91da446fa03e7d72cab8a4adf2cb6b2cd15c9de313e95c9ef2",
  ],
  [
    "f11h-b09",
    "070339f3f892e7cf492d7a9c060e151c33fe93c0a0bb5d1462a361259eb86351",
  ],
  [
    "f11h-b10",
    "2f9222fbafe7f871ae03ce6ecd7210fcb3fe6f60a3a3ad4e80cdb835c808d0e7",
  ],
  [
    "f11h-s01",
    "9a78c9ed031f8b808244826cc7eedd3fbd344f1342d44c9981d6fa17d764aa4d",
  ],
  [
    "f11h-s02",
    "a66d6c12e0b0539103d2ce1de80e50d810b7d720454f17e50467befc77df571b",
  ],
  [
    "f11h-s03",
    "909436ab01986076f0939593b60e8c8efb5fc432fec836ed6455fa877d1d2eaf",
  ],
  [
    "f11h-s04",
    "fd0e31b55d5450c8306ec34b691f50f1a8631b4db1c20b1013a4e244ff7496e5",
  ],
  [
    "f11h-s05",
    "b41e2a8d4733d81f74d0e8a59c53a5d61812e465982252dff9bcf8b28173ab40",
  ],
  [
    "f11h-s06",
    "a27463a7a83febe69f2486189ecad091b9899d4bbdf395f4aa4908e91e8c310b",
  ],
  [
    "f11h-s07",
    "647a3dd12e5ffa81ad01c2b4b398699a0ee3ceb9b33c6e7058cbed4cfcffc59f",
  ],
  [
    "f11h-s08",
    "9da01e246d2308ef14be9406d961846165bd9d1a35ef3c4435f1c354058cd497",
  ],
  [
    "f11h-s09",
    "88669547a059e138efe4d8ad85b143e91940fd2a69c8a92fbe993e061c5755e9",
  ],
  [
    "f11h-s10",
    "7e4e34b6f68389af8e4012625920e8725dea5a3e09642f79e77092b90a398ee5",
  ],
  [
    "f11h-w01",
    "c880ba9fe49c09c2286dba6e017d96deda08d8e7797b608477680d56fdc89d0b",
  ],
  [
    "f11h-w02",
    "30639d269f133296e5cd138e6090942df6eecd4d8696b748b122b07e4c8f1b4f",
  ],
  [
    "f11h-w03",
    "fe7408426932beff7d6cc5309a0388e85d243a5a7e9855efa3df1e1056a29581",
  ],
  [
    "f11h-w04",
    "badb1f50f6d9e63af931c77a3df5237561eac3704b4c8f3538fd9f2515f6941a",
  ],
  [
    "f11h-w05",
    "6cadc2bbe32e4c62276852dd2bf7b5bc7ee6cdb07e736abae805af879e60ace2",
  ],
  [
    "f11h-w06",
    "6b132633e04553fc081e47b494848e3f208d6e88e4aa9ee088f28eae46719eb4",
  ],
  [
    "f11h-w07",
    "4893d16927ea68b535a8ffd5dd7c7220cf098094c7563eac3d3a105317dc4774",
  ],
  [
    "f11h-w08",
    "e247164aa8c18f573afedb8490b592af3cacddda653069b61da25597fa1f7f15",
  ],
  [
    "f11h-w09",
    "46b1b893d98df1ef6251f26b4a8051ed28833c69ad63b7cbda874933a1ad52e5",
  ],
  [
    "f11h-w10",
    "f827e35b1b4aa902e3582f8004122ee7c5ae5c53106e808e2315264e85906061",
  ],
];
const guideHashes = [
  [
    "zarflar",
    "6f9dd104e407e90d6923337851d9034b231a17d90fdee8b6d0d7e86d2d72b76a",
  ],
  [
    "degisim-caginda-avrupa-osmanli",
    "05f685d3a1741527f3afba1401fa89c9f63178c72f7944ef70240ee88e4c1b43",
  ],
  [
    "devrimler-caginda-devlet-toplum",
    "16a8f56bcdb59e94188ac1aac70d74861c668998e9bda380e43b35b46b40462f",
  ],
  [
    "denge-stratejisi",
    "782d208abcca60de6e0fa993b295202f94ae0105611fde72e30114485904e28b",
  ],
  [
    "degisen-sosyoekonomik-hayat",
    "cd1a4be3c4a616a196dfeb6fd458eca82d4d67e10ac95860955093b76033179b",
  ],
  [
    "yirminci-yuzyil-baslarinda-osmanli",
    "26cc5d80ff224db3b87f6f9e5b0148eab752684bc55d8c2660dc6b2336307236",
  ],
];
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
const html = (
  q: HelpQuestion,
  level: number,
  onLevel: (n: number) => void = () => {},
  extra: { disabled?: boolean; reviewed?: boolean } = {},
) =>
  renderToStaticMarkup(
    createElement(QuestionHelp, { question: q, level, onLevel, ...extra }),
  );

describe("030 Humanities old60 individual staged guidance", () => {
  it("retains all complete raw cards, original300 options and six full lessons/guides", () => {
    expect(oldLessons.map((l) => l.questions.length)).toEqual([
      10, 10, 10, 10, 10, 10,
    ]);
    expect(hash(raw)).toBe(
      "3fff01a6df703496425490b5a824da288ac0092f4a3263854a9d14cba9e72a77",
    );
    expect(hash(stable(raw))).toBe(
      "9e2043adf179bff06f3de95b0bfb2f10774127e2c6cdbece48329abfd68be3a9",
    );
    expect(hash(oldLessons)).toBe(
      "3432d24c46780a1588b206dcdfebe663180d2ca20c190ad15e5f126181069b3b",
    );
    expect(raw.map((q) => [q.id, hash(q)])).toEqual(perQuestion);
    expect(raw.map((q) => q.answer)).toEqual(
      Array.from({ length: 60 }, (_, i) => i % 5),
    );
    expect(raw.map((q) => q.options.length)).toEqual(Array(60).fill(5));
    expect(raw.every((q) => q.guidance === undefined)).toBe(true);
    for (const [id, h] of guideHashes)
      expect(hash(stable(lessonGuides.get(id)))).toBe(h);
    for (const [i, q] of flat.entries()) {
      expect(localizedQuestionView(raw[i])).toBe(raw[i]);
      expect(q).toBe(originalFlat[i]);
      expect(clarifiedQuestionView(q)).toBe(q);
    }
    expect(
      createHash("sha256")
        .update(
          readFileSync(
            new URL("../src/learning/forge011Turkish.ts", import.meta.url),
          ),
        )
        .digest("hex"),
    ).toBe("d1402c0c9d97a9e29ece94b4be2875005972a97b7dbc2c8f6b1d0d15c9f038ce");
    expect(
      createHash("sha256")
        .update(
          readFileSync(
            new URL("../src/learning/forge011History.ts", import.meta.url),
          ),
        )
        .digest("hex"),
    ).toBe("091ee9c11beb060176aec55a059ba722de5c2e94662569cd044ffe722b08ac51");
  });
  it("binds60 actual identities and730 unique specific leaves to ordered five-choice cards", () => {
    expect(rows.map((r) => r.id)).toEqual(flat.map((q) => q.id));
    expect(rows.reduce((n, r) => n + r.guidance.knowledge.length, 0)).toBe(70);
    expect(rows.reduce((n, r) => n + r.guidance.steps.length, 0)).toBe(180);
    expect(rows.reduce((n, r) => n + r.guidance.optionReasons.length, 0)).toBe(
      300,
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
      for (const early of [...g.knowledge, g.strategy])
        expect(early).not.toContain(q.options[q.answer]);
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
    expect(all).toHaveLength(730);
    expect(new Set(all).size).toBe(730);
    expect(all.some((s) => /[\u00ad\u200b]/u.test(s))).toBe(false);
    const names: Record<string, string> = {
      "f11h-c01": "Rönesans",
      "f11h-c02": "Reform",
      "f11h-c03": "Merkantilizm",
      "f11h-c05": "İltizam",
      "f11h-c06": "Malikâne",
      "f11h-r01": "Sened-i İttifak",
      "f11h-r02": "Tanzimat",
      "f11h-r03": "Islahat",
      "f11h-r05": "Meşrutiyet",
      "f11h-r07": "Asakir-i Mansure",
      "f11h-s01": "Ücretli emek",
      "f11h-s03": "Düyûn",
      "f11h-w01": "II. Meşrutiyet",
      "f11h-w02": "Osmanlıcılık",
      "f11h-w06": "Çanakkale",
      "f11h-w10": "Mondros",
    };
    for (const row of rows)
      if (names[row.id])
        expect(
          [...row.guidance.knowledge, row.guidance.strategy]
            .join(" ")
            .toLocaleLowerCase("tr"),
          row.id,
        ).not.toContain(names[row.id].toLocaleLowerCase("tr"));
  });
  it("rejects catalogue guidance for six complete identity mutations per card", () => {
    let rejected = 0;
    for (const q of flat)
      for (const changed of [
        { ...q, id: q.id + "-other" },
        { ...q, prompt: q.prompt + " Yeni koşul." },
        { ...q, passage: "Başka metin." },
        { ...q, options: [...q.options].reverse() },
        { ...q, answer: (q.answer + 1) % q.options.length },
        { ...q, explanation: q.explanation + " Ek çözüm." },
      ]) {
        expect(questionIdentity(changed)).not.toBe(questionIdentity(q));
        expect(resolvedGuidance(changed)).toBeUndefined();
        expect(helpPanels(changed)).toEqual([
          { title: "İlk ipucu", paragraphs: [q.hint] },
        ]);
        rejected++;
      }
    expect(rejected).toBe(360);
  });
  it("reveals actual prerequisite, method, three steps and full solution only through real next callbacks", () => {
    let renders = 0,
      actions = 0;
    for (const q of flat) {
      const g = rows.find((r) => r.id === q.id)!.guidance;
      const panels = helpPanels(q);
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
        const rendered = html(q, level, onLevel);
        renders++;
        expect((rendered.match(/<h3>/g) ?? []).length).toBe(
          Math.min(level, 5) + (level > 5 ? 1 : 0),
        );
        for (const t of g.knowledge)
          expect(rendered.includes(escape(t)), q.id).toBe(level >= 1);
        expect(rendered.includes(escape(g.strategy)), q.id).toBe(level >= 2);
        for (let i = 0; i < 3; i++)
          expect(rendered.includes(escape(g.steps[i])), q.id + ":" + i).toBe(
            level >= i + 3,
          );
        if (level < 6) {
          expect(rendered).not.toContain("help-full-solution");
          expect(rendered).not.toContain("Doğru yanıt:");
          for (const t of [...g.optionReasons, g.commonError, g.check])
            expect(rendered).not.toContain(escape(t));
          const next = nextButton(
            QuestionHelp({ question: q, level, onLevel }),
          );
          expect(next).toBeDefined();
          expect(next!.props.disabled).toBe(false);
          next!.props.onClick!();
          actions++;
        } else {
          expect(rendered).toContain(
            "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
          );
          expect(rendered).toContain(escape(q.options[q.answer]));
          expect(rendered).toContain(escape(q.explanation));
          for (const t of [...g.optionReasons, g.commonError, g.check])
            expect(rendered).toContain(escape(t));
          expect((rendered.match(/<li>/g) ?? []).length).toBe(5);
          expect(
            nextButton(QuestionHelp({ question: q, level, onLevel })),
          ).toBeUndefined();
        }
      }
      expect(transitions).toEqual([1, 2, 3, 4, 5, 6]);
    }
    expect(renders).toBe(420);
    expect(actions).toBe(360);
  });
  it("preserves personal and absent hints while keeping disabled and review evidence honest", () => {
    let calls = 0;
    const noop = () => {
      calls++;
    };
    for (const q of flat) {
      const g = rows.find((r) => r.id === q.id)!.guidance;
      const disabled = html(q, 0, noop, { disabled: true });
      expect(disabled).toContain('disabled=""');
      expect(disabled).not.toContain("Çözüm rehberi");
      expect(
        nextButton(
          QuestionHelp({
            question: q,
            level: 0,
            onLevel: noop,
            disabled: true,
          }),
        )!.props.disabled,
      ).toBe(true);
      const personal = { ...q, hint: "Kendi notum: bağlantıları oklarla çiz." };
      expect(resolvedGuidance(personal)).toEqual(g);
      expect(helpPanels(personal)[0].paragraphs).toEqual([
        personal.hint,
        ...g.knowledge,
      ]);
      expect(html(personal, 1)).toContain(escape(personal.hint));
      expect(html(personal, 1)).not.toContain(escape(q.hint!));
      const { hint: _hint, ...withoutHint } = q;
      expect(resolvedGuidance(withoutHint)).toEqual(g);
      expect(helpPanels(withoutHint)[0].paragraphs).toEqual(g.knowledge);
      expect(html(withoutHint, 1)).not.toContain(escape(q.hint!));
      expect(html(q, 1)).toContain("bu soru bağımsız doğru olarak sayılmaz");
      expect(html(q, 6, noop, { reviewed: true })).not.toContain(
        "bu soru bağımsız doğru olarak sayılmaz",
      );
    }
    expect(calls).toBe(0);
  });
  it("gives complete inline snapshots priority, rejects bad reason counts and never writes inputs", () => {
    const before = hash(raw),
      beforeRows = hash(rows);
    for (const q of flat) {
      const g = rows.find((r) => r.id === q.id)!.guidance;
      const inline = {
        ...g,
        knowledge: ["Bu kayıt kendi korunmuş bilgisini içerir."],
        strategy: "Bu kaydın kendi ilişkilerini ayrı incele.",
      };
      const snapshot = {
        ...q,
        options: Object.freeze([...q.options]) as unknown as string[],
        guidance: inline,
        personalMetadata: { note: "Kişisel kayıt", unknown: [1, 2] },
      };
      Object.freeze(snapshot.personalMetadata.unknown);
      Object.freeze(snapshot.personalMetadata);
      Object.freeze(snapshot);
      const saved = hash(snapshot);
      expect(resolvedGuidance(snapshot)).toBe(inline);
      expect(previousHelpPanelCount(snapshot)).toBeUndefined();
      expect(helpPanels(snapshot)[0].paragraphs).toEqual([
        q.hint,
        ...inline.knowledge,
      ]);
      expect(html(snapshot, 1)).toContain(escape(inline.knowledge[0]));
      expect(html(snapshot, 1)).not.toContain(escape(g.knowledge[0]));
      expect(hash(snapshot)).toBe(saved);
      const malformed = {
        ...q,
        guidance: { ...g, optionReasons: g.optionReasons.slice(1) },
      };
      expect(resolvedGuidance(malformed)).toBeUndefined();
      expect(helpPanels(malformed)).toEqual([
        { title: "İlk ipucu", paragraphs: [q.hint] },
      ]);
    }
    expect(hash(raw)).toBe(before);
    expect(hash(rows)).toBe(beforeRows);
  });
  it("checks chronology by explicit event operations and a separate chronological ordering oracle", () => {
    const q = bank.get("f11h-w03")!;
    const events = [
      { name: "Trablusgarp", year: 1911 },
      { name: "I. Balkan Savaşı", year: 1912 },
      { name: "Karadeniz harekâtı", year: 1914 },
    ];
    const expected = [...events]
      .sort((a, b) => a.year - b.year)
      .map((e) => e.name)
      .join(" → ");
    expect(q.options[q.answer]).toBe(expected);
    const century = (year: number) => Math.ceil(year / 100);
    expect(
      [1500, 1501, 1700, 1701, 1800, 1801, 1900, 1901].map(century),
    ).toEqual([15, 16, 17, 18, 18, 19, 19, 20]);
    const annex = bank.get("f11h-b07")!;
    expect(annex.passage).toContain("1774");
    expect(annex.passage).toContain("1783");
    expect(annex.passage).toContain("1792");
    expect(annex.options[annex.answer]).toBe(
      "1783: Rusya'nın ilhakı gerçekleşti.",
    );
    expect(rows.find((r) => r.id === annex.id)!.guidance.steps[1]).toContain(
      "1792 Yaş Antlaşması",
    );
    const italy = bank.get("f11h-w05")!;
    expect(italy.passage).toContain("1914'te tarafsız");
    expect(italy.options[italy.answer]).toContain(
      "1914'te Almanya yanında fiilen",
    );
  });
  it("verifies the wage-price direction with independent positive-ratio inequalities, without adding stem numbers", () => {
    let cases = 0;
    for (let wage = 1; wage <= 25; wage++)
      for (let price = 1; price <= 25; price++)
        for (let delta = 1; delta <= 10; delta++) {
          expect(wage * price).toBeLessThan(wage * (price + delta));
          cases++;
        }
    expect(cases).toBe(6250);
    const q = bank.get("f11h-c04")!;
    expect(q.options[q.answer]).toBe("Aynı maaş daha az temel mal alabilir.");
    const g = rows.find((r) => r.id === q.id)!.guidance;
    expect(g.steps[0]).toContain("değişmediğini");
    expect(g.steps[1]).toContain("Pay sabitken pozitif fiyatın yükselmesi");
  });
  it("retains the actual Turkish syntactic evidence and does not rely on unasked assumptions", () => {
    const direction = rows.find((r) => r.id === "f011-adverb-2")!.guidance;
    expect(direction.steps[1]).toContain("içeri-y-e");
    const degree = rows.find((r) => r.id === "f011-adverb-3")!.guidance;
    expect(degree.steps[2]).toContain("pek → yavaş → yürüdü");
    const phrase = rows.find((r) => r.id === "f011-adverb-6")!.guidance;
    expect(phrase.steps[0]).toContain("-ın ilgi ekidir");
    expect(phrase.steps[1]).toContain("Ne zaman yürüdük?");
    const participle = rows.find((r) => r.id === "f011-adverb-7")!.guidance;
    expect(participle.steps[0]).toContain("sıfat-fiildir");
    expect(participle.steps[1]).toContain("Nasıl çalışan?");
    const morphology = rows.find((r) => r.id === "f011-adverb-9")!.guidance;
    expect(morphology.steps[0]).toContain("gül- fiilidir");
    expect(morphology.steps[1]).toContain("neşe adı");
    const ne = bank.get("f011-adverb-10")!;
    expect(ne.prompt).toContain("açıkça ‘Niçin bağırıyorsun?’");
    expect(ne.options[ne.answer]).toContain("nedenini soran soru zarfı");
  });
});
