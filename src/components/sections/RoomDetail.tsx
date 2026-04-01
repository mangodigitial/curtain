"use client";

import { useState } from "react";
import Image from "next/image";
import type { RoomDetailSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Image Carousel ─────────────────────────────────── */

function Carousel({ images }: { images: RoomDetailSection["images"] }) {
  const [current, setCurrent] = useState(0);
  const total = images?.length ?? 0;

  function prev() {
    setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  }

  function next() {
    setCurrent((c) => (c === total - 1 ? 0 : c + 1));
  }

  return (
    <div className="room-carousel">
      {/* Track */}
      <div
        className="room-carousel-track"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {(images ?? []).map((img) => (
          <div key={img.id}>
            <Image
              src={img.url}
              alt={img.alt}
              width={img.width ?? 1200}
              height={img.height ?? 900}
              sizes="(max-width: 1024px) 100vw, 58vw"
              {...(img.blurhash
                ? { placeholder: "blur", blurDataURL: img.blurhash }
                : {})}
            />
          </div>
        ))}
      </div>

      {/* Counter */}
      <span className="room-carousel-counter">
        {current + 1} / {total}
      </span>

      {/* Controls */}
      {total > 1 && (
        <div className="room-carousel-nav">
          <button
            onClick={prev}
            aria-label="Previous image"
            className="room-carousel-btn"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 3L5 8L10 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="room-carousel-btn"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Amenities Toggle ───────────────────────────────── */

function Amenities({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="room-amenities-toggle"
        aria-expanded={open}
      >
        Amenities
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={"chevron" + (open ? " open" : "")}
          aria-hidden="true"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="room-amenities-list">
          <ul className="room-amenities-grid">
            {(items ?? []).map((item) => (
              <li
                key={item}
                className="room-amenity"
              >
                <span aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────── */

export default function RoomDetail({ data }: { data: RoomDetailSection }) {
  return (
    <section className="room-detail">
      {/* Left: Carousel */}
      <Carousel images={data.images} />

      {/* Right: Details sidebar */}
      <div className="room-details">
        {/* Label */}
        <p className="room-type-label">
          {data.label}
        </p>

        {/* Name */}
        <h2 className="room-name">
          {renderTitle(data.name, data.nameItalic)}
        </h2>

        {/* Description */}
        <p className="room-desc">
          {data.description}
        </p>

        {/* Stats grid */}
        {(data?.stats?.length ?? 0) > 0 && (
          <div className="room-stats">
            {(data?.stats ?? []).map((stat) => (
              <div key={stat.label} className="room-stat">
                <span className="room-stat-val">
                  {stat.value}
                </span>
                <span className="room-stat-label">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Amenities */}
        {(data?.amenities?.length ?? 0) > 0 && <Amenities items={data?.amenities} />}

        {/* Book CTA */}
        {data.ctaUrl && (
          <a
            href={data.ctaUrl}
            className="room-cta"
          >
            {data.ctaLabel ?? "Book Now"}
          </a>
        )}
      </div>
    </section>
  );
}
