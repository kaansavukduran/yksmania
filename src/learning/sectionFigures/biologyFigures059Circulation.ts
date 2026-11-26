import { circle, fmt, poly, seg, txt, v, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { arrow, axes, box, curve, hi, pad, rect, vmark } from "./biologyFigures059Kit";

/*
 * AYT Biyoloji · Kalp, soluk alışverişi, solunum organları ve gaz taşınması
 * (Forge059). Sayılar bölüm metinlerindedir: dolum sonu 120 mL, kalan 50 mL,
 * atım hacmi 70 mL, dakikada 75 atımda 5.250 mL ve 0,8 s; alveol basıncı
 * −1 / 0 / +1 cmH₂O; Vt 500 mL, Vd 150 mL, f 12 → 6 ve 4,2 L/dk; Vt 250 mL,
 * f 24 → 6 ve 2,4 L/dk; J = kAΔP/T (A 2, ΔP 3, T 1 → 6 model birimi);
 * Bohr örneği aynı basınçta %70 ve %50; CO₂ payları %7 / %23 / %70.
 * Eğri biçimleri, kesitler ve odacık şemaları nitel ve ölçekli değildir.
 */

/* ---------------- Kalp ---------------- */

const circuits: FigureDef = {
  caption:
    "İki pompa seri bağlıdır (özgün şema, ölçekli değil). Sağ kalp kanı akciğere, sol kalp vücuda gönderir; dolaşımın bir turu iki kalp yarısından da geçer. Şemada anatomik sağ, karşıdan bakanın solundadır; bu yüzden adlar renge bırakılmadan yazılır.",
  alt: "Ortada solda sağ kalp, sağda sol kalp kutusu. Üstte akciğer, altta vücut kutusu. Sağ kalpten pulmoner arterle akciğere, akciğerden pulmoner venle sol kalbe; sol kalpten aortla vücuda, vücuttan vena kavayla sağ kalbe dönen oklar.",
  steps: ["Küçük dolaşım", "Büyük dolaşım"],
  draw: (_v, step) => {
    const sm = step === 0;
    const tS: Tone = sm ? "a" : "muted";
    const tB: Tone = sm ? "muted" : "a";
    const els: El[] = [
      ...box(0, 0, 2.6, 0.9, "Sağ kalp", { bold: true }),
      ...box(6, 0, 2.6, 0.9, "Sol kalp", { bold: true }),
      ...box(3, 3, 2.8, 0.9, "Akciğer", { tone: tS, text: sm ? "a" : "ink" }),
      ...box(3, -3, 2.8, 0.9, "Vücut", { tone: tB, text: sm ? "ink" : "a" }),
      seg(v(0, 0.45), v(0, 3), { tone: tS, bold: sm }),
      arrow(v(0, 3), v(1.6, 3), tS, { bold: sm }),
      seg(v(4.4, 3), v(6, 3), { tone: tS, bold: sm }),
      arrow(v(6, 3), v(6, 0.5), tS, { bold: sm }),
      seg(v(6, -0.45), v(6, -3), { tone: tB, bold: !sm }),
      arrow(v(6, -3), v(4.4, -3), tB, { bold: !sm }),
      seg(v(1.6, -3), v(0, -3), { tone: tB, bold: !sm }),
      arrow(v(0, -3), v(0, -0.5), tB, { bold: !sm }),
      txt(v(-0.15, 1.7), "pulmoner arter", "w", { small: true, tone: tS }),
      txt(v(6.15, 1.7), "pulmoner ven", "e", { small: true, tone: tS }),
      txt(v(6.15, -1.7), "aort", "e", { small: true, tone: tB }),
      txt(v(-0.15, -1.7), "vena kava", "w", { small: true, tone: tB }),
      ...pad(v(-1.4, 3.7), v(7.4, -3.7)),
    ];
    return {
      els,
      readout: [
        sm ? "Sağ ventrikül → pulmoner arter → akciğer → pulmoner ven → sol atriyum." : "Sol ventrikül → aort → vücut → vena kava → sağ atriyum.",
        "Seri bağlı iki pompa uzun vadede aynı debiyi taşır; biri ötekinin iki katını sürekli pompalayamaz.",
      ],
    };
  },
};

const CONDUCT = [
  { name: "SA düğüm", text: "Normal temel ritmi başlatan öncül bölge." },
  { name: "Atriyumlar", text: "Uyarı atriyum kasına yayılır; atriyumlar kasılır." },
  { name: "AV düğüm", text: "Gecikme: uyarı kesilmez, ventrikül dolumuna zaman kalır." },
  { name: "His demeti", text: "Uyarı septum boyunca dallara iner." },
  { name: "Purkinje ağı", text: "Ventrikül duvarına yayılır; ventriküller eşgüdümlü kasılır." },
];
const conduction: FigureDef = {
  caption:
    "Uyarının izlediği sıra (özgün şema, ölçekli değil): SA düğüm → atriyumlar → AV düğüm → His demeti ve dalları → Purkinje ağı. İleri ile her adımda bir basamak eklenir. AV gecikmesi iletimin durması değil, dolum için zaman kazancıdır.",
  alt: "Dört odacıklı kalp şeması: üstte iki atriyum, altta iki ventrikül, ortada septum. Sol üst köşede SA düğüm, ortada AV düğüm, septum boyunca His demeti ve iki dal, ventrikül duvarlarında Purkinje lifleri.",
  steps: CONDUCT.map((c) => c.name),
  draw: (_v, step) => {
    const on = (i: number) => step >= i;
    const t = (i: number): Tone => (step === i ? "a" : on(i) ? "c" : "muted");
    const els: El[] = [
      rect(0, 1.2, 6, 3, { tone: on(1) ? "c" : "muted", fill: on(1) ? "c" : undefined, thin: true }),
      rect(0, -3, 6, 1.2, { tone: on(4) ? "c" : "muted", fill: on(4) ? "c" : undefined, thin: true }),
      seg(v(3, 3), v(3, 1.9), { thin: true, tone: "muted" }),
      seg(v(3, 0.4), v(3, -3), { thin: true, tone: "muted" }),
      txt(v(1.5, 2.1), "sağ atriyum", "c", { small: true, tone: "muted" }),
      txt(v(4.5, 2.1), "sol atriyum", "c", { small: true, tone: "muted" }),
      txt(v(1.5, -1.0), "sağ ventrikül", "c", { small: true, tone: "muted" }),
      txt(v(4.5, -1.0), "sol ventrikül", "c", { small: true, tone: "muted" }),
      circle(v(0.6, 2.6), 0.18, { tone: t(0), fill: t(0) }),
      circle(v(3, 1.45), 0.18, { tone: t(2), fill: t(2) }),
      seg(v(3, 1.3), v(3, 0.4), { bold: true, tone: t(3) }),
      seg(v(3, 0.4), v(2.7, -2.6), { bold: true, tone: t(3) }),
      seg(v(3, 0.4), v(3.3, -2.6), { bold: true, tone: t(3) }),
      poly([v(2.7, -2.6), v(0.4, -2.75), v(0.3, -0.2)], { open: true, tone: t(4), bold: on(4) }),
      poly([v(3.3, -2.6), v(5.6, -2.75), v(5.7, -0.2)], { open: true, tone: t(4), bold: on(4) }),
      txt(v(-0.2, 2.6), "SA", "w", { small: true, bold: true, tone: t(0) }),
      txt(v(3.3, 1.45), "AV", "e", { small: true, bold: true, tone: t(2) }),
      txt(v(6.2, -2.2), "Purkinje", "e", { small: true, bold: true, tone: t(4) }),
      txt(v(6.2, 0.6), "His ve dallar", "e", { small: true, bold: true, tone: t(3) }),
      seg(v(6.1, 0.6), v(3.2, 0.6), { thin: true, dash: true, tone: t(3) }),
      ...pad(v(-1.0, 3.3), v(9.0, -3.3)),
    ];
    return { els, readout: [`${step + 1}. ${CONDUCT[step].name}: ${CONDUCT[step].text}`, "Kalp miyojeniktir; sinirler ve hormonlar ritmi başlatmaz, hızını düzenleyebilir."] };
  },
};

const PHASES = [
  { name: "Dolum", av: true, sl: false, vol: "artar", p: "P atriyum > P ventrikül" },
  { name: "İzovolümetrik kasılma", av: false, sl: false, vol: "sabit", p: "P ventrikül artıyor, arteri aşmadı" },
  { name: "Fırlatma", av: false, sl: true, vol: "azalır", p: "P ventrikül > P arter" },
  { name: "İzovolümetrik gevşeme", av: false, sl: false, vol: "sabit", p: "P ventrikül düşüyor, atriyumun üstünde" },
];
const valveCycle: FigureDef = {
  caption:
    "Kapakları basınç farkı açar ve kapatır (nitel şema, ölçekli değil; sağ ve sol tarafta mutlak basınçlar farklıdır). İzovolümetrik kasılma ve gevşemede dört kapak da kapalıdır: kas kasılsa ya da gevşese de ventrikül hacmi yaklaşık sabittir.",
  alt: "Üstte atriyum, altta ventrikül, sağda atardamar kutusu. Atriyum ile ventrikül arasında AV kapak, ventrikül ile atardamar arasında yarımay kapak. Açık kapak aralık ve ok, kapalı kapak kalın çizgiyle gösterilir.",
  steps: PHASES.map((p) => p.name),
  draw: (_v, step) => {
    const ph = PHASES[step];
    const els: El[] = [
      ...box(0, 2.2, 2.6, 1.0, "Atriyum"),
      ...box(0, 0, 2.6, 1.8, "Ventrikül"),
      ...box(3.6, 0.3, 2.2, 1.0, "Atardamar"),
    ];
    if (ph.av) els.push(seg(v(-0.9, 1.7), v(-0.55, 1.05), { tone: "c", bold: true }), seg(v(0.9, 1.7), v(0.55, 1.05), { tone: "c", bold: true }), arrow(v(0, 1.75), v(0, 0.95), "c", { bold: true }));
    else els.push(seg(v(-1.0, 1.7), v(1.0, 1.7), { tone: "warn", bold: true }));
    els.push(seg(v(1.3, -0.15), v(2.5, -0.15), { thin: true, tone: "muted" }), seg(v(1.3, 0.75), v(2.5, 0.75), { thin: true, tone: "muted" }));
    if (ph.sl) els.push(arrow(v(1.35, 0.3), v(2.45, 0.3), "c", { bold: true }));
    else els.push(seg(v(1.9, -0.15), v(1.9, 0.75), { tone: "warn", bold: true }));
    els.push(
      txt(v(-1.5, 1.7), ph.av ? "AV kapak açık" : "AV kapak kapalı", "w", { small: true, bold: true, tone: ph.av ? "c" : "warn" }),
      txt(v(3.6, -0.45), ph.sl ? "yarımay açık" : "yarımay kapalı", "s", { small: true, bold: true, tone: ph.sl ? "c" : "warn" }),
      txt(v(0, -1.35), `ventrikül hacmi: ${ph.vol}`, "s", { small: true, tone: ph.vol === "sabit" ? "a" : "ink", bold: true }),
      ...pad(v(-4.6, 3.0), v(5.0, -2.2)),
    );
    return { els, readout: [`${ph.name}: ${ph.p}.`, "Kasılma olması her an kan çıkışı demek değildir; çıkışı yarımay kapağın açılması başlatır."] };
  },
};

const strokeVolume: FigureDef = {
  caption:
    "Atım hacmi = dolum sonu hacim − kasılma sonu kalan hacim = 120 − 50 = 70 mL. Sürgü yalnız dakikadaki atım sayısını değiştirir; atım hacmi bu modelde 70 mL sabit tutulur. Debi = 70 × atım sayısı; çevrim süresi = 60 ÷ atım sayısı. Bölümün örneği 75 atım: 5.250 mL/dk ve 0,8 s.",
  alt: "Üç yatay çubuk: dolum sonu 120 mL, kalan 50 mL ve aradaki fark olan 70 mL atım hacmi. Altında 3 saniyelik zaman ekseni ve her çevrimin başlangıcında bir çentik.",
  param: { label: "Atım sayısı", min: 50, max: 100, step: 5, init: 75, unit: "/dk" },
  draw: (bpm) => {
    const K = 0.05;
    const T = 60 / bpm;
    const els: El[] = [
      rect(0, 3.0, 120 * K, 3.5, { tone: "b", fill: "b", thin: true }),
      rect(0, 2.2, 50 * K, 2.7, { tone: "muted", fill: "muted", thin: true }),
      rect(50 * K, 2.2, 120 * K, 2.7, { tone: "a", fill: "a", thin: true }),
      txt(v(120 * K + 0.15, 3.25), "dolum sonu 120 mL", "e", { small: true, bold: true }),
      txt(v(25 * K, 1.95), "kalan 50", "s", { small: true }),
      txt(v(120 * K + 0.15, 2.45), "atım hacmi 70 mL", "e", { small: true, bold: true, tone: "a" }),
      seg(v(0, 0), v(6, 0), { thin: true, tone: "muted" }),
      txt(v(6.1, 0), "3 s", "e", { small: true, tone: "muted" }),
      txt(v(0, -0.25), "0", "s", { small: true, tone: "muted" }),
    ];
    for (let t = 0; t <= 3 + 1e-9; t += T) els.push(seg(v(t * 2, 0), v(t * 2, 0.5), { tone: "c", bold: true }));
    els.push(txt(v(T, 0.85), `çevrim ${fmt(T, 2)} s`, "c", { small: true, tone: "c" }), seg(v(0, 0.6), v(T * 2, 0.6), { thin: true, tone: "c" }));
    els.push(...pad(v(-0.3, 3.9), v(10.6, -0.7)));
    return {
      els,
      readout: [`Debi = 70 × ${bpm} = ${fmt(70 * bpm, 0)} mL/dk = ${fmt((70 * bpm) / 1000, 2)} L/dk.`, `Çevrim = 60 ÷ ${bpm} = ${fmt(T, 2)} s. Sağ ve sol kalp seri olduğundan sonucu ikiyle çarpma.`],
    };
  },
};

/* ---------------- Soluk alışverişi ---------------- */

const CHAIN_IN = ["Diyafram ve dış kaslar kasılır", "Göğüs boşluğu hacmi artar", "Alveol basıncı atmosferin altına iner", "Basınç farkı oluşur", "Hava içeri akar"];
const CHAIN_OUT = ["İnspirasyon kasları gevşer", "Elastik geri dönüş, hacim azalır", "Alveol basıncı atmosferi aşar", "Basınç farkı ters döner", "Hava dışarı akar"];
const causal: FigureDef = {
  caption:
    "Nedensel sıra (özgün akış şeması, ölçekli değil): kas → hacim → basınç → fark → akış. Hava yoktan çekilmez; açık hava yolunda yüksek basınçtan düşük basınca akar. Sakin soluk vermede kaslar gevşer ve elastik geri dönüş hacmi azaltır; bu evre çoğunlukla pasif diye anılır.",
  alt: "Yukarıdan aşağı beş kutu ve aralarında aşağı oklar: kasların durumu, göğüs hacmi, alveol basıncı, basınç farkı ve hava akışının yönü.",
  steps: ["Soluk alma", "Sakin soluk verme"],
  draw: (_v, step) => {
    const L = step === 0 ? CHAIN_IN : CHAIN_OUT;
    const els: El[] = [];
    L.forEach((s, i) => {
      const y = -i * 1.15;
      els.push(...box(0, y, 6.4, 0.7, s, { tone: i === 4 ? "a" : "ink", text: i === 4 ? "a" : "ink", bold: i === 4 }));
      if (i < 4) els.push(arrow(v(0, y - 0.37), v(0, y - 0.78), "muted"));
    });
    els.push(...pad(v(-3.5, 0.6), v(3.5, -5.2)));
    return { els, readout: [step === 0 ? "Soluk almada alveol basıncı atmosferin altına iner; akış içe doğrudur." : "Soluk vermede alveol basıncı atmosferi aşar; akış dışa doğrudur.", "Dört büyüklüğü (kas, hacim, basınç, akış) tek isimle anma."] };
  },
};

const diaphragm: FigureDef = {
  caption:
    "Diyafram gevşekken göğse doğru kubbelidir; kasılınca merkezi aşağı iner ve düzleşir, göğüs boşluğunun düşey boyutu artar (özgün şema, ölçekli değil). Kasılma kubbeyi yukarı çekmez.",
  alt: "Göğüs boşluğunu temsil eden bir kutunun tabanında diyafram eğrisi. Gevşek durumda eğri yukarı kubbeli, kasılı durumda daha düz ve aşağıda; aşağı ok merkezin inişini gösteriyor.",
  steps: ["Gevşek", "Kasılı"],
  draw: (_v, step) => {
    const h = step === 0 ? 1.4 : 0.35;
    const base = step === 0 ? 0 : -0.25;
    const els: El[] = [
      poly([v(-3, 0), v(-3, 4), v(3, 4), v(3, 0)], { open: true, tone: "muted", thin: true }),
      curve((x) => base + h * Math.cos((x / 3) * (Math.PI / 2)), -3, 3, 24, { tone: step ? "a" : "b", bold: true }),
      txt(v(0, 3.3), "göğüs boşluğu", "c", { small: true }),
      txt(v(0, -1.0), "karın boşluğu", "c", { small: true, tone: "muted" }),
      txt(v(3.2, base + 0.1), step ? "diyafram (kasılı)" : "diyafram (gevşek)", "e", { small: true, bold: true, tone: step ? "a" : "b" }),
    ];
    if (step) els.push(arrow(v(0, 1.7), v(0, 0.35), "a", { bold: true }), vmark(-3.6, 0.1, 4, "muted"), txt(v(-3.75, 2), "boy artar", "w", { small: true, tone: "a" }));
    els.push(...pad(v(-5.4, 4.3), v(6.6, -1.4)));
    return { els, readout: [step ? "Kasılma: kubbe aşağı iner, göğüs boşluğu düşeyde büyür." : "Gevşek: diyafram göğse doğru kubbelidir.", "Akciğer içindeki düz kas bu ana pompanın yerini tutmaz."] };
  },
};

const volumeFlow: FigureDef = {
  caption:
    "Hacim stoktur, akış ise birim zamanda geçen miktardır (nitel grafik, ölçekli değil). Soluk alma sonunda hacim en yüksektir ama alveol ve atmosfer basınçları eşitlendiği için akış sıfırdır. Hacmin tepesi akışın sıfır anıyla aynı dikey çizgidedir.",
  alt: "Ortak zaman ekseninde iki panel. Üstte akciğer hacmi tek bir tepe çizer. Altta hava akışı önce pozitif (içe), sonra negatif (dışa); hacmin tepe anında akış sıfırı kesiyor ve kesik dikey çizgi iki anı bağlıyor.",
  draw: () => {
    const W = 8;
    const vol = (t: number) => 2.4 + 1.3 * (1 - Math.cos((2 * Math.PI * t) / W));
    const flow = (t: number) => -2.4 + 1.1 * Math.sin((2 * Math.PI * t) / W);
    const els: El[] = [
      seg(v(0, 2.2), v(W, 2.2), { thin: true, tone: "muted" }),
      seg(v(0, -2.4), v(W, -2.4), { thin: true, tone: "muted" }),
      curve(vol, 0, W, 48, { tone: "b", bold: true }),
      curve(flow, 0, W, 48, { tone: "c", bold: true }),
      vmark(W / 2, -3.6, 5.3, "a"),
      txt(v(-0.15, 3.3), "hacim", "w", { small: true, bold: true, tone: "b" }),
      txt(v(-0.15, -2.4), "akış", "w", { small: true, bold: true, tone: "c" }),
      txt(v(1.6, -1.15), "içe", "c", { small: true, tone: "c" }),
      txt(v(6.4, -3.65), "dışa", "c", { small: true, tone: "c" }),
      txt(v(W / 2 + 0.15, 5.6), "hacim en yüksek", "e", { small: true, bold: true, tone: "a" }),
      txt(v(W / 2 + 0.2, -2.15), "akış = 0", "e", { small: true, bold: true, tone: "a" }),
      txt(v(W, 1.9), "zaman", "sw", { small: true, tone: "muted" }),
      ...pad(v(-1.9, 6.0), v(W + 0.4, -4.1)),
    ];
    return { els, readout: ["Tepe hacimde alveol basıncı = atmosfer basıncı; net akış durur.", "Akciğerde hava bulunması akışın sürmesi için yeterli değildir."] };
  },
};

const PRESS = [-1, 0, 1];
const pressures: FigureDef = {
  caption:
    "Atmosfer basıncı göreli sıfır seçilir (bölüm örneği, ölçekli değil). Alveol −1 cmH₂O ise hava içe, +1 ise dışa eğilimlidir, 0'da net fark yoktur. Negatif sayı seçilen referansın altında olmaktır. Plevral basınç ayrı bir bölmedir; akış yönü için alveol basıncı kullanılır.",
  alt: "Solda atmosfer kutusu (0), sağda alveol kutusu; aralarında hava yolu. Alveol basıncı adım adım −1, 0 ve +1 cmH₂O olur; ok yönü içe, yok ve dışa değişir. Altta kesik çizgili ayrı plevral boşluk kutusu.",
  steps: PRESS.map((p) => `Alveol ${p > 0 ? "+" : p < 0 ? "−" : ""}${Math.abs(p)}`),
  draw: (_v, step) => {
    const p = PRESS[step];
    const els: El[] = [
      ...box(0, 0, 2.6, 1.2, "Atmosfer 0"),
      ...box(6, 0, 2.6, 1.2, `Alveol ${p > 0 ? "+" : p < 0 ? "−" : ""}${Math.abs(p)}`, { tone: "b", fill: "b", bold: true }),
      seg(v(1.3, 0.3), v(4.7, 0.3), { thin: true, tone: "muted" }),
      seg(v(1.3, -0.3), v(4.7, -0.3), { thin: true, tone: "muted" }),
      ...box(6, -2.1, 3.4, 0.8, "plevral boşluk", { dash: true, tone: "muted", text: "muted" }),
      txt(v(3, -0.65), "hava yolu (açık)", "s", { small: true, tone: "muted" }),
    ];
    if (p < 0) els.push(arrow(v(1.9, 0), v(4.1, 0), "a", { bold: true }), txt(v(3, 0.75), "içe akış", "n", { small: true, bold: true, tone: "a" }));
    else if (p > 0) els.push(arrow(v(4.1, 0), v(1.9, 0), "a", { bold: true }), txt(v(3, 0.75), "dışa akış", "n", { small: true, bold: true, tone: "a" }));
    else els.push(txt(v(3, 0.75), "net akış yok", "n", { small: true, bold: true, tone: "muted" }));
    els.push(txt(v(-1.4, -2.1), "akış yönü için kullanılmaz", "e", { small: true, tone: "muted" }));
    els.push(...pad(v(-1.6, 1.7), v(7.9, -2.8)));
    return { els, readout: [`Alveol − atmosfer = ${p > 0 ? "+" : p < 0 ? "−" : ""}${Math.abs(p)} cmH₂O → ${p < 0 ? "içe" : p > 0 ? "dışa" : "net akış yok"}.`, "mmHg, cmH₂O ve pascal değerlerini dönüştürmeden toplama."] };
  },
};

const VENT = [
  { vt: 500, f: 12 },
  { vt: 250, f: 24 },
];
const ventDraw = (step: number) => {
  const { vt, f } = VENT[step];
  const vd = 150;
  const K = 0.012;
  const els: El[] = [
    rect(0, 1.0, vd * K, 1.6, { tone: "muted", fill: "muted", thin: true }),
    rect(vd * K, 1.0, vt * K, 1.6, { tone: "c", fill: "c", thin: true }),
    txt(v((vd * K) / 2, 0.75), "ölü boşluk 150", "s", { small: true, tone: "muted" }),
    txt(v(vt * K + 0.15, 1.3), `Vt = ${vt} mL`, "e", { small: true, bold: true }),
    txt(v(((vd + vt) * K) / 2, 1.85), `yeni hava ${vt - vd}`, "n", { small: true, tone: "c" }),
    txt(v(0, 2.6), `bir soluk × ${f}/dk`, "e", { small: true, tone: "muted" }),
    txt(v(0, -0.2), `toplam: ${vt} × ${f} = ${fmt((vt * f) / 1000, 1)} L/dk`, "e", { small: true, bold: true }),
    txt(v(0, -1.0), `alveoler: (${vt} − 150) × ${f} = ${fmt(((vt - vd) * f) / 1000, 1)} L/dk`, "e", { small: true, bold: true, tone: "c" }),
    ...pad(v(-0.3, 3.0), v(9.6, -1.5)),
  ];
  return { els, readout: [`Toplam ${fmt((vt * f) / 1000, 1)} L/dk, alveoler ${fmt(((vt - vd) * f) / 1000, 1)} L/dk.`, "Hesap Vd ≤ Vt ve benzer soluklar varsayımıyla geçerlidir; nefes egzersizi önerisi değildir."] };
};
const ventilation: FigureDef = {
  caption:
    "Bir soluğun tidal hacmi (Vt) iki parçaya ayrılır: iletim yollarında kalan anatomik ölü boşluk (Vd = 150 mL) ve gaz değişim yüzeyine ulaşan yeni hava. Dakika ventilasyonu Vt × f, alveoler ventilasyon (Vt − Vd) × f. Vt 500 mL, f 12: 6 ve 4,2 L/dk.",
  alt: "Yatay çubuk 500 mL'lik bir soluğu gösterir: ilk 150 mL gri ölü boşluk, kalan 350 mL renkli alveoler pay. Altında toplam ve alveoler ventilasyon hesapları.",
  draw: () => ventDraw(0),
};
const sameTotal: FigureDef = {
  caption:
    "Aynı toplam, farklı etkin yeni hava (bölüm örneği, çubuklar ölçekli): Vt 500 mL × 12 ve Vt 250 mL × 24 ikisi de 6 L/dk eder. Ölü boşluk her solukta aynı 150 mL kaldığı için hızlı ve yüzeysel solukta alveoler pay 4,2'den 2,4 L/dk'ya iner.",
  alt: "İki adım: 500 mL'lik çubukta ölü boşluk küçük bir pay; 250 mL'lik çubukta aynı 150 mL ölü boşluk çubuğun büyük bölümünü kaplıyor. Altında iki senaryonun toplam ve alveoler değerleri.",
  steps: ["500 mL × 12", "250 mL × 24"],
  draw: (_v, step) => ventDraw(step),
};

/* ---------------- Solunum organları ---------------- */

const ring = (c: V, r: number, n = 36): V[] => Array.from({ length: n }, (_, i) => v(c[0] + r * Math.cos((2 * Math.PI * i) / n), c[1] + r * Math.sin((2 * Math.PI * i) / n)));
const arc = (c: V, r: number, a0: number, a1: number, n = 10): V[] => Array.from({ length: n + 1 }, (_, i) => {
  const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
  return v(c[0] + r * Math.cos(a), c[1] + r * Math.sin(a));
});
const bronchi: FigureDef = {
  caption:
    "Enine kesit karşılaştırması (özgün şema, ölçekli değil): bronş duvarında kıkırdak destek bulunur; bronşiyolde kıkırdak yoktur, düz kas belirgindir. Bronşiyol düz kası kasılınca lümen daralır ve hava akımına direnç artabilir.",
  alt: "İki halka kesit. Solda bronş: lümen, duvarda kalın kıkırdak plakaları ve ince düz kas halkası. Sağda daha küçük bronşiyol: kıkırdak yok, kesik çizgili düz kas halkası; ikinci adımda bronşiyol lümeni daralmış.",
  steps: ["Gevşek düz kas", "Düz kas kasılı"],
  draw: (_v, step) => {
    const A = v(0, 0);
    const B = v(4.6, 0);
    const rl = step ? 0.35 : 0.65;
    const els: El[] = [
      poly(ring(A, 1.5), { tone: "ink", thin: true, smooth: true }),
      poly(ring(A, 0.95), { tone: "muted", thin: true, smooth: true }),
      poly(ring(A, 1.15), { tone: "c", thin: true, dash: true, smooth: true }),
      poly(arc(A, 1.35, 20, 110), { open: true, tone: "b", bold: true }),
      poly(arc(A, 1.35, 150, 250), { open: true, tone: "b", bold: true }),
      poly(arc(A, 1.35, 290, 340), { open: true, tone: "b", bold: true }),
      poly(ring(B, 1.0), { tone: "ink", thin: true, smooth: true }),
      poly(ring(B, rl + 0.2), { tone: step ? "a" : "c", dash: true, smooth: true, bold: !!step }),
      poly(ring(B, rl), { tone: "muted", thin: true, smooth: true }),
      txt(v(0, 2.0), "bronş", "c", { bold: true }),
      txt(v(4.6, 2.0), "bronşiyol", "c", { bold: true }),
      txt(v(-1.75, 1.3), "kıkırdak", "w", { small: true, tone: "b" }),
      txt(v(0, 0), "lümen", "c", { small: true, tone: "muted" }),
      txt(v(4.6, -1.3), step ? "düz kas kasılı" : "düz kas", "s", { small: true, tone: step ? "a" : "c", bold: !!step }),
      txt(v(1.7, -1.3), "düz kas", "e", { small: true, tone: "c" }),
      ...pad(v(-3.2, 2.5), v(6.0, -2.0)),
    ];
    return { els, readout: [step ? "Düz kas kasılınca bronşiyol lümeni daralır; akım direnci artabilir." : "Bronşta kıkırdak plakaları, bronşiyolde yalnız düz kas destek verir.", "Ayrım rengine ya da adın kısalığına değil, duvarın bileşimine dayanır."] };
  },
};

const lobes: FigureDef = {
  caption:
    "Lob bir organ bölgesidir, alveol ise bronşiyol uçlarındaki küçük hava kesesidir: iki ayrı ölçek (özgün şema, ölçekli değil). Temel düzende sağ akciğer üç, sol akciğer iki lobludur; kalbin komşuluğu sol akciğerin biçimini etkiler.",
  alt: "Birinci adımda iki akciğer silueti: sağdakinde iki ayırıcı çizgiyle üç lob, soldakinde bir çizgiyle iki lob ve kalp çentiği. İkinci adımda bir bronşiyolün ucunda üzüm salkımı biçiminde alveoller.",
  steps: ["Organ ölçeği: lob", "Doku ölçeği: alveol"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) {
      const R: V[] = [v(-0.4, 3), v(-1.6, 2.4), v(-2.4, 0.6), v(-2.6, -1.6), v(-0.4, -1.6), v(-0.3, 1.5)];
      const L: V[] = [v(0.4, 3), v(1.6, 2.4), v(2.4, 0.6), v(2.6, -1.6), v(0.6, -1.6), v(1.1, -0.6), v(0.5, 0.2), v(0.3, 1.5)];
      els.push(
        poly(R, { tone: "b", fill: "b", smooth: true }),
        poly(L, { tone: "c", fill: "c", smooth: true }),
        seg(v(-2.3, 1.2), v(-0.35, 1.0), { tone: "ink", thin: true }),
        seg(v(-2.5, -0.4), v(-0.4, 0.4), { tone: "ink", thin: true }),
        seg(v(2.4, 0.0), v(0.4, 1.6), { tone: "ink", thin: true }),
        txt(v(-1.4, 3.6), "sağ: 3 lob", "c", { small: true, bold: true, tone: "b" }),
        txt(v(1.5, 3.6), "sol: 2 lob", "c", { small: true, bold: true, tone: "c" }),
        txt(v(1.6, -2.0), "kalp çentiği", "s", { small: true, tone: "muted" }),
        seg(v(1.3, -1.8), v(0.9, -0.9), { thin: true, tone: "muted" }),
        ...pad(v(-3.4, 4.0), v(3.4, -2.6)),
      );
    } else {
      els.push(seg(v(-3, 0), v(-0.4, 0), { tone: "ink", bold: true }), txt(v(-1.7, 0.3), "bronşiyol", "n", { small: true }));
      const C: V[] = [v(0.2, 0.6), v(0.3, -0.6), v(1.0, 1.0), v(1.1, 0), v(1.0, -1.0), v(1.8, 0.55), v(1.8, -0.55)];
      for (const c of C) els.push(circle(c, 0.42, { tone: "c", fill: "c" }));
      els.push(txt(v(2.5, 0), "alveoller", "e", { small: true, bold: true, tone: "c" }), ...pad(v(-3.3, 1.8), v(5.0, -1.8)));
    }
    return { els, readout: [step ? "Çok sayıda küçük alveol toplam değişim yüzeyini büyütür; sayılar kişiye ve ölçüme göre değişir." : "Sağ akciğer üç, sol akciğer iki lob; diyafram göğsü karından ayırır.", "Lob tek bir hava kesesi ya da tek bir hücre değildir."] };
  },
};

