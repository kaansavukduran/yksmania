import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";
import type { QuestionGuidance } from "../domain/questionHelpModel";

export type Atom023 = {
  element: "C" | "O" | "N" | "Br" | "Cl";
  x: number;
  y: number;
  aromatic?: boolean;
  charge?: number;
};
export type Bond023 = {
  a: number;
  b: number;
  order: number;
  aromatic?: boolean;
};
export type Structure023 = { atoms: Atom023[]; bonds: Bond023[] };
const integer023 = (v: number, min: number, max: number) => {
  if (!Number.isSafeInteger(v) || v < min || v > max)
    throw new RangeError("CHEM023_INTEGER_SCOPE");
};
function own023<T extends object>(o: T, key: string): keyof T {
  if (!Object.hasOwn(o, key)) throw new RangeError("CHEM023_CHOICE");
  return key as keyof T;
}
const atom023 = (
  element: Atom023["element"],
  x: number,
  y: number,
  aromatic = false,
): Atom023 => ({ element, x, y, ...(aromatic ? { aromatic } : {}) });
const bond023 = (a: number, b: number, order = 1): Bond023 => ({ a, b, order });
const carbon023 = (
  points: [number, number][],
  bonds: Bond023[],
): Structure023 => ({
  atoms: points.map(([x, y]) => atom023("C", x, y)),
  bonds,
});
const copy023 = (s: Structure023): Structure023 => ({
  atoms: s.atoms.map((a) => ({ ...a })),
  bonds: s.bonds.map((b) => ({ ...b })),
});
export function structure023(structure: Structure023) {
  const { atoms, bonds } = structure;
  if (
    !atoms.length ||
    atoms.length > 40 ||
    !atoms.every(
      (a) =>
        [a.x, a.y].every(Number.isFinite) &&
        ["C", "O", "N", "Br", "Cl"].includes(a.element) &&
        (a.aromatic === undefined || typeof a.aromatic === "boolean") &&
        (!a.aromatic || a.element === "C") &&
        (a.charge === undefined ||
          a.charge === 0 ||
          (a.element === "N" && a.charge === 1) ||
          (a.element === "O" && a.charge === -1)),
    )
  )
    throw new RangeError("CHEM023_STRUCTURE");
  const adjacency = atoms.map(() => [] as { atom: number; order: number }[]),
    seen = new Set<string>();
  for (const b of bonds) {
    integer023(b.a, 0, atoms.length - 1);
    integer023(b.b, 0, atoms.length - 1);
    if (b.a === b.b || ![1, 1.5, 2, 3].includes(b.order))
      throw new RangeError("CHEM023_BOND");
    const length = Math.hypot(
      atoms[b.a].x - atoms[b.b].x,
      atoms[b.a].y - atoms[b.b].y,
    );
    if (!Number.isFinite(length) || length <= 0)
      throw new RangeError("CHEM023_BOND_GEOMETRY");
    if (b.aromatic !== undefined && typeof b.aromatic !== "boolean")
      throw new RangeError("CHEM023_AROMATIC_BOND");
    if (
      (b.order === 1.5) !== Boolean(b.aromatic) ||
      (b.aromatic && (!atoms[b.a].aromatic || !atoms[b.b].aromatic))
    )
      throw new RangeError("CHEM023_AROMATIC_BOND");
    const key = [b.a, b.b].sort((a, c) => a - c).join(":");
    if (seen.has(key)) throw new RangeError("CHEM023_DUPLICATE_BOND");
    seen.add(key);
    adjacency[b.a].push({ atom: b.b, order: b.order });
    adjacency[b.b].push({ atom: b.a, order: b.order });
  }
  const hydrogens = atoms.map((a, i) => {
    const total = adjacency[i].reduce((n, b) => n + b.order, 0);
    const valence =
      a.element === "C"
        ? 4
        : a.element === "N"
          ? a.charge === 1
            ? 4
            : 3
          : a.element === "O"
            ? a.charge === -1
              ? 1
              : 2
            : 1;
    const h = a.aromatic ? 3 - adjacency[i].length : valence - total;
    if (!Number.isInteger(h) || h < 0) throw new RangeError("CHEM023_VALENCE");
    return h;
  });
  const counts: Record<string, number> = {
    H: hydrogens.reduce((a, b) => a + b, 0),
  };
  for (const a of atoms) counts[a.element] = (counts[a.element] || 0) + 1;
  const formula = [
    "C",
    "H",
    ...Object.keys(counts)
      .filter((k) => !["C", "H"].includes(k))
      .sort(),
  ]
    .filter((k) => counts[k])
    .map((k) => k + (counts[k] === 1 ? "" : counts[k]))
    .join("");
  const c = counts.C || 0,
    h = counts.H || 0,
    halogens = (counts.Cl || 0) + (counts.Br || 0),
    degree = (2 * c + 2 + (counts.N || 0) - h - halogens) / 2;
  const visited = new Set<number>();
  let components = 0;
  for (let i = 0; i < atoms.length; i++)
    if (!visited.has(i)) {
      components++;
      const stack = [i];
      while (stack.length) {
        const v = stack.pop()!;
        if (visited.has(v)) continue;
        visited.add(v);
        for (const n of adjacency[v]) stack.push(n.atom);
      }
    }
  if (components !== 1) throw new RangeError("CHEM023_DISCONNECTED_STRUCTURE");
  return {
    atoms,
    bonds,
    adjacency,
    hydrogens,
    counts,
    formula,
    sigma: bonds.length + counts.H,
    pi: bonds.reduce((s, b) => s + b.order - 1, 0),
    rings: bonds.length - atoms.length + components,
    degree,
  };
}
export const isomerChoices023 = {
  cyclopropane: "Siklopropan",
  propene: "Propen",
  cyclobutane: "Siklobütan",
  but1: "1-Büten",
  but2: "2-Büten",
  methylpropene: "2-Metilpropen",
  methylcyclopropane: "Metil siklopropan",
  cyclopentane: "Siklopentan",
  pent1: "1-Penten",
  cyclohexane: "Siklohekzan",
  hex1: "1-Heksen",
} as const;
function ring023(n: number, radius = 72): Structure023 {
  return carbon023(
    Array.from({ length: n }, (_, i) => [
      160 + radius * Math.cos(-Math.PI / 2 + (i * 2 * Math.PI) / n),
      165 + radius * Math.sin(-Math.PI / 2 + (i * 2 * Math.PI) / n),
    ]),
    Array.from({ length: n }, (_, i) => bond023(i, (i + 1) % n)),
  );
}
function chain023(n: number, order = 1, position = 0): Structure023 {
  return carbon023(
    Array.from({ length: n }, (_, i) => [
      40 + (i * 240) / (n - 1),
      150 + (i % 2 ? 24 : -24),
    ]),
    Array.from({ length: n - 1 }, (_, i) =>
      bond023(i, i + 1, i === position ? order : 1),
    ),
  );
}
export function isomer023(kind: string) {
  const key = own023(isomerChoices023, kind);
  let s: Structure023;
  if (key.startsWith("cyclo"))
    s = ring023(
      key === "cyclopropane"
        ? 3
        : key === "cyclobutane"
          ? 4
          : key === "cyclopentane"
            ? 5
            : 6,
    );
  else if (key === "methylcyclopropane") {
    s = ring023(3);
    s.atoms.push(atom023("C", 160, 35));
    s.bonds.push(bond023(0, 3));
  } else if (key === "methylpropene")
    s = carbon023(
      [
        [65, 155],
        [155, 155],
        [240, 75],
        [240, 235],
      ],
      [bond023(0, 1, 2), bond023(1, 2), bond023(1, 3)],
    );
  else
    s = chain023(
      key === "propene" ? 3 : key === "pent1" ? 5 : key === "hex1" ? 6 : 4,
      2,
      key === "but2" ? 1 : 0,
    );
  return {
    key,
    label: isomerChoices023[key],
    ...structure023(s),
    saturated: s.bonds.every((b) => b.order === 1),
  };
}
export function compareIsomers023(a: string, b: string) {
  const first = isomer023(a),
    second = isomer023(b);
  const same = first.key === second.key,
    formulaMatches = first.formula === second.formula;
  const relationship = same
    ? "Aynı yapı"
    : !formulaMatches
      ? "İzomer değil"
      : first.rings !== second.rings
        ? "Zincir–halka"
        : first.key === "methylpropene" ||
            second.key === "methylpropene" ||
            first.key === "methylcyclopropane" ||
            second.key === "methylcyclopropane"
          ? "İskelet"
          : "Konum";
  return { first, second, formulaMatches, same, relationship };
}
export const alkeneChoices023 = {
  ethene: "Eten",
  propene: "Propen",
  but2: "2-Büten",
  methylpropene: "2-Metilpropen",
} as const;
export const alkeneReactions023 = {
  none: "Yapı",
  hydrogen: "H₂ katılması",
  bromine: "Br₂ katılması",
  hcl: "HCl katılması",
  water: "Su katılması",
} as const;
export function alkene023(
  kind: string,
  reaction: string,
  stage: number,
  trans: boolean,
) {
  const key = own023(alkeneChoices023, kind),
    rx = own023(alkeneReactions023, reaction);
  integer023(stage, 0, 2);
  if (typeof trans !== "boolean") throw new RangeError("CHEM023_BOOLEAN");
  let s: Structure023, left: number, right: number;
  if (key === "but2") {
    s = carbon023(
      [
        [45, 60],
        [115, 155],
        [205, 155],
        [275, trans ? 250 : 60],
      ],
      [bond023(0, 1), bond023(1, 2, 2), bond023(2, 3)],
    );
    left = 1;
    right = 2;
  } else if (key === "methylpropene") {
    s = carbon023(
      [
        [90, 155],
        [185, 155],
        [265, 65],
        [265, 245],
      ],
      [bond023(0, 1, 2), bond023(1, 2), bond023(1, 3)],
    );
    left = 0;
    right = 1;
  } else if (key === "propene") {
    s = carbon023(
      [
        [45, 65],
        [115, 155],
        [210, 155],
      ],
      [bond023(0, 1), bond023(1, 2, 2)],
    );
    left = 1;
    right = 2;
  } else {
    s = carbon023(
      [
        [110, 155],
        [210, 155],
      ],
      [bond023(0, 1, 2)],
    );
    left = 0;
    right = 1;
  }
  const before = structure023(copy023(s));
  const added = rx !== "none" && stage === 2;
  if (added) {
    s.bonds.find((b) => b.order === 2)!.order = 1;
    const add = (element: Atom023["element"], target: number, y: number) => {
      s.atoms.push(atom023(element, s.atoms[target].x, y));
      s.bonds.push(bond023(target, s.atoms.length - 1));
    };
    if (rx === "bromine") {
      add("Br", left, 265);
      add("Br", right, 50);
    }
    if (rx === "hcl" || rx === "water") {
      // Restricted ordinary ionic addition; choose the carbon that initially has fewer hydrogens.
      const target =
        before.hydrogens[left] <= before.hydrogens[right] ? left : right;
      add(rx === "hcl" ? "Cl" : "O", target, target === left ? 270 : 40);
    }
  }
  const productNames = {
    ethene: {
      hydrogen: "Etan",
      bromine: "1,2-Dibromoetan",
      hcl: "Kloroetan",
      water: "Etanol",
    },
    propene: {
      hydrogen: "Propan",
      bromine: "1,2-Dibromopropan",
      hcl: "2-Kloropropan",
      water: "2-Propanol",
    },
    but2: {
      hydrogen: "Bütan",
      bromine: "2,3-Dibromobütan",
      hcl: "2-Klorobütan",
      water: "2-Bütanol",
    },
    methylpropene: {
      hydrogen: "2-Metilpropan",
      bromine: "1,2-Dibromo-2-metilpropan",
      hcl: "2-Kloro-2-metilpropan",
      water: "2-Metil-2-propanol",
    },
  };
  const product = rx === "none" ? alkeneChoices023[key] : productNames[key][rx];
  return {
    key,
    reaction: rx,
    stage,
    before,
    ...structure023(s),
    added,
    left,
    right,
    geometric: key === "but2",
    configuration:
      key === "but2" ? (trans ? "trans" : "cis") : "cis–trans çifti yok",
    name: added ? product : alkeneChoices023[key],
    product,
  };
}
export function polymer023(kind: "ethene" | "vinyl" | "teflon", units: number) {
  if (!["ethene", "vinyl", "teflon"].includes(kind))
    throw new RangeError("CHEM023_POLYMER");
  integer023(units, 1, 4);
  const monomer =
    kind === "ethene" ? "CH2=CH2" : kind === "vinyl" ? "CH2=CHCl" : "CF2=CF2";
  return {
    kind,
    units,
    monomer,
    name: kind === "ethene" ? "Polietilen" : kind === "vinyl" ? "PVC" : "PTFE",
    repeat:
      kind === "ethene"
        ? "–CH2–CH2–"
        : kind === "vinyl"
          ? "–CH2–CHCl–"
          : "–CF2–CF2–",
    counts:
      kind === "ethene"
        ? { C: 2 * units, H: 4 * units, Cl: 0, F: 0 }
        : kind === "vinyl"
          ? { C: 2 * units, H: 3 * units, Cl: units, F: 0 }
          : { C: 2 * units, H: 0, Cl: 0, F: 4 * units },
    newLinks: units - 1,
  };
}
export const alkyneChoices023 = {
  ethyne: "Etin",
  propyne: "Propin",
  but2: "2-Bütin",
} as const;
export const alkyneReactions023 = {
  hydrogen: "H₂ katılması",
  bromine: "Br₂ katılması",
  water: "Su katılması",
} as const;
export function alkyne023(kind: string, reaction: string, stage: number) {
  const key = own023(alkyneChoices023, kind),
    rx = own023(alkyneReactions023, reaction);
  integer023(stage, 0, 2);
  const n = key === "ethyne" ? 2 : key === "propyne" ? 3 : 4,
    position = key === "but2" ? 1 : 0;
  const s = chain023(n, 3, position),
    left = position,
    right = position + 1;
  for (const a of s.atoms) a.y = 155;
  const before = structure023(copy023(s));
  const sites = [left, right].filter((i) => before.hydrogens[i] > 0).length;
  let name: string = alkyneChoices023[key];
  if (stage > 0) {
    const link = s.bonds.find((b) => b.order === 3)!;
    if (rx === "water") {
      link.order = stage === 1 ? 2 : 1;
      const target =
        key === "ethyne" ? right : key === "propyne" ? right : left;
      s.atoms.push(atom023("O", s.atoms[target].x, 50));
      s.bonds.push(bond023(target, s.atoms.length - 1, stage === 1 ? 1 : 2));
      name =
        stage === 1
          ? "Enol"
          : key === "ethyne"
            ? "Etanal"
            : key === "propyne"
              ? "Propanon"
              : "2-Bütanon";
    } else {
      link.order = 3 - stage;
      if (rx === "bromine")
        for (let step = 0; step < stage; step++)
          for (const target of [left, right]) {
            s.atoms.push(
              atom023("Br", s.atoms[target].x, step === 0 ? 45 : 265),
            );
            s.bonds.push(bond023(target, s.atoms.length - 1));
          }
      name =
        rx === "hydrogen"
          ? stage === 1
            ? key === "ethyne"
              ? "Eten"
              : key === "propyne"
                ? "Propen"
                : "2-Büten"
            : key === "ethyne"
              ? "Etan"
              : key === "propyne"
                ? "Propan"
                : "Bütan"
          : stage === 1
            ? "Dibromoalken"
            : "Tetrabromoalkan";
    }
  }
  return {
    key,
    reaction: rx,
    stage,
    left,
    right,
    before,
    ...structure023(s),
    terminal: sites > 0,
    replaceableHydrogens: sites,
    reagentMol: rx === "water" ? (stage > 0 ? 1 : 0) : stage,
    name,
  };
}
export const areneChoices023 = {
  benzene: "Benzen",
  toluene: "Toluen",
  phenol: "Fenol",
  aniline: "Anilin",
  xylene: "Ksilen",
  cyclohexane: "Siklohekzan",
} as const;
export function arene023(
  kind: string,
  depiction: "hybrid" | "a" | "b",
  position: number,
) {
  const key = own023(areneChoices023, kind);
  if (!["hybrid", "a", "b"].includes(depiction))
    throw new RangeError("CHEM023_DEPICTION");
  integer023(position, 1, 3);
  const aromatic = key !== "cyclohexane",
    s = ring023(6, 65);
  for (const a of s.atoms) a.aromatic = aromatic;
  for (const b of s.bonds)
    if (aromatic) {
      b.order = 1.5;
      b.aromatic = true;
    }
  const attach = (element: Atom023["element"], at: number) => {
    const angle = -Math.PI / 2 + (at * Math.PI) / 3;
    s.atoms.push(
      atom023(
        element,
        160 + 127 * Math.cos(angle),
        165 + 127 * Math.sin(angle),
      ),
    );
    s.bonds.push(bond023(at, s.atoms.length - 1));
  };
  if (key !== "benzene" && key !== "cyclohexane")
    attach(key === "phenol" ? "O" : key === "aniline" ? "N" : "C", 0);
  if (key === "xylene") attach("C", position);
  return {
    key,
    depiction,
    position,
    aromatic,
    ...structure023(s),
    label:
      key === "xylene"
        ? ["", "o-Ksilen", "m-Ksilen", "p-Ksilen"][position]
        : areneChoices023[key],
    hydrocarbon: !s.atoms.some((a) => a.element !== "C"),
    equivalentRingBonds: aromatic,
    piElectrons: aromatic ? 6 : 0,
    sigmaRing: 6,
    substitution: aromatic,
    positionName: ["", "orto (1,2)", "meta (1,3)", "para (1,4)"][position],
  };
}
export const functionalChoices023 = {
  methanol: "Metanol",
  ethanol: "Etanol",
  ether: "Dimetil eter",
  propan1: "1-Propanol",
  propan2: "2-Propanol",
  tert: "tert-Bütanol",
  glycol: "Glikol",
  glycerol: "Gliserin",
  phenol: "Fenol",
  benzyl: "Benzil alkol",
  acid: "Etanoik asit",
  lactic: "Laktik asit",
  aldehyde: "Etanal",
  ketone: "Propanon",
  ester: "Metil etanoat",
  amine: "Metilamin",
  nitro: "Nitrometan",
  nitrile: "Asetonitril",
} as const;
export type FunctionalGroup023 = {
  kind: string;
  name: string;
  atoms: number[];
  alpha?: number;
  degree?: number;
  hydrogens?: number;
};
export function functional023(kind: string) {
  const key = own023(functionalChoices023, kind);
  let s: Structure023;
  if (key === "nitrile") {
    s = {
      atoms: [
        atom023("C", 60, 155),
        atom023("C", 160, 155),
        atom023("N", 260, 155),
      ],
      bonds: [bond023(0, 1), bond023(1, 2, 3)],
    };
  } else if (key === "phenol" || key === "benzyl") {
    s = copy023(arene023(key === "phenol" ? "phenol" : "toluene", "hybrid", 1));
    if (key === "benzyl") {
      for (const a of s.atoms) a.y += 60;
      s.atoms.push(atom023("O", 160, 35));
      s.bonds.push(bond023(6, 7));
    }
  } else {
    const n =
      key === "methanol" || key === "amine" || key === "nitro"
        ? 1
        : key === "tert"
          ? 4
          : [
                "propan1",
                "propan2",
                "glycerol",
                "lactic",
                "ketone",
                "ester",
              ].includes(key)
            ? 3
            : 2;
    s = n === 1 ? carbon023([[155, 160]], []) : chain023(n);
    const add = (
      element: Atom023["element"],
      at: number,
      order = 1,
      x = s.atoms[at].x,
      y = 45,
    ) => {
      s.atoms.push(atom023(element, x, y));
      s.bonds.push(bond023(at, s.atoms.length - 1, order));
      return s.atoms.length - 1;
    };
    if (key === "tert") {
      s = carbon023(
        [
          [160, 160],
          [60, 160],
          [260, 160],
          [160, 265],
        ],
        [bond023(0, 1), bond023(0, 2), bond023(0, 3)],
      );
      add("O", 0);
    } else if (key === "ether") {
      s.atoms.splice(1, 0, atom023("O", 160, 160));
      s.atoms[0].x = 60;
      s.atoms[2].x = 260;
      s.bonds = [bond023(0, 1), bond023(1, 2)];
    } else if (key === "amine") add("N", 0, 1, 240, 160);
    else if (key === "nitro") {
      const ni = add("N", 0, 1, 225, 160);
      s.atoms[ni].charge = 1;
      add("O", ni, 2, 270, 70);
      const oi = add("O", ni, 1, 270, 250);
      s.atoms[oi].charge = -1;
      s.atoms[0].x = 100;
    } else if (key === "glycol" || key === "glycerol")
      for (let i = 0; i < n; i++)
        add("O", i, 1, s.atoms[i].x, i % 2 ? 265 : 45);
    else if (key === "acid" || key === "lactic") {
      const at = n - 1;
      add("O", at, 2, s.atoms[at].x, 45);
      add("O", at, 1, s.atoms[at].x, 265);
      if (key === "lactic") add("O", 1, 1, 160, 45);
    } else if (key === "aldehyde") add("O", n - 1, 2);
    else if (key === "ketone") add("O", 1, 2);
    else if (key === "ester") {
      s = carbon023(
        [
          [45, 160],
          [125, 160],
          [275, 160],
        ],
        [bond023(0, 1)],
      );
      add("O", 1, 2, 125, 50);
      const oi = add("O", 1, 1, 205, 160);
      s.bonds.push(bond023(oi, 2));
    } else add("O", key === "propan2" ? 1 : n - 1);
  }
  const model = structure023(s),
    groups: FunctionalGroup023[] = [];
  const carbonyl = (i: number) =>
    model.adjacency[i].find(
      (n) => n.order === 2 && s.atoms[n.atom].element === "O",
    );
  for (let i = 0; i < s.atoms.length; i++) {
    const a = s.atoms[i],
      neighbors = model.adjacency[i];
    if (
      a.element === "O" &&
      model.hydrogens[i] === 1 &&
      neighbors.length === 1
    ) {
      const alpha = neighbors[0].atom,
        c = s.atoms[alpha];
      if (c.aromatic)
        groups.push({ kind: "phenol", name: "Fenolik –OH", atoms: [alpha, i] });
      else if (
        !carbonyl(alpha) &&
        c.element === "C" &&
        model.adjacency[alpha].every((n) => n.order === 1)
      ) {
        const degree = model.adjacency[alpha].filter(
          (n) => s.atoms[n.atom].element === "C",
        ).length;
        groups.push({
          kind: "alcohol",
          name:
            degree === 0
              ? "Metanol –OH"
              : degree === 1
                ? "Birincil –OH"
                : degree === 2
                  ? "İkincil –OH"
                  : "Üçüncül –OH",
          atoms: [alpha, i],
          alpha,
          degree,
          hydrogens: model.hydrogens[alpha],
        });
      }
    }
    if (
      a.element === "O" &&
      neighbors.length === 2 &&
      neighbors.every(
        (n) => n.order === 1 && s.atoms[n.atom].element === "C",
      ) &&
      neighbors.every((n) => !carbonyl(n.atom))
    )
      groups.push({
        kind: "ether",
        name: "Eter köprüsü",
        atoms: [i, ...neighbors.map((n) => n.atom)],
      });
    if (a.element === "C" && carbonyl(i)) {
      const oxygen = carbonyl(i)!.atom,
        singleO = neighbors.find(
          (n) => n.order === 1 && s.atoms[n.atom].element === "O",
        );
      const kind = singleO
        ? model.hydrogens[singleO.atom]
          ? "acid"
          : "ester"
        : model.hydrogens[i]
          ? "aldehyde"
          : "ketone";
      groups.push({
        kind,
        name: {
          acid: "Karboksil",
          ester: "Ester",
          aldehyde: "Aldehit",
          ketone: "Keton",
        }[kind],
        atoms: [i, oxygen, ...(singleO ? [singleO.atom] : [])],
      });
    }
    if (a.element === "N") {
      const nitrile = neighbors.find(
        (n) => n.order === 3 && s.atoms[n.atom].element === "C",
      );
      groups.push({
        kind: nitrile ? "nitrile" : a.charge === 1 ? "nitro" : "amine",
        name: nitrile
          ? "Siyano grubu"
          : a.charge === 1
            ? "Nitro grubu"
            : "Amino grubu",
        atoms: nitrile
          ? [i, nitrile.atom]
          : [
              i,
              ...neighbors
                .filter((n) => s.atoms[n.atom].element === "O")
                .map((n) => n.atom),
            ],
      });
    }
  }
  return {
    key,
    label: functionalChoices023[key],
    ...model,
    groups,
    alcoholCount: groups.filter((g) => g.kind === "alcohol").length,
    hydroxyCount: s.atoms.filter(
      (a, i) => a.element === "O" && model.hydrogens[i] === 1,
    ).length,
  };
}

