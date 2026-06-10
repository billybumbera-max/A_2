// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Waitlist form handling
(function () {
  const form = document.getElementById('waitlist-form');
  const input = document.getElementById('email');
  const msg = document.getElementById('form-msg');
  if (!form) return;

  const FORMSPREE_CONFIGURED = !form.action.includes('YOUR_FORM_ID');

  function setMsg(text, type) {
    msg.textContent = text;
    msg.className = 'form-msg' + (type ? ' ' + type : '');
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // Store locally so the demo "works" before a backend is connected.
  function saveLocal(email) {
    try {
      const list = JSON.parse(localStorage.getItem('autohive_waitlist') || '[]');
      if (!list.includes(email)) list.push(email);
      localStorage.setItem('autohive_waitlist', JSON.stringify(list));
    } catch (_) { /* ignore storage errors */ }
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = input.value.trim();

    if (!isValidEmail(email)) {
      setMsg('Please enter a valid email address.', 'error');
      input.focus();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Joining…';

    saveLocal(email);

    // If Formspree isn't set up yet, succeed locally for the demo.
    if (!FORMSPREE_CONFIGURED) {
      setTimeout(function () {
        setMsg("🎉 You're on the list! We'll be in touch soon.", 'success');
        form.reset();
        btn.disabled = false;
        btn.textContent = originalLabel;
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
        setMsg("🎉 You're on the list! We'll be in touch soon.", 'success');
        form.reset();
      } else {
        setMsg('Something went wrong. Please try again.', 'error');
      }
    } catch (_) {
      setMsg('Network error. Please try again.', 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  });
})();
