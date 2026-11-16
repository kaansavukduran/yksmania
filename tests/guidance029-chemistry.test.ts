import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { Children, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import rows from "../src/learning/guidance029Chemistry.json";
import {
  forge093ChemistryLessons,
  forge093ChemistryGuides,
  covalentPairs,
  polarityMolecules,
} from "../src/learning/forge093Chemistry";
import {
  questionGuidanceSchema,
  questionIdentity,
  type HelpQuestion,
} from "../src/domain/questionHelpModel";
import { clarifiedQuestionView } from "../src/domain/questionPresentation";
import { resolvedGuidance, helpPanels } from "../src/learning/questionHelp";
import { QuestionHelp } from "../src/components/QuestionHelp";

// Stage only the new catalogue INPUT; the production identity resolver, panels
// and renderer execute unchanged. Actual runtime registration belongs to root.
vi.mock(
  "../src/learning/questionHelpCatalogue.json",
  async (importOriginal) => {
    const original = await importOriginal<{
      default: { id: string; identity: string; guidance: unknown }[];
    }>();
    return {
      default: [
        ...original.default.filter(
          (old) => !rows.some((row) => row.id === old.id),
        ),
        ...rows,
      ],
    };
  },
);
const ids = [
  "f093-chem-cov-1",
  "f093-chem-cov-2",
  "f093-chem-cov-3",
  "f093-chem-cov-4",
  "f093-chem-cov-5",
  "f093-chem-cov-6",
  "f093-chem-cov-7",
  "f093-chem-cov-8",
  "f093-chem-cov-9",
  "f093-chem-cov-10",
  "f093-chem-mol-1",
  "f093-chem-mol-2",
  "f093-chem-mol-3",
  "f093-chem-mol-4",
  "f093-chem-mol-5",
  "f093-chem-mol-6",
  "f093-chem-mol-7",
  "f093-chem-mol-8",
  "f093-chem-mol-9",
  "f093-chem-mol-10",
];
const raw = forge093ChemistryLessons.flatMap((lesson) => lesson.questions);
const flat: HelpQuestion[] = raw.map((q) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map((o) => o.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
}));
const byId = new Map(flat.map((q) => [q.id, q]));
const cov = (n: number) => `f093-chem-cov-${n}`;
const mol = (n: number) => `f093-chem-mol-${n}`;
const stable = (v: unknown): unknown =>
  Array.isArray(v)
    ? v.map(stable)
    : v && typeof v === "object"
      ? Object.fromEntries(
          Object.keys(v)
            .sort()
            .map((key) => [key, stable((v as Record<string, unknown>)[key])]),
        )
      : v;
const sha = (v: string | Buffer) =>
  createHash("sha256").update(v).digest("hex");
const norm = (v: string) =>
  v
    .normalize("NFKC")
    .toLocaleLowerCase("tr-TR")
    .replace(/[\p{P}\p{S}\s]+/gu, "");
const plain = (v: string) =>
  v
    .replace(/<[^>]*>/g, "")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&amp;", "&");
const button = (
  tree: ReactNode,
): { onClick: () => void; disabled?: boolean } | undefined => {
  let found: { onClick: () => void; disabled?: boolean } | undefined;
  Children.forEach(tree, (node) => {
    if (
      !isValidElement<{
        children?: ReactNode;
        onClick?: () => void;
        disabled?: boolean;
      }>(node)
    )
      return;
    if (node.type === "button" && node.props.onClick)
      found = { onClick: node.props.onClick, disabled: node.props.disabled };
    else found ??= button(node.props.children);
  });
  return found;
};

