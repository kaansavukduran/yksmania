import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * TYT Coğrafya · Dünya'nın tektonik oluşumu ve iç kuvvetler (Forge058).
 * Kesitler özgün, ölçekli olmayan şemalardır. Sayılar bölüm metnindedir:
 * yaş ≈ d / (10v) milyon yıl, zaman sınırları 539, 252 ve 66 milyon yıl,
 * izostazi sapması ≈ h × 0,9 / 3,3, göreli deniz seviyesi = deniz düzeyi
 * değişimi − kara yükselmesi (deniz +2 m, kara +3 m → −1 m).
 */

const pad = (a: V, b: V): El[] => [txt(a, " ", "c"), txt(b, " ", "c")];
const rect = (x0: number, y0: number, x1: number, y1: number, tone: Tone, opts: { bare?: boolean; bold?: boolean } = {}): El =>
  poly([v(x0, y0), v(x1, y0), v(x1, y1), v(x0, y1)], { tone, fill: tone, thin: !opts.bold, bare: opts.bare, bold: opts.bold });

/* ---------------- Tektonik oluşum ---------------- */

const lithosphere: FigureDef = {
  caption:
    "Kabuk ile litosfer aynı şey değildir. Okyanusal kabuk genellikle ince ve yoğun (bazaltik), kıtasal kabuk kalın ve daha az yoğundur (granitik). Litosfer kabuk ile üst mantonun en dıştaki sert bölümünü birlikte içerir; altındaki astenosfer uzun zamanda şekil değiştirebilen daha zayıf bölümdür. Bir levha hem okyanusal hem kıtasal bölüm taşıyabilir. Kalınlıklar ölçekli değildir.",
  alt: "Kesit: solda ince okyanusal kabuk ve üstünde okyanus, sağda kalın kıtasal kabuk; altında sert manto bölümü; ikisi birlikte litosfer parantezi; en altta astenosfer.",
  draw: () => {
    const els: El[] = [];
    els.push(rect(-5, 2.2, 0, 3.0, "b", { bare: true }), txt(v(-4.8, 2.7), "okyanus", "e", { small: true, tone: "b" }));
    els.push(poly([v(-5, 1.6), v(0, 1.6), v(0.6, 1.0), v(5, 1.0), v(5, 3.0), v(0.6, 3.0), v(0, 2.2), v(-5, 2.2)], { tone: "warn", fill: "warn", thin: true }));
    els.push(txt(v(-2.5, 1.9), "okyanusal kabuk", "c", { small: true, bold: true }), txt(v(2.8, 2.0), "kıtasal kabuk", "c", { small: true, bold: true }));
    els.push(poly([v(-5, 0), v(5, 0), v(5, 1.0), v(0.6, 1.0), v(0, 1.6), v(-5, 1.6)], { tone: "c", fill: "c", thin: true }), txt(v(-2.5, 0.8), "sert üst manto", "c", { small: true, tone: "c" }));
    els.push(rect(-5, -1.4, 5, 0, "muted"), txt(v(0, -0.7), "astenosfer (daha zayıf)", "c", { small: true, tone: "muted" }));
    els.push(seg(v(5.4, 0), v(5.4, 3.0), { tone: "a", bold: true }), seg(v(5.25, 0), v(5.55, 0), { tone: "a" }), seg(v(5.25, 3.0), v(5.55, 3.0), { tone: "a" }));
    els.push(txt(v(5.7, 1.5), "litosfer (levha)", "e", { small: true, bold: true, tone: "a" }));
    els.push(...pad(v(-5.3, 3.3), v(9.6, -1.7)));
    return { els, readout: ["'Levha = kıta' ya da 'levha yalnız kabuk' eşitliği sınır hareketlerini yanlış yorumlatır.", "Okyanus altında her yerde kıtasal kabuk bulunması gerekmez."] };
  },
};

