import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

export type Atom024 = {
  id: string;
  element: "C" | "O" | "N" | "Cl";
  x: number;
  y: number;
  charge?: -1 | 0 | 1;
  origin?: "acid" | "alcohol";
};
export type Bond024 = { a: string; b: string; order: 1 | 2 | 3 };
export type Molecule024 = { atoms: Atom024[]; bonds: Bond024[]; name: string };
export type Counts024 = Record<string, number>;
function choice024(
  value: unknown,
  choices: readonly string[],
): asserts value is string {
  if (typeof value !== "string" || !choices.includes(value))
    throw new RangeError("CHEM024_CHOICE");
}
function integer024(
  value: unknown,
  min: number,
  max: number,
): asserts value is number {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < min ||
    value > max
  )
    throw new RangeError("CHEM024_INTEGER");
}
const sub024 = (n: number) =>
  String(n).replace(/\d/g, (s) => "₀₁₂₃₄₅₆₇₈₉"[Number(s)]);
export function formula024(counts: Counts024) {
  if (
    !counts ||
    typeof counts !== "object" ||
    Array.isArray(counts) ||
    Object.entries(counts).some(
      ([e, n]) =>
        !["C", "H", "N", "O", "Cl", "Na", "K", "Ag", "Cu"].includes(e) ||
        !Number.isSafeInteger(n) ||
        n < 0,
    )
  )
    throw new RangeError("CHEM024_COUNTS");
  return [
    "C",
    "H",
    ...Object.keys(counts)
      .filter((x) => x !== "C" && x !== "H")
      .sort(),
  ]
    .filter((e) => Object.hasOwn(counts, e) && counts[e] > 0)
    .map((e) => e + (counts[e] === 1 ? "" : sub024(counts[e])))
    .join("");
}
export function analyse024(molecule: Molecule024) {
  if (
    !molecule ||
    typeof molecule.name !== "string" ||
    !Array.isArray(molecule.atoms) ||
    !Array.isArray(molecule.bonds) ||
    !molecule.atoms.length ||
    molecule.atoms.length > 80
  )
    throw new RangeError("CHEM024_STRUCTURE");
  const byId = new Map<string, Atom024>();
  for (const a of molecule.atoms) {
    if (
      !a ||
      typeof a.id !== "string" ||
      !a.id ||
      byId.has(a.id) ||
      !["C", "O", "N", "Cl"].includes(a.element) ||
      !Number.isFinite(a.x) ||
      !Number.isFinite(a.y) ||
      Math.abs(a.x) > 1e4 ||
      Math.abs(a.y) > 1e4 ||
      ![undefined, -1, 0, 1].includes(a.charge) ||
      (a.charge &&
        !(
          (a.element === "O" && a.charge === -1) ||
          (a.element === "N" && a.charge === 1)
        ))
    )
      throw new RangeError("CHEM024_ATOM");
    if (a.origin !== undefined && a.origin !== "acid" && a.origin !== "alcohol")
      throw new RangeError("CHEM024_ORIGIN");
    byId.set(a.id, a);
  }
  const used = new Map(molecule.atoms.map((a) => [a.id, 0])),
    edges = new Set<string>();
  let sigma = 0,
    pi = 0;
  const adjacency = new Map(molecule.atoms.map((a) => [a.id, [] as string[]]));
  for (const b of molecule.bonds) {
    if (!b || typeof b.a !== "string" || typeof b.b !== "string")
      throw new RangeError("CHEM024_BOND");
    const a = byId.get(b.a),
      c = byId.get(b.b),
      edge = JSON.stringify([b.a, b.b].sort());
    if (
      !a ||
      !c ||
      a.id === c.id ||
      edges.has(edge) ||
      ![1, 2, 3].includes(b.order)
    )
      throw new RangeError("CHEM024_BOND");
    const length = Math.hypot(a.x - c.x, a.y - c.y);
    if (!Number.isFinite(length) || length < 1e-6)
      throw new RangeError("CHEM024_BOND_LENGTH");
    edges.add(edge);
    used.set(a.id, used.get(a.id)! + b.order);
    used.set(c.id, used.get(c.id)! + b.order);
    adjacency.get(a.id)!.push(c.id);
    adjacency.get(c.id)!.push(a.id);
    sigma++;
    pi += b.order - 1;
  }
  const seen = new Set<string>(),
    queue = [molecule.atoms[0].id];
  while (queue.length) {
    const id = queue.pop()!;
    if (seen.has(id)) continue;
    seen.add(id);
    queue.push(...adjacency.get(id)!);
  }
  if (seen.size !== molecule.atoms.length)
    throw new RangeError("CHEM024_DISCONNECTED");
  const counts: Counts024 = Object.create(null),
    hydrogens: Record<string, number> = Object.create(null);
  let charge = 0;
  for (const a of molecule.atoms) {
    const valence =
      a.element === "C"
        ? 4
        : a.element === "O"
          ? a.charge === -1
            ? 1
            : 2
          : a.element === "N"
            ? a.charge === 1
              ? 4
              : 3
            : 1;
    const h = valence - used.get(a.id)!;
    if (!Number.isInteger(h) || h < 0) throw new RangeError("CHEM024_VALENCE");
    counts[a.element] = (counts[a.element] ?? 0) + 1;
    counts.H = (counts.H ?? 0) + h;
    hydrogens[a.id] = h;
    sigma += h;
    charge += a.charge ?? 0;
  }
  const bonded = (id: string, e: string, order?: number) =>
    molecule.bonds
      .filter(
        (b) => (b.a === id || b.b === id) && (!order || b.order === order),
      )
      .map((b) => byId.get(b.a === id ? b.b : b.a)!)
      .filter((a) => a.element === e);
  const carbonyl = molecule.atoms.filter(
    (a) => a.element === "C" && bonded(a.id, "O", 2).length,
  );
  const acids = carbonyl.filter(
    (a) =>
      (hydrogens[a.id] >= 1 || bonded(a.id, "C", 1).length === 1) &&
      bonded(a.id, "O", 1).some(
        (o) => hydrogens[o.id] === 1 || o.charge === -1,
      ),
  );
  const esters = carbonyl.filter(
    (a) =>
      (hydrogens[a.id] >= 1 || bonded(a.id, "C", 1).length === 1) &&
      bonded(a.id, "O", 1).some(
        (o) =>
          bonded(o.id, "C", 1).length === 2 &&
          bonded(o.id, "C", 1).every(
            (c) => c.id === a.id || !carbonyl.includes(c),
          ),
      ),
  );
  const aldehydes = carbonyl.filter(
    (a) =>
      !acids.includes(a) &&
      !esters.includes(a) &&
      hydrogens[a.id] >= 1 &&
      molecule.bonds
        .filter((b) => (b.a === a.id || b.b === a.id) && b.order === 1)
        .every((b) => byId.get(b.a === a.id ? b.b : b.a)!.element === "C"),
  );
  const ketones = carbonyl.filter(
    (a) =>
      !acids.includes(a) &&
      !esters.includes(a) &&
      bonded(a.id, "C").length === 2,
  );
  const alcohols = molecule.atoms.filter(
    (a) =>
      a.element === "O" &&
      hydrogens[a.id] === 1 &&
      bonded(a.id, "C", 1).some(
        (c) =>
          !molecule.bonds.some(
            (b) => (b.a === c.id || b.b === c.id) && b.order > 1,
          ),
      ),
  );
  const ethers = molecule.atoms.filter(
    (a) =>
      a.element === "O" &&
      bonded(a.id, "C", 1).length === 2 &&
      !bonded(a.id, "C", 1).some((c) => carbonyl.includes(c)),
  );
  return {
    ...molecule,
    counts,
    formula: formula024(counts),
    charge,
    hydrogens,
    sigma,
    pi,
    acids: acids.map((a) => a.id),
    esters: esters.map((a) => a.id),
    aldehydes: aldehydes.map((a) => a.id),
    ketones: ketones.map((a) => a.id),
    alcohols: alcohols.map((a) => a.id),
    ethers: ethers.map((a) => a.id),
  };
}
const alkaneNames024 = [
  "",
  "metan",
  "etan",
  "propan",
  "bütan",
  "pentan",
  "hekzan",
  "heptan",
  "oktan",
];
const alkylNames024 = ["", "metil", "etil", "propil", "bütil"];
const acidNames024 = [
  "",
  "metanoik asit",
  "etanoik asit",
  "propanoik asit",
  "bütanoik asit",
];
function chain024(
  n: number,
  name = "",
  prefix = "c",
  x = 28,
  y = 125,
): Molecule024 {
  const atoms: Atom024[] = Array.from({ length: n }, (_, i) => ({
    id: prefix + i,
    element: "C",
    x: x + i * 44,
    y: y + (i % 2 ? 18 : 0),
  }));
  return {
    name,
    atoms,
    bonds: atoms
      .slice(1)
      .map((a, i) => ({ a: atoms[i].id, b: a.id, order: 1 })),
  };
}
function attach024(
  m: Molecule024,
  parent: string,
  element: Atom024["element"],
  id: string,
  dx = 0,
  dy = -52,
  order: Bond024["order"] = 1,
  origin?: Atom024["origin"],
) {
  const p = m.atoms.find((a) => a.id === parent)!;
  m.atoms.push({ id, element, x: p.x + dx, y: p.y + dy, origin });
  m.bonds.push({ a: parent, b: id, order });
  return m;
}
function alcohol024(n: number, position = 0, name = "") {
  return attach024(
    chain024(
      n,
      name || (n === 1 ? "Metanol" : `${position + 1}-${alkaneNames024[n]}ol`),
    ),
    "c" + position,
    "O",
    "oh",
  );
}
function carbonylChain024(n: number, position: number, name: string) {
  return attach024(
    chain024(n, name),
    "c" + position,
    "O",
    "carbonyl",
    0,
    -52,
    2,
  );
}
function acidChain024(n: number, name = acidNames024[n]) {
  const m = carbonylChain024(n, 0, name);
  m.atoms.find((a) => a.id === "carbonyl")!.origin = "acid";
  return attach024(m, "c0", "O", "acid-oh", -5, 55, 1, "acid");
}
function ring024(n: number, name: string, aromatic = false): Molecule024 {
  const atoms: Atom024[] = Array.from({ length: n }, (_, i) => ({
    id: "c" + i,
    element: "C",
    x: 165 + 64 * Math.cos((i * 2 * Math.PI) / n),
    y: 135 + 64 * Math.sin((i * 2 * Math.PI) / n),
  }));
  return {
    name,
    atoms,
    bonds: atoms.map((a, i) => ({
      a: a.id,
      b: atoms[(i + 1) % n].id,
      order: aromatic && i % 2 === 0 ? 2 : 1,
    })),
  };
}
function arylCarbonyl024(type: "aldehyde" | "acid") {
  const m = ring024(6, type === "acid" ? "Benzoik asit" : "Benzaldehit", true);
  attach024(m, "c0", "C", "acyl", 55, 0);
  attach024(m, "acyl", "O", "carbonyl", 0, -55, 2);
  if (type === "acid") attach024(m, "acyl", "O", "acid-oh", 0, 55);
  return m;
}
export function ether024(left: number, right: number) {
  integer024(left, 1, 4);
  integer024(right, 1, 4);
  const small = Math.min(left, right),
    big = Math.max(left, right),
    alkoxy = ["", "metoksi", "etoksi", "propoksi", "bütoksi"][small];
  const m = chain024(
    left,
    (big > 2 ? "1-" : "") + alkoxy + alkaneNames024[big],
    "l",
  );
  const last = m.atoms.at(-1)!;
  attach024(m, last.id, "O", "ether-o", 44, last.y === 125 ? 18 : -18);
  const o = m.atoms.at(-1)!;
  const r = chain024(right, "", "r", o.x + 44, o.y === 125 ? 143 : 125);
  m.bonds.push({ a: "ether-o", b: "r0", order: 1 });
  m.atoms.push(...r.atoms);
  m.bonds.push(...r.bonds);
  const structure = analyse024(m),
    comparison = analyse024(
      alcohol024(left + right, 0, `1-${alkaneNames024[left + right]}ol`),
    );
  return {
    structure,
    comparison,
    left,
    right,
    symmetric: left === right,
    decision: left === right ? "Simetrik eter" : "Asimetrik eter",
    explanation:
      "Modelde iki yan dal da düz alkildir. Aynı karbon sayısına sahip bu iki düz dal özdeştir. Dallanmış gruplarda yalnız karbon sayısı simetriyi kanıtlamaz.",
    sameFormula: structure.formula === comparison.formula,
  };
}
export const carbonylChoices024 = {
  methanal: "Metanal",
  ethanal: "Etanal",
  propanal: "Propanal",
  butanal: "Bütanal",
  benzaldehyde: "Benzaldehit",
  propanone: "Propanon",
  butanone: "Bütanon",
  pentan2one: "2-Pentanon",
  pentan3one: "3-Pentanon",
  cyclohexanone: "Siklohekzanon",
} as const;
export function carbonylMolecule024(kind: string): Molecule024 {
  choice024(kind, Object.keys(carbonylChoices024));
  if (kind === "benzaldehyde") return arylCarbonyl024("aldehyde");
  if (kind === "cyclohexanone")
    return attach024(
      ring024(6, "Siklohekzanon"),
      "c0",
      "O",
      "carbonyl",
      55,
      0,
      2,
    );
  const map: Record<string, [number, number]> = {
    methanal: [1, 0],
    ethanal: [2, 0],
    propanal: [3, 0],
    butanal: [4, 0],
    propanone: [3, 1],
    butanone: [4, 1],
    pentan2one: [5, 1],
    pentan3one: [5, 2],
  };
  const [n, p] = map[kind];
  return carbonylChain024(
    n,
    p,
    carbonylChoices024[kind as keyof typeof carbonylChoices024],
  );
}
export const acidChoices024 = {
  formic: "Formik asit",
  acetic: "Asetik asit",
  propionic: "Propanoik asit",
  benzoic: "Benzoik asit",
  lactic: "Laktik asit",
  oxalic: "Oksalik asit",
  citric: "Sitrik asit",
  glycine: "Glisin",
} as const;
export function acidMolecule024(kind: string): Molecule024 {
  choice024(kind, Object.keys(acidChoices024));
  if (kind === "benzoic") return arylCarbonyl024("acid");
  if (["formic", "acetic", "propionic"].includes(kind))
    return acidChain024(
      { formic: 1, acetic: 2, propionic: 3 }[
        kind as "formic" | "acetic" | "propionic"
      ],
      acidChoices024[kind as keyof typeof acidChoices024],
    );
  if (kind === "lactic")
    return attach024(
      acidChain024(3, "Laktik asit"),
      "c1",
      "O",
      "extra-oh",
      0,
      55,
    );
  if (kind === "glycine")
    return attach024(acidChain024(2, "Glisin"), "c1", "N", "amino", 0, 55);
  if (kind === "oxalic") {
    const m = acidChain024(2, "Oksalik asit");
    attach024(m, "c1", "O", "carbonyl-2", 0, -52, 2);
    return attach024(m, "c1", "O", "acid-oh-2", 0, 55);
  }
  const m = chain024(3, "Sitrik asit", "central", 90, 125);
  attach024(m, "central1", "O", "extra-oh", 0, 58);
  for (const [i, dx, dy] of [
    [0, -55, -28],
    [1, 0, -65],
    [2, 55, -28],
  ]) {
    const id = "acid-c" + i;
    attach024(m, "central" + i, "C", id, dx, dy);
    attach024(m, id, "O", "carbonyl-" + i, i === 1 ? -35 : 0, -45, 2);
    attach024(m, id, "O", "acid-oh-" + i, i === 1 ? 35 : 0, i === 1 ? -45 : 45);
  }
  return m;
}
function carbonylReduced024(molecule: Molecule024) {
  const m = structuredClone(molecule);
  const bond = m.bonds.find(
    (b) =>
      b.order === 2 &&
      [b.a, b.b].some(
        (id) => m.atoms.find((a) => a.id === id)?.element === "O",
      ),
  )!;
  bond.order = 1;
  m.name += " → alkol";
  return m;
}
function carbonylOxidized024(molecule: Molecule024, basic: boolean) {
  const m = structuredClone(molecule),
    info = analyse024(m),
    c = info.aldehydes[0];
  if (!c) return m;
  attach024(m, c, "O", "new-acid-o", 0, 55);
  if (basic) m.atoms.at(-1)!.charge = -1;
  m.name += basic ? " → karboksilat" : " → karboksilik asit";
  return m;
}
export type Term024 = {
  label: string;
  counts: Counts024;
  charge: number;
  coefficient: number;
};
function term024(m: Molecule024, coefficient = 1): Term024 {
  const a = analyse024(m);
  return { label: a.formula, counts: a.counts, charge: a.charge, coefficient };
}
function aux024(
  label: string,
  counts: Counts024,
  coefficient = 1,
  charge = 0,
): Term024 {
  return { label, counts, coefficient, charge };
}
export function balance024(left: Term024[], right: Term024[]) {
  if (!Array.isArray(left) || !Array.isArray(right))
    throw new RangeError("CHEM024_TERMS");
  for (const t of [...left, ...right]) {
    if (
      !t ||
      !Number.isSafeInteger(t.coefficient) ||
      t.coefficient < 0 ||
      !Number.isSafeInteger(t.charge)
    )
      throw new RangeError("CHEM024_TERM");
    formula024(t.counts);
  }
  const sum = (terms: Term024[]) =>
    terms.reduce(
      (out, t) => {
        for (const [e, n] of [
          ...Object.entries(t.counts),
          ["charge", t.charge] as const,
        ]) {
          const product = n * t.coefficient,
            total = (out[e] ?? 0) + product;
          if (!Number.isSafeInteger(product) || !Number.isSafeInteger(total))
            throw new RangeError("CHEM024_UNSAFE_TOTAL");
          out[e] = total;
        }
        return out;
      },
      Object.create(null) as Counts024,
    );
  const a = sum(left),
    b = sum(right),
    elements = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort();
  return {
    left: a,
    right: b,
    elements,
    balanced: elements.every((e) => Math.abs((a[e] ?? 0) - (b[e] ?? 0)) < 1e-9),
  };
}
export const carbonylReagents024 = {
  inspect: "Yapıyı incele",
  oxidation: "Yükseltgenme",
  reduction: "İndirgenme",
  tollens: "Tollens",
  fehling: "Fehling",
} as const;
export function carbonyl024(kind: string, reagent: string, amount: number) {
  choice024(reagent, Object.keys(carbonylReagents024));
  integer024(amount, 1, 4);
  const start = carbonylMolecule024(kind),
    info = analyse024(start),
    aldehyde = info.aldehydes.length > 0;
  const positive =
    aldehyde && !(kind === "benzaldehyde" && reagent === "fehling");
  let product = structuredClone(start),
    decision = aldehyde ? "Aldehit" : "Keton",
    explanation = "Karbonil karbonuna doğrudan bağlı atomlar sınıfı belirler.",
    metal = 0;
  let left = [term024(start, amount)],
    right = [term024(start, amount)];
  if (reagent === "reduction") {
    product = carbonylReduced024(start);
    decision =
      kind === "methanal"
        ? "Metanol oluşur"
        : aldehyde
          ? "Primer alkol oluşur"
          : "Sekonder alkol oluşur";
    left.push(aux024("H₂", { H: 2 }, amount));
    right = [term024(product, amount)];
    explanation =
      "C=O bağı C–OH bağına dönüşür; her karbonile toplam iki H eklenir. H₂ gösterimi net hidrojen hesabıdır; NaBH₄ gibi indirgenlerin gerçek hidrit/proton aktarımı ayrıca farklıdır.";
  } else if (reagent === "oxidation" && aldehyde) {
    product = carbonylOxidized024(start, false);
    decision = "Karboksilik asit oluşur";
    left.push(aux024("[O]", { O: 1 }, amount));
    right = [term024(product, amount)];
    explanation =
      "Aldehit karbonuna bağlı H korunmuş karbon iskeletinde OH ile yer değiştirir; bir O eşdeğeri eklenir. Model ilk yükseltgenme basamağını gösterir.";
  } else if (reagent === "tollens" || reagent === "fehling") {
    decision = positive
      ? reagent === "tollens"
        ? "Gümüş oluşur"
        : "Cu₂O oluşur"
      : "Bu ayıraçla pozitif sonuç yok";
    if (positive) {
      product = carbonylOxidized024(start, true);
      right = [term024(product, amount)];
      if (reagent === "tollens") {
        metal = 2 * amount;
        left.push(
          aux024("[Ag(NH₃)₂]⁺", { Ag: 1, N: 2, H: 6 }, 2 * amount, 1),
          aux024("OH⁻", { O: 1, H: 1 }, 3 * amount, -1),
        );
        right.push(
          aux024("Ag", { Ag: 1 }, 2 * amount),
          aux024("NH₃", { N: 1, H: 3 }, 4 * amount),
          aux024("H₂O", { H: 2, O: 1 }, 2 * amount),
        );
      } else {
        metal = amount;
        left.push(
          aux024("Cu²⁺", { Cu: 1 }, 2 * amount, 2),
          aux024("OH⁻", { O: 1, H: 1 }, 5 * amount, -1),
        );
        right.push(
          aux024("Cu₂O", { Cu: 2, O: 1 }, amount),
          aux024("H₂O", { H: 2, O: 1 }, 3 * amount),
        );
      }
      explanation =
        "Ayıraç indirgenirken aldehit yükseltgenir. Ortam bazik olduğu için doğrudan organik ürün karboksilattır. Burada yalnız bir aldehit grubunun ilk yükseltgenme basamağı sayılır; formaldehit/formiatın ileri yükseltgenmesi bu miktarın dışındadır.";
    } else
      explanation =
        kind === "benzaldehyde"
          ? "Benzaldehit aromatik aldehittir: Tollens pozitif olabilirken olağan Fehling testinde pozitif sonuç beklenmez. Aldehitleri her ayıraç için tek kurala indirmeyiz."
          : "Seçili basit ketonda aldehidik H yoktur; olağan Tollens ve Fehling koşullarında pozitif test beklenmez. Bazı başka işlevli hidroksi ketonların özel davranışı bu modelde yoktur.";
  } else if (reagent === "oxidation") {
    decision = "Olağan koşulda yükseltgenme yok";
    explanation =
      "Basit ketonlar olağan hafif yükseltgenmeyle aynı karbon sayılı aside dönüşmez. Çok sert koşullarda C–C kırılması ayrı kimyadır.";
  }
  return {
    kind,
    reagent,
    amount,
    start: info,
    product: analyse024(product),
    aldehyde,
    positive,
    metal,
    decision,
    explanation,
    left,
    right,
    balance: balance024(left, right),
  };
}
export function acid024(
  kind: string,
  amount: number,
  neutralized: number,
  base: string,
) {
  choice024(base, ["Na", "K"]);
  integer024(amount, 1, 4);
  const start = acidMolecule024(kind),
    info = analyse024(start);
  integer024(neutralized, 0, info.acids.length);
  const product = structuredClone(start);
  for (const c of info.acids.slice(0, neutralized)) {
    const b = product.bonds.find(
      (b) =>
        b.order === 1 &&
        (b.a === c || b.b === c) &&
        product.atoms.find((a) => a.id === (b.a === c ? b.b : b.a))?.element ===
          "O",
    )!;
    product.atoms.find((a) => a.id === (b.a === c ? b.b : b.a))!.charge = -1;
  }
  const count = amount * neutralized,
    salt = analyse024(product),
    left = [term024(start, amount)],
    right = [term024(product, amount)];
  if (count) {
    left.push(aux024(base + "OH", { [base]: 1, O: 1, H: 1 }, count));
    right.push(
      aux024(base + "⁺", { [base]: 1 }, count, 1),
      aux024("H₂O", { H: 2, O: 1 }, count),
    );
  }
  return {
    kind,
    amount,
    neutralized,
    base,
    start: info,
    product: salt,
    equivalents: count,
    left,
    right,
    balance: balance024(left, right),
    decision:
      neutralized === 0
        ? "Karboksil H’leri korunuyor"
        : neutralized === info.acids.length
          ? "Karboksiller tam nötrleşti"
          : "Kısmi nötrleşme",
    explanation:
      "Her seçili karboksil grubu bir OH⁻ ile bir H₂O oluşturur. Görüntü bir formal rezonans katkısıdır; gerçek karboksilatın yükü iki O arasında dağılır. Seçilen grup sayısı atom hesabıdır; gerçek pH, pKa veya karışım dağılımı hesaplanmaz. Glisinin amino grubunun ve ek hidroksillerin ayrıntılı asit-baz dengesi ayrı tutulur.",
  };
}
export function esterMolecule024(acidCarbons: number, alcoholCarbons: number) {
  integer024(acidCarbons, 1, 4);
  integer024(alcoholCarbons, 1, 4);
  const m = acidChain024(
    acidCarbons,
    `${alkylNames024[alcoholCarbons]} ${acidNames024[acidCarbons].replace("oik asit", "oat")}`,
  );
  const oxygen = m.atoms.find((a) => a.id === "acid-oh")!;
  oxygen.id = "ester-o";
  oxygen.origin = "alcohol";
  m.bonds.find((b) => b.b === "acid-oh")!.b = "ester-o";
  oxygen.x = 28;
  oxygen.y = 195;
  const r = chain024(alcoholCarbons, "", "r", 72, 205);
  m.atoms.push(...r.atoms);
  m.bonds.push({ a: oxygen.id, b: "r0", order: 1 }, ...r.bonds);
  return m;
}
export function ester024(
  acidCarbons: number,
  alcoholCarbons: number,
  mode: string,
  first: number,
  second: number,
  extent: number,
) {
  integer024(acidCarbons, 1, 4);
  integer024(alcoholCarbons, 1, 4);
  choice024(mode, ["formation", "hydrolysis", "base"]);
  integer024(first, 1, 6);
  integer024(second, 1, 6);
  integer024(extent, 0, Math.min(first, second));
  const acid = acidChain024(acidCarbons),
    alcohol = alcohol024(
      alcoholCarbons,
      0,
      alkaneNames024[alcoholCarbons] + "ol",
    ),
    ester = esterMolecule024(acidCarbons, alcoholCarbons),
    water = aux024("H₂O", { H: 2, O: 1 }, extent);
  let left: Term024[], right: Term024[];
  const salt = structuredClone(acid);
  salt.atoms.find((a) => a.id === "acid-oh")!.charge = -1;
  if (mode === "formation") {
    left = [term024(acid, first), term024(alcohol, second)];
    right = [
      term024(acid, first - extent),
      term024(alcohol, second - extent),
      term024(ester, extent),
      water,
    ];
  } else if (mode === "hydrolysis") {
    left = [term024(ester, first), aux024("H₂O", { H: 2, O: 1 }, second)];
    right = [
      term024(ester, first - extent),
      aux024("H₂O", { H: 2, O: 1 }, second - extent),
      term024(acid, extent),
      term024(alcohol, extent),
    ];
  } else {
    left = [
      term024(ester, first),
      aux024("NaOH", { Na: 1, O: 1, H: 1 }, second),
    ];
    right = [
      term024(ester, first - extent),
      aux024("NaOH", { Na: 1, O: 1, H: 1 }, second - extent),
      term024(salt, extent),
      aux024("Na⁺", { Na: 1 }, extent, 1),
      term024(alcohol, extent),
    ];
  }
  return {
    acidCarbons,
    alcoholCarbons,
    mode,
    first,
    second,
    extent,
    maximum: Math.min(first, second),
    acid: analyse024(acid),
    alcohol: analyse024(alcohol),
    ester: analyse024(ester),
    salt: analyse024(salt),
    left,
    right,
    balance: balance024(left, right),
    decision:
      mode === "formation"
        ? "Ester ve su oluşur"
        : mode === "hydrolysis"
          ? "Asit ve alkol oluşur"
          : "Karboksilat ve alkol oluşur",
    explanation:
      "Miktarlar mol cinsinden seçilmiş stokiyometrik bir ilerlemedir; gerçek denge verimi veya hız tahmini değildir. Standart Fischer esterleşmesinin basit atom takibinde alkol O’su ester köprüsünde kalır, asit OH’sinin O’su suya gider. Bu etiketleme uzun süreli izotop değişimini modellemez. Bazik hidrolizde doğrudan serbest asit değil karboksilat tuzu elde edilir.",
  };
}
export const fattyChoices024 = {
  lauric: { name: "Laurik", carbons: 12, doubles: 0 },
  palmitic: { name: "Palmitik", carbons: 16, doubles: 0 },
  stearic: { name: "Stearik", carbons: 18, doubles: 0 },
  oleic: { name: "Oleik", carbons: 18, doubles: 1 },
  linoleic: { name: "Linoleik", carbons: 18, doubles: 2 },
} as const;
export function triglyceride024(
  kind: string,
  molecules: number,
  extent: number,
  base: string,
) {
  choice024(kind, Object.keys(fattyChoices024));
  choice024(base, ["Na", "K"]);
  integer024(molecules, 1, 4);
  integer024(extent, 0, molecules);
  const p = fattyChoices024[kind as keyof typeof fattyChoices024],
    n = p.carbons,
    d = p.doubles,
    fat = { C: 3 * n + 3, H: 6 * n - 6 * d + 2, O: 6 },
    salt = { C: n, H: 2 * n - 2 * d - 1, O: 2, [base]: 1 };
  const left = [
      aux024(formula024(fat), fat, molecules),
      aux024(base + "OH", { [base]: 1, O: 1, H: 1 }, 3 * extent),
    ],
    right = [
      aux024(formula024(fat), fat, molecules - extent),
      aux024("Gliserol", { C: 3, H: 8, O: 3 }, extent),
      aux024(formula024(salt), salt, 3 * extent),
    ];
  return {
    kind,
    molecules,
    extent,
    base,
    ...p,
    fat,
    salt,
    left,
    right,
    balance: balance024(left, right),
    glycerol: extent,
    soap: 3 * extent,
    baseUsed: 3 * extent,
    decision: `${extent} mol gliserol, ${3 * extent} mol yağ asidi tuzu`,
    explanation:
      "Her tam hidroliz edilen trigliseritte üç ester bağı açılır. Seçili ilerleme tam parçalanmış molekülleri sayar; kısmi mono/digliserit dağılımı veya süreç verimi hesaplanmaz. Yağın bağı CH₂–O–C(=O)–R biçimindedir; sabun ester değil karboksilat tuzudur.",
  };
}
export const alcoholRoutes024 = {
  hydration: "Eten + su",
  propene: "Propen + su",
  substitution: "Kloroetan + sulu baz",
  fermentation: "Glikoz",
  primary: "1-Propanol + [O]",
  further: "1-Propanol + 2[O]",
  secondary: "2-Propanol + [O]",
  tertiary: "Tersiyer alkol + hafif yükseltgen",
  sodium: "Etanol + Na",
  elimination: "Etanolden molekül içi su ayrılması",
  ether: "İki etanolden su ayrılması",
  combustion: "Etanolün tam yanması",
} as const;
export function alcoholReaction024(
  route: string,
  stage: number,
  amount: number,
) {
  choice024(route, Object.keys(alcoholRoutes024));
  integer024(stage, 0, 2);
  integer024(amount, 1, 4);
  let start: Molecule024,
    product: Molecule024,
    left: Term024[],
    right: Term024[],
    decision: string,
    explanation: string;
  const etanol = alcohol024(2, 0, "Etanol"),
    water = (n = 1) => aux024("H₂O", { H: 2, O: 1 }, n);
  if (route === "hydration" || route === "propene") {
    const n = route === "hydration" ? 2 : 3;
    start = chain024(n, n === 2 ? "Eten" : "Propen");
    start.bonds[0].order = 2;
    product = alcohol024(n, n === 2 ? 0 : 1, n === 2 ? "Etanol" : "2-Propanol");
    left = [term024(start), water()];
    right = [term024(product)];
    decision = "Katılma";
    explanation =
      "Asit katalizli su katılmasında C=C’nin pi bağı açılır; H ve OH iki karbona eklenir. Propenin bu klasik yolunda ana ürün 2-propanoldür; 1-propanol değildir.";
  } else if (route === "substitution") {
    start = attach024(chain024(2, "Kloroetan"), "c0", "Cl", "cl");
    product = etanol;
    left = [term024(start), aux024("KOH", { K: 1, O: 1, H: 1 })];
    right = [term024(product), aux024("KCl", { K: 1, Cl: 1 })];
    decision = "Yer değiştirme";
    explanation =
      "Sulu ortamda OH⁻ halojenin yerini alır. Alkollü baz ve farklı koşullarda eliminasyon öne çıkabilir; ortamı silerek aynı ürün kuralı kurmayız.";
  } else if (route === "fermentation") {
    start = carbonylChain024(6, 0, "Glikozun açık zincir temsili");
    for (let i = 1; i < 6; i++)
      attach024(start, "c" + i, "O", "oh" + i, 0, i % 2 ? 55 : -55);
    product = etanol;
    left = [term024(start)];
    right = [term024(product, 2), aux024("CO₂", { C: 1, O: 2 }, 2)];
    decision = "Alkolik fermantasyon";
    explanation =
      "C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂ denkliği karbonu altıdan dört+ikiye dağıtır. Şema açık zincirli iskeletin atom hesabıdır; glikozun stereokimyası veya gerçek biyolojik verim gösterilmez.";
  } else if (["primary", "further", "secondary", "tertiary"].includes(route)) {
    start = alcohol024(
      3,
      route === "secondary" ? 1 : 0,
      route === "secondary" ? "2-Propanol" : "1-Propanol",
    );
    if (route === "tertiary") {
      start = alcohol024(3, 1, "2-Metil-2-propanol");
      attach024(start, "c1", "C", "branch", 0, 55);
    }
    product =
      route === "tertiary"
        ? structuredClone(start)
        : route === "further"
          ? acidChain024(3)
          : carbonylChain024(
              3,
              route === "secondary" ? 1 : 0,
              route === "secondary" ? "Propanon" : "Propanal",
            );
    left = [term024(start)];
    right = [term024(product)];
    if (route !== "tertiary") {
      left.push(aux024("[O]", { O: 1 }, route === "further" ? 2 : 1));
      right.push(water());
    }
    decision =
      route === "tertiary" ? "Olağan koşulda tepkime yok" : "Yükseltgenme";
    explanation =
      route === "tertiary"
        ? "OH taşıyan karbonda H yoktur. Olağan hafif yükseltgenmeyle aynı iskeletli karbonil ürünü beklenmez; sert koşulda iskelet kırılması ayrı süreçtir."
        : "Primer alkol uygun kontrollü koşulda aldehide, ileri yükseltgenmeyle aside; sekonder alkol ketona yönelir. Ürünü sadece alkol kelimesi değil OH karbonunun komşuları ve verilen koşul belirler.";
  } else if (route === "sodium") {
    start = etanol;
    product = structuredClone(etanol);
    product.atoms.find((a) => a.id === "oh")!.charge = -1;
    product.name = "Etanolat";
    left = [term024(start, 2), aux024("Na", { Na: 1 }, 2)];
    right = [
      term024(product, 2),
      aux024("Na⁺", { Na: 1 }, 2, 1),
      aux024("H₂", { H: 2 }),
    ];
    decision = "Alkolat ve H₂ oluşur";
    explanation =
      "İki alkolün O–H hidrojeninden bir H₂ oluşur; C–H hidrojenleri bu hesapta koparılmaz. Ürün O üzerinde eksi yüklü alkolat ve Na⁺ karşı iyonudur. Sulu çözünme ile aktif metalle bu tepkime aynı olay değildir.";
  } else if (route === "elimination") {
    start = etanol;
    product = chain024(2, "Eten");
    product.bonds[0].order = 2;
    left = [term024(start)];
    right = [term024(product), water()];
    decision = "Molekül içi su ayrılması";
    explanation =
      "Uygun asidik koşulda bir etanolden H₂O ayrılıp C=C oluşabilir. Katılmanın ters atom hesabıdır; her alkolde tek ürün ve aynı koşul varsayılmaz.";
  } else if (route === "ether") {
    start = etanol;
    product = ether024(2, 2).structure;
    left = [term024(start, 2)];
    right = [term024(product), water()];
    decision = "Moleküller arası su ayrılması";
    explanation =
      "İki etanolün toplamı C₄H₁₂O₂’dir; bir su ayrılınca C₄H₁₀O eter kalır. Aynı molekülden su ayıran eliminasyonla ürün ve molekül sayısı bakımından farklıdır.";
  } else {
    start = etanol;
    product = {
      name: "Karbon dioksit",
      atoms: [
        { id: "c", element: "C", x: 150, y: 125 },
        { id: "o1", element: "O", x: 90, y: 125 },
        { id: "o2", element: "O", x: 210, y: 125 },
      ],
      bonds: [
        { a: "c", b: "o1", order: 2 },
        { a: "c", b: "o2", order: 2 },
      ],
    };
    left = [term024(start), aux024("O₂", { O: 2 }, 3)];
    right = [term024(product, 2), water(3)];
    decision = "Tam yanma";
    explanation =
      "Yeterli oksijenle tam yanmada iki karbon iki CO₂’ye, altı hidrojen üç H₂O’ya gider. Alkolün kendi O’su da atom hesabına katılır. Oksijence yetersiz gerçek yanmada CO veya kurum gibi farklı ürünler olabilir.";
  }
  left = left.map((t) => ({ ...t, coefficient: t.coefficient * amount }));
  right = right.map((t) => ({ ...t, coefficient: t.coefficient * amount }));
  return {
    route,
    stage,
    amount,
    start: analyse024(start),
    product: analyse024(product),
    visible: analyse024(stage === 2 ? product : start),
    left,
    right,
    decision,
    explanation,
    balance: balance024(left, right),
    stageNote:
      stage === 0
        ? "Başlangıç yapısı"
        : stage === 1
          ? "Bağ değişimini düşün; çizim hâlâ başlangıç yapısıdır, kararlı ara ürün değildir."
          : "Seçili koşuldaki organik ürün",
  };
}
export const chemistryDefaults024 = {
  route: "hydration",
  stage: 0,
  amount: 1,
  left: 1,
  right: 2,
  carbonyl: "propanal",
  reagent: "inspect",
  acid: "acetic",
  neutralized: 0,
  base: "Na",
  acidCarbons: 2,
  alcoholCarbons: 2,
  esterMode: "formation",
  first: 2,
  second: 3,
  extent: 0,
  esterView: "simple",
  fatty: "stearic",
  fatAmount: 1,
  fatExtent: 0,
  guess: "",
  reason: "",
  checked: false,
  show: false,
  atom: "",
};
export function normalizeChemistry024(saved: Record<string, unknown>) {
  const d = chemistryDefaults024,
    number = (key: keyof typeof d, min: number, max: number) =>
      typeof saved[key] === "number" && Number.isFinite(saved[key])
        ? Math.min(max, Math.max(min, Math.trunc(saved[key] as number)))
        : (d[key] as number);
  const menu = (key: keyof typeof d, values: readonly string[]) =>
    typeof saved[key] === "string" && values.includes(saved[key] as string)
      ? (saved[key] as string)
      : (d[key] as string);
  const acid = menu("acid", Object.keys(acidChoices024)),
    first = number("first", 1, 4),
    second = number("second", 1, 4),
    fatAmount = number("fatAmount", 1, 4);
  const result = {
    route: menu("route", Object.keys(alcoholRoutes024)),
    stage: number("stage", 0, 2),
    amount: number("amount", 1, 4),
    left: number("left", 1, 4),
    right: number("right", 1, 4),
    carbonyl: menu("carbonyl", Object.keys(carbonylChoices024)),
    reagent: menu("reagent", Object.keys(carbonylReagents024)),
    acid,
    neutralized: number(
      "neutralized",
      0,
      analyse024(acidMolecule024(acid)).acids.length,
    ),
    base: menu("base", ["Na", "K"]),
    acidCarbons: number("acidCarbons", 1, 4),
    alcoholCarbons: number("alcoholCarbons", 1, 4),
    esterMode: menu("esterMode", ["formation", "hydrolysis", "base"]),
    first,
    second,
    extent: number("extent", 0, Math.min(first, second)),
    esterView: menu("esterView", ["simple", "fat"]),
    fatty: menu("fatty", Object.keys(fattyChoices024)),
    fatAmount,
    fatExtent: number("fatExtent", 0, fatAmount),
    guess: typeof saved.guess === "string" ? saved.guess.slice(0, 128) : "",
    reason: typeof saved.reason === "string" ? saved.reason.slice(0, 128) : "",
    checked: saved.checked === true,
    show: saved.show === true,
    atom: typeof saved.atom === "string" ? saved.atom : "",
  };
  if (
    Object.keys(result).some(
      (key) =>
        !["guess", "reason", "checked", "show", "atom"].includes(key) &&
        saved[key] !== result[key as keyof typeof result],
    )
  )
    return { ...result, guess: "", reason: "", checked: false, show: false };
  return result;
}

