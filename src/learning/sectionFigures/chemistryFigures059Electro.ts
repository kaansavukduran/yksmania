import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { axes, box, curve, nf, pad, xtick, ytick } from "./physicsFigures058Kit";

/*
 * Forge059 AYT Kimya: pil gerilimi ve derişim pilleri. Daniell pilinde
 * Nernst eşitliği (25 °C, E = E° − (0,0592/n) log Q, E° = 1,10 V, n = 2),
 * Cu/Cu²⁺ derişim pili (seyreltik taraf anot) ve derişim oranıyla logaritmik
 * gerilim: E = (0,0592/2) log(c_derişik / c_seyreltik).
 */

/* ---------- pil-gerilimi-derisim-pilleri ---------- */

const nernst: FigureDef = {
  caption:
    "Sürgüyle Daniell pilinde Q = [Zn²⁺]/[Cu²⁺] oranını değiştir (25 °C, E° = 1,10 V, n = 2). E = E° − (0,0592/2)·log Q. Q = 1 iken E = E°; Q < 1 iken log Q negatif olduğundan E > E°; Q > 1 iken E < E°. Q = 1 denge demek değildir: dengede Q = K ve E = 0 olur.",
  alt: "Yatay eksen log Q (−3'ten 3'e), dikey eksen E (volt). Hafifçe aşağı eğimli doğru; log Q = 0'da E° = 1,10 V düzeyinde kesikli çizgi; sürgüyle kayan nokta.",
  param: { label: "log Q", min: -3, max: 3, step: 0.5, init: -1, unit: "" },
  draw: (lq) => {
    const E = (l: number) => 1.1 - 0.0296 * l;
    const X = (l: number) => 3.6 + l * 1.1;
    const Y = (e: number) => (e - 0.95) * 18;
    const els: El[] = [vec(v(X(-3.3), 0), v(X(3.4), 0), { tone: "ink", thin: true }), vec(v(X(0), 0), v(X(0), Y(1.22)), { tone: "ink", thin: true })];
    els.push(txt(v(X(3.4), 0), "log Q", "se", { tone: "ink", small: true }), txt(v(X(0), Y(1.22)), "E (V)", "n", { tone: "ink", small: true }));
    els.push(seg(v(X(-3), Y(E(-3))), v(X(3), Y(E(3))), { tone: "c", bold: true }));
    els.push(seg(v(X(-3), Y(1.1)), v(X(3), Y(1.1)), { tone: "muted", dash: true, thin: true }), txt(v(X(3), Y(1.1)), "E°", "e", { tone: "muted", small: true, bold: true }));
    for (const l of [-3, -2, -1, 1, 2, 3]) els.push(...xtick(X(l), 0, String(l).replace("-", "−")));
    els.push(...ytick(X(-3.3), Y(1.0), "1,00"), ...ytick(X(-3.3), Y(1.2), "1,20"), seg(v(X(-3.3), 0), v(X(-3.3), Y(1.22)), { tone: "muted", thin: true }));
    els.push(ball(v(X(lq), Y(E(lq))), 0.11, "warn"));
    els.push(...pad(X(-3.3) - 1.0, Y(1.27), X(3.4) + 1.0, -0.7));
    const e = E(lq);
    return {
      els,
      readout: [`Q = 10^(${nf(lq, 1)}) → E = 1,10 − 0,0296 · (${nf(lq, 1)}) = ${nf(e, 4)} V`, lq < 0 ? "Q < 1: E > E°." : lq > 0 ? "Q > 1: E < E°." : "Q = 1: E = E° (iyonlar 1 M olmak zorunda değil; oran 1)."],
    };
  },
};

