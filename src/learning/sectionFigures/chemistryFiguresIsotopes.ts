import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { bohr, shellsOf } from "./chemistryFiguresShells";

/*
 * TYT Kimya · İzotop, izoton, izobar, izoelektronik. Z–n grafiği ve sayımlar
 * özgün öğretim verisidir (doğal bolluk ya da kararlılık iddiası taşımaz).
 * ÖSYM bağı: 2023 TYT Fen 9 (yapılmış sınav, resmî cevap B); çözüm özgündür.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });

// 1 · Z–n grafiği.
const PTS = [
  { s: "U", z: 6, n: 6 },
  { s: "V", z: 6, n: 8 },
  { s: "W", z: 7, n: 7 },
  { s: "T", z: 8, n: 6 },
];
const LINES = [
  { label: "İzotop: aynı Z (dikey)", on: ["U", "V"], detail: ["U ve V aynı dikey çizgide: Z = 6, n = 6 ve 8 farklı.", "Aynı element, farklı nötron."] },
  { label: "İzoton: aynı n (yatay)", on: ["U", "T"], detail: ["U ve T aynı yatay çizgide: n = 6, Z = 6 ve 8 farklı.", "Farklı elementler; A da farklı (12 ve 14)."] },
  { label: "İzobar: aynı A (Z + n = 14)", on: ["V", "W", "T"], detail: ["V, W, T aynı çapraz çizgide: Z + n = 14.", "Farklı elementler; U’nun A’sı 12, bu çizgide değil."] },
];
const zn: FigureDef = {
  caption:
    "Yatay eksen proton sayısı Z, düşey eksen nötron sayısı n (eksenler 5’ten başlar, aralıklar 1 adet). Bir ilişkiye tıkla: dikey çizgi aynı Z (izotop), yatay çizgi aynı n (izoton), Z + n sabit çapraz çizgi aynı A (izobar). Elektron verisi olmadan izoelektronik hakkında karar verilmez.",
  alt: "Z–n koordinat düzleminde U(6,6), V(6,8), W(7,7), T(8,6) noktaları; seçilen ilişkinin çizgisi vurgulu.",
  picks: LINES.map((l) => ({ label: l.label.split(":")[0], title: l.label, detail: l.detail })),
  draw: (_v, _s, pick = -1) => {
    const k = 0.8, X = (z: number) => (z - 5) * k, Y = (n: number) => (n - 5) * k;
    const els: El[] = [vec(v(0, 0), v(X(9.5), 0), { thin: true }), vec(v(0, 0), v(0, Y(9.5)), { thin: true }), txt(v(X(9.5), -0.35), "Z", "c", { small: true, bold: true }), txt(v(-0.3, Y(9.5)), "n", "c", { small: true, bold: true })];
    for (let i = 5; i <= 9; i++) els.push(txt(v(X(i), -0.35), String(i), "c", { small: true, tone: "muted" }), txt(v(-0.3, Y(i)), String(i), "c", { small: true, tone: "muted" }));
    const L = pick >= 0 ? LINES[pick] : null;
    if (pick === 0) els.push(seg(v(X(6), Y(5.2)), v(X(6), Y(9)), { tone: "a", bold: true }));
    if (pick === 1) els.push(seg(v(X(5.2), Y(6)), v(X(9), Y(6)), { tone: "a", bold: true }));
    if (pick === 2) els.push(seg(v(X(5.5), Y(8.5)), v(X(8.7), Y(5.3)), { tone: "a", bold: true, dash: true }), txt(v(X(8.8) + 0.15, Y(5.3)), "A = 14", "e", { small: true, bold: true, tone: "a" }));
    PTS.forEach((p) => {
      const on = L?.on.includes(p.s);
      els.push(ball(v(X(p.z), Y(p.n)), 0.13, on ? "a" : "b"), txt(v(X(p.z) + 0.3, Y(p.n) + 0.25), `${p.s} (A ${p.z + p.n})`, "e", { small: true, bold: on, tone: on ? "a" : "ink" }));
    });
    LINES.forEach((l, i) => els.push(txt(v(-0.2 + i * 1.6, -1.1), l.label.split(":")[0], "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.7, Y(9.8)), " ", "c"), txt(v(X(10.8), -1.4), " ", "c"));
    return { els, readout: [L ? L.detail[0] : "Bir ilişkiye tıkla.", "Kanıt noktaların koordinatlarıdır; renk değil."] };
  },
};

// 2 · Sistemli çift seçimi.
const ATOMS = [{ s: "U", A: 14, Z: 6 }, { s: "V", A: 15, Z: 7 }, { s: "W", A: 14, Z: 7 }];
const PAIRS = [
  { a: "U–V", rel: "izoton", why: "n = 8 ve 8 aynı; Z 6 ve 7 farklı." },
  { a: "V–W", rel: "izotop", why: "Z = 7 aynı; A 15 ve 14 (n 8 ve 7) farklı." },
  { a: "U–W", rel: "izobar", why: "A = 14 aynı; Z 6 ve 7 farklı (n 8 ve 7)." },
];
const table: FigureDef = {
  caption:
    "İsimden önce tablo kur: her taneciğin Z, A ve n = A − Z değerini aynı satıra yaz, sonra çiftleri tek tek karşılaştır. Bir çifte tıkla: hangi sayının aynı, hangisinin farklı olduğu ve ilişkinin adı açılır.",
  alt: "Üç satırlık tablo: U (A 14, Z 6, n 8), V (A 15, Z 7, n 8), W (A 14, Z 7, n 7); altında üç çift etiketi.",
  picks: PAIRS.map((p) => ({ label: p.a, title: `${p.a}: ${p.rel}`, detail: [p.why, "Önce eşitliği, sonra gerekli farklılığı kontrol et."] })),
  draw: (_v, _s, pick = -1) => {
    const on = pick >= 0 ? PAIRS[pick].a.split("–") : [];
    const els: El[] = [txt(v(0, 0.6), "tanecik", "c", { small: true, tone: "muted" }), txt(v(1.4, 0.6), "A", "c", { small: true, tone: "muted" }), txt(v(2.4, 0.6), "Z", "c", { small: true, tone: "muted" }), txt(v(3.4, 0.6), "n = A − Z", "c", { small: true, tone: "muted" })];
    ATOMS.forEach((t, i) => {
      const y = -i * 0.7, sel = on.includes(t.s);
      if (sel) els.push(rect(-0.5, 4.3, y - 0.28, y + 0.28, "a"));
      els.push(txt(v(0, y), t.s, "c", { small: true, bold: true }), txt(v(1.4, y), String(t.A), "c", { small: true }), txt(v(2.4, y), String(t.Z), "c", { small: true }), txt(v(3.4, y), String(t.A - t.Z), "c", { small: true }));
    });
    PAIRS.forEach((p, i) => els.push(txt(v(-0.2 + i * 1.6, -2.3), p.a, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    if (pick >= 0) els.push(txt(v(5.0, -0.7), `→ ${PAIRS[pick].rel}`, "e", { bold: true, tone: "a" }));
    els.push(txt(v(-0.7, 1.0), " ", "c"), txt(v(6.8, -2.6), " ", "c"));
    return { els, readout: [pick >= 0 ? PAIRS[pick].why : "Bir çifte tıkla.", "Bir çift aynı anda hem çekirdek hem elektron ilişkisi taşıyabilir; ikisini ayrı sütunda yaz."] };
  },
};

// 3 · 2023 TYT Fen 9.
const Q1 = ["Veri", "n(Y) = 23 − 11", "İzoton: n(X) = 12", "A(X) = 12 + 12 = 24", "Önermeler"];
const fen9: FigureDef = {
  caption:
    "2023 TYT Fen 9 (resmî kitapçık, cevap B) özgün özet: Z(X) = 12; Y için A = 23, Z = 11; X ile Y izoton. Adımları ilerlet: önce Y’nin nötronunu bul, izotonluktan X’in nötronuna geç, sonra A’yı kur; en son üç önermeyi ayrı ayrı denetle.",
  alt: "Alt alta hesap satırları; son adımda üç önermenin doğru/yanlış işaretleri.",
  steps: Q1,
  draw: (_v, step) => {
    const lines = ["X: Z = 12 · Y: A = 23, Z = 11", "n(Y) = 23 − 11 = 12", "izoton → n(X) = 12", "A(X) = 12 + 12 = 24"];
    const els: El[] = [];
    for (let i = 0; i <= Math.min(step, 3); i++) els.push(txt(v(0, -i * 0.65), lines[i], "e", { small: true, bold: i === step, tone: i === step ? "a" : "muted" }));
    if (step === 4) {
      [["I · A(X) = 23", "✗ (24)", "warn"], ["II · ²⁶₁₂X ile izotop", "✓ (Z aynı, A farklı)", "b"], ["III · X ile Y⁺ aynı e⁻", "✗ (12 ve 10)", "warn"]].forEach(([a, b, t], i) => {
        const y = -2.8 - i * 0.6;
        els.push(txt(v(0, y), a, "e", { small: true, bold: true }), txt(v(3.4, y), b, "e", { small: true, bold: true, tone: t as Tone }));
      });
      els.push(txt(v(0, -4.7), "Yalnız II → B", "e", { small: true, bold: true, tone: "a" }));
    }
    els.push(txt(v(-0.3, 0.5), " ", "c"), txt(v(6.6, -5.0), " ", "c"));
    return { els, readout: [step < 4 ? `${Q1[step]}.` : "I yanlış (A = 24), II doğru, III yanlış (nötr X 12 e⁻, Y⁺ 10 e⁻): B.", "n eşitliğini e eşitliği sanma: izotonluk çekirdek, izoelektroniklik elektron ilişkisidir."] };
  },
};

// 4 · İzoelektronik: sayı ve dizilim.
const ISO = [
  { label: "F⁻", z: 9, q: -1, A: 19 },
  { label: "Ne", z: 10, q: 0, A: 20 },
  { label: "Na⁺", z: 11, q: 1, A: 21 },
  { label: "Cl⁻", z: 17, q: -1, A: 35 },
];
const isoe: FigureDef = {
  caption:
    "İzoelektronik: elektron sayısı ve elektron dizilimi aynı tanecikler. Bir taneciğe tıkla: e = Z − q ile elektron sayısı ve temel hâl dağılımı çizilir. F⁻, Ne ve Na⁺ 10 elektron (2,8) taşır; Cl⁻ 18 elektronla (2,8,8) bu gruba girmez. Çekirdek yükleri ve tanecik yükleri farklıdır.",
  alt: "Seçilen taneciğin şematik katman diyagramı; yanında p, n, e değerleri; altında dört tanecik etiketi.",
  picks: ISO.map((t) => ({ label: t.label, title: `${t.label}: ${t.z - t.q} elektron`, detail: [`p = ${t.z}, n = ${t.A - t.z}, e = ${t.z} − (${t.q > 0 ? "+" : t.q < 0 ? "−" : ""}${Math.abs(t.q)}) = ${t.z - t.q}.`, `Dağılım ${shellsOf(t.z - t.q).join(",")}.`, t.z === 17 ? "18 elektron: ilk üçüyle izoelektronik değil." : "F⁻, Ne, Na⁺ ikişerli izoton da (n = 10)."] })),
  draw: (_v, _s, pick = -1) => {
    const t = ISO[pick >= 0 ? pick : 0], e = t.z - t.q, sh = shellsOf(e);
    const els: El[] = [...bohr(0, 0, t.z, sh)];
    els.push(txt(v(2.4, 0.7), t.label, "e", { bold: true, tone: "a" }), txt(v(2.4, 0.1), `p ${t.z} · n ${t.A - t.z} · e ${e}`, "e", { small: true }), txt(v(2.4, -0.45), `dağılım ${sh.join(",")}`, "e", { small: true, tone: "b" }));
    ISO.forEach((tt, i) => els.push(txt(v(-1.6 + i * 1.3, -2.3), tt.label, "c", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-2.2, 2.2), " ", "c"), txt(v(5.4, -2.6), " ", "c"));
    return { els, readout: [`${t.label}: ${e} elektron, ${sh.join(",")}.`, "Aynı e sayısı tek başına yetmez: verilen elektronik durum (dizilim) da aynı olmalı."] };
  },
};

// 5 · İzobar: ΔZ = −Δn.
const isobar: FigureDef = {
  caption:
    "İzobarlarda kütle numarası A = Z + n sabittir. Başlangıç çekirdeği Z = 7, n = 7 (A = 14). Proton farkını değiştir: Z kaç artarsa n o kadar azalır; çubuğun toplam boyu değişmez. İzotonda ise n sabit kaldığı için ΔA = ΔZ olur.",
  alt: "İki yatay yığın çubuk: üstte başlangıç 7 proton + 7 nötron, altta seçilen farkla Z ve n değişmiş, toplam aynı uzunlukta.",
  param: { label: "ΔZ", min: -3, max: 3, step: 1, init: 1, unit: "", plain: true },
  draw: (dz) => {
    const u = 0.38, z2 = 7 + dz, n2 = 7 - dz;
    const bar = (y: number, z: number, n: number, label: string): El[] => [
      rect(0, z * u, y - 0.25, y + 0.25, "b"), rect(z * u, (z + n) * u, y - 0.25, y + 0.25, "c"),
      txt(v((z * u) / 2, y), `Z ${z}`, "c", { small: true, bold: true }), txt(v(z * u + (n * u) / 2, y), `n ${n}`, "c", { small: true, bold: true }),
      txt(v(14 * u + 0.25, y), label, "e", { small: true }),
    ];
    const els: El[] = [...bar(0.6, 7, 7, "A = 14"), ...bar(-0.6, z2, n2, "A = 14")];
    els.push(seg(v(14 * u, 1.0), v(14 * u, -1.0), { dash: true, thin: true, tone: "a" }));
    els.push(txt(v(0, -1.45), `ΔZ = ${dz > 0 ? "+" : dz < 0 ? "−" : ""}${Math.abs(dz)} → Δn = ${dz < 0 ? "+" : dz > 0 ? "−" : ""}${Math.abs(dz)}`, "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.3, 1.2), " ", "c"), txt(v(7.0, -1.8), " ", "c"));
    return { els, readout: [`İkinci çekirdek: Z = ${z2}, n = ${n2}, A = 14.`, dz === 0 ? "ΔZ = 0 ve A aynı: aynı çekirdek, izobar değil." : "İzobar: aynı A, farklı element."] };
  },
};

export const chemistryFiguresIsotopes: Record<string, Record<string, FigureDef>> = {
  "izotop-izoton-izobar": {
    "Z–n grafiğinde çizgilerin anlamını kur": zn,
    "Tablodan bütün çiftleri sistemli seç": table,
    "İzotonda kütle farkını bul": fen9,
    "İzoelektroniklikte elektron düzenini de kontrol et": isoe,
    "İzobarda proton ve nötron farkları ters yönlüdür": isobar,
  },
};
