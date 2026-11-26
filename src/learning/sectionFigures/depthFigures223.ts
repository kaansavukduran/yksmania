import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { axes, box, pad, xtick, ytick } from "./physicsFigures058Kit";
import {
  BOIL_FACTORS223, CHANGES223, GAS_CASES223, GAS_UNIT223, SOLIDS223, VAPOUR_CASES223, WATER_VP223, boilChangeText223, boilNote223, boilSection223,
  boilShift223, boilingTemp223, calcMmHg223, carrierText223, changeSection223, classText223, equationText223, fixedOf223, gasChangeText223,
  gasLawText223, gasResult223, gasSection223, gram223, idsOf223, isChemical223, mmHg223, newSpecies223, num223, sideTally223, solidSection223,
  tallyText223, vapourOutcome223, vapourSection223, vp223, type GasCase223, type GasVar223, type SolidKind223,
} from "../depth223";

/*
 * 0.223.0 maddenin hâlleri tablo bölümlerinin çizimleri. Her etiket ve okuma
 * depth223 verisinden gelir. Silindir yükseklikleri hacimle, nokta sayısı mol
 * sayısıyla orantılıdır; buhar basıncı noktaları dersin MEBİ değerleridir.
 * Kaynama çiziminde çözünen ve uçucu sıvı eğrileri şematik kaydırmadır,
 * sayı taşımaz. Katı örgüleri ve tür kutuları şematiktir.
 */

/* ---------- 1 · Gaz: önce / sonra silindirleri ---------- */

const valueOf = (c: GasCase223, x: GasVar223, after: boolean): number | null => {
  if (x === c.unknown) return after ? gasResult223(c) : c.start;
  if (x === c.changed) return after ? c.to : c.from;
  return null;
};
const gasFigure: FigureDef = {
  caption: "Adımla bir kap durumu seç. Silindir yüksekliği hacimle, nokta sayısı mol sayısıyla orantılıdır; rijit kapta üst kapak kapalı, pistonlu kapta üstte hareketli piston var. Altta yalnız değişen nicelikler yazılır, ötekiler sabittir.",
  alt: "Yan yana iki silindir: solda önce, sağda sonra; aralarında ok. Silindirlerin içinde gaz tanecikleri noktalarla gösterilmiş. Her silindirin altında P, V, T, n değerleri ya da sabit yazısı.",
  steps: GAS_CASES223.map((c) => c.name),
  draw: (_value, step) => {
    const c = GAS_CASES223[step];
    const vBefore = valueOf(c, "V", false);
    const vAfter = valueOf(c, "V", true);
    const vMax = Math.max(vBefore ?? 1, vAfter ?? 1);
    const nBefore = valueOf(c, "n", false);
    const nAfter = valueOf(c, "n", true);
    const nMax = Math.max(nBefore ?? 1, nAfter ?? 1);
    const els: El[] = [];
    const W = 1.6;
    const cyl = (x0: number, after: boolean) => {
      const vol = valueOf(c, "V", after);
      const h = 3.0 * ((vol ?? vMax) / vMax);
      const n = valueOf(c, "n", after);
      const dots = Math.round((6 * (n ?? nMax)) / nMax);
      if (c.container === "rijit") els.push(poly([v(x0, h), v(x0, 0), v(x0 + W, 0), v(x0 + W, h)], { tone: "ink" }), seg(v(x0, h), v(x0 + W, h), { tone: "ink", bold: true }));
      else els.push(poly([v(x0, 3.2), v(x0, 0), v(x0 + W, 0), v(x0 + W, 3.2)], { tone: "ink", open: true }),seg(v(x0 - 0.05, h), v(x0 + W + 0.05, h), { tone: "a", bold: true }), seg(v(x0 + W / 2, h), v(x0 + W / 2, 3.5), { tone: "a" }));
      for (let i = 0; i < dots; i++) {
        const col = i % 3;
        const row = Math.floor(i / 3);
        els.push(circle(v(x0 + 0.3 + col * 0.5, 0.3 + ((row + 0.5) * (h - 0.35)) / Math.ceil(dots / 3) - 0.15), 0.08, { tone: "c", fill: "c" }));
      }
      const lines = (["P", "V", "T", "n"] as GasVar223[]).map((x) => {
        const val = valueOf(c, x, after);
        return val === null ? `${x} sabit` : `${x} = ${num223(val)} ${GAS_UNIT223[x]}`;
      });
      lines.forEach((s, i) => els.push(txt(v(x0 + W / 2, -0.35 - i * 0.4), s, "c", { small: true, bold: s.indexOf("sabit") < 0, tone: s.indexOf("sabit") < 0 ? "ink" : "muted" })));
      els.push(txt(v(x0 + W / 2, 3.7), after ? "Sonra" : "Önce", "c", { small: true, bold: true }));
    };
    cyl(0, false);
    cyl(3.0, true);
    els.push(vec(v(W + 0.25, 1.6), v(3.0 - 0.25, 1.6), { tone: "warn", bold: true }));
    els.push(...pad(-0.6, 4.0, 5.2, -2.0));
    return {
      els,
      readout: [
        `${c.name}: ${fixedOf223(c).join(" ve ")} sabit; ${gasChangeText223(c)}.`,
        `${c.unknown}: ${num223(c.start)} → ${num223(gasResult223(c))} ${GAS_UNIT223[c.unknown]} (${gasLawText223(c)}).`,
      ],
    };
  },
};

