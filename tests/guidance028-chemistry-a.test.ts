import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { Children, createElement, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import rows from "../src/learning/guidance028ChemistryA.json";
import { lessons } from "../src/domain/content";
import { beforeFoundation031Registration } from "./helpers/accepted-content-031";
import { clarifiedQuestionView } from "../src/domain/questionPresentation";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import { QuestionHelp } from "../src/components/QuestionHelp";
import { helpPanels, resolvedGuidance } from "../src/learning/questionHelp";

const ids = [
  "m1",
  "m2",
  "m3",
  "m4",
  "m5",
  "sim-1",
  "sim-2",
  "sim-3",
  "sim-4",
  "sim-5",
  "dis-1",
  "dis-2",
  "dis-3",
  "dis-4",
  "dis-5",
  "sym-1",
  "sym-2",
  "sym-3",
  "sym-4",
  "sym-5",
  "safe-1",
  "safe-2",
  "safe-3",
  "safe-4",
  "safe-5",
  "atom-1",
  "atom-2",
  "atom-3",
  "atom-4",
  "atom-5",
  "periodic-1",
  "periodic-2",
  "periodic-3",
  "periodic-4",
  "periodic-5",
  "f013-foundation-katman-elektron-dizilimi-1",
  "f013-foundation-katman-elektron-dizilimi-2",
  "f013-foundation-katman-elektron-dizilimi-3",
  "f013-foundation-katman-elektron-dizilimi-4",
  "f013-foundation-katman-elektron-dizilimi-5",
  "f013-foundation-katman-elektron-dizilimi-6",
  "f013-foundation-katman-elektron-dizilimi-7",
  "f013-foundation-katman-elektron-dizilimi-8",
  "f013-foundation-katman-elektron-dizilimi-9",
  "f013-foundation-katman-elektron-dizilimi-10",
  "elementlerin-siniflandirilmasi-q1",
  "elementlerin-siniflandirilmasi-q2",
  "elementlerin-siniflandirilmasi-q3",
  "elementlerin-siniflandirilmasi-q4",
  "elementlerin-siniflandirilmasi-q5",
];
const lessonIds = [
  "mol",
  "simyadan-kimyaya",
  "kimya-disiplinleri",
  "sembolik-dil",
  "kimya-guvenlik",
  "atom-modelleri",
  "periyodik-sistem",
  "katman-elektron-dizilimi",
  "elementlerin-siniflandirilmasi",
];
const originals = lessonIds.flatMap(
  (id) => lessons.find((l) => l.id === id)!.questions,
);
const flat: HelpQuestion[] = originals.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((option) => option.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
}));
const views = flat.map(clarifiedQuestionView);
const qById = new Map(views.map((q) => [q.id, q]));
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
const sha = (value: string | Buffer) =>
  createHash("sha256").update(value).digest("hex");
const norm = (text: string) =>
  text
    .normalize("NFKC")
    .toLocaleLowerCase("tr-TR")
    .replace(/[\p{P}\p{S}\s]+/gu, "");
const escape = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");
const nextButton = (tree: ReactNode): { onClick: () => void } | undefined => {
  let found: { onClick: () => void } | undefined;
  Children.forEach(tree, (node) => {
    if (!isValidElement<{ children?: ReactNode; onClick?: () => void }>(node))
      return;
    if (node.type === "button" && node.props.onClick)
      found = { onClick: node.props.onClick };
    else found ??= nextButton(node.props.children);
  });
  return found;
};
const shell = (number: number) =>
  `f013-foundation-katman-elektron-dizilimi-${number}`;

