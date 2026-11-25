import {
  add,
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
  type V,
} from "./figureKit";
import {
  newtonDisplacementTitle, newtonDuration, newtonForces, newtonTimeAt, newtonTimeTitle, newtonVelocityTitle,
} from "../newtonTimeComparison";
import { forcePairsTitle } from "../newtonForcePairs";
import { newtonForcePairsFigure } from "./newtonForcePairs051";
import { frictionThresholdTitle } from "../newtonFrictionThreshold";
import { frictionThresholdFigure } from "./newtonFrictionThreshold052";

/** Minimal labeled axes for physics graphs (t to the right). */
function plotAxes(o: V, w: number, hUp: number, hDown: number, xLabel: string, yLabel: string): El[] {
  return [
    vec(add(o, v(0, -hDown)), add(o, v(0, hUp + 0.4)), { tone: "muted", thin: true }),
    vec(o, add(o, v(w + 0.4, 0)), { tone: "muted", thin: true }),
    txt(add(o, v(w + 0.4, 0)), xLabel, "se", { small: true, tone: "muted" }),
    txt(add(o, v(0, hUp + 0.4)), yLabel, "w", { small: true, tone: "muted" }),
  ];
}
const curve = (pts: V[], tone: "a" | "b" | "c" = "b"): El => poly(pts, { open: true, tone, bold: true });
/** A labeled force arrow from a point. */
const force = (from: V, d: V, label: string, tone: "a" | "b" | "c" | "warn" | "ink" = "a", at: "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" = "ne"): El[] => [
  vec(from, add(from, d), { tone, bold: true }),
  txt(add(from, d), label, at, { small: true, tone }),
];
const block = (x: number, y: number, w: number, h: number, label?: string): El[] => [
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], { fill: "muted", tone: "ink" }),
  ...(label ? [txt(v(x + w / 2, y + h / 2), label, "c", { small: true, bold: true })] : []),
];

const timeMeasures = [
  { key: "force", title: "Kuvvet–zaman", axis: "F (N)", unit: "N", rising: false },
  { key: "acceleration", title: "İvme–zaman", axis: "a (m/s²)", unit: "m/s²", rising: false },
  { key: "velocity", title: "Hız–zaman", axis: "v (m/s)", unit: "m/s", rising: true },
] as const;

const newtonTimeParameter: FigureDef["param"] = {
  label: "Zaman (s)", min: 0, max: newtonDuration, step: 0.5, init: 1, once: true,
};

function drawTimeGraph(time: number, measure: typeof timeMeasures[number]) {
  const max = newtonTimeAt(newtonForces[1], newtonDuration)[measure.key];
  const point = (t: number, value: number) => v(t * 1.6, (2.8 * value) / max);
  const at = point(time, 0);
  const els: El[] = [
    ...plotAxes(v(0, 0), 4.8, 3.4, 0, "t (s)", measure.axis)
      .map((element) => element.k === "text" ? { ...element, small: false } : element),
    txt(v(0, 0), "0", "sw", { small: true }),
    txt(point(newtonDuration, 0), String(newtonDuration), "s", { small: true }),
    seg(at, point(time, max), { tone: "muted", thin: true }),
  ];
  const readings = newtonForces.map((force, i) => {
    const start = newtonTimeAt(force, 0)[measure.key];
    const finish = newtonTimeAt(force, newtonDuration)[measure.key];
    const motion = newtonTimeAt(force, time);
    const tone = i === 0 ? "a" : "b";
    if (measure.rising) {
      els.push(seg(point(0, finish), point(newtonDuration, finish), { tone: "muted", thin: true, dash: true }));
    }
    els.push(
      seg(point(0, start), point(newtonDuration, finish), { tone, bold: true, dash: i === 1 }),
      txt(point(0, finish), fmt(finish), "w", { tone }),
      pt(point(time, motion[measure.key]), undefined, "n", tone),
    );
    return `${force} N denemesi: ${fmt(motion[measure.key])} ${measure.unit}`;
  });
  return { els, readout: [`t = ${fmt(time)} s · ${readings.join(" · ")}`] };
}

