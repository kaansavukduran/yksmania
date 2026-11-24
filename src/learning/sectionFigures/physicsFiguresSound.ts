import { circle, fmt, poly, pt, seg, txt, v, vec, type El, type FigureDef, type FigureFrame, type Tone, type V } from "./figureKit";
import { mebiSeismicFocusFigure } from "./mebiSeismicFocusFigure";
import { bellJarCases, bellJarTitle } from "../mebiSoundMedium";
import { timbreAt, timbreCases, timbreFrequencyHz, timbreHarmonicTitle, timbreModes, timbreTitle, timbreWaveTitle } from "../mebiSoundTimbre";
import { intensityRatio, soundLevelCases, soundLevelDifferenceTitle, soundLevelLimits, soundLevelRatioTitle, soundLevelTitle } from "../mebiSoundLevel";
import { animalPitchAt, animalPitchEqualTitle, animalPitchTitle, pitchStageLabels, pitchWindowMs } from "../mebiPitchSamples";
import { bottleBlowTitle, bottleFill, bottlePitchAt, bottlePitchModes, bottlePitchTitle, bottleStrikeTitle } from "../mebiBottlePitch";
import { wireAt, wireDiameter, wireDrawingTitle, wireFrequencyTitle, wireLengthM, wirePairTitle, wireStages, wireTensionN } from "../mebiWirePitch";
import { lengthComparisonTitle, lengthExampleFigure, tensionComparisonTitle, tensionExampleFigure, tensionMultiples, vibratingLength } from "../mebiWireTensionLength";

/*
 * Ses ve deprem dalgaları. The longitudinal wave moves real particle positions
 * x + A·sin(kx − ωt): crowding and thinning travel while each particle only
 * oscillates about its own place (one is tracked in red). Waveforms are exact
 * sines (timbre adds harmonics with stated weights). Numbers follow the guide
 * and the source examples; drawings are not to scale.
 */

const TAU = Math.PI * 2;

/* ---------- 1. Boyuna dalga: sıkışma ve seyrelme ---------- */
function bellJarFrame(step: number): FigureFrame {
  const stage = bellJarCases[step] ?? bellJarCases[0];
  const chamber = [
    v(1.0, 1.0), v(1.0, 4.7), v(1.4, 5.1), v(2.2, 5.37),
    v(5.1, 5.37), v(5.9, 5.1), v(6.3, 4.7), v(6.3, 1.0),
  ];
  const clockCenter = v(3.65, 2.2);
  const particleGrid = [
    v(2.03, 4.33), v(5.2, 3.83), v(1.8, 2.95), v(2.1, 1.57), v(5.36, 2.24),
    v(5.48, 4.64), v(2.84, 4.65), v(4.64, 4.63), v(3.07, 3.53),
    v(4.16, 3.52), v(5.34, 1.58), v(2.87, 1.31),
  ];
  return {
    els: [
      poly(chamber, { fill: "b", tone: "b", bold: true }),
      seg(v(0.8, 1.0), v(6.5, 1.0), { tone: "ink", bold: true }),
      poly([v(-2.1, 1.55), v(-0.45, 1.55), v(-0.45, 2.15), v(-2.1, 2.15)], { tone: "ink", fill: "muted" }),
      seg(v(-2.2, 1.85), v(-2.8, 1.85), { tone: "ink", bold: true }),
      seg(v(-2.8, 1.54), v(-2.8, 2.18), { tone: "ink", bold: true }),
      poly([v(-0.46, 1.84), v(0.35, 1.84), v(0.35, 1.35), v(1.05, 1.35)], { open: true, tone: "muted", bold: true }),
      ...(step === 1 ? [vec(v(-0.5, 2.55), v(-1.9, 2.55), { tone: "a" })] : []),
      ...particleGrid.slice(0, stage.particles).map((point) => circle(point, 0.055, { fill: "b", tone: "b" })),
      circle(clockCenter, 0.72, { tone: "warn", fill: "muted", bold: true }),
      seg(clockCenter, v(3.65, 2.58), { tone: "ink" }),
      seg(clockCenter, v(3.97, 2.12), { tone: "ink" }),
      seg(v(2.48, 2.66), v(2.75, 2.38), { tone: "warn" }),
      seg(v(4.82, 2.66), v(4.55, 2.38), { tone: "warn" }),
      ...Array.from({ length: stage.outgoingWaves }, (_, index) => {
        const x = 6.73 + 0.58 * index;
        const y = 0.49 + 0.24 * index;
        const arc = Array.from({ length: 17 }, (_, i) => {
          const angle = Math.PI * (i - 8) / 30;
          return v(x + 0.55 * Math.cos(angle), 2.8 + y * Math.sin(angle));
        });
        return poly(arc, { open: true, tone: "c", bold: true });
      }),
      txt(v(3.65, 5.87), stage.inside, "n", { tone: "a", small: true }),
      txt(v(-1.68, 1.12), "Tulumba", "s", { tone: "muted", small: true }),
      txt(v(3.65, 0.55), "Çalar saat", "s", { tone: "warn", small: true }),
    ],
    readout: [stage.detail, "Şekildeki dalga işaretleri nitel gözlemi gösterir."],
  };
}

const bellJar: FigureDef = {
  caption: "Fanustaki havayı üç durumda karşılaştır. Saatin titreşimini ve dışarı giden ses işaretlerini aynı çizimde izle.",
  alt: "Cam fanusun içindeki çalar saat her aşamada titreşiyor. Solda hava tulumbası, sağda havadan dışarı taşınan sesi gösteren yay çizgileri var.",
  steps: bellJarCases.map(({ label }) => label),
  draw: (_, step) => bellJarFrame(step),
};

