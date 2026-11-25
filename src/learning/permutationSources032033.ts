import {
  permutationId, repeatedPermutationId, supplementalPermutationTopics032033,
} from "../data/supplementalPermutationTopics032033";
import { txt, type Lesson } from "../domain/model";
import type { CheatSheet } from "./cheatsheetContent";
import type { LessonGuide, WorkedExample } from "./guides/types";
import { permutationPractice032, repeatedPermutationPractice033 } from "./permutationPractice032033";
import { permutationSource032Sections } from "./permutationSource032Teaching";
import { repeatedPermutationSource033Sections } from "./repeatedPermutationSource033Teaching";
import { permutationExamples200, permutationSection200, permutationSheet200, repeatedExamples200, repeatedSection200, repeatedSheet200 } from "./countingDepth200";

const permutationExamples: WorkedExample[] = [
  {
    title: "Görev yuvalarından ekip sayısına geç",
    prompt: "Yedi gönüllüden yürütücü ve yazıcı belirlenecek. Bir kişi iki görev alamaz. Kaç görev dağılımı, kaç farklı iki kişilik ekip vardır?",
    strategy: "İki rolü önce sırayla doldur, sonra rolleri kaldırınca neyin değiştiğini incele.",
    steps: [
      { label: "İlk görev", expression: "7", explanation: "Yürütücüye bütün gönüllüler aday." },
      { label: "İkinci görev", expression: "7·6=42", explanation: "Yazıcı için yürütücü dışındaki altı kişi vardır." },
      { label: "Rolleri kaldır", expression: "42/2=21", explanation: "Her ekibin iki rol dağılımı vardı. Üyeler değişmeden rol değişen ikiliyi bir say." },
    ],
    answer: "42 görev dağılımı, 21 ekip.",
    check: "21 ekibin her birinde 2 farklı yürütücü vardır. 21·2=42.",
    pitfall: "Sıralı görev ile üyelik seçimini aynı sayı sanmak.",
  },
  {
    title: "Üç özel kişi için önce boşluk koşulunu denetle",
    prompt: "Üç farklı özel ve iki farklı sıradan kişi doğrusal sıraya geçecek. Özel kişiler birbirine komşu olmayacak. Kaç sıra vardır?",
    strategy: "Sıradan kişileri önce yerleştir. Başta, arada ve sonda oluşan boşlukları say.",
    steps: [
      { label: "İlk sıra", expression: "2!=2", explanation: "İki sıradan kişinin kendi sırası değişebilir." },
      { label: "Boşluklar", expression: "C(3,3)=1", explanation: "Başta, ortada ve sonda birer yer var. Üç özel kişi için hepsi kullanılır." },
      { label: "Kişiler", expression: "2·1·3!=12", explanation: "Farklı üç özel kişi seçili üç yere altı biçimde yerleşir." },
    ],
    answer: "12 sıra.",
    check: "Geçerli her düzen özel, sıradan, özel, sıradan, özel biçimindedir.",
    pitfall: "Sadece iki sıradan kişinin arasını boşluk saymak.",
  },
  {
    title: "Aynı kuralı etiketsiz ve numaralı çemberde uygula",
    prompt: "Beş farklı kişi yuvarlak masada. A ve B bitişik olmasın. Dönüşlerin bir sayıldığı ve her koltuğun ayrı numarası olduğu durumları karşılaştır.",
    strategy: "A’yı sabitle. B’nin kullanabileceği yerleri, sonra kalan kişilerin sırasını say.",
    steps: [
      { label: "B’nin yeri", expression: "4−2=2", explanation: "A’nın iki yanındaki koltuk B’ye kapalı." },
      { label: "Etiketsiz masa", expression: "2·3!=12", explanation: "Kalan üç kişi son üç yere sıra ile oturur." },
      { label: "Numaralı koltuk", expression: "5·12=60", explanation: "A için gerçek koltuk numarası seçilince her dönük plan ayrılır." },
    ],
    answer: "Etiketsiz masa 12, numaralı masa 60.",
    check: "24 toplam çemberden bitişik 2·3!=12 çıkarılınca 12 kalır.",
    pitfall: "Dönme ile yansımayı aynı karar sanmak.",
  },
];

