import { ball, circle, fmt, poly, pol, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

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


/* ---------- 4. Eriyik ve sulu NaCl ---------- */
const meltVsAq: FigureDef = {
  caption:
    "İleri ile aynı tuzu iki ortamda elektrolizle. Eriyikte yalnız Na⁺ ve Cl⁻ vardır: katotta sodyum metali, anotta Cl₂. Sulu çözeltide su da elektron alabilir; Na⁺ yerine su indirgenir, katotta H₂ ve OH⁻ oluşur. Derişik NaCl'de anotta yine Cl₂ çıkar. Elektrolizde anot (+), katot (−); olay adları değişmez.",
  alt: "Elektroliz kabı, solda katot sağda anot ve üstte güç kaynağı. Adımlara göre kapta eriyik ya da sulu NaCl; elektrotların yanında oluşan ürünler ve gaz kabarcıkları görünür.",
  steps: ["Eriyik NaCl", "Sulu (derişik) NaCl"],
  draw: (_v, step) => {
    const els: El[] = [];
    els.push(poly([v(0, 3), v(0, 0), v(5, 0), v(5, 3)], { tone: "ink", open: true }));
    els.push(poly([v(0.05, 2.3), v(4.95, 2.3), v(4.95, 0.05), v(0.05, 0.05)], { tone: step ? "b" : "warn", fill: step ? "b" : "warn", bare: true }));
    els.push(poly([v(1.0, 0.4), v(1.4, 0.4), v(1.4, 3.6), v(1.0, 3.6)], { tone: "muted", fill: "muted" }));
    els.push(poly([v(3.6, 0.4), v(4.0, 0.4), v(4.0, 3.6), v(3.6, 3.6)], { tone: "muted", fill: "muted" }));
    els.push(seg(v(1.2, 3.6), v(1.2, 4.4), { tone: "ink" }), seg(v(1.2, 4.4), v(2.2, 4.4), { tone: "ink" }), seg(v(2.8, 4.4), v(3.8, 4.4), { tone: "ink" }), seg(v(3.8, 4.4), v(3.8, 3.6), { tone: "ink" }));
    els.push(seg(v(2.2, 4.05), v(2.2, 4.75), { tone: "ink", bold: true }), seg(v(2.8, 4.2), v(2.8, 4.6), { tone: "ink", bold: true }));
    els.push(txt(v(1.2, 0), "katot (−)", "s", { tone: "ink", small: true }), txt(v(3.8, 0), "anot (+)", "s", { tone: "ink", small: true }));
    // Bubbles at the anode (Cl₂ in both); at the cathode only in water (H₂).
    for (const [x, y] of [[4.2, 0.9], [4.35, 1.4], [4.2, 1.9]]) els.push(circle(v(x, y), 0.09, { tone: "c" }));
    if (step) for (const [x, y] of [[0.75, 0.9], [0.6, 1.4], [0.75, 1.9]]) els.push(circle(v(x, y), 0.09, { tone: "ink" }));
    else els.push(poly([v(1.4, 0.4), v(1.55, 0.4), v(1.55, 1.6), v(1.4, 1.6)], { tone: "muted", fill: "ink" }));
    els.push(txt(v(-0.2, 1.4), step ? "H₂ + OH⁻" : "Na (s)", "w", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(5.2, 1.4), "Cl₂", "e", { tone: "c", small: true, bold: true }));
    els.push(txt(v(2.5, 1.2), step ? "Na⁺ Cl⁻ H₂O" : "Na⁺ Cl⁻", "c", { tone: "ink", small: true }));
    els.push(txt(v(-2.6, 5.2), " ", "c"), txt(v(6.6, -0.9), " ", "c"));
    const rows: [string, string][] = [
      ["Eriyik (yaklaşık 801 °C üstü): katot Na⁺ + e⁻ → Na, anot 2Cl⁻ → Cl₂ + 2e⁻. Ürünler: sodyum metali ve klor gazı.", "Eriyikte su yoktur; yarışan tek katyon Na⁺, tek anyon Cl⁻."],
      ["Sulu: katot 2H₂O + 2e⁻ → H₂ + 2OH⁻ (Na⁺ indirgenmez), anot 2Cl⁻ → Cl₂ + 2e⁻. Katot çevresi bazikleşir.", "Sulu çözeltide aktif metal katyonu (Na⁺, K⁺, Mg²⁺) yerine su indirgenir; ürün koşula bağlıdır."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 5. Alkol sınıfı ve yükseltgenme ---------- */
const alcoholClass: FigureDef = {
  caption:
    "İleri ile OH taşıyan karbonun (sarı) karbon komşularını say. Bir C komşusu birincil, iki ikincil, üç üçüncül alkol demektir. Kontrollü yükseltgenme birincilde aldehit, ikincilde keton verir; üçüncülde o karbonda H kalmadığı için aynı basit dönüşüm olmaz. OH sayısı bu sınıflamayı belirlemez.",
  alt: "Merkezde OH bağlı karbon, çevresinde bir, iki ya da üç karbon atomu ve kalan yerlerde H. Sağda ok ve oluşan ürün sınıfı.",
  steps: ["Birincil: propan-1-ol", "İkincil: propan-2-ol", "Üçüncül: 2-metilpropan-2-ol"],
  draw: (_v, step) => {
    const c: V = v(0, 0);
    const slots: V[] = [pol(1.5, 180), pol(1.5, 270), pol(1.5, 0)];
    const nC = step + 1;
    const els: El[] = [];
    els.push(seg(c, v(0, 1.5), { tone: "ink" }), ball(v(0, 1.5), 0.3, "b"), txt(v(0, 1.5), "OH", "c", { tone: "ink", small: true, bold: true }));
    slots.forEach((p, i) => {
      const carbon = i < nC;
      els.push(seg(c, p, { tone: "ink" }));
      els.push(ball(p, carbon ? 0.48 : 0.24, carbon ? "muted" : "c"), txt(p, carbon ? (i === 0 && step === 0 ? "C₂H₅" : "CH₃") : "H", "c", { tone: "ink", small: true, bold: carbon }));
    });
    els.push(ball(c, 0.34, "warn"), txt(c, "C", "c", { tone: "ink", bold: true }));
    const products = ["aldehit (propanal)", "keton (propanon)", "basit ürün yok"];
    els.push(vec(v(2.3, 0), v(3.6, 0), { tone: step === 2 ? "muted" : "a", bold: true, dash: step === 2 }), txt(v(2.95, 0), "[O]", "n", { tone: "muted", small: true }));
    els.push(txt(v(3.8, 0), products[step], "e", { tone: step === 2 ? "muted" : "a", small: true, bold: true }));
    els.push(txt(v(-2.6, 2.4), " ", "c"), txt(v(7.6, -2.2), " ", "c"));
    const rows: [string, string][] = [
      ["OH karbonunun 1 C komşusu var: birincil. Kontrollü yükseltgenme CH₃CH₂CHO (propanal); ileri yükseltgenme propanoik asit.", "Koşul (kontrollü mü, ileri mi) yazılmadan birincil alkolün son ürünü tekleştirilmez."],
      ["OH karbonunun 2 C komşusu var: ikincil. Ürün CH₃COCH₃ (propanon); keton aynı basit koşulda aside geçmez.", "Propan-1-ol ve propan-2-ol aynı formüllü (C₃H₈O) ama farklı ürün verir: bağlantı önemlidir."],
      ["OH karbonunun 3 C komşusu var: üçüncül. O karbonda H olmadığından kontrollü yükseltgenmede basit karbonil oluşmaz.", "Metanolün OH karbonunda C komşusu yoktur; onu ayrı oku (yükseltgenince metanal)."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 6. Karbonat ve hidrojen karbonat ---------- */
const carbonate: FigureDef = {
  caption:
    "Sürgüyle tek COOH'li asidin molünü değiştir. Her COOH bir OH⁻ (NaOH) tüketir ve fazla NaHCO₃ ile bir CO₂ verir. Karbonat (CO₃²⁻) iki proton ister: 2 RCOOH + CO₃²⁻ → 2 RCOO⁻ + CO₂ + H₂O, yani aynı asitten yarı kadar CO₂ çıkar. İki COOH'li asitte bütün değerler iki katına çıkar.",
  alt: "Üç yatay çubuk: tüketilen NaOH, NaHCO₃ ile oluşan CO₂ ve Na₂CO₃ ile oluşan CO₂; sürgüyle uzunlukları değişir, karbonat çubuğu diğerlerinin yarısıdır.",
  param: { label: "Asit (tek COOH)", min: 0.1, max: 1, step: 0.1, init: 0.4, unit: " mol" },
  draw: (n) => {
    const rows: [string, number, Tone][] = [
      ["NaOH tüketimi", n, "b"],
      ["CO₂ (NaHCO₃ fazla)", n, "c"],
      ["CO₂ (Na₂CO₃ fazla)", n / 2, "a"],
    ];
    const W = 5;
    const els: El[] = [];
    rows.forEach(([label, value, tone], i) => {
      const y = 2.4 - i * 1.1;
      els.push(poly([v(0, y), v(W, y), v(W, y + 0.55), v(0, y + 0.55)], { tone: "muted", thin: true }));
      els.push(poly([v(0, y), v(W * value, y), v(W * value, y + 0.55), v(0, y + 0.55)], { tone, fill: tone, thin: true }));
      els.push(txt(v(0, y + 0.55), label, "ne", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(W, y + 0.275), `${fmt(value, 2)} mol`, "e", { tone: "ink", small: true }));
    });
    els.push(txt(v(-0.4, 3.9), " ", "c"), txt(v(W + 2.2, -0.4), " ", "c"));
    return {
      els,
      readout: [
        `${fmt(n, 1)} mol RCOOH → ${fmt(n, 1)} mol NaOH; NaHCO₃ ile ${fmt(n, 1)} mol CO₂; Na₂CO₃ ile ${fmt(n / 2, 2)} mol CO₂.`,
        "Kural: bir COOH = bir H⁺. HCO₃⁻ bir H⁺, CO₃²⁻ iki H⁺ alıp CO₂ verir. İki COOH'li asitte (HOOC–CH₂–COOH) her değer iki katıdır.",
      ],
    };
  },
};

export const chemistryFiguresAyt2: Record<string, Record<string, FigureDef>> = {
  "faraday-yasalari": { "Elektron molünden ürün molüne geç": faraday },
  "molekul-geometrisi": { "Dört bölge: düzgün dört yüzlü": tetra },
  "ayt-alkenler": { "Cis–trans için önce iki karbonu incele": cisTrans },
  elektroliz: { "Eriyik NaCl ile sulu NaCl aynı değildir": meltVsAq },
  "ayt-alkol-eldesi-tepkimeleri": { "Sekonder alkolün yükseltgenmesi": alcoholClass },
  "ayt-karboksilik-asitler": { "Karbonat ve hidrojen karbonat": carbonate },
};
