import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Yüzde verim. A bar with the theoretical product as its full length and the
 * measured product filled in; a flow from impure sample to measured product
 * in which purity and yield act on different bases; a two-stage funnel; and
 * the 2025 TYT Fen 12 water decomposition counted in moles of gas. Numbers are
 * the source's original examples.
 */

const tr = (x: number, d = 2) => x.toLocaleString("tr-TR", { maximumFractionDigits: d });
function box(x: number, y: number, w: number, h: number, tone: Tone, fill = true): El {
  return poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], fill ? { tone, fill: tone } : { tone, thin: true });
}

/* ---------- 1. Gerçek / teorik ---------- */
const ratio: FigureDef = {
  caption:
    "Sürgüyle ölçülen (gerçek) ürünü değiştir. Teorik ürün 20 g: çerçevenin tamamı. Yüzde verim = gerçek ÷ teorik × 100. Pay ölçülen, payda beklenendir; sonuç %100'ü aşıyorsa hesabı değil veriyi sorgula (saflık, nem, ölçüm).",
  alt: "Yatay bir çerçeve teorik 20 gramı gösteriyor; içinde gerçek ürün kadar dolu çubuk ve üstünde 0, 5, 10, 15, 20 gram ölçeği. 20 grama geçince çubuk çerçeveden taşıyor ve uyarı çıkıyor.",
  param: { label: "Gerçek ürün", min: 0, max: 24, step: 1, init: 15, unit: "g" },
  draw: (g) => {
    const S = 0.4;
    const els: El[] = [box(0, -0.5, 20 * S, 1, "muted", false)];
    if (g > 0) els.push(box(0, -0.5, g * S, 1, g > 20 ? "warn" : "c"));
    for (let t = 0; t <= 20; t += 5) els.push(seg(v(t * S, -0.5), v(t * S, -0.7), { tone: "ink" }), txt(v(t * S - 0.05, -0.75), `${t}`, "sw", { tone: "ink", small: true }));
    els.push(seg(v(20 * S, -0.6), v(20 * S, -1.3), { tone: "muted", thin: true }), txt(v(20 * S, -1.35), "teorik 20 g", "s", { tone: "muted", small: true, bold: true }));
    if (g > 0) els.push(seg(v(g * S, 0.5), v(g * S, 1.3), { tone: g > 20 ? "warn" : "c", thin: true }), txt(v(g * S, 1.4), `gerçek ${g} g`, "n", { tone: g > 20 ? "warn" : "c", small: true, bold: true }));
    els.push(txt(v(-0.6, 2.0), " ", "c"), txt(v(10.6, -2.0), " ", "c"));
    const pct = (g / 20) * 100;
    return {
      els,
      readout: [
        `% verim = ${g} ÷ 20 × 100 = %${tr(pct, 1)}`,
        g > 20 ? "%100'ün üstü: ideal tek ürün modelinde olamaz. Ürün nemli/saf değil ya da teorik hesap yanlış; otomatik %100'e yuvarlama." : g === 0 ? "Ürün ölçülmediyse verim %0 olabilir (teorik > 0 iken)." : "Ters kurma: 20 ÷ 15 × 100 = %133 yanlış; ölçülen pay olur.",
      ],
    };
  },
};

