import { particleCoordinatesSource006 } from "../particleCoordinatesSource006";
import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type V } from "./figureKit";

/*
 * Atomun temel tanecikleri. Nucleus drawn as packed shaded spheres (protons
 * red with +, neutrons grey), the electron cloud as soft nested shells with
 * electrons at scattered positions, never on circular orbits. Sizes are not to
 * scale: a real nucleus is roughly 1/10 000 – 1/100 000 of the atom's diameter,
 * which the readout states instead of drawing.
 */

/** Nucleus of p protons and n neutrons packed on a golden-angle spiral. */
function nucleus(c: V, p: number, n: number, r = 0.2): El[] {
  const total = p + n;
  const items: { at: V; proton: boolean; z: number }[] = [];
  for (let i = 0; i < total; i++) {
    const rr = r * 1.05 * Math.sqrt(i);
    const a = i * 2.39996;
    // Interleave protons and neutrons so neither kind clumps on one side.
    const proton = p > 0 && (n === 0 || Math.floor(((i + 1) * p) / total) > Math.floor((i * p) / total));
    items.push({ at: v(c[0] + Math.cos(a) * rr, c[1] + Math.sin(a) * rr), proton, z: -i });
  }
  // Outer spheres first so the centre ones sit on top (a packed ball look).
  items.sort((x, y) => x.z - y.z);
  return items.map((it) => ball(it.at, r, it.proton ? "warn" : "muted", it.proton ? "+" : undefined));
}

function cloud(c: V, R: number): El[] {
  // Stacked translucent discs: denser (darker) towards the nucleus, no rings
  // that could be read as orbits.
  const disc = (r: number): V[] => Array.from({ length: 24 }, (_, i) => v(c[0] + Math.cos((i * Math.PI) / 12) * r, c[1] + Math.sin((i * Math.PI) / 12) * r));
  return [1, 0.78, 0.56, 0.36].map((k) => poly(disc(R * k), { tone: "b", fill: "b", bare: true, smooth: true }));
}

/** e electrons at scattered positions inside the cloud (not orbits). */
function electrons(c: V, e: number, R: number, highlightFrom = Infinity): El[] {
  const els: El[] = [];
  for (let i = 0; i < e; i++) {
    const a = i * 2.39996 + 0.6;
    const rr = R * (0.5 + 0.42 * ((i * 0.618) % 1));
    els.push(ball(v(c[0] + Math.cos(a) * rr, c[1] + Math.sin(a) * rr), 0.13, i >= highlightFrom ? "c" : "b", "−"));
  }
  return els;
}

const C0 = v(0, 0);

/* ---------- 1. Üç tanecik, iki bölge ---------- */
const regions: FigureDef = {
  caption:
    "İleri ile helyum-4 atomunu kur: çekirdekte 2 proton (+) ve 2 nötron, çevredeki bulutta 2 elektron (−). Elektronlar çizgi üstünde dönen gezegenler değildir; bulut, bulunabilecekleri bölgeyi gösterir. Boyutlar ölçekli değildir.",
  alt: "Ortada gölgeli kırmızı iki proton ve gri iki nötron topu; çevresinde iç içe yarı saydam mavi bulut katmanları ve bulut içinde iki küçük mavi elektron topu.",
  steps: ["Çekirdek: p ve n", "Elektron bulutu", "Yük dengesi", "Kütle nerede?"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step >= 1) els.push(...cloud(C0, 2.6), ...electrons(C0, 2, 2.6));
    els.push(...nucleus(C0, 2, 2, 0.28));
    if (step === 0) els.push(txt(v(0.9, 0.5), "çekirdek", "e", { tone: "ink", small: true, bold: true }));
    if (step >= 1) els.push(txt(v(2.7, 2.1), "elektron bulutu", "e", { tone: "b", small: true, bold: true }));
    els.push(txt(v(-4.4, 3), " ", "c"), txt(v(5.2, -3), " ", "c"));
    const rows: [string, string][] = [
      ["Proton (p): yük +1, çekirdekte, ≈ 1 u. Nötron (n): yüksüz, çekirdekte, ≈ 1 u.", "Proton sayısı elementin kimliğidir: 2 proton → helyum."],
      ["Elektron (e): yük −1, çekirdeğin çevresindeki bulutta, ≈ 1/1836 u (sıfır değil, çoğu hesapta ihmal edilir).", "Bulut katmanları olasılık bölgesidir, gezegen yörüngesi değildir."],
      ["Nötr atom: toplam (+) = toplam (−). He: 2 − 2 = 0.", "Nötr olmak taneciklerin yüksüz olması değil, yüklerin dengelenmesidir."],
      ["Kütlenin hemen tamamı çekirdekte, hacmin hemen tamamı bulutta.", "Gerçek oranda çekirdek, atom çapının yaklaşık 1/10.000 – 1/100.000'i kadardır; çizimde görünsün diye büyütüldü."],
    ];
    return {
      els,
      legend: [
        { code: "+", label: "proton (p)", tone: "warn" },
        { code: "", label: "nötron (n)", tone: "muted" },
        { code: "−", label: "elektron (e)", tone: "b" },
      ],
      readout: rows[step],
    };
  },
};

