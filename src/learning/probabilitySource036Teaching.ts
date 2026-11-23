export const probabilitySource036Sections = [
  {
    title: "Örnek uzay hangi sonuçların sayıldığını belirler",
    paragraphs: [
      "Bir deneyin mümkün sonuçlarını listele. Adil zarda örnek uzay {1,2,3,4,5,6}. Çift gelmesi, bu uzayın {2,4,6} olayına girmesidir. Altı yüz eş olasılıklı olduğundan P(çift)=3/6=1/2.",
      "Uygun sonuç sayısını toplam sonuç sayısına bölmek, yazdığın temel sonuçlar eş şanslıysa geçerli. İki bağımsız adil zarın (1,1) ve (1,6) sıralı çiftleri eş şanslı, toplamları 2 ve 7 eş şanslı değildir. Toplam 2 bir, toplam 7 altı farklı çiftle oluşur.",
      "Yüz olasılıkları farklı bir zarda uygun yüzlerin olasılıklarını topla. Yalnız kaç yüz olduğunu bilmek yetmez. Olasılık 0 ile 1 arasında kalır. Kesin olay 1, olanaksız olay 0.",
    ],
  },
  {
    title: "En az biri ve tam biri ayır",
    paragraphs: [
      "Bir olayın tümleyeni, o olayın gerçekleşmediği sonuçlardır. P(Aᶜ)=1−P(A). Üç bağımsız adil para atışında hiç yazı gelmemesi (1/2)³=1/8, en az bir yazı gelmesi 7/8.",
      "İki olaydan en az birinin olması A∪B. Her iki olayın birlikte olması da bu grubun içinde. Tam biri, A∪B içinden A∩B çıkarılınca kalır. P(tam biri)=P(A)+P(B)−2·P(A∩B).",
      "Üç denemenin bağımsızlığı bilinmiyorsa hiç yazı gelmeme olasılığını 1/2·1/2·1/2 diye hesaplama. Tümleyen kuralı geçerli kalır, hiç gelmeme olasılığına ulaşmak için ortak deney yapısını bilmen gerekir.",
    ],
  },
  {
    title: "Ortak sonuçları birleşimde bir kez say",
    paragraphs: [
      "Adil zarda A çift sayı, B 4’ten büyük sayı olsun. A={2,4,6}, B={5,6}; ortak sonuç {6}. A veya B için P(A)+P(B)−P(A∩B)=(3+2−1)/6=2/3.",
      "A ve B birlikte istenirse kesişim alınır. Örneğin zarda hem çift hem 3’ün katı olabilecek tek yüz 6. Ayrık iki olayın ortak sonucu yoktur. Bu durumda birleşimde olasılıklar doğrudan toplanır.",
    ],
  },
  {
    title: "Yeni bilgi geldiğinde paydayı değiştir",
    paragraphs: [
      "P(A|B), B’nin gerçekleştiği bilindiğinde A’nın olasılığıdır. Örnek uzayı B’nin sonuçlarıyla sınırla. P(B)>0 ise P(A|B)=P(A∩B)/P(B). B’nin olasılığı sıfırsa bu bölmeyle koşullu olasılık kurulamaz.",
      "İki bağımsız adil zar atılıyor. Birinci zarın 6 olduğu biliniyorsa yalnız altı eş olasılıklı çift kalır. Toplam 10 olması için ikinci zar 4 olmalı. Olasılık 1/6. İlk deneyde iki koşulu birlikte sağlayan (6,4) çifti 1/36 idi; yeni payda bilgiyi içerir.",
      "İki bağımsız adil zar için toplamın en az 9 olduğu bilinsin. Toplam 9, 10, 11, 12 sırasıyla 4, 3, 2, 1 çift verir. On çiftten ilk zarı 6 olan dördü (6,3), (6,4), (6,5), (6,6). Koşullu olasılık 4/10=2/5, ortak olasılık 4/36, yalnız ilk zar 6 olma olasılığı 6/36.",
      "En az bir zarda 6 olduğu bilgisi farklı bir koşuldur. İlk zar 6 ise altı, ikinci zar 6 ise altı çift. (6,6) ortak olduğundan 6+6−1=11 çift kalır. Bu bilgi altında iki zarın da 6 oluşu 1/11. Koşul yoksa (6,6) 1/36 olasılıklıdır.",
      "20 kişinin 12’si A kursunda, A’daki 5 kişi B’ye de gidiyor. A bilgisi altında B olasılığı 5/12. B bilgisi altında A ise 5’i B’nin toplamına böler. B’nin toplamı verilmeden ters koşul hesaplanamaz.",
    ],
  },
  {
    title: "Geri koyma ve bağımsızlık ayrı koşullardır",
    paragraphs: [
      "P(A)>0 iken önce A, sonra B için P(A∩B)=P(A)·P(B|A). P(A)=0 ise ortak olasılık sıfırdır ve P(B|A) bu tanımla hesaplanmaz. Torbada üç kırmızı ve iki mavi top var. Her çekimde kalan toplar eş şanslı. Geri koymadan ilk kırmızı 3/5, ardından ikinci kırmızı 2/4. İki kırmızı 3/10. Geri koyunca ikinci olasılık tekrar 3/5, sonuç 9/25.",
      "A ile B bağımsızsa P(A∩B)=P(A)P(B). Örneğin 1–8’den eş şanslı sayı seçerken çift olma ile en fazla 4 olma olaylarının ortak olasılığı 2/8; iki ayrı olasılığın çarpımı da 1/4. Ortak sonuçları bulunduğu halde bağımsızlar.",
      "Bağımsız iki olayın olasılıkları 0,4 ve 0,5 olsun. Önce ortak olasılığı 0,4·0,5=0,2 bul. En az birinin olma olasılığı 0,4+0,5−0,2=0,7. Bu iki olay ayrık olsaydı ortak pay sıfır ve birleşim 0,9 olurdu.",
      "Çift ve tek olayları ayrık. İkisinin olasılığı pozitifken kesişimleri sıfır olduğu için bağımsız olamazlar. Olaylardan biri sıfır olasılıklıysa çarpım da sıfır olur. Geri koyma, eş şanslı yeni çekim de yapılıyorsa torba koşullarını eskiye döndürür.",
    ],
  },
  {
    title: "Hangi sonuçları saydığını baştan seç",
    paragraphs: [
      "Bir torbada 4 kırmızı, 3 mavi, 2 yeşil top var. Geri koymadan üç kez çekiliyor ve her çekimde kalan toplar eş şanslı. Sıra önemli değilse toplam C(9,3)=84 eş şanslı alt küme var. Birer renk için 4·3·2=24 küme, olasılık 2/7.",
      "Sıralı sayarsan kırmızı, mavi, yeşil için 4/9·3/8·2/7=1/21. Üç rengin altı ayrık sırası var, 6/21=2/7. Payda sırasızsa payı sıra sayısıyla yeniden çarpma.",
      "Bir deney 50 kez tekrarlanıp A 30 kez gözlenirse deneysel oran 30/50=0,6. Bu veriden teorik olasılık kesin 0,6 çıkarılamaz ve sonraki deneyin sonucu belirlenmez. Teorik sonuç için deney modeli, gözlenen oran için kayıt gerekir.",
    ],
  },
];
