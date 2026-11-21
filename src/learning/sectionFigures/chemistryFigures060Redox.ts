import { circle, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { box, nf, pad } from "./physicsFigures058Kit";
import { grid, hbars, type GridRow } from "./chemistryFigures060Kit";

/*
 * Forge060 AYT Kimya: redoks, metalik aktiflik, elementler ve yükseltgenme
 * basamağı, iyonlaşma / elektron ilgisi. Denklemler ve E° değerleri bölüm
 * metninde verilen sınıf verileridir (Cu +0,337, Zn −0,763, Ag +0,799,
 * Cr −0,744, Pb −0,126 V; H₂ referansı 0 V). Ardışık iyonlaşma enerjileri
 * (Mg 738 / 1451 / 7733; Al 578 / 1817 / 2745 / 11577 kJ/mol) tablo
 * değerleridir; Al'ın 578 → 1817 basamağı bölümde de geçer. F ve Cl için
 * elektron ilgisi 328 ve 349 kJ/mol bölümden.
 */

const ok = (a: number | string, b: number | string): Tone => (a === b ? "ink" : "warn");
const sg = (x: number) => (x > 0 ? `+${x}` : x < 0 ? `−${-x}` : "0");

/** n grup × her grupta per elektron; grup etiketi üstte (top) ya da altta. */
function eGroups(y: number, n: number, per: number, label: string, tone: Tone, top: boolean, width = 7.2): El[] {
  const els: El[] = [];
  const total = n * per;
  const step = width / total;
  for (let g = 0; g < n; g++) {
    const x0 = g * per * step;
    const x1 = (g + 1) * per * step;
    els.push(box(x0 + 0.06, y - 0.32, x1 - 0.06, y + 0.32, tone, false));
    for (let i = 0; i < per; i++) els.push(circle(v(x0 + (i + 0.5) * step, y), 0.13, { tone: "warn", fill: "warn" }));
    els.push(txt(v((x0 + x1) / 2, top ? y + 0.32 : y - 0.32), label, top ? "n" : "s", { tone: "ink", small: true, bold: true }));
  }
  return els;
}

/* ---------- redoks-denklestirme ---------- */

const numberLine: FigureDef = {
  caption:
    "Yükseltgenme basamağı sayı doğrusunda: Zn(k) → Zn²⁺ + 2e⁻ basamağı 0'dan +2'ye çıkarır (elektron verir, yükseltgenir); Cu²⁺ + 2e⁻ → Cu(k) +2'den 0'a indirir (elektron alır, indirgenir). Verilen ve alınan elektron sayısı eşittir; net denklemde serbest e⁻ kalmaz.",
  alt: "Yatay sayı doğrusu −1'den +3'e. Üstte 0'dan +2'ye sağa ok (Zn, 2e⁻ verir), altta +2'den 0'a sola ok (Cu²⁺, 2e⁻ alır).",
  draw: () => {
    const X = (n: number) => n * 1.6;
    const els: El[] = [seg(v(X(-1.3), 0), v(X(3.3), 0), { tone: "ink" })];
    for (let n = -1; n <= 3; n++) els.push(seg(v(X(n), -0.12), v(X(n), 0.12), { tone: "ink" }), txt(v(X(n), -0.15), sg(n), "s", { tone: "muted", small: true }));
    els.push(vec(v(X(0), 0.7), v(X(2), 0.7), { tone: "b", bold: true }), txt(v(X(1), 0.75), "Zn: −2e⁻", "n", { tone: "b", small: true, bold: true }));
    els.push(vec(v(X(2), -1.0), v(X(0), -1.0), { tone: "warn", bold: true }), txt(v(X(1), -1.05), "Cu²⁺: +2e⁻", "s", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(X(3.3), 0.7), "yükseltgenme", "w", { tone: "b", small: true }), txt(v(X(3.3), -1.0), "indirgenme", "w", { tone: "warn", small: true }));
    els.push(...pad(X(-1.5), 1.6, X(3.5), -1.9));
    return { els, readout: ["Zn: 0 → +2, 2 e⁻ verir (yükseltgenir) · Cu²⁺: +2 → 0, 2 e⁻ alır (indirgenir).", "Zn + Cu²⁺ → Zn²⁺ + Cu: 2 e⁻ verilen = 2 e⁻ alınan."] };
  },
};

const crFe: FigureDef = {
  caption:
    "Dikromattaki iki Cr +6'dan +3'e inerse her atom 3, iyonun tamamı 6 elektron alır. Fe²⁺ → Fe³⁺ için her Fe 1 elektron verir. Elektronlar eşitlenince bir dikromat yarısı altı Fe yarısıyla eşleşir; yalnız 6 − 3 = 3 yazmak bir Cr atomunu kaybettirir.",
  alt: "Üst sırada iki kutu (Cr, Cr), her birinde üç elektron noktası: toplam 6. Alt sırada altı kutu (Fe), her birinde bir elektron: toplam 6. Noktalar alt alta hizalı.",
  draw: () => {
    const els: El[] = [...eGroups(1.3, 2, 3, "Cr: +6 → +3", "a", true), ...eGroups(0, 6, 1, "Fe", "b", false)];
    els.push(txt(v(7.4, 1.3), "6 e⁻ alır", "e", { tone: "ink", small: true, bold: true }), txt(v(7.4, 0), "6 e⁻ verir", "e", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-0.3, 2.4, 10.0, -1.0));
    return { els, readout: ["Cr₂O₇²⁻: 2 Cr × 3 e⁻ = 6 e⁻ alır · Fe²⁺: 1 e⁻ verir.", "Eşleşme: 1 Cr₂O₇²⁻ yarısı : 6 Fe²⁺ yarısı (katsayı bütün terimlere)."] };
  },
};

const STEP_C: { title: string; rows: GridRow[] | null; note: [string, string] }[] = [
  { title: "C + HNO₃ → CO₂ + NO + H₂O", rows: null, note: ["C: 0 → +4, 4 e⁻ verir · N: +5 → +2, 3 e⁻ alır.", "Önce basamağı değişen elementleri ve atom başına değişimi yaz."] },
  { title: "3 C + 4 HNO₃ → 3 CO₂ + 4 NO + …", rows: null, note: ["EKOK(4, 3) = 12: 3 C (12 e⁻ verir), 4 N (12 e⁻ alır).", "NO'ya 4 gerekince N sayısı HNO₃'ü de 4 yapar."] },
  {
    title: "3 C + 4 HNO₃ → 3 CO₂ + 4 NO + 2 H₂O",
    rows: [
      { label: "sol", cells: ["3", "4", "4", "12"] },
      { label: "sağ", cells: ["3", "4", "4", "12"] },
    ],
    note: ["H: 4 → 2 H₂O; O: 12 = 6 (CO₂) + 4 (NO) + 2 (H₂O).", "Bütün atomlar yeniden sayıldı: denklem dengeli."],
  },
];
const stepwise: FigureDef = {
  caption:
    "İleri ile C + HNO₃ iskeletini korunum zinciri olarak dengele. Önce basamağı değişen atomlar ve elektron sayıları, sonra elektronları ortak katta eşitleme (çubuklar), en son H ve O'yu tamamlayıp bütün atomları yeniden sayma.",
  alt: "Üstte denklem. İlk iki adımda verilen ve alınan elektronları gösteren iki yatay çubuk; üçüncü adımda C, H, N, O için sol ve sağ atom sayıları tablosu.",
  steps: ["Değişen basamaklar", "Elektronları eşitle", "H ve O'yu tamamla"],
  draw: (_v, step) => {
    const s = STEP_C[step];
    const els: El[] = [txt(v(3.6, 3.0), s.title, "c", { tone: "ink", bold: true })];
    if (s.rows) els.push(...grid(1.2, 1.9, ["C", "H", "N", "O"], s.rows));
    else {
      const k = step === 0 ? 1 : 1;
      const give = step === 0 ? 4 : 12;
      const take = step === 0 ? 3 : 12;
      els.push(
        ...hbars(
          [
            { label: "C verir", value: give * k, tone: "b", text: `${give} e⁻` },
            { label: "N alır", value: take * k, tone: "warn", text: `${take} e⁻` },
          ],
          { x0: 2.0, y0: 1.8, w: 4.4, max: 12, gap: 0.9 },
        ),
      );
    }
    els.push(...pad(-0.6, 3.6, 8.0, -0.2));
    return { els, readout: s.note };
  },
};

const MNO4: { eq: string; l: number[]; r: number[] }[] = [
  { eq: "MnO₄⁻ → Mn²⁺", l: [1, 4, 0, -1], r: [1, 0, 0, 2] },
  { eq: "MnO₄⁻ → Mn²⁺ + 4H₂O", l: [1, 4, 0, -1], r: [1, 4, 8, 2] },
  { eq: "MnO₄⁻ + 8H⁺ → Mn²⁺ + 4H₂O", l: [1, 4, 8, 7], r: [1, 4, 8, 2] },
  { eq: "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O", l: [1, 4, 8, 2], r: [1, 4, 8, 2] },
];
const acidic: FigureDef = {
  caption:
    "İleri ile MnO₄⁻ → Mn²⁺ yarı tepkimesini asidik ortamda dengele: önce O ve H dışındaki atomlar (Mn), sonra eksik O için H₂O, eksik H için H⁺, en son toplam yükü e⁻ ile eşitle. Tabloda eşit olmayan hücreler vurgulu; son adımda Mn 1, O 4, H 8 ve yük +2 iki tarafta da aynı.",
  alt: "Üstte adım adım büyüyen yarı denklem; altında Mn, O, H ve yük için sol/sağ tablosu, eşit olmayan değerler vurgulu.",
  steps: ["Mn", "O için H₂O", "H için H⁺", "Yük için e⁻"],
  draw: (_v, step) => {
    const s = MNO4[step];
    const cell = (x: number, j: number) => (j === 3 ? sg(x) : String(x));
    const els: El[] = [txt(v(3.4, 2.9), s.eq, "c", { tone: "ink", bold: true })];
    els.push(
      ...grid(1.0, 1.9, ["Mn", "O", "H", "yük"], [
        { label: "sol", cells: s.l.map(cell), tones: s.l.map((x, j) => ok(x, s.r[j])) },
        { label: "sağ", cells: s.r.map(cell), tones: s.r.map((x, j) => ok(x, s.l[j])) },
      ]),
    );
    els.push(...pad(-0.6, 3.5, 7.4, -0.2));
    const notes: [string, string][] = [
      ["Mn iki yanda 1; O ve H henüz dengesiz, yük −1 / +2.", "Yardımcı türler ortamın koşuluna bağlıdır (asidik)."],
      ["Sağa 4 H₂O: O 4 = 4. Şimdi sağda 8 H var.", "Rastgele iki tarafa su eklemek denkleştirme değildir."],
      ["Sola 8 H⁺: H 8 = 8. Yük: sol −1 + 8 = +7, sağ +2.", "Yük farkı 5."],
      ["Sola 5 e⁻: yük +7 − 5 = +2 = sağ. MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O", "Her katsayı bir atom ya da yük kontrolünün sonucudur."],
    ];
    return { els, readout: notes[step] };
  },
};

const sumHalves: FigureDef = {
  caption:
    "İleri ile bazik ortamdaki iki yarıyı topla: MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂ + 4OH⁻ (×2) ve SO₃²⁻ + 2OH⁻ → SO₄²⁻ + H₂O + 2e⁻ (×3); 6 elektron eşleşir. Karşı taraflarda ortak görünen türler ancak aynı miktarları kadar sadeleşir. Son adım atom ve yük denetimi: toplam −8 iki tarafta korunur.",
  alt: "Üstte toplanan denklem; altında tablo: önce e⁻, H₂O, OH⁻ miktarları sol/sağ (sadeleştirme öncesi ve sonrası), en son Mn, S, O, H ve yük.",
  steps: ["Çarp ve topla", "Sadeleştir", "Denetle"],
  draw: (_v, step) => {
    const titles: [string, string][] = [
      ["2MnO₄⁻ + 4H₂O + 6e⁻ + 3SO₃²⁻ + 6OH⁻", "→ 2MnO₂ + 8OH⁻ + 3SO₄²⁻ + 3H₂O + 6e⁻"],
      ["2MnO₄⁻ + 3SO₃²⁻ + H₂O", "→ 2MnO₂ + 3SO₄²⁻ + 2OH⁻"],
      ["2MnO₄⁻ + 3SO₃²⁻ + H₂O", "→ 2MnO₂ + 3SO₄²⁻ + 2OH⁻"],
    ];
    const els: El[] = [txt(v(3.6, 3.5), titles[step][0], "c", { tone: "ink", bold: true, small: true }), txt(v(3.6, 2.9), titles[step][1], "c", { tone: "ink", bold: true, small: true })];
    if (step < 2) {
      const L = step === 0 ? [6, 4, 6] : [0, 1, 0];
      const R = step === 0 ? [6, 3, 8] : [0, 0, 2];
      els.push(
        ...grid(1.6, 1.9, ["e⁻", "H₂O", "OH⁻"], [
          { label: "sol", cells: L.map(String) },
          { label: "sağ", cells: R.map(String) },
        ], 1.6),
      );
    } else {
      const cells = ["2", "3", "18", "2", "−8"];
      els.push(
        ...grid(0.6, 1.9, ["Mn", "S", "O", "H", "yük"], [
          { label: "sol", cells },
          { label: "sağ", cells },
        ]),
      );
    }
    els.push(...pad(-0.8, 4.0, 8.0, -0.2));
    const notes: [string, string][] = [
      ["İki yarı ×2 ve ×3 ile çarpılıp toplandı: 6 e⁻ = 6 e⁻.", "Yarıların bütün türleri katsayıyla çarpıldı."],
      ["e⁻: 6 − 6 = 0 · H₂O: 4 − 3 = 1 solda · OH⁻: 8 − 6 = 2 sağda.", "Fazla miktar ilgili tarafta kalır."],
      ["O: 8 + 9 + 1 = 4 + 12 + 2 = 18 · yük: −2 − 6 = −6 − 2 = −8.", "Atomlar ve yük iki tarafta eşit."],
    ];
    return { els, readout: notes[step] };
  },
};

/* ---------- metalik-aktiflik ---------- */

const E0: { s: string; e: number; side: -1 | 1 }[] = [
  { s: "Ag⁺/Ag", e: 0.799, side: -1 },
  { s: "Cu²⁺/Cu", e: 0.337, side: 1 },
  { s: "2H⁺/H₂", e: 0, side: -1 },
  { s: "Pb²⁺/Pb", e: -0.126, side: 1 },
  { s: "Cr³⁺/Cr", e: -0.744, side: -1 },
  { s: "Zn²⁺/Zn", e: -0.763, side: 1 },
];
const PAIRS: { give: string; take: string; eq: string }[] = [
  { give: "Zn²⁺/Zn", take: "Cu²⁺/Cu", eq: "Zn + Cu²⁺ → Zn²⁺ + Cu" },
  { give: "Cu²⁺/Cu", take: "Ag⁺/Ag", eq: "Cu + 2Ag⁺ → Cu²⁺ + 2Ag" },
  { give: "Cr³⁺/Cr", take: "Pb²⁺/Pb", eq: "2Cr + 3Pb²⁺ → 2Cr³⁺ + 3Pb" },
];
const scale: FigureDef = {
  caption:
    "İleri ile bir verici metal – alıcı iyon çifti seç. Bütün değerler indirgenme yönünde verilmiştir (bölümdeki yuvarlatılmış sınıf verileri; standart hidrojen elektrodu tanım gereği 0 V). Yazılan yönün gerilimi E° = E°(alıcı) − E°(verici): ok vericiden alıcıya yukarı çıkar ve uzunluğu E°'dir. Pozitif değer, standart koşulda o yönü destekler.",
  alt: "Düşey E° ekseni: Ag⁺/Ag +0,799, Cu²⁺/Cu +0,337, H 0, Pb²⁺/Pb −0,126, Cr³⁺/Cr −0,744, Zn²⁺/Zn −0,763 V. Seçili çiftte vericiden alıcıya yukarı ok.",
  steps: ["Zn → Cu²⁺", "Cu → Ag⁺", "Cr → Pb²⁺"],
  draw: (_v, step) => {
    const Y = (e: number) => e * 3.4;
    const els: El[] = [seg(v(0, Y(-0.9)), v(0, Y(0.95)), { tone: "muted" })];
    const p = PAIRS[step];
    for (const r of E0) {
      const on = r.s === p.give || r.s === p.take;
      els.push(seg(v(-0.15, Y(r.e)), v(0.15, Y(r.e)), { tone: on ? "warn" : "ink" }));
      els.push(txt(v(r.side * 0.3, Y(r.e)), `${r.s} ${r.e > 0 ? "+" : r.e < 0 ? "−" : ""}${nf(Math.abs(r.e), 3)}`, r.side > 0 ? "e" : "w", { tone: on ? "ink" : "muted", small: true, bold: on }));
    }
    const g = E0.find((r) => r.s === p.give)!;
    const t = E0.find((r) => r.s === p.take)!;
    els.push(vec(v(0, Y(g.e)), v(0, Y(t.e)), { tone: "warn", bold: true }));
    els.push(txt(v(0, Y(0.95)), "E° (V)", "n", { tone: "muted", small: true }));
    els.push(...pad(-4.4, Y(1.05), 4.4, Y(-0.95)));
    const E = t.e - g.e;
    const f3 = (x: number) => (x > 0 ? "+" : "") + x.toFixed(3).replace(".", ",").replace("-", "−");
    return { els, readout: [`${p.eq}: E° = ${f3(t.e)} − (${f3(g.e)}) = ${f3(E)} V`, "Ters yön aynı büyüklükte negatif değer verir; derişim farklıysa E ≠ E°."] };
  },
};

const coef: FigureDef = {
  caption:
    "Cu + 2Ag⁺ → Cu²⁺ + 2Ag: bir Cu 2 elektron verir, her Ag⁺ bir elektron alır; katsayı 2 elektronları eşitler. Standart potansiyel yoğun bir özelliktir ve katsayıyla çarpılmaz: E° = 0,799 − 0,337 = 0,462 V. 2 · 0,799 − 0,337 = 1,261 V hesabı (boş çubuk) yanlıştır.",
  alt: "Üstte bir Cu kutusundan iki elektron, iki Ag⁺ kutusunun her birine bir elektron. Altta iki yatay çubuk: doğru 0,462 V ve yanlış 1,261 V (kesikli).",
  draw: () => {
    const els: El[] = [...eGroups(2.6, 1, 2, "Cu: 2 e⁻ verir", "a", true, 3.6), ...eGroups(1.6, 2, 1, "Ag⁺", "b", false, 3.6)];
    els.push(
      ...hbars(
        [
          { label: "doğru", value: 0.462, tone: "c", text: "0,462 V" },
          { label: "2·0,799 − 0,337", value: 1.261, tone: "warn", text: "1,261 V", hollow: true },
        ],
        { x0: 3.6, y0: -0.2, w: 3.0, max: 1.261, gap: 0.85 },
      ),
    );
    els.push(...pad(-0.6, 3.5, 8.6, -1.6));
    return { els, readout: ["Katsayı 2: aktarılan elektron ve mol miktarı iki katına çıkar.", "E° = 0,799 − 0,337 = 0,462 V (katsayıyla çarpılmaz)."] };
  },
};

const crPb: FigureDef = {
  caption:
    "Cr metali Cr³⁺ olurken 3, Pb²⁺ metale dönüşürken 2 elektronla ilişkilidir. En küçük ortak 6: 2 Cr (2 × 3 e⁻) ile 3 Pb²⁺ (3 × 2 e⁻) eşleşir; 2Cr + 3Pb²⁺ → 2Cr³⁺ + 3Pb. İyon yükü de korunur: solda 3 × 2 = +6, sağda 2 × 3 = +6. E° = −0,126 − (−0,744) = +0,618 V.",
  alt: "Üst sırada iki Cr kutusu, her birinde üç elektron; alt sırada üç Pb²⁺ kutusu, her birinde iki elektron. İki sıra da altı elektron.",
  draw: () => {
    const els: El[] = [...eGroups(1.3, 2, 3, "Cr → Cr³⁺", "a", true), ...eGroups(0, 3, 2, "Pb²⁺ → Pb", "b", false)];
    els.push(txt(v(7.4, 1.3), "6 e⁻", "e", { tone: "ink", small: true, bold: true }), txt(v(7.4, 0), "6 e⁻", "e", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-0.3, 2.4, 8.8, -1.0));
    return { els, readout: ["2Cr + 3Pb²⁺ → 2Cr³⁺ + 3Pb · yük: +6 = +6.", "E° = −0,126 − (−0,744) = +0,618 V; aktif metalin katsayısı 1 kalmak zorunda değil."] };
  },
};

/* ---------- ayt-elementler-yukseltgenme ---------- */

type Block = "s" | "p" | "d" | "f";
function cells(): { x: number; y: number; b: Block }[] {
  const out: { x: number; y: number; b: Block }[] = [];
  for (let per = 1; per <= 7; per++)
    for (let g = 1; g <= 18; g++) {
      if (per === 1 && g !== 1 && g !== 18) continue;
      if (per <= 3 && g > 2 && g < 13) continue;
      const b: Block = g <= 2 || (per === 1 && g === 18) ? "s" : g >= 13 ? "p" : "d";
      out.push({ x: g, y: per, b });
    }
  for (const row of [0, 1]) for (let i = 0; i < 14; i++) out.push({ x: 3.5 + i, y: 8.4 + row, b: "f" });
  return out;
}
const CELLS = cells();
const S = 0.42;
const cx = (g: number) => (g - 1) * S;
const cy = (p: number) => -(p - 1) * S;
function table(els: El[], hi: (b: Block) => boolean) {
  const tone: Record<Block, Tone> = { s: "a", p: "c", d: "b", f: "warn" };
  for (const c of CELLS) els.push(box(cx(c.x), cy(c.y), cx(c.x) + S - 0.04, cy(c.y) + S - 0.04, hi(c.b) ? tone[c.b] : "muted", hi(c.b)));
}

const trend: FigureDef = {
  caption:
    "Şematik periyodik tablo (ölçekli değil). Metalik karakter aynı ana grupta aşağı, aynı periyotta sola doğru genel olarak artar; ametalik karakter için sağa-yukarı yönü kullanılır. Bunlar nitel eğilimlerdir: tepkime hızı, erime sıcaklığı ve sertlik aynı nicelik değildir.",
  alt: "Kutucuklardan oluşan periyodik tablo şeması. Üstte sola bakan ve solda aşağı bakan oklar 'metalik', altta sağa ve sağda yukarı bakan oklar 'ametalik' diye etiketli.",
  draw: () => {
    const els: El[] = [];
    table(els, () => false);
    const W = 18 * S;
    els.push(vec(v(W - 0.2, 0.75), v(0.2, 0.75), { tone: "a", bold: true }), txt(v(W / 2, 0.8), "metalik", "n", { tone: "a", small: true, bold: true }));
    els.push(vec(v(-0.45, 0.2), v(-0.45, cy(7) + 0.1), { tone: "a", bold: true }), txt(v(-0.5, cy(4)), "metalik", "w", { tone: "a", small: true, bold: true }));
    els.push(vec(v(W + 0.45, cy(7) + 0.1), v(W + 0.45, 0.2), { tone: "c", bold: true }), txt(v(W + 0.5, cy(4)), "ametalik", "e", { tone: "c", small: true, bold: true }));
    els.push(...pad(-2.5, 1.5, W + 2.9, cy(9.4)));
    return { els, readout: ["Metalik: aşağı ve sola artar · ametalik: yukarı ve sağa.", "Daha kolay elektron vermek daha yüksek erime noktası demek değildir."] };
  },
};

const blocks: FigureDef = {
  caption:
    "İleri ile blokları sırayla vurgula (şematik tablo). s bloğu grup 1–2 ve He (1s²); p bloğu grup 13–18 (He hariç) metal, ametal, yarı metal ve soy gazları birlikte içerir; d bloğu grup 3–12, üyeleri metaldir; f ailesi altta iki satırdır. Zn, Cd, Hg grup 12; Cu, Ag, Au grup 11'dir.",
  alt: "Kutucuklu periyodik tablo şeması; seçili bloğun hücreleri renkli, diğerleri soluk. Üstte grup numarası aralığı.",
  steps: ["s bloğu", "p bloğu", "d bloğu", "f ailesi"],
  draw: (_v, step) => {
    const b = (["s", "p", "d", "f"] as Block[])[step];
    const els: El[] = [];
    table(els, (x) => x === b);
    const lab: Record<Block, [number, string]> = { s: [1.5, "grup 1–2 + He"], p: [15.5, "grup 13–18"], d: [7.5, "grup 3–12"], f: [10, "f ailesi"] };
    const [g, s] = lab[b];
    els.push(txt(v(cx(g) + S / 2, b === "f" ? cy(9.4) : 0.5), s, b === "f" ? "s" : "n", { tone: "ink", small: true, bold: true }));
    if (b === "d") els.push(seg(v(cx(11), cy(4) + S + 0.05), v(cx(13) - 0.04, cy(4) + S + 0.05), { tone: "ink", thin: true }), txt(v(cx(12), cy(4) + S + 0.05), "11–12", "n", { tone: "ink", small: true }));
    els.push(...pad(-0.5, 1.3, 18 * S + 0.5, cy(10.3)));
    const rows: [string, string][] = [
      ["s: alkali (+1) ve toprak alkali (+2); H grup 1'de ama ametal, He soy gaz.", "BeCl₂ gibi kovalent karakterli örnekler var."],
      ["p: metal, ametal, yarı metal ve soy gazlar bir arada; bütün p bloğu ametal değildir.", "Oda koşulunda F₂, Cl₂ gaz; Br₂ sıvı; I₂ katı."],
      ["d: grup 3–12, metal; birden çok basamak (Fe +2/+3, Cu +1/+2).", "Zn, Cd, Hg (grup 12) dar geçiş tanımında ayrı değerlendirilir."],
      ["f: altta iki satır; radyoaktivite sınırı ayrıca düşünülür.", "Şema gerçek tablo oranlarını göstermez."],
    ];
    return { els, readout: rows[step] };
  },
};

/** Yükseltgenme basamağı defteri: atom kutuları, değerler ve toplam. */
function ledger(atoms: { s: string; val: string; tone: Tone }[], total: string): El[] {
  const els: El[] = [];
  const w = Math.max(1.0, ...atoms.map((a) => a.val.length * 0.42));
  atoms.forEach((a, i) => {
    const x = i * (w + 0.15);
    els.push(box(x, 0, x + w, 1.0, a.tone, a.val !== "?"));
    els.push(txt(v(x + w / 2, 1.0), a.s, "n", { tone: "ink", small: true, bold: true }), txt(v(x + w / 2, 0.5), a.val, "c", { tone: a.val === "?" ? "warn" : "ink", small: true, bold: true }));
  });
  const x = atoms.length * (w + 0.15);
  els.push(txt(v((x - 0.15) / 2, -0.1), `toplam ${total}`, "s", { tone: "ink", small: true, bold: true }));
  els.push(...pad(-0.4, 1.9, Math.max(6.0, x + 0.2), -1.1));
  return els;
}

const sulfate: FigureDef = {
  caption:
    "İleri ile SO₄²⁻'de S'nin basamağını bul. Çok atomlu iyonda atom adetleriyle çarpılmış basamakların toplamı iyonun yüküne eşittir: S + 4 · (−2) = −2. Dört oksijeni saymadan tek bir −2 eklemek yanlış toplam verir.",
  alt: "Beş kutu: S (bilinmeyen) ve dört O (her biri −2); altta toplam −2. İkinci adımda S kutusunda +6.",
  steps: ["Bilinenler", "S'yi çöz"],
  draw: (_v, step) => {
    const O = { s: "O", val: "−2", tone: "c" as Tone };
    return {
      els: ledger([{ s: "S", val: step ? "+6" : "?", tone: "a" }, O, O, O, O], "−2"),
      readout: step ? ["S + 4 · (−2) = −2 → S = +6.", "Nötr bileşikte toplam 0, iyonda net yük."] : ["Bilinen: her O −2, dört O → −8; toplam = iyon yükü −2.", "Bilinmeyen tek: S."],
    };
  },
};

const HO: { f: string; atoms: { s: string; val: string; tone: Tone }[]; ans: string; note: string }[] = [
  { f: "OF₂", atoms: [{ s: "O", val: "+2", tone: "c" }, { s: "F", val: "−1", tone: "b" }, { s: "F", val: "−1", tone: "b" }], ans: "F her zaman −1 → O = +2.", note: "F önceliklidir; O burada pozitif." },
  { f: "H₂O₂", atoms: [{ s: "H", val: "+1", tone: "b" }, { s: "H", val: "+1", tone: "b" }, { s: "O", val: "−1", tone: "c" }, { s: "O", val: "−1", tone: "c" }], ans: "Peroksit: 2 · (+1) + 2O = 0 → her O −1.", note: "O₂²⁻ birimi; bağımsız O⁻ iyonu yok." },
  { f: "NaH", atoms: [{ s: "Na", val: "+1", tone: "a" }, { s: "H", val: "−1", tone: "b" }], ans: "Metal hidrürü: Na +1 → H = −1.", note: "H çoğu örnekte +1, metal hidrürde −1." },
  { f: "O₂", atoms: [{ s: "O", val: "0", tone: "c" }, { s: "O", val: "0", tone: "c" }], ans: "Element hâli: her O 0.", note: "Önce molekül adı ve bağlam okunur." },
];
const hoRules: FigureDef = {
  caption:
    "İleri ile H ve O'nun olağan değerlerinin değiştiği örnekleri aç. F bileşiklerinde −1 olduğundan OF₂'de O = +2; peroksitte O = −1; metal hidrüründe H = −1; element hâlinde 0. Her örnekte toplam yine sıfırdır.",
  alt: "Seçili formülün atom kutuları ve her kutuda basamak değeri; altta toplam 0.",
  steps: HO.map((h) => h.f),
  draw: (_v, step) => ({ els: ledger(HO[step].atoms, "0"), readout: [`${HO[step].f}: ${HO[step].ans}`, HO[step].note] }),
};

const magnetite: FigureDef = {
  caption:
    "İleri ile Fe₃O₄'te ortalama basamağı ve karışık değerlik açıklamasını karşılaştır. O = −2 alınınca üç Fe'nin toplamı +8, ortalama +8/3 olur. Bu her Fe'nin +8/3 yüklü olduğu anlamına gelmez: bir Fe(II) ve iki Fe(III) toplamı da +2 + 3 + 3 = +8 verir.",
  alt: "Yedi kutu: üç Fe ve dört O (−2). Birinci adımda Fe kutularında +8/3, ikinci adımda +2, +3, +3.",
  steps: ["Ortalama", "Fe(II) + 2 Fe(III)"],
  draw: (_v, step) => {
    const fe = step ? ["+2", "+3", "+3"] : ["+8/3", "+8/3", "+8/3"];
    const O = { s: "O", val: "−2", tone: "c" as Tone };
    return {
      els: ledger([...fe.map((val) => ({ s: "Fe", val, tone: "warn" as Tone })), O, O, O, O], "0"),
      readout: step ? ["+2 + 3 + 3 = +8 = 4 · 2: karışık değerlik açıklaması.", "Ortalama sayı gerçek her atomun değeri değildir."] : ["3Fe + 4 · (−2) = 0 → 3Fe = +8 → ortalama +8/3.", "Kutular yalnız sayımı gösterir, bağ geometrisini değil."],
    };
  },
};

/* ---------- ayt-iyonlasma-elektron-ilgisi-en ---------- */

const IE: Record<string, number[]> = { Mg: [738, 1451, 7733], Al: [578, 1817, 2745, 11577] };
const jumps: FigureDef = {
  caption:
    "İleri ile Mg ve Al'ın ardışık iyonlaşma enerjilerini karşılaştır (kJ/mol, tablo değeri; çubuklar log ölçekte). Mg'de üçüncü basamak belirgin yükselir: iki değerlik elektronu. Al'da 578 → 1817 artışı üç kattan fazladır ama ikinci elektron hâlâ değerlik bölgesindedir; iç katman sıçraması üçüncüden dördüncüye. Oran eşiği evrensel kural değildir.",
  alt: "Düşey çubuklar İE₁, İE₂, İE₃ (ve Al için İE₄), log ölçekli; her çubuğun üstünde kJ/mol değeri, aralarında ardışık oranlar.",
  steps: ["Mg", "Al"],
  draw: (_v, step) => {
    const name = step ? "Al" : "Mg";
    const vals = IE[name];
    const H = (x: number) => (Math.log10(x) - 2.4) * 2.0;
    const els: El[] = [seg(v(-0.8, 0), v(4 * 1.5, 0), { tone: "ink", thin: true })];
    const big = step ? 3 : 2;
    vals.forEach((x, i) => {
      const cx0 = i * 1.5;
      els.push(box(cx0 - 0.4, 0, cx0 + 0.4, H(x), i === big ? "warn" : "b"));
      els.push(txt(v(cx0, H(x)), String(x).replace(/\B(?=(\d{3})+(?!\d))/g, "."), "n", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(cx0, 0), `İE${"₁₂₃₄"[i]}`, "s", { tone: "ink", small: true, bold: true }));
    });
    els.push(txt(v(-0.8, H(12000) + 0.4), `${name} · log ölçek`, "e", { tone: "muted", small: true }));
    els.push(...pad(-1.0, H(12000) + 0.9, 5.4, -0.8));
    const r = vals.slice(1).map((x, i) => nf(x / vals[i], 2)).join(" · ");
    return { els, readout: [`Ardışık oranlar: ${r}`, step ? "Al: 3 değerlik elektronu; sıçrama İE₃ → İE₄." : "Mg: 2 değerlik elektronu; sıçrama İE₂ → İE₃."] };
  },
};

const stair: FigureDef = {
  caption:
    "İkinci iyonlaşma X⁺(g) → X²⁺(g) + e⁻ sürecidir; nötr atomdan iki elektron koparmanın toplamı değildir. Nötr atomdan +2 iyona toplam enerji İE₁ + İE₂'dir. Mg için tablo değerleri: 738 + 1451 = 2189 kJ/mol. Her basamağın başlangıç yükünü yaz.",
  alt: "Üç yatay enerji düzeyi: Mg(g) 0, Mg⁺(g) 738, Mg²⁺(g) 2189 kJ/mol; aralarında yukarı oklar İE₁ ve İE₂, yanda toplamı gösteren uzun ok.",
  draw: () => {
    const Y = (e: number) => e / 600;
    const lv: [string, number][] = [
      ["Mg(g)", 0],
      ["Mg⁺(g)", 738],
      ["Mg²⁺(g)", 2189],
    ];
    const els: El[] = [];
    lv.forEach(([s, e], i) => {
      const x = i * 1.9;
      els.push(seg(v(x, Y(e)), v(x + 1.4, Y(e)), { tone: "ink", bold: true }), txt(v(x + 0.7, Y(e)), s, "s", { tone: "ink", small: true, bold: true }));
    });
    els.push(vec(v(1.4, Y(0)), v(1.9, Y(738)), { tone: "b", bold: true }), txt(v(1.65, Y(369)), "İE₁ 738", "e", { tone: "b", small: true, bold: true }));
    els.push(vec(v(3.3, Y(738)), v(3.8, Y(2189)), { tone: "a", bold: true }), txt(v(3.55, Y(1460)), "İE₂ 1451", "e", { tone: "a", small: true, bold: true }));
    els.push(vec(v(5.9, Y(0)), v(5.9, Y(2189)), { tone: "warn", bold: true }), txt(v(6.0, Y(1100)), "2189", "e", { tone: "warn", small: true, bold: true }));
    els.push(seg(v(1.4, Y(0)), v(5.9, Y(0)), { tone: "muted", dash: true, thin: true }));
    els.push(...pad(-0.4, Y(2189) + 0.6, 7.2, -0.8));
    return { els, readout: ["İE₂ = Mg⁺ → Mg²⁺ basamağı (1451), toplam değil.", "Mg → Mg²⁺: İE₁ + İE₂ = 738 + 1451 = 2189 kJ/mol (tablo değeri)."] };
  },
};

const affinity: FigureDef = {
  caption:
    "İleri ile aynı olayın iki gösterimini değiştir. X(g) + e⁻ → X⁻(g) sırasında enerji açığa çıkar: düzey aşağı iner. Salınan büyüklük A pozitif (F 328, Cl 349 kJ/mol), süreç için ΔH negatif yazılır: A = −ΔH. Cl daha çok enerji salar; −328'in sayıca büyük olması daha çok salım demek değildir.",
  alt: "İki sütun: F ve Cl. Her birinde üstte X(g) + e⁻ düzeyi, altta X⁻(g) düzeyi ve aşağı ok; Cl'nin oku biraz daha uzun. Ok etiketi A ya da ΔH gösterimine göre değişir.",
  steps: ["A gösterimi", "ΔH gösterimi"],
  draw: (_v, step) => {
    const Y = (e: number) => e / 110;
    const els: El[] = [];
    (
      [
        ["F", 328, 0],
        ["Cl", 349, 3.4],
      ] as [string, number, number][]
    ).forEach(([s, a, x]) => {
      els.push(seg(v(x, 0), v(x + 1.6, 0), { tone: "ink", bold: true }), seg(v(x, Y(-a)), v(x + 1.6, Y(-a)), { tone: "c", bold: true }));
      els.push(txt(v(x + 0.8, 0), `${s}(g) + e⁻`, "n", { tone: "ink", small: true, bold: true }), txt(v(x + 0.8, Y(-a)), `${s}⁻(g)`, "s", { tone: "c", small: true, bold: true }));
      els.push(vec(v(x + 0.8, -0.1), v(x + 0.8, Y(-a) + 0.1), { tone: "warn", bold: true }));
      els.push(txt(v(x + 0.95, Y(-a / 2)), step ? `ΔH = −${a}` : `A = ${a}`, "e", { tone: "warn", small: true, bold: true }));
    });
    els.push(...pad(-0.4, 0.9, 6.6, Y(-349) - 0.8));
    return { els, readout: step ? ["ΔH(F) = −328, ΔH(Cl) = −349 kJ/mol: daha negatif = daha çok salım.", "Olay tersine dönmedi; yalnız raporlanan işaret değişti."] : ["A(F) = 328, A(Cl) = 349 kJ/mol: Cl daha çok enerji salar.", "A = −ΔH."] };
  },
};

export const chemistryFigures060Redox: Record<string, Record<string, FigureDef>> = {
  "redoks-denklestirme": {
    "Elektron veren yükseltgenir, alan indirgenir": numberLine,
    "Bir atomun değişimini atom sayısıyla çarp": crFe,
    "Moleküler denklemi aşamalı kur": stepwise,
    "Asidik yarı tepkimede su, H⁺ ve elektron": acidic,
    "Yarı tepkimeleri topla ve ortak türleri sadeleştir": sumHalves,
  },
  "metalik-aktiflik": {
    "Verilen iki indirgenme değerini çıkar": scale,
    "Katsayılar elektronları eşitler, voltajı çarpmaz": coef,
    "Elektron alışverişinden dengeli yer değiştirme kur": crPb,
  },
  "ayt-elementler-yukseltgenme": {
    "Metalik karakter tek bir ölçüm değildir": trend,
    "d bloğu ve geçiş kavramı": blocks,
    "Yük toplamı denklemi": sulfate,
    "H ve O için öncelik sırası": hoRules,
    "Ortalama sayı gerçek her atom değildir": magnetite,
  },
  "ayt-iyonlasma-elektron-ilgisi-en": {
    "İkinci enerji farklı yüklü türe aittir": stair,
    "Büyük sıçramayı gerekçeyle oku": jumps,
    "Elektron ilgisinde işaret sözleşmesi": affinity,
  },
};