// AUTHORED_CONTENT_024
type Section024 = LessonGuide["sections"][number];
type Example024 = LessonGuide["examples"][number];
type Item024 = {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
  guidance: NonNullable<Question["guidance"]>;
};
const s024 = (title: string, first: string, second: string): Section024 => ({
  title,
  paragraphs: [first, second],
});
const e024 = (
  title: string,
  prompt: string,
  strategy: string,
  steps: string[],
  answer: string,
  check: string,
  pitfall: string,
): Example024 => ({
  title,
  prompt,
  strategy,
  steps: steps.map((explanation, i) => ({
    label: `${i + 1}. adım`,
    explanation,
  })),
  answer,
  check,
  pitfall,
});
const q024 = (
  prompt: string,
  knowledge: string,
  strategy: string,
  steps: string[],
  pairs: [string, string][],
  commonError: string,
  check: string,
): Item024 => ({
  prompt,
  options: pairs.map(([text]) => text),
  answer: 0,
  hint: strategy,
  explanation: steps.join(" ") + " " + check,
  guidance: {
    knowledge: [knowledge],
    strategy,
    steps,
    optionReasons: pairs.map(
      ([, reason], i) => (i === 0 ? "Doğru. " : "") + reason,
    ),
    commonError,
    check,
  },
});
type Pack024 = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: Section024[];
  examples: Example024[];
  recall: LessonGuide["recall"];
  items: Item024[];
};
const alcoholPack024: Pack024 = {
  id: "ayt-alkol-eldesi-tepkimeleri",
  topic: "detail-455",
  title: "Alkollerin eldesi ve kimyasal tepkimeleri",
  minutes: 85,
  objectives: [
    "Alkol üretim yollarını başlangıç maddesi ve koşulla eşleştirmek",
    "OH karbonunun çevresinden yükseltgenme ürününü çıkarmak",
    "Katılma, ayrılma ve yanmada atom ve mol hesabını denetlemek",
  ],
  sections: [
    s024(
      "Başlamadan: işlevsel grup ve mol",
      "Alkolü tanımak için OH’nin bağlı olduğu karbonu bul: bu karbon doymuş, yaklaşık tetrahedral sp³ çevre taşır. CH₃CH₂OH’de OH karbonu bir başka C’ye bağlıdır; CH₃CH(OH)CH₃’te iki C komşusu vardır.",
      "Ön koşul, C’nin dört ve nötr O’nun iki bağ değerliğini okuyabilmek; molü tanecik oranıyla ilişkilendirmektir. Denklem katsayısı mol oranını, alt indis bir moleküldeki atom sayısını verir; bu iki sayı birbirinin yerine kullanılamaz.",
    ),
    s024(
      "Tepkime oku neyi bildirir?",
      "Bir tepkime şeması başlangıç maddesini, ürünü ve okun üstündeki koşulu birlikte anlatır. Aynı etanol, yükseltgenle etanal veya asit, aktif metalle alkolat, uygun asitle su ayrılması ürünü verebilir.",
      "[O] bir oksijen eşdeğeri, 2[H] veya H₂ ise net iki hidrojen eklenmesini gösteren hesap kısaltmasıdır. Bunlar her deneyde aynı serbest taneciklerin kullanıldığını söylemez; gerçek ayıraç ve ortam ayrıca belirtilir.",
    ),
    s024(
      "Etenin su katılması",
      "Etenin asit katalizli hidrasyonunda C=C’nin bir pi bağı açılır. H ve OH iki karbon üzerine eklenir: CH₂=CH₂ + H₂O → CH₃CH₂OH. Karbon iskeleti iki karbonlu kalır; O atomu sudan gelir.",
      "Bu yol endüstriyel etanol üretiminin temel örneklerindendir. Katalizör net denklemde tüketilen madde gibi yazılmaz; basınç ve sıcaklık hızı ve dengeyi etkiler. Denklemdeki 1:1 oran tek başına yüzde yüz gerçek verim anlamına gelmez.",
    ),
    s024(
      "Propen için yönelme",
      "Propenin olağan asit katalizli hidrasyonunda ana ürün 2-propanoldür. Basit Markovnikov açıklamasında H, daha çok H taşıyan uç karbona; OH, orta karbona yerleşir: CH₃–CH=CH₂ → CH₃–CH(OH)–CH₃.",
      "Bu sonuç verilen klasik yol içindir. Başka tepkime dizileri farklı yönelme sağlayabilir; yalnız C₃H₆ + H₂O atom denkliğine bakarak iki konum izomerinden birini seçemezsin. Koşul bilgisi yapısal ürünü belirler.",
    ),
    s024(
      "Sulu bazla yer değiştirme",
      "Kloroetanın sulu NaOH veya KOH ile yer değiştirmesinde OH⁻, Cl’nin yerini alır. CH₃CH₂Cl + KOH → CH₃CH₂OH + KCl denkliği karbon, oksijen, hidrojen ve halojeni birlikte korur.",
      "Sulu baz ile alkollü baz koşulları aynı değildir. Alkil halojenürün yapısı ve ortam, yer değiştirme ile eliminasyonun payını etkiler. Bu ünitedeki kloroetan örneğinde sulu ortam ve etanolün hedef ürün olduğu açıkça belirtilir.",
    ),
    s024(
      "Glikozun alkolik fermantasyonu",
      "Maya enzimlerinin görev aldığı alkolik fermantasyonun net maddesel hesabı C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂ biçimindedir. Altı karbonun dördü etanolde, ikisi karbon dioksitte bulunur.",
      "Biyolojik süreç uygun canlı ve ortam gerektirir; açık zincirli glikoz çizimi bu süreçteki enzim adımlarını göstermez. Kuramsal etanol kütlesi mol oranından bulunur; verilen yüzde verim varsa bu üst sınır ayrıca çarpılır.",
    ),
    s024(
      "Karbonilden alkol elde etmek",
      "Aldehit veya ketonun uygun indirgenmesi karbonil C=O bağını C–OH çevresine dönüştürür. Etanal + H₂ → etanol ve propanon + H₂ → 2-propanol, her karbonile net iki H eklenmesini gösterir.",
      "NaBH₄ gibi ayıraçlarda gerçek süreç hidrit aktarımı ve protonlanma içerir; H₂ yazımı net atom hesabıdır. Aldehitler metanalın metanol vermesi özel durumu da düşünülerek çoğunlukla primer, basit ketonlar sekonder alkol verir.",
    ),
    s024(
      "Primer alkolün ilk yükseltgenmesi",
      "Primer alkolün OH karbonunda en az iki H bulunur. Kontrollü uygun yükseltgenme CH₃CH₂CH₂OH + [O] → CH₃CH₂CHO + H₂O örneğindeki gibi aldehit verebilir; karbon sayısı üç kalır.",
      "Ürünün aldehit basamağında tutulması koşula ve ürünün ortamdan uzaklaştırılmasına bağlıdır. Yalnız yükseltgen var ifadesi her durumda aldehitte durmayı garanti etmez; soru kontrollü basamağı açıkça tanımlamalıdır.",
    ),
    s024(
      "Primer alkolden karboksilik aside",
      "Yeterli yükseltgen ve uygun ortamda primer alkolün aldehit ürünü ileri yükseltgenir. 1-Propanol + 2[O] → propanoik asit + H₂O toplamında alkole bir O daha bağlanmış organik ürün elde edilir.",
      "Alkol → aldehit → asit dizisinde iskelet korunur; [O] sayısını ürünün O sayısına bakıp tek başına seçme. Ayrılan suyu da hesaba kat: başlangıç alkol O’su, eklenen iki O ve ürünlerin toplam üç O’su eşittir.",
    ),
    s024(
      "Sekonder alkolün yükseltgenmesi",
      "Sekonder alkolün OH karbonu iki karbon komşusuna ve bir H’ye bağlıdır. Bu H ile O–H hidrojeninin net uzaklaşması C=O verir: 2-propanol + [O] → propanon + H₂O.",
      "Ürün ketonun karbonil karbonu iki karbon komşusunu korur. Olağan hafif yükseltgenmeyle bunu aynı karbon sayılı aside ilerletmek beklenmez; böyle bir sonuç C–C bağının korunması varsayımını bozar.",
    ),
    s024(
      "Tersiyer alkolün sınırı",
      "Tersiyer alkolün OH karbonunda üç karbon komşusu ve sıfır C–H bağı vardır. 2-Metil-2-propanolün olağan hafif yükseltgenmede aynı iskeletli aldehit veya keton vermemesi bu yerel çevreyle açıklanır.",
      "Bu durum bileşiğin hiçbir koşulda hiçbir tepkime vermeyeceği anlamına gelmez. Su kaybı, halojenür oluşumu veya çok sert yükseltgenmede iskelet kırılması farklı süreçlerdir; tepkime türünü ve koşulunu ayrı oku.",
    ),
    s024(
      "Metanolün ayrı okunması",
      "Metanolün OH karbonuna başka karbon bağlı değildir; primer/sekonder/tersiyer sayımı bu özel en küçük üyede dikkat ister. Uygun ilk yükseltgenme metanal, sonraki basamak metanoik asit verir.",
      "İleri tam yükseltgenmede karbon dioksit ve su oluşabilir. Karbonik asidi her koşulda kalıcı izole ürün gibi ezberlemek yerine verilen basamağı izle. Metanol zehirlidir; kimyasal sınıf benzerliği etanol ile aynı kullanım güvenliğini vermez.",
    ),
    s024(
      "Sodyum ile O–H tepkimesi",
      "Alkol aktif sodyumla tepkime vererek alkolat ve hidrojen oluşturabilir: 2 ROH + 2 Na → 2 RO⁻Na⁺ + H₂. Gazın H atomları bu net hesapta O–H bağlarından gelir.",
      "Bir mol tek OH’li alkol, yeterli Na varsa yarım mol H₂’ye karşılık gelir. Alkolatın O üzerindeki eksi yükünü ve Na⁺ karşı iyonunu birlikte izle; bu olay alkolün suda kuvvetli baz gibi iyonlaşması değildir.",
    ),
    s024(
      "Molekül içi su ayrılması",
      "Etanol uygun asidik su çekme koşulunda eten ve suya dönüşebilir: C₂H₅OH → C₂H₄ + H₂O. Aynı molekülden bir O ve iki H suya ayrılır; C–C arasında yeni pi bağı oluşur.",
      "Klasik okul karşılaştırmasında derişik asit ve daha yüksek sıcaklık, yaklaşık 170 °C, eten yönünü destekleyen koşul olarak verilir. Bu sayı bütün alkoller için evrensel eşik değildir; yapı, koşul ve yan ürünler gerçek seçiciliği etkiler.",
    ),
    s024(
      "Moleküller arası su ayrılması",
      "İki etanolün uygun asidik koşullarda birleşmesi dietil eter ve bir su verebilir: 2 C₂H₅OH → C₂H₅–O–C₂H₅ + H₂O. İki başlangıç molekülünün dört karbonu aynı eterde toplanır.",
      "Klasik etanol örneğinde yaklaşık 140 °C koşulu bu yolla karşılaştırılır. Bir etanolden eten oluşmasıyla iki etanolden eter oluşmasını ayır: suyun katsayısı aynı görünse de alkol tüketimi ve organik ürün bağlantısı farklıdır.",
    ),
    s024(
      "Alkolün asitle esterleşmesi",
      "Bir alkol, karboksilik asitle uygun asit katalizli denge tepkimesinde ester ve su oluşturabilir. Etanol + etanoik asit ⇌ etil etanoat + su örneğinde etanolün iki karbonu esterin alkil tarafındadır.",
      "Bu yol, alkil halojenürde C–halojen yerine OH bağlanan yer değiştirme örneğiyle veya basit C=C katılmasıyla aynı yol değildir; toplamda su ayrılan esterleşmedir. Esterin iki O’sunu izlemek, eterle karıştırmayı önler; denge verimi ayrıca verilen verilere bağlıdır.",
    ),
    s024(
      "Tam yanmanın dengesi",
      "Oksijen yeterliyse alkolün tam yanma ürünleri CO₂ ve H₂O’dur. Etanol için C₂H₆O + 3 O₂ → 2 CO₂ + 3 H₂O denkleminde alkolün zaten taşıdığı bir O da toplam oksijen hesabına katılır.",
      "Önce C ile CO₂, sonra H ile H₂O katsayılarını koy; ürün O toplamından yakıttaki O’yu çıkararak gereken O₂’yi bul. Yetersiz oksijende CO veya kurum görülebileceğinden tam yanma varsayımı soru metninde bulunmalıdır.",
    ),
    s024(
      "Kütleden mol oranına",
      "Fermantasyon veya su katılması hesabında önce n=m/M ile başlangıç molünü bul. Sonra dengeli denklemdeki katsayı oranını uygula ve hedef kütle istenirse n×M ile geri dön; gramları doğrudan katsayılarla oranlama.",
      "Atom kütleleri C=12, H=1, O=16 alınırsa glikozun mol kütlesi 180, etanolünki 46 g/mol olur. Bir mol glikozdan kuramsal iki mol etanol çıkar; 180 gramın tamamı etanol olamaz çünkü CO₂ de oluşur.",
    ),
    s024(
      "Sınırlayıcı madde ve verim",
      "Bir üretimde iki tüketilen madde verilmişse mol/katsayı değerlerini karşılaştır. Hidrasyonda her mol alken bir mol su tüketir; daha küçük stok ürünün kuramsal üst sınırını belirler.",
      "Yüzde verim, gerçekleşen hedef ürünün kuramsal hedef ürüne oranıdır. Örneğin kuramsal 0,80 mol ürünün yüzde 75 verimi 0,60 mol eder; katalizör eklenmesi tek başına bu oranı yüzde 100 yapmaz.",
    ),
    s024(
      "Fiziksel olay ile kimyasal dönüşüm",
      "Etanolün suyla moleküler karışması C–O bağını değiştiren bir üretim tepkimesi değildir. O–H grubu hidrojen bağı kurmaya katılır; kısa zincirli alkollerin suyla etkileşimi güçlüdür, büyük hidrokarbon kısım çözünürlüğü sınırlayabilir.",
      "Tepkime ağında bağ değişimini kanıtla: hidrasyonda pi azalır, yükseltgenmede C=O ortaya çıkar, sodyumda O–H hidrojeninin yerini karşı iyon alır. Model miktarları stokiyometriktir; ölçülmüş hız veya otomatik öğrenme başarısı değildir.",
    ),
  ],
  examples: [
    e024(
      "Büt-1-en hidrasyonunda kütle",
      "5,6 g büt-1-en, yeterli suyla olağan asit katalizli hidrasyonda ana ürün olan bütan-2-ole tam dönüşmüş kabul ediliyor. Alkol kütlesi nedir? C=12, H=1, O=16.",
      "Önce yönelmeyi, sonra 1:1 mol hesabını kur.",
      [
        "Büt-1-en C₄H₈, M=56 g/mol; 5,6/56=0,10 mol başlangıç vardır.",
        "Verilen ana üründe OH ikinci C’ye bağlıdır; bütan-2-ol C₄H₁₀O ve M=74 g/mol’dür.",
        "1:1 katılmayla 0,10 mol alkol ×74 g/mol=7,4 g; su tüketimi 0,10 moldür.",
      ],
      "Bütan-2-ol; 7,4 g",
      "5,6 g büt-1-en+1,8 g su=7,4 g ürün; dört karbon korunur.",
      "Katılan suyu yok sayıp ürün kütlesini 5,6 g bırakmak.",
    ),
    e024(
      "Fermantasyonun iki ürünü",
      "45,0 g glikozun alkolik fermantasyonunda kuramsal etanol ve CO₂ kütlelerini bulun. M(glikoz)=180, M(etanol)=46, M(CO₂)=44 g/mol.",
      "Bir glikozdan iki etanol ve iki CO₂ oranını ayrı uygula.",
      [
        "45,0/180=0,25 mol glikoz vardır.",
        "Her ürünün molü 2×0,25=0,50 mol olur.",
        "Etanol 0,50×46=23,0 g; CO₂ 0,50×44=22,0 g bulunur.",
      ],
      "23,0 g etanol ve 22,0 g CO₂",
      "23,0+22,0=45,0 g; net madde denkliği kapanır.",
      "İki ürünün katsayıları eşit diye kütlelerini de eşit almak.",
    ),
    e024(
      "Yerel çevreden ürüne",
      "CH₃–CH(OH)–CH₂–CH₃ uygun hafif yükseltgenle, karbon iskeleti kırılmadan tepkimeye giriyor. Ürün ve denklem nedir?",
      "OH karbonunun H ve C komşularını işaretle.",
      [
        "OH taşıyan C, iki C ve bir H’ye bağlıdır; başlangıç 2-bütanol, sekonder alkoldür.",
        "Aynı C üzerindeki O–H ve C–H hidrojenleri net uzaklaşınca C=O oluşur.",
        "CH₃CH(OH)CH₂CH₃+[O]→CH₃COCH₂CH₃+H₂O; ürün bütan-2-ondur.",
      ],
      "Bütan-2-on ve su",
      "C₄H₁₀O+O→C₄H₈O+H₂O: C4, H10, O2 iki yanda eşittir.",
      "OH görülen her bileşiği primer sayıp bütanal seçmek.",
    ),
    e024(
      "O–H hidrojenini saymak",
      "23,0 g susuz etanol, yeterli Na ile tam tepkimeye giriyor. Oluşan H₂ kaç moldür? M(etanol)=46 g/mol.",
      "İki O–H hidrojeninin bir H₂ oluşturmasını kullan.",
      [
        "23,0/46=0,50 mol etanol vardır; her molekül bir O–H taşır.",
        "2 C₂H₅OH+2Na→2 C₂H₅O⁻Na⁺+H₂ denkliğinde 2:1 oranı vardır.",
        "0,50/2=0,25 mol H₂ ve 0,50 mol etanolat oluşur.",
      ],
      "0,25 mol H₂",
      "Gazdaki toplam H atomu 0,50 mol; başlangıç O–H sayısıyla aynıdır.",
      "Etanolün altı hidrojeninin tamamını bu tepkimede H₂ saymak.",
    ),
    e024(
      "Bütanolün yanması",
      "0,18 mol C₄H₁₀O yeterli O₂ ile tam yanıyor. O₂ tüketimi ile CO₂ ve H₂O miktarları nedir?",
      "C ve H ürünlerini yazıp O açığını tamamla.",
      [
        "Bir mol alkol için 4CO₂ ve 5H₂O gerekir; ürünlerde 13 mol O atomu vardır.",
        "Yakıtın kendi 1 O atomu çıkarılınca 12 O atomu, yani 6 mol O₂ gerekir.",
        "0,18 ile çarpınca O₂=1,08 mol, CO₂=0,72 mol, H₂O=0,90 mol olur.",
      ],
      "1,08 mol O₂; 0,72 mol CO₂; 0,90 mol H₂O",
      "C₄H₁₀O+6O₂→4CO₂+5H₂O denkliği aynı oranı verir.",
      "Yakıtın O atomunu saymayıp O₂’yi 1,17 mol bulmak.",
    ),
  ],
  recall: [
    {
      prompt: "Propenin asit katalizli hidrasyonunda OH hangi karbona gider?",
      answer: "Klasik ana ürün 2-propanoldür; OH orta karbona bağlanır.",
    },
    {
      prompt: "Primer alkolün aldehitte kalması için hangi bilgi gerekir?",
      answer:
        "Kontrollü koşul ve ilk basamakta durdurma bilgisi gerekir; yeterli yükseltgenle asit oluşabilir.",
    },
    {
      prompt:
        "Tersiyer alkolün hafif yükseltgenmede keton vermemesinin yapısal nedeni?",
      answer:
        "OH taşıyan karbonda C–H bağı yoktur; aynı iskeleti koruyan olağan karbonil dönüşümü kurulamaz.",
    },
    {
      prompt:
        "Etanolün eten ve dietil eter yolları tüketim bakımından nasıl ayrılır?",
      answer:
        "Eten yolunda bir etanolden bir su; dietil eter yolunda iki etanolden bir su ayrılır.",
    },
    {
      prompt: "Bir mol tek OH’li alkolden yeterli Na ile kaç mol H₂ çıkar?",
      answer: "Net 2ROH:1H₂ oranından 0,50 mol H₂ çıkar.",
    },
  ],
  items: [],
};
alcoholPack024.items = [
  q024(
    "0,35 mol eten, yeterli suyla asit katalizli hidrasyonda tamamen etanole dönüşüyor. M(etanol)=46 g/mol olduğuna göre kuramsal etanol kütlesi kaç gramdır?",
    "Etenin hidrasyonunda eten:etanol mol oranı 1:1’dir.",
    "Eten molünü ürün molüne, sonra kütleye dönüştür.",
    [
      "CH₂=CH₂+H₂O→C₂H₅OH denklemi 1:1 oranını verir.",
      "0,35 mol eten 0,35 mol etanol verir.",
      "m=0,35×46=16,1 g bulunur.",
    ],
    [
      ["16,1", "0,35 mol ürünün 46 g/mol ile çarpımıdır."],
      [
        "8,05",
        "1:1 yerine yanlışlıkla iki etenin bir ürün verdiğini varsayar.",
      ],
      ["9,8", "Etenin 28 g/mol kütlesini kullanır; katılan suyu saymaz."],
      ["32,2", "Etanol katsayısını gereksiz yere iki yapar."],
      ["46,0", "0,35 mol yerine bir mol ürün alır."],
    ],
    "Hidrasyonun katsayısını fermantasyonun iki ürün katsayısıyla karıştırmak.",
    "Ürün kütlesi 9,8 g eten+6,3 g su toplamına eşittir.",
  ),
  q024(
    "CH₃–CH=CH₂, olağan asit katalizli su katılması koşullarında tepkimeye giriyor. Ana organik ürün hangisidir?",
    "Klasik propen hidrasyonunda ana yönelme 2-propanol verir.",
    "H ve OH’yi çift bağın iki karbonuna yerleştir.",
    [
      "Başlangıç çift bağı uç CH₂ ile orta CH arasındadır.",
      "Bu koşulda H uç karbona, OH orta karbona eklenir.",
      "Ürün CH₃–CH(OH)–CH₃, yani 2-propanoldür.",
    ],
    [
      ["2-Propanol", "OH orta karbona yerleşir; üç C korunur."],
      [
        "1-Propanol",
        "Verilen asit katalizli ana yönelmenin ters OH konumunu seçer.",
      ],
      [
        "Propanon",
        "Su katılmasını yükseltgenmeye çevirir; ürünün H sayısı tutmaz.",
      ],
      ["Etanol", "Üç karbonlu başlangıçtan bir C’yi düşürür."],
      ["Propan", "O içeren suyu ürün hesabından çıkarır."],
    ],
    "Atom denklemi her konum izomeri için tutabilir diye koşulu yok saymak.",
    "C₃H₆+H₂O=C₃H₈O; ürün OH karbonu iki C’ye bağlıdır.",
  ),
  q024(
    "CH₃CH₂Cl + KOH(sulu) → X + KCl tepkimesinde, yer değiştirme ürünü X ve OH⁻’nin rolü hangisidir?",
    "Sulu bazla kloroetanda Cl yerine OH bağlanabilir.",
    "Karbon iskeletini koruyup ayrılan Cl’nin yerini doldur.",
    [
      "Kloroetanda iki karbonlu C–C iskeleti vardır.",
      "Sulu koşulda OH⁻, Cl’nin yerini alarak C–O bağı kurar.",
      "X, CH₃CH₂OH olur; olay yer değiştirmedir.",
    ],
    [
      [
        "Etanol; Cl’nin yerini alır",
        "C–Cl yerine C–OH oluşur ve KCl yan üründür.",
      ],
      [
        "Eten; C=C’ye su katar",
        "Eten ürününü ve katılma yönünü bu yer değiştirmeye uyarlayamaz.",
      ],
      [
        "Etanal; oksijen yükseltgen olarak alınır",
        "Verilen denklemde yükseltgen yoktur ve H₂ kaybı verilmemiştir.",
      ],
      ["Metanol; C–C bağını koparır", "İki karbonlu iskeleti gereksiz kırar."],
      [
        "Dietil eter; iki Cl’yi birleştirir",
        "Tek kloroetandan dört karbonlu eter çıkarır.",
      ],
    ],
    "Sulu KOH ile alkollü baz koşullarını aynı kabul etmek.",
    "C₂H₅Cl+KOH ve C₂H₆O+KCl iki yanda C2,H6,O1,K1,Cl1 verir.",
  ),
  q024(
    "36,0 g glikozdan alkolik fermantasyonla etanol üretiliyor. Etanol için verim %80, M(glikoz)=180 ve M(etanol)=46 g/mol ise etanol kütlesi kaç gramdır?",
    "Bir mol glikoz kuramsal iki mol etanol verir; verim bu üst sınıra uygulanır.",
    "Önce kuramsal etanolü, sonra yüzde 80’ini hesapla.",
    [
      "36,0/180=0,20 mol glikoz vardır.",
      "Kuramsal etanol 2×0,20=0,40 mol, yani 18,4 g’dır.",
      "Gerçek etanol 18,4×0,80=14,72 g olur.",
    ],
    [
      ["14,72", "Kuramsal iki kat mol oranına %80 verim uygulanmıştır."],
      ["18,40", "Kuramsal kütlede durur; verilen verimi uygulamaz."],
      ["7,36", "Glikoz:etanol oranını 1:1 alır."],
      ["28,80", "Başlangıç glikoz kütlesine doğrudan %80 uygular."],
      ["23,00", "Verimi bölerek gerçek ürünü kuramsal sınırın üstüne çıkarır."],
    ],
    "Yüzde verimi doğrudan glikozun gramına uygulamak.",
    "Gerçek ürün 14,72 g, kuramsal üst sınır 18,4 g’dan küçüktür.",
  ),
  q024(
    "CH₃CHO uygun indirgenle karbon iskeleti korunarak alkole dönüştürülüyor. Net atom hesabında hangi dönüşüm doğrudur?",
    "Aldehit indirgenmesinde karbonile net iki H eklenir.",
    "C=O bağını C–OH’ye dönüştürerek H sayısını izle.",
    [
      "Etanalın molekül formülü C₂H₄O’dur.",
      "İndirgenmede karbonile net iki H eklenince C₂H₆O elde edilir.",
      "Bağlantı CH₃CH₂OH olur; ürün etanoldür.",
    ],
    [
      ["Etanal + H₂ → etanol", "Karbonil indirgenir ve iki H eklenir."],
      [
        "Etanal + [O] → etanol",
        "H yerine O ekleyerek indirgenme atom hesabını bozar.",
      ],
      [
        "Etanal → eten + H₂O",
        "O toplamı 1 korunur; ürünlerde 6 H başlangıçtaki 4 H’yi aşar.",
      ],
      [
        "Etanal + H₂ → dimetil eter",
        "Formül tutsa da karbon iskeleti ve karbonil bağlantısı böyle dönüşmez.",
      ],
      ["Etanal + H₂ → metanol", "İki C’den birini yok sayar."],
    ],
    "Molekül formülünü koruyan her izomeri indirgenme ürünü sanmak.",
    "C₂H₄O+H₂=C₂H₆O ve C–C bağı ürün boyunca korunur.",
  ),
  q024(
    "CH₃CH₂CH₂CH₂OH, kontrollü ilk yükseltgenme basamağında tutuluyor. Karbon iskeleti korunursa organik ürün hangisidir?",
    "Primer alkolün kontrollü ilk yükseltgenmesi aldehit verebilir.",
    "Uçtaki CH₂OH grubunu CHO’ya dönüştür.",
    [
      "OH taşıyan uç C bir C komşusuna bağlıdır; başlangıç primerdir.",
      "Kontrollü ilk basamakta CH₂OH çevresi CHO’ya yükseltgenir.",
      "Dört karbonlu ürün CH₃CH₂CH₂CHO, bütanaldir.",
    ],
    [
      ["Bütanal", "Dört C korunur ve uçta aldehit oluşur."],
      [
        "Bütanoik asit",
        "İlk aldehit basamağını aşan ileri yükseltgenme ürünüdür.",
      ],
      [
        "Bütanon",
        "Karbonili iç karbona kaydırır; verilen iskelet çevresi bunu gerektirmez.",
      ],
      ["Propanal", "Bir karbon eksiltir."],
      ["Bütan", "O’yu uzaklaştırır; yükseltgenme ürünü değildir."],
    ],
    "Kontrollü ilk basamağı ileri yükseltgenmeyle birleştirmek.",
    "C₄H₁₀O+[O]→C₄H₈O+H₂O; organik üründe dört C vardır.",
  ),
  q024(
    "1-Bütanol yeterli yükseltgenle, aynı karbon iskeleti korunarak karboksilik asit basamağına ilerletiliyor. Net denklemde 1 mol alkol başına kaç [O] kullanılır?",
    "Primer alkolün aside toplam dönüşümü iki O eşdeğeri tüketir.",
    "Asit ve su ürünlerini birlikte dengele.",
    [
      "1-Bütanol C₄H₁₀O, bütanoik asit C₄H₈O₂’dir.",
      "İki H farkı bir H₂O ürününü gerektirir.",
      "Ürünlerde toplam üç O vardır; alkolden gelen bir O dışında 2[O] gerekir.",
    ],
    [
      ["2", "Asit O₂ ve su O’su için toplam iki ek O gerekir."],
      ["0", "Ürünün toplam O sayısındaki artışı karşılamaz."],
      ["1", "Yalnız organik üründeki O artışını sayar, suyu unutur."],
      ["3", "Alkolün zaten taşıdığı O’yu saymaz."],
      ["4", "[O] ile O₂ katsayısını karıştırarak fazladan O ekler."],
    ],
    "Ayrılan suyun O atomunu yükseltgen hesabının dışında bırakmak.",
    "C₄H₁₀O+2[O]→C₄H₈O₂+H₂O atom bakımından dengelidir.",
  ),
  q024(
    "CH₃CH(OH)CH₂CH₂CH₃ uygun hafif yükseltgenle karbon iskeleti kırılmadan tepkimeye giriyor. Organik ürünün adı hangisidir?",
    "Sekonder alkol aynı yerde karbonil taşıyan ketona yükseltgenir.",
    "OH’nin konumunu koruyup C=O oluştur.",
    [
      "Beş karbonlu zincirde OH ikinci karbona bağlıdır.",
      "OH karbonu iki C komşusu ve bir H taşıdığı için sekonderdir.",
      "C2’de C=O oluşur; ürün pentan-2-ondur.",
    ],
    [
      ["Pentan-2-on", "Karbonil OH’nin bulunduğu ikinci C’de oluşur."],
      ["Pentanal", "Karbonili uç karbona taşır."],
      ["Pentan-3-on", "Tepkime sırasında karbonili üçüncü C’ye kaydırır."],
      ["Pentanoik asit", "Sekonder alkolü aynı iskeletli asit gibi ele alır."],
      ["Bütan-2-on", "Beş C’li iskeletten bir C eksiltir."],
    ],
    "Sekonder sözcüğünü karbonil daima zincirin ortasında olur diye yorumlamak.",
    "C₅H₁₂O+[O]→C₅H₁₀O+H₂O; karbonil konumu 2’dir.",
  ),
  q024(
    "2-Metil-2-propanolün olağan hafif yükseltgenmeyle, aynı karbon iskeletli keton vermemesi en doğrudan hangi yapısal bulguyla açıklanır?",
    "Olağan alkol-karbonil dönüşümünde OH karbonundaki C–H bağı önemlidir.",
    "OH taşıyan karbonun üç C komşusunu say.",
    [
      "Merkez karbon OH ve üç metil grubuna bağlıdır.",
      "Dört bağ yeri dolu olduğu için bu karbonda H yoktur.",
      "Aynı iskeleti koruyarak C=O oluşturacak olağan H uzaklaşması kurulamaz.",
    ],
    [
      [
        "OH karbonunda H bulunmaması",
        "Tersiyer karbon çevresi olağan aynı iskeletli karbonil oluşumunu sınırlar.",
      ],
      [
        "Molekülde hiç hidrojen bulunmaması",
        "Metil grupları dokuz C–H hidrojeni taşır.",
      ],
      ["Oksijen atomu içermemesi", "Başlangıç zaten OH içerir."],
      [
        "Karbon sayısının tek olması",
        "Dört C vardır; karbonun tek/çift sayısı temel neden değildir.",
      ],
      [
        "Suyla karışmanın yükseltgenme olması",
        "Fiziksel karışmayı bağ değişimiyle karıştırır.",
      ],
    ],
    "OH karbonundaki H yok ifadesini bütün molekülde H yok diye genişletmek.",
    "Molekül C₄H₁₀O’dur; sıfır olan toplam H değil, merkez C’ye bağlı H’dir.",
  ),
  q024(
    "0,60 mol susuz etanol, yeterli Na ile tam tepkimeye giriyor. Yalnız O–H hidrojenleri gaz oluşturduğuna göre kaç mol H₂ çıkar?",
    "2 ROH +2Na →2RONa+H₂ oranı kullanılır.",
    "Etanol molünü ikiye bölerek H₂ molünü bul.",
    [
      "Her etanol bir O–H hidrojeni verir; 0,60 mol H atomu vardır.",
      "Bir H₂ iki H atomu içerir.",
      "n(H₂)=0,60/2=0,30 mol olur.",
    ],
    [
      ["0,30", "İki etanolün bir H₂ vermesini uygular."],
      ["0,60", "Bir O–H atomundan bir H₂ molekülü üretir."],
      ["1,20", "2:1 oranını ters uygular."],
      ["1,80", "Etanolün bütün altı H’sini gaz hesabına katar."],
      ["0,10", "Etanolün altı H’sine bölerek ilgisiz bir oran kurar."],
    ],
    "H atomu molüyle H₂ molekülü molünü eşitlemek.",
    "0,30 mol H₂ içindeki H atomu 0,60 moldür; O–H stoku tam kullanılır.",
  ),
  q024(
    "Dietil eter oluşturacak uygun asidik moleküller arası su ayrılmasında 0,80 mol etanol tamamen bu ürüne dönüşüyor. Kaç mol dietil eter oluşur?",
    "İki etanol bir dietil eter ve bir su oluşturur.",
    "Dört karbonlu eteri iki karbonlu başlangıçla eşleştir.",
    [
      "2 C₂H₅OH→C₂H₅OC₂H₅+H₂O denklemi kurulur.",
      "Etanol:eter mol oranı 2:1’dir.",
      "0,80/2=0,40 mol dietil eter bulunur.",
    ],
    [
      ["0,40", "Dört C’li eterin iki etanol biriminden oluşmasını sayar."],
      ["0,80", "Molekül içi ayrılmanın 1:1 oranını buraya taşır."],
      ["1,60", "İki etanol gerekliliğini ürün miktarını ikiye çevirir."],
      ["0,20", "Dört karbonu yanlışlıkla dört etanole karşılık sayar."],
      ["0,00", "Alkolden eter oluşma yolunu göz ardı eder."],
    ],
    "Eten oluşumu ile eter oluşumunun alkol katsayılarını aynı almak.",
    "Başlangıç C atomu 1,60 mol; 0,40 mol eterde C atomu yine 1,60 moldür.",
  ),
  q024(
    "0,25 mol etanol uygun asidik molekül içi su ayrılmasıyla tamamen etene dönüşüyor. Ürün miktarları hangisidir?",
    "Etanol → eten + su denkleminde üç katsayı da birdir.",
    "Aynı molekülden ayrılan suyu ve kalan iki C’yi birlikte say.",
    [
      "C₂H₆O→C₂H₄+H₂O atom denkliği kurulur.",
      "Bir etanol bir eten ve bir su verir.",
      "0,25 mol başlangıçtan 0,25 mol eten ve 0,25 mol su oluşur.",
    ],
    [
      ["0,25 mol eten ve 0,25 mol su", "1:1:1 denkliğini korur."],
      [
        "0,125 mol eten ve 0,25 mol su",
        "Eterin iki alkol katsayısını eten yoluna taşır.",
      ],
      [
        "0,50 mol eten ve 0,25 mol su",
        "Başlangıcın iki katı C içeren ürün üretir.",
      ],
      [
        "0,25 mol eter ve su oluşmaz",
        "Ürün bağlantısını ve ayrılan suyu değiştirir.",
      ],
      [
        "0,25 mol etan ve 0,25 mol su",
        "Etanla birlikte H toplamı başlangıcı aşar.",
      ],
    ],
    "Su ayrılınca C–C bağının tek kalacağını varsaymak.",
    "0,25×6=1,50 mol H atomu, 0,25×4+0,25×2 ile korunur.",
  ),
  q024(
    "Klasik etanol karşılaştırmasında derişik asit kataliziyle yaklaşık 140 °C’de moleküller arası, yaklaşık 170 °C’de molekül içi su ayrılması inceleniyor. Eşleştirme hangisidir?",
    "Bu belirtilmiş okul modelinde düşük sıcaklık eter, daha yüksek sıcaklık eten yoluyla karşılaştırılır.",
    "Önce molekül sayısından bağlantıyı, sonra verilen koşuldan yolu seç.",
    [
      "Moleküller arası yol iki etanolü tek O köprüsünde birleştirir.",
      "Molekül içi yol bir etanolden H₂O ayırıp C=C oluşturur.",
      "Bu nedenle 140 °C dietil eter, 170 °C eten ile eşleşir.",
    ],
    [
      [
        "140 °C: dietil eter; 170 °C: eten",
        "İki ve bir molekül kaynaklı su kaybını doğru eşleştirir.",
      ],
      [
        "140 °C: eten; 170 °C: dietil eter",
        "Verilen klasik yönelmeyi ters çevirir.",
      ],
      ["İkisinde de etanal", "Su ayrılmasını yükseltgenme sanır."],
      [
        "İkisinde de etanoik asit",
        "Koşulda olmayan yükseltgenme ürününü seçer.",
      ],
      [
        "140 °C: metanol; 170 °C: propanol",
        "Karbon sayısını açıklamasız değiştirir.",
      ],
    ],
    "Verilen yaklaşık sıcaklıkları tüm alkollere ait evrensel eşik saymak.",
    "Koşullar yalnız bu etanol karşılaştırması içindir; eter C₄H₁₀O, eten C₂H₄’tür.",
  ),
  q024(
    "0,20 mol etanol yeterli O₂ ile tam yanıyor. Tüketilen O₂ miktarı kaç moldür?",
    "Etanolün tam yanması C₂H₆O+3O₂→2CO₂+3H₂O biçimindedir.",
    "Yakıtın kendi O’sunu çıkararak oksijen açığını bul.",
    [
      "Bir mol etanolün ürünleri 2CO₂ ve 3H₂O, toplam yedi O atomu içerir.",
      "Bir O atomu etanolden gelir; kalan altı O atomu üç O₂ gerektirir.",
      "0,20×3=0,60 mol O₂ tüketilir.",
    ],
    [
      ["0,60", "Bir etanol başına üç O₂ oranını uygular."],
      ["0,70", "Üründeki yedi O’nun tamamını O₂’den alır."],
      ["0,40", "Yalnız CO₂ oluşumu için oksijen sayar."],
      ["0,30", "O₂ oranını yanlışlıkla yarıya indirir."],
      ["1,20", "O atomu ile O₂ molekülünü karıştırarak ikiye katlar."],
    ],
    "Alkolün kendi oksijenini yanma denklemi dışında bırakmak.",
    "0,20 mol yakıttaki 0,20 mol O ile O₂’nin 1,20 mol O’su toplam 1,40 mol O verir.",
  ),
  q024(
    "0,70 mol eten ve 0,50 mol su kapalı bir hesap modelinde yalnız hidrasyonla tepkimeye giriyor. Tam stokiyometrik dönüşüm üst sınırında etanol miktarı ve artan eten hangisidir?",
    "1:1 hidrasyonda küçük mol stoku sınırlayıcıdır.",
    "İki madde için mol/katsayıyı karşılaştır.",
    [
      "Eten ve su katsayıları birdir; stoklar 0,70 ve 0,50 moldür.",
      "Su 0,50 mol dönüşümü sınırlar; etanol en çok 0,50 mol oluşur.",
      "Eten artığı 0,70−0,50=0,20 mol olur.",
    ],
    [
      [
        "0,50 mol etanol; 0,20 mol eten",
        "Suyu sınır kabul ederek iki stoku da korur.",
      ],
      ["0,70 mol etanol; eten artmaz", "0,70 mol su varmış gibi hesaplar."],
      [
        "1,20 mol etanol; eten artmaz",
        "İki reaktanın molünü toplayıp ürün sayar.",
      ],
      ["0,25 mol etanol; 0,45 mol eten", "1:1 yerine 2:1 kullanır."],
      ["0,20 mol etanol; 0,50 mol eten", "Stok farkını ürün miktarı sanır."],
    ],
    "Başlangıç molü daha büyük olanı otomatik sınırlayıcı seçmek.",
    "0,50 mol tüketilen eten+0,20 mol artan eten=0,70 mol başlangıç etenidir.",
  ),
  q024(
    "Metanolün karbonu sırasıyla kontrollü ilk yükseltgenme, asit basamağı ve ileri tam yükseltgenme olarak izleniyor. Doğru ürün dizisi hangisidir?",
    "Metanolün tek karbonu metanal, metanoik asit ve sonunda CO₂ olarak izlenebilir.",
    "Her basamakta bir karbonu koruyup yükseltgenme yönünü takip et.",
    [
      "CH₃OH ilk kontrollü basamakta HCHO’ya dönüşebilir.",
      "HCHO bir sonraki basamakta HCOOH verir.",
      "İleri tam yükseltgenme CO₂ ve H₂O’ya götürebilir; karbon sayısı her basamakta birdir.",
    ],
    [
      [
        "Metanal → metanoik asit → CO₂",
        "Tek C’li yükseltgenme dizisini korur.",
      ],
      [
        "Etanal → etanoik asit → CO₂",
        "İlk basamakta açıklamasız ikinci C ekler.",
      ],
      [
        "Propanon → propanoik asit → CO₂",
        "Bir C’den üç C üretir ve ketonu yanlış asit yoluna sokar.",
      ],
      [
        "Metanoik asit → metanal → metanol",
        "Verilen yükseltgenme yönünü indirgenmeye çevirir.",
      ],
      [
        "Metan → etan → propan",
        "O kaybını ve karbon artışını yükseltgenme gibi gösterir.",
      ],
    ],
    "Formaldehitin ileri ürününü her koşulda kalıcı H₂CO₃ diye ezberlemek.",
    "Tüm organik başlangıç ve ara türlerde bir C vardır; son karbon CO₂’de bulunur.",
  ),
  q024(
    "Saf etanol suyla karıştırılıyor; başka ayıraç veya kimyasal dönüşüm verilmemiştir. En uygun açıklama hangisidir?",
    "Alkolün suda çözünmesi çoğunlukla moleküler karışma ve moleküller arası etkileşimdir.",
    "Yeni kovalent ürün ile moleküller arası bağı ayır.",
    [
      "Etanolün C–C ve C–O bağlantısı karışmada korunur.",
      "Etanol ve su arasında hidrojen bağı kurulabilir.",
      "Yalnız bu bilgiyle etanolün etanal veya kuvvetli baz iyonlarına dönüştüğü söylenmez.",
    ],
    [
      [
        "Moleküler karışma olur; suyla hidrojen bağı kurulabilir",
        "Kovalent bağlantı korunurken moleküller arası etkileşim değişir.",
      ],
      [
        "Etanol bütünüyle OH⁻ verir ve kuvvetli baz olur",
        "Kovalent OH’yi serbest hidroksit iyonu sanır.",
      ],
      [
        "Etanol etanale yükseltgenir",
        "Karışmada olmayan yükseltgeni varsayar.",
      ],
      [
        "İki etanol zorunlu dietil etere dönüşür",
        "Asit katalizli su ayrılması koşullarını uydurur.",
      ],
      [
        "Etanol suyla hiçbir etkileşim kurmaz",
        "O–H ve O’nun hidrojen bağı olanaklarını yok sayar.",
      ],
    ],
    "Bir molekülde OH yazmasını bazik çözelti kanıtı kabul etmek.",
    "Başlangıç ve karışımdaki etanol hâlâ C₂H₆O molekülü olarak sayılır.",
  ),
  q024(
    "Etanol, HBr ile uygun yer değiştirme koşulunda etil bromüre dönüştürülüyor: C₂H₅OH + HBr → C₂H₅Br + X. X hangisidir?",
    "Alkol-halojenür dönüşümünde OH’nin yerini halojen alırken net su oluşabilir.",
    "Ürün tarafında eksik O ve H atomlarını tamamla.",
    [
      "Sol tarafta C2, O1, Br1 ve toplam H7 vardır.",
      "C₂H₅Br ürününde H5 bulunur; O yoktur.",
      "Eksik O1 ve H2, bir H₂O molekülünü verir.",
    ],
    [
      ["H₂O", "Eksik iki H ve bir O’yu birlikte tamamlar."],
      ["H₂", "O atomunu ürünlerde karşılıksız bırakır."],
      ["O₂", "Bir O’yu ikiye çıkarır ve H farkını kapatmaz."],
      ["CO₂", "Başlangıcın karbon sayısını ürünlerde aşar."],
      ["NaBr", "Denklemde bulunmayan Na atomu ekler."],
    ],
    "Yer değiştirmede uzaklaşan OH parçasını tek başına nihai ürün saymak.",
    "C₂H₆O+HBr ve C₂H₅Br+H₂O iki yanda H7 ve O1 verir.",
  ),
  q024(
    "Etanol ile propanoik asit uygun asit katalizli esterleşme yapıyor. Etanolün karbonları esterin hangi bölümünde bulunur?",
    "Ester adı önce alkolden gelen alkil, sonra asitten gelen alkanoat olarak okunur.",
    "Alkolün C₂H₅ parçasını ester O’sunun öbür yanında koru.",
    [
      "Propanoik asidin parçası CH₃CH₂C(=O)– olur.",
      "Etanolün C₂H₅ grubu –O–CH₂CH₃ tarafında yer alır.",
      "Ürün CH₃CH₂COOCH₂CH₃, etil propanoattır.",
    ],
    [
      [
        "O’ya bağlı etil bölümünde",
        "Etanol C₂H₅ grubu ester köprüsünün alkil yanındadır.",
      ],
      [
        "Karbonil karbonu dâhil propanoat bölümünde",
        "Asit ve alkol kökenlerini ters çevirir.",
      ],
      [
        "Yalnız su molekülünde",
        "Su karbon içermediği hâlde iki C’yi suya taşır.",
      ],
      ["Oluşan CO₂’de", "Esterleşmede verilmemiş karbon dioksit ürünü ekler."],
      ["Her iki C de kaybolur", "Atom korunumu ilkesini bozar."],
    ],
    "Esterin ilk adını asidin karbon sayısından seçmek.",
    "Toplam C sayısı asit3+alkol2=ester5; su C içermez.",
  ),
  q024(
    "X, CH₃CH₂CH₂OH; Y, CH₃CH(OH)CH₃’tür. Uygun kontrollü hafif yükseltgenme ve aynı iskelet varsayımı altında X ile Y’nin ilk organik ürünleri hangileridir?",
    "Primer ve sekonder alkol aynı toplam formüle rağmen farklı karbonil bağlantısı verir.",
    "İki OH karbonunun C komşularını ayrı say.",
    [
      "X’in OH karbonu bir C komşusuna sahiptir; primer alkoldür.",
      "Y’nin OH karbonu iki C komşusuna sahiptir; sekonder alkoldür.",
      "X propanal, Y propanon verir; ürünler C₃H₆O formüllü işlevsel grup izomeridir.",
    ],
    [
      [
        "X: propanal; Y: propanon",
        "Primer uç karbon aldehit, sekonder iç karbon keton verir.",
      ],
      ["X: propanon; Y: propanal", "Yerel karbon çevrelerini ters eşleştirir."],
      [
        "İkisi de propanoik asit",
        "Sekonderin hafif yükseltgenmesini yanlış aside taşır.",
      ],
      ["İkisi de etanal", "Üç C’li iki iskeletten de bir C düşürür."],
      [
        "X: propan; Y: propen",
        "Yükseltgenme yerine O’yu uzaklaştıran farklı dönüşümler seçer.",
      ],
    ],
    "Aynı molekül formülü aynı tepkime bağlantısını verir sanmak.",
    "Her iki ürün üç C taşır; karbonil karbonunun H taşıyıp taşımaması sınıfı ayırır.",
  ),
];
const etherPack024: Pack024 = {
  id: "ayt-eterler",
  topic: "detail-456",
  title: "Eterler",
  minutes: 70,
  objectives: [
    "R–O–R′ bağlantısını alkol ve esterden ayırmak",
    "Alkoksi adlandırmasını ve eter simetrisini yapı üzerinden belirlemek",
    "Hidrojen bağı alıcılığıyla vericiliğini ayırarak özellik ve izomerlik açıklamak",
  ],
  sections: [
    s024(
      "Başlamadan: bağlantı ve değerlik",
      "Nötr eter oksijeni iki tek bağla iki karbon grubuna bağlıdır: R–O–R′. O üzerinde iki bağ yapmayan elektron çifti bulunur. Buradaki R simgesi bir atom değil, bağlı organik grubun kısaltmasıdır.",
      "Ön koşul C’nin dört, nötr O’nun iki bağını tamamlamak ve yarı açık formülde gizli H’leri saymaktır. CH₃–O–CH₂CH₃’te O üzerinde H yoktur; etanoldeki O–H bağlantısından temel fark budur.",
    ),
    s024(
      "Alkol, eter, ester",
      "Alkol R–OH, eter R–O–R′, ester R–C(=O)–O–R′ bağlantısıyla tanınır. Eter O’sunun iki karbon komşusu olması tek başına esterle ayrım için yetmez; komşu karbonlardan birinin karbonil olup olmadığına da bakılır.",
      "CH₃OCH₃ eter, CH₃CH₂OH alkol, CH₃COOCH₃ esterdir. Esterin iki O’su ve karbonili vardır. Bir molekülde farklı yerlerde iki grup birlikte bulunabilir; molekülün bir eter bağlantısı içermesi başka grupları yok saydırmaz.",
    ),
    s024(
      "Genel formülün sınırları",
      "Yalnız C, H ve tek O içeren, açık zincirli, doymuş ve eter dışında ek işlev taşımayan monoeterler CₙH₂ₙ₊₂O formülünü taşır; n en az ikidir. İki C’ye bağlanması gereken O için metanolün bir C’li eter izomeri kurulamaz.",
      "Bir halka veya C=C bulunduğunda iki H azalabilir; aromatik grup da genel H sayısını değiştirir. Bu nedenle C₂H₄O formüllü epoksit eter bağı taşısa da açık zincirli doymuş monoeter formülüne uymaz; formülü tanımın yerine koyma.",
    ),
    s024(
      "Simetrik eter",
      "O’nun iki yanındaki gruplar bağlanma yerleri dâhil özdeşse eter simetriktir. CH₃–O–CH₃ dimetil eter, C₂H₅–O–C₂H₅ dietil eter bu sınıfa örnektir.",
      "Simetriyi çizimin sağ ve sol uzunluğuna göre seçme. Aynı grubun bir tarafta ters çizilmesi onu farklı yapmaz. Bağlantı grafiği eşleştiğinde gruplar özdeştir; modelde düz zincirlerin eşit C sayısı bu eşleşmeyi sağlar.",
    ),
    s024(
      "Asimetrik eter ve dallanma",
      "CH₃–O–C₂H₅ iki farklı grup taşıdığı için asimetriktir. n-Propil ile izopropil gruplarının ikisi de üç C taşımasına rağmen O’ya bağlanan karbonun çevresi farklıdır; bu ikili de asimetrik eter verir.",
      "Bu örnek karbon sayısı eşitliğinin genel simetri kanıtı olmadığını gösterir. Düz zincirli iki dalın yer aldığı sınırlı modelde eşit sayılar özdeş grubu gösterir; dallanmış veya halkalı gruplarda tam bağlantı incelenmelidir.",
    ),
    s024(
      "Alkoksi grubunu kurmak",
      "Bir alkil grubunu O üzerinden yan grup gibi okuduğunda alkoksi adı kullanılır. CH₃O– metoksi, C₂H₅O– etoksi, düz C₃H₇O– propoksi adını alır; O atomu ana karbon zincirinin bir karbonu sayılmaz.",
      "Basit açık zincirli örneklerde daha uzun C zinciri ana alkan, kısa taraf O ile birlikte alkoksi kabul edilir. CH₃OCH₂CH₂CH₃ bu yolla 1-metoksipropan olur; toplam C sayısı dört olsa da ana zincir üç C’dir.",
    ),
    s024(
      "Konum numarasını seçmek",
      "Alkoksi grubunun ana zincire bağlandığı C’ye en küçük uygun numarayı ver. CH₃CH(OCH₃)CH₂CH₃ için ana zincir bütan, yan grup metoksi ve bağlantı C2 olduğundan 2-metoksibütan adı yazılır.",
      "O’nun iki yanındaki karbonları tek kesintisiz C zinciri gibi birleştirme. Ana karbon zinciri C–C bağları boyunca izlenir; bir O üzerinden geçerek beş karbonlu alkan zinciri uydurmak eter adını yanlış kurar.",
    ),
    s024(
      "Yaygın adlandırma",
      "Yaygın adlandırmada O’ya bağlı iki grubun adı ve eter sözcüğü kullanılır. CH₃OC₂H₅ etil metil eter, C₂H₅OC₂H₅ dietil eter olarak okunabilir; özdeş iki grup için di- öneki kullanılır.",
      "Yaygın ve sistematik adlar aynı yapıya işaret edebilir: etoksi etan ve dietil eter aynı bağlantıdır. Bir adın iki kez listelenmesi iki farklı izomer olduğu anlamına gelmez; karşılaştırma için yarı açık formüle dön.",
    ),
    s024(
      "Aril eterler",
      "Eterde O’ya bağlı grubun alkil olması zorunlu değildir. C₆H₅–O–CH₃, metoksibenzen yani fenil metil eterdir; bir taraf aromatik halka, öbür taraf metildir.",
      "Fenol C₆H₅OH ile metoksibenzenin bağlantıları farklıdır. Fenolde O–H, aril eterde O–C vardır. Aromatik halkadaki doymamışlık nedeniyle bu türler açık zincirli doymuş monoeter formülüyle hesaplanmaz.",
    ),
    s024(
      "Halkalı eterler ve epoksit",
      "O atomu halkanın bir üyesi olabilir; böyle bir yapı halkalı eterdir. En küçük örnek olan üç üyeli epoksit halkası iki C ve bir O’dan oluşur, formülü C₂H₄O’dur.",
      "Halkanın gerilimi küçük halkalı eterlerin kimyasal davranışını açık zincirli eterlerden farklılaştırabilir. Olağan eterlerin görece ilgisiz çözücü oluşunu bütün halkalı eterlere ve her koşula mutlak kural olarak yayma.",
    ),
    s024(
      "Bağ polaritesi ve geometri",
      "C–O bağı O’nun daha elektronegatif olması nedeniyle polardır; basit eterlerde O çevresi açısaldır. Bağ dipollerinin tam silinmediği yapılarda molekül polar özellik gösterir ve dipol etkileşimlerine katılır.",
      "Polar olmak O–H bağı taşımak demek değildir. Eter molekülleri London kuvvetleri ve uygun dipol etkileşimleri gösterir; hidrojen bağı vericiliği ise ayrı bir yapısal ölçüttür.",
    ),
    s024(
      "Alıcı ile verici ayrımı",
      "Yalnız eter grubu taşıyan bir molekülde O–H veya N–H hidrojen bağı vericisi yoktur. O’nun bağ yapmayan elektron çiftleri suyun O–H hidrojenleriyle hidrojen bağı kabul edebilir.",
      "Bu yüzden eter suyla hidrojen bağı kurabilirken iki basit eter kendi aralarında klasik O–H···O bağı kuramaz. Bir molekülde ayrıca OH varsa sonuç değişir; burada tek işlevli eterler karşılaştırılır.",
    ),
    s024(
      "Kaynama noktasını yorumlamak",
      "Benzer mol kütlesi ve uygun yapılar karşılaştırıldığında O–H bağı taşıyan alkoller, saf eterlerden daha yüksek kaynama sıcaklığı gösterebilir. Örneğin etanol ve dimetil eter C₂H₆O izomerleridir; etanolün kendi arası H bağı fark yaratır.",
      "Büyük bir eter ile çok küçük bir alkolü yalnız sınıf adına göre kesin sıralamak doğru değildir; mol kütlesi, şekil ve basınç da etkilidir. Verilen ölçüm tablosu varsa genel eğilimin yerine doğrudan veriyi kullan.",
    ),
    s024(
      "Sudaki çözünürlük",
      "Kısa zincirli eterlerin O’su suyla etkileşebilir; hidrokarbon kısım büyüdükçe suyla karışmayı desteklemeyen bölüm artar. Aynı tür seri içinde C sayısının artması çoğunlukla çözünürlüğü azaltır.",
      "Eterler suda iyi çözünür ifadesini sınırsız bir kural yapma. Bir maddenin suyla hidrojen bağı kabul etmesi her oranda karışacağını kanıtlamaz; sıcaklık, yapı ve ölçülen miktar dikkate alınmalıdır.",
    ),
    s024(
      "Çözücü rolü",
      "Bir çözücü seçilirken hedef organik maddeyi çözmesi ve verilen ayıraçlarla gereksiz tepkimeye girmemesi istenir. Bazı eterler olağan seyreltik asit/baz ve birçok ayıraç karşısında görece dayanıklı olduğundan çözücü olarak kullanılır.",
      "Görece inert sözcüğü hiçbir koşulda tepkimesiz demek değildir. Güçlü asitlerle bağ kırılması veya bazı eterlerde havayla peroksit oluşumu ayrı davranışlardır. Tarihsel anestezik kullanımı kimyasal tanıma örnektir; kullanım yöntemi değildir.",
    ),
    s024(
      "Alkol–eter izomerliği",
      "Aynı molekül formülü, farklı atom bağlantısı izomerliği verir. Etanol ve dimetil eter C₂H₆O’dur; birinde C–C–O–H, öbüründe C–O–C bağlantısı olduğu için işlevsel grup izomeridirler.",
      "Bu eşleşme aynı toplam C sayılı açık zincirli doymuş tek OH’li alkol ile tek O’lu eter için kurulabilir. Metanolün eter izomeri yoktur; halkalı, çok işlevli veya doymamış örneklerde yalnız C sayısı yeterli kanıt değildir.",
    ),
    s024(
      "İzomer sayarken tekrarları ayırmak",
      "C₄H₁₀O eterleri için toplam dört C’yi 1+3 ve 2+2 olarak ayır. 1+3 dağılımında propil kısmı n-propil veya izopropil olabilir; 2+2 ise dietil eterdir. Böylece üç farklı eter bağlantısı oluşur.",
      "Sağ-sol yer değişimini yeni izomer sayma: metil propil eter ile propil metil eter aynı moleküldür. Önce karbon bölüşümünü, sonra her grubun dallanmasını ve O’ya bağlandığı yeri denetlemek eksik veya çift sayımı önler.",
    ),
    s024(
      "Bağ sayısı ve yanma kontrolü",
      "Açık zincirli doymuş bir monoeterde bütün bağlar sigmadır. Ağır atom zincirindeki bağlara gizli C–H bağları eklenince toplam sigma sayısı çıkar; örneğin dimetil eterde iki C–O ve altı C–H, toplam sekiz sigma vardır.",
      "Tam yanma hesabında eterin taşıdığı tek O’yu hesaba kat. CₙH₂ₙ₊₂O için CO₂=n, H₂O=n+1 ve O₂=3n/2 olur. Bu oran formül kapsamındaki eterlere aittir; halkalı veya aril eter için kendi formülünü kullan.",
    ),
  ],
  examples: [
    e024(
      "Alkoksi adını yapıdan bulmak",
      "CH₃–O–CH₂CH₂CH₂CH₃ yapısını sistematik ve yaygın adla okuyun.",
      "O’nun iki yanını ayrı karbon zincirleri olarak say.",
      [
        "Sol metil bir C, sağ n-bütil dört C taşır; ana zincir bütandır.",
        "Sol taraf O ile birlikte metoksi grubudur; bütanın uç C’sine bağlanır.",
        "Sistematik ad 1-metoksibütan; yaygın ad bütil metil eterdir.",
      ],
      "1-Metoksibütan; bütil metil eter",
      "Toplam C5,H12,O1: C₅H₁₂O; iki ad aynı bağlantıyı anlatır.",
      "O üzerinden geçerek beş C’li tek alkan zinciri seçmek.",
    ),
    e024(
      "Eşit C sayısının yetmediği simetri",
      "CH₃CH₂CH₂CH₂–O–CH(CH₃)CH₂CH₃ eteri simetrik midir?",
      "O’ya doğrudan bağlanan karbonların çevresini karşılaştır.",
      [
        "Sol n-bütilin O’ya bağlı C’si CH₂’dir ve bir C komşusu vardır.",
        "Sağ sek-bütilin O’ya bağlı C’si CH’dir ve iki C komşusu vardır.",
        "Dörder C taşımalarına rağmen gruplar özdeş değildir; eter asimetriktir.",
      ],
      "Asimetrik eter",
      "C₈H₁₈O formülü iki grubun aynı bağlantıda olduğunu kanıtlamaz.",
      "Toplam karbon sayıları eşit olan her iki grubu özdeş saymak.",
    ),
    e024(
      "Formülden uygun alkol eşini seçmek",
      "Açık zincirli doymuş monoeter X’in mol kütlesi 116 g/mol’dür. C=12,H=1,O=16 iken C sayısı ve bir alkol izomeri nedir?",
      "CₙH₂ₙ₊₂O kütlesini n cinsinden yaz.",
      [
        "M=12n+(2n+2)+16=14n+18 olur.",
        "14n+18=116 denkleminden n=7 bulunur; formül C₇H₁₆O’dur.",
        "Heptan-3-ol aynı formülü taşıyan bir alkol örneğidir; eterle işlevsel grup izomeridir.",
      ],
      "7 C; örneğin heptan-3-ol",
      "C7=84,H16=16,O=16 toplam 116 g/mol verir.",
      "O atomunu atlayarak M=14n+2 denklemi kurmak.",
    ),
    e024(
      "Düz dallı modelin bölüşümleri",
      "Toplam altı C taşıyan, iki yanı da düz alkil olan eterleri yalnız dal uzunluklarına göre kaç farklı bölüşümle kurabilirsin?",
      "Sol-sağ değişimini aynı sayarak pozitif tam sayı çiftlerini yaz.",
      [
        "a+b=6 ve a,b≥1 olmalıdır.",
        "Tekrarları kaldırınca 1+5, 2+4, 3+3 bölüşümleri kalır.",
        "Üç bölüşüm vardır; yalnız 3+3 özdeş düz propil grupları taşır ve simetriktir.",
      ],
      "3 bölüşüm; 1 simetrik",
      "5+1 ve 4+2 yeni bağlantı bölüşümü değildir; yalnız yön değişimidir.",
      "Dallanmış grup izomerlerini de saydığını sanmak; soru yalnız düz yanları sınırlar.",
    ),
    e024(
      "Eterin yanmasında kendi oksijeni",
      "0,12 mol C₅H₁₂O eterinin tam yanması için kaç mol O₂ gerekir?",
      "C ve H ürünlerinden gereken toplam O’yu bul.",
      [
        "Bir mol eter 5CO₂ ve 6H₂O verir; ürünlerde 16 O atomu vardır.",
        "Eterde bir O bulunduğu için O₂’den 15 O atomu, yani 7,5 mol O₂ gerekir.",
        "0,12×7,5=0,90 mol O₂ bulunur.",
      ],
      "0,90 mol O₂",
      "2C₅H₁₂O+15O₂→10CO₂+12H₂O denkliğiyle aynı sonuca ulaşılır.",
      "Ürünün 16 O atomunu tamamen O₂’den sayıp 0,96 mol bulmak.",
    ),
  ],
  recall: [
    {
      prompt: "Bir eter O’su kaç karbon ve kaç H taşır?",
      answer: "Basit nötr R–O–R′ eterinde iki C komşusu ve sıfır O–H vardır.",
    },
    {
      prompt: "Eter suyla H bağı kurarken kendi arasında neden kuramayabilir?",
      answer:
        "O elektron çiftleriyle alıcıdır; tek işlevli eterde O–H/N–H vericisi yoktur.",
    },
    {
      prompt: "n-Propil ile izopropil aynı C sayısıyla simetri verir mi?",
      answer:
        "Hayır; O’ya bağlanma çevreleri farklı olduğundan özdeş grup değildir.",
    },
    {
      prompt: "Epoksitte CₙH₂ₙ₊₂O niçin kullanılamaz?",
      answer:
        "Epoksit halkalı eterdir; bu formül açık zincirli doymuş monoeter içindir.",
    },
    {
      prompt: "C₄H₁₀O eterlerini saymada hangi iki işlem gerekir?",
      answer:
        "1+3 ve 2+2 C bölüşümleri, sonra propil kısmının iki bağlanma biçimi incelenir; sağ-sol tekrarları silinir.",
    },
  ],
  items: [],
};
etherPack024.items = [
  q024(
    "Aşağıdaki yarı açık yapılardan hangisi yalnız bir eter grubu taşır?",
    "Eter bağlantısı C–O–C’dir; O komşusu karbonil C ise ester ayrımı yapılır.",
    "O’nun iki komşusunu ve C=O bulunup bulunmadığını incele.",
    [
      "CH₃OCH₂CH₃’te O iki doymuş C’ye tek bağla bağlıdır.",
      "Bu yapıda O–H veya C=O yoktur.",
      "Dolayısıyla yalnız eter grubunu taşır.",
    ],
    [
      ["CH₃OCH₂CH₃", "O iki karbon arasında köprüdür; karbonil ve OH yoktur."],
      ["CH₃CH₂OH", "O bir H taşır; alkoldür."],
      ["CH₃COOCH₃", "O karbonil karbonuna bağlıdır; esterdir."],
      ["CH₃CHO", "C=O ve aldehidik H vardır; aldehittir."],
      ["CH₃COOH", "Karboksil grubudur; eter değildir."],
    ],
    "Esterdeki C–O–C parçasını karbonil çevresini okumadan eter saymak.",
    "Seçilen yapıda yalnız bir O ve iki tek C–O bağı bulunur.",
  ),
  q024(
    "Yalnız C, H ve tek O içeren, açık zincirli, doymuş ve eter dışında ek işlev taşımayan bir monoeter toplam dört C taşıyor. Molekül formülü hangisidir?",
    "Bu sınırlı sınıf CₙH₂ₙ₊₂O formülünü taşır.",
    "n=4’ü yalnız verilen kapsam içinde yerine koy.",
    [
      "n=4 için H sayısı 2×4+2=10’dur.",
      "Tek O bulunduğu için O alt indisi birdir.",
      "Molekül formülü C₄H₁₀O olur.",
    ],
    [
      ["C₄H₁₀O", "Açık zincirli doymuş monoeterin H ve O sayısını korur."],
      ["C₄H₈O", "Ek halka veya çift bağ kadar iki H eksiltir."],
      ["C₄H₁₀O₂", "Tek O koşuluna aykırı ikinci O ekler."],
      ["C₄H₈O₂", "Asit/ester formülünü bu eter için kullanır."],
      ["C₃H₈O", "Toplam dört C koşulunu üçe indirir."],
    ],
    "Tüm oksijenli organik sınıflar için aynı genel formülü kullanmak.",
    "Örnek C₂H₅OC₂H₅ açık sayıldığında C4,H10,O1 verir.",
  ),
  q024(
    "CH₃–O–CH₂CH₂CH₃ yapısının temel sistematik adı hangisidir?",
    "Kısa taraf O ile alkoksi, uzun karbon zinciri ana alkan olarak okunur.",
    "Üç C’li ana zincir ve tek C’li O yan grubunu ayır.",
    [
      "O’nun sol tarafı metil, sağ tarafı n-propildir.",
      "Ana zincir propan, yan grup metoksidir.",
      "Metoksi uç C’ye bağlı olduğundan ad 1-metoksipropandır.",
    ],
    [
      ["1-Metoksipropan", "Üç C’li ana zincir ve uç metoksi grubunu gösterir."],
      ["Etoksietan", "İki etil grubu içeren farklı eterdir."],
      ["Bütan-1-ol", "Aynı formüllü olabilir; O–H bağlantısını değiştirir."],
      [
        "2-Metoksipropan",
        "O’yu propanın orta C’sine bağlayan farklı izomerdir.",
      ],
      ["Metoksietan", "Sağ zinciri üç yerine iki C sayar."],
    ],
    "Toplam C sayısını ana zincirin C sayısı sanmak.",
    "İki yan toplamı 1+3=4 C’dir; ana zincir tek başına üç C taşır.",
  ),
  q024(
    "CH₃CH₂–O–CH₂CH₃ için hangi ad çifti aynı yapıyı gösterir?",
    "Dietil eterin sistematik karşılığı etoksietandır.",
    "O’nun iki yanında iki C’li özdeş grupları oku.",
    [
      "Her iki taraf C₂H₅ grubudur.",
      "Yaygın ad iki etil için dietil eterdir.",
      "Bir etil tarafı etoksi, öbürü etan seçilirse etoksietan adı elde edilir.",
    ],
    [
      [
        "Dietil eter ve etoksietan",
        "İki ad da C₂H₅–O–C₂H₅ bağlantısını gösterir.",
      ],
      [
        "Dimetil eter ve metoksietan",
        "Birinci ad C2, ikinci ad C3 toplamı verir; ikisi de bu C4 yapı değildir.",
      ],
      [
        "Bütanol ve dietil eter",
        "Formülleri eşleşebilir; biri alkol, biri eterdir.",
      ],
      [
        "Metil propil eter ve etoksietan",
        "İlki 1+3, ikincisi 2+2 dağılımlı farklı bağlantıdır.",
      ],
      ["Etil etanoat ve dietil eter", "İlkinde ikinci O ve karbonil vardır."],
    ],
    "Aynı toplam C’ye sahip adları bağlantı kontrolü olmadan eşanlamlı saymak.",
    "Yapı C₄H₁₀O’dur; iki O komşusu da CH₂ çevresindedir.",
  ),
  q024(
    "Aşağıdaki eterlerden hangisinde O’nun iki yan grubu özdeştir?",
    "Simetrik eterde iki organik grup bağlanma çevresiyle birlikte aynıdır.",
    "Sağ ve sol grupları ayrı adlandırıp eşleştir.",
    [
      "C₂H₅OC₂H₅’te iki taraf da etildir.",
      "Diğer seçeneklerde iki tarafın C sayısı veya dallanması farklıdır.",
      "Özdeş iki etil taşıyan dietil eter simetriktir.",
    ],
    [
      ["C₂H₅OC₂H₅", "Her iki yan grup aynı etil bağlantısıdır."],
      ["CH₃OC₂H₅", "Metil ve etil farklıdır."],
      ["CH₃OCH₂CH₂CH₃", "Metil ile n-propil farklıdır."],
      [
        "n-C₃H₇OCH(CH₃)₂",
        "n-Propil ile izopropil aynı C sayısına rağmen farklıdır.",
      ],
      ["C₂H₅OCH₂CH₂CH₃", "Etil ve n-propil farklıdır."],
    ],
    "Dalların aynı sayıda harf veya C taşımasını tek başına özdeşlik saymak.",
    "Simetrik seçenekte O’dan başlayan iki dalın bağlantıları tam eşleşir.",
  ),
  q024(
    "n-C₃H₇–O–CH(CH₃)₂ için doğru yorum hangisidir?",
    "Aynı C sayılı gruplar farklı dallanma ve bağlanma çevresi taşıyabilir.",
    "O’ya doğrudan bağlı C’nin CH₂ mi CH mi olduğunu karşılaştır.",
    [
      "Sol O komşusu CH₂, sağ O komşusu CH’dir.",
      "Sol n-propil, sağ izopropil olduğundan gruplar özdeş değildir.",
      "Bu yüzden toplam iki yanda üçer C olsa da eter asimetriktir.",
    ],
    [
      [
        "Asimetriktir; n-propil ve izopropil farklıdır",
        "O çevresindeki bağlantı farkını esas alır.",
      ],
      [
        "Simetriktir; iki yanda da üç C vardır",
        "Karbon sayısını tam grup özdeşliği sanır.",
      ],
      [
        "Alkoldür; toplam H sayısı fazladır",
        "O–H olmadığı hâlde alkol sınıfı verir.",
      ],
      [
        "Esterdir; O iki C’ye bağlıdır",
        "Ester için gerekli karbonili yok sayar.",
      ],
      ["Formülü C₆H₁₂O’dur", "Açık zincirli doymuş yapıdan iki H eksiltir."],
    ],
    "Düz zincirli modelin eşit-C kuralını dallanmış gruplara taşımak.",
    "Bağlantı asimetrik olsa da toplam formül C₆H₁₄O’dur.",
  ),
  q024(
    "Yalnız eter grubu taşıyan CH₃OC₂H₅ ile su arasındaki hidrojen bağı en doğru nasıl açıklanır?",
    "Eter O’su bağ yapmayan elektron çiftleriyle H bağı alıcısı olabilir.",
    "Vericinin H’sini ve alıcının elektron çiftini belirle.",
    [
      "Eterin O üzerinde H’si yoktur; O–H vericisi değildir.",
      "Su O–H hidrojeni verebilen taraftır.",
      "Su hidrojeni ile eter O’sunun elektron çifti arasında H bağı kurulabilir.",
    ],
    [
      [
        "Su verici, eter O’su alıcı olabilir",
        "O–H vericisini ve elektron çifti alıcısını doğru ayırır.",
      ],
      [
        "Eter O’sundaki H suya bağlanır",
        "Eter O’suna yapıda bulunmayan H ekler.",
      ],
      [
        "Eterin tüm C–H bağları kuvvetli O–H vericisidir",
        "C–H ile O–H donör özelliklerini aynılaştırır.",
      ],
      [
        "Eterde O bulunduğu için yalnız iyonik bağ kurulur",
        "Nötr moleküllerin etkileşimini zorunlu iyonlaşma sanır.",
      ],
      [
        "Eter suyla hiçbir H bağı kuramaz",
        "O’nun elektron çiftlerini alıcı olarak kullanabilmesini yok sayar.",
      ],
    ],
    "H bağı alıcılığını O–H bağı varlığıyla aynı koşula bağlamak.",
    "Eter nötr ve O–H’siz kalır; bu etkileşim yeni kovalent ürün gerektirmez.",
  ),
  q024(
    "Etanol ile dimetil eter C₂H₆O izomerleridir. Aynı basınçta etanolün daha yüksek kaynama noktasını açıklayan başlıca fark hangisidir?",
    "Etanol kendi molekülleri arasında O–H···O hidrojen bağı kurabilir.",
    "Mol kütlesi aynı iki yapının H bağı vericiliğini karşılaştır.",
    [
      "İki maddenin toplam atomları ve mol kütlesi aynıdır.",
      "Etanol O–H taşır; dimetil eterde O–H yoktur.",
      "Etanolün kendi arası hidrojen bağı, kaynamada aşılması gereken etkileşimleri güçlendirir.",
    ],
    [
      [
        "Etanolün kendi arası hidrojen bağı kurması",
        "Aynı formül koşulunda O–H bağlantısı farkını kullanır.",
      ],
      ["Etanolün daha fazla O atomu taşıması", "İki maddede de bir O vardır."],
      [
        "Dimetil eterin tamamen apolar olması",
        "C–O bağ polaritesini ve açısal çevreyi göz ardı eder.",
      ],
      [
        "Etanolün iyonik kristal olması",
        "Nötr moleküler sıvıyı tuz gibi tanımlar.",
      ],
      [
        "Dimetil eterin daha fazla C taşıması",
        "İkisinde de iki C bulunduğuna aykırıdır.",
      ],
    ],
    "Aynı formülü olan izomerlerin bütün fiziksel özelliklerini aynı saymak.",
    "Fark atom sayısında değil O–H ile C–O–C bağlantılarındadır.",
  ),
  q024(
    "Aynı sıcaklıkta benzer açık zincirli monoeterler arasında karbon zinciri belirgin büyüdüğünde sudaki çözünürlüğün genellikle azalması hangi nedenle açıklanır?",
    "Çözünürlük, suyla etkileşen O grubu ile hidrokarbon bölümünün birlikte etkisidir.",
    "O sayısı sabitken büyüyen kısmı belirle.",
    [
      "Seride eter O sayısı bir olarak kalır.",
      "Hidrokarbon bölümünün suyla elverişsiz etkileşen payı büyür.",
      "Bu yüzden yalnız O alıcılığı sınırsız karışmayı garanti etmez; çözünürlük azalabilir.",
    ],
    [
      [
        "Hidrokarbon bölümünün payının büyümesi",
        "Sabit O’ya karşı artan hidrofobik bölüm etkisini açıklar.",
      ],
      ["O atomunun tamamen yok olması", "Seride tek O korunmaktadır."],
      [
        "Bütün C–O bağlarının iyonlaşması",
        "Verilen nötr eter serisinde böyle bir iyonlaşma yoktur.",
      ],
      ["Eterin O–H sayısının artması", "Basit eter O–H taşımaz."],
      [
        "Karbon sayısının su molekülünü parçalanmaya zorlaması",
        "Çözünürlüğü kimyasal su parçalanması gibi yorumlar.",
      ],
    ],
    "Bir H bağı alıcısı vardır diye her eterin suyla her oranda karıştığını düşünmek.",
    "Eğilim benzer seri ve aynı sıcaklık kapsamındadır; ölçülen veri varsa o kullanılır.",
  ),
  q024(
    "C₂H₄O formüllü üç üyeli C–C–O halkası epoksit olarak verilmiştir. Neden CₙH₂ₙ₊₂O formülüyle H sayısı bulunamaz?",
    "CₙH₂ₙ₊₂O açık zincirli doymuş monoeterlere aittir.",
    "Genel formülün hangi ön koşulunun bozulduğunu bul.",
    [
      "Epoksitte O, iki C ile birlikte bir halka oluşturur.",
      "Halka kapanması açık zincirli eşine göre iki H azaltır.",
      "n=2 için C₂H₆O bekleyen açık zincir formülü bu halkalı yapıya uygulanamaz.",
    ],
    [
      [
        "Yapı halkalıdır; açık zincir koşulunu sağlamaz",
        "İki H eksilmesinin yapısal nedenini gösterir.",
      ],
      [
        "Eter oksijeni üç bağ yapmıştır",
        "O’nun iki C’ye iki tek bağı vardır; üçüncü bağ uydurur.",
      ],
      ["Molekülde karbon bulunmaz", "Verilen iki C’yi yok sayar."],
      ["Her eter iki O taşır", "Eter tanımına yanlış bir O sayısı ekler."],
      [
        "Epoksitte zorunlu C=O vardır",
        "Verilen halka yalnız tek bağlar taşır.",
      ],
    ],
    "Genel formülü işlevsel grubun koşulsuz tanımı olarak kullanmak.",
    "Halkalı C₂H₄O ile açık zincirli dimetil eter C₂H₆O farklı formüllüdür.",
  ),
  q024(
    "C₆H₅–O–CH₃ yapısının adı ve sınıfı hangisidir?",
    "O bir aril ve bir alkil grubuna da bağlanabilir; bu aril eterdir.",
    "Benzen halkasındaki O–CH₃ grubunu alkoksi olarak oku.",
    [
      "O’nun bir komşusu fenil halkası C’si, öbürü metil C’sidir.",
      "O–H bulunmadığı için fenol değildir.",
      "Yapı metoksibenzen, yani fenil metil eterdir.",
    ],
    [
      [
        "Metoksibenzen; aril eter",
        "Fenil–O–metil bağlantısını doğru adlandırır.",
      ],
      ["Fenol; alkol", "O–CH₃ yerine O–H varsayar."],
      ["Benzaldehit; aldehit", "Yapıda olmayan C=O ve CHO ekler."],
      ["Metil benzoat; ester", "İkinci O ve karbonil C ekler."],
      [
        "Siklohekzanol; doymuş alkol",
        "Aromatik halkayı ve O–C bağını değiştirir.",
      ],
    ],
    "Benzen halkasına O bağlandığında her yapıyı fenol saymak.",
    "Formül C₇H₈O’dur; açık zincir C₇H₁₆O eşitliği burada kullanılmaz.",
  ),
  q024(
    "C₄H₁₀O formüllü yalnız eter bağlantı izomerleri sayılıyor; sağ-sol çizim tekrarı yeni izomer kabul edilmiyor. Kaç farklı eter vardır?",
    "1+3 ve 2+2 karbon bölüşümleri, propil kısmının bağlanma türleriyle tamamlanır.",
    "Her bölüşümde dallanmayı kontrol et, sonra tekrarları sil.",
    [
      "1+3 dağılımı metil n-propil ve metil izopropil eteri verir.",
      "2+2 dağılımında yalnız dietil eter oluşur.",
      "Toplam 2+1=3 farklı eter bağlantısı vardır.",
    ],
    [
      ["3", "İki propil bağlanması ile bir dietil yapısını sayar."],
      ["1", "1+3 bölüşümünü ve dallanma farkını atlar."],
      ["2", "1+3 için n-propil/izopropil farkını tek yapı sayar."],
      ["4", "Sağ-sol tekrarı veya bir alkolü fazladan ekler."],
      ["7", "Eterler yerine alkol izomerlerini de toplama katar."],
    ],
    "Bir molekülü sağdan ve soldan yazınca iki izomer olduğunu düşünmek.",
    "Üçü de C4,H10,O1 verir; O komşularının bağlantıları üç ayrı biçimdedir.",
  ),
  q024(
    "Dimetil eter CH₃–O–CH₃ molekülündeki toplam sigma ve pi bağı sayıları hangisidir?",
    "Her tek bağ bir sigma; çift bağ bulunmadığında pi sıfırdır.",
    "Görünen C–O bağlarına gizli C–H bağlarını ekle.",
    [
      "İki C–O tek bağı iki sigma verir.",
      "İki CH₃ grubunda toplam altı C–H bağı vardır.",
      "Toplam sigma 2+6=8; pi=0 olur.",
    ],
    [
      ["8 sigma, 0 pi", "İki C–O ve altı C–H bağını birlikte sayar."],
      ["2 sigma, 0 pi", "Gizli C–H bağlarını atlar."],
      ["6 sigma, 2 pi", "C–O tek bağlarını yanlışlıkla pi sayar."],
      ["7 sigma, 1 pi", "Yapıda olmayan bir çift bağ ekler."],
      ["8 sigma, 1 pi", "Tek bağlarla dolu yapıya bir pi bağı uydurur."],
    ],
    "Yarı açık formülde yalnız çizilmiş çizgileri saymak.",
    "Dokuz atomlu açık zincirli molekülde sekiz bağ vardır; hepsi tektir.",
  ),
  q024(
    "0,40 mol C₃H₈O eterinin yeterli O₂ ile tam yanmasında kaç mol CO₂ oluşur?",
    "Tam yanmada her C atomu bir CO₂’nin karbonu olur.",
    "Eterin üç C’sini CO₂ katsayısına dönüştür.",
    [
      "Bir mol C₃H₈O, üç mol CO₂ verir.",
      "0,40 mol eterde 1,20 mol C atomu vardır.",
      "n(CO₂)=3×0,40=1,20 mol olur.",
    ],
    [
      ["1,20", "Üç C başına üç CO₂ oranını uygular."],
      ["0,40", "Bir yakıt molekülünü bir CO₂ ile eşitler."],
      ["0,80", "Yakıtı iki C’li eter gibi sayar."],
      ["1,60", "H₂O’nun dört katsayısını CO₂’ye taşır."],
      ["1,80", "O₂’nin 4,5 katsayısını CO₂ için kullanır."],
    ],
    "Tepkime ürünlerinin katsayılarını atom türlerini izlemeksizin değiş tokuş etmek.",
    "0,40×3=1,20 mol başlangıç karbonu, CO₂’deki karbonla aynıdır.",
  ),
  q024(
    "Bir eter organik tepkimede çözücü olarak seçiliyor; açıklamada olağan seyreltik asit/baz koşullarına görece dayanıklı olduğu yazıyor. Bu bilginin doğru yorumu hangisidir?",
    "Görece inertlik belirtilen koşullarda düşük tepkime eğilimidir; koşulsuz tepkimesizlik değildir.",
    "Çözücü rolü ile bütün kimyasal koşulları kapsayan iddiayı ayır.",
    [
      "Çözücü hedef maddeyi çözmeli ve verilen tepkimeye gereksiz katılmamalıdır.",
      "Olağan koşullardaki dayanıklılık bu kullanımın bir nedenidir.",
      "Bu bilgi, güçlü başka koşullarda veya farklı eterlerde hiç tepkime olmayacağını kanıtlamaz.",
    ],
    [
      [
        "Verilen koşullarda tepkimeye az katılması çözücü seçimini destekler",
        "Görece dayanıklılığı kendi koşul sınırında yorumlar.",
      ],
      [
        "Bütün eterler hiçbir koşulda tepkime vermez",
        "Sınırlı ifadeyi koşulsuz mutlaklaştırır.",
      ],
      [
        "Eter çözücü olduğunda iyonik bileşiğe dönüşür",
        "Çözücü rolüne olmayan bir iyonlaşma ekler.",
      ],
      [
        "Çözücü olarak kullanılması O–H içerdiğini kanıtlar",
        "Eterde O–H olmadığını gözden kaçırır.",
      ],
      [
        "İnert olması bütün maddeleri suda çözdüğünü gösterir",
        "Tepkime eğilimi ile çözünürlüğü aynı özellik sanır.",
      ],
    ],
    "Kimyasal inertliği her koşul için değişmez ve sınırsız bir özellik saymak.",
    "Yargı koşula bağlıdır; model bir laboratuvar kullanım veya saklama yönergesi vermez.",
  ),
];
const carbonylPack024: Pack024 = {
  id: "ayt-aldehit-keton",
  topic: "detail-457",
  title: "Aldehit ve ketonlar",
  minutes: 95,
  objectives: [
    "Karbonil çevresinden aldehit ve ketonu ayırmak ve adlandırmak",
    "İndirgenme ile seçici yükseltgenmenin ürünlerini koşullarıyla belirlemek",
    "Tollens ve Fehling testlerinde organik ürün, metal ürünü ve mol oranını birlikte denetlemek",
  ],
  sections: [
    s024(
      "Başlamadan: karbonil bağı",
      "Karbonil grubu C=O’dur; bir sigma ve bir pi bağı içerir. Karbonil karbonu yaklaşık düzlemsel sp² çevre taşır; idealize yerel açılar yaklaşık 120°’dir. Bu bilgi bütün molekülün tek düzlemde olduğu anlamına gelmez.",
      "Nötr karbonil oksijeni üzerinde iki bağ yapmayan elektron çifti vardır. Bunlar iki eşleşmemiş elektron değildir. Ön koşul, değerlik, kısmi yük ile tam iyon yükü ve tek/çift bağ farkını okuyabilmektir.",
    ),
    s024(
      "Polar karbonil ve açil",
      "O, bağ elektronlarını C’den daha güçlü çeker; karbonil O’su kısmi eksi, C’si kısmi artı karakter kazanır. C=O içermek tek başına aldehit olmak değildir; asit, ester ve keton da karbonil taşıyabilir.",
      "R–C(=O)– parçası açil grubu olarak okunur; buradaki grup çizimi her zaman serbest, eşleşmemiş elektronlu radikal taneciği anlatmaz. Tam sınıfı karbonil C’nin diğer komşularını tamamlayarak belirle.",
    ),
    s024(
      "Aldehidi tanımak",
      "Basit aldehitte karbonil karbonuna en az bir H doğrudan bağlıdır; diğer tek bağ komşuları H veya C’dir: R–CHO’da R, H ya da karbonla bağlanan gruptur. Metanal HCHO’da bu karbon iki H; etanal CH₃CHO’da bir H ve bir C komşusu taşır. H–C(=O)–NH₂ ise N komşuluğundan dolayı amid olup aldehit değildir.",
      "CHO yazımındaki H, O’ya değil karbonil C’ye bağlıdır. Bu ayrım aldehidi karboksilik asidin C(=O)–OH grubundan ayırır. Açık zincirli monoaldehitte CHO zincirin ucundadır; aromatik bir gruba dışarıdan da bağlanabilir.",
    ),
    s024(
      "Ketonu tanımak",
      "Ketonda karbonil C iki karbon grubuna doğrudan bağlıdır: R–CO–R′. En küçük basit örnek CH₃COCH₃, propanon yani asetondur; karbonil C’nin iki C komşusu için toplam en az üç C gerekir.",
      "Karbonil C’ye doğrudan H bağlı değildir; yan metil gruplarının H taşıması bu ölçütü değiştirmez. Halkalı ketonda karbonil C halkanın üyesi olabilir; siklohekzanon bu yüzden ketondur, aldehit değildir.",
    ),
    s024(
      "Formül ve kapsam",
      "Yalnız C, H ve tek O içeren, açık zincirli, C–C çoklu bağı ve ek işlev taşımayan tek karbonilli aldehit ve ketonlar CₙH₂ₙO formülüne uyar. Buradaki iki H eksikliği karbonil pi bağıyla ilişkilidir; ayrıca C=C bulunduğunu göstermez.",
      "Siklohekzanon C₆H₁₀O, benzaldehit C₇H₆O formüllüdür. Halka ve aromatik bağlar H sayısını ayrıca azaltır. Her aldehit ve ketona CₙH₂ₙO uygulamak veya bu formülün tek başına sınıfı kesinleştirdiğini söylemek yanlıştır.",
    ),
    s024(
      "Aldehit adlandırması",
      "CHO karbonunu içeren en uzun uygun ana zinciri seç; aldehit C’sini 1 kabul et. Alkan köküne -al eki gelir: CH₃CH₂CH₂CHO bütanal olur. Dal konumları da bu başlangıca göre numaralanır.",
      "CHO karbonunu zincirin dışında bırakmak adı bir C eksik verir. CH₃CH(CH₃)CH₂CHO yapısı dört C’li aldehit zinciri üzerinde C3’te metil taşır; 3-metilbütanaldir. Toplam C sayısı ana zincir uzunluğundan büyük olabilir.",
    ),
    s024(
      "Keton adlandırması",
      "Karbonili içeren ana zinciri seçip C=O’ya en küçük uygun numarayı ver. CH₃COCH₂CH₂CH₃ pentan-2-on, CH₃CH₂COCH₂CH₃ pentan-3-on olarak ayrılır.",
      "Üç ve dört C’li düz zincirli ketonlarda başka farklı iç konum olmadığından propanon ve bütanon adları yeterlidir; propan-2-on ve bütan-2-on da konumu açıklar. Beş C’de 2 ve 3 konumu gerçek farklı izomerlerdir.",
    ),
    s024(
      "Yaygın ad ve simetri",
      "Propanon, aseton veya dimetil keton aynı molekülün adlarıdır. CH₃COC₂H₅ etil metil keton yani bütanondur; karbonil dışındaki iki organik grup okunarak yaygın ad kurulabilir.",
      "İki yan grup özdeşse simetrik, farklıysa asimetrik keton denebilir. 3-Pentanon iki etil taşıdığı için simetrik; 2-pentanon metil ve propil taşıdığı için asimetriktir. Toplam C sayısı tek başına simetriyi belirlemez.",
    ),
    s024(
      "Aromatik ve halkalı örnekler",
      "Benzaldehitte C₆H₅–CHO grubu vardır: aldehit C’si benzen halkasına dışarıdan bağlıdır ve H taşır. Siklohekzanonda ise C=O karbonu altı üyeli halkanın içindedir, iki halka C’sine bağlıdır.",
      "Bir yapının aromatik veya halkalı olması karbonil sınıfını tek başına seçtirmez. Karbonil karbonunun H ve C komşuları aynı ölçütle okunur; aldehit H’si benzaldehitte de vardır, siklohekzanonda yoktur.",
    ),
    s024(
      "İşlevsel grup izomerliği",
      "Propanal CH₃CH₂CHO ve propanon CH₃COCH₃ aynı C₃H₆O formülünde farklı bağlantılardır; aldehit–keton işlevsel grup izomerliği verir. Metanal ve etanal için keton izomeri yoktur çünkü keton en az üç C ister.",
      "Aynı C sayısı ancak formül kapsamı da uygunken bu eşleşmeyi destekler. Aromatik aldehit ile aynı C sayılı açık zincir ketonu doğrudan izomer ilan etme; önce H ve O dâhil bütün molekül formülünü karşılaştır.",
    ),
    s024(
      "Konum ve iskelet izomerliği",
      "Pentan-2-on ile pentan-3-on aynı keton grubunun farklı konumlarıdır; konum izomeridir. Bir aldehidin karbon iskeletinin dallanması ise farklı iskelet bağlantıları verebilir.",
      "İzomerlik türünü seçerken değişen özelliği açıkla: yalnız karbonilin yeri mi, C iskeleti mi, yoksa aldehit/keton grubu mu değişiyor? İki ayrı yaygın adın aynı yapıyı anlatması izomerlik değildir.",
    ),
    s024(
      "Hidrojen bağı ve kaynama",
      "Yalnız karbonil grubu taşıyan basit aldehit/ketonda O–H vericisi bulunmaz. Molekülleri kendi aralarında klasik O–H···O bağı kurmaz; karbonil O’su su gibi vericilerden H bağı kabul edebilir.",
      "Benzer mol kütleleri ve uygun yapılar içinde alkollerin kendi arası H bağı, kaynama noktalarını yükseltebilir. Karbonil bileşikleri de dipol ve London etkileşimleri taşır; H bağı vericisi olmamak apolar veya etkileşimsiz olmak demek değildir.",
    ),
    s024(
      "Çözünürlük ve fiziksel hâl",
      "Kısa zincirli karbonillerin suyla etkileşimi karbonil O’sundan desteklenir; hidrokarbon bölümünün büyümesi çoğunlukla sudaki çözünürlüğü azaltır. Ek OH grubu taşıyan bir türev, tek işlevli karşılaştırmadan farklı davranabilir.",
      "Bir maddenin sıvı veya gaz hâlini sıcaklık ve basınçla birlikte söyle. Etanalın 1 atm’de kaynama noktası yaklaşık 21 °C ise 25 °C’de açık, normal basınçtaki denge davranışını her zaman sıvı diye tanımlamak doğru değildir.",
    ),
    s024(
      "Aldehit yükseltgenmesi",
      "Uygun yükseltgenle aldehit aynı karbon iskeletli karboksilik aside dönüşebilir: CH₃CH₂CHO+[O]→CH₃CH₂COOH. Bir O eşdeğeri eklenir; organik molekülün H sayısı bu net basamakta değişmez.",
      "Ürün ortamın asitliğine bağlıdır. Asidik veya asitlendirilmiş gösterimde RCOOH yazılır; bazik Tollens/Fehling ortamında doğrudan RCOO⁻ oluşur. Bir ürün adını ortamı silerek bütün koşullara taşımamak gerekir.",
    ),
    s024(
      "Tollens gözlemi",
      "Tollens ayıracındaki gümüş(I) türü uygun aldehitle indirgenerek Ag metali oluşturur; gümüş aynası gözlemi bu metal ürüne bağlıdır. Aldehit ise yükseltgenir; iki taraf zıt elektron alışverişi yapar.",
      "Bazik ortam için basitleştirilmiş denklem RCHO+2Ag⁺+3OH⁻→RCOO⁻+2Ag+2H₂O’dur. Ag⁺ burada kompleks ayrıntısı bastırılmış hesap gösterimidir; gerçek ayıraç amonyaklı gümüş kompleksini içerir.",
    ),
    s024(
      "Tollens: kompleks ve yük hesabı",
      "Kompleksi açık yazınca RCHO+2[Ag(NH₃)₂]⁺+3OH⁻→RCOO⁻+2Ag+4NH₃+2H₂O elde edilir. İki tarafta net yük −1’dir; N, H ve O sayıları da korunur.",
      "Bir aldehit grubunun kontrollü ilk yükseltgenmesinde bir mol aldehit iki mol Ag verir. Metanal/formiatın ileri yükseltgenmesi farklı toplam gümüş oranları doğurabildiğinden miktar sorusu yalnız ilk basamak veya uygun aldehit için sınırlandırılır.",
    ),
    s024(
      "Fehling gözlemi",
      "Fehling bazik ortamda komplekslenmiş Cu(II) içerir. Uygun alifatik aldehit Cu(II)’yi Cu(I)’e indirger; kızıl kahverengi Cu₂O oluşur. Bir Cu₂O’da iki Cu atomu bulunduğunu mol hesabına kat.",
      "Basitleştirilmiş net iyon denkliği RCHO+2Cu²⁺+5OH⁻→RCOO⁻+Cu₂O+3H₂O’dur. Ligandlar hesapta bastırılmıştır; bazik doğrudan ürün karboksilattır. Bir mol uygun aldehit için bir mol Cu₂O oluşur.",
    ),
    s024(
      "Seçicilik: sınıf ve yapı",
      "Benzaldehit Tollens’e pozitif yanıt verebilirken olağan Fehling testinde pozitif sonuç beklenmez. Fehling ayrımını az C’li/çok C’li aldehit diye kurmak doğru değildir; alifatik-aromatik yapı ve koşul önemlidir.",
      "Basit ketonlar olağan bu testlerde negatif kabul edilir. Bazı alfa-hidroksi ketonlar veya şekere ait denge dönüşümleri ayrı davranabilir; bu ünitenin test karşılaştırması ek işlev taşımayan seçilmiş basit ketonlarla sınırlandırılır.",
    ),
    s024(
      "Karbonil indirgenmesi",
      "Aldehit ve ketonlar uygun ayıraçla indirgenerek alkole dönüşebilir. C=O’nun pi bağı gider; O’ya bir H ve C’ye bir H eklenmesi net H₂ katılması olarak izlenir.",
      "Propanal → 1-propanol, propanon → 2-propanol örneklerinde karbon iskeleti korunur. Metanalın ürünü metanoldür; metanolü zorla sıradan bir C komşuluğu sınıfına sokmak yerine özel en küçük ürünü adıyla belirt.",
    ),
    s024(
      "Ketonun yükseltgenme sınırı",
      "Basit ketonlarda karbonil C’ye bağlı H yoktur. Olağan hafif yükseltgenmede aldehit gibi aynı karbon sayılı tek aside dönüşme beklenmez; Tollens/Fehling karşılaştırmasının temeli budur.",
      "Çok sert yükseltgenme koşullarında C–C kırılmasıyla farklı ürünler oluşabilir. Bu yüzden keton asla yükseltgenmez cümlesi yerine koşulu belirt. Negatif test yalnız verilen aday sınıfı içinde yorumlanır; bilinmeyen bütün organik maddeleri kesin keton yapmaz.",
    ),
    s024(
      "Karışım ve çökelek hesabı",
      "Aldehit–basit keton karışımında seçici testin ürününden önce aldehit molünü bul. İlk basamak Tollens için n(aldehit)=n(Ag)/2; Fehling için n(aldehit)=n(Cu₂O) eşitliği kullanılır.",
      "Toplam mol verilmişse keton molü farktan çıkar; kütle istenirse kendi mol kütlesiyle çarp. Karışımın toplam gramını doğrudan gümüşe oranlama; iki bileşen aynı molekül formülünü taşısa bile teste katılımları farklıdır.",
    ),
    s024(
      "Günlük örnekleri yapıya bağlamak",
      "Aseton yaygın bir çözücü; benzaldehit, sinnamaldehit ve vanilin koku bileşenleri olarak bilinen karbonil örnekleridir. Karmaşık bir doğal kokuyu tek moleküle indirgemeden yapıda hangi grubun bulunduğunu gösterebilirsin.",
      "Formalin, formaldehitin yaygın yaklaşık %37–40’lık sulu ticari çözeltilerini anımsatır; her ürünün kesin aynı derişimde olduğunu varsayma. Tarihsel/teknik kullanım bilgisi tıbbi veya gıdayla ilgili kişisel uygulama önerisine çevrilmez.",
    ),
  ],
  examples: [
    e024(
      "Dallanmış aldehidin zinciri",
      "CH₃CH₂CH(CH₃)CH₂CHO yapısını adlandırın.",
      "CHO karbonundan başlayan en uzun zinciri izle.",
      [
        "CHO karbonu 1; ona bağlı CH₂ 2, dallı CH 3, sonraki CH₂ 4 ve CH₃ 5 olur.",
        "Ana zincir beş C ile pentanaldir; C3’te bir metil vardır.",
        "Ad 3-metilpentanal olur; toplam C sayısı altıdır.",
      ],
      "3-Metilpentanal",
      "C₆H₁₂O; aldehit karbonu ana zincire dâhildir.",
      "CHO karbonunu saymayıp bütanal kökü seçmek.",
    ),
    e024(
      "Tollens ile karışımı çözmek",
      "Toplam 51,9 g pentanal ve propanon karışımı, yalnız aldehidin ilk Tollens yükseltgenmesiyle 64,8 g Ag veriyor. M(Ag)=108, M(pentanal)=86 ve M(propanon)=58 g/mol. İki bileşenin mol miktarları nedir?",
      "Gümüşten aldehit molünü; toplam kütleden aldehit kütlesini çıkararak keton molünü bul.",
      [
        "n(Ag)=64,8/108=0,60 mol; 1:2 ilk basamak oranından pentanal x=0,30 moldür.",
        "Pentanal kütlesi 0,30×86=25,8 g; toplam kütleden kalan propanon 51,9−25,8=26,1 g’dır.",
        "Propanon y=26,1/58=0,45 mol bulunur; iki bilinmeyen 2x=0,60 ve 86x+58y=51,9 denklemleriyle çözülmüştür.",
      ],
      "0,30 mol pentanal ve 0,45 mol propanon",
      "25,8+26,1=51,9 g ve 2×0,30=0,60 mol Ag kapanır; toplam 0,75 mol başlangıç verisi değil, bulunan sonuçtur.",
      "Toplam kütleyi toplam mol gibi kullanmak veya Ag molünü aldehit molüne eşitlemek.",
    ),
    e024(
      "Keton indirgenince",
      "Heptan-4-on uygun indirgenle, iskeleti korunarak alkole dönüştürülüyor. Ürün ve net H hesabı nedir?",
      "Karbonil konumunu koru ve C=O’ya iki H ekle.",
      [
        "CH₃CH₂CH₂COCH₂CH₂CH₃’te karbonil dördüncü C’dedir.",
        "C=O pi bağı gider; C’ye ve O’ya net birer H eklenir.",
        "CH₃CH₂CH₂CH(OH)CH₂CH₂CH₃, heptan-4-ol oluşur; C₇H₁₄O+H₂→C₇H₁₆O.",
      ],
      "Heptan-4-ol; bir mol başına net bir mol H₂",
      "OH karbonu iki n-propil grubu taşır; sekonder alkol çevresi korunur.",
      "İndirgenmede karbonil yerini zincirin ucuna taşımak.",
    ),
    e024(
      "Fehling çökeleğinin kütlesi",
      "0,15 mol bütanal yeterli Fehling ayıracıyla tek aldehit basamağında tamamen tepkimeye giriyor. M(Cu₂O)=144 g/mol ise çökelek kütlesi nedir?",
      "İki Cu’nun bir Cu₂O verdiğini denklemden oku.",
      [
        "RCHO+2Cu²⁺+5OH⁻→RCOO⁻+Cu₂O+3H₂O denkleminde aldehit:Cu₂O=1:1’dir.",
        "0,15 mol bütanal 0,15 mol Cu₂O verir.",
        "m=0,15×144=21,6 g çökelek oluşur.",
      ],
      "21,6 g Cu₂O",
      "Cu²⁺ tüketimi 0,30 mol, Cu₂O molü bunun yarısıdır.",
      "İki Cu²⁺ katsayısını iki Cu₂O katsayısı sanmak.",
    ),
    e024(
      "Kaynama verisinin koşulu",
      "Saf bütanalın 1 atm’de kaynama noktası yaklaşık 75 °C olarak verilmiştir. 60 °C ile 90 °C için bu veriden hangi eğilim çıkar?",
      "Sıcaklığı normal kaynama noktasıyla aynı basınçta karşılaştır.",
      [
        "60 °C normal kaynama noktasının altındadır; sıvı faz buharıyla dengede bulunabilir.",
        "90 °C bu basınçtaki kaynama noktasının üzerindedir; açık sistemde sıvı kalma eğilimi beklenmez.",
        "Bu nedenle maddeyi sıcaklık ve basınçtan bağımsız daima sıvı diye tanımlamak doğru değildir.",
      ],
      "Fiziksel hâl ve uçuculuk koşulla yorumlanır",
      "Kaynama noktası basınca bağlıdır; kapalı basınçlı kapta aynı sonuç doğrudan aktarılmaz.",
      "Bir kaynakta sıvı sözcüğünü görünce bütün sıcaklıklar için sabit hâl atamak.",
    ),
  ],
  recall: [
    {
      prompt: "Karbonil O’sundaki iki elektron çifti eşleşmemiş midir?",
      answer:
        "Hayır; nötr karbonil O’sunda iki bağ yapmayan elektron çifti vardır.",
    },
    {
      prompt: "Aldehit ile ketonu hangi yerel komşuluk ayırır?",
      answer:
        "Basit aldehitte karbonil C en az bir H taşır; diğer tek bağ komşuları H/C’dir. Basit ketonda iki C komşusu vardır. N’ye bağlı formamid gibi türler bu aldehit ölçütüne girmez.",
    },
    {
      prompt: "Bazik Tollens’te doğrudan organik ürün nedir?",
      answer:
        "Karboksilat RCOO⁻; serbest asit asitlendirme sonrası gösterilebilir.",
    },
    {
      prompt: "Benzaldehitin Fehling davranışı neden C sayısıyla özetlenmez?",
      answer:
        "Olağan Fehling testinde aromatik yapı önemlidir; çok C’li alifatik aldehitleri tek başına C sayısı dışlamaz.",
    },
    {
      prompt: "İlk basamak için 1 mol aldehit ne kadar Ag ve Cu₂O verir?",
      answer:
        "Uygun kapsamda 2 mol Ag veya 1 mol Cu₂O; metanalın ileri yükseltgenmesi ayrıca sınırlandırılır.",
    },
  ],
  items: [],
};
carbonylPack024.items = [
  q024(
    "Nötr bir aldehitin C=O grubundaki oksijenin elektron ve bağ yapısı için hangisi doğrudur?",
    "Nötr karbonil O’su çift bağ ve iki bağ yapmayan elektron çifti taşır.",
    "Çift bağdaki ortaklaşmış çiftlerle O’nun bağ yapmayan çiftlerini ayır.",
    [
      "C=O bir sigma ve bir pi bağı içerir.",
      "O’nun iki elektron çifti bağ yapmadan kalır.",
      "Bu dört elektron iki eşleşmiş çift hâlindedir; iki eşleşmemiş elektron değildir.",
    ],
    [
      [
        "İki bağ yapmayan elektron çifti vardır",
        "Lone pair kavramını eşleşmemiş elektrondan ayırır.",
      ],
      [
        "İki eşleşmemiş elektronu vardır",
        "Bağ yapmayan çiftleri tekil elektronlarla karıştırır.",
      ],
      [
        "O dört C–O tek bağı yapar",
        "Nötr karbonil O değerliğini ve çift bağı bozar.",
      ],
      [
        "C=O yalnız iki pi bağı içerir",
        "Çift bağın bir sigma bileşenini yok sayar.",
      ],
      [
        "O üzerinde hiçbir bağ yapmayan elektron yoktur",
        "Nötr O’nun kalan dört değerlik elektronunu hesaptan çıkarır.",
      ],
    ],
    "Bağ yapmayan sözcüğünü eşleşmemiş sözcüğüyle eşanlamlı saymak.",
    "O’nun altı değerlik elektronu bağ paylaşımı ve iki bağ yapmayan çiftle tutarlı Lewis yapısı verir.",
  ),
  q024(
    "CH₃CH₂CHO ile CH₃COCH₃ için sınıf ayrımı hangisidir?",
    "Aldehitte karbonil C’ye H; ketonda iki C grubu doğrudan bağlıdır.",
    "Toplam H yerine karbonil karbonunun komşularını incele.",
    [
      "CH₃CH₂CHO’nun karbonil C’si bir H ve bir etil taşır.",
      "CH₃COCH₃’ün karbonil C’si iki metil taşır.",
      "İlk yapı aldehit, ikinci yapı ketondur.",
    ],
    [
      [
        "İlki aldehit, ikincisi keton",
        "Doğrudan karbonil C komşularını doğru yorumlar.",
      ],
      ["İkisi de keton", "İlk yapının aldehidik H’sini atlar."],
      [
        "İkisi de aldehit",
        "İkinci yapının H’lerini karbonil C’ye bağlı sanır.",
      ],
      [
        "İlki alkol, ikincisi ester",
        "İkisinde de bulunmayan O–H veya ikinci O ekler.",
      ],
      ["İlki keton, ikincisi aldehit", "Komşuluk ölçütünü ters uygular."],
    ],
    "Molekülde herhangi bir H bulunmasını aldehit olma kanıtı saymak.",
    "İkisi C₃H₆O olsa da bağlantı ve işlevsel grup farklıdır.",
  ),
  q024(
    "Basit bir ketonun en az üç C taşımasının yapısal nedeni hangisidir?",
    "Keton karbonil karbonuna iki ayrı C grubu bağlanır.",
    "Karbonil C ile iki en küçük C komşusunu topla.",
    [
      "C=O grubu zaten bir C içerir.",
      "Karbonil C’nin iki yanında en küçük grup birer metildir.",
      "Toplam en az 1+1+1=3 C gerekir; en küçük örnek propanondur.",
    ],
    [
      [
        "Karbonil C’ye iki karbon grubunun bağlanması",
        "Ketonun iki C komşuluğu alt sınırı üçe çıkarır.",
      ],
      ["Her ketonda üç O bulunması", "Basit keton tek karbonil O’su taşır."],
      [
        "Ketonun mutlaka üç üyeli halka olması",
        "Düz zincirli propanonun varlığına aykırıdır.",
      ],
      [
        "Bir C’nin yalnız iki bağ yapabilmesi",
        "Nötr C’nin dört bağ değerliğini yanlış verir.",
      ],
      [
        "Metanalın keton olması",
        "Metanalın karbonil C’si iki H taşır; aldehittir.",
      ],
    ],
    "Karbonil karbonunu yan grupların C hesabının dışında bırakmak.",
    "CH₃COCH₃ açıkça üç C içerir; bir ve iki C’li keton kurulamaz.",
  ),
  q024(
    "CH₃CH(CH₃)CH₂CHO yapısının temel adı hangisidir?",
    "Aldehit ana zinciri CHO karbonunu içerir ve oradan numaralanır.",
    "CHO’dan başlayıp dört C’li zincirde dalın konumunu bul.",
    [
      "CHO C1, CH₂ C2, dallı CH C3 ve uç CH₃ C4 olur.",
      "Ana ad bütanal; C3’te metil vardır.",
      "Ad 3-metilbütanaldir.",
    ],
    [
      ["3-Metilbütanal", "CHO’yu C1 sayıp dalı C3’e yerleştirir."],
      ["2-Metilbütanal", "Numaralamayı yanlış uçtan yapar."],
      ["2-Metilpropanal", "CHO dâhil ana zinciri bir C kısa seçer."],
      ["Pentan-2-on", "Aldehit bağlantısını ketona çevirir."],
      ["3-Metilbütanoik asit", "Yapıda olmayan karboksil OH’sini ekler."],
    ],
    "Aldehit C’sine öncelik vermeden en yakın dalı küçüklemek.",
    "Toplam beş C vardır; ana zincir dört, metil dalı birdir.",
  ),
  q024(
    "CH₃CH₂COCH₂CH₃ yapısının temel adı hangisidir?",
    "Ketonun karbonil konumu ana zincirde en küçük uygun numarayla belirtilir.",
    "Beş C’li zincirin karbonil C’sini numarala.",
    [
      "Uçtan sayınca karbonil üçüncü C’dedir.",
      "İki uçtan da aynı konum 3 elde edilir.",
      "Yapı pentan-3-on olarak adlandırılır.",
    ],
    [
      ["Pentan-3-on", "Beş C ve merkezde C3 karbonilini korur."],
      ["Pentan-2-on", "Karbonili komşu konuma kaydırır."],
      ["Pentanal", "Karbonil C’ye olmayan H ekler."],
      ["Bütanon", "Bir C’yi eksik sayar."],
      ["3-Pentanol", "C=O’yu C–OH gibi okuyarak iki H ekler."],
    ],
    "Beş C’li her ketonun tek konum izomeri bulunduğunu sanmak.",
    "Karbonil C’nin iki yanında ikişer C’li etil grubu vardır.",
  ),
  q024(
    "Propanal ile propanon arasındaki ilişki hangisidir?",
    "Aynı molekül formülü ve farklı işlevsel bağlantı grup izomerliği oluşturur.",
    "Bütün atomları sayıp karbonil C’nin H komşuluğunu karşılaştır.",
    [
      "Propanal da propanon da C₃H₆O formülündedir.",
      "Propanalde karbonil C H taşır; propanonda iki C taşır.",
      "Bu yüzden aldehit–keton işlevsel grup izomeridirler.",
    ],
    [
      [
        "İşlevsel grup izomerliği",
        "Formül aynı, aldehit/keton bağlantısı farklıdır.",
      ],
      [
        "Aynı maddenin iki adı",
        "Propanon ve aseton eşadlıdır; propanal farklı yapıdır.",
      ],
      [
        "Yalnız geometrik izomerlik",
        "C=C çevresindeki cis-trans değişimi verilmemiştir.",
      ],
      ["Homologluk", "Bir CH₂ farkı yoktur; formülleri aynıdır."],
      ["İzotopluk", "Atom çekirdeği veya nötron farkı verilmemiştir."],
    ],
    "Aynı C sayısını bütün atom sayımı yerine kullanmak.",
    "Bu çiftte C3,H6,O1 gerçekten eşittir; ölçüt yalnız C eşitliği değildir.",
  ),
  q024(
    "Aşağıdaki karbonillerden hangisine açık zincirli doymuş monokarbonil CₙH₂ₙO formülü doğrudan uygulanamaz?",
    "Halka, temel açık zincirli formüle göre ek H eksilmesine yol açar.",
    "Adayların halka içerip içermediğini kontrol et.",
    [
      "Siklohekzanon bir karbonil yanında bir halka taşır.",
      "Altı C için açık zincir formülü H12 verirken halka nedeniyle gerçek H10’dur.",
      "Dolayısıyla siklohekzanon C₆H₁₀O formüllüdür ve kapsam dışındadır.",
    ],
    [
      ["Siklohekzanon", "Halka içerir; C₆H₁₀O, C₆H₁₂O değildir."],
      ["Propanal", "Açık zincirli tek karbonilli C₃H₆O örneğidir."],
      ["Bütanal", "Açık zincirli C₄H₈O örneğidir."],
      ["Propanon", "Açık zincirli C₃H₆O ketondur."],
      ["Pentan-2-on", "Açık zincirli C₅H₁₀O ketondur."],
    ],
    "C=O taşıyan her yapıya halka sayısını silerek aynı formülü uygulamak.",
    "Siklohekzanonun hem halkası hem karbonil pi bağı H sayısını sınırlar.",
  ),
  q024(
    "Bütanal uygun asidik yükseltgenme koşulunda, C iskeleti korunarak ilk asit ürününe dönüşüyor. Ürün hangisidir?",
    "Aldehit bir O eşdeğeriyle aynı C sayılı aside yükseltgenebilir.",
    "Uç CHO grubunu COOH’ye dönüştür.",
    [
      "Bütanal CH₃CH₂CH₂CHO dört C taşır.",
      "Karbonil C’ye net bir O eklenerek COOH oluşur.",
      "Ürün CH₃CH₂CH₂COOH, bütanoik asittir.",
    ],
    [
      ["Bütanoik asit", "Dört C’li aynı iskelette aldehitten asit oluşur."],
      ["Propanoik asit", "Bir C’yi düşürür."],
      ["Bütan-1-ol", "Yükseltgenme yerine indirgenme ürünüdür."],
      ["Bütanon", "Karbonili iç konuma taşır; O eklenmesini karşılamaz."],
      [
        "Etil etanoat",
        "Aynı formüllü olsa da iskelet ve ester bağlantısını uydurur.",
      ],
    ],
    "Molekül formülü uygun olan her asit türevini aynı yükseltgenme ürünü saymak.",
    "C₄H₈O+[O]→C₄H₈O₂; ürünün karboksil C’si başlangıç aldehit C’sidir.",
  ),
  q024(
    "Propanal bazik Tollens ayıracıyla ilk yükseltgenme basamağında tepkimeye giriyor; sonradan asitlendirme yapılmıyor. Doğrudan organik ürün hangisidir?",
    "Bazik ortamda karboksilik ürün deprotonlanmış karboksilattır.",
    "Aynı C sayısını koruyup ortamın pH’sını ürün yüküne uygula.",
    [
      "Propanal üç karbonlu aldehittir.",
      "İlk yükseltgenme karboksil çevresi oluşturur.",
      "Bazik ortam nedeniyle ürün CH₃CH₂COO⁻, propanoattır.",
    ],
    [
      ["CH₃CH₂COO⁻", "Üç C ve bazik ortamın karboksilat yükünü korur."],
      [
        "CH₃CH₂COOH",
        "Serbest asit gösterimi için gereken asitlendirmeyi varsayar.",
      ],
      ["CH₃COO⁻", "Üç C’li başlangıçtan bir C düşürür."],
      ["CH₃CH₂CH₂OH", "Aldehidin indirgenme ürününü seçer."],
      ["CH₃COCH₃", "Yükseltgenmeyi işlevsel grup yer değiştirmesine çevirir."],
    ],
    "Kaynak şemasındaki nötr asidi bazik ortama koşulsuz taşımak.",
    "Net denklemde organik ürünün −1 yükü toplam yük hesabında da yer alır.",
  ),
  q024(
    "Bir propanal grubunun kontrollü ilk Tollens yükseltgenmesinde 0,18 mol propanal tamamen tüketiliyor. Kaç mol Ag oluşur?",
    "İlk aldehit-karboksilat basamağı bir aldehit başına iki Ag verir.",
    "Bir aldehit grubu için 1:2 oranını uygula.",
    [
      "Propanal molekülünde tek aldehit grubu vardır.",
      "Bir mol propanal iki mol Ag⁺’yi Ag’ye indirger.",
      "0,18×2=0,36 mol Ag oluşur.",
    ],
    [
      ["0,36", "Tek grup için 1:2 aldehit:Ag oranını uygular."],
      ["0,18", "Ag ile aldehit molünü 1:1 alır."],
      ["0,09", "İki katsayısını ters yönde kullanır."],
      ["0,54", "Üç karbon sayısını Ag katsayısı sanır."],
      ["0,72", "Bu tek ilk basamağa dört Ag oranını taşır."],
    ],
    "Formaldehitin özel ileri yükseltgenmesini bütün aldehitlere uygulamak.",
    "Ag miktarı propanalin C sayısından değil ilk basamağın iki elektronluk hesabından çıkar.",
  ),
  q024(
    "0,40 mol propanal yeterli Fehling ayıracıyla tek aldehit basamağında tamamen tepkimeye giriyor. M(Cu₂O)=144 g/mol ise çökelek kaç gramdır?",
    "Bir uygun aldehit grubu bir Cu₂O formül birimi oluşturur.",
    "Aldehit:Cu₂O oranını kullanıp ürün molünü kütleye dönüştür.",
    [
      "Net denklem aldehit ile Cu₂O için 1:1 katsayı verir.",
      "0,40 mol propanal 0,40 mol Cu₂O oluşturur.",
      "m=0,40×144=57,6 g olur.",
    ],
    [
      ["57,6", "0,40 mol çökeleği doğru mol kütlesiyle çarpar."],
      ["115,2", "İki Cu²⁺’yi iki Cu₂O sanarak ikiye katlar."],
      ["28,8", "Cu₂O molünü gerekçesiz yarıya indirir."],
      ["25,6", "Cu atomu mol kütlesini Cu₂O yerine kullanır."],
      ["144,0", "0,40 mol yerine bir mol çökelek alır."],
    ],
    "Cu atomu sayısıyla Cu₂O formül birimi sayısını eşitlemek.",
    "0,40 mol Cu₂O içinde 0,80 mol Cu bulunur; tüketilen Cu²⁺ de 0,80 moldür.",
  ),
  q024(
    "Benzaldehit ve pentanal ayrı örneklerde olağan Tollens ve Fehling testine alınıyor. Doğru karşılaştırma hangisidir?",
    "Aromatik benzaldehit Fehling açısından alifatik aldehitlerle aynı kuralda değildir.",
    "C sayısını değil aromatik/alifatik yapıyı ve verilen ayıracı kullan.",
    [
      "Benzaldehit aromatik aldehittir; Tollens pozitif, olağan Fehling negatiftir.",
      "Pentanal alifatik aldehittir; olağan iki testte de pozitif beklenir.",
      "Bu örnekler Fehling’i yalnız küçük/büyük C sayısıyla sınıflandırmayı reddeder.",
    ],
    [
      [
        "Benzaldehit: Tollens +, Fehling −; pentanal: ikisi +",
        "Yapı ve ayıraç seçiciliğini birlikte uygular.",
      ],
      [
        "İkisi de iki testte negatif",
        "Aldehitlerin uygun testte yükseltgenmesini yok sayar.",
      ],
      [
        "İkisi de Fehling +, Tollens −",
        "Tollens davranışını ve aromatik istisnayı ters çevirir.",
      ],
      [
        "Pentanal C sayısı fazla olduğu için iki testte negatif",
        "Karbon sayısından temelsiz sınır kurar.",
      ],
      [
        "Benzaldehit keton olduğu için iki testte negatif",
        "CHO grubundaki aldehidik H’yi görmez.",
      ],
    ],
    "Fehling tepkimesini karbon sayısı için belirli bir kesim varmış gibi ezberlemek.",
    "Benzaldehit C₆H₅CHO’da da karbonil C’ye H bağlıdır; negatif Fehling onu keton yapmaz.",
  ),
  q024(
    "Propanon ve bütanon gibi ek OH taşımayan basit ketonlar için olağan Tollens/Fehling sonucu ve gerekçesi hangisidir?",
    "Basit ketonlarda karbonil C’ye doğrudan bağlı H yoktur.",
    "C=O karbonunun iki C komşusunu testin hafif koşuluyla ilişkilendir.",
    [
      "Seçili ketonların karbonil C’sinde aldehidik H yoktur.",
      "Olağan hafif testte aynı iskeletli karboksilata dönüşmeleri beklenmez.",
      "Bu sınırlı adaylar için iki test de negatiftir.",
    ],
    [
      [
        "İkisi negatif; aldehidik H yoktur",
        "Basit keton ve olağan test kapsamını doğru sınırlar.",
      ],
      [
        "İkisi pozitif; molekülde H vardır",
        "Yan gruplardaki H’yi aldehidik H sanır.",
      ],
      [
        "Tollens pozitif; Fehling negatif, çünkü her keton aromatiktir",
        "Basit ketonları aromatik aldehit istisnasıyla karıştırır.",
      ],
      ["İkisi negatif; O içermezler", "Ketonun karbonil O’sunu yok sayar."],
      [
        "Her koşulda hiçbir tepkime vermezler",
        "Hafif testin sınırını indirgenme dâhil bütün kimyaya yayar.",
      ],
    ],
    "Testin negatifliğini bütün keton türevleri ve bütün koşullar için mutlaklaştırmak.",
    "Alfa-hidroksi keton gibi ek işlevli özel örnekler bu sorunun aday kümesinde yoktur.",
  ),
  q024(
    "Bütanon uygun indirgenle, C iskeleti korunarak alkole dönüştürülüyor. Ürün hangisidir?",
    "Keton indirgenmesinde karbonil konumu korunarak sekonder alkol elde edilir.",
    "CH₃COCH₂CH₃ içindeki ikinci C’yi OH taşıyan C’ye çevir.",
    [
      "Başlangıç karbonili C2’dedir ve iki C grubuna bağlıdır.",
      "Net H₂ eklenmesi C=O’yu CH–OH çevresine dönüştürür.",
      "Ürün CH₃CH(OH)CH₂CH₃, bütan-2-oldür.",
    ],
    [
      ["Bütan-2-ol", "Karbonil konumunu ve dört C iskeletini korur."],
      ["Bütan-1-ol", "OH’yi uç C’ye kaydırır."],
      ["Bütanoik asit", "İndirgenme yerine yükseltgen ürün seçer."],
      ["Propan-2-ol", "Bir C’yi eksiltir."],
      ["Dietil eter", "Formül aynı olsa da yeni C–O–C bağlantısı kurar."],
    ],
    "Aynı formüllü eteri, bağ bağlantısını izlemeden indirgenme ürünü seçmek.",
    "C₄H₈O+H₂→C₄H₁₀O; üründe OH taşıyan C iki C komşusuna sahiptir.",
  ),
  q024(
    "0,25 mol propanal ve 0,30 mol propanon ayrı ayrı uygun koşullarda tamamen alkole indirgeniyor. Net H₂ eşdeğeri toplam kaç moldür?",
    "Her bir tek karbonil grubu net bir H₂ eşdeğeri tüketir.",
    "İki maddedeki karbonil molünü ayrı sayıp topla.",
    [
      "Propanalde 0,25 mol tek karbonil vardır ve 0,25 mol H₂ gerekir.",
      "Propanonda 0,30 mol tek karbonil vardır ve 0,30 mol H₂ gerekir.",
      "Toplam H₂ eşdeğeri 0,25+0,30=0,55 moldür.",
    ],
    [
      ["0,55", "Her iki karbonili de 1:1 indirgenme oranıyla sayar."],
      ["0,25", "Ketonun indirgenebildiğini hesaba katmaz."],
      ["0,30", "Aldehit indirgenmesini atlar."],
      ["1,10", "İki H atomunu iki H₂ molekülü sanır."],
      [
        "0,275",
        "Bir H₂’nin bir karbonile yeterli olmasını gereksiz ikiye böler.",
      ],
    ],
    "Tollens seçiciliğini indirgenme tepkimesine de uygulamak.",
    "Net eklenen H atomu 1,10 moldür; H₂ eşdeğeri bunun yarısı 0,55 moldür.",
  ),
  q024(
    "Toplam 0,50 mol propanal–propanon karışımı yalnız aldehidin ilk Tollens yükseltgenmesiyle 43,2 g Ag veriyor. M(Ag)=108, M(propanon)=58 g/mol. Başlangıç propanonu kaç gramdır?",
    "Ag ürünü önce aldehit molünü; toplam mol farkı keton molünü verir.",
    "Ag kütlesini mole, sonra 2:1 oranıyla aldehide çevir.",
    [
      "43,2/108=0,40 mol Ag vardır.",
      "Propanal 0,40/2=0,20 mol; propanon 0,50−0,20=0,30 moldür.",
      "Propanon kütlesi 0,30×58=17,4 g’dır.",
    ],
    [
      ["17,4", "Gümüşten aldehidi bulup kalan ketonun kütlesini hesaplar."],
      ["5,8", "Ag molünü aldehit molüne eşitleyip 0,10 mol keton bırakır."],
      ["11,6", "Keton yerine bulunan 0,20 mol aldehidi çarpar."],
      ["23,2", "Ag molünü doğrudan keton molü sanır."],
      ["29,0", "Karışımın tamamını keton kabul eder."],
    ],
    "Seçici ürünün molünü karışımın tepkime vermeyen bileşenine atamak.",
    "0,20 mol propanal×2=0,40 mol Ag; 0,20+0,30=0,50 mol başlangıçtır.",
  ),
  q024(
    "Ligandları bastırılmış Fehling denkliği RCHO +2Cu²⁺ + aOH⁻ → RCOO⁻ +Cu₂O + bH₂O olarak veriliyor. Atom ve yük korunumu için (a,b) hangisidir?",
    "Bazik net iyon denkleminde hem O/H atomları hem toplam yük korunur.",
    "Önce yükten OH⁻’yi, sonra H’den suyu bul.",
    [
      "Sağ yük −1; solda +4−a olduğundan a=5 olmalıdır.",
      "Solda aldehidik H ile 5 OH⁻ toplam altı ilgili H verir.",
      "Sağda 3H₂O altı H verir; b=3 ve O sayısı da dengelenir.",
    ],
    [
      ["(5, 3)", "Yük −1 ve O/H atomlarını birlikte korur."],
      [
        "(4, 2)",
        "Nötr asitli başka yazımı karboksilatlı denkleme taşır; yük tutmaz.",
      ],
      ["(3, 2)", "Tollens oranlarını Cu²⁺ denklemine aktarır."],
      ["(5, 2)", "Yükü sağlasa da H ve O atomlarını eksik bırakır."],
      ["(2, 1)", "İki Cu²⁺’nin +4 yükünü karşılayamaz."],
    ],
    "Dengelemede yalnız atomları veya yalnız yükü kontrol etmek.",
    "Eklenen O/H bölümünde solda 5O+5H, sağda karboksilata ek O ile Cu₂O ve 3 su birlikte denkleşir.",
  ),
  q024(
    "Saf etanalın 1 atm’de kaynama noktası yaklaşık 21 °C olarak verilmiştir. Bu veriyle hangi ifade savunulur?",
    "Fiziksel hâl sıcaklık ve basınçla birlikte yorumlanır.",
    "25 °C’yi verilen normal kaynama sıcaklığıyla karşılaştır.",
    [
      "21 °C kaynama verisi yalnız belirtilen 1 atm basınca aittir.",
      "25 °C bu sıcaklığın üzerindedir.",
      "Bu nedenle etanalı koşul belirtmeden oda sıcaklığında daima sıvı diye tanımlamak doğru değildir.",
    ],
    [
      [
        "25 °C ve 1 atm için daima sıvı iddiası uygun değildir",
        "Verilen kaynama eşiğini koşuluyla yorumlar.",
      ],
      [
        "Etanal bütün basınçlarda 21 °C’de kaynar",
        "Kaynama sıcaklığının basınca bağlılığını siler.",
      ],
      [
        "21 °C verisi etanalın keton olduğunu kanıtlar",
        "Fiziksel veri tek başına bağ sınıfını vermez.",
      ],
      [
        "Kaynama etanalı etanole indirger",
        "Faz değişimini kimyasal indirgenme sanır.",
      ],
      [
        "25 °C’de moleküldeki C sayısı azalır",
        "Sıcaklıkla faz değişimini atom kaybı gibi yorumlar.",
      ],
    ],
    "Kaynakta geçen sıvı nitelemesini sıcaklık ve basınçtan bağımsız kabul etmek.",
    "Kapalı kapta basınç değişebileceğinden açık normal basınç yorumu oraya doğrudan taşınmaz.",
  ),
  q024(
    "Propanon CH₃–C(=O)–CH₃ molekülünde toplam sigma ve pi sayısı hangisidir?",
    "Çift bağ bir sigma ve bir pi; C–H tek bağları da sigmadır.",
    "Üç ağır atom bağlantısını ve altı C–H bağını birlikte say.",
    [
      "İki C–C ve bir C=O’nun sigma bileşeni toplam üç sigma verir.",
      "İki metilde altı C–H sigması vardır.",
      "Toplam sigma=9, pi=1 bulunur.",
    ],
    [
      ["9 sigma, 1 pi", "Üç ağır atom sigması ve altı C–H’yi toplar."],
      ["3 sigma, 1 pi", "Gizli altı C–H bağını saymaz."],
      ["8 sigma, 2 pi", "Çift bağın sigma bileşenini piye aktarır."],
      ["10 sigma, 0 pi", "Çift bağı iki sigma sayar."],
      ["9 sigma, 0 pi", "C=O pi bağını atlar."],
    ],
    "Çift bağın iki çizgisini iki aynı tür bağ sanmak.",
    "Toplam bağ mertebesi 10’dur: dokuz sigma ve bir pi olarak ayrılır.",
  ),
  q024(
    "Pentan-2-on ve pentan-3-onun ilişkisi ile indirgenme ürünleri için doğru ifade hangisidir?",
    "Keton grubunun farklı konumu konum izomerliği verir; indirgenmede konum korunur.",
    "Karbonil yerini iki yapıda ayrı işaretle.",
    [
      "İki yapının formülü C₅H₁₀O, işlevsel grubu ketondur.",
      "Karbonil yerleri 2 ve 3 olduğundan konum izomeridirler.",
      "İndirgenmede sırasıyla pentan-2-ol ve pentan-3-ol oluşur.",
    ],
    [
      [
        "Konum izomeri; sırasıyla 2- ve 3-pentanol",
        "Değişen konumu ve indirgenmede korunan yeri doğru belirtir.",
      ],
      [
        "İşlevsel grup izomeri; ikisi de pentanal verir",
        "İki ketonu farklı sınıf sayar ve indirgenmeyi aldehit oluşumu sanır.",
      ],
      [
        "Aynı madde; ikisi de 1-pentanol verir",
        "2 ve 3 konum bağlantılarını eşitler.",
      ],
      [
        "Homolog; ürünler dört ve altı C taşır",
        "CH₂ farkı yokken homologluk ve C değişimi uydurur.",
      ],
      [
        "Geometrik izomer; ürünleri aynı eterdir",
        "C=C geometrisini ve ester dışı O köprüsünü temelsiz ekler.",
      ],
    ],
    "Keton konumunu yalnız ad farkı sayarak bağlantı farkını görmezden gelmek.",
    "İki alkol ürünü C₅H₁₂O’dur; OH konumu başlangıç C=O konumunu izler.",
  ),
];
const acidPack024: Pack024 = {
  id: "ayt-karboksilik-asitler",
  topic: "detail-458",
  title: "Karboksilik asitler",
  minutes: 95,
  objectives: [
    "Karboksil sayısı ve ek işlevsel gruplardan asitleri sınıflandırmak",
    "İyonlaşma, nötrleşme ve esterleşmeyi farklı denklemlerle açıklamak",
    "Yağ asitlerinde C–C doymamışlığını ve sabunun tuz yapısını ayırmak",
  ],
  sections: [
    s024(
      "Başlamadan: karboksil bağlantısı",
      "Karboksil grubu aynı C üzerindeki C=O ve C–OH bağlantılarının bütünü, –C(=O)OH yani –COOH’tur. H–COOH metanoik asit, CH₃COOH etanoik asit örneğidir; karboksil karbonu toplam C sayısına dâhildir.",
      "Ön koşul karbonil, alkol OH’si ve iyon yükünü ayırabilmektir. Karboksilin OH’si karbonil C’ye bağlıdır; ayrı bir sp³ C’ye bağlı alkol OH’siyle aynı çevre değildir. Moleküldeki bütün OH’leri aynı asit eşdeğeri sayma.",
    ),
    s024(
      "Monokarboksilik ve polikarboksilik",
      "Bir COOH taşıyan asit monokarboksilik, iki taşıyan dikarboksilik, üç taşıyan trikarboksilik olarak sınıflanır. Etanoik asit bir, oksalik asit HOOC–COOH iki, sitrik asit üç karboksil grubu taşır.",
      "Tam karboksil nötrleşmesinde grup başına bir OH⁻ tüketimi sayılır. Bir molekülün çok O taşıması otomatik olarak aynı sayıda karboksil taşıdığı anlamına gelmez; karbonil ve ona tek bağla bağlı OH’yi eşleştirerek say.",
    ),
    s024(
      "Hidroksi asitler",
      "Laktik asit CH₃–CH(OH)–COOH yapısında bir karboksil ve ayrıca bir alkol OH’si vardır; 2-hidroksipropanoik asit olarak okunur. İki O–H taşıması iki karboksil grubu taşıdığı anlamına gelmez.",
      "Malik asit HOOC–CH(OH)–CH₂–COOH iki karboksil ve bir ek OH taşır. Hidroksi sözcüğü ek OH’yi bildirir; yalnız asidin kendi COOH içindeki OH’si yüzünden her karboksilik asit hidroksi asit alt sınıfına alınmaz.",
    ),
    s024(
      "Amino asitler",
      "Glisin NH₂CH₂COOH, bir amino ve bir karboksil grubu içerir. Amino taraf proton alabilir, karboksil taraf proton verebilir; bu iki yön amino asitlerin amfoter davranışını açıklar.",
      "Sulu ortamda protonlanma durumu pH’ya bağlıdır; glisinin zwitteriyon biçimi ⁺H₃NCH₂COO⁻ önemlidir. Modelde nötr bağlantı üzerinden yapılan karboksil eşdeğeri sayımı gerçek pH ve bütün protonlanma dağılımı hesabı değildir.",
    ),
    s024(
      "Sistematik adlandırma",
      "COOH içeren en uzun uygun zinciri seçip karboksil C’sini 1 say. Alkan köküne -oik asit eki gelir: CH₃CH₂COOH propanoik asittir. Dal ve diğer gruplar bu numaralamaya göre yazılır.",
      "CH₃CH(Br)COOH yapısında karboksil C1, Br taşıyan C2 olduğundan 2-bromopropanoik asit adı verilir. COOH karbonunu zincir dışında bırakmak hem ana adı hem dal numarasını yanlışlaştırır.",
    ),
    s024(
      "Çok karboksilli ve halkalı adlar",
      "HOOC–COOH etandioik asit, HOOC–CH₂–COOH propandioik asittir. İki karboksil C’si de uygun açık zincir adında sayılır; dioik eki iki asit grubunu belirtir.",
      "Halka dışındaki COOH, benzenkarboksilik asit yani benzoik asit gibi okunabilir. Ftalik asit benzene-1,2-dikarboksilik asit yapısındadır. Salisilik asit 2-hidroksibenzoik asittir; OH konumu 2’dir, 3 değildir.",
    ),
    s024(
      "Genel formülü sınırlamak",
      "Yalnız C, H ve O içeren, açık zincirli, C–C çoklu bağı ve tek COOH dışında ek işlevsel grubu olmayan tek karboksilli asitler CₙH₂ₙO₂ formülüne uyar. Metanoik asit CH₂O₂ bu serinin en küçük üyesidir; R–COOH kısaltmasında R, bu örnekte H olabilir.",
      "Benzoik asit C₇H₆O₂, oksalik asit C₂H₂O₄ ve laktik asit C₃H₆O₃’tür. Aromatik halka, ek COOH veya ek OH temel formül kapsamını değiştirir. O sayısı iki olmayan örnekleri sırf asit diye aynı eşitliğe sokma.",
    ),
    s024(
      "Polarite ve hidrojen bağı",
      "Karboksil grubu polar C=O ve O–H bağları taşır; asit molekülleri hidrojen bağı vericisi ve alıcısı olarak etkileşebilir. Uygun ortamda iki asit molekülü karşılıklı H bağlarıyla dimer birlikteliği oluşturabilir.",
      "Dimerleşme her molekülün kalıcı kovalent formülünün ikiye katlanması değildir. Sıcaklık ve çözücü birlikteliği etkiler. Kuvvetli moleküller arası etkileşim kaynamayı yükseltebilir; bütün erime noktalarını tek kuralla sıralamaya yetmez.",
    ),
    s024(
      "Çözünürlük ve zincir büyümesi",
      "Metanoik ve etanoik gibi kısa zincirli asitler suyla iyi etkileşir. Hidrokarbon kısım büyüdükçe nötr asidin sudaki çözünürlüğü çoğunlukla azalır; uzun zincirli yağ asitleri kısa örneklerle aynı ölçüde karışmaz.",
      "Çözünürlük ile asit kuvveti ayrı kavramlardır. Çok çözünmek bütün moleküllerin iyonlaşması demek değildir; tuz hâline geçiş de çözünürlüğü değiştirebilir. Karşılaştırmada sıcaklık ve molekülün protonlanma hâli belirtilmelidir.",
    ),
    s024(
      "Suda iyonlaşma dengesi",
      "HA+H₂O ⇌ H₃O⁺+A⁻ denklemi asidin protonunu suya vermesini gösterir. Karboksilik asitte A⁻, RCOO⁻ karboksilatıdır. Zayıf asit, verilen ortamda denge hâlinde kısmen iyonlaşır.",
      "Zayıflık az toplam asit maddesi demek değildir. 1 mol tek karboksilli zayıf asit yeterli kuvvetli bazla tamamen nötrleştiğinde bir mol OH⁻ tüketebilir; iyonlaşma dengesi ile toplam nötrleşme kapasitesi farklı hesapları verir.",
    ),
    s024(
      "Karboksilatın rezonansı",
      "Karboksilatın negatif yükü karboksil grubundaki iki O arasında rezonansla dağılır; iki C–O bağı eşdeğerleşmeye yönelir. Çizimde bir tek bağ ve bir çift bağ gösterilmesi formal katkı yapısını anlatır.",
      "Bu yük bütün nötr asit molekülünde eşit dağılmış tam eksi yük değildir. Nötr COOH ile RCOO⁻ iyonunu ayır; proton kaybından sonra oluşan anyonun kararlılığı, alkole göre daha kolay proton verme davranışının açıklamasına katkı sağlar.",
    ),
    s024(
      "Ka ve pKa ile kuvvet",
      "Ka büyüdükçe aynı koşulda asit proton vermeye daha yatkındır; pKa=−logKa olduğundan pKa küçüldükçe asit kuvveti artar. Farklı grupların elektron çekme etkisi karboksilik asitlerin kuvvetini değiştirebilir.",
      "Metanoik asit, sık karşılaştırılan basit alkil karboksilik asitlerden daha kuvvetli olabilir; bu onu bütün karboksilik asitlerin en kuvvetlisi yapmaz. Bütün asitler için pKa tam 5 diye sabit sayı kullanılmaz; soruda verilen Ka/pKa verisini izle.",
    ),
    s024(
      "Zayıf asit için yaklaşık hesap",
      "Tek protonlu zayıf asit için, suyun katkısı ve iyonlaşma küçük kabul edilirse [H₃O⁺]≈√(Ka·C) kullanılabilir. Bu yaklaşık formül, C başlangıç derişimini ve belirli koşullardaki Ka’yı gerektirir.",
      "Bulduğun iyonlaşmayı C’ye bölerek küçük iyonlaşma varsayımını denetle. Örneğin Ka=10⁻⁵ ve C=0,10 M için yaklaşık 10⁻³ M H₃O⁺, yüzde 1 iyonlaşma ve pH≈3 bulunur; zayıf asit nötr su demek değildir.",
    ),
    s024(
      "Kuvvetli bazla nötrleşme",
      "RCOOH+NaOH→RCOO⁻Na⁺+H₂O denkliğinde her COOH bir OH⁻ tüketir. Tuzdaki Na⁺ ile karboksilatın yükleri birbirini dengeler; doğrudan nötrleşme ürünü ester değildir.",
      "Bir mol oksalik asidin iki COOH grubu toplam iki mol NaOH tüketir; laktik asidin bir COOH’si için olağan karboksil nötrleşmesinde bir mol gerekir. Ek alkol OH’sini bu hesapta otomatik ikinci asit protonuna çevirme.",
    ),
    s024(
      "Kısmi nötrleşme ve çoklu gruplar",
      "Dikarboksilik asidin bir COOH’si nötrleştiğinde bir karboksilat ve bir COOH aynı molekülde kalabilir. İki grup nötrleştiğinde anyon yükü −2, karşı iyon ihtiyacı iki tek yüklü katyon olur.",
      "Şekilde tek tek proton seçmek stokiyometrik eşdeğer hesabıdır. Gerçek çözeltide hangi türün ne kadar bulunduğu pKa değerleri ve pH’yı gerektirir; modelin seçili grup sayısı tek baskın tür veya titrasyon eğrisi tahmini değildir.",
    ),
    s024(
      "Karbonat ve hidrojen karbonat",
      "Karboksilik asit uygun karbonatla CO₂, su ve karboksilat tuzu oluşturabilir: 2RCOOH+Na₂CO₃→2RCOONa+CO₂+H₂O. Bir karbonat iki asit protonu alır.",
      "Hidrojen karbonat için RCOOH+NaHCO₃→RCOONa+CO₂+H₂O oranı 1:1’dir. İki baz türünü karıştırmak gaz molünü iki kat yanlış verir; formüldeki alınabilir proton hesabını dengeleme ile doğrula.",
    ),
    s024(
      "Asit eldesi ve esterleşme",
      "Primer alkolün uygun ileri yükseltgenmesi veya aldehidin yükseltgenmesi aynı iskeletli karboksilik asit verebilir. Bazik tepkimede karboksilat oluşmuşsa serbest asit gösterimi için asitlendirme ayrıca gerekir.",
      "Asit, alkolle uygun asit katalizli denge tepkimesinde ester ve su verir. CH₃COOH+C₂H₅OH ⇌ CH₃COOC₂H₅+H₂O örneğinde karboksilin karbonil C’si esterin asit kökenli tarafında kalır.",
    ),
    s024(
      "Tanıdık asitlerin bağlantıları",
      "Formik/metanoik ve asetik/etanoik adları aynı iki küçük asidin yaygın-sistematik ad çiftleridir. Benzoik asitte fenil–COOH; salisilik asitte buna komşu OH vardır. Aspirin ise asetilsalisilik asittir, salisilik asitle aynı molekül değildir.",
      "Sitrik asit üç karboksilli ve hidroksi gruplu; malik asit iki karboksilli hidroksi asittir. Folik asit karmaşık bir vitamin yapısıdır; isminde asit bulunması onu basit tek işlevli formüle indirmez. Kullanım örnekleri yapı öğrenmeye hizmet eder.",
    ),
    s024(
      "Yağ asitlerinde doymuşluk",
      "Yağ asitleri yağlarla ilişkili alifatik karboksilik asitlerdir; okul örnekleri çoğunlukla uzun ve düz, çift C sayılıdır. Bu yaygın örüntü bütün doğadaki yağ asitleri için zorunlu tanım değildir.",
      "Doymuş/doymamış ayrımı karbon zincirindeki C–C çoklu bağına göre yapılır. Bütün karboksiller C=O taşıdığı hâlde stearik asit doymuş sayılır; karboksil karbonil pi bağını zincir doymamışlığına ekleme.",
    ),
    s024(
      "Yağ asidi formülleri ve H₂",
      "Açık zincirli tek karboksilli, C zincirinde d tane çift bağ taşıyan asit için CₙH₂ₙ₋₂dO₂ formülü kullanılabilir. Stearik C₁₈H₃₆O₂; oleik C₁₈H₃₄O₂; linoleik C₁₈H₃₂O₂ örnekleridir.",
      "Zincirde her C=C’nin tam hidrojenlenmesi bir H₂ gerektirir. Linoleik asidin iki C=C’si için molekül başına iki H₂ gerekir; karboksilin C=O bağı bu seçici zincir hidrojenlenmesinin hesabında indirgenmez.",
    ),
    s024(
      "Esansiyel olmayı doymamışlıktan ayırmak",
      "Doymamış olmak yalnız karbon zincirindeki bağ türünü söyler; esansiyel olmak insanın yeterli sentezleyemeyip dışarıdan edinme gereksinimiyle ilgilidir. Oleik asit doymamıştır fakat esansiyel yağ asidi sayılmaz.",
      "Linoleik asit ve alfa-linolenik asit insan için temel esansiyel yağ asidi örnekleridir. Bütün doymamış yağlar esansiyeldir genellemesi yapılmaz; bu kimyasal sınıflandırma günlük beslenme miktarı veya tedavi önerisi üretmez.",
    ),
    s024(
      "Yağ asidi tuzu ve sabun",
      "Uzun zincirli yağ asidinin Na veya K tuzu sabun sınıfının temel örneğidir: RCOOH+NaOH→RCOONa+H₂O. İyonik karboksilat başı ile hidrokarbon kuyruğu farklı etkileşimler gösterir.",
      "Yağ asidinin doğrudan nötrleşmesi ile bir yağ esterinin bazik hidrolizi farklı başlangıçlardan aynı tür tuza gidebilir. Sabun ester değil karboksilat tuzudur; trigliserit ve mum gibi başlangıç maddeleri ester bağlantısı taşıyabilir.",
    ),
  ],
  examples: [
    e024(
      "COOH’leri ayrı saymak",
      "2,0 mol oksalik asit HOOC–COOH bütün karboksilleri nötrleşecek biçimde NaOH ile tepkimeye giriyor. NaOH ve su kaç moldür?",
      "Molekül başına COOH sayısını molle çarp.",
      [
        "Her oksalik asit iki COOH taşır; toplam 2,0×2=4,0 mol asit eşdeğeri vardır.",
        "H₂C₂O₄+2NaOH→Na₂C₂O₄+2H₂O denkliği kurulur.",
        "4,0 mol NaOH tüketilir ve 4,0 mol su oluşur.",
      ],
      "4,0 mol NaOH ve 4,0 mol H₂O",
      "Oksalat anyonu −2 olduğundan molekül başına iki Na⁺ gerekir.",
      "Zayıf asit diye yalnız kısmen nötrleşebileceğini sanmak.",
    ),
    e024(
      "Ka ile yaklaşık iyonlaşma",
      "Tek protonlu bir karboksilik asitte C=0,10 M ve Ka=4,0×10⁻⁵ verilmiştir. Küçük iyonlaşma varsayımıyla [H₃O⁺] ve iyonlaşma yüzdesini bulun.",
      "√(Ka·C) hesabından sonra varsayımı denetle.",
      [
        "Ka·C=4,0×10⁻⁶ olur.",
        "[H₃O⁺]≈√(4,0×10⁻⁶)=2,0×10⁻³ M bulunur.",
        "İyonlaşma oranı 0,002/0,10=0,020, yani yaklaşık %2’dir; küçük iyonlaşma yaklaşımı uygundur.",
      ],
      "2,0×10⁻³ M ve yaklaşık %2",
      "Tam denge denklemi x²/(0,10−x)=Ka’dır; yaklaşık hesap x≪C kabul eder.",
      "Zayıf asidin her derişimde aynı yüzdeyle iyonlaştığını varsaymak.",
    ),
    e024(
      "Dal numarasını COOH’den başlatmak",
      "CH₃CH(Br)CH₂COOH yapısını adlandırın.",
      "COOH C’sini 1 sayarak dört C’li zinciri izle.",
      [
        "Karboksil C1, komşu CH₂ C2, Br taşıyan CH C3 ve uç CH₃ C4 olur.",
        "Ana asit bütanoik asittir; bromo grubu C3’tedir.",
        "Ad 3-bromobütanoik asit olur.",
      ],
      "3-Bromobütanoik asit",
      "Toplam C4,H7,Br1,O2 sayımı ana asidin bir H’si yerine Br geçtiğini doğrular.",
      "Br’ye yakın uçtan başlatıp karboksil önceliğini bozmak.",
    ),
    e024(
      "Karbonattan gaz miktarı",
      "4,8 g etanoik asit yeterli Na₂CO₃ ile tam tepkimeye giriyor. M(asit)=60 g/mol. CO₂ kaç moldür?",
      "İki asit protonunun bir karbonatı tükettiğini dengele.",
      [
        "n(asit)=4,8/60=0,080 mol bulunur.",
        "2CH₃COOH+Na₂CO₃→2CH₃COONa+CO₂+H₂O oranı kurulur.",
        "n(CO₂)=0,080/2=0,040 mol olur.",
      ],
      "0,040 mol CO₂",
      "Karbonat iki proton alır; NaHCO₃ verilseydi oran aynı olmazdı.",
      "Karbonat ile hidrojen karbonatı aynı katsayıyla kullanmak.",
    ),
    e024(
      "Zincir doymamışlığını hidrojenlemek",
      "0,30 mol linoleik asidin iki C=C bağı tamamen hidrojenleniyor; COOH korunuyor. H₂ tüketimi ve ürün formülü nedir?",
      "Her zincir çift bağı için bir H₂ say.",
      [
        "Linoleik asit C₁₈H₃₂O₂ ve iki C=C taşır.",
        "Molekül başına iki H₂ eklenince C₁₈H₃₆O₂ oluşur.",
        "0,30×2=0,60 mol H₂ tüketilir; ürün stearik asit bağlantısına gider.",
      ],
      "0,60 mol H₂; C₁₈H₃₆O₂",
      "Karboksilin C=O’su korunur; zincir bağları doyurulur.",
      "Karboksil pi bağını üçüncü C=C gibi hidrojen hesabına katmak.",
    ),
  ],
  recall: [
    {
      prompt: "Laktik asitte kaç COOH ve kaç ek alkol OH’si vardır?",
      answer:
        "Bir COOH ve bir ek alkol OH’si; tam karboksil nötrleşmesinde bir eşdeğer baz gerekir.",
    },
    {
      prompt: "Karboksilatın eksi yükü nerede rezonansla dağılır?",
      answer:
        "Karboksilat grubunun iki O’sunda; bütün nötr molekülde eşit tam yük değildir.",
    },
    {
      prompt: "Zayıf asit olmak tam nötrleşme eşdeğerini azaltır mı?",
      answer:
        "Hayır; iyonlaşma dengesi ile yeterli kuvvetli bazın toplam COOH tüketimi ayrı kavramlardır.",
    },
    {
      prompt: "Stearik asit C=O taşıdığı hâlde neden doymuş yağ asididir?",
      answer:
        "Doymuşluk sınıflaması C zincirinde C–C çoklu bağı olmamasına dayanır.",
    },
    {
      prompt: "Doymamış yağ asitlerinin tamamı esansiyel midir?",
      answer:
        "Hayır; oleik esansiyel değildir. Linoleik ve alfa-linolenik temel esansiyel örneklerdir.",
    },
  ],
  items: [],
};
acidPack024.items = [
  q024(
    "Aşağıdaki bağlantılardan hangisi karboksil grubunu açıkça gösterir?",
    "COOH aynı C üzerindeki C=O ve C–OH bağlantılarının bütünüdür.",
    "Karbonil C’nin tek bağla OH’ye de bağlanmasını ara.",
    [
      "–C(=O)OH bağlantısında aynı C hem karbonil O’sunu hem OH’yi taşır.",
      "Bu bütün –COOH olarak kısaltılır.",
      "Dolayısıyla karboksil grubu –C(=O)OH’dir.",
    ],
    [
      ["–C(=O)OH", "Aynı C’de karbonil ve OH çevresi vardır."],
      ["–CH₂OH", "Doymuş C’ye bağlı alkol OH’sidir; karbonil yoktur."],
      ["–O–", "İki C arasında ise eter köprüsü olabilir; COOH değildir."],
      ["–CHO", "Aldehit karbonili ve C’ye bağlı H içerir; OH yoktur."],
      [
        "–CO–",
        "İki C’ye bağlıysa keton karbonilidir; asit OH’si verilmemiştir.",
      ],
    ],
    "Ayrı bir alkol OH’sini tek başına karboksil grubu saymak.",
    "Bir COOH en az iki O içerir: biri çift, biri OH üzerinden tek bağla bağlıdır.",
  ),
  q024(
    "HOOC–CH₂–CH(OH)–COOH için COOH sayısı ve ek alkol OH sayısı hangisidir?",
    "Karboksilin kendi OH’si ile ayrı sp³ C’deki OH farklı sayılır.",
    "İki uçtaki karboksilleri ve ortadaki CH(OH)’yi ayır.",
    [
      "Her iki uçta birer COOH vardır; toplam iki karboksildir.",
      "Ortadaki CH üzerinde ayrıca bir OH bulunur.",
      "Sonuç iki COOH ve bir ek alkol OH’sidir.",
    ],
    [
      ["2 COOH; 1 ek alkol OH", "Uç grupları ve ayrı hidroksili doğru ayırır."],
      ["3 COOH; 0 ek alkol OH", "Ortadaki OH’ye olmayan karbonil ekler."],
      ["1 COOH; 2 ek alkol OH", "Bir uç karboksili alkol gibi sayar."],
      [
        "2 COOH; 3 ek alkol OH",
        "Karboksillerin kendi OH’lerini ek OH sayısına yeniden katar.",
      ],
      [
        "0 COOH; 3 ek alkol OH",
        "İki karbonili ve karboksil bütününü yok sayar.",
      ],
    ],
    "Moleküldeki toplam O–H sayısıyla karboksil sayısını eşitlemek.",
    "Yapı iki karboksilli hidroksi asittir; üç O–H bulunması üç COOH yapmaz.",
  ),
  q024(
    "CH₃CH(Br)COOH yapısının adı hangisidir?",
    "COOH karbonu C1’dir; dal konumu bu uçtan belirlenir.",
    "Üç C’li ana zincirde Br’nin bulunduğu C’yi numarala.",
    [
      "Karboksil C1, Br taşıyan CH C2, CH₃ C3 olur.",
      "Ana ad propanoik asittir.",
      "Br C2’de olduğundan ad 2-bromopropanoik asittir.",
    ],
    [
      ["2-Bromopropanoik asit", "COOH önceliği ve üç C zinciri korunur."],
      ["3-Bromopropanoik asit", "Br’nin bağlandığı orta C’yi uç C sanır."],
      ["2-Bromoetanoik asit", "Karboksil karbonunu toplam zincirden düşürür."],
      ["2-Bromopropanal", "COOH’yi CHO’ya çevirir."],
      [
        "1-Bromopropan-2-ol",
        "Karbonili ve asit OH’sini farklı alkol yapısına dönüştürür.",
      ],
    ],
    "Toplam C sayısını yalnız R parçasından bulmak.",
    "Ana zincir CH₃–CH–COOH boyunca üç C içerir; Br ikinci C’dedir.",
  ),
  q024(
    "Yalnız C, H ve O içeren; açık zincirli, C–C çoklu bağı olmayan ve tek COOH dışında ek işlevsel grup taşımayan bir asit beş C taşıyor. Formülü hangisidir?",
    "Bu sınırlı asit serisi CₙH₂ₙO₂ formülündedir.",
    "n=5’i formülde yerine koyup karboksilin iki O’sunu koru.",
    [
      "Beş C için H sayısı 2×5=10’dur.",
      "Tek karboksil iki O taşır.",
      "Formül C₅H₁₀O₂ olur.",
    ],
    [
      ["C₅H₁₀O₂", "Verilen açık zincirli doymuş monokarboksil kapsamına uyar."],
      ["C₅H₁₂O", "Alkol/eter formülünü kullanır; ikinci O eksiktir."],
      ["C₅H₈O₂", "Verilmemiş ek halka veya C=C kadar H eksiltir."],
      [
        "C₅H₁₀O₄",
        "Tek COOH dışında ek işlevsel grup yasakken iki fazla O atomu ekler.",
      ],
      ["C₄H₈O₂", "Beş C yerine dört C sayar."],
    ],
    "COOH’nin C’sini n’ye eklemeyip bir eksik formül seçmek.",
    "Örnek pentanoik asit CH₃(CH₂)₃COOH açık sayımla C5,H10,O2 verir.",
  ),
  q024(
    "Benzoik asit C₆H₅COOH için doğru molekül formülü ve temel sınıf hangisidir?",
    "Fenil grubunun C₆H₅ sayımı karboksil C/H/O sayımıyla toplanır.",
    "Halka ve COOH atomlarını ayrı topla.",
    [
      "Fenil parçası C6,H5 taşır.",
      "COOH eklenince C1,H1,O2 daha gelir.",
      "Toplam C₇H₆O₂; aromatik monokarboksilik asittir.",
    ],
    [
      [
        "C₇H₆O₂; aromatik monokarboksilik asit",
        "Halkayı ve karboksil karbonunu birlikte sayar.",
      ],
      [
        "C₆H₆O₂; alifatik asit",
        "COOH karbonunu eksiltir ve aromatik halkayı yok sayar.",
      ],
      [
        "C₇H₁₄O₂; açık zincirli asit",
        "CₙH₂ₙO₂’yi aromatik yapıya kapsam dışı uygular.",
      ],
      ["C₇H₆O; aldehit", "Karboksil OH oksijenini çıkarır."],
      ["C₆H₅OH; fenol", "COOH yerine yalnız OH yazar."],
    ],
    "Aromatik yapıya açık zincirli H sayısı kuralını zorla uygulamak.",
    "Bir karboksil vardır; yedi C’nin altısı halkada, biri COOH’dedir.",
  ),
  q024(
    "HA bir zayıf karboksilik asittir. Suyla iyonlaşmasını en uygun hangi denklem gösterir?",
    "Suda asit protonunu suya aktararak H₃O⁺ ve karboksilat oluşturur.",
    "HA’dan H’yi suya aktar; tersinirliği koru.",
    [
      "HA bir proton verdiğinde A⁻ kalır.",
      "H₂O bu protonu alıp H₃O⁺ olur.",
      "Zayıf asit için HA+H₂O ⇌ H₃O⁺+A⁻ denklemi yazılır.",
    ],
    [
      [
        "HA+H₂O ⇌ H₃O⁺+A⁻",
        "Proton aktarımı, yük ve dengeyi birlikte gösterir.",
      ],
      [
        "HA → H⁻+A⁺",
        "Proton yerine hidrit üretir ve asit-baz yüklerini ters çevirir.",
      ],
      ["HA+NaOH→ester+H₂", "Nötrleşme ürününü ester ve H₂ gibi yanlış verir."],
      [
        "HA+H₂O→A⁻+OH⁻",
        "Pozitif yükü ve protonun nereye gittiğini karşılamaz.",
      ],
      [
        "HA tamamen ve her derişimde tek yönlü iyonlaşır",
        "Zayıf asidin denge niteliğini siler.",
      ],
    ],
    "Suda OH taşıyan her organik maddenin OH⁻ verdiğini varsaymak.",
    "Denklem iki tarafta toplam sıfır yük taşır; H₃O⁺ ve A⁻ birlikte oluşur.",
  ),
  q024(
    "1,0 mol tek karboksilli zayıf asit, yeterli NaOH ile bütün COOH grupları nötrleşecek biçimde tepkimeye giriyor. NaOH tüketimi kaç moldür?",
    "Zayıf iyonlaşma, yeterli kuvvetli bazla toplam asit eşdeğerini azaltmaz.",
    "Molekül başına bir COOH için bir OH⁻ say.",
    [
      "Her asit molekülünde bir karboksil protonu vardır.",
      "RCOOH+NaOH→RCOONa+H₂O oranı 1:1’dir.",
      "1,0 mol asit için 1,0 mol NaOH tüketilir.",
    ],
    [
      ["1,0", "Tam karboksil nötrleşmesinin bir eşdeğerini kullanır."],
      ["0,0", "Zayıf asit tepkime vermez gibi yorumlar."],
      ["0,01", "Belirtilmemiş iyonlaşma yüzdesini toplam kapasiteye taşır."],
      ["2,0", "Karboksildeki iki O’yu iki proton gibi sayar."],
      ["0,5", "Karbonatın 2:1 oranını NaOH’ye aktarır."],
    ],
    "Zayıf sözcüğünü yalnız küçük bir kesimin nötrleşebileceği anlamında kullanmak.",
    "Bir mol karboksilat ve bir mol su oluşur; asit eşdeğeri kapanır.",
  ),
  q024(
    "Karboksilat RCOO⁻ için rezonansın doğru yorumu hangisidir?",
    "Rezonans, karboksilat grubundaki yük ve bağların delokalizasyonunu açıklar.",
    "Formal çizim ile gerçek grubun iki O’sunu ayırmadan değerlendir.",
    [
      "Formal katkılarda eksi yük bir O’da çizilebilir.",
      "Gerçek karboksilatın iki O’su yük ve bağ düzenine birlikte katılır.",
      "Yükün bütün nötr molekülde eşit dağılması iddiası bu açıklamadan çıkmaz.",
    ],
    [
      [
        "Eksi yük karboksilatın iki O’su arasında dağılır",
        "Anyona ait yerel rezonans bölgesini doğru belirler.",
      ],
      [
        "Nötr asit bütün atomlarında toplam −1 yük taşır",
        "Nötr asitle anyonu ve yük bölgesini karıştırır.",
      ],
      [
        "Her O kesin ayrı −1 yük taşır; toplam −2’dir",
        "Tek karboksilatın toplam yükünü ikiye katlar.",
      ],
      [
        "İki O sürekli molekülden ayrılır",
        "Rezonansı atom kopması gibi yorumlar.",
      ],
      [
        "Karbonil her an iki O atomu daha üretir",
        "Rezonansı atom sayısı değişimi sanır.",
      ],
    ],
    "Bir formal katkı yapısını tek sabit fiziksel yük dağılımı sanmak.",
    "Tek karboksilatın toplam yükü −1’dir; rezonans atom sayısını değiştirmez.",
  ),
  q024(
    "A ve B aynı koşullarda tek protonlu karboksilik asitlerdir. pKa(A)=3,0; pKa(B)=5,0. Asit kuvveti ve Ka oranı hangisidir?",
    "pKa küçüldükçe Ka büyür; iki pKa birimi yüz kat Ka farkı verir.",
    "Her pKa’yı 10’un eksi kuvveti olarak yaz.",
    [
      "Ka(A)=10⁻³; Ka(B)=10⁻⁵’tir.",
      "Ka(A)/Ka(B)=10²=100 bulunur.",
      "A daha kuvvetlidir ve Ka’sı 100 kattır.",
    ],
    [
      [
        "A daha kuvvetli; Ka(A)/Ka(B)=100",
        "pKa’nın ters yönünü ve logaritmik oranı korur.",
      ],
      ["B daha kuvvetli; oran 100", "pKa büyük olanı daha kuvvetli sayar."],
      ["A daha kuvvetli; oran 2", "pKa farkını doğrudan Ka oranı yapar."],
      [
        "A ile B eş kuvvetli; hepsi karboksilik asittir",
        "Sınıf adını verilen farklı denge sabitlerinin yerine koyar.",
      ],
      [
        "B daha kuvvetli; oran 1/100",
        "Hem kuvvet sırasını hem A/B oranını ters uygular.",
      ],
    ],
    "pKa sayısını asit kuvvetiyle aynı yönde büyüyen bir ölçek sanmak.",
    "10⁻³, 10⁻⁵’ten yüz kat büyüktür; karşılaştırma aynı koşullar içindir.",
  ),
  q024(
    "Tek protonlu bir zayıf asitte Ka=1,0×10⁻⁵ ve C=0,10 M verilmiştir. Küçük iyonlaşma yaklaşımıyla [H₃O⁺] kaç M olur?",
    "Küçük iyonlaşmada [H₃O⁺]≈√(Ka·C) alınabilir.",
    "Önce çarpımı, sonra karekökü bul.",
    [
      "Ka·C=10⁻⁵×10⁻¹=10⁻⁶ olur.",
      "√10⁻⁶=10⁻³ M bulunur.",
      "10⁻³/0,10=0,01 yani %1 iyonlaşma yaklaşımı destekler.",
    ],
    [
      ["1,0×10⁻³", "Karekökü ve üsleri doğru uygular."],
      ["1,0×10⁻⁶", "Ka·C sonucunun karekökünü almaz."],
      ["1,0×10⁻⁵", "Ka’yı doğrudan iyon derişimi sayar."],
      ["1,0×10⁻¹", "Asidi tamamen iyonlaşmış kuvvetli asit gibi alır."],
      ["1,0×10⁻⁷", "Zayıf asit çözeltisini otomatik nötr su sayar."],
    ],
    "Zayıf asit sözcüğünden doğrudan pH=7 sonucu çıkarmak.",
    "Yaklaşık H₃O⁺ başlangıç asit derişiminden çok küçüktür; pH yaklaşık 3’tür.",
  ),
  q024(
    "0,20 mol oksalik asit HOOC–COOH, karboksilleri tamamen nötrleşecek biçimde KOH ile tepkimeye giriyor. KOH kaç moldür?",
    "Her COOH tam nötrleşmede bir OH⁻ tüketir.",
    "İki COOH’yi molekül molüyle çarp.",
    [
      "Oksalik asit molekülünde iki karboksil vardır.",
      "0,20 mol molekül 0,40 mol COOH eşdeğeri taşır.",
      "KOH tüketimi 0,40 mol olur.",
    ],
    [
      ["0,40", "İki asit grubunu 1:1 OH⁻ eşdeğeriyle sayar."],
      ["0,20", "Molekül başına tek COOH varmış gibi davranır."],
      ["0,10", "İki grup sayısını çarpmak yerine böler."],
      ["0,80", "Dört O’yu dört asit protonu sayar."],
      ["0,00", "Zayıf asidin kuvvetli bazla nötrleşmesini reddeder."],
    ],
    "Oksalik asitteki O sayısını alınabilir karboksil H sayısı sanmak.",
    "Tam oksalat tuzunda molekül başına iki K⁺ gerekir; 0,40 mol K⁺ ile yük kapanır.",
  ),
  q024(
    "0,30 mol laktik asit CH₃CH(OH)COOH’un yalnız karboksili NaOH ile tamamen nötrleştiriliyor. NaOH ve su miktarları hangisidir?",
    "Laktik asitte bir COOH ve bir ayrı alkol OH’si bulunur; bu hesap COOH içindir.",
    "Ek OH’yi karboksil eşdeğerine katmadan say.",
    [
      "Her laktik asit bir COOH taşır.",
      "0,30 mol COOH, 0,30 mol NaOH tüketir.",
      "Her nötrleşme bir su verdiğinden 0,30 mol H₂O oluşur.",
    ],
    [
      [
        "0,30 mol NaOH; 0,30 mol H₂O",
        "Yalnız bir karboksilin 1:1 eşdeğerini sayar.",
      ],
      [
        "0,60 mol NaOH; 0,60 mol H₂O",
        "Alkol OH’sini ikinci karboksil gibi ekler.",
      ],
      ["0,90 mol NaOH; 0,90 mol H₂O", "Üç O atomunu üç asit protonu sanır."],
      [
        "0,15 mol NaOH; 0,30 mol H₂O",
        "Baz ve su katsayılarını ayrı, dengesiz kurar.",
      ],
      [
        "0,30 mol NaOH; 0,15 mol H₂O",
        "Bir OH⁻ başına bir su denkliğini bozar.",
      ],
    ],
    "Bütün O–H gruplarını olağan karboksil titrasyonunda eşdeğer saymak.",
    "Ek CH(OH) bağlantısı korunur; ürün laktat tuzu ve sudur.",
  ),
  q024(
    "Bir mol sitrik asit molekülünde üç COOH ve bir ek OH vardır. Yalnız iki COOH nötrleşirse molekül başına formal anyon yükü ve Na⁺ sayısı nedir?",
    "Her karboksil protonunun kaybı net yükü bir azaltır.",
    "Nötrleşen iki grup için yük ve karşı iyonu birlikte say.",
    [
      "Başlangıç nötr asit olarak sayılır.",
      "İki COOH’den ikişer değil toplam iki H⁺ ayrılması yükü −2 yapar.",
      "Yükü dengelemek için molekül başına iki Na⁺ gerekir.",
    ],
    [
      ["−2 yük; 2 Na⁺", "İki karboksilatın toplam yükünü dengeler."],
      ["−3 yük; 3 Na⁺", "Üçüncü COOH’nin de nötrleştiğini varsayar."],
      ["−1 yük; 1 Na⁺", "Nötrleşen gruplardan birini saymaz."],
      ["0 yük; 0 Na⁺", "Proton kaybının anyon yükünü yok sayar."],
      ["−4 yük; 4 Na⁺", "Ek OH’yi ve bütün COOH’leri tüketilmiş sayar."],
    ],
    "Kısmi nötrleşme seçimini gerçek çözeltide tek tür baskınlığı garantisi gibi yorumlamak.",
    "Bir COOH ve ek alkol OH’si korunur; formal eşdeğer hesabı pH dağılımı hesabı değildir.",
  ),
  q024(
    "0,30 mol propanoik asit yeterli Na₂CO₃ ile tam tepkimeye giriyor. CO₂ miktarı kaç moldür?",
    "Karbonatın bir molü iki karboksil protonu tüketerek bir CO₂ verir.",
    "2 asit:1 CO₂ oranını kullan.",
    [
      "2RCOOH+Na₂CO₃→2RCOONa+CO₂+H₂O kurulur.",
      "0,30 mol tek karboksilli asit 0,15 mol karbonat tüketir.",
      "CO₂ miktarı da 0,15 mol olur.",
    ],
    [
      ["0,15", "İki asit protonunun bir karbonatı tüketmesini uygular."],
      ["0,30", "NaHCO₃ için geçerli 1:1 oranı kullanır."],
      ["0,60", "2:1 katsayıyı ters yönde uygular."],
      ["0,90", "Asidin üç C’sini gazın katsayısı sanır."],
      ["0,00", "Asit-karbonatın CO₂ ürününü yok sayar."],
    ],
    "Gazdaki C’nin asidin bütün karbonlarından geldiğini düşünmek.",
    "Bu tepkimede CO₂’nin karbonu karbonattan gelir; asidin C iskeleti tuzda korunur.",
  ),
  q024(
    "Glisin NH₂CH₂COOH’un amfoter davranışına en uygun açıklama hangisidir?",
    "Amino grup proton alabilir; karboksil grup proton verebilir.",
    "İki farklı grubun protonla ilişkisini ayrı belirle.",
    [
      "COOH proton vererek COO⁻ oluşturabilir.",
      "NH₂ proton alarak NH₃⁺ oluşturabilir.",
      "Bu iki yön glisinin asit ve baz gibi davranabilmesini açıklar.",
    ],
    [
      [
        "COOH proton verirken amino grup proton alabilir",
        "İki grubun farklı asit-baz rollerini açıklar.",
      ],
      [
        "Bütün H’ler aynı kuvvette asit protonudur",
        "C–H ve grup protonlarını ayrım gözetmeden eşitler.",
      ],
      [
        "Amino grup daima COO⁻’ye dönüşür",
        "N grubunu O içeren gruba atom korunumuna aykırı çevirir.",
      ],
      [
        "Glisin yalnız metal oksit olduğundan amfoterdir",
        "Organik amino asidi metal oksit sanır.",
      ],
      ["Glisinde karboksil yoktur", "COOH’yi verilen yapıda görmez."],
    ],
    "Amfoterliği yalnız ezber bir madde listesi olarak bilip proton alıp verme gruplarını ayırmamak.",
    "Suda zwitteriyon biçimi önemlidir; gerçek protonlanma dağılımı pH’ya bağlıdır.",
  ),
  q024(
    "Salisilik asit için doğru yapı adı ve aspirinle ilişkisi hangisidir?",
    "Salisilik asit 2-hidroksibenzoik asit, aspirin asetilsalisilik asittir.",
    "Benzoik asitte OH konumunu ve asetillenme farkını ayrı oku.",
    [
      "Salisilik asitte COOH’ye komşu halka C’sinde OH vardır; konum 2’dir.",
      "Aspirinde salisilik yapının OH’si asetillenmiş farklı moleküldür.",
      "Bu yüzden salisilik asit ile aspirin eşadlı değildir.",
    ],
    [
      [
        "2-Hidroksibenzoik asit; aspirinden farklıdır",
        "Komşu OH konumunu ve türev farkını korur.",
      ],
      [
        "3-Hidroksibenzoik asit; aspirinle aynıdır",
        "Hem OH konumunu hem molekül özdeşliğini yanlış verir.",
      ],
      ["Benzoik asit; hiç OH içermez", "Ek fenolik OH’yi yok sayar."],
      ["Etanoik asit; iki C taşır", "Aromatik halkayı ve yedi C’yi siler."],
      ["Glisin; amino grup taşır", "Verilmeyen N atomunu ekler."],
    ],
    "Bir ilacın başlangıç/türev ilişkisini iki maddenin aynı olmasıyla karıştırmak.",
    "Kimyasal ad ayrımı kullanım veya kişisel tedavi önerisi değildir.",
  ),
  q024(
    "Stearik asit C₁₈H₃₆O₂, oleik asit C₁₈H₃₄O₂ ve linoleik asit C₁₈H₃₂O₂ olarak veriliyor. C zincirindeki çift bağ sayıları sırasıyla hangisidir?",
    "Aynı açık zincirli monokarboksilik seride her C=C iki H azaltır.",
    "Doymuş H36 tabanından H eksiklerini ikiye böl.",
    [
      "Stearik H36 ile zincirde çift bağ taşımaz.",
      "Oleik iki H eksik olduğundan bir C=C taşır.",
      "Linoleik dört H eksik olduğundan iki C=C taşır; sıra 0,1,2’dir.",
    ],
    [
      ["0, 1, 2", "H eksikliğini zincir çift bağlarıyla doğru eşler."],
      ["1, 2, 3", "Her asidin karboksil C=O’sunu zincir doymamışlığına ekler."],
      ["0, 2, 4", "H eksikliğini ikiye bölmeden çift bağ sayar."],
      ["2, 1, 0", "H azaldıkça çift bağın arttığı yönü ters çevirir."],
      [
        "1, 1, 1",
        "Bütün asitlerin aynı karboksil grubunu zincir ölçütü yerine kullanır.",
      ],
    ],
    "Karboksil karbonil pi bağını yağ asidi doymamışlığında C=C gibi saymak.",
    "O₂ sayısı üçünde de aynıdır; değişen zincirin H ve C=C sayısıdır.",
  ),
  q024(
    "İnsan için esansiyel yağ asidi ile doymamışlık ayrımı hakkında doğru ifade hangisidir?",
    "Esansiyellik biyosentez gereksinimi, doymamışlık bağ yapısı ölçütüdür.",
    "Oleik örneğini genellemenin karşı örneği olarak kullan.",
    [
      "Oleik asit bir C=C taşır; doymamıştır.",
      "Oleik asit temel esansiyel yağ asidi olarak sınıflanmaz.",
      "Dolayısıyla bütün doymamış yağ asitleri esansiyeldir iddiası yanlıştır.",
    ],
    [
      [
        "Oleik doymamıştır; bütün doymamışlar esansiyel değildir",
        "Bağ sınıfını biyosentez gereksiniminden ayırır.",
      ],
      [
        "Her doymamış asit zorunlu esansiyeldir",
        "Oleik karşı örneğini dışlar.",
      ],
      ["Linoleik asit doymuştur", "İki C=C taşıyan yapıyı yanlış sınıflar."],
      [
        "Esansiyel demek yalnız COOH taşımak demektir",
        "Bütün karboksilik asitleri tek biyolojik sınıfa alır.",
      ],
      [
        "Oleik asit C=C taşımadığı için esansiyel değildir",
        "Sonuca yanlış bağ gerekçesi ekler; oleik C=C taşır.",
      ],
    ],
    "Kimyasal doymamışlık bilgisinden tek başına beslenme zorunluluğu çıkarmak.",
    "Linoleik ve alfa-linolenik temel esansiyel örneklerdir; bu sınıflama miktar önermez.",
  ),
  q024(
    "0,25 mol oleik asidin yalnız zincirdeki tek C=C bağı tamamen hidrojenleniyor; COOH korunuyor. H₂ tüketimi kaç moldür?",
    "Her zincir C=C için bir H₂ tüketilir.",
    "Bir çift bağı başlangıç molekülü molüyle çarp.",
    [
      "Oleik asit molekülünde tek zincir C=C vardır.",
      "Bir mol oleik asit bir mol H₂ tüketir.",
      "0,25 mol oleik asit için 0,25 mol H₂ gerekir.",
    ],
    [
      ["0,25", "Tek zincir çift bağını 1:1 H₂ oranıyla sayar."],
      ["0,50", "Karboksil C=O’sunu da tüketilen çift bağa ekler."],
      ["0,125", "Bir çift bağ için yarım H₂ alır."],
      ["4,50", "On sekiz C’yi H₂ katsayısı sanır."],
      ["0,00", "Doymamış zincirin hidrojenlenmesini göz ardı eder."],
    ],
    "Seçici zincir hidrojenlenmesi koşulunda karboksili de indirgenmiş kabul etmek.",
    "C₁₈H₃₄O₂+H₂→C₁₈H₃₆O₂; iki H artar, O sayısı korunur.",
  ),
  q024(
    "C₁₇H₃₅COOH + NaOH → C₁₇H₃₅COONa + H₂O tepkimesi için doğru yorum hangisidir?",
    "Yağ asidi ile kuvvetli bazın doğrudan tepkimesi nötrleşmedir; ürün karboksilat tuzudur.",
    "Başlangıcın asit, ürünün yüklü karboksilat olduğunu izle.",
    [
      "Başlangıç uzun zincirli tek karboksilli asittir.",
      "COOH protonu OH⁻ ile su oluşturur.",
      "Sodyum stearat sabun örneği olan karboksilat tuzudur; ester değildir.",
    ],
    [
      [
        "Nötrleşme; sabun niteliğinde karboksilat tuzu oluşur",
        "Başlangıç ve ürünün işlevsel/iyonik yapılarını doğru açıklar.",
      ],
      [
        "Esterleşme; eter oluşur",
        "Alkol ve ester bağlantısı bulunmadığı hâlde bu sınıfları ekler.",
      ],
      [
        "Hidrasyon; C=C açılır",
        "Başlangıç zincirinde verilmemiş C=C kullanır.",
      ],
      [
        "İndirgenme; aldehit oluşur",
        "Karbonili aldehide çeviren indirgen yoktur.",
      ],
      [
        "Sabun oluştuğundan başlangıç zorunlu trigliserittir",
        "Aynı tuza doğrudan yağ asidi nötrleşmesiyle de gidilebildiğini görmez.",
      ],
    ],
    "Sabun ürününü görünce bütün tepkimeleri ester sabunlaşması saymak.",
    "Bu denklemde gliserol oluşmaz; ester başlangıcı verilmemiştir.",
  ),
];
const esterPack024: Pack024 = {
  id: "ayt-esterler",
  topic: "detail-459",
  title: "Esterler",
  minutes: 90,
  objectives: [
    "Esterin asit ve alkol kökenli parçalarını bağlantıdan ve addan çıkarmak",
    "Esterleşme, asidik hidroliz ve bazik hidrolizi ürün ve koşullarıyla ayırmak",
    "Sınırlayıcı madde, atom kökeni ve trigliserit sabunlaşmasını dengeli hesaplamak",
  ],
  sections: [
    s024(
      "Başlamadan: ester köprüsü",
      "Karboksilik asit esteri R–C(=O)–O–R′ bağlantısını taşır. Köprü O’nun öbür komşusu karbonil olmayan bir C’dir; asitte bu yerde H bulunur. Köprü O iki karbonil C’si arasındaysa asit anhidriti olur. Ester, eterden farklı olarak aynı çevrede karbonil içerir.",
      "Ön koşul COOH, alkol ve eter gruplarını ayırmak; molekül formülünde bütün O’ları saymaktır. Basit tek işlevli esterde iki O vardır; bunlardan biri karbonil, diğeri asit ve alkol kökenli parçalar arasındaki köprü O’sudur.",
    ),
    s024(
      "Asit ve alkol parçalarını ayırmak",
      "CH₃CH₂C(=O)OCH₃ örneğinde CH₃CH₂C(=O) tarafı propanoik asitten; O–CH₃ tarafı metanolden gelir. Karbonil C her zaman asit kökenli karbon hesabında bulunur.",
      "Esterin C–O bağını ayırarak anne maddeleri zihinde kurarken asit tarafına OH, alkol tarafına H tamamla. Bu yapısal ters okuma, reaksiyonda serbest OH⁻ ve H⁺ ayrı maddeler olarak kullanıldığını söylemez.",
    ),
    s024(
      "Sistematik adlandırma",
      "Önce alkolden gelen alkil grubunun adı, sonra asitten gelen alkanoat yazılır. CH₃COOCH₂CH₃ etil etanoat; HCOOCH₃ metil metanoattır. İlk sözcüğün C sayısı karbonil tarafının değil alkol tarafının sayısıdır.",
      "CH₃CH₂COOCH₃ metil propanoat ile CH₃COOCH₂CH₃ etil etanoat aynı C₄H₈O₂ formülünde farklı bağlantılardır. Adın iki bölümünü yer değiştirerek okumak farklı bir ester seçebilir; yarı açık formülle doğrula.",
    ),
    s024(
      "Yaygın ve aril adlar",
      "Etanoat için asetat, metanoat için format, propanoat için propiyonat gibi yaygın karşılıklar görülebilir. Etil asetat ile etil etanoat aynı bağlantıyı anlatır; iki adı iki izomer sayma.",
      "O’ya bağlanan grup aril de olabilir: C₆H₅O–C(=O)H fenil metanoat, C₆H₅COOCH₃ metil benzoattır. Fenil ile benzil C₆H₅CH₂– grupları aynı değildir; ek CH₂ adı ve molekül formülünü değiştirir.",
    ),
    s024(
      "Fischer esterleşmesi",
      "Bir karboksilik asit ve alkol uygun asit katalizli koşullarda ester ve su oluşturabilir: RCOOH+R′OH ⇌ RCOOR′+H₂O. Tek COOH ile tek OH’nin esterleşmesinde bir ester bağı başına bir su oluşur.",
      "Tepkime denge karakteri taşır; bütün başlangıç maddelerinin zorunlu tam tüketildiği varsayılmaz. Asit katalizörü net olarak tüketilen bir reaktan değildir; oluşan ester miktarı için verilen ilerleme, denge veya verim bilgisi gerekir.",
    ),
    s024(
      "Katalizör ve dengeyi ayırmak",
      "Uygun katalizör dengeye ulaşmayı hızlandırır; aynı sıcaklıkta denge sabitini veya yalnız ürün tarafının kararlılığını tek başına değiştirmez. Her iki yöndeki uygun yolun etkinleşmesini kolaylaştırır.",
      "Reaktanı fazla kullanmak veya ürünü uygun biçimde uzaklaştırmak denge bileşimini değiştirebilir. Örneğin suyun uzaklaştırılması ester oluşumu yönünü destekleyebilir; bu etki katalizörün denge sabitini artırmasıyla açıklanmaz.",
    ),
    s024(
      "Su oluşurken atom takibi",
      "Standart basit Fischer yolunun atom takibinde alkolün O’su esterin tek bağlı köprü O’sunda kalır; asidin OH parçasındaki O suya geçebilir. Alkolün O–H hidrojeni suyun H hesabına katılır.",
      "Bu gösterim net parça kökenini öğretir; tepkimeye serbest OH⁻ ile H⁺ reaktanları yazma gerekçesi değildir. Uzun süreli asitli ortamda izotop değişimleri olabileceğinden etiket sonucu standart yol ve değişim yok varsayımıyla sınırlandırılır.",
    ),
    s024(
      "Sınırlayıcı madde ve ilerleme",
      "Tek işlevli esterleşmede asit ve alkol 1:1 tüketilir. Başlangıç molü a ve b ise yalnız stokiyometrik üst sınır min(a,b)’dir; seçilen ilerleme x bu sınırı aşamaz.",
      "Tepkime sonunda asit a−x, alkol b−x, ester x ve başlangıçta yoksa su x mol olur. Bunlar seçilmiş ilerlemenin madde bilançosudur; denge sabiti verilmeden gerçek denge ilerlemesini hesapladığını söyleme.",
    ),
    s024(
      "Asidik hidroliz",
      "Esterin suyla uygun asidik hidrolizi esterleşmenin ters yönüdür: RCOOR′+H₂O ⇌ RCOOH+R′OH. Karbonil tarafı asit, O’nun alkil tarafı alkol olarak geri okunur.",
      "Bir mol tek ester bağı hidrolizi bir mol su tüketir ve birer mol asit/alkol verir. Asit katalizörü ile karboksilik asit ürünü farklı rollerdedir; ürünün bir asit olması her hidrolizin katalizörsüz aynı hızda olacağını göstermez.",
    ),
    s024(
      "Bazik hidroliz",
      "Ester NaOH veya KOH ile bazik hidrolizde doğrudan karboksilat tuzu ve alkol verir: RCOOR′+NaOH→RCOONa+R′OH. Bir ester bağı başına bir OH⁻ stokiyometrik tüketilir.",
      "Bazik ürün RCOO⁻ olduğundan bu yol, basit asit katalizli denge yazımına göre ürün yönünde güçlü biçimde ilerler. Serbest RCOOH elde etmek istenirse ayrıca asitlendirme gerekir; asitlendirme verilmeden nötr asit yazma.",
    ),
    s024(
      "Üç yolun ortak atom denetimi",
      "Esterleşmede bir su çıkar; asidik hidrolizde su girer; bazik hidrolizde OH⁻ girer ve karboksilat yükü oluşur. Üç yolun ortak noktası asit ve alkol kökenli karbon iskeletlerini korumaktır.",
      "NaOH kullanılan bazik hidrolizde Na⁺ karşı iyonunu ürün bilançosuna kat. İyonik yazımda organik karboksilat ve katyon ayrı gösterilebilir; toplam yük sıfır olmalıdır. Karboksilatı bir H eklemeden serbest asit diye adlandırmak atom/yük hesabını bozar.",
    ),
    s024(
      "Molekül formülü ve en küçük ester",
      "Yalnız C, H ve iki O içeren, açık zincirli, C–C çoklu bağı ve tek ester dışında ek işlev taşımayan bileşikler CₙH₂ₙO₂ formülüne uyar. En küçük karboksilik ester HCOOCH₃ metil metanoattır ve toplam iki C taşır.",
      "Tek C’li metanoik asidin ester izomeri yoktur; ester için karbonil C dışında O’ya bağlı en az bir C gerekir. Aromatik, halkalı, ek OH’li veya birden fazla ester gruplu yapılara temel formül koşulsuz uygulanmaz.",
    ),
    s024(
      "Asit–ester izomerliği",
      "Propanoik asit CH₃CH₂COOH ile etil metanoat HCOOCH₂CH₃ aynı C₃H₆O₂ formülündedir; işlevsel grup izomeridir. Asitte COOH, esterde COOR bağlantısı bulunur.",
      "Aynı formüllü iki ester ise ester grubu yerinde kalırken karbon bölüşümü veya bağlantısı farklı olabilir. İşlevsel grup adı değişmeyen bir çifti sırf iki adı farklı diye asit–ester grup izomerliği olarak etiketleme.",
    ),
    s024(
      "Hidrojen bağı alıcılığı",
      "Yalnız ester grubu taşıyan basit esterde O–H veya N–H vericisi yoktur. Ester O’ları uygun su gibi vericilerden hidrojen bağı kabul edebilir; kendi aralarında klasik O–H···O bağı için gereken H yoktur.",
      "Ek OH taşıyan hidroksi esterler bu sınırlı karşılaştırmadan farklıdır. Bir ester grubunun bulunması molekülün başka yerindeki H bağı vericisini silmez; sonuç için bütün yapı ve karşılaştırma koşulu okunmalıdır.",
    ),
    s024(
      "Kaynama ve çözünürlük",
      "Benzer mol kütlesi ve yapıda tek işlevli esterler, kendi arası H bağı kuran uygun asit ve alkollerden daha uçucu olabilir. London ve dipol etkileşimleri yine vardır; esterler etkileşimsiz moleküller değildir.",
      "Kısa esterler suyla kısmen etkileşirken hidrokarbon kısmı büyüdükçe çözünürlük çoğunlukla azalır. Her esterin her suda çözünürlük oranını yalnız grup adına göre kesinleştirme; sıcaklık ve gerçek veri önemlidir.",
    ),
    s024(
      "Koku ve çözücü örnekleri",
      "Etil etanoat organik çözücü örneği; bazı düşük mol kütleli esterler koku ve aroma karışımlarının bileşenleridir. Etil bütanoat ve izopentil asetat gibi adları asit/alkol parçalarına ayırarak okuyabilirsin.",
      "Doğal meyve veya çiçek kokusu çok sayıda bileşenin karışımıdır; bir meyve eşittir tek kesin ester denklemi kurulmaz. Endüstriyel örnekler kimyasal yapıyı ilişkilendirir; tadına bakma veya kişisel kullanım yönergesi vermez.",
    ),
    s024(
      "Mumlar, lanolin ve polyester",
      "Mumlarda uzun zincirli asit ile uzun zincirli alkolün esterleri önemli yer tutar. Lanolin yün kökenli karmaşık bir karışımdır; tek saf molekül veya yalnız bir ester formülüyle gösterilemez.",
      "Polyesterlerde zincir boyunca tekrar eden ester bağları vardır; tek esterli küçük moleküllerin formülü bütün polimere uygulanmaz. Bir malzemenin ester içermesi onun sabunla aynı işlevsel grupta olduğu anlamına gelmez; sabun karboksilat tuzudur.",
    ),
    s024(
      "Gliserol ve trigliserit bağlantısı",
      "Gliserol HOCH₂–CH(OH)–CH₂OH üç alkol OH’si taşır. Üç yağ asidiyle tam esterleşmesinde üç su çıkar ve üç ester bağı taşıyan trigliserit oluşur.",
      "Doğru yağ bağlantısı gliserol C–O–C(=O)–R biçimindedir. CH₂–C(=O)–O–R çizimi O ile karbonil sırasını değiştirerek farklı yapı verir; ester O’su gliserol C’siyle karbonil C arasındadır.",
    ),
    s024(
      "Trigliseridin sabunlaşması",
      "Bir trigliseridin üç ester bağı NaOH ile tam hidroliz olursa bir gliserol ve üç yağ asidi tuzu oluşur: trigliserit+3NaOH→gliserol+3RCOONa. KOH kullanılırsa potasyum tuzları elde edilir.",
      "Sabun ester değil tuzdur; ester bağı başlangıç yağındadır. Bir mol yağ için baz tüketimi üç mol, gliserol bir mol, sabun üç moldür. Kısmi hidroliz mono/digliserit karışımları verebilir; basit tam-molekül modeli bunları hesaplamaz.",
    ),
    s024(
      "Yağ formülü ve model sınırı",
      "Aynı n C’li ve d zincir çift bağlı üç asidin gliserolle triesteri C₃ₙ₊₃H₆ₙ₋₆d₊₂O₆ formülündedir. Bu toplam, gliserol+3 asit−3 su atom hesabından gelir; COOH karbonları n’ye dâhildir.",
      "Etkileşimli modelde ilerleme, tamamen dönüşmüş mol sayısı olarak seçilir; gerçek hız, denge, üretim verimi veya kısmi ürün dağılımı tahmin edilmez. Saf küçük esterlerde ise her bağın ve gizli H’nin gerçek grafikten sayılması toplam formülü bağımsız denetler.",
    ),
  ],
  examples: [
    e024(
      "Esteri geriye okumak",
      "HCOOCH₂CH₂CH₂CH₃ esterinin adı ve asidik tam hidroliz ürünleri nedir?",
      "Karbonil tarafını asit, tek O’nun alkil tarafını alkol olarak ayır.",
      [
        "HCO– tarafı metanoik asit kökenlidir; alkil tarafı düz dört C’li bütildir.",
        "Ad bütil metanoattır.",
        "Bir suyla hidrolizde metanoik asit ve bütan-1-ol oluşur.",
      ],
      "Bütil metanoat; metanoik asit ve bütan-1-ol",
      "Ester C₅H₁₀O₂ +H₂O =CH₂O₂+C₄H₁₀O; toplam atomlar korunur.",
      "Esterin toplam beş C’sini asit ana zinciri sanmak.",
    ),
    e024(
      "İlerleme ve artan maddeler",
      "Başlangıçta ester ve su bulunmayan 0,65 mol propanoik asit ile 0,40 mol metanol karışımının esterleşmesinde ilerleme 0,30 mol verilmiştir. Son bileşim ve stokiyometrik üst sınır nedir?",
      "Verilen ilerlemeyi her iki reaktandan 1:1 çıkar.",
      [
        "Üst sınır min(0,65;0,40)=0,40 mol esterdir.",
        "0,30 mol ilerleme sonunda asit 0,35, metanol 0,10 mol kalır.",
        "Başlangıçta ester/su olmadığı için son miktarları ayrı ayrı 0,30 mol metil propanoat ve 0,30 mol sudur.",
      ],
      "0,35 mol asit; 0,10 mol alkol; 0,30 mol ester ve su",
      "İlerleme 0,30≤0,40; hiçbir reaktan miktarı negatif değildir.",
      "Sınırlayıcı üst sınırı, verilmiş gerçek ilerlemeyle aynı saymak.",
    ),
    e024(
      "Bazik hidrolizin kütlesi",
      "17,6 g etil etanoat yeterli NaOH ile tamamen hidroliz ediliyor. M(ester)=88, M(NaOH)=40 g/mol. Baz tüketimi ve organik ürünler nedir?",
      "Tek ester bağı başına bir baz eşdeğeri kullan.",
      [
        "Ester molü 17,6/88=0,20 moldür.",
        "0,20 mol NaOH yani 8,0 g baz tüketilir.",
        "0,20 mol sodyum etanoat ve 0,20 mol etanol oluşur; serbest asit için ayrıca asitlendirme gerekir.",
      ],
      "8,0 g NaOH; sodyum etanoat ve etanol",
      "CH₃COOC₂H₅+NaOH→CH₃COONa+C₂H₅OH atom ve yük bakımından kapanır.",
      "Bazik ürüne doğrudan etanoik asit yazmak.",
    ),
    e024(
      "İki ayrı oksijen etiketini karşılaştırmak",
      "A ve B adlı iki ayrı deneyde propanoik asit ile etanol standart Fischer yoluyla esterleşiyor; izotop değişimi yok. A’da yalnız asidin OH oksijeni, B’de yalnız etanolün oksijeni O* ile işaretli. Her deneyde işaret ester veya suyun neresinde beklenir?",
      "Asit OH’sinin ayrılma yolunu ve alkol O–C₂H₅ bağının korunmasını iki deneyde ayrı izle.",
      [
        "A’da CH₃CH₂C(=O)–O*H asidinin OH oksijeni ayrılan suyun O’sunda, H₂O* olarak izlenir; ester O’ları işaretsizdir.",
        "B’de H–O*–C₂H₅ alkolünün O’su CH₃CH₂C(=O)–O*–C₂H₅ ester köprüsünde kalır; suyun O’su işaretsizdir.",
        "Her ayrı deneyde bir O etiketi korunur. A’daki asit OH O’su ile B’deki alkol O’su farklı yollara gider; karbonil O’su ikisinde de işaretsizdir.",
      ],
      "A: suyun O’su; B: esterin tek bağlı köprü O’su",
      "Sonuçlar standart yol ve izotop değişimi yok varsayımına aittir; iki deneyin etiketleri aynı kapta karıştırılmamıştır.",
      "Asit OH oksijeniyle alkol oksijeninin net esterleşmede zorunlu aynı ürüne gittiğini sanmak.",
    ),
    e024(
      "Yağda üç bağ üç baz",
      "0,12 mol triolein, üç ester bağı tamamen açılacak biçimde KOH ile sabunlaşıyor. KOH, gliserol ve potasyum oleat miktarları nedir?",
      "Bir trigliseritte üç ester bağı bulunduğunu oranlara çevir.",
      [
        "Bir mol triolein üç mol KOH tüketir.",
        "0,12×3=0,36 mol KOH tüketilir ve 0,36 mol potasyum oleat oluşur.",
        "Gliserol iskeleti molekül başına bir olduğundan 0,12 mol gliserol çıkar.",
      ],
      "0,36 mol KOH; 0,12 mol gliserol; 0,36 mol sabun",
      "C zinciri çift bağları bu hidrolizde tüketilmez; kopan bağlar ester çevresindedir.",
      "Gliserolde üç OH var diye üç gliserol molekülü oluştuğunu sanmak.",
    ),
  ],
  recall: [
    {
      prompt: "Ester adında ilk bölüm hangi başlangıçtan gelir?",
      answer:
        "Alkolden gelen alkil adı önce; asitten gelen alkanoat sonra yazılır.",
    },
    {
      prompt:
        "Asidik ve bazik hidrolizin doğrudan karboksilik ürünleri nasıl ayrılır?",
      answer:
        "Asidik hidroliz RCOOH; bazik hidroliz RCOO⁻ tuzu verir. Serbest asit için ek asitlendirme gerekebilir.",
    },
    {
      prompt: "Standart Fischer atom takibinde alkol O’su nerede kalır?",
      answer:
        "Değişim yok varsayımıyla esterin tek bağlı köprü O’sunda; uzun süreli izotop değişimi ayrı tutulur.",
    },
    {
      prompt: "Katalizör aynı sıcaklıkta denge sabitini büyütür mü?",
      answer:
        "Hayır; dengeye ulaşmayı hızlandırır, denge sabitini tek başına değiştirmez.",
    },
    {
      prompt: "Bir mol trigliseridin tam bazik hidroliz oranları?",
      answer:
        "Üç mol baz tüketimi; bir mol gliserol ve üç mol yağ asidi tuzu oluşumu.",
    },
  ],
  items: [],
};
esterPack024.items = [
  q024(
    "Aşağıdaki yapılardan hangisi basit bir karboksilik asit esteridir?",
    "Ester bağlantısı R–C(=O)–O–R′’dir.",
    "Karbonil ile ona tek bağlı O’nun öbür C komşusunu birlikte ara.",
    [
      "CH₃COOCH₃’te karbonil C, tek O üzerinden metile bağlıdır.",
      "Yapıda COOH yerine COOR bağlantısı vardır.",
      "Bu nedenle metil etanoat basit esterdir.",
    ],
    [
      ["CH₃COOCH₃", "Karbonil ve O–C köprüsü ester çevresini tamamlar."],
      ["CH₃COOH", "Tek O’nun diğer komşusu H olduğundan asittir."],
      ["CH₃OCH₃", "Karbonilsiz eter bağlantısıdır."],
      ["CH₃CHO", "Karbonil C’ye H bağlı aldehittir."],
      ["CH₃CH₂OH", "Doymuş C’ye OH bağlı alkoldür."],
    ],
    "Eter ve ester ad benzerliğinden karbonil farkını atlamak.",
    "Doğru yapıda iki O ve bir C=O bulunur; O–H yoktur.",
  ),
  q024(
    "CH₃CH₂COOCH₃ esterinin adı hangisidir?",
    "Önce alkol kökenli alkil, sonra asit kökenli alkanoat okunur.",
    "O’nun alkil tarafını ve karbonil tarafını ayrı adlandır.",
    [
      "Tek bağlı O’nun sağında CH₃ olduğundan alkil metildir.",
      "Asit tarafı CH₃CH₂CO– ile üç C’li propanoattır.",
      "Ad metil propanoattır.",
    ],
    [
      [
        "Metil propanoat",
        "Metil alkol tarafını ve üç C’li asit tarafını korur.",
      ],
      ["Etil etanoat", "Karbonları 2+2 bölüştüren farklı ester bağlantısıdır."],
      ["Propil metanoat", "Asit/alkol parçalarını 1+3 biçimine çevirir."],
      ["Metil etanoat", "Asit zincirini bir C eksik sayar."],
      ["Bütanoik asit", "Aynı formül olabilse de COOH bağlantısını uydurur."],
    ],
    "Esterin toplam dört C’sini doğrudan tek parça asit adına çevirmek.",
    "Asit3+alkol1=toplam4 C; iki ad parçası ayrı kökenleri gösterir.",
  ),
  q024(
    "Etanoik asit ile propan-1-ol uygun esterleşmede tepkimeye giriyor. Oluşan ester hangisidir?",
    "Esterin alkil kısmı alkolden, alkanoat kısmı asitten gelir.",
    "Propanolün propilini etanoat grubunun O’suna bağla.",
    [
      "Etanoik asit CH₃CO– tarafını sağlar.",
      "Propan-1-ol –CH₂CH₂CH₃ alkil tarafını sağlar.",
      "Ürün CH₃COOCH₂CH₂CH₃, propil etanoattır.",
    ],
    [
      [
        "Propil etanoat",
        "Üç C’li alkol ve iki C’li asit parçalarını doğru birleştirir.",
      ],
      ["Etil propanoat", "İki başlangıcın C bölüşümünü ters değiştirir."],
      [
        "Metil bütanoat",
        "Verilmemiş metanol ve bütanoik asit parçaları gerektirir.",
      ],
      ["Propil eter", "Karbonili ve ikinci O’yu kaybeder."],
      ["Pentanoik asit", "Ester köprüsü yerine tek karboksil iskeleti kurar."],
    ],
    "Toplam C korunmasını yeterli sayıp parçaların bağlantısını denetlememek.",
    "C2+C3=C5; su ayrılması C sayısını değiştirmez.",
  ),
  q024(
    "Metil etanoat uygun asit katalizli koşulda tamamen hidroliz ediliyor. Karboksilik asit ve alkol çifti hangisidir?",
    "Asidik hidroliz asit ve alkol kökenli parçaları geri oluşturur.",
    "CH₃COOCH₃’ün karbonil tarafına OH, metoksi tarafına H tamamla.",
    [
      "CH₃CO– tarafı CH₃COOH’ye dönüşür.",
      "–OCH₃ tarafı CH₃OH’ye dönüşür.",
      "Ürünler etanoik asit ve metanoldür.",
    ],
    [
      [
        "Etanoik asit ve metanol",
        "İki C’li asit ve bir C’li alkol kökenini korur.",
      ],
      ["Metanoik asit ve etanol", "Karbon bölüşümünü 1+2’ye çevirir."],
      [
        "Propanoik asit ve su",
        "Alkol parçasını yok ederek C–O bağlantısını yanlış kurar.",
      ],
      [
        "Sodyum etanoat ve metanol",
        "Asidik koşulda olmayan NaOH ve Na⁺ ekler.",
      ],
      ["Etanal ve metan", "Hidrolizi indirgenme ve O kaybına dönüştürür."],
    ],
    "Esteri yalnız toplam formülünden hidroliz ederek bağlantı kökenini kaybetmek.",
    "C₃H₆O₂+H₂O→C₂H₄O₂+CH₄O; atomlar korunur.",
  ),
  q024(
    "Etil propanoat yeterli NaOH ile bazik hidroliz ediliyor; sonradan asitlendirme yoktur. Doğrudan ürünler hangisidir?",
    "Bazik ester hidrolizi karboksilat tuzu ve alkol verir.",
    "Propanoat tarafında Na⁺ karşı iyonunu, etil tarafında OH’yi tamamla.",
    [
      "Etil propanoat CH₃CH₂COOC₂H₅’tir.",
      "Bazik koşulda asit kökenli parça CH₃CH₂COO⁻Na⁺ olur.",
      "Alkol tarafı C₂H₅OH; ürünler sodyum propanoat ve etanoldür.",
    ],
    [
      [
        "Sodyum propanoat ve etanol",
        "Bazik karboksilat ürününü ve alkol kökenini korur.",
      ],
      ["Propanoik asit ve etanol", "Asitlendirme olmadan nötr asit yazar."],
      [
        "Sodyum etanoat ve 1-propanol",
        "Asit ve alkol C dağılımını ters çevirir.",
      ],
      [
        "Propanal ve dietil eter",
        "Hidroliz yerine başka redoks/ayrılma ürünleri uydurur.",
      ],
      [
        "Sodyum etoksit ve propan",
        "Karboksilatın iki O’sunu ve doğru alkolü korumaz.",
      ],
    ],
    "Asidik ve bazik hidrolizin organik asit ürünlerini aynı protonlanma hâlinde yazmak.",
    "Bir mol NaOH başına bir mol tuz oluşur; Na atomu ürün tarafında korunur.",
  ),
  q024(
    "0,90 mol etanoik asit ile 0,55 mol etanol için yalnız 1:1 esterleşme stokiyometrisi düşünülüyor. Esterin kuramsal mol üst sınırı nedir?",
    "İki tek işlevli reaktan 1:1 tüketilir; küçük stok üst sınırdır.",
    "Başlangıç mol/katsayı değerlerinin küçüğünü seç.",
    [
      "Asit ve alkol katsayıları birdir.",
      "Etanol 0,55 mol ile asitten önce tükenebilecek stoktur.",
      "Kuramsal üst sınır 0,55 mol esterdir; gerçek denge verimi ayrıca gerekir.",
    ],
    [
      ["0,55", "Küçük 1:1 reaktan stokunu sınır alır."],
      ["0,90", "Asidi esas alıp yetersiz etanolü göz ardı eder."],
      ["1,45", "Reaktan mollerini toplayıp ürün molü yapar."],
      ["0,35", "Stok farkını ürün miktarı sanır."],
      ["0,275", "Tek esterleşmede iki alkol gerektiğini yanlış varsayar."],
    ],
    "Denge bilgisi olmadan stokiyometrik üst sınırı kesin gerçekleşen ürün diye sunmak.",
    "0,55 mol dönüşümde 0,35 mol asit artar; ürünün bu üst sınıra ulaşması ayrıca varsayımdır.",
  ),
  q024(
    "0,80 mol asit ve 0,60 mol alkol esterleşmesinde ilerleme 0,25 mol verilmiştir; başlangıçta ester ve su yoktur. Son mol bileşimi hangisidir?",
    "Bir ilerleme birer mol asit/alkol tüketip birer mol ester/su oluşturur.",
    "İlerlemeyi reaktanlardan çıkar, ürünlere ekle.",
    [
      "Asit 0,80−0,25=0,55 mol kalır.",
      "Alkol 0,60−0,25=0,35 mol kalır.",
      "Ester ve su ayrı ayrı 0,25 mol oluşur.",
    ],
    [
      [
        "Asit 0,55; alkol 0,35; ester 0,25; su 0,25 mol",
        "Dört türün 1:1 ilerleme bilançosunu korur.",
      ],
      [
        "Asit 0,30; alkol 0,10; ester 0,50; su 0,50 mol",
        "Verilen ilerlemeyi ikiye katlar.",
      ],
      [
        "Asit 0,55; alkol 0,60; ester 0,25; su 0,25 mol",
        "Ester oluşurken alkol tüketimini unutur.",
      ],
      [
        "Asit 0,80; alkol 0,35; ester 0,25; su 0,25 mol",
        "Asit tüketimini atlar.",
      ],
      [
        "Asit 0,55; alkol 0,35; ester 0,50; su 0 mol",
        "Ürünleri ve ayrılan suyu yanlış dağıtır.",
      ],
    ],
    "Bir mol ester oluşumu için yalnız tek reaktanın tüketildiğini düşünmek.",
    "0,25 mol ilerleme 0,60 mol küçük stoktan azdır; tüm miktarlar negatife düşmeden kalır.",
  ),
  q024(
    "Esterleşme dengesi için aynı sıcaklıkta uygun katalizör eklenmesi en doğru hangi etkiyle açıklanır?",
    "Katalizör denge sabitini değiştirmeden dengeye ulaşmayı hızlandırır.",
    "Hız etkisini denge bileşimi etkisinden ayır.",
    [
      "Katalizör uygun daha düşük etkinleşme yollara olanak verir.",
      "Aynı sıcaklıkta denge sabiti tepkimenin termodinamik özelliği olarak kalır.",
      "Bu yüzden dengeye daha hızlı ulaşılır; katalizör tek başına daha büyük K garantisi vermez.",
    ],
    [
      [
        "Dengeye ulaşmayı hızlandırır; K’yı tek başına değiştirmez",
        "Hız ve denge sabitini doğru ayırır.",
      ],
      [
        "Yalnız ileri yönü hızlandırır ve K’yı büyütür",
        "Katalizin ters yönü ve dengeyi ilgilendiren sınırını bozar.",
      ],
      [
        "Alkolü tüketilen katalizöre dönüştürür",
        "Katalizör ile reaktan rolünü karıştırır.",
      ],
      [
        "Atom sayısını artırarak ester üretir",
        "Katalizden atom yaratıldığı sonucu çıkarır.",
      ],
      [
        "Tepkimeyi bütün sıcaklıklarda zorunlu %100 ürün yapar",
        "Katalizöre koşulsuz tam verim atar.",
      ],
    ],
    "Daha hızlı ürün oluşumunu daha büyük denge sabitiyle eşitlemek.",
    "Aynı başlangıç ve sıcaklık için katalizör dengeye varış süresini etkiler; K sıcaklığa bağlıdır.",
  ),
  q024(
    "Asit+alkol ⇌ ester+su dengesi kurulurken, koşullar uygun şekilde korunarak su uzaklaştırılıyor. Denge eğilimi nasıl değişir?",
    "Bir ürünün uzaklaştırılması o ürünü yeniden oluşturan yönü destekleyebilir.",
    "Suyun denklemin hangi tarafında bulunduğunu belirle.",
    [
      "Su esterleşme denkleminin ürün tarafındadır.",
      "Suyu azaltmak ürün tarafındaki eksilmeyi dengeleyen ileri dönüşümü destekler.",
      "Bu nedenle ester oluşumu yönü desteklenebilir; bu, katalizörün K’yı büyütmesi değildir.",
    ],
    [
      [
        "Ester oluşumu yönü desteklenebilir",
        "Ürün suyunun uzaklaştırılmasını doğru yönde yorumlar.",
      ],
      [
        "Yalnız hidroliz yönü desteklenir",
        "Su reaktanı gereken ters yönü yanlış destekler.",
      ],
      [
        "Karbon atomları suyla birlikte kaybolur",
        "Su karbon içermediği hâlde C kaybı varsayar.",
      ],
      [
        "Katalizörün mol kütlesi artar",
        "Denge kaymasıyla ilgisiz bir değişim ekler.",
      ],
      [
        "Bütün ester bağları zorunlu etere dönüşür",
        "Denge türlerini değiştiren temelsiz bağ dönüşümü uydurur.",
      ],
    ],
    "Suyu her tepkimede yalnız çözücü sayıp stokiyometrik ürün rolünü atlamak.",
    "Bu eğilim verilen denge için geçerlidir; gerçek miktar için K ve başlangıç verileri gerekir.",
  ),
  q024(
    "Standart Fischer yolu ve izotop değişimi yok varsayımı altında, O atomu işaretli metanol ile etanoik asit esterleşiyor. İşaretli O nerede beklenir?",
    "Standart atom takibinde alkol O’su esterin köprü O’sunda kalır.",
    "Metanolün O–CH₃ bağını ester bağlantısına taşı.",
    [
      "İşaretli metanol H–O*–CH₃ olarak yazılır.",
      "Ester CH₃C(=O)–O*–CH₃ bağlantısını kurar.",
      "İşaret tek bağlı köprü O’sundadır; karbonil O’suna taşınması bu basit yolun sonucu değildir.",
    ],
    [
      ["Esterin tek bağlı köprü O’sunda", "Alkolün O–CH₃ parçasını korur."],
      [
        "Yalnız karbonil O’sunda",
        "Asit karbonil O’suyla alkol O’sunu değiştirir.",
      ],
      [
        "Zorunlu yalnız suyun O’sunda",
        "Standart parça takibinde alkol O’sunu yanlış ayrılan suya atar.",
      ],
      [
        "Karbon atomuna dönüşmüş olarak",
        "İzotop etiketini element dönüşümü sanır.",
      ],
      ["Her durumda işaret tamamen yok olur", "Atom korunumunu siler."],
    ],
    "Basit atom takibini uzun süreli bütün izotop değişimleri için evrensel sonuç gibi sunmak.",
    "Varsayım izotop değişimi olmamasıdır; O elementi ve etiket sayısı korunur.",
  ),
  q024(
    "Açık zincirli doymuş en küçük karboksilik ester hangisidir?",
    "Ester için karbonil C’ye ek olarak O’ya bağlı bir organik C grubu gerekir.",
    "Asit ve alkol taraflarının en küçük C sayılarını birleştir.",
    [
      "En küçük asit tarafı HCO– ile bir C taşır.",
      "En küçük alkol tarafı –OCH₃ ile bir C daha taşır.",
      "HCOOCH₃ metil metanoat iki C’li en küçük esterdir.",
    ],
    [
      [
        "HCOOCH₃",
        "Bir karbonil C ve bir metil C ile en küçük ester bağlantısını kurar.",
      ],
      ["HCOOH", "En küçük asittir; O’nun öbür komşusu H’dir."],
      ["CH₃OH", "Tek O’lu alkoldür; karbonil içermez."],
      ["CH₃OCH₃", "İki C’li eterdir; ikinci O ve karbonil eksiktir."],
      ["HCHO", "Tek C’li aldehittir; ester köprüsü yoktur."],
    ],
    "Bir C’li asidin bir C’li ester izomeri olacağını varsaymak.",
    "Metil metanoat C₂H₄O₂’dir; metanoik asit CH₂O₂ ile aynı formülde değildir.",
  ),
  q024(
    "Propanoik asit ile etil metanoatın ortak formülü C₃H₆O₂ olarak verilmiştir. İlişkileri hangisidir?",
    "Asit ve ester farklı işlevsel bağlantılardır; formül eşitliği grup izomerliğini destekler.",
    "COOH ile COOR çevrelerini karşılaştır.",
    [
      "Propanoik asitte CH₃CH₂COOH bulunur.",
      "Etil metanoatta HCOOCH₂CH₃ bulunur.",
      "Aynı C3,H6,O2’ye karşı farklı asit/ester grupları işlevsel grup izomerliği verir.",
    ],
    [
      [
        "İşlevsel grup izomeridirler",
        "Molekül formülü aynı, asit/ester bağlantısı farklıdır.",
      ],
      ["Aynı maddenin iki adıdır", "COOH ile O–etil bağlantısını aynı sayar."],
      [
        "Birbirlerinin izotopudur",
        "Çekirdek farkı verilmediği hâlde izotopluk ekler.",
      ],
      [
        "Homologdurlar; bir CH₂ farkı vardır",
        "Verilmiş eşit formüllere aykırı bir C/H farkı üretir.",
      ],
      [
        "Yalnız cis-trans izomeridirler",
        "Geometrik izomerlik için gerekli uygun C=C çevresi verilmemiştir.",
      ],
    ],
    "İki O içeren her bileşiğin aynı işlevsel grupta olduğunu sanmak.",
    "Ester O–H vericisi taşımazken asit COOH taşır; fiziksel özellikleri de farklı olabilir.",
  ),
  q024(
    "0,45 mol etil metanoat yeterli suyla asidik koşulda tamamen hidroliz ediliyor. Oluşan metanoik asit ve etanol miktarları hangisidir?",
    "Tek ester bağı hidrolizinde birer mol asit ve alkol oluşur.",
    "Esterin 1:1:1 hidroliz katsayılarını uygula.",
    [
      "HCOOC₂H₅+H₂O→HCOOH+C₂H₅OH yazılır.",
      "Bir mol ester bir mol metanoik asit ve bir mol etanol verir.",
      "Her ürün 0,45 mol olur; tüketilen su da 0,45 moldür.",
    ],
    [
      [
        "0,45 mol asit ve 0,45 mol etanol",
        "İki ürünün birer katsayısını korur.",
      ],
      [
        "0,225 mol asit ve 0,225 mol etanol",
        "Bir esteri iki ürüne bölmek için katsayıları yanlış yarılar.",
      ],
      [
        "0,90 mol asit ve 0,90 mol etanol",
        "Ürün sayısı iki diye her ürün molünü ikiye katlar.",
      ],
      ["0,45 mol asit ve 0 mol etanol", "Alkol kökenli parçayı yok sayar."],
      [
        "0 mol asit ve 0,45 mol etanol",
        "Karbonil tarafını ürün bilançosundan çıkarır.",
      ],
    ],
    "Bir başlangıçtan iki ürün oluşmasını her ürünün yarım katsayısı varmış gibi yorumlamak.",
    "Toplam ürün molü 0,90’dır; su tüketimi nedeniyle bu, atom korunumu ihlali değildir.",
  ),
  q024(
    "0,35 mol tek ester bağlı bir bileşik yeterli KOH ile tam bazik hidroliz ediliyor. Tüketilen KOH kaç moldür?",
    "Bir ester bağının bazik hidrolizi bir OH⁻ eşdeğeri tüketir.",
    "Ester bağı molünü baz molüne 1:1 aktar.",
    [
      "Her molekül bir ester bağı taşır.",
      "Toplam 0,35 mol ester bağı vardır.",
      "KOH tüketimi 0,35 mol olur; birer mol eşdeğerde karboksilat ve alkol oluşur.",
    ],
    [
      ["0,35", "Tek ester bağı için bir baz eşdeğerini kullanır."],
      ["0,70", "İki O’yu iki baz eşdeğeri sayar."],
      ["1,05", "Trigliseridin üç bağ oranını tek estere taşır."],
      [
        "0,175",
        "Asidik hidroliz veya ürün sayısından yanlış yarım oran çıkarır.",
      ],
      ["0,00", "Bazı yalnız katalizör sayıp stokiyometrik tüketimini atlar."],
    ],
    "Fischer’in asit katalizörüyle bazik hidrolizde tüketilen OH⁻’yi aynı rolde görmek.",
    "KOH’deki K⁺ karboksilatın karşı iyonudur; bazın bir molü ürün tuzunda izlenir.",
  ),
  q024(
    "26,4 g etil etanoat yeterli NaOH ile tamamen hidroliz ediliyor. M(ester)=88 ve M(NaOH)=40 g/mol. NaOH tüketimi kaç gramdır?",
    "Tek ester bağı başına bir mol NaOH tüketilir.",
    "Ester kütlesini mol yapıp baz kütlesine dönüştür.",
    [
      "n(ester)=26,4/88=0,30 moldür.",
      "1:1 oranından n(NaOH)=0,30 mol gerekir.",
      "m(NaOH)=0,30×40=12,0 g olur.",
    ],
    [
      ["12,0", "0,30 mol bazın kütlesini doğru hesaplar."],
      ["26,4", "Katsayıların eşitliğini kütlelerin eşitliği sanır."],
      ["24,0", "Bir ester için iki NaOH alır."],
      ["36,0", "Trigliseridin üç baz katsayısını kullanır."],
      ["6,0", "1:1 oranını gerekçesiz yarıya indirir."],
    ],
    "Mol oranı eşit iki maddenin gramlarını mol kütlesinden bağımsız eşitlemek.",
    "12/40=26,4/88=0,30 mol; eşit olan kütle değil moldür.",
  ),
  q024(
    "Gliserolün üç OH’si üç tek karboksilli yağ asidiyle tamamen esterleşiyor. Bir mol gliserol başına oluşan ester bağı ve su sayısı mol olarak hangisidir?",
    "Bir ester bağı oluşumu bir alkol OH’si ve bir COOH ile bir su çıkarır.",
    "Gliserolün üç ayrı OH’sini üç esterleşme olayına çevir.",
    [
      "Bir gliserol üç alkol OH’si taşır.",
      "Tam esterleşmede üç yağ asidi üç ester bağı kurar.",
      "Üç bağ kurulması üç mol su oluşturur.",
    ],
    [
      ["3 mol ester bağı; 3 mol su", "Üç OH’nin üç ayrı esterleşmesini sayar."],
      [
        "1 mol ester bağı; 1 mol su",
        "Gliserol molekülü sayısını işlevsel grup sayısı yerine kullanır.",
      ],
      [
        "3 mol ester bağı; 1 mol su",
        "Her bağ başına bir su denkliğini bozmuştur.",
      ],
      [
        "1 mol ester bağı; 3 mol su",
        "Su sayısıyla oluşan bağ sayısını tutarsız verir.",
      ],
      [
        "0 mol ester bağı; 3 mol H₂",
        "Esterleşmeyi aktif metalle H₂ oluşumuna çevirir.",
      ],
    ],
    "Üç OH’nin tek molekülde olmasını tek ester bağı oluşması sanmak.",
    "Gliserol+3RCOOH→trigliserit+3H₂O toplam atom bilançosunu verir.",
  ),
  q024(
    "0,20 mol tripalmitin, üç ester bağı tamamen açılacak biçimde NaOH ile sabunlaşıyor. Gliserol ve sabun miktarları hangisidir?",
    "Bir trigliserit bir gliserol iskeleti ve üç yağ asidi parçası içerir.",
    "1:1:3 yağ–gliserol–sabun oranını uygula.",
    [
      "Bir mol tripalmitin bir mol gliserol verir.",
      "Üç ester bağı üç mol sodyum palmitat oluşturur.",
      "0,20 mol yağdan 0,20 mol gliserol ve 0,60 mol sabun çıkar.",
    ],
    [
      [
        "0,20 mol gliserol; 0,60 mol sabun",
        "Bir gliserol ve üç asit parçasını doğru sayar.",
      ],
      [
        "0,60 mol gliserol; 0,20 mol sabun",
        "İskelet ve yan parça oranlarını ters çevirir.",
      ],
      [
        "0,20 mol gliserol; 0,20 mol sabun",
        "Üç ester bağından ikisini saymaz.",
      ],
      [
        "0,60 mol gliserol; 0,60 mol sabun",
        "Her ester bağından yeni bir gliserol doğduğunu varsayar.",
      ],
      [
        "0,10 mol gliserol; 0,30 mol sabun",
        "Yağın molünü gerekçesiz yarıya indirir.",
      ],
    ],
    "Yağın üç ester bağını üç ayrı gliserol molekülü sanmak.",
    "Baz tüketimi 0,60 mol NaOH’dır; sabun bir ester değil sodyum palmitat tuzudur.",
  ),
  q024(
    "Bir trigliseridin gliserol omurgasındaki uç CH₂ ile yağ asidi parçası arasındaki doğru bağlantı hangisidir?",
    "Gliserolün O’su ester köprüsünde CH₂ ile karbonil C arasında bulunur.",
    "Başlangıç gliserol C–O bağını esterleşmede koru.",
    [
      "Gliserol uç grubu CH₂–OH’tir.",
      "Esterleşmede O, yağ asidinin karbonil C’sine bağlanır.",
      "Doğru parça CH₂–O–C(=O)–R olur.",
    ],
    [
      [
        "CH₂–O–C(=O)–R",
        "Gliserol C–O ve ester O–karbonil C bağlantılarını korur.",
      ],
      [
        "CH₂–C(=O)–O–R",
        "Gliserol C’sini doğrudan karbonile bağlayarak O sırasını değiştirir.",
      ],
      ["CH₂–O–O–R", "Karbonili yok sayıp peroksit bağlantısı kurar."],
      ["CH₂–C(=O)–R", "Ester köprüsündeki O’yu çıkarır."],
      ["CH₂–O⁻Na⁺", "Ester yerine gliserol alkolatını gösterir."],
    ],
    "Yarı açık kaynak çiziminde COO dizisini her yönde aynı bağlantı sanmak.",
    "Karbonil ve gliserol C’si doğrudan C–C bağlı değildir; arada O vardır.",
  ),
  q024(
    "Saf, yalnız ester grubu taşıyan etil etanoatın hidrojen bağı davranışı için hangisi doğrudur?",
    "Tek işlevli basit esterde O–H/N–H vericisi yok; O atomları alıcı olabilir.",
    "Verici H ile O’daki alıcı elektron çiftini ayrı değerlendir.",
    [
      "Etil etanoat O–H bağı taşımaz.",
      "Kendi arasında klasik O–H···O bağı kuramaz.",
      "Suyla uygun etkileşimde O üzerinden hidrojen bağı kabul edebilir.",
    ],
    [
      [
        "Kendi arası O–H bağı veremez; sudan H bağı kabul edebilir",
        "Vericilik yokluğu ile alıcılığı doğru ayırır.",
      ],
      [
        "İki O içerdiği için iki O–H vericisi vardır",
        "O atomu sayısını O’ya bağlı H sayısı sanır.",
      ],
      [
        "Hiçbir moleküller arası etkileşim göstermez",
        "London ve dipol etkileşimlerini yok sayar.",
      ],
      [
        "Suyla H bağı kurarsa zorunlu hidroliz olmuştur",
        "Moleküller arası etkileşimi kovalent dönüşümle eşitler.",
      ],
      [
        "Her ester ek OH taşısa da verici olamaz",
        "Başka yerdeki OH’nin davranışını sınıf adıyla siler.",
      ],
    ],
    "Yalnız ester grubu için söylenen sınırı bütün çok işlevli moleküllere taşımak.",
    "İfade yalnız verilen tek işlevli ester içindir; bir hidroksi ester ayrıca O–H taşıyabilir.",
  ),
  q024(
    "Mum, trigliserit ve sabun karşılaştırmasında doğru ifade hangisidir?",
    "Mumlar ve trigliseritler ester bağlantıları taşıyabilir; sabun yağ asidi tuzudur.",
    "Her malzemenin bağlantısını ester COOR veya karboksilat COO⁻ olarak ayır.",
    [
      "Trigliseritte gliserolün üç ester bağlantısı vardır.",
      "Mumlarda uzun zincirli asit–alkol esterleri önemli yer tutar.",
      "Sabun ise karboksilat tuzudur; ester sınıfına doğrudan alınmaz.",
    ],
    [
      [
        "Mum ve trigliserit ester; sabun karboksilat tuzu örneğidir",
        "Üç başlangıç/ürün sınıfını bağlantıya göre ayırır.",
      ],
      [
        "Üçü de tek bir saf ester molekülüdür",
        "Karışım olasılığını ve sabunun iyonik tuz yapısını siler.",
      ],
      [
        "Sabun esterdir; trigliserit yalnız alkoldür",
        "Başlangıç ve ürün gruplarını ters çevirir.",
      ],
      ["Mumların hiçbirinde O bulunmaz", "Ester bağındaki iki O’yu yok sayar."],
      [
        "Bütün doğal kokular tek bir esterle açıklanır",
        "Karmaşık koku bileşimini temelsiz tek moleküle indirger.",
      ],
    ],
    "Kaynak kullanım listesindeki sabun sözcüğünden sabun molekülünü ester sanmak.",
    "Bir maddenin esterlerden üretilmesi, son tuz ürününün ester olduğu anlamına gelmez.",
  ),
];
const packs024: Pack024[] = [
  alcoholPack024,
  etherPack024,
  carbonylPack024,
  acidPack024,
  esterPack024,
];
const source024 =
  "MEBİ AYT Kimya, OGM Organik Bileşikler ve Dersler Cepte hedef öğretim bölümleri karşılaştırılarak yazılmış özgün anlatım, model, çözümlü örnek ve sorular. Resmî sınav sorusu değildir.";
