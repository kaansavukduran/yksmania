import { ang, pt, poly, seg, txt, v, vec, type El, type FigureDef, type V } from "./figureKit";
import { axes, box, curve, nf, pad, xtick, ytick } from "./physicsFigures058Kit";

/*
 * AYT Fizik (Forge060) · Özel görelilik, siyah cisim ve foton, Compton ve de
 * Broglie, elektromanyetik dalgalar. Eğriler rehberdeki bağıntılardan
 * (γ = 1/√(1−β²), Planck Bλ, Δλ = λC(1 − cosθ), λ = h/p, c = λf) hesaplanır;
 * etiketteki sayı çizimle aynı hesaptan gelir. Rehberin sayı vermediği yerlerde
 * seçilen örnek değerler figür yazısında açıkça söylenir.
 */

const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
/** Bilimsel gösterim: 4,00·10⁻⁷ (Türkçe virgül, üst simge üs). */
export function sci(x: number, d = 2): string {
  if (x === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(x)));
  const m = x / 10 ** e;
  const exp = String(e).split("").map((c) => SUP[c] ?? c).join("");
  return `${nf(m, d)}·10${exp}`;
}

const R = (d: number) => (d * Math.PI) / 180;
const gammaOf = (b: number) => 1 / Math.sqrt(1 - b * b);

/* ===================== Özel görelilik ===================== */

const gammaCurve: FigureDef = {
  caption:
    "γ = 1/√(1 − β²) eğrisi, β = v/c. β’yı değiştir: β küçükken γ ≈ 1 (klasik sınır); β büyüdükçe γ doğrusal değil, giderek daha hızlı artar. Kesikli β = 1 çizgisine kütleli cisim ulaşamaz; orada sonlu γ yoktur.",
  alt: "Yatay eksende β, düşey eksende γ; 1’den başlayıp β = 1 kesikli dikey çizgisine yaklaşırken dikleşen eğri ve seçili β için işaretli nokta.",
  param: { label: "β = v/c", min: 0, max: 0.99, step: 0.01, init: 0.6 },
  draw: (b) => {
    const X = (x: number) => x * 6, Y = (g: number) => (g - 1) * 0.6;
    const g = gammaOf(b);
    const els: El[] = [...axes(v(0, 0), 6.6, 4.3, "β", "γ")];
    els.push(poly(curve((x) => gammaOf(x), 0, 0.99, 99, X, Y), { open: true, tone: "a", bold: true }));
    els.push(seg(v(X(1), 0), v(X(1), 4.1), { tone: "warn", dash: true, thin: true }), txt(v(X(1) + 0.1, 3.9), "β = 1", "e", { tone: "warn", small: true }));
    for (const x of [0.5, 0.8]) els.push(...xtick(X(x), 0, nf(x, 1)));
    for (const gg of [2, 4, 7]) els.push(...ytick(0, Y(gg), `γ = ${gg}`));
    els.push(seg(v(X(b), 0), v(X(b), Y(g)), { tone: "muted", dash: true, thin: true }), pt(v(X(b), Y(g)), `γ = ${nf(g, 3)}`, b > 0.8 ? "w" : "nw", "a"));
    els.push(txt(v(0.1, -0.05), "γ = 1", "se", { tone: "muted", small: true, soft: true }));
    els.push(...pad(-1.6, 4.9, 7.6, -0.8));
    return { els, readout: [`β = ${nf(b, 2)}: 1 − β² = ${nf(1 - b * b, 4)}, γ = ${nf(g, 3)}.`, b < 0.15 ? `Küçük β: γ − 1 ≈ β²/2 = ${nf((b * b) / 2, 4)}; klasik sonuçlar geri gelir.` : "γ ≥ 1 her zaman; eşitlik yalnız v = 0’da."] };
  },
};

const lightClock: FigureDef = {
  caption:
    "Aynalar arası L. Saatin kendi çerçevesinde ışık dik gidip gelir (sol); laboratuvarda saat v ile kayarken ışık eğik yol izler (sağ, bir gidiş). İki çerçevede de ışık hızı c olduğundan dik üçgenden (cΔt/2)² = L² + (vΔt/2)² ⇒ Δt = γΔτ. Ölçekli; saat bozulmaz, ölçümün çerçeveye bağlılığı anlatılır.",
  alt: "Solda iki yatay ayna arasında dikey gidiş-dönüş ışık oku; sağda aynaların üç konumu ve alttan üste eğik giden ışık yolu, yatay kayma ve dik yükseklik ile bir dik üçgen.",
  param: { label: "β = v/c", min: 0, max: 0.9, step: 0.05, init: 0.6 },
  draw: (b) => {
    const L = 2, g = gammaOf(b), half = b * g * L;
    const els: El[] = [];
    const mirror = (x: number, y: number) => seg(v(x - 0.45, y), v(x + 0.45, y), { tone: "ink", bold: true });
    // Saatin çerçevesi
    els.push(mirror(-2.2, 0), mirror(-2.2, L), vec(v(-2.35, 0.05), v(-2.35, L - 0.05), { tone: "a", bold: true }), vec(v(-2.05, L - 0.05), v(-2.05, 0.05), { tone: "a", thin: true }));
    els.push(txt(v(-2.2, -0.25), "saat çerçevesi", "s", { tone: "muted", small: true }), txt(v(-2.6, L / 2), "L", "w", { tone: "ink", small: true, bold: true }));
    // Laboratuvar
    const x0 = 0.6, x1 = x0 + half;
    els.push(mirror(x0, 0), mirror(x0, L), mirror(x1, 0), mirror(x1, L));
    if (half > 0.05) {
      els.push(seg(v(x0, 0), v(x1, 0), { tone: "muted", dash: true, thin: true }), seg(v(x1, 0), v(x1, L), { tone: "muted", dash: true, thin: true }));
      els.push(txt(v((x0 + x1) / 2, -0.25), "vΔt/2", "s", { tone: "c", small: true }));
    }
    els.push(vec(v(x0, 0.03), v(x1, L - 0.03), { tone: "a", bold: true }), txt(v((x0 + x1) / 2 - 0.15, L / 2 + 0.1), "cΔt/2", "nw", { tone: "a", small: true, bold: true }));
    els.push(txt(v(x1 + 0.15, L / 2), "L", "e", { tone: "ink", small: true, bold: true }));
    els.push(vec(v(x0, L + 0.45), v(x0 + 0.9, L + 0.45), { tone: "c" }), txt(v(x0 + 1.0, L + 0.45), "v", "e", { tone: "c", small: true }));
    els.push(txt(v(x0 + 1.4, -0.95), "laboratuvar", "c", { tone: "muted", small: true }));
    els.push(...pad(-3.3, L + 0.9, 4.4, -1.3));
    return { els, readout: [`β = ${nf(b, 2)}: γ = ${nf(g, 3)}; bir gidişte eğik yol = γL = ${nf(g, 3)}L.`, `Δτ = 2L/c (saatin kendi okuması), Δt = γΔτ = ${nf(g, 3)}·Δτ (laboratuvar).`] };
  },
};