const ALV = [
  { label: "Tip I", title: "Tip I alveol hücresi", detail: ["İnce gaz değişim yüzeyinin önemli bölümünü oluşturur.", "Yassı ve geniştir; gazların kısa yol almasına katkı verir.", "Sürfaktan salgılayan hücre değildir."] },
  { label: "Tip II", title: "Tip II alveol hücresi", detail: ["Sürfaktan salgılar ve epitel onarımına katılır.", "Sürfaktan yüzey gerilimini azaltır, sönme eğilimini sınırlar.", "Sürfaktan kan, hemoglobin ya da enzim değildir."] },
  { label: "Makrofaj", title: "Alveoler makrofaj", detail: ["Savunma ve parçacık temizleme görevi görür.", "Epitel hücresi değildir; ayrı bir hücre grubudur.", "Gaz değişim yüzeyini oluşturmaz."] },
];
const alveolus: FigureDef = {
  caption:
    "Bir alveolde en az üç hücresel rol vardır (özgün şema, ölçekli değil): Tip I ince değişim yüzeyi, Tip II sürfaktan ve onarım, makrofaj savunma. Bir hücre adına tıkla: görevi ve sık karışan noktası açılır.",
  alt: "Daire biçiminde alveol. Duvarın büyük bölümü ince Tip I hücrelerinden, bir yerde kabarık Tip II hücresi. Lümende düzensiz bir makrofaj. Duvarın dışında kılcal damar kesitleri.",
  picks: ALV,
  draw: (_v, _s, pick = -1) => {
    const C = v(0, 0);
    const els: El[] = [
      poly(arc(C, 2.0, 40, 330, 30), { open: true, tone: hi(pick === 0, "b"), bold: pick === 0, smooth: true }),
      poly([...arc(C, 2.0, -30, 40, 8), ...arc(C, 1.6, 40, -30, 8)], { tone: hi(pick === 1, "c"), fill: hi(pick === 1, "c"), smooth: true }),
      poly([v(-0.5, -0.2), v(-0.1, 0.25), v(0.4, 0.05), v(0.3, -0.45), v(-0.25, -0.6)], { tone: hi(pick === 2, "warn"), fill: hi(pick === 2, "warn"), smooth: true }),
      circle(v(-2.35, 0.9), 0.3, { tone: "muted", thin: true }),
      circle(v(-1.3, -2.3), 0.3, { tone: "muted", thin: true }),
      circle(v(1.0, 2.35), 0.3, { tone: "muted", thin: true }),
      txt(v(-2.2, 2.0), "Tip I", "w", { small: true, bold: pick === 0, tone: hi(pick === 0, "b"), pick: 0 }),
      txt(v(2.4, 0.2), "Tip II", "e", { small: true, bold: pick === 1, tone: hi(pick === 1, "c"), pick: 1 }),
      txt(v(0, -1.0), "Makrofaj", "s", { small: true, bold: pick === 2, tone: hi(pick === 2, "warn"), pick: 2 }),
      txt(v(1.3, 2.4), "kılcal", "e", { small: true, tone: "muted" }),
      txt(v(0, 1.0), "alveol havası", "c", { small: true, tone: "muted" }),
      ...pad(v(-3.6, 2.9), v(3.8, -2.8)),
    ];
    return { els, readout: [pick >= 0 ? ALV[pick].detail[0] : "Bir hücreye tıkla ya da aşağıdan seç.", "Bütün alveol hücreleri aynı yassı, salgısız hücre değildir."] };
  },
};

