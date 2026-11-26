import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { pad, rect } from "./biologyFigures059Kit";
import {
  fungusColumns211, fungusRows211, fungusSection211, kingdomCellText211, kingdomColumns211, kingdomRows211, kingdomSection211,
  matchKingdoms211, plantKeySteps211, plantRows211, plantSection211, prokaryoteColumns211, prokaryoteRows211, prokaryoteSection211,
  protistCellColumn211, protistColumns211, protistFilters211, protistMatches211, protistRows211, protistSection211, unknownKingdom211,
} from "../depth211";

/*
 * 0.211.0 TYT Biyoloji tablo bölümlerinin çizimleri. Her ad, değer ve okuma
 * bölüm tablosunu üreten aynı satırlardan gelir; çizim yalnız görüntüdür ve
 * adım değiştirmek öğrenme kaydı üretmez.
 */

const names = (rows: readonly { group?: string; name?: string }[]) => rows.map((r) => r.group ?? r.name).join(", ");

/* ---------- Üst âlem ve âlem matrisi ---------- */

const KINGDOM_STEPS = [kingdomColumns211[1], kingdomColumns211[2], kingdomColumns211[3], "Bilinmeyeni süz"];
const kingdomFigure: FigureDef = {
  caption: `${kingdomRows211.length} grup satır satır dizildi; solda üst âlemleri, sağda seçilen sütunun değeri. Son adım bölümdeki bilinmeyen ökaryotu (kitinli duvar, emilimle beslenme) sütun sütun süzer.`,
  alt: `Altı satırlık liste: ${kingdomRows211.map(({ group, domain }) => `${group} (${domain})`).join(", ")}. Prokaryot gruplar bir tonda, ökaryot âlemler başka tonda. Eukarya köşeli parantezi dört âlemi kapsar. Her adımda satırların sağında hücre düzeni, hücre duvarı ya da beslenme değeri yazar.`,
  steps: KINGDOM_STEPS,
  draw: (_v, step) => {
    const els: El[] = [];
    const yOf = (i: number) => 5.4 - i * 1.0;
    const afterCell = matchKingdoms211({ cell: unknownKingdom211.cell });
    const final = matchKingdoms211({ cell: unknownKingdom211.cell, wallKey: unknownKingdom211.wallKey });
    kingdomRows211.forEach((row, i) => {
      const y = yOf(i);
      const tone: Tone = row.cell === "prokaryot" ? "b" : "c";
      const out = step === 3 && !afterCell.includes(row);
      const dim = step === 3 && afterCell.includes(row) && !final.includes(row);
      const on = step === 3 && final.includes(row);
      els.push(rect(2.5, y - 0.38, 5.4, y + 0.38, { tone: on ? "a" : out || dim ? "muted" : tone, fill: out ? undefined : on ? "a" : tone, thin: !on, bold: on, dash: out }));
      els.push(txt(v(3.95, y), row.group, "c", { small: true, bold: true, tone: out ? "muted" : "ink" }));
      const value = step === 0 || step === 3 && out ? kingdomCellText211(row) : step === 2 ? row.nutrition : row.wall;
      els.push(txt(v(5.55, y), value, "e", { small: true, bold: on, tone: on ? "a" : out || dim ? "muted" : "ink" }));
      if (row.domain !== "Eukarya") els.push(txt(v(1.2, y), row.domain, "c", { small: true, tone: "muted" }));
    });
    const euk = kingdomRows211.map((row, i) => [row, i] as const).filter(([row]) => row.domain === "Eukarya").map(([, i]) => i);
    const top = yOf(euk[0]) + 0.4;
    const bottom = yOf(euk[euk.length - 1]) - 0.4;
    els.push(seg(v(2.25, top), v(2.25, bottom), { tone: "muted" }), seg(v(2.25, top), v(2.4, top), { tone: "muted" }), seg(v(2.25, bottom), v(2.4, bottom), { tone: "muted" }));
    els.push(txt(v(1.2, (top + bottom) / 2), "Eukarya", "c", { small: true, tone: "muted" }));
    els.push(txt(v(5.55, 6.2), KINGDOM_STEPS[step === 3 ? 1 : step], "e", { small: true, bold: true }));
    els.push(...pad(v(0, 6.6), v(9.6, 0.0)));
    const prok = kingdomRows211.filter(({ cell }) => cell === "prokaryot");
    const eukRows = kingdomRows211.filter(({ cell }) => cell === "ökaryot");
    const readout = [
      [`Prokaryot: ${names(prok)}. Ökaryot: ${names(eukRows)}.`, "Hücre düzeni iki prokaryot grubu birbirinden ayırmaz."],
      [`Duvar: ${kingdomRows211.map(({ group, wall }) => `${group.toLocaleLowerCase("tr-TR")} ${wall}`).join(", ")}.`, "İki prokaryot grup duvar sütununda ayrılır."],
      [`Yalnız heterotrof: ${names(matchKingdoms211({ autotrophs: false }))}.`, `Ototrof üyesi olan: ${names(matchKingdoms211({ autotrophs: true }))}.`],
      [`${unknownKingdom211.cell} → ${afterCell.length} aday; ${final.map(({ wall }) => wall).join("")} → ${names(final)}.`, `Beslenme denetimi: ${final.map(({ nutrition }) => nutrition).join("")}.`],
    ][step];
    return { els, readout };
  },
};

