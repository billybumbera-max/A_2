# Stride — Running Club Website

**Stride** is a running community & coaching club landing page — group runs,
personalized training plans, progress tracking, and a built-in **pace calculator**.

## Stack

Single self-contained file. No build step, no dependencies, no framework.

- `index.html` — the entire site (HTML + CSS + JS inline)

## Run locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Features

- Responsive dark theme with an energetic sunrise (orange/amber) palette
- Sticky nav with working mobile menu
- Animated hero card (live group-run mock)
- **Pace calculator** — enter distance + goal time, get pace per mile *and* per km
- "Join the club" email form (saves locally in demo mode)

## Make the join form collect real emails

The form runs in local demo mode out of the box. To capture real signups, swap
the demo handler near the bottom of `index.html` to POST to a form service
(e.g. [Formspree](https://formspree.io), Getform, or your own backend).

## Deploy (free, no GitHub needed)

Drag this folder onto **[Netlify Drop](https://app.netlify.com/drop)** or
**Cloudflare Pages** for an instant public URL.

---

> The earlier **Autohive** landing page now lives in `autohive/` (open
> `autohive/index.html`), and `SELLING.md` is the sell-kit for it.
