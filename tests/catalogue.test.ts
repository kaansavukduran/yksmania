import { describe, it, expect } from "vitest";
import {
  parseCatalogue,
  matchSource,
  visibleIn,
  hashPdf,
} from "../src/domain/catalogue";
import curriculum from "../src/data/curriculum.json";
import details from "../src/data/detail-topics.json";
import { subjects } from "../src/domain/content";
const catalogue = {
  format: "yksmania-source-catalogue",
  version: 1,
  name: "Test archive",
  createdAt: "2026-11-13T00:00:00Z",
  entries: [
    {
      id: "sample-1",
      name: "Özgün.pdf",
      subjectIds: ["tyt-matematik"],
      kind: "mixed",
      provider: "ogm",
      bytes: 8,
    },
  ],
};
describe("source catalogue and workbook coverage", () => {
  it("preserves all 341 reference IDs and all 479 detailed headings without marking them as lessons", () => {
    expect(curriculum).toHaveLength(341);
    expect(new Set(curriculum.map((t) => t.id)).size).toBe(341);
    expect(details).toHaveLength(479);
    expect(curriculum.filter((t) => t.exam === "TYT")).toHaveLength(201);
    expect(curriculum.filter((t) => t.exam === "AYT")).toHaveLength(140);
    expect(new Set(curriculum.map((t) => t.subjectId))).toEqual(
      new Set(subjects.map((s) => s.id)),
    );
    expect(curriculum.find((t) => t.id === "AYT-BIO-29")?.title).toBe(
      "Çevre, varyasyon, adaptasyon ve seçilim",
    );
  });
  it("rejects duplicate identities and unknown subjects before replacing a catalogue", () => {
    expect(() =>
      parseCatalogue(
        JSON.stringify({
          ...catalogue,
          entries: [catalogue.entries[0], catalogue.entries[0]],
        }),
      ),
    ).toThrow();
    expect(() =>
      parseCatalogue(
        JSON.stringify({
          ...catalogue,
          entries: [{ ...catalogue.entries[0], subjectIds: ["unknown"] }],
        }),
      ),
    ).toThrow();
    expect(() => parseCatalogue("{broken")).toThrow();
  });
  it("matches Unicode filenames and refuses ambiguous matches", () => {
    const c = parseCatalogue(JSON.stringify(catalogue));
    expect(matchSource("Özgün.pdf", c)?.id).toBe("sample-1");
    c.entries.push({ ...c.entries[0], id: "sample-2" });
    expect(matchSource("Özgün.pdf", c)).toBeUndefined();
  });
  it("keeps theory-only resources out of questions while mixed/cheatsheets remain usable in both", () => {
    expect(visibleIn("theory", "questions")).toBe(false);
    expect(visibleIn("questions", "theory")).toBe(false);
    expect(
      visibleIn("mixed", "theory") && visibleIn("mixed", "questions"),
    ).toBe(true);
  });
  it("hashes PDF chunks consistently, rejects invalid bytes and stops an aborted import", async () => {
    const f = new File(["%PDF-1.4\nhello"], "test.pdf");
    expect(await hashPdf(f)).toBe(await hashPdf(new File([f], "copy.pdf")));
    await expect(hashPdf(new File(["bad"], "bad.pdf"))).rejects.toThrow();
    const a = new AbortController();
    a.abort();
    await expect(hashPdf(f, a.signal)).rejects.toThrow();
  });
});
