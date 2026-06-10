// ─────────────────────────────────────────────────────────────
// CONFIG — to collect real signups, paste your form endpoint here.
// Create a free one at https://formspree.io (or use Getform, Basin,
// or your own backend). Leave blank to run in local demo mode.
//   e.g. const WAITLIST_ENDPOINT = 'https://formspree.io/f/xayzwbpq';
// ─────────────────────────────────────────────────────────────
const WAITLIST_ENDPOINT = '';

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

  // A single config value drives both forms. When set, point the form at it.
  const endpointReady = Boolean(WAITLIST_ENDPOINT);
  if (endpointReady) form.action = WAITLIST_ENDPOINT;
  const formspreeReady = endpointReady;

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

    // Demo mode: no Formspree endpoint configured yet.
    if (!formspreeReady) {
      setTimeout(function () {
        finish("🎉 You're on the list! We'll be in touch soon.", 'success');
        form.reset();
      }, 500);
      return;
    }

    try {
      const res = await fetch(form.action, {
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
