import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide, studyGuideWithSourceRevisions } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { depthFigures217 } from "../src/learning/sectionFigures/depthFigures217";
import {
  CARBON_CARDS217, CLAIMS217, EFFICIENCY217, ISSUES217, MODE_ROWS217, NITROGEN_STEPS217, OBSERVATIONS217, ORGANISMS217, PRODUCER_KJ217,
  RESOURCES217, STOCKS217, WATER_CARDS217, WEB_EDGES217, WEB_SPECIES217, biomass217, carbonOrder217, chains217, cycleExamples217,
  cycleSupplement217, envExamples217, envSupplement217, ledgerExamples217, ledgerSupplement217, levels217, linksUp217, matchObservation217,
  maxCatch217, modeExamples217, modeSupplement217, mostCritical217, net217, organismVerdict217, pyramidExamples217, pyramidSupplement217,
  removal217, requiredProducer217, waterOrder217, webExamples217, webSupplement217,
} from "../src/learning/depth217";

const lessons217 = {
  "ekoloji-giris": [modeSupplement217, modeExamples217],
  "besin-zinciri-agi": [webSupplement217, webExamples217],
  "besin-piramidi": [pyramidSupplement217, pyramidExamples217],
  "madde-donguleri": [cycleSupplement217, cycleExamples217],
  "guncel-cevre-sorunlari": [envSupplement217, envExamples217],
  "dogal-kaynaklar-surdurulebilirlik": [ledgerSupplement217, ledgerExamples217],
} as const;

