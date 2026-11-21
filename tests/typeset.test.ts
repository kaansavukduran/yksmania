import { describe, expect, it } from "vitest";
import { typeset } from "../src/domain/typeset";

describe("display typesetting", () => {
  it("restores the space before numbers after a word", () => {
    expect(typeset("İç açıların toplam180°dir.")).toBe("İç açıların toplam 180°dir.");
    expect(typeset("anafazdaki bütün hücrede12 pg")).toBe("anafazdaki bütün hücrede 12 pg");
    expect(typeset("G₁’de2C, S sonunda4C")).toBe("G₁’de 2C, S sonunda 4C");
  });
  it("keeps mathematical names, short symbols and links", () => {
    expect(typeset("sin2x ile 2 sin x cos x aynı; log2 8 = 3")).toBe("sin2x ile 2 sin x cos x aynı; log2 8 = 3");
    expect(typeset("x2 + y2 = 25, H2O, AB2")).toBe("x2 + y2 = 25, H2O, AB2");
    expect(typeset("kaynak: https://ogmmateryal.eba.gov.tr/page50.html")).toBe("kaynak: https://ogmmateryal.eba.gov.tr/page50.html");
  });
  it("adds the space after a comma or semicolon between words and keeps decimals", () => {
    expect(typeset("açıortay,kenarortay,yükseklik")).toBe("açıortay, kenarortay, yükseklik");
    expect(typeset("olmalı;enerji korunur")).toBe("olmalı; enerji korunur");
    expect(typeset("3,5 kg ve EKOK(4,10)=20")).toBe("3,5 kg ve EKOK(4,10)=20");
  });
  it("separates a word from a signed number, percent or degree unit, and a clause mark from the next number", () => {
    expect(typeset("fark−60° ve−240 dakika")).toBe("fark −60° ve −240 dakika");
    expect(typeset("bağıl nemi%100’dür")).toBe("bağıl nemi %100’dür");
    expect(typeset("Celsius için°C")).toBe("Celsius için °C");
    expect(typeset("alçalıyor;100 m’de")).toBe("alçalıyor; 100 m’de");
    expect(typeset("merkezdir.1.013 hPa")).toBe("merkezdir. 1.013 hPa");
    expect(typeset("P(2; −3) ve x−4=0, 3,5 ve 1.013")).toBe("P(2; −3) ve x−4=0, 3,5 ve 1.013");
    expect(typeset("ax−1<2 ile ax−1≥2, bx%3 ve log−1")).toBe("ax−1<2 ile ax−1≥2, bx%3 ve log−1");
  });
  it("uses the ellipsis character", () => {
    expect(typeset("“Örneğin...” diye")).toBe("“Örneğin…” diye");
    expect(typeset("n=1,2,...")).toBe("n=1,2,…");
  });
  it("is idempotent", () => {
    const once = typeset("toplam180° ve açıortay,kenarortay...");
    expect(typeset(once)).toBe(once);
  });

  it("repairs the misspelled perisikl and its suffixes", () => {
    expect(typeset("Yan kökler periskldan çıkar; bu katman periskldır, periskl ve periskli doku.")).toBe(
      "Yan kökler perisiklden çıkar; bu katman perisikldir, perisikl ve perisikli doku.",
    );
  });

  it("lowers a sentence capital on a function name only when mathematics follows", () => {
    expect(typeset("Log₂(8·4)=log₂8+log₂4. Sin x=sin θ için")).toBe("log₂(8·4)=log₂8+log₂4. sin x=sin θ için");
    expect(typeset("Cos2u ve Tan A; Log_g ile Ln e")).toBe("cos2u ve tan A; log_g ile ln e");
    expect(typeset("Tan vakti Sinir sistemi, Logaritma ve Tanım")).toBe("Tan vakti Sinir sistemi, Logaritma ve Tanım");
    expect(typeset("Sinüs ve Cos kısaltması")).toBe("Sinüs ve Cos kısaltması");
  });

  it("keeps a two-letter symbol with a max/min subscript together", () => {
    expect(typeset("Statik sürtünme fs,max değerini aşamaz.")).toBe("Statik sürtünme fs,max değerini aşamaz.");
    expect(typeset("ip,makara ve kütle")).toBe("ip, makara ve kütle");
  });
});
