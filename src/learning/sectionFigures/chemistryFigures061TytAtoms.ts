import { ball, circle, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { pad, rect } from "./biologyFigures059Kit";
import { table } from "./biologyFigures059TytKit";
import { hbars, sb, sci } from "./chemistryFigures060Kit";
import { nf } from "./physicsFigures058Kit";
import { pickRows } from "./historyFigures061TytKit";

/*
 * TYT Kimya · Periyodik sistem ve iyonlar, kimyanın sembolik dili, gerçek
 * kütle–akb–normal koşul, zayıf etkileşimler (Forge061). Sayılar bölüm
 * metinlerindendir: Na⁺ Z = 11, e = 10; Al 2,8,3; 10 elektronlu O²⁻…Mg²⁺
 * dizisi; Ca(OH)₂ 5 atom, (NH₄)₂SO₄ 15 atom; 1 u ≈ 1,6605 × 10⁻²⁴ g,
 * Nₐ ≈ 6,02 × 10²³, NK 0 °C ve 1 atm, 22,4 L/mol; 11,2 L He ≈ 2 g ve O₂ ≈ 16 g.
 * İlk 20 elementin sembolleri sembolik dil bölümündeki tablodandır.
 * Katman modeli yalnız ilk 20 elementin nötr temel hâli içindir.
 */

const SYM = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca"];

/** İlk 20 element için okul katman düzeni (2, 8, 8, 2). */
export function shells(z: number): number[] {
  const caps = [2, 8, 8, 2];
  const out: number[] = [];
  let left = z;
  for (const c of caps) {
    if (left <= 0) break;
    out.push(Math.min(c, left));
    left -= c;
  }
  return out;
}
/** Nötr atomun periyodu ve grubu (yalnız Z ≤ 20). */
export function address(z: number): { period: number; group: number } {
  const s = shells(z);
  const last = s[s.length - 1];
  const group = z === 2 ? 18 : last <= 2 ? last : last + 10;
  return { period: s.length, group };
}

/* ---------------- Periyodik sistem ---------------- */

const CELL = 0.6;
const hasCell = (p: number, g: number) => (p === 1 ? g === 1 || g === 18 : p <= 3 ? g <= 2 || g >= 13 : true);
const tableShape: FigureDef = {
  caption:
    "Modern periyodik tabloda elementler artan atom numarasına (Z) göre sıralanır: 7 yatay periyot, 18 düşey grup. Altta ayrı çizilen lantanitler ve aktinitler fazladan 8. ve 9. periyot değildir; 6. ve 7. periyodun parçalarıdır. Şema yalnız biçimi gösterir, element kutuları ölçekli değil.",
  alt: "Periyodik tablonun boş kutu şeması: solda 1–7 periyot numaraları, üstte 1, 2, 13 ve 18 grup numaraları. 1. periyotta yalnız iki kutu, 2. ve 3. periyotta 8 kutu, 4–7. periyotlarda 18 kutu. Altta iki ayrı satır: lantanitler ve aktinitler; ikinci adımda kesik oklar bu satırları 6. ve 7. periyodun 3. grup konumuna bağlar.",
  steps: ["7 periyot, 18 grup", "Alttaki iki satır"],
  draw: (_v, step) => {
    const els: El[] = [];
    const X = (g: number) => (g - 1) * CELL;
    const Y = (p: number) => -(p - 1) * CELL;
    for (let p = 1; p <= 7; p++)
      for (let g = 1; g <= 18; g++) {
        if (!hasCell(p, g)) continue;
        const f = step === 1 && g === 3 && p >= 6;
        els.push(rect(X(g), Y(p) - CELL, X(g) + CELL, Y(p), { tone: f ? "a" : "muted", fill: f ? "a" : p % 2 ? "b" : "c", thin: true }));
      }
    for (const p of [1, 3, 5, 7]) els.push(txt(v(-0.15, Y(p) - CELL / 2), String(p), "w", { small: true, tone: "muted" }));
    for (const g of [1, 2, 13, 18]) els.push(txt(v(X(g) + CELL / 2, 0.12), String(g), "n", { small: true, tone: "muted" }));
    const fy = [Y(8) - 0.5, Y(9) - 0.5];
    fy.forEach((y, k) => {
      for (let i = 0; i < 14; i++) els.push(rect(X(4) + i * CELL, y - CELL, X(4) + (i + 1) * CELL, y, { tone: step === 1 ? "a" : "muted", fill: step === 1 ? "a" : undefined, thin: true }));
      els.push(txt(v(X(4) - 0.15, y - CELL / 2), k ? "aktinitler" : "lantanitler", "w", { small: true, tone: step === 1 ? "a" : "muted" }));
    });
    if (step === 1) {
      els.push(vec(v(X(4) + 0.1, fy[0] - 0.05), v(X(3) + CELL / 2, Y(6) - CELL - 0.06), { tone: "a", thin: true, dash: true }));
      els.push(vec(v(X(4) + 0.1, fy[1] - 0.05), v(X(3) + CELL / 2 - 0.12, Y(7) - CELL - 0.06), { tone: "a", thin: true, dash: true }));
    }
    els.push(...pad(v(-2.4, 0.9), v(18 * CELL + 0.1, fy[1] - CELL - 0.2)));
    return {
      els,
      readout: step ? ["Lantanitler 6. periyodun, aktinitler 7. periyodun parçasıdır.", "Tablo adresi Z ile belirlenir; izotopların adresi değişmez."] : ["7 periyot × 18 grup; sıralama artan Z'ye göredir.", "Aynı gruptaki elementler benzer olabilir; 'aynıdır' denmez."],
    };
  },
};

const COLS = [1, 2, 13, 14, 15, 16, 17, 18];
const first20: FigureDef = {
  caption:
    "İlk 20 elementin nötr temel hâlinde dolu katman sayısı periyodu, ana gruplarda son katmandaki elektron sayısı grubu verir: 1 → 1. grup, 2 → 2. grup, 3…8 → 13…18. grup. He iki elektronlu ama 18. gruptadır. Sürgüyle Z'yi değiştir; katman düzeni ve tablo adresi aynı hesaptan gelir.",
  alt: "Solda ilk dört periyodun 8 sütunlu kısaltılmış tablosu (gruplar 1, 2, 13–18) ve sembolleri; seçilen element vurgulu. Sağda çekirdek ve katman halkaları, halkalarda elektron noktaları.",
  param: { label: "Atom numarası Z", min: 1, max: 20, step: 1, init: 13, plain: true },
  draw: (zRaw) => {
    const z = Math.round(zRaw);
    const els: El[] = [];
    const W = 1.1;
    for (let n = 1; n <= 20; n++) {
      const { period, group } = address(n);
      const col = COLS.indexOf(group);
      const x = col * W;
      const y = -(period - 1) * W;
      const on = n === z;
      els.push(rect(x, y - W, x + W, y, { tone: on ? "a" : "muted", fill: on ? "a" : period % 2 ? "b" : "c", thin: !on, bold: on }));
      els.push(txt(v(x + W / 2, y - W / 2), SYM[n - 1], "c", { small: true, bold: on, tone: "ink" }));
    }
    COLS.forEach((g, i) => els.push(txt(v(i * W + W / 2, 0.1), String(g), "n", { small: true, tone: "muted" })));
    for (let p = 1; p <= 4; p++) els.push(txt(v(-0.12, -(p - 1) * W - W / 2), String(p), "w", { small: true, tone: "muted" }));
    const s = shells(z);
    const C: V = v(11.6, -2.1);
    els.push(ball(C, 0.32, "warn", `+${z}`));
    s.forEach((n, k) => {
      const r = 0.55 + k * 0.38;
      els.push(circle(C, r, { tone: "muted", thin: true }));
      for (let i = 0; i < n; i++) {
        const a = (2 * Math.PI * i) / n + k * 0.4;
        els.push(circle(v(C[0] + r * Math.cos(a), C[1] + r * Math.sin(a)), 0.06, { tone: "b", fill: "b" }));
      }
    });
    els.push(...pad(v(-0.5, 0.75), v(13.6, -4.6)));
    const { period, group } = address(z);
    const last = s[s.length - 1];
    return {
      els,
      readout: [
        `Z = ${z} (${SYM[z - 1]}): ${s.join(",")} → ${s.length} katman: ${period}. periyot; son katmanda ${last} elektron: ${group}. grup.`,
        z === 2 ? "He dolu ilk katmanı ve kimyasal davranışıyla 18. gruptadır; 2. gruba konmaz." : z === 1 ? "H 1. grupta yer alır ama alkali metal değildir." : "İyonun katman sayısı periyot değildir: Mg²⁺ 2,8 olsa da Mg 3. periyottadır.",
      ],
    };
  },
};

const ISO: { s: string; z: number }[] = [
  { s: "O²⁻", z: 8 },
  { s: "F⁻", z: 9 },
  { s: "Ne", z: 10 },
  { s: "Na⁺", z: 11 },
  { s: "Mg²⁺", z: 12 },
];
const isoelectronic: FigureDef = {
  caption:
    "O²⁻, F⁻, Ne, Na⁺ ve Mg²⁺ türlerinin hepsi 10 elektronludur; dizide proton sayısı 8'den 12'ye arttıkça aynı elektronlar daha güçlü çekilir ve yarıçap küçülür. Daire boyları yalnız sıralamayı gösterir, ölçekli değil. Farklı sayıda katmanı olan türler bu tek kuralla sıralanmaz.",
  alt: "Soldan sağa küçülen beş daire: O²⁻, F⁻, Ne, Na⁺, Mg²⁺. Her dairenin altında Z (8, 9, 10, 11, 12) ve e = 10 yazılı. Altta sağa doğru 'proton sayısı artar, yarıçap küçülür' oku.",
  draw: () => {
    const els: El[] = [];
    ISO.forEach((t, i) => {
      const x = 1.2 + i * 2.4;
      const r = 1.05 - i * 0.13;
      els.push(circle(v(x, 2.2), r, { tone: "b", fill: "b" }));
      els.push(txt(v(x, 2.2), t.s, "c", { bold: true }));
      els.push(txt(v(x, 0.95), `Z = ${t.z}`, "c", { small: true }), txt(v(x, 0.2), "e = 10", "c", { small: true, tone: "muted" }));
    });
    els.push(vec(v(0.6, -0.4), v(11.0, -0.4), { tone: "a", thin: true }), txt(v(5.8, -0.55), "proton sayısı artar, yarıçap küçülür", "s", { small: true, tone: "a" }));
    els.push(...pad(v(-0.1, 3.5), v(12.0, -1.3)));
    return { els, readout: ["Katyon elektron vererek genellikle küçülür, anyon elektron alarak büyür.", "Grupta aşağı yeni katman eklenir, yarıçap büyür; periyotta sağa genellikle küçülür."] };
  },
};

const trends: FigureDef = {
  caption:
    "Birinci iyonlaşma enerjisi genellikle periyotta sağa doğru artar, grupta aşağı doğru azalır; Be–B ve N–O gibi istisnalar vardır. Elektronegatiflik bağdaki ortak elektronları çekme eğilimidir, F en yüksektir. Ok şeması eğilimdir; bütün ikili karşılaştırmaların ispatı değildir.",
  alt: "Ana grup tablosunun kutu şeması (8 sütun, 4 satır). Altında sağa 'periyotta sağa: genellikle artar' oku, solunda yukarı doğru 'grupta yukarı: artar' oku. 2. periyotta Be–B ve N–O kutu çiftleri 'istisna' diye işaretli.",
  draw: () => {
    const els: El[] = [];
    const W = 1.1;
    const X0 = 2.6;
    for (let p = 1; p <= 4; p++)
      COLS.forEach((g, i) => {
        if (p === 1 && g !== 1 && g !== 18) return;
        const x = X0 + i * W;
        const y = 4.4 - (p - 1) * W;
        const exc = p === 2 && (g === 2 || g === 13 || g === 15 || g === 16);
        els.push(rect(x, y - W, x + W, y, { tone: exc ? "warn" : "muted", fill: exc ? "warn" : undefined, thin: true }));
      });
    const sym2 = ["Li", "Be", "B", "C", "N", "O", "F", "Ne"];
    sym2.forEach((s, i) => els.push(txt(v(X0 + i * W + W / 2, 4.4 - W - W / 2), s, "c", { small: true, bold: true })));
    els.push(vec(v(X0, -0.2), v(X0 + 8 * W, -0.2), { tone: "a" }), txt(v(X0 + 4 * W, -0.35), "periyotta sağa: genellikle artar", "s", { small: true, tone: "a" }));
    els.push(vec(v(X0 - 0.4, 0.0), v(X0 - 0.4, 4.4), { tone: "a" }), txt(v(X0 - 0.55, 2.6), "grupta", "w", { small: true, tone: "a" }), txt(v(X0 - 0.55, 2.0), "yukarı", "w", { small: true, tone: "a" }));
    els.push(txt(v(X0 + 4 * W, -1.1), "istisna (dolu kutular): Be–B, N–O", "s", { small: true, tone: "warn" }));
    els.push(...pad(v(0.2, 4.8), v(11.8, -1.9)));
    return { els, readout: ["Ardışık iyonlaşmada enerji artar; büyük sıçrama değerlik elektronları hakkında bilgi verebilir.", "Elektron ilgisi ve elektronegatiflik farklı kavramlardır; 'sağa hep artar' koşulsuz uygulanmaz."] };
  },
};

/* ---------------- Sembolik dil ---------------- */

type Count = Map<string, number>;
/** Basit formül sayacı: katsayı, parantez ve alt indis (ör. "2(NH4)2SO4"). */
export function countAtoms(f: string): { coef: number; atoms: Count } {
  const m = /^(\d*)(.*)$/.exec(f) as RegExpExecArray;
  const coef = m[1] ? Number(m[1]) : 1;
  const stack: Count[] = [new Map()];
  const s = m[2];
  let i = 0;
  const num = () => {
    let d = "";
    while (i < s.length && /\d/.test(s[i])) d += s[i++];
    return d ? Number(d) : 1;
  };
  while (i < s.length) {
    const ch = s[i];
    if (ch === "(") {
      stack.push(new Map());
      i++;
    } else if (ch === ")") {
      i++;
      const k = num();
      const inner = stack.pop() as Count;
      const top = stack[stack.length - 1];
      for (const [e, n] of inner) top.set(e, (top.get(e) ?? 0) + n * k);
    } else {
      let e = s[i++];
      while (i < s.length && /[a-z]/.test(s[i])) e += s[i++];
      const k = num();
      const top = stack[stack.length - 1];
      top.set(e, (top.get(e) ?? 0) + k);
    }
  }
  const atoms: Count = new Map();
  for (const [e, n] of stack[0]) atoms.set(e, n * coef);
  return { coef, atoms };
}
const pretty = (f: string) => f.replace(/(?<=[A-Za-z)])(\d+)/g, (d) => sb(d));
const FORMULAS = ["H2O", "3H2O", "Ca(OH)2", "(NH4)2SO4", "2(NH4)2SO4"];
const TONES: Record<string, Tone> = { H: "b", O: "warn", Ca: "c", N: "a", S: "muted" };
const formulaCount: FigureDef = {
  caption:
    "Alt indis hemen önündeki sembole, parantezden sonraki indis parantezin içindeki her atoma, baştaki katsayı bütün formüle uygulanır. Ca(OH)₂: 5 atom, 3 tür; 3H₂O: 9 atom, 2 tür; (NH₄)₂SO₄: 15 atom, 4 tür. Katsayı atom sayılarını katlar, element türü sayısını değiştirmez. Çubuklar formülden sayılarak çizilir.",
  alt: "Üstte seçilen formül büyük yazılı. Altında her element için yatay çubuk ve atom sayısı. Adımlar: H₂O, 3H₂O, Ca(OH)₂, (NH₄)₂SO₄, 2(NH₄)₂SO₄.",
  steps: FORMULAS.map(pretty),
  draw: (_v, step) => {
    const f = FORMULAS[step];
    const { atoms } = countAtoms(f);
    const rows = [...atoms].map(([e, n]) => ({ label: e, value: n, tone: TONES[e] ?? "b", text: String(n) }));
    const total = [...atoms.values()].reduce((a, b) => a + b, 0);
    const els: El[] = [txt(v(6, 4.3), pretty(f), "c", { bold: true }), ...hbars(rows, { x0: 2.4, y0: 3.2, w: 7.6, max: 16, digits: 0 }), ...pad(v(0.6, 4.9), v(12.0, 3.2 - 4 * 0.85))];
    return { els, readout: [`${pretty(f)}: ${[...atoms].map(([e, n]) => `${e} = ${n}`).join(", ")}; toplam ${total} atom, ${atoms.size} element türü.`, "3H₂O ile H₂O₃ aynı gösterim değildir; alt indisi değiştirmek maddenin kimliğini değiştirir."] };
  },
};

