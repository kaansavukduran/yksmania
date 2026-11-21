import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { axes, box, curve, nf, pad, xtick, ytick } from "./physicsFigures058Kit";
import { at, atom, beaker, hbars, sci } from "./chemistryFigures060Kit";

/*
 * Forge060 AYT Kimya: çözeltiler ve denge hesapları. Sayılar bölüm metninden:
 * 18 g glikoz / 500 g su (0,200 molal), Raoult ve iki uçucu bileşen, S = 20
 * g/100 g su (10 / 20 / 35 g X), Henry, CO₂ / H₂O dipolleri, hidratasyon, üç
 * enerji adımı, 5,85 g NaCl = 0,10 mol, seyreltme ve örnek alma, 0,20 M CaCl₂,
 * 0,10 M Al₂(SO₄)₃, hidroliz haritası, Ka(CH₃COOH) = Kb(NH₃) = 1,8×10⁻⁵,
 * X₂ ⇌ 2X için 4x² + x − 1 = 0 (kökler 0,390388 ve −0,640388), Kp = Kc(RT)^Δn
 * (R = 0,08206) ve K dönüşümleri (49 → 7 → 1/7; 2 · 3 = 6).
 */

const KW = 1e-14;
const KA = 1.8e-5;

/** Kabın içine düzenli dağılmış n nokta (çözünen tanecikleri). */
function dots(x: number, y: number, w: number, h: number, n: number, tone: Tone, r = 0.09): El[] {
  const els: El[] = [];
  const cols = Math.max(1, Math.round(Math.sqrt((n * w) / Math.max(h, 0.01))));
  const rows = Math.ceil(n / cols);
  for (let i = 0; i < n; i++) {
    const c = i % cols;
    const rr = Math.floor(i / cols);
    els.push(circle(v(x + ((c + 0.5) * w) / cols, y + ((rr + 0.5) * h) / rows), r, { tone, fill: tone }));
  }
  return els;
}

/* ---------- ayt-molalite-koligatif ---------- */

const molality: FigureDef = {
  caption:
    "Sürgüyle su kütlesini değiştir; çözünen hep 18 g glikozdur (0,100 mol). Molalite = çözünen molü ÷ çözücünün kilogramı: paydada yalnız su vardır, çözeltinin tamamı ya da hacmi değil. 500 g suda 0,100 ÷ 0,500 = 0,200 molal. Son hacim verilmedikçe bu veriden molarite çıkmaz.",
  alt: "Solda su miktarına göre dolan bir kap ve içinde glikoz noktaları; sağda molalite değerini gösteren yatay çubuk.",
  param: { label: "Su kütlesi (g)", min: 250, max: 1000, step: 50, init: 500, unit: "g" },
  draw: (g) => {
    const kg = g / 1000;
    const els: El[] = [...beaker(0, 0, 2.2, 3.0, kg, "b"), ...dots(0.15, 0.15, 1.9, Math.max(0.3, 2.76 * kg - 0.2), 10, "warn")];
    els.push(txt(v(1.1, 0), `su ${nf(kg, 3)} kg`, "s", { tone: "ink", small: true, bold: true }), txt(v(1.1, 3.0), "glikoz 0,100 mol", "n", { tone: "warn", small: true, bold: true }));
    els.push(...hbars([{ label: "m", value: 0.1 / kg, tone: "c", text: `${nf(0.1 / kg, 3)} mol/kg` }], { x0: 3.6, y0: 1.5, w: 3.0, max: 0.4 }));
    els.push(...pad(-0.4, 3.7, 9.6, -0.8));
    return { els, readout: [`m = 0,100 mol ÷ ${nf(kg, 3)} kg = ${nf(0.1 / kg, 3)} mol/kg`, "Payda: kilogram çözücü (molalite) · litre son çözelti (molarite)."] };
  },
};

const particles: FigureDef = {
  caption:
    "İdeal tam ayrışma modelinde bir formül birimi kaç bağımsız tanecik verir? Glikoz molekül olarak kalır (1), NaCl bir Na⁺ ve bir Cl⁻ verir (2), MX₂ bir M²⁺ ve iki X⁻ verir (3). Van't Hoff çarpanı i bu ideal sayıdır; gerçek NaCl çözeltilerinde ölçülen değer tam 2 olmayabilir.",
  alt: "Üç kutu: glikozda bir tanecik, NaCl'de iki iyon, MX₂'de üç iyon; altlarında i değerleri.",
  draw: () => {
    const els: El[] = [];
    const sets: [string, [string, Tone][]][] = [
      ["glikoz", [["G", "c"]]],
      ["NaCl", [["Na⁺", "a"], ["Cl⁻", "b"]]],
      ["MX₂", [["M²⁺", "a"], ["X⁻", "b"], ["X⁻", "b"]]],
    ];
    sets.forEach(([name, ps], i) => {
      const x = i * 3.0;
      els.push(box(x, 0, x + 2.6, 1.6, "muted", false));
      ps.forEach(([s, tone], j) => atom(els, v(x + ((j + 0.5) * 2.6) / ps.length, 0.8), s, tone, 0.36));
      els.push(txt(v(x + 1.3, 1.6), name, "n", { tone: "ink", small: true, bold: true }), txt(v(x + 1.3, 0), `i = ${ps.length}`, "s", { tone: "warn", small: true, bold: true }));
    });
    els.push(...pad(-0.3, 2.4, 8.9, -0.8));
    return { els, readout: ["1 mol glikoz → 1 mol tanecik · 1 mol NaCl → 2 mol iyon · 1 mol MX₂ → 3 mol iyon.", "Dipte çözünmeden kalan katı tanecik sayısına eklenmez."] };
  },
};

const raoult: FigureDef = {
  caption:
    "Sürgüyle çözücünün mol kesrini değiştir. Uçucu olmayan çözünen ve ideal sıvı için P = X(çözücü) · P°: çözücünün buhar basıncı mol kesriyle orantılı düşer. Eksen saf çözücünün basıncına göre (P ÷ P°) çizildi. Yüzey alanı hızı etkiler, denge basıncını değil.",
  alt: "Yatay eksen çözücü mol kesri (0–1), dikey eksen P ÷ P°. Orijinden (1, 1)'e doğru; sürgüyle kayan nokta.",
  param: { label: "X (çözücü)", min: 0.5, max: 1, step: 0.05, init: 0.9, unit: "" },
  draw: (x) => {
    const X = (t: number) => t * 5;
    const Y = (t: number) => t * 3.2;
    const els: El[] = [...axes(v(0, 0), X(1.15), Y(1.2), "X(çözücü)", "P / P°")];
    els.push(seg(v(0, 0), v(X(1), Y(1)), { tone: "c", bold: true }));
    els.push(seg(v(X(x), 0), v(X(x), Y(x)), { tone: "muted", dash: true, thin: true }), seg(v(0, Y(x)), v(X(x), Y(x)), { tone: "muted", dash: true, thin: true }));
    els.push(ball(v(X(x), Y(x)), 0.11, "warn"));
    for (const t of [0.5, 1]) els.push(...xtick(X(t), 0, nf(t, 1)), ...ytick(0, Y(t), nf(t, 1)));
    els.push(...pad(-1.0, Y(1.3), X(1.15) + 1.6, -0.8));
    return { els, readout: [`P = ${nf(x, 2)} · P° (çözünenin mol kesri ${nf(1 - x, 2)})`, "Saf çözücüde X = 1, P = P°."] };
  },
};