const LAYERS = ["Alveol havası", "Epitel (Tip I)", "Bazal zar", "Kılcal endoteli", "Plazma ve eritrosit"];
const barrier: FigureDef = {
  caption:
    "Hava ile kan arasında ince ama gerçek bir sınır vardır (özgün şema, ölçekli değil): alveol havası, epitel, bazal zar, kılcal endoteli, plazma. O₂ uygun kısmi basınç farkıyla kana, CO₂ akciğerde ters yönde geçer. Kan alveolün içine dökülmez.",
  alt: "Yukarıdan aşağı beş yatay katman: alveol havası, epitel, bazal zar, kılcal endoteli, plazma ve eritrosit. Aşağı inen O₂ oku ve yukarı çıkan CO₂ oku katmanları kesiyor.",
  draw: () => {
    const els: El[] = [];
    const H = [1.0, 0.75, 0.75, 0.75, 1.0];
    const T: Tone[] = ["b", "c", "muted", "c", "warn"];
    let y = 0;
    LAYERS.forEach((l, i) => {
      els.push(rect(0, y - H[i], 4, y, { tone: T[i], fill: T[i], thin: true }), txt(v(-0.2, y - H[i] / 2), l, "w", { small: true, bold: i === 0 || i === 4 }));
      y -= H[i];
    });
    els.push(arrow(v(1.3, -0.2), v(1.3, -4.0), "a", { bold: true }), txt(v(1.1, -0.45), "O₂", "w", { small: true, bold: true, tone: "a" }));
    els.push(arrow(v(2.8, -4.0), v(2.8, -0.2), "ink", { bold: true }), txt(v(3.0, -0.45), "CO₂", "e", { small: true, bold: true }));
    els.push(...pad(v(-5.4, 0.4), v(4.6, -4.5)));
    return { els, readout: ["İnce ve nemli yüzey, geniş alan ve kısmi basınç farkı değişimi destekler.", "Bariyerin kalınlaşması ile etkin alanın azalması farklı parametrelerdir."] };
  },
};

