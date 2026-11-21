import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { axes, box, curve, nf, pad, xtick, ytick } from "./physicsFigures058Kit";
import { at, atom, bond, hbars } from "./chemistryFigures060Kit";

/*
 * Forge060 TYT Kimya: buharlaşma ve buhar basıncı, kaynama ve bağıl nem,
 * maddenin hâlleri, kovalent bağ. Su buhar basıncı noktaları (25 °C 23,8;
 * 50 °C 92,5; 70 °C 233,7; 100 °C 760 mmHg) bölümde anılan MEBİ tablo
 * değerleridir. Isıtma eğrisi 1 g buz, Lₑ = 334 J/g, c(sıvı) = 4,18,
 * L_b = 2256 J/g, c(buhar) ≈ 2 J/(g·°C) bölüm modelinden; Pauling
 * elektronegatiflikleri H 2,20, Cl 3,16, F 3,98 bölümden.
 */

const VP: [number, number][] = [
  [25, 23.8],
  [50, 92.5],
  [70, 233.7],
  [100, 760],
];
const XT = (t: number) => t * 0.06;
const YP = (p: number) => p * 0.0045;

function vpAxes(): El[] {
  const els: El[] = [...axes(v(0, 0), XT(112), YP(860), "T (°C)", "P* (mmHg)")];
  for (const t of [0, 25, 50, 75, 100]) els.push(...xtick(XT(t), 0, String(t)));
  for (const p of [200, 400, 600, 760]) els.push(...ytick(0, YP(p), String(p)));
  els.push(poly(VP.map(([t, p]) => v(XT(t), YP(p))), { tone: "muted", open: true, dash: true, thin: true }));
  return els;
}

/* ---------- buharlasma-buhar-basinci ---------- */

const vpTable: FigureDef = {
  caption:
    "Su için MEBİ tablo değerleri: 25 °C'de 23,8; 50 °C'de 92,5; 70 °C'de 233,7; 100 °C'de 760 mmHg. Kesikli çizgi yalnız okuma kılavuzudur. İleri ile 25 → 50 °C geçişine bak: Celsius sıcaklığı iki katına çıkarken buhar basıncı yaklaşık 3,9 katına çıkar; değerler doğrusal değildir.",
  alt: "Yatay eksen sıcaklık (°C), dikey eksen buhar basıncı (mmHg). Dört tablo noktası kesikli çizgiyle birleştirilmiş; hızla yükselen eğilim. İkinci adımda 25 ve 50 °C noktaları vurgulu.",
  steps: ["Tablo noktaları", "25 → 50 °C"],
  draw: (_v, step) => {
    const els = vpAxes();
    VP.forEach(([t, p], i) => {
      const on = step === 0 || i < 2;
      els.push(circle(v(XT(t), YP(p)), 0.09, { tone: on ? "warn" : "muted", fill: on ? "warn" : "muted" }));
      if (step === 0 && i >= 2) els.push(txt(v(XT(t), YP(p)), nf(p, 1), "w", { tone: "ink", small: true, bold: true }));
    });
    if (step === 1) els.push(txt(v(XT(25), YP(23.8) + 0.25), "23,8", "n", { tone: "ink", small: true, bold: true }), txt(v(XT(50), YP(92.5) + 0.25), "92,5", "n", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-1.4, YP(900), XT(112) + 1.4, -0.8));
    return { els, readout: step ? ["50 ÷ 25 = 2 ama 92,5 ÷ 23,8 ≈ 3,89.", "Arada verilmemiş sıcaklık için doğrusal aradeğer ayrıca istenmelidir."] : ["Sıcaklık arttıkça doygunluk basıncı artar; 100 °C'de 760 mmHg = 1 atm.", "Noktaları birleştiren çizgi okuma kılavuzudur, ölçüm değil."] };
  },
};