const contraction: FigureDef = {
  caption:
    "Örnek çubuk: öz uzunluk L₀ = 10 m (kendi durgun çerçevesinde), dik boyu 1 m. Hızı değiştir: hareket doğrultusundaki boy, uçları eşzamanlı ölçen çerçevede L = L₀/γ olur; dik boy değişmez. Malzeme ezilmez; ölçüm tanımı değişir.",
  alt: "Üstte durgun çubuk ve uzunluk ölçüsü; altta aynı yükseklikte ama yatayda kısalmış hareketli çubuk, hız oku ve kısalmış uzunluk ölçüsü.",
  param: { label: "β = v/c", min: 0, max: 0.95, step: 0.05, init: 0.8 },
  draw: (b) => {
    const L0 = 10, g = gammaOf(b), L = L0 / g, S = 0.5;
    const els: El[] = [box(0, 1.6, L0 * S, 2.1, "c"), box(0, 0, L * S, 0.5, "a")];
    els.push(seg(v(0, 2.45), v(L0 * S, 2.45), { tone: "muted", thin: true }), txt(v((L0 * S) / 2, 2.55), "L₀ = 10 m (durgun)", "n", { tone: "c", small: true, bold: true }));
    els.push(seg(v(0, -0.35), v(L * S, -0.35), { tone: "muted", thin: true }), txt(v((L * S) / 2, -0.45), `L = ${nf(L, 2)} m`, "s", { tone: "a", small: true, bold: true }));
    els.push(txt(v(L0 * S + 0.15, 1.85), "1 m", "e", { tone: "muted", small: true }), txt(v(L * S + 0.15, 0.25), "1 m", "e", { tone: "muted", small: true }));
    if (b > 0) els.push(vec(v(L * S + 1.1, 0.25), v(L * S + 2.0, 0.25), { tone: "warn", bold: true }), txt(v(L * S + 2.1, 0.25), `v = ${nf(b, 2)}c`, "e", { tone: "warn", small: true }));
    els.push(...pad(-0.4, 3.1, 8.2, -1.0));
    return { els, readout: [`γ = ${nf(g, 3)}: L = 10/${nf(g, 3)} = ${nf(L, 2)} m; dik boy 1 m kalır.`, "L ≤ L₀ hızlı bir kontroldür; öz uzunluk durgun çerçevenin ölçüsüdür."] };
  },
};

const energyBars: FigureDef = {
  caption:
    "Kütleli cismin enerjisi mc² biriminde. Hızı değiştir: durgun enerji E₀ = mc² sabit kalır; toplam E = γmc², kinetik K = (γ − 1)mc². Kesikli çerçeve klasik mv²/2 = (β²/2)mc²: küçük β’da göreli K ile neredeyse aynı, büyük β’da çok küçük kalır.",
  alt: "Tek bir yığılı çubuk: altta sabit durgun enerji, üstünde hıza göre büyüyen kinetik enerji; yanında klasik kinetik enerji için kesikli çerçeve.",
  param: { label: "β = v/c", min: 0, max: 0.95, step: 0.05, init: 0.6 },
  draw: (b) => {
    const g = gammaOf(b), K = g - 1, Kc = (b * b) / 2, H = 1.2;
    const els: El[] = [seg(v(-0.4, 0), v(6.4, 0), { tone: "muted", thin: true })];
    els.push(box(0, 0, 1.2, H, "c"), txt(v(0.6, H / 2), "E₀ = mc²", "c", { tone: "ink", small: true, bold: true }));
    if (K > 0.005) els.push(box(0, H, 1.2, H * g, "a"));
    els.push(txt(v(1.35, H * g), `E = ${nf(g, 3)} mc²`, "e", { tone: "a", small: true, bold: true }));
    if (K > 0.05) els.push(txt(v(-0.15, H * (1 + K / 2)), `K = ${nf(K, 3)} mc²`, "w", { tone: "a", small: true }));
    els.push(box(5.0, H, 6.0, H + Kc * H, "warn", false), txt(v(5.5, H + Kc * H + 0.1), `klasik ${nf(Kc, 3)}`, "n", { tone: "warn", small: true }));
    els.push(seg(v(4.9, H), v(6.1, H), { tone: "muted", dash: true, thin: true }));
    els.push(...pad(-2.6, Math.max(H * 3.3, H * g + 0.4), 7.2, -0.4));
    return { els, readout: [`β = ${nf(b, 2)}: E = γmc² = ${nf(g, 3)} mc², K = (γ − 1)mc² = ${nf(K, 3)} mc².`, b > 0 ? `Klasik mv²/2 = ${nf(Kc, 3)} mc²; oran (göreli K)/(klasik K) = ${nf(K / Kc, 3)}.` : "v = 0: K = 0, toplam enerji yalnız E₀ = mc²."] };
  },
};