describe("028 Chemistry A: immutable fifty original cards", () => {
  it("retains every original field and the actual three/five option counts", () => {
    expect(originals.map((q) => q.id)).toEqual(ids);
    expect(rows.map((row) => row.id)).toEqual(ids);
    expect(new Set(ids).size).toBe(50);
    expect(sha(JSON.stringify(stable(originals)))).toBe(
      "42e83de83111cf80886751607c543e882c73463cc69d5134a4286b16333eaeb5",
    );
    expect(originals.filter((q) => q.options.length === 3)).toHaveLength(35);
    expect(originals.filter((q) => q.options.length === 5)).toHaveLength(15);
    for (const [i, row] of rows.entries()) {
      expect(Object.keys(row)).toEqual(["id", "identity", "guidance"]);
      expect(row.identity).toBe(questionIdentity(views[i]));
      expect(originals[i].guidance).toBeUndefined();
      expect(row.guidance.optionReasons).toHaveLength(
        originals[i].options.length,
      );
      if (!new Set(["periodic-4", shell(3), shell(7)]).has(row.id))
        expect(views[i]).toEqual(flat[i]);
    }
  });

  it("preserves source banks and existing deep guides", () => {
    const files: Record<string, string> = {
      "src/domain/content.ts":
        "f89bd0c65d53dd5ebd275bacc365f78dd74b4ba62a6161004b19d9706fa8f77f",
      "src/learning/guides/chemistryDepth.ts":
        "ed5df244c30c64b0d4cb048c18e16cb66918195c99fc18cf664dd0c6bec7b035",
      "src/learning/introLessons.ts":
        "3618abffce02d404ee679c54b5b7fa6a126daca98a9a710ee62e6b06ee0cf788",
      "src/learning/guides/alchemy.ts":
        "fa7fe3317e8faabff3b90c4f227d37bcb0d24cae7cb292d855454658a5b65939",
      "src/learning/guides/chemistry.ts":
        "87c0f01421dfd68b3dfb6a6d037431f5c3f6edd9f95e066f420d017ee9b5ea29",
      "src/learning/guides/symbols.ts":
        "a5479b744d11e862125533649d72d5f2e6dbea226c1713e8ae84adab0bd5ba09",
      "src/learning/guides/atoms.ts":
        "7220f52d01710e02958d317854358d88486dbe65e5dac4199810b5264023833e",
      "src/learning/lessons.ts":
        "7eb87f7f86954eff01f9edb68bca491be3753a56a70594677e826086773bbb18",
      "src/learning/guides/periodic.ts":
        "c3446e0cc046c2dfddf0ebdfe7d35da3e48270d63a2bc2eebfe2b18ad0f013fa",
      "src/learning/forge013FoundationQuestions.ts":
        "b29b737e0126b7e676a24ac684447c8201abf4ad8b9dead232c6be6d7fc4fc73",
      "src/learning/guides/shells.ts":
        "0c4174adbcfa05a31b53e9eeb35b1c5463f09289b94ac8efd601e605964b44cc",
      "src/learning/periodicDepth.ts":
        "ebfaf163bdb546607a4051544beb7de3fbdf9f2b2879f399b38fb991ba06be2d",
    };
    for (const [file, hash] of Object.entries(files)) {
      const source = readFileSync(new URL(`../${file}`, import.meta.url));
      expect(
        sha(
          file === "src/domain/content.ts"
            ? beforeFoundation031Registration(source.toString("utf8"))
            : source,
        ),
        file,
      ).toBe(hash);
    }
  });

  it("binds the approved occupied-shell correction only to its exact known original", () => {
    const before = flat.find((q) => q.id === "periodic-4")!;
    const after = qById.get("periodic-4")!;
    expect(before.hint).toBe("Dolu katmanları say; toplam elektronu değil.");
    expect(before.explanation).toBe(
      "Üç dolu katman olduğu için 3. periyottadır. 13 ise atom numarasıdır.",
    );
    expect(after).toEqual({
      ...before,
      hint: "Periyot için elektron içeren katmanları say; katmanların tam dolu olması gerekmez.",
      explanation:
        "Al’nin nötr temel hâl dağılımı 2,8,3 olduğundan elektron içeren üç katmanı vardır ve element 3. periyottadır. Periyot için katmanların tam dolu olması gerekmez; son katmanda 3 elektron bulunur. Toplam 13 elektron, nötr Al’nin atom numarasıdır; periyot numarası değildir.",
    });
    expect(questionIdentity(before)).not.toBe(
      rows.find((row) => row.id === before.id)!.identity,
    );
    const approvedShellExplanations: Record<string, string> = {
      [shell(3)]:
        "İyonun elektron sayısı 18, yükü +2 olduğundan Z=e+q=18+2=20 olur. Nötr Ca atomunun temel hâl dağılımı 2,8,8,2 ve periyodu 4’tür. İyonun elektron içeren üç katmanı, elementin periyodunu 3’e indirmez.",
      [shell(7)]:
        "Ne için e=10; Na⁺ için e=11−1=10; Mg²⁺ için e=12−2=10 bulunur. Proton sayıları 10,11,12 olarak farklı kaldığından aynı elemente dönüşmüş sayılmazlar. Temel hâlde ele alınırlarsa üçünün de katman dağılımı 2,8 olur; bu koşulda elektron sayıları ve dizilimleri aynı olduğundan izoelektroniktirler. Kökte temel hâl verildiği varsayılmaz.",
    };
    for (const [id, explanation] of Object.entries(approvedShellExplanations)) {
      const raw = flat.find((q) => q.id === id)!;
      const visible = qById.get(id)!;
      expect(visible).toEqual({ ...raw, explanation });
      expect(visible.hint).toBe(raw.hint);
      expect(questionIdentity(raw)).not.toBe(
        rows.find((row) => row.id === id)!.identity,
      );
    }
    const personal = clarifiedQuestionView({
      ...before,
      hint: "Kişisel ipucum.",
    });
    expect(personal.hint).toBe("Kişisel ipucum.");
    expect(personal.explanation).toBe(after.explanation);
    for (const [i, row] of rows.entries()) {
      const q = flat[i];
      for (const changed of [
        { ...q, prompt: q.prompt + " Ek koşul." },
        { ...q, passage: "Değişmiş pasaj." },
        { ...q, options: [q.options[0] + " değişti", ...q.options.slice(1)] },
        { ...q, answer: (q.answer + 1) % q.options.length },
        { ...q, explanation: q.explanation + " Ek açıklama." },
      ]) {
        expect(questionIdentity(clarifiedQuestionView(changed))).not.toBe(
          row.identity,
        );
        expect(clarifiedQuestionView(changed)).toBe(changed);
      }
    }
  });
});

