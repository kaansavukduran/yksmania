import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import {
  ekFiilErrors226, ekFiilExamples226, ekFiilFill226, ekFiilRows226, ekFiilSupplement226, fiilimsiExamples226, fiilimsiRows226,
  fiilimsiSupplement226, fiilimsiTriple226, kalipExamples226, kalipRows226, kalipSupplement226, mazRows226, ogeExampleRows226,
  ogeExamples226, ogeRows226, ogeSupplement226, proverbChoice226, turExampleResults226, turExampleRows226, turExamples226, turResults226,
  turRows226, turSupplement226,
} from "../src/learning/depth226";

const lessons226 = {
  "ek-fiil": [ekFiilSupplement226, ekFiilExamples226],
  fiilimsiler: [fiilimsiSupplement226, fiilimsiExamples226],
  "cumlenin-ogeleri": [ogeSupplement226, ogeExamples226],
  "cumle-turleri": [turSupplement226, turExamples226],
  "deyimler-ve-atasozleri": [kalipSupplement226, kalipExamples226],
} as const;
const sheetText = (sheet: NonNullable<ReturnType<typeof studyCheatSheet>>) => JSON.stringify(sheet);
const words = (s: string) => s.replace(/[.,!?;…“”]/g, "").split(" ").filter(Boolean);

/* ---------- Bağımsız ses kuralları (depth226 kodunu kullanmaz) ---------- */
const last = (s: string) => s.match(/[aıoueiöü](?=[^aıoueiöü]*$)/)![0];
const h4 = (s: string) => ({ a: "ı", ı: "ı", o: "u", u: "u", e: "i", i: "i", ö: "ü", ü: "ü" })[last(s)]!;
const h2 = (s: string) => (/[aıou]/.test(last(s)) ? "a" : "e");
const vEnd = (s: string) => /[aıoueiöü]$/.test(s);
const hard = (s: string) => /[fstkçşhp]$/.test(s);
const ekFiil = (b: string) => ({
  genis: `${b}${hard(b) ? "t" : "d"}${h4(b)}r`,
  ben: vEnd(b) ? `${b}y${h4(b)}m` : `${/[aıoueiöü]k$/.test(b) && b.match(/[aıoueiöü]/g)!.length > 1 ? b.slice(0, -1) + "ğ" : b}${h4(b)}m`,
  hikaye: `${b}${vEnd(b) ? "yd" : hard(b) ? "t" : "d"}${h4(b)}`,
  rivayet: `${b}${vEnd(b) ? "y" : ""}m${h4(b)}ş`,
  sart: `${b}${vEnd(b) ? "y" : ""}s${h2(b)}`,
});
/** Elle yazılmış beklenen biçimler: ünlü uyumu ve ses olayları için ikinci bağımsız kaynak. */
const handForms: Record<string, string[]> = {
  hasta: ["hastadır", "hastayım", "hastaydı", "hastaymış", "hastaysa"],
  öğrenci: ["öğrencidir", "öğrenciyim", "öğrenciydi", "öğrenciymiş", "öğrenciyse"],
  uykulu: ["uykuludur", "uykuluyum", "uykuluydu", "uykuluymuş", "uykuluysa"],
  üzgün: ["üzgündür", "üzgünüm", "üzgündü", "üzgünmüş", "üzgünse"],
  sessiz: ["sessizdir", "sessizim", "sessizdi", "sessizmiş", "sessizse"],
  boş: ["boştur", "boşum", "boştu", "boşmuş", "boşsa"],
  dürüst: ["dürüsttür", "dürüstüm", "dürüsttü", "dürüstmüş", "dürüstse"],
  sıcak: ["sıcaktır", "sıcağım", "sıcaktı", "sıcakmış", "sıcaksa"],
};

