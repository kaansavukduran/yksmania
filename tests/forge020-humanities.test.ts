import { describe, expect, it } from "vitest";
import { initialState, stateSchema } from "../src/domain/model";
import { questionContentIssues } from "../src/domain/questionContent";
import { allocate020, logic020, science020, buildHumanitiesScene020, forge020HumanitiesLessons as lessons, forge020HumanitiesGuides as guides, forge020HumanitiesTopics as topics, humanitiesDefaults020 as defaults } from "../src/learning/forge020Humanities";
const scene = buildHumanitiesScene020;
const ids = ["felsefeyi-tanima", "felsefe-ile-dusunme", "varlik-felsefesi", "bilgi-felsefesi", "bilim-felsefesi", "ahlak-felsefesi"];
const states: [string, Record<string, string | boolean>][] = [];
for (const criterion of ["equal", "need"]) for (const angle of ["apply", "grounds"]) states.push([ids[0], { criterion, angle }]);
for (const rule of ["direct", "reverse"]) for (const rain of [false, true]) for (const sprinkler of [false, true]) states.push([ids[1], { rule, rain, sprinkler }]);
for (const foundation of ["material", "dual", "idea"]) states.push([ids[2], { foundation }]);
for (const question of ["source", "criterion"]) for (const test of ["world", "system", "consensus", "clear", "work"]) states.push([ids[3], { question, test }]);
for (const data of ["paired", "crossed"]) for (const hypothesis of ["heat", "damp"]) states.push([ids[4], { data, hypothesis }]);
for (const motive of ["duty", "outcome", "virtue"]) for (const condition of ["free", "hidden", "threat"]) states.push([ids[5], { motive, condition }]);

