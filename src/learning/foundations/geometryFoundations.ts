import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "../sectionFigures/figureKit";
import type { FoundationLesson } from "./types";

/*
 * TYT Geometri · Temel İnşa ön dersleri. Şekiller ölçeklidir (açılar gerçek
 * açı, kareler gerçek oran); bütün örnek ve sorular özgündür.
 */

const rad = (d: number) => (d * Math.PI) / 180;
const pol = (r: number, d: number, o: V = v(0, 0)): V => v(o[0] + r * Math.cos(rad(d)), o[1] + r * Math.sin(rad(d)));
const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const arc = (o: V, r: number, a0: number, a1: number, tone: Tone): El => {
  const pts: V[] = [];
  const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / 6));
  for (let i = 0; i <= n; i++) pts.push(pol(r, a0 + ((a1 - a0) * i) / n, o));
  return poly(pts, { open: true, tone, thin: true });
};

// ─── 1 · Nokta, doğru, ışın ve açı ───────────────────────────────────────────
const OBJ = [
  { label: "Nokta A", detail: ["Yalnız konum belirtir; uzunluğu, genişliği yoktur.", "Büyük harfle adlandırılır: A."] },
  { label: "Doğru AB", detail: ["İki yönde sonsuza uzanır; ölçülemez.", "Gösterim: iki uçta ok."] },
  { label: "Doğru parçası [AB]", detail: ["A ve B uç noktaları arasında kalan kısım; uzunluğu ölçülür.", "|AB| = 4 birim gibi yazılır."] },
  { label: "Işın [AB", detail: ["A’dan başlar, B yönünde sonsuza gider.", "Başlangıç noktası köşeli parantezle gösterilir."] },
];
const objects: FigureDef = {
  caption:
    "Geometrinin dört temel nesnesi. Birine tıkla: neyin sonlu, neyin sonsuz olduğu ve nasıl gösterildiği açılır. Doğru ölçülemez; doğru parçası ölçülür.",
  alt: "Dört satır: tek nokta, iki ucu oklu doğru, iki uç noktalı doğru parçası, tek ucu oklu ışın.",
  picks: OBJ.map((o) => ({ label: o.label, title: o.label, detail: o.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const row = (i: number) => -i * 1.0;
    const tone = (i: number): Tone => (pick === i ? "a" : "ink");
    els.push(ball(v(4.4, row(0)), 0.1, tone(0)), txt(v(4.4, row(0) + 0.32), "A", "c", { small: true }));
    els.push(vec(v(3.4, row(1)), v(2.5, row(1)), { tone: tone(1) }), vec(v(3.4, row(1)), v(6.2, row(1)), { tone: tone(1) }));
    els.push(seg(v(3.4, row(2)), v(5.6, row(2)), { tone: tone(2), bold: pick === 2 }), ball(v(3.4, row(2)), 0.08, tone(2)), ball(v(5.6, row(2)), 0.08, tone(2)));
    els.push(vec(v(3.4, row(3)), v(6.2, row(3)), { tone: tone(3) }), ball(v(3.4, row(3)), 0.08, tone(3)));
    OBJ.forEach((o, i) => els.push(txt(v(0, row(i)), o.label, "e", { small: true, bold: pick === i, tone: tone(i), pick: i })));
    els.push(txt(v(-0.3, 0.6), " ", "c"), txt(v(6.6, -3.5), " ", "c"));
    return { els, readout: [pick >= 0 ? OBJ[pick].detail[0] : "Bir nesneye tıkla.", "Uzunluk yalnız uç noktaları olan nesnede anlamlıdır."] };
  },
};

const kind = (a: number) => (a === 0 ? "sıfır açı" : a < 90 ? "dar açı" : a === 90 ? "dik açı" : a < 180 ? "geniş açı" : a === 180 ? "doğru açı" : a < 360 ? "180°’den büyük (yansı) açı" : "tam açı");
const angleKinds: FigureDef = {
  caption:
    "Açı, aynı noktadan (köşe) çıkan iki ışının arasındaki açıklıktır; derece (°) ile ölçülür. Açıyı değiştir: 0°–90° arası dar, tam 90° dik, 90°–180° arası geniş, 180° doğru açı, 360° tam açıdır.",
  alt: "Köşeden sağa uzanan sabit ışın ve seçilen açı kadar dönmüş ikinci ışın; aradaki yay ve derece.",
  param: { label: "Açı", min: 0, max: 360, step: 15, init: 60, unit: "°", plain: true },
  draw: (a) => {
    const O = v(0, 0), R = 2.2;
    const els: El[] = [vec(O, v(R + 0.4, 0), { bold: true }), vec(O, pol(R + 0.4, a), { bold: true, tone: "a" })];
    if (a === 90) els.push(poly([v(0.35, 0), v(0.35, 0.35), v(0, 0.35)], { open: true, thin: true, tone: "b" }));
    else if (a > 0) els.push(arc(O, 0.6, 0, a, "b"));
    els.push(ball(O, 0.08, "ink"), txt(v(3.4, 1.2), `${a}°`, "e", { bold: true, tone: "a" }), txt(v(3.4, 0.6), kind(a), "e", { small: true }));
    els.push(txt(v(-2.8, 2.9), " ", "c"), txt(v(6.6, -2.9), " ", "c"));
    return { els, readout: [`${a}°: ${kind(a)}.`, "Dik açı köşede küçük kareyle gösterilir."] };
  },
};

const PAIRS = [
  { label: "Tümler: toplam 90°", a: 35, b: 55, total: 90, detail: ["35° + 55° = 90°.", "Bir açının tümleri = 90° − açı."] },
  { label: "Bütünler: toplam 180°", a: 35, b: 145, total: 180, detail: ["35° + 145° = 180°.", "Bir doğru üzerindeki komşu açılar bütünlerdir."] },
  { label: "Ters açılar: eşit", a: 35, b: 35, total: 0, detail: ["Kesişen iki doğruda karşı karşıya duran açılar eşittir.", "Komşu olanlar ise bütünlerdir: 35° ve 145°."] },
];
const pairFig: FigureDef = {
  caption: "Açı çiftleri toplamlarına göre ad alır. Bir çifte tıkla: 35°’lik açının tümleri, bütünleri ya da ters açısı şekilde işaretlenir.",
  alt: "Seçilen ilişkiye göre iki açı: tümlerde dik köşe, bütünlerde doğru üzerinde, ters açılarda kesişen iki doğru.",
  picks: PAIRS.map((p) => ({ label: p.label, title: p.label, detail: p.detail })),
  draw: (_v, _s, pick = -1) => {
    const P = PAIRS[pick >= 0 ? pick : 0], O = v(0, 0), R = 2.0;
    const els: El[] = [];
    if (P.total === 90) {
      els.push(vec(O, v(R, 0)), vec(O, v(0, R)), vec(O, pol(R, 35), { tone: "a" }), arc(O, 0.7, 0, 35, "b"), arc(O, 0.9, 35, 90, "c"));
      els.push(txt(pol(1.15, 17), "35°", "e", { small: true, tone: "b" }), txt(pol(1.2, 66), "55°", "e", { small: true, tone: "c" }));
    } else if (P.total === 180) {
      els.push(vec(O, v(R, 0)), vec(O, v(-R, 0)), vec(O, pol(R, 35), { tone: "a" }), arc(O, 0.7, 0, 35, "b"), arc(O, 0.9, 35, 180, "c"));
      els.push(txt(pol(1.15, 17), "35°", "e", { small: true, tone: "b" }), txt(pol(1.25, 110), "145°", "c", { small: true, tone: "c" }));
    } else {
      els.push(seg(pol(R, 35), pol(R, 215)), seg(v(-R, 0), v(R, 0)), arc(O, 0.7, 0, 35, "b"), arc(O, 0.7, 180, 215, "b"));
      els.push(txt(pol(1.15, 17), "35°", "e", { small: true, tone: "b" }), txt(pol(1.15, 197), "35°", "w", { small: true, tone: "b" }));
    }
    PAIRS.forEach((p, i) => els.push(txt(v(-2.6, -2.6 - i * 0.55), p.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-2.8, 2.4), " ", "c"), txt(v(3.0, -4.0), " ", "c"));
    return { els, readout: [P.detail[0], P.detail[1]] };
  },
};

// ─── 2 · Açıölçer ve birimler ────────────────────────────────────────────────
const protractor: FigureDef = {
  caption:
    "Açıölçerin merkezini açının köşesine, 0 çizgisini bir ışına koy. İki ölçek vardır: burada mavi ölçek sağdaki 0’dan, gri ölçek soldaki 0’dan başlar. Sabit ışın sağdaki 0’da olduğu için mavi ölçeği oku. Açıyı değiştir ve iki ölçeğin toplamının hep 180 olduğunu gör.",
  alt: "Yarım daire açıölçer; dışta mavi, içte gri ölçek; merkezden sağa sabit ışın ve seçilen açıda ikinci ışın.",
  param: { label: "Açı", min: 0, max: 180, step: 10, init: 50, unit: "°", plain: true },
  draw: (a) => {
    const O = v(0, 0), R = 2.6;
    const els: El[] = [arc(O, R, 0, 180, "muted"), seg(v(-R, 0), v(R, 0), { thin: true, tone: "muted" })];
    for (let d = 0; d <= 180; d += 10) {
      els.push(seg(pol(R, d), pol(R - (d % 30 === 0 ? 0.3 : 0.15), d), { thin: true, tone: "muted" }));
      // Işınların üstüne düşen etiketler yazılmaz; değerler aşağıdaki okumada.
      if (d % 30 === 0 && d !== 0 && d !== a) els.push(txt(pol(R + 0.3, d), String(d), "c", { small: true, tone: "b" }), txt(pol(R - 0.6, d), String(180 - d), "c", { small: true, tone: "muted" }));
    }
    els.push(vec(O, v(R + 0.4, 0), { bold: true }), vec(O, pol(R + 0.4, a), { bold: true, tone: "a" }), ball(O, 0.08, "ink"));
    els.push(txt(v(R + 0.3, -0.35), "0", "c", { small: true, tone: "b" }));
    els.push(txt(v(-3.4, -0.6), `mavi ölçek: ${a}°`, "e", { small: true, bold: true, tone: "a" }), txt(v(-3.4, -1.1), `gri ölçek: ${180 - a}°`, "e", { small: true, tone: "muted" }));
    els.push(txt(v(-3.6, 3.2), " ", "c"), txt(v(3.6, -1.4), " ", "c"));
    return { els, readout: [`Sabit ışın sağdaki 0’da, o 0 mavi ölçekte: doğru okuma ${a}°.`, `Yanlış ölçekten okursan ${180 - a}° bulursun; açı dar mı geniş mi diye göz kontrolü yap.`] };
  },
};

const UNITS = ["1 m = 10 dm", "1 m² = 10 × 10 dm²", "1 m² = 10 000 cm²"];
const square: FigureDef = {
  caption:
    "Uzunluk birimi 10’ar katlanırken alan birimi 100’er katlanır, çünkü alan iki yönde ölçülür. Adımları ilerlet: 1 m kenarlı kare her kenarda 10 dm’ye bölünür; içinde 10 × 10 = 100 küçük kare oluşur.",
  alt: "1 metre kenarlı kare; adımlarla kenar 10 eşit parçaya, sonra iç 100 kareye bölünüyor.",
  steps: UNITS,
  draw: (_v, step) => {
    const S = 3.2, n = 10, c = S / n;
    const els: El[] = [rect(0, S, -S, 0, "b", step === 0)];
    if (step >= 0) for (let i = 1; i < n; i++) els.push(seg(v(i * c, 0), v(i * c, 0.15), { thin: true }));
    if (step >= 1) for (let i = 1; i < n; i++) els.push(seg(v(i * c, 0), v(i * c, -S), { thin: true, tone: "muted" }), seg(v(0, -i * c), v(S, -i * c), { thin: true, tone: "muted" }));
    if (step >= 1) els.push(rect(0, c, -c, 0, "a"));
    els.push(txt(v(S / 2, 0.45), step === 0 ? "1 m = 10 dm" : "10 dm", "c", { small: true, bold: true }));
    els.push(txt(v(S + 0.4, -S / 2), step === 0 ? "kenar 1 m" : step === 1 ? "100 dm²" : "100 × 100 cm²", "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.3, 0.9), " ", "c"), txt(v(6.6, -S - 0.3), " ", "c"));
    return { els, readout: [step === 0 ? "Uzunlukta 1 m = 10 dm = 100 cm." : step === 1 ? "Alanda 1 m² = 100 dm² (10 × 10)." : "1 m² = 100 cm × 100 cm = 10 000 cm².", "Hacimde üç yön: 1 m³ = 1 000 dm³ = 1 000 000 cm³; 1 dm³ = 1 L."] };
  },
};

// ─── 3 · Üçgen ve dörtgen tanıma ─────────────────────────────────────────────
const TRI = [
  { label: "Eşkenar", pts: [v(0, 0), v(2, 0), v(1, 1.732)], detail: ["Üç kenar eşit; her açı 60°.", "Her eşkenar üçgen ikizkenardır da."] },
  { label: "İkizkenar", pts: [v(0, 0), v(2, 0), v(1, 2.4)], detail: ["En az iki kenar eşit; tabandaki iki açı eşit.", "Eşit kenarlar çentikle işaretlenir."] },
  { label: "Çeşitkenar", pts: [v(0, 0), v(2.6, 0), v(0.7, 1.6)], detail: ["Üç kenar da farklı; açılar da farklı."] },
  { label: "Dik", pts: [v(0, 0), v(2.4, 0), v(0, 1.8)], detail: ["Bir açısı 90°; diğer ikisinin toplamı 90°.", "Dik açının karşısındaki en uzun kenara hipotenüs denir."] },
  { label: "Geniş açılı", pts: [v(0, 0), v(2.8, 0), v(-0.6, 1.0)], detail: ["Bir açısı 90°’den büyük.", "Bir üçgende en fazla bir geniş açı olabilir."] },
];
const triangles: FigureDef = {
  caption:
    "Üçgenler kenarlarına (eşkenar, ikizkenar, çeşitkenar) ya da açılarına (dar, dik, geniş açılı) göre adlanır. Bir türe tıkla: şekli çizilir ve ayırt edici özelliği açılır. Bir üçgen hem ikizkenar hem dik olabilir.",
  alt: "Seçilen türde bir üçgen; altında beş tür etiketi.",
  picks: TRI.map((t) => ({ label: t.label, title: `${t.label} üçgen`, detail: t.detail })),
  draw: (_v, _s, pick = -1) => {
    const T = TRI[pick >= 0 ? pick : 0];
    const els: El[] = [poly(T.pts.map((p) => v(p[0] * 1.2, p[1] * 1.2)), { fill: "b", tone: "b", bold: true })];
    if (T.label === "Dik") els.push(poly([v(0.3, 0), v(0.3, 0.3), v(0, 0.3)], { open: true, thin: true, tone: "a" }));
    TRI.forEach((t, i) => els.push(txt(v(-1.4 + (i % 3) * 2.0, -0.8 - Math.floor(i / 3) * 0.55), t.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-1.6, 3.2), " ", "c"), txt(v(4.6, -2.0), " ", "c"));
    return { els, readout: [pick >= 0 ? T.detail[0] : "Bir türe tıkla (varsayılan: eşkenar).", "İç açıların toplamı her üçgende 180°."] };
  },
};

const SUM = ["Üçgen", "Köşeleri işaretle", "Köşeleri yan yana getir", "Doğru açı: 180°"];
const sum180: FigureDef = {
  caption:
    "Bir kâğıt üçgenin üç köşesini kopar ve yan yana diz: üç açı birlikte düz bir doğru oluşturur. Adımları ilerlet: 50°, 60° ve 70° yan yana gelince 180° olur. Bu yüzden iki açı biliniyorsa üçüncüsü 180’den çıkarılarak bulunur.",
  alt: "Açıları 50°, 60°, 70° olan üçgen; adımlarla üç açı bir noktada yan yana dizilip doğru açı oluşturuyor.",
  steps: SUM,
  draw: (_v, step) => {
    const A = v(0, 0), B = v(3.2, 0), C = pol(3.2 * Math.sin(rad(60)) / Math.sin(rad(70)), 50, A);
    const els: El[] = [];
    const tones: Tone[] = ["a", "b", "c"];
    if (step < 2) {
      els.push(poly([A, B, C], { tone: "ink", bold: true }));
      if (step >= 1) {
        els.push(arc(A, 0.5, 0, 50, tones[0]), arc(B, 0.5, 180 - 60, 180, tones[1]), arc(C, 0.5, 230, 230 + 70, tones[2]));
        els.push(txt(pol(0.85, 25, A), "50°", "c", { small: true, tone: tones[0] }), txt(pol(0.85, 150, B), "60°", "c", { small: true, tone: tones[1] }), txt(pol(0.95, 265, C), "70°", "c", { small: true, tone: tones[2] }));
      }
    } else {
      const O = v(1.6, 0.4);
      els.push(seg(v(-0.4, 0.4), v(3.6, 0.4), { thin: true, tone: "muted" }));
      [[0, 50], [50, 120], [120, 180]].forEach(([a0, a1], i) => {
        els.push(seg(O, pol(1.6, a0, O), { tone: tones[i] }), arc(O, 0.6 + i * 0.12, a0, a1, tones[i]));
        els.push(txt(pol(1.2, (a0 + a1) / 2, O), ["50°", "70°", "60°"][i], "c", { small: true, bold: true, tone: tones[i] }));
      });
      if (step === 3) els.push(txt(v(1.6, -0.4), "50° + 70° + 60° = 180°", "c", { small: true, bold: true, tone: "a" }));
    }
    els.push(txt(v(-0.7, 3.2), " ", "c"), txt(v(4.0, -0.8), " ", "c"));
    return { els, readout: [step < 2 ? "Üç iç açıyı ayrı renklerle işaretle." : step === 2 ? "Üç köşe aynı noktada yan yana." : "Düz doğru: 180°.", "Örnek: açılardan ikisi 50° ve 60° ise üçüncü 180 − 110 = 70°."] };
  },
};

const QUADS = [
  { label: "Kare", pts: [v(0, 0), v(1.8, 0), v(1.8, 1.8), v(0, 1.8)], detail: ["Dört kenar eşit, dört açı 90°.", "Her kare hem dikdörtgen hem eşkenar dörtgendir."] },
  { label: "Dikdörtgen", pts: [v(0, 0), v(2.8, 0), v(2.8, 1.6), v(0, 1.6)], detail: ["Dört açı 90°, karşılıklı kenarlar eşit.", "Her dikdörtgen kare değildir."] },
  { label: "Eşkenar dörtgen", pts: [v(0, 0), v(1.8, 0), v(2.8, 1.5), v(1.0, 1.5)], detail: ["Dört kenar eşit; açılar 90° olmak zorunda değil."] },
  { label: "Paralelkenar", pts: [v(0, 0), v(2.6, 0), v(3.4, 1.4), v(0.8, 1.4)], detail: ["Karşılıklı kenarlar paralel ve eşit.", "Kare, dikdörtgen ve eşkenar dörtgen özel paralelkenarlardır."] },
  { label: "Yamuk", pts: [v(0, 0), v(3.2, 0), v(2.4, 1.4), v(0.8, 1.4)], detail: ["Yalnız bir çift kenar paralel (tabanlar)."] },
];
const quads: FigureDef = {
  caption:
    "Dörtgenler bir aile ağacı gibidir: özel olanlar genel olanların bütün özelliklerini taşır. Bir dörtgene tıkla: şekli çizilir, özellikleri ve hangi ailenin üyesi olduğu açılır. İç açılar toplamı her dörtgende 360°.",
  alt: "Seçilen dörtgenin çizimi; altında beş dörtgen etiketi.",
  picks: QUADS.map((q) => ({ label: q.label, title: q.label, detail: q.detail })),
  draw: (_v, _s, pick = -1) => {
    const Q = QUADS[pick >= 0 ? pick : 0];
    const els: El[] = [poly(Q.pts, { fill: "b", tone: "b", bold: true })];
    QUADS.forEach((q, i) => els.push(txt(v(-0.6 + (i % 3) * 1.9, -0.8 - Math.floor(i / 3) * 0.55), q.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.8, 2.6), " ", "c"), txt(v(5.4, -2.0), " ", "c"));
    return { els, readout: [pick >= 0 ? Q.detail[0] : "Bir dörtgene tıkla (varsayılan: kare).", "Dörtgen bir köşegenle iki üçgene ayrılır: 2 × 180° = 360°."] };
  },
};

export const geometryFoundations: FoundationLesson[] = [
  {
    id: "temel-geo-nokta-dogru-aci",
    subjectId: "tyt-geometri",
    title: "Nokta, doğru, ışın ve açı",
    minutes: 20,
    prepares: ["tyt-geo-temel-acilar-031", "tyt-geo-ucgende-acilar-031"],
    goal: "Geometrinin temel nesnelerini ayırmak, açıyı ölçü ve türüyle adlandırmak, tümler–bütünler–ters açıları tanımak.",
    pages: [
      {
        title: "Dört temel nesne",
        paragraphs: [
          "Nokta yalnız bir konumdur. Doğru iki yönde sonsuza gider; doğru parçası iki uç nokta arasında kalan, ölçülebilen kısımdır; ışın bir noktadan başlayıp tek yönde sonsuza gider.",
          "Sorularda “uzunluk” yalnız doğru parçası için sorulur: |AB| = 5 cm, A ile B arasının uzunluğudur.",
        ],
        terms: [["Uç nokta", "Doğru parçasının başladığı ve bittiği noktalar."]],
        figure: objects,
      },
      {
        title: "Açı ve türleri",
        paragraphs: [
          "Aynı noktadan çıkan iki ışın bir açı oluşturur; ortak noktaya köşe denir. Açının büyüklüğü ışınların uzunluğuna değil, aradaki dönmeye bağlıdır.",
          "Açılar büyüklüklerine göre dar (90°’den küçük), dik (tam 90°), geniş (90° ile 180° arası) ve doğru açı (180°) diye adlanır.",
        ],
        terms: [["Derece (°)", "Tam dönüşün 360’ta biri."]],
        figure: angleKinds,
        predict: { question: "Saat 3’te akrep ile yelkovan arasındaki açı nedir?", answer: "90°: dik açı (tam dönüşün dörtte biri)." },
      },
      {
        title: "Açı çiftleri",
        paragraphs: ["Toplamı 90° olan iki açı tümler, toplamı 180° olan iki açı bütünlerdir. Kesişen iki doğruda karşı karşıya duran açılar (ters açılar) eşittir."],
        figure: pairFig,
        predict: { question: "40°’nin bütünleri kaç derecedir?", answer: "140°: 180 − 40." },
      },
    ],
    examples: [
      { title: "Tümler ve bütünler", given: "Bir açı 28°. Tümleri ve bütünleri nedir?", steps: ["Tümler: 90 − 28 = 62°.", "Bütünler: 180 − 28 = 152°."], answer: "62° ve 152°", check: "Bütünler, tümlerden her zaman 90° büyüktür: 152 − 62 = 90 ✓." },
      { title: "Ters açılar", given: "Kesişen iki doğrudan oluşan açılardan biri 115°. Diğer üç açı nedir?", steps: ["Ters açısı eşit: 115°.", "Komşu açılar bütünler: 180 − 115 = 65°.", "Dördüncü açı 65°’nin ters açısı: 65°."], answer: "115°, 65°, 65°", check: "Toplam 115 + 115 + 65 + 65 = 360° (tam açı) ✓." },
    ],
    checks: [
      { prompt: "35°’lik bir açının tümleri kaç derecedir?", options: ["145°", "55°", "65°", "35°", "325°"], answer: 1, explain: "90 − 35 = 55.", reasons: ["Bütünleri hesaplanmış.", "Doğru.", "Çıkarma hatası.", "Ters açı ile karıştırılmış.", "360’tan çıkarılmış."] },
      { prompt: "Ölçüsü 120° olan açı hangi türdendir?", options: ["Dar açı", "Dik açı", "Geniş açı", "Doğru açı", "Tam açı"], answer: 2, explain: "90° ile 180° arasında: geniş açı.", reasons: ["Dar açı 90°’den küçüktür.", "Dik açı tam 90°’dir.", "Doğru.", "Doğru açı 180°’dir.", "Tam açı 360°’dir."] },
      { prompt: "Hangisinin uzunluğu ölçülebilir?", options: ["AB doğrusu", "[AB ışını", "[AB] doğru parçası", "A noktası", "AB doğrusu ve [AB ışını"], answer: 2, explain: "Yalnız doğru parçasının iki uç noktası vardır.", reasons: ["Doğru sonsuza uzanır.", "Işın bir yönde sonsuza gider.", "Doğru.", "Noktanın uzunluğu yoktur.", "İkisi de sonsuzdur."] },
    ],
  },
  {
    id: "temel-geo-aciolcer-birimler",
    subjectId: "tyt-geometri",
    title: "Açıölçer ve uzunluk, alan, hacim birimleri",
    minutes: 20,
    prepares: ["tyt-geo-temel-acilar-031", "tyt-geo-dik-prizmalar-032", "alan-donusumleri"],
    goal: "Açıölçerde doğru ölçeği okumak; uzunluk, alan ve hacim birimleri arasında 10, 100, 1000 katlarını ayırmak.",
    pages: [
      {
        title: "Açıölçeri okumak",
        paragraphs: [
          "Açıölçerin merkezi köşeye, 0 çizgisi ışınlardan birine oturur. Açıölçerde iki sayı dizisi vardır; ışının üstündeki 0 hangi dizideyse o diziyi okumalısın.",
          "Okuduğun sayıyı gözle denetle: açı küçük görünüyorsa sonuç 90’dan küçük olmalıdır.",
        ],
        figure: protractor,
      },
      {
        title: "Uzunluk, alan, hacim",
        paragraphs: [
          "Uzunluk tek yönde ölçülür (cm, m, km). 1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm.",
          "Alan iki yönde ölçülür, bu yüzden birim çarpanının karesi alınır: 1 m² = 100 cm × 100 cm = 10 000 cm². Hacim üç yöndedir: 1 m³ = 1 000 000 cm³ ve 1 dm³ = 1 litre.",
        ],
        terms: [["cm²", "Kenarı 1 cm olan karenin alanı."], ["dm³", "Kenarı 1 dm (10 cm) olan küpün hacmi; 1 litre."]],
        figure: square,
        predict: { question: "1 m² kaç cm² eder: 100 mü, 10 000 mi?", answer: "10 000: hem en hem boy 100 cm." },
      },
    ],
    examples: [
      { title: "Alan dönüşümü", given: "2,5 m² kaç cm²?", steps: ["1 m² = 10 000 cm².", "2,5 × 10 000 = 25 000."], answer: "25 000 cm²", check: "Küçük birime geçerken sayı büyür ✓." },
      { title: "Hacim ve litre", given: "Ayrıtları 20 cm, 30 cm, 50 cm olan kutu kaç litre alır?", steps: ["Hacim = 20 × 30 × 50 = 30 000 cm³.", "1 L = 1 dm³ = 1000 cm³.", "30 000 ÷ 1000 = 30."], answer: "30 L", check: "dm cinsinden: 2 × 3 × 5 = 30 dm³ = 30 L ✓." },
    ],
    checks: [
      { prompt: "2 m² kaç cm²’dir?", options: ["200", "2 000", "20 000", "200 000", "0,02"], answer: 2, explain: "2 × 10 000 = 20 000.", reasons: ["Uzunluk çarpanı (100) kullanılmış.", "Çarpan 1000 sanılmış.", "Doğru.", "Bir sıfır fazla.", "Ters yönde bölünmüş."] },
      { prompt: "3,5 km kaç metredir?", options: ["35", "350", "3 500", "35 000", "0,35"], answer: 2, explain: "1 km = 1000 m: 3,5 × 1000.", reasons: ["10 ile çarpılmış.", "100 ile çarpılmış.", "Doğru.", "10 000 ile çarpılmış.", "Bölünmüş."] },
      { prompt: "Açının bir ışını açıölçerin sağındaki 0 çizgisinde. Sağdaki 0’ın bulunduğu ölçek öbür ışında 40’ı, diğer ölçek 140’ı gösteriyor. Açı kaçtır?", options: ["140°", "40°", "180°", "100°", "220°"], answer: 1, explain: "Işının başladığı 0’ın ölçeği okunur: 40° (açı dar görünmeli).", reasons: ["Yanlış ölçek okunmuş.", "Doğru.", "İki ölçek toplanmış.", "İki ölçeğin farkı alınmış.", "Ölçekler karıştırılıp 180’e eklenmiş."] },
    ],
  },
  {
    id: "temel-geo-ucgen-dortgen-tanima",
    subjectId: "tyt-geometri",
    title: "Temel üçgen ve dörtgen tanıma",
    minutes: 20,
    prepares: ["tyt-geo-ucgende-acilar-031", "tyt-geo-dortgen-hiyerarsi-032", "tyt-geo-paralelkenar-ozel-dortgenler-032"],
    goal: "Üçgen ve dörtgen türlerini kenar ve açı özelliklerinden tanımak; üçgende 180°, dörtgende 360° iç açı toplamını kullanmak.",
    pages: [
      {
        title: "Üçgen türleri",
        paragraphs: ["Üçgenler kenar uzunluklarına ve açılarına göre ayrı ayrı adlanır. Bir üçgenin iki adı olabilir: ikizkenar dik üçgen gibi."],
        figure: triangles,
      },
      {
        title: "İç açılar toplamı 180°",
        paragraphs: ["Her üçgenin iç açıları toplamı 180°’dir. Bunu görmek için köşeleri kopar ve yan yana diz: düz bir doğru oluşur."],
        figure: sum180,
        predict: { question: "Bir üçgenin iki açısı 90° ve 30° ise üçüncüsü kaçtır?", answer: "60°: 180 − 120." },
      },
      {
        title: "Dörtgen ailesi",
        paragraphs: [
          "Paralelkenarda karşılıklı kenarlar paraleldir. Açıları 90° olan paralelkenar dikdörtgen, kenarları eşit olan eşkenar dörtgen, ikisi birden olan karedir. Yamukta yalnız bir çift kenar paraleldir.",
        ],
        terms: [["Paralel", "Hiç kesişmeyen, aralarındaki uzaklık sabit kalan doğrular."]],
        figure: quads,
      },
    ],
    examples: [
      { title: "Eksik açı", given: "Bir üçgenin açıları 2x, 3x ve 4x’tir. x kaçtır?", steps: ["Toplam: 2x + 3x + 4x = 9x.", "9x = 180.", "x = 20."], answer: "x = 20 (açılar 40°, 60°, 80°)", check: "40 + 60 + 80 = 180 ✓." },
      { title: "Dörtgende açı", given: "Bir dörtgenin üç açısı 90°, 100° ve 70°. Dördüncü açı nedir?", steps: ["İç açılar toplamı 360°.", "90 + 100 + 70 = 260.", "360 − 260 = 100."], answer: "100°", check: "Toplam 360 ✓." },
    ],
    checks: [
      { prompt: "Bir üçgenin iki açısı 50° ve 60°’dir. Üçüncü açı kaçtır?", options: ["70°", "110°", "250°", "80°", "60°"], answer: 0, explain: "180 − 110 = 70.", reasons: ["Doğru.", "İki açının toplamı yazılmış.", "360’tan çıkarılmış.", "Hesap hatası.", "Eşkenar sanılmış."] },
      { prompt: "Kenarları 5 cm, 5 cm ve 8 cm olan üçgen hangi türdendir?", options: ["Eşkenar", "İkizkenar", "Çeşitkenar", "Kesinlikle dik", "Üçgen olamaz"], answer: 1, explain: "İki kenar eşit: ikizkenar.", reasons: ["Üç kenar eşit değil.", "Doğru.", "İki kenar eşit olduğu için çeşitkenar değil.", "Kenarlardan dik olduğu çıkmaz (5² + 5² ≠ 8²).", "5 + 5 > 8 olduğu için üçgen kurulur."] },
      { prompt: "Hangisi her zaman doğrudur?", options: ["Her dikdörtgen bir karedir.", "Her kare bir dikdörtgendir.", "Her paralelkenar bir dikdörtgendir.", "Her yamuk bir paralelkenardır.", "Her eşkenar dörtgen bir karedir."], answer: 1, explain: "Karenin bütün açıları 90° ve karşılıklı kenarları eşittir: dikdörtgenin bütün koşulları sağlanır.", reasons: ["Dikdörtgenin kenarları eşit olmayabilir.", "Doğru.", "Paralelkenarın açıları 90° olmayabilir.", "Yamukta yalnız bir çift kenar paraleldir.", "Eşkenar dörtgenin açıları 90° olmayabilir."] },
    ],
  },
];