const READS: { f: string; parts: [string, string][]; note: string }[] = [
  { f: "Co", parts: [["Co", "kobalt"]], note: "Co tek bir elementin sembolüdür: ilk harf büyük, ikinci küçük." },
  { f: "CO", parts: [["C", "karbon"], ["O", "oksijen"]], note: "CO iki büyük harf: karbon ve oksijen içeren karbonmonoksit." },
  { f: "CaCO₃", parts: [["Ca", "kalsiyum"], ["C", "karbon"], ["O₃", "3 oksijen"]], note: "Büyük harf yeni sembolün başlangıcıdır: Ca–C–O, C–a–C–O değil." },
];
const symbolRead: FigureDef = {
  caption:
    "Sembolde ilk harf büyük, varsa ikinci harf küçüktür; formülde her büyük harf yeni bir sembol başlatır. Co kobalttır, CO karbon ve oksijenden oluşan karbonmonoksittir; CaCO₃ Ca–C–O olarak ayrılır. Harfin büyük ya da küçük yazılması başka bir maddeye geçmek demek olabilir.",
  alt: "Adımlarla bir formül harf harf kutulara ayrılır: Co tek kutu (kobalt); CO iki kutu (karbon, oksijen); CaCO₃ üç kutu (kalsiyum, karbon, 3 oksijen). Her kutunun altında elementin adı.",
  steps: READS.map((r) => r.f),
  draw: (_v, step) => {
    const r = READS[step];
    const els: El[] = [txt(v(6, 3.6), r.f, "c", { bold: true })];
    const w = 2.8;
    const x0 = 6 - (r.parts.length * (w + 0.4) - 0.4) / 2;
    r.parts.forEach(([s, name], i) => {
      const x = x0 + i * (w + 0.4);
      els.push(rect(x, 1.4, x + w, 2.6, { tone: "b", fill: "b", thin: true }), txt(v(x + w / 2, 2.0), s, "c", { bold: true }), txt(v(x + w / 2, 1.2), name, "s", { small: true, tone: "muted" }));
    });
    els.push(...pad(v(0.6, 4.2), v(11.4, 0.4)));
    return { els, readout: [r.note, "İki harfli sembol iki element veya iki atom anlamına gelmez."] };
  },
};

