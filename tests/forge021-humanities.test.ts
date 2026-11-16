import { describe, expect, it } from "vitest";
import { initialState, stateSchema } from "../src/domain/model";
import { questionContentIssues } from "../src/domain/questionContent";
import { forge021HumanitiesLessons as lessons, forge021HumanitiesGuides as guides, forge021HumanitiesTopics as topics, buildHumanitiesScene021 as scene, support021, humanitiesDefaults021 as defaults } from "../src/learning/forge021Humanities";
const ids = ["din-felsefesi", "siyaset-felsefesi", "sanat-felsefesi", "felsefi-okuma-ve-yazma", "ilk-cag-felsefesi", "orta-cag-felsefesi"];
export const states021: [string, Record<string, string | boolean>][] = [];
for (const argument of ["concept", "cause", "order"]) for (const claim of ["limited", "rich"]) for (const bridge of [false, true]) states021.push([ids[0], { argument, claim, bridge }]);
for (const power of [false, true]) for (const law of [false, true]) for (const rights of [false, true]) for (const focus of ["force", "law", "justify"]) states021.push([ids[1], { power, law, rights, focus }]);
for (const lens of ["world", "artist", "form", "viewer"]) for (const form of ["calm", "tense"]) states021.push([ids[2], { lens, form }]);
for (const scope of ["some", "all"]) for (const evidence of ["one", "all"]) states021.push([ids[3], { scope, evidence }]);
for (const stage of ["shadow", "object", "outside"]) states021.push([ids[4], { stage }]);
for (const universal of ["separate", "in", "mind", "name"]) states021.push([ids[5], { universal }]);
describe("021 Felsefe: kaynak, kavram ve gerekçe", () => {
 it("contains six distinct mapped teaching units with complete positive explanations and worked examples", () => {
  expect(lessons.map(x => x.id)).toEqual(ids); expect(Object.values(topics)).toEqual(["detail-103", "detail-104", "detail-105", "detail-106", "detail-107", "detail-108"]);
  expect(guides.reduce((n, x) => n + x.sections.length, 0)).toBe(114);
  for (const [i, g] of guides.entries()) { expect(lessons[i].subjectId).toBe("tyt-felsefe"); expect(g.sections.length).toBeGreaterThanOrEqual(10); expect(g.examples).toHaveLength(4); expect(g.recall).toHaveLength(4);
   for (const s of g.sections) { expect(s.paragraphs).toHaveLength(2); for (const p of s.paragraphs) expect(p.length).toBeGreaterThan(140); }
   for (const e of g.examples) { expect(e.prompt.length).toBeGreaterThan(50); expect(e.steps).toHaveLength(3); for (const s of e.steps) expect(s.explanation.length).toBeGreaterThan(40); expect(e.check.length).toBeGreaterThan(25); expect(e.pitfall.length).toBeGreaterThan(25); }
  }
 });
 it("contains sixty complete five-choice original questions independent of any previous page or model", () => {
  const all = lessons.flatMap(x => x.questions); expect(all).toHaveLength(60); expect(new Set(all.map(x => x.id)).size).toBe(60);
  for (const l of lessons) { expect(l.questions).toHaveLength(10); expect(l.tags).toContain("Özgün öğretim soruları"); for (const q of l.questions) {
   expect(q.passage!.tr.length).toBeGreaterThan(70); expect(q.options).toHaveLength(5); expect(new Set(q.options.map(x => x.tr)).size).toBe(5); expect(q.explanation.tr.length).toBeGreaterThan(80); expect(questionContentIssues(q)).toEqual([]);
  } }
 });
 it("retains exact original key meanings instead of accepting question count alone", () => {
  const answer = (l: number, q: number) => { const v = lessons[l].questions[q]; return v.options[v.answer].tr; };
  expect(answer(0, 0)).toBe("Ontolojik"); expect(answer(0, 4)).toBe("X panteizm; Y panenteizm");
  expect(answer(1, 4)).toBe("Rasyonel-yasal"); expect(answer(1, 5)).toBe("B; çünkü en az avantajlı grubun durumu daha iyidir.");
  expect(answer(2, 6)).toBe("Çıkar gözetmeme"); expect(answer(3, 2)).toBe("Çoğunluğun seçtiği her karar adildir.");
  expect(answer(4, 7)).toBe("Anma amacı"); expect(answer(5, 4)).toBe("Ilımlı gerçekçilik");
 });
 it("shows precisely which additional premise is missing when a causal conclusion gains new attributes", () => {
  const limited = scene(ids[0]), missing = scene(ids[0], { claim: "rich" }), added = scene(ids[0], { claim: "rich", bridge: true });
  expect(limited.nodes).toHaveLength(3); expect(limited.decision).toBe("Geçiş açık");
  expect(missing.nodes).toHaveLength(5); expect(missing.decision).toBe("Ek dayanak yok"); expect(missing.links.find(l => l.from === 3 && l.to === 4)?.active).toBe(false);
  expect(added.links.find(l => l.from === 3 && l.to === 4)?.active).toBe(true); expect(added.decision).toBe("Geçiş açık");
  expect(added.evidence.join(" ")).toContain("doğruluğu da ayrıca tartışılır");
 });
 it("distinguishes conceptual, causal and purposive starting points without scoring anyone's belief", () => {
  for (const [argument, label, type] of [["concept", "Kavram", "Ontolojik"], ["cause", "Evren", "Kozmolojik"], ["order", "Düzen", "Teleolojik"]]) {
   const s = scene(ids[0], { argument }); expect(s.nodes[0].label).toBe(label); expect(s.evidence[0]).toContain(type); expect(s.links.map(l => [l.from, l.to])).toEqual([[0, 2], [1, 2]]);
  }
 });
 it("keeps power, legality and justification independent while moving the actual question's focus", () => {
  const baseline = scene(ids[1], { power: false, law: true, rights: false, focus: "force" });
  const grounds = scene(ids[1], { power: false, law: true, rights: false, focus: "justify" });
  expect(grounds.nodes).toEqual(baseline.nodes); expect(baseline.decision).toBe("Güç bilgisi"); expect(grounds.decision).toBe("Hak gerekçesi");
  expect(grounds.links.filter(l => l.focused).map(l => l.from)).toEqual([2]);
  expect(grounds.nodes.map(n => n.active)).toEqual([false, true, false, undefined]); expect(grounds.nodes[2].text).toContain("henüz kurulamaz");
 });
 it("changes the actual artwork's line family and reverses reception's edge toward the viewer", () => {
  const represent = scene(ids[2], { lens: "world", form: "calm" }), reception = scene(ids[2], { lens: "viewer", form: "tense" });
  expect(represent.links.map(l => [l.from, l.to])).toEqual([[0, 4]]); expect(reception.links.map(l => [l.from, l.to])).toEqual([[4, 3]]);
  expect(represent.art!.tense).toBe(false); expect(reception.art!.tense).toBe(true); expect(reception.decision).toBe("Alımlama"); expect(reception.nodes[2].text).toContain("Keskin");
 });
 it("computes limited and full evidence coverage while keeping unknown records unknown", () => {
  const one = support021("all", "one"); expect(one.observed).toBe(1); expect(one.required).toBe(5); expect(one.supported).toBe(false); expect(one.rows.filter(r => !r.known)).toHaveLength(4);
  expect(support021("some", "one").supported).toBe(true); expect(support021("all", "all").supported).toBe(true);
  expect(scene(ids[3], { scope: "all", evidence: "one" }).links).toHaveLength(1); expect(scene(ids[3], { scope: "all", evidence: "all" }).links).toHaveLength(5);
  expect(scene(ids[3]).evidence[2]).toContain("ayrıca normatif gerekçe");
 });
 it("moves the cave's gaze to the actual shadow, object or outside node with the source edge preserved", () => {
  for (const [i, stage] of ["shadow", "object", "outside"].entries()) { const s = scene(ids[4], { stage }); expect(s.cave!.target).toBe(i + 1); expect(s.links[0]).toMatchObject({ from: 0, to: i + 1 }); expect(s.links[1]).toMatchObject({ from: 2, to: 1 }); }
 });
 it("changes the general term's status without replacing either particular tree", () => {
  const samples = ["separate", "in", "mind", "name"].map(universal => scene(ids[5], { universal }));
  for (const s of samples) expect(s.nodes.slice(0, 2)).toEqual(samples[0].nodes.slice(0, 2));
  expect(samples.map(s => s.nodes[2].label)).toEqual(["Ayrı tür", "Ortak form", "Zihin", "Ad"]);
  expect(samples[0].links.map(l => [l.from, l.to])).toEqual([[2, 0], [2, 1]]); expect(samples[2].links.map(l => [l.from, l.to])).toEqual([[0, 2], [1, 2]]);
 });
 it("keeps all fifty-five bounded input combinations linked to real targets and under the persistence limit", () => {
  expect(states021).toHaveLength(55); const base = initialState();
  for (const [id, patch] of states021) { const s = scene(id, patch); expect(s.options).toContain(s.decision); for (const l of s.links) { expect(s.nodes[l.from]).toBeDefined(); expect(s.nodes[l.to]).toBeDefined(); expect(l.from).not.toBe(l.to); }
   const saved = { ...defaults, ...patch, guess: s.decision, reason: "Öncülü, geçişi ve sonucun kapsamını verilen tam bağlamla karşılaştırıyorum. ".repeat(3).slice(0, 120), compared: true };
   for (const v of Object.values(saved)) if (typeof v === "string") expect(v.length).toBeLessThanOrEqual(120);
   const parsed = stateSchema.parse({ ...base, explorations: { [`forge021-humanities:${id}`]: saved } }); expect({ ...parsed, explorations: {} }).toEqual({ ...base, explorations: {} });
  }
 });
 it("rejects invalid and prototype lesson IDs, invalid bounded selections and non-boolean conditions", () => {
  for (const id of ["missing", "__proto__", "constructor", "toString", "hasOwnProperty"]) expect(() => scene(id)).toThrow(RangeError);
  for (const [id, key] of [[ids[0], "argument"], [ids[0], "claim"], [ids[1], "focus"], [ids[2], "lens"], [ids[2], "form"], [ids[3], "scope"], [ids[3], "evidence"], [ids[4], "stage"], [ids[5], "universal"]]) for (const value of ["", "__proto__", "missing"]) expect(() => scene(id, { [key]: value })).toThrow(RangeError);
  for (const key of ["power", "law", "rights"]) expect(() => scene(ids[1], { [key]: 1 } as never)).toThrow(RangeError); expect(() => scene(ids[0], { bridge: "true" } as never)).toThrow(RangeError);
  for (const input of [null, [], 1]) expect(() => scene(ids[0], input as never)).toThrow(RangeError);
 });
});
