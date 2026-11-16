import { describe, expect, it } from "vitest";
import { initialState, stateSchema } from "../src/domain/model";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { forge022HumanitiesLessons as lessons, forge022HumanitiesGuides as guides, forge022HumanitiesTopics as topics, buildHumanitiesScene022 as scene, sampleSupport022, humanitiesDefaults022 as defaults } from "../src/learning/forge022Humanities";
const ids = ["paragrafta-anlatim-bicimleri", "ronesans-felsefesi", "15-17-yuzyil-felsefesi", "aydinlanma-felsefesi", "18-19-yuzyil-felsefesi", "cagdas-felsefe", "bilgi-ve-inanc"];
export const humanitiesStates022: [string, Record<string, string | number | boolean>][] = [];
for (const mode of ["story", "portrait", "explain", "argue"]) for (const stage of [0, 1, 2]) humanitiesStates022.push([ids[0], { mode, stage }]);
for (const manuscript of ["some", "all"]) for (const reading of ["some", "all"]) for (const authority of [false, true]) humanitiesStates022.push([ids[1], { manuscript, reading, authority }]);
for (const thinking of [false, true]) for (const outside of [false, true]) humanitiesStates022.push([ids[2], { thinking, outside }]);
for (const access of [false, true]) for (const data of [false, true]) for (const objection of [false, true]) humanitiesStates022.push([ids[3], { access, data, objection }]);
for (const powers of ["single", "separate"]) for (const review of [false, true]) humanitiesStates022.push([ids[4], { powers, review }]);
for (const quantifier of ["all", "some"]) for (const record of ["one", "counter", "all"]) humanitiesStates022.push([ids[5], { quantifier, record }]);
for (const route of ["sense", "report", "inference"]) for (const reliable of [false, true]) humanitiesStates022.push([ids[6], { route, reliable }]);
describe("022: anlatım, modern felsefe ve bilgi kaynakları", () => {
 it("maps all seven exact headings to the actual three subjects", () => {
  expect(lessons.map(l => l.id)).toEqual(ids); expect(Object.values(topics)).toEqual(["detail-277", "detail-109", "detail-110", "detail-111", "detail-112", "detail-113", "detail-77"]);
  expect(lessons.map(l => l.subjectId)).toEqual(["tyt-turkce", ...Array(5).fill("tyt-felsefe"), "tyt-din"]);
 });
 it("teaches broad periods in 166 deep sections and 36 full three-step worked examples", () => {
  expect(guides.map(g => g.sections.length)).toEqual([18, 16, 28, 18, 29, 35, 22]);
  expect(guides.map(g => g.examples.length)).toEqual([4, 4, 6, 4, 6, 8, 4]);
  for (const g of guides) { expect(g.recall.length).toBe(g.examples.length); for (const s of g.sections) { expect(s.paragraphs).toHaveLength(2); for (const p of s.paragraphs) expect(p.length).toBeGreaterThanOrEqual(200); }
   for (const e of g.examples) { expect(e.prompt.length).toBeGreaterThan(40); expect(e.steps).toHaveLength(3); for (const step of e.steps) expect(step.explanation.length).toBeGreaterThan(40); expect(e.check.length).toBeGreaterThan(25); expect(e.pitfall.length).toBeGreaterThan(25); }
  }
 });
 it("provides 100 standalone five-choice original cards with guidance and matching option reasons", () => {
  expect(lessons.map(l => l.questions.length)).toEqual([15, 10, 15, 10, 15, 20, 15]); const all = lessons.flatMap(l => l.questions); expect(new Set(all.map(q => q.id)).size).toBe(100);
  expect(new Set(all.map(q => q.guidance!.commonError)).size).toBe(100); expect(new Set(all.map(q => q.guidance!.check)).size).toBe(100);
  for (const q of all) { expect(q.passage!.tr.length).toBeGreaterThan(100); expect(q.options).toHaveLength(5); expect(new Set(q.options.map(x => x.tr)).size).toBe(5); expect(q.answer).toBeGreaterThanOrEqual(0); expect(q.answer).toBeLessThan(5); expect(questionContentIssues(q), q.id).toEqual([]);
   const help = questionGuidanceSchema.parse(q.guidance); expect(help.optionReasons).toHaveLength(5); expect(help.steps.length).toBeGreaterThanOrEqual(2); for (const reason of help.optionReasons) expect(reason.length).toBeGreaterThan(15); expect(q.explanation.tr.length).toBeGreaterThan(100);
  }
 });
 it("retains the actual correct concepts across all seven authored packs", () => {
  const key = (l: number, i: number) => { const q = lessons[l].questions[i]; return q.options[q.answer].tr; };
  expect(key(0, 0)).toBe("Öyküleme"); expect(key(0, 5)).toContain("Çizim yöntemi okura öğretilmemiş"); expect(key(1, 1)).toBe("Filolojik kaynak incelemesi");
  expect(key(2, 4)).toBe("Şu anda düşünen öznenin varlığı"); expect(key(2, 8)).toContain("Zorunluluğu anlayıp"); expect(key(3, 5)).toContain("Yetkiyi ayırıp");
  expect(key(4, 1)).toContain("deneyden bağımsızlık"); expect(key(4, 4)).toBe("Ödevden hareket etme"); expect(key(4, 6)).toContain("yalnız araç"); expect(key(5, 3)).toContain("ideal alanla özdeş değildir");
  expect(key(5, 7)).toContain("fiilen yanlışlandığı henüz söylenemez"); expect(key(6, 2)).toContain("Kopya sayısı tek başına"); expect(key(6, 6)).toContain("istisna bağlamları korunur");
 });
 it("unfolds a real event sequence but does not invent event links in the simultaneous portrait", () => {
  const start = scene(ids[0], { mode: "story", stage: 0 }), end = scene(ids[0], { mode: "story", stage: 2 });
  expect(start.context).toBe(end.context); expect(start.nodes.map(n => n.active)).toEqual([true, false, false]); expect(end.nodes.map(n => n.active)).toEqual([true, true, true]); expect(start.links.map(l => l.active)).toEqual([false, false]); expect(end.links.map(l => l.active)).toEqual([true, true]);
  expect(scene(ids[0], { mode: "portrait" }).links).toEqual([]); expect(scene(ids[0], { mode: "portrait" }).decision).toBe("Betimleme"); expect(scene(ids[0], { mode: "explain" }).links[1].label).toBe("Koşulun etkisi"); expect(scene(ids[0], { mode: "argue" }).decision).toBe("Tartışma");
 });
 it("distinguishes exact manuscript scope from weaker implication and rejects fame as textual proof", () => {
  const wider = scene(ids[1]), exact = scene(ids[1], { manuscript: "all" }), weaker = scene(ids[1], { manuscript: "all", reading: "some" });
  expect(wider.context).toContain("en az bir öğrenci var"); expect(wider.decision).toBe("Yorum genişletir"); expect(exact.decision).toBe("Tam kapsam eşleşir"); expect(weaker.decision).toBe("Yorum daraltır"); expect(weaker.reason).toContain("sınırlı sonuç yine metinden çıkar");
  for (const authority of [false, true]) { const s = scene(ids[1], { authority }); expect(s.links[1]).toMatchObject({ from: 3, to: 2, active: false }); expect(s.context).toContain("özgün olduğu hakkında veri yok"); }
 });
 it("keeps cogito directed at the thinking subject and treats outside observation as a separate source", () => {
  const base = scene(ids[2]), added = scene(ids[2], { outside: true }), none = scene(ids[2], { thinking: false }); expect(base.links[0]).toMatchObject({ from: 0, to: 1, active: true }); expect(base.links[1]).toMatchObject({ from: 0, to: 2, active: false });
  expect(added.context).toContain("Bağımsız gözlem kaydı, dış dünyadaki ağacın varlığına dayanak sunuyor."); expect(added.context).not.toContain("bağımsız bir kayıt ise henüz yok");
  expect(scene(ids[2], { thinking: false, outside: true }).context).toContain("dış dünyadaki ağacın varlığına dayanak sunuyor");
  expect(added.links).toEqual(base.links); expect(added.nodes[2].active).toBe(true); expect(added.decision).toBe("İki ayrı dayanak"); expect(none.decision).toBe("Bu yolda veri yok"); expect(none.context).toContain("yokluğunu kanıtlamaz");
 });
 it("opens exactly the selected public reasoning routes without issuing a truth or moral score", () => {
  for (const [access, data, objection] of [[true, false, false], [false, true, true], [true, true, true]]) { const s = scene(ids[3], { access, data, objection }); expect(s.links.map(l => l.active)).toEqual([access, data, objection]); expect(s.gates!.map(g => g.open)).toEqual([access, data, objection]); expect(s.decision).toBe(access && data && objection ? "Üç yol da açık" : "En az bir yol kapalı"); }
 });
 it("changes real authority holders while preserving the three functions and separate review switch", () => {
  const one = scene(ids[4], { powers: "single", review: true }), divided = scene(ids[4], { powers: "separate", review: false });
  expect(new Set(one.powers!.map(p => p.holder)).size).toBe(1); expect(one.decision).toBe("Yetki tek makamda"); expect(new Set(divided.powers!.map(p => p.holder)).size).toBe(3); expect(divided.decision).toBe("Ayrım var, yol eksik"); expect(divided.links[2].active).toBe(false); expect(scene(ids[4], { review: true }).decision).toBe("Ayrım ve denetim var");
 });
 it("evaluates finite all/some claims with explicit unknowns and the genuine observed counterexample", () => {
  expect(sampleSupport022("all", "one")).toMatchObject({ yes: 1, no: 0, unknown: 4, decision: "Kapsam eksik" }); expect(sampleSupport022("all", "counter")).toMatchObject({ yes: 1, no: 1, unknown: 3, decision: "Karşı örnek var" });
  expect(sampleSupport022("some", "counter").decision).toBe("Tanık var"); expect(sampleSupport022("all", "all").decision).toBe("Bu grupta sağlanır");
  expect(scene(ids[5], { record: "counter" }).links[1].label).toBe("Karşı örnek"); expect(scene(ids[5], { quantifier: "some", record: "counter" }).links[1].label).toBe("Bu savı çürütmez");
 });
 it("distinguishes direct hearing, source-checked testimony and a bounded causal inference", () => {
  const sense = scene(ids[6]), report = scene(ids[6], { route: "report" }), checked = scene(ids[6], { route: "report", reliable: true }), inference = scene(ids[6], { route: "inference" });
  expect(sense.decision).toBe("Duyusal veri"); expect(sense.links[1].active).toBe(false); expect(report.links[0].active).toBe(false); expect(checked.links[0].active).toBe(true); expect(checked.decision).toBe("Denetlenen aktarım"); expect(inference.decision).toBe("Akıl yürütme"); expect(inference.reason).toContain("Olası nedeni");
 });
 it("keeps all 48 bounded combinations internally linked and persists no scored evidence", () => {
  expect(humanitiesStates022).toHaveLength(48); const base = initialState();
  for (const [id, patch] of humanitiesStates022) { const s = scene(id, patch); expect(s.options).toContain(s.decision); expect(s.context.length).toBeGreaterThan(100); for (const link of s.links) { expect(s.nodes[link.from]).toBeDefined(); expect(s.nodes[link.to]).toBeDefined(); expect(link.from).not.toBe(link.to); }
   const saved = { ...defaults, ...patch, guess: s.decision, reason: "Metindeki veri ile sonucun kapsamını ayırıp hangi okun neye dayandığını karşılaştırıyorum. ".repeat(3).slice(0, 120), compared: true };
   for (const v of Object.values(saved)) if (typeof v === "string") expect(v.length).toBeLessThanOrEqual(120);
   const parsed = stateSchema.parse({ ...base, explorations: { [`forge022-humanities:${id}`]: saved } }); expect({ ...parsed, explorations: {} }).toEqual({ ...base, explorations: {} });
  }
 });
 it("rejects prototype IDs, invalid bounded options and malformed controls instead of coercing them", () => {
  for (const id of ["missing", "__proto__", "constructor", "toString", "hasOwnProperty"]) expect(() => scene(id)).toThrow(RangeError);
  for (const [id, key] of [[ids[0], "mode"], [ids[1], "manuscript"], [ids[1], "reading"], [ids[4], "powers"], [ids[5], "quantifier"], [ids[5], "record"], [ids[6], "route"]]) for (const v of ["", "missing", "__proto__", 1]) expect(() => scene(id, { [key]: v })).toThrow(RangeError);
  for (const [id, key] of [[ids[1], "authority"], [ids[2], "thinking"], [ids[2], "outside"], [ids[3], "access"], [ids[3], "data"], [ids[3], "objection"], [ids[4], "review"], [ids[6], "reliable"]]) expect(() => scene(id, { [key]: "true" })).toThrow(RangeError);
  for (const stage of [-1, 3, .5, NaN, Infinity]) expect(() => scene(ids[0], { stage })).toThrow(RangeError);
  for (const input of [null, [], 1]) expect(() => scene(ids[0], input as never)).toThrow(RangeError);
 });
});