const concCell: FigureDef = {
  caption:
    "İleri ile Cu/Cu²⁺ derişim pilini kur: sol kapta 0,010 M, sağ kapta 1,0 M Cu²⁺. İki yarı hücre aynı olduğundan E°hücre = 0; yine de derişimler farklıyken gerilim oluşur. Seyreltik taraf anottur (Cu → Cu²⁺), derişik taraf katottur (Cu²⁺ → Cu): iki derişim birbirine yaklaşır. E = (0,0592/2)·log(1,0/0,010) = 0,0592 V.",
  alt: "İki beher, ikisinde de bakır elektrot; solda yalnız çerçeveyle gösterilen seyreltik, sağda dolu renkli derişik Cu²⁺ çözeltisi. Üstte voltmetreli tel, arada tuz köprüsü. Adımlarda elektron oku soldan sağa ve yarı tepkimeler.",
  steps: ["Düzenek", "Anot ve katot", "Gerilim"],
  draw: (_v, step) => {
    const els: El[] = [];
    const beaker = (x: number, h: number, tone: Tone, label: string) => {
      els.push(poly([v(x, 2), v(x, 0), v(x + 2.2, 0), v(x + 2.2, 2)], { tone: "ink", open: true }));
      els.push(box(x + 0.05, 0.05, x + 2.15, 1.4, tone, h > 0.5));
      els.push(poly([v(x + 0.9, 0.3), v(x + 1.3, 0.3), v(x + 1.3, 2.8), v(x + 0.9, 2.8)], { tone: "warn", fill: "warn" }));
      els.push(txt(v(x + 1.1, 0), label, "s", { tone: "ink", small: true, bold: true }));
    };
    beaker(0, 0.2, "b", "Cu²⁺ 0,010 M");
    beaker(4.0, 1, "b", "Cu²⁺ 1,0 M");
    els.push(seg(v(1.1, 2.8), v(1.1, 3.6), { tone: "ink" }), seg(v(1.1, 3.6), v(2.75, 3.6), { tone: "ink" }), seg(v(3.45, 3.6), v(5.1, 3.6), { tone: "ink" }), seg(v(5.1, 3.6), v(5.1, 2.8), { tone: "ink" }));
    els.push(circle(v(3.1, 3.6), 0.35, { tone: "ink" }), txt(v(3.1, 3.6), "V", "c", { tone: "ink", small: true, bold: true }));
    els.push(poly([v(1.8, 0.8), v(1.8, 2.5), v(4.4, 2.5), v(4.4, 0.8), v(4.1, 0.8), v(4.1, 2.2), v(2.1, 2.2), v(2.1, 0.8)], { tone: "a", thin: true }));
    if (step >= 1) {
      els.push(vec(v(1.6, 3.85), v(2.6, 3.85), { tone: "c", bold: true }), vec(v(3.6, 3.85), v(4.6, 3.85), { tone: "c", bold: true }), txt(v(3.1, 4.0), "e⁻", "n", { tone: "c", small: true, bold: true }));
      els.push(txt(v(-0.1, 2.6), "anot (−)", "w", { tone: "ink", small: true }), txt(v(6.3, 2.6), "katot (+)", "e", { tone: "ink", small: true }));
    }
    if (step >= 2) els.push(txt(v(3.1, 1.1), "0,0592 V", "c", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-2.2, 4.6, 8.2, -0.9));
    const rows: [string, string][] = [
      ["Cu(k) | Cu²⁺(0,010 M) || Cu²⁺(1,0 M) | Cu(k). Metal ve iyon iki tarafta aynı.", "E°hücre = 0,34 − 0,34 = 0 V; fark yalnız derişimden gelir."],
      ["Seyreltik taraf anot: Cu → Cu²⁺ + 2e⁻ (iyon artar). Derişik taraf katot: Cu²⁺ + 2e⁻ → Cu (iyon azalır).", "Elektron dış devrede seyreltikten derişiğe akar; fark azaldıkça gerilim düşer."],
      ["E = (0,0592/2) · log(1,0 ÷ 0,010) = 0,0296 · 2 = 0,0592 V.", "Derişimler eşitlenince E = 0: net yön kalmaz."],
    ];
    return { els, readout: rows[step] };
  },
};

const ratio: FigureDef = {
  caption:
    "Sürgüyle derişik ve seyreltik Cu²⁺ derişimlerinin oranını değiştir. E = (0,0592/2)·log(oran): oran 10 iken 0,0296 V, 100 iken 0,0592 V. Bağıntı logaritmik olduğundan oranı iki katına çıkarmak gerilimi iki katına çıkarmaz. İki derişimi aynı oranla seyreltmek oranı ve E'yi değiştirmez.",
  alt: "Yatay eksen derişim oranı (1'den 100'e), dikey eksen E (V). Hızla yükselip yatıklaşan logaritmik eğri; 10 ve 100'de işaretler; sürgüyle kayan nokta.",
  param: { label: "c_derişik / c_seyreltik", min: 1, max: 100, step: 1, init: 10, unit: "" },
  draw: (r) => {
    const E = (x: number) => 0.0296 * Math.log10(x);
    const X = (x: number) => x * 0.075;
    const Y = (e: number) => e * 60;
    const els: El[] = [...axes(v(0, 0), X(108), Y(0.066), "oran", "E (V)")];
    els.push(poly(curve(E, 1, 100, 120, X, Y), { tone: "c", open: true, bold: true, smooth: true }));
    for (const x of [10, 50, 100]) els.push(...xtick(X(x), 0, String(x)));
    els.push(...ytick(0, Y(0.0296), "0,0296"), ...ytick(0, Y(0.0592), "0,0592"));
    els.push(seg(v(0, Y(0.0296)), v(X(10), Y(0.0296)), { tone: "muted", dash: true, thin: true }), seg(v(0, Y(0.0592)), v(X(100), Y(0.0592)), { tone: "muted", dash: true, thin: true }));
    els.push(ball(v(X(r), Y(E(r))), 0.11, "warn"));
    els.push(...pad(-1.3, Y(0.072), X(108) + 0.8, -0.7));
    return {
      els,
      readout: [`Oran ${r}: E = 0,0296 · log ${r} = ${nf(E(r), 4)} V`, 2 * r <= 100 ? `Oran iki katı (${2 * r}): ${nf(E(2 * r), 4)} V; fark yalnız 0,0296 · log 2 = 0,0089 V.` : "Oranı iki katına çıkarmak gerilime yalnız 0,0296 · log 2 = 0,0089 V ekler."],
    };
  },
};

export const chemistryFigures059Electro: Record<string, Record<string, FigureDef>> = {
  "pil-gerilimi-derisim-pilleri": {
    "Q’nun büyüklüğünden değişimin işaretini çıkar": nernst,
    "Aynı metalden de pil kurulabilir": concCell,
    "Gerilimin büyüklüğü derişim oranını izler": ratio,
  },
};
