import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * TYT Kimya · Karışımlar ve çözünme. Tanecik ve kap çizimleri şematiktir.
 * Çözünürlük değerleri (30 g / 100 g su) özgün öğretim verisidir; 2020 TYT
 * Fen 14’teki 34 g sınırı resmî kitapçıktan özetlenmiştir (cevap B), çözüm
 * özgündür.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });

// 1 · Karışım sınıfları.
const KINDS = [
  { a: "Çözelti · tuzlu su", b: "molekül/iyon düzeyinde, tek faz", tone: "b" as Tone, detail: ["Homojen: her yeri aynı bileşimde.", "Katı çözelti (alaşım) ve gaz çözelti (temiz hava) de vardır."] },
  { a: "Süspansiyon · çamurlu su", b: "sıvıda katı tanecik; çökelir, süzülür", tone: "warn" as Tone, detail: ["Heterojen: iri katı tanecikler zamanla dibe çöker.", "Uygun süzgeç kâğıdında tutulur."] },
  { a: "Emülsiyon · çalkalanmış yağ–su", b: "sıvıda başka bir sıvının damlacıkları", tone: "warn" as Tone, detail: ["Birbirinde çözünmeyen iki sıvı gerekir.", "Çalkalamak kimyasal birleştirme değildir."] },
  { a: "Aerosol · sis, duman", b: "gazda sıvı (sis) ya da katı (duman)", tone: "c" as Tone, detail: ["Sis: havada sıvı su damlacıkları.", "Gaz hâlindeki su buharı tek başına sis değildir."] },
  { a: "Kolloid · boya, süt", b: "1–1000 nm tanecikler; tekdüze görünebilir", tone: "c" as Tone, detail: ["Gözle tekdüze görünmesi gerçek çözelti olduğunu kanıtlamaz.", "Işığı saçar (Tyndall)."] },
];
const kinds: FigureDef = {
  caption:
    "Karışımı sınıflandırmak için iki soruyu sor: dağılan (az olan) kısım hangi hâlde, dağıtıcı ortam hangi hâlde ve dağılan tanecikler ne kadar büyük? Bir sınıfa tıkla: örneği ve ayırt edici sınırı açılır.",
  alt: "Beş satır: çözelti, süspansiyon, emülsiyon, aerosol, kolloid; her birinin dağılan–ortam ilişkisi.",
  picks: KINDS.map((k) => ({ label: k.a.split(" · ")[0], title: k.a, detail: k.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    KINDS.forEach((r, i) => {
      const y = -i * 1.3, sel = pick === i;
      els.push(rect(-0.32, -0.16, y - 0.85, y + 0.25, r.tone));
      els.push(txt(v(0, y), r.a, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }), txt(v(0.3, y - 0.58), r.b, "e", { small: true, tone: sel ? "a" : "c" }));
    });
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(6.2, -6.2), " ", "c"));
    return { els, readout: [pick >= 0 ? KINDS[pick].detail[0] : "Bir sınıfa tıkla.", "Faz sayısı madde türü sayısı değildir: buz + su tek madde iki faz; tuzlu su iki madde tek faz."] };
  },
};

