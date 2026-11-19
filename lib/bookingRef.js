// Booking reference numbers: GH-ddmmyy-N, where ddmmyy is the day the booking is received (India time)
// and N counts up from 1 for each new day — e.g. GH-191126-1, GH-191126-2, then GH-201126-1 the next day.
//
// The Google Sheet is the source of truth: the Apps Script assigns the next number while it holds a
// lock, so two bookings at the same moment never get the same number. This file keeps a local backup
// counter, used only when the sheet can't be reached.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

export function refPrefix(now = new Date()) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: '2-digit' })
      .formatToParts(now).map(x => [x.type, x.value]),
  );
  return `GH-${p.day}${p.month}${p.year}`;
}

export const refNumber = (ref, prefix) =>
  typeof ref === 'string' && ref.startsWith(`${prefix}-`) ? parseInt(ref.slice(prefix.length + 1), 10) || 0 : 0;

const COUNTER_FILES = [
  process.env.BOOKING_COUNTER_FILE,
  path.join(process.cwd(), '.data', 'booking-counter.json'),
  path.join(os.tmpdir(), 'glamhuman-booking-counter.json'), // read-only hosting (e.g. Vercel) falls back here
].filter(Boolean);

let queue = Promise.resolve(); // one update at a time within this server

async function readCounter() {
  for (const file of COUNTER_FILES) {
    try { return { file, data: JSON.parse(await readFile(file, 'utf8')) }; } catch {}
  }
  return { file: null, data: {} };
}

async function writeCounter(data) {
  for (const file of COUNTER_FILES) {
    try {
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, JSON.stringify(data));
      return;
    } catch {}
  }
}

function update(fn) {
  const run = queue.then(async () => {
    const { data } = await readCounter();
    const result = fn(data);
    await writeCounter(data);
    return result;
  });
  queue = run.catch(() => {});
  return run;
}

/** Backup numbering when the sheet is unavailable. */
export const nextLocalRef = (prefix) => update(data => {
  // Only today's count matters; drop older days so the file stays tiny
  const n = (data[prefix] || 0) + 1;
  for (const k of Object.keys(data)) if (k !== prefix) delete data[k];
  data[prefix] = n;
  return `${prefix}-${n}`;
});

/** Keep the backup counter in step with the number the sheet gave out. */
export const syncLocalRef = (prefix, ref) => update(data => {
  const n = refNumber(ref, prefix);
  for (const k of Object.keys(data)) if (k !== prefix) delete data[k];
  if (n > (data[prefix] || 0)) data[prefix] = n;
});