const closedRates: FigureDef = {
  caption:
    "Havası alınmış kapalı kapta sabit sıcaklıkta buharlaşma hızı sabit kalırken gazda biriken buharla yoğuşma hızı artar ve buharlaşma hızına eşitlenir. Dengede iki hız eşittir, ikisi de sıfır değildir. Eğriler şematiktir, ölçekli değil.",
  alt: "Yatay eksen zaman, dikey eksen hız. Yatay düz buharlaşma çizgisi ve sıfırdan yükselip ona yaklaşan yoğuşma eğrisi; sağda 'denge' bölgesi.",
  draw: () => {
    const R = 2.4;
    const els: El[] = [...axes(v(0, 0), 7.2, 3.4, "zaman", "hız")];
    els.push(seg(v(0, R), v(6.6, R), { tone: "a", bold: true }), txt(v(6.6, R), "buharlaşma", "e", { tone: "a", small: true, bold: true }));
    els.push(poly(curve((t) => R * (1 - Math.exp(-t * 0.9)), 0, 6.6, 60, (t) => t, (y) => y - 0.06), { tone: "c", open: true, bold: true, smooth: true }));
    els.push(txt(v(2.0, R * (1 - Math.exp(-1.8)) - 0.1), "yoğuşma", "se", { tone: "c", small: true, bold: true }));
    els.push(seg(v(4.6, 0), v(4.6, 3.0), { tone: "muted", dash: true, thin: true }), txt(v(5.6, 3.0), "denge: hızlar eşit", "n", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-0.6, 3.9, 9.4, -0.7));
    return { els, readout: ["Başta yoğuşma ≈ 0; buhar biriktikçe artar.", "Dengede iki geçiş sürer: gaz basıncı sabit görünür, moleküller yer değiştirir."] };
  },
};

const sameP: FigureDef = {
  caption:
    "Aynı sıvı, aynı sıcaklık: iki kapta da sıvı kaldıkça denge buhar basıncı aynıdır (25 °C'de su için 23,8 mmHg, MEBİ tablo değeri). Sıvı miktarı, yüzey alanı ya da gaz boşluğunun hacmi bu değeri belirlemez; yalnız dengeye ulaşma süresini ve gereken buhar miktarını değiştirir. Bütün sıvı buharlaşırsa basınç P* olmak zorunda değildir.",
  alt: "Biri küçük biri büyük gaz boşluklu iki kapalı kap; ikisinde de dipte sıvı su ve üstte buhar noktaları. İkisinin üstünde aynı P* değeri.",
  draw: () => {
    const els: El[] = [];
    const flask = (x: number, w: number, h: number, liq: number, n: number) => {
      els.push(box(x + 0.05, 0.05, x + w - 0.05, liq, "b"));
      els.push(poly([v(x, 0), v(x + w, 0), v(x + w, h), v(x, h)], { tone: "ink" }));
      for (let i = 0; i < n; i++) els.push(circle(v(x + 0.3 + ((i * 0.53) % (w - 0.5)), liq + 0.3 + (Math.floor((i * 0.53) / (w - 0.5)) * 0.45) % (h - liq - 0.5)), 0.07, { tone: "c", fill: "c" }));
      els.push(txt(v(x + w / 2, h), "P* = 23,8 mmHg", "n", { tone: "ink", small: true, bold: true }));
    };
    flask(0, 1.8, 2.0, 0.5, 5);
    flask(3.2, 3.2, 3.0, 0.9, 14);
    els.push(txt(v(0.9, 0), "küçük kap", "s", { tone: "muted", small: true }), txt(v(4.8, 0), "büyük kap, çok sıvı", "s", { tone: "muted", small: true }));
    els.push(...pad(-0.6, 3.8, 7.0, -0.8));
    return { els, readout: ["İki kapta da sıvı + buhar dengesi: P*(25 °C) = 23,8 mmHg.", "Büyük boşluk daha çok buhar molekülü ister; basınç aynı."] };
  },
};

/* ---------- kaynama-bagil-nem ---------- */

