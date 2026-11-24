import {
  add,
  ang,
  circle,
  span,
  fmt,
  pol,
  poly,
  pt,
  seg,
  txt,
  v,
  vec,
  type El,
  type FigureDef,
  type Tone,
  type V,
} from "./figureKit";
import { wavelengthMarkers, wavelengthTitle, wavePeriodTitle, waveRopeTitle, waveTiming } from "../mebiWaveBasics";
import { waveTravelAt, waveTravelFrequencyHz, waveTravelSpeedMps, waveTravelTitle, waveTravelWavelengthM } from "../mebiWaveTravel";
import { waterAmplitudeTitle, waveAmplitudeBounds, waveAmplitudeInitialCm, waveAmplitudeTitle } from "../mebiWaveAmplitude";
import { waveClassificationExamples, waveClassificationTitle } from "../mebiWaveClassification";
import { tuningForkSnapshot, tuningForkTitle } from "../mebiTuningFork";
import { pulseMarkerM, pulseSpeedMps, pulseSupportM, pulseWidthM, springPulseAt, springPulseTitle } from "../mebiSpringPulse";
import { surfaceAmplitudeM, surfaceCrestX, surfaceMarkerM, surfaceWavePosition, surfaceWaveTitle } from "../mebiSurfaceWave";
import { radioFrequencyMHz, radioWavefrontPoints, radioWavefrontRadii, radioWavelengthMeters, radioWaveTitle } from "../mebiRadioWaves";
import { microwaveOvenEnergyPath, microwaveOvenStages, microwaveOvenTitle, microwaveOvenWavelengthLabel } from "../mebiMicrowaveOven";
import { boundaryWavelength, ultravioletBoundaryTitle, visibleBoundaryNm, wavelengthRegion } from "../mebiUltravioletBoundary";
import { gammaPhotonStages, gammaPhotonTitle, xRayDetectorTitle, xRayLayers, xRaySignal } from "../mebiXAndGamma";
import { pulseDirectionAt, pulseDirectionCases, pulseDirectionTitle, verticalDirection } from "../mebiPulseDirection";
import { generatingPulseAt, pulseGenerationTime, pulseGenerationTitle } from "../mebiPulseGeneration";
import { pulseDampingAt, pulseDampingTime, pulseDampingTitle } from "../mebiPulseDamping";
import { periodicSpringAt, periodicSpringTime, periodicSpringTitle, periodicSpringWavelengthM } from "../mebiPeriodicSpring";
import { springDensityAt, springDensityMass, springDensityTitle } from "../mebiSpringDensity";
import { pulleyTensionAt, pulleyTensionTitle, pulleyTensionWaterG } from "../mebiPulleyTension";

/*
 * TYT Fizik wave figures (dalgalara giriş, yay dalgaları, su dalgaları).
 * Waves are sampled from y = A·sin(2π(x − x0)/λ); pulses from a smooth bump.
 * Angles in refraction use sin i / sin r = v₁ / v₂ from the guide text.
 */

const TAU = Math.PI * 2;
function sine(x0: number, x1: number, A: number, lambda: number, shift = 0, y0 = 0, n = 80): V[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const x = x0 + ((x1 - x0) * i) / n;
    return v(x, y0 + A * Math.sin((TAU * (x - shift)) / lambda));
  });
}
const wave = (pts: V[], tone: Tone = "b", dash = false): El => poly(pts, { open: true, tone, bold: !dash, dash });
/** Smooth single pulse (raised cosine) centred at c with full width w. */
const bump = (x: number, c: number, w: number, A: number) =>
  Math.abs(x - c) < w / 2 ? (A * (1 + Math.cos((TAU * (x - c)) / w))) / 2 : 0;
function pulseLine(x0: number, x1: number, f: (x: number) => number, y0 = 0, n = 120): V[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const x = x0 + ((x1 - x0) * i) / n;
    return v(x, y0 + f(x));
  });
}
/** Only the raised part of a pulse, so the rope underneath stays visible. */
const pulseOnly = (c: number, w: number, A: number, tone: Tone = "b", dash = false): El =>
  wave(pulseLine(c - w / 2, c + w / 2, (x) => bump(x, c, w, A), 0, 40), tone, dash);
const base = (x0: number, x1: number, y = 0): El => seg(v(x0, y), v(x1, y), { dash: true, thin: true, tone: "muted" });
const wall = (x: number, y0: number, y1: number): El[] => [
  seg(v(x, y0), v(x, y1), { tone: "ink", bold: true }),
  ...Array.from({ length: Math.floor((y1 - y0) / 0.4) }, (_, i) => seg(v(x, y0 + i * 0.4 + 0.4), v(x + 0.3, y0 + i * 0.4 + 0.1), { thin: true, tone: "muted" })),
];
const deg = (r: number) => (r * 180) / Math.PI;
const rad = (d: number) => (d * Math.PI) / 180;

