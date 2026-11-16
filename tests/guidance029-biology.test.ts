import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { Children, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance029Biology.json";
import { lessons } from "../src/domain/content";
import { clarifiedQuestionView } from "../src/domain/questionPresentation";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";

// Only the unregistered029 catalogue is substituted in this test. The actual
// production resolver, identity guard, presentation and QuestionHelp execute.
// This proves author staging, not global registration or browser acceptance.
vi.mock("../src/learning/questionHelpCatalogue.json", async () => ({
  default: (await import("../src/learning/guidance029Biology.json")).default,
}));
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";

const ids = [
  "hucre-zarinda-madde-alisverisleri",
  "canlilarin-siniflandirilmasi",
];
const groups = ids.map((id) => lessons.find((l) => l.id === id)!.questions);
const originals = groups.flat();
const rawFlat: HelpQuestion[] = originals.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
}));
const flat: HelpQuestion[] = rawFlat.map(clarifiedQuestionView);
const canonical = (x: unknown): unknown =>
  Array.isArray(x)
    ? x.map(canonical)
    : x && typeof x === "object"
      ? Object.fromEntries(
          Object.keys(x)
            .sort()
            .map((k) => [k, canonical((x as Record<string, unknown>)[k])]),
        )
      : x;
const hash = (x: unknown) =>
  createHash("sha256")
    .update(JSON.stringify(canonical(x)))
    .digest("hex");
// Preserve mathematical operators: +, − and arrows carry scientific meaning.
const fold = (s: string) =>
  s
    .normalize("NFKC")
    .toLocaleLowerCase("tr-TR")
    .replace(/\s+/gu, " ")
    .trim()
    .replace(/[.!?;:,]+$/u, "");
const plain = (s: string) =>
  s
    .replace(/<[^>]*>/g, "")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
const findButton = (tree: ReactNode): Record<string, unknown> | undefined => {
  let result: Record<string, unknown> | undefined;
  Children.forEach(tree, (node) => {
    if (!isValidElement<Record<string, unknown>>(node) || result) return;
    result =
      node.type === "button"
        ? node.props
        : findButton(node.props.children as ReactNode);
  });
  return result;
};
const q = (id: string) => flat.find((card) => card.id === id)!;
const chosen = (id: string) => {
  const card = q(id);
  return card.options[card.answer];
};

