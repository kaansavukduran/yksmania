import { groundingChargeText, groundingTransfer, groundingTransferTitle } from "../groundingTransfer074";
import { electroscopeChargeText, electroscopeInduction, electroscopeTitle } from "../electroscopeInduction070";
import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Durgun elektrik. Metal spheres are shaded balls with their excess charge
 * written as + / − marks on the surface; electrons are the only carriers that
 * move between solids. The electroscope has a knob, a rod, two thin leaves and
 * a glass housing. Numbers follow the guide's examples; drawings are not to
 * scale and signs show excess charge only, not every particle.
 */

/** k charge marks of sign s spread over the sphere (biased to one side by bias). */
function marks(c: V, r: number, k: number, s: "+" | "−", bias = 0, spread = 1): El[] {
  const els: El[] = [];
  const tone: Tone = s === "+" ? "warn" : "b";
  for (let i = 0; i < k; i++) {
    const a = bias + (k === 1 ? 0 : ((i / (k - 1)) - 0.5) * Math.PI * spread);
    const rr = r * 0.62;
    els.push(txt(v(c[0] + Math.cos(a) * rr, c[1] + Math.sin(a) * rr), s, "c", { tone, bold: true }));
  }
  return els;
}

/* ---------- 1. Özdeş kürelerde dokunma ---------- */
const touch: FigureDef = {
  caption:
    "İleri ile +8 μC ve −2 μC yüklü özdeş iki metal küreyi dokundur ve ayır. Hareket eden elektronlardır (mavi ok). Toplam yük +6 μC korunur; özdeş oldukları için her küre +3 μC alır.",
  alt: "İki gölgeli metal küre. Önce solda çok sayıda artı, sağda iki eksi işareti; dokununca sağdan sola elektron oku; ayrılınca iki kürede eşit sayıda artı işareti.",
  steps: ["Önce", "Dokunma: elektron akar", "Ayrıldıktan sonra"],
  draw: (_v, step) => {
    const gap = step === 1 ? 2.4 : 3.2;
    const A = v(-gap / 2, 0);
    const B = v(gap / 2, 0);
    const els: El[] = [ball(A, 1.2, "muted"), ball(B, 1.2, "muted")];
    const qa = step === 2 ? 3 : 8;
    const qb = step === 2 ? 3 : -2;
    els.push(...marks(A, 1.2, Math.min(qa, 8), "+", Math.PI / 2, 1.6));
    els.push(...(qb > 0 ? marks(B, 1.2, qb, "+", Math.PI / 2, 1.2) : marks(B, 1.2, -qb, "−", Math.PI / 2, 0.8)));
    if (step === 1) els.push(vec(v(B[0], -1.5), v(A[0], -1.5), { tone: "b", bold: true }), txt(v(0, -1.75), "elektronlar (−) geçer", "s", { tone: "b", small: true, bold: true }));
    const lab = (c: V, q: number) => txt(v(c[0], c[1] - 1.55), `${q > 0 ? "+" : ""}${q} μC`, "c", { tone: q > 0 ? "warn" : "b", bold: true });
    if (step !== 1) els.push(lab(A, qa), lab(B, qb));
    els.push(txt(v(-3.6, 1.6), " ", "c"), txt(v(3.6, -2), " ", "c"));
    return {
      els,
      readout: [
        step === 0 ? "Toplam: +8 + (−2) = +6 μC. İşaretli topla." : step === 1 ? "Temasta elektronlar −2 μC'luk küreden +8 μC'luk küreye geçer; protonlar yer değiştirmez." : "Her küre +6 / 2 = +3 μC. Kontrol: +3 + 3 = +6 μC, toplam korundu.",
        step === 2 ? "Küreler özdeş değilse “ikiye böl” kuralı kullanılamaz; yalnız toplamın korunduğu kesindir." : "μC = 10⁻⁶ C. Formüle koyarken dönüştür.",
      ],
    };
  },
};