const longitudinal: FigureDef = {
  caption:
    "Sürgüyle zamanı değiştir. Sıkışma ve seyrelme sağa ilerler. İşaretli tanecik kendi denge konumunun iki yanında titreşir.",
  alt: "Solda ses kaynağı var. Hava tanecikleri sağa doğru sıkışma ve seyrelme sıraları oluşturuyor. İşaretli tanecik yatay titreşiyor. Altta basınç değişimi eğrisi.",
  param: { label: "Zaman (periyot)", min: 0, max: 2, step: 0.02, init: 0, playMs: 8000 },
  draw: (t) => {
    const els: El[] = [];
    const A = 0.4;
    const lam = 6;
    const k = TAU / lam;
    const disp = (x: number) => A * Math.sin(k * x - TAU * t);
    for (let row = 0; row < 5; row++) {
      for (let i = 0; i <= 40; i++) {
        const x0 = i * 0.3;
        const tracked = row === 2 && i === 15;
        const p = v(x0 + disp(x0), row * 0.32);
        els.push(circle(p, tracked ? 0.09 : 0.05, { tone: tracked ? "warn" : "b", fill: tracked ? "warn" : "b", thin: true }));
      }
    }
    els.push(
      poly([v(-2.0, 0.47), v(-1.42, 0.47), v(-0.72, 0.14), v(-0.72, 1.12), v(-1.42, 0.80), v(-2.0, 0.80)], { tone: "a", fill: "muted" }),
      seg(v(-1.72, 0.48), v(-1.72, 0.15), { tone: "a", bold: true }),
      txt(v(-1.42, 1.5), "Ses kaynağı", "n", { tone: "a", small: true }),
    );
    const xT = 15 * 0.3;
    els.push(seg(v(xT, -0.25), v(xT, 1.55), { tone: "warn", dash: true, thin: true }));
    // Pressure (density) curve: compression where displacement gradient is negative.
    const pres: V[] = [];
    for (let i = 0; i <= 120; i++) {
      const x = i * 0.1;
      pres.push(v(x, -1.2 - 0.5 * Math.cos(k * x - TAU * t)));
    }
    els.push(seg(v(0, -1.2), v(12, -1.2), { tone: "muted", thin: true }), poly(pres, { tone: "c", open: true, bold: true, smooth: true }));
    els.push(txt(v(12.1, -1.2), "basınç", "e", { tone: "c", small: true }));
    // Label the first compression and rarefaction currently in view.
    // Density ∝ −∂(disp)/∂x: compressions where k·x − ωt = π, rarefactions at 0.
    const xc = (((0.5 + t) % 1) + 1) % 1 * lam;
    const xr = ((t % 1) + 1) % 1 * lam;
    for (const [x0, s, tone] of [
      [xc, "sıkışma", "c"],
      [xr, "seyrelme", "muted"],
    ] as [number, string, Tone][]) {
      const x = x0 < 2.5 ? x0 + lam : x0;
      els.push(txt(v(x, -1.85), s, "s", { tone, small: true, bold: true }), seg(v(x, -1.75), v(x, -0.45), { tone, dash: true, thin: true }));
    }
    els.push(
      vec(v(8.6, 2.35), v(11.2, 2.35), { tone: "ink", thin: true }),
      txt(v(8.5, 2.35), "Yayılma yönü", "w", { tone: "ink", small: true }),
      vec(v(xT, 1.75), v(xT - 0.7, 1.75), { tone: "warn", thin: true }),
      vec(v(xT, 1.75), v(xT + 0.7, 1.75), { tone: "warn", thin: true }),
      txt(v(xT, 2.83), "Tanecik", "n", { tone: "warn", small: true }),
    );
    els.push(txt(v(-0.4, 2.7), " ", "c"), txt(v(13.6, -2), " ", "c"));
    return {
      els,
      readout: [
        `Kırmızı taneciğin denge konumundan uzaklığı: ${(disp(xT) / A).toLocaleString("tr-TR", { maximumFractionDigits: 2 })} × genlik (hep −1 ile +1 arasında kalır)`,
        "Sıkışmada basınç yüksek, seyrelmede düşüktür. Dalga boyu: iki ardışık sıkışma arası. Maddesiz boşlukta (vakum) bu titreşim kurulamaz.",
      ],
    };
  },
};

type WireMeasure = "diameterMm" | "tensionN" | "lengthM";

