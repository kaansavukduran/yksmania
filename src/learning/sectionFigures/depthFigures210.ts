import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { rect } from "./mathFigures060TytKit";
import { pad } from "./physicsFigures058Kit";
import {
  atomModelRows210, atomModelSection210, balmer32_210, bohrConstants210, bohrLevels210, disciplineRows210, disciplineSection210,
  num210, periodicRows210, periodicSection210, pictogramRows210, pictogramSection210, signalText210,
} from "../depth210";

/*
 * 0.210.0 TYT Kimya tablo bölümlerinin çizimleri. Kutulardaki adlar,
 * kodlar, enerji değerleri ve okumalar tabloyu üreten aynı verilerden
 * gelir. Çizimler şematiktir; boyutlar ölçekli değildir, piktogramlar
 * resmî simgenin kopyası değildir. Adım değiştirmek öğrenme kaydı üretmez.
 */

const lowerFirst = (s: string) => s.charAt(0).toLocaleLowerCase("tr-TR") + s.slice(1);

/* ---------- Kimya disiplinleri: yedi kutu, seçilen satır ---------- */

const BOX_W = 5.6;
const BOX_H = 1.5;
const disciplineFigure: FigureDef = {
  caption: `${disciplineRows210.length} kutu tablodaki ${disciplineRows210.length} disiplindir; her kutunun alt satırı o disiplinin sorduğu soruyu kısaca söyler. Adımı değiştir: seçilen disiplinin incelediği iş, örneği ve ilgili meslek aşağıda okunur.`,
  alt: `İki sütunda ${disciplineRows210.length} kutu: ${disciplineRows210.map(({ name, verb }) => `${name} (${verb})`).join(", ")}. Seçilen kutu kalın çizgiyle vurgulanır.`,
  steps: disciplineRows210.map(({ name }) => name),
  draw: (_value, step) => {
    const els: El[] = [];
    disciplineRows210.forEach(({ name, verb }, i) => {
      const last = i === disciplineRows210.length - 1 && disciplineRows210.length % 2 === 1;
      const x = last ? (BOX_W + 0.6) / 2 : (i % 2) * (BOX_W + 0.6);
      const y = -Math.floor(i / 2) * (BOX_H + 0.5);
      const on = i === step;
      els.push(
        poly([v(x, y), v(x + BOX_W, y), v(x + BOX_W, y + BOX_H), v(x, y + BOX_H)], on ? { tone: "a", fill: "a", bold: true } : { tone: "muted", thin: true }),
        txt(v(x + BOX_W / 2, y + BOX_H * 0.68), name, "c", { small: true, bold: true, tone: "ink" }),
        txt(v(x + BOX_W / 2, y + BOX_H * 0.28), verb, "c", { small: true, tone: on ? "ink" : "muted" }),
      );
    });
    const row = disciplineRows210[step];
    return {
      els: [...els, ...pad(-0.3, BOX_H + 0.3, 2 * BOX_W + 0.9, -Math.floor((disciplineRows210.length - 1) / 2) * (BOX_H + 0.5) - 0.3)],
      readout: [
        `${row.name}: ${lowerFirst(row.studies)}`,
        `Örnek: ${lowerFirst(row.example)}`,
        `İlgili meslek: ${row.professions.join(", ")}.`,
      ],
    };
  },
};

/* ---------- GHS piktogramları: dokuz kod, aileye göre renk ---------- */

const familyTone: Record<string, Tone> = { fiziksel: "a", sağlık: "b", çevre: "c" };
const DIAMOND = 1.3;
const COL = 4.1;
const ROW = 3.5;
const diamond = (c: V, s: number, style: { tone: Tone; fill?: Tone; bold?: boolean; thin?: boolean }): El =>
  poly([v(c[0], c[1] + s), v(c[0] + s, c[1]), v(c[0], c[1] - s), v(c[0] - s, c[1])], style);
