import { createHash } from "node:crypto";
import { Children, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance028Biology.json";
import { lessons } from "../src/domain/content";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";

// Only this test substitutes the unregistered028 catalogue. The production
// resolver/renderer execute unchanged; this is not runtime registration proof.
vi.mock("../src/learning/questionHelpCatalogue.json", async () => ({
  default: (await import("../src/learning/guidance028Biology.json")).default,
}));
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";

const ids = [
  "atp-metabolizma",
  "hucre-organelleri",
  "dna-eslenmesi",
  "nukleik-asitler",
];
const originals = ids.map(
  (id) => lessons.find((lesson) => lesson.id === id)!.questions,
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
const byId = (id: string) => flat.find((q) => q.id === id)!;
const answer = (id: string) => {
  const q = byId(id);
  return q.options[q.answer];
};

describe("028 dört eski biyoloji dersinde 25 özgül yardım", () => {
  it("25 tam eski payloadın SHA'sını ve gerçek3/5şık kimliğini korur", () => {
    expect(originals.map((q) => q.length)).toEqual([5, 5, 5, 10]);
    expect(digest(original)).toBe(
      "b57fce36a310da7e6356fa732f287ca629f055633c91146b38ac62efeca6c9fe",
    );
    expect(original.map((q) => q.options.length)).toEqual([
      ...Array<number>(15).fill(3),
      ...Array<number>(10).fill(5),
    ]);
    expect(rows.map((row) => row.id)).toEqual(flat.map((q) => q.id));
    expect(new Set(rows.map((row) => row.id)).size).toBe(25);
    for (const [i, row] of rows.entries()) {
      expect(Object.keys(row).sort()).toEqual(["guidance", "id", "identity"]);
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

  it("bilgi, yöntem,75artanadım ve95gerçekşık nedenini ayrı bağlar", () => {
    expect(rows.reduce((n, row) => n + row.guidance.steps.length, 0)).toBe(75);
    expect(
      rows.reduce((n, row) => n + row.guidance.optionReasons.length, 0),
    ).toBe(95);
    expect(new Set(rows.map((row) => fold(row.guidance.strategy))).size).toBe(
      25,
    );
    for (const [i, row] of rows.entries()) {
      const g = questionGuidanceSchema.parse(row.guidance),
        q = flat[i];
      expect(g.steps).toHaveLength(3);
      expect(new Set(g.steps.map(fold)).size).toBe(3);
      expect(g.optionReasons).toHaveLength(q.options.length);
      expect(new Set(g.optionReasons.map(fold)).size).toBe(q.options.length);
      expect(g.steps.map(fold)).not.toContain(fold(g.strategy));
      for (const p of g.knowledge) {
        expect(fold(p)).not.toBe(fold(g.strategy));
        expect(g.steps.map(fold)).not.toContain(fold(p));
      }
      expect([...g.knowledge, g.strategy, ...g.steps].map(fold)).not.toContain(
        fold(q.hint!),
      );
      expect(g.steps.map(fold)).not.toContain(fold(q.explanation));
      expect(g.strategy).not.toMatch(/(?:doğru|yanıt|cevap)\s*[:=]\s*[A-E]/i);
      for (const [j, reason] of g.optionReasons.entries()) {
        expect(reason.length, row.id + "/" + j).toBeGreaterThan(45);
        expect(reason.startsWith("Doğru."), row.id + "/" + j).toBe(
          j === q.answer,
        );
      }
      expect(g.commonError.length).toBeGreaterThan(45);
      expect(g.check.length).toBeGreaterThan(45);
    }
  });

  it("gerçek resolver test kataloğunda25kabul ve150değişmişkimlik reddi uygular", () => {
    for (const [i, q] of flat.entries()) {
      expect(resolvedGuidance(q)).toEqual(rows[i].guidance);
      for (const changed of [
        { ...q, id: q.id + "-changed" },
        { ...q, prompt: q.prompt + " başka koşul" },
        { ...q, passage: "Başka bir pasaj" },
        { ...q, options: [q.options[1], q.options[0], ...q.options.slice(2)] },
        { ...q, answer: (q.answer + 1) % q.options.length },
        { ...q, explanation: q.explanation + " başka açıklama" },
      ]) {
        expect(questionIdentity(changed)).not.toBe(rows[i].identity);
        expect(resolvedGuidance(changed)).toBeUndefined();
      }
      // Identity deliberately omits hint; the immutable full-payload SHA covers it.
      expect(questionIdentity({ ...q, hint: "Başka ipucu" })).toBe(
        rows[i].identity,
      );
    }
  });

  it("175gerçek QuestionHelp SSR ve150nativeNextcallback ile aşamaları açar", () => {
    for (const [i, q] of flat.entries()) {
      const g = rows[i].guidance;
      const panels = helpPanels(q);
      expect(panels.map((p) => p.title)).toEqual([
        "Bilmen gerekenler",
        "Çözüm yolu",
        "1. adım",
        "2. adım",
        "3. adım",
      ]);
      expect(panels[0].paragraphs).toEqual([q.hint, ...g.knowledge]);
      for (let level = 0; level <= 6; level++) {
        let next = -1;
        const tree = QuestionHelp({
          question: q,
          level,
          onLevel: (n) => {
            next = n;
          },
        });
        const html = renderToStaticMarkup(tree),
          text = plain(html);
        for (const p of g.knowledge) expect(text.includes(p)).toBe(level >= 1);
        expect(text.includes(g.strategy)).toBe(level >= 2);
        g.steps.forEach((step, j) =>
          expect(text.includes(step), q.id + "/" + j).toBe(level >= j + 3),
        );
        expect(html.includes('aria-label="Tam çözüm"')).toBe(level === 6);
        expect(text.includes("Doğru yanıt:")).toBe(level === 6);
        if (level === 6) {
          expect(text).toContain(
            "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
          );
          expect(text).toContain(q.explanation);
          for (const reason of g.optionReasons) expect(text).toContain(reason);
          expect(text).toContain(g.commonError);
          expect(text).toContain(g.check);
          expect(findButton(tree)).toBeUndefined();
        } else {
          const button = findButton(tree)!;
          expect(button.disabled).toBe(false);
          (button.onClick as () => void)();
          expect(next).toBe(level + 1);
        }
      }
    }
  });

  it("50ekSSR'de yardım uyarısını ayırır ve yanlış gerçekşık sayısını reddeder", () => {
    for (const [i, q] of flat.entries()) {
      for (const reviewed of [false, true]) {
        const html = renderToStaticMarkup(
          QuestionHelp({ question: q, level: 1, reviewed, onLevel: () => {} }),
        );
        expect(
          plain(html).includes("bu soru bağımsız doğru olarak sayılmaz"),
        ).toBe(!reviewed);
      }
      const broken = {
        ...q,
        guidance: {
          ...rows[i].guidance,
          optionReasons: rows[i].guidance.optionReasons.slice(1),
        },
      };
      expect(resolvedGuidance(broken)).toBeUndefined();
      expect(helpPanels(broken)).toEqual([
        { title: "İlk ipucu", paragraphs: [q.hint] },
      ]);
    }
  });

  it("DNA'yı gerçekten zincirlerden çoğaltıp eski/yeni ve yeni12birim sayımını sınar", () => {
    let molecules = [["E1", "E2"]];
    let serial = 0;
    for (let round = 1; round <= 2; round++) {
      molecules = molecules.flatMap(([a, b]) => [
        [a, "Y" + ++serial],
        [b, "Y" + ++serial],
      ]);
      expect(molecules).toHaveLength(round === 1 ? 2 : 4);
      expect(molecules.flat().filter((s) => s.startsWith("E"))).toHaveLength(2);
      if (round === 1)
        expect(
          molecules.every(
            (m) => m.filter((s) => s.startsWith("E")).length === 1,
          ),
        ).toBe(true);
    }
    expect(molecules.flat().filter((s) => s.startsWith("Y"))).toHaveLength(6);
    expect(answer("dna-1")).toBe("Bir eski ve bir yeni zincir içerir.");
    expect(answer("dna-5")).toBe("2 eski + 6 yeni zincir");
    const complements: Record<string, string> = {
      A: "T",
      T: "A",
      G: "C",
      C: "G",
    };
    const sameLine = (s: string) => [...s].map((b) => complements[b]).join("");
    for (const [id, upper] of [
      ["dna-2", "ATGC"],
      ["nuc-6", "AGTC"],
    ])
      expect(answer(id)).toBe("3′–" + sameLine(upper) + "–5′");
    const oldStrands = ["AGTCCA", sameLine("AGTCCA")];
    const newlyBuilt = oldStrands.map((s) => [...sameLine(s)]);
    expect(answer("dna-4")).toBe(String(newlyBuilt.flat().length));
    expect(answer("dna-3")).toBe("5′ → 3′");
  });

  it("H bağlarını çiftlerden ve açık omurgaları komşu kenarlardan bağımsız sayar", () => {
    const pairs = [
      ...Array<string>(160).fill("AT"),
      ...Array<string>(240).fill("GC"),
    ];
    const bases = pairs.join("");
    expect(bases).toHaveLength(800);
    expect([...bases].filter((v) => v === "T")).toHaveLength(160);
    const bonds = pairs.flatMap((p) => (p === "AT" ? [1, 1] : [1, 1, 1]));
    expect(answer("nuc-4")).toBe(String(bonds.length));
    expect(bonds.length).toBeGreaterThanOrEqual(2 * pairs.length);
    expect(bonds.length).toBeLessThanOrEqual(3 * pairs.length);
    const edges: string[] = [];
    for (const strand of ["u", "l"])
      for (let current = 1; current < 100; current++)
        edges.push(`${strand}:${current - 1}-${current}`);
    expect(new Set(edges).size).toBe(198);
    expect(edges).not.toContain("u:99-0");
    expect(edges).not.toContain("l:99-0");
    expect(answer("nuc-8")).toBe(String(edges.length));
  });

  it("tekRNA'nın16471dağılımını ve8standartbirimin malzeme envanterini denetler", () => {
    const possibleU = new Set<number>();
    let distributions = 0;
    for (let u = 0; u <= 180; u++)
      for (let g = 0; g <= 180 - u; g++) {
        const c = 180 - u - g;
        expect(120 + u + g + c).toBe(300);
        possibleU.add(u);
        distributions++;
      }
    expect(distributions).toBe(16471);
    expect(possibleU.size).toBe(181);
    expect(possibleU.has(120)).toBe(true);
    expect(possibleU.has(80)).toBe(true);
    expect(answer("nuc-5")).toBe("U sayısı tek bir değerle belirlenemez.");
    const set = [
      ...["A", "T", "G", "C"].map((base) => ({ base, sugar: "deoksiriboz" })),
      ...["A", "U", "G", "C"].map((base) => ({ base, sugar: "riboz" })),
    ];
    expect(set.filter((v) => v.sugar === "riboz")).toHaveLength(4);
    expect(set.filter((v) => v.sugar === "deoksiriboz")).toHaveLength(4);
    for (const base of ["A", "G", "C"])
      expect(set.filter((v) => v.base === base)).toHaveLength(2);
    for (const base of ["T", "U"])
      expect(set.filter((v) => v.base === base)).toHaveLength(1);
    expect(answer("nuc-10")).toBe(
      "4 riboz, 4 deoksiriboz; A/G/C ikişer, T/U birer",
    );
  });
});
