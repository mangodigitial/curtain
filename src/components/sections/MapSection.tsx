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
    <section className="map-section">
      <div className="map-section-inner">
        {/* Text column */}
        <div>
          <h2>
            {renderTitle(data.title, data.titleItalic, "")}
          </h2>

          <div
            className="map-section-body"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
        </div>

        {/* Map image */}
        <Image
          src={data?.image?.url}
          alt={data?.image?.alt}
          width={data?.image?.width ?? 700}
          height={data?.image?.height ?? 500}
        />
      </div>
    </section>
  );
}
