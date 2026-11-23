import { txt } from "../domain/model";
import {
  absoluteValueSource038Guides,
  absoluteValueSource038Lessons,
  absoluteValueSource038Pack,
  absoluteValueSource038Sheets,
} from "./absoluteValueSource038";

const source =
  "Aurelia 012 Mutlak Değer, V5 içerik 1.3.0, 19 Kasım 2026 tarihli 18 fiziksel sayfa. " +
  "Kurallar s. 2–5, örnekler s. 6–8, yöntem karşılaştırmaları s. 10–13, prova ve onarımlar s. 14–17. " +
  "2026 TYT Temel Matematik 7 için ÖSYM kitapçığı PDF s. 26 (basılı s. 24) ve cevap anahtarı PDF s. 45 incelendi. Resmî cevap C. " +
  "OGM Matematik 9 görüntüleyici s. 43 (basılı s. 121) uzaklık ve parçalı tanımın kavramsal dayanağıdır. " +
  "Çözümler öğretim uyarlamasıdır. Geçmiş sınav arşivinin taraması sürmektedir.";

const additions: Readonly<Record<string, readonly string[]>> = {
  S07: [
    "Sıcaklık −3 °C’den tam 2 °C farklıysa merkez −3, uzaklık 2’dir. |T−(−3)|=2, yani |T+3|=2 yazılır. −3’ün 2 solunda −5 °C, 2 sağında −1 °C vardır. Merkezi yanlışlıkla +3 seçersen 1 ve 5 çıkar. Birini geri koyarak dene: |1+3|=4 ve istenen uzaklık 2 idi.",
  ],
  S08: [
    "Sayı doğrusu üzerindeki konum 3’ten tam 5 birim uzakta ise |x−3|=5 yazılır. Sol yönde 3−5=−2, sağ yönde 3+5=8 bulunur. Hem −2 hem 8 için 3’e uzaklık 5’tir.",
  ],
  S12: [
    "Bir doğru boyunca 4 km konumundan en az 2 km uzakta olmayı |s−4|≥2 ile göster. 2 ve 6 km’de uzaklık tam 2 km’dir, bu yüzden sınırlar dahildir. 4 km ise merkezdir, uzaklığı 0’dır. Çözüm iki yandadır: s≤2 veya s≥6.",
  ],
  S19: [
    "Bir göstergenin sapma puanı E=2|T−2| ile hesaplansın. Önce T’nin 2’ye uzaklığını bul, sonra ikiyle çarp. T=2 için E=0, T=1 ve T=3 için E=2’dir. Çarpanı 1 yapsaydın T=3 için puan 1 olurdu. İki grafik aynı yerde en küçük değerini alır ve merkezden uzaklaşırken farklı hızlarda yükselir.",
  ],
  S20: [
    "Bir doğru üzerinde −2 km ve 5 km işaretlerine yürüyüş uzaklıklarının toplamı için önce 5−(−2)=7 km hesapla. Başlangıç s∈[−2,5] olduğunda iki yol bu 7 km’yi paylaşır. Örneğin s=0 için 2+5=7, s=6 için 8+1=9 km. Aralığın dışına 1 km çıkmak toplama 2 km ekler.",
  ],
  S21: [
    "Onarıma hazırlanırken |x−3|+|x−6|=9 için eşikleri 3 ve 6 olarak sırala. x<3 iken 9−2x=9’dan x=0 gelir. İki eşik arasında toplam 3’tür. x>6 iken 2x−9=9’dan x=9 gelir. Adaylar kendi aralıklarında kalır. x=0 için 3+6, x=9 için 6+3 olduğundan iki kök de doğrulanır.",
  ],
  S24: [
    "6 konumuna olan uzaklık tam t−2 birim olsun. Önce t−2’yi hesapla. t=1 negatif uzaklık ister ve hiç çözüm vermez. t=2 uzaklığı sıfır yapar, tek konum 6’dır. t=5 uzaklığı 3 yapar, konumlar 3 ve 9 olur. Bu üç durumda denklem |s−6|=t−2’dir.",
  ],
  S25: [
    "İki sensörün işaretli sapmaları x−1 ve 2x+3 olsun. Büyüklükler eşit istendiğinde işaretler farklı olabilir, bu yüzden iki taraf da mutlak değere girer. x=−4’te sapmalar −5 ve −5, x=−2/3’te −5/3 ve 5/3’tür. İkinci sapmanın kendisi sağ tarafa yazılırsa 2x+3≥0 gerekir. x=−4 elenir, x=−2/3 kalır.",
  ],
  S27: [
    "10 cm hedefinde en çok 0,3 cm sapma, |m−10|≤0,3 demektir. Üç tarafına 10 ekleyince 9,7≤m≤10,3 cm bulunur. 9,7 ve 10,3 tam sınırda kabul edilir. 10,31 cm, 0,31 cm sapma verdiği için kabul edilmez.",
  ],
  S28: [
    "Doğrulanmış 2026 TYT Temel Matematik 7’de sayılar 3, 4, 5, 6 ve 7’nin sağına yerleştirilen kapanışlar karşılaştırılır. Sonuçlar sırasıyla 1, −5, 3, −5 ve 5’tir. Çizgi 5’ten sonra gelince içerisi −3+4−5=−4, mutlak değer 4, dış işlemlerle 4+6−7=3 olur. Yalnız bu yer hedefi sağlar. Resmî anahtar C’dir.",
  ],
  S33: [
    "Azaltılmış destek örneğinde |4x−3|≤9 için önce ____≤4x−3≤____ satırını kendin tamamla. Üç tarafa aynı sayıyı ekleyip pozitif 4’e böl. İki sınırı yerlerine koyarak denetle. Çözümlü örneğin adımlarını kendi çözümünü yazdıktan sonra aç.",
  ],
};

