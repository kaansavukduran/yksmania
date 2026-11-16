import { describe, it, expect, vi } from "vitest";
import {
  createElement,
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  analyse024,
  formula024,
  balance024,
  alcoholReaction024,
  alcoholRoutes024,
  ether024,
  carbonyl024,
  carbonylMolecule024,
  carbonylChoices024,
  carbonylReagents024,
  acid024,
  acidMolecule024,
  acidChoices024,
  ester024,
  esterMolecule024,
  triglyceride024,
  fattyChoices024,
  normalizeChemistry024,
  chemistryDefaults024,
  forge024ChemistryTopics,
  forge024ChemistryLessons,
  forge024ChemistryGuides,
  type Molecule024,
} from "../src/learning/forge024Chemistry";
const fixtures = vi.hoisted(() => ({
  values: {} as Record<string, Record<string, string | number | boolean>>,
  set: vi.fn(),
}));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (key: string, defaults: object) => [
    Object.fromEntries(
      Object.entries(defaults).map(([k, v]) => [
        k,
        typeof fixtures.values[key]?.[k] === typeof v
          ? fixtures.values[key][k]
          : v,
      ]),
    ),
    (patch: Record<string, string | number | boolean>) => {
      fixtures.set(patch);
      fixtures.values[key] = { ...fixtures.values[key], ...patch };
    },
  ],
}));
vi.mock("../src/store", () => ({
  useApp: () => ({ state: { explorations: fixtures.values } }),
}));
import Lab from "../src/learning/Forge024ChemistryLab";
type ProbeProps = {
  children?: ReactNode;
  label?: string;
  value?: unknown;
  disabled?: boolean;
  onChange?: (value: unknown) => void;
  onClick?: () => void;
};
function callbackNodes(tree: ReactNode) {
  const nodes: ReactElement<ProbeProps>[] = [];
  const visit = (value: ReactNode) =>
    Children.forEach(value, (child) => {
      if (isValidElement<ProbeProps>(child)) {
        nodes.push(child);
        visit(child.props.children);
      }
    });
  visit(tree);
  return nodes;
}

const ascii = (s: string) =>
  s.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (x) => String("₀₁₂₃₄₅₆₇₈₉".indexOf(x)));
