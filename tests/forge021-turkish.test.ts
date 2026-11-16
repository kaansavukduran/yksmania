import { describe, expect, it } from "vitest";
import { initialState, stateSchema } from "../src/domain/model";
import { questionContentIssues } from "../src/domain/questionContent";
import { forge021TurkishLessons as lessons, forge021TurkishGuides as guides, forge021TurkishTopics as topics, turkishCases021, buildTurkishScene021 as scene, validateOrder021, moveSentence021, insertionPosition021, turkishDefaults021 as defaults } from "../src/learning/forge021Turkish";
const ids = ["paragrafta-siralama", "paragrafta-cumle-ekleme", "paragrafta-bosluk-doldurma"];
function permutations(value: string): string[] { return value.length ? [...value].flatMap((letter, i) => permutations(value.slice(0, i) + value.slice(i + 1)).map(rest => letter + rest)) : [""]; }
describe("Türkçe 021: tam metinde sıra, ekleme ve eksik yargı", () => {
 it("prepares only the three new Turkish headings with deep explanations and complete three-step worked examples", () => {
  expect(lessons.map(l => l.id)).toEqual(ids); expect(Object.values(topics)).toEqual(["detail-274", "detail-275", "detail-276"]);
  expect(guides.reduce((n, g) => n + g.sections.length, 0)).toBe(42);
  for (const [i, guide] of guides.entries()) { expect(lessons[i].subjectId).toBe("tyt-turkce"); expect(guide.sections).toHaveLength(14); expect(guide.examples).toHaveLength(4); expect(guide.recall).toHaveLength(4);
   for (const section of guide.sections) { expect(section.paragraphs).toHaveLength(2); for (const p of section.paragraphs) expect(p.length).toBeGreaterThan(180); }
   for (const example of guide.examples) { expect(example.steps).toHaveLength(3); expect(example.prompt.length).toBeGreaterThan(70); for (const step of example.steps) expect(step.explanation.length).toBeGreaterThan(50); expect(example.answer.length).toBeGreaterThan(10); expect(example.check.length).toBeGreaterThan(30); expect(example.pitfall.length).toBeGreaterThan(30); }
  }
 });
 it("has thirty original standalone five-choice questions with their actual full passages", () => {
  const questions = lessons.flatMap(l => l.questions); expect(questions).toHaveLength(30); expect(new Set(questions.map(q => q.id)).size).toBe(30);
  for (const l of lessons) for (const q of l.questions) { expect(q.passage!.tr.length).toBeGreaterThan(70); expect(q.options).toHaveLength(5); expect(new Set(q.options.map(o => o.tr)).size).toBe(5); expect(q.answer).toBeGreaterThanOrEqual(0); expect(q.answer).toBeLessThan(5); expect(q.hint.tr.length).toBeGreaterThan(25); expect(q.explanation.tr.length).toBeGreaterThan(100); expect(questionContentIssues(q)).toEqual([]); }
 });
 it("attaches keys to the relevant answer rather than accidentally rotating labels", () => {
  const answer = (lesson: number, index: number) => { const q = lessons[lesson].questions[index]; return q.options[q.answer].tr; };
  expect(answer(0, 0)).toBe("II → I → III"); expect(answer(0, 5)).toBe("II ile IV"); expect(answer(0, 6)).toContain("Yeni bir tarama yöntemi");
  expect(answer(1, 0)).toBe("II. cümleden sonra"); expect(answer(1, 1)).toBe("Parçanın başına"); expect(answer(1, 4)).toBe("IV. cümleden sonra");
  expect(answer(2, 3)).toContain("ek dayanak olmadan söylenemez"); expect(answer(2, 6)).toBe("ayar düğmesi işlem sırasında yanlışlıkla çevrildi");
 });
 it("uses seven authored whole-text cases without claiming to parse arbitrary Turkish", () => {
  expect(ids.map(id => turkishCases021(id).length)).toEqual([2, 2, 3]);
  for (const id of ids) for (const item of turkishCases021(id)) { const s = scene(id, item.id); expect(s.context.length).toBeGreaterThan(50); expect(s.sentence).toBe(s.nodes.map(n => n.text).join(" ")); expect(s.nodes.every(n => n.text.length > 15)).toBe(true); }
 });
 it("has exactly one fully linked order among all 120 permutations in each sequence case", () => {
  const orders = permutations("ABCDE"); expect(new Set(orders).size).toBe(120);
  for (const item of turkishCases021(ids[0])) { const complete: string[] = [];
   for (const order of orders) { const s = scene(ids[0], item.id, { order }); expect(s.nodes.map(n => n.id).join("")).toBe(order); if (s.decision === "Bağlar tam") complete.push(order); }
   expect(complete).toEqual(["ABCDE"]);
  }
 });
 it("reattaches real prerequisite links to the new positions when complete sentences move", () => {
  const s = scene(ids[0], "arsiv", { order: "CADBE" });
  expect(s.links[0]).toMatchObject({ sourceId: "A", targetId: "B", source: 1, target: 3, valid: true });
  expect(s.links[1]).toMatchObject({ sourceId: "B", targetId: "C", source: 3, target: 0, valid: false });
  expect(s.nodes[0].text).toContain("bu gruplar"); expect(s.decision).toBe("Bağ eksik");
 });
 it("moves actual sentence identities one step and preserves boundary order without mutation", () => {
  const initial = "CADBE"; expect(moveSentence021(initial, 0, 1)).toBe("ACDBE"); expect(initial).toBe("CADBE");
  expect(moveSentence021("ABCDE", 0, -1)).toBe("ABCDE"); expect(moveSentence021("ABCDE", 4, 1)).toBe("ABCDE"); expect(moveSentence021("ABCDE", 3, -1)).toBe("ABDCE");
 });
 it("finds the unique insertion slot from both actual left and right requirements", () => {
  for (const [caseId, expectedSlot] of [["olcum", 2], ["yontem", 1]] as const) {
   const complete: number[] = [];
   for (let slot = 0; slot <= 4; slot++) { const s = scene(ids[1], caseId, { slot }); expect(s.nodes[slot].id).toBe("X"); expect(s.nodes).toHaveLength(5); if (s.decision === "Bağlar tam") complete.push(slot); }
   expect(complete).toEqual([expectedSlot]);
  }
 });
 it("keeps before/after numbering faithful to the actual insertion position", () => {
  expect(insertionPosition021(0)).toBe("Parçanın başına"); expect(insertionPosition021(2)).toBe("II. cümleden sonra"); expect(insertionPosition021(4)).toBe("IV. cümleden sonra");
  const s = scene(ids[1], "olcum", { slot: 2 }); expect(s.order).toBe("ABXCD"); expect(s.nodes[2].text).toContain("18 birim"); expect(s.links[2]).toMatchObject({ source: 2, target: 3, valid: true }); expect(s.evidence).toContain("Seçili yer: II. cümleden sonra.");
 });
 it("can make a blank candidate fit the left side while the right-side antecedent still fails", () => {
  const wrong = scene(ids[2], "engel", { candidate: 1 }); expect(wrong.links.map(l => l.valid)).toEqual([true, false]); expect(wrong.decision).toBe("Bağ eksik");
  const correct = scene(ids[2], "engel", { candidate: 0 }); expect(correct.links.map(l => l.valid)).toEqual([true, true]); expect(correct.nodes.map(n => n.id)).toEqual(["A", "X", "B"]); expect(correct.decision).toBe("Bağlar tam");
 });
 it("distinguishes an opening claim, a middle contrast and a final limited conclusion in all nine candidate states", () => {
  for (const [caseId, expectedRole, expectedOrder] of [["neden", "Uyarı yargısı", "XAB"], ["engel", "Karşıtlık ve sınır", "AXB"], ["kapsam", "Sınırlı sonuç", "ABX"]]) {
   for (let candidate = 0; candidate < 3; candidate++) { const s = scene(ids[2], caseId, { candidate }); expect(s.role).toBe(expectedRole); expect(s.order).toBe(expectedOrder); expect(s.decision).toBe(candidate === 0 ? "Bağlar tam" : "Bağ eksik"); }
  }
  expect(scene(ids[2], "kapsam", { candidate: 2 }).reason).toContain("yanlış olduğunu göstermez");
 });
 it("has valid node targets and schema-safe persistence in all 259 input combinations without learning credit", () => {
  const base = initialState(); let count = 0;
  for (const id of ids) for (const item of turkishCases021(id)) {
   const variants = item.kind === "sequence" ? permutations("ABCDE").map(order => ({ order })) : item.kind === "insertion" ? Array.from({ length: 5 }, (_, slot) => ({ slot })) : Array.from({ length: 3 }, (_, candidate) => ({ candidate }));
   for (const input of variants) { const s = scene(id, item.id, input); count++;
    for (const link of s.links) { expect(s.nodes[link.source]?.id).toBe(link.sourceId); expect(s.nodes[link.target]?.id).toBe(link.targetId); expect(link.source).not.toBe(link.target); }
    const values = { ...defaults, case: item.id, ...input, guess: s.decision, reason: "Tam metindeki öncülü, iki komşuyu ve kapsamı birlikte denetliyorum. ".repeat(3).slice(0, 120), compared: true };
    const parsed = stateSchema.parse({ ...base, explorations: { [`forge021-turkish:${id}`]: values } }); expect({ ...parsed, explorations: {} }).toEqual({ ...base, explorations: {} });
   }
  } expect(count).toBe(259);
 });
 it("rejects malformed permutations, positions, candidates and prototype identities explicitly", () => {
  for (const value of ["", "ABCD", "AABCDE", "AABCD", "ABCDX", "abcde", "__proto__"]) expect(() => validateOrder021(value)).toThrow(RangeError);
  for (const id of ["missing", "__proto__", "constructor", "toString"]) expect(() => turkishCases021(id)).toThrow(RangeError);
  expect(() => scene(ids[0], "missing")).toThrow(RangeError); expect(() => scene(ids[0], "arsiv", null as never)).toThrow(RangeError);
  for (const slot of [-1, 5, .5, NaN, Infinity]) expect(() => scene(ids[1], "olcum", { slot })).toThrow(RangeError);
  for (const candidate of [-1, 3, .5, NaN, Infinity]) expect(() => scene(ids[2], "neden", { candidate })).toThrow(RangeError);
  expect(() => moveSentence021("ABCDE", -1, 1)).toThrow(RangeError); expect(() => moveSentence021("ABCDE", 1, 0)).toThrow(RangeError);
 });
});
