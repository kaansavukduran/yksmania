import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { bohr, shellsOf } from "./chemistryFiguresShells";

/*
 * TYT Kimya · Elementlerin sınıflandırılması. Sınıf listesi MEB OGM Kimya 9 ve
 * Defterim Kimya 9 sınıflandırmasıdır (yarı metaller B, Si, Ge, As, Sb, Te, Po,
 * At). İletkenlik şeridi sıralama şemasıdır, ölçekli değildir. ÖSYM bağı:
 * 2026 TYT Fen 14 (yapılmış sınav, resmî cevap D); çözüm özgündür.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });

type Cls = "metal" | "ametal" | "yari" | "soy" | "h";
const ROWS: [string, number, Cls][][] = [
  [["H", 1, "h"], ["He", 18, "soy"]],
  [["Li", 1, "metal"], ["Be", 2, "metal"], ["B", 13, "yari"], ["C", 14, "ametal"], ["N", 15, "ametal"], ["O", 16, "ametal"], ["F", 17, "ametal"], ["Ne", 18, "soy"]],
  [["Na", 1, "metal"], ["Mg", 2, "metal"], ["Al", 13, "metal"], ["Si", 14, "yari"], ["P", 15, "ametal"], ["S", 16, "ametal"], ["Cl", 17, "ametal"], ["Ar", 18, "soy"]],
  [["K", 1, "metal"], ["Ca", 2, "metal"], ["Sc", 3, "metal"], ["Ti", 4, "metal"], ["V", 5, "metal"], ["Cr", 6, "metal"], ["Mn", 7, "metal"], ["Fe", 8, "metal"], ["Co", 9, "metal"], ["Ni", 10, "metal"], ["Cu", 11, "metal"], ["Zn", 12, "metal"], ["Ga", 13, "metal"], ["Ge", 14, "yari"], ["As", 15, "yari"], ["Se", 16, "ametal"], ["Br", 17, "ametal"], ["Kr", 18, "soy"]],
];
const CLASSES: { id: Cls; label: string; tone: Tone; detail: string[] }[] = [
  { id: "metal", label: "Metal", tone: "b", detail: ["Sol ve orta bölge (H hariç 1. grup, 2. grup, geçiş elementleri, Al, Ga).", "Çoğu parlak, iyi iletken, tel ve levha yapılabilir; Hg oda koşullarında sıvıdır.", "Çoğunlukla elektron verip katyon oluşturur."] },
  { id: "ametal", label: "Ametal", tone: "c", detail: ["Sağ üst bölge: C, N, O, F, P, S, Cl, Se, Br (ve H).", "Katı, sıvı ya da gaz olabilir; katıları kırılgan, genellikle yalıtkan (grafit istisna).", "Elektron alır ya da ortaklaşa kullanır."] },
  { id: "yari", label: "Yarı metal", tone: "warn", detail: ["Basamak çizgisi çevresi: B, Si, Ge, As (ilk dört periyotta).", "İletkenlik metal ile ametal arasında; yarı iletkenlik önemli.", "Sınır listesi kaynağa göre değişebilir; soruda verilen şema esastır."] },
  { id: "soy", label: "Soy gaz", tone: "muted", detail: ["18. grup: He, Ne, Ar, Kr…", "Oda koşullarında tek atomlu gaz; son katman dolu, genellikle tepkimesiz.", "Kr ve Xe özel koşullarda bileşik oluşturabilir: “asla” deme."] },
  { id: "h", label: "H istisnası", tone: "a", detail: ["1. grubun üstünde durur ama ametaldir.", "“1. gruptaki her element metaldir” önermesinin karşı örneği."] },
];
const map: FigureDef = {
  caption:
    "İlk dört periyodun sınıf haritası (hücreler ölçekli değil). Bir sınıfa tıkla: o sınıfın hücreleri yanar, yeri ve ayırt edici özellikleri açılır. Konum verilmişse önce 18. grup, H ve basamak çizgisi kontrolü yap.",
  alt: "18 sütunlu, 4 satırlık periyodik tablo parçası; metal, ametal, yarı metal, soy gaz ve hidrojen farklı renkte.",
  picks: CLASSES.map((c) => ({ label: c.label, title: c.label, detail: c.detail })),
  draw: (_v, _s, pick = -1) => {
    const D = 0.62, on = pick >= 0 ? CLASSES[pick].id : null;
    const els: El[] = [];
    // Groups 1–2 and 13–18 form the main block; the transition metals
    // (groups 3–12, period 4) sit in their own strip below it, so every cell
    // is wide enough for its symbol on a phone.
    const cell = (g: number, r: number): [number, number] =>
      g <= 2 ? [(g - 1) * D, -r * D] : g >= 13 ? [(g - 11) * D, -r * D] : [(g - 3) * D, -4.85 * D];
    ROWS.forEach((row, r) =>
      row.forEach(([sym, g, cls]) => {
        const [x, y] = cell(g, r), cl = CLASSES.find((c) => c.id === cls)!;
        const lit = on === null || on === cls;
        els.push(rect(x, x + D - 0.04, y - D + 0.04, y, lit ? cl.tone : "muted", lit));
        els.push(txt(v(x + (D - 0.04) / 2, y - (D - 0.04) / 2), sym, "c", { small: true, tone: lit ? "ink" : "muted" }));
      }),
    );
    // Basamak çizgisi: B’nin solu (2. periyot), Al|Si ve Ga|Ge arası; şematik.
    els.push(poly([v(2 * D, -1 * D), v(2 * D, -2 * D), v(3 * D, -2 * D), v(3 * D, -4 * D)], { open: true, bold: true, tone: "warn" }));
    els.push(txt(v(0, -4.42 * D), "3–12. gruplar (4. periyot)", "e", { small: true, tone: "muted" }));
    CLASSES.forEach((c, i) => els.push(txt(v(i * 1.25, -6.75 * D), c.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 0.4), " ", "c"), txt(v(10 * D + 0.3, -7.1 * D), " ", "c"));
    return { els, readout: [pick >= 0 ? CLASSES[pick].detail[0] : "Bir sınıfa tıkla.", "Aynı grupta olmak aynı sınıfı garanti etmez: B yarı metal, Al metal (13. grup)."] };
  },
};

// 2 · Metallerde serbest elektronlar.
const SEA = ["Katyon kafesi", "Gerilim yok", "Gerilim var: iletim", "Dövme: katmanlar kayar"];
const IONS: [number, number][] = [];
for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) IONS.push([c * 1.0, -r * 1.0]);
// Elektronlar iyon sıralarının arasındaki boşluklarda (iyonların üstüne binmez).
const ELECTRONS: [number, number][] = [[0.3, -0.5], [1.4, -0.45], [2.25, -0.55], [3.4, -0.5], [0.7, -1.55], [1.75, -1.45], [2.7, -1.5], [3.6, -1.55]];
const sea: FigureDef = {
  caption:
    "Metalik bağ: düzenli katyon kafesi ve aralarında serbestçe dolaşan değerlik elektronları. Adımları ilerlet: gerilim uygulanınca elektronlar bir yöne kayar (iletkenlik); vurulunca katman bütün olarak kayar ama elektron denizi bağı korur (dövülebilirlik).",
  alt: "Üç sıra pozitif iyon ve aralarında küçük elektron noktaları; adımlarda elektron okları ve kayan katman.",
  steps: SEA,
  draw: (_v, step) => {
    const els: El[] = [];
    IONS.forEach(([x, y]) => {
      const shift = step === 3 && y === 0 ? 0.5 : 0;
      els.push(ball(v(x + shift, y), 0.22, "b"), txt(v(x + shift, y), "+", "c", { small: true, bold: true }));
    });
    if (step >= 1)
      ELECTRONS.forEach(([x, y], i) => {
        els.push(ball(v(x, y), 0.07, "a"));
        if (step === 2) els.push(vec(v(x - 0.1, y), v(x + 0.3, y), { thin: true, tone: "a" }));
        else if (step === 1) els.push(vec(v(x, y), v(x + 0.22 * Math.cos(i * 1.9), y + 0.22 * Math.sin(i * 1.9)), { thin: true, tone: "muted" }));
      });
    if (step === 2) els.push(txt(v(-0.4, -1.0), "−", "w", { bold: true, tone: "warn" }), txt(v(4.4, -1.0), "+", "e", { bold: true, tone: "warn" }));
    if (step === 3) els.push(vec(v(-0.9, 0.0), v(-0.35, 0.0), { tone: "warn", bold: true }));
    els.push(txt(v(-1.2, 0.6), " ", "c"), txt(v(5.4, -2.5), " ", "c"));
    return {
      els,
      readout: [
        step === 0 ? "Katyonlar düzenli dizilir." : step === 1 ? "Değerlik elektronları tek bir atoma bağlı değil, her yönde dolaşır." : step === 2 ? "Uç uca gerilimde elektronlar + uca doğru kayar: elektrik akımı." : "Üst katman kayar; elektron denizi her konumda bağı sürdürür, kırılmaz.",
        "Metal katısında ayrı “metal molekülü” yoktur; metalik bağla tutulan çok atomlu yapı vardır.",
      ],
    };
  },
};

// 3 · Ametallerde hâl ve yapı.
const NONMETALS = [
  { a: "O₂, N₂ · gaz", b: "küçük moleküller arası çekim zayıf", tone: "c" as Tone, detail: ["İki atomlu moleküller; oda koşullarında gaz.", "Ametal olmak tek bir hâl demek değildir."] },
  { a: "Br₂ · sıvı", b: "oda koşullarında sıvı olan ametal", tone: "c" as Tone, detail: ["Brom, oda koşullarında sıvı tek ametaldir.", "Hg ise sıvı metaldir: hâl sınıfı belirlemez."] },
  { a: "S₈ · katı", b: "kırılgan, yalıtkan sarı katı", tone: "c" as Tone, detail: ["Halka moleküllerden oluşan katı.", "Ametal katıları genellikle kırılgandır."] },
  { a: "Grafit (C) · iletken", b: "katmanlı yapı: ametal ama iletken", tone: "warn" as Tone, detail: ["Katmanlar içinde hareketli elektronlar: elektriği iletir.", "Grafit metal değildir; karbon ametal kalır (Z = 6)."] },
  { a: "Elmas (C) · yalıtkan", b: "aynı element, farklı yapı (allotrop)", tone: "c" as Tone, detail: ["Üç boyutlu kovalent ağ: çok sert, yalıtkan.", "Grafit ile elmas karbonun allotroplarıdır: element kimliği aynı."] },
];
const nonmetals: FigureDef = {
  caption:
    "Ametaller tek bir görünüşe sahip değildir: gaz, sıvı ya da katı olabilirler; aynı element farklı yapıda (allotrop) farklı özellik gösterebilir. Bir örneğe tıkla: hâli, yapısı ve hangi genellemeyi bozduğu açılır.",
  alt: "Beş satır: O₂ ve N₂ gaz, Br₂ sıvı, S₈ katı, grafit iletken, elmas yalıtkan.",
  picks: NONMETALS.map((n) => ({ label: n.a, title: n.a, detail: n.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    NONMETALS.forEach((r, i) => {
      const y = -i * 1.3, sel = pick === i;
      els.push(rect(-0.32, -0.16, y - 0.85, y + 0.25, r.tone));
      els.push(txt(v(0, y), r.a, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }), txt(v(0.3, y - 0.58), r.b, "e", { small: true, tone: sel ? "a" : "c" }));
    });
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(5.4, -6.2), " ", "c"));
    return { els, readout: [pick >= 0 ? NONMETALS[pick].detail[0] : "Bir örneğe tıkla.", "“Ametaller elektriği hiç iletmez” mutlak ifadesi grafitle bozulur."] };
  },
};

// 4 · İletkenlik şeridi.
const COND = [
  { s: "Cu", x: 5.6, cls: "metal", detail: ["Bakır: çok iyi iletken metal.", "Elektrik telleri bakırdandır."] },
  { s: "Al", x: 5.0, cls: "metal", detail: ["Alüminyum: iyi iletken metal."] },
  { s: "Ge", x: 3.2, cls: "yari", detail: ["Germanyum: yarı metal, yarı iletken."] },
  { s: "Si", x: 2.8, cls: "yari", detail: ["Silisyum: yarı iletken; elektronik yongaların temel maddesi.", "Parlak görünebilir ama kırılgandır."] },
  { s: "S", x: 0.4, cls: "ametal", detail: ["Kükürt: yalıtkan ametal."] },
];
const conductivity: FigureDef = {
  caption:
    "Elektrik iletkenliği şeridi (sıralama şeması, ölçekli değil): solda yalıtkanlar, sağda iyi iletkenler. Bir elemente tıkla: yarı metaller iki uç arasında durur. Tek başına “parlak” bilgisi metal demek değildir; iletkenlik ve işlenebilirlik birlikte okunur.",
  alt: "Soldan sağa artan iletkenlik oku; S solda, Si ve Ge ortada, Al ve Cu sağda.",
  picks: COND.map((c) => ({ label: c.s, title: `${c.s}: ${c.cls === "metal" ? "metal" : c.cls === "yari" ? "yarı metal" : "ametal"}`, detail: c.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [vec(v(-0.2, 0), v(6.4, 0), { tone: "muted" }), txt(v(0, -0.5), "yalıtkan", "c", { small: true, tone: "muted" }), txt(v(6.0, -0.5), "iyi iletken", "c", { small: true, tone: "muted" })];
    els.push(rect(2.3, 3.7, -0.15, 0.15, "warn"), txt(v(3.0, -0.5), "yarı iletken bölge", "c", { small: true, tone: "warn" }));
    COND.forEach((c, i) => {
      const sel = pick === i, y = 0.5 + (i % 2) * 0.5;
      els.push(seg(v(c.x, 0.15), v(c.x, y - 0.15), { thin: true, tone: sel ? "a" : "muted" }), ball(v(c.x, 0), 0.09, sel ? "a" : c.cls === "metal" ? "b" : c.cls === "yari" ? "warn" : "c"));
      els.push(txt(v(c.x, y), c.s, "c", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(-0.6, 1.4), " ", "c"), txt(v(6.8, -0.8), " ", "c"));
    return { els, readout: [pick >= 0 ? COND[pick].detail[0] : "Bir elemente tıkla.", "Yarı metallerin iletkenliği metal ile ametal arasındadır."] };
  },
};

// 5 · Soy gazlarda elektron sayısı.
const NOBLE = [{ z: 2 }, { z: 10 }, { z: 18 }];
const NAMES: Record<number, string> = { 2: "He", 10: "Ne", 18: "Ar" };
const noble: FigureDef = {
  caption:
    "Soy gazların son katmanı doludur ama dolu sayısı hep 8 değildir: He’de son katmanda 2, Ne ve Ar’da 8 elektron vardır. Bir soy gaza tıkla: katman diyagramı çizilir. “18. grup = 8 değerlik elektronu” genellemesi helyumda bozulur.",
  alt: "Seçilen soy gazın şematik katman diyagramı; altında He, Ne, Ar etiketleri.",
  picks: NOBLE.map((n) => ({ label: NAMES[n.z], title: `${NAMES[n.z]}: ${shellsOf(n.z).join(",")}`, detail: [`${NAMES[n.z]}: ${shellsOf(n.z).join(",")}; son katmanda ${shellsOf(n.z).at(-1)} elektron.`, n.z === 2 ? "Tek katman, 2 elektronla dolu (dublet)." : "Son katman 8 elektronla dolu (oktet).", "Oda koşullarında tek atomlu gaz."] })),
  draw: (_v, _s, pick = -1) => {
    const n = NOBLE[pick >= 0 ? pick : 2], sh = shellsOf(n.z);
    const els: El[] = [...bohr(0, 0, n.z, sh, sh.length - 1)];
    els.push(txt(v(2.4, 0.6), NAMES[n.z], "e", { bold: true, tone: "a" }), txt(v(2.4, 0), `dağılım ${sh.join(",")}`, "e", { small: true }), txt(v(2.4, -0.5), `son katman: ${sh.at(-1)} elektron`, "e", { small: true, tone: "b" }));
    NOBLE.forEach((nn, i) => els.push(txt(v(-1.6 + i * 1.6, -2.3), NAMES[nn.z], "c", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-2.2, 2.2), " ", "c"), txt(v(5.6, -2.6), " ", "c"));
    return { els, readout: [`${NAMES[n.z]}: ${sh.join(",")}.`, "Grup numarasından değerlik elektronu çıkarırken He istisnasını kontrol et."] };
  },
};

// 6 · 2026 TYT Fen 14: metal alt sınıfı.
const METALS = [
  { a: "Ca + HCl → H₂ açığa çıkar", b: "aktif metal", tone: "b" as Tone, detail: ["Asitten hidrojeni açığa çıkarır: aktif metal.", "Kanıt verilen tepkimedir; konum tek başına yetmez."] },
  { a: "Au + HNO₃ → tepkime yok", b: "soy metal", tone: "muted" as Tone, detail: ["Verilen koşulda tepkime vermez: soy metal.", "Soy metal ≠ soy gaz: Au bir metaldir, 18. grupta değildir."] },
  { a: "Al + HCl ve Al + NaOH → H₂", b: "amfoter metal", tone: "warn" as Tone, detail: ["Hem asit hem kuvvetli bazla tepkime verir: amfoter.", "Ayırt edici kanıt: iki tür çözeltiyle tepkime."] },
];
const subclass: FigureDef = {
  caption:
    "2026 TYT Fen 14 (resmî kitapçık; cevap D): üç metalin hepsi metaldir, soru alt sınıfı soruyor. Bir tepkime satırına tıkla: kanıttan sınıf etiketine geçiş açılır. Sıra: aktif (Ca), soy (Au), amfoter (Al). “Metal mi ametal mi?”, “hangi grup?” ve “hangi alt sınıf?” farklı sorulardır.",
  alt: "Üç satır: Ca asitle hidrojen verir, Au nitrik asitle tepkime vermez, Al asit ve bazla hidrojen verir; sağda alt sınıf.",
  picks: METALS.map((m) => ({ label: m.b, title: `${m.a} → ${m.b}`, detail: m.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    METALS.forEach((r, i) => {
      const y = -i * 1.3, sel = pick === i;
      els.push(rect(-0.32, -0.16, y - 0.85, y + 0.25, r.tone));
      els.push(txt(v(0, y), r.a, "e", { small: true, bold: true, tone: sel ? "a" : "ink" }), txt(v(0.3, y - 0.58), `→ ${r.b}`, "e", { small: true, bold: true, tone: sel ? "a" : "c", pick: i }));
    });
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(6.0, -3.6), " ", "c"));
    return { els, readout: [pick >= 0 ? METALS[pick].detail[0] : "Bir satıra tıkla.", "Önce her metalin gözlenen tepkimesini yaz, sonra etiketi koy, en son seçenek satırını aynı sırayla karşılaştır."] };
  },
};

export const chemistryFiguresClasses: Record<string, Record<string, FigureDef>> = {
  "elementlerin-siniflandirilmasi": {
    "Sınıfı konum ve kanıtla bul": map,
    "Metallerde hareketli elektronları düşün": sea,
    "Ametallerin hâli ve yapısı değişebilir": nonmetals,
    "Yarı metaller ve kaynağa bağlı sınırlar": conductivity,
    "Soy gazlarda grup ile elektron sayısını ayır": noble,
    "Grup, sınıf ve metal alt sınıfını karıştırma": subclass,
  },
};
