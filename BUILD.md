# Building the sellable ZIP

Gumroad sells a file. Run this once to produce a clean `ai-landing-page-pack.zip`
containing everything a buyer should get (and nothing they shouldn't).

From the repo root:

```bash
bash package.sh
```

This creates `dist/ai-landing-page-pack.zip`. Upload that file to Gumroad.

What's included: all 6 templates (`index.html`, `realestate/`, `dental/`,
`fitness/`, `restaurant/`, `contractor/`), `gallery.html`, `styles.css`,
`script.js`, `screenshots/`, the Google Sheets integration, and all docs
(README, KIT, CUSTOMIZE, SALES-KIT, SERVICE-OFFER, OUTREACH, LEAD-SOURCING,
LICENSE).

What's excluded: git internals, the build script itself, and any local junk.
