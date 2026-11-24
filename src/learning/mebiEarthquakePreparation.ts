import type { GuideSection, WorkedExample } from "./guides/types";

export const earthquakePreparationTitle = "Evde deprem hazırlığı";
export const securedRoomTitle = "Dolabı sabitle ve yatağın çevresini boş bırak";
export const meetingPlanTitle = "Korunma, çıkış ve buluşma";
export const emergencyBagTitle = "Acil durum çantasını erişilebilir tut";

export const earthquakePreparationSection: GuideSection = {
  title: earthquakePreparationTitle,
  figureTitle: earthquakePreparationTitle,
  paragraphs: [
    "Deprem hazırlığı yapıyla başlar. Yeni yapının dayanıklılığı ve mevcut binanın durumu yetkili uzmanlar tarafından değerlendirilir. Bir fotoğraftan binanın güvenli olduğu sonucuna varılamaz.",
    "Evin her odasında önceden bir korunma yeri belirle. Ağır dolap ve rafları uygun bağlantıyla duvara sabitle. Ağır eşyaları alt raflara yerleştir. Yatağın üzerini ve çevresini düşebilecek nesnelerden arındır.",
    "Ev halkıyla çıkış yolunu ve dışarıdaki buluşma yerini önceden konuş. Sarsıntı sürerken korunma, sarsıntı bittikten sonra çıkış ve buluşma ayrı adımlardır. Elektrik ve gaz tesisatının kontrolünü ve gerekli sağlamlaştırmayı yetkili uzmana bırak.",
    "Kolay ulaşabileceğin yerde afet ve acil durum çantası hazırla. Ev halkıyla acil iletişim bilgilerini ve düzenli ilaç ihtiyacını gözden geçir. İlk yardım için yetkin bir eğitim al.",
  ],
  table: {
    layout: "table",
    headers: ["Hazırlık", "Önceden kontrol et"],
    rows: [
      ["Yapı", "Dayanıklılık değerlendirmesi için yetkili uzman"],
      ["Oda", "Sabitlenen dolap, ağır eşya için alt raf, açık yatak çevresi"],
      ["Ev planı", "Korunma yeri, sarsıntı sonrası çıkış ve buluşma noktası"],
      ["Tesisat", "Elektrik ve gaz için yetkili bakım"],
      ["Çanta", "Su, dayanıklı gıda, düzenli ilaç, ilk yardım, ışık, iletişim ve belge bilgisi"],
      ["İlk yardım", "Eğitim ve ev halkının acil iletişim bilgileri"],
    ],
  },
};

export const earthquakePreparationExample: WorkedExample = {
  title: "Bir oda ve ev halkı için hazırlık",
  prompt: "Bir evde yatağın üzerinde ağır eşya, odada sabitlenmemiş dolap ve çıkışa giderken geçilecek kapalı bir yol var. Hangi hazırlıkları önceden tamamlayabilirsin?",
  strategy: "Düşebilecek eşyaları, birlikte uygulanacak planı ve ihtiyaç malzemelerini ayrı ayrı kontrol et.",
  steps: [
    { label: "Odayı düzenle", explanation: "Uygun bağlantıyla dolabı sabitle. Ağır eşyayı alt rafa taşı ve yatağın çevresini açık bırak.", figureTitle: securedRoomTitle },
    { label: "Korunma ve çıkış planını belirle", explanation: "Yakındaki korunma yerini, sarsıntı sonrası çıkış yolunu ve dışarıda buluşma noktasını konuş.", figureTitle: meetingPlanTitle },
    { label: "Çantayı erişilebilir yere koy", explanation: "Ev halkının su, gıda, düzenli ilaç ve ilk yardım gereksinimini içeren çantayı kolay ulaşılabilir yerde tut.", figureTitle: emergencyBagTitle },
  ],
  answer: "Odayı güvenli biçimde düzenle, iki aşamalı ev planını önceden konuş ve çantayı erişilebilir yerde tut.",
  check: "Ağır eşya artık yatağın üzerinde değil. Korunma noktası, çıkış ve çantanın yeri belirli.",
  pitfall: "Çıkış yolunu sarsıntı sırasında kullanmayı planlama. Evdeki elektrik ve gaz tesisatına kendin müdahale etme.",
};
