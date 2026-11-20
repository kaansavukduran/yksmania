import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Katılar ve viskozite. Tanecik çizimleri şematiktir, ölçekli
 * değildir. ÖSYM bağı: 2020 TYT Fen 11 (yapılmış sınav, resmî cevap C;
 * 25 °C: metanol 0,544, su 0,890, etanol 1,074 mPa·s); çözüm özgündür.
 * A/B sıcaklık tablosu kurmaca öğretim verisidir, ölçüm değildir.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const f = (x: number, d = 3) => x.toFixed(d).replace(".", ",");

// 1 · Görünen cisim ile tanecik düzeni.
const ORDER = [
  { label: "Kristal", note: "Uzun mesafede tekrarlanan düzen; ideal saf kristalde belirgin erime sıcaklığı (ör. NaCl)." },
  { label: "Amorf", note: "Uzun erimli düzen yok; belirli bir aralıkta yumuşama görülebilir (ör. cam). Sertlik kristal kanıtı değildir." },
];
const order: FigureDef = {
  caption:
    "Görünen cisim ile tanecik düzeni ayrı şeylerdir. Bir düzen türüne tıkla: her nokta bir taneciğin kavramsal yeridir. Kristalde örüntü uzun mesafede tekrarlanır; amorfta yerel yakınlık var ama uzun erimli düzen yoktur.",
  alt: "Kare alanda tanecik noktaları: kristalde düzenli ızgara, amorfta düzensiz dağılım.",
  picks: ORDER.map((o) => ({ label: o.label, title: o.label, detail: [o.note] })),
  draw: (_v, _s, pick = -1) => {
    const amorf = pick === 1, els: El[] = [rect(0, 4, 0, 4, "muted", false)];
    const jitter = [0.12, -0.18, 0.2, -0.08, 0.15, -0.2, 0.05, 0.18, -0.12, -0.05, 0.22, -0.15, 0.08, -0.22, 0.17, 0.02];
    for (let i = 0; i < 6; i++)
      for (let j = 0; j < 6; j++) {
        const k = (i * 7 + j * 3) % 16, dx = amorf ? jitter[k] * 0.7 : 0, dy = amorf ? jitter[(k + 5) % 16] * 0.7 : 0;
        els.push(ball(v(0.45 + i * 0.62 + dx, 0.45 + j * 0.62 + dy), 0.16, amorf ? "warn" : "b"));
      }
    els.push(txt(v(2, -0.4), ORDER[amorf ? 1 : 0].label, "c", { small: true, bold: true, tone: "a" }));
    ORDER.forEach((o, i) => els.push(txt(v(4.6, 3.2 - i * 0.6), o.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 4.3), " ", "c"), txt(v(6.4, -0.7), " ", "c"));
    return { els, readout: [ORDER[amorf ? 1 : 0].note, "Şekil ölçekli değildir; tanecik büyüklüğü ya da bağ kuvveti göstermez."] };
  },
};

