'use client';

import Image from 'next/image';
import { IconArrow, IconWhatsApp, Sparkle } from './Icons';
import { PRICING_EVENT, SERVICES, WA_MESSAGES, openBooking, waLink } from '@/lib/data';

export default function Services() {
  const showPrices = (tab) => window.dispatchEvent(new CustomEvent(PRICING_EVENT, { detail: tab }));

  // Subtle 3D tilt that follows the pointer (mouse only)
  const tilt = (e) => {
    if (e.pointerType !== 'mouse') return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
    el.style.setProperty('--rx', `${(0.5 - y) * 10}deg`);
    el.style.setProperty('--gx', `${x * 100}%`);
    el.style.setProperty('--gy', `${y * 100}%`);
  };
  const untilt = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><Sparkle /> Our Services <Sparkle /></span>
          <h2>Everything you love about the salon, <span className="italic">at home</span></h2>
          <p>Professional kits, premium products and certified hands — for every occasion, from a quick cleanup to your big day.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div className="reveal" key={s.title} style={{ ['--d']: `${(i % 3) * 0.1}s` }}>
            <article className="svc" onPointerMove={tilt} onPointerLeave={untilt}>
              <span className="glare" aria-hidden="true" />
              <Image src={s.img} alt={s.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" />
              <span className="tag">{s.tag}</span>
              <span className="num">0{i + 1}</span>
              <div className="content">
                <div className="line" />
                <h3>{s.title}</h3>
                <div className="reveal-on-hover">
                  <div>
                    <p>{s.desc}</p>
                    <div className="actions">
                      <button type="button" className="btn btn-gold" onClick={() => openBooking({ service: s.book })}>Book <IconArrow /></button>
                      <a href="#pricing" className="btn btn-glass" onClick={() => showPrices(s.pricing)}>Prices</a>
                      <a href={waLink(WA_MESSAGES.service(s.title))} target="_blank" rel="noopener"
                        className="btn btn-glass icon-only" aria-label={`Ask about ${s.title} on WhatsApp`}>
                        <IconWhatsApp />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
