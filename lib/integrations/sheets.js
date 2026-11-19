// Saves each booking as a row in a Google Sheet through a Google Apps Script web app.
// Setup: see google-apps-script/BookingLog.gs (paste it into the sheet's Apps Script editor and deploy).
//
// Env:
//   SHEET_WEBHOOK_URL    – the deployed Apps Script web app URL (ends in /exec)
//   SHEET_WEBHOOK_SECRET – the same secret you set in the script, so nobody else can write to the sheet

export const sheetsEnabled = () => !!process.env.SHEET_WEBHOOK_URL;

export async function logBookingToSheet(booking) {
  const { SHEET_WEBHOOK_URL, SHEET_WEBHOOK_SECRET } = process.env;
  if (!SHEET_WEBHOOK_URL) return { skipped: true };

  // Apps Script answers POSTs with a redirect to the result; fetch follows it automatically
  const res = await fetch(SHEET_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: SHEET_WEBHOOK_SECRET || "", ...booking }),
    redirect: "follow",
    signal: AbortSignal.timeout(15000),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.ok) {
    throw new Error(`Sheet log failed (${res.status}): ${json?.error || "unexpected response"}`);
  }
  // The script returns the booking number it assigned (GH-ddmmyy-N)
  return { ok: true, ref: typeof json.ref === "string" ? json.ref : null };
}