const twoVolatile: FigureDef = {
  caption:
    "Sürgüyle sıvıdaki A mol kesrini değiştir. İdeal A–B karışımında P_A = X_A · P°_A ve P_B = X_B · P°_B; gaz fazındaki toplam basınç ikisinin toplamıdır (üstteki doğru). Çizimde P°_A > P°_B seçildi; ölçekli değil. Mol kesirleri sıvı fazındır, gaz fazının bileşimi farklı olabilir.",
  alt: "Yatay eksen X_A (0–1). Sıfırdan P°_A'ya yükselen P_A doğrusu, P°_B'den sıfıra inen P_B doğrusu ve ikisinin toplamı olan üst doğru; sürgüyle kayan düşey çizgi.",
  param: { label: "X_A (sıvı)", min: 0, max: 1, step: 0.1, init: 0.4, unit: "" },
  draw: (xa) => {
    const PA = 3.0;
    const PB = 1.4;
    const X = (t: number) => t * 5;
    const els: El[] = [...axes(v(0, 0), X(1.15), 3.6, "X_A", "P")];
    els.push(seg(v(0, 0), v(X(1), PA), { tone: "a", bold: true }), seg(v(0, PB), v(X(1), 0), { tone: "b", bold: true }), seg(v(0, PB), v(X(1), PA), { tone: "c", bold: true }));
    els.push(txt(v(X(1), PA), "P°_A", "e", { tone: "a", small: true, bold: true }), txt(v(0, PB), "P°_B", "w", { tone: "b", small: true, bold: true }));
    els.push(seg(v(X(xa), 0), v(X(xa), PB + (PA - PB) * xa), { tone: "muted", dash: true, thin: true }));
    els.push(ball(v(X(xa), PA * xa), 0.09, "a"), ball(v(X(xa), PB * (1 - xa)), 0.09, "b"), ball(v(X(xa), PB + (PA - PB) * xa), 0.1, "c"));
    els.push(txt(v(X(0.5), PB + (PA - PB) * 0.5 + 0.2), "toplam", "n", { tone: "c", small: true }));
    for (const t of [0, 1]) els.push(...xtick(X(t), 0, String(t)));
    els.push(...pad(-1.4, 4.0, X(1.15) + 1.6, -0.8));
    return { els, readout: [`P = ${nf(xa, 1)} · P°_A + ${nf(1 - xa, 1)} · P°_B`, "Çözünen uçucuysa katkısını sıfırlamak toplamı yanlış verir."] };
  },
};

const boilRise: FigureDef = {
  caption:
    "Kaynama, toplam buhar basıncı dış basınca ulaştığında başlar. Uçucu olmayan çözünen buhar basıncı eğrisini aşağı kaydırır (kesikli); aynı dış basınca ulaşmak için daha yüksek sıcaklık gerekir. Fark ΔTb = i · Kb · m'dir (seyreltik yaklaşım). Eğriler şematik, ölçekli değil.",
  alt: "Yatay eksen sıcaklık, dikey eksen buhar basıncı. Saf çözücü eğrisi ve onun altında çözelti eğrisi; yatay dış basınç çizgisini farklı sıcaklıklarda kesiyorlar, aradaki fark ΔTb.",
  draw: () => {
    const f = (t: number) => 0.25 * Math.exp(t * 0.5);
    const g = (t: number) => 0.6 * f(t);
    const P = 2.6;
    const t1 = Math.log(P / 0.25) / 0.5;
    const t2 = Math.log(P / 0.25 / 0.6) / 0.5;
    const els: El[] = [...axes(v(0, 0), 7.6, 3.4, "T", "P_buhar")];
    els.push(poly(curve(f, 0, 5.2, 50, (t) => t, (y) => y), { tone: "a", open: true, bold: true, smooth: true }));
    els.push(poly(curve(g, 0, 6.0, 50, (t) => t, (y) => y), { tone: "b", open: true, dash: true, smooth: true }));
    els.push(seg(v(0, P), v(6.6, P), { tone: "muted", dash: true }), txt(v(6.6, P), "P_dış", "e", { tone: "ink", small: true, bold: true }));
    els.push(seg(v(t1, 0), v(t1, P), { tone: "a", thin: true }), seg(v(t2, 0), v(t2, P), { tone: "b", thin: true }));
    els.push(txt(v(t1, 0), "saf", "sw", { tone: "a", small: true, bold: true }), txt(v(t2, 0), "çözelti", "se", { tone: "b", small: true, bold: true }));
    els.push(vec(v(t1, 1.0), v(t2, 1.0), { tone: "warn", bold: true }), txt(v((t1 + t2) / 2, 1.05), "ΔTb", "n", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-0.6, 3.9, 8.6, -0.8));
    return { els, readout: ["Kaynama: P_buhar = P_dış. Çözeltide bu eşitlik daha yüksek T'de.", "ΔTb = i · Kb · m; kaynarken su kaybı bileşimi değiştirebilir."] };
  },
};

/* ---------- ayt-cozunurluk ---------- */

function satPicture(total: number, water: number, s: number): El[] {
  const cap = (water * s) / 100;
  const dis = Math.min(total, cap);
  const solid = Math.max(0, total - cap);
  const els: El[] = [...beaker(0, 0, 2.4, 3.0, Math.min(1, water / 250), "b")];
  els.push(...dots(0.2, 0.55, 2.0, Math.max(0.3, 2.76 * Math.min(1, water / 250) - 0.7), Math.round(dis / 2.5), "a", 0.08));
  if (solid > 0) els.push(box(0.1, 0.08, 2.3, 0.08 + Math.min(0.5, solid * 0.025), "warn"));
  els.push(...hbars(
    [
      { label: "kapasite", value: cap, tone: "muted", text: `${nf(cap, 1)} g`, hollow: true },
      { label: "çözünmüş", value: dis, tone: "a", text: `${nf(dis, 1)} g` },
      { label: "dipte katı", value: solid, tone: "warn", text: `${nf(solid, 1)} g` },
    ],
    { x0: 5.4, y0: 2.4, w: 2.6, max: 50, gap: 0.9 },
  ));
  els.push(...pad(-0.4, 3.4, 10.6, -0.4));
  return els;
}

