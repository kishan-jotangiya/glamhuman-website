'use client';

import { useState } from 'react';
import { IconPlus, IconWhatsApp, Sparkle } from './Icons';
import { FAQS, WA_MESSAGES, waLink } from '@/lib/data';

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section faq" id="faq">
      <div className="container">
        <div className="faq-side reveal">
          <span className="eyebrow"><Sparkle /> FAQ</span>
          <h2>Questions, <span className="italic">answered</span></h2>
          <p>Everything you need to know before your first at-home appointment.</p>
          <div className="help-card">
            <h3>Still have a question?</h3>
            <p>Message us on WhatsApp — we usually reply within minutes.</p>
            <a href={waLink(WA_MESSAGES.question)} target="_blank" rel="noopener" className="btn btn-gold"><IconWhatsApp /> Chat with us</a>
          </div>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div className={`faq-item reveal${open === i ? ' open' : ''}`} key={f.q} style={{ ['--d']: `${i * 0.06}s` }}>
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <span className="plus"><IconPlus /></span>
              </button>
              <div className="ans"><div><p>{f.a}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