const signalShort = (row: (typeof pictogramRows210)[number]) => [...row.signals, ...(row.noSignalPossible ? ["yok"] : [])].join(" / ");
const pictogramFigure: FigureDef = {
  caption: `${pictogramRows210.length} piktogram kod sırasıyla dizildi; çerçeve rengi tehlike ailesini, altındaki yazı olası sinyal sözcüklerini gösterir. İki aileye hizmet eden kodlarda iç içe iki çerçeve vardır. Çizim şematiktir, resmî simgenin kopyası değildir.`,
  alt: `Üç satır, üç sütun eşkenar dörtgen; içlerinde ${pictogramRows210.map(({ code }) => code).join(", ")} kodları. Her birinin altında sinyal sözcüğü: ${pictogramRows210.map((row) => `${row.code} ${signalShort(row)}`).join(", ")}. Seçilen kod dolgulu ve kalın çizilir.`,
  steps: pictogramRows210.map(({ code }) => code),
  maxHeight: 600,
  draw: (_value, step) => {
    const els: El[] = [];
    pictogramRows210.forEach((row, i) => {
      const c = v((i % 3) * COL, -Math.floor(i / 3) * ROW);
      const on = i === step;
      const [first, second] = row.families;
      els.push(diamond(c, DIAMOND, on ? { tone: familyTone[first], fill: familyTone[first], bold: true } : { tone: familyTone[first] }));
      if (second) els.push(diamond(c, DIAMOND * 0.8, { tone: familyTone[second], thin: true }));
      els.push(
        txt(c, row.code, "c", { small: true, bold: true, tone: "ink" }),
        txt(v(c[0], c[1] - DIAMOND - 0.12), signalShort(row), "s", { small: true, tone: on ? "ink" : "muted" }),
      );
    });
    const row = pictogramRows210[step];
    return {
      els: [...els, ...pad(-DIAMOND - 0.9, DIAMOND + 0.3, 2 * COL + DIAMOND + 0.9, -2 * ROW - DIAMOND - 0.9)],
      legend: Object.entries(familyTone).map(([family, tone]) => ({ code: family.charAt(0).toLocaleUpperCase("tr-TR"), label: `${family} tehlike`, tone })),
      readout: [
        `${row.code} · ${row.name}: ${lowerFirst(row.classes)}.`,
        `Sinyal sözcüğü: ${signalText210(row)}. Örnek ${row.h.code}: ${lowerFirst(row.h.meaning)}`,
      ],
    };
  },
};

/* ---------- Atom modelleri: dört çizim ve zaman çizgisi ---------- */

const MR = 2.2;
const yE = (ev: number) => 0.4 + 6 * (1 + ev / bohrConstants210.teachingEv);
const thomsonElectrons: V[] = [[-1.1, 0.9], [0.5, 1.3], [1.3, 0.1], [-0.2, -0.3], [-1.3, -0.8], [0.7, -1.2], [-0.5, 0.5]].map(([x, y]) => v(x, y));
const levelsShown = bohrLevels210.slice(0, 3);
const atomFigure: FigureDef = {
  caption: `Adımla modeli değiştir: ${atomModelRows210.map(({ name, year }) => `${name} (${year})`).join(", ")}. Alttaki zaman çizgisi sırayı gösterir. Bohr adımındaki enerji düzeyleri Eₙ = −${num210(bohrConstants210.teachingEv, 1)}/n² eV ile ölçeklidir; atom çizimleri ölçekli değildir.`,
  alt: "Solda seçilen modelin şeması: Dalton’da dolu küre; Thomson’da pozitif küre içinde dağılmış elektronlar; Rutherford’da küçük çekirdek, büyük kısmı boş atom ve çoğu düz geçen, biri geri dönen alfa izleri; Bohr’da çekirdek çevresinde üç düzey ve sağda hidrojenin n = 1, 2, 3 enerji düzeyleri ile 3 → 2 geçiş oku. Altta dört modelin adı ve yılı.",
  steps: atomModelRows210.map(({ name }) => name),
  draw: (_value, step) => {
    const els: El[] = [];
    const M = step === 3 ? v(2.4, 3.2) : v(5.95, 3.2);
    if (step === 0) {
      els.push(circle(M, MR, { tone: "a", fill: "a", bold: true }));
    } else if (step === 1) {
      els.push(circle(M, MR, { tone: "a", fill: "a" }), ...thomsonElectrons.map((p) => circle(v(M[0] + p[0], M[1] + p[1]), 0.15, { tone: "b", fill: "b" })));
    } else if (step === 2) {
      els.push(
        circle(M, MR, { tone: "muted", dash: true, thin: true }),
        circle(M, 0.16, { tone: "a", fill: "a" }),
        ...[1.6, 0.8, -0.8, -1.6].map((dy) => vec(v(M[0] - MR - 0.6, M[1] + dy), v(M[0] + MR + 0.6, M[1] + dy), { tone: "c", thin: true })),
        poly([v(M[0] - MR - 0.6, M[1] + 0.15), v(M[0] - 0.4, M[1] + 0.15), v(M[0] - 0.28, M[1] + 0.05)], { open: true, tone: "warn" }),
        vec(v(M[0] - 0.28, M[1] + 0.05), v(M[0] - MR - 0.4, M[1] - 0.4), { tone: "warn" }),
      );
    } else {
      els.push(
        circle(M, 0.16, { tone: "a", fill: "a" }),
        ...levelsShown.map(({ n }) => circle(M, (MR * n) / levelsShown.length, { tone: n === 2 || n === 3 ? "b" : "muted", thin: true })),
        ...levelsShown.flatMap(({ n, ev }) => [
          seg(v(5.2, yE(ev)), v(7.6, yE(ev)), { tone: "b" }),
          txt(v(7.8, yE(ev)), `n = ${n} · ${num210(ev)} eV`, "e", { small: true }),
        ]),
        vec(v(6.4, yE(bohrLevels210[2].ev)), v(6.4, yE(bohrLevels210[1].ev)), { tone: "warn", bold: true }),
        txt(v(6.4, yE(bohrLevels210[2].ev) + 0.1), `${num210(balmer32_210.nm, 0)} nm`, "n", { small: true, tone: "warn" }),
      );
    }
    const xs = atomModelRows210.map((_, i) => 1 + i * 3.3);
    els.push(seg(v(xs[0], -1.3), v(xs.at(-1)!, -1.3), { tone: "muted", thin: true }));
    atomModelRows210.forEach(({ name, year }, i) => {
      const on = i === step;
      els.push(
        circle(v(xs[i], -1.3), 0.12, { tone: on ? "a" : "muted", fill: on ? "a" : "muted" }),
        txt(v(xs[i], -1.05), name, "n", { small: true, bold: on, tone: on ? "a" : "ink" }),
        txt(v(xs[i], -1.55), String(year), "s", { small: true, tone: "muted" }),
      );
    });
    const row = atomModelRows210[step];
    const readout = [
      `${row.name} (${row.year}). Kanıt: ${lowerFirst(row.evidence)}.`,
      `Varsayım: ${lowerFirst(row.idea)}`,
      `Açıkladığı: ${lowerFirst(row.explains)}. Açıklayamadığı: ${lowerFirst(row.fails)}.`,
    ];
    if (step === 3) readout.push(`3 → 2: ΔE = ${num210(balmer32_210.deltaEv)} eV, λ ≈ ${num210(balmer32_210.nm, 0)} nm.`);
    return { els: [...els, ...pad(-0.6, 7.0, 12.2, -2.4)], readout };
  },
};

