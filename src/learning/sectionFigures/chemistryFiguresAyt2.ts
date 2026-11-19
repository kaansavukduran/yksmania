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

/* ---------- 7. Eter: H bağı alıcı / verici ---------- */
const etherHBond: FigureDef = {
  caption:
    "İleri ile üç molekül çiftine bak. Hidrojen bağı için bir tarafta O'ya bağlı H (verici), diğer tarafta elektron çifti taşıyan O (alıcı) gerekir. İki eter arasında verici H yoktur; iki alkol arasında O–H···O kurulur; eter ile su arasında suyun H'si eter oksijenine bağlanır. Bu yüzden dietil eter bütan-1-olden düşük sıcaklıkta kaynar ama suda biraz çözünebilir.",
  alt: "İki molekül yan yana: solda ve sağda O atomları, bağlı gruplar ve H atomları; adımlara göre aralarında kesik H bağı çizgisi ya da çarpı işareti görünür.",
  steps: ["Eter – eter", "Alkol – alkol", "Eter – su"],
  draw: (_v, step) => {
    const els: El[] = [];
    const atom = (p: V, label: string) => {
      const h = label === "H";
      const o = label === "O";
      els.push(ball(p, h ? 0.24 : o ? 0.36 : 0.42, h ? "c" : o ? "warn" : "muted"), txt(p, label, "c", { tone: "ink", small: !o, bold: !h }));
    };
    const bond = (a: V, b: V) => els.push(seg(a, b, { tone: "ink" }));
    const o1 = v(-2.2, 0.6);
    const o2 = v(2.2, 0.6);
    // Left molecule: ether (CH₃–O–CH₃) or alcohol (C₂H₅–O–H with H toward the partner).
    const leftAlcohol = step === 1;
    const l1 = v(-3.3, -0.1);
    const l2 = leftAlcohol ? v(-1.05, 0.6) : v(-1.1, -0.1);
    bond(o1, l1);
    bond(o1, l2);
    atom(l1, leftAlcohol ? "C₂H₅" : "CH₃");
    atom(l2, leftAlcohol ? "H" : "CH₃");
    atom(o1, "O");
    // Right molecule: ether, alcohol or water; a donor H points left when water.
    const r1 = step === 2 ? v(1.05, 0.6) : v(1.1, -0.1);
    const r2 = v(3.3, -0.1);
    bond(o2, r1);
    bond(o2, r2);
    atom(r1, step === 0 ? "CH₃" : step === 1 ? "C₂H₅" : "H");
    atom(r2, step === 0 ? "CH₃" : step === 1 ? "H" : "H");
    atom(o2, "O");
    if (step === 0) {
      els.push(seg(v(-0.6, 0.6), v(0.6, 0.6), { tone: "muted", dash: true, thin: true }));
      els.push(txt(v(0, 0.6), "✕", "c", { tone: "warn", bold: true }));
    } else if (step === 1) {
      els.push(seg(v(-0.8, 0.6), v(1.85, 0.6), { tone: "c", dash: true, bold: true }));
    } else {
      els.push(seg(v(0.8, 0.6), v(-1.85, 0.6), { tone: "c", dash: true, bold: true }));
    }
    els.push(txt(v(-2.2, 1.0), step === 2 ? "eter" : step === 1 ? "alkol" : "eter", "n", { tone: "muted", small: true }));
    els.push(txt(v(2.2, 1.0), step === 2 ? "su" : step === 1 ? "alkol" : "eter", "n", { tone: "muted", small: true }));
    els.push(txt(v(-4.4, 2.0), " ", "c"), txt(v(4.4, -1.4), " ", "c"));
    const rows: [string, string][] = [
      ["CH₃–O–CH₃ iki molekülü: O alıcı olabilir ama hiçbir H oksijene bağlı değil. Verici yok → H bağı yok.", "Kendi aralarında yalnız dipol–dipol ve London; benzer kütleli alkolden düşük kaynama."],
      ["C₂H₅OH iki molekülü: birinin O–H'si diğerinin O'suna H bağı verir.", "Bütan-1-ol (C₄H₁₀O) dietil eterle aynı formül, aynı kütle; H bağı yüzünden daha yüksek kaynar."],
      ["Eter ile su: su verici (O–H), eter O'su alıcı. Eter suyla H bağı kurabilir.", "“Eter H bağı yapmaz” değil, “saf eter kendi arasında H bağı yapmaz” doğrudur. 2025 AYT Fen 27 bu ayrımı sınar."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 8. İki aşamalı verim ---------- */
const twoStage: FigureDef = {
  caption:
    "Sürgüyle ikinci aşamanın verimini değiştir. 1000 kJ girişin ilk aşamada %60'ı elektriğe dönüşür (600 kJ); ikinci aşama bu 600 kJ'yi işler. Toplam verim çarpımdır: 0,60 · η₂. Kaybolan enerji yoktur; hedef iş dışındaki ısı ve ses gibi çıkışlara gider. Yüzdeleri toplamak (60 + 80 = 140) farklı paydaları karıştırır.",
  alt: "Üç yatay çubuk: giriş 1000 kJ, birinci aşama çıkışı 600 kJ ve 400 kJ diğer çıkış, ikinci aşama yararlı çıkışı ve diğer çıkışı; sürgüyle ikinci aşama oranı değişir.",
  param: { label: "İkinci aşama verimi η₂", min: 10, max: 100, step: 5, init: 80, unit: " %" },
  draw: (pct) => {
    const eta2 = pct / 100;
    const W = 6;
    const k = W / 1000;
    const stage1 = 600;
    const useful = stage1 * eta2;
    const els: El[] = [];
    const bar = (y: number, parts: [number, Tone, string][], label: string) => {
      let x = 0;
      for (const [value, tone] of parts) {
        if (value <= 0) continue;
        els.push(poly([v(x, y), v(x + value * k, y), v(x + value * k, y + 0.6), v(x, y + 0.6)], { tone, fill: tone, thin: true }));
        x += value * k;
      }
      els.push(txt(v(0, y + 0.6), label, "ne", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(W, y + 0.3), parts.map(([value, , name]) => `${name} ${fmt(value, 0)}`).join(" + ") + " kJ", "e", { tone: "ink", small: true }));
    };
    bar(2.8, [[1000, "b", "giriş"]], "Giriş (birincil kaynak)");
    bar(1.5, [[stage1, "c", "elektrik"], [400, "muted", "diğer"]], "1. aşama: %60");
    bar(0.2, [[useful, "a", "yararlı"], [stage1 - useful, "muted", "diğer"]], `2. aşama: %${pct} (600 kJ üzerinden)`);
    els.push(txt(v(-0.4, 4.2), " ", "c"), txt(v(W + 5.2, -0.4), " ", "c"));
    return {
      els,
      readout: [
        `Toplam verim = 0,60 · ${fmt(eta2, 2)} = ${fmt(0.6 * eta2, 2)} → %${fmt(60 * eta2, 0)}; yararlı ${fmt(useful, 0)} kJ.`,
        "Birim: 1 kWh = 1000 J/s · 3600 s = 3600 kJ. kW güçtür, kWh enerjidir; 1,5 kW · 4 h = 6 kWh.",
      ],
    };
  },
};

/* ---------- 9. Tollens karışım hesabı ---------- */
const tollensMix: FigureDef = {
  caption:
    "Sürgüyle oluşan gümüş kütlesini değiştir. 30 g propanal–propanon karışımında yalnız aldehit Tollens ayıracını indirger: 1 mol aldehit 2 mol Ag verir. Ag kütlesini mole çevir, ikiye böl, aldehit kütlesini bul; keton kütlesi kalandır. İki maddenin mol kütlesi aynı (58 g/mol) olsa da tepkime davranışı farklıdır.",
  alt: "Üstte 30 g'lık karışım çubuğu aldehit ve keton olarak iki renge bölünür; altta oluşan gümüş miktarı çubuğu. Sürgüyle gümüş kütlesi değiştikçe bölünme yeri kayar.",
  param: { label: "Oluşan Ag", min: 10.8, max: 108, step: 10.8, init: 43.2, unit: " g" },
  draw: (ag) => {
    const nAg = ag / 108;
    const nAld = nAg / 2;
    const mAld = Math.min(30, nAld * 58);
    const mKet = 30 - mAld;
    const W = 6;
    const k = W / 30;
    const els: El[] = [];
    els.push(poly([v(0, 2), v(mAld * k, 2), v(mAld * k, 2.7), v(0, 2.7)], { tone: "c", fill: "c", thin: true }));
    if (mKet > 0.01) els.push(poly([v(mAld * k, 2), v(W, 2), v(W, 2.7), v(mAld * k, 2.7)], { tone: "b", fill: "b", thin: true }));
    els.push(txt(v(0, 2.7), "Karışım 30 g", "ne", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(W, 2.35), `propanal ${fmt(mAld, 1)} g + propanon ${fmt(mKet, 1)} g`, "e", { tone: "ink", small: true }));
    const agW = Math.min(W, (ag / 108) * W);
    els.push(poly([v(0, 0.4), v(agW, 0.4), v(agW, 1.1), v(0, 1.1)], { tone: "muted", fill: "muted", thin: true }));
    els.push(txt(v(0, 1.1), "Ag (gümüş aynası)", "ne", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(W, 0.75), `${fmt(ag, 1)} g = ${fmt(nAg, 2)} mol`, "e", { tone: "ink", small: true }));
    els.push(txt(v(-0.4, 3.6), " ", "c"), txt(v(W + 6, -0.2), " ", "c"));
    const over = nAld * 58 > 30;
    return {
      els,
      readout: [
        `n(Ag) = ${fmt(ag, 1)} g ÷ 108 g/mol = ${fmt(nAg, 2)} mol → n(aldehit) = ${fmt(nAg, 2)} ÷ 2 = ${fmt(nAld, 2)} mol → m = ${fmt(nAld, 2)} · 58 = ${fmt(nAld * 58, 1)} g`,
        over
          ? "Bu kadar Ag 30 g'ı aşan aldehit ister: karışım yalnız aldehitten oluşsa bile mümkün değil; verileri denetle."
          : `Keton tepkimeye girmez: 30 − ${fmt(mAld, 1)} = ${fmt(mKet, 1)} g propanon. 1 : 2 katsayısını unutup Ag molünü doğrudan aldehite yazmak kütleyi iki kat yapar.`,
      ],
    };
  },
};

/* ---------- 10. Esterin iki parçası ---------- */
const esterParts: FigureDef = {
  caption:
    "İleri ile üç esteri ikiye ayır. Karbonil karbonu (C=O) asit tarafındadır ve sayılır; O'nun öbür yanındaki grup alkol tarafıdır. Ad alkol tarafıyla başlar (metil, etil, propil), asit tarafı -oat ile biter. Üçü de C₄H₈O₂ ama farklı bağlantılardır: ester grubunun iki yanı eşdeğer değildir, 1+3 ile 3+1 ayrı esterdir.",
  alt: "Yan yana kutular: solda asit tarafının karbonları ve karbonil karbonu (üstünde =O), ortada ester oksijeni, sağda alkol tarafı. Altında iki tarafın adı ve karbon sayısı.",
  steps: ["Etil etanoat (2 + 2)", "Metil propanoat (3 + 1)", "Propil metanoat (1 + 3)"],
  draw: (_v, step) => {
    const data: { acid: string[]; alcohol: string; acidName: string; alcName: string; nA: number; nB: number; formula: string }[] = [
      { acid: ["CH₃"], alcohol: "CH₂CH₃", acidName: "etanoat", alcName: "etil", nA: 2, nB: 2, formula: "CH₃COOCH₂CH₃" },
      { acid: ["CH₃", "CH₂"], alcohol: "CH₃", acidName: "propanoat", alcName: "metil", nA: 3, nB: 1, formula: "CH₃CH₂COOCH₃" },
      { acid: ["H"], alcohol: "CH₂CH₂CH₃", acidName: "metanoat", alcName: "propil", nA: 1, nB: 3, formula: "HCOOCH₂CH₂CH₃" },
    ];
    const d = data[step];
    const els: El[] = [];
    const box = (x: number, w: number, label: string, tone: Tone) => {
      els.push(poly([v(x, 0), v(x + w, 0), v(x + w, 0.8), v(x, 0.8)], { tone, fill: tone, thin: true }));
      els.push(txt(v(x + w / 2, 0.4), label, "c", { tone: "ink", small: true, bold: true }));
    };
    let x = 0;
    for (const g of d.acid) {
      box(x, 1.0, g, "b");
      x += 1.1;
    }
    const cx = x;
    box(x, 0.8, "C", "b");
    els.push(seg(v(cx + 0.33, 0.8), v(cx + 0.33, 1.4), { tone: "ink" }), seg(v(cx + 0.47, 0.8), v(cx + 0.47, 1.4), { tone: "ink" }), txt(v(cx + 0.4, 1.4), "O", "n", { tone: "ink", small: true, bold: true }));
    x += 0.9;
    box(x, 0.7, "O", "muted");
    x += 0.8;
    const alcW = Math.max(1.2, d.alcohol.length * 0.22);
    box(x, alcW, d.alcohol, "a");
    const end = x + alcW;
    els.push(txt(v(cx / 2 + 0.4, -0.15), `asit tarafı: ${d.acidName} (${d.nA} C)`, "s", { tone: "b", small: true, bold: true }));
    els.push(txt(v(x + alcW / 2, -0.75), `alkol tarafı: ${d.alcName} (${d.nB} C)`, "s", { tone: "a", small: true, bold: true }));
    els.push(txt(v(-0.6, 2.4), " ", "c"), txt(v(Math.max(end, 6.4) + 0.6, -1.9), " ", "c"));
    const rows: [string, string][] = [
      [`${d.formula}: ${d.alcName} ${d.acidName}. Toplam ${d.nA} + ${d.nB} = 4 C, formül C₄H₈O₂.`, "Hidroliz (H⁺): etanoik asit + etanol. NaOH ile: sodyum etanoat + etanol."],
      [`${d.formula}: ${d.alcName} ${d.acidName}. Asit tarafı karbonil dahil 3 C.`, "Propanoik asit + metanol → metil propanoat + su (1 : 1 : 1 : 1, denge)."],
      [`${d.formula}: ${d.alcName} ${d.acidName}. Asit tarafında yalnız karbonil C'si var (H–C=O).`, "Üç C'li alkol O'ya ortadan da bağlanabilir: propan-2-il metanoat. C₄H₈O₂ için toplam 4 ester."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 11. Damla altında yerel pil ve kurban anot ---------- */
const corrosionCell: FigureDef = {
  caption:
    "İleri ile demir yüzeydeki su damlasını izle. Oksijenin az olduğu damla ortası anot olur: Fe → Fe²⁺ + 2e⁻ (metal çukurlaşır). Elektronlar metal içinden oksijenin bol olduğu damla kenarına gider: O₂ + 2H₂O + 4e⁻ → 4OH⁻ (katot). Fe²⁺ ile OH⁻ buluşur, pas oluşur. Demire çinko bağlanınca elektronları çinko verir: çinko kurban anottur, demir katot olarak korunur.",
  alt: "Demir levha kesiti ve üstünde yarım elips su damlası; adımlarda damla ortasında anot, kenarlarda katot, metal içinde elektron okları ve pas bölgesi; son adımda levhaya bağlı çinko blok elektron verir.",
  steps: ["Damla ve iki bölge", "Elektron ve iyon yolu", "Çinko kurban anot"],
  draw: (_v, step) => {
    const els: El[] = [];
    els.push(poly([v(-4, 0), v(4, 0), v(4, -1), v(-4, -1)], { tone: "muted", fill: "muted" }));
    els.push(txt(v(-3.8, -0.5), "Fe", "e", { tone: "ink", small: true, bold: true }));
    const drop: V[] = Array.from({ length: 33 }, (_, i) => {
      const t = Math.PI - (Math.PI * i) / 32;
      return v(2.6 * Math.cos(t), 1.2 * Math.sin(t));
    });
    els.push(poly(drop, { tone: "b", fill: "b", thin: true }));
    if (step < 2) {
      els.push(txt(v(0, 0.35), "anot", "n", { tone: "warn", small: true, bold: true }));
      els.push(txt(v(-2.2, 0.15), "katot", "nw", { tone: "c", small: true, bold: true }), txt(v(2.2, 0.15), "katot", "ne", { tone: "c", small: true, bold: true }));
      els.push(poly([v(-0.5, 0), v(-0.3, -0.25), v(0.3, -0.25), v(0.5, 0)], { tone: "warn", fill: "warn", open: false }));
    }
    if (step === 1) {
      els.push(vec(v(0.2, -0.6), v(1.8, -0.6), { tone: "warn", bold: true }), vec(v(-0.2, -0.6), v(-1.8, -0.6), { tone: "warn", bold: true }));
      els.push(txt(v(1.0, -0.6), "e⁻", "n", { tone: "warn", small: true, bold: true }));
      els.push(txt(v(0, 1.25), "Fe²⁺ + OH⁻ → pas", "n", { tone: "ink", small: true }));
    }
    if (step === 2) {
      els.push(poly([v(4, -0.2), v(5.2, -0.2), v(5.2, -0.9), v(4, -0.9)], { tone: "a", fill: "a" }));
      els.push(txt(v(4.6, -0.55), "Zn", "c", { tone: "ink", small: true, bold: true }));
      els.push(vec(v(4.0, -0.55), v(2.6, -0.55), { tone: "warn", bold: true }), txt(v(3.3, -0.55), "e⁻", "n", { tone: "warn", small: true, bold: true }));
      els.push(txt(v(4.6, -0.9), "kurban anot", "s", { tone: "a", small: true, bold: true }));
      els.push(txt(v(0, 1.25), "demir: katot (korunur)", "n", { tone: "c", small: true, bold: true }));
    }
    els.push(txt(v(-4.6, 2.2), " ", "c"), txt(v(6.2, -1.8), " ", "c"));
    const rows: [string, string][] = [
      ["Damla ortası (az O₂) anot: Fe → Fe²⁺ + 2e⁻. Damla kenarı (çok O₂) katot: O₂ + 2H₂O + 4e⁻ → 4OH⁻.", "Aynı metal yüzeyde küçük anot ve katot alanları kurulur: yerel pil. Paslanan bölge yükseltgenir, indirgenmez."],
      ["Elektronlar metal içinden kenara, iyonlar su içinden hareket eder. Tuzlu su iletkenliği artırır, korozyon hızlanır.", "Pas (demir oksit/oksihidroksit) ilk yarı tepkimenin ürünü değildir; Fe²⁺ sonra yükseltgenip çöker."],
      ["Çinko demirden kolay yükseltgenir: Zn → Zn²⁺ + 2e⁻. Elektronu çinko verdiği için demir katot olur, korunur.", "Kurban anot tükenir; değiştirilmezse koruma biter. Boya ise yalnız su ve O₂ temasını keser (bariyer)."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 12. Kesmeyle toplam yüzey ---------- */
const nanoCut: FigureDef = {
  caption:
    "Sürgüyle her kenarı kaç parçaya böldüğünü seç. 100 nm kenarlı küp k parçaya bölünürse kenar 100/k nm olur; üç boyutta k³ küçük küp çıkar. Toplam hacim aynı kalır, toplam yüzey k katına çıkar, tek küpün A/V oranı (6/a) da k katına çıkar. Parça sayısı (k³), yüzey (k) ve hacim (1) farklı ölçeklenir.",
  alt: "Solda büyük küpün ön yüzü k × k ızgarayla bölünmüş, üst ve yan yüzleri eğik çizgilerle; sağda parça sayısı, toplam yüzey ve hacim çarpanlarını gösteren üç çubuk.",
  param: { label: "Kenar başına parça k", min: 1, max: 5, step: 1, init: 2, unit: "" },
  draw: (k) => {
    const els: El[] = [];
    const S = 3;
    const d = 0.9;
    // Oblique cube: front square, top and side faces.
    els.push(poly([v(0, 0), v(S, 0), v(S, S), v(0, S)], { tone: "c", fill: "c", thin: true }));
    els.push(poly([v(0, S), v(d, S + d), v(S + d, S + d), v(S, S)], { tone: "c", thin: true }));
    els.push(poly([v(S, 0), v(S + d, d), v(S + d, S + d), v(S, S)], { tone: "c", thin: true }));
    for (let i = 1; i < k; i++) {
      const t = (S * i) / k;
      els.push(seg(v(t, 0), v(t, S), { tone: "ink", thin: true }), seg(v(0, t), v(S, t), { tone: "ink", thin: true }));
      els.push(seg(v(t, S), v(t + d, S + d), { tone: "ink", thin: true }), seg(v(S, t), v(S + d, t + d), { tone: "ink", thin: true }));
      const z = (d * i) / k;
      els.push(seg(v(z, S + z), v(S + z, S + z), { tone: "ink", thin: true }), seg(v(S + z, z), v(S + z, S + z), { tone: "ink", thin: true }));
    }
    els.push(txt(v(S / 2, 0), `kenar ${fmt(100 / k, 1)} nm`, "s", { tone: "ink", small: true, bold: true }));
    // Scaling bars (log-free; parts capped visually at 125).
    const bx = S + 2.2;
    const rows: [string, number, number, Tone][] = [
      ["parça sayısı", k ** 3, 125, "a"],
      ["toplam yüzey", k, 5, "c"],
      ["toplam hacim", 1, 5, "b"],
    ];
    rows.forEach(([label, value, max, tone], i) => {
      const y = S - 0.2 - i * 1.25;
      const w = (value / max) * 3.2;
      els.push(poly([v(bx, y - 0.5), v(bx + 3.2, y - 0.5), v(bx + 3.2, y), v(bx, y)], { tone: "muted", thin: true }));
      els.push(poly([v(bx, y - 0.5), v(bx + Math.max(0.05, w), y - 0.5), v(bx + Math.max(0.05, w), y), v(bx, y)], { tone, fill: tone, thin: true }));
      els.push(txt(v(bx, y), label, "ne", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(bx + 3.2, y - 0.25), `× ${value}`, "e", { tone: "ink", small: true }));
    });
    els.push(txt(v(-0.4, S + d + 0.6), " ", "c"), txt(v(bx + 4.6, -0.8), " ", "c"));
    const a = 100 / k;
    return {
      els,
      readout: [
        `k = ${k}: ${k ** 3} küp, kenar ${fmt(a, 1)} nm. Toplam yüzey 6·100² = 60 000 nm² → ${k ** 3} · 6 · ${fmt(a, 1)}² = ${fmt(6 * a * a * k ** 3, 0)} nm² (× ${k}).`,
        `A/V = 6/a = 6/${fmt(a, 1)} = ${fmt(6 / a, 2)} nm⁻¹ (birim: nm² ÷ nm³ = nm⁻¹). Hacim 100³ nm³ sabit. 1 µm = 1000 nm.`,
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
  "ayt-eterler": { "Alıcı ile verici ayrımı": etherHBond },
  "ayt-enerji-kaynaklari-gelismeler": { "Isıl değer ile verim farklıdır": twoStage },
  "ayt-aldehit-keton": { "Karışım ve çökelek hesabı": tollensMix },
  "ayt-esterler": { "Asit ve alkol parçalarını ayırmak": esterParts },
  "korozyon-katodik-koruma": { "Aynı yüzeyde küçük anot ve katot alanları": corrosionCell },
  "ayt-nanoteknoloji-gelismeler": { "Kesmeyle toplam yüzey artışı": nanoCut },
};