const saturation: FigureDef = {
  caption:
    "Sürgüyle 100 g suya konan toplam X miktarını değiştir (S = 20 g X / 100 g su, bölüm tablosu). Kapasitenin altında çözelti doymamıştır; tam sınırda doymuştur (berrak da olabilir); fazlası dipte ayrı katı faz olarak kalır ve sıvı yine doymuştur.",
  alt: "Solda kap: çözünmüş X noktaları ve gerekiyorsa dipte katı tabaka. Sağda kapasite, çözünmüş ve dipte katı çubukları.",
  param: { label: "Toplam X (g)", min: 0, max: 40, step: 5, init: 10, unit: "g" },
  draw: (t) => {
    const state = t < 20 ? "doymamış" : t === 20 ? "doymuş (katı yok)" : "doymuş + dipte katı";
    return { els: satPicture(t, 100, 20), readout: [`Toplam ${t} g: çözünmüş ${Math.min(t, 20)} g, katı ${Math.max(0, t - 20)} g → ${state}.`, "Doymuş–doymamış ile derişik–seyreltik aynı sınıflama değildir."] };
  },
};

const evaporate: FigureDef = {
  caption:
    "Sürgüyle su miktarını değiştir; kapta toplam 35 g X var (S = 20 g / 100 g su). Kapasite su miktarıyla orantılıdır: kapasite = su · 20 ÷ 100 (250 g suda 50 g). Su buharlaşınca kapasite azalır ve katı ayrılabilir; su eklenince katı çözünebilir. Aynı sıcaklıkta S değeri değişmez.",
  alt: "Kapta su düzeyi sürgüyle değişiyor; sağdaki çubuklar kapasite, çözünmüş miktar ve dipte kalan katıyı gösteriyor.",
  param: { label: "Su (g)", min: 50, max: 250, step: 25, init: 100, unit: "g" },
  draw: (w) => ({ els: satPicture(35, w, 20), readout: [`Kapasite = ${w} · 20 ÷ 100 = ${nf(w * 0.2, 1)} g; çözünmüş ${nf(Math.min(35, w * 0.2), 1)} g, katı ${nf(Math.max(0, 35 - w * 0.2), 1)} g.`, "Suyu iki katına çıkarmak toplam kapasiteyi iki katına çıkarır; S aynı kalır."] }),
};

const henry: FigureDef = {
  caption:
    "Sürgüyle gazın sıvı üstündeki kısmi basıncını değiştir. Sabit sıcaklıkta, tepkime vermeyen seyreltik gaz için Henry yaklaşımı C = kH · P_gaz: doğru orijinden geçer. Basınç P₀'ın katı olarak verildi; kH gazın kimliğini, sıcaklığı ve çözücüyü içerir. Toplam basıncı artırmak ilgili gazın kısmi basıncını değiştirmezse aynı sonucu vermez.",
  alt: "Yatay eksen gazın kısmi basıncı (P₀ katları), dikey eksen çözünmüş derişim. Orijinden geçen doğru ve sürgüyle kayan nokta.",
  param: { label: "P_gaz (P₀ katı)", min: 0.5, max: 4, step: 0.5, init: 1, unit: "" },
  draw: (p) => {
    const X = (t: number) => t * 1.4;
    const Y = (t: number) => t * 0.8;
    const els: El[] = [...axes(v(0, 0), X(4.6), Y(4.6), "P_gaz", "C")];
    els.push(seg(v(0, 0), v(X(4.2), Y(4.2)), { tone: "c", bold: true }));
    els.push(seg(v(X(p), 0), v(X(p), Y(p)), { tone: "muted", dash: true, thin: true }), ball(v(X(p), Y(p)), 0.1, "warn"));
    for (const t of [1, 2, 4]) els.push(...xtick(X(t), 0, `${t}P₀`), ...ytick(0, Y(t), `${t}C₀`));
    els.push(...pad(-1.2, Y(5.0), X(4.6) + 1.2, -0.8));
    return { els, readout: [`P = ${nf(p, 1)}P₀ → C = ${nf(p, 1)}C₀ (C₀ = kH · P₀).`, "Isınınca çoğu gazın kH değeri küçülür; CO₂ gibi tepkime verenlerde ayrıca dikkat."] };
  },
};

/* ---------- ayt-cozucu-cozunen ---------- */

const dipoles: FigureDef = {
  caption:
    "İleri ile CO₂ ve H₂O'yu karşılaştır. İkisinde de bağlar kutupludur; dipol okları kısmi negatif O'ya bakar. Doğrusal ve simetrik CO₂'de iki eş C=O dipolü zıt yönlüdür ve toplamı sıfırdır. Eğik suda dipoller birbirini yok etmez; net dipol O tarafına yönelir. Açılar şematik.",
  alt: "Birinci adımda doğrusal O=C=O, iki zıt yönlü dipol oku, net sıfır. İkinci adımda eğik H–O–H, iki dipol oku O'ya doğru ve kalın net dipol oku.",
  steps: ["CO₂", "H₂O"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) {
      const o1 = v(-1.6, 0);
      const c = v(0, 0);
      const o2 = v(1.6, 0);
      for (const o of [o1, o2]) for (const k of [-0.1, 0.1]) els.push(seg(v(c[0], k), v(o[0], k), { tone: "ink" }));
      atom(els, o1, "O", "c", 0.34);
      atom(els, o2, "O", "c", 0.34);
      atom(els, c, "C", "a", 0.3);
      els.push(vec(v(-0.3, 0.7), v(-1.4, 0.7), { tone: "warn", bold: true }), vec(v(0.3, 0.7), v(1.4, 0.7), { tone: "warn", bold: true }));
      els.push(txt(v(0, -0.6), "net dipol 0", "s", { tone: "ink", small: true, bold: true }));
    } else {
      const o = v(0, 0.6);
      const h1 = at(o, 232, 1.5);
      const h2 = at(o, 308, 1.5);
      els.push(seg(o, h1, { tone: "ink", bold: true }), seg(o, h2, { tone: "ink", bold: true }));
      atom(els, o, "O", "c", 0.36);
      atom(els, h1, "H", "b", 0.24);
      atom(els, h2, "H", "b", 0.24);
      els.push(vec(at(h1, 52, 0.45), at(h1, 52, 1.05), { tone: "warn" }), vec(at(h2, 128, 0.45), at(h2, 128, 1.05), { tone: "warn" }));
      els.push(vec(v(0, -1.2), v(0, -0.1), { tone: "warn", bold: true }), txt(v(-0.15, -0.9), "net dipol", "w", { tone: "warn", small: true, bold: true }));
    }
    els.push(...pad(-2.4, 1.6, 2.4, -1.5));
    return { els, readout: step ? ["H₂O: eğik geometri, iki dipolün toplamı sıfır değil → polar molekül.", "Molekül kutupluluğu için bağ yönleri ve geometri birlikte gerekir."] : ["CO₂: iki C=O dipolü eşit ve zıt → net 0, apolar molekül.", "Kutuplu bağ, kutuplu molekül demek değildir."] };
  },
};