/* ---------- Bakteri ve arke: bir satır, iki hücre ---------- */

type CellPart = "all" | "dna" | "membrane" | "wall" | "ribosome" | "none";
const PART: Record<string, CellPart> = {
  "Hücre tipi": "all",
  "Zarla çevrili çekirdek": "dna",
  "Zar lipidi": "membrane",
  "Duvarda peptidoglikan": "wall",
  "Ribozomal RNA": "ribosome",
  "Histon proteinleri": "dna",
  "Yaşam ortamı": "none",
  "Çoğalma": "all",
};
const loop = (c: V, r: number): V[] => Array.from({ length: 14 }, (_, i) => {
  const t = (2 * Math.PI * i) / 14;
  const rr = r * (1 + 0.22 * Math.sin(3 * t));
  return v(c[0] + rr * Math.cos(t), c[1] + 0.7 * rr * Math.sin(t));
});
const prokaryoteCell = (c: V, base: Tone, part: CellPart, wallAbsent: boolean): El[] => {
  const hl = (p: CellPart) => part === p || part === "all";
  const ribos = [[-0.7, 0.45], [0.75, 0.5], [-0.8, -0.35], [0.65, -0.55], [0.1, 0.85], [-0.1, -0.85]].map(([x, y]) => v(c[0] + x, c[1] + y));
  return [
    circle(c, 1.5, part === "wall" && wallAbsent ? { tone: "muted", dash: true, thin: true } : { tone: hl("wall") ? "a" : base, bold: hl("wall"), thin: !hl("wall") }),
    circle(c, 1.25, { tone: hl("membrane") ? "a" : base, fill: base, bold: hl("membrane"), thin: !hl("membrane") }),
    poly(loop(c, 0.42), { smooth: true, tone: hl("dna") ? "a" : "ink", bold: hl("dna"), thin: !hl("dna") }),
    ...ribos.map((p) => circle(p, 0.07, { tone: hl("ribosome") ? "a" : "ink", fill: hl("ribosome") ? "a" : "ink" })),
  ];
};
const prokaryoteFigure: FigureDef = {
  caption: "Her adım tablonun bir satırıdır. İki hücre aynı şemayla çizildi: dış halka duvar, iç halka zar, ortada halkasal DNA, noktalar ribozom. Satırın ilgili parçası vurgulanır; ortadaki işaret değerlerin aynı mı farklı mı olduğunu gösterir.",
  alt: "Yan yana iki yuvarlak prokaryot hücre şeması, solda Bakteriler, sağda Arkeler. Her hücrede dış duvar halkası, iç zar halkası, ortada çekirdek zarı olmayan DNA ve dağınık ribozom noktaları. Altlarında seçilen satırın değerleri, ortada eşit ya da eşit değil işareti, en altta ayırt etme gücü.",
  steps: prokaryoteRows211.map(({ feature }) => feature),
  draw: (_v, step) => {
    const row = prokaryoteRows211[step];
    const part = PART[row.feature] ?? "none";
    const L = v(2.6, 2.6);
    const R = v(9.0, 2.6);
    const same = row.bacteria === row.archaea;
    const els: El[] = [
      ...prokaryoteCell(L, "b", part, false),
      ...prokaryoteCell(R, "c", part, row.archaea === "yok" && part === "wall"),
      txt(v(L[0], 4.35), prokaryoteColumns211[1], "c", { small: true, bold: true }),
      txt(v(R[0], 4.35), prokaryoteColumns211[2], "c", { small: true, bold: true }),
      txt(v(L[0], 0.75), row.bacteria, "c", { small: true, bold: true, tone: "a" }),
      txt(v(R[0], 0.75), row.archaea, "c", { small: true, bold: true, tone: "a" }),
      txt(v(5.8, 2.6), same ? "=" : "≠", "c", { bold: true, tone: same ? "muted" : "warn" }),
      txt(v(5.8, 5.2), row.feature, "c", { bold: true }),
      txt(v(5.8, -0.1), `${prokaryoteColumns211[3]}: ${row.verdict}`, "c", { small: true, tone: "warn" }),
      ...pad(v(0.4, 5.7), v(11.2, -0.5)),
    ];
    return {
      els,
      readout: [
        `${row.feature}: bakteride ${row.bacteria}, arkede ${row.archaea}.`,
        `${prokaryoteColumns211[3]}: ${row.verdict}.`,
      ],
    };
  },
};

