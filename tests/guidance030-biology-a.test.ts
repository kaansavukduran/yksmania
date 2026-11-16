import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { Children, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance030BiologyA.json";
import { lessons } from "../src/domain/content";
import { clarifiedQuestionView } from "../src/domain/questionPresentation";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";

// Only the not-yet-registered030 catalogue is staged here. The production
// resolver, presentation, identity guard and QuestionHelp are the real modules.
// This is author staging evidence, not global/browser/offline acceptance.
vi.mock("../src/learning/questionHelpCatalogue.json", async () => ({
  default: (await import("../src/learning/guidance030BiologyA.json")).default,
}));
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";

const ids = [
  "virusler",
  "bakteri-ve-arke",
  "protista",
  "bitkiler",
  "mantarlar",
];
const groups = ids.map(
  (id) => lessons.find((lesson) => lesson.id === id)!.questions,
);
const originals = groups.flat();
const raw: HelpQuestion[] = originals.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((option) => option.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
}));
const visible = raw.map(clarifiedQuestionView);
const canonical = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(canonical)
    : value && typeof value === "object"
      ? Object.fromEntries(
          Object.keys(value)
            .sort()
            .map((key) => [
              key,
              canonical((value as Record<string, unknown>)[key]),
            ]),
        )
      : value;
const hash = (value: unknown) =>
  createHash("sha256")
    .update(JSON.stringify(canonical(value)))
    .digest("hex");
// Mathematical signs are significant. Do not erase + / − or arrows.
const fold = (text: string) =>
  text
    .normalize("NFKC")
    .toLocaleLowerCase("tr-TR")
    .replace(/\s+/gu, " ")
    .trim()
    .replace(/[.!?;:,]+$/u, "");
const plain = (text: string) =>
  text
    .replace(/<[^>]*>/g, "")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
const button = (tree: ReactNode): Record<string, unknown> | undefined => {
  let found: Record<string, unknown> | undefined;
  Children.forEach(tree, (node) => {
    if (found || !isValidElement<Record<string, unknown>>(node)) return;
    found =
      node.type === "button"
        ? node.props
        : button(node.props.children as ReactNode);
  });
  return found;
};
const card = (id: string) => visible.find((q) => q.id === id)!;
const selected = (id: string) => {
  const q = card(id);
  return q.options[q.answer];
};
const permutations = <T>(values: T[]): T[][] =>
  values.length
    ? values.flatMap((value, i) =>
        permutations(values.filter((_, j) => j !== i)).map((rest) => [
          value,
          ...rest,
        ]),
      )
    : [[]];

