import Image from "next/image";
import type { MapSection as MapSectionType } from "./types";
import { renderTitle } from "./render-title";

/* ─── Main Export ─────────────────────────────────────── */

export default function MapSectionComponent({
  data,
}: {
  data: MapSectionType;
}) {
  return (
    <section className="bg-sand-light px-12 py-20">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 lg:grid-cols-[0.4fr_0.6fr]">
        {/* Text column */}
        <div>
          <h2 className="mb-4 font-heading text-[clamp(1.6rem,2.5vw,2.2rem)] font-light text-ocean-deep">
            {renderTitle(data.title, data.titleItalic)}
          </h2>

          <div
            className="text-[0.88rem] font-light leading-[1.85] text-text-light [&_p]:mb-4"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
        </div>

        {/* Map image */}
        <Image
          src={data.image.url}
          alt={data.image.alt}
          width={data.image.width ?? 700}
          height={data.image.height ?? 500}
          className="w-full border border-sand-dark"
        />
      </div>
    </section>
  );
}