/* ---------- 2 · Buhar: sıvı kalır mı? ---------- */

const vapourFigure: FigureDef = {
  caption: "Adımla bir kap seç. Üst çubuk konulan su, alt çubuk o kapta doyurmaya yeten buhar kütlesidir; ölçek her adımda yeniden seçilir. Konulan su daha uzunsa fazlası sıvı kalır ve basınç P* olur. Kap çizimi şematiktir.",
  alt: "Solda kapalı bir kap: sıvı kalırsa dipte su katmanı, üstte buhar noktaları. Sağda iki yatay çubuk: konulan su ve doyurmaya yeten buhar; uzunlukları kütleyle orantılı.",
  steps: VAPOUR_CASES223.map((c) => `${c.label}: ${num223(c.celsius)} °C, ${num223(c.litres)} L, ${num223(c.grams)} g`),
  draw: (_value, step) => {
    const c = VAPOUR_CASES223[step];
    const o = vapourOutcome223(c);
    const els: El[] = [];
    els.push(poly([v(0, 0), v(1.6, 0), v(1.6, 2.4), v(0, 2.4)], { tone: "ink" }));
    const liquidTop = o.liquidLeft ? 0.45 : 0;
    if (o.liquidLeft) els.push(box(0.05, 0.05, 1.55, liquidTop, "b"));
    for (let i = 0; i < 9; i++) els.push(circle(v(0.3 + (i % 3) * 0.5, liquidTop + 0.4 + Math.floor(i / 3) * 0.55), 0.07, { tone: "c", fill: "c" }));
    els.push(txt(v(0.8, 2.55), `${num223(c.celsius)} °C · ${num223(c.litres)} L`, "n", { small: true, bold: true }));
    const L = 3.6;
    const max = Math.max(c.grams, o.mMax);
    const bar = (y: number, mass: number, tone: Tone, label: string) => {
      els.push(txt(v(2.3, y + 0.5), label, "e", { small: true }));
      els.push(box(2.3, y, 2.3 + (mass / max) * L, y + 0.3, tone));
      els.push(txt(v(2.3 + (mass / max) * L + 0.1, y + 0.15), gram223(mass), "e", { small: true, bold: true }));
    };
    bar(1.5, c.grams, o.liquidLeft ? "b" : "c", "Konulan su");
    bar(0.4, o.mMax, "muted", "Doyurmaya yeten buhar");
    els.push(...pad(-0.4, 3.0, 8.0, -0.3));
    return {
      els,
      readout: [
        `${c.label}: ${num223(c.grams)} g su; ${num223(c.celsius)} °C’de ${num223(c.litres)} L için doyurmaya yeten buhar ≈ ${gram223(o.mMax)}.`,
        o.liquidLeft
          ? `Sıvı kalır (≈ ${gram223(o.liquidGrams)}); basınç P* = ${mmHg223(vp223(c.celsius))}.`
          : `Bütün su buharlaşır; P = nRT/V ≈ ${calcMmHg223(o.pressure)} < P* (${mmHg223(vp223(c.celsius))}).`,
      ],
    };
  },
};

