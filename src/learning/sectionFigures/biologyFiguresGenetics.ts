import { rod } from "./biologyFiguresMitosis";
import { circle, poly, seg, txt, v, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Kalıtıma giriş. Homologous chromosomes are drawn as capsules with coloured
 * locus bands; gamete trees list every gamete branch by branch; linked vs
 * independent genes are compared on chromosomes; a two-child probability tree
 * highlights the paths for "exactly one" and "at least one". School model:
 * complete dominance, one gene per locus, stated independence.
 */


/** Vertical chromosome at x with locus bands: [y, letter, tone]. */
function chromosome(x: number, y0: number, y1: number, tone: Tone, bands: [number, string, Tone][], label?: string, side: 1 | -1 = 1): El[] {
  const els: El[] = [rod(v(x, y0), v(x, y1), 0.55, tone)];
  for (const [y, s, t] of bands) {
    els.push(poly([v(x - 0.3, y - 0.12), v(x + 0.3, y - 0.12), v(x + 0.3, y + 0.12), v(x - 0.3, y + 0.12)], { tone: t, fill: t }));
    els.push(txt(v(x + 0.45 * side, y), s, side > 0 ? "e" : "w", { tone: t, bold: true }));
  }
  if (label) els.push(txt(v(x, Math.min(y0, y1) - 0.45), label, "s", { tone: "muted", small: true }));
  return els;
}

/* ---------- 1. Lokus ve alel ---------- */
const locus: FigureDef = {
  caption:
    "İleri ile homolog kromozom çiftini incele: biri anneden, biri babadan gelir ve aynı genleri aynı yerlerde (lokus) taşır. Aynı lokustaki iki harf, aynı genin iki sürümüdür (alel). A lokusu heterozigot (Aa), B lokusu homozigot (BB).",
  alt: "Yan yana iki dikey kromozom; aynı yüksekliklerde renkli bantlar. Üst bantlarda A ve a, alt bantlarda B ve B harfleri; aralarında aynı lokusu gösteren kesik çizgiler.",
  steps: ["Homolog çift", "Lokus", "Alel", "Homozigot / heterozigot"],
  draw: (_v, step) => {
    const els: El[] = [];
    const bands = (left: boolean): [number, string, Tone][] =>
      step >= 2
        ? [
            [1.6, left ? "A" : "a", left ? "warn" : "b"],
            [-0.8, "B", "c"],
          ]
        : step >= 1
          ? [
              [1.6, "", "muted"],
              [-0.8, "", "muted"],
            ]
          : [];
    els.push(...chromosome(-1.2, -2.4, 2.6, "a", bands(true), "anneden", -1), ...chromosome(1.2, -2.4, 2.6, "warn", bands(false), "babadan"));
    if (step >= 1) for (const y of [1.6, -0.8]) els.push(seg(v(-0.85, y), v(0.85, y), { tone: "muted", dash: true, thin: true }));
    if (step === 1) els.push(txt(v(0, 1.85), "aynı lokus", "n", { tone: "ink", small: true, bold: true }));
    if (step === 3) {
      els.push(txt(v(2.4, 1.6), "Aa → heterozigot", "e", { tone: "warn", small: true, bold: true }), txt(v(2.4, -0.8), "BB → homozigot", "e", { tone: "c", small: true, bold: true }));
    }
    els.push(txt(v(-3, 3.2), " ", "c"), txt(v(5.6, -3.3), " ", "c"));
    const rows: [string, string][] = [
      ["Diploit (2n) hücrede kromozomlar çiftler hâlindedir: biri anneden, biri babadan. Bu çift homolog kromozomdur.", "DNA bilgi molekülü, gen DNA'daki işlevsel birim, kromozom DNA + protein düzenidir."],
      ["Lokus, bir genin kromozom üzerindeki yeridir. Homologlarda aynı gen aynı lokustadır.", "Lokus bir adres, gen o adresteki bilgidir."],
      ["Alel, aynı genin farklı sürümüdür: A ve a. Her lokusta bir bireyde iki alel bulunur (biri her homologda).", "Gamet haploittir (n): her lokustan yalnız bir alel taşır."],
      ["AA ve aa homozigot, Aa heterozigottur. Bu bireyin genotipi AaBB.", "Tam baskınlıkta AA ile Aa aynı fenotipi gösterir: baskın görünüm kesin AA demek değildir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 2. Gamet ağacı ---------- */
const tree: FigureDef = {
  caption:
    "İleri ile AABbCc bireyinin gametlerini dal dal kur (genler bağımsız). A lokusu tek seçenek (A), B ve C lokusları ikişer seçenek verir. Uçlardaki her yol bir gamettir: 1 × 2 × 2 = 4. Kısa yol 2ʰ: h heterozigot çift sayısıdır (burada 2), toplam çift sayısı değil.",
  alt: "Soldan sağa dallanan ağaç: A'dan B ve b, her birinden C ve c dalları; sağ uçta ABC, ABc, AbC, Abc gametleri.",
  steps: ["A lokusu", "B lokusu", "C lokusu", "Gametler"],
  draw: (_v, step) => {
    const els: El[] = [];
    const root = v(0, 0);
    els.push(circle(root, 0.35, { tone: "warn", fill: "warn" }), txt(root, "A", "c", { tone: "warn", bold: true }));
    if (step >= 1) {
      const bs: [V, string][] = [
        [v(2.4, 1.6), "B"],
        [v(2.4, -1.6), "b"],
      ];
      for (const [p, s] of bs) {
        els.push(seg(v(0.35, 0), v(p[0] - 0.35, p[1]), { tone: "ink", thin: true }), circle(p, 0.35, { tone: "b", fill: "b" }), txt(p, s, "c", { tone: "b", bold: true }));
        els.push(txt(v(1.2, p[1] * 0.55 + (p[1] > 0 ? 0.25 : -0.25)), "1/2", "c", { tone: "muted", small: true }));
      }
      if (step >= 2) {
        const leaves: [V, V, string][] = [];
        for (const [p, s] of bs)
          for (const [dy, c] of [
            [0.8, "C"],
            [-0.8, "c"],
          ] as [number, string][])
            leaves.push([p, v(4.8, p[1] + dy), `A${s}${c}`]);
        leaves.forEach(([from, to, g]) => {
          els.push(seg(v(from[0] + 0.35, from[1]), v(to[0] - 0.35, to[1]), { tone: "ink", thin: true }), circle(to, 0.35, { tone: "c", fill: "c" }), txt(to, g.slice(-1), "c", { tone: "c", bold: true }));
          if (step >= 3) els.push(txt(v(5.4, to[1]), g, "e", { tone: "ink", bold: true }), txt(v(6.9, to[1]), "1/4", "e", { tone: "muted", small: true }));
        });
      }
    }
    els.push(txt(v(-0.8, 3.2), " ", "c"), txt(v(8, -3.6), " ", "c"));
    const rows: [string, string][] = [
      ["AA homozigot: her gamete A girer, tek seçenek.", "AaBBcc için 3 çift var diye 2³ yazma: yalnız Aa heterozigot, 2¹ = 2."],
      ["Bb heterozigot: gamete B ya da b girer, her biri 1/2.", "Mayozda homologlar ayrılır; çekinik alel kaybolmaz, a gameti de oluşur."],
      ["Cc heterozigot: her B/b dalı ikiye ayrılır.", "Bağımsızlık: genler farklı kromozomlarda (ya da öyle verilmiş)."],
      ["Dört gamet: ABC, ABc, AbC, Abc; her biri 1/4. Kısa yol: 2² = 4.", "Belirli bir gamet olasılığı: dallardaki olasılıkları çarp, ör. P(Abc) = 1 × 1/2 × 1/2 = 1/4."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 3. Bağımsız ve bağlı genler ---------- */
const linked: FigureDef = {
  caption:
    "İleri ile AaBb bireyini iki durumda karşılaştır. Genler farklı kromozomlardaysa (bağımsız) mayozda dört gamet çeşidi eşit olasılıkla oluşur. A ve B aynı kromozomda (AB/ab bağlı) ve krossing over yoksa yalnız AB ve ab oluşur. h = 2 olsa da 2² kuralı ancak bağımsızlıkta geçerlidir.",
  alt: "Solda iki ayrı homolog çift (A/a ve B/b) ve altında dört gamet; sağda tek homolog çift üzerinde AB ve ab birlikte, altında iki gamet.",
  steps: ["Bağımsız: 4 gamet", "Bağlı: 2 gamet"],
  draw: (_v, step) => {
    const els: El[] = [];
    const on = (i: number) => step === i;
    const t = (i: number, a: Tone): Tone => (on(i) ? a : "muted");
    // Independent: two homologous pairs.
    els.push(...chromosome(-5.2, -0.4, 2.4, t(0, "a"), [[1.6, "A", t(0, "warn")]], undefined, -1), ...chromosome(-4.2, -0.4, 2.4, t(0, "warn"), [[1.6, "a", t(0, "b")]]));
    els.push(...chromosome(-2.8, 0, 2.0, t(0, "a"), [[1.0, "B", t(0, "c")]], undefined, -1), ...chromosome(-1.8, 0, 2.0, t(0, "warn"), [[1.0, "b", t(0, "c")]]));
    ["AB", "Ab", "aB", "ab"].forEach((g, i) => {
      const p = v(-5.3 + i * 1.15, -1.8);
      els.push(circle(p, 0.45, { tone: t(0, "ink"), thin: !on(0) }), txt(p, g, "c", { tone: t(0, "ink"), small: true, bold: on(0) }));
    });
    els.push(txt(v(-3.6, -2.7), "bağımsız: 4 × 1/4", "s", { tone: t(0, "ink"), small: true, bold: on(0) }));
    // Linked: one homologous pair carrying both genes.
    els.push(...chromosome(1.6, -0.4, 2.6, t(1, "a"), [[1.9, "A", t(1, "warn")], [0.6, "B", t(1, "c")]], undefined, -1), ...chromosome(2.6, -0.4, 2.6, t(1, "warn"), [[1.9, "a", t(1, "b")], [0.6, "b", t(1, "c")]]));
    ["AB", "ab"].forEach((g, i) => {
      const p = v(1.5 + i * 1.3, -1.8);
      els.push(circle(p, 0.45, { tone: t(1, "ink"), thin: !on(1) }), txt(p, g, "c", { tone: t(1, "ink"), small: true, bold: on(1) }));
    });
    els.push(txt(v(2.1, -2.7), "bağlı, krossing over yok: 2 × 1/2", "s", { tone: t(1, "ink"), small: true, bold: on(1) }));
    els.push(txt(v(-6, 3.4), " ", "c"), txt(v(5, -3.3), " ", "c"));
    return {
      els,
      readout: on(0)
        ? ["Farklı kromozomlar: A/a ile B/b bağımsız ayrılır → AB, Ab, aB, ab, her biri 1/4.", "Soru “bağımsız” demiyorsa varsayımını açıkça yaz."]
        : ["Aynı kromozom (AB/ab): A ile B birlikte, a ile b birlikte gider → yalnız AB ve ab.", "Krossing over olursa Ab ve aB de oluşabilir; oranları ayrıca verilmelidir."],
    };
  },
};

/* ---------- 4. İki çocuk: olasılık ağacı ---------- */
const prob: FigureDef = {
  caption:
    "İleri ile Aa × Aa çiftinin iki bağımsız çocuğunu ağaçla incele. Her çocukta aa = 1/4, aa değil = 3/4. Aynı yoldaki olasılıklar çarpılır, ayrı yollar toplanır: tam bir aa = 3/16 + 3/16 = 3/8; en az bir aa = 1 − 9/16 = 7/16.",
  alt: "İki basamaklı olasılık ağacı: ilk çocuk aa (1/4) ya da değil (3/4), her dalda ikinci çocuk için aynı iki dal; dört uçta 1/16, 3/16, 3/16, 9/16; adımlarda ilgili uçlar vurgulanıyor.",
  steps: ["Ağacı kur", "İkisi de aa", "Tam biri aa", "En az biri aa"],
  draw: (_v, step) => {
    const els: El[] = [];
    const leaves = [
      { path: ["aa", "aa"], p: "1/16", y: 2.4 },
      { path: ["aa", "değil"], p: "3/16", y: 0.8 },
      { path: ["değil", "aa"], p: "3/16", y: -0.8 },
      { path: ["değil", "değil"], p: "9/16", y: -2.4 },
    ];
    const hl = (i: number) => (step === 1 ? i === 0 : step === 2 ? i === 1 || i === 2 : step === 3 ? i !== 3 : false);
    const first: [V, string, string][] = [
      [v(2.4, 1.6), "aa", "1/4"],
      [v(2.4, -1.6), "değil", "3/4"],
    ];
    const root = v(0, 0);
    els.push(circle(root, 0.18, { tone: "ink", fill: "ink" }));
    first.forEach(([p, s, pr]) => {
      els.push(seg(root, v(p[0] - 0.5, p[1]), { tone: "ink", thin: true }), txt(v(p[0] - 0.4, p[1]), s, "e", { tone: s === "aa" ? "warn" : "c", bold: true }), txt(v(1.0, p[1] * 0.5 + (p[1] > 0 ? 0.3 : -0.3)), pr, "c", { tone: "muted", small: true }));
    });
    leaves.forEach((l, i) => {
      const from = first[i < 2 ? 0 : 1][0];
      const to = v(6.4, l.y);
      const on = hl(i);
      els.push(seg(v(from[0] + 1.5, from[1]), v(to[0] - 0.5, to[1]), { tone: on ? "warn" : "ink", thin: !on, bold: on }));
      els.push(txt(v(to[0] - 0.4, to[1]), l.path[1], "e", { tone: l.path[1] === "aa" ? "warn" : "c", bold: true }));
      els.push(txt(v(5.0, (from[1] + to[1]) / 2 + (l.path[1] === "aa" ? 0.3 : -0.3)), l.path[1] === "aa" ? "1/4" : "3/4", "c", { tone: "muted", small: true }));
      els.push(txt(v(8.4, to[1]), l.p, "e", { tone: on ? "warn" : "ink", bold: on }));
    });
    els.push(txt(v(1.2, 3.2), "1. çocuk", "c", { tone: "muted", small: true }), txt(v(5.4, 3.2), "2. çocuk", "c", { tone: "muted", small: true }));
    els.push(txt(v(-0.6, 3.6), " ", "c"), txt(v(10, -3), " ", "c"));
    const rows: [string, string][] = [
      ["Her doğum bağımsız: aa = 1/4, aa değil (AA ya da Aa) = 3/4. Uç olasılıkları dallar çarpılarak bulunur.", "Dört uç toplamı 1/16 + 3/16 + 3/16 + 9/16 = 1."],
      ["İkisi de aa: 1/4 × 1/4 = 1/16 (tek yol, çarpma).", "Oran 1/4 olsa da dört çocukta kesin bir aa olacağı garanti değildir."],
      ["Tam biri aa: iki ayrı yol (aa–değil, değil–aa) → 3/16 + 3/16 = 3/8.", "Kısa yol 2 × 1/4 × 3/4: yalnız sıra simetrik ve bağımsızken."],
      ["En az biri aa: hiç olmama 9/16 → 1 − 9/16 = 7/16 (ya da 1/16 + 6/16).", "“Tam biri” ile “en az biri” farklı olaylardır."],
    ];
    return { els, readout: rows[step] };
  },
};

export const biologyFiguresGenetics: Record<string, Record<string, FigureDef>> = {
  "kalitima-giris": {
    "Lokus yer, alel sürümdür": locus,
    "Bağımsız gametleri tek tek kur": tree,
    "Bağlı gen koşulunu görmezden gelme": linked,
    "Çarpma, toplama ve kesinlik": prob,
  },
};