function drawDisplacement(time: number) {
  const els: El[] = [];
  const fullDistance = newtonTimeAt(newtonForces[1], newtonDuration).displacement;
  const readings = newtonForces.map((force, index) => {
    const y = (1 - index) * 2.6;
    const tone = index === 0 ? "a" : "b";
    const distance = newtonTimeAt(force, time).displacement;
    const x = (distance / fullDistance) * 5;
    els.push(
      seg(v(-0.7, y), v(6, y), { tone: "muted", thin: true }),
      seg(v(0, y - 0.55), v(0, y + 0.85), { tone: "muted", dash: true, thin: true }),
      poly([v(x - 0.25, y), v(x + 0.25, y), v(x + 0.25, y + 0.55), v(x - 0.25, y + 0.55)], { fill: tone, tone }),
      txt(v(-0.9, y + 0.3), `${force} N`, "w", { tone, bold: true }),
    );
    if (x > 0) els.push(vec(v(0, y - 0.43), v(x, y - 0.43), { tone }));
    return `${force} N denemesi: ${fmt(distance, 2)} m`;
  });
  return { els, readout: [`t = ${fmt(time)} s · ${readings.join(" · ")}`] };
}

const newtonTimeFigure: FigureDef = {
  caption: "Grafiklerde düz çizgi 4 N, kesikli çizgi 8 N denemesidir. Yer değiştirme görünümünde iki blok ortak başlangıç çizgisinden uzaklaşır.",
  alt: "Aynı kütleyle yapılan iki deney. Kuvvet ve ivmenin zaman grafikleri yatay, hız doğruları sıfırdan yükselir. Son görünüm iki bloğun yer değiştirmesini aynı ölçekle karşılaştırır. Seçilen andaki değerler çizimin altında okunabilir.",
  steps: [...timeMeasures.map(({ title }) => title), "Yer değiştirme"],
  param: newtonTimeParameter,
  draw: (time, step) => step === timeMeasures.length ? drawDisplacement(time) : drawTimeGraph(time, timeMeasures[step]),
};

const velocityAreaSource003: FigureDef = {
  caption: "Hız sıfırı geçtiğinde alanı böl. Yer değiştirmede eksen altındaki parçalar negatif, alınan yolda bütün alanlar pozitif sayılır.",
  alt: "Hız zaman grafiğinde 0–2 saniye +4 m/s. 2–5 saniyede doğrusal biçimde +4’ten −2’ye iner ve 4. saniyede sıfırı geçer. 5–7 saniye −2 m/s.",
  steps: ["Yön değişimini bul", "Alanları işaretle", "Yol ve yer değiştirmeyi karşılaştır"],
  draw: (_, step) => {
    const start = 2, end = 5, first = 4, last = -2;
    const acceleration = (last - first) / (end - start);
    const turningTime = start - first / acceleration;
    const times = [0, start, turningTime, end, 7];
    const velocities = [first, first, 0, last, last];
    const areas = times.slice(1).map((time, i) => (time - times[i]) * (velocities[i] + velocities[i + 1]) / 2);
    const signedAreas = areas.map((area) => area >= 0 ? `+${area}` : fmt(area).replace("-", "−"));
    const displacement = areas.reduce((total, area) => total + area, 0);
    const distance = areas.reduce((total, area) => total + Math.abs(area), 0);
    const point = (time: number, velocity: number) => v(time, velocity * 0.62);
    const els: El[] = [];
    if (step > 0) areas.forEach((area, i) => {
      const a = times[i], b = times[i + 1];
      const outline = area >= 0 ? "a" : "warn";
      els.push(poly([point(a, 0), point(a, velocities[i]), point(b, velocities[i + 1]), point(b, 0)], { tone: outline, fill: outline, thin: true }));
      els.push(txt(point((a + b) / 2, (velocities[i] + velocities[i + 1]) * 0.25),
        `${step === 2 ? Math.abs(area) : fmt(area)}`, "c", { tone: "ink", bold: true, small: true }));
    });
    els.push(
      vec(v(-0.2, 0), v(7.6, 0), { tone: "ink" }),
      vec(point(0, -2.7), point(0, 4.9), { tone: "ink" }),
      curve(times.map((time, i) => point(time, velocities[i]))),
      pt(point(turningTime, 0), undefined, "ne", "warn"),
      txt(v(7.55, -0.44), "Zaman (s)", "s", { tone: "ink", small: true }),
      txt(point(0, 5.0), "Hız (m/s)", "n", { tone: "ink", small: true }),
    );
    for (const time of times) els.push(txt(v(time, 0.18), String(time), "n", { tone: "muted", small: true }));
    for (const speed of [-2, 2, 4]) els.push(txt(point(-0.13, speed), fmt(speed), "w", { tone: "ink", small: true }));
    els.push(txt(v(-0.87, 4.1), "", "c"), txt(v(8.4, -2.12), "", "c"));
    return { els, readout: [
      `İvme ${fmt(acceleration)} m/s². Yön değişimi t = ${turningTime} s.`,
      ...(step > 0 ? [`İşaretli alanlar ${signedAreas.join(", ")} m. Yer değiştirme +${displacement} m.`] : []),
      ...(step === 2 ? [`Alan büyüklüklerinin toplamı ${distance} m. Ortalama hız +${displacement / 7} m/s, ortalama sürat ${fmt(distance / 7, 2)} m/s.`] : []),
    ] };
  },
};

