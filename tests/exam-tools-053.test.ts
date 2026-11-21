import { describe, expect, it } from "vitest";
import { initialState } from "../src/domain/model";
import { validateState } from "../src/domain/storage";
import { beginExam, changeExam, examCatalogue, finishExam } from "../src/domain/exams";
import {
  EXAM_BLOCKS,
  defaultBlockOrder,
  loadBlockOrder,
  moveBlock,
  normalizeBlockOrder,
  orderExamItems,
  saveBlockOrder,
} from "../src/domain/examOrder";
import {
  currentItemMs,
  recordView,
  secondRoundIndices,
  secondRoundStep,
  secondRoundSummary,
  slowestItems,
  spokenDuration,
  timePulse,
} from "../src/domain/examPacing";
import { osymDistribution } from "../src/domain/examDistribution";
import { osymRows } from "../src/learning/osym";
import { subjects } from "../src/domain/content";
import curriculum from "../src/data/curriculum.json";

const blockOf = (exam: "TYT" | "AYT", subjectId: string) =>
  EXAM_BLOCKS[exam].find((b) => b.subjects.includes(subjectId))!.id;

describe("ders sırası", () => {
  it("normalizes, moves and remembers a block order without touching invalid input", () => {
    expect(normalizeBlockOrder("TYT", ["fen", "turkce"])).toEqual(defaultBlockOrder("TYT"));
    expect(normalizeBlockOrder("TYT", ["fen", "fen", "turkce", "sosyal"])).toEqual(defaultBlockOrder("TYT"));
    const order = ["turkce", "sosyal", "matematik", "fen"];
    expect(normalizeBlockOrder("TYT", order)).toEqual(order);
    expect(moveBlock(order, "turkce", -1)).toEqual(order);
    expect(moveBlock(order, "matematik", -1)).toEqual(["turkce", "matematik", "sosyal", "fen"]);
    expect(moveBlock(order, "fen", 1)).toEqual(order);
    const memory = new Map<string, string>();
    const store = { getItem: (k: string) => memory.get(k) ?? null, setItem: (k: string, v: string) => void memory.set(k, v) };
    expect(loadBlockOrder("TYT", store)).toEqual(defaultBlockOrder("TYT"));
    saveBlockOrder("TYT", order, store);
    saveBlockOrder("AYT", ["fizik", "matematik", "kimya", "biyoloji"], store);
    expect(loadBlockOrder("TYT", store)).toEqual(order);
    expect(loadBlockOrder("AYT", store)).toEqual(["fizik", "matematik", "kimya", "biyoloji"]);
    memory.set("yksmania.examBlockOrder.v1", "{bozuk");
    expect(loadBlockOrder("TYT", store)).toEqual(defaultBlockOrder("TYT"));
    const throwing = { getItem: () => { throw Error("blocked"); }, setItem: () => { throw Error("blocked"); } };
    expect(loadBlockOrder("AYT", throwing)).toEqual(defaultBlockOrder("AYT"));
    expect(() => saveBlockOrder("AYT", order, throwing)).not.toThrow();
  });

  it("applies the chosen order to a mixed draft without changing its questions or counts", () => {
    const spec = examCatalogue().find((s) => s.id === "mixed-tyt")!;
    const order = ["turkce", "sosyal", "matematik", "fen"];
    const plain = beginExam(initialState(), spec, 5000, "learning").examDraft!;
    const ordered = beginExam(initialState(), spec, 5000, "learning", order).examDraft!;
    expect(new Set(ordered.items.map((i) => i.id))).toEqual(new Set(plain.items.map((i) => i.id)));
    expect(ordered.items).toHaveLength(plain.items.length);
    const blocks = ordered.items.map((i) => blockOf("TYT", i.subjectId));
    const firstSeen = [...new Set(blocks)];
    expect(firstSeen).toEqual(order);
    // Contiguous blocks; inside a block the original order is kept.
    for (const id of order) {
      const own = ordered.items.filter((i) => blockOf("TYT", i.subjectId) === id).map((i) => i.id);
      expect(own).toEqual(plain.items.filter((i) => blockOf("TYT", i.subjectId) === id).map((i) => i.id));
    }
    expect(validateState(JSON.parse(JSON.stringify({ ...initialState(), examDraft: ordered }))).examDraft).toEqual(ordered);
    // Branch practices ignore an order.
    const branch = examCatalogue().find((s) => s.id === "branch-tyt-turkce")!;
    expect(beginExam(initialState(), branch, 1, "learning", order).examDraft!.items).toEqual(
      beginExam(initialState(), branch, 1, "learning").examDraft!.items,
    );
    // Unknown subjects stay at the end in their own order.
    expect(
      orderExamItems("AYT", [{ subjectId: "x" }, { subjectId: "ayt-fizik" }, { subjectId: "ayt-matematik" }], ["fizik", "matematik", "kimya", "biyoloji"]),
    ).toEqual([{ subjectId: "ayt-fizik" }, { subjectId: "ayt-matematik" }, { subjectId: "x" }]);
  });
});