/* ---------- Bağımsız fiilimsi ek düzenleri (dersin listesi) ---------- */
const fiilimsiPatterns: [string, RegExp][] = [
  ["zarf-fiil", /^(y?[ıiuü]p|y?[ae]r[ae]k|y?[ıiuü]nc[ae]|m[ae]d[ae]n|m[ae]ks[ıi]z[ıi]n|[dt][ıiuü]kç[ae]|y?[ae]l[ıi]|y?[ae]s[ıi]y[ae])$/],
  ["isim-fiil", /^(m[ae]k|m[ae]|y?[ıiuü]ş)([ıiuü]|y[ıiuü])?$/],
  ["sıfat-fiil", /^(y?[ae]n|y?[ae]s[ıi]|m[ae]z|[ae]r|[dt][ıiuü][kğ]|y?[ae]c[ae][kğ]|m[ıiuü]ş)([ıiuü]m|[ıiuü]n|[ıiuü]|[ıiuü]m[ıiuü]z|[ıiuü]n[ıiuü]z|l[ae]r[ıi])?$/],
];
const fiilimsiType = (word: string, stem: string) => {
  const tail = word.slice(stem.length).toLocaleLowerCase("tr-TR");
  const hits = fiilimsiPatterns.filter(([, re]) => re.test(tail)).map(([t]) => t);
  expect(hits, `${word} tek türe uymalı`).toHaveLength(1);
  return hits[0];
};

/* ---------- Bağımsız öge kuralı ---------- */
const ogeRole = (p: { t: string; ek?: string; sem?: string; pred?: true }) => {
  if (p.pred) return "yüklem";
  const ek = (p.ek ?? "").replace("-", "");
  if (p.sem === "yapan") return "özne";
  if (p.sem === "etkilenen") return /^[ny]?[ıiuü]$/.test(ek) ? "belirtili nesne" : "belirtisiz nesne";
  if (p.sem === "yer" && /^(n?[dt][ae]n?|[ny]?[ae])$/.test(ek)) return "yer tamlayıcısı";
  return "zarf tümleci";
};

