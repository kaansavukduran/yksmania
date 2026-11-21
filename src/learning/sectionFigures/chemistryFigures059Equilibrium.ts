import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { axes, box, nf, pad, ytick } from "./physicsFigures058Kit";

/*
 * Forge059 AYT Kimya: denge. X + Y ⇌ XY (Kc = 1) için tür ekleme, ürün çekme
 * ve hacmi yarıya indirme; AB ⇌ A + B (Kp = 1 atm) için sıkıştırma ile sabit
 * hacimde / sabit basınçta inert gaz; X ⇌ Y (K = 2) için Q–K karşılaştırması
 * ve iki hız sabitinin oranı. Yeni denge değerleri ikinci dereceden denklemin
 * fiziksel kökünden hesaplanır; grafikteki düzeyler aynı ölçekle çizilir.
 */

type Trio = [number, number, number];
const NAMES = ["X", "Y", "XY"];
const TONES: Tone[] = ["a", "b", "c"];

/** Derişim–zaman: eski denge, t₁'de ani değişim, yeni denge (üç adım). */
function concTime(step: number, before: Trio, jump: Trio, after: Trio, yMax: number): El[] {
  const t1 = 3.2;
  const S = 3.8 / yMax;
  const els: El[] = [...axes(v(0, 0), 8.6, 4.3, "zaman", "derişim (M)")];
  const ends: [number, string, Tone][] = [];
  for (let i = 0; i < 3; i++) {
    const tone = TONES[i];
    els.push(seg(v(0, before[i] * S), v(t1, before[i] * S), { tone, bold: true }));
    let endY = before[i];
    if (step >= 1) {
      if (Math.abs(jump[i] - before[i]) > 1e-9) els.push(seg(v(t1, before[i] * S), v(t1, jump[i] * S), { tone, bold: true, dash: true }));
      endY = jump[i];
    }
    if (step >= 2) {
      const ps: V[] = Array.from({ length: 21 }, (_, k) => {
        const u = k / 20;
        return v(t1 + u * 2.6, (after[i] + (jump[i] - after[i]) * Math.exp(-4 * u)) * S);
      });
      els.push(poly(ps, { tone, open: true, bold: true, smooth: true }), seg(v(t1 + 2.6, after[i] * S), v(8.2, after[i] * S), { tone, bold: true }));
      endY = after[i];
    }
    ends.push([endY, NAMES[i], tone]);
  }
  const endX = step >= 2 ? 8.25 : t1 + 0.05;
  ends.sort((p, q) => p[0] - q[0]);
  const merged: [number, string, Tone][] = [];
  for (const e of ends) {
    const m = merged.find((q) => Math.abs(q[0] - e[0]) < 1e-6);
    if (m) {
      m[1] = `${m[1]}, ${e[1]}`;
      m[2] = "ink";
    } else merged.push([...e]);
  }
  let last = -9;
  for (const [y, name, tone] of merged) {
    const at = Math.max(y * S, last + 0.34);
    last = at;
    els.push(txt(v(endX, at), name, "e", { tone, small: true, bold: true }));
  }
  els.push(seg(v(t1, 0), v(t1, 4.0), { tone: "muted", dash: true, thin: true }), txt(v(t1, 0), "t₁", "s", { tone: "muted", small: true }));
  els.push(...ytick(0, 1 * S, "1"), ...ytick(0, 2 * S, "2"));
  els.push(...pad(-0.8, 4.8, 9.4, -0.8));
  return els;
}

const fmtTrio = (t: Trio) => t.map((c, i) => `[${NAMES[i]}] ${nf(c, 3)}`).join(" · ");

/* ---------- ayt-denge-derisim ---------- */