describe("Felsefe 020: kavram, kanıt ve eylem gerekçeleri", () => {
 it("has six correctly mapped Turkish philosophy guides with full source-backed teaching and three-step examples", () => {
  expect(lessons.map(l => l.id)).toEqual(ids);
  expect(Object.values(topics)).toEqual(["detail-97", "detail-98", "detail-99", "detail-100", "detail-101", "detail-102"]);
  expect(guides.reduce((n, g) => n + g.sections.length, 0)).toBe(119);
  for (const [i, guide] of guides.entries()) {
   expect(lessons[i].subjectId).toBe("tyt-felsefe"); expect(guide.sections.length).toBeGreaterThanOrEqual(10);
   expect(guide.examples).toHaveLength(4); expect(guide.recall).toHaveLength(4);
   for (const section of guide.sections) { expect(section.paragraphs).toHaveLength(2); for (const paragraph of section.paragraphs) expect(paragraph.length).toBeGreaterThan(140); }
   for (const example of guide.examples) { expect(example.steps).toHaveLength(3); expect(example.prompt.length).toBeGreaterThan(50); for (const step of example.steps) expect(step.explanation.length).toBeGreaterThan(40); expect(example.check.length).toBeGreaterThan(25); expect(example.pitfall.length).toBeGreaterThan(25); }
  }
 });
 it("has sixty independent original five-choice cards with complete passages, distinct options and explanation", () => {
  const questions = lessons.flatMap(l => l.questions); expect(questions).toHaveLength(60); expect(new Set(questions.map(q => q.id)).size).toBe(60);
  for (const lesson of lessons) { expect(lesson.questions).toHaveLength(10); expect(lesson.tags).toContain("Özgün öğretim soruları");
   for (const q of lesson.questions) { expect(q.options).toHaveLength(5); expect(new Set(q.options.map(v => v.tr)).size).toBe(5); expect(q.passage!.tr.length).toBeGreaterThan(70); expect(q.answer).toBeGreaterThanOrEqual(0); expect(q.answer).toBeLessThan(5); expect(q.hint.tr.length).toBeGreaterThan(20); expect(q.explanation.tr.length).toBeGreaterThan(80); expect(questionContentIssues(q)).toEqual([]); }
  }
 });
 it("keeps keys attached to the actual relevant choices, including source corrections and limited conclusions", () => {
  const answer = (lesson: number, q: number) => { const row = lessons[lesson].questions[q]; return row.options[row.answer].tr; };
  expect(answer(0, 1)).toBe("Refleksif olma"); expect(answer(1, 3)).toBe("Yağmur yokken fıskiyenin çalışıp bahçeyi ıslatması");
  expect(answer(2, 0)).toBe("Tek temel kabul eden materyalist monizm"); expect(answer(2, 5)).toBe("Fenomenolojik betimleme için paranteze alma");
  expect(answer(3, 0)).toBe("Bilginin kaynağı"); expect(answer(3, 1)).toBe("Uygunluk");
  expect(answer(4, 4)).toBe("Kuram ve yasa farklı işlevlerdir; destek artışı zorunlu bir ad değiştirme basamağı değildir.");
  expect(answer(5, 2)).toBe("Ödeve uygunluk ile ödevden dolayı yapma ayrılmalıdır; ödül niyeti tek başına ödevden eylemek değildir.");
 });
 it("really redistributes twelve pieces while showing unmet need without declaring a universal moral score", () => {
  expect(allocate020("equal")).toEqual({ a: 6, b: 6, needA: 8, needB: 4, unmetA: 2, surplusB: 2 });
  expect(allocate020("need")).toEqual({ a: 8, b: 4, needA: 8, needB: 4, unmetA: 0, surplusB: 0 });
  for (const criterion of ["equal", "need"]) { const a = allocate020(criterion); expect(a.a + a.b).toBe(12); }
 });
 it("separates applying a criterion from reflexive examination of that same criterion", () => {
  const apply = scene(ids[0], { criterion: "need", angle: "apply" }), reflect = scene(ids[0], { criterion: "need", angle: "grounds" });
  expect(reflect.allocation).toEqual(apply.allocation); expect(reflect.nodes).toEqual(apply.nodes); expect(apply.decision).toBe("Ölçütü uygulama"); expect(reflect.decision).toBe("Ölçüte geri dönüş"); expect(reflect.question).toContain("gerekçem");
 });
 it("computes the four possible garden worlds and the single reverse-inference countermodel", () => {
  const direct = logic020("direct", false, true), reverse = logic020("reverse", false, true);
  expect(direct.valid).toBe(true); expect(direct.counterCount).toBe(0); expect(reverse.valid).toBe(false); expect(reverse.counterCount).toBe(1);
  expect(reverse.rows).toEqual([
   { rain: false, sprinkler: false, wet: false, premises: false, conclusion: false, counter: false },
   { rain: false, sprinkler: true, wet: true, premises: true, conclusion: false, counter: true },
   { rain: true, sprinkler: false, wet: true, premises: true, conclusion: true, counter: false },
   { rain: true, sprinkler: true, wet: true, premises: true, conclusion: true, counter: false },
  ]); expect(reverse.actual).toBe(1);
 });
 it("does not confuse a currently true conclusion with globally valid inference", () => {
  const current = scene(ids[1], { rule: "reverse", rain: true, sprinkler: false });
  expect(current.logic!.rows[current.logic!.actual].conclusion).toBe(true); expect(current.decision).toBe("Geçersiz");
  const dry = logic020("reverse", false, false); expect(dry.rows[dry.actual].premises).toBe(false); expect(dry.rows[dry.actual].counter).toBe(false);
 });
 it("counts independent ontological roots and preserves actual explanation edges", () => {
  const material = scene(ids[2], { foundation: "material" }), dual = scene(ids[2], { foundation: "dual" }), idea = scene(ids[2], { foundation: "idea" });
  expect([material, dual, idea].map(s => s.nodes.filter(n => n.root).length)).toEqual([1, 2, 1]);
  expect(dual.links.map(l => [l.from, l.to])).toEqual([[0, 2], [1, 3]]); expect(material.links.map(l => [l.from, l.to])).toEqual([[0, 1], [0, 2]]); expect(idea.nodes[0].label).toBe("İdea");
 });
 it("changes the acquisition/check direction and names all five criteria without endorsing them as infallible", () => {
  const source = scene(ids[3], { question: "source" }), check = scene(ids[3], { question: "criterion", test: "world" });
  expect(source.nodes.map(n => n.label)).toEqual(["Gözlem", "Yargı"]); expect(check.nodes.map(n => n.label)).toEqual(["Yargı", "Denetim"]);
  expect(source.decision).toBe("Bilgi kaynağı"); expect(check.decision).toBe("Doğruluk ölçütü");
  const labels = ["Uygunluk", "Tutarlılık", "Ortak kabul", "Apaçıklık", "Yarar"];
  for (const [i, test] of ["world", "system", "consensus", "clear", "work"].entries()) expect(scene(ids[3], { question: "criterion", test }).evidence[0]).toContain(labels[i]);
 });
 it("makes diagonal-only data fit both hypotheses and crossed data distinguish their actual predictions", () => {
  for (const hypothesis of ["heat", "damp"]) { const p = science020("paired", hypothesis); expect(p.tested).toBe(2); expect(p.matches).toBe(2); expect(p.distinguishable).toBe(false); expect(p.rows.filter(r => r.observed === null)).toHaveLength(2); }
  const heat = science020("crossed", "heat"), damp = science020("crossed", "damp"); expect(heat.matches).toBe(2); expect(damp.matches).toBe(4); expect(heat.tested).toBe(4);
  expect(heat.rows.map(r => r.observed)).toEqual([4, 10, 4, 10]); expect(heat.rows.map(r => r.prediction)).toEqual([4, 4, 10, 10]);
  expect(scene(ids[4], { data: "paired", hypothesis: "heat" }).decision).toBe("Henüz ayrılmıyor"); expect(scene(ids[4], { data: "crossed", hypothesis: "heat" }).decision).toBe("Veriye uymuyor"); expect(scene(ids[4], { data: "crossed", hypothesis: "damp" }).decision).toBe("Veriyle uyumlu");
 });
 it("keeps the action fixed while genuinely changing motive, knowledge and pressure context", () => {
  for (const [motive, label] of [["duty", "Ödev"], ["outcome", "Sonuç"], ["virtue", "Erdem"]]) for (const condition of ["free", "hidden", "threat"]) {
   const value = scene(ids[5], { motive, condition }); expect(value.nodes[3].text).toBe("Cüzdan sahibine geri verilir."); expect(value.decision).toBe(label + " odağı"); expect(value.links.map(l => [l.from, l.to])).toEqual([[0, 3], [1, 3], [2, 3]]);
  }
  expect(scene(ids[5], { condition: "hidden" }).nodes[0].text).toContain("gizlenmiş"); expect(scene(ids[5], { condition: "threat" }).nodes[1].text).toContain("tehdit");
 });
 it("has thirty-eight bounded states with real node targets and persistence that awards no learning evidence", () => {
  expect(states).toHaveLength(38); const base = initialState();
  for (const [id, input] of states) { const value = scene(id, input); expect(value.options).toContain(value.decision); expect(value.context.length).toBeGreaterThan(50);
   for (const link of value.links) { expect(value.nodes[link.from]).toBeDefined(); expect(value.nodes[link.to]).toBeDefined(); expect(link.from).not.toBe(link.to); }
   const persisted = { ...defaults, ...input, guess: value.decision, reason: "Açık öncül ve gerekçeyi bu olaydaki koşullarla karşılaştırıyorum. ".repeat(3).slice(0, 120), compared: true };
   for (const v of Object.values(persisted)) if (typeof v === "string") expect(v.length).toBeLessThanOrEqual(120);
   const parsed = stateSchema.parse({ ...base, explorations: { [`forge020-humanities:${id}`]: persisted } }); expect({ ...parsed, explorations: {} }).toEqual({ ...base, explorations: {} });
  }
 });
 it("rejects unknown lessons, prototype keys, invalid choices and non-boolean garden inputs explicitly", () => {
  for (const id of ["missing", "__proto__", "constructor", "toString"]) expect(() => scene(id)).toThrow(RangeError);
  for (const criterion of ["", "other", "__proto__"]) expect(() => allocate020(criterion)).toThrow(RangeError);
  expect(() => logic020("direct", 1 as unknown as boolean, false)).toThrow(RangeError);
  for (const [id, patch] of [[ids[0], { angle: "other" }], [ids[1], { rule: "other" }], [ids[2], { foundation: "other" }], [ids[3], { test: "__proto__" }], [ids[4], { hypothesis: "other" }], [ids[5], { motive: "constructor" }]] as [string, Record<string, string>][]) expect(() => scene(id, patch)).toThrow(RangeError);
 });
});