describe("soru başına süre", () => {
  const spec = () => examCatalogue().find((s) => s.id === "branch-tyt-turkce")!;

  it("adds viewing time from absolute timestamps on question change and at finish", () => {
    let state = beginExam(initialState(), spec(), 10_000);
    const id = state.examDraft!.id;
    expect(state.examDraft!.itemMs!.every((v) => v === 0)).toBe(true);
    expect(state.examDraft!.viewedAt).toBe(10_000);
    // Answers and flags never write time.
    state = changeExam(state, id, { type: "answer", index: 0, value: 1 }, 25_000);
    state = changeExam(state, id, { type: "flag", index: 0 }, 26_000);
    expect(state.examDraft!.itemMs![0]).toBe(0);
    state = changeExam(state, id, { type: "index", index: 3 }, 40_000);
    expect(state.examDraft!.itemMs![0]).toBe(30_000);
    expect(state.examDraft!.viewedAt).toBe(40_000);
    expect(currentItemMs(state.examDraft!, 52_500)).toBe(12_500);
    state = changeExam(state, id, { type: "index", index: 0 }, 50_000);
    state = changeExam(state, id, { type: "index", index: 3 }, 55_000);
    expect(state.examDraft!.itemMs![0]).toBe(35_000);
    expect(state.examDraft!.itemMs![3]).toBe(10_000);
    const ended = finishExam(state, id, 61_000);
    const session = ended.examSessions[0];
    expect(session.itemMs![3]).toBe(16_000);
    expect(session.itemMs![0]).toBe(35_000);
    expect("viewedAt" in session).toBe(false);
    expect(validateState(JSON.parse(JSON.stringify(ended))).examSessions[0]).toEqual(session);
    expect(slowestItems(session)!.map((r) => [r.index, r.ms, r.status])).toEqual([
      [0, 35_000, session.items[0].answer === 1 ? "correct" : "wrong"],
      [3, 16_000, "blank"],
    ]);
  });

  it("caps the open question at the deadline when time runs out", () => {
    let state = beginExam(initialState(), spec(), 0);
    const draft = state.examDraft!;
    state = changeExam(state, draft.id, { type: "index", index: 1 }, 1000);
    const ended = finishExam(state, draft.id, draft.deadline + 99_999);
    expect(ended.examSessions[0].itemMs![1]).toBe(draft.deadline - 1000);
    expect(ended.examSessions[0].timedOut).toBe(true);
  });

  it("opens old drafts and sessions without timing and starts measuring only from the next change", () => {
    const state = beginExam(initialState(), spec(), 1000);
    const { itemMs: _a, viewedAt: _b, ...old } = state.examDraft!;
    void _a;
    void _b;
    const restored = validateState(JSON.parse(JSON.stringify({ ...state, examDraft: old })));
    expect(restored.examDraft!.itemMs).toBeUndefined();
    expect(timePulse(restored.examDraft!, 9000)).toBeNull();
    const moved = changeExam(restored, old.id, { type: "index", index: 2 }, 5000);
    // Elapsed time before the upgrade is unknown, so nothing is attributed.
    expect(moved.examDraft!.itemMs!.every((v) => v === 0)).toBe(true);
    expect(moved.examDraft!.viewedAt).toBe(5000);
    const oldEnded = finishExam(restored, old.id, 7000);
    expect(oldEnded.examSessions[0].itemMs).toBeUndefined();
    expect(slowestItems(oldEnded.examSessions[0])).toBeNull();
    // Invalid timing is rejected.
    expect(() =>
      validateState(JSON.parse(JSON.stringify({ ...state, examDraft: { ...state.examDraft!, itemMs: [1] } }))),
    ).toThrow();
    expect(() =>
      validateState(JSON.parse(JSON.stringify({ ...state, examDraft: { ...state.examDraft!, viewedAt: 1 } }))),
    ).toThrow();
  });

  it("warns past 1.5 times the per-question average", () => {
    const draft = beginExam(initialState(), spec(), 0).examDraft!;
    const average = (draft.durationSeconds * 1000) / draft.items.length;
    expect(timePulse(draft, Math.floor(average * 1.5))!.over).toBe(false);
    const late = timePulse(draft, Math.ceil(average * 1.5) + 1)!;
    expect(late.over).toBe(true);
    expect(late.averageMs).toBe(average);
    expect(recordView(draft, 0, -50).viewedAt).toBe(0);
    expect(spokenDuration(59_400)).toBe("59 sn");
    expect(spokenDuration(125_000)).toBe("2 dk 5 sn");
    expect(spokenDuration(120_000)).toBe("2 dk");
  });
});

