// POST /api/booking — validates a booking, emails it to the salon (Gmail SMTP), saves it to the
// Google Sheet booking log and sends the customer a WhatsApp confirmation (when configured).
// All settings live in .env.local — see .env.example for the full list.
//
// Email:     SMTP_USER, SMTP_PASS (Gmail App Password), optional BOOKING_TO / SMTP_HOST / SMTP_PORT
// Sheet:     SHEET_WEBHOOK_URL, SHEET_WEBHOOK_SECRET  (lib/integrations/sheets.js)
// WhatsApp:  WHATSAPP_* variables                     (lib/integrations/whatsapp.js) — optional
import nodemailer from "nodemailer";
import { BRAND, EMAIL } from "@/lib/data";
import { priceBooking, travelNote, validateBooking } from "@/lib/booking";
import { buildBookingEmail } from "@/lib/email/bookingEmail";
import { formatDate } from "@/lib/dates";
import { logBookingToSheet, sheetsEnabled } from "@/lib/integrations/sheets";
import { sendWhatsAppConfirmation } from "@/lib/integrations/whatsapp";
import { nextLocalRef, refPrefix, syncLocalRef } from "@/lib/bookingRef";

export const runtime = "nodejs";

const TZ = "Asia/Kolkata";
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map(); // ip -> timestamps of recent requests

function salonNow() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value])
  );
  return {
    today: `${parts.year}-${parts.month}-${parts.day}`,
    nowMinutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field
  if (body.company) return Response.json({ ok: true, ref: "GH-OK" });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many requests — please try again in a few minutes or call us." },
      { status: 429 }
    );
  }

  const d = {
    name: String(body.name ?? ""),
    mobile: String(body.mobile ?? ""),
    date: String(body.date ?? ""),
    time: String(body.time ?? ""),
    services: strings(body.services),
    subs: strings(body.subs),
    area: String(body.area ?? ""),
  };
  // Server is a little more lenient on notice than the form, in case the visitor's clock is off
  const errors = validateBooking(d, { ...salonNow(), minNotice: 30 });
  const invalid = Object.fromEntries(Object.entries(errors).filter(([, msg]) => msg));
  if (Object.keys(invalid).length) {
    return Response.json(
      { ok: false, error: "Please check the highlighted fields.", fields: invalid },
      { status: 422 }
    );
  }

  // Options, prices and the travel charge come from our own price list, never from the browser
  const bill = priceBooking(d.subs);

  const emailOn = !!(process.env.SMTP_USER && process.env.SMTP_PASS);
  if (!emailOn && !sheetsEnabled()) {
    console.error(
      "[booking] Neither SMTP nor the Google Sheet webhook is configured — booking not saved."
    );
    return Response.json(
      { ok: false, error: "Online booking is temporarily unavailable." },
      { status: 503 }
    );
  }

  // 1. Save to the Google Sheet first — it hands out today's next booking number (GH-ddmmyy-N)
  const prefix = refPrefix();
  let sheet = { status: "fulfilled", value: { skipped: true } };
  if (sheetsEnabled()) {
    try {
      sheet = {
        status: "fulfilled",
        value: await logBookingToSheet({
          refPrefix: prefix,
          name: d.name.trim(),
          mobile: d.mobile,
          service: d.services.join(", "),
          package: bill.items.map((i) => `${i.label} (₹${i.price})`).join("\n"),
          price: bill.subtotal || "",
          notes: bill.items.length ? `${travelNote(bill)} · Total ₹${bill.total}` : "",
          date: d.date,
          dateLabel: formatDate(d.date),
          time: d.time,
          area: d.area,
        }),
      };
    } catch (err) {
      sheet = { status: "rejected", reason: err };
    }
  }
  let ref = sheet.status === "fulfilled" ? sheet.value?.ref : null;
  if (ref) {
    await syncLocalRef(prefix, ref);
  } else {
    if (sheet.status === "fulfilled" && sheet.value?.ok) {
      console.warn(
        "[booking] The sheet saved the row but did not return a booking number — paste the latest google-apps-script/BookingLog.gs and deploy a New version."
      );
    }
    ref = await nextLocalRef(prefix); // sheet unavailable: use the website's backup counter
  }

  // 2. Email the salon and WhatsApp the customer with that number
  const [email, whatsapp] = await Promise.allSettled([
    emailOn ? sendBookingEmail(d, bill, ref) : Promise.resolve({ skipped: true }),
    sendWhatsAppConfirmation({
      name: d.name.trim().split(" ")[0],
      mobile: d.mobile,
      service: bill.items.length ? bill.items.map((i) => i.label).join(", ") : d.services.join(", "),
      date: formatDate(d.date),
      time: d.time,
      ref,
    }),
  ]);
  for (const [name, r] of [
    ["email", email],
    ["sheet", sheet],
    ["whatsapp", whatsapp],
  ]) {
    if (r.status === "rejected")
      console.error(`[booking] ${name} failed for ${ref}:`, r.reason?.message);
  }

  // The booking counts as received if it reached the salon by email or in the sheet
  const delivered = [email, sheet].some((r) => r.status === "fulfilled" && r.value?.ok);
  if (!delivered) {
    return Response.json(
      { ok: false, error: "We could not send your booking right now." },
      { status: 502 }
    );
  }
  return Response.json({ ok: true, ref });
}

// A list of strings from the request (anything else is dropped; capped so a bad request can't be huge)
function strings(v) {
  return Array.isArray(v) ? v.slice(0, 50).map((x) => String(x)) : [];
}

async function sendBookingEmail(d, bill, ref) {
  const { SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT, BOOKING_TO } = process.env;
  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  const mail = buildBookingEmail({ d, bill, ref });
  await transporter.sendMail({ from: `"${BRAND} Bookings" <${SMTP_USER}>`, to: BOOKING_TO || EMAIL, ...mail });
  return { ok: true };
}