function water(els: El[], o: V, s = 1) {
  els.push(ball(v(o[0] - 0.42 * s, o[1] - 0.3 * s), 0.2 * s, "b", "H"), ball(v(o[0] + 0.42 * s, o[1] - 0.3 * s), 0.2 * s, "b", "H"), ball(o, 0.3 * s, "warn", "O"));
}
const species: FigureDef = {
  caption:
    "Molekül ayrı bir taneciktir; element ya da bileşik olmak ise içindeki element türü sayısına bağlıdır. O₂ molekül ama element, H₂O molekül ve bileşik, He tek atomlu element, NaCl katısı ise molekül değil iyonlardan oluşan örgüdür (formül birimi 1:1). 'Bütün bileşikler moleküldür' yanlıştır.",
  alt: "İki satır iki sütunlu tablo. Sütunlar: element, bileşik. Üst satır 'molekül': O₂ (iki aynı top) ve H₂O (bir O iki H). Alt satır 'molekül değil': He (tek top) ve NaCl örgüsü (dönüşümlü Na⁺ ve Cl⁻ topları).",
  draw: () => {
    const els: El[] = [];
    els.push(txt(v(4.6, 5.2), "element", "c", { small: true, bold: true }), txt(v(9.4, 5.2), "bileşik", "c", { small: true, bold: true }));
    els.push(txt(v(1.9, 3.7), "molekül", "w", { small: true, bold: true }), txt(v(1.9, 1.3), "molekül değil", "w", { small: true, bold: true }));
    els.push(rect(2.2, 2.55, 7.0, 4.85, { tone: "muted", thin: true }), rect(7.0, 2.55, 11.8, 4.85, { tone: "muted", thin: true }), rect(2.2, 0.15, 7.0, 2.45, { tone: "muted", thin: true }), rect(7.0, 0.15, 11.8, 2.45, { tone: "muted", thin: true }));
    els.push(ball(v(4.3, 3.85), 0.3, "warn", "O"), ball(v(4.9, 3.85), 0.3, "warn", "O"), txt(v(4.6, 2.95), "O₂", "c", { small: true }));
    water(els, v(9.4, 4.05));
    els.push(txt(v(9.4, 2.95), "H₂O", "c", { small: true }));
    els.push(ball(v(4.6, 1.5), 0.3, "c", "He"), txt(v(4.6, 0.6), "He", "c", { small: true }));
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 2; j++) {
        const na = (i + j) % 2 === 0;
        els.push(ball(v(8.3 + i * 0.6, 1.25 + j * 0.6), na ? 0.2 : 0.27, na ? "a" : "c", na ? "+" : "−"));
      }
    els.push(txt(v(9.4, 0.4), "NaCl örgüsü", "c", { small: true }));
    els.push(...pad(v(-0.6, 5.6), v(12.0, -0.1)));
    return { els, readout: ["+ Na⁺, − Cl⁻: örgüde ayrı NaCl molekülü yoktur.", "He örneği: her element molekül hâlinde bulunmaz."] };
  },
};

