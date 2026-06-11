# Keystone Template — Setup & Rebrand Guide

Get this page rebranded and live in about **10 minutes**. No build tools, no
frameworks — just 3 files.

```
index.html   ← all page content
styles.css   ← all styling (colors at the very top)
script.js    ← form handling (you probably won't touch this)
```

## 0. Preview it (10 seconds)

Double-click `index.html` — it opens and works in any browser.

## 1. Rebrand the name (2 min)

Find-and-replace **`Keystone`** in `index.html` with your brand. It appears in:

- `<title>` and the meta description / Open Graph tags (top of file)
- The nav and footer logos
- The "With Keystone" comparison column

## 2. Change the colors (1 min)

Open `styles.css`. The first lines are everything you need:

```css
--brand:   #10b981;   /* primary (emerald)  */
--brand-2: #f5c451;   /* secondary (gold)   */
--accent:  #34d399;   /* highlight          */
```

Swap those three for your brand colors. Every gradient, button, and glow
updates automatically. (For a light theme, also adjust `--bg`, `--card`,
`--text` — but the dark theme is the look.)

## 3. Edit the copy (5 min)

Everything is plain HTML in `index.html`, top to bottom in page order:
hero → stats → services → how it works → comparison → pricing → FAQ → CTA.

> ⚠️ **Important:** all numbers on the page ($15K saved, 14 days, member
> counts, etc.) are **sample placeholder copy**. Replace them with your real
> figures — or delete them — before going live. Real-estate advertising
> rules in most regions require claims to be truthful and substantiated,
> and listings/footers typically need your **license number, brokerage
> name, and an Equal Housing Opportunity notice**.

## 4. Make the forms real (3 min)

Forms work in demo mode out of the box (signups saved in the visitor's
browser). To receive real leads by email:

1. Create a free form at **https://formspree.io** (50 submissions/mo free)
2. Copy your form ID (looks like `xayzwbpq`)
3. In `index.html`, replace **both** occurrences of `YOUR_FORM_ID`:

```html
action="https://formspree.io/f/YOUR_FORM_ID"
```

Any form backend works (Mailchimp, ConvertKit, Google Forms, your own API) —
the form posts a standard `email` field; just swap the `action` URL.

## 5. Deploy free (2 min)

Pick one:

- **Netlify Drop** (fastest): https://app.netlify.com/drop — drag the folder
  onto the page. Live instantly with a free URL.
- **GitHub Pages**: push to a repo → Settings → Pages → deploy from branch.
- **Vercel / Cloudflare Pages**: import the repo, zero config.

## 6. Custom domain (optional)

Buy a domain (~$10/yr at Namecheap, Porkbun, or Cloudflare) and point it at
your host — every host above has a 2-minute custom-domain guide.

## Pre-launch checklist

- [ ] Brand name replaced everywhere (check the `<title>` and OG tags!)
- [ ] Colors swapped in `styles.css`
- [ ] Placeholder stats replaced with real numbers or removed
- [ ] License #, brokerage name, Equal Housing notice in the footer
- [ ] Both `YOUR_FORM_ID`s replaced; test-submit each form
- [ ] Viewed on a phone (it's responsive, but check your copy lengths)
- [ ] Favicon: it's an inline SVG in `index.html` — recolor or replace it

Questions about the files? Everything is intentionally boring, standard
HTML/CSS/JS — any web developer (or AI assistant) can modify it in minutes.