const boilP: FigureDef = {
  caption:
    "İleri ile dış basıncı tablo noktalarından seç. Saf su, P*(T) dış basınca eşit olduğunda kaynar: 760 mmHg'de 100 °C, 233,7 mmHg'de 70 °C, 92,5 mmHg'de 50 °C (MEBİ tablo değerleri). Alçak basınçta daha düşük, düdüklü tencerede daha yüksek sıcaklık. Verilmemiş rakımdan kesin derece üretilmez.",
  alt: "Su buhar basıncı noktaları ve kesikli kılavuz; seçilen dış basınçta yatay çizgi, eğriyi kestiği yerden sıcaklık eksenine inen düşey çizgi.",
  steps: ["760 mmHg", "233,7 mmHg", "92,5 mmHg"],
  draw: (_v, step) => {
    const [t, p] = VP[3 - step];
    const els = vpAxes();
    VP.forEach(([tt, pp]) => els.push(circle(v(XT(tt), YP(pp)), 0.08, { tone: "muted", fill: "muted" })));
    els.push(seg(v(0, YP(p)), v(XT(t), YP(p)), { tone: "warn", bold: true }), seg(v(XT(t), YP(p)), v(XT(t), 0), { tone: "warn", dash: true }));
    els.push(ball(v(XT(t), YP(p)), 0.11, "warn"), txt(v(XT(t) + 0.1, YP(p)), `${t} °C`, "e", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(0.3, YP(p)), "P_dış", "nw", { tone: "warn", small: true }));
    els.push(...pad(-1.4, YP(900), XT(112) + 1.4, -0.8));
    return { els, readout: [`P_dış = ${nf(p, 1)} mmHg → P*(T) = P_dış → T_k = ${t} °C`, "Isıtıcı gücü kaynama sıcaklığını değil, ulaşma süresini değiştirir."] };
  },
};

const rh: FigureDef = {
  caption:
    "İleri ile havayı ısıt; su buharının kısmi basıncı p = 11,9 mmHg sabit (su alışverişi yok). Bağıl nem = 100 · p ÷ P*. 25 °C'de P* = 23,8 → %50; ısınınca P* büyür ve bağıl nem azalır, su molekülü sayısı değişmez. P* değerleri MEBİ tablosundan.",
  alt: "İki yatay çubuk: sabit p ve sıcaklıkla büyüyen P*; okumada bağıl nem yüzdesi.",
  steps: ["25 °C", "50 °C", "70 °C"],
  draw: (_v, step) => {
    const [t, P] = VP[step];
    const r = (100 * 11.9) / P;
    const els = hbars(
      [
        { label: "p (buhar)", value: 11.9, tone: "c", text: "11,9 mmHg" },
        { label: `P* (${t} °C)`, value: P, tone: "muted", text: `${nf(P, 1)} mmHg`, hollow: true },
      ],
      { w: 5.0, max: 233.7, gap: 0.9 },
    );
    els.push(...pad(-2.8, 0.8, 8.4, -1.6));
    return { els, readout: [`Bağıl nem = 100 · 11,9 ÷ ${nf(P, 1)} = %${nf(r, 1)}`, "Pay toplam atmosfer basıncı değil, su buharının kısmi basıncıdır."] };
  },
};

const dew: FigureDef = {
  caption:
    "Sürgüyle 25 °C'deki su buharı kısmi basıncını (başlangıç değeri) seç; P* = 23,8 mmHg. p ≤ P* ise bağıl nem 100 · p ÷ P*. p > P* çıkarsa düz su yüzeyli kararlı denge modelinde fazla buhar yoğuşur: son p = P*, son nem %100. %150 hesabı, ortamın %150 nemde kaldığı anlamına gelmez.",
  alt: "Üç yatay çubuk: başlangıç p, doygunluk P* ve son p. p P*'ı aşınca son p P*'ta durur ve fark yoğuşma olarak vurgulanır.",
  param: { label: "Başlangıç p (mmHg)", min: 0, max: 35.7, step: 2.975, init: 11.9, unit: "" },
  draw: (p) => {
    const P = 23.8;
    const end = Math.min(p, P);
    const els = hbars(
      [
        { label: "başlangıç p", value: p, tone: p > P ? "warn" : "c", text: `${nf(p, 2)} mmHg` },
        { label: "P* (25 °C)", value: P, tone: "muted", text: "23,8 mmHg", hollow: true },
        { label: "son p", value: end, tone: "c", text: `${nf(end, 2)} mmHg` },
      ],
      { w: 5.0, max: 35.7, gap: 0.85 },
    );
    els.push(...pad(-2.9, 0.8, 8.6, -2.4));
    const raw = (100 * p) / P;
    return { els, readout: p > P ? [`100 · p ÷ P* = %${nf(raw, 1)} > %100 → fazla buhar yoğuşur.`, "Son p = 23,8 mmHg, son bağıl nem %100 (buğu, çiy)."] : [`Bağıl nem = 100 · ${nf(p, 2)} ÷ 23,8 = %${nf(raw, 1)}`, "p ≤ P*: yoğuşma gerekmez."] };
  },
};

