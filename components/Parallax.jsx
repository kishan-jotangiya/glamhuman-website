'use client';

import { useEffect } from 'react';

// Moves every [data-parallax] element by (distance from viewport centre × speed) as the page scrolls.
// Positive speeds lag behind the scroll (feel further away); negative speeds move ahead of it.
// Uses the CSS `translate` property so it never fights an element's own `transform` animations.
// Add data-parallax-from="1081" to only apply the effect on screens at least that wide.
export default function Parallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll('[data-parallax]'));
    if (!els.length) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      for (const el of els) {
        const from = Number(el.dataset.parallaxFrom) || 0;
        if (window.innerWidth < from) { el.style.translate = ''; continue; }
        const speed = parseFloat(el.dataset.parallax) || 0;
        // Measure the parent so the element's own movement doesn't feed back into the calculation
        const box = (el.parentElement ?? el).getBoundingClientRect();
        if (box.bottom < -200 || box.top > window.innerHeight + 200) continue; // off screen
        const offset = (box.top + box.height / 2 - mid) * -speed;
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
