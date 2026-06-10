// ─────────────────────────────────────────────────────────────
//  WAITLIST CONFIG — connect real signups by setting ONE value.
//
//  Paste your Formspree endpoint below (free at https://formspree.io):
//    1. Create a form, copy its ID (looks like "xayzwbpq").
//    2. Set:  ENDPOINT: 'https://formspree.io/f/xayzwbpq'
//
//  Leave it as '' to run in demo mode (signups saved in the browser).
//  Any endpoint that accepts a POST with an `email` field works
//  (Formspree, Google Apps Script, Netlify, your own backend, etc).
// ─────────────────────────────────────────────────────────────
const WAITLIST = {
  ENDPOINT: '', // e.g. 'https://formspree.io/f/xayzwbpq'
};

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Store signups locally so the demo "works" before a backend is connected.
function saveLocal(email) {
  try {
    const list = JSON.parse(localStorage.getItem('autohive_waitlist') || '[]');
    if (!list.includes(email)) list.push(email);
    localStorage.setItem('autohive_waitlist', JSON.stringify(list));
  } catch (_) { /* ignore storage errors */ }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Wire up any waitlist form on the page (hero + final CTA).
function initForm(formId, msgId) {
  const form = document.getElementById(formId);
  const msg = document.getElementById(msgId);
  if (!form || !msg) return;

  const input = form.querySelector('input[type="email"]');
  const btn = form.querySelector('button[type="submit"]');
  const endpoint = WAITLIST.ENDPOINT && WAITLIST.ENDPOINT.trim();
  const live = Boolean(endpoint);

  function setMsg(text, type) {
    msg.textContent = text;
    msg.className = msg.className.replace(/\b(success|error)\b/g, '').trim() + (type ? ' ' + type : '');
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = input.value.trim();

    if (!isValidEmail(email)) {
      setMsg('Please enter a valid email address.', 'error');
      input.focus();
      return;
    }

    const originalLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Joining…';
    saveLocal(email);

    const finish = function (text, type) {
      setMsg(text, type);
      btn.disabled = false;
      btn.textContent = originalLabel;
    };

    // Demo mode: no endpoint configured yet.
    if (!live) {
      setTimeout(function () {
        finish("🎉 You're on the list! We'll be in touch soon.", 'success');
        form.reset();
      }, 500);
      return;
    }

    // Google Apps Script web apps don't return CORS headers, so the
    // browser can't read the response. We send the data (it's still
    // saved to the sheet) and treat the request as fire-and-forget.
    if (endpoint.includes('script.google.com')) {
      try {
        await fetch(endpoint, { method: 'POST', mode: 'no-cors', body: new FormData(form) });
        finish("🎉 You're on the list! We'll be in touch soon.", 'success');
        form.reset();
      } catch (_) {
        finish('Network error. Please try again.', 'error');
      }
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        finish("🎉 You're on the list! We'll be in touch soon.", 'success');
        form.reset();
      } else {
        finish('Something went wrong. Please try again.', 'error');
      }
    } catch (_) {
      finish('Network error. Please try again.', 'error');
    }
  });
}

initForm('hero-form', 'hero-msg');
initForm('waitlist-form', 'form-msg');