const dogrusalHareket: Record<string, FigureDef> = {
  "Hız sıfırı geçince alanı ayrı hesapla": velocityAreaSource003,
  "Gittiğin yol ile vardığın yer aynı şey değil": {
    caption:
      "0'dan +5'e gidip +2'ye dönen cisim: yer değiştirme yalnız ilk ve son konumun farkıdır (Δx = 2 m), yol ise bütün parçaların uzunluğudur (5 + 3 = 8 m).",
    alt: "Sayı doğrusu üzerinde 0'dan 5'e giden ve 5'ten 2'ye dönen iki ok; altta 0'dan 2'ye yer değiştirme oku.",
    draw: () => ({
      els: [
        seg(v(-1, 0), v(7, 0), { tone: "muted" }),
        ...[0, 1, 2, 3, 4, 5, 6].map((x) => txt(v(x, -0.3), String(x), "s", { small: true, tone: "muted" })),
        vec(v(0, 0.6), v(5, 0.6), { tone: "a" }),
        vec(v(5, 1.1), v(2, 1.1), { tone: "c" }),
        vec(v(0, -1.3), v(2, -1.3), { tone: "b", bold: true }),
        txt(v(2.5, 0.6), "5 m", "n", { small: true, tone: "a" }),
        txt(v(3.5, 1.1), "3 m", "n", { small: true, tone: "c" }),
        txt(v(1, -1.3), "Δx = +2 m", "s", { small: true, tone: "b" }),
        pt(v(0, 0), "ilk", "nw"),
        pt(v(2, 0), "son", "ne", "b"),
      ],
      readout: ["Yer değiştirme = 2 − 0 = 2 m", "Yol = 5 + 3 = 8 m"],
    }),
  },
  "Düzgün hareket ve ivme": {
    caption:
      "Sabit hızda (a = 0) eşit zaman aralıklarında eşit yer değiştirmeler olur: konum–zaman grafiği bir doğrudur ve eğimi hızdır.",
    alt: "Konum–zaman grafiğinde x = 1 + t doğrusu; her 1 saniyelik aralıkta konumun 1 metre arttığını gösteren eşit basamaklar.",
    draw: () => {
      const o = v(0, 0);
      const els: El[] = [...plotAxes(o, 5, 6, 0, "t (s)", "x (m)"), curve([v(0, 1), v(5, 6)])];
      for (let t = 0; t < 5; t++) {
        const x0 = 1 + 1 * t;
        els.push(seg(v(t, x0), v(t + 1, x0), { dash: true, thin: true, tone: "a" }), seg(v(t + 1, x0), v(t + 1, x0 + 1), { dash: true, thin: true, tone: "a" }));
      }
      return { els: [...els, txt(v(5, 6), "x = 1 + t", "e", { small: true, tone: "b" })], readout: ["Her 1 s'de Δx = 1 m: hız sabit 1 m/s, ivme 0"] };
    },
  },
  "Grafik okurken önce eksenlere bak": {
    caption:
      "Aynı sabit ivmeli hareketin üç grafiği: x–t'nin eğimi hızdır, v–t'nin eğimi ivmedir, v–t'nin altındaki alan yer değiştirmedir.",
    alt: "Üst üste üç grafik: eğrilen konum–zaman, eğik doğru hız–zaman ve yatay ivme–zaman; hız grafiğinin altı boyalı.",
    draw: () => {
      const els: El[] = [];
      const xo = v(0, 7);
      const vo = v(0, 3.4);
      const ao = v(0, 0);
      els.push(...plotAxes(xo, 4, 2.6, 0, "t", "x"), curve(Array.from({ length: 21 }, (_, i) => { const t = (4 * i) / 20; return add(xo, v(t, (t * t) / 8 + 0.2 * t)); })));
      els.push(...plotAxes(vo, 4, 2.4, 0, "t", "v"), poly([vo, add(vo, v(0, 0.2)), add(vo, v(4, 2.2)), add(vo, v(4, 0))], { fill: "b", tone: "b", thin: true }), curve([add(vo, v(0, 0.2)), add(vo, v(4, 2.2))]));
      els.push(...plotAxes(ao, 4, 1.2, 0, "t", "a"), curve([add(ao, v(0, 0.8)), add(ao, v(4, 0.8))], "a"));
      els.push(txt(add(xo, v(4.6, 1.5)), "eğim = v", "e", { small: true }), txt(add(vo, v(4.6, 1.5)), "eğim = a, alan = Δx", "e", { small: true }), txt(add(ao, v(4.6, 0.8)), "alan = Δv", "e", { small: true }));
      return { els };
    },
  },
  "Hız ve ivmenin işaret tablosu": {
    caption:
      "İki işareti birlikte oku: hız ve ivme aynı yöndeyse sürat artar, zıt yöndeyse azalır. Negatif ivme tek başına “yavaşlıyor” demek değildir.",
    alt: "Dört satır: her satırda hız oku ve ivme oku; aynı yönlüler hızlanıyor, zıt yönlüler yavaşlıyor olarak etiketli.",
    draw: () => {
      const rows: [number, number, string][] = [
        [1, 1, "hızlanır"],
        [1, -1, "yavaşlar"],
        [-1, -1, "hızlanır"],
        [-1, 1, "yavaşlar"],
      ];
      return {
        els: rows.flatMap(([vs, as, s], i) => {
          const y = -i * 1.3;
          return [
            vec(v(2, y), v(2 + vs * 1.5, y), { tone: "b", bold: true }),
            vec(v(6, y), v(6 + as * 1.2, y), { tone: "a", bold: true }),
            txt(v(0, y), `v ${vs > 0 ? ">" : "<"} 0`, "w", { small: true, tone: "b" }),
            txt(v(4.9, y), `a ${as > 0 ? ">" : "<"} 0`, "w", { small: true, tone: "a" }),
            txt(v(8, y), s, "e", { small: true, bold: true, tone: vs === as ? "c" : "warn" }),
          ];
        }),
      };
    },
  },
  "Sabit ivme denklemlerinin kökeni": {
    caption:
      "Hız–zaman doğrusu altındaki alan iki parçadır: v₀τ dikdörtgeni ve ½aτ² üçgeni. Süreyi değiştir; toplam Δx = v₀τ + ½aτ² (v₀ = 2, a = 1).",
    alt: "Hız–zaman grafiğinde v = 2 + t doğrusu; altındaki alan bir dikdörtgen ve bir üçgene bölünmüş.",
    param: { label: "τ (s)", min: 1, max: 5, step: 0.5, init: 3 },
    draw: (tau) => {
      const o = v(0, 0);
      const v0 = 2;
      const vt = v0 + tau;
      return {
        els: [
          ...plotAxes(o, 5.5, 7.5, 0, "t (s)", "v (m/s)"),
          poly([v(0, 0), v(tau, 0), v(tau, v0), v(0, v0)], { fill: "b", tone: "b", thin: true }),
          poly([v(0, v0), v(tau, v0), v(tau, vt)], { fill: "a", tone: "a", thin: true }),
          curve([v(0, v0), v(5, v0 + 5)]),
          txt(v(tau / 2, v0 / 2), `v₀τ = ${fmt(v0 * tau)}`, "c", { small: true, bold: true }),
          txt(v((2 * tau) / 3, v0 + tau / 3), `½aτ² = ${fmt(tau * tau / 2, 2)}`, "w", { small: true, tone: "a" }),
        ],
        readout: [`Δx = ${fmt(v0 * tau)} + ${fmt(tau * tau / 2, 2)} = ${fmt(v0 * tau + tau * tau / 2, 2)} m`],
      };
    },
  },
  "Evre içinde sıfır hız ve gerçek yol": {
    caption:
      "v₀ = 4 m/s, a = −2 m/s², τ = 3 s: hız 2. saniyede sıfırdan geçer. Pozitif üçgen 4 m, negatif üçgen 1 m: Δx = 4 − 1 = 3 m, yol = 4 + 1 = 5 m.",
    alt: "Hız–zaman grafiğinde 4'ten başlayıp t = 2'de sıfırı kesen ve t = 3'te −2'ye inen doğru; eksenin üstündeki üçgen ve altındaki üçgen farklı renklerde.",
    draw: () => ({
      els: [
        ...plotAxes(v(0, 0), 3.5, 4.5, 2.5, "t (s)", "v (m/s)"),
        poly([v(0, 0), v(0, 4), v(2, 0)], { fill: "b", tone: "b", thin: true }),
        poly([v(2, 0), v(3, -2), v(3, 0)], { fill: "warn", tone: "warn", thin: true }),
        curve([v(0, 4), v(3, -2)]),
        txt(v(0.6, 1.2), "+4 m", "c", { small: true, bold: true }),
        txt(v(2.7, -0.7), "−1 m", "c", { small: true, bold: true, tone: "warn" }),
        pt(v(2, 0), "dönüş", "ne", "a"),
      ],
      readout: ["Δx = 4 − 1 = 3 m", "Yol = 4 + 1 = 5 m"],
    }),
  },
  "Konum grafiği: kesim ve eğim": {
    caption:
      "Düşey kesim başlangıç konumu, eğim hızdır. A ve B paralel: farklı yerden başlayıp aynı hızla gider. C yatay: durgun; eksenin altında olması yalnız negatif konumdur.",
    alt: "Konum–zaman grafiğinde iki paralel eğik doğru A ve B, eksenin altında yatay doğru C.",
    draw: () => ({
      els: [
        ...plotAxes(v(0, 0), 5, 6, 2.5, "t", "x"),
        curve([v(0, 1), v(4.5, 5.5)], "b"),
        curve([v(0, -1), v(4.5, 3.5)], "a"),
        curve([v(0, -2), v(4.5, -2)], "c"),
        txt(v(4.5, 5.5), "A", "e", { tone: "b", bold: true }),
        txt(v(4.5, 3.5), "B", "e", { tone: "a", bold: true }),
        txt(v(4.5, -2), "C: durgun", "e", { small: true, tone: "c" }),
      ],
    }),
  },
  "İvme grafiği: başlangıç bilgisi": {
    caption:
      "Aynı a–t grafiği (2 s boyunca a = 2) her durumda Δv = 4 m/s verir; ama son hız başlangıç hızına bağlıdır: v₀ = 0 için 4, v₀ = −3 için 1 m/s.",
    alt: "Üstte ivme–zaman grafiğinde 2 seviyesinde dikdörtgen alan; altta iki farklı başlangıç hızından aynı eğimle çıkan iki hız doğrusu.",
    draw: () => {
      const ao = v(0, 6.2);
      return {
        els: [
          ...plotAxes(ao, 3, 2.5, 0, "t", "a"),
          poly([ao, add(ao, v(0, 2)), add(ao, v(2, 2)), add(ao, v(2, 0))], { fill: "a", tone: "a", thin: true }),
          txt(add(ao, v(1, 1)), "Δv = 4", "c", { small: true, bold: true }),
          ...plotAxes(v(0, 0), 3, 4.5, 3.5, "t", "v"),
          curve([v(0, 0), v(2, 4)], "b"),
          curve([v(0, -3), v(2, 1)], "c"),
          txt(v(2, 4), "v₀ = 0 → 4", "e", { small: true, tone: "b" }),
          txt(v(2, 1), "v₀ = −3 → 1", "e", { small: true, tone: "c" }),
        ],
      };
    },
  },
  "Karşılaşma ve geçme": {
    caption:
      "A 0'dan 4 m/s ile, B 20 m'den −1 m/s ile hareket ediyor. Konum doğruları t = 4 s'de x = 16 m'de kesişir: karşılaşma anı.",
    alt: "Konum–zaman grafiğinde artan A doğrusu ve azalan B doğrusu, (4; 16) noktasında kesişiyor.",
    draw: () => {
      const k = 0.25;
      return {
        els: [
          ...plotAxes(v(0, 0), 6, 6, 0, "t (s)", "x"),
          curve([v(0, 0), v(6, 24 * k)], "b"),
          curve([v(0, 20 * k), v(6, 14 * k)], "a"),
          pt(v(4, 16 * k), "t = 4 s, x = 16 m", "nw", "c"),
          txt(v(0, 20 * k), "20", "w", { small: true, tone: "a" }),
          txt(v(6, 24 * k), "A", "e", { tone: "b", bold: true }),
          txt(v(6, 14 * k), "B", "e", { tone: "a", bold: true }),
        ],
        readout: ["4t = 20 − t → t = 4 s"],
      };
    },
  },
};