/* ---------- Protista: süzgeçle satır seç ---------- */

const protistFigure: FigureDef = {
  caption: `${protistRows211.length} protist örneği satır satır. Her adım bir özellik sorar; o özelliği taşıyan satırlar vurgulanır, diğerleri soluklaşır. “Hepsinde” ile “bazısında” farkını satır sayısından oku.`,
  alt: `Beş satırlık liste: ${protistRows211.map(({ name }) => name).join(", ")}. Her satırda solda örnek adı, sağda seçilen sütunun değeri. Seçilen özelliği taşıyan satırlar renkli ve kalın, diğerleri kesik çizgili ve soluk.`,
  steps: protistFilters211.map(({ label }) => label),
  draw: (_v, step) => {
    const els: El[] = [];
    const hits = protistMatches211(step);
    const column = step === 0 ? protistColumns211[1] : step === 3 ? protistCellColumn211 : protistColumns211[2];
    protistRows211.forEach((row, i) => {
      const y = 4.4 - i * 1.0;
      const on = hits.includes(row);
      els.push(rect(0.2, y - 0.38, 3.3, y + 0.38, on ? { tone: "a", fill: "a", bold: true } : { tone: "muted", thin: true, dash: true }));
      els.push(txt(v(1.75, y), row.name, "c", { small: true, bold: true, tone: on ? "ink" : "muted" }));
      const value = step === 0 ? row.movement : step === 3 ? row.cell : row.nutrition;
      els.push(txt(v(3.45, y), value, "e", { small: true, bold: on, tone: on ? "ink" : "muted" }));
    });
    els.push(txt(v(3.45, 5.2), column, "e", { small: true, bold: true }));
    els.push(...pad(v(0, 5.6), v(10.6, -0.1)));
    const all = hits.length === protistRows211.length;
    return {
      els,
      readout: [
        `${protistFilters211[step].label}: ${names(hits)} (${hits.length}/${protistRows211.length}).`,
        all ? "Bütün satırlarda var: “hepsinde” öncülü doğru." : `Yalnız ${hits.length} satırda var: “hepsinde” ve “hiçbirinde” öncülleri yanlış.`,
      ],
    };
  },
};

/* ---------- Mantarlar: dört örnek, dört çizim ---------- */

