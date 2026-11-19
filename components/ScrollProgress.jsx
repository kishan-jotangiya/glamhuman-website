'use client';

import { useEffect, useRef } from 'react';

// Thin wine→gold bar at the top of the page showing scroll progress.
export default function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current?.style.setProperty('--p', String(max > 0 ? window.scrollY / max : 0));
      raf = 0;
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

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}