describe("028 Chemistry A: fifty individual progressive guides", () => {
  it("has positive prerequisites, distinct methods, 150 nonduplicate steps and 180 bound reasons", () => {
    expect(rows.reduce((sum, row) => sum + row.guidance.steps.length, 0)).toBe(
      150,
    );
    expect(
      rows.reduce((sum, row) => sum + row.guidance.optionReasons.length, 0),
    ).toBe(180);
    expect(new Set(rows.map((row) => norm(row.guidance.strategy))).size).toBe(
      50,
    );
    for (const row of rows) {
      const q = qById.get(row.id)!;
      const g = questionGuidanceSchema.parse(row.guidance);
      expect(g).toEqual(row.guidance);
      expect(g.knowledge.length).toBeGreaterThanOrEqual(1);
      expect(g.knowledge.length).toBeLessThanOrEqual(3);
      expect(g.steps).toHaveLength(3);
      expect(new Set(g.steps.map(norm)).size).toBe(3);
      expect(new Set(g.optionReasons.map(norm)).size).toBe(q.options.length);
      const early = [...g.knowledge, q.hint!, q.explanation].map(norm);
      expect(early).not.toContain(norm(g.strategy));
      for (const step of g.steps) {
        expect(early).not.toContain(norm(step));
        expect(norm(step)).not.toBe(norm(g.strategy));
      }
      expect(
        g.optionReasons.flatMap((reason, index) =>
          reason.startsWith("Doğru.") ? [index] : [],
        ),
      ).toEqual([q.answer]);
      expect(g.commonError).not.toBe(g.check);
      expect(norm(g.check)).not.toBe(norm(q.explanation));
      if (norm(q.options[q.answer]).length > 9)
        expect(norm(g.strategy)).not.toContain(norm(q.options[q.answer]));
    }
    const mercury = rows.find(
      (row) => row.id === "elementlerin-siniflandirilmasi-q2",
    )!.guidance;
    // The method chooses how to compare the general rule with Hg; the class
    // fact is introduced later in step2, not disclosed in the method panel.
    for (const early of [...mercury.knowledge, mercury.strategy])
      expect(early).not.toMatch(/(?:Hg|cıva)[^.;]*\bmetal(?:dir|dır)?\b/iu);
    expect(mercury.steps[1]).toContain(
      "Cıvanın metal olarak sınıflandırıldığını",
    );
  });

  it("keeps all 180 reasons bound to the actual option rather than invented five-choice slots", () => {
    // These short anchors identify the specific claims or quantities being assessed.
    // Full paragraph quality is also reviewed independently; no shared reason template.
    const anchors: Record<string, string[]> = {
      m1: ["18 g", "36 g ÷ 18", "324 g"],
      m2: ["su moleküllerinin", "2 mol H", "1 mol O"],
      m3: ["C atomlarının", "0,5×2", "1 mol CO₂"],
      m4: ["0,25 mol", "22/44", "2 mol CO₂"],
      m5: ["molar kütleleri farklı", "nNₐ", "iki katıdır"],
      "sim-1": ["Hız yasasını", "altına dönüştürme", "belirsizliğini"],
      "sim-2": ["gözenekli", "yoğunlaştırılarak", "boyutunu"],
      "sim-3": ["iyonları tamamen", "ayrıştıran", "filtrata"],
      "sim-4": ["açıklamanın sınanmasını", "Cam kap", "tarihini"],
      "sim-5": ["mutlaka simya", "çağdaş bilimsel", "sıcaklık"],
      "dis-1": ["nicel analiz", "büyük moleküllerin", "üretim süreçlerini"],
      "dis-2": ["polimer sentezi", "canlılardaki", "üretim süreci"],
      "dis-3": ["tür ve miktar", "karbon", "enerji ve tepkime hızı"],
      "dis-4": [
        "tür ve miktarı",
        "büyük moleküllerin yapısı",
        "yalnız anorganik",
      ],
      "dis-5": ["canlıların", "sembolleri", "kalite, verim ve maliyet"],
      "sym-1": ["Co kobaltın", "O büyük", "Harf büyüklüğü"],
      "sym-2": ["bir H₂O", "moleküllerinin sayısı", "3×2=6"],
      "sym-3": ["kapsamı ters", "OH grubu iki kez", "O:1 bırakılamaz"],
      "sym-4": ["H=2×3=6", "N’ye uygulamamıştır", "H’yi tek moleküldeki"],
      "sym-5": ["yalnız O", "hidrojen ve oksijen", "iki element türü"],
      "safe-1": ["gaz tüpü", "alev bulunan halka", "üç kanatlı"],
      "safe-2": ["puar", "yutma", "pipet doldurmaz"],
      "safe-3": ["lavaboya dökülemez", "zararlı buhara", "uyumlu kaba"],
      "safe-4": ["yerel aşırı ısınma", "asit suya yavaşça", "sıçrama riski"],
      "safe-5": ["el ve vücut", "solunum", "Renksiz"],
      "atom-1": ["Dalton", "Thomson", "çekirdektedir"],
      "atom-2": [
        "tamamen dolu",
        "Elektronların hepsinin",
        "büyük kısmının boşluk",
      ],
      "atom-3": ["küçük ve yoğun", "eşit yoğunlukta", "yük bulunmaması"],
      "atom-4": ["daha düşük", "enerjiyi alır", "proton eklemez"],
      "atom-5": [
        "kesin hareket çizgisi",
        "başka adı değildir",
        "uzaysal bölge",
      ],
      "periodic-1": [
        "bir elektron vererek",
        "tablo konumu korunur",
        "0, Na⁺’ta +1",
      ],
      "periodic-2": ["12−10=+2", "nötr Mg", "12−14=−2"],
      "periodic-3": ["elektron sayısıdır", "periyodunu verir", "18. grupta"],
      "periodic-4": ["2+8+3", "tam dolması gerekmez", "2 ile son katmandaki 3"],
      "periodic-5": ["17−18=−1", "bir fazla proton", "17 ile 18 eşit değildir"],
      [shell(1)]: ["12−10=+2", "12−14=−2", "Z=12", "12−12=0", "10−12=−2"],
      [shell(2)]: [
        "elektron kaybını",
        "17−18=−1",
        "nötr klorun",
        "temel hâl değildir",
        "2+8+8=18",
      ],
      [shell(3)]: [
        "geri eklenmediği",
        "daha çıkarmaktır",
        "Z’si 20",
        "Ca’nın temel hâli değildir",
        "17 kalır",
      ],
      [shell(4)]: [
        "yeterli değildir",
        "ön koşulu değildir",
        "K⁺",
        "2,8,8,1",
        "imkânsızlığı değildir",
      ],
      [shell(5)]: [
        "ters yerleştirir",
        "18 değil 8",
        "2×3²=18",
        "n=4",
        "doluluğu 8",
      ],
      [shell(6)]: [
        "1. periyot",
        "2. grup yanlıştır",
        "2. periyot değildir",
        "iki atamayı da",
        "H ile aynı aileye",
      ],
      [shell(7)]: [
        "Z değerleri 10, 11 ve 12",
        "12−2=10",
        "Z=12",
        "bir elektron kaybı",
        "10 protona karşılık 10",
      ],
      [shell(8)]: [
        "uyarılmış dağılımdan",
        "son katmandaki elektron",
        "2+7+1+1=11",
        "toplam 11",
        "Z=18",
      ],
      [shell(9)]: [
        "fazla elektron çıkarılmadığından",
        "20 elektron",
        "17 olur",
        "Z=17",
        "7A",
      ],
      [shell(10)]: [
        "kesin yörüngeye",
        "konumu ve hızını",
        "uyarılma",
        "Z değerleri farklı",
        "temsil araçları",
      ],
      "elementlerin-siniflandirilmasi-q1": [
        "istisnasıdır",
        "Hidrojen ametaldir",
        "Si gibi",
        "tek elektronlu",
        "gaz hâlindeki",
      ],
      "elementlerin-siniflandirilmasi-q2": [
        "bütün metallerin",
        "Sıvı olmak",
        "sıvı olan bir metaldir",
        "soy gaz ailesine",
        "yarı metal olmayı",
      ],
      "elementlerin-siniflandirilmasi-q3": [
        "proton sayısının",
        "karışım",
        "evrensel genellemeye",
        "tek başına metal",
        "Z’yi",
      ],
      "elementlerin-siniflandirilmasi-q4": [
        "tek katmanlıdır",
        "2. grup değildir",
        "İki elektron iki katman",
        "1. periyottadır",
        "üçüncü katmanda",
      ],
      "elementlerin-siniflandirilmasi-q5": [
        "alkali metalleriyle",
        "18. grubun",
        "verilen hâlle",
        "17. grubun",
        "yarı metal sınıfında",
      ],
    };
    expect(Object.keys(anchors).sort()).toEqual([...ids].sort());
    for (const row of rows) {
      expect(anchors[row.id]).toHaveLength(qById.get(row.id)!.options.length);
      row.guidance.optionReasons.forEach((reason, index) =>
        expect(reason).toContain(anchors[row.id][index]),
      );
    }
  });

  it("checks molar conversion and atom counts against the original numerical options", () => {
    const numerical = (id: string) =>
      qById.get(id)!.options.map((s) => Number(s.replace(",", ".")));
    for (const [id, valid] of [
      ["m1", (n: number) => n * 18 === 36],
      ["m2", (h: number) => h / 1 === 2],
      ["m3", (o: number) => o / 0.5 === 2],
      ["m4", (mass: number) => mass / 44 === 0.5],
    ] as const)
      expect(numerical(id).flatMap((n, i) => (valid(n) ? [i] : []))).toEqual([
        qById.get(id)!.answer,
      ]);
    // Expand the actual formula groups rather than trusting the answer labels.
    const calciumExpanded = ["Ca", "O", "H", "O", "H"];
    const count = (symbol: string) =>
      calciumExpanded.filter((atom) => atom === symbol).length;
    expect(qById.get("sym-3")!.options[qById.get("sym-3")!.answer]).toBe(
      `Ca:${count("Ca")}, O:${count("O")}, H:${count("H")}`,
    );
    const twoAmmonia = [
      ["N", "H", "H", "H"],
      ["N", "H", "H", "H"],
    ].flat();
    const n = twoAmmonia.filter((atom) => atom === "N").length;
    const h = twoAmmonia.filter((atom) => atom === "H").length;
    expect(qById.get("sym-4")!.options[qById.get("sym-4")!.answer]).toBe(
      `N:${n}, H:${h}`,
    );
    expect(n + h).toBe(8);
  });

  it("rejects charge-preserving distractors that silently change the element", () => {
    const magnesium = qById.get(shell(1))!;
    const parsed = magnesium.options.map((option) => {
      const match = /^(\d+) elektron; ([\d,]+); (\d+) proton$/.exec(option)!;
      return {
        e: Number(match[1]),
        shells: match[2].split(",").map(Number),
        p: Number(match[3]),
      };
    });
    const valid = parsed.flatMap((o, i) =>
      o.p === 12 &&
      o.p - o.e === 2 &&
      o.shells.reduce((a, b) => a + b, 0) === o.e
        ? [i]
        : [],
    );
    expect(valid).toEqual([magnesium.answer]);
    // This wrong option has a plausible 10e total but has lost two protons.
    expect(parsed[2].shells.reduce((a, b) => a + b, 0)).toBe(parsed[2].e);
    expect(parsed[2].p).not.toBe(12);
    const species = [
      { z: 10, charge: 0 },
      { z: 11, charge: 1 },
      { z: 12, charge: 2 },
    ];
    expect(species.map(({ z, charge }) => z - charge)).toEqual([10, 10, 10]);
    expect(new Set(species.map(({ z }) => z)).size).toBe(3);
    const limited = rows.find((row) => row.id === shell(7))!.guidance;
    expect(
      [
        ...limited.knowledge,
        limited.strategy,
        ...limited.steps,
        ...limited.optionReasons,
        limited.check,
      ].join(" "),
    ).not.toMatch(/1s²|2,8(?!\d)|izoelektronik/);
  });

  it("distinguishes capacity, occupied shells and excitation without shifting the element", () => {
    const first20 = new Map([
      [2, [2]],
      [11, [2, 8, 1]],
      [17, [2, 8, 7]],
      [19, [2, 8, 8, 1]],
      [20, [2, 8, 8, 2]],
    ]);
    const ca = first20.get(20)!;
    expect(2 * 3 ** 2).toBe(18);
    expect(ca[2]).toBe(8);
    expect(ca.reduce((a, b) => a + b, 0)).toBe(20);
    expect(qById.get(shell(5))!.options[qById.get(shell(5))!.answer]).toBe(
      `${2 * 3 ** 2} kapasite; ${ca[2]} elektron`,
    );
    const al = [2, 8, 3];
    expect(al.reduce((a, b) => a + b, 0)).toBe(13);
    expect(al.filter((e) => e > 0).length).toBe(3);
    expect(al[2]).toBeLessThan(2 * 3 ** 2);
    const excited = [2, 7, 1, 1];
    const z = excited.reduce((a, b) => a + b, 0);
    expect(z).toBe(11);
    expect(first20.get(z)!.length).toBe(3);
    expect(qById.get(shell(8))!.options[qById.get(shell(8))!.answer]).toBe(
      `Z=${z}; ${first20.get(z)!.length}. periyot`,
    );
    const neutralFromAnion = 2 + 8 + 8 - 1;
    expect(neutralFromAnion).toBe(17);
    expect(first20.get(neutralFromAnion)).toEqual([2, 8, 7]);
    for (const id of [
      "periodic-3",
      shell(6),
      "elementlerin-siniflandirilmasi-q4",
    ]) {
      const q = qById.get(id)!;
      expect(q.options[q.answer]).toContain("18");
    }
  });

  it("renders every stage and really advances all six native next actions", () => {
    const warnings: string[] = [];
    const before = console.error;
    let renders = 0,
      callbacks = 0;
    console.error = (...args) => warnings.push(args.map(String).join(" "));
    try {
      for (const row of rows) {
        const q = { ...qById.get(row.id)!, guidance: row.guidance };
        expect(resolvedGuidance(q)).toEqual(row.guidance);
        expect(helpPanels(q)).toHaveLength(5);
        let level = 0;
        while (level <= 6) {
          const tree = QuestionHelp({
            question: q,
            level,
            onLevel: (next) => {
              expect(next).toBe(level + 1);
              callbacks++;
              level = next;
            },
          });
          const html = renderToStaticMarkup(tree);
          renders++;
          if (level === 0) expect(html).not.toContain("help-content");
          else {
            for (const knowledge of row.guidance.knowledge)
              expect(html).toContain(escape(knowledge));
            expect(html.includes(escape(row.guidance.strategy))).toBe(
              level >= 2,
            );
            row.guidance.steps.forEach((step, i) =>
              expect(html.includes(escape(step))).toBe(level >= i + 3),
            );
            if (level <= 5) {
              expect(html).not.toContain("help-full-solution");
              expect(html).not.toContain(escape(q.explanation));
              expect(html).not.toContain("Doğru yanıt:");
              row.guidance.optionReasons.forEach((reason) =>
                expect(html).not.toContain(escape(reason)),
              );
            } else {
              expect(html).toContain(
                "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
              );
              expect(html).toContain(escape(q.explanation));
              for (const text of [
                ...row.guidance.optionReasons,
                row.guidance.commonError,
                row.guidance.check,
              ])
                expect(html).toContain(escape(text));
            }
          }
          const action = nextButton(tree);
          if (level === 6) {
            expect(action).toBeUndefined();
            break;
          }
          expect(action).toBeDefined();
          action!.onClick();
        }
        const reviewed = renderToStaticMarkup(
          createElement(QuestionHelp, {
            question: q,
            level: 6,
            reviewed: true,
            onLevel: () => {
              throw Error("must not dispatch");
            },
          }),
        );
        renders++;
        expect(reviewed).not.toContain("bağımsız doğru olarak sayılmaz");
        const disabled = renderToStaticMarkup(
          createElement(QuestionHelp, {
            question: q,
            level: 0,
            disabled: true,
            onLevel: () => {
              throw Error("must not dispatch");
            },
          }),
        );
        renders++;
        expect(disabled).toContain("disabled");
      }
    } finally {
      console.error = before;
    }
    expect(renders).toBe(450);
    expect(callbacks).toBe(300);
    expect(warnings).toEqual([]);
  }, 20000);
});