const DIFF = [
  { name: "Temel", A: 2, dP: 3, T: 1 },
  { name: "Alan 2 kat", A: 4, dP: 3, T: 1 },
  { name: "Kalınlık 2 kat", A: 2, dP: 3, T: 2 },
  { name: "Fark ters", A: 2, dP: -3, T: 1 },
];
const diffusion: FigureDef = {
  caption:
    "Oyuncak model J = kAΔP/T, k = 1 (gerçek difüzyon ölçümü değil). A = 2, ΔP = 3, T = 1 → J = 6 model birimi. Alan iki katına çıkınca J iki kat, kalınlık iki katına çıkınca yarı olur; ΔP negatifse yön kandan alveole döner. Kutunun yüksekliği alanı, genişliği kalınlığı, ok uzunluğu J'yi gösterir.",
  alt: "Ortada zarı temsil eden dikdörtgen: yüksekliği A, genişliği T ile orantılı. Solda alveol, sağda kan yazıyor. Altında uzunluğu J ile orantılı bir ok; dördüncü adımda ok sola dönüyor.",
  steps: DIFF.map((d) => d.name),
  draw: (_v, step) => {
    const d = DIFF[step];
    const J = (d.A * d.dP) / d.T;
    const w = d.T * 0.6;
    const els: El[] = [
      rect(-w / 2, -d.A * 0.5, w / 2, d.A * 0.5, { tone: "c", fill: "c", thin: true }),
      txt(v(-2.6, 0), "alveol", "c", { small: true, bold: true }),
      txt(v(2.6, 0), "kan", "c", { small: true, bold: true }),
      txt(v(0, d.A * 0.5 + 0.2), `A = ${d.A}, T = ${d.T}`, "n", { small: true, tone: "c" }),
    ];
    const L = J * 0.35;
    els.push(arrow(v(L >= 0 ? -L / 2 : -L / 2, -2.6), v(L >= 0 ? L / 2 : L / 2, -2.6), J >= 0 ? "a" : "warn", { bold: true }));
    els.push(txt(v(0, -3.0), `J = 1 × ${d.A} × ${d.dP < 0 ? "(−3)" : d.dP} ÷ ${d.T} = ${J < 0 ? "−" : ""}${fmt(Math.abs(J), 1)}`, "s", { small: true, bold: true, tone: J >= 0 ? "a" : "warn" }));
    els.push(...pad(v(-3.6, 2.8), v(3.6, -3.8)));
    return { els, readout: [J >= 0 ? `J = ${fmt(J, 1)}: alveolden kana eğilim.` : `J = −${fmt(-J, 1)}: kandan alveole eğilim.`, "Önce gazı, yön tanımını ve hangi bölmenin basıncını kullandığını yaz."] };
  },
};