const sections = absoluteValueSource038Pack.sections.map((section) => {
  const extra = additions[section.code];
  return extra
    ? { ...section, paragraphs: [...section.paragraphs, ...extra] }
    : section;
});
const examples = absoluteValueSource038Pack.examples.map((example) =>
  example.code === "E11"
    ? {
        ...example,
        prompt: "|4x−3|≤9 için ____≤4x−3≤____ satırını tamamla ve x aralığını bul.",
        strategy: "Boşlukları mutlak değerin hangi uzaklıkları kabul ettiğini düşünerek doldur.",
      }
    : example,
);

const summaryAdditions: Readonly<Record<string, string>> = {
  "Uzaklık toplamı":
    "|x−3|+|x−6| = 9 için ara bölgede toplam 3’tür. Sol dal x=0, sağ dal x=9 verir.",
  "Tolerans ve yöntem seçimi":
    "10 cm hedef ve en çok 0,3 cm sapma için [9,7 ; 10,3] cm. İki sınır kabul edilir.",
  "Kapsam ve hatırlama":
    "2026 TYT Temel Matematik 7’de kapanış adaylarının sonuçları 1, −5, 3, −5 ve 5’tir. Yalnız 5’in sağı hedef 3’ü verir. Resmî cevap C.",
};

export const absoluteValueSource012Lessons = absoluteValueSource038Lessons.map((lesson) => ({
  ...lesson,
  body: sections.map((section) => ({
    title: txt(section.title),
    text: txt(section.paragraphs.join("\n\n")),
  })),
  source: txt(source),
}));

export const absoluteValueSource012Guides = absoluteValueSource038Guides.map((guide) => ({
  ...guide,
  sections,
  examples,
  source,
}));

export const absoluteValueSource012Sheets = absoluteValueSource038Sheets.map((sheet) => ({
  ...sheet,
  sections: sheet.sections.map((section) => {
    const extra = summaryAdditions[section.title];
    return extra ? { ...section, text: [...section.text, extra] } : section;
  }),
  source,
}));
