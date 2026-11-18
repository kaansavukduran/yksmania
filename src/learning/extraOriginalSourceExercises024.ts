import type { OriginalSourceExercise } from "./sourceExercises024";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

/** Original source wording is preserved; the source context and app-authored
 * explanations are separate. Reading or revealing these items is unscored. */
export type ContextualOriginalSourceExercise024 = OriginalSourceExercise & {
  sourceContext?: string;
  figure?: SourceQuestionFigureSpec;
};
export const extraOriginalSourceExercises024: ContextualOriginalSourceExercise024[] =
  [
    {
      id: "s012-w3.1-original-024",
      lessonId: "tyt-mat-mutlak-deger-kaynak-038",
      source: {
        shortLabel: "Mutlak Değer · kaynak alıştırması",
        title: "Mutlak Değer",
        pageLabel: "Kaynak PDF, fiziksel sayfa 6",
        itemLabel: "Örnek 3.1",
      },
      prompt: "|2x+1|=7 denklemini çöz.",
      options: [],
      answer: "x=−4 veya x=3",
      steps: [
        "İçteki 2x+1 ifadesinin 0’a uzaklığı 7’dir. Sağ taraf pozitif olduğu için iki ayrı olasılık kur: 2x+1=7 veya 2x+1=−7.",
        "İlk olasılık 2x=6, x=3; ikinci olasılık 2x=−8, x=−4 verir.",
        "İki değeri özgün denklemde dene: x=3 için |7|=7; x=−4 için |−7|=7. İki kök de geçerlidir.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "|2x+1|=7 denklemini çöz.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "absolute",
              value: {
                kind: "text",
                text: "2x+1",
              },
            },
            {
              kind: "text",
              text: "=7",
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "İki dalın çözümleri x=3 ve x=−4.",
        expression: {
          kind: "text",
          text: "2x+1=7 ⇒ x=3;  2x+1=−7 ⇒ x=−4",
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
    },
    {
      id: "s012-w3.2-original-024",
      lessonId: "tyt-mat-mutlak-deger-kaynak-038",
      source: {
        shortLabel: "Mutlak Değer · kaynak alıştırması",
        title: "Mutlak Değer",
        pageLabel: "Kaynak PDF, fiziksel sayfa 6",
        itemLabel: "Örnek 3.2",
      },
      prompt: "|3x-2|<7 eşitsizliğini çöz.",
      options: [],
      answer: "(−5/3, 3)",
      steps: [
        "Mutlak değer 7’den küçükse iç ifade −7 ile 7 arasında kalır: −7<3x−2<7.",
        "Her tarafa 2 ekle: −5<3x<9. Pozitif 3’e bölmek eşitsizlik yönünü değiştirmez: −5/3<x<3.",
        "İlişki sıkıdır; iki sınır çözümde bulunmaz. Uçlarda mutlak değer 7 olduğundan <7 koşulu sağlanmaz.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "|3x-2|<7 eşitsizliğini çöz.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "absolute",
              value: {
                kind: "text",
                text: "3x−2",
              },
            },
            {
              kind: "text",
              text: "<7",
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "geometry",
        title: "Sayı doğrusunda çözüm aralığı",
        alt: "Çözüm aralığının uçları -5/3 ve 3. Sol uç hariç, sağ uç hariç.",
        viewBox: [0, 0, 480, 220],
        segments: [
          {
            from: [30, 115],
            to: [450, 115],
          },
          {
            from: [70, 115],
            to: [410, 115],
            emphasis: true,
          },
        ],
        points: [
          {
            at: [70.0, 115],
            label: "-5/3",
            open: true,
            emphasis: true,
          },
          {
            at: [410.0, 115],
            label: "3",
            open: true,
            emphasis: true,
          },
          {
            at: [240.0, 115],
            label: "2/3",
          },
        ],
        labels: [],
        caption:
          "Uygulama için çizilmiş çözüm: (-5/3, 3). Kesin uç değerleri açıkça yazılmıştır.",
      },
    },
    {
      id: "s012-w3.3-original-024",
      lessonId: "tyt-mat-mutlak-deger-kaynak-038",
      source: {
        shortLabel: "Mutlak Değer · kaynak alıştırması",
        title: "Mutlak Değer",
        pageLabel: "Kaynak PDF, fiziksel sayfa 6",
        itemLabel: "Örnek 3.3",
      },
      prompt: "|2x-1|≥5 eşitsizliğini çöz.",
      options: [],
      answer: "(−∞, −2] ∪ [3, ∞)",
      steps: [
        "5’e eşit veya daha büyük uzaklık iki dış bölgedir: 2x−1≤−5 veya 2x−1≥5.",
        "İlk dal 2x≤−4, x≤−2; ikinci dal 2x≥6, x≥3 verir.",
        "≥, sınırları içerir. x=−2 ve x=3 için mutlak değer 5’tir. −2 ile 3 arasındaki değerler bu eşitsizliğe alınmaz.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "|2x-1|≥5 eşitsizliğini çöz.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "absolute",
              value: {
                kind: "text",
                text: "2x−1",
              },
            },
            {
              kind: "text",
              text: "≥5",
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "Çözüm x≤−2 veya x≥3; iki dış aralık sınırlarıyla dahildir.",
        expression: {
          kind: "text",
          text: "(−∞, −2] ∪ [3, ∞)",
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
    },
    {
      id: "s012-w3.4-original-024",
      lessonId: "tyt-mat-mutlak-deger-kaynak-038",
      source: {
        shortLabel: "Mutlak Değer · kaynak alıştırması",
        title: "Mutlak Değer",
        pageLabel: "Kaynak PDF, fiziksel sayfa 6",
        itemLabel: "Örnek 3.4",
      },
      prompt:
        "|4x-3|≤9 için önce ____≤4x-3≤____ yaz. Sonra her tarafa 3 ekle ve 4'e böl.",
      options: [],
      answer: "Boşluklar −9 ve 9; çözüm [−3/2, 3]",
      steps: [
        "İlk boşluğa −9, ikinci boşluğa 9 yaz: −9≤4x−3≤9. Mutlak değerde ≤, içteki iki sınırı da dahil eder.",
        "Her tarafa 3 ekle: −6≤4x≤12. Her tarafı pozitif 4’e böl: −3/2≤x≤3.",
        "İki uç için |4x−3|=9 olur; uçlar dahildir. Kaynaktaki boşluklar tamamlandıktan sonra aralık [−3/2,3] olarak yazılır.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "|4x-3|≤9 için önce ____≤4x-3≤____ yaz. Sonra her tarafa 3 ekle ve 4'e böl.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "absolute",
              value: {
                kind: "text",
                text: "4x−3",
              },
            },
            {
              kind: "text",
              text: "≤9;  ____≤4x−3≤____",
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "geometry",
        title: "Sayı doğrusunda çözüm aralığı",
        alt: "Çözüm aralığının uçları -3/2 ve 3. Sol uç dahil, sağ uç dahil.",
        viewBox: [0, 0, 480, 220],
        segments: [
          {
            from: [30, 115],
            to: [450, 115],
          },
          {
            from: [70, 115],
            to: [410, 115],
            emphasis: true,
          },
        ],
        points: [
          {
            at: [70.0, 115],
            label: "-3/2",
            open: false,
            emphasis: true,
          },
          {
            at: [410.0, 115],
            label: "3",
            open: false,
            emphasis: true,
          },
          {
            at: [240.0, 115],
            label: "3/4",
          },
        ],
        labels: [],
        caption:
          "Uygulama için çizilmiş çözüm: [-3/2, 3]. Kesin uç değerleri açıkça yazılmıştır.",
      },
    },
    {
      id: "s012-w3.5-original-024",
      lessonId: "tyt-mat-mutlak-deger-kaynak-038",
      source: {
        shortLabel: "Mutlak Değer · kaynak alıştırması",
        title: "Mutlak Değer",
        pageLabel: "Kaynak PDF, fiziksel sayfa 7",
        itemLabel: "Örnek 3.5",
      },
      prompt:
        "|x-2|+|x+1| ifadesinin en küçük değeri ve bu değeri aldığı x kümesi nedir?",
      options: [],
      answer: "En küçük değer 3; x∈[−1,2]",
      steps: [
        "|x−2|, x’in 2’ye; |x+1|, x’in −1’e uzaklığıdır. İki uç arasındaki uzaklık 2−(−1)=3’tür.",
        "−1≤x≤2 iken toplam (2−x)+(x+1)=3 olur. Aradaki bütün x değerleri aynı minimumu verir.",
        "x uçların dışına çıkınca bir uçtan uzaklaşırken diğer uçtan da uzaklaşır; toplam 3’ten büyür. Minimum yalnız orta noktaya ait değildir.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "|x-2|+|x+1| ifadesinin en küçük değeri ve bu değeri aldığı x kümesi nedir?",
        expression: {
          kind: "row",
          items: [
            {
              kind: "absolute",
              value: {
                kind: "text",
                text: "x−2",
              },
            },
            {
              kind: "text",
              text: "+",
            },
            {
              kind: "absolute",
              value: {
                kind: "text",
                text: "x+1",
              },
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "geometry",
        title: "Sayı doğrusunda çözüm aralığı",
        alt: "Çözüm aralığının uçları -1 ve 2. Sol uç dahil, sağ uç dahil.",
        viewBox: [0, 0, 480, 220],
        segments: [
          {
            from: [30, 115],
            to: [450, 115],
          },
          {
            from: [70, 115],
            to: [410, 115],
            emphasis: true,
          },
        ],
        points: [
          {
            at: [70.0, 115],
            label: "-1",
            open: false,
            emphasis: true,
          },
          {
            at: [410.0, 115],
            label: "2",
            open: false,
            emphasis: true,
          },
        ],
        labels: [],
        caption:
          "Uygulama için çizilmiş çözüm: [-1, 2]. Kesin uç değerleri açıkça yazılmıştır.",
      },
      clarification:
        "Şekilde vurgulanan aralık, minimumu veren x değerleridir; fonksiyonun bütün grafiği değildir.",
    },
    {
      id: "s012-w3.6-original-024",
      lessonId: "tyt-mat-mutlak-deger-kaynak-038",
      source: {
        shortLabel: "Mutlak Değer · kaynak alıştırması",
        title: "Mutlak Değer",
        pageLabel: "Kaynak PDF, fiziksel sayfa 7",
        itemLabel: "Örnek 3.6",
      },
      prompt: "||x|-3|=1 denklemini çöz.",
      options: [],
      answer: "{−4,−2,2,4}",
      steps: [
        "Dış mutlak değeri aç: |x|−3=1 veya |x|−3=−1.",
        "İlk dal |x|=4, yani x=−4 veya x=4; ikinci dal |x|=2, yani x=−2 veya x=2 verir.",
        "Dört değer farklıdır ve hepsinde ||x|−3|=1 olur. İkinci dalı unutmak çözüm kümesinin yarısını kaybettirir.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "||x|-3|=1 denklemini çöz.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "absolute",
              value: {
                kind: "row",
                items: [
                  {
                    kind: "absolute",
                    value: {
                      kind: "text",
                      text: "x",
                    },
                  },
                  {
                    kind: "text",
                    text: "−3",
                  },
                ],
              },
            },
            {
              kind: "text",
              text: "=1",
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "Dört kök −4, −2, 2 ve 4.",
        expression: {
          kind: "text",
          text: "|x|=4 veya |x|=2 ⇒ {−4,−2,2,4}",
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
    },
    {
      id: "s012-w3.7-original-024",
      lessonId: "tyt-mat-mutlak-deger-kaynak-038",
      source: {
        shortLabel: "Mutlak Değer · kaynak alıştırması",
        title: "Mutlak Değer",
        pageLabel: "Kaynak PDF, fiziksel sayfa 7",
        itemLabel: "Örnek 3.7",
      },
      prompt: "y=|x-2|-1 grafiğinin tepe noktası ve kökleri?",
      options: [],
      answer: "Tepe (2,−1); kökler x=1 ve x=3",
      steps: [
        "İçteki x−2 sıfır olduğunda x=2 olur. O noktada mutlak değer 0, dış sabitle y=−1’dir; tepe (2,−1).",
        "Kökleri bulmak için y=0 yaz: |x−2|−1=0, buradan |x−2|=1. İki kök x=1 ve x=3’tür.",
        "Kökler x=2 simetri doğrusundan birer birim uzaktadır. Şekildeki nokta ve çizgiler bu aynı fonksiyondan hesaplanmıştır.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "y=|x-2|-1 grafiğinin tepe noktası ve kökleri?",
        expression: {
          kind: "row",
          items: [
            {
              kind: "text",
              text: "y=",
            },
            {
              kind: "absolute",
              value: {
                kind: "text",
                text: "x−2",
              },
            },
            {
              kind: "text",
              text: "−1",
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "geometry",
        title: "y=|x−2|−1 grafiğinin bir parçası",
        alt: "Tepe (2,−1), kökler (1,0) ve (3,0). Gösterilen grafik x=0 ile x=4 arasındaki parçadır.",
        viewBox: [0, 0, 480, 220],
        segments: [
          {
            from: [20, 100],
            to: [460, 100],
          },
          {
            from: [40, 20],
            to: [40, 180],
          },
          {
            from: [40, 50],
            to: [140, 100],
            emphasis: true,
          },
          {
            from: [140, 100],
            to: [240, 150],
            emphasis: true,
          },
          {
            from: [240, 150],
            to: [340, 100],
            emphasis: true,
          },
          {
            from: [340, 100],
            to: [440, 50],
            emphasis: true,
          },
        ],
        points: [
          {
            at: [140, 100],
            label: "(1,0)",
            emphasis: true,
          },
          {
            at: [240, 150],
            label: "(2,−1)",
            emphasis: true,
          },
          {
            at: [340, 100],
            label: "(3,0)",
            emphasis: true,
          },
        ],
        labels: [],
        caption:
          "Uygulama için hesaplanmış şekil: tepe (2,−1), kökler 1 ve 3; kollar gösterilen pencerenin dışında devam eder.",
      },
    },
    {
      id: "s012-w3.8-original-024",
      lessonId: "tyt-mat-mutlak-deger-kaynak-038",
      source: {
        shortLabel: "Mutlak Değer · kaynak alıştırması",
        title: "Mutlak Değer",
        pageLabel: "Kaynak PDF, fiziksel sayfa 7",
        itemLabel: "Örnek 3.8",
      },
      prompt: "|x-2|=m-1 denkleminin çözüm sayısı m'ye göre nedir?",
      options: [],
      answer: "m<1: 0 çözüm; m=1: 1 çözüm; m>1: 2 çözüm",
      steps: [
        "Bir uzaklık negatif olamaz. Sağ taraf m−1 negatiftirse, yani m<1 ise hiçbir x koşulu sağlayamaz.",
        "m=1 iken |x−2|=0 olur; yalnız x=2 çözüm verir. Aynı kökü iki farklı kök diye sayma.",
        "m>1 iken yarıçap m−1 pozitiftir: x=2−(m−1)=3−m veya x=2+(m−1)=m+1. Bunlar iki farklı çözümdür.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "|x-2|=m-1 denkleminin çözüm sayısı m'ye göre nedir?",
        expression: {
          kind: "row",
          items: [
            {
              kind: "absolute",
              value: {
                kind: "text",
                text: "x−2",
              },
            },
            {
              kind: "text",
              text: "=m−1",
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "m birden küçükse boş küme, m=1 iken {2}, m>1 iken {3−m,m+1}.",
        expression: {
          kind: "text",
          text: "m<1: ∅;  m=1: {2};  m>1: {3−m, m+1}",
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
    },
    {
      id: "s012-w3.9-original-024",
      lessonId: "tyt-mat-mutlak-deger-kaynak-038",
      source: {
        shortLabel: "Mutlak Değer · kaynak alıştırması",
        title: "Mutlak Değer",
        pageLabel: "Kaynak PDF, fiziksel sayfa 8",
        itemLabel: "Örnek 3.9",
      },
      prompt: "|x-1|+|x-4|=5 denklemini çöz.",
      options: [],
      answer: "{0,5}",
      steps: [
        "İç ifadelerin işaret değiştirdiği noktalar 1 ve 4’tür. x<1, 1≤x≤4, x>4 aralıklarını ayrı incele.",
        "x<1 için (1−x)+(4−x)=5, x=0 çıkar ve bu aralığa uyar. Orta aralıkta toplam hep 3’tür; 3=5 olmadığı için çözüm yoktur.",
        "x>4 için (x−1)+(x−4)=5, x=5 çıkar ve bu aralığa uyar. Özgün ifadede x=0 için 1+4=5, x=5 için 4+1=5.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "|x-1|+|x-4|=5 denklemini çöz.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "absolute",
              value: {
                kind: "text",
                text: "x−1",
              },
            },
            {
              kind: "text",
              text: "+",
            },
            {
              kind: "absolute",
              value: {
                kind: "text",
                text: "x−4",
              },
            },
            {
              kind: "text",
              text: "=5",
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "Üç bölgede kontrol: solda x=0; ortada çözüm yok; sağda x=5.",
        expression: {
          kind: "text",
          text: "x<1: x=0;  1≤x≤4: ∅;  x>4: x=5",
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
    },
    {
      id: "s012-w3.11-original-024",
      lessonId: "tyt-mat-mutlak-deger-kaynak-038",
      source: {
        shortLabel: "Mutlak Değer · kaynak alıştırması",
        title: "Mutlak Değer",
        pageLabel: "Kaynak PDF, fiziksel sayfa 8",
        itemLabel: "Örnek 3.11",
      },
      prompt: "|x-1|=|2x+3| denklemini çöz.",
      options: [],
      answer: "{−4,−2/3}",
      steps: [
        "İki mutlak değerin eşitliği, iç ifadelerin aynı ya da ters işaretli eşit olmasıyla sağlanır: x−1=2x+3 veya x−1=−(2x+3).",
        "Birinci dal −x=4, x=−4; ikinci dal 3x=−2, x=−2/3 verir.",
        "x=−4 için iki taraf 5’tir. x=−2/3 için iki taraf 5/3’tür. Parantezin önündeki eksi, içindeki her terime uygulanır.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "|x-1|=|2x+3| denklemini çöz.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "absolute",
              value: {
                kind: "text",
                text: "x−1",
              },
            },
            {
              kind: "text",
              text: "=",
            },
            {
              kind: "absolute",
              value: {
                kind: "text",
                text: "2x+3",
              },
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "x−1=2x+3 veya x−1=−2x−3; çözümler −4 ve −2/3.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "text",
              text: "x=−4 veya x=",
            },
            {
              kind: "fraction",
              numerator: {
                kind: "text",
                text: "−2",
              },
              denominator: {
                kind: "text",
                text: "3",
              },
            },
          ],
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
    },
    {
      id: "s013-p06-w31-original-024",
      lessonId: "tyt-mat-uslu-sayilar-kaynak-039",
      source: {
        shortLabel: "Üslü Sayılar · kaynak alıştırması",
        title: "Üslü Sayılar",
        pageLabel: "Kaynak PDF, fiziksel sayfa 6",
        itemLabel: "Örnek 3.1",
      },
      prompt: "(4^3·8^2)/2^5 işlemini hesapla.",
      options: [],
      answer: "128",
      steps: [
        "Tabanları 2 yap: 4=2² ve 8=2³. Kuvvetin kuvvetinde üsler çarpılır: 4³=2⁶, 8²=2⁶.",
        "Pay 2⁶·2⁶=2¹², payda 2⁵’tir. Aynı tabanlı bölüm 2^(12−5)=2⁷ verir.",
        "2⁷=128. Doğrudan denetimde 4³=64, 8²=64, 64·64/32=128 bulunur.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "(4^3·8^2)/2^5 işlemini hesapla.",
        expression: {
          kind: "fraction",
          numerator: {
            kind: "row",
            items: [
              {
                kind: "power",
                base: {
                  kind: "text",
                  text: "4",
                },
                exponent: {
                  kind: "text",
                  text: "3",
                },
              },
              {
                kind: "text",
                text: "·",
              },
              {
                kind: "power",
                base: {
                  kind: "text",
                  text: "8",
                },
                exponent: {
                  kind: "text",
                  text: "2",
                },
              },
            ],
          },
          denominator: {
            kind: "power",
            base: {
              kind: "text",
              text: "2",
            },
            exponent: {
              kind: "text",
              text: "5",
            },
          },
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "2^(6+6−5)=2^7=128.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "power",
              base: {
                kind: "text",
                text: "2",
              },
              exponent: {
                kind: "text",
                text: "6+6−5",
              },
            },
            {
              kind: "text",
              text: "=",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "2",
              },
              exponent: {
                kind: "text",
                text: "7",
              },
            },
            {
              kind: "text",
              text: "=128",
            },
          ],
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
    },
    {
      id: "s013-p06-w32-original-024",
      lessonId: "tyt-mat-uslu-sayilar-kaynak-039",
      source: {
        shortLabel: "Üslü Sayılar · kaynak alıştırması",
        title: "Üslü Sayılar",
        pageLabel: "Kaynak PDF, fiziksel sayfa 6",
        itemLabel: "Örnek 3.2",
      },
      prompt: "8^(x-1)=4^(x+2) denklemini çöz.",
      options: [],
      answer: "x=7",
      steps: [
        "8=2³ ve 4=2² yaz. Denklem 2^[3(x−1)]=2^[2(x+2)] olur.",
        "Ortak taban 2 pozitiftir ve 1’den farklıdır; aynı kuvvet değeri için üsler eşittir: 3x−3=2x+4, x=7.",
        "Yerine koy: 8⁶=(2³)⁶=2¹⁸ ve 4⁹=(2²)⁹=2¹⁸. İki taraf eşittir.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "8^(x-1)=4^(x+2) denklemini çöz.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "power",
              base: {
                kind: "text",
                text: "8",
              },
              exponent: {
                kind: "text",
                text: "x−1",
              },
            },
            {
              kind: "text",
              text: "=",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "4",
              },
              exponent: {
                kind: "text",
                text: "x+2",
              },
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "Üsler eşitlenince 3x−3=2x+4 ve x=7.",
        expression: {
          kind: "text",
          text: "3(x−1)=2(x+2) ⇒ 3x−3=2x+4 ⇒ x=7",
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
    },
    {
      id: "s013-p06-w33-original-024",
      lessonId: "tyt-mat-uslu-sayilar-kaynak-039",
      source: {
        shortLabel: "Üslü Sayılar · kaynak alıştırması",
        title: "Üslü Sayılar",
        pageLabel: "Kaynak PDF, fiziksel sayfa 6",
        itemLabel: "Örnek 3.3",
      },
      prompt: "5^(n+3)-2·5^(n+2) ifadesini sadeleştir.",
      options: [],
      answer: "3·5^(n+2)",
      steps: [
        "İki terimde de 5^(n+2) vardır. İlk terim 5^(n+3)=5^(n+2)·5 biçimindedir.",
        "Ortak çarpanı ayır: 5^(n+2)·5−2·5^(n+2)=5^(n+2)·(5−2).",
        "Parantez 3 olur; sonuç 3·5^(n+2). Toplama ya da farkta üsler doğrudan birleştirilmez.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "5^(n+3)-2·5^(n+2) ifadesini sadeleştir.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "power",
              base: {
                kind: "text",
                text: "5",
              },
              exponent: {
                kind: "text",
                text: "n+3",
              },
            },
            {
              kind: "text",
              text: "−2·",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "5",
              },
              exponent: {
                kind: "text",
                text: "n+2",
              },
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "Ortak çarpan 5^(n+2); parantez 5−2=3.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "power",
              base: {
                kind: "text",
                text: "5",
              },
              exponent: {
                kind: "text",
                text: "n+2",
              },
            },
            {
              kind: "text",
              text: "·(5−2)=3·",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "5",
              },
              exponent: {
                kind: "text",
                text: "n+2",
              },
            },
          ],
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
      clarification:
        "Kaynak isteminde n’nin sayı kümesi belirtilmemiştir. Burada verilen ifadeyi daraltmadan koruyoruz. Pozitif taban 5 için gösterilen çarpan ayırma eşitliği gerçek n değerlerinde de geçerlidir.",
    },
    {
      id: "s013-p06-w34-original-024",
      lessonId: "tyt-mat-uslu-sayilar-kaynak-039",
      source: {
        shortLabel: "Üslü Sayılar · kaynak alıştırması",
        title: "Üslü Sayılar",
        pageLabel: "Kaynak PDF, fiziksel sayfa 6",
        itemLabel: "Örnek 3.4",
      },
      prompt:
        "(9^2·27)/(3^4) için 9=3^__ ve 27=3^__. Üstteki toplam üs __ olur; paydadaki 4 çıkarılır.",
      options: [],
      answer: "Boşluklar 2, 3, 7; son değer 27",
      steps: [
        "9=3² olduğu için ilk boşluğa 2; 27=3³ olduğu için ikinci boşluğa 3 yaz.",
        "9²=(3²)²=3⁴’tür. Paydaki 3⁴·3³ için toplam üs 4+3=7; üçüncü boşluk 7 olur.",
        "Paydanın 4 üssünü çıkar: 3^(7−4)=3³=27. İlk 9=3² dönüşümünde, 9’un dışındaki kareyi ayrıca uygulamayı unutma.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "(9^2·27)/(3^4) için 9=3^__ ve 27=3^__. Üstteki toplam üs __ olur; paydadaki 4 çıkarılır.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "fraction",
              numerator: {
                kind: "row",
                items: [
                  {
                    kind: "power",
                    base: {
                      kind: "text",
                      text: "9",
                    },
                    exponent: {
                      kind: "text",
                      text: "2",
                    },
                  },
                  {
                    kind: "text",
                    text: "·27",
                  },
                ],
              },
              denominator: {
                kind: "power",
                base: {
                  kind: "text",
                  text: "3",
                },
                exponent: {
                  kind: "text",
                  text: "4",
                },
              },
            },
            {
              kind: "text",
              text: "; 9=",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "3",
              },
              exponent: {
                kind: "text",
                text: "__",
              },
            },
            {
              kind: "text",
              text: "; 27=",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "3",
              },
              exponent: {
                kind: "text",
                text: "__",
              },
            },
            {
              kind: "text",
              text: "; toplam üs __",
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "Boşluklar sırayla 2,3,7; bölüm 3^(4+3−4)=27.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "fraction",
              numerator: {
                kind: "row",
                items: [
                  {
                    kind: "power",
                    base: {
                      kind: "row",
                      items: [
                        {
                          kind: "text",
                          text: "(",
                        },
                        {
                          kind: "power",
                          base: {
                            kind: "text",
                            text: "3",
                          },
                          exponent: {
                            kind: "text",
                            text: "2",
                          },
                        },
                        {
                          kind: "text",
                          text: ")",
                        },
                      ],
                    },
                    exponent: {
                      kind: "text",
                      text: "2",
                    },
                  },
                  {
                    kind: "text",
                    text: "·",
                  },
                  {
                    kind: "power",
                    base: {
                      kind: "text",
                      text: "3",
                    },
                    exponent: {
                      kind: "text",
                      text: "3",
                    },
                  },
                ],
              },
              denominator: {
                kind: "power",
                base: {
                  kind: "text",
                  text: "3",
                },
                exponent: {
                  kind: "text",
                  text: "4",
                },
              },
            },
            {
              kind: "text",
              text: "=",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "3",
              },
              exponent: {
                kind: "text",
                text: "4+3−4",
              },
            },
            {
              kind: "text",
              text: "=27",
            },
          ],
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
    },
    {
      id: "s013-p07-w35-original-024",
      lessonId: "tyt-mat-uslu-sayilar-kaynak-039",
      source: {
        shortLabel: "Üslü Sayılar · kaynak alıştırması",
        title: "Üslü Sayılar",
        pageLabel: "Kaynak PDF, fiziksel sayfa 7",
        itemLabel: "Örnek 3.5",
      },
      prompt: "(6×10^7)(4×10^-3) sonucunu bilimsel gösterimle yaz.",
      options: [],
      answer: "2,4×10^5",
      steps: [
        "Katsayıları çarp: 6·4=24. Aynı tabanlı 10 kuvvetlerini çarp: 10⁷·10⁻³=10⁴.",
        "Ara sonuç 24×10⁴ olur. Bilimsel gösterimde pozitif katsayı 1 ile 10 arasında olmalı; 24=2,4×10 yaz.",
        "Sonuç 2,4×10⁵’tir. Geri açınca 240000 çıkar. Katsayıyı 10’a bölerken kuvveti bir artırarak sayıyı koruduk.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "(6×10^7)(4×10^-3) sonucunu bilimsel gösterimle yaz.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "text",
              text: "(6×",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "10",
              },
              exponent: {
                kind: "text",
                text: "7",
              },
            },
            {
              kind: "text",
              text: ")(4×",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "10",
              },
              exponent: {
                kind: "text",
                text: "−3",
              },
            },
            {
              kind: "text",
              text: ")",
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "24×10^4=2,4×10^5=240000.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "text",
              text: "24×",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "10",
              },
              exponent: {
                kind: "text",
                text: "4",
              },
            },
            {
              kind: "text",
              text: "=2,4×",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "10",
              },
              exponent: {
                kind: "text",
                text: "5",
              },
            },
            {
              kind: "text",
              text: "=240000",
            },
          ],
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
    },
    {
      id: "s013-p07-w36-original-024",
      lessonId: "tyt-mat-uslu-sayilar-kaynak-039",
      source: {
        shortLabel: "Üslü Sayılar · kaynak alıştırması",
        title: "Üslü Sayılar",
        pageLabel: "Kaynak PDF, fiziksel sayfa 7",
        itemLabel: "Örnek 3.6",
      },
      prompt: "2^18 ile 8^6'yı karşılaştır.",
      options: [],
      answer: "2^18 = 8^6",
      steps: [
        "8=2³ dönüşümünü kullan: 8⁶=(2³)⁶.",
        "Kuvvetin kuvvetinde üsler çarpılır: (2³)⁶=2¹⁸. İki verilen sayı tam olarak eşittir.",
        "İstersen son denetim: ikisi de 262144’tür. Büyük tam sayıyı hesaplamak, ortak tabanla eşitliği göstermenin şartı değildir.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "2^18 ile 8^6'yı karşılaştır.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "power",
              base: {
                kind: "text",
                text: "2",
              },
              exponent: {
                kind: "text",
                text: "18",
              },
            },
            {
              kind: "text",
              text: " ile ",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "8",
              },
              exponent: {
                kind: "text",
                text: "6",
              },
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "8^6=(2^3)^6=2^18.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "power",
              base: {
                kind: "text",
                text: "8",
              },
              exponent: {
                kind: "text",
                text: "6",
              },
            },
            {
              kind: "text",
              text: "=",
            },
            {
              kind: "power",
              base: {
                kind: "row",
                items: [
                  {
                    kind: "text",
                    text: "(",
                  },
                  {
                    kind: "power",
                    base: {
                      kind: "text",
                      text: "2",
                    },
                    exponent: {
                      kind: "text",
                      text: "3",
                    },
                  },
                  {
                    kind: "text",
                    text: ")",
                  },
                ],
              },
              exponent: {
                kind: "text",
                text: "6",
              },
            },
            {
              kind: "text",
              text: "=",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "2",
              },
              exponent: {
                kind: "text",
                text: "18",
              },
            },
          ],
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
    },
    {
      id: "s013-p07-w37-original-024",
      lessonId: "tyt-mat-uslu-sayilar-kaynak-039",
      source: {
        shortLabel: "Üslü Sayılar · kaynak alıştırması",
        title: "Üslü Sayılar",
        pageLabel: "Kaynak PDF, fiziksel sayfa 7",
        itemLabel: "Örnek 3.7",
      },
      prompt: "(1/3)^4 ile (1/3)^7'den hangisi büyüktür?",
      options: [],
      answer: "(1/3)^4 daha büyüktür",
      steps: [
        "Taban 1/3, 0 ile 1 arasındadır. Her yeni çarpan pozitif değeri üçte birine indirir.",
        "Bu yüzden yedi kez 1/3 ile çarpmak dört kez çarpmaktan daha küçük sonuç verir: (1/3)⁴>(1/3)⁷.",
        "Kesin kontrol: (1/3)⁴=1/81 ve (1/3)⁷=1/2187. İlk sayının ikinciye oranı 27>1’dir.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "(1/3)^4 ile (1/3)^7'den hangisi büyüktür?",
        expression: {
          kind: "row",
          items: [
            {
              kind: "power",
              base: {
                kind: "fraction",
                numerator: {
                  kind: "text",
                  text: "1",
                },
                denominator: {
                  kind: "text",
                  text: "3",
                },
              },
              exponent: {
                kind: "text",
                text: "4",
              },
            },
            {
              kind: "text",
              text: " ile ",
            },
            {
              kind: "power",
              base: {
                kind: "fraction",
                numerator: {
                  kind: "text",
                  text: "1",
                },
                denominator: {
                  kind: "text",
                  text: "3",
                },
              },
              exponent: {
                kind: "text",
                text: "7",
              },
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "1/81>1/2187; ilk değer ikincinin 27 katıdır.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "fraction",
              numerator: {
                kind: "text",
                text: "1",
              },
              denominator: {
                kind: "text",
                text: "81",
              },
            },
            {
              kind: "text",
              text: ">",
            },
            {
              kind: "fraction",
              numerator: {
                kind: "text",
                text: "1",
              },
              denominator: {
                kind: "text",
                text: "2187",
              },
            },
            {
              kind: "text",
              text: "; oran=27",
            },
          ],
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
    },
    {
      id: "s013-p07-w38-original-024",
      lessonId: "tyt-mat-uslu-sayilar-kaynak-039",
      source: {
        shortLabel: "Üslü Sayılar · kaynak alıştırması",
        title: "Üslü Sayılar",
        pageLabel: "Kaynak PDF, fiziksel sayfa 7",
        itemLabel: "Örnek 3.8",
      },
      prompt:
        "Başlangıçta 200 birim olan bir miktar her adımda iki katına çıkıyor. 6 adım sonraki miktar?",
      options: [],
      answer: "12800 birim",
      steps: [
        "Başlangıç değeri 200, her tamamlanan adımın çarpanı 2 ve adım sayısı 6’dır. Başlangıç, adım 0’daki değerdir.",
        "Model 200·2⁶ olur. 2⁶=64 ve 200·64=12800.",
        "Adım adım kontrol: 200,400,800,1600,3200,6400,12800. Başlangıcı ilk katlanma sayıp yalnız beş çarpan kullanma.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "Başlangıçta 200 birim olan bir miktar her adımda iki katına çıkıyor. 6 adım sonraki miktar?",
        expression: {
          kind: "row",
          items: [
            {
              kind: "text",
              text: "Başlangıç 200; çarpan 2; adım 6",
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "geometry",
        title: "Altı tamamlanan adımda miktar",
        alt: "Adım 0,1,2,3,4,5,6 için miktarlar sırasıyla 200,400,800,1600,3200,6400,12800.",
        viewBox: [0, -50, 480, 270],
        segments: [
          {
            from: [30, 175],
            to: [445, 175],
          },
          {
            from: [50, 20],
            to: [50, 185],
          },
          {
            from: [50, 172.65625],
            to: [110, 170.3125],
            emphasis: true,
          },
          {
            from: [110, 170.3125],
            to: [170, 165.625],
            emphasis: true,
          },
          {
            from: [170, 165.625],
            to: [230, 156.25],
            emphasis: true,
          },
          {
            from: [230, 156.25],
            to: [290, 137.5],
            emphasis: true,
          },
          {
            from: [290, 137.5],
            to: [350, 100.0],
            emphasis: true,
          },
          {
            from: [350, 100.0],
            to: [410, 25.0],
            emphasis: true,
          },
        ],
        points: [
          {
            at: [50, 172.65625],
            label: "0",
            emphasis: true,
          },
          {
            at: [110, 170.3125],
            label: "1",
            emphasis: true,
          },
          {
            at: [170, 165.625],
            label: "2",
            emphasis: true,
          },
          {
            at: [230, 156.25],
            label: "3",
            emphasis: true,
          },
          {
            at: [290, 137.5],
            label: "4",
            emphasis: true,
          },
          {
            at: [350, 100.0],
            label: "5",
            emphasis: true,
          },
          {
            at: [410, 25.0],
            label: "6",
            emphasis: true,
          },
        ],
        labels: [],
        caption:
          "Uygulama için hesaplanmış adım grafiği. Başlangıç adım 0’dır: 200 → 400 → 800 → 1600 → 3200 → 6400 → 12800. Noktalar yalnız tamamlanan adımları gösterir.",
      },
    },
    {
      id: "s013-p11-r01-original-024",
      lessonId: "tyt-mat-uslu-sayilar-kaynak-039",
      source: {
        shortLabel: "Üslü Sayılar · kaynak alıştırması",
        title: "Üslü Sayılar",
        pageLabel: "Kaynak PDF, fiziksel sayfa 11",
        itemLabel: "Hata onarımı 01",
      },
      prompt: "3^2+3^3=?",
      options: [],
      answer: "36",
      steps: [
        "Bu işlem çarpım değil toplamdır; 3²+3³ için üsleri toplayıp 3⁵ yazamazsın.",
        "Ya değerleri ayrı hesapla: 3²=9 ve 3³=27, toplam 36. Ya da 3² ortak çarpanını al: 3²(1+3)=9·4.",
        "İki yol da 36 verir. Toplama ile aynı tabanlı çarpmanın kurallarını ayrı tut.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "3^2+3^3=?",
        expression: {
          kind: "row",
          items: [
            {
              kind: "power",
              base: {
                kind: "text",
                text: "3",
              },
              exponent: {
                kind: "text",
                text: "2",
              },
            },
            {
              kind: "text",
              text: "+",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "3",
              },
              exponent: {
                kind: "text",
                text: "3",
              },
            },
            {
              kind: "text",
              text: "=?",
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "3^2+3^3=3^2(1+3)=9·4=36.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "power",
              base: {
                kind: "text",
                text: "3",
              },
              exponent: {
                kind: "text",
                text: "2",
              },
            },
            {
              kind: "text",
              text: "+",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "3",
              },
              exponent: {
                kind: "text",
                text: "3",
              },
            },
            {
              kind: "text",
              text: "=",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "3",
              },
              exponent: {
                kind: "text",
                text: "2",
              },
            },
            {
              kind: "text",
              text: "·(1+3)=36",
            },
          ],
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
      sourceContext:
        "İlk bozulan adım: 2^3+2^4=2^7\nNeden yanlış?: Toplam, aynı taban çarpımı değildir.\nHedefli düzeltme: 2^3(1+2)\nYeni sınama: 3^2+3^3=?",
    },
    {
      id: "s013-p11-r02-original-024",
      lessonId: "tyt-mat-uslu-sayilar-kaynak-039",
      source: {
        shortLabel: "Üslü Sayılar · kaynak alıştırması",
        title: "Üslü Sayılar",
        pageLabel: "Kaynak PDF, fiziksel sayfa 11",
        itemLabel: "Hata onarımı 02",
      },
      prompt: "(5^2)^3=?",
      options: [],
      answer: "5^6=15625",
      steps: [
        "Bir kuvvetin tekrar kuvvetini alırken üsler toplanmaz, çarpılır: (5²)³=5^(2·3).",
        "2·3=6 olduğu için sonuç 5⁶’dır. 5⁶=15625.",
        "Tekrar çarpım olarak kontrol: (5²)³=5²·5²·5²=5^(2+2+2)=5⁶.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "(5^2)^3=?",
        expression: {
          kind: "row",
          items: [
            {
              kind: "power",
              base: {
                kind: "row",
                items: [
                  {
                    kind: "text",
                    text: "(",
                  },
                  {
                    kind: "power",
                    base: {
                      kind: "text",
                      text: "5",
                    },
                    exponent: {
                      kind: "text",
                      text: "2",
                    },
                  },
                  {
                    kind: "text",
                    text: ")",
                  },
                ],
              },
              exponent: {
                kind: "text",
                text: "3",
              },
            },
            {
              kind: "text",
              text: "=?",
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "(5^2)^3=5^(2·3)=5^6=15625.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "power",
              base: {
                kind: "row",
                items: [
                  {
                    kind: "text",
                    text: "(",
                  },
                  {
                    kind: "power",
                    base: {
                      kind: "text",
                      text: "5",
                    },
                    exponent: {
                      kind: "text",
                      text: "2",
                    },
                  },
                  {
                    kind: "text",
                    text: ")",
                  },
                ],
              },
              exponent: {
                kind: "text",
                text: "3",
              },
            },
            {
              kind: "text",
              text: "=",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "5",
              },
              exponent: {
                kind: "text",
                text: "2·3",
              },
            },
            {
              kind: "text",
              text: "=",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "5",
              },
              exponent: {
                kind: "text",
                text: "6",
              },
            },
            {
              kind: "text",
              text: "=15625",
            },
          ],
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
      sourceContext:
        "İlk bozulan adım: (2^3)^4=2^7\nNeden yanlış?: Üssün üssünde çarpım gerekir.\nHedefli düzeltme: 3·4=12\nYeni sınama: (5^2)^3=?",
    },
    {
      id: "s013-p11-r03-original-024",
      lessonId: "tyt-mat-uslu-sayilar-kaynak-039",
      source: {
        shortLabel: "Üslü Sayılar · kaynak alıştırması",
        title: "Üslü Sayılar",
        pageLabel: "Kaynak PDF, fiziksel sayfa 11",
        itemLabel: "Hata onarımı 03",
      },
      prompt: "5^-2=?",
      options: [],
      answer: "1/25",
      steps: [
        "Negatif üs, taban sıfır değilken çarpmaya göre tersini aldırır: 5⁻²=1/5².",
        "5²=25, dolayısıyla 5⁻²=1/25. Pozitif 5 tabanının bu kuvveti negatife dönüşmez.",
        "Kontrol: 5⁻²·5²=1. 1/25 ile 25’in çarpımı 1’dir.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "5^-2=?",
        expression: {
          kind: "row",
          items: [
            {
              kind: "power",
              base: {
                kind: "text",
                text: "5",
              },
              exponent: {
                kind: "text",
                text: "−2",
              },
            },
            {
              kind: "text",
              text: "=?",
            },
          ],
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "5^-2=1/5^2=1/25.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "power",
              base: {
                kind: "text",
                text: "5",
              },
              exponent: {
                kind: "text",
                text: "−2",
              },
            },
            {
              kind: "text",
              text: "=",
            },
            {
              kind: "fraction",
              numerator: {
                kind: "text",
                text: "1",
              },
              denominator: {
                kind: "power",
                base: {
                  kind: "text",
                  text: "5",
                },
                exponent: {
                  kind: "text",
                  text: "2",
                },
              },
            },
            {
              kind: "text",
              text: "=",
            },
            {
              kind: "fraction",
              numerator: {
                kind: "text",
                text: "1",
              },
              denominator: {
                kind: "text",
                text: "25",
              },
            },
          ],
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
      sourceContext:
        "İlk bozulan adım: 2^-3=-8\nNeden yanlış?: Negatif üs işaret değil ters çevirme.\nHedefli düzeltme: 1/2^3\nYeni sınama: 5^-2=?",
    },
    {
      id: "s013-p11-r04-original-024",
      lessonId: "tyt-mat-uslu-sayilar-kaynak-039",
      source: {
        shortLabel: "Üslü Sayılar · kaynak alıştırması",
        title: "Üslü Sayılar",
        pageLabel: "Kaynak PDF, fiziksel sayfa 11",
        itemLabel: "Hata onarımı 04",
      },
      prompt: "0,0009=?",
      options: [],
      answer: "9×10^-4",
      steps: [
        "Kaynak tablosunun bağlamı, ondalık sayıyı bilimsel gösterime dönüştürmektir. 0,0009’da virgül 9’un hemen sağına dört basamak taşınır.",
        "Katsayı 9 ve 10 kuvveti −4 olur: 0,0009=9×10⁻⁴. 1≤9<10 olduğundan katsayı koşulu sağlanır.",
        "Geri aç: 9×(1/10000)=0,0009. −3 yazsaydın 0,009 olurdu; bir basamak farklı sayı elde edilirdi.",
      ],
      figure: {
        kind: "math",
        title: "Kaynak ifadenin okunabilir görünümü",
        alt: "0,0009=?",
        expression: {
          kind: "text",
          text: "0,0009=?",
        },
        caption:
          "Kaynağın matematik ifadesi okunabilir dizilimle yeniden kurulmuştur; asıl soru metni yukarıdadır.",
      },
      explanationFigure: {
        kind: "math",
        title: "Çözümün matematik görünümü",
        alt: "0,0009=9×10^-4=9/10000.",
        expression: {
          kind: "row",
          items: [
            {
              kind: "text",
              text: "0,0009=9×",
            },
            {
              kind: "power",
              base: {
                kind: "text",
                text: "10",
              },
              exponent: {
                kind: "text",
                text: "−4",
              },
            },
            {
              kind: "text",
              text: "=",
            },
            {
              kind: "fraction",
              numerator: {
                kind: "text",
                text: "9",
              },
              denominator: {
                kind: "text",
                text: "10000",
              },
            },
          ],
        },
        caption:
          "Uygulama için hazırlanmış çözüm görünümü; asıl kaynak sorusunun metni değiştirilmez.",
      },
      clarification:
        "Asıl kısa istem tablo bağlamıyla birlikte korunur. Beklenen biçim bilimsel gösterimdir; kaynak istemine yeni seçenek eklenmez.",
      sourceContext:
        "İlk bozulan adım: 0,006=6×10^-2\nNeden yanlış?: Geri açınca 0,06 olur.\nHedefli düzeltme: 6×10^-3\nYeni sınama: 0,0009=?",
    },
  ];
