'use client';

import { useEffect, useState } from 'react';
import { IconArrow, IconClock, IconClose, IconWhatsApp, Sparkle } from './Icons';
import { PRICING_EVENT, WA_MESSAGES, openBooking, waLink } from '@/lib/data';
import { PRICING } from '@/lib/pricing';
import { subLabel } from '@/lib/booking';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

// Each card shows this many options; the rest open in a popup so every card stays the same size
const PREVIEW_ROWS = 3;
export const rupees = (n) => `₹${n.toLocaleString('en-IN')}`;

function bookItem(category, group, item) {
  // Opens the booking popup with this service + sub-service already selected
  openBooking({ service: category.label, sub: subLabel(group, item) });
}

function PriceRow({ category, group, item, onBook }) {
  return (
    <li>
      <div className="opt">
        <span className="name">{item.option}</span>
        <span className="dur"><IconClock /> {item.duration}</span>
      </div>
      <div className="amt">
        {item.off > 0 && <s>{rupees(item.mrp)}</s>}
        <b>{rupees(item.price)}</b>
        {item.off > 0 && <span className="off">{item.off}% off</span>}
      </div>
      <button type="button" className="book" onClick={() => { onBook?.(); bookItem(category, group, item); }}
        aria-label={`Book ${group.name} – ${item.option}`}>
        Book
      </button>
    </li>
  );
}

function ServiceCard({ category, group, index, onViewAll }) {
  const hidden = group.items.length - PREVIEW_ROWS;
  const from = Math.min(...group.items.map(i => i.price));
  const best = Math.max(...group.items.map(i => i.off));

  return (
    <article className="price-card" style={{ ['--i']: index }}>
      <header>
        <div>
          <h3>{group.name}</h3>
          <span className="count">{group.items.length} option{group.items.length > 1 ? 's' : ''}{best > 0 ? ` · up to ${best}% off` : ''}</span>
        </div>
        <span className="from"><small>from</small>{rupees(from)}</span>
      </header>
      <ul>
        {group.items.slice(0, PREVIEW_ROWS).map(item => <PriceRow key={item.option} category={category} group={group} item={item} />)}
      </ul>
      {/* Every card ends with a footer button so card bottoms line up across the grid */}
      {hidden > 0 ? (
        <button type="button" className="more" onClick={() => onViewAll(group)}>
          View all {group.items.length} options <IconArrow />
        </button>
      ) : (
        <a className="more ask" href={waLink(WA_MESSAGES.service(group.name))} target="_blank" rel="noopener">
          <IconWhatsApp /> Ask about {group.name}
        </a>
      )}
    </article>
  );
}

function PriceModal({ category, group, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    lockScroll();
    return () => {
      document.removeEventListener('keydown', onKey);
      unlockScroll();
    };
  }, [onClose]);

  return (
    <div className="price-modal" role="dialog" aria-modal="true" aria-labelledby="pm-title" onClick={onClose}>
      <div className="pm-sheet" onClick={e => e.stopPropagation()}>
        <header>
          <div>
            <span className="eyebrow"><Sparkle /> Price list</span>
            <h3 id="pm-title">{group.name}</h3>
          </div>
          <button type="button" className="pm-close" aria-label="Close" onClick={onClose}><IconClose /></button>
        </header>
        <ul className="pm-list price-card">
          {group.items.map(item => <PriceRow key={item.option} category={category} group={group} item={item} onBook={onClose} />)}
        </ul>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [tab, setTab] = useState(PRICING[0].id);
  const [modal, setModal] = useState(null);
  const category = PRICING.find(c => c.id === tab) ?? PRICING[0];

  // Service cards and the bridal banner can open a specific tab
  useEffect(() => {
    const onOpen = (e) => setTab(e.detail);
    window.addEventListener(PRICING_EVENT, onOpen);
    return () => window.removeEventListener(PRICING_EVENT, onOpen);
  }, []);

  // Keep the active tab centred in the scrollable tab bar (scrolls the bar only, never the page)
  useEffect(() => {
    const btn = document.getElementById(`ptab-${tab}`);
    const bar = btn?.parentElement;
    if (bar && bar.scrollWidth > bar.clientWidth) {
      bar.scrollTo({ left: btn.offsetLeft - (bar.clientWidth - btn.clientWidth) / 2, behavior: 'smooth' });
    }
  }, [tab]);

  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow"><Sparkle /> Price List <Sparkle /></span>
          <h2>Honest prices, <span className="italic">no surprises</span></h2>
          <p>Offer prices for at-home services anywhere in Surat. Tap <b>Book</b> on any option to add it to your booking.</p>
        </div>

        <div className="ptabs-wrap reveal">
          <div className="ptabs" role="tablist" aria-label="Service categories">
            {PRICING.map(c => (
              <button
                key={c.id} id={`ptab-${c.id}`} type="button" role="tab"
                aria-selected={tab === c.id} aria-controls="pricing-panel"
                className={tab === c.id ? 'on' : ''} onClick={() => setTab(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="price-grid" id="pricing-panel" role="tabpanel" aria-labelledby={`ptab-${tab}`} key={tab}>
          {category.groups.map((g, i) => <ServiceCard category={category} group={g} index={i} key={g.name} onViewAll={grp => setModal({ category, group: grp })} />)}
        </div>

        <p className="price-note reveal">
          Prices are per person. Your final price is confirmed on the confirmation call.
          <button type="button" onClick={() => openBooking()}>Book now <IconArrow /></button>
        </p>
      </div>

      {modal && <PriceModal category={modal.category} group={modal.group} onClose={() => setModal(null)} />}
    </section>
  );
}