function wirePairFrame(second: ReturnType<typeof wireAt>, showFrequency: boolean, measure: WireMeasure = "diameterMm"): FigureFrame {
  const first = wireAt(wireDiameter.min);
  const cycleWindowS = 2 / first.frequencyHz;
  const caseLabels = {
    diameterMm: { names: ["K", "L"], unit: "mm", shared: `İki tel de ${fmt(wireLengthM)} m. Gerilimleri ${wireTensionN} N.` },
    tensionN: { names: ["K", "M"], unit: "N", shared: `Tel boyu ${fmt(wireLengthM)} m, çap ${fmt(wireDiameter.min)} mm.` },
    lengthM: { names: ["Uzun K", "Kısa K"], unit: "m", shared: `İki gerilim ${wireTensionN} N. Tel çapı ${fmt(wireDiameter.min)} mm.` },
  }[measure];
  const [firstName, secondName] = caseLabels.names;
  const wires = [
    { name: firstName, state: first, tone: "a", y: 6.0 },
    { name: secondName, state: second, tone: "c", y: 2.15 },
  ] as const;
  const elements = wires.flatMap(({ name, state, tone, y }): El[] => {
    const label = `${name}: ${fmt(state[measure], 3)} ${caseLabels.unit}`;
    if (showFrequency) {
      const cycles = state.frequencyHz * cycleWindowS;
      const wave = Array.from({ length: 141 }, (_, i) =>
        v(0.6 + i / 14, y + 0.92 * Math.sin((i / 140) * Math.PI * 2 * cycles)));
      return [
        poly([v(0.6, y-1.2), v(10.6, y-1.2), v(10.6, y+1.2), v(0.6, y+1.2)], { tone: "muted", thin: true }),
        seg(v(0.6, y), v(10.6, y), { tone: "muted", thin: true }),
        poly(wave, { tone, open: true, bold: true }),
        txt(v(0.6, y+1.45), label, "ne", { tone, small: true }),
      ];
    }
    const thickness = state.diameterMm * 0.10;
    const end = 1 + 7.58 * state.lengthM / wireLengthM;
    const loadCount = state.tensionN / wireTensionN;
    const weights = Array.from({ length: loadCount }, (_, i) => {
      const top = y - 1.02 - i * 0.56;
      return poly([v(end+0.30, top), v(end+0.96, top), v(end+0.96, top-0.48), v(end+0.30, top-0.48)], { tone: "ink", fill: "muted" });
    });
    return [
      poly([v(0.45, y-0.28), v(end-0.08, y-0.28), v(end-0.08, y-0.7), v(0.45, y-0.7)], { tone: "muted", fill: "muted" }),
      seg(v(1, y-0.4), v(1, y+0.24), { tone: "ink", bold: true }),
      poly([v(1, y-thickness), v(end, y-thickness), v(end, y+thickness), v(1, y+thickness)], { tone, fill: tone, thin: true }),
      circle(v(end+0.32, y-0.26), 0.36, { tone: "ink", fill: "muted" }),
      poly([v(end, y+thickness), v(end+0.29, y+0.1), v(end+0.63, y-0.12), v(end+0.63, y-1.02)], { tone, open: true, bold: true }),
      ...weights,
      txt(v(end+1.16, y-1.25), loadCount === 1 ? "G" : `${loadCount}G`, "e", { small: true }),
      txt(v(1, y+0.45), label, "ne", { tone, small: true }),
    ];
  });
  return {
    els: [
      ...elements,
      ...(showFrequency ? [
        txt(v(0.6, 0.2), "0 ms", "se", { tone: "muted", small: true }),
        txt(v(10.6, 0.2), `${fmt(cycleWindowS * 1000, 1)} ms`, "sw", { tone: "muted", small: true }),
      ] : []),
    ],
    readout: [
      caseLabels.shared,
      `${firstName}: ${fmt(first.frequencyHz, 1)} Hz. ${secondName}: ${fmt(second.frequencyHz, 1)} Hz.`,
      measure === "diameterMm" ? `L’nin frekansı K’nın ${fmt(second.frequencyHz / first.frequencyHz, 2)} katı.`
        : `İkinci telin frekansı ilkinin ${fmt(second.frequencyHz / first.frequencyHz, 2)} katı.`,
      showFrequency ? "Grafiklerin zaman ekseni aynı." :
        measure === "tensionN" ? "G bir ağırlığı, 2G iki eş ağırlığı gösterir." : "Her iki makaranın ucundaki ağırlık G ile gösterilir.",
    ],
  };
}

const wirePair: FigureDef = {
  caption: "İki telin gerilimini ve boyunu eşit tut. L’nin çapını değiştir ve sonraki adımda aynı süredeki salınımları karşılaştır.",
  alt: "Aynı uzunluktaki iki tel, makaralar üzerinden eşit G ağırlıklarıyla gerilir. Sonraki adım iki telin titreşimini aynı zaman ölçeğinde gösterir.",
  param: { label: "L telinin çapı", min: wireDiameter.min, max: wireDiameter.max, step: wireDiameter.step, init: wireDiameter.initial, unit: " mm" },
  steps: [...wireStages],
  draw: (diameter, step) => wirePairFrame(wireAt(diameter), step === 1),
};

const tensionComparison: FigureDef = {
  caption: "K ve M tellerinin boyu eşit. M telinin ağırlık sayısını değiştir ve aynı süreli iki grafiği karşılaştır.",
  alt: "K telinin makarasına bir G, aynı boy ve çaptaki M telinin makarasına ayarlanabilir sayıda eş G ağırlığı asılı. Sonraki adım eş süreli iki tel grafiğini gösterir.",
  param: { label: "M telindeki ağırlık", min: tensionMultiples.min, max: tensionMultiples.max,
    step: tensionMultiples.step, init: tensionMultiples.initial, unit: "G" },
  steps: [...wireStages],
  draw: (multiple, step) => wirePairFrame(wireAt(wireDiameter.min, wireTensionN * multiple), step === 1, "tensionN"),
};

const lengthComparison: FigureDef = {
  caption: "K telinin titreşen boyunu değiştir. İki G ağırlığını sabit tutup aynı sürede kaç salınım olduğunu gör.",
  alt: "Uzun K ve kısa K telinin sağdaki makaraları farklı konumda. Her makaranın altında bir G ağırlığı. Sonraki adımda iki grafiğin zamanı eşit.",
  param: { label: "Kısa bölümün boyu", min: vibratingLength.min, max: vibratingLength.max,
    step: vibratingLength.step, init: vibratingLength.initial, unit: " m" },
  steps: [...wireStages],
  draw: (length, step) => wirePairFrame(wireAt(wireDiameter.min, wireTensionN, length), step === 1, "lengthM"),
};

function bottlePitchFrame(percent: number, blowing: boolean): FigureFrame {
  const state = bottlePitchAt(percent, blowing ? "Şişeye üfle" : "Şişeye vur");
  const outline = (x: number): V[] => [
    v(x-0.98, 0.22), v(x-0.98, 3.26), v(x-0.65, 3.72), v(x-0.33, 4.04),
    v(x-0.33, 4.85), v(x+0.33, 4.85), v(x+0.33, 4.04), v(x+0.65, 3.72),
    v(x+0.98, 3.26), v(x+0.98, 0.22),
  ];
  const elements = [2.7, 8.8].flatMap((x, index): El[] => {
    const loaded = index === 1;
    const waterLine = 0.29 + (loaded ? 3 * state.fill : 0);
    const label = loaded ? `Su %${percent}` : "Boş";
    const tone = index === 0 ? "a" : "c";
    return [
      poly(outline(x), { tone: "ink", fill: "muted", bold: true }),
      ...(loaded && state.fill > 0 ? [
        poly([v(x-0.91, 0.29), v(x+0.91, 0.29), v(x+0.91, waterLine), v(x-0.91, waterLine)], { tone: "b", fill: "b" }),
      ] : []),
      seg(v(x-0.45, 4.87), v(x+0.45, 4.87), { tone: "ink", bold: true }),
      ...(blowing ? [
        vec(v(x-1.28, 5.03), v(x+0.46, 5.03), { tone, bold: true }),
        vec(v(x, 4.33), v(x, Math.max(waterLine + 0.48, 2.28)), { tone, thin: true }),
      ] : [
        seg(v(x-2.06, 2.37), v(x-1.02, 3.22), { tone, bold: true }),
        vec(v(x-1.71, 3.35), v(x-1.09, 3.47), { tone }),
        poly([v(x+1.24, 2.62), v(x+1.42, 2.82), v(x+1.24, 3.0)], { open: true, tone, thin: true }),
      ]),
      txt(v(x, -0.03), label, "s", { tone, small: true }),
    ];
  });
  return {
    els: elements,
    readout: [
      blowing ? "Üfleme: su üstündeki hava titreşir." : "Vurma: cam ve varsa su birlikte titreşir.",
      `Boş şişe: 1 kat. Su eklenen şişe: ${fmt(state.frequencyRatio, 2)} kat frekans.`,
      blowing ? `Sağ şişede başlangıçtaki hava hacminin %${Math.round(100 * state.airVolumeRatio)} kadarı kaldı.` : "Gösterge yaklaşık model değerini verir.",
    ],
  };
}