/* ---------- Periyodik sistem: ilk 20 element ızgarası ---------- */

const GROUPS = [1, 2, 13, 14, 15, 16, 17, 18];
const CELL = 1;
const GAP = 0.08;
const blockTone = (block: string): Tone => (block === "s" ? "a" : "b");
const cellAt = (period: number, group: number): V => v(GROUPS.indexOf(group) * (CELL + GAP), -period * (CELL + GAP));
const periodicFigure: FigureDef = {
  caption: `İlk ${periodicRows210.length} element grup ve periyot adresine yerleştirildi; renk bloku gösterir. Z’yi değiştir: seçilen elementin dizilimi, periyodu, grubu ve bloku aynı tablodan okunur. ${periodicRows210[1].symbol} s blokunda olduğu hâlde 18. sütundadır.`,
  alt: `Dört satır, sekiz sütunluk ızgara. Sütun başlıkları ${GROUPS.join(", ")}; satır başlıkları 1–4. Hücrelerde ${periodicRows210.map(({ symbol }) => symbol).join(", ")} sembolleri. s bloku ve p bloku farklı renkte, seçilen element kalın çerçeveli.`,
  param: { label: "Atom numarası Z", min: 1, max: periodicRows210.length, step: 1, init: 13 },
  draw: (z) => {
    const els: El[] = [];
    GROUPS.forEach((g, i) => els.push(txt(v(i * (CELL + GAP) + CELL / 2, -CELL * 0 + 0.25), String(g), "n", { small: true, tone: "muted" })));
    for (let p = 1; p <= 4; p++) els.push(txt(v(-0.3, -p * (CELL + GAP) + CELL / 2), String(p), "w", { small: true, tone: "muted" }));
    for (const row of periodicRows210) {
      const [x, y] = cellAt(row.period, row.group);
      const on = row.z === z;
      els.push(
        rect(x, y, CELL, CELL, blockTone(row.block), true),
        txt(v(x + CELL / 2, y + CELL / 2), row.symbol, "c", { small: true, bold: true, tone: on ? "warn" : "ink" }),
      );
      if (on) {
        const o = 0.07;
        els.push(poly([v(x - o, y - o), v(x + CELL + o, y - o), v(x + CELL + o, y + CELL + o), v(x - o, y + CELL + o)], { tone: "warn", bold: true }));
      }
    }
    const row = periodicRows210[z - 1];
    const last = row.subs.at(-1)!;
    return {
      els: [...els, ...pad(-1.0, 1.0, GROUPS.length * (CELL + GAP) + 0.2, -4 * (CELL + GAP) - 0.3)],
      legend: [{ code: "s", label: "s bloku", tone: "a" }, { code: "p", label: "p bloku", tone: "b" }],
      readout: [
        `${row.symbol} · ${row.name} (Z = ${row.z}): ${row.orbital}; katman ${row.shellText}.`,
        `En büyük n = ${row.period} → ${row.period}. periyot. Son elektron ${last.n}${last.l} → ${row.block} bloku.`,
        `${row.rule} (${row.oldGroup}).`,
      ],
    };
  },
};

export const depthFigures210: Record<string, Record<string, FigureDef>> = {
  "kimya-disiplinleri": { [disciplineSection210.title]: disciplineFigure },
  "kimya-guvenlik": { [pictogramSection210.title]: pictogramFigure },
  "atom-modelleri": { [atomModelSection210.title]: atomFigure },
  "periyodik-sistem": { [periodicSection210.title]: periodicFigure },
};
