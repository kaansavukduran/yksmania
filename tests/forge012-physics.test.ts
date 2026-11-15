import { describe, it, expect } from "vitest";
import {
  forge012PhysicsLessons as lessons,
  forge012PhysicsGuides as guides,
  forge012PhysicsTopics as topics,
  waterRefraction,
  soundState,
  seismicState,
  illuminanceState,
  shadowState,
  mirrorState,
  fullLengthMirror,
  reflectedRay,
} from "../src/learning/forge012Physics";
import { questionContentIssues } from "../src/domain/questionContent";
const answers: Record<string, string[]> = {
  "su-dalgalari": [
    "6",
    "4 cm",
    "Doğrultu sapmaz, dalga boyu azalır",
    "50°",
    "İlerleme yönü",
    "12 cm",
    "Kırınım daha belirginleşir",
    "18 Hz",
    "√3",
    "Kaynağın engele göre simetriğinde",
  ],
  "ses-deprem-dalgalari": [
    "68 m",
    "3 m",
    "Ses tizleşir, dalga boyu yarıya iner",
    "9",
    "10 dB",
    "Tını",
    "20 s",
    "Aynı depremin farklı yerlerdeki şiddeti farklı olabilir",
    "S dalgası",
    "1/9",
  ],
  "isik-bilgisi": [
    "45 lx",
    "1/9",
    "20 lx",
    "Işınla yüzey normali arasındaki",
    "12,5 lx",
    "Candela",
    "200π lm",
    "40 lx",
    "Değiştirmez",
    "Dönüşte termal gaz etkileri önemlidir; yalnız saf ışık basıncı kanıtı sayılmaz",
  ],
  "golge-yari-golge": [
    "24 cm",
    "Keskin sınırlı tam gölge",
    "Yarı gölge",
    "6 cm",
    "2",
    "9",
    "0 cm",
    "Yarı gölgede",
    "Artar",
    "Karanlık kalır",
  ],
  "duzlem-ayna": [
    "70°",
    "0°",
    "70 cm",
    "Sanal, düz, eş boylu",
    "80 cm",
    "6 m/s",
    "8 cm",
    "20°",
    "Göz-görüntü doğrusunun gerçek ayna parçasını kesmesi ve ışın yolunun açık olması",
    "Yüzeyin küçük bölgelerinin normalleri farklıdır",
  ],
};
describe("five reviewed water, sound and optics units", () => {
  it("maps only the five actual chronological source headings", () => {
    expect(topics).toEqual({
      "su-dalgalari": "detail-129",
      "ses-deprem-dalgalari": "detail-130",
      "isik-bilgisi": "detail-131",
      "golge-yari-golge": "detail-132",
      "duzlem-ayna": "detail-133",
    });
  });
  it("keeps50standalone five-choice cards with independently recomputed keys", () => {
    expect(lessons).toHaveLength(5);
    for (const l of lessons) {
      expect(l.questions).toHaveLength(10);
      for (const [i, q] of l.questions.entries()) {
        expect(q.options[q.answer].tr, q.id).toBe(answers[l.id][i]);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(questionContentIssues(q), q.id).toEqual([]);
        expect(q.explanation.tr.length).toBeGreaterThan(50);
        expect(q.hint.tr.length).toBeGreaterThan(10);
      }
      expect(new Set(l.questions.map((q) => q.answer)).size).toBe(5);
    }
  });
  it("provides multi-stage theory, solved reasoning and active recall", () => {
    for (const g of guides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(8);
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(5);
      for (const e of g.examples) {
        expect(e.steps.length).toBeGreaterThanOrEqual(3);
        expect(e.check.length).toBeGreaterThan(15);
        expect(e.pitfall.length).toBeGreaterThan(20);
      }
      expect(g.source).toContain("MEBİ TYT Fizik");
      expect(g.source).not.toContain("Aurelia");
    }
  });
  it("preserves wave frequency and normal-angle refraction in both directions", () => {
    const a = waterRefraction(3, 30, 15, 30);
    expect(a.wavelength1).toBe(10);
    expect(a.wavelength2).toBe(5);
    expect(a.angle2).toBeCloseTo(14.477512);
    expect(a.period).toBeCloseTo(1 / 3);
    expect(waterRefraction(3, 15, 30, 0).angle2).toBe(0);
    expect(waterRefraction(3, 15, 60, 60).canTransmit).toBe(false);
    expect(waterRefraction(3, 15, 60, 60).angle2).toBeNull();
    expect(waterRefraction(6, 30, 15, 30).wavelength1).toBe(5);
  });
  it("uses round-trip sound time and two independently timed seismic paths", () => {
    expect(soundState(170, 340, 102)).toEqual({
      wavelength: 2,
      period: 1 / 170,
      echoTime: 0.6,
      totalPath: 204,
    });
    expect(soundState(340, 340, 102).wavelength).toBe(1);
    expect(soundState(340, 340, 102).echoTime).toBe(0.6);
    expect(seismicState(120, 6, 3)).toEqual({
      pTime: 20,
      sTime: 40,
      difference: 20,
    });
    expect(seismicState(160, 8, 4).difference).toBe(20);
  });
  it("applies inverse square and cosine without altering total source flux", () => {
    const a = illuminanceState(120, 2, 0),
      b = illuminanceState(120, 4, 0),
      c = illuminanceState(120, 2, 60);
    expect(a.lux).toBe(30);
    expect(b.lux).toBe(7.5);
    expect(c.lux).toBeCloseTo(15);
    expect(c.flux).toBe(a.flux);
    expect(b.flux).toBe(a.flux);
    expect(illuminanceState(120, 2, 90).lux).toBeCloseTo(0);
    expect(a.flux).toBeCloseTo(480 * Math.PI);
  });
  it("computes shadows by overlap and preserves partial bands when umbra vanishes", () => {
    const a = shadowState(40, 100, 20, 40);
    expect(a.magnification).toBe(2.5);
    expect(a.intervals).toEqual([
      { source: -20, min: -20, max: 80 },
      { source: 20, min: -80, max: 20 },
    ]);
    expect(a.fullWidth).toBe(40);
    expect(a.partialWidth).toBe(120);
    const b = shadowState(40, 100, 20, 80);
    expect(b.fullWidth).toBe(0);
    expect(b.partialWidth).toBe(200);
    const one = shadowState(40, 100, 20, 80, false);
    expect(one.fullWidth).toBe(100);
    expect(one.partialWidth).toBe(0);
    const coincident = shadowState(40, 100, 20, 0);
    expect(coincident.fullWidth).toBe(100);
    expect(coincident.partialWidth).toBe(0);
  });
  it("uses a fixed spatial reference for mirror translations and correct ray geometry", () => {
    const a = mirrorState(-40, 0, 30),
      b = mirrorState(-40, 5, 30);
    expect(a.imageX).toBe(40);
    expect(a.separation).toBe(80);
    expect(b.imageX).toBe(50);
    expect(b.imageDistance).toBe(45);
    expect(b.imageX - a.imageX).toBe(10);
    const r = reflectedRay(45);
    expect(r.rise).toBeCloseTo(r.run);
    expect((Math.atan(r.rise / r.run) * 180) / Math.PI).toBeCloseTo(45);
    expect(fullLengthMirror(180, 170)).toEqual({
      bottom: 85,
      top: 175,
      length: 90,
    });
  });
  it("rejects nonphysical or nonfinite model inputs instead of emitting NaN", () => {
    expect(() => waterRefraction(0, 30, 15, 30)).toThrow();
    expect(() => waterRefraction(3, 30, 15, 90)).toThrow();
    expect(() => soundState(340, Infinity, 20)).toThrow();
    expect(() => seismicState(120, 3, 6)).toThrow();
    expect(() => illuminanceState(120, 0, 30)).toThrow();
    expect(() => illuminanceState(120, 2, -1)).toThrow();
    expect(() => shadowState(40, 20, 20, 40)).toThrow();
    expect(() => shadowState(40, 100, 20, -1)).toThrow();
    expect(() => mirrorState(40, 0, 30)).toThrow();
    expect(() => fullLengthMirror(180, 190)).toThrow();
  });
  it("corrects source ambiguities for sound intensity, earthquake scale and radiometer", () => {
    const sound = guides
      .find((g) => g.id === "ses-deprem-dalgalari")!
      .sections.map((s) => s.paragraphs.join(" "))
      .join(" ");
    expect(sound).toContain("W/m²");
    expect(sound).toContain("1–9 arasında yapay olarak sınırlı değildir");
    const light = guides
      .find((g) => g.id === "isik-bilgisi")!
      .sections.map((s) => s.paragraphs.join(" "))
      .join(" ");
    expect(light).toContain("gazla termal etkileşim");
    expect(light).toContain("normalle60°".replace("normalle60", "normalle 60"));
  });
});