describe("029 original chemistry20 source and help bindings", () => {
  it("retains all original fields,20 exact identities,100 actual options and two full guides", () => {
    expect(raw.map((q) => q.id)).toEqual(ids);
    expect(rows.map((row) => row.id)).toEqual(ids);
    expect(new Set(ids).size).toBe(20);
    expect(sha(JSON.stringify(stable(raw)))).toBe(
      "91b7ed7f7a89cef81a6bd068a1f292eab9b21136daf3b1375439695ca99ff6fa",
    );
    expect(
      sha(
        readFileSync(
          new URL("../src/learning/forge093Chemistry.ts", import.meta.url),
        ),
      ),
    ).toBe("f038e9d4fd5ed2448205b41fea54db1974bc74d5222d2f8a74836a95ca823aae");
    expect(
      forge093ChemistryGuides.map((g) => sha(JSON.stringify(stable(g)))),
    ).toEqual([
      "cf72bc41e583b644b12b84741e8f3edcec82a0823e94ce54c859b127a1572e6e",
      "5994620fc62a2a1a13d2dcc97d413cd9e35c23c9cb6aeb61f2f9fb74409998d0",
    ]);
    for (const [i, row] of rows.entries()) {
      expect(Object.keys(row)).toEqual(["id", "identity", "guidance"]);
      expect(raw[i].guidance).toBeUndefined();
      expect(flat[i].options).toHaveLength(5);
      expect(clarifiedQuestionView(flat[i])).toEqual(flat[i]);
      expect(row.identity).toBe(questionIdentity(flat[i]));
      expect(resolvedGuidance(flat[i])).toEqual(row.guidance);
    }
  });

  it("has40 positive paragraphs,20 methods,60 progressing steps and100 specific reasons", () => {
    expect(rows.reduce((s, r) => s + r.guidance.knowledge.length, 0)).toBe(40);
    expect(rows.reduce((s, r) => s + r.guidance.steps.length, 0)).toBe(60);
    expect(rows.reduce((s, r) => s + r.guidance.optionReasons.length, 0)).toBe(
      100,
    );
    expect(new Set(rows.map((row) => norm(row.guidance.strategy))).size).toBe(
      20,
    );
    for (const row of rows) {
      const q = byId.get(row.id)!,
        g = questionGuidanceSchema.parse(row.guidance);
      expect(g).toEqual(row.guidance);
      expect(g.knowledge).toHaveLength(2);
      expect(g.steps).toHaveLength(3);
      expect(g.optionReasons).toHaveLength(5);
      expect(new Set(g.steps.map(norm)).size).toBe(3);
      expect(new Set(g.optionReasons.map(norm)).size).toBe(5);
      const earlier = [...g.knowledge, q.hint!, q.explanation].map(norm);
      expect(earlier).not.toContain(norm(g.strategy));
      g.steps.forEach((step) => {
        expect(earlier).not.toContain(norm(step));
        expect(norm(step)).not.toBe(norm(g.strategy));
      });
      expect(
        g.optionReasons.flatMap((reason, i) =>
          reason.startsWith("Doğru.") ? [i] : [],
        ),
      ).toEqual([q.answer]);
      expect(g.commonError).not.toBe(g.check);
      expect(norm(g.check)).not.toBe(norm(q.explanation));
      if (norm(q.options[q.answer]).length > 12)
        expect(norm(g.strategy)).not.toContain(norm(q.options[q.answer]));
    }
    // Specific molecule classes and computed current results are introduced in
    // the steps; early method panels select a route without naming the answer.
    for (const row of rows)
      expect(row.guidance.strategy).not.toMatch(
        /(?:CO₂|H₂O|BF₃|NH₃|CH₄|CH₃Cl|HCN|OF₂|CCl₄)[^.;]*\b(?:polardır|apolardır)\b/u,
      );
  });

  it("binds all100 reasons to the original five claims in their original order", () => {
    const anchors: Record<string, string[]> = {
      [cov(1)]: [
        "ortaklaşa",
        "tek çekirdek",
        "H₂ ve Cl₂",
        "tam aktarım",
        "kalıcı net dipol",
      ],
      [cov(2)]: [
        "üçü de uyuşmaz",
        "bu sıraya dönüştürmez",
        "LiCl",
        "ikinci ve üçüncü",
        "Üçü de iyonik değildir",
      ],
      [cov(3)]: [
        "yalnız bir ortak",
        "çift sayısıdır",
        "bağ dışı",
        "toplam değerlik",
        "3×2=6",
      ],
      [cov(4)]: [
        "tek bir O",
        "12, çift bağda kullanılan 4",
        "bir O atomunun",
        "4 elektron çıkarılmadan",
        "8+8",
      ],
      [cov(5)]: [
        "bağımsız H⁺",
        "2,20 ile 3,16",
        "işaretler terstir",
        "H δ+, Cl δ−",
        "−1 iyon yükü değildir",
      ],
      [cov(6)]: [
        "3,98−2,20=1,78",
        "3,16+2,20",
        "2,96+2,20",
        "1,78; 0,96; 0,76",
        "çıkarma için gerekli değildir",
      ],
      [cov(7)]: ["10−6=4", "10−8=2", "5 ortak çift", "2×5+5=15", "20 elektron"],
      [cov(8)]: [
        "240 kJ/mol",
        "geri karşılanmaz",
        "enerjisinin sıfır",
        "aynı bağ, aynı atomlar",
        "yön ters, büyüklük aynıdır",
      ],
      [cov(9)]: [
        "ters sırada",
        "NH₄⁺ içindeki",
        "H içermek",
        "net yüklü iyonlardır",
        "proton veya nötron",
      ],
      [cov(10)]: [
        "10−4=6",
        "H–C tek bağını atlar",
        "8 ortak elektron",
        "10 elektronluk",
        "bütçeyi 16’ya",
      ],
      [mol(1)]: [
        "iki eş, zıt",
        "polar kalır",
        "CO₂ molekülü apolardır",
        "elektronların yokluğunu",
        "iki O komşusuna",
      ],
      [mol(2)]: [
        "O tarafındaki",
        "elektron bulunmaması",
        "açıyı 180°",
        "aynı merkez atom",
        "iyonik bağa dönüştürmez",
      ],
      [mol(3)]: [
        "NH₃ için verilen",
        "ters yazılmıştır",
        "İkisi birden polar değildir",
        "piramidal NH₃",
        "aynı karar iddiasını",
      ],
      [mol(4)]: [
        "Cl köşesi",
        "180°",
        "İki sonuç ters",
        "tanımsız yapmaz",
        "CH₄’ün dört eş",
      ],
      [mol(5)]: [
        "5 ile 2",
        "5−2=+3",
        "yön yanlıştır",
        "7=5+2",
        "Hem büyüklük hem yön",
      ],
      [mol(6)]: [
        "3−1−1=+1",
        "aşağı bakamaz",
        "3, yan oklar 2",
        "7=3+2+2",
        "yatay değil düşey",
      ],
      [mol(7)]: [
        "ikisi birden apolar değildir",
        "İki sınıf ters",
        "her koşulda eş",
        "N tarafını",
        "Bağ mertebesi",
      ],
      [mol(8)]: [
        "zıt değildir",
        "O’dan F’lere",
        "yalnız bağlantıyı",
        "iyonik kristale dönüştürmez",
        "F olarak verilmiştir",
      ],
      [mol(9)]: [
        "apolarlık zorunlu değildir",
        "Polarlık da zorunlu değildir",
        "yerel bağ bilgisini",
        "iyonik örgü",
        "geometriyi belirleyen",
      ],
      [mol(10)]: [
        "elektron yokluğu değildir",
        "bütün çekimleri kaldırmaz",
        "London etkileşimi",
        "iyonik yapmaz",
        "İzdüşüm farklı",
      ],
    };
    expect(Object.keys(anchors).sort()).toEqual([...ids].sort());
    for (const row of rows)
      row.guidance.optionReasons.forEach((reason, i) =>
        expect(reason).toContain(anchors[row.id][i]),
      );
  });

  it("checks actual electron candidates against both the bond graph and conserved valence budget", () => {
    const n2 = covalentPairs.find((p) => p.id === "n2")!,
      o2 = covalentPairs.find((p) => p.id === "o2")!;
    const nShared = 2 * n2.order,
      oBudget = o2.valence[0] + o2.valence[1],
      oShared = 2 * o2.order;
    expect(byId.get(cov(3))!.options[byId.get(cov(3))!.answer]).toBe(
      String(nShared),
    );
    expect(byId.get(cov(4))!.options[byId.get(cov(4))!.answer]).toBe(
      String(oBudget - oShared),
    );
    // Candidate pairs may preserve the total while still miscounting the graph.
    for (const [id, budget, orders, firstMeansPairs] of [
      [cov(7), 10, [1, 3, 1], true],
      [cov(10), 10, [1, 3], false],
    ] as const) {
      const q = byId.get(id)!,
        sharedPairs = orders.reduce((s, n) => s + n, 0),
        shared = 2 * sharedPairs;
      const candidates = q.options.map((option) =>
        option.split(" ve ").map(Number),
      );
      const valid = candidates.flatMap(([first, nonbonding], i) => {
        const electrons = firstMeansPairs ? 2 * first : first;
        return electrons === shared && electrons + nonbonding === budget
          ? [i]
          : [];
      });
      expect(valid).toEqual([q.answer]);
      expect(
        candidates.filter(
          ([first, lone]) =>
            (firstMeansPairs ? 2 * first : first) + lone === budget,
        ).length,
      ).toBeGreaterThan(1);
    }
    expect(n2.valence[0] + n2.valence[1] - nShared).toBe(4);
    expect(oBudget - oShared).toBe(8);
  });

  it("uses exact provided electronegativity differences and keeps partial and net charge separate", () => {
    const q = byId.get(cov(6))!;
    const hundredths = (symbol: string) => {
      const match = new RegExp(`${symbol} (\\d),(\\d{2})`).exec(q.prompt)!;
      return 100 * Number(match[1]) + Number(match[2]);
    };
    const H = hundredths("H"),
      differences = ["F", "Cl", "Br"].map((symbol) =>
        Math.abs(hundredths(symbol) - H),
      );
    expect(differences).toEqual([178, 96, 76]);
    const max = Math.max(...differences),
      species = ["H–F", "H–Cl", "H–Br"][differences.indexOf(max)];
    expect(q.options[q.answer]).toBe(
      `${species}; fark ${Math.trunc(max / 100)},${String(max % 100).padStart(2, "0")}`,
    );
    expect(hundredths("Cl") + H).toBe(536);
    expect(hundredths("Br") + H).toBe(516);
    const hcl = covalentPairs.find((p) => p.id === "hcl")!;
    expect(hcl.electronegativity[1]).toBeGreaterThan(hcl.electronegativity[0]);
    expect(byId.get(cov(5))!.options[byId.get(cov(5))!.answer]).toContain(
      "H δ+ ve Cl δ−",
    );
    expect(byId.get(cov(5))!.options[byId.get(cov(5))!.answer]).toContain(
      "toplamda nötr",
    );
  });

  it("derives the two numerical vector answers from signed components rather than lengths", () => {
    const optionVector = (text: string): number[] => {
      if (text === "Sıfır") return [0, 0];
      const match = /^(Sağa|Sola|Yukarı|Aşağı) (\d+) birim$/.exec(text)!;
      const n = Number(match[2]);
      return match[1] === "Sağa"
        ? [n, 0]
        : match[1] === "Sola"
          ? [-n, 0]
          : match[1] === "Yukarı"
            ? [0, n]
            : [0, -n];
    };
    const horizontal = [5 - 2, 0];
    const lowerX = Math.sqrt(2 ** 2 - 1 ** 2),
      arrows = [
        [0, 3],
        [lowerX, -1],
        [-lowerX, -1],
      ];
    const net = [
      arrows.reduce((s, v) => s + v[0], 0),
      arrows.reduce((s, v) => s + v[1], 0),
    ];
    expect(net).toEqual([0, 1]);
    for (const [id, v] of [
      [mol(5), horizontal],
      [mol(6), net],
    ] as const) {
      const q = byId.get(id)!;
      expect(
        q.options.flatMap((o, i) =>
          JSON.stringify(optionVector(o)) === JSON.stringify(v) ? [i] : [],
        ),
      ).toEqual([q.answer]);
    }
    expect(3 + 2 + 2).toBe(7);
    expect(Math.hypot(...net)).not.toBe(7);
    const cos =
      (arrows[0][0] * arrows[1][0] + arrows[0][1] * arrows[1][1]) / (3 * 2);
    expect(cos).toBeCloseTo(-0.5, 12);
  });

  it("checks given molecular symmetry with an independent Gram norm and preserves the missing-angle counterexample", () => {
    // ||Σ w_i d_i||² from pairwise dot products is independent of the
    // production component-wise sum and exposes a fake flat-tetrahedron model.
    const gram = (directions: number[][], weights: number[]) =>
      directions.reduce(
        (sum, u, i) =>
          sum +
          directions.reduce(
            (subtotal, v, j) =>
              subtotal +
              weights[i] *
                weights[j] *
                u.reduce((dot, c, k) => dot + c * v[k], 0),
            0,
          ),
        0,
      );
    const expected: Record<string, boolean> = {
      co2: false,
      h2o: true,
      bf3: false,
      nh3: true,
      ch4: false,
      ccl4: false,
      ch3cl: true,
      hcn: true,
    };
    for (const [id, polar] of Object.entries(expected)) {
      const m = polarityMolecules.find((m) => m.id === id)!,
        norm2 = gram(m.directions, m.weights);
      expect(norm2 > 1e-10).toBe(polar);
      if (!polar) expect(Math.abs(norm2)).toBeLessThan(1e-10);
    }
    const tetra = polarityMolecules.find((m) => m.id === "ch4")!;
    for (let i = 0; i < 4; i++)
      for (let j = i + 1; j < 4; j++)
        expect(
          tetra.directions[i].reduce(
            (s, v, k) => s + v * tetra.directions[j][k],
            0,
          ),
        ).toBeCloseTo(-1 / 3, 12);
    const straight = polarityMolecules.find((m) => m.id === "co2")!,
      bent = polarityMolecules.find((m) => m.id === "h2o")!;
    expect(straight.directions).toHaveLength(2);
    expect(bent.directions).toHaveLength(2);
    expect(Math.abs(gram(straight.directions, [1, 1]))).toBeLessThan(1e-10);
    expect(gram(bent.directions, [1, 1])).toBeGreaterThan(0);
    expect(byId.get(mol(9))!.options[byId.get(mol(9))!.answer]).toContain(
      "geometri bilgisi",
    );
    expect(-120 + 120).toBe(0); // same-state formation/dissociation energy cycle
    expect(byId.get(cov(8))!.options[byId.get(cov(8))!.answer]).toBe(
      "120 kJ/mol enerji alınır",
    );
  });

  it("executes every production stage and all120 native next callbacks before full explanations", () => {
    const warnings: string[] = [],
      oldError = console.error;
    console.error = (...args) => warnings.push(args.map(String).join(" "));
    let renders = 0,
      callbacks = 0;
    try {
      for (const row of rows) {
        const q = byId.get(row.id)!,
          g = row.guidance;
        expect(helpPanels(q)).toHaveLength(5);
        for (let level = 0; level <= 6; level++) {
          let next = -1;
          const tree = QuestionHelp({
              question: q,
              level,
              onLevel: (value) => {
                next = value;
              },
            }),
            html = renderToStaticMarkup(tree),
            text = plain(html);
          renders++;
          if (level === 0) expect(html).not.toContain("help-content");
          else {
            g.knowledge.forEach((v) => expect(text).toContain(v));
            expect(text.includes(g.strategy)).toBe(level >= 2);
            g.steps.forEach((v, i) =>
              expect(text.includes(v)).toBe(level >= i + 3),
            );
          }
          if (level < 6) {
            expect(html).not.toContain("help-full-solution");
            expect(text).not.toContain(q.explanation);
            g.optionReasons.forEach((v) => expect(text).not.toContain(v));
            const action = button(tree);
            expect(action?.disabled).toBe(false);
            expect(next).toBe(-1);
            action!.onClick();
            callbacks++;
            expect(next).toBe(level + 1);
          } else {
            expect(button(tree)).toBeUndefined();
            expect(text).toContain(
              "Doğru yanıt: " + String.fromCharCode(65 + q.answer),
            );
            expect(text).toContain(q.explanation);
            [...g.optionReasons, g.commonError, g.check].forEach((v) =>
              expect(text).toContain(v),
            );
            expect((html.match(/<li>/g) ?? []).length).toBe(5);
          }
        }
        const reviewed = plain(
          renderToStaticMarkup(
            QuestionHelp({
              question: q,
              level: 1,
              reviewed: true,
              onLevel: () => {
                throw Error("No render dispatch");
              },
            }),
          ),
        );
        renders++;
        expect(reviewed).not.toContain("bağımsız doğru olarak sayılmaz");
        const disabled = QuestionHelp({
          question: q,
          level: 0,
          disabled: true,
          onLevel: () => {
            throw Error("No disabled dispatch");
          },
        });
        expect(button(disabled)?.disabled).toBe(true);
        expect(renderToStaticMarkup(disabled)).toContain("disabled");
        renders++;
      }
    } finally {
      console.error = oldError;
    }
    expect(renders).toBe(180);
    expect(callbacks).toBe(120);
    expect(warnings).toEqual([]);
  });

  it("rejects160 changed core identities and20 malformed reason counts with the real resolver", () => {
    const warnings: string[] = [];
    const oldError = console.error;
    console.error = (...args) => warnings.push(args.map(String).join(" "));
    let rejected = 0,
      fallbackRenders = 0;
    try {
      for (const row of rows) {
        const q = byId.get(row.id)!;
        for (const changed of [
          { ...q, id: q.id + "-v2" },
          { ...q, prompt: q.prompt + " Ek koşul." },
          { ...q, passage: "Başka pasaj." },
          { ...q, options: [q.options[0] + " değişti", ...q.options.slice(1)] },
          { ...q, options: [q.options[4], ...q.options.slice(0, 4)] },
          { ...q, answer: (q.answer + 1) % 5 },
          { ...q, explanation: q.explanation + " Ek açıklama." },
          { ...q, explanation: "" },
        ]) {
          expect(questionIdentity(changed)).not.toBe(row.identity);
          expect(resolvedGuidance(changed)).toBeUndefined();
          expect(helpPanels(changed)).toEqual([
            { title: "İlk ipucu", paragraphs: [changed.hint] },
          ]);
          const text = plain(
            renderToStaticMarkup(
              QuestionHelp({ question: changed, level: 1, onLevel: () => {} }),
            ),
          );
          fallbackRenders++;
          expect(text).not.toContain(row.guidance.strategy);
          row.guidance.knowledge.forEach((v) => expect(text).not.toContain(v));
          rejected++;
        }
        const personal = { ...q, hint: "Kişisel ipucum." };
        expect(questionIdentity(personal)).toBe(row.identity);
        expect(resolvedGuidance(personal)).toEqual(row.guidance);
        expect(helpPanels(personal)[0].paragraphs).toContain(personal.hint);
        const malformed = {
          ...q,
          guidance: {
            ...row.guidance,
            optionReasons: row.guidance.optionReasons.slice(1),
          },
        };
        expect(resolvedGuidance(malformed)).toBeUndefined();
        expect(helpPanels(malformed)).toHaveLength(1);
        expect(
          renderToStaticMarkup(
            QuestionHelp({ question: malformed, level: 1, onLevel: () => {} }),
          ),
        ).not.toContain("Şıkların mantığı");
        fallbackRenders++;
      }
    } finally {
      console.error = oldError;
    }
    expect(rejected).toBe(160);
    expect(fallbackRenders).toBe(180);
    expect(warnings).toEqual([]);
  });
});
