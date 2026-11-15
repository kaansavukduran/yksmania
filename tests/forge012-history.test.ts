import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  forge012HistoryGuides,
  forge012HistoryLessons,
  forge012HistoryTopics,
  history012Events,
  history012State,
} from "../src/learning/forge012History";

describe("Millî Mücadeleden savaş sonrası ilk geçişe kaynaklı tarih", () => {
  it("beş ayrı başlıkta kapsamlı anlatım ve çözümlü örnek sunar", () => {
    expect(forge012HistoryTopics).toEqual({
      "milli-mucadele": "detail-245",
      "ataturkculuk-inkilap": "detail-246",
      "iki-savas-arasi-turkiye-dunya": "detail-247",
      "kuresel-savaslar-arasinda-turkiye-dunya": "detail-248",
      "ikinci-dunya-savasi-sonrasi": "detail-249",
    });
    expect(forge012HistoryGuides).toHaveLength(5);
    for (const g of forge012HistoryGuides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(8);
      expect(
        g.sections.every(
          (s) =>
            s.paragraphs.length >= 2 &&
            s.paragraphs.every((p) => p.length > 100),
        ),
        g.id,
      ).toBe(true);
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(4);
      expect(
        g.examples.every(
          (e) => e.steps.length >= 3 && e.answer && e.check && e.pitfall,
        ),
      ).toBe(true);
      const l = forge012HistoryLessons.find((l) => l.id === g.id)!;
      expect(l.tags).toContain(forge012HistoryTopics[g.id]);
      expect(l.subjectId).toBe("tyt-tarih");
      expect(l.body[0].text.tr).toContain(g.sections[0].paragraphs[0]);
    }
  });
  it("elli özgün soruyu kendi kanıtı ve beş farklı seçeneğiyle cevaplanabilir kılar", () => {
    const all = forge012HistoryLessons.flatMap((l) => l.questions);
    expect(all).toHaveLength(50);
    expect(new Set(all.map((q) => q.id)).size).toBe(50);
    for (const l of forge012HistoryLessons) {
      expect(l.questions.map((q) => q.answer)).toEqual([
        0, 1, 2, 3, 4, 0, 1, 2, 3, 4,
      ]);
      for (const q of l.questions) {
        expect(questionContentIssues(q), q.id).toEqual([]);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.passage!.tr.length).toBeGreaterThan(50);
        expect(q.explanation.tr.length).toBeGreaterThan(120);
      }
    }
  });
  it("aynı adı taşıyan Ankara belgelerini,1920 kurumu ile1932 üyeliğini ve1938/1939 Hatay aşamalarını ayırır", () => {
    const q = forge012HistoryLessons.find(
      (l) => l.id === "iki-savas-arasi-turkiye-dunya",
    )!.questions;
    expect(q[0].options[q[0].answer].tr).toBe("1926 Ankara Antlaşması: Musul");
    expect(q[4].options[q[4].answer].tr).toBe(
      "Hatay 1938’de Türkiye’ye katılmıştır.",
    );
    const rows = history012Events["iki-savas-arasi-turkiye-dunya"];
    expect(rows.find((r) => r.name === "Montrö")!.date).toBe("20 Temmuz 1936");
    expect(
      rows.find((r) => r.name === "Milletler Cemiyetine katılım")!.year,
    ).toBe(1932);
  });
  it("medeni hak ile milletvekili hakkını ve kabul ile yürürlüğü ayırır", () => {
    const g = forge012HistoryGuides.find(
      (g) => g.id === "ataturkculuk-inkilap",
    )!;
    const p = g.sections
      .find((s) => s.title.startsWith("Medeni Kanun"))!
      .paragraphs.join(" ");
    expect(p).toContain("17 Şubat 1926");
    expect(p).toContain("4 Ekim 1926");
    expect(p).toContain("milletvekili");
    expect(p).toContain("1934");
    expect(
      history012Events[g.id][1].choices[history012Events[g.id][1].answer],
    ).toBe("Medeni haklar");
  });
  it("247 Türkiye siyaset/diplomasisini,248 uluslararası sistem/krizi farklı içerikle öğretir", () => {
    const a = forge012HistoryGuides[2],
      b = forge012HistoryGuides[3];
    expect(a.sections.some((s) => s.title.startsWith("Musul"))).toBe(true);
    expect(b.sections.some((s) => s.title.startsWith("1929"))).toBe(true);
    expect(b.sections.some((s) => s.title.startsWith("Rusya"))).toBe(true);
    expect(a.sections.map((s) => s.title)).not.toEqual(
      b.sections.map((s) => s.title),
    );
  });
  it("savaş ilanını fiilî muharebeye eşitlemez;1939/1941/1945 aşamalarını korur", () => {
    const rows = history012Events["ikinci-dunya-savasi-sonrasi"];
    expect(rows.map((r) => r.year)).toEqual([
      1939, 1940, 1941, 1943, 1945, 1945,
    ]);
    const d = rows.find((r) => r.name === "Türkiye’nin savaş ilanı")!;
    expect(d.date).toBe("23 Şubat 1945");
    expect(d.evidence).toContain("fiilî muharebeye katılmıyor");
    expect(rows.find((r) => r.name === "BM’nin kuruluşu")!.date).toBe(
      "24 Ekim 1945",
    );
    const last = forge012HistoryLessons[4].questions[9];
    expect(last.options[last.answer].tr).toBe(
      "Demokrat Parti Türkiye tarihinin ilk muhalefet partisidir.",
    );
  });
  it("eski veya bozuk keşif seçimini sınırlar ve kaynak olaylarını değiştirmez", () => {
    const id = "milli-mucadele",
      before = JSON.stringify(history012Events);
    expect(history012State(id, NaN, Infinity)!.index).toBe(0);
    expect(history012State(id, -4, -8)!.step).toBe(0);
    expect(history012State(id, 999, 99)!.index).toBe(5);
    expect(history012State(id, 999, 99)!.revealed).toHaveLength(3);
    expect(history012State("__missing__", 0, 0)).toBeNull();
    expect(JSON.stringify(history012Events)).toBe(before);
  });
});