/* ---------------- Gerçek kütle, akb, NK ---------------- */

const NA = 6.02e23;
const avogadro: FigureDef = {
  caption:
    "N = n·Nₐ bağıntısında önce sayılan varlığı adlandır: n mol O₂ örneğinde n mol molekül, 2n mol O atomu vardır. Kütle mol kütlesiyle (O₂ için 32 g/mol), tanecik sayısı Nₐ ≈ 6,02 × 10²³ ile bulunur. Sürgü miktarı değiştirir; her kutu aynı n'den hesaplanır.",
  alt: "Soldan sağa dört kutu oklarla bağlı: kütle (g), mol O₂, molekül sayısı, O atomu sayısı. Oklarda '÷ 32 g/mol', '× Nₐ', '× 2' yazılı. Kutulardaki değerler sürgüdeki mol miktarına göre değişir.",
  param: { label: "O₂ miktarı (mol)", min: 0.5, max: 3, step: 0.5, init: 1 },
  draw: (n) => {
    const els: El[] = [];
    const boxes: [string, string][] = [
      ["kütle", `${nf(32 * n, 1)} g`],
      ["O₂ miktarı", `${nf(n, 1)} mol`],
      ["molekül", sci(n * NA, 2)],
      ["O atomu", sci(2 * n * NA, 2)],
    ];
    const pos: V[] = [v(2.5, 3.2), v(9.5, 3.2), v(9.5, 0.6), v(2.5, 0.6)];
    boxes.forEach(([a, b], i) => {
      const [x, y] = pos[i];
      els.push(rect(x - 2.1, y - 0.75, x + 2.1, y + 0.75, { tone: i === 1 ? "a" : "b", fill: i === 1 ? "a" : "b", thin: true }), txt(v(x, y + 0.3), a, "c", { small: true, tone: "muted" }), txt(v(x, y - 0.3), b, "c", { small: true, bold: true }));
    });
    els.push(vec(v(4.7, 3.2), v(7.3, 3.2), { thin: true }), txt(v(6, 3.3), "÷ 32 g/mol", "n", { small: true, tone: "a" }));
    els.push(vec(v(9.5, 2.35), v(9.5, 1.45), { thin: true }), txt(v(9.65, 1.9), "× Nₐ", "e", { small: true, tone: "a" }));
    els.push(vec(v(7.3, 0.6), v(4.7, 0.6), { thin: true }), txt(v(6, 0.7), "× 2", "n", { small: true, tone: "a" }));
    els.push(...pad(v(0.2, 4.3), v(11.8, -0.4)));
    return { els, readout: [`${nf(n, 1)} mol O₂ = ${nf(32 * n, 1)} g; ${sci(n * NA, 2)} molekül; ${sci(2 * n * NA, 2)} O atomu.`, `Tek molekülün kütlesi M/Nₐ = 32 / 6,02×10²³ ≈ ${sci(32 / NA, 2)} g; n ile çarpılmadıkça örneğin kütlesi değildir.`] };
  },
};

