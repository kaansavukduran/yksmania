import { useId } from "react";
import { ExternalLink, PlayCircle } from "lucide-react";
import { getLessonVideos031, type LessonVideo031 } from "./videoCatalog031";
import "./videoRecommendations031.css";

function VideoLinks031({ videos }: { videos: readonly LessonVideo031[] }) {
  return (
    <ul className="video-links031">
      {videos.map((video) => (
        <li key={video.url}>
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            <span className="video-channel031">
              <span>{video.channel}</span>
              <ExternalLink size={17} aria-hidden="true" />
            </span>
            <span className="video-topic031">{video.topics.join(" · ")}</span>
            {video.detail && (
              <span className="video-detail031">{video.detail}</span>
            )}
            <span className="sr-only">YouTube’da yeni sekmede açılır</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function VideoRecommendations031({ lessonId }: { lessonId: string }) {
  const videos = getLessonVideos031(lessonId);
  const titleId = useId();
  if (!videos.recommended.length && !videos.alternatives.length) return null;
  return (
    <section
      className="video-recommendations031"
      aria-labelledby={titleId}
      data-video-lesson031={lessonId}
    >
      <h2 id={titleId}>
        <PlayCircle size={21} aria-hidden="true" />
        Konuyla ilgili videolar
      </h2>
      <p className="video-intro031">
        Başka bir anlatımla pekiştirmek istersen bu bağlantıları
        kullanabilirsin. Bir videonun kapsamı, kartındaki konu ve açıklamayla
        sınırlı olabilir.
      </p>
      <p className="video-connection031">
        Videolar YouTube’da açılır ve internet bağlantısı gerektirir.
        Çevrimdışıyken uygulamadaki anlatım ve sorularla çalışabilirsin.
      </p>
      {videos.recommended.length > 0 && (
        <div className="video-preferred031">
          <h3>Önerilen videolar</h3>
          <VideoLinks031 videos={videos.recommended} />
        </div>
      )}
      {videos.alternatives.length > 0 && (
        <details className="video-alternatives031">
          <summary>Alternatif videolar ({videos.alternatives.length})</summary>
          <VideoLinks031 videos={videos.alternatives} />
        </details>
      )}
      <p className="video-evidence031">
        Video bağlantısını açmak, konuyu tamamlandı olarak işaretlemez ve
        öğrenme puanı kazandırmaz.
      </p>
    </section>
  );
}