const bottlePitch: FigureDef = {
  caption: "İki şişedeki su düzeyini karşılaştır. Vurma ve üfleme adımlarında hangi bölgenin titreştiğini göster.",
  alt: "Özdeş iki cam şişe yan yana. Soldaki boş, sağdaki su seviyesi değiştirilebilir. Vurma adımında camın yanında çubuk, üfleme adımında şişe ağzında hava oku var.",
  param: { label: "Sağ şişedeki su", min: bottleFill.min, max: bottleFill.max, step: bottleFill.step, init: bottleFill.initial, unit: "%" },
  steps: [...bottlePitchModes],
  draw: (percent, step) => bottlePitchFrame(percent, step === 1),
};

function soundLevelFrame(db: number, compare?: "difference" | "ratio"): FigureFrame {
  const x = db / 10;
  const label = soundLevelCases.find(([value]) => value === db)?.[1] ?? "Ölçekte seçilen düzey";
  const ticks = soundLevelCases.flatMap(([value]): El[] => {
    const major = value % 30 === 0 || value === 140;
    return [
      seg(v(value / 10, 0.78), v(value / 10, major ? 0.1 : 0.46), { tone: "ink", thin: true }),
      ...(major ? [txt(v(value / 10, -0.07), String(value), "s", { tone: "ink", small: true })] : []),
    ];
  });
  const exponent = Math.log10(intensityRatio(0, db)) - 12;
  const exponentText = String(exponent).replace("-", "−");
  return {
    els: [
      poly([v(0, 0.78), v(14, 0.78), v(14, 1.09), v(0, 1.09)], { tone: "b", fill: "b", thin: true }),
      ...ticks,
      ...(compare ? [
        seg(v(5, 1.09), v(5, 1.67), { tone: "a" }),
        seg(v(6, 1.09), v(6, 1.67), { tone: "b" }),
        seg(v(7, 1.09), v(7, 1.67), { tone: "c" }),
        vec(v(5, 1.76), v(6, 1.76), { tone: "a" }),
        vec(v(6, 1.76), v(7, 1.76), { tone: "c" }),
        txt(v(6, 2.55), "20 dB fark", "n", { tone: "ink", small: true }),
      ] : [
        circle(v(x, 1.08), 0.17, { tone: "a", fill: "a", bold: true }),
        seg(v(x, 1.26), v(x, 2.05), { tone: "a", bold: true }),
        txt(v(x, 2.17), `${db} dB`, "n", { tone: "a", small: true }),
      ]),
    ],
    readout: compare === "ratio" ? [
      "50 dB’den 60 dB’ye 10 kat. 60 dB’den 70 dB’ye 10 kat.",
      `Toplam şiddet oranı ${intensityRatio(50, 70)}.`,
    ] : compare === "difference" ? ["50, 60 ve 70 dB ölçek üzerinde. İki adım toplam 20 dB."] : [
      `${label}, ${db} dB. Örnek koşullardaki temsilî düzey.`,
      `Bu düzeyin şiddeti 10 üzeri ${exponentText} W/m².`,
      "Her 10 dB adımında şiddet on katına çıkar.",
    ],
  };
}

const soundLevel: FigureDef = {
  caption: "0 ile 140 dB arasında gez. Aynı büyüklükteki 10 dB aralıklarının şiddette on kat değişime karşılık geldiğini izle.",
  alt: "Yatay desibel ölçeğinde 0 ile 140 arasında eşit aralıklı işaretler. Dikey işaret, seçilen temsilî ses düzeyini gösterir.",
  param: { label: "Temsilî ses düzeyi", min: soundLevelLimits.min, max: soundLevelLimits.max,
    step: soundLevelLimits.step, init: soundLevelLimits.initial, unit: " dB" },
  draw: (db) => soundLevelFrame(db),
};

