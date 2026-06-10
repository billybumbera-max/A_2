# Autohive — Landing Page

**Autohive** is an AI automation service: deploy AI agents that handle repetitive
busywork (inbox triage, data entry, reporting, follow-ups) so teams can focus on
higher-value work.

This repo contains the marketing landing page with a waitlist signup.

## Stack

Pure static site — no build step, no dependencies.

- `index.html` — page structure & content
- `styles.css` — styling (dark, modern SaaS theme, fully responsive)
- `script.js` — waitlist form handling & validation

## Run locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (free) with GitHub Pages

1. Push this branch and merge to `main`.
2. In the repo: **Settings → Pages → Build and deployment**.
3. Source: **Deploy from a branch**, branch: `main`, folder: `/ (root)`.
4. Your site goes live at `https://<username>.github.io/<repo>/`.

## Connect the waitlist (collect real signups in a Google Sheet)

The form works as a local demo out of the box. To capture real signups into a
**Google Sheet you own** (free, unlimited), connect a Google Form. Takes ~2 min:

1. **Create the form.** Go to <https://forms.new>. Add a single **Short answer**
   question titled `Email`. (Optional: tick the menu → *Settings* → make it
   required and set "response validation" to Email.)
2. **Send responses to a Sheet.** In the form's **Responses** tab, click the
   green Sheets icon → *Create spreadsheet*. New signups now flow into it.
3. **Get your two values:**
   - **Form action URL** — click **Send** → the link (`</>`) tab, or copy your
     form's view URL. It looks like
     `https://docs.google.com/forms/d/e/AAAA.../viewform`.
     Replace the trailing `viewform` with **`formResponse`**.
   - **Email field name** — open the live form, right-click the email box →
     *Inspect*, and find the input's `name`, e.g. `entry.1234567890`.
     (Shortcut: open the form, *Get pre-filled link*, type anything in Email,
     copy the link — the `entry.XXXX=` in it is your field name.)
4. **Paste them into `script.js`** at the top, in the `WAITLIST` object:

   ```js
   const WAITLIST = {
     formAction: 'https://docs.google.com/forms/d/e/AAAA.../formResponse',
     emailEntry: 'entry.1234567890',
   };
   ```

5. Done — every signup now lands in your Google Sheet. Every email is also
   backed up in the visitor's browser as a safety net.

> Prefer another service (Formspree, Mailchimp, ConvertKit, a custom backend)?
> Just point `WAITLIST.formAction` at its POST URL and set the matching field
> name.

## Customize

- **Name / copy:** edit text in `index.html`.
- **Colors:** tweak the CSS variables at the top of `styles.css` (`--brand`, `--brand-2`).
- **Integrations shown:** update the `.trust-logos` list in `index.html`.
