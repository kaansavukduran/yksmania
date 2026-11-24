import type { GuideSection, WorkedExample } from "./guides/types";
import { sphereShadowProjection } from "./mebiPointSphereShadow";

export const coaxialShadowTitle = "Aynı eksendeki iki kaynak ve gölge";
export const beforeSourceMovesTitle = "İki kaynak ilk konumunda";
export const firstSourceMovesTitle = "K yaklaşınca ortak gölge";
export const secondSourceMovesTitle = "L yaklaşınca dış halka";

const sphereRadius = 1;
const positions = [
  { label: "İlk düzen", k: 0, l: 2, centre: 6, screen: 15 },
  { label: "K sağa", k: 1, l: 2, centre: 6, screen: 15 },
  { label: "L sağa", k: 0, l: 3, centre: 6, screen: 15 },
  { label: "Küre sağa", k: 0, l: 2, centre: 7, screen: 15 },
  { label: "Perde sağa", k: 0, l: 2, centre: 6, screen: 17 },
] as const;

export const coaxialShadowSteps = positions.map(p => p.label);
export function coaxialShadowAt(step: number) {
  const p = positions[step];
  const footprint = (source: number) => {
    const { tangentX, tangentY, shadowRadius } = sphereShadowProjection(source, p.centre, sphereRadius, p.screen);
    return { source, tangentX, tangentY, radius: shadowRadius };
  };
  const k = footprint(p.k);
  const l = footprint(p.l);
  const umbraRadius = Math.min(k.radius, l.radius);
  const outerRadius = Math.max(k.radius, l.radius);
  return {
    ...p, sphereRadius, sources: [k, l], umbraRadius, outerRadius,
    umbraArea: Math.PI * umbraRadius ** 2,
    penumbraArea: Math.PI * (outerRadius ** 2 - umbraRadius ** 2),
  };
}

export const coaxialShadowSection: GuideSection = {
  title: coaxialShadowTitle,
  figureTitle: coaxialShadowTitle,
  paragraphs: [
    "K ve L ayrı noktasal kaynaklar. Opak kürenin merkezi ve perdenin ortası aynı eksen üzerinde. Her kaynağın iki teğet ışını perdede bir gölge dairesinin sınırını verir.",
    "İki dairenin merkezleri aynı. Küçük daire içinde her iki kaynak da engellenir. Küçük dairenin dışı ile büyük dairenin kenarı arasında tek kaynak görünür. Bu halka yarı gölgedir. Büyük dairenin dışında iki kaynak da görünür.",
    "Her adım ilk düzene geri dönüp tek bir parçayı kaydırır. K’nın, L’nin, kürenin veya perdenin hareketi aynı iki daireyi farklı biçimde değiştirir.",
  ],
};

export const coaxialShadowExample: WorkedExample = {
  title: "Ortak karanlıkla tek ışıklı halkayı ayır",
  prompt: "Aynı eksendeki iki kaynakla oluşan gölgeyi incele. İlk düzenden başlayarak yalnız K ve yalnız L küreye yaklaştırılırsa gölge bölgeleri nasıl değişir?",
  strategy: "K ve L’nin perdeye düşürdüğü daireleri ayrı izle. İç daire tam gölge, iki sınır arasındaki halka yarı gölgedir.",
  steps: [
    { label: "İlk düzen", explanation: "K’nın gölgesi daha küçük. Bu iç daireye iki kaynaktan da doğrudan ışık gelmez.", figureTitle: beforeSourceMovesTitle },
    { label: "K küreye yaklaşır", explanation: "K’nın gölge yarıçapı büyür. L’nin dış sınırı sabit. Tam gölge alanı artar, yarı gölge halkasının alanı azalır.", figureTitle: firstSourceMovesTitle },
    { label: "L küreye yaklaşır", explanation: "K’nın iç sınırı sabit. L’nin dış sınırı büyür. Tam gölge alanı aynı kalır, yarı gölge halkasının alanı artar.", figureTitle: secondSourceMovesTitle },
  ],
  answer: "K yaklaşırsa tam gölge büyür, yarı gölge küçülür. L yaklaşırsa tam gölge aynı kalır, yarı gölge büyür.",
  check: "Bu düzen için her hareketten sonra iki yarıçapı ayrı denetle. Halka alanı dış daireden ortak iç daire çıkarılarak bulunur.",
  pitfall: "Yarı gölgenin dış sınırını tek başına ölçmek halkanın alanını vermez.",
};
