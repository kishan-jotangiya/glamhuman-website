'use client';

import { useEffect, useMemo, useState } from 'react';
import { BOOKED_EVENT, BRAND, CITY, PHONE_DISPLAY, PHONE_TEL, waLink } from '@/lib/data';
import {
  BOOKING_WINDOW_DAYS, FIELDS, FREE_TRAVEL_FROM, SERVICES_ALLOWED, SLOTS, SUB_SERVICES, TRAVEL_FEE, bookingSummary, findSub, findSubByKey,
  priceBooking, slotIsPast, subKey, validateBooking,
} from '@/lib/booking';
import { addDays, formatDate, toISO } from '@/lib/dates';
import Dropdown from './form/Dropdown';
import DatePicker from './form/DatePicker';
import {
  IconAlert, IconArrow, IconCheck, IconClock, IconList, IconPhone, IconPin, IconShield, IconSparkles, IconUser,
  IconWhatsApp, Sparkle,
} from './Icons';

const EMPTY = { name: '', mobile: '', date: '', time: '', services: [], subs: [], area: '' };

// Same services as the price list tabs
const SERVICE_GROUPS = [{ options: SERVICES_ALLOWED.map(s => ({ value: s, label: s })) }];
const rupees = (n) => `₹${n.toLocaleString('en-IN')}`;

// Options dropdown for the chosen services: grouped like the price list, with prices on the right
const subGroups = (services) => services.flatMap(service => (SUB_SERVICES[service] || []).map(g => ({
  label: services.length > 1 && g.group !== service ? `${service} · ${g.group}` : g.group,
  options: g.items.map(i => ({
    value: subKey(service, i.label),
    label: i.option === g.group ? g.group : i.option,
    meta: rupees(i.price),
    display: i.label,
  })),
})));

// Pre-selection from a service card / price list button: { service, sub } → { services, subs }
const fromInitial = (initial) => {
  const service = SERVICES_ALLOWED.includes(initial?.service) ? initial.service : '';
  const sub = service && initial?.sub && findSub(service, initial.sub) ? subKey(service, initial.sub) : '';
  return { services: service ? [service] : [], subs: sub ? [sub] : [] };
};

const nowMinutes = () => {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
};

