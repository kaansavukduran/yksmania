// Additive source-based geometry units; existing workbook and031 IDs stay stable.
export const geometryExpansion032Ids = [
  "tyt-geo-cokgenler-032",
  "tyt-geo-dortgen-hiyerarsi-032",
  "tyt-geo-yamuk-deltoid-032",
  "tyt-geo-paralelkenar-ozel-dortgenler-032",
  "tyt-geo-dik-prizmalar-032",
  "tyt-geo-piramitler-032",
  "tyt-geo-acilar-kaynak-pekitirme-032",
] as const;
const titles = [
  "Çokgenler: açı, köşegen ve düzgünlük",
  "Dörtgenlerin özellikleri ve aile ilişkileri",
  "Yamuk ve deltoid",
  "Paralelkenar, dikdörtgen, eşkenar dörtgen ve kare",
  "Dik prizmalar: açınım, alan ve hacim",
  "Piramitler: yükseklik, yüzey ve kesit",
  "Geometrinin dili: kaynakla pekiştirme",
];
export const supplementalTopics032 = geometryExpansion032Ids.map((id, i) => ({
  id: `topic-${id}`,
  subjectId: "tyt-geometri",
  title: titles[i],
}));
export const geometryExpansion032TopicMap: Record<string, string> =
  Object.fromEntries(geometryExpansion032Ids.map((id) => [id, `topic-${id}`]));
