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

## Connect the waitlist (collect real emails)

The form works as a local demo out of the box. To capture real signups:

1. Create a free form at **https://formspree.io** (50 submissions/mo free).
2. Copy your form ID (looks like `xayzwbpq`).
3. In `index.html`, replace **both** occurrences of `YOUR_FORM_ID`
   (the hero form and the final waitlist form):

   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```

4. Done — submissions now arrive in your Formspree dashboard / email.

> Other options: Google Forms, Mailchimp, ConvertKit, or a custom backend.
> The form posts standard `multipart/form-data` with an `email` field, so it
> works with most form services by swapping the `action` URL.

## Customize

- **Name / copy:** edit text in `index.html`.
- **Colors:** tweak the CSS variables at the top of `styles.css` (`--brand`, `--brand-2`).
- **Integrations shown:** update the `.trust-logos` list in `index.html`.