const giris: Record<string, FigureDef> = {
  "Titreşim yerelde, dalga uzayda ilerler": {
    caption:
      "Zamanı çeyrek periyotlarla ilerlet: dalga tepesi (turuncu işaret) sağa λ/4 kayar, işaretli boncuk ise aynı x = 3 m konumunda yalnız yukarı–aşağı salınır. Dalga sürati ile boncuğun titreşim hızı ayrı şeylerdir.",
    alt: "Sinüs biçimli ip, x = 3 metrede sabit dikey çizgi üzerinde boncuk ve sağa kayan bir tepe işareti.",
    param: { label: "t", min: 0, max: 2, step: 0.25, init: 0, unit: " T" },
    draw: (t) => {
      const lam = 4;
      const shift = lam * t;
      const y = (x: number) => Math.sin((TAU * (x - shift)) / lam);
      const crest = ((1 + shift) % lam) + (((1 + shift) % lam) < 0 ? lam : 0);
      return {
        els: [
          base(0, 8),
          wave(sine(0, 8, 1, lam, shift)),
          seg(v(3, -1.3), v(3, 1.3), { dash: true, thin: true, tone: "a" }),
          pt(v(3, y(3)), "boncuk", "e", "a"),
          pt(v(crest, 1), "tepe", "n", "c", true),
          vec(v(crest + 0.3, 1.5), v(crest + 1.3, 1.5), { tone: "c" }),
        ],
        readout: [`Tepe x = ${fmt(crest)} m'de; boncuk y = ${fmt(y(3), 2)} birim`],
      };
    },
  },
  "Tek atma düzenli dalga dizisi değildir": {
    caption:
      "v = 2 m/s ortamda üst: kaynak yalnız Δt = 1 s sarsılınca w = v·Δt = 2 m genişliğinde tek atma oluşur. Alt: kaynak her T = 1,5 s'de aynı hareketi tekrarlayınca λ = v·T = 3 m'lik düzenli dizi oluşur.",
    alt: "Üstte düz ip üzerinde tek bir tepe atması ve genişlik ölçüsü; altta tekrar eden sinüs dizisi ve bir dalga boyu ölçüsü.",
    draw: () => ({
      els: [
        base(0, 9, 3),
        wave(pulseLine(0, 9, (x) => bump(x, 4, 2, 1.2), 3)),
        ...span(v(3, 2.7), v(5, 2.7), "w = 2 m", -1, "a"),
        vec(v(5.4, 4), v(6.6, 4), { tone: "c" }),
        base(0, 9, 0),
        wave(sine(0, 9, 1, 3, -0.75)),
        ...span(v(0, 1.3), v(3, 1.3), "λ = 3 m", 1, "a"),
      ],
      readout: ["Tek atma: w = 2 · 1 = 2 m", "Dizi: λ = 2 · 1,5 = 3 m"],
    }),
  },
  "Genlik ile tepeden çukura uzaklık farklıdır": {
    caption:
      "Genlik denge çizgisinden tepeye uzaklıktır: A = 3 cm. Tepe ile çukur arası 6 cm = 2A'dır; bunu genlik sanmak yaygın hatadır.",
    alt: "Sinüs dalgası, kesikli denge çizgisi, dengeden tepeye 3 santimetre ölçüsü ve tepeden çukura 6 santimetre ölçüsü.",
    draw: () => ({
      els: [
        base(0, 10.2),
        wave(sine(0, 8, 3, 8, 0)),
        txt(v(0, 0), "denge", "w", { small: true, tone: "muted" }),
        seg(v(2, 3), v(10.2, 3), { dash: true, thin: true, tone: "muted" }),
        seg(v(6, -3), v(10.2, -3), { dash: true, thin: true, tone: "muted" }),
        ...span(v(8.8, 0), v(8.8, 3), "A = 3 cm", v(0, 1.5), "a"),
        ...span(v(10, -3), v(10, 3), "6 cm = 2A", v(0, 0), "warn"),
      ],
    }),
  },
  [waveAmplitudeTitle]: {
    caption: "Grafik, telin aynı noktasını bir periyot boyunca izliyor. Genlik, sıfır çizgisinden tepeye ya da çukura ölçülen uzaklık.",
    alt: "Uzanım–zaman grafiği. Nokta T/4’te +A, 3T/4’te −A değerine ulaşıyor. 0, T/2 ve T anlarında denge çizgisinden geçiyor.",
    param: { label: "Genlik A", min: 1, max: 4, step: 1, init: waveAmplitudeInitialCm, unit: " cm" },
    draw: (amplitude) => {
      const { maximumCm, minimumCm, spanCm } = waveAmplitudeBounds(amplitude);
      const marks = ["T/4", "T/2", "3T/4", "T"];
      return {
        els: [
          vec(v(0, -4.45), v(0, 4.8), { tone: "muted", thin: true }),
          vec(v(0, 0), v(9.55, 0), { tone: "muted", thin: true }),
          txt(v(0, 4.8), "Uzanım (cm)", "n", { small: true, tone: "muted" }),
          txt(v(9.55, 0), "Zaman (s)", "e", { small: true, tone: "muted" }),
          wave(sine(0, 8, amplitude, 8)),
          base(0, 2, maximumCm),
          base(0, 6, minimumCm),
          txt(v(0, maximumCm), "+A", "w", { small: true, tone: "a" }),
          txt(v(0, minimumCm), "−A", "w", { small: true, tone: "c" }),
          pt(v(2, maximumCm), "", "n", "a"),
          pt(v(6, minimumCm), "", "n", "c"),
          ...marks.flatMap((mark, index) => {
            const x = 2 * (index + 1);
            return [seg(v(x, -0.12), v(x, 0.12), { tone: "muted", thin: true }), txt(v(x, -0.20), mark, "s", { small: true })];
          }),
        ],
        readout: [`Genlik: ${amplitude} cm. Tepe: +${maximumCm} cm. Çukur: −${-minimumCm} cm.`, `İki uç arası düşey uzaklık: ${spanCm} cm.`],
      };
    },
  },
  [waterAmplitudeTitle]: {
    caption: "Bir anda çekilmiş ideal su profili. Kesik çizgi, suyun durgun seviyesidir. Durgun seviyeye dik uzaklık iki uçta da 3 cm.",
    alt: "Kesikli durgun su çizgisinin altında bir çukur, üstünde bir tepe var. İkisi de durgun seviyeye 3 santimetre uzaklıkta.",
    draw: () => {
      const { maximumCm, minimumCm } = waveAmplitudeBounds(waveAmplitudeInitialCm);
      return {
        els: [
          base(0, 8.5),
          wave(sine(0, 8.5, -maximumCm, 8)),
          pt(v(2, minimumCm), "−3 cm", "s", "c"),
          pt(v(6, maximumCm), "+3 cm", "n", "a"),
          ...span(v(2, minimumCm), v(2, 0), "A", 1, "c"),
          ...span(v(6, 0), v(6, maximumCm), "A", -1, "a"),
          txt(v(8.5, 0), "Durgun seviye", "e", { small: true, tone: "muted" }),
        ],
        readout: ["İki düşey ölçü de genlik A. Yatay yön konumu gösterir."],
      };
    },
  },
  [wavelengthTitle]: {
    caption:
      "Yatay kesik çizgi denge konumudur. Hem tepeden sonraki tepeye hem çukurdan sonraki çukura bir dalga boyu vardır. Dalga boyunu değiştir ve ölçü çizgilerinin birlikte değiştiğini gör.",
    alt: "Dört tepe ve iki çukur işaretli. Komşu tepe ve çukur çiftlerinin her birinde λ uzunluğu, dört tepe boyunca 3λ ölçüsü.",
    param: { label: "Dalga boyu λ", min: 1.5, max: 3, step: 0.25, init: 2.5, unit: " m" },
    draw: (lam) => {
      const { crests, troughs } = wavelengthMarkers(lam);
      return {
        els: [
          base(0, 10.5),
          wave(sine(0, 10.5, 1, lam, 0, 0, 150)),
          ...crests.map((x, i) => pt(v(x, 1), i === 0 ? "Tepe 1" : String(i + 1), "n", "a")),
          ...troughs.map((x, i) => pt(v(x, -1), i === 0 ? "Çukur" : "", "s", "c")),
          ...span(v(crests[0], 2.05), v(crests[1], 2.05), "λ", 1, "a"),
          ...span(v(troughs[0], -2), v(troughs[1], -2), "λ", -1, "c"),
          ...span(v(crests[0], 3), v(crests[3], 3), "3λ", 1, "b"),
          txt(v(10.5, 0), "Konum (m)", "e", { small: true, tone: "muted" }),
        ],
        readout: [`Tepe aralığı: ${fmt(lam, 2)} m. Çukur aralığı: ${fmt(lam, 2)} m.`, `En yakın tepe–çukur: ${fmt(lam / 2, 3)} m. Dört tepe boyunca: ${fmt(3 * lam, 2)} m.`],
      };
    },
  },
  [waveRopeTitle]: {
    caption: "Sol uç yukarı ve aşağı titreşir. Bir tam dalga deseni tel boyunca sağa ilerler ve sağdaki sabit uca henüz ulaşmamıştır.",
    alt: "Kaynak ucunda düşey iki ok. Tel, başlangıçtan sonra bir çukur ve bir tepe yaparak dengeye döner. Bir dalga boyu işaretli. Sağ uç sabit duvara bağlı.",
    draw: () => {
      const wavelength = 4;
      const start = 0;
      const wallX = 7.25;
      return {
        els: [
          base(start, wallX),
          wave(sine(start, wavelength, -0.85, wavelength)),
          seg(v(wavelength, 0), v(wallX, 0), { tone: "b", bold: true }),
          ...wall(wallX, -0.75, 0.85),
          pt(v(start, 0), "", "n", "a"),
          pt(v(wallX, 0), "", "n", "ink"),
          vec(v(-0.65, 0.1), v(-0.65, 0.95), { tone: "a" }),
          vec(v(-0.65, -0.1), v(-0.65, -0.95), { tone: "a" }),
          txt(v(start, 1.3), "Kaynak ucu", "n", { small: true, tone: "a" }),
          txt(v(wallX, 1.3), "Sabit uç", "n", { small: true }),
          vec(v(2.65, 1.55), v(4.9, 1.55), { tone: "b" }),
          txt(v(3.77, 1.55), "Yayılma yönü", "n", { small: true, tone: "b" }),
          ...span(v(start, -1.55), v(wavelength, -1.55), "λ", -1, "c"),
        ],
        readout: ["Telin şekli: bir çukur, bir tepe ve yeniden denge. Desenin yatay boyu λ."],
      };
    },
  },
  [wavePeriodTitle]: {
    caption:
      "Aynı noktanın uzanım–zaman grafiği: t = 0'daki ilk tepe ile t = 2 s'deki beşinci tepe arasında 4 tam titreşim vardır. T = 2/4 = 0,5 s, f = 1/T = 2 Hz ve f·T = 1.",
    alt: "Yatay ekseni zaman olan kosinüs grafiği; beş tepe numaralı, ilk ve son tepe arası 2 saniye ölçülü.",
    draw: () => {
      const sx = 4;
      const { elapsedS, cycles, periodS, frequencyHz } = waveTiming;
      const pts = Array.from({ length: 161 }, (_, i) => { const t = ((elapsedS + 0.2) * i) / 160; return v(t * sx, Math.cos(TAU * frequencyHz * t)); });
      return {
        els: [
          vec(v(0, -1.4), v(0, 1.7), { tone: "muted", thin: true }),
          vec(v(0, 0), v(9.2, 0), { tone: "muted", thin: true }),
          txt(v(9.2, 0), "t (s)", "se", { small: true, tone: "muted" }),
          txt(v(0, 1.7), "y", "w", { small: true, tone: "muted" }),
          wave(pts),
          ...Array.from({ length: cycles + 1 }, (_, k) => pt(v(k * periodS * sx, 1), String(k + 1), "n", "a")),
          ...span(v(0, -1.6), v(elapsedS * sx, -1.6), `${elapsedS} s = ${cycles}T`, -1, "c"),
          txt(v(periodS * sx, 0), fmt(periodS, 2), "s", { small: true }),
        ],
        readout: [`T = ${elapsedS} s / ${cycles} = ${fmt(periodS, 2)} s`, `f = 1 / ${fmt(periodS, 2)} = ${frequencyHz} Hz; f·T = 1`],
      };
    },
  },
  [waveTravelTitle]: {
    caption: "Zamanı değiştir ve dalga önünün kaynaktan uzaklaşmasını izle. Bir tam periyot sonunda kaynaktan dalga önüne kadar bir dalga boyu ölçülür.",
    alt: "Telin solunda kaynak, sağında sabit uç. Bozunumun önüne kadar dalga çizgisi, onun ötesinde düz tel var. Düşey işaret ve yatay ölçü, dalga önünün konumunu gösteriyor.",
    param: { label: "Geçen süre t", min: 0, max: 1, step: 0.25, init: 1, unit: " T" },
    draw: (periods) => {
      const wallX = 3.55;
      const { elapsedS, distanceM } = waveTravelAt(periods);
      const displacement = (x: number) => 0.6 * Math.sin(TAU * waveTravelFrequencyHz * (elapsedS - x / waveTravelSpeedMps));
      return {
        els: [
          base(0, wallX),
          seg(v(distanceM, 0), v(wallX, 0), { tone: "muted" }),
          ...wall(wallX, -0.63, 0.7),
          ...(distanceM > 0 ? [
            wave(pulseLine(0, distanceM, displacement, 0, 80)),
            seg(v(distanceM, 0), v(distanceM, 0.82), { dash: true, thin: true, tone: "a" }),
            pt(v(distanceM, 0), "", "n", "a"),
            txt(v(distanceM, 0.85), "Dalga önü", "n", { small: true, tone: "a" }),
            ...span(v(0, -0.96), v(distanceM, -0.96), periods === 1 ? "λ" : "x", -1, "c"),
          ] : []),
          pt(v(0, displacement(0)), "", "n", "b"),
          txt(v(0, 0), "Kaynak", "w", { small: true, tone: "b" }),
          pt(v(wallX, 0), "", "n", "ink"),
        ],
        readout: [`Geçen süre: ${fmt(elapsedS, 3)} s. Dalga önünün uzaklığı: ${fmt(distanceM, 2)} m.`, `Yayılma sürati: ${waveTravelSpeedMps} m/s. Bir tam desenin boyu: ${waveTravelWavelengthM} m.`],
      };
    },
  },
  "v=λf bir ilişki, tek başına nedensellik değildir": {
    caption:
      "Aynı ortam (v = 4 m/s sabit) içinde kaynağın frekansını değiştir: hız ortamla belirlendiği için değişmez, dalga boyu λ = v/f küçülür. Pencere 8 m genişliğindedir.",
    alt: "8 metrelik pencerede sinüs dalgası; frekans arttıkça tepeler sıklaşıyor, bir dalga boyu ölçüsü gösteriliyor.",
    param: { label: "f", min: 0.5, max: 4, step: 0.5, init: 1, unit: " Hz" },
    draw: (f) => {
      const lam = 4 / f;
      return {
        els: [
          base(0, 8),
          wave(sine(0, 8, 1, lam, -lam / 4, 0, 200)),
          ...span(v(0, 1.4), v(lam, 1.4), `λ = ${fmt(lam, 2)} m`, 1, "a"),
          txt(v(8, -1.2), "v = 4 m/s (ortam)", "w", { small: true, tone: "muted" }),
        ],
        readout: [`λ = v / f = 4 / ${fmt(f)} = ${fmt(lam, 2)} m`],
      };
    },
  },
  "Sınırdan geçişte kaynak ritmi korunur": {
    caption:
      "Aynı kaynaktan gelen dalga f = 1 Hz ile hızlı ortamdan (v₁ = 4 m/s) yavaş ortama (v₂ = 2 m/s) geçiyor. Frekans korunur, bu yüzden λ₂/λ₁ = v₂/v₁: λ 4 m'den 2 m'ye iner.",
    alt: "Ortada dikey sınır çizgisi; solda uzun dalga boylu, sağda yarı dalga boylu sinüs dalgası, ikisi sınırda kesintisiz birleşiyor.",
    draw: () => {
      const left = sine(0, 8, 1, 4, 0);
      const right = sine(8, 14, 1, 2, 8);
      return {
        els: [
          seg(v(8, -1.6), v(8, 1.8), { tone: "ink", thin: true }),
          base(0, 14),
          wave([...left, ...right]),
          ...span(v(0.5 + 0.5, 1.4), v(4.5 + 0.5, 1.4), "λ₁ = 4 m", 1, "a"),
          ...span(v(8.5, 1.4), v(10.5, 1.4), "λ₂ = 2 m", 1, "c"),
          txt(v(4, -1.6), "v₁ = 4 m/s", "s", { small: true }),
          txt(v(11, -1.6), "v₂ = 2 m/s", "s", { small: true }),
        ],
        readout: ["f = 4/4 = 2/2 = 1 Hz (aynı)"],
      };
    },
  },
  [waveClassificationTitle]: {
    caption: "Üst dalda ortam gereksinimi, alt dalda titreşim doğrultusu okunur. Bir örnek seçtiğinde sonuçları çizgide ve kartta görürsün.",
    alt: "Dalga türleri iki kola ayrılıyor. Ortam kolu mekanik ve elektromanyetiğe, titreşim yönü kolu enine ve boyunaya ayrılıyor.",
    picks: waveClassificationExamples.map((example) => ({
      label: example.name,
      title: `${example.medium} · ${example.direction.toLocaleLowerCase("tr-TR")}`,
      detail: [example.explanation],
    })),
    draw: (_value, _step, pick = -1) => {
      const selected = waveClassificationExamples[pick];
      const figureChoices = ["Tel", "Ses", "Işık", "Su", "P dalgası", "S dalgası"];
      const groups = [
        { title: "Ortam", y: 1.55, endings: ["Mekanik", "Elektromanyetik"], current: selected?.medium },
        { title: "Titreşim yönü", y: -1.55, endings: ["Enine", "Boyuna"], current: selected?.direction },
      ];
      return {
        els: [
          txt(v(0, 0), "Dalgalar", "w", { bold: true }),
          seg(v(0, 0), v(0.8, 0), { tone: "muted" }),
          seg(v(0.8, -1.55), v(0.8, 1.55), { tone: "muted" }),
          ...groups.flatMap(({ title, y, endings, current }) => [
            seg(v(0.8, y), v(1.4, y), { tone: "muted" }),
            txt(v(1.4, y), title, "e", { bold: true }),
            seg(v(5.2, y), v(5.8, y), { tone: "muted" }),
            ...endings.flatMap((ending, index) => {
              const nextY = y + (index === 0 ? 0.65 : -0.65);
              const active = current === ending;
              const tone = active ? "a" : "muted";
              return [
                seg(v(5.8, y), v(5.8, nextY), { tone, bold: active }),
                seg(v(5.8, nextY), v(6.5, nextY), { tone, bold: active }),
                txt(v(6.5, nextY), ending, "e", { tone: active ? "a" : "ink", bold: active }),
              ];
            }),
          ]),
          ...figureChoices.map((label, index) => txt(v(0.7 + (index % 3) * 3.9, -3.45 - Math.floor(index / 3) * 0.9), label, "c", { pick: index, small: true, bold: index === pick })),
        ],
      };
    },
  },
  [tuningForkTitle]: {
    caption: "Zamanı ilerlet ve farklı renkli hava noktasını izle. İnce çizgi denge konumunu, noktalar anlık konumu gösterir. Birbirine yakın noktalar sıkışmayı gösterir. Dikey işaretlerin gösterdiği bölgeler ilerlerken hava noktaları denge çevresinde kalır.",
    alt: "Solda plastik tokmak ve iki kollu diyapazon. Sağda denge işaretleri çevresinde yatay salınan hava noktaları, sıkışma ve seyrelme işaretleri ile sağa bakan yayılma oku.",
    param: { label: "Geçen süre", min: 0, max: 1, step: 0.125, init: 0, unit: " T" },
    draw: (time) => {
      const { tineOffset, resting, moving, compressed, rarefied } = tuningForkSnapshot(time);
      const origin = 2.8;
      const observed = 10;
      return {
        els: [
          seg(v(-0.35, -0.85), v(0.05, 0.8), { tone: "warn", bold: true }),
          circle(v(0.05, 0.8), 0.14, { tone: "warn", fill: "warn" }),
          poly([v(0.55 - tineOffset, 1.18), v(0.55, -0.4), v(0.77, -0.67), v(1.09, -0.67), v(1.31, -0.4), v(1.31 + tineOffset, 1.18)], { open: true, tone: "ink", bold: true }),
          seg(v(0.93, -0.67), v(0.93, -1.25), { tone: "ink", bold: true }),
          txt(v(0.6, -1.62), "Diyapazon", "c", { small: true }),
          vec(v(4, 1.38), v(8.1, 1.38), { tone: "b" }),
          txt(v(6.05, 1.52), "Sesin yayılması", "n", { small: true, bold: true }),
          ...resting.map((x, index) => seg(v(origin + x, -0.16), v(origin + x, -0.51), { tone: index === observed ? "a" : "muted", thin: true })),
          ...moving.map((x, index) => circle(v(origin + x, 0), 0.058, { tone: index === observed ? "a" : "ink", fill: index === observed ? "a" : "ink" })),
          seg(v(origin + compressed.center, 0.15), v(origin + compressed.center, 0.64), { tone: "a" }),
          txt(v(origin + compressed.center, 0.64), "Sıkışma", "n", { tone: "a", small: true, bold: true }),
          seg(v(origin + rarefied.center, -0.55), v(origin + rarefied.center, -1.01), { tone: "b" }),
          txt(v(origin + rarefied.center, -1.01), "Seyrelme", "s", { tone: "b", small: true, bold: true }),
        ],
        readout: ["Sıkışmada noktalar daha yakın. Seyrelmede araları daha açık.", "İşaretli nokta kendi denge çizgisi çevresinde yatay salınır."],
      };
    },
  },
  [radioWaveTitle]: {
    caption: "Frekansı değiştir. Verici aynı yerde kalır. Alttaki ölçü çizgisi, ardışık iki cephenin arasındaki bir dalga boyunu gösterir.",
    alt: "Bir radyo vericisi kulesinin tepesindeki antenin her iki yanında dalga cepheleri çizili. Ölçü çizgisi ardışık iki cephenin radyal uzaklığını gösteriyor.",
    param: { label: "Verici frekansı", min: radioFrequencyMHz.min, max: radioFrequencyMHz.max, step: radioFrequencyMHz.step, init: radioFrequencyMHz.initial, unit: " MHz", plain: true },
    draw: (frequency) => {
      const radii = radioWavefrontRadii(frequency);
      const wavelength = radioWavelengthMeters(frequency);
      return {
        els: [
          ...radii.flatMap((radius, i) => [wave(radioWavefrontPoints(radius, 1), i < 2 ? "b" : "muted"), wave(radioWavefrontPoints(radius, -1), i < 2 ? "b" : "muted")]),
          poly([v(-2.1, -8.8), v(0, 0), v(2.1, -8.8)], { open: true, tone: "ink", bold: true }),
          ...[-3.6, -5.7, -7.65].map((y) => seg(v(y * 0.235, y), v(-y * 0.235, y), { tone: "ink" })),
          circle(v(0, 0), 0.25, { tone: "a", fill: "a" }),
          txt(v(-3.4, -9.1), "Verici", "w", { small: true, bold: true }),
          seg(v(-12, -11.8), v(12, -11.8), { tone: "muted", thin: true }),
          txt(v(0, 10), " "),
          ...span(v(wavelength, -10.6), v(2 * wavelength, -10.6), `${fmt(wavelength, 2)} m`, 1, "a"),
        ],
        readout: [`${fmt(frequency)} MHz. Boşlukta komşu iki cephe arası ${fmt(wavelength, 2)} m.`],
      };
    },
  },
  [microwaveOvenTitle]: {
    caption: "Adımları aç ve enerjiyi kaynaktan yiyeceğe kadar izle. Kesit ve oklar şematiktir.",
    alt: "Fırın kesitinde sağda kaynak, üstte metal iç duvar ve altta yiyecek var. Oklar önce kaynak girişini, sonra üst duvardan yansımayı ve sonunda yiyeceğe ulaşmayı gösteriyor.",
    steps: microwaveOvenStages.map(({ label }) => label),
    draw: (_value, step) => {
      const path = microwaveOvenEnergyPath;
      const entry = v(path.entry.x, path.entry.y);
      const reflection = v(path.reflection.x, path.reflection.y);
      const food = v(path.food.x, path.food.y);
      const ceilingLeft = v(1, path.reflection.y);
      const ceilingRight = v(path.entry.x, path.reflection.y);
      return {
        els: [
          poly([v(0, 0), v(12.6, 0), v(12.6, 6.4), v(0, 6.4)], { tone: "ink", bold: true }),
          poly([ceilingLeft, v(1, 0.75), v(path.entry.x, 0.75), entry, ceilingRight], { open: true, tone: "muted" }),
          seg(ceilingLeft, ceilingRight, { tone: step === 1 ? "a" : "muted", bold: true }),
          txt(v(6, 5.55), "Metal duvar", "n", { small: true, bold: step === 1 }),
          poly([v(10, 2.8), v(11.9, 2.8), v(11.9, 4), v(10, 4)], { tone: "b", fill: "b" }),
          txt(v(10.95, 4.27), "Kaynak", "n", { small: true, bold: step === 0 }),
          poly([v(2.4, 1.3), v(4.4, 1.3), v(4.15, 2.15), v(2.65, 2.15)], { tone: "c", fill: "c" }),
          txt(v(3.4, -0.2), "Yiyecek", "s", { small: true, bold: step === 2 }),
          vec(v(10, 3.4), entry, { tone: "b", bold: true }),
          ...(step >= 1 ? [vec(entry, reflection, { tone: "a", bold: true })] : []),
          ...(step >= 2 ? [vec(reflection, food, { tone: "c", bold: true })] : []),
        ],
        readout: [microwaveOvenStages[step].detail, `2,45 GHz için boşlukta bir dalga boyu yaklaşık ${microwaveOvenWavelengthLabel}.`],
      };
    },
  },
  [ultravioletBoundaryTitle]: {
    caption: "Sürgüyle dalga boyunu değiştir. İşaret, kısa dalga boyları solda olan yakınlaştırılmış bir ölçek üzerinde hareket eder.",
    alt: "300 ile 500 nanometre arası yatay ölçek. 380 nanometrede kesikli sınır var. Sol bölüm morötesi, sağ bölüm görünür ışık. Üçgen işaret seçilen dalga boyunu gösteriyor.",
    param: { label: "Dalga boyu", min: boundaryWavelength.min, max: boundaryWavelength.max, step: boundaryWavelength.step, init: boundaryWavelength.initial, unit: " nm", plain: true },
    draw: (nm) => ({
      els: [
        seg(v(300, 0), v(visibleBoundaryNm, 0), { tone: "muted", bold: true }),
        seg(v(visibleBoundaryNm, 0), v(500, 0), { tone: "b", bold: true }),
        seg(v(visibleBoundaryNm, -5), v(visibleBoundaryNm, 18), { tone: "ink", dash: true }),
        txt(v(338, 20), "Morötesi", "n", { small: true, bold: true }),
        txt(v(445, 20), "Görünür", "n", { small: true, bold: true }),
        ...[300, visibleBoundaryNm, 500].flatMap((value) => [
          seg(v(value, -4), v(value, 3), { tone: "ink", thin: true }),
          txt(v(value, -7), value === visibleBoundaryNm ? `≈ ${value} nm` : `${value} nm`, "s", { small: true }),
        ]),
        poly([v(nm - 3, 9), v(nm + 3, 9), v(nm, 2)], { tone: "a", fill: "a", bold: true }),
      ],
      readout: [`${fmt(nm)} nm · ${wavelengthRegion(nm)}`],
    }),
  },
  [xRayDetectorTitle]: {
    caption: "Kalınlığı artır. Sağdaki algılayıcı çubukları, iki yoldan geçebilen ışın payını gösterir.",
    alt: "Soldaki X ışını kaynağından iki eşit demet çıkıyor. Üstte yumuşak doku yolu ve altta kemik içeren yol var. Sağdaki iki çubuk, algılayıcıda ölçülen temsili sinyalleri gösteriyor.",
    param: { label: "Model kalınlığı", min: xRayLayers.min, max: xRayLayers.max, step: 1, init: xRayLayers.initial, unit: " birim" },
    draw: (layers) => {
      const { soft, bone } = xRaySignal(layers);
      const paths = [{ y: 4.6, signal: soft, label: "Yumuşak doku", tone: "b" as const }, { y: 0, signal: bone, label: "Kemikli yol", tone: "c" as const }];
      const detectorX = 11.4;
      const detectorWidth = 4.2;
      return {
        els: [
          txt(v(0.8, 6.72), "Kaynak", "n", { small: true, bold: true }),
          txt(v(13.5, 6.72), "Algılayıcı", "n", { small: true, bold: true }),
          ...paths.flatMap(({ y, signal, label, tone }) => {
            const end = 4 + layers * 1.15;
            const observed = detectorX + detectorWidth * signal / 100;
            return [
              circle(v(0.8, y), 0.27, { tone: "a", fill: "a" }),
              vec(v(1.2, y), v(3.85, y), { tone: "a", bold: true }),
              poly([v(4, y - 0.55), v(end, y - 0.55), v(end, y + 0.55), v(4, y + 0.55)], { tone, fill: tone }),
              txt(v(5.73, y + 1.2), label, "n", { small: true, bold: true }),
              vec(v(end + 0.15, y), v(10.25, y), { tone, thin: true }),
              seg(v(10.45, y - 0.75), v(10.45, y + 0.75), { tone: "ink", bold: true }),
              seg(v(detectorX, y), v(detectorX + detectorWidth, y), { tone: "muted", thin: true }),
              seg(v(detectorX, y), v(observed, y), { tone, bold: true }),
              txt(v(13.5, y - 0.55), `%${fmt(signal, 0)}`, "s", { small: true, bold: true }),
            ];
          }),
        ],
        readout: [`Yumuşak doku yolu %${fmt(soft, 0)}, kemikli yol %${fmt(bone, 0)}.`],
      };
    },
  },
  [gammaPhotonTitle]: {
    caption: "İleri düğmesiyle çekirdeğin enerji değişimini ve çıkan gama fotonunu göster.",
    alt: "Düşey eksende çekirdeğin üst ve alt enerji düzeyi gösteriliyor. Aşağı geçiş oku ve sağa çıkan dalgalı gama fotonu çizgisi ikinci adımda açılır.",
    steps: gammaPhotonStages,
    draw: (_value, step) => ({
      els: [
        vec(v(0.3, 0.2), v(0.3, 5.8), { tone: "ink" }),
        txt(v(0.3, 6.05), "Enerji", "n", { small: true, bold: true }),
        seg(v(1.65, 4.55), v(6.15, 4.55), { tone: "b", bold: true }),
        seg(v(1.65, 1.05), v(6.15, 1.05), { tone: "c", bold: true }),
        txt(v(3.85, 4.83), "Başlangıç", "n", { small: true }),
        txt(v(3.85, 0.79), "Son düzey", "s", { small: true }),
        txt(v(12.7, 2.8), " "),
        circle(v(3.85, step === 0 ? 4.55 : 1.05), 0.16, { tone: "a", fill: "a" }),
        ...(step === 1 ? [
          vec(v(3.85, 4.35), v(3.85, 1.32), { tone: "a", bold: true }),
          wave(sine(6.75, 11.63, 0.25, 1.22, 6.75, 2.8), "a"),
          vec(v(11.66, 2.8), v(12.4, 2.8), { tone: "a" }),
          txt(v(9.3, 3.35), "Gama fotonu", "n", { small: true, bold: true }),
        ] : []),
      ],
      readout: [step === 0 ? "Çekirdek üst enerji düzeyinde." : "Çekirdek alt enerji düzeyinde. Enerjinin bir kısmı gama fotonuyla taşındı."],
    }),
  },
  "Mekanik ve elektromanyetik ayrımı ortam gereksinimidir": {
    caption:
      "Elektromanyetik ailenin bölgeleri: radyodan gamaya frekans artar, boşluktaki dalga boyu azalır. Hepsi boşlukta aynı süratle yayılır; ses, yay ve deprem dalgaları ise maddesel ortam ister. Sınırlar sınıflamaya göre değişir; kutular ölçekli değildir.",
    alt: "Yan yana yedi kutudan oluşan elektromanyetik spektrum şeridi, adlar kutuların üstünde ve altında dönüşümlü; üstte sağa doğru artan frekans oku, altta sola doğru artan dalga boyu oku.",
    draw: () => {
      const names = ["radyo", "mikrodalga", "kızılötesi", "görünür", "morötesi", "X", "gama"];
      const tones: Tone[] = ["muted", "b", "warn", "c", "a", "b", "muted"];
      return {
        els: [
          ...names.flatMap((n, i) => [
            poly([v(i * 2.1, 0), v(i * 2.1 + 2.1, 0), v(i * 2.1 + 2.1, 1), v(i * 2.1, 1)], { fill: tones[i], tone: "ink", thin: true }),
            txt(v(i * 2.1 + 1.05, i % 2 ? 0 : 1), n, i % 2 ? "s" : "n", { small: true, bold: true }),
          ]),
          vec(v(0, 2.3), v(14.7, 2.3), { tone: "a", bold: true }),
          txt(v(7.35, 2.3), "frekans artar", "n", { small: true, tone: "a" }),
          vec(v(14.7, -1.3), v(0, -1.3), { tone: "c", bold: true }),
          txt(v(7.35, -1.3), "boşluktaki dalga boyu artar", "s", { small: true, tone: "c" }),
        ],
      };
    },
  },
  "Enine ve boyuna ayrımı iki yönü karşılaştırır": {
    caption:
      "Üst: ipte titreşim (dikey oklar) yayılmaya (yatay ok) diktir, dalga eninedir. Alt: helezon yayda halkalar yayılma doğrultusunda sıkışıp seyrelir, dalga boyunadır. Sesin havadaki yayılması boyunadır.",
    alt: "Üstte sinüs ip, üzerinde dikey çift yönlü oklar ve sağa yayılma oku; altta sık ve seyrek bölgeleri olan dikey çizgilerle gösterilmiş yay, yatay çift yönlü oklar.",
    draw: () => {
      const coils: El[] = [];
      for (let i = 0; i < 40; i++) {
        const x0 = i * 0.25;
        const x = x0 + 0.35 * Math.sin((TAU * x0) / 3.3);
        coils.push(seg(v(x, -2.8), v(x, -1.8), { tone: "b", thin: true }));
      }
      return {
        els: [
          base(0, 10, 2),
          wave(sine(0, 10, 0.9, 3.3, 0, 2)),
          ...[1.65, 4.95, 8.25].flatMap((x) => [vec(v(x, 2), v(x, 3.3), { tone: "a" }), vec(v(x, 2), v(x, 0.7), { tone: "a" })]),
          vec(v(10.3, 2), v(11.6, 2), { tone: "c", bold: true }),
          txt(v(11.6, 2), "yayılma", "e", { small: true, tone: "c" }),
          txt(v(0, 3.4), "enine", "e", { small: true, bold: true }),
          ...coils,
          ...[1.65, 4.95, 8.25].map((x) => txt(v(x, -3.2), "sıkışma", "s", { small: true, tone: "muted" })),
          vec(v(6.5, -1.2), v(7.7, -1.2), { tone: "a" }),
          vec(v(6.5, -1.2), v(5.3, -1.2), { tone: "a" }),
          vec(v(10.3, -2.3), v(11.6, -2.3), { tone: "c", bold: true }),
          txt(v(11.6, -2.3), "yayılma", "e", { small: true, tone: "c" }),
          txt(v(0, -1.2), "boyuna", "e", { small: true, bold: true }),
        ],
      };
    },
  },
};