describe("2. tur", () => {
  it("selects flagged and blank questions and steps only between them", () => {
    const draft = { answers: [0, null, 1, 2, null, 3], flagged: [3, 0] };
    expect(secondRoundIndices(draft)).toEqual([0, 1, 3, 4]);
    expect(secondRoundSummary(draft, 17 * 60_000 + 1)).toEqual({ flagged: 2, blank: 2, minutes: 18 });
    const round = [0, 1, 3, 4];
    expect(secondRoundStep(round, 1, 1)).toBe(3);
    expect(secondRoundStep(round, 3, -1)).toBe(1);
    expect(secondRoundStep(round, 4, 1)).toBeNull();
    expect(secondRoundStep(round, 0, -1)).toBeNull();
    // Outside the list: the nearest list question in that direction.
    expect(secondRoundStep(round, 2, 1)).toBe(3);
    expect(secondRoundStep(round, 2, -1)).toBe(1);
    expect(secondRoundStep(round, 5, 1)).toBeNull();
    expect(secondRoundIndices({ answers: [0, 1], flagged: [] })).toEqual([]);
  });
});

describe("ÖSYM dağılımı", () => {
  const names = subjects.map((s) => ({ id: s.id, name: s.name.tr }));
  it("counts yearly questions per subject, top official headings and compares the mock honestly", () => {
    const tyt = osymDistribution(osymRows, "TYT", names, curriculum, examCatalogue().find((s) => s.id === "mixed-tyt")!.items)!;
    expect(tyt.rows.map((r) => r.subjectId).slice(0, 2)).toEqual(["tyt-turkce", "tyt-tarih"]);
    expect(tyt.rows.at(-1)!.subjectId).toBe("tyt-biyoloji");
    expect(tyt.first).toBe(2018);
    expect(tyt.last).toBe(2026);
    const turkce = tyt.rows.find((r) => r.subjectId === "tyt-turkce")!;
    expect([turkce.min, turkce.max, turkce.latest]).toEqual([40, 40, 40]);
    expect(turkce.top).toHaveLength(3);
    expect(turkce.top[0].count).toBeGreaterThanOrEqual(turkce.top[1].count);
    expect(turkce.top.every((h) => h.title.length > 0 && h.id.startsWith("TYT-TUR"))).toBe(true);
    // Philosophy questions answered instead of religion are kept apart.
    expect(tyt.altLatest).toBe(5);
    expect(tyt.totalLatest).toBe(120);
    const felsefe = tyt.rows.find((r) => r.subjectId === "tyt-felsefe")!;
    expect([felsefe.min, felsefe.max]).toEqual([4, 5]);
    expect(tyt.totalMock).toBe(120);
    for (const row of tyt.rows) expect(row.differs).toBe(row.mock! < row.min || row.mock! > row.max);
    const ayt = osymDistribution(osymRows, "AYT", names, curriculum)!;
    expect(ayt.rows.map((r) => r.subjectId)).toEqual(
      expect.arrayContaining(["ayt-matematik", "ayt-geometri", "ayt-fizik", "ayt-kimya", "ayt-biyoloji"]),
    );
    expect(ayt.rows.every((r) => r.mock === undefined && !r.differs)).toBe(true);
    expect(ayt.totalLatest).toBe(80);
    expect(osymDistribution([], "TYT", names, curriculum)).toBeNull();
  });

  it("flags a mock count outside the official range", () => {
    const rows = osymRows.filter((r) => r.e === "AYT");
    const d = osymDistribution(rows, "AYT", names, curriculum, [
      ...Array.from({ length: 20 }, () => ({ subjectId: "ayt-fizik" })),
      ...Array.from({ length: 13 }, () => ({ subjectId: "ayt-kimya" })),
    ])!;
    expect(d.rows.find((r) => r.subjectId === "ayt-fizik")!.differs).toBe(true);
    expect(d.rows.find((r) => r.subjectId === "ayt-kimya")!.differs).toBe(false);
    expect(d.rows.find((r) => r.subjectId === "ayt-biyoloji")!.mock).toBe(0);
    expect(d.differs).toBe(true);
  });
});