/* ---------- maddenin-halleri ---------- */

const PTS: [number, number][] = [
  [0, 0],
  [334, 0],
  [752, 100],
  [3008, 100],
  [3200, 196],
];
const heating: FigureDef = {
  caption:
    "Sürgüyle verilen enerjiyi değiştir: 1 g, 0 °C buz, 1 atm, ısı kaybı yok (bölüm modeli). İlk 334 J erimeyi tamamlar (plato), sonraki 418 J sıvıyı 100 °C'ye çıkarır, 752–3008 J arasında kaynama sürerken sıcaklık 100 °C kalır, sonra buhar ısınır. Platoda enerji sıfır değildir; faz payını değiştirir.",
  alt: "Yatay eksen verilen enerji (J), dikey eksen sıcaklık (°C). 0'da yatay erime platosu, yükselen sıvı bölümü, 100 °C'de uzun kaynama platosu ve sondaki kısa yükseliş; sürgüyle kayan nokta.",
  param: { label: "Verilen enerji Q (J)", min: 0, max: 3200, step: 1, init: 1880, unit: "J" },
  draw: (q) => {
    const X = (e: number) => e / 450;
    const Y = (t: number) => t / 55;
    const els: El[] = [...axes(v(0, 0), X(3500), Y(225), "Q (J)", "T (°C)")];
    els.push(poly(PTS.map(([e, t]) => v(X(e), Y(t))), { tone: "c", open: true, bold: true }));
    let T: number;
    let state: string;
    if (q <= 334) {
      T = 0;
      state = `erime: buzun %${nf((q / 334) * 100, 1)}'i eridi`;
    } else if (q <= 752) {
      T = (q - 334) / 4.18;
      state = `sıvı ısınıyor: T = (Q − 334) ÷ 4,18 = ${nf(T, 1)} °C`;
    } else if (q <= 3008) {
      T = 100;
      state = `kaynama: ${nf(q - 752, 0)} J buharlaşmaya; sıvının %${nf(((q - 752) / 2256) * 100, 1)}'i gaz`;
    } else {
      T = 100 + (q - 3008) / 2;
      state = `buhar ısınıyor: T = 100 + (Q − 3008) ÷ 2 = ${nf(T, 1)} °C`;
    }
    els.push(ball(v(X(q), Y(T)), 0.11, "warn"));
    for (const e of [334, 752, 3008]) els.push(...xtick(X(e), 0, String(e)));
    for (const t of [100, 200]) els.push(...ytick(0, Y(t), String(t)));
    els.push(txt(v(X(1880), Y(100)), "kaynama platosu", "n", { tone: "ink", small: true }));
    els.push(...pad(-0.9, Y(240), X(3500) + 1.4, -0.8));
    return { els, readout: [`Q = ${q} J, T = ${nf(T, 1)} °C`, state] };
  },
};