describe("030 beş eski biyoloji dersinin 50 özgül kademeli yardımı", () => {
  it("tam ham50 payloadı, eski kaynak/rehber dosyasını, sıra/key/beş şıkkı korur", () => {
    expect(groups.map((group) => group.length)).toEqual([10, 10, 10, 10, 10]);
    expect(hash(originals)).toBe(
      "2aee6dd2add7949fe105f2160ea80a6033cfb9a082c0b752df14a20ca7d691e7",
    );
    expect(
      createHash("sha256")
        .update(
          readFileSync(
            new URL("../src/learning/forge011BiologyA.ts", import.meta.url),
          ),
        )
        .digest("hex"),
    ).toBe("be557bdbe11100df7d89fb46ab7a141583ecd6cc1315332f6ad7f2060591fef0");
    expect(groups.map((group) => group.map((q) => q.answer))).toEqual(
      Array.from({ length: 5 }, () => [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]),
    );
    expect(
      visible
        .filter((q, i) => questionIdentity(q) !== questionIdentity(raw[i]))
        .map((q) => q.id),
    ).toEqual(["f011-viruses-3", "f011-plants-1", "f011-plants-4"]);
    expect(card("f011-viruses-3").prompt).toBe(
      "Seçilmiş virüs deneyinde yeni genom kopyaları oluşuyor. Başlangıçta kullanılabilir kapsid proteini veya hazır kapsid stoku bulunmuyor. Viral kapsid proteinlerinin üretimi tamamen durduruluyor; dışarıdan da kapsid proteini veya hazır kapsid sağlanmıyor. Hangi sonuç beklenir?",
    );
    expect(card("f011-plants-1").prompt).toBe(
      "Dört öğretici bitki adayı kara yosunu, eğrelti, çam ve elmadır. Bilgiler, bireylerin o andaki görünümünü değil grupların yaşam döngüsü özelliklerini anlatır. X’in grubunda iletim dokusu vardır ve tohum oluşmaz. Hangisi iki kanıtı birlikte sağlar?",
    );
    expect(card("f011-plants-4").prompt).toBe(
      "Kara yosunu, eğrelti, çam ve elma grupları için yalnız ‘yaşam döngüsünde meyve oluşturmaz’ bilgisi verilmiş. Bu, bir bireyin o andaki meyvesiz görünümü değil grubun üreme özelliğidir. Başka bilgi yoksa hangi sonuç doğrudur?",
    );
    expect(rows.map((row) => row.id)).toEqual(visible.map((q) => q.id));
    expect(new Set(rows.map((row) => row.id)).size).toBe(50);
    for (const [i, row] of rows.entries()) {
      expect(Object.keys(row).sort()).toEqual(["guidance", "id", "identity"]);
      expect(row.identity).toBe(questionIdentity(visible[i]));
      expect(visible[i].options).toHaveLength(5);
      for (const field of ["options", "answer", "hint", "explanation"] as const)
        expect(visible[i][field]).toEqual(raw[i][field]);
    }
  });

  it("100 pozitif bilgi, 50 ayrı yöntem, 150 ilerleyen adım ve 250 özgül nedeni ayırır", () => {
    expect(rows.reduce((n, row) => n + row.guidance.knowledge.length, 0)).toBe(
      100,
    );
    expect(rows.reduce((n, row) => n + row.guidance.steps.length, 0)).toBe(150);
    expect(
      rows.reduce((n, row) => n + row.guidance.optionReasons.length, 0),
    ).toBe(250);
    expect(new Set(rows.map((row) => fold(row.guidance.strategy))).size).toBe(
      50,
    );
    expect(fold("3 + 1")).not.toBe(fold("3 − 1"));
    for (const [i, row] of rows.entries()) {
      const g = questionGuidanceSchema.parse(row.guidance),
        q = visible[i];
      expect(g.knowledge).toHaveLength(2);
      expect(g.steps).toHaveLength(3);
      expect(
        new Set([...g.knowledge, g.strategy, ...g.steps].map(fold)).size,
      ).toBe(6);
      expect(new Set(g.optionReasons.map(fold)).size).toBe(5);
      expect([...g.knowledge, g.strategy, ...g.steps].map(fold)).not.toContain(
        fold(q.hint!),
      );
      expect(g.steps.map(fold)).not.toContain(fold(q.explanation));
      expect(g.strategy).not.toMatch(/(?:doğru|yanıt|cevap)\s*[:=]\s*[A-E]/iu);
      if (q.options[q.answer].length > 15)
        expect(g.strategy).not.toContain(q.options[q.answer]);
      expect(g.strategy).not.toBe(g.steps[0]);
      for (const [j, reason] of g.optionReasons.entries()) {
        expect(reason.length, `${row.id}/${j}`).toBeGreaterThan(45);
        expect(reason.startsWith("Doğru."), `${row.id}/${j}`).toBe(
          j === q.answer,
        );
      }
      expect(g.commonError.length).toBeGreaterThan(45);
      expect(g.check.length).toBeGreaterThan(45);
    }
  });

  it("gerçek resolver fixture’da 50 kabul, 300 değişmiş kimlik reddi ve inline önceliği uygular", () => {
    for (const [i, q] of visible.entries()) {
      expect(resolvedGuidance(q)).toEqual(rows[i].guidance);
      for (const changed of [
        { ...q, id: q.id + "-changed" },
        { ...q, prompt: q.prompt + " Başka koşul." },
        { ...q, passage: "Farklı pasaj" },
        { ...q, options: [q.options[1], q.options[0], ...q.options.slice(2)] },
        { ...q, answer: (q.answer + 1) % 5 },
        { ...q, explanation: q.explanation + " Başka yorum." },
      ]) {
        expect(questionIdentity(changed)).not.toBe(rows[i].identity);
        expect(resolvedGuidance(changed)).toBeUndefined();
      }
      expect(questionIdentity({ ...q, hint: "Farklı ipucu" })).toBe(
        rows[i].identity,
      );
      const inline = {
        ...rows[i].guidance,
        strategy: "Bu kayıt kendi özgün yöntemini korur.",
      };
      expect(resolvedGuidance({ ...q, guidance: inline })).toEqual(inline);
      const broken = {
        ...q,
        guidance: { ...inline, optionReasons: inline.optionReasons.slice(1) },
      };
      expect(resolvedGuidance(broken)).toBeUndefined();
      expect(helpPanels(broken)).toEqual([
        { title: "İlk ipucu", paragraphs: [q.hint] },
      ]);
    }
  });

  it("350 gerçek QuestionHelp SSR ve 300 Next callback ile kademeleri açar, render yazımı yapmaz", () => {
    const errors = vi.spyOn(console, "error");
    const warnings = vi.spyOn(console, "warn");
    const before = JSON.stringify(visible);
    try {
      for (const [i, q] of visible.entries()) {
        const g = rows[i].guidance;
        expect(helpPanels(q).map((p) => p.title)).toEqual([
          "Bilmen gerekenler",
          "Çözüm yolu",
          "1. adım",
          "2. adım",
          "3. adım",
        ]);
        expect(helpPanels(q)[0].paragraphs).toEqual([q.hint, ...g.knowledge]);
        for (let level = 0; level <= 6; level++) {
          let calls = 0,
            next = -1;
          const tree = QuestionHelp({
            question: q,
            level,
            onLevel: (n) => {
              calls++;
              next = n;
            },
          });
          const html = renderToStaticMarkup(tree),
            text = plain(html);
          expect(calls).toBe(0);
          for (const knowledge of g.knowledge)
            expect(text.includes(knowledge)).toBe(level >= 1);
          expect(text.includes(g.strategy)).toBe(level >= 2);
          for (const [j, step] of g.steps.entries())
            expect(text.includes(step)).toBe(level >= j + 3);
          expect(text.includes("Doğru yanıt:")).toBe(level === 6);
          expect(html.includes('aria-label="Tam çözüm"')).toBe(level === 6);
          if (level === 6) {
            expect(text).toContain(
              "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
            );
            expect(text).toContain(q.options[q.answer]);
            expect(text).toContain(q.explanation);
            for (const reason of g.optionReasons)
              expect(text).toContain(reason);
            expect(text).toContain(g.commonError);
            expect(text).toContain(g.check);
            expect(button(tree)).toBeUndefined();
          } else {
            for (const reason of g.optionReasons)
              expect(text).not.toContain(reason);
            const nextButton = button(tree)!;
            expect(nextButton.disabled).toBe(false);
            (nextButton.onClick as () => void)();
            expect(calls).toBe(1);
            expect(next).toBe(level + 1);
          }
        }
      }
      expect(JSON.stringify(visible)).toBe(before);
      expect(errors).not.toHaveBeenCalled();
      expect(warnings).not.toHaveBeenCalled();
    } finally {
      errors.mockRestore();
      warnings.mockRestore();
    }
  });

  it("200 raw/view SSR ve 100 ek uyarı SSR'de üç görünümü normalize eder, girişleri korur", () => {
    const before = JSON.stringify(raw);
    let calls = 0;
    for (const [i, q] of raw.entries()) {
      for (const level of [1, 6]) {
        const props = { level, onLevel: () => calls++ };
        const oldHTML = renderToStaticMarkup(
          QuestionHelp({ question: q, ...props }),
        );
        const shownHTML = renderToStaticMarkup(
          QuestionHelp({ question: visible[i], ...props }),
        );
        expect(oldHTML).toBe(shownHTML);
      }
      for (const reviewed of [false, true]) {
        const text = plain(
          renderToStaticMarkup(
            QuestionHelp({
              question: visible[i],
              level: 1,
              reviewed,
              onLevel: () => calls++,
            }),
          ),
        );
        expect(text.includes("bu soru bağımsız doğru olarak sayılmaz")).toBe(
          !reviewed,
        );
      }
    }
    expect(calls).toBe(0);
    expect(JSON.stringify(raw)).toBe(before);
  });

  it("viral stok karşı örneğini, net sayıyı ve 120 olası basamak sırasını bağımsız sınar", () => {
    // Construct virions by consuming concrete component tokens, not the Lab API.
    const assemble = (genomes: number, capsids: number) => {
      const g = Array.from({ length: genomes }, (_, i) => `g${i}`);
      const c = Array.from({ length: capsids }, (_, i) => `c${i}`);
      const complete: string[][] = [];
      while (g.length && c.length) complete.push([g.pop()!, c.pop()!]);
      return complete;
    };
    for (let genomes = 1; genomes <= 8; genomes++) {
      expect(assemble(genomes, 0)).toHaveLength(0);
      for (let stock = 1; stock <= 8; stock++) {
        const built = assemble(genomes, stock);
        expect(built.length).toBeGreaterThan(0); // Old wording did not exclude this stock.
        expect(built.length).toBeLessThanOrEqual(genomes);
        expect(built.length).toBeLessThanOrEqual(stock);
        expect(new Set(built.flat()).size).toBe(2 * built.length);
      }
    }
    expect(card("f011-viruses-3").prompt).toContain(
      "Başlangıçta kullanılabilir kapsid proteini veya hazır kapsid stoku bulunmuyor",
    );
    expect(selected("f011-viruses-3")).toBe(
      "Tam yeni virionların birleşmesi engellenir",
    );
    expect([650, 50, 50].map((n) => n - 50)).toEqual([600, 0, 0]);
    const phases = [
      "Bağlanma",
      "genomun ulaşması",
      "sentez",
      "birleşme",
      "çıkış",
    ];
    const legal = permutations(phases).filter((order) =>
      phases
        .slice(1)
        .every((p, i) => order.indexOf(phases[i]) < order.indexOf(p)),
    );
    expect(permutations(phases)).toHaveLength(120);
    expect(legal).toEqual([phases]);
    expect(selected("f011-viruses-6").split(" → ")).toEqual(phases);
    expect(
      card("f011-viruses-6").options.filter((option) =>
        legal.some((order) => order.join(" → ") === option),
      ),
    ).toHaveLength(1);
    expect(selected("f011-viruses-2")).toBe(
      "Bağlanma tek başına başarılı üretim için yeterli değildir",
    );
    expect(selected("f011-viruses-8")).toBe(
      "Her mutasyon virüsü mutlaka yeni bir konak türüne geçirir",
    );
  });

  it("hücre soylarını çift saymaz, plazmit aktarımını ve endosporu çoğalmadan ayırır", () => {
    const split = (cells: string[]) =>
      cells.flatMap((id) => [id + "a", id + "b"]);
    const first = ["a", "b", "c", "d"];
    expect(split(first)).toHaveLength(8);
    expect(new Set(split(first)).size).toBe(8);
    expect(Number(selected("f011-prokaryotes-3"))).toBe(split(first).length);
    let population = ["a", "b", "c", "d", "e"];
    const history = [population.length];
    for (const minute of [40, 80]) {
      expect(minute % 40).toBe(0);
      population = split(population);
      history.push(population.length);
    }
    expect(history).toEqual([5, 10, 20]);
    expect(Number(selected("f011-prokaryotes-9"))).toBe(population.length);
    const two = [
      { id: "donor", plasmid: true },
      { id: "recipient", plasmid: false },
    ];
    two[1].plasmid = two[0].plasmid;
    expect(two.map((c) => c.id)).toEqual(["donor", "recipient"]);
    expect(two.map((c) => c.plasmid)).toEqual([true, true]);
    const lineage = [
      { id: "a", state: "active" },
      { id: "a", state: "endospore" },
      { id: "a", state: "active" },
    ];
    expect(new Set(lineage.map((c) => c.id)).size).toBe(1);
    expect(selected("f011-prokaryotes-4")).toContain(
      "Hücre sayısı iki kalabilir",
    );
    expect(selected("f011-prokaryotes-5")).toContain(
      "birey sayısı artmamıştır",
    );
    const candidates = [
      { group: "wallless bacterium", PG: false },
      { group: "archaea", PG: false },
    ];
    expect(candidates.filter((c) => !c.PG)).toHaveLength(2);
    expect(selected("f011-prokaryotes-2")).toContain("tek başına kesinleşmez");
    expect(selected("f011-prokaryotes-8")).toBe("Kemoototrofluk");
    expect(selected("f011-prokaryotes-10")).toBe("Ribozom");
  });

  it("protist ortaklığını, net suyu ve tek örnekten tüm gruba sıçramayı karşı örnekle sınar", () => {
    const examples = [
      {
        name: "amoeba",
        euk: true,
        multi: false,
        photo: false,
        flagella: false,
      },
      {
        name: "paramecium",
        euk: true,
        multi: false,
        photo: false,
        flagella: false,
      },
      {
        name: "selected euglena",
        euk: true,
        multi: false,
        photo: true,
        flagella: true,
      },
      {
        name: "multicellular alga",
        euk: true,
        multi: true,
        photo: true,
        flagella: false,
      },
    ];
    expect(examples.every((e) => e.euk)).toBe(true);
    expect(examples.every((e) => !e.multi)).toBe(false);
    expect(examples.every((e) => e.photo)).toBe(false);
    expect(examples.every((e) => e.flagella)).toBe(false);
    expect(selected("f011-protists-1")).toBe("Ökaryot hücre düzeni");
    const movements = { fresh: { in: 8, out: 2 }, isotonic: { in: 5, out: 5 } };
    expect(movements.fresh.in - movements.fresh.out).toBeGreaterThan(
      movements.isotonic.in - movements.isotonic.out,
    );
    expect(movements.isotonic.in + movements.isotonic.out).toBeGreaterThan(0);
    expect(selected("f011-protists-8")).toBe(
      "Sürekli net su girişinin yükü azalabilir",
    );
    const habitats = [
      { kind: "bacterium", water: true, single: true },
      { kind: "protist", water: true, single: true },
    ];
    expect(habitats.filter((h) => h.water && h.single)).toHaveLength(2);
    expect(selected("f011-protists-6")).toContain(
      "X’in Protista olduğu kesin değildir",
    );
    expect(selected("f011-protists-9")).toContain(
      "tek başına damarlı kara bitkisi olduğunu kanıtlar",
    );
    expect(selected("f011-protists-10")).toBe(
      "Bütün protistler parazittir ve aynı hastalığı yapar",
    );
  });

  it("bitki yaşam döngüsü kanıtını anlık görünümden ayırır, tohumluda da spor bilgisini korur", () => {
    const plants = [
      {
        name: "Kara yosunu",
        vascular: false,
        seed: false,
        fruit: false,
        spores: true,
      },
      {
        name: "Eğrelti",
        vascular: true,
        seed: false,
        fruit: false,
        spores: true,
      },
      { name: "Çam", vascular: true, seed: true, fruit: false, spores: true },
      { name: "Elma", vascular: true, seed: true, fruit: true, spores: true },
    ];
    for (const order of permutations(plants)) {
      expect(
        order.filter((p) => p.vascular && !p.seed).map((p) => p.name),
      ).toEqual(["Eğrelti"]);
      expect(
        order
          .filter((p) => !p.fruit)
          .map((p) => p.name)
          .sort(),
      ).toEqual(["Kara yosunu", "Eğrelti", "Çam"].sort());
    }
    expect(selected("f011-plants-1")).toBe("Eğrelti");
    expect(selected("f011-plants-4")).toContain("İlk üç aday kalır");
    const immatureApple = { ...plants[3], fruitVisibleNow: false };
    expect(immatureApple.fruit).toBe(true);
    expect(immatureApple.fruitVisibleNow).toBe(false);
    const fern = plants[1],
      moss = plants[0],
      pine = plants[2],
      apple = plants[3];
    expect(moss.spores && fern.spores && moss.vascular !== fern.vascular).toBe(
      true,
    );
    expect(pine.spores && apple.spores).toBe(true);
    expect(pine.vascular !== apple.vascular).toBe(false);
    expect(selected("f011-plants-7")).toBe("Kara yosunu ile eğrelti");
    expect(
      rows.find((r) => r.id === "f011-plants-7")!.guidance.optionReasons[0],
    ).toContain("İkisi de iletim dokusu taşıdığı için");
    expect(selected("f011-plants-3")).toBe("P–meyve, Q–tohum");
    expect(selected("f011-plants-9")).toBe("Tek çenekli");
    expect(selected("f011-plants-10")).toBe("Fotosentezde kullanılan CO₂");
  });

  it("fungal monomer kimliklerini ve hidroliz–alım ayrımını korur, ortaklıkta tarafları karıştırmaz", () => {
    const chains = [
      ["a1", "a2", "a3"],
      ["b1", "b2", "b3"],
    ];
    const units = chains.flat();
    for (let mask = 0; mask < 64; mask++) {
      const inside = units.filter((_, i) => (mask & (1 << i)) !== 0);
      const outside = units.filter((_, i) => (mask & (1 << i)) === 0);
      expect(new Set([...inside, ...outside]).size).toBe(6);
      expect(inside.length + outside.length).toBe(6);
      expect(inside.some((u) => outside.includes(u))).toBe(false);
      if (inside.length === 4)
        expect(outside.length).toBe(Number(selected("f011-fungi-3")));
    }
    const paths = [
      { source: "starch", requiresHydrolysis: true },
      { source: "small sugar", requiresHydrolysis: false },
    ];
    const enzymeWorks = false,
      uptakeWorks = true;
    expect(
      paths
        .filter((p) => uptakeWorks && (!p.requiresHydrolysis || enzymeWorks))
        .map((p) => p.source),
    ).toEqual(["small sugar"]);
    expect(selected("f011-fungi-7")).toBe("Küçük şekerli ortam");
    expect(selected("f011-fungi-5")).toBe("Mikoriza");
    const partners = [
      { name: "fungus", photo: false },
      { name: "alga", photo: true },
    ];
    expect(partners.some((p) => p.photo)).toBe(true);
    expect(partners.find((p) => p.name === "fungus")!.photo).toBe(false);
    expect(selected("f011-fungi-6")).toContain(
      "mantar hücresinin kloroplastlı olduğunu kanıtlamaz",
    );
    expect(selected("f011-fungi-9")).toBe("Saprotrof–parazit");
    const food = [
      { group: "bacterium", ferments: true },
      { group: "fungus", ferments: true },
    ];
    expect(
      food.filter((c) => c.ferments).every((c) => c.group === "fungus"),
    ).toBe(false);
    expect(selected("f011-fungi-10")).toBe(
      "Fermantasyon yapan her canlı zorunlu mantardır",
    );
  });
});
