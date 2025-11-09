// Smooth scroll handled by inline script in index.html
// This file now only handles nav toggle, year, and form submission

const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.add('hidden')));
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (statusEl) statusEl.textContent = 'Sending…';
    try {
      const fd = new FormData(form);
      const resp = await fetch(form.action, {
        method: form.method || 'POST',
        body: fd,
        headers: { 'Accept': 'application/json' }
      });
      if (resp.ok) {
        if (statusEl) statusEl.textContent = 'Thanks. We will reach out shortly.';
        form.reset();
      } else {
        if (statusEl) statusEl.textContent = 'Unable to send right now. Please try again.';
      }
    } catch (err) {
      if (statusEl) statusEl.textContent = 'Network error. Please try again.';
    }
  });
}