/* ---------------- Gaz taşınması ---------------- */

const hill = (p50: number, n = 2.7) => (x: number) => (x <= 0 ? 0 : x ** n / (x ** n + p50 ** n));
const dissociation: FigureDef = {
  caption:
    "Oksijen ayrışma eğrisi: yatay eksen O₂ kısmi basıncı, düşey eksen hemoglobin doygunluğu. İşbirlikli bağlanma eğriyi S biçimli yapar (nitel eğri, eksenlerde sayı yok, ölçekli değil). Akciğerin yüksek basıncı eğrinin yatık üst bölgesine, dokunun düşük basıncı dik bölgesine düşer.",
  alt: "S biçimli eğri: düşük basınçta yavaş, ortada dik, yüksek basınçta yatık artış. Üstte yüzde yüz çizgisi. Sağ üstte akciğer noktası, ortanın solunda doku noktası.",
  draw: () => {
    const X = 6;
    const H = 4;
    const f = hill(2.2);
    const els: El[] = [
      ...axes(X + 0.4, H + 0.6, "PO₂", "doygunluk"),
      seg(v(0, H), v(X, H), { thin: true, dash: true, tone: "muted" }),
      txt(v(-0.15, H), "%100", "w", { small: true, tone: "muted" }),
      curve((x) => H * f(x), 0, X, 60, { tone: "b", bold: true }),
      circle(v(5.4, H * f(5.4)), 0.12, { tone: "c", fill: "c" }),
      circle(v(1.7, H * f(1.7)), 0.12, { tone: "a", fill: "a" }),
      txt(v(5.4, H * f(5.4) - 0.3), "akciğer", "s", { small: true, bold: true, tone: "c" }),
      txt(v(1.85, H * f(1.7) - 0.05), "doku", "e", { small: true, bold: true, tone: "a" }),
      ...pad(v(-1.4, H + 1.0), v(X + 0.8, -0.8)),
    ];
    return { els, readout: ["%100 dört bağlanma yerinin ortalama tam doluluğudur; 100 mmHg ile aynı ölçü değildir.", "Sayısal değer ancak verilen eğriden ya da açık modelden okunur."] };
  },
};