/* ---------- 2. Saflık ve verim ---------- */
const purity: FigureDef = {
  caption:
    "İleri ile akışı izle: 40 g örneğin yalnız %75'i CaCO₃'tür (saflık). Teorik CO₂ bu saf kısımdan hesaplanır; ölçülen CO₂ onun %80'idir (verim). Saflık örnek tabanına, verim teorik ürün tabanına uygulanır: ikisini aynı şey sanma.",
  alt: "Soldan sağa dört blok: 40 gramlık örnek (içinde 30 gram saf kısım ve 10 gram safsızlık), 0,30 mol CaCO₃, teorik 13,2 gram CO₂ ve ölçülen 10,56 gram CO₂; aralarında oklar ve yüzde etiketleri.",
  steps: ["Örnek: %75 saf", "Mole çevir", "Teorik CO₂", "Ölçülen: %80 verim"],
  draw: (_v, step) => {
    const els: El[] = [];
    const H = 0.1;
    const on = (i: number) => step >= i;
    const col = (x: number, h: number, tone: Tone, label: string, fill = true, low = false) => {
      els.push(box(x, 0, 1.4, h, tone, fill), txt(v(x + 0.7, low ? -0.8 : -0.2), label, "s", { tone, small: true, bold: true }));
    };
    // Sample 40 g: 30 pure + 10 impurity.
    els.push(box(0, 0, 1.4, 40 * H, "muted"), box(0, 0, 1.4, 30 * H, "c"));
    els.push(txt(v(0.7, -0.2), "örnek 40 g", "s", { tone: "ink", small: true, bold: true }), txt(v(1.55, 35 * H), "10 g safsızlık", "e", { tone: "muted", small: true }), txt(v(0.7, 15 * H), "30 g", "c", { tone: "c", small: true, bold: true }));
    const arrow = (x0: number, x1: number, y: number, label: string) => els.push(vec(v(x0, y), v(x1, y), { tone: "ink", thin: true }), txt(v((x0 + x1) / 2, y + 0.2), label, "n", { tone: "muted", small: true }));
    if (on(1)) {
      arrow(3.2, 4.3, 1.0, "÷ 100");
      col(4.5, 30 * H, "c", "0,30 mol CaCO₃");
    }
    if (on(2)) {
      arrow(6.1, 7.2, 1.0, "× 44");
      col(7.4, 13.2 * H * 2, "b", "teorik 13,2 g CO₂", false, true);
    }
    if (on(3)) {
      els.push(box(7.4, 0, 1.4, 10.56 * H * 2, "b"), txt(v(8.95, 10.56 * H * 2), "ölçülen 10,56 g", "e", { tone: "b", small: true, bold: true }));
    }
    els.push(txt(v(-0.4, 4.4), " ", "c"), txt(v(11.6, -1.5), " ", "c"));
    const rows: [string, string][] = [
      ["Saflık %75: 40 × 0,75 = 30 g CaCO₃ tepkimeye girebilir; 10 g safsızlık girmez.", "Saflık örnek kütlesine uygulanır."],
      ["n(CaCO₃) = 30 ÷ 100 = 0,30 mol.", "Gram ile mol doğrudan oranlanmaz; önce birimi birleştir."],
      ["CaCO₃ → CaO + CO₂: 1 : 1 → 0,30 mol CO₂ = 0,30 × 44 = 13,2 g (teorik).", "Teorik ürün, saf kısımdan tam dönüşümle oluşabilecek en çok üründür."],
      ["Verim = 10,56 ÷ 13,2 × 100 = %80.", "%75 saflığı bir kez daha verim diye çarpma: o adım teorik hesapta kullanıldı."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 3. Ardışık aşamalar ---------- */
const stages: FigureDef = {
  caption:
    "İleri ile iki ardışık aşamayı izle: tam verimle 20 mol C beklenir. 1. aşama %80, 2. aşama %75 verimliyse aynı akışta kesirler çarpılır: 0,80 × 0,75 = 0,60 → 12 mol C, toplam %60. Paralel (alternatif) yollarda kör çarpma yapılmaz.",
  alt: "Soldan sağa daralan üç çubuk: 20 mol (teorik), 16 mol (birinci aşamadan sonra), 12 mol (ikinci aşamadan sonra); aralarında ×0,80 ve ×0,75 okları.",
  steps: ["Teorik 20", "1. aşama %80", "2. aşama %75"],
  draw: (_v, step) => {
    const els: El[] = [];
    const vals = [20, 16, 12];
    const H = 0.18;
    vals.forEach((val, i) => {
      const x = i * 3.2;
      const on = i <= step;
      els.push(box(x, -(val * H) / 2, 1.4, val * H, on ? (i === 0 ? "muted" : "c") : "muted", on));
      if (on) els.push(txt(v(x + 0.7, (val * H) / 2 + 0.25), `${val} mol`, "n", { tone: i === 0 ? "ink" : "c", small: true, bold: true }));
      if (i > 0 && on) els.push(vec(v(x - 1.6, 0), v(x - 0.2, 0), { tone: "ink", thin: true }), txt(v(x - 0.9, 0.25), i === 1 ? "× 0,80" : "× 0,75", "n", { tone: "ink", small: true }));
    });
    els.push(txt(v(-0.6, 2.6), " ", "c"), txt(v(8.4, -2.4), " ", "c"));
    const rows: [string, string][] = [
      ["Tam verimle 20 mol C oluşurdu: bu teorik üst sınırdır.", "Her aşamanın verimi kendi girdisine göre tanımlanır."],
      ["1. aşama %80: ara ürünün 20 × 0,80 = 16 mol karşılığı elde edildi.", "Kayıp, sınırlayıcının artmasıyla değil tepkimenin eksik ilerlemesiyle ilgilidir."],
      ["2. aşama %75: 16 × 0,75 = 12 mol C. Toplam verim 12 ÷ 20 = %60 = 0,80 × 0,75.", "Yüzde puan ile yüzde farkı ayır: %75 ile %60 arası 15 yüzde puandır."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 4. 2025 TYT Fen 12 mantığı ---------- */
const water: FigureDef = {
  caption:
    "İleri ile 2025 TYT Fen 12'nin mantığını kur: 72 g su = 4 mol. 2H₂O → 2H₂ + O₂: her 2 mol sudan 3 mol gaz çıkar; tamamı ayrışsaydı 6 mol gaz (teorik). Ölçülen 67,2 L gaz normal koşulda 3 mol (gerçek). Verim = 3 ÷ 6 = %50. Ölçülen, iki gazın toplamıdır.",
  alt: "Solda dört su molekülü; ortada ok; sağda teorik altı gaz molekülü (dört H₂, iki O₂) yarı saydam, gerçekte oluşan üçü (iki H₂, bir O₂) dolu; altta oran.",
  steps: ["72 g su = 4 mol", "Teorik gaz: 6 mol", "Ölçülen: 3 mol", "Verim %50"],
  draw: (_v, step) => {
    const els: El[] = [];
    const wat = (x: number, y: number, done: boolean) => {
      els.push(ball(v(x, y), 0.26, done ? "muted" : "warn", "O"), ball(v(x - 0.3, y - 0.25), 0.15, done ? "muted" : "ink", "H"), ball(v(x + 0.3, y - 0.25), 0.15, done ? "muted" : "ink", "H"));
    };
    for (let i = 0; i < 4; i++) wat(-3.6 + (i % 2) * 1.1, 1.0 - Math.floor(i / 2) * 1.2, step >= 2 && i < 2);
    els.push(txt(v(-3.05, 1.8), "4 mol H₂O (72 g)", "n", { tone: "ink", small: true, bold: true }));
    if (step >= 1) {
      els.push(vec(v(-1.7, 0.4), v(-0.6, 0.4), { tone: "ink", bold: true }));
      // 4 H2 + 2 O2 theoretical
      for (let i = 0; i < 6; i++) {
        const isO = i >= 4;
        const x = 0 + (i % 3) * 1.1;
        const y = 1.0 - Math.floor(i / 3) * 1.2;
        const real = step >= 2 && (i === 0 || i === 1 || i === 4);
        const tone: Tone = real ? (isO ? "warn" : "b") : "muted";
        els.push(seg(v(x - 0.22, y), v(x + 0.22, y), { tone: "muted", bold: true }), ball(v(x - 0.22, y), isO ? 0.22 : 0.15, tone, isO ? "O" : "H"), ball(v(x + 0.22, y), isO ? 0.22 : 0.15, tone, isO ? "O" : "H"));
      }
      els.push(txt(v(1.1, 1.8), step >= 2 ? "gerçek 3 mol / teorik 6 mol gaz" : "teorik 6 mol gaz", "n", { tone: "b", small: true, bold: true }));
    }
    if (step === 3) els.push(txt(v(-0.5, -1.0), "verim = 3 ÷ 6 × 100 = %50", "s", { tone: "c", bold: true }));
    els.push(txt(v(-4.4, 2.4), " ", "c"), txt(v(3.6, -1.8), " ", "c"));
    const rows: [string, string][] = [
      ["n(H₂O) = 72 ÷ 18 = 4 mol.", "Önce kütleyi mole çevir; gaz hacmi de mol üzerinden karşılaştırılır."],
      ["2H₂O → 2H₂ + O₂: 2 mol su 3 mol gaz verir → 4 mol su tam ayrışırsa 4 H₂ + 2 O₂ = 6 mol gaz.", "Payda, suyun tamamı ayrışsaydı oluşacak toplam gazdır."],
      ["Ölçülen 67,2 L ÷ 22,4 L/mol = 3 mol gaz (2 mol H₂ + 1 mol O₂): 2 mol su ayrışmış.", "Gri moleküller oluşmayan (teorik ama gerçekleşmeyen) kısmı gösterir."],
      ["Verim = 3 ÷ 6 × 100 = %50 (resmî cevap A).", "Kontrol: 2 mol (36 g) su ayrışmadan kaldı."],
    ];
    return { els, readout: rows[step] };
  },
};

export const chemistryFiguresYield: Record<string, Record<string, FigureDef>> = {
  "yuzde-verim": {
    "Yüzdeyi doğru yönde kur": ratio,
    "Saflık ile verim iki ayrı tabandır": purity,
    "Ardışık verim ve karşılaştırma": stages,
    "Teorik ve gerçek aynı ürünü anlatmalı": water,
  },
};
