'use client';

import { useEffect, useRef, useState } from 'react';
import { IconChevron } from './Icons';

const R = 23;
const CIRC = 2 * Math.PI * R;

// "Go to top" button that appears after scrolling, with a ring showing how far down the page you are.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setVisible(window.scrollY > 600);
      ringRef.current?.setAttribute('stroke-dashoffset', String(CIRC * (1 - p)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <button
      type="button" className={`to-top${visible ? ' show' : ''}`} aria-label="Go to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg className="ring" viewBox="0 0 54 54" aria-hidden="true">
        <circle cx="27" cy="27" r={R} className="track" />
        <circle ref={ringRef} cx="27" cy="27" r={R} className="bar" strokeDasharray={CIRC} strokeDashoffset={CIRC} />
      </svg>
      <IconChevron className="arrow" />
    </button>
  );
}