function water(els: El[], c: V, facing: number, oIn: boolean) {
  // facing: iyona bakan yön (derece); oIn: O ucu iyona dönük mü
  const o = c;
  const away = facing + 180;
  const hDir = oIn ? [away - 52, away + 52] : [facing - 52, facing + 52];
  for (const d of hDir) {
    const h = at(o, d, 0.62);
    els.push(seg(o, h, { tone: "ink" }));
    atom(els, h, "H", "b", 0.14);
  }
  atom(els, o, "O", "c", 0.2);
}
const hydration: FigureDef = {
  caption:
    "Suyun O tarafı kısmi negatif (δ−), H tarafları kısmi pozitiftir (δ+). Na⁺ çevresinde su moleküllerinin O ucu, Cl⁻ çevresinde H uçları iyona dönük yönelir. Hidratasyon kabuğu dinamiktir; çizimdeki dört su ölçülmüş koordinasyon sayısı değildir.",
  alt: "Solda Na⁺ iyonu, çevresinde O ucu içe bakan dört su molekülü. Sağda Cl⁻ iyonu, çevresinde H uçları içe bakan dört su molekülü.",
  draw: () => {
    const els: El[] = [];
    const ions: [V, string, Tone, boolean][] = [
      [v(0, 0), "Na⁺", "a", true],
      [v(5.2, 0), "Cl⁻", "b", false],
    ];
    for (const [c, s, tone, oIn] of ions) {
      for (const d of [45, 135, 225, 315]) {
        const w = at(c, d, oIn ? 1.45 : 1.75);
        water(els, w, d + 180, oIn);
      }
      atom(els, c, s, tone, 0.42);
      els.push(txt(v(c[0], -2.2), oIn ? "O (δ−) içe" : "H (δ+) içe", "s", { tone: "ink", small: true, bold: true }));
    }
    els.push(...pad(-2.2, 2.3, 7.4, -2.7));
    return { els, readout: ["Katyon: suyun O (δ−) ucu yönelir · Anyon: H (δ+) uçları yönelir.", "δ işaretleri kısmi yüktür, tam iyon yükü değil."] };
  },
};

const enthalpySteps: FigureDef = {
  caption:
    "İleri ile iki durumu karşılaştır. Çözücü taneciklerini ayırmak (ΔH₁) ve çözünen taneciklerini ayırmak (ΔH₂) enerji ister: düzey yükselir. Çözücü–çözünen etkileşimleri kurulurken (ΔH₃) enerji açığa çıkar: düzey iner. Toplam ΔH = ΔH₁ + ΔH₂ + ΔH₃; son düzey başlangıcın altındaysa ekzotermik, üstündeyse endotermik. Şematik, sayı yok.",
  alt: "Basamaklı enerji diyagramı: başlangıç düzeyi, iki yukarı ok (ΔH₁, ΔH₂), bir aşağı ok (ΔH₃) ve son düzey; başlangıç düzeyi kesikli çizgiyle uzatılmış.",
  steps: ["Ekzotermik örnek", "Endotermik örnek"],
  draw: (_v, step) => {
    const d1 = 1.0;
    const d2 = 1.2;
    const d3 = step === 0 ? -2.8 : -1.6;
    const lv = [0, d1, d1 + d2, d1 + d2 + d3];
    const els: El[] = [seg(v(0, 0), v(7.4, 0), { tone: "muted", dash: true, thin: true })];
    lv.forEach((y, i) => els.push(seg(v(i * 1.9, y), v(i * 1.9 + 1.3, y), { tone: i === 3 ? "warn" : "ink", bold: true })));
    const labs = ["ΔH₁ > 0", "ΔH₂ > 0", "ΔH₃ < 0"];
    const tones: Tone[] = ["a", "a", "c"];
    for (let i = 0; i < 3; i++) {
      els.push(vec(v(i * 1.9 + 1.3, lv[i]), v((i + 1) * 1.9, lv[i + 1]), { tone: tones[i], bold: true }));
      els.push(txt(v(i * 1.9 + 1.6, (lv[i] + lv[i + 1]) / 2), labs[i], i === 2 ? "e" : "w", { tone: tones[i], small: true, bold: true }));
    }
    els.push(txt(v(0.65, 0), "başlangıç", "s", { tone: "ink", small: true }), txt(v(3 * 1.9 + 0.65, lv[3]), step === 0 ? "ΔH < 0" : "ΔH > 0", step === 0 ? "s" : "n", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-1.6, 2.8, 8.2, -1.4));
    return { els, readout: step === 0 ? ["|ΔH₃| > ΔH₁ + ΔH₂ → toplam negatif: ekzotermik çözünme.", "Negatif ΔH kaç gram çözüneceğini tek başına söylemez."] : ["|ΔH₃| < ΔH₁ + ΔH₂ → toplam pozitif: endotermik çözünme.", "Endotermik madde de çözünebilir; entropi ve sıcaklık da önemli."] };
  },
};

/* ---------- ayt-molarite ---------- */

const molarity: FigureDef = {
  caption:
    "Sürgüyle son çözelti hacmini değiştir; çözünen 5,85 g NaCl = 0,10 mol (58,5 g/mol). Molarite = çözünen molü ÷ son çözelti litresi. Aynı 0,10 mol daha büyük hacme dağılınca M küçülür; çözünen miktarı değişmez. İyonların ayrı derişimi sonraki ayrışma hesabıdır.",
  alt: "Hacmi sürgüyle değişen bir kap ve içinde aynı sayıda tanecik noktası; yanında molarite çubuğu.",
  param: { label: "Son hacim (L)", min: 0.1, max: 1, step: 0.05, init: 0.25, unit: "L" },
  draw: (V) => {
    const els: El[] = [...beaker(0, 0, 2.2, 3.0, V, "b"), ...dots(0.15, 0.15, 1.9, Math.max(0.2, 2.76 * V - 0.15), 10, "warn")];
    els.push(txt(v(1.1, 0), `${nf(V, 2)} L`, "s", { tone: "ink", small: true, bold: true }), txt(v(1.1, 3.0), "0,10 mol NaCl", "n", { tone: "warn", small: true, bold: true }));
    els.push(...hbars([{ label: "M", value: 0.1 / V, tone: "c", text: `${nf(0.1 / V, 3)} mol/L` }], { x0: 3.4, y0: 1.5, w: 3.0, max: 1 }));
    els.push(...pad(-0.4, 3.7, 9.4, -0.8));
    return { els, readout: [`M = 0,10 mol ÷ ${nf(V, 2)} L = ${nf(0.1 / V, 3)} mol/L`, "V, son çözeltinin hacmidir; eklenen suyun hacmi değil."] };
  },
};

