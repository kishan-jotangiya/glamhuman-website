'use client';

import { useCallback, useEffect, useState } from 'react';
import BookingForm from './BookingForm';
import { IconClose } from './Icons';
import { BOOK_EVENT } from '@/lib/data';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

// "Book Now" popup: every Book / Book Now button on the site opens this instead of scrolling to the hero form.
export default function BookingModal() {
  // { service?, sub?, n } — n changes on every open so the form starts fresh with the new pre-selection
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const onOpen = (e) => setBooking(b => ({ ...(e.detail || {}), n: (b?.n || 0) + 1 }));
    window.addEventListener(BOOK_EVENT, onOpen);
    return () => window.removeEventListener(BOOK_EVENT, onOpen);
  }, []);

  const close = useCallback(() => setBooking(null), []);

  useEffect(() => {
    if (!booking) return;
    const onKey = (e) => {
      // Let open dropdowns handle Escape first
      if (e.key === 'Escape' && !document.querySelector('.booking-modal .dd.open')) close();
    };
    document.addEventListener('keydown', onKey);
    lockScroll();
    return () => {
      document.removeEventListener('keydown', onKey);
      unlockScroll();
    };
  }, [booking, close]);

  if (!booking) return null;

  return (
    <div className="booking-modal" role="dialog" aria-modal="true" aria-label="Book your appointment" onClick={close}>
      <div className="bm-sheet" onClick={e => e.stopPropagation()}>
        <button type="button" className="bm-close" aria-label="Close booking form" onClick={close}><IconClose /></button>
        <BookingForm
          key={booking.n} idPrefix="m-"
          initial={{ service: booking.service, sub: booking.sub }}
          onDone={close}
        />
      </div>
    </div>
  );
}
