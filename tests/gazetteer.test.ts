import { describe, expect, it } from "vitest";
import { places, placesIn } from "../src/learning/geo/gazetteer";

describe("place gazetteer", () => {
  it("finds names with Turkish suffixes", () => {
    expect(placesIn("1071’de Malazgirt’te karşılaştılar.").map((p) => p.id)).toEqual(["malazgirt"]);
    expect(placesIn("Miletoslu Thales suyu ilk ilke saydı.").map((p) => p.id)).toEqual(["miletos"]);
    expect(placesIn("Sümerler yazıyı kullandı.").map((p) => p.id)).toEqual(["ur"]);
  });
  it("does not match inside longer words or ambiguous plain names", () => {
    expect(placesIn("Romantizm ve Efesane bir anlatım")).toEqual([]);
    expect(placesIn("Talas ilçesi Kayseri’dedir.")).toEqual([]);
    expect(placesIn("Isparta’daki Gölcük Gölü bir krater gölüdür.")).toEqual([]);
    expect(placesIn("Afşin-Elbistan termik santrali linyit kullanır.")).toEqual([]);
  });
  it("keeps coordinates valid and ids unique", () => {
    expect(new Set(places.map((p) => p.id)).size).toBe(places.length);
    for (const p of places) {
      expect(p.lat).toBeGreaterThan(-90);
      expect(p.lat).toBeLessThan(90);
      expect(p.lon).toBeGreaterThanOrEqual(-180);
      expect(p.lon).toBeLessThanOrEqual(180);
      expect(p.names.length).toBeGreaterThan(0);
    }
  });
});