const addX: FigureDef = {
  caption:
    "İleri ile üç fotoğrafı sırayla aç: X + Y ⇌ XY, Kc = 1, sabit T ve V. Eski dengede üç derişim 1 M. t₁'de yalnız X'e 1 M eklenir: yalnız [X] dikey sıçrar, Q = 1/(2·1) = 1/2 < K. Sonra net dönüşüm ürünlere: X ve Y aynı miktar azalır, XY aynı miktar artar. Yeni denge (2 − x)(1 − x) = 1 + x denkleminin fiziksel kökünden: x ≈ 0,268 M.",
  alt: "Derişim–zaman grafiği: X, Y ve XY için üç çizgi 1 M'de başlar. t₁'de X çizgisi 2 M'ye dikey sıçrar; sonra X ve Y azalıp XY artarak yeni yatay düzeylere ulaşır.",
  steps: ["Eski denge", "Ani değişim: X eklenir", "Yeni denge"],
  draw: (_v, step) => {
    const x = 2 - Math.sqrt(3);
    const after: Trio = [2 - x, 1 - x, 1 + x];
    const els = concTime(step, [1, 1, 1], [2, 1, 1], after, 2.2);
    const rows: [string, string][] = [
      ["Eski denge: [X] = [Y] = [XY] = 1 M; Kc = 1 ÷ (1 · 1) = 1.", "Denge: ileri ve geri hızlar eşit; tepkime durmuş değildir."],
      ["Ani değişim: [X] 2 M, [Y] ve [XY] 1 M kalır. Q = 1 ÷ (2 · 1) = 0,5 < 1 → ürünlere.", "Eklenmeyen türler o anda dikey sıçramaz."],
      [`Yeni denge: ${fmtTrio(after)} (x = 2 − √3 ≈ ${nf(x, 3)} M).`, `Denetim: ${nf(after[2], 3)} ÷ (${nf(after[0], 3)} · ${nf(after[1], 3)}) = ${nf(after[2] / (after[0] * after[1]), 3)}. [X] eskiden büyük, kendi sıçramasından küçük.`],
    ];
    return { els, readout: rows[step] };
  },
};

const removeXY: FigureDef = {
  caption:
    "İleri ile ürün çekmeyi izle: X + Y ⇌ XY, Kc = 1, eski dengede üç derişim 1 M. t₁'de XY'nin 0,5 M'lik kısmı uzaklaştırılır: Q = 0,5 < K, net dönüşüm ileri. XY yeniden oluşur ama eski 1 M'ye ulaşmaz. Yeni denge (1 − x)² = 0,5 + x denkleminden: x ≈ 0,177 M.",
  alt: "Derişim–zaman grafiği: üç çizgi 1 M'de; t₁'de XY çizgisi 0,5 M'ye dikey düşer, sonra XY biraz artarken X ve Y birlikte azalır.",
  steps: ["Eski denge", "Ani değişim: XY çekilir", "Yeni denge"],
  draw: (_v, step) => {
    const x = (3 - Math.sqrt(7)) / 2;
    const after: Trio = [1 - x, 1 - x, 0.5 + x];
    const els = concTime(step, [1, 1, 1], [1, 1, 0.5], after, 2.2);
    const rows: [string, string][] = [
      ["Eski denge: üç derişim 1 M, Kc = 1.", "Çekilen madde sistemden çıkar; stok bilançosuna eksi yazılır."],
      ["Ani değişim: [XY] 0,5 M. Q = 0,5 ÷ (1 · 1) = 0,5 < 1 → ileri yön.", "Payı küçülen Q, K'ye ulaşmak için ürün yönüne gider."],
      [`Yeni denge: ${fmtTrio(after)} (x = (3 − √7) ÷ 2 ≈ ${nf(x, 3)} M).`, `Denetim: ${nf(after[2], 3)} ÷ ${nf(after[0], 3)}² = ${nf(after[2] / after[0] ** 2, 3)}. XY eski 1 M'ye dönmez.`],
    ];
    return { els, readout: rows[step] };
  },
};

