import { test, expect } from "@playwright/test";
import { appendFileSync } from "node:fs";
import { lessonGuides } from "../../src/learning/guides";
import { issueLine, openGuideDrawings, svgLayoutAudit } from "./helpers/svgAudit";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

/*
 * Lab layout gate (Forge052/054): on every guide page every visible lab or
 * explorer drawing (section figures have their own gate, 052) is audited at
 * 320, 375 and 1280 px with the shared clearance standard of
 * helpers/svgAudit.ts, in its default state and through its controls: every
 * option of every select, each radio, each slider at five points (two
 * coupled sliders as a 5 × 5 grid, for each select option), every button
 * once and step buttons to the end. The guides are split into groups so CI
 * shards share the load.
 */
type Issue = { name: string; kind: string; s: string; px: number; state: string };
const GUIDES = [...lessonGuides.keys()];
const GROUPS = 12;

/*
 * Known lab debt (Forge052): label clashes that the stricter standard found in
 * labs not yet redrawn, as "width<TAB>guide<TAB>kind<TAB>label". The gate
 * fails on every clash that is NOT listed here, so no lab may get worse and
 * new labs must be clean; fixing a lab only shortens this list. Each entry
 * is an open defect, not an accepted layout.
 */
const KNOWN = new Set(
  `
1280	15-17-yuzyil-felsefesi	kenar	1
1280	15-17-yuzyil-felsefesi	kenar	2
1280	18-19-yuzyil-felsefesi	kenar	1
1280	18-19-yuzyil-felsefesi	kenar	2
1280	acisal-momentum	yazı-çizgi	A
1280	acisal-momentum	yazı-çizgi	B
1280	acisal-momentum	yazı-çizgi	O
1280	ahlak-felsefesi	işaret	2
1280	ahlak-felsefesi	işaret	3
1280	ahlak-felsefesi	kenar	1
1280	ahlak-felsefesi	kenar	2
1280	ahlak-felsefesi	kenar	3
1280	alkanlar	yazı-yazı	C × C
1280	alternatif-akim	yazı-çizgi	i (A)
1280	asit-baz-metaller	yazı-çizgi	0,6
1280	atomun-temel-tanecikleri	kenar	Ortalama: 23,985 u
1280	atomun-temel-tanecikleri	kenar	Ortalama: 24,485 u
1280	atomun-temel-tanecikleri	kenar	Ortalama: 24,984 u
1280	atomun-temel-tanecikleri	kenar	Ortalama: 25,484 u
1280	atomun-temel-tanecikleri	kenar	Ortalama: 25,983 u
1280	atomun-temel-tanecikleri	yazı-çizgi	p=1 · n=13 · A=14
1280	atomun-temel-tanecikleri	yazı-çizgi	p=12 · n=0 · A=12
1280	atomun-temel-tanecikleri	yazı-çizgi	p=12 · n=13 · A=25
1280	atomun-temel-tanecikleri	yazı-çizgi	p=12 · n=25 · A=37
1280	atomun-temel-tanecikleri	yazı-çizgi	p=12 · n=38 · A=50
1280	atomun-temel-tanecikleri	yazı-çizgi	p=12 · n=50 · A=62
1280	atomun-temel-tanecikleri	yazı-çizgi	p=16 · n=13 · A=29
1280	atomun-temel-tanecikleri	yazı-çizgi	p=23 · n=13 · A=36
1280	atomun-temel-tanecikleri	yazı-çizgi	p=30 · n=13 · A=43
1280	atomun-temel-tanecikleri	yazı-çizgi	p=8 · n=13 · A=21
1280	ayt-enerji-hareket	kenar	20,59
1280	ayt-entalpi-bag-hess	yazı-çizgi	CO
1280	ayt-esterler	yazı-çizgi	CH
1280	ayt-esterler	yazı-çizgi	CH₂
1280	ayt-fonksiyonlar	işaret	O
1280	ayt-ikinci-dereceden-denklemler	işaret	T
1280	ayt-ikinci-dereceden-denklemler	yazı-çizgi	-6
1280	ayt-ikinci-dereceden-denklemler	yazı-çizgi	1/T
1280	ayt-ikinci-dereceden-denklemler	yazı-çizgi	2
1280	ayt-ikinci-dereceden-denklemler	yazı-çizgi	6
1280	ayt-ikinci-dereceden-denklemler	yazı-çizgi	T
1280	ayt-iletim-doku	yazı-çizgi	0 mg
1280	ayt-iletim-doku	yazı-çizgi	12 mg
1280	ayt-iletim-doku	yazı-çizgi	13,33 mg
1280	ayt-iletim-doku	yazı-çizgi	16 mg
1280	ayt-iletim-doku	yazı-çizgi	2,67 mg
1280	ayt-iletim-doku	yazı-çizgi	20 mg
1280	ayt-iletim-doku	yazı-çizgi	21,33 mg
1280	ayt-iletim-doku	yazı-çizgi	24 mg
1280	ayt-iletim-doku	yazı-çizgi	32 mg
1280	ayt-iletim-doku	yazı-çizgi	4,8 mg
1280	ayt-iletim-doku	yazı-çizgi	40 mg
1280	ayt-iletim-doku	yazı-çizgi	6 mg
1280	ayt-iletim-doku	yazı-çizgi	8 mg
1280	ayt-karmasik-sayilar	yazı-çizgi	-10
1280	ayt-karmasik-sayilar	yazı-çizgi	-11
1280	ayt-karmasik-sayilar	yazı-çizgi	-12
1280	ayt-karmasik-sayilar	yazı-çizgi	-13
1280	ayt-karmasik-sayilar	yazı-çizgi	-15
1280	ayt-karmasik-sayilar	yazı-çizgi	-17
1280	ayt-karmasik-sayilar	yazı-çizgi	-19
1280	ayt-karmasik-sayilar	yazı-çizgi	-4
1280	ayt-karmasik-sayilar	yazı-çizgi	-6
1280	ayt-karmasik-sayilar	yazı-çizgi	-7
1280	ayt-karmasik-sayilar	yazı-çizgi	-8
1280	ayt-karmasik-sayilar	yazı-çizgi	10
1280	ayt-karmasik-sayilar	yazı-çizgi	11
1280	ayt-karmasik-sayilar	yazı-çizgi	12
1280	ayt-karmasik-sayilar	yazı-çizgi	13
1280	ayt-karmasik-sayilar	yazı-çizgi	15
1280	ayt-karmasik-sayilar	yazı-çizgi	17
1280	ayt-karmasik-sayilar	yazı-çizgi	19
1280	ayt-karmasik-sayilar	yazı-çizgi	4
1280	ayt-karmasik-sayilar	yazı-çizgi	6
1280	ayt-karmasik-sayilar	yazı-çizgi	7
1280	ayt-karmasik-sayilar	yazı-çizgi	8
1280	ayt-karmasik-sayilar	yazı-çizgi	s
1280	ayt-karmasik-sayilar	yazı-çizgi	w
1280	ayt-karmasik-sayilar	yazı-çizgi	w/s
1280	ayt-karmasik-sayilar	yazı-çizgi	z
1280	ayt-kuantum-sayilari	yazı-çizgi	İzinli orbital yok
1280	ayt-limit-sureklilik	yazı-çizgi	-4
1280	ayt-parabol	işaret	2
1280	ayt-parabol	işaret	P/H
1280	ayt-parabol	işaret	T/P/H
1280	ayt-parabol	yazı-çizgi	-8
1280	ayt-parabol	yazı-çizgi	1
1280	ayt-parabol	yazı-çizgi	2
1280	ayt-parabol	yazı-çizgi	8
1280	ayt-parabol	yazı-çizgi	H
1280	ayt-parabol	yazı-çizgi	P/H
1280	ayt-parabol	yazı-çizgi	T
1280	ayt-parabol	yazı-çizgi	T/1
1280	ayt-parabol	yazı-çizgi	T/1/2
1280	ayt-parabol	yazı-çizgi	T/2
1280	ayt-parabol	yazı-çizgi	T/P
1280	ayt-parabol	yazı-çizgi	T/P/H
1280	ayt-tepkime-hizi	kenar	0
1280	ayt-tepkime-hizi	kenar	30
1280	ayt-tepkime-hizi	kenar	60
1280	ayt-trigonometri	işaret	A/C
1280	ayt-trigonometri	yazı-çizgi	-1,5
1280	ayt-trigonometri	yazı-çizgi	-10
1280	ayt-trigonometri	yazı-çizgi	-8
1280	ayt-trigonometri	yazı-çizgi	1,5
1280	ayt-trigonometri	yazı-çizgi	10
1280	ayt-trigonometri	yazı-çizgi	2
1280	ayt-trigonometri	yazı-çizgi	8
1280	ayt-trigonometri	yazı-çizgi	A
1280	ayt-trigonometri	yazı-çizgi	A/B
1280	ayt-trigonometri	yazı-çizgi	A/C
1280	ayt-trigonometri	yazı-çizgi	C
1280	ayt-trigonometri	yazı-çizgi	P
1280	bagil-hareket	yazı-çizgi	A
1280	bagil-hareket	yazı-çizgi	B
1280	basinc	yazı-çizgi	0 N
1280	basinc	yazı-çizgi	150 N
1280	basinc	yazı-çizgi	225 N
1280	basinc	yazı-çizgi	300 N
1280	basinc	yazı-çizgi	60 N
1280	basinc	yazı-çizgi	75 N
1280	basinc	yazı-çizgi	h=0 cm
1280	basinc	yazı-çizgi	h=100 cm
1280	basinc	yazı-çizgi	h=25 cm
1280	basinc	yazı-çizgi	h=40 cm
1280	basinc	yazı-çizgi	h=50 cm
1280	basinc	yazı-çizgi	h=75 cm
1280	bilimsel-gosterim-katsayi	yazı-çizgi	0 için logaritmik nokta yok
1280	bilimsel-yontem	kenar	12
1280	bitki-kok-anatomisi	yazı-çizgi	Bölünme
1280	bitki-kok-anatomisi	yazı-çizgi	Kaliptra
1280	bitki-kok-anatomisi	yazı-çizgi	Olgun bölge
1280	bitki-kok-anatomisi	yazı-çizgi	Uzama
1280	buyuk-iklim-tipleri	yazı-çizgi	30°K
1280	buyuk-iklim-tipleri	yazı-çizgi	60°K
1280	canlilar-ve-cevre	kenar	K1
1280	canlilar-ve-cevre	kenar	K2
1280	canlilar-ve-cevre	kenar	K3
1280	canlilar-ve-cevre	kenar	K4
1280	canlilar-ve-cevre	kenar	K5
1280	canlilar-ve-cevre	yazı-çizgi	100
1280	cografya-sicaklik	yazı-çizgi	0
1280	cografya-sicaklik	yazı-çizgi	1000
1280	din-ve-hayat	kenar	1
1280	din-ve-hayat	kenar	2
1280	dogrusal-hareket	yazı-yazı	-1 × 0
1280	dogrusal-hareket	yazı-yazı	-10 × 0
1280	dogrusal-hareket	yazı-yazı	-3 × 0
1280	dogrusal-hareket	yazı-yazı	-6 × 0
1280	dogrusal-hareket	yazı-yazı	-7 × 0
1280	dogrusal-hareket	yazı-yazı	-8 × 0
1280	dogrusal-hareket	yazı-yazı	0 × 10
1280	dogrusal-hareket	yazı-yazı	0 × 13
1280	dogrusal-hareket	yazı-yazı	0 × 3
1280	dogrusal-hareket	yazı-yazı	0 × 5
1280	dogrusal-hareket	yazı-yazı	0 × 8
1280	donusum-yansima-simetri	işaret	O
1280	doppler-etkisi	yazı-çizgi	K
1280	dunya-gucu-osmanli	işaret	4
1280	dunya-gucu-osmanli	işaret	5
1280	dunya-gucu-osmanli	kenar	1
1280	dunya-gucu-osmanli	kenar	3
1280	dunya-gucu-osmanli	kenar	5
1280	dunya-gucu-osmanli	yazı-yazı	6 × 7
1280	dunya-gucu-osmanli	yazı-çizgi	6
1280	dunya-nufus-dagilisi	kenar	−40°
1280	dunya-nufus-dagilisi	yazı-çizgi	0°
1280	dunya-nufus-dagilisi	yazı-çizgi	120°
1280	dunya-nufus-dagilisi	yazı-çizgi	1: %25
1280	dunya-nufus-dagilisi	yazı-çizgi	2: %25
1280	dunya-nufus-dagilisi	yazı-çizgi	3: %25
1280	dunya-nufus-dagilisi	yazı-çizgi	4: %25
1280	dunya-nufus-dagilisi	yazı-çizgi	60°
1280	dunya-nufus-dagilisi	yazı-çizgi	A
1280	dunya-nufus-dagilisi	yazı-çizgi	B
1280	dunya-nufus-dagilisi	yazı-çizgi	C
1280	dunya-nufus-dagilisi	yazı-çizgi	D
1280	dunya-nufus-dagilisi	yazı-çizgi	E
1280	dunya-nufus-dagilisi	yazı-çizgi	F
1280	dunya-nufus-dagilisi	yazı-çizgi	G
1280	dunya-nufus-dagilisi	yazı-çizgi	H
1280	dunya-nufus-dagilisi	yazı-çizgi	−120°
1280	dunya-nufus-dagilisi	yazı-çizgi	−40°
1280	dunya-nufus-dagilisi	yazı-çizgi	−60°
1280	dunya-turkiye-gocler	yazı-çizgi	Y
1280	duyu-organlari-deri	yazı-çizgi	Deri altı
1280	duyu-organlari-dil-burun	yazı-çizgi	İlk korteks
1280	duyu-organlari-kulak	yazı-çizgi	Oval pencere
1280	duzgun-alan-paralel-levhalar	yazı-yazı	0 × 0,1 m
1280	egik-atis	yazı-çizgi	0
1280	elektrik-akimi	yazı-çizgi	24 V
1280	elektrik-alan	yazı-çizgi	q = -1
1280	elektrik-alan	yazı-çizgi	q = 0
1280	elektrik-alan	yazı-çizgi	q = 1
1280	elektroliz	yazı-çizgi	+
1280	elektroliz	yazı-çizgi	−
1280	elektromanyetik-induksiyon	yazı-çizgi	+z: dışarı (•)
1280	elektromanyetik-induksiyon	yazı-çizgi	Kapalı yol
1280	elektromanyetik-induksiyon	yazı-çizgi	x (m)
1280	elektromanyetik-induksiyon	yazı-çizgi	−z: içeri (×)
1280	endokrin-pankreas	yazı-çizgi	12
1280	endokrin-pankreas	yazı-çizgi	13
1280	endokrin-pankreas	yazı-çizgi	15
1280	endokrin-pankreas	yazı-çizgi	16
1280	endokrin-pankreas	yazı-çizgi	17
1280	endokrin-pankreas	yazı-çizgi	33
1280	endokrin-pankreas	yazı-çizgi	35
1280	endokrin-pankreas	yazı-çizgi	53
1280	endokrin-pankreas	yazı-çizgi	55
1280	endokrin-tiroit	yazı-çizgi	−
1280	enerji-ve-hareket	yazı-çizgi	Son x: -0,25 m
1280	enerji-ve-hareket	yazı-çizgi	Son x: -0,5 m
1280	enerji-ve-hareket	yazı-çizgi	Son x: 0 m
1280	enerji-ve-hareket	yazı-çizgi	Son x: 0,2 m
1280	enerji-ve-hareket	yazı-çizgi	Son x: 0,25 m
1280	enerji-ve-hareket	yazı-çizgi	Son x: 0,5 m
1280	felsefeyi-tanima	işaret	1
1280	felsefeyi-tanima	işaret	2
1280	felsefeyi-tanima	kenar	1
1280	felsefeyi-tanima	kenar	5
1280	fiziksel-kimyasal-degisimler	yazı-çizgi	H
1280	fiziksel-kimyasal-degisimler	yazı-çizgi	O
1280	gonul-cografyamiz	kenar	1
1280	gonul-cografyamiz	kenar	2
1280	hibritlesme	yazı-yazı	C × C
1280	hibritlesme	yazı-yazı	C × H
1280	hibritlesme	yazı-yazı	H × C
1280	hibritlesme	yazı-yazı	H × H
1280	hibritlesme	yazı-çizgi	C
1280	hibritlesme	yazı-çizgi	H
1280	hidrojen-bagi	yazı-çizgi	H
1280	hz-muhammed-ve-gencler	kenar	1
1280	hz-muhammed-ve-gencler	kenar	2
1280	hz-muhammed-ve-gencler	kenar	3
1280	hz-muhammed-ve-gencler	yazı-yazı	1 × 2
1280	ic-kuvvetler	yazı-çizgi	Oluk
1280	ilk-cag-felsefesi	kenar	1
1280	ilk-cag-felsefesi	kenar	2
1280	islam-medeniyetinin-dogusu	işaret	1
1280	islam-medeniyetinin-dogusu	işaret	4
1280	islam-medeniyetinin-dogusu	işaret	5
1280	islam-medeniyetinin-dogusu	işaret	6
1280	islam-medeniyetinin-dogusu	kenar	1
1280	islam-medeniyetinin-dogusu	kenar	2
1280	islam-medeniyetinin-dogusu	kenar	3
1280	islam-medeniyetinin-dogusu	kenar	5
1280	islam-medeniyetinin-dogusu	kenar	7
1280	islam-medeniyetinin-dogusu	yazı-yazı	1 × 5
1280	islam-medeniyetinin-dogusu	yazı-yazı	3 × 4
1280	islam-ve-bilim	kenar	1
1280	islam-ve-bilim	kenar	2
1280	islam-ve-bilim	kenar	3
1280	izotop-izoton-izobar	kenar	Ortalama: 23,985 u
1280	izotop-izoton-izobar	kenar	Ortalama: 24,485 u
1280	izotop-izoton-izobar	kenar	Ortalama: 24,984 u
1280	izotop-izoton-izobar	kenar	Ortalama: 25,484 u
1280	izotop-izoton-izobar	kenar	Ortalama: 25,983 u
1280	izotop-izoton-izobar	yazı-çizgi	p=1 · n=13 · A=14
1280	izotop-izoton-izobar	yazı-çizgi	p=12 · n=0 · A=12
1280	izotop-izoton-izobar	yazı-çizgi	p=12 · n=13 · A=25
1280	izotop-izoton-izobar	yazı-çizgi	p=12 · n=25 · A=37
1280	izotop-izoton-izobar	yazı-çizgi	p=12 · n=38 · A=50
1280	izotop-izoton-izobar	yazı-çizgi	p=12 · n=50 · A=62
1280	izotop-izoton-izobar	yazı-çizgi	p=16 · n=13 · A=29
1280	izotop-izoton-izobar	yazı-çizgi	p=23 · n=13 · A=36
1280	izotop-izoton-izobar	yazı-çizgi	p=30 · n=13 · A=43
1280	izotop-izoton-izobar	yazı-çizgi	p=8 · n=13 · A=21
1280	kalitim-molekulu-kesfi	yazı-çizgi	S
1280	karstik-sekiller	yazı-çizgi	Çökme
1280	kepler-yasalari	kenar	1
1280	kepler-yasalari	kenar	2
1280	kimyasal-denge	kenar	Zaman (s)
1280	kimyasal-turler-lewis	yazı-çizgi	Cl
1280	kimyasal-turler-lewis	yazı-çizgi	N
1280	kimyasal-turler-lewis	yazı-çizgi	Na
1280	korozyon-katodik-koruma	yazı-çizgi	Metal
1280	korozyon-katodik-koruma	yazı-çizgi	Yapı
1280	kovalent-adlandirma-metalik-bag	işaret	+
1280	kovalent-adlandirma-metalik-bag	yazı-çizgi	Cl
1280	kovalent-adlandirma-metalik-bag	yazı-çizgi	F
1280	kovalent-adlandirma-metalik-bag	yazı-çizgi	O
1280	kumeler	yazı-çizgi	1
1280	kumeler	yazı-çizgi	2
1280	kumeler	yazı-çizgi	3
1280	kumeler	yazı-çizgi	4
1280	kumeler	yazı-çizgi	5
1280	kumeler	yazı-çizgi	6
1280	kumeler	yazı-çizgi	7
1280	kumeler	yazı-çizgi	8
1280	kutle-agirlik-merkezi	yazı-çizgi	15
1280	kutle-agirlik-merkezi	yazı-çizgi	16
1280	manyetik-alan-ayt	yazı-çizgi	0
1280	manyetik-alan-ayt	yazı-çizgi	×
1280	manyetik-alan-ayt	yazı-çizgi	•
1280	mercekler	yazı-çizgi	Görüntü
1280	miknatislar-ve-manyetik-alan	işaret	P · pusula
1280	miknatislar-ve-manyetik-alan	yazı-çizgi	P · pusula
1280	milli-mucadele	işaret	3
1280	milli-mucadele	işaret	4
1280	milli-mucadele	kenar	1
1280	milli-mucadele	kenar	3
1280	milli-mucadele	kenar	4
1280	milli-mucadele	yazı-yazı	3 × 4
1280	milli-mucadele	yazı-çizgi	3
1280	molekul-geometrisi	işaret	N
1280	molekul-geometrisi	yazı-yazı	B × F
1280	molekul-geometrisi	yazı-yazı	H × H
1280	molekul-geometrisi	yazı-çizgi	Net var
1280	mutlak-deger	yazı-çizgi	-2
1280	mutlak-deger	yazı-çizgi	-4
1280	mutlak-deger	yazı-çizgi	0
1280	mutlak-deger	yazı-çizgi	2
1280	mutlak-deger	yazı-çizgi	4
1280	nefron-isleyisi	yazı-çizgi	1
1280	nefron-isleyisi	yazı-çizgi	2
1280	nehir-problemleri	yazı-çizgi	Karşı kıyı
1280	newton-genel-cekim-yasasi	yazı-çizgi	P
1280	nukleik-asitler	yazı-çizgi	1′
1280	nukleik-asitler	yazı-çizgi	O
1280	oran-oranti	yazı-çizgi	108
1280	oran-oranti	yazı-çizgi	114
1280	oran-oranti	yazı-çizgi	144
1280	oran-oranti	yazı-çizgi	150
1280	ruzgar-ve-buzul	yazı-çizgi	Akarsu ile boylanma
1280	selcuklu-yerlesme-devletlesme	kenar	1
1280	selcuklu-yerlesme-devletlesme	kenar	2
1280	sindirim-mide	yazı-çizgi	HCl
1280	sinir-sistemi-aksiyon-potansiyeli	yazı-çizgi	−70
1280	siyaset-felsefesi	kenar	1
1280	siyaset-felsefesi	kenar	2
1280	solunum-gaz-tasinmasi	yazı-çizgi	HCO₃⁻
1280	solunum-oksijenli-bilanco	yazı-çizgi	ETS
1280	solunum-oksijensiz-alicilar	yazı-çizgi	ETS
1280	solunum-organlar	yazı-çizgi	Duvar
1280	su-dalgalarinda-girisim	yazı-çizgi	30
1280	su-dalgalarinda-girisim	yazı-çizgi	P
1280	tork-denge	yazı-çizgi	O
1280	turev-teget	yazı-yazı	1 × B
1280	turev-teget	yazı-çizgi	-1
1280	turev-teget	yazı-çizgi	-1,25
1280	turev-teget	yazı-çizgi	-2
1280	turev-teget	yazı-çizgi	-2,25
1280	turev-teget	yazı-çizgi	-3,25
1280	turev-teget	yazı-çizgi	1
1280	turev-teget	yazı-çizgi	2,25
1280	turev-teget	yazı-çizgi	3,25
1280	turev-teget	yazı-çizgi	B
1280	turev-teget	yazı-çizgi	y = -0,75
1280	turev-teget	yazı-çizgi	y = -1,75
1280	turev-teget	yazı-çizgi	y = 0,25
1280	turev-teget	yazı-çizgi	y = 2,25
1280	turev-teget	yazı-çizgi	y = 3,25
1280	turev-teget	yazı-çizgi	y = 4,25
1280	turev-teget	yazı-çizgi	y = 5,25
1280	turev-teget	yazı-çizgi	y = 6,25
1280	turkiye-bitkileri	yazı-çizgi	Özgün kesit
1280	turkiye-ic-kuvvetler	yazı-çizgi	Graben
1280	turkiye-ic-kuvvetler	yazı-çizgi	Kesit · tabakalar bükülür
1280	turkiye-iklimi	yazı-çizgi	1500
1280	turkiye-iklimi	yazı-çizgi	3000
1280	tyt-geo-dik-prizmalar-032	yazı-çizgi	h
1280	tyt-geo-paralelkenar-ozel-dortgenler-032	yazı-çizgi	h
1280	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	B
1280	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	C
1280	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	G
1280	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	I
1280	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	O
1280	tyt-geo-ucgende-acilar-031	yazı-çizgi	C
1280	ureme-embriyonik-gelisim	yazı-çizgi	Boşluk
1280	varlik-felsefesi	kenar	1
1280	varlik-felsefesi	kenar	2
1280	yatay-atis	yazı-çizgi	0
1280	zayif-etkilesimler	yazı-çizgi	δ+
1280	zayif-etkilesimler	yazı-çizgi	δ−
320	15-17-yuzyil-felsefesi	kenar	1
320	15-17-yuzyil-felsefesi	kenar	2
320	18-19-yuzyil-felsefesi	kenar	1
320	18-19-yuzyil-felsefesi	kenar	2
320	acisal-momentum	yazı-çizgi	A
320	acisal-momentum	yazı-çizgi	B
320	acisal-momentum	yazı-çizgi	O
320	ahlak-felsefesi	işaret	2
320	ahlak-felsefesi	işaret	3
320	ahlak-felsefesi	kenar	1
320	ahlak-felsefesi	kenar	2
320	ahlak-felsefesi	kenar	3
320	alkanlar	yazı-yazı	C × C
320	alkanlar	yazı-çizgi	C
320	alternatif-akim	yazı-çizgi	i (A)
320	asit-baz-metaller	yazı-çizgi	0,6
320	atmosfer-katmanlari	kenar	700
320	atomun-temel-tanecikleri	kenar	Ortalama: 23,985 u
320	atomun-temel-tanecikleri	kenar	Ortalama: 24,485 u
320	atomun-temel-tanecikleri	kenar	Ortalama: 24,984 u
320	atomun-temel-tanecikleri	kenar	Ortalama: 25,484 u
320	atomun-temel-tanecikleri	kenar	Ortalama: 25,983 u
320	atomun-temel-tanecikleri	kenar	Z
320	atomun-temel-tanecikleri	yazı-çizgi	p=1 · n=13 · A=14
320	atomun-temel-tanecikleri	yazı-çizgi	p=12 · n=0 · A=12
320	atomun-temel-tanecikleri	yazı-çizgi	p=12 · n=13 · A=25
320	atomun-temel-tanecikleri	yazı-çizgi	p=12 · n=25 · A=37
320	atomun-temel-tanecikleri	yazı-çizgi	p=12 · n=38 · A=50
320	atomun-temel-tanecikleri	yazı-çizgi	p=12 · n=50 · A=62
320	atomun-temel-tanecikleri	yazı-çizgi	p=16 · n=13 · A=29
320	atomun-temel-tanecikleri	yazı-çizgi	p=23 · n=13 · A=36
320	atomun-temel-tanecikleri	yazı-çizgi	p=30 · n=13 · A=43
320	atomun-temel-tanecikleri	yazı-çizgi	p=8 · n=13 · A=21
320	ayt-denge-basinc-hacim	kenar	A
320	ayt-denge-basinc-hacim	kenar	AB
320	ayt-denge-basinc-hacim	kenar	B
320	ayt-denge-hesaplari	kenar	0
320	ayt-denge-hesaplari	kenar	3
320	ayt-denge-hesaplari	kenar	6
320	ayt-enerji-hareket	kenar	20,59
320	ayt-entalpi-bag-hess	yazı-çizgi	CO
320	ayt-esterler	yazı-çizgi	CH
320	ayt-esterler	yazı-çizgi	CH₂
320	ayt-fonksiyonlar	kenar	A
320	ayt-fonksiyonlar	kenar	B
320	ayt-fonksiyonlar	yazı-yazı	-8 × -8
320	ayt-fonksiyonlar	yazı-çizgi	-8
320	ayt-fonksiyonlar	yazı-çizgi	8
320	ayt-ikinci-dereceden-denklemler	yazı-çizgi	-6
320	ayt-ikinci-dereceden-denklemler	yazı-çizgi	1
320	ayt-ikinci-dereceden-denklemler	yazı-çizgi	1/T
320	ayt-ikinci-dereceden-denklemler	yazı-çizgi	2
320	ayt-ikinci-dereceden-denklemler	yazı-çizgi	6
320	ayt-ikinci-dereceden-denklemler	yazı-çizgi	T
320	ayt-ikinci-dereceden-denklemler	yazı-çizgi	y
320	ayt-iletim-doku	yazı-çizgi	0 mg
320	ayt-iletim-doku	yazı-çizgi	12 mg
320	ayt-iletim-doku	yazı-çizgi	13,33 mg
320	ayt-iletim-doku	yazı-çizgi	16 mg
320	ayt-iletim-doku	yazı-çizgi	2,67 mg
320	ayt-iletim-doku	yazı-çizgi	20 mg
320	ayt-iletim-doku	yazı-çizgi	21,33 mg
320	ayt-iletim-doku	yazı-çizgi	24 mg
320	ayt-iletim-doku	yazı-çizgi	32 mg
320	ayt-iletim-doku	yazı-çizgi	4,8 mg
320	ayt-iletim-doku	yazı-çizgi	40 mg
320	ayt-iletim-doku	yazı-çizgi	6 mg
320	ayt-iletim-doku	yazı-çizgi	8 mg
320	ayt-karmasik-sayilar	işaret	s
320	ayt-karmasik-sayilar	işaret	z/w
320	ayt-karmasik-sayilar	yazı-yazı	4 × w/s
320	ayt-karmasik-sayilar	yazı-yazı	w × s
320	ayt-karmasik-sayilar	yazı-çizgi	-10
320	ayt-karmasik-sayilar	yazı-çizgi	-11
320	ayt-karmasik-sayilar	yazı-çizgi	-12
320	ayt-karmasik-sayilar	yazı-çizgi	-13
320	ayt-karmasik-sayilar	yazı-çizgi	-15
320	ayt-karmasik-sayilar	yazı-çizgi	-17
320	ayt-karmasik-sayilar	yazı-çizgi	-19
320	ayt-karmasik-sayilar	yazı-çizgi	-4
320	ayt-karmasik-sayilar	yazı-çizgi	-6
320	ayt-karmasik-sayilar	yazı-çizgi	-7
320	ayt-karmasik-sayilar	yazı-çizgi	-8
320	ayt-karmasik-sayilar	yazı-çizgi	10
320	ayt-karmasik-sayilar	yazı-çizgi	11
320	ayt-karmasik-sayilar	yazı-çizgi	12
320	ayt-karmasik-sayilar	yazı-çizgi	13
320	ayt-karmasik-sayilar	yazı-çizgi	15
320	ayt-karmasik-sayilar	yazı-çizgi	17
320	ayt-karmasik-sayilar	yazı-çizgi	19
320	ayt-karmasik-sayilar	yazı-çizgi	4
320	ayt-karmasik-sayilar	yazı-çizgi	6
320	ayt-karmasik-sayilar	yazı-çizgi	7
320	ayt-karmasik-sayilar	yazı-çizgi	8
320	ayt-karmasik-sayilar	yazı-çizgi	s
320	ayt-karmasik-sayilar	yazı-çizgi	w
320	ayt-karmasik-sayilar	yazı-çizgi	w/s
320	ayt-karmasik-sayilar	yazı-çizgi	z
320	ayt-karmasik-sayilar	yazı-çizgi	z/s
320	ayt-karmasik-sayilar	yazı-çizgi	z/w
320	ayt-kodon-antikodon	kenar	Arg
320	ayt-kodon-antikodon	kenar	Gln
320	ayt-kodon-antikodon	kenar	Leu
320	ayt-kodon-antikodon	kenar	Met
320	ayt-kodon-antikodon	kenar	Pro
320	ayt-kodon-antikodon	kenar	Val
320	ayt-kuantum-sayilari	yazı-çizgi	İzinli orbital yok
320	ayt-limit-sureklilik	yazı-çizgi	-4
320	ayt-newton-hareket-yasalari	kenar	+x
320	ayt-parabol	işaret	-8
320	ayt-parabol	işaret	T/P/H
320	ayt-parabol	yazı-yazı	T × 2
320	ayt-parabol	yazı-çizgi	-8
320	ayt-parabol	yazı-çizgi	1
320	ayt-parabol	yazı-çizgi	2
320	ayt-parabol	yazı-çizgi	8
320	ayt-parabol	yazı-çizgi	H
320	ayt-parabol	yazı-çizgi	P/H
320	ayt-parabol	yazı-çizgi	T
320	ayt-parabol	yazı-çizgi	T/1
320	ayt-parabol	yazı-çizgi	T/1/2
320	ayt-parabol	yazı-çizgi	T/2
320	ayt-parabol	yazı-çizgi	T/P
320	ayt-parabol	yazı-çizgi	T/P/H
320	ayt-polinomlar	yazı-yazı	-8 × -8
320	ayt-polinomlar	yazı-çizgi	-5
320	ayt-polinomlar	yazı-çizgi	-8
320	ayt-polinomlar	yazı-çizgi	5
320	ayt-polinomlar	yazı-çizgi	8
320	ayt-tepkime-hizi	kenar	0
320	ayt-tepkime-hizi	kenar	30
320	ayt-tepkime-hizi	kenar	60
320	ayt-titrasyon	kenar	14
320	ayt-trigonometri	işaret	A/C
320	ayt-trigonometri	yazı-çizgi	-1,5
320	ayt-trigonometri	yazı-çizgi	-10
320	ayt-trigonometri	yazı-çizgi	-8
320	ayt-trigonometri	yazı-çizgi	1
320	ayt-trigonometri	yazı-çizgi	1,5
320	ayt-trigonometri	yazı-çizgi	10
320	ayt-trigonometri	yazı-çizgi	2
320	ayt-trigonometri	yazı-çizgi	8
320	ayt-trigonometri	yazı-çizgi	A
320	ayt-trigonometri	yazı-çizgi	A/B
320	ayt-trigonometri	yazı-çizgi	A/C
320	ayt-trigonometri	yazı-çizgi	C
320	ayt-trigonometri	yazı-çizgi	P
320	ayt-zayif-asit-baz-tampon	kenar	pH 2,851
320	ayt-zayif-asit-baz-tampon	kenar	pH 3,002
320	ayt-zayif-asit-baz-tampon	kenar	pH 4,523
320	ayt-zayif-asit-baz-tampon	kenar	pH 4,699
320	ayt-zayif-asit-baz-tampon	kenar	pH 4,824
320	ayt-zayif-asit-baz-tampon	kenar	pH 4,959
320	ayt-zayif-asit-baz-tampon	kenar	pH 5
320	ayt-zayif-asit-baz-tampon	kenar	pH 5,176
320	ayt-zayif-asit-baz-tampon	kenar	pH 5,222
320	ayt-zayif-asit-baz-tampon	kenar	pH 5,301
320	ayt-zayif-asit-baz-tampon	kenar	pH 5,477
320	ayt-zayif-asit-baz-tampon	kenar	pH 6
320	ayt-zayif-asit-baz-tampon	kenar	pH 9,151
320	bagil-hareket	yazı-yazı	0 × A
320	bagil-hareket	yazı-çizgi	A
320	bagil-hareket	yazı-çizgi	B
320	basinc	yazı-çizgi	0 N
320	basinc	yazı-çizgi	150 N
320	basinc	yazı-çizgi	225 N
320	basinc	yazı-çizgi	300 N
320	basinc	yazı-çizgi	60 N
320	basinc	yazı-çizgi	75 N
320	basinc	yazı-çizgi	h=0 cm
320	basinc	yazı-çizgi	h=100 cm
320	basinc	yazı-çizgi	h=25 cm
320	basinc	yazı-çizgi	h=40 cm
320	basinc	yazı-çizgi	h=50 cm
320	basinc	yazı-çizgi	h=75 cm
320	bilimsel-gosterim-katsayi	yazı-çizgi	0 için logaritmik nokta yok
320	bilimsel-yontem	kenar	12
320	bitki-kok-anatomisi	kenar	Epidermis
320	bitki-kok-anatomisi	yazı-çizgi	Bölünme
320	bitki-kok-anatomisi	yazı-çizgi	Kaliptra
320	bitki-kok-anatomisi	yazı-çizgi	Olgun bölge
320	bitki-kok-anatomisi	yazı-çizgi	Uzama
320	bitki-tozlasma	kenar	A
320	bitki-tozlasma	kenar	B
320	buyuk-iklim-tipleri	kenar	-20
320	buyuk-iklim-tipleri	kenar	-40
320	buyuk-iklim-tipleri	kenar	Ay sırası: 1–12
320	buyuk-iklim-tipleri	yazı-çizgi	30°K
320	buyuk-iklim-tipleri	yazı-çizgi	60°K
320	canlilar-ve-cevre	kenar	K1
320	canlilar-ve-cevre	kenar	K2
320	canlilar-ve-cevre	kenar	K3
320	canlilar-ve-cevre	kenar	K4
320	canlilar-ve-cevre	kenar	K5
320	canlilar-ve-cevre	yazı-çizgi	100
320	cemberin-analitigi	işaret	O
320	cemberin-analitigi	kenar	-10
320	cemberin-analitigi	yazı-yazı	-10 × -10
320	cemberin-analitigi	yazı-yazı	-6 × -6
320	cemberin-analitigi	yazı-yazı	-8 × -8
320	cemberin-analitigi	yazı-çizgi	-10
320	cemberin-analitigi	yazı-çizgi	-5
320	cemberin-analitigi	yazı-çizgi	-6
320	cemberin-analitigi	yazı-çizgi	-8
320	cemberin-analitigi	yazı-çizgi	10
320	cemberin-analitigi	yazı-çizgi	5
320	cemberin-analitigi	yazı-çizgi	6
320	cemberin-analitigi	yazı-çizgi	8
320	cografya-sicaklik	yazı-çizgi	0
320	cografya-sicaklik	yazı-çizgi	1000
320	destek-hareket-kemik	kenar	Kalınlık 56
320	destek-hareket-kemik	kenar	Kalınlık 62
320	destek-hareket-kemik	kenar	Kalınlık 68
320	destek-hareket-kemik	kenar	Kalınlık 74
320	destek-hareket-kemik	kenar	Kalınlık 80
320	din-ve-hayat	kenar	1
320	din-ve-hayat	kenar	2
320	dogrunun-analitigi	işaret	O
320	dogrunun-analitigi	yazı-çizgi	O
320	dogrusal-hareket	kenar	Hız (m/s)
320	dogrusal-hareket	kenar	Zaman (s)
320	dogrusal-hareket	kenar	−20
320	dogrusal-hareket	yazı-yazı	-1 × 0
320	dogrusal-hareket	yazı-yazı	-10 × 0
320	dogrusal-hareket	yazı-yazı	-3 × 0
320	dogrusal-hareket	yazı-yazı	-6 × 0
320	dogrusal-hareket	yazı-yazı	-7 × 0
320	dogrusal-hareket	yazı-yazı	-8 × 0
320	dogrusal-hareket	yazı-yazı	0 × 10
320	dogrusal-hareket	yazı-yazı	0 × 13
320	dogrusal-hareket	yazı-yazı	0 × 3
320	dogrusal-hareket	yazı-yazı	0 × 5
320	dogrusal-hareket	yazı-yazı	0 × 8
320	donusum-oteleme-donme	kenar	-10
320	donusum-oteleme-donme	yazı-yazı	-10 × -10
320	donusum-oteleme-donme	yazı-yazı	-6 × -6
320	donusum-oteleme-donme	yazı-yazı	-8 × -8
320	donusum-oteleme-donme	yazı-çizgi	-10
320	donusum-oteleme-donme	yazı-çizgi	-5
320	donusum-oteleme-donme	yazı-çizgi	-6
320	donusum-oteleme-donme	yazı-çizgi	-8
320	donusum-oteleme-donme	yazı-çizgi	10
320	donusum-oteleme-donme	yazı-çizgi	5
320	donusum-oteleme-donme	yazı-çizgi	6
320	donusum-oteleme-donme	yazı-çizgi	8
320	donusum-yansima-simetri	işaret	O
320	donusum-yansima-simetri	kenar	-10
320	donusum-yansima-simetri	yazı-yazı	-10 × -10
320	donusum-yansima-simetri	yazı-yazı	-6 × -6
320	donusum-yansima-simetri	yazı-yazı	-8 × -8
320	donusum-yansima-simetri	yazı-çizgi	-10
320	donusum-yansima-simetri	yazı-çizgi	-15
320	donusum-yansima-simetri	yazı-çizgi	-5
320	donusum-yansima-simetri	yazı-çizgi	-6
320	donusum-yansima-simetri	yazı-çizgi	-8
320	donusum-yansima-simetri	yazı-çizgi	10
320	donusum-yansima-simetri	yazı-çizgi	15
320	donusum-yansima-simetri	yazı-çizgi	5
320	donusum-yansima-simetri	yazı-çizgi	6
320	donusum-yansima-simetri	yazı-çizgi	8
320	dunya-gucu-osmanli	işaret	4
320	dunya-gucu-osmanli	işaret	5
320	dunya-gucu-osmanli	kenar	1
320	dunya-gucu-osmanli	kenar	3
320	dunya-gucu-osmanli	kenar	5
320	dunya-gucu-osmanli	yazı-yazı	6 × 7
320	dunya-gucu-osmanli	yazı-çizgi	6
320	dunya-nufus-dagilisi	kenar	40°
320	dunya-nufus-dagilisi	kenar	80°
320	dunya-nufus-dagilisi	kenar	Her hücre 1 km²
320	dunya-nufus-dagilisi	kenar	Her hücre 12.500,5 km²
320	dunya-nufus-dagilisi	kenar	Her hücre 18.750,25 km²
320	dunya-nufus-dagilisi	kenar	Her hücre 25 km²
320	dunya-nufus-dagilisi	kenar	Her hücre 25.000 km²
320	dunya-nufus-dagilisi	kenar	Her hücre 6.250,75 km²
320	dunya-nufus-dagilisi	kenar	−40°
320	dunya-nufus-dagilisi	yazı-çizgi	0°
320	dunya-nufus-dagilisi	yazı-çizgi	120°
320	dunya-nufus-dagilisi	yazı-çizgi	1: %25
320	dunya-nufus-dagilisi	yazı-çizgi	2: %25
320	dunya-nufus-dagilisi	yazı-çizgi	3: %25
320	dunya-nufus-dagilisi	yazı-çizgi	4: %25
320	dunya-nufus-dagilisi	yazı-çizgi	60°
320	dunya-nufus-dagilisi	yazı-çizgi	A
320	dunya-nufus-dagilisi	yazı-çizgi	B
320	dunya-nufus-dagilisi	yazı-çizgi	C
320	dunya-nufus-dagilisi	yazı-çizgi	D
320	dunya-nufus-dagilisi	yazı-çizgi	E
320	dunya-nufus-dagilisi	yazı-çizgi	F
320	dunya-nufus-dagilisi	yazı-çizgi	G
320	dunya-nufus-dagilisi	yazı-çizgi	H
320	dunya-nufus-dagilisi	yazı-çizgi	−120°
320	dunya-nufus-dagilisi	yazı-çizgi	−40°
320	dunya-nufus-dagilisi	yazı-çizgi	−60°
320	dunya-sekli-hareket	kenar	Saat
320	dunya-turkiye-gocler	yazı-çizgi	Y
320	dunyada-sular	kenar	Kalem sırası: 1–5
320	duyu-organlari-deri	işaret	Deri altı
320	duyu-organlari-deri	yazı-çizgi	Deri altı
320	duyu-organlari-dil-burun	yazı-çizgi	İlk korteks
320	duyu-organlari-kulak	yazı-çizgi	Oval pencere
320	duzgun-alan-paralel-levhalar	yazı-yazı	0 × 0,1 m
320	egik-atis	yazı-çizgi	0
320	ekoloji-komunite	kenar	30
320	ekonomik-faaliyetler	kenar	0%
320	ekonomik-faaliyetler	kenar	100%
320	ekonomik-faaliyetler	kenar	50%
320	elektrik-akimi	yazı-çizgi	24 V
320	elektrik-alan	yazı-yazı	Kaynak sabit × F: sağa
320	elektrik-alan	yazı-yazı	Kaynak sabit × F: sola
320	elektrik-alan	yazı-yazı	Kaynak sabit × F: sıfır
320	elektrik-alan	yazı-çizgi	q = -1
320	elektrik-alan	yazı-çizgi	q = 0
320	elektrik-alan	yazı-çizgi	q = 1
320	elektriksel-potansiyel	yazı-çizgi	x (m)
320	elektroliz	yazı-çizgi	+
320	elektroliz	yazı-çizgi	−
320	endokrin-pankreas	kenar	0
320	endokrin-pankreas	kenar	20
320	endokrin-pankreas	kenar	40
320	endokrin-pankreas	kenar	60
320	endokrin-pankreas	yazı-çizgi	12
320	endokrin-pankreas	yazı-çizgi	13
320	endokrin-pankreas	yazı-çizgi	15
320	endokrin-pankreas	yazı-çizgi	16
320	endokrin-pankreas	yazı-çizgi	17
320	endokrin-pankreas	yazı-çizgi	33
320	endokrin-pankreas	yazı-çizgi	35
320	endokrin-pankreas	yazı-çizgi	53
320	endokrin-pankreas	yazı-çizgi	55
320	endokrin-tiroit	yazı-çizgi	−
320	enerji-ve-hareket	yazı-çizgi	Son x: -0,25 m
320	enerji-ve-hareket	yazı-çizgi	Son x: -0,5 m
320	enerji-ve-hareket	yazı-çizgi	Son x: 0 m
320	enerji-ve-hareket	yazı-çizgi	Son x: 0,2 m
320	enerji-ve-hareket	yazı-çizgi	Son x: 0,25 m
320	enerji-ve-hareket	yazı-çizgi	Son x: 0,5 m
320	enerji-ve-hareket	yazı-çizgi	İlk x: -0,1 m
320	enerji-ve-hareket	yazı-çizgi	İlk x: -0,25 m
320	enerji-ve-hareket	yazı-çizgi	İlk x: -0,5 m
320	enerji-ve-hareket	yazı-çizgi	İlk x: 0 m
320	enerji-ve-hareket	yazı-çizgi	İlk x: 0,25 m
320	enerji-ve-hareket	yazı-çizgi	İlk x: 0,5 m
320	felsefeyi-tanima	işaret	1
320	felsefeyi-tanima	işaret	2
320	felsefeyi-tanima	kenar	1
320	felsefeyi-tanima	kenar	5
320	fiziksel-kimyasal-degisimler	kenar	H: 4 atom · O: 2 atom · ölçekli geometri değildir
320	fiziksel-kimyasal-degisimler	yazı-çizgi	H
320	fiziksel-kimyasal-degisimler	yazı-çizgi	O
320	gazlar-hal-degisim-plazma	kenar	0 iyon + 0 elektron
320	gazlar-hal-degisim-plazma	kenar	12 iyon + 12 elektron
320	gazlar-hal-degisim-plazma	kenar	3 iyon + 3 elektron
320	gazlar-hal-degisim-plazma	kenar	6 iyon + 6 elektron
320	gazlar-hal-degisim-plazma	kenar	9 iyon + 9 elektron
320	gazlar-hal-degisim-plazma	kenar	V=1 L · T=300 K
320	gazlar-hal-degisim-plazma	kenar	V=2 L · T=200 K
320	gazlar-hal-degisim-plazma	kenar	V=2 L · T=300 K
320	gazlar-hal-degisim-plazma	kenar	V=2 L · T=400 K
320	gazlar-hal-degisim-plazma	kenar	V=2 L · T=500 K
320	gazlar-hal-degisim-plazma	kenar	V=2 L · T=600 K
320	gazlar-hal-degisim-plazma	kenar	V=4 L · T=300 K
320	gazlar-hal-degisim-plazma	kenar	V=5 L · T=300 K
320	gazlar-hal-degisim-plazma	kenar	V=6 L · T=300 K
320	gazlar-hal-degisim-plazma	kenar	Verilen enerji → · 0 °C
320	gazlar-hal-degisim-plazma	kenar	Verilen enerji → · 100 °C
320	gazlar-hal-degisim-plazma	kenar	Verilen enerji → · 200 °C
320	gercek-kutle-akb-nk	kenar	Basınç (atm)
320	gonul-cografyamiz	kenar	1
320	gonul-cografyamiz	kenar	2
320	hal-degisimi	kenar	-10
320	hal-degisimi	kenar	0
320	hal-degisimi	kenar	100
320	hal-degisimi	kenar	120
320	hal-degisimi	kenar	Alınan Q (J)
320	hal-degisimi	kenar	T(°C)
320	hal-degisimi	yazı-yazı	-10 × 0
320	harita-bilgisi	kenar	0,25
320	harita-bilgisi	kenar	2,25
320	hibritlesme	yazı-yazı	C × C
320	hibritlesme	yazı-yazı	C × H
320	hibritlesme	yazı-yazı	H × C
320	hibritlesme	yazı-yazı	H × H
320	hibritlesme	yazı-çizgi	C
320	hibritlesme	yazı-çizgi	H
320	hidrojen-bagi	işaret	H
320	hidrojen-bagi	yazı-çizgi	H
320	hucre-zarinda-madde-alisverisleri	işaret	O₂
320	hucre-zarinda-madde-alisverisleri	kenar	Isıl hareket sürer
320	hz-muhammed-ve-gencler	kenar	1
320	hz-muhammed-ve-gencler	kenar	2
320	hz-muhammed-ve-gencler	kenar	3
320	hz-muhammed-ve-gencler	yazı-yazı	1 × 2
320	ic-kuvvetler	yazı-çizgi	Oluk
320	ilk-cag-felsefesi	kenar	1
320	ilk-cag-felsefesi	kenar	2
320	islam-medeniyetinin-dogusu	işaret	1
320	islam-medeniyetinin-dogusu	işaret	4
320	islam-medeniyetinin-dogusu	işaret	5
320	islam-medeniyetinin-dogusu	işaret	6
320	islam-medeniyetinin-dogusu	kenar	1
320	islam-medeniyetinin-dogusu	kenar	2
320	islam-medeniyetinin-dogusu	kenar	3
320	islam-medeniyetinin-dogusu	kenar	5
320	islam-medeniyetinin-dogusu	kenar	7
320	islam-medeniyetinin-dogusu	yazı-yazı	1 × 5
320	islam-medeniyetinin-dogusu	yazı-yazı	3 × 4
320	islam-ve-bilim	kenar	1
320	islam-ve-bilim	kenar	2
320	islam-ve-bilim	kenar	3
320	iyonlasma-enerjisi	kenar	1314
320	iyonlasma-enerjisi	kenar	1402
320	iyonlasma-enerjisi	kenar	14850
320	iyonlasma-enerjisi	kenar	1681
320	iyonlasma-enerjisi	kenar	1750
320	iyonlasma-enerjisi	kenar	496
320	iyonlasma-enerjisi	kenar	578
320	iyonlasma-enerjisi	kenar	738
320	iyonlasma-enerjisi	kenar	900
320	izotop-izoton-izobar	kenar	Ortalama: 23,985 u
320	izotop-izoton-izobar	kenar	Ortalama: 24,485 u
320	izotop-izoton-izobar	kenar	Ortalama: 24,984 u
320	izotop-izoton-izobar	kenar	Ortalama: 25,484 u
320	izotop-izoton-izobar	kenar	Ortalama: 25,983 u
320	izotop-izoton-izobar	kenar	Z
320	izotop-izoton-izobar	yazı-çizgi	p=1 · n=13 · A=14
320	izotop-izoton-izobar	yazı-çizgi	p=12 · n=0 · A=12
320	izotop-izoton-izobar	yazı-çizgi	p=12 · n=13 · A=25
320	izotop-izoton-izobar	yazı-çizgi	p=12 · n=25 · A=37
320	izotop-izoton-izobar	yazı-çizgi	p=12 · n=38 · A=50
320	izotop-izoton-izobar	yazı-çizgi	p=12 · n=50 · A=62
320	izotop-izoton-izobar	yazı-çizgi	p=16 · n=13 · A=29
320	izotop-izoton-izobar	yazı-çizgi	p=23 · n=13 · A=36
320	izotop-izoton-izobar	yazı-çizgi	p=30 · n=13 · A=43
320	izotop-izoton-izobar	yazı-çizgi	p=8 · n=13 · A=21
320	kalitim-molekulu-kesfi	yazı-çizgi	S
320	karstik-sekiller	yazı-çizgi	Çökme
320	kepler-yasalari	kenar	1
320	kepler-yasalari	kenar	2
320	kepler-yasalari	yazı-çizgi	S
320	kimyasal-denge	kenar	Zaman (s)
320	kimyasal-turler-lewis	yazı-çizgi	Cl
320	kimyasal-turler-lewis	yazı-çizgi	N
320	kimyasal-turler-lewis	yazı-çizgi	Na
320	koligatif-ayirma	işaret	0
320	koligatif-ayirma	kenar	0 g
320	koligatif-ayirma	kenar	4 g
320	koligatif-ayirma	kenar	Alınan Fe
320	koligatif-ayirma	kenar	ΔTf (°C)
320	korozyon-katodik-koruma	yazı-çizgi	Metal
320	korozyon-katodik-koruma	yazı-çizgi	Yapı
320	kovalent-adlandirma-metalik-bag	işaret	+
320	kovalent-adlandirma-metalik-bag	yazı-çizgi	Cl
320	kovalent-adlandirma-metalik-bag	yazı-çizgi	O
320	kumeler	yazı-çizgi	1
320	kumeler	yazı-çizgi	2
320	kumeler	yazı-çizgi	3
320	kumeler	yazı-çizgi	4
320	kumeler	yazı-çizgi	5
320	kumeler	yazı-çizgi	6
320	kumeler	yazı-çizgi	7
320	kumeler	yazı-çizgi	8
320	kutle-agirlik-merkezi	yazı-çizgi	15
320	kutle-agirlik-merkezi	yazı-çizgi	16
320	madde-ozkutle	kenar	Hacim (cm³)
320	madde-ozkutle	kenar	Kütle (g)
320	maddenin-halleri	kenar	100
320	maddenin-halleri	kenar	200
320	manyetik-alan-ayt	yazı-çizgi	0
320	manyetik-alan-ayt	yazı-çizgi	P
320	manyetik-alan-ayt	yazı-çizgi	×
320	manyetik-alan-ayt	yazı-çizgi	•
320	mercekler	yazı-çizgi	Görüntü
320	miknatislar-ve-manyetik-alan	işaret	P · pusula
320	miknatislar-ve-manyetik-alan	yazı-çizgi	P · pusula
320	milli-mucadele	işaret	3
320	milli-mucadele	işaret	4
320	milli-mucadele	kenar	1
320	milli-mucadele	kenar	3
320	milli-mucadele	kenar	4
320	milli-mucadele	yazı-yazı	3 × 4
320	milli-mucadele	yazı-çizgi	3
320	molekul-geometrisi	işaret	N
320	molekul-geometrisi	yazı-yazı	B × F
320	molekul-geometrisi	yazı-yazı	H × H
320	molekul-geometrisi	yazı-çizgi	H
320	molekul-geometrisi	yazı-çizgi	Net var
320	mutlak-deger	yazı-çizgi	-2
320	mutlak-deger	yazı-çizgi	-4
320	mutlak-deger	yazı-çizgi	0
320	mutlak-deger	yazı-çizgi	2
320	mutlak-deger	yazı-çizgi	4
320	nefron-isleyisi	yazı-çizgi	1
320	nefron-isleyisi	yazı-çizgi	2
320	newton-genel-cekim-yasasi	yazı-çizgi	P
320	noktanin-analitigi	işaret	G
320	noktanin-analitigi	yazı-yazı	y × A
320	noktanin-analitigi	yazı-yazı	y × A′
320	noktanin-analitigi	yazı-yazı	y × B
320	noktanin-analitigi	yazı-yazı	y × P
320	nufus-piramitleri	kenar	Toplam nüfusta pay (%)
320	nukleik-asitler	yazı-çizgi	1′
320	nukleik-asitler	yazı-çizgi	O
320	nukleik-asitler-yapi	yazı-yazı	G × U
320	oran-oranti	yazı-çizgi	108
320	oran-oranti	yazı-çizgi	114
320	oran-oranti	yazı-çizgi	144
320	oran-oranti	yazı-çizgi	150
320	ruzgar-ve-buzul	yazı-çizgi	Akarsu ile boylanma
320	selcuklu-yerlesme-devletlesme	kenar	1
320	selcuklu-yerlesme-devletlesme	kenar	2
320	sindirim-mide	yazı-çizgi	HCl
320	sinir-sistemi-aksiyon-potansiyeli	işaret	−70
320	sinir-sistemi-aksiyon-potansiyeli	yazı-çizgi	−70
320	siyaset-felsefesi	kenar	1
320	siyaset-felsefesi	kenar	2
320	solunum-gaz-tasinmasi	yazı-çizgi	HCO₃⁻
320	solunum-oksijenli-bilanco	yazı-çizgi	ETS
320	solunum-oksijensiz-alicilar	yazı-çizgi	ETS
320	solunum-organlar	yazı-çizgi	Duvar
320	su-dalgalarinda-girisim	yazı-çizgi	10
320	su-dalgalarinda-girisim	yazı-çizgi	20
320	su-dalgalarinda-girisim	yazı-çizgi	30
320	su-dalgalarinda-girisim	yazı-çizgi	P
320	tork-denge	yazı-çizgi	O
320	tork-denge	yazı-çizgi	x (m)
320	turev-teget	işaret	y = -1,75
320	turev-teget	kenar	y
320	turev-teget	yazı-yazı	1 × B
320	turev-teget	yazı-çizgi	-1
320	turev-teget	yazı-çizgi	-1,25
320	turev-teget	yazı-çizgi	-2
320	turev-teget	yazı-çizgi	-2,25
320	turev-teget	yazı-çizgi	-3,25
320	turev-teget	yazı-çizgi	1
320	turev-teget	yazı-çizgi	2,25
320	turev-teget	yazı-çizgi	3,25
320	turev-teget	yazı-çizgi	B
320	turev-teget	yazı-çizgi	y = -0,75
320	turev-teget	yazı-çizgi	y = -1,75
320	turev-teget	yazı-çizgi	y = 0,25
320	turev-teget	yazı-çizgi	y = 2,25
320	turev-teget	yazı-çizgi	y = 3,25
320	turev-teget	yazı-çizgi	y = 4,25
320	turev-teget	yazı-çizgi	y = 5,25
320	turev-teget	yazı-çizgi	y = 6,25
320	turkiye-bitkileri	yazı-çizgi	Özgün kesit
320	turkiye-ic-kuvvetler	yazı-çizgi	Graben
320	turkiye-ic-kuvvetler	yazı-çizgi	Kesit · tabakalar bükülür
320	turkiye-iklimi	kenar	0
320	turkiye-iklimi	kenar	1500
320	turkiye-iklimi	kenar	3000
320	turkiye-iklimi	kenar	Şema · yükselti (m)
320	turkiye-iklimi	yazı-çizgi	1500
320	turkiye-iklimi	yazı-çizgi	3000
320	tyt-geo-dik-prizmalar-032	yazı-çizgi	h
320	tyt-geo-paralelkenar-ozel-dortgenler-032	yazı-çizgi	h
320	tyt-geo-ucgen-esitsizligi-031	kenar	C
320	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	B
320	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	C
320	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	G
320	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	I
320	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	O
320	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	r
320	tyt-geo-ucgende-acilar-031	yazı-çizgi	C
320	tyt-mat-dogrusal-denklemler-kaynak-036	kenar	0
320	ureme-embriyonik-gelisim	yazı-çizgi	Boşluk
320	varlik-felsefesi	kenar	1
320	varlik-felsefesi	kenar	2
320	yatay-atis	yazı-çizgi	0
320	zarflar	kenar	1
320	zarflar	kenar	2
320	zarflar	kenar	3
320	zarflar	kenar	4
320	zayif-etkilesimler	yazı-çizgi	δ+
320	zayif-etkilesimler	yazı-çizgi	δ−
375	15-17-yuzyil-felsefesi	kenar	1
375	15-17-yuzyil-felsefesi	kenar	2
375	18-19-yuzyil-felsefesi	kenar	1
375	18-19-yuzyil-felsefesi	kenar	2
375	acisal-momentum	yazı-çizgi	A
375	acisal-momentum	yazı-çizgi	B
375	acisal-momentum	yazı-çizgi	O
375	ahlak-felsefesi	işaret	2
375	ahlak-felsefesi	işaret	3
375	ahlak-felsefesi	kenar	1
375	ahlak-felsefesi	kenar	2
375	ahlak-felsefesi	kenar	3
375	alkanlar	yazı-yazı	C × C
375	alkanlar	yazı-çizgi	C
375	alternatif-akim	yazı-çizgi	i (A)
375	asit-baz-metaller	yazı-çizgi	0,6
375	atmosfer-katmanlari	kenar	700
375	atomun-temel-tanecikleri	kenar	Ortalama: 23,985 u
375	atomun-temel-tanecikleri	kenar	Ortalama: 24,485 u
375	atomun-temel-tanecikleri	kenar	Ortalama: 24,984 u
375	atomun-temel-tanecikleri	kenar	Ortalama: 25,484 u
375	atomun-temel-tanecikleri	kenar	Ortalama: 25,983 u
375	atomun-temel-tanecikleri	kenar	Z
375	atomun-temel-tanecikleri	yazı-çizgi	p=1 · n=13 · A=14
375	atomun-temel-tanecikleri	yazı-çizgi	p=12 · n=0 · A=12
375	atomun-temel-tanecikleri	yazı-çizgi	p=12 · n=13 · A=25
375	atomun-temel-tanecikleri	yazı-çizgi	p=12 · n=25 · A=37
375	atomun-temel-tanecikleri	yazı-çizgi	p=12 · n=38 · A=50
375	atomun-temel-tanecikleri	yazı-çizgi	p=12 · n=50 · A=62
375	atomun-temel-tanecikleri	yazı-çizgi	p=16 · n=13 · A=29
375	atomun-temel-tanecikleri	yazı-çizgi	p=23 · n=13 · A=36
375	atomun-temel-tanecikleri	yazı-çizgi	p=30 · n=13 · A=43
375	atomun-temel-tanecikleri	yazı-çizgi	p=8 · n=13 · A=21
375	ayt-denge-hesaplari	kenar	0
375	ayt-denge-hesaplari	kenar	3
375	ayt-denge-hesaplari	kenar	6
375	ayt-enerji-hareket	kenar	20,59
375	ayt-entalpi-bag-hess	yazı-çizgi	CO
375	ayt-esterler	yazı-çizgi	CH
375	ayt-esterler	yazı-çizgi	CH₂
375	ayt-ikinci-dereceden-denklemler	yazı-çizgi	-6
375	ayt-ikinci-dereceden-denklemler	yazı-çizgi	1/T
375	ayt-ikinci-dereceden-denklemler	yazı-çizgi	2
375	ayt-ikinci-dereceden-denklemler	yazı-çizgi	6
375	ayt-ikinci-dereceden-denklemler	yazı-çizgi	T
375	ayt-ikinci-dereceden-denklemler	yazı-çizgi	y
375	ayt-iletim-doku	yazı-çizgi	0 mg
375	ayt-iletim-doku	yazı-çizgi	12 mg
375	ayt-iletim-doku	yazı-çizgi	13,33 mg
375	ayt-iletim-doku	yazı-çizgi	16 mg
375	ayt-iletim-doku	yazı-çizgi	2,67 mg
375	ayt-iletim-doku	yazı-çizgi	20 mg
375	ayt-iletim-doku	yazı-çizgi	21,33 mg
375	ayt-iletim-doku	yazı-çizgi	24 mg
375	ayt-iletim-doku	yazı-çizgi	32 mg
375	ayt-iletim-doku	yazı-çizgi	4,8 mg
375	ayt-iletim-doku	yazı-çizgi	40 mg
375	ayt-iletim-doku	yazı-çizgi	6 mg
375	ayt-iletim-doku	yazı-çizgi	8 mg
375	ayt-karmasik-sayilar	işaret	s
375	ayt-karmasik-sayilar	işaret	z/w
375	ayt-karmasik-sayilar	yazı-yazı	4 × w/s
375	ayt-karmasik-sayilar	yazı-çizgi	-10
375	ayt-karmasik-sayilar	yazı-çizgi	-11
375	ayt-karmasik-sayilar	yazı-çizgi	-12
375	ayt-karmasik-sayilar	yazı-çizgi	-13
375	ayt-karmasik-sayilar	yazı-çizgi	-15
375	ayt-karmasik-sayilar	yazı-çizgi	-17
375	ayt-karmasik-sayilar	yazı-çizgi	-19
375	ayt-karmasik-sayilar	yazı-çizgi	-4
375	ayt-karmasik-sayilar	yazı-çizgi	-6
375	ayt-karmasik-sayilar	yazı-çizgi	-7
375	ayt-karmasik-sayilar	yazı-çizgi	-8
375	ayt-karmasik-sayilar	yazı-çizgi	10
375	ayt-karmasik-sayilar	yazı-çizgi	11
375	ayt-karmasik-sayilar	yazı-çizgi	12
375	ayt-karmasik-sayilar	yazı-çizgi	13
375	ayt-karmasik-sayilar	yazı-çizgi	15
375	ayt-karmasik-sayilar	yazı-çizgi	17
375	ayt-karmasik-sayilar	yazı-çizgi	19
375	ayt-karmasik-sayilar	yazı-çizgi	4
375	ayt-karmasik-sayilar	yazı-çizgi	6
375	ayt-karmasik-sayilar	yazı-çizgi	7
375	ayt-karmasik-sayilar	yazı-çizgi	8
375	ayt-karmasik-sayilar	yazı-çizgi	s
375	ayt-karmasik-sayilar	yazı-çizgi	w
375	ayt-karmasik-sayilar	yazı-çizgi	w/s
375	ayt-karmasik-sayilar	yazı-çizgi	z
375	ayt-karmasik-sayilar	yazı-çizgi	z/s
375	ayt-karmasik-sayilar	yazı-çizgi	z/w
375	ayt-kodon-antikodon	kenar	Arg
375	ayt-kodon-antikodon	kenar	Gln
375	ayt-kodon-antikodon	kenar	Leu
375	ayt-kodon-antikodon	kenar	Met
375	ayt-kodon-antikodon	kenar	Pro
375	ayt-kodon-antikodon	kenar	Val
375	ayt-kuantum-sayilari	yazı-çizgi	İzinli orbital yok
375	ayt-limit-sureklilik	yazı-çizgi	-4
375	ayt-parabol	işaret	-8
375	ayt-parabol	işaret	T/P/H
375	ayt-parabol	yazı-çizgi	-8
375	ayt-parabol	yazı-çizgi	1
375	ayt-parabol	yazı-çizgi	2
375	ayt-parabol	yazı-çizgi	8
375	ayt-parabol	yazı-çizgi	H
375	ayt-parabol	yazı-çizgi	P/H
375	ayt-parabol	yazı-çizgi	T
375	ayt-parabol	yazı-çizgi	T/1
375	ayt-parabol	yazı-çizgi	T/1/2
375	ayt-parabol	yazı-çizgi	T/2
375	ayt-parabol	yazı-çizgi	T/P
375	ayt-parabol	yazı-çizgi	T/P/H
375	ayt-tepkime-hizi	kenar	0
375	ayt-tepkime-hizi	kenar	30
375	ayt-tepkime-hizi	kenar	60
375	ayt-trigonometri	işaret	A/C
375	ayt-trigonometri	yazı-çizgi	-1,5
375	ayt-trigonometri	yazı-çizgi	-10
375	ayt-trigonometri	yazı-çizgi	-8
375	ayt-trigonometri	yazı-çizgi	1
375	ayt-trigonometri	yazı-çizgi	1,5
375	ayt-trigonometri	yazı-çizgi	10
375	ayt-trigonometri	yazı-çizgi	2
375	ayt-trigonometri	yazı-çizgi	8
375	ayt-trigonometri	yazı-çizgi	A
375	ayt-trigonometri	yazı-çizgi	A/B
375	ayt-trigonometri	yazı-çizgi	A/C
375	ayt-trigonometri	yazı-çizgi	C
375	ayt-trigonometri	yazı-çizgi	P
375	ayt-zayif-asit-baz-tampon	kenar	pH 2,851
375	ayt-zayif-asit-baz-tampon	kenar	pH 3,002
375	ayt-zayif-asit-baz-tampon	kenar	pH 4,523
375	ayt-zayif-asit-baz-tampon	kenar	pH 4,699
375	ayt-zayif-asit-baz-tampon	kenar	pH 4,824
375	ayt-zayif-asit-baz-tampon	kenar	pH 4,959
375	ayt-zayif-asit-baz-tampon	kenar	pH 5
375	ayt-zayif-asit-baz-tampon	kenar	pH 5,176
375	ayt-zayif-asit-baz-tampon	kenar	pH 5,222
375	ayt-zayif-asit-baz-tampon	kenar	pH 5,301
375	ayt-zayif-asit-baz-tampon	kenar	pH 5,477
375	ayt-zayif-asit-baz-tampon	kenar	pH 6
375	ayt-zayif-asit-baz-tampon	kenar	pH 9,151
375	bagil-hareket	yazı-çizgi	A
375	bagil-hareket	yazı-çizgi	B
375	basinc	yazı-çizgi	0 N
375	basinc	yazı-çizgi	150 N
375	basinc	yazı-çizgi	225 N
375	basinc	yazı-çizgi	300 N
375	basinc	yazı-çizgi	60 N
375	basinc	yazı-çizgi	75 N
375	basinc	yazı-çizgi	h=0 cm
375	basinc	yazı-çizgi	h=100 cm
375	basinc	yazı-çizgi	h=25 cm
375	basinc	yazı-çizgi	h=40 cm
375	basinc	yazı-çizgi	h=50 cm
375	basinc	yazı-çizgi	h=75 cm
375	bilimsel-gosterim-katsayi	yazı-çizgi	0 için logaritmik nokta yok
375	bilimsel-yontem	kenar	12
375	bitki-kok-anatomisi	kenar	Epidermis
375	bitki-kok-anatomisi	yazı-çizgi	Bölünme
375	bitki-kok-anatomisi	yazı-çizgi	Kaliptra
375	bitki-kok-anatomisi	yazı-çizgi	Olgun bölge
375	bitki-kok-anatomisi	yazı-çizgi	Uzama
375	buyuk-iklim-tipleri	kenar	-20
375	buyuk-iklim-tipleri	kenar	-40
375	buyuk-iklim-tipleri	kenar	Ay sırası: 1–12
375	buyuk-iklim-tipleri	yazı-çizgi	30°K
375	buyuk-iklim-tipleri	yazı-çizgi	60°K
375	canlilar-ve-cevre	kenar	K1
375	canlilar-ve-cevre	kenar	K2
375	canlilar-ve-cevre	kenar	K3
375	canlilar-ve-cevre	kenar	K4
375	canlilar-ve-cevre	kenar	K5
375	canlilar-ve-cevre	yazı-çizgi	100
375	cemberin-analitigi	işaret	O
375	cemberin-analitigi	kenar	-10
375	cografya-sicaklik	yazı-çizgi	0
375	cografya-sicaklik	yazı-çizgi	1000
375	destek-hareket-kemik	kenar	Kalınlık 56
375	destek-hareket-kemik	kenar	Kalınlık 62
375	destek-hareket-kemik	kenar	Kalınlık 68
375	destek-hareket-kemik	kenar	Kalınlık 74
375	destek-hareket-kemik	kenar	Kalınlık 80
375	din-ve-hayat	kenar	1
375	din-ve-hayat	kenar	2
375	dogrusal-hareket	kenar	Hız (m/s)
375	dogrusal-hareket	kenar	Zaman (s)
375	dogrusal-hareket	yazı-yazı	-1 × 0
375	dogrusal-hareket	yazı-yazı	-10 × 0
375	dogrusal-hareket	yazı-yazı	-3 × 0
375	dogrusal-hareket	yazı-yazı	-6 × 0
375	dogrusal-hareket	yazı-yazı	-7 × 0
375	dogrusal-hareket	yazı-yazı	-8 × 0
375	dogrusal-hareket	yazı-yazı	0 × 10
375	dogrusal-hareket	yazı-yazı	0 × 13
375	dogrusal-hareket	yazı-yazı	0 × 3
375	dogrusal-hareket	yazı-yazı	0 × 5
375	dogrusal-hareket	yazı-yazı	0 × 8
375	donusum-oteleme-donme	kenar	-10
375	donusum-yansima-simetri	işaret	O
375	donusum-yansima-simetri	kenar	-10
375	dunya-gucu-osmanli	işaret	4
375	dunya-gucu-osmanli	işaret	5
375	dunya-gucu-osmanli	kenar	1
375	dunya-gucu-osmanli	kenar	3
375	dunya-gucu-osmanli	kenar	5
375	dunya-gucu-osmanli	yazı-yazı	6 × 7
375	dunya-gucu-osmanli	yazı-çizgi	6
375	dunya-nufus-dagilisi	kenar	Her hücre 1 km²
375	dunya-nufus-dagilisi	kenar	Her hücre 12.500,5 km²
375	dunya-nufus-dagilisi	kenar	Her hücre 18.750,25 km²
375	dunya-nufus-dagilisi	kenar	Her hücre 25 km²
375	dunya-nufus-dagilisi	kenar	Her hücre 25.000 km²
375	dunya-nufus-dagilisi	kenar	Her hücre 6.250,75 km²
375	dunya-nufus-dagilisi	kenar	−40°
375	dunya-nufus-dagilisi	yazı-çizgi	0°
375	dunya-nufus-dagilisi	yazı-çizgi	120°
375	dunya-nufus-dagilisi	yazı-çizgi	1: %25
375	dunya-nufus-dagilisi	yazı-çizgi	2: %25
375	dunya-nufus-dagilisi	yazı-çizgi	3: %25
375	dunya-nufus-dagilisi	yazı-çizgi	4: %25
375	dunya-nufus-dagilisi	yazı-çizgi	60°
375	dunya-nufus-dagilisi	yazı-çizgi	A
375	dunya-nufus-dagilisi	yazı-çizgi	B
375	dunya-nufus-dagilisi	yazı-çizgi	C
375	dunya-nufus-dagilisi	yazı-çizgi	D
375	dunya-nufus-dagilisi	yazı-çizgi	E
375	dunya-nufus-dagilisi	yazı-çizgi	F
375	dunya-nufus-dagilisi	yazı-çizgi	G
375	dunya-nufus-dagilisi	yazı-çizgi	H
375	dunya-nufus-dagilisi	yazı-çizgi	−120°
375	dunya-nufus-dagilisi	yazı-çizgi	−40°
375	dunya-nufus-dagilisi	yazı-çizgi	−60°
375	dunya-sekli-hareket	kenar	Saat
375	dunya-turkiye-gocler	yazı-çizgi	Y
375	duyu-organlari-deri	işaret	Deri altı
375	duyu-organlari-deri	yazı-çizgi	Deri altı
375	duyu-organlari-dil-burun	yazı-çizgi	İlk korteks
375	duyu-organlari-kulak	yazı-çizgi	Oval pencere
375	duzgun-alan-paralel-levhalar	yazı-yazı	0 × 0,1 m
375	egik-atis	yazı-çizgi	0
375	elektrik-akimi	yazı-çizgi	24 V
375	elektrik-alan	yazı-yazı	Kaynak sabit × F: sağa
375	elektrik-alan	yazı-yazı	Kaynak sabit × F: sola
375	elektrik-alan	yazı-yazı	Kaynak sabit × F: sıfır
375	elektrik-alan	yazı-çizgi	q = -1
375	elektrik-alan	yazı-çizgi	q = 0
375	elektrik-alan	yazı-çizgi	q = 1
375	elektriksel-potansiyel	yazı-çizgi	x (m)
375	elektroliz	yazı-çizgi	+
375	elektroliz	yazı-çizgi	−
375	endokrin-pankreas	kenar	0
375	endokrin-pankreas	kenar	20
375	endokrin-pankreas	kenar	40
375	endokrin-pankreas	kenar	60
375	endokrin-pankreas	yazı-çizgi	12
375	endokrin-pankreas	yazı-çizgi	13
375	endokrin-pankreas	yazı-çizgi	15
375	endokrin-pankreas	yazı-çizgi	16
375	endokrin-pankreas	yazı-çizgi	17
375	endokrin-pankreas	yazı-çizgi	33
375	endokrin-pankreas	yazı-çizgi	35
375	endokrin-pankreas	yazı-çizgi	53
375	endokrin-pankreas	yazı-çizgi	55
375	endokrin-tiroit	yazı-çizgi	−
375	enerji-ve-hareket	yazı-çizgi	Son x: -0,25 m
375	enerji-ve-hareket	yazı-çizgi	Son x: -0,5 m
375	enerji-ve-hareket	yazı-çizgi	Son x: 0 m
375	enerji-ve-hareket	yazı-çizgi	Son x: 0,2 m
375	enerji-ve-hareket	yazı-çizgi	Son x: 0,25 m
375	enerji-ve-hareket	yazı-çizgi	Son x: 0,5 m
375	enerji-ve-hareket	yazı-çizgi	İlk x: -0,1 m
375	enerji-ve-hareket	yazı-çizgi	İlk x: -0,25 m
375	enerji-ve-hareket	yazı-çizgi	İlk x: -0,5 m
375	enerji-ve-hareket	yazı-çizgi	İlk x: 0,25 m
375	enerji-ve-hareket	yazı-çizgi	İlk x: 0,5 m
375	felsefeyi-tanima	işaret	1
375	felsefeyi-tanima	işaret	2
375	felsefeyi-tanima	kenar	1
375	felsefeyi-tanima	kenar	5
375	fiziksel-kimyasal-degisimler	işaret	H
375	fiziksel-kimyasal-degisimler	yazı-çizgi	H
375	fiziksel-kimyasal-degisimler	yazı-çizgi	O
375	gonul-cografyamiz	kenar	1
375	gonul-cografyamiz	kenar	2
375	hal-degisimi	kenar	-10
375	hal-degisimi	kenar	0
375	hal-degisimi	kenar	100
375	hal-degisimi	kenar	120
375	hibritlesme	yazı-yazı	C × C
375	hibritlesme	yazı-yazı	C × H
375	hibritlesme	yazı-yazı	H × C
375	hibritlesme	yazı-yazı	H × H
375	hibritlesme	yazı-çizgi	C
375	hibritlesme	yazı-çizgi	H
375	hidrojen-bagi	yazı-çizgi	H
375	hucre-zarinda-madde-alisverisleri	kenar	Isıl hareket sürer
375	hz-muhammed-ve-gencler	kenar	1
375	hz-muhammed-ve-gencler	kenar	2
375	hz-muhammed-ve-gencler	kenar	3
375	hz-muhammed-ve-gencler	yazı-yazı	1 × 2
375	ic-kuvvetler	yazı-çizgi	Oluk
375	ilk-cag-felsefesi	kenar	1
375	ilk-cag-felsefesi	kenar	2
375	islam-medeniyetinin-dogusu	işaret	1
375	islam-medeniyetinin-dogusu	işaret	4
375	islam-medeniyetinin-dogusu	işaret	5
375	islam-medeniyetinin-dogusu	işaret	6
375	islam-medeniyetinin-dogusu	kenar	1
375	islam-medeniyetinin-dogusu	kenar	2
375	islam-medeniyetinin-dogusu	kenar	3
375	islam-medeniyetinin-dogusu	kenar	5
375	islam-medeniyetinin-dogusu	kenar	7
375	islam-medeniyetinin-dogusu	yazı-yazı	1 × 5
375	islam-medeniyetinin-dogusu	yazı-yazı	3 × 4
375	islam-ve-bilim	kenar	1
375	islam-ve-bilim	kenar	2
375	islam-ve-bilim	kenar	3
375	iyonlasma-enerjisi	kenar	1314
375	iyonlasma-enerjisi	kenar	1402
375	iyonlasma-enerjisi	kenar	14850
375	iyonlasma-enerjisi	kenar	1681
375	iyonlasma-enerjisi	kenar	1750
375	iyonlasma-enerjisi	kenar	496
375	iyonlasma-enerjisi	kenar	578
375	iyonlasma-enerjisi	kenar	738
375	iyonlasma-enerjisi	kenar	900
375	izotop-izoton-izobar	kenar	Ortalama: 23,985 u
375	izotop-izoton-izobar	kenar	Ortalama: 24,485 u
375	izotop-izoton-izobar	kenar	Ortalama: 24,984 u
375	izotop-izoton-izobar	kenar	Ortalama: 25,484 u
375	izotop-izoton-izobar	kenar	Ortalama: 25,983 u
375	izotop-izoton-izobar	kenar	Z
375	izotop-izoton-izobar	yazı-çizgi	p=1 · n=13 · A=14
375	izotop-izoton-izobar	yazı-çizgi	p=12 · n=0 · A=12
375	izotop-izoton-izobar	yazı-çizgi	p=12 · n=13 · A=25
375	izotop-izoton-izobar	yazı-çizgi	p=12 · n=25 · A=37
375	izotop-izoton-izobar	yazı-çizgi	p=12 · n=38 · A=50
375	izotop-izoton-izobar	yazı-çizgi	p=12 · n=50 · A=62
375	izotop-izoton-izobar	yazı-çizgi	p=16 · n=13 · A=29
375	izotop-izoton-izobar	yazı-çizgi	p=23 · n=13 · A=36
375	izotop-izoton-izobar	yazı-çizgi	p=30 · n=13 · A=43
375	izotop-izoton-izobar	yazı-çizgi	p=8 · n=13 · A=21
375	kalitim-molekulu-kesfi	yazı-çizgi	S
375	karstik-sekiller	yazı-çizgi	Çökme
375	kepler-yasalari	kenar	1
375	kepler-yasalari	kenar	2
375	kimyasal-denge	kenar	Zaman (s)
375	kimyasal-turler-lewis	yazı-çizgi	Cl
375	kimyasal-turler-lewis	yazı-çizgi	N
375	kimyasal-turler-lewis	yazı-çizgi	Na
375	koligatif-ayirma	işaret	0
375	koligatif-ayirma	kenar	ΔTf (°C)
375	korozyon-katodik-koruma	yazı-çizgi	Metal
375	korozyon-katodik-koruma	yazı-çizgi	Yapı
375	kovalent-adlandirma-metalik-bag	işaret	+
375	kovalent-adlandirma-metalik-bag	yazı-çizgi	Cl
375	kovalent-adlandirma-metalik-bag	yazı-çizgi	F
375	kovalent-adlandirma-metalik-bag	yazı-çizgi	O
375	kovalent-adlandirma-metalik-bag	yazı-çizgi	P
375	kumeler	yazı-çizgi	1
375	kumeler	yazı-çizgi	2
375	kumeler	yazı-çizgi	3
375	kumeler	yazı-çizgi	4
375	kumeler	yazı-çizgi	5
375	kumeler	yazı-çizgi	6
375	kumeler	yazı-çizgi	7
375	kumeler	yazı-çizgi	8
375	kutle-agirlik-merkezi	yazı-çizgi	15
375	kutle-agirlik-merkezi	yazı-çizgi	16
375	madde-ozkutle	kenar	Kütle (g)
375	maddenin-halleri	kenar	100
375	maddenin-halleri	kenar	200
375	manyetik-alan-ayt	yazı-çizgi	0
375	manyetik-alan-ayt	yazı-çizgi	P
375	manyetik-alan-ayt	yazı-çizgi	×
375	manyetik-alan-ayt	yazı-çizgi	•
375	mercekler	yazı-çizgi	Görüntü
375	miknatislar-ve-manyetik-alan	işaret	P · pusula
375	miknatislar-ve-manyetik-alan	yazı-çizgi	P · pusula
375	milli-mucadele	işaret	3
375	milli-mucadele	işaret	4
375	milli-mucadele	kenar	1
375	milli-mucadele	kenar	3
375	milli-mucadele	kenar	4
375	milli-mucadele	yazı-yazı	3 × 4
375	milli-mucadele	yazı-çizgi	3
375	molekul-geometrisi	işaret	N
375	molekul-geometrisi	yazı-yazı	B × F
375	molekul-geometrisi	yazı-yazı	H × H
375	molekul-geometrisi	yazı-çizgi	H
375	molekul-geometrisi	yazı-çizgi	Net var
375	mutlak-deger	yazı-çizgi	-2
375	mutlak-deger	yazı-çizgi	-4
375	mutlak-deger	yazı-çizgi	0
375	mutlak-deger	yazı-çizgi	2
375	mutlak-deger	yazı-çizgi	4
375	nefron-isleyisi	yazı-çizgi	1
375	nefron-isleyisi	yazı-çizgi	2
375	newton-genel-cekim-yasasi	yazı-çizgi	P
375	noktanin-analitigi	işaret	G
375	nufus-piramitleri	kenar	Toplam nüfusta pay (%)
375	nukleik-asitler	yazı-çizgi	1′
375	nukleik-asitler	yazı-çizgi	O
375	oran-oranti	yazı-çizgi	108
375	oran-oranti	yazı-çizgi	114
375	oran-oranti	yazı-çizgi	144
375	oran-oranti	yazı-çizgi	150
375	ruzgar-ve-buzul	yazı-çizgi	Akarsu ile boylanma
375	selcuklu-yerlesme-devletlesme	kenar	1
375	selcuklu-yerlesme-devletlesme	kenar	2
375	sindirim-mide	yazı-çizgi	HCl
375	sinir-sistemi-aksiyon-potansiyeli	işaret	−70
375	sinir-sistemi-aksiyon-potansiyeli	yazı-çizgi	−70
375	siyaset-felsefesi	kenar	1
375	siyaset-felsefesi	kenar	2
375	solunum-gaz-tasinmasi	yazı-çizgi	HCO₃⁻
375	solunum-oksijenli-bilanco	yazı-çizgi	ETS
375	solunum-oksijensiz-alicilar	yazı-çizgi	ETS
375	solunum-organlar	yazı-çizgi	Duvar
375	su-dalgalarinda-girisim	yazı-çizgi	10
375	su-dalgalarinda-girisim	yazı-çizgi	20
375	su-dalgalarinda-girisim	yazı-çizgi	30
375	su-dalgalarinda-girisim	yazı-çizgi	P
375	tork-denge	yazı-çizgi	O
375	tork-denge	yazı-çizgi	x (m)
375	turev-teget	işaret	y = -1,75
375	turev-teget	kenar	y
375	turev-teget	yazı-yazı	1 × B
375	turev-teget	yazı-çizgi	-1
375	turev-teget	yazı-çizgi	-1,25
375	turev-teget	yazı-çizgi	-2
375	turev-teget	yazı-çizgi	-2,25
375	turev-teget	yazı-çizgi	-3,25
375	turev-teget	yazı-çizgi	1
375	turev-teget	yazı-çizgi	2,25
375	turev-teget	yazı-çizgi	3,25
375	turev-teget	yazı-çizgi	B
375	turev-teget	yazı-çizgi	y = -0,75
375	turev-teget	yazı-çizgi	y = -1,75
375	turev-teget	yazı-çizgi	y = 0,25
375	turev-teget	yazı-çizgi	y = 2,25
375	turev-teget	yazı-çizgi	y = 3,25
375	turev-teget	yazı-çizgi	y = 4,25
375	turev-teget	yazı-çizgi	y = 5,25
375	turev-teget	yazı-çizgi	y = 6,25
375	turkiye-bitkileri	yazı-çizgi	Özgün kesit
375	turkiye-ic-kuvvetler	yazı-çizgi	Graben
375	turkiye-ic-kuvvetler	yazı-çizgi	Kesit · tabakalar bükülür
375	turkiye-iklimi	kenar	0
375	turkiye-iklimi	kenar	1500
375	turkiye-iklimi	kenar	3000
375	turkiye-iklimi	yazı-çizgi	1500
375	turkiye-iklimi	yazı-çizgi	3000
375	tyt-geo-dik-prizmalar-032	yazı-çizgi	h
375	tyt-geo-paralelkenar-ozel-dortgenler-032	yazı-çizgi	h
375	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	B
375	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	C
375	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	G
375	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	I
375	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	O
375	tyt-geo-ucgen-merkezleri-031	yazı-çizgi	r
375	tyt-geo-ucgende-acilar-031	yazı-çizgi	C
375	tyt-mat-dogrusal-denklemler-kaynak-036	kenar	0
375	ureme-embriyonik-gelisim	yazı-çizgi	Boşluk
375	varlik-felsefesi	kenar	1
375	varlik-felsefesi	kenar	2
375	yatay-atis	yazı-çizgi	0
375	zayif-etkilesimler	yazı-çizgi	δ+
375	zayif-etkilesimler	yazı-çizgi	δ−
1280	ayt-karmasik-sayilar	yazı-çizgi	-20
1280	ayt-karmasik-sayilar	yazı-çizgi	-21
1280	ayt-karmasik-sayilar	yazı-çizgi	-32
1280	ayt-karmasik-sayilar	yazı-çizgi	20
1280	ayt-karmasik-sayilar	yazı-çizgi	21
1280	ayt-karmasik-sayilar	yazı-çizgi	32
1280	ayt-karmasik-sayilar	yazı-çizgi	z/s
1280	ayt-parabol	işaret	T/1/2
1280	ayt-parabol	yazı-çizgi	y
1280	kovalent-adlandirma-metalik-bag	yazı-çizgi	N
320	ayt-karmasik-sayilar	yazı-çizgi	-20
320	ayt-karmasik-sayilar	yazı-çizgi	-21
320	ayt-karmasik-sayilar	yazı-çizgi	-32
320	ayt-karmasik-sayilar	yazı-çizgi	20
320	ayt-karmasik-sayilar	yazı-çizgi	21
320	ayt-karmasik-sayilar	yazı-çizgi	32
320	ayt-parabol	işaret	T/1/2
320	ayt-parabol	yazı-çizgi	y
320	kovalent-adlandirma-metalik-bag	yazı-çizgi	N
375	ayt-karmasik-sayilar	yazı-çizgi	-20
375	ayt-karmasik-sayilar	yazı-çizgi	-21
375	ayt-karmasik-sayilar	yazı-çizgi	-32
375	ayt-karmasik-sayilar	yazı-çizgi	20
375	ayt-karmasik-sayilar	yazı-çizgi	21
375	ayt-karmasik-sayilar	yazı-çizgi	32
375	ayt-parabol	işaret	T/1/2
375	ayt-parabol	yazı-çizgi	y
375	kovalent-adlandirma-metalik-bag	yazı-çizgi	N
`
    .split("\n")
    .filter(Boolean),
);

