import { describe, expect, it } from "vitest";
import { initialState, type AppState, type Response, type Session } from "../src/domain/model";
import { evaluateTrophies, nearestTrophies, newlyUnlocked, TROPHIES, trophyTotals } from "../src/domain/achievements";
import { hasEmblem } from "../src/components/TrophyEmblem";

const subjectOf = (lessonId: string) => (lessonId.startsWith("ayt") ? "ayt-matematik" : "tyt-kimya");
const r = (questionId: string, correct: boolean, extra: Partial<Response> = {}): Response => ({
  questionId,
  selected: correct ? 0 : 1,
  correct,
  assisted: false,
  confidence: "medium",
  ...extra,
});
let n = 0;
const session = (lessonId: string, date: string, responses: Response[], extra: Partial<Session> = {}): Session => ({
  id: `s${++n}`,
  lessonId,
  date,
  finishedAt: `${date}T10:${String(n).padStart(2, "0")}:00Z`,
  responses,
  kind: "learn",
  minutes: 10,
  note: "",
  ...extra,
});
const get = (state: AppState, id: string) => evaluateTrophies(state, subjectOf).find((t) => t.id === id)!;

describe("trophies come only from real evidence", () => {
  it("an untouched profile, reading time, notes and manual sessions without answers unlock nothing", () => {
    const state = initialState();
    state.notes = { a: "uzun bir not" };
    state.readingPages = { x: 40 };
    state.topicProgress = { t: { theory: "2026-11-01", questions: "2026-11-01" } };
    state.sessions = [session("tyt-a", "2026-11-01", [], { kind: "manual", minutes: 300 })];
    expect(evaluateTrophies(state, subjectOf).filter((t) => t.tier > 0)).toEqual([]);
  });

  it("assisted answers never count; independent ones do", () => {
    const state = initialState();
    state.sessions = [
      session("tyt-a", "2026-11-01", Array.from({ length: 10 }, (_, i) => r(`q${i}`, true, { assisted: true, helpLevel: 1 }))),
    ];
    expect(get(state, "soru-canavari").value).toBe(0);
    expect(get(state, "kusursuz-seri").value).toBe(0);
    state.sessions.push(session("tyt-a", "2026-11-02", Array.from({ length: 10 }, (_, i) => r(`q${i}`, true))));
    expect(get(state, "soru-canavari").value).toBe(10);
    expect(get(state, "kusursuz-seri").tier).toBe(1);
    expect(get(state, "ders:tyt-kimya").value).toBe(1);
  });

  it("repairs need a later independent correct answer; confident and double misses are tracked", () => {
    const state = initialState();
    state.sessions = [
      session("tyt-a", "2026-11-01", [r("x", false, { confidence: "high" }), r("y", false), r("z", false)]),
      session("tyt-a", "2026-11-02", [r("y", false), r("z", true, { assisted: true, helpLevel: 1 })]),
      session("tyt-a", "2026-11-03", [r("x", true), r("y", true)]),
    ];
    expect(get(state, "hata-mezarligi").value).toBe(2);
    expect(get(state, "tuzak-avcisi").value).toBe(1);
    expect(get(state, "gizli:inatci").value).toBe(1);
  });

  it("a 21-day seal needs the completing session to be at least 80 % independent", () => {
    const state = initialState();
    const done = session("tyt-a", "2026-11-22", [r("a", true), r("b", true), r("c", true), r("d", true), r("e", false)], { kind: "review" });
    state.sessions = [done];
    state.reviews = [{ id: "rv", lessonId: "tyt-a", anchorDate: "2026-11-01", targetDate: "2026-11-21", stage: 21, originSessionId: "s0", completedSessionId: done.id }];
    expect(get(state, "altin-bellek").value).toBe(1);
    expect(get(state, "tekrar-dongusu").value).toBe(1);
  });

  it("rhythm counts consecutive solving days and is deterministic", () => {
    const state = initialState();
    state.sessions = ["2026-11-01", "2026-11-02", "2026-11-03", "2026-11-05"].map((d) => session("tyt-a", d, [r(`q${d}`, true)]));
    expect(get(state, "ritim").value).toBe(3);
    expect(evaluateTrophies(state, subjectOf)).toEqual(evaluateTrophies(structuredClone(state), subjectOf));
  });

  it("nearest trophies never reveal secret ones", () => {
    const state = initialState();
    state.sessions = [session("tyt-a", "2026-11-01", [r("q", true)])];
    const near = nearestTrophies(evaluateTrophies(state, subjectOf));
    expect(near).toHaveLength(3);
    expect(near.some((t) => t.secret)).toBe(false);
  });
});

