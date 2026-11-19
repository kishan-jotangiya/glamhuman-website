'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useClickOutside } from './useClickOutside';
import { shouldOpenUp } from './placement';
import { IconCalendar, IconCheck, IconChevron, IconClose } from '../Icons';
import { addDays, formatDate, fromISO, toISO } from '@/lib/dates';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Compact text for the field ("Fri, 20 Nov"); the year is added only when it isn't this year
const shortDate = (iso) => {
  const d = fromISO(iso);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', ...(sameYear ? {} : { year: 'numeric' }) });
};

export default function DatePicker({ id, value, min, max, placeholder, onChange, onClose, invalid, valid, onClear }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => (value ? fromISO(value) : new Date()));
  const [focusDay, setFocusDay] = useState('');
  const [up, setUp] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const gridRef = useRef(null);

  const inRange = (iso) => (!min || iso >= min) && (!max || iso <= max);

  const close = useCallback((refocus = false) => {
    setOpen(false);
    onClose?.();
    if (refocus) triggerRef.current?.focus();
  }, [onClose]);
  const closeOutside = useCallback(() => close(false), [close]);
  useClickOutside(rootRef, closeOutside, open);

  const openPanel = () => {
    const start = value || min || toISO(new Date());
    setView(fromISO(start));
    setFocusDay(start);
    setUp(shouldOpenUp(triggerRef.current, 380));
    setOpen(true);
  };

  // Move keyboard focus to the focused day button
  useEffect(() => {
    if (open && focusDay) gridRef.current?.querySelector(`[data-day="${focusDay}"]`)?.focus({ preventScroll: true });
  }, [open, focusDay, view]);

  const pick = (iso) => {
    if (!inRange(iso)) return;
    onChange(iso);
    close(true);
  };

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => toISO(new Date(year, month, i + 1))),
  ];

  const monthStart = toISO(new Date(year, month, 1));
  const monthEnd = toISO(new Date(year, month + 1, 0));
  const canPrev = !min || monthStart > min;
  const canNext = !max || monthEnd < max;
  const shiftMonth = (n) => setView(new Date(year, month + n, 1));

  const onDayKey = (e, iso) => {
    const moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in moves) {
      e.preventDefault();
      const next = addDays(iso, moves[e.key]);
      if (!inRange(next)) return;
      const d = fromISO(next);
      if (d.getMonth() !== month) setView(new Date(d.getFullYear(), d.getMonth(), 1));
      setFocusDay(next);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pick(iso);
    }
  };

  const today = min ?? toISO(new Date());
  const tomorrow = addDays(today, 1);
  const state = invalid ? ' invalid' : valid ? ' valid' : '';

  return (
    <div
      className={`dd dp${open ? ' open' : ''}${up ? ' up' : ''}${state}`} ref={rootRef}
      onKeyDown={e => { if (e.key === 'Escape' && open) { e.preventDefault(); close(true); } }}
    >
      <button
        type="button" id={id} ref={triggerRef} className="dd-trigger" aria-haspopup="dialog" aria-expanded={open}
        onClick={() => (open ? close(false) : openPanel())}
        onKeyDown={e => {
          if (!open && onClear && value && (e.key === 'Delete' || e.key === 'Backspace')) { e.preventDefault(); onClear(); return; }
          if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openPanel(); }
        }}
      >
        <span className="dd-icon"><IconCalendar /></span>
        <span className={`dd-value${value ? '' : ' placeholder'}`}>{value ? shortDate(value) : placeholder}</span>
        {onClear && value ? <span className="dd-clear-space" /> : <span className="dd-state">{valid && <IconCheck />}</span>}
        <IconChevron className="dd-chevron" />
      </button>
      {onClear && value && (
        <button type="button" className="dd-clear" aria-label="Clear date" title="Clear"
          onClick={() => { if (open) close(false); onClear(); triggerRef.current?.focus(); }}>
          <IconClose />
        </button>
      )}

      <div className="dd-panel dp-panel" role="dialog" aria-label="Choose a date">
        <div className="dp-quick">
          <button type="button" className={value === today ? 'on' : ''} onClick={() => pick(today)}>Today</button>
          <button type="button" className={value === tomorrow ? 'on' : ''} onClick={() => pick(tomorrow)}>Tomorrow</button>
        </div>
        <div className="dp-head">
          <button type="button" aria-label="Previous month" disabled={!canPrev} onClick={() => shiftMonth(-1)}>
            <IconChevron className="left" />
          </button>
          <span key={`${year}-${month}`} className="dp-title">
            {view.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </span>
          <button type="button" aria-label="Next month" disabled={!canNext} onClick={() => shiftMonth(1)}>
            <IconChevron className="right" />
          </button>
        </div>
        <div className="dp-grid" ref={gridRef} key={`g-${year}-${month}`}>
          {WEEKDAYS.map(w => <span key={w} className="dp-dow">{w}</span>)}
          {cells.map((iso, i) =>
            iso ? (
              <button
                type="button" key={iso} data-day={iso}
                className={`dp-day${iso === value ? ' selected' : ''}${iso === today ? ' today' : ''}`}
                disabled={!inRange(iso)}
                tabIndex={iso === focusDay ? 0 : -1}
                aria-pressed={iso === value}
                aria-label={formatDate(iso)}
                onClick={() => pick(iso)}
                onKeyDown={e => onDayKey(e, iso)}
              >
                {Number(iso.slice(8))}
              </button>
            ) : <span key={`e${i}`} />
          )}
        </div>
      </div>
    </div>
  );
}
