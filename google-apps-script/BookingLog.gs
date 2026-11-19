/**
 * GlamHuman — booking log for Google Sheets.
 *
 * Every website booking is added as a new row in the "Bookings" tab, with a Status dropdown
 * (Pending / Confirmed / Completed / Cancelled) so the sheet works as a simple CRM.
 *
 * SETUP (one time, ~5 minutes):
 *  1. Create a new Google Sheet (e.g. "GlamHuman Bookings").
 *  2. Extensions → Apps Script. Delete the sample code and paste this whole file.
 *  3. Set SECRET below to the same value as SHEET_WEBHOOK_SECRET in the website's .env.
 *  4. Click Deploy → New deployment → type "Web app".
 *       Execute as: Me      Who has access: Anyone
 *     Click Deploy, allow the permissions, and copy the Web app URL (ends with /exec).
 *  5. Put that URL in the website's .env as SHEET_WEBHOOK_URL and restart the site.
 *
 * If you edit this script later, use Deploy → Manage deployments → Edit → New version,
 * so the same URL keeps working.
 */

// Paste the same value as SHEET_WEBHOOK_SECRET from the website's .env (kept out of GitHub on purpose)
const SECRET = 'PASTE-SHEET_WEBHOOK_SECRET-HERE';
const SHEET_NAME = 'Bookings';
// Leave empty if you opened this script from the Sheet (Extensions → Apps Script).
// If you created the script separately, paste the Sheet ID here — it's the long part of the
// Sheet's URL between /d/ and /edit, e.g. docs.google.com/spreadsheets/d/THIS_PART/edit
const SPREADSHEET_ID = '';
const STATUSES = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
const HEADERS = [
  'Received At', 'Reference', 'Status', 'Name', 'Mobile', 'Service', 'Sub-service', 'Offer Price (₹)',
  'Preferred Date', 'Preferred Time', 'Area', 'Notes',
];

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'bad json' });
  }
  if (body.secret !== SECRET) return json_({ ok: false, error: 'unauthorized' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // avoid two bookings writing the same row
  let ref;
  try {
    const sheet = getSheet_();
    // Booking number GH-ddmmyy-N: next number for that day, assigned while holding the lock
    ref = body.refPrefix ? nextRef_(sheet, body.refPrefix) : (body.ref || '');
    sheet.appendRow([
      new Date(),
      ref,
      'Pending',
      body.name || '',
      "'" + (body.mobile ? '+91 ' + body.mobile : ''), // leading ' keeps it as text
      body.service || '',
      body.package || '',
      body.price || '',
      body.dateLabel || body.date || '',
      body.time || '',
      body.area || '',
      body.notes || '', // e.g. travel charges and total
    ]);
  } finally {
    lock.releaseLock();
  }
  return json_({ ok: true, ref: ref });
}

// Highest N already used for this day's prefix (e.g. GH-191126) + 1
function nextRef_(sheet, prefix) {
  const last = sheet.getLastRow();
  let max = 0;
  if (last >= 2) {
    const start = prefix + '-';
    sheet.getRange(2, 2, last - 1, 1).getValues().forEach(function (r) {
      const v = String(r[0]);
      if (v.indexOf(start) === 0) {
        const n = parseInt(v.slice(start.length), 10);
        if (n > max) max = n;
      }
    });
  }
  return prefix + '-' + (max + 1);
}

// Run this once from the editor (select "setup" next to the Run button, then click Run):
// it asks for permission and creates the "Bookings" tab, so you can see the sheet is connected.
function setup() {
  const sheet = getSheet_();
  Logger.log('Ready: bookings will be saved in "' + sheet.getName() + '" of ' + sheet.getParent().getName());
}

// Opening the URL in a browser shows this — handy to check the deployment works
function doGet() {
  return json_({ ok: true, service: 'GlamHuman booking log' });
}

function getSheet_() {
  const ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('No spreadsheet: open this script from the Sheet, or set SPREADSHEET_ID');
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet) return sheet;

  sheet = ss.insertSheet(SHEET_NAME);
  sheet.appendRow(HEADERS);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight('bold').setBackground('#940944').setFontColor('#ffffff');
  sheet.getRange('A:A').setNumberFormat('dd mmm yyyy, hh:mm');

  // Status dropdown + colours
  const status = sheet.getRange('C2:C');
  status.setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build());
  const colour = (text, bg) => SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo(text).setBackground(bg).setRanges([status]).build();
  sheet.setConditionalFormatRules([
    colour('Pending', '#fff4d6'), colour('Confirmed', '#dff3ff'),
    colour('Completed', '#dcf5e7'), colour('Cancelled', '#fde2e4'),
  ]);
  sheet.setColumnWidths(1, HEADERS.length, 140);
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
