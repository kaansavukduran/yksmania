import { poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * AYT Biyoloji · Ön beyin. Şemalar özgün ve ölçekli değildir. Lob eşleşmeleri
 * sınav ipucudur; karmaşık görevler birden çok bölgeyi kullanır.
 */

const rect = (x0: number, x1: number, y: number, h: number, s: { fill?: Tone; tone?: Tone; thin?: boolean } = {}): El =>
  poly([v(x0, y + h), v(x1, y + h), v(x1, y - h), v(x0, y - h)], s);

// 1 · Bütündeki yer: ağaç.
type Node = { label: string; at: V; parent?: number; title: string; detail: string[] };
const NODES: Node[] = [
  { label: "Beyin", at: v(4.2, 0), title: "Beyin", detail: ["Omurilikle birlikte MSS’yi oluşturur.", "Ana bölümleri ön, orta ve arka beyindir.", "“Beyin”, “ön beyin” ve “uç beyin” farklı genişlikte bütünlerdir."] },
  { label: "Ön beyin", at: v(1.4, -1.3), parent: 0, title: "Ön beyin", detail: ["Uç beyin ile ara beyni kapsar.", "Orta ve arka beyin bu ikilinin içine yazılmaz."] },
  { label: "Orta beyin", at: v(4.2, -1.3), parent: 0, title: "Orta beyin", detail: ["Ön beynin parçası değildir; ayrı başlıkta işlenir."] },
  { label: "Arka beyin", at: v(7.0, -1.3), parent: 0, title: "Arka beyin", detail: ["Beyincik, pons ve omurilik soğanını içerir; ayrı başlıkta işlenir.", "Duruş ve hareket uyumunda beyincik öne çıkar."] },
  { label: "Uç beyin", at: v(0, -2.6), parent: 1, title: "Uç beyin", detail: ["İki yarım küre ve dıştaki korteks (beyin kabuğu).", "Yarım küreler nasırlı cisim (korpus kallozum) ile haberleşir.", "Korteks yarım kürenin tamamı değil, dış yüzeyidir; derinde gri çekirdekler de vardır."] },
  { label: "Ara beyin", at: v(2.8, -2.6), parent: 1, title: "Ara beyin", detail: ["Talamus, hipotalamus ve epitalamus burada.", "Üç yapı üç farklı düzenektir: aktarım, iç denge, günlük ritim."] },
  { label: "Talamus", at: v(1.4, -3.9), parent: 5, title: "Talamus · aktarım", detail: ["Çoğu duyu bilgisini işleyip ilgili kortikal alana aktarır.", "Kokunun ilk kortikal yolu bu klasik aktarımın istisnasıdır.", "Aktarım ile kortikal yorum aynı basamak değildir."] },
  { label: "Hipotalamus", at: v(3.4, -3.9), parent: 5, title: "Hipotalamus · iç denge", detail: ["Sıcaklık, susama, açlık ve hipofizin düzenlenmesi.", "Sinirsel ve hormonal yanıtları birlikte kullanır.", "Duruş dengesi değil, iç ortam dengesi."] },
  { label: "Epitalamus", at: v(5.4, -3.9), parent: 5, title: "Epitalamus · epifiz", detail: ["Epifiz burada; melatonin salgılar.", "Melatonin aydınlık–karanlık döngüsüyle ilişkilidir.", "Epifiz ile hipofiz farklı bezlerdir."] },
];

const tree: FigureDef = {
  caption:
    "Ön beyin tek bir kutu değildir: beynin üç ana bölümünden biridir ve kendi içinde uç beyin ile ara beyne ayrılır. Bir ada tıkla: neyi kapsadığı ve en sık karıştırılan nokta açılır.",
  alt: "Ağaç şeması: beyin ön, orta ve arka beyne ayrılıyor. Ön beyin uç beyin ve ara beyne, ara beyin de talamus, hipotalamus ve epitalamusa ayrılıyor.",
  picks: NODES.map((n) => ({ label: n.label, title: n.title, detail: n.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    NODES.forEach((n) => {
      if (n.parent !== undefined) els.push(seg(v(NODES[n.parent].at[0], NODES[n.parent].at[1] - 0.3), v(n.at[0], n.at[1] + 0.3), { thin: true, tone: "muted" }));
    });
    NODES.forEach((n, i) => {
      const sel = pick === i;
      const focus = i === 1 || i === 4 || i === 5 || i >= 6;
      els.push(txt(n.at, n.label, "c", { small: i >= 6, bold: sel || i <= 1, tone: sel ? "a" : focus ? "ink" : "muted", pick: i }));
    });
    els.push(txt(v(-1.0, 0.5), " ", "c"), txt(v(8.2, -4.4), " ", "c"));
    return {
      els,
      readout: [
        pick >= 0 ? NODES[pick].detail[0] : "Bir ada tıkla ya da aşağıdan seç.",
        "Ön beyin = uç beyin + ara beyin. Ara beyin = talamus + hipotalamus + epitalamus.",
      ],
    };
  },
};

// 2 · Loblar (sol yan görünüş, ön solda).
const A = v(3.4, 2.6), B = v(2.6, 0.25), L0 = v(1.0, -0.3), L1 = v(4.3, 0.45), P = v(5.0, 2.2), Q = v(5.3, -0.5), M = v(4.8, 0.9);
const LOBES: { label: string; ps: V[]; at: V; tone: Tone; title: string; detail: string[] }[] = [
  { label: "Frontal", ps: [L0, v(0.2, 0.2), v(0.4, 1.6), v(1.6, 2.4), A, B], at: v(1.3, 1.1), tone: "c", title: "Frontal lob", detail: ["İstemli hareket ve planlama.", "Primer motor korteks merkezî oluğun hemen önündedir.", "Hareketin uyumu (koordinasyonu) sorulursa beyincik de değerlendirilir."] },
  { label: "Parietal", ps: [A, v(4.4, 2.5), P, M, L1, B], at: v(3.7, 1.55), tone: "b", title: "Parietal lob", detail: ["Vücut duyuları (dokunma, ağrı, sıcaklık) kortikal işlenir.", "Primer somatik duyu korteksi merkezî oluğun hemen arkasındadır.", "Deri reseptörü, talamik aktarım ve parietal yorum üç ayrı basamaktır."] },
  { label: "Oksipital", ps: [P, v(5.9, 1.4), v(6.2, 0.3), v(5.8, -0.6), Q, L1, M], at: v(5.45, 0.55), tone: "warn", title: "Oksipital lob", detail: ["Görsel bilginin bilinçli yorumu.", "Göz bebeğinin ışıkta daralması bir refleks devresidir; aynı yorum yolu değildir.", "“Göz” sözcüğü tek başına oksipital seçtirmez."] },
  { label: "Temporal", ps: [L0, B, L1, Q, v(4.6, -1.0), v(3.4, -1.6), v(2.2, -1.5), v(1.2, -0.9)], at: v(2.9, -0.65), tone: "muted", title: "Temporal lob", detail: ["İşitme bilgisinin kortikal işlenmesi.", "Ses kulakta alınır, temporal alanlarda yorumlanır.", "Dil ve okuma gibi görevler birden çok bölgeyi kullanır."] },
];

const lobes: FigureDef = {
  caption:
    "Uç beyin korteksinin sol yan görünüşü (özgün şema, ön solda). Bir lobun adına tıkla: işlevi ve yakın tuzak açılır. Kalın çizgi merkezî oluktur: önü motor, arkası somatik duyu.",
  alt: "Beyin yan görünüşü dört lobla: solda frontal, üst ortada parietal, sağda oksipital, altta temporal. Frontal ile parietal arasında kalın merkezî oluk çizgisi var.",
  picks: [...LOBES.map((l) => ({ label: l.label, title: l.title, detail: l.detail })), { label: "Merkezî oluk", title: "Merkezî oluk (Rolando yarığı)", detail: ["Frontal ile parietal alanları ayırır.", "Hemen önü primer motor korteks, hemen arkası primer somatik duyu korteksi.", "Motor ve somatik duyu yollarının çoğu karşı vücut tarafıyla bağlantılıdır."] }],
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    LOBES.forEach((l, i) => els.push(poly(l.ps, { fill: pick === i ? "a" : l.tone, tone: "ink", thin: true })));
    els.push(seg(A, B, { bold: true, tone: pick === 4 ? "a" : "ink" }));
    LOBES.forEach((l, i) => els.push(txt(l.at, l.label, "c", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(3.5, 3.05), "Merkezî oluk", "c", { small: true, bold: pick === 4, tone: pick === 4 ? "a" : "ink", pick: 4 }));
    els.push(vec(v(0.9, -2.15), v(-0.1, -2.15), { thin: true, tone: "muted" }), txt(v(1.05, -2.15), "ön", "e", { small: true, tone: "muted" }));
    els.push(txt(v(-0.6, 3.5), " ", "c"), txt(v(6.8, -2.5), " ", "c"));
    return {
      els,
      readout: [
        pick >= 0 ? (pick < 4 ? LOBES[pick].detail[0] : "Önü motor, arkası somatik duyu.") : "Bir loba tıkla ya da aşağıdan seç.",
        "Lob eşleşmesi ipucudur; karmaşık davranış tek noktada üretilmez.",
      ],
    };
  },
};

// 3 · Zarlar ve BOS (dıştan içe şerit).
const LAYERS: { label: string; h: number; tone: Tone; title: string; detail: string[] }[] = [
  { label: "Kafatası", h: 0.55, tone: "muted", title: "Kafatası kemiği", detail: ["Zarların dışındaki kemik koruma."] },
  { label: "Sert zar", h: 0.45, tone: "c", title: "Sert zar", detail: ["En dıştaki, kalın ve dayanıklı zar."] },
  { label: "Örümceksi zar", h: 0.45, tone: "b", title: "Örümceksi zar", detail: ["Ortadaki zar.", "Altındaki boşlukta BOS bulunur."] },
  { label: "BOS", h: 0.5, tone: "a", title: "Beyin-omurilik sıvısı (BOS)", detail: ["Örümceksi zar ile ince zar arasındaki boşlukta.", "Ayrıca beyin karıncıklarında ve omurilik merkez kanalında bulunur.", "Mekanik koruma ve kimyasal ortama katkı; bir hücre türü değildir."] },
  { label: "İnce zar", h: 0.4, tone: "c", title: "İnce zar", detail: ["Sinir dokusunun yüzeyini yakından izler."] },
  { label: "Korteks (gri)", h: 0.6, tone: "warn", title: "Korteks", detail: ["Uç beyinde dış korteks gri maddedir.", "Altındaki yollar ağırlıkla ak madde; derinde gri çekirdekler de vardır.", "Omurilikte düzen terstir: gri içte, ak dışta."] },
];

const meninges: FigureDef = {
  caption:
    "Dıştan içe koruyucu katmanlar (kalınlıklar ölçekli değil). Bir katmana tıkla. Sıra: sert zar, örümceksi zar, ince zar; BOS örümceksi zar ile ince zar arasındadır.",
  alt: "Yukarıdan aşağı yatay şeritler: kafatası, sert zar, örümceksi zar, BOS boşluğu, ince zar ve korteks.",
  picks: LAYERS.map((l) => ({ label: l.label, title: l.title, detail: l.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    let y = 0;
    LAYERS.forEach((l, i) => {
      const yc = y - l.h / 2;
      els.push(rect(0, 4.4, yc, l.h / 2, { fill: pick === i ? "a" : l.tone, tone: pick === i ? "a" : l.tone, thin: true }));
      els.push(txt(v(4.7, yc), l.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i }));
      y -= l.h + 0.12;
    });
    els.push(vec(v(-0.4, 0), v(-0.4, y + 0.1), { thin: true, tone: "muted" }), txt(v(-0.6, -0.2), "dış", "w", { small: true, tone: "muted" }), txt(v(-0.6, y + 0.3), "iç", "w", { small: true, tone: "muted" }));
    els.push(txt(v(-1.6, 0.4), " ", "c"), txt(v(8.4, y - 0.2), " ", "c"));
    return {
      els,
      readout: [
        pick >= 0 ? LAYERS[pick].detail[0] : "Bir katmana tıkla ya da aşağıdan seç.",
        "BOS’u bir nöron ya da glia türü sayma; zar sırasını dıştan içe koru.",
      ],
    };
  },
};

// 4 · Vaka: giriş → aktarım → yorum.
const STAGES = [
  { name: "Dokunma", boxes: ["Deri reseptörü", "Talamus", "Parietal korteks"], skip: false, note: "Giriş, aktarım ve yorum üç basamak. Aktarma yapısı soruluyorsa talamus, yorum alanı soruluyorsa parietal." },
  { name: "Görme", boxes: ["Göz (retina)", "Talamus", "Oksipital korteks"], skip: false, note: "Bilinçli görsel yorum oksipitalde; göz bebeği refleksi ayrı bir devredir." },
  { name: "Koku", boxes: ["Koku reseptörü", "(talamus atlanır)", "Koku korteksi"], skip: true, note: "İlk kortikal yolda klasik talamik aktarım yok. Bu, kokunun hiçbir aşamada talamusla ilişkisi olmadığı anlamına gelmez." },
];

const caseFlow: FigureDef = {
  caption:
    "Vakayı giriş (reseptör), aktarım (ara beyin) ve çıkış/yorum (korteks) basamaklarına ayır. Adımlarda üç duyu karşılaştırılır; koku ilk kortikal yolda istisnadır.",
  alt: "Soldan sağa üç kutu: reseptör, talamus, ilgili korteks. Koku adımında ortadaki kutu soluk ve ok doğrudan kortekse gidiyor.",
  steps: STAGES.map((s) => s.name),
  draw: (_v, step) => {
    const s = STAGES[step];
    const X = [0, 3.2, 6.4];
    const els: El[] = [];
    s.boxes.forEach((b, i) => {
      const off = s.skip && i === 1;
      els.push(rect(X[i] - 1.35, X[i] + 1.35, 0, 0.42, { fill: off ? undefined : i === 1 ? "b" : i === 0 ? "muted" : "c", tone: off ? "muted" : "ink", thin: true }));
      els.push(txt(v(X[i], 0), b, "c", { small: true, tone: off ? "muted" : "ink" }));
    });
    ["giriş", "aktarım", "yorum"].forEach((t, i) => els.push(txt(v(X[i], 0.8), t, "c", { small: true, tone: "muted" })));
    if (s.skip) {
      els.push(seg(v(X[0], -0.45), v(X[0], -0.95), { tone: "a" }), seg(v(X[0], -0.95), v(X[2], -0.95), { tone: "a" }), vec(v(X[2], -0.95), v(X[2], -0.47), { tone: "a" }));
    } else {
      els.push(vec(v(X[0] + 1.4, 0), v(X[1] - 1.4, 0), { tone: "a" }), vec(v(X[1] + 1.4, 0), v(X[2] - 1.4, 0), { tone: "a" }));
    }
    els.push(txt(v(-1.6, 1.2), " ", "c"), txt(v(8.0, -1.3), " ", "c"));
    return { els, readout: [s.note, "Önce ipucunu sınıfla: alma, aktarma, kortikal yorum, motor başlatma, hareket uyumu ya da iç ortam."] };
  },
};

export const biologyFiguresForebrain: Record<string, Record<string, FigureDef>> = {
  "sinir-sistemi-on-beyin": {
    "Ön beyin bir tek kutu değildir": tree,
    "Koruyucu yapılar ve beyin-omurilik sıvısı": meninges,
    "Korteksin lobları görev ağlarına katılır": lobes,
    "Bir vaka çözümünü giriş, işlem ve çıkışa ayır": caseFlow,
  },
};
