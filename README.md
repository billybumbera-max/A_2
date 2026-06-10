# Autohive — Landing Page

**Autohive** is an AI automation service: deploy AI agents that handle repetitive
busywork (inbox triage, data entry, reporting, follow-ups) so teams can focus on
higher-value work.

This repo contains the marketing landing page with a waitlist signup.

> **Reusing / selling this template?** See **[`CUSTOMIZE.md`](CUSTOMIZE.md)**
> to rebrand it in minutes, and **[`SALES-KIT.md`](SALES-KIT.md)** for a
> ready-made listing, realistic pricing, and where to sell it. Preview
> images live in [`screenshots/`](screenshots/).

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

## Connect the waitlist (collect real emails)

The form works as a local demo out of the box. To capture real signups,
set **one value** — `WAITLIST.ENDPOINT` at the top of `script.js`.

**Recommended: Google Sheet** — signups land in a sheet you own, free, no
row limits. Follow **[`SETUP-GOOGLE-SHEET.md`](SETUP-GOOGLE-SHEET.md)** (uses
`google-apps-script.gs`), then set the Web App URL as `ENDPOINT`.

**Or use Formspree** (fastest if you don't want a sheet):

1. Create a free form at **https://formspree.io** (50 submissions/mo free).
2. Copy your form ID (looks like `xayzwbpq`).
3. In `script.js`, set the endpoint:

   ```js
   const WAITLIST = {
     ENDPOINT: 'https://formspree.io/f/xayzwbpq',
   };
   ```

4. Done — both forms (hero + final CTA) now post real signups to your
   Formspree dashboard / email.

> Other options: Google Apps Script (→ Google Sheet), Netlify Forms,
> Mailchimp, ConvertKit, or a custom backend. The form POSTs standard
> `multipart/form-data` with an `email` field, so any endpoint that
> accepts that works — just paste its URL as `ENDPOINT`.

## Customize

- **Name / copy:** edit text in `index.html`.
- **Colors:** tweak the CSS variables at the top of `styles.css` (`--brand`, `--brand-2`).
- **Integrations shown:** update the `.trust-logos` list in `index.html`.