const separateForceAxes: FigureDef = {
  caption: "Yatay ve düşey kuvvetleri ayrı topla. Oklar yön gösterir, ortak kuvvet ölçeğiyle çizilmemiştir.",
  alt: "4 kg kutuya ip sağa 18 N, zemin sola sürtünmeyle 6 N uygular. Zemin 40 N yukarı, Dünya 40 N aşağı kuvvet uygular.",
  steps: ["Etkileşimleri göster", "Bileşkeleri ve ivmeyi bul"],
  draw: (_, step) => {
    const mass = 4, tension = 18, friction = 6, weight = mass * 10, normal = weight;
    const netX = tension - friction, netY = normal - weight;
    return {
      els: [
        ...block(-0.8, -0.45, 1.6, 0.9, "4 kg"),
        ...force(v(0.8, 0), v(1.8, 0), `İp ${tension} N`, "a", "n"),
        ...force(v(-0.8, 0), v(-1.8, 0), `Sürtünme ${friction} N`, "warn", "n"),
        ...force(v(0, 0.45), v(0, 1.25), `Normal ${normal} N`, "b", "n"),
        ...force(v(0, -0.45), v(0, -1.25), `Ağırlık ${weight} N`, "b", "s"),
        txt(v(-4.5, 2.5), "", "c"),
        txt(v(4.5, -2.5), "", "c"),
      ],
      readout: step === 0
        ? ["İp sağa, sürtünme sola yönelir. Normal yukarı, ağırlık aşağı yönelir."]
        : [
          `Yatay: ${tension} − ${friction} = ${netX} N sağa. Düşey: ${normal} − ${weight} = ${netY} N.`,
          `Yatay ivme ${netX} ÷ ${mass} = ${netX / mass} m/s² sağa.`,
        ],
    };
  },
};