const fungusIcon = (i: number, cx: number, on: boolean): El[] => {
  const tone: Tone = on ? "a" : "ink";
  const s = { tone, bold: on, thin: !on };
  const ground = seg(v(cx - 1.2, 1.6), v(cx + 1.2, 1.6), { tone: "muted", thin: true });
  if (i === 0) {
    return [
      circle(v(cx - 0.25, 2.6), 0.55, { ...s, fill: on ? "a" : "b" }),
      circle(v(cx + 0.45, 3.05), 0.25, { ...s, fill: on ? "a" : "b" }),
      circle(v(cx + 0.55, 2.0), 0.4, { ...s, fill: on ? "a" : "b" }),
    ];
  }
  if (i === 1) {
    return [
      rect(cx - 1.2, 1.1, cx + 1.2, 1.6, { tone: "muted", fill: "c", thin: true }),
      poly([v(cx - 1.0, 1.75), v(cx - 0.4, 1.85), v(cx + 0.2, 1.75), v(cx + 0.9, 1.85)], { open: true, smooth: true, ...s }),
      seg(v(cx - 0.55, 1.83), v(cx - 0.55, 3.2), s),
      seg(v(cx + 0.45, 1.8), v(cx + 0.45, 2.85), s),
      circle(v(cx - 0.55, 3.42), 0.22, { ...s, fill: on ? "a" : "b" }),
      circle(v(cx + 0.45, 3.07), 0.22, { ...s, fill: on ? "a" : "b" }),
    ];
  }
  if (i === 2) {
    const cap = Array.from({ length: 13 }, (_, k) => {
      const t = (Math.PI * k) / 12;
      return v(cx + 0.95 * Math.cos(t), 2.85 + 0.75 * Math.sin(t));
    });
    return [
      ground,
      rect(cx - 0.15, 1.6, cx + 0.15, 2.85, { ...s, fill: on ? "a" : "b" }),
      poly(cap, { ...s, fill: on ? "a" : "b" }),
      seg(v(cx, 1.6), v(cx - 0.8, 1.05), { tone, thin: true }),
      seg(v(cx, 1.6), v(cx + 0.85, 1.1), { tone, thin: true }),
      seg(v(cx, 1.6), v(cx + 0.1, 0.95), { tone, thin: true }),
    ];
  }
  return [
    ground,
    poly([v(cx, 3.6), v(cx + 0.05, 2.6), v(cx - 0.05, 1.6), v(cx + 0.1, 0.9)], { open: true, smooth: true, tone: "c", bold: true }),
    seg(v(cx, 2.6), v(cx - 0.6, 2.3), { tone: "c", thin: true }),
    seg(v(cx, 2.0), v(cx + 0.6, 1.75), { tone: "c", thin: true }),
    ...[[-1.0, 2.9], [0.95, 2.5], [-0.9, 1.4], [0.9, 1.15], [-0.6, 0.95]].map(([dx, y]) => seg(v(cx + 0.02, (y + 2.2) / 2), v(cx + dx, y), { tone, thin: !on, bold: on, dash: true })),
  ];
};
const up = (p: V, dy: number): V => v(p[0], p[1] + dy);
const shift = (el: El, dy: number): El => {
  if (el.k === "seg" || el.k === "vec") return { ...el, a: up(el.a, dy), b: up(el.b, dy) };
  if (el.k === "poly") return { ...el, ps: el.ps.map((p) => up(p, dy)) };
  if (el.k === "circle") return { ...el, c: up(el.c, dy) };
  if (el.k === "text") return { ...el, p: up(el.p, dy) };
  return el;
};
const FUNGUS_STEPS = [...fungusRows211.map(({ name }) => name), "Ortak sütunlar"];
const fungusFigure: FigureDef = {
  caption: "Dört tablo satırının şeması: tomurcuklanan maya hücreleri, ekmek üzerinde hif ve spor keseleri, toprak altı miselyumlu şapkalı mantar, kök çevresinde hif ağı. Adımla bir satırı seç, son adımda dört örneğin ortak sütunlarını gör.",
  alt: "İki satır, iki sütunda dört küçük çizim. Birinci: büyük bir yuvarlak hücre ve yanında küçük tomurcuk. İkinci: ekmek dilimi üzerinde yatay hif, iki dik sap ve uçlarında spor keseleri. Üçüncü: zemin çizgisi üstünde sap ve şapka, altında dallanan miselyum çizgileri. Dördüncü: dik bir kök ve çevresine uzanan kesik hif çizgileri.",
  steps: FUNGUS_STEPS,
  draw: (_v, step) => {
    const els: El[] = [];
    // 2 × 2 düzen: telefonda adlar yan yana sıkışmaz.
    const at = (i: number) => ({ x: i % 2 === 0 ? 2.0 : 6.6, dy: i < 2 ? 4.4 : 0 });
    fungusRows211.forEach((row, i) => {
      const on = step === i || step === fungusRows211.length;
      const { x, dy } = at(i);
      els.push(...fungusIcon(i, x, on).map((el) => shift(el, dy)));
      els.push(txt(v(x, 4.25 + dy), row.name, "c", { small: true, bold: on, tone: on ? "a" : "ink" }));
    });
    els.push(...pad(v(0.4, 9.1), v(8.2, 0.6)));
    if (step === fungusRows211.length) {
      const wall = [...new Set(fungusRows211.map(({ wall }) => wall))].join("");
      const food = [...new Set(fungusRows211.map(({ nutrition }) => nutrition))].join("");
      const mycelium = fungusRows211.filter(({ mycelium }) => mycelium);
      return { els, readout: [`Dördünde ortak: duvarda ${wall}, ${food}.`, `Miselyum yalnız ${mycelium.length} satırda: ${names(mycelium)}.`] };
    }
    const row = fungusRows211[step];
    return {
      els,
      readout: [
        `${row.name}: ${row.body}; ${row.hypha}; üreme ${row.reproduction}.`,
        `${fungusColumns211[4]}: ${row.role}.`,
      ],
    };
  },
};