const BOHR_P50 = (0.3 / 0.7) ** (1 / 2.7);
const bohr: FigureDef = {
  caption:
    "Bohr etkisi: CO₂ artışı ve pH düşüşü eğriyi sağa kaydırır. Bölümün örneğinde aynı O₂ basıncında doygunluk %70 yerine %50'dir: fark 20 yüzde puanı. Bu toplam O₂'nin %20 azaldığı demek değildir. Eğrilerin biçimi nitel modeldir; işaretli iki değer bölümdendir.",
  alt: "Aynı eksende iki S eğrisi: normal eğri solda, CO₂ yüksek ve pH düşük eğri sağda. Kesik dikey çizgi sabit bir basınçta iki eğriyi %70 ve %50 noktalarında kesiyor.",
  draw: () => {
    const H = 4;
    const S = 2.5;
    const f0 = hill(BOHR_P50);
    const f1 = hill(1);
    const els: El[] = [
      ...axes(6.4, H + 0.6, "PO₂", "doygunluk"),
      curve((x) => H * f0(x / S), 0, 6, 60, { tone: "b", bold: true }),
      curve((x) => H * f1(x / S), 0, 6, 60, { tone: "warn", bold: true, dash: true }),
      vmark(S, 0, H * 0.85, "a"),
      seg(v(0, H * 0.7), v(S, H * 0.7), { thin: true, dash: true, tone: "b" }),
      seg(v(0, H * 0.5), v(S, H * 0.5), { thin: true, dash: true, tone: "warn" }),
      txt(v(-0.15, H * 0.7), "%70", "w", { small: true, bold: true, tone: "b" }),
      txt(v(-0.15, H * 0.5), "%50", "w", { small: true, bold: true, tone: "warn" }),
      txt(v(S, -0.3), "aynı PO₂", "s", { small: true, tone: "a" }),
      txt(v(4.0, H * f0(4 / S) + 0.25), "normal", "nw", { small: true, bold: true, tone: "b" }),
      txt(v(4.4, H * f1(4.4 / S) - 0.35), "CO₂ ↑, pH ↓", "se", { small: true, bold: true, tone: "warn" }),
      ...pad(v(-1.3, H + 1.0), v(6.8, -0.9)),
    ];
    return { els, readout: ["Aynı basınçta %70 − %50 = 20 yüzde puanı; dokuya bırakma kolaylaşır.", "Toplam O₂ değişimi için hemoglobin miktarı ve çözünmüş katkı da gerekir."] };
  },
};

