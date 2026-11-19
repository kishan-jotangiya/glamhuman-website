"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconArrow, IconClose, IconWhatsApp, Sparkle } from "./Icons";
import { BOOKED_EVENT, CITY, PHOTOS, openBooking, waLink } from "@/lib/data";
import { PRICING } from "@/lib/pricing";

// How often the "Book Now" popup appears for a visitor, and at most how many times per visit.
const INTERVAL_MS = 3 * 60 * 1000;
const MAX_PER_VISIT = 3;
const BOOKED_KEY = "gh-booked";
const SHOWN_KEY = "gh-popup-shown";

// Best real discount in the price list (ignores one-off promos above 90%)
const TOP_OFF = Math.max(
  ...PRICING.flatMap((c) => c.groups.flatMap((g) => g.items.map((i) => i.off))).filter(
    (o) => o < 90
  )
);

const alreadyBooked = () => {
  try {
    return sessionStorage.getItem(BOOKED_KEY) === "1";
  } catch {
    return false;
  }
};

const timesShown = () => {
  try {
    return Number(sessionStorage.getItem(SHOWN_KEY)) || 0;
  } catch {
    return 0;
  }
};
const countShown = () => {
  try {
    sessionStorage.setItem(SHOWN_KEY, String(timesShown() + 1));
  } catch {}
};

// Don't interrupt someone who is already booking or viewing something
function shouldSkip() {
  if (alreadyBooked() || document.hidden) return true;
  if (document.querySelector(".lightbox, .price-modal, .booking-modal, .nav.menu-open"))
    return true;
  const form = document.getElementById("book");
  if (!form) return false;
  if (form.contains(document.activeElement)) return true;
  const r = form.getBoundingClientRect();
  return r.top < window.innerHeight * 0.8 && r.bottom > window.innerHeight * 0.2; // form already on screen
}

export default function BookingPopup() {
  const [open, setOpen] = useState(false);
  const primaryRef = useRef(null);

  useEffect(() => {
    const onBooked = () => {
      try {
        sessionStorage.setItem(BOOKED_KEY, "1");
      } catch {}
      setOpen(false);
    };
    window.addEventListener(BOOKED_EVENT, onBooked);
    const timer = setInterval(() => {
      if (timesShown() >= MAX_PER_VISIT) return clearInterval(timer);
      if (shouldSkip()) return;
      countShown();
      setOpen(true);
    }, INTERVAL_MS);
    return () => {
      clearInterval(timer);
      window.removeEventListener(BOOKED_EVENT, onBooked);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    primaryRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  const goBook = () => {
    close();
    openBooking();
  };

  return (
    <div
      className="popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      onClick={close}
    >
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" type="button" aria-label="Close" onClick={close}>
          <IconClose />
        </button>
        <div className="popup-img">
          <Image src={PHOTOS.popup} alt="" fill sizes="(max-width: 640px) 100vw, 280px" />
          <span className="popup-tag">
            <Sparkle /> Up to {TOP_OFF}% off
          </span>
        </div>
        <div className="popup-body">
          <span className="eyebrow">
            <Sparkle /> At-home salon · {CITY}
          </span>
          <h3 id="popup-title">
            Ready for your <span className="italic">glow-up?</span>
          </h3>
          <p>
            Book a certified beautician to your home in under a minute. Free confirmation call, free
            travel on bookings of ₹500+.
          </p>
          <div className="popup-actions">
            <button ref={primaryRef} type="button" className="btn btn-primary" onClick={goBook}>
              Book Now <IconArrow />
            </button>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener"
              className="btn btn-outline"
              onClick={close}
            >
              <IconWhatsApp /> WhatsApp
            </a>
          </div>
          <button type="button" className="popup-later" onClick={close}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