describe("difficulty-star trophies", () => {
  const starOf = (id: string) => Number(id.split("-")[1]) || undefined;
  const at = (state: AppState, id: string) => evaluateTrophies(state, subjectOf, starOf).find((t) => t.id === id)!;
  it("count distinct independent correct answers by star; assisted and wrong never count", () => {
    const state = initialState();
    state.sessions = [
      session("tyt-a", "2026-11-01", [
        r("q-9", true),
        r("q-9", true),
        r("q-10", true, { assisted: true }),
        r("q-8", false),
        r("q-7", true),
      ]),
    ];
    expect(at(state, "yildiz-avcisi").value).toBe(2);
    expect(at(state, "secici-zirve").value).toBe(1);
  });
  it("the ladder needs every star 1–10 in one subject", () => {
    const state = initialState();
    const all = Array.from({ length: 10 }, (_, i) => r(`q-${i + 1}`, true));
    state.sessions = [session("tyt-a", "2026-11-01", all.slice(0, 9))];
    expect(at(state, "yildiz-merdiveni").value).toBe(0);
    state.sessions.push(session("tyt-a", "2026-11-02", all.slice(9)));
    expect(at(state, "yildiz-merdiveni").value).toBe(1);
    expect(at(state, "yildiz-merdiveni").tier).toBe(1);
  });
});

describe("TYT Fen Platin", () => {
  const subjectFor = (lessonId: string) => lessonId.split("@")[0];
  // Twelve mastered lessons (≥ 5 answers, ≥ 80 % independent) give a subject its gold badge.
  const goldSessions = (subject: string, extra: Partial<Response> = {}) =>
    Array.from({ length: 12 }, (_, i) =>
      session(`${subject}@${i}`, "2026-11-01", Array.from({ length: 5 }, (_, k) => r(`${subject}-${i}-${k}`, true, extra))),
    );
  const fen = (state: AppState) => evaluateTrophies(state, subjectFor).find((t) => t.id === "platin:tyt-fen")!;

  it("is a fourth platinum trophy with its own emblem; 36 trophies in all", () => {
    expect(TROPHIES).toHaveLength(36);
    expect(new Set(TROPHIES.map((t) => t.id)).size).toBe(36);
    expect(TROPHIES.filter((t) => t.platinum).map((t) => t.id)).toEqual(["platin:tyt", "platin:tyt-fen", "platin:ayt", "platin:efsane"]);
    expect(TROPHIES.every((t) => hasEmblem(t.id))).toBe(true);
  });

  it("stays locked with two science golds and opens with all three", () => {
    const state = initialState();
    state.sessions = [...goldSessions("tyt-fizik"), ...goldSessions("tyt-kimya")];
    expect(evaluateTrophies(state, subjectFor).find((t) => t.id === "ders:tyt-kimya")!.tier).toBe(3);
    expect(fen(state)).toMatchObject({ tier: 0, value: 2, next: 3 });
    state.sessions.push(...goldSessions("tyt-biyoloji"));
    expect(fen(state)).toMatchObject({ tier: 3, value: 3, next: null });
    // The wider TYT platinum still needs every TYT subject.
    expect(evaluateTrophies(state, subjectFor).find((t) => t.id === "platin:tyt")!.tier).toBe(0);
  });

  it("never opens from reading, notes, time, manual records or answers given after opening help", () => {
    const state = initialState();
    state.notes = { a: "fizik notu" };
    state.readingPages = { x: 120 };
    state.topicProgress = { t: { theory: "2026-11-01", questions: "2026-11-01" } };
    state.sessions = [
      ...goldSessions("tyt-fizik", { assisted: true, helpLevel: 3 }),
      ...goldSessions("tyt-kimya", { assisted: true, helpLevel: 1 }),
      ...goldSessions("tyt-biyoloji", { assisted: true, helpLevel: 2 }),
      session("tyt-fizik@manual", "2026-11-02", [], { kind: "manual", minutes: 600 }),
    ];
    expect(fen(state)).toMatchObject({ tier: 0, value: 0 });
    expect(evaluateTrophies(state, subjectFor).filter((t) => t.tier > 0)).toEqual([]);
  });
});