// 2 · Dört kristal türü.
const KINDS = [
  { label: "NaCl", kind: "iyonik", unit: "Na⁺ ve Cl⁻ iyonları", hold: "zıt yüklerin elektrostatik çekimi", cond: "katı iletmez; eriyik/çözelti iletir" },
  { label: "I₂", kind: "moleküler", unit: "ayrı I₂ molekülleri", hold: "moleküller arası London kuvvetleri (I–I bağı molekül içi)", cond: "iletmez" },
  { label: "Elmas", kind: "kovalent ağ", unit: "C atomları", hold: "üç boyutlu kovalent ağ", cond: "iletmez (grafit tabaka boyunca iletir)" },
  { label: "Zn", kind: "metalik", unit: "metal iyonları + yayılmış elektronlar", hold: "metalik bağ", cond: "katı iletir (hareketli elektron)" },
];
const kinds: FigureDef = {
  caption:
    "Aynı “kristal” sınıfı aynı tanecik ya da bağ demek değildir. Bir katıya tıkla: örgüyü oluşturan tür, bir arada tutan etkileşim ve katı hâldeki iletkenlik açılır. İyotta I–I bağı kovalenttir ama kristali tutan London kuvvetleridir; bu yüzden iyot moleküler kristaldir, elmas gibi kovalent ağ değildir.",
  alt: "Seçili katının şematik örgüsü: iyon ızgarası, molekül çiftleri, bağlı atom ağı ya da elektron denizi içinde iyonlar.",
  picks: KINDS.map((k) => ({ label: k.label, title: `${k.label}: ${k.kind}`, detail: [`Örgü: ${k.unit}.`, `Tutan: ${k.hold}.`, `İletkenlik: ${k.cond}.`] })),
  draw: (_v, _s, pick = -1) => {
    const p = pick >= 0 ? pick : 1, k = KINDS[p], els: El[] = [rect(0, 3.4, 0, 3.4, "muted", false)];
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        const x = 0.5 + i * 0.8, y = 0.5 + j * 0.8;
        if (p === 0) els.push(ball(v(x, y), (i + j) % 2 ? 0.24 : 0.16, (i + j) % 2 ? "c" : "warn"));
        else if (p === 1) els.push(ball(v(x - 0.14, y), 0.14, "warn"), ball(v(x + 0.14, y), 0.14, "warn"), seg(v(x - 0.14, y), v(x + 0.14, y), { tone: "ink" }));
        else if (p === 2) { els.push(ball(v(x, y), 0.12, "muted")); if (i < 3) els.push(seg(v(x, y), v(x + 0.8, y), { tone: "b" })); if (j < 3) els.push(seg(v(x, y), v(x, y + 0.8), { tone: "b" })); }
        else els.push(ball(v(x, y), 0.2, "c"), ball(v(x + 0.38, y + 0.38), 0.05, "b"));
      }
    els.push(txt(v(1.7, -0.4), `${k.label}: ${k.kind}`, "c", { small: true, bold: true, tone: "a" }));
    KINDS.forEach((kk, i) => els.push(txt(v(4.0, 3.0 - i * 0.6), kk.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 3.7), " ", "c"), txt(v(5.6, -0.7), " ", "c"));
    return { els, readout: [`${k.label}: ${k.unit}; tutan ${k.hold}.`, `İletkenlik (katı): ${k.cond}.`] };
  },
};

// 3 · 2020 TYT Fen 11.
const LIQ = [["metanol", 0.544], ["su", 0.89], ["etanol", 1.074]] as [string, number][];
const STMT = [
  { label: "I", title: "I: 25 °C’de en büyük viskozite etanolün → doğru", detail: ["1,074 > 0,890 > 0,544 mPa·s: akmaya en dirençli etanol."] },
  { label: "II", title: "II: metanolde moleküller arası çekim en güçlü → yanlış", detail: ["En küçük viskozite metanolde; veri bu yargıyı desteklemez. Viskozite yapıdan da etkilenir."] },
  { label: "III", title: "III: su (sıvı aralıkta) soğutulursa viskozite artar → doğru", detail: ["Sıvılarda sıcaklık düşünce viskozite genellikle artar."] },
];
const fen11: FigureDef = {
  caption:
    "2020 TYT Fen 11 (resmî kitapçık, cevap C): 25 °C’de metanol 0,544, su 0,890, etanol 1,074 mPa·s. Bir yargıya tıkla: çubuklar viskozite (akmaya direnç) sırasını gösterir. Yalnız I ve III doğru. Viskozite tablosundan yoğunluk ya da miktar okunmaz.",
  alt: "Üç yatay çubuk: metanol, su, etanol viskoziteleri; seçili yargıya göre vurgu.",
  picks: STMT,
  draw: (_v, _s, pick = -1) => {
    const k = 4, els: El[] = [];
    LIQ.forEach(([n, val], i) => {
      const y = 0.6 - i * 0.7, hi = (pick === 0 && n === "etanol") || (pick === 1 && n === "metanol") || (pick === 2 && n === "su");
      els.push(txt(v(-0.2, y), n, "w", { small: true, bold: true }), rect(0, val * k, y - 0.22, y + 0.22, hi ? "a" : "b"), txt(v(val * k + 0.15, y), `${f(val)} mPa·s`, "e", { small: true }));
    });
    STMT.forEach((s, i) => els.push(txt(v(i * 1.3, -1.4), s.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-1.6, 1.0), " ", "c"), txt(v(7.2, -1.7), " ", "c"));
    return { els, readout: [pick >= 0 ? STMT[pick].title + "." : "Bir yargıya tıkla.", "Sonuç: I ve III (C). mPa·s = milipaskal saniye; 1 Pa·s = 1000 mPa·s."] };
  },
};

