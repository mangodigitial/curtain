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

  return (
    <div className={`book-bar${visible ? " visible" : ""}`}>
      {/* Italic Prompt */}
      <span className="book-bar-text">Begin your escape</span>

      {/* Check-in */}
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        aria-label="Check-in date"
      />

      {/* Check-out */}
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        aria-label="Check-out date"
      />

      {/* Guests */}
      <select
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
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
        className="book-bar-btn"
      >
        Check Availability
      </a>
    </div>
  );
}
