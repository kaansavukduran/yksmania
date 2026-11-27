import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import {
  HISTORY_DATES228, PERIODS228, candidates228, cards228, centuryExamples228, centuryPlace228, centurySupplement228, changesSorted228,
  chronologyExamples228, chronologySupplement228, clueAnswers228, clueRecords228, fetretYears228, forceExamples228, forceSupplement228,
  forces228, intervalYears228, officialExamples228, officialSupplement228, officials228, people228, stagesSorted228, statusExamples228,
  statusSupplement228, timeSupplement228, type Year228,
} from "../src/learning/depth228";

const lessons228 = {
  "tarih-zaman": [centurySupplement228, centuryExamples228],
  "osmanli-kurulus-siyaseti": [chronologySupplement228, chronologyExamples228],
  "osmanli-askeri-teskilat": [forceSupplement228, forceExamples228],
  "osmanli-medeniyeti": [statusSupplement228, statusExamples228],
  "sultan-osmanli-merkez-teskilati": [officialSupplement228, officialExamples228],
} as const;
const rawText = (id: string) => JSON.stringify(lessonGuides.get(id));

/* Bağımsız yüzyıl hesabı: kalan ve tam bölme ile. */
const indep = (era: "MÖ" | "MS", n: number) => {
  const century = Math.floor((n - 1) / 100) + 1;
  const position = era === "MS" ? ((n - 1) % 100) + 1 : 100 - ((n - 1) % 100);
  return { century, position, half: position <= 50 ? 1 : 2, quarter: Math.floor((position - 1) / 25) + 1 };
};
/** Bağımsız zaman çizgisi: MÖ 3000 … MÖ 1, MS 1 … MS 3000 (0 yok). */
const timeline: Year228[] = [
  ...Array.from({ length: 3000 }, (_, i) => ({ era: "MÖ" as const, n: 3000 - i })),
  ...Array.from({ length: 3000 }, (_, i) => ({ era: "MS" as const, n: i + 1 })),
];
const indexOf = (y: Year228) => timeline.findIndex((t) => t.era === y.era && t.n === y.n);

