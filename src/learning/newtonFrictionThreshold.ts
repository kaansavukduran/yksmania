import type { GuideSection, WorkedExample } from "./guides/types";

export const frictionThresholdTitle = "Sürtünme eşiği ivme grafiğinde";
export const frictionMass = 5;
export const maximumAppliedForce = 40;
const normalForce = frictionMass * 10;
export const staticThreshold = 0.5 * normalForce;
export const kineticFriction = 0.4 * normalForce;

export function frictionDuringIncrease(force: number) {
  const startsSliding = force > staticThreshold;
  const friction = startsSliding ? kineticFriction : force;
  return { startsSliding, friction, acceleration: (force - friction) / frictionMass };
}

export const frictionThresholdSection: GuideSection = {
  title: frictionThresholdTitle,
  figureTitle: frictionThresholdTitle,
  paragraphs: [
    "5 kg’lık kutu yatay masada duruyor. Yatay itişi sıfırdan artırıyoruz. Düşey ivme ve başka düşey kuvvet olmadığından N = 50 N. Statik katsayı 0,5, kinetik katsayı 0,4. Dengeyi sağlamaya yetecek statik sürtünmenin üst sınırı 25 N. İtiş 25 N’ye kadar sürtünme itişe eşit olduğu için yatay net kuvvet ve ivme sıfır.",
    "25 N aşıldığında kutu kaymaya başlar. Sürtünme 20 N değerine geçer. Artık a = (F − 20 N) / 5 kg hesaplanır. İvme–uygulanan kuvvet grafiğinde bu kolun eğimi 1/5 kg⁻¹. Çizginin eşik üzerindeki açık noktası, 25 N’ye daha büyük değerlerden yaklaşınca bulunan 1 m/s² sınırını gösterir. Başlangıçta duran kutu tam eşikte dengede kalabilir.",
  ],
  table: {
    headers: ["Uygulanan kuvvet (N)", "Sürtünme büyüklüğü (N)", "İvme (m/s²)", "Kutu"],
    rows: [24, 25, 26, 30].map((force) => {
      const result = frictionDuringIncrease(force);
      return [String(force), String(result.friction), result.acceleration.toLocaleString("tr-TR"), result.startsSliding ? "Kayıyor" : "Duruyor"];
    }),
  },
};

export const frictionThresholdExample: WorkedExample = {
  title: "25 N’den 26 N’ye geçerken ne değişir?",
  prompt: "Duran 5 kg kutunun yatay yüzeyle statik katsayısı 0,5, kinetik katsayısı 0,4. g = 10 N/kg. Yatay itiş artırılırken 25 N ve 26 N için ivmeleri karşılaştır.",
  strategy: "İtişi statik sürtünmenin üst sınırıyla karşılaştır. Kayma başladığında hangi katsayıyı kullanacağını yeniden seç.",
  steps: [
    { label: "Sınırı bul", expression: "N = 50 N · fₛ,max = 25 N", explanation: "Kutu başlangıçta duruyor. 25 N’de sürtünme de 25 N olabilir ve a = 0." },
    { label: "Kayma başlayınca", expression: "fₖ = 20 N · a = (26 − 20) / 5 = 1,2 m/s²", explanation: "26 N statik sınırı aşar. Grafikte imleci 25 N’den 26 N’ye getir ve iki noktayı karşılaştır.", figureTitle: frictionThresholdTitle },
  ],
  answer: "25 N’de 0, 26 N’de itiş yönünde 1,2 m/s².",
  check: "Kayma kolunda 5 kg × 1,2 m/s² + 20 N = 26 N.",
  pitfall: "Kayma başladıktan sonra 25 N statik üst sınırını düşersen 0,2 m/s² bulursun. Bu aşamada sürtünen yüzeyler kaydığı için kullanılan değer 20 N’dur.",
};
