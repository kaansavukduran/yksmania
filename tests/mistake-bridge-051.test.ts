import { describe, expect, it } from "vitest";
import { bridgeFoundations } from "../src/components/MistakeBridge";
import { mistakeSprintSpec } from "../src/domain/exams";
import { lessons } from "../src/domain/content";

describe("051 Hata merkezi: önkoşul köprüsü ve boss turu", () => {
  it("prefers foundations that directly prepare the lesson", () => {
    const b = bridgeFoundations("rasyonel-sayilar", "tyt-matematik");
    expect(b.kind).toBe("direct");
    expect(b.list.map((f) => f.id)).toContain("temel-mat-kesirler");
  });
  it("bridges AYT mistakes to the TYT foundations of the same science", () => {
    const b = bridgeFoundations("ayt-olmayan-ders", "ayt-fizik");
    expect(b.kind).toBe("ayt");
    expect(b.list.length).toBeGreaterThan(0);
    expect(b.list.every((f) => f.subjectId === "tyt-fizik")).toBe(true);
  });
  it("builds a boss round of up to 20 questions with its own id and title", () => {
    const ids = lessons.flatMap((l) => l.questions).slice(0, 30).map((q) => q.id);
    const boss = mistakeSprintSpec(ids, 20, "boss")!;
    const sprint = mistakeSprintSpec(ids)!;
    expect(boss.items).toHaveLength(20);
    expect(boss.title).toBe("Hafta sonu hata boss’u · 20 soru");
    expect(boss.id.startsWith("boss-")).toBe(true);
    expect(boss.fullLength).toBe(false);
    expect(sprint.items).toHaveLength(10);
    expect(sprint.id.startsWith("sprint-")).toBe(true);
  });
});