const yay: Record<string, FigureDef> = {
  [pulleyTensionTitle]: {
    caption: "Su kütlesini değiştir. Kova durduktan sonra atmanın aynı sürede sola doğru aldığı yolu ölç.",
    alt: "Sol ucu duvara bağlı yay, sağdaki makaradan geçen iple su kovasına bağlı. Atma yayda sola ilerliyor. Aynı süre ölçüsünde su ve gerilme arttıkça atma daha uzakta.",
    param: {
      label: "Kovadaki su kütlesi",
      min: pulleyTensionWaterG.min,
      max: pulleyTensionWaterG.max,
      step: pulleyTensionWaterG.step,
      init: pulleyTensionWaterG.initial,
      unit: " g",
    },
    draw: (waterG) => {
      const state = pulleyTensionAt(waterG);
      const wheelX = 8.65;
      const wheelY = 2.5;
      const wheelRadius = 0.48;
      const stringY = wheelY + wheelRadius;
      const hangingX = wheelX + wheelRadius;
      const startX = 7.55;
      const frontX = startX - state.travelledM;
      const bottomY = -1.1;
      const surfaceY = bottomY + state.waterFraction * 1.02;
      return {
        els: [
          ...wall(0, 1.95, 3.65),
          base(0, wheelX, stringY),
          wave(pulseLine(0, wheelX, (x) => bump(x, frontX + state.widthM / 2, state.widthM, 0.68), stringY, 160)),
          vec(v(5.5, 4.48), v(2.6, 4.48), { tone: "ink", bold: true }),
          txt(v(4.05, 4.66), "Atmanın yönü", "n", { small: true }),
          ...span(v(frontX, 2.38), v(startX, 2.38), `${fmt(state.travelledM, 2)} m`, -1, "a"),
          circle(v(wheelX, wheelY), wheelRadius, { tone: "ink" }),
          circle(v(wheelX, wheelY), 0.1, { tone: "muted", fill: "muted" }),
          txt(v(wheelX, wheelY + 1.02), "Makara", "n", { small: true }),
          seg(v(hangingX, wheelY), v(hangingX, 0.65), { tone: "ink" }),
          seg(v(hangingX, 0.65), v(hangingX - 0.7, 0.08), { tone: "ink" }),
          seg(v(hangingX, 0.65), v(hangingX + 0.7, 0.08), { tone: "ink" }),
          ...(waterG === 0 ? [] : [poly([v(hangingX - 0.66, bottomY), v(hangingX + 0.66, bottomY), v(hangingX + 0.66, surfaceY), v(hangingX - 0.66, surfaceY)], { tone: "b", fill: "b" })]),
          poly([v(hangingX - 0.72, 0.08), v(hangingX - 0.72, bottomY - 0.06), v(hangingX + 0.72, bottomY - 0.06), v(hangingX + 0.72, 0.08)], { tone: "ink", open: true }),
          txt(v(hangingX, bottomY - 0.32), "Kova", "s", { small: true }),
        ],
        readout: [
          `Toplam kütle: ${fmt(state.totalMassKg, 2)} kg. Gerilme: ${fmt(state.tensionN, 2)} N.`,
          `Atma sürati ${fmt(state.speedMps, 2)} m/s. ${fmt(state.timeS, 2)} s’de sola ${fmt(state.travelledM, 2)} m ilerler.`,
        ],
      };
    },
  },
  [springDensityTitle]: {
    caption: "Alt yayın kütlesini değiştir. Üst yay sabit kalır. Turuncu ölçüler aynı sürede iki atmanın önünün kaynaktan ne kadar ilerlediğini gösterir.",
    alt: "Eşit uzunlukta, aynı kuvvetle gerilmiş iki yay çizimi. Atmalar soldan sağa ilerliyor. Üst yay sabit kütleli. Altta daha ağır bir yay seçildiğinde aynı sürede daha kısa bir ölçü görünüyor.",
    param: {
      label: "Alt yayın kütlesi",
      min: springDensityMass.min,
      max: springDensityMass.max,
      step: springDensityMass.step,
      init: springDensityMass.initial,
      unit: " g",
    },
    draw: (mass) => {
      const state = springDensityAt(mass);
      const lines = [
        { y: 3.6, title: "Üst yay", reading: state.reference, tone: "b" as const },
        { y: 0, title: "Alt yay", reading: state.comparison, tone: "ink" as const },
      ];
      return {
        els: [
          ...lines.flatMap(({ y, title, reading, tone }) => [
            base(0, state.spanM, y),
            wave(pulseLine(0, state.spanM, (x) => bump(x, reading.travelledM - reading.widthM / 2, reading.widthM, 0.63), y, 160), tone),
            circle(v(0, y), 0.09, { tone: "c", fill: "c" }),
            txt(v(0, y + 1.18), title, "ne", { tone, bold: true, small: true }),
            vec(v(state.spanM - 2.3, y + 0.55), v(state.spanM, y + 0.55), { tone, bold: true }),
            txt(v(state.spanM, y + 0.71), `F = ${state.tensionN} N`, "nw", { tone, small: true }),
            ...span(v(0, y - 0.63), v(reading.travelledM, y - 0.63), `${fmt(reading.travelledM, 2)} m`, -1, "a"),
          ]),
        ],
        readout: [
          `Üst yay: ${fmt(state.reference.speedMps, 2)} m/s. Alt yay: ${fmt(state.comparison.speedMps, 2)} m/s.`,
          `İki yay da ${state.tensionN} N ile gerili. Ölçüm süresi ${fmt(state.observationS, 2)} s.`,
          `Alt yayın boyca kütle yoğunluğu ${fmt(state.comparison.linearDensity, 3)} kg/m.`,
        ],
      };
    },
  },
  [periodicSpringTitle]: {
    caption: "Zamanı ilerlet. Üstte işaretli nokta düşey, altta işaretli halka yatay hareket eder. Dalganın ilerleme yönü büyük okla gösterilir.",
    alt: "Üstte sol kaynaktan sağa ilerleyen enine yay dalgası ve iki komşu tepe arasında yatay dalga boyu. Altta sağ kaynaktan sola ilerleyen boyuna dalga. Bir halka kendi denge konumu çevresinde sağa ve sola yer değiştirir.",
    param: {
      label: "Geçen süre",
      min: periodicSpringTime.min,
      max: periodicSpringTime.max,
      step: periodicSpringTime.step,
      init: periodicSpringTime.initial,
      unit: " s",
    },
    draw: (time) => {
      const state = periodicSpringAt(time);
      const upperY = 4.5;
      const marker = 4.25;
      const ringCount = 44;
      const positions = Array.from({ length: ringCount + 1 }, (_, index) =>
        state.longitudinalPositionM(index * pulseSupportM / ringCount),
      );
      const markerX = state.longitudinalPositionM(marker);
      const [first, second] = state.crestDistancesM;
      return {
        els: [
          txt(v(0, upperY + 1.87), "Enine", "ne", { tone: "b", bold: true, small: true }),
          vec(v(5.8, upperY + 1.37), v(8.75, upperY + 1.37), { tone: "ink", bold: true }),
          txt(v(7.27, upperY + 1.51), "İlerleme", "n", { small: true }),
          base(0, pulseSupportM, upperY),
          wave(pulseLine(0, pulseSupportM, (x) => 2.8 * state.transverseHeightM(x), upperY, 160)),
          ...wall(pulseSupportM, upperY - 0.65, upperY + 0.65),
          circle(v(0, upperY + 2.8 * state.transverseHeightM(0)), 0.12, { tone: "c", fill: "c" }),
          seg(v(marker, upperY - 0.82), v(marker, upperY + 0.82), { tone: "a", dash: true }),
          circle(v(marker, upperY + 2.8 * state.transverseHeightM(marker)), 0.11, { tone: "a", fill: "a" }),
          ...(second === undefined ? [] : span(v(second, upperY - 1.1), v(first, upperY - 1.1), `λ = ${fmt(periodicSpringWavelengthM)} m`, -1, "c")),
          txt(v(0, 1.45), "Boyuna", "ne", { tone: "b", bold: true, small: true }),
          vec(v(8.75, 1.05), v(5.8, 1.05), { tone: "ink", bold: true }),
          txt(v(7.27, 1.19), "İlerleme", "n", { small: true }),
          base(0, pulseSupportM),
          ...wall(0, -0.54, 0.54),
          ...positions.map((x) => seg(v(x, -0.27), v(x, 0.27), { tone: "b", thin: true })),
          circle(v(state.longitudinalPositionM(pulseSupportM), 0), 0.12, { tone: "c", fill: "c" }),
          seg(v(marker, -0.36), v(marker, -0.86), { tone: "muted", dash: true }),
          circle(v(markerX, 0), 0.11, { tone: "a", fill: "a" }),
          ...(Math.abs(markerX - marker) < 0.04 ? [] : [seg(v(markerX, -0.34), v(markerX, -0.56), { tone: "a", thin: true })]),
        ],
        readout: [
          `İlk etki kaynaktan ${fmt(state.leadingDistanceM, 2)} m uzakta.`,
          "Enine: nokta düşey titreşir, dalga sağa ilerler.",
          "Boyuna: halka yatay titreşir, sıkışmalar sola ilerler.",
          ...(second === undefined ? ["Dalga boyunu göstermek için iki tepenin oluşmasına kadar süreyi artır."] : [`Komşu tepeler arası ${fmt(periodicSpringWavelengthM)} m.`]),
        ],
      };
    },
  },
  [pulseDampingTitle]: {
    caption: "Zamanı değiştir ve aynı yatay ölçekle çizilen iki atmanın tepelerini karşılaştır. Genlik düşey, genişlik yatay ölçülür.",
    alt: "İki paralel yay kesiti. Üstte ideal atma, altta genliği zamanla azalan örnek. İki tepe yatayda aynı konuma ilerliyor. Yatay genişlik ve dengeden tepeye düşey genlik ayrı işaretli.",
    param: {
      label: "Geçen süre",
      min: pulseDampingTime.min,
      max: pulseDampingTime.max,
      step: pulseDampingTime.step,
      init: pulseDampingTime.initial,
      unit: " s",
    },
    draw: (time) => {
      const state = pulseDampingAt(time);
      const peak = (state.leftM + state.rightM) / 2;
      const cmInDiagram = 0.32;
      const lines = [
        { title: "İdeal yay", y: 3.2, height: state.idealHeightCm, amplitude: state.idealAmplitudeCm, tone: "b" as const },
        { title: "Sönümlü örnek", y: 0, height: state.dampedHeightCm, amplitude: state.dampedAmplitudeCm, tone: "a" as const },
      ];
      return {
        els: [
          ...lines.flatMap(({ title, y, height, amplitude, tone }) => [
            base(0, 10, y),
            wave(pulseLine(0, 10, (x) => height(x) * cmInDiagram, y), tone),
            ...span(v(peak, y), v(peak, y + amplitude * cmInDiagram), "A", -1, tone),
            txt(v(0, y + 1.65), title, "ne", { bold: true, small: true, tone }),
          ]),
          ...span(v(state.leftM, -0.65), v(state.rightM, -0.65), `${fmt(state.widthM)} m`, -1, "c"),
        ],
        readout: [
          `İdeal yay: genlik ${fmt(state.idealAmplitudeCm)} cm.`,
          `Sönümlü örnek: genlik ${fmt(state.dampedAmplitudeCm, 2)} cm.`,
          `Her iki çizimde genişlik ${fmt(state.widthM)} m.`,
        ],
      };
    },
  },
  [pulseGenerationTitle]: {
    caption: "Kaynağın ilk hareketini ve zamanı seç. Sol uç dengeye dönünce iki sınır da sağa ilerler.",
    alt: "Sol uçta hareket edebilen kaynak noktası, sağda sabit destek var. Kaynağın ilk hareketine göre denge çizgisinin üstünde bir tepe veya altında bir çukur görülüyor.",
    param: { label: "Geçen süre", min: pulseGenerationTime.min, max: pulseGenerationTime.max, step: pulseGenerationTime.step, init: pulseGenerationTime.initial, unit: " s" },
    picks: [
      { label: "Tepe", title: "Tepe atması", detail: ["Sol uç önce yukarı çıkar, sonra dengeye iner."] },
      { label: "Çukur", title: "Çukur atması", detail: ["Sol uç önce aşağı iner, sonra dengeye çıkar."] },
    ],
    draw: (time, _step, pick) => {
      const state = generatingPulseAt(time, pick === 1 ? -1 : 1);
      return {
        els: [
          base(0, 8),
          ...wall(8, -1.6, 1.6),
          wave(pulseLine(0, 8, state.height, 0, 160), "b"),
          seg(v(0, -1.48), v(0, 1.48), { tone: "muted", dash: true }),
          circle(v(0, state.sourceHeight), 0.09, { tone: "a", fill: "a" }),
          txt(v(0, 1.75), "Kaynak ucu", "n", { small: true }),
          vec(v(3.2, 1.75), v(6.5, 1.75), { tone: "ink", bold: true }),
          txt(v(4.85, 1.9), "İlerleme", "n", { small: true, bold: true }),
          ...(state.width >= 1 ? span(v(state.rear, -1.62), v(state.front, -1.62), `${fmt(state.width, 2)} m`, 1, "a") : []),
          txt(v(2, -2.75), "Tepe", "c", { pick: 0, small: true, bold: pick !== 1 }),
          txt(v(6, -2.75), "Çukur", "c", { pick: 1, small: true, bold: pick === 1 }),
        ],
        readout: [`Kaynak ucu ${fmt(state.sourceHeight, 2)} m. Arka sınır ${fmt(state.rear, 2)} m, ön sınır ${fmt(state.front, 2)} m. Genişlik ${fmt(state.width, 2)} m.`],
      };
    },
  },
  [pulseDirectionTitle]: {
    caption: "Tepe veya çukuru seç. İlerleme okuna göre P ön eğimde, K ise arka eğimde işaretlenir.",
    alt: "Yay kesitinde denge çizgisi, yatay ilerleme oku ve atmanın iki eğiminde düşey hareket okları var. P ilerleme tarafını, K arka tarafı gösteriyor.",
    picks: pulseDirectionCases.map(({ label }, index) => {
      const { front, rear } = pulseDirectionAt(index);
      return { label, title: label, detail: [`Öndeki P ${verticalDirection(front.verticalVelocity)}, arkadaki K ${verticalDirection(rear.verticalVelocity)} hareket eder.`] };
    }),
    draw: (_value, _step, pick = -1) => {
      const snapshot = pulseDirectionAt(pick);
      const forward = snapshot.direction === 1;
      const points = [{ ...snapshot.front, name: "P", tone: "a" as const }, { ...snapshot.rear, name: "K", tone: "b" as const }];
      return {
        els: [
          base(0, 8),
          wave(pulseLine(0, 8, snapshot.height, 0, 160), "ink"),
          vec(v(forward ? 1.15 : 6.85, 2.18), v(forward ? 6.85 : 1.15, 2.18), { tone: "ink", bold: true }),
          txt(v(4, 2.38), "İlerleme", "n", { small: true, bold: true }),
          txt(v(7.7, -0.18), "Denge", "s", { small: true }),
          ...points.flatMap(({ x, y, verticalVelocity, name, tone }) => [
            circle(v(x, y), 0.07, { tone, fill: tone }),
            vec(v(x, y), v(x, y + Math.sign(verticalVelocity) * 0.63), { tone, bold: true }),
            txt(v(x + 0.16, y + Math.sign(verticalVelocity) * 0.45), name, "e", { small: true, bold: true, tone }),
          ]),
          ...pulseDirectionCases.map(({ label }, index) => txt(v(1.8 + (index % 2) * 4.4, -2.25 - Math.floor(index / 2) * 1.0), label, "c", {
            pick: index, small: true, bold: index === (pick < 0 ? 0 : pick),
          })),
        ],
        readout: [snapshot.label, `P ${verticalDirection(snapshot.front.verticalVelocity)} · K ${verticalDirection(snapshot.rear.verticalVelocity)}`],
      };
    },
  },
  [springPulseTitle]: {
    caption: "Solda bir kez hareket eden kaynak, sağda sabit destek var. Zamanı değiştirince atma sağa ilerler. P kendi düşey çizgisinde kalır. Genişliği iki uç arasından oku.",
    alt: "Bir ucu kaynağa, diğer ucu sabit duvara bağlı yay. Tek tepeli atma sağa ilerliyor. P işaretli nokta aynı yatay konumda yukarı ve aşağı hareket ediyor.",
    param: { label: "Geçen süre", min: 0, max: 1.5, step: 0.25, init: 0, unit: " s" },
    draw: (time) => {
      const { leftM, rightM, displacement } = springPulseAt(time);
      return {
        els: [
          base(0, pulseSupportM),
          wave(pulseLine(0, pulseSupportM, displacement)),
          ...wall(pulseSupportM, -0.7, 0.7),
          seg(v(0, -0.4), v(0, 0.62), { tone: "warn", dash: true }),
          txt(v(0, -0.61), "Kaynak", "s", { small: true }),
          txt(v(pulseSupportM, -0.81), "Sabit uç", "s", { small: true }),
          seg(v(pulseMarkerM, -0.09), v(pulseMarkerM, 1.5), { tone: "a", dash: true, thin: true }),
          pt(v(pulseMarkerM, displacement(pulseMarkerM)), "P", "n", "a"),
          vec(v(6.5, 1.62), v(9.3, 1.62), { tone: "b" }),
          txt(v(7.9, 1.75), "Atmanın yönü", "n", { small: true }),
          ...span(v(leftM, -0.42), v(rightM, -0.42), "3 m", -1, "c"),
        ],
        readout: [`${fmt(time, 2)} s sonra sol uç ${fmt(leftM)} m, sağ uç ${fmt(rightM)} m. Genişlik ${pulseWidthM} m.`, `Atma sağa ${pulseSpeedMps} m/s ile ilerler. P’nin yatay konumu ${fmt(pulseMarkerM)} m.`],
      };
    },
  },
  "Atmanın genişliği, genliği ve yönü ayrı": {
    caption:
      "v = 2 m/s yayda kaynağın sarsılma süresini değiştir: genişlik w = v·Δt ile değişir, genlik (A = 1 birim) aynı kalır. İlerleme oku ile uzanımın yukarı olması ayrı bilgilerdir.",
    alt: "Düz yay üzerinde tek tepe atması; genlik dikey ölçü, genişlik yatay ölçü ve sağa ilerleme oku.",
    param: { label: "Δt", min: 0.5, max: 2, step: 0.25, init: 1, unit: " s" },
    draw: (dt) => {
      const w = 2 * dt;
      return {
        els: [
          base(0, 9),
          wave(pulseLine(0, 9, (x) => bump(x, 4, w, 1.5))),
          ...span(v(4, 0), v(4, 1.5), "A", -1, "a"),
          ...span(v(4 - w / 2, -0.4), v(4 + w / 2, -0.4), `w = ${fmt(w, 2)} m`, -1, "c"),
          vec(v(4 + w / 2 + 0.3, 1.2), v(4 + w / 2 + 1.5, 1.2), { tone: "b", bold: true }),
          txt(v(4 + w / 2 + 1.5, 1.2), "v", "e", { small: true, tone: "b" }),
        ],
        readout: [`w = 2 · ${fmt(dt, 2)} = ${fmt(w, 2)} m`],
      };
    },
  },
  "İdeal ip süratinde kök oranını koru": {
    caption:
      "μ = 0,01 kg/m'lik ipte gerilimi değiştir: v = √(F/μ). Gerilim 4 katına çıkınca sürat yalnız 2 katına çıkar. Oklar 0,1 s'de atmanın aldığı yolu gösterir.",
    alt: "İki ip: üstte 1 newton gerilimli referans ip ve kısa ok, altta sürgüyle değişen gerilimli ip ve uzunluğu sürate göre değişen ok.",
    param: { label: "F", min: 1, max: 16, step: 1, init: 4, unit: " N" },
    draw: (F) => {
      const v0 = Math.sqrt(1 / 0.01);
      const vv = Math.sqrt(F / 0.01);
      const sc = 0.1 * 0.15;
      return {
        els: [
          base(0, 7, 2),
          wave(pulseLine(0, 7, (x) => bump(x, 1.2, 1.4, 0.8), 2)),
          vec(v(2.1, 2.4), v(2.1 + v0 * sc * 10, 2.4), { tone: "muted", bold: true }),
          txt(v(0, 3), `F = 1 N: v = ${fmt(v0)} m/s`, "e", { small: true, tone: "muted" }),
          base(0, 7, 0),
          wave(pulseLine(0, 7, (x) => bump(x, 1.2, 1.4, 0.8), 0)),
          vec(v(2.1, 0.4), v(2.1 + vv * sc * 10, 0.4), { tone: "a", bold: true }),
          txt(v(0, 1), `F = ${fmt(F)} N: v = ${fmt(vv)} m/s`, "e", { small: true, tone: "a" }),
        ],
        readout: [`v = √(${fmt(F)} / 0,01) = ${fmt(vv)} m/s`, `Gerilim ${fmt(F)} kat → sürat ${fmt(Math.sqrt(F), 2)} kat`],
      };
    },
  },
  "Hareket eden şekilden noktanın yönünü çıkar": {
    caption:
      "Sağa giden atmanın şimdiki (dolu) ve az sonraki (kesikli) biçimi. Kural: ilerleme yönüne göre öndeki noktalar dengeden uzaklaşır, arkadakiler dengeye yaklaşır. Bu yüzden sağ yamaçtaki P yükselir, sol yamaçtaki Q alçalır; tepedeki nokta o an düşey hızsızdır.",
    alt: "Tek tepe atması ve biraz sağa kaymış kesikli kopyası; sağ yamaçta yukarı oklu P, sol yamaçta aşağı oklu Q noktası.",
    draw: () => {
      const f0 = (x: number) => bump(x, 4, 3, 2);
      const f1 = (x: number) => bump(x, 4.5, 3, 2);
      return {
        els: [
          base(0, 9),
          wave(pulseLine(0, 9, f0)),
          wave(pulseLine(0, 9, f1), "muted", true),
          vec(v(6.2, 2.2), v(7.4, 2.2), { tone: "b", bold: true }),
          txt(v(7.4, 2.2), "v", "e", { small: true, tone: "b" }),
          pt(v(4.8, f0(4.8)), "P", "e", "a"),
          vec(v(4.8, f0(4.8)), v(4.8, f0(4.8) + 0.8), { tone: "a" }),
          pt(v(3.2, f0(3.2)), "Q", "w", "c"),
          vec(v(3.2, f0(3.2)), v(3.2, f0(3.2) - 0.8), { tone: "c" }),
        ],
      };
    },
  },
  "Sabit uç neden ters yansıtır?": {
    caption:
      "Duvara bağlı uç yer değiştiremez. Gelen tepe sınırda ters döner ve çukur olarak geri gelir; sürat, genişlik ve genlik büyüklüğü ideal kayıpsız uçta korunur.",
    alt: "Sağda duvar; adım adım önce sağa giden tepe, sonra duvarda biçimi, en son sola giden çukur.",
    steps: ["Gelen tepe sağa gider", "Uçta toplam uzanım sıfır kalır", "Yansıyan çukur sola döner"],
    draw: (_, step) => {
      const c = [4, 8.2, 4][step];
      const A = [1.5, 0.3, -1.5][step];
      return {
        els: [
          ...wall(9, -2, 2),
          base(0, 9),
          wave(pulseLine(0, 9, (x) => bump(x, c, 2.4, A) * (x <= 9 ? 1 : 0))),
          vec(v(c, step === 2 ? -2 : 2), v(step === 2 ? c - 1.5 : c + 1.5, step === 2 ? -2 : 2), { tone: "b", bold: true }),
        ],
      };
    },
  },
  "Serbest uç yer değiştirebilir": {
    caption:
      "Uç sürtünmesiz çubuk üzerindeki halkaya bağlı, serbestçe kayabilir. Gelen tepe ters dönmeden tepe olarak yansır; yalnız ilerleme yönü tersine döner.",
    alt: "Sağda dikey çubuk ve halka; adım adım sağa giden tepe, uçta yükselmiş halka ve sola dönen tepe.",
    steps: ["Gelen tepe sağa gider", "Uç yükselir, toplam anlık iki kat", "Yansıyan tepe sola döner"],
    draw: (_, step) => {
      const c = [4, 9, 4][step];
      const A = [1.5, 3, 1.5][step];
      const yEnd = step === 1 ? 3 : 0;
      return {
        els: [
          seg(v(9.15, -2), v(9.15, 3.6), { tone: "ink", bold: true }),
          circle(v(9.15, yEnd), 0.2, { tone: "a" }),
          base(0, 9),
          wave(pulseLine(0, 9, (x) => (step === 1 ? bump(x, 9, 2.4, 3) : bump(x, c, 2.4, A)))),
          vec(v(step === 1 ? 6 : c, 2.2), v(step === 2 ? c - 1.5 : (step === 1 ? 6 : c) + 1.5, 2.2), { tone: "b", bold: true }),
        ],
      };
    },
  },
  "Hafiften ağıra geçişte iki ayrı atma oluşur": {
    caption:
      "Aynı gerilimde ince (hafif) ipten kalın (ağır) ipe: yansıyan atma ilk ipte çukur olarak ve aynı süratle döner, iletilen atma tepe olarak ağır ipte daha yavaş ve daha dar ilerler.",
    alt: "Ortada birleşme noktası; solda ince, sağda kalın ip. Önce gelen tepe, sonra solda sola giden küçük çukur ve sağda daha dar tepe.",
    steps: ["Gelen tepe ince ipte", "Yansıyan çukur + iletilen dar tepe"],
    draw: (_, step) => {
      const els: El[] = [seg(v(0, 0), v(6, 0), { tone: "muted", thin: true }), seg(v(6, 0), v(12, 0), { tone: "ink", bold: true }), pt(v(6, 0), "", "n", "ink")];
      if (step === 0) els.push(pulseOnly(3, 2.4, 1.5), vec(v(3.5, 2), v(5, 2), { tone: "b" }));
      else
        els.push(
          pulseOnly(3, 2.4, -0.6),
          vec(v(3, -1.2), v(1.5, -1.2), { tone: "b" }),
          pulseOnly(8, 1.2, 0.9, "c"),
          vec(v(8.3, 1.3), v(9.1, 1.3), { tone: "c" }),
          txt(v(9.1, 1.3), "yavaş", "e", { small: true, tone: "c" }),
        );
      els.push(txt(v(3, -2), "hafif ip", "s", { small: true, tone: "muted" }), txt(v(9, -2), "ağır ip", "s", { small: true }));
      return { els };
    },
  },
  "Ağırdan hafife geçişte yansıma düzdür": {
    caption:
      "Aynı gerilimde kalın (ağır) ipten ince (hafif) ipe: yansıyan atma tepe olarak döner (ters dönmez), iletilen tepe hafif ipte daha hızlı ve daha geniştir.",
    alt: "Solda kalın, sağda ince ip; önce gelen tepe, sonra solda sola giden küçük tepe ve sağda daha geniş tepe.",
    steps: ["Gelen tepe ağır ipte", "Yansıyan tepe + iletilen geniş tepe"],
    draw: (_, step) => {
      const els: El[] = [seg(v(0, 0), v(6, 0), { tone: "ink", bold: true }), seg(v(6, 0), v(14, 0), { tone: "muted", thin: true }), pt(v(6, 0), "", "n", "ink")];
      if (step === 0) els.push(pulseOnly(3, 1.8, 1.5), vec(v(3.5, 2), v(5, 2), { tone: "b" }));
      else
        els.push(
          pulseOnly(3, 1.8, 0.6),
          vec(v(3, 1), v(1.5, 1), { tone: "b" }),
          pulseOnly(10, 3.6, 1.8, "c"),
          vec(v(11.6, 2.1), v(13, 2.1), { tone: "c" }),
          txt(v(13, 2.1), "hızlı", "e", { small: true, tone: "c" }),
        );
      els.push(txt(v(3, -1), "ağır ip", "s", { small: true }), txt(v(10, -1), "hafif ip", "s", { small: true, tone: "muted" }));
      return { els };
    },
  },
  "Üst üste binmede işaretli toplam al": {
    caption:
      "+4 cm'lik tepe ile −7 cm'lik çukur aynı noktada tam üst üste gelince uzanımlar işaretleriyle toplanır: 4 + (−7) = −3 cm. Büyüklükleri toplamak (11 cm) yanlıştır.",
    alt: "Adım adım: önce birbirine yaklaşan bir tepe ve bir çukur, sonra çakıştıkları anda −3 santimetrelik küçük çukur.",
    steps: ["Yaklaşırken", "Tam çakışma anı"],
    draw: (_, step) => {
      const sc = 0.3;
      if (step === 0)
        return {
          els: [
            base(0, 12),
            wave(pulseLine(0, 12, (x) => bump(x, 3, 2.4, 4 * sc) + bump(x, 9, 2.4, -7 * sc))),
            txt(v(3, 4 * sc), "+4 cm", "n", { small: true, tone: "a" }),
            txt(v(9, -7 * sc), "−7 cm", "s", { small: true, tone: "warn" }),
            vec(v(4.2, 0.4), v(5.4, 0.4), { tone: "b" }),
            vec(v(7.8, 0.4), v(6.6, 0.4), { tone: "b" }),
          ],
        };
      return {
        els: [
          base(0, 12),
          pulseOnly(6, 2.4, 4 * sc, "muted", true),
          pulseOnly(6, 2.4, -7 * sc, "muted", true),
          wave(pulseLine(0, 12, (x) => bump(x, 6, 2.4, -3 * sc)), "c"),
          txt(v(6.6, -3 * sc), "−3 cm", "e", { small: true, tone: "c", bold: true }),
        ],
        readout: ["y = (+4) + (−7) = −3 cm"],
      };
    },
  },
  "Karşılaşma kalıcı yok olma değildir": {
    caption:
      "Zıt yönde 1 m/s ile ilerleyen eş biçimli tepe ve çukur. Zamanı değiştir: t = 3 s'de bir an düz ip görünür, sonra ikisi de biçimini koruyarak yoluna devam eder. Merkezler arası uzaklık 2 m/s ile azalır.",
    alt: "İp üzerinde birbirine doğru ilerleyen bir tepe ve bir çukur; kesikli çizgiler tek tek atmaları, kalın çizgi toplamı gösteriyor.",
    param: { label: "t", min: 0, max: 6, step: 0.5, init: 1, unit: " s" },
    draw: (t) => {
      const c1 = 3 + t;
      const c2 = 9 - t;
      return {
        els: [
          base(0, 12),
          pulseOnly(c1, 2.4, 1.5, "a", true),
          pulseOnly(c2, 2.4, -1.5, "warn", true),
          wave(pulseLine(0, 12, (x) => bump(x, c1, 2.4, 1.5) + bump(x, c2, 2.4, -1.5)), "b"),
        ],
        readout: [`Merkezler arası: ${fmt(Math.abs(c2 - c1))} m`],
      };
    },
  },
};

