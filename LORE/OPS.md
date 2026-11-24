# İşletim ve doğrulama

1. Uzak ana dalı, açık PR’ları ve devam eden yayınları doğrula. Yerel değişiklikleri koru. Yayımdaki kaynak tamamlanana kadar sonraki işi ayrı dalda hazırla.
2. npm run check, npm test, npm run build ve npm run test:e2e çalıştır. Değişikliği uygulamanın normal girişinde sınayarak çevrimdışı kullanım ve eski kayıtları kontrol et. Web, yerel paket ve fiziksel cihaz sonuçlarını ayrı bildir.
3. Ekran değişikliklerinde dar görünümü, büyük yazıyı, klavyeyi ve azaltılmış hareketi dene. Aion için onaylı referansı kullan ve gerçek animasyon karelerini incele. [AIONIA](../docs/AIONIA_STANDARD.md) · [Sanat](../docs/ART_BIBLE.md) · [Kalite](../docs/QA.md)
4. Doğrulanmış aşamayı ana dala al. GitHub Actions sonuçlarını tam commit ile eşleştir. GitHub Pages ve Cloudflare sürümü, ders açılışı ve kayıt davranışı ayrı kontrol edilir. Tam ana dal CI sonucunu bekleyen Cloudflare dağıtımı varsa doğru commit’in mevcut işi üzerinden ilerle.
5. Durumu [güncel dosyada](STATUS.md), ayrıntılı kanıtı [Forge geçmişinde](../FORGE.md) kaydet.

[GitHub iş akışları](../.github/workflows/) · [GitHub Pages](https://kaansavukduran.github.io/yksmania/) · [Cloudflare Pages](https://yksmania.pages.dev/)