const phases: FigureDef = {
  caption:
    "Üç hâl ve altı geçiş: erime, buharlaşma, süblimleşme olağan yönde çevreden enerji alır (yukarı yönlü oklar); donma, yoğuşma, kırağılaşma enerji verir (aşağı yönlü, kesikli). Saf madde iki faz birlikteyken sabit basınçta sıcaklık sabit kalabilir; aktarım durmaz. Kuru buz 1 atm'de süblimleşir.",
  alt: "Üçgenin köşelerinde katı, sıvı, gaz. Her kenarda iki zıt ok: enerji alan geçişler düz, enerji veren geçişler kesikli, yanlarında adları.",
  draw: () => {
    const S: V = v(0, 0);
    const L: V = v(5.0, 0);
    const G: V = v(2.5, 3.6);
    const els: El[] = [];
    const pair = (a: V, b: V) => {
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const l = Math.hypot(dx, dy);
      const nx = (-dy / l) * 0.22;
      const ny = (dx / l) * 0.22;
      const ux = (dx / l) * 0.75;
      const uy = (dy / l) * 0.75;
      els.push(vec(v(a[0] + ux + nx, a[1] + uy + ny), v(b[0] - ux + nx, b[1] - uy + ny), { tone: "warn", bold: true }));
      els.push(vec(v(b[0] - ux - nx, b[1] - uy - ny), v(a[0] + ux - nx, a[1] + uy - ny), { tone: "b", dash: true }));
    };
    pair(S, L);
    pair(L, G);
    pair(S, G);
    const lab = (p: V, s: string, at: "n" | "s" | "e" | "w", tone: Tone) => els.push(txt(p, s, at, { tone, small: true, bold: true }));
    lab(v(2.5, 0.35), "erime", "n", "warn");
    lab(v(2.5, -0.35), "donma", "s", "b");
    lab(v(0.75, 2.1), "süblimleşme", "w", "warn");
    lab(v(0.75, 1.5), "kırağılaşma", "w", "b");
    lab(v(4.25, 2.1), "buharlaşma", "e", "warn");
    lab(v(4.25, 1.5), "yoğuşma", "e", "b");
    for (const [p, s, tone] of [
      [S, "katı", "a"],
      [L, "sıvı", "b"],
      [G, "gaz", "c"],
    ] as [V, string, Tone][])
      els.push(circle(p, 0.55, { tone, fill: tone }), txt(p, s, "c", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-3.4, 4.5, 8.4, -1.2));
    return { els, readout: ["Enerji alır: erime, buharlaşma, süblimleşme (düz oklar).", "Enerji verir: donma, yoğuşma, kırağılaşma (kesikli oklar)."] };
  },
};

const kelvin: FigureDef = {
  caption:
    "Gaz yasalarında sıcaklık kelvinle kullanılır. 20 °C'den 40 °C'ye çıkış Celsius sayısında iki kattır ama kelvinde yaklaşık 293 → 313 K, yani yalnız ≈ 1,07 kattır. n ve P sabitken V₁/T₁ = V₂/T₂ olduğundan hacim de ≈ 1,07 katına çıkar, iki katına değil.",
  alt: "Dört yatay çubuk: 20 °C ve 40 °C (biri ötekinin iki katı uzunlukta), 293 K ve 313 K (neredeyse eşit uzunlukta).",
  draw: () => {
    const els = hbars(
      [
        { label: "20 °C", value: 20, tone: "muted", text: "20", hollow: true },
        { label: "40 °C", value: 40, tone: "muted", text: "40 (× 2)", hollow: true },
        { label: "293 K", value: 293, tone: "b", text: "293" },
        { label: "313 K", value: 313, tone: "warn", text: "313 (× 1,07)" },
      ],
      { w: 5.2, max: 313, gap: 0.8 },
    );
    els.push(...pad(-1.8, 0.7, 8.8, -3.0));
    return { els, readout: ["313 ÷ 293 ≈ 1,068: V₂ = V₁ · 313 ÷ 293 (n, P sabit).", "22,4 L/mol yaklaşık 0 °C ve 1 atm içindir."] };
  },
};

/* ---------- kovalent-bag-polar-apolar ---------- */