for (const width of [320, 375, 1280])
  for (let group = 0; group < GROUPS; group++)
    test(`054 lab labels stay clear at ${width}px (grup ${group + 1}/${GROUPS})`, async ({ page }) => {
      test.setTimeout(600_000);
      await page.setViewportSize({ width, height: 900 });
      const issues: string[] = [];
      let known = 0;
      for (const guide of GUIDES.filter((_, i) => i % GROUPS === group)) {
        await openGuideDrawings(page, guide);
        const r = (await page.evaluate(svgLayoutAudit, { labsOnly: true, explore: true, points: 3 })) as {
          issues: Issue[];
        };
        for (const i of r.issues) {
          const key = [width, guide, i.kind, i.s].join("\t");
          // LAB_KNOWN_OUT records every clash (used once to write KNOWN).
          if (process.env.LAB_KNOWN_OUT) appendFileSync(process.env.LAB_KNOWN_OUT, key + "\n");
          if (KNOWN.has(key)) known++;
          else issues.push(issueLine(guide, i));
        }
      }
      test.info().annotations.push({ type: "bilinen lab borcu", description: String(known) });
      expect(issues, issues.join("\n")).toEqual([]);
    });

/*
 * The spherical mirror lab: both mirror types, four focal lengths and every
 * whole object distance from 3 to 80 cm. Neither "F", "Cisim" nor "Görüntü"
 * may touch a ray or another label in any of these 624 states.
 */