describe("TYT Tarih depth 0.228", () => {
  it("appends a table section, a figure and two examples without touching the raw guide", () => {
    for (const [id, [added, examples]] of Object.entries(lessons228)) {
      expect(sectionFigureGuideIds, id).toContain(id);
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(raw.sections.some(({ title }) => title === added.title), id).toBe(false);
      expect(raw.examples.some(({ title }) => examples.some((e) => e.title === title)), id).toBe(false);
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
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
      expect(theorySupplements[id]!.at(-1)).toEqual(added);
      expect(theorySupplements[id]!.length).toBe(id === "tarih-zaman" ? 2 : 1);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.at(-1)!;
      expect(sheetSection.title).toBe(added.title);
      expect(sheetSection.table).toBe(last.table);
      expect(sheetSection.text).toEqual([added.summary]);
      expect(sheetSection.figureTitle).toBe(added.figureTitle);
      expect(JSON.stringify(sheet)).toContain(added.table.rows[0][0]);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        for (const field of [example.title, example.prompt, example.strategy, example.answer, example.check, example.pitfall]) expect(field.trim().length).toBeGreaterThan(10);
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî sınav|resmi sınav/i);
        expect(JSON.stringify(example)).not.toMatch(/undefined|\bNaN\b|Infinity/);
      }
      expect(JSON.stringify(added)).not.toMatch(/undefined|NaN|Infinity|\[object/);
      expect(JSON.stringify(added)).not.toMatch(/\b(the|and|yes|century|quarter)\b/i);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBeDefined();
      expect(figure!.steps!.length).toBe(added.table.rows.length);
      for (let step = 0; step < figure!.steps!.length; step++)
        expect(JSON.stringify(figure!.draw(0, step))).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
    }
    // tarih-zaman’daki önceki ek bölüm korunur.
    expect(theorySupplements["tarih-zaman"]![0].title).toBe("Yıl etiketleri ile geçen süreyi ayır");
    expect(timeSupplement228).toBe(centurySupplement228);
  });

  it("computes century, position, half and quarter exhaustively and matches the timeline", () => {
    for (const y of timeline) {
      const c = centuryPlace228(y);
      const i = indep(y.era, y.n);
      expect([c.century, c.position, c.half, c.quarter], `${y.era} ${y.n}`).toEqual([i.century, i.position, i.half, i.quarter]);
      // Sıra, yüzyılın kronolojik ilk yılından sayılan konumdur.
      expect(indexOf(y) - indexOf({ era: y.era, n: c.first }) + 1).toBe(c.position);
      expect(indexOf({ era: y.era, n: c.last }) - indexOf({ era: y.era, n: c.first })).toBe(99);
      expect(indexOf({ era: y.era, n: c.quarterLast }) - indexOf({ era: y.era, n: c.quarterFirst })).toBe(24);
      expect(indexOf(y)).toBeGreaterThanOrEqual(indexOf({ era: y.era, n: c.quarterFirst }));
      expect(indexOf(y)).toBeLessThanOrEqual(indexOf({ era: y.era, n: c.quarterLast }));
    }
    for (let k = 0; k < 400; k++) {
      const a = timeline[(k * 37) % timeline.length], b = timeline[(k * 101 + 13) % timeline.length];
      expect(intervalYears228(a, b)).toBe(indexOf(b) - indexOf(a));
    }
    expect(() => centuryPlace228({ era: "MS", n: 0 })).toThrow();
    expect(centurySupplement228.table.rows).toEqual([
      ["MS 100", "1. yüzyıl · MS 1–100", "100. yıl", "ikinci yarı", "4. çeyrek: 76–100"],
      ["MS 101", "2. yüzyıl · MS 101–200", "1. yıl", "ilk yarı", "1. çeyrek: 101–125"],
      ["MS 1901", "20. yüzyıl · MS 1901–2000", "1. yıl", "ilk yarı", "1. çeyrek: 1901–1925"],
      ["MS 1926", "20. yüzyıl · MS 1901–2000", "26. yıl", "ilk yarı", "2. çeyrek: 1926–1950"],
      ["MS 600", "6. yüzyıl · MS 501–600", "100. yıl", "ikinci yarı", "4. çeyrek: 576–600"],
      ["MÖ 600", "6. yüzyıl · MÖ 600–501", "1. yıl", "ilk yarı", "1. çeyrek: 600–576"],
      ["MÖ 220", "3. yüzyıl · MÖ 300–201", "81. yıl", "ikinci yarı", "4. çeyrek: 225–201"],
      ["MÖ 376", "4. yüzyıl · MÖ 400–301", "25. yıl", "ilk yarı", "1. çeyrek: 400–376"],
    ]);
    // Her satır bağımsız hesapla da sınanır.
    for (const row of centurySupplement228.table.rows) {
      const [era, n] = row[0].split(" ") as ["MÖ" | "MS", string];
      const i = indep(era, Number(n));
      expect(row[1].startsWith(`${i.century}. yüzyıl`)).toBe(true);
      expect(row[2]).toBe(`${i.position}. yıl`);
      expect(row[3]).toBe(i.half === 1 ? "ilk yarı" : "ikinci yarı");
      expect(row[4].startsWith(`${i.quarter}. çeyrek`)).toBe(true);
    }
    // 1926 dersin verdiği miladi takvim yılıdır.
    expect(rawText("tarih-zaman")).toContain(`1 Ocak ${HISTORY_DATES228.miladiTurkiye}`);
    expect(centuryExamples228.map(({ answer }) => answer)).toEqual([
      "MS 449: 5. yüzyılın ilk yarısı, 2. çeyrek (426–450). MÖ 449: 5. yüzyılın ikinci yarısı, 3. çeyrek (450–426).",
      "MÖ 300 → MÖ 220 → MÖ 2 → MS 3 → MS 101; 400 yıllık aralık (401 yıl etiketi) ve 5 yüzyıl.",
    ]);
    const labels: Year228[] = [{ era: "MS", n: 101 }, { era: "MÖ", n: 2 }, { era: "MÖ", n: 300 }, { era: "MS", n: 3 }, { era: "MÖ", n: 220 }];
    const sorted = [...labels].sort((a, b) => indexOf(a) - indexOf(b));
    expect(indexOf(sorted[4]) - indexOf(sorted[0])).toBe(400);
    const centuries = new Set(timeline.slice(indexOf(sorted[0]), indexOf(sorted[4]) + 1).map((y) => `${y.era}${indep(y.era, y.n).century}`));
    expect(centuries.size).toBe(5);
    expect(indep("MS", 449).position + indep("MÖ", 449).position).toBe(101);
  });

  it("orders the founding events by the lesson's own dates", () => {
    const text = rawText("osmanli-kurulus-siyaseti");
    for (const phrase of ["1302 Koyunhisar", "1326’da Bursa", "1345’te Karesi", "1353’te Çimpe", "1389 I. Kosova", "1396 Niğbolu", "1402 Ankara", "1402–1413 Fetret", "1413’te", "1444 Varna", "1448 II. Kosova", "1453 İstanbul"])
      expect(text, phrase).toContain(phrase);
    const lessonYears: Record<string, number> = { Koyunhisar: 1302, "Bursa’nın alınması": 1326, "Karesi Beyliği’nin katılması": 1345, "Çimpe’nin elde edilmesi": 1353, "I. Kosova": 1389, Niğbolu: 1396, "Ankara Savaşı": 1402, "Fetret’in sonu, toparlanma": 1413 };
    const rows = chronologySupplement228.table.rows;
    expect(rows.map((r) => r[1])).toEqual(Object.entries(lessonYears).sort((a, b) => a[1] - b[1]).map(([name]) => name));
    rows.forEach((r, i) => {
      expect(Number(r[0])).toBe(lessonYears[r[1]]);
      expect(r[4]).toBe(i === 0 ? "İlk satır" : `${lessonYears[r[1]] - lessonYears[rows[i - 1][1]]} yıl`);
    });
    expect(rows.map((r) => r[2])).toEqual(["Osman Bey", "Orhan Bey", "Orhan Bey", "Orhan Bey", "I. Murad", "Yıldırım Bayezid", "Yıldırım Bayezid", "I. Mehmet"]);
    expect(rows.filter((r) => r[3] === "Rumeli")[0][1]).toBe("Çimpe’nin elde edilmesi");
    expect(fetretYears228).toBe(1413 - 1402);
    // Örnek 1: karışık kartlar.
    const sortedCards = [...cards228].sort((a, b) => a.year - b.year);
    expect(sortedCards.map((c) => c.year)).toEqual([1302, 1326, 1353, 1396, 1448]);
    const gaps = sortedCards.slice(1).map((c, i) => c.year - sortedCards[i].year);
    expect(gaps).toEqual([24, 27, 43, 52]);
    expect(chronologyExamples228[0].answer).toContain("En uzun ara 52 yıl: Niğbolu – II. Kosova");
    expect(chronologyExamples228[0].answer).toContain("Bursa’nın alınması ve Çimpe’nin elde edilmesi (Orhan Bey)");
    expect(chronologyExamples228[1].answer).toBe("Zincir ters kurulmuştur. Doğrusu: Ankara Savaşı (1402) → Fetret Devri (1402–1413) → I. Mehmet’in toparlaması (1413). Fetret 11 yıl sürer.");
    expect(Object.values(HISTORY_DATES228).every((y) => text.includes(String(y)) || rawText("tarih-zaman").includes(String(y)))).toBe(true);
  });

  it("narrows force candidates from the table columns alone", () => {
    const rows = forceSupplement228.table.rows;
    const pick = (pred: (r: string[]) => boolean) => rows.filter(pred).map((r) => r[0]);
    expect(pick((r) => r[2] === "Atlı")).toEqual(candidates228({ arm: "atlı" }).map((f) => f.name));
    expect(pick((r) => r[3].includes("ulufe"))).toEqual(candidates228({ pay: "ulufe" }).map((f) => f.name));
    expect(pick((r) => r[2] === "Atlı" && r[3].includes("ulufe"))).toEqual(["Kapıkulu süvarileri (sipah, silahtar, ulufeciler, garipler)"]);
    expect(pick((r) => r[3].startsWith("Dirlik"))).toEqual(["Tımarlı sipahi"]);
    expect(pick((r) => r[1] === "Kapıkulu").length).toBe(2);
    expect(new Set(rows.filter((r) => r[1] === "Kapıkulu").map((r) => r[2]))).toEqual(new Set(["Piyade", "Atlı"]));
    expect(rows.every((r) => r[3].includes("ulufe") === (r[1] === "Kapıkulu"))).toBe(true);
    expect(forces228).toHaveLength(7);
    expect(forceExamples228[0].answer).toBe("A: Kapıkulu süvarisi. B: Tımarlı sipahi. C: kesin seçilemez; 4 aday kalır (Müsellem, Kapıkulu süvarisi, Tımarlı sipahi, Akıncı).");
    expect(stagesSorted228.map((s) => s.ruler)).toEqual(["Osman Bey", "Orhan Bey", "I. Murad"]);
    expect(PERIODS228.indexOf("orhan")).toBeLessThan(PERIODS228.indexOf("murad1"));
    const text = rawText("osmanli-askeri-teskilat");
    expect(text).toContain("Orhan Bey döneminde ilk düzenli birlikler olarak yaya ve müsellemler oluşturuldu");
    expect(text).toContain("I. Murad döneminde yeniçeri ve kapıkulu kurumlaşması belirginleşir");
  });

  it("derives status from branch and counts the medeniyet examples", () => {
    const rows = statusSupplement228.table.rows;
    const branches = ["seyfiye", "kalemiye", "ilmiye"];
    for (const r of rows) expect(r[3]).toBe(branches.includes(r[4]) ? "Askerî sınıf" : "Reaya");
    expect(rows.filter((r) => r[3] === "Askerî sınıf").map((r) => r[0])).toEqual(["Vezir", "Beylerbeyi", "Defterdar", "Kadı", "Müftü", "Müderris"]);
    expect(rows.filter((r) => r[3] === "Reaya").map((r) => r[0])).toEqual(["Şehirli zanaatkâr", "Köylü üretici"]);
    const five = ["Kadı", "Müderris", "Beylerbeyi", "Şehirli zanaatkâr", "Defterdar"].map((n) => rows.find((r) => r[0] === n)!);
    expect(five.filter((r) => r[3] === "Askerî sınıf")).toHaveLength(4);
    expect(five.filter((r) => r[3] === "Askerî sınıf" && r[4] !== "seyfiye")).toHaveLength(3);
    expect(statusExamples228[0].answer).toContain("4 kişi askerî sınıftadır");
    expect(statusExamples228[0].answer).toContain("3 tanesi seyfiye dışındadır");
    expect(rows.filter((r) => r[3] === "Reaya" && r[2] !== "Köy").map((r) => r[0])).toEqual(["Şehirli zanaatkâr"]);
    expect(statusExamples228[1].answer).toBe("(1) Şehirli zanaatkâr reayadır ama köylü değildir. (2) Kadı, Müftü, Müderris askerî sınıftadır ama ayırıcı işleri savaş değildir.");
    expect(people228).toHaveLength(rows.length);
    const text = rawText("osmanli-medeniyeti");
    for (const n of ["Vezir", "beylerbeyi", "defterdar", "kadı", "müftü", "Müderris", "Seyfiye", "kalemiye", "İlmiye", "Reaya"]) expect(text).toContain(n);
  });

  it("matches Divan clues to officials and orders the changes by period", () => {
    const rows = officialSupplement228.table.rows;
    expect(rows.map((r) => r[1])).toEqual(["seyfiye", "seyfiye", "seyfiye", "ilmiye", "ilmiye", "kalemiye", "kalemiye", "kalemiye"]);
    const byKeyword = (k: string) => rows.filter((r) => `${r[2]} ${r[3]}`.toLocaleLowerCase("tr-TR").includes(k)).map((r) => r[0]);
    expect(byKeyword("tuğra")).toEqual(["Nişancı"]);
    expect(byKeyword("hazine")).toEqual(["Defterdar"]);
    expect(byKeyword("fetva")).toEqual(["Şeyhülislam"]);
    expect(byKeyword("müderris ataması")).toEqual(["Kazasker"]);
    expect(byKeyword("mühr-i hümayun")).toEqual(["Sadrazam"]);
    expect(byKeyword("donanma")).toEqual(["Kaptan-ı derya"]);
    expect(byKeyword("kâtiplerinin")).toEqual(["Reisülküttap"]);
    expect(clueRecords228.map((c) => byKeyword(c === "Divan kâtipleri" ? "kâtiplerinin" : c)[0])).toEqual(clueAnswers228.map((o) => o.name));
    expect(officialExamples228[0].answer).toBe("(1) Sadrazam, (2) Kaptan-ı derya, (3) Reisülküttap, (4) Nişancı. Kol dağılımı: seyfiye 2, kalemiye 2; bu kayıtlarda ilmiye görevlisi yoktur.");
    expect(changesSorted228.map((c) => c.when)).toEqual(["Orhan Bey dönemi", "I. Murat dönemi", "Fatih dönemi", "XVII. yüzyıl"]);
    expect(officials228).toHaveLength(8);
    const text = rawText("sultan-osmanli-merkez-teskilati");
    for (const phrase of ["Divanın temelleri Orhan Bey dönemine götürülür", "Fatih döneminde başkanlık sadrazama geçti", "XVII. yüzyılda ekber ve erşed", "I. Murat dönemindeki padişah ve oğulları", "belgeye tuğra çekmek nişancının", "Reisülküttap Divan kâtiplerinin başıydı", "Kaptan-ı derya donanmanın komutanıydı"])
      expect(text, phrase).toContain(phrase);
  });

  it("builds figure labels and readouts from the table data", () => {
    const frame = (id: string, title: string, step: number) => sectionFigures[id][title].draw(0, step);
    const labels = (f: ReturnType<typeof frame>) => f.els.flatMap((el) => (el.k === "text" ? [el.s] : []));
    centurySupplement228.table.rows.forEach((row, step) => {
      const f = frame("tarih-zaman", centurySupplement228.title, step);
      expect(labels(f)).toContain(`${row[0]} · ${row[2]}`);
      expect(f.readout![2]).toContain(row[4]);
      expect(labels(f).filter((s) => s.includes("çeyrek"))).toHaveLength(4);
    });
    chronologySupplement228.table.rows.forEach((row, step) => {
      const f = frame("osmanli-kurulus-siyaseti", chronologySupplement228.title, step);
      expect(labels(f)).toContain(row[0]);
      expect(f.readout![0]).toContain(row[1]);
      expect(f.readout![0]).toBe(`${row[0]} · ${row[1]} · ${row[2]} · ${row[3]}.`);
      if (step > 0) expect(labels(f)).toContain(row[4]);
    });
    forceSupplement228.table.rows.forEach((row, step) => {
      const f = frame("osmanli-askeri-teskilat", forceSupplement228.title, step);
      expect(f.readout![1]).toContain(row[3]);
      expect(f.readout![2]).toContain(row[4]);
      expect(labels(f)).toContain(forces228[step].short);
    });
    statusSupplement228.table.rows.forEach((row, step) => {
      const f = frame("osmanli-medeniyeti", statusSupplement228.title, step);
      expect(labels(f)).toContain(row[0]);
      expect(f.readout![1]).toContain(row[3]);
    });
    officialSupplement228.table.rows.forEach((row, step) => {
      const f = frame("sultan-osmanli-merkez-teskilati", officialSupplement228.title, step);
      expect(labels(f)).toContain(row[0]);
      expect(f.readout![0]).toContain(row[2]);
      expect(f.readout![1]).toContain(row[3]);
    });
  });
});
