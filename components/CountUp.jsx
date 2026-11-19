'use client';

import { useEffect, useRef, useState } from 'react';

// Animates the number inside a value like "15+", "100%" or "₹0" when it scrolls into view.
export default function CountUp({ value, duration = 1600 }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  const [n, setN] = useState(target);
  const ref = useRef(null);

  useEffect(() => {
    if (!match || target === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  if (!match) return <span>{value}</span>;
  return <span ref={ref}>{match[1]}{n}{match[3]}</span>;
}