/* ===================== Siyah cisim ve foton ===================== */

const hP = 6.626e-34, cL = 2.998e8, kB = 1.381e-23, WIEN = 2.898e-3, SIGMA = 5.67e-8;
/** Planck spektral radyansı Bλ (W·sr⁻¹·m⁻³), λ metre. */
const planck = (lam: number, T: number) => (2 * hP * cL * cL) / lam ** 5 / (Math.exp((hP * cL) / (lam * kB * T)) - 1);

const wien: FigureDef = {
  caption:
    "Planck Bλ eğrileri; her eğri kendi tepe değerine bölündü (yalnız tepe yerini karşılaştırmak için). Sıcaklığı değiştir: λtepe·T = 2,898×10⁻³ m·K; T iki katına çıkınca tepe dalga boyu yarıya iner. Kesikli eğri 3000 K başvurusudur. Renkler seri ayırır, görünür renk taklidi değildir.",
  alt: "Yatay eksende dalga boyu nanometre, düşey eksende normalize spektral dağılım; seçili sıcaklık için dolu eğri ve tepe noktasında kesikli dikey çizgi, 3000 K için kesikli başvuru eğrisi.",
  param: { label: "Sıcaklık T", min: 3000, max: 6000, step: 250, init: 6000, unit: " K", plain: true },
  draw: (T) => {
    const X = (nm: number) => nm / 400, H = 3;
    const lp = (WIEN / T) * 1e9;
    const norm = (t: number) => planck((WIEN / t), t);
    const els: El[] = [...axes(v(0, 0), 8, 3.6, "λ (nm)", "Bλ / tepe")];
    els.push(poly(curve((nm) => (planck(nm * 1e-9, 3000) / norm(3000)) * H, 100, 3000, 120, X, (y) => y), { open: true, tone: "muted", dash: true }));
    els.push(poly(curve((nm) => (planck(nm * 1e-9, T) / norm(T)) * H, 100, 3000, 120, X, (y) => y), { open: true, tone: "a", bold: true }));
    els.push(seg(v(X(lp), 0), v(X(lp), H), { tone: "a", dash: true, thin: true }), pt(v(X(lp), H), `λtepe = ${nf(lp, 0)} nm`, "ne", "a"));
    els.push(txt(v(X(2300), (planck(2300e-9, 3000) / norm(3000)) * H + 0.12), "3000 K", "ne", { tone: "muted", small: true }));
    for (const nm of [500, 1000, 2000, 3000]) els.push(...xtick(X(nm), 0, String(nm)));
    els.push(...pad(-0.6, 4.3, 8.8, -0.8));
    return { els, readout: [`λtepe = 2,898×10⁻³ / ${nf(T, 0)} = ${nf(lp, 0)} nm.`, `3000 K’de ${nf(2898 / 3, 0)} nm; oran ${nf(T / 3000, 2)} kat sıcaklık ⇒ ${nf(3000 / T, 2)} kat tepe dalga boyu.`] };
  },
};

const spectrumRise: FigureDef = {
  caption:
    "İki ideal siyah cismin Bλ eğrisi ortak yatay ve ortak düşey ölçekte (birim 10¹³ W·sr⁻¹·m⁻³). Sıcak eğri her dalga boyunda soğuktan yüksektir ve tepesi kısa dalga boyuna kayar. Kesikli eğri 4000 K başvurusudur.",
  alt: "Ortak eksenlerde iki Planck eğrisi: kesikli 4000 K eğrisi ve onun her yerde üstünde kalan, tepesi sola kaymış seçili sıcaklık eğrisi.",
  param: { label: "Sıcaklık T", min: 4000, max: 6000, step: 250, init: 5000, unit: " K", plain: true },
  draw: (T) => {
    const X = (nm: number) => nm / 400, U = 1e13, Ys = (y: number) => y / U;
    const els: El[] = [...axes(v(0, 0), 8, 3.4, "λ (nm)", "Bλ")];
    els.push(poly(curve((nm) => planck(nm * 1e-9, 4000), 100, 3000, 120, X, Ys), { open: true, tone: "muted", dash: true }));
    els.push(poly(curve((nm) => planck(nm * 1e-9, T), 100, 3000, 120, X, Ys), { open: true, tone: "a", bold: true }));
    const lp = (WIEN / T) * 1e9, l4 = (WIEN / 4000) * 1e9;
    const top = planck(lp * 1e-9, T), top4 = planck(l4 * 1e-9, 4000);
    els.push(pt(v(X(lp), Ys(top)), `${nf(T, 0)} K`, "ne", "a"), pt(v(X(l4), Ys(top4)), "4000 K", "e", "muted"));
    for (const nm of [500, 1000, 2000]) els.push(...xtick(X(nm), 0, String(nm)));
    for (const y of [1, 2, 3]) els.push(...ytick(0, Ys(y * U), String(y)));
    els.push(...pad(-0.9, 4.0, 8.8, -0.8));
    return { els, readout: [`Tepe: ${nf(T, 0)} K → ${nf(lp, 0)} nm, ${nf(top / U, 2)}×10¹³; 4000 K → ${nf(l4, 0)} nm, ${nf(top4 / U, 2)}×10¹³.`, `1000 nm’de oran B(${nf(T, 0)}) / B(4000) = ${nf(planck(1e-6, T) / planck(1e-6, 4000), 2)}.`] };
  },
};

