"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkle } from "./Icons";

// Short silent brand video (Gujarati on-screen text). Loads only when scrolled into view,
// then plays muted on a loop like a moving photo. Visitors can pause it.
export default function VideoIntro() {
  const ref = useRef(null);
  const frameRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = video.dataset.src; // start downloading only when visible
          if (!reduceMotion && !userPaused) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [userPaused]);

  // Scroll effect: the screen grows from 84% to full size while it scrolls into view.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const top = frame.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.75)));
      frame.style.setProperty("--vp", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v.src) v.src = v.dataset.src;
    if (v.paused) {
      setUserPaused(false);
      v.play().catch(() => {});
    } else {
      setUserPaused(true);
      v.pause();
    }
  };

  return (
    <section className="section video-intro" id="story">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">
            <Sparkle /> Our Story <Sparkle />
          </span>
          <h2>
            Watch <span className="italic">our story</span>
          </h2>
          <p>
            <span lang="gu" className="gu">સલૂન હવે તમારા ઘરે</span> — certified beauticians, sealed hygienic kits and free travel on bookings of ₹500+,
            anywhere in Surat.
          </p>
        </div>
        <div className="video-frame reveal" ref={frameRef}>
          {/* suppressHydrationWarning: browser extensions (video downloaders/speed controllers) add
              attributes like data-video to <video> before React loads — harmless, so don't warn */}
          <video
            suppressHydrationWarning
            ref={ref}
            data-src="/videos/glamhuman-intro.mp4"
            poster="/videos/glamhuman-intro-poster.jpg"
            muted
            loop
            playsInline
            preload="none"
            aria-label="GlamHuman introduction video"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          <button
            type="button"
            className="video-toggle"
            onClick={toggle}
            aria-label={playing ? "Pause video" : "Play video"}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
