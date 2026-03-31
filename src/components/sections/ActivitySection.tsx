import Image from "next/image";
import type { ActivitySection as ActivitySectionType } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function ActivitySection({
  data,
  index,
}: {
  data: ActivitySectionType;
  index: number;
}) {
  return (
    <section className="py-24 first:pt-28">
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 items-center gap-[4.5rem] px-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ── Image Mosaic ──────────────────────────────── */}
        <div className="relative grid grid-cols-2 grid-rows-2 gap-2">
          {/* Main image spanning both columns */}
          <div className="col-span-2 overflow-hidden">
            <Image
              src={data.images.main.url}
              alt={data.images.main.alt}
              width={data.images.main.width ?? 960}
              height={data.images.main.height ?? 600}
              className="aspect-[16/10] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 55vw"
              {...(data.images.main.blurhash
                ? { placeholder: "blur" as const, blurDataURL: data.images.main.blurhash }
                : {})}
            />

            {data.badge && (
              <span className="absolute left-4 top-4 bg-coral px-3 py-1.5 text-[0.5rem] uppercase tracking-[0.3em] text-white">
                {data.badge}
              </span>
            )}
          </div>

          {/* Two smaller images */}
          {data.images.small.slice(0, 2).map((img) => (
            <div key={img.id} className="overflow-hidden">
              <Image
                src={img.url}
                alt={img.alt}
                width={img.width ?? 480}
                height={img.height ?? 360}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                sizes="(max-width: 1024px) 50vw, 27vw"
                {...(img.blurhash
                  ? { placeholder: "blur" as const, blurDataURL: img.blurhash }
                  : {})}
              />
            </div>
          ))}
        </div>

        {/* ── Content ───────────────────────────────────── */}
        <div>
          <h2 className="mb-4 font-heading text-[clamp(1.8rem,3vw,2.6rem)] font-light leading-[1.15] text-ocean-deep">
            {data.name}
            {data.nameItalic && (
              <>
                {" "}
                <em className="text-coral">{data.nameItalic}</em>
              </>
            )}
          </h2>

          <p className="mb-6 text-[0.85rem] font-light leading-[1.85] text-text-light">
            {data.description}
          </p>

          {/* Highlights */}
          {data.highlights.length > 0 && (
            <ul className="mb-6 grid grid-cols-2 gap-2.5">
              {data.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-2 text-[0.75rem] font-light text-text"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          {data.cta && (
            <a
              href={data.cta.url}
              className="group inline-flex items-center gap-2.5 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-ocean-deep"
            >
              {data.cta.label}
              <span className="inline-flex items-center">
                <span className="block h-px w-7 bg-current transition-all duration-300 group-hover:w-10" />
                <span className="-ml-1.5 block h-0 w-0 border-y-[3px] border-l-[5px] border-y-transparent border-l-current" />
              </span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
