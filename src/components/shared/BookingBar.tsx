"use client";

import { useState, useEffect, useMemo } from "react";

/* ─── Helpers ────────────────────────────────────────── */

/** Return a YYYY-MM-DD string for a Date (local time). */
function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Add `days` calendar days to a YYYY-MM-DD string. */
function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return toDateStr(d);
}

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

  /* Today's date string (stable for the lifetime of the mount). */
  const today = useMemo(() => toDateStr(new Date()), []);

  /* Checkout must be at least the day after check-in. */
  const checkOutMin = checkIn ? addDays(checkIn, 1) : today;

  /* If the user picks a new check-in that pushes past the current
     check-out, reset check-out so it never precedes check-in. */
  const handleCheckIn = (value: string) => {
    setCheckIn(value);
    if (checkOut && value && checkOut <= value) {
      setCheckOut(addDays(value, 1));
    }
  };

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
        min={today}
        placeholder="Check-in"
        onChange={(e) => handleCheckIn(e.target.value)}
        aria-label="Check-in date"
      />

      {/* Check-out */}
      <input
        type="date"
        value={checkOut}
        min={checkOutMin}
        placeholder="Check-out"
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