const PRESS = [1, 2];
const molarVolume: FigureDef = {
  caption:
    "NK etiketi 0 °C ve 1 atm verisinin kısaltmasıdır; ideal gaz yaklaşımıyla molar hacim yaklaşık 22,4 L/mol olur. Sıcaklığı kelvine çevirip oranla: sabit basınçta ısıtınca hacim büyür, basınç iki katına çıkınca sabit sıcaklıkta hacim yarıya iner. Madde miktarı 1 mol olarak sabit kalır.",
  alt: "1 mol ideal gazın hacmini gösteren düşey çubuk; yanında 0 °C ve 1 atm'deki 22,4 L için kesik referans çizgisi. Sürgü sıcaklığı, adımlar basıncı (1 ve 2 atm) değiştirir; çubuk boyu ve yazılı hacim aynı hesaptan gelir.",
  param: { label: "Sıcaklık (°C)", min: 0, max: 100, step: 10, init: 0 },
  steps: PRESS.map((p) => `${p} atm`),
  draw: (t, step) => {
    const P = PRESS[step];
    const T = t + 273;
    const V = (22.4 * T) / 273 / P;
    const k = 0.13;
    const els: El[] = [
      seg(v(3.0, 0), v(9.0, 0), { tone: "muted" }),
      rect(5.2, 0, 6.8, V * k, { tone: "b", fill: "b", thin: true }),
      seg(v(4.4, 22.4 * k), v(7.6, 22.4 * k), { tone: "muted", dash: true, thin: true }),
      txt(v(7.7, 22.4 * k), "22,4 L (NK)", "e", { small: true, tone: "muted" }),
      txt(v(6.0, V * k + 0.12), `${nf(V, 1)} L`, "n", { small: true, bold: true }),
      txt(v(6.0, -0.15), `1 mol · ${nf(t, 0)} °C · ${P} atm`, "s", { small: true }),
      ...pad(v(2.8, 4.6), v(10.6, -0.9)),
    ];
    return { els, readout: [`V = 22,4 × (${nf(T, 0)} / 273) ÷ ${P} = ${nf(V, 2)} L.`, "22,4 L/mol bütün koşullar için doğa sabiti değildir."] };
  },
};