const lewis: FigureDef = {
  caption:
    "Bir çizgi bir ortak çifttir (2 elektron). H–H'de 1 çift; O=O'da 2 çift (4 e⁻) ve her O'da iki yalnız çift; N≡N'de 3 çift (6 e⁻) ve her N'de bir yalnız çift. Noktalar bağ dışı çiftlerdir. Toplam değerlik elektronu = ortak + bağ dışı: O₂ 4 + 8 = 12, N₂ 6 + 4 = 10.",
  alt: "Üç satır: H–H, O=O (her O'nun yanında iki nokta çifti), N≡N (her N'nin yanında bir nokta çifti); sağda ortak ve bağ dışı elektron sayıları.",
  draw: () => {
    const els: El[] = [];
    const rows: [string, number, number, string][] = [
      ["H", 1, 0, "2 + 0 = 2"],
      ["O", 2, 2, "4 + 8 = 12"],
      ["N", 3, 1, "6 + 4 = 10"],
    ];
    rows.forEach(([s, order, lone], i) => {
      const y = -i * 1.4;
      const a = v(0, y);
      const b = v(1.5, y);
      bond(els, a, b, order, "ink", 0.12);
      const lp = (c: V, dirs: number[]) => {
        for (const d of dirs) {
          const m = at(c, d, 0.55);
          const t = at(v(0, 0), d + 90, 0.09);
          els.push(circle(v(m[0] + t[0], m[1] + t[1]), 0.05, { tone: "warn", fill: "warn" }), circle(v(m[0] - t[0], m[1] - t[1]), 0.05, { tone: "warn", fill: "warn" }));
        }
      };
      if (lone === 2) {
        lp(a, [120, 240]);
        lp(b, [60, -60]);
      } else if (lone === 1) {
        lp(a, [180]);
        lp(b, [0]);
      }
      atom(els, a, s, s === "H" ? "b" : s === "O" ? "c" : "a", 0.3);
      atom(els, b, s, s === "H" ? "b" : s === "O" ? "c" : "a", 0.3);
    });
    els.push(txt(v(3.3, 0.9), "ortak + bağ dışı", "e", { tone: "muted", small: true }));
    rows.forEach(([, , , t], i) => els.push(txt(v(3.3, -i * 1.4), t, "e", { tone: "ink", small: true, bold: true })));
    els.push(...pad(-1.2, 1.5, 7.6, -3.5));
    return { els, readout: ["H₂: 1 ortak çift · O₂: 2 ortak çift + 4 yalnız çift · N₂: 3 ortak çift + 2 yalnız çift.", "Çift bağ iki ayrı komşu değildir: aynı atom çifti arasındaki bağ mertebesidir."] };
  },
};

const enScale: FigureDef = {
  caption:
    "Pauling elektronegatifliği bağıl ve birimsizdir: H 2,20, Cl 3,16, F 3,98 (bölümdeki yaklaşık değerler). Farklar H–Cl için 0,96, H–F için 1,78; fark büyüdükçe ortak elektronlar daha eşitsiz paylaşılır. Aynı elementli bağda fark sıfırdır (H–H, Cl–Cl): apolar.",
  alt: "2,0'dan 4,0'a yatay ölçek; H, Cl ve F işaretli. Üstte H'den Cl'ye 0,96 ve H'den F'ye 1,78 uzunluklu aralık çizgileri.",
  draw: () => {
    const X = (e: number) => (e - 2) * 3.2;
    const els: El[] = [seg(v(X(2), 0), v(X(4.1), 0), { tone: "ink" })];
    for (const e of [2, 2.5, 3, 3.5, 4]) els.push(seg(v(X(e), -0.08), v(X(e), 0.08), { tone: "muted" }), txt(v(X(e), -0.12), nf(e, 1), "s", { tone: "muted", small: true, soft: true }));
    const pts: [string, number, Tone][] = [
      ["H", 2.2, "b"],
      ["Cl", 3.16, "c"],
      ["F", 3.98, "warn"],
    ];
    for (const [s, e, tone] of pts) els.push(circle(v(X(e), 0), 0.12, { tone, fill: tone }), txt(v(X(e), 0.2), `${s} ${e.toFixed(2).replace(".", ",")}`, "n", { tone, small: true, bold: true }));
    const span = (a: number, b: number, y: number, s: string, tone: Tone) => {
      els.push(seg(v(X(a), y), v(X(b), y), { tone, bold: true }), seg(v(X(a), y - 0.12), v(X(a), y + 0.12), { tone }), seg(v(X(b), y - 0.12), v(X(b), y + 0.12), { tone }));
      els.push(txt(v((X(a) + X(b)) / 2, y + 0.1), s, "n", { tone, small: true, bold: true }));
    };
    span(2.2, 3.16, 1.2, "H–Cl: 0,96", "c");
    span(2.2, 3.98, 2.1, "H–F: 1,78", "warn");
    els.push(...pad(-0.6, 2.9, X(4.1) + 0.6, -0.8));
    return { els, readout: ["ΔEN(H–Cl) = 3,16 − 2,20 = 0,96 · ΔEN(H–F) = 3,98 − 2,20 = 1,78.", "Fark kutuplanma eğilimini karşılaştırır; bağ enerjisini sayısal vermez."] };
  },
};