export default function BookingForm({ idPrefix = 'bf-', anchorId, initial, onDone }) {
  const [data, setData] = useState(() => ({ ...EMPTY, ...fromInitial(initial) }));
  const [touched, setTouched] = useState(() => {
    const pre = fromInitial(initial);
    return { ...(pre.services.length ? { services: true } : {}), ...(pre.subs.length ? { subs: true } : {}) };
  });
  const [shaking, setShaking] = useState(false);
  // idle → sending → (success | error)
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');
  const [submitted, setSubmitted] = useState(null);
  // Date limits depend on the visitor's clock, so compute them after mount to avoid hydration mismatch
  const [today, setToday] = useState(null);
  // Hidden anti-spam field — bots fill it, people never see it
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    setToday(toISO(new Date()));
  }, []);

  const fid = (f) => `${idPrefix}${f}`;

  const maxDate = today ? addDays(today, BOOKING_WINDOW_DAYS) : undefined;

  // Chosen options with prices, travel charge and total
  const bill = useMemo(() => priceBooking(data.subs), [data.subs]);
  const subOptions = useMemo(() => subGroups(data.services), [data.services]);
  const subCount = subOptions.reduce((n, g) => n + g.options.length, 0);
  const slotPast = (date, mins) => slotIsPast(today, nowMinutes(), date, mins);

  const timeGroups = useMemo(() => {
    const opt = (s) => ({ value: s.label, label: s.label, disabled: slotPast(data.date, s.mins) });
    return [
      { label: 'Morning', options: SLOTS.filter(s => s.mins < 12 * 60).map(opt) },
      { label: 'Afternoon', options: SLOTS.filter(s => s.mins >= 12 * 60 && s.mins < 16 * 60).map(opt) },
      { label: 'Evening', options: SLOTS.filter(s => s.mins >= 16 * 60).map(opt) },
    ].filter(g => g.options.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.date, today]);

  const errors = validateBooking(data, { today, nowMinutes: nowMinutes() });
  const done = FIELDS.filter(f => !errors[f]).length;
  const showError = (f) => (touched[f] ? errors[f] : null);
  const isValid = (f) => !!touched[f] && !errors[f];

  const set = (f, value) => {
    if (f === 'mobile') value = value.replace(/\D/g, '').slice(0, 10);
    if (f === 'name' || f === 'area') value = value.replace(/\s{2,}/g, ' ');
    setData(d => {
      const next = { ...d, [f]: value };
      // Options of a service that was removed go too
      if (f === 'services') next.subs = next.subs.filter(k => value.includes(findSubByKey(k)?.service));
      // A time chosen for another day may be in the past for today — clear it
      if (f === 'date' && next.time) {
        const slot = SLOTS.find(s => s.label === next.time);
        if (slot && slotPast(value, slot.mins)) next.time = '';
      }
      return next;
    });
  };
  const touch = (f) => setTouched(t => (t[f] ? t : { ...t, [f]: true }));
  // × on a field: empty it without showing an error straight away (clearing Services also clears the options)
  const clearField = (f) => {
    set(f, Array.isArray(EMPTY[f]) ? [] : '');
    setTouched(t => ({ ...t, [f]: false, ...(f === 'services' ? { subs: false } : {}) }));
  };
  // A newly added service still needs its option picked — don't flag that as an error straight away
  const pickServices = (v) => {
    if (v.some(x => !data.services.includes(x))) setTouched(t => ({ ...t, subs: false }));
    set('services', v);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setTouched(Object.fromEntries(FIELDS.map(f => [f, true])));
    const firstBad = FIELDS.find(f => errors[f]);
    if (firstBad) {
      setShaking(true);
      document.getElementById(fid(firstBad))?.focus();
      return;
    }

    setStatus('sending');
    setServerError('');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, company: honeypot }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || 'We could not send your booking right now.');
      setSubmitted({ data, bill, ref: json.ref });
      setStatus('success');
      window.dispatchEvent(new Event(BOOKED_EVENT));
    } catch (err) {
      setServerError(err.message);
      setStatus('error');
    }
  };

  const reset = () => {
    setData(EMPTY);
    setTouched({});
    setSubmitted(null);
    setStatus('idle');
  };

  const fieldClass = (f, full = false) =>
    `field${full ? ' full' : ''}${showError(f) ? ' invalid' : ''}${isValid(f) ? ' valid' : ''}`;

  const errorMsg = (f) => (
    <div className="err" aria-live="polite">
      <div>{showError(f) && <span id={`${fid(f)}-err`}><IconAlert /> {showError(f)}</span>}</div>
    </div>
  );

  const whatsappFallback = waLink(`Hi ${BRAND}! 👋\n\nI'd like to book a home salon appointment:\n\n${bookingSummary(data, bill)}\n\nPlease confirm. Thank you!`);

  return (
    <div className="booking" id={anchorId}>
      <div className="booking-badge"><Sparkle /> CALLBACK WITHIN 2 HOURS</div>
      <div className="booking-inner">
        {submitted ? (
          <div className="form-success">
            <div className="burst" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => <Sparkle key={i} style={{ ['--a']: `${i * 30}deg` }} />)}
            </div>
            <div className="tick"><IconCheck /></div>
            <span className="thanks-eyebrow">Booking confirmed</span>
            <h3>Thank you, {submitted.data.name.trim().split(' ')[0]}!</h3>
            <p>We&apos;ve received your booking. Our team will call you on <b>+91 {submitted.data.mobile}</b> within 2 hours to confirm your appointment.</p>
            <div className="summary">
              <div><span>Reference</span><b>{submitted.ref}</b></div>
              <div><span>Services</span><b>{submitted.data.services.join(', ')}</b></div>
              {submitted.bill.items.map(i => (
                <div key={i.key}><span>{i.label}</span><b>{rupees(i.price)}</b></div>
              ))}
              {submitted.bill.travel > 0 && <div className="summary-note">Note: ₹{TRAVEL_FEE} travel charges apply below ₹{FREE_TRAVEL_FROM}.</div>}
              <div><span>Date</span><b>{formatDate(submitted.data.date)}</b></div>
              <div><span>Time</span><b>{submitted.data.time}</b></div>
              <div><span>Area</span><b>{submitted.data.area}</b></div>
            </div>
            <div className="success-actions">
              <a className="btn btn-primary" href={`tel:${PHONE_TEL}`}><IconPhone /> Call us</a>
              {onDone
                ? <button className="btn btn-outline" type="button" onClick={onDone}>Done</button>
                : <button className="btn btn-outline" type="button" onClick={reset}>Book another</button>}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className={shaking ? 'shake' : ''} onAnimationEnd={e => { if (e.target === e.currentTarget) setShaking(false); }}>
            <h2>Book your <span className="italic">glam</span></h2>
            <p className="sub">Tell us when and where — a certified beautician comes to you.</p>

            <div className="progress" aria-label={`${done} of ${FIELDS.length} details complete`}>
              <div className="bar"><span style={{ width: `${(done / FIELDS.length) * 100}%` }} /></div>
              <small>{done === FIELDS.length ? 'All set — ready to book!' : `${done} of ${FIELDS.length} details`}</small>
            </div>

            <div className="form-grid">
              <div className={fieldClass('name', true)}>
                <label htmlFor={fid('name')}>Full Name <span className="req">*</span></label>
                <div className="control">
                  <IconUser />
                  <input
                    id={fid('name')} type="text" placeholder="e.g. Riddhi Patel" autoComplete="name" maxLength={50}
                    value={data.name} aria-invalid={!!showError('name')} aria-describedby={fid('name-err')}
                    onChange={e => set('name', e.target.value)} onBlur={() => touch('name')}
                  />
                  <span className="dd-state">{isValid('name') && <IconCheck />}</span>
                </div>
                {errorMsg('name')}
              </div>

              <div className={fieldClass('mobile', true)}>
                <label htmlFor={fid('mobile')}>Mobile Number <span className="req">*</span></label>
                <div className="control">
                  <IconPhone />
                  <span className="prefix">+91</span>
                  <input
                    id={fid('mobile')} type="tel" inputMode="numeric" maxLength={10} placeholder="10-digit number"
                    autoComplete="tel-national" value={data.mobile}
                    aria-invalid={!!showError('mobile')} aria-describedby={fid('mobile-err')}
                    onChange={e => set('mobile', e.target.value)} onBlur={() => touch('mobile')}
                  />
                  <span className="dd-state">{isValid('mobile') && <IconCheck />}</span>
                </div>
                {errorMsg('mobile')}
              </div>

              <div className={fieldClass('date')}>
                <label htmlFor={fid('date')}>Preferred Date <span className="req">*</span></label>
                <DatePicker
                  id={fid('date')} value={data.date} min={today ?? undefined} max={maxDate} placeholder="Select date"
                  onChange={v => set('date', v)} onClose={() => touch('date')} onClear={() => clearField('date')}
                  invalid={!!showError('date')} valid={isValid('date')}
                />
                {errorMsg('date')}
              </div>

              <div className={fieldClass('time')}>
                <label htmlFor={fid('time')}>Preferred Time <span className="req">*</span></label>
                <Dropdown
                  id={fid('time')} value={data.time} placeholder="Select slot" icon={<IconClock />}
                  groups={timeGroups} layout="grid"
                  onChange={v => set('time', v)} onClose={() => touch('time')} onClear={() => clearField('time')}
                  invalid={!!showError('time')} valid={isValid('time')}
                />
                {errorMsg('time')}
              </div>

              <div className={fieldClass('services', true)}>
                <label htmlFor={fid('services')}>Services <span className="req">*</span> <small className="label-hint">pick one or more</small></label>
                <Dropdown
                  id={fid('services')} value={data.services} placeholder="Choose services" icon={<IconSparkles />}
                  groups={SERVICE_GROUPS} multiple
                  onChange={pickServices} onClose={() => touch('services')} onClear={() => clearField('services')}
                  invalid={!!showError('services')} valid={isValid('services')}
                />
                {errorMsg('services')}
              </div>

              {/* Appears once a service is chosen: the exact options from the price list */}
              {subCount > 0 && (
                <div className={`${fieldClass('subs', true)} sub-field`}>
                  <label htmlFor={fid('subs')}>{data.services.length === 1 ? `${data.services[0]} options` : 'Options'} <span className="req">*</span></label>
                  <Dropdown
                    id={fid('subs')} value={data.subs} placeholder="Choose options" multiple
                    icon={<IconList />} groups={subOptions}
                    searchable={subCount > 8} searchPlaceholder="Search options…"
                    onChange={v => set('subs', v)} onClose={() => touch('subs')} onClear={() => clearField('subs')}
                    invalid={!!showError('subs')} valid={isValid('subs')}
                  />
                  {errorMsg('subs')}
                </div>
              )}

              {/* Travel note, only when the bill is below ₹500 */}
              {bill.travel > 0 && (
                <p className="travel-note" aria-live="polite">Note: ₹{TRAVEL_FEE} travel charges apply below ₹{FREE_TRAVEL_FROM}.</p>
              )}

              <div className={fieldClass('area', true)}>
                <label htmlFor={fid('area')}>Area in {CITY} <span className="req">*</span></label>
                <div className="control">
                  <IconPin />
                  <input
                    id={fid('area')} type="text" placeholder="e.g. Vesu, near VR Mall" autoComplete="address-level3" maxLength={120}
                    value={data.area} aria-invalid={!!showError('area')} aria-describedby={fid('area-err')}
                    onChange={e => set('area', e.target.value)} onBlur={() => touch('area')}
                  />
                  <span className="dd-state">{isValid('area') && <IconCheck />}</span>
                </div>
                {errorMsg('area')}
                <span className="hint"><IconPin /> Currently available only within {CITY} city</span>
              </div>
            </div>

            {/* Honeypot: hidden from people and screen readers */}
            <input
              className="hp" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
              value={honeypot} onChange={e => setHoneypot(e.target.value)}
            />

            {status === 'error' && (
              <div className="send-error" role="alert">
                <IconAlert />
                <div>
                  <b>{serverError}</b>
                  <span>Please try again, or book instantly on WhatsApp / call {PHONE_DISPLAY}.</span>
                  <a href={whatsappFallback} target="_blank" rel="noopener"><IconWhatsApp /> Book on WhatsApp</a>
                </div>
              </div>
            )}

            <button type="submit" className={`btn btn-primary submit${status === 'sending' ? ' loading' : ''}`} disabled={status === 'sending'}>
              {status === 'sending' ? <><span className="spinner" aria-hidden="true" /> Booking…</> : <>Book Now <IconArrow /></>}
            </button>
            <div className="form-note">
              <span><IconShield /> Free confirmation call</span>
              <span><IconCheck /> No hidden charges</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