const equalVolume: FigureDef = {
  caption:
    "Aynı sıcaklık ve basınçta eşit hacimdeki ideal gazlar eşit mol tanecik içerir: NK'de 11,2 L He de O₂ de 0,5 mol'dür. Fakat He tek atomlu, O₂ iki atomludur ve kütleler mol kütlesiyle orantılıdır: He ≈ 2 g, O₂ ≈ 16 g. Kaplardaki tanecik sayısı eşittir, ölçekli değil.",
  alt: "Yan yana iki eşit kap, ikisinde de 11,2 L yazılı. Solda tek toplardan altı He taneciği, sağda çift toplardan altı O₂ taneciği. Altlarında 0,5 mol; He 2 g, O₂ 16 g; atom miktarı 0,5 ve 1 mol.",
  draw: () => {
    const els: El[] = [];
    const pts: V[] = [v(0.8, 2.6), v(2.0, 3.1), v(3.0, 2.3), v(1.2, 1.4), v(2.4, 1.6), v(3.2, 3.3)];
    [0, 6.4].forEach((x0, k) => {
      els.push(rect(x0, 0.8, x0 + 4.2, 3.9, { tone: "muted", thin: true }));
      for (const p of pts) {
        if (k === 0) els.push(ball(v(x0 + p[0], p[1]), 0.18, "c"));
        else els.push(ball(v(x0 + p[0] - 0.17, p[1]), 0.17, "warn"), ball(v(x0 + p[0] + 0.17, p[1]), 0.17, "warn"));
      }
      els.push(txt(v(x0 + 2.1, 4.05), k ? "O₂ · 11,2 L" : "He · 11,2 L", "n", { small: true, bold: true }));
      els.push(txt(v(x0 + 2.1, 0.6), "0,5 mol tanecik", "s", { small: true }));
      els.push(txt(v(x0 + 2.1, 0.0), k ? "0,5 × 32 = 16 g" : "0,5 × 4 = 2 g", "s", { small: true, bold: true, tone: "a" }));
    });
    els.push(...pad(v(-0.2, 4.8), v(10.8, -0.8)));
    return { els, readout: ["Eşit hacim (aynı T ve P) → eşit mol tanecik; eşit kütle değil.", "Atom miktarı: He 0,5 mol, O₂ 2 × 0,5 = 1 mol."] };
  },
};

