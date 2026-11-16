import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { Children, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance030BiologyB.json";
import { lessonById } from "../src/domain/content";
import { forge011BiologyBGuides } from "../src/learning/forge011BiologyB";
import { clarifiedQuestionView } from "../src/domain/questionPresentation";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";

// Only catalogue input is staged. Resolver, presentation, panels and renderer
// are the production implementations; this is not global registration proof.
vi.mock("../src/learning/questionHelpCatalogue.json", async (original) => {
  const actual = await original<{ default: unknown[] }>();
  const authored = await import("../src/learning/guidance030BiologyB.json");
  return {
    default: [
      ...actual.default,
      ...authored.default.map((row) => ({ ...row, legacyPanelCount: 1 })),
    ],
  };
});
import {
  helpPanels,
  previousHelpPanelCount,
  resolvedGuidance,
} from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";

const lessonIds = [
  "omurgasizlar",
  "omurgalilar",
  "mitoz",
  "eseysiz-ureme",
  "mayoz",
];
const groups = lessonIds.map((id) => lessonById(id)!.questions);
const originals = groups.flat();
const rawFlat: HelpQuestion[] = originals.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((option) => option.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
}));
const flat = rawFlat.map(clarifiedQuestionView);
const canonical = (x: unknown): unknown =>
  Array.isArray(x)
    ? x.map(canonical)
    : x && typeof x === "object"
      ? Object.fromEntries(
          Object.keys(x)
            .sort()
            .map((key) => [
              key,
              canonical((x as Record<string, unknown>)[key]),
            ]),
        )
      : x;
const sha = (x: unknown) =>
  createHash("sha256")
    .update(JSON.stringify(canonical(x)))
    .digest("hex");
// Keep scientific case, signs and operators, including A/a allele distinctions.
const fold = (s: string) => s.normalize("NFC").replace(/\s+/gu, " ").trim();
const plain = (s: string) =>
  s
    .replace(/<!--.*?-->/g, "")
    .replace(/<[^>]*>/g, "")
    .replaceAll("&amp;", "&")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
function nativeButton(tree: ReactNode): Record<string, unknown> | undefined {
  let found: Record<string, unknown> | undefined;
  Children.forEach(tree, (child) => {
    if (!isValidElement<Record<string, unknown>>(child) || found) return;
    found =
      child.type === "button"
        ? child.props
        : nativeButton(child.props.children as ReactNode);
  });
  return found;
}
const card = (short: string) =>
  flat.find((q) => q.id === "f011-bio-b-" + short)!;
const chosen = (short: string) => {
  const q = card(short);
  return q.options[q.answer];
};
const reasonAnchors: string[][] = [
  ["por", "doku"],
  ["Hidra", "aynı açıklık"],
  ["Toprak solucanı", "ahtapot"],
  ["üç çift", "göğüs"],
  ["su damar", "omurgasız"],
  ["Planarya", "tenya"],
  ["manto", "ahtapot"],
  ["bağımsız", "onarım"],
  ["dört", "üç"],
  ["sünger", "kapalı"],
  ["sütle", "akciğer"],
  ["timsah", "ektoterm"],
  ["tüy", "uçuş"],
  ["ornitorenk", "yumurtla"],
  ["içeride", "dışarı"],
  ["kapalı", "böbrek"],
  ["aynı tür", "başkalaşım"],
  ["ısı", "sıralamaz"],
  ["havalandır", "akciğer"],
  ["denizyıldızı", "omurgasız"],
  ["sekiz", "on altı"],
  ["on iki", "DNA"],
  ["10 pg", "5 pg"],
  ["merkez", "sitokine"],
  ["on bir", "on hücre"],
  ["G₂", "hasar"],
  ["M denetimi", "geciktir"],
  ["takım", "n düzey"],
  ["1,5", "bölünme"],
  ["4C", "paylaş"],
  ["endospor", "artmadı"],
  ["çıkıntı", "tomurcuk"],
  ["kertenkele", "onarım"],
  ["dal çeliği", "genetik"],
  ["16", "mitoz"],
  ["12", "17"],
  ["gövde boğumu", "eşeyli"],
  ["gamet", "eksik"],
  ["mutasyon", "koşul"],
  ["üç", "yedi"],
  ["dört", "on altı"],
  ["Anafaz I", "anafaz II"],
  ["üç", "altı"],
  ["on", "beş"],
  ["homolog", "kardeş olmayan"],
  ["katılmayanlar", "dört kromatitin"],
  ["ilk kutup", "iki ürün"],
  ["2³", "8"],
  ["mayoz", "yarısı"],
  ["haploit spor", "mitoz"],
];