/* ---------- 3 · Kaynama: eğri ve eşik ---------- */

const XT = (t: number) => t * 0.06;
const YP = (p: number) => p * 0.0045;
/** Polilinin y = p doğrusunu kestiği sıcaklık (yalnız çizim konumu için). */
const crossAt = (pts: readonly (readonly [number, number])[], p: number) => {
  for (let i = 1; i < pts.length; i++) {
    const [t0, p0] = pts[i - 1];
    const [t1, p1] = pts[i];
    if ((p0 - p) * (p1 - p) <= 0) return t0 + ((p - p0) / (p1 - p0)) * (t1 - t0);
  }
  return null;
};
const SCHEMATIC_PRESSURE = 233.7;
const boilFigure: FigureDef = {
  caption: "Adımla bir değişiklik seç. Noktalar suyun MEBİ tablo değerleridir; kesik çizgi okuma kılavuzudur. Turuncu yatay çizgi erişilecek dış basınçtır, eğriyi kestiği sıcaklık kaynama sıcaklığıdır. Çözünen ve uçucu sıvı adımlarındaki ikinci eğri şematik bir kaydırmadır; sayı taşımaz.",
  alt: "Yatay eksen sıcaklık (°C), dikey eksen buhar basıncı (mmHg). Su için dört nokta ve kesik kılavuz çizgisi; seçilen dış basınçta yatay çizgi ve eğriyi kestiği yerden eksene inen düşey çizgi. Bazı adımlarda soluk eski eşik ya da kaydırılmış ikinci eğri.",
  steps: BOIL_FACTORS223.map((f) => f.short),
  draw: (_value, step) => {
    const f = BOIL_FACTORS223[step];
    const els: El[] = [...axes(v(0, 0), XT(112), YP(860), "T (°C)", "P* (mmHg)")];
    for (const t of [0, 25, 50, 75, 100]) els.push(...xtick(XT(t), 0, String(t)));
    for (const p of [200, 400, 600, 760]) els.push(...ytick(0, YP(p), String(p)));
    const base = WATER_VP223.map(([t, p]) => v(XT(t), YP(p)));
    els.push(poly(base, { tone: "muted", open: true, dash: true, thin: true }));
    WATER_VP223.forEach(([t, p]) => els.push(circle(v(XT(t), YP(p)), 0.08, { tone: "muted", fill: "muted" })));
    const threshold = (p: number, tone: Tone, label: boolean) => {
      const t = crossAt(WATER_VP223, p)!;
      els.push(seg(v(0, YP(p)), v(XT(t), YP(p)), { tone, bold: tone === "warn", thin: tone !== "warn", dash: tone !== "warn" }));
      els.push(seg(v(XT(t), YP(p)), v(XT(t), 0), { tone, dash: true, thin: true }));
      if (label) els.push(ball(v(XT(t), YP(p)), 0.1, tone), txt(v(XT(t) - 0.12, YP(p) + 0.08), `${num223(t)} °C`, "nw", { tone, small: true, bold: true }));
    };
    const readout: string[] = [boilChangeText223(f) + "."];
    if (f.pressures) {
      threshold(f.pressures[0], "muted", true);
      threshold(f.pressures[1], "warn", true);
      readout.push(`P*(Tk) = Pdış ⇒ ${boilNote223(f)}.`);
    } else if (f.power) {
      threshold(760, "warn", true);
      readout.push(`Eğri ve eşik aynı: Tk = ${num223(boilingTemp223(760))} °C. ${boilNote223(f)}.`);
    } else {
      const k = f.curve < 0 ? 0.75 : 1.35;
      const shifted = WATER_VP223.map(([t, p]) => [t, p * k] as const);
      const visible = shifted.filter(([, p]) => p <= 860);
      els.push(poly(visible.map(([t, p]) => v(XT(t), YP(p))), { tone: "c", open: true, bold: true }));
      threshold(SCHEMATIC_PRESSURE, "warn", true);
      const t2 = crossAt(shifted, SCHEMATIC_PRESSURE)!;
      els.push(ball(v(XT(t2), YP(SCHEMATIC_PRESSURE)), 0.1, "c"), seg(v(XT(t2), YP(SCHEMATIC_PRESSURE)), v(XT(t2), 0), { tone: "c", dash: true, thin: true }));
      els.push(seg(v(XT(6), YP(470)), v(XT(16), YP(470)), { tone: "c", bold: true }), txt(v(XT(18), YP(470)), "şematik eğri", "e", { tone: "c", small: true }));
      const dir = boilShift223(f.curve, f.threshold);
      readout.push(`Eşik ${mmHg223(SCHEMATIC_PRESSURE)} örneğinde saf su ${num223(boilingTemp223(SCHEMATIC_PRESSURE))} °C’de kaynar; ${f.curve < 0 ? "düşen" : "yükselen"} eğri eşiği daha ${dir > 0 ? "yüksek" : "düşük"} sıcaklıkta keser: Tk ${dir > 0 ? "yükselir" : "düşer"}.`);
    }
    els.push(...pad(-1.4, YP(900), XT(112) + 1.4, -0.8));
    return { els, readout };
  },
};