function shuffle024<T>(values: T[], seed: number) {
  const out = [...values];
  let n = seed >>> 0;
  for (let i = out.length - 1; i > 0; i--) {
    n = (Math.imul(n, 1664525) + 1013904223) >>> 0;
    const j = n % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
function remap024(q: Item024, target: number, seed: number): Item024 {
  const distractors = shuffle024([1, 2, 3, 4], seed),
    order = [...distractors];
  order.splice(target, 0, 0);
  return {
    ...q,
    answer: target,
    options: order.map((i) => q.options[i]),
    guidance: {
      ...q.guidance,
      optionReasons: order.map((i) => q.guidance.optionReasons[i]),
    },
  };
}
export const forge024ChemistryTopics: Record<string, string> =
  Object.fromEntries(packs024.map((p) => [p.id, p.topic]));
export const forge024ChemistryGuides: LessonGuide[] = packs024.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
  source: source024,
}));
export const forge024ChemistryLessons: Lesson[] = packs024.map((p, group) => {
  const targets = shuffle024(
    Array.from({ length: p.items.length }, (_, i) => i % 5),
    4199 + group * 991,
  );
  return {
    id: p.id,
    subjectId: "ayt-kimya",
    title: txt(p.title),
    minutes: p.minutes,
    objectives: p.objectives.map(txt),
    body: p.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    source: txt(source024),
    tags: [p.topic, "Özgün öğretim soruları"],
    questions: p.items.map((raw, i) => {
      const q = remap024(raw, targets[i], (group + 1) * 4177 + i * 73);
      return {
        id: `f024c-${p.id}-${i + 1}`,
        prompt: txt(q.prompt),
        options: q.options.map(txt),
        answer: q.answer,
        hint: txt(q.hint),
        explanation: txt(q.explanation),
        guidance: q.guidance,
        skill: p.id,
      };
    }),
  };
});
