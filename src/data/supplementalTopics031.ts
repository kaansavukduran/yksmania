// Additive geometry foundations. The workbook's original 479 IDs and order
// remain unchanged; these topics have their own completion and review records.
export const geometryFoundation031Ids = [
  "tyt-geo-temel-acilar-031",
  "tyt-geo-ucgende-acilar-031",
  "tyt-geo-ucgen-esitsizligi-031",
  "tyt-geo-dik-ucgen-031",
  "tyt-geo-eslik-benzerlik-031",
  "tyt-geo-ucgen-merkezleri-031",
] as const;

const titles = [
  "Temel açılar ve paralel doğrular",
  "Üçgende açılar",
  "Üçgen eşitsizliği ve açı–kenar ilişkisi",
  "Dik üçgen: Pisagor ve Öklid",
  "Üçgenlerde eşlik ve benzerlik",
  "Üçgende yardımcı elemanlar ve merkezler",
];

export const supplementalTopics031 = geometryFoundation031Ids.map((id, i) => ({
  id: `topic-${id}`,
  subjectId: "tyt-geometri",
  title: titles[i],
}));

export const geometryFoundation031TopicMap: Record<string, string> =
  Object.fromEntries(geometryFoundation031Ids.map((id) => [id, `topic-${id}`]));
