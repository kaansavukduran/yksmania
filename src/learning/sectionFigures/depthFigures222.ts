import {
  ATOMIC_MASS222, M_NH3_222, dec222, ironOxides222, mixRows222, mixSection222, multipleSection222, nitrogenOxides222, purityRows222,
  puritySection222, solidRows222, solidSection222, yieldRows222, yieldSection222, type Q222,
} from "../depth222";
import { seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { box, pad } from "./physicsFigures058Kit";
import { token } from "./mathFigures060TytKit";

/*
 * 0.222.0 TYT Kimya hesaplama çizimleri. Çubuk boyları, jetonlar ve bütün
 * etiketler depth222 tablolarını üreten aynı fonksiyonlardan gelir. Adım
 * değiştirmek öğrenme kaydı oluşturmaz; çizimler okunabilirlik için ölçeklidir.
 */

const n = (x: Q222) => x.n / x.d;
const pctText = (x: Q222) => `%${dec222(x)}`;

/* ---------- 1 · Yüzde verim: kapasite çubukları ve verim çubuğu ---------- */

const yieldFigure = (): FigureDef => {
  const rows = yieldRows222();
  const CAP = 2; // 1 mol kapasite = 2 birim
  const S = 0.15; // 1 g NH₃ = 0,15 birim
  const maxCap = Math.max(...rows.flatMap((r) => [n(r.capN), n(r.capH)]));
  const maxTheory = Math.max(...rows.map((r) => n(r.theoretical)));
  return {
    caption: "Her adım tablonun bir deneyidir. Üstteki iki çubuk n(N₂)/1 ve n(H₂)/3 kapasiteleridir; kısa olan sınırlayıcıdır ve uyarı rengiyle vurgulanır; ikisi eşitse aynı renktedir. Alttaki çerçeve kuramsal NH₃, içindeki dolu kısım ölçülen NH₃’tür; dolu payın çerçeveye oranı yüzde verimdir.",
    alt: `Altı deney: ${rows.map((r) => `${r.label} deneyinde N₂ ${dec222(r.n2)} mol, H₂ ${dec222(r.h2)} mol, sınırlayıcı ${r.limiter}, kuramsal ${dec222(r.theoretical)} g, gerçek ${dec222(r.actual)} g, verim ${pctText(r.percent)}`).join("; ")}.`,
    steps: rows.map((r) => `${r.label} deneyi`),
    draw: (_, step) => {
      const r = rows[step];
      const els: El[] = [];
      const capRow = (y: number, label: string, value: Q222, tone: Tone) => {
        els.push(box(0, y, n(value) * CAP, y + 0.6, tone), txt(v(-0.3, y + 0.3), label, "w", { small: true }));
        els.push(txt(v(n(value) * CAP + 0.25, y + 0.3), `${dec222(value)} mol`, "e", { small: true, tone }));
      };
      const equal = r.limiter === "Tam oranlı";
      capRow(3.6, "n(N₂)/1", r.capN, equal ? "b" : r.limiter === "N₂" ? "warn" : "muted");
      capRow(2.6, "n(H₂)/3", r.capH, equal ? "b" : r.limiter === "H₂" ? "warn" : "muted");
      const T = n(r.theoretical) * S;
      const A = n(r.actual) * S;
      els.push(box(0, 0, A, 0.8, "c"), box(0, 0, T, 0.8, "ink", false));
      els.push(txt(v(-0.3, 0.4), "NH₃", "w", { small: true, bold: true }));
      els.push(txt(v(T, 1.0), `kuramsal ${dec222(r.theoretical)} g`, "nw", { small: true }));
      els.push(txt(v(0, -0.2), `gerçek ${dec222(r.actual)} g`, "se", { small: true, tone: "c", bold: true }));
      els.push(txt(v(T + 0.3, 0.4), pctText(r.percent), "e", { bold: true, tone: "c" }));
      els.push(...pad(-2.8, 4.6, Math.max(maxCap * CAP + 2.4, maxTheory * S + 2), -1.2));
      return {
        els,
        readout: [
          `ξ = min(${dec222(r.capN)}; ${dec222(r.capH)}) = ${dec222(r.xi)} mol; ${r.limiter === "Tam oranlı" ? "tam oranlı, ikisi de tükenir" : `sınırlayıcı: ${r.limiter}`}.`,
          `Kuramsal NH₃ = 2 × ${dec222(r.xi)} × ${M_NH3_222} = ${dec222(r.theoretical)} g; verim = ${dec222(r.actual)}/${dec222(r.theoretical)} × 100 = ${pctText(r.percent)}.`,
        ],
      };
    },
  };
};

/* ---------- 2 · Saflık: numune çubuğu ---------- */

const purityFigure = (): FigureDef => {
  const rows = purityRows222();
  const W = 10;
  return {
    caption: "Her adım tablonun bir satırıdır. Çubuğun tamamı numunedir; renkli kısım gazdan geri hesaplanan saf reaktif, soluk kısım inert bileşendir. Saflık, renkli kısmın çubuğun tamamına oranıdır.",
    alt: `Altı numune: ${rows.map((r) => `${r.equation}, ${dec222(r.sample)} g numune, ${dec222(r.gasMass)} g ${r.gas}, saf ${r.reactant} ${dec222(r.pure)} g, inert ${dec222(r.inertMass)} g, saflık ${pctText(r.percent)}`).join("; ")}.`,
    steps: rows.map((r) => r.reactant),
    draw: (_, step) => {
      const r = rows[step];
      const P = (n(r.pure) / n(r.sample)) * W;
      const els: El[] = [box(0, 0, P, 1, "c"), box(P, 0, W, 1, "muted"), box(0, 0, W, 1, "ink", false)];
      els.push(txt(v(0, 2.3), r.equation, "e", { bold: true }));
      els.push(txt(v(0, 1.2), `saf ${r.reactant}: ${dec222(r.pure)} g`, "ne", { small: true, tone: "c", bold: true }));
      els.push(txt(v(W, 1.2), `${r.inert}: ${dec222(r.inertMass)} g`, "nw", { small: true }));
      els.push(txt(v(0, -0.2), `numune ${dec222(r.sample)} g`, "se", { small: true }));
      els.push(txt(v(W, -0.2), `saflık ${pctText(r.percent)}`, "sw", { small: true, tone: "c", bold: true }));
      els.push(...pad(-0.4, 3.2, W + 0.4, -1.3));
      return {
        els,
        readout: [
          `${dec222(r.gasMass)} g ${r.gas} = ${dec222(r.nGas)} mol ⇒ ${dec222(r.nReactant)} mol ${r.reactant} (katsayı oranı ${r.a}:${r.b}).`,
          `Saf ${r.reactant} = ${dec222(r.pure)} g; saflık = ${dec222(r.pure)}/${dec222(r.sample)} × 100 = ${pctText(r.percent)}.`,
        ],
      };
    },
  };
};

/* ---------- 3 · Tepkimeli karışım: kütle ve gaz katkıları ---------- */

const mixFigure = (): FigureDef => {
  const rows = mixRows222();
  const W = 10;
  return {
    caption: "Her adım tablonun bir karışımıdır. Üst çubuk toplam kütleyi, alt çubuk toplanan gazı bileşenlere böler; aynı renk aynı bileşendir ve iki çubuk da kendi toplamına göre ölçeklidir. Seçici karışımda ikinci bileşenin gaz payı sıfırdır.",
    alt: `Altı karışım: ${rows.map((r) => `${r.label}: ${r.first.name} ${dec222(r.m1)} g ve ${dec222(r.gas1)} mol ${r.gasName}, ${r.second.name} ${dec222(r.m2)} g ve ${dec222(r.gas2)} mol ${r.gasName}`).join("; ")}.`,
    steps: rows.map((r) => r.label),
    draw: (_, step) => {
      const r = rows[step];
      const els: El[] = [];
      const bar = (y: number, a: Q222, b: Q222) => {
        const total = n(a) + n(b);
        const k = (n(a) / total) * W;
        if (n(a) > 0) els.push(box(0, y, k, y + 0.8, "a"));
        if (n(b) > 0) els.push(box(k, y, W, y + 0.8, "b"));
        els.push(box(0, y, W, y + 0.8, "ink", false));
      };
      bar(0, r.m1, r.m2);
      bar(-2.4, r.gas1, r.gas2);
      els.push(txt(v(0, 1.0), `${r.first.name} ${dec222(r.m1)} g`, "ne", { small: true, tone: "a", bold: true }));
      els.push(txt(v(W, 1.0), `${r.second.name} ${dec222(r.m2)} g`, "nw", { small: true, tone: "b", bold: true }));
      els.push(txt(v(0, -2.6), `${dec222(r.gas1)} mol`, "se", { small: true, tone: "a", bold: true }));
      els.push(txt(v(W, -2.6), `${dec222(r.gas2)} mol`, "sw", { small: true, tone: "b", bold: true }));
      els.push(txt(v(W + 0.3, 0.4), `${dec222(r.mass)} g`, "e", { small: true }));
      els.push(txt(v(W + 0.3, -2.0), `${dec222(r.gasMol)} mol ${r.gasName}`, "e", { small: true }));
      els.push(txt(v(-0.3, 0.4), "kütle", "w", { small: true }), txt(v(-0.3, -2.0), "gaz", "w", { small: true }));
      els.push(...pad(-2.2, 2.0, W + 4.2, -3.8));
      return {
        els,
        readout: [
          `${r.condition}: x = ${dec222(r.x)} mol ${r.first.name}, y = ${dec222(r.y)} mol ${r.second.name}.`,
          `Kütle ${dec222(r.m1)} + ${dec222(r.m2)} = ${dec222(r.mass)} g; gaz ${dec222(r.gas1)} + ${dec222(r.gas2)} = ${dec222(r.gasMol)} mol.`,
        ],
      };
    },
  };
};

/* ---------- 4 · Katlı oranlar: eşit elemente atom jetonları ---------- */

const multipleFigure = (): FigureDef => {
  const series = [nitrogenOxides222, ironOxides222] as const;
  const STEP = 0.75;
  const SIZE = 0.56;
  return {
    caption: "Her satırda bileşiğin formül birimi, sabit element sayısı EKOK’a eşit olacak kadar alınmıştır (soldaki çarpan). Sabit elementin ve oksijenin atomları iki ayrı renkte jetondur (renk anahtarı çizimin altındadır); oksijen jetonlarının sayıları seri içi küçük tam sayılı oranı verir.",
    alt: series.map((rows) => `${rows[0].L} ${rows[0].element} atomuna eşitlenen seri: ${rows.map((r) => `${r.scale} × ${r.formula}, ${r.oxygenAtoms} O atomu, ${r.oxygenMass} g O`).join("; ")}`).join(". "),
    steps: series.map((rows) => `${rows[0].element} oksitleri`),
    draw: (_, step) => {
      const rows = series[step];
      const els: El[] = [];
      const x0 = 3;
      const maxO = Math.max(...series.flatMap((rs) => rs.map((r) => r.L + r.oxygenAtoms)));
      rows.forEach((r, i) => {
        const y = -i * 1.1;
        els.push(txt(v(x0 - 0.5, y), `${r.scale} × ${r.formula}`, "w", { small: true, bold: true }));
        for (let k = 0; k < r.L; k += 1) els.push(token(x0 + k * STEP, y, SIZE, "b"));
        const ox = x0 + r.L * STEP + 0.35;
        for (let k = 0; k < r.oxygenAtoms; k += 1) els.push(token(ox + k * STEP, y, SIZE, "warn"));
        els.push(txt(v(ox + r.oxygenAtoms * STEP, y), `${r.oxygenMass} g O`, "e", { small: true }));
      });
      els.push(txt(v(x0 - 0.3, 1.0), `${rows[0].L} ${rows[0].element} = ${rows[0].fixedMass} g`, "e", { small: true, tone: "b", bold: true }));
      els.push(...pad(-1.2, 1.7, x0 + maxO * STEP + 3.6, -(4 * 1.1) - 0.6));
      return {
        els,
        legend: [
          { code: rows[0].element, label: `${rows[0].element} atomu (${ATOMIC_MASS222[rows[0].element]} g/mol)`, tone: "b" },
          { code: "O", label: `O atomu (${ATOMIC_MASS222.O} g/mol)`, tone: "warn" },
        ],
        readout: [
          `${rows[0].fixedMass} g ${rows[0].element}’ye bağlanan O: ${rows.map((r) => `${r.formula} ${r.oxygenMass} g`).join(", ")}.`,
          `Seri içi oran ${rows.map((r) => r.ratio).join(" : ")}.`,
        ],
      };
    },
  };
};

/* ---------- 5 · Katı kütlesi: önce ve sonra ---------- */

const solidFigure = (): FigureDef => {
  const rows = solidRows222();
  const H = 0.05; // 1 g = 0,05 birim
  const top = Math.max(...rows.flatMap((r) => [n(r.start), n(r.end)])) * H;
  return {
    caption: "Her adım tablonun bir satırıdır: soldaki çubuk 1 mol giren katı, sağdaki tepkime sonundaki katıdır. Ok üstündeki sayı katı farkıdır; ayrışma ve indirgenmede gaz çıktığı için katı azalır, yanmada bağlanan oksijen katıyı artırır.",
    alt: `Sekiz tepkime: ${rows.map((r) => `${r.equation}, ${dec222(r.start)} g ${r.solid[0]} ile başlar, ${dec222(r.end)} g katı kalır`).join("; ")}.`,
    steps: rows.map((r) => r.solid[0]),
    draw: (_, step) => {
      const r = rows[step];
      const hs = n(r.start) * H;
      const he = n(r.end) * H;
      const prod = r.products.map(([f]) => f).join(" + ");
      const els: El[] = [
        seg(v(-0.6, 0), v(8.2, 0), { tone: "muted", thin: true }),
        box(0, 0, 1.6, hs, "muted"),
        box(6, 0, 7.6, he, r.kind === "yanma" ? "a" : "c"),
        vec(v(2.2, 0.4), v(5.4, 0.4), { tone: "ink" }),
      ];
      els.push(txt(v(0.8, hs + 0.15), `${dec222(r.start)} g ${r.solid[0]}`, "n", { small: true, bold: true }));
      els.push(txt(v(6.8, he + 0.15), `${dec222(r.end)} g ${prod}`, "n", { small: true, bold: true, tone: r.kind === "yanma" ? "a" : "c" }));
      els.push(txt(v(3.8, 0.7), `${r.change.n > 0 ? "+" : ""}${dec222(r.change)} g`, "n", { small: true, bold: true, tone: "warn" }));
      els.push(txt(v(0, -0.25), r.equation, "se", { small: true }));
      els.push(...pad(-1.6, top + 1.2, 9.4, -1.2));
      const ins = r.perGas(r.gasIn).map(({ f, mass }) => `${dec222(mass)} g ${f}`);
      const outs = r.perGas(r.gasOut).map(({ f, mass }) => `${dec222(mass)} g ${f}`);
      return {
        els,
        readout: [
          `Giren gaz: ${ins.length ? ins.join(" + ") : "yok"}; çıkan gaz: ${outs.length ? outs.join(" + ") : "yok"}.`,
          `Katı farkı ${dec222(r.end)} − ${dec222(r.start)} = ${dec222(r.change)} g = giren − çıkan gaz.`,
        ],
      };
    },
  };
};

export const depthFigures222: Record<string, Record<string, FigureDef>> = {
  "yuzde-verim": { [yieldSection222.title]: yieldFigure() },
  "safsizlik-problemleri": { [puritySection222.title]: purityFigure() },
  "tepkimeli-karisim": { [mixSection222.title]: mixFigure() },
  "katli-oranlar": { [multipleSection222.title]: multipleFigure() },
  "kati-kutlesi-degisimi": { [solidSection222.title]: solidFigure() },
};