describe("TYT Biyoloji ekoloji derinleştirmesi 0.217.0", () => {
  it("appends a table section, a figure and two examples without touching the accepted guides", () => {
    for (const [id, [added, examples]] of Object.entries(lessons217)) {
      const raw = lessonGuides.get(id)!;
      expect(raw, id).toBeDefined();
      const shown = studyGuide(id)!;
      expect(raw.sections.some(({ title }) => title === added.title), id).toBe(false);
      expect(raw.examples.some(({ title }) => examples.some((e) => e.title === title)), id).toBe(false);
      expect(shown.sections.filter(({ table }) => table === added.table)).toHaveLength(1);
      const last = shown.sections.at(-1)!;
      expect(last.title).toBe(added.title);
      expect(last.figureTitle).toBe(added.title);
      expect(added.figureTitle).toBe(added.title);
      expect(last.paragraphs).toEqual(added.paragraphs);
      expect(last.table?.layout).toBe("table");
      expect(last.table!.rows.length).toBeLessThanOrEqual(8);
      expect(last.table!.headers.length).toBeLessThanOrEqual(5);
      expect(last.table!.rows.every((row) => row.length === last.table!.headers.length)).toBe(true);
      expect(shown.examples.slice(-2)).toEqual(examples);
      const revised = studyGuideWithSourceRevisions(id)!;
      expect(shown.examples.slice(0, -2)).toEqual(revised.examples);
      expect(shown.sections.slice(0, -1)).toEqual(revised.sections);
      expect(revised.examples.map(({ title }) => title)).toEqual(raw.examples.map(({ title }) => title));
      expect(new Set(revised.sections.map(({ title }) => title))).toEqual(new Set(raw.sections.map(({ title }) => title)));
      expect(theorySupplements[id]!.at(-1)).toBe(added);
      // Kopya Kâğıdı: aynı tablo, kısa özet, figür başlığı, örnekler ve uyarılar.
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.at(-1)!;
      expect(sheetSection.title).toBe(added.title);
      expect(sheetSection.table).toBe(added.table);
      expect(sheetSection.text).toEqual([added.summary]);
      expect(sheetSection.figureTitle).toBe(added.figureTitle);
      expect(added.summary.length).toBeLessThan(330);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const example of examples) {
        for (const key of ["title", "prompt", "strategy", "answer", "check", "pitfall"] as const) expect(example[key].length, `${id} ${key}`).toBeGreaterThan(5);
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        expect(example.steps.every(({ label, explanation }) => label && explanation)).toBe(true);
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî|resmi sınav/i);
        expect(JSON.stringify(example)).not.toMatch(/undefined|\bNaN\b/);
      }
      expect(JSON.stringify(added)).not.toMatch(/undefined|NaN|null|Infinity/);
      // Figür yeni bölüm başlığıyla kayıtlı ve her adımda çizilebiliyor.
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBe(depthFigures217[id][added.title]);
      expect(figure!.steps!.length).toBeGreaterThan(1);
      for (let step = 0; step < figure!.steps!.length; step++) {
        const frame = figure!.draw(0, step);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        expect(frame.readout!.length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps the earlier section figures of the six lessons", () => {
    for (const id of Object.keys(lessons217)) expect(Object.keys(sectionFigures[id]).length).toBeGreaterThan(1);
  });

  it("classifies nutrition from carbon and energy source and checks both examples", () => {
    expect(modeSupplement217.table.rows.map((r) => [r[0], r[2], r[4]])).toEqual([
      ["Fotoototrof", "CO₂", "Ototrof"],
      ["Kemoototrof", "CO₂", "Ototrof"],
      ["Otçul", "Organik madde", "Heterotrof"],
      ["Etçil", "Organik madde", "Heterotrof"],
      ["Omnivor", "Organik madde", "Heterotrof"],
      ["Saprotrof (ayrıştırıcı)", "Organik madde", "Heterotrof"],
      ["Karma beslenme", "CO₂ ya da organik madde", "Ototrof ve heterotrof yol"],
    ]);
    // Bağımsız kural: CO₂ kullanan her yol ototrof, organik madde kullanan heterotrof.
    for (const row of MODE_ROWS217) {
      const kinds = new Set(row.routes.map((r) => (r.carbon === "CO₂" ? "oto" : "hetero")));
      const expected = kinds.size === 2 ? "Ototrof ve heterotrof yol" : kinds.has("oto") ? "Ototrof" : "Heterotrof";
      expect(modeSupplement217.table.rows.find((r) => r[0] === row.name)![4], row.name).toBe(expected);
    }
    expect(ORGANISMS217.map(organismVerdict217)).toEqual(["kemoototrof", "saprotrof", "karma beslenme", "omnivor"]);
    expect(modeExamples217[0].answer).toBe("K kemoototrof, L saprotrof, M karma beslenme, N omnivor. CO₂ bağlayan yolu olanlar: K ve M.");
    expect(CLAIMS217.map(({ holds }) => holds)).toEqual([false, false, false, true]);
    expect(CLAIMS217.map(({ counter }) => counter?.name ?? "—")).toEqual(["Kemoototrof", "Saprotrof (ayrıştırıcı)", "Omnivor", "—"]);
    expect(modeExamples217[1].answer).toBe("Yalnız IV doğrudur. Karşı örnekler: I için kemoototrof, II için saprotrof (ayrıştırıcı), III için omnivor.");
  });

  it("recomputes the food-web table, chains, removals and both examples from the edge list", () => {
    const edges = WEB_EDGES217.map(([a, b]) => `${a}>${b}`);
    expect(edges).toEqual(["Ot>Çekirge", "Ot>Fare", "Çekirge>Kurbağa", "Fare>Yılan", "Fare>Şahin", "Kurbağa>Şahin", "Yılan>Şahin"]);
    // Bağımsız yol sayımı.
    const eat = (s: string, es = WEB_EDGES217) => es.filter(([a]) => a === s).map(([, b]) => b as string);
    const paths = (from: string, es = WEB_EDGES217): string[][] => (eat(from, es).length ? eat(from, es).flatMap((n) => paths(n, es).map((p) => [from, ...p])) : [[from]]);
    const all = paths("Ot");
    expect(all.map((p) => p.join(">"))).toEqual(["Ot>Çekirge>Kurbağa>Şahin", "Ot>Fare>Yılan>Şahin", "Ot>Fare>Şahin"]);
    expect(chains217().map((c) => c.join(">"))).toEqual(all.map((p) => p.join(">")));
    for (const s of WEB_SPECIES217) {
      const lv = [...new Set(all.filter((p) => p.includes(s)).map((p) => p.indexOf(s) + 1))].sort();
      expect(levels217(s), s).toEqual(lv);
      const kept = WEB_EDGES217.filter(([a, b]) => a !== s && b !== s);
      const hungry = WEB_SPECIES217.filter((x) => x !== s && WEB_EDGES217.some(([, b]) => b === x) && !kept.some(([, b]) => b === x));
      expect(removal217(s).foodless, s).toEqual(hungry);
    }
    expect(webSupplement217.table.rows).toEqual([
      ["Ot", "— (üretici)", "Çekirge, Fare", "1", "Çekirge, Fare"],
      ["Çekirge", "Ot", "Kurbağa", "2", "Kurbağa"],
      ["Fare", "Ot", "Yılan, Şahin", "2", "Yılan"],
      ["Kurbağa", "Çekirge", "Şahin", "3", "—"],
      ["Yılan", "Fare", "Şahin", "3", "—"],
      ["Şahin", "Fare, Kurbağa, Yılan", "—", "3 ve 4", "—"],
    ]);
    // Örnek 1: fare çıkarılınca.
    const noMouse = WEB_EDGES217.filter(([a, b]) => a !== "Fare" && b !== "Fare");
    expect(WEB_EDGES217.length - noMouse.length).toBe(3);
    expect(paths("Ot", noMouse).map((p) => p.join(">"))).toEqual(["Ot>Çekirge>Kurbağa>Şahin"]);
    expect(webExamples217[0].answer).toBe("3 ok silinir (Ot→Fare, Fare→Yılan, Fare→Şahin). Besin oku kalmayan tüketici yılan. 3 zincirden 1 tanesi kalır: Ot→Çekirge→Kurbağa→Şahin.");
    // Örnek 2: ara tüketicilerin geçtiği zincir sayısı.
    const through = ["Çekirge", "Fare", "Kurbağa", "Yılan"].map((s) => all.filter((p) => p.includes(s)).length);
    expect(through).toEqual([1, 2, 1, 1]);
    expect(mostCritical217).toEqual(["Fare"]);
    expect(webExamples217[1].answer).toMatch(/^Fare: 2 zincirde yer alır, çıkarılınca 3 zincirden 2 tanesi kopar\./);
  });

  it("recomputes the ten-percent energy table and both pyramid examples", () => {
    expect(PRODUCER_KJ217).toBe(10000);
    expect(EFFICIENCY217).toBe(0.1);
    const expected = [10000, 1000, 100, 10];
    expect(pyramidSupplement217.table.rows).toEqual([
      ["1. düzey", "Üretici", "10.000", "%100", "9.000"],
      ["2. düzey", "Birincil tüketici", "1.000", "%10", "900"],
      ["3. düzey", "İkincil tüketici", "100", "%1", "90"],
      ["4. düzey", "Üçüncül tüketici", "10", "%0,1", "— (zincirin sonu)"],
    ]);
    expected.forEach((e, i) => i > 0 && expect(e).toBe(expected[i - 1] / 10));
    expect(9000 + 900 + 90 + 10).toBe(10000);
    expect(pyramidSupplement217.paragraphs[1]).toContain("9.000 + 900 + 90 = 9.990");
    // Örnek 1: 25 kJ dördüncü düzeyden geriye.
    expect(requiredProducer217).toBe(25 * 10 * 10 * 10);
    expect(pyramidExamples217[0].answer).toBe("Üretici en az 25.000 kJ/m²/yıl bağlamalıdır. Ara düzeyler: 2.500 ve 250.");
    // Örnek 2: birey sayısı × kuru kütle.
    expect(biomass217).toEqual([300000, 300, 50]);
    expect(pyramidExamples217[1].answer).toMatch(/^Sayı piramidi terstir \(1, 1\.500, 10\); biyokütle piramidi düzdür \(300\.000 g > 300 g > 50 g\)\./);
  });

  it("chains the nitrogen, carbon and water steps and checks both cycle examples", () => {
    expect(NITROGEN_STEPS217.map((s) => `${s.from}>${s.to}`)).toEqual([
      "N₂>NH₄⁺", "NH₄⁺>bitkideki organik azot", "bitkideki organik azot>hayvandaki organik azot", "hayvandaki organik azot>NH₄⁺", "NH₄⁺>NO₂⁻", "NO₂⁻>NO₃⁻", "NO₃⁻>N₂",
    ]);
    for (let i = 0; i < NITROGEN_STEPS217.length; i++) expect(NITROGEN_STEPS217[i].to).toBe(NITROGEN_STEPS217[(i + 1) % NITROGEN_STEPS217.length].from);
    expect(cycleSupplement217.table.rows.map((r) => r[1])).toEqual([
      "Biyolojik fiksasyon", "Asimilasyon", "Beslenme", "Amonifikasyon", "Nitrifikasyon, 1. basamak", "Nitrifikasyon, 2. basamak", "Denitrifikasyon",
    ]);
    expect(cycleSupplement217.table.rows[4][3]).toBe("NH₄⁺ → NO₂⁻");
    expect(linksUp217([{ from: "a", to: "b" }, { from: "c", to: "a" }], false)).toBe(false);
    // Örnek 1: karbon kartları.
    expect(CARBON_CARDS217.map((c) => c.process)).toEqual(["Solunum", "Fotosentez", "Beslenme"]);
    expect(carbonOrder217.map((c) => c.process)).toEqual(["Fotosentez", "Beslenme", "Solunum"]);
    expect(cycleExamples217[0].answer).toBe("Fotosentez → Beslenme → Solunum. Fotosentez: O₂ açığa çıkar; Beslenme: O₂ doğrudan değişmez; Solunum: O₂ kullanılır.");
    // Örnek 2: su kartları.
    expect(WATER_CARDS217).toHaveLength(5);
    expect(waterOrder217.map((c) => c.process)).toEqual(["Buharlaşma", "Yoğuşma", "Yağış", "Kökle alım", "Terleme"]);
    expect(waterOrder217.filter((c) => c.fromPhase !== c.toPhase).length).toBe(3);
    expect(cycleExamples217[1].answer).toBe("Buharlaşma → Yoğuşma → Yağış → Kökle alım → Terleme. 3 basamakta hal değişir (buharlaşma, yoğuşma ve terleme); bitki 2 basamakta rol alır (kökle alım ve terleme).");
  });

  it("keeps the five environmental chains distinct and checks both examples", () => {
    expect(envSupplement217.table.rows.map((r) => r[0])).toEqual(["Sera etkisinin artması", "Ozon tabakasının incelmesi", "Asit yağmuru", "Ötrofikasyon", "Biyolojik çeşitlilik kaybı"]);
    const [green, ozone, acid, eutro] = ISSUES217;
    expect(green.mechanism).toMatch(/kızılötesi/);
    expect(ozone.mechanism).toMatch(/morötesi/);
    expect(acid.source).toMatch(/kükürt dioksit ve azot oksitler/);
    expect(eutro.chain.at(-1)).toMatch(/Ayrıştırıcı solunumu/);
    expect(JSON.stringify(envSupplement217)).not.toMatch(/\d{4}|%\d/);
    expect(envExamples217[0].answer).toBe("1) asit yağmuru, kaynak; 2) ozon incelmesi, kaynak; 3) ötrofikasyon, taşınma; 4) çeşitlilik kaybı, habitat onarımı.");
    expect(OBSERVATIONS217.map((o) => matchObservation217(o).short)).toEqual(["Ötrofikasyon", "Ozon incelmesi", "Asit yağmuru", "Çeşitlilik kaybı"]);
    expect([120 - 100, 12 - 8]).toEqual([20, 4]);
    expect(envExamples217[1].answer).toBe("A ötrofikasyon, B ozon tabakasının incelmesi, C asit yağmuru, D biyolojik çeşitlilik kaybı. D’de birey sayısı 20 artmış, tür sayısı 4 azalmıştır.");
  });

  it("recomputes the resource ledger from the table cells and checks both examples", () => {
    for (const [i, row] of ledgerSupplement217.table.rows.entries()) {
      const sumCell = (cell: string) => (cell.includes("=") ? Number(cell.split("=").at(-1)!.trim()) : Number(cell.split(" ")[0]));
      const net = sumCell(row[2]) - sumCell(row[3]);
      expect(net, row[0]).toBe(net217(RESOURCES217[i]));
      expect(row[4].startsWith(net === 0 ? "0" : net < 0 ? `−${-net}` : `+${net}`)).toBe(true);
    }
    expect(RESOURCES217.map(net217)).toEqual([-12, 0, -10, -10, -5]);
    expect(RESOURCES217.map((r) => r.cls)).toEqual(["yenilenebilir", "yenilenebilir", "yenilenebilir", "yenilenebilir", "yenilenemez"]);
    // Örnek 1: sabit akışlarla tükenme süresi.
    expect(STOCKS217.fossil / 5).toBe(12);
    expect(STOCKS217.aquifer / -(90 - 72 - 30)).toBe(20);
    expect(ledgerExamples217[0].answer).toBe("Fosil yatak 12 yılda, akifer 20 yılda sıfıra iner; önce fosil yakıt yatağı biter.");
    // Örnek 2: dengeyi koruyan en büyük av.
    expect(maxCatch217).toBe(40 - 15);
    expect(ledgerExamples217[1].answer).toBe("Av en çok 25 balık olmalıdır; şimdiki 35 balıktan 10 eksik.");
  });

  it("builds figure readouts from the same data as the tables", () => {
    const read = (id: keyof typeof lessons217, step: number) => depthFigures217[id][lessons217[id][0].title].draw(0, step).readout!.join(" ");
    expect(read("ekoloji-giris", 1)).toContain("Kemoototrof. Enerji kaynağı: bazı inorganik maddelerin oksidasyonu. Karbon kaynağı: CO₂.");
    expect(read("ekoloji-giris", 6)).toContain("karma beslenme");
    expect(read("besin-zinciri-agi", 0)).toContain("3 zincir");
    const steps = depthFigures217["besin-zinciri-agi"][webSupplement217.title].steps!;
    expect(steps).toEqual(["Tam ağ", "Çekirge çıkarılırsa", "Fare çıkarılırsa", "Kurbağa çıkarılırsa", "Yılan çıkarılırsa"]);
    expect(read("besin-zinciri-agi", 2)).toContain("Besin oku kalmayan: Yılan.");
    expect(read("besin-zinciri-agi", 3)).toContain("Bütün tüketicilerin en az bir besin oku kalır.");
    expect(read("besin-piramidi", 0)).toContain("Sonraki düzeye 9.000 geçmez");
    expect(read("besin-piramidi", 3)).toContain("10 kJ/m²/yıl, üreticinin %0,1’i");
    expect(read("madde-donguleri", 4)).toContain("NH₄⁺ → NO₂⁻");
    expect(read("guncel-cevre-sorunlari", 3)).toContain("Ötrofikasyon.");
    expect(read("dogal-kaynaklar-surdurulebilirlik", 0)).toContain("giriş 90, çıkış 102 → net −12 birim/yıl");
  });
});
