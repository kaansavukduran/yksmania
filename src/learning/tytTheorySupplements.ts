interface TheorySupplement {
  title: string;
  figureTitle: string;
  paragraphs: string[];
  summary: string;
  appendSection?: true;
}

export const tytTheorySupplements: Readonly<Record<string, TheorySupplement | undefined>> = {
  "koklu-sayilar": {
    title: "Köklü denklemde önce koşul, sonra kare",
    figureTitle: "Köklü denklemde önce koşul, sonra kare",
    paragraphs: [
      "İkinci çizimde √(x+12)=x için önce x≥0 yaz. Kare alınca x²−x−12=(x−4)(x+3)=0 olur. 4 için √16=4 sağlanır. −3 için √9=3 çıkar ve 3, −3’e eşit değildir.",
    ],
    summary: "√(x+12)=x için x≥0 gerekir. Adaylardan 4 eşitliği sağlar. −3 için √9=3, sağ taraf −3’tür.",
  },
  "oran-oranti": {
    title: "Pompa sayısını değiştir, sabit işi koru",
    figureTitle: "Pompa sayısını değiştir, sabit işi koru",
    paragraphs: [
      "Aynı debideki 8 pompa bir işi 15 saatte bitirirse iş 8·15=120 pompa-saattir. 12 pompa için süre 120/12=10 saattir. Pompa sayısı artınca şekildeki genişlik artar, süre kısalır ve alan sabit kalır.",
      "İş de iki katına çıkarsa 240 pompa-saat gerekir. 12 pompa 20 saat çalışır. İlk 10 saatlik sonuç yalnız iş miktarı aynı kaldığında geçerlidir.",
    ],
    summary: "120 pompa-saatlik iş, 12 özdeş pompayla 10 saat sürer. İş iki katına çıkarsa süre 20 saat olur.",
    appendSection: true,
  },
  "sayi-problemleri": {
    title: "Kapasite eşitliği birimlerin oranını buldurur",
    figureTitle: "Kapasite eşitliği birimlerin oranını buldurur",
    paragraphs: [
      "Son çizimde 10a+4b=4a+7b olur. İki toplamdan da ortak 4a ve 4b çıkarınca 6a=3b kalır. Bir büyük kutu iki küçük kutu kadar yer kaplar. İki düzeni de denetle. 10+4·2=18 ve 4+7·2=18 küçük kutu yeri.",
    ],
    summary: "10a+4b=4a+7b eşitliğinde ortak terimleri çıkar. 6a=3b ve b=2a. İki düzenin kapasitesi 18 küçük kutu yeridir.",
  },
  "yas-problemleri": {
    title: "Aynı anda herkes aynı süre yaşlanır",
    figureTitle: "Aynı anda herkes aynı süre yaşlanır",
    paragraphs: [
      "İkinci çizimde Deniz bugün 30 ve Işıl 16 yaşında. Dört yıl sonra 34 ve 20 yaşındalar. Aynı tarihte düşey uzaklık hep 14 yıldır. Yaş oranını hesaplamak için iki yaşı da aynı tarihten oku.",
    ],
    summary: "30−16=14. Dört yıl sonra 34−20=14. Yaş farkı sabit kalırken oran değişir.",
  },
  "kesir-problemleri": {
    title: "Kalanın kesri yeni bir taban kullanır",
    figureTitle: "Kalanın kesri yeni bir taban kullanır",
    paragraphs: [
      "120 birimde önce 30 kullan ve 90 bırak. Kalanın 1/3’ü 30 birimdir ve 60 kalır. İkinci kesir ilk bütünün 1/3’ü olsaydı 40 kullanılır, 50 kalırdı. İki şeritte aynı sayıda eş parça var. İkinci kullanımın hangi bütüne ait olduğuna bak.",
    ],
    summary: "120’den önce 1/4, sonra ara kalanın 1/3’ü alınırsa 60 kalır. İki kesir de ilk bütüne aitse 50 kalır.",
  },
};