const repeatedExamples: WorkedExample[] = [
  {
    title: "Özdeşleri böl, sabit yeri yeniden sayma",
    prompt: "A, A, B, B, B, D kartları bir sıraya dizilecek. D ilk konumda sabit. Kaç farklı sıra vardır?",
    strategy: "D’yi başlangıçta ayır ve kalan A ile B çokluklarını yaz.",
    steps: [
      { label: "Kalanlar", expression: "A,A,B,B,B", explanation: "İlk yuva dolduktan sonra beş konum kalır." },
      { label: "Etiketler", expression: "5!=120", explanation: "Geçici etiketli beş kart 120 sırada dizilir." },
      { label: "Görünür diziler", expression: "120/(2!3!)=10", explanation: "A’ların ve B’lerin kendi etiket sıraları görünüşü değiştirmez." },
    ],
    answer: "10 sıra.",
    check: "Beş boş konumdan iki A konumu seçmek C(5,2)=10.",
    pitfall: "D’yi sabitledikten sonra 6! saymak.",
  },
  {
    title: "Baş ve son arandığında durumları ayır",
    prompt: "0, 0, 2, 2, 5 rakamlarıyla kaç beş basamaklı çift sayı yazılır? Bütün rakamlar kullanılacak.",
    strategy: "Sonu 0 ve sonu 2 durumlarını ayır. Her gruptan ilk sıfırı çıkar.",
    steps: [
      { label: "Son 0", expression: "4!/2!−3!/2!=12−3=9", explanation: "Son 0 sonrası 0,2,2,5 kalır. İlk 0 da sabitse 2,2,5 kalır." },
      { label: "Son 2", expression: "4!/2!−3!=12−6=6", explanation: "Son 2 sonrası 0,0,2,5 kalır. İlk 0 sabitse 0,2,5 kalır." },
      { label: "Topla", expression: "9+6=15", explanation: "Son rakama göre iki durum birbirine karışmaz." },
    ],
    answer: "15 sayı.",
    check: "24 çift sonlu dizi arasında ilk 0 yüzünden 3+6=9 tanesi geçersiz.",
    pitfall: "Son 0 ve son 2 sabitlenince kalan rakamların tekrar sayılarını aynı sanmak.",
  },
  {
    title: "Ara durakta iki uygun yol parçasını birleştir",
    prompt: "(0,0)’dan (4,2)’ye yalnız sağ ve yukarı birim adımlarla gidiliyor. (2,1)’den geçen ve uğramayan yollar kaç tane?",
    strategy: "Bütün yolu say. Ara noktayı ziyaret eden parçaları önce ayrı, sonra birlikte hesapla.",
    steps: [
      { label: "Bütün", expression: "C(6,2)=15", explanation: "Altı boşluğun ikisine yukarı adım yerleştir." },
      { label: "Duraktan geçen", expression: "C(3,1)·C(3,1)=9", explanation: "Durağın iki yanında da iki sağ ve bir yukarı gerekir." },
      { label: "Kaçınan", expression: "15−9=6", explanation: "Her rota ya P’ye uğrar ya uğramaz." },
    ],
    answer: "P’den geçen 9, uğramayan 6 rota.",
    check: "Başlangıç ve hedef de birer durak olursa uğramayan 0 rota kalır.",
    pitfall: "Yalnız durağa giden kısa parçaları bütün yollardan çıkarmak.",
  },
];

export const permutationGuides032033: LessonGuide[] = [
  {
    id: permutationId, minutes: 45,
    objectives: [
      "Sıralı görev ile üyelik seçimini ayır.",
      "Yuvaya, bloğa veya boşluğa göre hesap kur.",
      "Dönüş, koltuk numarası ve önce gelme koşullarını açıkla.",
    ],
    sections: [...permutationSource032Sections, permutationSection200],
    examples: [...permutationExamples, ...permutationExamples200],
    recall: [
      { prompt: "P(n,0) neden 1?", answer: "Boş sıralı liste bir tek sonuçtur. Formülde n!/n!=1." },
      { prompt: "A, B’den önceyse bir blok mudur?", answer: "Aralarına başka kişiler girebildiği için blok değildir. İki kişinin yer değiştirilmesiyle eşleştirme yapılabilir." },
      { prompt: "Doğruda ve çemberde k sıradan kişi kaç boşluk açar?", answer: "Doğruda k+1, çemberde k. Bir kişiyle komşuluk koşulu ayrıca açıklanır." },
      { prompt: "Sonu 0 olan bir sayıda baştaki sıfır nasıl sayılır?", answer: "Rakamlar farklı kalacaksa sıfır zaten kullanıldı. Sonu sıfır dışı olursa ilk seçimde ayrıca sıfırı çıkar." },
    ],
    source: "Aurelia Permütasyon, biçim 5 / içerik 5.1, 19 Kasım 2026, fiziksel s. 1–12. MEB OGM 10 Matematik Ünite 1 web s. 13 ve OGM Video Ders Notu s. 10–12. 2025 TYT Temel Matematik 29 için asıl kitapçık ve anahtar Geçmiş Sınavlar’da.",
  },
  {
    id: repeatedPermutationId, minutes: 45,
    objectives: [
      "Aynı görünen dizilerin etiketlerini kaldırarak çokluğu bul.",
      "Boşluk, ilk sıfır ve son basamak koşullarını birlikte uygula.",
      "Ara duraktan geçen ve kaçınan yolları sayıp modelde izle.",
    ],
    sections: [...repeatedPermutationSource033Sections, repeatedSection200],
    examples: [...repeatedExamples, ...repeatedExamples200],
    recall: [
      { prompt: "Etiketli ve özdeş iki A yer değiştirirse ne olur?", answer: "Etiketliyse yeni sıra. Özdeşse aynı görünüş, bu yüzden etiketli sayıda 2! fazlalık." },
      { prompt: "Özdeş iki B bitişik, blok içi kaç farklı sıra?", answer: "Bir görünür sıra. B’leri ayıran iki etiket yok." },
      { prompt: "P başlangıç noktasıysa P’ye uğramayan kaç rota var?", answer: "Sıfır. Her rota başlangıçta P’dedir." },
      { prompt: "Her yuvada yeniden sembol seçmek neden faktöriyelli bölüm değildir?", answer: "Adetler baştan belli değildir. Her yuvada bağımsız seçenekler çarpılır." },
    ],
    source: "Aurelia Tekrarlı Permütasyon, biçim 5 / içerik 5.1, 19 Kasım 2026, fiziksel s. 1–12. MEB OGM 10 Kavram Öğretimi web s. 13 ve OGM örnekleri s. 13–15. 2018 TYT Temel Matematik 28 asıl kayıt ve anahtarı Geçmiş Sınavlar’da.",
  },
];