// 2 · Hidratasyon yönü.
function water(o: V, towardO: boolean, angle: number): El[] {
  // O ucu iyona dönükse H’ler dışarıda; H ucu dönükse O dışarıda.
  const t = (angle * Math.PI) / 180, ux = Math.cos(t), uy = Math.sin(t);
  const O = towardO ? o : v(o[0] + ux * 0.35, o[1] + uy * 0.35);
  const hBase = towardO ? v(o[0] + ux * 0.3, o[1] + uy * 0.3) : o;
  const px = -uy * 0.2, py = ux * 0.2;
  return [ball(O, 0.15, "warn"), ball(v(hBase[0] + px, hBase[1] + py), 0.09, "muted"), ball(v(hBase[0] - px, hBase[1] - py), 0.09, "muted")];
}
const IONS = [
  { label: "Na⁺ çevresi", detail: ["Suyun kısmi negatif (δ−) O ucu Na⁺’ya döner.", "Bu çevrelenmeye hidratasyon denir."] },
  { label: "Cl⁻ çevresi", detail: ["Suyun kısmi pozitif (δ+) H uçları Cl⁻’ye döner.", "δ tam yük değil, kısmi yüktür."] },
];
const hydration: FigureDef = {
  caption:
    "NaCl suda Na⁺ ve Cl⁻ iyonlarına ayrılır ve su molekülleri onları çevreler. Bir iyona tıkla: su molekülünün hangi ucunun iyona döndüğü görünür (kırmızı O, gri H). Şema ölçekli değildir; gerçek suda tanecikler sürekli hareket eder. Şeker ise molekül olarak dağılır, iyonlaşmaz.",
  alt: "Solda Na⁺ iyonu çevresinde O uçları içe dönük altı su molekülü, sağda Cl⁻ çevresinde H uçları içe dönük altı su molekülü.",
  picks: IONS.map((p) => ({ label: p.label, title: p.label, detail: p.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    [v(-1.6, 0), v(1.8, 0)].forEach((c, k) => {
      const sel = pick === k;
      els.push(ball(c, k === 0 ? 0.3 : 0.42, k === 0 ? "b" : "c"), txt(c, k === 0 ? "Na⁺" : "Cl⁻", "c", { small: true, bold: true }));
      if (sel) els.push(circle(c, k === 0 ? 1.25 : 1.5, { thin: true, tone: "a" }));
      for (let i = 0; i < 6; i++) {
        const a = i * 60 + 30, r = k === 0 ? 0.75 : 0.9;
        els.push(...water(v(c[0] + Math.cos((a * Math.PI) / 180) * r, c[1] + Math.sin((a * Math.PI) / 180) * r), k === 0, a));
      }
    });
    IONS.forEach((p, i) => els.push(txt(v(-2.6 + i * 3.4, -1.8), p.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-3.1, 1.5), " ", "c"), txt(v(3.4, -2.1), " ", "c"));
    return { els, readout: [pick >= 0 ? IONS[pick].detail[0] : "Bir iyona tıkla.", "Çözünme erime değildir: NaCl erimeden, su içinde dağılır."] };
  },
};

// 3 · Tyndall.
const TYN = [
  { label: "Gerçek çözelti (tuzlu su)", detail: ["Tanecikler ~1 nm’den küçük: ışık demeti içinden görünmeden geçer.", "Tekdüze ve saydam."] },
  { label: "Kolloid (seyreltik süt)", detail: ["1–1000 nm tanecikler ışığı saçar: demetin yolu görünür (Tyndall etkisi).", "Tekdüze görünmesi çözelti olduğunu kanıtlamaz."] },
];
const tyndall: FigureDef = {
  caption:
    "Gözle ikisi de tekdüze görünebilir. Bir kaba tıkla: yan taraftan tutulan ışık demeti çözeltide görünmez, kolloidde tanecikler ışığı saçtığı için demetin yolu görünür. Her bulanıklık aynı nedenden doğmaz; tanecik boyutu yaklaşık bir sınırdır.",
  alt: "İki kap ve soldan gelen ışık demeti; birinci kapta demet görünmüyor, ikincisinde içinden geçen demet parlak çizgi.",
  picks: TYN.map((t) => ({ label: t.label.split(" (")[0], title: t.label, detail: t.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    [0, 1].forEach((k) => {
      const x = k * 3.0, sel = pick === k;
      els.push(rect(x, x + 1.8, -1.0, 0.8, sel ? "a" : "muted", false), rect(x + 0.04, x + 1.76, -0.96, 0.4, k === 0 ? "b" : "c"));
      els.push(vec(v(x - 0.9, -0.3), v(x - 0.05, -0.3), { tone: "warn", bold: true }));
      if (k === 1) els.push(seg(v(x, -0.3), v(x + 1.8, -0.3), { tone: "warn", bold: true }));
      for (let i = 0; k === 1 && i < 6; i++) els.push(ball(v(x + 0.2 + i * 0.28, -0.3 + (i % 2 ? 0.08 : -0.08)), 0.04, "ink"));
      els.push(txt(v(x + 0.9, -1.35), TYN[k].label.split(" (")[0], "c", { small: true, bold: sel, tone: sel ? "a" : "ink", pick: k }));
    });
    els.push(txt(v(-1.1, -0.65), "ışık", "c", { small: true, tone: "warn" }));
    els.push(txt(v(-1.6, 1.2), " ", "c"), txt(v(5.2, -1.7), " ", "c"));
    return { els, readout: [pick >= 0 ? TYN[pick].detail[0] : "Bir kaba tıkla.", "Sınıf kararını görünüş değil, tanecik ve faz davranışı verir."] };
  },
};

// 4 · Hız ile denge.
const rate: FigureDef = {
  caption:
    "Aynı sıcaklıkta iki kapta 100 g su ve 40 g tuz var; biri karıştırılıyor. Zamanı ilerlet: karıştırılan kapta çözünen miktar daha hızlı artar ama ikisi de aynı tavana (30 g) ulaşır. Karıştırma ve ufaltma hızı değiştirir; aynı sıcaklıktaki çözünürlüğü değiştirmez.",
  alt: "Çözünen kütle–zaman grafiği: iki eğri; karıştırılan hızlı yükselir, karıştırılmayan yavaş; ikisi de 30 g’da yataylaşır.",
  param: { label: "Zaman", min: 0, max: 10, step: 1, init: 3, unit: " dk" },
  draw: (t) => {
    const sx = 0.55, sy = 0.08, cap = 30;
    const fast = (s: number) => cap * (1 - Math.exp(-s / 1.2)), slow = (s: number) => cap * (1 - Math.exp(-s / 4));
    const P = (f: (s: number) => number) => Array.from({ length: 21 }, (_, i) => v((i / 2) * sx, f(i / 2) * sy));
    const els: El[] = [vec(v(0, 0), v(10.6 * sx, 0), { thin: true }), vec(v(0, 0), v(0, 36 * sy), { thin: true }), txt(v(10.6 * sx, -0.35), "zaman", "c", { small: true }), txt(v(-0.15, 36 * sy), "g", "w", { small: true })];
    els.push(seg(v(0, cap * sy), v(10 * sx, cap * sy), { dash: true, thin: true, tone: "muted" }), txt(v(-0.15, cap * sy), "30", "w", { small: true }));
    els.push(poly(P(fast), { open: true, tone: "a", bold: true }), poly(P(slow), { open: true, tone: "b", bold: true }));
    els.push(ball(v(t * sx, fast(t) * sy), 0.1, "a"), ball(v(t * sx, slow(t) * sy), 0.1, "b"));
    els.push(txt(v(0.3, 3.3), `karıştırılan: ${fast(t).toFixed(1).replace(".", ",")} g`, "e", { small: true, bold: true, tone: "a" }), txt(v(3.4, 3.3), `durgun: ${slow(t).toFixed(1).replace(".", ",")} g`, "e", { small: true, bold: true, tone: "b" }));
    els.push(txt(v(-0.9, 3.7), " ", "c"), txt(v(6.6, -0.6), " ", "c"));
    return { els, readout: [`${t}. dakika: karıştırılan ${fast(t).toFixed(1).replace(".", ",")} g, durgun ${slow(t).toFixed(1).replace(".", ",")} g çözünmüş.`, "Dengede ikisi de 30 g: kalan 10 g dipte katı olarak durur."] };
  },
};

// 5 · 2020 TYT Fen 14.
const BEAKERS = [
  { k: "X", add: 20, dis: 20 },
  { k: "Y", add: 34, dis: 34 },
  { k: "Z", add: 40, dis: 34 },
];
function beaker(x: number, add: number, dis: number, sel: boolean, label: string): El[] {
  const els: El[] = [rect(x, x + 1.4, -1.0, 1.0, sel ? "a" : "muted", false), rect(x + 0.04, x + 1.36, -0.96, 0.5, "b")];
  const extra = add - dis;
  if (extra > 0) els.push(rect(x + 0.04, x + 1.36, -0.96, -0.96 + extra * 0.05, "warn"));
  els.push(txt(v(x + 0.7, 1.3), label, "c", { small: true, bold: true, tone: sel ? "a" : "ink" }));
  return els;
}
const fen14: FigureDef = {
  caption:
    "2020 TYT Fen 14 (resmî kitapçık, cevap B): her kapta 100 g su, aynı sıcaklıkta sınır 34 g NaCl. Bir kaba tıkla: X’te 20 g çözünür; Y tam sınırda (dipte katı yok ama doymuş); Z’de 34 g çözünür, 6 g dipte kalır. Y ve Z’nin sıvı fazları aynı derişimde: donmaya başlama T_X > T_Y = T_Z.",
  alt: "Üç kap: X açık renk sıvı, Y ve Z daha koyu; Z’nin dibinde katı tuz tabakası.",
  picks: BEAKERS.map((b) => ({ label: `${b.k} kabı`, title: `${b.k}: ${b.add} g eklendi, ${b.dis} g çözündü`, detail: [b.add > b.dis ? `${b.add} − ${b.dis} = ${b.add - b.dis} g dipte kalır; sıvı kütlesi 100 + ${b.dis} = ${100 + b.dis} g.` : `Hepsi çözünür; sıvı ${100 + b.dis} g.`, b.k === "X" ? "Daha seyreltik: daha yüksek sıcaklıkta donmaya başlar." : "Doymuş: Y ile Z’nin sıvı derişimi aynı, dipteki katı derişimi artırmaz."] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    BEAKERS.forEach((b, i) => {
      els.push(...beaker(i * 2.0, b.add, b.dis, pick === i, `${b.k}: ${b.add} g`));
      els.push(txt(v(i * 2.0 + 0.7, -1.35), `${b.k} kabı`, "c", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(-0.4, 1.7), " ", "c"), txt(v(5.8, -1.7), " ", "c"));
    return { els, readout: [pick >= 0 ? BEAKERS[pick].k === "Z" ? "Z: 34 g çözünür, 6 g dipte; sıvı derişimi Y ile aynı." : `${BEAKERS[pick].k}: ${BEAKERS[pick].dis} g çözündü.` : "Bir kaba tıkla.", "Doymuş olmak için dipte katı gerekmez (Y); dipteki katı sıvının derişimini artırmaz (Z)."] };
  },
};

// 6 · Süzme: çözelti ve dipteki katı ayrı.
const filter: FigureDef = {
  caption:
    "100 g suda bu sıcaklıkta en çok 30 g X çözünüyor. Eklenen X’i değiştir: çözünen kısım süzgeçten geçen sıvıda (süzüntü) kalır, fazlası süzgeç kâğıdında tutulur. Sıvı çözelti kütlesi = su + çözünmüş kısım; kabın toplamına dipteki katı da girer.",
  alt: "Huni ve süzgeç kâğıdı; üstte katı fazlası, altta kapta süzüntü; yanında kütle değerleri.",
  param: { label: "Eklenen X", min: 0, max: 60, step: 5, init: 40, unit: " g" },
  draw: (m) => {
    const dis = Math.min(m, 30), solid = m - dis;
    const els: El[] = [poly([v(0, 1.6), v(2.0, 1.6), v(1.2, 0.4), v(1.2, -0.1), v(0.8, -0.1), v(0.8, 0.4)], { tone: "muted", thin: true })];
    if (solid > 0) els.push(poly([v(0.45, 1.1), v(1.55, 1.1), v(1.15, 0.55), v(0.85, 0.55)], { fill: "warn", tone: "warn", thin: true }));
    els.push(rect(0.2, 1.8, -1.6, -0.3, "muted", false), rect(0.24, 1.76, -1.56, -0.8, "b"));
    els.push(txt(v(2.6, 1.0), solid > 0 ? `süzgeçte: ${solid} g X` : "süzgeçte katı yok", "e", { small: true, bold: true, tone: "warn" }));
    els.push(txt(v(2.6, -1.0), `süzüntü: 100 + ${dis} = ${100 + dis} g`, "e", { small: true, bold: true, tone: "b" }), txt(v(2.6, -1.55), `toplam: ${100 + m} g`, "e", { small: true, tone: "muted" }));
    els.push(txt(v(-0.4, 1.9), " ", "c"), txt(v(6.6, -1.9), " ", "c"));
    return { els, readout: [`${m} g eklendi: ${dis} g çözündü, ${solid} g ayrı kaldı; süzüntü ${100 + dis} g.`, m >= 30 ? "Süzüntü doymuştur; süzme katıyı ayırır, çözünmüş X’i ayırmaz." : "Doymamış: daha fazla X çözünebilir."] };
  },
};

export const chemistryFiguresMixtures: Record<string, Record<string, FigureDef>> = {
  "karisim-sinif-cozunme": {
    "Dağılan ve dağıtıcı fazı adlandır": kinds,
    "Tekdüze görünüm çözeltinin tek kanıtı değil": tyndall,
    "Hidratasyonda yön önemlidir": hydration,
    "Hız ile denge sınırını ayır": rate,
    "Çözelti ve dipteki katı ayrı tartılır": fen14,
    "Filtre işleminin neyi ayırdığını gör": filter,
  },
};
