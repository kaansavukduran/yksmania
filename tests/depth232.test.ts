import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import {
  CLUES232, HISTORY_DATES232, balance232, balanceExamples232, balanceSupplement232, developmentExamples232, developmentSupplement232,
  institutionExamples232, institutionSupplement232, reformExamples232, reformSupplement232, treatyExamples232, treatySupplement232,
} from "../src/learning/depth232";

const lessons232 = {
  "klasik-cag-osmanli-toplum-duzeni": [institutionSupplement232, institutionExamples232],
  "degisen-dunya-dengeleri-osmanli": [treatySupplement232, treatyExamples232],
  "degisim-caginda-avrupa-osmanli": [developmentSupplement232, developmentExamples232],
  "devrimler-caginda-devlet-toplum": [reformSupplement232, reformExamples232],
  "denge-stratejisi": [balanceSupplement232, balanceExamples232],
} as const;
const rawText = (id: string) => JSON.stringify(lessonGuides.get(id));

/** Her yıl, dersin kendi metnindeki bir ifadeyle eşleşir (tırnak biçimi dersin yazımıyla). */
const DATE_PHRASES: Record<keyof typeof HISTORY_DATES232, [string, string]> = {
  zitvatorok: ["degisen-dunya-dengeleri-osmanli", "1606 Zitvatorok"],
  kasriSirin: ["degisen-dunya-dengeleri-osmanli", "1639 Kasr-ı Şirin"],
  karlofca: ["degisen-dunya-dengeleri-osmanli", "1699 Karlofça"],
  istanbul1700: ["degisen-dunya-dengeleri-osmanli", "1700 İstanbul Antlaşması"],
  prut: ["degisen-dunya-dengeleri-osmanli", "1711 Prut"],
  pasarofca: ["degisen-dunya-dengeleri-osmanli", "1718 Pasarofça"],
  belgrad: ["degisen-dunya-dengeleri-osmanli", "1736–1739"],
  kucukKaynarca: ["degisen-dunya-dengeleri-osmanli", "1774 Küçük Kaynarca"],
  malikane: ["degisim-caginda-avrupa-osmanli", "1695'ten itibaren malikâne"],
  laleStart: ["degisim-caginda-avrupa-osmanli", "1718 Pasarofça sonrasından"],
  matbaa: ["degisim-caginda-avrupa-osmanli", "1727'deki girişimi"],
  laleEnd: ["degisim-caginda-avrupa-osmanli", "1730 Patrona Halil"],
  kabakci: ["devrimler-caginda-devlet-toplum", "1807 Kabakçı Mustafa"],
  senedIttifak: ["devrimler-caginda-devlet-toplum", "1808 Sened-i İttifak"],
  yeniceriKaldirildi: ["devrimler-caginda-devlet-toplum", "1826'da Yeniçeri Ocağı kaldırıldı"],
  tanzimat: ["devrimler-caginda-devlet-toplum", "1839 Tanzimat"],
  islahat: ["devrimler-caginda-devlet-toplum", "1856 Islahat"],
  kanunEsasi: ["devrimler-caginda-devlet-toplum", "1876 Kanun-ı Esasi"],
  meclisTatil: ["devrimler-caginda-devlet-toplum", "1878'de meclisin süresiz tatili"],
  mesrutiyet2: ["devrimler-caginda-devlet-toplum", "1908'de II. Meşrutiyet"],
  degisiklik1909: ["devrimler-caginda-devlet-toplum", "1909 anayasa değişiklikleri"],
  kirimBagimsiz: ["denge-stratejisi", "1774 Küçük Kaynarca"],
  kirimIlhak: ["denge-stratejisi", "1783'teki ilhakı"],
  yas: ["denge-stratejisi", "1792 Yaş"],
  misirIsgal: ["denge-stratejisi", "1798'de Mısır"],
  sirpIsyan: ["denge-stratejisi", "1804 isyanı"],
  bukres: ["denge-stratejisi", "1812 Bükreş"],
  navarin: ["denge-stratejisi", "1827 Navarin"],
  edirne: ["denge-stratejisi", "1829 Edirne"],
  hunkarIskelesi: ["denge-stratejisi", "1833 Hünkâr İskelesi"],
  sinop: ["denge-stratejisi", "1853 Sinop"],
  kirimSavasiGiris: ["denge-stratejisi", "1854'te başlayan dış borçlanma"],
  paris: ["denge-stratejisi", "1856 Paris"],
  berlin: ["denge-stratejisi", "1878 Berlin"],
  tunus: ["denge-stratejisi", "1881'de Tunus"],
  misirIngiliz: ["denge-stratejisi", "1882'de Mısır"],
};

