import Image from "next/image";
import type { VideoSection } from "./types";

/* ─── Helpers ─────────────────────────────────────────── */

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/,
  );
  return match ? match[1] : null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

/* ─── Main Export ─────────────────────────────────────── */

export default function Video({ data }: { data: VideoSection }) {
  const youtubeId = getYouTubeId(data.url);
  const vimeoId = getVimeoId(data.url);
  const isEmbed = youtubeId || vimeoId;

  let embedSrc = "";
  if (youtubeId) {
    embedSrc = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`;
  } else if (vimeoId) {
    embedSrc = `https://player.vimeo.com/video/${vimeoId}`;
  }

  return (
    <section className="mx-auto max-w-[1200px] px-12 py-8">
      <div className="relative aspect-video overflow-hidden">
        {isEmbed ? (
          <iframe
            src={embedSrc}
            title={data.title ?? "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={data.url}
              poster={data.poster?.url}
              controls
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              Your browser does not support the video element.
            </video>

            {/* Poster fallback for SSR / no-JS */}
            {data.poster && (
              <Image
                src={data.poster.url}
                alt={data.poster.alt}
                fill
                className="pointer-events-none object-cover"
                aria-hidden="true"
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