export const permutationLessons032033: Lesson[] = permutationGuides032033.map((guide, index) => ({
  id: guide.id,
  subjectId: "tyt-matematik",
  title: txt(supplementalPermutationTopics032033[index].title),
  minutes: guide.minutes,
  objectives: guide.objectives.map(txt),
  body: guide.sections.map(({ title, paragraphs }) => ({ title: txt(title), text: txt(paragraphs.join("\n\n")) })),
  questions: index === 0 ? permutationPractice032 : repeatedPermutationPractice033,
  source: txt(guide.source),
  tags: ["Özgün öğretim soruları"],
}));

const summaries = [
  [
    "Görev yuvaları sırayı gösterir. 0≤r≤n iken sıralı r farklı seçim P(n,r)=n!/(n−r)!, sıra aranmayan seçim C(n,r)=n!/[r!(n−r)!].",
    "Sabit yuva doludur. Gerekli kişi serbest bir yerdeyse önce o yeri seç. Yasak kişiyi aday listesinden çıkar.",
    "Komşulukta blok, yalnız önce gelmede izin verilen konumları seç. Tümleyeni sayınca bütün ve yasak sayıları aynı koşullarla kur.",
    "k sıradan kişi doğruda k+1, çemberde k boşluk bırakır. Özel kişiler farklıysa seçilen boşluklarda r! sıra.",
    "Dönüşler aynıysa (n−1)!, numaralı koltuklarda n! düzen vardır. Baş sıfır koşulunda son 0 ve diğer sonlar ayrı hesaplanır.",
  ],
  [
    "Toplam n ve özdeş tür adetleri a,b,c ise n!/(a!b!c!). Her türün iç etiket sırası görünüşü değiştirmez.",
    "Sabit ilk veya son konumdaki kartı ve yuvayı çıkar. Başında sıfır olan diziler çok basamaklı sayı sayılmaz.",
    "Özdeş iki kartı ayrı boşluklara koyduğunda iç sıra çarpanı yok. Bitişik özdeş blokta da tek iç görünüş var.",
    "En kısa engelsiz sağ/yukarı rota, r tane sağ ve u tane yukarı adımın sıralamasıdır. Her düğüm izinli öncül yolların toplamını alır.",
    "Başlangıçtan P’ye ve P’den hedefe gidilebiliyorsa geçen rota = başlangıç→P sayısı × P→hedef sayısı. Kaçınan = bütün − geçen.",
  ],
];
const sheetHeadings = [
  ["Sıralı seçim", "Sabit ve zorunlu yuvalar", "Blok ve önce gelme", "Boşluklar", "Dönüş ve ilk sıfır"],
  ["Özdeş çokluklar", "Sabit konumlar", "Komşuluk", "Kafes yolu", "Zorunlu durak"],
];

export const permutationSheets032033: CheatSheet[] = permutationGuides032033.map((guide, index) => ({
  topicId: supplementalPermutationTopics032033[index].id,
  lessonId: guide.id,
  title: supplementalPermutationTopics032033[index].title,
  subjectId: "tyt-matematik",
  sections: [...summaries[index].map((text, item) => ({ title: sheetHeadings[index][item], text: [text] })), [permutationSheet200, repeatedSheet200][index]],
  cautions: guide.examples.map(({ pitfall }) => pitfall),
  examples: guide.examples.map(({ title, prompt, steps, answer }) => ({
    title, prompt, steps: steps.map(({ label, expression, explanation }) => [label, expression, explanation].filter(Boolean).join(" · ")), answer,
  })),
  recall: guide.recall,
  source: guide.source,
}));