describe("TYT Türkçe depth 0.226", () => {
  it("appends a table section, a figure and two examples without touching the raw guide", () => {
    for (const [id, [added, examples]] of Object.entries(lessons226)) {
      expect(sectionFigureGuideIds, id).toContain(id);
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(raw.sections.some(({ title }) => title === added.title), id).toBe(false);
      expect(raw.examples.some(({ title }) => examples.some((e) => e.title === title)), id).toBe(false);
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections.slice(0, raw.sections.length)).toEqual(raw.sections);
      expect(shown.sections).toHaveLength(raw.sections.length + 1);
      expect(shown.sections.filter(({ table }) => table === added.table)).toHaveLength(1);
      const lastSection = shown.sections.at(-1)!;
      expect(lastSection.title).toBe(added.title);
      expect(lastSection.figureTitle).toBe(added.title);
      expect(added.figureTitle).toBe(added.title);
      expect(lastSection.paragraphs).toEqual(added.paragraphs);
      expect(lastSection.table?.layout).toBe("table");
      expect(lastSection.table!.rows.length).toBeGreaterThanOrEqual(5);
      expect(lastSection.table!.rows.length).toBeLessThanOrEqual(8);
      expect(lastSection.table!.headers.length).toBeLessThanOrEqual(5);
      expect(lastSection.table!.rows.every((row) => row.length === lastSection.table!.headers.length)).toBe(true);
      expect(shown.examples.slice(-2)).toEqual(examples);
      expect(shown.examples.slice(0, raw.examples.length)).toEqual(raw.examples);
      expect(shown.examples).toHaveLength(raw.examples.length + 2);
      expect(theorySupplements[id]).toEqual([added]);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.at(-1)!;
      expect(sheetSection.title).toBe(added.title);
      expect(sheetSection.table).toBe(lastSection.table);
      expect(sheetSection.text).toEqual([added.summary]);
      expect(sheetSection.figureTitle).toBe(added.figureTitle);
      expect(sheetText(sheet)).toContain(added.table.rows[0][0]);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        for (const field of [example.title, example.prompt, example.strategy, example.answer, example.check, example.pitfall]) expect(field.trim().length).toBeGreaterThan(10);
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî sınav|resmi sınav/i);
        expect(JSON.stringify(example)).not.toMatch(/undefined|\bNaN\b|Infinity|\[object/);
      }
      expect(JSON.stringify(added)).not.toMatch(/undefined|NaN|Infinity|\[object/);
      expect(JSON.stringify(added)).not.toMatch(/\b(the|and|yes|subject|object|idiom|proverb)\b/i);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBeDefined();
      expect(figure!.steps!.length).toBe(added.table.rows.length);
      for (let step = 0; step < figure!.steps!.length; step++)
        expect(JSON.stringify(figure!.draw(0, step))).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
    }
  });

  it("rebuilds every ek-fiil cell by harmony, buffer, assimilation and softening rules", () => {
    expect(ekFiilRows226.map((r) => r.base)).toEqual(Object.keys(handForms));
    ekFiilRows226.forEach((r, i) => {
      const f = ekFiil(r.base);
      const expected = [f.genis, f.ben, f.hikaye, f.rivayet, f.sart];
      expect(r.forms.map((x) => x.word)).toEqual(expected);
      expect(expected).toEqual(handForms[r.base]);
      const cells = ekFiilSupplement226.table.rows[i];
      expect(cells[0].startsWith(r.base)).toBe(true);
      expect(cells[1]).toContain(`${f.genis} / ${f.ben}`);
      expect(cells[2].split(" ")[0]).toBe(f.hikaye);
      expect(cells[3].split(" ")[0]).toBe(f.rivayet);
      expect(cells[4].split(" ")[0]).toBe(f.sart);
    });
    // Örnek 1 ve 2: boşluklar ve öğrenci hataları.
    expect(ekFiilFill226.map((x) => x.r.word)).toEqual([ekFiil("ıslak").hikaye, ekFiil("çamurlu").rivayet]);
    expect(ekFiilExamples226[0].answer).toBe("ıslaktı; çamurluymuş.");
    expect(ekFiilErrors226.map((e) => e.right.word)).toEqual([ekFiil("genç").hikaye, ekFiil("meraklı").sart, ekFiil("küçük").ben]);
    expect(ekFiilErrors226.map((e) => e.right.word)).toEqual(["gençti", "meraklıysa", "küçüğüm"]);
    expect(ekFiilErrors226.every((e) => e.rebuilt === e.wrong && e.wrong !== e.right.word)).toBe(true);
    expect(ekFiilExamples226[1].answer).toBe("gençti, meraklıysa ve küçüğüm.");
  });

  it("tags each fiilimsi by the lesson's suffix lists and checks its link in the sentence", () => {
    const expected = ["isim-fiil", "isim-fiil", "sıfat-fiil", "sıfat-fiil", "sıfat-fiil", "zarf-fiil", "zarf-fiil", "zarf-fiil"];
    fiilimsiRows226.forEach((r, i) => {
      expect(fiilimsiType(r.word, r.stem)).toBe(expected[i]);
      expect(r.tag.type).toBe(expected[i]);
      const toks = words(r.sentence);
      const at = toks.indexOf(r.word);
      if (r.tag.type === "sıfat-fiil") expect(toks[at + 1]).toBe(r.bound);
      else expect(toks.at(-1)).toBe(r.bound);
      const cells = fiilimsiSupplement226.table.rows[i];
      expect(cells[0]).toBe(r.sentence);
      expect(cells[1].replace(/-/g, "")).toBe(r.word.toLocaleLowerCase("tr-TR"));
      expect(cells[2]).toContain(expected[i]);
      expect(cells[3].startsWith(r.bound)).toBe(true);
    });
    expect(fiilimsiSupplement226.table.rows[4][1]).toBe("izle-diğ-imiz");
    // Örnek 1: üç fiilimsi, üç tür.
    expect(fiilimsiTriple226.items.map((x) => fiilimsiType(x.word, x.stem))).toEqual(["sıfat-fiil", "zarf-fiil", "isim-fiil"]);
    expect(fiilimsiExamples226[0].answer).toBe("öğrendiğimiz sıfat-fiil, söyleyerek zarf-fiil ve yürümek isim-fiil.");
    // Örnek 2: -maz adayı aynı, bağlam kararı farklı.
    expect(mazRows226.map((r) => fiilimsiType(r.word, r.stem))).toEqual(["sıfat-fiil", "sıfat-fiil", "sıfat-fiil"]);
    const ctx = mazRows226.map((r) => {
      const toks = words(r.sentence);
      const i = toks.indexOf(r.word);
      if (toks[i - 1] === `${r.stem}ar`) return "zarf-fiil ikilisi";
      return i === toks.length - 1 ? "çekimli fiil" : "sıfat-fiil";
    });
    expect(mazRows226.map((r) => r.ctx.kind)).toEqual(ctx);
    expect(ctx).toEqual(["zarf-fiil ikilisi", "çekimli fiil", "sıfat-fiil"]);
  });

  it("derives every element and its question from the case ending and meaning", () => {
    const expectedRoles = [
      ["özne", "zarf tümleci", "belirtili nesne", "yüklem"],
      ["özne", "yer tamlayıcısı", "belirtisiz nesne", "yüklem"],
      ["özne", "belirtili nesne", "yer tamlayıcısı", "yüklem"],
      ["özne", "zarf tümleci", "yer tamlayıcısı", "yüklem"],
      ["zarf tümleci", "yer tamlayıcısı", "belirtisiz nesne", "yüklem"],
      ["özne", "zarf tümleci", "yüklem"],
      ["özne", "belirtili nesne", "zarf tümleci", "yüklem"],
    ];
    const expectedQuestions = [
      ["Kim suladı?", "Ne zaman suladı?", "Neyi suladı?"],
      ["Kim aldı?", "Nereden aldı?", "Ne aldı?"],
      ["Kim bıraktı?", "Neyi bıraktı?", "Kime bıraktı?"],
      ["Kim zıpladı?", "Niçin zıpladı?", "Nereye zıpladı?"],
      ["Ne zaman yazdım?", "Nerede yazdım?", "Ne yazdım?"],
      ["Tertemiz olan ne?", "Ne zaman tertemiz?"],
      ["Kim onardı?", "Neyi onardı?", "Neyle onardı?"],
    ];
    ogeRows226.forEach((r, i) => {
      expect(r.parts.map(ogeRole)).toEqual(expectedRoles[i]);
      expect(r.parts.map((p) => p.t).join(" ") + ".").toBe(r.sentence);
      for (const p of r.parts) if (p.ek) expect(p.t.endsWith(p.ek.slice(1))).toBe(true);
      const cells = ogeSupplement226.table.rows[i];
      expect(cells[1]).toBe(r.parts.map((p, k) => `${p.t}: ${expectedRoles[i][k]}`).join(" · "));
      for (const qq of expectedQuestions[i]) expect(cells[2]).toContain(qq);
      expect(cells[3].startsWith(String(r.parts.length))).toBe(true);
    });
    expect(ogeSupplement226.table.rows[4][3]).toBe("4 (gizli ben sayılmaz)");
    // Örnekler.
    expect(ogeExampleRows226[0].parts.map(ogeRole)).toEqual(["özne", "belirtili nesne", "zarf tümleci", "yer tamlayıcısı", "zarf tümleci", "yüklem"]);
    expect(ogeExamples226[0].answer).toBe(ogeExampleRows226[0].parts.map((p) => `${p.t} (${ogeRole(p)})`).join(" / ") + ".");
    expect(ogeExamples226[0].steps.map((s) => s.expression)).toEqual(["gönderdi", "Kim gönderdi?", "Neyi gönderdi?", "Ne zaman gönderdi?", "Kime gönderdi?", "Neyle gönderdi?"]);
    expect(ogeExampleRows226[1].parts.map(ogeRole)).toEqual(["özne", "zarf tümleci", "yer tamlayıcısı", "zarf tümleci", "yüklem"]);
    expect(ogeExamples226[1].answer).toBe("Selin (özne) / heyecandan (zarf tümleci) / sahneden (yer tamlayıcısı) / erken (zarf tümleci) / indi (yüklem).");
  });

  it("classifies the eight sentences on four axes from element order and predicate analysis", () => {
    const qWords = /^(kim|ne|nerede|nereye|nereden|nasıl|niçin|kaç|kaçta|hangi)$/;
    const independent = (r: (typeof turRows226)[number]) => {
      if (r.clauses.some((c) => c.y < 0)) return ["belirlenmez", "eksiltili", "belirlenmez", "belirlenmez"];
      const tur = `${r.clauses.at(-1)!.kind} cümlesi`;
      const yer = r.clauses.every((c) => c.y === c.obek.length - 1) ? "kurallı" : "devrik";
      const m = r.clauses.flatMap((c) => c.morphs ?? []);
      const anlam = m.some((x) => /^m[ıiuü]$/.test(x)) || words(r.sentence).some((x) => qWords.test(x.toLocaleLowerCase("tr-TR")))
        ? "soru"
        : r.clauses.some((c) => /^m[ae]$/.test(c.morphs![1] ?? "") || c.morphs!.includes("değil"))
          ? "olumsuz"
          : "olumlu";
      const yapi = r.clauses.length > 1
        ? (r.joiners!.includes("ve") ? "bağlı" : `sıralı (${r.clauses[1].subject ? "bağımsız" : "bağımlı"})`)
        : r.yan?.kind === "fiilimsi"
          ? "birleşik (girişik)"
          : r.yan?.kind === "şart" ? "birleşik (şartlı)" : "basit";
      return [tur, yer, anlam, yapi];
    };
    const expected = [
      ["isim cümlesi", "devrik", "olumlu", "basit"],
      ["fiil cümlesi", "devrik", "olumsuz", "basit"],
      ["fiil cümlesi", "kurallı", "soru", "basit"],
      ["fiil cümlesi", "kurallı", "olumlu", "birleşik (girişik)"],
      ["fiil cümlesi", "kurallı", "olumlu", "birleşik (şartlı)"],
      ["fiil cümlesi", "kurallı", "olumlu", "sıralı (bağımlı)"],
      ["fiil cümlesi", "kurallı", "olumlu", "bağlı"],
      ["belirlenmez", "eksiltili", "belirlenmez", "belirlenmez"],
    ];
    turRows226.forEach((r, i) => {
      expect(independent(r)).toEqual(expected[i]);
      const x = turResults226[i];
      expect([x.tur, x.yer, x.anlam, x.yapi]).toEqual(expected[i]);
      const cells = turSupplement226.table.rows[i];
      expect(cells[0]).toBe(r.sentence);
      expected[i].forEach((value, k) => expect(cells[k + 1].startsWith(`${value}:`)).toBe(true));
      // Öbekler cümleyi eksiksiz kurar; yüklemin sırası cümledeki sıradır.
      const flat = r.clauses.flatMap((c, k) => [...(k > 0 && r.joiners![k - 1] !== "," ? [r.joiners![k - 1]] : []), ...c.obek]).join(" ");
      expect(words(flat)).toEqual(words(r.sentence));
    });
    // Girişik satırın yan yapısı fiilimsi listesinden zarf-fiildir.
    const gir = turRows226.find((r) => r.yan?.kind === "fiilimsi")!;
    expect(fiilimsiType(gir.yan!.word, gir.yan!.stem!)).toBe("zarf-fiil");
    // Örnekler.
    expect(turExampleRows226.map(independent)).toEqual([
      ["fiil cümlesi", "devrik", "olumsuz", "birleşik (girişik)"],
      ["fiil cümlesi", "devrik", "olumlu", "sıralı (bağımlı)"],
    ]);
    expect(fiilimsiType("çalan", "çal")).toBe("sıfat-fiil");
    expect(turExamples226[0].answer).toBe("Fiil cümlesi; devrik; olumsuz; birleşik (girişik).");
    expect(turExampleResults226[1].perClause).toEqual(["devrik", "kurallı"]);
    expect(turExamples226[1].answer).toBe("Birinci yargı devrik, ikinci yargı kurallı; cümle bağımlı sıralıdır.");
  });

  it("separates deyim and atasözü by the general-judgement criterion with fixed words kept", () => {
    const known: Record<string, string> = {
      "kulak asmamak": "deyim",
      "etekleri zil çalmak": "deyim",
      "pireyi deve yapmak": "deyim",
      "dört gözle beklemek": "deyim",
      "Ağaç yaşken eğilir.": "atasözü",
      "Bin işit, bir söyle.": "atasözü",
      "Sakla samanı, gelir zamanı.": "atasözü",
      "İşleyen demir ışıldar.": "atasözü",
    };
    expect(kalipRows226.map((k) => k.kalip)).toEqual(Object.keys(known));
    kalipRows226.forEach((k, i) => {
      const type = k.general ? "atasözü" : "deyim";
      expect(type).toBe(known[k.kalip]);
      const cells = kalipSupplement226.table.rows[i];
      expect(cells[0]).toBe(k.kalip);
      expect(cells[1]).toBe(type);
      expect(cells[2]).toBe(k.meaning);
      expect(cells[4]).toBe(k.usage);
      if (type === "deyim") {
        expect(k.kalip).toMatch(/m[ae]k$/);
        expect(k.usage).not.toContain(k.kalip);
        // Kalıp sözcükleri kullanımda yerinde: fiil kökü dahil her biri bir sözcüğün başı.
        for (const f of k.fixed) expect(words(k.usage).some((x) => x.startsWith(f.replace("-", "")))).toBe(true);
        expect(cells[3]).toContain(k.used);
      } else {
        expect(k.usage).toContain(`“${k.kalip}”`);
        expect(cells[3]).toContain(k.imperative ? "emirle öğüt" : "gözlem");
      }
    });
    expect(proverbChoice226).toEqual(["Sakla samanı, gelir zamanı."]);
    expect(kalipExamples226[0].answer).toContain("Sakla samanı, gelir zamanı.");
    expect(kalipExamples226[1].answer.startsWith("Hayır; deyimdir.")).toBe(true);
  });

  it("draws figure cards from the same table data", () => {
    const labels = (id: string, title: string, step: number) =>
      sectionFigures[id][title].draw(0, step).els.flatMap((e) => (e.k === "text" ? [e.s] : []));
    const t = (id: keyof typeof lessons226) => lessons226[id][0].title;
    ekFiilRows226.forEach((r, i) => expect(labels("ek-fiil", t("ek-fiil"), i)).toEqual(expect.arrayContaining(handForms[r.base])));
    fiilimsiRows226.forEach((r, i) => {
      const f = sectionFigures.fiilimsiler[t("fiilimsiler")].draw(0, i);
      expect(f.word!.map((p) => p.s).join("")).toBe(r.word.toLocaleLowerCase("tr-TR"));
      expect(labels("fiilimsiler", t("fiilimsiler"), i)).toEqual(expect.arrayContaining([r.bound, `-${r.tag.surface}`]));
    });
    ogeRows226.forEach((r, i) => expect(labels("cumlenin-ogeleri", t("cumlenin-ogeleri"), i)).toEqual(expect.arrayContaining(r.parts.map(ogeRole))));
    turResults226.forEach((x, i) => expect(labels("cumle-turleri", t("cumle-turleri"), i)).toEqual(expect.arrayContaining([x.yer])));
    kalipRows226.forEach((k, i) => expect(labels("deyimler-ve-atasozleri", t("deyimler-ve-atasozleri"), i)).toEqual(expect.arrayContaining([k.general ? "atasözü" : "deyim", k.general ? "evet" : "hayır"])));
  });
});
