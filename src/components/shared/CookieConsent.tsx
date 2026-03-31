"use client";

import { useState, useEffect, useCallback } from "react";

/* ─── Types ──────────────────────────────────────────── */

interface ConsentState {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_NAME = "cookie_consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

/* ─── Helpers ────────────────────────────────────────── */

function getConsentCookie(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`),
  );
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

function setConsentCookie(consent: ConsentState) {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

/* ─── Toggle Switch ──────────────────────────────────── */

function Toggle({
  label,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
          checked ? "bg-coral" : "bg-white/20"
        } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
      <span className="text-[0.65rem] uppercase tracking-[0.15em] text-sand font-light">
        {label}
      </span>
    </label>
  );
}

/* ─── CookieConsent ──────────────────────────────────── */

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const existing = getConsentCookie();
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const save = useCallback(
    (state: ConsentState) => {
      setConsentCookie(state);
      setVisible(false);
    },
    [],
  );

  const acceptAll = () => {
    const all: ConsentState = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setConsent(all);
    save(all);
  };

  const savePreferences = () => {
    save(consent);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 sm:bottom-4 left-0 right-0 z-[950] bg-ocean-deep text-sand px-8 py-6">
      <h3 className="font-heading text-lg text-sand mb-2">
        We value your privacy
      </h3>
      <p className="text-[0.75rem] text-sand-dark font-light mb-4">
        We use cookies to enhance your browsing experience, serve personalized
        content, and analyze our traffic. Please choose your preferences below.
      </p>

      {/* Toggles */}
      <div className="flex flex-wrap gap-6 mb-5">
        <Toggle
          label="Essential"
          checked={consent.essential}
          disabled
          onChange={() => {}}
        />
        <Toggle
          label="Analytics"
          checked={consent.analytics}
          onChange={(v) => setConsent((s) => ({ ...s, analytics: v }))}
        />
        <Toggle
          label="Marketing"
          checked={consent.marketing}
          onChange={(v) => setConsent((s) => ({ ...s, marketing: v }))}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={acceptAll}
          className="text-[0.65rem] tracking-[0.2em] uppercase font-medium px-7 py-2.5 bg-coral text-white hover:bg-gold transition-colors duration-300"
        >
          Accept All
        </button>
        <button
          onClick={savePreferences}
          className="text-[0.65rem] tracking-[0.2em] uppercase font-medium px-7 py-2.5 border border-white/20 text-sand hover:bg-white/10 transition-colors duration-300"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