const lessons = forge024ChemistryLessons;
const keys = [
  [
    "16,1",
    "2-Propanol",
    "Etanol; Cl’nin yerini alır",
    "14,72",
    "Etanal + H₂ → etanol",
    "Bütanal",
    "2",
    "Pentan-2-on",
    "OH karbonunda H bulunmaması",
    "0,30",
    "0,40",
    "0,25 mol eten ve 0,25 mol su",
    "140 °C: dietil eter; 170 °C: eten",
    "0,60",
    "0,50 mol etanol; 0,20 mol eten",
    "Metanal → metanoik asit → CO₂",
    "Moleküler karışma olur; suyla hidrojen bağı kurulabilir",
    "H₂O",
    "O’ya bağlı etil bölümünde",
    "X: propanal; Y: propanon",
  ],
  [
    "CH₃OCH₂CH₃",
    "C₄H₁₀O",
    "1-Metoksipropan",
    "Dietil eter ve etoksietan",
    "C₂H₅OC₂H₅",
    "Asimetriktir; n-propil ve izopropil farklıdır",
    "Su verici, eter O’su alıcı olabilir",
    "Etanolün kendi arası hidrojen bağı kurması",
    "Hidrokarbon bölümünün payının büyümesi",
    "Yapı halkalıdır; açık zincir koşulunu sağlamaz",
    "Metoksibenzen; aril eter",
    "3",
    "8 sigma, 0 pi",
    "1,20",
    "Verilen koşullarda tepkimeye az katılması çözücü seçimini destekler",
  ],
  [
    "İki bağ yapmayan elektron çifti vardır",
    "İlki aldehit, ikincisi keton",
    "Karbonil C’ye iki karbon grubunun bağlanması",
    "3-Metilbütanal",
    "Pentan-3-on",
    "İşlevsel grup izomerliği",
    "Siklohekzanon",
    "Bütanoik asit",
    "CH₃CH₂COO⁻",
    "0,36",
    "57,6",
    "Benzaldehit: Tollens +, Fehling −; pentanal: ikisi +",
    "İkisi negatif; aldehidik H yoktur",
    "Bütan-2-ol",
    "0,55",
    "17,4",
    "(5, 3)",
    "25 °C ve 1 atm için daima sıvı iddiası uygun değildir",
    "9 sigma, 1 pi",
    "Konum izomeri; sırasıyla 2- ve 3-pentanol",
  ],
  [
    "–C(=O)OH",
    "2 COOH; 1 ek alkol OH",
    "2-Bromopropanoik asit",
    "C₅H₁₀O₂",
    "C₇H₆O₂; aromatik monokarboksilik asit",
    "HA+H₂O ⇌ H₃O⁺+A⁻",
    "1,0",
    "Eksi yük karboksilatın iki O’su arasında dağılır",
    "A daha kuvvetli; Ka(A)/Ka(B)=100",
    "1,0×10⁻³",
    "0,40",
    "0,30 mol NaOH; 0,30 mol H₂O",
    "−2 yük; 2 Na⁺",
    "0,15",
    "COOH proton verirken amino grup proton alabilir",
    "2-Hidroksibenzoik asit; aspirinden farklıdır",
    "0, 1, 2",
    "Oleik doymamıştır; bütün doymamışlar esansiyel değildir",
    "0,25",
    "Nötrleşme; sabun niteliğinde karboksilat tuzu oluşur",
  ],
  [
    "CH₃COOCH₃",
    "Metil propanoat",
    "Propil etanoat",
    "Etanoik asit ve metanol",
    "Sodyum propanoat ve etanol",
    "0,55",
    "Asit 0,55; alkol 0,35; ester 0,25; su 0,25 mol",
    "Dengeye ulaşmayı hızlandırır; K’yı tek başına değiştirmez",
    "Ester oluşumu yönü desteklenebilir",
    "Esterin tek bağlı köprü O’sunda",
    "HCOOCH₃",
    "İşlevsel grup izomeridirler",
    "0,45 mol asit ve 0,45 mol etanol",
    "0,35",
    "12,0",
    "3 mol ester bağı; 3 mol su",
    "0,20 mol gliserol; 0,60 mol sabun",
    "CH₂–O–C(=O)–R",
    "Kendi arası O–H bağı veremez; sudan H bağı kabul edebilir",
    "Mum ve trigliserit ester; sabun karboksilat tuzu örneğidir",
  ],
];
describe("024 oxygen-containing organic chemistry", () => {
  it("covers exact five headings with positive teaching and self-contained guided original items", () => {
    expect(Object.values(forge024ChemistryTopics)).toEqual([
      "detail-455",
      "detail-456",
      "detail-457",
      "detail-458",
      "detail-459",
    ]);
    expect(lessons.map((l) => l.questions.length)).toEqual([
      20, 15, 20, 20, 20,
    ]);
    expect(
      forge024ChemistryGuides.reduce((n, g) => n + g.sections.length, 0),
    ).toBe(102);
    const questions = lessons.flatMap((l) => l.questions);
    expect(questions).toHaveLength(95);
    expect(new Set(questions.map((q) => q.id)).size).toBe(95);
    expect(new Set(questions.flatMap((q) => q.guidance!.steps)).size).toBe(285);
    for (const [group, l] of lessons.entries()) {
      expect(l.tags).toContain(`detail-${455 + group}`);
      expect(l.tags).not.toContain("soru-seti");
      expect(l.source.tr).toContain("özgün");
      expect(l.subjectId).toBe("ayt-kimya");
      for (const [i, q] of l.questions.entries()) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((x) => x.tr)).size).toBe(5);
        expect(q.options[q.answer].tr, q.id).toBe(keys[group][i]);
        expect(questionContentIssues(q), q.id).toEqual([]);
        expect(questionGuidanceSchema.safeParse(q.guidance).success, q.id).toBe(
          true,
        );
        expect(q.guidance!.steps).toHaveLength(3);
        expect(q.guidance!.optionReasons).toHaveLength(5);
        for (const [j, r] of q.guidance!.optionReasons.entries())
          expect(r.startsWith("Doğru."), `${q.id} option ${j}`).toBe(
            j === q.answer,
          );
        expect(q.guidance!.steps[0]).not.toBe(q.guidance!.knowledge[0]);
        expect(q.guidance!.steps[1]).not.toBe(q.guidance!.strategy);
      }
    }
    for (const g of forge024ChemistryGuides) {
      expect(g.examples).toHaveLength(5);
      expect(g.recall).toHaveLength(5);
      expect(g.objectives).toHaveLength(3);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(
          s.paragraphs.every((p) => p.length > 100),
          s.title,
        ).toBe(true);
      }
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.check.length).toBeGreaterThan(40);
        expect(e.pitfall.length).toBeGreaterThan(30);
        expect(questions.some((q) => q.prompt.tr === e.prompt)).toBe(false);
      }
    }
  });
  it("balances keys without a repeating period and moves each option reason with its option", () => {
    const qs = lessons.flatMap((l) => l.questions),
      answers = qs.map((q) => q.answer);
    expect(
      [0, 1, 2, 3, 4].map((a) => answers.filter((x) => x === a).length),
    ).toEqual([19, 19, 19, 19, 19]);
    for (let period = 1; period <= 20; period++)
      expect(
        answers.every((a, i) => i < period || a === answers[i - period]),
      ).toBe(false);
    const q = lessons[2].questions[16],
      pairs = Object.fromEntries(
        q.options.map((o, i) => [o.tr, q.guidance!.optionReasons[i]]),
      );
    expect(pairs["(5, 3)"]).toContain("Yük −1");
    expect(pairs["(4, 2)"]).toContain("Nötr asitli");
    expect(pairs["(3, 2)"]).toContain("Tollens");
    expect(pairs["(5, 2)"]).toContain("H ve O");
    expect(pairs["(2, 1)"]).toContain("+4");
    for (const l of lessons)
      expect(
        [0, 1, 2, 3, 4].map(
          (a) => l.questions.filter((q) => q.answer === a).length,
        ),
      ).toEqual(Array(5).fill(l.questions.length / 5));
  });
  it("derives literal formula, group and bond counts for independent structures", () => {
    const expected: Record<string, [string, number, number]> = {
      methanal: ["CH2O", 3, 1],
      ethanal: ["C2H4O", 6, 1],
      propanal: ["C3H6O", 9, 1],
      butanal: ["C4H8O", 12, 1],
      benzaldehyde: ["C7H6O", 14, 4],
      propanone: ["C3H6O", 9, 1],
      butanone: ["C4H8O", 12, 1],
      pentan2one: ["C5H10O", 15, 1],
      pentan3one: ["C5H10O", 15, 1],
      cyclohexanone: ["C6H10O", 17, 1],
    };
    for (const [kind, [formula, sigma, pi]] of Object.entries(expected)) {
      const r = analyse024(carbonylMolecule024(kind));
      expect(ascii(r.formula), kind).toBe(formula);
      expect(r.sigma, kind).toBe(sigma);
      expect(r.pi, kind).toBe(pi);
      expect(r.aldehydes.length + r.ketones.length).toBe(1);
    }
    const acids: Record<string, [string, number, number]> = {
      formic: ["CH2O2", 1, 0],
      acetic: ["C2H4O2", 1, 0],
      propionic: ["C3H6O2", 1, 0],
      benzoic: ["C7H6O2", 1, 0],
      lactic: ["C3H6O3", 1, 1],
      oxalic: ["C2H2O4", 2, 0],
      citric: ["C6H8O7", 3, 1],
      glycine: ["C2H5NO2", 1, 0],
    };
    for (const [kind, [formula, groups, alcohol]] of Object.entries(acids)) {
      const r = analyse024(acidMolecule024(kind));
      expect(ascii(r.formula), kind).toBe(formula);
      expect(r.acids).toHaveLength(groups);
      expect(r.alcohols).toHaveLength(alcohol);
      expect(r.esters).toHaveLength(0);
    }
  });
  it("conserves all atoms and total charge through every alcohol route and each viewing stage", () => {
    for (const route of Object.keys(alcoholRoutes024))
      for (const stage of [0, 1, 2])
        for (const amount of [1, 2, 3, 4]) {
          const r = alcoholReaction024(route, stage, amount);
          expect(r.balance.balanced, `${route}/${stage}/${amount}`).toBe(true);
          expect(r.visible.formula).toBe(
            stage === 2 ? r.product.formula : r.start.formula,
          );
          for (const a of r.visible.atoms)
            expect(r.visible.hydrogens[a.id]).toBeGreaterThanOrEqual(0);
        }
    expect(alcoholReaction024("propene", 2, 1).product.alcohols).toEqual([
      "oh",
    ]);
    expect(alcoholReaction024("propene", 2, 1).product.hydrogens.c1).toBe(1);
    expect(alcoholReaction024("tertiary", 2, 1).product.hydrogens.c1).toBe(0);
    expect(alcoholReaction024("tertiary", 2, 1).product.formula).toBe(
      alcoholReaction024("tertiary", 0, 1).start.formula,
    );
    expect(alcoholReaction024("sodium", 2, 1).product.charge).toBe(-1);
    expect(alcoholReaction024("ether", 2, 1).product.esters).toHaveLength(0);
  });
  it("enumerates straight ether models and independent alkane valences exactly", () => {
    for (let a = 1; a <= 4; a++)
      for (let b = 1; b <= 4; b++) {
        const r = ether024(a, b);
        expect(r.structure.counts).toEqual({
          C: a + b,
          H: 2 * (a + b) + 2,
          O: 1,
        });
        expect(r.sameFormula).toBe(true);
        expect(r.symmetric).toBe(a === b);
        expect(r.structure.pi).toBe(0);
        expect(r.structure.sigma).toBe(3 * (a + b) + 2);
        expect(r.structure.ethers).toHaveLength(1);
        expect(r.structure.alcohols).toHaveLength(0);
        expect(r.comparison.alcohols).toHaveLength(1);
      }
  });
  it("derives correct aldehyde test, product and ion balances for all selected substrates", () => {
    for (const kind of Object.keys(carbonylChoices024))
      for (const reagent of Object.keys(carbonylReagents024))
        for (let n = 1; n <= 4; n++) {
          const r = carbonyl024(kind, reagent, n);
          expect(r.balance.balanced, `${kind}/${reagent}/${n}`).toBe(true);
          expect(r.start.counts.C).toBe(r.product.counts.C);
          if (reagent === "reduction") {
            expect(r.product.counts.H - r.start.counts.H).toBe(2);
            expect(r.product.alcohols).toHaveLength(1);
          }
          if (["tollens", "fehling"].includes(reagent) && r.positive) {
            expect(r.product.charge).toBe(-1);
            expect(r.product.acids).toHaveLength(1);
            expect(r.metal).toBe(n * (reagent === "tollens" ? 2 : 1));
          }
        }
    expect(carbonyl024("benzaldehyde", "tollens", 1).positive).toBe(true);
    expect(carbonyl024("benzaldehyde", "fehling", 1).positive).toBe(false);
    expect(carbonyl024("butanal", "fehling", 1).positive).toBe(true);
    expect(carbonyl024("propanone", "tollens", 1).positive).toBe(false);
  });
  it("counts only carboxyl proton equivalents while preserving extra OH and amino groups", () => {
    for (const kind of Object.keys(acidChoices024))
      for (let n = 1; n <= 4; n++)
        for (const base of ["Na", "K"])
          for (
            let eq = 0;
            eq <= analyse024(acidMolecule024(kind)).acids.length;
            eq++
          ) {
            const r = acid024(kind, n, eq, base);
            expect(r.balance.balanced, `${kind}/${n}/${eq}/${base}`).toBe(true);
            expect(r.equivalents).toBe(n * eq);
            expect(r.product.charge).toBe(eq === 0 ? 0 : -eq);
            expect(r.start.counts.H - r.product.counts.H).toBe(eq);
            expect(r.start.alcohols.length).toBe(r.product.alcohols.length);
          }
    expect(acid024("lactic", 2, 1, "Na").equivalents).toBe(2);
    expect(acid024("glycine", 1, 1, "K").product.counts.N).toBe(1);
  });
  it("conserves three-mode ester inventories through all legal stock and extent combinations", () => {
    for (let a = 1; a <= 4; a++)
      for (let b = 1; b <= 4; b++)
        for (const mode of ["formation", "hydrolysis", "base"])
          for (let first = 1; first <= 4; first++)
            for (let second = 1; second <= 4; second++)
              for (let x = 0; x <= Math.min(first, second); x++) {
                const r = ester024(a, b, mode, first, second, x);
                expect(
                  r.balance.balanced,
                  `${a}/${b}/${mode}/${first}/${second}/${x}`,
                ).toBe(true);
                expect(r.ester.counts).toEqual({
                  C: a + b,
                  H: 2 * (a + b),
                  O: 2,
                });
                expect(r.ester.esters).toHaveLength(1);
                expect(r.ester.ethers).toHaveLength(0);
                expect(r.ester.alcohols).toHaveLength(0);
                expect(r.salt.charge).toBe(-1);
                expect(r.maximum).toBe(Math.min(first, second));
                expect(
                  r.left.every((t) => t.coefficient >= 0) &&
                    r.right.every((t) => t.coefficient >= 0),
                ).toBe(true);
                expect(
                  r.ester.atoms.find((x) => x.id === "ester-o")?.origin,
                ).toBe("alcohol");
              }
  });
  it("balances fatty triesters, glycerol and soaps without saturating chain double bonds", () => {
    for (const kind of Object.keys(fattyChoices024))
      for (let n = 1; n <= 4; n++)
        for (let x = 0; x <= n; x++)
          for (const base of ["Na", "K"]) {
            const r = triglyceride024(kind, n, x, base);
            expect(r.balance.balanced).toBe(true);
            expect(r.soap).toBe(3 * x);
            expect(r.glycerol).toBe(x);
            expect(r.baseUsed).toBe(3 * x);
            expect(r.salt.H).toBe(2 * r.carbons - 2 * r.doubles - 1);
          }
    expect(triglyceride024("stearic", 1, 1, "Na").fat).toEqual({
      C: 57,
      H: 110,
      O: 6,
    });
    expect(triglyceride024("oleic", 1, 1, "K").fat).toEqual({
      C: 57,
      H: 104,
      O: 6,
    });
  });
  it("rejects malformed API inputs instead of coercing values into chemistry", () => {
    for (const bad of [NaN, Infinity, -1, 0.5, "2", null, undefined]) {
      expect(() => ether024(bad as number, 1)).toThrow();
      expect(() => alcoholReaction024("hydration", 0, bad as number)).toThrow();
      expect(() => carbonyl024("propanal", "inspect", bad as number)).toThrow();
      expect(() => ester024(2, 2, "formation", 1, 1, bad as number)).toThrow();
    }
    for (const bad of ["", "__proto__", "constructor", "bad", null, 1]) {
      expect(() => carbonylMolecule024(bad as string)).toThrow();
      expect(() => acidMolecule024(bad as string)).toThrow();
      expect(() => triglyceride024(bad as string, 1, 0, "Na")).toThrow();
    }
    expect(() => acid024("citric", 1, 4, "Na")).toThrow();
    expect(() => ester024(1, 1, "formation", 1, 2, 2)).toThrow();
    expect(() => triglyceride024("oleic", 1, 2, "Na")).toThrow();
    expect(() => formula024({ F: 1 })).toThrow();
    expect(() => formula024({ C: -1 })).toThrow();
    expect(() =>
      balance024(
        [{ label: "x", counts: { C: 1 }, charge: 0, coefficient: -1 }],
        [],
      ),
    ).toThrow();
  });
  it("rejects invalid molecule graphs and distinguishes phenol-like OH from saturated alcohol", () => {
    const base = esterMolecule024(2, 2),
      bad = (change: (m: Molecule024) => void) => {
        const m = structuredClone(base);
        change(m);
        expect(() => analyse024(m)).toThrow();
      };
    bad((m) => m.atoms.push({ ...m.atoms[0] }));
    bad((m) => m.bonds.push({ ...m.bonds[0] }));
    bad((m) => (m.bonds[0].b = "missing"));
    bad((m) => (m.atoms[0].x = NaN));
    bad((m) => (m.atoms[0].charge = 1));
    bad((m) => (m.bonds[0].order = 3));
    bad((m) => m.atoms.push({ id: "lonely", element: "C", x: 100, y: 0 }));
    bad((m) => {
      m.atoms[1].x = m.atoms[0].x;
      m.atoms[1].y = m.atoms[0].y;
    });
    const enol: Molecule024 = {
      name: "enol",
      atoms: [
        { id: "a", element: "C", x: 0, y: 0 },
        { id: "b", element: "C", x: 40, y: 0 },
        { id: "o", element: "O", x: 0, y: 40 },
      ],
      bonds: [
        { a: "a", b: "b", order: 2 },
        { a: "a", b: "o", order: 1 },
      ],
    };
    expect(analyse024(enol).alcohols).toHaveLength(0);
  });
  it("classifies amide and anhydride counterexamples while preserving arbitrary atom identities", () => {
    const atom = (
      id: string,
      element: Molecule024["atoms"][number]["element"],
      x: number,
      y: number,
    ) => ({ id, element, x, y });
    const formamide: Molecule024 = {
      name: "Formamid",
      atoms: [
        atom("c", "C", 0, 0),
        atom("o", "O", 0, 40),
        atom("n", "N", 40, 0),
      ],
      bonds: [
        { a: "c", b: "o", order: 2 },
        { a: "c", b: "n", order: 1 },
      ],
    };
    expect(analyse024(formamide).formula).toBe("CH₃NO");
    expect(analyse024(formamide).aldehydes).toEqual([]);
    const anhydride: Molecule024 = {
      name: "Etanoik anhidrit",
      atoms: [
        atom("c0", "C", 0, 0),
        atom("c1", "C", 40, 0),
        atom("o0", "O", 40, 40),
        atom("bridge", "O", 80, 0),
        atom("c2", "C", 120, 0),
        atom("o1", "O", 120, 40),
        atom("c3", "C", 160, 0),
      ],
      bonds: [
        { a: "c0", b: "c1", order: 1 },
        { a: "c1", b: "o0", order: 2 },
        { a: "c1", b: "bridge", order: 1 },
        { a: "bridge", b: "c2", order: 1 },
        { a: "c2", b: "o1", order: 2 },
        { a: "c2", b: "c3", order: 1 },
      ],
    };
    expect(analyse024(anhydride).formula).toBe("C₄H₆O₃");
    expect(analyse024(anhydride).esters).toEqual([]);
    expect(analyse024(anhydride).ethers).toEqual([]);
    const proto: Molecule024 = {
      name: "Metanal",
      atoms: [atom("__proto__", "C", 0, 0), atom("o", "O", 0, 40)],
      bonds: [{ a: "__proto__", b: "o", order: 2 }],
    };
    const r = analyse024(proto);
    expect(r.hydrogens.__proto__).toBe(2);
    expect(r.aldehydes).toEqual(["__proto__"]);
    expect(r.formula).toBe("CH₂O");
    const collision: Molecule024 = {
      name: "Bütan",
      atoms: [
        atom("a|b", "C", 0, 0),
        atom("c", "C", 40, 0),
        atom("a", "C", 80, 0),
        atom("b|c", "C", 120, 0),
      ],
      bonds: [
        { a: "a|b", b: "c", order: 1 },
        { a: "c", b: "a", order: 1 },
        { a: "a", b: "b|c", order: 1 },
      ],
    };
    expect(analyse024(collision).formula).toBe("C₄H₁₀");
  });
  it("uses own counts and rejects unsafe atom or charge totals before rounding can hide imbalance", () => {
    const inherited = Object.assign(Object.create({ C: Infinity }), {
      H: 2,
      O: 1,
    });
    expect(formula024(inherited)).toBe("H₂O");
    const n = Number.MAX_SAFE_INTEGER;
    expect(() =>
      balance024(
        [
          {
            label: "left",
            counts: { C: n - 1 },
            coefficient: n - 1,
            charge: 0,
          },
        ],
        [{ label: "right", counts: { C: n }, coefficient: n - 2, charge: 0 }],
      ),
    ).toThrow("CHEM024_UNSAFE_TOTAL");
    expect(() =>
      balance024(
        [
          { label: "a", counts: { C: n }, coefficient: 1, charge: 0 },
          { label: "b", counts: { C: 1 }, coefficient: 1, charge: 0 },
        ],
        [],
      ),
    ).toThrow("CHEM024_UNSAFE_TOTAL");
    expect(() =>
      balance024(
        [{ label: "a", counts: { H: 1 }, coefficient: 2, charge: n }],
        [],
      ),
    ).toThrow("CHEM024_UNSAFE_TOTAL");
    expect(() => ester024(0, 1, "formation", 1, 1, 0)).toThrow(RangeError);
    expect(() => ester024(1, 0, "base", 1, 1, 0)).toThrow(RangeError);
  });
  it("normalizes invalid persisted menus, dependent bounds and stale predictions together", () => {
    expect(
      normalizeChemistry024({
        ...chemistryDefaults024,
        first: 1,
        second: 2,
        extent: 4,
        fatAmount: 2,
        fatExtent: 4,
        acid: "formic",
        neutralized: 3,
        guess: "water",
        reason: "Önceki koşul",
        checked: true,
        show: true,
      }),
    ).toMatchObject({
      first: 1,
      extent: 1,
      fatAmount: 2,
      fatExtent: 2,
      neutralized: 1,
      guess: "",
      reason: "",
      checked: false,
      show: false,
    });
    expect(
      normalizeChemistry024({
        ...chemistryDefaults024,
        route: "__proto__",
        amount: Infinity,
        left: "3",
        base: "Li",
      }),
    ).toMatchObject({ route: "hydration", amount: 1, left: 1, base: "Na" });
  });
  it("renders each model preset with real bond geometry and all selected states using controlled SSR", () => {
    const key = (id: string) => "forge024:chemistry:" + id,
      states: Record<string, Record<string, string | number | boolean>[]> =
        Object.fromEntries(lessons.map((l) => [l.id, [{}]]));
    states[lessons[0].id] = Object.keys(alcoholRoutes024).flatMap((route) =>
      [0, 1, 2].map((stage) => ({ route, stage, amount: 2 })),
    );
    states[lessons[1].id] = Array.from({ length: 16 }, (_, i) => ({
      left: 1 + Math.floor(i / 4),
      right: 1 + (i % 4),
    }));
    states[lessons[2].id] = Object.keys(carbonylChoices024).flatMap(
      (carbonyl) =>
        Object.keys(carbonylReagents024).map((reagent) => ({
          carbonyl,
          reagent,
          amount: 2,
        })),
    );
    states[lessons[3].id] = Object.keys(acidChoices024).flatMap((acid) =>
      Array.from(
        { length: analyse024(acidMolecule024(acid)).acids.length + 1 },
        (_, neutralized) => ({ acid, neutralized, amount: 2 }),
      ),
    );
    states[lessons[4].id] = [
      ...["formation", "hydrolysis", "base"].flatMap((esterMode) =>
        [0, 1, 2].map((extent) => ({ esterMode, extent, first: 2, second: 3 })),
      ),
      ...Object.keys(fattyChoices024).flatMap((fatty) =>
        [0, 1, 2].map((fatExtent) => ({
          esterView: "fat",
          fatty,
          fatAmount: 2,
          fatExtent,
        })),
      ),
    ];
    for (const [id, presets] of Object.entries(states))
      for (const state of presets) {
        fixtures.values[key(id)] = state;
        const html = renderToStaticMarkup(createElement(Lab, { lessonId: id }));
        expect(html).toContain(`data-forge024="${id}"`);
        expect(html).toContain("data-model-result");
        expect(html).toContain("<svg");
        expect(html).not.toMatch(/NaN|Infinity|undefined|foreignObject/);
        expect(html).toContain("Gerekçen");
        expect(html).toContain('disabled=""');
      }
    fixtures.values = {};
    expect(fixtures.set).not.toHaveBeenCalled();
  });
  it("never presents an empty or invalid stored answer as a successful comparison", () => {
    const id = lessons[2].id,
      key = "forge024:chemistry:" + id;
    fixtures.values[key] = {
      carbonyl: "bad",
      reagent: "bad",
      amount: NaN,
      guess: "aldehyde",
      reason: "Önceden yazılan gerekçe",
      checked: true,
      show: true,
    };
    let html = renderToStaticMarkup(createElement(Lab, { lessonId: id }));
    expect(html).not.toContain("Kanıtla uyumlu.");
    expect(html).not.toContain("Kanıtı kapat");
    fixtures.values[key] = {
      guess: "invalid",
      reason: "Bir bağ gerekçesi",
      checked: true,
    };
    html = renderToStaticMarkup(createElement(Lab, { lessonId: id }));
    expect(html).not.toContain("Kanıtla uyumlu.");
    fixtures.values[key] = {
      guess: "aldehyde",
      reason: "Karbonil C, H taşır.",
      checked: true,
    };
    html = renderToStaticMarkup(createElement(Lab, { lessonId: id }));
    expect(html).toContain("Kanıtla uyumlu.");
    expect(html).toContain("Yazılı gerekçe için otomatik not yoktur.");
    fixtures.values = {};
  });
  it("recovers corrupt stored fields and actually clicks compare with a short nonblank reason", () => {
    const id = lessons[2].id,
      k = "forge024:chemistry:" + id;
    fixtures.values[k] = {
      carbonyl: "constructor",
      esterView: "constructor",
      guess: "ketone",
      reason: "Eski yanıt",
      checked: true,
      show: true,
    };
    const render = () => callbackNodes(Lab({ lessonId: id }));
    const guess = render().find(
      (n) => n.props.label === "Başlangıç karbonilinin sınıfı",
    )!;
    expect(guess.props.value).toBe("");
    guess.props.onChange!("aldehyde");
    expect(fixtures.values[k]).toMatchObject({
      carbonyl: "propanal",
      esterView: "simple",
      guess: "aldehyde",
      reason: "",
      checked: false,
      show: false,
    });
    render().find((n) => n.type === "input")!.props.onChange!({
      target: { value: "CHO" },
    });
    const button = render().find(
      (n) => n.type === "button" && n.props.children === "Kıyasla",
    )!;
    expect(button.props.disabled).toBe(false);
    button.props.onClick!();
    expect(fixtures.values[k].checked).toBe(true);
    expect(
      renderToStaticMarkup(createElement(Lab, { lessonId: id })),
    ).toContain("Kanıtla uyumlu.");
    render().find((n) => n.props.label === "Ayıraç veya işlem")!.props
      .onChange!("reduction");
    expect(fixtures.values[k]).toMatchObject({
      reagent: "reduction",
      guess: "",
      reason: "",
      checked: false,
      show: false,
    });
    fixtures.values = {};
    fixtures.set.mockClear();
  });
});