describe("TYT Tarih depth 0.232", () => {
  it("appends a table section, a figure and two examples without touching the raw guide", () => {
    for (const [id, [added, examples]] of Object.entries(lessons232)) {
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
      expect(theorySupplements[id]).toEqual([added]);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.at(-1)!;
      expect(sheetSection.title).toBe(added.title);
      expect(sheetSection.table).toBe(last.table);
      expect(sheetSection.text).toEqual([added.summary]);
      expect(sheetSection.figureTitle).toBe(added.figureTitle);
      expect(JSON.stringify(sheet)).toContain(added.table.rows[0][1]);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        for (const field of [example.title, example.prompt, example.strategy, example.answer, example.check, example.pitfall]) expect(field.trim().length).toBeGreaterThan(10);
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî sınav|resmi sınav/i);
        expect(JSON.stringify(example)).not.toMatch(/undefined|\bNaN\b|Infinity|\[object/);
      }
      expect(JSON.stringify(added)).not.toMatch(/undefined|NaN|Infinity|\[object/);
      expect(JSON.stringify(added)).not.toMatch(/\b(the|and|yes|treaty|century)\b/i);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBeDefined();
      expect(figure!.steps!.length).toBe(added.table.rows.length);
      for (let step = 0; step < figure!.steps!.length; step++)
        expect(JSON.stringify(figure!.draw(0, step))).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
    }
  });

  it("takes every year from the lessons' own text and invents none", () => {
    for (const [key, [id, phrase]] of Object.entries(DATE_PHRASES)) {
      expect(rawText(id), `${key}: ${phrase}`).toContain(phrase);
      expect(phrase).toContain(String(HISTORY_DATES232[key as keyof typeof HISTORY_DATES232]));
    }
    expect(Object.keys(DATE_PHRASES).sort()).toEqual(Object.keys(HISTORY_DATES232).sort());
    // Her bölümdeki dört haneli yıllar, o dersin metninde geçer.
    for (const [id, [added, examples]] of Object.entries(lessons232)) {
      const years = new Set(JSON.stringify([added, examples]).match(/\b1[5-9]\d\d\b/g) ?? []);
      for (const y of years) expect(rawText(id), `${id}: ${y}`).toContain(y);
    }
    // Toplum düzeni dersi yıl vermez; ek bölüm de yıl kullanmaz.
    expect(rawText("klasik-cag-osmanli-toplum-duzeni")).not.toMatch(/\b1[0-9]{3}\b/);
    expect(JSON.stringify([institutionSupplement232, institutionExamples232])).not.toMatch(/\b1[0-9]{3}\b/);
  });

  it("classifies institutions by clue intersection", () => {
    const rows = institutionSupplement232.table.rows;
    const text = rawText("klasik-cag-osmanli-toplum-duzeni");
    for (const term of ["çıplak mülkiyet", "bir çift öküz", "çiftbozan", "Kethüda, yiğitbaşı", "mütevelli", "İstimâlet", "İaşecilik", "Narh loncanın tamamı değildir", "loncayı vakıfla tamamen aynı kurum yapmaz", "Mülk arazi özel mülkiyetle"])
      expect(text, term).toContain(term);
    const names = rows.map((r) => r[0]);
    expect(names).toEqual(["Mirî arazi", "Çift-hane", "Tımar", "Lonca", "Narh", "Vakıf", "Vakfiye", "İstimâlet"]);
    const pick = (clues: string[]) => names.filter((n) => clues.every((c) => CLUES232[c].includes(n as never)));
    expect(pick(["aile emeği", "çift öküz"])).toEqual(["Çift-hane"]);
    expect(pick(["yardım"])).toEqual(["Lonca", "Vakıf"]);
    expect(pick(["yardım", "ürün standardı"])).toEqual(["Lonca"]);
    expect(institutionExamples232[0].answer).toBe("A: Çift-hane. B: kesin seçilemez; 2 aday kalır (Lonca ve Vakıf). C: Lonca.");
    // Öykü: altı kavram, ayrı tutulacak sütununun ilk sözcüğü öyküde olan çiftler.
    const story = ["Çift-hane", "Tımar", "Mirî arazi", "Lonca", "Narh", "Vakıf"];
    const pairs = rows.filter((r) => story.includes(r[0]) && story.includes(r[4].split(" (")[0])).map((r) => `${r[0]} – ${r[4].split(" (")[0]}`);
    expect(pairs).toEqual(["Çift-hane – Tımar", "Tımar – Mirî arazi", "Lonca – Vakıf", "Narh – Lonca"]);
    expect(institutionExamples232[1].answer).toBe(`(1) Çift-hane, (2) Tımar, (3) Mirî arazi, (4) Lonca, (5) Narh, (6) Vakıf. Öyküde ${pairs.length} çift vardır: ${pairs.join(", ")}.`);
  });

  it("orders the treaties by year and derives the territorial direction from the clauses", () => {
    const rows = treatySupplement232.table.rows;
    const lessonYears: Record<string, number> = { Zitvatorok: 1606, "Kasr-ı Şirin": 1639, Karlofça: 1699, İstanbul: 1700, Prut: 1711, Pasarofça: 1718, Belgrad: 1739, "Küçük Kaynarca": 1774 };
    expect(rows.map((r) => r[1])).toEqual(Object.entries(lessonYears).sort((a, b) => a[1] - b[1]).map(([n]) => n));
    rows.forEach((r) => expect(Number(r[0])).toBe(lessonYears[r[1]]));
    const expected: Record<string, string> = { Zitvatorok: "Derste toprak maddesi yok", "Kasr-ı Şirin": "Derste toprak maddesi yok", Karlofça: "Kayıp", İstanbul: "Kayıp", Prut: "Kazanım", Pasarofça: "Farklı yönlü", Belgrad: "Kazanım", "Küçük Kaynarca": "Derste toprak maddesi yok" };
    for (const r of rows) expect(r[4], r[1]).toBe(expected[r[1]]);
    expect(rows.filter((r) => r[2].includes("Rusya")).map((r) => r[1])).toEqual(["İstanbul", "Prut", "Belgrad", "Küçük Kaynarca"]);
    expect(rows.find((r) => r[1] === "Karlofça")![2]).not.toContain("Rusya");
    const cards = ["Prut", "Karlofça", "Belgrad", "İstanbul", "Pasarofça"].sort((a, b) => lessonYears[a] - lessonYears[b]);
    expect(treatyExamples232[0].answer).toBe(`${cards.map((c) => `${c} (${lessonYears[c]})`).join(" → ")}. Rusya İstanbul, Prut ve Belgrad antlaşmalarının tarafıdır. Azak ${1711 - 1700} yıl sonra geri alınmıştır.`);
    expect(treatyExamples232[1].answer).toBe("Pasarofça: farklı yönlü; Zitvatorok: derste toprak maddesi yok; Belgrad: kazanım; Karlofça: kayıp. Tabloda 2 kayıp vardır (Karlofça ve İstanbul).");
    expect(rows.filter((r) => r[4] === "Kayıp")).toHaveLength(2);
  });

  it("keeps the developments' Osmanlı link only where the lesson gives one and dates the Lâle Devri", () => {
    const rows = developmentSupplement232.table.rows;
    expect(rows.map((r) => r[0])).toEqual(["Rönesans", "Reform", "Bilim Devrimi", "Aydınlanma", "Merkantilizm", "Fiyat Devrimi", "Askerî dönüşüm"]);
    expect(rows.filter((r) => r[4].startsWith("Bu derste")).map((r) => r[0])).toEqual(["Rönesans", "Bilim Devrimi", "Aydınlanma", "Merkantilizm"]);
    const text = rawText("degisim-caginda-avrupa-osmanli");
    for (const person of ["Martin Luther", "Copernicus", "Kepler", "Galileo", "Newton", "Locke", "Montesquieu", "Rousseau", "sekban, sarıca, levent", "Osmanlı para ve ticaret sistemi bu dolaşımdan etkileniyordu", "doğrudan mezhep değişimi ile diplomatik ve düşünsel etkiler farklıdır"])
      expect(text, person).toContain(person);
    expect(developmentExamples232[0].answer).toBe("A: Aydınlanma. B: kesin seçilemez; 2 aday kalır (Bilim Devrimi ve Aydınlanma). C: Fiyat Devrimi.");
    const cards = [1695, 1730, 1727, 1718].sort((a, b) => a - b);
    expect(cards).toEqual([1695, 1718, 1727, 1730]);
    expect(developmentExamples232[1].answer).toContain(`Lâle Devri ${1730 - 1718} yıl; matbaa başlangıçtan ${1727 - 1718} yıl sonradır.`);
    expect(developmentExamples232[1].answer).toContain("Nuruosmaniye yapısı (yılsız, 1730 sonrası)");
  });

  it("computes the assembly state from the 1876, 1878 and 1908 events", () => {
    const rows = reformSupplement232.table.rows;
    const state = (y: number) => (y >= 1908 ? "Meclis yeniden işler" : y >= 1878 ? "Meclis tatilde" : y >= 1876 ? "Meclis-i Umumî var" : "Henüz meclis yok");
    for (const r of rows) expect(r[4], r[0]).toBe(state(Number(r[0])));
    expect(rows.map((r) => Number(r[0]))).toEqual([1808, 1826, 1839, 1856, 1876, 1878, 1908, 1909]);
    expect(rows.filter((r) => r[2] === "Anayasa").map((r) => r[1])).toEqual(["Kanun-ı Esasi"]);
    expect(rows.filter((r) => r[2] === "Ferman").map((r) => r[1])).toEqual(["Tanzimat Fermanı", "Islahat Fermanı"]);
    expect(new Set(rows.map((r) => r[3]))).toEqual(new Set(["İdari-siyasal", "Askerî", "Hukuki", "Temsil"]));
    expect(reformExamples232[0].answer).toBe(`1839: ${state(1839)}; 1856: ${state(1856)}; 1876: ${state(1876)}; 1909: ${state(1909)}. Meclis ${1908 - 1878} yıl tatilde kaldı; Kabakçı’dan 1826’ya ${1826 - 1807} yıl geçti.`);
    expect(reformExamples232[1].answer).toBe("A: kesin seçilemez; Sened-i İttifak ve Kanun-ı Esasi. B: Kanun-ı Esasi (1876). C: Sened-i İttifak (1808). D: Islahat Fermanı (1856).");
    const text = rawText("devrimler-caginda-devlet-toplum");
    for (const phrase of ["Belge anayasa değildir", "Kanun-ı Esasi ilk Osmanlı anayasasıdır", "Ferman padişahın ilanıdır; ilk Osmanlı anayasası değildir", "merkezle bazı ayanlar arasında"]) expect(text, phrase).toContain(phrase);
  });

  it("counts role changes and statü stages from the balance data", () => {
    const rows = balanceSupplement232.table.rows;
    expect(rows.map((r) => Number(r[0]))).toEqual([1798, 1827, 1833, 1854, 1878, 1882]);
    // Bağımsız rol sayımı: satır verisinden yıl sırasıyla.
    const changes = (a: string) => {
      const roles = balance232.flatMap((b) => (b.with.includes(a as never) ? ["d"] : b.against.includes(a as never) ? ["k"] : []));
      return roles.filter((r, i) => i > 0 && roles[i - 1] !== r).length;
    };
    expect(["Rusya", "İngiltere", "Fransa", "Mısır (Mehmet Ali Paşa)"].map(changes)).toEqual([3, 3, 2, 1]);
    expect(balanceExamples232[0].answer).toContain("Rusya 3, İngiltere 3, Fransa 2, Mısır (Mehmet Ali Paşa) 1.");
    expect(balanceExamples232[0].answer).toContain("En çok değişen: Rusya ve İngiltere (3’er kez).");
    const sirp = [1804, 1812, 1829, 1878], kirim = [1774, 1783, 1792];
    const gaps = [...sirp.slice(1).map((y, i) => y - sirp[i]), ...kirim.slice(1).map((y, i) => y - kirim[i])];
    expect(gaps).toEqual([8, 17, 49, 9, 9]);
    expect(balanceExamples232[1].answer).toContain(`En uzun ara ${Math.max(...gaps)} yıl, Sırp dizisinde: Edirne: özerklik → Berlin: bağımsızlık.`);
    const text = rawText("denge-stratejisi");
    for (const phrase of ["Osmanlı yönetimi Fransa'ya karşı İngiltere ve Rusya'yla yakınlaştı", "İngiliz, Fransız ve Rus donanmalarının Osmanlı-Mısır donanmasını imha", "II. Mahmut'un Rusya'dan destek istemesi", "İngiltere ve Fransa 1854'te Rusya'ya karşı savaşa girdi", "Kıbrıs yönetiminin İngiltere'ye bırakılması", "Osmanlı için yeni bir yakınlaşma alanı açtı"])
      expect(text, phrase).toContain(phrase);
  });

  it("builds figure labels and readouts from the table data", () => {
    const frame = (id: string, title: string, step: number) => sectionFigures[id][title].draw(0, step);
    const labels = (f: ReturnType<typeof frame>) => f.els.flatMap((el) => (el.k === "text" ? [el.s] : []));
    institutionSupplement232.table.rows.forEach((row, step) => {
      const f = frame("klasik-cag-osmanli-toplum-duzeni", institutionSupplement232.title, step);
      expect(labels(f)).toContain(row[0]);
      expect(f.readout![0]).toContain(row[1]);
      expect(f.readout![2]).toContain(row[4]);
    });
    treatySupplement232.table.rows.forEach((row, step) => {
      const f = frame("degisen-dunya-dengeleri-osmanli", treatySupplement232.title, step);
      expect(labels(f)).toContain(`${row[0]} ${row[1]}`);
      expect(f.readout![1]).toContain(row[3]);
      expect(f.readout![2]).toContain(row[4]);
    });
    developmentSupplement232.table.rows.forEach((row, step) => {
      const f = frame("degisim-caginda-avrupa-osmanli", developmentSupplement232.title, step);
      expect(labels(f)).toContain(row[0]);
      expect(f.readout![2]).toContain(row[4]);
      expect(f.els.some((el) => el.k === "vec")).toBe(!row[4].startsWith("Bu derste"));
    });
    reformSupplement232.table.rows.forEach((row, step) => {
      const f = frame("devrimler-caginda-devlet-toplum", reformSupplement232.title, step);
      expect(labels(f).some((s) => s.startsWith(row[0]))).toBe(true);
      expect(f.readout![0]).toBe(`${row[0]} · ${row[1]} · ${row[2]} · ${row[3]}.`);
      expect(f.readout![2]).toContain(row[4]);
    });
    balanceSupplement232.table.rows.forEach((row, step) => {
      const f = frame("denge-stratejisi", balanceSupplement232.title, step);
      expect(labels(f)).toContain(row[0]);
      expect(f.readout![0]).toContain(row[1]);
      expect(f.readout![2]).toContain(row[4]);
      const b = balance232[step];
      expect(f.els.filter((el) => el.k === "seg").length).toBe(b.with.length + b.against.length);
    });
  });
});
