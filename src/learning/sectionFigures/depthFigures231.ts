import { poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { rect } from "./mathFigures060TytKit";
import { pad } from "./physicsFigures058Kit";
import {
  clock231, humidRows231, humidSection231, juneDecl231, juneRows231, juneSection231, latText231, layerSection231, layers231,
  lonText231, meridianRows231, meridianSection231, modelTop231, num231, reference231, scaleRows231, scaleSection231, scaleText231,
  thickness231, vapour231,
} from "../depth231";

/*
 * 0.231 TYT Coğrafya tablo bölümlerinin çizimleri. Çubuk uzunlukları,
 * sınırlar ve okumalar tabloyu üreten aynı depth231 verilerinden gelir.
 * Çizimler şematiktir; adım değiştirmek öğrenme kaydı üretmez.
 */

const check231 = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depthFigures231: ${claim}`);
};
const deg = (x: number) => `${num231(x)}°`;

/* ---------- Dünya: 21 Haziran’da enleme göre öğle yüksekliği ---------- */

const H_SCALE = 6 / 90;
const ROW = 0.78;
const LABEL_X = -1.25;
const minH = Math.min(...juneRows231.map((r) => r.h));
check231(minH * H_SCALE > LABEL_X + 0.2, "eksi çubuk enlem etiketine ulaşmamalı");
const juneFigure: FigureDef = {
  caption: `Her satır bir enlemdir; çubuk o enlemde 21 Haziran’ın öğle yüksekliğidir (h, derece). Kesikli çizgi h = 90°, yani başucudur ve yalnız dik ışının geldiği ${latText231(juneDecl231)} satırı ona ulaşır. Sıfırın solundaki çubuk Güneş’in öğlede bile ufkun altında kaldığını gösterir.`,
  alt: `Sekiz adımlı yatay çubuk grafiği. ${juneRows231.map((r) => `${latText231(r.phi)}: ${deg(r.h)}, Güneş ${r.sun}, gündüz ${r.day}`).join("; ")}.`,
  steps: juneRows231.map((r) => latText231(r.phi)),
  draw: (_value, step) => {
    const cur = juneRows231[step];
    const els: El[] = [];
    const bottom = -(juneRows231.length - 1) * ROW - 0.45;
    els.push(
      seg(v(0, 0.55), v(0, bottom), { tone: "muted", thin: true }),
      seg(v(90 * H_SCALE, 0.55), v(90 * H_SCALE, bottom), { tone: "warn", dash: true, thin: true }),
      txt(v(0, 0.85), "0°", "c", { small: true, tone: "muted" }),
      txt(v(90 * H_SCALE, 0.85), "90° başucu", "c", { small: true, tone: "warn" }),
    );
    juneRows231.forEach((r, i) => {
      const y = -i * ROW;
      const sel = r === cur;
      const w = r.h * H_SCALE;
      const tone: Tone = sel ? "a" : "muted";
      els.push(
        txt(v(LABEL_X, y), latText231(r.phi), "w", { small: true, bold: sel, tone: sel ? "ink" : "muted" }),
        poly([v(Math.min(0, w), y - 0.2), v(Math.max(0, w), y - 0.2), v(Math.max(0, w), y + 0.2), v(Math.min(0, w), y + 0.2)], sel ? { tone, fill: tone, bold: true } : { tone, thin: true }),
        txt(v(Math.max(0, w) + 0.15, y), deg(r.h), "e", { small: true, bold: sel, tone: "ink" }),
      );
    });
    return {
      els: [...els, ...pad(LABEL_X - 0.2, 1.1, 90 * H_SCALE + 1.4, bottom - 0.1)],
      readout: [
        `${latText231(cur.phi)}: h = 90° − |${num231(cur.phi)} − ${num231(juneDecl231)}| = ${deg(cur.h)}.`,
        `Öğle Güneşi ${cur.sun}; dik çubuğun gölgesi ${cur.shadow}.`,
        `İdeal gündüz: ${cur.day}.`,
      ],
    };
  },
};

/* ---------- Coğrafi konum: başlangıç meridyenine göre zaman farkı ---------- */

const MIN_SCALE = 1 / 240; // 4 saat = 1 birim
const MROW = 1.15;
const minMin = Math.min(...meridianRows231.map((r) => r.minutes));
const maxMin = Math.max(...meridianRows231.map((r) => r.minutes));
const LEFT = minMin * MIN_SCALE - 0.35;
const RIGHT = maxMin * MIN_SCALE + 0.35;
const meridianFigure: FigureDef = {
  caption: `Orta çizgi karşılaştırma meridyenidir (${lonText231(reference231.lon)}, yerel Güneş saati ${clock231(reference231.minutes).text}). Sağa uzanan çubuk doğudaki meridyenin ileri, sola uzanan batıdakinin geri saatidir; çubuk boyu dakika farkıyla orantılıdır (bir birim 4 saattir). Sağ sütun o meridyenin yerel saatidir.`,
  alt: `Yedi adımlı ıraksak çubuk grafiği. ${meridianRows231.map((r) => `${lonText231(r.lon)}: ${num231(r.minutes, 0)} dakika, ${r.clock}${r.day ? " ertesi gün" : ""}`).join("; ")}.`,
  steps: meridianRows231.map((r) => lonText231(r.lon)),
  draw: (_value, step) => {
    const cur = meridianRows231[step];
    const bottom = -(meridianRows231.length - 1) * MROW - 0.45;
    const els: El[] = [
      seg(v(0, 0.55), v(0, bottom), { tone: "ink", thin: true }),
      txt(v(-0.15, 0.8), "batı", "w", { small: true, tone: "muted" }),
      txt(v(0.15, 0.8), "doğu", "e", { small: true, tone: "muted" }),
    ];
    meridianRows231.forEach((r, i) => {
      const y = -i * MROW;
      const sel = r === cur;
      const w = r.minutes * MIN_SCALE;
      const tone: Tone = r.minutes >= 0 ? "a" : "b";
      els.push(txt(v(LEFT - 0.25, y), lonText231(r.lon), "w", { small: true, bold: sel, tone: sel ? "ink" : "muted" }));
      if (r.minutes === 0) els.push(poly([v(-0.12, y - 0.2), v(0.12, y - 0.2), v(0.12, y + 0.2), v(-0.12, y + 0.2)], { tone: "ink", fill: sel ? "ink" : undefined, thin: !sel }));
      else els.push(poly([v(Math.min(0, w), y - 0.2), v(Math.max(0, w), y - 0.2), v(Math.max(0, w), y + 0.2), v(Math.min(0, w), y + 0.2)], sel ? { tone, fill: tone, bold: true } : { tone: "muted", thin: true }));
      els.push(txt(v(RIGHT + 0.25, y), `${r.clock}${r.day === 1 ? " (+1 gün)" : ""}`, "e", { small: true, bold: sel, tone: sel ? "ink" : "muted" }));
    });
    const dir = cur.minutes > 0 ? "doğuda, saati ileri" : cur.minutes < 0 ? "batıda, saati geri" : "karşılaştırma meridyeni";
    return {
      els: [...els, ...pad(LEFT - 0.4, 1.15, RIGHT + 0.4, bottom - 0.1)],
      readout: [
        `${lonText231(cur.lon)}: fark ${cur.diff > 0 ? "+" : cur.diff < 0 ? "−" : ""}${Math.abs(cur.diff)}° × 4 dk = ${cur.minutes > 0 ? "+" : cur.minutes < 0 ? "−" : ""}${Math.abs(cur.minutes)} dk (${dir}).`,
        `Yerel Güneş saati ${cur.clock}${cur.day === 1 ? ", ertesi gün" : ", aynı gün"}. Resmî saat dilimi bu hesaptan ayrıdır.`,
      ],
    };
  },
};

/* ---------- Harita: çizgi ölçek ve aynı yolun kâğıt uzunluğu ---------- */

const ROAD_MAX = 7.5;
const SROW = 0.72;
const maxRoad = Math.max(...scaleRows231.map((r) => r.roadCm));
const SEG = 1.6; // çizgi ölçeğin bir 2 cm’lik bölmesi (şematik)
const scaleFigure: FigureDef = {
  caption: "Üstte seçili ölçeğin çizgi ölçeği vardır: her bölme 2 cm’dir ve altındaki sayı gerçekte kaç km olduğunu yazar. Altta aynı yolun altı haritadaki kâğıt uzunluğu karşılaştırılır; çubuklar birbirine göre orantılıdır, ekran fiziksel cetvel değildir.",
  alt: `Altı adımlı çizim. ${scaleRows231.map((r) => `${scaleText231(r.n)}: 2 cm = ${num231(r.barKm, 4)} km, yol ${num231(r.roadCm, 4)} cm, alan ${num231(r.areaCm2, 4)} cm²`).join("; ")}.`,
  steps: scaleRows231.map((r) => scaleText231(r.n)),
  draw: (_value, step) => {
    const cur = scaleRows231[step];
    const els: El[] = [txt(v(0, 1.95), `Çizgi ölçek · ${scaleText231(cur.n)}`, "e", { small: true, bold: true, tone: "a" })];
    for (let k = 0; k < 3; k++) {
      els.push(rect(k * SEG, 1.05, SEG, 0.28, k % 2 ? "muted" : "a", k % 2 === 0));
    }
    for (let k = 0; k <= 3; k++) els.push(seg(v(k * SEG, 0.95), v(k * SEG, 1.43), { tone: "ink", thin: true }), txt(v(k * SEG, 0.6), num231(k * cur.barKm, 4), "c", { small: true, tone: "ink" }));
    els.push(txt(v(3 * SEG + 0.25, 0.6), "km", "e", { small: true, tone: "muted" }));
    scaleRows231.forEach((r, i) => {
      const y = -0.6 - i * SROW;
      const sel = r === cur;
      const w = (ROAD_MAX * r.roadCm) / maxRoad;
      els.push(
        txt(v(-0.25, y), scaleText231(r.n), "w", { small: true, bold: sel, tone: sel ? "ink" : "muted" }),
        poly([v(0, y - 0.18), v(w, y - 0.18), v(w, y + 0.18), v(0, y + 0.18)], sel ? { tone: "b", fill: "b", bold: true } : { tone: "muted", thin: true }),
        txt(v(w + 0.15, y), `${num231(r.roadCm, 4)} cm`, "e", { small: true, bold: sel, tone: "ink" }),
      );
    });
    const bottom = -0.6 - (scaleRows231.length - 1) * SROW - 0.4;
    return {
      els: [...els, ...pad(-0.3, 2.25, ROAD_MAX + 1.6, bottom)],
      readout: [
        `${scaleText231(cur.n)}: 1 cm = ${num231(cur.kmPerCm, 4)} km; 2 cm’lik bölme ${num231(cur.barKm, 4)} km.`,
        `12 km’lik yol ${num231(cur.roadCm, 4)} cm, 48 km²’lik alan ${num231(cur.areaCm2, 4)} cm² olarak çizilir.`,
      ],
    };
  },
};

/* ---------- Atmosfer: ölçekli 0–600 km sütunu ve 0–100 km büyütmesi ---------- */

const COL_H = 6;
const FULL = { x: 0, w: 1.1, k: COL_H / modelTop231 };
const ZOOM_TOP = 100;
const ZOOM = { x: 3.4, w: 1.1, k: COL_H / ZOOM_TOP };
const layerTones: Tone[] = ["c", "b", "a", "warn", "muted"];
check231(layers231.length === layerTones.length, "her katmanın rengi olmalı");
check231(layers231.filter((l) => l.hi !== undefined && l.hi <= ZOOM_TOP).length === 3, "büyütme ilk üç katmanı tümüyle göstermeli");
const layerFigure: FigureDef = {
  caption: `Soldaki sütun 0–${modelTop231} km’yi ölçekli çizer: troposfer, stratosfer ve mezosfer en altta ince bir şerit kalır. Sağdaki sütun alttaki 0–${ZOOM_TOP} km’yi büyütür. Oklar katmanda yükseldikçe sıcaklığın yönüdür; ekzosferin dış sınırı kademeli olduğu için açık bırakılmıştır.`,
  alt: `Beş adımlı katman şeması. ${layers231.map((l) => `${l.name}: ${l.lo}${l.hi === undefined ? " km üstü" : `–${l.hi} km`}; sıcaklık: ${l.trendText}`).join(" · ")}.`,
  steps: layers231.map((l) => l.name),
  draw: (_value, step) => {
    const cur = layers231[step];
    const els: El[] = [];
    layers231.forEach((l, i) => {
      const sel = l === cur;
      const tone = layerTones[i];
      const lo = l.lo * FULL.k;
      const hi = l.hi === undefined ? COL_H + 0.7 : l.hi * FULL.k;
      if (l.hi === undefined) {
        els.push(poly([v(FULL.x, COL_H + 0.7), v(FULL.x, lo), v(FULL.x + FULL.w, lo), v(FULL.x + FULL.w, COL_H + 0.7)], { tone, dash: true, open: true, bold: sel, thin: !sel }));
        els.push(txt(v(FULL.x + FULL.w / 2, COL_H + 1.0), l.name, "c", { small: true, bold: sel, tone: sel ? "ink" : "muted" }));
      } else els.push(poly([v(FULL.x, lo), v(FULL.x + FULL.w, lo), v(FULL.x + FULL.w, hi), v(FULL.x, hi)], sel ? { tone, fill: tone, bold: true } : { tone, fill: tone, thin: true, bare: true }));
      if (l.lo < ZOOM_TOP) {
        const zlo = l.lo * ZOOM.k;
        const zhi = Math.min(l.hi ?? ZOOM_TOP, ZOOM_TOP) * ZOOM.k;
        els.push(poly([v(ZOOM.x, zlo), v(ZOOM.x + ZOOM.w, zlo), v(ZOOM.x + ZOOM.w, zhi), v(ZOOM.x, zhi)], sel ? { tone, fill: tone, bold: true } : { tone, fill: tone, thin: true, bare: true }));
        const mid = (zlo + zhi) / 2;
        const up = l.trend === "artar";
        const ax = ZOOM.x + ZOOM.w + 0.35;
        if (l.trend) els.push(vec(v(ax, mid + (up ? -0.25 : 0.25)), v(ax, mid + (up ? 0.25 : -0.25)), { tone: up ? "warn" : "b", bold: true }));
        els.push(txt(v(ax + 0.3, mid), l.name, "e", { small: true, bold: sel, tone: sel ? "ink" : "muted" }));
        if (l.lo > 0) els.push(txt(v(ZOOM.x - 0.15, zlo), `${l.lo} km`, "w", { small: true, tone: "muted" }));
      }
    });
    els.push(
      txt(v(FULL.x - 0.15, COL_H), `${modelTop231} km`, "w", { small: true, tone: "muted" }),
      txt(v(FULL.x - 0.15, ZOOM_TOP * FULL.k), `${ZOOM_TOP} km`, "w", { small: true, tone: "muted" }),
      txt(v(FULL.x - 0.15, 0), "0", "w", { small: true, tone: "muted" }),
      txt(v(ZOOM.x + ZOOM.w / 2, COL_H + 0.35), `0–${ZOOM_TOP} km`, "c", { small: true, tone: "muted" }),
      seg(v(FULL.x + FULL.w, ZOOM_TOP * FULL.k), v(ZOOM.x, COL_H), { tone: "muted", dash: true, thin: true }),
      seg(v(FULL.x + FULL.w, 0), v(ZOOM.x, 0), { tone: "muted", dash: true, thin: true }),
      txt(v(FULL.x + FULL.w / 2, -0.45), "ölçekli", "c", { small: true, tone: "muted" }),
      txt(v(ZOOM.x + ZOOM.w / 2, -0.45), "büyütülmüş", "c", { small: true, tone: "muted" }),
    );
    const t = thickness231(cur);
    return {
      els: [...els, ...pad(FULL.x - 1.6, COL_H + 1.3, ZOOM.x + ZOOM.w + 2.9, -0.7)],
      readout: [
        `${cur.name}: ${cur.hi === undefined ? `${cur.lo} km’den yukarı, dış sınır kademeli` : `${cur.lo}–${cur.hi} km, kalınlık ${t} km`}.`,
        `Yükseldikçe sıcaklık: ${cur.trendText}.`,
        `${cur.feature}.`,
      ],
    };
  },
};

/* ---------- Nem: sıcaklığa göre doyma miktarı ve sabit buhar ---------- */

const BAR_W = 0.8;
const GAP = 0.55;
const SAT_H = 5;
const maxSat = Math.max(...humidRows231.map((r) => r.sat));
const K = SAT_H / maxSat;
const humidFigure: FigureDef = {
  caption: `Her sütun bir sıcaklıktaki doyma miktarıdır (maksimum nem). Kesikli çizgi havadaki ${num231(vapour231)} g/m³ buhardır. Sütunun dolu kısmı buhardır, kesikli çerçevenin boş kalan üst kısmı doymak için eksik buhardır. Çizgi sütunu aştığında sütunun üstüne eklenen ayrı renkli kısım yoğuşan sudur.`,
  alt: `Altı adımlı sütun grafiği. ${humidRows231.map((r) => `${r.t} °C: doyma ${num231(r.sat)}, buhar ${num231(r.vapour)}, yoğuşan ${num231(r.condensed)} g/m³, bağıl nem %${num231(r.rh)}`).join("; ")}.`,
  steps: humidRows231.map((r) => `${r.t} °C`),
  draw: (_value, step) => {
    const cur = humidRows231[step];
    const els: El[] = [];
    const right = humidRows231.length * (BAR_W + GAP) - GAP;
    humidRows231.forEach((r, i) => {
      const x = i * (BAR_W + GAP);
      const sel = r === cur;
      const sat = r.sat * K;
      const vap = r.vapour * K;
      els.push(
        poly([v(x, 0), v(x + BAR_W, 0), v(x + BAR_W, sat), v(x, sat)], { tone: sel ? "a" : "muted", bold: sel, thin: !sel, dash: true }),
        poly([v(x, 0), v(x + BAR_W, 0), v(x + BAR_W, vap), v(x, vap)], sel ? { tone: "b", fill: "b", bold: true } : { tone: "b", fill: "b", thin: true, bare: true }),
        txt(v(x + BAR_W / 2, -0.35), `${r.t} °C`, "c", { small: true, bold: sel, tone: sel ? "ink" : "muted" }),
        txt(v(x + BAR_W / 2, Math.max(sat, vapour231 * K) + 0.3), num231(r.sat), "c", { small: true, bold: sel, tone: sel ? "ink" : "muted" }),
      );
      if (r.condensed > 0) els.push(rect(x, sat, BAR_W, r.condensed * K, "c"));
    });
    els.push(
      seg(v(-0.3, vapour231 * K), v(right + 0.3, vapour231 * K), { tone: "b", dash: true }),
      txt(v(right + 0.4, vapour231 * K), `buhar ${num231(vapour231)}`, "e", { small: true, bold: true, tone: "b" }),
      seg(v(-0.3, 0), v(right + 0.3, 0), { tone: "ink", thin: true }),
    );
    return {
      els: [...els, ...pad(-0.4, SAT_H + 0.7, right + 2.6, -0.7)],
      legend: [
        { code: "■", label: "buhar (mutlak nem)", tone: "b" },
        { code: "■", label: "yoğuşan su", tone: "c" },
        { code: "▭", label: "doyma miktarı", tone: "a" },
      ],
      readout: [
        `${cur.t} °C: doyma ${num231(cur.sat)} g/m³, buhar ${num231(cur.vapour)} g/m³${cur.condensed > 0 ? `, yoğuşan ${num231(cur.condensed)} g/m³` : ""}.`,
        `Bağıl nem = ${num231(cur.vapour)} ÷ ${num231(cur.sat)} × 100 ≈ %${num231(cur.rh)} (${cur.state}).`,
      ],
    };
  },
};
check231(humidRows231.every((r) => Math.abs(r.sat + r.condensed - Math.max(r.sat, vapour231)) < 1e-9), "yoğuşan kutusu buhar çizgisinde bitmeli");

export const depthFigures231: Record<string, Record<string, FigureDef>> = {
  "dunya-sekli-hareket": { [juneSection231.title]: juneFigure },
  "cografi-konum": { [meridianSection231.title]: meridianFigure },
  "harita-bilgisi": { [scaleSection231.title]: scaleFigure },
  "atmosfer-katmanlari": { [layerSection231.title]: layerFigure },
  "nem-yagis": { [humidSection231.title]: humidFigure },
};
