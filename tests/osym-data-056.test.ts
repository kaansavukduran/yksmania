import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import curriculum from "../src/data/curriculum.json";
import detailTopics from "../src/data/detail-topics.json";
import { osymBooklets, osymRows } from "../src/learning/osym";
import { processedBooklets } from "../src/domain/osymPatterns";

const FORMS = ["düz", "öncül", "grafik", "tablo", "şekil", "paragraf", "deney", "eşleştirme", "sıralama", "hesap", "harita"];
const headings = new Map(curriculum.map((c) => [c.id, c.subjectId]));
const details = new Map(detailTopics.map((t) => [t.id, t.subjectId]));
const TYT = ["tyt-turkce", "tyt-tarih", "tyt-cografya", "tyt-felsefe", "tyt-din", "tyt-matematik", "tyt-geometri", "tyt-fizik", "tyt-kimya", "tyt-biyoloji"];
const AYT = ["ayt-matematik", "ayt-geometri", "ayt-fizik", "ayt-kimya", "ayt-biyoloji"];

describe("processed ÖSYM booklets", () => {
  it("every row names a real heading of its own subject and stays in scope", () => {
    for (const r of osymRows) {
      const where = `${r.y} ${r.e} ${r.test} ${r.q}`;
      expect(r.e === "TYT" ? TYT : AYT, where).toContain(r.subject);
      for (const c of [r.c, r.c2]) if (c !== null) expect(headings.get(c), `${where} ${c}`).toBe(r.subject);
      for (const t of [r.topic, r.topic2]) if (t !== null) expect(details.get(t), `${where} ${t}`).toBe(r.subject);
      if (r.c === null) expect(r.c2, where).toBeNull();
      expect(["A", "B", "C", "D", "E", "iptal"], where).toContain(r.a);
      expect(FORMS, where).toContain(r.form);
      expect([1, 2, 3], where).toContain(r.difficulty);
      expect(typeof r.context, where).toBe("boolean");
      expect(r.topicNote.trim().length, where).toBeGreaterThanOrEqual(4);
    }
  });

  it("describes questions in our own short sentences, never as a transcript", () => {
    for (const r of osymRows) {
      const where = `${r.y} ${r.e} ${r.test} ${r.q}`;
      expect(r.pattern.length, where).toBeLessThanOrEqual(110);
      expect(r.skill.length, where).toBeLessThanOrEqual(160);
      expect(r.trap.length, where).toBeLessThanOrEqual(160);
      for (const text of [r.pattern, r.skill, r.trap, r.topicNote]) {
        // No option lists, no stems, no file identifiers or links.
        expect(text, where).not.toMatch(/\b[A-E]\)\s|https?:|[A-Za-z0-9_-]{25,}|\.\.\.|—/);
      }
    }
  });

  it("holds complete booklets: one row per question, alternates marked", () => {
    const seen = new Set<string>();
    for (const r of osymRows) {
      const key = `${r.y}-${r.e}-${r.test}-${r.q}-${r.alt ? "alt" : ""}`;
      expect(seen.has(key), key).toBe(false);
      seen.add(key);
    }
    for (const b of processedBooklets(osymRows)) {
      const rows = osymRows.filter((r) => r.y === b.year && r.e === b.exam);
      const count = (test: string) => rows.filter((r) => r.test === test && !r.alt).length;
      if (b.exam === "TYT") {
        expect([count("Türkçe"), count("Sosyal Bilimler"), count("Temel Matematik"), count("Fen Bilimleri")], `${b.year} TYT`).toEqual([40, 20, 40, 20]);
        expect(rows.filter((r) => r.alt).length, `${b.year} TYT seçmeli felsefe`).toBe(5);
      } else {
        expect([count("Matematik"), count("Fen Bilimleri")], `${b.year} AYT`).toEqual([40, 40]);
      }
    }
  });

  it("keeps the counter in docs equal to the booklets in the app", () => {
    const doc = readFileSync("docs/OSYM_SAYACI.md", "utf8");
    const counted = Number(doc.match(/sayac:osym-pdf islenen=(\d+) toplam=1001/)![1]);
    expect(counted).toBe(osymBooklets.length);
    expect(processedBooklets(osymRows).length).toBe(osymBooklets.length);
  });
});
