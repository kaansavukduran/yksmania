import { poly, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Felsefe · Ahlak felsefesi. Panolar özgün öğretim örnekleridir; her öğe
 * tıklanınca gerekçe ve karıştırılan nokta açılır. Düşünür eşleşmeleri ders
 * sınıflamasıdır; bir düşünürün bütün görüşünü tek cümleye indirgemez.
 */

const rect = (x0: number, x1: number, y: number, h: number, tone: Tone, fill = true): El =>
  poly([v(x0, y + h), v(x1, y + h), v(x1, y - h), v(x0, y - h)], { fill: fill ? tone : undefined, tone, thin: true });

/** Generic two-line list board with picks. */
function board(rows: { a: string; b: string; tone?: Tone }[], pick: number, width = 6.4): El[] {
  const els: El[] = [];
  rows.forEach((r, i) => {
    const y = -i * 1.5, sel = pick === i;
    if (sel) els.push(rect(-0.1, width, y - 0.32, 0.62, "a"));
    els.push(txt(v(0, y), r.a, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
    els.push(txt(v(0.3, y - 0.62), r.b, "e", { small: true, tone: r.tone ?? "c" }));
  });
  return els;
}

// 1 · Aynı eylem, dört gerekçe.
const REASONS = [
  { a: "“Ödül alacağım.”", b: "kişisel çıkar → egoizm", detail: ["Ölçüt kişinin kendi yararıdır.", "Bunu toplam fayda diye adlandırmak ayrımı silmez.", "Kantçı ödev değil: ödeve uygun davranış, ödevden dolayı davranış değildir."] },
  { a: "“Herkesin hakkına saygı ödevimdir.”", b: "ilke/ödev → Kant", detail: ["Eylemi yöneten ilke önemlidir; sonuçtan bağımsız savunulur.", "Ödül olmasa da yapılır.", "Aynı dış davranış başka gerekçeyle başka yaklaşıma gider."] },
  { a: "“Toplam zarar azalır.”", b: "etkiler → sonuççuluk / faydacılık", detail: ["Etkilenen herkesin yarar ve zararı tartılır.", "Faydacılık sonuççuluğun toplam refahı ölçüt alan türüdür.", "Yalnız karar verenin kazancı toplam fayda değildir."] },
  { a: "“Dürüst bir karakter geliştirmek istiyorum.”", b: "alışkanlık → erdem etiği", detail: ["Tek davranıştan çok sürekli karakter ve alışkanlık.", "Aristoteles: durumun gerektirdiği ölçüyü bulmak.", "Tek seferlik doğru söylemek karakter kanıtı değildir."] },
];
const reasons: FigureDef = {
  caption:
    "Eylem sabit: kayıp kitabı sahibine iade etmek. Dört kişi aynı şeyi farklı gerekçeyle yapıyor. Bir gerekçeye tıkla: hangi yaklaşıma gittiği ve en sık karıştırılan nokta açılır. Davranışın adından değil “çünkü”den sonrasından yaklaşım seç.",
  alt: "Üstte eylem kutusu, altında dört gerekçe satırı ve her birinin ahlak yaklaşımı.",
  picks: REASONS.map((r) => ({ label: r.b.split(" → ")[1], title: `${r.a} → ${r.b.split(" → ")[1]}`, detail: r.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [txt(v(0, 1.2), "Eylem: kayıp kitabı iade etmek", "e", { small: true, bold: true, tone: "warn" })];
    els.push(...board(REASONS, pick));
    els.push(txt(v(-0.3, 1.7), " ", "c"), txt(v(6.6, -5.3), " ", "c"));
    return { els, readout: [pick >= 0 ? REASONS[pick].detail[0] : "Bir gerekçeye tıkla ya da aşağıdan seç.", "Aynı sonucu seçmek dayanakların özdeş olduğunu göstermez."] };
  },
};

// 2 · Olgudan norma köprü.
const BRIDGE = [
  { lab: "Olgu (betimleyici)", text: "“Bu okulda kopya yaygın.”", tone: "b" as Tone },
  { lab: "Eksik köprü ilke", text: "“Yaygın olan her davranışa izin verilmeli.”", tone: "warn" as Tone },
  { lab: "Norm (normatif)", text: "“Kopyaya izin verilmeli.”", tone: "a" as Tone },
];
const bridge: FigureDef = {
  caption:
    "“Böyle yapılıyor” betimleyici, “böyle yapılmalı” normatiftir. Adımlarda olgudan norma geçmek için gereken gizli köprü ilke açılır ve sonra o ilkeye bir karşı örnek verilir.",
  alt: "Üç kutu yukarıdan aşağı: olgu, köprü ilke, norm. Son adımda köprü ilkenin yanında karşı örnek.",
  steps: ["Olgu → norm?", "Köprü ilke", "Karşı örnek"],
  draw: (_v, step) => {
    const els: El[] = [];
    const rows = step === 2 ? [...BRIDGE, { lab: "Karşı örnek", text: "Yaygın haksız ayrımcılık: yaygın ama haklı değil.", tone: "warn" as Tone }] : BRIDGE;
    rows.forEach((b, i) => {
      const y = -i * 1.5, show = i !== 1 || step >= 1;
      els.push(rect(-0.32, -0.16, y - 0.3, 0.6, show ? b.tone : "muted", true));
      els.push(txt(v(0, y), b.lab, "e", { small: true, bold: true, tone: show ? "ink" : "muted" }));
      els.push(txt(v(0.3, y - 0.6), show ? b.text : "?", "e", { small: true }));
      if (i < rows.length - 1) els.push(vec(v(-0.24, y - 0.95), v(-0.24, y - 1.15), { thin: true, tone: "muted" }));
    });
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(6.4, -5.3), " ", "c"));
    return {
      els,
      readout: [
        step === 0 ? "Betimlemeden norma doğrudan geçilemez." : step === 1 ? "Geçiş için normatif bir köprü ilke gerekir; bu ilkenin kendisi de savunulmalıdır." : "Köprü ilkeye karşı örnek: yaygınlık haklılığı garanti etmez.",
        "Toplumun bir davranışı onaylaması iyi–kötü tartışmasını tek başına kapatmaz.",
      ],
    };
  },
};

// 3 · Özgürlük görüşleri.
const FREE = [
  { a: "Katı determinizm", b: "her şey önceki nedenlerle belirli; özgür irade yok", detail: ["Olayları önceki koşul ve nedenlerle açıklar.", "Ders sunumundaki katı yorum özgür iradeyi ve buna dayalı sorumluluğu reddeder.", "Bütün belirlenimci görüşler sorumluluk konusunda aynı sonuca varmaz."] },
  { a: "Fatalizm (kadercilik)", b: "ne yaparsan yap aynı sonuç", detail: ["Sonuç kişinin seçiminden ve çabasından bağımsızdır.", "Nedensellik ile çabanın etkisizliği aynı şey değildir.", "“Çalışsan da çalışmasan da aynı yazgı” = fatalist koşul."] },
  { a: "İndeterminizm", b: "eylemler bütünüyle belirlenmiş değil", detail: ["Özgür seçim imkânı öne çıkar.", "Rastlantının bulunması tek başına bilinçli özgürlük kanıtı değildir."] },
  { a: "Otodeterminizm", b: "kişi aklı ve kişiliğiyle kendini yönetir", detail: ["Akıl, eğitim ve kişilik gelişimiyle kendi davranışını yönetme.", "Çevresel etkiyi yok saymaz.", "Ahlaki özerklik anlayışıyla uyumludur."] },
];
const freedom: FigureDef = {
  caption:
    "Özgürlük tartışmasında dört görüşü gerçek koşuluyla ayır. Bir görüşe tıkla: neyi savunduğu ve hangi görüşle karıştırıldığı açılır.",
  alt: "Dört satır: katı determinizm, fatalizm, indeterminizm, otodeterminizm; her birinin kısa tanımı.",
  picks: FREE.map((f) => ({ label: f.a, title: f.a, detail: f.detail })),
  draw: (_v, _s, pick = -1) => {
    const els = board(FREE, pick);
    els.push(txt(v(-0.3, 0.5), " ", "c"), txt(v(6.6, -5.3), " ", "c"));
    return { els, readout: [pick >= 0 ? FREE[pick].detail[0] : "Bir görüşe tıkla ya da aşağıdan seç.", "Sorumluluk için bilgi, niyet, seçenekler ve zorlama koşulunu ayrıca oku."] };
  },
};

// 4 · Düşünür ve ölçüt.
const THINKERS = [
  { a: "Sokrates", b: "bilgi → erdem", detail: ["İyiyi bilen iyi davranır iddiası.", "2025 TYT Sosyal 13: kötüyü bilip yine de seçmek bu tümel iddiaya karşı örnektir (C).", "Tek karşı örnek “herkes kötüdür”ü kanıtlamaz."] },
  { a: "Aristoteles", b: "erdemli yaşam, ölçülülük", detail: ["Mutluluk anlık haz değil, erdemli etkin yaşam.", "Ölçülülük sayısal orta değil, durumun gerektirdiği ölçü."] },
  { a: "Epiküros", b: "dingin haz", detail: ["Hazcılık; ama sınırsız tüketim değil.", "Dinginlik (ataraksia) ve acıdan uzak olma."] },
  { a: "Kant", b: "evrenselleştirilebilir ödev", detail: ["Ödeve uygun değil, ödevden dolayı davranmak.", "Evrensel geçerlilik ≠ herkesin fiilen uyması."] },
  { a: "Bentham, Mill", b: "genel yarar (faydacılık)", detail: ["Etkilenenlerin toplam refahı.", "Sonuççuluğun bir türü."] },
  { a: "Nietzsche, Sartre", b: "değer eleştirisi / seçim ve sorumluluk", detail: ["Nietzsche değerlerin oluşumunu eleştirir.", "Sartre hazır bir öz yerine kişinin seçimini ve sorumluluğunu vurgular.", "Aynı gerekçeye dayanmazlar."] },
];
const thinkers: FigureDef = {
  caption:
    "Düşünür adından önce pasajın verdiği ölçütü oku. Bir düşünüre tıkla: ders sınıflamasındaki ölçütü ve karıştırılmaması gereken nokta açılır.",
  alt: "Altı satır: Sokrates, Aristoteles, Epiküros, Kant, Bentham ve Mill, Nietzsche ve Sartre; her birinin ahlaki ölçütü.",
  picks: THINKERS.map((t) => ({ label: t.a, title: `${t.a}: ${t.b}`, detail: t.detail })),
  draw: (_v, _s, pick = -1) => {
    const els = board(THINKERS, pick);
    els.push(txt(v(-0.3, 0.5), " ", "c"), txt(v(6.6, -8.2), " ", "c"));
    return { els, readout: [pick >= 0 ? THINKERS[pick].detail[0] : "Bir düşünüre tıkla ya da aşağıdan seç.", "Aynı eylemi onaylamaları aynı gerekçeyi kullandıkları anlamına gelmez."] };
  },
};

export const philosophyFiguresEthics: Record<string, Record<string, FigureDef>> = {
  "ahlak-felsefesi": {
    "Niyet, eylem ve sonucu ayrı yaz": reasons,
    "Betimleyici yargı ile normatif yargı": bridge,
    "Özgürlük, irade ve seçenekler": freedom,
    "Evrensel ilke ile farklı uygulama": thinkers,
  },
};
