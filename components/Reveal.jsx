'use client';

import { useEffect } from 'react';

// Marks every `.reveal` element with `data-in` as it scrolls into view. Mounted once on the page.
// A data attribute (not a class) is used because React rewrites `className` when a component
// re-renders — e.g. opening an FAQ — which would wipe an added class and hide the element again.
const show = (el) => el.setAttribute('data-in', '');

export default function Reveal() {
  useEffect(() => {
    const all = Array.from(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) {
      all.forEach(show);
      return;
    }
    // Show anything already on screen right away; observe the rest
    const vh = window.innerHeight;
    const els = all.filter(el => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        show(el);
        return false;
      }
      return true;
    });
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          show(e.target);
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
