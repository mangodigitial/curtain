"use client";

import { useState, useEffect } from "react";

/* ─── Props ──────────────────────────────────────────── */

interface BookingBarProps {
  bookingUrl: string;
}

/* ─── BookingBar ─────────────────────────────────────── */

export default function BookingBar({ bookingUrl }: BookingBarProps) {
  const [visible, setVisible] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.5;
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const inputClasses =
    "font-body text-[0.7rem] py-2 px-3.5 border border-white/15 bg-white/[0.06] text-sand outline-none transition-colors duration-200 focus:border-gold/40";

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-ocean-deep z-[900] transition-transform duration-500 ease-in-out flex justify-center items-center gap-4 px-12 py-3 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Italic Prompt */}
      <span className="hidden md:inline font-heading text-base font-light italic text-sand mr-4">
        Begin your escape
      </span>

      {/* Check-in */}
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className={inputClasses}
        aria-label="Check-in date"
      />

      {/* Check-out */}
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className={inputClasses}
        aria-label="Check-out date"
      />

      {/* Guests */}
      <select
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        className={inputClasses}
        aria-label="Number of guests"
      >
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <option key={n} value={String(n)}>
            {n} {n === 1 ? "Guest" : "Guests"}
          </option>
        ))}
      </select>

      {/* CTA */}
      <a
        href={`${bookingUrl}${checkIn ? `?checkin=${checkIn}` : ""}${checkOut ? `&checkout=${checkOut}` : ""}${guests ? `&guests=${guests}` : ""}`}
        className="text-[0.6rem] tracking-[0.25em] uppercase font-medium py-2.5 px-7 bg-coral text-white hover:bg-gold transition-colors duration-300"
      >
        Check Availability
      </a>
    </div>
  );
}