function timbreFrame(showHarmonics: boolean): FigureFrame {
  const [violin, piano] = timbreCases;
  const base = timbreFrequencyHz;
  const windowMs = 2000 / base;
  if (showHarmonics) {
    return {
      els: [
        seg(v(0.25, 0.8), v(11.75, 0.8), { tone: "muted" }),
        seg(v(0.25, 0.8), v(0.25, 4.8), { tone: "muted", thin: true }),
        txt(v(0.10, 0.80), "0", "w", { tone: "muted", small: true }),
        txt(v(0.10, 4.80), "1", "w", { tone: "muted", small: true }),
        txt(v(6, 6.55), "Göreli genlik", "n", { small: true }),
        ...violin.harmonics.flatMap((height, i): El[] => {
          const x = 2 + i * 4;
          const bar = (center: number, value: number, tone: Tone) => poly(
            [v(center-0.42, 0.8), v(center+0.42, 0.8), v(center+0.42, 0.8+4*value), v(center-0.42, 0.8+4*value)],
            { tone, fill: tone, thin: true },
          );
          return [
            bar(x-0.60, height, "a"),
            bar(x+0.60, piano.harmonics[i], "c"),
            txt(v(x, 0.35), `${(i + 1) * base} Hz`, "s", { small: true }),
          ];
        }),
        txt(v(2.4, 5.25), "Keman", "n", { tone: "a", small: true }),
        txt(v(8.2, 5.25), "Piyano", "n", { tone: "c", small: true }),
      ],
      readout: [
        `Her ikisinde de temel bileşen ${base} Hz ve bir birim. Her çiftte solda keman, sağda piyano.`,
        ...[1, 2].map(i => `${(i + 1) * base} Hz bileşeni keman örneğinde ${fmt(violin.harmonics[i], 2)}, piyanoda ${fmt(piano.harmonics[i], 2)}.`),
      ],
    };
  }
  return {
    els: [
      ...timbreCases.flatMap(({ label, harmonics }, index): El[] => {
        const y = 6.1 - 4.35 * index;
        const tone = index === 0 ? "a" : "c";
        const curve = Array.from({ length: 151 }, (_, i) => v(i * 12 / 150, y + 0.9 * timbreAt(i * 2 / 150, harmonics)));
        return [
          poly([v(0, y-1.5), v(12, y-1.5), v(12, y+1.5), v(0, y+1.5)], { tone: "muted", thin: true }),
          seg(v(0,y), v(12,y), { tone: "muted", thin: true }),
          seg(v(6,y-1.5), v(6,y+1.5), { tone: "muted", thin: true, dash: true }),
          poly(curve, { tone, open: true, bold: true }),
          txt(v(0.3, y+1.7), label, "ne", { small: true, tone }),
        ];
      }),
      txt(v(0,0), "0 ms", "s", { tone: "muted", small: true }),
      txt(v(6,0), `${fmt(windowMs / 2, 2)} ms`, "s", { tone: "muted", small: true }),
      txt(v(12,0), `${fmt(windowMs, 2)} ms`, "s", { tone: "muted", small: true }),
    ],
    readout: [`İki temel frekans da ${base} Hz. Periyot yaklaşık ${fmt(windowMs / 2, 2)} ms.`, "Eğriler göreli basınç değişimini gösterir. Biçimleri farklı, tekrar aralıkları eşit."],
  };
}

const timbre: FigureDef = {
  caption: "Önce aynı zaman penceresindeki iki dalgayı oku. Sonraki adımda temel frekansı ve katlarındaki bileşenleri eşleştir.",
  alt: "Keman ve piyano için eş periyotlu iki temsilî eğri. İkinci adımda 300, 600 ve 900 Hz bileşenleri iki kaynak için yan yana çubuklarla verilir.",
  steps: [...timbreModes],
  draw: (_, step) => timbreFrame(step === 1),
};

const animalPitch: FigureDef = {
  caption: "İki çizgide de aynı 10 ms içinde tam salınımları say. Sonraki adımda genlikleri eşitle ve sayıları yeniden kontrol et.",
  alt: "Aslanın temsilî basınç grafiği üstte, kanaryanınki altta. İkisi de sıfırdan 10 milisaniyeye kadar uzanır. Üstte bir, altta üç tam salınım vardır.",
  steps: [...pitchStageLabels],
  draw: (_, step) => {
    const samples = animalPitchAt(step === 1);
    const chartLeft = 0;
    const chartRight = pitchWindowMs;
    const plots = samples.flatMap((sample, index): El[] => {
      const base = 5.6 - 3.9 * index;
      const values = Array.from({ length: 121 }, (_, i) => {
        const x = pitchWindowMs * i / 120;
        return v(x, base + sample.valueAt(x));
      });
      const tone = index === 0 ? "a" : "c";
      return [
        poly([v(chartLeft, base-1.2), v(chartRight, base-1.2), v(chartRight, base+1.2), v(chartLeft, base+1.2)], { tone: "muted", thin: true }),
        seg(v(chartLeft, base), v(chartRight, base), { tone: "muted", thin: true }),
        poly(values, { open: true, tone, bold: true }),
        txt(v(chartLeft, base + 1.55), sample.label, "e", { tone, small: true }),
      ];
    });
    return {
      els: [
        ...plots,
        txt(v(chartLeft, -0.05), "0 ms", "e", { tone: "muted", small: true }),
        txt(v(chartRight, -0.05), "10 ms", "w", { tone: "muted", small: true }),
      ],
      readout: [
        ...samples.map(({ label, cycles, frequencyHz }) => `${label} örneği: 10 ms’de ${cycles} tam salınım. ${frequencyHz} Hz.`),
        step === 1 ? "Genlikler eşit. Salınım sayıları ve frekanslar aynı kaldı." : "Düşey eksen basınç farkı. Örnek frekanslar öğretim için seçildi.",
      ],
    };
  },
};