const su: Record<string, FigureDef> = {
  [surfaceWaveTitle]: {
    caption: "Zamanı ilerlet. P işareti kesik çemberi dolaşır. Tepe etiketi sağa doğru ilerler. Başlangıçta P ve izlenen tepe aynı konumdadır.",
    alt: "Su yüzeyinin yandan görünümü. Üç metre çevresindeki P işareti çember çizer. Tepe etiketi, su yüzeyinde sağa ilerleyen tepeyi izler.",
    param: { label: "Geçen süre", min: 0, max: 1, step: 0.125, init: 0, unit: " T" },
    draw: (time) => {
      const position = surfaceWavePosition(surfaceMarkerM, time);
      const crest = surfaceCrestX(time);
      const surface = Array.from({ length: 121 }, (_, index) => {
        const { x, y } = surfaceWavePosition(index / 10, time);
        return v(x, y);
      });
      return {
        els: [
          base(0, 12),
          wave(surface),
          circle(v(surfaceMarkerM, 0), surfaceAmplitudeM, { dash: true, tone: "a" }),
          pt(v(position.x, position.y), "P", "sw", "a"),
          seg(v(crest, surfaceAmplitudeM + 0.05), v(crest, 1.03), { tone: "c", dash: true }),
          txt(v(crest, 1.03), "Tepe", "n", { tone: "c", small: true, bold: true }),
          vec(v(8, 1.92), v(10.5, 1.92), { tone: "b" }),
          txt(v(9.25, 2.1), "Yayılma", "n", { small: true }),
        ],
        readout: [`P’nin yatay konumu ${fmt(position.x, 2)} m. İzlenen tepenin yatay konumu ${fmt(crest, 2)} m.`],
      };
    },
  },
  "Cephenin yönünü oku": {
    caption:
      "Üstten görünüm. Sol: düz çubuğun doğrusal cepheleri, ilerleme oku cepheye diktir ve ardışık iki tepe çizgisi arası λ'dır. Sağ: noktasal kaynağın dairesel cephelerinde ışınlar merkezden dışarı yayılır.",
    alt: "Solda paralel dikey çizgiler ve onlara dik ok, aralarında λ ölçüsü; sağda iç içe daireler ve merkezden çıkan dört ok.",
    draw: () => ({
      els: [
        seg(v(0, -2), v(0, 2), { tone: "ink", bold: true }),
        ...[1, 2, 3, 4].map((k) => seg(v(k, -2), v(k, 2), { tone: "b" })),
        vec(v(1.5, 0), v(3.5, 0), { tone: "a", bold: true }),
        ...span(v(2, -2.3), v(3, -2.3), "λ", -1, "c"),
        pt(v(8.5, 0), "", "sw", "ink"),
        txt(v(8.5, -2.75), "K (kaynak)", "s", { small: true }),
        ...[0.8, 1.6, 2.4].map((r) => circle(v(8.5, 0), r, { tone: "b" })),
        ...[30, 120, 210, 300].map((a) => vec(add(v(8.5, 0), pol(0.4, a)), add(v(8.5, 0), pol(2.8, a)), { tone: "a" })),
      ],
    }),
  },
  "Üç büyüklüğü aynı denklemde birleştir": {
    caption:
      "Aynı leğende dalga sürati v = 12 cm/s sabitken kaynak frekansını değiştir: λ = v/f, ardışık tepe çizgileri sıklaşır ya da açılır.",
    alt: "Üstten görünümde paralel tepe çizgileri; frekansa göre aralıkları değişiyor, bir aralık λ olarak ölçülü.",
    param: { label: "f", min: 2, max: 6, step: 1, init: 3, unit: " Hz" },
    draw: (f) => {
      const lam = 12 / f;
      const sc = 0.5;
      const n = Math.floor(12 / (lam * sc));
      return {
        els: [
          seg(v(0, -2), v(0, 2), { tone: "ink", bold: true }),
          ...Array.from({ length: n }, (_, k) => seg(v((k + 1) * lam * sc, -2), v((k + 1) * lam * sc, 2), { tone: "b" })),
          ...span(v(lam * sc, -2.3), v(2 * lam * sc, -2.3), `λ = ${fmt(lam)} cm`, -1, "c"),
        ],
        readout: [`λ = 12 / ${fmt(f)} = ${fmt(lam)} cm`, `T = 1/f = ${fmt(1 / f, 3)} s`],
      };
    },
  },
  "Düz engelde yansımayı kur": {
    caption:
      "Gelme açısını değiştir: açılar engelin normalinden ölçülür ve r = i'dir. Işın ile engel arasındaki açı 90° − i'dir; onu i sanmak tümleyen hatasıdır.",
    alt: "Yatay engel, ondan dik çıkan kesikli normal; normalle i açısı yapan gelen ışın ve aynı açıyla yansıyan ışın.",
    param: { label: "i", min: 0, max: 75, step: 5, init: 35, unit: "°" },
    draw: (i) => {
      const o = v(0, 0);
      const inP = add(o, pol(4, 90 + i));
      const outP = add(o, pol(4, 90 - i));
      return {
        els: [
          seg(v(-5, 0), v(5, 0), { tone: "ink", bold: true }),
          ...Array.from({ length: 16 }, (_, k) => seg(v(-4.8 + k * 0.6, 0), v(-5.1 + k * 0.6, -0.3), { thin: true, tone: "muted" })),
          seg(o, v(0, 4.4), { dash: true, tone: "muted" }),
          txt(v(0, 4.4), "normal", "n", { small: true, tone: "muted" }),
          vec(inP, o, { tone: "a", bold: true }),
          vec(o, outP, { tone: "c", bold: true }),
          ...(i > 0 ? [ang(o, v(0, 1), inP, "i", { tone: "a", r: 44 }), ang(o, outP, v(0, 1), "r", { tone: "c", r: 64 })] : []),
          ...(i > 0 && i < 75 ? [ang(o, v(-1, 0), inP, "", { tone: "warn", r: 26 })] : []),
        ],
        readout: [`i = r = ${i}°`, `Engel ile ışın arası (turuncu yay) = 90° − ${i}° = ${90 - i}°`],
      };
    },
  },
  "Dairesel ve eğri engelleri karşılaştır": {
    caption:
      "Noktasal kaynak K, düz engelden 2 birim uzakta. Yansıyan cepheler engelin arkasındaki simetrik nokta K′'den çıkıyormuş gibi yayılır; K′ gerçek bir titreştirici değildir.",
    alt: "Dikey düz engel; solunda kaynak K ve çevresinde daire yayları, sağında kesikli sanal kaynak K′; K′ merkezli kesikli yaylar engelin sol tarafına dönmüş.",
    draw: () => {
      const K = v(-2, 0);
      const K2 = v(2, 0);
      const arc = (c: V, r: number, a0: number, a1: number, tone: Tone, dash = false): El =>
        poly(Array.from({ length: 41 }, (_, i) => add(c, pol(r, a0 + ((a1 - a0) * i) / 40))), { open: true, tone, dash, bold: !dash });
      const els: El[] = [seg(v(0, -4), v(0, 4), { tone: "ink", bold: true }), pt(K, "K", "w", "a"), pt(K2, "K′", "e", "muted", true)];
      for (const r of [1, 2]) els.push(arc(K, r, 0, 360, "b"));
      for (const r of [3, 4]) {
        const a = deg(Math.acos(2 / r));
        els.push(arc(K, r, a, 360 - a, "b"), arc(K2, r, 180 - a, 180 + a, "c"));
      }
      els.push(...span(K, v(0, 0), "2", -1), ...span(v(0, 0), K2, "2", -1, "muted"));
      return { els };
    },
  },
  "Derinlik değişince kaynak değişmez": {
    caption:
      "Üstten görünüm, dik geliş. Derin bölgede v₁ = 12 cm/s, sığ bölgede v₂ = 6 cm/s; frekans 4 Hz'de aynı kalır. Bu yüzden λ 3 cm'den 1,5 cm'ye iner ve tepe çizgileri sığda sıklaşır.",
    alt: "Ortada dikey sınır; solda geniş aralıklı, sağda yarı aralıklı paralel tepe çizgileri; her iki bölgede λ ölçüsü.",
    draw: () => {
      const sc = 0.8;
      const els: El[] = [poly([v(6 * sc * 2, -2.4), v(12 * sc * 1.5, -2.4), v(12 * sc * 1.5, 2.4), v(6 * sc * 2, 2.4)], { fill: "muted", tone: "muted", thin: true })];
      for (let x = 3; x <= 12; x += 3) els.push(seg(v(x * sc, -2), v(x * sc, 2), { tone: "b" }));
      for (let x = 13.5; x <= 18; x += 1.5) els.push(seg(v(x * sc, -2), v(x * sc, 2), { tone: "c" }));
      els.push(
        ...span(v(3 * sc, -2.5), v(6 * sc, -2.5), "λ₁ = 3 cm", -1, "b"),
        ...span(v(13.5 * sc, -2.5), v(15 * sc, -2.5), "λ₂ = 1,5", -1, "c"),
        txt(v(6 * sc, 2.4), "derin: v₁ = 12 cm/s", "n", { small: true }),
        txt(v(15 * sc, 2.4), "sığ: v₂ = 6 cm/s", "n", { small: true }),
      );
      return { els, readout: ["f = 12/3 = 6/1,5 = 4 Hz"] };
    },
  },
  "Kırılma açısını normalden denetle": {
    caption:
      "Derinden (v₁ = 2 birim) sığa (v₂ = 1 birim) geçen ışının gelme açısını değiştir: sin i / sin r = v₁/v₂ = 2. Yavaş bölgeye giren ışın normale yaklaşır.",
    alt: "Yatay sınır, dikey kesikli normal; üst bölgeden gelen ışın sınırda kırılıp alt bölgede normale daha yakın ilerliyor; iki açı etiketli.",
    param: { label: "i", min: 0, max: 80, step: 5, init: 40, unit: "°" },
    draw: (i) => {
      const r = deg(Math.asin(Math.sin(rad(i)) / 2));
      const o = v(0, 0);
      const inP = add(o, pol(4, 90 + i));
      const outP = add(o, pol(4, -90 + r));
      return {
        els: [
          poly([v(-5, 0), v(5, 0), v(5, -4.3), v(-5, -4.3)], { fill: "muted", tone: "muted", thin: true }),
          seg(v(-5, 0), v(5, 0), { tone: "ink" }),
          seg(v(0, 4.3), v(0, -4.3), { dash: true, tone: "muted" }),
          vec(inP, o, { tone: "a", bold: true }),
          vec(o, outP, { tone: "c", bold: true }),
          ...(i > 0 ? [ang(o, v(0, 1), inP, "i", { tone: "a", r: 44 }), ang(o, v(0, -1), outP, "r", { tone: "c", r: 44 })] : []),
          txt(v(-5, 3.6), "derin (hızlı)", "e", { small: true }),
          txt(v(-5, -3.8), "sığ (yavaş)", "e", { small: true }),
        ],
        readout: [`sin r = sin ${i}° / 2 = ${fmt(Math.sin(rad(i)) / 2, 3)} → r ≈ ${fmt(r)}°`],
      };
    },
  },
  "Kırılma ve kırınımı ayır": {
    caption:
      "λ = 1 birimlik düz dalga bir açıklıktan geçiyor. Açıklığı daralt: a/λ küçüldükçe dalga açıklıktan sonra daha geniş açıyla yayılır (kırınım). Ortam aynı olduğu için λ ve f değişmez; bu kırılma değildir. Yayılma açısı nitel çizilmiştir.",
    alt: "Ortada iki parçalı dikey engel ve aralarında açıklık; solda düz cepheler, sağda açıklık genişliğine göre düz kalan ya da yaylara dönüşen cepheler.",
    param: { label: "a", min: 0.5, max: 5, step: 0.5, init: 1, unit: " λ" },
    draw: (a) => {
      const half = a / 2;
      const spread = deg(Math.asin(Math.min(1, 1 / a)));
      const els: El[] = [seg(v(0, half), v(0, 4.5), { tone: "ink", bold: true }), seg(v(0, -half), v(0, -4.5), { tone: "ink", bold: true })];
      for (let k = 1; k <= 4; k++) els.push(seg(v(-k, -4), v(-k, 4), { tone: "b" }));
      const arc = (c: V, r: number, a0: number, a1: number): El =>
        poly(Array.from({ length: 25 }, (_, j) => add(c, pol(r, a0 + ((a1 - a0) * j) / 24))), { open: true, tone: "c", bold: true });
      for (let k = 1; k <= 4; k++) {
        els.push(seg(v(k, -half), v(k, half), { tone: "c", bold: true }));
        els.push(arc(v(0, half), k, 0, spread), arc(v(0, -half), k, -spread, 0));
      }
      return { els, readout: [`a/λ = ${fmt(a)}: yayılma ${a <= 1 ? "çok belirgin" : a <= 2 ? "belirgin" : "zayıf"}`] };
    },
  },
  "Stroboskop görüntüsü gerçek durma değildir": {
    caption:
      "Yarık sayısını değiştir: disk saniyede 3 tur dönerken saniyede n·3 bakış sağlar. Dalga frekansı bu bakış sayısına eşitse her bakışta cepheler aynı yerde görünür ve dalga duruyormuş gibi algılanır.",
    alt: "Dairesel disk ve kenarında eşit aralıklı yarık işaretleri; yanında yarık sayısı ile frekans çarpımı.",
    param: { label: "n", min: 2, max: 12, step: 1, init: 6, unit: " yarık" },
    draw: (n) => ({
      els: [
        circle(v(0, 0), 2.5, { tone: "ink", fill: "muted" }),
        pt(v(0, 0), "", "n", "ink"),
        ...Array.from({ length: n }, (_, k) => seg(pol(1.9, (360 * k) / n), pol(2.5, (360 * k) / n), { tone: "a", bold: true })),
        txt(v(3.2, 0.6), "fdisk = 3 tur/s", "e", { small: true }),
        txt(v(3.2, -0.6), `f = ${n} · 3 = ${3 * n} Hz`, "e", { small: true, bold: true, tone: "a" }),
      ],
      readout: [`Duran görüntü için en basit eşleşme: f = ${3 * n} Hz`],
    }),
  },
};

export const physicsFiguresWaves: Record<string, Record<string, FigureDef>> = {
  "dalgalara-giris": giris,
  "yay-dalgalari": yay,
  "su-dalgalari": su,
};
