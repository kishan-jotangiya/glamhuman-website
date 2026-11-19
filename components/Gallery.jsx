'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IconChevron, IconClose, IconExpand, Sparkle } from './Icons';
import { GALLERY } from '@/lib/data';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

export default function Gallery() {
  const [open, setOpen] = useState(null);
  const touchX = useRef(null);

  const go = useCallback((dir) => {
    setOpen(i => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length));
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    lockScroll();
    return () => {
      document.removeEventListener('keydown', onKey);
      unlockScroll();
    };
  }, [open, go]);

  const item = open !== null ? GALLERY[open] : null;

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><Sparkle /> Portfolio <Sparkle /></span>
          <h2>Looks we <span className="italic">love</span> creating</h2>
          <p>From soft everyday glow to show-stopping bridal glam. Tap any look to view it full size.</p>
        </div>
        <div className="gallery-grid">
          {GALLERY.map((g, i) => (
            <figure className={`g-item reveal ${g.span}`} key={g.caption} style={{ ['--d']: `${(i % 4) * 0.08}s` }}>
              <button type="button" onClick={() => setOpen(i)} aria-label={`View ${g.caption}`}>
                <Image
                  src={g.img} alt={g.caption} fill style={{ objectPosition: g.pos }}
                  sizes={g.span === 'wide' ? '(max-width: 1080px) 100vw, 50vw' : '(max-width: 1080px) 50vw, 25vw'}
                />
                <span className="g-zoom"><IconExpand /></span>
                <figcaption>{g.caption}</figcaption>
              </button>
            </figure>
          ))}
        </div>
      </div>

      {item && open !== null && (
        <div
          className="lightbox" role="dialog" aria-modal="true" aria-label={item.caption}
          onClick={() => setOpen(null)}
          onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button className="lb-btn lb-close" aria-label="Close" onClick={() => setOpen(null)}><IconClose /></button>
          <button className="lb-btn lb-prev" aria-label="Previous" onClick={e => { e.stopPropagation(); go(-1); }}>
            <IconChevron />
          </button>
          <figure className="lb-figure" key={open} onClick={e => e.stopPropagation()}>
            <div className="lb-img">
              <Image src={item.img} alt={item.caption} fill sizes="90vw" style={{ objectFit: 'contain' }} />
            </div>
            <figcaption>
              <span>{item.caption}</span>
              <small>{open + 1} / {GALLERY.length}</small>
            </figcaption>
          </figure>
          <button className="lb-btn lb-next" aria-label="Next" onClick={e => { e.stopPropagation(); go(1); }}>
            <IconChevron />
          </button>
        </div>
      )}
    </section>
  );
}
