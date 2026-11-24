import type { GuideSection, WorkedExample } from "./guides/types";

export const earthquakeCoverTitle = "Sarsıntı sırasında Çök, Kapan, Tutun";
export const dropTitle = "Dizlerinin üzerine çök";
export const coverTitle = "Başını ve enseni koru";
export const holdTitle = "Masanın bacağına tutun";

export const earthquakeCoverSection: GuideSection = {
  title: earthquakeCoverTitle,
  figureTitle: earthquakeCoverTitle,
  paragraphs: [
    "İçeride sarsıntı başlarsa koşmak yerine bulunduğun yere yakın güvenli bir konumda korun. Düşmemek için dizlerinin üzerine çök. Yakınında sağlam bir masa varsa altına gir ve başınla enseni kollarınla koru.",
    "Masanın bir bacağına tutun ve sarsıntı bitene kadar korunmayı sürdür. Yakında sağlam masa yoksa pencereden, devrilebilecek dolaplardan ve ağır eşyalardan uzak bir yerde başını ve enseni kapat.",
    "Sarsıntı sırasında merdivene veya çıkışa koşma. Sarsıntı bittikten sonra çevrendeki tehlikelere ve bulunduğun yerin tahliye planına bak. Bu bölüm, iç mekânda yanında sağlam masa bulunan örnek öğrenci konumunu gösterir.",
  ],
};

export const earthquakeCoverExample: WorkedExample = {
  title: "Sınıfta üç korunma adımı",
  prompt: "Sınıfta sarsıntı başlıyor. Yanında sağlam bir sıra var ve pencere daha uzakta. İlk üç korunma adımın nasıl olmalı?",
  strategy: "Yakınındaki sağlam koruma yerini belirle ve vücudunun üç konumunu sırayla düşün.",
  steps: [
    { label: "Çök", explanation: "Dizlerinin üzerine in. Zemine yakın konumda kal.", figureTitle: dropTitle },
    { label: "Kapan", explanation: "Yakındaki sağlam sıranın altında başını ve enseni koru.", figureTitle: coverTitle },
    { label: "Tutun", explanation: "Bir elinle sıranın bacağına tutun. Diğer kolunla başını ve enseni korumayı sürdür.", figureTitle: holdTitle },
  ],
  answer: "Dizlerinin üzerine çök, sağlam sıranın altında başını ve enseni kapat, sıranın bacağına tutun.",
  check: "Sarsıntı sürerken korunuyorsun. Çıkış planını sarsıntı bittikten sonra uyguluyorsun.",
  pitfall: "Sarsıntı devam ederken merdivene veya kapıya koşma.",
};