/* ---------- 2. Tizlik, gürlük, tını ---------- */
const WAVES: { name: string; f: number; a: number; harm?: number[]; tone: Tone; note: string; why: string }[] = [
  { name: "Temel ses", f: 1, a: 1, tone: "b", note: "300 Hz, genlik A.", why: "Karşılaştırma için başlangıç sesi." },
  { name: "Daha tiz", f: 2, a: 1, tone: "c", note: "600 Hz, aynı genlik: aynı sürede iki kat salınım.", why: "Tizlik (yükseklik) frekansla belirlenir; 600 Hz daha incedir ama daha gür değildir." },
  { name: "Daha gür", f: 1, a: 1.8, tone: "warn", note: "300 Hz, genlik daha büyük.", why: "Aynı düzenekte genlik büyükse ses daha şiddetlidir; tizlik değişmez." },
  { name: "Farklı tını", f: 1, a: 1, harm: [1, 0.45, 0.25], tone: "a", note: "300 Hz temel frekans + harmonikler: periyot aynı, biçim farklı.", why: "Aynı notayı çalan gitar ve piyano tınılarıyla ayırt edilir." },
];
const pitch: FigureDef = {
  caption:
    "İleri ile her sesi gri temel sesle karşılaştır. Yatay eksen zamandır: daha sık salınım = yüksek frekans (tiz), daha büyük tepe = büyük genlik (gür), aynı periyotta farklı biçim = farklı tını.",
  alt: "Zaman ekseni üzerinde gri temel sinüs ve onunla karşılaştırılan renkli dalga: iki kat sık, daha yüksek tepeli ya da aynı periyotlu ama girintili çıkıntılı biçimde.",
  steps: WAVES.map((w) => w.name),
  draw: (_v, step) => {
    const w = WAVES[step];
    const curve = (f: number, a: number, harm?: number[]): V[] => {
      const ps: V[] = [];
      const hs = harm ?? [1];
      const norm = hs.reduce((s, h) => s + h, 0);
      for (let i = 0; i <= 240; i++) {
        const x = (i / 240) * 10;
        let y = 0;
        hs.forEach((h, n) => (y += h * Math.sin(TAU * f * (n + 1) * (x / 5))));
        ps.push(v(x, (a * y) / norm));
      }
      return ps;
    };
    const els: El[] = [vec(v(0, 0), v(10.5, 0), { tone: "ink" }), txt(v(10.6, 0), "zaman", "e", { tone: "ink", small: true })];
    els.push(poly(curve(1, 1), { tone: "muted", open: true, thin: true, smooth: true }));
    if (step > 0) els.push(poly(curve(w.f, w.a, w.harm), { tone: w.tone, open: true, bold: true, smooth: true }));
    els.push(seg(v(0, -0.15), v(0, 0.15), { tone: "ink" }), seg(v(5, -0.15), v(5, 0.15), { tone: "ink" }), txt(v(2.5, -1.15), "T (temel ses)", "s", { tone: "muted", small: true }));
    els.push(seg(v(0, -1.0), v(5, -1.0), { tone: "muted", thin: true }));
    els.push(txt(v(-0.3, 2.2), " ", "c"), txt(v(11.8, -2.2), " ", "c"));
    return { els, readout: [`${w.name}: ${w.note}`, w.why] };
  },
};

/* ---------- 3. Yankı ---------- */
const echo: FigureDef = {
  caption:
    "Sürgüyle zamanı ilerlet: ses 340 m/s ile duvara gider (0,30 s), yansıyıp aynı noktaya döner (0,30 s). Yankı 0,60 s'de duyulur; toplam yol 2d olduğundan d = v·t / 2 = 102 m.",
  alt: "Solda hoparlör ve kulak, sağda tuğla duvar. Aralarındaki yolda sağa giden, sonra sola dönen bir ses atması; altta 0 ile 0,60 s arası zaman çizgisi.",
  param: { label: "Zaman (s)", min: 0, max: 0.6, step: 0.01, init: 0, unit: "s", playMs: 6000 },
  draw: (t) => {
    const D = 8; // 102 m drawn as 8 units
    const vd = D / 0.3;
    const out = t <= 0.3;
    const x = out ? t * vd : D - (t - 0.3) * vd;
    const els: El[] = [];
    // Speaker.
    els.push(poly([v(-0.9, -0.35), v(-0.5, -0.35), v(-0.1, -0.7), v(-0.1, 0.7), v(-0.5, 0.35), v(-0.9, 0.35)], { tone: "ink", fill: "muted" }));
    // Wall of bricks.
    for (let r = 0; r < 6; r++) for (let c = 0; c < 2; c++) els.push(poly([v(D + 0.2 + c * 0.5 + (r % 2) * 0.25, -1.5 + r * 0.5), v(D + 0.68 + c * 0.5 + (r % 2) * 0.25, -1.5 + r * 0.5), v(D + 0.68 + c * 0.5 + (r % 2) * 0.25, -1.04 + r * 0.5), v(D + 0.2 + c * 0.5 + (r % 2) * 0.25, -1.04 + r * 0.5)], { tone: "warn", fill: "warn", thin: true }));
    // Pulse as three arcs facing its direction.
    const dir = out ? 1 : -1;
    for (const k of [0, 0.25, 0.5]) {
      const cx = x - dir * k;
      const arc: V[] = [];
      for (let i = -6; i <= 6; i++) {
        const a = (i / 6) * 0.9;
        arc.push(v(cx + dir * Math.cos(a) * 0.6 - dir * 0.6, Math.sin(a) * 0.6));
      }
      els.push(poly(arc, { tone: out ? "c" : "b", open: true, bold: k === 0, thin: k !== 0, smooth: true }));
    }
    els.push(vec(v(0.2, 1.3), v(D - 0.2, 1.3), { tone: "c", thin: !out }), txt(v(D / 2, 1.45), "gidiş: d", "n", { tone: "c", small: true }));
    els.push(vec(v(D - 0.2, -1.3), v(0.2, -1.3), { tone: "b", thin: out }), txt(v(D / 2, -1.45), "dönüş: d", "s", { tone: "b", small: true }));
    // Time line.
    els.push(seg(v(0, -2.6), v(D, -2.6), { tone: "muted" }), pt(v((t / 0.6) * D, -2.6), undefined, "c", "warn"), txt(v(0, -2.8), "0 s", "s", { tone: "muted", small: true }), txt(v(D, -2.8), "0,60 s", "s", { tone: "muted", small: true }));
    els.push(txt(v(-1.4, 2.2), " ", "c"), txt(v(D + 1.6, -3.4), " ", "c"));
    const gone = 340 * t;
    return {
      els,
      readout: [
        `t = ${t.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} s · sesin aldığı toplam yol = 340 × t = ${Math.round(gone)} m`,
        t >= 0.59 ? "Yankı duyuldu: toplam yol 204 m = 2d → d = 102 m. Kaynak ile alıcı ayrı yerdeyse /2 kuralını körlemesine kullanma." : out ? "Ses henüz duvara ulaşmadı." : "Ses duvardan yansıdı, geri dönüyor.",
      ],
    };
  },
};

