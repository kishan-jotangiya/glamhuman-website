'use client';

import { openBooking } from '@/lib/data';

// A button that opens the booking popup — usable inside server components (Hero, CTA).
export default function BookButton({ service, className = 'btn btn-gold', children }) {
  return (
    <button type="button" className={className} onClick={() => openBooking(service ? { service } : {})}>
      {children}
    </button>
  );
}
