import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "../sectionFigures/figureKit";
import type { FoundationLesson } from "./types";

/*
 * TYT Türkçe, Coğrafya, Tarih, Felsefe ve Din Kültürü · Temel İnşa ön
 * dersleri. Örnek metinler ve sorular özgündür; dönem sınırları Türkiye
 * ders kitaplarındaki yaygın sınıflamadır, kesin tarih çizgisi değildir.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });

/** İki satırlı seçilebilir liste: sol renk çubuğu, ad, kısa açıklama. */
function rows(list: { a: string; b: string; tone: Tone }[], pick: number, gap = 1.3): El[] {
  const els: El[] = [];
  list.forEach((r, i) => {
    const y = -i * gap, sel = pick === i;
    els.push(rect(-0.32, -0.16, y - 0.85, y + 0.25, r.tone));
    els.push(txt(v(0, y), r.a, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
    els.push(txt(v(0.3, y - 0.58), r.b, "e", { small: true, tone: sel ? "a" : "c" }));
  });
  return els;
}

// ─── Türkçe 1 · Sözcük, cümle, paragraf ──────────────────────────────────────
const BUILD = ["Ali", "Ali kitabı", "Ali kitabı dün", "Ali kitabı dün okudu."];
const sentence: FigureDef = {
  caption:
    "Cümle, bir yargı bildiren söz dizisidir; yargıyı taşıyan sözcüğe yüklem denir. Adımları ilerlet: sözcükler eklendikçe anlam genişler, ama yüklem (okudu) gelene kadar cümle tamamlanmaz. Türkçede yüklem genellikle sondadır.",
  alt: "Alt alta dört satır: Ali; Ali kitabı; Ali kitabı dün; Ali kitabı dün okudu. Son satırda yüklem vurgulu.",
  steps: ["Sözcük", "Söz öbeği", "Eksik yargı", "Cümle"],
  draw: (_v, step) => {
    const els: El[] = [];
    for (let i = 0; i <= step; i++) {
      const done = i === 3;
      els.push(txt(v(0, -i * 0.75), BUILD[i], "e", { bold: i === step, tone: i === step ? (done ? "a" : "ink") : "muted" }));
    }
    if (step === 3) els.push(txt(v(4.2, -2.25), "← yüklem: okudu", "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.3, 0.5), " ", "c"), txt(v(7.4, -2.6), " ", "c"));
    return { els, readout: [step < 3 ? "Henüz bir yargı yok: ne oldu?" : "Yargı var: okuma işi yapılmış. Cümle tamam.", "Yükleme sorulan sorularla diğer ögeler bulunur: Kim okudu? Ali (özne)."] };
  },
};

const PARA = [
  { a: "Giriş cümlesi", b: "Okuma alışkanlığı erken yaşta kazanılır.", tone: "b" as Tone, detail: ["Konuyu ortaya koyar; bağlaçla (ama, çünkü) başlamaz.", "Kendinden önce bir cümle gerektirmez."] },
  { a: "Gelişme cümlesi", b: "Çünkü çocuk evde gördüğünü taklit eder.", tone: "c" as Tone, detail: ["Giriş cümlesini açıklar, örnekler, gerekçelendirir.", "“Çünkü” önceki cümleye bağlandığını gösterir."] },
  { a: "Gelişme cümlesi", b: "Kitap okuyan ailede çocuk da kitaba uzanır.", tone: "c" as Tone, detail: ["Örnek vererek düşünceyi destekler."] },
  { a: "Sonuç cümlesi", b: "Bu yüzden okuma evde başlar.", tone: "warn" as Tone, detail: ["Düşünceyi bağlar; “bu yüzden, kısacası” gibi sözlerle gelir.", "Ana düşünce çoğu zaman giriş ya da sonuçtadır."] },
];
const paragraph: FigureDef = {
  caption:
    "Paragraf, tek bir düşünce etrafında birbirine bağlanan cümlelerdir. Bir cümleye tıkla: paragraftaki görevi ve onu ele veren bağlantı sözcüğü açılır.",
  alt: "Dört cümlelik özgün paragraf; her cümlenin solunda görevine göre renk çubuğu.",
  picks: PARA.map((p, i) => ({ label: `${i + 1}. ${p.a}`, title: `${i + 1}. cümle: ${p.a}`, detail: p.detail })),
  draw: (_v, _s, pick = -1) => {
    const els = rows(PARA.map((p, i) => ({ a: `${i + 1}. ${p.a}`, b: p.b, tone: p.tone })), pick);
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(6.6, -4.8), " ", "c"));
    return { els, readout: [pick >= 0 ? PARA[pick].detail[0] : "Bir cümleye tıkla.", "Bağlantı sözcükleri cümlelerin sırasını ve görevini ele verir."] };
  },
};

// ─── Türkçe 2 · Kök, ek ve aktif okuma ───────────────────────────────────────
const PARTS = [
  { add: "göz", what: "kök: anlamlı en küçük parça" },
  { add: "-lük", what: "yapım eki: yeni sözcük (gözlük)" },
  { add: "-çü", what: "yapım eki: yeni sözcük (gözlükçü)" },
  { add: "-ler", what: "çekim eki: çoğul, sözcük aynı" },
  { add: "-den", what: "çekim eki: ayrılma hâli" },
];
const roots: FigureDef = {
  caption:
    "Sözcük bir kök ve ona eklenen eklerden oluşur. Adımları ilerlet: yapım eki yeni bir sözcük (yeni anlam) yapar, çekim eki sözcüğü cümleye bağlar ama anlamını değiştirmez. Yapım ekleri çekim eklerinden önce gelir.",
  alt: "“gözlükçülerden” sözcüğü parça parça kuruluyor; her parçanın altında kök, yapım eki ya da çekim eki açıklaması.",
  steps: ["Kök", "1. yapım eki", "2. yapım eki", "1. çekim eki", "2. çekim eki"],
  draw: (_v, step) => {
    const els: El[] = [];
    let x = 0;
    PARTS.slice(0, step + 1).forEach((p, i) => {
      const w = 0.32 * p.add.replace("-", "").length + 0.4;
      els.push(rect(x, x + w, -0.3, 0.3, i === 0 ? "b" : i < 3 ? "c" : "warn"), txt(v(x + w / 2, 0), p.add.replace("-", ""), "c", { bold: true }));
      x += w + 0.1;
    });
    els.push(txt(v(0, -0.9), PARTS[step].what, "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.3, 0.7), " ", "c"), txt(v(6.6, -1.3), " ", "c"));
    return { els, readout: [`${PARTS[step].add}: ${PARTS[step].what}.`, "Kök ve gövde: gözlükçü bir gövdedir (kök + yapım ekleri); çekim ekleri gövdeye eklenir."] };
  },
};

const MARKS = [
  { a: "Anahtar sözcük: “alışkanlık”", b: "Metinde üç kez geçiyor: konu bu.", tone: "b" as Tone, detail: ["Tekrar eden sözcük konuyu ele verir.", "Konu bir sözcük ya da sözcük öbeğidir; ana düşünce bir yargıdır."] },
  { a: "Dönüş sözcüğü: “ama”", b: "Sonrası yazarın asıl vurgusu.", tone: "warn" as Tone, detail: ["“Ama, fakat, ancak” düşüncenin yön değiştirdiğini gösterir.", "Ana düşünce çoğu zaman dönüş sözcüğünden sonra gelir."] },
  { a: "Sav cümlesi", b: "“Alışkanlık iradeden güçlüdür.”", tone: "c" as Tone, detail: ["Yazarın kanıtlamaya çalıştığı yargı.", "Örnekler bu yargıyı desteklemek için verilir."] },
  { a: "Örnek", b: "“Sabah koşusu üç haftada otomatikleşti.”", tone: "muted" as Tone, detail: ["Örnek ana düşünce değildir; onu destekler.", "Soruda örneği seçenek olarak görürsen tuzak olabilir."] },
];
const active: FigureDef = {
  caption:
    "Aktif okuma: okurken metnin üzerine iz bırakmak. Bir işarete tıkla: neyi aradığın ve soruda nasıl işe yaradığı açılır. Önce soru kökünü oku, sonra metinde bu dört izi bul.",
  alt: "Dört satırlık işaretleme rehberi: anahtar sözcük, dönüş sözcüğü, sav cümlesi, örnek.",
  picks: MARKS.map((m) => ({ label: m.a, title: m.a, detail: m.detail })),
  draw: (_v, _s, pick = -1) => {
    const els = rows(MARKS, pick);
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(6.0, -4.8), " ", "c"));
    return { els, readout: [pick >= 0 ? MARKS[pick].detail[0] : "Bir işarete tıkla.", "Örnek ve ayrıntı ana düşünceyi destekler; onun yerine geçmez."] };
  },
};

// ─── Coğrafya · Yön, ölçek, koordinat ────────────────────────────────────────
const DIRS = [
  { s: "K", n: "kuzey", a: 90 }, { s: "D", n: "doğu", a: 0 }, { s: "G", n: "güney", a: 270 }, { s: "B", n: "batı", a: 180 },
  { s: "KD", n: "kuzeydoğu", a: 45 }, { s: "GD", n: "güneydoğu", a: 315 }, { s: "GB", n: "güneybatı", a: 225 }, { s: "KB", n: "kuzeybatı", a: 135 },
];
const compass: FigureDef = {
  caption:
    "Dört ana yön (kuzey, doğu, güney, batı) ve aralarındaki dört ara yön. Haritada aksi belirtilmedikçe üst kuzeydir. Bir yöne tıkla: ok o yönü gösterir ve adı açılır. Güneş doğudan doğar, batıdan batar.",
  alt: "Pusula gülü: merkezden sekiz yöne çizgiler; seçilen yön oku vurgulu.",
  picks: DIRS.map((d) => ({ label: d.s, title: `${d.s}: ${d.n}`, detail: [`${d.s} = ${d.n}.`, d.s.length === 2 ? "Ara yön: iki ana yönün tam ortası." : "Ana yön."] })),
  draw: (_v, _s, pick = -1) => {
    const R = 1.8, els: El[] = [circle(v(0, 0), R, { thin: true, tone: "muted" })];
    DIRS.forEach((d, i) => {
      const t = (d.a * Math.PI) / 180, sel = pick === i, end = v(Math.cos(t) * R, Math.sin(t) * R);
      els.push(sel ? vec(v(0, 0), end, { tone: "a", bold: true }) : seg(v(0, 0), end, { thin: true, tone: d.s.length === 1 ? "ink" : "muted" }));
      els.push(txt(v(Math.cos(t) * (R + 0.45), Math.sin(t) * (R + 0.45)), d.s, "c", { small: true, bold: sel || d.s.length === 1, tone: sel ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(-2.8, 2.8), " ", "c"), txt(v(2.8, -2.8), " ", "c"));
    return { els, readout: [pick >= 0 ? `${DIRS[pick].s} = ${DIRS[pick].n}.` : "Bir yöne tıkla.", "Kuzeyin tam karşısı güney, kuzeydoğunun tam karşısı güneybatıdır."] };
  },
};

const scaleFig: FigureDef = {
  caption:
    "Ölçek, haritadaki uzunluğun gerçekte kaç kat küçültüldüğünü söyler. 1 : 200 000 ölçekte haritadaki 1 cm gerçekte 200 000 cm = 2 km’dir. Haritadaki uzunluğu değiştir ve gerçek uzaklığı izle.",
  alt: "Ölçek çubuğu ve iki şehir noktası; aralarındaki harita uzunluğu ve gerçek uzaklık.",
  param: { label: "Haritadaki uzunluk", min: 1, max: 8, step: 1, init: 3, unit: " cm" },
  draw: (cm) => {
    const k = 0.7;
    const els: El[] = [ball(v(0, 0), 0.12, "b"), ball(v(cm * k, 0), 0.12, "b"), seg(v(0, 0), v(cm * k, 0), { tone: "a", bold: true })];
    els.push(txt(v(0, 0.4), "A", "c", { small: true, bold: true }), txt(v(cm * k, 0.4), "B", "c", { small: true, bold: true }));
    for (let i = 0; i <= 8; i++) els.push(seg(v(i * k, -0.9), v(i * k, -0.75), { thin: true }));
    els.push(seg(v(0, -0.9), v(8 * k, -0.9), { thin: true }), txt(v(0, -1.25), "0", "c", { small: true, tone: "muted" }), txt(v(8 * k, -1.25), "8 cm", "c", { small: true, tone: "muted" }));
    els.push(txt(v(0, -1.9), `${cm} cm × 200 000 = ${cm * 200000} cm = ${cm * 2} km`, "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.4, 0.8), " ", "c"), txt(v(6.2, -2.2), " ", "c"));
    return { els, readout: [`Gerçek uzaklık = ${cm} cm × 200 000 = ${cm * 2} km.`, "Payda büyüdükçe ölçek küçülür: 1 : 1 000 000 daha küçük ölçekli, daha geniş alan gösterir."] };
  },
};

const PTS = [
  { label: "A", lat: 40, lon: 30, detail: ["A: 40° kuzey enlemi, 30° doğu boylamı.", "Önce enlem (yatay çizgi), sonra boylam (dikey çizgi) yazılır."] },
  { label: "B", lat: -20, lon: 60, detail: ["B: 20° güney enlemi, 60° doğu boylamı.", "Ekvatorun altı güney, başlangıç meridyeninin sağı doğu."] },
  { label: "C", lat: 20, lon: -40, detail: ["C: 20° kuzey enlemi, 40° batı boylamı."] },
];
const coords: FigureDef = {
  caption:
    "Enlemler ekvatora paralel yatay çizgilerdir (0°–90° kuzey/güney); boylamlar kutuplar arasında uzanan dikey çizgilerdir (0°–180° doğu/batı). Bir noktaya tıkla: konumu enlem ve boylamla okunur.",
  alt: "Koordinat ağı: yatay enlem ve dikey boylam çizgileri, ekvator ve başlangıç meridyeni kalın; A, B, C noktaları.",
  picks: PTS.map((p) => ({ label: `Nokta ${p.label}`, title: `Nokta ${p.label}`, detail: p.detail })),
  draw: (_v, _s, pick = -1) => {
    const kx = 0.03, ky = 0.03, els: El[] = [];
    for (let lat = -60; lat <= 60; lat += 20) els.push(seg(v(-90 * kx, lat * ky), v(90 * kx, lat * ky), { thin: true, tone: lat === 0 ? "b" : "muted", bold: lat === 0 }));
    for (let lon = -80; lon <= 80; lon += 20) els.push(seg(v(lon * kx, -60 * ky), v(lon * kx, 60 * ky), { thin: true, tone: lon === 0 ? "b" : "muted", bold: lon === 0 }));
    els.push(txt(v(90 * kx + 0.1, 0), "ekvator 0°", "e", { small: true, tone: "b" }), txt(v(0, 60 * ky + 0.3), "0° meridyeni", "c", { small: true, tone: "b" }));
    PTS.forEach((p, i) => {
      const sel = pick === i;
      els.push(ball(v(p.lon * kx, p.lat * ky), 0.12, sel ? "a" : "c"), txt(v(p.lon * kx + 0.25, p.lat * ky + 0.25), p.label, "c", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(-2.9, 2.3), " ", "c"), txt(v(4.6, -2.0), " ", "c"));
    return { els, readout: [pick >= 0 ? PTS[pick].detail[0] : "Bir noktaya tıkla.", "Aynı enlemdeki yerler ekvatora eşit uzaklıktadır; aynı boylamdakiler aynı yerel saati paylaşır."] };
  },
};

// ─── Tarih · Yüzyıl, çağ, MÖ/MS ──────────────────────────────────────────────
const century = (y: number) => (y > 0 ? Math.ceil(y / 100) : Math.ceil(-y / 100));
const centuryFig: FigureDef = {
  caption:
    "Yüzyıl, 100 yıllık dilimdir. MS 1–100 birinci yüzyıl, 101–200 ikinci yüzyıl… Yılı 100’e bölüp yukarı yuvarla: 1453 → 14,53 → 15. yüzyıl. MÖ yıllar Hz. İsa’nın doğumundan geriye sayılır ve “0 yılı” yoktur. Yılı değiştir.",
  alt: "MÖ 500’den MS 2000’e zaman doğrusu; seçilen yıl işaretli, üstünde yüzyılı.",
  param: { label: "Yıl", min: -500, max: 2000, step: 50, init: 1450, unit: "", plain: true },
  draw: (y0) => {
    const y = y0 === 0 ? 1 : y0;
    const X = (yr: number) => (yr + 500) * 0.0026;
    const els: El[] = [vec(v(X(-500) - 0.1, 0), v(X(2000) + 0.3, 0), { thin: true })];
    for (const t of [-500, 0, 500, 1000, 1500, 2000]) els.push(seg(v(X(t), -0.1), v(X(t), 0.1), { thin: true }), txt(v(X(t), -0.4), t < 0 ? `MÖ ${-t}` : t === 0 ? "MÖ/MS" : `${t}`, "c", { small: true, tone: "muted" }));
    els.push(ball(v(X(y), 0), 0.12, "a"), txt(v(X(y), 0.45), `${y < 0 ? "MÖ " + -y : "MS " + y} → ${y < 0 ? "MÖ " : ""}${century(y)}. yüzyıl`, "c", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.6, 1.0), " ", "c"), txt(v(7.0, -0.7), " ", "c"));
    return { els, readout: [`${y < 0 ? "MÖ " + -y : "MS " + y}: ${y < 0 ? "MÖ " : ""}${century(y)}. yüzyıl.`, "Tam yüzlerde dikkat: 1900, 19. yüzyılın son yılıdır; 1901 20. yüzyılın ilk yılıdır."] };
  },
};

const AGES = [
  { label: "İlk Çağ", from: -3200, to: 476, detail: ["Yazının bulunuşu (yaklaşık MÖ 3200) ile Batı Roma’nın yıkılışı (476) arası.", "Yazıdan önceki döneme tarih öncesi denir."] },
  { label: "Orta Çağ", from: 476, to: 1453, detail: ["476 – İstanbul’un fethi (1453).", "Bazı kaynaklar bitişi Amerika’ya ulaşılmasıyla (1492) verir."] },
  { label: "Yeni Çağ", from: 1453, to: 1789, detail: ["1453 – Fransız İhtilali (1789).", "Coğrafi keşifler, Rönesans ve Reform bu dönemdedir."] },
  { label: "Yakın Çağ", from: 1789, to: 2000, detail: ["1789’dan günümüze (ders kitaplarında ayrıca “çağdaş dönem” de ayrılır).", "Sanayi İnkılabı ve ulus devletler."] },
];
const ages: FigureDef = {
  caption:
    "Tarihi incelemeyi kolaylaştırmak için büyük olaylar sınır kabul edilerek çağlar ayrılır. Bir çağa tıkla: başlangıç ve bitiş olayı açılır. Sınırlar bir anlaşmadır; değişim bir günde olmaz.",
  alt: "Eşit genişlikte dört renkli dilim: İlk Çağ, Orta Çağ, Yeni Çağ, Yakın Çağ; sınır yılları ve süreleri.",
  picks: AGES.map((a) => ({ label: a.label, title: a.label, detail: a.detail })),
  draw: (_v, _s, pick = -1) => {
    // Dilimler eşit genişlikte: ölçekli değil (İlk Çağ yaklaşık 3700 yıl, Yeni Çağ 336 yıl).
    const W = 1.7, tones: Tone[] = ["b", "c", "warn", "a"];
    const els: El[] = [];
    AGES.forEach((a, i) => {
      const sel = pick === i;
      els.push(rect(i * W, (i + 1) * W - 0.06, 0, sel ? 0.7 : 0.5, tones[i]), txt(v(i * W + W / 2, -0.35), a.label, "c", { small: true, bold: sel, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(i * W + W / 2, -0.85), ["≈3700 yıl", "977 yıl", "336 yıl", "1789’dan beri"][i], "c", { small: true, tone: "muted" }));
    });
    ["MÖ 3200", "476", "1453", "1789"].forEach((t, i) => els.push(txt(v(i * W, 1.05), t, "c", { small: true, tone: "muted" })));
    els.push(txt(v(2 * W, 1.6), "dilimler eşit çizildi, süreleri farklı", "c", { small: true, tone: "muted" }));
    els.push(txt(v(-0.6, 1.9), " ", "c"), txt(v(4 * W + 0.4, -1.2), " ", "c"));
    return { els, readout: [pick >= 0 ? AGES[pick].detail[0] : "Bir çağa tıkla.", "İlk Çağ en uzun dilimdir: yaklaşık 3700 yıl."] };
  },
};

// ─── Felsefe · Argüman okuma ─────────────────────────────────────────────────
const ARG = ["Öncül 1", "Öncül 2", "Sonuç", "Sına"];
const argument: FigureDef = {
  caption:
    "Argüman, gerekçeler (öncüller) ve onlardan çıkarılan bir yargıdan (sonuç) oluşur. Adımları ilerlet: öncüller sırayla gelir, sonuç onlardan çıkar; son adımda öncüllerden birine karşı örnek aranır. Öncül yanlışsa sonuç güvence kaybeder.",
  alt: "Üst üste iki öncül kutusu, aşağı ok, sonuç kutusu; son adımda karşı örnek notu.",
  steps: ARG,
  draw: (_v, step) => {
    const box = (y: number, a: string, b: string, tone: Tone, on: boolean): El[] => [rect(-0.32, -0.16, y - 0.85, y + 0.25, on ? tone : "muted"), txt(v(0, y), a, "e", { small: true, bold: true, tone: on ? "ink" : "muted" }), txt(v(0.3, y - 0.58), on ? b : "?", "e", { small: true, tone: on ? "c" : "muted" })];
    const els: El[] = [
      ...box(0, "Öncül 1", "Bütün kuşlar uçar.", "b", step >= 0),
      ...box(-1.3, "Öncül 2", "Penguen bir kuştur.", "b", step >= 1),
      ...box(-2.6, "Sonuç (bu yüzden)", "Penguen uçar.", "a", step >= 2),
    ];
    if (step >= 3) els.push(...box(-3.9, "Karşı örnek", "Penguen uçamaz: Öncül 1 yanlış.", "warn", true));
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(5.6, -4.8), " ", "c"));
    return { els, readout: [step < 2 ? "Öncül: sonucu desteklemek için verilen gerekçe." : step === 2 ? "Biçim doğru: öncüller doğru olsaydı sonuç da doğru olurdu." : "Tek karşı örnek “bütün” diyen öncülü çürütür; sonuç artık güvenilir değil.", "Sonucu “bu yüzden, demek ki”, öncülü “çünkü” gibi sözler ele verir."] };
  },
};

const MARKERS = [
  { a: "“çünkü, zira”", b: "ardından öncül (gerekçe) gelir", tone: "b" as Tone, detail: ["Yazar bir yargıyı neye dayandırdığını söylüyor."] },
  { a: "“bu yüzden, demek ki”", b: "ardından sonuç gelir", tone: "a" as Tone, detail: ["Sonuç, öncüllerden çıkarılan yargıdır.", "Paragrafın ana düşüncesi çoğu zaman bu cümlededir."] },
  { a: "“ama, oysa”", b: "karşı görüş ya da itiraz", tone: "warn" as Tone, detail: ["Düşünce yön değiştiriyor: kimin görüşü olduğuna dikkat et."] },
  { a: "“örneğin”", b: "öncülü somutlaştıran örnek", tone: "muted" as Tone, detail: ["Örnek kanıt destekler ama tek başına genel yargıyı kanıtlamaz."] },
];
const markers: FigureDef = {
  caption: "Felsefe metinlerinde bağlantı sözcükleri argümanın haritasıdır. Bir sözcüğe tıkla: ardından neyin geldiği açılır.",
  alt: "Dört satır: çünkü, bu yüzden, ama, örneğin; her birinin argümandaki görevi.",
  picks: MARKERS.map((m) => ({ label: m.a, title: m.a, detail: m.detail })),
  draw: (_v, _s, pick = -1) => {
    const els = rows(MARKERS, pick);
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(5.6, -4.8), " ", "c"));
    return { els, readout: [pick >= 0 ? MARKERS[pick].detail[0] : "Bir sözcüğe tıkla.", "Önce sonucu bul, sonra onu destekleyen öncülleri."] };
  },
};

// ─── Din Kültürü · Temel kavram haritası ─────────────────────────────────────
const CONCEPTS = [
  { label: "Vahiy", x: 0, y: 1.6, detail: ["Allah’ın peygamberlerine bildirdiği ilahi mesaj.", "Kur’an, Hz. Muhammed’e indirilen vahiydir."] },
  { label: "Peygamber", x: 3.2, y: 1.6, detail: ["Vahyi alıp insanlara bildiren ve yaşayarak örnek olan kişi."] },
  { label: "İman", x: 0, y: 0, detail: ["Ders kitabı tanımı: Allah’ın varlığına, birliğine ve peygamberin O’ndan getirdiklerine kalben inanıp dille ikrar etmek.", "İnancın temelidir."] },
  { label: "İbadet", x: 3.2, y: 0, detail: ["Allah’a saygı ve bağlılığı gösteren, O’nun rızası gözetilerek yapılan davranışlar: namaz, oruç, zekât, hac, dua."] },
  { label: "Ahlak", x: 1.6, y: -1.6, detail: ["İyi davranışların alışkanlık hâline gelmesi: doğruluk, adalet, merhamet.", "İman ve ibadetin davranışa yansıması olarak anlatılır."] },
];
const LINKS: [number, number, string][] = [[0, 1, "iletilir"], [0, 2, "inanılır"], [2, 3, "uygulanır"], [2, 4, "davranışa yansır"], [3, 4, "davranışa yansır"]];
const conceptMap: FigureDef = {
  caption:
    "Din Kültürü sorularında temel kavramlar birbirine bağlıdır. Bir kavrama tıkla: ders kitabındaki tanımı ve diğer kavramlarla ilişkisi açılır. Bu harita bir ders özetidir; kavramların bütün yorumlarını kapsamaz.",
  alt: "Kavram haritası: vahiy, peygamber, iman, ibadet, ahlak kutuları ve aralarında etiketli oklar.",
  picks: CONCEPTS.map((c) => ({ label: c.label, title: c.label, detail: c.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    for (const [a, b, l] of LINKS) {
      const A = CONCEPTS[a], B = CONCEPTS[b];
      const dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
      const pad = Math.abs(uy) > 0.5 ? 0.42 : 0.95;
      els.push(vec(v(A.x + ux * pad, A.y + uy * pad), v(B.x - ux * pad, B.y - uy * pad), { thin: true, tone: "muted" }));
      if (a === 0 && b === 1) els.push(txt(v((A.x + B.x) / 2, A.y + 0.3), l, "c", { small: true, tone: "muted" }));
    }
    CONCEPTS.forEach((c, i) => {
      const sel = pick === i;
      els.push(rect(c.x - 0.85, c.x + 0.85, c.y - 0.3, c.y + 0.3, sel ? "a" : "b"), txt(v(c.x, c.y), c.label, "c", { small: true, bold: true, pick: i }));
    });
    els.push(txt(v(-1.2, 2.3), " ", "c"), txt(v(4.4, -2.2), " ", "c"));
    return { els, readout: [pick >= 0 ? CONCEPTS[pick].detail[0] : "Bir kavrama tıkla.", "Kaynak (vahiy) → inanç (iman) → uygulama (ibadet) → davranış (ahlak)."] };
  },
};

const CTX = [
  { a: "“Söz verdiğinde tutar, kimseyi aldatmaz.”", b: "ahlak: davranış ve alışkanlık", tone: "c" as Tone, detail: ["Doğruluk ve güvenilirlik ahlakî tutumlardır."] },
  { a: "“Ramazan’da oruç tutar.”", b: "ibadet: Allah rızası için yapılan uygulama", tone: "b" as Tone, detail: ["Oruç İslam’ın beş temel ibadetinden biridir."] },
  { a: "“Allah’ın bir olduğuna inanır.”", b: "iman: kalpteki inanç", tone: "a" as Tone, detail: ["Tevhit inancı imanın temelidir."] },
];
const context: FigureDef = {
  caption: "Soru metnindeki davranışı doğru kavrama bağla. Bir cümleye tıkla: hangi kavrama örnek olduğu ve gerekçesi açılır.",
  alt: "Üç cümle ve her birinin bağlı olduğu kavram: ahlak, ibadet, iman.",
  picks: CTX.map((c) => ({ label: c.b.split(":")[0], title: `${c.a} → ${c.b.split(":")[0]}`, detail: c.detail })),
  draw: (_v, _s, pick = -1) => {
    const els = rows(CTX, pick);
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(6.2, -3.4), " ", "c"));
    return { els, readout: [pick >= 0 ? CTX[pick].detail[0] : "Bir cümleye tıkla.", "Önce eylemin türünü sor: inanç mı, ibadet mi, davranış mı?"] };
  },
};

export const verbalFoundations: FoundationLesson[] = [
  {
    id: "temel-tr-sozcuk-cumle-paragraf",
    subjectId: "tyt-turkce",
    title: "Sözcük, cümle ve paragraf",
    minutes: 15,
    prepares: ["cumlenin-ogeleri", "paragrafa-giris", "paragraf"],
    goal: "Sözcükten cümleye, cümleden paragrafa yapıyı görmek; yüklemi ve paragraftaki cümle görevlerini tanımak.",
    pages: [
      {
        title: "Cümle bir yargıdır",
        paragraphs: ["Sözcük anlamlı ses birliğidir. Sözcükler bir araya gelip bir yargı (iş, oluş, durum) bildirdiğinde cümle olur. Yargıyı taşıyan sözcük yüklemdir; Türkçede genellikle sondadır."],
        terms: [["Yüklem", "Cümlede işi, oluşu ya da durumu bildiren temel öge."], ["Özne", "Yüklemin bildirdiği işi yapan ya da durumda olan."]],
        figure: sentence,
        predict: { question: "“Sabah erkenden okula” bir cümle midir?", answer: "Hayır: yüklem yok (ne oldu? gitti mi, geldi mi?)." },
      },
      {
        title: "Paragraf bir düşüncedir",
        paragraphs: ["Paragraf, tek bir ana düşünce etrafında birleşen cümlelerdir. Giriş cümlesi konuyu açar, gelişme cümleleri açıklar ve örnekler, sonuç cümlesi bağlar. Bağlantı sözcükleri (çünkü, bu yüzden, ama) cümleler arasındaki ilişkiyi gösterir."],
        figure: paragraph,
      },
    ],
    examples: [
      { title: "Yüklemi bul", given: "“Akşamları parkta uzun yürüyüşler yaparız.”", steps: ["Hangi sözcük bir iş bildiriyor ve çekimli?", "“yaparız”: yapma işi, biz kişisi."], answer: "Yüklem: yaparız", check: "Yüklemi atınca yargı kalmaz: “Akşamları parkta uzun yürüyüşler” ✓." },
      { title: "Giriş cümlesi", given: "Hangisi paragrafa giriş olamaz: (I) “Kitaplar zamanı aşar.” (II) “Bu yüzden onları korumalıyız.”", steps: ["II “bu yüzden” ile başlıyor: önceki bir cümleye bağlı.", "Giriş cümlesi kendinden önce cümle gerektirmez."], answer: "II", check: "II sonuç cümlesine uygundur ✓." },
    ],
    checks: [
      { prompt: "“Kardeşim dün akşam kitabını bitirdi.” cümlesinin yüklemi hangisidir?", options: ["Kardeşim", "dün akşam", "kitabını", "bitirdi", "akşam"], answer: 3, explain: "Yargıyı (bitirme işini) bildiren çekimli sözcük: bitirdi.", reasons: ["Bu özne.", "Zarf tümleci.", "Belirtili nesne.", "Doğru.", "Zaman bildiren sözcüğün parçası."] },
      { prompt: "Hangisi bir paragrafın giriş cümlesi olmaya en uygundur?", options: ["Bu yüzden erken yatmalıyız.", "Çünkü beyin uykuda dinlenir.", "Uyku, öğrenmenin görünmeyen yarısıdır.", "Ama bunu çoğu kişi bilmez.", "Örneğin sınavdan önceki gece…"], answer: 2, explain: "Kendi başına anlamlı, konuyu açan, bağlaçla başlamayan cümle.", reasons: ["“Bu yüzden” önceki cümleye bağlıdır.", "“Çünkü” bir gerekçedir.", "Doğru.", "“Ama” bir karşıtlık bağlar.", "“Örneğin” bir örnek sunar."] },
      { prompt: "Paragrafta “bu yüzden” ile başlayan cümle çoğunlukla hangi görevi üstlenir?", options: ["Giriş", "Örnek", "Sonuç", "Karşı görüş", "Tanım"], answer: 2, explain: "Önceki cümlelerden çıkarılan yargıyı bağlar: sonuç.", reasons: ["Giriş bağlaçla başlamaz.", "Örnek “örneğin” ile gelir.", "Doğru.", "Karşı görüş “ama, oysa” ile gelir.", "Tanım “…dır/dir” yapısıyla bir kavramı açıklar."] },
    ],
  },
  {
    id: "temel-tr-kok-ek-aktif-okuma",
    subjectId: "tyt-turkce",
    title: "Kök, ek ve aktif okuma",
    minutes: 20,
    prepares: ["sozcukte-yapi", "paragrafta-konu", "sozcukte-anlam"],
    goal: "Sözcüğü kök ve eklerine ayırmak, yapım ve çekim ekini ayırt etmek; metni anahtar sözcük, dönüş sözcüğü ve sav cümlesiyle işaretleyerek okumak.",
    pages: [
      {
        title: "Kök ve ekler",
        paragraphs: [
          "Kök, sözcüğün anlamlı en küçük parçasıdır (göz). Yapım eki yeni bir sözcük yapar (gözlük), çekim eki sözcüğü cümleye uydurur ama anlamını değiştirmez (gözler, gözden).",
          "Sözcükte önce yapım ekleri, sonra çekim ekleri gelir. Kök ile yapım eklerinin birleşimine gövde denir.",
        ],
        terms: [["Yapım eki", "Yeni anlamlı sözcük türeten ek."], ["Çekim eki", "Çoğul, hâl, kişi gibi görev ekleyen ek."]],
        figure: roots,
        predict: { question: "“kitapçı” sözcüğündeki “-çı” yapım eki mi çekim eki mi?", answer: "Yapım eki: kitap satan kişi, yeni bir sözcük." },
      },
      {
        title: "Aktif okuma",
        paragraphs: ["Metni okurken tekrar eden anahtar sözcüğü, yön değiştiren bağlaçları (ama, fakat) ve yazarın savını işaretle. Örnekler savı destekler; sorudaki “ana düşünce” örnekte değil savdadır."],
        figure: active,
      },
    ],
    examples: [
      { title: "Ayır", given: "“yolculuklarımızda”", steps: ["Kök: yol.", "Yapım ekleri: -cu (yolcu), -luk (yolculuk).", "Çekim ekleri: -lar (çoğul), -ımız (iyelik), -da (bulunma)."], answer: "yol + cu + luk | lar + ımız + da", check: "Yapım ekleri çekimden önce ✓." },
      { title: "Dönüş sözcüğü", given: "“Çok çalışmak önemlidir ama dinlenmeden verim düşer.”", steps: ["“ama” düşüncenin yön değiştirdiğini gösterir.", "Yazarın vurgusu sonrasında: dinlenmenin önemi."], answer: "Asıl vurgu: dinlenme olmadan verim düşer", check: "“ama”dan önceki kısım kabul edilen ön bilgi ✓." },
    ],
    checks: [
      { prompt: "“gözlükçüler” sözcüğündeki “-ler” eki için hangisi doğrudur?", options: ["Kök", "Yapım eki", "Çekim eki", "Gövde", "Bağlaç"], answer: 2, explain: "Çoğul yapar, yeni sözcük türetmez: çekim eki.", reasons: ["Kök “göz”dür.", "Yeni anlam türetmiyor.", "Doğru.", "Gövde kök + yapım ekleridir.", "Bağlaç ayrı bir sözcüktür."] },
      { prompt: "Hangisinde yapım eki vardır?", options: ["evler", "evde", "evim", "evci", "evden"], answer: 3, explain: "“-ci” yeni bir sözcük türetir: evci (evde vakit geçirmeyi seven).", reasons: ["Çoğul eki: çekim.", "Bulunma hâli: çekim.", "İyelik: çekim.", "Doğru.", "Ayrılma hâli: çekim."] },
      { prompt: "Bir paragrafta “ama” sözcüğünden sonra gelen cümle çoğu zaman neyi taşır?", options: ["Örneği", "Yazarın asıl vurgusunu", "Tanımı", "Konunun girişini", "Önemsiz ayrıntıyı"], answer: 1, explain: "Dönüş sözcüğü düşüncenin yönünü değiştirir; vurgu sonrasındadır.", reasons: ["Örnek “örneğin” ile gelir.", "Doğru.", "Tanım bir kavramı açıklar.", "Giriş paragrafın başındadır.", "Vurgu genellikle önemli olandadır."] },
    ],
  },
  {
    id: "temel-cog-yon-olcek-koordinat",
    subjectId: "tyt-cografya",
    title: "Yönler, harita ölçeği ve koordinat okuma",
    minutes: 20,
    prepares: ["harita-bilgisi", "cografi-konum", "yerel-saat"],
    goal: "Ana ve ara yönleri tanımak, ölçekle haritadan gerçek uzaklık hesaplamak, bir noktayı enlem ve boylamla okumak.",
    pages: [
      {
        title: "Yönler",
        paragraphs: ["Dört ana yön kuzey, doğu, güney ve batıdır; aralarındaki dört ara yön kuzeydoğu, güneydoğu, güneybatı ve kuzeybatıdır. Haritalarda aksi belirtilmedikçe üst taraf kuzeydir."],
        figure: compass,
      },
      {
        title: "Ölçek",
        paragraphs: [
          "Harita, gerçeğin küçültülmüş çizimidir. 1 : 200 000 ölçeği, haritadaki 1 birimin gerçekte 200 000 birim olduğunu söyler: 1 cm → 200 000 cm = 2 km.",
          "Paydası küçük ölçek büyük ölçektir: dar alanı ayrıntılı gösterir. Paydası büyük ölçek küçük ölçektir: geniş alanı az ayrıntıyla gösterir.",
        ],
        terms: [["Kesir ölçek", "1 : 200 000 gibi oranla yazılan ölçek."]],
        figure: scaleFig,
        predict: { question: "1 : 100 000 ölçekli haritada 5 cm gerçekte kaç km?", answer: "5 km: 5 × 100 000 cm = 500 000 cm." },
      },
      {
        title: "Enlem ve boylam",
        paragraphs: ["Enlem, ekvatordan kuzeye ya da güneye açısal uzaklıktır (0°–90°). Boylam, başlangıç meridyeninden doğuya ya da batıya açısal uzaklıktır (0°–180°). Bir nokta “40° K, 30° D” biçiminde önce enlem, sonra boylamla yazılır."],
        figure: coords,
      },
    ],
    examples: [
      { title: "Ölçekten uzaklık", given: "1 : 500 000 ölçekli haritada iki şehir arası 4 cm.", steps: ["Gerçek = 4 × 500 000 = 2 000 000 cm.", "1 km = 100 000 cm.", "2 000 000 ÷ 100 000 = 20."], answer: "20 km", check: "Kısa yol: payda 500 000 cm = 5 km; 4 × 5 = 20 ✓." },
      { title: "Yön", given: "Bir yer, diğerinin tam kuzeybatısındadır. İkinci yer birinciye göre hangi yöndedir?", steps: ["Kuzeybatının tam karşısı alınır.", "Kuzey ↔ güney, batı ↔ doğu."], answer: "Güneydoğu", check: "Karşı yön iki bileşeni de tersine çevirir ✓." },
    ],
    checks: [
      { prompt: "1 : 200 000 ölçekli haritada 3 cm gerçekte kaç km’dir?", options: ["0,6", "6", "60", "600", "2"], answer: 1, explain: "3 × 200 000 = 600 000 cm = 6 km.", reasons: ["Bir basamak eksik.", "Doğru.", "cm → km dönüşümünde bir basamak fazla.", "Metre ile karıştırılmış (600 hm).", "Yalnız 1 cm’nin karşılığı alınmış."] },
      { prompt: "Kuzeydoğunun tam karşısındaki yön hangisidir?", options: ["Kuzeybatı", "Güneydoğu", "Güneybatı", "Batı", "Güney"], answer: 2, explain: "Kuzey ↔ güney, doğu ↔ batı.", reasons: ["Yalnız doğu tersine çevrilmiş.", "Yalnız kuzey tersine çevrilmiş.", "Doğru.", "Ana yön, ara yön değil.", "Ana yön, ara yön değil."] },
      { prompt: "Hangisi daha büyük ölçeklidir?", options: ["1 : 1 000 000", "1 : 500 000", "1 : 250 000", "1 : 50 000", "1 : 2 000 000"], answer: 3, explain: "Paydası en küçük olan en büyük ölçektir.", reasons: ["Payda büyük: küçük ölçek.", "Payda büyük.", "Payda daha küçük ama 50 000 daha da küçük.", "Doğru.", "En küçük ölçek."] },
    ],
  },
  {
    id: "temel-tar-yuzyil-cag",
    subjectId: "tyt-tarih",
    title: "Yüzyıl, çağ ve MÖ–MS kronolojisi",
    minutes: 15,
    prepares: ["tarih-zaman", "insanligin-ilk-donemleri", "ortacag-dunya"],
    goal: "Bir yılın hangi yüzyıla ait olduğunu bulmak, MÖ–MS arasında süre hesaplamak ve büyük çağları sınır olaylarıyla sıralamak.",
    pages: [
      {
        title: "Yılı yüzyıla çevir",
        paragraphs: [
          "Miladi takvimde yıllar Hz. İsa’nın doğumu kabul edilen yıldan sayılır: sonrası MS (milattan sonra), öncesi MÖ (milattan önce). MÖ yıllar geriye doğru büyür: MÖ 500, MÖ 100’den daha eskidir.",
          "Yüzyılı bulmak için yılı 100’e bölüp yukarı yuvarla. 1453 → 15. yüzyıl; 1900 → 19. yüzyıl.",
        ],
        terms: [["Yüzyıl (asır)", "100 yıllık dönem."], ["Milat", "Takvimin başlangıç kabul edilen olayı."]],
        figure: centuryFig,
        predict: { question: "2000 yılı hangi yüzyıla aittir?", answer: "20. yüzyıla: 1901–2000." },
      },
      {
        title: "Çağlar",
        paragraphs: ["Tarih, büyük olaylar sınır alınarak çağlara ayrılır: yazının bulunuşuyla İlk Çağ, 476’da Orta Çağ, 1453’te Yeni Çağ, 1789’da Yakın Çağ başlar. Bu sınırlar incelemeyi kolaylaştıran bir anlaşmadır."],
        figure: ages,
      },
    ],
    examples: [
      { title: "MÖ–MS arası süre", given: "MÖ 50 ile MS 30 arasında kaç yıl vardır?", steps: ["MÖ 50’den MÖ 1’e: 49 yıl.", "MÖ 1’den MS 1’e: 1 yıl (0 yılı yok).", "MS 1’den MS 30’a: 29 yıl.", "Toplam 49 + 1 + 29 = 79."], answer: "79 yıl", check: "Kısa kural: MÖ ile MS arasında farkı bulurken 50 + 30 = 80’den 1 çıkar ✓." },
      { title: "Yüzyıl", given: "MÖ 330 hangi yüzyıldır?", steps: ["330 ÷ 100 = 3,3.", "Yukarı yuvarla: 4."], answer: "MÖ 4. yüzyıl", check: "MÖ 4. yüzyıl MÖ 400–301 arasıdır ✓." },
    ],
    checks: [
      { prompt: "1453 yılı hangi yüzyıldadır?", options: ["14. yüzyıl", "15. yüzyıl", "16. yüzyıl", "13. yüzyıl", "145. yüzyıl"], answer: 1, explain: "1453 ÷ 100 = 14,53 → yukarı 15.", reasons: ["Yüzler basamağı doğrudan okunmuş.", "Doğru.", "Bir fazla.", "İki eksik.", "Bölme yapılmamış."] },
      { prompt: "Orta Çağ’ın başlangıcı olarak kabul edilen olay hangisidir?", options: ["Yazının bulunuşu", "Batı Roma’nın yıkılışı (476)", "İstanbul’un fethi (1453)", "Fransız İhtilali (1789)", "Sanayi İnkılabı"], answer: 1, explain: "476: Batı Roma İmparatorluğu’nun yıkılışı.", reasons: ["İlk Çağ’ın başlangıcı.", "Doğru.", "Yeni Çağ’ın başlangıcı.", "Yakın Çağ’ın başlangıcı.", "Yakın Çağ içinde bir süreç."] },
      { prompt: "MÖ 100 ile MS 100 arasında kaç yıl vardır?", options: ["200", "199", "0", "100", "201"], answer: 1, explain: "0 yılı olmadığı için 100 + 100 − 1 = 199.", reasons: ["0 yılı varmış gibi sayılmış.", "Doğru.", "MÖ ve MS aynı sayı sanılmış.", "Yalnız bir taraf sayılmış.", "1 eklenmiş."] },
    ],
  },
  {
    id: "temel-fel-arguman-okuma",
    subjectId: "tyt-felsefe",
    title: "Argüman okuma: öncül, sonuç, karşı örnek",
    minutes: 15,
    prepares: ["felsefe-ile-dusunme", "felsefeyi-tanima", "felsefi-okuma-ve-yazma"],
    goal: "Bir metinde sonucu ve onu destekleyen öncülleri bulmak; bağlantı sözcüklerini kullanmak ve genel bir iddiayı karşı örnekle sınamak.",
    pages: [
      {
        title: "Öncül ve sonuç",
        paragraphs: ["Felsefi metin bir iddiayı gerekçelerle savunur. Gerekçelere öncül, onlardan çıkan yargıya sonuç denir. “Bütün”, “hiçbir” gibi genel iddialar tek bir karşı örnekle çürür."],
        terms: [["Öncül", "Sonucu desteklemek için öne sürülen gerekçe."], ["Karşı örnek", "Genel bir iddiayı yanlışlayan tek durum."]],
        figure: argument,
        predict: { question: "“Bütün metaller suda batar.” iddiasını ne çürütür?", answer: "Suda yüzen tek bir metal örneği: lityumun yoğunluğu sudan küçüktür." },
      },
      {
        title: "Argümanın haritası",
        paragraphs: ["“Çünkü” sonrasında öncül, “bu yüzden” sonrasında sonuç, “ama” sonrasında itiraz gelir. Önce sonucu bul; sonra soruya göre onu destekleyen ya da zayıflatan cümleyi seç."],
        figure: markers,
      },
    ],
    examples: [
      { title: "Sonucu bul", given: "“İnsan sorgulayan bir varlıktır. Sorgulayan her varlık felsefe yapar. Demek ki insan felsefe yapar.”", steps: ["“Demek ki” sonucu gösterir.", "Önceki iki cümle öncüldür."], answer: "Sonuç: İnsan felsefe yapar.", check: "Öncüller doğruysa sonuç da doğru olur ✓." },
      { title: "Karşı örnek", given: "“Kanatları olan her hayvan uçar.”", steps: ["Kanadı olup uçamayan bir hayvan var mı?", "Devekuşu."], answer: "İddia yanlış: devekuşu karşı örnektir.", check: "Tek karşı örnek genel iddiayı çürütmeye yeter ✓." },
    ],
    checks: [
      { prompt: "“Çalışkan öğrenciler başarılı olur. Ayşe çalışkandır. O hâlde Ayşe başarılı olur.” argümanında sonuç hangisidir?", options: ["Çalışkan öğrenciler başarılı olur.", "Ayşe çalışkandır.", "Ayşe başarılı olur.", "Ayşe öğrencidir.", "Başarı çalışmaya bağlıdır."], answer: 2, explain: "“O hâlde” sonucu gösterir.", reasons: ["Birinci öncül.", "İkinci öncül.", "Doğru.", "Metinde açıkça yok.", "Birinci öncülün yeniden yazılışı."] },
      { prompt: "“Hiçbir kuş yüzemez.” iddiasını hangisi çürütür?", options: ["Kartal uçar.", "Penguen yüzer.", "Tavuk yürür.", "Balık yüzer.", "Kuşların tüyü vardır."], answer: 1, explain: "Yüzen bir kuş (penguen) tek başına karşı örnektir.", reasons: ["Uçmak yüzmekle ilgili değil.", "Doğru.", "Yürümek yüzmekle ilgili değil.", "Balık kuş değil.", "İddiayla ilgisiz."] },
      { prompt: "Bir metinde “çünkü” sözcüğünden sonra genellikle ne gelir?", options: ["Sonuç", "Gerekçe (öncül)", "Örnek", "Karşı görüş", "Soru"], answer: 1, explain: "“Çünkü” bir yargının dayanağını bildirir.", reasons: ["Sonuç “bu yüzden” ile gelir.", "Doğru.", "Örnek “örneğin” ile gelir.", "Karşı görüş “ama” ile gelir.", "Soru işaretiyle biter."] },
    ],
  },
  {
    id: "temel-din-kavram-haritasi",
    subjectId: "tyt-din",
    title: "Temel kavram haritası: vahiy, iman, ibadet, ahlak",
    minutes: 15,
    prepares: ["din-ve-islam", "bilgi-ve-inanc", "kur-anda-gecen-bazi-kavramlar"],
    goal: "Din Kültürü derslerinde sık geçen temel kavramları ders kitabındaki tanımlarıyla tanımak ve soru metnindeki davranışı doğru kavrama bağlamak.",
    pages: [
      {
        title: "Kavramlar arası ilişki",
        paragraphs: ["Vahiy, Allah’ın peygamberlerine bildirdiği mesajdır. İman inanç boyutunu, ibadet bu inancın uygulamasını, ahlak ise davranışa yansımasını anlatır. Sorularda bu kavramlar çoğu zaman birbirinden ayırt edilmek istenir."],
        terms: [["Tevhit", "Allah’ın bir olduğuna inanmak."]],
        figure: conceptMap,
      },
      {
        title: "Davranışı kavrama bağla",
        paragraphs: ["Soru metnindeki eylemin türünü sor: kalpteki bir inanç mı, Allah rızası için yapılan bir uygulama mı, yoksa insanlarla ilişkideki bir tutum mu? Cevap kavramı belirler."],
        figure: context,
        predict: { question: "“İhtiyaç sahibine yardım eder, kimseyi incitmez.” hangi kavrama örnektir?", answer: "Ahlak: insanlarla ilişkideki iyi tutum." },
      },
    ],
    examples: [
      { title: "Kavram eşle", given: "“Her gün beş vakit namaz kılar.”", steps: ["Eylem: düzenli bir uygulama.", "Allah rızası için yapılır."], answer: "İbadet", check: "Kalpteki inanç değil, uygulama ✓." },
      { title: "Kaynak", given: "Kur’an, Hz. Muhammed’e nasıl ulaşmıştır?", steps: ["Allah’ın peygamberine bildirdiği mesaja vahiy denir.", "Kur’an vahiy yoluyla indirilmiştir."], answer: "Vahiy yoluyla", check: "Peygamber vahyi alan ve bildiren kişidir ✓." },
    ],
    checks: [
      { prompt: "“Allah’ın peygamberlerine bildirdiği ilahi mesaj” hangi kavramın tanımıdır?", options: ["İbadet", "Vahiy", "Ahlak", "Tevhit", "Dua"], answer: 1, explain: "Ders kitabı tanımı: vahiy.", reasons: ["İbadet uygulamadır.", "Doğru.", "Ahlak davranıştır.", "Tevhit birlik inancıdır.", "Dua bir ibadet biçimidir."] },
      { prompt: "“Doğruluk, adalet ve merhametin alışkanlık hâline gelmesi” hangi kavramla ilgilidir?", options: ["İman", "İbadet", "Ahlak", "Vahiy", "Peygamber"], answer: 2, explain: "İyi davranışların alışkanlığa dönüşmesi ahlaktır.", reasons: ["İman kalpteki inançtır.", "İbadet Allah rızası için yapılan uygulamadır.", "Doğru.", "Vahiy ilahi mesajdır.", "Peygamber vahyi bildiren kişidir."] },
      { prompt: "Hangisi bir ibadet örneğidir?", options: ["Allah’ın bir olduğuna inanmak", "Oruç tutmak", "Sözünde durmak", "Vahyin ulaşması", "Peygamberin görevi"], answer: 1, explain: "Oruç Allah rızası için yapılan bir uygulamadır.", reasons: ["Bu iman (tevhit) inancıdır.", "Doğru.", "Bu ahlakî bir tutumdur.", "Bu vahiy kavramıdır.", "Bu peygamberlik kavramıdır."] },
    ],
  },
];
