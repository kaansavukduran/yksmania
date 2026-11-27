import { circle, poly, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";
import { pad } from "./physicsFigures058Kit";
import {
  BRANCHES228, HISTORY_DATES228, LINES228, ORGS228, branchOf228, centuryRows228, centurySection228, chronologySection228,
  eventGaps228, events228, forceSection228, forces228, halfText228, officialSection228, officials228, people228, quarterText228,
  rangeText228, statusOf228, statusSection228, yearText228, type Branch228,
} from "../depth228";

/*
 * 0.228 TYT Tarih tablo bölümlerinin çizimleri. Kutulardaki adlar, yıllar,
 * çeyrek aralıkları ve okumalar tabloyu üreten aynı depth228 verilerinden
 * gelir. Zaman şeridi yıllarla orantılıdır; öteki çizimler şematiktir.
 * Adım değiştirmek öğrenme kaydı üretmez.
 */

const check228 = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depthFigures228: ${claim}`);
};
const box = (x: number, y: number, w: number, h: number, on: boolean): El =>
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], on ? { tone: "a", fill: "a", bold: true } : { tone: "muted", thin: true });

/* ---------- Yüzyıl şeridi: dört çeyrek, kronolojik yön ---------- */

const QW = 3.0;
const QH = 1.0;
const centuryFigure: FigureDef = {
  caption: "Şerit bir yüzyılı soldan sağa zaman sırasıyla gösterir; dört kutu 25’er yıllık çeyreklerdir. MÖ yıllarında kutuların altındaki aralıklar büyük sayıdan küçüğe akar. Dikey ok seçilen yılın yüzyıl içindeki sırasını işaretler.",
  alt: `Sekiz adım. ${centuryRows228.map((c) => `${yearText228(c.year)}: ${c.century}. yüzyıl, ${c.position}. yıl, ${halfText228(c.half)}, ${quarterText228(c)}`).join("; ")}.`,
  steps: centuryRows228.map((c) => yearText228(c.year)),
  draw: (_value, step) => {
    const c = centuryRows228[step];
    const dir = c.year.era === "MS" ? 1 : -1;
    const els: El[] = [];
    for (let q = 1; q <= 4; q++) {
      const x = (q - 1) * QW;
      const qFirst = c.first + dir * 25 * (q - 1);
      els.push(
        box(x, 0, QW, QH, q === c.quarter),
        txt(v(x + QW / 2, QH / 2), `${q}. çeyrek`, "c", { small: true, bold: q === c.quarter, tone: q === c.quarter ? "ink" : "muted" }),
        txt(v(x + QW / 2, q % 2 === 1 ? -0.4 : -1.2), rangeText228(qFirst, qFirst + dir * 24), "c", { small: true, tone: q === c.quarter ? "ink" : "muted" }),
      );
    }
    for (const h of [1, 2] as const) {
      const x0 = (h - 1) * 2 * QW + 0.1;
      const x1 = h * 2 * QW - 0.1;
      els.push(
        seg(v(x0, QH + 0.3), v(x1, QH + 0.3), { tone: h === c.half ? "ink" : "muted", bold: h === c.half }),
        txt(v((x0 + x1) / 2, QH + 0.65), halfText228(h), "c", { small: true, bold: h === c.half, tone: h === c.half ? "ink" : "muted" }),
      );
    }
    const mx = ((c.position - 0.5) / 100) * 4 * QW;
    els.push(
      vec(v(mx, QH + 1.75), v(mx, QH + 0.05), { tone: "b", bold: true }),
      txt(v(mx, QH + 2.05), `${yearText228(c.year)} · ${c.position}. yıl`, "c", { bold: true, tone: "b" }),
      vec(v(0, -1.75), v(4 * QW, -1.75), { tone: "muted", thin: true }),
      txt(v(2 * QW, -2.1), `zaman akışı (${c.year.era})`, "c", { small: true, tone: "muted" }),
    );
    return {
      els: [...els, ...pad(-0.9, QH + 2.4, 4 * QW + 0.9, -2.35)],
      readout: [
        `${yearText228(c.year)} → ${c.century}. yüzyıl (${c.year.era} ${rangeText228(c.first, c.last)}).`,
        `Sıra: ${c.year.era === "MS" ? `${c.year.n} − ${100 * (c.century - 1)}` : `${100 * c.century} − ${c.year.n} + 1`} = ${c.position}.`,
        `${halfText228(c.half)}, ${quarterText228(c)}.`,
      ],
    };
  },
};

/* ---------- Kuruluş kronolojisi: yıllarla orantılı zaman şeridi ---------- */

const Y0 = 1300;
const Y1 = 1420;
const XS = 0.06;
const LANE = 1.6;
const yx = (year: number) => (year - Y0) * XS;
const laneY = (i: number) => -i * LANE;
const AXIS_Y = laneY(LINES228.length - 1) - 2.0;
check228(events228.every((e) => HISTORY_DATES228[e.key] > Y0 && HISTORY_DATES228[e.key] < Y1), "bütün olaylar şeridin içinde kalmalı");
const chronologyFigure: FigureDef = {
  caption: "Yatay eksen yıllarla orantılıdır; her satır bir siyaset hattıdır. Seçilen gelişme yılı yazılı dolu noktayla, bir önceki gelişmeden geçen süre eksenin üstündeki çizgiyle gösterilir.",
  alt: `Sekiz adımlı zaman şeridi, ${Y0}–${Y1}. ${events228.map((e) => `${HISTORY_DATES228[e.key]} ${e.event} (${e.line})`).join("; ")}.`,
  steps: events228.map((e) => `${HISTORY_DATES228[e.key]} ${e.event}`),
  draw: (_value, step) => {
    const e = events228[step];
    const year = HISTORY_DATES228[e.key];
    const els: El[] = [];
    LINES228.forEach((line, i) => {
      const on = line === e.line;
      els.push(
        seg(v(0, laneY(i)), v(yx(Y1), laneY(i)), { tone: on ? "ink" : "muted", thin: !on, dash: !on }),
        txt(v(0, laneY(i) + 0.4), line, "e", { small: true, bold: on, tone: on ? "ink" : "muted" }),
      );
    });
    events228.forEach((x, i) => {
      if (i === step) return;
      els.push(circle(v(yx(HISTORY_DATES228[x.key]), laneY(LINES228.indexOf(x.line))), 0.09, { tone: "muted", fill: "muted" }));
    });
    const p = v(yx(year), laneY(LINES228.indexOf(e.line)));
    els.push(
      circle(p, 0.17, { tone: "a", fill: "a", bold: true }),
      txt(v(p[0], p[1] - 0.42), String(year), "c", { small: true, bold: true, tone: "ink" }),
      seg(v(0, AXIS_Y), v(yx(Y1), AXIS_Y), { tone: "ink", thin: true }),
    );
    for (let y = Y0; y <= Y1; y += 40) els.push(seg(v(yx(y), AXIS_Y - 0.1), v(yx(y), AXIS_Y + 0.1), { tone: "ink", thin: true }), txt(v(yx(y), AXIS_Y - 0.45), String(y), "c", { small: true, tone: "muted" }));
    const gap = eventGaps228[step];
    if (gap !== null) {
      const prev = HISTORY_DATES228[events228[step - 1].key];
      els.push(
        seg(v(yx(prev), AXIS_Y + 0.35), v(yx(year), AXIS_Y + 0.35), { tone: "b", bold: true }),
        txt(v((yx(prev) + yx(year)) / 2, AXIS_Y + 0.72), `${gap} yıl`, "c", { small: true, bold: true, tone: "b" }),
      );
    }
    return {
      els: [...els, ...pad(-0.4, 0.9, yx(Y1) + 0.4, AXIS_Y - 0.9)],
      readout: [
        `${year} · ${e.event} · ${e.ruler} · ${e.line}.`,
        `Sonuç (ders): ${e.result}.`,
        gap === null ? "Tablonun ilk satırı." : `Önceki gelişme ${events228[step - 1].event} (${HISTORY_DATES228[events228[step - 1].key]}); geçen süre ${gap} yıl.`,
      ],
    };
  },
};

/* ---------- Askerî teşkilat: teşkilat × piyade/atlı ızgarası ---------- */

const CW = 3.5;
const CH = 1.0;
const ARMS = ["piyade", "atlı"] as const;
const forceFigure: FigureDef = {
  caption: "Satırlar dört teşkilat başlığı, sütunlar piyade ve atlıdır. Seçilen kuvvetin kutusu doludur; gelir ve görev aşağıda okunur. Taşra satırının piyade hücresi tabloda boştur.",
  alt: `Dört satır, iki sütun. ${forces228.map((f) => `${f.short}: ${f.org}, ${f.arm}`).join("; ")}.`,
  steps: forces228.map((f) => f.short),
  draw: (_value, step) => {
    const f = forces228[step];
    const els: El[] = ARMS.map((arm, j) => txt(v(j * (CW + 0.2) + CW / 2, CH + 0.4), arm === "atlı" ? "Atlı" : "Piyade", "c", { small: true, bold: true, tone: arm === f.arm ? "ink" : "muted" }));
    ORGS228.forEach((org, i) => {
      const y = -i * (CH + 0.25);
      els.push(txt(v(-0.15, y + CH / 2), org, "w", { small: true, bold: org === f.org, tone: org === f.org ? "ink" : "muted" }));
      ARMS.forEach((arm, j) => {
        const x = j * (CW + 0.2);
        const here = forces228.find((g) => g.org === org && g.arm === arm);
        const on = here === f;
        els.push(box(x, y, CW, CH, on), txt(v(x + CW / 2, y + CH / 2), here ? here.short : "—", "c", { small: true, bold: on, tone: here ? "ink" : "muted" }));
      });
    });
    return {
      els: [...els, ...pad(-3.6, CH + 0.8, 2 * CW + 0.5, -(ORGS228.length - 1) * (CH + 0.25) - 0.3)],
      readout: [
        `${f.name}: ${f.org}, ${f.arm}.`,
        `Gelir veya kaynak — ${f.support}.`,
        `Ayırıcı görev — ${f.duty}.`,
      ],
    };
  },
};
check228(ORGS228.every((org) => ARMS.filter((arm) => forces228.some((g) => g.org === org && g.arm === arm)).length >= 1), "her teşkilat satırında en az bir kuvvet olmalı");

/* ---------- Kollar: askerî sınıf üç sütun, reaya ayrı kutu ---------- */

const KW = 3.7;
const KH = 0.75;
const KG = 0.25;
const cap = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);
const columnsFigure = (
  items: readonly { name: string }[],
  branchOf: (i: number) => Branch228 | null,
  order: readonly Branch228[],
  step: number,
  topTitle: string,
  bottomTitle: string | null,
): { els: El[]; bottom: number } => {
  const els: El[] = [];
  const width = order.length * KW + (order.length - 1) * KG;
  const rows = Math.max(...order.map((b) => items.filter((_, i) => branchOf(i) === b).length));
  const colTop = 1.0;
  els.push(txt(v(width / 2, colTop + 1.0), topTitle, "c", { small: true, bold: true, tone: "ink" }));
  order.forEach((b, j) => {
    const x = j * (KW + KG);
    els.push(txt(v(x + KW / 2, colTop + 0.4), cap(b), "c", { small: true, bold: true, tone: "ink" }));
    items.forEach((it, i) => {
      if (branchOf(i) !== b) return;
      const k = items.slice(0, i).filter((_, h) => branchOf(h) === b).length;
      const y = colTop - (k + 1) * (KH + 0.15);
      els.push(box(x, y, KW, KH, i === step), txt(v(x + KW / 2, y + KH / 2), it.name, "c", { small: true, bold: i === step, tone: "ink" }));
    });
  });
  let bottom = colTop - rows * (KH + 0.15);
  els.push(poly([v(-0.15, colTop + 1.65), v(width + 0.15, colTop + 1.65), v(width + 0.15, bottom - 0.15), v(-0.15, bottom - 0.15)], { tone: "muted", thin: true, dash: true }));
  const rest = items.map((it, i) => ({ it, i })).filter(({ i }) => branchOf(i) === null);
  if (bottomTitle && rest.length) {
    const top = bottom - 0.9;
    els.push(txt(v(width / 2, top), bottomTitle, "c", { small: true, bold: true, tone: "ink" }));
    const y = top - 0.35 - KH;
    const bw = (width - (rest.length - 1) * KG) / rest.length;
    rest.forEach(({ it, i }, r) => {
      const x = r * (bw + KG);
      els.push(box(x, y, bw, KH, i === step), txt(v(x + bw / 2, y + KH / 2), it.name, "c", { small: true, bold: i === step, tone: "ink" }));
    });
    els.push(poly([v(-0.15, top + 0.55), v(width + 0.15, top + 0.55), v(width + 0.15, y - 0.15), v(-0.15, y - 0.15)], { tone: "muted", thin: true, dash: true }));
    bottom = y - 0.15;
  }
  return { els: [...els, ...pad(-0.5, colTop + 1.85, width + 0.5, bottom - 0.3)], bottom };
};

const statusFigure: FigureDef = {
  caption: "Üstteki çerçeve askerî sınıftır: seyfiye, kalemiye ve ilmiye sütunları yönetenlerdir. Alttaki çerçeve reayadır. Seçilen kişinin kutusu doludur; statü ve kol aşağıda okunur.",
  alt: `Sekiz adım. ${people228.map((p) => `${p.name}: ${statusOf228(p)}${branchOf228(p) ? `, ${branchOf228(p)}` : ""}`).join("; ")}.`,
  steps: people228.map((p) => p.name),
  draw: (_value, step) => {
    const p = people228[step];
    const { els } = columnsFigure(people228, (i) => branchOf228(people228[i]), BRANCHES228, step, "Askerî sınıf (yönetenler)", "Reaya (yönetilenler)");
    return {
      els,
      readout: [
        `${p.name} — ${p.work}. Alan: ${p.place}.`,
        `Statü: ${statusOf228(p)}. Kol: ${branchOf228(p) ?? "yok; yönetilen kesim"}.`,
      ],
    };
  },
};

const OFFICIAL_ORDER: readonly Branch228[] = ["seyfiye", "ilmiye", "kalemiye"];
check228(OFFICIAL_ORDER.every((b) => BRANCHES228.includes(b)) && OFFICIAL_ORDER.length === BRANCHES228.length, "çizim üç kolu da göstermeli");
const officialFigure: FigureDef = {
  caption: "Çerçeve Divan-ı Hümayun çevresidir; sütunlar görevlilerin kollarıdır. Seçilen görevlinin kutusu doludur; ayırıcı görev ve anahtar ipucu aşağıda okunur. Çizim değişmez bir üye listesi değildir.",
  alt: `Üç sütun. ${officials228.map((o) => `${o.name}: ${o.branch}`).join("; ")}.`,
  steps: officials228.map((o) => o.name),
  draw: (_value, step) => {
    const o = officials228[step];
    const { els } = columnsFigure(officials228, (i) => officials228[i].branch, OFFICIAL_ORDER, step, "Divan-ı Hümayun çevresi", null);
    return {
      els,
      readout: [
        `${o.name} (${o.branch}) — ${o.duty}.`,
        `Anahtar ipucu — ${o.clue}.`,
      ],
    };
  },
};

export const depthFigures228: Record<string, Record<string, FigureDef>> = {
  "tarih-zaman": { [centurySection228.title]: centuryFigure },
  "osmanli-kurulus-siyaseti": { [chronologySection228.title]: chronologyFigure },
  "osmanli-askeri-teskilat": { [forceSection228.title]: forceFigure },
  "osmanli-medeniyeti": { [statusSection228.title]: statusFigure },
  "sultan-osmanli-merkez-teskilati": { [officialSection228.title]: officialFigure },
};