const stefan: FigureDef = {
  caption:
    "İdeal yüzeyin birim alanından toplam yayımı M = σT⁴, σ = 5,67×10⁻⁸ W·m⁻²·K⁻⁴. Sıcaklığı değiştir: eğri doğru değil dördüncü kuvvettir; T iki katına çıkınca M 16 katına çıkar. Alan A ise P = AσT⁴; alan iki katı, tepe yeri aynı.",
  alt: "Yatay eksende kelvin sıcaklık, düşey eksende megawatt bölü metrekare toplam yayım; hızla dikleşen T⁴ eğrisi, seçili nokta ve yarı sıcaklıktaki karşılaştırma noktası.",
  param: { label: "Sıcaklık T", min: 1000, max: 6000, step: 250, init: 4000, unit: " K", plain: true },
  draw: (T) => {
    const X = (t: number) => t / 800, M = (t: number) => (SIGMA * t ** 4) / 1e6, Y = (m: number) => m / 22;
    const els: El[] = [...axes(v(0, 0), 8, 3.7, "T (K)", "M (MW/m²)")];
    els.push(poly(curve(M, 0, 6000, 60, X, Y), { open: true, tone: "a", bold: true }));
    els.push(pt(v(X(T), Y(M(T))), `${nf(M(T), 2)} MW/m²`, T > 4500 ? "w" : "nw", "a"));
    els.push(pt(v(X(T / 2), Y(M(T / 2))), `T/2: ${nf(M(T / 2), 2)}`, "se", "b"));
    for (const t of [2000, 4000, 6000]) els.push(...xtick(X(t), 0, String(t)));
    for (const m of [20, 40, 60]) els.push(...ytick(0, Y(m), String(m)));
    els.push(...pad(-1.0, 4.3, 9.2, -0.8));
    return { els, readout: [`M = 5,67×10⁻⁸ · ${nf(T, 0)}⁴ = ${nf(M(T), 3)} MW/m².`, `T/2 = ${nf(T / 2, 0)} K’de ${nf(M(T / 2), 3)} MW/m²: oran 2⁴ = 16.`] };
  },
};

const photonEnergy: FigureDef = {
  caption:
    "Tek foton için E = hc/λ; hc ≈ 1240 eV·nm. Dalga boyunu değiştir: λ iki katına çıkınca foton enerjisi yarıya iner (hiperbol). Gölgeli bant yaklaşık 400–700 nm görünür aralığıdır; renk gösterimi değildir.",
  alt: "Yatay eksende nanometre dalga boyu, düşey eksende elektronvolt foton enerjisi; azalan hiperbol, 400 ile 700 nm arası gölgeli bant ve seçili nokta.",
  param: { label: "Dalga boyu λ", min: 100, max: 1000, step: 10, init: 500, unit: " nm", plain: true },
  draw: (lam) => {
    const X = (nm: number) => nm / 125, Y = (e: number) => e * 0.3, E = (nm: number) => 1240 / nm;
    const els: El[] = [box(X(400), 0, X(700), Y(12.4), "c")];
    els.push(...axes(v(0, 0), 8.4, 4.0, "λ (nm)", "E (eV)"));
    els.push(txt(v(X(550), Y(11.6)), "görünür", "c", { tone: "ink", small: true }));
    els.push(poly(curve(E, 100, 1000, 90, X, Y), { open: true, tone: "a", bold: true }));
    els.push(pt(v(X(lam), Y(E(lam))), `${nf(E(lam), 2)} eV`, lam < 300 ? "e" : "ne", "a"));
    for (const nm of [200, 400, 700, 1000]) els.push(...xtick(X(nm), 0, String(nm)));
    for (const e of [2, 6, 12]) els.push(...ytick(0, Y(e), String(e)));
    els.push(...pad(-0.8, 4.4, 9.4, -0.8));
    return { els, readout: [`E = 1240 / ${nf(lam, 0)} = ${nf(E(lam), 3)} eV = ${sci(E(lam) * 1.602e-19)} J.`, `2λ = ${nf(2 * lam, 0)} nm için ${nf(E(2 * lam), 3)} eV: yarısı.`] };
  },
};

const beam: FigureDef = {
  caption:
    "Örnek tek renkli demet, güç P = 1 mW sabit. Dalga boyunu değiştir: dikdörtgenin yüksekliği tek foton enerjisi hc/λ, genişliği saniyedeki foton sayısı Φ; alanı (Φ·hf) hep 1 mW’tır. Kısa dalga boyunda foton başına enerji büyür, foton/s azalır.",
  alt: "Alanı sabit kalan bir dikdörtgen: dalga boyu kısalınca yükselip daralan, uzayınca alçalıp genişleyen; kenarlarda foton enerjisi ve foton sayısı değerleri.",
  param: { label: "Dalga boyu λ", min: 400, max: 700, step: 25, init: 500, unit: " nm", plain: true },
  draw: (lam) => {
    const P = 1e-3, Ej = (hP * cL) / (lam * 1e-9), Ev = 1240 / lam, phi = P / Ej;
    const w = (phi / 1e15) * 1.6, h = Ev * 1.0;
    const els: El[] = [box(0, 0, w, h, "a"), seg(v(-0.3, 0), v(6.4, 0), { tone: "muted", thin: true })];
    els.push(txt(v(w / 2, h / 2), "P = 1 mW", "c", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(w + 0.15, h), `hc/λ = ${nf(Ev, 2)} eV`, "e", { tone: "a", small: true }));
    els.push(txt(v(w / 2, -0.15), `Φ = ${sci(phi)} foton/s`, "s", { tone: "b", small: true }));
    els.push(...pad(-0.4, 3.6, 8.6, -0.8));
    return { els, readout: [`Tek foton: ${sci(Ej)} J (${nf(Ev, 2)} eV); Φ = 10⁻³ / ${sci(Ej)} = ${sci(phi)} foton/s.`, "Gücü sabit tutup frekansı artırmak foton sayısını azaltır; tek foton enerjisi güçten bağımsızdır."] };
  },
};