/* ---------- 4 · Katı türleri: şematik örgüler ---------- */

const lattice = (kind: SolidKind223): El[] => {
  const els: El[] = [];
  const at = (i: number, j: number): V => v(i * 0.9, j * 0.9);
  if (kind === "iyonik") {
    for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) {
      const plus = (i + j) % 2 === 0;
      els.push(ball(at(i, j), plus ? 0.22 : 0.3, plus ? "a" : "c", plus ? "+" : "−"));
    }
  } else if (kind === "moleküler") {
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      const o = v(i * 1.5, j * 1.2);
      els.push(seg(o, v(o[0] + 0.45, o[1]), { tone: "ink", bold: true }), ball(o, 0.2, "c"), ball(v(o[0] + 0.45, o[1]), 0.2, "c"));
    }
  } else if (kind === "kovalent ağ") {
    for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) {
      if (i < 4) els.push(seg(at(i, j), at(i + 1, j), { tone: "ink" }));
      if (j < 3) els.push(seg(at(i, j), at(i, j + 1), { tone: "ink" }));
    }
    for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) els.push(ball(at(i, j), 0.18, "b"));
  } else if (kind === "kovalent ağ (tabakalı)") {
    for (let j = 0; j < 3; j++) {
      const y = j * 1.3;
      els.push(seg(v(0, y), v(3.6, y), { tone: "ink" }));
      for (let i = 0; i < 5; i++) els.push(ball(v(i * 0.9, y), 0.18, "b"));
      els.push(vec(v(0.4, y + 0.35), v(2.9, y + 0.35), { tone: "warn", bold: true }), txt(v(3.0, y + 0.35), "e⁻", "e", { tone: "warn", small: true, bold: true }));
    }
  } else {
    for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) els.push(ball(at(i, j), 0.26, "a", "+"));
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) els.push(circle(v(i * 0.9 + 0.45, j * 0.9 + 0.45), 0.07, { tone: "warn", fill: "warn" }));
  }
  return els;
};
const solidFigure: FigureDef = {
  caption: "Adımla bir katı türü seç. Çizim şematiktir: iyonik örgüde + ve − iyonlar, moleküler katıda ayrı iki atomlu moleküller, kovalent ağda bağlarla birleşen atomlar, grafitte tabakalar ve tabaka boyunca elektron oku, metalde + merkezler arasında turuncu elektronlar. Okuma, katıda ve eriyikte hareketli yük taşıyıcısını verir.",
  alt: "Seçilen katı türüne göre değişen şematik bir tanecik düzeni: dama tahtası gibi + ve − toplar, aralıklı ikili moleküller, ızgara biçiminde bağlı atomlar, üç yatay tabaka ya da + toplar arasında küçük elektron noktaları.",
  steps: SOLIDS223.map((s) => s.name),
  draw: (_value, step) => {
    const s = SOLIDS223[step];
    const els = lattice(s.kind);
    els.push(...pad(-0.6, 3.4, 4.3, -0.6));
    return {
      els,
      readout: [
        `${s.name} (${s.example}): yapıtaşı ${s.unit.charAt(0).toLocaleLowerCase("tr-TR") + s.unit.slice(1)}; ${s.holding.charAt(0).toLocaleLowerCase("tr-TR") + s.holding.slice(1)}.`,
        `Hareketli yük taşıyıcı · katı: ${carrierText223(s.solidCarriers)}; eriyik: ${carrierText223(s.meltCarriers)}.`,
      ],
    };
  },
};

