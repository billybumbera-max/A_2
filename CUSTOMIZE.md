# Customization guide

This is a fast, dependency-free landing-page template with a built-in
waitlist. You can rebrand it for any product in ~15 minutes. No build step,
no framework — just edit, open, deploy.

```
index.html   →  all page content & structure
styles.css   →  theme & layout (colors live at the very top)
script.js    →  waitlist form logic + WAITLIST.ENDPOINT config
```

## 1. Rename the brand (2 min)
The brand name appears in `index.html` (title, nav, footer, copy) and once
in `script.js` (the localStorage key). Find & replace **"Autohive"** with
your name across the project. Also update:

- `<title>` and the two `<meta ... description>` / `og:` tags in `<head>`
- the localStorage key `autohive_waitlist` in `script.js` (cosmetic)

## 2. Recolor (1 min)
All theming is driven by CSS variables at the top of `styles.css`:

```css
:root {
  --brand:   #7c5cff;  /* primary accent */
  --brand-2: #21d4fd;  /* gradient partner */
  --bg:      #0a0b14;  /* page background */
  --text:    #eef0f7;
  --muted:   #9aa0b5;
  /* ... */
}
```

Change `--brand` and `--brand-2` and the whole site (buttons, gradients,
glow, logo) re-themes instantly. Swap `--bg`/`--text` for a light theme.

## 3. Swap the copy & sections
Everything is plain HTML in `index.html`, clearly commented by section:
hero, stats, trust strip, use cases, how-it-works, comparison, pricing,
FAQ, waitlist CTA, footer. Edit text directly, or delete a `<section>`
to remove it.

- **Logo:** the inline SVG hexagon in the nav/footer (`<svg>…</svg>`) and the
  favicon `data:image/svg+xml` in `<head>`. Replace with your own SVG.
- **Integrations strip:** edit the `.trust-logos` `<span>` list.
- **Pricing:** edit the three `.price-card` blocks.

## 4. Connect the waitlist
Open `script.js` and set one value:

```js
const WAITLIST = { ENDPOINT: '' };  // demo mode while empty
```

- **Formspree:** `ENDPOINT: 'https://formspree.io/f/xxxxxxxx'`
- **Google Sheet:** follow `SETUP-GOOGLE-SHEET.md`, paste the Web App URL.
- **Anything else:** any URL that accepts a POST with an `email` field.

Empty = demo mode (signups saved in the browser, success message still shown).

## 5. Deploy (free)
Any static host works — drag the folder onto **Netlify Drop**, or use
**GitHub Pages** (Settings → Pages → Deploy from a branch → root), **Vercel**,
**Cloudflare Pages**, etc. No server required.

---
**Browser support:** all modern browsers. **Performance:** single HTML/CSS/JS,
no external JS libraries, one Google Font. **Accessibility:** semantic
landmarks, ARIA labels, live regions on the forms.