/* ===================== Compton ve de Broglie ===================== */

const LC = 2.426; // pm
const LAM0 = 5; // pm, seçilen gelen foton

const momentumTriangle: FigureDef = {
  caption:
    "Örnek: gelen foton λ = 5 pm, serbest durgun elektron. Açıyı değiştir: p = h/λ olduğundan ok boyları 1/λ ile orantılı. Saçılan foton λ′ = λ + λC(1 − cosθ) ile uzar, momentumu kısalır; elektronun momentumu iki foton okunun vektörel farkıdır ve aşağı (−y) yönlüdür. θ fotonlar arasındaki açıdır; elektron açısı φ ayrıdır.",
  alt: "Orijinden sağa gelen foton momentum oku; aynı orijinden θ açısıyla yukarı saçılan foton oku; saçılan okun ucundan gelen okun ucuna uzanan elektron momentum oku ile kapanan üçgen.",
  param: { label: "Saçılma açısı θ", min: 10, max: 180, step: 10, init: 60, unit: "°", plain: true },
  draw: (th) => {
    const lp = LAM0 + LC * (1 - Math.cos(R(th))), S = 4.5;
    const pin = S, pout = (S * LAM0) / lp;
    const O = v(0, 0), A = v(pin, 0), B = v(pout * Math.cos(R(th)), pout * Math.sin(R(th)));
    const phi = (Math.atan2(B[1], pin - B[0]) * 180) / Math.PI;
    const els: El[] = [];
    els.push(vec(O, A, { tone: "a", bold: true }), txt(v(pin / 2, -0.2), "p = h/λ", "s", { tone: "a", small: true, bold: true }));
    els.push(vec(O, B, { tone: "b", bold: true }), txt(v(B[0], B[1] + 0.12), "p′ = h/λ′", "n", { tone: "b", small: true, bold: true }));
    els.push(vec(B, A, { tone: "warn", bold: true }), txt(v((A[0] + B[0]) / 2 + 0.15, (A[1] + B[1]) / 2 + 0.05), "pₑ", "ne", { tone: "warn", small: true, bold: true }));
    els.push(ang(O, A, B, `θ = ${th}°`, { tone: "muted", r: 40 }));
    els.push(...pad(-4.8, 4.9, 5.4, -0.9));
    return { els, readout: [`λ′ = 5 + 2,426·(1 − cos${th}°) = ${nf(lp, 3)} pm; p′/p = ${nf(LAM0 / lp, 3)}.`, `Elektron: x bileşeni p − p′cosθ, y bileşeni −p′sinθ; gelen doğrultunun ${nf(phi, 1)}° altında.`] };
  },
};

const shiftCurve: FigureDef = {
  caption:
    "Serbest durgun elektron için Δλ = λC(1 − cosθ), λC = h/(mₑc) ≈ 2,426 pm. Açıyı değiştir: θ = 0’da kayma 0, 90°’de λC, 180°’de 2λC. Kayma gelen dalga boyuna bağlı değildir; yalnız açı ve hedef kütlesiyle belirlenir.",
  alt: "Yatay eksende 0–180 derece saçılma açısı, düşey eksende pikometre dalga boyu kayması; 0’dan 2λC’ye monoton artan eğri ve 90 ile 180 dereceyi işaretleyen noktalar.",
  param: { label: "θ", min: 0, max: 180, step: 10, init: 90, unit: "°", plain: true },
  draw: (th) => {
    const X = (d: number) => d / 25, Y = (dl: number) => dl * 0.75, D = (d: number) => LC * (1 - Math.cos(R(d)));
    const els: El[] = [...axes(v(0, 0), 7.8, 4.0, "θ (°)", "Δλ (pm)")];
    els.push(poly(curve(D, 0, 180, 60, X, Y), { open: true, tone: "a", bold: true }));
    for (const d of [90, 180]) els.push(...xtick(X(d), 0, String(d)));
    els.push(...ytick(0, Y(LC), "λC"), ...ytick(0, Y(2 * LC), "2λC"));
    els.push(seg(v(0, Y(LC)), v(X(90), Y(LC)), { tone: "muted", dash: true, thin: true }));
    els.push(pt(v(X(th), Y(D(th))), `${nf(D(th), 3)} pm`, th > 140 ? "w" : "nw", "a"));
    els.push(...pad(-1.0, 4.4, 8.6, -0.8));
    return { els, readout: [`Δλ = 2,426·(1 − cos${th}°) = ${nf(D(th), 3)} pm.`, "Aynı θ’da 5 pm ya da 50 pm gelen ışık aynı Δλ’yı alır; enerji kaybı farklıdır."] };
  },
};