/* ---------------- Zayıf etkileşimler ---------------- */

const PAIRS: [string, string, string][] = [
  ["Na⁺ ··· Cl⁻", "iki iyon", "iyon–iyon"],
  ["Na⁺ ··· H₂O", "iyon + polar", "iyon–dipol"],
  ["HCl ··· HCl", "polar + polar", "dipol–dipol"],
  ["H₂O ··· H₂O", "O–H verici", "hidrojen bağı"],
  ["H₂O ··· O₂", "polar + apolar", "dipol–indük. dipol"],
  ["Na⁺ ··· Ar", "iyon + apolar", "iyon–indük. dipol"],
  ["Cl₂ ··· Cl₂", "apolar + apolar", "London"],
];
const pairTable: FigureDef = {
  caption:
    "Etkileşimi adlandırmadan önce iki taneciği yaz. Ad, çiftin kaynağına göre değişir: iki iyon iyon–iyon, iyon ile polar molekül iyon–dipol, iki polar molekül dipol–dipol, verici ve alıcı koşulu sağlanmışsa hidrojen bağı, kalıcı kaynak ile apolar komşu indüklenmiş dipol, iki apolar London. Bir satıra tıkla.",
  alt: "Yedi satırlık tablo: çift, kaynak, ad. Na⁺···Cl⁻ iyon–iyon; Na⁺···H₂O iyon–dipol; HCl···HCl dipol–dipol; H₂O···H₂O hidrojen bağı; H₂O···O₂ dipol–indüklenmiş dipol; Na⁺···Ar iyon–indüklenmiş dipol; Cl₂···Cl₂ London.",
  picks: PAIRS.map(([p, k, n]) => ({ label: p, title: `${p}: ${n}`, detail: [`Çift: ${p}; kaynak: ${k}; ad: ${n.replace("indük.", "indüklenmiş")}.`] })),
  maxHeight: 520,
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [...pickRows(table(["çift", "kaynak", "ad"], PAIRS.map((r) => [...r]), [3.6, 3.8, 4.6], { top: 7.2, rowH: 0.9, on: (r) => r === pick }), PAIRS.map((r) => r[0])), ...pad(v(-0.1, 7.4), v(12.1, -0.1))];
    const sel = pick >= 0 ? PAIRS[pick] : undefined;
    return { els, readout: [sel ? `${sel[0]}: ${sel[2].replace("indük.", "indüklenmiş")}.` : "Bir çifti aşağıdan seç.", "O–H bağı molekül içi kovalent bağdır; moleküller arası çekim değildir."] };
  },
};

