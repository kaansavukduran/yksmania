import { ball, circle, fmt, poly, pol, seg, txt, v, vec, type El, type FigureDef, type V } from "./figureKit";

/*
 * AYT Kimya (2). Copper plating by a constant current with the full unit
 * chain Q = I·t → n(e⁻) → n(Cu) → m(Cu); four electron regions around a
 * central atom with 0, 1 and 2 lone pairs (CH₄, NH₃, H₂O); and cis/trans
 * 2-butene beside 1-butene, where one double-bond carbon carries two H.
 * Teaching values (F = 96 500 C/mol, Cu = 63,5 g/mol); not to scale.
 */

/* ---------- 1. Faraday ---------- */
const faraday: FigureDef = {
  caption:
    "Sürgüyle süreyi değiştir: CuSO₄ çözeltisinden 2,0 A sabit akım geçiyor. Katotta Cu²⁺ + 2e⁻ → Cu olur; her bakır atomu için iki elektron gerekir. Yük (Q = I·t), elektron molü (Q ÷ F), bakır molü (n(e⁻) ÷ 2) ve kütle (n · M) sırayla hesaplanır; katottaki bakır tabakası kütleyle kalınlaşır.",
  alt: "Beher içinde iki elektrot ve üstte pil; sol elektrot katot, üzerinde süreyle kalınlaşan bakır tabakası; sağ elektrot anot. Okumada yük, elektron molü, bakır molü ve kütle birimleriyle yazılır.",
  param: { label: "Süre", min: 5, max: 60, step: 5, init: 30, unit: " dk" },
  draw: (minutes) => {
    const I = 2;
    const t = minutes * 60;
    const Q = I * t;
    const ne = Q / 96500;
    const nCu = ne / 2;
    const m = nCu * 63.5;
    const els: El[] = [];
    els.push(poly([v(0, 3), v(0, 0), v(5, 0), v(5, 3)], { tone: "ink", open: true }));
    els.push(poly([v(0.05, 2.3), v(4.95, 2.3), v(4.95, 0.05), v(0.05, 0.05)], { tone: "b", fill: "b", bare: true }));
    // Electrodes; the cathode deposit thickens with mass (max ≈ 2,4 g).
    const thick = 0.06 + (m / 2.4) * 0.34;
    els.push(poly([v(1.0, 0.4), v(1.4, 0.4), v(1.4, 3.6), v(1.0, 3.6)], { tone: "muted", fill: "muted" }));
    els.push(poly([v(1.4, 0.4), v(1.4 + thick, 0.4), v(1.4 + thick, 2.25), v(1.4, 2.25)], { tone: "warn", fill: "warn" }));
    els.push(poly([v(3.6, 0.4), v(4.0, 0.4), v(4.0, 3.6), v(3.6, 3.6)], { tone: "muted", fill: "muted" }));
    // Battery and wires.
    els.push(seg(v(1.2, 3.6), v(1.2, 4.4), { tone: "ink" }), seg(v(1.2, 4.4), v(2.2, 4.4), { tone: "ink" }), seg(v(2.8, 4.4), v(3.8, 4.4), { tone: "ink" }), seg(v(3.8, 4.4), v(3.8, 3.6), { tone: "ink" }));
    els.push(seg(v(2.2, 4.05), v(2.2, 4.75), { tone: "ink", bold: true }), seg(v(2.8, 4.2), v(2.8, 4.6), { tone: "ink", bold: true }));
    els.push(txt(v(2.5, 4.75), "2,0 A", "n", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(1.2, 0), "katot (−)", "s", { tone: "ink", small: true }), txt(v(3.8, 0), "anot (+)", "s", { tone: "ink", small: true }));
    els.push(txt(v(2.5, 1.2), "Cu²⁺", "c", { tone: "ink", small: true }));
    els.push(vec(v(2.15, 1.2), v(1.75, 1.2), { tone: "warn", thin: true }));
    els.push(txt(v(-1.8, 5.4), " ", "c"), txt(v(6.8, -0.9), " ", "c"));
    return {
      els,
      readout: [
        `Q = 2,0 A · ${t} s = ${fmt(Q, 0)} C   (A·s = C)`,
        `n(e⁻) = ${fmt(Q, 0)} C ÷ 96 500 C/mol = ${fmt(ne, 4)} mol → n(Cu) = ${fmt(nCu, 4)} mol → m = ${fmt(nCu, 4)} mol · 63,5 g/mol = ${fmt(m, 2)} g`,
      ],
    };
  },
};