/* ---------- 2. Gösterimin dört konumu ---------- */
const notation: FigureDef = {
  caption:
    "İleri ile ²⁷₁₃Al³⁺ gösteriminin dört konumunu sırayla oku. Sol üst A (kütle numarası), sol alt Z (atom numarası), sağ üst net yük; sağ alttaki sayı ise formülde atom adedidir (O₂).",
  alt: "Renkli bloklara ayrılmış Al iyonu gösterimi; altında proton, nötron ve elektron sayıları yatay çubuklarla.",
  steps: ["Z = p", "A = p + n", "q = p − e", "Sağ alt: atom adedi"],
  draw: (_v, step) => {
    const p = 13;
    const n = 14;
    const e = 10;
    const els: El[] = [];
    const bar = (y: number, k: number, tone: "warn" | "muted" | "b", label: string, on: boolean) => {
      els.push(txt(v(-0.3, y), label, "w", { tone: on ? tone : "muted", small: true, bold: on }));
      for (let i = 0; i < k; i++) els.push(ball(v(i * 0.42 + 0.2, y), 0.17, on ? tone : "muted"));
      els.push(txt(v(k * 0.42 + 0.3, y), String(k), "e", { tone: on ? tone : "muted", small: true, bold: on }));
    };
    if (step < 3) {
      bar(1.2, p, "warn", "p", step === 0 || step === 2);
      bar(0.5, n, "muted", "n", step === 1);
      bar(-0.2, e, "b", "e", step === 2);
    } else {
      els.push(...[0, 1].map((i) => ball(v(i * 1.0 + 1.5, 0.5), 0.45, "warn", "O")), seg(v(1.95, 0.5), v(2.05, 0.5), { tone: "muted", bold: true }));
      els.push(txt(v(1.5, -0.4), "O₂: iki oksijen atomu", "e", { tone: "ink", small: true }));
    }
    els.push(txt(v(-1.4, 1.8), " ", "c"), txt(v(7, -0.6), " ", "c"));
    const word =
      step < 3
        ? [
            { s: "²⁷", tone: step === 1 ? ("c" as const) : ("muted" as const), label: "A = 27" },
            { s: "₁₃", tone: step === 0 || step === 1 ? ("warn" as const) : ("muted" as const), label: "Z = 13" },
            { s: "Al", tone: "ink" as const, label: "sembol" },
            { s: "³⁺", tone: step === 2 ? ("b" as const) : ("muted" as const), label: "q = +3" },
          ]
        : [
            { s: "O", tone: "ink" as const, label: "sembol" },
            { s: "₂", tone: "c" as const, label: "atom adedi" },
          ];
    const rows: [string, string][] = [
      ["Z = 13 → p = 13. Atom numarası proton sayısıdır; elementin kimliği budur.", "Sol alttaki sayı her zaman proton sayısıdır, iyonda da değişmez."],
      ["A = p + n → 27 = 13 + n → n = 14.", "A çekirdekteki tanecik adedidir, gram cinsinden kütle değildir."],
      ["q = p − e → +3 = 13 − e → e = 10.", "Katyon elektron vermiştir: e = Z − q = 13 − 3. “3+ için 3 elektron ekle” en sık hatadır."],
      ["Sağ alttaki 2, molekülde iki O atomu olduğunu söyler; elektron ya da yük değildir.", "¹⁶O₂ için toplam p = 16, toplam n = 16, toplam e = 16 (nötr)."],
    ];
    return { els, word, readout: rows[step] };
  },
};

/* ---------- 3. Elektron alıp vermede ne korunur? ---------- */
const ionize: FigureDef = {
  caption:
    "Sürgüyle oksijen-16 atomuna elektron ver (sola) ya da elektron ekle (sağa). Çekirdek hiç değişmez: p = 8, n = 8, A = 16 sabit; değişen yalnız e ve yüktür. Yeni eklenen elektronlar yeşil.",
  alt: "Ortada 8 proton ve 8 nötronlu gölgeli çekirdek, çevresinde elektron bulutu ve sürgüye göre değişen sayıda elektron topu.",
  param: { label: "Alınan (+) / verilen (−) elektron", min: -2, max: 2, step: 1, init: 0 },
  draw: (d) => {
    const k = Math.round(d);
    const e = 8 + k;
    const q = 8 - e;
    const els: El[] = [...cloud(C0, 2.8), ...electrons(C0, e, 2.8, 8), ...nucleus(C0, 8, 8, 0.24)];
    els.push(txt(v(-4.6, 3), " ", "c"), txt(v(4.6, -3), " ", "c"));
    const sup: Record<number, string> = { 2: "²⁺", 1: "⁺", [-1]: "⁻", [-2]: "²⁻" };
    const sym = q === 0 ? "O (nötr)" : `O${sup[q]}`;
    return {
      els,
      readout: [
        `${sym}: p = 8 · n = 8 · A = 16 · e = ${e} · q = 8 − ${e} = ${q > 0 ? "+" : ""}${q}`,
        k > 0
          ? "Elektron aldı → anyon. Proton değişmediği için hâlâ oksijendir."
          : k < 0
            ? "Elektron verdi → katyon. Yük, kaybedilen elektron kadar artar."
            : "Nötr: p = e. Kimyasal iyonlaşmada yalnız elektron sayısı değişir.",
      ],
    };
  },
};

