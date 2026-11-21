import { describe, expect, it } from "vitest";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { lessonGuides } from "../src/learning/guides";

// Forge060 Kimya figürleri (16 AYT + 6 TYT dersi): her figür rehberdeki
// gerçek bir bölüm başlığına bağlanır; okuma satırlarındaki sayılar bölüm
// metnindeki örneklerle aynı hesaptan gelir.
const fig = (guide: string, title: string) => {
  const def = sectionFigures[guide]?.[title];
  if (!def) throw Error(`eksik figür: ${guide} / ${title}`);
  return def;
};
const readout = (guide: string, title: string, value: number, step = 0) => (fig(guide, title).draw(value, step).readout ?? []).join(" ");

const GUIDES = [
  "ayt-sikloalkanlar",
  "ayt-alkinler",
  "ayt-arenler",
  "karbon-kimyasina-giris",
  "basit-ve-molekul-formul",
  "redoks-denklestirme",
  "metalik-aktiflik",
  "ayt-elementler-yukseltgenme",
  "ayt-iyonlasma-elektron-ilgisi-en",
  "ayt-molalite-koligatif",
  "ayt-cozunurluk",
  "ayt-cozucu-cozunen",
  "ayt-molarite",
  "ayt-iyon-derisimi",
  "ayt-hidroliz",
  "ayt-denge-hesaplari",
  "mol",
  "kutle-korunumu-sabit-oran",
  "buharlasma-buhar-basinci",
  "kaynama-bagil-nem",
  "maddenin-halleri",
  "kovalent-bag-polar-apolar",
];

describe("Forge060 Kimya bölüm figürleri", () => {
  it("22 dersin her birine en az üç figür, gerçek bölüm başlıklarıyla", () => {
    for (const g of GUIDES) {
      expect(sectionFigureGuideIds.has(g), g).toBe(true);
      const titles = Object.keys(sectionFigures[g] ?? {});
      expect(titles.length, g).toBeGreaterThanOrEqual(3);
      const sections = new Set(lessonGuides.get(g)?.sections.map((s) => s.title));
      for (const t of titles) expect(sections.has(t), `${g} / ${t}`).toBe(true);
    }
  });

  it("her figür her adımda ve sürgü uçlarında çizilir, okumada NaN yok", () => {
    for (const g of GUIDES)
      for (const def of Object.values(sectionFigures[g])) {
        expect(def.caption.length).toBeGreaterThan(40);
        expect(def.alt.length).toBeGreaterThan(20);
        const vals = def.param ? [def.param.min, def.param.init, def.param.max] : [0];
        const steps = def.steps ? def.steps.map((_, i) => i) : [0];
        for (const val of vals)
          for (const s of steps) {
            const f = def.draw(val, s);
            expect(f.els.length).toBeGreaterThan(0);
            for (const line of f.readout ?? []) expect(line).not.toMatch(/NaN|Infinity|undefined/);
          }
      }
  });

  it("organik: CₙH₂ₙ yanması, doymamışlık, naftalin ve C₆₀ sayımı", () => {
    expect(readout("ayt-sikloalkanlar", "Yanma hesabını atom korunumu ile yap", 6)).toContain("C₆H₁₂ + 9 O₂ → 6 CO₂ + 6 H₂O");
    expect(readout("ayt-sikloalkanlar", "Bir çevrim, iki hidrojen eksikliği", 8)).toContain("(2 · 4 + 2 − 8) ÷ 2 = 1");
    expect(readout("ayt-arenler", "Naftalinde iki halka bir kenarı paylaşır", 0)).toContain("6 + 6 − 2 = 10");
    expect(readout("karbon-kimyasina-giris", "C₆₀ kafesini komşulukla incele", 0, 1)).toContain("60 · 3 ÷ 2 = 90");
  });

  it("formül ve mol: CH₂O, C₄H₆O₂, 36 g su, FeS korunumu", () => {
    expect(readout("basit-ve-molekul-formul", "Üç sütunlu çözüm tablosu kur", 0, 2)).toContain("CH₂O");
    expect(readout("basit-ve-molekul-formul", "Molekül formülüne geçişin ortak katı", 2)).toContain("2 · 43 = 86 g/mol = 86");
    expect(readout("basit-ve-molekul-formul", "Kesirli oranı tüm sütunlarda aynı katla gider", 2)).toContain("C₃H₈O₂");
    expect(readout("mol", "Kütle, mol ve tanecik arasında birim köprüsü kur", 36)).toContain("H atomu = 4 mol");
    expect(readout("mol", "Molar kütleyi formülden oluştur", 0, 2)).toContain("= 74 g/mol");
    expect(readout("kutle-korunumu-sabit-oran", "Grafikte korunumu takip et", 100)).toContain("= 26 g");
  });

  it("redoks ve aktiflik: 3C + 4HNO₃, MnO₄⁻ + 5e⁻, E° değerleri, Fe₃O₄", () => {
    expect(readout("redoks-denklestirme", "Asidik yarı tepkimede su, H⁺ ve elektron", 0, 3)).toContain("MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O");
    expect(readout("metalik-aktiflik", "Verilen iki indirgenme değerini çıkar", 0, 0)).toContain("= +1,100 V");
    expect(readout("metalik-aktiflik", "Verilen iki indirgenme değerini çıkar", 0, 1)).toContain("= +0,462 V");
    expect(readout("metalik-aktiflik", "Verilen iki indirgenme değerini çıkar", 0, 2)).toContain("= +0,618 V");
    expect(readout("ayt-elementler-yukseltgenme", "Ortalama sayı gerçek her atom değildir", 0, 0)).toContain("+8/3");
    expect(readout("ayt-iyonlasma-elektron-ilgisi-en", "Büyük sıçramayı gerekçeyle oku", 0, 1)).toContain("3,14");
  });

  it("çözeltiler ve denge: molalite, hidroliz pH, kök ve Kp", () => {
    expect(readout("ayt-molalite-koligatif", "Aynı çözeltiyi iki farklı payda ile ölç", 500)).toContain("= 0,2 mol/kg");
    expect(readout("ayt-cozunurluk", "Buharlaştırma ile su ekleme aynı işlem değil", 250)).toContain("250 · 20 ÷ 100 = 50 g");
    expect(readout("ayt-iyon-derisimi", "Tuz M’si ile toplam iyon M’si", 0, 0)).toContain("0,60 mol iyon/L");
    expect(readout("ayt-hidroliz", "Yaklaşık pH hesabının iskeleti", 3)).toContain("pH ≈ 8,87");
    expect(readout("ayt-denge-hesaplari", "İki cebirsel kökten hangisi fiziksel?", 0)).toContain("x = 0,390388");
    expect(readout("ayt-denge-hesaplari", "Kp ile Kc arasında ideal gaz köprüsü", 300)).toContain("= 24,618");
  });

  it("TYT: bağıl nem %50, ısıtma eğrisi platoları", () => {
    expect(readout("kaynama-bagil-nem", "Nem, su buharının bilgisidir", 0, 0)).toContain("%50");
    expect(readout("kaynama-bagil-nem", "Soğutma ve çiy noktasını koşulla oku", 35.7)).toContain("%150");
    expect(readout("maddenin-halleri", "Enerji grafiğinde plato, sıfır enerji değildir", 167)).toContain("%50'i eridi");
    expect(readout("maddenin-halleri", "Enerji grafiğinde plato, sıfır enerji değildir", 1880)).toContain("%50'i gaz");
  });
});
