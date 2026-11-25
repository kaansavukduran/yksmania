import { ball, circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * AYT Kimya. Boyle's law with a piston and the P–V curve, an equilibrium
 * concentration–time graph where N₂ is added at one instant, a strong
 * acid–strong base titration curve computed from moles (25 mL 0,10 M HCl with
 * 0,10 M NaOH), a Daniell cell with electron and ion paths, and the Cr / Cu
 * electron-configuration exceptions as orbital boxes. Readouts keep the unit
 * bookkeeping (atm·L, mol/L·L = mol, V). Teaching values; not to scale.
 */

/* ---------- 1. Boyle ---------- */
const boyle: FigureDef = {
  caption:
    "Sürgüyle pistonu it ya da çek (n ve T sabit, başlangıç 1 atm · 12 L). Hacim yarıya inince birim hacimdeki tanecik sayısı ikiye katlanır, çarpışmalar sıklaşır, basınç iki katına çıkar: P·V = 12 atm·L sabit. Sağdaki P–V eğrisi bir hiperboldür; düz bir doğru değildir.",
  alt: "Solda silindir, içinde sürgüyle inip çıkan piston ve gaz tanecikleri; sağda P–V grafiği, hiperbol eğrisi ve şimdiki durumu gösteren nokta.",
  param: { label: "Hacim V", min: 3, max: 12, step: 1, init: 12, unit: " L" },
  draw: (V) => {
    const P = 12 / V;
    const els: El[] = [];
    const h = V * 0.3;
    els.push(poly([v(0, 0), v(0, 4.0), v(2.4, 4.0), v(2.4, 0)], { tone: "ink", open: true }), seg(v(0, 0), v(2.4, 0), { tone: "ink" }));
    els.push(poly([v(0.05, h), v(2.35, h), v(2.35, h + 0.25), v(0.05, h + 0.25)], { tone: "muted", fill: "muted" }), seg(v(1.2, h + 0.25), v(1.2, 4.4), { tone: "muted", bold: true }));
    // 12 molecules spread in the gas region with a fixed pattern.
    for (let i = 0; i < 12; i++) {
      const x = 0.25 + ((i * 0.618 + 0.3) % 1) * 1.9;
      const y = 0.15 + ((i + 0.5) / 12) * (h - 0.3);
      els.push(ball(v(x, y), 0.1, "b"));
    }
    els.push(txt(v(1.2, -0.1), `${V} L · ${fmt(P, 2)} atm`, "s", { tone: "ink", small: true, bold: true }));
    // P–V graph.
    const gx = 3.6;
    const X = (vol: number) => gx + vol * 0.33;
    const Y = (p: number) => p * 0.85;
    els.push(vec(v(gx, 0), v(X(13), 0), { tone: "ink" }), vec(v(gx, 0), v(gx, Y(4.6)), { tone: "ink" }));
    els.push(txt(v(X(13), 0), "V (L)", "se", { tone: "ink", small: true }), txt(v(gx, Y(4.6)), "P (atm)", "n", { tone: "ink", small: true }));
    const curve: V[] = Array.from({ length: 41 }, (_, i) => {
      const vol = 3 + (9 * i) / 40;
      return v(X(vol), Y(12 / vol));
    });
    els.push(poly(curve, { tone: "c", open: true, bold: true, smooth: true }), ball(v(X(V), Y(P)), 0.12, "warn"));
    for (const vol of [3, 6, 12]) els.push(txt(v(X(vol), 0), String(vol), "s", { tone: "muted", small: true, soft: true }));
    for (const p of [1, 2, 4]) els.push(txt(v(gx, Y(p)), String(p), "w", { tone: "muted", small: true, soft: true }));
    els.push(txt(v(-0.6, 4.9), " ", "c"), txt(v(X(13) + 1.2, -0.9), " ", "c"));
    return {
      els,
      readout: [`P·V = ${fmt(P, 2)} atm · ${V} L = 12 atm·L (sabit)`, "Birimler: atm·L hem PV'nin hem de nRT'nin birimidir (R = 0,082 atm·L/(mol·K)). Sabitleri yazmadan Boyle uygulama."],
    };
  },
};

/* ---------- 2. Denge: etki anı ---------- */
const disturb: FigureDef = {
  caption:
    "İleri ile N₂ + 3H₂ ⇌ 2NH₃ dengesine t₁ anında N₂ eklenmesini izle (sabit hacim ve sıcaklık). Etki anında yalnız N₂ derişimi dikey sıçrar; öteki türler o anda değişmez. Sonra denge ürünlere kayar: N₂ ve H₂ azalır, NH₃ artar. K sıcaklık değişmediği için aynı kalır.",
  alt: "Derişim–zaman grafiği: N₂, H₂ ve NH₃ için üç yatay çizgi; t₁ anında N₂ çizgisi dikey yükselir, sonra azalarak yeni yatay düzeye iner; H₂ azalır, NH₃ artar.",
  steps: ["İlk denge", "Etki anı: N₂ eklenir", "Yeni denge"],
  draw: (_v, step) => {
    const els: El[] = [vec(v(0, 0), v(8.6, 0), { tone: "ink" }), vec(v(0, 0), v(0, 4.4), { tone: "ink" })];
    els.push(txt(v(8.6, 0), "zaman", "se", { tone: "ink", small: true }), txt(v(0, 4.4), "derişim", "n", { tone: "ink", small: true }));
    const t1 = 3.5;
    const lines: { name: string; tone: Tone; y0: number; jump: number; y1: number }[] = [
      { name: "N₂", tone: "b", y0: 1.6, jump: 3.2, y1: 2.7 },
      { name: "H₂", tone: "a", y0: 2.6, jump: 2.6, y1: 1.1 },
      { name: "NH₃", tone: "c", y0: 1.0, jump: 1.0, y1: 2.0 },
    ];
    for (const l of lines) {
      els.push(seg(v(0, l.y0), v(t1, l.y0), { tone: l.tone, bold: true }));
      if (step >= 1) {
        if (l.jump !== l.y0) els.push(seg(v(t1, l.y0), v(t1, l.jump), { tone: l.tone, bold: true, dash: true }));
        const ps: V[] = Array.from({ length: 21 }, (_, i) => {
          const t = i / 20;
          return v(t1 + t * 2.5, l.y1 + (l.jump - l.y1) * Math.exp(-4 * t));
        });
        if (step >= 2) els.push(poly(ps, { tone: l.tone, open: true, bold: true, smooth: true }), seg(v(t1 + 2.5, l.y1), v(8.3, l.y1), { tone: l.tone, bold: true }));
      }
      const endY = step >= 2 ? l.y1 : step === 1 ? l.jump : l.y0;
      const endX = step >= 2 ? 8.3 : t1;
      els.push(txt(v(endX + 0.1, endY), l.name, "e", { tone: l.tone, small: true, bold: true }));
    }
    els.push(seg(v(t1, 0), v(t1, 4.0), { tone: "muted", dash: true, thin: true }), txt(v(t1, 0), "t₁", "s", { tone: "muted", small: true }));
    els.push(txt(v(-0.6, 4.9), " ", "c"), txt(v(9.4, -0.9), " ", "c"));
    const rows: [string, string][] = [
      ["Denge: üç derişim de sabit; ileri ve geri tepkime hızları eşit, olaylar sürüyor.", "Kc = [NH₃]² / ([N₂]·[H₂]³)"],
      ["t₁ anında N₂ eklenir: yalnız [N₂] dikey sıçrar. Q < K olur.", "Grafikte etki anını bul: dikey sıçrama, eklenen ya da çekilen türü gösterir."],
      ["Denge ürünlere kayar: [N₂] ve [H₂] azalır, [NH₃] artar; değişimler katsayılarla (1 : 3 : 2) orantılıdır.", "Yeni dengede [N₂] başlangıçtan yüksek kalır. Sıcaklık sabit: K aynı."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 3. Titrasyon eğrisi ---------- */
const titration: FigureDef = {
  caption:
    "Sürgüyle büretten eklenen NaOH hacmini değiştir. 25 mL 0,10 M HCl (2,5 mmol H⁺), 0,10 M NaOH ile titre ediliyor. Eşdeğerlik 25 mL'de: mol H⁺ = mol OH⁻, pH = 7 (25 °C, kuvvetli asit–kuvvetli baz). Eşdeğerlik çevresinde pH tek damlada büyük sıçrar; indikatör bu dik bölgede renk değiştirmelidir.",
  alt: "pH–eklenen hacim grafiği: düşük pH'tan başlayan, 25 mL çevresinde dikleşip yüksek pH'a çıkan S biçimli eğri; sürgüyle hareket eden nokta ve 25 mL'de kesik dikey çizgi.",
  param: { label: "Eklenen NaOH", min: 0, max: 50, step: 1, init: 20, unit: " mL" },
  draw: (vb) => {
    const pH = (mL: number) => {
      const na = 2.5; // mmol H+
      const nb = 0.1 * mL; // mmol OH-
      const V = (25 + mL) / 1000;
      if (Math.abs(na - nb) < 1e-9) return 7;
      if (na > nb) return -Math.log10((na - nb) / 1000 / V);
      return 14 + Math.log10((nb - na) / 1000 / V);
    };
    const X = (mL: number) => mL * 0.16;
    const Y = (p: number) => p * 0.3;
    const els: El[] = [vec(v(0, 0), v(X(53), 0), { tone: "ink" }), vec(v(0, 0), v(0, Y(14.6)), { tone: "ink" })];
    els.push(txt(v(X(53), 0), "V NaOH (mL)", "se", { tone: "ink", small: true }), txt(v(0, Y(14.6)), "pH", "n", { tone: "ink", small: true }));
    const pts: V[] = [];
    for (let i = 0; i <= 500; i++) pts.push(v(X(i / 10), Y(pH(i / 10))));
    els.push(poly(pts, { tone: "c", open: true, bold: true }));
    els.push(seg(v(X(25), 0), v(X(25), Y(14)), { tone: "muted", dash: true, thin: true }), seg(v(0, Y(7)), v(X(50), Y(7)), { tone: "muted", dash: true, thin: true }));
    for (const m of [0, 25, 50]) els.push(txt(v(X(m), 0), String(m), "s", { tone: "muted", small: true, soft: true }));
    for (const p of [1, 7, 13]) els.push(txt(v(0, Y(p)), String(p), "w", { tone: "muted", small: true, soft: true }));
    const p = pH(vb);
    els.push(ball(v(X(vb), Y(p)), 0.12, "warn"));
    els.push(txt(v(X(25), Y(14)), "eşdeğerlik", "n", { tone: "muted", small: true }));
    els.push(txt(v(-1.0, Y(15.6)), " ", "c"), txt(v(X(53) + 2.2, -0.9), " ", "c"));
    const nb = 0.1 * vb;
    return {
      els,
      readout: [
        `${vb} mL: eklenen OH⁻ = 0,10 mol/L · ${vb} mL = ${fmt(nb, 2)} mmol · pH ≈ ${fmt(p, 2)}`,
        vb < 25 ? `Artan H⁺ = 2,5 − ${fmt(nb, 2)} = ${fmt(2.5 - nb, 2)} mmol, toplam hacim ${25 + vb} mL. (mol/L · L = mol)` : vb === 25 ? "Eşdeğerlik: H⁺ ve OH⁻ tükendi, yalnız NaCl ve su; pH = 7." : `Artan OH⁻ = ${fmt(nb - 2.5, 2)} mmol, toplam hacim ${25 + vb} mL; pH = 14 − pOH.`,
      ],
    };
  },
};

/* ---------- 4. Daniell pili ---------- */
const daniell: FigureDef = {
  caption:
    "İleri ile Daniell pilini kur. Çinko, bakıra göre elektron vermeye daha yatkındır: Zn anot (yükseltgenme), Cu katot (indirgenme). Elektronlar dış devrede Zn'den Cu'ya akar; tuz köprüsündeki iyonlar iki kaptaki yük dengesini korur. E°pil = E°katot − E°anot = 0,34 − (−0,76) = 1,10 V.",
  alt: "İki beher: solda Zn elektrot ve Zn²⁺ çözeltisi, sağda Cu elektrot ve Cu²⁺ çözeltisi; üstte voltmetreli tel, iki kap arasında ters U biçimli tuz köprüsü. Adımlara göre elektron okları, iyon okları ve yarı tepkimeler görünür.",
  steps: ["Düzenek", "Elektron yolu", "İyon yolu ve gerilim"],
  draw: (_v, step) => {
    const els: El[] = [];
    const beaker = (x: number, tone: Tone) => {
      els.push(poly([v(x, 2), v(x, 0), v(x + 2.2, 0), v(x + 2.2, 2)], { tone: "ink", open: true }));
      els.push(poly([v(x + 0.05, 1.4), v(x + 2.15, 1.4), v(x + 2.15, 0.05), v(x + 0.05, 0.05)], { tone, fill: tone, bare: true }));
    };
    beaker(0, "b");
    beaker(4.0, "c");
    els.push(poly([v(0.9, 0.3), v(1.3, 0.3), v(1.3, 2.8), v(0.9, 2.8)], { tone: "muted", fill: "muted" }), poly([v(4.9, 0.3), v(5.3, 0.3), v(5.3, 2.8), v(4.9, 2.8)], { tone: "warn", fill: "warn" }));
    els.push(txt(v(1.1, 0.0), "Zn | Zn²⁺", "s", { tone: "ink", small: true, bold: true }), txt(v(5.1, 0.0), "Cu²⁺ | Cu", "s", { tone: "ink", small: true, bold: true }));
    // Wire with voltmeter.
    els.push(seg(v(1.1, 2.8), v(1.1, 3.6), { tone: "ink" }), seg(v(1.1, 3.6), v(2.75, 3.6), { tone: "ink" }), seg(v(3.45, 3.6), v(5.1, 3.6), { tone: "ink" }), seg(v(5.1, 3.6), v(5.1, 2.8), { tone: "ink" }));
    els.push(circle(v(3.1, 3.6), 0.35, { tone: "ink" }), txt(v(3.1, 3.6), "V", "c", { tone: "ink", small: true, bold: true }));
    // Salt bridge.
    els.push(poly([v(1.8, 0.8), v(1.8, 2.5), v(4.4, 2.5), v(4.4, 0.8), v(4.1, 0.8), v(4.1, 2.2), v(2.1, 2.2), v(2.1, 0.8)], { tone: "a", fill: step === 2 ? "a" : undefined, thin: step !== 2 }));
    if (step >= 1) {
      els.push(vec(v(1.6, 3.85), v(2.6, 3.85), { tone: "warn", bold: true }), vec(v(3.6, 3.85), v(4.6, 3.85), { tone: "warn", bold: true }), txt(v(3.1, 4.0), "e⁻", "n", { tone: "warn", small: true, bold: true }));
      els.push(txt(v(-0.1, 2.6), "anot (−)", "w", { tone: "ink", small: true }), txt(v(6.3, 2.6), "katot (+)", "e", { tone: "ink", small: true }));
    }
    if (step === 2) {
      els.push(vec(v(3.8, 2.35), v(2.4, 2.35), { tone: "b", thin: true }), txt(v(3.1, 2.4), "anyon", "n", { tone: "b", small: true }));
      els.push(txt(v(3.1, 1.1), "1,10 V", "c", { tone: "ink", small: true, bold: true }));
    }
    els.push(txt(v(-2.2, 4.6), " ", "c"), txt(v(8.2, -0.9), " ", "c"));
    const rows: [string, string][] = [
      ["Sol yarı hücre: Zn metal Zn²⁺ çözeltisinde; sağ: Cu metal Cu²⁺ çözeltisinde. Tel ve tuz köprüsü devreyi tamamlar.", "Şema: Zn(k) | Zn²⁺(suda) || Cu²⁺(suda) | Cu(k). Tek çizgi faz sınırı, çift çizgi tuz köprüsü."],
      ["Anot: Zn → Zn²⁺ + 2e⁻ (kütle azalır). Katot: Cu²⁺ + 2e⁻ → Cu (kütle artar). Elektron dış devrede anottan katoda.", "Galvanik pilde anot (−), katot (+) kutuptur; elektrolizde işaretler değişir, tanım (yükseltgenme anotta) değişmez."],
      ["Tuz köprüsünde anyonlar anoda, katyonlar katoda göç eder; çözeltiler yüksüz kalır. E° = 0,34 − (−0,76) = 1,10 V.", "Katsayıyla çarpmak E°'yi çarpmaz: V = J/C, mol başına değil yük başına enerjidir."],
    ];
    return { els, readout: rows[step] };
  },
};

function orbitalBox(x: number, electrons: number, tone: Tone): El[] {
  const els = [poly([v(x, 0), v(x + 0.9, 0), v(x + 0.9, 1.1), v(x, 1.1)], { tone: "ink", thin: true })];
  if (electrons >= 1) els.push(vec(v(x + 0.3, 0.15), v(x + 0.3, 0.95), { tone, bold: true }));
  if (electrons >= 2) els.push(vec(v(x + 0.6, 0.95), v(x + 0.6, 0.15), { tone, bold: true }));
  return els;
}

function hundOccupancy(electrons: number, orbitalCount: number): number[] {
  return Array.from({ length: orbitalCount }, (_, i) =>
    Number(electrons > i) + Number(electrons > orbitalCount + i));
}

const pOrbitalPairs: FigureDef = {
  caption: "Eş enerjili üç 2p orbitalini önce birer elektronla doldur. Oksijendeki dördüncü elektron bir kutuda zıt spinle eşleşir.",
  alt: "Yan yana üç 2p orbital kutusu. Azotta her kutuda bir yukarı ok. Oksijende ilk kutuda yukarı ve aşağı ok, diğer ikisinde birer yukarı ok.",
  steps: ["Azot 2p³", "Oksijen 2p⁴"],
  draw: (_, step) => {
    const count = 3 + step;
    const occupancy = hundOccupancy(count, 3);
    const unpaired = occupancy.filter((n) => n === 1).length;
    const els = [
      ...occupancy.flatMap((n, i) => [
        ...orbitalBox(i * 1.45, n, "b"),
        txt(v(i * 1.45 + 0.45, -0.1), ["mₗ = −1", "mₗ = 0", "mₗ = +1"][i], "s", { small: true }),
      ]),
      txt(v(1.9, 1.5), step === 0 ? "N · 2p³" : "O · 2p⁴", "n", { small: true, bold: true }),
      txt(v(-0.45, 2.0), "", "c"),
      txt(v(4.4, -0.67), "", "c"),
    ];
    return { els, readout: [
      `Kutu dolulukları ${occupancy.join(", ")}. 2p’de ${count} elektron, ${unpaired} eşleşmemiş elektron.`,
      "Pauli: bir kutudaki çiftin spinleri zıttır. Hund: eş enerjili kutulara önce birer elektron yerleşir.",
    ] };
  },
};

/* ---------- 5. Cr ve Cu istisnası ---------- */
const exception: FigureDef = {
  caption:
    "İleri ile Cr (24) ve Cu (29) dizilimlerini karşılaştır. Aufbau sırasına göre beklenen 4s² 3d⁴ ve 4s² 3d⁹ yerine gerçek dizilimler 4s¹ 3d⁵ ve 4s¹ 3d¹⁰'dur: yarı dolu ve tam dolu d alt kabuğu daha kararlıdır. Kutularda okun yukarı/aşağı yönü spin, Hund kuralına göre önce tekli doluluk.",
  alt: "Her adımda bir 4s kutusu ve beş 3d kutusu; elektronlar oklarla gösterilir. Beklenen ve gerçek dizilimler sırayla görünür.",
  steps: ["Cr beklenen", "Cr gerçek", "Cu beklenen", "Cu gerçek"],
  draw: (_v, step) => {
    const configs: { s: number; d: number; label: string; real: boolean }[] = [
      { s: 2, d: 4, label: "Cr: [Ar] 4s² 3d⁴ (beklenen)", real: false },
      { s: 1, d: 5, label: "Cr: [Ar] 4s¹ 3d⁵ (gerçek)", real: true },
      { s: 2, d: 9, label: "Cu: [Ar] 4s² 3d⁹ (beklenen)", real: false },
      { s: 1, d: 10, label: "Cu: [Ar] 4s¹ 3d¹⁰ (gerçek)", real: true },
    ];
    const c = configs[step];
    const els: El[] = [];
    const tone: Tone = c.real ? "c" : "muted";
    els.push(...orbitalBox(0, c.s, tone));
    els.push(txt(v(0.45, 0), "4s", "s", { tone: "ink", small: true, bold: true }));
    hundOccupancy(c.d, 5).forEach((n, i) => els.push(...orbitalBox(1.6 + i * 0.95, n, tone)));
    els.push(txt(v(1.6 + 2 * 0.95 + 0.45, 0), "3d", "s", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(3.4, 1.4), c.label, "n", { tone: c.real ? "c" : "ink", small: true, bold: true }));
    els.push(txt(v(-0.4, 2.4), " ", "c"), txt(v(6.6, -0.9), " ", "c"));
    const rows: [string, string][] = [
      ["Cr (Z = 24): sıraya göre 4s² 3d⁴ beklenir; 3d'de bir kutu boş kalır.", "Toplam elektron: 18 (Ar) + 2 + 4 = 24."],
      ["Gerçek Cr: 4s¹ 3d⁵. Bir elektron 4s'ten 3d'ye geçer; beş d kutusu tek elektronla yarı dolu.", "Yarı dolu alt kabuk ek kararlılık sağlar. Eşleşmemiş elektron sayısı: 6."],
      ["Cu (Z = 29): sıraya göre 4s² 3d⁹ beklenir; bir d kutusunda tek elektron kalır.", "Toplam elektron: 18 + 2 + 9 = 29."],
      ["Gerçek Cu: 4s¹ 3d¹⁰. d alt kabuğu tam dolu; eşleşmemiş elektron yalnız 4s'teki.", "İyon oluşurken elektron önce 4s'ten çıkar: Cu⁺ = [Ar] 3d¹⁰, Cu²⁺ = [Ar] 3d⁹."],
    ];
    return { els, readout: rows[step] };
  },
};

export const chemistryFiguresAyt: Record<string, Record<string, FigureDef>> = {
  "ayt-gaz-yasalari": { "Boyle: sabit n ve T": boyle },
  "kimyasal-denge": { "Derişim grafiğinde önce etki anını bul": disturb },
  "ayt-titrasyon": { "Eğrinin eksenlerini oku": titration },
  "elektrokimyasal-piller": { "Galvanik pilde kutuplar ve dış devre": daniell },
  "ayt-modern-atom-elektron-dizilimi": {
    "Cr ve Cu: doğrulanmış iki istisna": exception,
    "2p kutularında önce tek elektronları yerleştir": pOrbitalPairs,
  },
};