const co2Forms: FigureDef = {
  caption:
    "Kaynağın yaklaşık öğretim dağılımı: toplam CO₂'nin %7'si çözünmüş, %23'ü karbamino, %70'i bikarbonat biçiminde taşınır. Paylar aynı bütüne (toplam CO₂) göredir; %23, %93'lük bir alt grubun yüzdesi değildir.",
  alt: "Yüzde yüzlük tek yatay şerit: %7 çözünmüş, %23 karbamino, %70 bikarbonat bölümleri.",
  draw: () => {
    const K = 0.08;
    const parts: [string, number, Tone][] = [["çözünmüş %7", 7, "muted"], ["karbamino %23", 23, "c"], ["bikarbonat %70", 70, "b"]];
    const els: El[] = [];
    let x = 0;
    parts.forEach(([n, p, t], i) => {
      els.push(rect(x, 0, x + p * K, 0.8, { tone: t, fill: t, thin: true }));
      els.push(txt(v(x + (p * K) / 2, i === 0 ? 1.1 : i === 1 ? -0.3 : 0.4), n, i === 0 ? "n" : i === 1 ? "s" : "c", { small: true, bold: true }));
      x += p * K;
    });
    els.push(txt(v(4, -1.2), "toplam CO₂ = %100", "s", { small: true, tone: "muted" }), ...pad(v(-0.3, 1.9), v(8.3, -1.8)));
    return { els, readout: ["7 + 23 + 70 = 100: üç pay aynı paydaya göredir.", "Paylar tanımlı koşulların yaklaşık anlatımıdır; değişmez sabit değildir."] };
  },
};

