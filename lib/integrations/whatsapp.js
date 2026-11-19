// Sends the customer a WhatsApp booking confirmation through the WhatsApp Business Cloud API (Meta).
// It stays OFF until the env variables below are set — bookings work normally without it.
//
// Env:
//   WHATSAPP_TOKEN            – permanent access token from Meta Business (System User token)
//   WHATSAPP_PHONE_NUMBER_ID  – the "Phone number ID" shown in WhatsApp Manager → API Setup
//   WHATSAPP_TEMPLATE_NAME    – an APPROVED message template, e.g. booking_confirmation
//   WHATSAPP_TEMPLATE_LANG    – template language code (default: en)
//   WHATSAPP_API_VERSION      – Graph API version (default: v21.0)
//
// The template body must have exactly 5 variables, in this order:
//   Hi {{1}}, thank you for booking {{2}} with GlamHuman on {{3}} at {{4}}.
//   Your booking reference is {{5}}. Our team will call you shortly to confirm. 💖
//   ({{1}} name · {{2}} service/package · {{3}} date · {{4}} time · {{5}} reference)

export const whatsappEnabled = () =>
  !!(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID && process.env.WHATSAPP_TEMPLATE_NAME);

export async function sendWhatsAppConfirmation({ name, mobile, service, date, time, ref }) {
  if (!whatsappEnabled()) return { skipped: true };
  const {
    WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_TEMPLATE_NAME,
    WHATSAPP_TEMPLATE_LANG = 'en', WHATSAPP_API_VERSION = 'v21.0',
  } = process.env;

  const text = (t) => ({ type: 'text', text: String(t).slice(0, 200) });
  const res = await fetch(`https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: `91${mobile}`,
      type: 'template',
      template: {
        name: WHATSAPP_TEMPLATE_NAME,
        language: { code: WHATSAPP_TEMPLATE_LANG },
        components: [{ type: 'body', parameters: [text(name), text(service), text(date), text(time), text(ref)] }],
      },
    }),
    signal: AbortSignal.timeout(15000),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(`WhatsApp API ${res.status}: ${json?.error?.message || 'unexpected response'}`);
  return { ok: true, id: json?.messages?.[0]?.id };
}