const energyBudget: FigureDef = {
  caption:
    "Aynı örnek: λ = 5 pm, Eγ = 1240 eV·nm / 0,005 nm = 248 keV. Açıyı değiştir: durgun elektronun mₑc² enerjisi iki tarafta sadeleşir, Eγ = Eγ′ + Kₑ kalır. Çubuk boyu keV ile orantılı; büyük açıda elektrona giden pay artar ama foton yok olmaz.",
  alt: "Solda gelen foton enerjisi çubuğu; sağda aynı yükseklikte, saçılan foton enerjisi ve elektron kinetik enerjisinden oluşan yığılı çubuk.",
  param: { label: "θ", min: 0, max: 180, step: 10, init: 90, unit: "°", plain: true },
  draw: (th) => {
    const lp = LAM0 + LC * (1 - Math.cos(R(th))), E = 1.24 / (LAM0 / 1000), Ep = 1.24 / (lp / 1000), K = E - Ep, S = 1 / 70;
    const els: El[] = [seg(v(-0.4, 0), v(5.4, 0), { tone: "muted", thin: true })];
    els.push(box(0, 0, 1.2, E * S, "a"), txt(v(0.6, E * S + 0.1), `Eγ = ${nf(E, 0)} keV`, "n", { tone: "a", small: true, bold: true }));
    els.push(box(2.6, 0, 3.8, Ep * S, "b"), txt(v(3.95, (Ep * S) / 2), `Eγ′ = ${nf(Ep, 1)}`, "e", { tone: "b", small: true, bold: true }));
    if (K > 0.5) els.push(box(2.6, Ep * S, 3.8, E * S, "warn"));
    els.push(txt(v(3.95, Ep * S + Math.max(K * S, 0.3) / 2 + 0.15), `Kₑ = ${nf(K, 1)}`, "e", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-0.6, E * S + 0.7, 6.6, -0.4));
    return { els, readout: [`λ′ = ${nf(lp, 3)} pm ⇒ Eγ′ = 1,24 keV·nm / ${nf(lp / 1000, 6)} nm = ${nf(Ep, 1)} keV.`, `Kₑ = ${nf(E, 0)} − ${nf(Ep, 1)} = ${nf(K, 1)} keV (%${nf((100 * K) / E, 1)}).`] };
  },
};

const deBroglie: FigureDef = {
  caption:
    "Durgun elektron U voltla hızlandırılır: K = eU ≪ mₑc² iken λ = h/√(2mₑeU) ≈ 1,226/√U nm. Gerilimi değiştir: U dört katına çıkınca λ yarıya iner (açık nokta 4U). 400 V’ta bile K/mₑc² < 0,001; klasik yaklaşım yeterli.",
  alt: "Yatay eksende volt cinsinden gerilim, düşey eksende nanometre dalga boyu; azalan 1/√U eğrisi, seçili gerilimde dolu nokta ve dört katında açık nokta.",
  param: { label: "Gerilim U", min: 25, max: 400, step: 25, init: 100, unit: " V", plain: true },
  draw: (U) => {
    const X = (u: number) => u / 200, Y = (l: number) => l * 14, L = (u: number) => 1.226 / Math.sqrt(u);
    const els: El[] = [...axes(v(0, 0), 8.6, 4.0, "U (V)", "λ (nm)")];
    els.push(poly(curve(L, 20, 1600, 100, X, Y), { open: true, tone: "a", bold: true }));
    els.push(pt(v(X(U), Y(L(U))), `${nf(L(U), 3)} nm`, "ne", "a"));
    els.push(pt(v(X(4 * U), Y(L(4 * U))), `4U: ${nf(L(4 * U), 3)}`, "n", "b", true));
    for (const u of [400, 800, 1600]) els.push(...xtick(X(u), 0, String(u)));
    for (const l of [0.1, 0.2]) els.push(...ytick(0, Y(l), nf(l, 1)));
    els.push(...pad(-1.0, 4.4, 9.2, -0.8));
    return { els, readout: [`λ = 1,226/√${U} = ${nf(L(U), 4)} nm; 4U = ${4 * U} V’ta ${nf(L(4 * U), 4)} nm.`, `K/mₑc² = ${U}/511.000 = ${sci(U / 511000)}.`] };
  },
};

/* ===================== Elektromanyetik dalgalar ===================== */

const DZ: V = v(-0.55, -0.4); // z ekseninin eğik izdüşümü (birim boy)
const pz = (x: number, y: number, z: number): V => v(x + DZ[0] * z, y + DZ[1] * z);

