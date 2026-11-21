import { circle, fmt, poly, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";
import { pad, rect } from "./biologyFigures059Kit";
import { bars, frac, punnett, tally } from "./biologyFigures059TytKit";

/*
 * TYT Biyoloji · Mendel genetiği, Mendel'den sapmalar, kan grupları ve eşey
 * kromozomları (Forge059). Çaprazlamalar ve sayılar bölüm metinlerindedir:
 * AA × aa, Aa × Aa (1:2:1, 3:1), Aa × aa, AaBb × AaBb (9:3:3:1), (1/2)⁴ = 1/16,
 * 2/3, 37/64 ve 27/64; Rr × Rr, MN × MN, k(k + 1)/2, r = 0,20; AO × BO,
 * AB × OO, AO Dd × BO dd (1/8); XᴬXᵃ × XᴬY, XᵃY × XᴬXᴬ. Kare kutuları eş
 * olasılıklı birleşme yollarıdır, gerçek çocuk sayısı değildir.
 */

/** İki alel → genotip (büyük harf önce): "a" + "A" → "Aa". */
const join = (p: string, q: string) => (p <= q ? p + q : q + p);
/** İki lokuslu gametlerden genotip: "Ab" + "aB" → "AaBb". */
const join2 = (p: string, q: string) => join(p[0], q[0]) + join(p[1], q[1]);
const dom = (g: string, k: string) => g.includes(k);
const toneAB = (g: string): Tone => (dom(g, "A") ? "c" : "warn");

/* ---------------- Mendel genetiği ---------------- */

function monoFigure(rows: string[], cols: string[]) {
  const t = tally(rows, cols, join);
  const geno = [...t.entries()].sort(([a], [b]) => (a < b ? -1 : 1));
  const domN = geno.filter(([g]) => dom(g, "A")).reduce((s, [, n]) => s + n, 0);
  const els: El[] = [
    ...punnett(rows, cols, (r, c) => ({ s: join(r, c), tone: toneAB(join(r, c)) }), { x: 0, y: 4.8 }),
    txt(v(9.2, 4.6), "genotip", "c", { small: true, tone: "muted" }),
    ...bars(geno.map(([g, n]) => ({ label: g, n, tone: toneAB(g) })), 4, { x: 7.6, top: 3.9, w: 3, row: 0.75 }),
    txt(v(9.2, 1.45), "fenotip", "c", { small: true, tone: "muted" }),
    ...bars([{ label: "baskın", n: domN, tone: "c" as Tone }, { label: "çekinik", n: 4 - domN, tone: "warn" as Tone }], 4, { x: 7.6, top: 0.75, w: 3, row: 0.75 }),
    ...pad(v(-0.2, 5.0), v(12.0, -0.3)),
  ];
  return { els, geno, domN };
}

const ratio = (geno: [string, number][]) => geno.map(([, n]) => n).join(":");

const firstCross: FigureDef = {
  caption:
    "Önce AA × aa: her kutu Aa, tam baskınlıkta hepsi baskın fenotip. Sonra F1 bireyleri Aa × Aa: AA, Aa, Aa, aa dört eş olasılıklı birleşme; genotip 1:2:1, fenotip 3:1. Paylar kutular sayılarak hesaplanır.",
  alt: "Solda 2 × 2 Punnett karesi, üstte ve solda gamet pulları; sağda genotip ve fenotip pay çubukları. Birinci adımda dört kutu da Aa. İkinci adımda AA, Aa, Aa, aa kutuları ve 1/4, 1/2, 1/4 ile 3/4, 1/4 çubukları.",
  steps: ["P: AA × aa", "F1: Aa × Aa"],
  draw: (_v, step) => {
    const [rows, cols] = step ? [["A", "a"], ["A", "a"]] : [["A", "A"], ["a", "a"]];
    const f = monoFigure(rows, cols);
    return {
      els: f.els,
      readout: [
        step ? `F2 genotip ${ratio(f.geno)} (AA:Aa:aa), fenotip ${f.domN}:${4 - f.domN}.` : "F1: dört kutunun dördü Aa, hepsi baskın fenotip.",
        "Dört kutu dört gerçek çocuk değil, eş olasılıklı birleşme yollarıdır.",
      ],
    };
  },
};

const backcross: FigureDef = {
  caption:
    "Aa × aa karesi: satıra Aa'nın gametleri (A, a), sütuna aa'nın gametleri (a, a). İki kutu Aa, iki kutu aa; her biri 1/2. 3:1 kalıbı bu eşleşmeye ait değildir.",
  alt: "2 × 2 Punnett karesi: üst satırda iki Aa, alt satırda iki aa kutusu; sağda genotip çubukları 1/2 ve 1/2, fenotip çubukları baskın 1/2, çekinik 1/2.",
  draw: () => {
    const f = monoFigure(["A", "a"], ["a", "a"]);
    return { els: f.els, readout: [`Aa × aa → Aa ${frac(f.domN, 4)}, aa ${frac(4 - f.domN, 4)}.`, "Yinelenen gamet kutularının her biri olasılık ağırlığını korur."] };
  },
};

const DI = ["AB", "Ab", "aB", "ab"];
const diPheno = (g: string) => `${dom(g, "A") ? "A_" : "aa"}${dom(g, "B") ? "B_" : "bb"}`;
const DI_TONE: Record<string, Tone> = { A_B_: "c", A_bb: "b", aaB_: "a", aabb: "warn" };
const dihybrid: FigureDef = {
  caption:
    "AaBb × AaBb: genler bağımsız, her lokusta tam baskınlık ve dört eş gamet varsayımıyla 16 kutu. Fenotipler kutular sayılarak 9/16, 3/16, 3/16, 1/16 çıkar; aabb tek kutudur (1/4 × 1/4).",
  alt: "4 × 4 Punnett karesi; gametler AB, Ab, aB, ab. Kutular dört fenotip sınıfına göre renkli. Altındaki lejantta A_B_ 9/16, A_bb 3/16, aaB_ 3/16, aabb 1/16.",
  draw: () => {
    const t = tally(DI, DI, (r, c) => diPheno(join2(r, c)));
    const els: El[] = [...punnett(DI, DI, (r, c) => ({ s: join2(r, c), tone: DI_TONE[diPheno(join2(r, c))] }), { x: 0, y: 8, size: 1.6 }), ...pad(v(-0.1, 8.1), v(8.1, -0.1))];
    const legend = ["A_B_", "A_bb", "aaB_", "aabb"].map((k) => ({ code: String(t.get(k) ?? 0), label: `${k}: ${t.get(k)}/16`, tone: DI_TONE[k] }));
    return { els, legend, readout: [`Fenotip oranı ${["A_B_", "A_bb", "aaB_", "aabb"].map((k) => t.get(k)).join(":")}; aaBb kutuları ${tally(DI, DI, join2).get("aaBb")}/16 = 1/8.`, "Bağımsızlık gösterilmediyse dört eş gamet ve 9:3:3:1 otomatik kullanılmaz."] };
  },
};

const testCross: FigureDef = {
  caption:
    "Test çaprazlaması Aa × aa ise her yavrunun Aa (baskın) olma olasılığı 1/2'dir. n bağımsız yavrunun hepsinin baskın görünmesi (1/2)ⁿ: dört yavruda 1/16. Bu olasılık küçülse de sıfır olmaz; hepsi baskın yavru AA'yı kesin kanıtlamaz. Çubuklar ölçeklidir.",
  alt: "Çubuk grafik: yatayda yavru sayısı 1'den 8'e, düşeyde hepsinin baskın olma olasılığı; çubuklar her adımda yarıya iniyor. Sürgüyle seçilen yavru sayısının çubuğu vurgulu.",
  param: { label: "Yavru sayısı n", min: 1, max: 8, step: 1, init: 4, plain: true },
  draw: (n) => {
    const H = 5;
    const els: El[] = [seg(v(-0.2, 0), v(10.6, 0), { thin: true, tone: "muted" }), seg(v(0, 0), v(0, H + 0.4), { thin: true, tone: "muted" })];
    els.push(txt(v(-0.15, H), "1/2", "w", { small: true, tone: "muted" }), seg(v(-0.1, H), v(0.1, H), { thin: true, tone: "muted" }));
    for (let k = 1; k <= 8; k++) {
      const h = (2 * H) / 2 ** k;
      const x = (k - 1) * 1.3 + 0.4;
      const on = k === n;
      els.push(rect(x, 0, x + 0.9, h, { tone: on ? "a" : "b", fill: on ? "a" : "b", thin: !on, bold: on }));
      els.push(txt(v(x + 0.45, -0.25), String(k), "s", { small: true, bold: on, tone: on ? "a" : "muted" }));
    }
    els.push(txt(v(10.6, -0.25), "n", "s", { small: true, tone: "muted" }));
    els.push(...pad(v(-1.2, H + 0.8), v(11, -1.0)));
    return { els, readout: [`Aa × aa, ${n} yavrunun hepsi baskın: (1/2)${n === 1 ? "" : "⁰¹²³⁴⁵⁶⁷⁸"[n]} = 1/${2 ** n}.`, "Çekinik (aa) yavru görülürse baskın ebeveyn Aa olmalıdır."] };
  },
};

const conditional: FigureDef = {
  caption:
    "Aa × Aa yavrusunun Aa olma olasılığı 2/4 = 1/2. Yavrunun baskın fenotipli olduğu biliniyorsa aa kutusu örnek uzayından çıkar: kalan AA, Aa, Aa yollarından ikisi Aa, koşullu olasılık 2/3.",
  alt: "2 × 2 Punnett karesi AA, Aa, Aa, aa. İkinci adımda aa kutusu kesik çizgiyle soluk; Aa kutuları kalın çerçeveli.",
  steps: ["Bütün doğumlar", "Baskın olduğu bilinen"],
  draw: (_v, step) => {
    const R = ["A", "a"];
    const cell = (r: string, c: string) => {
      const g = join(r, c);
      return { s: g, tone: toneAB(g), off: step === 1 && g === "aa", on: g === "Aa" };
    };
    const kept = step ? 3 : 4;
    const els: El[] = [
      ...punnett(R, R, cell, { x: 2.2, y: 4.8 }),
      txt(v(9.6, 3.3), `Aa yolu: 2 / ${kept}`, "c", { bold: true, tone: "a" }),
      txt(v(9.6, 2.4), `= ${frac(2, kept)}`, "c", { bold: true, tone: "a" }),
      ...pad(v(0, 5.0), v(12.0, -0.3)),
    ];
    return { els, readout: [step ? "Payda yalnız baskın yollar (AA, Aa, Aa): 2/3." : "Payda bütün yollar (AA, Aa, Aa, aa): 2/4 = 1/2.", "Seçim doğumdaki süreci değiştirmez; değerlendirilen grubu daraltır."] };
  },
};

const C3 = [1, 3, 3, 1];
const atLeast: FigureDef = {
  caption:
    "Aa × Aa çiftinin bağımsız üç doğumunda aa sayısı: her doğumda aa 1/4, değil 3/4. Tam bir aa 3 × (1/4) × (3/4)² = 27/64; en az bir aa 1 − (3/4)³ = 37/64. Çubuklar 64'te pay olarak ölçeklidir.",
  alt: "Dört çubuk: 0 aa 27/64, 1 aa 27/64, 2 aa 9/64, 3 aa 1/64. Birinci adımda yalnız 1 aa çubuğu, ikinci adımda 1, 2 ve 3 aa çubukları vurgulu.",
  steps: ["Tam bir aa", "En az bir aa"],
  draw: (_v, step) => {
    const p = C3.map((c, k) => c * 3 ** (3 - k));
    const on = (k: number) => (step ? k >= 1 : k === 1);
    const els: El[] = [...bars(p.map((n, k) => ({ label: `${k} aa`, n, tone: "b" as Tone, on: on(k) })), 64, { x: 1.6, top: 3.6, w: 14, row: 1.0, name: (n) => `${n}/64` }), ...pad(v(0, 4.3), v(11.4, -0.4))];
    const s = p.reduce((a, n, k) => a + (on(k) ? n : 0), 0);
    return { els, readout: [step ? `En az bir aa: ${p[1]} + ${p[2]} + ${p[3]} = ${s}/64 = 1 − ${p[0]}/64.` : `Tam bir aa: 3 × 1 × 9 = ${s}/64 (üç farklı doğum sırası).`, "Yüz yavruda beklenen aa 25'tir; gözlem tam 25 olmak zorunda değildir."] };
  },
};

/* ---------------- Mendel'den sapmalar ---------------- */

const RED: Record<string, [string, Tone]> = { RR: ["kırmızı", "warn"], Rr: ["pembe", "b"], rr: ["beyaz", "muted"] };
const incomplete: FigureDef = {
  caption:
    "Özgün çiçek modeli: RR kırmızı, rr beyaz, Rr pembe. Rr × Rr karesinde genotip 1:2:1 ve fenotip de 1 kırmızı : 2 pembe : 1 beyaz. Rr × rr'de yarı pembe, yarı beyaz. Pembe birey R ve r gameti verir; pembe adlı gamet yoktur.",
  alt: "2 × 2 Punnett karesi ve sağda fenotip çubukları. Birinci adım Rr × Rr: RR, Rr, Rr, rr; kırmızı 1/4, pembe 1/2, beyaz 1/4. İkinci adım Rr × rr: Rr, Rr, rr, rr; pembe 1/2, beyaz 1/2.",
  steps: ["Rr × Rr", "Rr × rr"],
  draw: (_v, step) => {
    const rows = ["R", "r"];
    const cols = step ? ["r", "r"] : ["R", "r"];
    const t = tally(rows, cols, join);
    const els: El[] = [
      ...punnett(rows, cols, (r, c) => ({ s: join(r, c), tone: RED[join(r, c)][1] }), { x: 0, y: 4.8 }),
      txt(v(9.2, 3.9), "fenotip", "c", { small: true, tone: "muted" }),
      ...bars(["RR", "Rr", "rr"].map((g) => ({ label: RED[g][0], n: t.get(g) ?? 0, tone: RED[g][1] })), 4, { x: 7.6, top: 3.0, w: 3, row: 0.85 }),
      ...pad(v(-0.2, 5.0), v(12.0, -0.3)),
    ];
    return { els, readout: [`Fenotip = genotip sınıfı: ${["RR", "Rr", "rr"].map((g) => `${RED[g][0]} ${frac(t.get(g) ?? 0, 4)}`).join(", ")}.`, "Ara görünüm alellerin kalıcı karıştığını göstermez."] };
  },
};

const MODELS: [string, string[], Tone[]][] = [
  ["tam baskınlık", ["baskın", "baskın", "çekinik"], ["c", "c", "warn"]],
  ["eksik baskınlık", ["kırmızı", "pembe", "beyaz"], ["warn", "b", "muted"]],
  ["eş baskınlık (MN)", ["M", "MN", "N"], ["c", "a", "b"]],
];
const sameSegregation: FigureDef = {
  caption:
    "Üç modelde de heterozigot × heterozigot çaprazlaması aynı genotip dağılımını verir: 1 homozigot : 2 heterozigot : 1 homozigot. Değişen yalnız heterozigotun görünümüdür; tam baskınlıkta fenotip 3:1, eksik ve eş baskınlıkta 1:2:1. Şerit uzunlukları ölçeklidir.",
  alt: "Üstte dörde bölünmüş genotip şeridi: 1/4 homozigot, 2/4 heterozigot, 1/4 öteki homozigot. Altında üç fenotip şeridi: tam baskınlıkta ilk üç çeyrek aynı sınıf; eksik baskınlıkta kırmızı, pembe, beyaz; MN'de M, MN, N.",
  draw: () => {
    const W = 8;
    const x0 = 3.6;
    const els: El[] = [];
    const strip = (yy: number, parts: [number, string, Tone][]) => {
      let x = x0;
      for (const [n, s, tone] of parts) {
        els.push(rect(x, yy - 0.4, x + (n / 4) * W, yy + 0.4, { tone, fill: tone, thin: true }), txt(v(x + (n / 4) * W * 0.5, yy), s, "c", { small: true, bold: true }));
        x += (n / 4) * W;
      }
    };
    els.push(txt(v(x0 - 0.2, 4.2), "genotip", "w", { small: true, bold: true }));
    strip(4.2, [[1, "1", "ink"], [2, "2 heterozigot", "ink"], [1, "1", "ink"]]);
    MODELS.forEach(([name, ph, tones], i) => {
      const yy = 2.8 - i * 1.25;
      els.push(txt(v(x0 - 0.2, yy), name, "w", { small: true }));
      const parts: [number, string, Tone][] = i === 0 ? [[3, `${ph[0]} 3/4`, tones[0]], [1, "1/4", tones[2]]] : [[1, ph[0], tones[0]], [2, ph[1], tones[1]], [1, ph[2], tones[2]]];
      strip(yy, parts);
    });
    els.push(...pad(v(-0.2, 4.8), v(11.9, -0.1)));
    return { els, readout: ["Genotip 1:2:1 her üç modelde aynı; fenotip 3:1, 1:2:1, 1:2:1.", "Normal mayozda her gamet ilgili lokustan bir alel alır."] };
  },
};

const multiAllele: FigureDef = {
  caption:
    "k alelin bütün çiftleri mümkünse genotip çeşidi k(k + 1)/2: köşegende k homozigot, altında k(k − 1)/2 heterozigot. Üç alelde (AB0) 3 + 3 = 6. Bir birey yine en fazla iki alel taşır; fenotip sayısı baskınlık ilişkisine bağlıdır.",
  alt: "Alellerin satır ve sütunda yazıldığı üçgen tablo: köşegen kutular homozigot, altındaki kutular heterozigot. Sürgüyle alel sayısı 2'den 5'e değişiyor.",
  param: { label: "Alel sayısı k", min: 2, max: 5, step: 1, init: 3, plain: true },
  draw: (kv) => {
    const k = Math.round(kv);
    const names = ["A", "B", "O", "D", "E"].slice(0, k);
    const s = 1.1;
    const top = 6.4;
    const els: El[] = [];
    names.forEach((n, i) => {
      els.push(txt(v(0.5, top - (i + 1.5) * s), n, "c", { small: true, bold: true, tone: "c" }), txt(v((i + 1.5) * s, top - 0.5 * s), n, "c", { small: true, bold: true, tone: "b" }));
      for (let j = 0; j <= i; j++) {
        const x0 = (j + 1) * s;
        const y0 = top - (i + 2) * s;
        const homo = i === j;
        els.push(rect(x0, y0, x0 + s, y0 + s, { tone: homo ? "a" : "c", fill: homo ? "a" : "c", thin: true }), txt(v(x0 + s / 2, y0 + s / 2), names[j] + n, "c", { small: true, bold: true }));
      }
    });
    const het = (k * (k - 1)) / 2;
    els.push(txt(v(7.4, 4.6), `homozigot ${k}`, "e", { small: true, bold: true, tone: "a" }), txt(v(7.4, 3.6), `heterozigot ${het}`, "e", { small: true, bold: true, tone: "c" }), txt(v(7.4, 2.6), `toplam ${k + het}`, "e", { bold: true }));
    els.push(...pad(v(0, 6.6), v(12, 0.6)));
    return { els, readout: [`k = ${k}: ${k}(${k} + 1)/2 = ${(k * (k + 1)) / 2} genotip çeşidi.`, "Üç alel olduğu için bir bireye ABO genotipi yazılmaz."] };
  },
};

function homolog(x: number, top: number, alleles: [string, string], tone: Tone): El[] {
  const h = 4.2;
  return [
    poly([v(x - 0.28, top), v(x + 0.28, top), v(x + 0.28, top - h), v(x - 0.28, top - h)], { tone, fill: tone, thin: true }),
    seg(v(x - 0.28, top - 1.2), v(x + 0.28, top - 1.2), { thin: true }),
    seg(v(x - 0.28, top - 3.0), v(x + 0.28, top - 3.0), { thin: true }),
    txt(v(x + 0.45, top - 1.2), alleles[0], "e", { bold: true }),
    txt(v(x + 0.45, top - 3.0), alleles[1], "e", { bold: true }),
  ];
}
const linkage: FigureDef = {
  caption:
    "AaBb yazısı alellerin hangi homologda olduğunu söylemez. AB/ab (cis) düzende bir homolog A ile B'yi, öteki a ile b'yi taşır; Ab/aB (trans) düzende A ile b birliktedir. Parça değişimi model dışındaysa ebeveyn gametleri homologları izler. Kromozom çizimi şematiktir, ölçekli değil.",
  alt: "İki dikey homolog kromozom çubuğu, her birinde iki lokus çizgisi ve alel harfleri. Sağda bu düzenin verdiği iki gamet tipi. Adımlar AB/ab ve Ab/aB düzenleri arasında geçer.",
  steps: ["AB/ab (cis)", "Ab/aB (trans)"],
  draw: (_v, step) => {
    const h1: [string, string] = step ? ["A", "b"] : ["A", "B"];
    const h2: [string, string] = step ? ["a", "B"] : ["a", "b"];
    const els: El[] = [...homolog(1.0, 5.0, h1, "c"), ...homolog(3.0, 5.0, h2, "b"), txt(v(2.2, 0.35), step ? "Ab/aB" : "AB/ab", "c", { bold: true })];
    els.push(seg(v(5.0, 3.0), v(6.4, 3.0), { thin: true, tone: "muted" }));
    els.push(poly([v(6.25, 3.15), v(6.5, 3.0), v(6.25, 2.85)], { tone: "muted", fill: "muted", thin: true }));
    [h1, h2].forEach((g, i) => {
      const c = v(8.6, 3.9 - i * 1.8);
      els.push(circle(c, 0.6, { tone: i ? "b" : "c", fill: i ? "b" : "c", thin: true }), txt(c, g.join(""), "c", { bold: true }), txt(v(9.4, c[1]), "1/2", "e", { small: true, bold: true }));
    });
    els.push(...pad(v(0.2, 5.4), v(11.5, 0)));
    return { els, readout: [`${step ? "Trans" : "Cis"} düzen → ebeveyn gametleri ${h1.join("")} ve ${h2.join("")} (parça değişimi yok sayıldı).`, "İki düzenin toplam genotipi de AaBb; ebeveyn gametleri farklıdır."] };
  },
};

const recombination: FigureDef = {
  caption:
    "AB/ab bireyinde rekombinant gamet oranı r ise simetrik modelde her ebeveyn sınıfı (AB, ab) (1 − r)/2, her rekombinant sınıf (Ab, aB) r/2 payındadır. r = 0,20 için 0,40, 0,40, 0,10, 0,10. r en çok 0,50'dir; o zaman dört sınıf eşitlenir. Çubuklar ölçeklidir.",
  alt: "Dört yatay çubuk: AB ve ab ebeveyn gametleri, Ab ve aB rekombinant gametler. Sürgüyle r 0'dan 0,50'ye değişince ebeveyn çubukları kısalıp rekombinant çubuklar uzuyor.",
  param: { label: "Rekombinasyon oranı r", min: 0, max: 0.5, step: 0.02, init: 0.2 },
  draw: (r) => {
    const parts: [string, number, Tone][] = [["AB (ebeveyn)", (1 - r) / 2, "c"], ["ab (ebeveyn)", (1 - r) / 2, "c"], ["Ab (rekombinant)", r / 2, "a"], ["aB (rekombinant)", r / 2, "a"]];
    const els: El[] = [...bars(parts.map(([label, p, tone]) => ({ label, n: p, tone })), 1, { x: 4.6, top: 3.4, w: 11, row: 1.0, name: (p) => fmt(p, 2) }), ...pad(v(0, 4.0), v(11.8, -0.3))];
    return { els, readout: [`r = ${fmt(r, 2)}: AB = ab = (1 − ${fmt(r, 2)})/2 = ${fmt((1 - r) / 2, 2)}; Ab = aB = ${fmt(r, 2)}/2 = ${fmt(r / 2, 2)}.`, r >= 0.5 ? "r = 0,50 bağımsız oranla uyumludur; farklı kromozomda olmayı tek başına kanıtlamaz." : "Dört payın toplamı 1'dir."] };
  },
};

/* ---------------- Kan grupları ---------------- */

const ABO_PHENO: Record<string, string> = { AA: "A", AO: "A", BB: "B", BO: "B", AB: "AB", OO: "O" };
const ABO_TONE: Record<string, Tone> = { A: "c", B: "b", AB: "a", O: "muted" };
const aboGenotype = (p: string, q: string) => {
  const order = "ABO";
  return order.indexOf(p) <= order.indexOf(q) ? p + q : q + p;
};
const aboTable: FigureDef = {
  caption:
    "Okul modelinde AB0 tek lokus ve üç alel: A ile B eş baskın, ikisi de O'ya baskın. Altı genotip dört fenotip verir: AA ve AO → A; BB ve BO → B; AB → AB; OO → O. Bir birey bu lokusta yalnız iki alel taşır.",
  alt: "Dört sütun: A, B, AB ve O grubu başlıkları; altlarında genotip kutuları: A altında AA ve AO, B altında BB ve BO, AB altında AB, O altında OO.",
  draw: () => {
    const groups = ["A", "B", "AB", "O"];
    const els: El[] = [];
    groups.forEach((gname, i) => {
      const x = i * 2.9 + 1.2;
      const tone = ABO_TONE[gname];
      els.push(rect(x - 1.1, 3.6, x + 1.1, 4.6, { tone, fill: tone, thin: true }), txt(v(x, 4.1), `${gname} grubu`, "c", { small: true, bold: true }));
      Object.entries(ABO_PHENO)
        .filter(([, p]) => p === gname)
        .forEach(([geno], k) => {
          const y = 2.6 - k * 1.25;
          els.push(seg(v(x, k ? y + 0.8 : 3.6), v(x, y + 0.45), { thin: true, tone: "muted" }), rect(x - 0.75, y - 0.45, x + 0.75, y + 0.45, { tone: "ink", thin: true }), txt(v(x, y), geno, "c", { small: true, bold: true }));
        });
    });
    els.push(...pad(v(-0.1, 4.8), v(11.0, 0.8)));
    return { els, readout: ["6 genotip → 4 fenotip: A ve B fenotipinde iki genotip olasıdır.", "O çocuk iki ebeveynden de O aleli almıştır."] };
  },
};

const tri = (x: number, y: number, s: number): El => poly([v(x - s, y - s * 0.8), v(x + s, y - s * 0.8), v(x, y + s)], { tone: "c", fill: "c", thin: true });
const sq = (x: number, y: number, s: number): El => rect(x - s * 0.85, y - s * 0.85, x + s * 0.85, y + s * 0.85, { tone: "b", fill: "b", thin: true });
const antigen: FigureDef = {
  caption:
    "Antijen alyuvar yüzeyinde, antikor plazmadadır. A grubunun alyuvarında A antijeni (üçgen), plazmasında anti-B; B grubunda B antijeni (kare) ve anti-A; AB'de iki antijen, antikor yok; O'da A/B antijeni yok, plazmada anti-A ve anti-B. Standart yetişkin tablosu, şematik çizim.",
  alt: "Dört alyuvar dairesi yan yana: A grubunun çevresinde üçgenler, B grubunun karelerle, AB grubunun hem üçgen hem karelerle çevrili, O grubu işaretsiz. Her dairenin altında plazmadaki antikor yazılı.",
  draw: () => {
    const rows: [string, boolean, boolean, string][] = [["A", true, false, "anti-B"], ["B", false, true, "anti-A"], ["AB", true, true, "antikor yok"], ["O", false, false, "anti-A, anti-B"]];
    const els: El[] = [];
    rows.forEach(([g, a, b, ab], i) => {
      const x = i * 3.0 + 1.3;
      const c = v(x, 3.2);
      els.push(circle(c, 0.95, { tone: "warn", fill: "warn", thin: true }), txt(c, g, "c", { bold: true }));
      for (let k = 0; k < 6; k++) {
        const ang = (k * 60 + 90) * (Math.PI / 180);
        const px = x + 1.2 * Math.cos(ang);
        const py = 3.2 + 1.2 * Math.sin(ang);
        if (a && (!b || k % 2 === 0)) els.push(tri(px, py, 0.17));
        if (b && (!a || k % 2 === 1)) els.push(sq(px, py, 0.17));
      }
      els.push(txt(v(x, 1.55), "plazma:", "c", { small: true, tone: "muted" }), ...ab.split(", ").map((s, k) => txt(v(x, 0.9 - k * 0.6), s, "c", { small: true, bold: true })));
    });
    els.push(...pad(v(-0.2, 4.7), v(11.0, -0.2)));
    return { els, legend: [{ code: "A", label: "A antijeni: üçgen", tone: "c" }, { code: "B", label: "B antijeni: kare", tone: "b" }], readout: ["Antijen hücrede, antikor plazmada: yerlerini değiştirirsen mantık tersine döner.", "0 alyuvarında hiçbir molekül yok denmez; yalnız A/B antijeni yoktur."] };
  },
};

function aboCross(p1: string, p2: string) {
  const rows = p1.split("");
  const cols = p2.split("");
  const t = tally(rows, cols, (r, c) => ABO_PHENO[aboGenotype(r, c)]);
  const n = rows.length * cols.length;
  const els: El[] = [
    ...punnett(rows, cols, (r, c) => ({ s: aboGenotype(r, c), tone: ABO_TONE[ABO_PHENO[aboGenotype(r, c)]] }), { x: 0, y: 4.8 }),
    txt(v(9.2, 4.2), "kan grubu", "c", { small: true, tone: "muted" }),
    ...bars(["A", "B", "AB", "O"].map((g) => ({ label: g, n: t.get(g) ?? 0, tone: ABO_TONE[g] })), n, { x: 8.2, top: 3.4, w: 2.6, row: 0.8 }),
    ...pad(v(-0.2, 5.0), v(12.0, -0.3)),
  ];
  return { els, t, n };
}
const aboCrossFig: FigureDef = {
  caption:
    "AO × BO: gametler A/O ve B/O; dört birleşme AB, AO, BO, OO, her biri 1/4, dört kan grubu da olası. AB × OO: AO ve BO, her biri 1/2. Gamete yalnız alel konur; anti-A ve anti-B antikorları kareye yazılmaz.",
  alt: "2 × 2 Punnett karesi ve sağda A, B, AB, O kan grubu çubukları. Birinci adım AO × BO: dört grup 1/4. İkinci adım AB × OO: A 1/2, B 1/2.",
  steps: ["AO × BO", "AB × OO"],
  draw: (_v, step) => {
    const f = step ? aboCross("AB", "OO") : aboCross("AO", "BO");
    return { els: f.els, readout: [["A", "B", "AB", "O"].map((g) => `${g} ${frac(f.t.get(g) ?? 0, f.n)}`).join(", ") + ".", "Gamet alel taşır; antijen gen ürününün fenotipik sonucudur."] };
  },
};

const twoSystems: FigureDef = {
  caption:
    "AO, Dd × BO, dd: lokuslar bağımsız kabul edilir, her sistem ayrı çözülür. AB0'da dört grup 1/4 (sütunlar), RhD'de Dd × dd → Rh+ 1/2, Rh− 1/2 (satırlar). Her kutu iki payın çarpımıdır: O, Rh− = 1/4 × 1/2 = 1/8. Alanlar ölçeklidir.",
  alt: "Dört sütun ve iki satırlı alan tablosu: sütunlar AB, A, B, O (her biri 1/4 genişlik), satırlar Rh+ ve Rh− (her biri 1/2 yükseklik). O ve Rh− kutusu vurgulu, içinde 1/8.",
  draw: () => {
    const abo = aboCross("AO", "BO").t;
    const rh = tally(["D", "d"], ["d", "d"], (r, c) => (r === "D" || c === "D" ? "Rh+" : "Rh−"));
    const cols = ["AB", "A", "B", "O"];
    const W = 2.2;
    const H = 1.6;
    const els: El[] = [];
    cols.forEach((g, j) => els.push(txt(v(1.6 + (j + 0.5) * W, 4.1), `${g} ${frac(abo.get(g) ?? 0, 4)}`, "c", { small: true, bold: true, tone: ABO_TONE[g] })));
    ["Rh+", "Rh−"].forEach((r, i) => {
      const y0 = 3.6 - (i + 1) * H;
      els.push(txt(v(1.4, y0 + H / 2), `${r} ${frac(rh.get(r) ?? 0, 4)}`, "w", { small: true, bold: true }));
      cols.forEach((g, j) => {
        const on = g === "O" && r === "Rh−";
        const x0 = 1.6 + j * W;
        els.push(rect(x0, y0, x0 + W, y0 + H, { tone: on ? "a" : "ink", fill: on ? "a" : i ? undefined : "muted", thin: !on, bold: on }));
        els.push(txt(v(x0 + W / 2, y0 + H / 2), frac((abo.get(g) ?? 0) * (rh.get(r) ?? 0), 16), "c", { small: true, bold: on, tone: on ? "a" : "ink" }));
      });
    });
    els.push(...pad(v(-0.6, 4.5), v(10.6, 0.1)));
    return { els, readout: [`O, Rh−: ${frac(abo.get("O") ?? 0, 4)} × ${frac(rh.get("Rh−") ?? 0, 4)} = ${frac((abo.get("O") ?? 0) * (rh.get("Rh−") ?? 0), 16)}.`, "Rh+ fenotipi tek başına DD demek değildir."] };
  },
};

/* ---------------- Eşey kromozomları ---------------- */

const xJoin = (p: string, q: string) => {
  const ys = [p, q].sort((a, b) => (a.startsWith("Y") ? 1 : b.startsWith("Y") ? -1 : a < b ? -1 : a > b ? 1 : 0));
  return ys.join("");
};
const sexTone = (g: string): Tone => (g.includes("Y") ? "b" : "c");
const gametes: FigureDef = {
  caption:
    "XX bireyin gametleri 22 otozom + X; XY bireyinkiler 22 otozom + X veya 22 otozom + Y. Eş olasılıklı gamet ve rastgele birleşmede XX ve XY zigot olasılıkları 1/2. 23 kromozomlu spermde 23 otozom değil, 22 otozom ve bir eşey kromozomu vardır.",
  alt: "2 × 2 Punnett karesi: satırlarda yumurta gametleri (22 + X), sütunlarda sperm gametleri (22 + X ve 22 + Y). Kutular XX, XY, XX, XY.",
  draw: () => {
    const rows = ["X", "X"];
    const cols = ["X", "Y"];
    const g = xJoin;
    const t = tally(rows, cols, g);
    const els: El[] = [
      ...punnett(rows, cols, (r, c) => ({ s: g(r, c), tone: sexTone(g(r, c)) }), { x: 0, y: 5.2, size: 1.9, rowName: "yumurta: 22 + X", colName: "sperm: 22 + X ya da 22 + Y" }),
      ...bars([{ label: "XX", n: t.get("XX") ?? 0, tone: "c" as Tone }, { label: "XY", n: t.get("XY") ?? 0, tone: "b" as Tone }], 4, { x: 8.4, top: 3.2, w: 2.6, row: 1.0 }),
      ...pad(v(-0.2, 5.8), v(12.0, -0.9)),
    ];
    return { els, readout: [`XX ${frac(t.get("XX") ?? 0, 4)}, XY ${frac(t.get("XY") ?? 0, 4)}; her yumurta 23 = 22 + X.`, "Önceki doğumların sonucu sonraki birleşmenin olasılığını değiştirmez."] };
  },
};

const xy: FigureDef = {
  caption:
    "X ve Y'nin eşleşmeye katkı sağlayan sınırlı homolog bölgeleri ve homolog olmayan bölgeleri vardır. X'in Y'de karşılığı olmayan bir lokusunda XY birey tek alel taşır: hemizigot. Kromozom boyları ve bölge yerleri şematiktir, ölçekli değil.",
  alt: "Uzun bir X ve kısa bir Y kromozomu yan yana; uçlardaki küçük homolog bölgeler aynı renkte taralı. X'in ortasındaki bir lokus işaretli, Y'de karşılığı yok.",
  draw: () => {
    const chrom = (x: number, top: number, h: number, tone: Tone) => poly([v(x - 0.45, top), v(x + 0.45, top), v(x + 0.45, top - h), v(x - 0.45, top - h)], { tone, fill: tone, thin: true });
    const homo = (x: number, y0: number, y1: number) => rect(x - 0.45, y0, x + 0.45, y1, { tone: "a", fill: "a", bold: true });
    const els: El[] = [chrom(3, 5.6, 5.2, "c"), chrom(7, 5.6, 2.4, "b"), homo(3, 5.0, 5.6), homo(7, 5.0, 5.6)];
    els.push(txt(v(3, 0.25), "X", "s", { bold: true }), txt(v(7, 3.05), "Y", "s", { bold: true }));
    els.push(seg(v(2.55, 4.0), v(3.45, 4.0), { bold: true, tone: "warn" }), txt(v(2.3, 4.0), "Xᵃ lokusu", "w", { small: true, bold: true, tone: "warn" }));
    els.push(seg(v(6.55, 4.0), v(7.45, 4.0), { thin: true, dash: true, tone: "muted" }), txt(v(7.7, 4.0), "karşılık yok", "e", { small: true, tone: "muted" }));
    els.push(seg(v(3.6, 5.3), v(6.4, 5.3), { thin: true, dash: true, tone: "a" }), txt(v(5, 5.75), "homolog bölge", "n", { small: true, tone: "a" }));
    els.push(...pad(v(-0.5, 6.6), v(11.6, -0.4)));
    return { els, readout: ["XᵃY: tek alel, özellik görünür (hemizigot).", "X'e bağlı özellik iki kromozom düzeninde de görülebilir."] };
  },
};

const xRoute: FigureDef = {
  caption:
    "Özelliği gösteren XᵃY baba ile XᴬXᴬ anne: kızların hepsi babanın X'ini alır ve XᴬXᵃ taşıyıcıdır; oğullar X'i anneden, Y'yi babadan alır ve XᴬY olur. Babanın X'e bağlı aleli oğula doğrudan geçmez.",
  alt: "2 × 2 Punnett karesi: satırlarda annenin Xᴬ gametleri, sütunlarda babanın Xᵃ ve Y gametleri. Xᵃ sütunundaki kutular XᴬXᵃ (kız, taşıyıcı), Y sütunundakiler XᴬY (oğul).",
  draw: () => {
    const rows = ["Xᴬ", "Xᴬ"];
    const cols = ["Xᵃ", "Y"];
    const els: El[] = [
      ...punnett(rows, cols, (r, c) => ({ s: xJoin(r, c), tone: sexTone(c) }), { x: 0, y: 5.2, size: 1.9, rowName: "anne", colName: "baba" }),
      txt(v(7.0, 3.3), "kızlar: XᴬXᵃ taşıyıcı 2/2", "e", { small: true, bold: true, tone: "c" }),
      txt(v(7.0, 2.3), "oğullar: XᴬY 2/2", "e", { small: true, bold: true, tone: "b" }),
      ...pad(v(-0.2, 5.8), v(12.0, -0.9)),
    ];
    return { els, readout: ["Bütün kızlar babanın X'ini alır; oğullar Y'yi babadan alır.", "Baba özelliği gösteriyor diye bütün oğulların göstermesi beklenmez."] };
  },
};

const xCond: FigureDef = {
  caption:
    "XᴬXᵃ anne × XᴬY baba: dört eş yol XᴬXᴬ, XᴬY, XᴬXᵃ, XᵃY. Bütün çocuklarda özelliği gösteren 1/4; oğul olduğu biliniyorsa payda yalnız XY kutuları, olasılık 1/2; kızlar arasında taşıyıcı 1/2.",
  alt: "2 × 2 Punnett karesi. Adımlara göre seçilen grup dışındaki kutular kesik çizgiyle soluklaşıyor; özellik gösteren XᵃY ya da taşıyıcı XᴬXᵃ kutusu kalın çerçeveli.",
  steps: ["Bütün çocuklar", "Yalnız oğullar", "Yalnız kızlar"],
  draw: (_v, step) => {
    const rows = ["Xᴬ", "Xᵃ"];
    const cols = ["Xᴬ", "Y"];
    const inGroup = (g: string) => (step === 0 ? true : step === 1 ? g.includes("Y") : !g.includes("Y"));
    const target = (g: string) => (step === 2 ? g === "XᴬXᵃ" : g === "XᵃY");
    let num = 0;
    let den = 0;
    for (const r of rows)
      for (const c of cols) {
        const g = xJoin(r, c);
        if (inGroup(g)) {
          den++;
          if (target(g)) num++;
        }
      }
    const els: El[] = [
      ...punnett(rows, cols, (r, c) => {
        const g = xJoin(r, c);
        return { s: g, tone: sexTone(g), off: !inGroup(g), on: inGroup(g) && target(g) };
      }, { x: 0, y: 5.2, size: 1.9, rowName: "anne", colName: "baba" }),
      txt(v(9.3, 3.2), frac(num, den) === `${num}/${den}` ? `${num}/${den}` : `${num}/${den} = ${frac(num, den)}`, "c", { bold: true, tone: "a" }),
      txt(v(9.3, 2.3), step === 2 ? "taşıyıcı" : "özellik", "c", { small: true, tone: "a" }),
      ...pad(v(-0.2, 5.8), v(12.0, -0.9)),
    ];
    return { els, readout: [step === 0 ? "Bütün doğumlar payda: XᵃY 1/4; bütün çocuklar içinde taşıyıcı kız da 1/4." : step === 1 ? "Yalnız XY sonuçları: XᵃY 1/2." : "Yalnız XX sonuçları: XᴬXᵃ 1/2.", "Hem erkek hem özellikli çocuk ile erkekler arasında özellikli çocuk farklı sorulardır."] };
  },
};

export const biologyFigures059TytGenetics: Record<string, Record<string, FigureDef>> = {
  "mendel-genetigi": {
    "İlk çaprazlama ile kendileştirme farklıdır": firstCross,
    "Punnett karesini ebeveynlerden kur": backcross,
    "Bağımsız iki karakteri ayrı çöz": dihybrid,
    "Test çaprazlamasında kanıtın yönü": testCross,
    "Koşullu olasılık örnek uzayı değiştirir": conditional,
    "En az biri, tam biri ve beklenti": atLeast,
  },
  "mendelden-sapmalar": {
    "Eksik baskınlıkta ara fenotip": incomplete,
    "Çok alel popülasyona, iki alel bireye aittir": multiAllele,
    "Bağlılıkta kromozom düzenini yaz": linkage,
    "Rekombinasyon yüzdesini dağıt": recombination,
    "Değişen fenotip alel ayrılmasını bozmaz": sameSegregation,
  },
  "kan-gruplari": {
    "AB0 bir lokus, üç yaygın alel": aboTable,
    "Antijen alyuvar, antikor plazmada": antigen,
    "Çaprazlamada antikoru gamete koyma": aboCrossFig,
    "İki sistemi birlikte hesaplarken": twoSystems,
  },
  "eseyin-belirlenmesi": {
    "Yumurta ile sperm kromozomları": gametes,
    "X ve Y bütünüyle homolog değildir": xy,
    "X’in anne-baba yolu": xRoute,
    "Koşullu olasılığı ayrı hesapla": xCond,
  },
};
