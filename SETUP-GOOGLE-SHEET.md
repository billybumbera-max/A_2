# Connect the waitlist to a Google Sheet

Signups will land in a Google Sheet you own — free, no row limits, nothing
to install. ~5 minutes, one-time.

## 1. Create the sheet
1. Go to **https://sheets.google.com** and create a **Blank spreadsheet**.
2. Name it something like **"Autohive Waitlist"**. (Leave it empty — the
   script adds the header row automatically.)

## 2. Add the script
1. In the sheet, open **Extensions → Apps Script**. A code editor opens.
2. Delete whatever's in the editor, then paste the **entire contents of
   `google-apps-script.gs`** (in this repo) into it.
3. Click the **Save** icon (💾).

## 3. Deploy it as a Web App
1. Top right, click **Deploy → New deployment**.
2. Click the gear ⚙️ next to "Select type" → choose **Web app**.
3. Fill in:
   - **Description:** anything, e.g. `waitlist`
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**  ← important, so the website can post to it
4. Click **Deploy**.
5. Google asks you to **authorize** — click **Authorize access**, pick your
   Google account, and on the "Google hasn't verified this app" screen click
   **Advanced → Go to (your project) → Allow**. (This is normal for your own
   scripts.)
6. Copy the **Web app URL**. It looks like:

   ```
   https://script.google.com/macros/s/AKfy...long.../exec
   ```

## 4. Send me that URL
Paste the **Web app URL** back to me and I'll drop it into the site, commit,
and push. After that every signup appends a row to your sheet:
`Timestamp | Email | Source`.

> Want a heads-up email on each signup too? In the sheet: **Tools → Notification
> settings → Notify me… → when changes are made**. Optional.

---

### Updating the script later
If you ever change `google-apps-script.gs`, re-deploy with
**Deploy → Manage deployments → ✏️ edit → Version: New version → Deploy**.
The URL stays the same.
