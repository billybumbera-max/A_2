// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Store signups locally so the demo "works" before a backend is connected.
function saveLocal(email) {
  try {
    const list = JSON.parse(localStorage.getItem('keystone_waitlist') || '[]');
    if (!list.includes(email)) list.push(email);
    localStorage.setItem('keystone_waitlist', JSON.stringify(list));
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
  const formspreeReady = !form.action.includes('YOUR_FORM_ID');

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