const SHELLS = [
  { label: "Kabuk", r: 3.0, tone: "warn" as Tone, state: "katı", text: "Kıtasal ve okyanusal kabuk; çizimde kalınlığı büyütüldü." },
  { label: "Manto", r: 2.75, tone: "c" as Tone, state: "büyük ölçüde katı", text: "Yüksek sıcaklık ve basınçta uzun zamanda çok yavaş şekil değiştirebilir; bütünü sıvı magma denizi değildir. Bazı kesimlerde kısmi erime olabilir." },
  { label: "Dış çekirdek", r: 1.5, tone: "a" as Tone, state: "sıvı", text: "Sıvıdır; bazı deprem dalgalarının sıvıda doğrudan yayılamaması iç yapıyı sınamada kullanılır." },
  { label: "İç çekirdek", r: 0.75, tone: "b" as Tone, state: "katı", text: "Yüksek basınç koşullarında katıdır: maddenin hâli yalnız sıcaklığa bağlı değildir." },
];
const shells: FigureDef = {
  caption:
    "Bileşime göre kabuk, manto ve çekirdek ayrılır; çekirdek sıvı dış ve katı iç bölümden oluşur. Bu yapı deprem dalgalarının hız ve yayılma farkları gibi dolaylı kanıtlarla bilinir. Bir katmana tıkla. Katman sınırları ayırt etmek için büyütülmüş şemadır; hacim yüzdesi buradan hesaplanmaz.",
  alt: "Yarım daire kesit: dışta ince kabuk, geniş manto, sıvı dış çekirdek ve merkezde katı iç çekirdek; her katmanın yanında hâli yazıyor.",
  picks: SHELLS.map((s) => ({ label: s.label, title: `${s.label} (${s.state})`, detail: [s.text] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const half = (r: number): V[] => Array.from({ length: 25 }, (_, i) => v(r * Math.cos((i / 24) * Math.PI), r * Math.sin((i / 24) * Math.PI)));
    SHELLS.forEach((s, i) => els.push(poly(half(s.r), { tone: pick === i ? "a" : s.tone, fill: s.tone, bold: pick === i, thin: pick !== i })));
    els.push(seg(v(-3.2, 0), v(3.2, 0), { thin: true }));
    const ys = [3.35, 2.2, 1.1, 0.35];
    SHELLS.forEach((s, i) => {
      const xr = i === 0 ? 2.25 : i === 1 ? 2.2 : i === 2 ? 1.15 : 0.45;
      els.push(seg(v(xr, ys[i] - 0.1 < 0 ? 0.1 : Math.min(ys[i], Math.sqrt(Math.max(0, (s.r - 0.12) ** 2 - xr * xr)))), v(3.6, ys[i]), { thin: true, tone: "muted" }));
      els.push(txt(v(3.75, ys[i]), `${s.label}: ${s.state}`, "e", { small: true, bold: true, tone: pick === i ? "a" : "ink", pick: i }));
    });
    els.push(...pad(v(-3.4, 3.7), v(9.4, -0.4)));
    const sel = pick >= 0 ? `${SHELLS[pick].label}: ${SHELLS[pick].text}` : "Bir katmana tıkla ya da aşağıdan seç.";
    return { els, readout: [sel, "Yüzeye yakın her 33 m'de 1 °C gibi yaklaşık bir gradyan Dünya merkezine kadar doğrusal uzatılamaz."] };
  },
};

const RATES = [1, 2, 5];
const ridge: FigureDef = {
  caption:
    "Okyanus ortası sırtında yeni kabuk oluşur; sırttan uzaklaştıkça taban yaşlanır ve manyetik şeritler iki yana simetrik dizilir. Sabit yarı yayılma hızı v (cm/yıl) ve sırta tek yandaki uzaklık d (km) için yaş ≈ d / (10v) milyon yıl: 1 cm/yıl, bir milyon yılda 10 km eder. Adımlarla yarı hızı, sürgüyle uzaklığı değiştir. Hızın sabit olduğu verilmedikçe kesin yaş sayılmaz.",
  alt: "Ortada sırt, iki yana uzaklaşan oklar ve simetrik açık-koyu şeritler. Sağ tarafta seçilen uzaklıkta bir işaret ve hesaplanan yaş.",
  param: { label: "Sırttan uzaklık d", min: 0, max: 500, step: 50, init: 200, unit: " km", plain: true },
  steps: RATES.map((r) => `v = ${r} cm/yıl`),
  draw: (d, step) => {
    const vr = RATES[step];
    const X = (km: number) => km / 100;
    const els: El[] = [];
    for (let k = -5; k < 5; k++) els.push(rect(X(k * 100), 0, X((k + 1) * 100), 1.0, k % 2 === 0 ? "b" : "muted", { bare: true }));
    els.push(seg(v(X(-500), 0), v(X(500), 0), { thin: true }), seg(v(X(-500), 1), v(X(500), 1), { thin: true }));
    els.push(seg(v(0, -0.2), v(0, 1.6), { tone: "warn", bold: true }), txt(v(0, 1.85), "sırt", "n", { small: true, bold: true, tone: "warn" }));
    els.push(vec(v(-0.3, 1.35), v(-1.6, 1.35), { tone: "ink" }), vec(v(0.3, 1.35), v(1.6, 1.35), { tone: "ink" }));
    els.push(txt(v(X(-480), 1.35), "yaşlı", "e", { small: true, tone: "muted" }), txt(v(X(480), 1.35), "yaşlı", "w", { small: true, tone: "muted" }));
    els.push(seg(v(X(d), -0.15), v(X(d), 1.15), { tone: "a", bold: true }));
    els.push(txt(v(X(d), -0.4), `d = ${fmt(d, 0)} km`, "s", { small: true, bold: true, tone: "a" }));
    els.push(...pad(v(X(-520), 2.4), v(X(520), -1.0)));
    const age = d / (10 * vr);
    return {
      els,
      readout: [`Yaş ≈ ${fmt(d, 0)} / (10 × ${vr}) = ${fmt(age, 1)} milyon yıl.`, "Yarı hız tek levhanın sırttan uzaklaşmasıdır; iki levhanın toplam ayrılma hızı bunun iki katı olabilir."],
    };
  },
};

const CONV = [
  { name: "Okyanus–kıta", note: "Okyanusal litosfer kıtanın altına dalar: derin hendek, derinleşen deprem odakları ve karada volkan yayı birlikte görülebilir." },
  { name: "Okyanus–okyanus", note: "Bir okyanusal levha ötekinin altına dalar: hendek ve ada yayı gelişebilir." },
  { name: "Kıta–kıta", note: "İki kıta çarpışır: kabuk kısalıp kalınlaşır, dağ kuşağı oluşur (Himalayalar tipik bağlamdır); her yakınlaşmada hendek ve volkan yayı olmaz." },
];
const convergent: FigureDef = {
  caption:
    "Yakınlaşan sınırda önce göreli hareketi, sonra karşılaşan litosferin türünü oku, en son beklenen şekilleri sırala. Adımlarda üç karşılaşma türünün şematik kesiti var. Yoğunluk ve levhanın yaşı önemlidir; ölçekli değildir.",
  alt: "Adım 1: soldan gelen okyanusal levha sağdaki kıtanın altına dalıyor, sınırda hendek, kıtada volkan. Adım 2: iki okyanusal levha, dalan levhanın üstünde ada yayı. Adım 3: iki kıta çarpışıyor, ortada yükselen dağ kuşağı.",
  steps: CONV.map((c) => c.name),
  draw: (_v, step) => {
    const els: El[] = [];
    if (step < 2) {
      els.push(rect(-5, 1.8, 0, 2.3, "b", { bare: true }));
      els.push(poly([v(-5, 1.8), v(-0.4, 1.8), v(2.6, -0.8), v(2.0, -1.0), v(-0.8, 1.3), v(-5, 1.3)], { tone: "c", fill: "c", thin: true }));
      els.push(vec(v(-4.6, 1.05), v(-2.8, 1.05), { tone: "ink", bold: true }));
      els.push(txt(v(-0.3, 1.55), "hendek", "e", { small: true, tone: "b" }));
      if (step === 0) {
        els.push(poly([v(0, 2.3), v(5, 2.3), v(5, 0.6), v(1.6, 0.6), v(0, 1.9)], { tone: "warn", fill: "warn", thin: true }));
        els.push(poly([v(2.2, 2.3), v(2.7, 3.1), v(3.2, 2.3)], { tone: "a", fill: "a", thin: true }), txt(v(3.3, 3.0), "volkan yayı (karada)", "e", { small: true, bold: true, tone: "a" }));
        els.push(txt(v(4.0, 1.4), "kıta", "c", { small: true, bold: true }));
      } else {
        els.push(rect(0, 1.8, 5, 2.3, "b", { bare: true }));
        els.push(poly([v(0, 1.8), v(5, 1.8), v(5, 1.3), v(1.4, 1.3), v(0.2, 1.75)], { tone: "c", fill: "c", thin: true }));
        els.push(poly([v(2.2, 1.8), v(2.7, 2.7), v(3.2, 1.8)], { tone: "a", fill: "a", thin: true }), txt(v(3.3, 2.6), "ada yayı", "e", { small: true, bold: true, tone: "a" }));
      }
      els.push(txt(v(-3.2, 1.55), "okyanusal levha", "c", { small: true, bold: true }), txt(v(2.7, -0.6), "dalan levha", "e", { small: true, tone: "c" }));
    } else {
      els.push(poly([v(-5, 1.6), v(-1.2, 1.6), v(0, 3.4), v(1.2, 1.6), v(5, 1.6), v(5, 0), v(0.8, 0), v(0, -0.8), v(-0.8, 0), v(-5, 0)], { tone: "warn", fill: "warn", thin: true }));
      els.push(seg(v(0, -0.8), v(0, 3.4), { tone: "muted", dash: true }));
      els.push(vec(v(-4.6, 0.8), v(-2.8, 0.8), { tone: "ink", bold: true }), vec(v(4.6, 0.8), v(2.8, 0.8), { tone: "ink", bold: true }));
      els.push(txt(v(0.5, 3.2), "dağ kuşağı", "e", { small: true, bold: true, tone: "a" }), txt(v(-3.4, 1.95), "kıta", "c", { small: true, bold: true }), txt(v(3.4, 1.95), "kıta", "c", { small: true, bold: true }));
      els.push(txt(v(0.2, -0.6), "kalınlaşan kabuk", "e", { small: true, tone: "muted" }));
    }
    els.push(...pad(v(-5.3, 3.8), v(7.2, -1.3)));
    return { els, readout: [CONV[step].note, "Bir sınırı tanırken önce göreli hareket, sonra litosfer türü, en son şekil ve süreç."] };
  },
};

const transform: FigureDef = {
  caption:
    "Üstten görünüş. Yanal (transform) sınırda iki levha sınır boyunca birbirine göre yatay hareket eder; gerilim birikip ani kayma ile boşalınca deprem olur. Baskın hareket yeni kabuk üretmez, dalma-batma ile kabuk yok etmez. Oklar paralel ama ters yönlüdür; sınır çizgisine göre hareketi oku.",
  alt: "Ortada düz sınır çizgisi; üstteki levhada sola, alttaki levhada sağa bakan ok; sınır boyunca küçük deprem odağı halkaları.",
  draw: () => {
    const els: El[] = [rect(-5, 0, 5, 2, "c", { bare: true }), rect(-5, -2, 5, 0, "warn", { bare: true })];
    els.push(seg(v(-5, 0), v(5, 0), { bold: true }));
    els.push(vec(v(1.6, 1.0), v(-1.6, 1.0), { tone: "ink", bold: true }), vec(v(-1.6, -1.0), v(1.6, -1.0), { tone: "ink", bold: true }));
    for (const x of [-3.6, -1.2, 2.0, 3.8]) els.push(circle(v(x, 0), 0.16, { tone: "a", thin: true }));
    els.push(txt(v(-4.8, 1.6), "levha A", "e", { small: true, bold: true, tone: "c" }), txt(v(-4.8, -1.6), "levha B", "e", { small: true, bold: true, tone: "warn" }));
    els.push(txt(v(4.9, 0.35), "yanal sınır", "nw", { small: true, bold: true }));
    els.push(...pad(v(-5.3, 2.3), v(5.3, -2.3)));
    return { els, readout: ["Deprem, volkan ve genç dağ dağılışı levha sınırlarıyla güçlü ilişkilidir, ama birebir aynı haritalar değildir.", "Levha içi depremler ve sıcak nokta volkanizması gibi istisnalar vardır."] };
  },
};

const ERAS = [
  { label: "Prekambriyen", from: 700, to: 539, tone: "muted" as Tone, text: "En eski geniş zaman aralığı (539 milyon yıldan öncesi; çizimde kısaltıldı)." },
  { label: "Paleozoyik", from: 539, to: 252, tone: "b" as Tone, text: "Yaklaşık 539–252 milyon yıl önce. Karbonifer taşkömürü oluşumuyla ilişkilendirilir (Zonguldak)." },
  { label: "Mesozoyik", from: 252, to: 66, tone: "c" as Tone, text: "Yaklaşık 252–66 milyon yıl önce. Dinozorların yaygınlığıyla ilişkilendirilir." },
  { label: "Senozoyik", from: 66, to: 0, tone: "warn" as Tone, text: "66 milyon yıl önceden günümüze: Paleojen, Neojen ve Kuvaterner. Memeli çeşitlenmesi; Kuvaterner Senozoyik'in parçasıdır." },
];
const timeline: FigureDef = {
  caption:
    "Jeolojik zaman şeridi, milyon yıl önce (yuvarlanmış sınırlar 539, 252 ve 66). Paleozoyik, Mesozoyik ve Senozoyik uzunluklarına göre ölçekli; Prekambriyen çok uzun olduğu için kısaltıldı (kesik çizgi). Bir zamana tıkla. Örnek canlılar her grubun yalnız o zamanda yaşadığı anlamına gelmez.",
  alt: "Soldan sağa zaman şeridi: kısaltılmış Prekambriyen, uzun Paleozoyik, daha kısa Mesozoyik ve en kısa Senozoyik; sınırlarda 539, 252, 66 ve 0 yazıyor.",
  picks: ERAS.map((e) => ({ label: e.label, title: e.label, detail: [e.text] })),
  draw: (_v, _s, pick = -1) => {
    const X = (my: number) => -my / 50;
    const els: El[] = [];
    ERAS.forEach((e, i) => {
      els.push(rect(X(e.from), 0, X(e.to), 0.8, e.tone, { bold: pick === i }));
    });
    els.push(seg(v(X(700) - 0.05, -0.1), v(X(700) + 0.25, 0.9), { tone: "ink" }), seg(v(X(700) + 0.15, -0.1), v(X(700) + 0.45, 0.9), { tone: "ink" }));
    for (const m of [539, 252, 66, 0]) els.push(txt(v(X(m), -0.3), String(m), "s", { small: true, tone: "muted" }));
    els.push(txt(v((X(700) + X(539)) / 2, 1.2), "Prekambriyen", "n", { small: true, bold: true, tone: pick === 0 ? "a" : "ink", pick: 0 }));
    els.push(txt(v((X(539) + X(252)) / 2, 0.4), "Paleozoyik", "c", { small: true, bold: true, tone: pick === 1 ? "a" : "ink", pick: 1 }));
    els.push(txt(v((X(252) + X(66)) / 2, 0.4), "Mesozoyik", "c", { small: true, bold: true, tone: pick === 2 ? "a" : "ink", pick: 2 }));
    els.push(seg(v(X(33), 0.85), v(X(33), 1.4), { thin: true, tone: "muted" }), txt(v(X(33), 1.55), "Senozoyik", "n", { small: true, bold: true, tone: pick === 3 ? "a" : "ink", pick: 3 }));
    els.push(txt(v(X(0) + 0.1, -1.75), "milyon yıl önce", "w", { small: true, tone: "muted" }));
    els.push(...pad(v(X(720), 2.2), v(X(-30), -2.2)));
    const sel = pick >= 0 ? `${ERAS[pick].label}: ${ERAS[pick].text}` : "Bir zamana tıkla ya da aşağıdan seç.";
    return { els, readout: [sel, "Bazı eski tablolarda Paleojen ve Neojen birlikte Tersiyer diye anılır."] };
  },
};

/* ---------------- İç kuvvetler ---------------- */

const folds: FigureDef = {
  caption:
    "Sıkışma altında tabakalar kıvrılabilir. Basit, bozulmamış çizimde yukarı kemer biçimli kıvrım antiklinal, aşağı oluk biçimli kıvrım senklinaldir. Arazide bir tepe mutlaka antiklinal, bir vadi mutlaka senklinal değildir: aşınma ve sonraki faylar tersine rölyef oluşturabilir. Şematik kesit.",
  alt: "Üç paralel dalgalı tabaka; iki yandan içe doğru sıkışma okları; dalganın tepesi antiklinal, çukuru senklinal olarak etiketli.",
  draw: () => {
    const els: El[] = [];
    const layer = (y: number, tone: Tone) => {
      const top = Array.from({ length: 25 }, (_, i) => v(-4 + (8 * i) / 24, y + 0.9 * Math.cos(((-4 + (8 * i) / 24) / 4) * Math.PI * 1.5 + Math.PI / 2 - 0.0) * 1));
      const bot = top.map((p) => v(p[0], p[1] - 0.5)).reverse();
      els.push(poly([...top, ...bot], { smooth: true, tone, fill: tone, thin: true }));
    };
    layer(2.0, "warn");
    layer(1.5, "c");
    layer(1.0, "b");
    els.push(vec(v(-5.4, 1.2), v(-4.3, 1.2), { tone: "ink", bold: true }), vec(v(5.4, 1.2), v(4.3, 1.2), { tone: "ink", bold: true }));
    els.push(txt(v(-1.35, 3.25), "antiklinal", "n", { small: true, bold: true, tone: "a" }), txt(v(1.35, -0.75), "senklinal", "s", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-5.4, 1.55), "sıkışma", "e", { small: true, tone: "muted" }));
    els.push(...pad(v(-5.6, 3.9), v(5.6, -1.4)));
    return { els, readout: ["Antiklinal: yukarı kemer. Senklinal: aşağı oluk. Devrilmiş yapılarda yalnız tepe görünümüne bakmak yanıltır.", "Toroslar ve Kuzey Anadolu dağ kuşakları kıvrımlı yapılarla ilişkilendirilir."] };
  },
};

const FAULTS = [
  { name: "Normal fay", note: "Tavan bloğu taban bloğuna göre aşağı iner; gerilmeli ortamlarla ilişkilidir." },
  { name: "Ters fay", note: "Tavan bloğu taban bloğuna göre yukarı çıkar; sıkışmayla ilişkilidir." },
  { name: "Doğrultu atımlı", note: "Baskın kayma yataydır: bloklar fay boyunca yan yana kayar (üstten görünüş)." },
  { name: "Horst ve graben", note: "Normal faylarla sınırlı sistemde göreli yüksek blok horst, göreli alçak blok graben. Batı Anadolu'nun birçok dağ–ova düzeni bu bağlamda ele alınır." },
];
const faults: FigureDef = {
  caption:
    "Fay, kırık yüzeyi boyunca göreli yer değiştirmenin olduğu yapıdır; her çatlak fay değildir. Adımlarda normal, ters ve doğrultu atımlı fay ile horst–graben düzeni. Fayın eğimi ve blokların konumu verilmeden yalnız bir yüksekliği adlandırmak eksik olabilir. Şematik kesitler.",
  alt: "Adım 1–2: eğik fay düzlemiyle ayrılmış iki blok; normal fayda sağdaki tavan bloğu aşağıda, ters fayda yukarıda. Adım 3: üstten iki blok, ters yönlü yatay oklar. Adım 4: ortada yüksek horst ve iki yanında alçak graben blokları.",
  steps: FAULTS.map((f) => f.name),
  draw: (_v, step) => {
    const els: El[] = [];
    if (step < 2) {
      const dy = step === 0 ? -0.7 : 0.7;
      const dx = (-dy * 1) / 2.4;
      els.push(poly([v(-4, 0), v(0.4, 0), v(-0.6, 2.4), v(-4, 2.4)], { tone: "c", fill: "c", thin: true }));
      els.push(poly([v(0.4 + dx, dy), v(4, dy), v(4, 2.4 + dy), v(-0.6 + dx, 2.4 + dy)], { tone: "warn", fill: "warn", thin: true }));
      els.push(seg(v(0.9, -1.2), v(-1.1, 3.6), { tone: "a", dash: true }));
      els.push(vec(v(2.4, 1.2), v(2.4, 1.2 + dy * 1.2), { tone: "ink", bold: true }));
      els.push(txt(v(-2.3, 1.2), "taban bloğu", "c", { small: true, bold: true }), txt(v(2.3, 2.4 + dy + 0.35), "tavan bloğu", "n", { small: true, bold: true, tone: "warn" }));
      els.push(txt(v(1.0, -1.25), "fay düzlemi", "e", { small: true, tone: "a" }));
    } else if (step === 2) {
      els.push(rect(-4, 0, 4, 1.6, "c", { bare: true }), rect(-4, -1.6, 4, 0, "warn", { bare: true }), seg(v(-4, 0), v(4, 0), { tone: "a", bold: true }));
      els.push(vec(v(1.2, 0.8), v(-1.2, 0.8), { tone: "ink", bold: true }), vec(v(-1.2, -0.8), v(1.2, -0.8), { tone: "ink", bold: true }));
      els.push(txt(v(4.1, 0), "fay", "e", { small: true, bold: true, tone: "a" }), txt(v(-3.8, 1.25), "üstten görünüş", "e", { small: true, tone: "muted" }));
    } else {
      els.push(poly([v(-4.5, 0), v(-1.6, 0), v(-1.2, 1.4), v(-4.5, 1.4)], { tone: "c", fill: "c", thin: true }));
      els.push(poly([v(-1.6, 0), v(1.6, 0), v(1.2, 2.6), v(-1.2, 2.6)].map((p, i) => (i === 3 ? v(-1.2, 2.6) : p)), { tone: "warn", fill: "warn", thin: true }));
      els.push(poly([v(1.6, 0), v(4.5, 0), v(4.5, 1.4), v(1.2, 1.4)], { tone: "c", fill: "c", thin: true }));
      els.push(txt(v(0, 1.3), "horst", "c", { small: true, bold: true }), txt(v(-3.0, 0.7), "graben", "c", { small: true, bold: true }), txt(v(3.0, 0.7), "graben", "c", { small: true, bold: true }));
      els.push(vec(v(-5.2, 2.0), v(-4.2, 2.0), { tone: "muted" }), vec(v(5.2, 2.0), v(4.2, 2.0), { tone: "muted" }));
    }
    els.push(...pad(v(-5.4, 3.9), v(5.4, -1.8)));
    return { els, readout: [FAULTS[step].note, "Faylı olmak tek başına başka bir bölgeden kesin daha yıkıcı deprem yaşanacağını belirlemez."] };
  },
};

const isostasy: FigureDef = {
  caption:
    "Basit yerel denge modeli: buz kalınlığı h, buz yoğunluğu 0,9 ve destek ortamı yoğunluğu 3,3 g/cm³ verilirse yükün oluşturduğu düşey sapma ≈ h × 0,9 / 3,3. Sürgüyle buz kalınlığını değiştir. Hesap tek sütun ve bu yoğunluk varsayımı içindir; gerçek yükselme hızı ya da tepki süresi değildir. Şema ölçekli değildir.",
  alt: "Litosfer bloğu üzerinde buz katmanı; buz kalınlaştıkça blok destek ortamına doğru çöküyor; kesikli çizgi yüksüz durumdaki üst yüzeyi gösteriyor.",
  param: { label: "Buz kalınlığı h", min: 0, max: 3000, step: 100, init: 1100, unit: " m", plain: true },
  draw: (h) => {
    const s = (h * 0.9) / 3.3;
    const K = 1 / 700;
    const top = 1.6 - s * K;
    const els: El[] = [rect(-4, -1.6, 4, 0.2 - s * K, "muted", { bare: true }), txt(v(-3.8, -1.2), "destek ortamı", "e", { small: true, tone: "muted" })];
    els.push(rect(-2.2, 0.2 - s * K, 2.2, top, "warn"), txt(v(0, (0.2 + top) / 2 - (s * K) / 2), "litosfer", "c", { small: true, bold: true }));
    if (h > 0) els.push(rect(-1.6, top, 1.6, top + h * K, "b"), txt(v(0, top + h * K + 0.15), `buz ${fmt(h, 0)} m`, "n", { small: true, bold: true, tone: "b" }));
    els.push(seg(v(-4, 1.6), v(4, 1.6), { dash: true, tone: "muted" }), txt(v(-4.1, 1.6), "yüksüz üst yüzey", "w", { small: true, tone: "muted" }));
    if (s > 0) els.push(vec(v(2.6, 1.6), v(2.6, top), { tone: "a", bold: true }), txt(v(2.8, (1.6 + top) / 2), `sapma ${fmt(s, 0)} m`, "e", { small: true, bold: true, tone: "a" }));
    els.push(...pad(v(-7.6, 1.6 + 3000 * K - 0.4), v(6.6, -1.9)));
    return { els, readout: [`Sapma ≈ ${fmt(h, 0)} × 0,9 / 3,3 = ${fmt(s, 0)} m.`, "Buz kalkınca uzun dönemde ters yönde toparlanma beklenebilir; anlık tamamlanma iddia edilmez."] };
  },
};

const SEA = [
  { name: "Deniz +2 m, kara +3 m", sea: 2, land: 3 },
  { name: "Deniz +2 m, kara 0 m", sea: 2, land: 0 },
  { name: "Deniz 0 m, kara −2 m", sea: 0, land: -2 },
];
const relSea: FigureDef = {
  caption:
    "Göreli deniz seviyesi değişimi = deniz düzeyi değişimi − kara yükselmesi. Bölümdeki örnek: deniz 2 m yükselirken kara 3 m yükselirse göreli değer −1 m olur ve uygun kıyıda deniz geriler (regresyon). Diğer adımlar aynı formülle hesaplanır; pozitif sonuç denizin karaya ilerlemesi (transgresyon) ile uyumludur.",
  alt: "Üç sütun: deniz düzeyi değişimi, kara yükselmesi ve göreli değişim; okların yönü ve uzunluğu değerlere göre değişiyor.",
  steps: SEA.map((s) => s.name),
  draw: (_v, step) => {
    const c = SEA[step];
    const rel = c.sea - c.land;
    const K = 0.7;
    const els: El[] = [seg(v(-3.6, 0), v(3.6, 0), { thin: true })];
    const bar = (x: number, val: number, name: string, tone: Tone) => {
      if (val !== 0) els.push(vec(v(x, 0), v(x, val * K), { tone, bold: true }));
      else els.push(circle(v(x, 0), 0.08, { tone, fill: tone }));
      els.push(txt(v(x, val >= 0 ? val * K + 0.3 : val * K - 0.3), `${val > 0 ? "+" : val < 0 ? "−" : ""}${Math.abs(val)} m`, val >= 0 ? "n" : "s", { small: true, bold: true, tone }));
      els.push(txt(v(x, val >= 0 ? -0.35 : 0.35), name, val >= 0 ? "s" : "n", { small: true, tone: "muted" }));
    };
    bar(-2.4, c.sea, "deniz", "b");
    bar(0, c.land, "kara", "warn");
    bar(2.4, rel, "göreli", "a");
    els.push(...pad(v(-3.8, 3.2 * K + 0.8), v(3.8, -2.5 * K - 0.9)));
    const word = rel < 0 ? "deniz geriler (regresyon)" : rel > 0 ? "deniz ilerler (transgresyon)" : "göreli değişim yok";
    const sg = (n: number) => (n < 0 ? `−${Math.abs(n)}` : String(n));
    return { els, readout: [`Göreli = ${sg(c.sea)} − ${c.land < 0 ? `(${sg(c.land)})` : sg(c.land)} = ${sg(rel)} m → uygun kıyı eğiminde ${word}.`, "Denizel fosilin bugün yüksekte bulunması eski denizel ortamı gösterir; olayın zamanını tek başına kesinleştirmez."] };
  },
};

const INTRUS = [
  { label: "Batolit", text: "Derinde katılaşmış büyük magma kütlesi." },
  { label: "Dayk", text: "Tabakaları kesen sokulum." },
  { label: "Sill", text: "Tabakalara paralel sokulum." },
  { label: "Lakolit", text: "Üstündeki tabakaları kubbe gibi kaldıran sokulum." },
  { label: "Lav", text: "Yüzeye çıkan eriyik: dış volkanizma. Kül, piroklastik parçalar ve gazlar da çıkabilir." },
];
const intrusions: FigureDef = {
  caption:
    "İç volkanizmada magma kabuğa sokulup derinde katılaşır: batolit, dayk (tabakaları keser), sill (tabakalara paralel), lakolit (tabakaları kubbeleştirir). Yüzeye çıkan eriyik lav adını alır; yüzeye çıkmamış magma volkan konisi oluşturmuş sayılmaz. Bir yapıya tıkla. Şematik kesit.",
  alt: "Yatay tabakalı kesit: altta büyük batolit; ondan yukarı tabakaları kesen dikey dayk, tabakalar arasına yatay sokulan sill, tabakaları kubbeleştiren lakolit ve yüzeyde lav akıtan volkan konisi.",
  picks: INTRUS.map((s) => ({ label: s.label, title: s.label === "Lav" ? "Lav (dış volkanizma)" : `${s.label} (iç volkanizma)`, detail: [s.text] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const tone = (i: number): Tone => (pick === i ? "a" : "warn");
    for (const y of [0.6, 1.2, 1.8, 2.4]) els.push(seg(v(-5, y), v(5, y), { thin: true, tone: "muted" }));
    els.push(seg(v(-5, 3.0), v(-0.4, 3.0), { thin: true }), seg(v(1.6, 3.0), v(5, 3.0), { thin: true }));
    els.push(poly([v(-4.5, -0.8), v(-3.5, 0.3), v(0, 0.5), v(3.5, 0.2), v(4.5, -0.8)], { smooth: true, tone: tone(0), fill: "warn", bold: pick === 0 }));
    els.push(poly([v(-3.0, 0.4), v(-2.8, 0.4), v(-2.8, 2.9), v(-3.0, 2.9)], { tone: tone(1), fill: "warn", bold: pick === 1 }));
    els.push(poly([v(-2.8, 1.45), v(-0.8, 1.45), v(-0.8, 1.6), v(-2.8, 1.6)], { tone: tone(2), fill: "warn", bold: pick === 2 }));
    els.push(poly([v(1.6, 1.8), v(2.4, 2.25), v(3.2, 1.8), v(2.4, 1.7)], { smooth: true, tone: tone(3), fill: "warn", bold: pick === 3 }), seg(v(2.4, 0.4), v(2.4, 1.72), { tone: tone(3) }));
    els.push(poly([v(-0.4, 3.0), v(0.6, 3.9), v(1.6, 3.0)], { tone: tone(4), fill: "a", thin: pick !== 4, bold: pick === 4 }), seg(v(0.6, 0.5), v(0.6, 3.85), { tone: "warn" }));
    els.push(txt(v(0, -0.25), "batolit", "c", { small: true, bold: true, tone: tone(0), pick: 0 }));
    els.push(txt(v(-3.15, 2.1), "dayk", "w", { small: true, bold: true, tone: tone(1), pick: 1 }));
    els.push(txt(v(-1.8, 1.85), "sill", "c", { small: true, bold: true, tone: tone(2), pick: 2 }));
    els.push(txt(v(3.4, 2.15), "lakolit", "e", { small: true, bold: true, tone: tone(3), pick: 3 }));
    els.push(txt(v(1.0, 3.9), "lav (yüzey)", "e", { small: true, bold: true, tone: tone(4), pick: 4 }));
    els.push(...pad(v(-5.3, 4.3), v(5.3, -1.1)));
    const sel = pick >= 0 ? `${INTRUS[pick].label}: ${INTRUS[pick].text}` : "Bir yapıya tıkla ya da aşağıdan seç.";
    return { els, readout: [sel, "Kaldera çoğu kez büyük boşalım sonrası çökme, maar su–magma etkileşimli patlama bağlamında ele alınır."] };
  },
};

const focus: FigureDef = {
  caption:
    "Fayda ani kaymanın başladığı yer içi nokta odaktır (hiposantr); bu noktanın yeryüzündeki dik izdüşümü dış merkezdir (episantr). Odak derinliği yer içindeki düşey uzaklıktır. Dalgalar kaynaktan yayılır; gerçek kırılma tek noktadan daha geniş bir alanı kapsayabilir. Şematik kesit.",
  alt: "Yeryüzü çizgisi altında eğik fay; fay üzerinde odak noktası ve çevresinde yayılan halkalar; odaktan yüzeye dik kesikli çizgi ve yüzeydeki dış merkez işareti; dik çizginin yanında odak derinliği.",
  draw: () => {
    const f = v(0.4, -2.2);
    const els: El[] = [seg(v(-5, 0), v(5, 0), { bold: true }), seg(v(-1.2, -4.0), v(1.6, 0), { tone: "muted", dash: true })];
    for (const r of [0.6, 1.2, 1.8]) els.push(poly(Array.from({ length: 25 }, (_, i) => v(f[0] + r * Math.cos((i / 24) * 2 * Math.PI), f[1] + r * Math.sin((i / 24) * 2 * Math.PI))).filter((p) => p[1] < -0.05), { open: true, thin: true, tone: "b" }));
    els.push(circle(f, 0.13, { tone: "a", fill: "a", bold: true }), seg(v(f[0], f[1] + 0.15), v(f[0], -0.05), { tone: "a", dash: true }));
    els.push(poly([v(f[0] - 0.22, 0), v(f[0], 0.32), v(f[0] + 0.22, 0)], { tone: "a", fill: "a" }));
    els.push(txt(v(f[0] + 0.3, 0.45), "dış merkez (episantr)", "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(f[0] + 2.0, f[1] - 0.2), "odak (hiposantr)", "e", { small: true, bold: true, tone: "a" }), seg(v(f[0] + 0.2, f[1]), v(f[0] + 1.95, f[1] - 0.2), { thin: true, tone: "muted" }));
    els.push(txt(v(f[0] - 0.2, -1.1), "odak derinliği", "w", { small: true, tone: "a" }));
    els.push(txt(v(-4.8, 0.35), "yeryüzü", "e", { small: true, tone: "muted" }), txt(v(-1.3, -3.9), "fay", "w", { small: true, tone: "muted" }));
    els.push(...pad(v(-5.3, 1.0), v(5.6, -4.3)));
    return { els, readout: ["Büyüklük kayıtlardan kaynak ölçeği için hesaplanır; şiddet belirli bir yerdeki hissedilme ve etkidir.", "Aynı büyüklükte iki depremin yerel etkisi odak, uzaklık, zemin, yapı kalitesi ve maruziyetle değişir."] };
  },
};

export const geographyFigures058Tectonic: Record<string, Record<string, FigureDef>> = {
  "dunyanin-tektonik-olusumu": {
    "Kabuk ile litosfer aynı şey değildir": lithosphere,
    "Manto tümüyle sıvı bir magma denizi değildir": shells,
    "Uzaklaşan sınır ve tabanın göreli yaşı": ridge,
    "Yakınlaşmada levha türünü mutlaka oku": convergent,
    "Yanal sınır üretim bandı değildir": transform,
    "Jeolojik zamanı sıraya koy": timeline,
  },
  "ic-kuvvetler": {
    "Kıvrım: tabaka geometrisini gör": folds,
    "Kırık, fay, horst ve graben": faults,
    "İzostatik denge: yük değiştiğinde tepki": isostasy,
    "Epirojenez ve göreli deniz seviyesi": relSea,
    "Volkanizma yalnız lavdan ibaret değildir": intrusions,
    "Depremde odak ile dış merkezi yerleştir": focus,
  },
};
