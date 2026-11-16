import { txt, type Lesson } from "../domain/model";
import type { LessonGuide } from "./guides/types";

export type Point022B = { x: number; y: number; z: number };
export type CarbonKind022B = "diamond" | "graphene" | "graphite" | "fullerene";
const domain022B = (v: number, min: number, max: number) => Number.isFinite(v) && v >= min && v <= max;
const sub022B = (a: Point022B, b: Point022B) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
const norm022B = (a: Point022B) => Math.hypot(a.x, a.y, a.z);
const unit022B = (a: Point022B) => { const n = norm022B(a); return { x: a.x / n, y: a.y / n, z: a.z / n }; };
export function rotate022B(p: Point022B, yaw: number, pitch: number) {
  if (![p.x, p.y, p.z].every(Number.isFinite) || !domain022B(yaw, -180, 180) || !domain022B(pitch, -70, 70)) throw new RangeError("CHEMB022_ROTATE_SCOPE");
  const trig = (angle: number) => angle === 0 ? [1, 0] : angle === 90 ? [0, 1] : angle === -90 ? [0, -1] : Math.abs(angle) === 180 ? [-1, 0] : [Math.cos(angle * Math.PI / 180), Math.sin(angle * Math.PI / 180)];
  const mix = (a: number, b: number, c: number, t: number) => {
    if (t === 0) return c * a;
    if (c === 0) return t * b;
    const scale = Math.max(Math.abs(a), Math.abs(b));
    if (scale === 0) return 0;
    const u = a / scale, v = b / scale;
    if (a !== 0 && u === 0 || b !== 0 && v === 0) throw new RangeError("CHEMB022_ROTATE_PRECISION");
    return (u * c + v * t) * scale;
  };
  const [ca, sa] = trig(yaw), [cb, sb] = trig(pitch);
  const x = mix(p.x, p.z, ca, sa), z = mix(p.z, p.x, ca, -sa);
  const result = { x, y: mix(p.y, z, cb, -sb), z: mix(z, p.y, cb, sb) };
  if (![result.x, result.y, result.z].every(Number.isFinite)) throw new RangeError("CHEMB022_ROTATE_PRECISION");
  return result;
}
function sheet022B() {
  const points: Point022B[] = [], edges: [number, number][] = [], lookup = new Map<string, number>(), seen = new Set<string>();
  const add = (x: number, y: number) => { const key = `${x.toFixed(6)}:${y.toFixed(6)}`; if (!lookup.has(key)) { lookup.set(key, points.length); points.push({ x, y, z: 0 }); } return lookup.get(key)!; };
  for (let q = -1; q <= 1; q++) for (let r = -1; r <= 1; r++) {
    const ring = Array.from({ length: 6 }, (_, k) => add(1.5 * q + Math.cos(k * Math.PI / 3), Math.sqrt(3) * (r + q / 2) + Math.sin(k * Math.PI / 3)));
    for (let k = 0; k < 6; k++) { const pair = [ring[k], ring[(k + 1) % 6]].sort((a, b) => a - b) as [number, number], key = pair.join(":"); if (!seen.has(key)) { seen.add(key); edges.push(pair); } }
  }
  return { points, edges };
}
/** Ideal regular truncated-icosahedron topology: 60 vertices,90 edges; not a measured equal-bond-length claim about real C60. */
function cage022B() {
  const phi = (1 + Math.sqrt(5)) / 2, vertices: Point022B[] = [];
  for (const a of [-1, 1]) for (const b of [-1, 1]) vertices.push({ x: 0, y: a, z: b * phi }, { x: a, y: b * phi, z: 0 }, { x: b * phi, y: 0, z: a });
  const original: [number, number][] = [];
  for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) if (Math.abs(norm022B(sub022B(vertices[i], vertices[j])) - 2) < 1e-10) original.push([i, j]);
  const has = (i: number, j: number) => original.some(([a, b]) => a === Math.min(i, j) && b === Math.max(i, j));
  const points: Point022B[] = [], edges: [number, number][] = [], directed = new Map<string, number>();
  for (const [a, b] of original) for (const [i, j] of [[a, b], [b, a]]) { directed.set(`${i}:${j}`, points.length); points.push({ x: (2 * vertices[i].x + vertices[j].x) / 2, y: (2 * vertices[i].y + vertices[j].y) / 2, z: (2 * vertices[i].z + vertices[j].z) / 2 }); }
  for (const [a, b] of original) edges.push([directed.get(`${a}:${b}`)!, directed.get(`${b}:${a}`)!]);
  for (let i = 0; i < 12; i++) { const neighbors = original.flatMap(([a, b]) => a === i ? [b] : b === i ? [a] : []); for (let a = 0; a < neighbors.length; a++) for (let b = a + 1; b < neighbors.length; b++) if (has(neighbors[a], neighbors[b])) edges.push([directed.get(`${i}:${neighbors[a]}`)!, directed.get(`${i}:${neighbors[b]}`)!]); }
  return { points, edges };
}
/** Finite structural fragments. Edge atoms of a sheet have missing continuation, not lower bulk coordination. */
export function carbonNetwork022B(kind: CarbonKind022B, yaw: number, pitch: number, selected: number) {
  if (!["diamond", "graphene", "graphite", "fullerene"].includes(kind)) throw new RangeError("CHEMB022_CARBON_KIND");
  let points: Point022B[], edges: [number, number][], weak: [number, number][] = [];
  if (kind === "diamond") { points = [{ x: 0, y: 0, z: 0 }, ...[{ x: 1, y: 1, z: 1 }, { x: 1, y: -1, z: -1 }, { x: -1, y: 1, z: -1 }, { x: -1, y: -1, z: 1 }].map(unit022B)]; edges = [[0, 1], [0, 2], [0, 3], [0, 4]]; }
  else if (kind === "fullerene") ({ points, edges } = cage022B());
  else { ({ points, edges } = sheet022B()); if (kind === "graphite") { const n = points.length; points = [...points.map(p => ({ ...p, z: -1.4 })), ...points.map(p => ({ ...p, x: p.x + 1, z: 1.4 }))]; edges = [...edges, ...edges.map(([a, b]) => [a + n, b + n] as [number, number])]; weak = Array.from({ length: n }, (_, i) => [i, i + n]); } }
  if (!Number.isInteger(selected) || selected < 0 || selected >= points.length) throw new RangeError("CHEMB022_CARBON_ATOM");
  const degree = points.map((_, i) => edges.filter(e => e.includes(i)).length), neighbors = edges.flatMap(([a, b]) => a === selected ? [b] : b === selected ? [a] : []);
  return { kind, points, edges, weak, projected: points.map(p => rotate022B(p, yaw, pitch)), selected, neighbors, degree, bulkCoordination: kind === "diamond" ? 4 : 3, interior: degree.map((d, i) => d === (kind === "diamond" ? 4 : 3) ? i : -1).filter(i => i >= 0), faces: kind === "fullerene" ? { pentagons: 12, hexagons: 20 } : null };
}
const gcd022B = (a: number, b: number): number => b ? gcd022B(b, a % b) : a;
export type Composition022B = { C: number; H: number; O: number };
const weights022B = { C: 12, H: 1, O: 16 } as const;
export function formula022B(masses: Composition022B, molecularMass: number) {
  const elements = ["C", "H", "O"] as const;
  if (!masses || !elements.every(e => masses[e] === 0 || domain022B(masses[e], 1e-300, 1e4)) || !domain022B(molecularMass, 0, 1000) || molecularMass > 0 && molecularMass < 1) throw new RangeError("CHEMB022_FORMULA_SCOPE");
  const sample = elements.reduce((s, e) => s + masses[e], 0); if (sample === 0) throw new RangeError("CHEMB022_EMPTY_SAMPLE");
  const moles = elements.map(e => masses[e] / weights022B[e]), minimum = Math.min(...moles.filter(n => n > 0)), ratios = moles.map(n => n / minimum);
  let counts: number[] | null = null;
  for (let factor = 1; factor <= 12; factor++) { const candidate = ratios.map(n => Math.round(n * factor)); if (candidate.every((n, i) => Math.abs(n - ratios[i] * factor) <= 1e-7 * Math.max(1, n)) && Math.max(...candidate) <= 120) { const g = candidate.reduce((a, b) => gcd022B(a, b), 0); counts = candidate.map(n => n / g); break; } }
  const empiricalMass = counts ? counts.reduce((s, n, i) => s + n * weights022B[elements[i]], 0) : null, rawMultiplier = empiricalMass ? molecularMass / empiricalMass : null;
  const multiplier = rawMultiplier !== null && molecularMass > 0 && Math.round(rawMultiplier) >= 1 && Math.abs(rawMultiplier - Math.round(rawMultiplier)) <= 1e-7 * Math.max(1, rawMultiplier) ? Math.round(rawMultiplier) : null;
  const molecular = counts && multiplier ? counts.map(n => n * multiplier) : null;
  const unsaturation = molecular ? (2 * molecular[0] + 2 - molecular[1]) / 2 : null;
  const ordinaryValenceCompatible = unsaturation === null ? null : unsaturation >= 0 && Number.isInteger(unsaturation);
  const label = (ns: number[] | null) => ns ? ns.map((n, i) => n ? `${elements[i]}${n === 1 ? "" : n}` : "").join("") : null;
  return { sample, masses, moles, ratios, percentages: elements.map(e => masses[e] / sample * 100), empirical: counts, empiricalLabel: label(counts), empiricalMass, rawMultiplier, multiplier, molecular, molecularLabel: label(molecular), molecularMass, unsaturation, ordinaryValenceCompatible, status: !counts ? "ratio" : molecularMass === 0 ? "empirical" : !multiplier ? "mass-mismatch" : ordinaryValenceCompatible ? "molecular" : "valence-mismatch" };
}
/** Complete combustion of a pure C/H/O sample, all carbon→CO2/all hydrogen→H2O; oxygen comes from mass difference, not total oxygen in products. */
export function combustionFormula022B(sample: number, carbonDioxide: number, water: number, molecularMass: number) {
  if (!domain022B(sample, .001, 1e4) || !domain022B(carbonDioxide, 0, 1e5) || !domain022B(water, 0, 1e5) || !domain022B(molecularMass, 0, 1000) || molecularMass > 0 && molecularMass < 1) throw new RangeError("CHEMB022_COMBUSTION_SCOPE");
  const C = carbonDioxide * (12 / 44), H = water * (2 / 18), oxygen = sample - C - H, tolerance = 64 * Number.EPSILON * sample;
  if (carbonDioxide > 0 && C === 0 || water > 0 && H === 0) throw new RangeError("CHEMB022_COMBUSTION_PRECISION");
  if (oxygen < -tolerance) return { consistent: false as const, C, H, oxygen, formula: null };
  const O = Math.abs(oxygen) <= tolerance ? 0 : oxygen;
  return { consistent: true as const, C, H, oxygen: O, formula: formula022B({ C, H, O }, molecularMass) };
}
export type Molecule022B = "methane" | "ethene" | "ethyne" | "allene" | "hcn" | "formaldehyde" | "methanol";
type Atom022B = Point022B & { element: string; lonePairs: number };
type Bond022B = { a: number; b: number; order: number };
const tetra022B: Point022B[] = [{ x: 1, y: 1, z: 1 }, { x: 1, y: -1, z: -1 }, { x: -1, y: 1, z: -1 }, { x: -1, y: -1, z: 1 }].map(unit022B);
/** Local sigma-neighbour + lone-pair domains; ordinary second-period valence-bond teaching model. Coordinates are a structural schematic, not optimized bond lengths. */
export function hybrid022B(kind: Molecule022B, focus: number, yaw: number, pitch: number) {
  const atoms: Atom022B[] = [], bonds: Bond022B[] = [];
  const add = (element: string, x: number, y: number, z = 0, lonePairs = 0) => { atoms.push({ element, x, y, z, lonePairs }); return atoms.length - 1; };
  const link = (a: number, b: number, order = 1) => bonds.push({ a, b, order });
  const hydrogen = (parent: number, x: number, y: number, z = 0) => { link(parent, add("H", x, y, z)); };
  if (kind === "methane") { add("C", 0, 0); for (const p of tetra022B) hydrogen(0, p.x, p.y, p.z); }
  else if (kind === "ethene") { add("C", -.67, 0); add("C", .67, 0); link(0, 1, 2); for (const sign of [-1, 1]) { hydrogen(0, -1.17, sign * Math.sqrt(3) / 2); hydrogen(1, 1.17, sign * Math.sqrt(3) / 2); } }
  else if (kind === "ethyne") { add("C", -.6, 0); add("C", .6, 0); link(0, 1, 3); hydrogen(0, -1.6, 0); hydrogen(1, 1.6, 0); }
  else if (kind === "allene") { add("C", -1.3, 0); add("C", 0, 0); add("C", 1.3, 0); link(0, 1, 2); link(1, 2, 2); for (const sign of [-1, 1]) { hydrogen(0, -1.8, sign * Math.sqrt(3) / 2); hydrogen(2, 1.8, 0, sign * Math.sqrt(3) / 2); } }
  else if (kind === "hcn") { add("C", 0, 0); add("N", 1.2, 0, 0, 1); link(0, 1, 3); hydrogen(0, -1, 0); }
  else if (kind === "formaldehyde") { add("C", 0, 0); add("O", 1.2, 0, 0, 2); link(0, 1, 2); hydrogen(0, -.5, Math.sqrt(3) / 2); hydrogen(0, -.5, -Math.sqrt(3) / 2); }
  else if (kind === "methanol") { add("C", 0, 0); add("O", 1.3, 0, 0, 2); link(0, 1); for (let i = 0; i < 3; i++) hydrogen(0, -1 / 3, Math.sqrt(8 / 9) * Math.cos(i * 2 * Math.PI / 3), Math.sqrt(8 / 9) * Math.sin(i * 2 * Math.PI / 3)); const a = 108.9 * Math.PI / 180; hydrogen(1, 1.3 - Math.cos(a), Math.sin(a)); }
  else throw new RangeError("CHEMB022_HYBRID_KIND");
  const heavy = atoms.flatMap((a, i) => a.element !== "H" ? [i] : []);
  if (!heavy.includes(focus)) throw new RangeError("CHEMB022_HYBRID_FOCUS");
  const linked = bonds.filter(b => b.a === focus || b.b === focus), sigma = linked.length, pi = linked.reduce((s, b) => s + b.order - 1, 0), lonePairs = atoms[focus].lonePairs, domains = sigma + lonePairs;
  const hybrid = domains === 2 ? "sp" : domains === 3 ? "sp²" : domains === 4 ? "sp³" : null;
  return { kind, atoms, bonds, heavy, focus, projected: atoms.map(p => rotate022B(p, yaw, pitch)), sigma, pi, lonePairs, domains, hybrid, hybridCount: domains, pureP: 4 - domains, sFraction: 1 / domains, sigmaTotal: bonds.length, piTotal: bonds.reduce((s, b) => s + b.order - 1, 0) };
}
export type GeometryKind022B = "ch4" | "nh3" | "h2o" | "bf3" | "co2" | "ch3cl";
export function geometry022B(kind: GeometryKind022B, yaw: number, pitch: number) {
  let vectors: Point022B[], lone: Point022B[] = [], labels: string[], weights: number[], central: string, notation: string, shape: string;
  if (kind === "ch4" || kind === "ch3cl") { vectors = tetra022B; labels = kind === "ch4" ? ["H", "H", "H", "H"] : ["H", "H", "H", "Cl"]; weights = kind === "ch4" ? [-1, -1, -1, -1] : [-1, -1, -1, 2]; central = "C"; notation = "AX₄"; shape = "Düzgün dört yüzlü"; }
  else if (kind === "nh3") { const z = Math.sqrt((Math.cos(107 * Math.PI / 180) + .5) / 1.5), radial = Math.sqrt(1 - z * z); vectors = Array.from({ length: 3 }, (_, i) => ({ x: radial * Math.cos(i * 2 * Math.PI / 3), y: radial * Math.sin(i * 2 * Math.PI / 3), z: -z })); labels = ["H", "H", "H"]; weights = [-1, -1, -1]; lone = [{ x: 0, y: 0, z: 1 }]; central = "N"; notation = "AX₃E"; shape = "Üçgen piramit"; }
  else if (kind === "h2o") { const a = 104.5 * Math.PI / 360; vectors = [{ x: Math.sin(a), y: 0, z: Math.cos(a) }, { x: -Math.sin(a), y: 0, z: Math.cos(a) }]; labels = ["H", "H"]; weights = [-1, -1]; lone = [{ x: 0, y: .8, z: -.6 }, { x: 0, y: -.8, z: -.6 }]; central = "O"; notation = "AX₂E₂"; shape = "Açısal"; }
  else if (kind === "bf3") { vectors = Array.from({ length: 3 }, (_, i) => ({ x: Math.cos(i * 2 * Math.PI / 3), y: Math.sin(i * 2 * Math.PI / 3), z: 0 })); labels = ["F", "F", "F"]; weights = [1, 1, 1]; central = "B"; notation = "AX₃"; shape = "Üçgen düzlem"; }
  else if (kind === "co2") { vectors = [{ x: -1, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }]; labels = ["O", "O"]; weights = [1, 1]; central = "C"; notation = "AX₂"; shape = "Doğrusal"; }
  else throw new RangeError("CHEMB022_GEOMETRY_KIND");
  const bondVectors = vectors.map((v, i) => ({ x: v.x * weights[i], y: v.y * weights[i], z: v.z * weights[i] })), resultant = bondVectors.reduce((s, v) => ({ x: s.x + v.x, y: s.y + v.y, z: s.z + v.z }), { x: 0, y: 0, z: 0 });
  const angles = vectors.flatMap((a, i) => vectors.slice(i + 1).map(b => Math.acos(Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z))) * 180 / Math.PI));
  return { kind, central, notation, shape, vectors, lone, labels, weights, projected: vectors.map(p => rotate022B(p, yaw, pitch)), projectedLone: lone.map(p => rotate022B(p, yaw, pitch)), bondVectors, resultant, projectedResultant: rotate022B(resultant, yaw, pitch), polar: norm022B(resultant) > 1e-12, angles, domains: vectors.length + lone.length, lonePairs: lone.length };
}
export function alkane022B(count: number, edges: [number, number][], selected: number) {
  if (!Number.isInteger(count) || !domain022B(count, 1, 10) || !Array.isArray(edges) || edges.length !== count - 1 || !Number.isInteger(selected) || selected < 0 || selected >= count) throw new RangeError("CHEMB022_ALKANE_SCOPE");
  const adjacency: number[][] = Array.from({ length: count }, () => []), seen = new Set<string>();
  for (const edge of edges) { if (!Array.isArray(edge) || edge.length !== 2) throw new RangeError("CHEMB022_ALKANE_EDGE"); const [a, b] = edge; if (![a, b].every(n => Number.isInteger(n) && n >= 0 && n < count) || a === b) throw new RangeError("CHEMB022_ALKANE_EDGE"); const key = [a, b].sort((x, y) => x - y).join(":"); if (seen.has(key)) throw new RangeError("CHEMB022_ALKANE_DUPLICATE"); seen.add(key); adjacency[a].push(b); adjacency[b].push(a); }
  const reachable = new Set<number>(); const visit = (i: number) => { if (reachable.has(i)) return; reachable.add(i); adjacency[i].forEach(visit); }; visit(0);
  if (reachable.size !== count || adjacency.some(a => a.length > 4)) throw new RangeError("CHEMB022_ALKANE_NOT_TREE");
  const hydrogens = adjacency.map(a => 4 - a.length), hydrogenCount = hydrogens.reduce((s, h) => s + h, 0), degree = adjacency.map(a => a.length);
  const rooted = (i: number, parent: number): string => `(${adjacency[i].filter(j => j !== parent).map(j => rooted(j, i)).sort().join("")})`;
  const signatures = adjacency.map((_, i) => rooted(i, -1)), reactiveSignatures = [...new Set(signatures.filter((_, i) => hydrogens[i] > 0))], equivalent = signatures.flatMap((s, i) => s === signatures[selected] ? [i] : []);
  let longest: number[] = [];
  const walk = (i: number, parent: number, path: number[]) => { const next = [...path, i]; if (next.length > longest.length) longest = next; for (const j of adjacency[i]) if (j !== parent) walk(j, i, next); };
  for (let i = 0; i < count; i++) walk(i, -1, []);
  return { count, edges, adjacency, selected, degree, hydrogens, hydrogenCount, formula: `C${count === 1 ? "" : count}H${hydrogenCount}`, molarMass: count * 12 + hydrogenCount, sigmaCC: edges.length, sigmaCH: hydrogenCount, sigmaTotal: edges.length + hydrogenCount, primary: degree.filter(d => d === 1).length, secondary: degree.filter(d => d === 2).length, tertiary: degree.filter(d => d === 3).length, quaternary: degree.filter(d => d === 4).length, longest, equivalent, monochloroProducts: reactiveSignatures.length, carbonDioxide: count, water: count + 1, oxygen: (3 * count + 1) / 2 };
}
const packs022B = [
  {
    "id": "karbon-kimyasina-giris",
    "topic": "detail-445",
    "title": "Karbon kimyasına giriş",
    "minutes": 70,
    "objectives": [
      "Karbonun bağ kurma ve zincir oluşturma gücünü açıkla",
      "Organik–anorganik sınıflamasını gerekçesiyle yap",
      "Allotropların atom bağlarını yapı–özellik ilişkisiyle karşılaştır"
    ],
    "sections": [
      {
        "title": "Karbonu tanımak neden başlangıç noktası?",
        "paragraphs": [
          "Besinler, ilaçlar, polimerler, yakıtlar ve canlıların birçok yapı taşı karbon bileşikleri içerir. Karbon kimyası bu yapıların hangi atomlardan oluştuğunu, atomların nasıl bağlandığını ve yapı değişince özelliklerin neden değiştiğini inceler. Bir molekülün adını bilmekle bağ yapısını açıklamak farklı becerilerdir.",
          "Önce atomun değerlik elektronlarını, sonra yaptığı bağları ve oluşturduğu iskeleti düşün. Bir sonraki adımda aynı atom sayısının farklı bağlantılarla farklı maddeler verebildiğini göreceksin. Bu yüzden element analizi, molekül formülü ve yapı formülü birbirinin yerine geçen bilgiler değildir."
        ]
      },
      {
        "title": "Altı elektrondan dördü bağlanmada öne çıkar",
        "paragraphs": [
          "Karbonun atom numarası 6’dır. Nötr temel hâl atomunun elektron dizilişi 1s² 2s² 2p² olur; ikinci katmanda dört değerlik elektronu bulunur. Periyodik tabloda ikinci periyot ve 14.grupta, eski gösterimle 4A grubundadır. İlk katmandaki iki elektron çoğu temel bağ modelinde iç katman olarak ele alınır.",
          "Karbonun yaygın nötr organik yapılardaki bağ değerliği dört olur. CH₄’te dört tekli, C₂H₄’te her karbon için iki C–H ve bir çift C=C, C₂H₂’de bir C–H ve bir üçlü C≡C bu toplamı sağlar. Çift ve üçlü bağların her biri birden fazla ortak elektron çifti taşır."
        ]
      },
      {
        "title": "Dört bağ, her zaman dört komşu demek değil",
        "paragraphs": [
          "Metandaki bir karbon dört ayrı hidrojene tekli bağla bağlıdır. Etendeki bir karbonun üç atom komşusu, etindeki bir karbonun ise iki atom komşusu vardır; bağ mertebelerinin toplamı yine dörttür. Komşu atom sayısıyla ortak elektron çifti sayısını ayrı say.",
          "Bu bağ değerliği kuralı olağan nötr karbon yapıları için kullanılır. CO gibi formal yüklerin önemli olduğu küçük türler veya iyonik karbürler ayrıca modellenir. Hibritleşme ünitesi, dört ayrı komşuyla iki komşulu üçlü bağın uzayda neden farklı yerleştiğini açıklayacaktır."
        ]
      },
      {
        "title": "Karbon kendi atomlarıyla iskelet kurar",
        "paragraphs": [
          "Karbon–karbon bağlarının kararlılığı ve karbonun birden fazla bağ yapabilmesi uzun zincirlerin, dallanmış zincirlerin ve halkaların kurulmasını sağlar. Bu kendi türünden atomlarla bağlanma yeteneğine zincirleşme denir. Düz zincir, karbonların geometrik olarak cetvel gibi tek doğru üzerinde durduğu anlamına gelmez.",
          "Örneğin dört karbon düz zincir veya dallanmış bağlantıyla düzenlenebilir; bunlar aynı atom sayısına rağmen farklı bağlantılar olabilir. Karbonun H, O, N, P, S, halojenler ve uygun bileşiklerde Fe veya Mg gibi metallerle bağlanabilmesi de çeşitliliği büyütür. Molekül sayısının çokluğunu yalnız doğadaki karbon miktarıyla açıklamak yeterli değildir."
        ]
      },
      {
        "title": "Organik kimyanın tarihsel kapısı",
        "paragraphs": [
          "Yaşam gücü görüşü, organik maddelerin yalnız canlılarda özel bir güçle oluşabileceğini savunuyordu. Berzelius’un kullandığı organik terimi bu tarihsel çerçeveyle ilişkilidir. 1828’de Friedrich Wöhler’in amonyum siyanattan üre elde etmesi, organik bir maddenin canlı dışında hazırlanabilmesini gösteren önemli dönüm noktasıdır.",
          "Dönüşüm NH₄OCN→NH₂CONH₂ biçiminde yazılabilir; her iki tarafta C1, H4, N2, O1 atomu vardır. Bu tarih, bütün organik maddelerin ilk kez o gün üretildiği veya bugünkü sınıflamanın biyolojik kökene bağlı kaldığı anlamına gelmez. Kolbe’nin 1845 asetik asit çalışması gibi sonraki sentezler de organik sentezin gelişmesine katkı verdi."
        ]
      },
      {
        "title": "Organik sınıflamasını karbon üzerinden kur",
        "paragraphs": [
          "Lise kapsamındaki organik bileşikler karbon içerir; çoğu ayrıca hidrojen taşır. Ancak C–H bağı organik sayılmanın zorunlu koşulu değildir: CCl₄, hidrojen içermeyen organik bileşik örneğidir. Üre, etanol, glikoz ve asetonda da karbon farklı gruplarla bağlanır.",
          "Karbon içeren her tür organik değildir. CO, CO₂, CS₂, karbonik asit H₂CO₃, karbonat tuzları, CaC₂ gibi karbürler ve HCN gibi basit siyanür türleri bu öğretimde anorganik sınıfta ele alınır. Sınıflama tarihsel ve kimyasal bir uzlaşıdır; tek bir “karbon var mı?” testi bütün örnekleri ayırmaz."
        ]
      },
      {
        "title": "Siyanür tuzu ile nitril aynı örnek değildir",
        "paragraphs": [
          "NaCN gibi siyanür tuzları ve HCN temel lise sınıflamasında anorganiktir. Buna karşılık CH₃–C≡N gibi bir karbon iskeletine bağlı nitril grubu organik bileşik oluşturur. Yapıda C ve N harflerini yan yana görmek, molekülü otomatik olarak anorganik yapmaz.",
          "Önce tüm türün yapısını incele: iyonik Na⁺CN⁻ tuzuyla kovalent CH₃CN aynı bağlanma düzenine sahip değildir. Benzer biçimde karbonat iyonu içeren CaCO₃ ile organik bir karbonil grubu karıştırılmaz. Atom türleri gerekli bilgidir; hangi grubun nasıl bağlandığı da sınıflamada rol oynar."
        ]
      },
      {
        "title": "Organik madde, sağlıklı veya doğal demek değildir",
        "paragraphs": [
          "Kimyadaki organik terimi tarımdaki üretim etiketi veya “yararlı madde” anlamıyla aynı değildir. Laboratuvarda hazırlanan bir polimer organik olabilir; canlıda bulunan su ve mineraller anorganik olabilir. Maddenin kökeni, etkisi ve kimyasal sınıfı ayrı sorulardır.",
          "Bu ayrım bir metin sorusunda sözcük anlamını da korur. “Canlı üretti, öyleyse bütün bileşenleri organik” çıkarımı yerine her bileşenin kimliğine bak. Etanol, üre ve NaCl aynı biyolojik örnekte bulunabilir ama aynı kimyasal sınıfta olmak zorunda değildir."
        ]
      },
      {
        "title": "Genel özellikler nasıl kullanılmalı?",
        "paragraphs": [
          "Birçok organik molekül kovalent bağlarla kurulur; küçük moleküllü örneklerin erime ve kaynama sıcaklıkları iyonik tuzlara göre düşük olabilir. Pek çoğu yanabilir ve apolar organik çözücülerde çözünebilir. Bunlar yapı ve etkileşimlerden doğan yaygın eğilimlerdir.",
          "Mutlak karşıtlıklar kurma: glikoz ve etanol suda çözünebilir, organik asit çözeltileri iyonlaşabilir; organik tuzlar da vardır. Anorganik moleküller arasında kovalent türler, suda çözünmeyen tuzlar ve yanabilen maddeler bulunur. Tepkime hızı da yalnız organik/anorganik etiketinden çıkarılmaz; mekanizma ve koşullar gerekir."
        ]
      },
      {
        "title": "Allotrop, izotop ve izomeri ayır",
        "paragraphs": [
          "Aynı element atomlarının farklı bağlanma ve uzaysal düzenlerle oluşturduğu yapılar allotroptur. Elmas ve grafit, karbonun farklı allotroplarıdır. Atomların hepsi karbon olduğu hâlde ağları farklıdır; bu yapısal fark özellikleri değiştirebilir.",
          "İzotopta çekirdekteki nötron sayısı değişir: ¹²C ve¹³C örneği budur. Yapı izomerinde ise aynı molekül formülüne sahip farklı atom bağlantıları bulunur; örneğin bütanın iki karbon iskeleti. Allotrop kavramı element yapılarını, yapı izomerliği molekül bağlantılarını karşılaştırır."
        ]
      },
      {
        "title": "Elmasta dört komşulu üç boyutlu ağ",
        "paragraphs": [
          "İdeal elmas kristalinde her iç karbon dört komşu karbonla kovalent bağ yapar. Bağların yerel yönleri düzgün dört yüzlü yerleşime yakındır. Ağ üç boyutta sürer; elması tek bir C₅ molekülünden oluşmuş gibi düşünme. Etkileşimde merkez ve dört komşu, büyük ağdan alınmış bir kesittir.",
          "Yaygın kovalent ağ, elmasın yüksek sertliğiyle ilişkilidir. Saf elmas sıradan koşullarda elektrik yalıtkanıdır ama ısıyı iyi iletebilir. Isı iletimiyle elektrik iletimi aynı mekanizma değildir; “elektrik iletmiyorsa ısı da iletmez” çıkarımı elmasla çürütülür."
        ]
      },
      {
        "title": "Grafitte bağlar ve tabakalar farklı roller taşır",
        "paragraphs": [
          "Grafitte her iç karbon, tabaka içinde üç komşu karbonla bağlanır; altıgen ağlar oluşur. Tabakalar arasında ise aynı tür güçlü kovalent ağ devam etmez; daha zayıf etkileşimler bulunur. Bu yapı tabakaların kaymasını ve grafitin yumuşak davranışını açıklar.",
          "Tabaka içindeki delokalize elektronlar elektrik iletimine katkı verir; iletim yönüne bağlı olabilir. Grafit, kalem uçlarında, elektrotlarda ve yağlayıcı uygulamalarda kullanılır. Kalemdeki “kurşun” sözü saf kurşun metali değil grafitli karışım için kullanılan günlük addır."
        ]
      },
      {
        "title": "Grafen tek tabakayı görünür kılar",
        "paragraphs": [
          "Grafen, karbonların bal peteği biçiminde dizildiği tek atom kalınlığındaki tabakadır. Her iç karbon üç yakın karbon komşusuna sahiptir. Atom merkezleri yaklaşık iki boyutlu bir ağ oluşturur; elektron bulutlarının fiziksel kalınlığının matematiksel olarak sıfır olduğu iddia edilmez.",
          "İnce, dayanıklı ve elektrik iletimi bakımından ilgi çekici olması elektronik ve malzeme araştırmalarında önemlidir. Ancak sertlik, esneklik ve çekme dayanımı farklı özelliklerdir; kaynaksız “her maddeden şu kadar kat iyi” sayıları yerine hangi özelliğin ve koşulun ölçüldüğünü belirtmek gerekir."
        ]
      },
      {
        "title": "C₆₀ kafesini komşulukla incele",
        "paragraphs": [
          "C₆₀ fullereni 60 karbon atomundan oluşan kapalı bir molekül kafesidir. İdeal kesik ikosahedron çiziminde 12 beşgen ve 20 altıgen yüz bulunur; her karbon üç karbon komşusuna bağlıdır. Bu yapı top biçimli bir molekül örneğidir, elmasın sonsuz ağıyla aynı nesne değildir.",
          "Komşuluk sayımında her bağ iki uçtan sayılır: 60×3/2=90 karbon–karbon bağlantısı elde edilir. Model bu topolojiyi gerçekten kurar. Gerçek C₆₀’ta bütün bağ uzunlukları tam eşit değildir; ideal çokyüzlü çizim ölçülmüş bağ uzunluğu veya elektrik iletkenliği hesabı olarak sunulmaz."
        ]
      },
      {
        "title": "Nanotüpte tabaka kıvrılır, bağlanma sürer",
        "paragraphs": [
          "Karbon nanotüpü, grafen benzeri bir tabakanın silindirik yapı oluşturmasıyla düşünebilirsin. Tek veya çok duvarlı türler vardır. İç karbonların yakın komşuluk düzeni grafene benzerken silindir çapı ve kıvrılma yönü elektronik özellikleri değiştirir.",
          "Bütün nanotüpler aynı iletkendir denmez; yapıya göre metalik veya yarı iletken davranış görülebilir. Fullerenlerin de elektriksel özellikleri yapı ve katkılanmaya bağlıdır. Bu yüzden karbonun bütün allotroplarını “üç komşu varsa elektrik kesin aynıdır” biçiminde birleştirme."
        ]
      },
      {
        "title": "Yapıdan özelliğe gerekçe kur",
        "paragraphs": [
          "Elmasın üç boyutlu güçlü ağı sertliği, grafitin tabakalı yapısı kaymayı, grafenin tek tabakası ince yapı özelliğini açıklar. Aynı element oluşları, yapıların aynı fiziksel davranışı göstermesini gerektirmez. Bir özellik sorusunda önce bağların nerede ve nasıl bulunduğunu ara.",
          "Allotropların bazı kimyasal özellikleri de farklı olabilir; örneğin oksitlenme hızları aynı olmak zorunda değildir. Buna karşılık yeterli oksijenle tam yanmada karbonun CO₂’ye dönüşebilmesi ortak bir kimyasal sonuçtur. “Bütün özellikler farklı” gibi sınırsız bir genelleme yapılmaz."
        ]
      },
      {
        "title": "Formülün verdiği bilgiyi doğru katmanda kullan",
        "paragraphs": [
          "Bir mol C₆₀ molekülü 60 mol karbon atomu içerir. Karbonun mol atom kütlesi 12 g/mol kabul edilirse C₆₀’ın mol kütlesi 720 g/mol olur. Bu atom ve molekül sayımı, molekülün kaç pentagon içerdiğini tek başına vermez; o bilgi yapısaldır.",
          "Elmas ve grafit gibi ağ katılarda bağımsız küçük molekül sayısı yerine karbon atom miktarı kullanılır. Her ikisinin element gösterimi C olabilirken fiziksel yapıları ayrıdır. Temel formül ünitesinde bu bilgi düzeylerini molekül ve basit formülle daha ayrıntılı ayıracağız."
        ]
      },
      {
        "title": "Etkileşimde kesit sınırını fark et",
        "paragraphs": [
          "Ağ gezgininde seçili karbon ve komşu bağlantıları vurgulanır; görünümü döndürmek bağlantı sayısını değiştirmez. Elmas modeli yalnız bir merkez ve dört komşu kesitidir. Grafen/grafit kesitlerinin sınır atomlarında gösterilmeyen devam bağları olabilir; iç atomları seçerek gerçek yerel komşuluğu incele.",
          "Kesik çizgiler grafitte tabakalar arası zayıf etkileşimi temsil eder; kovalent bağ diye sayılmaz. Fulleren kafesi ise 60 atomun tamamını kapalı biçimde gösterir. Görselde döndürme ve tahmin yapma ayrı keşif kaydıdır; kendi başına soru doğrusu veya konu tamamlama oluşturmaz."
        ]
      },
      {
        "title": "Elmas ve grafit: yapıdan üretim aracına",
        "paragraphs": [
          "Elmasın üç boyutlu güçlü kovalent ağı, cam veya beton gibi malzemeleri kesen uygun uçlarda ve aşındırıcı araçlarda kullanılmasını açıklar. Kesici uçta gereken sertliktir; ısı iletimi veya elektrik iletimiyle aynı özellik değildir. Elmasın iyi ısı iletimi de uygun ısı yayma tasarımlarında ayrı bir avantaj olabilir.",
          "Grafitte tabakaların kayabilmesi yağlayıcı ve kalem bağlamını, elektrik iletimi elektrotları açıklar. Isı iletimi ve yüksek sıcaklıktaki uygun davranışı, döküm kalıbı gibi üretim araçlarında da değerlendirilir; ortam ve işlem koşulları ayrıca seçilir. Tek bir “karbon malzemesi” adı aynı uygulamayı bütün allotroplara vermek için yeterli değildir."
        ]
      },
      {
        "title": "İnce tabaka ve tüp: ekran, sensör, kompozit",
        "paragraphs": [
          "Grafenin ince yapısı, elektrik iletimi ve uygun yapıda ışığı geçirebilmesi, şeffaf iletken elektrot hedefiyle ilişkilidir. Güneş pili, akıllı pencere ve esnek ekran tasarımlarında bu özelliklerden yararlanılması araştırılır veya uygun ürün yapılarında kullanılır. Bütün ekranların grafenden üretildiği gibi bir sonuç çıkmaz; üretim yöntemi ve tasarım önemlidir.",
          "Nanotüplerde yüzeye tutunan gazların elektriksel yanıtı değiştirmesi, gaz algılama çalışmalarına temel olabilir. Yüzey ve iç boşluk özellikleri H₂ depolama araştırmalarıyla; mekanik özellikleri ise uygun kompozit lif ve kumaşların güçlendirilmesiyle ilişkilidir. Depolama başarısı, sensör seçiciliği ve iletim davranışı çap, kıvrılma, katkı ve çalışma koşullarına bağlıdır."
        ]
      },
      {
        "title": "C₆₀ kafesinden işlevli malzemelere",
        "paragraphs": [
          "Fullerenin kafes ve elektron alma özellikleri, uygun türevlerinde ilaç taşıma veya biyosensör araştırmalarıyla, güneş pillerinde ise elektron aktarımı görevleriyle ilişkilendirilebilir. Yüzeyine bağlanan gruplar ve çevresi değişince çözünürlük ve biyolojik etkileşim de değişir. Bu araştırma bağlamı, saf C₆₀’ın her hastalıkta onaylı tedavi olduğu anlamına gelmez.",
          "Hidrojen depolama ve uygun biçimde katkılanmış fulleren kristallerindeki süperiletkenlik de malzeme araştırması örnekleridir. Katkı türü, kristal yapı ve sıcaklık gibi koşullar sonucun parçasıdır. Kafes modelindeki üç C komşuluğu bu olası işlevlerin yapısal başlangıcını gösterir; tek başına depolama kapasitesi, iletkenlik veya klinik etkinlik hesaplamaz."
        ]
      }
    ],
    "examples": [
      {
        "title": "Dört bağ mı, dört komşu mu?",
        "prompt": "CH₄, C₂H₄ ve C₂H₂ yapılarında bir karbonun komşu atom sayısını ve bağ mertebeleri toplamını karşılaştır.",
        "strategy": "Önce açık bağlanmayı yaz; her komşuyu bir kez, çift/üçlü bağı mertebesi kadar say.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "CH₄’te bir C, dört H komşusu ve dört tek bağ: komşu 4, mertebe toplamı 4."
          },
          {
            "label": "Adım 2",
            "explanation": "C₂H₄’te bir C, iki H ve bir C komşusu: komşu 3; 1+1+2=4."
          },
          {
            "label": "Adım 3",
            "explanation": "C₂H₂’de bir C, bir H ve bir C komşusu: komşu 2; 1+3=4."
          }
        ],
        "answer": "Komşu sayıları 4,3,2; her karbonun bağ mertebesi toplamı 4.",
        "check": "Toplam ortak elektron çiftiyle farklı atom sayısı aynı sayım değildir.",
        "pitfall": "Çift bağlı komşuyu iki farklı atom sanma."
      },
      {
        "title": "Organik sınıflamasını örnekle kur",
        "prompt": "CH₄, CO₂, CCl₄, CaCO₃, CH₃CN ve NaCN türlerini bu lise sınıflamasına göre ayır.",
        "strategy": "Önce karbon içermeyi, sonra bilinen anorganik türleri ve nitril ayrımını incele.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "CH₄ ve CCl₄ organiktir; CCl₄’te H olmaması organikliği bozmaz."
          },
          {
            "label": "Adım 2",
            "explanation": "CO₂ ve CaCO₃ anorganiktir; karbon içermek yeterli değildir."
          },
          {
            "label": "Adım 3",
            "explanation": "NaCN anorganik siyanür tuzu; CH₃CN organik nitrildir."
          }
        ],
        "answer": "Organik: CH₄, CCl₄, CH₃CN. Anorganik: CO₂, CaCO₃, NaCN.",
        "check": "Üç organik ve üç anorganik örnek bulunur.",
        "pitfall": "CN harfleri görülen her yapıyı otomatik anorganik sayma."
      },
      {
        "title": "Kapalı kafeste bağ sayısı",
        "prompt": "C₆₀ kafesinde her karbon üç farklı karbon komşusuna bağlıdır. Toplam karbon–karbon bağlantısı kaçtır?",
        "strategy": "Bütün atomların komşularını sayınca her bağlantının iki kez sayıldığını kullan.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "60 atom×3 komşu=180 bağlantı ucu."
          },
          {
            "label": "Adım 2",
            "explanation": "Her bağın iki ucu olduğundan 180/2=90."
          },
          {
            "label": "Adım 3",
            "explanation": "Kontrol: 12 beşgen ve 20 altıgenin kenar uçları 12×5+20×6=180; iki yüzün paylaştığı kenarlar yine 90."
          }
        ],
        "answer": "90 bağlantı.",
        "check": "Atom sayısı 60, bağ sayısı 90 ve yüz sayısı 32 birbirinden farklıdır.",
        "pitfall": "180 uç sayısını doğrudan bağ sayısı diye yazma."
      },
      {
        "title": "Üre sentezinde atomlar kaybolmaz",
        "prompt": "NH₄OCN→NH₂CONH₂ dönüşümünde her taraftaki C, H, N, O sayılarını ve ürenin mol kütlesini bul. Atom kütleleri C12, H1, N14, O16 g/mol.",
        "strategy": "Formülleri aynı atom türleri için topla.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "NH₄OCN: C1, H4, N2, O1. NH₂CONH₂’de de C1, H4, N2, O1 bulunur."
          },
          {
            "label": "Adım 2",
            "explanation": "Ürenin mol kütlesi 12+4×1+2×14+16=60 g/mol."
          },
          {
            "label": "Adım 3",
            "explanation": "0,20 mol üre elde edilse kütlesi 0,20×60=12 g olur; bu hesap gerçek verim varsayımı eklemez, ürün miktarından kütle bulur."
          }
        ],
        "answer": "Atomlar korunur; M=60 g/mol, 0,20 mol için 12 g.",
        "check": "Aynı atom sayısı, başlangıç ve ürünün aynı madde olduğunu göstermez.",
        "pitfall": "İki NH₂ grubundaki azotları veya hidrojenleri eksik sayma."
      },
      {
        "title": "Molekülden atom miktarına",
        "prompt": "Karbonun atom mol kütlesi 12 g/mol kabul edilsin. 0,50 mol C₆₀ kaç gramdır ve kaç mol C atomu içerir?",
        "strategy": "Bir molekülde 60 C olduğu bilgisini hem kütleye hem atom miktarına uygula.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "M(C₆₀)=60×12=720 g/mol."
          },
          {
            "label": "Adım 2",
            "explanation": "Kütle 0,50×720=360 g."
          },
          {
            "label": "Adım 3",
            "explanation": "Karbon atom miktarı 0,50×60=30 mol C atomu."
          }
        ],
        "answer": "360 g; 30 mol C atomu.",
        "check": "30 mol×12 g/mol=360 g kütleyi doğrular.",
        "pitfall": "0,50 mol molekülü 0,50 mol atomla eşitleme."
      },
      {
        "title": "Bir yapının özelliğini gerekçelendir",
        "prompt": "Saf elmas elektriği iyi iletmeyip ısıyı iletebilirken grafit tabaka içinde elektrik iletebilir. Bu sonuç “ısı ve elektrik aynı iletimdir” savını destekler mi?",
        "strategy": "Önce gözlemi, sonra mekanizmaların aynı olması gerekip gerekmediğini ayır.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "Elmas için yüksek ısı iletimi ile elektrik yalıtkanlığı birlikte bulunabilir."
          },
          {
            "label": "Adım 2",
            "explanation": "Bu tek örnek, iki iletkenliğin zorunlu birlikte değiştiği savına karşı örnektir."
          },
          {
            "label": "Adım 3",
            "explanation": "Grafitte delokalize elektronlar ve tabaka yapısı elektrik davranışının ayrıca incelenmesi gerektiğini gösterir."
          }
        ],
        "answer": "Sav desteklenmez; ısı ve elektrik iletimi ayrı özelliklerdir.",
        "check": "Aynı element olmak da aynı iki iletim değerini zorunlu kılmaz.",
        "pitfall": "Elektrik iletmiyor diye ısıyı da iletemez sonucunu çıkarma."
      }
    ],
    "recall": [
      {
        "prompt": "Karbonun atom numarası, değerlik elektronu ve yaygın bağ değerliği?",
        "answer": "Atom numarası 6, değerlik elektron sayısı 4; olağan nötr organik yapılarda bağ mertebeleri toplamı 4’tür."
      },
      {
        "prompt": "CCl₄ neden yararlı bir karşı örnektir?",
        "answer": "Organik olup H içermez; C–H bağını bütün organikler için zorunlu saymayı çürütür."
      },
      {
        "prompt": "Elmas, grafit ve C₆₀’ta iç karbon komşuluğu?",
        "answer": "İdeal elmas ağında 4; grafit tabakasında 3; C₆₀ kapalı kafesinde 3 komşu."
      },
      {
        "prompt": "Allotrop ile izotop farkı?",
        "answer": "Allotropta aynı elementin bağlanma/yerleşimi; izotopta aynı atom numarasında nötron sayısı farklıdır."
      }
    ],
    "items": [
      {
        "prompt": "Nötr karbon atomunun atom numarası 6’dır. Temel hâl elektron dizilişi 1s² 2s² 2p² olduğuna göre değerlik elektron sayısı kaçtır?",
        "options": [
          "8",
          "2",
          "12",
          "6",
          "4"
        ],
        "answer": 4,
        "hint": "En büyük n değerine ait elektronları topla.",
        "explanation": "İkinci katmandaki 2+2 elektron değere katılır; sonuç 4’tür. 1s² içte 2, dışta 4; toplam 6 elektronla nötr C doğrulanır.",
        "guidance": {
          "knowledge": [
            "Değerlik elektronları temel katman modelinde en dış ana enerji düzeyinde bulunan elektronlardır."
          ],
          "strategy": "En büyük n değerine ait elektronları topla.",
          "steps": [
            "En büyük ana katman n=2.",
            "2s² ve 2p² toplam 2+2 elektron taşır.",
            "Değerlik elektron sayısı 4 olur."
          ],
          "optionReasons": [
            "8 dolu ikinci katmanın kapasitesidir; karbonun o katmandaki gerçek sayısı değildir.",
            "2 yalnız 2s²’yi veya iç katmanı sayar; 2p² atlanır.",
            "12 karbonun yaygın kütle numarasıyla ilişkili olabilir; elektron sayısı değildir.",
            "6 atomun bütün elektronlarını sayar; içteki 1s² dahil edilmez.",
            "İkinci katmandaki 2+2 elektron değere katılır; sonuç 4’tür."
          ],
          "commonError": "Katman kapasitesini dolu elektron sayısı sanma.",
          "check": "1s² içte 2, dışta 4; toplam 6 elektronla nötr C doğrulanır."
        }
      },
      {
        "prompt": "Aşağıdaki türlerden hangisi hidrojen içermediği hâlde bu lise sınıflamasında organik bileşiktir?",
        "options": [
          "CaCO₃",
          "CO₂",
          "H₂CO₃",
          "CCl₄",
          "NaCl"
        ],
        "answer": 3,
        "hint": "Bilinen karbon oksidi/karbonat istisnalarını ayır.",
        "explanation": "CCl₄, organik olmasına karşın yalnız C ve Cl içerir. Doğru türün formülünde H olmadığını ayrıca kontrol et.",
        "guidance": {
          "knowledge": [
            "Karbonlu bileşiklerin çoğu H içerir; ancak C–H bağı bütün organik türler için zorunlu değildir."
          ],
          "strategy": "Bilinen karbon oksidi/karbonat istisnalarını ayır.",
          "steps": [
            "NaCl karbon içermez.",
            "CO₂, karbonat ve karbonik asit temel sınıflamada anorganiktir.",
            "CCl₄ organik örnektir ve H içermez."
          ],
          "optionReasons": [
            "CaCO₃ karbonat tuzudur; karbon içermek onu organik yapmaz.",
            "CO₂ karbon oksididir ve anorganik sınıftadır.",
            "H₂CO₃ karbonik asittir; ayrıca zaten H içerir.",
            "CCl₄, organik olmasına karşın yalnız C ve Cl içerir.",
            "NaCl karbon içermez ve anorganiktir."
          ],
          "commonError": "H içermeyen bütün karbon bileşiklerini aynı sınıfa koyma.",
          "check": "Doğru türün formülünde H olmadığını ayrıca kontrol et."
        }
      },
      {
        "prompt": "1828’de Wöhler’in amonyum siyanattan üre elde etmesinin karbon kimyası bakımından temel önemi nedir?",
        "options": [
          "Organik bir maddenin canlı dışında hazırlanabildiğini göstermesi.",
          "Karbonun ilk kez keşfedilmesi.",
          "Bütün organik maddelerin yalnız canlılarda yapılabildiğini kanıtlaması.",
          "Atomların kimyasal tepkimede element değiştirdiğini göstermesi.",
          "Ürenin karbon içermediğini kanıtlaması."
        ],
        "answer": 0,
        "hint": "Tarihsel savla deney sonucunun neyi karşılaştırdığını düşün.",
        "explanation": "Önemi organik sentezin canlı dışında gerçekleşebilmesidir. Başlangıç ve ürün formüllerinde aynı atom türleri korunur.",
        "guidance": {
          "knowledge": [
            "Yaşam gücü görüşü organik madde oluşumunu canlıya bağlıyordu; organik sentez bu sınırı değiştirdi."
          ],
          "strategy": "Tarihsel savla deney sonucunun neyi karşılaştırdığını düşün.",
          "steps": [
            "Başlangıç maddesi amonyum siyanat olarak alınır.",
            "Canlı dışında üre oluşması organik sentez örneğidir.",
            "Bu sonuç yalnız canlıda oluşma zorunluluğuna karşı kanıt sağlar."
          ],
          "optionReasons": [
            "Önemi organik sentezin canlı dışında gerçekleşebilmesidir.",
            "Deney karbon elementinin keşfi değildir.",
            "Canlı dışında ürün elde edilmesi tam tersine bu mutlak savı zayıflatır.",
            "Tepkimede C, H, N, O atom türleri korunur; element dönüşümü yoktur.",
            "Ürenin NH₂CONH₂ formülünde C atomu vardır."
          ],
          "commonError": "Tarihsel bir sentezi element keşfi veya çekirdek dönüşümüyle karıştırma.",
          "check": "Başlangıç ve ürün formüllerinde aynı atom türleri korunur."
        }
      },
      {
        "prompt": "CH₄, C₂H₄ ve C₂H₂ moleküllerinin olağan açık yapılarında bir karbon atomunun farklı atom komşusu sayıları sırasıyla nedir?",
        "options": [
          "1,2,3",
          "2,3,4",
          "4,3,2",
          "4,2,1",
          "4,4,4"
        ],
        "answer": 2,
        "hint": "Her karbonun kaç ayrı H ve C’ye bağlı olduğunu yaz.",
        "explanation": "Farklı komşu sayıları 4,3,2 olur; bağ mertebesi toplamı üçünde de 4’tür. Karbonun olağan değerliği 4 bilgisiyle komşu sayısı aynı bilgi değildir.",
        "guidance": {
          "knowledge": [
            "Bir komşu atom, çift veya üçlü bağla da bağlansa tek atomdur; bağ mertebesi ayrı sayılır."
          ],
          "strategy": "Her karbonun kaç ayrı H ve C’ye bağlı olduğunu yaz.",
          "steps": [
            "CH₄’te dört H komşudur.",
            "C₂H₄’te iki H ve bir C komşudur.",
            "C₂H₂’de bir H ve bir C komşudur."
          ],
          "optionReasons": [
            "1,2,3 verilen yapıların komşu atomlarını saymaz.",
            "2,3,4 metan ve etinin gerçek komşuluklarını ters sıralar.",
            "Farklı komşu sayıları 4,3,2 olur; bağ mertebesi toplamı üçünde de 4’tür.",
            "4,2,1 etendeki diğer C’yi ve etindeki H’yi eksik sayar.",
            "4,4,4 bağ mertebesi toplamlarını komşu sayısıyla karıştırır."
          ],
          "commonError": "Çoklu bağı çok sayıda farklı atom sanma.",
          "check": "Karbonun olağan değerliği 4 bilgisiyle komşu sayısı aynı bilgi değildir."
        }
      },
      {
        "prompt": "İdeal elmas kristalinin içindeki bir karbon kaç yakın karbon komşusuna kovalent bağla bağlıdır?",
        "options": [
          "12",
          "6",
          "4",
          "3",
          "2"
        ],
        "answer": 2,
        "hint": "Yerel merkez ve dört köşe düzenini düşün.",
        "explanation": "İç karbon dört karbon komşusuna bağlıdır. Her iç C için dört bağ yönü bulunur; modeldeki sınır atomları büyük ağın kesitidir.",
        "guidance": {
          "knowledge": [
            "Elmas, yerel düzgün dört yüzlü bağ yönlerine sahip üç boyutlu kovalent ağdır."
          ],
          "strategy": "Yerel merkez ve dört köşe düzenini düşün.",
          "steps": [
            "Merkezde bir C seç.",
            "Dört yüzlü yönlerde dört komşu C bulunur.",
            "Bu yerel yapı büyük ağ boyunca sürer."
          ],
          "optionReasons": [
            "12 bu yerel kovalent yakın komşu sayısı değildir.",
            "6 altıgenin köşe sayısıyla tek atom komşuluğunu karıştırır.",
            "İç karbon dört karbon komşusuna bağlıdır.",
            "3 grafen/grafit tabakasının iç komşuluğudur.",
            "2 doğrusal iki komşulu düzeni çağrıştırır; elmas ağı değildir."
          ],
          "commonError": "Kristal ağın yerel komşuluğunu bir yüzün köşe sayısıyla eşitleme.",
          "check": "Her iç C için dört bağ yönü bulunur; modeldeki sınır atomları büyük ağın kesitidir."
        }
      },
      {
        "prompt": "Grafitin yumuşaklığını en uygun açıklayan yapı özelliği hangisidir?",
        "options": [
          "Bütün karbonların tek bir C₆₀ molekülünde toplanması.",
          "Karbon çekirdeklerinin yer değiştirmesiyle yeni element oluşması.",
          "Hiç kovalent bağ içermemesi.",
          "Tabakalar arasında sürekli elmas benzeri dört komşulu kovalent ağ bulunması.",
          "Güçlü tabaka içi bağlara karşı tabakalar arasında daha zayıf etkileşim bulunması."
        ],
        "answer": 4,
        "hint": "Tabaka içini ve tabakalar arasını ayrı incele.",
        "explanation": "Kayma, tabakalar arasındaki daha zayıf etkileşimlerle açıklanır. Elmasın üç boyutlu ağıyla grafitin katmanlı yapısını karşılaştır.",
        "guidance": {
          "knowledge": [
            "Grafitte altıgen kovalent tabakalar ve bunlar arasında daha zayıf etkileşimler vardır."
          ],
          "strategy": "Tabaka içini ve tabakalar arasını ayrı incele.",
          "steps": [
            "Tabaka içinde C–C bağları güçlüdür.",
            "Tabakalar birbirine daha zayıf etkileşimlerle tutunur.",
            "Görece kolay kayma yumuşaklıkla ilişkilidir."
          ],
          "optionReasons": [
            "C₆₀ molekül kafesi fullerene örneğidir, grafit değildir.",
            "Kimyasal bağ yapısı değişimi çekirdeği veya element kimliğini değiştirmez.",
            "Tabaka içi karbonlar kovalent bağlıdır; bu sav yanlıştır.",
            "Bu ağ grafitin kayabilen tabakalı yapısını ifade etmez.",
            "Kayma, tabakalar arasındaki daha zayıf etkileşimlerle açıklanır."
          ],
          "commonError": "Grafit yumuşak diye tabaka içi bağları yok veya zayıf sayma.",
          "check": "Elmasın üç boyutlu ağıyla grafitin katmanlı yapısını karşılaştır."
        }
      },
      {
        "prompt": "Saf elmasın sıradan koşullarda elektrik yalıtkanı ama iyi ısı iletkeni olabilmesi hangi sonucu destekler?",
        "options": [
          "Isı ve elektrik iletimi ayrı özelliklerdir.",
          "Isı ileten her madde elektrik de iletir.",
          "Elmas karbon içermez.",
          "Her karbon allotropunun bütün özellikleri aynıdır.",
          "Elektrik yalıtkanı hiçbir yolla ısı iletemez."
        ],
        "answer": 0,
        "hint": "Verilen iki özelliğin aynı maddede birlikte bulunmasını değerlendir.",
        "explanation": "Verilen örnek iki iletim türünün ayrı incelenmesi gerektiğini gösterir. Isı iletkeni ve elektrik iletkeni etiketlerini ayrı yaz.",
        "guidance": {
          "knowledge": [
            "Bir karşı örnek, iki özelliğin her zaman birlikte bulunduğu savını çürütebilir."
          ],
          "strategy": "Verilen iki özelliğin aynı maddede birlikte bulunmasını değerlendir.",
          "steps": [
            "Elektrik yalıtkanlığı kabul edilen gözlemdir.",
            "Isı iletimi de aynı maddede bulunabilir.",
            "Bu ikisi zorunlu aynı mekanizma veya aynı değer değildir."
          ],
          "optionReasons": [
            "Verilen örnek iki iletim türünün ayrı incelenmesi gerektiğini gösterir.",
            "Verilen elmas örneği bu mutlak savın karşı örneğidir.",
            "Elmas karbon allotropudur; element içeriği değişmez.",
            "Farklı yapıların özellikleri aynı olmak zorunda değildir.",
            "Elmasın ısı iletebilmesi bu savla çelişir."
          ],
          "commonError": "“İletken” sözcüğünün hangi taşınan niceliğe ait olduğunu atlama.",
          "check": "Isı iletkeni ve elektrik iletkeni etiketlerini ayrı yaz."
        }
      },
      {
        "prompt": "C₆₀ kapalı kafesinde her C atomu üç farklı C komşusuna bağlıdır. Toplam C–C bağlantısı kaçtır?",
        "options": [
          "60",
          "180",
          "90",
          "30",
          "120"
        ],
        "answer": 2,
        "hint": "Toplam komşuluk uç sayısını ikiye böl.",
        "explanation": "Kapalı ağda 90 bağlantı vardır. 12×5+20×6 yüz kenarı da 180; iki yüzün paylaştığı kenar sayısı 90’dır.",
        "guidance": {
          "knowledge": [
            "Bir bağlantı iki atomun komşuluk listesinde görünür."
          ],
          "strategy": "Toplam komşuluk uç sayısını ikiye böl.",
          "steps": [
            "60×3=180 uç sayılır.",
            "Her bağın iki ucu vardır.",
            "180/2=90 bağlantı bulunur."
          ],
          "optionReasons": [
            "60 atom sayısıdır, bağ sayısı değildir.",
            "180 bağlantı uçlarını iki kez sayan toplamdır.",
            "Kapalı ağda 90 bağlantı vardır.",
            "30 atom sayısının yarısıdır; üçlü komşuluğu hesaba katmaz.",
            "120 her bağın iki uçtan sayılmasını doğru düzeltmez."
          ],
          "commonError": "Her bağı iki kez saydığını unutma.",
          "check": "12×5+20×6 yüz kenarı da 180; iki yüzün paylaştığı kenar sayısı 90’dır."
        }
      },
      {
        "prompt": "¹²C ve¹³C karşılaştırmasıyla elmas ve grafit karşılaştırması sırasıyla hangi kavramlara örnektir?",
        "options": [
          "İzotop; aynı kristal yapı",
          "Allotrop; izotop",
          "Aynı nötron sayısı; farklı element",
          "Yapı izomeri; izotop",
          "İzotop; allotrop"
        ],
        "answer": 4,
        "hint": "Çekirdek değişimini bağ düzeni değişiminden ayır.",
        "explanation": "Sıralama izotop ve allotroptur. İkisinde de element kimliği karbon olarak kalır.",
        "guidance": {
          "knowledge": [
            "İzotop çekirdek nötron farkını, allotrop aynı elementin farklı yapısal düzenini anlatır."
          ],
          "strategy": "Çekirdek değişimini bağ düzeni değişiminden ayır.",
          "steps": [
            "¹²C ve¹³C aynı atom numarasında farklı kütle numarası taşır.",
            "Elmas ve grafit C atomlarının farklı ağlarıdır.",
            "Birinci izotop, ikinci allotrop örneğidir."
          ],
          "optionReasons": [
            "Elmas ve grafitin kristal düzenleri aynı değildir.",
            "İki kavramın uygulama alanları ters verilmiştir.",
            "İki karbon izotopu farklı element değildir; nötron sayıları da eşit değildir.",
            "¹²C/¹³C aynı molekül formüllü bağlantı izomeri örneği değildir.",
            "Sıralama izotop ve allotroptur."
          ],
          "commonError": "Çekirdekteki değişiklikle bağlanma düzenini aynı olay sayma.",
          "check": "İkisinde de element kimliği karbon olarak kalır."
        }
      },
      {
        "prompt": "Yalnız bu lise organik/anorganik sınıflaması soruluyor. NaCN ve CH₃CN için hangisi doğrudur?",
        "options": [
          "CH₃CN karbon içermez.",
          "İkisi de CN içerdiği için kesin anorganiktir.",
          "NaCN organik, CH₃CN anorganiktir.",
          "NaCN anorganik siyanür tuzu, CH₃CN organik nitrildir.",
          "İkisi de karbon içerdiği için kesin organiktir."
        ],
        "answer": 3,
        "hint": "Tam formül ve bağlanma sınıfını incele.",
        "explanation": "CN grubunun görünmesi tek başına iki yapıyı aynı sınıfa sokmaz. CH₃–C≡N çizimi organik karbon iskeletini görünür kılar.",
        "guidance": {
          "knowledge": [
            "Basit siyanür tuzu ile karbon iskeletine bağlı nitril grubu farklı kimyasal türlerdir."
          ],
          "strategy": "Tam formül ve bağlanma sınıfını incele.",
          "steps": [
            "NaCN, Na⁺ ve CN⁻ içeren tuzdur.",
            "CH₃CN, karbonlu kovalent nitril yapısıdır.",
            "Bu öğretimde sınıfları sırasıyla anorganik ve organiktir."
          ],
          "optionReasons": [
            "CH₃CN formülünde iki C atomu vardır.",
            "Organik nitril örneği bu genellemenin karşı örneğidir.",
            "Sınıflar ters verilmiştir.",
            "CN grubunun görünmesi tek başına iki yapıyı aynı sınıfa sokmaz.",
            "Karbonat ve siyanür tuzları karbonlu anorganik örneklerdir."
          ],
          "commonError": "Bir alt grubu bütün molekülün kimliğiyle karıştırma.",
          "check": "CH₃–C≡N çizimi organik karbon iskeletini görünür kılar."
        }
      },
      {
        "prompt": "Karbonun atom mol kütlesi 12 g/mol kabul edilirse 0,25 mol C₆₀’ın kütlesi kaç gramdır?",
        "options": [
          "3",
          "720",
          "60",
          "180",
          "15"
        ],
        "answer": 3,
        "hint": "Önce C₆₀’ın mol kütlesini bul.",
        "explanation": "Sonuç 180 g’dır. 0,25×60=15 mol C; 15×12=180 g doğrular.",
        "guidance": {
          "knowledge": [
            "Bir C₆₀ molekülünde 60 C atomu vardır; m=nM kullanılır."
          ],
          "strategy": "Önce C₆₀’ın mol kütlesini bul.",
          "steps": [
            "M=60×12=720 g/mol.",
            "Madde miktarı 0,25 mol.",
            "m=0,25×720=180 g."
          ],
          "optionReasons": [
            "3 gram, 0,25 mol C atomu hesabıdır; C₆₀ çarpanı atlanır.",
            "720 g bir mol C₆₀’a aittir; 0,25 mol değildir.",
            "60, bir C₆₀ molekülündeki atom sayısıdır; kütle değildir.",
            "Sonuç 180 g’dır.",
            "15 mol C atomu miktarıdır; gram sonucu değildir."
          ],
          "commonError": "Molekül miktarı ile atom miktarını aynı sayma.",
          "check": "0,25×60=15 mol C; 15×12=180 g doğrular."
        }
      },
      {
        "prompt": "Aşağıdaki yorumlardan hangisi karbon allotropları için uygundur?",
        "options": [
          "Grafen çok sayıda kalın grafit tabakasının zorunlu adıdır.",
          "Üç komşusu olan bütün karbon yapıları aynı elektrik özelliklerini taşır.",
          "Bütün nanotüpler her koşulda aynı metalik iletkendir.",
          "Nanotübün elektronik davranışı çap ve kıvrılma düzenine bağlı değişebilir.",
          "Allotrop farklılıkları atom numarasının değişmesidir."
        ],
        "answer": 3,
        "hint": "Yapı ayrıntısının hangi özelliği etkileyebileceğini düşün.",
        "explanation": "Yapıya bağlı metalik veya yarı iletken davranış mümkündür. Tüm karşılaştırmada element C olarak kalır; bağ ve uzaysal düzenler değişir.",
        "guidance": {
          "knowledge": [
            "Allotroplarda aynı elementin farklı düzenleri bulunur; elektronik özellikler yalnız komşu sayısıyla belirlenmez."
          ],
          "strategy": "Yapı ayrıntısının hangi özelliği etkileyebileceğini düşün.",
          "steps": [
            "Nanotüpler farklı çap ve kıvrılma düzenleriyle kurulabilir.",
            "Bu ayrıntılar elektronik davranışı etkiler.",
            "Bütün nanotüplere tek bir metalik özellik atamak yerine yapı koşulunu koru."
          ],
          "optionReasons": [
            "Grafen tek atom kalınlıklı bir tabaka örneğidir.",
            "Grafen, fulleren ve nanotüpün aynı yakın komşu sayısı bütün elektronik yapılarını eşitlemez.",
            "Bu sınırsız iletkenlik genellemesi doğru değildir.",
            "Yapıya bağlı metalik veya yarı iletken davranış mümkündür.",
            "Atom numarası değişirse element değişir; allotrop tanımı bu değildir."
          ],
          "commonError": "Yapı–özellik bağını tek bir komşu sayısına indirgeme.",
          "check": "Tüm karşılaştırmada element C olarak kalır; bağ ve uzaysal düzenler değişir."
        }
      }
    ],
    "source": "MEBİ AYT Kimya PDF103–106; OGM12 Kimya 008–009 ve 013 tam paftaları; Dersler Cepte 12 Kimya 4. sayısının 9–11 ve 5. sayısının 10–11 sayfaları karşılaştırılarak hazırlanmış özgün öğretim ve sorular. Allotrop ağları, istisnalı sınıflama ve yapı–özellik bağı koşullarıyla açıklanır; özel Drive belgeleri veya resmî sınav soruları paketlenmez."
  },
  {
    "id": "basit-ve-molekul-formul",
    "topic": "detail-446",
    "title": "Basit ve molekül formülü",
    "minutes": 70,
    "objectives": [
      "Kütleyi mole çevirip en küçük atom oranını çıkar",
      "Mol kütlesiyle molekül formülünü kur ve veriyi denetle",
      "Tam yanma ürünlerinden C, H ve koşullu O miktarını hesapla"
    ],
    "sections": [
      {
        "title": "Formül hangi bilgiyi taşıyor?",
        "paragraphs": [
          "Kimyasal formül element türleri ve sayı ilişkilerini özetler. Molekül formülü bir moleküldeki gerçek atom sayılarını, basit formül ise en küçük tam sayılı atom oranını gösterir. C₆H₁₂O₆ için molekül başına 6 C, 12 H, 6 O; en küçük oran 1: 2: 1 olduğundan basit formül CH₂O olur.",
          "Basit formül bir molekül çizimi değildir. CH₂O oranı glikozda da farklı bileşiklerde de bulunabilir. Molekül formülü de tek başına hangi atomun hangi atoma bağlandığını tam belirlemez; yapı formülü için ek bağlanma bilgisi gerekir."
        ]
      },
      {
        "title": "İki formül bazen aynıdır",
        "paragraphs": [
          "Alt indislerin ortak böleni 1 ise molekül formülü zaten en küçük orandadır. C₂H₆O için 2,6,1 sayılarının ortak böleni 1; basit ve molekül formülü aynı C₂H₆O olur. H₂O ve CO₂ de kendi alt indisleri bakımından sadeleşmez.",
          "C₂H₄O₂ için ortak bölen 2 olduğundan basit formül CH₂O’dur. Formülde görünmeyen alt indis 1’dir; oksijenin yanına sayı yazılmaması, onu hesap dışında bırakmak değildir. En büyük ortak böleni kullanmak oranı birden çok kez sadeleştirmeyi önler."
        ]
      },
      {
        "title": "Önce mol: kütle oranı atom oranı değildir",
        "paragraphs": [
          "Atomların mol kütleleri farklıdır; 12 g C ve 1 g H eşit kütlede değil ama birer mol atom içerir. Analiz kütlelerinden atom miktarları n=m/M_atom ile bulunur. Kütleleri doğrudan alt indis yapmak, karbonun hidrojen atomundan yaklaşık 12 kat ağır oluşunu atlar.",
          "Bu ünitenin sayısal örneklerinde C12, H1, O16, N14 g/mol değerleri soruda verildiğinde kullanılır. Gerçek ölçümlerde daha hassas atom kütleleri veya deney belirsizliği bulunabilir. Birimlerin atomik mol kütlesine ait olduğunu kontrol et; O atomu için 16, H atomu için 1 kullanılır."
        ]
      },
      {
        "title": "Üç sütunlu çözüm tablosu kur",
        "paragraphs": [
          "Her element için kütle, mol miktarı ve en küçük mole bölünmüş oran sütunları aç. Örneğin C3,6 g, H0,6 g, O4,8 g için mol miktarları 0,3; 0,6; 0,3 olur. En küçük 0,3’e bölünce 1: 2: 1 elde edilir; basit formül CH₂O’dur.",
          "Elementler aynı moleküllerde birlikte bulunduğu için atom mol sayılarının oranı, atom adetleri oranına eşittir. Avogadro sayısı bütün sütunlarda ortak çarpan olarak sadeleşir. Bu yüzden her atomun gerçek adet sayısını tek tek bulmadan formüle ulaşabiliriz."
        ]
      },
      {
        "title": "Kesirli oranı tüm sütunlarda aynı katla gider",
        "paragraphs": [
          "En küçük mole bölünmüş oran her zaman doğrudan tam sayı olmayabilir. 1,5: 4: 1 oranının bütün terimlerini 2 ile çarpmak 3: 8: 2 verir; basit formül C₃H₈O₂ olur. Yalnız 1,5’i 2’ye yuvarlamak oranı değiştirir.",
          "1,5 için 2; 1,333… için 3; 1,25 için 4 gibi ortak çarpanlar düşünülebilir. Ama önce ölçüm hassasiyetini oku. Deneyin verdiği 0,999 veya 1,001 küçük yuvarlama artığı olabilirken 1,5’i 1 saymak değildir. Model, uyuşmayan veriyi zorla bir formüle dönüştürmez."
        ]
      },
      {
        "title": "Yüzde bileşimde 100 gram seçmek bir kolaylıktır",
        "paragraphs": [
          "Bir bileşik kütlece yüzde 40 C, yüzde 6,67 H, yüzde 53,33 O içeriyorsa 100 g örnek seçerek aynı sayıları gram olarak kullanabilirsin. 100 g seçimi gerçek deney örneğinin kütlesi olduğunu iddia etmez; oranları değiştirmeyen bir hesap ölçeğidir.",
          "Yüzdeleri atom mol kütlelerine bölüp yine en küçük orana geç. Yüzdelerin yaklaşık yazılmış olabileceğini düşün; toplamın 100’e çok yakın olması ölçüm bağlamıyla incelenir. Verilen türlerin dışında element olabileceği söyleniyorsa kalanı otomatik oksijen sayma."
        ]
      },
      {
        "title": "Bilinmeyen element kütlesini koşuluyla bul",
        "paragraphs": [
          "Saf örneğin yalnız C, H ve O’dan oluştuğu verilirse m_O=m_örnek −m_C−m_H kullanılabilir. Örneğin 9 g örnekte 3,6 g C ve 0,6 g H varsa O kütlesi 4,8 g olur. Bu fark, oksijen dışındaki her şeyin zaten sayılmış olmasına dayanır.",
          "Örnekte N, halojen veya safsızlık varsa bu fark tek başına O’yu vermez. Negatif bir O kütlesi bulunması, verilerin veya varsayımların birbiriyle uyuşmadığını gösterir. Negatif kütleyi mutlak değer yapıp formül üretmek bir onarım yöntemi değildir."
        ]
      },
      {
        "title": "Basit formül kütlesini doğru topla",
        "paragraphs": [
          "CH₂O basit formül birimi için 12+2×1+16=30 g/mol hesap ölçeği bulunur. C₂H₃O için 24+3+16=43 g/mol olur. Alt indis bütün atom kütlesiyle çarpılır; birden çok element için ayrı toplam terimi vardır.",
          "Bu sayı, örnekte bağımsız CH₂O molekülleri bulunduğunu kanıtlamaz. “Basit formül kütlesi” molekül kütlesine geçişte kullanılan en küçük oran biriminin kütle ölçeğidir. İyonik bileşikler için de oran yazılır, ama bağımsız molekül yerine formül birimi kavramı kullanılır."
        ]
      },
      {
        "title": "Molekül formülüne geçişin ortak katı",
        "paragraphs": [
          "M_molekül=n×M_basit bağıntısından n=M_molekül/M_basit bulunur. Saf tek molekül türü için n pozitif tam sayı olmalıdır. Basit formül C₂H₃O ve mol kütlesi 86 g/mol ise n=2; bütün alt indisler 2 ile çarpılıp C₄H₆O₂ elde edilir.",
          "Sadece ilk elementin alt indisini değiştirme. Aynı n, atom oranını korumak için her elemente uygulanır. n=1 olduğunda iki formül aynıdır. Kesin verilen veride n=1,5 çıkarsa bunu 2’ye yuvarlayıp molekül formülü seçmek yerine verilenlerin uyumunu sorgula."
        ]
      },
      {
        "title": "Mol kütlesi nasıl elde edilmiş olabilir?",
        "paragraphs": [
          "m gram saf örneğin madde miktarı n mol ise M=m/n olur. İdeal gaz koşulları açık verildiğinde n=PV/(RT) ile de madde miktarı bulunabilir. Soruda 0 °C, 1 atm ve molar hacim 22,4 L/mol kabul edilirse V/22,4 yolu aynı amaçla kullanılır.",
          "Molar hacim sıcaklık ve basınca bağlıdır; her durumda 22,4 L/mol değildir. Aynı sıcaklık ve basınçta ideal gazların yoğunluk oranı mol kütlesi oranına eşittir. Bu ek bilgiyi bulduktan sonra basit formül kütlesiyle tam sayı katını kurarsın."
        ]
      },
      {
        "title": "Yanma analizi önce karbonu izler",
        "paragraphs": [
          "Saf C, H, O örneği yeterli oksijenle tamamen yakılıyorsa bütün karbon CO₂’ye, karbon atomları korunarak geçer. n_C=n_CO₂ ve m_C=m_CO₂×12/44 olur. CO₂’nin 44 g’ında 12 g karbon bulunur.",
          "Üründeki oksijenin tamamı başlangıçtaki organik maddeden gelmez; yakma sırasında kullanılan O₂ de ürünlere katılır. Bu nedenle CO₂ kütlesinin tamamını örnekteki karbon veya oksijen kütlesi sayamazsın. İzlediğin atomun hangi üründe kaç tane bulunduğunu yaz."
        ]
      },
      {
        "title": "Suda iki hidrojen var",
        "paragraphs": [
          "Tam yanmada n_H=2n_H₂O olur. Üretilen 18 g H₂O, 2 g hidrojen atomu kütlesine karşılık gelir. m_H=m_H₂O×2/18 bağıntısı, ürün suyun bir molekülünde iki H bulunmasından doğar.",
          "Atom molü ile molekül molünü ayır: 0,40 mol H₂O, 0,80 mol H atomu içerir. Bu örnekte sorulan H atom miktarıdır, H₂ gazı miktarı değil. Atom mol kütlesi 1 ile hidrojen gazının mol kütlesi 2 farklı amaçlarla kullanılır."
        ]
      },
      {
        "title": "Örnekteki oksijeni ürünlerden doğrudan sayma",
        "paragraphs": [
          "Yalnız C, H, O içeren saf örnekte yanma ürünlerinden C ve H kütleleri bulunduktan sonra O farktan hesaplanır. Örneğin 4,6 g örnekten 8,8 g CO₂ ve 5,4 g H₂O çıkarsa m_C=2,4 g, m_H=0,6 g, m_O=1,6 g olur.",
          "Ürünlerdeki bütün O atomlarını toplamak, yanma için dışarıdan gelen oksijeni de örneğe yazmak olur. Başlangıç bileşiğinde O bulunmadığı açık verilirse farkın 0’a uyup uymadığını kontrol edebilirsin. Verilenler uyumsuzsa varsayımı veya ölçüyü tekrar incele."
        ]
      },
      {
        "title": "Tam yanmanın kapsamını baştan yaz",
        "paragraphs": [
          "Bu yöntem saf tek bileşik, tam yanma ve ürünlerin doğru toplanması koşullarına dayanır. Oksijen yetersizliğinde CO veya kurum oluşabilir; kaçan su veya karışım örneği de basit hesabı bozabilir. Sayısal kartlarda bu koşullar bağımsız olarak belirtilir.",
          "N veya halojen içeren bileşikler için ek ürün analizi gerekir. Bu ünitenin etkileşimi yalnız C, H, O verilerini çözer; modelin dışında bir elementi gizlice oksijen saymaz. Kimyasal veri analizi, bir formül çıkana kadar sayıları zorlamak değil varsayımı ve ölçüyü birlikte sınamaktır."
        ]
      },
      {
        "title": "Oran analizi yapıyı ve kimliği tek başına kanıtlamaz",
        "paragraphs": [
          "C₂H₆O formülü etanol ve dimetil eter gibi farklı bağlantılara izin verir. Basit formül veya molekül formülünün bulunması, yapı izomerini seçmek için yeterli değildir. Bağlar veya tepkime bilgisi gibi ek deneysel kanıtlar gerekir.",
          "Benzer şekilde kütlece yüzde bileşim, basit formülün bütün tam sayı katlarında aynıdır. CH₂O, C₂H₄O₂ ve C₆H₁₂O₆ aynı C: H: O oranını taşır. Mol kütlesi verilmeden bunlardan birini tek molekül formülü diye seçemezsin."
        ]
      },
      {
        "title": "Formül adayını olağan değerlikle denetle",
        "paragraphs": [
          "Bir formülün analiz oranını sağlaması, maddenin mutlaka var olduğunu göstermez. Olağan nötr, kapalı kabuklu ve bağlantılı C, H, O moleküllerinde H sayısı en çok 2C+2 olabilir; iki değerlikli O bu üst sınırı artırmaz. C₂H₈O₂ bu koşulu bozarken C₂H₆O₂ olasıdır.",
          "Bu hızlı gerekli kontrol radikaller, iyonlar veya farklı değerlikli elementler için koşulsuz kullanılmaz. Gerekli koşulu sağlamak da tek başına bir yapıyı veya kararlılığı kanıtlamaz. Etkileşim, çıkan atom sayısı adayını bu sınırlı değerlik denetiminden ayrıca geçirir."
        ]
      },
      {
        "title": "Birim ve atom dengesiyle geri dön",
        "paragraphs": [
          "Bulduğun molekül formülünün mol kütlesini yeniden hesapla ve her elementin yüzde kütlesini denetle. Yanma analizinde önerilen bir mol bileşiğin kaç mol CO₂ ve H₂O oluşturacağını atom sayılarından bul; başlangıç örnek miktarıyla çarparak ölçülmüş ürünlere geri dön.",
          "Birbirinden farklı iki kontrol aynı sonucu destekliyorsa yanlış bir ara sadeleştirmeyi yakalamak kolaylaşır. Hatalı ilk hamleyi de adlandır: kütleyi mol sanmak, su molekülünü tek H saymak veya dış O₂’yi örnek O’suna katmak farklı düzeltmeler ister."
        ]
      },
      {
        "title": "Etkileşimde ne verildiği ve neyin bulunamadığı açık",
        "paragraphs": [
          "Kütle modunda C, H, O kütlelerini girip mol oranlarını gör; yanma modunda saf C, H, O örneğinin ve tam yanma ürünlerinin kütlelerini kullan. Atom mol kütleleri C12, H1, O16 g/mol olarak açık alınır. Mol kütlesi bilinmiyorsa 0 seçimi yalnız basit formülü verir.",
          "Model, küçük tam sayıya uymayan oranı veya mol kütlesiyle uyuşmayan çarpanı açık bildirir. Bu sonuç ölçümün neden bozuk olduğunu tek başına belirlemez. Normal değerlik kontrolü de bir adayın kesin kimliği değildir; yorumun hangi koşula dayandığını kendi gerekçende belirt."
        ]
      }
    ],
    "examples": [
      {
        "title": "Kütleden molekül formülüne",
        "prompt": "Yalnız C, H, O içeren saf bileşiğin 9 g’ında 3,6 g C ve 0,6 g H var. Mol kütlesi 90 g/mol. Molekül formülü nedir? Atom mol kütleleri C12, H1, O16 g/mol.",
        "strategy": "Önce O farkı, sonra atom mol oranı ve mol kütlesi katı.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "m_O=9−3,6−0,6=4,8 g. Mol miktarları C0,3; H0,6; O0,3."
          },
          {
            "label": "Adım 2",
            "explanation": "En küçük 0,3’e böl: 1: 2: 1, basit CH₂O; basit kütle 30 g/mol."
          },
          {
            "label": "Adım 3",
            "explanation": "n=90/30=3; aday C₃H₆O₃. Mol kütlesi 36+6+48=90 doğrulanır."
          }
        ],
        "answer": "C₃H₆O₃.",
        "check": "Yüzde C40, H6,67, O53,33 yaklaşık değerleri ilk örneğe uyar.",
        "pitfall": "Kütleleri 3,6: 0,6: 4,8 oranından doğrudan alt indis yapma."
      },
      {
        "title": "Kesirli oranı koru",
        "prompt": "C18 g, H4 g, O16 g içeren saf C, H, O bileşiğinin basit formülü nedir? C12, H1, O16 g/mol.",
        "strategy": "Atom mol oranını en küçükle sadeleştir.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "Mol miktarları 18/12=1,5; 4/1=4; 16/16=1."
          },
          {
            "label": "Adım 2",
            "explanation": "En küçük 1’e bölününce 1,5: 4: 1 kalır; 1,5’i yuvarlamak doğru değildir."
          },
          {
            "label": "Adım 3",
            "explanation": "Bütün sütunları 2 ile çarp: 3: 8: 2. Ortak bölen 1 olduğundan basit C₃H₈O₂."
          }
        ],
        "answer": "C₃H₈O₂.",
        "check": "3×12: 8×1: 2×16=36: 8: 32=18: 4: 16 kütle oranını verir.",
        "pitfall": "Yalnız bir alt indisi değiştirerek oranı bozma."
      },
      {
        "title": "Basit formülün ortak katı",
        "prompt": "Basit formül C₂H₃O ve mol kütlesi 86 g/mol. Molekül formülünü bul. C12, H1, O16 g/mol.",
        "strategy": "Basit formül kütlesini toplayıp ortak çarpanı bul.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "M_basit=2×12+3×1+16=43 g/mol."
          },
          {
            "label": "Adım 2",
            "explanation": "n=86/43=2 pozitif tam sayıdır."
          },
          {
            "label": "Adım 3",
            "explanation": "C, H, O alt indislerini birlikte 2 ile çarp: C₄H₆O₂."
          }
        ],
        "answer": "C₄H₆O₂.",
        "check": "M=48+6+32=86 g/mol.",
        "pitfall": "Yalnız C’nin alt indisini büyütme."
      },
      {
        "title": "Azotlu bileşik için aynı yöntem",
        "prompt": "Saf bileşikte 4,2 g N ve 9,6 g O var. Mol kütlesi 92 g/mol. Molekül formülü nedir? N14, O16 g/mol.",
        "strategy": "Yöntem yalnız karbon bileşiklerine özgü değildir.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "n_N=4,2/14=0,3 mol; n_O=9,6/16=0,6 mol."
          },
          {
            "label": "Adım 2",
            "explanation": "Oran 1: 2; basit NO₂ ve M_basit=46 g/mol."
          },
          {
            "label": "Adım 3",
            "explanation": "n=92/46=2; N₂O₄ elde edilir."
          }
        ],
        "answer": "N₂O₄.",
        "check": "28+64=92 g/mol; N: O atom oranı 1: 2 olarak kalır.",
        "pitfall": "O için O₂ gazının 32 g/mol değerini kullanma."
      },
      {
        "title": "Tam yanma ve eksik O bilgisi",
        "prompt": "Yalnız C, H, O içeren saf bileşiğin 4,6 g’ı yeterli O₂ ile tamamen yakılıyor; 8,8 g CO₂ ve 5,4 g H₂O toplanıyor. Mol kütlesi 46 g/mol. Formülü bul. C12, H1, O16 g/mol.",
        "strategy": "C’yi CO₂’den, H’yi sudan, O’yu örnek farkından bul.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "m_C=8,8×12/44=2,4 g; m_H=5,4×2/18=0,6 g."
          },
          {
            "label": "Adım 2",
            "explanation": "m_O=4,6−2,4−0,6=1,6 g. Mol oranı 0,2: 0,6: 0,1=2: 6: 1."
          },
          {
            "label": "Adım 3",
            "explanation": "Basit C₂H₆O kütlesi 46; M ile aynı olduğundan molekül formülü C₂H₆O."
          }
        ],
        "answer": "C₂H₆O.",
        "check": "0,1 mol bileşik 0,2 mol CO₂ ve 0,3 mol H₂O üretir; 8,8 ve 5,4 g geri bulunur.",
        "pitfall": "Ürünlerdeki bütün oksijeni örneğe atama."
      },
      {
        "title": "Hidrokarbonu ürünlerden çıkar",
        "prompt": "Yalnız C, H içeren saf bileşiğin 5,6 g’ı tam yandığında 17,6 g CO₂ ve 7,2 g H₂O oluşuyor. Mol kütlesi 56 g/mol. Molekül formülü nedir? C12, H1, O16 g/mol.",
        "strategy": "Atom miktarlarını ürün moleküllerinden izle.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "n_C=17,6/44=0,4 mol; n_H=2×7,2/18=0,8 mol."
          },
          {
            "label": "Adım 2",
            "explanation": "Oran 1: 2; basit CH₂ ve kütlesi 14 g/mol."
          },
          {
            "label": "Adım 3",
            "explanation": "n=56/14=4; C₄H₈. Madde bağlantısı tek başına bu formülden seçilemez."
          }
        ],
        "answer": "C₄H₈.",
        "check": "C kütlesi 4,8 g + H kütlesi 0,8 g = 5,6 g; O içermeme koşulu doğrulanır.",
        "pitfall": "C₄H₈’i bağ bilgisi olmadan kesin alken veya kesin halka diye adlandırma."
      },
      {
        "title": "Gaz bilgisi mol kütlesine köprü olur",
        "prompt": "İdeal davranan saf gazın 29 g’ı 0 °C ve 1 atm’de 11,2 L kaplıyor. Bu soruda molar hacim 22,4 L/mol alınacak. Basit formülü C₃H₆O ise molekül formülü nedir? C12, H1, O16 g/mol.",
        "strategy": "Önce gazın mol miktarı, sonra M ve tam sayı katı.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "n_gaz=11,2/22,4=0,50 mol."
          },
          {
            "label": "Adım 2",
            "explanation": "M=29/0,50=58 g/mol; C₃H₆O basit kütlesi 36+6+16=58."
          },
          {
            "label": "Adım 3",
            "explanation": "Çarpan 1; basit ve molekül formülü C₃H₆O olarak aynıdır."
          }
        ],
        "answer": "C₃H₆O.",
        "check": "Molar hacim koşulları kökte açık verildi; başka T, P’de otomatik kullanılmaz.",
        "pitfall": "Gaz hacmini doğrudan mol kütlesiyle çarpma."
      },
      {
        "title": "Tam sayı olmayan çarpanı reddet",
        "prompt": "Kesin verilerle basit formülü CH₂O ve mol kütlesi 45 g/mol denilen saf tek moleküllü örnek tutarlı mı? C12, H1, O16 g/mol.",
        "strategy": "Basit kütle ve molekül kütlesi oranının tam sayı olmasını denetle.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "M_basit=12+2+16=30 g/mol."
          },
          {
            "label": "Adım 2",
            "explanation": "n=45/30=1,5; bu tam sayı değildir."
          },
          {
            "label": "Adım 3",
            "explanation": "Kesin verilen iki bilgi aynı saf tek molekül türüyle uyuşmaz; 1,5’i 2’ye yuvarlayarak formül atanamaz."
          }
        ],
        "answer": "Veriler tutarsızdır.",
        "check": "n=2 seçilse mol kütlesi 60 g/mol olurdu, 45 değil.",
        "pitfall": "Hangi ölçünün yanlış olduğunu bu uyumsuzluktan tek başına kesin ilan etme."
      },
      {
        "title": "Oran adayını değerlikle sınamak",
        "prompt": "C₂H₈O₂ bir aday olarak öneriliyor. Olağan nötr, kapalı kabuklu ve bağlantılı C, H, O molekülü koşulunda bu aday mümkün mü?",
        "strategy": "Karbon ve hidrojen için gerekli üst sınırı kullan.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "C=2 için doymuş açık bağlantıda en çok 2×2+2=6 H bulunabilir."
          },
          {
            "label": "Adım 2",
            "explanation": "İki değerlikli O sayısı bu üst H sınırını artırmaz; halka/çoklu bağ H’yi azaltır."
          },
          {
            "label": "Adım 3",
            "explanation": "Adayın H8 sayısı 6’yı aşıyor; bu model koşulunda geçerli sıradan molekül değildir."
          }
        ],
        "answer": "Bu koşul altında uyumsuz adaydır.",
        "check": "Bu kontrol gerekli bir koşuldur; uygun çıkan her formülün gerçek kararlı yapı olduğunu kanıtlamaz.",
        "pitfall": "Analiz sayılarını sağlamakla olağan değerlikte mümkün olmayı aynı test sanma."
      }
    ],
    "recall": [
      {
        "prompt": "Basit formülü bulmadan önce kütlelere ne yapılır?",
        "answer": "Her elementin kütlesi atom mol kütlesine bölünür; mol oranları en küçük tam sayıya çevrilir."
      },
      {
        "prompt": "Molekül formülünde ortak çarpan nasıl bulunur?",
        "answer": "n=M_molekül/M_basit pozitif tam sayıdır; bütün alt indislere aynı n uygulanır."
      },
      {
        "prompt": "Tam yanmada C ve H atom mol miktarı?",
        "answer": "n_C=n_CO₂; n_H=2n_H₂O. Örnekteki O yalnız saf C, H, O koşulunda kütle farkından bulunur."
      },
      {
        "prompt": "Molekül formülü tek yapıyı belirler mi?",
        "answer": "Hayır; aynı formülde farklı bağlantılı yapı izomerleri bulunabilir."
      }
    ],
    "items": [
      {
        "prompt": "C₆H₁₂O₆ molekülünün en küçük tam sayılı basit formülü hangisidir?",
        "options": [
          "C₂H₄O₂",
          "C₆H₁₂O₆",
          "CH₁₂O",
          "CHO",
          "CH₂O"
        ],
        "answer": 4,
        "hint": "6,12,6 alt indislerinin ortak bölenini kullan.",
        "explanation": "CH₂O en küçük 1: 2: 1 oranını verir. 1: 2: 1’i 6 ile çarpmak başlangıç formülünü geri verir.",
        "guidance": {
          "knowledge": [
            "Basit formül alt indislerin en büyük ortak bölenle sadeleşmiş atom oranıdır."
          ],
          "strategy": "6,12,6 alt indislerinin ortak bölenini kullan.",
          "steps": [
            "Ortak en büyük bölen 6.",
            "Her alt indisi 6’ya böl: 1,2,1.",
            "Basit formül CH₂O."
          ],
          "optionReasons": [
            "C₂H₄O₂ aynı oranı taşır ama 2 ile daha sadeleşir.",
            "Bu gerçek molekül formülüdür ama en küçük oran değildir.",
            "Yalnız bazı alt indisleri değiştirmek oranı korumaz.",
            "H alt indisi 2 olmalı; CHO atom oranını değiştirir.",
            "CH₂O en küçük 1: 2: 1 oranını verir."
          ],
          "commonError": "Her alt indise aynı sadeleştirmeyi uygula.",
          "check": "1: 2: 1’i 6 ile çarpmak başlangıç formülünü geri verir."
        }
      },
      {
        "prompt": "C₂H₆O molekülünün basit formülü neden yine C₂H₆O’dur?",
        "options": [
          "Oksijen hesapta sayılmadığı için.",
          "Her organik bileşiğin iki formülü aynı olduğu için.",
          "Kütle oranı atom oranıyla her zaman aynı olduğu için.",
          "2,6,1 alt indislerinin ortak böleni 1 olduğu için.",
          "Alt indislerin toplamı 9 olduğu için."
        ],
        "answer": 3,
        "hint": "O atomunun görünmeyen 1 alt indisini de kullan.",
        "explanation": "Ortak bölen 1 olduğu için oran daha fazla sadeleşmez. CH₃O yazmak C: H: O oranını 2: 6: 1’den 1: 3: 1’e değiştirirdi.",
        "guidance": {
          "knowledge": [
            "Görünmeyen alt indis 1’dir; basit formül en küçük tam sayı oranıdır."
          ],
          "strategy": "O atomunun görünmeyen 1 alt indisini de kullan.",
          "steps": [
            "Alt indisler 2,6 ve 1.",
            "Ortak bölen 1.",
            "Bütün atom oranını koruyan daha küçük tam sayılı gösterim yok."
          ],
          "optionReasons": [
            "Oksijenin alt indisi 1 olarak mutlaka hesaba katılır.",
            "C₆H₁₂O₆ gibi birçok bileşikte basit ve molekül formülleri farklıdır.",
            "Atom kütleleri farklı olduğu için kütle ve atom oranları genelde aynı değildir.",
            "Ortak bölen 1 olduğu için oran daha fazla sadeleşmez.",
            "Alt indis toplamı sadeleşme ölçütü değildir."
          ],
          "commonError": "Görünmeyen 1’i atlayıp 2: 6 oranını tek başına sadeleştirme.",
          "check": "CH₃O yazmak C: H: O oranını 2: 6: 1’den 1: 3: 1’e değiştirirdi."
        }
      },
      {
        "prompt": "Saf C, H, O bileşiğinin 15 g’ında 6 g C, 1 g H ve 8 g O vardır. Mol kütlesi 120 g/mol. Molekül formülü nedir? C12, H1, O16 g/mol.",
        "options": [
          "C₄H₈O₄",
          "CH₂O",
          "C₂H₄O₂",
          "C₄H₄O₄",
          "C₆H₁₂O₆"
        ],
        "answer": 0,
        "hint": "Mol oranı ve 30 g/mol basit birimden ortak çarpanı çıkar.",
        "explanation": "120/30=4 olduğu için doğru molekül formülü C₄H₈O₄’tür. 48+8+64=120 g/mol; örnekteki kütle oranları geri bulunur.",
        "guidance": {
          "knowledge": [
            "Kütleleri önce atom mol kütlesine böl; M_molekül/M_basit bütün alt indislerin ortak katıdır."
          ],
          "strategy": "Mol oranı ve 30 g/mol basit birimden ortak çarpanı çıkar.",
          "steps": [
            "Mol miktarları 0,5; 1; 0,5, oran 1: 2: 1.",
            "Basit CH₂O kütlesi 30 g/mol; 120/30=4.",
            "Alt indisler 4 ile çarpılır: C₄H₈O₄."
          ],
          "optionReasons": [
            "120/30=4 olduğu için doğru molekül formülü C₄H₈O₄’tür.",
            "Bu yalnız basit formüldür; mol kütlesi 30, verilen 120 değil.",
            "Bu formülün mol kütlesi 60 olur; çarpan 2 yanlış.",
            "H alt indisi de aynı 4 çarpanıyla 8 olmalıdır.",
            "Bu formülün mol kütlesi 180 olur; çarpan 6 yanlış."
          ],
          "commonError": "Ortak çarpanı bütün alt indislere uygula.",
          "check": "48+8+64=120 g/mol; örnekteki kütle oranları geri bulunur."
        }
      },
      {
        "prompt": "Atom mol oranı C: H: O=2,5: 6: 1 olan saf bileşiğin en küçük tam sayılı basit formülü nedir?",
        "options": [
          "C₃H₆O",
          "C₁₀H₂₄O₄",
          "C₅H₁₂O₂",
          "C₅H₆O₂",
          "C₂H₆O"
        ],
        "answer": 2,
        "hint": "2,5 için bütün oranı 2 ile çarp.",
        "explanation": "5: 12: 2 kesirsiz ve en küçük atom oranıdır. 5/2: 12/2: 2/2=2,5: 6: 1 geri kontrolüdür.",
        "guidance": {
          "knowledge": [
            "Kesirli atom oranında bütün terimler aynı sayıyla çarpılır; en küçük ortak tam sayı oranı seçilir."
          ],
          "strategy": "2,5 için bütün oranı 2 ile çarp.",
          "steps": [
            "2×2,5=5; 2×6=12; 2×1=2.",
            "Yeni oran 5: 12: 2 ve ortak bölen 1.",
            "Basit formül C₅H₁₂O₂ olur."
          ],
          "optionReasons": [
            "2,5’i 3’e yuvarlamak da verilen oranı değiştirir.",
            "Bu aynı oranı taşır ama 2 ile sadeleşir; en küçük değildir.",
            "5: 12: 2 kesirsiz ve en küçük atom oranıdır.",
            "Yalnız C ve O’yu büyütmek H oranını bozar.",
            "2,5’i 2’ye yuvarlamak verilen oranı değiştirir."
          ],
          "commonError": "Yalnız kesirli görünen sütuna işlem yapma.",
          "check": "5/2: 12/2: 2/2=2,5: 6: 1 geri kontrolüdür."
        }
      },
      {
        "prompt": "Basit formülü CH₂, mol kütlesi 70 g/mol olan saf bileşiğin molekül formülü nedir? C12, H1 g/mol.",
        "options": [
          "C₁₀H₂₀",
          "C₅H₁₂",
          "C₅H₁₀",
          "C₂H₄",
          "CH₂"
        ],
        "answer": 2,
        "hint": "70’i basit formül kütlesine böl.",
        "explanation": "C₅H₁₀ atom oranını ve 70 g/mol değerini birlikte sağlar. 5×12+10=70 g/mol.",
        "guidance": {
          "knowledge": [
            "Molekül formülünün basit formül birimi katı pozitif tam sayıdır."
          ],
          "strategy": "70’i basit formül kütlesine böl.",
          "steps": [
            "M_basit=12+2=14 g/mol.",
            "70/14=5.",
            "C ve H alt indislerini 5 ile çarp: C₅H₁₀."
          ],
          "optionReasons": [
            "C₁₀H₂₀, 140 g/mol verir; çarpan iki kat fazla.",
            "C₅H₁₂, 72 g/mol verir ve H: C oranını da değiştirir.",
            "C₅H₁₀ atom oranını ve 70 g/mol değerini birlikte sağlar.",
            "C₂H₄, 28 g/mol verir; 70 değil.",
            "CH₂ yalnız 14 g/mol birimidir."
          ],
          "commonError": "Molekül formülüne alkanın H kuralını varsayımla ekleme; bağ türü verilmedi.",
          "check": "5×12+10=70 g/mol."
        }
      },
      {
        "prompt": "Kesin verilen basit formül CH₂O, mol kütlesi 45 g/mol ve saf tek molekül türü bilgileri için hangisi doğrudur? C12, H1, O16 g/mol.",
        "options": [
          "n kesin 2’ye yuvarlanır.",
          "O atomu hesap dışı bırakılırsa veri mutlaka düzelir.",
          "n=1,5 bir molekül alt indisi olarak doğrudan kullanılır.",
          "Molekül formülü kesin C₆H₁₂O₆’dır.",
          "Veriler birbiriyle uyuşmaz; tam sayı çarpan çıkmaz."
        ],
        "answer": 4,
        "hint": "45/30 oranını hesapla; kesin veriyle keyfî yuvarlama yapma.",
        "explanation": "İki kesin bilgi aynı saf molekül formülünü vermez. Uyumsuzluk, hangi ölçümün veya varsayımın bozuk olduğunu ayrıca araştırmayı gerektirir.",
        "guidance": {
          "knowledge": [
            "Bir molekül atom sayısı tam sayıdır ve molekül formülü basit formülün tam sayı katıdır."
          ],
          "strategy": "45/30 oranını hesapla; kesin veriyle keyfî yuvarlama yapma.",
          "steps": [
            "Basit kütle 30 g/mol.",
            "45/30=1,5.",
            "Pozitif tam sayı koşulu bozulur; hangi ölçünün yanlış olduğunu ise tek başına seçemeyiz."
          ],
          "optionReasons": [
            "Kesin 1,5’i 2’ye yuvarlamak 45’i 60 g/mol yapar.",
            "Bir elementin varlığını verilen formülden silmek veriyi değiştirmektir.",
            "Kesirli atom alt indisleri molekül formülü olarak yazılamaz.",
            "Glikozun 180 g/mol değeri 45’le uyuşmaz.",
            "İki kesin bilgi aynı saf molekül formülünü vermez."
          ],
          "commonError": "Uyumsuzluğu bir cevap çıkana kadar sayıları değiştirerek gizleme.",
          "check": "Uyumsuzluk, hangi ölçümün veya varsayımın bozuk olduğunu ayrıca araştırmayı gerektirir."
        }
      },
      {
        "prompt": "Yalnız C, H içeren saf örneğin tam yanmasında 13,2 g CO₂ ve 7,2 g H₂O oluşuyor. Basit formül nedir? C12, H1, O16 g/mol.",
        "options": [
          "C₃H₈",
          "CH₂",
          "C₂H₃",
          "C₃H₈O₂",
          "C₃H₄"
        ],
        "answer": 0,
        "hint": "Ürün moleküllerinden atom mol miktarlarını çıkar.",
        "explanation": "3: 8 en küçük tam sayı atom oranıdır. C için 3,6 g + H için 0,8 g = 4,4 g örnek karbon-hidrojen kütlesi eder.",
        "guidance": {
          "knowledge": [
            "Tam yanmada n_C=n_CO₂, n_H=2n_H₂O; yalnız C, H koşulunda O örneğe yazılmaz."
          ],
          "strategy": "Ürün moleküllerinden atom mol miktarlarını çıkar.",
          "steps": [
            "n_C=13,2/44=0,3 mol.",
            "n_H=2×7,2/18=0,8 mol.",
            "0,3: 0,8=3: 8; basit C₃H₈."
          ],
          "optionReasons": [
            "3: 8 en küçük tam sayı atom oranıdır.",
            "0,8/0,3 oranı 2 değil 8/3’tür; CH₂ uygun değildir.",
            "Bu oran verilen C ve H miktarlarıyla uyuşmaz.",
            "Başlangıçta yalnız C, H verilmiştir; ürünlerin O’su örneğe eklenmez.",
            "Su başına iki H yerine bir H sayılmıştır."
          ],
          "commonError": "Su mol sayısını H atom mol sayısı sanma.",
          "check": "C için 3,6 g + H için 0,8 g = 4,4 g örnek karbon-hidrojen kütlesi eder."
        }
      },
      {
        "prompt": "Yalnız C, H, O içeren 6 g saf örnek tamamen yakılıyor; 8,8 g CO₂ ve 3,6 g H₂O oluşuyor. Başlangıç örneğindeki O kütlesi kaç gramdır? C12, H1, O16 g/mol.",
        "options": [
          "1,6",
          "6,4",
          "3,2",
          "0",
          "5,6"
        ],
        "answer": 2,
        "hint": "Önce C ve H’ye ait ürün kütle paylarını ayır.",
        "explanation": "O kütlesi 3,2 g olur. 2,4+0,4+3,2=6 g toplamı korunur.",
        "guidance": {
          "knowledge": [
            "Örnekteki O, kendi saf kütlesinden ürünlerle bulunan C ve H kütleleri çıkarılarak bulunur."
          ],
          "strategy": "Önce C ve H’ye ait ürün kütle paylarını ayır.",
          "steps": [
            "m_C=8,8×12/44=2,4 g.",
            "m_H=3,6×2/18=0,4 g.",
            "m_O=6−2,4−0,4=3,2 g."
          ],
          "optionReasons": [
            "1,6 g bu örneğin kütle farkını sağlamaz.",
            "6,4 g ürün O’sunu başlangıca atayan türden hatalı bir sayımdır ve örnek kütlesini aşar.",
            "O kütlesi 3,2 g olur.",
            "Verilen C ve H toplamı 2,8 g; 6 g örnekte kalanı 0 değildir.",
            "5,6 g yalnız H’yi çıkarmakla bulunur; C de çıkarılmalıdır."
          ],
          "commonError": "Yakma O₂’sinin ürünlere kattığı oksijeni başlangıçtaki organik maddeye yazma.",
          "check": "2,4+0,4+3,2=6 g toplamı korunur."
        }
      },
      {
        "prompt": "Saf C, H içeren bir bileşiğin tam yanmasında 1,20 mol H₂O oluşuyor. Örnekte kaç mol H atomu vardı?",
        "options": [
          "3,60",
          "0,60",
          "18,00",
          "1,20",
          "2,40"
        ],
        "answer": 4,
        "hint": "Su mol miktarını 2 ile çarp.",
        "explanation": "H atom miktarı 2,40 mol olur. Atom dengesiyle her ürün H₂O için iki H yaz.",
        "guidance": {
          "knowledge": [
            "Her su molekülü iki H atomu taşır; atom ve molekül molü farklı sayımlardır."
          ],
          "strategy": "Su mol miktarını 2 ile çarp.",
          "steps": [
            "1 mol H₂O’da 2 mol H atomu vardır.",
            "1,20×2=2,40.",
            "Örnekte H atomları tam yanmada suya geçtiği için miktar 2,40 mol."
          ],
          "optionReasons": [
            "3,60 sudaki toplam atom sayısını H atomlarına atar.",
            "0,60 ters yönde ikiye bölme hatasıdır.",
            "18 suyun yaklaşık mol kütlesidir; istenen madde miktarı değildir.",
            "1,20 su molekülü molüdür; H atomu molü değildir.",
            "H atom miktarı 2,40 mol olur."
          ],
          "commonError": "H atomu molünü H₂ gazı veya H₂O molekülü molüyle karıştırma.",
          "check": "Atom dengesiyle her ürün H₂O için iki H yaz."
        }
      },
      {
        "prompt": "İdeal gazın 11 g’ı bu soruda 0 °C ve 1 atm’de 5,6 L hacimdedir; Vm=22,4 L/mol kabul ediliyor. Mol kütlesi kaç g/mol?",
        "options": [
          "224",
          "11",
          "56",
          "44",
          "22"
        ],
        "answer": 3,
        "hint": "Önce 5,6 L’nin kaç mol olduğunu bul.",
        "explanation": "Mol kütlesi 44 g/mol’dür. 0,25 mol×44 g/mol=11 g geri kontrolüdür.",
        "guidance": {
          "knowledge": [
            "n=V/Vm ve M=m/n; verilen molar hacim yalnız belirtilen koşul için kullanılır."
          ],
          "strategy": "Önce 5,6 L’nin kaç mol olduğunu bul.",
          "steps": [
            "n=5,6/22,4=0,25 mol.",
            "M=11/0,25.",
            "Sonuç 44 g/mol."
          ],
          "optionReasons": [
            "224 molar hacmin on katıdır; birimleri de mol kütlesi değildir.",
            "11 örnek kütlesidir; örnek 1 mol değil.",
            "56 sayısı hacmin on katıdır; M hesabı değildir.",
            "Mol kütlesi 44 g/mol’dür.",
            "22 verilen hacimden doğru mol miktarını kullanmaz."
          ],
          "commonError": "Hacmi doğrudan mol miktarı olarak kullanma.",
          "check": "0,25 mol×44 g/mol=11 g geri kontrolüdür."
        }
      },
      {
        "prompt": "Basit formülü C₂H₄O olan saf molekülün mol kütlesi 132 g/mol. Molekül formülü nedir? C12, H1, O16 g/mol.",
        "options": [
          "C₂H₄O",
          "C₂H₁₂O₃",
          "C₆H₄O",
          "C₆H₁₂O₃",
          "C₄H₈O₂"
        ],
        "answer": 3,
        "hint": "Basit kütle 44 g/mol’den çarpanı bul.",
        "explanation": "C₆H₁₂O₃ hem oranı hem 132 g/mol değerini korur. 72+12+48=132 g/mol.",
        "guidance": {
          "knowledge": [
            "Molekül formülü bütün alt indislerin aynı tam sayı katıdır."
          ],
          "strategy": "Basit kütle 44 g/mol’den çarpanı bul.",
          "steps": [
            "24+4+16=44 g/mol.",
            "132/44=3.",
            "2,4,1 alt indisleri 3 ile çarpılır: 6,12,3."
          ],
          "optionReasons": [
            "Bu bir kat değil başlangıç birimidir; 44 g/mol olur.",
            "C alt indisi de diğerleriyle aynı 3 katına çıkmalıdır.",
            "Yalnız C büyütülmüş, H ve O oranı korunmamıştır.",
            "C₆H₁₂O₃ hem oranı hem 132 g/mol değerini korur.",
            "İki kat 88 g/mol verir; üç kat gerekir."
          ],
          "commonError": "Yalnız tek elementin sayısını çarpma.",
          "check": "72+12+48=132 g/mol."
        }
      },
      {
        "prompt": "C₂H₆ molekülündeki karbonun kütlece yüzdesi kaçtır? C12, H1 g/mol.",
        "options": [
          "40",
          "25",
          "20",
          "80",
          "60"
        ],
        "answer": 3,
        "hint": "Karbonun 24 g katkısını toplam 30 g’a böl.",
        "explanation": "Karbon kütlece yüzde 80’dir. H yüzde 20; iki yüzde toplam 100 olur.",
        "guidance": {
          "knowledge": [
            "Element yüzdesi, elementin bir mol bileşikteki kütlesinin toplam mol kütlesine oranının 100 katıdır."
          ],
          "strategy": "Karbonun 24 g katkısını toplam 30 g’a böl.",
          "steps": [
            "M(C₂H₆)=24+6=30 g/mol.",
            "C payı 24/30=0,8.",
            "Yüzde 80."
          ],
          "optionReasons": [
            "40 iki C atomunun kütle katkısını eksik sayan bir sonuçtur.",
            "25 atom sayısına veya yanlış toplam paydasına dayalıdır.",
            "20 hidrojenin kütlece yüzdesidir.",
            "Karbon kütlece yüzde 80’dir.",
            "60 toplam mol kütlesiyle karbon payını doğru oranlamaz."
          ],
          "commonError": "Atom yüzdesi ile kütle yüzdesini aynı sayma.",
          "check": "H yüzde 20; iki yüzde toplam 100 olur."
        }
      },
      {
        "prompt": "Yalnız C, H içeren saf bileşik kütlece yüzde 80 C ve yüzde 20 H taşıyor. Basit formülü nedir? C12, H1 g/mol.",
        "options": [
          "CH₄",
          "CH₂",
          "C₂H₆",
          "C₄H₁₀",
          "CH₃"
        ],
        "answer": 4,
        "hint": "80/12 ve 20/1 miktarlarını en küçükle oranla.",
        "explanation": "Basit oran CH₃’tür; molekül formülü için ayrıca mol kütlesi gerekir. CH₃ birim kütlesinde 12/15=0,80 karbon bulunur.",
        "guidance": {
          "knowledge": [
            "100 g hesap ölçeğinde kütleleri atom mol kütlelerine bölmek atom oranını verir."
          ],
          "strategy": "80/12 ve 20/1 miktarlarını en küçükle oranla.",
          "steps": [
            "100 g’da C molü 20/3, H molü 20.",
            "Oran 1: 3.",
            "En küçük formül CH₃."
          ],
          "optionReasons": [
            "1: 4 atom oranı karbon yüzdesini 75 yapar, 80 değil.",
            "1: 2 atom oranı bu yüzde bileşimi vermez.",
            "Bu aynı oranı taşır ama 2 ile sadeleşir; en küçük formül değildir.",
            "4: 10 atom oranı 2: 5’tir; 1: 3 değildir.",
            "Basit oran CH₃’tür; molekül formülü için ayrıca mol kütlesi gerekir."
          ],
          "commonError": "Molekülde tek sayıda H görünmesini basit oran için yasak sayma; tam molekül bir kat olabilir.",
          "check": "CH₃ birim kütlesinde 12/15=0,80 karbon bulunur."
        }
      },
      {
        "prompt": "Katı NaCl için Na: Cl=1: 1 gösterimini hangi ifade doğru adlandırır?",
        "options": [
          "NaCl’nin organik olduğunun kanıtı.",
          "İyonik kristalin formül birimi oranı.",
          "Bağımsız NaCl moleküllerinden oluştuğunun kanıtı.",
          "Na ve Cl atom kütlelerinin eşit olduğunun kanıtı.",
          "Her kristalde yalnız bir Na⁺ ve bir Cl⁻ bulunduğu anlamı."
        ],
        "answer": 1,
        "hint": "Oran gösterimini kristalin bütün boyutuyla karıştırma.",
        "explanation": "NaCl’de 1: 1 gösterimi formül biriminin iyon oranını anlatır. İyon sayıları farklı ölçekte büyüse de 1: 1 oranı korunabilir.",
        "guidance": {
          "knowledge": [
            "İyonik ağ katılarda en küçük iyon oranı formül birimiyle gösterilir; bağımsız küçük molekül zorunlu değildir."
          ],
          "strategy": "Oran gösterimini kristalin bütün boyutuyla karıştırma.",
          "steps": [
            "NaCl bir iyonik ağ örneğidir.",
            "1: 1 yük dengeli en küçük iyon oranıdır.",
            "Bu gösterim formül birimi oranı olarak yorumlanır."
          ],
          "optionReasons": [
            "NaCl karbon içermez ve anorganiktir.",
            "NaCl’de 1: 1 gösterimi formül biriminin iyon oranını anlatır.",
            "Oran gösterimi bağımsız molekül kanıtı değildir.",
            "Sayı oranı kütlelerin eşitliğini gerektirmez.",
            "Makroskobik kristal çok sayıda iyon içerir; birim oranı toplam adet değildir."
          ],
          "commonError": "Oran birimini bütün örneğin parçacık sayısıyla aynı sanma.",
          "check": "İyon sayıları farklı ölçekte büyüse de 1: 1 oranı korunabilir."
        }
      },
      {
        "prompt": "Etanol ve dimetil eterin molekül formülü C₂H₆O’dur. Yalnız bu molekül formülünün öğrenilmesi hangi bilgiyi tek başına belirlemez?",
        "options": [
          "Atomların hangi sırayla bağlandığını.",
          "Molar atom kütleleri verilirse mol kütlesini.",
          "Bir molekülde 1 O bulunduğunu.",
          "Bir molekülde 2 C bulunduğunu.",
          "Bir molekülde 6 H bulunduğunu."
        ],
        "answer": 0,
        "hint": "Alt indis bilgisiyle bağlantı bilgisini ayır.",
        "explanation": "Bağlantı sırası molekül formülünün tek başına belirlemediği bilgidir. CH₃CH₂OH ve CH₃OCH₃ aynı atom sayısını, farklı bağlantıyı gösterir.",
        "guidance": {
          "knowledge": [
            "Molekül formülü gerçek atom sayılarını verir; bağlanma düzeni için yapı bilgisi gerekir."
          ],
          "strategy": "Alt indis bilgisiyle bağlantı bilgisini ayır.",
          "steps": [
            "C₂H₆O atom sayılarını sabitler.",
            "Farklı bağlanmalar aynı sayıları taşıyabilir.",
            "Hangi yapı olduğu formülden tek başına seçilemez."
          ],
          "optionReasons": [
            "Bağlantı sırası molekül formülünün tek başına belirlemediği bilgidir.",
            "Atom mol kütleleriyle 24+6+16=46 g/mol hesaplanabilir.",
            "O’nun görünmeyen 1 alt indisi atom sayısını gösterir.",
            "C alt indisi 2 atom sayısını doğrudan gösterir.",
            "H alt indisi 6 atom sayısını doğrudan gösterir."
          ],
          "commonError": "Aynı molekül formülünü aynı madde kimliği sanma.",
          "check": "CH₃CH₂OH ve CH₃OCH₃ aynı atom sayısını, farklı bağlantıyı gösterir."
        }
      },
      {
        "prompt": "C₂H₈O₂ adayı olağan nötr, kapalı kabuklu ve bağlantılı C, H, O molekülü koşulunda sınanıyor. Hangisi doğrudur?",
        "options": [
          "Bu formül bütün olası iyon/radikal türlerinde de aynı gerekçeyle kesin yasaktır.",
          "O atomları H üst sınırını her biri 2 artırdığı için aday kesin uygundur.",
          "İki O atomu zorunlu O₂ gazı olarak ayrıdır.",
          "H8 sayısı 2C+2=6 üst sınırını aşar; aday bu koşula uymaz.",
          "Mol oranı tam sayıysa değerlik denetimine gerek yoktur."
        ],
        "answer": 3,
        "hint": "Gerekli üst sınırı verilen C sayısıyla karşılaştır.",
        "explanation": "Aday, verilen olağan molekül modelinin H üst sınırına uymaz. Uygun çıkan bir aday bile gerçek kararlı madde veya tek yapı kanıtı sayılmaz.",
        "guidance": {
          "knowledge": [
            "Normal C4, H1, O2 değerliğiyle bağlantılı nötr kapalı kabuklu C, H, O molekülünde H≤2C+2 gerekli koşuldur."
          ],
          "strategy": "Gerekli üst sınırı verilen C sayısıyla karşılaştır.",
          "steps": [
            "C=2 için en büyük H6.",
            "Aday H8 taşıyor.",
            "Gerekli koşul bozulur; sonuç yalnız belirtilen model sınıfı içindir."
          ],
          "optionReasons": [
            "İyon/radikal gibi başka model sınıflarına bu gerekli koşul koşulsuz taşınmaz.",
            "İki değerlikli O, karbonlu bağlantıda bu üst H sınırını yükseltmez.",
            "Formül bir moleküldeki atomları aday gösterir; O₂ olarak ayrılma bilgisi yoktur.",
            "Aday, verilen olağan molekül modelinin H üst sınırına uymaz.",
            "Tam sayı oranı kimyasal mümkünlük için tek başına yeterli değildir."
          ],
          "commonError": "Gerekli bir kimyasal kontrolü ya tamamen atlama ya da kendi kapsamından dışarı yayma.",
          "check": "Uygun çıkan bir aday bile gerçek kararlı madde veya tek yapı kanıtı sayılmaz."
        }
      }
    ],
    "source": "MEBİ AYT Kimya PDF104; OGM12 Kimya 010–012 tam paftaları; Dersler Cepte 12 Kimya 4. sayısının 14–15 ve 19. sayfaları karşılaştırılarak hazırlanmış özgün öğretim ve sorular. Kütle-mol ayrımı, tam yanma koşulu, oran belirsizliği ve formül adayının değerlik denetimi açık öğretilir; kimyasal olarak uyumsuz kaynak cevabı yeniden soru yapılmaz."
  },
  {
    "id": "hibritlesme",
    "topic": "detail-447",
    "title": "Hibritleşme",
    "minutes": 75,
    "objectives": [
      "Aynı atomdaki hibritleşme ile atomlar arası orbital örtüşmesini ayır",
      "Yerel elektron bölgesinden sp, sp² ve sp³ modelini kur",
      "Bütün açık yapıdaki σ/π bağlarını ve atom başına saf p sayısını denetle"
    ],
    "sections": [
      {
        "title": "Şekli açıklamak için orbital diline geç",
        "paragraphs": [
          "Lewis yapısı hangi atomların bağlandığını ve elektron çiftlerini gösterir; uzaydaki eşdeğer bağ yönlerini tek başına çizmez. CH₄’te dört C–H bağının eşdeğer yönlerde düzenlenmesini açıklamak için değerlik bağ kuramında hibrit orbital modeli kullanılır. Hibritleşme, molekülün geometrisine ilişkin bir bağlanma modelidir.",
          "Öğrenme yolu şöyledir: geçerli Lewis yapısını kur, incelenen atomun σ bağlarını ve ortaklanmamış çiftlerini say, yerel elektron bölgesini bul, sonra uygun hibrit ve π yapısını düşün. Bir moleküldeki bütün atomların aynı hibritleşmeye sahip olması gerekmez."
        ]
      },
      {
        "title": "Karışan orbitaller aynı atoma aittir",
        "paragraphs": [
          "Hibritleşme, aynı atomun uygun enerjili atom orbitallerinin matematiksel olarak birleştirilerek yeni yönelimli orbital fonksiyonlarıyla ifade edilmesidir. Bir s ve üç p orbitalinden dört sp³; bir s ve iki p’den üç sp²; bir s ve bir p’den iki sp hibrit orbitali elde edilir. Giren ve çıkan orbital sayısı eşittir.",
          "Farklı iki atomun orbitallerinin uzayda örtüşmesi bağ oluşumunu açıklar; bu, aynı atomdaki hibritleşmeyle aynı işlem değildir. Hibrit orbitalin başka atomun s veya p orbitaliyle örtüşebilmesi mümkündür. H atomunun yalnız 1s değerlik orbitali bu kapsamda hibritleşmiş sayılmaz."
        ]
      },
      {
        "title": "Elektron kutuları bir anlatım modelidir",
        "paragraphs": [
          "Yalıtılmış temel hâl karbonu 1s² 2s² 2p² biçiminde yazılır. Derslerde dört eş bağın açıklanması için değerlik elektronlarının yeniden düzenlenmesi ve hibrit orbitallere dağılımı birlikte çizilebilir. Bu çizim, moleküldeki bağlanmış elektron yapısını anlamaya yarar.",
          "Kutucukları, serbest atomun önce enerji harcayıp sonra gözle izlenen sırayla dört bağ kurduğu evrensel bir film gibi okuma. Molekülün toplam enerji kazancı ve bağlanmış durumu birlikte değerlendirilir. Bu ünitede kutuların yön ve elektron sayımı bilgisi kullanılacak; tek başına ölçülmüş bir oluşma kronolojisi iddia edilmeyecek."
        ]
      },
      {
        "title": "Sigma bağı eksen boyunca örtüşür",
        "paragraphs": [
          "İki çekirdeği birleştiren eksen etrafında dönel simetri gösteren baş başa örtüşme, σ bağı modelidir. s–s, s–p, p–p veya uygun hibrit orbitaller arasında σ bağı kurulabilir. Olağan açık yapılarda iki komşu atom arasındaki tek bağ bir σ bağıdır. H₂’de iki H’nin 1s orbitalleri s–s; HF’de H’nin 1s ve F’nin uygun p orbitali s–p; F₂’de iki F’nin uygun p orbitalleri p–p eksenel örtüşmesiyle σ bağını örnekler.",
          "Çift bağın bir σ ve bir π, üçlü bağın bir σ ve iki π bileşeni vardır. “İlk bağ σ” sözü bağın bileşimini saymanın yoludur; her tepkimede hangi bağın önce zaman içinde oluştuğunu söylemez. Bir atom çiftini σ hesabında yalnız bir kez say."
        ]
      },
      {
        "title": "Pi bağı yan yana p örtüşmesidir",
        "paragraphs": [
          "π bağı, uygun yöndeki hibritleşmemiş p orbitallerinin yanal örtüşmesiyle açıklanır. Elektron yoğunluğu bağ ekseninin iki yanında bulunur; eksenden geçen bir düğüm düzlemi vardır. Karbonun sp² modelinde bir, sp modelinde iki saf p orbitali π bağları için kalır.",
          "İki π bağı bulunan üçlü bağda ilgili p yönleri birbirine diktir. π bağına ait lobları ayrı atom ya da ayrı σ bağı gibi sayma. Çoklu bağlarda dönmenin kısıtlanması, yanal örtüşmenin yönüne bağlıdır; tek σ bağındaki dönme ise birçok açık zincir için konformasyonlar oluşturabilir."
        ]
      },
      {
        "title": "Elektron bölgesini saymak",
        "paragraphs": [
          "İncelenen olağan ikinci periyot atomunda her σ komşuluğu bir elektron bölgesi, her ortaklanmamış çift de bir bölge sayılır. Çift veya üçlü bağ, çekirdek yönü bakımından tek bölgedir. Bölge sayısını bulurken π bağını ayrıca yeni komşu bölgesi olarak ekleme.",
          "Bu yerel öğretim modelinde iki bölge sp, üç bölge sp², dört bölge sp³ ile ilişkilendirilir. Yük, rezonans ve ileri bağlanma durumlarında ayrıntı gerekir; bu gezgin verilen sıradan, açıkça tanımlanmış yapılara uygulanır. Sırf toplam molekül formülünden her atomun hibritleşmesi çıkarılamaz."
        ]
      },
      {
        "title": "sp³: dört hibrit yönü",
        "paragraphs": [
          "Bir s ile üç p’nin birleşimi dört eşdeğer sp³ hibrit orbitali verir. Ortaklanmamış çift olmayan ideal AX₄ yerleşiminde yönler düzgün dört yüzlüdür ve yaklaşık 109,47° açı yapar. Karbonun metandaki dört σ bağı bu modelin temel örneğidir.",
          "sp³ sözcüğü bütün molekülün tek bir dört yüzlü nesne olduğu anlamına gelmez. Etanda her C çevresi ayrı yerel merkezdir. NH₃ ve H₂O’da da dört elektron bölgesi bulunur; ortaklanmamış çiftler nedeniyle molekül şekli ve bağ açıları metandan farklıdır."
        ]
      },
      {
        "title": "sp²: üç düzlemsel yön ve bir p",
        "paragraphs": [
          "Bir s ile iki p’den üç sp² hibrit orbitali oluşur; bir saf p orbitali kalır. İdeal üç bölge aynı düzlemde yaklaşık 120° aralıklı yönlenir. Kalan p orbitali bu düzleme diktir ve komşu uygun p orbitaliyle π örtüşmesine katılabilir.",
          "Etende her C, iki H ve diğer C’ye toplam üç σ bağı yapar; C=C’deki π bağı ayrıca bulunur. Böylece her C’nin komşu atom sayısı üç, bağ mertebeleri toplamı dörttür. Üç σ bağına bir π ekleyip bölge sayısını dört yapma."
        ]
      },
      {
        "title": "sp: iki karşıt yön ve iki p",
        "paragraphs": [
          "Bir s ile bir p’den iki sp hibrit orbitali oluşur; iki saf p kalır. İdeal iki elektron bölgesi birbirine 180° yönlenir. Etinde her C’nin bir H ve bir C σ komşuluğu vardır; C≡C’nin iki π bağı kalan p yönleriyle açıklanır.",
          "HCN’de C çevresinde H–C ve C–N yönleri iki bölgedir. N çevresinde C’ye σ bağı ve bir ortaklanmamış çift yine iki bölge verir. Yalnız C atomlarının hibritleşebileceği gibi bir sınır koyma; uygun model diğer ikinci periyot atomlarına da uygulanır."
        ]
      },
      {
        "title": "s karakterini nicel karşılaştır",
        "paragraphs": [
          "sp³ hibritinde s katkısı 1/4, sp²’de 1/3, sp’de 1/2’dir; sıralama sp > sp² > sp³ olur. Bunlar orbital modelindeki karışım oranlarıdır; atomun toplam elektronlarının aynı yüzdelerinin s’de bulunduğunu söylemez.",
          "Aynı atom türü ve karşılaştırılabilir bağlar için s karakteri arttıkça elektron yoğunluğunun çekirdeğe daha yakın olması bağ özellikleriyle ilişkilendirilebilir. Fakat farklı atomlar, yükler ve ortamlar arasında yalnız bu oranla bütün bağ enerjilerini sıralamak doğru değildir. Önce karşılaştırmanın hangi bağa ait olduğunu belirt."
        ]
      },
      {
        "title": "Bütün molekülde sigma ve pi sayımı",
        "paragraphs": [
          "Açık yapıda atomlar arasındaki her bağlantı çizgisini tek komşuluk olarak say: bu toplam σ sayısını verir; çift bağ başına bir, üçlü bağ başına iki π eklenir. C–H ve O–H bağları da σ hesabına dahildir. Yalnız karbon iskeletini saymak toplamı eksik bırakır.",
          "Örneğin C₂H₄’te dört C–H ve bir C–C σ vardır: toplam 5 σ, 1 π. C₂H₂’de iki C–H ile bir C–C σ vardır: toplam 3 σ, 2 π. Yerel bir C’nin σ sayısıyla bütün molekülün toplamını birbirinin yerine kullanma."
        ]
      },
      {
        "title": "Allende merkez ve uçlar farklıdır",
        "paragraphs": [
          "H₂C=C=CH₂ açık yapısında ortadaki C, iki farklı C’ye σ bağı yapar ve iki π bileşeni taşır: yerel model sp’dir. Uç C’lerin her birinde iki H ve bir C σ komşuluğu bulunur; bu merkezler sp²’dir.",
          "Merkez C’nin iki saf p yönü dik olduğundan uçlardaki CH₂ düzlemleri birbirine diktir. Etendeki bütün atomlar aynı düzlemde örneğini bütün çift bağlı yapılara taşıma. Gezginin döndürme kontrolü bu iki uç düzlemini gerçekten farklı yönlerde gösterir."
        ]
      },
      {
        "title": "Oksijenin çevresini ayrı oku",
        "paragraphs": [
          "H₂C=O’da karbonun üç σ komşuluğu ve bir π bağı vardır; C için sp² modeli uygundur. O’da C’ye bir σ komşuluğu ve iki ortaklanmamış çift üç elektron bölgesi verir; O da bu yerel modelde sp² olarak anlatılır.",
          "CH₃OH’da C’nin dört σ komşuluğu, O’nun iki σ bağı ve iki ortaklanmamış çifti bulunur; ikisi de dört bölgeli sp³ modeline uyar. Formülde O bulunmasını tek başına aynı hibritleşmenin kanıtı yapma; açık bağlanmayı ve çiftleri incele."
        ]
      },
      {
        "title": "Hibrit sayısı elektron çifti sayısı değildir",
        "paragraphs": [
          "sp² sonucu üç hibrit orbital oluştuğunu söyler. Bu orbitaller bağa veya ortaklanmamış çifte katkı verebilir; her birini “üç bağ kesin vardır” diye okuyamazsın. H₂C=O’daki O’nun üç hibrit bölgesinden ikisi ortaklanmamış çiftle ilişkilidir.",
          "Aynı biçimde sp³ için dört hibrit orbital olması, NH₃’te dört farklı atom komşusu olduğu anlamına gelmez. Orbital, elektron çifti, bağ mertebesi ve komşu sayısı farklı sayımlardır. Çözüm tablosunda her niceliği ayrı sütuna yazmak bu karışıklığı önler."
        ]
      },
      {
        "title": "Çoklu bağın gücü ve uzunluğu",
        "paragraphs": [
          "Aynı iki atom arasındaki karşılaştırılabilir tek, çift ve üçlü bağlar için toplam bağ mertebesi arttıkça bağın genellikle kısalması ve toplam koparma enerjisinin artması beklenir. Çift bağın toplamı tek bağdan farklıdır; onu iki bağımsız tek bağın toplamı gibi düşünme.",
          "π bileşeninin ayrı kopma eğilimiyle bütün çift bağın toplam kuvvetini karıştırma. “Bütün tepkimelerde önce π kopar” veya “π ayrı olarak her σ’dan güçlüdür” gibi sınırsız hükümler kurulmaz. Hangi tepkime ve hangi karşılaştırılabilir bağların verildiğine bak."
        ]
      },
      {
        "title": "Şekil, dönme ve izomerlik",
        "paragraphs": [
          "Tek σ bağı çevresindeki dönme, açık zincirlerde farklı konformasyon çizimlerine yol açabilir; bu çizimler aynı bağlantı iskeletini koruyabilir. Çift bağın π örtüşmesi ise serbest dönmeyi kısıtlar ve uygun gruplar varsa geometrik izomerlik bağlamı doğurur.",
          "Döndürme düğmesi gezginde bütün modeli kameraya göre çevirir; kimyasal bağ etrafında fiziksel dönme veya cis–trans dönüşümü simüle etmez. Bir çizimi ekranda çevirmek hibritleşmeyi ve σ/π sayısını değiştirmez. Bu ayrımı tahminini gerekçelendirirken kullan."
        ]
      },
      {
        "title": "Yerel kontrol tablosu kur",
        "paragraphs": [
          "Bir atom için tabloya σ komşuluğu, ortaklanmamış çift, elektron bölgesi, hibrit türü, saf p ve yerel π sayısını sırayla yaz. CH₄ için 4,0,4, sp³, 0,0; etendeki bir C için 3,0,3, sp², 1,1 elde edilir.",
          "Etindeki bir C için 2,0,2, sp, 2,2 bulunur. HCN’de N satırı ise 1,1,2, sp, 2,2 olur; π bağlarını komşu atomla ortak saydığını unutma. Bütün molekül π toplamını yerel C ve N satırlarını toplayarak iki kez hesaplama."
        ]
      },
      {
        "title": "Gezginde hangi iddia sınanır?",
        "paragraphs": [
          "Molekülü ve incelenen ağır atomu seç; vurgulanan komşuluklar gerçekten açık yapıdan hesaplanır. Görüş açısını değiştirip bir bağın izdüşümde kaybolmasının atomun bağ sayısını değiştirmediğini sınayabilirsin. Allende uç ve merkez seçimi farklı yerel sonuçlar verir.",
          "Koordinatlar bağlanmayı ve yönleri anlatan şemadır; bütün bağ uzunluklarını veya ölçülmüş elektron yoğunluğunu hesaplayan bir kuantum modeli değildir. Sonuçları açık yapı ve bölge sayımıyla karşılaştır. Tahmin–gerekçe kaydı keşfi saklar; soru doğrusu, XP veya konu tamamlama kanıtı oluşturmaz."
        ]
      }
    ],
    "examples": [
      {
        "title": "Etendeki yerel ve toplam sayım",
        "prompt": "H₂C=CH₂ açık yapısında bir C’nin hibritleşmesini ve bütün molekülün σ/π sayılarını bul.",
        "strategy": "Önce tek merkezde bölgeyi, sonra bütün atom bağlantılarını say.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "Bir C’nin iki H ve bir C olmak üzere 3 σ komşuluğu, ortaklanmamış çifti 0’dır; 3 bölge sp² verir."
          },
          {
            "label": "Adım 2",
            "explanation": "Bütün yapıda 4 C–H ve 1 C–C σ vardır: 5 σ."
          },
          {
            "label": "Adım 3",
            "explanation": "C=C’de bir π bileşeni vardır; bir C’de kalan saf p sayısı 1’dir."
          }
        ],
        "answer": "Her C sp²; toplam 5 σ ve 1 π.",
        "check": "C₂H₄’ün dört H’sinin tümü birer σ bağıyla sayıldı.",
        "pitfall": "Yerel 3 σ ile bütün molekülün 5 σ sonucunu karıştırma."
      },
      {
        "title": "Etinin iki pi yönü",
        "prompt": "H–C≡C–H için bir C’nin hibrit ve saf p sayısını, bütün bağ sayılarını bul.",
        "strategy": "Üçlü bağı bir σ ve iki π olarak ayır.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "Bir C’nin iki farklı σ komşusu ve ortaklanmamış çifti 0: iki bölge sp."
          },
          {
            "label": "Adım 2",
            "explanation": "Bir C’de iki saf p kalır; bu iki yön iki π bileşenine katılır."
          },
          {
            "label": "Adım 3",
            "explanation": "Toplam iki C–H ve bir C–C σ: 3 σ; C≡C’den 2 π."
          }
        ],
        "answer": "C başına sp ve 2 saf p; molekülde 3 σ, 2 π.",
        "check": "Toplam bağ mertebesi 1+3+1=5; σ+π=3+2=5 doğrular.",
        "pitfall": "Üçlü bağı üç σ olarak yazma."
      },
      {
        "title": "Allenin iki farklı karbon çevresi",
        "prompt": "H₂C=C=CH₂ için uç ve merkez C’lerin hibritleşmesini, toplam σ/π sayılarını bul.",
        "strategy": "Her C’nin farklı komşularını ayrı satırda incele.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "Uç C’de iki H ve bir C: 3 bölge, sp²; merkez C’de iki C: 2 bölge, sp."
          },
          {
            "label": "Adım 2",
            "explanation": "Dört C–H ile iki C–C bağlantısı toplam 6 σ verir."
          },
          {
            "label": "Adım 3",
            "explanation": "İki çift bağ toplam 2 π verir; uç CH₂ düzlemleri merkezdeki iki dik p yönüyle ilişkilidir."
          }
        ],
        "answer": "Uçlar sp², merkez sp; toplam 6 σ ve 2 π.",
        "check": "C₃H₄’te dört H bağı ve iki iskelet bağlantısı eksiksiz sayıldı.",
        "pitfall": "Bir molekülün bütün C’lerini aynı hibrit kabul etme."
      },
      {
        "title": "HCN’de azotun ortaklanmamış çifti",
        "prompt": "H–C≡N: yapısında N’de bir ortaklanmamış çift vardır. C ve N’nin yerel hibritlerini ve toplam bağları bul.",
        "strategy": "Komşuluk sayısına ortaklanmamış çifti bölge olarak ekle.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "C’de H ve N yönleri 2 bölge verir: sp."
          },
          {
            "label": "Adım 2",
            "explanation": "N’de C’ye σ yönü ve 1 çift toplam 2 bölgedir: sp; N’de iki saf p kalır."
          },
          {
            "label": "Adım 3",
            "explanation": "Bütün molekülde H–C ve C–N olmak üzere 2 σ, üçlü bağdan 2 π bulunur."
          }
        ],
        "answer": "C sp, N sp; toplam 2 σ ve 2 π.",
        "check": "N’nin bir σ bağı olması tek elektron bölgesi olduğu anlamına gelmez.",
        "pitfall": "Azotun çiftini silerek hibrit seçme."
      },
      {
        "title": "Formaldehit ve metanolde oksijen",
        "prompt": "H₂C=O’da O üzerinde iki çift; CH₃–O–H’da O üzerinde yine iki çift vardır. O hibritlerini ve toplam σ/π sayılarını karşılaştır.",
        "strategy": "O’nun σ komşu sayısının değişmesini izle.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "H₂C=O’da O için 1 σ+2 çift=3 bölge: sp²; bütün molekül 3 σ ve 1 π."
          },
          {
            "label": "Adım 2",
            "explanation": "CH₃OH’da O için 2 σ+2 çift=4 bölge: sp³; bütün molekül 5 σ ve 0 π."
          },
          {
            "label": "Adım 3",
            "explanation": "Aynı iki ortaklanmamış çift, değişen komşuluk nedeniyle aynı toplam bölgeyi garanti etmez."
          }
        ],
        "answer": "O sırasıyla sp² ve sp³; bağ toplamları 3 σ+1 π, 5 σ.",
        "check": "Metanolde 3 C–H, 1 C–O, 1 O–H bağı vardır.",
        "pitfall": "Formüldeki O harfini hibritleşmenin tek belirleyicisi yapma."
      },
      {
        "title": "s katkısı ve saf p bütçesi",
        "prompt": "sp, sp² ve sp³ için s katkısını, hibrit orbital ve kalan saf p sayılarını karşılaştır.",
        "strategy": "Başlangıçta bir s ve üç p değerlik orbitalini muhasebeleştir.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "sp: 1 s + 1 p → 2 hibrit, 2 saf p; s katkısı 1/2=%50."
          },
          {
            "label": "Adım 2",
            "explanation": "sp²: 1 s + 2 p → 3 hibrit, 1 saf p; s katkısı 1/3≈%33,3."
          },
          {
            "label": "Adım 3",
            "explanation": "sp³: 1 s + 3 p → 4 hibrit, 0 saf p; s katkısı 1/4=%25."
          }
        ],
        "answer": "s katkısı sp > sp² > sp³; hibrit sayısı 2,3,4 ve saf p 2,1,0.",
        "check": "Her satırda hibrit sayısı +kalan p=4 orbital korunur.",
        "pitfall": "Üstteki ²/³ işaretini elektron veya π sayısı sanma."
      }
    ],
    "recall": [
      {
        "prompt": "Hibritleşme ile örtüşme arasındaki fark?",
        "answer": "Hibritleşme aynı atomun orbital gösterimlerini birleştirir; bağ örtüşmesi farklı atomların orbitalleri arasındadır."
      },
      {
        "prompt": "Çift ve üçlü bağ bir atom çevresinde kaç bölge?",
        "answer": "Her biri bir çekirdek yönü, yani bir elektron bölgesidir; π bileşenlerini yeni yön olarak ekleme."
      },
      {
        "prompt": "İki, üç ve dört elektron bölgesi neye karşılık gelir?",
        "answer": "Verilen olağan ikinci periyot yerel modelinde sırasıyla sp, sp², sp³; ortaklanmamış çiftler bölgeye dahildir."
      },
      {
        "prompt": "Allende bütün karbonlar neden aynı değildir?",
        "answer": "Merkez iki σ komşusuyla sp; iki uç C üçer σ komşusuyla sp²’dir. Toplam 6 σ ve 2 π vardır."
      }
    ],
    "items": [
      {
        "prompt": "Bu ünitedeki değerlik bağ modelinde hibritleşme hangi işlemdir?",
        "options": [
          "Bütün elektronların atomdan uzaklaştırılması.",
          "İki farklı atom çekirdeğinin birleşmesi.",
          "Protonların nötrona dönüşmesi.",
          "Farklı atomların orbitallerinin bağ ekseninde örtüşmesinin tek adı.",
          "Aynı atomun uygun atom orbitallerinin yeni yönelimli orbital gösterimleri olarak birleştirilmesi."
        ],
        "answer": 4,
        "hint": "İşlemin aynı atomda mı farklı atomlarda mı tanımlandığını ayır.",
        "explanation": "Doğru tanım aynı atomun orbitallerinin birleştirilmesidir. sp² için 1 s + 2 p=3 hibrit sayımı tanımı örnekler.",
        "guidance": {
          "knowledge": [
            "Hibritleşme aynı atomdaki orbital modelidir; atomlar arası örtüşme ayrı kavramdır."
          ],
          "strategy": "İşlemin aynı atomda mı farklı atomlarda mı tanımlandığını ayır.",
          "steps": [
            "Hibrit orbitaller bir atom için tanımlanır.",
            "Giren ve çıkan orbital sayısı korunur.",
            "Bu işlem çekirdeği veya element kimliğini değiştirmez."
          ],
          "optionReasons": [
            "Elektronların tümünün kopması iyonlaşmayla ilgilidir; bu model değildir.",
            "Çekirdek birleşmesi kimyasal hibritleşme değildir.",
            "Çekirdek dönüşümü bağ orbital modeli değildir.",
            "Bu örtüşme bağ kurmayı anlatır; aynı atomdaki hibritleşmenin tanımı değildir.",
            "Doğru tanım aynı atomun orbitallerinin birleştirilmesidir."
          ],
          "commonError": "Hibritleşme ve örtüşmeyi tek işlem sanma.",
          "check": "sp² için 1 s + 2 p=3 hibrit sayımı tanımı örnekler."
        }
      },
      {
        "prompt": "H₂C=CH₂ açık yapısında herhangi bir C’nin ortaklanmamış elektron çifti yoktur. Bu C’nin yerel hibritleşmesi nedir?",
        "options": [
          "sp³",
          "sp",
          "Beş hibritli sp⁴",
          "sp²",
          "Hibritleşmiş 1s"
        ],
        "answer": 3,
        "hint": "C’nin farklı σ komşularını say.",
        "explanation": "C’nin üç bölgesi sp² verir. Bir saf p orbitali bir π bağına kalır.",
        "guidance": {
          "knowledge": [
            "Çift bağ bir σ komşuluğu ve bir π bileşeni içerir; bölge sayımında tek yöndür."
          ],
          "strategy": "C’nin farklı σ komşularını say.",
          "steps": [
            "İki H ve bir C, üç σ komşusudur.",
            "Ortaklanmamış çift 0; toplam bölge 3.",
            "Üç bölge sp² modelidir."
          ],
          "optionReasons": [
            "sp³ dört bölge gerektirir; π yeni bölge değildir.",
            "sp iki bölgelidir; etendeki üç komşuyu karşılamaz.",
            "Bu olağan ikinci periyot modeli dört değerlik orbitalinden başlar; sp⁴ kullanılmaz.",
            "C’nin üç bölgesi sp² verir.",
            "1s karbonun üç değerlik yönünü açıklayan hibrit adı değildir."
          ],
          "commonError": "Çift bağı iki farklı çekirdek yönü sayma.",
          "check": "Bir saf p orbitali bir π bağına kalır."
        }
      },
      {
        "prompt": "H–C≡C–H molekülünde bütün σ ve π bağlarının sayıları sırasıyla nedir?",
        "options": [
          "3 ve 2",
          "2 ve 3",
          "5 ve 0",
          "1 ve 2",
          "3 ve 1"
        ],
        "answer": 0,
        "hint": "C–H bağlarını da hesaba kat.",
        "explanation": "Toplam 3 σ ve 2 π vardır. 3+2=5 toplam bağ mertebesiyle uyumludur.",
        "guidance": {
          "knowledge": [
            "Bağ yapan her atom çifti bir σ; üçlü bağ ayrıca iki π içerir."
          ],
          "strategy": "C–H bağlarını da hesaba kat.",
          "steps": [
            "İki C–H tek bağı 2 σ verir.",
            "C≡C bir σ ve iki π verir.",
            "Toplam 3 σ, 2 π bulunur."
          ],
          "optionReasons": [
            "Toplam 3 σ ve 2 π vardır.",
            "Üçlü bağın π sayısı 2’dir; değerler ters aktarılmıştır.",
            "Bağ mertebeleri toplamı 5 olsa da hepsi σ değildir.",
            "İki C–H σ bağı eksik bırakılmıştır.",
            "Üçlü bağdaki ikinci π unutulmuştur."
          ],
          "commonError": "Yalnız karbon iskeletindeki bağları sayma.",
          "check": "3+2=5 toplam bağ mertebesiyle uyumludur."
        }
      },
      {
        "prompt": "sp hibritleşmesinde bir s ve bir p kullanılır. Oluşan hibrit orbital ve kalan saf p orbital sayıları sırasıyla nedir?",
        "options": [
          "3 ve 1",
          "2 ve 0",
          "2 ve 2",
          "4 ve 0",
          "1 ve 3"
        ],
        "answer": 2,
        "hint": "Giren iki orbitalin iki hibrit verdiğini kullan.",
        "explanation": "İki hibrit ve iki saf p kalır. 2 hibrit +2 saf p=4 değerlik orbitali.",
        "guidance": {
          "knowledge": [
            "İkinci periyot değerlik katmanında bir s ve üç p vardır."
          ],
          "strategy": "Giren iki orbitalin iki hibrit verdiğini kullan.",
          "steps": [
            "1 s + 1 p toplam 2 orbitaldir.",
            "Dolayısıyla 2 sp hibrit oluşur.",
            "Üç p’den biri kullanıldığı için 2 saf p kalır."
          ],
          "optionReasons": [
            "3 ve 1, sp² satırıdır.",
            "Kullanılmayan iki p kaybolmaz.",
            "İki hibrit ve iki saf p kalır.",
            "4 ve 0, sp³ satırıdır.",
            "İki girdi tek hibrite indirgenmez."
          ],
          "commonError": "Orbital sayısının korunmasını atlama.",
          "check": "2 hibrit +2 saf p=4 değerlik orbitali."
        }
      },
      {
        "prompt": "H₂C=C=CH₂ yapısında uç C’ler ve merkez C’nin yerel hibritleri sırasıyla hangisidir?",
        "options": [
          "Uçlar sp³, merkez sp².",
          "Hepsi sp³.",
          "Uçlar sp², merkez sp.",
          "Uçlar sp, merkez sp³.",
          "Hepsi sp²."
        ],
        "answer": 2,
        "hint": "Uç ve merkez atomlarını ayrı incele.",
        "explanation": "Farklı σ komşulukları farklı yerel hibrit verir. Toplam 6 σ ve 2 π hesabıyla yapı korunur.",
        "guidance": {
          "knowledge": [
            "Her merkez için σ komşuları ayrı sayılır; çift bağ tek bölgedir."
          ],
          "strategy": "Uç ve merkez atomlarını ayrı incele.",
          "steps": [
            "Uç C’nin iki H ve bir C komşusu vardır: 3 bölge.",
            "Merkez C iki C’ye bağlıdır: 2 bölge.",
            "Sonuç uç sp², merkez sp’dir."
          ],
          "optionReasons": [
            "Uçlarda dört değil üç bölge; merkezde üç değil iki bölge vardır.",
            "π bağlarını yeni bölge sayarak hepsini dört yapamazsın.",
            "Farklı σ komşulukları farklı yerel hibrit verir.",
            "Uçlarda üç, merkezde iki bölge vardır; bu atama ters ve fazla bölgelidir.",
            "Ortadaki C’nin iki bölgesi sp’dir."
          ],
          "commonError": "Moleküldeki bütün atomlara tek etiket verme.",
          "check": "Toplam 6 σ ve 2 π hesabıyla yapı korunur."
        }
      },
      {
        "prompt": "H–C≡N: açık yapısında N üzerinde bir ortaklanmamış çift vardır. N’nin σ bağ sayısı ve yerel hibriti nedir?",
        "options": [
          "1 σ ve sp³",
          "1 σ ve sp²",
          "3 σ ve sp²",
          "2 σ ve sp",
          "1 σ ve sp"
        ],
        "answer": 4,
        "hint": "N çevresindeki σ yönüyle çift sayısını topla.",
        "explanation": "Bir σ ve bir çift, N çevresinde sp verir. N’de iki saf p, iki π bileşenine katılır.",
        "guidance": {
          "knowledge": [
            "Üçlü bağ bir σ ve iki π; ortaklanmamış çift ayrı elektron bölgesidir."
          ],
          "strategy": "N çevresindeki σ yönüyle çift sayısını topla.",
          "steps": [
            "N’nin tek atom komşusu C’dir: 1 σ.",
            "Bir ortaklanmamış çiftle bölge sayısı 2 olur.",
            "İki bölge sp modelidir."
          ],
          "optionReasons": [
            "Dört bölge yoktur; bu yüzden sp³ olmaz.",
            "Üç değil iki elektron bölgesi vardır.",
            "Üçlü bağ üç σ değildir.",
            "İkinci σ komşusu yoktur.",
            "Bir σ ve bir çift, N çevresinde sp verir."
          ],
          "commonError": "Ortaklanmamış çifti yok sayma veya π’yi yeni σ sayma.",
          "check": "N’de iki saf p, iki π bileşenine katılır."
        }
      },
      {
        "prompt": "H₂C=O yapısında O üzerinde iki ortaklanmamış çift vardır. O için yerel bölge sayısı ve hibrit nedir?",
        "options": [
          "3 bölge ve sp²",
          "1 bölge ve sp",
          "4 bölge ve sp³",
          "3 bölge ve sp³",
          "2 bölge ve sp"
        ],
        "answer": 0,
        "hint": "Çift bağ yönünü bir bölge say.",
        "explanation": "Üç bölge sp² verir. Bir saf p, C=O’nun π bileşeninde kullanılır.",
        "guidance": {
          "knowledge": [
            "O’nun C’ye σ komşuluğu bir, ortaklanmamış çift sayısı ikidir."
          ],
          "strategy": "Çift bağ yönünü bir bölge say.",
          "steps": [
            "C=O bir σ komşuluğu verir.",
            "1+2=3 elektron bölgesi vardır.",
            "Üç bölge sp² ile modellenir."
          ],
          "optionReasons": [
            "Üç bölge sp² verir.",
            "İki ortaklanmamış çift atlanmıştır.",
            "π bileşeni ikinci çekirdek yönü değildir.",
            "Üç bölgeli satır sp²’dir; sp³ dört bölgelidir.",
            "Toplam 1+2=3’tür; iki değildir."
          ],
          "commonError": "Bağ mertebesini bölge sayısına doğrudan ekleme.",
          "check": "Bir saf p, C=O’nun π bileşeninde kullanılır."
        }
      },
      {
        "prompt": "CH₃–O–H yapısında O üzerinde iki ortaklanmamış çift vardır. Molekülün toplam σ/π sayısı ve O hibriti hangisidir?",
        "options": [
          "5 σ, 1 π; O sp³.",
          "4 σ, 0 π; O sp².",
          "5 σ, 0 π; O sp³.",
          "4 σ, 1 π; O sp².",
          "3 σ, 0 π; O sp."
        ],
        "answer": 2,
        "hint": "O–H bağını ve O’nun çiftlerini unutma.",
        "explanation": "Molekülde 5 σ, 0 π; O dört bölgelidir. Beş tek bağın her biri bir ortak elektron çifti taşır.",
        "guidance": {
          "knowledge": [
            "Üç C–H, bir C–O ve bir O–H tek bağı vardır."
          ],
          "strategy": "O–H bağını ve O’nun çiftlerini unutma.",
          "steps": [
            "Beş farklı atom bağlantısının hepsi tek bağ: 5 σ, 0 π.",
            "O için 2 σ komşuluğu +2 çift=4 bölge.",
            "O sp³ modeline uyar."
          ],
          "optionReasons": [
            "Beş σ doğrudur ama açık yapıda π yoktur.",
            "O–H bağı eksik sayılmış; O’nun çiftleri de bölgeye dahildir.",
            "Molekülde 5 σ, 0 π; O dört bölgelidir.",
            "Açık yapıda çift bağ yok; π eklenemez.",
            "İki bağ ve iki çiftle O iki değil dört bölgelidir."
          ],
          "commonError": "Yalnız C’nin çevresini bütün molekül sanma.",
          "check": "Beş tek bağın her biri bir ortak elektron çifti taşır."
        }
      },
      {
        "prompt": "sp, sp² ve sp³ hibritlerinde s katkısının büyükten küçüğe doğru sırası nedir?",
        "options": [
          "Hepsi eşittir.",
          "sp³ > sp² > sp",
          "sp > sp³ > sp²",
          "sp² > sp > sp³",
          "sp > sp² > sp³"
        ],
        "answer": 4,
        "hint": "1/2,1/3 ve 1/4 kesirlerini karşılaştır.",
        "explanation": "s katkısı %50>%33,3>%25 olur. Her hibrit türünde s katkısı +p katkısı toplam %100’dür.",
        "guidance": {
          "knowledge": [
            "Bir s orbitalinin katkısı sırasıyla 2,3,4 hibrit arasında paylaşılır."
          ],
          "strategy": "1/2,1/3 ve 1/4 kesirlerini karşılaştır.",
          "steps": [
            "sp için 1/2=%50.",
            "sp² için 1/3≈%33,3.",
            "sp³ için 1/4=%25; ilk sıra en büyüktür."
          ],
          "optionReasons": [
            "Oranların paydaları farklıdır; eşit olmazlar.",
            "Payda arttıkça payı 1 olan kesir küçülür; bu sıra terstir.",
            "1/4,1/3’ten küçük olduğu için son ikisi ters verilmiştir.",
            "1/3,1/2’den küçük olduğu için sp² öne geçemez.",
            "s katkısı %50>%33,3>%25 olur."
          ],
          "commonError": "Üstteki p sayısını s yüzdesi sanma.",
          "check": "Her hibrit türünde s katkısı +p katkısı toplam %100’dür."
        }
      },
      {
        "prompt": "CH₄, H₂C=CH₂ ve H–C≡C–H yapılarında herhangi bir C’de kalan saf p orbital sayıları sırasıyla nedir?",
        "options": [
          "0,2,1",
          "4,3,2",
          "1,2,3",
          "0,1,2",
          "2,1,0"
        ],
        "answer": 3,
        "hint": "Üç başlangıç p orbitalinden kullanılanları çıkar.",
        "explanation": "Sıra 0,1,2’dir. Her C’nin saf p sayısı bu yapılarda yerel π sayısıyla uyumludur.",
        "guidance": {
          "knowledge": [
            "sp³ üç p, sp² iki p, sp bir p kullanır."
          ],
          "strategy": "Üç başlangıç p orbitalinden kullanılanları çıkar.",
          "steps": [
            "Metanda sp³: 3−3=0.",
            "Etende sp²: 3−2=1.",
            "Etinde sp: 3−1=2."
          ],
          "optionReasons": [
            "Eten bir, etin iki π yönü kullanır; son iki değer terstir.",
            "4,3,2 hibrit orbital sayılarıyla ilgilidir, saf p değildir.",
            "Metanda kalan saf p yoktur.",
            "Sıra 0,1,2’dir.",
            "Metan ile etin uçları ters verilmiştir."
          ],
          "commonError": "Hibrit sayısı ile kullanılmamış p sayısını karıştırma.",
          "check": "Her C’nin saf p sayısı bu yapılarda yerel π sayısıyla uyumludur."
        }
      },
      {
        "prompt": "Bütün atomları gösterilmiş H₂C=C=CH₂ için toplam σ ve π bağ sayıları nedir?",
        "options": [
          "4 ve 4",
          "6 ve 1",
          "5 ve 2",
          "6 ve 2",
          "8 ve 0"
        ],
        "answer": 3,
        "hint": "Dört H bağını ve iki iskelet bağlantısını say.",
        "explanation": "Altı σ ve iki π vardır. σ+π=8 toplam mertebeyi doğrular.",
        "guidance": {
          "knowledge": [
            "Her C–H bir σ; her C=C bir σ ve bir π verir."
          ],
          "strategy": "Dört H bağını ve iki iskelet bağlantısını say.",
          "steps": [
            "Dört C–H bağı 4 σ verir.",
            "İki C=C, 2 σ ve 2 π verir.",
            "Toplam 6 σ, 2 π bulunur."
          ],
          "optionReasons": [
            "Dört H bağı dışında iki C–C σ da vardır; π sayısı dört değildir.",
            "Yapıda iki çift bağ bulunduğundan 2 π vardır.",
            "İki C–C bağlantısından biri eksik sayılmıştır.",
            "Altı σ ve iki π vardır.",
            "Toplam mertebe 8 olsa da iki bileşen π’dir."
          ],
          "commonError": "İki çift bağı tek bir π sayma.",
          "check": "σ+π=8 toplam mertebeyi doğrular."
        }
      },
      {
        "prompt": "Değerlik bağ modelinde bir s ve iki p orbitalinin hibritleşmesine ilişkin hangisi doğrudur?",
        "options": [
          "Üç hibrit oluşunca atomdaki bütün elektronlar kaybolur.",
          "Dört sp³ hibrit oluşur ve saf p kalmaz.",
          "İki sp hibrit oluşur ve iki saf p kalır.",
          "Üç sp² hibrit oluşur ve bir saf p kalır.",
          "Farklı üç atom çekirdeği tek atoma dönüşür."
        ],
        "answer": 3,
        "hint": "1+2 girdi sayısını ve kalan p’yi ayrı hesapla.",
        "explanation": "Üç hibrit ve bir saf p sonucu orbital sayısını korur. 3 hibrit +1 saf p=4 değerlik orbitalidir.",
        "guidance": {
          "knowledge": [
            "Hibrit orbital sayısı kullanılan orbital sayısına eşittir; çekirdek değişmez."
          ],
          "strategy": "1+2 girdi sayısını ve kalan p’yi ayrı hesapla.",
          "steps": [
            "Kullanılan 1 s + 2 p toplam 3’tür.",
            "Üç sp² hibrit oluşur.",
            "Üç başlangıç p’den biri kullanılmadan kalır."
          ],
          "optionReasons": [
            "Orbital modelinin değişmesi elektronları yok etmez.",
            "Bu 1 s + 3 p durumudur; verilen iki p değildir.",
            "Bu 1 s + 1 p durumunu anlatır; iki p girdisi kullanılmamıştır.",
            "Üç hibrit ve bir saf p sonucu orbital sayısını korur.",
            "Kimyasal orbital gösterimi çekirdek birleşmesi değildir."
          ],
          "commonError": "Hibritleşmeyi madde veya parçacık kaybı sanma.",
          "check": "3 hibrit +1 saf p=4 değerlik orbitalidir."
        }
      }
    ],
    "source": "MEBİ AYT Kimya PDF108–110; OGM 12 Kimya 016–018 tam paftaları ve Dersler Cepte 12 Kimya 5 PDF14–15,18–21 karşılaştırılarak hazırlanmış özgün öğretim ve sorular. NH₃ için elektron bölgesi geometrisi ile molekül şekli ayrılır; aynı atom hibritleşmesi ile atomlar arası örtüşme karıştırılmaz."
  },
  {
    "id": "molekul-geometrisi",
    "topic": "detail-448",
    "title": "Molekül geometrisi",
    "minutes": 90,
    "objectives": [
      "Lewis yapısından elektron bölgesi ve molekül şeklini ayrı çıkar",
      "Bağ açılarını ortaklanmamış çift ve çoklu bağ koşullarıyla yorumla",
      "Bağ polarlığı ile molekül polarlığını gerçek üç boyutlu yönlerle ayır"
    ],
    "sections": [
      {
        "title": "Bağ listesi uzaysal şekle dönüşür",
        "paragraphs": [
          "Molekül geometrisi, atom çekirdeklerinin uzaydaki göreli yerleşimidir. Aynı bağlantıyı kâğıtta yan yana çizmek gerçek yapının düz olduğunu göstermez. Şekli açıklamak için önce Lewis yapısındaki ortak ve ortaklanmamış elektron çiftlerini bilmek gerekir.",
          "Bu ünitede önce merkez atomu ve elektron bölgelerini bulacak, sonra yalnız atom konumlarından molekül şeklini adlandıracaksın. Son aşamada bağların elektron çekme yönlerini birleştirerek molekülün polar olup olmadığını yorumlayacaksın. Böylece “polar bağ varsa polar molekül” kestirmesinin neden yetmediği anlaşılacak."
        ]
      },
      {
        "title": "Önce toplam değerlik elektronu",
        "paragraphs": [
          "Lewis yapısı kurulurken bütün atomların değerlik elektronları toplanır; iyon yükü varsa negatif yük kadar elektron eklenir, pozitif yük kadar çıkarılır. Bu ünitenin gezginindeki altı örnek nötrdür. H olağan iki elektronla çevrelenirken C, N, O, F için uygun oktet hesabı yapılır.",
          "BF₃ gibi merkez B’nin altı elektronla çevrelendiği elektronca eksik türler de vardır; bütün merkezleri zorla sekiz elektrona tamamlayıp olmayan çiftler ekleme. Lewis yapısı ve yük verisi doğru olmadan geometriye geçmek, sonraki bütün sayımı bozar."
        ]
      },
      {
        "title": "Lewis 1: elektron ve bağ iskeleti",
        "paragraphs": [
          "Önce toplam değerlik elektronunu hesapla ve varsa iyon yüküne göre düzelt. Ardından verilen bağlantıyı kullanarak uygun merkez atomu seç; H olağan yapılarda tek bağ yaptığı için merkez zincir atomu olmaz. Çok atomlu basit örneklerde C sık bir merkezdir; merkezi yalnız kâğıttaki harf sırasından seçme.",
          "Komşu atomları önce tek bağ çizgileriyle birleştir. Her çizgi iki elektronu temsil eder; bu bağlarda kullanılan elektronları toplam bütçeden çıkar. CO₂ için toplam 4+2×6=16 elektron, başlangıç O–C–O iskeletindeki iki tek bağda 4 elektron kullanımı ve 12 elektron artığı vardır."
        ]
      },
      {
        "title": "Lewis 2: uçlar, merkez ve çoklu bağ",
        "paragraphs": [
          "Kalan elektronlarla önce uç atomların uygun duet/oktetini tamamla; H iki elektronla çevrelenir. Bundan sonra artan elektronları merkezde çiftler olarak yerleştir. CO₂’nin iki O ucuna üçer çift yerleştirmek 12 elektronu kullanır; bu ilk iskelette C yalnız 4 elektronla çevrili kalır.",
          "Merkez için oktet gerekiyorsa uçtaki uygun ortaklanmamış çiftleri bağ ortaklığına çevirerek çoklu bağ kur. CO₂’de her O’dan bir çiftin bağa katılması O=C=O verir; elektron eklenmez, yalnız ortaklaşma değişir. BF₃ gibi elektronca eksik B örneğini zorla bu C-oktet kuralına uydurup olmayan elektronlar ekleme."
        ]
      },
      {
        "title": "Lewis 3: bütçeyi geri denetle",
        "paragraphs": [
          "Son çizimde bütün bağ elektronlarını ve bağ yapmayan çiftleri yeniden say. CO₂’de iki çift bağ 8, iki O’daki ikişer çift 8 elektron verir: toplam 16; C ve her O oktetlidir. NH₃’te toplam 5+3=8 elektronun 6’sı üç bağda, 2’si N’deki bir çifttedir.",
          "H₂O’da toplam 6+2=8 elektronun 4’ü iki bağda, 4’ü O’nun iki çiftindedir. Şimdi geometriye geçerken NH₃ için 3 bağ +1 çift, H₂O için 2 bağ +2 çift sayabilirsin. Böylece çift sayısı ezberden değil, Lewis elektron bütçesinden gelir; iyonlar ve farklı değerlik istisnaları kendi yük/bağ koşuluyla incelenir."
        ]
      },
      {
        "title": "Bir bölge bir elektron yoğunluğu yönüdür",
        "paragraphs": [
          "VSEPR, değerlik kabuğundaki elektron bölgelerinin itişmesini kullanarak temel yerleşimi açıklar. Merkezden aynı komşu çekirdeğe giden tek, çift veya üçlü bağın her biri bir bölgedir. Her ortaklanmamış çift de ayrı bölge sayılır.",
          "CO₂’de iki çift bağ iki bölge verir; dört bölge vermez. H₂O’da ise iki O–H bağı ve iki çift toplam dört bölgedir. Elektron bölgesi sayısı ile bağlı atom sayısını ayrı yaz; bu iki sayının eşit olması yalnız merkezde ortaklanmamış çift yoksa beklenir."
        ]
      },
      {
        "title": "AXₙEₘ gösterimini oku",
        "paragraphs": [
          "A merkez atomu, X merkeze bağlı atomları, E ortaklanmamış elektron çiftlerini gösterir. n bağlı atom sayısı, m merkezdeki çift sayısıdır. AX₂, AX₃, AX₄ ve AX₃E gibi yazımlar merkez çevresindeki yerel düzeni özetler.",
          "X’in her biri aynı atom türü olmak zorunda değildir; bu yüzden yalnız AX₄ etiketi molekülün apolar olduğunu garanti etmez. CH₄ ile CH₃Cl aynı temel dört yüzlü yerleşime sahipken çevre grupları farklıdır. Çok merkezli organik moleküllerde her merkez için ayrı gösterim gerekir."
        ]
      },
      {
        "title": "İki bölge: doğrusal",
        "paragraphs": [
          "İki elektron bölgesi ideal olarak 180° karşıt yönlenir. Ortaklanmamış çift olmayan AX₂ modelinin molekül şekli doğrusaldır; CO₂’nin O=C=O yapısı temel örnektir. Karbon çevresinde iki bağ yönü vardır, her çift bağın içindeki π bölgeyi artırmaz.",
          "İki atomlu molekülde de çekirdekler bir doğru üzerindedir fakat üç atomla tanımlanan bir merkez bağ açısı yoktur. HCl için “180° H–Cl–...” uydurulmaz. Bu ünitede 180° açı, CO₂ gibi en az iki merkez–komşu yönünün karşılaştırılmasıyla hesaplanır."
        ]
      },
      {
        "title": "Üç bölge: üçgen düzlem",
        "paragraphs": [
          "Üç elektron bölgesi, merkezde ortaklanmamış çift yoksa aynı düzlemde yaklaşık 120° aralıkla yerleşir. BF₃, AX₃ ve üçgen düzlem örneğidir. Üç B–F yönünün simetrisi toplam elektron çekme yönünün sıfırlanmasını sağlar.",
          "Farklı gruplar veya ortaklanmamış çiftler varsa bütün açıların tam 120° olması beklenmeyebilir. Bir modelin ideal yönlerini gerçek her bağa ölçülmüş sabit gibi atama. Molekülü ekranda döndürmek düzlemsel yapıyı üç boyutlu yeni bir kimyasal yapıya dönüştürmez."
        ]
      },
      {
        "title": "Dört bölge: düzgün dört yüzlü",
        "paragraphs": [
          "Dört eşdeğer bağ bölgesi, uzayda düzgün dört yüzlü yönler oluşturur; aralarındaki ideal açı arccos(−1/3)≈109,47°’dir. CH₄’te C merkez ve dört H köşeler gibi düşünülür. Çizimde dört H’nin kâğıdın köşelerinde bulunması düz kare yapı anlamına gelmez.",
          "Kesikli ve dolu kama çizimleri sayfa arkasına ve önüne giden bağları anlatabilir. Gezgin bunun yerine gerçek üç boyutlu noktaları dönüştürerek gösterir; ön–arka görünüş değişse bile dört yön arasındaki gerçek açı korunur. Yakın izdüşümlerde üst üste gelen atomların farklı derinliklerini döndürerek ayır."
        ]
      },
      {
        "title": "Ortaklanmamış çiftler görünür şekle dahil edilmez",
        "paragraphs": [
          "Elektron bölgesi geometrisi bütün bağ yönlerini ve merkezdeki çiftleri dikkate alır. Molekül şekli ise atom çekirdeklerinin yerleşimini adlandırır; ortaklanmamış çiftler atom köşeleri olarak sayılmaz. Aynı dört elektron bölgesi farklı molekül şekilleri verebilir.",
          "CH₄ AX₄ düzgün dört yüzlü; NH₃ AX₃E üçgen piramit; H₂O AX₂E₂ açısaldır. NH₃’e dört yüzlü molekül demek bu ayrımı kaybettirir. Doğru ifade, dört bölgeli elektron yerleşimi ve üç atom komşusunun piramidal şeklidir."
        ]
      },
      {
        "title": "Amonyakta bir çift, üç bağ",
        "paragraphs": [
          "NH₃’te N beş değerlik elektronu getirir; üç H ile üç σ bağ kurar ve N üzerinde bir ortaklanmamış çift kalır. Toplam dört elektron bölgesi sp³ yerel modeline karşılık gelir. Atom konumlarından oluşan şekil üçgen piramittir.",
          "H–N–H açısı yaklaşık 107° olup ideal metan açısından küçüktür. Basit VSEPR açıklamasında ortaklanmamış çiftin bağ bölgeleri üzerindeki daha güçlü itişi rol oynar. Değer yaklaşık bir molekül bilgisidir; yalnız çift sayısıyla her farklı elemente tam 107° atanmaz."
        ]
      },
      {
        "title": "Suda iki çift, iki bağ",
        "paragraphs": [
          "H₂O’da O’nun altı değerlik elektronundan ikisi H’lerle bağlanmaya katılır; iki ortaklanmamış çift kalır. İki bağ ve iki çift dört bölgedir, ama yalnız iki H yönünden oluşan molekül şekli açısaldır. H–O–H açısı yaklaşık 104,5°’dir.",
          "CH₄, NH₃, H₂O karşılaştırmasında bağ açıları yaklaşık 109,47° >107° >104,5° sırasını izler. Bu karşılaştırma olağan moleküller içindir; her dört bölgeli merkezde yalnız çift sayısıyla bütün ölçümleri kesin hesaplayan formül değildir. Küçük halkalardaki bağ zorlanmaları gibi başka koşullar da geometriyi etkiler."
        ]
      },
      {
        "title": "Bağdaki kutuplaşma",
        "paragraphs": [
          "Elektronegatifliği farklı iki atom arasında ortak elektron yoğunluğu eşit dağılmayabilir. Elektronları daha çok çeken uç kısmi negatif, diğeri kısmi pozitif yön olarak gösterilir. Bu kısmi yükleri iyonun tam yükü veya elektronun tümüyle aktarılması gibi yorumlama.",
          "Bağ polarlığını tartışırken atom türlerine ve bağ çevresine bakılır. Örneğin O–H ve C–O bağları için yönler ayrı değerlendirilir. Elektron çekme oku bir çizim uzlaşısıdır; bu gezginde kısmi pozitiften daha çok elektron çeken uca yönelir. Fizikte tanımlanan elektrik dipol moment vektörüyle yön uzlaşısını karıştırma."
        ]
      },
      {
        "title": "Molekül polarlığı vektörel bütündür",
        "paragraphs": [
          "Molekülün kalıcı dipol davranışı bütün yük dağılımıyla ilişkilidir. Lise düzeyinde bağ dipol katkılarının yön ve büyüklüklerini birleştirerek simetrik iptali veya kalan yönü açıklayabiliriz. İki boyutlu çizimde okların uzunluklarını rastgele toplamak üç boyutlu iptali yakalamayabilir.",
          "Gezgindeki oklar göreli, ölçeksiz elektron çekme katkılarıdır; gerçek Debye hesabı veya elektron yoğunluğu çözümü değildir. Örneklerin simetrisi ve polar/apolar ayrımı açıklanır. Net okun sıfırlanması, her bağın tek tek apolar olduğu sonucunu vermez."
        ]
      },
      {
        "title": "CO₂: polar bağlar iptal olabilir",
        "paragraphs": [
          "CO₂’de iki C=O bağı elektron çekme yönü taşır; molekül doğrusal ve uç atomlar eşdeğerdir. Eşit büyüklükte karşıt yönler toplamda sıfırlanır. Bu yüzden molekül kalıcı dipol bakımından apolardır.",
          "Bükülmüş bir CO₂ resmi çizip gerçek denge geometrisini değiştirmeden “net var” sonucuna gidilmez. Çizim açısını seçmek kimyasal geometriyi seçmek değildir. Buna karşılık H₂O açısal olduğundan O–H katkıları karşıt doğrusal iki ok değildir ve iptal olmaz."
        ]
      },
      {
        "title": "CH₄ ile CH₃Cl farkı",
        "paragraphs": [
          "CH₄’te dört eşdeğer C–H yönü düzgün dört yüzlü simetriyle iptal olur. CH₃Cl’de bir H yerine Cl bulunur; çevredeki bağ katkıları artık dört eşdeğer yönün eşit toplamı değildir. Temel molekül şekli yaklaşık dört yüzlü olsa da kalıcı dipol vardır.",
          "Dolayısıyla “simetrik temel geometri adı varsa apolardır” kuralı eksiktir. Bağlanan grupların eşdeğerliğini de denetle. Gezgin CH₄ ve CH₃Cl arasında geçiş yaparken yönlerin iskeletini korur, bağ katkılarındaki değişimi sonuçta görünür kılar."
        ]
      },
      {
        "title": "BF₃ ile NH₃’ü aynı üç X sanma",
        "paragraphs": [
          "BF₃’te merkezde üç bağ ve ortaklanmamış çift 0 olduğu için AX₃ üçgen düzlemdir. Eşdeğer üç B–F yönü toplamı iptal olur. NH₃ ise üç bağın yanında bir çift taşıdığından AX₃E ve piramittir; atomlar tek düzlemsel 120° üçlüsü oluşturmaz.",
          "İki molekülün üç çevre atomu taşıması aynı şekli gerektirmez. Önce merkezdeki çiftleri saymak, sonra atom konumlarını adlandırmak gerekir. NH₃’ün polar olması yalnız N–H bağının polarlığından değil, bu katkıların simetriyle sıfırlanmamasından anlaşılır."
        ]
      },
      {
        "title": "Bağ açısını gerçek uzayda ölç",
        "paragraphs": [
          "İki birim bağ yönü a ve b için cosθ=a·b bağıntısı gerçek üç boyutlu açıyı verir. Dört yüzlü yönlerde noktasal çarpım −1/3’tür; dolayısıyla açı yaklaşık 109,47° olur. Ekrandaki izdüşümde çizgiler arasında görülen açı bununla aynı olmak zorunda değildir.",
          "Bu yüzden gezginin metin sonucunda açı, yalnız çizilmiş iki ekran çizgisinden değil özgün üç boyutlu yönlerden hesaplanır. Döndürme sırasında sonucun değişmemesi, gerçek yapının kameradan bağımsız olduğunu sınar. Görünüş değişimini fiziksel bağ açısı değişmesi sanma."
        ]
      },
      {
        "title": "Şekilden özelliğe, koşuluyla",
        "paragraphs": [
          "Molekül polarlığı, moleküller arası etkileşimler ve çözünürlük eğilimleriyle ilişkilidir. Fakat kaynama noktası veya çözünürlük tek başına polar/apolar etiketiyle kesin sıralanmaz; mol kütlesi, hidrojen bağı, yapı ve ortam da etkilidir. Önce hangi özellik ve hangi karşılaştırma koşullarının verildiğini belirle.",
          "İyonik ağlar ve metalik katılar bağımsız küçük nötr moleküllerle aynı geometri çizelgesine zorlanmaz. Ayrıca bir molekülün polar olması “tam iyonlardan oluşur” demek değildir. Bu ünitedeki model kalıcı molekül dipolü ve tanımlanmış nötr moleküllerle sınırlıdır."
        ]
      },
      {
        "title": "Keşifte dört kontrol sorusu",
        "paragraphs": [
          "Her örnekte merkez nedir, kaç bağ yönü vardır, kaç ortaklanmamış çift vardır ve hangi gruplar eşdeğerdir sorularını sırayla sor. Sonra molekül şeklini söyle ve elektron çekme katkılarının iptalini gerekçelendir. Molekülü döndürerek düzlemsellik veya ön–arka ilişkiyi gözle denetle.",
          "Kontrol paneli şematik göreli oklar kullanır; gerçek ölçülmüş dipol büyüklüğü göstermez. Tahmin kaydı düşünceni saklar, doğru çözüm veya XP kaydı oluşturmaz. Yanıtını yalnız renge veya ekran resmine değil Lewis sayımı ve üç boyutlu yönlerin mantığına dayandır."
        ]
      }
    ],
    "examples": [
      {
        "title": "CO₂’nin Lewis yapısını adım adım kur",
        "prompt": "Nötr CO₂ için değerlik elektronları C=4, O=6. C merkezde olacak. Lewis yapısını toplam 16 elektronla kur; C ve O oktetlerini, merkez bölge sayısını denetle.",
        "strategy": "Tek bağ iskeletinden başlayıp elektron eklemeden uç çiftlerini çoklu bağa dönüştür.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "Toplam 4+2×6=16 elektron. O–C–O iki tek bağda 4 elektron kullanır; 12 kalır."
          },
          {
            "label": "Adım 2",
            "explanation": "Kalan 12 elektron iki O’ya üçer çift olarak gider; C’de yalnız 4 çevre elektronu olduğundan her O’dan bir çift bağ ortaklığına aktarılır."
          },
          {
            "label": "Adım 3",
            "explanation": "O=C=O’da bağlarda 8 ve O çiftlerinde 8 elektron vardır; toplam 16. C çevresinde iki çekirdek yönü, 2 bölge ve doğrusal 180° bulunur."
          }
        ],
        "answer": "O=C=O; her O’da 2 bağ yapmayan çift, C’de 0 çift; 16 elektron ve 2 merkez bölgesi.",
        "check": "C’nin iki çift bağla 8 çevre elektronu vardır; her O’da 4 bağ +4 çift elektronu oktet verir.",
        "pitfall": "Merkez oktetini tamamlarken bütçeye yeni elektron ekleme."
      },
      {
        "title": "Amonyağın iki farklı adı",
        "prompt": "NH₃’te N üzerinde bir ortaklanmamış çift vardır. Elektron bölgesi sayısını, molekül şeklini ve yerel hibriti bul.",
        "strategy": "Elektron bölgeleri ile atom konumlarını ayrı adlandır.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "Üç N–H bağı 3 bölge ve bir çift 1 bölge verir: toplam 4."
          },
          {
            "label": "Adım 2",
            "explanation": "Dört bölgeli yerel model sp³ ve yaklaşık dört yüzlü elektron yerleşimidir."
          },
          {
            "label": "Adım 3",
            "explanation": "Yalnız atom çekirdekleri sayıldığında üç H, üçgen piramit şekli oluşturur; açı yaklaşık 107°’dir."
          }
        ],
        "answer": "4 bölge; sp³; molekül şekli üçgen piramit.",
        "check": "AX₃E gösteriminde X+E toplamı 4’tür.",
        "pitfall": "Elektron yerleşimini molekül şeklinin adı diye verme."
      },
      {
        "title": "Su neden doğrusal değildir?",
        "prompt": "H₂O’da O üzerinde iki ortaklanmamış çift vardır. Bölge sayısı, şekil ve kalıcı dipolü açıkla.",
        "strategy": "İki bağı iki bölge sanmakla yetinme; çiftleri ekle.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "İki bağ +iki çift=4 bölge, yerel sp³ modelidir."
          },
          {
            "label": "Adım 2",
            "explanation": "İki H yönü yaklaşık 104,5° yapar; molekül açısaldır."
          },
          {
            "label": "Adım 3",
            "explanation": "O–H elektron çekme yönleri karşıt doğrular değildir; net katkı sıfır olmaz."
          }
        ],
        "answer": "4 bölge; açısal; polar.",
        "check": "İki atom komşusu olması iki elektron bölgesi olduğunu garanti etmez.",
        "pitfall": "H–O–H’yi otomatik 180° çizme."
      },
      {
        "title": "Karbon dioksitte iptal",
        "prompt": "CO₂’nin Lewis yapısı O=C=O ve C’de ortaklanmamış çift 0’dır. Şekli ve polarlığı belirle.",
        "strategy": "Çift bağları tek bölge olarak say ve iki eşdeğer yönü topla.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "C çevresinde iki çekirdek yönü vardır: AX₂, doğrusal 180°."
          },
          {
            "label": "Adım 2",
            "explanation": "İki C=O bağının elektron çekme yönü eşit ve karşıttır."
          },
          {
            "label": "Adım 3",
            "explanation": "Toplam katkı sıfırdır; molekül kalıcı dipol bakımından apolardır."
          }
        ],
        "answer": "Doğrusal 180° ve apolar.",
        "check": "Polar bağ ve apolar molekül bir arada bulunabilir.",
        "pitfall": "Çift bağları dört bölge sayarak geometriyi bozma."
      },
      {
        "title": "Dört yüzlü iki molekül",
        "prompt": "CH₄ ile CH₃Cl’nin merkez C çevresi yaklaşık dört yüzlüdür. Molekül polarlıklarını karşılaştır.",
        "strategy": "Aynı yön geometrisi ile eşdeğer çevre gruplarını ayrı denetle.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "CH₄’te dört C–H katkısı eşdeğer dört yüzlü yönlerde iptal olur."
          },
          {
            "label": "Adım 2",
            "explanation": "CH₃Cl’de bir bağın atom türü ve katkısı değişmiştir; dört eşdeğer katkı kalmaz."
          },
          {
            "label": "Adım 3",
            "explanation": "CH₄ apolar, CH₃Cl polar olarak sınıflanır."
          }
        ],
        "answer": "CH₄ apolar; CH₃Cl polar.",
        "check": "AX₄ etiketi tek başına apolar sonucunu vermez.",
        "pitfall": "Geometri adını bütün yük dağılımının özeti sanma."
      },
      {
        "title": "Dört yüzlü açıyı hesapla",
        "prompt": "Bir merkezden iki birim bağ yönü a=(1,1,1)/√3 ve b=(1, −1, −1)/√3 veriliyor. Bağ açısını bul.",
        "strategy": "Birim vektörlerin noktasal çarpımını cosθ’ye eşitle.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "a·b=(1−1−1)/3=−1/3."
          },
          {
            "label": "Adım 2",
            "explanation": "cosθ=−1/3 olduğundan θ=arccos(−1/3)."
          },
          {
            "label": "Adım 3",
            "explanation": "θ≈109,47° bulunur; ekran izdüşümü farklı görünebilir."
          }
        ],
        "answer": "Yaklaşık 109,47°.",
        "check": "Birim vektör oldukları için ayrıca normlara bölmek sonucu değiştirmez.",
        "pitfall": "Ekran çizgileri arasındaki açıyı gerçek uzaysal açı yerine kullanma."
      },
      {
        "title": "Üç çevre atomunda farklı sonuç",
        "prompt": "BF₃’te B üzerinde çift yok; NH₃’te N üzerinde bir çift vardır. İki molekülün bölge sayısı, şekli ve polarlığını karşılaştır.",
        "strategy": "Her merkez için AXₙEₘ satırı kur.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "BF₃: 3 bağ +0 çift=3 bölge; AX₃, üçgen düzlem, 120°."
          },
          {
            "label": "Adım 2",
            "explanation": "NH₃: 3 bağ +1 çift=4 bölge; AX₃E, üçgen piramit, yaklaşık 107°."
          },
          {
            "label": "Adım 3",
            "explanation": "Eşdeğer B–F yönleri iptal olur; NH₃ yönleri iptal olmaz."
          }
        ],
        "answer": "BF₃ apolar üçgen düzlem; NH₃ polar üçgen piramit.",
        "check": "Çevre atom sayısı aynı olsa da merkez çift sayısı farklıdır.",
        "pitfall": "Üç H veya F görüldüğünde çift sayımını atlama."
      }
    ],
    "recall": [
      {
        "prompt": "Elektron bölgesi ile molekül şekli farkı?",
        "answer": "Elektron bölgesi geometrisi bağları ve merkez çiftlerini içerir; molekül şekli yalnız atom çekirdeklerinin yerleşimini adlandırır."
      },
      {
        "prompt": "CH₄, NH₃, H₂O şekilleri?",
        "answer": "Sırasıyla düzgün dört yüzlü, üçgen piramit ve açısal; üçü de merkezde dört elektron bölgesine sahiptir."
      },
      {
        "prompt": "Polar bağdan polar molekül sonucu neden zorunlu değil?",
        "answer": "Eşdeğer bağ katkıları simetrik yönlerde iptal olabilir; CO₂ buna örnektir."
      },
      {
        "prompt": "Görüş açısını değiştirmek neyi korur?",
        "answer": "Atom bağlantıları, gerçek uzaysal bağ açıları ve molekülün polarlığı korunur; yalnız ekran izdüşümü değişir."
      }
    ],
    "items": [
      {
        "prompt": "NH₃ molekülünde merkez N üzerinde bir ortaklanmamış elektron çifti vardır. Molekül şekli hangisidir?",
        "options": [
          "Doğrusal",
          "Üçgen düzlem",
          "Kare düzlem",
          "Düzgün dört yüzlü molekül",
          "Üçgen piramit"
        ],
        "answer": 4,
        "hint": "AX₃E satırını kullan.",
        "explanation": "Molekül şekli üçgen piramittir. Yaklaşık 107° H–N–H açısı piramidal modelle uyumludur.",
        "guidance": {
          "knowledge": [
            "NH₃’te 3 bağ +1 çift=4 elektron bölgesi vardır; şekilde yalnız atomlar sayılır."
          ],
          "strategy": "AX₃E satırını kullan.",
          "steps": [
            "N üç H’ye bağlıdır.",
            "Bir çift dördüncü elektron bölgesidir.",
            "Üç H’nin atom düzeni üçgen piramittir."
          ],
          "optionReasons": [
            "Üç bağ yönü tek doğruda değildir.",
            "Üçgen düzlem üç bağ ve sıfır merkez çiftiyle ilişkilidir.",
            "Kare düzlem bu dört bölgeli üç bağlı modelin şekli değildir.",
            "Dört yüzlü elektron yerleşimini molekül şekliyle karıştırır; dört H yoktur.",
            "Molekül şekli üçgen piramittir."
          ],
          "commonError": "Elektron bölgesi adını doğrudan molekül adı yapma.",
          "check": "Yaklaşık 107° H–N–H açısı piramidal modelle uyumludur."
        }
      },
      {
        "prompt": "H₂O’da O üzerinde iki ortaklanmamış çift vardır. O çevresindeki elektron bölgesi sayısı ve molekül şekli nedir?",
        "options": [
          "4 bölge; düzgün dört yüzlü molekül",
          "2 bölge; doğrusal",
          "2 bölge; açısal",
          "4 bölge; açısal",
          "3 bölge; üçgen düzlem"
        ],
        "answer": 3,
        "hint": "Bağ ve çiftleri ayrı topla.",
        "explanation": "Dört elektron bölgesine karşın molekül açısaldır. AX₂E₂ için 2+2=4 doğrular.",
        "guidance": {
          "knowledge": [
            "Her O–H bağı ve her ortaklanmamış çift bir bölgedir."
          ],
          "strategy": "Bağ ve çiftleri ayrı topla.",
          "steps": [
            "İki bağ 2 bölge verir.",
            "İki çift eklenince toplam 4 olur.",
            "İki H yönü yaklaşık 104,5° ile açısal şekildir."
          ],
          "optionReasons": [
            "Dört elektron bölgesi dört atom komşusu demek değildir.",
            "İki çift atlanmıştır; gerçek molekül doğrusal değildir.",
            "Şekil doğru ama bölge sayısı iki çift nedeniyle 4’tür.",
            "Dört elektron bölgesine karşın molekül açısaldır.",
            "Bağ+çift toplamı 4’tür, 3 değildir."
          ],
          "commonError": "Yalnız X sayısını bölge sayısı sanma.",
          "check": "AX₂E₂ için 2+2=4 doğrular."
        }
      },
      {
        "prompt": "CO₂’de C üzerinde ortaklanmamış çift yoktur; Lewis yapısı O=C=O’dur. Molekül polarlığı için hangisi doğrudur?",
        "options": [
          "Doğrusal eşdeğer bağ katkıları iptal olur; molekül apolardır.",
          "C=O polar olduğundan molekül kesin polardır.",
          "Çift bağlar dört bölge verip kare molekül oluşturur.",
          "CO₂ iyonik ağ olduğu için molekül şekli yoktur.",
          "Oksijenler eşdeğer olmadığı için iptal olamaz."
        ],
        "answer": 0,
        "hint": "Bağ polarlığı ve vektörel toplamı ayır.",
        "explanation": "Bağlar polar olsa da molekülün net kalıcı katkısı iptal olur. İki eşit karşıt okun toplamı sıfırdır.",
        "guidance": {
          "knowledge": [
            "Çift bağ bir elektron bölgesidir; iki eşdeğer O ucu 180° karşıttır."
          ],
          "strategy": "Bağ polarlığı ve vektörel toplamı ayır.",
          "steps": [
            "İki bölge doğrusal yerleşir.",
            "Eşit C=O katkıları karşıt yönlüdür.",
            "Toplam sıfır; kalıcı dipol bakımından apolar olur."
          ],
          "optionReasons": [
            "Bağlar polar olsa da molekülün net kalıcı katkısı iptal olur.",
            "Polar bağ tek başına polar molekülü zorunlu kılmaz.",
            "İki çift bağ dört çekirdek yönü oluşturmaz.",
            "CO₂ bu koşullarda kovalent molekül örneğidir.",
            "Verilen simetrik O=C=O’da O uçları eşdeğerdir."
          ],
          "commonError": "Polar bağ ile molekülün toplamını aynı sayma.",
          "check": "İki eşit karşıt okun toplamı sıfırdır."
        }
      },
      {
        "prompt": "BF₃’te B üzerinde ortaklanmamış çift yoktur. B çevresindeki şekil ve ideal bağ açısı nedir?",
        "options": [
          "Doğrusal; 180°",
          "Açısal; 104,5°",
          "Üçgen düzlem; 120°",
          "Düzgün dört yüzlü; 109,47°",
          "Üçgen piramit; 107°"
        ],
        "answer": 2,
        "hint": "Üç eşdeğer bölgenin düzlemsel aralığını düşün.",
        "explanation": "AX₃ ideal üçgen düzlem ve 120°’dir. Üç F eşdeğer olduğunda net bağ katkıları da iptal olur.",
        "guidance": {
          "knowledge": [
            "Üç B–F yönü ve sıfır çift AX₃ verir."
          ],
          "strategy": "Üç eşdeğer bölgenin düzlemsel aralığını düşün.",
          "steps": [
            "B üç F’ye bağlıdır.",
            "Üç bölge aynı düzlemde yerleşir.",
            "360°/3=120° bulunur."
          ],
          "optionReasons": [
            "Doğrusal model iki bölgelidir.",
            "Bu açı ve şekil H₂O’nun iki bağlı iki çiftli örneğidir.",
            "AX₃ ideal üçgen düzlem ve 120°’dir.",
            "Dört bölge yoktur.",
            "Piramitte merkezde ek çift bulunur; burada yoktur."
          ],
          "commonError": "Çevre atom sayısına olmayan çift ekleme.",
          "check": "Üç F eşdeğer olduğunda net bağ katkıları da iptal olur."
        }
      },
      {
        "prompt": "CH₄’ün dört eşdeğer C–H yönü düzgün dört yüzlüdür. Bu molekülün kalıcı dipolü için doğru yorum nedir?",
        "options": [
          "Döndürülünce molekülün kimliği CH₃Cl olur.",
          "Ekranda iki bağ üst üste görünürse kalıcı dipol oluşur.",
          "Dört eşdeğer yönün katkısı iptal olur; apolardır.",
          "Dört yüzlü olduğu için her C–H bağı iyoniktir.",
          "Dört bağ olduğu için kesin polardır."
        ],
        "answer": 2,
        "hint": "Görüş açısı ile gerçek yük düzenini ayır.",
        "explanation": "Dört eşdeğer katkı toplamı sıfır olur. Bütün yönler birlikte döndürülünce sıfır toplam yine sıfır kalır.",
        "guidance": {
          "knowledge": [
            "Eşdeğer dört yüzlü yönlerin vektörel toplamı sıfırdır."
          ],
          "strategy": "Görüş açısı ile gerçek yük düzenini ayır.",
          "steps": [
            "Dört çevre grubu H’dir ve eşdeğerdir.",
            "Dört yüzlü simetri katkıları iptal eder.",
            "CH₄ kalıcı dipol bakımından apolardır."
          ],
          "optionReasons": [
            "Görünüş açısı element içeriğini değiştirmez.",
            "İzdüşüm çakışması gerçek yük düzenini değiştirmez.",
            "Dört eşdeğer katkı toplamı sıfır olur.",
            "Dört yüzlü geometri iyonik bağ kanıtı değildir.",
            "Bağ sayısı tek başına polarlık vermez."
          ],
          "commonError": "Kamera hareketini kimyasal değişim sanma.",
          "check": "Bütün yönler birlikte döndürülünce sıfır toplam yine sıfır kalır."
        }
      },
      {
        "prompt": "CH₄ apolar, CH₃Cl polar olarak biliniyor; ikisinde de C çevresi yaklaşık dört yüzlüdür. Farkı en iyi açıklayan nedir?",
        "options": [
          "CH₄ yalnız iki bağ içerir.",
          "Aynı temel şekil bütün moleküllerde aynı polarlığı zorunlu kılar.",
          "CH₃Cl’de C üzerinde iki ortaklanmamış çift vardır.",
          "Cl eklenince C’nin atom numarası değişir.",
          "CH₃Cl’de çevre grupları ve bağ katkıları artık dört eşdeğer katkı değildir."
        ],
        "answer": 4,
        "hint": "Geometri adının yanında bağlı gruplara bak.",
        "explanation": "Çevredeki farklı atom türü iptali bozar. CH₃Cl’de C’nin dört σ komşusu olması korunur.",
        "guidance": {
          "knowledge": [
            "Simetrik yönlerin iptali için ilgili katkıların eşdeğerliği de gerekir."
          ],
          "strategy": "Geometri adının yanında bağlı gruplara bak.",
          "steps": [
            "CH₄’te dört H eşdeğerdir.",
            "CH₃Cl’de bir uç Cl olmuştur.",
            "Katkı eşitliği bozulur ve net kalıcı dipol kalır."
          ],
          "optionReasons": [
            "CH₄ dört C–H bağı içerir.",
            "Verilen iki molekül zaten bu mutlak savın karşı örneğidir.",
            "Nötr CH₃Cl’de C dört bağ yapar; C’de iki çift yoktur.",
            "Bağlanma C çekirdeğinin proton sayısını değiştirmez.",
            "Çevredeki farklı atom türü iptali bozar."
          ],
          "commonError": "AX₄ etiketini tek başına apolar kuralı sanma.",
          "check": "CH₃Cl’de C’nin dört σ komşusu olması korunur."
        }
      },
      {
        "prompt": "CH₄, NH₃, H₂O’nun olağan gaz molekülü bağ açıları yaklaşık 109,47°, 107°, 104,5°’dir. Büyükten küçüğe doğru sıra hangisidir?",
        "options": [
          "CH₄ > NH₃ > H₂O",
          "H₂O > NH₃ > CH₄",
          "CH₄ > H₂O > NH₃",
          "Üçü de tam 109,47°’dir.",
          "NH₃ > CH₄ > H₂O"
        ],
        "answer": 0,
        "hint": "Açıları doğrudan büyükten küçüğe sırala.",
        "explanation": "Verilen değerlerin sırası CH₄, NH₃, H₂O’dur. Bu örnekler arası sıra başka atom türlerine koşulsuz evrensel formül değildir.",
        "guidance": {
          "knowledge": [
            "Verilen yaklaşık açıları karşılaştır; merkez çift sayıları sırasıyla 0,1,2’dir."
          ],
          "strategy": "Açıları doğrudan büyükten küçüğe sırala.",
          "steps": [
            "109,47>107.",
            "107>104,5.",
            "Sonuç CH₄>NH₃>H₂O olur."
          ],
          "optionReasons": [
            "Verilen değerlerin sırası CH₄, NH₃, H₂O’dur.",
            "Büyükten küçüğe sıra ters yazılmıştır.",
            "104,5,107’den küçük olduğu için son ikisi ters verilmiştir.",
            "Verilen NH₃ ve H₂O açıları ideal metan açısından farklıdır.",
            "107,109,47’den büyük değildir."
          ],
          "commonError": "Dört bölge olan her merkezin gerçek bağ açısını aynı sabit sanma.",
          "check": "Bu örnekler arası sıra başka atom türlerine koşulsuz evrensel formül değildir."
        }
      },
      {
        "prompt": "Bir merkez için AX₃E gösterimi veriliyor. X bağlı atom, E ortaklanmamış çift olduğuna göre toplam elektron bölgesi sayısı kaçtır?",
        "options": [
          "3",
          "6",
          "4",
          "2",
          "5"
        ],
        "answer": 2,
        "hint": "X ve E adetlerini topla.",
        "explanation": "Toplam dört bölge vardır. AX₃E NH₃ gibi piramidal molekül örneğine uyar.",
        "guidance": {
          "knowledge": [
            "Her bağlı atom yönü ve her ortaklanmamış çift birer bölgedir."
          ],
          "strategy": "X ve E adetlerini topla.",
          "steps": [
            "Üç X, 3 bağ yönü verir.",
            "Bir E, 1 ortaklanmamış çift verir.",
            "3+1=4 bulunur."
          ],
          "optionReasons": [
            "Yalnız X sayısı alınmış, E atlanmıştır.",
            "Bağları iki kez saymak bölge tanımına uymaz.",
            "Toplam dört bölge vardır.",
            "Üç bağ yönünü ve çifti temsil etmez.",
            "Verilen 3+1 toplamı 5 değildir."
          ],
          "commonError": "E’yi şekil adında saymamakla bölge hesabında saymamayı karıştırma.",
          "check": "AX₃E NH₃ gibi piramidal molekül örneğine uyar."
        }
      },
      {
        "prompt": "Birim bağ yönleri a=(1,1,1)/√3 ve b=(1, −1, −1)/√3 için cosθ=a·b veriliyor. θ yaklaşık kaç derecedir?",
        "options": [
          "120°",
          "60°",
          "180°",
          "90°",
          "109,47°"
        ],
        "answer": 4,
        "hint": "Bileşen çarpımlarını toplayıp üçe böl.",
        "explanation": "Dört yüzlü iki yönün açısı yaklaşık 109,47° olur. −1/3 negatif olduğu için açı 90°’den büyüktür.",
        "guidance": {
          "knowledge": [
            "Birim vektörlerin noktasal çarpımı gerçek uzaysal açının kosinüsüdür."
          ],
          "strategy": "Bileşen çarpımlarını toplayıp üçe böl.",
          "steps": [
            "a·b=(1−1−1)/3=−1/3.",
            "θ=arccos(−1/3).",
            "Sonuç yaklaşık 109,47°’dir."
          ],
          "optionReasons": [
            "120° için kosinüs −1/2’dir.",
            "60° için kosinüs +1/2 olur; buradaki −1/3 değildir.",
            "180° için kosinüs −1 olmalıdır.",
            "90° için noktasal çarpım 0 olmalıdır.",
            "Dört yüzlü iki yönün açısı yaklaşık 109,47° olur."
          ],
          "commonError": "İzdüşüm açısını üç boyutlu açı yerine koyma.",
          "check": "−1/3 negatif olduğu için açı 90°’den büyüktür."
        }
      },
      {
        "prompt": "Bir çift veya üçlü bağ, VSEPR elektron bölgesi hesabında aynı komşu atoma yöneliyorsa kaç bölge sayılır?",
        "options": [
          "Her zaman 0.",
          "2",
          "Bağdaki toplam elektron kadar.",
          "1",
          "3"
        ],
        "answer": 3,
        "hint": "Aynı iki çekirdeğe giden çoklu bağı tek yön olarak düşün.",
        "explanation": "Çoklu bağ bir bölgedir. CO₂’nin iki çift bağı iki bölge vermesiyle kontrol et.",
        "guidance": {
          "knowledge": [
            "Bölge sayımı bağ çizgisi adedini değil çekirdek yönünü izler."
          ],
          "strategy": "Aynı iki çekirdeğe giden çoklu bağı tek yön olarak düşün.",
          "steps": [
            "Çift/üçlü bağ aynı komşu çekirdeğe gider.",
            "σ ve π bileşenleri farklı komşu oluşturmaz.",
            "Bu yön bir elektron bölgesi sayılır."
          ],
          "optionReasons": [
            "Bağ yönünün elektron yoğunluğu vardır; 0 sayılmaz.",
            "Çift bağın mertebesini bölge sayısına eşitler.",
            "Elektron sayısı yön sayısı değildir.",
            "Çoklu bağ bir bölgedir.",
            "Üçlü bağın mertebesini bölge sayısına eşitler."
          ],
          "commonError": "Bölge ile elektron veya bağ mertebesini eşitleme.",
          "check": "CO₂’nin iki çift bağı iki bölge vermesiyle kontrol et."
        }
      },
      {
        "prompt": "Gezginde CO₂ modeli bütün olarak kameraya göre döndürülüyor; kimyasal yapı değişmiyor. Hangi nicelik korunur?",
        "options": [
          "Ekrandaki C=O çizgi uzunlukları her görünümde aynı kalır.",
          "Her dönüş yeni bir element oluşturur.",
          "Ortaklanmamış çift sayısı kamera açısıyla artar.",
          "Gerçek O–C–O açısı 180° ve molekülün apolar oluşu.",
          "Döndürülünce C=O bağlarından biri tek bağa iner."
        ],
        "answer": 3,
        "hint": "Kamera koordinatı ile molekülün iç yapısını ayır.",
        "explanation": "Gerçek geometri ve kalıcı dipol sınıfı dönüşten etkilenmez. Modeldeki sonuç açısı özgün 3B yönlerden hesaplanır.",
        "guidance": {
          "knowledge": [
            "Katı bir bütünün dönüşü iç uzaysal açıları ve bağlantıları korur; ekran izdüşümü değişebilir."
          ],
          "strategy": "Kamera koordinatı ile molekülün iç yapısını ayır.",
          "steps": [
            "Bütün atomlara aynı dönüş uygulanır.",
            "İç bağ açıları ve eşdeğerlik korunur.",
            "CO₂ doğrusal ve apolar kalır."
          ],
          "optionReasons": [
            "Doğrusal CO₂’nin gerçek açısı korunur ama çizgi uzunluğu izdüşümde kısalabilir. C=O ekseni başlangıçta ekran x yönündeyken, y ekseni çevresinde 0°→60° dönüş bu çizgi uzunluğunu yarıya indirir.",
            "Çekirdek kimliği dönüşle değişmez.",
            "Kamera seçimi elektron çiftlerini değiştirmez.",
            "Gerçek geometri ve kalıcı dipol sınıfı dönüşten etkilenmez.",
            "Dönüş bağı veya elektron sayısını değiştirmez."
          ],
          "commonError": "Görünüşteki kısalmayı bağ uzunluğu değişimi sanma.",
          "check": "Modeldeki sonuç açısı özgün 3B yönlerden hesaplanır."
        }
      },
      {
        "prompt": "Aşağıdaki nötr molekül ve şekil/polarlık eşleştirmelerinden hangisi doğrudur? Merkezdeki çiftler olağan Lewis yapılarına göredir.",
        "options": [
          "CO₂: açısal, polar.",
          "H₂O: doğrusal, apolar.",
          "NH₃: üçgen düzlem, apolar.",
          "BF₃: üçgen düzlem, apolar.",
          "CH₄: kare düzlem, polar."
        ],
        "answer": 3,
        "hint": "Şekli ve katkı iptalini birlikte denetle.",
        "explanation": "BF₃ doğru biçimde üçgen düzlem ve apolar verilmiştir. Doğru seçenekte hem şekil hem kalıcı dipol sınıfı birlikte doğrudur.",
        "guidance": {
          "knowledge": [
            "BF₃ AX₃; NH₃ AX₃E; H₂O AX₂E₂; CO₂ AX₂; CH₄ AX₄’tür."
          ],
          "strategy": "Şekli ve katkı iptalini birlikte denetle.",
          "steps": [
            "BF₃’te üç eşdeğer bağ, üçgen düzlemde bulunur.",
            "Bu üç yön toplamda iptal olur.",
            "BF₃ apolar eşleşmesi doğrudur."
          ],
          "optionReasons": [
            "CO₂ eşdeğer iki karşıt bağla doğrusal ve apolardır.",
            "H₂O iki merkez çiftiyle açısal ve polardır.",
            "NH₃ merkez çiftiyle piramidal ve polardır.",
            "BF₃ doğru biçimde üçgen düzlem ve apolar verilmiştir.",
            "CH₄ dört yüzlü ve apolardır."
          ],
          "commonError": "Bir doğru şekil adını yanlış moleküle taşımaktan kaçın.",
          "check": "Doğru seçenekte hem şekil hem kalıcı dipol sınıfı birlikte doğrudur."
        }
      }
    ],
    "source": "MEBİ AYT Kimya PDF109–110; OGM 12 Kimya 015–018 paftaları ve Dersler Cepte 12 Kimya 5 PDF14–15,18–21 temel alınarak hazırlanmış özgün öğretim ve sorular. NH₃’te yanlış molekül şekli etiketi düzeltilir; elektron bölgesi, molekül şekli ve göreli dipol katkıları ayrı gösterilir. Lewis yapımı ayrıca MEBİ AYT Kimya PDF107–108 ve Dersler Cepte 12 Kimya 5 PDF14–15 elektron bütçesiyle adım adım öğretilir."
  },
  {
    "id": "alkanlar",
    "topic": "detail-449",
    "title": "Alkanlar",
    "minutes": 110,
    "objectives": [
      "Açık zincirli doymuş hidrokarbonları yapıdan tanı ve adlandır",
      "Karbon iskeleti, izomerlik ve eşdeğer H konumlarını bağlantıyla denetle",
      "Fiziksel eğilimleri ve yanma/yer değiştirme tepkimelerini koşullarıyla açıkla"
    ],
    "sections": [
      {
        "title": "Doymuş hidrokarbonla başla",
        "paragraphs": [
          "Hidrokarbon yalnız karbon ve hidrojen içeren bileşiktir. Alkanlar, karbon iskeletinde yalnız tek C–C bağları bulunan açık zincirli, doymuş, nötr hidrokarbonlardır. Doymuş sözü bu olağan değerlik koşullarında iskeletin taşıyabileceği H sayısının tamamlanmasını anlatır.",
          "Her tek bağlı yapı açık zincir değildir; halkalı doymuş hidrokarbonlar sikloalkan başlığıyla ayrılır. Bu ünitede önce açık zincirin atom hesabını ve dallanmasını öğrenecek, sonra halka farkını göreceksin. “Yalnız tek bağ” koşulunu tek başına CₙH₂ₙ₊₂ formülünün yeterli kanıtı yapma."
        ]
      },
      {
        "title": "Genel formülü bir ağaçtan çıkar",
        "paragraphs": [
          "Bağlı ve halkasız n karbon iskeletinde n−1 C–C bağlantısı vardır. Karbonların toplam dört değerlik ucundan 2(n−1) uç C–C bağlarına gider; geriye H için 4n−2(n−1)=2n+2 uç kalır. Böylece açık zincirli alkanın formülü CₙH₂ₙ₊₂ olur.",
          "Bu sonuç dallanmadan bağımsızdır; bağlantı ağacı değişse de atom sayısı korunabilir. Ancak halka eklendiğinde fazladan C–C bağlantısı iki H yerini alır. Yük, çoklu bağ veya halka gibi koşulları gizleyip formülü her hidrokarbona uygulama."
        ]
      },
      {
        "title": "Bir homolog seri, artan karbon",
        "paragraphs": [
          "Metan CH₄, etan C₂H₆, propan C₃H₈, bütan C₄H₁₀, pentan C₅H₁₂, hekzan C₆H₁₄, heptan C₇H₁₆, oktan C₈H₁₈, nonan C₉H₂₀ ve dekan C₁₀H₂₂ ilk on düz zincirli adlandırma temelidir. Ardışık üyeler CH₂ farkı taşır.",
          "Homolog seri üyeleri aynı madde değildir; mol kütlesi ve fiziksel özellikleri değişir. C=12, H=1 alındığında bir CH₂ artışı 14 g/mol mol kütlesi artışı verir. Dallanmış aynı formüllü yapılar ise birbirinin homologu değil yapı izomeri olabilir."
        ]
      },
      {
        "title": "Açık, yoğunlaştırılmış ve çizgi yapısı",
        "paragraphs": [
          "Açık formül bütün bağları, yoğunlaştırılmış formül CH₃/CH₂ gruplarını ve dalları, iskelet çizgisi ise genellikle karbon köşe ve uçlarını gösterir. Çizgi formülünde yazılmayan C’ye bağlı H’ler olağan dört değerliği tamamlar. Aynı bağlantı farklı kâğıt biçimleriyle çizilebilir.",
          "Örneğin CH₃–CH₂–CH₂–CH₃ dört karbonlu tek zincirdir. Onu ekranda eğmek veya uçtan ters çevirmek yeni bir yapı izomeri yapmaz. Atomların hangi atomlarla bağlı olduğunu koruyan çizim değişimleriyle gerçek bağlantı değişimlerini ayır."
        ]
      },
      {
        "title": "Karbon başına hidrojeni say",
        "paragraphs": [
          "Bir alkan karbonu d farklı C komşusuna bağlıysa olağan dört değerliği tamamlamak için 4−d H taşır. Zincir ucunda d=1 için CH₃; iki C komşusunda CH₂; üç C komşusunda CH; dört C komşusunda H bulunmaz.",
          "Metanda C komşusu hiç yoktur: d=0 ve dört H bulunur. Metanı primer karbon diye etiketlemek doğru değildir; primer tanımı bir C komşusunu gerektirir. Gezgin her düğümde bu komşuluk sayısından gerçek H hesabı yapar ve toplamı 2n+2 ile denetler."
        ]
      },
      {
        "title": "Primer, sekonder, tersiyer, kuaterner",
        "paragraphs": [
          "Bir C’ye bağlı farklı C sayısı sırasıyla bir, iki, üç, dört ise karbon primer, sekonder, tersiyer, kuaterner olarak adlandırılır. Bu derece, karbonun bağlı olduğu H sayısının kendisi değildir; ikisi olağan alkan değerliğiyle ilişkilidir. Kuaterner C dört C’ye bağlıdır ve H taşımaz.",
          "Primer H, primer C’ye bağlı H anlamına gelir; karbonun komşu H sayısı diye ayrı bir derece tanımı kurulmaz. Aynı molekülde birkaç farklı derece olabilir. Tepkime konumu ve eşdeğerlik sorularında önce karbon derecesini, sonra simetrik eşdeğerliği incelemek gerekir."
        ]
      },
      {
        "title": "En uzun kesintisiz zinciri seç",
        "paragraphs": [
          "Dallanmış alkan adlandırmasında ana zincir, en uzun kesintisiz karbon yoludur. Kâğıtta yatay çizilmiş bölüm otomatik ana zincir değildir; bir dalın içinden geçerek daha uzun yol bulunabilir. Bir atomu aynı yol üzerinde ikinci kez kullanamazsın.",
          "Eşit uzun ana zincir adaylarında daha çok yan grup taşıyan zincir seçimi gibi adlandırma kuralları devreye girer. Karmaşık eşitlikler açıkça çözülmeden “gözüme uzun görünen” adı yazma. Gezginin vurguladığı en uzun yol, halka içermeyen gerçek karbon ağacından hesaplanır; tek bir uygun yolu gösterebilir."
        ]
      },
      {
        "title": "Numaralama ilk ayrılan konuma bakar",
        "paragraphs": [
          "Ana zinciri iki yönden numaraladığında yan grup konumlarını küçükten büyüğe listele. Listeleri soldan sağa karşılaştır; ilk farklı konumda daha küçük numara veren yön tercih edilir. Kural, konumların toplamı en küçük olsun şeklinde değildir.",
          "Örneğin aday listeler 2,2,5 ve 2,3,4 ise ilk sayılar eşit, ikinci karşılaştırmada 2<3 olduğundan 2,2,5 tercih edilir. Bu örnekte toplamlar eşit olsa da karar açıkça ilk farkla verilir. Farklı toplam örneklerinde de aynı karşılaştırma mantığı korunur."
        ]
      },
      {
        "title": "Yan grupları adlandır",
        "paragraphs": [
          "Alkan adının -an sonu yerine -il getirilerek bağlanma grubu adı kurulur: metan→metil, etan→etil, propan→propil, bütan→bütil. Örneğin metandan bir H eksiltilmesiyle tanımlanan metil grubu −CH₃ biçiminde yazılır. Baştaki çizgi ana yapıya bağlanma yeridir; eksi elektrik yükü veya serbest radikal noktası değildir.",
          "Birden çok eş yan grup varsa di-, tri-, tetra- gibi çokluk ön ekleri kullanılır ve bütün konumlar yazılır. Farklı yan grupların adları alfabetik sırayla verilir; di/tri gibi çokluk ön ekleri bu temel alfabetik karşılaştırmada dikkate alınmaz. Sayılar arasında virgül, sayı ve ad arasında kısa çizgi kullanılır."
        ]
      },
      {
        "title": "Basit dallanmış adları yapıyla eşleştir",
        "paragraphs": [
          "CH₃–CH(CH₃)–CH₂–CH₃ için en uzun zincir dört C’dir; metil yan grubu yakın uçtan 2’de bulunur. Adı 2-metilbütandır. CH₃–C(CH₃)₂–CH₃ için ana zincir üç C, iki metil 2,2 konumundadır: 2,2-dimetilpropan.",
          "İzobütan, izopentan, neopentan gibi yaygın adlar kaynaklarda görülebilir; karşılık gelen açık bağlantıyı bilmek gerekir. “İzo”yu her dallanmış yapıya gelişigüzel ekleme. Adlandırma, sözcük ezberinden önce yapının aynı atom bağlantılarını taşıdığını denetleme işidir."
        ]
      },
      {
        "title": "Yapı izomeri bağlantı değiştirir",
        "paragraphs": [
          "Yapı izomerleri aynı molekül formülüne fakat farklı atom bağlantılarına sahiptir. C₄H₁₀ için n-bütan ve 2-metilpropan iki farklı karbon ağacıdır. C₅H₁₂ için n-pentan, 2-metilbütan, 2,2-dimetilpropan olmak üzere üç bağlantı izomeri bulunur.",
          "Metan, etan ve propanda bu açık zincirli alkan iskelet izomerliği yoktur. Düz bir zinciri kıvırmak veya sağdan sola yazmak yeni izomer oluşturmaz. Bu ünitede yapı izomerleri sayılır; uygun yapılardaki ayrı uzaysal stereoizomerler bu sayıya ayrıca eklenmez."
        ]
      },
      {
        "title": "Eşdeğer karbonu ağ simetrisinden bul",
        "paragraphs": [
          "Molekülü bağlarını koparmadan atom etiketleri arasında eşleyebilen bir simetri, ilgili konumları eşdeğer yapar. n-pentanın iki ucu, iki iç yan konumu ve merkezi olmak üzere üç farklı karbon konumu vardır. Neopentanın dört metil grubu birbirine eşdeğerdir; merkez ise H taşımaz.",
          "Gezgin, bağlı ağaçtaki köklü dallanma imzalarıyla karbon konumlarını karşılaştırır. Bu eşdeğerlik çizimin ekrandaki sağ-sol görünüşüne değil bağlantıya dayanır. Farklı karbon derecesi eşdeğerliği dışlayabilir; aynı dereceye sahip olmaksa tek başına eşdeğerlik kanıtı değildir."
        ]
      },
      {
        "title": "Konformasyon yeni bağlantı değildir",
        "paragraphs": [
          "Açık zincirli tek σ bağları etrafındaki dönme, aynı bağlantının farklı uzaysal görünümlerini oluşturabilir. Etanın örtüşük ve şaşırtmalı görünümleri bu konformasyon dilinin temel örneğidir. Enerjileri aynı olmak zorunda değildir; fakat atom bağlantıları değişmez.",
          "İzomer sayımı yaparken her çizim açısını ayrı molekül sayma. Gezginin bütün ağı kameraya göre çevirmesi ayrıca bağ etrafında dönme simülasyonu da değildir. Bağlantı isomerliği, bağ dönmesi ve kamera dönüşü üç ayrı işlemdir."
        ]
      },
      {
        "title": "Apolar yapı ve London etkileşimi",
        "paragraphs": [
          "Alkanların olağan nötr molekülleri kalıcı dipol bakımından genellikle apolar kabul edilir; aralarındaki çekimlerde London etkileşimleri öne çıkar. Suda düşük çözünürlük ve birçok apolar çözücüyle karışma eğilimi bu bağlamda açıklanır.",
          "“Apolar her madde her apolar sıvıda sınırsız çözünür” veya “bütün alkanların yoğunluğu her koşulda aynıdır” denmez. Boyut, şekil, sıcaklık ve karışım ayrıntıları önemlidir. Molekül içi güçlü C–C/C–H bağlarını moleküller arası çekimlerle karıştırma."
        ]
      },
      {
        "title": "Kaynama eğilimi ve dallanma",
        "paragraphs": [
          "Aynı homolog seri boyunca karbon sayısı ve mol kütlesi arttıkça London etkileşimleri genellikle güçlenir; kaynama sıcaklığı çoğunlukla yükselir. Aynı molekül formüllü açık zincirli alkan izomerlerinde daha kompakt dallanma, kaynama sıcaklığını genellikle düşürür.",
          "Bu iki karşılaştırma koşulu farklıdır: aynı C sayısında dallanma ve farklı C sayısında zincir büyümesi. Erime sıcaklığı ise kristal paketleme ve simetriden de güçlü etkilenir; dallanmayla zorunlu ve tek yönlü değişim kuralı kurulmaz. Kaynaktaki erime verilerini aynı basit kaynama kuralıyla ezbere sıralama."
        ]
      },
      {
        "title": "Fiziksel hâl koşula bağlıdır",
        "paragraphs": [
          "Oda sıcaklığı ve atmosfer basıncı yakınında ilk küçük alkanlar gaz, daha büyük üyeler sıvı veya katı olabilir. Ancak “C sayısı şu aralıkta ise her koşulda sıvı” gibi bir sınırsız kural doğru değildir. Her türün gerçek erime/kaynama sıcaklığı ve seçilen T, P birlikte kullanılmalıdır.",
          "Örneğin n-heptadekanın erime noktası yaklaşık oda sıcaklığına yakındır; 20 °C ile 25 °C ayrımı sonucu etkileyebilir. Bu yüzden kaynaklarda verilen aralıkları sıcaklık ve basınçla oku. Molekül kütlesi artışı eğilimini faz diyagramının tam yerine koyma."
        ]
      },
      {
        "title": "Tam yanmayı atom korunumuyla kur",
        "paragraphs": [
          "Yeterli O₂ ile tam yanmada alkanın bütün C’si CO₂’ye, bütün H’si H₂O’ya gider. Bir mol CₙH₂ₙ₊₂ için n CO₂ ve n+1 H₂O yazılır; gereken O₂ katsayısı (3n+1)/2 olur. Kesirli katsayı moleküller için ikiyle çarpılıp tam sayılaştırılabilir; mol hesabında kullanılabilir.",
          "Oksijen yetersizse CO, is ve başka eksik yanma ürünleri bulunabilir; tam yanma denklemini bu koşula zorla uygulama. Yanma ısısı yazılırken suyun sıvı veya gaz hâli belirtilmelidir. Metanın H₂O(sıvı) veren yaklaşık −890 kJ/mol değeri, H₂O(gaz) ürünüyle aynı sayı değildir."
        ]
      },
      {
        "title": "Yanma miktarını molle ilişkilendir",
        "paragraphs": [
          "C=12, H=1 kabul edilirse açık zincirli alkanın mol kütlesi 14n+2 g/mol’dür. Örnek miktarı mol cinsine çevrilip yanma katsayılarıyla ürün ve O₂ miktarı bulunur. Gaz hacmi oranları yalnız aynı sıcaklık-basınçta ve gaz kabul edilen türlerde mol oranını izler.",
          "Suyun sıvı toplandığı bir deneyde toplam gaz hacmine suyu otomatik ekleme. Atom dengesi ve kütle korunumu son kontrolü sağlar. Yanma ürününden C ve H sayımı, formül ünitesindeki analizle doğrudan bağ kurar."
        ]
      },
      {
        "title": "Halojenle yer değiştirme koşulu",
        "paragraphs": [
          "Alkanlar uygun koşullarda, örneğin UV ışığı altında klorla radikal yer değiştirme tepkimesi verebilir: CH₄+Cl₂→CH₃Cl+HCl. Bir H’nin Cl ile yer değiştirmesi anlatılır; C–C çift bağına katılma mekanizması değildir.",
          "Ürün dağılımı, halojen türü, madde oranları ve tepkime koşullarına bağlıdır. Klorlama ilerleyip çoklu değişmiş ürünler de oluşturabilir. Florun çok şiddetli veya iyodun farklı denge davranışını yok sayıp “bütün halojenler aynı koşulda aynı biçimde” sonucu çıkarma."
        ]
      },
      {
        "title": "Monoklor ürününü konumdan say",
        "paragraphs": [
          "Yalnız tek H’nin Cl ile değiştiği ve yalnız farklı atom bağlantılarının sayıldığı modelde, reaktif H taşıyan eşdeğer karbon konumları aynı yapısal ürünü verir. n-pentanda uç, ikinci ve orta konum üç farklı monoklor yapı ürünü verir.",
          "Bu sayı ürünlerin eşit oranda oluştuğunu söylemez. Ayrıca bazı ürünlerin enantiyomerleri bulunabiliyorsa burada ayrı sayılmaz; stereoizomerleri dahil eden başka bir soru farklı toplam isteyebilir. Kökün sayım türünü kontrol etmeden eşdeğer H hesabını stereokimya hesabına dönüştürme."
        ]
      },
      {
        "title": "Kraking ve iskelet dönüşümü",
        "paragraphs": [
          "Büyük hidrokarbonların uygun ısıl/katalitik koşullarda daha küçük hidrokarbonlara parçalanması kraking başlığıyla açıklanır. Örneğin C₈H₁₈→C₄H₁₀+C₄H₈ atom dengeli olası bir ürün çiftidir; ürünlerden biri doymamış olabilir.",
          "Bu tek denklem her krakingde yalnız bu iki ürünün çıkacağını söylemez; gerçek koşullarda karışımlar oluşabilir. İzomerleşmede ise aynı formüllü farklı bağlantı iskeleti oluşabilir. İki süreçte de kimyasal atom türleri korunur; çekirdek dönüşümü yoktur."
        ]
      },
      {
        "title": "Petrol ve kullanım bağlamı",
        "paragraphs": [
          "Petrol çok sayıda hidrokarbon içeren bir karışımdır; ayrımsal damıtma, kaynama aralıklarına göre fraksiyonlar elde eder. Damıtma molekülleri kimyasal olarak daha küçük parçalara ayıran krakingle aynı işlem değildir. Doğal gazda metan çoğunlukla önemli bileşendir; ticari karışımların bileşimi değişebilir.",
          "Yakıt, çözücü ve petrokimya ham maddesi kullanımları yapı ve özelliklerle ilişkilidir. Benzen gibi başka hidrokarbon sınıflarını “petrolde var diye alkan” sınıfına sokma. Ayrıca kaynaklardaki kloroform veya siklopropan anestezisi bağlamı tarihsel örnektir; güncel uygulama tavsiyesi değildir."
        ]
      },
      {
        "title": "Sikloalkanı kapsam dışında sanma",
        "paragraphs": [
          "Tek halkalı, doymuş, nötr hidrokarbonların genel formülü CₙH₂ₙ olur; n en az 3’tür. Siklopropan, siklobütan, siklopentan ve siklohekzan temel adlardır. Halka kapatılması, açık zincire göre iki H azalmasını açıklar.",
          "Halka içi C–C–C açıları bütün yapılarda 109,47° değildir. Siklopropanda yaklaşık 60° üçgen iskelet zorlanması vardır; yerel sp³ öğretim etiketini halka açısına aynen eşitleme. Bu ünitedeki ağaç gezgini bilinçli olarak açık zincirlidir; halka girilirse model alanı dışında sayılır."
        ]
      },
      {
        "title": "Formül tek başına bütün yapıyı vermez",
        "paragraphs": [
          "C₅H₁₂ formülü atom sayısını ve mol kütlesini verir, ama üç yapı izomerinden hangisi olduğunu seçmez. Ana zincir uzunluğu, karbon dereceleri ve monoklor ürün sayısı bağlantı bilgisi gerektirir. Bu nedenle aynı formülde farklı model sonuçları anlamlıdır.",
          "Tersine, aynı çizimin rotasyonu veya farklı etiketlenmesi yeni izomer değildir. Gezginin C düğümlerini ve eşdeğerliklerini seçerek bir iddiayı önce komşulukla, sonra toplam atom hesabıyla kontrol et. Kimyasal yapı bilgisini yalnız ad veya resim ezberi yerine bu iki yönden doğrula."
        ]
      },
      {
        "title": "Gezginin sınırı ve çalışma yolu",
        "paragraphs": [
          "Ağaç kurucu 1–10 C içeren, halkasız, bağlı ve karbon derecesi en çok 4 olan iskeletleri işler. Her C’deki H sayısı, ana zincir yolu ve eşdeğer karbon grupları gerçekten bu bağlantılardan hesaplanır. Gösterilen çizgi uzunlukları ölçülmüş bağ uzunluğu değildir.",
          "İlk olarak düz pentanı, sonra iki farklı dallanmış C₅H₁₂ yapısını karşılaştır. H toplamı ve mol kütlesi aynı kalırken en uzun yol ve monoklor yapı ürün sayısı değişir. Tahminini gerekçesiyle kaydetmek keşiftir; soru doğrusu, XP veya konu tamamlama kanıtı oluşturmaz."
        ]
      },
      {
        "title": "Konumlar eşitse alfabetik son adım",
        "paragraphs": [
          "İki numaralama aynı sıralı yan grup konum listesini veriyorsa, farklı yan grupların alfabetik sırası eşitliği çözebilir. Altı karbonlu aynı ana zincirde bir bromo ve bir kloro dalı 2 ve 5 konumlarında olsun. İki yönde konum listesi (2,5) aynıdır; alfabetik önce gelen bromo daha küçük konumu alır.",
          "Bu örnekte ad 2-bromo-5-klorohekzan olur; 5-bromo-2-klorohekzan tercih edilmez. Önce ana zincir ve ilk-fark kuralı uygulanır, alfabetik bağ çözümü ancak önceki koşullar eşitse kullanılır. Benzer biçimde etil ile metil sıralanırken e, m’den önce gelir; di/tri gibi çokluk ön ekleri bu temel sıralamaya katılmaz."
        ]
      },
      {
        "title": "Fraksiyondan mum ve çözücüye",
        "paragraphs": [
          "Petrolün ayrımsal damıtılmasıyla benzin, kerosen ve daha ağır yağ-mum fraksiyonları farklı kaynama aralıkları üzerinden ayrılır. Bunlar tek bir saf alkan formülü değil, çeşitli bileşenleri içeren karışım gruplarıdır. Hekzanın uygun çözücü kullanımı apolar yapısıyla; C₂₉H₆₀ gibi uzun zincirli alkanların koruyucu mum bağlamı ise düşük su ilgisi ve uygun fiziksel hâliyle ilişkilidir.",
          "Metilklorür bazı silikon üretim yollarında ham madde, diklorometan endüstriyel çözücü örneğidir. Kloroformun anestezi, CCl₄’ün kuru temizleme ve yangın söndürme bağlamları kaynaklarda tarihsel kullanım olarak görülebilir; bu bilgiler güncel onay veya kullanım önerisi değildir. Bu klorlu türler yalnız C/H içeren alkanlar değil, onlardan türeyen halojenli bileşiklerdir."
        ]
      },
      {
        "title": "Alkilin bağ ucunu açık yapıyla seç",
        "paragraphs": [
          "Yıldız, büyük yapıya bağlanan ucu göstersin: ★–CH₂–CH₂–CH₃, n-propil yani propan-1-il; ★–CH(CH₃)₂, izopropil yani propan-2-il grubudur. İkisinde de C₃H₇ sayımı vardır ama bağın başladığı C farklıdır. Bu çizgi bağ ucu olduğundan, yazım serbest radikal noktası veya negatif yük olarak okunmaz.",
          "Dört karbonlu temel gruplar şöyle ayrılır: n-bütil=★–CH₂–CH₂–CH₂–CH₃ (bütan-1-il); sek-bütil=★–CH(CH₃)–CH₂–CH₃ (bütan-2-il); izobütil=★–CH₂–CH(CH₃)₂ (2-metilpropil); tert-bütil=★–C(CH₃)₃ (1,1-dimetiletil; 2-metilpropan-2-il). Bütün bu gruplarda C₄H₉ sayımı korunur; ana yapıya bağlanılan karbonun konumunu açık formül belirler."
        ]
      }
    ],
    "examples": [
      {
        "title": "Ağaçtan molekül formülü",
        "prompt": "Açık zincirli bir alkan 7 karbon içeriyor. C=12, H=1 iken H sayısını, mol kütlesini ve toplam σ bağını bul.",
        "strategy": "H=2n+2 ve C–C sayısı n−1 bağıntılarını kullan.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "H=2×7+2=16; formül C₇H₁₆."
          },
          {
            "label": "Adım 2",
            "explanation": "M=7×12+16=100 g/mol."
          },
          {
            "label": "Adım 3",
            "explanation": "6 C–C+16 C–H=22 σ bağı bulunur."
          }
        ],
        "answer": "C₇H₁₆; 100 g/mol; 22 σ.",
        "check": "3n+1=22 toplam σ formülüyle ikinci kontrol yapılır.",
        "pitfall": "C–H bağlarını toplam σ sayımından çıkarma."
      },
      {
        "title": "Dallanmış yapıyı adlandır",
        "prompt": "CH₃–CH(CH₃)–CH₂–CH₃ açık yapısının adını ve primer/sekonder/tersiyer C sayılarını bul.",
        "strategy": "En uzun yolu ve her C’nin C komşuluğunu ayrı incele.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "En uzun yol 4 C içerir; yakın uçtan metil dalı 2’de: 2-metilbütan."
          },
          {
            "label": "Adım 2",
            "explanation": "Üç CH₃ karbonu birer C komşusuyla primer; bir CH₂ iki C komşusuyla sekonderdir."
          },
          {
            "label": "Adım 3",
            "explanation": "CH merkezinin üç C komşusu vardır: tersiyer 1; kuaterner 0."
          }
        ],
        "answer": "2-metilbütan; primer 3, sekonder 1, tersiyer 1, kuaterner 0.",
        "check": "C toplamı 3+1+1=5; H=3×3+2+1=12.",
        "pitfall": "Dalı ana zincire yazıp beş C’lik kesintisiz olmayan yol icat etme."
      },
      {
        "title": "Neopentanda eşdeğerlik",
        "prompt": "C(CH₃)₄ yapısında yalnız tek H’nin Cl ile değişmesi inceleniyor; stereoizomerler ayrı sayılmayacak. Kaç farklı monoklor yapı ürünü vardır?",
        "strategy": "H taşıyan karbonları bağlantı simetrisiyle grupla.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "Merkez C dört C’ye bağlıdır ve H taşımaz."
          },
          {
            "label": "Adım 2",
            "explanation": "Dört dış CH₃ grubu birbirine eşdeğerdir; 12 H aynı bağlantısal türdedir."
          },
          {
            "label": "Adım 3",
            "explanation": "Bu gruplardan tek H değişimi aynı yapı ürününü verir."
          }
        ],
        "answer": "1 farklı monoklor yapı ürünü.",
        "check": "Merkezde H olmadığı için ayrı bir merkez ürün eklenmez.",
        "pitfall": "Ekrandaki dört köşeyi dört kimyasal olarak farklı konum sanma."
      },
      {
        "title": "Düz pentanda üç konum",
        "prompt": "CH₃–CH₂–CH₂–CH₂–CH₃ için yalnız monoklor türevlerin farklı bağlantıları sayılıyor; stereoizomerler sayılmıyor. Ürün sayısını bul.",
        "strategy": "Zinciri uçtan ters eşleyerek konumları grupla.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "C1 ve C5 eşdeğer uçlardır; tek grup."
          },
          {
            "label": "Adım 2",
            "explanation": "C2 ve C4 eşdeğer; C3 ayrı merkezdir."
          },
          {
            "label": "Adım 3",
            "explanation": "H taşıyan üç konum grubu, üç farklı bağlantısal ürün verir."
          }
        ],
        "answer": "3 farklı monoklor yapı ürünü.",
        "check": "1-, 2-, 3-klorpentan bağlantıları bulunur; ürün oranları sorulmamıştır.",
        "pitfall": "Her H’yi veya iki uçtan yazılan aynı konumu ayrı ürün sayma."
      },
      {
        "title": "Bütanın tam yanması",
        "prompt": "C₄H₁₀’dan 0,20 mol yeterli O₂ ile tamamen yakılıyor. Oluşan CO₂, H₂O ve tüketilen O₂ molünü bul.",
        "strategy": "Önce bir mol yakıt için atom dengesi kur.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "C₄H₁₀+(13/2)O₂→4CO₂+5H₂O."
          },
          {
            "label": "Adım 2",
            "explanation": "0,20 mol yakıt 4×0,20=0,80 mol CO₂ ve 5×0,20=1,00 mol H₂O verir."
          },
          {
            "label": "Adım 3",
            "explanation": "O₂=6,5×0,20=1,30 mol tüketilir."
          }
        ],
        "answer": "CO₂ 0,80 mol; H₂O 1,00 mol; O₂ 1,30 mol.",
        "check": "Sol O atomu 2,60 mol; sağda 1,60+1,00=2,60 mol.",
        "pitfall": "Suyun molünü gaz hacmi diye doğrudan yorumlama; faz koşulu ayrıca gerekir."
      },
      {
        "title": "Analizden alkanın karbon sayısı",
        "prompt": "Açık zincirli doymuş bir hidrokarbonun mol kütlesi 72 g/mol. C=12, H=1 iken formülünü ve tam yanmada bir mol için O₂ katsayısını bul.",
        "strategy": "M=14n+2 denklemini çöz.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "14n+2=72→14n=70→n=5."
          },
          {
            "label": "Adım 2",
            "explanation": "H=2×5+2=12; formül C₅H₁₂."
          },
          {
            "label": "Adım 3",
            "explanation": "O₂ katsayısı(3n+1)/2=(15+1)/2=8."
          }
        ],
        "answer": "C₅H₁₂; bir mol yakıta 8 mol O₂.",
        "check": "5CO₂+6H₂O ürünlerindeki 16 O atomu 8 O₂’ye karşılık gelir.",
        "pitfall": "Mol kütlesini yalnız 12n kabul edip H’yi atlama."
      },
      {
        "title": "Kraking denklemini denetle",
        "prompt": "Olası kraking denklemi C₈H₁₈→C₄H₁₀+X olarak veriliyor. Tek X türünün formülünü atom korunumundan bul; tek ürün karışımı genellemesi yapma.",
        "strategy": "Her element için sol–sağ farkını hesapla.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "Karbon farkı 8−4=4; X’te 4 C gerekir."
          },
          {
            "label": "Adım 2",
            "explanation": "Hidrojen farkı 18−10=8; X’te 8 H gerekir."
          },
          {
            "label": "Adım 3",
            "explanation": "X=C₄H₈ atom dengesi sağlar; bu tek denklem tüm kraking ürünlerini belirlemez."
          }
        ],
        "answer": "X için C₄H₈.",
        "check": "C: 4+4=8 ve H: 10+8=18 korunur.",
        "pitfall": "Krakingde çıkan her ürünün alkan olduğunu varsayma."
      },
      {
        "title": "Kaynama ile erimeyi ayır",
        "prompt": "Aynı koşullarda n-pentanın kaynama sıcaklığı yaklaşık 36 °C, 2-metilbütanın 28 °C, 2,2-dimetilpropanın 9,5 °C. Bu veriden çıkarılabilecek eğilimi ve çıkarılamayacak erime sonucunu açıkla.",
        "strategy": "Karşılaştırmanın aynı formüllü izomerler olduğunu belirt.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "Üçü de C₅H₁₂; mol kütleleri eşittir."
          },
          {
            "label": "Adım 2",
            "explanation": "Verilen seride daha kompakt dallanmış yapının kaynaması daha düşüktür."
          },
          {
            "label": "Adım 3",
            "explanation": "Erimeye ilişkin veri yoktur; kristal paketleme etkisi nedeniyle aynı zorunlu sıra çıkarılamaz."
          }
        ],
        "answer": "Bu izomerlerde dallanmayla kaynama düşer; erime sırası bu veriden belirlenmez.",
        "check": "Farklı karbon sayılı homologları değil aynı formüllü izomerleri kıyasladık.",
        "pitfall": "Kaynama eğilimini erimeye koşulsuz kopyalama."
      },
      {
        "title": "Eşit konum listesinde alfabetik karar",
        "prompt": "Altı C’lik seçilmiş ana zincirde bir bromo ve bir kloro dalı vardır. Bir yönden bromo 2, kloro 5; öteki yönden bromo 5, kloro 2 bulunuyor. Başka dal yok. Tercih edilen adı yaz.",
        "strategy": "Aynı konum listesi kaldığında alfabetik önce gelen grubun düşük konumunu seç.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "Her iki yönde sıralı konum listesi (2,5); ilk-fark karşılaştırması eşittir."
          },
          {
            "label": "Adım 2",
            "explanation": "Bromo alfabetik olarak klorodan önce gelir; bu gruba 2 konumu verilir."
          },
          {
            "label": "Adım 3",
            "explanation": "Ana zincir hekzan olduğundan ad 2-bromo-5-klorohekzandır."
          }
        ],
        "answer": "2-bromo-5-klorohekzan.",
        "check": "İki dalın konumları 2 ve 5 olarak korunur; yalnız numaralama yönü seçilir.",
        "pitfall": "Alfabetik kuralı ilk-fark kuralından önce uygulama."
      },
      {
        "title": "Aynı C₄H₉, farklı bağ ucu",
        "prompt": "★ büyük yapıya bağlanma yerini gösteriyor. A=★–CH₂–CH(CH₃)₂ ve B=★–C(CH₃)₃ için yaygın alkil adlarını ve bağ ucundaki C’nin H sayısını bul.",
        "strategy": "Toplam formül aynı olsa da yıldızın yanındaki karbonu incele.",
        "steps": [
          {
            "label": "Adım 1",
            "explanation": "A’da bağ ucu CH₂’dir; devamında iki metilli CH bulunur. Bu, izobütil (2-metilpropil) grubudur."
          },
          {
            "label": "Adım 2",
            "explanation": "B’de bağ ucu üç metile bağlı C’dir ve H taşımaz. Bu, tert-bütil (1,1-dimetiletil) grubudur."
          },
          {
            "label": "Adım 3",
            "explanation": "A’nın H sayısı 2+1+6=9, B’nin 0+9=9; ikisinde 4 C vardır ama bağlantı/bağ ucu ayrıdır."
          }
        ],
        "answer": "A izobütil, bağ ucunda 2 H; B tert-bütil, bağ ucunda 0 H.",
        "check": "Her iki C₄H₉ grubunun ana yapıya bir açık bağ ucu vardır.",
        "pitfall": "C₄H₉ formülünden tek bir alkil bağlantısını zorunlu seçme."
      }
    ],
    "recall": [
      {
        "prompt": "CₙH₂ₙ₊₂ hangi koşullarda geçerlidir?",
        "answer": "Bağlı, açık zincirli, doymuş, nötr hidrokarbon ve olağan dört değerlikli C modeli için."
      },
      {
        "prompt": "Alkandaki bir C’nin H sayısı nasıl bulunur?",
        "answer": "d farklı C komşusu için 4−d; metanda d=0 ve 4 H vardır, metan primer C sayılmaz."
      },
      {
        "prompt": "Ana zincir numarasında toplam mı ilk fark mı?",
        "answer": "Sıralı yan grup konum listeleri ilk farklı konumda karşılaştırılır; yalnız toplamı en küçük seçme kuralı yoktur."
      },
      {
        "prompt": "Monoklor yapı ürünü sayımı neyi dışlar?",
        "answer": "Tek H değişimi sonrası farklı bağlantılar sayılır; ürün oranı ve ayrı stereoizomer sayımı ayrıca verilmedikçe dahil değildir."
      }
    ],
    "items": [
      {
        "prompt": "Açık zincirli, doymuş, nötr bir hidrokarbonda 6 C vardır. Olağan dört değerlikli C modelinde molekül formülü nedir?",
        "options": [
          "C₆H₆",
          "C₆H₁₂",
          "C₆H₁₆",
          "C₆H₁₀",
          "C₆H₁₄"
        ],
        "answer": 4,
        "hint": "n=6 değerini genel formüle koy.",
        "explanation": "Doğru formül C₆H₁₄’tür. 5 C–C bağı 10 C ucunu kullanır; 24−10=14 H kalır.",
        "guidance": {
          "knowledge": [
            "Açık zincirli alkan için H=2n+2’dir."
          ],
          "strategy": "n=6 değerini genel formüle koy.",
          "steps": [
            "Yapı bağlı, halkasız ve doymuştur.",
            "H=2×6+2=14.",
            "Formül C₆H₁₄ olur."
          ],
          "optionReasons": [
            "H6 çok daha az H taşır; verilen alkan koşuluna uymaz.",
            "H12 tek halkalı doymuş veya bir doymamışlık durumuna uyabilir; açık zincir alkan değildir.",
            "H16 normal açık zincir C6 değerlik bütçesini aşar.",
            "H10 açık zincirli doymuş alkanın H bütçesinden 4 eksiktir.",
            "Doğru formül C₆H₁₄’tür."
          ],
          "commonError": "Sikloalkan formülünü açık zincire uygulama.",
          "check": "5 C–C bağı 10 C ucunu kullanır; 24−10=14 H kalır."
        }
      },
      {
        "prompt": "C=12, H=1 alınsın. Açık zincirli bir alkanın mol kütlesi 86 g/mol ise karbon sayısı kaçtır?",
        "options": [
          "5",
          "4",
          "8",
          "6",
          "7"
        ],
        "answer": 3,
        "hint": "14n+2=86 denklemini çöz.",
        "explanation": "Karbon sayısı 6’dır. Bulunan n pozitif tam sayıdır ve genel formüle uyar.",
        "guidance": {
          "knowledge": [
            "M=12n+(2n+2)=14n+2 g/mol."
          ],
          "strategy": "14n+2=86 denklemini çöz.",
          "steps": [
            "14n=84.",
            "n=84/14=6.",
            "C₆H₁₄ için 72+14=86 doğrular."
          ],
          "optionReasons": [
            "n5 için M72 olur.",
            "n4 için M58 olur.",
            "n8 için M114 olur.",
            "Karbon sayısı 6’dır.",
            "n7 için M100 olur."
          ],
          "commonError": "Mol kütlesinde hidrojenin katkısını yok sayma.",
          "check": "Bulunan n pozitif tam sayıdır ve genel formüle uyar."
        }
      },
      {
        "prompt": "CH₃–CH(CH₃)–CH₂–CH₃ açık yapısının sistematik adı nedir?",
        "options": [
          "2-metilbütan",
          "3-metilbütan",
          "2,2-dimetilpropan",
          "Pentan",
          "2-metilpropan"
        ],
        "answer": 0,
        "hint": "Dört C’lik ana zincir ve tek metil dalını belirle.",
        "explanation": "Ad 2-metilbütandır. Ana zincir 4+yan metil 1=5 C korunur.",
        "guidance": {
          "knowledge": [
            "En uzun kesintisiz yol 4 C’dir; dal en yakın uçtan numaralanır."
          ],
          "strategy": "Dört C’lik ana zincir ve tek metil dalını belirle.",
          "steps": [
            "Ana zincir bütan.",
            "Metil dalı bir yönden 2, öteki yönden 3’tedir.",
            "Küçük konum 2 seçilir."
          ],
          "optionReasons": [
            "Ad 2-metilbütandır.",
            "Aynı yapının uzak uçtan gereksiz büyük konumudur.",
            "Bu ad dört metilin bir merkez C’ye bağlı başka C5 iskeletidir.",
            "Pentan beş C’lik dallanmamış bağlantıdır; verilen yapı farklıdır.",
            "2-metilpropan 4 C içerir; burada toplam 5 C vardır."
          ],
          "commonError": "Toplam C sayısını ana zincir uzunluğu sanma.",
          "check": "Ana zincir 4+yan metil 1=5 C korunur."
        }
      },
      {
        "prompt": "CH₃–C(CH₃)₂–CH₃ yapısında kuaterner C sayısı ve toplam H sayısı nedir?",
        "options": [
          "1 ve 10",
          "1 ve 16",
          "1 ve 12",
          "4 ve 12",
          "0 ve 12"
        ],
        "answer": 2,
        "hint": "Merkez ve dört metil grubunu ayrı say.",
        "explanation": "Bir kuaterner C ve 12 H bulunur. C₅H₁₂ genel formülü doğrular.",
        "guidance": {
          "knowledge": [
            "Kuaterner C dört farklı C’ye bağlıdır; üzerinde H yoktur."
          ],
          "strategy": "Merkez ve dört metil grubunu ayrı say.",
          "steps": [
            "Merkez 4 C komşusuyla kuaternerdir.",
            "Dışta 4 CH₃ vardır.",
            "H=4×3=12, kuaterner C=1."
          ],
          "optionReasons": [
            "Dört CH₃ toplam 12 H verir; iki H eksik sayılmıştır.",
            "Merkezde ek 4 H yoktur; dört bağ zaten C’lere gitmiştir.",
            "Bir kuaterner C ve 12 H bulunur.",
            "Dıştaki dört C primerdir, kuaterner değildir.",
            "Merkezdeki dört C komşusu kuaterner tanımını sağlar."
          ],
          "commonError": "C’nin bütün H’lerini toplam formülden bağımsız fazladan ekleme.",
          "check": "C₅H₁₂ genel formülü doğrular."
        }
      },
      {
        "prompt": "Metan CH₄’ün merkez C’si için aşağıdakilerden hangisi doğrudur?",
        "options": [
          "H taşımadığı için kuaternerdir.",
          "Dört σ bağı olduğundan sekonder C’dir.",
          "C komşusu 0 olduğu için primer/sekonder/tersiyer/kuaterner sınıflarından biri değildir.",
          "Bir C atomu bulunduğu için primer C’dir.",
          "Dört H taşıdığı için kuaterner C’dir."
        ],
        "answer": 2,
        "hint": "C’nin bağlı olduğu C sayısını say.",
        "explanation": "Metan bu C-komşuluğu derece sınıflarına girmez. d0 için 4−d=4 H hesabı yine geçerlidir.",
        "guidance": {
          "knowledge": [
            "Karbon derecesi bağlı H sayısıyla değil farklı C komşu sayısıyla tanımlanır."
          ],
          "strategy": "C’nin bağlı olduğu C sayısını say.",
          "steps": [
            "CH₄’te başka C yoktur.",
            "C komşuluğu 0’dır.",
            "Primer tanımı 1 C komşusu gerektirir; buraya uygulanmaz."
          ],
          "optionReasons": [
            "CH₄ dört H taşır; öncül yanlıştır.",
            "σ sayısı 4 ile C derece 2 arasında böyle ilişki kurulmaz.",
            "Metan bu C-komşuluğu derece sınıflarına girmez.",
            "Moleküldeki toplam C sayısı komşu C sayısı değildir.",
            "Dört H, dört C komşusu değildir."
          ],
          "commonError": "H ve C komşuluğunu karıştırma.",
          "check": "d0 için 4−d=4 H hesabı yine geçerlidir."
        }
      },
      {
        "prompt": "Yalnız açık zincirli alkan iskelet izomerleri sayılıyor. C₅H₁₂’nin farklı atom bağlantılı yapı sayısı kaçtır?",
        "options": [
          "2",
          "5",
          "1",
          "4",
          "3"
        ],
        "answer": 4,
        "hint": "Dallanma sayısını bağlantıyı koruyan ters çizimlerden ayır.",
        "explanation": "Üç farklı iskelet vardır. Üçünün de atom sayısı C5, H12 kalır.",
        "guidance": {
          "knowledge": [
            "C5 iskeletleri düz pentan, 2-metilbütan ve 2,2-dimetilpropandır."
          ],
          "strategy": "Dallanma sayısını bağlantıyı koruyan ters çizimlerden ayır.",
          "steps": [
            "Beş C’lik düz zincir bir yapı.",
            "Dört C ana zincire metil dalı ikinci yapı.",
            "Üç C ana zincire iki metil dalı üçüncü yapı."
          ],
          "optionReasons": [
            "Düz veya iki dallanmış türden biri unutulmuştur.",
            "Konformasyonlar ayrı bağlantı izomeri olarak sayılmaz.",
            "İki dallanmış iskelet eksik bırakılmıştır.",
            "Ters çizilmiş aynı iskelet yeni izomer değildir.",
            "Üç farklı iskelet vardır."
          ],
          "commonError": "Zinciri kıvırmayı yeni yapı sanma.",
          "check": "Üçünün de atom sayısı C5, H12 kalır."
        }
      },
      {
        "prompt": "n-Pentan CH₃–CH₂–CH₂–CH₂–CH₃ üzerinde yalnız tek H, Cl ile değiştiriliyor. Yalnız farklı atom bağlantıları sayılacak; stereoizomerler ve ürün oranları ayrı sayılmayacak. Kaç monoklor yapı ürünü vardır?",
        "options": [
          "3",
          "1",
          "5",
          "12",
          "2"
        ],
        "answer": 0,
        "hint": "H taşıyan eşdeğer C konumlarını grupla.",
        "explanation": "Üç farklı monoklor yapı ürünü vardır. 1-, 2-, 3-klorpentan bağlantıları üç grubu doğrular.",
        "guidance": {
          "knowledge": [
            "Zincirin 1/5 ve 2/4 konumları eşdeğer; 3 tek başına ayrıdır."
          ],
          "strategy": "H taşıyan eşdeğer C konumlarını grupla.",
          "steps": [
            "Uçlar C1, C5 aynı tür.",
            "C2, C4 ikinci tür; C3 üçüncü tür.",
            "Üç bağlantısal ürün bulunur."
          ],
          "optionReasons": [
            "Üç farklı monoklor yapı ürünü vardır.",
            "Bütün konumlar eşdeğer değildir; üç grup vardır.",
            "C1/C5 ve C2/C4 çiftleri ayrı ürün değildir.",
            "Toplam H12, ürün sayısı değildir.",
            "Merkez C3 konumu ayrıca bir üründür."
          ],
          "commonError": "H adedini farklı ürün sayısına eşitleme.",
          "check": "1-, 2-, 3-klorpentan bağlantıları üç grubu doğrular."
        }
      },
      {
        "prompt": "Neopentan C(CH₃)₄’te yalnız tek H, Cl ile değiştiriliyor. Yalnız farklı atom bağlantıları sayılacak; stereoizomerler sayılmayacak. Kaç monoklor yapı ürünü vardır?",
        "options": [
          "3",
          "12",
          "1",
          "2",
          "4"
        ],
        "answer": 2,
        "hint": "Reaktif H taşıyan tek eşdeğer konum grubunu belirle.",
        "explanation": "Bir monoklor yapı ürünü bulunur. Bağlarını koruyan simetri her dış metili ötekine taşır.",
        "guidance": {
          "knowledge": [
            "Dört metil grubu eşdeğerdir; merkez H taşımaz."
          ],
          "strategy": "Reaktif H taşıyan tek eşdeğer konum grubunu belirle.",
          "steps": [
            "Merkezdeki C kuaterner ve H0’dır.",
            "Dört dış CH₃ birbirine eşdeğerdir.",
            "Tek H değişimi tek bağlantı türü verir."
          ],
          "optionReasons": [
            "Üç bağımsız H taşıyan konum grubu bulunmaz.",
            "12 H aynı bağlantısal türdedir; ürün sayısı 12 olmaz.",
            "Bir monoklor yapı ürünü bulunur.",
            "Merkezde H olmadığı için ikinci bir merkez ürünü yoktur.",
            "Dört metil çizimde ayrı görünse de eşdeğerdir."
          ],
          "commonError": "Çizimdeki köşe sayısını kimyasal konum sayısı sanma.",
          "check": "Bağlarını koruyan simetri her dış metili ötekine taşır."
        }
      },
      {
        "prompt": "C₃H₈ yeterli O₂ ile tam yanıyor. Bir mol propanın tükettiği O₂ ve oluşturduğu CO₂ molü sırasıyla kaçtır?",
        "options": [
          "5 ve 4",
          "3 ve 5",
          "7 ve 3",
          "4 ve 3",
          "5 ve 3"
        ],
        "answer": 4,
        "hint": "Ürünlerdeki toplam O atomunu ikiye böl.",
        "explanation": "5 mol O₂ ve 3 mol CO₂ bulunur. C₃H₈+5O₂→3CO₂+4H₂O atom dengelidir.",
        "guidance": {
          "knowledge": [
            "Tam yanmada C3→3CO₂, H8→4H₂O."
          ],
          "strategy": "Ürünlerdeki toplam O atomunu ikiye böl.",
          "steps": [
            "Ürünler 3CO₂+4H₂O.",
            "Toplam O atomu 6+4=10.",
            "O₂ 5 mol; CO₂ 3 mol olur."
          ],
          "optionReasons": [
            "4 su katsayısıdır, CO₂ katsayısı 3’tür.",
            "Oksijen ve karbon dioksit katsayıları ters verilmiştir.",
            "7 O₂, 14 O atomu verir; denklem dengesi 10 ister.",
            "4 O₂, 8 O atomu sağlar; 10 gerekir.",
            "5 mol O₂ ve 3 mol CO₂ bulunur."
          ],
          "commonError": "H sayısını su katsayısına doğrudan 8 olarak taşıma.",
          "check": "C₃H₈+5O₂→3CO₂+4H₂O atom dengelidir."
        }
      },
      {
        "prompt": "C=12, H=1 alınsın. 0,50 mol açık zincirli C₄H₁₀’un kütlesi ve toplam molekül içi σ bağlarının madde miktarı sırasıyla nedir?",
        "options": [
          "29 g ve 1,5 mol σ bağı",
          "29 g ve 5 mol σ bağı",
          "28 g ve 6,5 mol σ bağı",
          "29 g ve 6,5 mol σ bağı",
          "58 g ve 13 mol σ bağı"
        ],
        "answer": 3,
        "hint": "İki sonucu da 0,50 mol molekülle ölçekle.",
        "explanation": "29 g ve 6,5 mol σ bağı bulunur. Bağ başına sayım yalnız molekül içi kovalent bağlar içindir.",
        "guidance": {
          "knowledge": [
            "C₄H₁₀ mol kütlesi 58; bir molekülde 3 C–C+10 C–H=13 σ."
          ],
          "strategy": "İki sonucu da 0,50 mol molekülle ölçekle.",
          "steps": [
            "M=4×12+10=58 g/mol.",
            "m=0,50×58=29 g.",
            "Bağ madde miktarı 0,50×13=6,5 mol."
          ],
          "optionReasons": [
            "1,5 mol yalnız 3 C–C bağını sayar.",
            "5 mol yalnız 10 C–H bağını ölçekler; C–C eksiktir.",
            "H kütlesi doğru eklenince 58 g/mol ve 29 g olur.",
            "29 g ve 6,5 mol σ bağı bulunur.",
            "Bu değerler 1 mol moleküle aittir."
          ],
          "commonError": "Molekül miktarıyla bağ miktarını aynı sayı sanma.",
          "check": "Bağ başına sayım yalnız molekül içi kovalent bağlar içindir."
        }
      },
      {
        "prompt": "Aynı formüllü alkan izomerlerinde dallanmayla kaynama sıcaklığının genellikle düşmesi gözleniyor. Hangi yorum uygundur?",
        "options": [
          "Dallanma bütün erime sıcaklıklarını kesin düşürür.",
          "Kaynama yalnız molekül içi C–H bağlarını koparmaktır.",
          "Dallanma bütün C–C bağlarını π bağına çevirir.",
          "Bu eğilim erime sıcaklığının da zorunlu aynı sırada olmasını gerektirmez.",
          "Aynı formüllü izomerlerin mol kütleleri farklıdır."
        ],
        "answer": 3,
        "hint": "Kaynama ve erime için aynı tek-parametre kuralı kurma.",
        "explanation": "Erime için ayrı yapı ve veri gerekir. Bu karşılaştırma aynı basınçta ve aynı molekül formüllü izomerler arasındadır.",
        "guidance": {
          "knowledge": [
            "Kaynama moleküller arası çekimlerle; erime ayrıca kristal paketleme ve simetriyle ilişkilidir."
          ],
          "strategy": "Kaynama ve erime için aynı tek-parametre kuralı kurma.",
          "steps": [
            "İzomerlerin formülü ve mol kütlesi aynıdır.",
            "Şekil London etkileşimleri ve paketlemeyi farklı etkiler.",
            "Kaynama eğilimi erime için zorunlu bir sıra vermez."
          ],
          "optionReasons": [
            "Kristal paketleme nedeniyle bu sınırsız erime kuralı doğru değildir.",
            "Kaynama normalde molekül içi kovalent bağları parçalamaz.",
            "Dallanma burada tek bağlı doymuş iskeleti korur.",
            "Erime için ayrı yapı ve veri gerekir.",
            "Aynı formül aynı atom mol kütleleriyle aynı mol kütlesini verir."
          ],
          "commonError": "Molekül içi bağ ile moleküller arası etkileşimi karıştırma.",
          "check": "Bu karşılaştırma aynı basınçta ve aynı molekül formüllü izomerler arasındadır."
        }
      },
      {
        "prompt": "CH₄+Cl₂→CH₃Cl+HCl tepkimesi uygun UV koşulunda ele alınıyor. Temel sınıflandırması nedir?",
        "options": [
          "Karbon çekirdeğinin klor çekirdeğine dönüşmesi.",
          "Kimyasal bağ değişmeden yalnız damıtma.",
          "C=C bağına katılma.",
          "Bir H’nin Cl ile değiştiği yer değiştirme.",
          "H atomlarının yok olduğu korunumsuz süreç."
        ],
        "answer": 3,
        "hint": "Giren ve çıkan atom bağlantılarını karşılaştır.",
        "explanation": "Bir H’nin Cl ile değişmesi yer değiştirmedir. C, H, Cl atomları iki tarafta da korunur.",
        "guidance": {
          "knowledge": [
            "Metan doymuştur; örnekte H yerine Cl bağlanır."
          ],
          "strategy": "Giren ve çıkan atom bağlantılarını karşılaştır.",
          "steps": [
            "CH₄’teki bir C–H yerini C–Cl alır.",
            "Ayrılan H, HCl ürünündedir.",
            "Bu örnek yer değiştirmedir."
          ],
          "optionReasons": [
            "Element çekirdekleri bu kimyasal tepkimede değişmez.",
            "Yeni kimyasal türler oluşur; damıtma değildir.",
            "Başlangıçta C=C yoktur; bu alken katılması değildir.",
            "Bir H’nin Cl ile değişmesi yer değiştirmedir.",
            "H toplamı solda 4, sağda 3+1=4’tür."
          ],
          "commonError": "Doymuş molekül tepkimesini çift bağ katılması sanma.",
          "check": "C, H, Cl atomları iki tarafta da korunur."
        }
      },
      {
        "prompt": "Aynı on karbonlu ana zincirde üç metil dalının konumları bir yönden (2,8,8), öteki yönden (3,3,9) bulunuyor. Ana zincir seçimi tamamlanmışsa ilk-fark kuralına göre hangi liste seçilir?",
        "options": [
          "(3,3,9); tekrarlanan konum küçük olduğu için.",
          "(3,3,9); çünkü toplamı daha küçük.",
          "İkisi kesin aynı numaralamadır.",
          "Her zaman en büyük toplam seçilir.",
          "(2,8,8); ilk farklı konumda 2<3."
        ],
        "answer": 4,
        "hint": "İlk terimden başlayarak ilk farklı sayıyı karşılaştır.",
        "explanation": "İlk-fark kuralı (2,8,8) listesini seçer. On karbonlu zincirde ters numaralar 11−2=9 ve 11−8=3 olur; iki liste gerçekten aynı yapının iki yönüdür.",
        "guidance": {
          "knowledge": [
            "Konum listeleri soldan sağa ilk farklı terimde karşılaştırılır; toplam en küçük kuralı yoktur."
          ],
          "strategy": "İlk terimden başlayarak ilk farklı sayıyı karşılaştır.",
          "steps": [
            "İlk terimler 2 ve 3 farklı.",
            "2<3 olduğu için karşılaştırma burada biter.",
            "(2,8,8) listesi tercih edilir."
          ],
          "optionReasons": [
            "İlk farklı konum 2<3 kararı verir; tekrarlı küçük sayıya ayrıca öncelik yoktur.",
            "Toplamlar 18 ve 15 olsa da karar toplamla verilmez.",
            "Listeler farklı konumlar içerir; aynı numaralama değildir.",
            "Büyük toplam diye bir tercih kuralı yoktur.",
            "İlk-fark kuralı (2,8,8) listesini seçer."
          ],
          "commonError": "Konum toplamını adlandırma kuralının yerine koyma.",
          "check": "On karbonlu zincirde ters numaralar 11−2=9 ve 11−8=3 olur; iki liste gerçekten aynı yapının iki yönüdür."
        }
      },
      {
        "prompt": "Alkil bağlanma grubu −CH₃ yazımında baştaki çizgi bu soruda neyi temsil eder?",
        "options": [
          "Üçlü C–H bağını.",
          "Grubun ana yapıya tek bağla bağlanma yerini.",
          "Kesin −1 elektrik yükünü.",
          "Serbest CH₃ radikalinin eşleşmemiş elektron noktasını.",
          "Karbon çekirdeğinin parçalandığını."
        ],
        "answer": 1,
        "hint": "Çizginin formülün önünde bağ yeri olarak tanımlandığını kullan.",
        "explanation": "Çizgi bağlanma yerini gösterir. Ana iskelete bağlanınca C’nin dört değerliği tamamlanır.",
        "guidance": {
          "knowledge": [
            "Bağ çizgisi, eksi iyon yükü ve radikal noktası farklı gösterimlerdir."
          ],
          "strategy": "Çizginin formülün önünde bağ yeri olarak tanımlandığını kullan.",
          "steps": [
            "Metil grubu bağlanan bir CH₃ parçasıdır.",
            "Çizgi açık bağlanma ucudur.",
            "Yük için üst simge, radikal için nokta ayrıca kullanılır."
          ],
          "optionReasons": [
            "H olağan tek bağ yapar; üçlü C–H yoktur.",
            "Çizgi bağlanma yerini gösterir.",
            "Bağ çizgisi bu bağlamda yük simgesi değildir.",
            "Radikal noktası farklı işarettir; burada nokta yoktur.",
            "Bağ grubu tanımı çekirdek tepkimesi değildir."
          ],
          "commonError": "Her eksi benzeri çizgiyi iyon yükü sanma.",
          "check": "Ana iskelete bağlanınca C’nin dört değerliği tamamlanır."
        }
      },
      {
        "prompt": "Tek halkalı, doymuş, nötr ve yalnız C/H içeren siklohekzanın formülü nedir?",
        "options": [
          "C₆H₁₂",
          "C₆H₁₆",
          "C₆H₆",
          "C₆H₁₄",
          "C₆H₁₀"
        ],
        "answer": 0,
        "hint": "n6 için H2n hesapla.",
        "explanation": "Tek halkalı siklohekzan C₆H₁₂’dir. Altı C–C halka bağlantısı 12 değerlik ucu kullanır; 24−12=12 H kalır.",
        "guidance": {
          "knowledge": [
            "Tek halka, açık zincir alkana göre iki H azaltır; genel formül CₙH₂ₙ’dir."
          ],
          "strategy": "n6 için H2n hesapla.",
          "steps": [
            "Yapı bir halkalı ve doymuştur.",
            "H=2×6=12.",
            "Formül C₆H₁₂ olur."
          ],
          "optionReasons": [
            "Tek halkalı siklohekzan C₆H₁₂’dir.",
            "H16 olağan değerlik bütçesini aşar.",
            "H6 benzen gibi başka doymamış yapı bağlamına aittir.",
            "H14 açık zincirli hekzan formülüdür.",
            "H10 bir ek doymamışlık/halkaya karşılık gelebilir; verilen tek halka modeline uymaz."
          ],
          "commonError": "Açık zincir genel formülünü halkaya aynen taşıma.",
          "check": "Altı C–C halka bağlantısı 12 değerlik ucu kullanır; 24−12=12 H kalır."
        }
      },
      {
        "prompt": "Siklopropanın üç C çekirdeği yaklaşık üçgen oluşturuyor. Bu halka içindeki C–C–C açısı için uygun yorum hangisidir?",
        "options": [
          "Açı ölçülemez; üç atom bir açı tanımlayamaz.",
          "Her durumda 109,47°’dir; çünkü doymuştur.",
          "120°’dir; çünkü bütün üç C’li moleküller üçgen düzlemdir.",
          "Yaklaşık 60°’dir; yerel sp³ etiketi her halka açısını 109,47° yapmaz.",
          "Her durumda 180°’dir; çünkü tek bağ içerir."
        ],
        "answer": 3,
        "hint": "Üçgenin iç açısını gerçek halka koşuluyla ayır.",
        "explanation": "Yaklaşık 60° uygun halka açısıdır. 60° ile 109,47° farkı halka gerilmesi bağlamıdır.",
        "guidance": {
          "knowledge": [
            "Üçgen halka iskeleti geometrik zorlanma taşır; ideal tetrahedral açı otomatik uygulanmaz."
          ],
          "strategy": "Üçgenin iç açısını gerçek halka koşuluyla ayır.",
          "steps": [
            "Üç C halkası üçgen geometrisi kurar.",
            "Yaklaşık eşkenar üçgende açı 60°’dir.",
            "Bu, ideal dört yüzlü açıya göre halka zorlanmasını gösterir."
          ],
          "optionReasons": [
            "Üç atom bir merkez açı tanımlar.",
            "Doymuşluk, gerçek halka açısını ideal tetrahedral değere zorlamaz.",
            "120° üç bölge ideal merkez modeliyle ilgilidir; üç C’li halka açısı değildir.",
            "Yaklaşık 60° uygun halka açısıdır.",
            "Tek bağ iki komşu yönün doğrusal olmasını zorunlu kılmaz."
          ],
          "commonError": "Hibrit etiketini ölçülmüş her açıyla eşitleme.",
          "check": "60° ile 109,47° farkı halka gerilmesi bağlamıdır."
        }
      },
      {
        "prompt": "Olası kraking denklemi C₁₀H₂₂→C₆H₁₄+X olarak veriliyor. Tek X türünün formülü atom korunumuna göre nedir?",
        "options": [
          "C₆H₁₂",
          "C₄H₈",
          "C₄H₁₀",
          "C₁₆H₃₆",
          "C₄H₆"
        ],
        "answer": 1,
        "hint": "Başlangıçtan verilen ürünün atomlarını çıkar.",
        "explanation": "Eksik ürün C₄H₈ olmalıdır. 6+4=10 ve 14+8=22 doğrular; gerçek ürün karışımı tek denklemle evrenselleştirilmez.",
        "guidance": {
          "knowledge": [
            "Kimyasal tepkimede her elementin toplam atom sayısı korunur."
          ],
          "strategy": "Başlangıçtan verilen ürünün atomlarını çıkar.",
          "steps": [
            "C: 10−6=4.",
            "H: 22−14=8.",
            "X=C₄H₈ atom dengesi sağlar."
          ],
          "optionReasons": [
            "C toplamı 12 olur; başlangıç 10’dur.",
            "Eksik ürün C₄H₈ olmalıdır.",
            "H10 yazılırsa toplam 24 H olur; başlangıç 22’dir.",
            "Bu formül fark değil toplamla ilgilidir; atom dengesi bozulur.",
            "H toplamı 20 olur; iki H eksik kalır."
          ],
          "commonError": "Krakingde her ürünün doymuş alkan olmasını şart koşma.",
          "check": "6+4=10 ve 14+8=22 doğrular; gerçek ürün karışımı tek denklemle evrenselleştirilmez."
        }
      },
      {
        "prompt": "CH₃–CH₂–CH₂–CH₃ çizimini bütün bağlarını koruyarak ters çevirip sağdan sola yazmak ne oluşturur?",
        "options": [
          "Aynı n-bütan bağlantısının başka çizimi.",
          "Kesin C₄H₈ oluşumu.",
          "Yeni bir C₄H₁₀ yapı izomeri.",
          "Karbon sayısı değişen homolog.",
          "Bir karbon allotropu."
        ],
        "answer": 0,
        "hint": "Çizim yönü değişirken komşulukların korunup korunmadığına bak.",
        "explanation": "Ters çizim yeni bağlantı oluşturmaz. İki çizimin C komşuluk zinciri aynı dört düğümlü yoldur.",
        "guidance": {
          "knowledge": [
            "Yapı izomerliği atom bağlantılarının değişmesini gerektirir."
          ],
          "strategy": "Çizim yönü değişirken komşulukların korunup korunmadığına bak.",
          "steps": [
            "Her uç C bir C’ye, iki iç C ikişer C’ye bağlı kalır.",
            "H ve C sayısı değişmez.",
            "Bağlantı aynı olduğundan madde aynı n-bütandır."
          ],
          "optionReasons": [
            "Ters çizim yeni bağlantı oluşturmaz.",
            "İki H çıkarıldığına dair tepkime yoktur.",
            "Yeni izomer için gerçek dallanma gibi bağlantı farkı gerekir.",
            "Homolog üyede CH₂ farkı gerekir; burada atom sayısı aynı.",
            "Allotrop aynı elementin yapısal türleriyle ilgilidir; bu bir bileşik çizimidir."
          ],
          "commonError": "Çizim yönünü yeni kimyasal yapı sanma.",
          "check": "İki çizimin C komşuluk zinciri aynı dört düğümlü yoldur."
        }
      }
    ],
    "source": "MEBİ AYT Kimya PDF113–119; OGM 12 Kimya 019–020 tam paftaları; Dersler Cepte 12 Kimya 6 PDF10–12,17 karşılaştırılarak hazırlanmış özgün öğretim ve sorular. Yan grup numaraları ilk farkla seçilir; erime için zorunlu dallanma sırası kurulmaz; yanma ısısında ürün suyun hâli ayrılır. Gezgin açık zincirli alkan ağacı ve bağlantısal ürün eşdeğerliğiyle sınırlıdır."
  }
];

export const forge022ChemistryBTopics: Record<string, string> = Object.fromEntries(packs022B.map(p => [p.id, p.topic]));
export const forge022ChemistryBGuides: LessonGuide[] = packs022B.map(p => ({ id: p.id, minutes: p.minutes, objectives: p.objectives, sections: p.sections, examples: p.examples, recall: p.recall, source: p.source }));
export const forge022ChemistryBLessons: Lesson[] = packs022B.map(p => ({ id: p.id, subjectId: "ayt-kimya", title: txt(p.title), minutes: p.minutes, objectives: p.objectives.map(txt), body: p.sections.map(s => ({ title: txt(s.title), text: txt(s.paragraphs.join("\n\n")) })), source: txt(p.source), tags: [p.topic, "Özgün öğretim soruları"], questions: p.items.map((q, i) => ({ id: `f022b-${p.id}-${i + 1}`, prompt: txt(q.prompt), options: q.options.map(txt), answer: q.answer, hint: txt(q.hint), explanation: txt(q.explanation), guidance: q.guidance, skill: p.id })) }));
