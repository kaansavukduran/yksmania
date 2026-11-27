import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import {
  bar231, flight231, heating231, humidExamples231, humidRows231, humidSupplement231, juneExamples231, juneRows231, juneSupplement231,
  lake231, layerExamples231, layerSupplement231, layers231, meridianExamples231, meridianRows231, meridianSupplement231, observed231,
  scaleExamples231, scaleRows231, scaleSupplement231, solstice231, findLatitude231, summit231, turkeyNoon231, vapour231, window231,
} from "../src/learning/depth231";

const lessons231 = {
  "dunya-sekli-hareket": [juneSupplement231, juneExamples231],
  "cografi-konum": [meridianSupplement231, meridianExamples231],
  "harita-bilgisi": [scaleSupplement231, scaleExamples231],
  "atmosfer-katmanlari": [layerSupplement231, layerExamples231],
  "nem-yagis": [humidSupplement231, humidExamples231],
} as const;
const sheetText = (sheet: NonNullable<ReturnType<typeof studyCheatSheet>>) => JSON.stringify(sheet);
const trNum = (x: number) => String(Math.round(x * 10) / 10).replace(".", ",").replace(/^-/, "−");

describe("TYT Coğrafya depth 0.231", () => {
  it("appends a table section, a figure and two examples without touching the raw guide", () => {
    for (const [id, [added, examples]] of Object.entries(lessons231)) {
      expect(sectionFigureGuideIds, id).toContain(id);
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(raw.sections.some(({ title }) => title === added.title), id).toBe(false);
      expect(raw.examples.some(({ title }) => examples.some((e) => e.title === title)), id).toBe(false);
      expect(raw.sections.some(({ table }) => table !== undefined), id).toBe(false);
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections).toHaveLength(raw.sections.length + 1);
      expect(shown.sections.filter(({ table }) => table === added.table)).toHaveLength(1);
      const last = shown.sections.at(-1)!;
      expect(last.title).toBe(added.title);
      expect(last.figureTitle).toBe(added.title);
      expect(added.figureTitle).toBe(added.title);
      expect(last.paragraphs).toEqual(added.paragraphs);
      expect(last.table?.layout).toBe("table");
      expect(last.table!.rows.length).toBeGreaterThanOrEqual(5);
      expect(last.table!.rows.length).toBeLessThanOrEqual(8);
      expect(last.table!.headers.length).toBeLessThanOrEqual(5);
      expect(last.table!.rows.every((row) => row.length === last.table!.headers.length)).toBe(true);
      expect(shown.examples.slice(-2)).toEqual(examples);
      expect(shown.examples.slice(0, raw.examples.length)).toEqual(raw.examples);
      expect(shown.examples).toHaveLength(raw.examples.length + 2);
      expect(theorySupplements[id]).toEqual([added]);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.at(-1)!;
      expect(sheetSection.title).toBe(added.title);
      expect(sheetSection.table).toBe(last.table);
      expect(sheetSection.text).toEqual([added.summary]);
      expect(sheetSection.figureTitle).toBe(added.figureTitle);
      expect(sheetText(sheet)).toContain(added.table.rows[0][0]);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        for (const field of [example.title, example.prompt, example.strategy, example.answer, example.check, example.pitfall]) expect(field.trim().length).toBeGreaterThan(10);
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî sınav|resmi sınav/i);
        expect(JSON.stringify(example)).not.toMatch(/undefined|\bNaN\b|Infinity/);
      }
      const all = JSON.stringify([added, examples]);
      expect(all).not.toMatch(/undefined|NaN|Infinity|\[object/);
      // ASCII hyphen as a minus sign before a digit is a typography slip.
      expect(all).not.toMatch(/(^|[\s(|])-\d/);
      expect(all).not.toMatch(/\b(the|and|latitude|longitude|scale)\b/i);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBeDefined();
      expect(figure!.steps!.length).toBe(added.table.rows.length);
      for (let step = 0; step < figure!.steps!.length; step++) {
        const frame = JSON.stringify(figure!.draw(0, step));
        expect(frame).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
      }
      expect(JSON.stringify([figure!.caption, figure!.alt])).not.toMatch(/(^|[\s(])-\d|undefined|NaN/);
    }
  });

  it("recomputes every noon-height row for 21 Haziran", () => {
    const d = 23.5;
    const expected: Record<string, [number, string, string]> = {
      // φ: [h, Güneş, gündüz]
      "80": [33.5, "güneyde", "24 saat (kutup gündüzü)"],
      "60": [53.5, "güneyde", "12 saatten uzun"],
      "40": [73.5, "güneyde", "12 saatten uzun"],
      "23.5": [90, "başucunda", "12 saatten uzun"],
      "0": [66.5, "kuzeyde", "12 saat"],
      "-23.5": [43, "kuzeyde", "12 saatten kısa"],
      "-40": [26.5, "kuzeyde", "12 saatten kısa"],
      "-80": [-13.5, "ufuk altında", "0 saat (kutup gecesi)"],
    };
    expect(juneRows231.map((r) => String(r.phi))).toEqual(["80", "60", "40", "23.5", "0", "-23.5", "-40", "-80"]);
    for (const r of juneRows231) {
      const h = 90 - Math.abs(r.phi - d);
      expect(Math.abs(r.h - h)).toBeLessThan(1e-9);
      const [eh, sun, day] = expected[String(r.phi)];
      expect([r.h, r.sun, r.day]).toEqual([eh, sun, day]);
      // Independent ideal day length: cos H0 = −tan φ tan δ.
      const c = -Math.tan((r.phi * Math.PI) / 180) * Math.tan((d * Math.PI) / 180);
      const hours = c <= -1 ? 24 : c >= 1 ? 0 : (2 * Math.acos(c) * 180) / Math.PI / 15;
      if (day.startsWith("24")) expect(hours).toBe(24);
      else if (day.startsWith("0 saat")) expect(hours).toBe(0);
      else if (day === "12 saat") expect(hours).toBeCloseTo(12, 9);
      else expect(day.includes("uzun") ? hours > 12 : hours < 12).toBe(true);
    }
    const rows = juneSupplement231.table.rows;
    expect(rows[3]).toEqual(["23,5° K", "90°", "başucunda", "oluşmaz (dik ışın)", "12 saatten uzun"]);
    expect(rows[7]).toEqual(["80° G", "−13,5°", "ufuk altında", "oluşmaz (Güneş ufuk altında)", "0 saat (kutup gecesi)"]);
    expect(rows.map((r) => r[1])).toEqual(juneRows231.map((r) => `${trNum(r.h)}°`));
    // The lesson works with the rounded 23,5° tilt.
    expect(JSON.stringify(lessonGuides.get("dunya-sekli-hareket"))).toContain("23,5°");
  });

  it("solves both noon-height examples", () => {
    expect([solstice231.june.h, solstice231.dec.h, solstice231.diff]).toEqual([90 - (40 - 23.5), 90 - (40 + 23.5), 47]);
    expect(solstice231.mirror.phi).toBe(-40);
    expect(juneExamples231[0].answer).toBe("21 Haziran’da 73,5°, 21 Aralık’ta 26,5°; Aralık değeri tablodaki 40° G satırına eşittir. Fark 47°.");
    // h = 53,5° with the Sun to the south → φ = 23,5 + 36,5 = 60° K.
    expect(findLatitude231.phi).toBe(23.5 + (90 - 53.5));
    expect(90 - Math.abs(findLatitude231.phi - 0)).toBe(30);
    expect(juneExamples231[1].answer).toBe("Enlem 60° K. 23 Eylül’de öğle yüksekliği 30°, ideal gündüz 12 saat.");
  });

  it("recomputes local solar time on every meridian (1° = 4 dk, east ahead)", () => {
    const start = 21 * 60 + 40;
    const expected: Record<string, [string, string]> = {
      "120": ["03.40", "ertesi gün"], "45": ["22.40", "aynı gün"], "30": ["21.40", "aynı gün"], "26": ["21.24", "aynı gün"],
      "0": ["19.40", "aynı gün"], "-15": ["18.40", "aynı gün"], "-150": ["09.40", "aynı gün"],
    };
    expect(meridianRows231.map((r) => String(r.lon))).toEqual(["120", "45", "30", "26", "0", "-15", "-150"]);
    meridianSupplement231.table.rows.forEach((row, i) => {
      const lon = meridianRows231[i].lon;
      const t = start + (lon - 30) * 4;
      const day = Math.floor(t / 1440);
      const m = ((t % 1440) + 1440) % 1440;
      const clock = `${String(Math.floor(m / 60)).padStart(2, "0")}.${String(m % 60).padStart(2, "0")}`;
      expect([clock, day === 1 ? "ertesi gün" : "aynı gün"]).toEqual(expected[String(lon)]);
      expect([row[3], row[4]]).toEqual(expected[String(lon)]);
    });
    expect(meridianSupplement231.table.rows[3]).toEqual(["26° D", "−4°", "−16 dk", "21.24", "aynı gün"]);
    expect(meridianSupplement231.table.rows[6]).toEqual(["150° B", "−180°", "−12 sa", "09.40", "aynı gün"]);
    // Lesson: 30° D’s antimeridian is 150° B; Türkiye 26–45° D gives 19 × 4 = 76 dk.
    const lesson = JSON.stringify(lessonGuides.get("cografi-konum"));
    expect(lesson).toContain("30° doğunun karşısı 150° batı");
    expect(lesson).toContain("26–45° doğu");
    expect((45 - 26) * 4).toBe(76);
  });

  it("solves the Türkiye and flight examples", () => {
    expect(12 * 60 - (45 - 26) * 4).toBe(10 * 60 + 44);
    expect(turkeyNoon231.west.text).toBe("10.44");
    expect(meridianExamples231[0].answer).toContain("10.44");
    // 22.30 at UTC+3 → 19.30 UTC; + 5 sa 50 dk → 01.20 UTC next day; UTC−2 → 23.20 same day.
    const utcArrive = 22 * 60 + 30 - 180 + 350;
    expect(utcArrive).toBe(24 * 60 + 80);
    expect(utcArrive - 120).toBe(23 * 60 + 20);
    expect(flight231.arriveClock).toEqual({ day: 0, text: "23.20" });
    expect(meridianExamples231[1].answer).toBe("B’de aynı gün (kalkış günü) saat 23.20.");
  });

  it("recomputes every scale row exactly (length ÷ N, area ÷ N²)", () => {
    const expected: Record<number, [string, string, string, string]> = {
      25000: ["0,25 km", "0,5 km", "48 cm", "768 cm²"],
      50000: ["0,5 km", "1 km", "24 cm", "192 cm²"],
      100000: ["1 km", "2 km", "12 cm", "48 cm²"],
      200000: ["2 km", "4 km", "6 cm", "12 cm²"],
      500000: ["5 km", "10 km", "2,4 cm", "1,92 cm²"],
      1000000: ["10 km", "20 km", "1,2 cm", "0,48 cm²"],
    };
    scaleRows231.forEach((r, i) => {
      // Exact integer arithmetic in BigInt (cm and cm²).
      const N = BigInt(r.n);
      const road = 12n * 100000n;
      const area = 48n * 10n ** 10n;
      expect(BigInt(Math.round(r.roadCm * 1000)) * N).toBe(road * 1000n);
      expect(BigInt(Math.round(r.areaCm2 * 10000)) * N * N).toBe(area * 10000n);
      expect(r.kmPerCm * 100000).toBe(r.n);
      expect(scaleSupplement231.table.rows[i].slice(1)).toEqual(expected[r.n]);
    });
    expect(scaleSupplement231.table.rows.map((row) => row[0])).toEqual(["1:25.000", "1:50.000", "1:100.000", "1:200.000", "1:500.000", "1:1.000.000"]);
    // The lesson’s own facts: 1:100.000 → 1 cm = 1 km; 2 cm = 10 km → 1:500.000.
    const lesson = JSON.stringify(lessonGuides.get("harita-bilgisi"));
    expect(lesson).toContain("1:100.000’de 1 cm");
    expect(lesson).toContain("1:500.000");
  });

  it("solves both map examples", () => {
    expect(32 / (200000 / 50000) ** 2).toBe(2);
    expect(32 * 0.5 ** 2).toBe(8);
    expect(lake231).toMatchObject({ areaB: 2, real: 8, realB: 8 });
    expect(scaleExamples231[0].answer).toBe("B’de 2 cm²; gölün alanı 8 km². Paydası küçük olan A (1:50.000) daha büyük ölçeklidir.");
    expect((5 / 2.5) * 100000).toBe(200000);
    expect([7 * 2, 3 * 2 * 2 * 2]).toEqual([14, 24]);
    expect(bar231).toMatchObject({ n: 200000, pathKm: 14, rectKm2: 24 });
    expect(scaleExamples231[1].answer).toBe("1:200.000; kavşaklar arası 14 km; arazi 24 km².");
  });

  it("recomputes the five atmosphere layers from the lesson’s model boundaries", () => {
    const lesson = lessonGuides.get("atmosfer-katmanlari")!;
    expect(JSON.stringify(lesson)).toContain("13, 50, 85 ve 600 km");
    const bounds = [0, 13, 50, 85, 600];
    expect(layers231.map((l) => l.name)).toEqual(["Troposfer", "Stratosfer", "Mezosfer", "Termosfer", "Ekzosfer"]);
    expect(layers231.map((l) => l.lo)).toEqual(bounds);
    const rows = layerSupplement231.table.rows;
    for (let i = 0; i < 4; i++) {
      expect(rows[i][1]).toBe(`${bounds[i]}–${bounds[i + 1]} km`);
      expect(rows[i][2]).toBe(`${bounds[i + 1] - bounds[i]} km`);
    }
    expect(rows[4].slice(1, 3)).toEqual(["600 km’den yukarı", "dış sınır kademeli"]);
    expect(layers231.slice(0, 4).map((l) => l.trend)).toEqual(["azalır", "artar", "azalır", "artar"]);
    expect(13 + 37 + 35 + 515).toBe(600);
    expect(Math.round((13 / 600) * 1000)).toBe(22);
    // Lesson terms are reused in the feature column.
    for (const word of ["su buharı", "Ozon", "göktaşı", "Kutup ışıkları", "seyrek"]) expect(JSON.stringify(lesson).toLowerCase()).toContain(word.toLowerCase());
  });

  it("solves both atmosphere examples", () => {
    expect(18 - (2400 / 200) * 1).toBe(6);
    expect(summit231.summit).toBe(6);
    expect(summit231.balloonLayer.name).toBe("Stratosfer");
    expect(layerExamples231[0].answer).toBe("Zirvede 6 °C beklenir. 20 km stratosferdedir; orada sıcaklık yükseldikçe arttığı için 200 m’de 1 °C kuralı kullanılamaz.");
    const layerOf = (km: number) => (km < 13 ? "troposfer" : km < 50 ? "stratosfer" : km < 85 ? "mezosfer" : km < 600 ? "termosfer" : "ekzosfer");
    expect(observed231.map((o) => layerOf(o.km))).toEqual(["troposfer", "stratosfer", "mezosfer", "termosfer"]);
    expect(observed231.map((o) => o.layer.name.toLowerCase())).toEqual(observed231.map((o) => layerOf(o.km)));
    expect(layerExamples231[1].answer).toBe("A troposfer, B stratosfer, C mezosfer, D termosfer; yükseldikçe sıcaklığın arttığı katmanlar B ve D.");
  });

  it("recomputes saturation (WMO Magnus) and every relative-humidity row", () => {
    // Independent: e_s = 6,112 exp(17,62 t / (243,12 + t)) hPa; ρ = e / (R_v T), R_v = 461,5 J/(kg K).
    const rho = (t: number) => ((6.112 * Math.exp((17.62 * t) / (243.12 + t)) * 100) / (461.5 * (t + 273.15))) * 1000;
    const r1 = (x: number) => Math.round(x * 10) / 10;
    expect(vapour231).toBe(r1(rho(10)));
    expect(vapour231).toBe(9.4);
    const expected: Record<number, [number, number, number, number]> = {
      // t: [doyma, buhar, yoğuşan, bağıl nem]
      30: [30.3, 9.4, 0, 31], 25: [23, 9.4, 0, 40.9], 20: [17.2, 9.4, 0, 54.7], 15: [12.8, 9.4, 0, 73.4], 10: [9.4, 9.4, 0, 100], 5: [6.8, 6.8, 2.6, 100],
    };
    expect(humidRows231.map((r) => r.t)).toEqual([30, 25, 20, 15, 10, 5]);
    for (const r of humidRows231) {
      const sat = r1(rho(r.t));
      const vap = Math.min(9.4, sat);
      expect([sat, vap, r1(9.4 - vap), r1((vap / sat) * 100)]).toEqual(expected[r.t]);
      expect([r.sat, r.vapour, r.condensed, r.rh]).toEqual(expected[r.t]);
    }
    // Textbook (CRC) saturated vapour densities agree within 0,1 g/m³.
    const crc: Record<number, number> = { 30: 30.4, 25: 23.0, 20: 17.3, 15: 12.8, 10: 9.4, 5: 6.8 };
    for (const r of humidRows231) expect(Math.abs(r.sat - crc[r.t])).toBeLessThanOrEqual(0.1 + 1e-9);
    expect(humidSupplement231.table.rows[4]).toEqual(["10 °C", "9,4 g/m³", "9,4 g/m³", "yok", "%100 · doygun: çiy noktası"]);
    expect(humidSupplement231.table.rows[5]).toEqual(["5 °C", "6,8 g/m³", "6,8 g/m³", "2,6 g/m³", "%100 · yoğuşma: fazla buhar damlaya döner"]);
  });

  it("solves both humidity examples", () => {
    expect(Math.round((9.4 / 23) * 1000) / 10).toBe(40.9);
    expect(window231.glass.condensed).toBe(Math.round((9.4 - 6.8) * 10) / 10);
    expect(humidExamples231[0].answer).toBe("Bağıl nem yaklaşık %40,9; çiy noktası yaklaşık 10 °C; camda 1 m³ başına 2,6 g su yoğuşur.");
    expect([Math.round((9.4 / 12.8) * 1000) / 10, Math.round((9.4 / 30.3) * 1000) / 10]).toEqual([73.4, 31]);
    expect(heating231.missing).toBe(Math.round((30.3 - 9.4) * 10) / 10);
    expect(humidExamples231[1].answer).toBe("Mutlak nem 9,4 g/m³ olarak kalır; bağıl nem %73,4’ten %31’e düşer. Doyurmak için 20,9 g buhar gerekir.");
  });
});
