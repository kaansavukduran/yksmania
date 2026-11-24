import { txt, type Question } from "../domain/model";
import type { SourceMathNode, SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const airBuoyancyQuestion = {
  id: "sivilarin-kaldirma-kuvveti-havada-balon",
  prompt: txt("Durgun havada serbest bırakılan K balonu ilk anda aşağı, L balonu yukarı yönlü ivmeleniyor. İkisine de yalnız ağırlık ve havanın kaldırması etki ediyor. Balonun ortalama yoğunluğu zarı ve içindeki gazı birlikte kapsıyor. K ve L’nin ortalama yoğunluğu, havanın yoğunluğuyla nasıl karşılaştırılır?"),
  options: [
    "K daha büyük, L daha küçük.", "K daha küçük, L daha büyük.",
    "K ve L ikisi de daha büyük.", "K ve L ikisi de daha küçük.", "K ve L ikisi de havayla eşit.",
  ].map(txt),
  answer: 0,
  hint: txt("Yukarı yönü pozitif seç. Net kuvveti kaldırma eksi ağırlık olarak yaz ve iki balonu ayrı düşün."),
  explanation: txt("Aşağı ilk ivme için K’nın ağırlığı kaldırmadan büyüktür. Yukarı ilk ivme için L’nin kaldırması ağırlığından büyüktür. Fark, hava yoğunluğu eksi balonun ortalama yoğunluğu ile hacim ve g’nin çarpımıdır. K havadan daha yoğun, L daha az yoğundur."),
  skill: "Havada ilk hareket ve ortalama yoğunluk",
  guidance: {
    knowledge: ["Durgun havada kaldırma yukarı, ağırlık aşağı yönlüdür. Havanın kaldırması ρₕₐᵥₐ · g · V, balonun ağırlığı ise kendi ortalama yoğunluğu · g · V ile bulunur."],
    strategy: "Net kuvvetin işaretini çizimde verilen ilk ivmeden oku. Hacim ile g pozitif olduğundan işareti yoğunluk farkı belirler.",
    steps: [
      "Yukarı pozitif. K’nın net kuvveti negatif, L’ninki pozitif.",
      "Kaldırma eksi ağırlık, (hava yoğunluğu − balonun ortalama yoğunluğu) × g × hacim olarak da yazılır.",
      "K için hava eksi balon yoğunluğu negatif olduğundan balon daha yoğundur. L için bu fark pozitif olduğundan balon daha az yoğundur.",
    ],
    optionReasons: [
      "K daha yoğun olduğunda ağırlığı kaldırmadan büyüktür. L daha az yoğun olduğunda kaldırma ağırlığını aşar.",
      "K için daha küçük yoğunluk yukarı, L için daha büyük yoğunluk aşağı ivme verirdi. İki gözlem de tersine dönerdi.",
      "İkisi daha yoğun olsaydı ağırlık ikisinde de kaldırmayı aşar ve L de aşağı ivmelenirdi.",
      "İkisi daha az yoğun olsaydı kaldırma ikisinin de ağırlığından büyük olur ve K da yukarı ivmelenirdi.",
      "Havayla eşit yoğunlukta ağırlık ve kaldırma dengelenir. Verilen iki zıt ilk ivme ortaya çıkmazdı.",
    ],
    commonError: "Balonun yoğunluğunda zarın kütlesini unutma. Hareket yönü yalnız kaldırmanın yönünden çıkarılamaz.",
    check: "K’da aşağı ağırlık üstün gelmeli, L’de yukarı kaldırma üstün gelmeli. Her iki yön seçtiğimiz yoğunluklarla uyuşuyor.",
  },
} satisfies Question;

const text = (value: string): SourceMathNode => ({ kind: "text", text: value });

export const airBuoyancyQuestionFigures = {
  figure: {
    kind: "geometry",
    title: "K ve L balonlarının ilk ivme yönleri",
    alt: "K ile L aynı yükseklikte çizilmiş. K’nın oku aşağı, L’nin oku yukarı. Alttaki yatay çizgi yeri gösterir.",
    caption: "Oklar ilk ivmenin yönünü gösterir.",
    viewBox: [0, -6, 352, 237],
    circles: [{ center: [105, 97], radius: 36 }, { center: [248, 97], radius: 36 }],
    segments: [
      { from: [27, 180], to: [325, 180] },
      { from: [48, 89], to: [48, 146], emphasis: true }, { from: [38, 135], to: [48, 146], emphasis: true }, { from: [58, 135], to: [48, 146], emphasis: true },
      { from: [307, 111], to: [307, 54], emphasis: true }, { from: [297, 65], to: [307, 54], emphasis: true }, { from: [317, 65], to: [307, 54], emphasis: true },
    ],
    labels: [{ at: [105, 110], text: "K" }, { at: [248, 110], text: "L" }, { at: [176, 216], text: "Yer" }],
  },
  hintFigure: {
    kind: "math",
    title: "Yukarı yönü pozitif seç",
    alt: "Net kuvvet, yukarı kaldırma eksi aşağı ağırlıktır.",
    expression: text("Fₙₑₜ = Fₖ − G"),
  },
  stepFigures: [
    { kind: "table", title: "İlk net kuvvetlerin işaretleri", alt: "K aşağı net kuvvetle ivmeleniyor, işareti eksi. L yukarı net kuvvetle ivmeleniyor, işareti artı.", headers: ["Balon", "İşaret"], rows: [["K", "−"], ["L", "+"]] },
    { kind: "math", title: "Kaldırma ve ağırlığın farkını aç", alt: "Hava yoğunluğu eksi ortalama balon yoğunluğu, g ve hacimle çarpılır.", expression: text("Fₙₑₜ = (ρₕₐᵥₐ − ρᵦₐₗₒₙ) · g · V") },
    { kind: "table", title: "İki balonun yoğunluğunu havayla karşılaştır", alt: "K havadan daha yoğun, L havadan daha az yoğun.", headers: ["Balon", "Havaya göre yoğunluk"], rows: [["K", "Daha büyük"], ["L", "Daha küçük"]] },
  ],
} satisfies { figure: SourceQuestionFigureSpec; hintFigure: SourceQuestionFigureSpec; stepFigures: readonly SourceQuestionFigureSpec[] };
