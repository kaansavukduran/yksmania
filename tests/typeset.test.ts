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
  it("uses the ellipsis character", () => {
    expect(typeset("“Örneğin...” diye")).toBe("“Örneğin…” diye");
    expect(typeset("n=1,2,...")).toBe("n=1,2,…");
  });
  it("is idempotent", () => {
    const once = typeset("toplam180° ve açıortay,kenarortay...");
    expect(typeset(once)).toBe(once);
  });
});