/* ---------- 5 · Fiziksel / kimyasal: tür kutuları ---------- */

const changeFigure: FigureDef = {
  caption: "Adımla bir olay seç. Sol kutu önceki, sağ kutu sonraki türlerdir (iyonik katı örgüdeki iyonlarıyla yazılır). Turuncu tür solda yoktu: yeni türdür ve olay kimyasaldır. Hiç turuncu yoksa olay fizikseldir. Atom ve yük sayımı okumadadır.",
  alt: "İki dikdörtgen kutu ve aralarında ok. Sol kutuda başlangıç türleri, sağ kutuda ürün türleri alt alta yazılı; solda bulunmayan türler turuncu. Altta denklem.",
  steps: CHANGES223.map((c) => c.name),
  draw: (_value, step) => {
    const c = CHANGES223[step];
    const before = [...new Set(c.left.flatMap(idsOf223))];
    const after = [...new Set(c.right.flatMap(idsOf223))];
    const els: El[] = [];
    const boxAt = (x0: number, items: string[], title: string, mark: (s: string) => boolean) => {
      const h = Math.max(2.0, 0.55 * items.length + 0.6);
      els.push(poly([v(x0, 0), v(x0 + 2.0, 0), v(x0 + 2.0, h), v(x0, h)], { tone: "ink", thin: true }));
      els.push(txt(v(x0 + 1.0, h + 0.25), title, "c", { small: true, bold: true }));
      items.forEach((s, i) => els.push(txt(v(x0 + 1.0, h - 0.5 - i * 0.55), s, "c", { bold: true, tone: mark(s) ? "warn" : "ink" })));
    };
    boxAt(0, before, "Önce", (s) => !after.includes(s));
    boxAt(3.2, after, "Sonra", (s) => !before.includes(s));
    els.push(vec(v(2.15, 1.0), v(3.05, 1.0), { tone: isChemical223(c) ? "warn" : "a", bold: true }));
    els.push(txt(v(2.6, -0.45), equationText223(c), "c", { small: true }));
    els.push(...pad(-0.3, 3.0, 5.5, -0.8));
    const fresh = newSpecies223(c);
    return {
      els,
      readout: [
        `İki yanda: ${tallyText223(sideTally223(c.left))}; tanecik ${sideTally223(c.left).particles} → ${sideTally223(c.right).particles}.`,
        fresh.length ? `Yeni tür: ${fresh.join(", ")} ⇒ ${classText223(c).toLocaleLowerCase("tr-TR")}.` : `Yeni tür yok ⇒ ${classText223(c).toLocaleLowerCase("tr-TR")}.`,
      ],
    };
  },
};

export const depthFigures223: Record<string, Record<string, FigureDef>> = {
  "gazlar-hal-degisim-plazma": { [gasSection223.title]: gasFigure },
  "buharlasma-buhar-basinci": { [vapourSection223.title]: vapourFigure },
  "kaynama-bagil-nem": { [boilSection223.title]: boilFigure },
  "katilar-viskozite": { [solidSection223.title]: solidFigure },
  "fiziksel-kimyasal-degisimler": { [changeSection223.title]: changeFigure },
};