const dipoleArrows: FigureDef = {
  caption:
    "Bu ünitedeki dipol okunun ucu elektron yoğunluğu fazla olan kısmi negatif uca bakar: H–Cl'de H'den Cl'ye, H–F'de H'den F'ye. Uçlar δ+ ve δ− ile işaretlenir; bunlar kısmi yüktür, iyon yükü değil. Cl–Cl'de iki eş uç vardır: kalıcı dipol yok.",
  alt: "Üç satır: H–Cl ve H–F bağlarının üstünde H'den halojene dipol oku ve uçlarda δ+, δ−; Cl–Cl'de ok yok, 'apolar' yazıyor.",
  draw: () => {
    const els: El[] = [];
    const rows: [string, string, Tone, Tone, boolean][] = [
      ["H", "Cl", "b", "c", true],
      ["H", "F", "b", "warn", true],
      ["Cl", "Cl", "c", "c", false],
    ];
    rows.forEach(([s1, s2, t1, t2, polar], i) => {
      const y = -i * 1.6;
      const a = v(0, y);
      const b = v(1.8, y);
      bond(els, a, b, 1);
      atom(els, a, s1, t1, 0.32);
      atom(els, b, s2, t2, 0.36);
      if (polar) {
        els.push(vec(v(0.1, y + 0.6), v(1.7, y + 0.6), { tone: "warn", bold: true }), seg(v(0.35, y + 0.48), v(0.35, y + 0.72), { tone: "warn" }));
        els.push(txt(v(0, y - 0.35), "δ+", "s", { tone: "ink", small: true }), txt(v(1.8, y - 0.38), "δ−", "s", { tone: "ink", small: true }));
      } else els.push(txt(v(2.4, y), "apolar", "e", { tone: "muted", small: true, bold: true }));
    });
    els.push(...pad(-1.0, 1.2, 4.6, -4.2));
    return { els, readout: ["H–Cl ve H–F: ok kısmi negatif halojene bakar; H–F daha kutuplu.", "Molekülü kâğıtta çevirmek kutupluluğu değiştirmez; yalnız okun yönü döner."] };
  },
};

export const chemistryFigures060Tyt: Record<string, Record<string, FigureDef>> = {
  "buharlasma-buhar-basinci": {
    "Kapalı kapta ters olay birikir": closedRates,
    "Denge buhar basıncı koşullu bir özelliktir": sameP,
    "Gerçek tabloyu oran ezberine tercih et": vpTable,
  },
  "kaynama-bagil-nem": {
    "Alçak basınç ve düdüklü tencere": boilP,
    "Nem, su buharının bilgisidir": rh,
    "Soğutma ve çiy noktasını koşulla oku": dew,
  },
  "maddenin-halleri": {
    "Faz geçişleri ve enerji yönleri": phases,
    "Gaz yasasında sıcaklığı kelvinle kullan": kelvin,
    "Enerji grafiğinde plato, sıfır enerji değildir": heating,
  },
  "kovalent-bag-polar-apolar": {
    "Bir çizgi, bir çift; üç çizgi, altı elektron": lewis,
    "Elektronegatiflik bağdaki ortak elektronlarla ilgilidir": enScale,
    "Dipol okunu hangi uca yönelttiğini açıkla": dipoleArrows,
  },
};