const emWave: FigureDef = {
  caption:
    "Boşlukta düzlem dalga, eğik izdüşüm (ölçekli değil). Fazı (zamanı) değiştir: E +y doğrultusunda, B +z doğrultusunda salınır; ikisi aynı fazda sıfırdan geçer ve tepe yapar. E×B her anda +x’i gösterir; desen +x yönünde ilerler. Eğrilerin eşit yüksekliği E₀ = cB₀ normalizasyonudur, sayısal eşitlik değil.",
  alt: "Yatay x ekseni boyunca dikey düzlemde sinüs biçimli E eğrisi ve ona dik eğik düzlemde aynı fazlı B eğrisi; eksenden eğrilere uzanan kısa alan okları ve sağa ilerleme oku.",
  param: { label: "Faz ωt", min: 0, max: 360, step: 15, init: 0, unit: "°", plain: true },
  draw: (ph) => {
    const k = (2 * Math.PI) / 4, A = 1.3, X1 = 8;
    const f = (x: number) => Math.cos(k * x - R(ph));
    const els: El[] = [vec(v(-0.3, 0), v(X1 + 0.5, 0), { tone: "ink", thin: true }), vec(v(0, 0), v(0, 1.8), { tone: "muted", thin: true }), vec(v(0, 0), pz(0, 0, 2.2), { tone: "muted", thin: true })];
    els.push(txt(v(X1 + 0.6, 0), "x", "e", { tone: "ink", small: true }), txt(v(0, 1.9), "y", "n", { tone: "muted", small: true }), txt(pz(0, 0, 2.3), "z", "sw", { tone: "muted", small: true }));
    const Ep: V[] = [], Bp: V[] = [];
    for (let i = 0; i <= 80; i++) {
      const x = (X1 * i) / 80;
      Ep.push(v(x, A * f(x)));
      Bp.push(pz(x, 0, A * f(x)));
    }
    els.push(poly(Ep, { open: true, tone: "a", bold: true }), poly(Bp, { open: true, tone: "b", bold: true, dash: true }));
    for (let x = 0.5; x < X1; x += 1) {
      const e = A * f(x);
      if (Math.abs(e) > 0.15) els.push(seg(v(x, 0), v(x, e), { tone: "a", thin: true }), seg(v(x, 0), pz(x, 0, e), { tone: "b", thin: true }));
    }
    els.push(txt(v(0.6, 2.4), "E (y): dolu", "e", { tone: "a", small: true, bold: true }), txt(v(0.6, 1.95), "B (z): kesikli", "e", { tone: "b", small: true, bold: true }));
    els.push(vec(v(5.2, 2.0), v(7.2, 2.0), { tone: "c", bold: true }), txt(v(7.3, 2.0), "E×B: +x", "e", { tone: "c", small: true, bold: true }));
    els.push(...pad(-1.6, 2.6, 10.2, -2.2));
    return { els, readout: [`x = 0’da E/E₀ = B/B₀ = cos${ph}° = ${nf(Math.cos(R(ph)), 2)}.`, "E₀ = 120 V/m ise B₀ = E₀/c = 4,00·10⁻⁷ T; birimler farklı, oran c."] };
  },
};

const flowSquare: FigureDef = {
  caption:
    "Normalize alanlar E/E₀ ve B/B₀ aynı fazdadır (iki eğri çakışır); alt panel E·B çarpımıdır ve enerji akışı ile orantılıdır. Fazı değiştir: alanlar birlikte işaret değiştirdiğinde çarpım yine pozitiftir, akış hep +x’tir; alanların sıfır olduğu yerde anlık akış sıfırdır, dalga geri dönmez.",
  alt: "Üst panelde aynı fazlı iki çakışan kosinüs eğrisi (dolu E, kesikli B); alt panelde hep sıfırın üstünde kalan kare kosinüs eğrisi ve seçili x = 0 noktaları.",
  param: { label: "Faz ωt", min: 0, max: 360, step: 15, init: 45, unit: "°", plain: true },
  draw: (ph) => {
    const k = (2 * Math.PI) / 4, X1 = 8, A = 1.1, f = (x: number) => Math.cos(k * x - R(ph));
    const top = 2.6;
    const els: El[] = [seg(v(0, top), v(X1, top), { tone: "muted", thin: true }), seg(v(0, 0), v(X1, 0), { tone: "muted", thin: true })];
    els.push(poly(curve(f, 0, X1, 80, (x) => x, (y) => top + A * y), { open: true, tone: "a", bold: true }));
    els.push(poly(curve(f, 0, X1, 80, (x) => x, (y) => top + A * y), { open: true, tone: "b", dash: true }));
    els.push(poly(curve((x) => f(x) ** 2, 0, X1, 80, (x) => x, (y) => A * y), { open: true, tone: "c", bold: true }));
    els.push(txt(v(X1 + 0.15, top), "E/E₀, B/B₀", "e", { tone: "a", small: true }), txt(v(X1 + 0.15, 0), "E·B ∝ akış", "e", { tone: "c", small: true }));
    els.push(pt(v(0, top + A * f(0)), undefined, "e", "a"), pt(v(0, A * f(0) ** 2), undefined, "e", "c"));
    els.push(...pad(-0.4, top + A + 0.4, 10.6, -0.5));
    return { els, readout: [`x = 0: E/E₀ = B/B₀ = ${nf(f(0), 2)}, çarpım ${nf(f(0) ** 2, 2)} (negatif olmaz).`, "E ve B birlikte ters dönünce E×B yönü değişmez: hep +x."] };
  },
};

const BANDS: { name: string; a: number; b: number; tone: "a" | "b" | "c" | "muted" | "warn" }[] = [
  { name: "gama", a: -12, b: -11, tone: "warn" },
  { name: "X", a: -11, b: -8, tone: "b" },
  { name: "morötesi", a: -8, b: -6.4, tone: "a" },
  { name: "görünür", a: -6.4, b: -6.15, tone: "c" },
  { name: "kızılötesi", a: -6.15, b: -3, tone: "warn" },
  { name: "mikrodalga", a: -3, b: 0, tone: "b" },
  { name: "radyo", a: 0, b: 3, tone: "a" },
];