describe("029 iki eski biyoloji dersinde 20 özgül kademeli yardım", () => {
  it("20 tam eski payloadı, kaynak dosyasını, kimlik ve beş şıkkı korur", () => {
    expect(groups.map((g) => g.length)).toEqual([10, 10]);
    expect(hash(originals)).toBe(
      "3bd12adb383c526b9b3b14258b6254d4b2bb604fa786a3e389202f1715021622",
    );
    expect(
      createHash("sha256")
        .update(
          readFileSync(
            new URL("../src/learning/forge093Biology.ts", import.meta.url),
          ),
        )
        .digest("hex"),
    ).toBe("ee3145e15ae3f15a29a839a938c44ff2c46b9a326d98b78d1158c8fefba57464");
    expect(
      flat
        .filter(
          (card, i) => questionIdentity(card) !== questionIdentity(rawFlat[i]),
        )
        .map((card) => card.id),
    ).toEqual(["f093-membrane-4"]);
    expect(flat[3].prompt).toBe(
      "Her biri 1 L sabit hacimli iki bölmede X maddesinin başlangıç derişimi dışta 8 mol/L, içte 2 mol/L’dir. Kapalı sistemde tek bir adımda dıştan içe 1 mol X aktarılıyor; üretim ve tüketim yoktur. Yeni dış/iç derişimleri mol/L olarak hangisidir?",
    );
    expect(flat[3].options).toEqual(rawFlat[3].options);
    expect(flat[3].answer).toBe(rawFlat[3].answer);
    expect(flat[3].hint).toBe(rawFlat[3].hint);
    expect(rows.map((r) => r.id)).toEqual(flat.map((card) => card.id));
    expect(new Set(rows.map((r) => r.id)).size).toBe(20);
    for (const [i, row] of rows.entries()) {
      expect(Object.keys(row).sort()).toEqual(["guidance", "id", "identity"]);
      expect(flat[i].options).toHaveLength(5);
      expect(row.identity).toBe(questionIdentity(flat[i]));
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

  it("40 pozitif bilgi, 20 ayrı yöntem, 60 ilerleyen adım ve 100 şık nedenini ayırır", () => {
    expect(rows.reduce((n, r) => n + r.guidance.knowledge.length, 0)).toBe(40);
    expect(rows.reduce((n, r) => n + r.guidance.steps.length, 0)).toBe(60);
    expect(rows.reduce((n, r) => n + r.guidance.optionReasons.length, 0)).toBe(
      100,
    );
    expect(new Set(rows.map((r) => fold(r.guidance.strategy))).size).toBe(20);
    expect(fold("3 + 1")).not.toBe(fold("3 − 1"));
    for (const [i, row] of rows.entries()) {
      const g = questionGuidanceSchema.parse(row.guidance),
        card = flat[i];
      expect(g.steps).toHaveLength(3);
      expect(
        new Set([...g.knowledge, g.strategy, ...g.steps].map(fold)).size,
      ).toBe(6);
      expect(new Set(g.optionReasons.map(fold)).size).toBe(5);
      expect([...g.knowledge, g.strategy, ...g.steps].map(fold)).not.toContain(
        fold(card.hint!),
      );
      expect(g.steps.map(fold)).not.toContain(fold(card.explanation));
      expect(g.strategy).not.toMatch(/(?:doğru|yanıt|cevap)\s*[:=]\s*[A-E]/iu);
      expect(g.strategy).not.toContain(card.options[card.answer]);
      for (const [j, reason] of g.optionReasons.entries()) {
        expect(reason.length, row.id + "/" + j).toBeGreaterThan(45);
        expect(reason.startsWith("Doğru."), row.id + "/" + j).toBe(
          j === card.answer,
        );
      }
      expect(g.commonError.length).toBeGreaterThan(45);
      expect(g.check.length).toBeGreaterThan(45);
    }
  });

  it("gerçek resolver fixture'da 20 kabul ve 120 değişmiş kimlik reddi uygular", () => {
    for (const [i, card] of flat.entries()) {
      expect(resolvedGuidance(card)).toEqual(rows[i].guidance);
      for (const changed of [
        { ...card, id: card.id + "-changed" },
        { ...card, prompt: card.prompt + " Ek koşul." },
        { ...card, passage: "Farklı pasaj" },
        {
          ...card,
          options: [card.options[1], card.options[0], ...card.options.slice(2)],
        },
        { ...card, answer: (card.answer + 1) % 5 },
        { ...card, explanation: card.explanation + " Farklı sonuç." },
      ]) {
        expect(questionIdentity(changed)).not.toBe(rows[i].identity);
        expect(resolvedGuidance(changed)).toBeUndefined();
      }
      expect(questionIdentity({ ...card, hint: "Değişmiş ipucu" })).toBe(
        rows[i].identity,
      );
    }
  });

  it("140 gerçek SSR ve 120 Next callback ile bilgi, yöntem, adım ve tam çözümü açar", () => {
    const warn = vi.spyOn(console, "error");
    const before = JSON.stringify(flat);
    try {
      for (const [i, card] of flat.entries()) {
        const g = rows[i].guidance,
          panels = helpPanels(card);
        expect(panels.map((p) => p.title)).toEqual([
          "Bilmen gerekenler",
          "Çözüm yolu",
          "1. adım",
          "2. adım",
          "3. adım",
        ]);
        expect(panels[0].paragraphs).toEqual([card.hint, ...g.knowledge]);
        for (let level = 0; level <= 6; level++) {
          let calls = 0,
            next = -1;
          const tree = QuestionHelp({
            question: card,
            level,
            onLevel: (n) => {
              calls++;
              next = n;
            },
          });
          const html = renderToStaticMarkup(tree),
            text = plain(html);
          expect(calls).toBe(0);
          for (const p of g.knowledge)
            expect(text.includes(p)).toBe(level >= 1);
          expect(text.includes(g.strategy)).toBe(level >= 2);
          for (const [j, step] of g.steps.entries())
            expect(text.includes(step), card.id + "/" + j).toBe(level >= j + 3);
          expect(text.includes("Doğru yanıt:")).toBe(level === 6);
          expect(html.includes('aria-label="Tam çözüm"')).toBe(level === 6);
          if (level === 6) {
            expect(text).toContain(
              "Doğru yanıt: " + String.fromCharCode(65 + card.answer),
            );
            expect(text).toContain(card.explanation);
            for (const reason of g.optionReasons)
              expect(text).toContain(reason);
            expect(text).toContain(g.commonError);
            expect(text).toContain(g.check);
            expect(findButton(tree)).toBeUndefined();
          } else {
            expect(text).not.toContain(g.optionReasons[0]);
            const button = findButton(tree)!;
            expect(button.disabled).toBe(false);
            (button.onClick as () => void)();
            expect(calls).toBe(1);
            expect(next).toBe(level + 1);
          }
        }
      }
      expect(JSON.stringify(flat)).toBe(before);
      expect(warn).not.toHaveBeenCalled();
    } finally {
      warn.mockRestore();
    }
  });

  it("40 ek SSR'de yardım uyarısını ve gerçek beş şık uzunluğu guard'ını korur", () => {
    for (const [i, card] of flat.entries()) {
      for (const reviewed of [false, true]) {
        let calls = 0;
        const html = renderToStaticMarkup(
          QuestionHelp({
            question: card,
            level: 1,
            reviewed,
            onLevel: () => calls++,
          }),
        );
        expect(
          plain(html).includes("bu soru bağımsız doğru olarak sayılmaz"),
        ).toBe(!reviewed);
        expect(calls).toBe(0);
      }
      const broken = {
        ...card,
        guidance: {
          ...rows[i].guidance,
          optionReasons: rows[i].guidance.optionReasons.slice(1),
        },
      };
      expect(resolvedGuidance(broken)).toBeUndefined();
      expect(helpPanels(broken)).toEqual([
        { title: "İlk ipucu", paragraphs: [card.hint] },
      ]);
    }
  });

  it("maddeyi tanecik envanterinden taşır, su basıncını ve diyaliz farkını denetler", () => {
    const particles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      region: i < 8 ? "outside" : "inside",
    }));
    particles.find((p) => p.region === "outside")!.region = "inside";
    const outside = particles.filter((p) => p.region === "outside").length;
    const inside = particles.filter((p) => p.region === "inside").length;
    expect(new Set(particles.map((p) => p.id)).size).toBe(10);
    expect([outside, inside]).toEqual([7, 3]);
    // The guarded stem supplies volume. Equal volumes alone are insufficient.
    expect((8 * 1 - 1) / 1).toBe(outside);
    expect((2 * 1 + 1) / 1).toBe(inside);
    expect([(8 * 2 - 1) / 2, (2 * 2 + 1) / 2]).toEqual([7.5, 2.5]);
    expect(rows[3].guidance.steps[0]).toContain("Δc = 1 mol/1 L = 1 mol/L");
    expect(rows[5].guidance.knowledge.join(" ")).not.toContain(
      "zarın çeperden uzaklaşması",
    );
    expect(rows[6].guidance.optionReasons[1]).toContain("4 = 3 − 1 + 2");
    expect(chosen("f093-membrane-4").replace(/\s+/g, "")).toBe(
      `${outside}ve${inside}`,
    );
    const sameTotal = q("f093-membrane-4").options.filter(
      (s) =>
        s
          .match(/\d+/g)!
          .map(Number)
          .reduce((a, b) => a + b) === 10,
    );
    expect(sameTotal).toHaveLength(2); // Conservation alone does not determine direction.
    const osmoticInward = 3 - 1,
      opposingOutward = 2;
    expect(osmoticInward - opposingOutward).toBe(0);
    expect(chosen("f093-membrane-7")).toContain("0; bu koşulda net");
    expect([1, 5].map((dialysate) => 6 - dialysate)).toEqual([5, 1]);
    expect(chosen("f093-membrane-9")).toContain("5’ten 1’e");
    expect(chosen("f093-membrane-1")).toBe("Dıştan içe basit difüzyon");
    expect(chosen("f093-membrane-2")).toBe(
      "Kolaylaştırılmış difüzyonla uyumludur",
    );
    expect(chosen("f093-membrane-3")).toContain("gradyanına karşı");
    expect(chosen("f093-membrane-5")).toBe("Su içeri; şişme ve lizis riski");
    expect(chosen("f093-membrane-6")).toContain("zar çeperden uzaklaşır");
    expect(chosen("f093-membrane-8")).toBe("Fagositoz ve ekzositoz");
    expect(chosen("f093-membrane-10")).toContain(
      "ilk net geçişi dıştan içe olabilir",
    );
  });

  it("iç içe taksonlarda üst ortaklığı ve alt basamak karşı örneğini kurar", () => {
    const tree = [
      { species: "s1", genus: "g1", family: "f1", order: "o1", class: "c1" },
      { species: "s2", genus: "g1", family: "f1", order: "o1", class: "c1" },
      { species: "s3", genus: "g2", family: "f1", order: "o1", class: "c1" },
      { species: "s4", genus: "g3", family: "f2", order: "o1", class: "c1" },
    ];
    for (const a of tree)
      for (const b of tree) {
        if (a.genus === b.genus) expect(a.family).toBe(b.family);
        if (a.order === b.order) expect(a.class).toBe(b.class);
      }
    expect(tree[0].order).toBe(tree[3].order);
    expect(tree[0].family).not.toBe(tree[3].family);
    expect(tree[0].genus).toBe(tree[1].genus);
    expect(tree[0].species).not.toBe(tree[1].species);
    expect(chosen("f093-classification-1")).toBe("Cinsin bağlı olduğu familya");
    expect(chosen("f093-classification-10")).toBe(
      "Aynı sınıfta ve takımın diğer üst taksonlarındadırlar",
    );
    expect(chosen("f093-classification-4")).toBe(
      "Kapsanan çeşitlilik azalır, ortak özellik genellikle artar",
    );
    const names = [
      "Panthera leo",
      "Panthera tigris",
      "Passer domesticus",
      "Acheta domesticus",
    ].map((s) => s.split(" "));
    expect(names[0][0]).toBe(names[1][0]);
    expect(names[0][1]).not.toBe(names[1][1]);
    expect(names[2][1]).toBe(names[3][1]);
    expect(names[2][0]).not.toBe(names[3][0]);
    expect(chosen("f093-classification-2")).toBe(
      "Aynı cins, farklı tür adlarıdır",
    );
    expect(chosen("f093-classification-3")).toContain(
      "farklı cinslerde tekrarlanabilir",
    );
  });

  it("altı bazın farklı konumlarını, özellik düzeyini ve yetersiz veriyi sınar", () => {
    const sequences = { K: "GGCCGA", G: "GGCCGG", M: "GGCCTT" };
    const mismatch = (a: string, b: string) =>
      [...a].flatMap((base, i) => (base === b[i] ? [] : [i + 1]));
    expect(mismatch(sequences.K, sequences.G)).toEqual([6]);
    expect(mismatch(sequences.K, sequences.M)).toEqual([5, 6]);
    expect(mismatch(sequences.G, sequences.M)).toEqual([5, 6]);
    for (const a of Object.values(sequences))
      for (const b of Object.values(sequences)) {
        expect(mismatch(a, b)).toEqual(mismatch(b, a));
        expect(mismatch(a, a)).toEqual([]);
      }
    expect(chosen("f093-classification-8")).toContain(
      "farkı 1, K-M ve G-M farkı 2",
    );
    const originAndFunction = [
      { origin: "shared", function: "different", homology: true },
      { origin: "shared", function: "same", homology: true },
      { origin: "different", function: "same", homology: false },
    ];
    expect(
      originAndFunction.filter((r) => r.homology).map((r) => r.function),
    ).toEqual(["different", "same"]);
    expect(chosen("f093-classification-5")).toContain(
      "Analog işlevsel yapılar",
    );
    expect(chosen("f093-classification-6")).toContain(
      "Görevler farklı olsa da",
    );
    const fiveCharacters = Array<string>(5).fill("eukaryote");
    const allPairs = fiveCharacters.flatMap((x, i) =>
      fiveCharacters.slice(i + 1).map((y) => Number(x !== y)),
    );
    expect(allPairs).toHaveLength(10);
    expect(new Set(allPairs)).toEqual(new Set([0]));
    expect(chosen("f093-classification-7")).toContain(
      "iç akrabalık sırası tek başına çözülmez",
    );
    const prokaryotePlacements = ["Bacteria", "Archaea"].flatMap((x) =>
      ["Bacteria", "Archaea"].map((y) => [x, y]),
    );
    expect(prokaryotePlacements.some(([x, y]) => x === y)).toBe(true);
    expect(prokaryotePlacements.some(([x, y]) => x !== y)).toBe(true);
    expect(chosen("f093-classification-9")).toBe(
      "Prokaryotluk tek başına Bacteria ile Archaea ayrımını çözmez",
    );
  });
});