describe("024 raw restore type boundary", () => {
  it("closes stale feedback before the real typeof-filter defaults and recovers on the first action", () => {
    const groups: [
      string,
      Record<string, string | number | boolean>,
      string[],
    ][] = [
      ["ayt-alkol-eldesi-tepkimeleri", {}, ["route", "stage", "amount"]],
      ["ayt-eterler", {}, ["left", "right"]],
      ["ayt-aldehit-keton", {}, ["carbonyl", "reagent", "amount"]],
      [
        "ayt-karboksilik-asitler",
        {},
        ["acid", "amount", "neutralized", "base"],
      ],
      [
        "ayt-esterler",
        {},
        [
          "esterView",
          "acidCarbons",
          "alcoholCarbons",
          "esterMode",
          "first",
          "second",
          "extent",
        ],
      ],
      [
        "ayt-esterler",
        { esterView: "fat" },
        ["fatty", "fatAmount", "fatExtent", "base"],
      ],
    ];
    for (const [id, patch, fields] of groups)
      for (const field of fields) {
        const k = "forge024:chemistry:" + id,
          defaults = chemistryDefaults024 as Record<
            string,
            string | number | boolean
          >;
        fixtures.values[k] = {
          ...chemistryDefaults024,
          ...patch,
          guess: "aldehyde",
          reason: "Eski",
          checked: true,
          show: true,
          [field]: typeof defaults[field] === "number" ? "bad" : 42,
        };
        const render = () => callbackNodes(Lab({ lessonId: id }));
        expect(
          renderToStaticMarkup(createElement(Lab, { lessonId: id })),
        ).not.toContain('role="status"');
        const prediction = render()
          .filter((n) => typeof n.type === "function" && n.props.onChange)
          .at(-1)!;
        expect(prediction.props.value).toBe("");
        const options = (
          prediction.props as ProbeProps & { options: Record<string, string> }
        ).options;
        prediction.props.onChange!(Object.keys(options).find((k) => k !== "")!);
        expect(typeof fixtures.values[k][field]).toBe(typeof defaults[field]);
        render().find((n) => n.type === "input")!.props.onChange!({
          target: { value: "O" },
        });
        const button = render().find(
          (n) => n.type === "button" && n.props.children === "Kıyasla",
        )!;
        expect(button.props.disabled).toBe(false);
        button.props.onClick!();
        expect(
          renderToStaticMarkup(createElement(Lab, { lessonId: id })),
        ).toContain('role="status"');
        fixtures.values = {};
      }
    fixtures.set.mockClear();
  });
  it("does not invalidate an active valid model for an inactive wrong-type field", () => {
    const id = "ayt-aldehit-keton",
      k = "forge024:chemistry:" + id;
    fixtures.values[k] = {
      ...chemistryDefaults024,
      esterView: 42,
      guess: "aldehyde",
      reason: "CHO",
      checked: true,
    };
    expect(
      renderToStaticMarkup(createElement(Lab, { lessonId: id })),
    ).toContain("Kanıtla uyumlu.");
    fixtures.values = {};
    fixtures.set.mockClear();
  });
});