const dilution: FigureDef = {
  caption:
    "Sürgüyle son hacmi seç: 250 mL 0,40 M çözeltiye (0,10 mol) su eklenerek seyreltiliyor. Çözünen kaybolmadığı için n₁ = n₂: M₁V₁ = M₂V₂. Noktaların sayısı aynı kalır, daha büyük hacme dağılır.",
  alt: "Solda 250 mL'lik başlangıç kabı, sağda sürgüyle büyüyen son kap; ikisinde de aynı sayıda tanecik.",
  param: { label: "Son hacim V₂ (mL)", min: 250, max: 1000, step: 50, init: 500, unit: "mL" },
  draw: (V2) => {
    const els: El[] = [...beaker(0, 0, 1.8, 3.0, 0.25, "b"), ...dots(0.12, 0.12, 1.56, 0.5, 10, "warn", 0.07)];
    els.push(...beaker(3.0, 0, 1.8, 3.0, V2 / 1000, "b"), ...dots(3.12, 0.12, 1.56, Math.max(0.5, 2.76 * (V2 / 1000) - 0.1), 10, "warn", 0.07));
    els.push(txt(v(0.9, 0), "250 mL", "s", { tone: "ink", small: true, bold: true }), txt(v(3.9, 0), `${V2} mL`, "s", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(0.9, 3.0), "0,40 M", "n", { tone: "ink", small: true }), txt(v(3.9, 3.0), `${nf((0.4 * 250) / V2, 3)} M`, "n", { tone: "c", small: true, bold: true }));
    els.push(vec(v(1.95, 1.5), v(2.85, 1.5), { tone: "muted" }), txt(v(2.4, 1.55), "+ su", "n", { tone: "muted", small: true }));
    els.push(...pad(-0.5, 3.7, 5.3, -0.8));
    return { els, readout: [`M₂ = 0,40 · 250 ÷ ${V2} = ${nf((0.4 * 250) / V2, 3)} M (n = 0,10 mol sabit).`, "Buharlaşma, tepkime ya da çökelme varsa n korunmayabilir."] };
  },
};

