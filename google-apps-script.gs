/**
 * Autohive waitlist → Google Sheet
 *
 * Paste this into the Apps Script editor of your waitlist Google Sheet
 * (Extensions → Apps Script), then deploy it as a Web App. Full steps
 * are in SETUP-GOOGLE-SHEET.md.
 *
 * Each signup is appended as a row: [timestamp, email, source].
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000); // avoid two signups writing the same row at once

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Add a header row the first time the sheet is used.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Email', 'Source']);
    }

    var params = (e && e.parameter) || {};
    var email = (params.email || '').toString().trim();
    var source = (params.source || 'website').toString().trim();

    if (email) {
      sheet.appendRow([new Date(), email, source]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the Web App URL in a browser to confirm it's deployed.
function doGet() {
  return ContentService
    .createTextOutput('Autohive waitlist endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
