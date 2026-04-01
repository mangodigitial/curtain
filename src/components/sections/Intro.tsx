import Image from "next/image";
import type { IntroSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Simple (no images) ─────────────────────────────── */

function IntroSimple({ data }: { data: IntroSection }) {
  return (
    <section className="intro reveal" style={{ gridTemplateColumns: "1fr", maxWidth: 800, textAlign: "center" }}>
      <div>
        {data.label && (
          <div className="section-label" style={{ justifyContent: "center" }}>
            {data.label}
          </div>
        )}

        <h2 className="section-heading">
          {renderTitle(data.title, data.titleItalic, "")}
        </h2>

        <p className="section-body" style={{ margin: "0 auto" }}>
          {data.body}
        </p>

        {data?.cta && (
          <a href={data?.cta?.url} className="btn-line">
            {data?.cta?.label} <span className="arrow" />
          </a>
        )}
      </div>
    </section>
  );
}

/* ─── With Images (homepage about pattern) ───────────── */

function IntroWithImages({ data }: { data: IntroSection }) {
  const { images } = data;
  if (!images) return null;

  return (
    <section className="intro reveal">
      {/* Left: overlapping images */}
      <div className="intro-visual">
        {data.yearOverlay && (
          <div className="intro-year" aria-hidden="true">
            {data.yearOverlay}
          </div>
        )}

        <Image
          src={images?.main?.url}
          alt={images?.main?.alt}
          width={images?.main?.width ?? 800}
          height={images?.main?.height ?? 1067}
          className="intro-img-main"
          sizes="(max-width: 900px) 85vw, 42vw"
          {...(images?.main?.blurhash
            ? { placeholder: "blur" as const, blurDataURL: images?.main?.blurhash }
            : {})}
        />

        {images?.float && (
          <Image
            src={images?.float?.url}
            alt={images?.float?.alt}
            width={images?.float?.width ?? 600}
            height={images?.float?.height ?? 450}
            className="intro-img-float"
            sizes="(max-width: 900px) 55vw, 24vw"
            {...(images?.float?.blurhash
              ? { placeholder: "blur" as const, blurDataURL: images?.float?.blurhash }
              : {})}
          />
        )}
      </div>

      {/* Right: text column */}
      <div className="intro-text">
        {data.label && (
          <div className="section-label">{data.label}</div>
        )}

        <h2 className="section-heading">
          {renderTitle(data.title, data.titleItalic, "")}
        </h2>

        <p className="section-body">{data.body}</p>

        {data?.cta && (
          <a href={data?.cta?.url} className="btn-line">
            {data?.cta?.label} <span className="arrow" />
          </a>
        )}
      </div>
    </section>
  );
}

/* ─── Main Export ─────────────────────────────────────── */

export default function Intro({ data }: { data: IntroSection }) {
  if (data.images) {
    return <IntroWithImages data={data} />;
  }
  return <IntroSimple data={data} />;
}