// 4 · Tek değişkenli kıyas.
const DATA = { T: [20, 40, 60], A: [1.8, 1.2, 0.8], B: [2.4, 1.6, 1.1] };
const COMP = [
  { label: "Aynı sıvı, iki T", pts: [["A", 0], ["A", 1]] as [string, number][], ok: true, note: "A: 20 °C 1,8 → 40 °C 1,2 mPa·s; yalnız sıcaklık değişti, 1/3 azalma sıcaklığa bağlanır." },
  { label: "İki sıvı, aynı T", pts: [["A", 0], ["B", 0]] as [string, number][], ok: true, note: "20 °C’de B 2,4 > A 1,8: yalnız madde değişti; fark madde türüne bağlanır." },
  { label: "İkisi birden değişti", pts: [["A", 0], ["B", 2]] as [string, number][], ok: false, note: "A 20 °C ve B 60 °C: hem madde hem sıcaklık değişti; farkın nedeni tek başına seçilemez." },
];
const oneVar: FigureDef = {
  caption:
    "Sıcaklık ve yapı etkisini ayırmak için tek değişkenli kıyas gerekir (kurmaca A ve B verisi, ölçüm değil). Bir karşılaştırmaya tıkla: kıyaslanan iki nokta vurgulanır. Aynı sıvıda iki sıcaklık sıcaklık etkisini, aynı sıcaklıkta iki sıvı madde etkisini gösterir; ikisi birlikte değişirse neden seçilemez.",
  alt: "Sıcaklık–viskozite grafiği: A ve B için üçer nokta ve azalan çizgiler; seçili iki nokta vurgulu.",
  picks: COMP.map((c) => ({ label: c.label, title: `${c.label}: ${c.ok ? "geçerli" : "geçersiz"} kıyas`, detail: [c.note] })),
  draw: (_v, _s, pick = -1) => {
    const c = COMP[pick >= 0 ? pick : 2], sx = 0.12, sy = 1.3, X = (t: number) => (t - 10) * sx;
    const els: El[] = [vec(v(0, 0), v(X(68), 0), { thin: true }), vec(v(0, 0), v(0, 3.0 * sy), { thin: true }), txt(v(X(68), -0.75), "T (°C)", "c", { small: true }), txt(v(0.15, 3.0 * sy), "η (mPa·s)", "e", { small: true })];
    DATA.T.forEach((t) => els.push(txt(v(X(t), -0.35), String(t), "c", { small: true, tone: "muted" })));
    (["A", "B"] as const).forEach((s) => {
      const vals = DATA[s], tone: Tone = s === "A" ? "c" : "b";
      els.push(poly(DATA.T.map((t, i) => v(X(t), vals[i] * sy)), { open: true, tone, thin: true }));
      DATA.T.forEach((t, i) => els.push(ball(v(X(t), vals[i] * sy), 0.08, tone)));
      els.push(txt(v(X(60) + 0.2, vals[2] * sy), s, "e", { small: true, bold: true, tone }));
    });
    c.pts.forEach(([s, i]) => els.push(ball(v(X(DATA.T[i]), DATA[s as "A" | "B"][i] * sy), 0.16, c.ok ? "a" : "warn")));
    COMP.forEach((cc, i) => els.push(txt(v(0, -1.2 - i * 0.5), cc.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.8, 4.2), " ", "c"), txt(v(7.4, -2.4), " ", "c"));
    return { els, readout: [c.note, "Bilye deneyinde süre yalnız viskoziteye bağlı değildir (yoğunluk, çap); süre oranı η oranı sayılmaz."] };
  },
};

export const chemistryFiguresSolidsViscosity: Record<string, Record<string, FigureDef>> = {
  "katilar-viskozite": {
    "Görünen cisim ile tanecik düzeni": order,
    "Kovalent ağ ile moleküler kristal": kinds,
    "Viskoziteyi kontrollü deneyle gör": fen11,
    "Sıcaklık ve yapı: tek değişkenli kıyas": oneVar,
  },
};
