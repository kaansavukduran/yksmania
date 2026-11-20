import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { SYM, bohr, shellsOf } from "./chemistryFiguresShells";

/*
 * TYT Kimya · Atom çapı karşılaştırma. Bulut çemberleri sıralamayı gösteren
 * şemalardır, ölçekli değildir; tek sayısal veri Li ve Cl için RSC kovalent
 * yarıçaplarıdır (1,30 Å ve 1,00 Å). ÖSYM bağı: 2017 TYT örnek kitapçığı
 * Fen 10 B seçeneği (örnek kitapçık, yapılmış sınav değil).
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const cloud = (x: number, y: number, r: number, tone: Tone): El => circle(v(x, y), r, { fill: tone, tone, thin: true });
const sup = (q: number) => (q === 0 ? "" : `${Math.abs(q) > 1 ? "⁰¹²³⁴"[Math.abs(q)] : ""}${q > 0 ? "⁺" : "⁻"}`);

// 1 · Karar sırası.
const CASES = [
  { a: "Aynı grup", b: "katman sayısı: aşağı indikçe büyür", tone: "b" as Tone, detail: ["Be < Mg < Ca: periyot 2, 3, 4 = katman 2, 3, 4.", "Yeni katman ve artan perdeleme dış elektronu uzaklaştırır."] },
  { a: "Aynı periyot", b: "proton çekimi: sağa gittikçe küçülür", tone: "b" as Tone, detail: ["Na > Mg > Al: katman sabit, proton 11 → 13.", "2017 TYT örnek Fen 10 B: B atomu F atomundan büyüktür (doğru ifade)."] },
  { a: "Atom ve kendi iyonu", b: "katyon küçük, anyon büyük", tone: "c" as Tone, detail: ["Proton sayısı sabit; yalnız elektron değişir.", "Na > Na⁺ (katman kaybı), Cl⁻ > Cl (itme artar)."] },
  { a: "Eş elektronlu seri", b: "proton çoksa küçük", tone: "c" as Tone, detail: ["O²⁻ > F⁻ > Na⁺ > Mg²⁺: hepsi 10 e⁻, proton 8, 9, 11, 12.", "Önce elektron sayılarının gerçekten eşit olduğunu doğrula."] },
  { a: "Farklı grup ve periyot", b: "oklar çatışabilir: veri iste", tone: "warn" as Tone, detail: ["Li (2. periyot, sol) ile Cl (3. periyot, sağ): aşağı ve sağa etkileri ters.", "RSC kovalent yarıçap: Li 130 pm > Cl 100 pm; “katman fazlaysa kesin büyük” yanlış."] },
];
const decide: FigureDef = {
  caption:
    "Kural seçmeden önce taneciklerin ilişkisini adlandır. Bir duruma tıkla: hangi ölçütün geçerli olduğu, örneği ve kuralın nerede durduğu açılır. Son satır, iki okun çatıştığı ve verinin gerektiği durumdur.",
  alt: "Beş satır: aynı grup, aynı periyot, atom ve kendi iyonu, eş elektronlu seri, farklı grup ve periyot; her birinin solunda renk çubuğu ve ölçütü.",
  picks: CASES.map((c) => ({ label: c.a, title: `${c.a}: ${c.b}`, detail: c.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    CASES.forEach((c, i) => {
      const y = -i * 1.4, sel = pick === i;
      els.push(rect(-0.32, -0.16, y - 0.85, y + 0.25, c.tone));
      els.push(txt(v(0, y), c.a, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(0.3, y - 0.58), c.b, "e", { small: true, tone: sel ? "a" : "c" }));
    });
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(5.6, -6.6), " ", "c"));
    return { els, readout: [pick >= 0 ? CASES[pick].detail[0] : "Bir duruma tıkla ya da aşağıdan seç.", "Sıra: tür (atom/iyon) → aynı grup → aynı periyot → eş elektronlu → kontrol."] };
  },
};

// 2 · Aynı grup: Be, Mg, Ca.
const GROUP = [{ z: 4 }, { z: 12 }, { z: 20 }];
const group: FigureDef = {
  caption:
    "2A grubunda periyodu değiştir: Be (2. periyot), Mg (3.), Ca (4.). Her yeni periyotta elektronlar yeni bir dış katmana yerleşir ve iç katmanlar dış elektronu perdeler; atom çapı büyür. Çemberler şematiktir.",
  alt: "Seçilen 2A elementinin şematik katman diyagramı; yanında üç elementin büyüyen bulut çemberleri.",
  param: { label: "Periyot", min: 2, max: 4, step: 1, init: 3, unit: "", plain: true },
  draw: (p) => {
    const g = GROUP[p - 2], sh = shellsOf(g.z);
    const els: El[] = [...bohr(0, 0, g.z, sh, sh.length - 1)];
    GROUP.forEach((gg, i) => {
      const r = 0.35 + i * 0.3, x = 3.4 + i * 1.9, on = i === p - 2;
      els.push(cloud(x, 0, r, on ? "a" : "muted"), txt(v(x, -1.5), SYM[gg.z], "c", { small: true, bold: on, tone: on ? "a" : "ink" }));
    });
    els.push(txt(v(5.3, 1.6), "şematik, ölçekli değil", "c", { small: true, tone: "muted" }));
    els.push(txt(v(-2.4, 2.4), " ", "c"), txt(v(8.0, -2.4), " ", "c"));
    return { els, readout: [`${SYM[g.z]}: ${sh.join(",")} → ${sh.length} katman.`, "Aynı grupta: Be < Mg < Ca. Kural yalnız aynı grup için güvenlidir."] };
  },
};

// 3 · Aynı periyot: Na → Cl.
const period: FigureDef = {
  caption:
    "3. periyotta atom numarasını Na’dan Cl’ye artır. Katman sayısı 3’te sabit kalırken çekirdekteki proton sayısı artar; aynı katmandaki elektronlar daha güçlü çekilir ve bulut küçülür. Çember boyu sıralamayı gösterir, ölçekli değildir.",
  alt: "Ortada çekirdek ve proton sayısı, çevresinde küçülen bulut çemberi; altta Na’dan Cl’ye küçülen yedi çember dizisi.",
  param: { label: "Atom numarası Z", min: 11, max: 17, step: 1, init: 11, unit: "", plain: true },
  draw: (z) => {
    const R = (zz: number) => 1.9 - (zz - 11) * 0.17;
    const els: El[] = [cloud(0, 0.4, R(z), "b"), ball(v(0, 0.4), 0.32, "warn"), txt(v(0, 0.4), `${z}+`, "c", { small: true, bold: true })];
    els.push(txt(v(2.4, 1.3), SYM[z], "e", { bold: true, tone: "a" }), txt(v(2.4, 0.7), `katman: 3 · proton: ${z}`, "e", { small: true }));
    for (let zz = 11; zz <= 17; zz++) {
      const x = -3 + (zz - 11) * 1.05, r = R(zz) * 0.22;
      els.push(cloud(x, -2.4, r, zz === z ? "a" : "muted"), txt(v(x, -3.0), SYM[zz], "c", { small: true, bold: zz === z, tone: zz === z ? "a" : "ink" }));
    }
    els.push(txt(v(-3.6, 2.5), " ", "c"), txt(v(4.8, -3.3), " ", "c"));
    return { els, readout: [`${SYM[z]}: 3 katman, ${z} proton.`, "Aynı periyotta Na > Mg > Al > Si > P > S > Cl; “atom numarası büyükse büyük” yanılgısını bu dizi çürütür."] };
  },
};

// 4 · Atom ve kendi iyonu.
const PAIRS = [
  { z: 11, q: 1 }, { z: 17, q: -1 }, { z: 12, q: 2 }, { z: 8, q: -2 },
];
const ion: FigureDef = {
  caption:
    "Atom ile kendi iyonunu yan yana koy. Bir çifte tıkla: proton sayısı sabit kalır; katyonda elektron (bazen bütün dış katman) gider ve tanecik küçülür, anyonda aynı katmana elektron eklenir, itme artar ve tanecik büyür.",
  alt: "Solda nötr atomun, sağda iyonunun şematik katman diyagramı; altında dört çift etiketi.",
  picks: PAIRS.map((p) => {
    const ion = `${SYM[p.z]}${sup(p.q)}`, big = p.q > 0 ? SYM[p.z] : ion;
    return {
      label: `${SYM[p.z]} / ${ion}`,
      title: `${SYM[p.z]} / ${ion}: ${big} daha büyük`,
      detail: [
        `${SYM[p.z]}: ${shellsOf(p.z).join(",")} → ${ion}: ${shellsOf(p.z - p.q).join(",")}.`,
        p.q > 0 ? (shellsOf(p.z).length > shellsOf(p.z - p.q).length ? "Katyon dış katmanını tamamen kaybetti." : "Katyonda aynı proton daha az elektronu çeker.") : "Anyonda katman sayısı aynı, elektron–elektron itmesi arttı.",
        `Proton sayısı ${p.z} değişmedi.`,
      ],
    };
  }),
  draw: (_v, _s, pick = -1) => {
    const p = PAIRS[pick >= 0 ? pick : 0], e = p.z - p.q;
    const els: El[] = [...bohr(-2.1, 0.3, p.z, shellsOf(p.z)), ...bohr(2.4, 0.3, p.z, shellsOf(e))];
    els.push(txt(v(-2.1, -2.0), `${SYM[p.z]} · ${shellsOf(p.z).join(",")}`, "c", { small: true, bold: true }));
    els.push(txt(v(2.4, -2.0), `${SYM[p.z]}${sup(p.q)} · ${shellsOf(e).join(",")}`, "c", { small: true, bold: true, tone: "a" }));
    els.push(vec(v(-0.35, 0.3), v(0.6, 0.3), { tone: "muted" }));
    PAIRS.forEach((pp, i) => els.push(txt(v(-3.4 + i * 2.1, -2.9), `${SYM[pp.z]} / ${SYM[pp.z]}${sup(pp.q)}`, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-4.0, 2.4), " ", "c"), txt(v(5.0, -3.2), " ", "c"));
    return { els, readout: [p.q > 0 ? `${SYM[p.z]} > ${SYM[p.z]}${sup(p.q)}: katyon küçük.` : `${SYM[p.z]}${sup(p.q)} > ${SYM[p.z]}: anyon büyük.`, "Farklı elementlerin iyonlarını yalnız yük işaretiyle sıralama."] };
  },
};

// 5 · Eş elektronlu seri.
const ISO = [7, 8, 9, 11, 12, 13];
const QS: Record<number, number> = { 7: -3, 8: -2, 9: -1, 11: 1, 12: 2, 13: 3 };
const iso: FigureDef = {
  caption:
    "N³⁻, O²⁻, F⁻, Na⁺, Mg²⁺, Al³⁺: hepsinde 10 elektron, dağılım 2,8. Bir taneciğe tıkla: elektron sayısı sabitken proton sayısı arttıkça aynı bulut daha sıkı tutulur ve tanecik küçülür. Çemberler sıralama şemasıdır.",
  alt: "Soldan sağa küçülen altı bulut çemberi; altlarında tanecik sembolü ve proton sayısı.",
  picks: ISO.map((z) => ({
    label: `${SYM[z]}${sup(QS[z])}`,
    title: `${SYM[z]}${sup(QS[z])}: ${z} proton, 10 elektron`,
    detail: [`e = ${z} − (${QS[z] > 0 ? "+" : "−"}${Math.abs(QS[z])}) = 10.`, z === 7 ? "Serinin en az protonlusu: en büyük." : z === 13 ? "Serinin en çok protonlusu: en küçük." : "Solundakinden küçük, sağındakinden büyük.", "F atomu (9 e⁻) seriye girmez: elektron sayısı eşit değil."],
  })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    ISO.forEach((z, i) => {
      const x = i * 1.35, r = 0.62 - i * 0.07, on = pick === i;
      els.push(cloud(x, 0, r, on ? "a" : "b"));
      els.push(txt(v(x, -0.95), `${SYM[z]}${sup(QS[z])}`, "c", { small: true, bold: true, tone: on ? "a" : "ink", pick: i }));
      els.push(txt(v(x, -1.5), `${z} p`, "c", { small: true, tone: "muted" }));
    });
    els.push(seg(v(0, 1.0), v(5 * 1.35, 1.0), { thin: true, tone: "muted" }), txt(v(2.5 * 1.35, 1.35), "10 e⁻ sabit · proton arttıkça küçülür", "c", { small: true, tone: "a" }));
    els.push(txt(v(-0.8, 1.8), " ", "c"), txt(v(7.6, -1.9), " ", "c"));
    return { els, readout: [pick >= 0 ? `${SYM[ISO[pick]]}${sup(QS[ISO[pick]])}: ${ISO[pick]} proton.` : "Bir taneciğe tıkla.", "N³⁻ > O²⁻ > F⁻ > Na⁺ > Mg²⁺ > Al³⁺."] };
  },
};

// 6 · Çatışan oklar: Li ve Cl.
const conflict: FigureDef = {
  caption:
    "Li 2. periyot 1. grupta, Cl 3. periyot 17. grupta. Adımları ilerlet: “aşağı = büyük” Cl’yi, “sol = büyük” Li’yi gösterir; iki ok çatışır. Aynı ölçüm tanımlı veri karar verir (RSC kovalent yarıçap). Çap ile yarıçapı karıştırma: d = 2r.",
  alt: "Küçük tablo parçasında Li ve Cl; adımlarda çatışan iki ok, sonra 130 ve 100 pm çubukları, sonra çaplar.",
  steps: ["İki ok", "Aynı ölçüt verisi", "Çap = 2 × yarıçap"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) {
      els.push(rect(0, 0.9, 0, 0.9, "b"), txt(v(0.45, 0.45), "Li", "c", { small: true, bold: true }));
      els.push(rect(4.5, 5.4, -1.1, -0.2, "b"), txt(v(4.95, -0.65), "Cl", "c", { small: true, bold: true }));
      els.push(vec(v(0.45, -0.2), v(0.45, -1.4), { tone: "warn" }), txt(v(0.6, -1.0), "aşağı: Cl büyük?", "e", { small: true, tone: "warn" }));
      els.push(vec(v(4.3, 0.45), v(1.1, 0.45), { tone: "a" }), txt(v(2.7, 0.8), "sol: Li büyük?", "c", { small: true, tone: "a" }));
    } else {
      const K = 0.03, d = step === 2 ? 2 : 1;
      [["Li", 130], ["Cl", 100]].forEach(([el, r], i) => {
        const y = -i * 0.9, val = (r as number) * d;
        els.push(txt(v(-0.2, y), el as string, "w", { small: true, bold: true }), rect(0, val * K * (step === 2 ? 0.5 : 1), y - 0.25, y + 0.25, i === 0 ? "a" : "b"));
        els.push(txt(v(val * K * (step === 2 ? 0.5 : 1) + 0.15, y), `${step === 2 ? "d" : "r"} = ${val} pm`, "e", { small: true }));
      });
      els.push(txt(v(0, 0.75), step === 2 ? "çap d = 2r (iki çubuk aynı oranda)" : "RSC kovalent yarıçap (aynı tanım)", "e", { small: true, tone: "muted" }));
    }
    els.push(txt(v(-0.8, 1.3), " ", "c"), txt(v(6.2, -1.6), " ", "c"));
    return {
      els,
      readout: [
        step === 0 ? "Farklı grup ve periyotta iki eğilim ters yöne çeker; tek okla kesin sıra çıkmaz." : step === 1 ? "Li 1,30 Å = 130 pm > Cl 1,00 Å = 100 pm: Li daha büyük." : "Li 260 pm, Cl 200 pm: ikisini 2 ile çarpmak sırayı değiştirmez; birinin çapını ötekinin yarıçapıyla kıyaslama.",
        "Kovalent, metalik ve van der Waals yarıçapları farklı tanımlardır; karıştırılmaz.",
      ],
    };
  },
};

export const chemistryFiguresRadius: Record<string, Record<string, FigureDef>> = {
  "atom-capi-karsilastirma": {
    "Önce hangi tanecikleri karşılaştırdığını sor": decide,
    "Aynı grupta yeni katman eklenir": group,
    "Aynı periyotta çekirdek yükü artar": period,
    "Kendi iyonunda proton sayısı sabit kalır": ion,
    "Eş elektronlu seride proton sayısını kullan": iso,
    "Bir çözümü iki ayrı yönden doğrula": conflict,
  },
};
