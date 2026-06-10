// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ── Waitlist destination ──────────────────────────────────────────────────
// Signups post into a Google Form, which collects them in a Google Sheet you
// own (free, unlimited). Paste two values from your form below — see the
// README ("Connect the waitlist") for the 2-minute setup. Until both are
// filled in, the form runs in demo mode (saves signups locally in the browser).
const WAITLIST = {
  // The Google Form's submit endpoint. From your form's pre-filled link it
  // looks like: https://docs.google.com/forms/d/e/XXXX/viewform — swap the
  // trailing "viewform" for "formResponse".
  formAction: 'https://docs.google.com/forms/d/e/PASTE_FORM_ID/formResponse',
  // The email question's field name, e.g. 'entry.1234567890'.
  emailEntry: 'entry.PASTE_ENTRY_ID',
};

function waitlistReady() {
  return !WAITLIST.formAction.includes('PASTE_FORM_ID')
      && !WAITLIST.emailEntry.includes('PASTE_ENTRY_ID');
}

// Keep a local backup copy of every signup so nothing is ever lost.
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

    // Demo mode: no Google Form connected yet.
    if (!waitlistReady()) {
      setTimeout(function () {
        finish("🎉 You're on the list! We'll be in touch soon.", 'success');
        form.reset();
      }, 500);
      return;
    }

    // Post into the Google Form. It doesn't send CORS headers, so we use
    // mode:'no-cors' — the response is opaque (we can't read it), but the
    // submission goes through and lands in your Sheet.
    try {
      const body = new URLSearchParams();
      body.append(WAITLIST.emailEntry, email);
      await fetch(WAITLIST.formAction, {
        method: 'POST',
        mode: 'no-cors',
        body: body,
      });
      finish("🎉 You're on the list! We'll be in touch soon.", 'success');
      form.reset();
    } catch (_) {
      finish('Network error. Please try again.', 'error');
    }
  });
}

initForm('hero-form', 'hero-msg');
initForm('waitlist-form', 'form-msg');