function hydrate(els: El[], c: V, ion: string, tone: Tone, oIn: boolean) {
  els.push(ball(c, 0.42, tone, ion));
  for (let k = 0; k < 4; k++) {
    const a = (Math.PI / 2) * k + Math.PI / 4;
    const d = 1.35;
    const o = v(c[0] + d * Math.cos(a), c[1] + d * Math.sin(a));
    const out = v(Math.cos(a), Math.sin(a));
    const perp = v(-out[1], out[0]);
    if (oIn) {
      const hb = v(o[0] + 0.42 * out[0], o[1] + 0.42 * out[1]);
      els.push(ball(v(hb[0] + 0.3 * perp[0], hb[1] + 0.3 * perp[1]), 0.15, "b"), ball(v(hb[0] - 0.3 * perp[0], hb[1] - 0.3 * perp[1]), 0.15, "b"), ball(o, 0.25, "warn"));
    } else {
      const h = v(o[0] - 0.45 * out[0], o[1] - 0.45 * out[1]);
      const oo = v(o[0] + 0.2 * out[0], o[1] + 0.2 * out[1]);
      els.push(ball(oo, 0.25, "warn"), ball(h, 0.15, "b"), ball(v(oo[0] + 0.4 * perp[0], oo[1] + 0.4 * perp[1]), 0.15, "b"));
    }
  }
}
const ionDipole: FigureDef = {
  caption:
    "İyonun elektrik alanı polar su molekülünün kutuplarıyla etkileşir. Suyun O tarafı δ− olduğundan Na⁺ çevresinde O uçları, Cl⁻ çevresinde H uçları iyona dönük yönlenir; bu çevrelenme hidratlaşmadır. Hidratlaşmış iyon yeni bir NaCl molekülü değildir. Çizim yönlenmeyi gösterir, ölçekli değil.",
  alt: "Solda ortada Na⁺ topu, çevresinde O uçları (büyük top) ona dönük dört su molekülü. Sağda Cl⁻ topu, çevresinde H uçları (küçük top) ona dönük dört su molekülü.",
  draw: () => {
    const els: El[] = [];
    hydrate(els, v(2.6, 2.2), "Na⁺", "a", true);
    hydrate(els, v(9.0, 2.2), "Cl⁻", "c", false);
    els.push(txt(v(2.6, -0.1), "O uçları içe (δ−)", "s", { small: true }), txt(v(9.0, -0.1), "H uçları içe (δ+)", "s", { small: true }));
    els.push(...pad(v(0.2, 4.4), v(11.6, -0.8)));
    return { els, readout: ["Büyük top: O (δ−), küçük top: H (δ+).", "İyon–dipol varlığı bütün tuzların suda aynı miktarda çözüneceği anlamına gelmez."] };
  },
};

const london: FigureDef = {
  caption:
    "Benzer yapılı Cl₂, Br₂ ve I₂ serisinde elektron bulutu büyüyüp daha kolay kutuplandıkça London çekiminin toplam katkısı genellikle artar; aynı dış basınçta kaynama sıcaklığı eğilimi I₂ > Br₂ > Cl₂'dir. Bulut boyları yalnız sıralamayı gösterir, ölçekli değil.",
  alt: "Soldan sağa büyüyen üç kesik çizgili elektron bulutu içinde iki atomlu moleküller: Cl₂, Br₂, I₂. Altta sağa 'bulut büyür, kutuplanabilirlik ve kaynama sıcaklığı eğilimi artar' oku.",
  draw: () => {
    const els: El[] = [];
    const items: [string, string, number, Tone][] = [
      ["Cl₂", "Cl", 0.28, "c"],
      ["Br₂", "Br", 0.36, "warn"],
      ["I₂", "I", 0.45, "a"],
    ];
    items.forEach(([m, a, r, t], i) => {
      const x = 1.8 + i * 4.0;
      els.push(circle(v(x, 2.2), r * 2 + 0.55, { tone: "muted", thin: true, dash: true }));
      els.push(ball(v(x - r * 0.9, 2.2), r, t, a), ball(v(x + r * 0.9, 2.2), r, t, a));
      els.push(txt(v(x, 0.65), m, "s", { small: true, bold: true }));
    });
    els.push(vec(v(0.6, -0.2), v(11.4, -0.2), { tone: "a", thin: true }), txt(v(6, -0.35), "kaynama sıcaklığı eğilimi artar", "s", { small: true, tone: "a" }));
    els.push(...pad(v(0.2, 4.0), v(11.8, -1.1)));
    return { els, readout: ["Karşılaştırma şekil benzerliği ve aynı basınç koşuluyla geçerlidir.", "Yalnız formül kütlesinden evrensel bağıntı kurulmaz."] };
  },
};

export const chemistryFigures061TytAtoms: Record<string, Record<string, FigureDef>> = {
  "periyodik-sistem": {
    "Tablo bir isim listesi değil, düzenli değişim haritasıdır": tableShape,
    "İlk 20 atomda periyot ve ana grup nasıl bulunur?": first20,
    "Atom yarıçapı: yeni katman ve çekim birlikte": isoelectronic,
    "İyonlaşma enerjisi ile elektronegatiflik farklı kavramlardır": trends,
  },
  "sembolik-dil": {
    "Molekül olmak ile bileşik olmak aynı şey değil": species,
    "Sembolü harf harf doğru oku": symbolRead,
    "Alt indis, parantez ve katsayının görevi": formulaCount,
  },
  "gercek-kutle-akb-nk": {
    "Avogadro köprüsünü hedef varlıkla kur": avogadro,
    "Normal koşul etiketi hangi veriyi saklar": molarVolume,
    "Eşit hacim eşit kütle değildir": equalVolume,
  },
  "zayif-etkilesimler": {
    "Etkileşimi adlandırmadan önce çifti yaz": pairTable,
    "İyon–polar çift: iyon–dipol": ionDipole,
    "London eğilimini koşullarıyla karşılaştır": london,
  },
};