/* ---------- 4. Grafikte eksenleri oku ---------- */
const labelAnchors = ["ne", "n", "nw"] as const;
const axes: FigureDef = {
  caption:
    "İleri ile her noktayı tabloya çevir: yatay eksen proton, düşey eksen elektron adedi. Yük = p − e. Kesik p = e doğrusu üzerindeki nokta nötrdür; aynı yatay çizgi aynı elektron sayısıdır, aynı element değildir.",
  alt: "Yatay ekseni p, düşey ekseni e olan grafik; U(11,10), V(8,10), W(10,10) noktaları ve kesik p = e doğrusu.",
  steps: ["U (11, 10)", "V (8, 10)", "W (10, 10)", "Eksenler yer değişirse"],
  draw: (_v, step) => {
    const S = 0.4;
    const X = (x: number) => x * S;
    const swap = step === 3;
    const els: El[] = [vec(v(0, 0), v(X(15), 0), { tone: "ink" }), vec(v(0, 0), v(0, X(15)), { tone: "ink" })];
    for (const t of [5, 10]) {
      els.push(seg(v(X(t), -0.08), v(X(t), 0.08), { tone: "ink" }), txt(v(X(t), -0.2), String(t), "s", { tone: "ink", small: true }));
      els.push(seg(v(-0.08, X(t)), v(0.08, X(t)), { tone: "ink" }), txt(v(-0.2, X(t)), String(t), "w", { tone: "ink", small: true }));
    }
    els.push(txt(v(X(15.3), 0), swap ? "e (adet)" : "p (adet)", "e", { tone: "ink", small: true, bold: true }), txt(v(0, X(15.6)), swap ? "p (adet)" : "e (adet)", "n", { tone: "ink", small: true, bold: true }));
    els.push(seg(v(0, 0), v(X(14), X(14)), { tone: "muted", dash: true, thin: true }), txt(v(X(13.2), X(14)), "p = e (nötr)", "w", { tone: "muted", small: true }));
    particleCoordinatesSource006.forEach((q, i) => {
      const on = i === step || (swap && i === 0);
      els.push(circle(v(X(q.p), X(q.e)), 0.12, { tone: on ? "warn" : "muted", fill: on ? "warn" : "muted" }), txt(v(X(q.p), X(q.e) + 0.15), q.name, labelAnchors[i], { tone: on ? "warn" : "muted", small: true, bold: on }));
    });
    if (step < 3) {
      const q = particleCoordinatesSource006[step];
      els.push(seg(v(X(q.p), 0), v(X(q.p), X(q.e)), { tone: "warn", dash: true, thin: true }), seg(v(0, X(q.e)), v(X(q.p), X(q.e)), { tone: "warn", dash: true, thin: true }));
    }
    els.push(txt(v(-0.9, -0.6), " ", "c"), txt(v(7.4, 6.6), " ", "c"));
    if (swap)
      return {
        els,
        readout: ["Aynı U(11, 10) noktası, eksenler e–p olsaydı e = 11, p = 10 demekti: q = 10 − 11 = −1.", "Koordinatı ezberden okuma; önce eksen başlıklarını tabloya yaz. Nötron verisi yoksa n ve A bulunamaz."],
      };
    const q = particleCoordinatesSource006[step];
    const z = q.p - q.e;
    return {
      els,
      readout: [`${q.name}: p = ${q.p}, e = ${q.e} → q = ${q.p} − ${q.e} = ${z > 0 ? "+" : ""}${z}`, z > 0 ? "p > e: katyon (nokta p = e doğrusunun sağında)." : z < 0 ? "p < e: anyon (doğrunun solunda)." : "p = e: nötr (doğrunun üzerinde)."],
    };
  },
};

export const chemistryFiguresParticles: Record<string, Record<string, FigureDef>> = {
  "atomun-temel-tanecikleri": {
    "Üç taneciği iki bölgeyle ilişkilendir": regions,
    "Gösterimde dört konumu doğru oku": notation,
    "İyonlaşmada çekirdek korunur": ionize,
    "Grafikte önce eksenleri tabloya çevir": axes,
  },
};

