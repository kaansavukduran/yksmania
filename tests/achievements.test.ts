import { describe, expect, it } from "vitest";
import { initialState, type AppState, type Response, type Session } from "../src/domain/model";
import { evaluateTrophies, nearestTrophies } from "../src/domain/achievements";

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