const newton: Record<string, FigureDef> = {
  "Yatay ve düşey kuvvetleri ayrı topla": separateForceAxes,
  [forcePairsTitle]: newtonForcePairsFigure,
  [frictionThresholdTitle]: frictionThresholdFigure,
  "Hareketi tarif etmek ile nedenini açıklamak": {
    caption:
      "Sağa giden ama yavaşlayan araba: hız sağa, ivme sola. Net kuvvet hızın değil ivmenin yönündedir.",
    alt: "Yatay zeminde bir blok; üstünde sağa hız oku, altında sola ivme ve net kuvvet okları.",
    draw: () => ({
      els: [
        seg(v(-1, 0), v(6, 0), { tone: "muted" }),
        ...block(1.5, 0, 2, 1.2),
        ...force(v(2.5, 1.6), v(2, 0), "v (hız)", "b", "e"),
        ...force(v(2.5, -0.5), v(-1.6, 0), "a ve Fnet", "a", "w"),
      ],
    }),
  },
  "Önce tek hedef, sonra serbest cisim diyagramı": {
    caption:
      "İple eğik çekilen kutu için yalnız kutuya etki eden kuvvetler: Dünya'dan ağırlık G, zeminden normal N ve sürtünme f, ipten gerilme T.",
    alt: "Kutunun merkezinden çıkan dört ok: aşağı G, yukarı N, sola f ve sağ yukarı eğik T.",
    draw: () => {
      const c = v(2, 1);
      return {
        els: [
          seg(v(-1, 0), v(6, 0), { tone: "muted" }),
          ...block(1, 0, 2, 2),
          ...force(c, v(0, -2.2), "G (Dünya → kutu)", "warn", "e"),
          ...force(c, v(0, 1.9), "N (zemin → kutu)", "b", "e"),
          ...force(v(1, 0.3), v(-1.6, 0), "f", "c", "w"),
          ...force(c, pol(2.6, 30), "T (ip → kutu)", "a", "e"),
        ],
      };
    },
  },
  "İkinci yasa: önce yönlü toplamı bul": {
    caption:
      "Sağa 15 N, sola 6 N: net kuvvet 9 N sağa. Kütleyi değiştir: aynı net kuvvette kütle büyüdükçe ivme küçülür (a = ΣF/m).",
    alt: "Blok üzerinde sağa 15 N ve sola 6 N okları, altında 9 N net kuvvet oku; kütle sürgüyle değişiyor.",
    param: { label: "Kütle m (kg)", min: 1, max: 9, step: 1, init: 3 },
    draw: (m) => ({
      els: [
        seg(v(-3, 0), v(7, 0), { tone: "muted" }),
        ...block(1, 0, 2, 1.4, `${m} kg`),
        ...force(v(3, 0.7), v(3, 0), "15 N", "a", "e"),
        ...force(v(1, 0.7), v(-1.2, 0), "6 N", "c", "w"),
        ...force(v(2, -0.6), v(1.8, 0), "ΣF = 9 N", "b", "e"),
      ],
      readout: [`a = 9 / ${m} = ${fmt(9 / m, 2)} m/s² (sağa)`],
    }),
  },
  "Üçüncü yasa: çiftin hedefleri farklıdır": {
    caption:
      "Kitaba etki eden G ve N aynı cisimdedir: etki–tepki çifti değildir. N'nin çifti, kitabın masaya uyguladığı kuvvettir ve masanın diyagramındadır.",
    alt: "Solda kitabın serbest cisim diyagramı: aşağı G, yukarı N. Sağda masanın üst yüzü: kitabın masaya uyguladığı aşağı kuvvet; N ile bu kuvvet aynı renkte.",
    draw: () => ({
      els: [
        ...block(0, 0, 2, 1, "kitap"),
        ...force(v(1, 0.5), v(0, -2), "G (Dünya → kitap)", "warn", "e"),
        ...force(v(1, 0.5), v(0, 2), "N (masa → kitap)", "b", "e"),
        ...block(5, -0.5, 3, 0.6, "masa"),
        ...force(v(6.5, 0.1), v(0, -1.8), "kitap → masa", "b", "e"),
        txt(v(4.5, -2.5), "aynı renk: etki–tepki çifti", "c", { small: true, tone: "b" }),
      ],
    }),
  },
  "Ağırlık ve normal: eşitlik koşula bağlıdır": {
    caption:
      "Asansördeki 60 kg kişi (g = 10): N − mg = ma. İvmeyi değiştir: ivme yukarıyken N > 600 N, aşağıyken N < 600 N; hızın yönü bunu değiştirmez.",
    alt: "Asansör içinde kişi; aşağı 600 N ağırlık oku ve uzunluğu ivmeyle değişen yukarı normal oku; yanda ivme oku.",
    param: { label: "İvme a (yukarı +)", min: -4, max: 4, step: 1, init: 2, unit: " m/s²" },
    draw: (a) => {
      const N = 60 * (10 + a);
      const s = 1 / 300;
      return {
        els: [
          poly([v(0, -0.5), v(3, -0.5), v(3, 4.5), v(0, 4.5)], { tone: "muted", thin: true }),
          ...block(1, -0.5, 1, 2),
          ...force(v(1.5, 0.5), v(0, -600 * s), "G = 600 N", "warn", "e"),
          ...force(v(1.5, 0.5), v(0, N * s), `N = ${N} N`, "b", "e"),
          ...(a !== 0 ? force(v(3.6, 2), v(0, a * 0.3), `a = ${a}`, "a", "e") : []),
          txt(v(1.5, -2.6), "", "c"),
          txt(v(1.5, 5), "", "c"),
        ],
        readout: [`N = 60·(10 ${a >= 0 ? "+" : "−"} ${Math.abs(a)}) = ${N} N`],
      };
    },
  },
  "Sürtünmede önce kayma durumunu seç": {
    caption:
      "5 kg kutu, μs = 0,5, μk = 0,4 (N = 50 N). Uygulanan kuvveti artır: statik sürtünme kuvvete eşit büyür (en çok 25 N); kayma başlayınca sürtünme 20 N'ye iner.",
    alt: "Sürtünme–uygulanan kuvvet grafiği: 25 N'ye kadar eğimi 1 olan doğru, sonra 20 N'de yatay çizgi; sürgüyle seçilen nokta işaretli.",
    param: { label: "Uygulanan kuvvet F (N)", min: 0, max: 40, step: 1, init: 18 },
    draw: (F) => {
      const k = 0.15;
      const f = F <= 25 ? F : 20;
      return {
        els: [
          ...plotAxes(v(0, 0), 40 * k, 30 * k, 0, "F (N)", "f (N)"),
          curve([v(0, 0), v(25 * k, 25 * k)], "b"),
          seg(v(25 * k, 25 * k), v(25 * k, 20 * k), { dash: true, thin: true, tone: "muted" }),
          curve([v(25 * k, 20 * k), v(40 * k, 20 * k)], "a"),
          pt(v(F * k, f * k), `F = ${F}, f = ${f}`, F > 25 ? "s" : "nw", "c"),
          txt(v(25 * k, 25 * k), "μsN = 25", "n", { small: true }),
        ],
        readout: [F <= 25 ? `Kaymaz: fs = ${F} N (≤ 25 N)` : `Kayar: fk = 20 N, net ${F - 20} N`],
      };
    },
  },
  "Sistem ve grafik: son denetimi atlama": {
    caption:
      "30 N ile itilen 4 kg ve 2 kg bitişik bloklar (sürtünmesiz): sistem için a = 30/6 = 5 m/s². Aradaki temas kuvveti için tek bloğa dön: 2 kg · 5 = 10 N.",
    alt: "Yan yana iki blok, soldakine 30 N itme; aradaki temas noktasında iki zıt yönlü 10 N oku.",
    draw: () => ({
      els: [
        seg(v(-2, 0), v(7, 0), { tone: "muted" }),
        ...block(0, 0, 2.4, 1.6, "4 kg"),
        ...block(2.4, 0, 1.6, 1.2, "2 kg"),
        ...force(v(-1.8, 0.8), v(1.7, 0), "30 N", "a", "w"),
        ...force(v(2.4, 1.4), v(1, 0), "10 N", "b", "n"),
        ...force(v(2.4, 0.4), v(-1, 0), "10 N", "c", "s"),
      ],
      readout: ["a = 30 / (4 + 2) = 5 m/s²", "Temas: 2 · 5 = 10 N"],
    }),
  },
  "Kuvvet–ivme grafiğinden kütleyi oku": {
    caption: "Kütleyi değiştir. Aynı iki ivme değerinde gereken net kuvvetler ve doğrunun eğimi birlikte değişir.",
    alt: "Net kuvvetin düşeyde, ivmenin yatayda olduğu grafik. Doğru orijinden geçer. İki nokta ve aralarındaki yatay ve düşey farklar işaretlidir.",
    param: { label: "Kütle (kg)", min: 1, max: 6, step: 1, init: 4 },
    draw: (mass) => {
      const forceAt = (a: number) => a * mass;
      const plot = (a: number, f: number) => v(a * 1.4, f / 6);
      const lower = plot(2, forceAt(2));
      const upper = plot(4, forceAt(4));
      const corner = plot(4, forceAt(2));
      return {
        els: [
          ...plotAxes(v(0, 0), 6.4, 4.3, 0, "İvme (m/s²)", "Net kuvvet (N)"),
          curve([v(0, 0), upper]),
          seg(lower, corner, { dash: true, tone: "muted" }),
          seg(corner, upper, { dash: true, tone: "muted" }),
          pt(lower, `2 m/s², ${forceAt(2)} N`, "nw", "a"),
          pt(upper, `4 m/s², ${forceAt(4)} N`, "ne", "a"),
        ],
        readout: [`Eğim = (${forceAt(4)} − ${forceAt(2)}) N / (4 − 2) m/s² = ${mass} kg`],
      };
    },
  },
  [newtonTimeTitle]: newtonTimeFigure,
  [newtonVelocityTitle]: {
    caption: "Düz çizgi 4 N, kesikli çizgi 8 N denemesini gösterir. Zamanı değiştirip iki hızı karşılaştır.",
    alt: "İki hız doğrusu aynı başlangıçtan yükselir. 8 N denemesinin eğimi 4 N denemesinin iki katı.",
    param: newtonTimeParameter,
    draw: (time) => drawTimeGraph(time, timeMeasures[2]),
  },
  [newtonDisplacementTitle]: {
    caption: "İki blok ortak başlangıç çizgisinden uzaklaşır. Ok uzunluğu yer değiştirmeyle orantılıdır.",
    alt: "Yatay iki yolun başı aynı hizada. 4 N ve 8 N etiketli deneylerde bloklar seçilen zamana göre sağa ilerler. Yer değiştirme değerleri çizimin altında okunabilir.",
    param: newtonTimeParameter,
    draw: drawDisplacement,
  },
};

export const physicsFiguresMechanics: Record<string, Record<string, FigureDef>> = {
  "dogrusal-hareket": dogrusalHareket,
  newton,
};