const sample: FigureDef = {
  caption:
    "İleri ile homojen çözeltiden örnek al, sonra örneği seyrelt. Yarısını ayırmak hem molü hem hacmi yarıya indirir; oran değişmez, derişim aynı kalır. Örneği suyla başka hacme tamamlamak ikinci bir işlemdir ve derişimi o zaman değiştirir.",
  alt: "Üç kap: 250 mL 0,40 M ana çözelti; 125 mL örnek (yarı tanecik, aynı derişim); örnek 250 mL'ye tamamlanınca 0,20 M.",
  steps: ["Ana çözelti", "Yarısını al", "Örneği seyrelt"],
  draw: (_v, step) => {
    const els: El[] = [];
    const cups: [number, number, number, string, string][] = [
      [0, 0.25, 10, "250 mL", "0,40 M"],
      [2.6, 0.125, 5, "125 mL", "0,40 M"],
      [5.2, 0.25, 5, "250 mL", "0,20 M"],
    ];
    cups.slice(0, step + 1).forEach(([x, f, n, a, b], i) => {
      els.push(...beaker(x, 0, 1.8, 3.0, f * 4 * 0.6, "b"), ...dots(x + 0.12, 0.12, 1.56, Math.max(0.3, 2.76 * f * 4 * 0.6 - 0.15), n, "warn", 0.08));
      els.push(txt(v(x + 0.9, 0), a, "s", { tone: "ink", small: true, bold: true }), txt(v(x + 0.9, 3.0), b, "n", { tone: i === 2 ? "c" : "ink", small: true, bold: true }));
      if (i > 0) els.push(vec(v(x - 0.7, 1.5), v(x - 0.1, 1.5), { tone: "muted" }));
    });
    els.push(...pad(-0.4, 3.7, 7.4, -0.8));
    const rows: [string, string][] = [
      ["250 mL, 0,40 M: n = 0,10 mol.", "Homojen: her bölgesinde aynı derişim."],
      ["Örnek 125 mL: n = 0,05 mol, M = 0,05 ÷ 0,125 = 0,40 M (aynı).", "Ana kabın molünü örneğe taşıma."],
      ["Örnek 250 mL'ye tamamlandı: 0,05 ÷ 0,250 = 0,20 M.", "Önce örneğe geçen mol, sonra yeni son hacim."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- ayt-iyon-derisimi ---------- */

const ionCount: FigureDef = {
  caption:
    "İleri ile 0,20 M CaCl₂ çözeltisinde iki farklı sayımı yap (tam ayrışma). İyon sayımı: Ca²⁺ 0,20 M, Cl⁻ 0,40 M, toplam 0,60 mol iyon/L; formel tuz derişimi 0,20 M'dir. Yük sayımında Ca²⁺ iki birim yük taşır: pozitif 2 · 0,20 = 0,40 = negatif 0,40.",
  alt: "Yatay çubuklar: birinci adımda formel CaCl₂, Ca²⁺, Cl⁻ ve toplam iyon derişimi; ikinci adımda pozitif ve negatif yük derişimi eşit.",
  steps: ["İyon sayımı", "Yük sayımı"],
  draw: (_v, step) => {
    const rows =
      step === 0
        ? [
            { label: "CaCl₂", value: 0.2, tone: "muted" as Tone, text: "0,20 M", hollow: true },
            { label: "Ca²⁺", value: 0.2, tone: "a" as Tone, text: "0,20 M" },
            { label: "Cl⁻", value: 0.4, tone: "b" as Tone, text: "0,40 M" },
            { label: "toplam iyon", value: 0.6, tone: "c" as Tone, text: "0,60 M" },
          ]
        : [
            { label: "+ yük", value: 0.4, tone: "a" as Tone, text: "2 · 0,20 = 0,40" },
            { label: "− yük", value: 0.4, tone: "b" as Tone, text: "1 · 0,40 = 0,40" },
          ];
    const els = hbars(rows, { w: 4.5, max: 0.6, gap: 0.8 });
    els.push(...pad(-2.6, 0.7, 8.6, -2.9));
    return { els, readout: step === 0 ? ["Ca²⁺ 0,20 M + Cl⁻ 0,40 M = 0,60 mol iyon/L ≠ 0,20 M tuz.", "Aynı litrede farklı varlıklar sayıldı."] : ["2[Ca²⁺] = [Cl⁻]: 0,40 = 0,40 (yük denkliği).", "Katyon ve anyon sayısı eşit değil; yük toplamları eşit."] };
  },
};

const polyatomic: FigureDef = {
  caption:
    "Al₂(SO₄)₃ tam ayrışma modelinde 2 Al³⁺ ve 3 SO₄²⁻ verir; sülfat bütün bir çok atomlu iyon olarak sayılır, serbest S ve O'ya ayrılmaz. 0,10 M formel tuzda Al³⁺ 0,20 M, SO₄²⁻ 0,30 M. Yük kontrolü: 2 · 3 = 3 · 2 = 6.",
  alt: "Solda iki Al³⁺ ve üç büyük SO₄²⁻ tanecik topu. Sağda Al³⁺ 0,20 M ve SO₄²⁻ 0,30 M çubukları.",
  draw: () => {
    const els: El[] = [];
    [0, 1].forEach((i) => atom(els, v(0.4 + i * 1.5, 1.7), "Al³⁺", "a", 0.38));
    [0, 1, 2].forEach((i) => atom(els, v(i * 1.7 - 0.5, 0.3), "SO₄²⁻", "c", 0.5));
    els.push(...hbars([{ label: "Al³⁺", value: 0.2, tone: "a", text: "0,20 M" }, { label: "SO₄²⁻", value: 0.3, tone: "c", text: "0,30 M" }], { x0: 5.6, y0: 1.4, w: 2.4, max: 0.3, gap: 0.9 }));
    els.push(...pad(-1.2, 2.4, 10.2, -0.5));
    return { els, readout: ["1 Al₂(SO₄)₃ → 2 Al³⁺ + 3 SO₄²⁻: 0,10 M → 0,20 M ve 0,30 M.", "Parantez: bütün sülfat grubu üç kez."] };
  },
};

const dilIons: FigureDef = {
  caption:
    "Sürgüyle 0,20 M CaCl₂ çözeltisinin hacmini kaç katına çıkardığını seç. Tepkime, çökelme ve seçici kayıp yoksa her iyonun molü korunur, her derişim aynı oranla düşer; iyon kimliği ve yükü değişmez. Oran [Cl⁻] = 2[Ca²⁺] korunur.",
  alt: "İki yatay çubuk: Ca²⁺ ve Cl⁻ derişimleri; seyreltme katı arttıkça ikisi de aynı oranla kısalır.",
  param: { label: "Hacim katı", min: 1, max: 4, step: 1, init: 2, unit: "×" },
  draw: (f) => {
    const els = hbars(
      [
        { label: "Ca²⁺", value: 0.2 / f, tone: "a", text: `${nf(0.2 / f, 3)} M` },
        { label: "Cl⁻", value: 0.4 / f, tone: "b", text: `${nf(0.4 / f, 3)} M` },
      ],
      { w: 5, max: 0.4, gap: 0.9 },
    );
    els.push(...pad(-1.6, 0.8, 7.8, -1.6));
    return { els, readout: [`Hacim ${f} katı: [Ca²⁺] = 0,20 ÷ ${f} = ${nf(0.2 / f, 3)} M, [Cl⁻] = 0,40 ÷ ${f} = ${nf(0.4 / f, 3)} M.`, "Mol sabit; iyonlar kaybolmaz, yalnız daha büyük hacme dağılır."] };
  },
};

/* ---------- ayt-hidroliz ---------- */

const saltMap: FigureDef = {
  caption:
    "Tuzu oluşturan asit ve bazın kuvveti bir başlangıç haritasıdır: güçlü asit + güçlü baz tuzunda seyirci iyonlar (nötr), zayıf asit + güçlü baz tuzunda bazik anyon, güçlü asit + zayıf baz tuzunda asidik katyon, iki zayıf eşte sabitler karşılaştırılır. Her iyonun gerçek tepkimesini ayrıca yaz.",
  alt: "İki satır iki sütunluk tablo: satırlar katyonun geldiği baz (güçlü / zayıf), sütunlar anyonun geldiği asit (güçlü / zayıf). Hücrelerde NaCl nötr, NaCH₃COO bazik, NH₄Cl asidik, NH₄CH₃COO Ka–Kb karşılaştır.",
  draw: () => {
    const els: El[] = [];
    const cells: [number, number, string, string, Tone][] = [
      [0, 0, "NaCl", "nötr (pH 7)", "muted"],
      [1, 0, "NaCH₃COO", "bazik", "b"],
      [0, 1, "NH₄Cl", "asidik", "warn"],
      [1, 1, "NH₄CH₃COO", "Ka ile Kb", "c"],
    ];
    for (const [c, r, a, b, tone] of cells) {
      const x = 1.0 + c * 3.4;
      const y = -r * 1.7;
      els.push(box(x, y, x + 3.2, y + 1.5, tone, tone !== "muted"));
      els.push(txt(v(x + 1.6, y + 1.0), a, "c", { tone: "ink", small: true, bold: true }), txt(v(x + 1.6, y + 0.45), b, "c", { tone: "ink", small: true }));
    }
    els.push(txt(v(2.6, 1.6), "güçlü asit", "n", { tone: "ink", small: true, bold: true }), txt(v(6.0, 1.6), "zayıf asit", "n", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(0.85, 0.75), "güçlü baz", "w", { tone: "ink", small: true, bold: true }), txt(v(0.85, -0.95), "zayıf baz", "w", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-2.4, 2.4, 8.2, -0.5));
    return { els, readout: ["Na⁺, Cl⁻ seyirci · CH₃COO⁻ proton alır (OH⁻) · NH₄⁺ proton verir (H₃O⁺).", "NH₄CH₃COO: Ka(CH₃COOH) = Kb(NH₃) = 1,8×10⁻⁵ → pH 7."] };
  },
};

const conj: FigureDef = {
  caption:
    "İleri ile iki hidroliz tepkimesini aç. Asetat sudan proton alır: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻ (bazik). Amonyum suya proton verir: NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺ (asidik). Sabitler eşlenik çiftten gelir: Kb(CH₃COO⁻) = Kw ÷ Ka, Ka(NH₄⁺) = Kw ÷ Kb.",
  alt: "Dört kutu: iki giren, denge oku ve iki ürün. Giren kutular arasında proton (H⁺) aktarımını gösteren ok.",
  steps: ["Asetat", "Amonyum"],
  draw: (_v, step) => {
    const sp = step === 0 ? ["CH₃COO⁻", "H₂O", "CH₃COOH", "OH⁻"] : ["NH₄⁺", "H₂O", "NH₃", "H₃O⁺"];
    const els: El[] = [];
    const W = 2.4;
    const xs = [0, 2.6, 6.0, 8.6];
    sp.forEach((s, i) => {
      els.push(box(xs[i], 0, xs[i] + W, 0.9, i === 3 ? "warn" : i < 2 ? "b" : "c"), txt(v(xs[i] + W / 2, 0.45), s, "c", { tone: "ink", small: true, bold: true }));
    });
    els.push(txt(v(5.5, 0.45), "⇌", "c", { tone: "ink", bold: true }));
    const from = step === 0 ? xs[1] + W / 2 : xs[0] + W / 2;
    const to = step === 0 ? xs[0] + W / 2 : xs[1] + W / 2;
    els.push(poly([v(from, 0.95), v(from, 1.5), v(to, 1.5), v(to, 1.0)], { tone: "warn", open: true }), vec(v(to, 1.5), v(to, 0.98), { tone: "warn" }));
    els.push(txt(v((from + to) / 2, 1.55), "H⁺", "n", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-0.3, 2.3, 11.3, -0.5));
    const k = KW / KA;
    return { els, readout: step === 0 ? [`Kb(CH₃COO⁻) = Kw ÷ Ka = 10⁻¹⁴ ÷ 1,8×10⁻⁵ = ${sci(k, 2)}`, "OH⁻ artar: çözelti bazik. Na⁺ seyirci."] : [`Ka(NH₄⁺) = Kw ÷ Kb(NH₃) = ${sci(k, 2)}`, "H₃O⁺ artar: çözelti asidik. Pozitif yük tek başına asit kuvveti değildir."] };
  },
};

const C_LIST = [0.001, 0.01, 0.1, 1];
const phCalc: FigureDef = {
  caption:
    "Sürgüyle tuz derişimini seç. Hidroliz yapan tek iyon için x ≈ √(K · C): asetatta x ≈ [OH⁻], amonyumda x ≈ [H₃O⁺]. Burada K = Kw ÷ (1,8×10⁻⁵) her iki iyon için aynıdır; bu yüzden aynı C'de pH değerleri 7'nin iki yanında simetriktir. Seyreltince pH 7'ye yaklaşır.",
  alt: "0'dan 14'e pH ekseni; 7'de nötr işareti. NH₄Cl için asidik tarafta, NaCH₃COO için bazik tarafta işaretler; sürgüyle 7'den uzaklaşıp yaklaşıyorlar.",
  param: { label: "C seçimi (1: 0,001 M … 4: 1 M)", min: 1, max: 4, step: 1, init: 3, unit: "" },
  draw: (i) => {
    const C = C_LIST[i - 1];
    const K = KW / KA;
    const x = Math.sqrt(K * C);
    const pA = -Math.log10(x);
    const pB = 14 - pA;
    const X = (p: number) => p * 0.6;
    const els: El[] = [seg(v(X(0), 0), v(X(14), 0), { tone: "ink" })];
    for (const p of [0, 7, 14]) els.push(seg(v(X(p), -0.12), v(X(p), 0.12), { tone: "ink" }), txt(v(X(p), -0.15), String(p), "s", { tone: "muted", small: true }));
    els.push(box(X(0), 0.15, X(7), 0.3, "warn"), box(X(7), 0.15, X(14), 0.3, "b"));
    els.push(ball(v(X(pA), 0.8), 0.14, "warn"), txt(v(X(pA) - 0.15, 0.8), `NH₄Cl ${nf(pA, 2)}`, "w", { tone: "warn", small: true, bold: true }));
    els.push(ball(v(X(pB), 0.8), 0.14, "b"), txt(v(X(pB) + 0.15, 0.8), `NaCH₃COO ${nf(pB, 2)}`, "e", { tone: "b", small: true, bold: true }));
    els.push(seg(v(X(pA), 0.3), v(X(pA), 0.66), { tone: "warn", thin: true }), seg(v(X(pB), 0.3), v(X(pB), 0.66), { tone: "b", thin: true }));
    els.push(...pad(-1.0, 1.5, X(14) + 1.0, -0.8));
    return { els, readout: [`C = ${nf(C, 3)} M: x = √(${sci(K, 2)} · ${nf(C, 3)}) = ${sci(x, 2)} M`, `NH₄Cl pH ≈ ${nf(pA, 2)} · NaCH₃COO pOH ≈ ${nf(pA, 2)}, pH ≈ ${nf(pB, 2)}`] };
  },
};

/* ---------- ayt-denge-hesaplari ---------- */

const qCurve: FigureDef = {
  caption:
    "Sürgüyle ilerleme x'i değiştir: 1 L'de başlangıçta 1 mol X₂, X₂ ⇌ 2X, Kc = 1. Tablo: X₂ = 1 − x, X = 2x; Q = (2x)² ÷ (1 − x). Q < K iken ileri yönde ilerleme sürer; Q = K noktası x ≈ 0,390'dır. Atom stoku 2(1 − x) + 2x = 2 her x'te korunur.",
  alt: "Yatay eksen x (0–0,6), dikey eksen Q. Artan Q eğrisi ve K = 1'de yatay kesikli çizgi; kesişme x ≈ 0,39. Sürgüyle kayan nokta.",
  param: { label: "İlerleme x (mol)", min: 0, max: 0.6, step: 0.05, init: 0.2, unit: "" },
  draw: (x) => {
    const Q = (t: number) => (4 * t * t) / (1 - t);
    const X = (t: number) => t * 10;
    const Y = (q: number) => q * 0.9;
    const els: El[] = [...axes(v(0, 0), X(0.68), Y(4.1), "x", "Q")];
    els.push(poly(curve(Q, 0, 0.6, 60, X, Y), { tone: "c", open: true, bold: true, smooth: true }));
    els.push(seg(v(0, Y(1)), v(X(0.62), Y(1)), { tone: "warn", dash: true }), txt(v(X(0.62), Y(1)), "K = 1", "e", { tone: "warn", small: true, bold: true }));
    els.push(ball(v(X(x), Y(Q(x))), 0.11, "warn"));
    for (const t of [0, 0.2, 0.4, 0.6]) els.push(...xtick(X(t), 0, nf(t, 1)));
    for (const q of [1, 2, 3]) els.push(...ytick(0, Y(q), String(q)));
    els.push(...pad(-0.9, Y(4.4), X(0.68) + 1.6, -0.8));
    const q = Q(x);
    const dir = Math.abs(q - 1) < 0.02 ? "≈ K: dengeye yakın" : q < 1 ? "< K: ileri" : "> K: geri";
    return { els, readout: [`X₂ = ${nf(1 - x, 2)} · X = ${nf(2 * x, 2)} mol · Q = ${nf(q, 3)} ${dir}`, `Atom stoku: 2 · ${nf(1 - x, 2)} + ${nf(2 * x, 2)} = 2`] };
  },
};

const roots: FigureDef = {
  caption:
    "4x² + x − 1 = 0'ın iki kökü: x ≈ 0,390388 ve x ≈ −0,640388. Başlangıçta yalnız 1 mol X₂ varsa son miktarlar negatif olamaz: 0 ≤ x ≤ 1 (yeşil bant). Negatif kök başlangıçta olmayan monomeri tüketmeye çalışır; fiziksel çözüm pozitif köktür.",
  alt: "Yukarı açılan parabol y = 4x² + x − 1; x ekseninde 0 ile 1 arası vurgulu bant. Kökler işaretli: −0,640 bandın dışında, 0,390 içinde.",
  draw: () => {
    const f = (t: number) => 4 * t * t + t - 1;
    const X = (t: number) => t * 3.2;
    const Y = (y: number) => y * 0.55;
    const els: El[] = [seg(v(X(-1.0), 0), v(X(1.25), 0), { tone: "ink", thin: true }), seg(v(0, Y(-1.4)), v(0, Y(4.4)), { tone: "ink", thin: true })];
    els.push(box(0, -0.12, X(1), 0.12, "c"));
    els.push(poly(curve(f, -0.95, 0.95, 60, X, Y), { tone: "a", open: true, bold: true, smooth: true }));
    const r1 = (-1 + Math.sqrt(17)) / 8;
    const r2 = (-1 - Math.sqrt(17)) / 8;
    els.push(circle(v(X(r1), 0), 0.12, { tone: "c", fill: "c" }), circle(v(X(r2), 0), 0.12, { tone: "warn" }));
    els.push(txt(v(X(r1), -0.2), nf(r1, 3), "s", { tone: "c", small: true, bold: true }), txt(v(X(r2), -0.2), nf(r2, 3).replace("-", "−"), "s", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(X(1), 0.2), "x = 1", "ne", { tone: "muted", small: true }), txt(v(X(0.9), Y(f(0.9))), "4x² + x − 1", "e", { tone: "a", small: true }));
    els.push(...pad(X(-1.1), Y(4.6), X(1.25) + 2.2, Y(-1.6)));
    return { els, readout: [`Fiziksel kök x = ${nf(r1, 6)}: X₂ = ${nf(1 - r1, 6)}, X = ${nf(2 * r1, 6)} mol.`, `x = ${nf(r2, 6).replace("-", "−")} aralık dışı: X = 2x negatif olurdu.`] };
  },
};

const kpKc: FigureDef = {
  caption:
    "Sürgüyle sıcaklığı değiştir. İdeal gaz için Kp = Kc(RT)^Δn; X₂ ⇌ 2X'te Δn = 1, Kc = 1 ve R = 0,08206 L·atm/(mol·K) alınınca Kp = 0,08206 · T doğrusu çıkar. T = 300 K'de Kp = 24,618. T kelvin olmalıdır; Δn = 0 olsaydı Kp = Kc olurdu.",
  alt: "Yatay eksen T (K), dikey eksen Kp. Orijinden geçen düz çizgi; sürgüyle kayan nokta ve 300 K işareti.",
  param: { label: "Sıcaklık T (K)", min: 200, max: 500, step: 50, init: 300, unit: "K" },
  draw: (T) => {
    const R = 0.08206;
    const X = (t: number) => t / 80;
    const Y = (k: number) => k / 12;
    const els: El[] = [...axes(v(0, 0), X(560), Y(46), "T (K)", "Kp")];
    els.push(seg(v(0, 0), v(X(520), Y(R * 520)), { tone: "c", bold: true }));
    els.push(seg(v(X(T), 0), v(X(T), Y(R * T)), { tone: "muted", dash: true, thin: true }), ball(v(X(T), Y(R * T)), 0.1, "warn"));
    for (const t of [200, 300, 400, 500]) els.push(...xtick(X(t), 0, String(t)));
    for (const k of [10, 20, 30, 40]) els.push(...ytick(0, Y(k), String(k)));
    els.push(...pad(-1.0, Y(48), X(560) + 1.2, -0.8));
    return { els, readout: [`Kp = 1 · (0,08206 · ${T})¹ = ${nf(R * T, 3)}`, "N₂ + 3H₂ ⇌ 2NH₃ için Δn = −2: Kp = Kc(RT)⁻²."] };
  },
};

const kRules: FigureDef = {
  caption:
    "İleri ile denklem dönüşümlerini izle. Bütün katsayılar r ile çarpılınca K^r; ters denklem için 1/K; iki denklem toplanınca K'ler çarpılır. Örnekler bölümden: K = 49 olan denklemin aynı yönde yarısı √49 = 7, ters yarısı 1/7; A ⇌ B (2) ve B ⇌ C (3) toplanınca A ⇌ C için 2 · 3 = 6.",
  alt: "Soldan sağa kutular ve oklar: K = 49, yarıya bölünce K = 7, ters çevrilince K = 1/7; son adımda iki kutu (2 ve 3) birleşerek K = 6.",
  steps: ["İleri", "× ½", "Ters", "Topla"],
  draw: (_v, step) => {
    const els: El[] = [];
    const W = 2.4;
    if (step < 3) {
      const items: [string, string][] = [
        ["ileri", "K = 49"],
        ["yarısı", "K = √49 = 7"],
        ["ters yarısı", "K = 1/7"],
      ];
      items.slice(0, step + 1).forEach(([a, b], i) => {
        const x = i * (W + 1.0);
        els.push(box(x, 0, x + W, 1.1, i === step ? "c" : "muted"), txt(v(x + W / 2, 0.55), b, "c", { tone: "ink", small: true, bold: true }), txt(v(x + W / 2, 0), a, "s", { tone: "muted", small: true }));
        if (i > 0) els.push(vec(v(x - 0.9, 0.55), v(x - 0.1, 0.55), { tone: "warn" }), txt(v(x - 0.5, 0.6), i === 1 ? "^½" : "1/K", "n", { tone: "warn", small: true, bold: true }));
      });
    } else {
      els.push(box(0, 0.8, W, 1.8, "a"), txt(v(W / 2, 1.3), "A ⇌ B: 2", "c", { tone: "ink", small: true, bold: true }));
      els.push(box(0, -0.6, W, 0.4, "b"), txt(v(W / 2, -0.1), "B ⇌ C: 3", "c", { tone: "ink", small: true, bold: true }));
      els.push(vec(v(W + 0.1, 1.3), v(W + 1.1, 0.75), { tone: "warn" }), vec(v(W + 0.1, -0.1), v(W + 1.1, 0.45), { tone: "warn" }));
      els.push(box(W + 1.2, 0.1, 2 * W + 1.6, 1.1, "c"), txt(v(1.5 * W + 1.4, 0.6), "A ⇌ C: 6", "c", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(1.5 * W + 1.4, 0.1), "2 · 3", "s", { tone: "warn", small: true, bold: true }));
    }
    els.push(...pad(-0.4, 2.3, 3 * W + 2.4, -1.0));
    const rows: [string, string][] = [
      ["İleri denklem: K = 49.", "K bağıntısındaki üsler denklem katsayılarıdır."],
      ["Bütün katsayılar ½ ile çarpıldı: K^½ = √49 = 7.", "Katsayı r ile çarpılırsa K^r."],
      ["Ters çevrildi: 1/7.", "Ters denklem: 1/K."],
      ["Toplanan denklemler (B sadeleşir): K = 2 · 3 = 6.", "K'ler toplanmaz, çarpılır."],
    ];
    return { els, readout: rows[step] };
  },
};

export const chemistryFigures060Solution: Record<string, Record<string, FigureDef>> = {
  "ayt-molalite-koligatif": {
    "Aynı çözeltiyi iki farklı payda ile ölç": molality,
    "Bir formül birimi kaç etkin tanecik verir?": particles,
    "Raoult yasasında çözücünün payı": raoult,
    "İki bileşen de uçucuysa toplamı kur": twoVolatile,
    "Kaynamaya başlama sıcaklığı neden yükselir?": boilRise,
  },
  "ayt-cozunurluk": {
    "Doymamış ve doymuş sıvıyı tanı": saturation,
    "Buharlaştırma ile su ekleme aynı işlem değil": evaporate,
    "Gazda kısmi basıncı izle": henry,
  },
  "ayt-cozucu-cozunen": {
    "Kutupluluğu yalnız tek bağdan çıkarma": dipoles,
    "İyon çevresinde su nasıl yönelir?": hydration,
    "Üç enerji adımını işaretleriyle topla": enthalpySteps,
  },
  "ayt-molarite": {
    "Bir litre çözeltinin payı": molarity,
    "Seyreltmede hangi nicelik sabit?": dilution,
    "Örnek almak derişimi yarıya indirmez": sample,
  },
  "ayt-iyon-derisimi": {
    "Tuz M’si ile toplam iyon M’si": ionCount,
    "Çok atomlu iyonu bütün tut": polyatomic,
    "Seyreltmede bütün türler ortak hacimde": dilIons,
  },
  "ayt-hidroliz": {
    "Asetat sudan proton alır": conj,
    "Yaklaşık pH hesabının iskeleti": phCalc,
    "Tuzun kaynağını nasıl kullanırsın?": saltMap,
  },
  "ayt-denge-hesaplari": {
    "Tabloyu K bağıntısına yerleştir": qCurve,
    "İki cebirsel kökten hangisi fiziksel?": roots,
    "Kp ile Kc arasında ideal gaz köprüsü": kpKc,
    "Denklem değişince K de dönüşür": kRules,
  },
};
