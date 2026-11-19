// Date helpers shared by the booking form (browser) and the booking API (server).

export const toISO = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const fromISO = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (iso, n) => {
  const d = fromISO(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
};

export const formatDate = (iso) =>
  fromISO(iso).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