const halveV: FigureDef = {
  caption:
    "İleri ile hacmi yarıya indir: X + Y ⇌ XY, Kc = 1, sabit T. Tepkime ilerlemeden önce bütün gazların derişimi iki katına çıkar (2, 2, 2 M); pay bir, payda iki derişim içerdiği için Q = 2/(2·2) = 0,5 olur. Net dönüşüm daha az gaz molüne (ürünlere) gider. Yeni dengede X ve Y azalır ama eski 1 M'nin üstünde kalır.",
  alt: "Derişim–zaman grafiği: üç çizgi 1 M'de; t₁'de üçü birden 2 M'ye dikey sıçrar; sonra X ve Y azalır, XY artar.",
  steps: ["Eski denge", "Ani değişim: V yarıya", "Yeni denge"],
  draw: (_v, step) => {
    const x = (5 - Math.sqrt(17)) / 2;
    const after: Trio = [2 - x, 2 - x, 2 + x];
    const els = concTime(step, [1, 1, 1], [2, 2, 2], after, 2.6);
    const rows: [string, string][] = [
      ["Eski denge: üç derişim 1 M, Kc = 1.", "Hacim müdahalesi tek bir türe değil, bütün gazlara dokunur."],
      ["Ani değişim: üç derişim 2 M. Q = 2 ÷ (2 · 2) = 0,5 < 1 → ürünlere.", "Sol tarafta 2 mol gaz, sağda 1 mol: sıkıştırma az mol tarafını destekler."],
      [`Yeni denge: ${fmtTrio(after)} (x = (5 − √17) ÷ 2 ≈ ${nf(x, 3)} M).`, `Denetim: ${nf(after[2], 3)} ÷ ${nf(after[0], 3)}² = ${nf(after[2] / after[0] ** 2, 3)}. Tüketilen X'in son derişimi yine eski 1 M'den büyük.`],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- ayt-denge-basinc-hacim ---------- */

const RT300 = 0.082 * 300;
const compress: FigureDef = {
  caption:
    "İleri ile sıkıştırmayı sayılarla izle: AB ⇌ A + B, 300 K, Kp = 1 atm. 24,6 L'de her türden 1 mol (her biri 1 atm). Hacim 12,3 L'ye inince mol sayıları ilk anda aynı, kısmi basınçlar iki kat: Qp = 2·2/2 = 2 atm > Kp. Net dönüşüm geri (daha az gaz molü). A ve B'nin son molü a ise AB = 2 − a; a²/[0,5(2 − a)] = 1 → a ≈ 0,7808 mol.",
  alt: "Üç grup çubuk: sıkıştırmadan önce, hemen sonra ve yeni dengede AB, A ve B'nin kısmi basınçları. İkinci grupta hepsi iki kat; üçüncü grupta AB artmış, A ve B azalmış.",
  steps: ["24,6 L: denge", "12,3 L: ani", "12,3 L: yeni denge"],
  draw: (_v, step) => {
    const a = (-0.5 + Math.sqrt(0.25 + 4)) / 2;
    const groups: { label: string; mol: Trio; V: number }[] = [
      { label: "24,6 L", mol: [1, 1, 1], V: 24.6 },
      { label: "12,3 L ani", mol: [1, 1, 1], V: 12.3 },
      { label: "yeni denge", mol: [2 - a, a, a], V: 12.3 },
    ];
    const names = ["AB", "A", "B"];
    const tones: Tone[] = ["c", "a", "b"];
    const els: El[] = [vec(v(0, 0), v(9.4, 0), { tone: "ink", thin: true }), vec(v(0, 0), v(0, 4.2), { tone: "ink", thin: true }), txt(v(0, 4.2), "P (atm)", "n", { tone: "ink", small: true })];
    els.push(...ytick(0, 1.5, "1"), ...ytick(0, 3.0, "2"));
    groups.forEach((g, gi) => {
      const on = gi <= step;
      const x0 = 0.6 + gi * 3.0;
      g.mol.forEach((n, i) => {
        const p = (n * RT300) / g.V;
        const x = x0 + i * 0.8;
        if (on) els.push(box(x, 0, x + 0.6, p * 1.5, tones[i]), txt(v(x + 0.3, p * 1.5), names[i], "n", { tone: tones[i], small: true, bold: true }));
      });
      els.push(txt(v(x0 + 1.1, 0), g.label, "s", { tone: on ? "ink" : "muted", small: true, bold: on }));
    });
    els.push(...pad(-0.8, 4.7, 9.8, -0.7));
    const pA = (a * RT300) / 12.3;
    const pAB = ((2 - a) * RT300) / 12.3;
    const rows: [string, string][] = [
      ["24,6 L: P = 1 mol · 0,082 · 300 ÷ 24,6 = 1 atm her tür için. Qp = 1 · 1 ÷ 1 = 1 atm = Kp.", "Kısmi basınç Pᵢ = nᵢRT/V: hacim yarıya inince mol aynıyken basınç iki katı."],
      ["12,3 L ani: her tür 2 atm. Qp = 2 · 2 ÷ 2 = 2 atm > Kp → geri yön (AB).", "Sol 1 mol gaz, sağ 2 mol gaz: sıkıştırma az mol tarafını destekler."],
      [`Yeni denge: A = B = ${nf(a, 4)} mol (${nf(pA, 3)} atm), AB = ${nf(2 - a, 4)} mol (${nf(pAB, 3)} atm).`, `Denetim: ${nf(pA, 3)}² ÷ ${nf(pAB, 3)} = ${nf((pA * pA) / pAB, 3)} atm ≈ Kp. Atom stoku: AB + A = 2 mol.`],
    ];
    return { els, readout: rows[step] };
  },
};

/** Kap + kısmi basınç çubukları (AB, A, B ve inert I). */
function inertScene(width: number, counts: [number, number, number, number], press: [number, number, number, number], piston: boolean): El[] {
  const els: El[] = [poly([v(0, 3.0), v(0, 0), v(width, 0), v(width, 3.0)], { tone: "ink", open: true, bold: true })];
  if (piston) els.push(seg(v(width, 0), v(width, 3.0), { tone: "warn", bold: true }), vec(v(width + 0.1, 1.5), v(width + 0.6, 1.5), { tone: "warn", bold: true }));
  else els.push(seg(v(width, 0), v(width, 3.0), { tone: "ink", bold: true }));
  els.push(seg(v(0, 3.0), v(width, 3.0), { tone: "ink", bold: true }));
  const tones: Tone[] = ["c", "a", "b", "muted"];
  let k = 0;
  counts.forEach((c, i) => {
    for (let j = 0; j < c; j++, k++) {
      const cols = Math.max(3, Math.floor((width - 0.4) / 0.75));
      const p = v(0.45 + (k % cols) * ((width - 0.9) / (cols - 1)) + ((k * 3) % 2) * 0.1, 0.5 + Math.floor(k / cols) * 0.75 + ((k * 7) % 3) * 0.1);
      els.push(circle(p, 0.15, i === 3 ? { tone: "muted" } : { tone: tones[i], fill: tones[i] }));
    }
  });
  const names = ["AB", "A", "B", "I"];
  const bx = 6.2;
  press.forEach((p, i) => {
    const x = bx + i * 0.95;
    if (p > 0) els.push(box(x, 0, x + 0.55, p * 1.1, tones[i], i !== 3));
    els.push(txt(v(x + 0.27, 0), names[i], "s", { tone: "ink", small: true, bold: true }));
    if (p > 0) els.push(txt(v(x + 0.27, p * 1.1), nf(p, 1), "n", { tone: "ink", small: true }));
  });
  els.push(txt(v(bx + 1.7, 3.3), "kısmi basınç (atm)", "n", { tone: "muted", small: true }));
  els.push(...pad(-0.3, 4.0, 10.2, -0.6));
  return els;
}

const inertV: FigureDef = {
  caption:
    "İleri ile sabit hacimde inert gaz ekle: 24,6 L, 300 K, AB, A ve B'den 1'er mol (her biri 1 atm). 2 mol I eklenince I'nın basıncı 2 atm, toplam 5 atm olur; ama tepkime türlerinin mol sayıları ve hacim değişmediği için kısmi basınçları 1 atm kalır. Qp değişmez, denge kaymaz. Halkalar I tanecikleridir.",
  alt: "Solda sabit duvarlı kap ve içindeki tanecikler; sağda AB, A, B ve I için kısmi basınç çubukları. İkinci adımda I tanecikleri ve 2 atm'lik I çubuğu eklenir; diğer çubuklar değişmez.",
  steps: ["Önce", "2 mol I eklendi"],
  draw: (_v, step) => {
    const els = inertScene(4.2, [2, 2, 2, step ? 4 : 0], [1, 1, 1, step ? 2 : 0], false);
    const rows: [string, string][] = [
      ["Her tür 1 mol, 1 atm; toplam 3 atm. Qp = 1 · 1 ÷ 1 = 1 atm = Kp.", "Kap sabit hacimli (duvar hareket etmez)."],
      ["I: 2 atm, toplam 5 atm. A'nın mol kesri 1/5, P_A = (1/5) · 5 = 1 atm (değişmedi).", "Eski mol kesri 1/3'ü yeni toplam basınçla çarpmak hatalıdır. Her nokta 0,5 mol."],
    ];
    return { els, readout: rows[step] };
  },
};

const inertP: FigureDef = {
  caption:
    "İleri ile sabit toplam basınçta inert gaz ekle: başlangıç 3 mol, 3 atm, 24,6 L. 2 mol I eklenirken toplam basınç 3 atm tutulursa piston dışarı itilir ve hacim 41 L olur. Tepkime türlerinin molü ilk anda aynı, kısmi basınçları 0,6 atm'ye düşer: Qp = 0,6·0,6/0,6 = 0,6 atm < Kp, net dönüşüm ileri (daha çok gaz molü).",
  alt: "Solda pistonlu kap; ikinci adımda kap sağa genişler ve piston oku dışarı bakar. Sağda kısmi basınç çubukları: ilk adımda üç tür 1 atm; ikinci adımda üç tür 0,6 atm, I 1,2 atm.",
  steps: ["Önce: 24,6 L", "I eklendi: 41 L"],
  draw: (_v, step) => {
    const els = inertScene(step ? 5.2 : 3.1, [2, 2, 2, step ? 4 : 0], step ? [0.6, 0.6, 0.6, 1.2] : [1, 1, 1, 0], true);
    const rows: [string, string][] = [
      ["3 mol, 3 atm, 24,6 L; her tür 1 atm. Qp = Kp = 1 atm.", "Piston dış basınçla dengede: toplam basınç sabit tutulur."],
      ["V = 5 mol · 0,082 · 300 ÷ 3 atm = 41 L. Her tür 1 · 24,6 ÷ 41 = 0,6 atm; I 1,2 atm.", "Qp = 0,6 atm < 1 atm → ileri (AB ayrışır). Sabit toplam basınç, sabit kısmi basınç demek değildir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- ayt-denge-sicaklik-kesir ---------- */

const qVsK: FigureDef = {
  caption:
    "Sürgüyle [Y]'yi değiştir; X ⇌ Y, K = 2, [X] = 1 M. Q = [Y]/[X]. Q < K iken net dönüşüm ürüne (Y), Q > K iken girene (X) gider; Q = K dengedir: hızlar eşit, tepkimeler sürüyor. Oranı ters yazmak yönü ters seçtirir.",
  alt: "Yatay Q sayı doğrusu; 2'de K işareti. Sürgüyle kayan Q noktası ve noktadan K'ye doğru yön oku; ok yönüne göre ürün ya da giren yönü yazıyor.",
  param: { label: "[Y]", min: 0.5, max: 4, step: 0.5, init: 4, unit: " M" },
  draw: (y) => {
    const Q = y / 1;
    const X = (q: number) => q * 1.9;
    const els: El[] = [vec(v(0, 0), v(X(4.4), 0), { tone: "ink" }), txt(v(X(4.4), 0), "Q", "e", { tone: "ink", small: true, bold: true })];
    for (const q of [0, 1, 2, 3, 4]) els.push(seg(v(X(q), -0.1), v(X(q), 0.1), { tone: "muted", thin: true }), txt(v(X(q), -0.15), String(q), "s", { tone: "muted", small: true }));
    els.push(seg(v(X(2), -0.4), v(X(2), 1.6), { tone: "c", bold: true }), txt(v(X(2), 1.6), "K = 2", "n", { tone: "c", small: true, bold: true }));
    els.push(circle(v(X(Q), 0), 0.14, { tone: "warn", fill: "warn" }), txt(v(X(Q), 0.25), `Q = ${nf(Q, 1)}`, "n", { tone: "warn", small: true, bold: true }));
    if (Math.abs(Q - 2) > 1e-9) {
      els.push(vec(v(X(Q), -0.9), v(X(2) + (Q > 2 ? 0.15 : -0.15), -0.9), { tone: Q < 2 ? "b" : "a", bold: true }));
      els.push(txt(v((X(Q) + X(2)) / 2, -1.0), Q < 2 ? "net: X → Y" : "net: Y → X", "s", { tone: Q < 2 ? "b" : "a", small: true, bold: true }));
    }
    els.push(...pad(-0.5, 2.3, X(4.4) + 0.8, -1.7));
    return {
      els,
      readout: [
        `Q = [Y]/[X] = ${nf(y, 1)} ÷ 1 = ${nf(Q, 1)}`,
        Q < 2 ? "Q < K: ürün yönüne net dönüşüm; Q, K'ye yükselir." : Q > 2 ? "Q > K: giren yönüne net dönüşüm; Q, K'ye iner." : "Q = K: denge. Eşit olan hızlardır, derişimler değil ([X] 1, [Y] 2 M).",
      ],
    };
  },
};

const rateRatio: FigureDef = {
  caption:
    "İleri ile sıcaklığı yükselt. X ⇌ Y için iki basit hız yasasında K = k_ileri / k_geri. Isınınca k_ileri 0,6'dan 1,2'ye (2 kat), k_geri 0,3'ten 0,9'a (3 kat) çıkar: iki hız da artar ama oran 2'den 4/3'e iner. Denge geri kayıyor diye ileri tepkime yavaşlamış değildir.",
  alt: "İki grup çubuk: düşük ve yüksek sıcaklıkta k_ileri ve k_geri. İkinci grupta ikisi de uzun; altta K değerleri.",
  steps: ["Düşük sıcaklık", "Yüksek sıcaklık"],
  draw: (_v, step) => {
    const sets: [number, number][] = [
      [0.6, 0.3],
      [1.2, 0.9],
    ];
    const els: El[] = [vec(v(0, 0), v(7.4, 0), { tone: "ink", thin: true }), vec(v(0, 0), v(0, 4.0), { tone: "ink", thin: true }), txt(v(0, 4.0), "k", "n", { tone: "ink", small: true, bold: true })];
    sets.forEach(([kf, kb], gi) => {
      const on = gi <= step;
      const x0 = 0.8 + gi * 3.6;
      if (on) {
        els.push(box(x0, 0, x0 + 0.8, kf * 2.6, "a"), box(x0 + 1.1, 0, x0 + 1.9, kb * 2.6, "b"));
        els.push(txt(v(x0 + 0.4, kf * 2.6), `ileri ${nf(kf, 1)}`, "n", { tone: "a", small: true, bold: true }));
        els.push(txt(v(x0 + 1.5, kb * 2.6), `geri ${nf(kb, 1)}`, "n", { tone: "b", small: true, bold: true }));
      }
      els.push(txt(v(x0 + 0.95, 0), gi === 0 ? `T₁ · K = ${nf(kf / kb, 2)}` : `T₂ · K = ${on ? nf(kf / kb, 2) : "?"}`, "s", { tone: on ? "ink" : "muted", small: true, bold: on }));
    });
    els.push(...pad(-0.5, 4.5, 7.8, -0.7));
    const rows: [string, string][] = [
      ["T₁: K = 0,6 ÷ 0,3 = 2.", "Verilen basit hız yasalarında K = k_ileri ÷ k_geri."],
      ["T₂: K = 1,2 ÷ 0,9 = 4/3 ≈ 1,33. İki hız sabiti de büyüdü, oran küçüldü.", "Geri tepkime daha çok hızlandı: denge girenlere kayar. Başlangıç karışımı yeni K'ye göre değerlendirilir."],
    ];
    return { els, readout: rows[step] };
  },
};

export const chemistryFigures059Equilibrium: Record<string, Record<string, FigureDef>> = {
  "ayt-denge-derisim": {
    "Tek tür eklendiğinde ilk değişim": addX,
    "Ürün eklemek veya çekmek": removeXY,
    "Hacim müdahalesi bütün gazlara dokunur": halveV,
  },
  "ayt-denge-basinc-hacim": {
    "Sıkıştırmada sayıların izini sür": compress,
    "Sabit hacimde inert eklemek neyi değiştirir?": inertV,
    "Sabit toplam basınçta pistonun payını gör": inertP,
  },
  "ayt-denge-sicaklik-kesir": {
    "Q küçük, büyük veya eşit olduğunda": qVsK,
    "İki hız artarken oran azalabilir": rateRatio,
  },
};