/* ---------- 4. Tel uzunluğu yarıya (2020 TYT Fen 6 mantığı) ---------- */
const stringLen: FigureDef = {
  caption:
    "İleri ile gitar telinin titreşen kısmını L'den L/2'ye indir. Temel titreşimde iki ucu sabit telin üstünde yarım dalga vardır: λ = 2L. Aynı tel ve aynı gerginlikte dalga sürati değişmez, bu yüzden frekans iki katına çıkar.",
  alt: "Üstte iki ucu sabit uzun tel ve üzerinde tek kambur duran dalga; altta perdeye basılarak yarıya kısaltılmış tel ve daha kısa tek kambur.",
  steps: ["Uzunluk L", "Uzunluk L/2", "Ne değişti?"],
  draw: (_v, step) => {
    const els: El[] = [];
    const draw1 = (y: number, L: number, tone: Tone, on: boolean) => {
      const ps: V[] = [];
      const ps2: V[] = [];
      for (let i = 0; i <= 60; i++) {
        const x = (i / 60) * L;
        ps.push(v(x, y + 0.7 * Math.sin((Math.PI * x) / L)));
        ps2.push(v(x, y - 0.7 * Math.sin((Math.PI * x) / L)));
      }
      els.push(poly(ps, { tone: on ? tone : "muted", open: true, bold: on, smooth: true }), poly(ps2, { tone: on ? tone : "muted", open: true, dash: true, thin: true, smooth: true }));
      els.push(seg(v(0, y - 0.9), v(0, y + 0.9), { tone: "ink", bold: true }), seg(v(L, y - 0.9), v(L, y + 0.9), { tone: "ink", bold: true }));
    };
    draw1(1.5, 8, "b", step !== 1);
    els.push(txt(v(4, 2.45), "L · λ₁ = 2L", "n", { tone: "b", small: true, bold: true }));
    if (step >= 1) {
      draw1(-1.5, 4, "warn", true);
      els.push(seg(v(4, -2.4), v(8, -2.4), { tone: "muted", dash: true, thin: true }), txt(v(2, -2.5), "L/2 · λ₂ = L", "s", { tone: "warn", small: true, bold: true }));
      els.push(txt(v(4.1, -1.0), "perde", "e", { tone: "ink", small: true }));
    }
    els.push(txt(v(-0.6, 3), " ", "c"), txt(v(9.8, -3.2), " ", "c"));
    const rows: [string, string][] = [
      ["Temel mod: tel boyu yarım dalga boyudur, λ₁ = 2L.", "Örnek: v = 200 m/s, λ₁ = 2 m → f₁ = 100 Hz."],
      ["Titreşen boy L/2: λ₂ = 2·(L/2) = L, yani λ₂/λ₁ = 1/2.", "Örnek: λ₂ = 1 m, v aynı 200 m/s → f₂ = 200 Hz."],
      ["Aynı tel ve gerginlik: v₂ = v₁. v = λf olduğundan f₂/f₁ = λ₁/λ₂ = 2: ses daha tiz.", "Ses dalgası başka ortama geçerken f sabit kalır; burada ise kaynağın (telin) kendisi değişti."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 5. Deprem: odak, merkez üssü, yerel şiddet ---------- */
const quake: FigureDef = {
  caption:
    "Sürgüyle dalga cephelerini odaktan yay. Odak yer altında, merkez üssü onun yeryüzündeki izdüşümüdür. Tek depremin büyüklüğü tektir; A ve B kasabalarında hissedilen yerel şiddet uzaklık, zemin ve yapıya göre farklı olabilir.",
  alt: "Yer kesiti: üstte yeryüzü çizgisi, altında katmanlar; yer altındaki odaktan halka halka yayılan dalga cepheleri, yeryüzünde merkez üssü işareti ve iki yanda A (yumuşak zemin) ve B (kaya zemin) kasabaları.",
  param: { label: "Zaman", min: 0, max: 1, step: 0.02, init: 0.4, playMs: 5000 },
  draw: (t) => {
    const F = v(0, -2.6);
    const els: El[] = [];
    // Layers.
    els.push(poly([v(-7, 0), v(7, 0), v(7, -1.2), v(-7, -1.2)], { tone: "a", fill: "a", thin: true }));
    els.push(poly([v(-7, -1.2), v(7, -1.2), v(7, -4.2), v(-7, -4.2)], { tone: "muted", fill: "muted", thin: true }));
    // Soft basin under A.
    els.push(poly([v(-6.4, 0), v(-3.6, 0), v(-4.2, -0.8), v(-5.8, -0.8)], { tone: "warn", fill: "warn", thin: true, smooth: true }));
    for (let i = 1; i <= 4; i++) {
      const r = (t * 7 + (i - 1) * 1.6) % 7;
      if (r < 0.2) continue;
      const arc: V[] = [];
      for (let a = 0; a <= 72; a++) {
        const th = (a / 72) * TAU;
        const p = v(F[0] + Math.cos(th) * r, F[1] + Math.sin(th) * r);
        if (p[1] <= 0 && p[1] >= -4.2 && Math.abs(p[0]) <= 7) arc.push(p);
        else if (arc.length > 1) {
          els.push(poly(arc.splice(0), { tone: "c", open: true, thin: true, smooth: true }));
        } else arc.length = 0;
      }
      if (arc.length > 1) els.push(poly(arc, { tone: "c", open: true, thin: true, smooth: true }));
    }
    els.push(circle(F, 0.18, { tone: "warn", fill: "warn" }), txt(v(0.3, F[1]), "odak (yer altında)", "e", { tone: "warn", small: true, bold: true }));
    els.push(seg(F, v(0, 0), { tone: "warn", dash: true, thin: true }), poly([v(0, 0.05), v(-0.25, 0.45), v(0.25, 0.45)], { tone: "warn", fill: "warn" }), txt(v(0, 0.6), "merkez üssü", "n", { tone: "warn", small: true, bold: true }));
    const house = (x: number, tone: Tone, label: string) => {
      els.push(poly([v(x - 0.35, 0), v(x + 0.35, 0), v(x + 0.35, 0.45), v(x, 0.75), v(x - 0.35, 0.45)], { tone, fill: tone }));
      els.push(txt(v(x, 0.95), label, "n", { tone, small: true, bold: true }));
    };
    house(-5, "warn", "A · yumuşak zemin");
    house(4.6, "b", "B · kaya zemin");
    els.push(txt(v(-7.4, 2.1), " ", "c"), txt(v(7.4, -4.4), " ", "c"));
    return {
      els,
      readout: [
        "Büyüklük kaynağın ölçeğidir: bu deprem için tek değerdir, kasabaya göre değişmez.",
        "Yerel şiddet A'da daha yüksek olabilir: yumuşak zemin sarsıntıyı büyütebilir, yapı dayanımı da etkilidir. Daha çok hasar, daha büyük “büyüklük” kanıtı değildir.",
      ],
    };
  },
};

export const physicsFiguresSound: Record<string, Record<string, FigureDef>> = {
  "ses-deprem-dalgalari": {
    ...mebiSeismicFocusFigure,
    "Ses bir ortam titreşimidir": longitudinal,
    [bellJarTitle]: bellJar,
    ...Object.fromEntries(bellJarCases.map(({ solutionTitle, detail }, step) => [
      solutionTitle,
      {
        caption: "Fanustaki hava durumunu ve saatin titreşim çizgilerini karşılaştır.",
        alt: detail,
        draw: () => bellJarFrame(step),
      } satisfies FigureDef,
    ])),
    "Yükseklik sözcüğünün iki anlamını çöz": pitch,
    [animalPitchTitle]: animalPitch,
    [timbreTitle]: timbre,
    [timbreWaveTitle]: {
      caption: "İki dalgayı sıfırdan 6,67 ms’ye kadar aynı ölçekle karşılaştır.",
      alt: "Keman ve piyano örnekleri aynı aralıkta tekrar eder. Eğriler farklı biçimdedir.",
      draw: () => timbreFrame(false),
    },
    [timbreHarmonicTitle]: {
      caption: "300, 600 ve 900 Hz’de iki sesin göreli genliklerini oku.",
      alt: "300 Hz çiftinde çubuklar eşit. Keman örneğinde 600, piyano örneğinde 900 Hz bileşeni görece daha büyük.",
      draw: () => timbreFrame(true),
    },
    [soundLevelTitle]: soundLevel,
    [soundLevelDifferenceTitle]: {
      caption: "Ölçekte 50 dB’den 70 dB’ye uzanan iki adımı say.",
      alt: "Desibel ölçeğinde 50, 60 ve 70 işaretli. Oklar 10 dB’lik iki artışı gösterir.",
      draw: () => soundLevelFrame(70, "difference"),
    },
    [soundLevelRatioTitle]: {
      caption: "Her 10 dB adımında şiddet çarpanını onla çarp.",
      alt: "50, 60 ve 70 dB arasında iki ok. Her okun şiddet çarpanı on, toplam oran yüz.",
      draw: () => soundLevelFrame(70, "ratio"),
    },
    [bottlePitchTitle]: bottlePitch,
    [wirePairTitle]: wirePair,
    [tensionComparisonTitle]: tensionComparison,
    [lengthComparisonTitle]: lengthComparison,
    [tensionExampleFigure]: {
      caption: "Bir ve dört G karşılaştırması. İki grafikte eşit süredeki salınımları say.",
      alt: "Aynı sürede bir G ile gerilen tel iki, dört G ile gerilen tel dört tam salınım yapıyor.",
      draw: () => wirePairFrame(wireAt(wireDiameter.min, wireTensionN * 4), true, "tensionN"),
    },
    [lengthExampleFigure]: {
      caption: "Gerilimler eşit. Boy yarıya indiğinde aynı süredeki salınım sayısını karşılaştır.",
      alt: "Aynı sürede uzun K iki, yarı uzunluktaki K dört tam salınım yapıyor.",
      draw: () => wirePairFrame(wireAt(wireDiameter.min, wireTensionN, wireLengthM / 2), true, "lengthM"),
    },
    [wireDrawingTitle]: {
      caption: "İki makarada aynı G ağırlığı var. Tellerin boylarını ve farklı çaplarını karşılaştır.",
      alt: "K ve L telleri aynı boyda, uçlarında aynı G ağırlıkları asılı. Alt sıradaki L teli daha kalın.",
      draw: () => wirePairFrame(wireAt(wireDiameter.initial), false),
    },
    [wireFrequencyTitle]: {
      caption: "Aynı zaman aralığında ince telin iki, kalın telin bir salınımını karşılaştır.",
      alt: "Aynı zaman aralığında K telinde iki, L telinde bir tam salınım görünüyor.",
      draw: () => wirePairFrame(wireAt(wireDiameter.initial), true),
    },
    [bottleStrikeTitle]: {
      caption: "Metal çubukla aynı yerden vur ve yarı dolu şişenin camıyla suya bak.",
      alt: "Boş ve yarı dolu iki özdeş şişe, camın yanına gelen iki metal çubukla gösterilir.",
      draw: () => bottlePitchFrame(bottleFill.initial, false),
    },
    [bottleBlowTitle]: {
      caption: "İki ağza aynı yönde üfle ve su üstünde kalan hava boşluklarını karşılaştır.",
      alt: "Oklar, boş ve yarı dolu şişenin ağızlarından geçen havayı ve içeride titreşen hava boşluklarını gösteriyor.",
      draw: () => bottlePitchFrame(bottleFill.initial, true),
    },
    [animalPitchEqualTitle]: {
      caption: "Genlikler eşitken aynı 10 ms içinde iki çizginin salınımlarını say.",
      alt: "Eşit genlikli iki dalga aynı süreye çizilmiş. Üstte bir, altta üç tam salınım var.",
      draw: () => animalPitch.draw(0, 1),
    },
    "Yankıda mesafeyi iki kez say": echo,
    "Kaynağı değiştirerek notayı değiştir": stringLen,
    "Büyüklük ve yerel şiddet farklıdır": quake,
  },
};
