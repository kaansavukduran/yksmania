# YKSMania 0.20.0 alpha 1

Sekiz yeni interaktif ünite: çokgenler, dörtgen aileleri, yamuk–deltoid, paralelkenar ailesi, dik prizmalar, piramitler, kaynakla açı pekiştirme ve asal sayılar. Yeni pakette 88 anlatım bölümü, 46 çözümlü örnek, 44 hatırlama ve 134 özgün beş seçenekli soru vardır. Şekli veya ölçüleri değiştirince ilgili hesaplar da değişir; asal eleği ve çarpan dikdörtgenleri adım adım açıklama sunar.

Toplam 494 ayrıntılı rehber, 494 ayrı kopya kağıdı ve 6.077 özgün soru bulunur. 3.437 soruda tam kademeli yardım hazır; 2.640 eski kartın bütün yardım aşamaları henüz tamamlanmadı. Öğrenci PDF veya kaynak yüklemez. Eski kimlikler, cevaplar, notlar, yarım çalışmalar, denemeler, bilinçli kullanıcı tercihleri ve özgün 3/7/21 tarihleri korunur.

## İndir ve aç

- [Windows Setup](https://github.com/kaansavukduran/yksmania/releases/download/v0.20.0-alpha.1/YKSMania-0.20.0-Windows-x64-Setup.exe): indir, dosyaya çift tıkla ve kurulum adımlarını izle.
- [Windows Portable](https://github.com/kaansavukduran/yksmania/releases/download/v0.20.0-alpha.1/YKSMania-0.20.0-Windows-x64-Portable.exe): indir ve çalıştır. Windows paketinin uygulama gövdesi CI’de denetlendi; Portable.exe başlatıcısının temiz bilgisayarda açılışı/taşınması ayrıca sınanmadı.
- [Linux AppImage](https://github.com/kaansavukduran/yksmania/releases/download/v0.20.0-alpha.1/YKSMania-0.20.0-Linux-x86_64.AppImage): indirdiğin klasörde `chmod +x YKSMania-0.20.0-Linux-x86_64.AppImage`, sonra `./YKSMania-0.20.0-Linux-x86_64.AppImage` çalıştır.
- [Linux DEB](https://github.com/kaansavukduran/yksmania/releases/download/v0.20.0-alpha.1/YKSMania-0.20.0-Linux-amd64.deb): indirdiğin klasörde `sudo apt install ./YKSMania-0.20.0-Linux-amd64.deb` çalıştır.
- [Web uygulaması](https://kaansavukduran.github.io/yksmania/): ilk yüklemenin ardından uygulama içi öğretim ve kayıtlar çevrimdışı kullanılabilir. Videolar internet gerektirir.

Android kişisel test APK’sı ayrı tutulur; bu genel Release’te APK yoktur. Fiziksel Android kurulum/ilk açılış henüz kabul edilmedi.

## Doğrulama

Kaynak [387fc3ea](https://github.com/kaansavukduran/yksmania/commit/387fc3ea7f43e39d64e0c1e5f062372969a0ebeb), [başarılı main CI](https://github.com/kaansavukduran/yksmania/actions/runs/44070229171) ve release etiketi aynı commit’e bağlıdır. 1.841 birim ve 1.265 tarayıcı testi geçti; fail/skip/flaky/retry sıfırdır. Gerçek paketli Windows/Linux ve [Pages hattının](https://github.com/kaansavukduran/yksmania/actions/runs/44074567259) prefix/HTTPS yayın kontrolleri 107’şer çevrimdışı model akışını geçti; renderer hatası sıfırdır. Yayındaki 291 dosya normal TLS ile sabit derlemeyle eşleşti. Yayımlanan AppImage ayrıca gerçek indirilmiş arşivden çalıştırılıp 107 akışı geçti.

Dört masaüstü dosyası başarılı CI’nin çıktılarından yeniden derlenmeden yayımlandı. `verified-run.json` kaynak ve CI durumunu; `SHA256SUMS.txt` beş dosyanın SHA-256 değerini bağlar. Beş manifest kaydı GitHub varlık digest’leriyle eşleşti. Fiziksel cihaz, temiz kurulum, Windows portable taşıma ve native iki sürüm kurulumu bu kabul değildir.

## Bilinen sorun ve kaynak sınırı

**F032-DESKTOP-EXTERNAL-001, Orta, açık:** 0.20.0 masaüstü uygulamasında YouTube/OGM/ÖSYM ders bağlantıları dış tarayıcıyı açmıyor. Bu bağlantılar için şimdilik web sürümünü kullan. Çevrimdışı öğretim ve sorular etkilenmez. 107 çekirdek akış dış OS dispatch’ini kapsamıyordu; gerçek yayımlanan AppImage’de ayrı tıklama deneyi sorunu doğruladı. İzole 0.21 adayında 55 politika testi ve altı normal kaynak Electron bağlantı tıklaması geçti; süreç yeniden açılışı ve kayıtlar korundu. Bu kaynak kabulü, paketlenmiş/yayımlanmış 0.21 veya mevcut 0.20 indirmelerinin düzeldiği anlamına gelmez. Gerçek dış tarayıcı/video oynatma bu recorder deneyiyle doğrulanmadı.

Güncel Aurelia/YKS envanteri 8.936 PDF’dir: 2 doğrulanmış tam aktarım, 7 doğrulanmış kısmi aktarım ve 8.927 belirsiz kayıt. Belirsiz hiç işlenmemiş anlamına gelmez. Bütün MEB/OGM alt kazanımları, PDF’ler ve resmî ÖSYM arşivi tamamlanmadı. Video eşlemesi bütün güncel oynatımların kabulü değildir. Ayrıntı repo içindeki `docs/PDF_SOURCE_PROGRESS032.md` ve `docs/QA.md` dosyalarındadır. Vercel’in son doğrulanan durumu hesap sınırından HTTP 402’dir; erişilebilir web yayını Pages’tir.
