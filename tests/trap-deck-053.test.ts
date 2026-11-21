import { describe, expect, it } from "vitest";
import type { OsymRow } from "../src/domain/osymPatterns";
import { osymRows } from "../src/learning/osym";
import { osymTopicCount, trapCards, trapSimilarity, trapSubjectOrder } from "../src/domain/trapDeck";

const row = (x: Partial<OsymRow>): OsymRow => ({
  y: 2024,
  e: "TYT",
  test: "Temel Matematik",
  q: 1,
  subject: "tyt-matematik",
  a: "A",
  c: "H1",
  c2: null,
  topic: "detail-1",
  topic2: null,
  topicNote: "not",
  pattern: "Kalıp",
  skill: "Beceri",
  trap: "Tuzak",
  form: "düz",
  difficulty: 1,
  context: false,
  ...x,
});

describe("trap grouping", () => {
  it("joins similar traps only under the same heading and keeps every original sentence", () => {
    const rows = [
      row({ y: 2022, q: 3, trap: "Dış türevi iç değerin yerine 1 noktasında okumak." }),
      row({ y: 2024, q: 7, trap: "Dış fonksiyonun türevini iç değer yerine aynı noktada hesaplamak.", pattern: "Yeni kalıp" }),
      row({ y: 2023, q: 9, trap: "Kesrin paydasını sıfır yapan değeri dışlamamak." }),
      row({ y: 2021, q: 2, c: "H2", trap: "Dış türevi iç değerin yerine 1 noktasında okumak." }),
      row({ y: 2020, q: 5, c: null, topicNote: "başlık dışı", trap: "Başka bir tuzak." }),
    ];
    expect(trapSimilarity(rows[0].trap, rows[1].trap)).toBeGreaterThanOrEqual(0.5);
    const cards = trapCards(rows, "tyt-matematik", ["H2", "H1"]);
    expect(cards.map((c) => c.heading)).toEqual(["H2", "H1", "H1", null]);
    const merged = cards.find((c) => c.traps.length > 1)!;
    expect(merged.pattern).toBe("Yeni kalıp"); // newest question leads
    expect(merged.traps).toEqual(["Dış fonksiyonun türevini iç değer yerine aynı noktada hesaplamak.", "Dış türevi iç değerin yerine 1 noktasında okumak."]);
    expect(merged.places).toEqual(["2024 TYT · Temel Matematik · 7. soru", "2022 TYT · Temel Matematik · 3. soru"]);
    expect(trapCards(rows, "tyt-matematik", ["H2", "H1"])).toEqual(cards);
  });
  it("covers every processed trap of a subject exactly once", () => {
    const mine = osymRows.filter((r) => r.subject === "tyt-turkce");
    const cards = trapCards(osymRows, "tyt-turkce");
    expect(cards.reduce((n, c) => n + c.rows.length, 0)).toBe(mine.length);
    expect(cards.length).toBeGreaterThan(0);
    for (const c of cards) for (const r of c.rows) expect(r.c ?? null).toBe(c.heading);
  });
});

describe("subject order and the mistake-card line", () => {
  it("puts the learner's mistake subjects first, then the given order", () => {
    const order = trapSubjectOrder(osymRows, ["tyt-turkce", "tyt-matematik", "tyt-fizik"], ["tyt-fizik", "tyt-fizik", "tyt-matematik", "yok"]);
    expect(order.slice(0, 3)).toEqual([
      { subjectId: "tyt-fizik", mistakes: 2 },
      { subjectId: "tyt-matematik", mistakes: 1 },
      { subjectId: "tyt-turkce", mistakes: 0 },
    ]);
    expect(order.some((s) => s.subjectId === "yok")).toBe(false);
  });
  it("counts only detailed headings and hides the line otherwise", () => {
    const topic = osymRows.find((r) => r.topic)!.topic!;
    const n = osymRows.filter((r) => r.topic === topic || r.topic2 === topic).length;
    expect(osymTopicCount(osymRows, topic, "tyt-turkce")).toEqual({ years: 9, questions: n });
    expect(osymTopicCount(osymRows, "topic-tyt-mat-uslu-sayilar-kaynak-039", "tyt-matematik")).toBeUndefined();
    expect(osymTopicCount(osymRows, undefined, "tyt-matematik")).toBeUndefined();
  });
});