const spectrum: FigureDef = {
  caption:
    "Logaritmik dalga boyu ekseni (her çizgi 10 kat). Bölge sınırları yaklaşıktır ve kullanımla değişir. Dalga boyunu değiştir: c = λf ile frekans, E = hf ile tek foton enerjisi hesaplanır; sağa (uzun λ) gidildikçe ikisi de azalır, boşluk hızı hep c’dir.",
  alt: "Logaritmik dalga boyu ekseni üzerinde gama, X, morötesi, görünür, kızılötesi, mikrodalga ve radyo bölgeleri; seçili dalga boyunda dikey işaret.",
  param: { label: "log₁₀(λ / m)", min: -12, max: 2.5, step: 0.5, init: -6.5 },
  draw: (lg) => {
    const X = (l: number) => (l + 12) * 0.6, H = 0.6;
    const els: El[] = [];
    const ROW = [1, -1, 1, 2, -1, 1, -1];
    BANDS.forEach((b, i) => {
      els.push(box(X(b.a), 0, X(b.b), H, b.tone));
      const row = ROW[i], cx = (X(b.a) + X(b.b)) / 2;
      if (row === 2) els.push(seg(v(cx, H), v(cx, H + 1.0), { tone: "muted", thin: true }));
      els.push(txt(v(cx, row === 2 ? H + 1.05 : row > 0 ? H + 0.15 : -0.15), b.name, row > 0 ? "n" : "s", { tone: "ink", small: true }));
    });
    for (const l of [-12, -9, -6, -3, 0, 3]) els.push(seg(v(X(l), -1.0), v(X(l), -1.15), { tone: "muted", thin: true }), txt(v(X(l), -1.2), `10${String(l).split("").map((c) => SUP[c] ?? c).join("")}`, "s", { tone: "muted", small: true, soft: true }));
    els.push(seg(v(X(-12), -1.0), v(X(3), -1.0), { tone: "muted", thin: true }), txt(v(X(3) + 0.15, -1.0), "λ (m)", "e", { tone: "muted", small: true }));
    els.push(seg(v(X(lg), 0), v(X(lg), H), { tone: "ink", bold: true }), poly([v(X(lg), -0.95), v(X(lg) - 0.15, -0.7), v(X(lg) + 0.15, -0.7)], { fill: "ink", tone: "ink" }));
    els.push(...pad(-0.5, H + 1.9, X(3) + 1.6, -1.9));
    const lam = 10 ** lg, f = cL / lam, eV = (hP * f) / 1.602e-19;
    const band = BANDS.find((b) => lg >= b.a && lg < b.b)?.name ?? (lg >= 3 ? "radyo" : "gama");
    return { els, readout: [`λ = ${sci(lam)} m (${band}): f = c/λ = ${sci(f)} Hz.`, `Tek foton E = hf = ${sci(eV)} eV.`] };
  },
};

const medium: FigureDef = {
  caption:
    "Örnek: boşlukta λ₀ = 600 nm (f = 5,00×10¹⁴ Hz) ışık saydam ortama giriyor. Kırılma indisini değiştir: frekans sınırda korunur; faz hızı c/n ve dalga boyu λ₀/n olur. Daha yavaş dalga daha sık sıkışır; tek foton enerjisi hf değişmez.",
  alt: "Solda boşlukta uzun dalga boylu sinüs, dikey sınır çizgisinin sağında aynı genlikte ama sıkışmış dalga boylu sinüs; iki bölgenin dalga boyu ölçüleri.",
  param: { label: "Kırılma indisi n", min: 1, max: 2, step: 0.1, init: 1.5 },
  draw: (n) => {
    const L0 = 2, Ln = L0 / n, A = 0.8, X0 = -5, X1 = 5;
    const els: El[] = [box(0, -1.3, X1, 1.3, "c"), seg(v(0, -1.3), v(0, 1.3), { tone: "ink", thin: true })];
    els.push(poly(curve((x) => Math.sin((2 * Math.PI * x) / L0), X0, 0, 80, (x) => x, (y) => A * y), { open: true, tone: "a", bold: true }));
    els.push(poly(curve((x) => Math.sin((2 * Math.PI * x) / Ln), 0, X1, 120, (x) => x, (y) => A * y), { open: true, tone: "a", bold: true }));
    const s0 = -4, s1 = Ln;
    els.push(seg(v(s0, -1.6), v(s0 + L0, -1.6), { tone: "b", thin: true }), txt(v(s0 + L0 / 2, -1.7), "λ₀ = 600 nm", "s", { tone: "b", small: true }));
    els.push(seg(v(s1, -1.6), v(s1 + Ln, -1.6), { tone: "b", thin: true }), txt(v(s1 + Ln / 2, -1.7), `λ = ${nf(600 / n, 0)} nm`, "s", { tone: "b", small: true }));
    els.push(txt(v(-2.5, 1.5), "boşluk", "n", { tone: "muted", small: true }), txt(v(2.5, 1.5), `n = ${nf(n, 1)}`, "n", { tone: "muted", small: true }));
    els.push(...pad(-5.3, 2.1, 5.3, -2.4));
    return { els, readout: [`v = c/n = ${sci(cL / n)} m/s; λ = 600/${nf(n, 1)} = ${nf(600 / n, 0)} nm.`, "f = v/λ = 5,00×10¹⁴ Hz her iki bölgede aynı."] };
  },
};

export const physicsFigures060Modern: Record<string, Record<string, FigureDef>> = {
  "ozel-gorelilik": {
    "Lorentz katsayısının davranışı": gammaCurve,
    "Işık saati düşüncesi": lightClock,
    "Öz uzunluk ve paralel büzülme": contraction,
    "Durgun enerji ve toplam enerji": energyBars,
  },
  "siyah-cisim-foton": {
    "Wien kayma yasası": wien,
    "Sıcaklık artınca tayf değişimi": spectrumRise,
    "Stefan-Boltzmann toplamı": stefan,
    "Foton enerjisi ve dalga boyu": photonEnergy,
    "Tek foton ile demetin toplamı": beam,
  },
  "compton-debroglie": {
    "Momentum üçgeni": momentumTriangle,
    "Sıfır, dik ve geri açı": shiftCurve,
    "Enerji bütçesi": energyBudget,
    "Elektronu gerilimle hızlandırma": deBroglie,
  },
  "elektromanyetik-dalgalar": {
    "E, B ve ilerleme doğrultusunu kur": emWave,
    "Alan karesinden akışı yorumla": flowSquare,
    "Spektrumu ezber sırası yerine ilişkiyle kur": spectrum,
    "Ortam sınırında korunanı belirle": medium,
  },
};
