export interface RequiredSourceVisuals {
  stem?: true;
  optionIndexes?: readonly number[];
  hint?: true;
  explanation?: true;
  stepIndexes?: readonly number[];
}

// These are the reviewed roles the current app must display. Keep this list
// independent of the renderer's figure bindings and of frozen question data.
const requirements = new Map<string, RequiredSourceVisuals>([
  ...Array.from({ length: 10 }, (_, index): [string, RequiredSourceVisuals] => [
    `f031-tyt-geo-dik-ucgen-031-${index + 1}`,
    { stem: true, hint: true, stepIndexes: [0, 1, 2], ...(index === 2 ? { optionIndexes: [0, 1, 2, 3, 4] } : {}) },
  ]),
  ["n1", { stem: true, hint: true, stepIndexes: [0, 1] }],
  ["f021-donusum-oteleme-donme-1", { stem: true, hint: true, stepIndexes: [0, 1, 2] }],
  ["m1", { stem: true, hint: true, stepIndexes: [0, 1, 2] }],
  ["f020-geo-dunya-sekli-hareket-1", { stem: true, hint: true, stepIndexes: [0, 1, 2] }],
  ["yay-dalgalari-atma-uretme-suresi", { stem: true, hint: true, stepIndexes: [0, 1] }],
  ["dalgalara-giris-titresim-yonu-cizimleri", { stem: true, hint: true, stepIndexes: [0, 1] }],
  ["yay-dalgalari-tepe-cukur-karsilasma-sekli", { stem: true, hint: true, stepIndexes: [0, 1] }],
  ["su-dalgalari-duz-engel-cephe-acisi", { stem: true, hint: true, stepIndexes: [0, 1] }],
  ["yay-dalgalari-esit-kutle-yogunluk-cizimi", { stem: true, hint: true, stepIndexes: [0, 1] }],
  ["sivilarin-kaldirma-kuvveti-havada-balon", { stem: true, hint: true, stepIndexes: [0, 1, 2] }],
  ["newton-kuvvet-ivme-grafik", { stem: true, hint: true, stepIndexes: [0, 1] }],
  ["newton-sabit-kuvvet-hiz-zaman-gorselli", { optionIndexes: [0, 1, 2, 3], hint: true, stepIndexes: [0, 1] }],
  ["source-ogm-uslu-ifadeler-p01-q01", { stem: true, hint: true, explanation: true }],
  ["source-ogm-uslu-ifadeler-p01-q02", { stem: true, hint: true, explanation: true }],
  ["source-ogm-uslu-ifadeler-p01-q03", { stem: true, hint: true, explanation: true }],
  ["source-ogm-uslu-ifadeler-p01-q04", { stem: true, hint: true, explanation: true }],
  ["source-ogm-uslu-ifadeler-p01-q05", { stem: true, hint: true, explanation: true }],
  ["source-ogm-uslu-ifadeler-p01-q06", { stem: true, hint: true, explanation: true }],
]);

export const requiredSourceVisuals: ReadonlyMap<string, RequiredSourceVisuals> = requirements;