// AUTHORED_CONTENT_023
type Card023 = {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
  guidance: QuestionGuidance;
};
type Pack023 = LessonGuide & { topic: string; title: string; items: Card023[] };
const packs023: Pack023[] = [
  {
    id: "ayt-sikloalkanlar",
    topic: "detail-450",
    title: "Sikloalkanlar ve izomerlik: bağı say, yapıyı karşılaştır",
    minutes: 55,
    objectives: [
      "Halka, çoklu bağ ve hidrojen sayısını açık bağlanmadan çıkar.",
      "Yapı, konum ve zincir–halka izomerliğini örnekle ayır.",
      "Adlandırmada aynı yapının iki kez sayılmasını önle.",
    ],
    sections: [
      {
        title: "Önce dört bağın hesabını kur",
        paragraphs: [
          "Nötr doymuş bir karbon, bu bölümde toplam dört kovalent bağ mertebesiyle gösterilir. Bir C–C tek bağı, her iki karbonun birer bağ hakkını kullanır. Açık zincirin ucundaki karbon bir C komşusuna bağlıysa kalan üç bağını H ile tamamlayarak CH₃ olur.",
          "İçteki karbon iki C komşusuna tek bağla bağlıysa CH₂’dir. Kağıtta görünmeyen H atomlarını bu yöntemle tamamla: bir çizginin ucu ve köşesi, başka atom yazılmamışsa karbondur. H sayısını ezber formülün yanında gerçek bağlanmayla doğrulamak, halka–zincir ayrımının başlangıcıdır.",
        ],
      },
      {
        title: "Halka kapatırken ne değişir?",
        paragraphs: [
          "Açık zincirli propanın iki uç karbonu arasında yeni bir C–C bağı kurulduğunu düşün. Uçlardaki birer C–H bağı için artık yer kalmadığından aynı karbon sayısında iki H eksilir. Üç CH₂ birimi kapalı bir çevrim oluşturur ve siklopropanın formülü C₃H₆ olur.",
          "Bu bir yapı karşılaştırmasıdır; ekrandaki iki çizim arasındaki geçiş kendiliğinden gerçekleşen bir kimyasal tepkime değildir. Aynı C sayılı açık alkan CₙH₂ₙ₊₂ iken tek halkalı, yalnız tek bağ içeren sikloalkan CₙH₂ₙ’dir. En küçük sıradan karbon halkası üç karbonludur.",
        ],
      },
      {
        title: "Doymuşluk ile halkalılığı ayrı sor",
        paragraphs: [
          "Siklohekzandaki C–C ve C–H bağlarının hepsi tek bağdır; yapı doymuştur. Benzen ise aynı altı karbonu içerse de aromatik π elektron sistemine sahiptir. Bir yapının halka olarak çizilmesi, tek başına onun doymamış veya aromatik olduğunu göstermez.",
          "Doymuşluk bağ türüyle, halka sayısı bağlantı düzeniyle ilgilidir. Siklopropanda toplam dokuz sigma bağı vardır: üç C–C ve altı C–H. Açık zincirli propende ise sekiz sigma ve bir pi bağı vardır. Tek bir toplam sayı bütün yapıyı belirlemez.",
        ],
      },
      {
        title: "Bir çevrim, iki hidrojen eksikliği",
        paragraphs: [
          "Açık doymuş hidrokarbonla karşılaştırılan her bağımsız halka iki H eksikliğine karşılık gelir. Bir çift bağ da iki H eksikliğine karşılık gelir; üçlü bağ ise dört H eksikliğidir. Bu sayım, bağlar ve değerlikler uygun olduğunda farklı olası yapıları taramaya yarar.",
          "Yalnız C ve H içeren sıradan nötr bileşik için doymamışlık eşdeğeri (2C + 2−H)/2’dir. C₄H₈ için sonuç birdir: bir halka veya bir çift bağ olasıdır. Sonuç bir diye hangi seçeneğin bulunduğu kesinleşmez; açık yapı veya ek deney bilgisi gerekir.",
        ],
      },
      {
        title: "Bir formül, birkaç farklı bağlantı",
        paragraphs: [
          "Molekül formülü atomların türünü ve sayısını verir; hangi atomun hangisine bağlı olduğunu söylemez. C₄H₈; siklobütan, metilsiklopropan, 1-büten, 2-büten ve 2-metilpropen gibi farklı bağlantılarla yazılabilir.",
          "İzomer aramaya başlamadan her adayın formülünü bağımsız say. C₄H₁₀ olan bütan ile C₄H₈ olan siklobütan aynı karbon sayısına rağmen izomer değildir. Aynı formül ilk kapıdır; sonra aynı yapının dönmüş veya ters çevrilmiş çizimini farklı aday sanmamak gerekir.",
        ],
      },
      {
        title: "İskelet izomerliğinde C komşuluğunu izle",
        paragraphs: [
          "İskelet izomerliğinde karbonların birbirine bağlanma düzeni değişir. C₄H₈ içinde siklobütan dört üyeli halkayken metilsiklopropan üç üyeli halkaya bağlı bir metil grubu taşır. İkisinde de bir halka ve dört karbon vardır; halka boyu ve dallanma farklıdır.",
          "Açık zincirde 1-büten ile 2-metilpropen de aynı formüllü farklı iskeletlerdir. Yapıya yalnız sağdan veya soldan bakmak komşulukları değiştirmez. Dalın hangi karbona bağlandığını bir C–C bağlantı listesiyle kontrol etmek, görsel benzerlikten daha güvenilirdir.",
        ],
      },
      {
        title: "Konum izomerliğinde değişen bağı bul",
        paragraphs: [
          "1-Büten CH₂=CH–CH₂–CH₃, 2-büten CH₃–CH=CH–CH₃ biçimindedir. Dört karbonluk açık iskelet korunur; çift bağın zincirdeki yeri değişir. Bu yüzden bu ikili konum izomerliğine örnektir.",
          "Zinciri ters numaralayınca 3-büten denilen çizimin yeniden 1-büten olduğunu görürsün. En küçük çoklu bağ numarası kullanılır. Aday sayarken çizimin sayfa yönünü değil, uçtan uca aynı bağlantıların eşleşip eşleşmediğini incele.",
        ],
      },
      {
        title: "Zincir–halka izomerliğini kanıtla",
        paragraphs: [
          "Siklopropan ile propenin ikisi de C₃H₆’dır. İlki üç C–C tek bağıyla halka kurar; ikincisi açık zincirde bir C=C ve bir C–C bağı taşır. Formül aynı, bağlanma farklı olduğundan zincir–halka izomeridir.",
          "Bu eşleşme aynı karbon sayılı tek halkalı sikloalkan ile açık zincirli tek çift bağlı alkenler için kullanılır. İki halkalı veya ek çoklu bağlı türlere CₙH₂ₙ kuralını koşulsuz taşıma. Her yeni çevrim ya da pi bağı hidrojen hesabını yeniden etkiler.",
        ],
      },
      {
        title: "Yapı ile uzay düzenini ayır",
        paragraphs: [
          "Yapı izomerlerinde atomların bağlantıları farklıdır. Geometrik izomerlerde aynı bağlantı korunur, grupların uzaydaki göreli yönü değişir. Cis ve trans 2-bütenin formülü ve hangi atomun hangisine bağlı olduğu aynıdır; çift bağ çevresindeki yöneliş farklıdır.",
          "Bir halka da bazı dönmeleri sınırlar. Uygun iki sübstitüent, halka düzleminin aynı veya karşı yüzünde bulunabilir; bu cis–trans ayrımı yapısal halka–zincir izomerliği değildir. Ekrandaki düz çokgen, gerçek küçük/büyük halkaların bütün üç boyutlu biçimlerini temsil etmez.",
        ],
      },
      {
        title: "Tek substitüentli halkayı adlandır",
        paragraphs: [
          "Ana yapı olarak halka seçildiğinde halka karbon sayısına karşılık gelen adın önüne siklo- gelir: siklobütan, siklopentan, siklohekzan. Halkada tek bir metil grubu varsa metilsiklopentan denir; aynı halkada tek bağlanma yeri için 1 yazmak genellikle gerekli değildir.",
          "Buradaki basit örneklerde halka karbon sayısı yan zincirden büyüktür. Uzun bir zincire küçük bir halka bağlıysa ana yapı seçimi ayrıca değerlendirilir. Bir metil dalının karbonunu halka köşesi sayma: metilsiklopropanın halkası üç, toplam karbon sayısı dörttür.",
        ],
      },
      {
        title: "Birden çok dal için ilk farkı kullan",
        paragraphs: [
          "Halkadaki farklı başlangıç ve yönlerden oluşan numara dizilerini küçükten büyüğe sırala. Bu dizilerin ilk farklı sayısında daha küçük olanı seç. Örneğin 1,2,4 dizisi 1,3,4’ten önce gelir. Aynı numara dizisinde uygun alfabetik öncelik uygulanır.",
          "Yalnız numaraların toplamını karşılaştırmak genel kural değildir; farklı diziler aynı toplamı verebilir. Dallar ad içinde alfabetik yazılır; di- ve tri- gibi çoğaltma ekleri bu temel alfabetik sıralamanın yerine geçmez. Adı bitirince sayfadaki her dala geri bağlayarak kontrol et.",
        ],
      },
      {
        title: "Aynı yapıyı tekrar sayma",
        paragraphs: [
          "Bir siklohekzan halkasını döndürmek, birinci köşeyi değiştirmek veya zinciri ters yönden yazmak yeni molekül üretmez. Karbonların ve dalların komşulukları eşleşiyorsa iki çizim aynı yapı olabilir.",
          "Bir izomer listesinde önce halka boyunu, sonra dal sayısını ve bağlandığı yerleri sabitle. Örneğin metilsiklobütanda tek dalın farklı köşelere çizilmesi eşdeğerdir. İki dal varsa aralarındaki en kısa halka uzaklığı gibi değişmeyen ilişkiler farklı konumları ayırt etmeye yardım eder.",
        ],
      },
      {
        title: "Fiziksel özellikler neden farklılaşabilir?",
        paragraphs: [
          "İzomerlerin molekül formülü aynı olduğundan mol kütleleri aynıdır; fakat molekül biçimleri ve etkileşimleri farklılaşabilir. Temas yüzeyi, simetri ve katı hâlde paketlenme, kaynama veya erime davranışını etkileyebilir.",
          "Aynı formül, bütün fiziksel ve kimyasal özelliklerin aynı olması demek değildir. Buna karşılık her özellik her izomer çiftinde mutlaka farklı bir sayısal değere sahip olur diye de bir zorunluluk kurulmaz. Verilen özellik veya ölçüm için ilgili yapıyı ve koşulları karşılaştır.",
        ],
      },
      {
        title: "Küçük halka ile büyük halkayı ayır",
        paragraphs: [
          "Üç ve dört üyeli halkalarda bağ açıları ve bağ yönelişleri ideal açık zincirli sp³ çevreye göre zorlanır. Bu halka gerilimi bazı tepkimeleri etkiler. Siklopropan, yalnız sigma bağları taşımasına rağmen belirli koşullarda halka açılmasıyla katılma verebilir.",
          "Bu nedenle “brom rengini giderdi, kesin açık alken” yargısı tüm hidrokarbonlar için güvenilir değildir. Basit ayırt etme sorusunda örnek adayların ve deney koşullarının açık olması gerekir. Siklohekzan ile siklopropanı bütün tepkimelerde aynı davranır sayma.",
        ],
      },
      {
        title: "Halkanın gerçek biçimi",
        paragraphs: [
          "Siklohekzanın çizimde düzgün altıgen olması, bütün atomlarının aynı düzlemde bulunduğu anlamına gelmez. Gerçek yapı sandalye gibi üç boyutlu konformasyonlar alabilir. Bağların kopmadığı konformasyon değişimi, yeni bir yapı izomeri üretmez.",
          "Bu ünitedeki iki boyutlu model bağlantıları ve H sayısını öğretir; açı enerjisi veya gerçek denge şekli hesaplamaz. Düz halka çizimiyle bağları say, üç boyutlu bir iddia soruluyorsa ayrıca verilen konformasyon bilgisini kullan. Böylece gösterim ile molekülün bütün özelliklerini ayırırsın.",
        ],
      },
      {
        title: "Yanma hesabını atom korunumu ile yap",
        paragraphs: [
          "CₙH₂ₙ olan hidrokarbonun tam yanmasında bir mol bileşikten n mol CO₂ ve n mol H₂O oluşur. Ürünlerde toplam 3 n O atomu bulunduğundan O₂ katsayısı 3 n/2’dir. Kesirli katsayı istenmiyorsa bütün denklem ikiyle çarpılır.",
          "Sikloalkan ve aynı formüllü alkenin tam yanma ürünlerinin mol oranı aynı olabilir. Bu, bağlarının aynı olduğunu göstermez. Aynı fiziksel koşullarda ölçülen CO₂ veya H₂O miktarı molekül formülü hakkında bilgi verir; tek başına izomerin hangisi olduğunu belirlemeyebilir.",
        ],
      },
      {
        title: "Soruyu çözmek için kısa karar yolu",
        paragraphs: [
          "Önce bütün C, H ve heteroatomları say. Sonra formüllerin eşitliğini kontrol et. Formüller farklıysa izomerlik aramayı durdur; eşitse bağlantıyı karşılaştır. Aynı bağlantının yalnız çizim yönü değişmişse aynı yapı olasılığını incele.",
          "Farklı bağlantıda halka–zincir, iskelet veya konum değişimini adlandır. Bağlantı aynı olup göreli uzay yönelişi değişiyorsa stereoizomerlik gündeme gelir. Son adımda sorunun yalnız yapı izomerlerini mi, geometrik izomerleri de mi saydırdığını yeniden oku.",
        ],
      },
      {
        title: "Modelde kendi kanıtını üret",
        paragraphs: [
          "İki listeden örneğin siklobütan ve 1-büteni seç. Model her C’nin H sayısını gerçek bağ mertebelerinden tamamlar; formül, sigma/pi bağı ve halka sayısını ayrı gösterir. Seçili C’nin kaç C komşusu olduğunu çizimde ve tabloda birlikte izle.",
          "Sonra 1-büten yerine 2-büten veya metilsiklopropan seçerek hangi sayının değiştiğini tahmin et. Hedef, düğmeye basmak değil seçtiğin izomerlik türünü aynı formül ve farklı komşuluk kanıtıyla açıklayabilmektir. Bu keşif, soru doğrusu veya konu tamamlaması kaydı oluşturmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Formül aynı, halka farklı",
        prompt:
          "Siklobütan ile 1-bütenin formüllerini ve sigma/pi bağ sayılarını bul.",
        strategy:
          "Önce her C üzerindeki H’yi tamamla; C–C komşuluğu ile bağ mertebesini ayrı say.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Siklobütanda dört C’nin her biri iki C’ye tek bağlıdır; her biri CH₂: C₄H₈.",
          },
          {
            label: "Adım 2",
            explanation:
              "Halkada dört C–C ve sekiz C–H sigma vardır: 12 sigma, 0 pi.",
          },
          {
            label: "Adım 3",
            explanation:
              "1-Bütende C–C komşuluğu üçtür; sekiz C–H ile 11 sigma ve çift bağdan 1 pi elde edilir.",
          },
        ],
        answer: "İkisi C₄H₈; siklobütan 12σ/0π, 1-büten 11σ/1π.",
        check:
          "Toplam değerlik bağı her iki yapıda 12 olsa da bunun sigma/pi dağılımı farklıdır.",
        pitfall: "Çift bağı iki ayrı C komşusu gibi sayma.",
      },
      {
        title: "Kapalı formülü sınırla",
        prompt:
          "Yalnız C/H içeren nötr C₅H₁₀ için halka veya pi olasılığını hesapla.",
        strategy: "C₅H₁₂ açık doymuş referansını kur.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Açık zincirli doymuş beş C için 2 n + 2=12 H gerekir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Gerçek türde 12−10=2 H eksiktir; iki H bir halka veya bir çift bağ eşdeğeridir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Doymamışlık eşdeğeri 2/2=1; tek halka ya da tek çift bağ olasıdır.",
          },
        ],
        answer:
          "Bir halka veya bir çift bağ; hangisi olduğu yalnız formülden kesinleşmez.",
        check:
          "Bir üçlü bağ iki eşdeğer gerektirirdi; bu veriyle tek üçlü bağ kurulmaz.",
        pitfall: "Eksik H sayısını doğrudan pi bağı adedi sanma.",
      },
      {
        title: "Aynı aday tekrar mı?",
        prompt:
          "Metilsiklobütanın metilini dört farklı köşeye çizmek dört yapı izomeri verir mi?",
        strategy:
          "Dört üyeli halkanın simetrisi altında bağlantıları eşleştir.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Her çizimde dört C kapalı halka ve halkanın bir C’sine bağlı tek CH₃ vardır.",
          },
          {
            label: "Adım 2",
            explanation:
              "Halkayı döndürünce metilli köşe istenen köşeye taşınır; bağ komşulukları aynı kalır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Formül C₅H₁₀ korunur ve yeni bir bağlantı listesi oluşmaz.",
          },
        ],
        answer: "Hayır; dört çizim aynı metilsiklobütan yapısıdır.",
        check:
          "İkinci farklı dal eklense göreli yerler ayrıca incelenir; tek dal örneğine geri taşıma.",
        pitfall:
          "Sayfadaki köşe numarasını moleküle ait değişmez kimlik sanma.",
      },
      {
        title: "Adlandırmada toplamın yetmediği yer",
        prompt:
          "İki aday yer dizisi 1,2,7 ve 1,4,5. Bu dizileri ilk fark kuralıyla karşılaştır.",
        strategy: "Sıralı dizileri soldan sağa karşılaştır.",
        steps: [
          {
            label: "Adım 1",
            explanation: "İlk sayı 1=1; karar henüz çıkmaz.",
          },
          {
            label: "Adım 2",
            explanation:
              "İkinci sayılar 2 ve 4’tür; ilk farklı yerde 2 daha küçüktür.",
          },
          {
            label: "Adım 3",
            explanation:
              "Toplamlar ikisinde de 10 olmasına rağmen 1,2,7 tercih edilir.",
          },
        ],
        answer: "1,2,7 dizisi önce gelir.",
        check:
          "İlk fark karar verdikten sonra sonraki 7’nin 5’ten büyük olması kararı bozmaz.",
        pitfall: "Numara toplamı eşitse bütün numaralamaları eşit sanma.",
      },
      {
        title: "Tam yanmadan izomer seçilir mi?",
        prompt: "0,20 mol C₄H₈ tam yandığında CO₂, H₂O ve O₂ molünü bul.",
        strategy: "C₄H₈ + 6O₂ → 4CO₂ + 4H₂O denkliğini kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Bir mol bileşik dört C’den dört mol CO₂ oluşturur.",
          },
          {
            label: "Adım 2",
            explanation:
              "Sekiz H, dört mol H₂O yapar; ürünlerin O toplamı 12 atomdur, yani 6O₂.",
          },
          {
            label: "Adım 3",
            explanation:
              "0,20 ile çarp: CO₂=0,80 mol, H₂O=0,80 mol, O₂=1,20 mol.",
          },
        ],
        answer: "0,80 mol CO₂; 0,80 mol H₂O; 1,20 mol O₂.",
        check:
          "Aynı formüllü izomerler aynı stokiyometrik miktarları verebilir; bu sonuç hangi C₄H₈ izomerinin seçildiğini belirlemez.",
        pitfall: "Mol başına katsayıyı verilen madde molüyle çarpmayı unutma.",
      },
    ],
    recall: [
      {
        prompt: "Siklohekzan neden doymuştur?",
        answer:
          "Yalnız tek bağlar taşır; halkalı olması pi bağı bulunduğunu göstermez.",
      },
      {
        prompt: "C₄H₈ formülü alkeni kesinleştirir mi?",
        answer: "Hayır; tek halkalı sikloalkanlar da bu formüle uyabilir.",
      },
      {
        prompt: "Metilsiklopropanın toplam C ve halka C sayısı?",
        answer: "Toplam 4; halka içinde 3.",
      },
      {
        prompt: "Aynı yapının dönmüş çizimi izomer mi?",
        answer: "Bağlantıları aynıysa yeni izomer değildir.",
      },
      {
        prompt: "Numara dizisinde karar nasıl verilir?",
        answer:
          "Sıralı dizileri ilk farklı yerde karşılaştır; yalnız toplama bakma.",
      },
    ],
    items: [
      {
        prompt:
          "Tek halkalı, yalnız C–C ve C–H tek bağları içeren altı karbonlu nötr hidrokarbonun formülü nedir?",
        options: ["C₅H₁₂", "C₆H₁₄", "C₆H₁₂", "C₆H₆", "C₆H₁₀"],
        answer: 2,
        hint: "Açık doymuş zincire göre bir halka iki H eksiltir.",
        explanation:
          "Açık doymuş altı C referansı C₆H₁₄’tür. Bir halka iki H eksiltir:14−2=12. Sonuç C₆H₁₂’dir. Her halka C iki C komşusuna tek bağlıysa iki H taşır; 6×2=12.",
        guidance: {
          knowledge: ["Tek halkalı doymuş hidrokarbon CₙH₂ₙ koşuluna uyar."],
          strategy:
            "Altı C için önce açık zincir referansını, sonra halka eksikliğini hesapla.",
          steps: [
            "Açık doymuş altı C referansı C₆H₁₄’tür.",
            "Bir halka iki H eksiltir:14−2=12.",
            "Sonuç C₆H₁₂’dir.",
          ],
          optionReasons: [
            "Beş C, kökteki altı C sayısını korumaz.",
            "C₆H₁₄ açık zincirli doymuş formüldür; halka eksikliği uygulanmamış.",
            "Doğru. Sonuç C₆H₁₂’dir.",
            "C₆H₆ üç ek pi eşdeğeri gerektirir; yalnız tek bağ şartına uymaz.",
            "C₆H₁₀ iki eksiklik eşdeğeridir; verilen tek halka için fazla.",
          ],
          commonError:
            "Halkayı çizince karbonun dört bağını beş bağa çıkararak H’leri aynı bırakma.",
          check:
            "Her halka C iki C komşusuna tek bağlıysa iki H taşır; 6×2=12.",
        },
      },
      {
        prompt:
          "Siklopentanın bütün C–C ve C–H sigma bağlarının toplamı kaçtır?",
        options: ["15", "10", "14", "5", "16"],
        answer: 0,
        hint: "Halka kenarlarını ve C–H bağlarını ayrı say.",
        explanation:
          "Halkada beş C–C sigma vardır. C₅H₁₀’da on C–H sigma vardır. Toplam 5 + 10=15 sigma bağı bulunur. Beş CH₂’nin her biri iki H verdiğinden 10H; halka kenarı 5; pi 0.",
        guidance: {
          knowledge: ["Siklopentan C₅H₁₀ olup yalnız tek bağ taşır."],
          strategy: "Beş halka kenarına on C–H bağını ekle.",
          steps: [
            "Halkada beş C–C sigma vardır.",
            "C₅H₁₀’da on C–H sigma vardır.",
            "Toplam 5 + 10=15 sigma bağı bulunur.",
          ],
          optionReasons: [
            "Doğru. Toplam 5 + 10=15 sigma bağı bulunur.",
            "Yalnız on C–H bağını sayıyor; halka kenarları eksik.",
            "Açık zincirdeki dört C–C komşuluğunu kullanmış; halka beş kenarlıdır.",
            "Yalnız halka C–C bağlarını sayıyor; C–H’ler eksik.",
            "Verilmeyen bir C–H veya C–C bağı ekler.",
          ],
          commonError:
            "Halkada C–C bağ sayısını n−1 almak açık zincir kuralını yanlış taşır.",
          check:
            "Beş CH₂’nin her biri iki H verdiğinden 10H; halka kenarı 5; pi 0.",
        },
      },
      {
        prompt:
          "Propen CH₂=CH–CH₃ ile siklopropan (üç CH₂’nin tek bağlarla kapalı halkası) arasındaki ilişki nedir?",
        options: [
          "Cis–trans izomerliği",
          "Konformasyon değişimi",
          "Farklı formüllü homologluk",
          "Aynı yapının dönüşü",
          "Zincir–halka yapı izomerliği",
        ],
        answer: 4,
        hint: "Önce iki yapının atom sayılarını eşitle.",
        explanation:
          "Propenin toplamı C₃H₆’dır. Siklopropanda üç CH₂ birimi C₃H₆ verir. Bağlantı açık çift bağlı zincirden kapalı tek bağlı halkaya değişir; zincir–halka izomeridir. Her iki molekülde 3C/6H bulunur; yalnız H eksikliğini sağlayan topoloji farklıdır.",
        guidance: {
          knowledge: [
            "İzomerler aynı molekül formülünde farklı yapı veya uzay düzeni gösterebilir.",
          ],
          strategy:
            "Formülü saydıktan sonra bağlantıdaki halka/çift bağ farkını adlandır.",
          steps: [
            "Propenin toplamı C₃H₆’dır.",
            "Siklopropanda üç CH₂ birimi C₃H₆ verir.",
            "Bağlantı açık çift bağlı zincirden kapalı tek bağlı halkaya değişir; zincir–halka izomeridir.",
          ],
          optionReasons: [
            "Cis–trans aynı bağlantı için yöneliş farkıdır; burada bağlantılar farklı.",
            "Konformasyonda bağlantı korunur; burada değişmiştir.",
            "Formüller aynıdır; yalnız CH₂ artışlı homolog ilişki değildir.",
            "Birinde halka bağı, ötekinde çift bağ vardır; yalnız döndürme ile eşleşmez.",
            "Doğru. Bağlantı açık çift bağlı zincirden kapalı tek bağlı halkaya değişir; zincir–halka izomeridir.",
          ],
          commonError:
            "Aynı C sayısını tek başına izomer kanıtı saymak yerine H’yi de denetle.",
          check:
            "Her iki molekülde 3C/6H bulunur; yalnız H eksikliğini sağlayan topoloji farklıdır.",
        },
      },
      {
        prompt:
          "Aşağıdaki çiftlerden hangisi aynı formüllü izomer çifti değildir?",
        options: [
          "Etanol C₂H₆O /dimetil eter C₂H₆O",
          "Pentan C₅H₁₂ / siklopentan C₅H₁₀",
          "n-Bütan C₄H₁₀ /2-metilpropan C₄H₁₀",
          "Siklobütan C₄H₈ /1-büten C₄H₈",
          "1-Büten C₄H₈ /2-büten C₄H₈",
        ],
        answer: 1,
        hint: "İlk zorunlu koşul C yanında H ve diğer atom sayılarının eşitliğidir.",
        explanation:
          "Pentan 12H, siklopentan 10H taşır. Bu fark aynı molekül formülü koşulunu bozar. Pentan/siklopentan çifti izomer değildir. İzomer olmayan çiftin H sayısı farkı iki; diğer atomlar aynı olsa da koşul sağlanmaz.",
        guidance: {
          knowledge: ["İzomerlikte molekül formülü aynıdır."],
          strategy:
            "Her seçenekte yazılı formülleri tür ve sayı olarak eşleştir.",
          steps: [
            "Pentan 12H, siklopentan 10H taşır.",
            "Bu fark aynı molekül formülü koşulunu bozar.",
            "Pentan/siklopentan çifti izomer değildir.",
          ],
          optionReasons: [
            "Her ikisi C₂H₆O; işlev bağlantısı farklıdır.",
            "Doğru. Pentan/siklopentan çifti izomer değildir.",
            "Her ikisi C₄H₁₀; iskeletleri farklıdır.",
            "Her ikisi C₄H₈; halka–zincir izomerleri olabilir.",
            "Her ikisi C₄H₈; çift bağ yeri farklıdır.",
          ],
          commonError:
            "Yalnız aynı karbon sayısına bakarak tüm çiftleri izomer ilan etme.",
          check:
            "İzomer olmayan çiftin H sayısı farkı iki; diğer atomlar aynı olsa da koşul sağlanmaz.",
        },
      },
      {
        prompt:
          "Bir numaralama karşılaştırmasında sıralı yer dizileri 1,2,6 ve 1,3,5 elde ediliyor. İlk fark kuralına göre hangisi önce gelir?",
        options: [
          "Dalların sayısı eşitse karar verilemez",
          "Son sayı küçük olan her zaman kazanır",
          "1,2,6",
          "Toplamlar aynı olduğundan ikisi eşdeğer",
          "1,3,5",
        ],
        answer: 2,
        hint: "Sayıları soldan sağa, ilk farklı yerde karşılaştır.",
        explanation:
          "İlk sayılar 1 ve 1 eşittir. İlk fark ikinci yerde 2<3’tür. Bu nedenle 1,2,6 dizisi önce gelir. İkinci yerde karar verildiğinde 6’nın 5’ten büyük olması sonucu değiştirmez.",
        guidance: {
          knowledge: [
            "En küçük yer dizisi yalnız toplamların karşılaştırılmasıyla seçilmez.",
          ],
          strategy: "Birinci eşit sayıyı geç ve ikinci sayıyı karşılaştır.",
          steps: [
            "İlk sayılar 1 ve 1 eşittir.",
            "İlk fark ikinci yerde 2<3’tür.",
            "Bu nedenle 1,2,6 dizisi önce gelir.",
          ],
          optionReasons: [
            "Dalların sayısı eşitken de yer dizileri karşılaştırılabilir.",
            "Son sayıya ancak önceki sayılar eşitse sıra gelir.",
            "Doğru. Bu nedenle 1,2,6 dizisi önce gelir.",
            "Her iki toplam 9 olsa da dizilerde ilk fark vardır.",
            "İkinci konumda 3,2’den büyüktür.",
          ],
          commonError: "Numaraları toplayarak ilk fark bilgisini kaybetme.",
          check:
            "İkinci yerde karar verildiğinde 6’nın 5’ten büyük olması sonucu değiştirmez.",
        },
      },
      {
        prompt:
          "Tek metilli siklopropan halkasını kağıtta döndürüp metili farklı bir köşede göstermek hangi değişikliği yapar?",
        options: [
          "C₄H₈’i C₃H₆ yapar",
          "Açık zincirli alkana dönüştürür",
          "Bir pi bağı ekler",
          "Aynı yapının çizim yönünü değiştirir",
          "Yeni zincir–halka izomeri üretir",
        ],
        answer: 3,
        hint: "Bağların hangi atomları bağladığını karşılaştır.",
        explanation:
          "Üç C yine üçlü kapalı halka kurar. Bir CH₃ yine yalnız bir halka C’sine bağlıdır. Komşuluklar aynı olduğundan aynı yapının farklı çizimidir. Her iki çizimde toplam 4C,8H ve tek halka bulunur.",
        guidance: {
          knowledge: [
            "Halkayı bütünüyle döndürmek atom komşuluklarını değiştirmez.",
          ],
          strategy: "Metilli halka karbonunu dönme sonrasında eşleştir.",
          steps: [
            "Üç C yine üçlü kapalı halka kurar.",
            "Bir CH₃ yine yalnız bir halka C’sine bağlıdır.",
            "Komşuluklar aynı olduğundan aynı yapının farklı çizimidir.",
          ],
          optionReasons: [
            "Döndürme bir C ve iki H’yi ortadan kaldırmaz.",
            "Halka kenarları koparılmadı; açık alkan oluşmadı.",
            "Hiçbir bağ mertebesi değişmediği için pi eklenmez.",
            "Doğru. Komşuluklar aynı olduğundan aynı yapının farklı çizimidir.",
            "Halka topolojisi korunur; açık zincir oluşmaz.",
          ],
          commonError:
            "Sayfa üzerindeki köşe konumunu yeni molekül kimliği sanma.",
          check: "Her iki çizimde toplam 4C,8H ve tek halka bulunur.",
        },
      },
      {
        prompt:
          "Cis-2-büten ile trans-2-büten aynı atom bağlantılarını taşır; CH₃ gruplarının C=C’ye göre yönü farklıdır. Bu ayrım hangi türdür?",
        options: [
          "Farklı molekül formülü",
          "Zincir–halka yapı izomerliği",
          "Fonksiyonel grup izomerliği",
          "Geometrik stereoizomerlik",
          "Yalnız homologluk",
        ],
        answer: 3,
        hint: "Kökte bağlantıların aynı olduğu açıkça söyleniyor.",
        explanation:
          "İki tür de C₄H₈ ve 2-büten bağlantısı taşır. Değişen, çift bağa göre grupların aynı/karşı tarafta oluşudur. Bu geometrik stereoizomerliktir. Cis/trans değiştirmek,2-bütenin çift bağını 1-büten konumuna taşımaz.",
        guidance: {
          knowledge: [
            "Stereoizomerlikte bağlantı aynı, uzay düzeni farklıdır.",
          ],
          strategy: "Hangi bilginin değiştiğini bağlantı ve yön olarak ayır.",
          steps: [
            "İki tür de C₄H₈ ve 2-büten bağlantısı taşır.",
            "Değişen, çift bağa göre grupların aynı/karşı tarafta oluşudur.",
            "Bu geometrik stereoizomerliktir.",
          ],
          optionReasons: [
            "Formül değişmez; iki tür de C₄H₈.",
            "İki tür de açık zincirli ve aynı çift bağ konumunda; halka farkı yok.",
            "İkisi de alken; farklı işlev türü oluşturulmamış.",
            "Doğru. Bu geometrik stereoizomerliktir.",
            "Bir CH₂ basamaklı homolog artışı yok; C sayısı aynı.",
          ],
          commonError:
            "“İzomer” sözünü yalnız farklı bağlantılı yapılarla sınırlama.",
          check:
            "Cis/trans değiştirmek,2-bütenin çift bağını 1-büten konumuna taşımaz.",
        },
      },
      {
        prompt:
          "Yalnız C ve H içeren nötr C₆H₁₀ için doymamışlık eşdeğeri kaçtır?",
        options: ["1", "2", "4", "6", "0"],
        answer: 1,
        hint: "Açık doymuş altı C formülünün H sayısını bul.",
        explanation:
          "Doymuş açık referansta H=2×6 + 2=14. Gerçek türde 14−10=4H eksiktir. Dört H eksikliği 4/2=2 eşdeğerdir. İki çift bağ veya bir üçlü bağ gibi farklı olasılıklar aynı toplamı sağlayabilir.",
        guidance: {
          knowledge: [
            "Halkalar/pi bağları açık doymuş referansa göre ikişer H eksikliğiyle sayılır.",
          ],
          strategy: "(2C + 2−H)/2 bağıntısını kullan.",
          steps: [
            "Doymuş açık referansta H=2×6 + 2=14.",
            "Gerçek türde 14−10=4H eksiktir.",
            "Dört H eksikliği 4/2=2 eşdeğerdir.",
          ],
          optionReasons: [
            "Bir eşdeğer C₆H₁₂ için uygundur.",
            "Doğru. Dört H eksikliği 4/2=2 eşdeğerdir.",
            "Eksik H sayısını ikiye bölmeden bırakır.",
            "Karbon sayısı doymamışlık eşdeğerine eşit değildir.",
            "Sıfır eşdeğer C₆H₁₄’e karşılık gelirdi.",
          ],
          commonError:
            "H eksikliğinin her iki atomunu ayrı pi bağı diye sayma.",
          check:
            "İki çift bağ veya bir üçlü bağ gibi farklı olasılıklar aynı toplamı sağlayabilir.",
        },
      },
      {
        prompt:
          "1 mol saf C₄H₈’in tam yanması için gereken O₂ miktarı kaç moldür?",
        options: ["12", "8", "5", "4", "6"],
        answer: 4,
        hint: "Önce CO₂ ve H₂O katsayılarını yaz.",
        explanation:
          "Dört C,4CO₂ oluşturur; 8O atomu gerekir. Sekiz H,4H₂O oluşturur; 4O atomu gerekir. Toplam 12O atomu için 6O₂ gerekir. C₄H₈ + 6O₂ → 4CO₂ + 4H₂O ile her element eşitlenir.",
        guidance: {
          knowledge: [
            "Tam yanmada C → CO₂, H → H₂O; O₂ gereği ürün O atomlarının yarısıdır.",
          ],
          strategy: "Dört C ve sekiz H’nin ürün O hesabını yap.",
          steps: [
            "Dört C,4CO₂ oluşturur; 8O atomu gerekir.",
            "Sekiz H,4H₂O oluşturur; 4O atomu gerekir.",
            "Toplam 12O atomu için 6O₂ gerekir.",
          ],
          optionReasons: [
            "O atom sayısını O₂ molekül molüyle karıştırır.",
            "H veya C sayısını doğrudan O₂ katsayısına taşır.",
            "Ürünlerde 10 değil 12O atomu vardır.",
            "Yalnız karbon ürününün O₂ ihtiyacını sayar.",
            "Doğru. Toplam 12O atomu için 6O₂ gerekir.",
          ],
          commonError:
            "Ürün O atomunu bulduktan sonra O₂ için ikiye bölmeyi unutma.",
          check: "C₄H₈ + 6O₂ → 4CO₂ + 4H₂O ile her element eşitlenir.",
        },
      },
      {
        prompt:
          "Üç üyeli bir karbon halkasına tek CH₃ grubu bağlıdır; tüm bağlar tektir. Toplam karbon sayısı ve formül hangisidir?",
        options: [
          "4 C; C₄H₈",
          "4 C; C₄H₆",
          "5 C; C₅H₁₀",
          "3 C; C₃H₆",
          "4 C; C₄H₁₀",
        ],
        answer: 0,
        hint: "Dal karbonu halka köşelerine eklenir.",
        explanation:
          "Halka 3C, metil 1C sağlar; toplam 4C. Tek doymuş halka için H=2×4=8. Doğru çift 4C ve C₄H₈’dir. Metilli halka C’si CH, diğer iki halka C’si CH₂, daldaki CH₃:1 + 4 + 3=8H.",
        guidance: {
          knowledge: [
            "Bir metil dalı bir karbon içerir; tek doymuş halka iki H eksikliği taşır.",
          ],
          strategy: "Önce toplam C, sonra H say.",
          steps: [
            "Halka 3C, metil 1C sağlar; toplam 4C.",
            "Tek doymuş halka için H=2×4=8.",
            "Doğru çift 4C ve C₄H₈’dir.",
          ],
          optionReasons: [
            "Doğru. Doğru çift 4C ve C₄H₈’dir.",
            "İki ek H eksikliği için kökte bulunmayan halka/pi gerekir.",
            "Metil tek C’dir; iki C eklenmez.",
            "Dalın karbonunu yok sayar.",
            "C₄H₁₀ açık zincirli doymuş formüldür.",
          ],
          commonError: "Metil grubunu üç H içerdiği için üç karbonlu sanma.",
          check:
            "Metilli halka C’si CH, diğer iki halka C’si CH₂, daldaki CH₃:1 + 4 + 3=8H.",
        },
      },
      {
        prompt:
          "Siklohekzan yalnız C–C/C–H tek bağları içeriyor. Bu bilgi hangi sonucu destekler?",
        options: [
          "Halkalı ama doymuş hidrokarbondur",
          "Formülü C₆H₆’dır",
          "Bütün karbonları sp hibritleşmiştir",
          "Mutlaka aromatiktir",
          "Üç pi bağı taşır",
        ],
        answer: 0,
        hint: "Doymuşluğu halka şekli değil bağ mertebesi belirler.",
        explanation:
          "Bütün belirtilen bağlar tektir. Bu bağlanma doymuş hidrokarbon koşulunu sağlar. Siklohekzan halkalı ve doymuştur. Tek halka 1 eşdeğer; H=14−2=12, pi 0.",
        guidance: {
          knowledge: [
            "Tek bağlı sikloalkan ile aromatik benzen farklı yapılardır.",
          ],
          strategy: "Pi bağı olmadığını ve halkayı ayrı değerlendir.",
          steps: [
            "Bütün belirtilen bağlar tektir.",
            "Bu bağlanma doymuş hidrokarbon koşulunu sağlar.",
            "Siklohekzan halkalı ve doymuştur.",
          ],
          optionReasons: [
            "Doğru. Siklohekzan halkalı ve doymuştur.",
            "Tek halkalı doymuş altı C için C₆H₁₂ gerekir.",
            "Basit doymuş C çevresi sp³’tür; sp doğrusal üçlü bağ bağlamıdır.",
            "Halka bulunması aromatik pi sistemini kanıtlamaz.",
            "Kökte pi bağına karşılık gelen çoklu bağ yoktur.",
          ],
          commonError: "Altıgen resmi gördüğünde otomatik benzen tanısı koyma.",
          check: "Tek halka 1 eşdeğer; H=14−2=12, pi 0.",
        },
      },
      {
        prompt:
          "C₄H₈ için siklobütan, metilsiklopropan,1-büten,2-büten ve 2-metilpropen listeleniyor. Cis/trans ayrı sayılmadan listede kaç farklı yapı vardır?",
        options: ["6", "7", "5", "4", "3"],
        answer: 2,
        hint: "Yalnız bağlantıları farklı olan adları say.",
        explanation:
          "İki ayrı halkalı bağlantı vardır:siklobütan, metilsiklopropan. Üç ayrı açık bağlantı vardır:1-büten,2-büten,2-metilpropen. Yapı toplamı 2 + 3=5’tir. Beş adın da formülü C₄H₈; hiçbirinin ters yazılışı listede ikinci kez bulunmuyor.",
        guidance: {
          knowledge: [
            "2-Bütenin cis/trans biçimleri aynı yapı bağlantısının geometrik varyantlarıdır.",
          ],
          strategy:
            "Verilen beş bağlantıyı halka ve açık zincir olarak grupla.",
          steps: [
            "İki ayrı halkalı bağlantı vardır:siklobütan, metilsiklopropan.",
            "Üç ayrı açık bağlantı vardır:1-büten,2-büten,2-metilpropen.",
            "Yapı toplamı 2 + 3=5’tir.",
          ],
          optionReasons: [
            "Kökün dışladığı cis/transı ayrıca ekler.",
            "Listedeki yapıların yönlerini de yeni tür sayarak fazla sayar.",
            "Doğru. Yapı toplamı 2 + 3=5’tir.",
            "Listedeki farklı iskelet veya konumlardan birini eksiltir.",
            "Açık zincirleri sayıp iki halkayı dışlar.",
          ],
          commonError:
            "Yapı izomeri sayımıyla bütün stereoizomer sayımını karıştırma.",
          check:
            "Beş adın da formülü C₄H₈; hiçbirinin ters yazılışı listede ikinci kez bulunmuyor.",
        },
      },
      {
        prompt:
          "Uygun iki farklı substitüent taşıyan bir halkada grupların halkanın aynı veya karşı yüzünde oluşu neyi karşılaştırır?",
        options: [
          "Halka karbon sayısını",
          "Molekül formülündeki O sayısını",
          "Her zaman yeni karbon iskeletini",
          "Cis/trans uzay düzenini",
          "Zincir–halka formül farkını",
        ],
        answer: 3,
        hint: "Hangi atomun hangisine bağlı olduğu değişmeden yüz değişebilir.",
        explanation:
          "Substitüentlerin bağlı olduğu halka atomları aynı kalabilir. Aynı veya karşı yüz bilgisi göreli uzay yönelişidir. Bu cis/trans düzen karşılaştırmasıdır. Aynı yüz/cis ve karşı yüz/trans adları bağlantı değişimi gerektirmez.",
        guidance: {
          knowledge: [
            "Geometrik ayrım halkalarda da uygun koşullarda görülebilir.",
          ],
          strategy: "Bağlantıyı sabit tutup yalnız göreli yüzü düşün.",
          steps: [
            "Substitüentlerin bağlı olduğu halka atomları aynı kalabilir.",
            "Aynı veya karşı yüz bilgisi göreli uzay yönelişidir.",
            "Bu cis/trans düzen karşılaştırmasıdır.",
          ],
          optionReasons: [
            "Grupların yüz değiştirmesi halka köşelerini artırmaz.",
            "Kökte atom türü veya O sayısı değişimi verilmemiştir.",
            "Bağlantılar sabitken yüz değişimi yeni iskelet zorunluluğu doğurmaz.",
            "Doğru. Bu cis/trans düzen karşılaştırmasıdır.",
            "İki yapı da halkalı kalır; zincir–halka değişimi yok.",
          ],
          commonError:
            "Cis/transı yalnız açık zincirde çift bağ bulunan yapılarla sınırlama.",
          check:
            "Aynı yüz/cis ve karşı yüz/trans adları bağlantı değişimi gerektirmez.",
        },
      },
      {
        prompt:
          "Aynı molekül formüllü iki yapı izomeri için kesin olan hangisidir?",
        options: [
          "Aynı bağlantı listesine sahiptirler",
          "Birisi mutlaka aromatiktir",
          "Bütün kimyasal tepkimeleri aynıdır",
          "Kaynama noktaları mutlaka aynıdır",
          "Mol kütleleri aynıdır",
        ],
        answer: 4,
        hint: "Molekül formülünün doğrudan belirlediği niceliği ara.",
        explanation:
          "İzomerlerin formülünde atom türleri ve sayıları aynıdır. Aynı atom kütleleri aynı sayıda toplanır. Bu nedenle mol kütleleri aynıdır. Örneğin 1-büten ve siklobütanın C₄H₈ mol kütleleri eşit; bağ yapıları farklıdır.",
        guidance: {
          knowledge: [
            "Aynı atom türü ve sayısı aynı bağıl atom kütleleri toplamını verir.",
          ],
          strategy: "Mol kütlesini şekilden bağımsız atom sayımıyla belirle.",
          steps: [
            "İzomerlerin formülünde atom türleri ve sayıları aynıdır.",
            "Aynı atom kütleleri aynı sayıda toplanır.",
            "Bu nedenle mol kütleleri aynıdır.",
          ],
          optionReasons: [
            "Yapı izomerlerinde bağlantı listeleri farklıdır.",
            "İzomerlik aromatik bir üye bulunmasını zorunlu kılmaz.",
            "Farklı bağlanma tepkime davranışını değiştirebilir.",
            "Molekül biçimi ve etkileşim kaynamayı değiştirebilir.",
            "Doğru. Bu nedenle mol kütleleri aynıdır.",
          ],
          commonError:
            "Formül eşitliğini bütün ölçülen özelliklerin eşitliği gibi genişletme.",
          check:
            "Örneğin 1-büten ve siklobütanın C₄H₈ mol kütleleri eşit; bağ yapıları farklıdır.",
        },
      },
      {
        prompt:
          "Nötr yalnız C/H içeren C₆H₁₂ formülü veriliyor; başka yapı bilgisi yok. Hangisi kesin söylenemez?",
        options: [
          "Doymamışlık eşdeğeri birdir",
          "Kesinlikle açık zincirli bir alkendir",
          "Tek halkalı doymuş bir yapı olasıdır",
          "Açık zincirli tek çift bağlı yapı olasıdır",
          "Doymuş açık referanstan iki H eksiktir",
        ],
        answer: 1,
        hint: "Bir halka ile bir çift bağ aynı H eksikliğini sağlar.",
        explanation:
          "Altı C için doymuş açık referans H14’tür. H12 iki eksiklik ve bir eşdeğer verir. Bu halka veya çift bağla sağlanabilir; kesin açık alken denemez. İki açık karşı örnek C₆H₁₂’yi sağlar:siklohekzan ve 1-heksen.",
        guidance: {
          knowledge: ["CₙH₂ₙ formülü tek başına halka/pi ayrımı yapmaz."],
          strategy: "Kesin bilgiyle olasılık bildiren seçeneği ayır.",
          steps: [
            "Altı C için doymuş açık referans H14’tür.",
            "H12 iki eksiklik ve bir eşdeğer verir.",
            "Bu halka veya çift bağla sağlanabilir; kesin açık alken denemez.",
          ],
          optionReasons: [
            "(14−12)/2=1 hesaplanır.",
            "Doğru. Bu halka veya çift bağla sağlanabilir; kesin açık alken denemez.",
            "Siklohekzan bu formüle örnektir; olasılık doğrudur.",
            "1-Heksen bu formüle örnektir; olasılık doğrudur.",
            "14−12=2 olduğundan bu fark kesindir.",
          ],
          commonError:
            "“Olasıdır” ile “kesinlikle budur” ifadelerinin kapsamını aynı sanma.",
          check:
            "İki açık karşı örnek C₆H₁₂’yi sağlar:siklohekzan ve 1-heksen.",
        },
      },
    ],
    source:
      "MEBİ AYT Kimya: Hidrokarbonlar, Aromatik Hidrokarbonlar ve Alkoller; OGM ilgili Organik Bileşikler sunuları ve Dersler Cepte hedef öğretim sayfalarıyla karşılaştırılarak yazılmış özgün anlatım, şema, örnek ve sorular. Resmî sınav sorusu değildir.",
  },
  {
    id: "ayt-alkenler",
    topic: "detail-451",
    title: "Alkenler: çift bağdan ürüne, yapıdan izomere",
    minutes: 65,
    objectives: [
      "Çift bağın sigma/pi yapısını ve cis–trans koşulunu açıkla.",
      "Verilen koşulda katılma ürününü atom korunumu ile kur.",
      "Monomerden tekrar birimine geçerken yan grupları koru.",
    ],
    sections: [
      {
        title: "Hidrokarbon ailesindeki yerini bul",
        paragraphs: [
          "Alkenlerde en az bir C=C bağı bulunur; yalnız C ve H içeren bu türler doymamış hidrokarbonlardır. Açık zincirli ve yalnız bir çift bağlı olanların genel formülü CₙH₂ₙ’dir. İlk üye iki karbonlu eten, C₂H₄’tür.",
          "Önceki alkan bilgisini kullan: etanda C–C çevresindeki her karbon üç H taşırken etende her karbon iki H taşır. Bağ mertebesi birden ikiye çıkarken toplam iki H azalır. Halka veya ek çift bağ varsa genel formülün koşulları değişir; “en az bir çift bağ” ile “tam bir çift bağ” aynı şart değildir.",
        ],
      },
      {
        title: "Çift bağda iki farklı örtüşme",
        paragraphs: [
          "Bir C=C çift bağı bir sigma ve bir pi bağından oluşur. Sigma örtüşmesi çekirdekler arası eksen boyunca, pi örtüşmesi uygun p orbitallerinin yan yana etkileşmesiyle açıklanır. İki çizgi iki komşu karbon çifti demek değildir; aynı iki atom arasındaki toplam bağ mertebesini gösterir.",
          "Basit alkende çift bağ karbonları sp² hibritleşmiştir; bu karbonların çevresinde yaklaşık 120° ve düzlem üçgen geometri kullanılır. Molekülün başka, yalnız tek bağlı karbonları sp³ olabilir. Örneğin propende üç karbonun tamamına sp² demek yanlıştır; CH₃ karbonu sp³’tür.",
        ],
      },
      {
        title: "Sigma ve pi bağını bütün yapıda say",
        paragraphs: [
          "Etende bir C–C sigma, dört C–H sigma ve bir pi bağı vardır; toplam beş sigma ve bir pi. Propende iki C–C sigma ve altı C–H sigma vardır; toplam sekiz sigma ve bir pi.",
          "Açık zincirli, tek çift bağlı CₙH₂ₙ için C–C komşuluk sayısı n−1 ve C–H sayısı 2 n olduğundan toplam sigma 3 n−1 olur. Bu kısa yol yalnız belirtilen hidrokarbon koşullarında kullanılır. O, halojen, halka veya ek çoklu bağ varsa gerçek bağlantıları tek tek saymak gerekir.",
        ],
      },
      {
        title: "Ana zincir çift bağı içermeli",
        paragraphs: [
          "Adlandırmada önce çift bağı içeren uygun en uzun karbon zincirini seç. Bu zincirin karbon sayısı ana adı belirler. Numaralamaya çift bağın daha küçük numara aldığı uçtan başlanır; çift bağın yeri, iki karbonundan küçük numaralı olanla söylenir.",
          "CH₂=CH–CH₂–CH₃ için ad 1-büten, CH₃–CH=CH–CH₃ için 2-bütendir. Dalın bulunduğu uç daha yakın görünse bile önce çift bağ konumunu değerlendir. Dalların yerleri ve adları bundan sonra eklenir; aynı yapıyı ters yazmak başka bir alken değildir.",
        ],
      },
      {
        title: "Dallanma ve birden çok çift bağ",
        paragraphs: [
          "CH₂=C(CH₃)–CH₃ yapısının çift bağı içeren ana zinciri üç karbonludur; ikinci karbonda metil dalı vardır. Bileşik 2-metilpropen olarak adlandırılır. Dört toplam karbon bulunması, ana zincirin mutlaka büt- olmasını gerektirmez.",
          "İki çift bağın bulunduğu açık zincirli dienlerde, örneğin CH₂=CH–CH=CH₂ için 1,3-bütadien adı kullanılır. Bu türün formülü C₄H₆’dır; tek çift bağlı alkenlerin CₙH₂ₙ formülüyle karıştırılmaz. Çift bağların sayısı ve konumu adı tamamlayan bilgilerdir.",
        ],
      },
      {
        title: "Vinil ve allil gruplarını tanı",
        paragraphs: [
          "Etenin bir H eksik bağlanma grubu CH₂=CH– biçiminde etenil, yaygın adıyla vinildir. CH₂=CH–CH₂– ise allil grubudur. Bu açık uç, grubun başka bir atoma bağlanacağı yeri gösterir; bağımsız nötr molekülün kapalı formülüyle karıştırılmaz.",
          "Vinil klorür CH₂=CHCl’de Cl doğrudan çift bağ karbonuna bağlıdır. Allil klorür CH₂=CH–CH₂Cl’de Cl’nin bağlı olduğu karbon çift bağın dışında kalır. Aynı klor sözüne rağmen bağlanma yerini görmek, formül okuma ve polimer öncülü seçme sorularını kolaylaştırır.",
        ],
      },
      {
        title: "Konum ve iskelet izomerliğini tekrar kur",
        paragraphs: [
          "1-Büten ile 2-büten aynı dört karbonlu iskelette çift bağ konumunun değişmesiyle ayrılır. 2-Metilpropen ise dallanmış bir iskelet taşır. Üçünün de formülü C₄H₈’dir fakat aynı bağlantı listesine sahip değillerdir.",
          "Siklobütan da C₄H₈’dir; onun H eksikliği bir halkadan gelir. Bir kapalı formül verildiğinde seçenekler yalnız alkenlerle sınırlandırılmamışsa halka olasılığını dışlama. Bunun yanında cis ve trans 2-büten, farklı konum izomerleri değil aynı bağlantının geometrik izomerleridir.",
        ],
      },
      {
        title: "Cis–trans için önce iki karbonu incele",
        paragraphs: [
          "Geometrik izomerlik için çift bağın her karbonundaki iki grubun birbirinden farklı olması gerekir. 2-Bütende her çift bağ karbonu bir H ve bir CH₃ taşır; bu nedenle göreli iki yöneliş mümkündür. Uygun ortak gruplar aynı taraftaysa cis, karşı taraflardaysa trans denir.",
          "1-Bütenin uç CH₂ karbonunda iki H bulunur; bu yüzden cis–trans çifti oluşmaz. 2-Metilpropenin bir ucunda iki H, öbüründe iki CH₃ bulunması da bu koşulu sağlamaz. Önce koşulu kontrol et; yalnız çizimde iki taraf var diye cis/trans adı verme.",
        ],
      },
      {
        title: "Pi bağı dönmeyi neden sınırlar?",
        paragraphs: [
          "C=C çevresinde grupları serbestçe döndürmek, pi örtüşmesini bozmayı gerektirir. Bu yüzden cis ve trans 2-büten, sıradan bir tek bağ dönmesiyle aynı yapının iki serbest görünümü sayılmaz. Geometrik ayrımın fiziksel temeli bu dönme kısıtıdır.",
          "Her uçta farklı iki grup bulunup dört grup da birbirinden farklıysa E/Z düzenleri yine mümkün olabilir; basit ortak grup üzerinden cis/trans adlandırması yeterli olmaz. Bu dersin modelinde yalnız açıkça cis/trans adlandırılabilen 2-büten çifti kullanılır; genel stereoizomer yokluğu iddia edilmez.",
        ],
      },
      {
        title: "Fiziksel özellikte yapı ve simetriyi birlikte oku",
        paragraphs: [
          "Basit hidrokarbon alkenlerde London etkileşimleri önemlidir. Benzer homolog seride molekül büyüdükçe kaynama noktası genellikle yükselir. Su ile etkileşimleri zayıf olduğundan basit alkenlerin sudaki çözünürlüğü düşüktür; molekülün bütünü ve koşullar değerlendirilir.",
          "Cis- ve trans-1,2-dikloroetende bağ dipollerinin vektörel toplamları farklıdır; verilen koşulda kaynama davranışları da farklılaşır. “Her cis mutlaka polar, her trans mutlaka apolar ve daha düşük erime noktalı” diye evrensel kural kurulmaz. Erimede kristal paketlenmesi ayrıca önemlidir.",
        ],
      },
      {
        title: "Katılmanın muhasebesini kur",
        paragraphs: [
          "Katılma tepkimesinde pi bağından yararlanılarak çift bağdaki iki karbonun her birine yeni bir bağ eklenir; aralarındaki sigma bağ korunur. C=C, C–C olur. Alken karbonlarının iskeleti bu basit örneklerde kopmaz; eklenen atomların sayısı üründe görülmelidir.",
          "Etene H₂ katılırsa her karbona bir H eklenir ve etan oluşur. Etene Br₂ katılırsa birer Br eklenir ve 1,2-dibromoetan oluşur. İlkinde H sayısı iki artar; ikincisinde alkenin H sayısı korunur. Yalnız pi bağını silip yeni atomları eklememek eksik ürün verir.",
        ],
      },
      {
        title: "Hidrojenlenmede koşulu ve son ürünü ayır",
        paragraphs: [
          "Alkenin H₂ ile uygun metal katalizörlü hidrojenlenmesi, C=C’yi C–C’ye dönüştürür ve karşılık gelen alkanı verir. Örneğin propen + H₂ → propan. Bir mol tek çift bağlı alkenin tamamen bu bağdan doyması için bir mol H₂ gerekir.",
          "Tepkimede katalizör, toplam atom denkliğinde tüketilen reaktif gibi yazılmaz. Hidrojenin yetersiz olduğu bir karışım sorusunda tüm alkenin bittiğini varsayma; mol sayılarıyla sınırlayıcıyı bul. Burada model tek molekülün başlangıç ve ürün yapısını gösterir, tepkime hızını hesaplamaz.",
        ],
      },
      {
        title: "Bromla katılmayı gerçek adaylar içinde yorumla",
        paragraphs: [
          "Basit alken, verilen uygun koşullarda bromla katılma verdiğinde bromun rengi kaybolabilir. Propende CH₃–CH=CH₂ + Br₂ → CH₃–CHBr–CH₂Br olur. İki Br, çift bağın iki farklı karbonuna gider; aynı karbonda toplanmaz.",
          "Renk değişimi tek başına bütün bilinmeyen organik türler arasında kesin sınıf kanıtı değildir. Alkinler ve bazı başka türler de bu deneyi etkileyebilir. Soruda yalnız örneğin siklohekzan ve 1-heksen adayları verilmişse, belirtilen koşullarda bu fark anlamlı biçimde kullanılabilir.",
        ],
      },
      {
        title: "HX katılmasında pozitif ve negatif parçayı izle",
        paragraphs: [
          "Asimetrik basit alkene olağan iyonik koşulda HX katılmasını Markovnikov yönelimiyle ele alırız: H, çift bağ karbonlarından başlangıçta daha fazla H taşıyana; X ise daha az H taşıyana gider. Propen + HCl için ana ürün 2-kloropropandır.",
          "Bu kısa yolun bağlamı önemlidir: burada peroksitli radikal katılma ve yeniden düzenlenme gerektiren iskeletler yoktur. Eten gibi simetrik bir örnekte iki uç eşdeğerdir; farklı yönlerden yazılan ürün aynı kloroetandır. Önce başlangıç karbonlarındaki H sayısını işaretle.",
        ],
      },
      {
        title: "Su katılınca hidroksil nereye gelir?",
        paragraphs: [
          "Asit katalizli basit alken hidratasyonunda H ve OH çift bağın iki karbonuna katılır. Propen örneğinde olağan ana ürün CH₃–CH(OH)–CH₃, yani 2-propanoldür. Başlangıçtaki üç karbon korunur, toplam iki H ve bir O eklenir.",
          "Etene su katılması etanol verir; ürün C₂H₆O’dur. OH’nin alkene tek başına eklenip karşı karbondaki H’nin unutulması, atom denkliğini bozar. Modelde “ürün” aşamasına geçince hem bağ mertebesi hem heteroatom bağlantısı değişir; başlangıç ve son formülü karşılaştır.",
        ],
      },
      {
        title: "Polimerleşmede monomerin yan grubunu koru",
        paragraphs: [
          "Katılma polimerleşmesinde çok sayıda uygun alken monomeri, pi bağlarının yerini alan yeni zincir bağlarıyla birleşir. Etenden oluşan tekrar birimi –CH₂–CH₂–’dir. Vinil klorürdeki Cl kaybolmaz; tekrar birimi –CH₂–CHCl– olur.",
          "Tetrafloroetenden –CF₂–CF₂– tekrar birimli PTFE oluşur. Köşeli parantez dışındaki n, tekrar sayısını gösterir; atom simgesinin altındaki sayı gibi okunmaz. Zincirin uç grupları belirtilmediğinde tekrar biriminin sayımını tüm sonlu molekülün kesin uç formülü diye sunma.",
        ],
      },
      {
        title: "Kullanım alanını yapı ile bağla",
        paragraphs: [
          "Eten, uygun meyvelerde olgunlaşma süreçlerini etkileyen bir bitki sinyalidir; kontrollü ticari olgunlaştırmada kullanılır. PE, PVC ve PTFE ise farklı yan atom ve gruplara sahip polimer örnekleridir; hepsinin kullanım özelliği aynı olmak zorunda değildir.",
          "Eten türevi çözücüler tarihsel ve endüstriyel kullanım örnekleri taşır; bir kullanım alanı, sınıfın bütün üyelerinin aynı koşulda uygun olduğu anlamına gelmez. Soru çözerken maddelerin adını karbon iskeleti, çoklu bağ ve bağlı grup bilgisine geri bağla.",
        ],
      },
      {
        title: "Bir katılma sorusunda kendini denetle",
        paragraphs: [
          "Önce çift bağı ve uçlarındaki H sayılarını bul; sonra reaktifi H₂, Br₂, HX veya su olarak ayır. Katılacak iki parçayı ilgili karbonlara yerleştir, C=C’yi tek bağ yap ve her karbonun dört bağ hesabını tamamla.",
          "Son üründe C, H ve ek atomların toplamını başlangıç + reaktif ile karşılaştır. Bir mol tek çift bağ için tüketim bir mol diatomik reaktif veya bir mol HX/sudur. Bu kontrol, ezberlenmiş ürün adına güvenmekten daha iyi yanlış yakalar; yapıyla adı birlikte doğrular.",
        ],
      },
    ],
    examples: [
      {
        title: "Bağ sayımı",
        prompt:
          "CH₂=CH–CH₂–CH₃ 1-bütenindeki sp²/sp³ karbonları ve sigma/pi sayılarını belirle.",
        strategy: "Çift bağdaki iki karbonu diğer tek bağlı karbonlardan ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Çift bağın iki C’si sp²; CH₂ ve CH₃ karbonları sp³’tür.",
          },
          {
            label: "Adım 2",
            explanation:
              "Dört C açık zincirde üç C–C sigma komşuluğu, toplam sekiz C–H sigma bağı verir.",
          },
          {
            label: "Adım 3",
            explanation: "Sigma toplamı 11; çift bağdan gelen pi sayısı 1’dir.",
          },
        ],
        answer: "2 sp² ve 2 sp³ C; 11σ/1π.",
        check:
          "CH₂=CH–CH₂–CH₃’te H toplamı 2 + 1 + 2 + 3=8’dir; her C’nin değerliği dörttür.",
        pitfall: "Molekülde bir çift bağ bulununca bütün karbonlara sp² deme.",
      },
      {
        title: "Geometrik çift mümkün mü?",
        prompt:
          "2-Penten ile 2-metil-2-büten için cis–trans çiftinin varlığını karşılaştır.",
        strategy: "Her çift bağ karbonunun bağlı iki grubunu listele.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "2-Pentende bir uç H/CH₃, öteki H/C₂H₅ taşır; iki uç kendi içinde farklıdır.",
          },
          {
            label: "Adım 2",
            explanation:
              "2-Metil-2-bütenin bir çift bağ C’sinde iki CH₃ vardır; farklı grup koşulu bozulur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Bu yüzden 2-penten geometrik çift verebilir; 2-metil-2-büten bu basit ayrımı vermez.",
          },
        ],
        answer: "2-Penten evet; 2-metil-2-büten hayır.",
        check:
          "Kararı toplam C sayısı değil her çift bağ ucundaki iki grubun farklılığı verir.",
        pitfall:
          "Bir uçtaki aynı iki metili öteki uçtaki farklarla telafi etmeye çalışma.",
      },
      {
        title: "Dallı alkenin HCl ürünü",
        prompt:
          "2-Metilpropenin olağan iyonik, peroksitsiz ve yeniden düzenlenmesiz HCl katılmasında ana ürünü bul.",
        strategy:
          "CH₂=C(CH₃)₂ yapısındaki çift bağ karbonlarının H sayısını karşılaştır.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "CH₂ ucunda iki H, diğer çift bağ C’sinde sıfır H vardır.",
          },
          {
            label: "Adım 2",
            explanation:
              "H CH₂’ye, Cl iki metile bağlı C’ye katılır; C=C tekleşir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Ürün(CH₃)₃CCl; adı 2-kloro-2-metilpropan, formülü C₄H₉Cl.",
          },
        ],
        answer: "Ana ürün 2-kloro-2-metilpropan.",
        check:
          "Başlangıç C₄H₈ + HCl toplamı C₄H₉Cl’dir; iskeletteki dört C korunur.",
        pitfall: "Cl’yi eklerken karşı karbona H eklenmesini unutma.",
      },
      {
        title: "Brom tüketiminden mol bul",
        prompt:
          "Açık zincirli, yalnız bir C=C içeren 0,15 mol saf alkenin tüm çift bağları Br₂ katılmasıyla doyuruluyor. Kaç mol Br₂ gerekir?",
        strategy: "Her pi bağını bir Br₂ ile eşleştir.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Her molekülde tek çift bağ vardır; katılacak pi bağı sayısı bir mol alken başına bir moldür.",
          },
          {
            label: "Adım 2",
            explanation:
              "Bir Br₂’den gelen iki Br, çift bağın iki karbonuna birer bağ kurar.",
          },
          {
            label: "Adım 3",
            explanation: "Bu yüzden gereken miktar 0,15×1=0,15 mol Br₂’dir.",
          },
        ],
        answer: "0,15 mol Br₂.",
        check:
          "Eğer molekülde iki bağımsız çift bağ olsaydı tüketim iki kat olurdu; bu kökte yalnız bir bağ var.",
        pitfall:
          "Br₂ içindeki iki Br’yi iki ayrı molekül alkenin tüketimi sanma.",
      },
      {
        title: "Flor gruplarını tekrar biriminde koru",
        prompt:
          "İki tetrafloroeten tekrar biriminin zincir içi atom toplamını, uç gruplarını saymadan bul.",
        strategy: "CF₂=CF₂ monomerindeki dört F’yi koru.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Bir tekrar biriminde iki C, sıfır H ve dört F vardır.",
          },
          {
            label: "Adım 2",
            explanation:
              "Pi bağı yerine omurga bağları kurulur; F ayrı ürün olarak atılmaz.",
          },
          {
            label: "Adım 3",
            explanation:
              "İki birimlik iç bölüm C₄F₈ atom toplamına sahiptir; gerçek zincir uçları ayrıca belirtilmelidir.",
          },
        ],
        answer: "İç tekrar bölümü C₄F₈; PTFE tekrar yapısı.",
        check:
          "Bu sayı uçları kapatılmış bağımsız sonlu molekülün kesin formülü değildir.",
        pitfall:
          "Tekrar birimi sayımına verilmemiş uç H veya F’lerini otomatik ekleme.",
      },
    ],
    recall: [
      {
        prompt: "C=C kaç sigma ve pi içerir?",
        answer: "Bir sigma ve bir pi; aynı iki karbon arasında.",
      },
      {
        prompt: "1-büten neden cis/trans çifti vermez?",
        answer: "Çift bağın bir karbonunda iki aynı H vardır.",
      },
      {
        prompt: "Propen + olağan HCl ana ürünü?",
        answer: "2-Kloropropan; H başlangıçta H’ce zengin uca gider.",
      },
      {
        prompt: "Katılma polimerleşmesinde Cl atılır mı?",
        answer:
          "PVC örneğinde hayır; vinil klorürün Cl’si tekrar biriminde korunur.",
      },
      {
        prompt: "CₙH₂ₙ koşulu nedir?",
        answer:
          "Açık zincir, tam bir C=C ve başka halka/çoklu bağ içermeyen hidrokarbon.",
      },
    ],
    items: [
      {
        prompt:
          "Eten CH₂=CH₂ molekülündeki toplam sigma ve pi bağ sayıları hangisidir?",
        options: [
          "6 sigma,0 pi",
          "5 sigma,1 pi",
          "3 sigma,3 pi",
          "4 sigma,2 pi",
          "1 sigma,1 pi",
        ],
        answer: 1,
        hint: "C–H bağlarını toplamın dışında bırakma.",
        explanation:
          "Etende dört C–H bağı vardır; hepsi sigma. İki C arasındaki çift bağ bir sigma ve bir pi içerir. Toplam 5 sigma ve 1 pi bulunur. Karbonların her biri iki H ve bir C komşusuna sahiptir; komşuluk sayısı ile mertebe farklıdır.",
        guidance: {
          knowledge: ["C=C bir sigma+bir pi; her C–H tek bağı bir sigmadır."],
          strategy: "Bir C–C sigma ile dört C–H sigmayı topla.",
          steps: [
            "Etende dört C–H bağı vardır; hepsi sigma.",
            "İki C arasındaki çift bağ bir sigma ve bir pi içerir.",
            "Toplam 5 sigma ve 1 pi bulunur.",
          ],
          optionReasons: [
            "Pi katkısını ikinci sigma gibi sayarak 6 sigma yazar; etenin C=C bağı 1 sigma + 1 pi içerir.",
            "Doğru. Toplam 5 sigma ve 1 pi bulunur.",
            "Üç pi için etende yeterli çoklu bağ yoktur.",
            "Çift bağ iki pi değildir; C–C sigma eksik sayılmış.",
            "Dört C–H sigmayı yok sayar.",
          ],
          commonError: "Çift bağdaki iki çizgiyi iki pi diye okumak.",
          check:
            "Karbonların her biri iki H ve bir C komşusuna sahiptir; komşuluk sayısı ile mertebe farklıdır.",
        },
      },
      {
        prompt:
          "CH₃–CH=CH₂ propeninde karbonların hibritleşme dağılımı hangisidir?",
        options: [
          "2 sp² ve 1 sp³",
          "3 sp³",
          "3 sp²",
          "2 sp ve 1 sp³",
          "1 sp² ve 2 sp",
        ],
        answer: 0,
        hint: "Hibritleşmeyi her karbonun yerel bağ çevresinden çıkar.",
        explanation:
          "CH ve CH₂ çift bağ karbonlarıdır; ikisi sp². CH₃ karbonu yalnız tek bağlarla dört sigma kurar; sp³. Dağılım 2 sp² ve 1 sp³’tür. Karbon sayıları 2 + 1=3 ile formüldeki üç C’ye geri döner.",
        guidance: {
          knowledge: [
            "Basit C=C karbonları sp²; dört tek bağlı metil C’si sp³’tür.",
          ],
          strategy: "Çift bağın iki ucunu, sonra CH₃ karbonunu işaretle.",
          steps: [
            "CH ve CH₂ çift bağ karbonlarıdır; ikisi sp².",
            "CH₃ karbonu yalnız tek bağlarla dört sigma kurar; sp³.",
            "Dağılım 2 sp² ve 1 sp³’tür.",
          ],
          optionReasons: [
            "Doğru. Dağılım 2 sp² ve 1 sp³’tür.",
            "Çift bağ karbonlarının düzlem sp² çevresini yok sayar.",
            "Metil karbonunu da çift bağ karbonu sayar.",
            "sp üçlü bağ/doğrusal çevreyle ilişkilidir; bu yapıda C≡C yok.",
            "Üçlü bağ bulunmadığı hâlde iki sp karbon atar.",
          ],
          commonError:
            "Moleküldeki tek bir çoklu bağın bütün C’leri aynı hibritleşmeye zorladığını sanma.",
          check: "Karbon sayıları 2 + 1=3 ile formüldeki üç C’ye geri döner.",
        },
      },
      {
        prompt: "CH₂=CH–CH₂–CH₃ yapısının temel adı hangisidir?",
        options: [
          "2-Büten",
          "2-Metilpropen",
          "Siklobütan",
          "1-Bütin",
          "1-Büten",
        ],
        answer: 4,
        hint: "Dört C’yi say ve çift bağı küçük numaralı uçtan başlat.",
        explanation:
          "Ana zincir dört karbonludur; büt- kökü gerekir. Çift bağ uçtan başlar; ilk bağ konumu 1’dir. Ad 1-bütendir. Dört C ve sekiz H sayımı C₄H₈’i verir; üçlü bağ olsaydı H farklı olurdu.",
        guidance: {
          knowledge: [
            "Alken adında -en, çift bağın küçük karbon numarasıyla kullanılır.",
          ],
          strategy: "Ana zincir uzunluğu ve bağ yerini ayrı belirle.",
          steps: [
            "Ana zincir dört karbonludur; büt- kökü gerekir.",
            "Çift bağ uçtan başlar; ilk bağ konumu 1’dir.",
            "Ad 1-bütendir.",
          ],
          optionReasons: [
            "Çift bağ merkezde değil, uçtadır.",
            "Ana iskelette metil dalı değil dört C’li kesintisiz zincir var.",
            "Yapı açık zincirli; halka kenarı yok.",
            "-in üçlü bağ bildirir; burada çift bağ var.",
            "Doğru. Ad 1-bütendir.",
          ],
          commonError: "Zinciri ters yazıp 3-büten adıyla farklı ürün üretme.",
          check:
            "Dört C ve sekiz H sayımı C₄H₈’i verir; üçlü bağ olsaydı H farklı olurdu.",
        },
      },
      {
        prompt: "CH₂=C(CH₃)₂ alkeninin adı hangisidir?",
        options: [
          "2-Metilpropen",
          "2-Metilpropan",
          "1-Büten",
          "2-Büten",
          "1-Penten",
        ],
        answer: 0,
        hint: "Toplam C sayısı ile seçilebilir en uzun zinciri ayır.",
        explanation:
          "Çift bağı içeren kesintisiz en uzun yol üç C’dir; propen. Kalan CH₃ ikinci karbonda daldır. Doğru ad 2-metilpropen olur. Üç ana C+bir metil C=4; formül C₄H₈ kalır.",
        guidance: {
          knowledge: [
            "Ana zincir çift bağı içermelidir; bir C’den iki dala aynı zincirde gidilemez.",
          ],
          strategy: "Çift bağı içeren üç C’li yol ve kalan metili bul.",
          steps: [
            "Çift bağı içeren kesintisiz en uzun yol üç C’dir; propen.",
            "Kalan CH₃ ikinci karbonda daldır.",
            "Doğru ad 2-metilpropen olur.",
          ],
          optionReasons: [
            "Doğru. Doğru ad 2-metilpropen olur.",
            "-an çift bağı kaldırır; başlangıç alkeni için doğru değil.",
            "1-Büten dallanmamış yapıdır; bu C’de iki metil kolu var.",
            "2-Büten dört C’nin tek kesintisiz zincirini gerektirir; bağlantılar farklı.",
            "Toplam dört C var; beş C’li penten olamaz.",
          ],
          commonError:
            "Moleküldeki tüm C’leri tek çizgisel zincire zorla yerleştirme.",
          check: "Üç ana C+bir metil C=4; formül C₄H₈ kalır.",
        },
      },
      {
        prompt:
          "Aşağıdaki basit alkenlerden hangisi cis/trans çifti oluşturabilir?",
        options: ["1-Büten", "2-Büten", "Propen", "2-Metilpropen", "Eten"],
        answer: 1,
        hint: "Her çift bağ karbonundaki iki grubun farklılığını ayrı denetle.",
        explanation:
          "Eten, propen ve 1-büten en az bir CH₂ çift bağ ucu taşır. 2-Metilpropen de aynı grup tekrarları taşır. 2-Bütende her uç H/CH₃ olduğundan cis/trans mümkündür. 2-Bütende ortak CH₃’leri aynı tarafta veya karşı tarafta yerleştirmek iki göreli düzen verir.",
        guidance: {
          knowledge: [
            "Geometrik çift için C=C’nin iki ucunda da iki farklı grup gerekir.",
          ],
          strategy: "H/H bulunan bir uç taşıyan adayları ele.",
          steps: [
            "Eten, propen ve 1-büten en az bir CH₂ çift bağ ucu taşır.",
            "2-Metilpropen de aynı grup tekrarları taşır.",
            "2-Bütende her uç H/CH₃ olduğundan cis/trans mümkündür.",
          ],
          optionReasons: [
            "Uç CH₂ karbonu geometrik ayrımı engeller.",
            "Doğru. 2-Bütende her uç H/CH₃ olduğundan cis/trans mümkündür.",
            "Uç CH₂ karbonunda H/H tekrarı vardır.",
            "Bir uç H/H, diğeri CH₃/CH₃’tür; iki uç da koşulu bozuyor.",
            "İki uçta da H/H vardır; farklı grup koşulu sağlanmaz.",
          ],
          commonError:
            "İki çift bağ karbonu bulunmasını geometrik izomerlik için yeterli sanma.",
          check:
            "2-Bütende ortak CH₃’leri aynı tarafta veya karşı tarafta yerleştirmek iki göreli düzen verir.",
        },
      },
      {
        prompt:
          "CH₃–CH=CH–CH₃ yapısında iki CH₃ grubu C=C ekseninin karşı taraflarında verilmiştir. Adlandırma hangisidir?",
        options: [
          "1-Büten",
          "cis-2-Büten",
          "trans-2-Büten",
          "2-Bütin",
          "Siklobütan",
        ],
        answer: 2,
        hint: "Önce bağlantıdaki çift bağ yerini, sonra ortak grupların yönünü belirle.",
        explanation:
          "Dört C zincirde çift bağ 2.konumdadır. İki CH₃ karşı tarafta belirtilmiştir. Bu trans-2-bütendir. Cis/trans yönü değişse de formül C₄H₈ ve bağ yeri 2 olarak kalır.",
        guidance: {
          knowledge: [
            "Karşı taraftaki ortak gruplar uygun örnekte trans düzenidir.",
          ],
          strategy: "Dört C ve merkezde C=C’yi koruyarak göreli yönü adlandır.",
          steps: [
            "Dört C zincirde çift bağ 2.konumdadır.",
            "İki CH₃ karşı tarafta belirtilmiştir.",
            "Bu trans-2-bütendir.",
          ],
          optionReasons: [
            "Çift bağ uçta değil merkezde; konum değişmemiştir.",
            "Cis ortak grupların aynı tarafta olmasını ister.",
            "Doğru. Bu trans-2-bütendir.",
            "Üçlü bağ değil çift bağ vardır.",
            "Halka bağlantısı verilmedi.",
          ],
          commonError: "Trans sözünü çift bağın zincirdeki konumu sanma.",
          check:
            "Cis/trans yönü değişse de formül C₄H₈ ve bağ yeri 2 olarak kalır.",
        },
      },
      {
        prompt:
          "Propenin olağan iyonik HCl katılmasında, peroksit/radikal koşulu ve yeniden düzenlenme yokken ana ürün nedir?",
        options: [
          "Propan",
          "2-Propanol",
          "1,2-Dikloropropan",
          "2-Kloropropan",
          "1-Kloropropan",
        ],
        answer: 3,
        hint: "H’yi başlangıçta daha çok H taşıyan çift bağ karbonuna yerleştir.",
        explanation:
          "Propenin uç CH₂’si 2H, orta CH’si 1H taşır. H uç CH₂’ye, Cl ortadaki C’ye katılır. CH₃–CHCl–CH₃ yani 2-kloropropan ana üründür. C₃H₆ + HCl toplamı C₃H₇Cl; seçilen ürün bu sayımı sağlar.",
        guidance: {
          knowledge: ["Bu basit koşulda Markovnikov yönelimi uygulanır."],
          strategy: "CH₂ ucunu ve CH ucunu ayrı etiketle.",
          steps: [
            "Propenin uç CH₂’si 2H, orta CH’si 1H taşır.",
            "H uç CH₂’ye, Cl ortadaki C’ye katılır.",
            "CH₃–CHCl–CH₃ yani 2-kloropropan ana üründür.",
          ],
          optionReasons: [
            "Cl atomunu ürün muhasebesinden çıkarır.",
            "HCl O sağlamaz; alkol ürünü bu reaktifle kurulmaz.",
            "HCl bir Cl sağlar; iki Cl içeren ürün için Br₂ benzeri yanlış sayım yapılmış.",
            "Doğru. CH₃–CHCl–CH₃ yani 2-kloropropan ana üründür.",
            "Verilen olağan yönelimin tersinde Cl’yi uç C’ye koyar.",
          ],
          commonError: "HCl’yi H₂ veya su katılmasıyla aynı ürün ailesi sanma.",
          check: "C₃H₆ + HCl toplamı C₃H₇Cl; seçilen ürün bu sayımı sağlar.",
        },
      },
      {
        prompt: "Etene Br₂ katılmasıyla oluşan ürünün bağlantısı hangisidir?",
        options: [
          "CH₃–CH₃",
          "CH₃–CHBr₂",
          "BrCH₂–CH₂Br",
          "BrCH=CHBr",
          "CH₂=CHBr",
        ],
        answer: 2,
        hint: "İki Br çift bağın iki farklı karbonuna eklenir.",
        explanation:
          "Başlangıçta iki C’nin her biri CH₂’dir. Birer Br eklenir ve aradaki bağ tek olur. Ürün BrCH₂–CH₂Br’dir. Başlangıç C₂H₄ + Br₂ → C₂H₄Br₂; üründe her C’nin dört bağı tamamdır.",
        guidance: {
          knowledge: ["Alkende bir Br₂ katılması C=C’yi C–C’ye indirir."],
          strategy: "İki karbonun her birine bir Br ekleyip eski H’leri koru.",
          steps: [
            "Başlangıçta iki C’nin her biri CH₂’dir.",
            "Birer Br eklenir ve aradaki bağ tek olur.",
            "Ürün BrCH₂–CH₂Br’dir.",
          ],
          optionReasons: [
            "Br₂’nin iki Br’sini yok sayar.",
            "İki Br’yi aynı karbona yerleştirir; bu basit katılma bağlantısı değil.",
            "Doğru. Ürün BrCH₂–CH₂Br’dir.",
            "H sayısını ikişer azaltıp çift bağı bırakır; etene Br₂ katılması böyle değildir.",
            "Bir Br eksik ve çift bağ korunmuş; yer değiştirme ürünü gibi yazılmış.",
          ],
          commonError: "Katılmada başlangıç H’lerini gereksiz çıkarmak.",
          check:
            "Başlangıç C₂H₄ + Br₂ → C₂H₄Br₂; üründe her C’nin dört bağı tamamdır.",
        },
      },
      {
        prompt:
          "0,30 mol açık zincirli tek çift bağlı alken, uygun koşulda tamamen alkana hidrojenleniyor. H₂ tüketimi kaç moldür?",
        options: ["0,60", "0,30", "1,00", "0,90", "0,15"],
        answer: 1,
        hint: "Her molekülde yalnız bir pi bağı var.",
        explanation:
          "Her alken tek C=C taşır. Bu bağın doyurulması bir H₂ gerektirir. 0,30×1=0,30 mol H₂ tüketilir. 0,30 mol H₂ toplam 0,60 mol H atomu sağlar; her alkenin iki C’sine birer H gider.",
        guidance: {
          knowledge: ["Bir mol basit C=C için tam doyurmada 1 mol H₂ gerekir."],
          strategy: "Alken molünü molekül başına tüketimle çarp.",
          steps: [
            "Her alken tek C=C taşır.",
            "Bu bağın doyurulması bir H₂ gerektirir.",
            "0,30×1=0,30 mol H₂ tüketilir.",
          ],
          optionReasons: [
            "Alkinin iki pi tüketimini buraya taşır.",
            "Doğru. 0,30×1=0,30 mol H₂ tüketilir.",
            "Başlangıç alken miktarını hesaba katmadan 1 mol alır.",
            "Kökte bulunmayan üç tüketim birimi ekler.",
            "H₂’de iki H bulunmasını iki alkeni doyurma gibi yorumlar.",
          ],
          commonError:
            "H₂ atom adediyle H₂ molekül molünü birbirine karıştırma.",
          check:
            "0,30 mol H₂ toplam 0,60 mol H atomu sağlar; her alkenin iki C’sine birer H gider.",
        },
      },
      {
        prompt:
          "Propenin asit katalizli olağan su katılması ana ürününü hangi yapı gösterir?",
        options: [
          "CH₃–O–CH₃",
          "CH₃–CO–CH₃",
          "CH₃–CH(OH)–CH₃",
          "CH₃–CH₂–CH₂OH",
          "CH₂=CH–CH₂OH",
        ],
        answer: 2,
        hint: "Su H ve OH olarak çift bağ karbonlarına eklenir; karbon iskeleti korunur.",
        explanation:
          "H uç CH₂’ye katılarak onu CH₃ yapar. OH orta CH karbonuna bağlanır; C=C tekleşir. Ürün CH₃–CH(OH)–CH₃ yani 2-propanoldür. C₃H₆ + H₂O=C₃H₈O; ürün üç C’li doymuş monoalkol sayımını sağlar.",
        guidance: {
          knowledge: [
            "Basit propen hidratasyonu Markovnikov yönelimiyle 2-propanol verir.",
          ],
          strategy: "OH’yi H’ce fakir çift bağ karbonuna ekle.",
          steps: [
            "H uç CH₂’ye katılarak onu CH₃ yapar.",
            "OH orta CH karbonuna bağlanır; C=C tekleşir.",
            "Ürün CH₃–CH(OH)–CH₃ yani 2-propanoldür.",
          ],
          optionReasons: [
            "İki C’li eter; C iskeletini ve C sayısını değiştirmiş.",
            "Bu keton; basit alken hidratasyonunda C=O son ürünü kurulmaz.",
            "Doğru. Ürün CH₃–CH(OH)–CH₃ yani 2-propanoldür.",
            "Olağan verilen yönelimin tersindeki 1-propanoldür.",
            "Başlangıç çift bağını koruyup suyu yanlış yere ekler.",
          ],
          commonError:
            "Alkinin enol → keton hidratasyon sonucunu alkene taşımak.",
          check:
            "C₃H₆ + H₂O=C₃H₈O; ürün üç C’li doymuş monoalkol sayımını sağlar.",
        },
      },
      {
        prompt:
          "Vinil klorür CH₂=CHCl’den katılma polimerleşmesinde tekrar birimi hangisidir?",
        options: [
          "–CHCl–CHCl–",
          "–CH₂–CH₂–",
          "–CF₂–CF₂–",
          "–CH₂–CHCl–",
          "–CH=CH–",
        ],
        answer: 3,
        hint: "Monomerin bağlı Cl’sini koru; çift bağın yerini zincir bağları alır.",
        explanation:
          "Monomerin ilk C’si CH₂, ikincisi CHCl’dir. Pi bağı yerine zincir omurgasının sigma bağlantıları oluşur. Tekrar birimi –CH₂–CHCl– olur. Her iç tekrar biriminde 2C,3H,1Cl kalır; başlangıç monomer atomları korunur.",
        guidance: {
          knowledge: [
            "Katılma polimerleşmesinde bu monomerden küçük molekül atılması gerekmez.",
          ],
          strategy: "İki C üzerindeki H/Cl’yi yerinde tut.",
          steps: [
            "Monomerin ilk C’si CH₂, ikincisi CHCl’dir.",
            "Pi bağı yerine zincir omurgasının sigma bağlantıları oluşur.",
            "Tekrar birimi –CH₂–CHCl– olur.",
          ],
          optionReasons: [
            "İlk C’ye fazladan bir Cl ekler.",
            "Cl’yi kaybederek polietilen birimini yazar.",
            "Cl ve H yerine F uydurur; PTFE farklı monomerdendir.",
            "Doğru. Tekrar birimi –CH₂–CHCl– olur.",
            "H ve Cl’yi eksiltip çift bağı korur; PVC’nin basit tekrar birimi değil.",
          ],
          commonError: "Polimerleşmeyi monomer yan grubunun kopması sanma.",
          check:
            "Her iç tekrar biriminde 2C,3H,1Cl kalır; başlangıç monomer atomları korunur.",
        },
      },
      {
        prompt:
          "Tetrafloroeten CF₂=CF₂ katılma polimerleşmesi veriyor. Ürün örneği hangisidir?",
        options: ["Polietilen", "Etanol", "PVC", "Siklohekzan", "PTFE"],
        answer: 4,
        hint: "Tekrar birimindeki atom türlerini monomere bağla.",
        explanation:
          "Monomerde iki C ve dört F vardır. Çift bağ zincir bağlarına dönüşürken F’ler kalır. Bu tekrar yapısı PTFE’ye aittir. Üç tekrar bölümünde 6C/12F sayımı korunur; uç gruplar ayrıca belirtilir.",
        guidance: {
          knowledge: ["CF₂=CF₂’nin tekrar birimi –CF₂–CF₂–’dir."],
          strategy: "F atomlarının yerinde kaldığı polimeri seç.",
          steps: [
            "Monomerde iki C ve dört F vardır.",
            "Çift bağ zincir bağlarına dönüşürken F’ler kalır.",
            "Bu tekrar yapısı PTFE’ye aittir.",
          ],
          optionReasons: [
            "Polietilen etenden gelir; tekrar biriminde H bulunur.",
            "Etanol küçük O’lu moleküldür; ne F ne polimer omurgası taşır.",
            "PVC vinil klorürden gelir; Cl içerir.",
            "Doymuş altı C halkasıdır; bu polimer tekrar yapısı değil.",
            "Doğru. Bu tekrar yapısı PTFE’ye aittir.",
          ],
          commonError: "F ve Cl halojenlerini aynı polimer kimliği sayma.",
          check:
            "Üç tekrar bölümünde 6C/12F sayımı korunur; uç gruplar ayrıca belirtilir.",
        },
      },
      {
        prompt:
          "Açık zincirli ve yalnız iki C=C taşıyan bir hidrokarbonun formülü için hangi ifade uygundur?",
        options: ["Her zaman C₆H₆", "CₙH₂ₙ", "CₙH₂ₙ₊₂", "CₙH₂ₙ₋₄", "CₙH₂ₙ₋₂"],
        answer: 4,
        hint: "Açık doymuş zincire göre her çift bağ iki H eksiltir.",
        explanation:
          "Doymuş açık referans H=2 n + 2. İki C=C toplam 4H eksiltir. H=2 n−2 olduğundan CₙH₂ₙ₋₂ elde edilir. 1,3-bütadien için n 4 verir:H6; gerçek CH₂=CH–CH=CH₂ ile eşleşir.",
        guidance: {
          knowledge: ["İki çift bağ toplam dört H eksikliğine karşılık gelir."],
          strategy: "2 n + 2’den 4 çıkar.",
          steps: [
            "Doymuş açık referans H=2 n + 2.",
            "İki C=C toplam 4H eksiltir.",
            "H=2 n−2 olduğundan CₙH₂ₙ₋₂ elde edilir.",
          ],
          optionReasons: [
            "Karbon sayısı ve başka bilgiler verilmeden tek bir formül sabitlenemez.",
            "Tek çift bağ veya tek halka eşdeğeridir.",
            "Doymuş açık alkan formülüdür; pi bağları yok sayar.",
            "Üç eksiklik eşdeğeri verir; kökte yalnız iki var.",
            "Doğru. H=2 n−2 olduğundan CₙH₂ₙ₋₂ elde edilir.",
          ],
          commonError:
            "“En az bir çift bağ” tanımına tek çift bağın genel formülünü koşulsuz ekleme.",
          check:
            "1,3-bütadien için n 4 verir:H6; gerçek CH₂=CH–CH=CH₂ ile eşleşir.",
        },
      },
      {
        prompt:
          "Dört farklı grup taşıyan bir C=C’de her uç kendi içinde iki farklı gruba sahiptir. Hangisi doğru sınır ifadesidir?",
        options: [
          "E/Z ayrımı mümkün olabilir; basit ortak gruplu cis/trans adı yeterli olmayabilir",
          "Hiçbir geometrik ayrım mümkün değildir",
          "Molekül mutlaka alkan olur",
          "İki uçtan birinde mutlaka aynı grup vardır",
          "Çift bağ serbestçe döner",
        ],
        answer: 0,
        hint: "Geometrik ayrımın koşuluyla kullanılan adlandırma yöntemini ayır.",
        explanation:
          "İki uçta da farklı gruplar verildiği için temel koşul sağlanır. Dört grup farklıysa ortak grupları aynı/karşı tarafa koyma dili yeterli olmayabilir. Bu durumda E/Z gibi öncelik temelli ayrım mümkün olabilir. Ekrandaki 2-büten modeli ortak CH₃’lü basit örnektir; genel tüm E/Z yapılarının modeli değildir.",
        guidance: {
          knowledge: [
            "Her çift bağ karbonundaki iki grubun farklılığı dönme kısıtlı geometrik ayrım için temel koşuldur.",
          ],
          strategy:
            "Ortak bir grup olmamasını dönme serbestliğiyle karıştırma.",
          steps: [
            "İki uçta da farklı gruplar verildiği için temel koşul sağlanır.",
            "Dört grup farklıysa ortak grupları aynı/karşı tarafa koyma dili yeterli olmayabilir.",
            "Bu durumda E/Z gibi öncelik temelli ayrım mümkün olabilir.",
          ],
          optionReasons: [
            "Doğru. Bu durumda E/Z gibi öncelik temelli ayrım mümkün olabilir.",
            "Cis/trans adının yetersizliğini bütün geometrik ayrımın yokluğu sanır.",
            "Çift bağ verildiği hâlde doymuş alkan sonucu çıkarır.",
            "Kökte her uç kendi içinde farklı deniyor; aynı grup uydurur.",
            "Pi bağının dönme kısıtı grupların adları farklı diye kalkmaz.",
          ],
          commonError:
            "Dört farklı grupta cis/trans etiketi veremeyince stereokimyanın tamamen yok olduğunu söyleme.",
          check:
            "Ekrandaki 2-büten modeli ortak CH₃’lü basit örnektir; genel tüm E/Z yapılarının modeli değildir.",
        },
      },
      {
        prompt:
          "Cis/trans çiftinin bağlanma farkı olmadan ayrı kalmasının temel nedeni hangisidir?",
        options: [
          "C–H sigma bağlarının hiç bulunmaması",
          "Çift bağın iki ayrı molekül arasında olması",
          "Her cis yapının iyonik olması",
          "C=C çevresinde dönmenin pi örtüşmesini bozmayı gerektirmesi",
          "İki yapının C sayısının farklı olması",
        ],
        answer: 3,
        hint: "Çift bağın ikinci örtüşmesinin yönünü düşün.",
        explanation:
          "Sigma ekseni dışında yan yana p örtüşmesi vardır. Serbest dönme bu pi örtüşmesini bozar. Bu dönme kısıtı uygun grupların cis/trans düzenlerini ayırır. 2-Bütendeki aynı/karşı CH₃ düzenini yalnız kağıdı döndürerek birbirine çeviremezsin.",
        guidance: {
          knowledge: ["Pi örtüşmesi uygun p orbital yönlenmesine bağlıdır."],
          strategy: "Tek bağ dönmesi ile çift bağ dönmesini karşılaştır.",
          steps: [
            "Sigma ekseni dışında yan yana p örtüşmesi vardır.",
            "Serbest dönme bu pi örtüşmesini bozar.",
            "Bu dönme kısıtı uygun grupların cis/trans düzenlerini ayırır.",
          ],
          optionReasons: [
            "Alken örneklerinde C–H sigma bağları bulunabilir.",
            "C=C burada tek molekül içindeki iki C arasındadır.",
            "Cis düzeni iyonik bağ zorunluluğu getirmez.",
            "Doğru. Bu dönme kısıtı uygun grupların cis/trans düzenlerini ayırır.",
            "İzomerlerin C sayıları aynı olabilir; temel neden bu değildir.",
          ],
          commonError:
            "Bağ ekseni var diye her bağ çevresindeki dönmeyi aynı serbestlikte sanma.",
          check:
            "2-Bütendeki aynı/karşı CH₃ düzenini yalnız kağıdı döndürerek birbirine çeviremezsin.",
        },
      },
    ],
    source:
      "MEBİ AYT Kimya: Hidrokarbonlar, Aromatik Hidrokarbonlar ve Alkoller; OGM ilgili Organik Bileşikler sunuları ve Dersler Cepte hedef öğretim sayfalarıyla karşılaştırılarak yazılmış özgün anlatım, şema, örnek ve sorular. Resmî sınav sorusu değildir.",
  },
  {
    id: "ayt-alkinler",
    topic: "detail-452",
    title: "Alkinler: üçlü bağı adım adım dönüştür",
    minutes: 65,
    objectives: [
      "Üçlü bağın yerini, sp çevresini ve uç/iç alkin ayrımını bul.",
      "Bir ve iki eşdeğer katılmayı farklı ürünlerle açıkla.",
      "Enol–karbonil dönüşümünü ve metal tuzu testinin gerçek kimyasını ayır.",
    ],
    sections: [
      {
        title: "Üçlü bağ yeni bir aile açar",
        paragraphs: [
          "Alkinler C≡C bağı taşıyan hidrokarbonlardır. Açık zincirli, yalnız bir üçlü bağlı ve başka halka/çoklu bağı olmayan örneklerin formülü CₙH₂ₙ₋₂’dir. İlk üye etin, yaygın adı asetilen, C₂H₂ biçimindedir.",
          "Etan C₂H₆, eten C₂H₄ ve etin C₂H₂ karşılaştırmasında iki karbon arasındaki bağ mertebesi artarken H sayısı ikişer azalır. “Alkin” sözü üçlü bağ bulunmasını söyler; her olası alkin türevinin aynı genel formüle uyduğunu söylemez. Ek halka veya pi bağı ayrıca sayılır.",
        ],
      },
      {
        title: "Bir sigma, birbirine dik iki pi",
        paragraphs: [
          "C≡C üçlü bağı bir sigma ve iki pi bağı içerir. Üçlü bağdaki karbonlar iki sp hibrit orbitaliyle doğrusal komşuluk oluşturur; kalan iki p orbitali iki farklı pi örtüşmesine katılır. Bu yerel çevrede bağ açısı yaklaşık 180°’dir.",
          "Propinde CH₃–C≡CH, üçlü bağdaki iki karbon sp, CH₃ karbonu sp³’tür. Bir molekülde farklı hibritleşmeler bulunabilir. Üçlü bağın yanındaki C–C sigma çizgisi ile C≡C eksenini doğrusal düşün; sayfadaki rastgele zikzak çizim, sp karbonun gerçek yerel açısı değildir.",
        ],
      },
      {
        title: "Bağları atom komşuluğuyla say",
        paragraphs: [
          "Etinde iki C–H sigma ve bir C–C sigma, ayrıca iki pi vardır; toplam üç sigma, iki pi. Propinde dört C–H ve iki C–C sigma vardır; toplam altı sigma, iki pi.",
          "Açık zincirli tek üçlü bağlı CₙH₂ₙ₋₂ için sigma sayısı (n−1)+(2 n−2)=3 n−3 olur. Bu kısa sonuç, C–C komşuluğunu bir kez sayar; üçlü bağdaki diğer iki çizgi pi’ye aittir. Halojenli veya oksijenli bir üründe aynı formülü doğrudan kullanma; gerçek bağlantıları tekrar say.",
        ],
      },
      {
        title: "Alkinin ana zincirini seç",
        paragraphs: [
          "Üçlü bağı içeren uygun en uzun karbon zinciri ana zincirdir. Üçlü bağa en küçük numarayı veren uçtan numarala; üçlü bağın iki karbonundan küçük numara bağın yeridir. Ana alkan adındaki -an yerine -in kullanılır.",
          "CH≡C–CH₂–CH₃ 1-bütin, CH₃–C≡C–CH₃ 2-bütindir. Eşit çoklu bağ konumunda yan grupların numara dizisi ve gereken yerde alfabetik öncelik değerlendirilir. Düz zinciri ters yazınca oluşan 3-bütin çizimi yeni bir izomer değil 1-bütinin ters yönüdür.",
        ],
      },
      {
        title: "Özel ad ve açık uçlu gruplar",
        paragraphs: [
          "Asetilen merkez alınarak iki yandaki alkil gruplarıyla yaygın ad verilebilir. CH₃–C≡CH metil asetilen, CH₃–C≡C–CH₃ dimetil asetilendir. Bu adların ikisi de aynı toplam C sayısına sahip değildir; her alkili merkezin iki karbonuna ekle.",
          "HC≡C– grubu etinildir; sondaki bağ çizgisi başka atoma bağlanma yerini gösterir. Bir alkenil veya alkil grubunu alkinin yanına bağlamak ek pi bağları oluşturabilir. Böyle bir yapının formülünde yalnız bir üçlü bağ varmış gibi davranmak eksik H hesabına yol açar.",
        ],
      },
      {
        title: "Uç alkin ile iç alkini ayır",
        paragraphs: [
          "Üçlü bağ karbonlarından birine doğrudan H bağlıysa uç alkin vardır. Propin CH₃–C≡CH bu koşulu sağlar. 2-Bütinde üçlü bağın iki karbonu da alkil grubuna bağlıdır ve doğrudan üçlü bağ karbonuna bağlı H yoktur; bu bir iç alkindir.",
          "Etinde iki uç karbonun ikisi de H taşır. Uç ayrımı molekülün sayfada uçta durmasıyla değil bu doğrudan bağlantıyla yapılır. 2-Bütinin CH₃ gruplarında H bulunması onu uç alkin yapmaz; o H’ler sp³ karbonlara bağlıdır.",
        ],
      },
      {
        title: "Uç H’nin farklı davranışı",
        paragraphs: [
          "Uç alkinin sp karbonuna bağlı H, alken ve alkan H’lerine göre daha asidik davranabilir. Yükün daha yüksek s karakterli orbitalle ilişkisi bu farkı açıklar. Bu göreli asitlik, alkinin suda kuvvetli asit gibi tümüyle iyonlaşacağı anlamına gelmez.",
          "Uygun metal iyonlu ayıraçlarla terminal H’nin yerini metal içeren bağın alması, bazı uç alkinlerin ayırt edilmesini sağlar. İç alkinin ilgili H’si bulunmadığından aynı tepkimeyi beklemeyiz. Deney adını değil çözeltinin kimyasal türünü ve terminal bağını birlikte kontrol et.",
        ],
      },
      {
        title: "Asetilenin kaynağı ve kullanımını bağla",
        paragraphs: [
          "Kalsiyum karbürün suyla tepkimesinde asetilen ve kalsiyum hidroksit oluşması bir endüstriyel hammadde ilişkisidir: CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂. Karbürdeki iki C’nin üründe iki C olarak kaldığını, H ve O sayılarını ayrı kontrol et.",
          "Asetilenin oksijenle yanmasından yararlanılarak metal kaynak ve kesme işlemleri yapılabilir. Bu ders tepkimelerin kavramsal sayımını öğretir; deney kurulumu veya üretim uygulaması istemez. Kaynak kullanımını öğrenirken bunun oksijenli yanma olduğunu, her alkinin aynı fiziksel gaz koşullarında olmadığını ayır.",
        ],
      },
      {
        title: "Bir eşdeğer ile iki eşdeğer aynı değil",
        paragraphs: [
          "Üçlü bağın iki pi bağı olduğundan tamamen doyması iki mol H₂ gerektirir. Bir mol alkin, uygun seçici koşulda bir mol H₂ alırsa alken aşamasında tutulabilir; iki mol H₂ ile alkana kadar doyurulabilir.",
          "Kısmi hidrojenlemede yalnız “Pd yazılmış” diye durma garantisi verilmez; seçici katalizör ve durdurma koşulu gerekir. Örneğin uygun Lindlar koşulu alken elde etmede kullanılır. Modeldeki basamaklar bu seçilmiş ürünleri gösterir, yalnız reaktif miktarıyla tüm gerçek katalitik seçiciliğin çözüldüğünü iddia etmez.",
        ],
      },
      {
        title: "Brom katılmasının iki basamağı",
        paragraphs: [
          "Etine bir mol Br₂ katılması, üçlü bağı çift bağa indirerek C₂H₂Br₂ formüllü dibromoalken verir. İkinci mol Br₂ de katılırsa kalan pi bağı gider ve C₂H₂Br₄ oluşur. Başlangıçtaki iki H bu katılmalar sırasında kaybolmaz.",
          "Her basamakta birer Br, çoklu bağın iki karbonuna yerleşir. Birinci basamak ürünündeki bütün geometrik ayrıntılar burada nicel seçicilik olarak modellenmez. Mol hesabında bir üçlü bağ için en fazla iki mol Br₂ katılmasını, bir çift bağ için bir mol tüketiminden ayır.",
        ],
      },
      {
        title: "HCl katılmasından polimer öncülüne",
        paragraphs: [
          "Etine bir mol HCl katılmasıyla CH₂=CHCl, yani vinil klorür elde edilebilir. Bir pi bağı kalmıştır; ürün alkendir. İkinci HCl katılması uygun koşulda CH₃–CHCl₂ gibi doymuş ürüne götürür; tek ve çift katılmayı ayrı düşün.",
          "Vinil klorür katılma polimerleşmesiyle PVC’nin tekrar birimini oluşturur. Bu zincirdeki Cl atomu monomerden gelir; polimer oluşurken HCl’nin tekrar her birime eklenmesi gerekmez. Ürün adını, çoklu bağın kalan sayısı ve atom korunumu ile doğrula.",
        ],
      },
      {
        title: "Su katılınca önce enolü gör",
        paragraphs: [
          "Asit/Hg²⁺ katalizli klasik alkin hidratasyonunda önce çift bağ ve ona bağlı OH taşıyan enol düşünülür. Etinden oluşan CH₂=CHOH, atom yerleşimi değişerek karbonil içeren CH₃CHO’ya, yani etanale dönüşür.",
          "Enol–karbonil dönüşümünde molekülün C, H ve O sayıları değişmez; H’nin yeri ve pi bağının konumu değişir. Enolü son ürün diye bırakma. Modelde başlangıç, enol ve karbonil ayrı basamaklardır; bir reaktif eklenmesi ile aynı formüllü yeniden düzenlenme ayrı gösterilir.",
        ],
      },
      {
        title: "Etin istisnasını koşulu ile öğren",
        paragraphs: [
          "Klasik asit/Hg²⁺ hidratasyonunda etin etanal verir. Propin gibi daha büyük terminal alkin ise olağan Markovnikov yönelimi ve enol dönüşümüyle ketona gider; propinin ürünü propanondur. Simetrik 2-bütin 2-bütanon verir.",
          "Bu anlatımın dışındaki hidroborasyon–yükseltgenme gibi yöntemler farklı yönelimle ürün verebilir. Bu yüzden “bütün alkinlere her türlü su ekleme işlemi keton verir” genellemesi kurulmaz. Soru kökünde yöntem verildiyse o yöntemin koşullarını kullan; etinin aynı yöntemdeki aldehit ürününü unutma.",
        ],
      },
      {
        title: "Üç molekülden bir aromatik halka",
        paragraphs: [
          "Asetilenin uygun koşullardaki siklotrimerleşmesi üç C₂H₂ biriminin C₆H₆ olarak birleşmesidir. Karbon ve H toplamı korunur: 3×C₂H₂=C₆H₆. Oluşan benzen, üç ayrı asetilenin yan yana çizimi değil yeni halkalı bağlanmadır.",
          "Trimerleşmeyle oluşan aromatik bağlanmayı, açık zincirli katılma polimerleşmesiyle karıştırma. Birinde üç birimle belirli bir altı karbonlu halka, diğerinde çok sayıda tekrar birimiyle uzun zincir düşünülür. Aynı “birleşme” sözü bağ topolojisini tek başına belirlemez.",
        ],
      },
      {
        title: "Metal tuzu testi ile aldehit testini ayır",
        paragraphs: [
          "Uç alkin, uygun amonyaklı Ag(I) ortamında gümüş asetilür türü çökelek verebilir. Burada terminal H yerine metal bağlanması söz konusudur; aldehitlerin Tollens testindeki metalik gümüş aynasıyla aynı ürün değildir.",
          "Bazı okul notları amonyaklı Cu(I) çözeltisine “Fehling” adını verir; kimyasal olarak bu ikisini ayır. Standart Fehling çözeltisi bazik Cu(II)–tartrat ortamıdır ve aldehit oksidasyonunda Cu₂O çökeleğiyle anılır. Bir test sorusunda ayıracın formülü ve gözlenen ürün, yalnız günlük addan daha belirleyicidir.",
        ],
      },
      {
        title: "İzomerlikte üç olasılık düşün",
        paragraphs: [
          "C₄H₆, açık zincirde bir üçlü bağla 1-bütin veya 2-bütin olarak yazılabilir. Aynı formül, iki çift bağlı 1,3-bütadien veya bir halka ve bir çift bağlı siklobüten için de mümkündür. Hepsi aynı hidrojen eksikliği toplamını farklı bağlanmayla sağlar.",
          "Üçlü bağın ekseni çevresinde basit cis–trans alken çifti arama; sp merkezindeki doğrusal düzen bu biçimde iki grup yönelişi oluşturmaz. Molekülün başka bir yerinde ayrı çift bağ veya başka stereojenik unsur bulunması ise ayrıca değerlendirilir.",
        ],
      },
      {
        title: "Karışım sorusunda iki ayrı tüketim denkliği",
        paragraphs: [
          "Bir mol eten bir mol, bir mol etin iki mol H₂ alarak tamamen doyar. x mol eten ile y mol etinden oluşan karışımın tam doyması için x + 2 y mol H₂ gerekir. Toplam başlangıç molü ayrıca x+y’dir.",
          "İki bilinmeyen için toplam mol ve H₂ tüketimi gibi iki bağımsız bilgi gerekir. Sadece brom renginin kaybolması, iki türü nicel olarak ayırmaz. Birinci ve ikinci pi bağlarını ayrı saymak, ezberlenmiş iki denklemden daha anlamlı bir çözüm yolu kurar.",
        ],
      },
      {
        title: "Modelden son ürünü açıklamaya geç",
        paragraphs: [
          "Etin, propin veya 2-bütini seç; ardından H₂, Br₂ ya da su yolunu aç. Basamak değiştiğinde gerçek bağ mertebeleri, H sayısı ve gerekiyorsa O bağlantısı değişir. Başlangıç formülü ile her ürünün formülünü karşılaştır.",
          "Kendi açıklamanda üç şeyi söyle: kaç pi bağı kaldı, kaç mol reaktif eklendi ve son ürün hangi sınıfta? Su yolunun ikinci basamağında ek bir su tüketilmediğini, yalnız enolün karbonile dönüştüğünü belirt. Bu model bir tepkime süresi veya puan üretmez; kavramı sınayacağın bir yapı gösterir.",
        ],
      },
      {
        title: "Kireç taşından asetilene atom muhasebesi",
        paragraphs: [
          "Kaynak zincirinde CaCO₃ → CaO + CO₂ kireç taşından sönmemiş kirece geçişi gösterir. Ca, C ve O sayıları iki yanda korunur: bir Ca, bir C ve üç O vardır. Ardından CaO + 3C → CaC₂ + CO denkliğinde iki C karbürde, biri CO içinde yer alır.",
          "Son halka CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂ biçimindedir. Burada suyun dört H atomunun ikisi asetilene, ikisi kalsiyum hidroksite gider; iki O da hidroksit üründe kalır. Bu zincir kavramsal denklem ve kaynak ilişkisi anlatımıdır; üretim kurulumu veya deney uygulaması vermez.",
        ],
      },
    ],
    examples: [
      {
        title: "İç alkinin iki hidrojenleme basamağı",
        prompt:
          "1 mol 2-bütin için uygun seçici Lindlar hidrojenlemesini ve alkana kadar tam hidrojenlemeyi karşılaştır.",
        strategy: "C≡C’deki iki pi bağını ve seçici koşulun yönünü ayrı tut.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Başlangıç C₄H₆’da 2 pi vardır; uygun Lindlar yolunda 1 mol H₂ ile cis-2-büten C₄H₈ elde edilir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Tam hidrojenlemede toplam 2 mol H₂ ile bütan C₄H₁₀ oluşur; pi kalmaz.",
          },
          {
            label: "Adım 3",
            explanation:
              "İlk ve tam yolun H₂ gereği 1 ve 2 mol; karbon sayısı her ikisinde 4’tür.",
          },
        ],
        answer: "Seçici ilk yol:cis-2-büten; tam yol:bütan.",
        check:
          "İlk aşamada durma ve cis seçiciliği verilen katalizör koşuluna aittir; her Pd ortamına genellenmez.",
        pitfall:
          "İkinci yola toplam tüketim yerine ilk tüketimi tekrar ekleyip 3 mol yazma.",
      },
      {
        title: "Bromla iki basamak",
        prompt:
          "0,20 mol propinin yalnız ilk Br₂ katılması ile tam iki Br₂ katılmasını karşılaştır.",
        strategy: "Her basamak C–C bağ mertebesini bir azaltır; H’leri korur.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "İlk basamak için 0,20 mol Br₂ gerekir; C₃H₄Br₂ oluşur ve bir pi kalır.",
          },
          {
            label: "Adım 2",
            explanation:
              "Tam doyurma için toplam 0,40 mol Br₂ gerekir; C₃H₄Br₄ oluşur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Her iki yolda başlangıçtaki dört H korunur; Br eklenmesi H₂ eklenmesi değildir.",
          },
        ],
        answer: "İlk:0,20 mol; tam:0,40 mol Br₂.",
        check: "Tam ürün başına dört Br atomu vardır; iki Br₂ bunu sağlar.",
        pitfall: "Katılan Br atomlarını H artışı gibi yorumlama.",
      },
      {
        title: "Enol ile son ürünü ayır",
        prompt:
          "Klasik asit/Hg²⁺ hidratasyonunda 2-bütinden oluşan enol ve karbonil ürününü yaz.",
        strategy:
          "Simetrik iç alkinin iki ucunun eşdeğerliğini, sonra H/pi bağı yer değişimini kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "CH₃–C≡C–CH₃’e H/OH katılınca CH₃–C(OH)=CH–CH₃ enolü düşünülür.",
          },
          {
            label: "Adım 2",
            explanation:
              "Enol dönüşümünde OH üzerindeki H diğer çift bağ C’sine geçer; C=C yerine C=O oluşur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Son ürün CH₃–CO–CH₂–CH₃ yani 2-bütanondur; iki türün formülü C₄H₈O.",
          },
        ],
        answer: "Enol üzerinden 2-bütanon; formül C₄H₈O korunur.",
        check:
          "İkinci adımda yeni bir su katılmaz; enol ve karbonilde atom sayısı aynıdır.",
        pitfall: "Enoldeki OH’yi görüp son ürünü sıradan alkol diye bırakma.",
      },
      {
        title: "İki hidrokarbonu nicel ayır",
        prompt:
          "Toplam 0,60 mol eten/etin karışımı tamamen doymak için 0,90 mol H₂ alıyor. Mol miktarlarını bul.",
        strategy:
          "Toplam mol ve pi-bağ tüketimi için iki bağımsız denklem yaz.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Eten x, etin y olsun:x+y=0,60.",
          },
          {
            label: "Adım 2",
            explanation:
              "Tam doyurmada bir eten 1, bir etin 2H₂ alır:x + 2 y=0,90.",
          },
          {
            label: "Adım 3",
            explanation: "İki denklemi çıkar:y=0,30; x=0,30 mol.",
          },
        ],
        answer: "0,30 mol eten ve 0,30 mol etin.",
        check:
          "0,30 + 0,30=0,60; 0,30 + 2×0,30=0,90 ile iki veri ayrı doğrulanır.",
        pitfall:
          "Toplam karışım molünü H₂ tüketimiyle eşitleyerek etini yok sayma.",
      },
      {
        title: "Uç H’nin yerini bul",
        prompt:
          "1-bütin CH≡CCH₂CH₃ ile 2-pentin CH₃C≡CCH₂CH₃’ü, uygun amonyaklı Ag(I) ortamındaki terminal-H yolu açısından karşılaştır.",
        strategy: "Üçlü bağın karbonuna doğrudan bağlı H arayarak karar ver.",
        steps: [
          {
            label: "Adım 1",
            explanation: "1-Bütindeki uç sp karbon bir H taşır.",
          },
          {
            label: "Adım 2",
            explanation:
              "2-Pentinin iki sp C’si de karbon grubuna bağlıdır; terminal H yoktur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Verilen uç alkin testi 1-bütinde beklenir; 2-pentinde aynı terminal-H yolu yoktur.",
          },
        ],
        answer: "1-Bütin terminal-H örneği; 2-pentin iç alkindir.",
        check:
          "Metil ve metilendeki H’lerin sp C’ye doğrudan bağlı olmadığını bağlantıdan göster.",
        pitfall:
          "Aldehitteki gümüş aynasıyla alkinin asetilür çökeleğini aynı ürün sayma.",
      },
    ],
    recall: [
      {
        prompt: "Üçlü bağın pi sayısı?",
        answer: "İki; sigma sayısı bir.",
      },
      {
        prompt: "2-bütinin CH₃ H’leri onu uç alkin yapar mı?",
        answer:
          "Hayır; H’nin doğrudan üçlü bağ karbonuna bağlı olması gerekir.",
      },
      {
        prompt: "Etinin tam doymasında H₂ tüketimi?",
        answer: "Bir mol etin için toplam iki mol H₂.",
      },
      {
        prompt: "Klasik etin hidratasyonunda son sınıf?",
        answer: "Enol üzerinden etanal; aldehit.",
      },
      {
        prompt: "Fehling ile amonyaklı Cu(I) aynı mı?",
        answer:
          "Hayır; standart Fehling bazik Cu(II)–tartrattır; uç alkin tuzu testi ayrı kimyasal ortamdır.",
      },
    ],
    items: [
      {
        prompt: "Etin HC≡CH molekülünde kaç sigma ve pi bağı vardır?",
        options: [
          "5 sigma,0 pi",
          "2 sigma,3 pi",
          "3 sigma,2 pi",
          "1 sigma,2 pi",
          "4 sigma,1 pi",
        ],
        answer: 2,
        hint: "İki C–H sigma bağını üçlü bağın tek sigmasına ekle.",
        explanation:
          "İki C–H bağı 2 sigma verir. C≡C’den 1 sigma ve 2 pi gelir. Toplam 3 sigma ve 2 pi vardır. Toplam elektron çifti bağ mertebesi 5; 3 sigma + 2 pi buna eşittir.",
        guidance: {
          knowledge: ["Bir C≡C bir sigma+iki pi içerir."],
          strategy: "C–H ve C–C örtüşmelerini ayrı say.",
          steps: [
            "İki C–H bağı 2 sigma verir.",
            "C≡C’den 1 sigma ve 2 pi gelir.",
            "Toplam 3 sigma ve 2 pi vardır.",
          ],
          optionReasons: [
            "Bütün bağ mertebelerini sigmaya sayar; iki pi yok sayılır.",
            "C–C sigmayı eksiltip pi sayısını artırır.",
            "Doğru. Toplam 3 sigma ve 2 pi vardır.",
            "İki C–H sigmayı dışarıda bırakır.",
            "Alkenin bir pi düzenini üçlü bağa taşır.",
          ],
          commonError: "Üç çizgiyi üç pi bağı sanmak.",
          check:
            "Toplam elektron çifti bağ mertebesi 5; 3 sigma + 2 pi buna eşittir.",
        },
      },
      {
        prompt:
          "CH₃–C≡CH propinin üçlü bağ karbonlarındaki yerel hibritleşme ve açı modeli hangisidir?",
        options: [
          "sp²; yaklaşık 120°",
          "sp³; yaklaşık 109,5°",
          "Bütün karbonlar sp³",
          "sp; yaklaşık 90°",
          "sp; yaklaşık 180°",
        ],
        answer: 4,
        hint: "Üçlü bağ karbonunun iki sigma komşuluğunu düşün.",
        explanation:
          "Her üçlü bağ C’si iki sigma komşuluğuna sahiptir. Bu çevre sp hibritleşmesiyle modellenir. Bağ eksenleri yaklaşık 180° doğrusal düzendedir. Propinde dağılım iki sp C ve bir sp³ C’dir.",
        guidance: {
          knowledge: ["İki sp hibrit yönü doğrusal yerel çevre oluşturur."],
          strategy: "Yalnız üçlü bağın C’lerini değerlendir.",
          steps: [
            "Her üçlü bağ C’si iki sigma komşuluğuna sahiptir.",
            "Bu çevre sp hibritleşmesiyle modellenir.",
            "Bağ eksenleri yaklaşık 180° doğrusal düzendedir.",
          ],
          optionReasons: [
            "sp² temel çift bağ çevresidir; burada üçlü bağ var.",
            "sp³ dört sigma yönlü basit doymuş çevreyi anlatır.",
            "CH₃ sp³ olsa da üçlü bağdaki iki C böyle değildir.",
            "sp doğrusal iki yönü 90° değil 180° ayırır.",
            "Doğru. Bağ eksenleri yaklaşık 180° doğrusal düzendedir.",
          ],
          commonError:
            "Molekülün CH₃ grubunun hibritleşmesini bütün C’lere kopyalama.",
          check: "Propinde dağılım iki sp C ve bir sp³ C’dir.",
        },
      },
      {
        prompt:
          "Üçlü bağı içeren açık yapı CH≡C–CH₂–CH₃ için doğru temel ad hangisidir?",
        options: ["1-Bütin", "Propin", "Siklobüten", "1-Büten", "2-Bütin"],
        answer: 0,
        hint: "Üçlü bağın küçük uç numarasını ve toplam C’yi ayrı bul.",
        explanation:
          "Kesintisiz zincirde dört C vardır. Üçlü bağ uçtaki ilk iki C arasındadır. Ad 1-bütindir. Bağlanma CH/ C/CH₂/CH₃ H toplamı 1 + 0 + 2 + 3=6; C₄H₆.",
        guidance: {
          knowledge: [
            "Dört C’li alkin ana adı bütin; bağ yerine göre numara alır.",
          ],
          strategy: "En yakın uçtan üçlü bağı 1 olarak numarala.",
          steps: [
            "Kesintisiz zincirde dört C vardır.",
            "Üçlü bağ uçtaki ilk iki C arasındadır.",
            "Ad 1-bütindir.",
          ],
          optionReasons: [
            "Doğru. Ad 1-bütindir.",
            "Propin üç C’dir; burada dört C bulunur.",
            "Açık yapıda halka kapanışı yok.",
            "-en çift bağ belirtir; burada üçlü bağ var.",
            "2-Bütinde üçlü bağ ortadaki C’ler arasındadır.",
          ],
          commonError: "Uçtan sayarken bir H’yi ayrı karbon gibi ekleme.",
          check: "Bağlanma CH/ C/CH₂/CH₃ H toplamı 1 + 0 + 2 + 3=6; C₄H₆.",
        },
      },
      {
        prompt: "Aşağıdaki yapılardan hangisi uç alkindir?",
        options: [
          "CH₃–CH=CH₂",
          "CH₃–C≡C–CH₃",
          "CH₃–CH₂–CH₃",
          "CH₃–CO–CH₃",
          "CH₃–C≡CH",
        ],
        answer: 4,
        hint: "H’nin doğrudan üçlü bağ karbonuna bağlı olmasını ara.",
        explanation:
          "CH₃–C≡CH ve CH₃–C≡C–CH₃ adayları üçlü bağ içerir. CH₃–C≡CH’nin terminal C’si H taşır; 2-bütinin iki sp C’si C’ye bağlıdır. Uç alkin CH₃–C≡CH’dir. Seçilen molekülde HC≡C– parçası doğrudan görülebilir.",
        guidance: {
          knowledge: ["Uç alkin terminal sp karbonunda H taşır."],
          strategy:
            "Önce C≡C bulunanları seç, sonra doğrudan H bağlantısını denetle.",
          steps: [
            "CH₃–C≡CH ve CH₃–C≡C–CH₃ adayları üçlü bağ içerir.",
            "CH₃–C≡CH’nin terminal C’si H taşır; 2-bütinin iki sp C’si C’ye bağlıdır.",
            "Uç alkin CH₃–C≡CH’dir.",
          ],
          optionReasons: [
            "Bu alken; üçlü bağ yok.",
            "İç alkindir; CH₃ H’leri sp C’ye doğrudan bağlı değildir.",
            "Bu alkan; çoklu bağ yok.",
            "Bu keton; C=O içerir, C≡C yok.",
            "Doğru. Uç alkin CH₃–C≡CH’dir.",
          ],
          commonError:
            "Moleküldeki herhangi bir H’yi terminal H koşuluna yeterli sayma.",
          check: "Seçilen molekülde HC≡C– parçası doğrudan görülebilir.",
        },
      },
      {
        prompt:
          "1 mol etinin uygun seçici koşulda yalnız bir mol H₂ alması hangi ana bağ ürününü verir?",
        options: [
          "Etan C₂H₆",
          "Benzen C₆H₆",
          "Metan CH₄",
          "Eten C₂H₄",
          "Etanol C₂H₆O",
        ],
        answer: 3,
        hint: "Bir H₂, üçlü bağdaki iki pi bağından birini tüketir.",
        explanation:
          "Başlangıç C₂H₂’dir. Bir H₂ iki H ekler:C₂H₄. Bir pi kaldığı için ürün eten olur. C₂H₂ + H₂=C₂H₄; pi sayısı 2’den 1’e iner.",
        guidance: {
          knowledge: [
            "Kısmi hidrojenleme seçiciliği bu kökte açıkça sağlanmıştır.",
          ],
          strategy: "H sayısına iki ekle ve bir pi bırak.",
          steps: [
            "Başlangıç C₂H₂’dir.",
            "Bir H₂ iki H ekler:C₂H₄.",
            "Bir pi kaldığı için ürün eten olur.",
          ],
          optionReasons: [
            "Etana kadar doymak toplam iki H₂ gerektirir.",
            "Benzen üç asetilenin halka birleşmesidir; tek hidrojenleme ürünü değil.",
            "İki C iskeletini kırmak için bilgi verilmedi.",
            "Doğru. Bir pi kaldığı için ürün eten olur.",
            "O sağlayan reaktif verilmedi.",
          ],
          commonError:
            "Kısmi seçici koşul verildiğinde her hidrojenlemeyi otomatik alkana kadar götürme.",
          check: "C₂H₂ + H₂=C₂H₄; pi sayısı 2’den 1’e iner.",
        },
      },
      {
        prompt:
          "0,40 mol etinin tüm pi bağları H₂ katılmasıyla gideriliyor. Gereken toplam H₂ kaç moldür?",
        options: ["1,20", "0,20", "0,80", "1,60", "0,40"],
        answer: 2,
        hint: "Her etin molekülündeki pi sayısını toplam tüketimle çarp.",
        explanation:
          "Etinde iki pi bağı vardır. Tam doyurmada ikisi de birer H₂ alır. H₂=0,40×2=0,80 moldür. Son 0,40 mol etan için H2’den gelen H atomu 1,60 mol; 0,80 mol H₂ sağlar.",
        guidance: {
          knowledge: [
            "Bir üçlü bağın tam hidrojenlenmesi iki mol H₂/mol alkin gerektirir.",
          ],
          strategy: "0,40’ı iki pi basamağıyla çarp.",
          steps: [
            "Etinde iki pi bağı vardır.",
            "Tam doyurmada ikisi de birer H₂ alır.",
            "H₂=0,40×2=0,80 moldür.",
          ],
          optionReasons: [
            "Üç çizginin hepsini H₂ tüketen pi sayar; bir çizgi sigma.",
            "Miktarı yarıya indirir; üçlü bağın tüketimine uymaz.",
            "Doğru. H₂=0,40×2=0,80 moldür.",
            "H atomunu H₂ molüne tekrar iki kat sayar.",
            "Yalnız bir pi basamağını sayar.",
          ],
          commonError:
            "Sigma bağını da hidrojenle kırılacak üçüncü pi gibi sayma.",
          check:
            "Son 0,40 mol etan için H2’den gelen H atomu 1,60 mol; 0,80 mol H₂ sağlar.",
        },
      },
      {
        prompt:
          "Etine toplam 2 mol Br₂/mol etin tamamen katılırsa ürün formülü hangisidir?",
        options: ["C₂H₂Br₄", "C₂H₆", "C₂H₂Br₂", "C₂H₄Br₂", "C₂Br₆"],
        answer: 0,
        hint: "Başlangıç H’leri korunur; iki Br₂ dört Br sağlar.",
        explanation:
          "Etin 2C ve 2H taşır. İki Br₂ toplam 4Br ekler; pi bağları gider. Formül C₂H₂Br₄ olur. Her iki C’de bir H, iki Br ve bir C tek bağı olmak üzere toplam değerlik 4’tür.",
        guidance: {
          knowledge: ["Üçlü bağda iki pi basamağı bromla katılabilir."],
          strategy: "C/H/Br atomlarını başlangıç ve reaktifte ayrı topla.",
          steps: [
            "Etin 2C ve 2H taşır.",
            "İki Br₂ toplam 4Br ekler; pi bağları gider.",
            "Formül C₂H₂Br₄ olur.",
          ],
          optionReasons: [
            "Doğru. Formül C₂H₂Br₄ olur.",
            "Br’leri yok sayıp hidrojenlenme ürününü verir.",
            "Yalnız bir Br₂ katılmış birinci basamak formülüdür.",
            "H’yi gereksiz artırıp Br sayısını eksik bırakır.",
            "Başlangıç H’leri silinir ve olmayan üçüncü Br₂ eklenir.",
          ],
          commonError:
            "Br₂ katılmasını H₂ katılması sanarak H sayısını yükseltme.",
          check:
            "Her iki C’de bir H, iki Br ve bir C tek bağı olmak üzere toplam değerlik 4’tür.",
        },
      },
      {
        prompt:
          "Etinin klasik asit/Hg²⁺ katalizli hidratasyonunda enol dönüşümünden sonra temel organik ürün hangisidir?",
        options: [
          "Sadece kararlı vinil alkol CH₂=CHOH",
          "Etanal CH₃CHO",
          "Etan CH₃CH₃",
          "Propanon CH₃COCH₃",
          "Etanol CH₃CH₂OH",
        ],
        answer: 1,
        hint: "Enolün son ürün olmadığını ve C sayısının korunduğunu düşün.",
        explanation:
          "Su katılmasıyla CH₂=CHOH enolü düşünülür. H ve pi bağı konumu değişerek CH₃CHO oluşur. Son ürün etanaldir; C₂H₄O formülü korunur. Etanalde iki C/dört H/bir O; etin+bir su atom toplamıyla eşittir.",
        guidance: {
          knowledge: ["Etin hidratasyonu bu yöntemle aldehit verir."],
          strategy: "Önce C₂H₄O enolünü kur, sonra C=O konumuna geçir.",
          steps: [
            "Su katılmasıyla CH₂=CHOH enolü düşünülür.",
            "H ve pi bağı konumu değişerek CH₃CHO oluşur.",
            "Son ürün etanaldir; C₂H₄O formülü korunur.",
          ],
          optionReasons: [
            "Verilen klasik koşulda enolü nihai kararlı karbonil yerine bırakır.",
            "Doğru. Son ürün etanaldir; C₂H₄O formülü korunur.",
            "Suyun O’sunu ürün hesabından çıkarır.",
            "Üç C içerir; başlangıç etin iki C’dir.",
            "Etanol C₂H₆O için ek iki H daha gerekir.",
          ],
          commonError:
            "Etinin hidratasyonunu bütün örneklerde keton veren genel bir yol sanma.",
          check:
            "Etanalde iki C/dört H/bir O; etin+bir su atom toplamıyla eşittir.",
        },
      },
      {
        prompt:
          "Propinin klasik asit/Hg²⁺ katalizli hidratasyonu ve enol dönüşümü sonunda ana ürün hangisidir?",
        options: ["1-Propanol", "2-Propanol", "Propanal", "Propanon", "Etanal"],
        answer: 3,
        hint: "Enolde OH, Markovnikov yönelimli orta C’ye gelir.",
        explanation:
          "OH orta üçlü bağ karbonuna katılır; enol CH₃C(OH)=CH₂. OH H’si uç C’ye kayarken ortada C=O kurulur. Ürün CH₃COCH₃, propanondur. Propanon C₃H₆O; propin C₃H₄ + H₂O toplamını korur.",
        guidance: {
          knowledge: [
            "Bu klasik terminal alkin hidratasyonunda propin ketona gider.",
          ],
          strategy: "CH₃–C(OH)=CH₂ enolünü karbonile dönüştür.",
          steps: [
            "OH orta üçlü bağ karbonuna katılır; enol CH₃C(OH)=CH₂.",
            "OH H’si uç C’ye kayarken ortada C=O kurulur.",
            "Ürün CH₃COCH₃, propanondur.",
          ],
          optionReasons: [
            "Birincil alkol; karbonil dönüşümünü ve H sayısını bozar.",
            "Alkene su katılmasının doymuş alkol ürünüdür; alkin yolu farklı.",
            "Propanal farklı yönelimli yöntemle ilişkili olabilir; bu klasik yolun ürünü değil.",
            "Doğru. Ürün CH₃COCH₃, propanondur.",
            "İki C’li üründür; propinin üç C’si korunmalı.",
          ],
          commonError:
            "Yöntem belirtilmişken farklı hidratasyon yöntemlerinin ürünlerini karıştırma.",
          check: "Propanon C₃H₆O; propin C₃H₄ + H₂O toplamını korur.",
        },
      },
      {
        prompt:
          "2-Bütin CH₃–C≡C–CH₃ için uç-H’nin amonyaklı Ag(I) ile yer değiştirmesi beklenmemesinin nedeni nedir?",
        options: [
          "Üçlü bağ yoktur",
          "Molekülde hiç H yoktur",
          "Üçlü bağ karbonlarına doğrudan H bağlı değildir",
          "Bütün bağları tek bağdır",
          "Molekül mutlaka iyoniktir",
        ],
        answer: 2,
        hint: "CH₃ üzerindeki H ile sp karbon üzerindeki H’yi ayır.",
        explanation:
          "Bir sp C solda CH₃’e, öbürü sağda CH₃’e bağlıdır. H atomları metil C’lerinde bulunur; sp C’lerinde bulunmaz. Bu nedenle terminal-H yerine geçme yolu yoktur. İç alkin sınıfı, çoklu bağın iki yanında karbon grubu bulunmasıyla doğrulanır.",
        guidance: {
          knowledge: ["Uç alkin tuzu testinde terminal C–H bağı gereklidir."],
          strategy: "Üçlü bağın her iki C’sinin öteki komşusunu göster.",
          steps: [
            "Bir sp C solda CH₃’e, öbürü sağda CH₃’e bağlıdır.",
            "H atomları metil C’lerinde bulunur; sp C’lerinde bulunmaz.",
            "Bu nedenle terminal-H yerine geçme yolu yoktur.",
          ],
          optionReasons: [
            "Açıkça C≡C vardır.",
            "Molekül C₄H₆’dır; altı H vardır, yerleri farklıdır.",
            "Doğru. Bu nedenle terminal-H yerine geçme yolu yoktur.",
            "Üçlü bağdaki iki pi bağı açıkça bulunur.",
            "Basit nötr hidrokarbon olup iyoniklik gerekçesi verilmemiştir.",
          ],
          commonError:
            "Negatif test sonucunu molekülde hiç hidrojen yok biçiminde açıklama.",
          check:
            "İç alkin sınıfı, çoklu bağın iki yanında karbon grubu bulunmasıyla doğrulanır.",
        },
      },
      {
        prompt:
          "Standart Fehling çözeltisi ile amonyaklı Cu(I) alkin ayıracı için doğru ayrım hangisidir?",
        options: [
          "İlki bazik Cu(II)–tartrat; ikincisi Cu(I) ortamıdır",
          "İkisi de aynı Cu(I) çözeltisidir",
          "İkisinde azot ve bakır atomu bulunamaz",
          "İkincisi mutlaka Cu₂O aldehit ürünüdür",
          "İlki yalnız saf metalik bakırdır",
        ],
        answer: 0,
        hint: "Ayıraç adından önce Cu yükseltgenme basamağını ve ligandı oku.",
        explanation:
          "Fehling’in başlangıç bakırı Cu(II) ve ligand ortamı tartrattır. Amonyaklı Cu(I) terminal alkinle farklı tuz oluşumuna ilişkindir. Bu nedenle ikisini aynı kimyasal çözelti saymak doğru değildir. Cu(I), Cu(II) ve Cu₂O ifadelerinde bakırın basamağı/rolü ayrı açıklanabilmelidir.",
        guidance: {
          knowledge: [
            "Standart Fehling aldehit oksidasyonunda Cu(II)–tartratla ilişkilidir; uç alkin tuzu yolu ayrı ortamdır.",
          ],
          strategy: "Başlangıç ayıracını oluşan çökelekten ayır.",
          steps: [
            "Fehling’in başlangıç bakırı Cu(II) ve ligand ortamı tartrattır.",
            "Amonyaklı Cu(I) terminal alkinle farklı tuz oluşumuna ilişkindir.",
            "Bu nedenle ikisini aynı kimyasal çözelti saymak doğru değildir.",
          ],
          optionReasons: [
            "Doğru. Bu nedenle ikisini aynı kimyasal çözelti saymak doğru değildir.",
            "Farklı Cu basamakları ve ligandlar yok sayılıyor.",
            "İki ad da açıkça bakır içeren ortamları anlatır; amonyak N içerir.",
            "Cu₂O aldehit testinin ürünüyle alkin ayıracının başlangıcı karıştırılıyor.",
            "Fehling başlangıcı saf Cu metali değildir.",
          ],
          commonError:
            "Notlarda kullanılan kısa adın yanlış eşitliğini kimyasal türü okumadan kopyalama.",
          check:
            "Cu(I), Cu(II) ve Cu₂O ifadelerinde bakırın basamağı/rolü ayrı açıklanabilmelidir.",
        },
      },
      {
        prompt:
          "Asetilenin uygun koşuldaki siklotrimerleşmesinde 3 C₂H₂ biriminden hangi formül oluşur?",
        options: ["C₂H₆", "C₆H₆", "C₆H₈", "C₄H₄", "C₆H₁₂"],
        answer: 1,
        hint: "Üç birimin C ve H sayılarını topla; başka reaktif verilmedi.",
        explanation:
          "Karbon toplamı 3×2=6. Hidrojen toplamı 3×2=6. Oluşan benzen formülü C₆H₆’dır. Üründeki aromatik pi sistemini C₆H₁₂ doymuş halka ile karıştırmadan toplam 6H’yi koru.",
        guidance: {
          knowledge: [
            "Trimerleşmede üç asetilenin atom toplamı yeni halkada korunur.",
          ],
          strategy: "2C/2H’yi üç ile çarp.",
          steps: [
            "Karbon toplamı 3×2=6.",
            "Hidrojen toplamı 3×2=6.",
            "Oluşan benzen formülü C₆H₆’dır.",
          ],
          optionReasons: [
            "İki C bırakıp dört C’yi kaybeder.",
            "Doğru. Oluşan benzen formülü C₆H₆’dır.",
            "İki ek H için reaktif verilmemiştir.",
            "Yalnız iki asetilen biriminin atom toplamıdır.",
            "Altı ek H uydurur.",
          ],
          commonError:
            "Halka oluşunca hidrojen sayısını sikloalkan formülüne otomatik tamamlama.",
          check:
            "Üründeki aromatik pi sistemini C₆H₁₂ doymuş halka ile karıştırmadan toplam 6H’yi koru.",
        },
      },
      {
        prompt:
          "CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂ denkliğine göre ideal 0,25 mol CaC₂’den kaç mol asetilen oluşur?",
        options: ["1,00", "0,75", "0,50", "0,125", "0,25"],
        answer: 4,
        hint: "Karpit ve asetilen katsayılarını doğrudan karşılaştır.",
        explanation:
          "CaC₂’nin katsayısı 1. C₂H₂’nin katsayısı da 1. İdeal asetilen molü 0,25×1/1=0,25’tir. 0,25 mol Ca(OH)₂ de oluşur; Ca ve iki C’li birimler 1:1 korunur.",
        guidance: {
          knowledge: ["Verilen dengeli denklemde CaC₂:C₂H₂ mol oranı 1:1’dir."],
          strategy: "Su katsayısını ürün mol katsayısı sanmadan oran kur.",
          steps: [
            "CaC₂’nin katsayısı 1.",
            "C₂H₂’nin katsayısı da 1.",
            "İdeal asetilen molü 0,25×1/1=0,25’tir.",
          ],
          optionReasons: [
            "Başlangıç 0,25 molü dikkate almadan 1 mol seçer.",
            "Denklemde olmayan 3 çarpanını ekler.",
            "Suyun 2 katsayısını asetilen ürününe taşır.",
            "Suyun 2 katsayısına gereksiz böler.",
            "Doğru. İdeal asetilen molü 0,25×1/1=0,25’tir.",
          ],
          commonError:
            "Reaktifin yanındaki iki sayısını bütün ürünler için zorunlu katsayı sanma.",
          check:
            "0,25 mol Ca(OH)₂ de oluşur; Ca ve iki C’li birimler 1:1 korunur.",
        },
      },
      {
        prompt:
          "Toplam 0,50 mol eten ve etin, tam doymak için 0,80 mol H₂ tüketiyor. Etin miktarı kaç moldür?",
        options: ["0,80", "0,50", "0,40", "0,30", "0,20"],
        answer: 3,
        hint: "Toplam mol ile H₂ tüketimini iki ayrı denklem yap.",
        explanation:
          "x eten, y etin olsun; toplam x+y=0,50. H₂ hesabıx + 2 y=0,80. İkinci eksi birinci:y=0,30 mol. Eten 0,20, etin 0,30:toplam 0,50; tüketim 0,20 + 0,60=0,80.",
        guidance: {
          knowledge: ["Eten 1, etin 2 mol H₂/mol tüketir."],
          strategy: "x+y=0,50 ve x + 2 y=0,80 denklemlerini çıkar.",
          steps: [
            "x eten, y etin olsun; toplam x+y=0,50.",
            "H₂ hesabıx + 2 y=0,80.",
            "İkinci eksi birinci:y=0,30 mol.",
          ],
          optionReasons: [
            "H₂ molünü doğrudan etin molü yapar.",
            "Bütün karışımı etin saymak 1,00 mol H₂ gerektirirdi.",
            "Tüm tüketimi 2’ye bölüp eten katkısını yok sayar.",
            "Doğru. İkinci eksi birinci:y=0,30 mol.",
            "Bu etene ait kalan miktardır; etin için değil.",
          ],
          commonError: "İki farklı türün H₂ tüketim katsayılarını aynı almak.",
          check: "Eten 0,20, etin 0,30:toplam 0,50; tüketim 0,20 + 0,60=0,80.",
        },
      },
      {
        prompt:
          "C₄H₆ formülü tek başına aşağıdakilerden hangisini kesinleştirmez?",
        options: [
          "1,3-Bütadien bu formüle uyabilir",
          "Kesinlikle bir alkindir",
          "2-Bütin bu formüle uyabilir",
          "Doymamışlık eşdeğeri 2’dir",
          "Açık doymuş C₄H₁₀’a göre 4H eksiktir",
        ],
        answer: 1,
        hint: "Aynı H eksikliği farklı halka/pi düzenlerinden gelebilir.",
        explanation:
          "Doymuş referans H10, verilen H6; eksik 4. Eşdeğer 4/2=2’dir. İki çift bağ da bu toplamı sağlar; kesin alkin denemez. Bir dien ve bir alkin için iki açık bağlantı aynı formüle karşı örnek oluşturur.",
        guidance: {
          knowledge: [
            "CₙH₂ₙ₋₂, uygun koşullarda alkin yanında dien/sikloalken için de mümkündür.",
          ],
          strategy:
            "H hesabını yap, sonra tek yapı iddiasını karşı örnekle denetle.",
          steps: [
            "Doymuş referans H10, verilen H6; eksik 4.",
            "Eşdeğer 4/2=2’dir.",
            "İki çift bağ da bu toplamı sağlar; kesin alkin denemez.",
          ],
          optionReasons: [
            "CH₂=CH–CH=CH₂ gerçekten C₄H₆ verir.",
            "Doğru. İki çift bağ da bu toplamı sağlar; kesin alkin denemez.",
            "CH₃–C≡C–CH₃ gerçekten C₄H₆ verir.",
            "(10−6)/2=2 hesabı doğrudur.",
            "10−6=4 hesabı doğrudur.",
          ],
          commonError:
            "Genel formülü tek başına işlev sınıfının kesin kimliği sanma.",
          check:
            "Bir dien ve bir alkin için iki açık bağlantı aynı formüle karşı örnek oluşturur.",
        },
      },
    ],
    source:
      "MEBİ AYT Kimya: Hidrokarbonlar, Aromatik Hidrokarbonlar ve Alkoller; OGM ilgili Organik Bileşikler sunuları ve Dersler Cepte hedef öğretim sayfalarıyla karşılaştırılarak yazılmış özgün anlatım, şema, örnek ve sorular. Resmî sınav sorusu değildir.",
  },
  {
    id: "ayt-arenler",
    topic: "detail-453",
    title: "Arenler: benzen halkasının gerçek bağ yapısı",
    minutes: 55,
    objectives: [
      "Benzenin gösterimlerini aynı delokalize yapı olarak yorumla.",
      "Aren, aromatik türev, fenil ve benzil ayrımını kur.",
      "Yaygın türevleri, konumları ve koşula bağlı tepkimeleri açıkla.",
    ],
    sections: [
      {
        title: "Halka sözcüğünden aromatikliğe geç",
        paragraphs: [
          "Benzen C₆H₆ formüllü temel bir aromatik hidrokarbondur. Siklohekzan C₆H₁₂ ise doymuş bir alifatik halkadır. Aynı altı karbonlu halka görünümü bu iki türün aynı bağ düzenine sahip olduğunu göstermez.",
          "Aromatiklik, yalnız hoş koku veya halkanın bulunmasıyla tanımlanmaz; uygun halkasal, düzlemsel ve delokalize pi elektron sistemiyle ilişkilidir. YKS’nin temel örneklerinde benzen ve türevleri üzerinde çalışırız. Benzen halkası taşıyan her tür yalnız C ve H içermek zorunda değildir.",
        ],
      },
      {
        title: "Benzenin formülünü bağlanmadan çıkar",
        paragraphs: [
          "Benzenin her karbonu iki komşu halka karbonuna ve bir H’ye sigma bağıyla bağlanır. Toplam altı C–C sigma ve altı C–H sigma vardır. Altı karbonun her birinden bir p orbitali, halka boyunca ortak pi elektron sistemine katılır.",
          "Molekülde altı H bulunmasının nedeni, her C’nin açık zincirdeki CH₂ gibi değil bu sp² çevrede üç sigma komşuluğu ile bağlanmasıdır. Modelde türev seçince halka karbonuna bağlanan bir yan grup, o noktadaki H’nin yerini alır; halkanın altı H’sine grubu fazladan eklemeyiz.",
        ],
      },
      {
        title: "Kekulé gösterimleri neyi anlatır?",
        paragraphs: [
          "Benzen kağıtta dönüşümlü üç tek ve üç çift bağla iki farklı Kekulé katkı yapısı olarak gösterilebilir. Bu iki çizim, gerçek molekülün saniyede sırayla geçtiği iki ayrı molekül değildir. Rezonans, aynı atom konumları için elektron dağılımının birden fazla katkıyla temsil edilmesidir.",
          "Gerçek benzende halka C–C bağları eşdeğerdir; sabit üç kısa çift ve üç uzun tek bağın sırayla yer değiştirdiği resim kullanılmaz. Altıgen içindeki çember, delokalizasyonu kısaca hatırlatır. Modelin A/B düğmeleri fiziksel zaman animasyonu değil gösterim değişimidir.",
        ],
      },
      {
        title: "Sigma iskeleti ve pi sistemini birlikte gör",
        paragraphs: [
          "Altı C atomunun sigma iskeleti halka bağlantısını kurar. Düzleme yaklaşık dik p orbitalleri ise komşularıyla etkileşerek delokalize pi sistemi oluşturur. Karbonlar temel benzen modelinde sp²; yerel bağ açıları yaklaşık 120°’dir.",
          "Bir Kekulé katkısını saydığında üç pi bağı ifadesine ulaşırsın; elektron olarak toplam altı pi elektronundan söz edilir. Üç bağ ile altı elektron sayıları farklı nesneleri sayar. Her çift bağın iki elektronlu pi katkısı bulunduğunu hatırlayarak ikisini ilişkilendir.",
        ],
      },
      {
        title: "Aren ile aromatik türevi ayır",
        paragraphs: [
          "Aromatik hidrokarbonlara aren denir. Benzen, toluen ve ksilen yalnız C ile H içerdiğinden bu gruptadır. Fenol O, anilin N içerir; aromatik bileşik oldukları hâlde hidrokarbon değildirler.",
          "Bir seçenek “aromatik mi?” diye soruyorsa halka elektron yapısını; “aromatik hidrokarbon mu?” diyorsa ayrıca atom türlerini kontrol et. Başlıktaki “benzen türevleri” sözü bütün türevleri aren yapmaz. Aynı sınıflama sorusunu yalnız isimde benzen geçmesine bakarak çözme.",
        ],
      },
      {
        title: "Fenil ile benzili aynı sanma",
        paragraphs: [
          "Benzen halkasından bir H’nin bağlanma yeri olarak çıkarılmasıyla C₆H₅– fenil grubu düşünülür. Bu grup başka atoma halka karbonu üzerinden bağlanır. Toluenin yan CH₃ grubundan bir H eksik C₆H₅–CH₂– ise benzil grubudur.",
          "Benzil grubundaki bağlanma ucu halka dışında CH₂ üzerindedir; fenilde ise doğrudan halkadadır. Fenil hidroksi türevi fenol C₆H₅OH iken benzil alkol C₆H₅CH₂OH olur. Bir karbonluk bu fark, OH’nin bağlı olduğu karbonun hibritleşmesini ve bileşiğin alkol/fenol sınıfını değiştirir.",
        ],
      },
      {
        title: "Tek bağlı grubu ada bağla",
        paragraphs: [
          "Benzen halkasına CH₃ bağlanınca metilbenzen, yaygın adıyla toluen oluşur. Halka bir H kaybeder ve CH₃ kazanır: C₆H₅ + CH₃=C₇H₈. C₆H₆ + CH₃ diye doğrudan toplamak bir H fazla verir.",
          "Halkaya Cl bağlanırsa klorobenzen, NH₂ bağlanırsa aminobenzen/anilin, OH bağlanırsa hidroksibenzen/fenol adlarıyla karşılaşırsın. Adı çözerken bağlı grubun atomsal içeriğini ve halkanın yer değiştiren H’sini ayrı işaretle; böylece formülü ezberlemeden kurabilirsin.",
        ],
      },
      {
        title: "İki substitüentte konumu kodla",
        paragraphs: [
          "İki aynı substitüentli benzende 1,2 konumu orto, 1,3 meta ve 1,4 para olarak adlandırılır. İki metilli türevler o-, m- ve p-ksilendir. Halkadaki simetri nedeniyle 1,5 meta ve 1,6 orto düzeninin yeniden numaralanmış biçimidir.",
          "Üç izomerin de formülü C₈H₁₀’dur; CH₃ gruplarının bağlandığı halka konumları farklıdır. Modelde ikinci metilin konumunu değiştirdiğinde formül sabit kalırken bağlanma yeri değişir. Düzlemde halkanın bütünü dönünce ise yeni bir konum izomeri oluşmaz.",
        ],
      },
      {
        title: "Toluenin yan grubu ne kazandırır?",
        paragraphs: [
          "Toluen, benzene bağlı bir metil grubu taşır; halkanın aromatikliği korunur. Endüstride çözücü ve çeşitli organik ürünler için ara madde olarak kullanılabilir. Kullanım alanını, her toluen türevinin aynı etkide olacağı biçimde genelleme.",
          "Yan zincir ile halka üzerindeki tepkimeler farklı koşullarda incelenebilir. Bir kökte ışık, katalizör veya özel koşul verilmişse bunun hangi kısmı etkilediğini değerlendir. Yalnız “aromatik” sözü bütün karbonların aynı yerel çevrede olduğunu söylemez; metil karbonu sp³’tür.",
        ],
      },
      {
        title: "Fenolün OH’si doğrudan halkadadır",
        paragraphs: [
          "Fenol C₆H₅OH’de O–H grubu aromatik halka karbonuna doğrudan bağlıdır. Bu nedenle sıradan sp³ karbona OH bağlı alkol sınıfıyla ayrılır. Fenol zayıf asit davranışı gösterebilir; OH’nin yerel bağlanma çevresi yalnız grup sayısından daha belirleyicidir.",
          "Saf fenolün erime sıcaklığı normal basınçta yaklaşık 41°C dolayındadır; 20–25°C’de denge hâli katıdır. Bazı notlardaki koşulsuz “oda sıcaklığında sıvı” ifadesini kullanmayız. Sıcaklık, saflık ve karışım bilgisi verildiyse faz yorumunu bu koşullara bağla.",
        ],
      },
      {
        title: "Anilinin amino grubunu tanı",
        paragraphs: [
          "Anilin C₆H₅NH₂, benzen halkasına doğrudan NH₂ bağlı aromatik bir amindir. Halka karbonlarının H sayısı beştir; amino grubunun iki H’si ayrıca bulunur. Toplam formül C₆H₇N’dir.",
          "Anilinin amino grubu asit–baz ve sentez davranışında rol oynar; boya ve başka ürünlerin üretiminde ara madde örneğidir. Amin grubunu nitro grubu NO₂ ile karıştırma: atom türleri, bağlanma ve elektron özellikleri farklıdır. Aromatik olması anilini hidrokarbon yapmaz.",
        ],
      },
      {
        title: "Naftalinde iki halka bir kenarı paylaşır",
        paragraphs: [
          "Naftalinin formülü C₁₀H₈’dir. İki benzen benzeri halkayı kaynaştırılmış olarak düşünürken ortak kenardaki iki karbonu iki kez sayma: 6 + 6−2=10 karbon. Bu kaynaşma, iki bağımsız benzeni yalnız yan yana koymaktan farklı bağlanma oluşturur.",
          "Naftalin oda koşullarında katıdır ve uygun koşullarda süblimleşebilir. Tarihsel kullanım alanları ile süblimleşme ilişkisini öğren; süblimleşme, molekülün formülünün değişmesi veya aromatik halkanın kırılması değildir. Burada basit benzen türevi modeli naftalinin bütün elektron dağılımını nicel hesaplamaz.",
        ],
      },
      {
        title: "Aromatik sistem neden farklı tepkime seçer?",
        paragraphs: [
          "Basit alkenin Br₂ katılmasında çift bağ gider. Benzende böyle bir katılma, halka delokalizasyonunu bozacağından olağan brom testi koşullarında alken gibi davranmaz. Uygun katalizörlü halka bromlanmasında ise bir H yerine Br geçerek aromatik sistem korunabilir.",
          "Bundan “benzen hiçbir koşulda katılma veremez” sonucu çıkmaz; yüksek basınçlı uygun katalitik hidrojenleme gibi ayrı koşullarda siklohekzana indirgenebilir. Soru kökü hangi koşulu söylüyorsa o reaksiyonun kapsamını kullan. “Olağan koşulda beklenmez” ile “imkânsız” farklı iddialardır.",
        ],
      },
      {
        title: "Yer değiştirmede atomları takip et",
        paragraphs: [
          "Basitleştirilmiş halka bromlanmasında C₆H₆ + Br₂ → C₆H₅Br + HBr denklemi, bir halka H’sinin yerini Br’nin aldığını gösterir. Verilen uygun katalizör koşulu denkliğin bağlamıdır; benzene iki Br’yi birden katmak bu ürün için yanlış olur.",
          "Ürün ve yan üründe C, H ve Br sayısını ayrı denetle. Bu koruma hesabı, aromatik yer değiştirmeyi alken katılmasından ayırır: alken örneğinde HBr yan ürünü beklenmez; iki Br doğrudan çoklu bağın iki karbonuna eklenir.",
        ],
      },
      {
        title: "Doymamışlık hesabı bağ düzenini tek başına vermez",
        paragraphs: [
          "Benzen için (2×6 + 2−6)/2=4 bulunur. Bir halka ve üç pi bağı katkısı bu toplamı sağlar. Siklohekzanda ise (14−12)/2=1’dir; yalnız bir halka yeterlidir.",
          "Doymamışlık eşdeğeri dört diye her C₆H₆ bağlantısının aromatik olduğunu söyleyemeyiz. Aromatiklik için uygun sürekli pi düzeni ve geometri ayrıca gerekir. Bu sayı, mümkün bağlanmalar için bir muhasebe denetimidir; yapının bütün ayrıntılarının veya kararlılığının ölçüsü değildir.",
        ],
      },
      {
        title: "Fiziksel özellik ve kullanımda koşulu koru",
        paragraphs: [
          "Benzen ve toluen, düşük su çözünürlüğü olan sıvı organik maddelerdir; çeşitli sentezlerde çözücü veya hammadde ilişkileri bulunur. Fenol ve anilin ise heteroatomlu grupları nedeniyle farklı etkileşim ve asit–baz özellikleri gösterebilir.",
          "Aromatik sözcüğünü koku testi gibi kullanmak bilimsel tanı yöntemi değildir. Karbon iskeleti, heteroatom ve fonksiyonel grup bir arada yorumlanır. Aynı halkanın korunması bütün fiziksel değerlerin aynı kaldığını veya bütün türevlerin aynı kullanımda uygun olduğunu göstermez.",
        ],
      },
      {
        title: "Gösterimi değiştirirken ne sabit kalır?",
        paragraphs: [
          "Modelde benzen için A ve B katkılarını veya çemberli gösterimi seç. Altı karbonun yerleri, halka bağlantıları ve toplam formül sabit kalır. Değişen, elektron dağılımını ifade etmek için çizilmiş temsil çizgileridir; yeni atom eklenmez.",
          "Sonra fenol veya anilin seçerek aromatiklikle hidrokarbon olmayı ayır; ksilenin konumunu değiştirerek aynı formüllü konum izomerini göster. Her değişimde “atom mu, bağlanma mı, yalnız temsil mi değişti?” sorusunu kendine sor. Bu ayrım rezonans ve izomerliğin birbirine karışmasını önler.",
        ],
      },
    ],
    examples: [
      {
        title: "Etilbenzenin formülünü kur",
        prompt:
          "Benzenin bir halka H’si C₂H₅ ile yer değiştiriyor. Ürünün formülünü bul.",
        strategy: "Halkadaki H kaybını önce yap, sonra etili ekle.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "C₆H₆’dan bir H çıkarılınca bağlanma parçası C₆H₅ kalır.",
          },
          {
            label: "Adım 2",
            explanation: "C₂H₅ grubunun iki C ve beş H’si bu parçaya eklenir.",
          },
          {
            label: "Adım 3",
            explanation: "Toplam C₈H₁₀ elde edilir; ürün etilbenzendir.",
          },
        ],
        answer: "C₈H₁₀.",
        check: "H sayısı 6−1 + 5=10; C sayısı 6 + 2=8.",
        pitfall: "C₆H₆’ya C₂H₅ ekleyip C₈H₁₁ yazma.",
      },
      {
        title: "İki klorun konumları",
        prompt:
          "Benzen halkasına iki özdeş Cl bağlandığında farklı konumları say.",
        strategy: "Bir Cl’yi 1’de sabitle ve halka simetrisini kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "İkinci Cl 2. karbona bağlıysa 1,2 orto konumu; 6. karbona bağlı oluşu da eşdeğerdir.",
          },
          {
            label: "Adım 2",
            explanation:
              "İkinci Cl 3. karbona bağlıysa 1,3 meta konumu; 5. karbona bağlı oluşu da eşdeğerdir.",
          },
          {
            label: "Adım 3",
            explanation:
              "İkinci Cl 4. karbona bağlıysa para olur; toplam üç konum izomeri vardır.",
          },
        ],
        answer: "o-, m-, p-diklorobenzen; üç konum.",
        check:
          "Hepsi C₆H₄Cl₂’dir; yalnız Cl’lerin halka C bağlantı yeri değişir.",
        pitfall: "Saat yönüyle ters yönü ayrı moleküller diye sayma.",
      },
      {
        title: "Aromatik ama hidrokarbon mu?",
        prompt:
          "Etilbenzen C₆H₅C₂H₅, benzil alkol C₆H₅CH₂OH ve nitrobenzen C₆H₅NO₂’yi aromatiklik ve yalnız C/H içeriği açısından ayır.",
        strategy:
          "Halka türünü ve heteroatom varlığını iki ayrı sütunda incele.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Üç örnek de benzen halkasına ait aromatik sistem taşır.",
          },
          {
            label: "Adım 2",
            explanation:
              "Etilbenzen yalnız C/H içerir; benzil alkol O, nitrobenzen N/O taşır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Bu listede üçü aromatik, yalnız etilbenzen aromatik hidrokarbondur.",
          },
        ],
        answer: "Aromatik:üçü; hidrokarbon:yalnız etilbenzen.",
        check:
          "C₈H₁₀, C₇H₈O, C₆H₅NO₂ formüllerinde heteroatomları ayrı işaretle.",
        pitfall:
          "Benzen türevi sözüyle hidrokarbon sözünü eş anlamlı kullanma.",
      },
      {
        title: "Naftalinde sigma muhasebesi",
        prompt:
          "C₁₀H₈ naftalinin kaynaşmış iskeletinde 11 farklı C–C sigma komşuluğu vardır. C–H’leri de katarak toplam sigmayı bul.",
        strategy:
          "Her farklı C–C kenarını bir, sıradan C–H bağını bir kez say.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Verilen iskelette 11 farklı C–C sigma bulunur.",
          },
          {
            label: "Adım 2",
            explanation: "C₁₀H₈ formülü 8C–H sigma verir.",
          },
          {
            label: "Adım 3",
            explanation: "Toplam 11 + 8=19 sigma bağı vardır.",
          },
        ],
        answer: "19 sigma bağı.",
        check:
          "Ortak halka kenarını iki halkadan iki kez sayma; 11 sayısı zaten farklı komşulukları sayar.",
        pitfall:
          "Katkı yapılarındaki çift çizgilerin pi kısmını fazladan sigma sayma.",
      },
      {
        title: "Klorlamada yer değiştirme",
        prompt:
          "Verilen uygun FeCl₃ koşulunda benzen klorlanarak C₆H₅Cl oluşturuyor. Yan ürünü bul.",
        strategy: "Bir halka H’sinin yerine geçen bir Cl’yi takip et.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Bir Cl ürün halkasına bağlanır, bir H halkadan ayrılır.",
          },
          {
            label: "Adım 2",
            explanation: "Cl₂’nin ikinci Cl’si bu H ile HCl oluşturur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Denklem C₆H₆ + Cl₂ → C₆H₅Cl + HCl olur; tüm atomlar korunur.",
          },
        ],
        answer: "HCl; tepkime yer değiştirmedir.",
        check: "İki Cl katılmış C₆H₆Cl₂ bu kökte verilen ürün değildir.",
        pitfall:
          "Alkenin iki komşu C’ye halojen katılmasını benzene otomatik uygulama.",
      },
    ],
    recall: [
      {
        prompt: "Kekulé çizimleri arasında molekül gidip gelir mi?",
        answer:
          "Hayır; gerçek delokalize yapı farklı katkı gösterimleriyle anlatılır.",
      },
      {
        prompt: "Fenol aren midir?",
        answer: "Aromatiktir, fakat O içerdiğinden hidrokarbon/aren değildir.",
      },
      {
        prompt: "Fenil ve benzil farkı?",
        answer: "C₆H₅– doğrudan halka ucu; C₆H₅CH₂– halka dışı CH₂ ucu.",
      },
      {
        prompt: "Ksilen konumları?",
        answer: "Orto 1,2; meta 1,3; para 1,4.",
      },
      {
        prompt: "Benzen olağan brom testinde alken gibi mi?",
        answer:
          "Hayır; koşul farklıdır. Uygun katalizörlü yer değiştirme aromatikliği korur.",
      },
    ],
    items: [
      {
        prompt: "Benzenin iki Kekulé katkı çizimi için hangisi doğru yorumdur?",
        options: [
          "İki farklı molekül formülüdür",
          "Çizim değişince yeni yapı izomeri oluşur",
          "Tek delokalize yapının farklı elektron gösterimleridir",
          "Bir çizimde altı, ötekinde yedi karbon vardır",
          "Molekül iki çizim arasında fiziksel olarak sırayla gidip gelir",
        ],
        answer: 2,
        hint: "Atom bağlantılarının değişip değişmediğini kontrol et.",
        explanation:
          "İki katkıda altı C ve altı H aynı yerlerde kalır. Değişen, pi katkısını çizgiyle gösterme biçimidir. Gerçek benzen tek delokalize yapı olarak yorumlanır. Her iki katkıda halka C–C komşuluğu altı; gerçek benzende bağlar eşdeğerdir.",
        guidance: {
          knowledge: ["Rezonans katkıları ayrı dengedeki moleküller değildir."],
          strategy: "Atom yerleriyle elektron gösterimlerini ayrı değerlendir.",
          steps: [
            "İki katkıda altı C ve altı H aynı yerlerde kalır.",
            "Değişen, pi katkısını çizgiyle gösterme biçimidir.",
            "Gerçek benzen tek delokalize yapı olarak yorumlanır.",
          ],
          optionReasons: [
            "İki çizim de C₆H₆’dır.",
            "Bağlantı iskeleti değişmediğinden yeni yapı izomeri değildir.",
            "Doğru. Gerçek benzen tek delokalize yapı olarak yorumlanır.",
            "Atom sayısı katkı gösterimiyle artmaz.",
            "Rezonansı zamanla izlenen iki ayrı molekül dönüşümü sanır.",
          ],
          commonError:
            "A/B gösterim düğmesini gerçek zamanda rezonans yapıları arasında zıplama animasyonu sanma.",
          check:
            "Her iki katkıda halka C–C komşuluğu altı; gerçek benzende bağlar eşdeğerdir.",
        },
      },
      {
        prompt:
          "Benzen C₆H₆’da toplam sigma bağı ve delokalize sisteme katılan pi elektron sayısı hangisidir?",
        options: [
          "18 sigma; 6 pi elektronu",
          "9 sigma; 6 pi elektronu",
          "12 sigma; 3 pi elektronu",
          "12 sigma; 6 pi elektronu",
          "6 sigma; 3 pi elektronu",
        ],
        answer: 3,
        hint: "Halka C–C ve C–H sigmaları ayrı; pi bağı ile elektron sayısını ayır.",
        explanation:
          "Halkada 6C–C sigma, çevrede 6C–H sigma vardır. Her sp² C pi sisteme bir elektron katkısı verir. Toplam 12 sigma ve 6 pi elektronu bulunur. Sigma 12 ayrı atom komşuluğu; pi 6 elektron, üç elektron çifti katkısıyla tutarlıdır.",
        guidance: {
          knowledge: [
            "Benzen altı C–C ve altı C–H sigma bağı taşır; altı pi elektronu vardır.",
          ],
          strategy: "Önce sigma toplamını, sonra her C’nin p katkısını say.",
          steps: [
            "Halkada 6C–C sigma, çevrede 6C–H sigma vardır.",
            "Her sp² C pi sisteme bir elektron katkısı verir.",
            "Toplam 12 sigma ve 6 pi elektronu bulunur.",
          ],
          optionReasons: [
            "Pi çizgilerini fazladan sigma gibi sayar.",
            "Üç pi katkısını sigma gibi sayarken altı C–H toplamı yanlış kurulmuş.",
            "Üç katkı pi bağı ifadesi 6 elektrona karşılık gelir; 3 elektron değildir.",
            "Doğru. Toplam 12 sigma ve 6 pi elektronu bulunur.",
            "C–H sigmaları eksik; pi bağ çiftiyle elektron sayısı karışmış.",
          ],
          commonError:
            "“Üç pi bağı katkısı” ile “üç pi elektronu” sözlerini eşitleme.",
          check:
            "Sigma 12 ayrı atom komşuluğu; pi 6 elektron, üç elektron çifti katkısıyla tutarlıdır.",
        },
      },
      {
        prompt:
          "Benzenin bir halka H’si metil CH₃ ile yer değiştiriyor. Ürünün formülü hangisidir?",
        options: ["C₆H₅", "C₈H₁₀", "C₇H₉", "C₇H₈", "C₆H₆"],
        answer: 3,
        hint: "Ayrılan halka H’sini eklemeden önce çıkar.",
        explanation:
          "Halka bağlanma parçası C₆H₅ olur. Metil 1C ve 3H sağlar. Toplam C₇H₈ elde edilir. Üründe 5 halka H + 3 metil H=8; toplam 7C.",
        guidance: {
          knowledge: ["Toluen C₆H₅–CH₃ bağlantılıdır."],
          strategy: "6−1 + 3H ve 6 + 1C hesabını yap.",
          steps: [
            "Halka bağlanma parçası C₆H₅ olur.",
            "Metil 1C ve 3H sağlar.",
            "Toplam C₇H₈ elde edilir.",
          ],
          optionReasons: [
            "Yalnız fenil parçasını sayar, CH₃’ü eklemez.",
            "İki metil yerine tek metil verilmiştir; C8 fazla.",
            "Ayrılan H’yi çıkarmadan CH₃’ü benzenin üzerine ekler.",
            "Doğru. Toplam C₇H₈ elde edilir.",
            "Metil grubunun atomlarını yok sayar.",
          ],
          commonError:
            "C₆H₆–CH₃ şeklindeki eksik ikame muhasebesini molekül formülü sanma.",
          check: "Üründe 5 halka H + 3 metil H=8; toplam 7C.",
        },
      },
      {
        prompt:
          "Benzen, toluen, fenol ve anilin arasında hangileri yalnız C/H içeren aromatik hidrokarbondur?",
        options: [
          "Fenol ve anilin",
          "Dördü de",
          "Benzen ve toluen",
          "Yalnız fenol",
          "Yalnız anilin",
        ],
        answer: 2,
        hint: "Aromatiklik ile hidrokarbonun atom koşulunu ayrı denetle.",
        explanation:
          "Benzen C₆H₆ ve toluen C₇H₈ yalnız C/H içerir. Fenol O, anilin N taşır; aromatik olsalar da hidrokarbon değildir. Doğru grup benzen ve toluendir. Seçilen iki formülde C ve H dışında simge yok; elenenlerde O/N açıkça bulunur.",
        guidance: {
          knowledge: [
            "Hidrokarbon yalnız C ve H içerir; O/N taşıyan türevler bu alt grupta değildir.",
          ],
          strategy: "Her adın bağlı grubundaki heteroatomu bul.",
          steps: [
            "Benzen C₆H₆ ve toluen C₇H₈ yalnız C/H içerir.",
            "Fenol O, anilin N taşır; aromatik olsalar da hidrokarbon değildir.",
            "Doğru grup benzen ve toluendir.",
          ],
          optionReasons: [
            "İki tür de heteroatom içerir; istenen yalnız C/H koşulunu bozuyor.",
            "Aromatik olmayı hidrokarbon olmakla eşitler.",
            "Doğru. Doğru grup benzen ve toluendir.",
            "Fenol O içerdiği için hidrokarbon değildir.",
            "Anilinde amino N’si bulunur; koşulu bozuyor.",
          ],
          commonError:
            "Halka içinde altı C görmek, molekülün geri kalan atomlarını yok saydırmasın.",
          check:
            "Seçilen iki formülde C ve H dışında simge yok; elenenlerde O/N açıkça bulunur.",
        },
      },
      {
        prompt: "C₆H₅– ile C₆H₅CH₂– gruplarının adları sırasıyla hangisidir?",
        options: [
          "Benzen ve toluen molekülleri",
          "İkisi de aynı fenil grubu",
          "Metil ve etil",
          "Benzil ve fenil",
          "Fenil ve benzil",
        ],
        answer: 4,
        hint: "Bağlanma ucunun doğrudan halka üzerinde mi, CH₂ üzerinde mi olduğunu bul.",
        explanation:
          "C₆H₅– doğrudan halka ucuyla bağlanır; fenildir. C₆H₅CH₂– halka dışı CH₂ ucuyla bağlanır; benzildir. Sıra fenil, benzildir. Fenilde 6C/5H, benzilde 7C/7H sayılır; bağlanma ucu farklıdır.",
        guidance: {
          knowledge: [
            "Fenil halka H’si eksik, benzil yan metilden H eksik bağlanma grubudur.",
          ],
          strategy: "Ek CH₂ karbonunu adlandırmaya yansıt.",
          steps: [
            "C₆H₅– doğrudan halka ucuyla bağlanır; fenildir.",
            "C₆H₅CH₂– halka dışı CH₂ ucuyla bağlanır; benzildir.",
            "Sıra fenil, benzildir.",
          ],
          optionReasons: [
            "Açık uçlu parçaları bağımsız benzen/toluenin tam formülleri gibi okur.",
            "Benzilde fazladan CH₂ bağlantı ucu vardır; aynı grup değildir.",
            "Her iki grupta altı C’li aromatik halka vardır; basit metil/etil değildir.",
            "İki grubu ters eşler.",
            "Doğru. Sıra fenil, benzildir.",
          ],
          commonError: "Fenil ile benzil arasındaki CH₂’yi görmezden gelme.",
          check:
            "Fenilde 6C/5H, benzilde 7C/7H sayılır; bağlanma ucu farklıdır.",
        },
      },
      {
        prompt:
          "Benzen halkasında iki CH₃ grubu 1 ve 3 konumlarındadır. Yaygın konum adı hangisidir?",
        options: [
          "para-Ksilen",
          "Fenol",
          "meta-Ksilen",
          "Toluen",
          "orto-Ksilen",
        ],
        answer: 2,
        hint: "Orto 1,2; meta 1,3; para 1,4 eşleşmesini halka üzerinde kur.",
        explanation:
          "İki CH₃ olduğu için ksilen sınıfındadır. Konumlar 1 ve 3’tür. Bu meta-ksilendir. Halka ters yönde numaralanırsa 1,5 aynı meta düzenine eşlenebilir.",
        guidance: {
          knowledge: ["Ksilen iki metil substitüentli benzen türevidir."],
          strategy: "İki grubun göreli konumunu 1,3 olarak oku.",
          steps: [
            "İki CH₃ olduğu için ksilen sınıfındadır.",
            "Konumlar 1 ve 3’tür.",
            "Bu meta-ksilendir.",
          ],
          optionReasons: [
            "Para karşılıklı 1,4’tür.",
            "Fenol OH taşır; iki metilli yapı değildir.",
            "Doğru. Bu meta-ksilendir.",
            "Toluen tek metil taşır.",
            "Orto konum komşu 1,2’dir.",
          ],
          commonError:
            "Ksilenin konum adını metil grubunun hangi sayfa tarafında göründüğünden çıkarma.",
          check:
            "Halka ters yönde numaralanırsa 1,5 aynı meta düzenine eşlenebilir.",
        },
      },
      {
        prompt:
          "İki özdeş metil grubunun benzen halkasındaki konumları için kaç farklı basit yapı izomeri vardır?",
        options: ["6", "3", "2", "4", "5"],
        answer: 1,
        hint: "İlk metili 1’de sabitle; 2/6 ve 3/5 simetrisini kullan.",
        explanation:
          "2 ve 6, orto düzene eşdeğerdir. 3 ve 5, meta düzene eşdeğerdir; 4 para olarak kalır. Toplam 3 farklı konum izomeri vardır. Üçünün de formülü C₈H₁₀’dur; C/H sayısı değil göreli konum değişir.",
        guidance: {
          knowledge: [
            "İki aynı substitüent benzende orto, meta, para konumları verir.",
          ],
          strategy: "Simetriyle eşdeğer konumları tek kez say.",
          steps: [
            "2 ve 6, orto düzene eşdeğerdir.",
            "3 ve 5, meta düzene eşdeğerdir; 4 para olarak kalır.",
            "Toplam 3 farklı konum izomeri vardır.",
          ],
          optionReasons: [
            "İlk grubun konumunu da bağımsız yeni izomer sanır.",
            "Doğru. Toplam 3 farklı konum izomeri vardır.",
            "Orto/meta/para gruplarından birini eksiltir.",
            "Simetriyle aynı olan konumlardan birini iki sayar.",
            "İkinci grubun beş olası sayfa köşesini eşdeğerliksiz sayar.",
          ],
          commonError:
            "Molekülün dönme/yansıma eşdeğerliğini yeni bağlanma sayısına katma.",
          check:
            "Üçünün de formülü C₈H₁₀’dur; C/H sayısı değil göreli konum değişir.",
        },
      },
      {
        prompt:
          "C₆H₅OH fenol ile C₆H₅CH₂OH benzil alkol arasındaki doğru ayrım hangisidir?",
        options: [
          "İkisi de yalnız C/H içerir",
          "İkisinde de OH doğrudan aynı aromatik C’ye bağlıdır",
          "Fenolün formülünde yedi C vardır",
          "Fenolde OH aromatik C’ye; benzil alkolde sp³ CH₂’ye bağlıdır",
          "Benzil alkolde O atomu yoktur",
        ],
        answer: 3,
        hint: "OH’ye doğrudan komşu karbonu işaretle.",
        explanation:
          "Fenolde O, doğrudan halka C’sine bağlıdır. Benzil alkolde arada CH₂ vardır ve OH bu sp³ C’ye bağlıdır. İki bileşik bu yerel bağ çevresiyle ayrılır. Fenol C₆H₆O; benzil alkol C₇H₈O ile C farkı da doğrulanır.",
        guidance: {
          knowledge: [
            "Alkol/fenol ayrımı OH karbonunun yerel çevresine bağlıdır.",
          ],
          strategy: "Halka dışı CH₂’yi bağlantıda izle.",
          steps: [
            "Fenolde O, doğrudan halka C’sine bağlıdır.",
            "Benzil alkolde arada CH₂ vardır ve OH bu sp³ C’ye bağlıdır.",
            "İki bileşik bu yerel bağ çevresiyle ayrılır.",
          ],
          optionReasons: [
            "İki bileşikte de O bulunur; hidrokarbon değiller.",
            "Benzil alkolün aradaki CH₂’sini yok sayar.",
            "Fenol 6C’dir; yedinci C benzil alkolün CH₂’sindedir.",
            "Doğru. İki bileşik bu yerel bağ çevresiyle ayrılır.",
            "OH içinde O açıkça bulunur.",
          ],
          commonError:
            "Molekülde benzen halkası bulunmasını bütün OH’lerin fenolik olduğu sonucuna dönüştürme.",
          check: "Fenol C₆H₆O; benzil alkol C₇H₈O ile C farkı da doğrulanır.",
        },
      },
      {
        prompt: "Anilin C₆H₅NH₂ için toplam molekül formülü hangisidir?",
        options: ["C₆H₅N₂", "C₆H₇O", "C₆H₆N", "C₇H₇N", "C₆H₇N"],
        answer: 4,
        hint: "Halkadaki beş H ile amino grubundaki iki H’yi topla.",
        explanation:
          "Halka parçası 6C/5H sağlar. Amino parçası 1N/2H sağlar. Toplam C₆H₇N olur. Toplam H5 + 2=7; N1; C6 sabit.",
        guidance: {
          knowledge: ["NH₂ bir N ve iki H içerir; fenil parçası C₆H₅’tir."],
          strategy: "Her parçada atom türlerini ayrı say.",
          steps: [
            "Halka parçası 6C/5H sağlar.",
            "Amino parçası 1N/2H sağlar.",
            "Toplam C₆H₇N olur.",
          ],
          optionReasons: [
            "NH₂’de 2 sayısı N’ye değil H’ye aittir.",
            "N yerine O kullanmak fenolle karıştırır.",
            "Amino grubunun iki H’sinden birini saymaz.",
            "Amino grubunda C bulunmaz; bir C fazladır.",
            "Doğru. Toplam C₆H₇N olur.",
          ],
          commonError:
            "Alt indis 2’nin hangi elemente ait olduğunu yanlış okumak.",
          check: "Toplam H5 + 2=7; N1; C6 sabit.",
        },
      },
      {
        prompt:
          "Naftalinde iki altı üyeli karbon halka bir kenarı paylaşır. Ortak iki karbon yalnız bir kez sayılırsa toplam C kaçtır?",
        options: ["11", "10", "12", "6", "8"],
        answer: 1,
        hint: "Her halkanın altı C sayımına ortak iki C iki kez girmiştir.",
        explanation:
          "Bağımsız sayım 6 + 6=12 verir. Ortak kenarın iki ucundaki 2C tekrar sayılmıştır. Doğru toplam 12−2=10C’dir. C₁₀H₈ formülünün 10C sayımıyla eşleşir.",
        guidance: {
          knowledge: ["Kaynaşmış halkalarda ortak atomlar çift sayılmaz."],
          strategy: "6 + 6 toplamından ortak tekrar 2’yi çıkar.",
          steps: [
            "Bağımsız sayım 6 + 6=12 verir.",
            "Ortak kenarın iki ucundaki 2C tekrar sayılmıştır.",
            "Doğru toplam 12−2=10C’dir.",
          ],
          optionReasons: [
            "Ortak bağın iki atomundan yalnız birini eksiltir.",
            "Doğru. Doğru toplam 12−2=10C’dir.",
            "Ortak atomları çift sayar.",
            "İkinci halkanın ortak olmayan dört C’sini tamamen yok sayar.",
            "Ortak iki C’yi iki kez daha çıkararak fazla eksiltir.",
          ],
          commonError:
            "Ortak bir kenar sözüyle yalnız bir ortak atom var sanma.",
          check: "C₁₀H₈ formülünün 10C sayımıyla eşleşir.",
        },
      },
      {
        prompt:
          "Benzen uygun katalizörle bromlanıp C₆H₅Br oluşturuyor. Bu verilen yolda diğer ürün hangisidir?",
        options: ["HBr", "H₂", "H₂O", "Br₂O", "CH₄"],
        answer: 0,
        hint: "Başlangıç Br₂’den bir Br halkaya gider; ayrılan H diğer Br’ye bağlanır.",
        explanation:
          "Ana ürün C₆H₅Br, bir halka H’si eksiktir. Br₂’nin bir Br’si ana üründe, öteki Br boştadır. Kalan H + Br, HBr yan ürününü verir. C₆H₆ + Br₂ → C₆H₅Br + HBr iki yanda H6/Br2’yi korur.",
        guidance: {
          knowledge: [
            "Halojenle aromatik yer değiştirme atomları yan üründe de korur.",
          ],
          strategy: "C₆H₆ + Br₂ denkliğinde kalan H ve Br’yi eşleştir.",
          steps: [
            "Ana ürün C₆H₅Br, bir halka H’si eksiktir.",
            "Br₂’nin bir Br’si ana üründe, öteki Br boştadır.",
            "Kalan H + Br, HBr yan ürününü verir.",
          ],
          optionReasons: [
            "Doğru. Kalan H + Br, HBr yan ürününü verir.",
            "İki H gerektirir; yalnız bir H ayrılmıştır ve Br kaybolur.",
            "Başlangıçta O verilmedi.",
            "O kaynağı verilmemiş, ayrılan H korunmamış.",
            "Karbon iskeleti kırılmasına veri yoktur.",
          ],
          commonError:
            "Yan ürünü hesaba katmadan sadece halkaya eklenen Br’yi sayma.",
          check: "C₆H₆ + Br₂ → C₆H₅Br + HBr iki yanda H6/Br2’yi korur.",
        },
      },
      {
        prompt:
          "Saf fenolün normal erime sıcaklığı yaklaşık 41°C olarak veriliyor. Normal basınçta 20–25°C’de dengedeki saf örneği için hangi faz yorumu uygundur?",
        options: [
          "Kesin gaz",
          "Katı",
          "Sıcaklık fazla ilgisizdir",
          "Mutlaka plazma",
          "Kesin sıvı",
        ],
        answer: 1,
        hint: "Verilen sıcaklığı erime noktasının altında/üstünde karşılaştır.",
        explanation:
          "Örnek saf ve denge koşulundadır. 20–25°C,41°C erime noktasının altındadır. Bu nedenle katı faz yorumu uygundur. Karışım veya aşırı soğuma koşulu verilmemiştir; kökteki saf denge varsayımını koru.",
        guidance: {
          knowledge: [
            "Saf maddenin normal erime noktasının altındaki denge fazı, bu koşulda katıdır.",
          ],
          strategy: "20–25’in 41’den küçük olduğunu kullan.",
          steps: [
            "Örnek saf ve denge koşulundadır.",
            "20–25°C,41°C erime noktasının altındadır.",
            "Bu nedenle katı faz yorumu uygundur.",
          ],
          optionReasons: [
            "Verilen erime kıyası gaz için kanıt sağlamaz.",
            "Doğru. Bu nedenle katı faz yorumu uygundur.",
            "Faz yorumu verilen sıcaklıkla doğrudan ilişkilidir.",
            "Verilen normal sıcaklık ve madde plazma iddiasını desteklemez.",
            "Erime noktasının altındaki saf denge örneğine sıvı denmez.",
          ],
          commonError:
            "Notta geçen oda sıcaklığında sıvı cümlesini açık sıcaklık verisine rağmen kullanma.",
          check:
            "Karışım veya aşırı soğuma koşulu verilmemiştir; kökteki saf denge varsayımını koru.",
        },
      },
      {
        prompt: "Benzen C₆H₆ için (2C + 2−H)/2 doymamışlık eşdeğeri kaçtır?",
        options: ["4", "3", "1", "2", "6"],
        answer: 0,
        hint: "Açık doymuş altı C referansı C₆H₁₄’tür.",
        explanation:
          "Altı C için doymuş açık H sayısı 14. Gerçek H6 olduğundan eksik 8. 8/2=4 eşdeğer vardır. Bir halka+üç pi katkısı toplam 4’e karşılık gelir.",
        guidance: {
          knowledge: [
            "Her halka/pi eşdeğeri referanstan iki H eksikliğine karşılık gelir.",
          ],
          strategy: "14−6 farkını ikiye böl.",
          steps: [
            "Altı C için doymuş açık H sayısı 14.",
            "Gerçek H6 olduğundan eksik 8.",
            "8/2=4 eşdeğer vardır.",
          ],
          optionReasons: [
            "Doğru. 8/2=4 eşdeğer vardır.",
            "Yalnız üç pi katkısını sayar; halkayı dışlar.",
            "Yalnız halkayı sayar; pi sistemi eksik.",
            "H farkını yanlış hesaplar.",
            "Karbon sayısını eşdeğer sanır.",
          ],
          commonError:
            "Üç pi katkısını toplam doymamışlık sayısı sanıp halkayı unutma.",
          check: "Bir halka+üç pi katkısı toplam 4’e karşılık gelir.",
        },
      },
      {
        prompt: "Benzen için hangi ifade doğru bir koşul sınırı taşır?",
        options: [
          "Her koşulda alkenle aynı hızda Br₂ katılır",
          "Hiçbir koşulda katılma veremez",
          "Rezonans nedeniyle atomları korunmaz",
          "Bütün bağları kalıcı ve birbirinden farklı uzunluktadır",
          "Olağan alken brom testi gibi davranmaz; uygun farklı koşulda başka tepkimeler verebilir",
        ],
        answer: 4,
        hint: "Olağan koşulda beklenmeyen yol ile mutlak imkânsızlığı ayır.",
        explanation:
          "Benzen olağan brom deneyiyle basit alken gibi kolay katılmaz. Uygun katalitik hidrojenleme gibi farklı koşulda katılma mümkündür. Doğru ifade bu iki koşul sınırını birlikte korur. Aynı derste uygun bromlama yer değiştirme, uygun hidrojenleme katılma olarak ayrı verilebilir.",
        guidance: {
          knowledge: [
            "Aromatik kararlılık tepkime yolunu etkiler; koşul reaksiyon bilgisinin parçasıdır.",
          ],
          strategy:
            "Genellemedeki her/hiçbir sözcüklerini verilen kapsamla denetle.",
          steps: [
            "Benzen olağan brom deneyiyle basit alken gibi kolay katılmaz.",
            "Uygun katalitik hidrojenleme gibi farklı koşulda katılma mümkündür.",
            "Doğru ifade bu iki koşul sınırını birlikte korur.",
          ],
          optionReasons: [
            "Aromatik sistemin farklılığını ve koşulları yok sayar.",
            "Uygun hidrojenleme gibi karşı örnekleri dışlar.",
            "Rezonans atom korunumu yasasını değiştirmez.",
            "Gerçek benzenin eşdeğer halka bağlarıyla çelişir.",
            "Doğru. Doğru ifade bu iki koşul sınırını birlikte korur.",
          ],
          commonError:
            "Sınırlandırılmış bir okul örneğini bütün sıcaklık/katalizör/ortamlar için mutlak yasaya çevirmek.",
          check:
            "Aynı derste uygun bromlama yer değiştirme, uygun hidrojenleme katılma olarak ayrı verilebilir.",
        },
      },
      {
        prompt:
          "Modelde benzen için A katkı çiziminden çemberli gösterime geçiliyor; atomlar aynı konumda kalıyor. Hangisi değişmiştir?",
        options: [
          "Elektron yapısının çizim biçimi",
          "Molekül formülü",
          "Molekülün element türleri",
          "Halka bağlantı listesi",
          "Karbon sayısı",
        ],
        answer: 0,
        hint: "Görünür yeni atom veya bağ komşuluğu eklenip eklenmediğine bak.",
        explanation:
          "Altı C ve altı H yerinde kalır. Halka komşulukları ve formül C₆H₆ değişmez. Değişen elektron delokalizasyonunu anlatma çizimidir. Aynı kimlikteki benzen için iki çizimde de 6C/6H/6 halka kenarı bulunur.",
        guidance: {
          knowledge: [
            "Temsil değişimi, aynı molekülün birden fazla doğru çizim yöntemi olabilir.",
          ],
          strategy: "Sabit nicelikleri ele ve gösterim bilgisini seç.",
          steps: [
            "Altı C ve altı H yerinde kalır.",
            "Halka komşulukları ve formül C₆H₆ değişmez.",
            "Değişen elektron delokalizasyonunu anlatma çizimidir.",
          ],
          optionReasons: [
            "Doğru. Değişen elektron delokalizasyonunu anlatma çizimidir.",
            "Aynı atom sayımı C₆H₆’yı korur.",
            "Yeni bir element eklenmedi.",
            "Rezonans gösterimi C komşuluğunu değiştirmez.",
            "Altı karbon gösterimle artıp azalmaz.",
          ],
          commonError:
            "Ekrandaki çizgi değişimini moleküler dönüşüm gerçekleşti diye yorumlama.",
          check:
            "Aynı kimlikteki benzen için iki çizimde de 6C/6H/6 halka kenarı bulunur.",
        },
      },
    ],
    source:
      "MEBİ AYT Kimya: Hidrokarbonlar, Aromatik Hidrokarbonlar ve Alkoller; OGM ilgili Organik Bileşikler sunuları ve Dersler Cepte hedef öğretim sayfalarıyla karşılaştırılarak yazılmış özgün anlatım, şema, örnek ve sorular. Resmî sınav sorusu değildir. Fenolün faz bilgisi ayrıca NIST Chemistry WebBook normal erime verisiyle karşılaştırıldı.",
  },
  {
    id: "ayt-alkoller",
    topic: "detail-454",
    title: "Fonksiyonel gruplar ve alkoller: çevreyi oku, özelliği açıkla",
    minutes: 85,
    objectives: [
      "Başlıca fonksiyonel grupları açık bağlanmadan sınıflandır.",
      "OH’nin bağlı olduğu karbonu ve alkol derecesini belirle.",
      "Adlandırma, izomerlik, fiziksel özellik ve temel dönüşümleri gerekçelendir.",
    ],
    sections: [
      {
        title: "Molekülde hangi bölge işlev kazanır?",
        paragraphs: [
          "Fonksiyonel grup, bir organik yapının belirli tepkime ve özelliklerinde etkili atom veya atom grubudur. Aynı karbon iskeletine OH, NH₂ veya halojen bağlandığında farklı sınıflar elde edilebilir. Bununla birlikte özellik, grubun bağlı olduğu çevreyle birlikte değişir.",
          "R simgesi çoğu basit gösterimde bir organik grubu temsil eder; her zaman bir tane karbon anlamına gelmez. R–OH içindeki R’nin yerine CH₃ yazınca metanol, C₂H₅ yazınca etanol düşünülür. R ile yazılmış bağlanma yerini, eksi yüklü iyonun işaretiyle karıştırma.",
        ],
      },
      {
        title: "Hidroksil, eter ve halojenür",
        paragraphs: [
          "OH’nin uygun sp³ karbonuna bağlı olduğu basit yapılar alkol sınıfıdır. O atomu iki karbon grubunu tek bağlarla bağlayıp O–H taşımıyorsa eter köprüsü düşünülür. CH₃–CH₂–OH etanol, CH₃–O–CH₃ dimetil eterdir.",
          "C–Cl, C–Br veya diğer C–halojen bağlantısı halo türevi gösterir; alkil halojenürde halojen sp³ karbonundadır. Yapıda yalnız O harfini görmek eter tanısı için yeterli değildir: karboksilik asit ve esterlerde de O vardır. O’nun iki yanına hangi atomların, hangi bağlarla bağlı olduğunu oku.",
        ],
        table: {
          headers: ["Bağlanma", "Sınıf", "Örnek"],
          rows: [
            ["sp³ C–OH", "Alkol", "Etanol"],
            ["C–O–C (karbonile komşu değil)", "Eter", "Dimetil eter"],
            ["C–Cl", "Halo türev", "Kloroetan"],
          ],
        },
      },
      {
        title: "Karbonilden aldehit ve ketona",
        paragraphs: [
          "Karbonil C=O grubudur. Karbonil karbonu H’ye bağlıysa aldehit alt sınıfını; iki karbon grubuna bağlıysa ketonu düşünürüz. Etanal CH₃CHO bir aldehit, propanon CH₃COCH₃ bir ketondur.",
          "Karbonil yalnız aldehit ve ketonlarda bulunmaz; karboksilik asit, ester ve amidlerde de C=O vardır. Bu nedenle C=O’yu bulduktan sonra karbonil karbonunun öteki komşularını kontrol et. Aldehit/keton ayrımını her karbonil içeren bileşiğe zorla uygulamak eksik sınıflama verir.",
        ],
        table: {
          headers: ["Karbonil çevresi", "Sınıf", "Örnek"],
          rows: [
            ["C(=O)–H", "Aldehit", "CH₃CHO"],
            ["C–C(=O)–C", "Keton", "CH₃COCH₃"],
            ["C(=O)–OH", "Karboksilik asit", "CH₃COOH"],
            ["C(=O)–O–C", "Ester", "CH₃COOCH₃"],
          ],
        },
      },
      {
        title: "Karboksil ile ester aynı OH değildir",
        paragraphs: [
          "C(=O)OH karboksil grubudur ve basit karboksilik asitleri tanıtır. Bu gruptaki OH, C=O karbonuna bağlıdır; sıradan alkolün OH’si olarak sayılmaz. Etanoik asit CH₃COOH bu örnektir.",
          "Karboksilik asidin OH hidrojeninin yerinde organik grup bulunan C(=O)OR bağıntısı ester sınıfını verir. CH₃COOCH₃ metil etanoatta iki O vardır; bunlardan biri karbonil, diğeri köprü O’sudur. Köprü O’sunun karbonile komşuluğu onu sıradan dimetil eterden ayırır.",
        ],
      },
      {
        title: "Amino, nitro ve çok işlevli yapılar",
        paragraphs: [
          "Amino grubu NH₂, nitro grubu NO₂ biçiminde yazılır; birindeki H sayısı diğerindeki O sayısının yerine geçmez. Basit bir alkile bağlı NH₂ amin, NO₂ nitro bileşiği örneğidir. Azotun bağlanma çevresi ve yükleri bu iki sınıfta farklıdır.",
          "Laktik asit CH₃–CH(OH)–COOH’de ayrı bir alkol OH’si ve karboksil bulunur; glisin NH₂–CH₂–COOH’de amino ve karboksil vardır. Birden çok işlev birlikte taşınabilir. Karboksilin kendi O–H bağını ikinci, bağımsız bir alkol grubu gibi sayma.",
        ],
      },
      {
        title: "Alkolün bağlanma koşulunu bul",
        paragraphs: [
          "Alkol sınıflamasının merkezi, OH’nin hangi karbon atomuna bağlı olduğudur. Etanolde O, sp³ CH₂ karbonuna; fenolde doğrudan aromatik sp² karbona bağlıdır. Fenol ve alkol bu nedenle ayrı adlandırılır.",
          "Benzil alkol C₆H₅CH₂OH’de OH, halka dışındaki sp³ CH₂ karbonuna bağlıdır; aromatik halka içerse de alkol grubu vardır. Bir yapının herhangi bir yerinde çift bağ bulunması bütün OH’leri alkol olmaktan çıkarmaz. Yerel OH karbonunu incele; örneğin CH₂=CH–CH₂OH bir doymamış alkoldür.",
        ],
      },
      {
        title: "Genel formül hangi alkollere uyar?",
        paragraphs: [
          "Açık zincirli doymuş tek OH’li alkolün genel formülü CₙH₂ₙ₊₂O’dur. Etanol C₂H₆O, 1-propanol C₃H₈O bu koşulu sağlar. Sikloalkanol veya başka çoklu bağ taşıyan alkolde halka/pi bağı H sayısını değiştirir.",
          "Tek OH’ye monoalkol, birden çok alkol OH’sine polialkol denir. Basit açık doymuş diolde O₂, triolde O₃ bulunur; aynı iskeletin H sayısı OH eklenirken yer değiştirme hesabıyla kontrol edilir. Genel formülü yapının bütün sınırlamalarını söylemeden kullanma.",
        ],
      },
      {
        title: "Birinci, ikinci ve üçüncü derece",
        paragraphs: [
          "OH’nin bağlı olduğu alfa karbonunun doğrudan kaç karbon komşusu olduğunu say. Bir C komşusu birincil, iki C komşusu ikincil, üç C komşusu üçüncül alkolü verir. Etanol, 2-propanol ve tert-bütanol bu sıralı örneklerdir.",
          "Bütün moleküldeki toplam karbon sayısı dereceyi belirlemez. Dört karbonlu 1-bütanol birincil, 2-bütanol ikincil, 2-metil-2-propanol üçüncüldür. Metanolün alfa karbonunda hiç C komşusu yoktur; bu özel en küçük üye, birçok temel tepkime sınıflamasında birincil davranışla birlikte ele alınır.",
        ],
      },
      {
        title: "Alfa H ile OH üzerindeki H farklıdır",
        paragraphs: [
          "Etanolün alfa karbonu CH₂ olduğundan iki H taşır; 2-propanolün alfa CH karbonu bir H, tert-bütanolün alfa C karbonu sıfır H taşır. Bu H’ler karbon üzerinde bulunur. O–H bağındaki H, her basit monoalkolde ayrıca vardır.",
          "Yükseltgenme yorumunda alfa H bulunması önemlidir. Sadece molekülde herhangi bir H bulunduğunu söylemek yetmez; tert-bütanolde çok sayıda metil H’si olmasına rağmen alfa H yoktur. Modelde OH grubunu seç ve işaretli C’nin komşularını tabloda yeniden say.",
        ],
      },
      {
        title: "Çok OH’li yapıyı parçalarına ayır",
        paragraphs: [
          "Etan-1,2-diol HO–CH₂–CH₂–OH iki alkol OH’si taşır; yaygın adı glikoldür. Propan-1,2,3-triol HO–CH₂–CH(OH)–CH₂–OH üç OH taşır; gliserin olarak bilinir. Her OH’nin alfa çevresi ayrıca değerlendirilebilir.",
          "Gliserinin uç OH’leri birincil, ortadaki OH ikincil çevrededir. “Molekül üç OH içerir, o hâlde üçüncül alkoldür” yanlıştır: OH sayısı ile bir OH’nin bağlı olduğu C’nin derecesi farklı sınıflamalardır. Bu iki sayıyı ayrı sütunlarda tutmak karışmayı önler.",
        ],
      },
      {
        title: "Ana zinciri OH ile birlikte seç",
        paragraphs: [
          "Basit alkol adlandırmasında OH’ye bağlı karbonu içeren uygun en uzun zinciri seç. Numaralamada OH’ye en küçük yer numarasını veren ucu kullan. Ardından yan grupları, ana zinciri, OH yerini ve -ol ekini birleştir.",
          "CH₃–CH(OH)–CH₂–CH₃ için 2-bütanol veya bütan-2-ol adlarıyla karşılaşılır. OH’nin yerini söyleyen 2 ile toplam dört karbonu söyleyen büt- farklı bilgidir. Dalı ana zincire katarken OH taşıyan karbonu dışarıda bırakan daha uzun bir yol seçme.",
        ],
      },
      {
        title: "Dal, çoklu bağ ve birden çok OH",
        paragraphs: [
          "2-Metil-2-propanolde üç karbonluk OH içeren ana zincirin ikinci karbonunda bir metil dalı vardır. CH₂=CH–CH(OH)–CH₃ gibi uygun yapıda ise OH önceliğiyle numaralama seçilir, çoklu bağın yeri ayrıca belirtilir.",
          "Birden fazla OH’de bütün yerler yazılır ve diol/triol eki kullanılır. Gliserin için propan-1,2,3-triol adı, üç OH’nin farklı karbonlarda bulunduğunu açıklar. Halkalı basit sikloalkanolde OH’nin bağlı olduğu karbon temel numaralamada 1 kabul edilir; başka grupların konumları ona göre verilir.",
        ],
      },
      {
        title: "Alkol ve eter izomerliğini sayarak doğrula",
        paragraphs: [
          "Etanol CH₃CH₂OH ile dimetil eter CH₃OCH₃ aynı C₂H₆O formülünü taşır; bağlantıları ve işlevleri farklıdır. Bu ikili fonksiyonel grup izomerliğidir. Etanolü dietil eterle eşlemek yanlıştır: dietil eterde dört C vardır.",
          "Metanol CH₄O için aynı formüllü sıradan bir eter kurmak mümkün değildir; eter O’sunun iki karbon grubuna bağlanması gerekir. En az iki C koşulu bu küçük örnekte doğrudan bağlantıdan çıkar. Formül eşitliğini izomer adı vermeden önce kontrol et.",
        ],
      },
      {
        title: "Konum ve iskelet izomerlerini ayır",
        paragraphs: [
          "1-Propanol ile 2-propanolde aynı üç karbon zincirinde OH’nin yeri değişir; konum izomerleridir. 1-Bütanol ile 2-metil-1-propanolde karbon iskeleti değişir; aynı formüllü iskelet izomerleridir.",
          "Dört karbonlu basit doymuş açık monoalkollerin yapı izomerleri 1-bütanol, 2-bütanol, 2-metil-1-propanol ve 2-metil-2-propanoldür. Burada yalnız bağlantıları sayıyoruz; olası optik izomerleri ayrı bir sayım problemi olarak ele alırız. Sağdan veya soldan numaralanan aynı çizimi iki kez sayma.",
        ],
      },
      {
        title: "Hidrojen bağını doğru yerde çiz",
        paragraphs: [
          "Alkolün O–H bağı molekül içi kovalent bağdır. Bir moleküldeki O–H hidrojeninin başka molekülün O elektron çiftiyle etkileşmesi ise moleküller arası hidrojen bağıdır. Bunlar aynı bağ türü veya aynı çizgi değildir.",
          "Etanol molekülleri hem O–H vericisi hem O üzerindeki elektron çiftleriyle alıcısı olabilir. Dimetil eterde O vardır ama O–H yoktur; kendi saf molekülleri arasında sıradan O–H kaynaklı aynı vericiliği göstermez. Su ile karışımda ise eter O’su suyun H bağını alabilir.",
        ],
      },
      {
        title: "Kaynamayı benzer örneklerle karşılaştır",
        paragraphs: [
          "Yakın büyüklükteki alkol ve eter/alkan örneklerinde alkollerin moleküller arası H bağı daha yüksek kaynama noktasına katkı verebilir. Aynı basit homolog monoalkol serisinde karbon zinciri büyüdükçe London katkısı da genellikle büyür.",
          "Bu eğilimlerden “her alkol bütün eterlerden daha yüksek kaynar” sonucu çıkmaz; molekül kütlesi, şekil ve grup sayısı birlikte önemlidir. Erime sıcaklığında kristal simetrisi/paketlenme ayrıca etkili olduğundan kaynama eğilimini otomatik erime sırasına taşıma.",
        ],
      },
      {
        title: "Dallanma ile OH sayısını ayrı değiştir",
        paragraphs: [
          "Aynı formüllü uygun monoalkol izomerlerinde daha dallanmış yapının etkili temas yüzeyi azalabilir ve kaynama düşebilir. Kaynaklarda 1-bütanol, 2-bütanol ve tert-bütanol kıyası buna örnek verilir; tek başına alkol derece adını evrensel termometre yapmayız.",
          "Benzer karbon iskeletinde OH sayısı arttığında H bağı kurma olanakları ve kaynama eğilimi artabilir. Örneğin bir propanol ile propandiol/gliserin karşılaştırması bu yöndedir. Farklı bütün molekülleri sadece OH adedine göre sıralamadan önce verilen yapı ve koşulları kontrol et.",
        ],
      },
      {
        title: "Sudaki çözünürlük iki parçanın dengesidir",
        paragraphs: [
          "OH grubu su ile H bağı ve polar etkileşimler kurabilir; karbon zinciri büyüdükçe hidrofob bölümün etkisi artar. Küçük metanol ve etanol suyla iyi karışabilirken uzun zincirli monoalkollerde su çözünürlüğü azalır.",
          "Aynı temel iskelette birden çok OH bulunması suyla etkileşme fırsatını artırabilir. “Alkoller suda iyi çözünür” sözü bütün zincir uzunlukları için sonsuz çözünürlük demek değildir. Soruda karbon sayısı ve OH sayısını birlikte karşılaştır; yalnız molekülde O var diye aynı çözünürlük sonucu verme.",
        ],
      },
      {
        title: "OH grubu hidroksit iyonu değildir",
        paragraphs: [
          "Etanoldeki –OH, kovalent molekülün parçasıdır; çözünürken NaOH gibi bol OH⁻ saldığı varsayılmaz. Basit alkol çözeltileri temel lise bağlamında moleküler çözünme ve elektrolit olmama özelliğiyle ele alınır.",
          "Bir formülde OH harflerini görmek bazik çözelti sonucunu tek başına vermez. Fenolün zayıf asit davranışı ve karboksilik asidin OH’si farklı yerel çevrelerdedir. Alkolün çok zayıf asitlik/bazlık etkileşimleri, suda kuvvetli elektrolit gibi davranacağı anlamına gelmez.",
        ],
      },
      {
        title: "Metanol ve etanolü ayrı kimliklerle öğren",
        paragraphs: [
          "Metanol CH₃OH en küçük alkoldür; “odun alkolü” tarihsel adıdır. Normal basınçta yaklaşık 64,7°C’de kaynar; toksik etkisi ve görme hasarı riskiyle etanolden ayrı bir kimyasal kimliktir. Etanol C₂H₅OH normal basınçta yaklaşık 78°C’de kaynar; ad benzerliği bu iki maddenin birbirinin yerine geçebileceğini göstermez.",
          "Etanol uygun çözücü, antiseptik ürün ve yakıt karışımlarında yer alabilir; etkinlik koşuldan bağımsız sabit yüzde diye verilmez. Glikol iki OH’li bir diol ve uygun antifriz formülasyonları için örnektir; gliserin üç OH’li trioldür. İzopropil alkol uygun antibakteriyel ürünlerle ilişkilidir. Formül, OH sayısı ve kullanım bağlamı birlikte öğrenilir; bu adlar tadım veya uygulama yönergesi değildir.",
        ],
      },
      {
        title: "Etanolün oluşumunda atom sayısını denetle",
        paragraphs: [
          "Glikozun ideal alkol fermantasyonu denkliği C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ biçimindedir. Altı C’nin dördü iki etanolde, ikisi iki CO₂’de bulunur; H ve O sayıları da korunur. Verim ayrıca verilmediyse stokiyometrik üst sınır hesaplanır.",
          "Etanol ayrıca etene asit katalizli su katılması veya etanalin indirgenmesiyle elde edilebilir. Etanal + H₂ → etanol denkliğinde C=O bağı alkole dönüşür. Yöntem adından önce başlangıç sınıfını ve hangi bağın değiştiğini söylemek, organik dönüşümleri aynı zincirde öğrenmeyi sağlar.",
        ],
      },
      {
        title: "Alkil halojenürden alkole geçiş",
        paragraphs: [
          "Basit örnekte kloroetanın sulu uygun hidroksit ortamındaki yer değiştirmesi CH₃CH₂Cl + OH⁻ → CH₃CH₂OH + Cl⁻ olarak yazılır. Karbon iskeleti korunur; C–Cl yerine C–O bağlantısı oluşur. İyon yükleri iki yanda da −1’dir.",
          "Bütün halojenürler ve her çözücü/sıcaklık aynı ürün oranını vermez; eliminasyon gibi yollar koşula bağlı yarışabilir. Bu dersin basit sulu örneğinde alkol oluşumu seçilmiştir. Alkollü baz koşulunu otomatik aynı sonuçla bir tutma; kökte verilen ortam tepkime bilgisinin parçasıdır.",
        ],
      },
      {
        title: "Temel yükseltgenmeyi alfa çevresiyle açıkla",
        paragraphs: [
          "Uygun kontrollü yükseltgenmede birincil alkol önce aldehide, daha ileri koşulda karboksilik aside dönüşebilir. Etanol → etanal → etanoik asit bu sıradır. İkincil alkol uygun yükseltgenmeyle keton verir; 2-propanol → propanon örneğidir.",
          "Üçüncül alkolde alfa H bulunmadığından aynı basit C–C bağı korunan yükseltgenme yolunu beklemeyiz. Bu, hiçbir sert koşulda asla tepkime vermez demek değildir. Çözümde oksijen eklenmesinin her zaman moleküle yeni bir O katılması anlamına gelmediğini, H kaybının da yükseltgenmeyle ilişkili olduğunu ayır.",
        ],
      },
      {
        title: "Modelde işlevi yerinde bul",
        paragraphs: [
          "Listeden bir yapı seç ve renkli grup düğmelerine dokun. Model O’nun bağlarına ve karbonil komşuluğuna bakarak alkol, fenol, eter, asit, ester, aldehit veya keton ayrımını gösterir. N içeren örneklerde amino ve nitro ayrı işaretlenir.",
          "Gliserinde üç OH’nin farklı alfa çevrelerini; laktik asitte alkol OH’si ile karboksil OH’sinin farkını karşılaştır. Amaç sayfadaki formülü bir sınıf adına çevirmekten öte her grubu gerçek bağlı atomlarıyla gösterebilmektir. Keşif ve örnek açma bağımsız soru cevabı yerine geçmez.",
        ],
      },
      {
        title: "Siyano grubunda bağın ucunu oku",
        paragraphs: [
          "Siyano veya nitril grubu R–C≡N biçiminde gösterilir. Organik iskelet, üçlü bağın karbon ucuna bağlıdır; uç atom N’dir. CH₃–C≡N asetonitril örneğinde iki karbon ve bir azot vardır. C≡N bir sigma ve iki pi bağı içerir; üçlü bağın bu yerel C/N çevresi doğrusal modellenir.",
          "Nitril grubunu R–C≡C–H uç alkiniyle karıştırma: birinde terminal atom N, ötekinde C ve ona bağlı H vardır. Nitrilin N’si bir amino NH₂ grubu değildir; azot bulunması tek başına amin sınıfı vermez. Modelde CH₃CN seçilince üçlü C–N bağı ve siyano grubu ayrı işaretlenir; başka işlevlerin birlikte bulunması tüm OH’leri otomatik yasaklamaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Bir OH’nin derecesi",
        prompt: "CH₃–CH(OH)–CH₂–CH₃ alkolünün adını ve derecesini bul.",
        strategy: "OH karbonunu işaretle ve yalnız doğrudan C komşularını say.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Dört C’li ana zincirde OH’ye en yakın uçtan yer numarası 2’dir.",
          },
          {
            label: "Adım 2",
            explanation:
              "OH karbonu soldaki CH₃ ve sağdaki CH₂’ye bağlıdır; iki C komşusu vardır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Adı 2-bütanol, derecesi ikincildir; alfa karbonunda bir H bulunur.",
          },
        ],
        answer: "2-Bütanol; ikincil alkol.",
        check:
          "Toplam dört C bulunması üçüncül veya dördüncül alkol anlamına gelmez.",
        pitfall: "Dereceyi moleküldeki toplam karbon sayısından çıkarma.",
      },
      {
        title: "Farklı üç OH çevresi",
        prompt:
          "Bütan-1,2,4-triol HOCH₂–CH(OH)–CH₂–CH₂OH’deki OH derecelerini belirle.",
        strategy: "Üç OH için alfa C’leri ayrı ayrı incele.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "1 ve 4 numaralı uç CH₂ karbonları birer C’ye bağlıdır; iki birincil OH vardır.",
          },
          {
            label: "Adım 2",
            explanation:
              "2 numaralı CH iki C komşusuna bağlıdır; buradaki OH ikincildir.",
          },
          {
            label: "Adım 3",
            explanation: "Toplam üç alkol OH’si vardır ama üçüncül OH yoktur.",
          },
        ],
        answer: "İki birincil, bir ikincil OH; bir triol.",
        check:
          "OH sayısı 3 ile alfa C komşusu sayısı aynı sınıflama değildir; 3 numaralı CH₂ OH taşımaz.",
        pitfall: "Triol sözcüğünü üçüncül alkol diye okuma.",
      },
      {
        title: "Üç karbonlu işlev izomerliği",
        prompt:
          "1-Propanol CH₃CH₂CH₂OH ile metoksietan CH₃OCH₂CH₃ formüllerini hesapla.",
        strategy: "C ve H’leri her grup üzerinde ayrı say.",
        steps: [
          {
            label: "Adım 1",
            explanation: "1-Propanolde C3, H=3 + 2 + 2 + 1=8, O1 bulunur.",
          },
          {
            label: "Adım 2",
            explanation: "Metoksietanda C3, H=3 + 2 + 3=8, O1 bulunur.",
          },
          {
            label: "Adım 3",
            explanation:
              "İki formül C₃H₈O; birinde O–H, ötekinde C–O–C vardır.",
          },
        ],
        answer: "Aynı C₃H₈O formülünde alkol/eter işlev izomerleridir.",
        check:
          "Metoksietanın O’suna bir metil ve bir etil bağlıdır; ikisini de ayrı C toplamına kat.",
        pitfall:
          "Molekül adındaki tek grup sözüne bakıp öteki bağlı grubun C’lerini unutma.",
      },
      {
        title: "İki karbonlu hidroksi asitte grup sayımı",
        prompt:
          "HO–CH₂–C(=O)OH hidroksietanoik asitte kaç alkol OH ve kaç karboksil vardır?",
        strategy:
          "O–H bağlarını bulduktan sonra bağlı C’lerin çevrelerini ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "CH₂ üzerindeki OH sp³ C’ye bağlıdır; bir alkol grubudur.",
          },
          {
            label: "Adım 2",
            explanation:
              "C(=O)OH tek karboksil grubu oluşturur; kendi OH’si ayrı sıradan alkol değildir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Yapı bir alkol OH ve bir karboksil taşır; formül C₂H₄O₃’tür.",
          },
        ],
        answer: "1 alkol OH ve 1 karboksil.",
        check: "Toplam iki O–H bağı vardır; alkol grubu sayısı yalnız birdir.",
        pitfall:
          "Formüldeki bütün OH yazımlarını çevresine bakmadan alkol sayma.",
      },
      {
        title: "İdeal ürün ve gerçek verim",
        prompt:
          "0,25 mol glikozun alkol fermantasyonunda etanol verimi ideal miktarın %80’idir. Gerçek etanolü bul.",
        strategy:
          "Önce 2 etanol/glikoz oranıyla ideal miktarı bul, sonra verim oranını uygula.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Bir glikoz ideal 2 etanol ve 2CO₂ verir; 0,25 mol için ideal etanol 0,50 moldür.",
          },
          {
            label: "Adım 2",
            explanation:
              "Verim %80=0,80 olduğundan gerçek etanol 0,50×0,80=0,40 moldür.",
          },
          {
            label: "Adım 3",
            explanation:
              "0,40 mol etanol ideal 0,50 mol üst sınırın altındadır; verim kaybı 0,10 mol eşdeğer üründür.",
          },
        ],
        answer: "0,40 mol gerçek etanol.",
        check:
          "%80’i başlangıç glikoz molüne tek başına uygulama; önce mol oranı 2 kullanılmalıdır.",
        pitfall:
          "Verimi ideal katsayı yerine koyarak karbon stokiyometrisini değiştirme.",
      },
    ],
    recall: [
      {
        prompt: "Alkol derecesinde ne sayılır?",
        answer:
          "OH karbonunun doğrudan C komşuları; bütün molekülün C sayısı değil.",
      },
      {
        prompt: "Benzil alkol ile fenol aynı sınıf mı?",
        answer:
          "Hayır; birinde OH sp³ CH₂’ye, diğerinde aromatik sp² karbona doğrudan bağlıdır.",
      },
      {
        prompt: "Karboksil OH’si ikinci alkol grubu mu?",
        answer: "Hayır; C(=O)OH bütünü asit işlevidir.",
      },
      {
        prompt: "Etanol neden NaOH gibi baz değil?",
        answer:
          "OH kovalent molekül parçasıdır; suda bol OH⁻ salan iyonik hidroksit değildir.",
      },
      {
        prompt: "Glikozdan ideal etanol/CO₂ katsayıları?",
        answer: "1 glikoz → 2 etanol + 2 CO₂; C/H/O sayıları korunur.",
      },
    ],
    items: [
      {
        prompt:
          "(CH₃)₃C–OH yapısında OH’nin bağlı olduğu karbonun doğrudan C komşusu kaçtır ve alkol derecesi nedir?",
        options: [
          "1; birincil",
          "4; dördüncül",
          "2; ikincil",
          "0; metanol",
          "3; üçüncül",
        ],
        answer: 4,
        hint: "Yalnız OH karbonuna doğrudan bağlı C atomlarını say.",
        explanation:
          "Merkez C’ye üç ayrı CH₃ karbonu bağlıdır. Dördüncü bağ O’ya gider; bu bir C komşusu değildir. C komşusu 3 olduğundan alkol üçüncüldür. Merkez C’nin 3C + 1O tek bağı değerlik 4’ü tamamlar; alfa H0’dır.",
        guidance: {
          knowledge: ["Alkol derecesi OH karbonunun C komşuluğudur."],
          strategy: "Merkez C’nin üç metil ve bir O bağına bak.",
          steps: [
            "Merkez C’ye üç ayrı CH₃ karbonu bağlıdır.",
            "Dördüncü bağ O’ya gider; bu bir C komşusu değildir.",
            "C komşusu 3 olduğundan alkol üçüncüldür.",
          ],
          optionReasons: [
            "Üç metili tek bir C komşusu gibi toplar.",
            "Merkez C kendisine komşu sayılmaz; OH için bir bağ yeri gerekir.",
            "Metil kollarından birini eksiltir.",
            "Metanolde alfa C’ye hiç C bağlı değildir; bu yapı farklı.",
            "Doğru. C komşusu 3 olduğundan alkol üçüncüldür.",
          ],
          commonError:
            "Toplam 4C’li molekülü dördüncül alkol olarak adlandırma.",
          check:
            "Merkez C’nin 3C + 1O tek bağı değerlik 4’ü tamamlar; alfa H0’dır.",
        },
      },
      {
        prompt: "Gliserin HOCH₂–CH(OH)–CH₂OH için hangi ifade doğrudur?",
        options: [
          "Üç OH taşır; iki birincil ve bir ikincil alkol çevresi vardır",
          "Yalnız tek alkol OH’si vardır",
          "Hiçbir O–H bağı yoktur",
          "Bütün OH’ler karboksildir",
          "Üç OH olduğundan bütün grupları üçüncüldür",
        ],
        answer: 0,
        hint: "Grup sayısı ile alfa karbon derecesini ayrı sütunlara yaz.",
        explanation:
          "Üç ayrı OH bulunur; bu bir trioldür. Uç C’lerde bir C komşusu, ortada iki C komşusu vardır. İki birincil ve bir ikincil OH çevresi bulunur. Uçlar CH₂OH, orta CH(OH); her birinin H ve komşuları ayrı sayılabilir.",
        guidance: {
          knowledge: [
            "Polialkol sınıflaması OH sayısı; derece yerel C komşuluğuyla yapılır.",
          ],
          strategy: "İki uç CH₂ ile orta CH’yi ayrı incele.",
          steps: [
            "Üç ayrı OH bulunur; bu bir trioldür.",
            "Uç C’lerde bir C komşusu, ortada iki C komşusu vardır.",
            "İki birincil ve bir ikincil OH çevresi bulunur.",
          ],
          optionReasons: [
            "Doğru. İki birincil ve bir ikincil OH çevresi bulunur.",
            "Üç OH’den ikisini yok sayar.",
            "Üç OH yazımı üç O–H bağı içerir.",
            "C=O olmadığı için karboksil grubu yoktur.",
            "Triol ile üçüncül alkolü aynı kavram sanır.",
          ],
          commonError:
            "Bir moleküldeki OH sayısını OH karbonunun C komşusu sayısı sanma.",
          check:
            "Uçlar CH₂OH, orta CH(OH); her birinin H ve komşuları ayrı sayılabilir.",
        },
      },
      {
        prompt: "HO–CH₂–CH₂–OH etan-1,2-diol için alkol OH sayısı kaçtır?",
        options: ["0", "1", "2", "3", "4"],
        answer: 2,
        hint: "Her O–H’nin bağlı olduğu sp³ C’yi bul.",
        explanation:
          "Solda CH₂’ye bağlı bir OH vardır. Sağda öteki CH₂’ye bağlı ikinci OH vardır. Toplam 2 alkol OH’si bulunur. Formül C₂H₆O₂; iki O’nun her biri bir H taşır.",
        guidance: {
          knowledge: [
            "İki farklı sp³ karbona bağlı iki OH bir diol oluşturur.",
          ],
          strategy: "İki uçtaki OH’yi tek tek işaretle.",
          steps: [
            "Solda CH₂’ye bağlı bir OH vardır.",
            "Sağda öteki CH₂’ye bağlı ikinci OH vardır.",
            "Toplam 2 alkol OH’si bulunur.",
          ],
          optionReasons: [
            "Moleküldeki iki OH’yi yok sayar.",
            "İki ucu tek OH sanır.",
            "Doğru. Toplam 2 alkol OH’si bulunur.",
            "C sayısını veya hayali bir OH’yi ekler.",
            "OH’deki O ve H’yi ayrı grup sayar.",
          ],
          commonError:
            "OH atom grubunun iki elementini iki ayrı hidroksil gibi sayma.",
          check: "Formül C₂H₆O₂; iki O’nun her biri bir H taşır.",
        },
      },
      {
        prompt:
          "CH₃–CH(OH)–C(=O)OH laktik asitte kaç alkol OH ve kaç karboksil grubu vardır?",
        options: [
          "0 alkol OH; 2 karboksil",
          "2 alkol OH; 0 karboksil",
          "3 alkol OH; 1 karboksil",
          "1 alkol OH; 2 karboksil",
          "1 alkol OH; 1 karboksil",
        ],
        answer: 4,
        hint: "OH’nin bağlı olduğu C’de C=O olup olmadığını kontrol et.",
        explanation:
          "Orta CH(OH) bir alkol grubu taşır. Uç C(=O)OH tek bir karboksil oluşturur. Sonuç 1 alkol OH ve 1 karboksildir. Üç O’dan biri karbonil, ikisi O–H; bu ikincilerin yalnız biri alkol C’sine bağlıdır.",
        guidance: {
          knowledge: [
            "C(=O)OH bir asit işlevidir; bağımsız sıradan alkol OH’si sayılmaz.",
          ],
          strategy: "Orta sp³ CH ile uç karbonil C’nin çevrelerini ayır.",
          steps: [
            "Orta CH(OH) bir alkol grubu taşır.",
            "Uç C(=O)OH tek bir karboksil oluşturur.",
            "Sonuç 1 alkol OH ve 1 karboksildir.",
          ],
          optionReasons: [
            "Ortadaki gerçekalkol OH’sini yok sayar ve asiti ikiye çıkarır.",
            "Karbonil komşuluğunu yok sayıp asit OH’sini alkol sayar.",
            "Üç O atomunu üç alkol OH’si gibi sayar.",
            "Tek C(=O)OH iki karboksil değildir.",
            "Doğru. Sonuç 1 alkol OH ve 1 karboksildir.",
          ],
          commonError:
            "Bütün O–H bağlarını çevresine bakmadan alkol işlevi kabul etmek.",
          check:
            "Üç O’dan biri karbonil, ikisi O–H; bu ikincilerin yalnız biri alkol C’sine bağlıdır.",
        },
      },
      {
        prompt:
          "C₆H₅CH₂OH benzil alkoldeki OH grubu neden fenolik OH olarak sınıflanmaz?",
        options: [
          "Molekül O içermez",
          "OH doğrudan halka C’sine değil sp³ CH₂’ye bağlıdır",
          "Benzen halkası mutlaka yoktur",
          "Toplam C sayısı bir olduğundan",
          "OH negatif hidroksit iyonudur",
        ],
        answer: 1,
        hint: "O ile halka arasındaki CH₂’yi açıkça göster.",
        explanation:
          "O, CH₂ karbonuna tek bağlıdır. Bu CH₂ halka dışındasp³ bir C’dir. Bu nedenle OH alkol grubudur; doğrudan fenolik OH değildir. Fenol C₆H₅OH’de aradaki CH₂ bulunmaz; iki bağlantıyı yan yana çiz.",
        guidance: {
          knowledge: [
            "Fonksiyonel sınıf OH’ye doğrudan bağlı C’nin çevresine göre ayrılır.",
          ],
          strategy:
            "OH’nin ilk C komşusuna bak; uzaktaki halka tek başına karar vermez.",
          steps: [
            "O, CH₂ karbonuna tek bağlıdır.",
            "Bu CH₂ halka dışındasp³ bir C’dir.",
            "Bu nedenle OH alkol grubudur; doğrudan fenolik OH değildir.",
          ],
          optionReasons: [
            "OH içinde O açıkça vardır.",
            "Doğru. Bu nedenle OH alkol grubudur; doğrudan fenolik OH değildir.",
            "C₆H₅ parçası aromatik halkadır.",
            "Altı halka C+bir CH₂ toplam 7C yapar.",
            "Yazım kovalent OH’dir; yükü verilmiş OH⁻ iyonu değil.",
          ],
          commonError: "Aromatik halka içeren her OH’li molekülü fenol sayma.",
          check:
            "Fenol C₆H₅OH’de aradaki CH₂ bulunmaz; iki bağlantıyı yan yana çiz.",
        },
      },
      {
        prompt:
          "Etanol CH₃CH₂OH’nin aynı formüllü fonksiyonel grup izomeri hangisidir?",
        options: [
          "Etanoik asit CH₃COOH",
          "Etanal CH₃CHO",
          "Dimetil eter CH₃OCH₃",
          "Dietil eter C₂H₅OC₂H₅",
          "Metanol CH₃OH",
        ],
        answer: 2,
        hint: "Her adayın atom sayısını etanolün C₂H₆O’su ile karşılaştır.",
        explanation:
          "Etanol C₂H₆O’dur. Dimetil eter iki CH₃ ve O ile C₂H₆O verir. Aynı formülde alkol/eter bağlantı farkı olduğundan doğru izomer budur. Dimetilde iki 1C’li grup, di-etilde iki 2C’li grup bulunduğundan karşılaştırma değişir.",
        guidance: {
          knowledge: [
            "Fonksiyonel izomerlikte formül aynı, işlev bağlantısı farklıdır.",
          ],
          strategy:
            "Önce C/H/O sayımını yap; sonra O–H ile C–O–C ayrımını kur.",
          steps: [
            "Etanol C₂H₆O’dur.",
            "Dimetil eter iki CH₃ ve O ile C₂H₆O verir.",
            "Aynı formülde alkol/eter bağlantı farkı olduğundan doğru izomer budur.",
          ],
          optionReasons: [
            "Etanoik asit C₂H₄O₂; O ve H sayıları farklıdır.",
            "Etanal C₂H₄O; iki H eksiktir.",
            "Doğru. Aynı formülde alkol/eter bağlantı farkı olduğundan doğru izomer budur.",
            "İki etil toplam 4C/10H taşır; C₄H₁₀O farklıdır.",
            "Tek C içerir; formül C₁H₄O farklıdır.",
          ],
          commonError:
            "Eter adındaki di- ekinin toplam karbonu tek başına belirlediğini sanma.",
          check:
            "Dimetilde iki 1C’li grup, di-etilde iki 2C’li grup bulunduğundan karşılaştırma değişir.",
        },
      },
      {
        prompt:
          "Saf etanol molekülleri arasındaki hidrojen bağını hangi tanım doğru ayırır?",
        options: [
          "Aynı molekül içindeki O–H kovalent bağının kendisi",
          "Etanolün Na⁺ ve OH⁻ iyonlarına ayrılması",
          "İki C atomu arasındaki pi bağı",
          "Bir molekülün O–H H’si ile başka molekülün O elektron çiftinin etkileşimi",
          "C–C sigma bağının kırılması",
        ],
        answer: 3,
        hint: "Molekül içi kovalent bağ ile moleküller arası çekimi ayrı düşün.",
        explanation:
          "Etanol bir O–H vericisi taşır. Başka molekülün O’su elektron çiftleriyle alıcı olabilir. Bu iki molekül arasındaki etkileşim hidrojen bağıdır. Dimetil eterde O olsa da O–H vericisi yok; su varsa O alıcılık yapabilir.",
        guidance: {
          knowledge: [
            "Hidrojen bağı burada farklı moleküllerin uygun verici/alıcı bölgeleri arasındadır.",
          ],
          strategy: "O–H vericisini ve öteki O alıcısını işaretle.",
          steps: [
            "Etanol bir O–H vericisi taşır.",
            "Başka molekülün O’su elektron çiftleriyle alıcı olabilir.",
            "Bu iki molekül arasındaki etkileşim hidrojen bağıdır.",
          ],
          optionReasons: [
            "O–H kovalent bağı ile moleküller arası H bağını eşitler.",
            "Etanolde Na bulunmaz; bu iyonlaşma uydurulmuş.",
            "Etanolde C=C yok; H bağı da pi bağı değildir.",
            "Doğru. Bu iki molekül arasındaki etkileşim hidrojen bağıdır.",
            "H bağı kurulması C–C’yi koparmayı gerektirmez.",
          ],
          commonError:
            "Kesik moleküller arası çizgiyle katı kovalent O–H çizgisini aynı bağ sanma.",
          check:
            "Dimetil eterde O olsa da O–H vericisi yok; su varsa O alıcılık yapabilir.",
        },
      },
      {
        prompt:
          "Aynı karbon sayılı uygun alkol/eter örneklerinde alkolün daha yüksek kaynama eğilimine katkı yapan temel fark hangisidir?",
        options: [
          "Eterde hiç elektron bulunmaması",
          "Saf alkol molekülleri arasında O–H kaynaklı hidrojen bağı bulunabilmesi",
          "Alkolün C sayısının otomatik iki kat olması",
          "Alkolün mutlaka iyonik kristal olması",
          "Alkolün her zaman metal olması",
        ],
        answer: 1,
        hint: "Karşılaştırmada benzer büyüklük korunuyor; ek moleküller arası etkileşimi ara.",
        explanation:
          "Benzer büyüklükte iki organik molekül karşılaştırılıyor. Alkol O–H ile kendi molekülleri arasında H bağı kurabilir. Bu çekim kaynama için ek enerji gereksinimine katkı verir. Etanol/dimetil eter aynı C₂H₆O’da olup O–H vericiliği farklıdır.",
        guidance: {
          knowledge: ["O–H vericisi alkolde vardır; basit eterde O–H yoktur."],
          strategy:
            "Kovalent yapıları ve saf örnekteki verici/alıcı olanaklarını kıyasla.",
          steps: [
            "Benzer büyüklükte iki organik molekül karşılaştırılıyor.",
            "Alkol O–H ile kendi molekülleri arasında H bağı kurabilir.",
            "Bu çekim kaynama için ek enerji gereksinimine katkı verir.",
          ],
          optionReasons: [
            "Eter atomları elektron içerir; bu açıklama yanlış.",
            "Doğru. Bu çekim kaynama için ek enerji gereksinimine katkı verir.",
            "Karbon sayısı karşılaştırmada aynı verilmiştir.",
            "Basit alkol molekülerdir; iyonik kristal koşulu yok.",
            "Alkol organik moleküldür; metal değildir.",
          ],
          commonError:
            "Her alkolü her eterden koşulsuz yüksek kaynayan saymak yerine verilen benzer örnek sınırını koru.",
          check:
            "Etanol/dimetil eter aynı C₂H₆O’da olup O–H vericiliği farklıdır.",
        },
      },
      {
        prompt:
          "Etanolde –OH bulunması neden sulu çözeltisinin NaOH gibi kuvvetli baz olduğunu göstermez?",
        options: [
          "Etanol her koşulda suda çözünmez",
          "Bütün alkoller güçlü asittir",
          "Etanolde hiç O yoktur",
          "–OH kovalent molekül parçasıdır; bol OH⁻ veren iyonik hidroksit değildir",
          "OH yazımı her zaman NaOH demektir",
        ],
        answer: 3,
        hint: "Bağlı grup ile serbest iyonun yükünü ve bağlarını ayır.",
        explanation:
          "Etanolün OH’si karbonla kovalent bağlı molekül parçasıdır. Suya karışması NaOH gibi bol OH⁻ oluşumu anlamına gelmez. Bu yüzden yalnız OH yazımından kuvvetli baz sonucu çıkmaz. Türlerin formüllerini ve yüklerini yaz:CH₃CH₂OH nötr; OH⁻ ayrı iyon.",
        guidance: {
          knowledge: [
            "Etanol temel lise bağlamında moleküler çözünür; NaOH iyonik ayrışır.",
          ],
          strategy: "Yalnız harf benzerliğine değil türün kimliğine bak.",
          steps: [
            "Etanolün OH’si karbonla kovalent bağlı molekül parçasıdır.",
            "Suya karışması NaOH gibi bol OH⁻ oluşumu anlamına gelmez.",
            "Bu yüzden yalnız OH yazımından kuvvetli baz sonucu çıkmaz.",
          ],
          optionReasons: [
            "Etanol suyla iyi karışabilir; nedeni çözünmeme değildir.",
            "Basit alkollerin çok zayıf asitlik bağlamını kuvvetli asitliğe genişletir.",
            "O–H açıkça O içerir.",
            "Doğru. Bu yüzden yalnız OH yazımından kuvvetli baz sonucu çıkmaz.",
            "Etanol formülünde Na yoktur; OH⁻ yükü de verilmemiştir.",
          ],
          commonError:
            "Kovalent–OH grubunu iyonik OH⁻ ile aynı tür diye okumak.",
          check:
            "Türlerin formüllerini ve yüklerini yaz:CH₃CH₂OH nötr; OH⁻ ayrı iyon.",
        },
      },
      {
        prompt:
          "Benzer açık zincirli monoalkollerde OH sayısı sabitken karbon zinciri belirgin uzatılıyor. Sudaki çözünürlük için temel eğilim hangisidir?",
        options: [
          "Mutlaka sonsuz artması",
          "OH’nin otomatik COOH’ye dönüşmesi",
          "C sayısından bağımsız aynı kalması",
          "Her birinin tamamen iyonlaşması",
          "Hidrofob bölüm büyüdükçe azalması",
        ],
        answer: 4,
        hint: "OH ile karbon bölümünün suyla etkileşim paylarını karşılaştır.",
        explanation:
          "Her molekülde aynı tek OH veriliyor. Zincir uzadıkça hidrokarbon bölümün suya uyumsuz payı büyür. Bu koşulda sudaki çözünürlük azalma eğilimindedir. OH sayısı da değiştirilseydi ikinci etkiyi ayrıca karşılaştırmak gerekirdi; burada sabit.",
        guidance: {
          knowledge: [
            "OH suyla H bağı kurabilir; karbon iskeletinin hidrofob payı uzunlukla büyür.",
          ],
          strategy: "Aynı OH sayısına karşı büyüyen apolar bölümü değerlendir.",
          steps: [
            "Her molekülde aynı tek OH veriliyor.",
            "Zincir uzadıkça hidrokarbon bölümün suya uyumsuz payı büyür.",
            "Bu koşulda sudaki çözünürlük azalma eğilimindedir.",
          ],
          optionReasons: [
            "Hidrofob bölüm etkisinin yönünü ters alır.",
            "Zincir uzaması kendi başına yeni C=O oluşturmaz.",
            "Molekülün büyüklük/şekil etkisini tamamen yok sayar.",
            "Alkollerin moleküler çözünmesini iyonlaşma sanır.",
            "Doğru. Bu koşulda sudaki çözünürlük azalma eğilimindedir.",
          ],
          commonError:
            "Bütün alkol türlerine küçük etanolün sınırsız su karışımını genellemek.",
          check:
            "OH sayısı da değiştirilseydi ikinci etkiyi ayrıca karşılaştırmak gerekirdi; burada sabit.",
        },
      },
      {
        prompt:
          "Glikozun ideal alkol fermantasyonu için atomları koruyan denklem hangisidir?",
        options: [
          "C₆H₁₂O₆ → 3 C₂H₅OH",
          "C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂",
          "C₆H₁₂O₆ → C₂H₅OH + H₂",
          "C₆H₁₂O₆ → C₂H₅OH + 2 CO₂",
          "C₆H₁₂O₆ → 2 C₂H₅OH + CO₂",
        ],
        answer: 1,
        hint: "Karbonun etanol ve CO₂ arasında toplamını kontrol et.",
        explanation:
          "İki etanol 4C/12H/2O sağlar. İki CO₂ ek 2C/4O sağlar. Toplam 6C/12H/6O başlangıç glikozuyla eşleşir. 2×(C₂H₆O) + 2×CO₂=(C6, H12, O6) eşitliğini ayrı elementlerle kontrol et.",
        guidance: {
          knowledge: [
            "Kimyasal denkliğin iki yanında C, H, O atom sayısı aynıdır.",
          ],
          strategy: "Önce C=6’yı, sonra H12/O6’yı doğrula.",
          steps: [
            "İki etanol 4C/12H/2O sağlar.",
            "İki CO₂ ek 2C/4O sağlar.",
            "Toplam 6C/12H/6O başlangıç glikozuyla eşleşir.",
          ],
          optionReasons: [
            "H18/O3 çıkar; H ve O korunmaz.",
            "Doğru. Toplam 6C/12H/6O başlangıç glikozuyla eşleşir.",
            "C/O sayıları ciddi eksilir; CO₂ ürünleri yok sayılmış.",
            "Ürün C toplamı 4, H6 olur; etanol eksik.",
            "Ürün C toplamı 5 olur; bir CO₂ eksik.",
          ],
          commonError:
            "Kaynak denklemindeki eksik katsayıyı atom saymadan kopyalama.",
          check:
            "2×(C₂H₆O) + 2×CO₂=(C6, H12, O6) eşitliğini ayrı elementlerle kontrol et.",
        },
      },
      {
        prompt:
          "2-Propanolün uygun, C–C bağlarını koruyan temel yükseltgenmesinde hangi ana organik ürün beklenir?",
        options: ["Propan", "Etanol", "Propanon", "Propanal", "Metanol"],
        answer: 2,
        hint: "Önce OH karbonunun ikincil olduğunu belirle.",
        explanation:
          "OH karbonu iki C komşusuna bağlıdır; ikincildir. Uygun yükseltgenmede bu merkez karbonil olur. Ürün CH₃COCH₃, propanondur. Başlangıç C₃H₈O, ürün C₃H₆O; C/O korunurken iki H ayrılır.",
        guidance: {
          knowledge: [
            "İkincil alkol temel yükseltgenmeyle ketona dönüşebilir.",
          ],
          strategy: "CH₃–CH(OH)–CH₃ çevresini C=O’ya dönüştür.",
          steps: [
            "OH karbonu iki C komşusuna bağlıdır; ikincildir.",
            "Uygun yükseltgenmede bu merkez karbonil olur.",
            "Ürün CH₃COCH₃, propanondur.",
          ],
          optionReasons: [
            "O çıkarıp doymuş alkana indirgemeye benzer; bu yükseltgenme değil.",
            "Bir C kaybeder; C–C korunmasıyla bağdaşmaz.",
            "Doğru. Ürün CH₃COCH₃, propanondur.",
            "Propanal uç karbonil içerir; verilen iskelet korunmuş ikincil merkez böyle taşınmaz.",
            "İki C kaybeder; verilen yol değil.",
          ],
          commonError:
            "Birincil alkol → aldehit şemasını ikincil alkole uygulamak.",
          check: "Başlangıç C₃H₈O, ürün C₃H₆O; C/O korunurken iki H ayrılır.",
        },
      },
      {
        prompt:
          "CH₃CHO etanalin uygun H₂ indirgenmesinde, karbon iskeleti korunarak oluşan ürün hangisidir?",
        options: ["CH₃CH₂OH", "CH₄", "CH₃OCH₃", "CH₂=CH₂", "CH₃COOH"],
        answer: 0,
        hint: "C=O bağına H₂ eklenmesini atom ve sınıf olarak izle.",
        explanation:
          "Etanal C₂H₄O karbonil içerir. H₂ eklenince C=O yerini C–OH alır ve H sayısı iki artar. Ürün C₂H₆O bağlantısında CH₃CH₂OH, etanoldür. Başlangıç C₂H₄O + H₂ → C₂H₆O; O–H ve C–H bağları üründe gösterilir.",
        guidance: {
          knowledge: [
            "Aldehit indirgenmesi uygun koşulda birincil alkol verir.",
          ],
          strategy: "Bir H’yi karbonile C’ye, bir H’yi O’ya ekle.",
          steps: [
            "Etanal C₂H₄O karbonil içerir.",
            "H₂ eklenince C=O yerini C–OH alır ve H sayısı iki artar.",
            "Ürün C₂H₆O bağlantısında CH₃CH₂OH, etanoldür.",
          ],
          optionReasons: [
            "Doğru. Ürün C₂H₆O bağlantısında CH₃CH₂OH, etanoldür.",
            "Karbon ve O’yu kaybeder; iskelet korunmaz.",
            "Aynı formüllü eter olsa da karbonilin basit indirgenmesi C–O–C iskeleti kurmaz.",
            "O’yu çıkaran farklı bir yol gerekir; verilen alkol dönüşümü değil.",
            "Bu daha oksijenli asit ürünüdür; indirgenme yönü değil.",
          ],
          commonError:
            "Aynı molekül formülü taşıyan eteri reaksiyon ürünü bağlantısı sanmak.",
          check:
            "Başlangıç C₂H₄O + H₂ → C₂H₆O; O–H ve C–H bağları üründe gösterilir.",
        },
      },
      {
        prompt:
          "CH₂=CH–CH(OH)–CH₃ yapısı OH’ye küçük numara verecek yönde okunuyor. Temel adlandırma hangisidir?",
        options: [
          "Büt-3-en-2-ol (3-büten-2-ol)",
          "Etanol",
          "Büt-1-en-3-ol",
          "2-Metilpropan-1-ol",
          "Bütan-1-ol",
        ],
        answer: 0,
        hint: "Bu alkol adlandırmasında OH konumu çift bağ konumundan önce küçüklenir.",
        explanation:
          "Dört C’li OH içeren zincir seçilir. OH’ye yakın sağ uçtan OH2 olur; çift bağ C3–C4’tedir. Temel ad büt-3-en-2-ol olur. OH2’nin komşuları C1 ve C3; çift bağ OH karbonunda değil C3–C4’tedir; OH sp³ C’dedir.",
        guidance: {
          knowledge: [
            "Ana zincir OH’yi içerir; OH’ye yakın uçtan numaralama seçilir.",
          ],
          strategy: "Sağ uçtan numaralayarak OH2 ve çift bağ 3’ü bul.",
          steps: [
            "Dört C’li OH içeren zincir seçilir.",
            "OH’ye yakın sağ uçtan OH2 olur; çift bağ C3–C4’tedir.",
            "Temel ad büt-3-en-2-ol olur.",
          ],
          optionReasons: [
            "Doğru. Temel ad büt-3-en-2-ol olur.",
            "Başlangıç dört C ve çift bağ taşır; iki C’li etanol değildir.",
            "Çift bağı önce küçükleyip OH’yi 3 bırakır; verilen önceliğe uymaz.",
            "Başlangıçta dallanmış iskelet yok; metil dalı uydurur.",
            "Çift bağı ve OH konumunu yanlış değiştirir.",
          ],
          commonError:
            "Çoklu bağ numarasını her fonksiyonel grubun numarasından üstün sanma.",
          check:
            "OH2’nin komşuları C1 ve C3; çift bağ OH karbonunda değil C3–C4’tedir; OH sp³ C’dedir.",
        },
      },
      {
        prompt:
          "CH₃NH₂ metilamin ile CH₃NO₂ nitrometan arasındaki doğru ayrım hangisidir?",
        options: [
          "İkisi de yalnız C/H hidrokarbondur",
          "Nitro grubunda iki H vardır",
          "Amino grubunda iki O vardır",
          "Amino NH₂ ile nitro NO₂ farklı atom ve bağ çevreleridir",
          "İkisi de aynı CH₅N formülündedir",
        ],
        answer: 3,
        hint: "Altindis 2’nin H’ye mi O’ya mı ait olduğunu oku.",
        explanation:
          "Metilamin CH₃NH₂ toplam CH₅N verir. Nitrometan CH₃NO₂ toplam CH₃NO₂ verir; iki O vardır. Bu yüzden gruplar farklı atom ve bağ çevreleridir. Birinde O sayısı 0/diğerinde 2; H sayısı 5/3 olarak farklılaşır.",
        guidance: {
          knowledge: ["Amino NH₂ ve nitro NO₂ aynı fonksiyonel grup değildir."],
          strategy: "Her türün atom sayısını ayrı yaz.",
          steps: [
            "Metilamin CH₃NH₂ toplam CH₅N verir.",
            "Nitrometan CH₃NO₂ toplam CH₃NO₂ verir; iki O vardır.",
            "Bu yüzden gruplar farklı atom ve bağ çevreleridir.",
          ],
          optionReasons: [
            "İkisinde N, nitrometanda ayrıca O vardır.",
            "Nitro NO₂’de 2 altindisi O’ya aittir.",
            "Amino NH₂’de O bulunmaz; iki H vardır.",
            "Doğru. Bu yüzden gruplar farklı atom ve bağ çevreleridir.",
            "Nitrometandaki O₂ ve H3 sayımını yok sayar.",
          ],
          commonError:
            "Amino ve nitro adlarını benzer yazıldıkları için eşanlamlı kullanma.",
          check:
            "Birinde O sayısı 0/diğerinde 2; H sayısı 5/3 olarak farklılaşır.",
        },
      },
    ],
    source:
      "MEBİ AYT Kimya: Hidrokarbonlar, Aromatik Hidrokarbonlar ve Alkoller; OGM ilgili Organik Bileşikler sunuları ve Dersler Cepte hedef öğretim sayfalarıyla karşılaştırılarak yazılmış özgün anlatım, şema, örnek ve sorular. Resmî sınav sorusu değildir.",
  },
];

export const forge023ChemistryTopics: Record<string, string> =
  Object.fromEntries(packs023.map((p) => [p.id, p.topic]));
export const forge023ChemistryGuides: LessonGuide[] = packs023.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
  source: p.source,
}));
export const forge023ChemistryLessons: Lesson[] = packs023.map((p) => ({
  id: p.id,
  subjectId: "ayt-kimya",
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  body: p.sections.map((section) => ({
    title: txt(section.title),
    text: txt(section.paragraphs.join("\n\n")),
  })),
  source: txt(p.source),
  tags: [p.topic, "Özgün öğretim soruları"],
  questions: p.items.map((q, i) => ({
    id: `f023c-${p.id}-${i + 1}`,
    prompt: txt(q.prompt),
    options: q.options.map(txt),
    answer: q.answer,
    hint: txt(q.hint),
    explanation: txt(q.explanation),
    guidance: q.guidance,
    skill: p.id,
  })),
}));
