import Image from "next/image";
import type { IntroSection } from "./types";

/* ─── Helper: render title with italic spans ─────────── */

function renderTitle(title: string, titleItalic?: string) {
  if (!titleItalic) return title;

  const parts = title.split(titleItalic);
  if (parts.length < 2) return title;

  return (
    <>
      {parts[0]}
      <em className="text-coral">{titleItalic}</em>
      {parts.slice(1).join(titleItalic)}
    </>
  );
}

/* ─── Label with gold lines ──────────────────────────── */

function Label({
  text,
  centered = false,
}: {
  text: string;
  centered?: boolean;
}) {
  return (
    <p
      className={`mb-6 flex items-center gap-4 text-[0.55rem] font-medium uppercase tracking-[0.5em] text-gold ${
        centered ? "justify-center" : ""
      }`}
    >
      <span className="h-px w-8 bg-gold" aria-hidden="true" />
      {text}
      <span className="h-px w-8 bg-gold" aria-hidden="true" />
    </p>
  );
}

/* ─── CTA (btn-line style) ───────────────────────────── */

function CTALine({
  label,
  url,
}: {
  label: string;
  url: string;
}) {
  return (
    <a
      href={url}
      className="mt-8 inline-flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-ocean-deep transition-opacity hover:opacity-70"
    >
      {label}
      <span className="block h-px w-8 bg-ocean-deep" aria-hidden="true" />
    </a>
  );
}

/* ─── Simple (no images) ─────────────────────────────── */

function IntroSimple({ data }: { data: IntroSection }) {
  return (
    <section className="mx-auto max-w-[800px] px-12 py-20 text-center">
      {data.label && <Label text={data.label} centered />}

      <h2 className="mb-5 font-heading text-[clamp(1.8rem,3vw,2.4rem)] font-light leading-[1.3] text-ocean-deep">
        {renderTitle(data.title, data.titleItalic)}
      </h2>

      <p className="text-[0.92rem] font-light leading-[1.85] text-text-light">
        {data.body}
      </p>

      {data.cta && <CTALine label={data.cta.label} url={data.cta.url} />}
    </section>
  );
}

/* ─── With Images (homepage about pattern) ───────────── */

function IntroWithImages({ data }: { data: IntroSection }) {
  const { images } = data;
  if (!images) return null;

  return (
    <section className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-12 py-32 lg:grid-cols-2">
      {/* Left: overlapping images */}
      <div className="relative">
        <div className="relative w-[85%]">
          <Image
            src={images.main.url}
            alt={images.main.alt}
            width={images.main.width ?? 800}
            height={images.main.height ?? 1067}
            className="aspect-[3/4] object-cover"
            sizes="(max-width: 1024px) 85vw, 42vw"
            {...(images.main.blurhash
              ? { placeholder: "blur", blurDataURL: images.main.blurhash }
              : {})}
          />
        </div>

        {images.float && (
          <div className="absolute bottom-[-2rem] right-0 w-[55%]">
            <Image
              src={images.float.url}
              alt={images.float.alt}
              width={images.float.width ?? 600}
              height={images.float.height ?? 450}
              className="aspect-[4/3] border-[6px] border-white object-cover shadow-xl"
              sizes="(max-width: 1024px) 55vw, 24vw"
              {...(images.float.blurhash
                ? { placeholder: "blur", blurDataURL: images.float.blurhash }
                : {})}
            />
          </div>
        )}

        {data.yearOverlay && (
          <span
            className="absolute right-8 top-[-1rem] font-heading text-[7rem] font-light text-sand-dark/40"
            aria-hidden="true"
          >
            {data.yearOverlay}
          </span>
        )}
      </div>

      {/* Right: text column */}
      <div>
        {data.label && <Label text={data.label} />}

        <h2 className="mb-5 font-heading text-[clamp(1.8rem,3vw,2.4rem)] font-light leading-[1.3] text-ocean-deep">
          {renderTitle(data.title, data.titleItalic)}
        </h2>

        <p className="text-[0.92rem] font-light leading-[1.85] text-text-light">
          {data.body}
        </p>

        {data.cta && <CTALine label={data.cta.label} url={data.cta.url} />}
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
