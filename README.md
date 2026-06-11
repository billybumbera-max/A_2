# Keystone — Landing Page

**Keystone** is a modern real estate brokerage: expert local agents paired with
smart home-search tech. Sellers list for a low flat fee (instead of ~6%
commission), buyers get a 1% cash rebate at closing, and everyone gets a
dedicated agent and a smoother close.

This repo contains the marketing landing page with an early-access signup.

## Stack

Pure static site — no build step, no dependencies.

- `index.html` — page structure & content
- `styles.css` — styling (dark, modern theme, fully responsive)
- `script.js` — signup form handling & validation

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

## Connect the signup form (collect real emails)

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
- **Listing portals shown:** update the `.trust-logos` list in `index.html`.
- **Pricing:** edit the `.price-grid` cards in `index.html`.

> Marketing copy only — figures shown (savings, rebate, timelines) are
> illustrative placeholders. Confirm real numbers and add the required
> licensing/brokerage disclosures before going live.
