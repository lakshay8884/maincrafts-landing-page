// MainCrafts — shared script across all pages
// Handles: mobile nav toggle, active-link highlighting, contact form validation

console.log("hey — poking around the code? this is my Task 2 build for the MainCrafts internship. multi-page site, HTML/CSS/JS, no frameworks.");

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('primaryNav');
  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('open'));
    document.querySelectorAll('nav.primary-nav a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 720) nav.classList.remove('open');
      });
    });
  }

  // highlight the current page's nav link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.primary-nav a[data-page]').forEach(link => {
    if (link.getAttribute('data-page') === current) link.classList.add('active');
  });
});

// Contact form validation — required by Task 2 brief:
// Name and Email can't be empty, show an alert if they are.
function validateForm() {
  const form = document.forms['contactForm'];
  const name = form['name'];
  const email = form['email'];

  const nameField = name.closest('.field');
  const emailField = email.closest('.field');
  nameField.classList.remove('error');
  emailField.classList.remove('error');

  let missing = [];
  if (name.value.trim() === '') {
    missing.push('Name');
    nameField.classList.add('error');
  }
  if (email.value.trim() === '') {
    missing.push('Email');
    emailField.classList.add('error');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    missing.push('a valid Email');
    emailField.classList.add('error');
  }

  if (missing.length > 0) {
    alert('Please fill in: ' + missing.join(', '));
    return false;
  }

  // no backend yet (that's a later task) — just confirm on-page for now
  const successBox = document.getElementById('formSuccess');
  successBox.classList.add('show');
  successBox.textContent = "Thanks, " + name.value.trim() + " — message received. I'll get back to you soon.";
  form.reset();
  return false;
}
