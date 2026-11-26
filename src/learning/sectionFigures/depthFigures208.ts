import {
  chainFractions208, chainRows208, chainSection208, chainTotal208, placeDigits208, placeValueRows208, placeValueSection208,
  qText208, q208, repeatingFigureRow208, repeatingSection208, repeatingText208, reverseSumRow208, arithmeticSection208,
  wordRows208, wordSamples208, wordSection208, signed208, type Q208,
} from "../depth208";
import { seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { cell, pad, rect } from "./mathFigures062TytKit";

/*
 * 0.208.0 TYT Matematik derinleştirme çizimleri. Her hücre, etiket ve
 * okuma satırı depth208 modülündeki aynı veri fonksiyonlarından gelir;
 * çizim adım değiştirmekle öğrenme kaydı oluşturmaz.
 */

/* ---------- Temel kavramlar: abc − cba sütun sütun ---------- */

const PLACE_STEPS = ["abc’yi basamaklara ayır", "cba’yı aynı sütunlara yaz", "Sütun sütun çıkar"];
const place = (): FigureDef => {
  const rows = placeValueRows208();
  const abc = rows[3];
  const diff = rows[4];
  const { a, b, c } = placeDigits208;
  const places = [100, 10, 1];
  const top = [a, b, c].map((d, i) => d * places[i]);
  const bottom = [c, b, a].map((d, i) => d * places[i]);
  const cols = top.map((t, i) => t - bottom[i]);
  return {
    caption: `abc = ${abc.values[0]} ve cba = ${diff.values[1]} aynı basamak sütunlarına yazılır. Ortadaki sütunda iki sayı da ${10 * b} taşır ve fark ${cols[1]} olur. Kalan iki sütun ${signed208(cols[0])} ve ${signed208(cols[2])} verir: toplam ${diff.value} = ${diff.factor}·${diff.innerValue}.`,
    alt: `Yüzler, onlar ve birler sütunlu tablo. İlk satır ${top.join(", ")}; ikinci satır ${bottom.join(", ")}; son satır sütun farkları ${cols.map(signed208).join(", ")}.`,
    steps: PLACE_STEPS,
    draw: (_, step) => {
      const w = [2.6, 2, 2, 2];
      const h = 0.8;
      const x = [0, w[0], w[0] + w[1], w[0] + w[1] + w[2]];
      const els: El[] = [];
      const head = ["", "yüzler", "onlar", "birler"];
      head.forEach((s, i) => { if (s) els.push(...cell(x[i], 0, w[i], h, s, "muted", { fill: true })); });
      const rowsOut: { label: string; values: number[]; tone: Tone }[] = [
        { label: `abc = ${abc.values[0]}`, values: top, tone: "a" },
        { label: `cba = ${diff.values[1]}`, values: bottom, tone: "c" },
        { label: `fark = ${diff.value}`, values: cols, tone: "warn" },
      ];
      rowsOut.slice(0, step + 1).forEach((row, r) => {
        const y = -(r + 1) * h;
        els.push(...cell(x[0], y, w[0], h, row.label, row.tone, { fill: true }));
        row.values.forEach((value, i) => els.push(...cell(x[i + 1], y, w[i + 1], h, signed208(value), r === 2 && value === 0 ? "warn" : "muted", { fill: r === 2 && value === 0, bold: r === 2 })));
      });
      if (step >= 1) els.push(seg(v(x[0], -2 * h), v(x[3] + w[3], -2 * h), { tone: "ink", bold: true }));
      els.push(...pad(-0.2, h + 0.2, x[3] + w[3] + 0.2, -3 * h - 0.2));
      const lines = [
        [`abc = 100·${a} + 10·${b} + ${c} = ${abc.values[0]}.`, "Her rakam bulunduğu basamağın değeriyle çarpılır."],
        [`cba = 100·${c} + 10·${b} + ${a} = ${diff.values[1]}.`, `Ortadaki ${b} iki sayıda da onlar basamağındadır.`],
        [`${signed208(cols[0])} + ${cols[1]} + (${signed208(cols[2])}) = ${diff.value} = ${diff.factor}·(${a} − ${c}).`, "Onlar sütunu her zaman 0 verir, b farka girmez."],
      ];
      return { els, readout: lines[step] };
    },
  };
};

/* ---------- Ardışık sayılar: ters yazıp alt alta topla ---------- */

const REVERSE_STEPS = ["Listeyi yaz", "Tersini altına yaz", "Sütunları topla", "2S’yi ikiye böl"];
const reverseSum = (): FigureDef => {
  const row = reverseSumRow208;
  const terms = row.terms;
  const back = [...terms].reverse();
  const pair = terms[0] + back[0];
  return {
    caption: `${terms[0]}, ${terms[1]}, …, ${terms.at(-1)} listesi ve tersi alt alta yazılır. Her sütunun toplamı ilk + son = ${pair} olur. ${row.n} sütun 2S = ${row.n}·${pair} verir, S bunun yarısıdır.`,
    alt: `Üst satırda ${terms.join(", ")}; altında aynı sayılar ters sırada; en altta her sütunda ${pair}.`,
    steps: REVERSE_STEPS,
    draw: (_, step) => {
      const lw = 1.4;
      const cw = 1;
      const h = 0.8;
      const els: El[] = [];
      const lines: { label: string; values: number[]; tone: Tone }[] = [
        { label: "S", values: terms, tone: "a" },
        { label: "S", values: back, tone: "c" },
        { label: "2S", values: terms.map(() => pair), tone: "warn" },
      ];
      lines.slice(0, Math.min(step, 2) + 1).forEach((line, r) => {
        const y = -r * h;
        els.push(...cell(0, y, lw, h, line.label, line.tone, { fill: true }));
        line.values.forEach((value, i) => els.push(...cell(lw + i * cw, y, cw, h, signed208(value), r === 2 ? "warn" : "muted", { fill: r === 2 })));
      });
      if (step >= 2) els.push(seg(v(0, -h), v(lw + terms.length * cw, -h), { tone: "ink", bold: true }));
      if (step === 3) els.push(txt(v(lw + (terms.length * cw) / 2, -2 * h - 0.25), `2S = ${row.n}·${pair} = ${row.n * pair}`, "s", { tone: "warn", bold: true }));
      els.push(...pad(-0.2, h + 0.2, lw + terms.length * cw + 0.2, -2 * h - 1.1));
      const readout = [
        [`İlk terim ${terms[0]}, adım ${row.step}, son terim ${row.last}.`, `n = (${row.last} − ${row.first})/${row.step} + 1 = ${row.n}.`],
        ["Aynı toplam tersten yazılır.", "Sayılar değişmez, yalnız sıraları ters döner."],
        [`Her sütun ${terms[0]} + ${back[0]} = ${pair}.`, "Bir terim artarken alttaki aynı adımla azalır."],
        [`2S = ${row.n}·${pair} = ${row.n * pair}, S = ${row.sum}.`, "S = n(ilk + son)/2 formülü bu çizimden gelir."],
      ];
      return { els, readout: readout[step] };
    },
  };
};

/* ---------- Sayı problemleri: sözcük sırası işlem zinciri ---------- */

const words = (): FigureDef => {
  const rows = wordRows208();
  const x0 = q208(wordSamples208[0]);
  const pairs = [0, 2, 4, 6].map((i) => [rows[i], rows[i + 1]] as const);
  return {
    caption: `Aynı sözcüklerle kurulan iki cümle x = ${wordSamples208[0]} sayısından başlayarak işlem işlem izlenir. Cümlede ilk söylenen işlem ilk kutuya gider. Sıra değişince ara değer ve sonuç değişir.`,
    alt: `Dört adım; her adımda iki satır. Her satırda x = ${wordSamples208[0]} kutusu, iki işlem oku ve sonuç kutusu bulunur. Örneğin ilk adımda sonuçlar ${qText208(pairs[0][0].stages(x0)[2])} ve ${qText208(pairs[0][1].stages(x0)[2])}.`,
    steps: pairs.map(([p]) => p.expression),
    draw: (_, step) => {
      const bw = 1.6;
      const aw = 2.3;
      const h = 0.75;
      const els: El[] = [];
      pairs[step].forEach((row, r) => {
        const y = -r * 2.3;
        const stages: Q208[] = row.stages(x0);
        els.push(txt(v(0, y + h + 0.3), `${row.phrase} = ${row.expression}`, "e", { tone: r === 0 ? "a" : "c", bold: true, small: true }));
        stages.forEach((value, i) => {
          const bx = i * (bw + aw);
          els.push(...cell(bx, y, bw, h, i === 0 ? `x = ${qText208(value)}` : qText208(value), i === stages.length - 1 ? (r === 0 ? "a" : "c") : "muted", { fill: i === stages.length - 1 }));
          if (i < stages.length - 1) {
            els.push(vec(v(bx + bw + 0.12, y + h / 2), v(bx + bw + aw - 0.12, y + h / 2), { tone: "ink", thin: true }));
            els.push(txt(v(bx + bw + aw / 2, y + h / 2 - 0.12), row.ops[i], "s", { tone: "muted", small: true }));
          }
        });
      });
      els.push(...pad(-0.2, 1.4, 3 * bw + 2 * aw + 0.2, -2.3 - 0.9));
      const [p, q] = pairs[step];
      const [pv, qv] = [p.stages(x0).at(-1)!, q.stages(x0).at(-1)!];
      return {
        els,
        readout: [`${p.expression} = ${qText208(pv)}, ${q.expression} = ${qText208(qv)}.`, `Aynı sözcükler, ters sıra: ${p.ops.join(" → ")} ile ${q.ops.join(" → ")}.`],
      };
    },
  };
};

/* ---------- Kesir problemleri: kalan şeridi adım adım ---------- */

const chain = (): FigureDef => {
  const rows = chainRows208();
  const L = 9;
  const k = L / chainTotal208;
  return {
    caption: `${chainTotal208} TL ölçekli şeritle gösterilir. Her adımda o anki kalanın kesri kullanılır: ${chainFractions208.map(qText208).join(", ")}. Şerit her satırda kısalır, son kalan ${rows.at(-1)!.remaining} TL olur.`,
    alt: `Alt alta dört şerit. Her şerit bir önceki kalan kadar uzundur; sağ ucundaki kullanılan parça ${rows.map((r) => r.used).join(", ")} TL, sol taraftaki kalan ${rows.map((r) => r.remaining).join(", ")} TL.`,
    steps: rows.map((r) => `${r.step}. adım`),
    draw: (_, step) => {
      const h = 0.6;
      const els: El[] = [];
      rows.slice(0, step + 1).forEach((r, i) => {
        const y = -i * 1.45;
        els.push(txt(v(0, y + h + 0.3), `${r.step}. adım · ${r.base} TL × ${qText208(r.fraction)} = ${r.used} TL`, "e", { tone: i === step ? "warn" : "muted", small: true, bold: i === step }));
        els.push(rect(0, y, r.remaining * k, h, "a"));
        els.push(rect(r.remaining * k, y, r.used * k, h, "warn"));
        els.push(txt(v((r.remaining * k) / 2, y + h / 2), `kalan ${r.remaining}`, "c", { tone: "ink", small: true, bold: true }));
      });
      els.push(seg(v(L, 1.1), v(L, -rows.length * 1.45 + 0.6), { tone: "muted", dash: true, thin: true }));
      els.push(...pad(-0.2, 1.4, L + 0.3, -(rows.length - 1) * 1.45 - 0.3));
      const r = rows[step];
      return {
        els,
        readout: [
          `${r.base} TL × ${qText208(r.fraction)} = ${r.used} TL; kalan ${r.remaining} TL.`,
          `Başlangıca göre kullanılan ${qText208(r.usedShare)}, kalan pay ${qText208(r.remainingShare)}.`,
        ],
      };
    },
  };
};

/* ---------- Rasyonel sayılar: virgülü kaydır, kuyrukları hizala ---------- */

const REP_STEPS = ["x’i yaz", "Devir başına kaydır", "Bir devir daha kaydır", "Çıkar ve sadeleştir"];
const repeating = (): FigureDef => {
  const r = repeatingFigureRow208;
  const k = r.fixed.length;
  const m = k + r.period.length;
  const shown = 6;
  const fracDigits = (from: number) => {
    let s = r.fixed;
    while (s.length < from + shown) s += r.period;
    return s.slice(from, from + shown);
  };
  const shifted = (j: number) => ({
    whole: r.whole * 10 ** j + (j ? Number((r.fixed + r.period.repeat(j)).slice(0, j)) : 0),
    digits: fracDigits(j),
    label: j === 0 ? "x" : `${10 ** j}x`,
  });
  const lo = shifted(k);
  const hi = shifted(m);
  const coef = 10 ** m - 10 ** k;
  const diffWhole = hi.whole - lo.whole;
  guard208(hi.digits === lo.digits && qText208(q208(diffWhole, coef)) === qText208(r.value), "kaydırılan kuyruklar aynı olmalı");
  const open = (s: { whole: number; digits: string }) => `${s.whole},${s.digits}…`;
  return {
    caption: `x = ${repeatingText208(r)} için x ${10 ** k} ve ${10 ** m} ile çarpılır. İki sayının virgülden sonraki kuyrukları aynıdır, çıkarınca kuyruk silinir: ${coef}x = ${diffWhole}.`,
    alt: `Virgüle göre hizalı basamak satırları: x = ${open(shifted(0))}, ${lo.label} = ${open(lo)}, ${hi.label} = ${open(hi)}; son satırda ${coef}x = ${diffWhole}.`,
    steps: REP_STEPS,
    draw: (_, step) => {
      const lw = 1.6;
      const cw = 0.6;
      const h = 0.75;
      const intCols = 2;
      const els: El[] = [];
      const lines = [shifted(0), lo, hi];
      const drawLine = (label: string, whole: number, digits: string, y: number, tone: Tone, from: number) => {
        els.push(...cell(0, y, lw, h, label, tone, { fill: true }));
        const ws = String(whole).padStart(intCols, " ");
        [...ws].forEach((ch, i) => { if (ch !== " ") els.push(...cell(lw + i * cw, y, cw, h, ch, "muted", { fill: false })); });
        els.push(txt(v(lw + intCols * cw + cw / 2, y + 0.12), ",", "c", { tone: "ink", bold: true }));
        [...digits].forEach((ch, i) => {
          const pos = from + i;
          const inPeriod = pos >= r.fixed.length;
          els.push(...cell(lw + (intCols + 1 + i) * cw, y, cw, h, ch, from < 0 ? "muted" : inPeriod ? "a" : "c", { fill: from >= 0 && digits !== "0".repeat(shown) }));
        });
        els.push(txt(v(lw + (intCols + 1 + shown) * cw + 0.1, y + h / 2), "…", "e", { tone: "muted" }));
      };
      lines.slice(0, Math.min(step, 2) + 1).forEach((line, i) => {
        const j = i === 0 ? 0 : i === 1 ? k : m;
        drawLine(line.label, line.whole, line.digits, -i * h, i === 0 ? "muted" : i === 1 ? "c" : "a", j);
      });
      if (step === 3) {
        els.push(seg(v(0, -2 * h), v(lw + (intCols + 1 + shown) * cw, -2 * h), { tone: "ink", bold: true }));
        drawLine(`${coef}x`, diffWhole, "0".repeat(shown), -3 * h, "warn", -1);
      }
      els.push(...pad(-0.2, h + 0.2, lw + (intCols + 2 + shown) * cw + 0.3, -3 * h - 0.2));
      const readout = [
        [`x = ${open(shifted(0))}`, `Devretmeyen basamak ${r.fixed.length}, devreden basamak ${r.period.length}.`],
        [`${lo.label} = ${open(lo)}`, "Virgül devrin başına geldi."],
        [`${hi.label} = ${open(hi)}`, "Kuyruk bir devir sonra aynı basamaklarla sürer."],
        [`${hi.label} − ${lo.label} = ${hi.whole} − ${lo.whole} ⇒ ${coef}x = ${diffWhole}.`, `x = ${diffWhole}/${coef} = ${qText208(r.value)}.`],
      ];
      return { els, readout: readout[step] };
    },
  };
};

function guard208(ok: boolean, claim: string) {
  if (!ok) throw new Error(`depthFigures208: ${claim}`);
}

export const depthFigures208: Record<string, Record<string, FigureDef>> = {
  "temel-kavramlar": { [placeValueSection208.figureTitle!]: place() },
  "ardisik-sayilar": { [arithmeticSection208.figureTitle!]: reverseSum() },
  "sayi-problemleri": { [wordSection208.figureTitle!]: words() },
  "kesir-problemleri": { [chainSection208.figureTitle!]: chain() },
  "rasyonel-sayilar": { [repeatingSection208.figureTitle!]: repeating() },
};