const anhydrase: FigureDef = {
  caption:
    "Eritrositte karbonik anhidraz CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ dönüşümünü hızlandırır (özgün şema, ölçekli değil). Dokuda HCO₃⁻ plazmaya çıkar, Cl⁻ içeri girer; H⁺ hemoglobine bağlanır. Akciğerde yön döner: HCO₃⁻ geri girer, CO₂ oluşup alveole difüze olur.",
  alt: "Büyük daire eritrositi gösterir. İçinde CO₂ ve su, karbonik asit, H⁺ ve bikarbonat sırası. Zardan dışarı bikarbonat, içeri klorür okları. İkinci adımda bütün oklar ters yönde ve CO₂ alveole çıkıyor.",
  steps: ["Dokuda", "Akciğerde"],
  draw: (_v, step) => {
    const lung = step === 1;
    const els: El[] = [
      poly(ring(v(0, 0), 3.1, 48), { tone: "warn", thin: true, smooth: true }),
      txt(v(0, 3.4), "eritrosit", "n", { small: true, tone: "warn" }),
      txt(v(0, 2.0), "CO₂ + H₂O", "c", { small: true, bold: true }),
      txt(v(0, 0.3), "H₂CO₃ (CA hızlandırır)", "c", { small: true, bold: true }),
      txt(v(0, -1.4), "H⁺ + HCO₃⁻", "c", { small: true, bold: true }),
      txt(v(0, -2.65), "H⁺ – Hb tamponu", "c", { small: true, tone: "muted" }),
    ];
    const down = (y0: number, y1: number) => (lung ? arrow(v(0, y1), v(0, y0), "ink") : arrow(v(0, y0), v(0, y1), "ink"));
    els.push(down(1.65, 0.65), down(-0.05, -1.05));
    if (!lung) {
      els.push(arrow(v(-4.9, 2.0), v(-2.4, 2.0), "a", { bold: true }), txt(v(-5.0, 2.0), "dokudan CO₂", "w", { small: true, bold: true, tone: "a" }));
      els.push(arrow(v(1.75, -1.4), v(4.2, -1.4), "b", { bold: true }), txt(v(4.3, -1.4), "HCO₃⁻ plazmaya", "e", { small: true, tone: "b" }));
      els.push(arrow(v(4.2, -2.05), v(2.6, -2.05), "c"), txt(v(4.3, -2.05), "Cl⁻ içeri", "e", { small: true, tone: "c" }));
    } else {
      els.push(arrow(v(-2.4, 2.0), v(-4.9, 2.0), "a", { bold: true }), txt(v(-5.0, 2.0), "CO₂ alveole", "w", { small: true, bold: true, tone: "a" }));
      els.push(arrow(v(4.2, -1.4), v(1.75, -1.4), "b", { bold: true }), txt(v(4.3, -1.4), "HCO₃⁻ geri girer", "e", { small: true, tone: "b" }));
      els.push(arrow(v(2.6, -2.05), v(4.2, -2.05), "c"), txt(v(4.3, -2.05), "Cl⁻ dışarı", "e", { small: true, tone: "c" }));
    }
    els.push(...pad(v(-7.9, 3.8), v(7.9, -3.4)));
    return { els, readout: [lung ? "Akciğerde denge CO₂ ve su oluşumuna kayar; CO₂ alveole difüze edilir." : "Dokuda CO₂ bikarbonata dönüşür; önemli taşınan biçim plazmada bulunur.", "Kimyasal denge, difüzyon ve ventilasyon ayrı basamaklardır."] };
  },
};

export const biologyFigures059Circulation: Record<string, Record<string, FigureDef>> = {
  "dolasim-kalp": {
    "İki dolaşım, tek seri akış": circuits,
    "Ritmin başlangıcı ve iletim sırası": conduction,
    "Hacim sabit kasılmadan fırlatmaya": valveCycle,
    "Atım hacminden dakikalık debiye": strokeVolume,
  },
  "soluk-alisverisi": {
    "Kas hareketinden hava akışına nedensel sıra": causal,
    "Diyafram kasılınca kubbe aşağı iner": diaphragm,
    "Son inspirasyonda neden akış durabilir?": volumeFlow,
    "Alveoler, atmosferik ve plevral basınç": pressures,
    "Dakika ventilasyonu ile alveoler ventilasyon": ventilation,
    "Aynı toplam, farklı etkin yeni hava": sameTotal,
  },
  "solunum-organlar": {
    "Bronş ve bronşiyolü duvarıyla ayır": bronchi,
    "Akciğer lobu ile alveol aynı ölçek değildir": lobes,
    "Alveolde en az üç farklı hücresel rol": alveolus,
    "Hava ile kan arasında ince ama gerçek bir sınır var": barrier,
    "Difüzyon modelinde işaret ve birimi koru": diffusion,
  },
  "solunum-gaz-tasinmasi": {
    "Oksijen ayrışma eğrisini oku": dissociation,
    "Bohr etkisi: aynı basınçta iki ortam": bohr,
    "CO₂ üç temel biçimde taşınır": co2Forms,
    "Dokuda karbonik anhidraz ve tampon": anhydrase,
  },
};
