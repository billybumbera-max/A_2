# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## What this is

**Autohive** is a marketing **landing page** with a waitlist signup. Autohive
itself is pitched as an AI automation service (AI agents that handle busywork —
inbox triage, data entry, reporting, follow-ups). This repo is **only the
landing page**, not the product.

It is a **pure static site**: plain HTML, CSS, and vanilla JavaScript. There is
**no build step, no framework, no package manager, and no dependencies** to
install. What's in the repo is exactly what ships.

## File structure

The entire site is three files at the repo root:

| File         | Purpose                                                              |
| ------------ | ------------------------------------------------------------------- |
| `index.html` | Page structure & all content (single page, anchor-linked sections). |
| `styles.css` | All styling. Dark, modern SaaS theme; fully responsive.             |
| `script.js`  | Footer year + waitlist form handling, validation, and submission.   |
| `README.md`  | Human-facing setup, deploy, and customization notes.                |

There are no other source directories, no tests, and no tooling/config files.

## Running locally

No install needed. Either open `index.html` directly in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

There is **no test suite, linter, or build command**. "Verifying" a change
means loading the page in a browser and checking it visually plus the form
behavior. If you add tooling, document it here.

## How the page is organized

`index.html` is one long document with sections linked by anchor IDs used in the
nav: `#usecases`, `#how`, `#pricing`, `#faq`, `#waitlist`. Order top-to-bottom:
nav → hero (with product mockup) → stats band → trust strip → use cases → how it
works → manual-vs-Autohive compare → pricing → FAQ → final waitlist CTA →
footer.

There are **two waitlist forms** on the page that must stay in sync:
- `#hero-form` (paired with status element `#hero-msg`)
- `#waitlist-form` (paired with status element `#form-msg`)

## The waitlist form (important)

`script.js` wires up both forms via `initForm(formId, msgId)`. Behavior:

- Validates the email client-side (`isValidEmail`, a simple regex).
- Always saves the email to `localStorage` under key `autohive_waitlist` so the
  demo "works" before any backend is connected.
- **Demo mode vs. live mode** is decided by whether the form's `action` still
  contains the placeholder `YOUR_FORM_ID`:
  - If it still says `YOUR_FORM_ID` → demo mode: fakes success after a short
    delay, no network request.
  - If a real Formspree ID is present → live mode: `POST`s the form data to
    Formspree and reports success/failure.

To connect real signups: create a free form at https://formspree.io and replace
**both** occurrences of `YOUR_FORM_ID` in `index.html` (hero form and final
waitlist form) with the real form ID. The form posts standard
`multipart/form-data` with an `email` field, so other providers work by swapping
the `action` URL.

## Styling conventions

- **Design tokens are CSS custom properties** defined in `:root` at the top of
  `styles.css`. Prefer these over hard-coded values. Key ones:
  - Brand colors: `--brand` (#7c5cff), `--brand-2` (#21d4fd), `--accent`.
  - Surfaces: `--bg`, `--bg-soft`, `--card`, `--border`.
  - Text: `--text`, `--muted`. Layout: `--radius`, `--max` (max content width).
- Theme is **dark** with a purple→cyan gradient as the signature accent (used in
  buttons, brand mark, gradient text via `.grad`, and the background glow).
- Font is **Inter**, loaded from Google Fonts in `index.html`.
- **Responsive** breakpoints live at the bottom of `styles.css`: `940px`
  (collapse multi-column grids to single column) and `620px` (stack forms, hide
  some nav links). There is also a `prefers-reduced-motion` block — keep
  animations gated behind it.
- Styling is plain CSS with class-based selectors that mirror the section
  structure in the HTML. No CSS framework, no preprocessor.

## Conventions & guardrails

- **Keep it dependency-free.** Do not add a build step, framework, bundler, or
  npm packages unless explicitly asked. The value of this repo is that it's
  trivially deployable static files.
- **Keep the two waitlist forms consistent** — if you change one form's markup,
  fields, or `action`, change the other to match.
- **Accessibility:** preserve `aria-label`s on inputs, `role="status"` /
  `aria-live="polite"` on message elements, and `aria-hidden` on decorative
  elements. Honor `prefers-reduced-motion`.
- Edit copy/content directly in `index.html`; colors via the CSS variables;
  shown integrations via the `.trust-logos` list in `index.html`.
- Match the existing code style: 2-space indentation, lowercase hyphenated class
  names, concise vanilla JS.

## Git & deployment workflow

- Active development branch for AI-assisted work: `claude/claude-md-docs-s7kdos`.
  Develop, commit, and push there; do not push to other branches without
  explicit permission. Do not open a PR unless asked.
- Deployment is intended to be **GitHub Pages**, "Deploy from a branch" (`main`,
  root folder) — see README. A Pages **GitHub Actions** workflow was added and
  then **removed** in favor of the simpler branch-based deploy, so there is
  currently no CI/CD workflow in the repo. If you reintroduce one, note it here.
- Because the site is static files at the repo root, whatever is on the deployed
  branch is exactly what goes live — no build artifacts.
