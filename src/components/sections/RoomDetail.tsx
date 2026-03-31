"use client";

import { useState } from "react";
import Image from "next/image";
import type { RoomDetailSection } from "./types";

/* ─── Helper: render name with italic spans ──────────── */

function renderName(name: string, nameItalic?: string) {
  if (!nameItalic) return name;

  const parts = name.split(nameItalic);
  if (parts.length < 2) return name;

  return (
    <>
      {parts[0]}
      <em className="text-coral">{nameItalic}</em>
      {parts.slice(1).join(nameItalic)}
    </>
  );
}

/* ─── Image Carousel ─────────────────────────────────── */

function Carousel({ images }: { images: RoomDetailSection["images"] }) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  function prev() {
    setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  }

  function next() {
    setCurrent((c) => (c === total - 1 ? 0 : c + 1));
  }

  return (
    <div className="relative overflow-hidden">
      {/* Track */}
      <div
        className="flex transition-transform duration-[600ms]"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {images.map((img) => (
          <div key={img.id} className="w-full flex-none">
            <Image
              src={img.url}
              alt={img.alt}
              width={img.width ?? 1200}
              height={img.height ?? 900}
              className="aspect-[4/3] w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
              {...(img.blurhash
                ? { placeholder: "blur", blurDataURL: img.blurhash }
                : {})}
            />
          </div>
        ))}
      </div>

      {/* Counter */}
      <span className="absolute left-4 top-4 bg-ocean-deep/50 px-3 py-1 font-heading text-[0.85rem] text-white backdrop-blur">
        {current + 1} / {total}
      </span>

      {/* Controls */}
      {total > 1 && (
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          <button
            onClick={prev}
            aria-label="Previous image"
            className="flex h-10 w-10 items-center justify-center bg-ocean-deep/70 text-sand backdrop-blur transition-colors hover:bg-coral"
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
            className="flex h-10 w-10 items-center justify-center bg-ocean-deep/70 text-sand backdrop-blur transition-colors hover:bg-coral"
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
        className="flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-ocean-deep transition-opacity hover:opacity-70"
        aria-expanded={open}
      >
        Amenities
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
        <ul className="mt-4 grid grid-cols-2 gap-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-[0.75rem] text-text-light"
            >
              <span
                className="h-1.5 w-1.5 flex-none rounded-full bg-gold"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────── */

export default function RoomDetail({ data }: { data: RoomDetailSection }) {
  return (
    <section className="mx-auto grid max-w-[1300px] grid-cols-1 items-start gap-16 px-12 lg:grid-cols-[1.15fr_0.85fr]">
      {/* Left: Carousel */}
      <Carousel images={data.images} />

      {/* Right: Details sidebar */}
      <div className="sticky top-[100px]">
        {/* Label */}
        <p className="mb-3 flex items-center gap-3 text-[0.55rem] font-medium uppercase tracking-[0.5em] text-gold">
          <span className="h-px w-8 bg-gold" aria-hidden="true" />
          {data.label}
        </p>

        {/* Name */}
        <h2 className="mb-5 font-heading text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-[1.15] text-ocean-deep">
          {renderName(data.name, data.nameItalic)}
        </h2>

        {/* Description */}
        <p className="mb-8 text-[0.85rem] font-light leading-[1.85] text-text-light">
          {data.description}
        </p>

        {/* Stats grid */}
        {data.stats.length > 0 && (
          <div className="mb-8 grid grid-cols-3 gap-px bg-sand-dark">
            {data.stats.map((stat) => (
              <div key={stat.label} className="bg-white p-5 text-center">
                <span className="block font-heading text-[1.6rem] text-ocean-deep">
                  {stat.value}
                </span>
                <span className="text-[0.55rem] uppercase tracking-[0.2em] text-text-light">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Amenities */}
        {data.amenities.length > 0 && <Amenities items={data.amenities} />}

        {/* Book CTA */}
        {data.ctaUrl && (
          <a
            href={data.ctaUrl}
            className="mt-8 inline-flex items-center gap-3 bg-ocean-deep px-8 py-3.5 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-white transition-colors hover:bg-coral"
          >
            {data.ctaLabel ?? "Book Now"}
            <span className="block h-px w-8 bg-white/40" aria-hidden="true" />
          </a>
        )}
      </div>
    </section>
  );
}