/* ---------- 2. Etki + topraklama ---------- */
const ground = (c: V, on: boolean): El[] => {
  const top = v(c[0], c[1] - 1.1);
  const base = v(c[0], c[1] - 2.2);
  const els: El[] = [seg(top, base, { tone: on ? "ink" : "muted", dash: !on, thin: !on })];
  for (const [w, dy] of [
    [0.6, 0],
    [0.4, -0.15],
    [0.2, -0.3],
  ] as [number, number][])
    els.push(seg(v(base[0] - w, base[1] + dy), v(base[0] + w, base[1] + dy), { tone: on ? "ink" : "muted", thin: true }));
  return els;
};
const induction: FigureDef = {
  caption:
    "İleri ile sırayı izle: negatif çubuğu yaklaştır → küreyi toprağa bağla → toprak bağlantısını kes → çubuğu uzaklaştır. Son yük çubuğa zıt (pozitif) olur. Sıra değişirse aynı sonuç çıkmaz.",
  alt: "Solda negatif yüklü çubuk, sağda gölgeli metal küre ve altında toprak simgesi. Adımlarda kürenin yakın tarafında artı, uzak tarafında eksi işaretleri; topraklanınca elektron oku toprağa iner; sonunda kürede yalnız artı işaretleri kalır.",
  steps: ["Yaklaştır", "Toprakla", "Toprağı kes", "Çubuğu uzaklaştır"],
  draw: (_v, step) => {
    const S = v(1.2, 0);
    const els: El[] = [];
    const rodX = step === 3 ? -4.6 : -1.6;
    els.push(poly([v(rodX - 1.6, 0.25), v(rodX, 0.25), v(rodX, -0.25), v(rodX - 1.6, -0.25)], { tone: "b", fill: "b" }));
    for (let i = 0; i < 3; i++) els.push(txt(v(rodX - 1.4 + i * 0.6, 0), "−", "c", { tone: "b", bold: true }));
    els.push(txt(v(rodX - 0.8, 0.55), "negatif çubuk", "n", { tone: "b", small: true }));
    els.push(ball(S, 1.1, "muted"));
    if (step <= 2) els.push(...marks(S, 1.1, 3, "+", Math.PI, 0.7));
    if (step === 0) els.push(...marks(S, 1.1, 3, "−", 0, 0.7));
    if (step === 3) els.push(...marks(S, 1.1, 3, "+", Math.PI / 2, 1.6));
    els.push(...ground(S, step === 1));
    if (step === 1) els.push(vec(v(S[0] + 0.35, S[1] - 1.2), v(S[0] + 0.35, S[1] - 2.0), { tone: "b", bold: true }), txt(v(S[0] + 0.5, S[1] - 1.6), "e⁻ toprağa", "e", { tone: "b", small: true, bold: true }));
    if (step >= 2) els.push(txt(v(S[0] + 0.3, S[1] - 1.7), "bağlantı kesik", "e", { tone: "muted", small: true }));
    els.push(txt(v(-6.4, 1.2), " ", "c"), txt(v(3.6, -2.6), " ", "c"));
    const rows: [string, string][] = [
      ["Etki: çubuğun itmesiyle elektronlar kürenin uzak tarafına kayar. Yakın taraf +, uzak taraf −. Küre hâlâ nötr (toplam 0).", "Ayrışma kalıcı yük değildir: çubuk şimdi uzaklaşsa yükler geri dağılır."],
      ["Topraklayınca itilen elektronlar Dünya'ya gider. Sistem sınırına Dünya eklendi.", "Yakın taraftaki + yükler çubuğun çekimiyle yerinde kalır."],
      ["Önce toprak bağlantısı kesilir: elektronlar geri dönemez.", "Çubuk hâlâ yakında; + yükler yakın tarafta toplanmış durumda."],
      ["Çubuk uzaklaşınca kalan + yük kürenin yüzeyine yayılır. Son yük çubuğa zıt: pozitif.", "Çubuk toprak kesilmeden uzaklaştırılsaydı elektronlar topraktan geri gelir, küre nötr kalırdı."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 3. Elektroskop ---------- */
const scope: FigureDef = {
  caption:
    "İleri ile başlangıçta nötr elektroskoba üç cismi dokundurmadan yaklaştır. Yüklü cisim (+ ya da −) yaprakları aynı işaretle yükleyip açar; nötr cisim açmaz. Açılma cismin yüklü olduğunu söyler, işaretini söylemez (2026 TYT Fen 5'in mantığı).",
  alt: "Cam fanus içinde metal topuz, iletken çubuk ve iki ince yaprak. Topuzun üstüne sırayla nötr, pozitif ve negatif bir cisim yaklaşıyor; yüklü cisimlerde topuzda zıt, yapraklarda aynı işaretler ve açılmış yapraklar.",
  steps: ["Nötr cisim", "Pozitif cisim", "Negatif cisim", "Sonuç tablosu"],
  draw: (_v, step) => {
    const knob = v(0, 2.9);
    const foot = v(0, 0.6);
    const s = step === 1 ? "+" : step === 2 ? "−" : "";
    const opp = s === "+" ? "−" : "+";
    const open = step === 1 || step === 2 ? 0.55 : 0.04;
    const els: El[] = [];
    // Glass housing (open at the top for the rod).
    els.push(poly([v(-0.35, 2.15), v(-1.2, 1.9), v(-1.9, 0.6), v(-1.8, -0.6), v(1.8, -0.6), v(1.9, 0.6), v(1.2, 1.9), v(0.35, 2.15)], { tone: "c", open: true, thin: true, smooth: true }));
    els.push(seg(v(-2.1, -0.6), v(2.1, -0.6), { tone: "muted", thin: true }));
    els.push(seg(knob, foot, { tone: "muted", bold: true }), ball(knob, 0.45, "muted"));
    const L = 1.25;
    for (const sg of [-1, 1]) {
      const end = v(foot[0] + Math.sin(open) * L * sg, foot[1] - Math.cos(open) * L);
      els.push(poly([foot, v(end[0] + 0.05 * sg, end[1]), v(end[0] - 0.05 * sg, end[1] + 0.05)], { tone: "a", fill: "a", thin: true }));
      if (s) els.push(txt(v(foot[0] + Math.sin(open) * L * 0.6 * sg + 0.22 * sg, foot[1] - Math.cos(open) * L * 0.6), s, "c", { tone: s === "+" ? "warn" : "b", bold: true }));
    }
    if (step < 3) {
      const obj = v(0, 4.6);
      els.push(ball(obj, 0.55, step === 0 ? "muted" : s === "+" ? "warn" : "b", step === 0 ? "0" : s));
      if (s) els.push(txt(v(-0.45, 2.95), opp, "c", { tone: opp === "+" ? "warn" : "b", bold: true }), txt(v(0.45, 2.95), opp, "c", { tone: opp === "+" ? "warn" : "b", bold: true }));
      if (s) els.push(vec(v(0.9, s === "+" ? 1.4 : 2.6), v(0.9, s === "+" ? 2.6 : 1.4), { tone: "b", thin: true }), txt(v(1.05, 2.0), s === "+" ? "e⁻ yukarı çekilir" : "e⁻ aşağı itilir", "e", { tone: "b", small: true }));
    } else {
      els.push(txt(v(2.6, 2.4), "kapalı → etki görülmedi", "e", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(2.6, 1.6), "açık → cisim yüklü", "e", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(2.6, 0.9), "+ mı − mi? bu gözlemle bilinmez", "e", { tone: "warn", small: true, bold: true }));
    }
    els.push(txt(v(-2.6, 5.3), " ", "c"), txt(v(6.6, -0.9), " ", "c"));
    const rows: [string, string][] = [
      ["Nötr cisim belirgin yük ayrışması oluşturmaz: yapraklar kapalı kalır.", "Bu modelde belirgin etki görülmedi. Zayıf bir etkinin ölçüm sınırında kalabileceğini unutma."],
      ["Pozitif cisim elektronları topuza çeker: topuz −, yapraklar + olur ve birbirini iter.", "Elektroskobun toplam yükü hâlâ 0; yalnız dağılım değişti."],
      ["Negatif cisim elektronları yapraklara iter: topuz +, yapraklar − olur ve açılır.", "Pozitif ve negatif cisim aynı açılmayı verir: işaret ayırt edilemez."],
      ["Bilinen başlangıçta açılma, yük etkisini gösterir. Kapalı kalma tek başına nötrlüğü kanıtlamaz.", "Elektroskop önceden yüklüyse yaprakların kapanması nötr demek olmayabilir; zıt yük yaklaşınca da kapanabilir."],
    ];
    return { els, readout: rows[step] };
  },
};

const electroscopeInductionFigure: FigureDef = {
  caption: "Negatif çubuğun temassız etkisini artırırken topuzun ve yaprak bölgesinin işaretini karşılaştır.",
  alt: "Cam fanus içindeki elektroskobun topuzu ve yaprakları ayrı etiketli. Negatif çubuk ile topuz arasında boşluk var. Yapraklar kapanıp ters işaretle tekrar açılabilir. Alt metin iki bölgenin yükünü ve toplamı verir.",
  param: { label: "Temassız etki", min: 0, max: 3, step: 1, init: 0 },
  draw: (effect) => {
    const charge = electroscopeInduction(effect);
    const angle = Math.min(0.72, Math.abs(charge.leaves) * 0.35);
    const hinge = v(0, 0.55);
    const knob = v(0, 2.5);
    const rod = v(-3.9 + effect * 0.7, 2.5);
    const els: El[] = [
      poly([v(-0.5, 2), v(-1.55, 1.65), v(-1.65, -1.35), v(1.65, -1.35), v(1.55, 1.65), v(0.5, 2)], { tone: "c", open: true, thin: true }),
      seg(knob, hinge, { tone: "muted", bold: true }),
      ball(knob, 0.37, "warn"),
      ball(rod, 0.47, "b", "−"),
      txt(v(rod[0], 3.55), "Negatif çubuk", "c", { tone: "b", small: true }),
      txt(v(1.55, 2.5), electroscopeChargeText(charge.knob), "e", { tone: "warn", bold: true }),
    ];
    const tone: Tone = charge.leaves < 0 ? "b" : charge.leaves > 0 ? "warn" : "muted";
    for (const direction of [-1, 1]) {
      const tip = v(direction * 1.35 * Math.sin(angle), hinge[1] - 1.35 * Math.cos(angle));
      els.push(seg(hinge, tip, { tone, bold: true }));
    }
    els.push(txt(v(1.55, -0.62), electroscopeChargeText(charge.leaves), "e", { tone, bold: true }));
    return {
      els,
      readout: [
        `Topuz bölgesi ${electroscopeChargeText(charge.knob)}. Yaprak bölgesi ${electroscopeChargeText(charge.leaves)}. Elektroskop toplamı ${electroscopeChargeText(charge.total)} model birimi.`,
        charge.leaves === 0 ? "Yapraklar kapalı." : charge.leaves < 0 ? "Yapraklar negatif işaretle yeniden açık." : "Yapraklar pozitif işaretle açık.",
      ],
    };
  },
};

/* ---------- 4. Alan ile kuvvet ---------- */
const field: FigureDef = {
  caption:
    "İleri ile +Q yükünün alanını ve P noktasındaki kuvveti karşılaştır. Alan (yeşil) kaynağa göre tanımlanır ve +Q'dan dışarı doğrudur. Pozitif deneme yükünde kuvvet alanla aynı, negatif deneme yükünde zıt yönlüdür. Uzaklık iki katına çıkınca alan dörtte birine iner.",
  alt: "Ortada kırmızı +Q yükü ve dışa doğru yeşil alan okları. Sağda P noktası; adımlarda P'de artı yüke sağa, eksi yüke sola kuvvet oku; son adımda 2r uzaklıkta kısa alan oku.",
  steps: ["Alan çizgileri", "P'de +q", "P'de −q", "Uzaklık 2r"],
  draw: (_v, step) => {
    const Q = v(0, 0);
    const els: El[] = [];
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      els.push(vec(v(Math.cos(a) * 0.75, Math.sin(a) * 0.75), v(Math.cos(a) * 2.1, Math.sin(a) * 2.1), { tone: "c", thin: true }));
    }
    els.push(ball(Q, 0.5, "warn", "+Q"));
    const P = step === 3 ? v(5.0, 0) : v(2.5, 0);
    if (step >= 1) {
      const isNeg = step === 2;
      els.push(ball(P, 0.28, isNeg ? "b" : "warn", isNeg ? "−" : "+"));
      const Elen = step === 3 ? 0.5 : 2.0;
      els.push(vec(v(P[0] + 0.35, P[1] + 0.55), v(P[0] + 0.35 + Elen, P[1] + 0.55), { tone: "c", bold: true }), txt(v(P[0] + 0.35 + Elen, P[1] + 0.85), step === 3 ? "E/4" : "E", "n", { tone: "c", small: true, bold: true }));
      const F = isNeg ? -1.6 : step === 3 ? 0.4 : 1.6;
      els.push(vec(v(P[0] + (isNeg ? -0.35 : 0.35), P[1] - 0.8), v(P[0] + (isNeg ? -0.35 : 0.35) + F, P[1] - 0.8), { tone: isNeg ? "b" : "warn", bold: true }), txt(v(P[0] + (isNeg ? -0.35 : 0.35) + F, P[1] - 1.0), "F", "s", { tone: isNeg ? "b" : "warn", small: true, bold: true }));
      els.push(seg(v(0, -2.6), v(P[0], -2.6), { tone: "muted", thin: true }), txt(v(P[0] / 2, -2.75), step === 3 ? "2r" : "r", "s", { tone: "muted", small: true }));
    }
    els.push(txt(v(-2.6, 2.6), " ", "c"), txt(v(7.6, -3.2), " ", "c"));
    const rows: [string, string][] = [
      ["E = k·|Q|/r², birimi N/C. +Q'nun alanı dışarı, −Q'nun alanı içeri doğrudur.", "Alan, o noktaya konacak pozitif deneme yüküne birim yük başına düşen kuvvettir."],
      ["F = q·E: pozitif deneme yükünde F alanla aynı yönde (sağa).", "+Q ile +q aynı işaretli: iter."],
      ["Negatif deneme yükünde F alanın tersine (sola). Alanın yönü değişmedi!", "+Q ile −q zıt işaretli: çeker. Alan yönü elektronun hareket yönü değildir."],
      ["Uzaklık 2 katına çıktı: E ve F, 1/2² = 1/4 katına iner (yarıya değil).", "Coulomb oranı: F′/F = (q₁′q₂′/q₁q₂)·(r/r′)². 3r → 1/9."],
    ];
    return { els, readout: rows[step] };
  },
};

const groundingTransferFigure: FigureDef = {
  caption: "Yükler model biriminde. Ok, dengeye kadar olan aktarımı gösterir.",
  alt: "Yüklü metal küre, açılıp kapanan anahtar ve Dünya bağlantısı. Elektron oku yalnız aktarım adımında çıkar. Yön ve toplam yük değişimi metinde verilir.",
  steps: ["−3, açık", "−3, bağlı", "+3, açık", "+3, bağlı"],
  draw: (_value, step) => {
    const initial = step < 2 ? -3 : 3;
    const connected = step % 2 === 1;
    const result = groundingTransfer(initial, connected);
    const left = v(-2, 0.4);
    const switchStart = v(0.3, 0.4);
    const switchEnd = v(1.35, 0.4);
    const earthTop = v(2.6, 0.4);
    const earthGround = v(2.6, -2.1);
    const charge = groundingChargeText(result.conductor);
    const elements: El[] = [
      ball(left, 0.85, connected ? "muted" : initial < 0 ? "b" : "warn", charge),
      seg(v(-1.15, 0.4), switchStart, { tone: "ink" }),
      ball(switchStart, 0.06, "ink"),
      ball(switchEnd, 0.06, "ink"),
      seg(switchStart, connected ? switchEnd : v(1.24, 0.93), { tone: "ink" }),
      seg(switchEnd, earthTop, { tone: "ink" }),
      seg(earthTop, earthGround, { tone: "ink" }),
      seg(v(2.05, -2.1), v(3.15, -2.1), { tone: "ink" }),
      seg(v(2.25, -2.32), v(2.95, -2.32), { tone: "ink" }),
      seg(v(2.43, -2.54), v(2.77, -2.54), { tone: "ink" }),
      txt(v(2.6, -2.85), "Dünya", "s", { bold: true }),
      txt(v(-2, 1.56), "Metal küre", "c", { bold: true }),
    ];
    if (result.direction) {
      const towardsEarth = result.direction === "to-earth";
      const high = v(3.1, 0.08);
      const low = v(3.1, -1.52);
      elements.push(vec(towardsEarth ? high : low, towardsEarth ? low : high, { tone: "b", bold: true }));
      elements.push(txt(v(3.5, -0.65), "e⁻", "e", { tone: "b", bold: true }));
    }
    const direction = initial < 0 ? "küreden Dünya’ya" : "Dünya’dan küreye";
    const readout = connected
      ? [`Elektron: ${direction}.`, `Küre 0. Dünya’nın yük değişimi ${groundingChargeText(result.earthChange)}.`]
      : [`Anahtar açık. Küre ${charge}.`, "Elektron geçişi yok."];
    return { els: elements, readout };
  },
};

export const physicsFiguresElectrostatics: Record<string, Record<string, FigureDef>> = {
  "durgun-elektrik": {
    "Dokunmada eşitlik için geometrik koşul gerekir": touch,
    "Toprak Dünya’yı da hesap sınırına ekler": induction,
    "Elektroskopta hareketi, başlangıcı ve uzaklığı birlikte oku": scope,
    [electroscopeTitle]: electroscopeInductionFigure,
    [groundingTransferTitle]: groundingTransferFigure,
    "Kuvvet ile alanı aynı ok sanma": field,
  },
};