describe("showcase totals and the nearest trophies", () => {
  it("the nearest three are ordered by progress toward the next tier, never secret or platinum", () => {
    const state = initialState();
    // Days 1–4 and 6 with an independent correct answer: Ritim 4 of 7.
    state.sessions = ["2026-11-01", "2026-11-02", "2026-11-03", "2026-11-04"].map((d) => session("tyt-a", d, [r(`n${d}`, true)]));
    // Three repaired mistakes (Hata Mezarlığı 3 of 25), one confident (Tuzak Avcısı bronze, 1 of 10).
    state.sessions.push(
      session("tyt-a", "2026-11-05", [r("m1", false, { confidence: "high" }), r("m2", false), r("m3", false)]),
      session("tyt-a", "2026-11-06", [r("m1", true), r("m2", true), r("m3", true)]),
    );
    const list = evaluateTrophies(state, subjectOf);
    // The secret Çok Yönlü (1 of 3) would rank second, but secrets never appear by name.
    expect(list.find((t) => t.id === "gizli:cok-yonlu")!.value).toBe(1);
    const near = nearestTrophies(list);
    expect(near.map((t) => t.id)).toEqual(["ritim", "hata-mezarligi", "tuzak-avcisi"]);
    const ratios = near.map((t) => t.value / (t.next as number));
    expect([...ratios].sort((a, b) => b - a)).toEqual(ratios);
  });

  it("the showcase progress bar counts opened trophies out of all 36", () => {
    const state = initialState();
    expect(trophyTotals(evaluateTrophies(state, subjectOf))).toEqual({ earned: 0, total: 36, gold: 0, percent: 0 });
    state.sessions = [session("tyt-a", "2026-11-01", Array.from({ length: 10 }, (_, i) => r(`t${i}`, true)))];
    const list = evaluateTrophies(state, subjectOf);
    expect(list.filter((t) => t.tier > 0).map((t) => t.id)).toEqual(["ders:tyt-kimya", "kusursuz-seri"]);
    expect(trophyTotals(list)).toEqual({ earned: 2, total: 36, gold: 0, percent: 6 });
  });
});

describe("unlock announcements", () => {
  it("only tiers above the stored record are celebrated; a first visit or a reload replays nothing", () => {
    const state = initialState();
    state.sessions = [session("tyt-a", "2026-11-01", Array.from({ length: 10 }, (_, i) => r(`u${i}`, true)))];
    const list = evaluateTrophies(state, subjectOf);
    expect(newlyUnlocked(list, null)).toEqual([]);
    expect(newlyUnlocked(list, {}).map((t) => t.id)).toEqual(["ders:tyt-kimya", "kusursuz-seri"]);
    const stored = Object.fromEntries(list.map((t) => [t.id, t.tier]));
    expect(newlyUnlocked(list, stored)).toEqual([]);
    expect(newlyUnlocked(list, { ...stored, "kusursuz-seri": 0 }).map((t) => t.id)).toEqual(["kusursuz-seri"]);
  });
});