describe("030 eski elli biyoloji B kartına özgü yardım", () => {
  it("elli tam ham kartın bütün alanlarını ve beş mevcut rehberi korur", () => {
    expect(groups.map((group) => group.length)).toEqual([10, 10, 10, 10, 10]);
    expect(sha(originals)).toBe(
      "444542ce008b872a9f04b358eb199269a61c80e9b563237e018866d91cfdf12e",
    );
    expect(
      createHash("sha256")
        .update(
          readFileSync(
            new URL("../src/learning/forge011BiologyB.ts", import.meta.url),
          ),
        )
        .digest("hex"),
    ).toBe("cf245a25e9ed548d52828d1cab6719cbde10bf6696ab46c6a163f4ecb39ebe2a");
    expect(
      forge011BiologyBGuides.map((g) => [
        g.id,
        g.sections.length,
        g.examples.length,
        g.recall.length,
      ]),
    ).toEqual(lessonIds.map((id) => [id, 10, 4, 5]));
    expect(sha(forge011BiologyBGuides)).toBe(
      "03e15d74aba7ace627bae46aa55024467b2fd2a74fb2a6cfb30562d0b44d370d",
    );
    expect(rows.map((row) => row.id)).toEqual(flat.map((q) => q.id));
    expect(new Set(rows.map((row) => row.id)).size).toBe(50);
    for (const [i, row] of rows.entries()) {
      expect(questionIdentity(flat[i])).toBe(questionIdentity(rawFlat[i]));
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
      expect(originals[i].guidance).toBeUndefined();
      expect(flat[i].options).toHaveLength(5);
    }
  });

  it("100 bilgi, 50 yöntem, 150 ilerleyen adım ve 250 sıralı nedeni ayırır", () => {
    const leaves = rows.flatMap(({ guidance: g }) => [
      ...g.knowledge,
      g.strategy,
      ...g.steps,
      ...g.optionReasons,
      g.commonError,
      g.check,
    ]);
    expect(leaves).toHaveLength(650);
    expect(new Set(leaves.map(fold)).size).toBe(650);
    expect(fold("AB")).not.toBe(fold("ab"));
    expect(fold("3 + 1")).not.toBe(fold("3 − 1"));
    expect(reasonAnchors).toHaveLength(50);
    for (const [i, row] of rows.entries()) {
      const g = questionGuidanceSchema.parse(row.guidance),
        q = flat[i];
      expect(g.knowledge).toHaveLength(2);
      expect(g.steps).toHaveLength(3);
      expect(g.optionReasons).toHaveLength(q.options.length);
      const learning = [...g.knowledge, g.strategy, ...g.steps].map(fold);
      expect(new Set(learning).size).toBe(6);
      expect(learning).not.toContain(fold(q.hint!));
      expect(g.steps.map(fold)).not.toContain(fold(q.explanation));
      expect([...g.knowledge, g.strategy].join(" ")).not.toContain(
        q.options[q.answer],
      );
      expect(g.strategy).not.toMatch(/(?:yanıt|cevap|doğru)\s*[:=]\s*[A-E]/iu);
      for (const anchor of reasonAnchors[i])
        expect(
          g.optionReasons[q.answer].toLocaleLowerCase("tr-TR"),
          row.id + " correct-reason binding",
        ).toContain(anchor.toLocaleLowerCase("tr-TR"));
    }
    expect(rows[45].guidance.optionReasons[0]).toContain("Ab");
    expect(rows[45].guidance.optionReasons[0]).toContain("aB");
    expect(rows[46].guidance.optionReasons[1]).toContain("Ab");
    expect(rows[46].guidance.optionReasons[1]).toContain("aB");
    expect(rows[38].guidance.strategy).not.toContain("mutasyonlar oluşabilir");
  });

  it("gerçek resolver elli kabul, 300 kimlik reddi ve inline önceliğini korur", () => {
    for (const [i, q] of flat.entries()) {
      expect(resolvedGuidance(q)).toEqual(rows[i].guidance);
      expect(previousHelpPanelCount(q)).toBe(1);
      const inline = {
        ...rows[i].guidance,
        knowledge: ["Saklı anlık görüntünün kendi bilgisi."],
        strategy: "Saklı anlık görüntünün kendi yöntemi.",
      };
      expect(resolvedGuidance({ ...q, guidance: inline })).toEqual(inline);
      expect(
        previousHelpPanelCount({ ...q, guidance: inline }),
      ).toBeUndefined();
      expect(helpPanels({ ...q, guidance: inline })[1].paragraphs).toEqual([
        inline.strategy,
      ]);
      for (const changed of [
        { ...q, id: q.id + "-different" },
        { ...q, prompt: q.prompt + " Ek koşul." },
        { ...q, passage: "Başka pasaj" },
        { ...q, options: [q.options[1], q.options[0], ...q.options.slice(2)] },
        { ...q, answer: (q.answer + 1) % 5 },
        { ...q, explanation: q.explanation + " Başka sonuç." },
      ]) {
        expect(questionIdentity(changed)).not.toBe(rows[i].identity);
        expect(resolvedGuidance(changed)).toBeUndefined();
        expect(helpPanels(changed)).toEqual([
          { title: "İlk ipucu", paragraphs: [q.hint] },
        ]);
        const html = renderToStaticMarkup(
          QuestionHelp({
            question: changed,
            level: 1,
            onLevel: () => {
              throw Error("AUTO_CALLBACK");
            },
          }),
        );
        expect(html).not.toContain("Bilmen gerekenler");
        expect(plain(html)).toContain(q.hint);
      }
      for (const hint of [undefined, "Öğrencinin kendi eski ipucu"]) {
        const differentHint = { ...q, hint };
        expect(questionIdentity(differentHint)).toBe(rows[i].identity);
        expect(resolvedGuidance(differentHint)).toEqual(rows[i].guidance);
      }
    }
  });

  it("350 gerçek SSR ve 300 native callback ile beş panelden tam çözüme ilerler", () => {
    const warn = vi.spyOn(console, "error");
    const before = JSON.stringify(flat);
    try {
      for (const [i, q] of flat.entries()) {
        const g = rows[i].guidance;
        expect(helpPanels(q).map((p) => p.title)).toEqual([
          "Bilmen gerekenler",
          "Çözüm yolu",
          "1. adım",
          "2. adım",
          "3. adım",
        ]);
        for (let level = 0; level <= 6; level++) {
          const emitted: number[] = [];
          const tree = QuestionHelp({
            question: q,
            level,
            onLevel: (n) => emitted.push(n),
          });
          const html = renderToStaticMarkup(tree),
            text = plain(html);
          expect(emitted).toEqual([]);
          for (const paragraph of g.knowledge)
            expect(text.includes(paragraph)).toBe(level >= 1);
          expect(text.includes(g.strategy)).toBe(level >= 2);
          for (const [step, value] of g.steps.entries())
            expect(text.includes(value)).toBe(level >= step + 3);
          expect(html.includes('class="help-full-solution"')).toBe(level === 6);
          if (level === 6) {
            expect(text).toContain(
              "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
            );
            expect(text).toContain(q.options[q.answer]);
            expect(text).toContain(q.explanation);
            const ordered = html.match(/<ol type="A">([\s\S]*?)<\/ol>/)![1];
            const reasons = [...ordered.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(
              (m) => plain(m[1]),
            );
            expect(reasons).toEqual(g.optionReasons);
            expect(text).toContain(g.commonError);
            expect(text).toContain(g.check);
            expect(nativeButton(tree)).toBeUndefined();
          } else {
            expect(text).not.toContain(g.optionReasons[0]);
            const button = nativeButton(tree)!;
            expect(button.disabled).toBe(false);
            (button.onClick as () => void)();
            expect(emitted).toEqual([level + 1]);
          }
        }
      }
      expect(JSON.stringify(flat)).toBe(before);
      expect(warn).not.toHaveBeenCalled();
    } finally {
      warn.mockRestore();
    }
  });

  it("inline tam çözümü, bozuk neden uzunluğunu ve uyarı/disabled sınırlarını gerçek bileşende sınar", () => {
    for (const [i, q] of flat.entries()) {
      const inline = {
        ...rows[i].guidance,
        knowledge: ["Anlık görüntünün kendi bilgisi."],
        strategy: "Anlık görüntünün kendi yöntemi.",
        optionReasons: q.options.map(
          (_, j) => `Anlık görüntüye ait ${j + 1}. özgül şık açıklaması.`,
        ),
      };
      const full = plain(
        renderToStaticMarkup(
          QuestionHelp({
            question: { ...q, guidance: inline },
            level: 6,
            onLevel: () => {
              throw Error("AUTO_CALLBACK");
            },
          }),
        ),
      );
      expect(full).toContain(inline.strategy);
      for (const reason of inline.optionReasons) expect(full).toContain(reason);
      expect(full).not.toContain(rows[i].guidance.strategy);
      const malformed = {
        ...q,
        guidance: { ...inline, optionReasons: inline.optionReasons.slice(1) },
      };
      expect(resolvedGuidance(malformed)).toBeUndefined();
      const broken = renderToStaticMarkup(
        QuestionHelp({
          question: malformed,
          level: 2,
          onLevel: () => {
            throw Error("AUTO_CALLBACK");
          },
        }),
      );
      expect(broken).not.toContain("Şıkların mantığı");
      expect(plain(broken)).toContain(q.explanation);
      for (const reviewed of [false, true]) {
        const tree = QuestionHelp({
          question: q,
          level: 2,
          reviewed,
          disabled: true,
          onLevel: () => {
            throw Error("AUTO_CALLBACK");
          },
        });
        const html = renderToStaticMarkup(tree);
        expect(
          plain(html).includes("bu soru bağımsız doğru olarak sayılmaz"),
        ).toBe(!reviewed);
        expect(nativeButton(tree)!.disabled).toBe(true);
        expect(html).toContain("disabled");
      }
    }
  });

  it("hayvan karşılaştırmalarını bağımsız sonlu özellik ve karşı örnek tablolarıyla sınar", () => {
    // Deliberately limited school examples, not an application classifier or
    // a claim that this small table covers every species of an animal group.
    const circulation: Record<string, "open" | "closed" | "absent"> = {
      "toprak solucanı": "closed",
      midye: "open",
      çekirge: "open",
      ahtapot: "closed",
      sünger: "absent",
    };
    const closedPairs = card("invert-3").options.flatMap((option, index) => {
      const flows = option.split(" ve ").map((name) => {
        const flow = circulation[name.toLocaleLowerCase("tr-TR")];
        expect(
          flow,
          name + " is an explicit finite-table member",
        ).toBeDefined();
        return flow;
      });
      return flows.every((flow) => flow === "closed") ? [index] : [];
    });
    expect(closedPairs).toEqual([card("invert-3").answer]);
    const digestive = {
      planarya: "single",
      tenya: "absent",
      "toprak solucanı": "two",
    };
    expect(Object.values(digestive)).toEqual(["single", "absent", "two"]);
    expect(chosen("invert-6")).toContain("Planarya: tek açıklıklı");
    expect(chosen("invert-6")).toContain("tenya: sindirim sistemi yok");
    expect(chosen("invert-6")).toContain("toprak solucanı: ağız ve anüs ayrı");
    expect(chosen("invert-1")).toBe("Süngerler");
    const sponge = {
      pores: true,
      tissue: false,
      organ: false,
      intracellularDigestion: true,
    };
    expect(
      sponge.pores &&
        !sponge.tissue &&
        !sponge.organ &&
        sponge.intracellularDigestion,
    ).toBe(true);
    expect(chosen("invert-2")).toContain(
      "aynı açıklık giriş ve çıkışa hizmet eder",
    );
    expect(chosen("invert-4")).toBe("Göğüste üç çift bacak");
    const limbs = {
      örümcek: { legs: 8, antennae: 0 },
      çekirge: { legs: 6, antennae: 2 },
    };
    expect([
      limbs.örümcek.legs / 2,
      limbs.örümcek.antennae,
      limbs.çekirge.legs / 2,
      limbs.çekirge.antennae / 2,
    ]).toEqual([4, 0, 3, 1]);
    expect(chosen("invert-9")).toContain("Örümcekte dört çift");
    expect(chosen("invert-9")).toContain("çekirgede göğüste üç çift");
    const starfish = {
      internalMineral: true,
      vertebra: false,
      waterVascular: true,
      tubeFeet: true,
    };
    expect(starfish.internalMineral && !starfish.vertebra).toBe(true);
    expect(chosen("invert-5")).toContain("Derisidikenli");
    expect(chosen("vert-10")).toContain("Denizyıldızında kireçli iç iskelet");
    const octopus = { mantle: true, shell: false, circulation: "closed" };
    expect(octopus.mantle && !octopus.shell).toBe(true);
    expect(chosen("invert-7")).toContain(
      "ahtapot gibi dış kabuğu belirgin olmayan",
    );
    expect([2 - 1, 1 - 1]).toEqual([1, 0]);
    expect(chosen("invert-8")).toContain(
      "İlkinde rejenerasyonla üreme, ikincisinde onarım",
    );
    const universal = Object.values(circulation).every(
      (value) => value === "open",
    );
    expect(universal).toBe(false);
    expect(circulation.sünger).toBe("absent");
    expect(circulation["toprak solucanı"]).toBe("closed");
    expect(chosen("invert-10")).toContain(
      "Süngerde özel dolaşım sistemi yokluğu",
    );
    expect(chosen("invert-10")).toContain("toprak solucanında kapalı dolaşım");

    const vertebrates = [
      {
        name: "Sazan",
        heart: 2,
        lung: false,
        kidney: true,
        closed: true,
        cover: "scales",
        heat: "ecto",
        milk: false,
        feather: false,
      },
      {
        name: "Kurbağa",
        heart: 3,
        lung: true,
        kidney: true,
        closed: true,
        cover: "moist",
        heat: "ecto",
        milk: false,
        feather: false,
      },
      {
        name: "Kertenkele",
        heart: 3,
        lung: true,
        kidney: true,
        closed: true,
        cover: "dry",
        heat: "ecto",
        milk: false,
        feather: false,
      },
      {
        name: "Penguen",
        heart: 4,
        lung: true,
        kidney: true,
        closed: true,
        cover: "feather",
        heat: "endo",
        milk: false,
        feather: true,
      },
      {
        name: "Yunus",
        heart: 4,
        lung: true,
        kidney: true,
        closed: true,
        cover: "reduced-hair",
        heat: "endo",
        milk: true,
        feather: false,
      },
    ];
    const shared = [
      vertebrates.every((a) => a.closed && a.kidney),
      vertebrates.every((a) => a.heart === 4),
      vertebrates.every((a) => a.lung),
      vertebrates.every((a) => a.milk),
      vertebrates.every((a) => a.feather),
    ];
    expect(shared.flatMap((valid, i) => (valid ? [i] : []))).toEqual([
      card("vert-6").answer,
    ]);
    const crocodile = {
      name: "Timsah",
      heart: 4,
      lung: true,
      kidney: true,
      closed: true,
      cover: "dry",
      heat: "ecto",
      milk: false,
      feather: false,
    };
    const candidateSamples = [
      vertebrates[0],
      crocodile,
      // The observed moist larval plan already fails the dry/lung package;
      // no unprovided heart-chamber count is inferred for this developmental stage.
      {
        name: "Kurbağa larvası",
        cover: "moist",
        lung: false,
        heat: "ecto",
        heart: undefined,
      },
      vertebrates[3],
      vertebrates[4],
    ];
    expect(candidateSamples.map((a) => a.name)).toEqual(card("vert-2").options);
    const matching = candidateSamples.filter(
      (a) => a.cover === "dry" && a.lung && a.heat === "ecto" && a.heart === 4,
    );
    expect(matching.map((a) => a.name)).toEqual([chosen("vert-2")]);
    expect(chosen("vert-1")).toBe("Memeliler");
    const penguin = { group: "bird", feather: true, flight: false };
    expect(penguin.group === "bird" && penguin.feather && !penguin.flight).toBe(
      true,
    );
    expect(chosen("vert-3")).toContain("uçuş yeteneği zorunlu değildir");
    const platypus = { group: "mammal", fur: true, milk: true, eggs: true };
    expect(platypus.fur && platypus.milk && platypus.eggs).toBe(true);
    expect(chosen("vert-4")).toContain("Ornitorenk");
    const locations = { gameteUnion: "inside", embryoAfterLaying: "outside" };
    expect([locations.gameteUnion, locations.embryoAfterLaying]).toEqual([
      "inside",
      "outside",
    ]);
    expect(chosen("vert-5")).toBe("İç döllenme ve dış gelişme");
    const frogStages = [
      { species: "frog", organs: ["gill"] },
      { species: "frog", organs: ["lung", "skin"] },
    ];
    expect(frogStages[0].species).toBe(frogStages[1].species);
    expect(frogStages[0].organs).not.toEqual(frogStages[1].organs);
    expect(chosen("vert-7")).toContain("Başkalaşım");
    // Hypothetical heat-source countermodels, not empirical measurements.
    const temperatureCases = [
      { ecto: 18, endo: 37 },
      { ecto: 38, endo: 37 },
    ];
    expect(temperatureCases.map((a) => Math.sign(a.ecto - a.endo))).toEqual([
      -1, 1,
    ]);
    expect(chosen("vert-8")).toContain(
      "tek ölçümde sıcaklık sırası zorunlu değildir",
    );
    expect(chosen("vert-9")).toContain("Havalandırmaya yardımcıdır");
    expect(chosen("vert-9")).toContain("akciğerde gerçekleşir");
  });

  it("iç iskelet→omurga iddiasında gerekli ve yeterli yönlerini karıştırmaz", () => {
    const cases = [false, true].flatMap((A) =>
      [false, true].map((B) => ({ A, B, implication: !A || B })),
    );
    expect(cases.filter((row) => !row.implication)).toEqual([
      { A: true, B: false, implication: false },
    ]);
    const rule = rows[19].guidance.knowledge[1];
    expect(rule).toContain(
      "A özelliğini taşıyan her canlı B özelliğini de taşır",
    );
    expect(rule).toContain("A’yı taşıyıp B’yi taşımayan");
    expect(rule).not.toContain("zorunlu koşulu");
    const starfish = { A: true, B: false };
    expect(!starfish.A || starfish.B).toBe(false);
    expect(chosen("vert-10")).toContain("omurga bulunmaması");
  });

  it("ploidi tam takım adedidir; takım çeşitliliği veya kardeş kopya sayısı değildir", () => {
    const oneSet = ["A", "B", "C"];
    const twoIdenticalSets = [oneSet, [...oneSet]];
    expect(twoIdenticalSets).toHaveLength(2);
    expect(new Set(twoIdenticalSets.map((set) => set.join(""))).size).toBe(1);
    const replicated = twoIdenticalSets.map((set) =>
      set.map((family) => ({ family, sisterCopies: [0, 1] })),
    );
    expect(replicated).toHaveLength(2);
    expect(
      replicated.flatMap((set) => set.flatMap((c) => c.sisterCopies)),
    ).toHaveLength(12);
    expect(rows[42].guidance.knowledge[0]).toContain("kaç tam kromozom takımı");
    expect(rows[42].guidance.knowledge[0]).not.toContain("takım çeşitlerini");
    expect(chosen("meiosis-3")).toBe("3 kromozom,6 DNA,n");
  });

  it("kromozomu DNA kopyalarından kurar; mitoz hücre/kutup ve seçili bölünme sayılarını bağımsız hesaplar", () => {
    type Chromosome = { family: number; origin: number; copies: number[] };
    const start = (families: number): Chromosome[] =>
      Array.from({ length: families }, (_, family) =>
        [0, 1].map((origin) => ({ family, origin, copies: [0] })),
      ).flat();
    const duplicate = (cs: Chromosome[]) =>
      cs.map((c) => ({ ...c, copies: [0, 1] }));
    const separate = (cs: Chromosome[]) =>
      cs.flatMap((c) => c.copies.map((copy) => ({ ...c, copies: [copy] })));
    const count = (cs: Chromosome[]) => [
      cs.length,
      cs.reduce((n, c) => n + c.copies.length, 0),
    ];
    const copiedEight = duplicate(start(4));
    expect(count(copiedEight)).toEqual([8, 16]);
    expect(chosen("mitosis-1")).toBe("8 ve16");
    const anaphase = separate(duplicate(start(3)));
    expect(count(anaphase)).toEqual([12, 12]);
    expect(chosen("mitosis-2")).toBe("12 ve12");
    expect(count(anaphase.filter((c) => c.copies[0] === 0))).toEqual([6, 6]);
    const copiedMass = 5 * 2,
      onePole = copiedMass / 2;
    expect(onePole).toBe(5);
    expect(chosen("mitosis-3")).toBe(`${onePole}pg`);
    expect(chosen("mitosis-4")).toContain("Bitki sitokinezi");
    let serial = 0;
    const split = (living: string[], selected: Set<string>) =>
      living.flatMap((cell) =>
        selected.has(cell)
          ? [`${cell}.L${++serial}`, `${cell}.R${serial}`]
          : [cell],
      );
    let living = ["a", "b", "c", "d"];
    living = split(living, new Set(living));
    expect(living).toHaveLength(8);
    living = split(living, new Set(living.slice(0, 3)));
    expect(living).toHaveLength(11);
    living.pop();
    expect(living).toHaveLength(10);
    expect(chosen("mitosis-5")).toBe(String(living.length));
    const gates = [
      { name: "G₂", next: "M", condition: "copied-DNA-intact" },
      { name: "M", next: "anaphase", condition: "kinetochore-attached" },
    ];
    expect(
      gates.find((g) => g.next === "M" && g.condition === "copied-DNA-intact")!
        .name,
    ).toBe("G₂");
    expect(chosen("mitosis-6")).toContain("G₂ denetimi");
    expect(
      gates.find(
        (g) => g.next === "anaphase" && g.condition === "kinetochore-attached",
      )!.name,
    ).toBe("M");
    expect(chosen("mitosis-7")).toContain("M denetimi");
    const haploid = start(3).filter((c) => c.origin === 0);
    expect(
      count(separate(duplicate(haploid)).filter((c) => c.copies[0] === 0)),
    ).toEqual([3, 3]);
    expect(chosen("mitosis-8")).toContain("n yavrular");
    const ratios = [2, 4].map((a) => (6 * a * a) / (a * a * a));
    expect(ratios).toEqual([3, 1.5]);
    expect(chosen("mitosis-9")).toContain("3’ten1,5’e");
    const totalDaughterDNA = [2, 2].reduce((a, b) => a + b, 0);
    expect(totalDaughterDNA).toBe(4);
    expect(chosen("mitosis-10")).toContain("toplamı4C");
  });

  it("eşeysiz olayları birey kimliği, arı takım zinciri ve iki üretim kuşağıyla sınar", () => {
    const histories = {
      endospore: [new Set(["B"]), new Set(["B"]), new Set(["B"])],
      bud: [new Set(["parent"]), new Set(["parent", "bud"])],
      repair: [new Set(["lizard"]), new Set(["lizard"])],
    };
    expect(
      Object.values(histories).map((h) => h.at(-1)!.size - h[0].size),
    ).toEqual([0, 1, 0]);
    expect(chosen("asexual-1")).toContain("Dayanıklılığı");
    expect(chosen("asexual-2")).toBe("Tomurcuklanma");
    expect(chosen("asexual-3")).toContain("bağımsız birey sayısı artmadığı");
    const sameGenotype = [
      { genotype: "G", light: "low", height: 1 },
      { genotype: "G", light: "high", height: 2 },
    ];
    expect(sameGenotype[0].genotype).toBe(sameGenotype[1].genotype);
    expect(sameGenotype[0].height).not.toBe(sameGenotype[1].height);
    expect(chosen("asexual-4")).toContain(
      "genetik fark tek başına kanıtlanmaz",
    );
    const beeEgg = 32 / 2,
      beeMale = beeEgg,
      beeSperm = beeMale;
    expect([beeMale, beeSperm]).toEqual([16, 16]);
    expect(beeSperm + beeEgg).toBe(32);
    expect(chosen("asexual-5")).toBe(`Erkek${beeMale},sperm${beeSperm}`);
    let cells = ["A", "B", "C"],
      event = 0;
    const split = (living: string[], chosen: Set<string>) =>
      living.flatMap((id) =>
        chosen.has(id) ? [`${id}.${++event}a`, `${id}.${event}b`] : [id],
      );
    for (let round = 0; round < 2; round++)
      cells = split(cells, new Set(cells));
    expect(cells).toHaveLength(12);
    cells = split(cells, new Set(cells.slice(0, 5)));
    expect(cells).toHaveLength(17);
    expect(chosen("asexual-6")).toBe(String(cells.length));
    expect(chosen("asexual-7")).toContain("eşeyli üreme geçmişi");
    // Both production mechanisms can precede the same observed no-fusion growth.
    const sporeCountermodels = [
      { production: "mitosis", fusionDuringGrowth: false },
      { production: "meiosis", fusionDuringGrowth: false },
    ];
    expect(new Set(sporeCountermodels.map((m) => m.production)).size).toBe(2);
    expect(sporeCountermodels.every((m) => !m.fusionDuringGrowth)).toBe(true);
    expect(chosen("asexual-8")).toContain(
      "üretim bölünmesi için ek bilgi gerekir",
    );
    const copied = ["ACGT", "ACGT"],
      changed = ["ACGT", "ATGT"];
    expect(new Set(copied).size).toBe(1);
    expect(new Set(changed).size).toBe(2);
    expect(chosen("asexual-9")).toContain("Yeni mutasyonlar oluşabilir");
    const first = ["c1", "c2", "c3"],
      next = first.slice(0, 2).flatMap((donor) => [donor + "-a", donor + "-b"]);
    expect(new Set([...first, ...next]).size).toBe(7);
    expect(chosen("asexual-10")).toBe(String(first.length + next.length));
  });

  it("mayozda homolog/kardeş sayımını ve bitki evresini bağımsız kayıtlarla kurar", () => {
    const copied = Array.from({ length: 4 }, (_, family) =>
      [0, 1].map((origin) => ({ family, origin, sisters: [0, 1] })),
    ).flat();
    expect(new Set(copied.map((c) => c.family)).size).toBe(4);
    expect(copied.flatMap((c) => c.sisters)).toHaveLength(16);
    expect(chosen("meiosis-1")).toBe("4 tetrat ve16 kromatit");
    expect(chosen("meiosis-2")).toBe("Homolog kromozomlar; kardeş kromatitler");
    const firstProduct = Array.from({ length: 3 }, (_, family) => ({
      family,
      copies: [0, 1],
    }));
    expect([
      firstProduct.length,
      firstProduct.flatMap((c) => c.copies).length,
    ]).toEqual([3, 6]);
    expect(chosen("meiosis-3")).toBe("3 kromozom,6 DNA,n");
    const anaphaseII = Array.from({ length: 5 }, (_, family) =>
      [0, 1].map((copy) => ({ family, copy })),
    ).flat();
    expect([
      anaphaseII.length,
      anaphaseII.filter((c) => c.copy === 0).length,
    ]).toEqual([10, 5]);
    expect(chosen("meiosis-4")).toBe("10 ve5");
    expect(chosen("meiosis-5")).toContain(
      "Homolog çiftin kardeş olmayan kromatitlerinin",
    );
    for (const left of [0, 1])
      for (const right of [2, 3]) {
        const strands = ["AB", "AB", "ab", "ab"],
          a = strands[left],
          b = strands[right];
        strands[left] = a[0] + b[1];
        strands[right] = b[0] + a[1];
        expect([...strands].sort()).toEqual(["AB", "Ab", "aB", "ab"].sort());
        expect(strands.map((s) => s[0]).sort()).toEqual(["A", "A", "a", "a"]);
        expect(strands.map((s) => s[1]).sort()).toEqual(["B", "B", "b", "b"]);
      }
    expect(chosen("meiosis-6")).toBe("AB,Ab,aB,ab");
    const orientations = [];
    for (const A of ["A", "a"])
      for (const B of ["B", "b"]) {
        const first = A + B,
          opposite = (A === "A" ? "a" : "A") + (B === "B" ? "b" : "B");
        const products = [first, first, opposite, opposite];
        expect(new Set(products).size).toBe(2);
        orientations.push(...products);
        if (first === "Ab")
          expect(products.join(",")).toBe(chosen("meiosis-7"));
      }
    expect(new Set(orientations).size).toBe(4);
    const threePairOrigins = [];
    for (const a of [0, 1])
      for (const b of [0, 1])
        for (const c of [0, 1]) threePairOrigins.push([a, b, c].join(""));
    expect(new Set(threePairOrigins).size).toBe(8);
    expect(chosen("meiosis-8")).toBe(String(threePairOrigins.length));
    const dna = [8, 16, 8, 4];
    expect(dna.map((v) => v / dna[0])).toEqual([1, 2, 1, 0.5]);
    expect(4 * dna.at(-1)!).toBe(dna[1]);
    expect(chosen("meiosis-9")).toContain(
      "uyumludur; son ürün DNA’sıG₁’in yarısıdır",
    );
    const plant = [
      { event: "meiosis", before: 2, after: 1, product: "spore" },
      { event: "mitosis", before: 1, after: 1, product: "gamete" },
    ];
    expect(
      plant.every(
        (edge) =>
          edge.after ===
          (edge.event === "meiosis" ? edge.before / 2 : edge.before),
      ),
    ).toBe(true);
    expect(chosen("meiosis-10")).toContain("haploit sporlar");
    expect(chosen("meiosis-10")).toContain("gametler mitozla");
  });
});