/* ---------- Bitkiler: üç soruluk anahtar ---------- */

const plantFigure: FigureDef = {
  caption: `Tablonun ${plantKeySteps211.length} sütunu sırayla soru olur. Her “hayır” cevabı tek bir grubu ayırır; son “evet” kalan grubu verir. Adımlar anahtarı yukarıdan aşağı açar.`,
  alt: `Solda alt alta üç soru kutusu: ${plantKeySteps211.map(({ question }) => question).join(" ")} Her sorudan sağa giden “hayır” oku bir grup kutusuna, aşağı giden “evet” oku sonraki soruya iner. Gruplar: ${plantRows211.map(({ example, group }) => `${example} (${group.toLocaleLowerCase("tr-TR")})`).join(", ")}.`,
  steps: plantKeySteps211.map(({ question }) => question),
  draw: (_v, step) => {
    const els: El[] = [];
    const yOf = (i: number) => 7.2 - i * 2.3;
    const leaf = (c: V, row: (typeof plantRows211)[number], shown: boolean) => [
      rect(c[0] - 1.8, c[1] - 0.45, c[0] + 1.8, c[1] + 0.45, shown ? { tone: "a", fill: "a", thin: true } : { tone: "muted", thin: true, dash: true }),
      txt(v(c[0], c[1]), row.example, "c", { small: true, bold: true, tone: shown ? "ink" : "muted" }),
      txt(v(c[0], c[1] - 0.5), row.group.toLocaleLowerCase("tr-TR"), "s", { small: true, tone: shown ? "ink" : "muted" }),
    ];
    plantKeySteps211.forEach(({ question, no, yes }, i) => {
      const y = yOf(i);
      const shown = i <= step;
      const tone: Tone = shown ? "ink" : "muted";
      els.push(rect(0.3, y - 0.55, 5.1, y + 0.55, shown ? { tone: i === step ? "a" : "ink", bold: i === step, thin: i !== step } : { tone: "muted", thin: true, dash: true }));
      els.push(txt(v(2.7, y), question, "c", { small: true, bold: shown, tone }));
      els.push(vec(v(5.2, y), v(6.6, y), { tone, thin: !shown, dash: !shown }), txt(v(5.9, y + 0.08), "hayır", "n", { small: true, tone }));
      els.push(...leaf(v(8.5, y), no[0], shown));
      els.push(vec(v(2.7, y - 0.6), v(2.7, y - 1.5), { tone, thin: !shown, dash: !shown }), txt(v(2.85, y - 1.05), "evet", "e", { small: true, tone }));
      if (i === plantKeySteps211.length - 1) els.push(...leaf(v(2.7, yOf(i + 1) + 0.4), yes[0], shown));
    });
    els.push(...pad(v(0.1, 7.9), v(11.3, -0.9)));
    const cur = plantKeySteps211[step];
    return {
      els,
      readout: [
        `${cur.question} Hayır: ${cur.no.map(({ example }) => example).join(", ")}. Evet: ${cur.yes.map(({ example }) => example).join(", ")}.`,
        step === plantKeySteps211.length - 1 ? `${plantRows211.length} grup ${plantKeySteps211.length} soruyla ayrıldı.` : `Kalan aday: ${cur.yes.length}.`,
      ],
    };
  },
};

export const depthFigures211: Record<string, Record<string, FigureDef>> = {
  "canlilarin-siniflandirilmasi": { [kingdomSection211.title]: kingdomFigure },
  "bakteri-ve-arke": { [prokaryoteSection211.title]: prokaryoteFigure },
  protista: { [protistSection211.title]: protistFigure },
  mantarlar: { [fungusSection211.title]: fungusFigure },
  bitkiler: { [plantSection211.title]: plantFigure },
};