for (const width of [320, 375, 1280])
  test(`054 küresel ayna laboratuvarı her konumda temiz at ${width}px`, async ({ page }) => {
    test.setTimeout(240_000);
    await page.setViewportSize({ width, height: 900 });
    await openGuideDrawings(page, "kuresel-aynalar");
    const lab = page.locator('[data-forge014="kuresel-aynalar"]');
    await expect(lab.locator("svg")).toBeVisible();
    const issues: string[] = [];
    const set = (what: "select" | "focal" | "u", value: string | number) =>
      lab.evaluate(
        async (host, [what, value]) => {
          const el =
            what === "select"
              ? host.querySelector("select")!
              : host.querySelectorAll<HTMLInputElement>('input[type="range"]')[what === "focal" ? 0 : 1];
          const proto = el instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
          Object.getOwnPropertyDescriptor(proto, "value")!.set!.call(el, String(value));
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
          await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        },
        [what, value] as const,
      );
    let states = 0;
    for (const kind of ["concave", "convex"])
      for (const focal of [5, 10, 15, 20]) {
        await set("select", kind);
        await set("focal", focal);
        for (let u = 3; u <= 80; u++) {
          await set("u", u);
          const r = (await page.evaluate(svgLayoutAudit, { scope: '[data-forge014="kuresel-aynalar"]' })) as {
            issues: Issue[];
          };
          states++;
          for (const i of r.issues) issues.push(`${kind} f=${focal} u=${u} · ${i.kind} · ${i.s} · ${i.px}px`);
        }
      }
    expect(states).toBe(624);
    expect(issues, issues.join("\n")).toEqual([]);
  });
