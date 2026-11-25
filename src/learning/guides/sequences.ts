import type { LessonGuide } from "./types";
export const sequencesGuide: LessonGuide = {
  id: "ardisik-sayilar",
  minutes: 40,
  objectives: [
    "Ardışık tam, tek ve çift sayıları doğru başlangıç ve adımla modelle.",
    "Uçlar dahilken terim sayısını ve toplamı gerekçesiyle hesapla.",
    "Ortalama ile ortancayı ayır; azalan veya açık uçlu listelerde koşulları denetle.",
  ],
  sections: [
    {
      title: "Ardışıklık yalnız farklı olmak değildir",
      paragraphs: [
        "Ardışık tam sayılar aralarında boşluk bırakmadan 1 artar: −2,−1,0,1 gibi. Ardışık çiftler ve ardışık tekler 2 artar; başlangıcın paritesi de doğru olmalıdır. a,a+2,a+4 yazmak tek başına ‘çift sayılar’ demek değildir; a tekse listedekiler tektir. 2,5,9 farklıdır ama aralıkları eşit değildir.",
        "Eşit aralıklı daha genel bir listede ilk terim a, adım d ve terim sayısı n kullanılır. Artan listede d>0, n pozitif tam sayıdır. k. terim a+(k−1)d’dir: ilk terime ulaşmak için hiç adım atmayız, n. terime ulaşmak için n−1 adım atarız. Bu ‘bir eksik adım’ fikri, terim sayısı formülünün kaynağıdır.",
      ],
    },
    {
      title: "Uçlar dahilken kaç terim var?",
      paragraphs: [
        "İlk a, son b ve pozitif adım d için b=a+(n−1)d; buradan n=(b−a)/d+1 bulunur. Bölüm aralık sayısıdır, +1 ise ilk terimi ekler. 5,8,…,26 için (26−5)/3+1=8 terim vardır. Sonuç pozitif tam sayı çıkmıyorsa seçilen son değer o listenin terimi değildir; sayıyı yuvarlayarak aynı uçlara sahip bir liste üretme.",
        "‘10 ile 30 arasındaki çiftler’ ifadesinde uçların dahil olup olmadığı açık olmalıdır. 10≤x≤30 için ilk 10, son 30 ve 11 terim; 10<x<30 için ilk 12, son 28 ve 9 terim vardır. Soru uçları dışlıyorsa formüle yazmadan önce gerçek ilk ve son terimi bul. Aşağıdaki model terim sayısı ve adımı ayrı ayrı değiştirir; uçları ve toplamı birlikte izle.",
      ],
    },
    {
      title: "Toplam formülü neden çalışır?",
      paragraphs: [
        "S=a+(a+d)+…+b olsun. Aynı toplamı tersten yazıp alt alta topladığında her sütun a+b olur. n sütun olduğundan 2S=n(a+b); dolayısıyla S=n(a+b)/2. Bu gerekçe n’nin tek veya çift olmasına bağlı değildir. Eşit aralık koşulu önemlidir; rastgele bir listedeki ilk ve son sayıyı kullanarak toplam bulunmaz.",
        "Özel sonuçlar bu genel formülden gelir: 1+…+n=n(n+1)/2; ilk n pozitif çiftin toplamı n(n+1), ilk n pozitif tekin toplamı n²’dir. ‘İlk n tek’ denince 1,3,…,2n−1 kullanılır. −3,−1,1,3 gibi sıfır çevresindeki tek liste için doğrudan n² kuralı kullanılamaz; genel formüle dön.",
      ],
    },
    {
      title: "Ortalama her zaman bir terim olmak zorunda değildir",
      paragraphs: [
        "Eşit aralıklı listede aritmetik ortalama (a+b)/2’dir; çünkü toplam bu değerle n’nin çarpımıdır. Terim sayısı tekse bu değer ortadaki terimdir. Terim sayısı çiftse ortadaki iki terimin ortalamasıdır ve listede bulunmayabilir: 2,3,4,5’in ortalaması 3,5’tir.",
        "Üç ardışık tam sayıyı x−1,x,x+1 yazmak toplamı 3x yapar. Üç ardışık tek veya çift x−2,x,x+2 olur; x’in uygun paritesi gerekir. Dört ardışık tam sayı için x−1,x,x+1,x+2 yazılabilir; ‘ortalama x’ diyorsan ortalamanın yarım tam sayı olabildiğini korumalısın. Kolay yazım, koşulu değiştirmemelidir.",
      ],
    },
    {
      title: "Azalan liste, negatif terim ve imkânsız koşul",
      paragraphs: [
        "Azalan 17,14,…,−1 listesinde d=−3 kullanılabilir: n=(−1−17)/(−3)+1=7. İstersen listeyi artan sıraya çevirip a=−1,b=17,d=3 ile say; toplam değişmez. İlk iki terimin negatif olması toplamın mutlaka negatif olduğu anlamına gelmez; bütün listeye bak.",
        "Üç ardışık çift sayının toplamı 45 olamaz: üç çiftin toplamı çifttir. Denklem x−2+x+x+2=45 verip x=15 bulmak hesap olarak doğrudur fakat x çift olmalıdır; koşul başarısızdır. Sorularda önce hızlı parite veya aralık kontrolü yap, sonra denklem çöz; sonunda elde edilen adayın kaynak koşulunu koruduğunu denetle.",
      ],
    },
    {
      title: "Sorudaki sırayı ve terim numarasını açık tut",
      paragraphs: [
        "‘İki ardışık çift sayı’ denip hangi ifadenin büyük olduğu söylenmemişse farkları +2 veya −2 olabilir. Örneğin 3k+1 ve 5k−3 ifadelerinden birini kendiliğinden büyük varsaymak bir durumu kaçırabilir. Verilen sıralamayı kullan; sıra verilmediyse iki farkı da düşün ve çiftlik koşulunu ayrıca denetle.",
        "Bir soruyu çözerken dört satır yeterli bir iskelet verir: ilk/son, adım, terim sayısı, toplam. Birim veya sıra varsa satırına ekle: merdiven basamakları, koltuk numaraları, günler gibi bağlamlarda ‘kaç boşluk’ ile ‘kaç nesne’ farklıdır. Küçük bir üç terimli liste kurarak +1’in gerekip gerekmediğini hızlıca kontrol edebilirsin.",
      ],
    },
    {
      title: "Silinen terim adayını listede doğrula",
      figureTitle: "Silinen terim adayını listede doğrula",
      paragraphs: [
        "Liste tamken toplamı hesapla. Kalan toplamı çıkarınca silinmiş olabilecek sayı bulunur. Bir adayın uçlar arasında bulunması yetmez. İlk terimden adımın tam katı kadar uzakta olmalıdır.",
        "4, 7, …, 31 listesi 10 terim ve 175 toplam verir. Kalan toplam 161 ise aday 14 olur. 14, 13 ile 16 arasındadır ve listede yoktur. Kalan 162 ise aday 13’tür ve listede vardır. Sürgüyle kalan toplamı değiştir, adayın noktaya denk gelip gelmediğine bak.",
      ],
    },
  ],
  examples: [
    {
      title: "İki uç da dahil",
      prompt: "7,11,15,…,47 listesinin terim sayısı ve toplamı nedir?",
      strategy: "Adım 4’tür; önce aralıkları say, sonra ilk terimi ekle.",
      steps: [
        {
          label: "Terim sayısı",
          expression: "n=(47−7)/4+1=11",
          explanation: "10 aralık, 11 terim vardır.",
        },
        {
          label: "Toplam",
          expression: "S=11(7+47)/2=297",
          explanation: "Her terim başına ortalama 27’dir.",
        },
      ],
      answer: "11 terim, toplam 297.",
      check: "6. terim 7+5×4=27 ortadadır; 11×27=297.",
      pitfall: "Aralık sayısı 10’u terim sayısı sanma.",
    },
    {
      title: "Açık aralıkta çiftler",
      prompt: "−8<x<14 koşulunu sağlayan çift tam sayıların toplamını bul.",
      strategy: "Önce izinli ilk ve son çift sayıyı seç.",
      steps: [
        {
          label: "Uçları düzelt",
          expression: "a=−6, b=12, d=2",
          explanation: "−8 ve 14 eşitsizliğe dahil değildir.",
        },
        {
          label: "Say ve topla",
          expression: "n=18/2+1=10; S=10×6/2=30",
          explanation: "Ortalamayı uçların toplamının yarısından buluruz.",
        },
      ],
      answer: "30",
      check: "−6+6, −4+4, −2+2 ve 0 birbirini dengeler; kalan 8+10+12=30.",
      pitfall: "Dışlanan sınırları toplamın içine alma.",
    },
    {
      title: "Ortalama listede görünmeyebilir",
      prompt: "Dört ardışık tam sayının toplamı 58’dir. Sayıları bul.",
      strategy:
        "En küçüğünü a seç; ortalamayı tam sayı olmak zorundaymış gibi kullanma.",
      steps: [
        {
          label: "Toplamı kur",
          expression: "a+(a+1)+(a+2)+(a+3)=4a+6=58",
          explanation: "Ardışık tam sayıların adımı 1’dir.",
        },
        {
          label: "Başlangıcı bul",
          expression: "a=13 → 13,14,15,16",
          explanation: "Ortalama 14,5’tir; listede bir terim değildir.",
        },
      ],
      answer: "13, 14, 15, 16.",
      check: "13+16=29 ve 14+15=29; toplam 58.",
      pitfall: "Çift sayıda terim varsa ortadaki tek bir terim varsayma.",
    },
    {
      title: "Sıra verilmemişse iki farkı da dene",
      prompt:
        "2k+2 ve 4k ifadeleri ardışık çift tam sayılardır. k tam sayıysa hangi değerleri alır?",
      strategy: "İkinci ifadenin büyük olduğu söylenmediği için farkı ±2 yap.",
      steps: [
        {
          label: "Birinci sıralama",
          expression: "4k−(2k+2)=2 → k=2",
          explanation: "Sayılar 6 ve 8 olur.",
        },
        {
          label: "Diğer sıralama",
          expression: "4k−(2k+2)=−2 → k=0",
          explanation: "Sayılar 2 ve 0 olur; onlar da ardışık çifttir.",
        },
      ],
      answer: "k=0 veya k=2.",
      check: "Her iki adayda ifadeler çift ve mutlak farkları 2’dir.",
      pitfall: "Yazılış sırası, küçükten büyüğe sıralama değildir.",
    },
    {
      title: "Çıkarma sonucu her zaman listede değildir",
      prompt: "6, 10, 14, …, 30 listesinden bir sayı silindi. Kalan toplam 107 olabilir mi? Kalan toplam 104 olsaydı hangi terim silinirdi?",
      strategy: "Tam toplamı çıkar. Elde edilen sayının ilk terimden adımın tam katı kadar ileride olup olmadığına bak.",
      steps: [
        { label: "Tam toplam", expression: "n=(30−6)/4+1=7; S=7×18=126", explanation: "Sonda belirtilen 30, gerçekten listede bulunur." },
        { label: "107 için aday", expression: "126−107=19", explanation: "19 uçlar arasında. Ancak (19−6)/4=13/4 tam sayı olmadığı için 19 bir terim değil." },
        { label: "104 için aday", expression: "126−104=22", explanation: "(22−6)/4=4 tam sayıdır. 22, dizinin beşinci terimidir." },
      ],
      answer: "107 mümkün değildir. 104 kalmışsa 22 silinmiştir.",
      check: "6+10+14+18+26+30=104.",
      pitfall: "Adayı ilk ve son terimin arasında bulunca üyelik denetimini atlama.",
    },
  ],
  recall: [
    {
      prompt: "Terim sayısındaki +1 nereden gelir?",
      answer:
        "(Son−ilk)/adım aralık sayısıdır; ilk terimi de saymak için 1 eklenir.",
    },
    {
      prompt: "Hangi listede n(ilk+son)/2 kullanılabilir?",
      answer:
        "Sabit aralıklı ve terim sayısı doğru belirlenmiş listede; rastgele sayılarda değil.",
    },
    {
      prompt: "Üç ardışık çiftin toplamı 51 olabilir mi?",
      answer: "Hayır. Çift sayıların toplamı çift olmalıdır; 51 tektir.",
    },
  ],
  source:
    "MEBİ TYT Matematik Konu Özetleri PDF s.17 (basılı 15); OGM Temel Kavramlar–Sayılar PDF s.5–7; Aurelia Ardışık Sayılar içerik 5.1, fiziksel s.1–6 ve 10. Açıklama, model ve çözümler özgündür; resmî sınav sorusu değildir.",
};