/* ---------- 2. Dört bölge ---------- */
const tetra: FigureDef = {
  caption:
    "İleri ile merkez atomun çevresindeki dört elektron bölgesine bak. Bölgeler birbirini iterek düzgün dört yüzlünün köşelerine yönelir. Bağ yapmayan çiftler (••) daha geniş yer kaplar, bağları biraz sıkıştırır: CH₄ 109,5°, NH₃ yaklaşık 107°, H₂O yaklaşık 104,5°. Elektron düzeni aynı kalır; molekülün şekli yalnız atomlara bakılarak adlandırılır.",
  alt: "Merkez atomdan dört yöne çizgiler: yukarı, sol alt, sağ alt ve öne doğru kesik çizgi. Adımlara göre bazı yönlerde H atomu yerine iki noktalı ortaklanmamış çift görünür.",
  steps: ["CH₄: AX₄", "NH₃: AX₃E", "H₂O: AX₂E₂"],
  draw: (_v, step) => {
    const center: V = v(0, 0);
    const dirs: V[] = [pol(1.8, 90), pol(1.8, 210), pol(1.8, 330), pol(1.25, 285)];
    const lone = step === 0 ? [] : step === 1 ? [0] : [0, 3];
    const names = ["C", "N", "O"];
    const els: El[] = [];
    dirs.forEach((d, i) => {
      const front = i === 3;
      if (lone.includes(i)) {
        const p: V = [d[0] * 0.7, d[1] * 0.7];
        els.push(circle(p, 0.42, { tone: "c", fill: "c", thin: true }), txt(p, "••", "c", { tone: "ink", bold: true }));
      } else {
        els.push(seg(center, d, { tone: "ink", bold: !front, dash: front }), ball(d, 0.26, "b"), txt(d, "H", "c", { tone: "ink", small: true, bold: true }));
      }
    });
    els.push(ball(center, 0.38, "a"), txt(center, names[step], "c", { tone: "ink", bold: true }));
    els.push(txt(v(-3.4, 2.6), " ", "c"), txt(v(3.4, -1.6), " ", "c"));
    const rows: [string, string][] = [
      ["CH₄: 4 bağ, 0 ortaklanmamış çift. Elektron düzeni ve molekül şekli düzgün dört yüzlü; açı 109,5°.", "AX₄: A merkez, X bağlı atom, E ortaklanmamış çift. Apolar: dört eşit bağ dipolü birbirini götürür."],
      ["NH₃: 3 bağ, 1 ortaklanmamış çift. Elektron düzeni dört yüzlü, molekül şekli üçgen piramit; açı yaklaşık 107°.", "Ortaklanmamış çift şekle ad verilirken sayılmaz ama açıyı daraltır. Molekül polardır."],
      ["H₂O: 2 bağ, 2 ortaklanmamış çift. Molekül şekli kırık doğru (açısal); açı yaklaşık 104,5°.", "İki çift, bir çiftten daha çok iter: 109,5° > 107° > 104,5°. Polar; hidrojen bağı yapabilir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 3. Cis–trans ---------- */
const cisTrans: FigureDef = {
  caption:
    "İleri ile çift bağın iki karbonuna ayrı ayrı bak. Cis–trans için her iki karbonda da birbirinden farklı iki grup olmalı. 2-bütende her karbonda bir H ve bir CH₃ var: aynı tarafta (cis) ya da çapraz (trans) dizilebilir. Pi bağı dönmeyi engellediği için ikisi ayrı maddedir. 1-bütende bir karbon iki H taşır; cis–trans yoktur.",
  alt: "İki karbonun çift bağla bağlandığı yapı; her karbona yukarı ve aşağı açılı iki grup bağlı. Adımlarda cis-2-büten, trans-2-büten ve 1-büten gösterilir.",
  steps: ["cis-2-büten", "trans-2-büten", "1-büten"],
  draw: (_v, step) => {
    const c1: V = v(-0.8, 0);
    const c2: V = v(0.8, 0);
    const groups: [string, string, string, string][] = [
      ["CH₃", "H", "CH₃", "H"],
      ["CH₃", "H", "H", "CH₃"],
      ["H", "H", "CH₂CH₃", "H"],
    ];
    const [lu, ld, ru, rd] = groups[step];
    const ends: [V, string][] = [
      [pol(1.5, 120, c1), lu],
      [pol(1.5, 240, c1), ld],
      [pol(1.5, 60, c2), ru],
      [pol(1.5, 300, c2), rd],
    ];
    const els: El[] = [seg(v(-0.8, 0.09), v(0.8, 0.09), { tone: "ink", bold: true }), seg(v(-0.8, -0.09), v(0.8, -0.09), { tone: "ink", bold: true })];
    ends.forEach(([p, label], i) => {
      const from = i < 2 ? c1 : c2;
      const big = label !== "H";
      els.push(seg(from, p, { tone: "ink" }));
      els.push(txt(p, label, i < 2 ? (i === 0 ? "nw" : "sw") : i === 2 ? "ne" : "se", { tone: big ? "a" : "muted", bold: big, small: !big }));
    });
    els.push(ball(c1, 0.16, "ink"), ball(c2, 0.16, "ink"));
    if (step < 2) els.push(seg(v(-2.6, 0), v(2.6, 0), { tone: "muted", dash: true, thin: true }));
    els.push(txt(v(-3.6, 2.2), " ", "c"), txt(v(3.6, -2.2), " ", "c"));
    const rows: [string, string][] = [
      ["cis: iki CH₃ çift bağ ekseninin aynı tarafında. Molekül hafif polar; kaynama noktası trans izomerden biraz yüksek.", "Sol karbon: H ≠ CH₃ · sağ karbon: H ≠ CH₃ → cis–trans mümkün."],
      ["trans: iki CH₃ çapraz. Dipoller büyük ölçüde birbirini götürür; daha simetrik paketlenir.", "cis ↔ trans dönüşümü için pi bağının kırılması gerekir; oda koşulunda kendiliğinden olmaz."],
      ["1-büten: sol karbonda iki H var. Grupları yer değiştirsen de aynı molekül çıkar; cis–trans yoktur.", "Kural: iki karbonun her birinde iki farklı grup. Biri bile aynı ikili taşırsa izomer çıkmaz."],
    ];
    return { els, readout: rows[step] };
  },
};

export const chemistryFiguresAyt2: Record<string, Record<string, FigureDef>> = {
  "faraday-yasalari": { "Elektron molünden ürün molüne geç": faraday },
  "molekul-geometrisi": { "Dört bölge: düzgün dört yüzlü": tetra },
  "ayt-alkenler": { "Cis–trans için önce iki karbonu incele": cisTrans },
};
